export interface Expense {
  id: string;
  description: string;
  supplier: string;
  totalAmount: number;
  type: ExpenseType;
  recurrence?: ExpenseRecurrence;
  categoryId: string;
  buyerId: string;
  creditCardId?: string;
  installments: number;
  firstDueDate: string;
  observations?: string;
  isActive: boolean;
  createdAt: string;
  
  // Relacionamentos
  category: Category;
  buyer: Payer;
  creditCard?: CreditCard;
  payments: ExpensePayment[];
}

export type ExpenseType = 'RECORRENTE_FIXA' | 'RECORRENTE_VARIAVEL' | 'CARTAO_CREDITO' | 'EVENTUAL';

export type ExpenseRecurrence = 'MENSAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'SEMESTRAL' | 'ANUAL';

export interface ExpensePayment {
  id: string;
  expenseId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  installmentNumber: number;
  payerId: string;
  payer: Payer;
}

export interface CreateExpenseData {
  description: string;
  supplier: string;
  totalAmount: number;
  type: ExpenseType;
  recurrence?: ExpenseRecurrence;
  categoryId: string;
  buyerId: string;
  creditCardId?: string;
  installments: number;
  firstDueDate: string;
  observations?: string;
  splitConfig: SplitConfig[];
}

export interface SplitConfig {
  payerId: string;
  percentage: number;
}
