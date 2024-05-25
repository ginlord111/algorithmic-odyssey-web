"use client";
import { Editor } from "@tiptap/react";
import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Heading2,Bold,Italic,Image } from "lucide-react";
const Toolbar = ({ editor }: { editor: Editor | null }) => {
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
        onPressedChange={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        <Bold />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("Italic")}
        onPressedChange={() =>
          editor.chain().focus().toggleItalic()
        }
      >
        <Italic />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("Italic")}
        // onClick={editor.chain().focus().setImage({ src: url }).run()}
      >
        <Image />
      </Toggle>
    </div>
  );
};

export default Toolbar;
