import {myRequest,beseUrl} from "./tools.js"

 async function cartlist() {
 	let {
 		token,
 		uid
 	} = uni.getStorageSync("userInfo")
 	var result = await myRequest("/api/cartlist", {
 		uid
 	}, "GET", {
 		authorization: token
 	})
 	var list = result[1].data.list
 	list.forEach((item) => {
 		item.img = beseUrl + item.img;
 		item.checked = item.checked == 1 ? true : false
 	})
 	this.list = list
 }
 export default {
	 cartlist
 }
