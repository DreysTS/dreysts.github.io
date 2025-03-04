<script setup lang="ts">
import style from "@/styles/modules/Pagination.module.scss";
import { computed, watchEffect } from "vue";
import PaginationItem from "./ui/PaginationItem.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import ArrowLeft from "./icons/ArrowLeft.vue";

const props = defineProps<{
	currentPage: number;
	totalPages: number;
}>();

const emit = defineEmits(["update:currentPage"]);

const pages = computed(() => {
	const { currentPage, totalPages } = props;
	const visiblePages: (number | "...")[] = [];

	if (!totalPages || totalPages <= 4) {
		return Array.from({ length: totalPages || 0 }, (_, i) => i + 1);
	}

	visiblePages.push(1);

	if (currentPage === 1) {
		visiblePages.push(2, 3);
		if (totalPages > 4) visiblePages.push("...");
		visiblePages.push(totalPages);
		return visiblePages;
	}

	if (currentPage === totalPages) {
		visiblePages.push("...", totalPages - 2, totalPages - 1);
		visiblePages.push(totalPages);
		return visiblePages;
	}

	const start = Math.max(2, currentPage === 2 ? 2 : currentPage - 1);

	const end = Math.min(
		totalPages - 1,
		currentPage === currentPage - 1 ? currentPage - 1 : currentPage + 1,
	);

	if (start > 2) visiblePages.push("...");

	for (let i = start; i <= end; i++) {
		visiblePages.push(i);
	}

	if (end < totalPages - 1) visiblePages.push("...");

	visiblePages.push(totalPages);

	return visiblePages;
});

const goToPage = (page: number | "...") => {
	if (typeof page === "number" && page !== props.currentPage) {
		emit("update:currentPage", page);
	}
};

watchEffect(() => {
	if (props.currentPage > props.totalPages) {
		emit("update:currentPage", props.totalPages || 1);
	}
});
</script>

<template>
	<div :class="style['pagination']">
		<PaginationItem
			:disabled="currentPage === 1"
			@click="goToPage(currentPage - 1)"
			arrow
		>
			<ArrowLeft />
		</PaginationItem>

		<PaginationItem
			v-for="page in pages"
			:key="page"
			:active="page === currentPage"
			:disabled="page === '...'"
			@click="goToPage(page)"
		>
			{{ page }}
		</PaginationItem>

		<PaginationItem
			:disabled="currentPage === totalPages"
			@click="goToPage(currentPage + 1)"
			arrow
		>
			<ArrowRight />
		</PaginationItem>
	</div>
</template>
