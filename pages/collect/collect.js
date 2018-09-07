// pages/collect/collect.js
import {
   fetch
} from '../../utils/util.js'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      bookReadList: [],
      hasMore: false,
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad(options) {
      this.getDate();
   },
   getDate() {
      fetch.get(`/readList`).then(res => {
         let arr = [...res.data]
         arr = arr.map(item =>{
            item.title.percent= Math.round((item.title.index/item.title.total)*100)
            return item
         })
         this.setData({
            hasMore:false,
            bookReadList: arr
         })
      }).catch(err => {
         console.log(err)
      })
   },
   handleMain(event){
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
         url: `/pages/details/details?id=${id}`,
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
      this.getDate();
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
      this.getDate()
      wx.stopPullDownRefresh();
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
      this.getDate()
      this.setData({
         hasMore: true
      })
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
})