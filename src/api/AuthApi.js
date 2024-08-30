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

  static async refresh() {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (!refresh_token) throw new Error("No refresh token");

      const response = await axiosInstance.post("auth/refresh", null, {
        headers: {
          "refresh-token": refresh_token
        }
      });

      const { access_token, refresh_token: new_refresh_token } = response;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", new_refresh_token);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthApi;
