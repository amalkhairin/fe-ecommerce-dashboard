import store from "../redux/store";
import {
  addProduct,
  editProduct,
  setError,
  setIsLoading,
  setProducts,
} from "../redux/products/productSlice";
import axiosInstance from "./axiosInstance";
import { setCategories } from "../redux/products/ProductCategoriesSlice";
import dayjs from "dayjs";
import { toast } from "sonner";

class ProductApi {
  static async getProducts(page = 1, limit = 10, query) {
    try {
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.get("/products", {
        params: {
          page,
          limit,
          query,
        },
      });
      console.log(res);

      const { data } = res;

      store.dispatch(
        setProducts({
          items: data.items,
          total: data.total,
        })
      );
    } catch (error) {
      store.dispatch(setError(error));
      throw new Error("ProductApi getProducts", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getCategories() {
    store.dispatch(setIsLoading(true));
    const lastSet = store.getState().productCategories.lastSet;
    try {
      if (lastSet) {
        const currentDate = dayjs(new Date().toISOString());
        const isLessThan1Hour = currentDate.diff(lastSet, "hour", true) < 1;
        if (isLessThan1Hour) {
          return;
        }
      }
      const res = await axiosInstance.get("/categories");
      const { data } = res;
      store.dispatch(setCategories(data));
    } catch (error) {
      store.dispatch(setError(error));
      throw new Error("ProductApi getCategories", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getProduct(id) {
    try {
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      console.error(error.message);
      store.dispatch(setError(error.message));
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async createProduct(productData) {
    try {
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.post("/products", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      store.dispatch(addProduct(res.data));
      toast.success("Product created successfully");
    } catch (error) {
      console.error(error.message);
      store.dispatch(setError(error.message));
      toast.error("Failed to create product");
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async updateProduct(id, productData) {
    try {
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.put(`/products/${id}`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      store.dispatch(editProduct(res.data));
      toast.success("Product updated successfully");
    } catch (error) {
      console.error(error.message);
      store.dispatch(setError(error.message));
      toast.error("Failed to update product");
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async deleteProduct(id, page = 1, limit = 10, query) {
    store.dispatch(setIsLoading(true));
    try {
      await axiosInstance.delete(`/products/${id}`);
      // store.dispatch(deleteProduct(id));
      toast.success("Product deleted successfully");
      await this.getProducts(page, limit, query);
    } catch (error) {
      console.error(error.message);
      store.dispatch(setError(error.message));
      toast.error("Failed to delete product");
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default ProductApi;