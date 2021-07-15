import { useHttp } from "utils/http";
import { IProject } from "../../../typings/project";
import { useQuery } from "react-query";

const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp();
  const fetchProjects = () => client("projects", { data: param });

  return useQuery<IProject[]>(["projects", param], fetchProjects);
};
export default useProjects;
