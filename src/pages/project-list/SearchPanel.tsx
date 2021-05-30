import { Dispatch, FC, memo } from "react";
import { IParam } from "./typings";
import { IUser } from "typings/user";

interface IProps {
  param: IParam;
  users: IUser[];
  setParam: Dispatch<IParam>;
}
const SearchPanel: FC<IProps> = memo(({ param, users, setParam }) => {
  return (
    <form action="">
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(e) => setParam({ ...param, personId: e.target.value })}
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
});

export default SearchPanel;
