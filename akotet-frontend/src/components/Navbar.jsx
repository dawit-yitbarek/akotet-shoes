import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // to detect current path

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Contact', path: '/contact' },
        { label: 'Admin', path: '/admin' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-[#0C0C0C] text-[#EEEEEE] py-3 px-8 flex items-center justify-between border-b border-[#481E14] shadow-md">
            {/* Brand */}
            <h1 className="text-2xl font-bold tracking-wide text-[#F2613F]">
                <a href="/">Akotet Shoes</a>
            </h1>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 text-sm font-medium">
                {navLinks.map(({ label, path }) => (
                    <a
                        key={path}
                        href={path}
                        className={`transition ${isActive(path) ? 'text-[#F2613F]' : 'text-[#EEEEEE] hover:text-[#F2613F]'
                            }`}
                    >
                        {label}
                    </a>
                ))}
            </div>

            {/* Hamburger Button */}
            <button
                className="md:hidden z-20"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#0C0C0C] flex flex-col items-center gap-4 py-6 border-t border-[#481E14] z-10 md:hidden">
                    {navLinks.map(({ label, path }) => (
                        <a
                            key={path}
                            href={path}
                            className={`text-sm font-medium transition ${isActive(path) ? 'text-[#F2613F]' : 'text-[#EEEEEE] hover:text-[#F2613F]'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};