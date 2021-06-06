import { useHttp } from "utils/http";
import useAsync from "hooks/useAsync";
import { IProject } from "./typings";

const useEditProject = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<IProject>) =>
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );

  return {
    mutate,
    ...result,
  };
};

export default useEditProject;
