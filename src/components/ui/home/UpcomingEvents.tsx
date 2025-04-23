"use client";

import React from "react";
import SectionTitle from "../SectionTitle";
import EventCard from "../EventCard";
import Link from "next/link";
import { BiSolidRightArrow } from "react-icons/bi";

const UpcomingEvents = () => {
  return (
    <div className="md:py-20 py-10 px-5 md:px-16">
      <SectionTitle
        title="Join our upcoming event"
        subtitle="Join our upcoming event and get a chance to meet with our tutors"
      />
      <div className="mt-5 flex flex-col gap-5">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>

      <div className="flex items-center justify-center mt-5">
        <Link href="/events">
          <button className="btn bg-cBlue text-white btn-sm hover:bg-cOrange w-40 rounded-full flex items-center justify-center">
            <span className=" mr-3">
              <BiSolidRightArrow />
            </span>{" "}
            Go to Events
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;
