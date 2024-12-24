/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserAccount } from "@hooks/useUserAccount";
import { useTokenPrice } from "@hooks/TokenPriceContext";
import { PlaceBet } from "./PlaceBet";

const calculateCountdown = (date: string, time: string) => {
  const matchDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
  const now = moment();
  const duration = moment.duration(matchDateTime.diff(now));

  const days = Math.max(Math.floor(duration.asDays()), 0);
  const hours = Math.max(duration.hours(), 0);
  const minutes = Math.max(duration.minutes(), 0);
  const seconds = Math.max(duration.seconds(), 0);

  return { days, hours, minutes, seconds };
};

export const GameCard = ({
  bets,
  messageGame,
  selectedGameCardId,
  setSelectedGameCardId,
  gameCards,
  betAmount,
  setBetAmount,
  setBetResult,
  placeBet,
  address,
  gameCard,
  index,
}: any) => {
  const [matches, setMatches] = useState(gameCard);

  const { isConnected } = useUserAccount();
  const { price, error } = useTokenPrice();
  const [countdown, setCountdown] = useState(
    calculateCountdown(gameCard?.date, gameCard?.time)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(gameCard?.date, gameCard?.time));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameCard?.date, gameCard?.time]);

  const isCountdownVisible =
    countdown?.days > 0 ||
    countdown?.hours > 0 ||
    countdown?.minutes > 0 ||
    countdown?.seconds > 0;

  return (
    <div className="transform hover:scale-105 transition-transform duration-30">
      <div className="flex items-center p-4 px-6 bg-[#5672e5] justify-between">
        <div className="flex flex-col items-center">
          <div
            className="h-14 w-14 rouned-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(" + `/flags/${gameCard?.team1?.flag}` + ")",
            }}
          />
          <span className="text-sm text-white">{gameCard?.team1?.name}</span>
        </div>
        <span className="text-white text-3xl">Vs</span>
        <div className="flex flex-col items-center">
          <div
            className="h-14 w-14 rouned-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(" + `/flags/${gameCard?.team2?.flag}` + ")",
            }}
          />
          <span className="text-sm text-white">{gameCard?.team2?.name}</span>
        </div>
      </div>
      <h1 className="bg-white h-1" />
      {gameCard._id === selectedGameCardId && isConnected ? (
        <PlaceBet
          price={price}
          messageGame={messageGame}
          selectedGameCardId={selectedGameCardId}
          //setSelectedGameCardId={setSelectedGameCardId}
          gameCards={gameCards}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          //etBetResult={setBetResult}
          placeBet={placeBet}
          address={address}
          index={index}
        />
      ) : (
        <div className="p-4 px-6 bg-[#2d50dd] flex flex-col items-center md:min-h-[217px]">
          <p className="text-white text-center text-lg">{gameCard.text}</p>
          <button
            onClick={() => {
              let _matches = gameCard.team1;
              _matches = true;
              setMatches(_matches);
              setSelectedGameCardId(gameCard._id);
              setBetResult(gameCard.team1.name);
            }}
            className="rounded-full border-2 border-white text-white text-xl px-4 py-2 mt-3 md:min-w-[147px]"
            disabled={gameCard.result ? true : false}
          >
            {gameCard?.team1?.name}
          </button>
          <button
            onClick={() => {
              let _matches = gameCard.team2;
              _matches = true;
              setMatches(_matches);
              setSelectedGameCardId(gameCard._id);
              setBetResult(gameCard.team2.name);
            }}
            className="rounded-full border-2 border-white text-white text-xl px-4 py-2 mt-3 md:min-w-[147px]"
            disabled={gameCard.result ? true : false}
          >
            {gameCard?.team2?.name}
          </button>
          <p
            className={`text-white text-center text-base mt-4 ${
              gameCard.result !== null ? "block" : "hidden"
            }`}
          >
            Result: {gameCard.result}
          </p>
          <p
            className={`text-white text-center text-base mt-4 ${
              isCountdownVisible && !gameCard.result ? "block" : "hidden"
            }`}
          >
            Bets close in: {countdown.days}d {countdown.hours}h{" "}
            {countdown.minutes}m {""}
            {countdown.seconds}s
          </p>
        </div>
      )}
    </div>
  );
};
