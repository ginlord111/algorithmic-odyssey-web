"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment, SetStateAction, Dispatch } from "react";
import Toolbar from "./Toolbar";
import Image from '@tiptap/extension-image'
const Tiptap = ({
  name,
  onChange,
  setImageFile,
  setContent
}: {
  name: string;
  onChange: (richText: string) => void;
  setImageFile:Dispatch<SetStateAction<File|null>>;
  setContent:Dispatch<SetStateAction<JSONContent>>;
}) => {

  const editor = useEditor({
    extensions: [StarterKit.configure(),Image.configure({HTMLAttributes:{
      class:"w-fit h-fit flex items-center"
    }})],
    content: ``,
    editorProps:{
      attributes:{
        class:"rounded-md  min-h-[150px] !border-transparent focus:outline-none"
      },
    },
    onUpdate({editor}){
      onChange(editor.getText())
     setContent(editor.getJSON())
  

    }
  });


  return (
    <Fragment>
      <Toolbar editor={editor} setImageFile={setImageFile}/>
      <EditorContent editor={editor} className="border-2 border-black rounded-md p-3"/>
    </Fragment>
  );
};

export default Tiptap;
