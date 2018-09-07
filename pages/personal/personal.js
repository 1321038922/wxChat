// pages/personal/personal.js
import {
   fetch,
   login
} from '../../utils/util.js'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      userInfo:{},
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad(options) {
      this.getData();
      this.getReadnum();
      wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
               let userImg = res.userInfo.avatarUrl
               return userImg;
            }
          })
        }else{
           wx.authorize({
              scope: 'scope.record',
           })
        }
      }
    })
  },

   getData(){
      fetch.get(`/collection/total`).then(res => {
         console.log(res)
         this.setData({
            collectNum: res.data
         })
      })
   },
   getReadnum(){
      fetch.get(`/readList`).then(res => {
         this.setData({
            Readnum: res.data.length
         })
      })
   },
   handlecollect(){
      wx.navigateTo({
         url: '/pages/collectmain/collectmain',
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
      this.getData();
      this.getReadnum();
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

   }
})