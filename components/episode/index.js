// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      // 属性被改变时执行的函数（可选）
      observer: function(newVal, oldVal, changedPath) {
        if (newVal < 10) {
          this.setData({
            // _index 必须是字符串类型，因为数字类型会隐式转换
            // 导致判断条件一直为 true( 08 => 008 => 0008 ) ,无限递归。
            _index: '0' + newVal
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月',
      '十二月'
    ],
    year:Number,
    month:String,
    _index:String
  },

  ready:function(){
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    this.setData({
      month:this.data.months[month],
      year:year
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});
