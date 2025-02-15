<template>
  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'ValidationText',
  props: ['text'],
}
</script>
