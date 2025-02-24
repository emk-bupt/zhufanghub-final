"use client";
import { useForm } from "react-hook-form";
import Input from "@/ui/Input";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import Select from "@/ui/Select";
import { optionTypes, optionLocations } from "@/data/data";
import Button from "@/ui/Button";
import toast from "react-hot-toast";
import { createNewListing, postImages } from "./service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ModalLayout from "../../layout/ModalLayout";
import { useSession } from "next-auth/react";

const CreateModal = ({ handleHideModal }) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  const router = useRouter();
  const [images, setImages] = useState([]);

  const { data: session } = useSession();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ data, imageUrls, ownerId }) =>
      createNewListing(data, imageUrls, ownerId),
    mutationKey: ["listings"],
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   name: "",
    //   desc: "",
    //   beds: 1,
    //   hasFreeWifi: false,
    //   type: optionTypes[0].value,
    //   location: optionLocations[0].value,
    //   pricePerNight: 100,
    // },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key].message);
      });
    }
  }, [errors]);

  const handleImage = (e) => {
    setImages((prev) => [...prev, e.target.files[0]]);
  };

  const uploadImages = async (image, idx) => {
    if (!image) return;
    const toastId = toast.loading(`照片${idx + 1}正在上传`);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const imageUrl = await postImages(CLOUD_NAME, formData);
      toast.success(`图片${idx + 1}上传成功`);
      toast.dismiss(toastId);
      return imageUrl;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`图片${idx + 1}上传失败，请重试!`);
      throw new Error(error);
    }
  };

  const onSubmit = async (data) => {
    if (!images.length) return toast.error("请上传至少一张图片!");

    if (!session?.user?.id) {
      return toast.error("用户未登录，无法创建酒店!");
    }

    try {
      const imageUrls = await Promise.all(
        images.map((image, idx) => uploadImages(image, idx))
      );

      await mutateAsync({
        data,
        imageUrls,
        ownerId: session.user.id,
      });

      toast.success("酒店创建成功!");
      router.push(`/company/listings`);
    } catch (error) {
      toast.error(error.message || "创建酒店失败，请重试！");
    }
  };

  return (
    <ModalLayout isCreating document="酒店" handleHideModal={handleHideModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-6 flex flex-col items-center gap-8">
        <Input type="text" className="w-[300px] px-2 py-3 rounded-xl" register={register("name")} placeholder="酒店名称" />
        <Input type="text" className="w-[300px] px-2 py-3 rounded-xl" register={register("desc")} placeholder="酒店描述" />
        <Select className="w-[300px] px-2 py-3 rounded-xl" data={optionLocations} register={register("location") }  />
        <Select className="w-[300px] px-2 py-3 rounded-xl" data={optionTypes} register={register("type")}  placeholder="酒店类型"/>
        <Input type="number" className="w-[300px] px-2 py-3 rounded-xl" register={register("pricePerNight", { valueAsNumber: true })} step={0.01} placeholder="每晚价格" />
        <Input type="number" className="w-[300px] px-2 py-3 rounded-xl" register={register("beds", { valueAsNumber: true })} step={1} placeholder="房间床数" />
        <div className="text-slate-400 rounded-md ml-4 w-2/3 flex gap-4">
          <label htmlFor="freeWifi">免费网络</label>
          <Input register={register("hasFreeWifi")} type="checkbox" id="freeWifi" className="w-4 h-4" />
        </div>
        <label className="text-slate-400 rounded-md w-2/3 ml-4" htmlFor="images">上传图片</label>
        <input onChange={handleImage} type="file" className="text-slate-400" style={{ display: "none" }} id="images" />
        <Button type="submit" disabled={isLoading} className="w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700" label="提交" />
      </form>
    </ModalLayout>
  );
};

export default CreateModal;
