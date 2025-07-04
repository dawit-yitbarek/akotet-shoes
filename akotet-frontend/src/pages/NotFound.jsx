import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-[#0C0C0C] text-[#EEEEEE] px-6 py-16">
            <div className="text-center max-w-md space-y-6">
                <AlertTriangle size={64} className="mx-auto text-[#F2613F]" />
                <h1 className="text-4xl font-extrabold text-[#F2613F]">404</h1>
                <p className="text-lg text-[#EEEEEE]/80">
                    Oops! The page you're looking for doesn’t exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-[#9B3922] hover:bg-[#F2613F] text-white rounded-full transition"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    );
};