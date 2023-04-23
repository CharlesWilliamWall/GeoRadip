<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
    name: string
    modelValue: boolean;
}>()
const emit = defineEmits<{
   (event: 'update:modelValue', value: boolean): void
 }>()

function valueChange(value: boolean) {
  emit('update:modelValue', (value))  
}

</script>
<template>
  <div class="flex flex-row place-items-center px-1 py-1 border-2 border-white rounded-xl w-fit">
    <input
      type="radio"
      value="0"
      :name="name"
      id=""
      @change="valueChange(false)"
      class=" basis-1/2  appearance-none w-10 h-6 bg-white border-slate-900  checked:bg-slate-600 rounded-l-lg"
    />
    <input
      type="radio"
      value="1"
      :name="name"
      id=""
      checked
      @change="valueChange(true)"
      class=" basis-1/2  appearance-none w-10 h-6 bg-white  border-gray-900 checked:bg-emerald-500 rounded-r-lg"
    />
  </div>
</template>
