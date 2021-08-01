import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTasks, useProjectIdInUrl, useTasksQueryKey } from "./util";

interface ICreateTaskProps {
  kanbanId: number;
}

const CreateTask = ({ kanbanId }: ICreateTaskProps) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTasks(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode(mode => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做些什么"}
        autoFocus
        onPressEnter={submit}
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </Card>
  );
};

export default CreateTask;
