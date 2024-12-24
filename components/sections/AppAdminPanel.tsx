import { CloseGameCard } from "@components/ui/CloseGameCard";
import Dropdown from "@components/ui/Dropdown";
import ImportMatches from "@components/ui/ImportMatchs";

export const AppAdminPanel = ({
  messageGame,
  fetchGameCards,
  newGameEvent,
  setNewGameEvent,
  setTeam1Flag,
  team1Flag,
  team1,
  setTeam1,
  setTeam2Flag,
  team2Flag,
  team2,
  setTeam2,
  gameDate,
  setGameDate,
  venue,
  setVenue,
  gameTime,
  setGameTime,
  createGameCard,
  selectedGameCardId,
  setSelectedGameCardId,
  gameCards,
  setCloseResult,
  selectedGameCard,
  closeGameCard,
}: any) => {
  return (
    <div className="container  mx-auto p-4 mt-24 mb-24 border-dashed border-2 border-indigo-600 sm:p-6 md:p-8">
      <div className="grid px-4 xl:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 container mx-auto">
        <ImportMatches onImport={fetchGameCards} />
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <h2 className="text-2xl font-bold mb-4">Create Game Card</h2>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Enter event name"
              value={newGameEvent}
              onChange={(e) => setNewGameEvent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Dropdown onSelect={setTeam1Flag} selected={team1Flag} />
            <input
              type="text"
              placeholder="Enter Team 1 name"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Dropdown onSelect={setTeam2Flag} selected={team2Flag} />
            <input
              type="text"
              placeholder="Enter Team 2 name"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={gameDate}
              onChange={(e) => setGameDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              value={gameTime}
              onChange={(e) => setGameTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Enter Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={createGameCard}
              className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Game Card
            </button>
          </div>
        </div>

        <CloseGameCard
          selectedGameCardId={selectedGameCardId}
          setSelectedGameCardId={setSelectedGameCardId}
          gameCards={gameCards}
          setCloseResult={setCloseResult}
          selectedGameCard={selectedGameCard}
          closeGameCard={closeGameCard}
        />
      </div>
      <p className="text-white text-center mt-4 mb-4">{messageGame}</p>
    </div>
  );
};
