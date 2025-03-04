import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";

interface Author {
	id: number;
	name: string;
}

interface Location {
	id: number;
	location: string;
}

interface Painting {
	id: number;
	name: string;
	authorId: number;
	locationId: number;
	created: string;
	imageUrl: string;
}

export const useGalleryStore = defineStore("galleryStore", () => {
	const authors = ref<Author[]>([]);
	const locations = ref<Location[]>([]);
	const paintings = ref<Painting[]>([]);

	const currentPage = ref(1);
	const pageSize = ref(6);
	const totalCount = ref(0);

	const query = ref("");

	const totalPages = computed(() =>
		Math.ceil(totalCount.value / pageSize.value),
	);

	async function fetchAuthors() {
		try {
			const { data } = await axios.get<Author[]>(
				"https://test-front.framework.team/authors",
			);
			authors.value = data;
		} catch (error) {
			console.error("Ошибка при загрузке авторов:", error);
		}
	}

	async function fetchLocations() {
		try {
			const { data } = await axios.get<Location[]>(
				"https://test-front.framework.team/locations",
			);
			locations.value = data;
		} catch (error) {
			console.error("Ошибка при загрузке локаций:", error);
		}
	}

	async function fetchPaintings() {
		try {
			const response = await axios.get<Painting[]>(
				"https://test-front.framework.team/paintings",
				{
					params: {
						_limit: pageSize.value,
						_page: currentPage.value,
						q: query.value.trim() || undefined,
					},
				},
			);
			paintings.value = response.data;
			totalCount.value = Number(response.headers["x-total-count"]) || 0;
		} catch (error) {
			console.error("Ошибка при загрузке картин:", error);
		}
	}

	watch(currentPage, fetchPaintings);

	const paintingsWithDetails = computed(() => {
		const authorMap = Object.fromEntries(
			authors.value.map((a) => [a.id, a.name]),
		);
		const locationMap = Object.fromEntries(
			locations.value.map((l) => [l.id, l.location]),
		);

		return paintings.value.map((painting) => ({
			...painting,
			imageUrl: `https://test-front.framework.team${painting.imageUrl}`,
			author: authorMap[painting.authorId] || "Unknown",
			location: locationMap[painting.locationId] || "Unknown",
		}));
	});

	return {
		authors,
		locations,
		paintings,
		fetchAuthors,
		fetchLocations,
		fetchPaintings,
		paintingsWithDetails,
		currentPage,
		pageSize,
		totalPages,
		query,
	};
});
