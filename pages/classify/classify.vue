<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view v-for="(item,index) in list" :key="id" @click="getlist" :data-current="index" :id="item.id" :class="num==index?'left_list activeList':'left_list'">
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" @click="detail" :id="item.id" v-for="(item,index) in infolist" :key="id">
						<!-- 每个最多显示6个 -->
						<view>
							<image :src="beseUrl+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
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
		data() {
			return {
				list: [],
				num: "0", 
				cateid: "1",
				infolist: [],
				beseUrl:"http://localhost:3000"
			}
		},
		methods: {
			async getlist(e) {
				console.log(e);
				this.num = e.currentTarget.dataset.current;
				this.cateid = e.currentTarget.id;
				var categoods = await myRequest("/api/getcates");
				console.log(categoods[1].data.list[this.num])
				if(categoods[1].data.list[this.num].children){ 
					this.infolist=categoods[1].data.list[this.num].children
				}else {
					this.infolist=[]
				}
			},
			detail(e){
				var id = e.currentTarget.id
				uni.navigateTo({
					url:"/pages/product/product?id="+id
				})
			}
		},   
		async onLoad() {
			var result = await myRequest("/api/getcates")
			this.list = result[1].data.list 
			this.infolist = result[1].data.list[0].children
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
