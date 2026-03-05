<template>
  <div
    class="h-screen border-b border-offwhite-950 flex flex-col items-center justify-center gap-4"
  >
    <h1 class="text-xl font-bold">Hero/Introdução</h1>
    <ul class="list-disc list-inside ml-4 bg-light-900">
      <li>Seu nome completo</li>
      <li>
        Título/especialização (ex: "Desenvolvedor Full Stack" ou "Front-end
        Developer")
      </li>
      <li>Frase de impacto curta (1 linha sobre o que você faz)</li>
      <li>Call-to-action principal (botão "Ver Projetos" ou "Contato")</li>
      <li>Links sociais (GitHub, LinkedIn no mínimo)</li>
    </ul>

    <small
      >Por quê: É a primeira impressão. Precisa deixar claro quem você é em 3
      segundos.</small
    >
  </div>

  <div
    class="h-screen border-b border-offwhite-950 flex flex-col items-center justify-center gap-4"
  >
    <h1 class="text-xl font-bold">Projetos</h1>
    <ul class="list-disc list-inside ml-4">
      <li>3-6 projetos principais (qualidade > quantidade)</li>
      <li>
        Para cada projeto:
        <ul class="list-disc list-inside ml-4">
          <li>Screenshot/preview</li>
          <li>Nome do projeto</li>
          <li>Descrição curta (2-3 linhas)</li>
          <li>Tecnologias usadas (tags)</li>
          <li>Link para GitHub (obrigatório)</li>
          <li>Link para demo/live (se tiver)</li>
        </ul>
      </li>
    </ul>

    <small
      >Por quê: É o coração do portfólio. Recrutadores vão direto aqui. Seu
      código fala mais que palavras.</small
    >
    <small
      >Dica: Destaque 1-2 projetos que você tem mais orgulho no topo.</small
    >
  </div>

  <div
    class="h-screen border-b border-offwhite-950 flex flex-col items-center justify-center gap-4"
  >
    <h1 class="text-xl font-bold">Tecnologias/Habilidades</h1>
    <h2 class="text-lg font-bold">O que incluir:</h2>
    <ul class="list-disc list-inside ml-4">
      <li>Linguagens (JavaScript, TypeScript, Python, etc)</li>
      <li>Frameworks/Libs (React, Vue, Node.js, etc)</li>
      <li>Ferramentas (Git, Docker, Figma, etc)</li>
      <li>Banco de dados (PostgreSQL, MongoDB, etc)</li>
    </ul>

    <small
      >Por quê: Passa rapidamente por ATS (sistemas de triagem) e deixa claro
      seu stack.</small
    >
    <small
      >Dica: Agrupe por categoria (Frontend, Backend, Tools) ou liste apenas as
      que você realmente domina.</small
    >
  </div>

  <div
    class="h-screen border-b border-offwhite-950 flex flex-col items-center justify-center gap-4"
  >
    <h1 class="text-xl font-bold">Contato</h1>
    <h2 class="text-lg font-bold">O que incluir:</h2>
    <ul class="list-disc list-inside ml-4">
      <li>Email clicável</li>
      <li>LinkedIn</li>
      <li>GitHub</li>
      <li>Formulário de contato OU apenas links (formulário é opcional)</li>
      <li>Localização (cidade/país - opcional)</li>
      <li>
        Status de disponibilidade ("Disponível para freela" ou "Buscando CLT")
      </li>
    </ul>

    <small
      >Por quê: Facilitar que te encontrem. Sem fricção = mais
      oportunidades.</small
    >
  </div>

  <div
    class="h-[33.3vh] border-b border-offwhite-950 flex flex-col items-center justify-center gap-4"
  >
    <h1 class="text-xl font-bold">⭐ Sobre Mim</h1>
    <ul class="list-disc list-inside ml-4">
      <li>2-3 parágrafos sobre você</li>
      <li>Sua história (como começou na programação)</li>
      <li>O que te motiva</li>
      <li>Seus objetivos atuais</li>
      <li>Hobbies/interesses (opcional, mas humaniza)</li>
    </ul>

    <small
      >Por quê: Mostra personalidade. Recrutadores contratam pessoas, não
      robôs.</small
    >
    <small
      >Dica: Seja autêntico, não use clichês tipo "apaixonado por tecnologia"
      sem contexto.</small
    >
  </div>

  <div
    class="h-[33.3vh] border-b border-offwhite-950 flex flex-col items-center justify-center gap-4"
  >
    <h1 class="text-xl font-bold">⭐ Open Source</h1>
    <ul class="list-disc list-inside ml-4">
      <li>Se contribui para projetos open source</li>
      <li>Se mantém alguma lib/ferramenta</li>
    </ul>

    <small>Por quê: Muito valorizado, mostra espírito colaborativo.</small>
  </div>

  <div
    class="h-[33.3vh] border-b border-offwhite-950 flex flex-col items-center justify-center gap-4"
  >
    <h1 class="text-xl font-bold">❌ NÃO PRECISA (Pode pular)</h1>
    <ul class="list-disc list-inside ml-4">
      <li>
        ❌ Barra de progresso de habilidades (70% JavaScript, etc) - É subjetivo
        demais
      </li>
      <li>❌ Idade - Desnecessário e pode gerar viés</li>
      <li>❌ Foto profissional - Opcional (EUA/Europa não usa muito)</li>
      <li>❌ Hobbies não relacionados - Só se agregar valor</li>
      <li>
        ❌ "Objetivos" genéricos - "Busco crescimento profissional..." (todo
        mundo busca)
      </li>
    </ul>

    <small>Por quê: Muito valorizado, mostra espírito colaborativo.</small>
  </div>

  <div class="h-screen flex flex-col items-center justify-center gap-4">
    <h1 class="text-xl font-bold">📊 ORDEM RECOMENDADA DAS SEÇÕES</h1>
    <ul class="list-disc list-inside ml-4 -mr-3">
      <li>Hero</li>
      <li>Experiência Profissional (resumida)</li>
      <li>Projetos (só os melhores)</li>
      <li>Tecnologias</li>
      <li>Sobre Mim</li>
      <li>Contato</li>
    </ul>

    <hr />

    <h1 class="text-xl font-bold">✅ CHECKLIST FINAL</h1>

    <ul class="list-disc list-inside ml-4 -mt-3">
      <li>Nome e o que você faz</li>
      <li>Pelo menos 3 projetos com código no GitHub</li>
      <li>Lista de tecnologias que domina</li>
      <li>Forma de contato (email + LinkedIn)</li>
      <li>Links para GitHub</li>
      <li>Responsivo (funciona no celular)</li>
      <li>Carrega rápido (<3 segundos)</li>
      <li class="text-gray-400">Texto "Sobre" bem escrito</li>
      <li class="text-gray-400">Screenshots dos projetos</li>
      <li class="text-gray-400">Demos dos projetos funcionando</li>
      <li class="text-gray-400">Blog ou artigos</li>
      <li class="text-gray-400">Contribuições open source</li>
    </ul>

    <hr />

    <h1 class="text-xl font-bold">🎯 REGRA DE OURO</h1>
    <small
      >Melhor ter: 3 projetos INCRÍVEIS bem documentados do que 10 projetos
      medianos</small
    >
    <small
      >Melhor ter: 5 tecnologias que você DOMINA do que 20 que você
      "conhece"</small
    >
  </div>

  <div class="min-h-screen p-8">
    <h1 class="text-xl font-bold mb-6">📜 DATA:</h1>
    <pre class="bg-gray-900 glass p-4 rounded overflow-auto text-sm">{{
      JSON.stringify(portfolioData, null, 2)
    }}</pre>
  </div>
</template>

<script setup>
const { data: portfolioData } = useLocale();
</script>

<style scoped></style>
