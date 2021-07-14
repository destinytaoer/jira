import useUrlQueryParam from "hooks/useUrlQueryParam";
import { useCallback } from "react";
import useProject from "./useProject";

const useProjectModal = () => {
  const [{ projectCreate, editingProjectId }, setProjectQuery] =
    useUrlQueryParam(["projectCreate", "editingProjectId"]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = useCallback(
    () => setProjectQuery({ projectCreate: true }),
    [setProjectQuery]
  );
  const close = useCallback(() => {
    setProjectQuery({ projectCreate: undefined, editingProjectId: undefined });
  }, [setProjectQuery]);

  const startEdit = useCallback(
    (id: number) => setProjectQuery({ editingProjectId: id }),
    [setProjectQuery]
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
