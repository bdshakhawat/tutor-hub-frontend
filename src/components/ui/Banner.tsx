"use client";

import BreadCrumb from "./BreadCrumb";

type CourseBannerProps = {
  title: string;
};

const CourseBanner = ({ title }: CourseBannerProps) => {
  return (
    <div
      className="w-full h-[26vh] bg-cover bg-no-repeat"
      // style={{ backgroundImage: "url(/images/courses-banner.jpg)" }}
    >
      <div className="h-full w-full bg-cDeepBlue flex flex-col justify-center items-center">
        <h1 className="text-xl lg:text-4xl text-white font-bold uppercase">
          {title}
        </h1>
        <BreadCrumb className="text-white" />
      </div>
    </div>
  );
};

export default CourseBanner;
