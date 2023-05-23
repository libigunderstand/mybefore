<!--
 * @description: 
 * @Autor: Gary
 * @Date: 2023-05-16 14:47:56
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-17 17:00:44
-->
<template>
	<div class="main-container">
		<div class="select-file">
			<input type="file" accept=".pdf" ref="fielinput" @change="uploadFile" />
			<div class="pagenation" v-if="pdfTotalPages > 1 && !renderingPage">
				<el-button
					type="primary"
					icon="el-icon-arrow-left"
					@click="prevPage"
					:disabled="pageNo === 1"
					>上一页</el-button
				>
				<el-button
					type="primary"
					@click="nextPage"
					:disabled="pageNo === pdfTotalPages"
					>下一页<i class="el-icon-arrow-right el-icon--right"></i
				></el-button>
			</div>
			<div class="pagenation-point" v-if="pdfTotalPages > 1">
				<span>{{ pageNo }}</span>
				<span> / </span>
				<span>{{ pdfTotalPages }}</span>
			</div>
		</div>
		<div class="main-content">
			<div class="canvas-container" ref="mywrap">
				<div class="loadingio-spinner-ripple-0d30gos80oss" v-if="renderingPage">
					<div class="ldio-a807rerjrz">
						<div></div>
						<div></div>
					</div>
				</div>
				<canvas ref="myCanvas" class="pdf-container"></canvas>
			</div>

			<div class="setting-panel" v-if="pdf">
				<el-form
					ref="configForm"
					label-position="right"
					label-width="120px"
					:model="settingParams"
				>
					<el-form-item label="是否启用：" prop="delivery">
						<el-switch v-model="settingParams.open"></el-switch>
					</el-form-item>
					<el-form-item label="文字：" prop="text">
						<el-input
							v-model="settingParams.text"
							@change="commonChange"
						></el-input>
					</el-form-item>
					<el-form-item label="字号：" prop="fontSize">
						<el-select
							v-model="settingParams.fontSize"
							placeholder="请选择字号"
							@change="commonChange"
						>
							<el-option
								v-for="item in fontSizeList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="字体：" prop="fontFamily">
						<el-select
							v-model="settingParams.fontFamily"
							placeholder="请选择字号"
							@change="commonChange"
						>
							<el-option
								v-for="item in fontFamilyList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="字体颜色：" prop="fontColor">
						<el-color-picker
							v-model="settingParams.fontColor"
							@change="commonChange"
						></el-color-picker>
					</el-form-item>
					<el-form-item label="倾斜角度：" prop="rotateDeg">
						<el-input-number
							v-model="settingParams.rotateDeg"
							:min="-90"
							:max="90"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="透明度：" prop="opacity">
						<el-input-number
							v-model="settingParams.opacity"
							:min="0"
							:max="1"
							:step="0.1"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="横向水印个数：" prop="xNum">
						<el-input-number
							v-model="settingParams.xNum"
							:min="1"
							:max="20"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="纵向水印个数：" prop="yNum">
						<el-input-number
							v-model="settingParams.yNum"
							:min="1"
							:max="20"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="上边距：" prop="tGap">
						<el-input-number
							v-model="settingParams.tGap"
							:min="0"
							:max="100"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="下边距：" prop="bGap">
						<el-input-number
							v-model="settingParams.bGap"
							:min="0"
							:max="100"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="左边距：" prop="lGap">
						<el-input-number
							v-model="settingParams.lGap"
							:min="0"
							:max="100"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="右边距：" prop="rGap">
						<el-input-number
							v-model="settingParams.rGap"
							:min="0"
							:max="100"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
				</el-form>
				<el-button type="primary" @click="resetConfig">重置</el-button>
				<el-button type="primary" @click="saveConfig">保存配置</el-button>
			</div>
		</div>
	</div>
</template>

<script>
const pdfJS = require("pdfjs-dist");

pdfJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");

import { useWatermark } from "@/utils/useWatermark";

export default {
	name: "HomeView",
	data() {
		return {
			// PDF的base64
			pdfData: null,
			pdf: null,
			pageNo: 1,
			pdfTotalPages: 1,
			renderingPage: false,
			scale: 1,
			setWatermark: null,

			settingParams: {
				open: true,
				text: "请设置水印",
				fontSize: 14,
				fontFamily: "Microsoft YaHei",
				fontColor: "#000",
				rotateDeg: 45,
				opacity: 0.2,
				xNum: 4,
				yNum: 4,
				tGap: 0,
				bGap: 0,
				lGap: 0,
				rGap: 0,
			},

			// 字号待选集：
			fontSizeList: [
				{
					label: "12",
					value: "12",
				},
				{
					label: "14",
					value: "14",
				},
				{
					label: "16",
					value: "16",
				},
				{
					label: "18",
					value: "18",
				},
				{
					label: "20",
					value: "20",
				},
				{
					label: "22",
					value: "22",
				},
				{
					label: "24",
					value: "24",
				},
				{
					label: "26",
					value: "26",
				},
				{
					label: "28",
					value: "28",
				},
			],

			// 字体待选集：
			fontFamilyList: [
				{
					label: "微软雅黑",
					value: "Microsoft YaHei",
				},
				{
					label: "仿宋",
					value: "FangSong",
				},
				{
					label: "楷体",
					value: "KaiTi",
				},
			],
		};
	},
	mounted() {
		const { setWatermark } = useWatermark(this.$refs.mywrap);
		this.setWatermark = setWatermark;
	},
	methods: {
		/**
		 * @description: 文件选择回调
		 * @return {*}
		 * @author: Gary
		 */
		uploadFile() {
			this.resetParams();
			let inputDom = this.$refs.fielinput;
			let file = inputDom.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				let data = atob(
					reader.result.substring(reader.result.indexOf(",") + 1)
				);
				this.loadPdfData(data);
			};
		},

		/**
		 * @description: 重置分页数据
		 * @return {*}
		 * @author: Gary
		 */
		resetParams() {
			this.pageNo = 1;
			this.pdfTotalPages = 1;
			this.renderingPage = false;
		},

		/**
		 * @description: 加载pdf数据
		 * @param {*} data
		 * @return {*}
		 * @author: Gary
		 */
		loadPdfData(data) {
			// 引入pdf.js的字体
			let CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/";
			//读取base64的pdf流文件
			this.pdfData = pdfJS.getDocument({
				data: data, // PDF base64编码
				cMapUrl: CMAP_URL,
				cMapPacked: true,
			});
			this.pdfData.promise.then((pdf) => {
				this.pdfTotalPages = pdf.numPages;
				this.pdf = pdf;
				this.renderPage(this.pageNo);
			});
		},

		/**
		 * @description: 根据页码渲染相应的PDF
		 * @param {*} num 当前渲染的页码
		 * @return {*}
		 * @author: Gary
		 */
		renderPage(num) {
			this.renderingPage = true;
			this.pdf.getPage(num).then((page) => {
				// 获取DOM中为预览PDF准备好的canvasDOM对象
				let canvas = this.$refs.myCanvas;
				let viewport = page.getViewport({
					scale: this.scale,
				});
				canvas.height = viewport.height;
				canvas.width = viewport.width;

				let ctx = canvas.getContext("2d");
				let renderContext = {
					canvasContext: ctx,
					viewport: viewport,
				};

				page.render(renderContext).promise.then(() => {
					console.log("第" + this.pageNo + "页渲染完成！");
					this.renderingPage = false;
				});

				let params = {
					...this.settingParams,
					width: canvas.width,
					height: canvas.height,
				};
				this.setWatermark(params);
			});
		},

		/**
		 * @description: 上一页
		 * @return {*}
		 * @author: Gary
		 */
		prevPage() {
			let goPage = this.pageNo - 1;
			if (goPage < 1) {
				return;
			}

			this.pageNo = goPage;
			this.renderPage(this.pageNo);
		},

		/**
		 * @description: 下一页
		 * @return {*}
		 * @author: Gary
		 */
		nextPage() {
			let goPage = this.pageNo + 1;
			if (goPage > this.pdfTotalPages) {
				return;
			}

			this.pageNo = goPage;
			this.renderPage(this.pageNo);
		},

		commonChange() {
			console.log(this.settingParams);
			let params = {
				...this.settingParams,
				width: this.$refs.myCanvas.width,
				height: this.$refs.myCanvas.height,
			};
			this.setWatermark(params);
		},

		resetConfig() {
			this.$refs.configForm.resetFields();
			let params = {
				...this.settingParams,
				width: this.$refs.myCanvas.width,
				height: this.$refs.myCanvas.height,
			};
			this.setWatermark(params);
		},

		saveConfig() {
			this.$notify.info({
				duration: 0,
				title: "配置",
				dangerouslyUseHTMLString: true,
				message: `<div style="height: max-content; word-break: break-all;">${JSON.stringify(
					this.settingParams
				)}</div>`,
			});
		},
	},
};
</script>

<style lang="less" scoped>
.main-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.select-file {
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 2px 2px 2px 2px #ddd;
		margin-bottom: 20px;
		.pagenation-point {
			margin-left: 20px;
			span {
				font-size: 16px;
				font-weight: 600;
				&:first-child {
					color: blueviolet;
				}
				&:last-child {
					font-size: 18px;
				}
			}
		}
	}
	.main-content {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		.canvas-container {
			min-width: 595px;
			min-height: 842px;
			border: 1px dashed black;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}

		.setting-panel {
			width: 40%;
			/deep/.el-form {
				.el-form-item__content {
					display: flex;
				}
			}
		}
	}
}
</style>

<style type="text/css">
@keyframes ldio-a807rerjrz {
	0% {
		top: 96px;
		left: 96px;
		width: 0;
		height: 0;
		opacity: 1;
	}
	100% {
		top: 18px;
		left: 18px;
		width: 156px;
		height: 156px;
		opacity: 0;
	}
}
.ldio-a807rerjrz div {
	position: absolute;
	border-width: 4px;
	border-style: solid;
	opacity: 1;
	border-radius: 50%;
	animation: ldio-a807rerjrz 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.ldio-a807rerjrz div:nth-child(1) {
	border-color: #e90c59;
	animation-delay: 0s;
}
.ldio-a807rerjrz div:nth-child(2) {
	border-color: #46dff0;
	animation-delay: -0.5s;
}
.loadingio-spinner-ripple-0d30gos80oss {
	width: 200px;
	height: 200px;
	display: inline-block;
	overflow: hidden;
	background: #ffffff;
	position: absolute;
}
.ldio-a807rerjrz {
	width: 100%;
	height: 100%;
	position: relative;
	transform: translateZ(0) scale(1);
	backface-visibility: hidden;
	transform-origin: 0 0; /* see note above */
}
.ldio-a807rerjrz div {
	box-sizing: content-box;
}
</style>
