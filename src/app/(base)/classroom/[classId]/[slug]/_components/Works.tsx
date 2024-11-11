import React, { Dispatch, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Activity, StudentActivity, User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const SubmittingWorks = ({
  works,
  setWorks,
  user,
  act,
  studentWork,
}: {
  works: File | null;
  setWorks: Dispatch<File | null>;
  user: User;
  act: Activity;
  studentWork: StudentActivity | null;
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const imgSrc =
    studentWork?.fileType?.includes("image") ?? works?.type.includes("image")
      ? "/photo.png"
      : studentWork?.fileType?.includes("document") ??
        works?.type.includes("document")
      ? "/doc.png"
      : "/pdf.png";

  const onSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("works", works as File);
    formData.append("studentId", JSON.stringify(user.id));
    formData.append("activityId", JSON.stringify(act.id));
    const res = await fetch("/api/classroom/classwork", {
      method: "PATCH",
      body: formData,
    });
    if (!res.ok) {
      setMessage("Something went wrong");
    }
    router.refresh();
    toast.success("Sucessful submitted your works");
    setIsLoading(false);
  };
  return (
    <div className="bg-white p-14 rounded-md border border-[#dadce0]">
      {studentWork?.score && (
        <div className="flex justify-end space-x-3">
          <span className="text-muted-foreground">Score:</span>
          <span className="font-semibold">{studentWork.score}</span>
        </div>
      )}
      {studentWork && !studentWork.score && (
        <div className="flex justify-end space-x-3 text-muted-foreground italic">
          <span>Waiting to be graded</span>
        </div>
      )}
      <div className="flex space-x-5">
        <div>
          <Image src={imgSrc} alt="File Image" width={100} height={50} />
        </div>
        <div className="flex flex-col  py-3 justify-between">
          <span className="font-bold text-lg tracking-normal">
            {studentWork?.fileName ?? works?.name}
          </span>
          <span className="text-muted-foreground text-md">
            {studentWork?.fileType ?? works?.type}
          </span>
        </div>
      </div>
      {studentWork?.isCompleted ? (
        <span className="text-muted-foreground italic flex justify-end">
          Your work has been submitted
        </span>
      ) : (
        <div className="flex justify-end space-x-3">
          <Button className="bg-red-500" onClick={() => setWorks(null)}>
            Cancel
          </Button>
          <Button className="bg-blue-500" onClick={onSubmit}>
            {isLoading ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : (
              "Submit Work"
            )}
          </Button>
        </div>
      )}
      {message && (
        <span className="text-red-500 font-bold text-sm flex justify-end mt-2">
          Something went wrong
        </span>
      )}
    </div>
  );
};
const Works = ({
  user,
  act,
  studentWork,
}: {
  user: User;
  act: Activity;
  studentWork: StudentActivity |  null;
}) => {
  const [works, setWorks] = useState<File | null>(null);
  const fileBtn = useRef<HTMLInputElement>(null);
  return (
    <div className="mt-10">
      {studentWork?.fileSubmittedUrl ?? works ? (
        <SubmittingWorks
          works={works}
          setWorks={setWorks}
          user={user}
          act={act}
          studentWork={studentWork}
        />
      ) : (
        <div className="flex-col flex  items-center space-y-3">
          <div className="flex items-center justify-center pb-3">
            <Image
              src="/no-works.svg"
              alt="Empty Classroom"
              width={300}
              height={150}
            />
          </div>
          <span className="text-muted-foreground text-md font-semibold text-center ">
            No submissions have been made for this activity yet
          </span>

          <Button
            className="w-fit"
            onClick={() => {
              if (fileBtn.current) {
                fileBtn.current.click();
              }
            }}
          >
            Attach your work +
          </Button>
          <input
            type="file"
            ref={fileBtn}
            // accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => {
              if (!event.target.files) return;
              const file = event.target.files[0];
              setWorks(file);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Works;
