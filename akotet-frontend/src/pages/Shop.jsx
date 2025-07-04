import React, { useEffect, useState } from 'react';
import { CardSkeleton } from '../components/SkeletonPlaceholder';
import api from '../components/Api';
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function Shop() {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [error, setError] = useState(false)

    const filtered = items
        .filter(p => p.code.toString().includes(search))
        .filter(p => selectedSize ? p.size?.toString() === selectedSize : true)
        .sort((a, b) => {
            if (sort === 'asc') return a.price - b.price;
            if (sort === 'desc') return b.price - a.price;
            return 0;
        });

    useEffect(() => {
        const getItems = async () => {
            setLoading(true)
            try {
                const response = await api.get(`${BackEndUrl}/api/products`)
                setItems(response.data.result);
            } catch (error) {
                console.log('error from products function', error)
                setError(true)
            } finally {
                setLoading(false)
            };
        };
        getItems();
    }, [refresh])

    return (
        <section className="bg-[#0C0C0C] min-h-screen text-[#EEEEEE] px-6 md:px-20 py-10">
            {/* Header */}
            <div className="text-center md:text-left mb-12 space-y-3">
                <h2 className="text-3xl font-bold text-[#F2613F]">Explore Our Collection</h2>
                <p className="text-[#EEEEEE] text-base md:text-lg max-w-2xl">
                    Discover handcrafted, 100% leather shoes made to impress and built to last.
                    Browse by code, sort by price, and contact us directly to place your order.
                </p>
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <input
                    type="text"
                    placeholder="Search by code..."
                    className="p-2 rounded-md w-full md:w-1/3 bg-[#1a1a1a] border border-[#481E14] text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="p-2 rounded-md w-full md:w-1/5 bg-[#1a1a1a] border border-[#481E14] text-white"
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort by cost</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>

                <select
                    className="p-2 rounded-md w-full md:w-1/5 bg-[#1a1a1a] border border-[#481E14] text-white"
                    onChange={(e) => setSelectedSize(e.target.value)}
                >
                    <option value="">Filter by size</option>
                    <option value="37">Size 37</option>
                    <option value="38">Size 38</option>
                    <option value="39">Size 39</option>
                    <option value="40">Size 40</option>
                    <option value="41">Size 41</option>
                    <option value="42">Size 42</option>
                    <option value="43">Size 43</option>
                    <option value="44">Size 44</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {loading
                    ? Array(8)
                        .fill()
                        .map((_, i) => <CardSkeleton key={i} />)
                    : filtered.length > 0
                        ? filtered.map(({ id, code, price, image_url, size }) => (
                            <div
                                key={id}
                                className="bg-[#1A1A1A] rounded-xl shadow-lg border border-[#481E14] hover:scale-[1.02] transition"
                            >
                                <img
                                    src={image_url}
                                    alt={code}
                                    className="w-full h-auto rounded-t-xl object-cover"
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
                        ))
                        : ( !error &&
                            <p className="text-center text-gray-400 col-span-full mt-10">
                                No shoes found for the selected filters.
                            </p>
                        )}
            </div>

            {error && (
                <div className="text-center mt-10">
                    <p className="text-red-500 mb-4">Failed to load products.</p>
                    <button
                        onClick={() => setRefresh(prev => prev + 1)}
                        className="px-5 py-2 rounded bg-[#9B3922] hover:bg-[#F2613F] text-white transition"
                    >
                        Retry
                    </button>
                </div>
            )}


        </section>
    );
};