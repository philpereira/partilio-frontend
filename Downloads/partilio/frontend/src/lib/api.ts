import axios from 'axios';

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

// 🔧 CORREÇÃO: Usar sempre o proxy local
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    // Só tenta acessar token se estivermos no cliente
    if (isClient) {
      const token = getFromStorage('partilio_token');
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

// Response interceptor para tratar erros e refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Só lida com refresh token se estivermos no cliente
    if (!isClient) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getFromStorage('partilio_refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          setToStorage('partilio_token', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        removeFromStorage('partilio_token');
        removeFromStorage('partilio_refresh_token');
        
        // Só redireciona se estivermos no cliente
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
