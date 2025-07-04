import React from 'react';
import { PackageCheck, ShieldCheck, Gem, Hand } from 'lucide-react';

export default function WhyChooseUs() {
    const features = [
        {
            icon: <Gem size={32} className="text-[#F2613F]" />,
            title: '100% Leather',
            desc: 'Every pair is crafted from genuine, high-quality leather for unmatched durability and class.',
        },
        {
            icon: <Hand size={32} className="text-[#F2613F]" />,
            title: 'Handcrafted Quality',
            desc: 'Made with precision and care, our shoes are built by skilled artisans.',
        },
        {
            icon: <ShieldCheck size={32} className="text-[#F2613F]" />,
            title: 'Standard & Stylish',
            desc: 'We combine premium quality with timeless design suitable for every occasion.',
        },
        {
            icon: <PackageCheck size={32} className="text-[#F2613F]" />,
            title: 'Fast Delivery',
            desc: 'Get your shoes quickly and reliably with our efficient delivery service.',
        },
        {
            icon: <ShieldCheck size={32} className="text-[#F2613F]" />,
            title: 'Secure Online Payment',
            desc: 'Order your favorite pair and pay instantly with a safe and seamless checkout system.',
        }
    ];

    return (
        <section className="bg-[#0C0C0C] text-[#EEEEEE] px-6 md:px-20 py-16 border-t border-[#481E14]">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#F2613F]">Why Choose Us</h2>
                <p className="mt-2 text-[#EEEEEE]/80">What makes Akotet Shoes stand out?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-[#1A1A1A] p-6 rounded-xl border border-[#481E14] shadow-md text-center hover:shadow-lg transition"
                    >
                        <div className="mb-4 flex justify-center">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-[#EEEEEE]">{feature.title}</h3>
                        <p className="text-sm text-[#EEEEEE]/80">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};