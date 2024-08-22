'use client';

import React, { useEffect, useRef } from 'react';

const HomeScreen: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollAmount = scrollContainer.scrollWidth / 2;
      let scrollPos = 0;

      const scroll = () => {
        scrollPos += 1;
        if (scrollPos >= scrollAmount) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      };

      const intervalId = setInterval(scroll, 15);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Immerse</h1>
      <div
        ref={scrollRef}
        className="w-full max-w-3xl overflow-x-hidden whitespace-nowrap"
      >
        <div className="inline-flex">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="w-64 h-96 bg-white rounded-lg shadow-lg mx-4 flex-shrink-0 inline-block"
            >
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Card Title {index + 1}</h2>
                <p className="text-gray-600">This is a sample card description.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;