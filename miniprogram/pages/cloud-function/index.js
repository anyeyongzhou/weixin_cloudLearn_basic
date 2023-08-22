// pages/cloud-function/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filePath:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    async onTestTap(){
        const res = await wx.cloud.callFunction({
            name:"test"
        })
        console.log(res)
    },

    async onSumTap(){
        const num1=20
        const num2=30

        const res=await wx.cloud.callFunction({
            name:"sum",
            data:{
                num1,
                num2
            }
        })
        console.log(res.result)
    },

    async onGetOpenid(){
        const res=await wx.cloud.callFunction({
            name:"fetchopenid"
        })

        console.log(res.result.openid)
    },

    async onGetLOLData(){
        const res =await wx.cloud.callFunction({
            name:"getLOLData"
        })
        console.log(res.result.data)
    },

    async onFetchServerData(){
        const res=await wx.cloud.callFunction({
            name:"fetchHome"
        })

        console.log(res)

    },

    async onMiniCode(){
        const res =await wx.cloud.callFunction({
            name:"getCode"
        })

        console.log(res)
        this.setData({
            filePath:res.result.fileID
        })
    },
})