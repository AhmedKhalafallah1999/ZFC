import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  bio: String,
});
UserSchema.methods.RemovePassword = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export default mongoose.model("user", UserSchema);
