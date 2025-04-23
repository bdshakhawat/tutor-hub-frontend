"use client";

import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/redux/api/serviceApi";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BreadCrumb from "../BreadCrumb";
import HashLoading from "../HashLoading";

const CoursesTable = () => {
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

  const { data, isLoading } = useGetServicesQuery({ ...query });
  const [deleteService] = useDeleteServiceMutation();

  if (isLoading) return <HashLoading />;
  const services = data?.services;
  const meta = data?.meta;

  //   console.log(services);

  const handleDelete = async (id: string) => {
    const res = await deleteService(id).unwrap();
    // console.log(res._id, id);

    if (res._id === id) {
      toast.success("Service Deleted Successfully");
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
              <th>Subject</th>
              <th>Available</th>
              <th>Instructor</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {services?.map((service: any, index) => (
              <tr key={service.id}>
                <th>{index + 1}</th>
                <td>{service?.subject}</td>
                <td>{service?.isAvailable ? "Available" : "Not Available"}</td>
                <td>{service?.instructorId?.name}</td>
                <td>
                  <Link
                    href={`service-list/update-service/${service?._id}`}
                  >
                    <button className="text-xl text-cBlue">
                      <AiOutlineEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(service?._id)}
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

export default CoursesTable;
