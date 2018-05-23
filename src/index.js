import getSelector from "get-selector";
import fly from "flyio";
const SPACE_TIME = 1000;
const IS_DEBUGGER = true;
const API_URL =
  "https://easy-mock.com/mock/5b02697255348c1c9545d9cc/api/channel";
class Collect {
  constructor() {
    this.userInfo = {};
    this._init();
  }
  _init() {
    // const _this = this;
    // // 支持History API
    // if (window.history && history.pushState) {
    //   const replaceState = history.replaceState;
    //   const pushState = history.pushState;
    //   history.replaceState = function() {
    //     _this.referrer = window.location.href;
    //     _this._beforeLeave();
    //     replaceState.apply(history, arguments);
    //     _this._afterEnter();
    //   };
    //   history.pushState = function() {
    //     _this.referrer = window.location.href;
    //     _this._beforeLeave();
    //     pushState.apply(history, arguments);
    //     _this._afterEnter();
    //   };
    // }
    this._afterEnter();
    this._addEventListener();
  }
  /**
   * 注册事件
   */
  _addEventListener() {
    //关闭浏览器之前
    const unload = window.onunload || (() => {});
    window.onunload = () => {
      this._beforeLeave();
      unload();
    };
    //注册全局点击事件
    document.body.onclick = e => {
      const { target } = e;
      const { nodeName, attributes } = target;
      this._dispatch("click", {
        dom: getSelector(target),
        offsetTop: target.offsetTop,
        offsetLeft: target.offsetLeft
      });
      if (
        nodeName.toLowerCase() === "a" &&
        attributes &&
        attributes.target &&
        attributes.target.value.toLowerCase() === "_blank"
      ) {
        this._beforeLeave();
      }
      IS_DEBUGGER && console.log(this.behaviors);
    };
  }
  _resetData() {
    IS_DEBUGGER && console.log("_resetData");
    this.startTime = Date.now();
    this.behaviors = [];
  }
  /**
   * 页面关闭之前
   * 存储下用户操作信息
   */
  _beforeLeave() {
    IS_DEBUGGER && console.log("_beforeLeave");
    this._saveData();
  }
  /**
   * 页面进入之后
   * 判断localStorage是否有当前的页面referrer页面的数据
   * 有并在一定时间内,就将referrer页的用户行为收集
   */
  _afterEnter() {
    IS_DEBUGGER && console.log("_afterEnter");
    this._getData();
    this._resetData();
  }
  /**
   * 存储本页收集的数据
   */
  _saveData() {
    IS_DEBUGGER && console.log("_saveData");
    const href = window.location.href;
    const { clientId = null, userId = null, behaviors = [] } = this;
    if (!behaviors.length || !clientId) return;
    const time = Date.now();
    const stayTime = time - this.startTime;
    const data = { time, stayTime, userId, behaviors };
    window.localStorage.setItem(encodeURIComponent(href), JSON.stringify(data));
  }
  /**
   * 获取上页过来的数据,符合条件就上传
   */
  _getData() {
    IS_DEBUGGER && console.log("_getData");
    const referrer = document.referrer;
    if (!referrer) return;
    const encodeReferrer = encodeURIComponent(referrer);
    let data = null;
    try {
      data = JSON.parse(window.localStorage.getItem(encodeReferrer));
    } catch (error) {
      return;
      console.error(error);
    }
    if (!data) return;
    //上次采集的数据和这次页面的打开的时间的一定时间内
    const isClose = Date.now() - data.time < SPACE_TIME;
    const target = window.location.href;
    if (isClose) {
      data.referrer = referrer;
      data.target = target;
      this._post(data);
      window.localStorage.removeItem(encodeReferrer);
    }
  }
  /**
   * post数据
   */
  _post(data) {
    IS_DEBUGGER && console.log("_post", data);
    return fly.post(API_URL, data);
  }
  /**
   * 触发收集事件
   * @param {String} event
   * @param {Object} data
   */
  _dispatch(event, data) {
    this.behaviors.push({
      event,
      timestamp: Date.now(),
      data
    });
  }
  config({ clientId, userId }) {
    this.clientId = clientId;
    this.userId = userId;
  }
}
export const collect = new Collect();
