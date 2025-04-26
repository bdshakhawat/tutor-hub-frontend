import Image from "next/image";
import React from "react";

import teacherimg from "../../assets/teacher.jpg";

const TutorCard = () => {
  return (
    <div className="md:w-48 w-40 rounded-lg bg-gray-100 border border-cDeepBlue mx-auto">
      <Image
        src={teacherimg}
        alt="user"
        width={300}
        className="w-full rounded-t-lg"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <div className="px-2 py-3 flex justify-between ">
        <div>
          <h1 className="text-lg font-semibold text-cBlack">Shakhawat</h1>
          <p className="text-sm">Physics</p>
        </div>
        <button className="btn btn-xs bg-cDeepBlue/80 text-white text-[10px] hover:bg-cOrange">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default TutorCard;
