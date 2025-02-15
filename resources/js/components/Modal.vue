<template>
  <div>
    <teleport to="body">
      <div v-if="open" class="modal">
        <div class="px-10 py-8 w-4/5 md:w-3/5	lg:w-2/5 rounded-md bg-white">
          <slot></slot>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Modal",
  props: ['open'],
}
</script>