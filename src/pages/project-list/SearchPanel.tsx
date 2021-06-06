import { FC, memo } from "react";
import { IProject } from "./typings";
import { IUser } from "typings/user";
import { Form, Input } from "antd";
import UserSelect from "components/UserSelect";

type IParam = Partial<Pick<IProject, "name" | "personId">>;
interface IProps {
  param: IParam;
  users: IUser[];
  setParam: (params: IParam) => void;
}
const SearchPanel: FC<IProps> = ({ param, users, setParam }) => {
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
        <UserSelect
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
          defaultOptionName="负责人"
        />
      </Form.Item>
    </Form>
  );
};

export default memo(SearchPanel);
