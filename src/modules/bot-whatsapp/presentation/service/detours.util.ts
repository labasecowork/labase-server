import { chatbotConfig } from "../../data/config/chatbot.config";

export type Detour = "photos" | "web" | "location" | "pricing" | "hours" | null;

export function detectDetour(text: string): Detour {
  const t = text.normalize("NFKC").toLowerCase();

  if (
    /\b(foto|fotos|imagen|imagenes|galer[ií]a|ver fotos|m[úu]estrame fotos|muestrame|env[ií]ame fotos|manda fotos)\b/.test(
      t,
    )
  ) {
    return "photos";
  }
  if (/\b(web|sitio|p[aá]gina|p[áa]gina web|website|link|enlace)\b/.test(t)) {
    return "web";
  }
  if (
    /\b(ubicaci[oó]n|direcci[oó]n|mapa|c[oó]mo llegar|como llegar)\b/.test(t)
  ) {
    return "location";
  }
  if (
    /\b(precio|precios|tarifa|tarifas|cu[áa]nto cuesta|costo|costos)\b/.test(t)
  ) {
    return "pricing";
  }
  if (/\b(horario|horarios|hora de atenci[oó]n|abren|cierran)\b/.test(t)) {
    return "hours";
  }

  return null;
}

export function detourReply(kind: Detour): string | null {
  if (!kind) return null;
  const web = chatbotConfig.websiteUrl;

  switch (kind) {
    case "photos":
      return `Puedes ver fotos y detalles de los espacios en nuestra web: ${web}`;
    case "web":
      return `Claro, nuestra web es: ${web}`;
    case "location":
      return `Estamos en Jr. Tacna 234, piso 10, Edificio Galena (Huancayo). Más info en: ${web}`;
    case "pricing":
      return `Precios referenciales en la web: ${web}\nEjemplo: Base Operativa/Hangar desde S/20 la hora; Unidad (1p) desde S/28 la hora.`;
    case "hours":
      return `Atendemos de 09:00 a 19:30 (L–S). Domingos solo por acuerdo para grupos. Más info: ${web}`;
  }
  return null;
}
