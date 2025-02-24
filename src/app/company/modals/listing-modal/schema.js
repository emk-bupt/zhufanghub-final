import { optionLocations, optionTypes } from '@/data/data';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1, { message: '姓名为必填项！' }),
    desc: z.string().min(1, { message: '需要描述！' }),
    beds: z.number().min(1, { message: '必須有床！' }),
    hasFreeWifi: z.boolean().optional(),
    type: z.enum(optionTypes.map(({ value }) => value)),
    location: z.enum(optionLocations.map(({ value }) => value)),
    pricePerNight: z.number().min(15, { message: "价格必须高于15元！" }).max(50000, { message: "价格不能超过 5 万元" }),
})

export {
    schema
}