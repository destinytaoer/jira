import { FC, memo, useState } from "react";
import LoginPage from "pages/login";
import RegisterPage from "pages/register";
import { Card } from "antd";

const UnauthenticatedApp: FC = memo(() => {
  const [isRegister, setRegister] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterPage /> : <LoginPage />}
        <button onClick={() => setRegister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </button>
      </Card>
    </div>
  );
});

export default UnauthenticatedApp;
