'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { RegisterForm } from './components/RegisterForm';
import { Loader2, ArrowLeft, Shield, Users, ChartBar } from 'lucide-react';

const RegisterPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex min-h-screen">
        {/* Lado Esquerdo - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white">
          <div className="flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <ChartBar className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-bold">Partilio</h1>
              </div>
              
              <h2 className="text-4xl font-bold leading-tight mb-6">
                Organize as finanças da sua família
              </h2>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Controle despesas, divida custos e mantenha todos na família 
                organizados financeiramente. Simples, intuitivo e eficiente.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Gestão Familiar</h3>
                  <p className="text-blue-100">Organize despesas de toda a família</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Segurança Total</h3>
                  <p className="text-blue-100">Seus dados protegidos</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-blue-200">
              © 2025 Partilio. Organize. Controle. Prospere.
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Header Mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ChartBar className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Partilio</h1>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Criar nova conta
              </h2>
              <p className="text-gray-600">
                Organize as finanças da sua família
              </p>
            </div>

            {/* Header Desktop */}
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Criar nova conta
              </h2>
              <p className="text-gray-600">
                Preencha seus dados para começar a usar o Partilio
              </p>
            </div>

            {/* Formulário */}
            <RegisterForm />

            {/* Link para Login */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;