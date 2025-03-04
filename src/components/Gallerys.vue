<script setup lang="ts">
import { onMounted } from "vue";
import { useGalleryStore } from "@/stores/galleryStore";

const store = useGalleryStore();

onMounted(() => {
	store.fetchAuthors();
	store.fetchLocations();
	store.fetchPaintings();
});
</script>

<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Paintings</h1>

		<ul>
			<li
				v-for="painting in store.paginatedPaintings"
				:key="painting.id"
				class="mb-4 border p-2 rounded"
			>
				<img
					:src="`https://test-front.framework.team${painting.imageUrl}`"
					alt="Painting"
					class="w-32 h-32 object-cover mb-2"
				/>
				<h2 class="text-lg font-semibold">{{ painting.name }}</h2>
				<p><strong>Author:</strong> {{ painting.author }}</p>
				<p><strong>Location:</strong> {{ painting.location }}</p>
				<p><strong>Year:</strong> {{ painting.created }}</p>
			</li>
		</ul>

		<div class="mt-4 flex gap-2">
			<button
				class="px-4 py-2 bg-gray-300 rounded"
				:disabled="store.currentPage === 1"
				@click="store.setPage(store.currentPage - 1)"
			>
				« Prev
			</button>

			<span class="px-4 py-2"
				>Page {{ store.currentPage }} of {{ store.totalPages }}</span
			>

			<button
				class="px-4 py-2 bg-gray-300 rounded"
				:disabled="store.currentPage === store.totalPages"
				@click="store.setPage(store.currentPage + 1)"
			>
				Next »
			</button>
		</div>
	</div>
</template>
