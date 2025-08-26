// src/modules/chatbot/data/config/chatbot.config.ts
export const chatbotConfig = {
  context: `
Datos Clave – La Base Cowork (Huancayo)

1) Descripción
La Base es coworking + incubadora de empresas: infraestructura, conocimiento y acompañamiento.

2) Ubicación y contacto
Dirección: Jr. Tacna 234, piso 10, Edificio Galena, Huancayo, Junín, Perú.
Teléfono: +51 960 270 555
Correo: labasecowork@gmail.com
Atención: 9:00–19:30 (L–S). Domingos no se atiende, salvo acuerdo previo para grupos.

3) Espacios disponibles
- El Hangar (shared, 1–20): creatividad.
- Base de Mando: trabajo en equipo.
- Base Operativa (shared, 1–30): productividad.
- Los Bunkers (privado, 2–4): salas privadas.
- La Brigada (equipo, 2–4): comunidad.
- Unidad (privado 1) sala privada.
4) Beneficios
Internet rápido, café, impresora, salas de reuniones, zonas silenciosas, comunidad/charlas, planes flexibles y acceso 24/7.

5) Precios (S/) – referencia
- Base Operativa/Hangar (individual): hora 20 · día 55 · semana 280 · mes 400
- Unidades (privado 1p): hora 28 · día 70 · mes 420
- Reserva (dúo 1–2): hora 30 · día 65
- Bunker (2–4): hora 54 · día 280 · semana 480
- Brigada (2–4): hora 100 · día 350 · mes 1600
- Base de Mando (2–10): hora 145 · día 290 · semana 490
`.trim(),
  adminGroupId: process.env.WP_ADMIN_GROUP_ID,
  adminGroupName: process.env.WP_ADMIN_GROUP_NAME ?? "Torre de Control La Base",
  adminDirectNumber: process.env.WP_ADMIN_DIRECT_NUMBER ?? "51960270555@c.us",
  websiteUrl: process.env.LABASE_WEBSITE ?? "https://labase.pe",

  spaceAliases: {
    unidad: [
      "unidad",
      "privado 1",
      "unidad 1",
      "sala privada 1",
      "unipersonal",
      "para una persona",
    ],
    bunker: [
      "bunker",
      "bunkers",
      "los bunkers",
      "sala privada 2",
      "privado 2",
      "para 2",
    ],
    brigada: ["brigada", "la brigada", "equipo 2-4", "para 3", "para 4"],
    "base de mando": [
      "base de mando",
      "mando",
      "sala 2-10",
      "reunión",
      "reunion",
    ],
    "base operativa": [
      "base operativa",
      "operativa",
      "open space",
      "individual en compartido",
    ],
    "el hangar": [
      "hangar",
      "el hangar",
      "creatividad",
      "individual en compartido",
    ],
  },

  spaceHints: {
    onePerson:
      "Para 1 persona: *Unidad (privado 1p)*. También puedes usar *Base Operativa* o *El Hangar* como individual en zona compartida.",
  },
  openHours: {
    timezone: "America/Lima",
    start: "09:00",
    end: "19:30",
  },
};
