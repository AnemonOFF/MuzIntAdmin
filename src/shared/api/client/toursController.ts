import { Tour } from "@/shared/types/gamePack";
import { apiClient } from "./axios";

const getTour = async (id: Tour["id"]) => {
  const response = await apiClient.get<Tour>(`/tours/${id}`);
  return response.data;
};

const toursController = {
  getTour,
};

export default toursController;
