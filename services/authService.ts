import axiosInstance from "@/lib/axios";

export const authService = {
  adminLogin: async (credentials: any) => {
    try {
      const response = await axiosInstance.post("/auth/admin-login", credentials);
      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userRole", "admin");
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  login: async (credentials: any, role: 'client' | 'business') => {
    try {
      const response = await axiosInstance.post("/auth/login", { ...credentials, role });
      if (response.data.success) {
        const { accessToken, refreshToken, userInfo } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Set session cookie for middleware
        const maxAge = 60 * 60 * 24 * 30;
        document.cookie = `aya_client_session=1; path=/; max-age=${maxAge}; samesite=lax`;
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  register: async (userData: any, role: 'client' | 'business') => {
    try {
      const response = await axiosInstance.post("/auth/register", { ...userData, role });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");
    
    // Clear session cookie
    document.cookie = "aya_client_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    window.location.href = "/auth";
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },
};
