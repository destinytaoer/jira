import { useQuery } from "react-query";
import { useHttp } from "utils/http";
import { ITaskType } from "typings/taskType";

export const useTaskTypes = () => {
  const client = useHttp();
  const fetchProjects = () => client("taskTypes");

  return useQuery<ITaskType[]>(["taskTypes"], fetchProjects);
};
