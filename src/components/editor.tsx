import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "quill/dist/quill.snow.css";
import Quill, { type QuillOptions } from "quill";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { Button } from "./ui/button";
import { ImageIcon, Smile, XIcon } from "lucide-react";
import { Hint } from "./hint";
import { Delta, Op } from "quill/core";
import { cn } from "@/lib/utils";
import EmojiPopover from "./emoji-popover";
import Image from "next/image";
interface EditorProps {
  variant?: "create" | "update";
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
}

type EditorValue = {
  image: File | null;
  body: string;
};

const Editor = ({
  variant = "create",
  placeholder = "Write something",
  defaultValue = [],
  disabled = false,
  innerRef,
  onSubmit,
  onCancel,
}: EditorProps) => {
  const [isToolbarVisible, setIsToolBarVisible] = useState(true);
  const toggleToolbar = () => {
    setIsToolBarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const disabledRef = useRef(disabled);
  const defaultValueRef = useRef(defaultValue);
  const submitRef = useRef(onSubmit);
  const imageElmentRef = useRef<HTMLInputElement>(null);
  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };
  useLayoutEffect(() => {
    placeholderRef.current = placeholder;
    disabledRef.current = disabled;
    defaultValueRef.current = defaultValue;
    submitRef.current = onSubmit;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],

        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                const text = quill.getText();
                const addedimage = imageElmentRef.current?.files?.[0] || null;
                const isEmpty =
                  !addedimage &&
                  text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
                if (isEmpty) return;

                const body = JSON.stringify(quill.getContents());
                submitRef.current?.({ body, image: addedimage });
              },
            },
            shift_enter: {
              key: "Enter",
              shiftkey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        ref={imageElmentRef}
        onChange={(event) => setImage(event.target.files![0])}
        className="hidden"
      />
      <div
        className={cn(
          "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:shadow transition bg-white",
          disabled && "opacity-50"
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />
        {!!image && (
          <div className="p-2">
            <div className="relative size-[62px] flex items-center justify-center group/image">
              <Hint label="Remove image">
                <button
                  onClick={() => {
                    setImage(null);
                    imageElmentRef.current!.value = "";
                  }}
                  className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                >
                  <XIcon className="size-3.5" />
                </button>
              </Hint>
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                fill
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={isToolbarVisible ? "Hide formatting" : "Show formatting"}
          >
            <Button
              disabled={disabled}
              size={"iconSm"}
              variant={"ghost"}
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <EmojiPopover hint="Emoji" onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} size={"iconSm"} variant={"ghost"}>
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <Hint label="Image">
              <Button
                disabled={disabled}
                size={"iconSm"}
                variant={"ghost"}
                onClick={() => {
                  imageElmentRef.current?.click();
                }}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant == "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={onCancel}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                onClick={() => {
                  onSubmit({
                    body: JSON.stringify(quillRef.current?.getContents()),
                    image,
                  });
                }}
                disabled={disabled || isEmpty}
                size={"sm"}
              >
                Save
              </Button>
            </div>
          )}
          {variant == "create" && (
            <Button
              size={"iconSm"}
              disabled={disabled || isEmpty}
              onClick={() => {
                onSubmit({
                  body: JSON.stringify(quillRef.current?.getContents()),
                  image,
                });
              }}
              className={cn(
                "ml-auto",
                isEmpty
                  ? "bg-white hover:bg-white text-muted-foreground"
                  : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              )}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div
          className={cn(
            "p-2 text-[10px] text-muted-foreground flex justify-end opacity-0 transition",
            !isEmpty && "opacity-100"
          )}
        >
          <p>
            <strong>Shift + Return</strong> to add a new line
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
