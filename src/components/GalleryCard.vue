<script setup lang="ts">
import styles from "@/styles/modules/GalleryCard.module.scss";
import { defineProps, ref } from "vue";

const props = defineProps({
	painting: {
		type: Object as () => {
			id: number;
			name: string;
			author: string;
			location: string;
			created: string;
			imageUrl: string;
		},
		required: true,
	},
});

function handleImageError(e: Event) {
	const img = e.target as HTMLImageElement;

	setTimeout(() => {
		img.src = `${props.painting.imageUrl}?retry=${Date.now()}`;
	}, 0);
}
</script>

<template>
	<div :class="styles['gallery-card']">
		<img
			:class="styles['gallery-card__img']"
			:src="painting.imageUrl"
			alt="Painting"
			@error="handleImageError"
		/>
		<div :class="styles['gallery-card__placeholder']">
			<div :class="styles['gallery-card__placeholder-content']">
				<div :class="styles['gallery-card__placeholder-preview']">
					<h1 :class="styles['gallery-card__placeholder-title']">
						{{ painting.name }}
					</h1>
					<p :class="styles['gallery-card__placeholder-subtitle']">
						{{ painting.created }}
					</p>
				</div>

				<div :class="styles['gallery-card__placeholder-hover']">
					<h1 :class="styles['gallery-card__placeholder-title']">
						{{ painting.author }}
					</h1>
					<p :class="styles['gallery-card__placeholder-subtitle']">
						{{ painting.location }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
