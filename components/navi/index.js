// components/navi/index.js
Component({
  options: {
    // 启用 slot 支持
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: "images/triangle.dis@left.png",
    LeftSrc: "images/triangle@left.png",
    disRightSrc: "images/triangle.dis@right.png",
    RightSrc: "images/triangle@right.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function(event) {
      if (!this.properties.latest) {
        this.triggerEvent("left", {}, {});
      }
    },
    onRight: function(event) {
      if (!this.properties.first) {
        this.triggerEvent("right", {}, {});
      }
    }
  }
});
