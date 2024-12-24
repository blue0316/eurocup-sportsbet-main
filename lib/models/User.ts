import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  walletAddress: string;
  tokenUnlocked: number;
  tokenLocked: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  walletAddress: { type: String, required: true },
  tokenUnlocked: { type: Number, default: 0 }, // default: 10000
  tokenLocked: { type: Number, default: 0 },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
