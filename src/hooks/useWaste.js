import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/waste-bins");

const useWaste = () =>
  useQuery({
    queryKey: ["waste-bins"],
    queryFn: () => apiClient.getAll(),
  });

export default useWaste;
