// pages/cloud-database/index.js

const db=wx.cloud.database()
const _=db.command

const stuCollection=db.collection("students")
const lolCollection=db.collection("LOL")

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

    onAddDataTap(){
        stuCollection.add({
            data:{
                name:"why",
                age:30,
                address:{
                    name:"落砂机11",
                    code:1111,
                    alias:"lsj"
                },
                hobbies:["篮球","足球","橄榄球"]
            }
        }).then(res=>{
            console.log(res)
        })
    },

    onDelDataTap(){
        //删除一条数据
        // stuCollection.doc("e4e53e4164e178ba01b8a8b4699799f1").remove().then(res=>{
        //     console.log(res)
        // })

        //根据条件删除
        stuCollection.where({
            age:_.gt(26)
        }).remove().then(res=>{
            console.log(res)
        })

    },

    onUpdateDataTap(){
        //更新一个字段
        // stuCollection.doc("366ab55464e1eca000095fad5885ac9a").update({
        //     data:{
        //         age:30
        //     }
        // }).then(res=>{
        //     console.log(res)
        // })

        //替换原来的对象
        // stuCollection.doc("366ab55464e1eca000095fad5885ac9a").set({
        //     data:{
        //         age:31
        //     }
        // }).then(res=>{
        //     console.log(res)
        // })

        //更新多条数据
        stuCollection.where({
            age:_.gt(26)
        }).update({
            data:{
                "address.name":"洛杉矶"
            }
        }).then(res=>{
            console.log(res)
        })


    },

    onSelectDataTap(){
        //根据id查询
        // lolCollection.doc("e4e53e4164e2115801c54a48154a4647").get().then(res=>{
        //     console.log(res.data.item)
        // })

        //根据条件查询
        // lolCollection.where({
        //     "item.nickname":"电棍"
        // }).get().then(res=>{
        //     console.log(res)
        // })

        //通过指令过滤数据
        // lolCollection.where({
        //     "item.rid":_.lte(500000)
        // }).get().then(res=>{
        //     console.log(res)
        // })

        //通过正则表达式查询（模糊查询）
        // lolCollection.where({
        //     "item.nickname":db.RegExp({
        //         regexp:"z",
        //         options:"i"
        //     })
        // }).get().then(res=>{
        //     console.log(res)
        // })

        //获取整个集合的数据（小程序20条，云函数100条）
        // lolCollection.get().then(res=>{
        //     console.log(res)
        // })

        //分页skip(offset)/limit(size)
        // let page=1
        // let pageSize=5
        // lolCollection.skip(page*pageSize).limit(pageSize).get().then(res=>{
        //     console.log(res)
        // })

        //排序orderBy("rid")
        let page=1
        let pageSize=5
        // lolCollection.skip(page*pageSize).limit(pageSize).orderBy("rid","asc").get().then(res=>{
        //     console.log(res)
        // })
        lolCollection.field({
            _id:true,
            "item.hn":true,
            "item.nickname":true,
            "item.roomName":true,
            "item.rid":true
        }).skip(page*pageSize).limit(pageSize).orderBy("rid","asc").get().then(res=>{
            console.log(res)
        })


    },

    onAddLOLDataTap(){
        //获取斗鱼数据
        for(let i=0;i<10;i++){
            const res=wx.request({
                url: 'https://m.douyu.com/api/room/list',
                data:{
                    page:i+1,
                    type:"LOL"
                },
                success:res=>{
                    //console.log(res)
                    const list=res.data.data.list
                    this.handleLOLList(list)
                    
                }
              })
        }
    },

    handleLOLList(list){
        for(const item of list){
            lolCollection.add({
                data:{
                    item
                }
            }).then(res=>{
                console.log("item插入成功",item.nickname)
            })
        }
    },

    onShowLOLDataTap(){
        wx.navigateTo({
          url: '/pages/lol-live/index',
        })
    },
})