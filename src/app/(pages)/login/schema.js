import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, { message: "需要电子邮箱" }).email("电子邮件地址无效"),
  password: z.string().min(6, { message: "密码长度必须至少为 6 个字符" }),
});

export { schema };
