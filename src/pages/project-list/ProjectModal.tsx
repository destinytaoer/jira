import React, { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { ErrorBox } from "components/lib";
import UserSelect from "components/UserSelect";

import { useForm } from "antd/lib/form/Form";
import useProjectModal from "./model/useProjectModal";
import useEditProject from "./model/useEditProject";
import useAddProject from "./model/useAddProject";
import styled from "@emotion/styled";

const ProjectModal = () => {
  const { projectModalVisible, close, editingProject, isLoading } =
    useProjectModal();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutateProject();

  const [form] = useForm();
  const handleFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    if (!editingProject) {
      form.resetFields();
    } else {
      form.setFieldsValue(editingProject);
    }
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      visible={projectModalVisible}
      width={"100%"}
      onClose={close}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={mutateError} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "40rem" }}
              onFinish={handleFinish}
            >
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label="部门"
                name="organization"
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"请输入部门名称"} />
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={mutateLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
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

export default ProjectModal;
