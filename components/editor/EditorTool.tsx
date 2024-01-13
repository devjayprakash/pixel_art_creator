import { ReactNode } from 'react';

interface EditorToolProps {
  tool_icon: ReactNode;
  onClick?: () => void;
}

const EditorTool = ({ tool_icon, onClick }: EditorToolProps) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className="w-10 h-10 text-xl bg-gray-800 flex justify-center items-center hover:bg-gray-600 cursor-pointer"
    >
      {tool_icon}
    </div>
  );
};
export default EditorTool;
