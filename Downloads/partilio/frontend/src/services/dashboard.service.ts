import api from '@/lib/api';
import type { DashboardData } from '@/types/dashboard';
import type { APIResponse } from '@/types';

export const dashboardService = {
  async getDashboardData(period?: { month: number; year: number }): Promise<DashboardData> {
    const params = period ? { month: period.month, year: period.year } : {};
    const response = await api.get<APIResponse<DashboardData>>('/dashboard', { params });
    return response.data.data;
  },

  async markPaymentAsPaid(paymentId: string): Promise<void> {
    await api.post(`/payments/${paymentId}/mark-as-paid`);
  },
};
