import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  name: string;
  kind?: "text" | "phone" | "email";
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
  placeholder: string;
}

export default function Input({
  name,
  kind = "text",
  register,
  type,
  required,
  placeholder,
}: InputProps) {
  return (
    <div>
      {kind === "text" ? (
        <div className="relative flex items-center  rounded-md shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder={placeholder}
            className="text-white bg-black border-[1px] rounded border-slate-400 h-14 w-full p-2 mb-[30px]"
          />
        </div>
      ) : null}

      {kind === "email" ? (
        <div className="relative flex items-center  rounded-md shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder={placeholder}
            className="bg-black border-[1px] rounded border-slate-400 h-14 w-full p-2"
          />
        </div>
      ) : null}

      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder={placeholder}
            className="bg-black border-[1px] rounded border-slate-400 h-14 w-full p-2 "
          />
        </div>
      ) : null}
    </div>
  );
}
