import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import {
  useDeleteTask,
  useEditTask,
  useTaskModal,
  useTasksQueryKey,
} from "./util";
import { Button, Form, Input, Modal } from "antd";
import UserSelect from "../../components/UserSelect";
import TaskTypeSelect from "../../components/TaskTypeSelect";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const onDelete = () => {
    close();
    Modal.confirm({
      title: "确定删除任务吗",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      onCancel={onCancel}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
      forceRender
      footer={[
        <Button key="delete" onClick={onDelete}>
          删除
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          确认
        </Button>,
      ]}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
