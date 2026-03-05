<template>
  <article class="group bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-all hover:scale-105">
    <!-- Imagem do projeto -->
    <div class="relative h-48 bg-slate-800 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
      <!-- Substitua por imagens reais dos seus projetos -->
      <div class="absolute inset-0 flex items-center justify-center">
        <Icon name="mdi:application" size="64" class="text-slate-700" />
      </div>
    </div>
    
    <!-- Conteúdo -->
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
        {{ title }}
      </h3>
      
      <p class="text-slate-400 text-sm mb-4 line-clamp-2">
        {{ description }}
      </p>
      
      <!-- Tags -->
      <div class="flex gap-2 flex-wrap mb-4">
        <span 
          v-for="tag in parsedTags" 
          :key="tag"
          class="px-3 py-1 bg-slate-800 text-xs rounded-full text-slate-300"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- Links -->
      <div class="flex gap-3">
        <a 
          v-if="github"
          :href="github" 
          target="_blank"
          class="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <Icon name="mdi:github" size="18" />
          Código
        </a>
        <a 
          v-if="demo"
          :href="demo" 
          target="_blank"
          class="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Icon name="mdi:open-in-new" size="18" />
          Demo
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  image: String,
  github: String,
  demo: String,
  tags: String
})

const parsedTags = computed(() => {
  try {
    return JSON.parse(props.tags || '[]')
  } catch {
    return []
  }
})
</script>
