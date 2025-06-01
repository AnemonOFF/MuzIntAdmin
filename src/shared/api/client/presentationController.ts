import { apiMapper } from "@/shared/lib/mapping";
import { apiClient } from "./axios";
import {
  API_Presentation,
  CreatePresentationRequest,
  Presentation,
} from "@/shared/types/presentation";
import {
  API_Slide,
  SetSlideActionRequest,
  SetSlideOrderRequest,
  Slide,
} from "@/shared/types/slide";

const getPresentation = async (id: Presentation["id"]) => {
  const response = await apiClient.get<API_Presentation>(`/presentation/${id}`);
  return apiMapper.mapPresentation(response.data);
};

const createPresentation = async (data: CreatePresentationRequest) => {
  const response = await apiClient.post<API_Presentation>(
    "/presentation",
    data
  );
  return apiMapper.mapPresentation(response.data);
};

const deletePresentation = async (id: Presentation["id"]) => {
  const response = await apiClient.delete<API_Presentation>(
    `/presentation/${id}`
  );
  return apiMapper.mapPresentation(response.data);
};

const createSlide = async (
  presentationId: Presentation["id"],
  content: File | Blob,
  sound?: File | Blob
) => {
  const formData = new FormData();
  formData.append("content", content);
  if (sound) formData.append("sound", sound);

  const response = await apiClient.post<API_Slide>(
    `/presentation/${presentationId}/slides`,
    formData
  );
  return apiMapper.mapSlide(response.data);
};

const updateSlideContent = async (
  presentationId: Presentation["id"],
  slideId: Slide["id"],
  content: File | Blob
) => {
  const formData = new FormData();
  formData.append("content", content);

  const response = await apiClient.put<API_Slide>(
    `/presentation/${presentationId}/slides/${slideId}/content`,
    formData
  );
  return apiMapper.mapSlide(response.data);
};

const updateSlideAudio = async (
  presentationId: Presentation["id"],
  slideId: Slide["id"],
  audio?: File | Blob
) => {
  const formData = new FormData();
  if (audio) formData.append("audio", audio);

  const response = await apiClient.put<API_Slide>(
    `/presentation/${presentationId}/slides/${slideId}/audio`,
    formData
  );
  return apiMapper.mapSlide(response.data);
};

const deleteSlideAction = async (
  presentationId: Presentation["id"],
  slideId: Slide["id"]
) => {
  const response = await apiClient.delete<API_Slide>(
    `/presentation/${presentationId}/slides/${slideId}/action`
  );
  return apiMapper.mapSlide(response.data);
};

const updateSlideAction = async (
  presentationId: Presentation["id"],
  slideId: Slide["id"],
  data: SetSlideActionRequest
) => {
  const response = await apiClient.put<API_Slide>(
    `/presentation/${presentationId}/slides/${slideId}/action`,
    data
  );
  return apiMapper.mapSlide(response.data);
};

const deleteSlide = async (
  presentationId: Presentation["id"],
  slideId: Slide["id"]
) => {
  const response = await apiClient.delete<API_Slide>(
    `/presentation/${presentationId}/slides/${slideId}`
  );
  return apiMapper.mapSlide(response.data);
};

const reorderSlides = async (
  presentationId: Presentation["id"],
  data: SetSlideOrderRequest
) => {
  const response = await apiClient.put<API_Presentation>(
    `/presentation/${presentationId}/slides/order`,
    data
  );
  return apiMapper.mapPresentation(response.data);
};

const presentationController = {
  getPresentation,
  createPresentation,
  deletePresentation,
  createSlide,
  deleteSlideAction,
  updateSlideAction,
  updateSlideAudio,
  updateSlideContent,
  deleteSlide,
  reorderSlides,
};

export default presentationController;
