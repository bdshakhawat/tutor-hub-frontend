'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {

  return (
    <section className='bg-white pt-4'>
      <div className="container mx-auto bg-cDeepBlue pt-10 pb-5 md:rounded-t-3xl px-10 text-white">
        <div className="grid lg:grid-cols-5 grid-cols-2  gap-3">
          <div className="col-span-2">
            <h1 className="text-3xl mb-4 text-cOrange font-bold">
              Tutors Hub
            </h1>
            <p className="text-gray-400 md:w-[80%] w-full">
              We are dedicated to help those students who are really interested to learn something new. We are providing the best quality of education to our students. Tutors are very friendly and helpful. We are always ready to help our students.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Links</h3>
            <ul className="flex flex-col gap-2 mt-4 text-gray-300">
              <li>
                <Link href='/home'>Home</Link>
              </li>
              <li>
                <Link href='/about'>About</Link>
              </li>
              <li>
                <Link href='/contact'>Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium">Resources</h3>
            <ul className="flex flex-col gap-2 mt-4 text-gray-300">
              <li>
                <Link href='/services'>Services</Link>
              </li>
              <li>
                <Link href='/blog'>Blog</Link>
              </li>
              <li>
                <Link href='/events'>Events</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium">Product</h3>
            <ul className="flex flex-col gap-2 mt-4 text-gray-300">
              <li>
                <Link href='/'>Pricing</Link>
              </li>
              <li>
                <Link href='/'>FAQ</Link>
              </li>
              <li>
                <Link href='/'>Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* footer down */}
        <div className="mt-5 flex items-center justify-between text-gray-300 text-sm">
          <div className="flex items-center ">
            <p>
              © Shakhawat Hossain {new Date().getFullYear()} | All right reserved.
            </p>
          </div>
          <div>
            <p className="">Terms & Privacy Policy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
