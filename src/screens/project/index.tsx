import { Link, Navigate, Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/Epic";
import { KanbanScreen } from "screens/Kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>Kanban</Link>
      <Link to={"epic"}>Epic</Link>
      <Routes>
        <Route
          path={"/"}
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
        <Route path={"/kanban"} element={<KanbanScreen />}></Route>
        <Route path={"/epic"} element={<EpicScreen />}></Route>
      </Routes>
    </div>
  );
};
