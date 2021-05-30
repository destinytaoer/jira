import { FC } from "react";
import { IListItem } from "./typings";

interface IProps {
  list: IListItem[];
}
const List: FC<IProps> = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.personName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
