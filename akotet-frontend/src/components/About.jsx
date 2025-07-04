import React from "react";

export default function About() {
  return (
    <section className="bg-[#0C0C0C] text-[#EEEEEE] px-6 md:px-20 py-16 border-t border-[#481E14]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F2613F]">
          About Akotet Shoes
        </h2>
        <p className="text-lg md:text-xl text-[#EEEEEE] leading-relaxed">
          At <span className="text-[#9B3922] font-semibold">Akotet Shoes (አኮቴት ጫማ)</span>, we
          specialize in crafting premium, 100% leather footwear that blends
          timeless style with unbeatable quality. Every pair is handcrafted with
          attention to detail, designed for comfort, and made to last. Whether
          you’re dressing for business, casual, or special occasions, we deliver
          elegance to your doorstep.
        </p>
        <p className="text-md text-[#EEEEEE]/80">
          We believe in the power of great shoes — not just how they look, but how they make you feel.
          Proudly based in Ethiopia, we’re committed to offering quality products, secure online payments,
          and reliable delivery with every order.
        </p>
      </div>
    </section>
  );
};