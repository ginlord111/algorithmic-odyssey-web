"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment } from "react";
import Toolbar from "./Toolbar";
const Tiptap = ({
  name,
  onChange,
}: {
  name: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content:name,
    editorProps:{
      attributes:{
        class:"rounded-md border min-h-[150px] border-input"
      },
    },
    onUpdate({editor}){
      onChange(editor.getHTML()),
      console.log(editor.getHTML(), "CONTNT")
    }
  });

  return (
    <Fragment>
      <Toolbar editor={editor}/>
      <EditorContent editor={editor} />
    </Fragment>
  );
};

export default Tiptap;
