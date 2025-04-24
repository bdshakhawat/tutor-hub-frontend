"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema_validator";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  className?: string;
}

const FormInput = ({
  name,
  type,
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  className = "",
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      <label className="label">{label ? label : ""}</label>
      <Controller
        control={control}
        name={name}
        defaultValue="" // Add this line to prevent uncontrolled to controlled transition
        render={({ field }) => (
          <input
            type={type}
            {...field}
            value={field.value || ""} // Ensure value is never undefined
            className={`border border-cBlack input focus:outline focus:outline-cOrange focus:border-none w-full ${className}`}
            placeholder={placeholder}
            required={required}
          />
        )}
      />
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
};

export default FormInput;



// "use client";

// import { getErrorMessageByPropertyName } from "@/utils/schema_validator";
// import { Controller, useFormContext } from "react-hook-form";

// interface IInput {
//   name: string;
//   type?: string;
//   value?: string | string[] | undefined;
//   id?: string;
//   placeholder?: string;
//   validation?: object;
//   label?: string;
//   required?: boolean;
//   className?: string;
// }

// const FormInput = ({
//   name,
//   type,
//   value,
//   id,
//   placeholder,
//   validation,
//   label,
//   required,
//   className="",
// }: IInput) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const errorMessage = getErrorMessageByPropertyName(errors, name);

//   return (
//     <>
//       <label className="label">{label ? label : ""}</label>
//       <Controller
//           name={name}
//           control={control}
//           render={({ field }) => (
//             <input
//               type={type}
//               {...field} // Let React Hook Form manage the value
//             />
//           )}
//         />
      
//       <p className="text-red-500">{errorMessage}</p>
//     </>
//   );
// };

// export default FormInput;
