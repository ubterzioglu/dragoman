import { SITE } from "./site";

export interface WhatsappReservation {
  tourTitle?: string;
  date?: string;
  partySize?: number;
  name?: string;
}

/**
 * Builds a wa.me deep link with a pre-filled, human-readable message.
 * Pure function — unit tested. Empty fields are omitted from the message.
 */
export function buildWhatsappLink(data: WhatsappReservation = {}): string {
  const lines = ["Merhaba Dragoman SeaKayak,"];
  if (data.tourTitle) lines.push(`Tur: ${data.tourTitle}`);
  if (data.date) lines.push(`Tarih: ${data.date}`);
  if (data.partySize) lines.push(`Kişi sayısı: ${data.partySize}`);
  if (data.name) lines.push(`İsim: ${data.name}`);
  lines.push("Rezervasyon hakkında bilgi almak istiyorum.");
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
