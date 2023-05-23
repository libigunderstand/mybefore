<template>
	<div class="login-wrap" translate="no">
		<background-css></background-css>
		<div class="content">
			<el-form label-position="left" label-width="80px" :model="loginForm">
				<el-form-item label="用户名: ">
					<el-input v-model="loginForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码: ">
					<el-input type="password" v-model="loginForm.region"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import BackgroundCss from "./BackgroundCss.vue";
export default {
	components: {
		BackgroundCss,
	},
	data() {
		return {
			loginForm: {
				username: "",
				password: "",
			},
		};
	},
};
</script>

<style lang="less" scoped>
.login-wrap {
	width: 100%;
	height: 100%;
	.content {
		min-width: 500px;
		min-height: 500px;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 0.5em;
		box-shadow: 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.25);
		box-sizing: border-box;
		left: 50%;
		padding: 10vmin;
		position: fixed;
		text-align: center;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
