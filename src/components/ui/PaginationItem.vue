<script setup lang="ts">
import style from "@/styles/modules/PaginationItem.module.scss";

defineProps<{
	active?: boolean;
	disabled?: boolean;
}>();
</script>

<template>
	<button
		:class="[style['pagination__item'], { [style.active]: active }]"
		:disabled="disabled"
	>
		<slot />
	</button>
</template>
