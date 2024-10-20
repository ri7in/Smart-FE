import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("waste-bins/1/history");

const useHistory = () =>
  useQuery({
    queryKey: ["history"],
    queryFn: () => apiClient.getAll(),
  });

export default useHistory;
