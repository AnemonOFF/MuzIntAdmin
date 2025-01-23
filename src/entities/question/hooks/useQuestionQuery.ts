import { questionsController } from "@/shared/api/client";
import { questionKey } from "@/shared/lib/queryKeyFactory";
import { Question } from "@/shared/types/question";
import { useQuery } from "@tanstack/react-query";

const useQuestionQuery = (id: Question["id"], enabled?: boolean) => {
  return useQuery({
    queryKey: questionKey.detail(id),
    queryFn: async () => await questionsController.getQuestion(id),
    enabled: enabled,
  });
};

export default useQuestionQuery;
