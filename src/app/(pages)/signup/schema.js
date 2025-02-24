import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "用户名是必填项" }),
  email: z.string().email({ message: "需要有效的电子邮件" }),
  password: z.string().min(6, { message: "密码必须至少包含 6 个字符" }),
  accountType: z.enum(["user", "company"]).optional(), // Allow user to select account type
});

export { schema };
