import { Input, Select } from "antd";

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
  token: string;
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
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          {/*Show all the users in the pull-down list*/}
          <Select.Option value={""}>Manager</Select.Option>
          {/*We also need users, hoisting in index.tsx
            Use .map to traverse users
            A callback function set value to user.id
            display user.name*/}
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
