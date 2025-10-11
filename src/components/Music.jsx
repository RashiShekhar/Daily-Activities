import React, { useEffect, useState } from "react";

export default function Music() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newTracks = [
      {
        id: "rfl1",
        name: "Carefree Happiness",
        artist_name: "RoyaltyFreeMusicLibrary",
        album_image:
          "https://royaltyfreemusiclibrary.com/images/carefree-happiness.jpg",
        audio: "https://royaltyfreemusiclibrary.com/mp3/Carefree-Happiness.mp3",
      },
      {
        id: "rfl2",
        name: "Memories And Inspiration",
        artist_name: "RoyaltyFreeMusicLibrary",
        album_image:
          "https://royaltyfreemusiclibrary.com/images/memories-inspiration.jpg",
        audio:
          "https://royaltyfreemusiclibrary.com/mp3/Memories-Inspiration.mp3",
      },
      {
        id: "rfl3",
        name: "Ukulele Happiness",
        artist_name: "RoyaltyFreeMusicLibrary",
        album_image:
          "https://royaltyfreemusiclibrary.com/images/ukulele-happiness.jpg",
        audio: "https://royaltyfreemusiclibrary.com/mp3/Ukulele-Happiness.mp3",
      },
      {
        id: "rfl4",
        name: "Epic Cinematic",
        artist_name: "RoyaltyFreeMusicLibrary",
        album_image:
          "https://royaltyfreemusiclibrary.com/images/epic-cinematic.jpg",
        audio: "https://royaltyfreemusiclibrary.com/mp3/Epic-Cinematic.mp3",
      },
      {
        id: "rfl5",
        name: "Upbeat Summer",
        artist_name: "RoyaltyFreeMusicLibrary",
        album_image:
          "https://royaltyfreemusiclibrary.com/images/upbeat-summer.jpg",
        audio: "https://royaltyfreemusiclibrary.com/mp3/Upbeat-Summer.mp3",
      },
      {
        id: "rfl6",
        name: "Inspiring Corporate",
        artist_name: "RoyaltyFreeMusicLibrary",
        album_image:
          "https://royaltyfreemusiclibrary.com/images/inspiring-corporate.jpg",
        audio:
          "https://royaltyfreemusiclibrary.com/mp3/Inspiring-Corporate.mp3",
      },
    ];

    // simulate loading
    setTimeout(() => {
      setTracks(newTracks);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🎵 My Music List
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading music...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              {track.album_image ? (
                <img
                  src={track.album_image}
                  alt={`${track.name} cover`}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">
                  {track.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  by <span className="font-medium">{track.artist_name}</span>
                </p>

                <audio controls src={track.audio} className="w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
