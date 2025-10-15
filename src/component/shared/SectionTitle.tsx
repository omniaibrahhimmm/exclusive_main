import React from "react";

export default function SectionTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className="mb-15">
      <h2 className="text-red-600 font-semibold  mb-5 pt-2.5 ps-9 before:rounded-sm relative before:content-[''] before:absolute before:top-0.5 before:start-0.5 before:translate-y-0.5 before:w-5 before:h-10 before:bg-red-500 ">
        {title}
      </h2>
      <span className="font-semibold text-4xl ">{subTitle}</span>
    </div>
  );
}
