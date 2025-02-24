"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Dubai from "../../../../public/assets/dubai.jpg";
import Image from "next/image";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AXIOS_API from "@/utils/axiosAPI";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [accountType, setAccountType] = useState("user");

  const onSubmit = async (data) => {
    if (Object.keys(errors)?.length > 0) {
      toast.error("请输入有效的信息");
      return;
    }

    try {
      await AXIOS_API.post("/register", { ...data, accountType });
      toast.success("注册成功！转到登录页面");

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (error) {
      console.log(error);
      toast.error("注册失败，请稍后再试！");
    }
  };

  return (
    <div className="relative h-screen w-full">
      <div className="relative h-full w-full">
        <Image
          className="brightness-50 h-full w-full object-cover"
          src={Dubai}
          alt="dubai"
        />
        <div className="h-auto w-[426px] bg-white dark:bg-gray-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-6">
          <h1 className="text-center text-3xl font-bold text-blue-600 dark:text-blue-400 pt-6">
            欢迎来到 住房Hub!
          </h1>
          <p className="text-center text-sm text-slate-600 dark:text-slate-300 mt-2 px-6">
            在这里，发现更好的住宿方式！快速注册以便开始您的旅程。
          </p>
          <h2 className="text-center p-4 font-semibold text-slate-800 dark:text-slate-100 text-2xl border-b border-slate-300 dark:border-slate-500">
            创建一个帐户
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 mt-6 flex flex-col items-center w-full gap-6"
          >
            <div className="w-full">
              <Input
                className="w-full mx-auto outline-none border border-slate-400 py-2 px-4 rounded-md focus:border-blue-600 dark:border-slate-700 dark:bg-gray-700 dark:text-white"
                type="text"
                placeholder="请输入用户名"
                register={register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>
            <div className="w-full">
              <Input
                className="w-full mx-auto outline-none border border-slate-400 py-2 px-4 rounded-md focus:border-blue-600 dark:border-slate-700 dark:bg-gray-700 dark:text-white"
                type="email"
                placeholder="请输入邮箱"
                register={register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full">
              <Input
                className="w-full mx-auto outline-none border border-slate-400 py-2 px-4 rounded-md focus:border-blue-600 dark:border-slate-700 dark:bg-gray-700 dark:text-white"
                type="password"
                placeholder="请输入密码"
                register={register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Account Type Selection */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">选择账户类型:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="user"
                    checked={accountType === "user"}
                    onChange={() => setAccountType("user")}
                    className="form-radio text-blue-600 dark:text-blue-400"
                  />
                  普通用户
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="company"
                    checked={accountType === "company"}
                    onChange={() => setAccountType("company")}
                    className="form-radio text-blue-600 dark:text-blue-400"
                  />
                  公司账号
                </label>
              </div>
            </div>

            <Button
              className="mt-4 w-3/4 mx-auto cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600"
              label="注册"
              type="submit"
            />
            <Link
              href="/login"
              className="text-sm text-blue-500 hover:text-blue-600 mt-4"
            >
              已有账户？立即登录
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
