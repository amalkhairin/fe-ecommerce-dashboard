import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SimpleDashboardPage from "./pages/SimpleDashboardPage";
import DashboardPage from "./pages/DashboardPage";

const HomePage = () => <h1>Home Page</h1>;
const UsersPage = () => <h1>Users Page</h1>;
const ProductsPage = () => <h1>Products Page</h1>;
const TransactionsPage = () => <h1>Transactions Page</h1>;
const CounterPage = () => <h1>Counter Page</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "transactions",
            element: <TransactionsPage />,
          },
          {
            path: "counter",
            element: <CounterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
