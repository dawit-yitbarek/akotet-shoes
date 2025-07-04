import React, { useState, useEffect } from 'react';
import { OrderSkeleton } from '../components/SkeletonPlaceholder'
import api from '../components/Api';
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function TrackOrders() {
    const [activeTab, setActiveTab] = useState('pending');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [approving, setApproving] = useState(false);
    const [error, setError] = useState(false);

    const fetchOrders = async (status) => {
        try {
            setLoading(true);
            const res = await api.get(`${BackEndUrl}/api/orders?status=${status}`);
            setOrders(res.data.orders);
        } catch (error) {
            console.error("Failed to fetch orders");
            setError(true)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(activeTab);
    }, [activeTab]);

    const handleApprove = async () => {
        if (!selectedOrder) return;
        setApproving(true);
        try {
            await api.put(`${BackEndUrl}/api/orders/${selectedOrder.id}`);
            setSelectedOrder(null);
            fetchOrders(activeTab);
        } catch (err) {
            alert("Failed to update order status.");
        } finally {
            setApproving(false);
        }
    };

    return (
        <section className="bg-[#0C0C0C] text-[#EEEEEE] min-h-screen px-6 md:px-20 py-16">
            <h2 className="text-3xl font-bold text-[#F2613F] mb-10">Track Orders</h2>

            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-8">
                {['pending', 'delivered'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full font-semibold transition-all duration-200
              ${activeTab === tab
                                ? 'bg-[#F2613F] text-white'
                                : 'bg-[#1A1A1A] text-[#EEEEEE] hover:bg-[#2a2a2a] hover:text-[#F2613F]'}`}
                    >
                        {tab === 'pending' ? 'Pending Orders' : 'Delivered Orders'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array(6).fill().map((_, i) => <OrderSkeleton key={i} />)}
                </div>
            ) : orders.length === 0 && !error ? (
                <p className="text-center text-gray-400">No {activeTab} orders found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-[#1A1A1A] border border-[#481E14] rounded-xl overflow-hidden shadow-lg"
                        >
                            <img
                                src={order.image_url}
                                alt={order.product_code}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-[#F2613F] font-semibold">Code: {order.product_code}</h3>
                                <p>Price: {order.price} ETB</p>
                                <p>Customer: {order.customer_name}</p>
                                <p>Phone: {order.phone}</p>
                                <p>Address: {order.address}</p>
                                <p className="text-sm text-gray-400">
                                    Ordered on: {new Date(order.created_at).toLocaleDateString()}
                                </p>

                                {activeTab === 'pending' && (
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="mt-4 block w-full text-center bg-[#9B3922] hover:bg-[#F2613F] text-white py-2 rounded-md"
                                    >
                                        Mark as Delivered
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}


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

            {/* Approve Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-[#1A1A1A] border border-[#481E14] p-6 rounded-xl w-[90%] max-w-md text-center">
                        <h3 className="text-xl font-bold text-[#F2613F] mb-4">Confirm Delivery</h3>
                        <p className="text-sm mb-6">
                            Are you sure you want to mark order <span className="text-[#F2613F] font-semibold">{selectedOrder.id}</span> as <strong>delivered</strong>?
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 rounded bg-[#9B3922] hover:bg-[#F2613F] text-white"
                                disabled={approving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApprove}
                                disabled={approving}
                                className="px-4 py-2 rounded bg-[#F2613F] hover:bg-[#9B3922] text-white"
                            >
                                {approving ? "Approving..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};