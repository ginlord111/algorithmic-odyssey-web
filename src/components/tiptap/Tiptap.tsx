"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment, SetStateAction, Dispatch } from "react";
import Toolbar from "./Toolbar";
import Image from '@tiptap/extension-image'
import FileInputLayout from "@/app/(base)/classroom/[classId]/_components/FileInputLayout";
const Tiptap = ({
  name,
  onChange,
  setImageFile,
  setContent,
  imageFile
}: {
  name: string;
  onChange: (richText: string) => void;
  setImageFile:Dispatch<SetStateAction<File|null >>;
  setContent:Dispatch<SetStateAction<JSONContent>>;
  imageFile?:File | null
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
      <Toolbar editor={editor} setImageFile={setImageFile as Dispatch<SetStateAction<File | null>> }/>
      <EditorContent editor={editor} className="border-2 border-black rounded-md p-3">
      {imageFile && <FileInputLayout imageFile={imageFile} />}
      </EditorContent>
    </Fragment>
  );
};

export default Tiptap;
