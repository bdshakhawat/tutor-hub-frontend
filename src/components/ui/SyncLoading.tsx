"use client";

import { PulseLoader } from "react-spinners";

const SyncLoading = () => {
  return (
    <div className="flex items-center justify-center">
      <PulseLoader color="#FFFFFF" size={8} />
    </div>
  );
};

export default SyncLoading;
