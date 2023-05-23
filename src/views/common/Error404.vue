<!--
 * @ Author: gary
 * @ Create Time: 2023-05-24 02:15:08
 * @ Modified by: gary
 * @ Modified time: 2023-05-24 03:20:27
 * @ Description:
 -->

<template>
	<div class="page-404">
		<div class="rail">
			<div
				v-for="(item, idx) in new Array(20)"
				:key="idx"
				:class="['stamp', idx % 2 == 0 ? 'four' : 'zero']"
			>
				{{ idx % 2 == 0 ? 4 : 0 }}
			</div>
		</div>
		<div class="world">
			<div class="forward">
				<div class="box">
					<div
						v-for="(item, idx) in new Array(6)"
						:key="idx"
						class="wall"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Error404",
	};
</script>

<style lang="scss" scoped>
	.page-404 {
		background: rgba(10, 10, 10, 0.5);
		height: 100vh;
		overflow: hidden;
		display: flex;
		font-family: "Anton", sans-serif;
		justify-content: center;
		align-items: center;
		-webkit-perspective: 1000px;
		perspective: 1000px;

		div {
			-webkit-transform-style: preserve-3d;
			transform-style: preserve-3d;
		}
	}
	.rail {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		$rotateDeg: -30deg;
		-webkit-transform: rotateX($rotateDeg) rotateY($rotateDeg);
		transform: rotateX($rotateDeg) rotateY($rotateDeg);
	}
	.rail {
		.stamp {
			position: absolute;
			width: 200px;
			height: 200px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #141414;
			color: #fff;
			font-size: 7rem;
		}

		$count: 20;
		$current: -2300ms;
		$stemp: -2000ms;
		@for $i from 1 through $count {
			.stamp:nth-child(#{$i}) {
				-webkit-animation: stampSlide
					40000ms
					($current + ($stemp * $i))
					linear
					infinite;
				animation: stampSlide
					40000ms
					($current + ($stemp * $i))
					linear
					infinite;
			}
		}
	}

	@-webkit-keyframes stampSlide {
		0% {
			-webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
				translateY(130px);
			transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
				translateY(130px);
		}
		100% {
			-webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
				translateY(-3870px);
			transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
				translateY(-3870px);
		}
	}

	@keyframes stampSlide {
		0% {
			-webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
				translateY(130px);
			transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
				translateY(130px);
		}
		100% {
			-webkit-transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
				translateY(-3870px);
			transform: rotateX(90deg) rotateZ(-90deg) translateZ(-200px)
				translateY(-3870px);
		}
	}
	.world {
		-webkit-transform: rotateX(-30deg) rotateY(-30deg);
		transform: rotateX(-30deg) rotateY(-30deg);
		.forward {
			position: absolute;
			-webkit-animation: slide 2000ms linear infinite;
			animation: slide 2000ms linear infinite;
		}
		.box {
			width: 200px;
			height: 200px;
			-webkit-transform-origin: 100% 100%;
			transform-origin: 100% 100%;
			-webkit-animation: roll 2000ms cubic-bezier(1, 0.01, 1, 1) infinite;
			animation: roll 2000ms cubic-bezier(1, 0.01, 1, 1) infinite;
			.wall {
				position: absolute;
				width: 200px;
				height: 200px;
				background: rgba(10, 10, 10, 0.8);
				border: 1px solid #fafafa;
				box-sizing: border-box;
				&::before {
					content: "";
					position: absolute;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					font-size: 7rem;
				}
			}
		}
	}

	.world .box .wall:nth-child(1) {
		-webkit-transform: translateZ(100px);
		transform: translateZ(100px);
	}
	.world .box .wall:nth-child(2) {
		-webkit-transform: rotateX(180deg) translateZ(100px);
		transform: rotateX(180deg) translateZ(100px);
	}
	.world .box .wall:nth-child(3) {
		-webkit-transform: rotateX(90deg) translateZ(100px);
		transform: rotateX(90deg) translateZ(100px);
	}
	.world .box .wall:nth-child(3)::before {
		-webkit-transform: rotateX(180deg) rotateZ(90deg) translateZ(-1px);
		transform: rotateX(180deg) rotateZ(90deg) translateZ(-1px);
		-webkit-animation: zeroFour 4000ms -2000ms linear infinite;
		animation: zeroFour 4000ms -2000ms linear infinite;
	}
	.world .box .wall:nth-child(4) {
		-webkit-transform: rotateX(-90deg) translateZ(100px);
		transform: rotateX(-90deg) translateZ(100px);
	}
	.world .box .wall:nth-child(4)::before {
		-webkit-transform: rotateX(180deg) rotateZ(-90deg) translateZ(-1px);
		transform: rotateX(180deg) rotateZ(-90deg) translateZ(-1px);
		-webkit-animation: zeroFour 4000ms -2000ms linear infinite;
		animation: zeroFour 4000ms -2000ms linear infinite;
	}
	.world .box .wall:nth-child(5) {
		-webkit-transform: rotateY(90deg) translateZ(100px);
		transform: rotateY(90deg) translateZ(100px);
	}
	.world .box .wall:nth-child(5)::before {
		-webkit-transform: rotateX(180deg) translateZ(-1px);
		transform: rotateX(180deg) translateZ(-1px);
		-webkit-animation: zeroFour 4000ms linear infinite;
		animation: zeroFour 4000ms linear infinite;
	}
	.world .box .wall:nth-child(6) {
		-webkit-transform: rotateY(-90deg) translateZ(100px);
		transform: rotateY(-90deg) translateZ(100px);
	}
	.world .box .wall:nth-child(6)::before {
		-webkit-transform: rotateX(180deg) rotateZ(180deg) translateZ(-1px);
		transform: rotateX(180deg) rotateZ(180deg) translateZ(-1px);
		-webkit-animation: zeroFour 4000ms linear infinite;
		animation: zeroFour 4000ms linear infinite;
	}

	@-webkit-keyframes zeroFour {
		0% {
			content: "4";
		}
		100% {
			content: "0";
		}
	}

	@keyframes zeroFour {
		0% {
			content: "4";
		}
		100% {
			content: "0";
		}
	}
	@-webkit-keyframes roll {
		0% {
			-webkit-transform: rotateZ(0deg);
			transform: rotateZ(0deg);
		}
		85% {
			-webkit-transform: rotateZ(90deg);
			transform: rotateZ(90deg);
		}
		87% {
			-webkit-transform: rotateZ(88deg);
			transform: rotateZ(88deg);
		}
		90% {
			-webkit-transform: rotateZ(90deg);
			transform: rotateZ(90deg);
		}
		100% {
			-webkit-transform: rotateZ(90deg);
			transform: rotateZ(90deg);
		}
	}
	@keyframes roll {
		0% {
			-webkit-transform: rotateZ(0deg);
			transform: rotateZ(0deg);
		}
		85% {
			-webkit-transform: rotateZ(90deg);
			transform: rotateZ(90deg);
		}
		87% {
			-webkit-transform: rotateZ(88deg);
			transform: rotateZ(88deg);
		}
		90% {
			-webkit-transform: rotateZ(90deg);
			transform: rotateZ(90deg);
		}
		100% {
			-webkit-transform: rotateZ(90deg);
			transform: rotateZ(90deg);
		}
	}
	@-webkit-keyframes slide {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
		100% {
			-webkit-transform: translateX(-200px);
			transform: translateX(-200px);
		}
	}
	@keyframes slide {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
		100% {
			-webkit-transform: translateX(-200px);
			transform: translateX(-200px);
		}
	}
</style>
