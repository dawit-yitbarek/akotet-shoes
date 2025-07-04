import React from 'react';
import { Send, Mail, Phone } from 'lucide-react';
import { FaTelegramPlane, FaTiktok } from 'react-icons/fa';

export default function Contact() {
    return (
        <section className="min-h-screen bg-[#0C0C0C] text-[#EEEEEE] px-6 md:px-20 py-16">
            <div className="max-w-5xl mx-auto space-y-24">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F2613F]">Get in Touch</h2>
                    <p className="mt-2 text-[#EEEEEE]/80 text-base md:text-lg">
                        Reach out to us directly to place your order or ask a question.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="grid gap-10 md:grid-cols-3 text-center">
                    <div className="space-y-3">
                        <Send size={32} className="mx-auto text-[#F2613F]" />
                        <p className="text-sm text-[#EEEEEE]/80">Telegram</p>
                        <a href="https://t.me/Akotet_Shoes" target="_blank" className="text-[#F2613F]">
                            @Akotet_Shoes
                        </a>
                    </div>

                    <div className="space-y-3">
                        <Mail size={32} className="mx-auto text-[#F2613F]" />
                        <p className="text-sm text-[#EEEEEE]/80">Email</p>
                        <a href="mailto:akotetshoes@gmail.com" className="text-[#F2613F]">
                            akotetshoes@gmail.com
                        </a>
                    </div>

                    <div className="space-y-3">
                        <Phone size={32} className="mx-auto text-[#F2613F]" />
                        <p className="text-sm text-[#EEEEEE]/80">Phone</p>
                        <a href="tel:+251913576070" className="text-[#F2613F]">
                            +251 913 576 070
                        </a>
                    </div>
                </div>

                {/* Shop Locations */}
                <div className="text-center space-y-8">
                    <div>
                        <h3 className="text-2xl font-semibold text-[#9B3922] mb-2">Our Shop Locations</h3>
                        <p className="text-sm text-[#EEEEEE]/80">
                            You can also visit us in person at either of our sales centers:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 text-left md:text-center">
                        <div className="space-y-2">
                            <h4 className="text-lg font-medium text-[#F2613F]">Gurd Shola Branch</h4>
                            <p className="text-[#EEEEEE]/70">
                                ሳሊተምሕረት ፊጋ ማዞርያ መብራት 4N ሕንፃ አንደኛ ፎቅ 105 ቁጥር
                            </p>
                            <a
                                href="https://maps.app.goo.gl/yHtzGhe4ewjSJVWX9?g_st=ac"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#F2613F] hover:underline"
                            >
                                View on Google Maps
                            </a>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-lg font-medium text-[#F2613F]">Jemo 1 Branch</h4>
                            <p className="text-[#EEEEEE]/70">
                                ጀሞ 1 ሰን ሙን ስታር ሞል አንደኛ ፎቅ 23 ቁጥር
                            </p>
                            <a
                                href="https://maps.app.goo.gl/x3E6Gziw3TuD1cS38?g_st=ac"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#F2613F] hover:underline"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>
                </div>

                {/* Follow Us */}
                <div className="text-center space-y-6">
                    <h3 className="text-2xl font-semibold text-[#9B3922]">Follow Us</h3>
                    <p className="text-sm text-[#EEEEEE]/80">
                        Stay connected and get updates from Akotet Shoes
                    </p>

                    <div className="flex justify-center items-center gap-6">
                        <a
                            href="https://t.me/AkotetShoes"
                            target="_blank"
                            className="flex items-center gap-2 text-[#F2613F] hover:text-[#EEEEEE] transition"
                        >
                            <FaTelegramPlane size={20} />
                            Telegram
                        </a>

                        <a
                            href="https://www.tiktok.com/@akotet_shoes"
                            target="_blank"
                            className="flex items-center gap-2 text-[#F2613F] hover:text-[#EEEEEE] transition"
                        >
                            <FaTiktok size={20} />
                            TikTok
                        </a>
                    </div>
                </div>

                {/* Bottom Note */}
                <div className="text-center text-[#EEEEEE]/60 text-sm">
                    We’re available every day. Orders, questions, or feedback — we’d love to hear from you.
                </div>
            </div>
        </section>
    );
};