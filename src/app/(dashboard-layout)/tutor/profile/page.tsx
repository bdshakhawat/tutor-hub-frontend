"use client";

import ProfileDetails from "@/components/ui/dashboard/ProfileDetails";
import Link from "next/link";
import { BiSolidRightArrow } from "react-icons/bi";

const MyProfile = () => {
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-5 px-5">
        <h1 className="md:text-3xl text-2xl uppercase text-center font-bold">
          My Profile
        </h1>
        <Link href="/profile/update-profile">
          <button className="btn btn-sm bg-cDeepBlue text-gray-100 hover:bg-cOrange py-2 w-40 rounded-full flex items-center justify-center">
            <span className="text-gray-100 mr-3">
              <BiSolidRightArrow />
            </span>{" "}
            Update Profile
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <ProfileDetails />
      </div>
    </div>
  );
};

export default MyProfile;
