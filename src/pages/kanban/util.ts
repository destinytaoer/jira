import useUrlQueryParam from "hooks/useUrlQueryParam";
import useProject from "pages/project-list/model/useProject";
import { useCallback, useMemo } from "react";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useLocation } from "react-router";
import { useHttp } from "../../utils/http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderKanbanConfig,
  useReorderTaskConfig,
} from "../../hooks/useOptimisticOptions";
import { IKanban } from "../../typings/kanban";
import { ITask } from "../../typings/task";
import useDebounce from "../../hooks/useDebounce";
import { ITaskType } from "../../typings/taskType";

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
  const debounceName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processId: Number(param.processId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debounceName,
    }),
    [projectId, param, debounceName]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useKanbans = (param?: Partial<IKanban>) => {
  const client = useHttp();
  const fetchProjects = () => client("kanbans", { data: param });

  return useQuery<IKanban[]>(["kanbans", param], fetchProjects);
};

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

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useTasks = (param?: Partial<ITask>) => {
  const client = useHttp();
  const fetchProjects = () => client("tasks", { data: param });

  return useQuery<ITask[]>(["tasks", param], fetchProjects);
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

export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<ITask>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ITask>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return { editingTaskId, editingTask, isLoading, startEdit, close };
};

export interface SortProps {
  /* ???????????? item ????????????????????? */
  type: "before" | "after";
  /* ?????? item */
  referenceId: number;
  /** ??????????????? item */
  fromId: number;
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
export const useTaskTypes = () => {
  const client = useHttp();
  const fetchProjects = () => client("taskTypes");

  return useQuery<ITaskType[]>(["taskTypes"], fetchProjects);
};
