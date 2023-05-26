/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Gary
 * @Date: 2022-05-20 17:41:22
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-26 19:19:41
 */
import $http from "@/utils/httpRequest";

export default {
	test: function (param) {
		return new Promise(function (resolve, reject) {
			let response = $http.get("/test", param);
			resolve(response);
		});
	},

	/**
	 * 获取配置
	 */
	getConfigs: function () {
		return new Promise(function (resolve, reject) {
			let response = $http.get("/watermark/config");
			resolve(response);
		});
	},

	saveConfigs: function (params) {
		return new Promise(function (resolve, reject) {
			let response = $http.post("/watermark/config/update", params);
			resolve(response);
		});
	},
};
