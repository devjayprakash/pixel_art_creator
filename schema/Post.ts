import mongoose, { Schema, models } from 'mongoose';
import { UserType } from './User';

export interface PostType {
  _id: string;
  title: string;
  imageUrl: string;
  posted_by: UserType;
  createdAt: Date;
  updatedAt: Date;
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
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    posted_by: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = models.Post || mongoose.model('Post', Post);

export default PostModel;
