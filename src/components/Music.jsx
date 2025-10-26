import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Music.css";

export default function Music() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/tracks")
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tracks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      className="music-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="music-title">🎵 My Music List</h1>

      {loading ? (
        <p className="loading-text">Loading music...</p>
      ) : (
        <div className="music-grid">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id || index}
              className="music-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              {track.album_image ? (
                <img
                  src={track.album_image}
                  alt={track.name}
                  className="album-img"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}

              <div className="music-info">
                <h2 className="track-name">{track.name}</h2>
                <p className="artist-name">
                  by <span>{track.artist_name}</span>
                </p>
                <audio controls src={track.audio} className="audio-player" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
