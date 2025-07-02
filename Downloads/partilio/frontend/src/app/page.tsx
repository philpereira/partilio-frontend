'use client';

import { useAuth } from '../hooks/useAuth'; // ← MUDANÇA
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../components/ui/button'; // ← MUDANÇA

export default function HomePage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user && !user.onboardingCompleted) {
      router.push('/onboarding');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Partilio Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Olá, {user.name}</span>
              <Button variant="ghost" onClick={() => logout()}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Frontend Partilio Criado com Sucesso!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sua aplicação está funcionando e conectada ao backend.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">✅ Onboarding</h3>
              <p className="text-gray-600 mb-4">Sistema de configuração inicial completo</p>
              <Button 
                onClick={() => router.push('/onboarding')}
                className="w-full"
              >
                Ver Onboarding
              </Button>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">💰 Despesas</h3>
              <p className="text-gray-600 mb-4">Cadastro e listagem de despesas</p>
              <Button 
                onClick={() => router.push('/expenses')}
                className="w-full"
              >
                Ver Despesas
              </Button>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">📊 Dashboard</h3>
              <p className="text-gray-600 mb-4">Visão geral e métricas</p>
              <Button 
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                Ver Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
