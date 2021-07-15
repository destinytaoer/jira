import { useQuery } from "react-query";
import { useHttp } from "utils/http";
import { ITask } from "typings/task";

export const useTasks = (param?: Partial<ITask>) => {
  const client = useHttp();
  const fetchProjects = () => client("tasks", { data: param });

  return useQuery<ITask[]>(["tasks", param], fetchProjects);
};
