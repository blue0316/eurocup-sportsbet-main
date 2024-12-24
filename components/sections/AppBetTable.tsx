import React from "react";

export type GameCard = {
  _id: string;
  event: string;
  team1: {
    name: string;
    flag: string;
  };
  team2: {
    name: string;
    flag: string;
  };
  status: "OPEN" | "LOCKED" | "RESULT";
  bets: Array<{
    user: string;
    amount: number;
    team: "team1" | "team2";
  }>;
  result: "team1" | "team2" | null;
};

export type Profile = {
  user: {
    username: string;
    walletAddress: string;
    tokenUnlocked: number;
    tokenLocked: number;
  };
  gameCards: GameCard[];
};

interface AppBetTableProps {
  results: GameCard[];
}

export const AppBetTable: React.FC<AppBetTableProps> = ({ results }) => {
  return (
    <div className="max-w-[893px] mx-auto mt-12">
      <div className="items-center py-4 justify-between hidden md:flex">
        <div className="w-[25%] pl-6">
          <span className="font-semibold text-white text-xl">Game</span>
        </div>
        <div className="w-[18%]">
          <span className="font-semibold text-white text-xl">Bet</span>
        </div>
        <div className="w-[20%]">
          <span className="font-semibold text-white text-xl">Payout</span>
        </div>
        <div className="w-[18%]">
          <span className="font-semibold text-white text-xl">Result</span>
        </div>
        <div className="w-[18%]">
          <span className="font-semibold text-white text-xl">Team</span>
        </div>
      </div>

      {results?.length === 0 ? (
        <div className="text-center py-4 text-white">
          No betting history available.
        </div>
      ) : (
        results?.map((result) => (
          <div key={result._id} className="">
            <div className="text-white rounded mt-2">
              {result.bets.map((bet, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center px-4 md:px-0 py-4 justify-between bg-[#2c4fde] rounded mb-4 last:mb-0 transform hover:scale-105 transition-transform duration-300 w-11/12 mx-auto md:w-full"
                >
                  <div className="w-full md:w-[25%] md:pl-6 flex flex-col mb-4 md:mb-0">
                    <span className="text-white text-xl font-bold md:hidden">
                      Game
                    </span>
                    <span className="text-white text-base">{`${result.team1.name} Vs ${result.team2.name}`}</span>
                  </div>

                  <div className="w-full md:w-[18%] flex flex-col mb-4 md:mb-0">
                    <span className="text-white text-xl font-bold md:hidden">
                      Bet Size
                    </span>
                    <span className="text-white text-base">{`$${bet.amount}`}</span>
                  </div>

                  <div className="w-full md:w-[20%] flex flex-col mb-4 md:mb-0">
                    <span className="text-white text-xl font-bold md:hidden">
                      Payout
                    </span>
                    <span className="text-white text-base">{``}</span>
                  </div>
                  <div className="w-full md:w-[18%] flex flex-col mb-4 md:mb-0">
                    <span className="text-white text-xl font-bold md:hidden">
                      Result
                    </span>
                    <span className="text-white text-base">
                      {result.result === null ? "Pending" : result.result}
                    </span>
                  </div>

                  <div className="w-full md:w-[18%] flex flex-col mb-4 md:mb-0">
                    <span className="text-white text-xl font-bold md:hidden">
                      Team
                    </span>
                    <span className="text-white text-base">{` ${bet.team}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppBetTable;
