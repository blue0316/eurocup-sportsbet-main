import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useDisconnect,
  useSendTransaction,
  useChainId,
  useSignMessage,
} from "wagmi";
import { useUser } from "./UserContext";

export const useUserAccount = () => {
  const { address, isConnected } = useAccount();
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const { disconnect } = useDisconnect();
  const [username, setUsername] = useState("");
  const [profileExists, setProfileExists] = useState(false);
  const [message, setMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const { data: txHash, sendTransactionAsync } = useSendTransaction();
  const chainId = useChainId();

  const { profile, setProfile } = useUser();
  const { signMessageAsync } = useSignMessage({});

  const fetchUserProfile = useCallback(async () => {
    try {
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
      if (data.success) {
        setProfile(data.data);
        setProfileExists(true);
      } else {
        setProfileExists(false);
        setProfile(null);
        console.log("Error fetching user profile or User not Found");
      }
    } catch (error) {
      console.log("Error fetching user profile");
    }
  }, [address, chainId, setProfile]);

  const createProfile = useCallback(async () => {
    if (!profileExists) {
      if (!username) {
        setMessage("Username is required");
        return;
      }

      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            walletAddress: address,
            chainId: chainId,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setMessage("Profile created successfully!");
          setTimeout(() => {
            setIsFetching(false);
          }, 5000);
          await fetchUserProfile();
        } else {
          console.log(data.message || "Error creating profile or not found");
        }
      } catch (error) {
        console.log("Error creating profile");
      }
    }
  }, [address, chainId, fetchUserProfile, profileExists, username]);

  const sendDepositTransaction = useCallback(
    async (
      amount: string,
      tokenAddress: `0x${string}`,
      cashierAddress: `0x${string}`
    ) => {
      try {
        const tokenAbi = [
          "function transfer(address to, uint256 amount) public returns (bool)",
        ];
        const iface = new ethers.Interface(tokenAbi);

        const data = iface.encodeFunctionData("transfer", [
          cashierAddress,
          ethers.parseUnits(amount, 18),
        ]);

        const tx = await sendTransactionAsync(
          {
            to: tokenAddress,
            data: data as `0x${string}`,
          },
          {
            onSuccess: (data) => {
              console.log("Transaction successful:", data);
              setMessage("Transaction in progress...");
              return data;
            },
            onError: (error) => {
              console.error("Error during transaction:", error);
              setMessage("Error during transaction.");
              return error;
            },
            onSettled: () => {
              console.log("Transaction settled.");
              setMessage("Successful transaction and deposit in progress...");
            },
          }
        );

        return tx;
      } catch (error) {
        console.error("Error sending transaction:", error);
        setMessage("Error sending transaction.");

        throw error;
      }
    },
    [sendTransactionAsync]
  );

  const depositFunds = useCallback(async () => {
    if (Number(depositAmount) <= 0) {
      setMessage("Amount is required and should be greater than zero");
      return;
    }

    if (Number(depositAmount) < 25) {
      return setMessage("Deposit amount must be at least 25.");
    }

    try {
      const amount = depositAmount.toString();
      const tokenAddress = "0xd4FDAc1B8c96ffB8A494254D1Bc5b94d7735684e"; // Harco Test
      const cashierAddress = "0x1Cb2A40a6d4E4eD621321C13e0869Cca25C82F31"; // Harco Test
      const messageVerify = "Deposit funds!";

      setMessage("Transaction deposit init in progress...");

      const signature = await signMessageAsync({
        message: messageVerify,
      });

      const token = btoa(`${address}:${signature}`);

      const responseVerify = await fetch("/api/verifySignature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageVerify }),
      });

      const dataVerify = await responseVerify.json();

      if (!dataVerify.verified) {
        setMessage("Signature verification failed.");
        return;
      }

      const transactionHash = await sendDepositTransaction(
        amount,
        tokenAddress,
        cashierAddress
      );

      if (!transactionHash) {
        setMessage("Error sending deposit transaction");
        return;
      }

      const response = await fetch("/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: depositAmount,
          walletAddress: address,
          chainId: chainId,
          transactionHash: transactionHash,
          message: messageVerify,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchUserProfile();
        setMessage("Deposit successful!");
        setTimeout(() => {
          setIsFetching(false);
        }, 5000);
      } else {
        setMessage(data.message || "Error making deposit");
      }
    } catch (error) {
      console.error("Error making deposit:", error);
      setMessage("Error making deposit");
    }
  }, [
    address,
    chainId,
    depositAmount,
    fetchUserProfile,
    sendDepositTransaction,
    signMessageAsync,
  ]);

  const sendWithdrawTransaction = useCallback(
    async (
      walletAddress: any,
      amount: any,
      signature: any,
      cashierAddress: any
    ) => {
      try {
        const iface = new ethers.Interface([
          "function withdraw(address _sourceToken, uint256 _amount, bytes _signature) public",
        ]);
        const data = iface.encodeFunctionData("withdraw", [
          walletAddress,
          ethers.parseUnits(amount.toString(), 18),
          signature,
        ]);

        const tx = await sendTransactionAsync(
          {
            to: cashierAddress,
            data: data as `0x${string}`,
          },
          {
            onSuccess: (data) => {
              console.log("Transaction successful:", data);
              setMessage("Transaction in progress...");
              return data;
            },
            onError: (error) => {
              console.error("Error during transaction:", error);
              setMessage("Error during transaction.");
              return error;
            },
            onSettled: () => {
              console.log("Transaction settled.");
              setMessage("Successful transaction and withdraw in progress...");
            },
          }
        );

        return tx;
      } catch (error) {
        setMessage("Error sending transaction.");
      }
    },
    [sendTransactionAsync]
  );

  const withdrawFunds = useCallback(async () => {
    if (Number(withdrawAmount) <= 0) {
      setMessage("Amount is required and should be greater than zero");
      return;
    }

    if (Number(withdrawAmount) < 25) {
      return setMessage("Withdraw amount must be at least 25.");
    }

    try {
      const messageVerify = "Withdraw funds!";

      setMessage("Transaction withdraw init in progress...");

      const signature = await signMessageAsync({
        message: messageVerify,
      });

      const token = btoa(`${address}:${signature}`);

      const responseVerify = await fetch("/api/verifySignature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageVerify }),
      });

      const dataVerify = await responseVerify.json();

      if (!dataVerify.verified) {
        setMessage("Signature verification failed.");
        return;
      }

      const response = await fetch("/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(withdrawAmount),
          walletAddress: address,
          chainId: chainId,
          message: messageVerify,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Look");
        const { walletAddress, amount, signature, cashierAddress } = data.data;

        await sendWithdrawTransaction(
          walletAddress,
          amount,
          signature,
          cashierAddress
        );

        setMessage("Withdrawal successful!");
        setTimeout(() => {
          setIsFetching(false);
        }, 5000);
        await fetchUserProfile();
      } else {
        setMessage(data.message || "Error making withdrawal");
      }
    } catch (error) {
      console.log("Error making withdrawal");
    }
  }, [
    address,
    chainId,
    fetchUserProfile,
    sendWithdrawTransaction,
    signMessageAsync,
    withdrawAmount,
  ]);

  useEffect(() => {
    if (isConnected) {
      fetchUserProfile();
    }
  }, [isConnected, address, fetchUserProfile]);

  return {
    address,
    isConnected,
    disconnect,
    username,
    setUsername,
    profile,
    profileExists,
    setProfileExists,
    message,
    setMessage,
    isFetching,
    setIsFetching,
    createProfile,
    depositFunds,
    depositAmount,
    setDepositAmount,
    withdrawAmount,
    withdrawFunds,
    setWithdrawAmount,
    fetchUserProfile,
  };
};
