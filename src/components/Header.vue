<script setup lang="ts">
import style from "@/styles/modules/Header.module.scss";
import Logo from "./icons/Logo.vue";
import ThemeToggle from "./ui/ThemeToggle.vue";
</script>

<template>
	<header :class="style['header']">
		<div :class="style['container']">
			<Logo :class="style['header__logo']" />
			<ThemeToggle />
		</div>
	</header>
</template>
