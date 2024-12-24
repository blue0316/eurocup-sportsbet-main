import { useState } from "react";

const SelectField: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  options: { value: string; label: string; hidden?: boolean }[];
}> = ({ onChange, value, options }) => {
  return (
    <select
      onChange={onChange}
      value={value}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value} hidden={option.hidden}>
          {option.label}
        </option>
      ))}
    </select>
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
      )} w-full`}
    >
      {text}
    </button>
  );
};

export const CloseGameCard: React.FC<{
  selectedGameCardId: string;
  setSelectedGameCardId: React.Dispatch<React.SetStateAction<string>>;
  gameCards: {
    _id: string;
    event: string;
    team1: { name: string };
    team2: { name: string };
  }[];
  setCloseResult: React.Dispatch<React.SetStateAction<string | null>>;
  selectedGameCard:
    | {
        team1: { name: string };
        team2: { name: string };
      }
    | undefined;
  closeGameCard: () => void;
}> = ({
  selectedGameCardId,
  setSelectedGameCardId,
  gameCards,
  setCloseResult,
  selectedGameCard,
  closeGameCard,
}) => {
  const [messageClose, setMessageClose] = useState("");
  const handleGameCardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGameCardId(e.target.value);
  };

  const handleResultChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGameCard = gameCards.find(
      (gameCard) => gameCard._id === selectedGameCardId
    );
    const selectedTeam =
      e.target.value === "team1"
        ? selectedGameCard?.team1.name
        : selectedGameCard?.team2.name;
    setCloseResult(selectedTeam || null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-bold mb-4">Close Game Card</h2>
      <div className="flex flex-col items-center space-y-4">
        <SelectField
          onChange={handleGameCardChange}
          value={selectedGameCardId}
          options={[
            { value: "", label: "Select Game Card" },
            ...gameCards.map((gameCard) => ({
              value: gameCard._id,
              label: `${gameCard.event} - ${gameCard.team1.name} vs ${gameCard.team2.name}`,
            })),
          ]}
        />
        <SelectField
          onChange={handleResultChange}
          options={[
            { value: "", label: "Select Result" },
            {
              value: "team1",
              label: selectedGameCard?.team1.name || "Team 1",
              hidden: !selectedGameCard,
            },
            {
              value: "team2",
              label: selectedGameCard?.team2.name || "Team 2",
              hidden: !selectedGameCard,
            },
            { value: "draw", label: "Draw", hidden: !selectedGameCard },
          ]}
        />
        <Button
          onClick={() => {
            closeGameCard();
            setMessageClose("Game Closed!");
          }}
          text="Close Game Card"
          color="bg-red-500"
        />

        <p className="text-black text-center">{messageClose}</p>
      </div>
    </div>
  );
};
