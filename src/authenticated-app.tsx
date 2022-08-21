import styled from "@emotion/styled";
//import softwareLoge from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { ProjectListScreen } from "screens/project-list";
import { resetRoute } from "utils";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/projects"} />} />
          <Route path={"/projects"} element={<ProjectListScreen />}></Route>
          <Route
            path={"/projects/:projectId/*"}
            element={<ProjectScreen />}
          ></Route>
          {/* <Navigate to={"/projects"} /> */}
        </Routes>
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softwareLoge} alt="" /> */}
        <Button type={"link"} onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
        </Button>
        <h3>Project</h3>
        <h3>User</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={logout}>
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
