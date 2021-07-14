import { QueryKey, useQueryClient } from "react-query";

const useOptimisticOptions = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });

      return { previousItems };
    },
    onError(err: any, newItem: any, context: any) {
      queryClient.setQueryData(
        queryKey,
        (context as { previousItems: any[] }).previousItems
      );
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => {
    return old?.filter(item => item.id !== target.id) ?? [];
  });

export const useEditConfig = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => {
    return (
      old?.map(item =>
        item.id === target.id ? { ...item, ...target } : item
      ) ?? []
    );
  });
export const useAddConfig = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => {
    return old ? [...old, target] : [target];
  });

export default useOptimisticOptions;
