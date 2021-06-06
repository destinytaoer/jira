import { useHttp } from "utils/http";
import useAsync from "hooks/useAsync";
import { IProject } from "./typings";

const useAddProject = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<IProject>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...result,
  };
};

export default useAddProject;
