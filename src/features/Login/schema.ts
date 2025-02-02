import { z } from "zod";

const UserFormSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1, "Password is required"),
});

export { UserFormSchema };
