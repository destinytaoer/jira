import { useHttp } from "utils/http";
import { IProject } from "../typings";
import { QueryKey, useMutation } from "react-query";
import { useAddConfig } from "hooks/useOptimisticOptions";

const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export default useAddProject;
