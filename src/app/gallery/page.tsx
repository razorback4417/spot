// src/app/gallery/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

const GalleryPage: React.FC = () => {
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/home');
    } else {
      fetchRecentTracks(token);
    }
  }, [router]);

  const fetchRecentTracks = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=9', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRecentTracks(data.items.map((item: any) => item.track));
      } else {
        throw new Error(`Failed to fetch tracks: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error fetching tracks:', err);
      setError('Failed to load tracks. Please try logging in again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/home');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-4xl font-bold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-2xl">{error}</p>
          <button onClick={() => router.push('/home')} className="bg-white text-black font-bold py-2 px-4 hover:bg-gray-200">
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-bold text-white font-['Helvetica'] uppercase tracking-widest">
            IMMERSE
          </h1>
          <button onClick={logout} className="bg-white text-black font-bold py-2 px-4 hover:bg-gray-200">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentTracks.map((track) => (
            <div key={track.id} className="relative aspect-square overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 hover:shadow-lg">
                <h2 className="text-white text-2xl font-bold mb-1 truncate" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {track.name.toUpperCase()}
                </h2>
                <p className="text-gray-300 truncate" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {track.artists.map(artist => artist.name).join(', ').toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;