// lib/booking.ts

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;
const RAPIDAPI_HOST =
  process.env.RAPIDAPI_HOST ?? "booking-com15.p.rapidapi.com";

if (!RAPIDAPI_KEY) {
  throw new Error("❌ RAPIDAPI_KEY is not set in Vercel environment variables.");
}

export type HotelSearchParams = {
  city: string;
  checkIn: string;   // "YYYY-MM-DD"
  checkOut: string;  // "YYYY-MM-DD"
  adults: number;
  rooms?: number;
  currency?: string;
};

export type SimpleHotel = {
  id: string;
  name: string;
  city: string;
  neighborhood?: string;
  price?: number;
  currency?: string;
  rating?: number;
  url?: string;
};

/**
 * STEP 1 — Resolve destination ID for a city using Booking.com API
 */
async function getDestination(
  city: string
): Promise<{ destId: string; searchType: string } | null> {
  const params = new URLSearchParams({
    query: city,
    locale: "en-us",
  });

  const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/searchDestination?${params.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("❌ searchDestination failed:", res.status, await res.text());
    return null;
  }

  const data: any = await res.json();
  const items: any[] = data?.data ?? [];

  if (!Array.isArray(items) || items.length === 0) return null;

  // Prefer the CITY search_type, else take the first match
  const best =
    items.find(
      (i) =>
        i.search_type === "CITY" ||
        i.searchType === "CITY" ||
        i.trackingItems === "CITY"
    ) ?? items[0];

  return {
    destId: String(best.dest_id ?? best.destId),
    searchType: String(best.search_type ?? best.searchType ?? "CITY"),
  };
}

/**
 * STEP 2 — Search hotels for the resolved destination
 */
export async function searchHotelsBooking(
  params: HotelSearchParams
): Promise<SimpleHotel[]> {
  const { city, checkIn, checkOut, adults, rooms = 1, currency = "USD" } = params;

  const dest = await getDestination(city);
  if (!dest) {
    console.warn(`⚠️ No destination found for city: ${city}`);
    return [];
  }

  const qs = new URLSearchParams({
    dest_id: dest.destId,
    search_type: dest.searchType,
    adults: String(adults),
    children_age: "0,17",     // default assumption
    room_qty: String(rooms),
    page_number: "1",
    units: "metric",
    temperature_unit: "c",
    languagecode: "en-us",
    currency_code: currency,
    arrival_date: checkIn,
    departure_date: checkOut,
  });

  const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/searchHotels?${qs.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("❌ searchHotels failed:", res.status, await res.text());
    return [];
  }

  const data: any = await res.json();
  const hotels: any[] = data?.data?.hotels ?? [];

  if (!Array.isArray(hotels) || hotels.length === 0) return [];

  return hotels.map((h) => {
    const property = h.property ?? {};
    const priceBreakdown = property.priceBreakdown ?? {};
    const grossPrice = priceBreakdown.grossPrice ?? {};

    return {
      id: String(h.hotel_id ?? h.id ?? ""),
      name: property.name ?? "Unknown hotel",
      city,
      neighborhood: property.neighborhood,
      price:
        typeof grossPrice.value === "number"
          ? grossPrice.value
          : Number(grossPrice.value ?? NaN),
      currency: priceBreakdown.currency ?? currency,
      rating:
        typeof property.reviewScore === "number"
          ? property.reviewScore
          : Number(property.reviewScore ?? NaN),
      url: h.url ?? undefined,
    };
  });
}
