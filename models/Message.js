import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Message', MessageSchema)