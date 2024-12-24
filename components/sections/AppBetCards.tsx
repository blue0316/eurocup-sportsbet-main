/* eslint-disable @next/next/no-img-element */
import { GameCard } from "@components/ui/GameCard";

export const AppBetCards = ({
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
}: any) => {
  //   console.log("gameCards: ", gameCards);

  return (
    <div className="grid px-4 xl:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 container mx-auto mt-24">
      {gameCards?.map((gameCardItem: any) => (
        <GameCard
          bets={bets}
          messageGame={messageGame}
          key={gameCardItem._id}
          gameCard={gameCardItem}
          selectedGameCardId={selectedGameCardId}
          setSelectedGameCardId={setSelectedGameCardId}
          gameCards={gameCards}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          setBetResult={setBetResult}
          placeBet={placeBet}
          address={address}
        />
      ))}
    </div>
  );
};
