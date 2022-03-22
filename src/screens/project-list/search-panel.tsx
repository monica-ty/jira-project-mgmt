interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

export const SearchPanel = ({ param, users, setParam }: SearchPanelProps) => {
  // We need param, but moved it to index.tsx(hoisting)
  // Return a form to get the user input
  return (
    <form>
      <div>
        {/*Call back function: funB as funA's parameter
               setParam 
               evt = event? */}
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          {/*Show all the users in the pull-down list*/}
          <option value={""}>Manager</option>
          {/*We also need users, hoisting in index.tsx
            Use .map to traverse users
            A callback function set value to user.id
            display user.name*/}
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
