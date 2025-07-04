import React from "react";

export default function CTA() {
    return (
        <section className="bg-[#481E14] text-[#EEEEEE] px-6 md:px-20 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Order ? Pay Online or Chat with Us!
            </h2>
            <p className="mb-6 text-[#EEEEEE]/90 text-lg">
                You can now complete your order and pay online. Prefer to chat ? We’re just a message away.
            </p>
            <a
                href="https://t.me/Akotet_Shoes"
                target="_blank"
                className="inline-block px-8 py-4 bg-[#F2613F] hover:bg-[#9B3922] text-white font-semibold rounded-full transition"
            >
                Contact Us on Telegram
            </a>
        </section>
    );
};