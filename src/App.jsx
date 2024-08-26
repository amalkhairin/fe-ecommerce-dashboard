import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "dashboard",
        element: (
          <div>
            <h1>Dashboard</h1>
            <Outlet />
          </div>
        ),
        children: [
          {
            path: "",
            element: <h1>Welcome to Dashboard Home</h1>,
          },
          {
            path: "users",
            element: <h1>User List</h1>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage/>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;