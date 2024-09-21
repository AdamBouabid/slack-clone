import { GetMessagesReturnType } from "@/features/messages/api/use-get-messages";
import { group } from "console";
import { format, isToday, isYesterday } from "date-fns";
import React from "react";

interface MessageListProps {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreationTime?: number;
  variant?: "channel" | "thread" | "conversation";
  data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "today";
  if (isYesterday(date)) return "today";
  return format(date, "EEEE, MMMM d");
};

const MessageList = ({
  memberName,
  memberImage,
  channelName,
  channelCreationTime,
  variant = "channel",
  data,
  loadMore,
  isLoadingMore,
  canLoadMore,
}: MessageListProps) => {
  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date();
      const dateKey = format(date, "yyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );
  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div className={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absoulute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map((message, index) => {
            return <Message key={message._id} id={message._id} memberId={message.memberId} authormage={message.user.image}
            reactions={messsage.reactions} body={message.body} image={message.image} updatedAt={message.updatedAt} updatedAt={message.updatedAt} createdAt={message._creationTime} threadCount={message.threadCount} threadImage={message.threadImage}>{JSON.stringify(message)}</div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
