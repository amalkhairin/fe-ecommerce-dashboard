import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

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
    element: <h1>login</h1>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;