<template>
	<view class="container">
		<!-- 顶部头像部分 -->
		<view class="mineTop">
			<view class="mineTop_left">
				<view class="mineTop_left_image">
					<image src="../../static/mine/timg.jpg" mode=""></image>
				</view>
				<view class="mineTop_left_info">
					<label for="" style="color: #fff;">小U</label>
					<label for="">V1</label>
				</view>
			</view>
			<view class="mineTop_right">
				<view class="mineTop_right_info"><label for="">每日签到</label></view>
			</view>
		</view>
		<!-- 订单状态 -->
		<view class="order_state">
			<view class="order_state_list">
				<image src="/static/mine/quanbudingdan.png" mode=""></image>
				<lable class="list_text">全部订单</lable>
			</view>
			<view class="order_state_list">
				<image src="/static/mine/daifukuan.png" mode=""></image>
				<lable class="list_text">待付款</lable>
			</view>
			<view class="order_state_list">
				<image src="/static/mine/dizhiguanli.png" mode=""></image>
				<lable class="list_text">待收货</lable>
			</view>

		</view>

		<!-- 个人信息 -->
		<view class="person_msg">



			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/dizhiguanli.png" alt class="MsgItemLogo" />
					<label>地址管理</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>

			</view>



			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/zu.png" alt class="MsgItemLogo" />
					<label>我的钱包</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/wodeyouhuiquan.png" alt class="MsgItemLogo" />
					<label>我的优惠券</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/wodeerweima.png" alt class="MsgItemLogo" />
					<label>我的二维码</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/xiaohuoban.png" alt class="MsgItemLogo" />
					<label>我的小伙伴</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from "../../utils/tools.js"
	export default {
		async onShow() {
			let {
				uid,
				token
			} = uni.getStorageSync("userInfo")
			//判断是否登录
			if(!uni.getStorageSync("userInfo")){
				uni.showToast({
					title:"未登录请先登录",
					icon:"none"
				})
				uni.reLaunch({
					url:"/pages/send/send"
				})
			}
			//登录信息过期
			var result = await myRequest("/api/checktoken", {}, "GET", {
				authorization: token,
				'content-type': 'application/x-www-form-urlencoded'
			})
			console.log(result)
			if(result[1].statusCode == 403){
				uni.showToast({
					title:"登录信息过期请重新登录",
					icon:"none"
				})
				uni.reLaunch({
					url:"/pages/send/send"
				})
			}
		}
	};
</script>
<style>
	@import url('../../common/css/mine.css');
</style>
