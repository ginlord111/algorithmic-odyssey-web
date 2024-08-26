import React from "react";
import Image from "next/image";
const FileInputLayout = ({ imageFile }: { imageFile: File }) => {
  console.log(imageFile, "IMAGE FILE")
  const imgSrc= imageFile.type.includes("image") ? URL.createObjectURL(imageFile) : imageFile.type ==="application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "/doc.png" : "/pdf.png"
  // TODO : IF THE IMAGE FILE IS NOT TYPE OF "image/jpeg" OR .include(image) the source will be in the public wheter if its pdf or docx
  return (
    <div className="flex space-x-5 border border-[#dadce0] items-center p-3 rounded-md">
      <div className="relative">
        <Image
          src={imgSrc}
          alt="File Image"
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
