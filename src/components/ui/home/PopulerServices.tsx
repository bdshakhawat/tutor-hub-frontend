'use client'

import { useGetServicesQuery } from "@/redux/api/serviceApi";
import SectionTitle from "../SectionTitle";
import ServiceCard from "../ServiceCard";
import { BiSolidRightArrow } from "react-icons/bi";
import Link from "next/link";
import HashLoading from "../HashLoading";

const PopulerServices = () => {
  const query: Record<string, any> = {};

  query["sortBy"] = 'rating';
  query["sortOrder"] = 'desc';

  const { data, isLoading } = useGetServicesQuery({ ...query });

  if (isLoading) return <HashLoading />;
  const services = data?.services;
  // console.log(services);

  const populerServices = services?.filter((service: any) => service.isPopular);
  // console.log(populerServices);


  return (
    <div className="md:py-20 py-10 md:px-16 px-5">
      <SectionTitle
        title="Our Populer Services"
        subtitle="Some of our most popular tutors are giving this services"
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
        {populerServices?.map((service: any) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Link href="/services">
          <button className="btn bg-cBlue text-white btn-sm hover:bg-cOrange w-40 rounded-full flex items-center justify-center">
            <span className=" mr-3">
              <BiSolidRightArrow />
            </span>{" "}
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopulerServices;
