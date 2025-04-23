"use client";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useRoleChangeMutation,
} from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import BreadCrumb from "../BreadCrumb";
import HashLoading from "../HashLoading";

const UsersTable = () => {
  const query: Record<string, any> = {};

  const loggedUser: any = getUserInfo();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useGetAllUsersQuery({ ...query });
  const [roleChange] = useRoleChangeMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.users;
  const meta = data?.meta;

  //   console.log(users);

  const handleRoleChange = async (id: string) => {
    // console.log(id);
    const res = await roleChange({ id }).unwrap();
    // console.log(res);

    if (res?._id === id) {
      toast.success("Role Changed Successfully");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteUser({ id }).unwrap();
    // console.log(res);

    if (res?._id === id) {
      toast.success("Service Deleted Successfully");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  if (isLoading) {
    return <HashLoading />;
  }

  return (
    <div className="">
      <BreadCrumb />
      <div className="overflow-x-auto">
        <table className="table lg:table-lg table-xs">
          <thead className="bg-cBlue text-gray-100 lg:text-base">
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone Number</th>
              {loggedUser?.role === "super_admin" && <th>Change Role</th>}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {users?.map((user: any, index) => (
              <tr key={user.id}>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{user?.phonenumber}</td>
                {loggedUser?.role === "super_admin" && (
                  <td>
                    <button
                      onClick={() => handleRoleChange(user?.id)}
                      className="btn btn-sm btn-outline text-cOrange"
                    >
                      {user?.role === "admin"
                        ? "Make User"
                        : user?.role === "super_admin"
                        ? "No Action"
                        : "Make Admin"}
                    </button>
                  </td>
                )}
                <td>
                  <button
                    onClick={() => handleDelete(user?._id)}
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

export default UsersTable;
