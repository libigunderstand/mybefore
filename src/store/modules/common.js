/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Gary
 * @Date: 2022-05-20 17:41:22
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-18 12:38:11
 */
import Api from "@/api/index";
const state = {};

const mutations = {};
const actions = {
	getConfigs: async function ({ commit }, params) {
		try {
			let response = await Api.common.getConfigs();
			return response;
		} catch (error) {
			console.log(error);
		}
	},

	saveConfigs: async function ({ commit }, params) {
		try {
			let response = await Api.common.saveConfigs(params);
			return response;
		} catch (error) {
			console.log(error);
		}
	},

	getCurrentUserInfo: async function ({ commit }, params) {
		try {
			let response = await Api.common.getCurrentUserInfo();
			return response;
		} catch (error) {
			console.log(error);
		}
	},
};

export default {
	state,
	mutations,
	actions,
};
