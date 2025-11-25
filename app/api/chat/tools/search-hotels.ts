import { tool } from "ai";
import { z } from "zod";
import { searchHotelsBooking } from "@/lib/booking";

/**
 * searchHotelsTool
 *
 * The tool that GPT will call to fetch real hotel data
 * using the Booking.com RapidAPI we integrated.
 *
 * GPT receives structured JSON output:
 *   { hotels: [...] }
 */
export const searchHotelsTool = tool({
  description:
    "Search available hotels in Delhi or New York City using the Booking.com RapidAPI. Use this tool whenever the user is looking for hotels, stays, price ranges, dates, last-minute bookings, or suggestions.",
  
  inputSchema: z.object({
    city: z.string().describe("City name. Allowed: 'Delhi' or 'New York'."),
    checkIn: z.string().describe("Check-in date in YYYY-MM-DD format."),
    checkOut: z.string().describe("Check-out date in YYYY-MM-DD format."),
    adults: z.number().int().min(1).describe("Number of adult guests."),
    rooms: z.number().int().min(1).optional().describe("Number of rooms."),
    currency: z.string().optional().describe("Currency code like 'INR' or 'USD'."),
  }),

  execute: async (input) => {
    const hotels = await searchHotelsBooking({
      city: input.city,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      adults: input.adults,
      rooms: input.rooms,
      currency: input.currency,
    });

    return { hotels };
  },
});
