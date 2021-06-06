import useUsers from "hooks/useUsers";
import { ComponentProps } from "react";
import IdSelect from "./IdSelect";

const UserSelect = (props: ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();

  return <IdSelect options={users ?? []} {...props} />;
};

export default UserSelect;
