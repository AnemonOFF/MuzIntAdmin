import {
  CreateTourRequest,
  Tour,
  UpdateTourRequest,
} from "@/shared/types/tour";
import { apiClient } from "./axios";

const getTour = async (id: Tour["id"]) => {
  const response = await apiClient.get<Tour>(`/tours/${id}`);
  return response.data;
};

const createTour = async (data: CreateTourRequest) => {
  const response = await apiClient.post<Tour>("/tours", data);
  return response.data;
};

const updateTour = async (id: Tour["id"], data: UpdateTourRequest) => {
  const response = await apiClient.put<Tour>(`/tours/${id}`, data);
  return response.data;
};

const deleteTour = async (id: Tour["id"]) => {
  const response = await apiClient.delete<Tour>(`/tours/${id}`);
  return response.data;
};

const toursController = {
  getTour,
  createTour,
  updateTour,
  deleteTour,
};

export default toursController;
