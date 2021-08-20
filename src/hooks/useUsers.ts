import { useHttp } from "utils/http";
import { IUser } from "typings/user";
import { useQuery } from "react-query";

const useUsers = (param?: Partial<IUser>) => {
  const client = useHttp();

  return useQuery<IUser[]>(["users", param], () =>
    client("users", { data: param })
  );
};
export default useUsers;
