import { useRouter } from "next/router";
import Button from "../components/button";
import Input from "../components/input";
import useMutation from "../lib/useMutation";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EnterForm {
  name: string;
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
}

const Enter: NextPage = () => {
  const router = useRouter();

  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/join");

  const { register, handleSubmit, reset } = useForm<EnterForm>();

  const [method, setMethod] = useState<"email" | "phone">("email");

  const onToggleClick = () => {
    reset();
    setMethod((prev) => (prev === "email" ? "phone" : "email"));
  };

  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    enter(validForm);
  };

  useEffect(() => {
    if (data?.ok) {
      router.replace("/log-in");
    }
  }, [data]);

  console.log(loading);

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-700 flex justify-center items-center">
      <div className="bg-black rounded-2xl px-20 w-[80%] min-w-[400px] flex justify-between items-start flex-col text-white">
        <h1 className="text-3xl my-[30px]">계정을 생성하세요</h1>
        <form className="w-full" onSubmit={handleSubmit(onValid)}>
          <Input
            register={register("name", {
              required: true,
            })}
            name="name"
            placeholder="이름"
            type="text"
            required
          />
          {method === "email" ? (
            <Input
              register={register("email", {
                required: true,
              })}
              name="email"
              placeholder="이메일"
              type="email"
              kind="email"
              required
            />
          ) : null}
          {method === "phone" ? (
            <Input
              register={register("phone")}
              name="phone"
              type="number"
              kind="phone"
              placeholder="휴대폰"
              required
            />
          ) : null}
          <button
            type="button"
            onClick={onToggleClick}
            className="text-blue-500 w-full text-end mb-[30px]"
          >
            대신 {method === "phone" ? "이메일" : "휴대폰"} 사용하기
          </button>
          <button className="bg-white w-full rounded-full text-black font-bold py-2">
            다음
          </button>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default Enter;
