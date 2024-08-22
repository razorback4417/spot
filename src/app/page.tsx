// //app/page.tsx
// 'use client';

// import React from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const router = useRouter();

//   const handleGetStarted = () => {
//     router.push('/phone-login');
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-none shadow-lg w-96 border-2 border-black text-center">
//         <h1 className="text-4xl font-bold mb-4 uppercase tracking-widest">Welcome to Immerse</h1>
//         <p className="text-xl mb-8">Connect with friends and share your favorite music on campus</p>
//         <button
//           onClick={handleGetStarted}
//           className="bg-black text-white font-bold py-2 px-6 rounded-none hover:bg-gray-800 transition duration-300 uppercase"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/phone-login');
    };

    return (
        <div className="min-h-screen relative">
            <Image
                src="/images/background.jpg"
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
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                    <h1 className="text-4xl font-bold mb-4 uppercase tracking-widest">Immerse</h1>
                    <p className="text-xl mb-8">Discover and share new music with friends.</p>
                    <button
                        onClick={handleGetStarted}
                        className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300 uppercase"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}