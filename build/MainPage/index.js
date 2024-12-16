(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/MainPage/index.ux?uxType=page":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/MainPage/index.ux?uxType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.storage"));

var _system2 = _interopRequireDefault($app_require$("@app-module/system.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  private: {
    aboveAnim: '',
    belowAnim: '',
    maskAnim: '',
    activeIndex: 1,
    toDoList: [{
      name: '吃个饭',
      start: '2020-10-10&3:1',
      end: '2020-11-1&3:1'
    }, {
      name: '刷个碗',
      start: '2020-8-28&12:15',
      end: '2021-1-1&12:16'
    }],
    doingList: [{
      name: 'hahaha',
      start: '2020-7-26&1:56',
      end: '2020-7-28&1:56'
    }, {
      name: 'doingTest2',
      start: '2019-12-20&10:15',
      end: '2020-10-26&11:30'
    }, {
      name: 'doingTest1',
      start: '2020-7-27&1:23',
      end: '2020-7-28&1:23'
    }, {
      name: '该歇了',
      start: '2020-6-15&8:1',
      end: '2020-8-15&9:2'
    }],
    doneList: [{
      name: '我爱天大',
      start: '2020-7-27&1:23',
      end: '2020-7-28&1:23'
    }]
  },

  onInit() {
    this.$page.setTitleBar({
      text: 'todo App'
    });
    this.$on('doneItem', evt => {
      if (evt.detail.type == 0) {
        this.doneList.push(this.toDoList[evt.detail.idx]);
        this.toDoList.splice(evt.detail.idx, 1);
      } else {
        this.doneList.push(this.doingList[evt.detail.idx]);
        this.doingList.splice(evt.detail.idx, 1);
      }

      this.saveLists();
    });
    this.$on('delItem', evt => {
      this.doneList.splice(evt.detail.idx, 1);
      this.saveLists();
    });
  },

  onShow() {
    let that = this;
    this.loadLists(function (data) {
      if (data != '') {
        let list = JSON.parse(data);
        that.toDoList = list.toDoList;
        that.doingList = list.doingList;
        that.doneList = list.doneList;
        let nowDate = new Date();
        that.toDoList.forEach(function (element, index) {
          let arr = element.start.replace(/[:\-\\&]/g, ',').split(',');
          let startDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], 0, 0);

          if (nowDate.getTime() > startDate.getTime()) {
            that.doingList.push(that.toDoList[index]);
            that.toDoList.splice(index, 1);
          }
        });
        that.saveLists();
      }
    });
    this.drawLineCanvas();
    this.drawTimeCanvas();
  },

  changeTabactive(e) {
    this.activeIndex = e.index;
  },

  openInput(name, start, end) {
    this.saveLists(function () {
      _system2.default.push({
        uri: '/Input',
        params: {
          pushName: name,
          pushStart: start,
          pushEnd: end,
          pushType: -1,
          pushIdx: -1
        }
      });
    });
  },

  saveLists(voidCallback = function () {}) {
    let that = this;
    let list = {
      toDoList: this.toDoList,
      doingList: this.doingList,
      doneList: this.doneList
    };

    _system.default.set({
      key: 'msg',
      value: list,
      success: voidCallback(),
      fail: function (data, code) {
        that.$app.$def.makeToast(`handling fail, code = ${code}`);
      }
    });
  },

  loadLists(dataCallback = function () {}) {
    let that = this;

    _system.default.get({
      key: 'msg',
      success: function (data) {
        dataCallback(data);
      },
      fail: function (data, code) {
        that.$app.$def.makeToast(`handling fail, code = ${code}`);
      }
    });
  },

  drawLineCanvas() {
    let min = Math.min(this.toDoList.length, this.doingList.length, this.doneList.length);
    let gap = Math.max(this.toDoList.length, this.doingList.length, this.doneList.length) - min;
    let todo = 320 - (this.toDoList.length - min) / gap * 250;
    let doing = 320 - (this.doingList.length - min) / gap * 250;
    let done = 320 - (this.doneList.length - min) / gap * 250;
    const canvas = this.$element('line-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 750, 350);
    ctx.arc(200, todo, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.moveTo(375, doing);
    ctx.arc(375, doing, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.moveTo(550, done);
    ctx.arc(550, done, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.moveTo(0, 175);
    ctx.bezierCurveTo(100, 175, 100, todo, 200, todo);
    ctx.bezierCurveTo(280, todo, 280, doing, 375, doing);
    ctx.bezierCurveTo(470, doing, 470, done, 550, done);
    ctx.bezierCurveTo(650, done, 650, 175, 750, 175);
    ctx.stroke();
    ctx.font = '30px sans-serif';
    ctx.fillText(`${this.toDoList.length} todo`, 200 - 45, todo - 30);
    ctx.fillText(`${this.doingList.length} doing`, 375 - 45, doing - 30);
    ctx.fillText(`${this.doneList.length} done`, 550 - 45, done - 30);
  },

  drawTimeCanvas() {
    let overtime = 0,
        day = 0,
        week = 0,
        month = 0,
        more = 0;
    const nowDate = new Date();
    const dayDate = new Date();
    dayDate.setTime(dayDate.getTime() + 24 * 60 * 60 * 1000);
    const weekDate = new Date();
    weekDate.setTime(weekDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const monthDate = new Date();
    monthDate.setTime(monthDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    this.toDoList.forEach(function (value) {
      if (value.end == 'wow! no ddl!') {
        more += 1;
      } else {
        let arr = value.end.replace(/[:\-\\&]/g, ',').split(',');
        let endDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], 0, 0);
        if (endDate.getTime() > monthDate.getTime()) more += 1;else if (endDate.getTime() > weekDate.getTime()) month += 1;else if (endDate.getTime() > dayDate.getTime()) week += 1;else if (endDate.getTime() > nowDate.getTime()) day += 1;else overtime += 1;
      }
    });
    this.doingList.forEach(function (value) {
      if (value.end == 'wow! no ddl!') {
        more += 1;
      } else {
        let arr = value.end.replace(/[:\-\\&]/g, ',').split(',');
        let endDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], 0, 0);
        if (endDate.getTime() > monthDate.getTime()) more += 1;else if (endDate.getTime() > weekDate.getTime()) month += 1;else if (endDate.getTime() > dayDate.getTime()) week += 1;else if (endDate.getTime() > nowDate.getTime()) day += 1;else overtime += 1;
      }
    });
    let total = overtime + day + week + month + more;
    let percentList = [overtime / total, day / total, week / total, month / total, more / total];
    let circleList = [0, ...percentList];

    for (let i = 0; i < 5; i++) circleList[i + 1] += circleList[i];

    const canvas = this.$element('time-canvas');
    const ctx = canvas.getContext('2d');
    const color = ['#979BA5', '#473CB1', '#B25D53', '#F1A942', '#A2EBD7'];

    for (let i = 0; i < percentList.length; i++) {
      percentList[i] = (percentList[i] * 100).toFixed(0);
      if (percentList[i].length == 1) percentList[i] = '  ' + percentList[i];
    }

    let textList = [`已超时:  ${percentList[0]}%`, `一天内:  ${percentList[1]}%`, `一周内:  ${percentList[2]}%`, `一月内:  ${percentList[3]}%`, `还很远:  ${percentList[4]}%`];
    ctx.clearRect(0, 0, 750, 350);
    ctx.lineWidth = 20;
    ctx.font = '23px';

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = color[i];
      ctx.arc(220, 175, 120, Math.PI * 2 * circleList[i], Math.PI * 2 * circleList[i + 1]);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = color[i];
      ctx.arc(450, 75 + 50 * i, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.fillText(textList[i], 475, 75 + 50 * i + 6);
    }

    ctx.textAlign = 'center';
    ctx.font = 'bold 55px';
    ctx.fillText(`${total}`, 220, 167);
    ctx.font = '22px';
    ctx.fillStyle = '#808080';
    ctx.fillText('Events not done', 220, 205);
  },

  aboveSwipe(dir) {
    if (dir.direction == 'left') {
      this.drawLineCanvas();
      this.drawTimeCanvas();
      this.aboveAnim = 'aboveForward';
      this.belowAnim = 'belowForward';
      this.maskAnim = 'maskForward';
    } else if (dir.direction == 'up' && this.aboveAnim != '') {
      this.aboveAnim = 'aboveReverse';
      this.belowAnim = 'belowReverse';
      this.maskAnim = 'maskReverse';
    }
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

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/MainPage/main-page-item.ux?uxType=comp":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/MainPage/main-page-item.ux?uxType=comp ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  props: ['item', 'idx', 'type'],

  markDone(idx) {
    this.$dispatch('doneItem', {
      idx: idx,
      type: this.type
    });
  },

  delItem(idx) {
    this.$dispatch('delItem', {
      idx: idx
    });
  },

  openInput(name, start, end, type, idx) {
    _system.default.push({
      uri: '/Input',
      params: {
        pushName: name,
        pushStart: start,
        pushEnd: end,
        pushType: type,
        pushIdx: idx
      }
    });
  }

};
exports.default = _default;}

/***/ }),

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/MainPage/index.ux?uxType=page":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/MainPage/index.ux?uxType=page ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
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
  ".header": {
    "height": "200px",
    "width": "750px",
    "backgroundColor": "#ffffff",
    "flexDirection": "column"
  },
  ".header .header-text": {
    "flexDirection": "column",
    "flex": 1,
    "fontSize": "40px",
    "color": "#000000",
    "paddingLeft": "100px",
    "fontWeight": "bold",
    "textAlign": "left",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header-text"
        }
      ]
    }
  },
  ".header .span1": {
    "fontSize": "40px",
    "color": "#000000",
    "fontWeight": "bold",
    "paddingTop": "45px",
    "paddingRight": "0px",
    "paddingBottom": "0px",
    "paddingLeft": "100px",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "span1"
        }
      ]
    }
  },
  ".header .span2": {
    "fontSize": "30px",
    "color": "#808080",
    "paddingTop": "20px",
    "paddingRight": "0px",
    "paddingBottom": "0px",
    "paddingLeft": "150px",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "span2"
        }
      ]
    }
  },
  ".main-page": {
    "backgroundColor": "#f3f5fa",
    "flexDirection": "column"
  },
  ".main-page .tabs": {
    "flex": 1,
    "marginTop": "20px",
    "marginBottom": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        }
      ]
    }
  },
  ".main-page .tabs .tab-content": {
    "flex": 1,
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-content"
        }
      ]
    },
    "paddingTop": "30px"
  },
  ".main-page .tabs .tab-bar": {
    "height": "100px",
    "width": "600px",
    "marginLeft": "75px",
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
    "borderRadius": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-bar"
        }
      ]
    }
  },
  ".main-page .tabs .tab-text": {
    "textAlign": "center",
    "fontWeight": "bold",
    "fontFamily": "myfont-bold, serif",
    "color": "#808080",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-text"
        }
      ]
    },
    "color:active": "#000000",
    "fontWeight:active": "bold",
    "fontFamily:active": "myfont-bold, serif"
  },
  ".main-page .below": {
    "flex": 0,
    "height": "150px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "below"
        }
      ]
    }
  },
  ".main-page .below .add-btn": {
    "height": "100px",
    "width": "100px",
    "marginLeft": "325px",
    "marginTop": "10px",
    "marginBottom": "40px",
    "backgroundColor": "#473cb1",
    "borderRadius": "25px",
    "fontSize": "50px",
    "textAlign": "center",
    "color": "#ffffff",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "below"
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
  ".analyze-page": {
    "backgroundColor": "#f3f5fa",
    "flexDirection": "column"
  },
  ".analyze-page .canvas-container": {
    "flex": 1,
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-container"
        }
      ]
    }
  },
  ".analyze-page .canvas-container #line-canvas": {
    "height": "350px",
    "width": "750px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-container"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "id",
          "i": false,
          "a": "equals",
          "v": "line-canvas"
        }
      ]
    }
  },
  ".analyze-page .canvas-container #time-canvas": {
    "height": "350px",
    "width": "750px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-container"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "id",
          "i": false,
          "a": "equals",
          "v": "time-canvas"
        }
      ]
    }
  },
  ".analyze-page .canvas-container .canvas-text": {
    "height": "70px",
    "fontSize": "30px",
    "marginLeft": "50px",
    "paddingTop": "30px",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-container"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-text"
        }
      ]
    }
  },
  ".analyze-page .mask-container": {
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask-container"
        }
      ]
    }
  },
  ".analyze-page .mask-container .mask-area": {
    "marginTop": "70px",
    "height": "350px",
    "width": "750px",
    "backgroundColor": "#f3f5fa",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask-container"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask-area"
        }
      ]
    }
  },
  ".aboveForward": {
    "animationName": "aboveForward",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  "@KEYFRAMES": {
    "aboveForward": [
      {
        "transform": "{\"translateX\":\"0px\",\"rotateY\":\"0deg\"}",
        "opacity": 1,
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"-375px\",\"rotateY\":\"-90deg\"}",
        "opacity": 0,
        "time": 100
      }
    ],
    "belowForward": [
      {
        "transform": "{\"translateX\":\"375px\",\"rotateY\":\"90deg\"}",
        "opacity": 0,
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\",\"rotateY\":\"0deg\"}",
        "opacity": 1,
        "time": 100
      }
    ],
    "maskForward": [
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"750px\"}",
        "time": 100
      }
    ],
    "aboveReverse": [
      {
        "transform": "{\"translateX\":\"-375px\",\"rotateY\":\"-90deg\"}",
        "opacity": 0,
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\",\"rotateY\":\"0deg\"}",
        "opacity": 1,
        "time": 100
      }
    ],
    "belowReverse": [
      {
        "transform": "{\"translateX\":\"0px\",\"rotateY\":\"0deg\"}",
        "opacity": 1,
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"375px\",\"rotateY\":\"90deg\"}",
        "opacity": 0,
        "time": 100
      }
    ],
    "maskReverse": [
      {
        "transform": "{\"translateX\":\"750px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 100
      }
    ]
  },
  ".belowForward": {
    "animationName": "belowForward",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  ".maskForward": {
    "animationName": "maskForward",
    "animationDuration": "600ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1,
    "animationDelay": "600ms"
  },
  ".aboveReverse": {
    "animationName": "aboveReverse",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  ".belowReverse": {
    "animationName": "belowReverse",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  ".maskReverse": {
    "animationName": "maskReverse",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  }
}

/***/ }),

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/MainPage/main-page-item.ux?uxType=comp":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/MainPage/main-page-item.ux?uxType=comp ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
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
  ".item": {
    "flex": 1,
    "height": "120px",
    "marginBottom": "15px"
  },
  ".item .micro-list": {
    "flex": 1,
    "height": "120px",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        }
      ]
    }
  },
  ".item .micro-list .micro-text": {
    "flex": 1,
    "flexDirection": "column",
    "height": "120px",
    "width": "600px",
    "marginLeft": "75px",
    "marginRight": "75px",
    "flexGrow": 0,
    "backgroundColor": "#ffffff",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "borderRadius": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        }
      ]
    }
  },
  ".item .micro-list .micro-text .text1": {
    "paddingTop": "12px",
    "paddingLeft": "50px",
    "fontWeight": "bold",
    "fontSize": "38px",
    "color": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text1"
        }
      ]
    }
  },
  ".item .micro-list .micro-text .time": {
    "flexDirection": "row",
    "marginTop": "10px",
    "paddingLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time"
        }
      ]
    }
  },
  ".item .micro-list .micro-text .time .text2": {
    "width": "320px",
    "fontSize": "23px",
    "marginRight": "30px",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text2"
        }
      ]
    }
  },
  ".item .micro-list .micro-btn": {
    "flex": 0,
    "height": "100px",
    "width": "60px",
    "backgroundColor": "#f5f5f5",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-btn"
        }
      ]
    }
  },
  ".check-btn": {
    "width": "50px",
    "height": "50px",
    "marginTop": "35px",
    "backgroundImage": "/Common/checked.png"
  },
  ".cancle-btn": {
    "width": "50px",
    "height": "50px",
    "marginTop": "35px",
    "backgroundImage": "/Common/cancle.png"
  }
}

/***/ }),

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/MainPage/index.ux?uxType=page&importNames[]=main-page-item":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/MainPage/index.ux?uxType=page&importNames[]=main-page-item ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "stack",
      "attr": {},
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": function () {return ['analyze-page', this.belowAnim]},
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "header"
              ],
              "events": {
                "swipe": "aboveSwipe"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "Analysis Page"
                  },
                  "classList": [
                    "header-text"
                  ]
                }
              ]
            },
            {
              "type": "stack",
              "attr": {},
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "canvas-container"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "Event Count:"
                      },
                      "classList": [
                        "canvas-text"
                      ]
                    },
                    {
                      "type": "canvas",
                      "attr": {
                        "id": "line-canvas"
                      },
                      "id": "line-canvas"
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "DDL Percent:"
                      },
                      "classList": [
                        "canvas-text"
                      ]
                    },
                    {
                      "type": "canvas",
                      "attr": {
                        "id": "time-canvas"
                      },
                      "id": "time-canvas"
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "mask-container"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": function () {return ['mask-area', this.maskAnim]}
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": function () {return ['mask-area', this.maskAnim]}
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": function () {return ['main-page', this.aboveAnim]},
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "header"
              ],
              "events": {
                "swipe": "aboveSwipe"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "TODO"
                  },
                  "classList": [
                    "span1"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "——your event manager"
                  },
                  "classList": [
                    "span2"
                  ]
                }
              ]
            },
            {
              "type": "tabs",
              "attr": {
                "index": function () {return this.activeIndex}
              },
              "classList": [
                "tabs"
              ],
              "events": {
                "change": "changeTabactive"
              },
              "children": [
                {
                  "type": "tab-bar",
                  "attr": {},
                  "classList": [
                    "tab-bar"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "TODO"
                      },
                      "classList": [
                        "tab-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "DOING"
                      },
                      "classList": [
                        "tab-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "DONE"
                      },
                      "classList": [
                        "tab-text"
                      ]
                    }
                  ]
                },
                {
                  "type": "tab-content",
                  "attr": {},
                  "classList": [
                    "tab-content"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "item-container"
                      ],
                      "children": [
                        {
                          "type": "list",
                          "attr": {},
                          "classList": [
                            "todo-list"
                          ],
                          "children": [
                            {
                              "type": "block",
                              "attr": {},
                              "repeat": function () {return this.toDoList},
                              "children": [
                                {
                                  "type": "list-item",
                                  "attr": {
                                    "type": "item"
                                  },
                                  "children": [
                                    {
                                      "type": "main-page-item",
                                      "attr": {
                                        "item": function () {return this.$item},
                                        "idx": function () {return this.$idx},
                                        "type": "0"
                                      }
                                    }
                                  ]
                                }
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
                        "item-container"
                      ],
                      "children": [
                        {
                          "type": "list",
                          "attr": {},
                          "classList": [
                            "doing-list"
                          ],
                          "children": [
                            {
                              "type": "block",
                              "attr": {},
                              "repeat": function () {return this.doingList},
                              "children": [
                                {
                                  "type": "list-item",
                                  "attr": {
                                    "type": "item"
                                  },
                                  "children": [
                                    {
                                      "type": "main-page-item",
                                      "attr": {
                                        "item": function () {return this.$item},
                                        "idx": function () {return this.$idx},
                                        "type": "1"
                                      }
                                    }
                                  ]
                                }
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
                        "item-container"
                      ],
                      "children": [
                        {
                          "type": "list",
                          "attr": {},
                          "classList": [
                            "done-list"
                          ],
                          "children": [
                            {
                              "type": "block",
                              "attr": {},
                              "repeat": function () {return this.doneList},
                              "children": [
                                {
                                  "type": "list-item",
                                  "attr": {
                                    "type": "item"
                                  },
                                  "children": [
                                    {
                                      "type": "main-page-item",
                                      "attr": {
                                        "item": function () {return this.$item},
                                        "idx": function () {return this.$idx},
                                        "type": "2"
                                      }
                                    }
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
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "below"
              ],
              "children": [
                {
                  "type": "input",
                  "attr": {
                    "type": "button",
                    "value": "+"
                  },
                  "classList": [
                    "add-btn"
                  ],
                  "events": {
                    "click": function (evt) { return this.openInput('','ok','wow! no ddl!',evt)}
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/MainPage/main-page-item.ux?uxType=comp&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/MainPage/main-page-item.ux?uxType=comp& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "item"
  ],
  "children": [
    {
      "type": "list",
      "attr": {},
      "classList": [
        "micro-list"
      ],
      "children": [
        {
          "type": "list-item",
          "attr": {
            "type": "item"
          },
          "classList": [
            "micro-text"
          ],
          "events": {
            "click": function (evt) { return this.openInput(this.item.name,this.item.start,this.item.end,this.type,this.idx,evt)}
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return this.item.name}
              },
              "classList": [
                "text1"
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "time"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return '' + '开始: ' + (this.item.start)}
                  },
                  "classList": [
                    "text2"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return '' + '结束: ' + (this.item.end)}
                  },
                  "classList": [
                    "text2"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "list-item",
          "attr": {
            "type": "item"
          },
          "classList": [
            "micro-btn"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "shown": function () {return this.type!=2},
              "classList": [
                "check-btn"
              ],
              "events": {
                "click": function (evt) { return this.markDone(this.idx,evt)}
              }
            },
            {
              "type": "div",
              "attr": {},
              "shown": function () {return this.type==2},
              "classList": [
                "cancle-btn"
              ],
              "events": {
                "click": function (evt) { return this.delItem(this.idx,evt)}
              }
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&type=import!./src/MainPage/main-page-item.ux?uxType=comp&name=main-page-item":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&type=import!./src/MainPage/main-page-item.ux?uxType=comp&name=main-page-item ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!less-loader!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./main-page-item.ux?uxType=comp */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/MainPage/main-page-item.ux?uxType=comp")

var $app_script$ = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!../../node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./main-page-item.ux?uxType=comp */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/MainPage/main-page-item.ux?uxType=comp")

$app_define$('@app-component/main-page-item', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./main-page-item.ux?uxType=comp& */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/MainPage/main-page-item.ux?uxType=comp&")

     $app_module$.exports.style = $app_style$
})

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
/*!*******************************************!*\
  !*** ./src/MainPage/index.ux?uxType=page ***!
  \*******************************************/
__webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&type=import!./main-page-item.ux?uxType=comp&name=main-page-item */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&type=import!./src/MainPage/main-page-item.ux?uxType=comp&name=main-page-item")

var $app_style$ = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!less-loader!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/MainPage/index.ux?uxType=page")

var $app_script$ = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!../../node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/module-loader.js!./node_modules/babel-loader/lib/index.js?cwd=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo&cacheDirectory&plugins[]=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/babel-plugin-jsx.js&comments=false&configFile=/Users/xiaotian.qiu/work/quick_app_demo/todos-demo/node_modules/@hap-toolkit/packager/babel.config.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/MainPage/index.ux?uxType=page")

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=page&importNames[]=main-page-item */ "./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!./node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/MainPage/index.ux?uxType=page&importNames[]=main-page-item")

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