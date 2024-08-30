import React from "react";

import ProductApi from "../../api/ProductsApi";
import { IMAGE_PLACEHOLDER_URL } from "../../constants/images.constant";
import { useProductDetails } from "../../hooks/useProductDetails";
import ProductDetailsPageComponent from "./ProductDetailsPageComponent";


function ProductDetailsPage() {
  const { navigate, productForm: product, setProductForm: setProduct, categories, productId, isEditForm } = useProductDetails();
  
  const cancelHandler = () => { 
    navigate(-1)
   }

  const inputHandler = (e) => { 
    const {name, value} = e.target;
    setProduct((previousProduct) => {
      return {
        ...previousProduct,
        [name]: value,
      }
    })    
  }

  const categoriesHandler = (select) => { 
    setProduct((previousProduct) => {
      return {
        ...previousProduct,
        categoryIds: [...select]
      }
    })
   }

   const validCategoryIds = product.categoryIds.filter(id =>
    categories.some(category => category.id.toString() === id)
  );  

  const handleImageChange = (e) => { 
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { 
        setProduct((prevProduct) => {
          return {
            ...prevProduct,
            image: file,
            imageUrl: reader.result
          }
        })
       }
       reader.readAsDataURL(file);
    }
   }

   const handleRemoveImage = () => {
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        image: null,
        imageUrl: IMAGE_PLACEHOLDER_URL,
      }
    })
   }

  const onsubmitHandler = async (e) => { 
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("categoryIds", product.categoryIds.join(","));

      if (product.image){
        formData.append("image", product.image)
      }

      if (productId) {
        await ProductApi.updateProduct(productId, formData);
      }else{
        await ProductApi.createProduct(formData);
      }
      navigate(-1)
    } catch (e) {
      console.log("error when create/update product", e.message);
      
    }
   }

  return (
    <ProductDetailsPageComponent 
    isEditForm={isEditForm} 
    onsubmitHandler={onsubmitHandler}
    inputHandler={inputHandler}
    categoriesHandler={categoriesHandler}
    cancelHandler={cancelHandler} 
    product={product} 
    categories={categories}
    handleImageChange={handleImageChange} 
    handleRemoveImage={handleRemoveImage}
    validCategoryIds={validCategoryIds}
    />
  )
}

export default ProductDetailsPage