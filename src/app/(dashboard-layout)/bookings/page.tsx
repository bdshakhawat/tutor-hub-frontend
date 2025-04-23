"use client";

import BookingList from "../../../components/ui/dashboard/BookingList";


const BookingsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-5 px-5">
        <h1 className="md:text-3xl text-2xl uppercase text-center font-bold">
          Bookings
        </h1>
      </div>
      <div className="">
        <BookingList />
      </div>
    </div>
  );
};

export default BookingsPage;
