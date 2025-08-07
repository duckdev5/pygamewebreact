import React, { useState } from 'react';

const VisualGame = () => {
  const [scene, setScene] = useState(1);

  const nextScene = () => {
    setScene(prev => (prev < 3 ? prev + 1 : 1));
  };

  const prevScene = () => {
    setScene(prev => (prev > 1 ? prev - 1 : 3));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Visual Novel Game - Scene {scene}</h2>
      <div className="border p-4 mb-4 min-h-[200px]">
        {scene === 1 && <p>You are in a quiet forest. Birds are chirping.</p>}
        {scene === 2 && <p>A mysterious stranger appears and offers you a quest.</p>}
        {scene === 3 && <p>You accept the quest and set off on your adventure.</p>}
      </div>
      <div className="flex gap-4">
        <button
          onClick={prevScene}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={nextScene}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VisualGame;
