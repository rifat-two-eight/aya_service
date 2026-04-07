import axiosInstance from "@/lib/axios";

export interface ServiceFetchParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export const serviceService = {
  getServices: async (params: ServiceFetchParams = {}) => {
    try {
      const { page = 1, limit = 10, searchTerm = "" } = params;
      const response = await axiosInstance.get("/service", {
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

  getServiceById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/service/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  deleteService: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/service/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
