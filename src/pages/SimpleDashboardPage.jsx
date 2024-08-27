import { Button } from "@nextui-org/react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

{
  /* <div>
<h1>Dashboard</h1>
<h1>{user.name}</h1>
<h1>{user.email}</h1>
<h1>{user.role}</h1>
<Outlet />,
</div> */
}

function SimpleDashboardPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-4">
        <h1 className="text-xl font-bold mb-4">Simple Dashboard</h1>
        <h1>Dashboard</h1>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.role}</h1>
        <NavLink to={"/dashboard"} className={"block py-2"}>
          Home
        </NavLink>
        <NavLink to={"/dashboard/users"} className={"block py-2"}>
          Users
        </NavLink>
        <NavLink to={"/dashboard/products"} className={"block py-2"}>
          Products
        </NavLink>
        <NavLink to={"/dashboard/transactions"} className={"block py-2"}>
          Transactions
        </NavLink>
        <NavLink to={"/dashboard/counter"} className={"block py-2"}>
          Counter
        </NavLink>
        <Button onClick={logoutHandler} color="danger" variant="bordered">
          Logout
        </Button>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default SimpleDashboardPage;
