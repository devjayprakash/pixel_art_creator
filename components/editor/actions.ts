'use server';

import PostModel from '@/schema/Post';
import UserModal from '@/schema/User';
import { auth } from '@clerk/nextjs';

export async function savePostToDb(base64: string, title: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not logged in');
  }

  try {
    const user_data = await UserModal.findOne({ clerk_id: userId });

    if (!user_data) {
      throw new Error('User not found');
    }

    const post = new PostModel({
      title,
      imageUrl: base64,
      posted_by: user_data._id,
    });

    await post.save();
  } catch (error) {
    console.error(error);
  }
}
