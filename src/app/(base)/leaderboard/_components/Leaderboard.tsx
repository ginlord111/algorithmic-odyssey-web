"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { GameState } from "@/types/types";

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/game");
      const data = await response.json();
      setUsers(data.users);
      console.log(data.users, "USERS LEADERBOARD")
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">LEADERBOARD</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-2">Rank</th>
              <th scope="col" className="px-3 py-2">Player</th>
              <th scope="col" className="px-3 py-2">Score</th>
              <th scope="col" className="px-3 py-2 hidden sm:table-cell">Level</th>
              <th scope="col" className="px-3 py-2 hidden sm:table-cell">Hints</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const gameState = user.gameState as unknown as GameState;
              const totalScore = gameState.levels
                .filter((level) => level.isCompleted)
                .reduce((total, level) => total + level.points, 0);
              const highestLevelCount = gameState.levels.filter((level) => level.isCompleted).length;
              const hintUsed = gameState.levels.reduce((total, level) => total + level.hintsUsed, 0);

              return (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <Image
                        className="w-8 h-8 rounded-full"
                        src={user.userImage as string}
                        alt={`${user.username} image`}
                        width={32}
                        height={32}
                      />
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
                    {totalScore}
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell">
                    {highestLevelCount}
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell">
                    {hintUsed}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

