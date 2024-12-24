import { Layout, Sections } from "@components";
import { useUser } from "@hooks/UserContext";
import { useUserAccount } from "@hooks/useUserAccount";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export default function AppStats({ adminAddresses }: any) {
  const { profile, fetchUserProfile } = useUser();
  const [loading, setLoading] = useState(true);

  const { isConnected } = useUserAccount();

  useEffect(() => {
    const loadProfile = async () => {
      await fetchUserProfile();
      setLoading(false);
    };

    loadProfile();
  }, [fetchUserProfile]);

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
      {profile && isConnected && (
        <Sections.AppBetTable results={profile?.gameCards} />
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
