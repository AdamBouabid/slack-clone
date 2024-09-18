import React, { useRef } from "react";
import dyncamic from "next/dynamic";
import Quill from "quill";

const Editor = dyncamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}
const ChatInput = ({ placeholder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  return (
    <div className="px-5 w-full">
      <Editor
        variant="create"
        placeholder={placeholder}
        onSubmit={() => {}}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
