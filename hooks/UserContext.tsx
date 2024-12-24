import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAccount, useChainId } from "wagmi";

interface IUserContext {
  profile: any | null;
  setProfile: any | null;
  fetchUserProfile: () => Promise<void>;
}

const defaultValue: IUserContext = {
  profile: null,
  setProfile: null,
  fetchUserProfile: async () => {},
};

const UserContext = createContext<IUserContext>(defaultValue);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address } = useAccount();
  const [profile, setProfile] = useState<any | null>(null);

  const chainId = useChainId();

  const fetchUserProfile = useCallback(async () => {
    if (address) {
      const response = await fetch(
        `/api/userProfile?walletAddress=${address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chainId }),
        }
      );
      const data = await response.json();
      if (data && data.profile) {
        setProfile(data.profile);
      }
    }
  }, [address, chainId]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <UserContext.Provider value={{ profile, fetchUserProfile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
