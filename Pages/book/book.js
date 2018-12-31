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
      console.log(res)
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
  onShareAppMessage() {}
});
