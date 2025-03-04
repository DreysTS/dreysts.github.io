<script setup lang="ts">
import style from "@/styles/modules/GalleryError.module.scss";

const props = defineProps<{ modelValue: string }>();
</script>

<template>
	<div :class="style['gallery__error']">
		<p :class="style['gallery__error-title']">
			No matches for
			<span :class="style['gallery__error-title-query']">{{
				props.modelValue
			}}</span>
		</p>
		<p :class="style['gallery__error-subtitle']">
			Please try again with a different spelling or keywords.
		</p>
	</div>
</template>
