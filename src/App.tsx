import "./App.css";
import { useAuth } from "context/authContext";
import AuthenticatedApp from "AuthenticatedApp";
import UnauthenticatedApp from "UnauthenticatedApp";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectListPage /> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
