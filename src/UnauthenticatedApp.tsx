import { FC, memo, useState } from "react";
import LoginPage from "pages/login";
import RegisterPage from "pages/register";

const UnauthenticatedApp: FC = memo(() => {
  const [isRegister, setRegister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button onClick={() => setRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
});

export default UnauthenticatedApp;
