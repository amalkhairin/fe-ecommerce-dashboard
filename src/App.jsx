import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CounterPage from "./pages/CounterPage";
import ProductsPage from "./pages/ProductPage";
import ProductDetailsPageContainer from "./pages/productDetailsPage/ProductDetailPageContainer";
import ErrorFallbackPage from "./pages/ErrorFallbackPage";

const HomePage = () => <h1>Home Page</h1>;
const UsersPage = () => <h1>Users Page</h1>;
const TransactionsPage = () => <h1>Transactions Page</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallbackPage />,
    children: [
      {
        index: true,
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          {
            index: true,
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
            path: "products/new",
            element: <ProductDetailsPageContainer />,
          },
          {
            path: "products/:id",
            element: <ProductDetailsPageContainer />,
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