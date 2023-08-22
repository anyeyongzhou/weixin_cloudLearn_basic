// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const res=await cloud.openapi.wxacode.createQRCode({
        width:320,
        path:"pages/cloud-database/index"
    })

    const wxContent=cloud.getWXContext()
    const timestamp=new Date().getTime()
    const openid=wxContent.OPENID
    const extension=res.contentType
    const cloudPath=`${timestamp}_${openid}_${extension}`
    //获取到数据，上传到云存储
    const qrCodeRes=cloud.uploadFile({
        fileContent:res.buffer,
        cloudPath
    })
    return qrCodeRes
}