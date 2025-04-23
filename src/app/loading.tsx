"use client"

import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <HashLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
