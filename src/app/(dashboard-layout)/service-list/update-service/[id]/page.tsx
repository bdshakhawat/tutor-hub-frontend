"use client";

import HashLoading from "@/components/ui/HashLoading";
import {
  useCreateServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { courseYupSchema } from "@/schemas/course";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiSolidRightArrow } from "react-icons/bi";

type IPrice = {
  amountPerWeek: number;
  daysPerWeek: number;
};

type FormValues = {
  subject: string;
  description: string;
  level: string;
  location: string;
  seats: number;
  classtime: string;
  price: IPrice[];
};

const UpdateServicePage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "price",
  });

  const userInfo: any = getUserInfo();
  const userId = userInfo?.id;

  const { data: serviceData } = useGetSingleServiceQuery(id);
  const [updateService] = useUpdateServiceMutation();

  
  useEffect(() => {
    if (serviceData?.price) {
      serviceData?.price.forEach((price: any) => {
        append(price);
      });
    }
  }, [serviceData?.price, append]);

  if (!serviceData) {
    return <HashLoading />;
  }
  

  const onSubmit = async (data: any) => {
    try {
      let newPrice: IPrice[] = [];
      data?.price?.forEach((price: any) => {
        const customizedPrice = {
          amountPerWeek: Number(price.amountPerWeek),
          daysPerWeek: Number(price.daysPerWeek),
        };
        newPrice.push(customizedPrice);
      });



      const service = {
        instructorId: userId,
        subject: data.subject,
        description: data.description,
        price: newPrice,
        level: data.level,
        location: data.location,
        seats: Number(data.seats),
        classtime: data.classtime,
      };

    //   console.log(service);
      const res = await updateService({ id, ...service }).unwrap();
    //   console.log(res);

      if (res) {
        toast.success("Course updated successfully !");
        router.push("/service-list");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };


  

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-5 px-10">
        <h1 className="lg:text-3xl text-2xl uppercase text-center font-bold">
          Update Service
        </h1>
        <Link href="/dashboard/services">
          <button className="btn btn-sm bg-cDeepBlue text-gray-100 hover:bg-cOrange py-2 w-40 rounded-full flex items-center justify-center">
            <span className="text-gray-100 mr-3">
              <BiSolidRightArrow />
            </span>{" "}
            Services
          </button>
        </Link>
      </div>

      {/* Add Course Form */}
      <div className="px-5">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid lg:grid-cols-3">
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Subject
              </label>
              <Controller
                name="subject"
                control={control}
                rules={{ required: "Subject is required" }}
                defaultValue={serviceData?.subject}
                render={({ field }) => (
                  <input
                    {...field}
                    id="subject"
                    type="text"
                    className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                  />
                )}
              />
              {errors.subject && (
                <p className="text-red-500 mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                defaultValue={serviceData?.description}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    className="textarea border border-cBlack focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="level"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Level
              </label>
              <Controller
                name="level"
                control={control}
                rules={{ required: "Level is required" }}
                defaultValue={serviceData?.level}
                render={({ field }) => (
                  <select
                    {...field}
                    id="level"
                    className="select border border-cBlack focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                  >
                    <option>Select Level</option>
                    <option value="junior" id="level">
                      Junior
                    </option>
                    <option value="secondary" id="level">
                      Secondary
                    </option>
                    <option value="higher-secondary" id="level">
                      Higher Secondary
                    </option>
                  </select>
                )}
              />
              {errors.level && (
                <p className="text-red-500 mt-1">{errors.level.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Location
              </label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                defaultValue={serviceData?.location}
                render={({ field }) => (
                  <input
                    {...field}
                    id="location"
                    type="text"
                    className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                  />
                )}
              />
              {errors.location && (
                <p className="text-red-500 mt-1">{errors.location.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="seats"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Seats
              </label>
              <Controller
                name="seats"
                control={control}
                defaultValue={serviceData?.seats}
                rules={{
                  required:
                    "Seats is required & value should be greater than 0",
                  min: 0,
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="seats"
                    type="number"
                    className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                  />
                )}
              />
              {errors.seats && (
                <p className="text-red-500 mt-1">{errors.seats.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="classtime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Classtime
              </label>
              <Controller
                name="classtime"
                control={control}
                rules={{ required: "Classtime is required" }}
                defaultValue={serviceData?.classtime}
                render={({ field }) => (
                  <input
                    {...field}
                    id="classtime"
                    type="time"
                    className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                  />
                )}
              />
              {errors.classtime && (
                <p className="text-red-500 mt-1">{errors.classtime.message}</p>
              )}
            </div>
          </div>

          {/* Array of IPrice objects */}
          <div className="grid lg:grid-cols-3">
            {fields.map((field, index: number) => (
              <div key={field.id}>
                <label
                  htmlFor={`price[${index}].amountPerWeek`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Price per Week
                </label>
                <Controller
                  name={`price.${index}.amountPerWeek`}
                  control={control}
                  rules={{ required: "Price per week is required", min: 0 }}
                  defaultValue={serviceData?.price[index]?.daysPerWeek}
                  render={({ field }) => (
                    <input
                      {...field}
                      id={`price[${index}].amountPerWeek`}
                      type="number"
                      className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                    />
                  )}
                />

                <label
                  htmlFor={`price[${index}].daysPerWeek`}
                  className="block text-gray-700 text-sm font-bold my-2"
                >
                  Days per Week
                </label>
                <Controller
                  name={`price.${index}.daysPerWeek`}
                  control={control}
                  rules={{ required: "Days per week is required", min: 0 }}
                  defaultValue={serviceData?.price[index]?.daysPerWeek}
                  render={({ field }) => (
                    <input
                      {...field}
                      id={`price[${index}].daysPerWeek`}
                      type="number"
                      className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                    />
                  )}
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn btn-sm bg-red-400 hover:bg-red-500 text-gray-800 mt-2"
                >
                  Remove Price
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-5 items-center mt-5">
            <button
              type="button"
              onClick={() => append({ amountPerWeek: 0, daysPerWeek: 0 })}
              className="btn btn-sm bg-cyan-400 hover:bg-cyan-500 text-gray-800"
            >
              Add Price
            </button>
            {/* End of array of IPrice objects */}

            {/* Add more fields based on your IService schema */}

            <button
              type="submit"
              className="btn btn-sm bg-cBlue text-gray-100 hover:bg-cOrange w-40 rounded-full flex items-center justify-center"
            >
              Submit
            </button>
          </div>
        </form>

        {/* {submittedData && (
          <div className="mt-4">
            <h2>Submitted Data:</h2>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UpdateServicePage;
