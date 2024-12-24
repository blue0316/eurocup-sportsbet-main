import { Layout, Sections } from "@components";
import { GetServerSideProps } from "next";
export default function AppLeaderboard({ adminAddresses }: any) {
  return (
    <Layout>
      <Sections.AppHeader />
      <Sections.AppHero />
      <Sections.AppNavigation adminAddresses={adminAddresses} />
      <Sections.AppLeaderBoardTable />
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
