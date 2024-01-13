import ActionBar from '@/components/posts/ActionBar';
import PostModel, { PostType } from '@/schema/Post';
import UserModal from '@/schema/User';
import { SignedIn } from '@clerk/nextjs';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';

dayjs.extend(RelativeTime);

export default async function Home() {
  const posts: PostType[] = await PostModel.find({})
    .sort({ createdAt: -1 })
    .populate({
      path: 'posted_by',
      model: UserModal,
    });

  return (
    <div className="w-full gap-3 mt-4 h-screen bg-black overflow-y-scroll flex flex-col items-center">
      {posts.map((post) => {
        return (
          <div
            className="border-[0.5px] border-gray-600 rounded-md p-3"
            key={post._id}
          >
            <div className="flex gap-3">
              <Image
                className="rounded-full"
                src={post.posted_by.image_url || ''}
                width={50}
                height={50}
                alt={post.posted_by.name}
              />
              <div>
                <div className="text-lg">{post.posted_by.name}</div>
                <div className="text-xm text-gray-500">
                  Created on {dayjs(post.createdAt).fromNow(true)}
                </div>
              </div>
            </div>
            <div className="text-gray-100">
              {post.title && <div className="text-lg">{post.title}</div>}
            </div>
            <Image
              src={post.imageUrl}
              width={400}
              height={400}
              alt={post.title}
            />
            <SignedIn>
              <ActionBar post_id={post._id} />
            </SignedIn>
          </div>
        );
      })}
    </div>
  );
}
