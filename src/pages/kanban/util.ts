import useUrlQueryParam from "hooks/useUrlQueryParam";
import useProject from "pages/project-list/model/useProject";
import { useMemo } from "react";
import { QueryKey, useMutation } from "react-query";
import { useLocation } from "react-router";
import { useHttp } from "../../utils/http";
import { useAddConfig } from "../../hooks/useOptimisticOptions";
import { IKanban } from "../../typings/kanban";
import { ITask } from "../../typings/task";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "typeId", "processId", "tagId"]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processId: Number(param.processId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<IKanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useAddTasks = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<ITask>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
