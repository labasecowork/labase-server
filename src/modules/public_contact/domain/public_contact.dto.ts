import { z } from "zod";
import { publicContactSchema } from "./public_contact.schema";

export type PublicContactDTO = z.infer<typeof publicContactSchema>;
