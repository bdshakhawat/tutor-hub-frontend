"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import loginImage from "../../assets/Signup.svg";
import SyncLoading from "@/components/ui/SyncLoading";

type FormValues = {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
};

const SignUpPage = () => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const { edgestore } = useEdgeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userSignup] = useUserSignupMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // ✅ onSubmit must be placed BEFORE return
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    let profileImgUrl = "";

    try {
      // Upload image if selected
      if (file) {
        const res = await edgestore.myPublicImages.upload({
          file,
          onProgressChange: (progress) => setProgress(progress),
        });
        profileImgUrl = res?.thumbnailUrl || "";
      }

      const newData = {
        ...data,
        profileImgUrl,
      };

      const res = await userSignup(newData).unwrap();

      if (res?.accessToken) {
        storeUserInfo({ accessToken: res?.accessToken });
        toast.success("Signup successful");
        router.push("/");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Signup failed";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 grid-cols-1 items-center px-5 py-10">
      <div className="mx-auto">
        <Image
          src={loginImage}
          alt="login"
          width={500}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
      <div>
        <h1 className="text-3xl font-semibold uppercase">Sign-Up</h1>
        <div className="my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label className="label">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                {...register("name", { required: true })}
              />
              <p>{errors.name && <span>This field is required</span>}</p>
            </div>

            <div className="mb-2">
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                {...register("email", { required: true })}
              />
              <p>{errors.email && <span>This field is required</span>}</p>
            </div>

            <div className="mb-2">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Your Password"
                className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <p>{errors.password && <span>{errors.password.message}</span>}</p>
            </div>

            <div className="mb-2">
              <label className="label">Phone Number</label>
              <input
                type="text"
                placeholder="Your Phone Number"
                className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                {...register("phonenumber", { required: true })}
              />
              <p>{errors.phonenumber && <span>This field is required</span>}</p>
            </div>

            <div className="mb-3">
              <label className="label">Image</label>
              <input
                type="file"
                className="border border-cBlack file-input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) setFile(selectedFile);
                }}
              />
              <div className="h-[6px] lg:w-3/4 w-full border rounded-xl overflow-hidden mt-2">
                <div
                  className="h-full bg-cBlack transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn md:w-3/4 w-full bg-cBlue text-white hover:bg-cOrange"
            >
              {isSubmitting ? <SyncLoading /> : "Sign Up"}
            </button>
          </form>
        </div>

        <p className="mt-5">
          Already have an account?{" "}
          <Link href="/signin" className="text-cBlue font-semibold">
            Signin
          </Link>{" "}
          here.
        </p>
        <p>
          Back to{" "}
          <Link href="/" className="text-cBlue font-semibold">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;




// "use client";

// import { useEdgeStore } from "@/lib/edgestore";
// import { useUserSignupMutation } from "@/redux/api/authApi";
// import { storeUserInfo } from "@/services/auth.service";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import loginImage from "../../assets/Signup.svg";
// import SyncLoading from "@/components/ui/SyncLoading";

// type FormValues = {
//   name: string;
//   email: string;
//   password: string;
//   phonenumber: string;
// };

// const SignUpPage = () => {
//   const [file, setFile] = useState<File>();
//   const [progress, setProgress] = useState<number>(0);
//   const { edgestore } = useEdgeStore();

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const [userSignup] = useUserSignupMutation();
//   const router = useRouter();


//   const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
//   setIsSubmitting(true);
//   let profileImgUrl = "";

//   try {
//     // If file exists, upload it
//     if (file) {
//       const res = await edgestore.myPublicImages.upload({
//         file,
//         onProgressChange: (progress) => {
//           setProgress(progress);
//         },
//       });

//       profileImgUrl = res.thumbnailUrl || "";
//     }

//     const newData = {
//       ...data,
//       profileImgUrl,
//     };

//     const res = await userSignup({ ...newData }).unwrap();

//     if (res?.accessToken) {
//       storeUserInfo({ accessToken: res?.accessToken });
//       toast.success("Signup successful");
//       setIsSubmitting(false);
//       router.push("/");
//     }
//   } catch (error: any) {
//     console.error("Signup error:", error);
//     const errorMessage = error?.data?.message || "Signup failed";
//     toast.error(errorMessage);
//     setIsSubmitting(false);
//   }
// };

//   // const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
//   //   setIsSubmitting(true);

//   //   if (file && file !== undefined && file !== null) {
//   //     const res = await edgestore.myPublicImages.upload({
//   //       file,
//   //       onProgressChange: (progress) => {
//   //         setProgress(progress);
//   //       },
//   //     });

//   //     if (res.thumbnailUrl) {
//   //       const newData = {
//   //         ...data,
//   //         profileImgUrl: res.thumbnailUrl || "",
//   //       };
//   //       console.log(newData);

//   //       try {
//   //         const res = await userSignup({ ...newData }).unwrap();
//   //         // console.log(res);

//   //         if (res?.accessToken) {
//   //           storeUserInfo({ accessToken: res?.accessToken });
//   //           toast.success("Signup successful");

//   //           setIsSubmitting(false);
//   //           router.push("/");
//   //         }
//   //       } catch (error: any) {
//   //         const errorMessage = error?.data?.message || "Signup failed";
//   //         setIsSubmitting(false);
//   //         toast.error(errorMessage);
//   //       }
//   //     }
//   //   }
//   // };

//   return (
//     <div className="min-h-screen grid md:grid-cols-2 grid-cols-1 items-center px-5 py-10">
//       <div className="mx-auto">
//         <Image
//           src={loginImage}
//           alt="login"
//           width={500}
//           style={{
//             maxWidth: "100%",
//             height: "auto"
//           }} />
//       </div>
//       <div>
//         <h1 className="text-3xl font-semibold uppercase">Sign-Up</h1>
//         <div className="my-5">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-2">
//               <label className="label">Name</label>
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
//                 {...register("name", { required: true })}
//               />
//               <p>{errors.name && <span>This field is required</span>}</p>
//             </div>

//             <div className="mb-2">
//               <label className="label">Email</label>
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
//                 {...register("email", { required: true })}
//               />
//               <p>{errors.email && <span>This field is required</span>}</p>
//             </div>

//             <div className="mb-2">
//               <label className="label">Password</label>
//               <input
//                 type="password"
//                 placeholder="Your Password"
//                 className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
//                 {...register("password", {
//                   required: "This field is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters long",
//                   },
//                 })}
//               />
//               <p>{errors.password && <span>{errors.password.message}</span>}</p>
//             </div>

//             <div className="mb-2">
//               <label className="label">Phone Number</label>
//               <input
//                 type="text"
//                 placeholder="Your Phone Number"
//                 className="border border-cBlack input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
//                 {...register("phonenumber", { required: true })}
//               />
//               <p>{errors.phonenumber && <span>This field is required</span>}</p>
//             </div>

//             <div className="mb-3">
//               <label className="label">Image</label>
//               <input
//                 type="file"
//                 placeholder="Your Profile Image"
//                 className="border border-cBlack file-input focus:outline focus:outline-cOrange focus:border-none lg:w-3/4 w-full"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) {
//                     setFile(file);
//                   }
//                 }}
//               />
//               <div className="h-[6px] lg:w-3/4 w-full border rounded-xl overflow-hidden mt-2">
//                 <div
//                   className="h-full bg-cBlack transition-all duration-150"
//                   style={{
//                     width: `${progress}%`,
//                   }}
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="btn md:w-3/4 w-full bg-cBlue text-white hover:bg-cOrange"
//             >
//               {isSubmitting ? <><SyncLoading /></> : "Sign Up"}
//             </button>
//           </form>
//         </div>
//         <p className="mt-5">
//           Already have an account? Please{" "}
//           <Link href="/signin" className="text-cBlue font-semibold">
//             Signin
//           </Link>{" "}
//           here.
//         </p>
//         <p>
//           Back to{" "}
//           <Link href="/" className="text-cBlue font-semibold">
//             Home
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
