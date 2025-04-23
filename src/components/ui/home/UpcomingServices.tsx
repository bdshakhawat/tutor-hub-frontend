"use client";

import { useGetServicesQuery } from "@/redux/api/serviceApi";
// import { useState } from "react";
import SectionTitle from "../SectionTitle";
import ServiceCard from "../ServiceCard";
import HashLoading from "../HashLoading";
import { IService } from "@/types";

const UpComingServices = () => {
  const query: Record<string, any> = {};

  query["sortBy"] = "rating";
  query["sortOrder"] = "desc";

  const { data, isLoading } = useGetServicesQuery({ ...query });
if (isLoading) return <HashLoading />;
  const services = data?.services as IService [];
  console.log(services);

  // const servicesWithoutPrice = services?.filter(
  //   (service) => !service.price || service.price.length === 0
  // );
  const servicesWithoutPrice = services.filter(service => {
  // Consider upcoming if:
  // 1. Price array exists but has amountPerWeek = 0
  // 2. Or if you add an explicit isUpcoming field later
  return service.price.some(p => p.amountPerWeek === 0);
});
  console.log(servicesWithoutPrice);

  return (
    <div className="md:py-20 py-10 px-5 md:px-16">
      <SectionTitle
        title="Upcoming Services"
        subtitle="Some of our most popular tutors are now making their services available for booking."
      />
      {servicesWithoutPrice?.length === 0 ? (
        <>
          <p className="text-center text-xl font-semibold mt-5 text-red-500">
            No upcoming services
          </p>
        </>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
            {servicesWithoutPrice?.map((service: any) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UpComingServices;





// "use client";

// import { useGetServicesQuery } from "@/redux/api/serviceApi";
// import { useState } from "react";
// import SectionTitle from "../SectionTitle";
// import ServiceCard from "../ServiceCard";
// import HashLoading from "../HashLoading";

// const UpComingServices = () => {
//   const query: Record<string, any> = {};

//   query["sortBy"] = "rating";
//   query["sortOrder"] = "desc";

//   const { data, isLoading } = ({ ...query });
//   console.log(data);
// if (isLoading) return <HashLoading />;
//   const services = data?.services;

//   const servicesWithoutPrice = services?.filter(
//     (service:{price:string | null}) => !service.price || service.price.length === 0
//   );

//   return (
//     <div className="md:py-20 py-10 px-5 md:px-16">
//       <SectionTitle
//         title="Upcoming Services"
//         subtitle="Some of our most popular tutors are now making their services available for booking."
//       />
//       {servicesWithoutPrice?.length === 0 ? (
//         <>
//           <p className="text-center text-xl font-semibold mt-5 text-red-500">
//             No upcoming services
//           </p>
//         </>
//       ) : (
//         <>
//           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
//             {servicesWithoutPrice?.map((service: any) => (
//               <ServiceCard key={service._id} service={service} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default UpComingServices;
