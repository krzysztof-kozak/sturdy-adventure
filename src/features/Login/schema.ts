import { z } from "zod";

const UserFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { UserFormSchema };
