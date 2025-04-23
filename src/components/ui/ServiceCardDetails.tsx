"use client";

/* eslint-disable @next/next/no-img-element */
import { useGetReviewsByCourseIdQuery } from "@/redux/api/reviewsApi";
import { useGetSingleServiceQuery } from "@/redux/api/serviceApi";
import BookingModal from "./BookingModal";
import HashLoading from "./HashLoading";
import ServiceReview from "./ServiceReview";
import { BsStar, BsStarFill } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";

const ServiceCardDetails = ({ id }: any) => {
  const { data, isLoading } = useGetSingleServiceQuery(id);
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);

  if (isLoading) return <HashLoading />;
  // console.log(data);
  const {
    _id,
    subject,
    price,
    level,
    seats,
    enrolled,
    isAvailable,
    rating,
    instructorId,
    description,
    location,
    image,
    classtime,
  } = data;

  const stars = [];
  const roundedRating = Math.ceil(rating);
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<BsStarFill key={i} className="text-cOrange" />);
    } else {
      stars.push(<BsStar key={i} className="text-cOrange" />);
    }
  }

  const handleToggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };

  return (
    <div className="min-h-screen py-14 md:px-24 px-5">
      <div className="flex md:flex-row flex-col justify-between items-start gap-10">
        <div className="flex flex-col gap-5 lg:basis-1/4 md:basis-[40%] basis-1">
          <Image
            src={image}
            alt="service image"
            width={750}
            height={850}
            className="border border-gray-800 rounded-lg"
          />
          <div className="">
            <button
              onClick={() => {
                const dialog = document.getElementById(
                  data?._id
                ) as HTMLDialogElement;
                if (dialog) {
                  dialog.showModal();
                }
              }}
              className="btn w-full hover:bg-cBlue bg-cOrange border-none text-gray-200"
            >
              Book Now
            </button>
            {data && <BookingModal service={data} />}
          </div>
        </div>

        <div className="lg:basis-3/4 md:basis-[60%] basis-1">
          <p className="flex gap-1 text-sm">{stars}</p>
          <div className="flex items-center gap-3 mt-2">
            <h1 className="text-4xl font-bold uppercase">{subject}</h1>
            {
              <p className="text-xs font-medium uppercase">
                {isAvailable ? (
                  <span className="text-green-400 border border-cBlue p-1">
                    Available
                  </span>
                ) : (
                  <span className="text-red-400 border border-cOrange p-1">
                    Not Available
                  </span>
                )}
              </p>
            }
          </div>
          <h1 className="font-semibold">
            <span className="font-bold text-cBlack">Instructor :</span>{" "}
            <span className="text-cOrange">{instructorId?.name}</span>
          </h1>
          <h1 className="font-semibold">
            <span className="font-bold text-cBlack">Level :</span>{" "}
            <span className="text-cOrange">{level}</span>
          </h1>
          <div className="flex flex-col md:flex-row md:gap-3">
            <h1 className="font-semibold">
              <span className="font-bold text-cBlack">Seats :</span>{" "}
              <span className="text-cOrange">{seats}</span>
            </h1>
            <h1 className="font-semibold">
              <span className="font-bold text-cBlack">Enrolled :</span>{" "}
              <span className="text-cOrange">{enrolled}</span>
            </h1>

            <h1 className="font-semibold">
              <span className="font-bold text-cBlack">Class Start :</span>{" "}
              <span className="text-cOrange">{classtime}</span>
            </h1>
          </div>
          <h1 className="font-semibold">
            <span className="font-bold text-cBlack">Location :</span>{" "}
            <span className="text-cOrange">{location}</span>
          </h1>
          <hr className="my-3" />
          <p className="text-gray-500 mt-2">
            {isFullDescriptionShown
              ? description
              : `${description.slice(0, 700)}...`}
            <span onClick={handleToggleDescription} className="underline cursor-pointer text-blue-500 text-sm">
              {isFullDescriptionShown ? "See Less" : "See More"}
            </span>
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <div className="">
              <h1 className="font-bold text-cBlack mb-2">Services :</h1>
              <div className="flex md:flex-row flex-col md:items-center gap-2">
                {price?.map((priced: any) => (
                  <button
                    className="lg:text-lg  py-2 px-3 rounded-lg text-gray-800 border border-cDeepBlue"
                    key={priced._id}
                  >
                    Day/Week :{" "}
                    <span className="font-semibold text-cOrange">
                      {priced.daysPerWeek}
                    </span>{" "}
                    - Price/Week :{" "}
                    <span className="font-semibold text-cOrange">
                      {priced.amountPerWeek}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* review */}

      <div className="border-t border-gray-300 mt-10 pt-16">
        <ServiceReview id={_id} />
      </div>
    </div>
  );
};

export default ServiceCardDetails;
