import { Schema, model, models } from 'mongoose';
import { UserType } from './User';

export interface CommentType {
  _id: string;
  text: string;
  posted_by: UserType;
  createdAt: string;
  updatedAt: string;
}

const CommentSchema = new Schema(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    text: {
      required: true,
      type: String,
    },
    posted_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = models.Comment || model('Comment', CommentSchema);

export default CommentModel;
