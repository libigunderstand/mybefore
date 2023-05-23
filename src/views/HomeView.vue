<!--
 * @description: 
 * @Autor: Gary
 * @Date: 2023-05-16 14:47:56
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-23 17:43:04
-->
<template>
	<div class="main-container">
		<div class="main-content">
			<div class="canvas-container" ref="mywrap">
				<div>PDF文件</div>
			</div>

			<div class="setting-panel" v-if="openSetting">
				<el-form
					ref="configForm"
					label-position="right"
					label-width="120px"
					:model="settingParams"
				>
					<el-form-item label="是否启用：" prop="delivery">
						<el-switch
							v-model="settingParams.open"
							@change="commonChange"
						></el-switch>
					</el-form-item>
					<el-form-item label="文字：" prop="text">
						<el-input
							v-model="settingParams.text"
							@input="commonChange"
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
							:min="-100"
							:max="100"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="下边距：" prop="bGap">
						<el-input-number
							v-model="settingParams.bGap"
							:min="-100"
							:max="100"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="左边距：" prop="lGap">
						<el-input-number
							v-model="settingParams.lGap"
							:min="-100"
							:max="100"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
					<el-form-item label="右边距：" prop="rGap">
						<el-input-number
							v-model="settingParams.rGap"
							:min="-100"
							:max="100"
							label=""
							@change="commonChange"
						></el-input-number>
					</el-form-item>
				</el-form>
				<div class="control-btns">
					<el-button @click="resetConfig" icon="el-icon-refresh"
						>重置</el-button
					>
					<el-button type="primary" @click="saveConfigToServer"
						>保存配置</el-button
					>
				</div>
			</div>

			<div class="spinner" v-if="loading">
				<div class="loadingio-spinner-ripple">
					<div class="ldio-6j7npx6cxpb">
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useWatermark } from "@/utils/useWatermark";
import { mapActions } from "vuex";

const REF_NAME = "mywrap";

export default {
	name: "HomeView",
	data() {
		return {
			settingParams: {
				open: true,
				text: "默认水印，可自定义",
				fontSize: 14,
				fontFamily: "Microsoft YaHei",
				fontColor: "#000",
				rotateDeg: -45,
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

			// 默认临时配置
			temporaryConfig: null,

			loading: false,

			openSetting: true,
		};
	},
	mounted() {
		const { setWatermark } = useWatermark(this.$refs.mywrap);
		this.setWatermark = setWatermark;
		this.initShow()
		this.getConfigFromServer();
	},
	methods: {
		...mapActions(["getConfigs", "saveConfigs", "getCurrentUserInfo"]),

		/**
		 * @description: 获取保存的配置
		 * @return {*}
		 * @author: Gary
		 */
		getConfigFromServer() {
			this.loading = true;
			this.getConfigs()
				.then((res) => {
					this.loading = false;
					if (res.data) {
						this.temporaryConfig = res.data;
						this.settingParams = Object.assign(this.settingParams, res.data);
					}
					this.initShow();
				})
				.catch((error) => {
					this.loading = false;
				});
		},

		/**
		 * @description: 初始化水印显示
		 * @return {*}
		 * @author: Gary
		 */
		initShow() {
			let params = {
				...this.settingParams,
				width: this.$refs[REF_NAME].offsetWidth,
				height: this.$refs[REF_NAME].offsetHeight,
			};
			this.setWatermark(params);
		},

		/**
		 * @description: form表单各组件值变化时的回调
		 * @return {*}
		 * @author: Gary
		 */
		commonChange() {
			let params = {
				...this.settingParams,
				width: this.$refs[REF_NAME].offsetWidth,
				height: this.$refs[REF_NAME].offsetHeight,
			};
			this.setWatermark(params);
		},

		/**
		 * @description: 重置表单数据
		 * @return {*}
		 * @author: Gary
		 */
		resetConfig() {
			// this.$refs.configForm.resetFields();
			this.settingParams = Object.assign({}, this.temporaryConfig);
			let params = {
				...this.settingParams,
				width: this.$refs[REF_NAME].offsetWidth,
				height: this.$refs[REF_NAME].offsetHeight,
			};
			this.setWatermark(params);
		},

		/**
		 * @description: 保存表单数据
		 * @return {*}
		 * @author: Gary
		 */
		saveConfigToServer() {
			this.loading = true;
			let params = this.settingParams;
			this.saveConfigs(params)
				.then((res) => {
					this.loading = false;
					if (res.data) {
						this.$message({
							message: '保存成功',
							type: 'success'
						})
						this.temporaryConfig = re.data;
						this.settingParams = res.data;
					}
				})
				.catch((error) => {
					this.loading = false;
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
	box-sizing: border-box;
	.main-content {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		position: relative;
		.canvas-container {
			box-shadow: -2px -2px 6px 2px #ccc;
			width: 595px;
			height: 880px;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			div {
				writing-mode: vertical-lr;
				font-size: 40px;
				letter-spacing: 20px;
				color: cadetblue;
				font-family: KaiTi;
			}
		}

		.setting-panel {
			width: 40%;
			// box-shadow: -2px -2px 6px 4px #ddd;
			padding: 10px 16px;
			/deep/.el-form {
				.el-form-item__content {
					display: flex;
					min-height: 40px;
					align-items: center;
				}
			}

			.control-btns {
				display: flex;
				flex-direction: row;
				justify-content: right;
				align-items: center;
				padding: 10px 16px;
				border-bottom: 1px solid #ccc;
			}
		}
	}
}
</style>

<style type="text/css">
@keyframes ldio-6j7npx6cxpb {
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
.ldio-6j7npx6cxpb div {
	position: absolute;
	border-width: 4px;
	border-style: solid;
	opacity: 1;
	border-radius: 50%;
	animation: ldio-6j7npx6cxpb 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.ldio-6j7npx6cxpb div:nth-child(1) {
	border-color: #e90c59;
	animation-delay: 0s;
}
.ldio-6j7npx6cxpb div:nth-child(2) {
	border-color: #46dff0;
	animation-delay: -0.5s;
}

.spinner {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	background: rgba(255, 255, 255, 0.8);
}

.loadingio-spinner-ripple {
	width: 200px;
	height: 200px;
	display: inline-block;
	overflow: hidden;
	background: rgba(0, 0, 0, 0);
}
.ldio-6j7npx6cxpb {
	width: 100%;
	height: 100%;
	position: relative;
	transform: translateZ(0) scale(1);
	backface-visibility: hidden;
	transform-origin: 0 0; /* see note above */
}
.ldio-6j7npx6cxpb div {
	box-sizing: content-box;
}
</style>
