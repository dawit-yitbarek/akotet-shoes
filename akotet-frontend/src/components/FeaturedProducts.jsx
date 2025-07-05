import React, { useState, useEffect } from 'react';
import api from './Api';
import { CardSkeleton } from './SkeletonPlaceholder';
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function FeaturedProducts() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const getItems = async () => {
            setLoading(true);
            setError(false)
            try {
                const item = await api.get(`${BackEndUrl}/api/products/featured`);
                setItems(item.data.products);
            } catch (error) {
                console.log(error);
                setError(true)
            } finally {
                setLoading(false);
            }
        };
        getItems();
    }, [refresh]);

    return (
        <section className="bg-[#0C0C0C] text-[#EEEEEE] px-6 md:px-20 py-16 border-t border-[#481E14]">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#F2613F]">Featured Collection</h2>
                <p className="mt-2 text-[#EEEEEE]/80">Our top picks — quality meets style</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto justify-center">
                {loading
                    ? Array(3)
                        .fill()
                        .map((_, i) => <CardSkeleton key={i} />)
                    : items.map(({ id, code, price, size, image_url }) => (
                        <div
                            key={id}
                            className="bg-[#1A1A1A] rounded-xl shadow-md border border-[#481E14] hover:scale-[1.02] transition"
                        >
                            <img
                                src={image_url}
                                alt={code}
                                className="w-full h-auto object-cover rounded-t-xl"
                                loading="lazy"
                                onError={(e) => { e.target.src = 'images/img_placeholder.webp'; }}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-[#F2613F] mb-1">Code: {code}</h3>
                                <p className="text-sm mb-1">Price: {price} ETB</p>
                                <p className="text-sm mb-3">Size: {size}</p>
                                <a
                                    href={`/checkout/${id}`}
                                    className="inline-block w-full text-center px-4 py-2 bg-[#9B3922] hover:bg-[#F2613F] text-white rounded-md"
                                >
                                    Buy Now
                                </a>
                            </div>
                        </div>
                    ))}
            </div>

            {error && (
                <div className="text-center mt-10">
                    <p className="text-red-500 mb-4">Failed to load featured Collections.</p>
                    <button
                        onClick={() => setRefresh(prev => prev + 1)}
                        className="px-5 py-2 rounded bg-[#9B3922] hover:bg-[#F2613F] text-white transition"
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="mt-10 text-center">
                <a
                    href="/shop"
                    className="inline-block px-6 py-3 bg-[#9B3922] hover:bg-[#F2613F] text-white font-medium rounded-full transition"
                >
                    View All Shoes
                </a>
            </div>
        </section>
    );
};