import { ComponentProps } from "react";
import { useTaskTypes } from "utils/taskType";
import IdSelect from "./IdSelect";

const TaskTypeSelect = (props: ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();

  return <IdSelect options={taskTypes ?? []} {...props} />;
};

export default TaskTypeSelect;
