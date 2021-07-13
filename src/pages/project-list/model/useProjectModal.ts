import useUrlQueryParam from "hooks/useUrlQueryParam";
import { useCallback } from "react";

const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = useCallback(
    () => setProjectCreate({ projectCreate: true }),
    [setProjectCreate]
  );
  const close = useCallback(
    () => setProjectCreate({ projectCreate: undefined }),
    [setProjectCreate]
  );

  return [projectCreate === "true", open, close] as const;
};

export default useProjectModal;
