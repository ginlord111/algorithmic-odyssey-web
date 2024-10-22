"use client";
import React, { useRef, useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { Activity, User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { fetchStudentCode, fetchTaskProgress } from "@/actions/actions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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

const Compiler = ({ user, act }: { user: User; act: Activity }) => {
  const languages: Language[] = [
    { name: "C++", value: "cpp" },
    { name: "Java", value: "java" },
    { name: "Python", value: "python" },
    { name: "JavaScript", value: "javascript" },
    { name: "PHP", value: "php" },
  ];

  const [currentLanguage, setCurrentLanguage] = useState<string>("java");
  const [content, setContent] = useState<string>(getInitialContent("java"));
  const [codeSubmitted, setCodeSubmitted] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const searchParams = useSearchParams();
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
    updateCompilerContent(content);
  }, [content, currentLanguage]);

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
      const response = await fetch("/api/classroom/classwork/code", {
        method: "POST",
        body: JSON.stringify({
          studentId: user.id,
          code: codeSubmitted,
          actId: act.id,
          codeLang:currentLanguage
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response.ok) {
        throw new Error("ERROR");
      }
    } catch (error) {
      console.log(error, "ERROR");
      throw new Error("ERROR");
    }
  };

  // Listen for responses from the iframe
  useEffect(() => {
    const handleMessage = (e: any) => {
      console.log("Received message:", e.data.language);
      if (e.data.action === "runComplete") {
        if (e.data.result.success) {
          getFileContent(e.data.files);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  function getFileContent(files: any) {
    if (files && files.length > 0) {
      const fileContent = files[0].content;
      console.log("File content:", fileContent);
      setCodeSubmitted(fileContent);
    } else {
      console.log("No files available.");
    }
  }
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
  return (
    <div className="relative mt-10">
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
            {user?.isStudent === true && (
              <Button onClick={handleSubmit}>
                {isLoading ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </div>
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
