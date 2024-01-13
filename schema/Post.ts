import mongoose, { Schema, models } from 'mongoose';
import { UserType } from './User';

export interface PostType {
  _id: string;
  title: string;
  imageUrl: string;
  posted_by: UserType;
}

const Post = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    imageUrl: {
      required: true,
      type: String,
    },
    posted_by: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

console.log(models.Post);

const PostModel = models.Post || mongoose.model('Post', Post);

export default PostModel;
