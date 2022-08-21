import styled from "@emotion/styled";
import { Typography } from "antd";
import { useState } from "react";
import { useDebounce } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

// const apiUrl = process.env.REACT_APP_API_URL;

// ProjectListScreen is the entrance
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "", // name of the Project(user input string)
    personId: "", // Id of the Manager(pull-down check list)
  });
  const debouncedParam = useDebounce(param, 200);

  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  // Return a page with SearchPanel and List
  return (
    // SearchPanel/List as elements
    // param/users... as attributes
    <Container>
      <h1>Project List</h1>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
