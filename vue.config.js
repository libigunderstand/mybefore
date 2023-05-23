/*
 * @description:
 * @Autor: Gary
 * @Date: 2023-05-16 14:47:56
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-18 12:52:01
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	publicPath: "/watermark",
	transpileDependencies: true,
	devServer: {
		proxy: {
			"/watermark": {
				target: "http://localhost:9200/watermark",
				pathRewrite: {
					"^/watermark": "",
				},
			},

			"/UAMS": {
				target: "http://192.168.1.96:8080/UAMS",
				pathRewrite: {
					"^/UAMS": "",
				},
			},
		},
	},
});
