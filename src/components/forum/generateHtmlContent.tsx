"use client"
import tiptapExtensions from "@/utils/tiptapExtension";
import { generateHTML, JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";

const GenerateHtmlContent = (content:JSONContent):string | null => {
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined" && content) {
          const extension = tiptapExtensions();
          const tempContent = generateHTML(content as JSONContent, extension);
          setGeneratedContent(tempContent);
        }
      }, [content]);

      return generatedContent
}


export default GenerateHtmlContent