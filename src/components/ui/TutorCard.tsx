import Image from "next/image";
import React from "react";
import teacherimg from "../../assets/teacher.jpg";
import Link from "next/link";


type Tutor = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    profileImg?: string;
  };
  subject: string;
  address: string;
  experience: number;
  status: 'pending' | 'accepted' | 'rejected';
  hourlyRate?: number;
};

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  return (
    <div className="md:w-48 w-40 rounded-lg bg-gray-100 border border-cDeepBlue mx-auto">
      <Image
        src={tutor.userId.profileImg || teacherimg}
        alt={tutor.userId.name}
        width={300}
        height={200}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="px-2 py-3">
        <h2 className="text-lg font-semibold text-cBlack truncate">
          {tutor.userId.name}
        </h2>
        <p className="text-sm truncate">{tutor.subject}</p>
        <p className="text-xs truncate">📍 {tutor.address}</p>
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs">Exp: {tutor.experience} yrs</p>
            {tutor.hourlyRate && (
              <p className="text-xs">${tutor.hourlyRate}/hr</p>
            )}
          </div>
          <Link href={`/tutors/${tutor._id}`}>
              <button className="btn btn-sm border border-black hover:bg-gray-800 hover:text-white">
                         View Details
                </button>
            </Link>
          {/* <button className="btn btn-xs bg-cDeepBlue/80 text-white text-[10px] hover:bg-cOrange">
            View Profile
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TutorCard;




// import Image from "next/image";
// import React from "react";

// import teacherimg from "../../assets/teacher.jpg";





// const TutorCard = () => {
//   return (
//     <div className="md:w-48 w-40 rounded-lg bg-gray-100 border border-cDeepBlue mx-auto">
//       <Image
//         src={teacherimg}
//         alt="user"
//         width={300}
//         className="w-full rounded-t-lg"
//         style={{
//           maxWidth: "100%",
//           height: "auto",
//         }}
//       />
//       <div className="px-2 py-3 flex justify-between ">
//         <div>
//           <h1 className="text-lg font-semibold text-cBlack">Shakhawat</h1>
//           <p className="text-sm">Physics</p>
//         </div>
//         <button className="btn btn-xs bg-cDeepBlue/80 text-white text-[10px] hover:bg-cOrange">
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TutorCard;
