import { Button, Input } from "antd";
import { Row } from "components/lib";
import TaskTypeSelect from "components/TaskTypeSelect";
import UserSelect from "components/UserSelect";
import { useSetUrlSearchParam } from "hooks/useUrlQueryParam";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={4} gap>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        value={searchParams.name}
        onChange={e => setSearchParams({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processId}
        onChange={value => setSearchParams({ processId: value })}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={value => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
