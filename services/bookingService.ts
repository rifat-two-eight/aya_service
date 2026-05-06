import axiosInstance from "@/lib/axios";

export interface CreateBookingData {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
  paymentMethod: "online" | "cod";
}

export const bookingService = {
  createBooking: async (data: CreateBookingData) => {
    try {
      const response = await axiosInstance.post("/booking", data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getMyBookings: async (params: { page?: number; limit?: number } = {}) => {
    try {
      const response = await axiosInstance.get("/booking", { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getBookingById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/booking/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  updateBookingStatus: async (id: string, status: "completed" | "cancelled") => {
    try {
      const response = await axiosInstance.patch(`/booking/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
