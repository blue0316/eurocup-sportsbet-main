import { Layout, Sections } from "@components";
import { useGameManagement } from "@hooks/useGameManagement";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function AppLeaderboard({ adminAddresses }: any) {
  const { address } = useAccount();
  const { isConnected } = useAccount();

  const isAddressAdmin = adminAddresses.includes(address);

  const {
    gameCards,
    newGameEvent,
    setNewGameEvent,
    team1,
    setTeam1,
    team2,
    setTeam2,
    team1Flag,
    setTeam1Flag,
    team2Flag,
    setTeam2Flag,
    gameDate,
    setGameDate,
    venue,
    setVenue,
    gameTime,
    setGameTime,
    selectedGameCard,
    setSelectedGameCard,
    results,
    setBetResult,
    betAmount,
    setBetAmount,
    bets,
    fetchGameCards,
    fetchBets,
    selectedGameCardId,
    setSelectedGameCardId,
    createGameCard,
    placeBet,
    messageGame,
    closeGameCard,
    fetchResults,
    users,
    fetchUsers,
    setCloseResult,
  } = useGameManagement();

  useEffect(() => {
    if (isConnected) {
      fetchGameCards();
      //   fetchResults();
      fetchUsers();
      fetchBets();
    }
  }, [fetchGameCards, fetchBets, fetchUsers, isConnected]);

  useEffect(() => {
    const selectedCard = gameCards.find(
      (gameCard) => gameCard._id === selectedGameCardId
    );
    setSelectedGameCard(selectedCard || null);
  }, [selectedGameCardId, gameCards, setSelectedGameCard]);

  return (
    <Layout>
      <Sections.AppHeader />
      <Sections.AppHero />
      <Sections.AppNavigation adminAddresses={adminAddresses} />
      {isAddressAdmin ? (
        <Sections.AppAdminPanel
          messageGame={messageGame}
          fetchGameCards={fetchGameCards}
          newGameEvent={newGameEvent}
          setNewGameEvent={setNewGameEvent}
          setTeam1Flag={setTeam1Flag}
          team1Flag={team1Flag}
          team1={team1}
          setTeam1={setTeam1}
          setTeam2Flag={setTeam2Flag}
          team2Flag={team2Flag}
          team2={team2}
          setTeam2={setTeam2}
          gameDate={gameDate}
          setGameDate={setGameDate}
          venue={venue}
          setVenue={setVenue}
          gameTime={gameTime}
          setGameTime={setGameTime}
          createGameCard={createGameCard}
          selectedGameCardId={selectedGameCardId}
          setSelectedGameCardId={setSelectedGameCardId}
          gameCards={gameCards}
          setCloseResult={setCloseResult}
          selectedGameCard={selectedGameCard}
          closeGameCard={closeGameCard}
        />
      ) : (
        <></>
      )}
      <Sections.AppCoins />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const adminAddresses = process.env.ADMIN_ADDRESSES?.split(",") ?? [];
  console.log(adminAddresses);
  return {
    props: {
      adminAddresses,
    },
  };
};
