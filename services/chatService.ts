import axiosInstance from "@/lib/axios";

export const chatService = {
  createChat: async (participant: string) => {
    try {
      const response = await axiosInstance.post("/chat", { participant });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  createAdminSupportChat: async () => {
    try {
      const response = await axiosInstance.post("/chat/admin-support");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getChats: async (params: { page?: number; limit?: number } = {}) => {
    try {
      const response = await axiosInstance.get("/chat", { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  deleteChat: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/chat/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  sendMessage: async (data: { chatId: string; text?: string; type?: string; file?: File | string }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value as any);
        }
      });

      const response = await axiosInstance.post("/message", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getMessages: async (chatId: string, params: { page?: number; limit?: number } = {}) => {
    try {
      const response = await axiosInstance.get(`/message/${chatId}`, { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getUnreadCount: async () => {
    try {
      const response = await axiosInstance.get("/message/unread/count");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
