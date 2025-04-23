'use client'

import Link from 'next/link';
import React from 'react'

const DashBoard = () => {
  return (
    <div className="min-h-screen">
      <div className="mb-5">
        <h1 className="md:text-3xl text-2xl uppercase text-center font-bold">
          Welcome to your personalized Dashboard
        </h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-12 px-16">
        <Link href="/dashboard">
          <div className=" bg-teal-400 rounded-lg py-16 flex items-center justify-center flex-col gap-3 shadow-lg">
            <h1 className="text-7xl font-bold">500</h1>
            <p className="text-3xl uppercase font-semibold">Students</p>
          </div>
        </Link>
        <Link href="/dashboard">
          <div className=" bg-teal-400 rounded-lg py-16 flex items-center justify-center flex-col gap-3 shadow-lg">
            <h1 className="text-7xl font-bold">70</h1>
            <p className="text-3xl uppercase font-semibold">Teacher</p>
          </div>
        </Link>
        <Link href="/dashboard/services">
          <div className=" bg-teal-400 rounded-lg py-16 flex items-center justify-center flex-col gap-3 shadow-lg">
            <h1 className="text-7xl font-bold">50</h1>
            <p className="text-3xl uppercase font-semibold">Courses</p>
          </div>
        </Link>
        <Link href="/dashboard">
          <div className=" bg-teal-400 rounded-lg py-16 flex items-center justify-center flex-col gap-3 shadow-lg">
            <h1 className="text-7xl font-bold">4.2</h1>
            <p className="text-3xl uppercase font-semibold">Reviews</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DashBoard