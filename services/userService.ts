import axiosInstance from "@/lib/axios";

export const userService = {
  getMe: async () => {
    try {
      const response = await axiosInstance.get("/user/me");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  updateProfile: async (data: any) => {
    try {
      const response = await axiosInstance.patch("/user/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  updateBusinessProfile: async (data: any) => {
    try {
      const response = await axiosInstance.patch("/user/business-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getUsers: async (params?: { page?: number; limit?: number; searchTerm?: string; role?: string; status?: string }) => {
    try {
      const response = await axiosInstance.get("/user", { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/user/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  updateBusinessStatus: async (id: string, data: { businessStatus: string; rejectedReason?: string }) => {
    try {
      const response = await axiosInstance.patch(`/user/update-business-status/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
