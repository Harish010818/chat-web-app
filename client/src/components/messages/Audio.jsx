import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useSelector } from "react-redux";

const Audio = ({ url }) => {
  const { authUser } = useSelector((store) => store.user);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100);
  };

  return (
    <div className="flex items-center bg-black p-3 rounded-lg shadow-sm w-72 space-x-3">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Avatar/Icon (Optional WhatsApp Style) */}
      <div className="relative">
        <img
          src={`${authUser?.profilePhoto}`}
          alt="user-profile"
          className="w-10 h-10 rounded-full border border-white"
        />
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="text-gray-600 dark:text-gray-200 hover:scale-110 transition-transform"
      >
        {isPlaying ? (
          <Pause size={24} fill="currentColor" />
        ) : (
          <Play size={24} fill="currentColor" />
        )}
      </button>

      {/* Progress Bar Container */}
      <div className="flex-1 relative h-1 bg-gray-300 rounded-full overflow-hidden">
        {/* Actual Progress */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Audio;