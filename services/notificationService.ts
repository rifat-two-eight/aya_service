import axiosInstance from "@/lib/axios";

export const notificationService = {
  getNotifications: async (params: { page?: number; limit?: number } = {}) => {
    try {
      const response = await axiosInstance.get("/notification", { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getUnreadCount: async () => {
    try {
      const response = await axiosInstance.get("/notification/unread-count");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
