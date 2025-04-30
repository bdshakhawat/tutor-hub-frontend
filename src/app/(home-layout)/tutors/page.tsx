'use client'

import CourseBanner from '@/components/ui/Banner';
import BeTutorModal from '@/components/ui/BeTutorModal';
import TutorCard from '@/components/ui/TutorCard';
import React, { useState, useEffect, useCallback } from 'react'
import { BiSolidRightArrow } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

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

const TutorsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutors = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      return data.data || data;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadAllTutors = useCallback(async () => {
    try {
      const tutors = await fetchTutors('http://localhost:5000/api/v1/tutors');
      setTutors(tutors.filter((t: Tutor) => t.status === 'accepted'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tutors');
    }
  }, []);

  const searchTutors = useCallback(async (term: string) => {
    try {
      // Skip search if term is too short
      if (term.trim().length < 2) {
        await loadAllTutors();
        return;
      }

      const encodedTerm = encodeURIComponent(term);
      const results = await fetchTutors(
        `http://localhost:5000/api/v1/tutors/search?searchTerm=${encodedTerm}`
      );
      setTutors(results);
    } catch (err: any) {
      // Don't show error for minimum length requirement
      if (!err.message.includes('must be at least 2 characters')) {
        setError(err instanceof Error ? err.message : 'Search failed');
      }
    }
  }, [loadAllTutors]);

  // Load all tutors on initial render
  useEffect(() => {
    loadAllTutors();
  }, [loadAllTutors]);

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim() === '') {
        loadAllTutors();
      } else {
        searchTutors(searchTerm);
      }
    }
  };

  // Optional: Still keep debounce for those who don't press Enter
  useEffect(() => {
    const timer = setTimeout(() => {
      // You can remove this if you only want Enter key searches
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <CourseBanner title="Tutors" />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cOrange"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <CourseBanner title="Tutors" />
        <div className="text-center py-20 text-red-500">
          {error}
          <button 
            onClick={loadAllTutors}
            className="block mx-auto mt-4 px-4 py-2 bg-cOrange text-white rounded hover:bg-cDeepBlue"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CourseBanner title="Tutors" />

      <div className="lg:w-3/4 w-[90%] mx-auto rounded-lg bg-gray-200 py-3 flex flex-row items-center justify-between gap-2 px-5 mt-5">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by subject, location, or experience (press Enter)"
            className="input input-sm md:input-md border-cBlack outline-none focus:outline-cOrange focus:border-none w-full md:pl-10 pl-8"
            disabled={loading}
          />
          <BsSearch className="absolute top-1/2 md:left-4 left-2 -translate-y-1/2" />
        </div>
        
        <div>
          <button
            onClick={() => {
              const dialog = document.getElementById(
                "be_tutor_modal"
              ) as HTMLDialogElement;
              dialog?.showModal();
            }}
            className="btn btn-sm md:btn-md w-36 md:w-40 rounded-full flex items-center justify-center border border-gray-800 hover:bg-gray-800 hover:text-white group transition-colors"
          >
            <span className="text-gray-800 group-hover:text-white mr-1">
              <BiSolidRightArrow />
            </span>{" "}
            Be A Tutor
          </button>
        </div>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-600">No tutors found</p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-2 text-sm text-cOrange hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="mt-16 px-3 md:px-16 py-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
          {tutors.map(tutor => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}

      <BeTutorModal />
    </div>
  );
};

export default TutorsPage;





// 'use client'

// import CourseBanner from '@/components/ui/Banner';
// import BeTutorModal from '@/components/ui/BeTutorModal';
// import TutorCard from '@/components/ui/TutorCard';
// import React, { useState } from 'react'
// import { BiSolidRightArrow } from 'react-icons/bi';
// import { BsSearch } from 'react-icons/bs';

// const TutorsPage = () => {
//     const [searchTerm, setSearchTerm] = useState<string>("");
//   return (
//     <div className="">
//       <CourseBanner title="Tutors" />

//       <div className="lg:w-3/4 w-[90%] mx-auto rounded-lg bg-gray-200 py-3 flex flex-row items-center justify-between gap-2 px-5 mt-5">
//         <div className="relative">
//           <input
//             type="text"
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="name, subject, location"
//             className="input input-sm md:input-md border-cBlack outline-none focus:outline-cOrange focus:border-none lg:w-72 w-full md:pl-10 pl-8"
//           />
//           <BsSearch className="absolute top-1/2 md:left-4 left-2 -translate-y-1/2" />
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               const dialog = document.getElementById(
//                 "be_tutor_modal"
//               ) as HTMLDialogElement;
//               if (dialog) {
//                 dialog.showModal();
//               }
//             }}
//             className="btn btn-sm md:btn-md w-36 md:w-40 rounded-full flex items-center justify-center border border-gray-800 hover:bg-gray-800 hover:text-white group"
//           >
//             <span className="text-gray-800 group-hover:text-white mr-1">
//               <BiSolidRightArrow />
//             </span>{" "}
//             Be A Tutor
//           </button>
//         </div>
//       </div>

//       <div className="mt-16 px-3 md:px-16 py-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-y-5 gap-x-2">
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard /> 
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//       </div>
//       {/* pagination */}
//       <div className="flex items-center justify-center my-5">
//         <div className="join border border-cDeepBlue hover:border-cDeepBlue">
//           <button
//             className="join-item btn btn-sm"
//             onClick={() => {}}
//           >
//             «
//           </button>
//           <button className="join-item btn btn-sm bg-cDeepBlue hover:bg-cDeepBlue hover:border-cDeepBlue border border-cDeepBlue text-white">
//             Page 01
//           </button>
//           <button
//             className="join-item btn btn-sm"
//             onClick={() => {}}
//           >
//             »
//           </button>
//         </div>
//       </div>

//       {/* modal */}
//       <BeTutorModal />
//       {/* modal end */}
//     </div>
//   );
// }

// export default TutorsPage





// 'use client'

// import CourseBanner from '@/components/ui/Banner';
// import BeTutorModal from '@/components/ui/BeTutorModal';
// import TutorCard from '@/components/ui/TutorCard';
// import React, { useState } from 'react'
// import { BiSolidRightArrow } from 'react-icons/bi';
// import { BsSearch } from 'react-icons/bs';

// const TutorsPage = () => {
//     const [searchTerm, setSearchTerm] = useState<string>("");
//   return (
//     <div className="">
//       <CourseBanner title="Tutors" />

//       <div className="lg:w-3/4 w-[90%] mx-auto rounded-lg bg-gray-200 py-3 flex flex-row items-center justify-between gap-2 px-5 mt-5">
//         <div className="relative">
//           <input
//             type="text"
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="name, subject, location"
//             className="input input-sm md:input-md border-cBlack outline-none focus:outline-cOrange focus:border-none lg:w-72 w-full md:pl-10 pl-8"
//           />
//           <BsSearch className="absolute top-1/2 md:left-4 left-2 -translate-y-1/2" />
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               const dialog = document.getElementById(
//                 "be_tutor_modal"
//               ) as HTMLDialogElement;
//               if (dialog) {
//                 dialog.showModal();
//               }
//             }}
//             className="btn btn-sm md:btn-md w-36 md:w-40 rounded-full flex items-center justify-center border border-gray-800 hover:bg-gray-800 hover:text-white group"
//           >
//             <span className="text-gray-800 group-hover:text-white mr-1">
//               <BiSolidRightArrow />
//             </span>{" "}
//             Be A Tutor
//           </button>
//         </div>
//       </div>

//       <div className="mt-16 px-3 md:px-16 py-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-y-5 gap-x-2">
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//         <TutorCard /> 
//         <TutorCard />
//         <TutorCard />
//         <TutorCard />
//       </div>
//       {/* pagination */}
//       <div className="flex items-center justify-center my-5">
//         <div className="join border border-cDeepBlue hover:border-cDeepBlue">
//           <button
//             className="join-item btn btn-sm"
//             onClick={() => {}}
//           >
//             «
//           </button>
//           <button className="join-item btn btn-sm bg-cDeepBlue hover:bg-cDeepBlue hover:border-cDeepBlue border border-cDeepBlue text-white">
//             Page 01
//           </button>
//           <button
//             className="join-item btn btn-sm"
//             onClick={() => {}}
//           >
//             »
//           </button>
//         </div>
//       </div>

//       {/* modal */}
//       <BeTutorModal />
//       {/* modal end */}
//     </div>
//   );
// }

// export default TutorsPage