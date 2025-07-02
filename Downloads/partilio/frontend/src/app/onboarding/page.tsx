// 🎯 ARQUIVO: src/app/onboarding/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, Users, Tag, Share2, FileText, Eye, 
  ChevronRight, ChevronLeft, Home, Car, CreditCard,
  Coffee, Plus, Check, ArrowRight, UserPlus, CheckCircle,
  PiggyBank, Sparkles, TrendingUp
} from 'lucide-react';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
}

interface Payer {
  id: string;
  name: string;
  color: string;
}

interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface Expense {
  id: string;
  description: string;
  supplier: string;
  amount: number;
  categoryId: string;
  splitPercentage: { [payerId: string]: number };
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [payers, setPayers] = useState<Payer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newPayerName, setNewPayerName] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);

  // Cores disponíveis para pagadores
  const availableColors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  // Categorias padrão
  const defaultCategories: Category[] = [
    { id: '1', name: 'Casa', icon: Home, color: '#3B82F6' },
    { id: '2', name: 'Alimentação', icon: Coffee, color: '#10B981' },
    { id: '3', name: 'Transporte', icon: Car, color: '#F59E0B' },
    { id: '4', name: 'Cartão', icon: CreditCard, color: '#8B5CF6' },
  ];

  useEffect(() => {
    setCategories(defaultCategories);
  }, []);

  // Adicionar pagador
  const addPayer = () => {
    if (newPayerName.trim() && payers.length < 6) {
      const newPayer: Payer = {
        id: Date.now().toString(),
        name: newPayerName.trim(),
        color: availableColors[payers.length % availableColors.length]
      };
      setPayers([...payers, newPayer]);
      setNewPayerName('');
    }
  };

  // Remover pagador
  const removePayer = (id: string) => {
    setPayers(payers.filter(p => p.id !== id));
  };

  // Adicionar despesa de exemplo
  const addExpense = (description: string, supplier: string, amount: number, categoryId: string) => {
    if (payers.length < 2) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      supplier,
      amount,
      categoryId,
      splitPercentage: {
        [payers[0].id]: 50,
        [payers[1].id]: 50
      }
    };
    setExpenses([...expenses, newExpense]);
  };

  // Finalizar onboarding
  const completeOnboarding = async () => {
    setIsCompleting(true);
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirecionar para dashboard
    router.push('/dashboard');
  };

  // Steps do onboarding
  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Bem-vindos ao Partilio! 👋",
      description: "Vamos organizar as finanças familiares de forma simples",
      component: (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Organize as finanças da família
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Em poucos minutos você terá tudo configurado para gerenciar despesas compartilhadas de forma inteligente.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800">Múltiplos pagadores</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <PiggyBank className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-800">Divisão automática</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-800">Relatórios claros</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <Sparkles className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-orange-800">Fácil de usar</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">⏱️ Configuração leva apenas 3 minutos</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Quem são os pagadores? 👥",
      description: "Adicione as pessoas que fazem pagamentos na família",
      component: (
        <div className="py-6">
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newPayerName}
                onChange={(e) => setNewPayerName(e.target.value)}
                placeholder="Nome do pagador (ex: João, Maria)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addPayer()}
              />
              <button
                onClick={addPayer}
                disabled={!newPayerName.trim() || payers.length >= 6}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mt-2">
              Adicione até 6 pessoas. Você pode mudar isso depois.
            </p>
          </div>

          <div className="space-y-3">
            {payers.map((payer, index) => (
              <div key={payer.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: payer.color }}
                >
                  {payer.name.charAt(0).toUpperCase()}
                </div>
                
                <span className="flex-1 font-medium text-gray-900">{payer.name}</span>
                
                {index > 0 && (
                  <button
                    onClick={() => removePayer(payer.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {payers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Adicione pelo menos uma pessoa para continuar</p>
            </div>
          )}

          {payers.length === 1 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                💡 Adicione mais uma pessoa para poder dividir despesas
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 3,
      title: "Categorias de gastos 🏷️",
      description: "Como vocês organizam os gastos da família?",
      component: (
        <div className="py-6">
          <p className="text-gray-600 mb-6">
            Já configuramos as categorias mais comuns. Você pode personalizar depois.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              ✅ Perfeito! Você pode adicionar mais categorias depois no app
            </p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Vamos criar as primeiras despesas? 📝",
      description: "Adicione algumas despesas para ver como funciona",
      component: (
        <div className="py-6">
          <p className="text-gray-600 mb-6">
            Clique nos exemplos abaixo para adicionar despesas típicas:
          </p>

          <div className="space-y-3 mb-6">
            {[
              { desc: "Financiamento do AP", supplier: "Banco", amount: 1200, categoryId: "1" },
              { desc: "Supermercado", supplier: "Carrefour", amount: 400, categoryId: "2" },
              { desc: "Combustível", supplier: "Posto BR", amount: 150, categoryId: "3" },
              { desc: "Netflix", supplier: "Netflix", amount: 45, categoryId: "4" }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => addExpense(example.desc, example.supplier, example.amount, example.categoryId)}
                disabled={payers.length < 2}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{example.desc}</p>
                    <p className="text-gray-500 text-sm">{example.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">R$ {example.amount}</p>
                    <Plus className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {expenses.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Despesas adicionadas:</h4>
              {expenses.map((expense) => {
                const category = categories.find(c => c.id === expense.categoryId);
                const Icon = category?.icon || FileText;
                
                return (
                  <div key={expense.id} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: category?.color + '20' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: category?.color }} />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{expense.description}</p>
                      <p className="text-gray-500 text-sm">R$ {expense.amount} • Dividido igualmente</p>
                    </div>
                    
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                );
              })}
            </div>
          )}

          {payers.length < 2 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Adicione pelo menos 2 pagadores para criar despesas
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 5,
      title: "Tudo pronto! 🎉",
      description: "Sua família está pronta para usar o Partilio",
      component: (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Configuração concluída!
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Agora vocês podem gerenciar todas as despesas familiares de forma organizada e transparente.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
            <h3 className="font-medium text-gray-900 mb-4">Resumo da configuração:</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Pagadores:</span>
                <span className="font-medium">{payers.length} pessoas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Categorias:</span>
                <span className="font-medium">{categories.length} categorias</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Despesas:</span>
                <span className="font-medium">{expenses.length} criadas</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-left max-w-md mx-auto">
            <h4 className="font-medium text-gray-900">Próximos passos:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Explore o dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Adicione mais despesas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Acompanhe os relatórios mensais</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const canProceed = () => {
    switch (currentStep) {
      case 2: return payers.length >= 1;
      case 3: return categories.length > 0;
      case 4: return true; // Opcional adicionar despesas
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header com progresso */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Configuração Inicial</h1>
            <span className="text-sm text-gray-500">
              Passo {currentStep} de {steps.length}
            </span>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Título do step */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData?.title}
            </h2>
            <p className="text-gray-600">
              {currentStepData?.description}
            </p>
          </div>

          {/* Conteúdo do step */}
          <div className="mb-8">
            {currentStepData?.component}
          </div>

          {/* Navegação */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={completeOnboarding}
                disabled={isCompleting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50"
              >
                {isCompleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Finalizando...
                  </>
                ) : (
                  <>
                    Começar a usar
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}