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
      const response = await axiosInstance.patch("/user/profile", data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
