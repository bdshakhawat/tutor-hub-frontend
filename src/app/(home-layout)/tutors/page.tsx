'use client'

import CourseBanner from '@/components/ui/Banner';
import BeTutorModal from '@/components/ui/BeTutorModal';
import TutorCard from '@/components/ui/TutorCard';
import React, { useState } from 'react'
import { BiSolidRightArrow } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

const TutorsPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="">
      <CourseBanner title="Tutors" />

      <div className="lg:w-3/4 w-[90%] mx-auto rounded-lg bg-gray-200 py-3 flex flex-row items-center justify-between gap-2 px-5 mt-5">
        <div className="relative">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="name, subject, location"
            className="input input-sm md:input-md border-cBlack outline-none focus:outline-cOrange focus:border-none lg:w-72 w-full md:pl-10 pl-8"
          />
          <BsSearch className="absolute top-1/2 md:left-4 left-2 -translate-y-1/2" />
        </div>
        <div>
          <button
            onClick={() => {
              const dialog = document.getElementById(
                "be_tutor_modal"
              ) as HTMLDialogElement;
              if (dialog) {
                dialog.showModal();
              }
            }}
            className="btn btn-sm md:btn-md w-36 md:w-40 rounded-full flex items-center justify-center border border-gray-800 hover:bg-gray-800 hover:text-white group"
          >
            <span className="text-gray-800 group-hover:text-white mr-1">
              <BiSolidRightArrow />
            </span>{" "}
            Be A Tutor
          </button>
        </div>
      </div>

      <div className="mt-16 px-3 md:px-16 py-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-y-5 gap-x-2">
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard />
        <TutorCard /> 
        <TutorCard />
        <TutorCard />
        <TutorCard />
      </div>
      {/* pagination */}
      <div className="flex items-center justify-center my-5">
        <div className="join border border-cDeepBlue hover:border-cDeepBlue">
          <button
            className="join-item btn btn-sm"
            onClick={() => {}}
          >
            «
          </button>
          <button className="join-item btn btn-sm bg-cDeepBlue hover:bg-cDeepBlue hover:border-cDeepBlue border border-cDeepBlue text-white">
            Page 01
          </button>
          <button
            className="join-item btn btn-sm"
            onClick={() => {}}
          >
            »
          </button>
        </div>
      </div>

      {/* modal */}
      <BeTutorModal />
      {/* modal end */}
    </div>
  );
}

export default TutorsPage