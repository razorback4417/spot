//home/page.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

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
    <div className="min-h-screen relative">
      <Image
        src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=2859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-white mb-8 font-['Helvetica'] uppercase tracking-widest">
          IMMERSE
        </h1>
        <div
          ref={scrollRef}
          className="w-full max-w-5xl overflow-x-hidden whitespace-nowrap"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
        >
          <div className="inline-flex">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="w-72 h-96 bg-white rounded-lg shadow-lg mx-4 flex-shrink-0 inline-block"
              >
                <div className="h-48 bg-gray-200 rounded-t-lg relative">
                  <div className="absolute top-2 left-2 bg-white px-2 py-1 text-sm font-bold rounded-lg">
                    CARD {index + 1}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 uppercase">Card Title {index + 1}</h2>
                  <p className="text-gray-600 font-['Helvetica']">This is a sample card description.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;