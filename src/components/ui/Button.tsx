"use client";

import Link from "next/link";
import React from "react";

type ButtonProps = {
  href?: string;
  text: string;
  className?: string;
};

const Button = ({ href, text, className = "" }: ButtonProps) => {
  return (
    <Link href={href ? href : "/"}>
      <button
        className={`btn bg-cBlue w-40 rounded-full py-3 text-gray-50 hover:bg-cOrange transition-colors ${className}`}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
