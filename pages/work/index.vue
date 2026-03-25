<template>
  <Nav />

  <section class="flex flex-col gap-5 items-center pt-52 px-10 pb-40">
    <p class="font-mono text-base lg:text-lg text-offwhite-950 uppercase">
      ( {{ data.projects.subtitle }} )
    </p>

    <h1
      class="text-center text-5xl lg:text-7xl uppercase tracking-tighter font-medium leading-[1.05]"
    >
      {{ data.projects.title.line_1 }} <br class="hidden lg:block" />
      {{ data.projects.title.line_2 }}
    </h1>
  </section>

  <div class="flex items-center justify-end gap-4 px-4 py-2">
    <button
      class="relative flex items-center gap-1 text-sm text-gray-700 group"
      @click="openModal"
    >
      <Icon
        name="lucide:search"
        size="12"
        class="transition-transform duration-300 group-hover:-rotate-45"
      />

      <span>{{ data.projects.filter.button }}</span>

      <span
        v-if="hasActiveFilter"
        class="absolute -top-1 -right-1.5 w-1.5 h-1.5 rounded-full bg-primary-500"
      />
    </button>

    <span
      class="text-xs bg-offwhite-500 text-offwhite-950 px-2 py-1 rounded-md cursor-pointer"
      @click="openModal"
    >
      <small>⌘</small> K
    </span>
  </div>

  <section class="p-4 border-t border-offwhite-500">
    <div class="flex flex-col gap-2">
      <ProjectListItem
        v-for="project in filteredProjects"
        :key="project.name"
        :project="project"
        :categories="data.projects.categories"
        :subcategories="data.projects.subcategories"
      />
    </div>
  </section>

  <!-- Filter Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-gray-950/40 backdrop-blur-sm"
          @click="closeModal"
        />

        <!-- Modal -->
        <div
          class="relative w-full max-w-md bg-offwhite-100 rounded-xl shadow-2xl overflow-hidden"
        >
          <!-- Search Input -->
          <div
            class="flex items-center gap-3 px-4 py-3 border-b border-offwhite-500"
          >
            <Icon
              name="lucide:search"
              size="16"
              class="text-gray-500 shrink-0"
            />
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              :placeholder="data.projects.filter.placeholder"
              class="flex-1 bg-transparent text-sm text-gray-950 placeholder-gray-500 outline-none"
            />
            <button
              class="text-[10px] text-gray-500 bg-offwhite-400 px-2 py-0.5 rounded font-mono shrink-0"
              @click="closeModal"
            >
              ESC
            </button>
          </div>

          <!-- Options -->
          <div class="max-h-[300px] overflow-y-auto py-2">
            <!-- Categoria -->
            <p
              class="px-4 pt-2 pb-1 text-[11px] font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ data.projects.filter.category_label }}
            </p>

            <button
              v-show="matchesSearch(data.projects.filter.all)"
              class="flex items-center justify-between w-full px-4 py-2 text-sm text-left transition-colors hover:bg-offwhite-300"
              :class="
                selectedCategory === null
                  ? 'text-gray-950 font-semibold'
                  : 'text-gray-700'
              "
              @click="selectCategory(null)"
            >
              <span>{{ data.projects.filter.all }}</span>
              <span
                v-if="selectedCategory === null"
                class="w-2.5 h-2.5 rounded-full bg-primary-500"
              />
            </button>

            <button
              v-for="(cat, key) in filteredCategories"
              :key="key"
              class="flex items-center justify-between w-full px-4 py-2 text-sm text-left transition-colors hover:bg-offwhite-300"
              :class="
                selectedCategory === key
                  ? 'text-gray-950 font-semibold'
                  : 'text-gray-700'
              "
              @click="selectCategory(key)"
            >
              <span>{{ cat.name }}</span>
              <span
                v-if="selectedCategory === key"
                class="w-2.5 h-2.5 rounded-full bg-primary-500"
              />
            </button>

            <!-- Tipo -->
            <p
              v-show="hasVisibleSubcategories"
              class="px-4 pt-4 pb-1 text-[11px] font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ data.projects.filter.type_label }}
            </p>

            <button
              v-for="(subName, subKey) in filteredSubcategories"
              :key="subKey"
              class="flex items-center justify-between w-full px-4 py-2 text-sm text-left transition-colors hover:bg-offwhite-300"
              :class="
                selectedSubcategory === subKey
                  ? 'text-gray-950 font-semibold'
                  : 'text-gray-700'
              "
              @click="selectSubcategory(subKey)"
            >
              <span>{{ subName }}</span>
              <span
                v-if="selectedSubcategory === subKey"
                class="w-2.5 h-2.5 rounded-full bg-primary-500"
              />
            </button>

            <!-- Projetos (search by name) -->
            <template v-if="searchQuery && matchingProjects.length">
              <p
                class="px-4 pt-4 pb-1 text-[11px] font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ data.projects.filter.projects_label }}
              </p>

              <button
                v-for="project in matchingProjects"
                :key="project.name"
                class="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-700 transition-colors hover:bg-offwhite-300"
                @click="selectProject(project)"
              >
                <span>{{ project.name }}</span>
                <span class="text-[11px] text-gray-500">
                  {{ getCategoryName(project.category) }}
                </span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import Nav from "../../components/layout/Nav.vue";
import ProjectListItem from "../../components/ui/ProjectListItem.vue";

useHead({
  title: "MARLON.CO - Work",
});

const { data } = useLocale();
const route = useRoute();
const router = useRouter();

// Modal state
const showModal = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const selectedCategory = ref(route.query.category || null);
const selectedSubcategory = ref(route.query.type || null);

function updateURL() {
  const query = {};
  if (selectedCategory.value) query.category = selectedCategory.value;
  if (selectedSubcategory.value) query.type = selectedSubcategory.value;
  router.replace({ query });
}

function openModal() {
  showModal.value = true;
  searchQuery.value = "";
  nextTick(() => {
    searchInput.value?.focus();
  });
}

function closeModal() {
  showModal.value = false;
  searchQuery.value = "";
}

function selectCategory(key) {
  selectedCategory.value = key;
  selectedSubcategory.value = null;
  updateURL();
  closeModal();
}

function selectSubcategory(key) {
  if (selectedSubcategory.value === key) {
    selectedSubcategory.value = null;
  } else {
    selectedSubcategory.value = key;
  }
  updateURL();
  closeModal();
}

function matchesSearch(text) {
  if (!searchQuery.value) return true;
  return text.toLowerCase().includes(searchQuery.value.toLowerCase());
}

const filteredCategories = computed(() => {
  const cats = data.value.projects.categories;
  if (!searchQuery.value) return cats;
  const result = {};
  for (const [key, cat] of Object.entries(cats)) {
    if (cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      result[key] = cat;
    }
  }
  return result;
});

const filteredSubcategories = computed(() => {
  const subs = data.value.projects.subcategories;
  if (!searchQuery.value) return subs;
  const result = {};
  for (const [key, name] of Object.entries(subs)) {
    if (name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      result[key] = name;
    }
  }
  return result;
});

const hasVisibleSubcategories = computed(() => {
  return Object.keys(filteredSubcategories.value).length > 0;
});

const hasActiveFilter = computed(() => {
  return selectedCategory.value !== null || selectedSubcategory.value !== null;
});

const matchingProjects = computed(() => {
  if (!searchQuery.value) return [];
  const q = searchQuery.value.toLowerCase();
  return data.value.projects.project_list.filter((p) =>
    p.name.toLowerCase().includes(q),
  );
});

function getCategoryName(key) {
  const cat = data.value.projects.categories[key];
  return cat ? cat.name : key;
}

function selectProject(project) {
  selectedCategory.value = project.category;
  selectedSubcategory.value = null;
  updateURL();
  closeModal();
}

// Filter projects
const filteredProjects = computed(() => {
  let projects = data.value.projects.project_list;
  if (selectedCategory.value) {
    projects = projects.filter((p) => p.category === selectedCategory.value);
  }
  if (selectedSubcategory.value) {
    projects = projects.filter(
      (p) => p.subcategory === selectedSubcategory.value,
    );
  }
  return projects;
});

// Keyboard shortcut: Ctrl+K / Cmd+K
function handleKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    if (showModal.value) {
      closeModal();
    } else {
      openModal();
    }
  }
  if (e.key === "Escape" && showModal.value) {
    closeModal();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
