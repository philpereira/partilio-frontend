export interface AuthState {
  user: User | null;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  onboardingCompleted: boolean;
}

// Tipos para o formulário de cadastro
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Tipos para erros de validação
export interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// Tipo para resposta de erro da API
export interface AuthError {
  message: string;
  errors?: Record<string, string>;
  code?: string;
}

// Força da senha (para indicador visual)
export interface PasswordStrength {
  score: number;
  feedback: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'gray';
}
