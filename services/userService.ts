import axiosInstance from "@/lib/axios";

export interface UserFetchParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
}

export const userService = {
  getUsers: async (params: UserFetchParams = {}) => {
    try {
      const { page = 1, limit = 10, searchTerm = "", role } = params;
      const response = await axiosInstance.get("/user", {
        params: {
          page,
          limit,
          searchTerm,
          ...(role && { role }),
        },
      });
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
};
