import APIClient from "./api-client";

const apiClient = new APIClient("/auth/login");

class AuthService {
  AuthenticateUser(user) {
    return apiClient.post(user);
  }
}

export default new AuthService();
