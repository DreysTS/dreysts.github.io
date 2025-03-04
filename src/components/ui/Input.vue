<script setup lang="ts">
import style from "@/styles/modules/Input.module.scss";

import SearchIcon from "../icons/SearchIcon.vue";
import XIcon from "../icons/XIcon.vue";

import { ref } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

const searchText = ref(props.modelValue);
const searchInput = ref<HTMLInputElement | null>(null);

const clearSearch = () => {
	searchText.value = "";
	emit("update:modelValue", "");
	searchInput.value?.focus();
};

const updateSearch = (e: Event) => {
	const value = (e.target as HTMLInputElement).value;
	searchText.value = value;
	emit("update:modelValue", value);
};
</script>

<template>
	<div :class="style['search']">
		<SearchIcon :class="style['search__icon']" />
		<input
			ref="searchInput"
			:value="searchText"
			@input="updateSearch"
			:class="style['search__input']"
			type="text"
			placeholder="Painting title"
		/>
		<XIcon
			v-if="searchText"
			:class="style['search__clear']"
			@click="clearSearch"
		/>
	</div>
</template>
