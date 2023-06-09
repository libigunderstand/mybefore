/*
 * @description:
 * @Autor: Gary
 * @Date: 2023-05-16 14:47:56
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-26 17:52:58
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "@/router/routes";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach(async (to, from, next) => {
	// 判断是否合法路由
	let okPath = false;
	for (let i in routes) {
		if (routes[i]["path"] === to.path) {
			okPath = true;
			break;
		}
	}
	if (okPath) {
		const TOKEN = localStorage.getItem("token");
		if (to.path == "/login") {
			if (TOKEN) {
				next({
					path: "/",
					replace: true,
				});
			} else {
				next();
			}
		} else {
			if (TOKEN) {
				next();
			} else {
				next({ path: "/login" });
			}
		}
	} else {
		// 不合法跳转到404页面
		next({ path: "/404" });
	}
});

export default router;
