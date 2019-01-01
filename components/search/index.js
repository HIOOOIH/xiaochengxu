// components/search/index.js

import { HTTP } from "../../util/http-p.js";
import { KeywordModel } from "../../models/keyword.js";
import { paginationBev } from "../behaviors/pagination.js";

const http = new HTTP()
const KeyWordModel = new KeywordModel();

Component({
  behaviors:[paginationBev],
  // 启用多 slot 支持
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer:'_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    //dataArray: [],
    //searching: false,
    finished:false,
    loading:false,
    loadingCenter:false,
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
    _loadMore:function(){
      if(!this.data.q){
        return
      }
      let hasMore = this.hasMore()
      if(!hasMore){
        return
      }

      this.setData({
        loading:true
      })
      http.request({
        url:'book/search?summary=1',
        data:{
          q:this.data.q,
          start:this.getCurrentStart()
        },
        success:(data)=>{
          this.setMoreData(data.books)
          this.setData({
            loading:false
          })
        }
      })
    },

    // 关闭搜索
    onCancel(event) {
      this.triggerEvent("cancel", {}, {});
    },

    // 清空搜索
    onDelete(event) {
      this.setData({
        finished: false,
        //dataArray: [],
        empty:false,
        q: ""
      });
    },

    // 点击或回车后行为
    onConfirm(event) {
      // 首先切换状态，保持客户端流畅
      this.setData({
        finished: true,
        loadingCenter:true
      });
      
      this.initPagination()

      // 监听后去服务器请求数据
      const q = event.detail.value || event.detail.text;

      http.request({
        url:'book/search?summary=1',
        data:{
          q:q,
          start:this.getCurrentStart()
        },
        success:(data)=>{
          if(!(data.books==false)){
            KeyWordModel.addToHistory(q)
          }
          this.setMoreData(data.books)
          this.setData({
            q:q,
            loadingCenter:false
          })
        }
      })

      // KeyWordModel.search(0, q).then(res => {
      //   this.setData({
      //     dataArray: res.books,
      //     q: q
      //   });

      //   // 修改后，当服务器返回数据后，认为用户输入有效，有返回结果，再写入缓存中
      //   KeyWordModel.addToHistory(q);
      // });
    },

    
  }
});
