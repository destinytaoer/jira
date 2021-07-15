import useUrlQueryParam, { useSetUrlSearchParam } from "hooks/useUrlQueryParam";
import { useCallback } from "react";
import useProject from "./useProject";

const useProjectModal = () => {
  const [{ projectCreate }, setProjectQuery] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = useCallback(
    () => setProjectQuery({ projectCreate: true }),
    [setProjectQuery]
  );
  const close = useCallback(() => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  }, [setUrlParams]);

  const startEdit = useCallback(
    (id: number) => setProjectId({ editingProjectId: id }),
    [setProjectId]
  );

  return {
    projectModalVisible: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

export default useProjectModal;
