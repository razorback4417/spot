'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/phone-login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Immerse</h1>
        <p className="text-xl text-white mb-8">Connect with friends and share your favorite music on campus</p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}