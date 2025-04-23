'use client'

import Image from "next/image";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import person from "../../../assets/profile.png";
import { useState } from "react";
import { useGetReviewsQuery } from "@/redux/api/reviewsApi";
import HashLoading from "../HashLoading";

const StudentsReview = () => {
  const query: Record<string, any> = {};

  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["sortBy"] = "rating";
  query["sortOrder"] = 'desc';

  const { data, isLoading } = useGetReviewsQuery({ ...query });

  const reviews = data?.reviews;
  const meta = data?.meta;

  if (isLoading) return <HashLoading />;

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center md:py-20 py-10 px-5 md:px-16">
      <div className="flex flex-col">
        <div className="flex items-center justify-center md:justify-start">
          <div className="border-b-2 w-20 border-cOrange mr-3"></div>
          <p className="text-cOrange">Reviews from who got our any service</p>
        </div>
        <h1 className="lg:text-4xl text-3xl font-semibold mb-5">
          See What Our <span className="text-cBlue">Lovely</span>
          <br />
          Students Say About Us
        </h1>

        <p className="">
          Find a tutor is like finding a piece of missing heart, so find it
          carefully and invest your time into it.
        </p>
      </div>

      <div className="lg:col-span-2 col-span-1">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          className="mySwiper"
        >
          {reviews?.map((review: any) => (
            <SwiperSlide key={review.id}>
              <div className="flex flex-col border bg-gray-50 shadow-lg border-cDeepBlue rounded-xl p-5 h-44 text-cDeepBlue">
                <div className="flex items-center">
                  <Image
                    src={person}
                    alt="person"
                    width={50}
                    height={50}
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                  <div className="ml-3">
                    <h1 className=" font-semibold">
                      {review?.studentId?.name}
                    </h1>
                    <p className="">{review?.studentId?.email}</p>
                  </div>
                </div>
                <div className="text-left mt-3 text-sm">
                  <p className="">
                    Rating:{" "}
                    <span className="font-semibold text-base ">
                      {review?.rating}
                    </span>
                  </p>
                  <p className="">{review.description.slice(0, 120)}...</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StudentsReview;
