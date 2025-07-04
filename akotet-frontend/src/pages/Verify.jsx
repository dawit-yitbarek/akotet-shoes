import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../components/Api';
import { MdCheckCircle, MdError, MdAutorenew } from 'react-icons/md';

export default function Verify() {
  const { tx_ref } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [retry, setRetry] = useState(false);
  const verifyTransaction = useCallback(async () => {
    setStatus('loading');
    setMessage('');

    try {
      const res = await api.get(`/api/payment/verify/${tx_ref}`);
      const status = res.data.status;
      setStatus(status);

      if (status === 'success') {
        setMessage('Your order has been successfully placed. Our delivery team will contact you shortly.');
      } else if (status === 'fail') {
        setMessage('Payment failed. Please try again or contact support if you were charged.');
      } else if (status === 'exists') {
        const type = res.data.type || 'pending';
        setMessage(`This order was already processed. Delivery status: ${type.charAt(0).toUpperCase() + type.slice(1)}.`);
      } else {
        setMessage('Unknown status. Please contact support.');
      }

    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Something went wrong while verifying the transaction.');
    }
  }, [tx_ref]);

  useEffect(() => {
    verifyTransaction();
    console.log("verifying...")
  }, [verifyTransaction, retry]);

  const iconClass = "text-6xl mb-4";
  const commonClass = "bg-[#1A1A1A] border border-[#481E14] p-10 rounded-xl text-center max-w-md mx-auto";

  return (
    <section className="min-h-screen bg-[#0C0C0C] text-white px-6 md:px-20 py-20">
      <div className={commonClass}>
        {status === 'loading' && (
          <>
            <MdAutorenew className={`${iconClass} animate-spin text-[#F2613F]`} />
            <p className="text-lg">Verifying payment...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <MdCheckCircle className={`${iconClass} text-green-500`} />
            <p className="text-xl font-semibold mb-2">Payment Successful</p>
            <p>{message}</p>
          </>
        )}

        {status === 'fail' && (
          <>
            <MdError className={`${iconClass} text-red-500`} />
            <p className="text-xl font-semibold mb-2">Payment Failed</p>
            <p>{message}</p>
          </>
        )}

        {status === 'exists' && (
          <>
            <MdError className={`${iconClass} text-yellow-400`} />
            <p className="text-xl font-semibold mb-2">Order Already Processed</p>
            <p>{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <MdError className={`${iconClass} text-red-500`} />
            <p className="text-xl font-semibold mb-2">Error</p>
            <p className="mb-4">{message}</p>
            <button
              onClick={() => setRetry(prev => !prev)}
              className="bg-[#F2613F] hover:bg-[#9B3922] text-white px-6 py-3 rounded-full"
            >
              Retry Verification
            </button>
          </>
        )}

        {status !== 'loading' && status !== 'error' && (
          <Link to="/" className="inline-block mt-6 bg-[#9B3922] hover:bg-[#F2613F] text-white px-6 py-3 rounded-full">
            Go Home
          </Link>
        )}
      </div>
    </section>
  );
};