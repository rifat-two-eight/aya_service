import axiosInstance from "@/lib/axios";

export const categoryService = {
  getCategories: async () => {
    try {
      const response = await axiosInstance.get("/category");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
