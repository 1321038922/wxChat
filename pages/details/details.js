// pages/details/details.js

import {
   fetch
} from '../../utils/util.js'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      bookId: "",
      bookData: {},
      isLoading: false,
      isCollect:""
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      this.setData({
         bookId: options.id
      })
      this.getDate();
   },
   getDate() {
      this.setData({
         isLoading: true
      })
      fetch.get(`/book/${this.data.bookId}`).then(res => {
         this.setData({
            isLoading: false,
            bookData: res
         })
      }).catch(err => {
         this.setData({
            isLoading: false
         })
      })
   },
   handleCollect(){
      fetch.post(`/collection`,{bookId:this.data.bookId}).then(res=>{
        if(res.code == 200){
           wx.showToast({
              title: '收藏成功',
              type:'success',
              duration:1000
           })
           let bookData = {...this.data.bookData}
           bookData.isCollect = 1
           this.setData({
              bookData:bookData
           })
        }
      })
   },
   toCatalog() {
      wx.navigateTo({
         url: `/pages/catalog/catalog?id=${this.data.bookId}`,
      })
   },

   /**          
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function() {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function() {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {
      return {
         title: this.data.bookData.data.title,
         path: `/page/details/details?id=${this.data.bookId}`,
         imageUrl: this.data.bookData.data.img
      }
   }
})