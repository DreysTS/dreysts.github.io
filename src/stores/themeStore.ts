import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useThemeStore = defineStore("theme", () => {
	const isDark = ref(localStorage.getItem("theme") === "dark");

	const toggleTheme = () => {
		isDark.value = !isDark.value;
		localStorage.setItem("theme", isDark.value ? "dark" : "light");

		document.body.classList.toggle("dark-theme", isDark.value);
	};

	watchEffect(() => {
		document.body.classList.toggle("dark-theme", isDark.value);
	});

	return { isDark, toggleTheme };
});
