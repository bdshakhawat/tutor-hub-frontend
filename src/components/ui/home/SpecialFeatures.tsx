"use client";

import { FiArrowUpRight } from "react-icons/fi";
import certificate from "../../../assets/certification.png";
import instructor from "../../../assets/instructor.png";
import support from "../../../assets/24-hours.png";
import videoLesson from "../../../assets/lesson.png";
import Image from "next/image";

const OurFeature = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 bg-[#ffefe7db] md:px-10 px-5  py-10 rounded-lg">
          <div className="lg:col-span-2 flex items-center bg-gray-800 rounded-lg shadow-xl lg:h-64 py-5 lg:py-0">
            <div className="md:px-10 px-5">
              <h1 className="lg:text-5xl text-4xl text-white font-medium leading-tight mb-6">
                Our Special
                <br />
                <span className="text-[#FFCD70]">Features</span> For You
              </h1>
              <button className="flex items-center gap-2 text-lg font-medium px-4 py-3 rounded-full hover:bg-[#FFCD70] text-[#FFCD70] hover:text-gray-900 border border-[#FFCD70] transition-colors delay-75 duration-300">
                See All Features <FiArrowUpRight className="text-xl" />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg flex flex-col gap-3 justify-center md:px-10 px-5 shadow-xl h-64">
            <Image
              src={certificate}
              alt=""
              width={70}
              height={70}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <h3 className="text-2xl font-medium">Get Certificate</h3>
            <p className="text-gray-700">
              Add value to your Certificate and Increase your chances of getting
              hired in your Dream Job
            </p>
          </div>
          <div className="bg-white rounded-lg flex flex-col gap-3 justify-center md:px-10 px-5 shadow-xl h-64">
            <Image
              src={instructor}
              alt=""
              width={70}
              height={70}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <h3 className="text-2xl font-medium">Amazing Instructor</h3>
            <p className="text-gray-700">
              Our Amazing Instructor bring Experience, Knowledge, and Fun on the
              table.
            </p>
          </div>
          <div className="bg-white rounded-lg flex flex-col gap-3 justify-center md:px-10 px-5 shadow-xl h-64">
            <Image
              src={support}
              alt=""
              width={70}
              height={70}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <h3 className="text-2xl font-medium">Life Time Support</h3>
            <p className="text-gray-700">
              You will have Life Time Access of the Courses & Resources. Also
              contacting instructors any time.
            </p>
          </div>
          <div className="bg-white rounded-lg flex flex-col gap-3 justify-center md:px-10 px-5 shadow-xl h-64">
            <Image
              src={videoLesson}
              alt=""
              width={70}
              height={70}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <h3 className="text-2xl font-medium">Video Lesson</h3>
            <p className="text-gray-700">
              Recorded version of lectures from Professional Instructions to
              boost your growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurFeature;
