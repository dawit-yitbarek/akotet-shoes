import React from 'react';

export default function Hero() {
    return (
        <section
            className="relative h-screen bg-cover bg-center flex items-center justify-center md:justify-start px-6 md:px-20 text-center md:text-left"
            style={{
                backgroundImage: "url('/images/hero.webp')",
            }}
        >

            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-0"></div>

            {/* Content */}
            <div className="relative z-10 max-w-xl text-[#EEEEEE] space-y-6">
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                    Step Into Quality — Pay Online
                </h2>
                <p className="text-base md:text-lg text-[#F2613F] font-medium">
                    100% Leather • Handcrafted • Secure Online Payment
                </p>

                <a
                    href="/shop"
                    className="inline-block px-6 py-3 bg-[#9B3922] hover:bg-[#F2613F] text-white font-medium rounded-full transition"
                >
                    Browse Collection
                </a>
            </div>
        </section>
    );
};


