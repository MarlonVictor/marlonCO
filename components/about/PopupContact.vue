<template>
  <Teleport to="body">
    <Transition name="popup-contact">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex flex-col justify-end items-end gap-5 pb-5 bg-gray-950 sm:bg-transparent"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-contact-title"
      >
        <!-- Panel: fixo à direita, entra da direita -->
        <div
          class="panel relative flex flex-col w-full sm:max-w-xl h-max border-l border-[#ffffff15] shadow-2xl overflow-y-auto sm:rounded-l-xl"
          @click.stop
        >
          <!-- Conteúdo em cards -->
          <div class="flex-1 p-6 md:p-8 space-y-6">
            <!-- Card: Contato rápido -->
            <div
              class="rounded-xl bg-white/[0.03] border border-[#ffffff15] p-5 pt-4"
            >
              <span
                class="text-offwhite-950 text-xs font-mono uppercase tracking-wider leading-none"
              >
                {{ data?.about?.contact?.popup?.quick_contact }}
              </span>

              <div class="mt-2 relative">
                <Transition name="tooltip">
                  <div
                    v-if="emailCopied"
                    class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-offwhite-300 text-gray-900 text-xs font-medium whitespace-nowrap shadow-lg z-10"
                  >
                    {{ data?.about?.contact?.popup?.copied ?? "Copiado!" }}
                  </div>
                </Transition>
                <button
                  type="button"
                  class="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-white/[0.06] border border-[#ffffff15] text-offwhite-100 text-sm text-left hover:bg-white/[0.08] transition-colors"
                  @click="copyEmail"
                >
                  <Icon
                    name="lucide:mail"
                    size="18"
                    class="text-offwhite-950 shrink-0"
                  />
                  <div class="space-y-1">
                    <span
                      class="block text-offwhite-950 text-xs font-mono uppercase tracking-wider"
                    >
                      {{ data?.about?.contact?.popup?.email_label }}
                    </span>
                    <span>umarlonco@gmail.com</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Card: Enviar uma mensagem -->
            <div
              class="rounded-xl bg-white/[0.03] border border-[#ffffff15] p-5 md:p-6"
            >
              <div class="flex items-center gap-2">
                <Icon
                  name="lucide:message-square"
                  size="18"
                  class="text-offwhite-950"
                />
                <span
                  class="text-offwhite-950 text-xs font-mono uppercase tracking-wider"
                >
                  {{ data?.about?.contact?.popup?.send_message }}
                </span>
              </div>

              <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-offwhite-950 text-xs font-mono uppercase tracking-wider mb-2 leading-none"
                    >
                      {{ data?.about?.contact?.popup?.name_label }}
                    </label>
                    <input
                      data-cursor-hover
                      v-model="form.name"
                      type="text"
                      :placeholder="
                        data?.about?.contact?.popup?.name_placeholder
                      "
                      class="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-[#ffffff15] text-offwhite-100 placeholder:text-offwhite-950/60 text-sm focus:outline-none focus:border-offwhite-950/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-offwhite-950 text-xs font-mono uppercase tracking-wider mb-2 leading-none"
                    >
                      {{ data?.about?.contact?.popup?.email_label }}
                    </label>
                    <input
                      data-cursor-hover
                      v-model="form.email"
                      type="email"
                      :placeholder="
                        data?.about?.contact?.popup?.email_placeholder
                      "
                      class="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-[#ffffff15] text-offwhite-100 placeholder:text-offwhite-950/60 text-sm focus:outline-none focus:border-offwhite-950/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    class="block text-offwhite-950 text-xs font-mono uppercase tracking-wider mb-2 leading-none"
                  >
                    {{ data?.about?.contact?.popup?.message_label }}
                  </label>
                  <textarea
                    data-cursor-hover
                    v-model="form.message"
                    rows="4"
                    :placeholder="
                      data?.about?.contact?.popup?.message_placeholder
                    "
                    class="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-[#ffffff15] text-offwhite-100 placeholder:text-offwhite-950/60 text-sm focus:outline-none focus:border-offwhite-950/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  :disabled="!isFormValid"
                  class="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-offwhite-300 text-gray-900 hover:bg-primary-500 hover:text-offwhite-100 rounded-lg transition-all duration-300 font-medium text-sm font-mono uppercase disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                >
                  <Icon name="lucide:send" size="16" />
                  {{ data?.about?.contact?.popup?.submit }}
                </button>
              </form>
            </div>
          </div>
        </div>

        <button
          style="
            background: radial-gradient(
              circle at top left,
              #252525,
              #151515 60%
            );
          "
          class="size-14 rounded-l-lg text-offwhite-100 border-[#ffffff15] shadow-2xl grid place-items-center group"
          @click="close"
        >
          <Icon
            name="lucide:arrow-right"
            size="20"
            class="transition group-hover:translate-x-1"
          />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { data } = useLocale();

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const isFormValid = computed(() => {
  return (
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.message.trim() !== ""
  );
});

function close() {
  emit("update:modelValue", false);
}

const emailCopied = ref(false);
let copyFeedbackTimer = null;

function copyEmail() {
  if (import.meta.client) {
    navigator.clipboard?.writeText("umarlonco@gmail.com").then(() => {
      emailCopied.value = true;
      if (copyFeedbackTimer) clearTimeout(copyFeedbackTimer);
      copyFeedbackTimer = setTimeout(() => {
        emailCopied.value = false;
        copyFeedbackTimer = null;
      }, 2000);
    });
  }
}

function handleSubmit() {
  const mailto = `mailto:umarlonco@gmail.com?subject=Contato do portfólio&body=${encodeURIComponent(
    `Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
  )}`;
  if (import.meta.client) {
    window.location.href = mailto;
  }
}
</script>

<style scoped>
.popup-contact-enter-active,
.popup-contact-leave-active {
  transition: opacity 0.3s ease;
}
.popup-contact-enter-active .relative,
.popup-contact-leave-active .relative {
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
}
.popup-contact-enter-from,
.popup-contact-leave-to {
  opacity: 0;
}
.popup-contact-enter-from .relative,
.popup-contact-leave-to .relative {
  transform: translateX(100%);
}
.popup-contact-enter-to .relative,
.popup-contact-leave-from .relative {
  transform: translateX(0);
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}
.tooltip-enter-to,
.tooltip-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}

@media (min-width: 640px) {
  .panel {
    background: radial-gradient(circle at top left, #252525, #151515 60%);
    backdrop-filter: blur(10px);
  }
}
</style>
