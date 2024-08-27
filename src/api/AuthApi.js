import axiosInstance from "./axiosInstance";

class AuthApi {
  static async login(username, password) {
    try {
      const response = await axiosInstance.post("auth/signin", {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthApi;
