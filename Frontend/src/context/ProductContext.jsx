import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch("http://localhost:3000/api/products");

            if(!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();

            setProducts(data.products || data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider
         value={{products, loading, error}}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;