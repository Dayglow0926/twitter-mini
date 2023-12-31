import useMutation from "../lib/useMutation";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/input";
import { useRouter } from "next/router";

interface TokenForm {
  userId: string;
}

interface MutationResult {
  ok: boolean;
}

const Login: NextPage = () => {
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");

  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();

  const router = useRouter();

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };

  useEffect(() => {
    if (tokenData && tokenData.ok) router.push("/");
  }, [tokenData]);

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-700 flex justify-center items-center">
      <div className="bg-black rounded-2xl px-20 w-1/3 min-w-[400px] flex justify-between items-center flex-col text-white">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
          <svg
            className="fill-white text-3xl"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
          </svg>
          <div></div>
        </div>
        <h1 className="text-3xl">로그인 하기</h1>
        <form className="w-full" onSubmit={tokenHandleSubmit(onTokenValid)}>
          <Input
            register={tokenRegister("userId", {
              required: true,
            })}
            placeholder="휴대폰 번호, 이메일 주소를 입력해주세요."
            name="userId"
            type="text"
            required
          />
          <button className="bg-white w-full rounded-full text-black font-bold py-2">
            다음
          </button>
          <div>
            <span className="opacity-50 ">계정이 없으신가요?</span>
            <Link href="/create-account">
              <a className="text-blue-500"> 가입하기</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
