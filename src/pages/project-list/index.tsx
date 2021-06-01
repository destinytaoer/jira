import { useEffect, useState } from "react";
import qs from "qs";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { IUser } from "typings/user";
import { IProject } from "./typings";
import useMount from "hooks/useMount";
import useDebounce from "hooks/useDebounce";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param);

  const [users, setUsers] = useState<IUser[]>([]);
  const [list, setList] = useState<IProject[]>([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: debounceParam }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListPage;
