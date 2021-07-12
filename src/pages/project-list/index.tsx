import { memo } from "react";
import styled from "@emotion/styled";
import { Typography, Button } from "antd";

import List from "./List";
import { Row } from "components/lib";
import SearchPanel from "./SearchPanel";
import useDebounce from "hooks/useDebounce";

import useProjects from "./model/useProjects";
import useUsers from "../../hooks/useUsers";
import useDocumentTitle from "hooks/useDocumentTitle";
import useProjectSearchParams from "./model/useProjectSearchParams";

const ProjectListPage = ({
  setProjectModalVisible,
}: {
  setProjectModalVisible: (visible: boolean) => void;
}) => {
  useDocumentTitle("项目列表");

  const [param, setParam] = useProjectSearchParams();
  const debounceParam = useDebounce(param);
  const { isLoading, error, data: list, retry } = useProjects(debounceParam);

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between>
        <h2>项目列表</h2>
        <Button onClick={() => setProjectModalVisible(true)}>创建项目</Button>
      </Row>
      <SearchPanel param={param} users={users ?? []} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list ?? []}
        users={users ?? []}
        setProjectModalVisible={setProjectModalVisible}
      />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

export default memo(ProjectListPage);
