import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductApi from "../api/ProductsApi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Pagination } from "@nextui-org/react";
import { CloseFilledIcon, SearchIcon } from "../assets/icons";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "no", label: "No.", className: "py-3.5 pl-4 pr-3 sm:pl-6" },
  { id: "name", label: "Name", className: "py-3.5 px-3" },
  { id: "price", label: "Price", className: "py-3.5 px-3" },
  { id: "stock", label: "Stock", className: "py-3.5 px-3" },
  { id: "category", label: "Category", className: "py-3.5 px-3" },
  {
    id: "actions",
    label: "Actions",
    className: "py-3.5 px-3 pr-4 sm:pr-6 text-center",
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(+price);
}

function ProductsPage() {
  const navigate = useNavigate();

  const { items, total, error } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [value] = useDebounce(searchQuery, 700);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    (async function () {
      console.log(page, limit, value);
      await ProductApi.getProducts(page, limit, value);
    })();
  }, [page, value]);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
  //     </div>
  //   );
  // }

  if (error) {
    return <div className="text-red-600 text-center">{error.message}</div>;
  }

  const createProductClickHandler = () => {
    navigate("/dashboard/products/new");
  };

  const updateProductClickHandler = (product) => {
    navigate(`/dashboard/products/${product.id}`, {
      state: { product },
    });
  };

  console.log(items);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Product List
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setSearchQuery("")}
              >
                {<CloseFilledIcon />}
              </button>
            )}
          </div>
          <button
            onClick={createProductClickHandler}
            className="flex items-center justify-center rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition duration-150 ease-in-out"
          >
            Create Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"></div>
          {/* TABLE */}
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-primary-dark">
              <tr>
                {columns.map((item) => (
                  <th
                    key={item.id}
                    scope="col"
                    className={`text-left text-sm font-semibold text-white ${item.className}`}
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {(page - 1) * limit + (index + 1)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatPrice(item.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.stock}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.categories[0].name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        className="text-primary hover:text-primary-darker transition duration-150 ease-in-out"
                        onClick={() => updateProductClickHandler(item)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                        onClick={() => alert("delete button clicked")}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-medium text-text-gray">
              Showing{" "}
              <span className="font-medium">{(page - 1) * limit + 1} to</span>{" "}
              <span className="font-medium">
                {Math.min(page * limit, total)}
              </span>{" "}
              of <span className="font-medium">{total}</span> results
            </p>
          </div>
          <Pagination
            total={totalPages}
            color="primary"
            page={page}
            onChange={setPage}
            showControls
            showShadow
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;