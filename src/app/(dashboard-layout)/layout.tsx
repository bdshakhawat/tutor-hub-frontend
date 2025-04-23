"use client";

import HashLoading from "@/components/ui/HashLoading";
import DashboardNav from "@/components/ui/dashboard/DashboardNav";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/signin");
    }

    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading) {
    return <HashLoading />;
  }

  return (
    <>
      <DashboardNav />
      <div className="flex">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="w-full py-5 overflow-x-auto overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
