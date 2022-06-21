import { Table } from "antd";
import dayjs from "dayjs";
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
  created: number;
}
export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "Project",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Department",
          dataIndex: "organization",
        },
        {
          title: "Manager",
          render(value, project) {
            return (
              <span>
                {users.find((user: User) => user.id === project.personId)
                  ?.name || "Unknown"}
              </span>
            );
          },
        },
        {
          title: "Created On",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "None"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>Project</th>
  //         <th>Manager</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "Unknown"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
