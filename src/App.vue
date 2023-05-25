<!--
 * @description: 
 * @Autor: Gary
 * @Date: 2023-05-16 14:47:56
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-24 12:44:40
-->
<template>
	<div id="app">
		<Live2D></Live2D>
		<router-view />
	</div>
</template>
<script>
import Live2D from "@/components/live2d/Live2D.vue";
export default {
	components: {
		Live2D,
	},
};
</script>
<style lang="less">
html,
body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	min-width: 1200px;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	height: 100%;
}
</style>
