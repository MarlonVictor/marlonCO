// TODO: trocar pelo número real antes de divulgar a página.
const WHATSAPP_NUMBER = "5500000000000";

const MESSAGES = {
  default:
    "Olá, Marlon! Vi sua página de serviços e quero conversar sobre um projeto.",
  sistemas:
    "Olá, Marlon! Preciso de um sistema ou painel sob medida para a minha operação.",
  ia: "Olá, Marlon! Quero automatizar meu atendimento e processos com IA.",
  sites: "Olá, Marlon! Preciso de um site ou landing page que converta.",
} as const;

export type WhatsAppContext = keyof typeof MESSAGES;

/** Caminho único de conversão do /freela: todos os CTAs abrem o WhatsApp. */
export function useFreelaWhatsApp() {
  const link = (ctx: WhatsAppContext = "default") =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGES[ctx])}`;

  return { link };
}
