"use client";

import Button from "@/components/ui/Button";
import CoursesTable from "@/components/ui/dashboard/ServicesTable";
import Link from "next/link";
import { BiSolidRightArrow } from "react-icons/bi";

const ServicePage = () => {
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-5 px-5">
        <h1 className="md:text-3xl text-2xl uppercase text-center font-bold">
          Services
        </h1>
        <Link href="/service-list/add-service">
          <button className="btn btn-sm bg-cDeepBlue text-gray-100 hover:bg-cOrange py-2 w-40 rounded-full flex items-center justify-center">
            <span className="text-gray-100 mr-3">
              <BiSolidRightArrow />
            </span>{" "}
            Add Service
          </button>
        </Link>
      </div>
      <div className="">
        <CoursesTable />
      </div>
    </div>
  );
};

export default ServicePage;
