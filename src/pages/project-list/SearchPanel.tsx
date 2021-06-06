import { Dispatch, FC, memo } from "react";
import { IParam } from "./typings";
import { IUser } from "typings/user";
import { Form, Input, Select } from "antd";

interface IProps {
  param: IParam;
  users: IUser[];
  setParam: Dispatch<IParam>;
}
const SearchPanel: FC<IProps> = memo(({ param, users, setParam }) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

export default SearchPanel;
