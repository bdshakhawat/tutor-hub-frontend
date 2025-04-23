"use client";

import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { IBooking } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";
import Swal from "sweetalert2";

const BookingModal = ({ service }: any) => {
  const loggedUser: any = getUserInfo();
  const [addBooking] = useAddBookingMutation();
  const router = useRouter();

  const { _id, subject, price, instructorId } = service;

  const [selectedPrice, setSelectedPrice] = useState<any>({});
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePrice = (price: any) => {
    setSelectedPrice(price);
  };

  const handleConfirmPrice = async () => {
    if (!loggedUser) {
      return toast.error("Please signin to book a service");
    }

    if (!selectedPrice?.daysPerWeek || !selectedPrice?.amountPerWeek) {
      return toast.error("Please select a price");
    }

    if (!formData.startDate || !formData.endDate) {
      return toast.error("Please select a date");
    }

    const batchdata = {
      daysPerWeek: selectedPrice?.daysPerWeek,
      amountPerWeek: selectedPrice?.amountPerWeek,
      _id: selectedPrice?._id,
    };

    if (loggedUser) {
      const data: IBooking = {
        userId: loggedUser?.id,
        serviceId: _id,
        batch: batchdata,
        status: false,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      const res = await addBooking({ ...data }).unwrap();
      if (res.id) {
        Swal.fire({
          title: "Booking Successful",
          text: "Please check your booking list",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Go to Bookings",
          cancelButtonText: "Stay here",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/bookings");
          }
        });
      }
    }
  };

  return (
    <dialog id={_id} className="modal">
      <div className="modal-box">
        <div className="text-center">
          <h3 className="font-bold text-cOrange text-xl">{subject}</h3>
          <p className="mt-1 text-xs">{instructorId?.name}</p>
        </div>
        <div className="mt-2 text-center">
          <p className="text-cBlack font-bold font-mono uppercase text-xl mb-2">
            Offered Service(per week) <br /> Choose One :
          </p>
          <div className="flex flex-col items-center gap-2">
            {price?.map((priced: any) => (
              <button
                onClick={() => handlePrice(priced)}
                className={` text-lg btn hover:bg-cOrange ${
                  selectedPrice === priced
                    ? "bg-cOrange text-gray-100"
                    : "bg-gray-100 text-cDeepBlue border border-cDeepBlue"
                }`}
                key={priced._id}
              >
                Days : {priced.daysPerWeek} - Price : {priced.amountPerWeek}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 justify-center items-center">
          <div>
            <label className="label">Start Date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="px-5 py-2 rounded-lg text-cDeepBlue border border-cDeepBlue"
            />
          </div>
          <div>
            <label className="label">End Date </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="px-5 py-2 rounded-lg text-cDeepBlue border border-cDeepBlue"
            />
          </div>
        </div>
        <div>
          <form method="dialog">
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleConfirmPrice}
                className="btn btn-sm btn-success"
                type="submit"
              >
                Confirm
              </button>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <ImCancelCircle />
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;
