import { useHttp } from "utils/http";
import { IProject } from "../../../typings/project";
import { QueryKey, useMutation } from "react-query";
import { useEditConfig } from "hooks/useOptimisticOptions";

const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export default useEditProject;
