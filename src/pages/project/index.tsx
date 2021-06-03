import { memo } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import KanbanPage from "pages/kanban";
import EpicPage from "pages/epic";

const ProjectPage = memo(() => {
  return (
    <div>
      <h1>项目详情</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        {/* projects/:projectId/kanban */}
        <Route path="/kanban" element={<KanbanPage />} />
        {/* projects/:projectId/epic */}
        <Route path="/epic" element={<EpicPage />} />
        <Navigate to={window.location.pathname + "/kanban"} />
      </Routes>
    </div>
  );
});

export default ProjectPage;
