import axios from "axios";

const apiUrl = "http://127.0.0.1:8000"; // Replace with your backend API URL

export const fileServices = {
  async getFiles() {
    try {
      const response = await axios.get(`${apiUrl}/files`); // Replace "/files" with your actual endpoint
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching files: ${error}`);
    }
  },
};
