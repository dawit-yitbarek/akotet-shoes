import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import CTA from '../components/CTA';

function Home() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      <Hero />
      <About />
      <WhyChooseUs />
      <FeaturedProducts />
      <CTA />
    </div>
  );
}

export default Home;