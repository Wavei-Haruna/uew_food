import React from 'react';
import HowItWorksImg from "../assets/Images/HowItWorks.png";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-center text-3xl font-bold mb-4">How It Works</h1>
        <img src={HowItWorksImg} alt="How It Works" className="mx-auto w-full md:w-2/3 lg:w-3/4" />
      </div>
    </section>
  );
}