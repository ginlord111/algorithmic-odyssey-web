"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment } from "react";
import Toolbar from "./Toolbar";
import Image from '@tiptap/extension-image'
const Tiptap = ({
  name,
  onChange,
}: {
  name: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure(),Image],
    content:`${name}   <img src="" />`,
    editorProps:{
      attributes:{
        class:"rounded-md  min-h-[150px] !border-transparent"
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
      <EditorContent editor={editor} className="border-2 border-black rounded-md p-3"/>
    </Fragment>
  );
};

export default Tiptap;
