/*
 * @description:
 * @Autor: Gary
 * @Date: 2023-05-16 14:47:56
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-17 10:18:03
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/login"
	},

	{
		path: "/",
		name: "home",
		component: () => import("@/views/HomeView"),
	},

	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/UserLogin"),
	},
];

const router = new VueRouter({
	mode: "hash",
	base: process.env.BASE_URL,
	routes,
});

export default router;
