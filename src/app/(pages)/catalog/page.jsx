"use client";

import React, { useEffect, Suspense } from "react";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Card from "@/components/best-hotels/Card";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilteredListings } from "./service";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes";

const CatalogContent = () => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const city = searchParams.get("city") || "";
  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";
  const type = searchParams.get("type") || "";

  const { city: city_name, value, image } =
    optionLocations.find((location) => location.value === city) || {};

  const defaultValues = {
    location: value || "",
    min_price: "",
    max_price: "",
    type: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset, // Add reset method
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const watchedLocation = watch("location");

  // Reset the form when the city changes
  useEffect(() => {
    if (watchedLocation) {
      // Reset form inputs when the city changes
      reset({
        location: watchedLocation,
        min_price: "",
        max_price: "",
        type: "",
      });

      const newUrl = `/catalog?city=${watchedLocation}&min_price=&max_price=&type=`;
      router.push(newUrl, { scroll: false });
    }
  }, [watchedLocation, reset, router]);

  // Fetch listings based on filters
  const { data: listings, isPending } = useQuery({
    queryFn: () => getFilteredListings({ location: watchedLocation, min_price, max_price, type }),
    queryKey: ["listings", watchedLocation, min_price, max_price, type],
  });

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key]?.message, {
          style: {
            background: theme === "dark" ? "#000" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          },
        });
      });
    }
  }, [errors, theme]);

  const onSubmit = async (data) => {
    queryClient.invalidateQueries(["listings"]);

    const newUrl = `/catalog?city=${data.location}&min_price=${data.min_price}&max_price=${data.max_price}&type=${data.type}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      {/* Image Section */}
      <div className="relative w-full h-96 sm:h-80 md:h-[500px] lg:h-[600px]">
        <Image
          src={image}
          className="brightness-50 h-full w-full object-cover"
          alt={`${city_name} image`}
        />
        <h3 className="absolute text-5xl sm:text-6xl font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white">
          {city_name}
        </h3>
      </div>

      {/* Form Section */}
      <div className="relative z-20 -mt-16 h-full w-full flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-4/5 md:w-2/3 h-32 border border-slate-500 px-6 py-10 rounded-xl bg-blue-600 shadow-lg text-white flex justify-between items-center transition-all ease-in-out hover:shadow-2xl"
        >
          <div className="flex flex-col items-center gap-2">
            <h3 className="ml-1 font-semibold text-white">城市</h3>
            <Select
              register={register("location")}
              data={optionLocations}
              placeholder="选择城市"
              className="p-3 rounded-xl outline-none capitalize transition-all text-blue-800"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="ml-1 font-semibold text-white">价格</h3>
            <div className="flex items-center gap-4">
              <Input
                register={register("min_price", { valueAsNumber: true })}
                type="number"
                placeholder="最低价"
                className="p-3 rounded-xl outline-none shadow-md transition-all text-blue-800"
              />
              <Input
                register={register("max_price", { valueAsNumber: true })}
                type="number"
                placeholder="最高价"
                className="p-3 rounded-xl outline-none shadow-md transition-all text-blue-800"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="ml-1 font-semibold text-white">酒店类型</h3>
            <Select
              register={register("type")}
              data={optionTypes}
              placeholder="选择类型"
              className="p-3 rounded-xl outline-none shadow-md transition-all text-blue-800"
            />
          </div>
          <Button
            disabled={isPending}
            label="搜索"
            className="mt-6 px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"
          />
        </form>

        {/* Listings Section */}
        <div className="w-full mt-12 sm:mt-16 lg:mt-20 flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10">
          {listings?.length > 0 ? (
            listings.map((place, idx) => <Card key={idx} place={place} />)
          ) : (
            <h2 className="text-center font-bold text-4xl text-gray-500">
              没有酒店符合这些要求
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

const Catalog = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CatalogContent />
  </Suspense>
);

export default Catalog;
