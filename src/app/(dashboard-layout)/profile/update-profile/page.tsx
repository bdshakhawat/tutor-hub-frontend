'use client'

import HashLoading from "@/components/ui/HashLoading";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProfileUpdate = () => {
    const loggedUser: any = getUserInfo();
    const router = useRouter();

    const {
      handleSubmit,
      control,
      formState: { errors },
      reset,
    } = useForm();

    const { data, isLoading } = useGetSingleUserQuery(loggedUser?.id);
    const [updateUser] = useUpdateUserMutation();

    const onSubmit = async (userData: any) => {
        const id = loggedUser?.id;
        const res = await updateUser({ id, ...userData }).unwrap();
        
        if (res) {
          toast.success("Course updated successfully !");
          router.push("/profile");
          reset();
        }
    }

    if (isLoading) {
      return <HashLoading />;
    }
  return (
    <>
    <h1 className="text-center text-4xl font-semibold uppercase mb-5">Update Profile</h1>
      <div className=" flex items-center justify-center  px-5">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[650px] w-full">
          <div>
            <label className="label" htmlFor="name">Name:</label>
            <Controller
              name="name"
              control={control}
              defaultValue={data?.name}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none w-full"
                />
              )}
            />
          </div>
          <div>
            <label className="label" htmlFor="email">Email:</label>
            <Controller
              name="email"
              control={control}
              defaultValue={data?.email}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none  w-full"
                />
              )}
            />
          </div>
          <div>
            <label className="label" htmlFor="phonenumber">Phone Number:</label>
            <Controller
              name="phonenumber"
              control={control}
              defaultValue={data?.phonenumber}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none  w-full"
                />
              )}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn bg-cBlue text-gray-100 hover:bg-cOrange rounded-lg  w-full mt-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileUpdate;
