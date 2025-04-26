import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Page not found</h2>

      <Link
        href="/"
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;



// "use client";

// import Link from "next/link";

// const NotFoundPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center w-full h-screen">
//       <h1 className="text-6xl font-bold text-gray-800">404</h1>
//       <h2 className="text-2xl font-semibold text-gray-600">
//         Page not found
//       </h2>
//       <Link href="/">
//         <a className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700">
//           Go back home
//         </a>
//       </Link>
//     </div>
//   );
// };

// export default NotFoundPage;
