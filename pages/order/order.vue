]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list" v-if="is">
			<view class="row">
				<view class="products" v-for="(item,index) in list.child" :key="item.id">
					<view class="imagebox" v>
						<image :src="item.img" mode="widthFix"></image>
						<text>{{item.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text  space="nbsp">总计{{list.countnumber}}商品  </text>  
					<text>应付金额 ￥{{list.countmoney}}</text>
				</view>
			</view>
		
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
		import {myRequest,beseUrl} from "../../utils/tools.js"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default{
		   components: {uniSearchBar},
		   data(){
			   return{
				   list:[],
				   is:false
			   }
		   },
		   async onLoad(){
			   let {uid,token} = uni.getStorageSync("userInfo")
			   var result = await myRequest("/api/orders",{uid},"GET",{authorization:token})
			   console.log(result)
			   var list = result[1].data.list[0]
			   list.child.forEach(item=>{
				   item.img = beseUrl+item.img
			   })
			   this.list = list
			   if(this.list!=""){
				   this.is=true
			   }else {
				   this.is=false
			   }
		   }
	}

	
</script>
<style>

	.row{
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		float: left;
		margin:10rpx;
	}
	.products{
		overflow: hidden;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.info{
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
