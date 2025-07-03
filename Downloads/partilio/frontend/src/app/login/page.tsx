// 🔐 ARQUIVO: src/app/login/page.tsx

'use client';

import Link from 'next/link';  // ← ADICIONAR esta linha no topo
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { 
  Heart, Eye, EyeOff, Mail, Lock, ArrowRight, 
  Users, PiggyBank, TrendingUp, Shield, 
  CheckCircle, Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
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

  const quickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  // Features do app
  const features = [
    {
      icon: Users,
      title: "Múltiplos pagadores",
      description: "Toda família organizada"
    },
    {
      icon: PiggyBank,
      title: "Divisão inteligente",
      description: "Automática e justa"
    },
    {
      icon: TrendingUp,
      title: "Relatórios claros",
      description: "Visualize seus gastos"
    },
    {
      icon: Shield,
      title: "Dados seguros",
      description: "Criptografia total"
    }
  ];

  // Mostrar loading enquanto não inicializar no cliente
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="min-h-screen flex">
        {/* Lado esquerdo - Formulário */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h1 className="ml-3 text-2xl font-bold text-gray-900">Partilio</h1>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Bem-vindo de volta!
              </h2>
              <p className="text-gray-600">
                Entre na sua conta para gerenciar as finanças familiares
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 pr-12"
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Lembrar de mim
                  </label>
                </div>

                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Login rápido para demo */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-center text-sm text-gray-600 mb-4">
                Para demonstração, use estas credenciais:
              </p>
              
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => quickLogin('test@test.com', '123456')}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                >
                  <div className="font-medium text-gray-900">Conta Demo</div>
                  <div className="text-gray-500">test@test.com • 123456</div>
                </button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-4">
                Clique no cartão acima para preencher automaticamente
              </p>
            </div>

          {/* Link para registro */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Criar conta gratuita
                </Link>
              </p>
            </div>

        {/* Lado direito - Hero/Features */}
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="flex flex-col justify-center px-12 py-12">
            {/* Hero */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Sparkles className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Controle financeiro familiar</h3>
              </div>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Organize, divida e acompanhe todas as despesas da família de forma simples e transparente.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-blue-100">Divisão automática e justa</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-blue-100">Relatórios mensais detalhados</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-blue-100">Controle total de gastos</span>
                </div>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-blue-200">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-12 border-t border-blue-500 pt-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">Famílias organizadas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">R$ 2M+</div>
                  <div className="text-sm text-blue-200">Gastos gerenciados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-blue-200">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}