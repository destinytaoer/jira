import { IEpic } from "typings/epic";
import { useHttp } from "../../utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
} from "../../hooks/useOptimisticOptions";
import { useProjectIdInUrl } from "../kanban/util";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];

export const useEpics = (param?: Partial<IEpic>) => {
  const client = useHttp();

  return useQuery<IEpic[]>(["epics", param], () =>
    client("epics", { data: param })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<IEpic>) =>
      client("epics", { data: params, method: "POST" }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`epics/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
