import { Layout, Notification, Sections } from "@components";
import { useUserAccount } from "@hooks/useUserAccount";
import { useUser } from "@hooks/UserContext";
import { useTokenPrice } from "@hooks/TokenPriceContext";
import { GetServerSideProps } from "next";

export default function AppProfile({ adminAddresses }: any) {
  const { profile } = useUser();
  const { price, error } = useTokenPrice();
  const {
    address,
    isConnected,
    username,
    setUsername,
    profileExists,
    message,
    createProfile,
    depositFunds,
    depositAmount,
    setDepositAmount,
    withdrawAmount,
    withdrawFunds,
    setWithdrawAmount,
    fetchUserProfile,
    isFetching,
    setIsFetching,
  } = useUserAccount();

  return (
    <Layout>
      <Sections.AppHeader />
      <Sections.AppHero />
      <Sections.AppNavigation adminAddresses={adminAddresses} />
      {isConnected && (
        <Sections.AppProfileTable
          price={price}
          profile={profile}
          depositAmount={depositAmount}
          setDepositAmount={setDepositAmount}
          depositFunds={depositFunds}
          username={username}
          setUsername={setUsername}
          createProfile={createProfile}
          withdrawAmount={withdrawAmount}
          setWithdrawAmount={setWithdrawAmount}
          withdrawFunds={withdrawFunds}
        />
      )}
      {isConnected && (
        <Notification
          message={message}
          isFetching={isFetching}
          setIsFetching={setIsFetching}
        />
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
