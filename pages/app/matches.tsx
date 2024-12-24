import { Layout, Sections } from "@components";
import { useGameManagement } from "@hooks/useGameManagement";
import { useUserAccount } from "@hooks/useUserAccount";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export default function AppMatch({ adminAddresses }: any) {
  const [loading, setLoading] = useState(true);

  const {
    gameCards,
    // newGameEvent,
    // setNewGameEvent,
    // team1,
    // setTeam1,
    // team2,
    // setTeam2,
    // team1Flag,
    // setTeam1Flag,
    // team2Flag,
    // setTeam2Flag,
    // gameDate,
    // setGameDate,
    // gameTime,
    // setGameTime,
    // selectedGameCard,
    // setSelectedGameCard,
    // results,
    setBetResult,
    betAmount,
    setBetAmount,
    bets,
    fetchGameCards,
    //fetchBets,
    selectedGameCardId,
    setSelectedGameCardId,
    //createGameCard,
    placeBet,
    messageGame,
    // closeGameCard,
    // fetchResults,
    // users,
    // fetchUsers,
    // setCloseResult,
  } = useGameManagement();

  const { isConnected, address } = useUserAccount();

  useEffect(() => {
    //if (isConnected) {
    fetchGameCards();
    //fetchResults();
    // fetchUsers();
    // fetchBets();
    // fetchUserProfile();
    //}
  }, [
    //isConnected,
    fetchGameCards,
    // fetchResults,
    // fetchBets,
    // isConnected,
    // fetchUsers,
    // fetchUserProfile,
  ]);

  useEffect(() => {
    const loadGameCards = async () => {
      await fetchGameCards();
      setLoading(false);
    };

    loadGameCards();
  }, [fetchGameCards]);

  if (loading) {
    return (
      <Layout>
        <Sections.AppHeader />
        <Sections.AppHero />
        <Sections.AppNavigation />
        <div className="text-center py-4 text-white">Loading...</div>
        <Sections.AppCoins />
      </Layout>
    );
  }

  return (
    <Layout>
      <Sections.AppHeader />
      <Sections.AppHero />
      <Sections.AppNavigation adminAddresses={adminAddresses} />
      <Sections.AppBetCards
        bets={bets}
        messageGame={messageGame}
        selectedGameCardId={selectedGameCardId}
        setSelectedGameCardId={setSelectedGameCardId}
        gameCards={gameCards}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        setBetResult={setBetResult}
        placeBet={placeBet}
        address={address}
      />
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
