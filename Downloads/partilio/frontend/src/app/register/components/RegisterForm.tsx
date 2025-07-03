'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../../store';  // ← MUDANÇA: @/stores/authStore → ../../../store
import { authService } from '../../../services/auth.service';  // ← MUDANÇA: @/services → ../../../services
import { validateRegisterForm } from './FormValidation';
import { RegisterFormData, RegisterFormErrors } from '../../../types/auth';  // ← MUDANÇA: @/types → ../../../types
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  User, 
  Mail, 
  Lock, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';

export const RegisterForm = () => {
  const router = useRouter();
  const { setAuth } = useAppStore();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields(prev => new Set([...prev, fieldName]));
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    if (touchedFields.has(field)) {
      const fieldErrors = validateRegisterForm(newFormData);
      setErrors(prev => ({
        ...prev,
        [field]: fieldErrors[field]
      }));
    }
  };

  const handleBlur = (field: keyof RegisterFormData) => {
    markFieldAsTouched(field);
    const fieldErrors = validateRegisterForm(formData);
    setErrors(prev => ({
      ...prev,
      [field]: fieldErrors[field]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouchedFields(new Set(['name', 'email', 'password', 'confirmPassword']));

    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setIsLoading(true);

    try {
      // 🔧 USAR O authService.register EXISTENTE
      const registerResponse = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      toast.success('Conta criada com sucesso!');

      // 🔧 ADAPTAR para estrutura atual do store (auth em vez de user/token separados)
      setAuth({
        user: registerResponse.user,
        token: registerResponse.tokens.accessToken,
        refreshToken: registerResponse.tokens.refreshToken
      });

      toast.success(`Bem-vindo, ${registerResponse.user.name}!`);

      // Redirecionar baseado no onboarding
      if (registerResponse.user.onboardingCompleted) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }

    } catch (error: any) {
      console.error('Erro no registro:', error);
      
      if (error.response?.status === 409) {
        setErrors({ email: 'Este email já está cadastrado' });
        toast.error('Este email já está cadastrado');
      } else if (error.response?.status === 400) {
        const backendErrors = error.response.data?.errors || {};
        setErrors(backendErrors);
        toast.error('Dados inválidos. Verifique o formulário.');
      } else {
        toast.error('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasError = (field: string) => {
    return touchedFields.has(field) && errors[field as keyof RegisterFormErrors];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nome completo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={`
              block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-colors
              ${hasError('name') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}
            placeholder="Seu nome completo"
            disabled={isLoading}
          />
          {hasError('name') && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {hasError('name') && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
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
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`
              block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-colors
              ${hasError('email') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}
            placeholder="seu@email.com"
            disabled={isLoading}
          />
          {hasError('email') && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {hasError('email') && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Senha */}
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
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            className={`
              block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-colors
              ${hasError('password') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}
            placeholder="Mínimo 8 caracteres"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {hasError('password') && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirmar Senha */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirmar senha
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            className={`
              block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-colors
              ${hasError('confirmPassword') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}
            placeholder="Digite a senha novamente"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {hasError('confirmPassword') && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent 
          rounded-lg shadow-sm text-sm font-medium text-white
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          transition-all duration-200
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }
        `}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Criando conta...
          </>
        ) : (
          <>
            <CheckCircle2 className="h-5 w-5" />
            Criar conta
          </>
        )}
      </button>

      {/* Termos */}
      <p className="text-xs text-gray-500 text-center">
        Ao criar uma conta, você concorda com nossos{' '}
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Termos de Serviço
        </a>{' '}
        e{' '}
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Política de Privacidade
        </a>
      </p>
    </form>
  );
};