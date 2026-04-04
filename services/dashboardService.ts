import axiosInstance from "@/lib/axios";

export const dashboardService = {
  // Method to fetch all dashboard statistics
  getStats: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/stats");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Method to fetch recent users
  getRecentUsers: async () => {
    try {
      const response = await axiosInstance.get("/user", {
        params: {
          limit: 4,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Method to fetch recent transactions
  getRecentTransactions: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/recent-transactions");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Method to fetch active sessions
  getActiveSessions: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/active-sessions");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
