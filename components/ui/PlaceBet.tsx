/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";

const InputField: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value ?? ""}
      defaultValue={""}
      onChange={onChange}
      min={0}
      className="py-2 px-2 text-xl bg-transparent contrast-more:placeholder-slate-500 border-none outline-none text-white w-full text-center"
    />
  );
};

const Button: React.FC<{
  onClick: () => void;
  text: string;
  color: string;
}> = ({ onClick, text, color }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white px-6 py-2 rounded-lg shadow-md hover:${color.replace(
        "bg-",
        "hover:bg-"
      )} focus:outline-none focus:ring-2 focus:ring-${color.replace(
        "bg-",
        ""
      )} w-full mt-4`}
    >
      {text}
    </button>
  );
};

export const PlaceBet: React.FC<{
  price: any;
  messageGame: string;
  selectedGameCardId: string;
  gameCards: {
    _id: string;
    event: string;
    team1: { name: string };
    team2: { name: string };
  }[];
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  placeBet: any;
  address: string;
  index: number;
}> = ({
  price,
  messageGame,
  selectedGameCardId,
  gameCards,
  betAmount,
  setBetAmount,
  placeBet,
  address,
  index,
}) => {
  const [messageBet, setMessageBet] = useState("");
  const [priceAmount, setPriceAmount] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setInputAmount(value);
    let prices = price?.toString();
    let calculateTotal = Number(value) / Number(prices);
    let fixedCalculateTotal = calculateTotal.toFixed(0);
    // console.log("Total entre valor / prices: ", fixedCalculateTotal);
    setBetAmount(Number(fixedCalculateTotal));
    setPriceAmount(fixedCalculateTotal.toString());

    if (Number(value) < 25) {
      setErrorMessage("The minimum bet amount is $25.");
    } else {
      setErrorMessage("");
    }
  };

  const handleBetClick = () => {
    if (Number(inputAmount) >= 25) {
      placeBet(address)
        .then((e: any) => {
          e?.success
            ? setMessageBet("Bet placed successfully!")
            : setMessageBet(e?.message);
        })
        .catch((error: any) => {
          setErrorMessage("Error placing bet: " + error?.message);
        });
    } else {
      setErrorMessage("The minimum bet amount is $25.");
    }
  };

  const selectedGameCard = gameCards.find(
    (gameCard) => gameCard._id === selectedGameCardId
  );
  const team1Name = selectedGameCard?.team1.name || "";
  const team2Name = selectedGameCard?.team2.name || "";

  const totalPriceUsdt = Number(betAmount) * price;
  const totalEci = totalPriceUsdt;

  return (
    <>
      {messageBet === "Bet placed successfully!" ? (
        <div className="p-4 px-6 flex flex-col bg-[#2d50dd] items-center md:min-h-[217px]">
          <p className="text-white text-center text-lg mt-4">{messageBet}</p>
          <img src="/images/checkmark.png" className="w-12 my-4" alt="" />
          <Link href="/app/stats">
            <button className="text-white text-center text-lg mt-4">
              View Stats
            </button>
          </Link>
        </div>
      ) : (
        <div className="p-4 px-6 flex flex-col items-center md:min-h-[217px]">
          <p className="text-white text-center text-lg">
            Place your bet amount in $
          </p>
          <div className="w-[172px] rounded-full border-2 border-white flex justify-center items-center px-2 mt-1">
            <InputField
              value={inputAmount.toString()}
              onChange={handleAmountChange}
              placeholder="$123"
            />
          </div>
          <p className="text-white text-center text-base mt-2">
            Amount to deposit
          </p>
          {priceAmount && (
            <p className="text-white text-center text-base mt-2 flex items-center justify-center">
              <span>{priceAmount}</span>
              <img
                src="/images/input-bg.svg"
                alt="Token Logo"
                className="w-5 h-5 ml-2"
              />{" "}
              $ECI
            </p>
          )}
          {errorMessage && (
            <p className="text-yellow-500 text-center text-base mt-2">
              {errorMessage}
            </p>
          )}

          {messageBet && (
            <p className="text-yellow-500 text-center text-base mt-2">
              {messageBet}
            </p>
          )}
          <Button
            onClick={handleBetClick}
            text="Bet"
            color="bg-[url('/images/deposit-button-bg.png')]"
          />
        </div>
      )}
    </>
  );
};
