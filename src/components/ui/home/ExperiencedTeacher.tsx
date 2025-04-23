
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BiSolidRightArrow } from "react-icons/bi";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import userImage from "../../../assets/teacher.jpg";
import Button from "../Button";
import SectionTitle from "../SectionTitle";
import BeTutorModal from "../BeTutorModal";
import { getUserInfo } from "@/services/auth.service";

const ExperiencedTeacher = () => {
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    const user = getUserInfo(); // Now runs only on client
    setLoggedUser(user);
  }, []);

  const teachers = Array(9).fill({
    name: "Shakhawat Hossain",
    subject: "Physics",
    image: userImage,
  });

  const handleTutorClick = () => {
    const dialog = document.getElementById(
      "be_tutor_modal"
    ) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  return (
    <div className="md:py-20 py-10 px-5 md:px-16">
      <SectionTitle
        title="Find Experienced Teachers Fast"
        subtitle="The best teachers from all over the country are here to help you."
      />

      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 5 },
            768: { slidesPerView: 3, spaceBetween: 5 },
            1024: { slidesPerView: 4, spaceBetween: 5 },
          }}
          className="mySwiper"
        >
          {teachers.map((teacher, index) => (
            <SwiperSlide key={index}>
              <div className="w-60 rounded-lg bg-gray-100 border border-cDeepBlue mx-auto">
                <Image
                  src={teacher.image}
                  alt="user"
                  width={300}
                  className="w-full rounded-t-lg"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="px-2 py-3 flex justify-between">
                  <div>
                    <h1 className="text-lg font-semibold text-cBlack">
                      {teacher.name}
                    </h1>
                    <p className="text-sm">{teacher.subject}</p>
                  </div>
                  <button className="btn btn-xs bg-cDeepBlue/80 text-white text-[10px] hover:bg-cOrange">
                    View Profile
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {loggedUser?.id && (
        <div className="flex items-center justify-center mt-5 gap-5">
          <button
            onClick={handleTutorClick}
            className="btn py-3 w-40 rounded-full flex items-center justify-center border border-gray-800 hover:bg-gray-800 hover:text-white group"
          >
            <span className="text-gray-800 group-hover:text-white mr-3">
              <BiSolidRightArrow />
            </span>
            Be Tutor
          </button>
        </div>
      )}

      {/* modal */}
      <BeTutorModal />
    </div>
  );
};

export default ExperiencedTeacher;




// 'use client'

// import Image from "next/image";
// import { BiSolidRightArrow } from "react-icons/bi";
// import "swiper/css";
// import { Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import userImage from "../../../assets/Untitled design1.png";
// import Button from "../Button";
// import SectionTitle from "../SectionTitle";
// import BeTutorModal from "../BeTutorModal";
// import { getUserInfo } from "@/services/auth.service";

// const ExperiencedTeacher = () => {
//   const loggeduser:any = getUserInfo();
//   const teachers = Array(9).fill({
//     name: "Khalid Hasan",
//     subject: "Chemistry",
//     image: userImage,
//   });

//   return (
//     <div className="md:py-20 py-10 px-5 md:px-16">
//       <SectionTitle
//         title="Our Experienced Teachers"
//         subtitle="The best teachers from all over the country are here to help you."
//       />

//       <div className="">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={2}
//           loop={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay]}
//           breakpoints={{
//             320: {
//               slidesPerView: 1,
//               spaceBetween: 5,
//             },
//             768: {
//               slidesPerView: 3,
//               spaceBetween: 5,
//             },
//             1024: {
//               slidesPerView: 4,
//               spaceBetween: 5,
//             },
//           }}
//           className="mySwiper"
//         >
//           {teachers?.map((teacher, index) => (
//             <SwiperSlide key={index + 1}>
//               <div
//                 key={index}
//                 className="w-60 rounded-lg bg-gray-100 border border-cDeepBlue mx-auto"
//               >
//                 <Image
//                   src={teacher.image}
//                   alt="user"
//                   width={300}
//                   className="w-full rounded-t-lg"
//                   style={{
//                     maxWidth: "100%",
//                     height: "auto",
//                   }}
//                 />
//                 <div className="px-2 py-3 flex justify-between ">
//                   <div>
//                     <h1 className="text-lg font-semibold text-cBlack">
//                       {teacher.name}
//                     </h1>
//                     <p className="text-sm">{teacher.subject}</p>
//                   </div>
//                   <button className="btn btn-xs bg-cDeepBlue/80 text-white text-[10px] hover:bg-cOrange">
//                     View Profile
//                   </button>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {loggeduser?.id && (
//         <>
//           <div className="flex items-center justify-center mt-5 gap-5">
//             {/* <Button text="Browse More" href="/tutors" /> */}

//             <button
//               onClick={() => {
//                 const dialog = document.getElementById(
//                   "be_tutor_modal"
//                 ) as HTMLDialogElement;
//                 if (dialog) {
//                   dialog.showModal();
//                 }
//               }}
//               className="btn py-3 w-40 rounded-full flex items-center justify-center border border-gray-800 hover:bg-gray-800 hover:text-white group"
//             >
//               <span className="text-gray-800 group-hover:text-white mr-3">
//                 <BiSolidRightArrow />
//               </span>{" "}
//               Be Tutor
//             </button>
//           </div>
//         </>
//       )}

//       {/* modal */}
//       <BeTutorModal />
//       {/* modal end */}
//     </div>
//   );
// };

// export default ExperiencedTeacher;
