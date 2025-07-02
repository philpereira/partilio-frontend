// Tipos gerais da aplicação

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  onboardingCompleted: boolean;
}

export interface Payer {
  id: string;
  name: string;
  email?: string;
  color: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isActive: boolean;
}

export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  closingDay: number;
  dueDay: number;
  isActive: boolean;
}

export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface DateRange {
  start: string;
  end: string;
}
