import { memo } from "react";
import { Link } from "react-router-dom";
import { Table, TableProps, Dropdown, Menu, Modal } from "antd";
import dayjs from "dayjs";

import Pin from "components/Pin";
import { ButtonNoPadding } from "components/lib";
import useEditProject from "./model/useEditProject";
import { IUser } from "typings/user";
import { IProject } from "../../typings/project";
import useProjectModal from "./model/useProjectModal";
import { useProjectsQueryKey } from "./model/useProjectSearchParams";
import useDeleteProject from "./model/useDeleteProject";

interface IProps extends TableProps<IProject> {
  users: IUser[];
}
const List = ({ users, ...rest }: IProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
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
                key={project.id}
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
                {users.find(user => user.id === project.personId)?.name ??
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
            return <More project={project} />;
          },
        },
      ]}
      {...rest}
    />
  );
};

const More = ({ project }: { project: IProject }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);

  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目?",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit">
            <ButtonNoPadding type="link" onClick={editProject(project.id)}>
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key="delete">
            <ButtonNoPadding
              type="link"
              onClick={() => confirmDeleteProject(project.id)}
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};

export default memo(List);
