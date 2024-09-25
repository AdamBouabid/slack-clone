import React from "react";
import { Button } from "./ui/button";
import {
  MessageCircle,
  MessageSquare,
  Pencil,
  PencilIcon,
  Smile,
  Trash,
} from "lucide-react";
import { Hint } from "./hint";
import EmojiPopover from "./emoji-popover";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  hideThreadButton?: boolean;
  handleReaction: (value: string) => void;
}

const Toolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleThread,
  handleReaction,
  handleDelete,
  hideThreadButton,
}: ToolbarProps) => {
  return (
    <div className="absolute top-0 right-5">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        <EmojiPopover
          hint="Add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant={"ghost"} size={"iconSm"} disabled={isPending}>
            <Smile className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button variant={"ghost"} size={"iconSm"} disabled={isPending}>
              <MessageSquare className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <>
            <Hint label="Edit message">
              <Button variant={"ghost"} size={"iconSm"} disabled={isPending}>
                <PencilIcon className="size-4" />
              </Button>
            </Hint>
            <Hint label="Delete message">
              <Button variant={"ghost"} size={"iconSm"} disabled={isPending}>
                <Trash className="size-4" />
              </Button>
            </Hint>
          </>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
