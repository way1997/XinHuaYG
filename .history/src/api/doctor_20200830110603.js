import axios from 'axios'

import baseURI from 'api/env'

let qs = require('qs')
//登录首页信息获取
export function homePage(list){
	const url = baseURI + '/mkkMoblie/doctorSupplyTwo/homePage'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//候诊区列表
export function findWaitDoctor(list){
	const url = baseURI + '/mkkMoblie/doctor/findWaitDoctor'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//处方列表
export function doctorSelAllPrescription(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorSelAllPrescription'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//已支付处方列表
export function doctorSelPayPrescription(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorSelPayPrescription'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//已支付处方详情
export function findPayPrescription(list){
	const url = baseURI + '/mkkMoblie/prescription/findPayPrescription'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            prescriptionId: list.prescriptionId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//患者列表
export function doctorChoosepri(list){
	const url = baseURI + '/mkkMoblie/doctorSupply/doctorChoosepri'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//手机号关联患者
export function findPatientByTel(list){
	const url = baseURI + '/mkkMoblie/prescription/findPatientByTel'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
             token: list.token,
            tel:list.tel
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//拍照开方列表
export function findPhotoPrescription(list){
	const url = baseURI + '/mkkMoblie/doctor/findPhotoPrescription'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//拍照药方详情
export function findPhotoPrescriptionDetails(list){
	const url = baseURI + '/mkkMoblie/doctor/findPhotoPrescriptionDetails'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            prescriptionId: list.prescriptionId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//发送给患者
export function updateSendStatus(list){
	const url = baseURI + '/mkkMoblie/doctor/updateSendStatus'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            prescriptionId: list.prescriptionId,
            token: list.token,
			sendStatus:list.sendStatus
		})).then((res)=>{
			resolve(res.data)
		})
	})
}

//服药禁忌
export function taboo(list){
	const url = baseURI + '/mkkMoblie/doctorSupply/taboo'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//添加药品判断禁忌
export function tabooType(list){
	const url = baseURI + '/mkkMoblie/tabooDrugs/tabooType'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            token: list.token,
			medicineName:list.medicineName,
			json:list.json
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//诊金列表
export function priceList(list){
	const url = baseURI + '//mkkMoblie/doctorDataList/priceList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//药方类型
export function prescriptionType(list){
	const url = baseURI + '/mkkMoblie/doctorIncentive/prescriptionType'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//药态品牌
export function findBrandList(list){
	const url = baseURI + '/mkkMoblie/drugStorage/findBrandList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId:list.doctorId,
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//药态类型
export function modelType(list){
	const url = baseURI + '/mkkMoblie/modelPrescription/modelType'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
             token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//药方模板
export function findModelByShape(list){
	const url = baseURI + '/mkkMoblie/modelPrescription/findModelByShape'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
            shapeId: list.shapeId,
            token: list.token,
            type: list.type,
			brandId:list.brandId,
			modelName:list.modelName
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//生成药方
export function linePrescription(list){
	const url = baseURI + '/mkkMoblie/prescription/linePrescription'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
            token: list.token,
            patientId: list.patientId, //患者信息
            patientName: list.patientName, //患者姓名
            patientAge: list.patientAge, //患者年龄
            patientSex: list.patientSex, //性别
            sickName: list.sickName, //辩证
            medicineType: list.medicineType, //药方类型
            shapeId: list.shapeId, //药态
            json: list.json, //药材
            preNum: list.preNum, //多少剂
            preOnce: list.preOnce, //每剂多少服
            dayNum: list.dayNum, //每日多少次
            serviceCharge: 0, //治疗服务费
            diagnoseMoney: list.diagnoseMoney, //诊金
            isPayLook: list.isPayLook, //购买前是否可查看药方
            taboo: list.taboo, //服药禁忌
            preEnjoin: list.preEnjoin, //医嘱
            isModel: list.isModel, //是否保存模板
            modelName: list.modelName, //模板名
            isAgent: list.isAgent, //是否待煎
            countPrice: list.countPrice, //总价
            modelPreId: list.modelPreId, //模板ID
            brandId:list.brandId  //品牌ID
		})).then((res)=>{
			resolve(res.data)
		})
	})
}

//保存拍照开方
export function saveOnlinePrescribing(list){
	const url = baseURI + '/mkkMoblie/onlinePrescribing/saveOnlinePrescribing'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
            token: list.token,
            patientId: list.patientId, //患者信息
            patientName: list.patientName, //患者姓名
            patientAge: list.patientAge, //患者年龄
            patientSex: list.patientSex, //性别
            medicineType: list.medicineType, //药方类型
            shapeId: list.shapeId, //药态
            serviceCharge: 0, //治疗服务费
            diagnoseMoney: list.diagnoseMoney, //诊金
            isPayLook: list.isPayLook, //购买前是否可查看药方
            taboo: list.taboo, //服药禁忌
            preEnjoin: list.preEnjoin, //医嘱
            isAgent: list.isAgent, //是否待煎
            countPrice: list.countPrice, //总价
            photo1: list.photo1,//照片路径
            brandId:list.brandId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//我的礼物
export function giftList(list){
	const url = baseURI + '/mkkMoblie/doctorSupply/giftList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
            token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//编辑资料
export function doctorPreviewAllInformation(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorPreviewAllInformation'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
            token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//简介
export function doctorEditorIntroduction(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorEditorIntroduction'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
			token: list.token,
			remarks:list.remarks
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//编辑疾病
export function beGoodList(list){
	const url = baseURI + '/mkkMoblie/doctorDataList/beGoodList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//保存编辑疾病
export function doctorEditorGoodAtMedical(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorEditorGoodAtMedical'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId,
			json:list.json
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//在线与否
export function updateDoctorOnstatus(list){
	const url = baseURI + '/mkkMoblie/doctorOperation/updateDoctorOnstatus'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId,
			doctorStatus:list.doctorStatus
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//可见列表
export function lookPullBlack(list){
	const url = baseURI + '/mkkMoblie/patientDoctorGroups/lookPullBlack'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//取消不可见
export function cancelPullBlack(list){
	const url = baseURI + '/mkkMoblie/patientDoctorGroups/cancelPullBlack'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId,
			patientDoctorId:list.patientDoctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//修改密码获取验证码
export function doctorUpdPwdNum(list){
	const url = baseURI + '/mkkMoblie/number/doctorUpdPwdNum'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			phone: list.phone
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//修改密码
export function doctorResetPassword(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorResetPassword'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			phone: list.phone,
			yzm:list.yzm,
			passWord: list.passWord,
			newPassWord: list.newPassWord,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//修改密码 新
export function doctorUpdPassword(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorUpdPassword'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			passWord: list.passWord,
			newPassWord:list.newPassWord,
			newPassWord2: list.newPassWord2,
			doctorId: list.doctorId,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//重置账户
export function delOpenId(list){
	const url = baseURI + '/mkkMoblie/accessToken/delOpenId'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			tel: list.tel,
			token: list.token,
			type: list.type
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//通讯录
export function findAllPatient(list){
	const url = baseURI + '/mkkMoblie/patientDoctorGroups/findAllPatient'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//搜索通讯录
export function findPatient(list){
	const url = baseURI + '/mkkMoblie/patientDoctorGroups/findPatient'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId,
			groupId:list.groupId,
			data:list.data
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//搜索药材
export function doctorSelAllDrug(list){
	const url = baseURI + '/mkkMoblie/drugStorage/doctorSelAllDrug'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			type: list.type,
			data: list.data,
			doctorId: list.doctorId,
			shapId: list.shapId,
			brandId:list.brandId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//我的积分
export function doctorIntegralMsg(list){
	const url = baseURI + '/mkkMoblie/doctorAccount/doctorIntegralMsg'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//患者档案
export function patientArchives(list){
	const url = baseURI + '/mkkMoblie/doctorSupply/patientArchives'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId,
			patientId:list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//邀请患者
export function doctorInvitePatients(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorInvitePatients'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			doctorId: list.doctorId,
			sendurl:list.sendurl
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//拉黑患者
export function pullBlack(list){
	const url = baseURI + '/mkkMoblie/patientDoctorGroups/pullBlack'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			token: list.token,
			patientDoctorId: list.patientDoctorId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//撤销处方
export function doctorDelPatientPlan(list){
	const url = baseURI + '/mkkMoblie/doctorSupply/doctorDelPatientPlan'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			doctorId: list.doctorId,
			patientId: list.patientId,
			token: list.token,
			prescriptionId: list.prescriptionId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//编辑备注
export function updateRemarks(list){
	const url = baseURI + '/mkkMoblie/doctorSupply/updateRemarks'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			remarks: list.remarks,
			patientDoctorId: list.patientDoctorId,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//查看处方
export function doctorFindPatientPlan(list){
	const url = baseURI + '/mkkMoblie/doctorSupply/doctorFindPatientPlan'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			doctorId: list.doctorId,
			token: list.token,
			patientId: list.patientId,
			prescriptionId: list.prescriptionId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//咨询页面待购药列表
export function purchaseList(list){
	const url = baseURI + '/mkkMoblie/doctorOperation/purchaseList'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			doctorId: list.doctorId,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//咨询页面患者消息列表
export function findChatPatient(list){
	const url = baseURI + '/mkkMoblie/patientDoctorGroups/findChatPatient'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			doctorId: list.doctorId,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//注册协议
export function findArticle(list){
	const url = baseURI + '/mkkMoblie/legalArticle/findArticle'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			type: list.type
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取登录验证码
export function doctorLoginNum(list){
	const url = baseURI + '/mkkMoblie/number/doctorLoginNum'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			phone: list.phone
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//获取注册验证码
export function doctorRegisteredNum(list){
	const url = baseURI + '/mkkMoblie/number/doctorRegisteredNum'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			phone: list.phone
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//密码登录
export function doctorLogin(list){
	const url = baseURI + '/mkkMoblie/doctor/doctorLogin'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			phone: list.phone,
			passWord:list.passWord,
			yzm:list.yzm,
			loginType:list.loginType
		})).then((res)=>{
			resolve(res.data)
		})
	})
}

//密码登录保存信息
export function saveMsg(list){
	const url = baseURI + '/mkkMoblie/sendMsg/saveMsg'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			doctorId: list.doctorId,
			openId:list.openId,
			unionId:list.unionId
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
//选择医疗机构
export function getHospital (list){
	const url = baseURI + '/mkkMoblie/area/getHospital'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            parentId: list.parentId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//注册
export function doctorRegister (list){
	const url = baseURI + '/mkkMoblie/doctor/doctorRegister'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorName: list.doctorName,
			phone: list.phone,
			yzm: list.yzm,
			hospitalId: list.hospitalId,
			code: list.code,
			appid:list.appid,
			secret:list.secret
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//聊天
export function findPatientMsg (list){
	const url = baseURI + '/mkkMoblie/patientSupply/findPatientMsg'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            patientId: list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//聊天内容
export function getChatContent (list){
	const url = baseURI + '/mkkMoblie/chat/getChatContent'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
			token: list.token,
			patientId: list.patientId,
			version: list.version
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//选择聊天文章
export function myArticle (list){
	const url = baseURI + '/mkkMoblie/doctorSupplyTwo/myArticle'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
			token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//发送聊天内容
export function addChatContent (list){
	const url = baseURI + '/mkkMoblie/chat/addChatContent'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            version: list.version,
			token: list.token,
			chatId: list.chatId,
			chatType: list.chatType, //文字类型
			chartComment: list.chartComment,
			chatPics: list.chatPics,
			chatVoices: list.chatVoices,
			chatRoute1:list.chatRoute1
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//发送小程序消息提醒
export function sendMsg6 (list){
	const url = baseURI + '/mkkMoblie/sendMsg/sendMsg6'

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
//提醒购药
export function remindPurchase (list){
	const url = baseURI + '/mkkMoblie/doctorOperation/remindPurchase'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
        	token: list.token,
        	patientId: list.patientId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//模板 新
export function findBrandAndModel (list){
	const url = baseURI + '/mkkMoblie/drugStorage/findBrandAndModel'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
        	token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//删除模板
export function deleteModel (list){
	const url = baseURI + '/mkkMoblie/modelPrescription/deleteModel'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            modelId: list.modelId,
        	token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//查找模板
export function lookModel (list){
	const url = baseURI + '/mkkMoblie/modelPrescription/lookModel'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            modelId: list.modelId,
        	token: list.token
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//更新头像
export function updatePortrait (list){
	const url = baseURI + '/mkkMoblie/doctor/updatePortrait'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
			token: list.token,
			doctorPhoto:list.doctorPhoto
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//新建模板
export function saveModel (list){
	const url = baseURI + '/mkkMoblie/modelPrescription/saveModel'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
            doctorId: list.doctorId,
			token: list.token,
			modelId: list.modelId,
			modelName: list.modelName,
			preType: list.preType,
			json: list.json,
			shapeId: list.shapeId,
			modelType:list.modelType,
			brandId:list.brandId
		})).then((res)=>{
			resolve(res.data)
		})
	})
}
//语音congig授权
export function getWxConfig (list){
	const url = baseURI + '/mkkMoblie/accessToken/getWxConfig'

	return new Promise((resolve,reject) =>{
		axios.post(url,qs.stringify({
			url:list.url
		})).then((res)=>{
			resolve(res.data)
		})
	})
}

//认证-------------------
  //地区查省
export function  regionSlec(){
  const url = baseURI + '/mkkMoblie/area/getProvince'
  return new Promise((resolve,reject) =>{
		axios.get(url).then((res)=>{
			resolve(res.data)
		})
	})
}
  ////省查市
export function  shengSlec(list){
    const url = baseURI + '/mkkMoblie/area/getCity'
    return new Promise((resolve,reject) =>{
      axios.post(url,qs.stringify({
        parentId:list.parentId
      })).then((res)=>{
        resolve(res.data)
      })
    })
  }
  //市查区县
 export function  shiSlec(list){
    const url = baseURI + '/mkkMoblie/area/getArea'
    return new Promise((resolve,reject) =>{
      axios.post(url,qs.stringify({
        parentId:list.parentId
      })).then((res)=>{
        resolve(res.data)
      })
    })
  }
  // 显示当前区医疗机构
export function  yljgQShow(list){
    const url = baseURI + '/mkkMoblie/area/getHospital'
    return new Promise((resolve,reject) =>{
      axios.post(url,qs.stringify({
        parentId:list.parentId
      })).then((res)=>{
        resolve(res.data)
      })
    })
  }
