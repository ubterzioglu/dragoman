import { z } from "zod";

/** Reservation request form schema. `honeypot` must stay empty (anti-spam). */
export const reservationSchema = z.object({
  tourSlug: z.string().optional(),
  date: z.string().optional(),
  partySize: z.coerce.number().int().min(1).max(12).optional(),
  name: z.string().min(2, "required"),
  email: z.string().email("invalid").optional().or(z.literal("")),
  phone: z.string().min(6, "required"),
  message: z.string().max(1000).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
