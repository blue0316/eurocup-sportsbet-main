import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export const AppNavigation = ({ adminAddresses }: any) => {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const isAdmin = adminAddresses?.includes(address as string);

  const returnActiveLink = (val: string) => {
    return router.pathname.indexOf(val) !== -1;
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <Link
        href="/app/matches"
        className={`${
          returnActiveLink("match") ? "underline" : ""
        } font-bold text-sm md:text-[44px] text-white`}
      >
        Matches
      </Link>
      {isConnected && (
        <div className="h-8 md:h-12 w-[2px] bg-white mx-4 md:mx-12" />
      )}
      {isConnected && (
        <Link
          href="/app/stats"
          className={`${
            returnActiveLink("stats") ? "underline" : ""
          } font-bold text-sm md:text-[44px] text-white`}
        >
          Stats
        </Link>
      )}
      {isConnected && (
        <div className="h-8 md:h-12 w-[2px] bg-white mx-4 md:mx-12" />
      )}
      {isConnected && (
        <Link
          href="/app/profile"
          className={`${
            returnActiveLink("profile") ? "underline" : ""
          } font-bold text-sm md:text-[44px] text-white`}
        >
          Profile
        </Link>
      )}
      <div className="h-8 md:h-12 w-[2px] bg-white mx-4 md:mx-12" />
      <Link
        href="/app/leaderboard"
        className={`${
          returnActiveLink("leaderboard") ? "underline" : ""
        } font-bold text-sm md:text-[44px] text-white`}
      >
        Leaderboard
      </Link>
      {isConnected && isAdmin && (
        <div className="h-8 md:h-12 w-[2px] bg-white mx-4 md:mx-12" />
      )}
      {isConnected && isAdmin && (
        <Link
          href="/app/admin"
          className={`${
            returnActiveLink("admin") ? "underline" : ""
          } font-bold text-sm md:text-[44px] text-white`}
        >
          Admin
        </Link>
      )}
    </div>
  );
};
