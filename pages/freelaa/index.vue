<template>
    <div class="relative min-h-screen bg-[#09090b] text-offwhite-100">
      <Nav
        :links="navLinks"
        base-path="/freelaa"
        :show-language-switcher="false"
        cta-text="Falar comigo"
        :cta-href="link()"
      />
    </div>
  </template>
  
  <script setup>
  import Nav from "../../components/layout/Nav.vue";
  
  const { link } = useFreelaWhatsApp();
  
  const navLinks = [
    { name: "Soluções", href: "/freela4/solucoes" },
    { name: "Cases", href: "/freela4/cases" },
    { name: "Sobre", href: "/freela4/sobre" },
  ];
  
  // "Abertura" fica fora: é só 100vh, não precisa de barra de progresso.
  const scenes = [
    { id: "cena-manifesto", label: "Galeria" },
    { id: "cena-cases", label: "Cases" },
    { id: "cena-solucoes", label: "Soluções" },
    { id: "cena-final", label: "Fim" },
  ];
  
  // Rota oculta + scroll invisível (bullets no lugar da scrollbar).
  useHead({
    title: "Serviços — Marlon Coimbra",
    meta: [{ name: "robots", content: "noindex, nofollow" }],
    bodyAttrs: { class: "bg-[#09090b]" },
    htmlAttrs: { class: "f4-stage" },
  });
  </script>
  