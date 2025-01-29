import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod"

const schema = z.object({
    location: z.enum(optionLocations.map(({ value }) => value)),
    min_price: z.number().min(15, { message: "价格不能低于15元" }),
    max_price: z.number().max(50000, { message: "价格不能超过 5 万元" }),
    type: z.enum(optionTypes.map(({ value }) => value))
})

export {
    schema
}