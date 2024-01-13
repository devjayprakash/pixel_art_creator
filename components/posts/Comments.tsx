import CommentModel, { CommentType } from '@/schema/Comment';
import UserModal from '@/schema/User';
import dayjs from 'dayjs';

const Comments = async ({ post_id }: { post_id: string }) => {
  const comments: CommentType[] = await CommentModel.find({
    post_id,
  })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: 'posted_by',
      model: UserModal,
    });

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div
            key={comment._id}
            className="flex border-[0.5px] border-gray-400 p-3 flex-col gap-3 mt-2"
          >
            <div className="flex gap-2">
              <div className="text-gray-100">
                <div className="text-sm">{comment.posted_by.name}</div>
                <div className="text-xs text-gray-500">
                  Created on {dayjs(comment.createdAt).fromNow(true)}
                </div>
              </div>
            </div>
            <div className="text-gray-100">{comment.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
