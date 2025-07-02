export interface DashboardData {
  overview: DashboardOverview;
  summary: MonthSummary;
  categoryBreakdown: CategoryBreakdown[];
  payerBreakdown: PayerBreakdown[];
  upcomingPayments: UpcomingPayment[];
}

export interface DashboardOverview {
  totalExpenses: number;
  totalPending: number;
  totalPaid: number;
  monthlyAverage: number;
}

export interface MonthSummary {
  month: string;
  year: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  expensesCount: number;
}

export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface PayerBreakdown {
  payerId: string;
  payerName: string;
  amount: number;
  percentage: number;
}

export interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  payerName: string;
  categoryName: string;
  status: 'PENDING' | 'OVERDUE';
  expenseId: string;
}
