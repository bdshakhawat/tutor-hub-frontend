import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbBrandBooking } from "react-icons/tb";

const DashboardNav = () => {
  const loggedUser: any = getUserInfo();
  return (
    <>
      <div className="h-16 bg-cDeepBlue flex items-center justify-between px-5 md:hidden">
        <h1 className="text-white text-2xl font-semibold uppercase">
          Elite Educators
        </h1>
        <label htmlFor="my-drawer" className="drawer-button">
          <GiHamburgerMenu className="text-white text-xl" />
        </label>
      </div>
      <div className="drawer z-10">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-1/2 min-h-full bg-cDeepBlue text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link
                href="/profile"
                className="flex items-center text-white gap-3 py-2 pl-2 rounded-lg"
              >
                <AiOutlineProfile className="text-2xl" />
                <h1 className={`font-bold text-base`}>Profile</h1>
              </Link>
            </li>
            <li>
              {(loggedUser?.role === "admin" ||
                loggedUser?.role === "super_admin") && (
                <>
                  <Link
                    href="/service-list"
                    className="flex items-center text-white  gap-3 hover:bg-gray-800 py-2 pl-2 rounded-lg"
                  >
                    <AiOutlineProfile className="text-2xl" />
                    <h1 className={`font-bold text-base`}>Services</h1>
                  </Link>
                  <Link
                    href="/users"
                    className="flex items-center  gap-3 text-white hover:bg-gray-800 py-2 pl-2 rounded-lg"
                  >
                    <FaPeopleGroup className="text-2xl" />
                    <h1 className={`font-bold text-base`}>Clients</h1>
                  </Link>
                </>
              )}
            </li>
            <li>
              <Link
                href="/bookings"
                className="flex items-center text-white  gap-3 hover:bg-gray-800 py-2 pl-2 rounded-lg"
              >
                <TbBrandBooking className="text-2xl" />
                <h1 className={`font-bold text-base`}>Bookings</h1>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center text-white gap-3 py-2 pl-2 rounded-lg"
              >
                <BiHomeAlt className="text-2xl" />
                <h1 className={`font-bold text-base`}>Home</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
