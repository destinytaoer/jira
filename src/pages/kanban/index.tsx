import { memo } from "react";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useKanbans } from "utils/kanban";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./KanbanColumn";
import styled from "@emotion/styled";
import { SearchPanel } from "./SeachPanel";
import { PageContainer } from "components/lib";

const KanbanPage = memo(() => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  console.log(currentProject, kanbans);
  return (
    <PageContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map(kanban => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </PageContainer>
  );
});

const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
`;
export default KanbanPage;
