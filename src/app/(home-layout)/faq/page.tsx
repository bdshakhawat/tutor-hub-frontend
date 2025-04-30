"use client";
import CommonBanner from "@/components/ui/FaqSection/CommonBanner";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/FaqSection/accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/FaqSection/form";
import { Button } from "@/components/ui/FaqSection/button";
import { Input } from "@/components/ui/FaqSection/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
const faqItems = [
  "General Questions",
  "Account & Security",
  "Payment & Billing",
  "Technical Issues",
  "Privacy Policy",
  "Contact Support",
];
const faqCategories = ["Tutoring", "Payments", "Account Management"];
type FaqData = {
  [key: string]: {
    id: string;
    question: string;
    answer: string;
  }[];
};
const faqData: FaqData = {
  Tutoring: [
    {
      id: "tutoring-1",
      question: "How can I find a tutor?",
      answer:
        "You can browse our tutors page and filter based on subject, availability, and name.",
    },
    {
      id: "tutoring-2",
      question: "Can I cancel any session at any time?",
      answer:
        "Yes, you can cancel a session 24 hours before the scheduled time without any penalty.",
    },
    {
      id: "tutoring-3",
      question: "What if I am not satisfied with my tutor?",
      answer:
        "We can offer a new tutor for the session if you are not satisfied with your session.",
    },
  ],
  Payments: [
    {
      id: "payments-1",
      question: "What payment methods do you accept?",
      answer: "Payments are securely processed through Stripe and PayPal.",
    },
    {
      id: "payments-2",
      question: "Can I get a refund if i am not satisfied with the service or cancel session?",
      answer:
        "Refunds are available if you cancel within our refund policy timeframe.",
    },
  ],
  "Profile Management": [
    {
      id: "account-1",
      question: "How can I reset my password?",
      answer:
        "Go to settings and click on 'Forgot Password' to receive a reset link.",
    },
    {
      id: "account-2",
      question: "Can I change my email address?",
      answer: "Yes, you can update your email in the account settings.",
    },
  ],
};
const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState(faqCategories[0]);
  return (
    <div>
      <CommonBanner subTitle="FAQs " title="FAQs " />
      <div className="my-20 w-[82.5%] mx-auto">
        <h1 className="text-4xl font-semibold mb-10 text-primary">
          Frequently asked questions
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="h-[600px] w text-primary flex flex-col p-4 space-y-2">
            <nav className="space-y-2">
              {faqCategories.map((category, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`border block px-4 py-2 rounded-md transition-colors cursor-pointer hover:bg-gray-300 ${
                    selectedCategory === category && "bg-primaryPro"
                  }`}
                >
                  {category}
                </span>
              ))}
            </nav>
          </div>

          {/* FAQ Content */}
          <div className="col-span-2 py-4">
            <Accordion type="single" collapsible className="w-full">
              {faqData[selectedCategory].map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="py-1 px-6 mb-5 border"
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className=" bg-[#f5f7fa] mt-4">
            <div className="space-y-2 p-5 w-full">
              <h2 className="text-lg font-semibold text-primary">
                Don’t find your answer!
              </h2>
              <p className="text-[#6E7485] text-sm w-full mt-2 mb-6">
                Please write your aditional question here and our supsport team will
                contact you as soon as possible.
              </p>
              <input
                type="text"
                placeholder="Subject"
                className="flex  pl-4 h-10 w-full rounded-md  border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <textarea
                id="comments"
                name="comments"
                placeholder="Message"
                rows={4}
                cols={39}
                className="pt-4 pl-4 "
              />
              <button
                type="submit"
                className="h-10 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium shadow-sm  focus:outline-none focus:ring-2 focus:ring-primary "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;