import Image from "next/image";
import teacherPic from "../../../../public/images/Lesson-bro.png"
import Button from "../Button";

const FindTeacher = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 items-center px-5 md:px-16 md:py-20 py-10">
      <div className="flex flex-col justify-center w-full h-full mt-5 md:mt-0 order-2 md:order-1">
        <div className="">
          <div className="flex items-center justify-center md:justify-start">
            <div className="border-b-2 w-20 border-cOrange mr-3"></div>
            <p className="text-cOrange">Get yourself your soulmate tutor.</p>
          </div>
          <h1 className="lg:text-4xl text-3xl text-center md:text-left font-semibold mb-5">
            No stop untill you find <br /> your missing{" "}
            <span className="text-cBlue">Teacher</span>
          </h1>

          <p className="lg:w-[500px] mb-5 text-justify">
            Find a tutor is like finding a piece of missing heart, so find it
            carefully and invest your time into it. We are here to help you
            find. Click the button below to find your tutor.
          </p>
          <div className="flex items-center justify-center md:justify-start">
            <Button text="Search Tutor" href="/tutors" />
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <Image
          src={teacherPic}
          alt=""
          width={900}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
    </div>
  );
};

export default FindTeacher;
