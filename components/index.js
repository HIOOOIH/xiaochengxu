// components/index.js
Component({
  // 启用多 slot 支持
  options:{
    multipleSlots:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    text:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听并修改 tag 的 text 属性值
    onTap:function(){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
