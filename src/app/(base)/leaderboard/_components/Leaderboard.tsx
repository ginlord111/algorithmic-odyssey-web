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
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="container max-w-full h-screen flex flex-col justify-center">
        <div className="container max-w-full flex justify-center">
          <div>
            <h1 className="text-4xl font-bold text-center mb-10">
              LEADERBOARD
            </h1>
            <div
              className="relative overflow-x-auto shadow-xl sm:rounded-lg"
              style={{ maxHeight: "39rem" }}
            >
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Scores
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Highest Level
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Hint Used
                    </th>
                  </tr>
                </thead>
                <tbody id="table_body">
                  {users.map((user, index) => {
                    const gameState = user.gameState as unknown as GameState;
                    const totalScore = gameState.levels
                      .filter((level) => level.isCompleted)
                      .reduce((total, level) => total + level.points, 0);
                      const highestLevelCount = gameState.levels.filter((level) => level.isCompleted).length
                      const hintUsed = gameState.levels.map((level)=>level.hintsUsed).reduce((total, hints)=> total + hints, 0)
                    return (
                      <tr
                        key={user.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4 text-center">{index + 1}</td>
                        <th
                          scope="row"
                          className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <Image
                            className="w-10 h-10 rounded-full"
                            src={user.userImage as string}
                            alt={`${user.username} image`}
                            width={40}
                            height={40}
                          />
                          <div className="ps-3">
                            <h1 className="text-base font-semibold">
                              {user.username}
                            </h1>
                          </div>
                        </th>
                        <td className="px-10 py-4 text-center">
                          <h1>{totalScore}</h1>
                        </td>
                        <td className="px-10 py-4 text-center">
                          <h1>{highestLevelCount}</h1>
                        </td>
                        <td className="px-10 py-4 text-center">
                          <h1>{hintUsed}</h1>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
