'use client';

import { CommentType } from '@/schema/Comment';
import Image from 'next/image';

const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="flex gap-3 mt-2">
            <div className="flex gap-2">
              <Image
                className="rounded-full"
                src={comment.posted_by.image_url || ''}
                width={30}
                height={30}
                alt={comment.posted_by.name}
              />
              <div className="text-gray-100">{comment.posted_by.name}</div>
            </div>
            <div className="text-gray-100">{comment.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
