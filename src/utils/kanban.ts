import { useQuery } from "react-query";
import { useHttp } from "utils/http";
import { IKanban } from "typings/kanban";

export const useKanbans = (param?: Partial<IKanban>) => {
  const client = useHttp();
  const fetchProjects = () => client("kanbans", { data: param });

  return useQuery<IKanban[]>(["kanbans", param], fetchProjects);
};
