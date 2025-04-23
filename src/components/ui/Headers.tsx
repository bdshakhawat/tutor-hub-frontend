"use client";

import { authKey } from "@/constants/storageKey";
import { useGetBookingByUserIdQuery } from "@/redux/api/bookingApi";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsCart2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotificationsOutline } from "react-icons/io5";
import newlogo from "../../assets/tutor-hub.png";
import NotificationModel from "./NotificationModel";
import { useRef } from "react";

type CustomLinkProps = {
  href: string;
  title: string;
  className?: string;
  onClick?: () => void;
};

const CustomLink = ({
  href,
  title,
  className = "",
  onClick,
}: CustomLinkProps) => {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <Link
      href={href}
      className={`${className} relative group`}
      onClick={onClick}
    >
      {title}
      <span
        className={`h-[2px] inline-block bg-cOrange absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease-in-out duration-300
        ${pathname === href ? "w-full" : "w-0"}
        `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const Headers = () => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  const logout = () => {
    removeUserInfo(authKey);
    toast.success("Logout successfully");
    router.push("/signin");
  };

  const loggedUser: any = getUserInfo();
  const { id, role } = loggedUser;
  // console.log(role);
  const query: Record<string, any> = {};

  const { data } = useGetBookingByUserIdQuery({
    id,
    ...query,
  });

  const bookings = data?.services;

  const statusTrueBookings = bookings?.filter(
    (booking: any) => booking.status === true
  );

  const drawerCheckboxRef = useRef<HTMLInputElement>(null);
  const closeDrawer = () => {
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = false;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 bg-[#FFFFFF]">
        <div>
          <Image
            src={newlogo}
            alt="logo"
            width={160}
            height={80}
          />
          
        </div>
        <div className="md:flex hidden gap-10 items-center text-base">
          <CustomLink href="/" title="Home" className="" />
          <CustomLink href="/tutors" title="Tutors" className="" />
          <CustomLink href="/blog" title="Blog" className="" />
          <CustomLink href="/faq" title="FAQ" className="" />
          <CustomLink href="/aboutus" title="About Us" className="" />
          {/* <CustomLink href="/tutors" title="Tutors" className="" /> */}
          {/* <CustomLink href="/about" title="About" className="" /> */}
          {/* <CustomLink href="/events" title="Events" className="" /> */}
          {userLoggedIn ? (
            <>
              <CustomLink href="/dashboard" title="Dashboard" className="" />
            </>
          ) : (
            <>
              <CustomLink href="/signin" title="Signin" className="" />
            </>
          )}
        </div>
        <div>
          <div className="md:flex hidden items-center gap-3 text-base mb-2">
            {/* <CustomLink href="/" title="Tutors" className="mx-4" />
            <CustomLink href="/" title="About" className="mx-4" /> */}
            <Link href="/cart" className="text-xl font-bold">
              <BsCart2 />
            </Link>

            {userLoggedIn && role === "user" && (
              <div
                className="text-xl font-bold relative cursor-pointer"
                onClick={() => {
                  const dialog = document.getElementById(
                    "notification_modal"
                  ) as HTMLDialogElement;
                  if (dialog) {
                    dialog.showModal();
                  }
                }}
              >
                <IoNotificationsOutline className="" />
                <span className="absolute -top-3 left-3 text-cOrange font-mono text-base">
                  {statusTrueBookings?.length}
                </span>
              </div>
            )}

            {userLoggedIn && (
              <>
                <button
                  onClick={logout}
                  className="btn btn-xs bg-cBlack text-gray-100 hover:bg-cBlue"
                >
                  Signout
                </button>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <label htmlFor="my-drawer" className="drawer-button">
              <GiHamburgerMenu className="text-cDeepBlue text-xl" />
            </label>
            <div className="drawer z-10">
              <input
                ref={drawerCheckboxRef}
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-1/2 min-h-full bg-cDeepBlue  text-white">
                  {/* Sidebar content here */}
                  <li>
                    <CustomLink
                      onClick={closeDrawer}
                      href="/"
                      title="Home"
                      className=""
                    />
                  </li>
                  <li>
                    <CustomLink
                      onClick={closeDrawer}
                      href="/services"
                      title="Services"
                      className=""
                    />
                  </li>
                  
                  <li>
                    <CustomLink
                      onClick={closeDrawer}
                      href="/events"
                      title="Events"
                      className=""
                    />
                  </li>
                  <li>
                    <CustomLink
                      onClick={closeDrawer}
                      href="/cart"
                      title="Cart"
                      className=""
                    />
                  </li>
                  {userLoggedIn ? (
                    <>
                    <li>
                      <button
                        onClick={() => {
                          const dialog = document.getElementById(
                            "notification_modal"
                          ) as HTMLDialogElement;
                          if (dialog) {
                            closeDrawer();
                            dialog.showModal();
                          }
                        }}
                      >
                        Notification <span className="text-cOrange font-mono text-base">{statusTrueBookings?.length}</span>
                      </button>
                    </li>
                      <li>
                        <CustomLink
                          onClick={closeDrawer}
                          href="/dashboard"
                          title="Dashboard"
                          className=""
                        />
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className=" text-gray-100 "
                        >
                          Signout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <CustomLink
                        onClick={closeDrawer}
                        href="/signin"
                        title="Signin"
                        className=""
                      />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <NotificationModel statusTrueBookings={statusTrueBookings} />
          {/* ------------------- */}
        </div>
      </div>
    </>
  );
};

export default Headers;
