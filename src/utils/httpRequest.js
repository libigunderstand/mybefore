// 导入axios
import axios from "axios";
import ElementUI from "element-ui";
import router from "@/router/index";
const httpService = axios.create({
	baseURL: "",
	// timeout: 5000,
});
// request拦截器
httpService.interceptors.request.use(
	(config) => {
		const TOKEN = localStorage.getItem("token");
		if (TOKEN) {
			config.headers["Authorization"] = TOKEN;
		}
		return config;
	},
	(error) => {
		// 请求错误处理
		Promise.reject(error);
	}
);

// respone拦截器
httpService.interceptors.response.use(
	(response) => {
		// 统一处理状态, 根据实际后端框架返回模板来设置
		if (response.data) {
			return response.data;
		} else {
			response;
		}
	},
	// 处理处理
	(error) => {
		console.log(error);
		if (error && error.response) {
			if (error.request.status == 401) {
				localStorage.removeItem("token");
				router.replace({
					path: "/login",
				});
			}
			ElementUI.Message({
				dangerouslyUseHTMLString: true,
				duration: 3000,
				customClass: "scenatorStyle scenator_briefMsg error",
				message: `${
					error.response.data && error.response.data.msg
						? error.response.data.msg
						: error.message
				}`,
			});
		} else {
			ElementUI.Message({
				dangerouslyUseHTMLString: true,
				duration: 3000,
				customClass: "scenatorStyle scenator_briefMsg error",
				message: `${error.message}`,
			});
		}
		return {
			data: null,
		};
	}
);

// 封装自己的get/post方法
export default {
	get: function (path = "", data = {}, config = {}) {
		return new Promise((resolve, reject) => {
			httpService({
				url: path,
				method: "GET",
				params: data,
				...config,
			})
				.then((response) => {
					// 按需求来，这里我需要的是response，所以返回response，一般直接返回response
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	post: function (path = "", data = {}, config = {}) {
		return new Promise((resolve, reject) => {
			httpService({
				url: path,
				method: "post",
				data: data,
				...config,
			})
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	delete: function (path = "", data = {}) {
		return new Promise((resolve, reject) => {
			httpService({
				url: path,
				method: "delete",
				data: data,
			})
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	fetch: function (path = "", data = {}, config = {}) {
		return new Promise((resolve, reject) => {
			fetch(path, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					Accept: "application/json;charset=UTF-8",
					"Content-Type": "application/json;charset=UTF-8",
				},
				signal: data.signal,
			})
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					resolve(res);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};
