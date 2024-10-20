import APIClient from "./api-client";

const apiClient = new APIClient("/users/register");

class UserService {
    Create(user) {

        return apiClient.post(user);
    }
    delete(user) {
        return apiClient.delete(user);
    }
}

export default new UserService();