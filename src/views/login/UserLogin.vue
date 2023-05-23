<template>
	<div class="login-wrap" translate="no">
		<background-css></background-css>
		<div class="content">
			<el-form
				:model="form"
				:rules="rules"
				ref="form"
				label-width="80px"
				class="demo-ruleForm"
			>
				<el-form-item label="用户名" prop="username">
					<el-input
						v-model="form.username"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input
						type="password"
						v-model="form.password"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="resetForm('form')">重置</el-button>
					<el-button
						type="primary"
						@click="submitForm('form', 0)"
						v-if="isLogin"
						>登录</el-button
					>
					<el-button
						type="primary"
						@click="submitForm('form', 1)"
						v-else
						>注册</el-button
					>
				</el-form-item>
			</el-form>
			<p class="target-link" @click="toRegister('form')" v-if="isLogin">
				去注册？
			</p>
			<p class="target-link" @click="toLogin('form')" v-else>去登录</p>
		</div>
	</div>
</template>

<script>
	import BackgroundCss from "./BackgroundCss.vue";
	import AESCrypt from "@/utils/AESCrypt";
	import Api from "@/api";
	export default {
		components: {
			BackgroundCss,
		},
		data() {
			return {
				form: {
					username: "",
					password: "",
				},
				rules: {
					username: [
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
				},

				isLogin: true,
			};
		},
		methods: {
			submitForm(formName, type) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (type) {
							this.registerService();
						} else {
							this.loginService();
						}
					} else {
						return false;
					}
				});
			},

			loginService() {
				let params = {
					username: this.form.username,
					password: AESCrypt.encrypt(this.form.password),
				};
				Api.user.login(params).then((res) => {
					if (res.data && res.data.token) {
						this.$message({
							type: "success",
							message: "登录成功",
						});
						this.$router.push({
							path: "/home",
						});

						localStorage.setItem("token", res.data.token);
					}
				});
			},

			registerService() {
				let params = {
					username: this.form.username,
					password: AESCrypt.encrypt(this.form.password),
				};
				Api.user.register(params).then((res) => {
					console.log(res);
				});
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			toRegister(formName) {
				this.isLogin = false;
				this.resetForm(formName);
			},

			toLogin(formName) {
				this.isLogin = true;
				this.resetForm(formName);
			},
		},
	};
</script>

<style lang="less" scoped>
	.login-wrap {
		width: 100%;
		height: 100%;
		.content {
			min-width: 400px;
			min-height: 400px;
			background-color: rgba(255, 255, 255, 0.8);
			border-radius: 0.5em;
			box-shadow: 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.25);
			box-sizing: border-box;
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			padding: 8vmin;

			.target-link {
				cursor: pointer;
			}
			/deep/.el-input__inner {
				background-color: rgba(0, 0, 0, 0);
				border: 1px solid #aaa;
			}
		}
	}
</style>
