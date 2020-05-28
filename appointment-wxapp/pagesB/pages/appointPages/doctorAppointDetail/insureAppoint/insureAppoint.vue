<template>
	<view>
		<view class="blue-column-border-box">
			<view class="blue-border"></view>
			<view class="blue-text">就诊信息详情</view>
		</view>
		<view class="gray-box">
			<view class="top-row-box">
				<text class="left left-text">挂号诊疗费</text>
				<text class="right right-text"><text style="color: #FFD39B;">10</text>元</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">科室</text>
				<text class="right right-text">{{doctorInfo.specialName}}/{{doctorInfo.outpatientName}}</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">医生</text>
				<text class="right right-text">{{doctorInfo.name}}</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">就诊时间</text>
				<text class="right right-text">2020-05-26 09:00-09:30</text>
			</view>
		</view>
		
		<view class="blue-column-border-box" style="margin-top: 30rpx;">
			<view class="blue-border"></view>
			<view class="blue-text">选择就诊卡人</view>
		</view>
		<view class="gray-box">
			<view class="bottom-row-box">
				<view class="left left-icon-text-box">
					<image class="icon" src="/static/center/card/radio-actived.png"></image>
					<text class="left-text">{{userCardInfo.name}}</text>
				</view>
				<text class="right right-text">(就诊卡号：{{userCardInfo.id}})</text>
			</view>
			<view class="bottom-row-box">
				<view class="left left-icon-text-box">
					<image class="icon" src="/static/add-crads.png"></image>
					<text class="left-text">添加就诊卡</text>
				</view>
			</view>
		</view>
		<button class="button" @click="toCompleteAppoint()">确认</button>
	</view>
</template>

<script>
	import { getUserBaseInfo } from '@/common/api/userInfo.js'
	import { error } from '@/common/js/errorTips.js'
	import {getUserCardInfo} from '@/common/api/userInfo.js'
	import {getOutCallByDoctor} from '@/common/api/outCall.js'
	import {addAppointment} from '@/common/api/appointment.js'
	export default {
		data() {
			return {
				// 用户基本信息
				userBaseInfo: {},
				// 用户就诊卡信息
				userCardInfo: {},
				doctorInfo:{},
				appointmentData:{}
			}
		},
		methods: {
			getAppointmentData:function(){
				this.appointmentData.accountId = uni.getStorageSync('accountID')
				this.appointmentData.cardId = uni.getStorageSync('cardID')
				this.appointmentData.planId = 10042
				this.appointmentData.timePeriod = 2
			},
			toCompleteAppoint: function(){
				addAppointment(this.appointmentData)
				.catch(() => {
					uni.hideLoading()
					error('挂号失败')
				})
				uni.navigateTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail/CompleteAppoint'
				})
			},
			getMyselfCardInfo: function() {
				uni.showLoading({
					title: '加载中'
				})
				getUserCardInfo(uni.getStorageSync('accountID')).then(res => {
					if(res.data.code === 200) {
						uni.hideLoading()
						// 即为用户没有添加本人的就诊卡
						if(res.data.data.length === 0) {
							this.isGetCard = false
						} else {
							this.isGetCard = true
							const data = res.data.data
							let _this = this
							if(data.length > 0) {
								data.forEach(function(item, index){
									// 获取自己的就诊卡号
									if(item.type === 0) {
										_this.userCardInfo = item
										uni.setStorageSync('cardID', item.id)
										return
									}
								})
							}
						}
					}
				}).catch(() => {
					uni.hideLoading()
					error('网络')
				})
				
			}			
		,
			// 获取医生的出诊信息
			getOutCallByDoctor: function() {
				getOutCallByDoctor(this.doctorInfo.id).then(res => {
					if(res.data.code === 200) {
						
					}
				})
			}
			},onLoad() {
				this.getAppointmentData()
				this.userBaseInfo = JSON.parse(uni.getStorageSync('userInfo'))
				this.getMyselfCardInfo()
				this.doctorInfo = JSON.parse(uni.getStorageSync('doctorInfo'))
				this.getOutCallByDoctor()
				uni.removeStorageSync('doctorInfo')
				//// 获取用户信息后就将缓存移除
				//uni.removeStorageSync('userInfo')
			}
}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/form.scss';
	page{
		@extend .page-backgroud;
	}
	.gray-box{
		@extend .gray-border-box;
		.top-row-box{
			@include width-margin(95%, 100rpx);
			@include row-left-right(35%, 65%);
			line-height: 100rpx;
			.left-text{
				@include font-style(16px, bold, #000000);
			}
			.right-text{
				@include font-style(16px, 500, $gray-color);
			}
		}
		.bottom-row-box{
			@include width-margin(95%, 100rpx);
			@include row-left-right(50%, 50%);
			line-height: 100rpx;
			.right-text{
				@include font-style(16px, 500, $gray-color);
			}
			.left-icon-text-box{
				height: 100%;
				@include flex-direction(row);
				align-items: center;
				.icon{
					@include icon-size(50rpx,50rpx);
					margin-right: 20rpx;
				}
				.left-text{
					@include font-style(16px, bold, #000000);
				}
			}
		}
		.top-row-box:not(:last-child){
			border-bottom: 1px solid $border-color;
		}
		.bottom-row-box:not(:last-child){
			border-bottom: 1px solid $border-color;
		}
	}
	// 按钮的颜色
	.button{
		@extend .button-box;
		margin-top: 50rpx;
	}
</style>
