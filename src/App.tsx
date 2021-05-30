import ProjectListPage from "pages/project-list";
import LoginPage from "pages/login";
import { AppProviders } from "context";

function App() {
  return (
    <AppProviders>
      {/* <ProjectListPage /> */}
      <LoginPage />
    </AppProviders>
  );
}

export default App;
