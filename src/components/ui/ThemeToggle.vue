<template>
	<button :class="style.toggler" @click="themeStore.toggleTheme">
		<SunIcon :class="style.icon" v-if="themeStore.isDark" />
		<MoonIcon :class="style.icon" v-else />
	</button>
</template>

<script setup lang="ts">
import style from "@/styles/modules/ThemeToggle.module.scss";

import { useThemeStore } from "@/stores/themeStore";
import MoonIcon from "../icons/MoonIcon.vue";
import SunIcon from "../icons/SunIcon.vue";

const themeStore = useThemeStore();
</script>
