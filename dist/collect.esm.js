import getSelector from 'get-selector';
import fly from 'flyio';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var SPACE_TIME = 5000;

var Collect = function () {
  function Collect() {
    _classCallCheck(this, Collect);

    this.userInfo = {};
    this._init();
  }

  _createClass(Collect, [{
    key: "_init",
    value: function _init() {
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

  }, {
    key: "_addEventListener",
    value: function _addEventListener() {
      var _this = this;

      //关闭浏览器之前
      var unload = window.onunload || function () {};
      window.onunload = function () {
        _this._beforeLeave();
        unload();
      };
      //注册全局点击事件
      document.body.onclick = function (e) {
        var target = e.target;
        var nodeName = target.nodeName,
            attributes = target.attributes;

        _this._dispatch("click", {
          dom: getSelector(target),
          offsetTop: target.offsetTop,
          offsetLeft: target.offsetLeft
        });
        if (nodeName.toLowerCase() === "a" && attributes && attributes.target && attributes.target.value.toLowerCase() === "_blank") {
          _this._beforeLeave();
        }
        console.log(_this.behaviors);
      };
    }
  }, {
    key: "_resetData",
    value: function _resetData() {
      this.startTime = Date.now();
      this.behaviors = [];
    }
    /**
     * 页面关闭之前
     * 存储下用户操作信息
     */

  }, {
    key: "_beforeLeave",
    value: function _beforeLeave() {
      console.log("_beforeLeave");
      this._saveData();
    }
    /**
     * 页面进入之后
     * 判断localStorage是否有当前的页面referrer页面的数据
     * 有并在一定时间内,就将referrer页的用户行为收集
     */

  }, {
    key: "_afterEnter",
    value: function _afterEnter() {
      console.log("_afterEnter", location.href);
      this._getData();
      this._resetData();
    }
    /**
     * 存储本页收集的数据
     */

  }, {
    key: "_saveData",
    value: function _saveData() {
      console.log("_saveData");
      var href = window.location.href;
      var _clientId = this.clientId,
          clientId = _clientId === undefined ? null : _clientId,
          _userId = this.userId,
          userId = _userId === undefined ? null : _userId,
          _behaviors = this.behaviors,
          behaviors = _behaviors === undefined ? [] : _behaviors;

      if (!behaviors.length || !clientId) return;
      var time = Date.now();
      var stayTime = time - this.startTime;
      var data = { time: time, stayTime: stayTime, userId: userId, behaviors: behaviors };
      window.localStorage.setItem(encodeURIComponent(href), JSON.stringify(data));
    }
    /**
     * 获取上页过来的数据,符合条件就上传
     */

  }, {
    key: "_getData",
    value: function _getData() {
      console.log("_getData");
      var referrer = document.referrer;
      if (!referrer) return;
      var encodeReferrer = encodeURIComponent(referrer);
      var data = null;
      try {
        data = JSON.parse(window.localStorage.getItem(encodeReferrer));
      } catch (error) {
        return;
        console.error(error);
      }
      if (!data) return;
      //上次采集的数据和这次页面的打开的时间的一定时间内
      var isClose = Date.now() - data.time < SPACE_TIME;
      var target = window.location.href;
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

  }, {
    key: "_post",
    value: function _post(data) {
      console.log("_post", data);
      fly.post("https://easy-mock.com/mock/5b02697255348c1c9545d9cc/api/channel", data);
    }
    /**
     * 触发收集事件
     * @param {String} event
     * @param {Object} data
     */

  }, {
    key: "_dispatch",
    value: function _dispatch(event, data) {
      this.behaviors.push({
        event: event,
        timestamp: Date.now(),
        data: data
      });
    }
  }, {
    key: "config",
    value: function config(_ref) {
      var clientId = _ref.clientId,
          userId = _ref.userId;

      this.clientId = clientId;
      this.userId = userId;
    }
  }]);

  return Collect;
}();

var collect = new Collect();

export { collect };
