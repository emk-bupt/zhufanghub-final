"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import login from "../../../../public/assets/login.jpg";
import Image from "next/image";
import { schema } from "./schema";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    if (Object.keys(errors)?.length > 0) {
      toast.error("请输入有效的信息");
      return;
    }
    setIsLoading(true);

    try {
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.error == null) {
        router.push("/");
      } else {
        toast.error("登录失败");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="relative h-full w-full">
        <Image
          className="brightness-50 h-full w-full object-cover"
          src={login}
          alt="Login Background"
        />

        {/* Welcome Section */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-4xl font-bold text-blue-600 drop-shadow-lg">欢迎来到 住房Hub</h1>
          <p className="mt-2 text-lg text-gray-200 drop-shadow-lg">
            您的理想住宿解决方案，尽在这里！
          </p>
        </div>

        {/* Login Form */}
        <div className="h-[377px] w-[350px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl">
          <h2 className="text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500">
            登录您的账户
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col items-center w-full gap-8"
          >
            <Input
              className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"
              type="email"
              placeholder="请输入邮箱"
              register={register("email")}
            />
            <Input
              className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"
              type="password"
              placeholder="请输入密码"
              register={register("password")}
            />
            <Button
              disabled={isLoading}
              label="登录"
              className="w-3/4 mx-auto mt-12 cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600"
            />
            <Link href="/signup" className="text-sm text-blue-500 hover:text-blue-600">
              您还没有账号吗? 立即注册
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
