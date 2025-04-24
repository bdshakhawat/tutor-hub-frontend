import React from "react";

const CommonBanner = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="w-full bg-primaryPro ">
      <div className=" w-full mx-auto  h-[150px] border bg-[#F5F7FA] flex justify-center items-center">
        <span className="text-center ">
          <p className="text-lg mb-3 font-semibold md:text-xl xl:text-4xl text-primary">
            {" "}
            {subTitle}
          </p>
          <span className=" text-md text-gray-500 font-semibold md:text-lg xl:text-xl ">
            Home / <p className="inline text-primary">{title}</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default CommonBanner;