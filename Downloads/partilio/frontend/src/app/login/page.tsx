'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Só executa redirecionamento após inicialização no cliente
    if (isInitialized && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router, isInitialized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push('/');
    } catch (error) {
      // Error é tratado no hook useAuth
    }
  };

  // Mostra loading enquanto não inicializar no cliente
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Partilio</h1>
          <h2 className="mt-6 text-2xl font-semibold text-gray-700">
            Entre na sua conta
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input mt-1"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input mt-1"
              placeholder="Sua senha"
            />
          </div>
          
          <Button
            type="submit"
            loading={isLoading}
            className="w-full"
          >
            Entrar
          </Button>
        </form>
        
        <div className="text-center text-sm text-gray-600">
          <p>Para teste, use qualquer email/senha válidos</p>
          <p className="mt-1">O backend aceita credenciais demo</p>
        </div>
      </div>
    </div>
  );
}