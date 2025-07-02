// 🔧 CORREÇÃO: src/services/auth.service.ts

import api from '../lib/api';
import type { LoginCredentials, RegisterData, LoginResponse, User } from '../types/auth';
import type { APIResponse } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('🚀 Auth Service - Login attempt:', credentials.email); // Debug
    
    const response = await api.post<APIResponse<LoginResponse>>('/auth/login', credentials);
    
    console.log('📡 Auth Service - Response:', response.data); // Debug
    
    // 🔧 CORREÇÃO: Adaptar para estrutura real do backend
    const responseData = response.data.data;
    
    // Backend retorna { user, token } mas frontend espera { user, tokens: { accessToken } }
    if (responseData && typeof responseData === 'object') {
      // Se backend retorna 'token' (singular), adaptar para 'tokens'
      if ('token' in responseData && !('tokens' in responseData)) {
        return {
          user: responseData.user,
          tokens: {
            accessToken: responseData.token,
            refreshToken: responseData.token, // Usar mesmo token como fallback
          }
        } as LoginResponse;
      }
      
      // Se já está no formato esperado
      if ('tokens' in responseData) {
        return responseData as LoginResponse;
      }
      
      // Fallback: retornar como está
      return responseData as LoginResponse;
    }
    
    throw new Error('Resposta de login inválida');
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await api.post<APIResponse<LoginResponse>>('/auth/register', data);
    
    // Mesmo tratamento do login
    const responseData = response.data.data;
    
    if (responseData && typeof responseData === 'object') {
      if ('token' in responseData && !('tokens' in responseData)) {
        return {
          user: responseData.user,
          tokens: {
            accessToken: responseData.token,
            refreshToken: responseData.token,
          }
        } as LoginResponse;
      }
      
      if ('tokens' in responseData) {
        return responseData as LoginResponse;
      }
      
      return responseData as LoginResponse;
    }
    
    throw new Error('Resposta de registro inválida');
  },

  async getProfile(): Promise<User> {
    const response = await api.get<APIResponse<User>>('/auth/profile');
    return response.data.data;
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await api.post<APIResponse<{ accessToken: string }>>('/auth/refresh-token', {
      refreshToken,
    });
    return response.data.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignorar erros de logout no servidor
      console.warn('Erro no logout do servidor:', error);
    }
  },
};