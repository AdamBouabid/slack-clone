import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface ThumbnailProps {
  url: string | null | undefined;
}

const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] border rounder-lg my-2 cursor-zoom-in">
          <img
            src={url}
            alt={"message image"}
            className="rounded-md object-cover size-full"
          />
        </div>
        <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
          <img
            src={url}
            alt={"message image"}
            className="rounded-md object-cover size-full"
          />
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
};

export default Thumbnail;
