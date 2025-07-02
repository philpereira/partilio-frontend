// src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAppStore } from '../store';
import type { LoginCredentials, RegisterData } from '../types/auth';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

// Função helper para verificar se estamos no lado do cliente
const isClient = typeof window !== 'undefined';

// Função helper para acessar localStorage de forma segura
const getFromStorage = (key: string): string | null => {
  if (!isClient) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Erro ao acessar localStorage para key "${key}":`, error);
    return null;
  }
};

const setToStorage = (key: string, value: string): void => {
  if (!isClient) return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Erro ao salvar no localStorage para key "${key}":`, error);
  }
};

const removeFromStorage = (key: string): void => {
  if (!isClient) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Erro ao remover do localStorage para key "${key}":`, error);
  }
};

export function useAuth() {
  const { auth, setAuth } = useAppStore();
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  // Estado para controlar se já fizemos a inicialização no cliente
  useEffect(() => {
    if (isClient && !isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { user, tokens } = data;
      
      // Salvar tokens no localStorage
      setToStorage('partilio_token', tokens.accessToken);
      setToStorage('partilio_refresh_token', tokens.refreshToken);
      
      setAuth({
        user,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
      
      toast.success('Login realizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      const { user, tokens } = data;
      
      setToStorage('partilio_token', tokens.accessToken);
      setToStorage('partilio_refresh_token', tokens.refreshToken);
      
      setAuth({
        user,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
      
      toast.success('Conta criada com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar conta');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      removeFromStorage('partilio_token');
      removeFromStorage('partilio_refresh_token');
      setAuth(null);
      queryClient.clear();
      toast.success('Logout realizado com sucesso!');
    },
    onError: () => {
      // Logout local mesmo se falhar no servidor
      removeFromStorage('partilio_token');
      removeFromStorage('partilio_refresh_token');
      setAuth(null);
      queryClient.clear();
    },
  });

  // Query para carregar dados do usuário apenas no cliente
  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authService.getProfile,
    enabled: isClient && isInitialized && !!getFromStorage('partilio_token') && !auth,
    retry: false,
    onSuccess: (user) => {
      const token = getFromStorage('partilio_token');
      const refreshToken = getFromStorage('partilio_refresh_token');
      
      if (token && refreshToken) {
        setAuth({ user, token, refreshToken });
      }
    },
    onError: () => {
      removeFromStorage('partilio_token');
      removeFromStorage('partilio_refresh_token');
    },
  });

  return {
    user: auth?.user || null,
    isAuthenticated: !!auth,
    isLoading: loginMutation.isPending || registerMutation.isPending || isLoadingUser,
    isInitialized, // Novo campo para indicar se já inicializou no cliente
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutate,
  };
}