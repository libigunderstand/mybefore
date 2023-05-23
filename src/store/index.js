/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Gary
 * @Date: 2022-05-20 17:41:22
 * @LastEditors: Gary
 * @LastEditTime: 2022-08-01 10:28:46
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');

	const value = modulesFiles(modulePath);

	modules[moduleName] = value.default;

	return modules;
}, {});

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: modules,
});
