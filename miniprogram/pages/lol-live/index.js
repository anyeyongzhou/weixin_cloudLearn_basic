// pages/lol-live/index.js
const db=wx.cloud.database()
const lolCol=db.collection("LOL")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lolList:[],
        offset:0,
        size:10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.fetchLOLData()
    },

    fetchLOLData(){
        lolCol.skip(this.data.offset).limit(this.data.size).get().then(res=>{
            //console.log(res.data)
            const newLolList=[...this.data.lolList,...res.data]
            this.setData({lolList:newLolList})
            this.data.offset=this.data.lolList.length
        })
    },

    onItemDelTap(event){
        const {item,index}=event.currentTarget.dataset
        //console.log(item,index)
        lolCol.doc(item._id).remove().then(res=>{
           if(res){
               this.setData({
                   lolList:[],
                   offset:0
               })
               this.fetchLOLData()
           }
        })
    },

    onItemChangeTap(){

    },

    onReachBottom(){
        this.fetchLOLData()
    }

})