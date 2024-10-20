import APIClient from "./api-client";

const apiClient = new APIClient("/waste-bins");

class wasteService {
  Create(config) {
    return apiClient.post(config);
  }
  delete(config) {
    return apiClient.delete(config);
  }
}

export default new wasteService();
