import React from "react";
import Image from "next/image";
const FileInputLayout = ({ imageFile }: { imageFile: File }) => {
  return (
    <div className="flex space-x-5 border border-[#dadce0] items-center p-3 rounded-md">
      <div className="relative">
        <Image
          src={URL.createObjectURL(imageFile)}
          alt="dasdasd"
          width="150"
          height="150"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-bold text-black tracking-wide">{imageFile.name}</p>
        <p className="font-bold text-black tracking-wide text-muted-foreground">
          {imageFile.type}
        </p>
      </div>
    </div>
  );
};

export default FileInputLayout;
