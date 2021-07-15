import { useQuery } from "react-query";
import { useHttp } from "utils/http";
import { IProject } from "typings/project";

const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<IProject>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id), // id 有值时才触发数据获取
    }
  );
};

export default useProject;
