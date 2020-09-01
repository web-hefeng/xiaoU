<template>
	<view>
		<view class="search" @click="gosearch">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder" />
		</view>
		<view class="list">
			<view class="row" v-for="(item,index) in list">
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>
		</view>
		<view class="tishi"> 
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {myRequest,beseUrl} from "../../utils/tools.js"
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			gosearch() {
				uni.navigateTo({
					url: "../search/search"
				})
			}
		},
		async onLoad(e){
			var id = e.id
			console.log(id)
			var result = await myRequest("/api/getcategoods",{fid:id})
			console.log(result)
			var list = result[1].data.list
			list.forEach(item=>{
				item.img = beseUrl+item.img
			})
			this.list = list
		}
	}
</script>

<style>
	.search {
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	icon {
		margin: 0 10rpx 0 250rpx;
	}

	.placeholder {
		color: white;
		font-size: 25rpx;
	}

	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 160rpx;
	}

	.info {
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
