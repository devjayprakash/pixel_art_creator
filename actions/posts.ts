'use server';

import CommentModel, { CommentType } from '@/schema/Comment';
import PostModel from '@/schema/Post';
import UserModal from '@/schema/User';
import { auth } from '@clerk/nextjs';

export async function createCommentOnPost(post_id: string, comment: string) {
  try {
    const { userId } = auth();

    if (!userId) throw new Error('User not logged in');

    const user = await UserModal.findOne({
      clerk_id: userId,
    });

    const new_cmt = new CommentModel({
      text: comment,
      posted_by: user._id,
      post_id,
    });

    const saved_cmt = await new_cmt.save();

    await PostModel.findByIdAndUpdate(post_id, {
      $push: {
        comments: saved_cmt._id,
      },
    });

    return {
      result: true,
      msg: 'Comment created successfully',
    };
  } catch (error) {
    throw error;
  }
}

export async function getComments(post_id: string): Promise<CommentType[]> {
  try {
    const comments: CommentType[] = await CommentModel.find({
      post_id,
    }).populate({
      path: 'posted_by',
      model: UserModal,
    });

    return comments;
  } catch (error) {
    throw error;
  }
}
