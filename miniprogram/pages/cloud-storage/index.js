// pages/cloud-storage/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    
    async onUploadTap(){
        const res=await wx.chooseMedia({
            type:"image"
        })

        console.log(res)
        const imagePath=res.tempFiles[0].tempFilePath

        const timestamp=new Date().getTime()
        const openid="open_xx"
        const extension=imagePath.split(".").pop()
        const imageName=`${timestamp}_${openid}.${extension}`

        const uploadRes= wx.cloud.uploadFile({
            filePath:imagePath,//本地的文件路径
            cloudPath:"nba/"+imageName//上传到云端的文件路径
        })

        console.log(uploadRes)
    },

    async onDownloadTap(){
        const res=await wx.cloud.downloadFile({
            fileID:"cloud://cloud1-9gm2w5hvbbaff6e6.636c-cloud1-9gm2w5hvbbaff6e6-1320280133/nba/1692587595084_open_xx.png"
        })
        console.log(res)
        this.setData({
            tempFilePath:res.tempFilePath
        })
    },

    async onDelTap(){
        const res=await wx.cloud.deleteFile({
            fileList:["cloud://cloud1-9gm2w5hvbbaff6e6.636c-cloud1-9gm2w5hvbbaff6e6-1320280133/nba/1692587595084_open_xx.png"]
        })
        console.log(res)
    },

    async onTempTap(){
        const res=await wx.cloud.getTempFileURL({
            fileList:[
            "cloud://cloud1-9gm2w5hvbbaff6e6.636c-cloud1-9gm2w5hvbbaff6e6-1320280133/1692587539955_open_xx.png",
            "cloud://cloud1-9gm2w5hvbbaff6e6.636c-cloud1-9gm2w5hvbbaff6e6-1320280133/1692587554786_open_xx.png"
            ]
        })
        console.log(res)
    },
})