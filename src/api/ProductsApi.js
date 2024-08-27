import { setError, setLoading, setProducts } from "../redux/products/productSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class ProductsApi {
    static async getProducts(page=1, limit=10) {
        store.dispatch(setLoading(true));
        try {
            const resp = await axiosInstance.get("products", {
                params: {
                    page,
                    limit
                }
            })
            const { data } = resp;
            store.dispatch(setProducts({
                items: data.items,
                total: data.total,
            }));
        } catch (error) {
            console.log(error);
            store.dispatch(setError(false));
            throw new Error(`ProductAPI ${error.message}`);
        } finally {
            store.dispatch(setLoading(false));
        }
    }
}

export default ProductsApi