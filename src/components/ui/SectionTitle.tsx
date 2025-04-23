"use client";

type SectionTitleProps = {
  title: string;
  subtitle: string;
};

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="text-center text-cBlack mb-10">
      <h1 className="text-3xl uppercase font-semibold">{title}</h1>
      <h2 className="text-sm mt-1">{subtitle}</h2>
    </div>
  );
};

export default SectionTitle;
