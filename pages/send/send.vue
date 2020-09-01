<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text v-if="!isf" @click="send">发送</text>
				<text v-else datebase>{{num}}</text>
			</view>
			<input type="text" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" :disabled="hui"  @click="doLogin" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from "../../utils/tools.js"
	export default {
		data() {
			return {
				phone: "",
				code: "",
				num: 60,
				isf:false,
				hui:true
			}
		},
		methods: {
			async send() {
				console.log("我点了")
				var aa = /^1[3456789]\d{9}$/;
				if(!(aa.test(this.phone))){
					uni.showToast({
						title:"手机号码有误，请重填",
						icon:"none"
					})
					return
				}
				var result = await myRequest("/api/sms", {
					phone: this.phone
				})
				var code = result[1].data.list.code
				wx.setStorageSync("code", code)
				this.isf = true
				var dd = setInterval(() => {
					this.num--;
					if (this.num == 0) {
						clearInterval(dd)
						this.isf = false
					}
				}, 1000)
			},
			async doLogin() {
				var code = this.code;
				var codeStorage = wx.getStorageSync("code")
				if (code == codeStorage) {
					var result = await myRequest("/api/wxlogin", {
						phone: this.phone
					})
					console.log(result)
					var userInfo = result[1].data.list
					wx.setStorageSync("userInfo", userInfo)
					wx.switchTab({
						url: "/pages/mine/mine"
					})

				} else {
					wx.showToast({
						title: "验证码不正确",
						icon: "none"
					})
				}
			}
		},
		watch:{
			code:function(){
				if(this.code.length !=4){
					this.hui = true
				}else {
					this.hui = false
				}
			}
		}
		
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
