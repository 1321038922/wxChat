// pages/book/book.js
import { fetch } from '../../utils/util.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
     titeId:"",
     article:{},
     title:"",
     bookId:"",
     catalog:[],
     isShow:false,
     isLoading:false,
     font:40,
     index:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options)
     this.setData({
        titleId:options.id,
        bookId:options.bookId
     })
     this.getData()
     this.getCatalog()
  },
  getData(){
     this.setData({
        isLoading:true,
        isShow:false
     })
     fetch.get(`/article/${this.data.titleId}`).then(res=>{
        console.log(res)
        this.setData({
           isLoading:false,
           article: res.data.article.content,
           title:res.data.title,
           index:res.data.article.index
        })
     }).catch(err => {
        setData({
           isLoading: false
        })
     })
  },
  getCatalog(){
   fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
         catalog: res.data
      })
   })
},
toggleCatalog(){
   let isShow = !this.data.isShow
   this.setData({
      isShow
   })
},
handleGet(event){
   const id = event.currentTarget.dataset.id
   console.log(id)
   this.setData({
      titleId:id,
      isShow:false
   })
   this.getData()
},
// 上一张
handlePrev(){
   let catalog =this.data.catalog
   if(this.data.index -1 < 0){
      wx.showToast({
         title: '别翻了，到头了',
      })
   }else {
      this.setData({
         titleId:catalog[this.data.index -1]._id
      })
      this.getData()
   }
},
handleNext(){
   let catalog = this.data.catalog
   if(catalog[this.data.index + 1]){
      this.setData({
         titleId:catalog[this.data.index +1]._id
      })
      this.getData()
   }else{
      wx.showToast({
         title: '没有了',
      })
   }
},
fontUp(){
   if (this.data.font >= 56){
      wx.showToast({
         title: '已经最大了',
      })    
   }else{
      this.setData({
         font: this.data.font + 2
      })
   }
},
fontDown(){
   if (this.data.font <= 28){
      wx.showModal({
         title: "提示",
         content: "字体太小影响视力哦",
         showCancel: false
      })
   }else{
      this.setData({
         font: this.data.font - 2
      })
   }
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})