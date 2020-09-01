<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="beseUrl+info.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{info.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{info.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="del">-</label>
					<label class="zhi">{{num}}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{info.specsname}}</label>
					<view :class="is==index?'threed3i1active':'threed3i1'" v-for="(item,index) in sp" :key="index" @click="getindex"
					 :data-index="index">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<view v-html="info.description">

			</view>
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />
				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCart">加入购物车</button>
			<button class="footbtn2" @click="gocart">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		myRequest,
		beseUrl
	} from "../../utils/tools.js"
	export default {
		data() {
			return {
				info: {},
				beseUrl,
				sp: [],
				num: 1,
				is: 0
			}
		},
		methods: {
			getindex(e) {
				this.is = e.currentTarget.dataset.index
			},
			add() {
				this.num += 1
			},
			del() {
				if (this.num == 1) {
					return
				}
				this.num -= 1
			},
			async addCart() {
				let {
					uid,
					token
				} = uni.getStorageSync("userInfo")
				if (!uni.getStorageSync("userInfo")) {
					uni.showToast({
						title: "未登录请先登录",
						icon: "none"
					})
					uni.reLaunch({
						url: "/pages/send/send"
					})
					return
				}
				//登录信息过期
				var result1 = await myRequest("/api/checktoken", {}, "GET", {
					authorization: token,
					'content-type': 'application/x-www-form-urlencoded'
				})
				console.log(result1)
				if (result1[1].statusCode == 403) {
					uni.showToast({
						title: "登录信息过期请重新登录",
						icon: "none"
					})
					uni.reLaunch({
						url: "/pages/send/send"
					})
				}
				var goodsid = this.$mp.query.id
				var num = this.num
				var result = await myRequest("/api/cartadd", {
					uid,
					goodsid,
					num
				}, "GET", {
					authorization: token
				})
				wx.showToast({
					title: "添加成功"
				})
			},
			gocart() {
				uni.reLaunch({
					url: "/pages/cart/cart"
				})
			}
		},
		async onLoad(e) {
			// console.log(this.$mp.query.id)
			var id = e.id
			var result = await myRequest("/api/getgoodsinfo", {
				id
			})
			this.info = result[1].data.list[0]
			this.sp = this.info.specsattr.split(",")
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
