"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import feedbackImage from "../../../assets/Feedback-bro.png";
import SectionTitle from "../SectionTitle";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const FeedBackForm = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    // console.log(data);
    toast.success("Thank you for your feedback");
  };
  return (
    <div className="md:py-20 py-10 px-5 md:px-16">
      <SectionTitle
        title="FeedBack or Suggestion"
        subtitle="We are always ready to hear from you and improve our services to you better. Please feel free to send us your feedback. If you have any suggestion, please let us know."
      />
      <div className="grid md:grid-cols-2 grid-cols-1 items-center">
        <div className="">
          <Image
            src={feedbackImage}
            alt="Feedback"
            width={500}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
        <div className=" w-full">
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="name"
                type="text"
                label="Name"
                placeholder="Your Name"
                required
                // className="md:w-3/4"
              />
            </div>
            <div>
              <FormInput
                name="email"
                type="text"
                label="Email"
                placeholder="Your email"
                required
                // className="md:w-3/4"
              />
            </div>
            <div>
              <FormInput
                name="message"
                type="text"
                label="Message"
                placeholder="Your message"
                required
                // className="md:w-3/4"
              />
            </div>
            <button
              type="submit"
              className="btn w-full mt-5 bg-cBlue text-white hover:bg-cOrange"
            >
              Send
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FeedBackForm;
