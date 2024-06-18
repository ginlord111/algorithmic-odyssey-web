"use client";
import { Editor } from "@tiptap/react";
import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Heading2, Bold, Italic, Image } from "lucide-react";
import { useRef, Dispatch, SetStateAction } from "react";
const Toolbar = ({editor,setImageFile}: { editor: Editor | null, setImageFile:Dispatch<SetStateAction<File|null>>}) => {
  const fileBtn = useRef<HTMLInputElement>(null);
  if (!editor) return;

  return (
    <div className="border border-input bg-transparent rounded">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("Italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Toggle>

      <Toggle
        size="sm"
        onClick={() => {
          if (fileBtn.current) {
            fileBtn.current.click();
          }
        }}
      >
        <Image />
      </Toggle>
      <input
      type="file"
        ref={fileBtn}
        // accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => {
          if(!event.target.files) return ;
          const file = event.target.files[0];
          setImageFile(file);
            editor
          .commands.setImage({src:URL.createObjectURL(file)})
        
         
        }}
      />
    </div>
  );
};

export default Toolbar;
