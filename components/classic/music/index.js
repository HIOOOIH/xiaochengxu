// components/music/index.js

import { classicBehavior } from "../classic-beh.js";

const mMgr = wx.getBackgroundAudioManager();

Component({
  // 通用 properties
  behaviors: [classicBehavior],
  /**
   * 组件的属性列表
   */
  // behaviors: [classicBehavior],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: "images/player@pause.png",
    playSrc: "images/player@play.png"
  },

  attached: function(event) {
    this._monitorSwitch();
    // only in wx:if
    this._recoverStatus();
    this._monitorSwitch();
  },

  detached: function() {
    // wx.pauseBackgroundAudio()
    // mMgr.stop()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        this.setData({
          palying: true
        });
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          palying: false
        });
        mMgr.pause();
      }
    }
  },

  _recoverStatus: function(event) {
    if (mMgr.paused) {
      this.setData({
        palying: false
      });
      return;
    }

    if (mMgr.src == this.properties.src) {
      this.setData({
        palying: true
      });
    }
  },

  // 播放器检测
  _monitorSwitch: function() {
    mMgr.onPlay(() => {
      this._recoverStatus();
    });
    mMgr.onPause(() => {
      this._recoverStatus();
    });
    mMgr.onStop(() => {
      this._recoverStatus();
    });
    mMgr.onEnded(() => {
      this._recoverStatus();
    });
  }
});
