"use client";

import CourseBanner from "@/components/ui/Banner";
import HashLoading from "@/components/ui/HashLoading";
import ServiceCard from "@/components/ui/ServiceCard";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

const AllServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [level, setLevel] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["isAvailable"] = availability;
  query["level"] = level;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetServicesQuery({ ...query });

  if (isLoading) return <HashLoading />;
  
  const services = data?.services;
  const meta = data?.meta;

  console.log(services);

  const handleAvailabilityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setAvailability(
      selectedValue === "available"
        ? true
        : selectedValue === "not-available"
        ? false
        : null
    );
  };

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setLevel(selectedValue);
  };

  const resetAllQuery = () => {
    setAvailability(null);
    setLevel("");
    setSearchTerm("");
    setSortBy("");
    setSortOrder("");
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1) return;
    if (meta?.total && pageNumber > meta.total/size) return;

    setPage(pageNumber);
  };

  if (isLoading) return <HashLoading />;

  return (
    <div className="">
      <CourseBanner title="Services" />

      <div className="lg:w-3/4 w-[90%] mx-auto rounded-lg bg-gray-200 py-3 flex md:flex-row flex-col items-center justify-between gap-2 px-5 mt-5">
        <div className="relative w-full md:w-[40%] lg:w-1/2">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="subject, location, tutor.."
            className="input input-sm md:input-md border-cBlack outline-none focus:outline-cOrange focus:border-none lg:w-72 w-full md:pl-10 pl-8"
          />
          <BsSearch className="absolute top-1/2 md:left-4 left-2 -translate-y-1/2" />
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <select
              id="level"
              value={level}
              onChange={handleLevelChange}
              className="select select-sm md:select-md border border-cBlack input focus:outline focus:outline-cOrange focus:border-none w-full text-base"
            >
              <option value="" disabled>
                Level
              </option>
              <option value="junior">Junior</option>
              <option value="secondary">Secondary</option>
              <option value="higher-secondary">Higher Secondary</option>
            </select>
          </div>
          <div className="">
            <select
              id="availability"
              value={
                availability === true
                  ? "available"
                  : availability === false
                  ? "not-available"
                  : ""
              }
              onChange={handleAvailabilityChange}
              className="select select-sm md:select-md border border-cBlack input focus:outline focus:outline-cOrange focus:border-none w-full text-base"
            >
              <option value="" disabled>
                Availability
              </option>
              <option value="available" className="text-green-500">
                Available
              </option>
              <option value="not-available" className="text-red-500">
                Not Available
              </option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                if (sortBy === "rating") {
                  setSortOrder((prevSortOrder) =>
                    prevSortOrder === "asc" ? "desc" : "asc"
                  );
                } else {
                  setSortBy("rating");
                  setSortOrder("desc");
                }
              }}
              className="flex items-center gap-1 border rounded-lg md:py-[10px] py-[3px] px-3 border-cBlack cursor-pointer text-cBlack bg-white"
            >
              <h1 className="">Rating</h1>
              <button>
                <BiSort />
              </button>
            </div>
          </div>
          <div>
            {(availability !== null ||
              level !== "" ||
              searchTerm !== "" ||
              !!sortBy ||
              !!sortOrder) && (
              <button
                onClick={resetAllQuery}
                className="bg-white p-[3px] rounded-full text-xl"
              >
                <GrPowerReset />
              </button>
            )}
          </div>
        </div>
      </div>

      {services?.length === 0 ? (
        <>
          <p className="text-center text-xl font-semibold mt-5">
            Service not found
          </p>
        </>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10 px-5">
            {services?.map((service: any) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </>
      )}

      {/* pagination */}
      <div className="flex items-center justify-center">
        <div className="join border border-cDeepBlue hover:border-cDeepBlue">
          <button
            className="join-item btn btn-sm"
            onClick={() => handlePageChange(page - 1)}
          >
            «
          </button>
          <button className="join-item btn btn-sm bg-cDeepBlue hover:bg-cDeepBlue hover:border-cDeepBlue border border-cDeepBlue text-white">
            Page {page}
          </button>
          <button
            className="join-item btn btn-sm"
            onClick={() => handlePageChange(page + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllServicePage;




// "use client";

// import CourseBanner from "@/components/ui/Banner";
// import HashLoading from "@/components/ui/HashLoading";
// import ServiceCard from "@/components/ui/ServiceCard";
// import { useGetServicesQuery } from "@/redux/api/serviceApi";
// import { useDebounced } from "@/redux/hooks";
// import { ChangeEvent, useEffect, useState } from "react";
// import { BiSort } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import { GrPowerReset } from "react-icons/gr";

// const AllServicePage = () => {
//   const query: Record<string, any> = {};

//   const [page, setPage] = useState<number>(1);
//   const [size, setSize] = useState<number>(10);
//   const [sortBy, setSortBy] = useState<string>("");
//   const [sortOrder, setSortOrder] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [availability, setAvailability] = useState<boolean | null>(null);
//   const [level, setLevel] = useState<string>("");

//   query["limit"] = size;
//   query["page"] = page;
//   query["sortBy"] = sortBy;
//   query["sortOrder"] = sortOrder;
//   query["isAvailable"] = availability;
//   query["level"] = level;

//   const debouncedSearchTerm = useDebounced({
//     searchQuery: searchTerm,
//     delay: 600,
//   });

//   if (!!debouncedSearchTerm) {
//     query["searchTerm"] = debouncedSearchTerm;
//   }

//   const { data, isLoading } = useGetServicesQuery({ ...query });

//   if (isLoading) return <HashLoading />;
  
//   const services = data?.services;
//   const meta = data?.meta;

//   console.log(services);

//   const handleAvailabilityChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = event.target.value;
//     setAvailability(
//       selectedValue === "available"
//         ? true
//         : selectedValue === "not-available"
//         ? false
//         : null
//     );
//   };

//   const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = event.target.value;
//     setLevel(selectedValue);
//   };
//   // console.log(level);

//   const resetAllQuery = () => {
//     setAvailability(null);
//     setLevel("");
//     setSearchTerm("");
//     setSortBy("");
//     setSortOrder("");
//   };

//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber < 1) return;
//     if (meta?.total && pageNumber > meta.total/size) return;

//     setPage(pageNumber);
//   };

//   if (isLoading) return <HashLoading />;

//   return (
//     <div className="">
//       <CourseBanner title="Services" />

//       <div className="lg:w-3/4 w-[90%] mx-auto rounded-lg bg-gray-200 py-3 flex md:flex-row flex-col items-center justify-between gap-2 px-5 mt-5">
//         <div className="relative w-full md:w-[40%] lg:w-1/2">
//           <input
//             type="text"
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="subject, location, tutor.."
//             className="input input-sm md:input-md border-cBlack outline-none focus:outline-cOrange focus:border-none lg:w-72 w-full md:pl-10 pl-8"
//           />
//           <BsSearch className="absolute top-1/2 md:left-4 left-2 -translate-y-1/2" />
//         </div>
//         <div className="flex items-center space-x-2">
//           <div>
//             <select
//               id="level"
//               onChange={handleLevelChange}
//               className="select select-sm md:select-md border border-cBlack input focus:outline focus:outline-cOrange focus:border-none w-full text-base"
//             >
//               <option disabled selected>
//                 Level
//               </option>
//               <option value="junior" id="level" className="">
//                 Junior
//               </option>
//               <option value="secondary" id="level" className="">
//                 Secondary
//               </option>
//               <option value="higher-secondary" id="level" className="">
//                 Higher Secondary
//               </option>
//             </select>
//           </div>
//           <div className="">
//             <select
//               id="availability"
//               onChange={handleAvailabilityChange}
//               className="select select-sm md:select-md border border-cBlack input focus:outline focus:outline-cOrange focus:border-none w-full text-base"
//             >
//               <option disabled selected>
//                 Availability
//               </option>
//               <option
//                 value="available"
//                 id="availability"
//                 className="text-green-500"
//               >
//                 Available
//               </option>
//               <option
//                 value="not-available"
//                 id="availability"
//                 className="text-red-500"
//               >
//                 Not Available
//               </option>
//             </select>
//           </div>
//           <div className="flex items-center gap-2">
//             {/* <div
//               onClick={() => {
//                 if (sortBy === "level") {
//                   setSortOrder((prevSortOrder) =>
//                     prevSortOrder === "asc" ? "desc" : "asc"
//                   );
//                 } else {
//                   setSortBy("level");
//                   setSortOrder("desc");
//                 }
//               }}
//               className="flex items-center gap-1 border-2 py-1 px-3 border-gray-300 cursor-pointer"
//             >
//               <h1 className="text-base font-semibold">Level</h1>
//               <button>
//                 <BiSort />
//               </button>
//             </div> */}
//             <div
//               onClick={() => {
//                 if (sortBy === "rating") {
//                   setSortOrder((prevSortOrder) =>
//                     prevSortOrder === "asc" ? "desc" : "asc"
//                   );
//                 } else {
//                   setSortBy("rating");
//                   setSortOrder("desc");
//                 }
//               }}
//               className="flex items-center gap-1 border rounded-lg md:py-[10px] py-[3px] px-3 border-cBlack cursor-pointer text-cBlack bg-white"
//             >
//               <h1 className="">Rating</h1>
//               <button>
//                 <BiSort />
//               </button>
//             </div>
//           </div>
//           <div>
//             {(availability !== null ||
//               level !== "" ||
//               searchTerm !== "" ||
//               !!sortBy ||
//               !!sortOrder) && (
//               <button
//                 onClick={resetAllQuery}
//                 className="bg-white p-[3px] rounded-full text-xl"
//               >
//                 <GrPowerReset />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {services?.length === 0 ? (
//         <>
//           <p className="text-center text-xl font-semibold mt-5">
//             Service not found
//           </p>
//         </>
//       ) : (
//         <>
//           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10 px-5">
//             {services?.map((service: any) => (
//               <ServiceCard key={service._id} service={service} />
//             ))}
//           </div>
//         </>
//       )}

//       {/* pagination */}
//       <div className="flex items-center justify-center">
//         <div className="join border border-cDeepBlue hover:border-cDeepBlue">
//           <button
//             className="join-item btn btn-sm"
//             onClick={() => handlePageChange(page - 1)}
//           >
//             «
//           </button>
//           <button className="join-item btn btn-sm bg-cDeepBlue hover:bg-cDeepBlue hover:border-cDeepBlue border border-cDeepBlue text-white">
//             Page {page}
//           </button>
//           <button
//             className="join-item btn btn-sm"
//             onClick={() => handlePageChange(page + 1)}
//           >
//             »
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllServicePage;
