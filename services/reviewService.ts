import axiosInstance from "@/lib/axios";

export const reviewService = {
  getReviewsByServiceId: async (serviceId: string, params: { page?: number; limit?: number } = {}) => {
    try {
      const response = await axiosInstance.get(`/review/${serviceId}`, { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  createReview: async (data: { service: string; rating: number; comment: string }) => {
    try {
      const response = await axiosInstance.post("/review", data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  deleteReview: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/review/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
