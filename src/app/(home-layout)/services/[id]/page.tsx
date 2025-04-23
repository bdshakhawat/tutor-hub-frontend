
// "use client";

import ServiceCardDetails from "@/components/ui/ServiceCardDetails";

const ServiceDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div className="">
      <ServiceCardDetails id={id} />
    </div>
  );
};

export default ServiceDetailsPage;




// "use client";

// import ServiceCardDetails from "@/components/ui/ServiceCardDetails";

// const ServiceDetailsPage = ({ params }: { params: { id: string } }) => {
//   const id = params?.id;

//   return (
//     <div className="">
//       <ServiceCardDetails id={id} />
//     </div>
//   );
// };

// export default ServiceDetailsPage;
