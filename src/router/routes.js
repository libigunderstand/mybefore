export const routes = [
	{
		path: "/",
		redirect: "/login",
	},

	{
		path: "/home",
		name: "home",
		component: () => import("@/views/HomeView"),
	},

	{
		path: "/404",
		name: "Error404",
		component: () => import("@/views/common/Error404"),
	},

	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/UserLogin"),
	},
];
