import axios from 'axios'

import baseURI from 'api/env'

let qs = require('qs')
//文章列表
export function findArtcleByType(list){
	const url = baseURI + '/mkkMoblie/doctorSupplyTwo/findArtcleByType'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
             type: list. type,
             token: list.token,
             pageNum: list.pageNum,
             pageSize: list.pageSize

		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取省
export function getProvince(list){
	const url = baseURI + '/mkkMoblie/area/getProvince'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
             
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取市
export function getCity(list){
	const url = baseURI + '/mkkMoblie/area/getCity'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
             parentId: list.parentId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取县
export function getArea (list){
	const url = baseURI + '/mkkMoblie/area/getArea'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
             parentId: list.parentId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//添加地址
export function patientAddAdress (list){
	const url = baseURI + '/mkkMoblie/patient/patientAddAdress'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            recipient: list.recipient,
			area: list.area,
			adress: list.adress,
			patientId: list.patientId,
			phone: list.phone,
			token: list.token,
			isDefault:list.isDefault
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//修改地址
export function patientUpdAdress (list){
	const url = baseURI + '/mkkMoblie/patient/patientUpdAdress'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            id: list.id,
			area: list.area,
			adress: list.adress,
			recipient: list.recipient,
			phone: list.phone,
			token: list.token,
			isDefault:list.isDefault
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//删除地址
export function deleteAddress (list){
	const url = baseURI + '/mkkMoblie/patientSupply/deleteAddress'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			addressId: list.addressId,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取单个地址
export function addressFindOne(list){
	const url = baseURI + '/mkkMoblie/patientSupply/addressFindOne'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			recipientId: list.recipientId,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//购药页面
export function patientPayPage(list){
	const url = baseURI + '/mkkMoblie/prescription/patientPayPage'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token,
			patientId: list.patientId,
			indentId: list.indentId,
			doctorId: list.doctorId,
			addressId:list.addressId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//药方详情
export function lookPrescription(list){
	const url = baseURI + '/mkkMoblie/patientSupply/lookPrescription'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token,
			prescriptionId: list.prescriptionId,
			patientId: list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//我的处方
export function myCase(list){
	const url = baseURI + '/mkkMoblie/patientSupply/myCase'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token,
			patientId: list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//选择药店
export function mateShop(list){
	const url = baseURI + '/mkkMoblie/prescription/mateShop'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token,
			indentId: list.indentId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//我的订单
export function findOrder(list){
	const url = baseURI + '/mkkMoblie/patient/findOrder'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token,
			patientId: list.patientId,
			indentStatus:list.indentStatus,
			index:list.index
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//去支付
export function indentPay(list){
	const url = baseURI + '/mkkMoblie/prescription/indentPay'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token,
			appid: list.appid,
			indentId: list.indentId,
			mch_id: list.mch_id,
			patientId: list.patientId,
			shopId: list.shopId,
			money: list.money,
			is_dispatching: list.is_dispatching,
			dispatchingMoney: list.dispatchingMoney,
			is_to_agency: list.is_to_agency,
			agencyMoney: list.agencyMoney,
			makeMoney: list.makeMoney,
			medicinalMoney: list.medicinalMoney,
			addressId: list.addressId,
			recipient: list.recipient,
			receiptPlace: list.receiptPlace,
			phone: list.phone

		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//搜索医生
export function getDoctorByTel(list){
	const url = baseURI + '/mkkMoblie/patient/getDoctorByTel'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			doctorTel:list.doctorTel,
            token: list.token,
			patientId: list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//与医生建立连接
export function relation(list){
	const url = baseURI + '/mkkMoblie/patient/relation'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			doctorId:list.doctorId,
            token: list.token,
			patientId: list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//我的医生
export function doctorList(list){
	const url = baseURI + '/mkkMoblie/patientSupply/doctorList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token,
			patientId: list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//找医生
export function sectionList(list){
	const url = baseURI + '/mkkMoblie/doctorDataList/sectionList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//收货地址
export function addressList(list){
	const url = baseURI + '/mkkMoblie/patientSupply/addressList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			patientId:list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//我的信息
export function findPatient(list){
	const url = baseURI + '/mkkMoblie/patient/findPatient'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			patientId:list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//保存我的信息
export function patientUpdInfo(list){
	const url = baseURI + '/mkkMoblie/patient/patientUpdInfo'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId: list.patientId,
			patientName: list.patientName,
			patientSex: list.patientSex,
			age: list.age,
			phone: list.phone,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取验证码
export function patientUpdPhoneNum(list){
	const url = baseURI + '/mkkMoblie/number/patientUpdPhoneNum'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			phone: list.phone,
			patientId:list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//修改手机号
export function patientUpdPhone(list){
	const url = baseURI + '/mkkMoblie/patient/patientUpdPhone'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			phone: list.phone,
			patientId:list.patientId,
			newphone: list.Nphone,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//健康档案
export function selectByIdArchives(list){
	const url = baseURI + '/mkkMoblie/archives/selectByIdArchives'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId:list.patientId,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//健康档案信息
export function selectById(list){
	const url = baseURI + '/mkkMoblie/archives/selectById'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			id:list.id,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//删除健康档案信息
export function deleteArchives(list){
	const url = baseURI + '/mkkMoblie/archives/deleteArchives'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			id:list.id,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}

//添加健康档案信息
export function insertArchives(list){
	const url = baseURI + '/mkkMoblie/archives/insertArchives'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			patientId: list.patientId,
			id: list.id,
			relationship: list.relationship,
			archivesName: list.archivesName,
			gender: list.gender,
			age: list.age,
			birthDate: list.birthDate,
			height: list.height,
			weight:list.weight,
			bmi: list.bmi,
			waist: list.waist,
			smoke: list.smoke,
			wine: list.wine,
			liver: list.liver,
			kidney: list.kidney,
			marriage: list.marriage,
			birth: list.birth,
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//文章详情
export function findArticleOne(list){
	const url = baseURI + '/mkkMoblie/doctorSupplyTwo/findArticleOne'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			articleId:list.articleId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//医生详情
export function doctorDetails(list){
	const url = baseURI + '/mkkMoblie/patientSupply/doctorDetails'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId:list.patientId,
			token: list.token,
			doctorId:list.doctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//答谢医生礼物列表
export function giftList(list){
	const url = baseURI + '/mkkMoblie/patientSupply/giftList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId:list.patientId,
			token: list.token,
			doctorId:list.doctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//答谢医生礼物列表
export function savePresentOrder(list){
	const url = baseURI + '/mkkMoblie/payOrder/savePresentOrder'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			appid: list.appid,
			doctorId: list.doctorId,
			mch_id: list.mch_id,
			patientId: list.patientId,
			givingId: list.givingId,
			price: list.price
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取open ID
export function getOpenId(list){
	const url = baseURI + '/mkkMoblie/saleMan/getOpenId'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			code: list.code,
			appid:list.appid,
			secret:list.secret
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//患者登录接口
export function addLogin(list){
	const url = baseURI + '/mkkMoblie/patient/addLogin'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			openId: list.openId,
			nick:list.nick,
			imgUrl:list.imgUrl,
			doctorId:list.doctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//关联用户存储
export function saveMsgPatient(list){
	const url = baseURI + '/mkkMoblie/sendMsg/saveMsgPatient'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId: list.patientId,
			openId:list.openId,
			unionId:list.unionId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取open ID
export function openIdMsg(list){
	const url = baseURI + '/mkkMoblie/accessToken/openIdMsg'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			type: list.type,
			token:list.token,
			id:list.id,
			uri:list.uri
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//添加慢性病
export function insertChronicDisease(list){
	const url = baseURI + '/mkkMoblie/chronicDisease/insertChronicDisease'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			archivesId: list.archivesId,
			token:list.token,
			chronicName:list.chronicName
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取慢性病
export function selectByIdChronicDisease(list){
	const url = baseURI + '/mkkMoblie/chronicDisease/selectByIdChronicDisease'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			archivesId: list.archivesId,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//删除慢性病
export function deleteChronicDisease(list){
	const url = baseURI + '/mkkMoblie/chronicDisease/deleteChronicDisease'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			id: list.id,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//添加既往病史
export function saveSick(list){
	const url = baseURI + '/mkkMoblie/patientSupply/saveSick'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId: list.patientId,
			token:list.token,
			sickName:list.sickName
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取既往病史
export function sickList(list){
	const url = baseURI + '/mkkMoblie/patientSupply/sickList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId: list.patientId,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//删除既往病史
export function deleteSick(list){
	const url = baseURI + '/mkkMoblie/patientSupply/deleteSick'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			sickId: list.sickId,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//添加过敏史
export function saveAllergic(list){
	const url = baseURI + '/mkkMoblie/patientSupply/saveAllergic'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId: list.patientId,
			token:list.token,
			allergicName:list.sickName
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取过敏史
export function allergicList(list){
	const url = baseURI + '/mkkMoblie/patientSupply/allergicList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId: list.patientId,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//删除过敏史
export function deleteAllergic(list){
	const url = baseURI + '/mkkMoblie/patientSupply/deleteAllergic'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			allergicId: list.sickId,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//添加家族病史
export function insertArchivesAttribute(list){
	const url = baseURI + '/mkkMoblie/archivesAttribute/insertArchivesAttribute'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			archivesId: list.patientId,
			token:list.token,
			name:list.sickName
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取家族病史
export function selectByIdArchivesAttribute(list){
	const url = baseURI + '/mkkMoblie/archivesAttribute/selectByIdArchivesAttribute'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			archivesId: list.patientId,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//删除家族病史
export function deleteArchivesAttribute(list){
	const url = baseURI + '/mkkMoblie/archivesAttribute/deleteArchivesAttribute'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			id: list.sickId,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//热门疾病
export function findDoctorBySubject(list){
	const url = baseURI + '/mkkMoblie/doctor/findDoctorBySubject'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({

		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//推荐医生
export function findDoctorHot(list){
	const url = baseURI + '/mkkMoblie/doctor/findDoctorHot'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			patientId: list.patientId,
			token:list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//患者完善信息
export function patientAddInfo(list){
	const url = baseURI + '/mkkMoblie/patient/patientAddInfo'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			openId: list.openId,
			patientName: list.patientName,
			patientSex: list.patientSex,
			age: list.age,
			nick: list.nick,
			phone: list.phone,
			imgUrl: list.imgUrl,
			doctorId: list.doctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//发送小程序消息提醒
export function sendMsg7 (list){
	const url = baseURI + '/mkkMoblie/sendMsg/sendMsg7'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            json: list.json,
			d1: list.d1,
			d2: list.d2,
			d3: list.d3,
			d4: list.d4,
			d5: list.d5,
			d6: list.d6,
			type:list.type,
			path: list.path,
			appid: list.appid,
			url:list.url
		})).then((res)=>{
			resolve(res.data)
		})
	})
}

//患者端咨询页面 =>找医生api
export function findChatDoctor(list) {
	const url = baseURI + '/mkkMoblie/patientDoctorGroups/findChatDoctor'
  
	return new Promise((resolve, reject) => {
	  axios.post(url, qs.stringify({
		patientId: list.patientId,
		token: list.token
	  })).then((res) => {
		resolve(res.data)
	  })
	})
  }