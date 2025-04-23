"use client";

import CourseBanner from "@/components/ui/Banner";
import ServiceCard from "@/components/ui/ServiceCard";
import { useAppSelector } from "@/redux/hooks";

const CartPage = () => {
  const cartData = useAppSelector((state) => state.service.services);
  
  return (
    <div>
      <CourseBanner title="Cart" />

      {cartData.length === 0 ? (
        <>
          <p className="text-center text-xl font-semibold mt-5">
            Cart is empty
          </p>
        </>
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 my-10 px-5">
          {cartData?.map((service: any) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
