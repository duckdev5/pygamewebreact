import React from "react";

const mockLeaderboardData = [
  { name: "Player1", score: 120 },
  { name: "Player2", score: 100 },
  { name: "Player3", score: 80 },
];

const Leaderboard = () => {
  return (
    <div className="space-y-2">
      {mockLeaderboardData.map((player, index) => (
        <div key={index} className="flex justify-between border-b pb-1">
          <span>{player.name}</span>
          <span>{player.score}</span>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
