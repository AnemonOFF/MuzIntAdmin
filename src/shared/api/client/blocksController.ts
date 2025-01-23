import {
  Block,
  CreateBlockRequest,
  UpdateBlockRequest,
} from "@/shared/types/block";
import { apiClient } from "./axios";

const getBlock = async (id: Block["id"]) => {
  const response = await apiClient.get<Block>(`/blocks/${id}`);
  return response.data;
};

const createBlock = async (data: CreateBlockRequest) => {
  const response = await apiClient.post<Block>("/blocks", data);
  return response.data;
};

const updateBlock = async (id: Block["id"], data: UpdateBlockRequest) => {
  const response = await apiClient.put<Block>(`/blocks/${id}`, data);
  return response.data;
};

const deleteBlock = async (id: Block["id"]) => {
  const response = await apiClient.delete<Block>(`/blocks/${id}`);
  return response.data;
};

const blocksController = {
  getBlock,
  createBlock,
  updateBlock,
  deleteBlock,
};

export default blocksController;
