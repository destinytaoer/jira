import { FC, memo } from "react";
import { Button, Form, Input } from "antd";
import { useAuth } from "context/authContext";
import { IAuthForm } from "typings/user";
import { LongButton } from "UnauthenticatedApp";

const LoginPage: FC = memo(() => {
  const { login } = useAuth();

  const handleSubmit = ({ username, password }: IAuthForm) => {
    login({
      username,
      password,
    });
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" placeholder="用户名" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder="密码" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
});

export default LoginPage;
