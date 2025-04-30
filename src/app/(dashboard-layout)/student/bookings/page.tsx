"use client";

import { getUserInfo } from "@/services/auth.service";
import { useState, useEffect } from "react";
import BreadCrumb from "../../../../components/ui/BreadCrumb";

// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

interface IService {
  subject: string;
}

interface IBatch {
  amountPerWeek: number;
  daysPerWeek: number;
}

interface IBooking {
  _id: string;
  serviceId: IService;
  startDate: string;
  endDate: string;
  batch: IBatch;
  status: boolean;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Initialize user data and token
  useEffect(() => {
    const user = getUserInfo() as { id: string; role: string; };
    if (user?.id) {
      setUserId(user.id);
    }
    // Client-side token access
    if (typeof window !== "undefined") {
      setAccessToken(localStorage.getItem("accessToken"));
    }
  }, []);

  // Fetch bookings when user ID and token are available
  useEffect(() => {
    if (!userId || !accessToken) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(
          `${API_URL}/api/v1/bookings/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        // Handle unauthorized (401) responses
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          throw new Error("Session expired. Please login again.");
        }

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setBookings(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch bookings");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, accessToken]);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="max-w-4xl mx-auto p-4">
        <BreadCrumb />
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              {error.includes("Session expired") && (
                <div className="mt-2">
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BreadCrumb />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h1>
      
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount/Week
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days/Week
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.serviceId?.subject || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(booking.startDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(booking.endDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.batch?.amountPerWeek || "0"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.batch?.daysPerWeek || "0"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No bookings found. Start by booking a tutor session.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
// "use client";

// import { getUserInfo } from "@/services/auth.service";
// import { useState, useEffect } from "react";
// import BreadCrumb from "../../../../components/ui/BreadCrumb";
// import HashLoading from "@/components/ui/HashLoading";

// interface IBooking {
//   _id: string;
//   serviceId: {
//     subject: string;
//   };
//   startDate: string;
//   endDate: string;
//   batch: {
//     amountPerWeek: number;
//     daysPerWeek: number;
//   };
//   status: boolean;
// }

// const BookingList = () => {
//   const [bookings, setBookings] = useState<IBooking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string>("");

//   useEffect(() => {
//     const user = getUserInfo();
//     if (user?.id) {
//       setUserId(user.id);
//     }
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `http://localhost:5000/api/v1/bookings/user/${userId}`
//         );
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setBookings(data.data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch bookings");
//         console.error("Error fetching bookings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [userId]);

//   if (loading) return <HashLoading />;
//   if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

//   console.log("All Bookings Data:", bookings);

//   return (
//     <div>
//       <BreadCrumb />
//       <div className="overflow-x-auto">
//         <table className="table lg:table-lg table-xs">
//           <thead className="bg-cBlue text-gray-100 lg:text-base">
//             <tr>
//               <th>Serial</th>
//               <th>Subject</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Amount/Week</th>
//               <th>Days/Week</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody className="text-base">
//             {bookings.length > 0 ? (
//               bookings.map((booking, index) => (
//                 <tr key={booking._id}>
//                   <th>{index + 1}</th>
//                   <td>{booking.serviceId?.subject}</td>
//                   <td>{new Date(booking.startDate).toLocaleDateString()}</td>
//                   <td>{new Date(booking.endDate).toLocaleDateString()}</td>
//                   <td>${booking.batch?.amountPerWeek}</td>
//                   <td>{booking.batch?.daysPerWeek}</td>
//                   <td>
//                     {booking.status ? (
//                       <span className="text-cBlue">Accepted</span>
//                     ) : (
//                       <span className="text-cOrange">Pending</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="text-center py-4">
//                   No bookings found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BookingList;


// // "use client";

// // import { useGetBookingByUserIdQuery } from "@/redux/api/bookingApi";
// // import { getUserInfo } from "@/services/auth.service";
// // import { useState } from "react";
// // import BreadCrumb from "../../../../components/ui/BreadCrumb";

// // const BookingList = () => {
// //   const loggedUser: any = getUserInfo();
// //   const { id } = loggedUser;

// //   const [page, setPage] = useState<number>(1);
// //   const [size, setSize] = useState<number>(10);
// //   const [sortBy, setSortBy] = useState<string>("");
// //   const [sortOrder, setSortOrder] = useState<string>("");

// //   const query: Record<string, any> = {
// //     limit: size,
// //     page: page,
// //     sortBy: sortBy,
// //     sortOrder: sortOrder,
// //   };

// //   const { data, isLoading } = useGetBookingByUserIdQuery({ id, ...query });
// //   const bookings = data?.data;

// //   return (
// //     <div>
// //       <BreadCrumb />
// //       <div className="overflow-x-auto">
// //         <table className="table lg:table-lg table-xs">
// //           <thead className="bg-cBlue text-gray-100 lg:text-base">
// //             <tr>
// //               <th>Serial</th>
// //               <th>Subject</th>
// //               <th>Start Date</th>
// //               <th>End Date</th>
// //               <th>Amount/Week</th>
// //               <th>Days/Week</th>
// //               <th>Status</th>
// //             </tr>
// //           </thead>
// //           <tbody className="text-base">
// //             {bookings &&
// //               bookings.map((booking: any, index: number) => (
// //                 <tr key={booking?._id}>
// //                   <th>{index + 1}</th>
// //                   <td>{booking?.serviceId?.subject}</td>
// //                   <td>{booking?.startDate}</td>
// //                   <td>{booking?.endDate}</td>
// //                   <td>{booking?.batch?.amountPerWeek}</td>
// //                   <td>{booking?.batch?.daysPerWeek}</td>
// //                   <td>
// //                     {booking?.status ? (
// //                       <span className="text-cBlue">Accepted</span>
// //                     ) : (
// //                       <span className="text-cOrange">Pending</span>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingList;


// // // import BookingList from "../../../../components/ui/dashboard//BookingList";


// // // const BookingsPage = () => {
// // //   return (
// // //     <div className="min-h-screen">
// // //       <div className="flex items-center justify-between mb-5 px-5">
// // //         <h1 className="md:text-3xl text-2xl uppercase text-center font-bold">
// // //           Bookings
// // //         </h1>
// // //       </div>
// // //       <div className="">
// // //         <BookingList />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BookingsPage;
