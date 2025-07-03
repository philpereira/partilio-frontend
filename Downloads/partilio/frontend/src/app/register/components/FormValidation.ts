import { RegisterFormData, RegisterFormErrors } from '../../../types/auth';  // ← MUDANÇA: @/types → ../../../types

export const validateRegisterForm = (data: RegisterFormData): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

  // Validar nome
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Nome é obrigatório';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Nome deve ter no máximo 100 caracteres';
  } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(data.name.trim())) {
    errors.name = 'Nome deve conter apenas letras e espaços';
  }

  // Validar email
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email é obrigatório';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Email inválido';
    } else if (data.email.length > 255) {
      errors.email = 'Email muito longo';
    }
  }

  // Validar senha
  if (!data.password || data.password.length === 0) {
    errors.password = 'Senha é obrigatória';
  } else if (data.password.length < 8) {
    errors.password = 'Senha deve ter pelo menos 8 caracteres';
  } else if (data.password.length > 128) {
    errors.password = 'Senha muito longa (máximo 128 caracteres)';
  } else {
    const hasUpperCase = /[A-Z]/.test(data.password);
    const hasLowerCase = /[a-z]/.test(data.password);
    const hasNumbers = /\d/.test(data.password);

    if (!hasUpperCase) {
      errors.password = 'Senha deve conter pelo menos uma letra maiúscula';
    } else if (!hasLowerCase) {
      errors.password = 'Senha deve conter pelo menos uma letra minúscula';
    } else if (!hasNumbers) {
      errors.password = 'Senha deve conter pelo menos um número';
    }
  }

  // Validar confirmação de senha
  if (!data.confirmPassword || data.confirmPassword.length === 0) {
    errors.confirmPassword = 'Confirmação de senha é obrigatória';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Senhas não coincidem';
  }

  return errors;
};