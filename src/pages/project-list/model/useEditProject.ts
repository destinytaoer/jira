import { useHttp } from "utils/http";
import { IProject } from "../typings";
import { useMutation, useQueryClient } from "react-query";

const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};

export default useEditProject;
