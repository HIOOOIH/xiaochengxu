// components/music/index.js

import { classicBehavior } from "../classic-beh.js";

let mMgr = wx.getBackgroundAudioManager();

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
    waitingSrc: "images/player@waiting.png",
    playingSrc: "images/player@playing.png"
  },

  /* 微信生命周期, 组件进入界面节点树时执行 */
  attached: function(event) {
    // only in wx:if
    this._recoverPlaying();
    this._monitorSwitch();
  },

  /* hidden 不会触发完整生命周期, 适用于频繁切换 */
  /* wx:if 会触发完整生命周期, 不大可能改变 */
  /* 微信生命周期, 组件退出界面节点树时执行 */
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
          playing: true
        });
        if ((mMgr.src = this.properties.src)) {
          mMgr.play();
        } else {
          mMgr.src = this.properties.src;
        }
        mMgr.title = this.properties.title;
      } else {
        this.setData({
          playing: false
        });
        mMgr.pause();
      }
    },
    _recoverPlaying: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        });
        return;
      }
      if (mMgr.src == this.properties.src) {
        if (!mMgr.paused) {
          this.setData({
            playing: true
          });
        }
      }
    },

    // 播放器检测
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverPlaying();
      });
      mMgr.onPause(() => {
        this._recoverPlaying();
      });
      mMgr.onStop(() => {
        this._recoverPlaying();
      });
      mMgr.onEnded(() => {
        this._recoverPlaying();
      });
    }
  }
});
