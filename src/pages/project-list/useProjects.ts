import { useEffect } from "react";
import useAsync from "hooks/useAsync";
import { useHttp } from "utils/http";
import { IProject } from "./typings";

const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<IProject[]>();
  useEffect(() => {
    run(client("projects", { data: param }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export default useProjects;
