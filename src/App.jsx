import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks";

const DashboadPage = () => {
  const { user } = useAuth();

  return <div>
    <h1>Dashboard</h1>
    <h2>{user.name}</h2>
    <h2>{user.username}</h2>
    <h2>{user.profilePictureUrl}</h2>
    <h2>{user.role}</h2>
    <h2>{user.email}</h2>
    <Outlet />
  </div>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Outlet /></ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "dashboard",
        element: <DashboadPage />,
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
    element: <LoginPage />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;