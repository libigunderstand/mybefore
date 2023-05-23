/**
 * AES对称加密
 */
import * as CryptoJS from "crypto-js";
// 密钥
const secretKey = "0ki422ejx6f3s97h1u74s8t936t488bs";
// 加密
function encrypt(text) {
	let iv = "0000000000000000";
	const msg = CryptoJS.enc.Utf8.parse(text);
	const key = CryptoJS.enc.Utf8.parse(secretKey);
	iv = CryptoJS.enc.Utf8.parse(iv);
	const encrypt = CryptoJS.AES.encrypt(msg, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypt.toString();
}

// 解密
function decrypt(ciphertext) {
	let iv = "0000000000000000";
	const key = CryptoJS.enc.Utf8.parse(secretKey);
	iv = CryptoJS.enc.Utf8.parse(iv);
	const decrypt = CryptoJS.AES.decrypt(ciphertext, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return decrypt.toString(CryptoJS.enc.Utf8);
}

export default {
	encrypt,
	decrypt,
};
