import { memo } from "react";
import styled from "@emotion/styled";
import { Button } from "antd";

import List from "./List";
import { Row, ErrorBox } from "components/lib";
import SearchPanel from "./SearchPanel";
import useDebounce from "hooks/useDebounce";

import useProjects from "./model/useProjects";
import useUsers from "../../hooks/useUsers";
import useDocumentTitle from "hooks/useDocumentTitle";
import useProjectSearchParams from "./model/useProjectSearchParams";
import useProjectModal from "./model/useProjectModal";

const ProjectListPage = () => {
  useDocumentTitle("项目列表");

  const [param, setParam] = useProjectSearchParams();
  const debounceParam = useDebounce(param);
  const { isLoading, error, data: list } = useProjects(debounceParam);

  const { data: users } = useUsers();

  const { open: openProjectModal } = useProjectModal();

  return (
    <Container>
      <Row between>
        <h2>项目列表</h2>
        <Button onClick={openProjectModal}>创建项目</Button>
      </Row>
      <SearchPanel param={param} users={users ?? []} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list ?? []} users={users ?? []} />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

export default memo(ProjectListPage);
