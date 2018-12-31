// pages/book/book.js
import { BookModel } from "../../models/book.js";
import { random } from "../../util/util.js";

let bookModel = new BookModel();

Page({
  data: {
    searchPanel: false,
    books: Object,
    /* 加载更多 */
    more: false
  },
  onReachBottom: function() {
    this.setData({
      /* 下拉加载, random() 保证 more 的值是变化的 */
      more: random(16)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookModel.getHotList().then(res => {
      this.setData({
        books: res
      });
    });
  },
  onActivateSearch: function() {
    this.setData({
      searchPanel: true
    });
  },
  onCancel: function() {
    this.setData({
      searchPanel: false
    });
  },
  /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
