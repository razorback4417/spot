// src/app/home/page.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
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

const sampleSong: Song = {
  title: "SPD INTERLUDE",
  artist: "TRAVIS SCOTT",
  imageUrl: "https://f4.bcbits.com/img/a0049251227_10.jpg",
  spotifyUrl: "https://open.spotify.com/track/4gh0ZnHzaTMT1sDga7Ek0N?si=238cdf5ac3c54b4f"
};

const songs: Song[] = Array(8).fill(sampleSong);

const HomeScreen: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
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
  }, [router]);

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl font-bold text-white mb-8 font-['Helvetica'] uppercase tracking-widest">
          IMMERSE
        </h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
           className="bg-white text-black font-bold py-2 px-4 mb-8 hover:bg-gray-200">
          CONNECT TO SPOTIFY
        </a>
        <div
          ref={scrollRef}
          className="w-full max-w-7xl overflow-x-hidden whitespace-nowrap"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
        >
          <div className="inline-flex">
            {songs.map((song, index) => (
              <div
                key={index}
                className="w-72 h-96 mx-4 flex-shrink-0 inline-block relative overflow-hidden"
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