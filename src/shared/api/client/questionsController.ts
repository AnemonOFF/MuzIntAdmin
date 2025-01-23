import {
  CreateQuestionRequest,
  Question,
  UpdateQuestionRequest,
} from "@/shared/types/question";
import { apiClient } from "./axios";

const getQuestion = async (id: Question["id"]) => {
  const response = await apiClient.get<Question>(`/questions/${id}`);
  return response.data;
};

const createQuestion = async (data: CreateQuestionRequest) => {
  const response = await apiClient.post<Question>("/questions", data);
  return response.data;
};

const updateQuestion = async (
  id: Question["id"],
  data: UpdateQuestionRequest
) => {
  const response = await apiClient.put<Question>(`/questions/${id}`, data);
  return response.data;
};

const deleteQuestion = async (id: Question["id"]) => {
  const response = await apiClient.delete<Question>(`/questions/${id}`);
  return response.data;
};

const questionsController = {
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

export default questionsController;
