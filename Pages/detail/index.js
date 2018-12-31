// pages/detail/index.js

import { BookModel } from "../../models/book.js";
import { LikeModel } from "../../models/like.js";

const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: "正在加载",
      icon: "none"
    });

    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComment(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    Promise.all([detail, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      });
      wx.hideLoading();
    });
  },

  // 喜欢书籍
  onLike: function(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.book.id, 400);
  },

  // 输入短评
  onFakePost: function(event) {
    this.setData({
      posting: true
    });
  },
  // 关闭短评页面
  onCancel: function(event) {
    this.setData({
      posting: false
    });
  },
  // 点击提交短评
  onPost: function(event) {
    const comment = event.detail.text || event.detail.value;

    if (!comment) {
      return;
    }

    if (comment.length > 12) {
      wx.showToast({
        title: "短评最多12个字",
        icon: "none"
      });
      return;
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: "+1",
        icon: "none"
      });

      this.data.comments.unshift({
        content: comment,
        nums: 1
      });

      // 更新短评
      this.setData({
        comments: this.data.comments,
        // 点击完成页面关闭
        posting: false
      });
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
