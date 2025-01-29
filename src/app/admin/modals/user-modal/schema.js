import { z } from "zod"

const schema = z.object({
    username: z.string().min(1, { message: "用户名是必填项" }),
    email: z.string().email("Invalid email address").min(1, { message: "需要电子邮箱" })
})

export {
    schema
}