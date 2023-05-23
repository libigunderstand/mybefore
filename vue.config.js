/*
 * @description:
 * @Autor: Gary
 * @Date: 2023-05-16 14:47:56
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-23 17:42:00
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	publicPath: "/",
	transpileDependencies: true,
	devServer: {
		host: 'localhost',
		port: 8082,
		open: true,
		hot: true,
		liveReload: true,
		proxy: {
			"/myback": {
				target: "http://localhost:9200/myback",
				pathRewrite: {
					"^/myback": "",
				},
			},
		},
	},
});
