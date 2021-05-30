import { useEffect, useState } from "react";
import qs from "qs";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { IListItem, IUser } from "./typings";
import { cleanObject } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;
const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = useState<IUser[]>([]);
  const [list, setList] = useState<IListItem[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, [param]);

  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} />
    </div>
  );
};

export default ProjectListPage;
