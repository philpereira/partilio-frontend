import api from '@/lib/api';
import type { LoginCredentials, RegisterData, LoginResponse, User } from '@/types/auth';
import type { APIResponse } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<APIResponse<LoginResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await api.post<APIResponse<LoginResponse>>('/auth/register', data);
    return response.data.data;
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
    await api.post('/auth/logout');
  },
};
