/*
 * @description:
 * @Autor: Gary
 * @Date: 2023-05-08 16:34:51
 * @LastEditors: Gary
 * @LastEditTime: 2023-05-18 10:39:04
 */
const domSymbol = Symbol("watermark-dom");
const body = document.body;

export function useWatermark(appendEl = body) {
	let func = () => {};
	const id = domSymbol.toString();
	const clear = () => {
		const domId = document.getElementById(id);
		if (domId) {
			const el = appendEl;
			el && el.removeChild(domId);
		}
		window.removeEventListener("resize", func);
	};
	const createWatermark = ({
		text = "请设置水印",
		fontSize = 14,
		fontFamily = "Microsoft YaHei",
		fontColor = "#000",
		rotateDeg = 45,
		opacity = 1,
		xNum = 4,
		yNum = 4,
		tGap = 0,
		bGap = 0,
		lGap = 0,
		rGap = 0,
		width,
		height,
	}) => {
		clear();

		let can = document.createElement("canvas");

		// 根据间距和数量设置画布大小
		can.width = (width / xNum).toFixed(0);

		can.height = (height / yNum).toFixed(0);

		let cans = can.getContext("2d");

		if (cans) {
			cans.translate(can.width / 2, can.height / 2);
			cans.rotate((rotateDeg * Math.PI) / 180);
			cans.translate(-(can.width / 2), -(can.height / 2));
			cans.font = `${fontSize}px ${fontFamily}`;
			(cans.fillStyle = fontColor), (cans.textAlign = "left");
			cans.textBaseline = "middle";
			cans.fillText(text, 0, can.height / 2, can.width);
			// 坐标系还原
			cans.setTransform(1, 0, 0, 1, 0, 0);
		}

		let wrapper = document.createElement("div");
		wrapper.id = id;
		wrapper.style.pointerEvents = "none";
		wrapper.style.top = "0px";
		wrapper.style.left = "0px";
		wrapper.style.position = "absolute";
		wrapper.style.zIndex = "100000000";
		wrapper.style.width = width + "px";
		wrapper.style.height = height + "px";
		wrapper.style.opacity = opacity;
		wrapper.style.paddingTop = tGap + "px";
		wrapper.style.paddingBottom = bGap + "px";
		wrapper.style.paddingLeft = lGap + "px";
		wrapper.style.paddingRight = rGap + "px";
		wrapper.style.boxSizing = "border-box";

		let waterDom = document.createElement("div");
		waterDom.style.width = "100%";
		waterDom.style.height = "100%";
		waterDom.style.background =
			"url(" + can.toDataURL("image/png") + ") left top repeat";

		wrapper.appendChild(waterDom);
		const el = appendEl;
		el && el.appendChild(wrapper);
		return id;
	};

	function setWatermark(params) {
		const { open } = params;
		if (!open) {
			clear();
			return;
		}
		createWatermark(params);
		func = () => {
			createWatermark(params);
		};
		window.addEventListener("resize", func);
	}

	return { setWatermark, clear };
}
