import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    topic: String,
    createdBy: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
