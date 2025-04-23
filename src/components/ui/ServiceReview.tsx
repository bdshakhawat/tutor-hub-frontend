"use client";

/* eslint-disable @next/next/no-img-element */
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsByCourseIdQuery,
} from "@/redux/api/reviewsApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import people from "../../assets/profile.png";
import HashLoading from "./HashLoading";

type ServiceReviewProps = {
  id: string;
};

const ServiceReview = ({ id }: ServiceReviewProps) => {
  const { control, handleSubmit, reset } = useForm();
  const loggedUser: any = getUserInfo();
  const query: Record<string, any> = {};

  const [visibleReviews, setVisibleReviews] = useState(3);

  const [addReview] = useAddReviewMutation();
  const { data: reviewsData, isLoading } = useGetReviewsByCourseIdQuery({
    id,
    ...query,
  });
  const [deleteReview] = useDeleteReviewMutation();

  if (isLoading) return <HashLoading />;

  const reviews = reviewsData?.reviews;
  // console.log(reviews);

  const onSubmit = async (data: any) => {
    if (data?.rating > 5 || data?.rating < 0)
      return toast.error("Rating must be between 0 to 5");
    else if (!data.rating || !data.description)
      return toast.error("Please fill all the fields");
    else if (loggedUser && loggedUser?.id) {
      const reviewData = {
        courseId: id,
        studentId: loggedUser?.id,
        description: data?.description,
        rating: Number(data?.rating),
      };

      // console.log(reviewData);
      try {
        await addReview({ ...reviewData }).unwrap();
        toast.success("Review added successfully");
        reset();
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleSeeMore = () => {
    if (reviews?.length) {
      setVisibleReviews(visibleReviews === 3 ? reviews.length : 3);
    }
  };

  const handleDelete = async (id: string) => {
    if (loggedUser && loggedUser?.id) {
      try {
        await deleteReview(id).unwrap();
        toast.success("Review deleted successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-4  md:grid-cols-3 grid-cols-1 gap-5">
      {/* reviews part------------------ */}
      <div className="lg:col-span-3 md:col-span-2 grid lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-16 grid-cols-1">
        {reviews?.slice(0, visibleReviews).map((review: any) => {
          const stars = [];
          const roundedRating = Math.ceil(review.rating);
          for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
              stars.push(<BsStarFill key={i} className="text-cOrange" />);
            } else {
              stars.push(<BsStar key={i} className="text-cOrange" />);
            }
          }
          return (
            <>
              <div
                key={review.id}
                className="bg-gray-100 rounded-lg relative lg:h-44 md:h-56 h-44"
              >
                {loggedUser &&
                  loggedUser?.id &&
                  loggedUser?.id === review.studentId.id && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="absolute top-2 right-2 cursor-pointer border border-cOrange rounded-full p-1"
                    >
                      <AiOutlineDelete className=" text-cOrange " />
                    </button>
                  )}
                <div className="absolute lg:-top-10 -top-8 left-1/2 -translate-x-1/2">
                  <div className="lg:w-20 w-16 h-16 lg:h-20 relative">
                    <Image
                      src={review.studentId.profileImgUrl}
                      alt="people"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="mt-12">
                  <div className="flex items-center justify-between px-[25%]">
                    {stars}
                  </div>
                  <div className="px-3">
                    <p className="text-center mt-2 font-bold">
                      {review.studentId.name}
                    </p>
                    <p className="text-center text-sm mt-2">
                      {review.description.slice(0, 120)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        {reviews && reviews.length > 0 && (
          <>
            <div className="w-full flex items-end">
              <button
                onClick={handleSeeMore}
                className="btn btn-sm w-1/2 mx-auto border border-black hover:bg-gray-800 hover:text-white"
              >
                {visibleReviews === 3 ? "See More" : "See Less"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* add review part------------------ */}
      <div className="lg:col-span-1 md:col-span-1 bg-gray-100 p-2 rounded-lg h-72">
        {loggedUser && loggedUser?.id && (
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* Review Description */}
            <div>
              <label className="label" htmlFor="description">
                Review Description
              </label>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Write your review here"
                    className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none w-full"
                  />
                )}
              />
            </div>

            {/* Review Rating */}
            <div>
              <label className="label" htmlFor="rating">
                Rating
              </label>
              <Controller
                name="rating"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none w-full"
                  />
                )}
              />
            </div>

            <button
              type="submit"
              className="btn w-full mt-6 border border-black hover:bg-gray-800 hover:text-white"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ServiceReview;
