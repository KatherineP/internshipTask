/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  max-width: 1200px;\n  margin: 20px auto;\n  padding: 30px; }\n\n.event {\n  background-color: #75c375; }\n\n.hidden {\n  display: none; }\n\n.container-newEvent {\n  max-width: 900px;\n  margin: 0 auto; }\n  .container-newEvent .multiselect-tip {\n    margin: 0;\n    color: #6c757d;\n    font-size: small; }\n  .container-newEvent .failed-validation {\n    border-color: red; }\n\n.table th {\n  height: 50px; }\n\n.table td {\n  padding: 0;\n  height: 50px; }\n\ntable {\n  table-layout: fixed;\n  text-overflow: ellipsis; }\n  table td {\n    text-overflow: ellipsis;\n    max-width: 20%;\n    height: 40px;\n    overflow: hidden; }\n    table td div {\n      height: 100%;\n      width: 100%;\n      position: relative;\n      padding: 10px 10px 5px 5px; }\n", "",{"version":3,"sources":["webpack://./src/style/main.scss"],"names":[],"mappings":"AAGA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,aAAa,EAAA;;AAGf;EACE,yBATmB,EAAA;;AAYrB;EACE,aAAa,EAAA;;AAGf;EACE,gBAAgB;EAChB,cAAc,EAAA;EAFhB;IAKI,SAAS;IACT,cAAc;IACd,gBAAgB,EAAA;EAPpB;IAWI,iBA5Ba,EAAA;;AAgCjB;EAEI,YAAY,EAAA;;AAFhB;EAKI,UAAU;EACV,YAAY,EAAA;;AAIhB;EACE,mBAAmB;EACnB,uBAAuB,EAAA;EAFzB;IAII,uBAAuB;IACvB,cAAc;IACd,YAAY;IACZ,gBAAgB,EAAA;IAPpB;MASM,YAAY;MACZ,WAAW;MACX,kBAAkB;MAClB,0BAA0B,EAAA","sourcesContent":["$COLOR_ALERT: red;\n$COLOR_EVENT: #75c375;\n\nbody {\n  max-width: 1200px;\n  margin: 20px auto;\n  padding: 30px;\n}\n\n.event {\n  background-color: $COLOR_EVENT;\n}\n\n.hidden {\n  display: none;\n}\n\n.container-newEvent {\n  max-width: 900px;\n  margin: 0 auto;\n\n  .multiselect-tip {\n    margin: 0;\n    color: #6c757d;\n    font-size: small;\n  }\n\n  .failed-validation {\n    border-color: $COLOR_ALERT;\n  }\n}\n\n.table {\n  th {\n    height: 50px;\n  }\n  td {\n    padding: 0;\n    height: 50px;\n  }\n}\n\ntable {\n  table-layout: fixed;\n  text-overflow: ellipsis;\n  td {\n    text-overflow: ellipsis;\n    max-width: 20%;\n    height: 40px;\n    overflow: hidden;\n    div {\n      height: 100%;\n      width: 100%;\n      position: relative;\n      padding: 10px 10px 5px 5px;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEventDuplicated": () => (/* binding */ isEventDuplicated),
/* harmony export */   "isValid": () => (/* binding */ isValid),
/* harmony export */   "deleteAllEvents": () => (/* binding */ deleteAllEvents),
/* harmony export */   "showNotification": () => (/* binding */ showNotification)
/* harmony export */ });
const isEventDuplicated = (newEvent, currentEvents) => {
  const {
    day,
    time
  } = newEvent;
  const duplicate = currentEvents.find(event => event.day === day && event.time === time);
  return duplicate === undefined ? false : true;
};

const isValid = (eventText, participants, day, time) => {
  if (eventText.checkValidity() && participants.checkValidity() && day.checkValidity() && time.checkValidity()) {
    return true;
  }

  return false;
};

const deleteAllEvents = events => {
  events.map(event => {
    const {
      day,
      time
    } = event;
    const cellClass = `cell-${day}-${time}`;
    const cell = document.querySelector(`#${cellClass}`);
    cell.innerHTML = '';
    cell.classList.remove('event');
    cell.setAttribute('draggable', false);
  });
};

const showNotification = (className, message) => {
  document.querySelector(`.${className}`).classList.remove('hidden');
  document.querySelector(`.${className}`).innerText = `${message}`;
  setTimeout(function () {
    document.querySelector(`.${className}`).classList.add('hidden');
  }, 3000);
};



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderFilteredEvents": () => (/* binding */ renderFilteredEvents),
/* harmony export */   "renderEvent": () => (/* binding */ renderEvent),
/* harmony export */   "showCalendarContainer": () => (/* binding */ showCalendarContainer),
/* harmony export */   "renderFilteredEventsForUser": () => (/* binding */ renderFilteredEventsForUser)
/* harmony export */ });
const renderFilteredEvents = events => {
  return events.map(event => {
    const {
      eventText,
      day,
      time
    } = event;
    const cellClass = `cell-${day}-${time}`;
    const cell = document.querySelector(`.${cellClass}`);
    cell.innerHTML = `<div id="${cellClass}" draggable="true">
      ${eventText}
      <button type="button" id="delete-event" class="close" aria-label="Close">
        <span class="delete-event">&times;</span>
      </button></div>`;
    cell.firstElementChild.classList.add('event');
  });
};

const renderFilteredEventsForUser = events => {
  return events.map(event => {
    const {
      eventText,
      day,
      time
    } = event;
    const cellClass = `cell-${day}-${time}`;
    const cell = document.querySelector(`.${cellClass}`);
    cell.innerHTML = `<div id="${cellClass}">
      ${eventText}
      <button type="button" id="delete-event" class="close" aria-label="Close">
      </button></div>`;
    cell.firstElementChild.classList.add('event');
  });
};

const renderEvent = event => {
  const {
    eventText,
    day,
    time
  } = event;
  const cellClass = `cell-${day}-${time}`;
  const cell = document.querySelector(`.${cellClass}`);
  cell.innerHTML = `<div id="${cellClass}" draggable="true">
      ${eventText}
      <button type="button" id="delete-event" class="close" aria-label="Close">
        <span class="delete-event">&times;</span>
      </button></div>`;
  cell.firstElementChild.classList.add('event');
};

const showCalendarContainer = (calendarContainer, newEventContainer) => {
  calendarContainer.classList.remove('hidden');
  newEventContainer.classList.add('hidden');
};



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const users = [{
  name: 'Kate Prokofieva',
  type: 'admin'
}, {
  name: 'Alex Prokofiev',
  type: 'user'
}, {
  name: 'Peter Smolic',
  type: 'user'
}, {
  name: 'Hana Carpenter',
  type: 'user'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (users);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => (/* binding */ User),
/* harmony export */   "Admin": () => (/* binding */ Admin)
/* harmony export */ });
class User {
  constructor(name) {
    this.name = name;
    this.permissions = [];
  }

  can(action) {
    return this.permissions.includes(action);
  }

}

class Admin extends User {
  constructor(name) {
    super(name);
    this.permissions = ['create-event', 'drag', 'delete'];
  }

}



/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Swagger {
  constructor() {
    _defineProperty(this, "_apiBase", 'http://158.101.166.74:8080/api/data/prokofievaK/event');

    _defineProperty(this, "postNewEvent", async eventObj => {
      return await this.getResource('POST', {
        method: 'POST',
        body: `{"data": "${JSON.stringify(eventObj).replace(/"/g, '\\"')}",\n  "id": "test11"}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    });

    _defineProperty(this, "getAllEvents", async () => {
      const result = await this.getResource('GET');
      return result.map(this._transformEvents);
    });

    _defineProperty(this, "deleteEvent", async eventId => {
      const result = await this.getResource('DELETE', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json'
        }
      }, `/${eventId}`);
    });

    _defineProperty(this, "putEvent", async (eventId, eventObj) => {
      const result = await this.getResource('PUT', {
        method: 'PUT',
        body: `{"data": "${JSON.stringify(eventObj).replace(/"/g, '\\"')}",\n  "id": "test11"}`,
        headers: {
          Accept: 'application/json'
        }
      }, `/${eventId}`);
      return this._transformEvent(result);
    });

    _defineProperty(this, "_transformEvents", event => {
      const {
        eventText,
        day,
        time,
        participants
      } = JSON.parse(event.data);
      return {
        id: event.id,
        eventText,
        day,
        time,
        participants
      };
    });

    _defineProperty(this, "_transformEvent", res => {
      const {
        eventText,
        day,
        time,
        participants
      } = JSON.parse(res.data);
      return {
        eventText,
        day,
        time,
        participants
      };
    });
  }

  async getResource(requestType, fetchParamsObj = {}, id = '') {
    try {
      const res = await fetch(`${this._apiBase}${id}`, fetchParamsObj);

      if (!res.ok) {
        (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.showNotification)('alert-api-fail', `${requestType} request failed`);
        throw new Error(`Could not fetch ${this._apiBase}/${id}, received ${res.status}`);
      }

      (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.showNotification)('alert-api-ok', `${requestType} request was successful`);
      let responseBody;

      if (fetchParamsObj.method === 'DELETE') {
        responseBody = await res.text();
      } else {
        responseBody = await res.json();
      }

      return responseBody;
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

const swagger = new Swagger();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (swagger);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _rendering_rendering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _users_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);








const startApplication = () => {
  const cancelButton = document.querySelector('#cancel');
  const filter = document.querySelector('.users-filter');
  const table = document.querySelector('.table');
  const alert = document.querySelector('.alert-event');
  const eventText = document.querySelector('#inputNameEvent');
  const form = document.querySelector('#form');
  const day = document.querySelector('#day');
  const time = document.querySelector('#time');
  const myModalEl = document.getElementById('staticBackdrop');
  const authModalEl = document.getElementById('auth');
  const participants = document.querySelector('#participants');
  const newEvent = document.querySelector('.new-event');
  const confirmDelete = document.querySelector('.confirm-delete');
  const calendarContainer = document.querySelector('.container-calendar');
  const newEventContainer = document.querySelector('.container-newEvent');
  const confirmAuth = document.querySelector('.confirm-auth');
  const authSelect = document.querySelector('.auth-select');
  const modal = new bootstrap.Modal(myModalEl, {
    backdrop: true
  });
  const authModal = new bootstrap.Modal(authModalEl, {
    backdrop: 'static',
    keyboard: false
  });
  let currentEvents = [];
  let selectedEvent = {};
  let draggedElIndex = null;
  let authUser = null;
  let userObj = null;

  const onClickConfirmAuth = () => {
    authUser = authSelect.value;
    authModal.hide();
    const userType = _config__WEBPACK_IMPORTED_MODULE_3__.default.find(user => user.name === authUser).type;

    if (userType === 'user') {
      let user = new _users_users__WEBPACK_IMPORTED_MODULE_4__.User(authUser);
      userObj = user;
    } else if (userType === 'admin') {
      let user = new _users_users__WEBPACK_IMPORTED_MODULE_4__.Admin(authUser);
      userObj = user;
    }

    onAuthComplete(userObj);
  };

  const renderEventsFromServer = async () => {
    currentEvents = await _api_api__WEBPACK_IMPORTED_MODULE_5__.default.getAllEvents();

    if (currentEvents.length) {
      (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.renderFilteredEvents)(currentEvents);
    }
  };

  renderEventsFromServer();

  const onAuthComplete = user => {
    if (user.can('create-event') && user.can('drag') && user.can('delete')) {
      (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.renderFilteredEvents)(currentEvents);
    } else {
      (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.renderFilteredEventsForUser)(currentEvents);
      newEvent.classList.add('hidden');
    }
  }; // auth pop-up functionality


  authModal.show(); // drag and drop functionality

  const drag = event => {
    if (!event.target.classList.contains('event')) return;
    const draggedElemId = event.target.id;
    const elemClass = event.target.parentElement.className;
    const elemClassArray = elemClass.split('-');
    const index = currentEvents.findIndex(event => event.day === elemClassArray[1] && event.time === elemClassArray[2]);
    draggedElIndex = index;
    event.dataTransfer.setData('text/plain', draggedElemId);
  };

  for (const dropZone of [...document.querySelectorAll('td')]) {
    dropZone.addEventListener('dragover', e => {
      if (dropZone.childElementCount !== 0) return;
      e.preventDefault();
    });
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      const draggedElemId = e.dataTransfer.getData('text/plain');
      const draggedElem = document.getElementById(`${draggedElemId}`);
      dropZone.append(draggedElem);
      const classNamesArrayOfNewCell = dropZone.className.split('-');
      const newEvent = { ...currentEvents[draggedElIndex],
        day: classNamesArrayOfNewCell[1],
        time: classNamesArrayOfNewCell[2]
      };
      const eventApiId = currentEvents[draggedElIndex].id;
      _api_api__WEBPACK_IMPORTED_MODULE_5__.default.putEvent(eventApiId, newEvent).then(() => {
        currentEvents.push(newEvent);
        currentEvents.splice(draggedElIndex, 1);
      });
    });
  }

  const onSubmitCreateButton = event => {
    event.preventDefault();

    if (!(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.isValid)(eventText, participants, day, time)) {
      return;
    }

    const selectedParticipants = document.querySelectorAll('#participants option:checked');
    const participantsValue = Array.from(selectedParticipants).map(el => el.value);
    const newEvent = {
      eventText: eventText.value,
      participants: participantsValue,
      day: day.value,
      time: time.value
    };

    if ((0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.isEventDuplicated)(newEvent, currentEvents)) {
      (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.showNotification)('alert-event', 'Failed to create an event. Time slot is already booked.');
      return;
    }

    _api_api__WEBPACK_IMPORTED_MODULE_5__.default.postNewEvent(newEvent).then(event => {
      currentEvents.push({ ...newEvent,
        id: event.id
      });
      (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.renderEvent)(newEvent);
      (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.showCalendarContainer)(calendarContainer, newEventContainer);
    });
  };

  const onClickNewEventButton = () => {
    form.reset();
    filter.value = 'All members';
    (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.renderFilteredEvents)(currentEvents);
    alert.classList.add('hidden');
    calendarContainer.classList.add('hidden');
    newEventContainer.classList.remove('hidden');
  };

  const onClickDeleteEvent = event => {
    if (!event.target.classList.contains('delete-event')) return;
    const cell = event.target.closest('.event');
    const cellClass = cell.parentElement.classList[0].split('-');
    const cellEventText = cell.firstChild.data.trim();
    const index = currentEvents.findIndex(event => event.day === cellClass[1] && event.time === cellClass[2]);
    selectedEvent = {
      cell,
      index,
      id: currentEvents[index].id
    };
    document.querySelector('.modal-body').innerText = `Are you sure you want to delete "${cellEventText}" event?`;
    modal.show();
  };

  const onClickConfirmDeleteEvent = () => {
    const {
      cell,
      index,
      id
    } = selectedEvent;
    modal.hide();
    _api_api__WEBPACK_IMPORTED_MODULE_5__.default.deleteEvent(id).then(() => {
      currentEvents.splice(index, 1);
      cell.innerHTML = '';
      cell.classList.remove('event');
      cell.setAttribute('draggable', false);
    });
  };

  const onClickFilterParticipant = () => {
    const filteredEvents = currentEvents.filter(event => {
      if (event.participants.includes(filter.value)) {
        return event;
      }

      return;
    });
    (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.deleteAllEvents)(currentEvents);

    if (filter.value === 'All members') {
      return (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.renderFilteredEvents)(currentEvents);
    }

    (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.renderFilteredEvents)(filteredEvents);
  };

  form.addEventListener('submit', onSubmitCreateButton);
  cancelButton.addEventListener('click', () => (0,_rendering_rendering__WEBPACK_IMPORTED_MODULE_2__.showCalendarContainer)(calendarContainer, newEventContainer));
  newEvent.addEventListener('click', onClickNewEventButton);
  table.addEventListener('click', onClickDeleteEvent);
  filter.addEventListener('change', onClickFilterParticipant);
  confirmDelete.addEventListener('click', onClickConfirmDeleteEvent);
  confirmAuth.addEventListener('click', onClickConfirmAuth);
  table.addEventListener('dragstart', drag);
};

startApplication();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map