import React from "react";
import api from './Api';
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

const Products = async () => {
    try {
        const response = await api.get(`${BackEndUrl}/api/products`)
        return response.data.result;
    } catch (error) {
        console.log('error from products function', error)
    };
};

export default Products;