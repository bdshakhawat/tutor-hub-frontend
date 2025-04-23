"use client";

import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useCreateTutorMutation } from "@/redux/api/tutorApi";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import HashLoading from "./HashLoading";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  address: string;
  experience: number;
};

const BeTutorModal = () => {
  const loggedUser: any = getUserInfo();
  const router = useRouter();
  const { id } = loggedUser;
  const { data, isLoading } = useGetSingleUserQuery(id);
  const [createTutor] = useCreateTutorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  if (isLoading) return <HashLoading />;

  //   console.log(data);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const formData = {
      userId: id,
      subject: data.subject,
      address: data.address,
      experience: data.experience,
    };
    // console.log(formData);
    const res = await createTutor({ ...formData }).unwrap();
    // console.log(res);
    if (res?.id) {
      const dialog = document.getElementById(
        "be_tutor_modal"
      ) as HTMLDialogElement;
      if (dialog) {
        dialog.close();
      }

      Swal.fire({
        title: "Request Sending Done",
        text: "Please check your request status in your dashboard",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Go to Dashboard",
        cancelButtonText: "Stay here",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }
  };

  return (
    <dialog id="be_tutor_modal" className="modal">
      <div className="modal-box py-10">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg uppercase text-center">Tutor Form</h3>
        <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              value={data?.name}
              placeholder="Your Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={data?.email}
              placeholder="Your Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Subject</span>
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered"
              {...register("subject", { required: true })}
            />
            {errors.subject && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Experience</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="Experience in years"
              className="input input-bordered"
              {...register("experience", { required: true })}
            />
            {errors.experience && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <button
            type="submit"
            className="btn w-full mt-5 bg-cBlue text-white hover:bg-cOrange"
          >
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default BeTutorModal;
