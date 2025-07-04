import React from "react";
import { Mail, Phone, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] border-t border-[#481E14] px-6 md:px-20 py-10 text-[#EEEEEE]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-[#F2613F] mb-2">Akotet Shoes</h2>
          <p className="text-sm text-[#EEEEEE]/70">
            Premium handcrafted leather shoes. Stylish, durable, and delivered with care across Ethiopia.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#9B3922] mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-[#F2613F] transition">Home</a></li>
            <li><a href="/shop" className="hover:text-[#F2613F] transition">Shop</a></li>
            <li><a href="/contact" className="hover:text-[#F2613F] transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info with Icons */}
        <div>
          <h3 className="text-lg font-semibold text-[#9B3922] mb-2">Get in Touch</h3>
          <ul className="text-sm space-y-3">
            <li className="flex items-center gap-2">
              <Send size={16} className="text-[#F2613F]" />
              <a
                href="https://t.me/Akotet_Shoes"
                target="_blank"
                className="hover:text-[#F2613F] transition"
              >
                @Akotet_Shoes
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-[#F2613F]" />
              <a
                href="mailto:akotetshoes@gmail.com"
                className="hover:text-[#F2613F] transition"
              >
                akotetshoes@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[#F2613F]" />
              <a
                href="tel:+251913576070"
                className="hover:text-[#F2613F] transition"
              >
                +251 913 576 070
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-[#481E14] pt-6 text-center text-sm text-[#EEEEEE]/50">
        <p>&copy; {new Date().getFullYear()} Akotet Shoes. All rights reserved.</p>
        <p className="mt-2">
          Developed by{' '}
          <a
            href="https://t.me/Davidyz17"
            className="text-[#F2613F] hover:underline"
            target="_blank"
          >
            David – Full Stack Web Developer
          </a>
        </p>
      </div>
    </footer>
  );
};