<template>
  <div class="relative min-h-screen bg-[#09090b] text-offwhite-100">
    <Nav :links="navLinks" base-path="/freela" :show-language-switcher="false" />

    <!-- Hero com background animado (só aqui, não na página inteira) -->
    <section class="relative overflow-hidden">
      <NebulaField />

      <div class="relative z-10 mx-auto max-w-6xl px-6 pt-32 md:px-10">
        <div class="py-16 md:py-24">
          <p class="mb-6 font-mono text-xs uppercase tracking-widest text-primary-500">
            Desenvolvedor · desde 2020
          </p>

          <h1 class="max-w-4xl text-4xl font-normal leading-[1.1] md:text-6xl">
            Sistemas web, automações e painéis sob medida
            <span class="text-offwhite-950">
              — para empresas que já superaram a planilha.
            </span>
          </h1>

          <p class="mt-8 max-w-xl text-sm leading-relaxed text-offwhite-950 md:text-base">
            Eu construo o software que a sua operação precisa e que nenhuma
            ferramenta genérica entrega: do painel que substitui a planilha ao
            agente de IA que responde e qualifica no WhatsApp.
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-4">
            <a :href="whatsappUrl" target="_blank" rel="noopener">
              <ButtonAnimated text="Falar sobre meu projeto" color="light" />
            </a>
            <a
              href="#servicos"
              class="font-mono text-xs uppercase tracking-widest text-offwhite-950 transition-colors hover:text-offwhite-100"
            >
              Ver serviços ↓
            </a>
          </div>
        </div>
      </div>
    </section>

    <main class="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
      <!-- ─── 2. Barra de prova ──────────────────────────────────── -->
      <section
        class="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-offwhite-100/10 py-6"
      >
        <span class="font-mono text-xs uppercase tracking-widest text-offwhite-950">
          Stack
        </span>
        <span
          v-for="tech in stack"
          :key="tech"
          class="text-xs text-offwhite-500 md:text-sm"
        >
          {{ tech }}
        </span>
      </section>

      <!-- ─── 3. Diagnóstico (a dor) ─────────────────────────────── -->
      <section class="py-20 md:py-28">
        <SectionLabel text="O problema" />
        <h2 class="mt-4 max-w-2xl text-3xl font-normal leading-tight md:text-4xl">
          Se algum destes soa familiar, o problema não é a sua equipe — é a
          ferramenta.
        </h2>

        <div class="mt-12 grid gap-px overflow-hidden rounded-2xl bg-offwhite-100/10 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(pain, i) in pains"
            :key="i"
            class="bg-gray-950 p-6 md:p-8"
          >
            <span class="font-mono text-xs text-primary-500">
              {{ String(i + 1).padStart(2, "0") }}
            </span>
            <p class="mt-3 text-sm leading-relaxed text-offwhite-500">
              {{ pain }}
            </p>
          </div>
        </div>
      </section>

      <!-- ─── 4. Serviços ────────────────────────────────────────── -->
      <section id="servicos" class="py-20 md:py-28">
        <SectionLabel text="Serviços" />
        <h2 class="mt-4 max-w-2xl text-3xl font-normal leading-tight md:text-4xl">
          Três frentes. Escopo, prazo e valor fechados antes de começar.
        </h2>

        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <article
            v-for="service in services"
            :key="service.title"
            class="flex flex-col rounded-2xl border border-offwhite-100/10 p-6 transition-colors hover:border-primary-500/40 md:p-8"
          >
            <h3 class="text-xl font-medium leading-tight">
              {{ service.title }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-offwhite-950">
              {{ service.pitch }}
            </p>

            <p class="mt-6 font-mono text-xs uppercase tracking-widest text-offwhite-950">
              Para quem é
            </p>
            <p class="mt-2 text-sm text-offwhite-500">{{ service.forWho }}</p>

            <p class="mt-6 font-mono text-xs uppercase tracking-widest text-offwhite-950">
              O que entrego
            </p>
            <ul class="mt-3 flex flex-col gap-2">
              <li
                v-for="item in service.deliverables"
                :key="item"
                class="flex gap-2 text-sm text-offwhite-500"
              >
                <span class="text-primary-500">—</span>
                <span>{{ item }}</span>
              </li>
            </ul>

            <div
              class="mt-8 flex items-center justify-between border-t border-offwhite-100/10 pt-4 text-xs"
            >
              <span class="font-mono uppercase tracking-widest text-offwhite-950">
                Prazo
              </span>
              <span class="text-offwhite-500">{{ service.timeline }}</span>
            </div>
            <p class="mt-3 text-xs leading-relaxed text-offwhite-950">
              {{ service.stack }}
            </p>
          </article>
        </div>
      </section>

      <!-- ─── 5. Cenários de aplicação ───────────────────────────── -->
      <section class="py-20 md:py-28">
        <SectionLabel text="Na prática" />
        <h2 class="mt-4 max-w-2xl text-3xl font-normal leading-tight md:text-4xl">
          O que muda na rotina de quem usa.
        </h2>

        <div class="mt-12 flex flex-col divide-y divide-offwhite-100/10 border-y border-offwhite-100/10">
          <div
            v-for="(sc, i) in scenarios"
            :key="i"
            class="grid items-center gap-4 py-8 md:grid-cols-[1fr_auto_1fr] md:gap-8"
          >
            <p class="text-sm text-offwhite-950 line-through decoration-offwhite-950/40">
              {{ sc.before }}
            </p>
            <span class="font-mono text-primary-500">→</span>
            <p class="text-sm text-offwhite-100 md:text-base">{{ sc.after }}</p>
          </div>
        </div>
      </section>

      <!-- ─── 6. Processo ────────────────────────────────────────── -->
      <section class="py-20 md:py-28">
        <SectionLabel text="Processo" />
        <h2 class="mt-4 max-w-2xl text-3xl font-normal leading-tight md:text-4xl">
          Como funciona do primeiro contato até o sistema no ar.
        </h2>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, i) in process"
            :key="i"
            class="border-t border-offwhite-100/20 pt-6"
          >
            <div class="flex items-baseline justify-between">
              <span class="font-mono text-2xl text-primary-500">
                {{ String(i + 1).padStart(2, "0") }}
              </span>
              <span class="font-mono text-xs uppercase tracking-widest text-offwhite-950">
                {{ step.duration }}
              </span>
            </div>
            <h3 class="mt-4 text-base font-medium">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-offwhite-950">
              {{ step.description }}
            </p>
          </div>
        </div>

        <p class="mt-10 max-w-2xl rounded-2xl bg-offwhite-100/5 p-6 text-sm leading-relaxed text-offwhite-500">
          <span class="text-offwhite-100">E se o escopo mudar no meio?</span>
          Acontece na maioria dos projetos. Ajustes pequenos entram sem custo
          extra; mudanças que alteram o escopo viram um novo bloco de trabalho,
          orçado e aprovado antes de eu começar. Você nunca recebe uma fatura
          surpresa.
        </p>
      </section>

      <!-- ─── 7. Projetos reais ──────────────────────────────────── -->
      <section class="py-20 md:py-28">
        <SectionLabel text="Projetos" />
        <h2 class="mt-4 max-w-2xl text-3xl font-normal leading-tight md:text-4xl">
          Trabalho entregue, não mockup de portfólio.
        </h2>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <article
            v-for="project in projects"
            :key="project.name"
            class="rounded-2xl border border-offwhite-100/10 p-6"
          >
            <div class="mb-6 aspect-video rounded-xl bg-offwhite-100/5"></div>
            <h3 class="text-base font-medium">{{ project.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-offwhite-950">
              {{ project.description }}
            </p>
          </article>
        </div>

        <NuxtLink
          to="/work"
          class="mt-10 inline-block font-mono text-xs uppercase tracking-widest text-offwhite-950 transition-colors hover:text-primary-500"
        >
          Ver todos os projetos →
        </NuxtLink>
      </section>

      <!-- ─── 8. FAQ ─────────────────────────────────────────────── -->
      <section class="py-20 md:py-28">
        <SectionLabel text="Dúvidas" />
        <h2 class="mt-4 max-w-2xl text-3xl font-normal leading-tight md:text-4xl">
          O que quase todo cliente pergunta antes de fechar.
        </h2>

        <div class="mt-12 flex flex-col border-t border-offwhite-100/10">
          <details
            v-for="(item, i) in faq"
            :key="i"
            class="group border-b border-offwhite-100/10 py-5"
          >
            <summary
              class="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium md:text-base"
            >
              {{ item.q }}
              <span
                class="font-mono text-primary-500 transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p class="mt-4 max-w-2xl text-sm leading-relaxed text-offwhite-950">
              {{ item.a }}
            </p>
          </details>
        </div>
      </section>

      <!-- ─── 9. Sobre mim ───────────────────────────────────────── -->
      <section class="py-20 md:py-28">
        <SectionLabel text="Quem faz" />

        <div class="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <div class="h-32 w-32 shrink-0 rounded-2xl bg-offwhite-100/5"></div>

          <div class="max-w-xl">
            <h2 class="text-2xl font-normal">Marlon Coimbra</h2>
            <p class="mt-4 text-sm leading-relaxed text-offwhite-500">
              Sou desenvolvedor desde 2020 e trabalho sozinho por escolha: você
              fala direto com quem escreve o código, sem camada de gerente de
              projeto no meio.
            </p>
            <p class="mt-3 text-sm leading-relaxed text-offwhite-500">
              Meu foco é software que resolve problema de operação — não o
              projeto mais bonito do portfólio, mas o que a sua equipe usa
              todo dia sem reclamar.
            </p>

            <div class="mt-6 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="text-offwhite-950 transition-colors hover:text-primary-500"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── 10. CTA final ──────────────────────────────────────── -->
      <section class="py-20 md:py-28">
        <div class="rounded-2xl border border-offwhite-100/10 p-8 md:p-12">
          <h2 class="max-w-2xl text-3xl font-normal leading-tight md:text-4xl">
            Me conta o que está travando na sua operação.
          </h2>
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-offwhite-950">
            Respondo em até 1 dia útil. A primeira conversa é um diagnóstico —
            se eu não for a melhor opção para o seu caso, eu digo.
          </p>

          <form class="mt-10 grid max-w-2xl gap-5 sm:grid-cols-2" @submit.prevent>
            <FormField label="Nome" placeholder="Como devo te chamar" />
            <FormField label="WhatsApp ou e-mail" placeholder="Onde te respondo" />

            <div class="sm:col-span-2">
              <label class="font-mono text-xs uppercase tracking-widest text-offwhite-950">
                Faixa de orçamento
              </label>
              <div class="mt-3 flex flex-wrap gap-2">
                <button
                  v-for="range in budgetRanges"
                  :key="range"
                  type="button"
                  class="rounded-full border px-4 py-2 text-xs transition-colors"
                  :class="
                    budget === range
                      ? 'border-primary-500 bg-primary-500/10 text-primary-300'
                      : 'border-offwhite-100/15 text-offwhite-950 hover:border-offwhite-100/40'
                  "
                  @click="budget = range"
                >
                  {{ range }}
                </button>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label class="font-mono text-xs uppercase tracking-widest text-offwhite-950">
                O que você precisa
              </label>
              <textarea
                rows="4"
                placeholder="Descreva o problema, não a solução — eu cuido dessa parte"
                class="mt-3 w-full rounded-xl border border-offwhite-100/15 bg-transparent px-4 py-3 text-sm text-offwhite-100 outline-none transition-colors placeholder:text-offwhite-950/60 focus:border-primary-500"
              />
            </div>

            <div class="sm:col-span-2">
              <ButtonAnimated text="Enviar" color="light" />
            </div>
          </form>
        </div>
      </section>
    </main>

    <!-- ─── 11. Footer ───────────────────────────────────────────── -->
    <footer class="relative z-10 border-t border-offwhite-100/10">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-xs text-offwhite-950 md:flex-row md:items-center md:justify-between md:px-10"
      >
        <span class="font-mono tracking-widest">MARLON.CO</span>
        <a :href="`mailto:${email}`" class="transition-colors hover:text-primary-500">
          {{ email }}
        </a>
        <NuxtLink to="/" class="transition-colors hover:text-primary-500">
          Ver portfólio
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Nav from "../components/layout/Nav.vue";
import NebulaField from "../components/freela/NebulaField.vue";
import ButtonAnimated from "../components/ui/ButtonAnimated.vue";
import SectionLabel from "../components/freela/SectionLabel.vue";
import FormField from "../components/freela/FormField.vue";

// TODO: definir links finais da navegação
const navLinks = [
  { name: "Serviços", href: "#servicos" },
];

// Rota oculta: fora do índice dos buscadores enquanto estiver em rascunho.
useHead({
  title: "Serviços — Marlon Coimbra",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
  bodyAttrs: { class: "bg-[#09090b]" },
});

// TODO: trocar pelo número real antes de divulgar a página.
const whatsappUrl = "https://wa.me/5500000000000";
const email = "umarlon.co@gmail.com";

const budget = ref(null);
const budgetRanges = [
  "Até R$ 5k",
  "R$ 5k – 15k",
  "R$ 15k – 40k",
  "Acima de R$ 40k",
  "Ainda não sei",
];

const stack = [
  "Vue.js",
  "Nuxt",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "n8n",
  "WhatsApp API",
];

const pains = [
  "A planilha trava, quebra fórmula e ninguém sabe qual é a versão certa.",
  "Lead chega no WhatsApp e esfria porque ninguém respondeu a tempo.",
  "A equipe repete a mesma tarefa manual todo santo dia.",
  "Você não consegue ver os números da operação sem consolidar na mão.",
  "A ferramenta que vocês usam foi feita para outra empresa, não para a sua.",
  "Cada setor tem seu arquivo, e nenhum conversa com o outro.",
];

const services = [
  {
    title: "Sistemas & Painéis sob medida",
    pitch:
      "Software feito para a sua regra de negócio, não uma ferramenta genérica adaptada na marra.",
    forWho:
      "Empresas que cresceram e hoje travam em planilhas ou sistemas que não encaixam.",
    deliverables: [
      "Painéis de gestão e dashboards em tempo real",
      "Sistemas internos e CRMs próprios",
      "Migração de planilhas para banco de dados",
      "Controle de acesso por perfil de usuário",
      "SaaS e MVPs do zero ao deploy",
    ],
    timeline: "3 a 10 semanas",
    stack: "Vue.js · Nuxt · TypeScript · Node.js · PostgreSQL",
  },
  {
    title: "Agentes de IA & Automação",
    pitch:
      "Fluxos que atendem, qualificam e executam tarefas sozinhos — integrados aos seus sistemas.",
    forWho:
      "Operações com alto volume de atendimento ou tarefas repetitivas consumindo a equipe.",
    deliverables: [
      "Agentes conversacionais treinados com seus dados",
      "Qualificação de lead e agendamento automático",
      "Integração com WhatsApp API, CRM e ERPs",
      "Automação de processos internos com n8n",
      "Painel de acompanhamento das conversas",
    ],
    timeline: "2 a 6 semanas",
    stack: "n8n · APIs de LLM · WhatsApp Business API · Webhooks",
  },
  {
    title: "Sites & Landing Pages",
    pitch:
      "Página rápida, feita para converter e medir — não só para ficar bonita no portfólio.",
    forWho:
      "Lançamentos, empresas de serviço e marcas que investem em tráfego pago.",
    deliverables: [
      "Landing pages orientadas a conversão",
      "Sites institucionais responsivos",
      "Otimização de Core Web Vitals e SEO técnico",
      "Rastreamento com GA4, Meta Pixel e GTM",
      "Configuração de domínio e publicação",
    ],
    timeline: "1 a 3 semanas",
    stack: "Nuxt · Tailwind · Vercel · GA4 · GTM",
  },
];

const scenarios = [
  {
    before: "Planilha de pedidos compartilhada entre 6 pessoas",
    after: "Painel web com login, permissões por setor e histórico de alterações",
  },
  {
    before: "WhatsApp respondido na mão, das 9h às 18h",
    after: "Agente que responde, qualifica e agenda 24/7 — e passa o bastão quando precisa",
  },
  {
    before: "Relatório consolidado no braço no fim do mês",
    after: "Dashboard atualizado em tempo real, aberto no celular a qualquer hora",
  },
  {
    before: "Site lento que queima verba de anúncio",
    after: "Página com carregamento instantâneo e cada clique rastreado",
  },
];

const process = [
  {
    title: "Conversa",
    duration: "30–45 min",
    description:
      "Entendo a operação e o problema real. Sem custo e sem compromisso.",
  },
  {
    title: "Escopo e proposta",
    duration: "até 3 dias",
    description:
      "O que será feito, prazo e valor fechados por escrito. Nada começa sem seu aceite.",
  },
  {
    title: "Construção",
    duration: "2–10 semanas",
    description:
      "Entregas parciais toda semana. Você acompanha, testa e ajusta durante o caminho.",
  },
  {
    title: "Deploy e suporte",
    duration: "contínuo",
    description:
      "Publicação, treinamento da equipe e período de acompanhamento incluso.",
  },
];

// TODO: substituir pelos projetos reais (reaproveitar dados de /work).
const projects = [
  {
    name: "Projeto 1",
    description: "Problema → o que foi construído → resultado.",
  },
  {
    name: "Projeto 2",
    description: "Problema → o que foi construído → resultado.",
  },
  {
    name: "Projeto 3",
    description: "Problema → o que foi construído → resultado.",
  },
];

const faq = [
  {
    q: "Como você cobra?",
    a: "Por escopo fechado, não por hora. Depois da conversa inicial eu envio uma proposta com o que será entregue, o prazo e o valor total. Você sabe exatamente quanto vai pagar antes de eu escrever a primeira linha de código.",
  },
  {
    q: "Quanto tempo leva um projeto?",
    a: "Depende do escopo. Uma landing page fica pronta em 1 a 3 semanas; um painel de gestão completo, entre 3 e 10 semanas. O prazo entra na proposta e eu entrego em blocos parciais para você acompanhar o avanço.",
  },
  {
    q: "E se eu precisar mudar algo depois da entrega?",
    a: "Ajustes pequenos entram no período de acompanhamento sem custo. Funcionalidades novas viram um novo bloco de trabalho, orçado antes de começar.",
  },
  {
    q: "Quem faz a manutenção?",
    a: "Eu, se você quiser. Ofereço acompanhamento mensal para correções, ajustes e evoluções. Também é possível seguir sem contrato de manutenção e me acionar pontualmente.",
  },
  {
    q: "O código e os dados são meus?",
    a: "Sim. Ao fim do projeto o código-fonte e todos os dados são seus, hospedados em contas no seu nome. Não existe aluguel de plataforma nem dependência de mim para continuar.",
  },
  {
    q: "Você trabalha sozinho. E se ficar indisponível?",
    a: "Trabalho com código documentado, repositório no seu GitHub e infraestrutura em contas suas. Qualquer outro desenvolvedor consegue continuar de onde parei — e para projetos maiores, aciono profissionais de confiança da minha rede.",
  },
  {
    q: "Atende empresas de qual porte?",
    a: "Pequenas e médias empresas, principalmente as que já têm operação rodando e precisam organizar ou automatizar processos. Segmento não importa muito; o que importa é ter um problema claro para resolver.",
  },
];

const socialLinks = [
  { label: "Portfólio", href: "/" },
  { label: "GitHub", href: "https://github.com/MarlonVictor" },
  { label: "LinkedIn", href: "https://linkedin.com/in/marloncoimbra" },
];
</script>
