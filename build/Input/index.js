(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Input/index.ux?uxType=page":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Input/index.ux?uxType=page ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = _interopRequireDefault($app_require$("@app-module/service.asr"));

var _system = _interopRequireDefault($app_require$("@app-module/system.storage"));

var _system2 = _interopRequireDefault($app_require$("@app-module/system.vibrator"));

var _system3 = _interopRequireDefault($app_require$("@app-module/system.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  private: {
    eventName: '',
    nameBackUp: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    checked: false,
    enabled: false,
    scale: ''
  },
  protected: {
    pushName: '',
    pushStart: '',
    pushEnd: '',
    pushType: '',
    pushIdx: ''
  },

  onInit() {
    this.$page.setTitleBar({
      text: 'add todos'
    });
    this.initAsr();
    this.initTime();
    this.eventName = this.pushName;

    if (this.pushStart != 'ok') {
      let list2 = this.pushStart.split('&');
      this.start_date = list2[0];
      this.start_time = list2[1];
    }

    if (this.pushEnd != 'wow! no ddl!') {
      let list1 = this.pushEnd.split('&');
      this.end_date = list1[0];
      this.end_time = list1[1];
    }
  },

  onDestroy() {},

  initTime() {
    const date = new Date();
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const H = date.getHours();
    const m = date.getMinutes();
    this.start_date = Y + '-' + M + '-' + D;
    this.start_time = H + ':' + m;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    const TY = date.getFullYear();
    const TM = date.getMonth() + 1;
    const TD = date.getDate();
    const TH = date.getHours();
    const Tm = date.getMinutes();
    this.end_date = TY + '-' + TM + '-' + TD;
    this.end_time = TH + ':' + Tm;
  },

  initAsr() {
    let that = this;

    _service.default.oncompleteresult = ({
      result
    }) => {
      this.eventName = this.nameBackUp + `${result}`;
    };
  },

  startAsr() {
    let that = this;
    this.nameBackUp = this.eventName;

    _service.default.start({
      success: function () {
        _system2.default.vibrate({
          mode: 'short'
        });

        _system2.default.vibrate({
          mode: 'short'
        });

        _system2.default.vibrate({
          mode: 'short'
        });
      },
      fail: function (data, code) {
        that.eventName = `start fail, code=${code}, data=${data}`;
      }
    });
  },

  updateValue(evt) {
    this.eventName = evt.value;
  },

  clearEventName() {
    this.eventName = '';
  },

  addEvent() {
    if (this.eventName === '') {
      this.$app.$def.makeToast('error: task name must not be null');
    } else {
      let start = this.start_date + '&' + this.start_time;
      let end = this.checked ? 'wow! no ddl!' : this.end_date + '&' + this.end_time;
      let that = this;

      _system.default.get({
        key: 'msg',
        success: function (data) {
          if (data != '') {
            let list = JSON.parse(data);
            if (that.pushType == 0) list.toDoList.splice(that.pushIdx, 1);else if (that.pushType == 1) list.doingList.splice(that.pushIdx, 1);else if (that.pushType == 2) list.doneList.splice(that.pushIdx, 1);
            let arr = start.replace(/[:\-\\&]/g, ',').split(',');
            let startDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], 0, 0);
            let nowDate = new Date();
            if (nowDate.getTime() > startDate.getTime()) list.doingList.push({
              name: that.eventName,
              start: start,
              end: end
            });else list.toDoList.push({
              name: that.eventName,
              start: start,
              end: end
            });

            _system.default.set({
              key: 'msg',
              value: list,
              success: function () {
                that.eventName = '';

                _system3.default.back();
              },
              fail: function (data, code) {
                that.$app.$def.makeToast(`handling fail, code = ${code}`);
              }
            });
          }
        },
        fail: function (data, code) {
          that.$app.$def.makeToast(`handling fail, code = ${code}`);
        }
      });
    }
  },

  getStartDate(e) {
    this.start_date = e.year + '-' + (e.month + 1) + '-' + e.day;
  },

  getStartTime(e) {
    this.start_time = e.hour + ':' + e.minute;
  },

  getEndDate(e) {
    this.end_date = e.year + '-' + (e.month + 1) + '-' + e.day;
  },

  getEndTime(e) {
    this.end_time = e.hour + ':' + e.minute;
  },

  turnChecked() {
    this.checked = !this.checked;
  },

  enableAsrBtn() {
    this.enabled = !this.enabled;
  }

};
exports.default = _default;
const moduleOwn = exports.default || module.exports;
const accessors = ['public', 'protected', 'private'];

if (moduleOwn.data && accessors.some(function (acc) {
  return moduleOwn[acc];
})) {
  throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
} else if (!moduleOwn.data) {
  moduleOwn.data = {};
  moduleOwn._descriptor = {};
  accessors.forEach(function (acc) {
    const accType = typeof moduleOwn[acc];

    if (accType === 'object') {
      moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);

      for (const name in moduleOwn[acc]) {
        moduleOwn._descriptor[name] = {
          access: acc
        };
      }
    } else if (accType === 'function') {
      console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
    }
  });
}}

/***/ }),

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Input/index.ux?uxType=page":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Input/index.ux?uxType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "@FONT-FACE": {
    "myfont": {
      "fontFamily": "myfont",
      "src": [
        "/Common/Montserrat.ttf"
      ],
      "fontName": "myfont",
      "fontSrc": [
        "/Common/Montserrat.ttf"
      ]
    },
    "myfont-bold": {
      "fontFamily": "myfont-bold",
      "src": [
        "/Common/Montserrat_bold.ttf"
      ],
      "fontName": "myfont-bold",
      "fontSrc": [
        "/Common/Montserrat_bold.ttf"
      ]
    }
  },
  ".input-page": {
    "flexDirection": "column"
  },
  ".input-page > text": {
    "height": "200px",
    "fontSize": "40px",
    "color": "#000000",
    "backgroundColor": "#ffffff",
    "fontWeight": "bold",
    "textAlign": "center",
    "fontFamily": "myfont-bold, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".input-page .input-area": {
    "flex": 1,
    "paddingLeft": "50px",
    "paddingRight": "50px",
    "flexDirection": "column",
    "backgroundColor": "#f3f5fa",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        }
      ]
    }
  },
  ".input-page .input-area .task-area": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-area"
        }
      ]
    }
  },
  ".input-page .input-area .task-area .add-btn": {
    "width": "150px",
    "height": "80px",
    "fontSize": "35px",
    "borderRadius": "25px",
    "color": "#ffffff",
    "backgroundColor": "#473cb1",
    "alignSelf": "flex-end",
    "marginBottom": "30px",
    "marginLeft": "300px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "add-btn"
        }
      ]
    }
  },
  ".input-page .input-area .ddl-area": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-area"
        }
      ]
    }
  },
  ".input-page .input-area .ddl-area .ddl": {
    "fontSize": "25px",
    "color": "#000000",
    "marginTop": "5px",
    "flexWrap": "nowrap",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl"
        }
      ]
    }
  },
  ".input-page .input-area .event-input": {
    "height": "100px",
    "borderRadius": "20px",
    "backgroundColor": "#ffffff",
    "borderTopWidth": "5px",
    "borderRightWidth": "5px",
    "borderBottomWidth": "5px",
    "borderLeftWidth": "5px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "event-input"
        }
      ]
    }
  },
  ".input-page .input-area .event-input > input": {
    "flexGrow": 1,
    "paddingTop": "10px",
    "paddingRight": "30px",
    "paddingBottom": "10px",
    "paddingLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "event-input"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".input-page .input-area .time-area": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        }
      ]
    }
  },
  ".input-page .input-area .time-area .time-input": {
    "flexDirection": "row",
    "height": "100px",
    "width": "500px",
    "borderRadius": "20px",
    "marginBottom": "10px",
    "backgroundColor": "#ffffff",
    "borderTopWidth": "3px",
    "borderRightWidth": "3px",
    "borderBottomWidth": "3px",
    "borderLeftWidth": "3px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-input"
        }
      ]
    }
  },
  ".input-page .input-area .time-area .time-input .date-picker": {
    "width": "180px",
    "marginLeft": "50px",
    "flex": 0,
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-input"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "date-picker"
        }
      ]
    }
  },
  ".input-page .input-area .time-area .time-input .time-picker": {
    "width": "100px",
    "marginLeft": "10px",
    "flex": 0,
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-input"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-picker"
        }
      ]
    }
  },
  ".input-page .input-area .time-area .time-input .date-image": {
    "width": "40px",
    "height": "40px",
    "marginTop": "30px",
    "marginRight": "25px",
    "marginBottom": "30px",
    "marginLeft": "5px",
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "backgroundImage": "/Common/calendar.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-input"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "date-image"
        }
      ]
    }
  },
  ".input-page .input-area .time-area .time-input .time-image": {
    "width": "40px",
    "height": "40px",
    "marginTop": "30px",
    "marginRight": "15px",
    "marginBottom": "30px",
    "marginLeft": "5px",
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "backgroundImage": "/Common/time.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-input"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-image"
        }
      ]
    }
  },
  ".input-page .input-area .time-area > text": {
    "width": "120px",
    "fontSize": "30px",
    "textAlign": "center",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".input-page .input-area .asr-btn": {
    "flex": 0,
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-btn"
        }
      ]
    }
  },
  ".normal-text": {
    "paddingTop": "50px",
    "paddingBottom": "50px",
    "width": "250px",
    "flexWrap": "nowrap",
    "fontSize": "35px",
    "fontWeight": "bold",
    "fontFamily": "myfont-bold, serif",
    "color": "#000000"
  },
  ".btn-check": {
    "width": "50px",
    "height": "50px",
    "marginTop": "50px",
    "marginRight": "10px",
    "marginBottom": "25px",
    "marginLeft": "225px",
    "borderRadius": "25px",
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderTopColor": "#808080",
    "borderRightColor": "#808080",
    "borderBottomColor": "#808080",
    "borderLeftColor": "#808080"
  },
  ".btn-checked": {
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "backgroundImage": "/Common/checked.png"
  },
  ".asr-image1": {
    "width": "40px",
    "height": "40px",
    "marginTop": "30px",
    "marginRight": "30px",
    "marginBottom": "30px",
    "marginLeft": "30px",
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "flexShrink": 0,
    "backgroundImage": "/Common/asr.png"
  },
  ".asr-image2": {
    "width": "40px",
    "height": "40px",
    "marginTop": "40px",
    "marginRight": "35px",
    "marginBottom": "30px",
    "marginLeft": "37.5px",
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "backgroundImage": "/Common/asr.png"
  },
  ".clear-btn": {
    "width": "40px",
    "height": "40px",
    "marginTop": "30px",
    "marginRight": "0px",
    "marginBottom": "30px",
    "marginLeft": "0px",
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "flexShrink": 0,
    "backgroundImage": "/Common/cancle.png"
  },
  ".asr-btn-enabled": {
    "flex": 0,
    "height": "120px",
    "width": "120px",
    "borderRadius": "60px",
    "borderTopWidth": "5px",
    "borderRightWidth": "5px",
    "borderBottomWidth": "5px",
    "borderLeftWidth": "5px",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "alignSelf": "center",
    "marginTop": "70px",
    "backgroundColor": "#ffffff"
  },
  ".asr-btn-disabled": {
    "height": "0px",
    "width": "0px"
  },
  ".scale": {
    "animationName": "scale",
    "animationDuration": "200ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  "@KEYFRAMES": {
    "scale": [
      {
        "transform": "{\"scaleX\":1,\"scaleY\":1}",
        "time": 0
      },
      {
        "transform": "{\"scaleX\":1.6,\"scaleY\":1.6}",
        "time": 100
      }
    ],
    "stop": [
      {
        "transform": "{\"scaleX\":1,\"scaleY\":1}",
        "time": 0
      },
      {
        "transform": "{\"scaleX\":1,\"scaleY\":1}",
        "time": 100
      }
    ]
  },
  ".stop": {
    "animationName": "stop",
    "animationDuration": "100ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  }
}

/***/ }),

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Input/index.ux?uxType=page&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Input/index.ux?uxType=page& ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "input-page"
  ],
  "children": [
    {
      "type": "text",
      "attr": {
        "value": "Add New Event"
      }
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "input-area"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "task-area"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "Task Name"
              },
              "classList": [
                "normal-text"
              ]
            },
            {
              "type": "input",
              "attr": {
                "type": "button",
                "value": "完成"
              },
              "classList": [
                "add-btn"
              ],
              "events": {
                "click": "addEvent"
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "event-input"
          ],
          "children": [
            {
              "type": "input",
              "attr": {
                "type": "text",
                "placeholder": "What needs to be done?",
                "value": function () {return this.eventName}
              },
              "events": {
                "change": "updateValue"
              }
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "clear-btn"
              ],
              "events": {
                "click": "clearEventName"
              }
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "asr-image1"
              ],
              "events": {
                "click": "startAsr"
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "ddl-area"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "Deadline"
              },
              "classList": [
                "normal-text"
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": function () {return ['btn-check', this.checked?'btn-checked':'']},
              "events": {
                "click": "turnChecked"
              }
            },
            {
              "type": "text",
              "attr": {
                "value": "NO DDL"
              },
              "classList": [
                "ddl"
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "time-area"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "from:"
              }
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "time-input"
              ],
              "children": [
                {
                  "type": "picker",
                  "attr": {
                    "type": "date",
                    "value": function () {return this.start_date}
                  },
                  "classList": [
                    "date-picker"
                  ],
                  "events": {
                    "change": "getStartDate"
                  }
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "date-image"
                  ]
                },
                {
                  "type": "picker",
                  "attr": {
                    "type": "time",
                    "value": function () {return this.start_time}
                  },
                  "classList": [
                    "time-picker"
                  ],
                  "events": {
                    "change": "getStartTime"
                  }
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "time-image"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "time-area"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "to:"
              }
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "time-input"
              ],
              "children": [
                {
                  "type": "picker",
                  "attr": {
                    "type": "date",
                    "value": function () {return this.end_date}
                  },
                  "classList": [
                    "date-picker"
                  ],
                  "events": {
                    "change": "getEndDate"
                  }
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "date-image"
                  ]
                },
                {
                  "type": "picker",
                  "attr": {
                    "type": "time",
                    "value": function () {return this.end_time}
                  },
                  "classList": [
                    "time-picker"
                  ],
                  "events": {
                    "change": "getEndTime"
                  }
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "time-image"
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./src/Input/index.ux?uxType=page ***!
  \****************************************/

var $app_style$ = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!less-loader!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Input/index.ux?uxType=page")

var $app_script$ = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!../../node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Input/index.ux?uxType=page")

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=page& */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Input/index.ux?uxType=page&")

     $app_module$.exports.style = $app_style$
})
$app_bootstrap$('@app-component/index',{ packagerVersion: "1.9.10" })
})();

/******/ })()
;
    };
    if (typeof window === "undefined") {
      return createPageHandler();
    }
    else {
      window.createPageHandler = createPageHandler
    }
  })();