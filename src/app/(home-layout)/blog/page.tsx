
"use client";

import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import useTitle from "../../../utils/title";

const Blogs = () => {
  useTitle("Blogs");
  return (
    <div className="md:mx-0 mx-5">
      <div className="container mx-auto my-10">
        <h1 className="text-4xl font-bold mb-10 flex items-center justify-center">
          <FaAngleLeft />
          <span>Blogs</span>
          <FaAngleRight />
        </h1>
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-center items-start ">
          <div className="max-w-md p-6 overflow-hidden rounded-lg shadow bg-gray-50 text-gray-800 border border-gray-300">
            <article>
              <h2 className="text-xl font-bold">
                Difference between SQL and NoSQL
              </h2>
              <p className="mt-4 text-gray-600">
                <span className="font-semibold">The Main Differences:</span>
                <br />
                1. SQL databases are primarily called as Relational Databases
                (RDBMS); whereas NoSQL database are primarily called as
                non-relational or distributed database. <br />
                2. SQL databases defines and manipulates data based structured
                query language (SQL). A NoSQL database has dynamic schema for
                unstructured data. Data is stored in many ways which means it
                can be document-oriented, column-oriented, graph-based or
                organized as a KeyValue store <br />
                3. SQL databases are table-based on the other hand NoSQL
                databases are either key-value pairs, document-based, graph
                databases or wide-column stores.
              </p>
            </article>
          </div>
          <div className="max-w-md p-6 overflow-hidden rounded-lg shadow bg-gray-50 text-gray-800 border border-gray-300">
            <article>
              <h2 className="text-xl font-bold">
                What is JWT, and how does it work?
              </h2>
              <p className="mt-4 text-gray-600">
                JSON Web Token (JWT) is an open standard (RFC 7519) for securely
                transmitting information between parties as JSON object. It is
                compact, readable and digitally signed using a private key/ or a
                public key pair by the Identity Provider(IdP). User sign-in
                using username and password or google/facebook. Authentication
                server verifies the credentials and issues a jwt signed using
                either a secret salt or a private key. A Client uses the
                JWT to access protected resources by passing the JWT in HTTP
                Authorization header. Resource server then verifies the
                authenticity of the token using the secret salt/ public key{" "}
                <br />A JSON Web Token consists of 3 parts separated by a
                period. Header, Payload, Signature
              </p>
            </article>
          </div>
          <div className="max-w-md p-6 overflow-hidden rounded-lg shadow bg-gray-50 text-gray-800 border border-gray-300">
            <article>
              <h2 className="text-xl font-bold">
                What is the difference between javascript and NodeJS?
              </h2>
              <p className="mt-4 text-gray-600">
                <span className="font-semibold">
                  Difference between Node.JS and Javascript:
                </span>
                <br />
                1. Javascript is a programming language that is used for writing
                scripts on the website. And NodeJS is a Javascript runtime
                environment. <br />
                2. It is basically used on the client-side. It is basically used
                on the client-side. <br />
                3. Javascript can run in any browser engine as like JS core in
                safari and Spidermonkey in Firefox. V8 is the Javascript engine
                inside of node.js that parses and runs Javascript. <br />
                4. Javascript is used in frontend development. Nodejs is used in
                server-side development. <br />
                5. Javascript can only run in the browsers. We can run
                Javascript outside the browser with the help of NodeJS.
              </p>
            </article>
          </div>
          <div className="max-w-md p-6 overflow-hidden rounded-lg shadow bg-gray-50 text-gray-800 border border-gray-300">
            <article>
              <h2 className="text-xl font-bold">
                How does NodeJS handle multiple requests at the same time?
              </h2>
              <p className="mt-4 text-gray-600">
                NodeJS receives multiple client requests and places them into
                EventQueue. NodeJS is built with the concept of event-driven
                architecture. NodeJS has its own EventLoop which is an infinite
                loop that receives requests and processes them. EventLoop is the
                listener for the EventQueue. If NodeJS can process the request
                without I/O blocking then the event loop would itself process
                the request and sends the response back to the client by itself.
                But, it is possible to process multiple requests parallelly
                using the NodeJS cluster module or worker_threads module. A
                single instance of Node.js runs in a single thread. If you have
                a multi-core system then you can utilize every core. Sometimes
                developer wants to launch a cluster of NodeJS process to take
                advantage of the multi-core system.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;