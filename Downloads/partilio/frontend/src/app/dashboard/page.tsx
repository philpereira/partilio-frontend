// 📊 ARQUIVO: src/app/dashboard/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { 
  Home, Users, PiggyBank, TrendingUp, Calendar, 
  Plus, CreditCard, Coffee, Car, Heart, Bell,
  DollarSign, ArrowUp, ArrowDown, MoreVertical,
  Filter, Search, Eye, Settings, LogOut,
  CheckCircle, Clock, AlertCircle, Zap
} from 'lucide-react';

interface Expense {
  id: string;
  description: string;
  supplier: string;
  amount: number;
  category: {
    name: string;
    icon: any;
    color: string;
  };
  payer: {
    name: string;
    color: string;
  };
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  splitAmount: number;
}

interface Summary {
  totalMonth: number;
  yourShare: number;
  partnerShare: number;
  pendingPayments: number;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Dados mock para demonstração
  const summary: Summary = {
    totalMonth: 2640,
    yourShare: 1450,
    partnerShare: 1190,
    pendingPayments: 3
  };

  const expenses: Expense[] = [
    {
      id: '1',
      description: 'Financiamento do AP',
      supplier: 'Banco Santander',
      amount: 1200,
      category: { name: 'Casa', icon: Home, color: '#3B82F6' },
      payer: { name: 'João', color: '#3B82F6' },
      dueDate: '2025-01-15',
      status: 'paid',
      splitAmount: 840
    },
    {
      id: '2',
      description: 'Supermercado',
      supplier: 'Carrefour',
      amount: 450,
      category: { name: 'Alimentação', icon: Coffee, color: '#10B981' },
      payer: { name: 'Maria', color: '#EF4444' },
      dueDate: '2025-01-10',
      status: 'pending',
      splitAmount: 225
    },
    {
      id: '3',
      description: 'Combustível',
      supplier: 'Posto BR',
      amount: 180,
      category: { name: 'Transporte', icon: Car, color: '#F59E0B' },
      payer: { name: 'João', color: '#3B82F6' },
      dueDate: '2025-01-08',
      status: 'paid',
      splitAmount: 90
    },
    {
      id: '4',
      description: 'Netflix',
      supplier: 'Netflix',
      amount: 45,
      category: { name: 'Entretenimento', icon: CreditCard, color: '#8B5CF6' },
      payer: { name: 'Maria', color: '#EF4444' },
      dueDate: '2025-01-05',
      status: 'overdue',
      splitAmount: 22.50
    },
    {
      id: '5',
      description: 'Energia elétrica',
      supplier: 'CELESC',
      amount: 280,
      category: { name: 'Casa', icon: Zap, color: '#3B82F6' },
      payer: { name: 'João', color: '#3B82F6' },
      dueDate: '2025-01-20',
      status: 'pending',
      splitAmount: 140
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'pending': return Clock;
      case 'overdue': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'pending': return 'Pendente';
      case 'overdue': return 'Atrasado';
      default: return 'Pendente';
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    if (selectedFilter === 'all') return true;
    return expense.status === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo e título */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Partilio</h1>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Olá, {user?.name || 'Usuário'}
                  </p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                
                <div className="relative">
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {/* Menu dropdown (simplificado) */}
                  <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                    <button 
                      onClick={() => router.push('/settings')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </button>
                    <button 
                      onClick={() => logout()}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Bem-vindo ao seu dashboard! 👋
              </h2>
              <p className="text-blue-100">
                Aqui você acompanha todas as despesas familiares em tempo real
              </p>
            </div>
            <button 
              onClick={() => router.push('/expenses/new')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              Nova Despesa
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total do Mês</h3>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              R$ {summary.totalMonth.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <ArrowUp className="w-3 h-3 mr-1" />
              12% vs mês anterior
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Sua Parte</h3>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              R$ {summary.yourShare.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              55% do total
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Parte do(a) Parceiro(a)</h3>
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              R$ {summary.partnerShare.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              45% do total
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Pendentes</h3>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {summary.pendingPayments}
            </p>
            <p className="text-sm text-yellow-600 mt-2">
              Precisam atenção
            </p>
          </div>
        </div>

        {/* Expenses list */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Despesas Recentes
              </h3>
              <button 
                onClick={() => router.push('/expenses')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver todas
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'all', label: 'Todas' },
                  { key: 'pending', label: 'Pendentes' },
                  { key: 'paid', label: 'Pagas' },
                  { key: 'overdue', label: 'Atrasadas' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      selectedFilter === filter.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 ml-auto">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {filteredExpenses.map((expense) => {
              const Icon = expense.category.icon;
              const StatusIcon = getStatusIcon(expense.status);
              
              return (
                <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Category icon */}
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: expense.category.color + '20' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: expense.category.color }} />
                      </div>

                      {/* Expense details */}
                      <div>
                        <h4 className="font-medium text-gray-900">{expense.description}</h4>
                        <p className="text-sm text-gray-500">{expense.supplier}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-400">{expense.category.name}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">
                            Vence em {new Date(expense.dueDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amount and status */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        R$ {expense.amount.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Sua parte: R$ {expense.splitAmount.toLocaleString('pt-BR')}
                      </p>
                      
                      <div className="flex items-center justify-end mt-2">
                        <div 
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {getStatusText(expense.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredExpenses.length === 0 && (
            <div className="p-12 text-center">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma despesa encontrada
              </h3>
              <p className="text-gray-500 mb-6">
                Não há despesas para o filtro selecionado.
              </p>
              <button 
                onClick={() => setSelectedFilter('all')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver todas as despesas
              </button>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => router.push('/expenses/new')}
            className="p-6 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-left"
          >
            <Plus className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Nova Despesa</h3>
            <p className="text-sm text-gray-500">Adicionar uma nova despesa familiar</p>
          </button>

          <button 
            onClick={() => router.push('/reports')}
            className="p-6 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-left"
          >
            <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Relatórios</h3>
            <p className="text-sm text-gray-500">Ver análises e gráficos detalhados</p>
          </button>

          <button 
            onClick={() => router.push('/settings')}
            className="p-6 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-left"
          >
            <Settings className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Configurações</h3>
            <p className="text-sm text-gray-500">Gerenciar categorias e pagadores</p>
          </button>
        </div>
      </main>
    </div>
  );
}