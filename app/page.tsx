import PostModel, { PostType } from '@/schema/Post';
import UserModal from '@/schema/User';
import Image from 'next/image';

export default async function Home() {
  const posts: PostType[] = await PostModel.find({}).populate({
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
                src={post.posted_by.image_url || ''}
                width={50}
                height={50}
                alt={post.posted_by.name}
              />
              <div>
                <div className="text-lg">{post.posted_by.name}</div>
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
          </div>
        );
      })}
    </div>
  );
}
