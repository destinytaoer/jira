import { useHttp } from "utils/http";
import { QueryKey, useMutation } from "react-query";
import { useDeleteConfig } from "hooks/useOptimisticOptions";
const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export default useDeleteProject;
