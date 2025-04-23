"use client";

import HashLoading from "@/components/ui/HashLoading";
import { useGetSingleBookingQuery } from "@/redux/api/bookingApi";
import { usePaymentOrderMutation } from "@/redux/api/orderApi";
import { useGetSingleServiceQuery } from "@/redux/api/serviceApi";
import axios from "axios";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type FormValues = {
  name: string;
  email: string;
  phonenumber: string;
  address: string;
};

const CheckoutPage = ({ id }: any) => {
  const { data: bookingData, isLoading: bookingLoading } =
    useGetSingleBookingQuery(id);
  const { data: serviceData, isLoading: serviceLoading } =
    useGetSingleServiceQuery(bookingData?.serviceId?._id);

  const [paymentOrder] = usePaymentOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  if (bookingLoading || serviceLoading) {
    return <HashLoading />;
  }
  // console.log(bookingData);
  //   console.log(serviceData);
  const { image, subject } = serviceData;

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const newData = {
      ...data,
      bookingId: bookingData?._id,
      serviceId: bookingData?.serviceId?._id,
      batchId: bookingData?.batch?._id,
    };
    // console.log(newData);
    axios
      .post(
        "https://elite-educators-backend.vercel.app/api/v1/orders/payment-order",
        newData
      )
      .then((response) => {
        window.location.replace(response.data.url);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.message}`,
        });
      });
  };

  return (
    <div className="relative">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="bg-cover bg-center w-full h-full absolute"
      ></div>
      <div className="bg-black opacity-60 h-full w-full absolute"></div>
      <div className="relative z-10">
        <div className="container mx-auto py-10">
          <div className="flex items-center justify-center h-screen">
            <div className="md:w-1/2 w-full">
              <div className="bg-white p-5 rounded-lg">
                <h3 className="font-bold text-lg uppercase text-center">
                  Checkout
                </h3>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-20 relative">
                      <Image
                        src={image}
                        alt={subject}
                        className="rounded-lg"
                        fill
                        sizes="100vw"
                        style={{
                          objectFit: "cover"
                        }} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{subject}</h4>
                      <p className="text-sm">
                        Days/Week : {bookingData?.batch?.daysPerWeek}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-lg">
                    ${bookingData?.batch?.amountPerWeek}
                  </p>
                </div>
                <div className="mt-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                      <label htmlFor="name" className="block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={bookingData?.userId?.name}
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cOrange focus:border-transparent"
                        {...register("name", { required: true })}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="email" className="block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={bookingData?.userId?.email}
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cOrange focus:border-transparent"
                        {...register("email", { required: true })}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="phone" className="block mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        value={bookingData?.userId?.phonenumber}
                        placeholder="Enter your phone"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cOrange focus:border-transparent"
                        {...register("phonenumber", { required: true })}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="address" className="block mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        placeholder="Enter your address"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cOrange focus:border-transparent"
                        {...register("address", { required: true })}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn w-full bg-cBlue hover:bg-cOrange transition-colors text-white"
                      >
                        Pay
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
