import axios from 'axios';

// 🔧 CORREÇÃO SSR: Verificação segura do lado do cliente
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

// API client
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // 🔧 CORREÇÃO SSR: Só tenta acessar token no cliente
    if (isClientSide()) {
      const token = safeGetItem('partilio_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 🔧 CORREÇÃO SSR: Só lida com refresh token no cliente
    if (!isClientSide()) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = safeGetItem('partilio_refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          safeSetItem('partilio_token', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        safeRemoveItem('partilio_token');
        safeRemoveItem('partilio_refresh_token');
        
        // 🔧 CORREÇÃO SSR: Só redireciona no cliente
        if (isClientSide() && window.location) {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;