import { useAuth } from "context/authContext";
import { FormEvent } from "react";

const LoginPage = () => {
  const { user, login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    login({
      username,
      password,
    });
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      {user ? <div>登陆成功,用户名为: {user?.name}</div> : null}
      <div>
        <label htmlFor="username">用户</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登陆</button>
    </form>
  );
};

export default LoginPage;
