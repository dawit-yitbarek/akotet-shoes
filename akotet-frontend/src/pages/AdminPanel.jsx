import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../components/UploadImage'
import AddProduct from '../components/AddProduct'
import { TableSkeletonRow } from '../components/SkeletonPlaceholder';
import api from '../components/Api';
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function AdminPanel() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchCode, setSearchCode] = useState('');
    const [editProduct, setEditProduct] = useState(null);
    const [editSuccess, setEditSuccess] = useState(false)
    const [editError, setEditError] = useState(false)
    const [editLoading, setEditLoading] = useState(false)
    const [refreshProduct, setRefreshProduct] = useState(0);
    const [deleteId, setDeleteId] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getItems = async () => {
            setLoading(true)
            setError(false)
            try {
                const response = await api.get(`${BackEndUrl}/api/products`)
                setProducts(response.data.result);
            } catch (error) {
                console.log('error from products function', error)
                setError(true)
            } finally {
                setLoading(false)
            };
        };
        getItems();
    }, [refreshProduct])

    const handleDelete = async (id) => {
        try {
            setEditLoading(true)
            setDeleteId(id)

            await api.delete(`${BackEndUrl}/api/products/${id}`)

            setRefreshProduct(prev => prev + 1);
        } catch (error) {
            alert('Failed to delete item')
        } finally {
            setEditLoading(false)
            setDeleteId('')
        }
    };

    const handleEditSave = async () => {
        try {
            setEditLoading(true)
            setEditError(false)
            setEditSuccess(false)

            await api.put(`${BackEndUrl}/api/products/${editProduct.id}`, editProduct)

            setEditSuccess(true);
            setEditProduct(null);
            setRefreshProduct(prev => prev + 1);
        } catch (error) {
            setEditError(true)
        } finally {
            // setEditLoading(false)
        }
    };

    const filteredProducts = products.filter((p) =>
        p.code.toString().includes(searchCode)
    );

    return (
        <section className="bg-[#0C0C0C] text-[#EEEEEE] px-6 md:px-20 py-16 min-h-screen">

            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-[#F2613F]">Admin Panel</h2>
                <button
                    onClick={() => navigate('/orders')}
                    className="bg-[#9B3922] hover:bg-[#F2613F] text-white px-4 py-2 rounded-md"
                >
                    View Orders
                </button>
            </div>


            <AddProduct refresh={() => setRefreshProduct(prev => prev + 1)} />

            {/* Search */}
            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Search by code..."
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="w-full p-3 rounded-md bg-[#1A1A1A] border border-[#481E14] text-white"
                />
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left border-b border-[#481E14]">
                            <th className="p-2">Image</th>
                            <th className="p-2">Code</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Size</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array(5).fill().map((_, i) => <TableSkeletonRow key={i} />)
                            : filteredProducts.map((p) => (
                                <tr key={p.id} className="border-b border-[#1A1A1A]">
                                    <td className="p-2">
                                        <img
                                            src={p.image_url} alt={p.code}
                                            className="h-12 w-12 object-cover rounded" 
                                            onError={(e) => { e.target.src = '/images/img_placeholder.webp'; }} />
                                    </td>
                                    <td className="p-2">{p.code}</td>
                                    <td className="p-2">{p.price} ETB</td>
                                    <td className="p-2">{p.size}</td>
                                    <td className="p-2">
                                        <button
                                            disabled={editLoading || deleteId}
                                            onClick={() => setEditProduct(p)}
                                            className="text-[#F2613F] hover:underline mx-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            disabled={editLoading || deleteId}
                                            className="text-red-500 hover:underline mx-2"
                                        >
                                            {deleteId === p.id ? 'Deleting' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {error && (
                <div className="text-center mt-10">
                    <p className="text-red-500 mb-4">Failed to load products.</p>
                    <button
                        onClick={() => setRefreshProduct(prev => prev + 1)}
                        className="px-4 py-2 bg-[#9B3922] hover:bg-[#F2613F] text-white rounded"
                    >
                        Retry
                    </button>
                </div>
            )}


            {/* Edit Modal */}
            {editProduct && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm overflow-y-auto z-50">
                    <div className="flex min-h-screen items-center justify-center py-10 px-4">
                        <div className="bg-[#1A1A1A] border border-[#481E14] p-8 rounded-xl w-[90%] max-w-md">
                            <h3 className="text-xl font-bold mb-6 text-[#F2613F]">Edit Product</h3>
                            <div className="space-y-4">
                                <label className="block text-sm mb-2">Shoe code</label>
                                <input
                                    type="number"
                                    value={editProduct.code}
                                    disabled={editLoading}
                                    onChange={(e) =>
                                        setEditProduct({ ...editProduct, code: Number(e.target.value) })
                                    }
                                    className="w-full p-3 bg-[#0C0C0C] border border-[#481E14] rounded-md text-white"
                                />
                                <label className="block text-sm mb-2">Price</label>
                                <input
                                    type="number"
                                    value={editProduct.price}
                                    disabled={editLoading}
                                    onChange={(e) =>
                                        setEditProduct({ ...editProduct, price: Number(e.target.value) })
                                    }
                                    className="w-full p-3 bg-[#0C0C0C] border border-[#481E14] rounded-md text-white"
                                />
                                <label className="block text-sm mb-2">Size</label>
                                <input
                                    type="number"
                                    value={editProduct.size}
                                    disabled={editLoading}
                                    onChange={(e) =>
                                        setEditProduct({ ...editProduct, size: Number(e.target.value) })
                                    }
                                    className="w-full p-3 bg-[#0C0C0C] border border-[#481E14] rounded-md text-white"
                                />
                                <UploadImage status={editLoading} setImageUrl={(url) => setEditProduct({ ...editProduct, image_url: url })} />
                            </div>

                            {editSuccess && (<p className="text-green-500 text-center text-md my-3 ">Item edited successfully.</p>)}
                            {editError && (<p className="text-red-500 text-center text-md my-3 ">Failed to edit item.</p>)}
                            {editLoading && (<p className="text-md text-center my-3 ">Editing item....</p>)}

                            <div className="flex justify-end mt-6 gap-4">
                                <button
                                    onClick={() => {
                                        setEditProduct(null)
                                        setEditError(false)
                                        setEditSuccess(false)
                                    }}
                                    disabled={editLoading}
                                    className="px-4 py-2 rounded bg-[#9B3922] hover:bg-[#F2613F] text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditSave}
                                    disabled={editLoading}
                                    className="px-4 py-2 rounded bg-[#F2613F] hover:bg-[#9B3922] text-white"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};