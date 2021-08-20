import { Button, Drawer, Form, Input } from "antd";
import styled from "@emotion/styled";
import { ErrorBox } from "../../components/lib";
import { useEffect } from "react";
import { useAddEpic, useEpicsQueryKey } from "./utils";
import { useForm } from "antd/lib/form/Form";
import { useProjectIdInUrl } from "../kanban/util";

const CreateEpic = (props: { visible: boolean; onClose: () => void }) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();

  const handleFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer forceRender destroyOnClose width={"100%"} {...props}>
      <Container>
        <h1>创建任务组</h1>
        <ErrorBox error={error} />
        <Form
          form={form}
          layout="vertical"
          style={{ width: "40rem" }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: "请输入任务组名称" }]}
          >
            <Input placeholder={"请输入任务组名称"} />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  );
};
const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default CreateEpic;
