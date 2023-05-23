// 导入axios
import axios from "axios";
import ElementUI from "element-ui";
const httpService = axios.create({
	baseURL: "", // 需自定义
	// 请求超时时间
	// timeout: 5000, // 需自定义
});
// request拦截器
httpService.interceptors.request.use(
	(config) => {
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
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = "错误请求";
					break;
				case 401:
					error.message = "未授权，请重新登录";
					break;
				case 403:
					error.message = "拒绝访问";
					break;
				case 404:
					error.message = "请求错误,未找到该资源";
					break;
				case 405:
					error.message = "请求方法未允许";
					break;
				case 408:
					error.message =
						error.response.data && error.response.data.message
							? error.response.data.message
							: "请求超时";
					break;
				case 500:
					error.message =
						error.response.data && error.response.data.message
							? error.response.data.message
							: "服务器端出错";
					ElementUI.Message({
						dangerouslyUseHTMLString: true,
						duration: 3000,
						customClass: "scenatorStyle scenator_briefMsg error",
						message: `<div><article>${error.message}</article></div>`,
					});
					break;
				case 501:
					error.message = "网络未实现";
					break;
				case 502:
					error.message = "网络错误";
					break;
				case 503:
					error.message = "服务不可用";
					break;
				case 504:
					error.message = "网络超时";
					break;
				case 505:
					error.message = "http版本不支持该请求";
					break;
				default:
					error.message = `未知错误${error.response.status}`;
			}
		} else {
			ElementUI.Message({
				dangerouslyUseHTMLString: true,
				duration: 3000,
				customClass: "scenatorStyle scenator_briefMsg error",
				message: `<div><article>连接到服务器失败，请检查网络或服务是否正常!</article></div>`,
			});
		}
		return Promise.reject(error);
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
