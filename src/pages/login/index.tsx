import { memo } from "react";
import { Form, Input } from "antd";
import { useAuth } from "context/authContext";
import { IAuthForm } from "typings/user";
import { LongButton } from "UnauthenticatedApp";
import useAsync from "hooks/useAsync";

const LoginPage = memo(({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = ({ username, password }: IAuthForm) => {
    run(
      login({
        username,
        password,
      })
    ).catch(onError);
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
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
});

export default LoginPage;
