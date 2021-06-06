import { useState, memo } from "react";
import styled from "@emotion/styled";
import { Typography } from "antd";

import List from "./List";
import SearchPanel from "./SearchPanel";
import useDebounce from "hooks/useDebounce";

import useProjects from "./useProjects";
import useUsers from "./useUsers";
import useDocumentTitle from "hooks/useDocumentTitle";
import useUrlQueryParam from "hooks/useUrlQueryParam";

const ProjectListPage = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debounceParam = useDebounce(param);
  const { isLoading, error, data: list } = useProjects(debounceParam);

  const { data: users } = useUsers();

  useDocumentTitle("项目列表");

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} users={users ?? []} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list ?? []} users={users ?? []} />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;

export default memo(ProjectListPage);
