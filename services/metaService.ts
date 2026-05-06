import axiosInstance from "@/lib/axios";

export const metaService = {
  getLandingStats: async () => {
    try {
      const response = await axiosInstance.get("/meta/landing-stats");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
