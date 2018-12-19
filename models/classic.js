import { HTTP } from "../util/http.js";

class ClassicModel extends HTTP {
  prefix = "classic";
  
  constructor() {
    super();
  }
  /* 获取最新的期刊 */
  getLatest(sCallback) {
    /* this.request() 是 async, 不能 return 结果 */
    this.request({
      url: "classic/latest",
      success: res => {
        let key = this._fullKey(res.index);
        wx.setStorageSync(key, res);
        this._setLatestIndex(res.index);
        /* 回调函数回传回去 */
        sCallback(res);
      }
    });
  }
  getById(cid, type, success) {
    let params = {
      url: "classic/" + type + "/" + cid,
      success: success
    };
    this.request(params);
  }
  /* 获取下一期或者上一期期刊 */
  getClassic(index, nextOrPrevious, sCallback) {
    let key =
      nextOrPrevious === "next"
        ? this._fullKey(index + 1)
        : this._fullKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          let key = this._fullKey(res.index);
          wx.setStorageSync(key, res);
          sCallback(res);
        }
      });
    } else {
      sCallback(classic);
    }
  }

  /* 是否是最新一期期刊 */
  isFirst(index) {
    return index === 1 ? true : false;
  }

  /* 是否是最后一期期刊 */
  isLatest(index) {
    let latestIndex = this._getLastIndex(index);
    return latestIndex === index ? true : false;
  }

  /* 在缓存中存放最新一期的期数 index */
  _setLatestIndex(index) {
    let key = this._fullKey("latest-" + index);
    wx.setStorageSync(key, index);
  }

  _fullKey(partKey) {
    let key = this.prefix + "-" + partKey;
    return key;
  }

  /* 读取缓存 */
  _getLastIndex(index) {
    let key = this._fullKey("latest-" + index);
    let latestIndex = wx.getStorageSync(key);
    return latestIndex;
  }
}

export { ClassicModel };
