import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAppStore } from '@/store';
import type { LoginCredentials, RegisterData } from '@/types/auth';
import { toast } from 'sonner';

export function useAuth() {
  const { auth, setAuth } = useAppStore();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { user, tokens } = data;
      localStorage.setItem('partilio_token', tokens.accessToken);
      localStorage.setItem('partilio_refresh_token', tokens.refreshToken);
      
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
      localStorage.setItem('partilio_token', tokens.accessToken);
      localStorage.setItem('partilio_refresh_token', tokens.refreshToken);
      
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
      localStorage.removeItem('partilio_token');
      localStorage.removeItem('partilio_refresh_token');
      setAuth(null);
      queryClient.clear();
      toast.success('Logout realizado com sucesso!');
    },
    onError: () => {
      // Logout local mesmo se falhar no servidor
      localStorage.removeItem('partilio_token');
      localStorage.removeItem('partilio_refresh_token');
      setAuth(null);
      queryClient.clear();
    },
  });

  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authService.getProfile,
    enabled: !!localStorage.getItem('partilio_token') && !auth,
    retry: false,
    onSuccess: (user) => {
      const token = localStorage.getItem('partilio_token')!;
      const refreshToken = localStorage.getItem('partilio_refresh_token')!;
      
      setAuth({ user, token, refreshToken });
    },
    onError: () => {
      localStorage.removeItem('partilio_token');
      localStorage.removeItem('partilio_refresh_token');
    },
  });

  return {
    user: auth?.user || null,
    isAuthenticated: !!auth,
    isLoading: loginMutation.isPending || registerMutation.isPending || isLoadingUser,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutate,
  };
}
