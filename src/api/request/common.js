/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Gary
 * @Date: 2022-05-20 17:41:22
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-26 17:56:11
 */
import $http from "@/utils/httpRequest";

export default {
	test: function (param) {
		return new Promise(function (resolve, reject) {
			let response = $http.get("/test", param);
			resolve(response);
		});
	},

	getConfigFile: function (param) {
		return new Promise(function (resolve, reject) {
			let response = $http.get("/myback/config", param);
			resolve(response);
		});
	},
};
