import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductApi from "../api/ProductsApi";
import ProductFormLabel from "../components/ProductFormLabel";

import { IMAGE_PLACEHOLDER_URL } from "../constants/images.constant";

function ProductDetailsPage() {
  const params = useParams();
  const location = useLocation();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryIds: [],
    image: null,
    imageUrl: IMAGE_PLACEHOLDER_URL,
  });
  const navigate = useNavigate();

  const categories = useSelector((state) => {
    return state.productCategories.items;
  });

  const { id: productId } = params;

  const getProductDetail = async (productId) => {
    const productDetail = await ProductApi.getProduct(productId);
    setProduct(productDetail);
  };

  const setProductState = (product) => {
    setProduct((previousProductState) => {
      return {
        ...previousProductState,
        ...product,
        categoryIds: product.categories.map((categoryItem) => {
          return categoryItem.id.toString();
        }),
        imageUrl:
          product.imageUrl && product.imageUrl.length > 0
            ? product.imageUrl[0]
            : IMAGE_PLACEHOLDER_URL,
      };
    });
  };

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        console.log(reader);
        setProduct((prevState) => {
          return {
            ...prevState,
            image: file,
            imageUrl: reader.result,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemoveImage() {
    setProduct((prevState) => {
      return {
        ...prevState,
        image: null,
        imageUrl: IMAGE_PLACEHOLDER_URL,
      };
    });
  }

  function handleInput(e) {
    setProduct((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleCategoryChange(e) {
    setProduct((prevState) => {
      return {
        ...prevState,
        categoryIds: [...e],
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("categoryIds", product.categoryIds.join(","));

      if (product.image) {
        formData.append("image", product.image);
      }

      if (productId) {
        await ProductApi.updateProduct(productId, formData);
      } else {
        await ProductApi.createProduct(formData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ProductApi.getCategories();
    if (productId) {
      const navigationState = location.state;

      const { product } = navigationState;
      setProductState(product);
      console.log(product.categories);

      //   console.log(product.categories);

      //   getProductDetail(productId);
    }
  }, [productId]);

  const isEditForm = !!productId;
  console.log(product.categoryIds);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isEditForm ? "Update Product Form" : "Create Product Form"}
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* Kolom ke-satu */}
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="name" />
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
                value={product.name}
                onChange={handleInput}
              />
            </div>

            <div>
              <ProductFormLabel name="description" />
              <textarea
                type="text"
                id="description"
                name="description"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description"
                required
                value={product.description}
                onChange={handleInput}
              />
            </div>

            <div>
              <ProductFormLabel name="price" />
              <input
                type="number"
                id="price"
                name="price"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product price"
                required
                value={product.price}
                onChange={handleInput}
              />
            </div>

            <div>
              <ProductFormLabel name="stock" />
              <input
                type="number"
                id="stock"
                name="stock"
                className="w-full px-3 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product stock"
                required
                value={product.stock}
                onChange={handleInput}
              />
            </div>

            <div>
              <ProductFormLabel name="categories" />
              <Select
                id="categories"
                name="categories"
                label="Select categories"
                selectionMode="multiple"
                placeholder="Select categories"
                className="w-full"
                selectedKeys={product.categoryIds}
                onSelectionChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Kolom ke-dua */}
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="image" />
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <img
                    src={product.imageUrl}
                    alt="Product preview"
                    className="mx-auto h-64 w-64 object-cover rounded-md"
                  />

                  <div>
                    <div className="flex text-sm text-gray-600 justify-center mt-2">
                      <ProductFormLabel
                        name="file-upload"
                        textLabel="Upload a file"
                        customClassname="relative cursor-pointer bg-white rounded-md font-medium text-blue-600
                        hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2
                        focus-within:ring-blue-500"
                      >
                        <span>{"Upload a file"}</span>
                        <input
                          type="file"
                          id="file-upload"
                          name="file-upload"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </ProductFormLabel>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <button
                      type="button"
                      className="mt-2 px-3 py-1 text-sm font-medium text-red-600 bg-white border
                    border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={handleRemoveImage}
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isEditForm ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductDetailsPage;