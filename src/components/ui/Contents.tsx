"use client";

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="text-cBlack"
      style={{
        minHeight: "100vh",
      }}
    >
      <div>{children}</div>
    </section>
  );
};

export default Contents;
