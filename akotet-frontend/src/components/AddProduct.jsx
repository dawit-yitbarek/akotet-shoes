import React, { useState } from "react";
import UploadImage from "./UploadImage";
import api from "./Api";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

const AddProduct = ({refresh}) => {
    const [newProduct, setNewProduct] = useState({ code: '', price: '', size: '', image: '' });
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [resetUploadImage, setResetUploadImage] = useState(0);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            setError(false)
            setSuccess(false)

            await api.post(`${BackEndUrl}/api/products`, newProduct)

            setNewProduct({ code: '', price: '', size: '', image: '' });
            setResetUploadImage(prev => prev + 1);
            setSuccess(true);
            refresh();
        } catch (error) {
            setError(true)
            console.error('error from handleAdd function ', error)
        } finally {
            setLoading(false)
        };
    };

    return (

        < form onSubmit={handleAdd} >
            <div className="grid gap-4 mb-6">
                <input
                    type="number"
                    name="code"
                    required
                    placeholder="Shoe Code"
                    disabled={loading}
                    value={newProduct.code}
                    onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                    className="bg-[#1A1A1A] text-white p-3 rounded-md border border-[#481E14]"
                />
                <input
                    type="number"
                    name="price"
                    required
                    placeholder="Price"
                    disabled={loading}
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="bg-[#1A1A1A] text-white p-3 rounded-md border border-[#481E14]"
                />
                <input
                    type="number"
                    name="size"
                    required
                    placeholder="Size"
                    disabled={loading}
                    value={newProduct.size}
                    onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                    className="bg-[#1A1A1A] text-white p-3 rounded-md border border-[#481E14]"
                />
                <UploadImage setImageUrl={(url) => setNewProduct({ ...newProduct, image: url })} resetTrigger={resetUploadImage} />
            </div>

            {success && (<p className="text-green-500 text-md my-3 ">Item added successfully.</p>)}
            {error && (<p className="text-red-500 text-md my-3 ">Failed to add item.</p>)}
            {loading && (<p className="text-md my-3 ">Adding item....</p>)}

            <button
                disabled={loading}
                className="mb-10 bg-[#9B3922] hover:bg-[#F2613F] text-white px-6 py-3 rounded-full"
            >
                Add Product
            </button>
        </form >
    );
};

export default AddProduct;