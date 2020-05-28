<!-- 该页面是从点击个人中心的就诊记录跳转过来的，用于展示用户的就诊记录 -->
<template>
	<view class="page-backgroud">
		<view class="treat-record-box" v-for="(item, index) in treatRecordList" 
		:key="item.id" @click="toDetail(item.id)" v-if="item.status == 3">
			<view class="info-box">
				<text class="left black-text">时间：</text>
				<text class="right gray-text">2020-05-26/9:00~10:00</text>
			</view>
			<view class="info-box">
				<text class="left black-text">医生：</text>
				<text class="right gray-text">{{ item.doctorName }}</text>
			</view>
			<view class="info-box">
				<text class="left black-text">科室：</text>
				<text class="right gray-text">{{ item.specialName }}/{{ item.outpatientName }}</text>
			</view>
			<view class="more">查看详情...</view>
		</view>
	</view>
</template>

<script>
	import {getAllAppointmentRecord} from '@/common/api/appointment.js'
	export default {
		data() {
			return {
				cardID:0,
				accountID:0,
				treatRecordList: []
			}
		},
		methods: {
			getBaseInfo:function(){
				this.cardID = uni.getStorageSync('cardID')
				this.accountID = uni.getStorageSync('accountID')
			},
			// 点击跳转到详情页面
			toDetail: function(ID) {
				uni.navigateTo({
					url: '/pagesA/pages/treatRecord/treatRecordDetail/' + 
					'treatRecordDetail?recordID=' + ID
				})
			},
			getAllAppointmentRecord:function(){
				getAllAppointmentRecord(this.cardID,this.accountID,1,50).then(res => {
					//console.log(res.data.data.list)
					this.treatRecordList = res.data.data.list
				}).catch(() => {
					uni.hideLoading()
					error('网络')
				})
			}
	},
	onLoad() {
		this.getBaseInfo()
		this.getAllAppointmentRecord()
		//console.log(treatRecordList)
	}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	.treat-record-box{
		@include width-margin(90%, auto);
		background-color: #FFFFFF;
		border-radius: 7px;
		overflow: hidden;
		margin-top: 30rpx;
		.info-box{
			@include width-margin(90%, 80rpx);
			line-height: 80rpx;
			@include row-left-right(20%, 80%);
			.black-text{
				@include font-style(16px, 500, #000000);
			}
			.gray-text{
				@include font-style(16px, 500, $gray-color);
			}
		}
		.info-box:nth-last-child(2){
			border-bottom: 1px solid $uni-border-color;
		}
		.more{
			@include width-margin(90%, 100rpx);
			line-height: 100rpx;
			text-align: right;
			@include font-style(17px, 500, $major-color);
		}
	}
	.treat-record-box:last-child{
		margin-bottom: 30rpx;
	}
</style>
