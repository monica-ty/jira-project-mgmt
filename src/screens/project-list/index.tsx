import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject, useMount, useDebounce } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;
// export means you can import it in other files
// const makes sure that you cannot define another function with the same name later
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
  // Request project API when param changed
  useEffect(() => {
    // fetch return a promise (See fetch document!!!)
    // ?name=${param.name}&personId=${param.personId}
    // ${qs.stringfy(cleanObject(param))}
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      // Response success
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      // Response success
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
