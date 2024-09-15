import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: "string", required: true, unique: true },
  password: { type: "string", required: true, unique: true, select: false },
  email: { type: "string", required: true, select: false },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
