import React, { useRef, useState } from "react";
import dyncamic from "next/dynamic";
import Quill from "quill";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useChannelId } from "@/hooks/use-channel-id";
import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { toast } from "sonner";

const Editor = dyncamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}
const ChatInput = ({ placeholder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { mutate: createMessage } = useCreateMessage();
  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      await createMessage(
        { workspaceId, channelId, body },
        { trowError: true }
      );
      setEditorKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        variant="create"
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
