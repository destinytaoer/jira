import { useQuery } from "react-query";
import { useHttp } from "utils/http";

const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery(["project", { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id), // id 有值时才触发数据获取
  });
};

export default useProject;
