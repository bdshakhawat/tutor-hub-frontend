"use client";

import UsersTable from "@/components/ui/dashboard/UsersTable";
import React from "react";

const UsersPage = () => {
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-5 px-5">
        <h1 className="md:text-3xl text-2xl uppercase text-center font-bold">
          Users
        </h1>
      </div>
      <div className="">
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;
