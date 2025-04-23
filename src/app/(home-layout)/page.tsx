"use client";

import ExperiencedTeacher from "@/components/ui/home/ExperiencedTeacher";
import FeedBackForm from "@/components/ui/home/FeedbackForm";
import FindTeacher from "@/components/ui/home/FindTeacher";
import PopulerServices from "@/components/ui/home/PopulerServices";
import Servey from "@/components/ui/home/Servey";
import StudentsReview from "@/components/ui/home/StudentsReview";
import TopBannner from "@/components/ui/home/TopBannner";

const HomePage = () => {
  return (
    <div className="">
      <FindTeacher />
      <TopBannner />
      <Servey />
      <PopulerServices />
      <ExperiencedTeacher />
      <StudentsReview />
      <FeedBackForm />
    </div>
  );
};

export default HomePage;
