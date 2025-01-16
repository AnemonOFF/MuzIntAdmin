import { Block } from "@/shared/types/gamePack";
import { apiClient } from "./axios";

const getBlock = async (id: Block["id"]) => {
  const response = await apiClient.get<Block>(`/blocks/${id}`);
  return response.data;
};

const blocksController = {
  getBlock,
};

export default blocksController;
