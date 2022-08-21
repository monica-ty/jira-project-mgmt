import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";

// const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = (props: { onError: (error: Error) => void }) => {
  // const Login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(param),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //     }
  //   });
  // };

  const { register } = useAuth();

  // const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   register({ username, password });
  // };

  const handelSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      props.onError(new Error("Please enter the same password"));
      return;
    }
    register(values).catch(props.onError);
  };

  return (
    <Form onFinish={handelSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "please enter a username" }]}
      >
        <Input placeholder={"username"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "please enter a password" }]}
      >
        <Input placeholder={"password"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "please confirm your password" }]}
      >
        <Input
          placeholder={"confirm password"}
          type="password"
          id={"cpassword"}
        />
      </Form.Item>
      <LongButton htmlType={"submit"} type={"primary"}>
        Register
      </LongButton>
    </Form>
  );
};
