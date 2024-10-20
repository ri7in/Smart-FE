import APIClient from "./api-client";

const apiClient = new APIClient("/users/register");

class inquiryService {
  Create(inqury) {
    return apiClient.post(user);
  }
  delete(inqury) {
    return apiClient.delete(user);
  }
  update(param, config) {
    return apiClient.put(param, config);
  }
}

export default new inquiryService();
