// src/app/home/page.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
// const REDIRECT_URI = 'http://localhost:3000/home';
const REDIRECT_URI = 'https://immerse-music.vercel.app/home';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'user-read-recently-played';

interface Song {
  title: string;
  artist: string;
  imageUrl: string;
  spotifyUrl: string;
}

const songs: Song[] = [
  {
    title: "sdp interlude",
    artist: "Travis Scott",
    imageUrl: "https://f4.bcbits.com/img/a0049251227_10.jpg",
    spotifyUrl: "https://open.spotify.com/track/4gh0ZnHzaTMT1sDga7Ek0N?si=238cdf5ac3c54b4f"
  },
  {
    title: "Gimme Shelter",
    artist: "The Rolling Stones",
    imageUrl: "https://www.udiscovermusic.com/wp-content/uploads/2015/10/The-Rolling-Stones-Let-It-Bleed-cover-1024x1024.jpg",
    spotifyUrl: "https://open.spotify.com/track/6H3kDe7CGoWYBabAeVWGiD?si=7feb1146e4a14020"
  },
  {
    title: "Alright",
    artist: "Kendrick Lamar",
    imageUrl: "https://www.udiscovermusic.com/wp-content/uploads/2015/10/Kendrick-Lamar-To-Pimp-a-Butterfly-1024x1024.jpg",
    spotifyUrl: "https://open.spotify.com/track/3iVcZ5G6tvkXZkZKlMpIUs?si=2448d85134e04645"
  },
  {
    title: "THE REASON",
    artist: "Gryffin",
    imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6f1edc86715127.5da1f42675b05.png",
    spotifyUrl: "https://open.spotify.com/track/1H7izUQD8BKZgcUTIG0t6o?si=c3b10fca9fd24b69"
  },
  {
    title: "Sorry Mom",
    artist: "The Band Camino",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2739d77ddd3dfab1a8530f30dee",
    spotifyUrl: "https://open.spotify.com/track/7CsZ2Pjay8HAQ1DDzqPeMH?si=b030b0d221c64d73"
  },
  {
    title: "Mine",
    artist: "Bazzi",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273f9f2d43ff44bdfbe8c556f8d",
    spotifyUrl: "https://open.spotify.com/track/7uzmGiiJyRfuViKKK3lVmR?si=3b819b79c38f47c5"
  },
  {
    title: "February",
    artist: "Matilda Mann",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273b3d33d8a4831ce070d405523",
    spotifyUrl: "https://open.spotify.com/track/5jxjLdZXCqZlAOCC1OHOmc?si=44b5dc95ca5f415a"
  },
  {
    title: "UNDERSTAND",
    artist: "Keshi",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b27319aff2da63b211d75341e8eb",
    spotifyUrl: "https://open.spotify.com/track/72sfmdpuO5r8cBDgs7MqZZ?si=5d37c172e3d94c29"
  }
];

const HomeScreen: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] ?? null;

      window.location.hash = "";
      if (token) {
        localStorage.setItem("token", token);
        router.push('/gallery');
      }
    } else if (token) {
      router.push('/gallery');
    }

    const scrollContainer = scrollRef.current;
    const contentContainer = contentRef.current;

    if (scrollContainer && contentContainer) {
      const scrollWidth = contentContainer.scrollWidth;
      let scrollPos = 0;
      const scroll = () => {
        scrollPos += 1;
        if (scrollPos >= scrollWidth / 2) {
          scrollPos = 0;
          scrollContainer.scrollLeft = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      };
      const intervalId = setInterval(scroll, 10);
      return () => clearInterval(intervalId);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl font-bold text-white mb-8 font-['Helvetica'] uppercase tracking-widest">
          IMMERSE
        </h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
           className="bg-white text-black font-bold py-2 rounded-lg px-4 mb-8 hover:bg-gray-200 hover:scale-105 transform transition duration-300 ease-in-out">
          CONNECT TO SPOTIFY
        </a>
        <div
          ref={scrollRef}
          className="w-full max-w-7xl overflow-x-hidden whitespace-nowrap"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
        >
          <div ref={contentRef} className="inline-flex">
            {[...songs, ...songs].map((song, index) => (
              <div
                key={index}
                className="w-80 h-80 mx-4 flex-shrink-0 inline-block relative overflow-hidden  hover:scale-105 transform transition duration-300 ease-in-out"
              >
                <Image
                  src={song.imageUrl}
                  alt={song.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                  <h2 className="text-white text-2xl font-bold mb-1 truncate" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    {song.title}
                  </h2>
                  <p className="text-gray-300 truncate" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    {song.artist}
                  </p>
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