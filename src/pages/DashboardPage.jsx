import {
  ArrowRightEndOnRectangleIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";


const navigation = [
  { name: "Home", href: "/dasboard", icon: HomeIcon },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: ShoppingBagIcon,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Counter",
    href: "/dashboard/counter",
    icon: CalculatorIcon,
  },
];

function DashboardPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-gray">
      {/** */}
      <div className="w-20 md:w-64 flex-shrink-0 transition-all duration-300">
        <div className="h-full flex flex-col bg-primary">
          <div className="flex items-center h-16 flex-shrink-0 px-4 py-10 bg-primary-dark">
            <div className="flex items-center w-full">
              <img
                className="h-8 w-8 rounded-full"
                src={user.profilePictureUrl}
                alt="Avatar"
              />
              <div className="ml-3 hidden md:block space-y-0.5">
                <p className="text-sm font-medium text-text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs font-medium text-text-white truncate">
                  {user.email}
                </p>
                <p className="text-xs font-medium text-yellow-400 uppercase tracking-wide mt-1">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          <nav className=" flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return <NavLink key={item.name} to={item.href} className={({ isActive }) => (isActive ? "bg-primary-dark text-text-white" : "text-text-gray hover:bg-primary-light hover:text-text-white" + "group flex items-center px-2 py-2 text-sm font-medium rounded-md")}>
                  <IconComponent className="mr-3 h-6 w-6 flex-shrink-0" />
                  <span className="hidden md:inline">{item.name}</span>
                </NavLink>
              })}
            </div>
          </nav>

          <div className="flex-shrink-0 flex flex-col border-t border-primary-light p-4">
            <button onClick={logoutHandler} className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-text-gray hover:bg-primary-light hover:text-text-white">
              <ArrowRightEndOnRectangleIcon className="mr-3 h-5 min-w-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>

    {/* main content */}
    <div className="flex-1 flex flex-col overflow-auto focus:outline-none">
      <main className="flex-1 relative z-0 overflow-y-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"></div>
      </main>
    </div>

    </div>
  );
}

export default DashboardPage;
