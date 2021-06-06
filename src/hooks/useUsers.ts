import useMount from "hooks/useMount";
import useAsync from "hooks/useAsync";
import { useHttp } from "utils/http";
import { IUser } from "typings/user";

const useUsers = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<IUser[]>();
  useMount(() => {
    run(client("users"));
  });

  return result;
};
export default useUsers;
