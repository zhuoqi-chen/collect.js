import fly from "flyio";
import { cssPath } from "./util";
const SPACE_TIME = 5000000;
const IS_DEBUGGER = true;
const INTERVAL_FRO_CLICK_TO_HTTP = 10;
const API_BASE_URL = "http://192.168.8.150:3000/projects";
const WEIGHT = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1
};
class Collect {
  constructor({ clientId = "" }) {
    this.clientId = clientId;
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
    const _this = this;
    //关闭浏览器之前
    const unload = window.onunload || (() => {});
    window.onunload = () => {
      this._beforeLeave();
      unload();
    };
    const oriXOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(
      method,
      url,
      asncFlag,
      user,
      password
    ) {
      const weight = /POST|PUT|DELETE|PATCH/.test(method)
        ? WEIGHT.HIGH
        : WEIGHT.MEDIUM;
      console.log("weight", weight);
      _this._dispatch("http", { method, url }, weight);
      oriXOpen.call(this, method, url, asncFlag, user, password);
    };
    //注册全局点击事件
    document.body.onclick = e => {
      const { target } = e;
      const { nodeName, attributes } = target;
      this._dispatch("click", {
        DOMPath: cssPath(target),
        DOMRect: target.getBoundingClientRect()
      });
      if (
        nodeName.toLowerCase() === "a" &&
        attributes &&
        attributes.target &&
        attributes.target.value.toLowerCase() === "_blank"
      ) {
        this._beforeLeave();
      }
      this._preHandleBehaviors();
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
  _preHandleBehaviors() {
    const behaviors = [];
    this.behaviors.reduce((accumulator, currentValue) => {
      if (
        accumulator &&
        accumulator.event === "http" &&
        currentValue.event === "click" &&
        currentValue.timestamp - accumulator.timestamp <
          INTERVAL_FRO_CLICK_TO_HTTP &&
        currentValue.weight < accumulator.weight
      ) {
        currentValue.weight = accumulator.weight;
        currentValue.data.requestUrl = accumulator.data.url;
      }
      if (currentValue.event === "click") {
        behaviors.push(currentValue);
      }
      return currentValue;
    }, null);
    return behaviors;
  }
  /**
   * 存储本页收集的数据
   */
  _saveData() {
    IS_DEBUGGER && console.log("_saveData");
    const href = window.location.href;
    const { clientId = null, userId = null } = this;
    const behaviors = this._preHandleBehaviors();
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
    return fly.post(`${API_BASE_URL}/${this.clientId}/log`, data);
  }
  /**
   * 触发收集事件
   * @param {String} event
   * @param {Object} data
   */
  _dispatch(event, data, weight = WEIGHT.LOW) {
    this.behaviors.push({
      event,
      weight: weight,
      timestamp: Date.now(),
      data
    });
  }
  config({ clientId, userId }) {
    if (clientId) this.clientId = clientId;
    if (userId) this.userId = userId;
  }
}
export const collect = new Collect({
  clientId: "a58f9c87-02ff-47ec-887b-adee73e4161b"
});
