import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { HomePage } from "./pages/index";
import { ListTaskPage } from "./pages/list.task.page";
import { AddTaskPage } from "./pages/add.task.page";
import { EditTaskPage } from "./pages/edit.task.page";

export const routes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/list-tasks",
        element: <ListTaskPage />,
    },
    {
      path: "/add-tasks",
      element: <AddTaskPage />,
    },
    {
      path: '/edit-task',
      element: <EditTaskPage />,
    }
]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
