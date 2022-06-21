import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
// export means you can import it in other files
// const makes sure that you cannot define another function with the same name later

// ProjectListScreen is the entrance
export const ProjectListScreen = () => {
  // useState return an array, 1st item is stateValue, 2rd item is updateFunction
  // useState(initialState), once state changes, React will reset the value with the set function
  const [users, setUsers] = useState([]); //Initially Empty List
  const [param, setParam] = useState({
    name: "", // name of the Project(user input string)
    personId: "", // Id of the Manager(pull-down check list)
  });
  const debouncedParam = useDebounce(param, 200);
  // The filtered list that responsed by fetch()
  const [list, setList] = useState([]);
  const client = useHttp();

  // Request project API when param changed
  // Also request when first open the page, and the responsed list will be all projects
  // Because the cleanObject function cleans emply searching conditions
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // fetch return a promise (See fetch document!!!)
    // async + await, wait until Response success
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
  }, [debouncedParam]); // fetch when debouncedParam changed

  // This is loaded at the first time when users open the page
  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   // Response success
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  // Return a page with SearchPanel and List
  return (
    // SearchPanel/List as elements
    // param/users... as attributes
    <Container>
      <h1>Project List</h1>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
