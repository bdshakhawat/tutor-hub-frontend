"use client";

import Image from "next/image";
import imagelogo from "../../assets/profile.png";

const EventCard = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 items-center h-full bg-gray-100 shadow-lg rounded-lg hover:border-l-4 border-l-cOrange text-cBlack transition delay-500 py-5">
      <div className="col-span-1 border-r flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">02</h1>
        <p>Octaber, 2023</p>
      </div>
      <div className="col-span-3">
        <div className="flex md:flex-row flex-col gap-5 items-center justify-between px-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm">New York, US</p>
            <h1 className="text-2xl uppercase font-semibold">
              Global education fall meeting for everyone
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <Image
                src={imagelogo}
                alt=""
                width={20}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <span>John Doe</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <p className="bg-gray-300 py-2 px-4 rounded-lg font-semibold">
              10:30am - 12:30pm
            </p>
            <button className="border-2 border-cBlue hover:bg-cBlue transition-colors py-2 px-4 rounded-lg text-base font-semibold hover:text-white">
              View Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
