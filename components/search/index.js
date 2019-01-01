// components/search/index.js

import { KeywordModel } from "../../models/keyword.js";

const KeyWordModel = new KeywordModel();

Component({
  // 启用多 slot 支持
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: ""
  },

  attached: function() {
    const historyWords = KeyWordModel.getHistory();
    const hotWords = KeyWordModel.getHot();
    this.setData({
      historyWords: historyWords
    });

    hotWords.then(res => {
      this.setData({
        hotWords: res.hot
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭搜索
    onCancel(event) {
      this.triggerEvent("cancel", {}, {});
    },
    // 点击或回车后行为
    onConfirm(event) {
      this.setData({
        searching: true
      });
      // 加入缓存
      // const word = event.detail.value;
      // KeyWordModel.addToHistory(word);

      // 监听后去服务器请求数据
      const q = event.detail.value || event.detail.text;
      KeyWordModel.search(0, q).then(res => {
        this.setData({
          dataArray: res.books,
          q: q
        });

        // 修改后，当服务器返回数据后，认为用户输入有效，有返回结果，再写入缓存中
        KeyWordModel.addToHistory(q);
      });
    },

    // 清空搜索
    onDelete(event) {
      this.setData({
        searching: false,
        dataArray: [],
        q: ""
      });
    }
  }
});
