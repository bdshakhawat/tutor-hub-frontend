"use client";

import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { BsBox, BsBoxArrowInLeft, BsBoxArrowInRight } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";

const Sidebar = () => {
  const [isShrunk, setIsShrunk] = useState(false);

  const toggleSidebarWidth = () => {
    setIsShrunk(!isShrunk);
  };

  const loggedUser: any = getUserInfo();
  // console.log(loggedUser);

  return (
    <div
      className={`bg-cDeepBlue min-h-screen h-full ${
        isShrunk ? "w-20" : "w-60"
      } transition-all duration-300 ease-in-out relative p-5`}
    >
      <button onClick={toggleSidebarWidth} className="absolute top-2 right-2">
        {isShrunk ? (
          <BsBoxArrowInRight className="text-gray-100 text-xl" />
        ) : (
          <BsBoxArrowInLeft className="text-gray-100 text-xl" />
        )}
      </button>

      {/* ----------------main part------------- */}
      <div className="text-gray-200 mt-5">
        <Link
          href="/student/dashboard"
          className="flex items-center  gap-3 hover:bg-gray-800 py-2 pl-2 rounded-lg"
        >
          {isShrunk ? (
            <BsBox className="text-2xl" />
          ) : (
            <>
              <h1 className={`font-bold text-3xl`}>Tutors Hub</h1>
            </>
          )}
        </Link>
        <Link
          href="/student/profile"
          className="flex items-center  gap-3 hover:bg-gray-800 py-2 pl-2 rounded-lg"
        >
          {isShrunk ? (
            <ImProfile className="text-2xl" />
          ) : (
            <>
              <AiOutlineProfile className="text-2xl" />
              <h1 className={`font-bold text-base`}>Profile</h1>
            </>
          )}
        </Link>

        {(loggedUser?.role === "tutor" ||
          loggedUser?.role === "admin") && (
          <>
            <Link
              href="/student/service-list"
              className="flex items-center  gap-3 hover:bg-gray-800 py-2 pl-2 rounded-lg"
            >
              {isShrunk ? (
                <AiOutlineProfile className="text-2xl" />
              ) : (
                <>
                  <AiOutlineProfile className="text-2xl" />
                  <h1 className={`font-bold text-base`}>Services</h1>
                </>
              )}
            </Link>
            <Link
              href="/student/users"
              className="flex items-center  gap-3 hover:bg-gray-800 py-2 pl-2 rounded-lg"
            >
              {isShrunk ? (
                <FaPeopleGroup className="text-2xl" />
              ) : (
                <>
                  <FaPeopleGroup className="text-2xl" />
                  <h1 className={`font-bold text-base`}>Members</h1>
                </>
              )}
            </Link>
          </>
        )}
        <Link
          href="/student/bookings"
          className="flex items-center  gap-3 hover:bg-gray-800 py-2 pl-2 rounded-lg"
        >
          {isShrunk ? (
            <TbBrandBooking className="text-2xl" />
          ) : (
            <>
              <TbBrandBooking className="text-2xl" />
              <h1 className={`font-bold text-base`}>Bookings</h1>
            </>
          )}
        </Link>
        <Link
          href="/"
          className="flex items-center  gap-3 hover:bg-gray-800 py-2 pl-2 rounded-lg"
        >
          {isShrunk ? (
            <BiHomeAlt className="text-2xl" />
          ) : (
            <>
              <BiHomeAlt className="text-2xl" />
              <h1 className={`font-bold text-base`}>Home</h1>
            </>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
