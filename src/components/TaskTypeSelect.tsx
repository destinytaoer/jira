import { ComponentProps } from "react";
import IdSelect from "./IdSelect";
import { useTaskTypes } from "../pages/kanban/util";

const TaskTypeSelect = (props: ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();

  return <IdSelect options={taskTypes ?? []} {...props} />;
};

export default TaskTypeSelect;
