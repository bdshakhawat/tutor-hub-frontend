"use client";

import {
  useBookingStatusChangeMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingByUserIdQuery,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { IBooking } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BreadCrumb from "../BreadCrumb";

const BookingList = () => {
  const loggedUser: any = getUserInfo();
  const { id, role } = loggedUser;
  // console.log(role);

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data: dataByUserId, isLoading } = useGetBookingByUserIdQuery({
    id,
    ...query,
  });
  const { data: allData } = useGetAllBookingsQuery({ ...query });
  const [deleteBooking] = useDeleteBookingMutation();
  const [bookingStatusChange] = useBookingStatusChangeMutation();

  const bookings = dataByUserId?.services;
  const meta = dataByUserId?.meta;

  const allBookings = allData?.bookings;

  let bookingsData: any = [];
  if (loggedUser?.role === "user") {
    bookingsData = bookings;
  } else {
    bookingsData = allBookings;
  }

  // console.log(bookingsData);

  const handleDelete = async (id: string) => {
    const res = await deleteBooking(id).unwrap();

    if (res._id === id) {
      toast.success("Service Deleted Successfully");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const handleStatusChange = async (id: string) => {
    const res = await bookingStatusChange(id).unwrap();

    if (res._id === id) {
      toast.success("Booking Accepted Successfully");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="">
      <BreadCrumb />
      <div className="overflow-x-auto">
        <table className="table lg:table-lg table-xs">
          <thead className="bg-cBlue text-gray-100 lg:text-base">
            <tr>
              <th>Serial</th>
              {loggedUser?.role === "admin" && <th>User</th>}
              <th>Subject</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount/Week</th>
              <th>Days/Week</th>
              <th>Status</th>
              {(role === "admin" || role === "super_admin") && <th>Accept</th>}
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {bookingsData &&
              bookingsData?.map((booking: any, index: number) => (
                <tr key={booking?._id}>
                  <th>{index + 1}</th>
                  {loggedUser?.role === "admin" && (
                    <td>{booking?.userId?.name}</td>
                  )}
                  <td>{booking?.serviceId?.subject}</td>
                  <td>{booking?.startDate}</td>
                  <td>{booking?.endDate}</td>
                  <td>{booking?.batch?.amountPerWeek}</td>
                  <td>{booking?.batch?.daysPerWeek}</td>
                  <td>
                    {booking?.status ? (
                      <span className="text-cBlue">Accepted</span>
                    ) : (
                      <span className="text-cOrange">Pending</span>
                    )}
                  </td>
                  {(role === "admin" || role === "super_admin") && (
                    <td>
                      <button
                        onClick={() => handleStatusChange(booking?._id)}
                        className={`border  px-3 rounded-lg text-cBlack font-semibold ${
                          booking?.status
                            ? "btn-disabled border-gray-500 text-gray-400"
                            : "border-cBlue"
                        } `}
                      >
                        Accept
                      </button>
                    </td>
                  )}
                  <td>
                    <button
                      onClick={() => handleDelete(booking?._id)}
                      className="text-xl text-cOrange"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
