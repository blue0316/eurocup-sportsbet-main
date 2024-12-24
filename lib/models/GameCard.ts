import mongoose, { Schema, Document } from "mongoose";

interface IBet {
  user: string;
  amount: number;
  team: string;
}

interface ITeam {
  name: string;
  flag: string;
}

interface IGameCard extends Document {
  event: string;
  time_zone: string;
  team1: ITeam;
  team2: ITeam;
  date: string;
  time: string;
  venue: string;
  status: "OPEN" | "LOCKED" | "RESULT";
  bets: IBet[];
  result: string | null;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  flag: { type: String, required: true },
});

const GameCardSchema: Schema = new Schema({
  event: { type: String, required: true },
  time_zone: { type: String },
  team1: { type: TeamSchema, required: true },
  team2: { type: TeamSchema, required: true },
  date: { type: String },
  time: { type: String },
  venue: { type: String },
  status: { type: String, enum: ["OPEN", "LOCKED", "RESULT"], default: "OPEN" },
  bets: [
    {
      user: { type: String, required: true },
      amount: { type: Number, required: true },
      team: { type: String, required: true },
    },
  ],
  result: { type: String, default: null },
});

export default mongoose.models.GameCard ||
  mongoose.model<IGameCard>("GameCard", GameCardSchema);
