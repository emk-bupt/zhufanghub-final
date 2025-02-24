import { optionLocations, optionTypes } from "@/data/data";
import {z} from "zod";

const schema = z.object({
    name: z.string().min(1, {message: "名称为必填项"}),
    desc: z.string().min(1, {message: "需要描述"}),
    beds: z.number().min(1, {message: "需要床位数"}),
    hasFreeWifi: z.boolean().optional(),
    type: z.enum(optionTypes.map(({value}) => value)),
    location: z.enum(optionLocations.map(({value}) => value)),
    pricePerNight: z.number().min(50, {message: "价格不能低于50¥"}).max(50000, {message: "价格不能高于5万¥！"}),
})

export{
    schema
}