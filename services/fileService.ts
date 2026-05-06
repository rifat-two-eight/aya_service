import axiosInstance from "@/lib/axios";

export const fileService = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
