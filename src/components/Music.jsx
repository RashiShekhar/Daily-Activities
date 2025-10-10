import React, { useEffect, useState } from "react";

const CLIENT_ID = "7066ad5b";

export default function Music() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMusic() {
      try {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=12&include=musicinfo+stats`
        );
        const data = await response.json();
        setTracks(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching music", error);
        setLoading(false);
      }
    }

    fetchMusic();
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
