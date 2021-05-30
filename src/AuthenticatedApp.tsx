import { FC, memo } from "react";
import ProjectListPage from "pages/project-list";
import { useAuth } from "context/authContext";

const AuthenticatedApp: FC = memo(() => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={() => logout()}>登出</button>
      <ProjectListPage />
    </div>
  );
});

export default AuthenticatedApp;
