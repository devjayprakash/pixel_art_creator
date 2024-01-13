'use client';
import { createCommentOnPost } from '@/actions/posts';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface ActionBarProps {
  post_id: string;
  commentSection: React.ReactNode;
}

const ActionBar = ({ post_id, commentSection }: ActionBarProps) => {
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [comment, setComment] = useState('');
  const router = useRouter();

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
    router.refresh();
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
          {commentSection}
        </div>
      )}
    </div>
  );
};

export default ActionBar;
