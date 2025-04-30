"use client";

import HashLoading from "@/components/ui/HashLoading";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import newImage from "../../../assets/teacher.jpg"

const ProfileDetails = () => {
  const loggedUser: any = getUserInfo();
  console.log(loggedUser);

  const { data, isLoading } = useGetSingleUserQuery(loggedUser?.id);
  console.log(data);

  if (isLoading) {
    return <HashLoading />;
  }

    console.log(data);

  return (
    <div className="border border-gray-200 lg:w-1/2 w-full py-10 px-5 shadow-lg rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold uppercase text-center mb-3">
          {data?.name}
        </h1>
        <Image
          src={newImage}
          alt="profile"
          width={200}
          height={200}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <p className=" text-xl">Email:{data?.email}</p>
        <p className=" text-xl font-semibold">Role:{data?.role}</p>
        <p>Phone Number: {data?.phonenumber}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
