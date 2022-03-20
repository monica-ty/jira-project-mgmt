import React from "react";
import { User } from "screens/project-list/search-panel";

interface ListProps {
  list: Project[];
  users: User[];
}
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
export const List = ({ users, list }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Manager</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "Unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
