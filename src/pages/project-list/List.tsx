import { memo } from "react";
import { Link } from "react-router-dom";
import { Table, TableProps, Dropdown, Menu } from "antd";
import dayjs from "dayjs";

import Pin from "components/Pin";
import { ButtonNoPadding } from "components/lib";
import useEditProject from "./model/useEditProject";
import { IUser } from "typings/user";
import { IProject } from "./typings";

interface IProps extends TableProps<IProject> {
  users: IUser[];
  refresh?: () => void;
  projectButton: JSX.Element;
}
const List = ({ users, refresh, projectButton, ...rest }: IProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      {projectButton}
                      {/* <ButtonNoPadding type="link">编辑</ButtonNoPadding> */}
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...rest}
    />
  );
};

export default memo(List);
