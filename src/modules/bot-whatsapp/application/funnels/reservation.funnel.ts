import { z } from "zod";
import dayjs from "dayjs";
import {
  ReservationLeadSchema,
  ReservationLead,
} from "../../domain/reservation_lead.schema";
import { chatbotConfig } from "../../data/config/chatbot.config";

type StepKey =
  | "name"
  | "phone"
  | "space"
  | "people"
  | "date"
  | "start_time"
  | "end_time"
  | "purpose"
  | "notes";
const QUESTIONS: Record<StepKey, string> = {
  name: "Tu *nombre y apellido*, por favor.",
  phone: "Tu *celular* (9 dígitos, empieza con 9).",
  space:
    "¿Qué *espacio* deseas? (unidad | bunker | brigada | base de mando | base operativa | el hangar)",
  people: "¿Para *cuántas personas*? (número entero)",
  date: "Indica *fecha* (ej. 12/09 o 2025-09-12).",
  start_time: "Indica *hora de inicio* (ej. 10:00).",
  end_time: "Indica *hora de fin* (ej. 12:30).",
  purpose: "¿Cuál es el *motivo* de la reserva? (breve)",
  notes: "Notas adicionales (opcional). Escribe '-' para omitir.",
};

const ORDER: StepKey[] = [
  "name",
  "phone",
  "space",
  "people",
  "date",
  "start_time",
  "end_time",
  "purpose",
  "notes",
];

export class ReservationFunnel {
  // estado por usuario (puedes migrar a Redis)
  private sessions = new Map<
    string,
    Partial<ReservationLead> & { _step?: number }
  >();

  start(chatId: string) {
    this.sessions.set(chatId, { _step: 0, wa_from: chatId } as any);
    return `🔐 Iniciando *reserva de espacio*.\nResponde de forma breve. ${
      QUESTIONS[ORDER[0]]
    }`;
  }

  isActive(chatId: string) {
    return this.sessions.has(chatId);
  }

  cancel(chatId: string) {
    this.sessions.delete(chatId);
    return "Flujo de *reserva* cancelado. Si deseas retomarlo, escribe *reservar*.";
  }

  nextQuestion(
    chatId: string,
    userText: string
  ): { done: boolean; message: string; payload?: ReservationLead } {
    const s = this.sessions.get(chatId);
    if (!s)
      return {
        done: true,
        message: "No hay flujo activo. Escribe *reservar* para iniciar.",
      };

    const stepIndex = s._step ?? 0;
    const key = ORDER[stepIndex];

    // Normaliza input
    const val = userText.trim();
    if (key === "notes" && val === "-") (s as any)[key] = undefined;
    else if (key === "people") (s as any)[key] = Number(val);
    else if (key === "space") {
      const normalized = this.normalizeSpace(val);
      (s as any)[key] = normalized;
    } else {
      (s as any)[key] = val;
    }

    // Avanza
    s._step = stepIndex + 1;
    this.sessions.set(chatId, s);

    if (s._step! < ORDER.length) {
      const nextKey = ORDER[s._step!];
      return { done: false, message: QUESTIONS[nextKey] };
    }

    // validar
    const candidate: any = {
      ...s,
      channel: "whatsapp",
      wa_from: chatId,
    };
    delete candidate._step;

    const parse = ReservationLeadSchema.safeParse(candidate);
    if (!parse.success) {
      const errors = parse.error.issues
        .map((i) => `• ${i.path.join(".")}: ${i.message}`)
        .join("\n");
      // Regresar al primer campo inválido
      s._step = Math.max(
        0,
        ORDER.findIndex((k) =>
          parse.error.issues.some((i) => (i.path?.[0] as string) === k)
        )
      );
      this.sessions.set(chatId, s);
      const nextKey = ORDER[s._step!];
      return {
        done: false,
        message: `Hay algunos datos por corregir:\n${errors}\n\nIntentemos de nuevo → ${QUESTIONS[nextKey]}`,
      };
    }

    const payload = parse.data as ReservationLead;
    this.sessions.delete(chatId);
    const summary = this.renderSummary(payload);
    return {
      done: true,
      message: `✅ Datos listos. Enviando al equipo...\n\n${summary}`,
      payload,
    };
  }

  private normalizeSpace(text: string): ReservationLead["space"] {
    const t = text.toLowerCase();
    const entries = Object.entries(chatbotConfig.spaceAliases) as [
      ReservationLead["space"],
      string[]
    ][];
    for (const [key, aliases] of entries) {
      if (key === t || aliases.some((a) => a.toLowerCase() === t)) return key;
    }
    // heurística simple
    if (t.includes("mando")) return "base de mando";
    if (t.includes("brigada")) return "brigada";
    if (t.includes("bunker")) return "bunker";
    if (t.includes("hangar")) return "el hangar";
    if (t.includes("operativa") || t.includes("open"))
      return "base de operativa" as any; // fallback
    return "unidad";
  }

  private renderSummary(p: ReservationLead) {
    const when = `${p.date} ${p.start_time}–${p.end_time}`;
    return [
      `*NUEVA SOLICITUD DE RESERVA*`,
      `• Nombre: ${p.name}`,
      `• Celular: ${p.phone}`,
      `• Espacio: ${p.space} | Personas: ${p.people}`,
      `• Fecha/Hora: ${when}`,
      `• Motivo: ${p.purpose}`,
      p.notes ? `• Notas: ${p.notes}` : undefined,
      `• Canal: WhatsApp (${p.wa_from})`,
    ]
      .filter(Boolean)
      .join("\n");
  }
}
