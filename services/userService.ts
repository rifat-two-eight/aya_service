import axiosInstance from "@/lib/axios";

export interface UserFetchParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export const userService = {
  getUsers: async (params: UserFetchParams = {}) => {
    try {
      const { page = 1, limit = 10, searchTerm = "" } = params;
      const response = await axiosInstance.get("/user", {
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
};
