import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/Sales/api-client";

const apiClient = new APIClient("/collections");

const useCollections = (id) =>
  useQuery({
    queryKey: ["collections", id],
    queryFn: () => apiClient.get(id),
  });

export default useCollections;
