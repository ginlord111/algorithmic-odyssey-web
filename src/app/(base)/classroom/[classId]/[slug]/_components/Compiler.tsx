"use client";
import React, { useRef, useState, useEffect } from "react";
import { Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { Activity, StudentActivity, User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { fetchStudentCode, fetchTaskProgress, shouldRenderSubmitButton } from "@/actions/actions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Ban } from 'lucide-react';
import { InputGradeModal } from "@/components/modal/InputGradeModal";

interface Language {
  name: string;
  value: string;
}
const getInitialContent = (language: string): string => {
  switch (language) {
    case "cpp":
      return `#include <iostream>
using namespace std;

int main() {
  cout << "Hello World!" << endl;
  return 0;
}`;
    case "java":
      return `public class HelloWorld {
  public static void main(String[] args) {
      System.out.println("Hello, World!");
  }
}`;
    case "python":
      return `print("Hello, World!")`;
    case "javascript":
      return `console.log("Hello, World!");`;
    case "php":
      return `<?php
echo "Hello, World!";
?>`;
    default:
      return "// Your code here\n"; // fallback for unsupported languages
  }
};
const saveCodeLocalStorage = (code: string,lang:string,result?:any) => {  
  const currentCode = [
    {
      code,
      lang,
      result,
    }
  ]
  localStorage.setItem('currentCode', JSON.stringify(currentCode));
}
const Compiler = ({ user, act,studentWork }: { user: User; act: Activity,studentWork?:StudentActivity }) => {
  const languages: Language[] = [
    { name: "C++", value: "cpp" },
    { name: "Java", value: "java" },
    { name: "Python", value: "python" },
    { name: "JavaScript", value: "javascript" },
    { name: "PHP", value: "php" },
  ];

  const [currentLanguage, setCurrentLanguage] = useState<string>("java");
  const [content, setContent] = useState<string>(getInitialContent("java"));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [targetStud, setTargetStud] = useState<StudentActivity | null> (null)
  const [renderSubmitBtn, setRenderSubmitBtn] = useState<boolean>(false)  
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const searchParams = useSearchParams();
  const {isOpen, onOpenChange, onOpen,onClose} = useDisclosure();
  const updateCompilerContent = (code: string,initLang?:string) => {
    if (code) {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        iframe.onload = () => {
          iframe.contentWindow?.postMessage(
            {
              eventType: "populateCode",
              language: initLang ?? currentLanguage,
              files: [
                {
                  name: `${initLang ?? currentLanguage}${getFileExtension(
                    initLang ??  currentLanguage
                  )}`,
                  content: code,
                },
              ],
            },
            "*"
          );
        };
      }
    }
  };

  useEffect(() => {
    const getCode = async () => {
      const student = searchParams.get("student");

      // get the content of the submited code of the student
      if (student) {
        const studentSubmittedCode = await fetchStudentCode(
          act.id,
          student as string
        );
        console.log(studentSubmittedCode, "USER CODE");
        return updateCompilerContent(studentSubmittedCode?.codeSubmitted as string, studentSubmittedCode?.codeLang);
      }

      return;
    };

    getCode();
  }, [useSearchParams]);

  const getFileExtension = (language: string): string => {
    switch (language) {
      case "cpp":
        return ".cpp";
      case "java":
        return ".java";
      case "php":
        return ".php";
      case "javascript":
        return ".js";
      default:
        return ".py"; // default for Python
    }
  };

  useEffect(() => {
   const saveCodeFunc = () => {
    const saveCode = JSON.parse(localStorage.getItem('currentCode') as string);
    console.log(saveCode, "SAVE CODE")

    if(saveCode){
      return updateCompilerContent(saveCode[0].code,saveCode[0].lang); 
    }
    else{
     return updateCompilerContent(content);
    }
   }
   saveCodeFunc();
  }, [useSearchParams]);

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value);
    const initialContent = getInitialContent(value);
    setContent(initialContent);
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
          iframe.contentWindow?.postMessage(
            {
              eventType: "populateCode",
              language: value,
              files: [
                {
                  name: `${value}${getFileExtension(
                    value
                  )}`,
                  content: initialContent,
                },
              ],
            },
            "*"
          )
      }

  };
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setShowError(false);
      const saveCode = JSON.parse(localStorage.getItem('currentCode') as string);
      const result = saveCode[0].result;
      console.log(result, "IS SUCCESS")
      if(result && result.success){
        const response = await fetch("/api/classroom/classwork/code", {
          method: "POST",
          body: JSON.stringify({
            studentId: user.id,
            code: saveCode[0].code, 
            actId: act.id,
            codeLang:saveCode[0].lang,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsLoading(false);
        if (!response.ok) {
          throw new Error("ERROR");
        }
        return;
      }
      else{
        setIsLoading(false);
        setShowError(true);
      }
  
    } catch (error) {
      console.log(error, "ERROR");
      throw new Error("ERROR");
    }
  };

  useEffect(() => {
    const renderSubmitButton = async () => {
      const studentId =  searchParams.get("student");   
    if(!user.isStudent && studentId){
      const data = await shouldRenderSubmitButton(act?.id, studentId as string);
      setRenderSubmitBtn(data?.isCompleted as boolean);
      setTargetStud(data)
    }
    else{
      return;
    }
    };
    renderSubmitButton();
  }, [act,searchParams]);
  
  useEffect(() => {
    const handleMessage = (e: any) => {
      console.log("Received message:", e.data.language);
    const codeLang = e.data.language
      saveCodeLocalStorage(e.data.files[0].content,codeLang,e.data.result);  
  
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const fetchTaskDone = async () => {
      const data = await fetchTaskProgress(act?.id, user?.id);
      if (data) {
        setIsTaskDone(data);
      }

      return;
    };

    fetchTaskDone();
  }, [act, user, handleSubmit]);
  const handleGrade = () => {

    onOpen()

  }
  console.log(studentWork, "STUDENT WORK")  
  return (
    <div className="relative mt-10">
      <InputGradeModal  isOpen={isOpen} onOpenChange={onOpenChange} targetStud={targetStud} onClose={onClose}/>
      {isTaskDone ? (
        <div className="flex items-center justify-center flex-col space-y-2">
          <Image
            src={"/no-pending-task.svg"}
            alt="Submitted Task"
            width={400}
            height={300}
          />
          <span className="text-muted-foreground text-sm">
            Your work is submitted
          </span>
        </div>
      ) : (
        <div className="flex flex-col space-y-3">
          <div className="flex justify-end space-x-3">
            <Select
              isRequired
              value={currentLanguage}
              className="max-w-xs"
              defaultSelectedKeys={[ currentLanguage]}
              onChange={(e) => handleLanguageChange(e.target.value)}
              aria-label="Select Lang"
            >
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.name}
                </SelectItem>
              ))}
            </Select>
            {user?.isStudent  && (
              <Button onClick={handleSubmit}>
                {isLoading ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  "Submit"
                )}
              </Button>
            ) }
      {renderSubmitBtn && (
           <Button className="bg-purple-700 hover:bg-purple-700 text-white" 
           onClick={()=>handleGrade()}
              >
                Grade
              </Button>
       )}
          </div>
          <span className={`text-red-500 md:text-base text-sm  ${showError ? 'block' : 'hidden'}`}> <Ban className="inline-block w-4 h-4"/> Please run the code first or correct any errors</span>
          <iframe
            ref={iframeRef}
            id="oc-editor"
            className="w-full h-[400px] border-none"
            src="https://onecompiler.com/embed?availableLanguages=cpp%2Cjava%2Cpython%2Cjavascript%2Cphp&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=true&theme=dark&listenToEvents=true&codeChangeEvent=true&fontSize=16&hideLanguageSelection=true"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Compiler;
