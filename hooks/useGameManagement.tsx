import { useState, useCallback, useEffect } from "react";
import { useChainId, useAccount, useConfig } from "wagmi";
import flags from "../mocks/flags.json";
import { useUser } from "./UserContext";

export const useGameManagement = () => {
  const { address, isConnected } = useAccount();

  const [newGameEvent, setNewGameEvent] = useState<string>("");
  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const [team1Flag, setTeam1Flag] = useState<string>("");
  const [team2Flag, setTeam2Flag] = useState<string>("");
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [selectedGameCard, setSelectedGameCard] = useState<any | null>(null);
  const [selectedGameCardId, setSelectedGameCardId] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [bets, setBets] = useState<any[]>([]);
  const [betResult, setBetResult] = useState<string | null>(null);
  const [messageGame, setMessage] = useState<string>("");
  const [closeResult, setCloseResult] = useState<string | "draw" | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [profileExists, setProfileExists] = useState(false);

  const [gameDate, setGameDate] = useState("");
  const [gameTime, setGameTime] = useState("");
  const [venue, setVenue] = useState("");

  const chainId = useChainId();

  const { profile, setProfile } = useUser();

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
        setMessage("Error fetching user profile or User not Found");
      }
    } catch (error) {
      setMessage("Error fetching user profile");
    }
  }, [address, chainId, setProfile]);

  const fetchGameCards = useCallback(async () => {
    try {
      const response = await fetch("/api/gameCard");
      const data = await response.json();
      data.success
        ? setGameCards(data.data)
        : console.log("Error fetching game cards");
    } catch (error) {
      console.log("Error fetching game cards");
    }
  }, []);

  const fetchBets = useCallback(async () => {
    try {
      const response = await fetch("/api/bets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chainId: chainId }),
      });
      const data = await response.json();

      data.success ? setBets(data.data) : console.log("Error fetching bets");
    } catch (error) {
      console.log("Error fetching bets");
    }
  }, [chainId]);

  const createGameCard = async () => {
    const flag: any = flags;

    if (
      !newGameEvent ||
      !team1 ||
      !team2 ||
      !team1Flag ||
      !team2Flag ||
      !gameDate
    ) {
      setMessage("Event, Team 1, Team 2, and their flags are required");
      return;
    }

    try {
      console.log("gameDate 00: ", gameDate);
      const response = await fetch("/api/gameCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: newGameEvent,
          team1: { name: team1, flag: flag.flags[team1Flag] },
          team2: { name: team2, flag: flag.flags[team2Flag] },
          date: gameDate,
          time: gameTime,
          venue: venue,
          chainId: chainId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Game card created successfully");
        await fetchGameCards();
        await fetchResults();
        await fetchBets();
        await fetchUserProfile();
      } else {
        setMessage(data.message || "Error creating game card");
      }
    } catch (error) {
      setMessage("Error creating game card");
    }
  };

  const placeBet = async (address: string) => {
    if (!selectedGameCardId || betAmount <= 0 || !betResult) {
      setMessage("Game card, bet amount, and team selection are required");
      return;
    }

    const selectedGameCard = gameCards.find(
      (card) => card._id === selectedGameCardId
    );
    if (!selectedGameCard) {
      setMessage("Selected game card not found");
      return;
    }
    if (selectedGameCard.status !== "OPEN") {
      setMessage("Cannot place bet on a closed game");
      return;
    }

    try {
      const response = await fetch("/api/bet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          gameCardId: selectedGameCardId,
          amount: betAmount,
          team: betResult,
          chainId: chainId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Bet placed successfully!");
        await fetchGameCards();
        await fetchResults();
        await fetchBets();
        await fetchUserProfile();
        return data;
      } else {
        console.log("DATA");
        setMessage(data.message || "Error placing bet");
        return data;
      }
    } catch (error) {
      setMessage("Error placing bet");
    }
  };

  const closeGameCard = async () => {
    if (!selectedGameCardId) {
      setMessage("Game card is required");
      return;
    }

    const selectedGameCard = gameCards.find(
      (card) => card._id === selectedGameCardId
    );
    if (!selectedGameCard) {
      setMessage("Selected game card not found");
      return;
    }

    const selectedResult = closeResult;

    try {
      const response = await fetch("/api/closeGameCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameCardId: selectedGameCardId,
          result: selectedResult,
          chainId: chainId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Game card closed successfully!");
        //await fetchResults();
        await fetchUserProfile();
      } else {
        setMessage(data.message || "Error closing game card");
      }
      fetchGameCards();
    } catch (error) {
      setMessage("Error closing game card");
    }
  };

  const fetchResults = useCallback(async () => {
    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chainId: chainId }),
      });
      const data = await response.json();
      data.success ? setResults(data.data) : console.log(data.message);
    } catch (error) {
      console.log("Error fetching results");
    }
  }, [chainId]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chainId: chainId }),
      });
      const data = await response.json();
      data.success ? setUsers(data.data) : console.log("Error fetching users");
    } catch (error) {
      console.log("Error fetching users");
    }
  }, [chainId]);

  useEffect(() => {
    if (isConnected) {
      fetchUsers();
    }
  }, [isConnected, address, fetchUsers]);

  return {
    gameCards,
    setGameCards,
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
    setResults,
    setBetResult,
    betAmount,
    setBetAmount,
    bets,
    setBets,
    fetchGameCards,
    fetchBets,
    selectedGameCardId,
    setSelectedGameCardId,
    createGameCard,
    placeBet,
    closeGameCard,
    fetchResults,
    users,
    fetchUsers,
    messageGame,
    setCloseResult,
  };
};
