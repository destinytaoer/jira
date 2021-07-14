import { useHttp } from "utils/http";
import { IProject } from "../typings";
import { useMutation, useQueryClient } from "react-query";

const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};

export default useAddProject;
