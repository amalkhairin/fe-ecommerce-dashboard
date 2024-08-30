import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import React from "react";
import ProductFormLabel from "../../components/ProductFormLabel";


const ProductDetailsPageComponent = (props) => {
  const {
    isEditForm, 
    onsubmitHandler,
    inputHandler,
    categoriesHandler,
    cancelHandler, 
    product, 
    categories,
    handleImageChange, 
    handleRemoveImage,
    validCategoryIds,
  } = props;

  ProductDetailsPageComponent.propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    onsubmitHandler: PropTypes.func.isRequired,
    inputHandler: PropTypes.func.isRequired,
    categoriesHandler: PropTypes.func.isRequired,
    cancelHandler: PropTypes.func.isRequired, 
    handleImageChange: PropTypes.func.isRequired, 
    handleRemoveImage: PropTypes.func.isRequired,
    validCategoryIds: PropTypes.array.isRequired,
    product: PropTypes.object,
    categories: PropTypes.arrayOf(PropTypes.object)
  }

  return (
    <div className="max-w-4xl mx-auto p-5 bbg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{isEditForm ? "Update Product Form" : "Create Product Form"}</h1>
      <form className="space-y-6" onSubmit={onsubmitHandler}>
        <div className="grid grid-cols-2 gap-6">

          {/* column pertama */}
          <div className="space-y-6">
            <div className="">
              <ProductFormLabel name="Name" />
              <input onChange={inputHandler} id="Name" name="name" type="text" className="w-full px-3 border py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2
              focus:ring-blue-500" placeholder="Enter Product name" required value={product.name}/>
            </div>
            <div className="">
              <ProductFormLabel name="Description" />
              <textarea onChange={inputHandler} id="Description" name="description" type="text" className="w-full px-3 border py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2
              focus:ring-blue-500" placeholder="Enter Product description" required value={product.description}/>
            </div>
            <div className="">
              <ProductFormLabel name="Price" />
              <input onChange={inputHandler} id="Price" name="price" type="number" className="w-full px-3 border py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2
              focus:ring-blue-500" placeholder="Enter Product price" required value={product.price}/>
            </div>
            <div className="">
              <ProductFormLabel name="Stock" />
              <input onChange={inputHandler} id="Stock" name="stock" type="number" className="w-full px-3 border py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2
              focus:ring-blue-500" placeholder="Enter Product stock" required value={product.stock}/>
            </div>
            <div className="">
            <ProductFormLabel name="Categories" />
            <Select
              onSelectionChange={categoriesHandler} 
              selectedKeys={validCategoryIds}
              id="Categories"
              name="categories"
              label="Select categories"
              selectionMode="multiple"
              placeholder="Select Categories"
              className="w-full"
            >
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id} textValue={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
            </div>
          </div>

          {/* column kedua */}
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="Image" />
              <div className="mt1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <img src={product.imageUrl} alt="Product preview" className="mx-auto h-64 w-64 object-cover rounded-md" />
                  <div>
                    <div className="flex text-sm text-gray-600 justify-center mt-2">
                      <ProductFormLabel name="file-upload" 
                        textLabel="Upload a File" 
                        customClassName="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <div>
                          <span>{"Upload a File"}</span>
                          <input onChange={handleImageChange} id="file-upload" name="file-upload" type="file" className="sr-only"/>
                        </div>
                      </ProductFormLabel>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <button onClick={handleRemoveImage} type="button" className="mt-2 px-3 py-1 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Remove Image
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button type="button" 
                onClick={cancelHandler}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {isEditForm ? "Update Product" : "Create Product"}
              </button>
            </div>

          </div>


        </div>
      </form>
    </div>
  )
}

export default ProductDetailsPageComponent