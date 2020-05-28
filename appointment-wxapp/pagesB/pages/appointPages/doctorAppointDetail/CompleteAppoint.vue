<template>
	<view>
		<view class="font">挂号成功</view>
	<button class="button" @click="backButton()">确认</button>
	</view>
</template>

<script>
	
	export default{
		methods:{
			backButton:function(){
				uni.navigateBack({
					delta:4
				}),
				uni.removeStorageSync('doctorInfo')
			}
		},
		onUnload() {
			uni.navigateBack({
				delta:4
			}),
			uni.removeStorageSync('doctorInfo')
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/form.scss';
	page{
		@extend .page-backgroud;
	}
	.button{
		@extend .button-box;
		margin-top: 50rpx;
	}
	.font{
		display:flex;
		width: 100%;
		height: 500rpx;
		font-size: 100rpx;
		color: #000000;
		justify-content: center;
		align-content: center; //垂直居中
	}
</style>
