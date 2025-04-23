"use client";

/* eslint-disable @next/next/no-img-element */
import {
  addToCart,
  removeFromCart,
} from "@/redux/features/service/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsCart2, BsCartCheck, BsStar, BsStarFill } from "react-icons/bs";
import profile from "../../assets/user-profile.png";
import BookingModal from "./BookingModal";

const ServiceCard = ({ service }: any) => {
  const cartData = useAppSelector((state) => state.service.services);
  const dispatch = useAppDispatch();
  const [isInCart, setIsInCart] = useState(false);

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
    image,
    location
  } = service;

  const stars = [];
  const roundedRating = Math.ceil(rating);
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<BsStarFill key={i} className="text-cOrange" />);
    } else {
      stars.push(<BsStar key={i} className="text-cOrange" />);
    }
  }

  const handleAddToCart = () => {
    const check = cartData.find((item) => item._id === _id);
    if (check) {
      // If the item is in the cart, remove it
      dispatch(removeFromCart(service));
      toast.success("Removed from cart");
      setIsInCart(false);
    } else {
      // If the item is not in the cart, add it
      dispatch(addToCart(service));
      toast.success("Added to cart");
      setIsInCart(true);
    }
  };

  return (
    <div className="h-[500px] md:h-72 bg-gray-100 rounded-lg border border-cDeepBlue/20 shadow-lg flex flex-col md:flex-row text-cDeepBlue">
      <div className="w-full md:w-1/2 h-full">
        <div className="relative w-full h-full">
          <Image 
            src= "/images/Online learning-amico.png"
            alt="service image" 
            fill 
            sizes="100vw" 
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center p-3">
        <div className="flex flex-col space-y-2 text-base">
          <p className="flex gap-1 text-sm">{stars}</p>
          <h2 className="text-2xl font-bold">{subject}</h2>

          <p className="">
            <span className="font-semibold">Level:</span> {level}
          </p>
          <p className="">
            <span className="font-semibold">Location:</span>{" "}
            {location.slice(0, 20)}
          </p>
          <div className="flex items-center justify-between">
            <p className="">
              <span className="font-semibold">Seats:</span> {seats}
            </p>
            <p className="">
              <span className="font-semibold">Enrolled:</span> {enrolled}
            </p>
          </div>
          <p className="">
            <span className="font-semibold">Instructor:</span>{" "}
            {instructorId?.name}
          </p>
          <div className="flex gap-2">
            {price?.length > 0 ? (
              <>
                <button
                  onClick={() => {
                    const dialog = document.getElementById(
                      _id
                    ) as HTMLDialogElement;
                    if (dialog) {
                      dialog.showModal();
                    }
                  }}
                  className="btn bg-cBlue hover:bg-cOrange btn-sm border-none text-gray-200"
                >
                  Book Now
                </button>
              </>
            ) : (
              ""
            )}

            <Link href={`/services/${_id}`}>
              <button className="btn btn-sm border border-black hover:bg-gray-800 hover:text-white">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <BookingModal service={service} />
      {/* ------------------- */}
    </div>
  );
};

export default ServiceCard;
