import React, { useEffect, useState } from "react";

const CLIENT_ID = "7066ad5b";

export default function Music() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMusic() {
      try {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=10&include=musicinfo`
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
    <div className="relative min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        🎵 Jamendo Music List
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading music...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {track.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                by <span className="font-medium">{track.artist_name}</span>
              </p>
              <audio
                controls
                src={track.audio}
                className="w-full mt-2 rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
