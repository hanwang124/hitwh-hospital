import request from '@/common/utils/request.js';
import unLoginRequest from '@/common/utils/unloginRequest.js'

export function addAppointment(appointmentData){
	return request({
		 url: '/visit/appointment',
		 method: 'post',
		 data:appointmentData
	})
}

export function getAllAppointmentRecord(cardId,accountId,pageNum,pageSize){
	return request({
		url:'/visit/appointment/all?cardId=' + cardId + '&accountId=' + accountId + '&pageNum=' + pageNum +'&pageSize= ' + pageSize,
		method: 'get'
	})
}