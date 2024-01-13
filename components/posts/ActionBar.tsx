'use client';
import { createCommentOnPost } from '@/actions/posts';
import { CommentType } from '@/schema/Comment';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Comments from './Comments';

interface ActionBarProps {
  post_id: string;
}

const ActionBar = ({ post_id }: ActionBarProps) => {
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [comment, setComment] = useState('');
  const [comments] = useState<CommentType[]>([]);

  const createComment = async () => {
    if (!comment) {
      toast("Comment can't be empty", {
        type: 'warning',
      });
    }
    await createCommentOnPost(post_id, comment);
    setComment('');
    toast('Comment created', {
      type: 'success',
    });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-1">
        <div className="flex justify-center hover:bg-gray-700 p-3 bg-gray-900 rounded-md cursor-pointer">
          <AiOutlineLike size={20} />
        </div>
        <div
          onClick={() => {
            setShowCommentSection(!showCommentSection);
          }}
          className="flex justify-center hover:bg-gray-700 p-3 bg-gray-900 rounded-md cursor-pointer"
        >
          <AiOutlineComment size={20} />
        </div>
      </div>
      {showCommentSection && (
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <Input
              onChange={(ev) => setComment(ev.target.value)}
              value={comment}
              size="sm"
              placeholder="write your comment"
            />
            <Button
              onClick={() => {
                createComment();
              }}
              size="lg"
            >
              Send
            </Button>
          </div>
          <Comments comments={comments} />
        </div>
      )}
    </div>
  );
};

export default ActionBar;
