import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const Header: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (videoRef.current && !videoRef.current.contains(event.target as Node)) {
        toggleTutorial();
      }
    };

    if (showTutorial) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTutorial]);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">GUEST FACULTY HONORARIUM INITIATION</h1>
      </div>
      <div>
        <button
          id="btn-play"
          onClick={toggleTutorial}
          className="text-black bg-green-300 px-4 py-2 rounded-md hover:bg-green-600 mr-2"
        >
          Tutorial
        </button>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 mr-2"
        >
          Logout
        </button>
      </div>
      {showTutorial && (
        <div className="fixed z-10 inset-0 flex justify-start items-center bg-black bg-opacity-50">
          <div ref={videoRef} className="relative max-w-6xl xs:max-w-4xl w-full h-90 mx-auto">
            <span
              className="absolute left-0 top-0 right-0 cursor-pointer text-white text-3xl p-4"
              onClick={toggleTutorial}
            >
              &times;
            </span>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=7-on2gPpgEU" // change the URL
              controls={true}
              width="100%"
              height="70vh"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
