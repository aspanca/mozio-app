import { z } from "zod";

export const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  destinations: z.array(
    z.object({
      city: z.string().nonempty("City is required"),
    })
  ),
  passengers: z.number().gt(0, {
    message: "Number of passengers must be greater than zero",
  }),
});
