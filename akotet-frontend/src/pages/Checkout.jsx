import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';
import api from '../components/Api';
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

const Checkout = () => {
  const { item_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({})
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchError, setFetchError] = useState(false);
  const [refresh, setRefesh] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const getItem = async () => {
      setRefreshing(true)
      setFetchError(false)
      try {
        const result = await api.get(`${BackEndUrl}/api/products/${item_id}`)
        setProduct(result.data.item)
      } catch (error) {
        setFetchError(true)
      } finally {
        setRefreshing(false)
      };
    };
    getItem();
  }, [refresh]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const res = await api.post(`${BackEndUrl}/api/payment/initiate`, {
        ...form,
        ...product
      });

      window.location.href = res.data.checkout_url; // Redirect to Chapa
    } catch (err) {
      console.error(err);
      setLoading(false)
      setError('Payment initiation failed');
    }
  };

  return (
    <section className="bg-[#0C0C0C] min-h-screen text-white px-6 md:px-20 py-16">

      {fetchError ? (
        <div className="flex flex-col items-center justify-center bg-[#1A1A1A] border border-red-600 p-8 rounded-lg max-w-md mx-auto">
          <MdErrorOutline className="text-red-500 text-5xl mb-4" />
          <h2 className="text-lg font-semibold text-red-500 mb-2">
            Failed to load product
          </h2>
          <p className="text-sm text-gray-300 mb-4 text-center">
            We couldn't fetch the selected item. Please check your connection or try again.
          </p>
          <button
            className="bg-[#9B3922] hover:bg-[#F2613F] transition-colors px-6 py-2 rounded-full text-white"
            disabled={refreshing}
            onClick={() => setRefesh(prev => prev + 1)}
          >
            {refreshing ? 'Reloading...' : 'Retry'}
          </button>
        </div>
      ) :
        <>
          <h2 className="text-3xl font-bold text-[#F2613F] mb-10">Checkout</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Product Summary */}
            <div className="bg-[#1A1A1A] rounded-xl border border-[#481E14]">
              <img
                src={product.image_url}
                alt={product.code}
                className="w-full h-auto object-cover rounded mb-2"
                onError={(e) => { e.target.src = '/images/img_placeholder.webp'; }}
              />

              <div className='p-6'>
                <h3 className="text-xl font-bold text-[#F2613F] mb-1">
                  Code: {product.code}
                </h3>
                <p className="mb-1">Price: {product.price} ETB</p>
                <p>Size: {product.size}</p>
              </div>
            </div>

            {/* Customer Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-[#1A1A1A] border border-[#481E14] rounded-md text-white"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full p-3 bg-[#1A1A1A] border border-[#481E14] rounded-md text-white"
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full p-3 bg-[#1A1A1A] border border-[#481E14] rounded-md text-white"
                rows={4}
              />

              {error && <p className="text-red-500">{error}</p>}
              {loading && <p>Redirecting to payment...</p>}

              <button
                disabled={loading}
                className="w-full bg-[#9B3922] hover:bg-[#F2613F] text-white py-3 rounded-full font-medium flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : null}
                {loading ? 'Redirecting...' : 'Pay with Chapa'}
              </button>

            </form>
          </div>
        </>
      }
    </section>
  );
};

export default Checkout;