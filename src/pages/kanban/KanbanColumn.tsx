import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { IKanban } from "typings/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/taskType";
import {
  useDeleteKanban,
  useKanbansQueryKey,
  useTaskModal,
  useTasksSearchParams,
} from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import CreateTask from "./CreateTask";
import { Mark } from "components/Mark";
import { ITask } from "../../typings/task";
import { Row } from "../../components/lib";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find(taskType => taskType.id === id)?.name;
  if (!name) return null;
  return <img src={name === "task" ? taskIcon : bugIcon} alt={"task-icon"} />;
};

function TaskCard({ task }: { task: ITask }) {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParams();

  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
}

export const KanbanColumn = ({ kanban }: { kanban: IKanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);
  return (
    <Container>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

const More = ({ kanban }: { kanban: IKanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return deleteKanban({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  border-radius: 6px;
  background-color: rgba(244, 245, 247);
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
