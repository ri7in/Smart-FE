import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/inquiries");

const useInqury = () =>
  useQuery({
    queryKey: ["inquiries"],
    queryFn: () => apiClient.getAll(),
  });

export default useInqury;
