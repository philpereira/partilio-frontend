import { z } from 'zod';

export const expenseSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  supplier: z.string().min(1, 'Fornecedor é obrigatório'),
  totalAmount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  type: z.enum(['RECORRENTE_FIXA', 'RECORRENTE_VARIAVEL', 'CARTAO_CREDITO', 'EVENTUAL']),
  recurrence: z.enum(['MENSAL', 'BIMESTRAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL']).optional(),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  buyerId: z.string().min(1, 'Comprador é obrigatório'),
  creditCardId: z.string().optional(),
  installments: z.number().min(1).max(48),
  firstDueDate: z.string(),
  observations: z.string().optional(),
  splitConfig: z.array(z.object({
    payerId: z.string(),
    percentage: z.number().min(0).max(100),
  })).min(1, 'Pelo menos um pagador deve ser selecionado'),
});

export type ExpenseSchema = z.infer<typeof expenseSchema>;
