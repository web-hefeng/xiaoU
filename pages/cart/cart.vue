<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" v-for="(item,index) in list" :key="item.id" scroll-x="true" scroll-left="0">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @change="singleCheck($event,index)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="item.img" mode=""></image>
						</view>
						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="del(index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(index)">+</label>
							</view>
						</view>
					</view>
					<!-- 购物车商品信息 -->
				</view>
				<view class="cartDel" id="demo2"><label for="" @click="cartdelete" :id="item.id">删除</label></view>
			</scroll-view>
		</view>
		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAllCheck" @click="doAllCheck" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{total}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="accounts">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{count}}件)</label>
			</view>
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
				list: []
			}
		},
		methods: {
			async add(index) {
				this.list[index].num += 1
				this.doEdit(index)

			},
			async del(index) {
				if (this.list[index].num == 1) {
					return
				}
				this.list[index].num -= 1
				this.doEdit(index)
			},
			singleCheck(e, index) {
				var value = e.detail.value
				this.list[index].checked = value
				this.doEdit(index)
			},
			async doEdit(index) {
				let {
					id,
					num,
					checked
				} = this.list[index];
				checked = checked ? 1 : 0;
				let {
					token
				} = uni.getStorageSync("userInfo");
				var result = await myRequest("/api/cartedit", {
					id,
					num,
					checked
				}, "GET", {
					authorization: token
				})
			},
			doAllCheck() {
				this.isAllCheck = !this.isAllCheck
			},
			accounts() {
				let {
					uid,
					token
				} = uni.getStorageSync("userInfo")
				var id = this.list.map(item => {
					return item.goodsid
				})
				var ss = []
				this.list.forEach(item=>{
						if(item.checked){
							ss.push(item)
						}
				})
				uni.setStorageSync("cartlist",ss)
				uni.navigateTo({
					url:"/pages/confirm/confirm"
				})
			},
			async cartdelete(e) {
				let {
					token
				} = uni.getStorageSync("userInfo")
				var id = e.currentTarget.id
				wx.showModal({
					title: "确定删除商品？",
					success: async res => {
						if (res.confirm) {
							await myRequest("/api/cartdelete", {
								id
							}, "GET", {
								authorization: token
							})
							
						}
					}
				})

			}
		},
		computed: {
			total() {
				var sum = 0;
				this.list.forEach(item => {
					if (item.checked) {
						sum += item.price * item.num;
					}
				})
				return sum;
			},
			count() {
				var ss = 0
				this.list.forEach(item => {
					if (item.checked) {
						ss += item.num
					}
				})
				return ss
			},
			isAllCheck: {
				get: function() {
					return this.list.every(item => {
						return item.checked == true
					})
				},
				set: function(val) {
					this.list.forEach(item => {
						item.checked = val
					})
				}
			} 
		},
		async onLoad() {
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
			if(result[1].statusCode == 403){
				uni.showToast({
					title:"登录信息过期请重新登录",
					icon:"none"
				})
				uni.reLaunch({
					url:"/pages/send/send"
				})
			}
			
			
			
		},
		async onShow(){
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
	};
</script>

<style>
	@import url('../../common/css/cart.css');
	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
