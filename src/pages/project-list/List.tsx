import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { FC } from "react";
import { IUser } from "typings/user";
import { IProject } from "./typings";

interface IProps extends TableProps<IProject> {
  users: IUser[];
}
const List: FC<IProps> = ({ users, ...rest }) => {
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ??
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...rest}
    />
  );
};

export default List;
