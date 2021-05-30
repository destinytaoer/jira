import { useEffect, useState } from "react";
import qs from "qs";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { IUser } from "typings/user";
import { IListItem } from "./typings";
import { cleanObject } from "utils";
import useMount from "hooks/useMount";
import useDebounce from "hooks/useDebounce";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;
const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param);

  const [users, setUsers] = useState<IUser[]>([]);
  const [list, setList] = useState<IListItem[]>([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: debounceParam }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListPage;
