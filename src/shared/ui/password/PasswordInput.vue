<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { Input } from '../input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { cn } from '@/shared/lib/utils'
import { Button } from '../button'

const props = defineProps<{
  class?: string
  modelValue?: string | number
  defaultValue?: string | number
  disabled?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const showPassword = ref(false)
const isDisabled = computed(() => props.disabled)
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      v-model="modelValue"
      :type="showPassword ? 'text' : 'password'"
      :class="cn('pr-10', props.class)"
      :disabled="props.disabled"
    />
    <Button
      type="button"
      variant="ghost"
      class="absolute right-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer hover:bg-transparent hover:text-current"
      :class="{ 'cursor-not-allowed opacity-50': isDisabled }"
      @click="showPassword = !showPassword"
    >
      <EyeIcon
        v-if="showPassword && !isDisabled"
        class="size-4 text-muted-foreground"
        aria-hidden="true"
      />
      <EyeOffIcon v-else class="size-4 text-muted-foreground" aria-hidden="true" />
      <span class="sr-only">{{ showPassword ? 'Скрыть пароль' : 'Показать пароль' }}</span>
    </Button>
  </div>
</template>

<style>
input::-ms-reveal,
input::-ms-clear {
  visibility: hidden;
  pointer-events: none;
  display: none;
}
</style>
