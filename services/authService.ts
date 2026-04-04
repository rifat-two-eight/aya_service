import axiosInstance from "@/lib/axios";

export const authService = {
  adminLogin: async (credentials: any) => {
    try {
      const response = await axiosInstance.post("/auth/admin-login", credentials);
      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },
};
