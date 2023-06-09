<template>
	<div class="login-wrap" translate="no" ref="loginRef">
		<background-css></background-css>
		<div class="container">
			<h1 class="animatable" id="title">Little Star</h1>
			<div class="animatable" id="message"></div>
			<div class="animatable" id="sun"></div>

			<div class="form animatable">
				<div class="content">
					<div class="sign--type" v-show="isLogin">
						<span>还没有账号?<br /></span>
						<span class="link signup" @click="toRegister()"
							><a href="#signup">去注册</a></span
						>
					</div>

					<div class="sign--type" v-show="!isLogin">
						<span>已有账号?<br /></span>
						<span class="link signin" @click="toLogin()"
							><a href="#signin">去登录</a></span
						>
					</div>

					<el-form
						:model="form"
						:rules="rules"
						ref="loginForm"
						autocomplete="off"
					>
						<div class="spacer"></div>
						<el-form-item label="" prop="tickname">
							<el-input
								v-model="form.tickname"
								autocomplete="off"
								placeholder="请输入用户"
							></el-input>
						</el-form-item>
						<el-form-item label="" prop="username" v-if="!isLogin">
							<el-input
								v-model="form.username"
								placeholder="请输入姓名"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item label="" prop="password">
							<el-input
								type="password"
								v-model="form.password"
								autocomplete="off"
								placeholder="请输入密码"
							></el-input>
						</el-form-item>
						<div class="ver-wrap">
							<HmVerification
								:show="isShow"
								@success="verSuccess"
								:sliderSize="30"
							></HmVerification>
							<div
								class="control-btn"
								@click="openVerification"
								v-show="!checkedSuccess"
							>
								<img src="@/assets/safe.svg" alt="" />
								<span>点击进行验证</span>
							</div>
							<div class="control-btn ver-success" v-show="checkedSuccess">
								<img src="@/assets/safe.svg" alt="" />
								<span>验证成功</span>
							</div>
						</div>
						<el-button
							type="primary"
							class="submit"
							id="signed-in"
							v-show="isLogin"
							:loading="isLoading"
							style="margin-left: 0"
							:disabled="checkedSuccess ? false : true"
							@click="submitForm(0)"
							>登 录</el-button
						>
						<el-button
							type="primary"
							class="submit"
							id="signed-in"
							style="margin-left: 0"
							v-if="!isLogin"
							:loading="isLoading"
							:disabled="checkedSuccess ? false : true"
							@click="submitForm(1)"
							>注 册</el-button
						>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BackgroundCss from "./BackgroundCss.vue";
import AESCrypt from "@/utils/AESCrypt";
import HmVerification from "@/components/hmVerification/HmVerification.vue";
import Api from "@/api";
import $ from "jquery";
var content = null,
	message = null,
	animatable = null,
	signedIn = null,
	signedUp = null;
export default {
	components: {
		BackgroundCss,
		HmVerification,
	},
	data() {
		return {
			form: {
				tickname: "",
				password: "",
				username: "",
			},
			rules: {
				tickname: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					},
					{
						min: 6,
						max: 20,
						message: "长度在 6 到 20 个字符",
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur",
					},
					{
						min: 6,
						max: 20,
						message: "长度在 6 到 20 个字符",
						trigger: "blur",
					},
				],
				username: [
					{
						required: true,
						message: "请输入姓名",
						trigger: "blur",
					},
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
					{
						pattern: /^[\u4e00-\u9fa5]+$/,
						message: "姓名须是中文",
						trigger: "blur",
					},
				],
			},

			isLogin: true,
			isShow: false,
			checkedSuccess: false,
			isLoading: false,
		};
	},
	mounted() {
		content = $(".content");
		message = $("#message");
		animatable = $(".animatable");
		signedIn = "signed-in";
		signedUp = "signed-up";
		document.addEventListener("keyup", (e) => {
			if (e.keyCode === 13 && this.checkedSuccess) {
				if (this.isLogin) {
					this.submitForm(0);
				} else {
					this.submitForm(1);
				}
			}
		});
	},
	beforeDestroy() {
		document.removeEventListener("keyup", () => {});
	},
	methods: {
		/**
		 * @description: 提交表单
		 * @param {*} formName 表单名称
		 * @param {*} type 按钮提交类型
		 * @return {*}
		 * @author: Gary
		 */
		submitForm(type) {
			this.$refs["loginForm"].validate((valid) => {
				if (valid) {
					if (type) {
						this.registerService(signedUp);
					} else {
						this.loginService(signedIn);
					}
				} else {
					return false;
				}
			});
		},
		/**
		 * @description: 调用登录服务
		 * @return {*}
		 * @author: Gary
		 */
		loginService(typeId) {
			this.isLoading = true;
			let params = {
				tickname: this.form.tickname,
				password: AESCrypt.encrypt(this.form.password),
			};
			Api.user
				.login(params)
				.then((res) => {
					this.isLoading = false;
					if (res.data && res.data.token) {
						this.resetForm();
						this.animateForm(typeId);
						setTimeout(() => {
							localStorage.setItem("token", res.data.token);
							this.$router.replace({
								path: "/home",
							});
						}, 2500);
					} else {
						this.$notify.error({
							title: "error",
							message: res.msg || "登录失败",
						});
					}
				})
				.catch(() => {
					this.isLoading = false;
				});
		},

		/**
		 * @description: 执行登录/注册成功欢迎动画
		 * @param {*} form 表单id
		 * @return {*}
		 * @author: Gary
		 */
		animateForm(typeId) {
			animatable.addClass(typeId);
			content.hide(300);
			//check which form to call appropriate animation
			if (typeId == signedIn) {
				message.text("welcome back");
			} else if (typeId == signedUp) {
				message.text("welcome to");
				$(".container").addClass(signedUp);
			}
		},

		/**
		 * @description: 调用注册服务
		 * @return {*}
		 * @author: Gary
		 */
		registerService(typeId) {
			this.isLoading = true;
			let params = {
				tickname: this.form.tickname,
				password: AESCrypt.encrypt(this.form.password),
				username: this.form.username,
			};
			Api.user
				.register(params)
				.then((res) => {
					this.isLoading = false;
					if (res.data) {
						this.animateForm(typeId);
						this.resetForm();
						setTimeout(() => {
							this.reset();
						}, 2500);
					} else {
						this.$notify.error({
							title: "error",
							message: res.msg || "注册失败",
						});
					}
				})
				.catch(() => {
					this.isLoading = false;
				});
		},

		/**
		 * @description: 重置动画
		 * @return {*}
		 * @author: Gary
		 */
		reset() {
			this.isLogin = true;
			message.text(null);
			content.show();
			animatable.removeClass(signedUp);
			$(".container").removeClass(signedUp);
		},
		resetForm() {
			this.$refs["loginForm"].resetFields();
		},
		toRegister() {
			this.isLogin = false;
			this.resetForm();
		},
		toLogin() {
			this.isLogin = true;
			this.resetForm();
		},

		/**
		 * @description: 开启人机校验
		 * @return {*}
		 * @author: Gary
		 */
		openVerification() {
			this.isShow = true;
		},

		/**
		 * @description: 校验成功
		 * @return {*}
		 * @author: Gary
		 */
		verSuccess() {
			this.isShow = false;
			this.checkedSuccess = true;
		},
	},
};
</script>

<style src="./css/login.css" scoped></style>
<style lang="less" scoped>
.login-wrap {
	width: 100%;
	height: 100%;
}

/deep/.el-input__inner {
	background-color: rgba(0, 0, 0, 0);
}

.el-button.submit {
	width: 100%;
	height: 42px;
	color: white;
	border: 0 solid rgba(0, 0, 0, 0.8);
	background: #17bebb;
	margin-top: 0px;
	box-shadow: 0 2px 0 #f5f5f5, 0 6px 0 #17bebb;
	transition: all 0.4s;
	&:not(.is-disabled):hover {
		background: #26547c;
		box-shadow: 0 2px 0 #f5f5f5, 0 6px 0 #26547c, 0 8px 0 #f5f5f5,
			0 11px 0 #26547c;
		margin-top: -2px;
		transition: all 0.2s;
	}
}

.ver-wrap {
	padding: 15px 0;
	.control-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #f5f5f5;
		font-size: 14px;
		border-radius: 4px;
		padding: 10px 0;
		background: linear-gradient(
			rgba(38, 84, 124, 0.3),
			rgba(38, 84, 124, 0.8),
			rgba(38, 84, 124, 0.3)
		);

		span {
			text-indent: 20px;
		}

		&.ver-success {
			cursor: default;
			background: linear-gradient(
				rgba(98, 210, 96, 0.4),
				rgba(98, 210, 96, 0.8),
				rgba(98, 210, 96, 0.4)
			);
		}
	}
}
</style>
