<script setup lang="ts">
import style from "@/styles/modules/Gallery.module.scss";
import Input from "@/components/ui/Input.vue";
import GalleryCard from "./GalleryCard.vue";
import { onMounted, watchEffect } from "vue";
import { useGalleryStore } from "@/stores/galleryStore";
import Pagination from "./Pagination.vue";
import GalleryError from "./GalleryError.vue";

const store = useGalleryStore();

onMounted(() => {
	store.fetchAuthors();
	store.fetchLocations();
	store.fetchPaintings();
});

watchEffect(() => {
	store.fetchPaintings();
});
</script>

<template>
	<main :class="style['gallery']">
		<div :class="style['container']">
			<Input v-model="store.query" />

			<div
				:class="style['gallery__wrapper']"
				v-if="store.paintingsWithDetails.length > 0"
			>
				<GalleryCard
					v-for="painting in store.paintingsWithDetails"
					:key="painting.id"
					:painting="painting"
				/>
			</div>

			<Pagination
				v-model:currentPage="store.currentPage"
				:totalPages="store.totalPages"
				v-if="store.paintingsWithDetails.length > 0"
			/>

			<GalleryError
				v-model="store.query"
				v-if="store.paintingsWithDetails.length <= 0"
			/>
		</div>
	</main>
</template>
