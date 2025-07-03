import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAppStore } from '../store';
import type { LoginCredentials, RegisterData } from '../types/auth';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

// 🔧 CORREÇÃO SSR: Funções helper para localStorage seguro
const isClientSide = () => typeof window !== 'undefined';

const safeGetItem = (key: string): string | null => {
  if (!isClientSide()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`Erro ao acessar localStorage para "${key}":`, error);
    return null;
  }
};

const safeSetItem = (key: string, value: string): void => {
  if (!isClientSide()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Erro ao salvar no localStorage para "${key}":`, error);
  }
};

const safeRemoveItem = (key: string): void => {
  if (!isClientSide()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Erro ao remover do localStorage para "${key}":`, error);
  }
};

export function useAuth() {
  const { auth, setAuth } = useAppStore();
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  // 🔧 CORREÇÃO SSR: Só inicializar no cliente
  useEffect(() => {
    if (isClientSide()) {
      setIsInitialized(true);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log('🔍 Login Success Data:', data);
      
      const { user, token, tokens } = data;
      const accessToken = token || tokens?.accessToken;
      const refreshToken = tokens?.refreshToken || token;
      
      if (!accessToken) {
        console.error('❌ Token não encontrado na resposta:', data);
        toast.error('Erro interno: token não recebido');
        return;
      }
      
      // 🔧 CORREÇÃO SSR: Usar função segura para localStorage
      safeSetItem('partilio_token', accessToken);
      if (refreshToken && refreshToken !== accessToken) {
        safeSetItem('partilio_refresh_token', refreshToken);
      }
      
      setAuth({
        user,
        token: accessToken,
        refreshToken: refreshToken || accessToken,
      });
      
      toast.success('Login realizado com sucesso!');
    },
    onError: (error: any) => {
      console.error('❌ Login Error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Erro ao fazer login';
      
      toast.error(errorMessage);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      const { user, token, tokens } = data;
      const accessToken = token || tokens?.accessToken;
      const refreshToken = tokens?.refreshToken || token;
      
      if (accessToken) {
        // 🔧 CORREÇÃO SSR: Usar função segura para localStorage
        safeSetItem('partilio_token', accessToken);
        if (refreshToken && refreshToken !== accessToken) {
          safeSetItem('partilio_refresh_token', refreshToken);
        }
        
        setAuth({
          user,
          token: accessToken,
          refreshToken: refreshToken || accessToken,
        });
        
        toast.success('Conta criada com sucesso!');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar conta');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // 🔧 CORREÇÃO SSR: Usar função segura para localStorage
      safeRemoveItem('partilio_token');
      safeRemoveItem('partilio_refresh_token');
      setAuth(null);
      queryClient.clear();
      toast.success('Logout realizado com sucesso!');
    },
    onError: () => {
      // 🔧 CORREÇÃO SSR: Logout local mesmo se falhar no servidor
      safeRemoveItem('partilio_token');
      safeRemoveItem('partilio_refresh_token');
      setAuth(null);
      queryClient.clear();
    },
  });

  // 🔧 CORREÇÃO SSR: Query só executa no cliente e após inicialização
  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authService.getProfile,
    enabled: isClientSide() && isInitialized && !!safeGetItem('partilio_token') && !auth,
    retry: false,
    onSuccess: (user) => {
      const token = safeGetItem('partilio_token');
      const refreshToken = safeGetItem('partilio_refresh_token');
      
      if (token) {
        setAuth({ user, token, refreshToken: refreshToken || token });
      }
    },
    onError: () => {
      safeRemoveItem('partilio_token');
      safeRemoveItem('partilio_refresh_token');
    },
  });

  return {
    user: auth?.user || null,
    isAuthenticated: !!auth,
    isLoading: loginMutation.isPending || registerMutation.isPending || isLoadingUser,
    isInitialized,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutate,
  };
}