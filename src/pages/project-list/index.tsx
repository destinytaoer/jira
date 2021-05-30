import { useEffect, useState } from "react";
import qs from "qs";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { IUser } from "typings/user";
import { IListItem } from "./typings";
import { cleanObject } from "utils";
import useMount from "hooks/useMount";
import useDebounce from "hooks/useDebounce";

const apiUrl = process.env.REACT_APP_API_URL;
const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param);

  const [users, setUsers] = useState<IUser[]>([]);
  const [list, setList] = useState<IListItem[]>([]);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} />
    </div>
  );
};

export default ProjectListPage;
