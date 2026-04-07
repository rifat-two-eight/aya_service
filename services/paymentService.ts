import axiosInstance from "@/lib/axios";

export interface PaymentFetchParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export const paymentService = {
  getPayments: async (params: PaymentFetchParams = {}) => {
    try {
      const { page = 1, limit = 10, searchTerm = "" } = params;
      const response = await axiosInstance.get("/payment", {
        params: {
          page,
          limit,
          searchTerm,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getPaymentById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/payment/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
