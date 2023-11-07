import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      // required: true,
    },
    name: String,
    id: String,
    bio: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Post", PostSchema);
