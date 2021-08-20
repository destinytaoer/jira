import { PageContainer, Row } from "components/lib";
import { memo, useState } from "react";
import { useProjectInUrl, useTasks } from "../kanban/util";
import {
  useDeleteEpic,
  useEpics,
  useEpicSearchParams,
  useEpicsQueryKey,
} from "./utils";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IEpic } from "../../typings/epic";
import CreateEpic from "./CreateEpic";

const EpicPage = memo(() => {
  const { data: currentProject } = useProjectInUrl();

  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: IEpic) => {
    Modal.confirm({
      title: `确定删除项目组: ${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <PageContainer>
      <Row between>
        <h1>{currentProject?.name}任务组</h1>
        <Button type={"link"} onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflowY: "auto" }}
        dataSource={epics ?? []}
        itemLayout={"vertical"}
        renderItem={epic => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间:{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间:{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter(task => task.epicId === epic.id)
                .map(task => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        visible={epicCreateOpen}
        onClose={() => setEpicCreateOpen(false)}
      />
    </PageContainer>
  );
});

export default EpicPage;
