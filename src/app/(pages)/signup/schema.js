import { z } from "zod"

const schema = z.object({
    username: z.string().min(1, { message: "用户名是必填项" }),
    email: z.string().min(1, { message: "需要电子邮箱" }),
    password: z.string().min(6, { message: "密码必须至少包含 6 个字符" })
})

export {
    schema
}