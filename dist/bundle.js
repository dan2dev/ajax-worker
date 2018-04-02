/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var String;
(function (String) {
    function replaceAll(value, search, replacement) {
        return value.split(search).join(replacement);
    }
    String.replaceAll = replaceAll;
    function pathArray(path) {
        return path.split(".");
    }
    String.pathArray = pathArray;
    function stripNonNumber(value) {
        return value.replace(/[^0-9]/g, "");
    }
    String.stripNonNumber = stripNonNumber;
})(String = exports.String || (exports.String = {}));
exports.default = String;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Event;
(function (Event) {
    function once(target, type, listener) {
        var fn = function (ev) {
            target.removeEventListener(type, fn);
            listener(ev);
        };
        target.addEventListener(type, fn);
    }
    Event.once = once;
    function bind(target, type, listener) {
        var fn = function (ev) {
            listener(ev);
        };
        target.addEventListener(type, fn);
    }
    Event.bind = bind;
    // passive supported
    var passiveSupported = false;
    function passive() {
        return (passiveSupported ? { passive: true } : false);
    }
    Event.passive = passive;
    (function Initialize() {
        var _this = this;
        // detect if suport passive event
        try {
            var options = Object.defineProperty({}, "passive", {
                get: function () {
                    _this.passiveSupported = true;
                },
            });
            window.addEventListener("test", null, options);
        }
        catch (err) {
            //
        }
    })();
})(Event = exports.Event || (exports.Event = {}));
exports.default = Event;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_work__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utility_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utility_collection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_utility_collection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_uniqid__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_uniqid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_uniqid__);

const resolveRelative = __webpack_require__(5);
const newHashFrom = __webpack_require__(13);


// // console.log("ajax-worker");
class AjaxWorker {
}
/* harmony export (immutable) */ __webpack_exports__["AjaxWorker"] = AjaxWorker;

(function (AjaxWorker) {
    const nocache = "ajaxworkercache";
    // shared Methods -------------------
    const sharedMethods = {
        onDone: (args) => {
            const options = args[0];
            fetchDone(options);
        },
        onAbort: (args) => {
            const options = args[0];
            fetchAbort(options);
        },
        clean: () => {
            fetchClean();
        },
    };
    function execute(actionName, args) {
        getWorker().postMessage({
            method: actionName,
            args,
        });
    }
    // worker -------------------
    let urlWorker;
    let worker;
    function getWorkerScript() {
        return "(" + __WEBPACK_IMPORTED_MODULE_0__ajax_work__["a" /* default */].Worker.toString() + ")();";
    }
    function getUrlWorker() {
        if (urlWorker === undefined) {
            const blobData = new Blob([getWorkerScript()], {
                type: "application/javascript",
            });
            urlWorker = window.URL.createObjectURL(blobData);
        }
        return urlWorker;
    }
    function getWorker() {
        if (worker === undefined) {
            worker = new Worker(getUrlWorker());
            worker.onmessage = (event) => {
                sharedMethods[event.data.method](event.data.args);
            };
        }
        return worker;
    }
    // fetch ---------------------------------------------------
    let lastId = 0;
    function getId(id) {
        lastId = lastId + 1;
        if (id !== undefined && id !== null) {
            return id;
        }
        else {
            return lastId.toString();
        }
    }
    function getHash(obj) {
        const newOBj = Object.assign({}, obj);
        for (const key in newOBj) {
            if (typeof newOBj[key] === "function") {
                delete newOBj[key];
            }
        }
        return newHashFrom(newOBj);
    }
    let callbackStackOptions = {};
    function fetchDone(options) {
        // remove cache url
        const newUrl = new __WEBPACK_IMPORTED_MODULE_1_utility_collection__["Url"](options.url);
        newUrl.deleteQuery(nocache);
        options.url = newUrl.toString();
        const newUrlRedirect = new __WEBPACK_IMPORTED_MODULE_1_utility_collection__["Url"](options.url);
        newUrlRedirect.deleteQuery(nocache);
        options.urlRedirected = newUrlRedirect.toString();
        // remove cache url end
        if (callbackStackOptions[options.hash] !== undefined) {
            const item = callbackStackOptions[options.hash];
            if (options.error === true) {
                if (item.onError !== undefined) {
                    item.onError(options);
                }
            }
            else {
                if (item.onSuccess !== undefined) {
                    item.onSuccess(options);
                }
            }
            if (item.onDone !== undefined) {
                item.onDone(options);
            }
            // callbackStackOptions[options.hash] = undefined;
            // delete callbackStackOptions[options.hash];
        }
    }
    function fetchAbort(options) {
        if (callbackStackOptions[options.hash] !== undefined) {
            const item = callbackStackOptions[options.hash];
            if (options.abort === true && item.onAbort !== undefined) {
                item.onAbort(options);
            }
            // callbackStackOptions[options.hash] = undefined;
            // delete callbackStackOptions[options.hash];
        }
    }
    function fetchClean() {
        callbackStackOptions = {};
    }
    function fetch(options) {
        // default options ---------------------------
        const defaultOptions = {
            url: null,
            method: "GET",
            returnType: "json",
            cache: "no-cache",
            credentials: "include",
            // keepalive: true,
            referrerPolicy: "no-referrer",
            mode: "cors",
            sync: true,
            id: null,
            abort: false,
        };
        // new options ---------------------------------------
        const newOptions = Object.assign(defaultOptions, options);
        // fix body if string
        if (typeof newOptions.body !== "string") {
            newOptions.body = JSON.stringify(newOptions.body);
        }
        // console.log(newOptions);
        // ---------
        newOptions.url = resolveRelative(newOptions.url, window.location.origin); // get url
        newOptions.hash = getHash(newOptions); // get hadh
        newOptions.id = getId(newOptions.id); // get id
        // url no cache -------
        const url = new __WEBPACK_IMPORTED_MODULE_1_utility_collection__["Url"](newOptions.url);
        url.setQuery(nocache, Object(__WEBPACK_IMPORTED_MODULE_2_uniqid__["process"])());
        newOptions.url = url.toString();
        // --------------
        // add to callbackStack -------------------------------
        callbackStackOptions[newOptions.hash] = (Object.assign({}, newOptions));
        for (const key in newOptions) {
            if (typeof newOptions[key] === "function") {
                delete newOptions[key];
            }
        }
        // console.log(newOptions);
        execute("fetch", [newOptions]);
    }
    AjaxWorker.fetch = fetch;
    // init -------------------------------------------------------
    function init() {
        // console.log("ajax worker -- ");
        // console.log("ajax working");
        const w = window;
        if (w["ajaxWorker"] === undefined) {
            w["ajaxWorker"] = this;
        }
    }
    AjaxWorker.init = init;
    // export function nothing(): void {
    // 	console.log("did nothing");
    // 	//
    // }
})(AjaxWorker || (AjaxWorker = {}));
AjaxWorker.init();
// --------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (AjaxWorker);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AjaxWork */
var AjaxWork;
(function (AjaxWork) {
    // The fuction bellow will be executed in worker
    // use it to execute the thread
    function Worker() {
        const locationOrigin = null;
        const sharedMethods = {
            orderStack: {},
            init: (args) => {
                this.locationOrigin = args[0];
            },
            fetch: (args) => {
                const options = args[0];
                ajax(options);
            },
        };
        // ajax fetch ------------------------------
        let syncResponse = {};
        const syncRequestStack = [];
        function sendBack(options) {
            if (options.sync === true) {
                // store in the response store -----------------
                syncResponse[options.hash] = options;
                // loop in the requests ----------------
                while (syncRequestStack.length > 0) {
                    if (syncRequestStack[0].abort === true) {
                        execute("onAbort", [syncRequestStack[0]]);
                        syncRequestStack.shift();
                    }
                    else {
                        if (syncResponse[syncRequestStack[0].hash] === undefined) {
                            break;
                        }
                        else {
                            const r = syncResponse[syncRequestStack[0].hash];
                            execute("onDone", [r]);
                            syncRequestStack.shift();
                        }
                    }
                }
                // clean the syncResponse
                if (syncRequestStack.length === 0) {
                    syncResponse = {};
                    execute("clean", []);
                }
            }
            else {
                execute("onDone", [options]);
            }
        }
        function ajaxRequestStackPush(options) {
            if (options.sync === true) {
                for (const i of syncRequestStack) {
                    if (options.id === i.id || options.hash === i.hash) {
                        i.abort = true;
                    }
                }
                syncRequestStack.push(options);
            }
        }
        function ajax(options) {
            const fetchReturn = {
                id: options.id,
                url: options.url,
                status: 404,
                returnType: options.returnType,
                statusText: "Error on Ajax-Worker!",
                data: null,
                headers: [],
                redirected: false,
                urlRedirected: null,
                errorMessage: null,
                error: false,
                sync: options.sync,
                hash: options.hash,
            };
            // sync ----------------------------
            // fetch ---------------------------
            ajaxRequestStackPush(options);
            const fetchPromise = fetch(options.url, options)
                .then((response) => {
                fetchReturn.status = response.status;
                fetchReturn.statusText = response.statusText;
                fetchReturn.urlRedirected = response.url;
                fetchReturn.redirected = (fetchReturn.urlRedirected !== fetchReturn.url);
                fetchReturn.headers = response.headers;
                fetchReturn.headers = [];
                response.headers.forEach((value, key) => {
                    fetchReturn.headers.push([key, value]);
                });
                const headerContentType = response.headers.get("content-type");
                let contentType = "text";
                if (headerContentType && (headerContentType.includes("application/json") || headerContentType.includes("text/json"))) {
                    contentType = "json";
                }
                else {
                    contentType = "text";
                }
                // -------------------------------
                if (contentType === "text") {
                    fetchReturn.returnType = "text";
                    return response.text();
                }
                else if (contentType === "json") {
                    fetchReturn.returnType = "json";
                    return response.json();
                }
            })
                .then((data) => {
                fetchReturn.data = data;
                sendBack(fetchReturn);
            })
                .catch((error) => {
                fetchReturn.errorMessage = error;
                fetchReturn.error = true;
                sendBack(fetchReturn);
            });
        }
        // same functions here
        function execute(actionName, args) {
            self.postMessage({
                method: actionName,
                args,
            });
        }
        self.onmessage = (event) => {
            const args = event.data.args;
            sharedMethods[event.data.method](args);
        };
    }
    AjaxWork.Worker = Worker;
})(AjaxWork || (AjaxWork = {}));
/* harmony default export */ __webpack_exports__["a"] = (AjaxWork);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var url = __webpack_require__(6);
var pat = /^https?:\/\//i;

exports = module.exports = function(link, source) {
  if (!link) return source;
  if (!source) return;
  return !pat.test(link) ? url.resolve(source, link) : link;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(7);
var util = __webpack_require__(9);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(10);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module), __webpack_require__(8)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(11);
exports.encode = exports.stringify = __webpack_require__(12);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.objectHash=e()}}(function(){return function e(t,n,r){function o(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return require(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(r,o,i,u,a,f,s,c,l){"use strict";function d(e,t){return t=h(e,t),y(e,t)}function h(e,t){if(t=t||{},t.algorithm=t.algorithm||"sha1",t.encoding=t.encoding||"hex",t.excludeValues=!!t.excludeValues,t.algorithm=t.algorithm.toLowerCase(),t.encoding=t.encoding.toLowerCase(),t.ignoreUnknown=t.ignoreUnknown===!0,t.respectType=t.respectType!==!1,t.respectFunctionNames=t.respectFunctionNames!==!1,t.respectFunctionProperties=t.respectFunctionProperties!==!1,t.unorderedArrays=t.unorderedArrays===!0,t.unorderedSets=t.unorderedSets!==!1,t.replacer=t.replacer||void 0,t.excludeKeys=t.excludeKeys||void 0,"undefined"==typeof e)throw new Error("Object argument required.");for(var n=0;n<v.length;++n)v[n].toLowerCase()===t.algorithm.toLowerCase()&&(t.algorithm=v[n]);if(v.indexOf(t.algorithm)===-1)throw new Error('Algorithm "'+t.algorithm+'"  not supported. supported values: '+v.join(", "));if(m.indexOf(t.encoding)===-1&&"passthrough"!==t.algorithm)throw new Error('Encoding "'+t.encoding+'"  not supported. supported values: '+m.join(", "));return t}function p(e){if("function"!=typeof e)return!1;var t=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;return null!=t.exec(Function.prototype.toString.call(e))}function y(e,t){var n;n="passthrough"!==t.algorithm?b.createHash(t.algorithm):new w,"undefined"==typeof n.write&&(n.write=n.update,n.end=n.update);var r=g(t,n);if(r.dispatch(e),n.update||n.end(""),n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var o=n.read();return"buffer"===t.encoding?o:o.toString(t.encoding)}function g(e,t,n){n=n||[];var r=function(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")};return{dispatch:function(t){e.replacer&&(t=e.replacer(t));var n=typeof t;return null===t&&(n="null"),this["_"+n](t)},_object:function(t){var o=/\[object (.*)\]/i,u=Object.prototype.toString.call(t),a=o.exec(u);a=a?a[1]:"unknown:["+u+"]",a=a.toLowerCase();var f=null;if((f=n.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(n.push(t),"undefined"!=typeof i&&i.isBuffer&&i.isBuffer(t))return r("buffer:"),r(t);if("object"===a||"function"===a){var s=Object.keys(t).sort();e.respectType===!1||p(t)||s.splice(0,0,"prototype","__proto__","constructor"),e.excludeKeys&&(s=s.filter(function(t){return!e.excludeKeys(t)})),r("object:"+s.length+":");var c=this;return s.forEach(function(n){c.dispatch(n),r(":"),e.excludeValues||c.dispatch(t[n]),r(",")})}if(!this["_"+a]){if(e.ignoreUnknown)return r("["+a+"]");throw new Error('Unknown object type "'+a+'"')}this["_"+a](t)},_array:function(t,o){o="undefined"!=typeof o?o:e.unorderedArrays!==!1;var i=this;if(r("array:"+t.length+":"),!o||t.length<=1)return t.forEach(function(e){return i.dispatch(e)});var u=[],a=t.map(function(t){var r=new w,o=n.slice(),i=g(e,r,o);return i.dispatch(t),u=u.concat(o.slice(n.length)),r.read().toString()});return n=n.concat(u),a.sort(),this._array(a,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e)},_function:function(t){r("fn:"),p(t)?this.dispatch("[native]"):this.dispatch(t.toString()),e.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString(),"utf8")},_map:function(t){r("map:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_set:function(t){r("set:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function w(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}var b=e("crypto");n=t.exports=d,n.sha1=function(e){return d(e)},n.keys=function(e){return d(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return d(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return d(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var v=b.getHashes?b.getHashes().slice():["sha1","md5"];v.push("passthrough");var m=["buffer","hex","binary","base64"];n.writeToStream=function(e,t,n){return"undefined"==typeof n&&(n=t,t={}),t=h(e,t),g(t,n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_15f7e235.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===l?62:t===u||t===d?63:t<a?-1:t<a+10?t-a+26+26:t<s+26?t-s:t<f+26?t-f+26:void 0}function n(e){function n(e){s[l++]=e}var r,i,u,a,f,s;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var c=e.length;f="="===e.charAt(c-2)?2:"="===e.charAt(c-1)?1:0,s=new o(3*e.length/4-f),u=f>0?e.length-4:e.length;var l=0;for(r=0,i=0;r<u;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===f?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===f&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),s}function r(e){function t(e){return c.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,u=e.length%3,a="";for(r=0,i=e.length-u;r<i;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],a+=n(o);switch(u){case 1:o=e[e.length-1],a+=t(o>>2),a+=t(o<<4&63),a+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],a+=t(o>>10),a+=t(o>>4&63),a+=t(o<<2&63),a+="="}return a}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),u="/".charCodeAt(0),a="0".charCodeAt(0),f="a".charCodeAt(0),s="A".charCodeAt(0),l="-".charCodeAt(0),d="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=N(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=F(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=F(e.length)}var u;o._useTypedArrays?u=o._augment(new Uint8Array(i)):(u=this,u.length=i,u._isBuffer=!0);var a;if(o._useTypedArrays&&"number"==typeof e.byteLength)u._set(e);else if(O(e))for(a=0;a<i;a++)o.isBuffer(e)?u[a]=e.readUInt8(a):u[a]=e[a];else if("string"===r)u.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;a<i;a++)u[a]=0;return u}function l(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var u=t.length;$(u%2===0,"Invalid hex string"),r>u/2&&(r=u/2);for(var a=0;a<r;a++){var f=parseInt(t.substr(2*a,2),16);$(!isNaN(f),"Invalid hex string"),e[n+a]=f}return o._charsWritten=2*a,a}function d(e,t,n,r){var i=o._charsWritten=W(V(t),e,n,r);return i}function h(e,t,n,r){var i=o._charsWritten=W(q(t),e,n,r);return i}function p(e,t,n,r){return h(e,t,n,r)}function y(e,t,n,r){var i=o._charsWritten=W(R(t),e,n,r);return i}function g(e,t,n,r){var i=o._charsWritten=W(P(t),e,n,r);return i}function w(e,t,n){return 0===t&&n===e.length?G.fromByteArray(e):G.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=J(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+J(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function m(e,t,n){return v(e,t,n)}function _(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;i++)o+=H(e[i]);return o}function E(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],t+1<o&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<o&&(i|=e[t+1])),i}}function A(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(t+2<o&&(i=e[t+2]<<16),t+1<o&&(i|=e[t+1]<<8),i|=e[t],t+3<o&&(i+=e[t+3]<<24>>>0)):(t+1<o&&(i=e[t+1]<<16),t+2<o&&(i|=e[t+2]<<8),t+3<o&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function B(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=I(e,t,n,!0),u=32768&i;return u?(65535-i+1)*-1:i}}function L(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=A(e,t,n,!0),u=2147483648&i;return u?(4294967295-i+1)*-1:i}}function U(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+3<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,23,4)}function x(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+7<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,52,8)}function S(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"trying to write beyond buffer length"),K(t,65535));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function C(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"trying to write beyond buffer length"),K(t,4294967295));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function j(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"Trying to write beyond buffer length"),z(t,32767,-32768));var i=e.length;n>=i||(t>=0?S(e,t,n,r,o):S(e,65535+t+1,n,r,o))}function k(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),z(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?C(e,t,n,r,o):C(e,4294967295+t+1,n,r,o))}function T(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),X(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Q.write(e,t,n,r,23,4)}function M(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+7<e.length,"Trying to write beyond buffer length"),X(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Q.write(e,t,n,r,52,8)}function N(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Y(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function F(e){return e=~~Math.ceil(+e),e<0?0:e}function D(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function O(e){return D(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function V(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function q(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function P(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function R(e){return G.toByteArray(e)}function W(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function J(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function K(e,t){$("number"==typeof e,"cannot write a non-number as a number"),$(e>=0,"specified a negative value for writing an unsigned value"),$(e<=t,"value is larger than maximum value for type"),$(Math.floor(e)===e,"value has a fractional component")}function z(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value"),$(Math.floor(e)===e,"value has a fractional component")}function X(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value")}function $(e,t){if(!e)throw new Error(t||"Failed assertion")}var G=e("base64-js"),Q=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=V(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=R(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if($(D(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var u=e[n];u.copy(r,i),i+=u.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var u;switch(r){case"hex":u=l(this,e,t,n);break;case"utf8":case"utf-8":u=d(this,e,t,n);break;case"ascii":u=h(this,e,t,n);break;case"binary":u=p(this,e,t,n);break;case"base64":u=y(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":u=g(this,e,t,n);break;default:throw new Error("Unknown encoding")}return u},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=_(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=m(r,t,n);break;case"base64":o=w(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=E(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){$(r>=n,"sourceEnd < sourceStart"),$(t>=0&&t<e.length,"targetStart out of bounds"),$(n>=0&&n<i.length,"sourceStart out of bounds"),$(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var u=r-n;if(u<100||!o._useTypedArrays)for(var a=0;a<u;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+u),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=Y(e,n,0),t=Y(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,(void 0),(!0)),u=0;u<r;u++)i[u]=this[u+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return I(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return I(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return A(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?(255-this[e]+1)*-1:this[e]}},o.prototype.readInt16LE=function(e,t){return B(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return B(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return L(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return U(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return U(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return x(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return x(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"trying to write beyond buffer length"),K(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"Trying to write beyond buffer length"),z(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){j(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){j(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){T(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){T(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){M(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){M(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),$("number"==typeof e&&!isNaN(e),"value is not a number"),$(n>=t,"end < start"),n!==t&&0!==this.length){$(t>=0&&t<this.length,"start out of bounds"),$(n>=0&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=H(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var Z=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=Z.get,e.set=Z.set,e.write=Z.write,e.toString=Z.toString,e.toLocaleString=Z.toString,e.toJSON=Z.toJSON,e.copy=Z.copy,e.slice=Z.slice,e.readUInt8=Z.readUInt8,e.readUInt16LE=Z.readUInt16LE,e.readUInt16BE=Z.readUInt16BE,e.readUInt32LE=Z.readUInt32LE,e.readUInt32BE=Z.readUInt32BE,e.readInt8=Z.readInt8,e.readInt16LE=Z.readInt16LE,e.readInt16BE=Z.readInt16BE,e.readInt32LE=Z.readInt32LE,e.readInt32BE=Z.readInt32BE,e.readFloatLE=Z.readFloatLE,e.readFloatBE=Z.readFloatBE,e.readDoubleLE=Z.readDoubleLE,e.readDoubleBE=Z.readDoubleBE,e.writeUInt8=Z.writeUInt8,e.writeUInt16LE=Z.writeUInt16LE,e.writeUInt16BE=Z.writeUInt16BE,e.writeUInt32LE=Z.writeUInt32LE,e.writeUInt32BE=Z.writeUInt32BE,e.writeInt8=Z.writeInt8,e.writeInt16LE=Z.writeInt16LE,e.writeInt16BE=Z.writeInt16BE,e.writeInt32LE=Z.writeInt32LE,e.writeInt32BE=Z.writeInt32BE,e.writeFloatLE=Z.writeFloatLE,e.writeFloatBE=Z.writeFloatBE,e.writeDoubleLE=Z.writeDoubleLE,e.writeDoubleBE=Z.writeDoubleBE,e.fill=Z.fill,e.inspect=Z.inspect,e.toArrayBuffer=Z.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){if(e.length%p!==0){var n=e.length+(p-e.length%p);e=o.concat([e,y],n)}for(var r=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=p)r.push(i.call(e,u));return r}function d(e,t,n){for(var r=new o(t),i=n?r.writeInt32BE:r.writeInt32LE,u=0;u<e.length;u++)i.call(r,e[u],4*u,!0);return r}function h(e,t,n,r){o.isBuffer(e)||(e=new o(e));var i=t(l(e,r),e.length*g);return d(i,n,r)}var o=e("buffer").Buffer,p=4,y=new o(p);y.fill(0);var g=8;t.exports={hash:h}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function l(e,t,n){o.isBuffer(t)||(t=new o(t)),o.isBuffer(n)||(n=new o(n)),t.length>m?t=e(t):t.length<m&&(t=o.concat([t,_],m));for(var r=new o(m),i=new o(m),u=0;u<m;u++)r[u]=54^t[u],i[u]=92^t[u];var a=e(o.concat([r,n]));return e(o.concat([i,a]))}function d(e,t){e=e||"sha1";var n=v[e],r=[],i=0;return n||h("algorithm:",e,"is not yet supported"),{update:function(e){return o.isBuffer(e)||(e=new o(e)),r.push(e),i+=e.length,this},digest:function(e){var i=o.concat(r),u=t?l(n,t,i):n(i);return r=null,e?u.toString(e):u}}}function h(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function p(e,t){for(var n in e)t(e[n],n)}var o=e("buffer").Buffer,y=e("./sha"),g=e("./sha256"),w=e("./rng"),b=e("./md5"),v={sha1:y,sha256:g,md5:b},m=64,_=new o(m);_.fill(0),n.createHash=function(e){return d(e)},n.createHmac=function(e,t){return d(e,t)},n.randomBytes=function(e,t){if(!t||!t.call)return new o(w(e));try{t.call(this,void 0,new o(w(e)))}catch(n){t(n)}},p(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){n[e]=function(){h("sorry,",e,"is not implemented yet")}})}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,f=r,s=o,c=i;n=h(n,r,o,i,e[u+0],7,-680876936),i=h(i,n,r,o,e[u+1],12,-389564586),o=h(o,i,n,r,e[u+2],17,606105819),r=h(r,o,i,n,e[u+3],22,-1044525330),n=h(n,r,o,i,e[u+4],7,-176418897),i=h(i,n,r,o,e[u+5],12,1200080426),o=h(o,i,n,r,e[u+6],17,-1473231341),r=h(r,o,i,n,e[u+7],22,-45705983),n=h(n,r,o,i,e[u+8],7,1770035416),i=h(i,n,r,o,e[u+9],12,-1958414417),o=h(o,i,n,r,e[u+10],17,-42063),r=h(r,o,i,n,e[u+11],22,-1990404162),n=h(n,r,o,i,e[u+12],7,1804603682),i=h(i,n,r,o,e[u+13],12,-40341101),o=h(o,i,n,r,e[u+14],17,-1502002290),r=h(r,o,i,n,e[u+15],22,1236535329),n=p(n,r,o,i,e[u+1],5,-165796510),i=p(i,n,r,o,e[u+6],9,-1069501632),o=p(o,i,n,r,e[u+11],14,643717713),r=p(r,o,i,n,e[u+0],20,-373897302),n=p(n,r,o,i,e[u+5],5,-701558691),i=p(i,n,r,o,e[u+10],9,38016083),o=p(o,i,n,r,e[u+15],14,-660478335),r=p(r,o,i,n,e[u+4],20,-405537848),n=p(n,r,o,i,e[u+9],5,568446438),i=p(i,n,r,o,e[u+14],9,-1019803690),o=p(o,i,n,r,e[u+3],14,-187363961),r=p(r,o,i,n,e[u+8],20,1163531501),n=p(n,r,o,i,e[u+13],5,-1444681467),i=p(i,n,r,o,e[u+2],9,-51403784),o=p(o,i,n,r,e[u+7],14,1735328473),r=p(r,o,i,n,e[u+12],20,-1926607734),n=y(n,r,o,i,e[u+5],4,-378558),i=y(i,n,r,o,e[u+8],11,-2022574463),o=y(o,i,n,r,e[u+11],16,1839030562),r=y(r,o,i,n,e[u+14],23,-35309556),n=y(n,r,o,i,e[u+1],4,-1530992060),i=y(i,n,r,o,e[u+4],11,1272893353),o=y(o,i,n,r,e[u+7],16,-155497632),r=y(r,o,i,n,e[u+10],23,-1094730640),n=y(n,r,o,i,e[u+13],4,681279174),i=y(i,n,r,o,e[u+0],11,-358537222),o=y(o,i,n,r,e[u+3],16,-722521979),r=y(r,o,i,n,e[u+6],23,76029189),n=y(n,r,o,i,e[u+9],4,-640364487),i=y(i,n,r,o,e[u+12],11,-421815835),o=y(o,i,n,r,e[u+15],16,530742520),r=y(r,o,i,n,e[u+2],23,-995338651),n=g(n,r,o,i,e[u+0],6,-198630844),i=g(i,n,r,o,e[u+7],10,1126891415),o=g(o,i,n,r,e[u+14],15,-1416354905),r=g(r,o,i,n,e[u+5],21,-57434055),n=g(n,r,o,i,e[u+12],6,1700485571),i=g(i,n,r,o,e[u+3],10,-1894986606),o=g(o,i,n,r,e[u+10],15,-1051523),r=g(r,o,i,n,e[u+1],21,-2054922799),n=g(n,r,o,i,e[u+8],6,1873313359),i=g(i,n,r,o,e[u+15],10,-30611744),o=g(o,i,n,r,e[u+6],15,-1560198380),r=g(r,o,i,n,e[u+13],21,1309151649),n=g(n,r,o,i,e[u+4],6,-145523070),i=g(i,n,r,o,e[u+11],10,-1120210379),o=g(o,i,n,r,e[u+2],15,718787259),r=g(r,o,i,n,e[u+9],21,-343485551),n=w(n,a),r=w(r,f),o=w(o,s),i=w(i,c)}return Array(n,r,o,i)}function d(e,t,n,r,o,i){return w(b(w(w(t,e),w(r,i)),o),n)}function h(e,t,n,r,o,i,u){return d(t&n|~t&r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return d(t&r|n&~r,e,t,o,i,u)}function y(e,t,n,r,o,i,u){return d(t^n^r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return d(n^(t|~r),e,t,o,i,u)}function w(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function b(e,t){return e<<t|e>>>32-t}var v=e("./helpers");t.exports=function(e){return v.hash(e,l,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){!function(){var e,n,r=this;e=function(e){for(var t,t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},r.crypto&&crypto.getRandomValues&&(n=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),t.exports=n||e}()}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var n=Array(80),r=1732584193,o=-271733879,i=-1732584194,u=271733878,a=-1009589776,f=0;f<e.length;f+=16){for(var s=r,c=o,l=i,g=u,w=a,b=0;b<80;b++){b<16?n[b]=e[f+b]:n[b]=y(n[b-3]^n[b-8]^n[b-14]^n[b-16],1);var v=p(p(y(r,5),d(b,o,i,u)),p(p(a,n[b]),h(b)));a=u,u=i,i=y(o,30),o=r,r=v}r=p(r,s),o=p(o,c),i=p(i,l),u=p(u,g),a=p(a,w)}return Array(r,o,i,u,a)}function d(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function h(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function p(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function y(e,t){return e<<t|e>>>32-t}var g=e("./helpers");t.exports=function(e){return g.hash(e,l,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){var l=e("./helpers"),d=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n},h=function(e,t){return e>>>t|e<<32-t},p=function(e,t){return e>>>t},y=function(e,t,n){return e&t^~e&n},g=function(e,t,n){return e&t^e&n^t&n},w=function(e){return h(e,2)^h(e,13)^h(e,22)},b=function(e){return h(e,6)^h(e,11)^h(e,25)},v=function(e){return h(e,7)^h(e,18)^p(e,3);
},m=function(e){return h(e,17)^h(e,19)^p(e,10)},_=function(e,t){var n,r,o,i,u,a,f,s,c,l,h,p,_=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),E=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),I=new Array(64);e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var c=0;c<e.length;c+=16){n=E[0],r=E[1],o=E[2],i=E[3],u=E[4],a=E[5],f=E[6],s=E[7];for(var l=0;l<64;l++)l<16?I[l]=e[l+c]:I[l]=d(d(d(m(I[l-2]),I[l-7]),v(I[l-15])),I[l-16]),h=d(d(d(d(s,b(u)),y(u,a,f)),_[l]),I[l]),p=d(w(n),g(n,r,o)),s=f,f=a,a=u,u=d(i,h),i=o,o=r,r=n,n=d(h,p);E[0]=d(n,E[0]),E[1]=d(r,E[1]),E[2]=d(o,E[2]),E[3]=d(i,E[3]),E[4]=d(u,E[4]),E[5]=d(a,E[5]),E[6]=d(f,E[6]),E[7]=d(s,E[7])}return E};t.exports=function(e){return l.hash(e,_,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){function c(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=c,e.addListener=c,e.once=c,e.off=c,e.removeListener=c,e.removeAllListeners=c,e.emit=c,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){n.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,f=(1<<a)-1,s=f>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;c>0;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;c>0;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-s;else{if(i===f)return u?NaN:(h?-1:1)*(1/0);u+=Math.pow(2,r),i-=s}return(h?-1:1)*u*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var u,a,f,s=8*i-o-1,c=(1<<s)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,y=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-u))<1&&(u--,f*=2),t+=u+l>=1?d/f:d*Math.pow(2,1-l),t*f>=2&&(u++,f/=2),u+l>=c?(a=0,u=c):u+l>=1?(a=(t*f-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,s+=o;s>0;e[n+h]=255&u,h+=p,u/=256,s-=8);e[n+h-p]|=128*y}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(1));
__export(__webpack_require__(17));
__export(__webpack_require__(18));
__export(__webpack_require__(19));
__export(__webpack_require__(20));
__export(__webpack_require__(2));
var UtilityCollection;
(function (UtilityCollection) {
    var name = "UtilityCollection";
})(UtilityCollection = exports.UtilityCollection || (exports.UtilityCollection = {}));
exports.default = UtilityCollection;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dom;
(function (Dom) {
    function insertBefore(element, targetElement) {
        targetElement.parentElement.insertBefore(element, targetElement);
    }
    Dom.insertBefore = insertBefore;
    function insertAfter(element, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild === targetElement) {
            parent.appendChild(element);
        }
        else {
            parent.insertBefore(element, targetElement.nextSibling);
        }
    }
    Dom.insertAfter = insertAfter;
    function remove(element) {
        if (element.parentElement !== null) {
            element.parentElement.removeChild(element);
        }
    }
    Dom.remove = remove;
    function htmlToNode(html) {
        if (html instanceof Node) {
            return html;
        }
        else {
            var node = document.createElement("div");
            node.innerHTML = html;
            return node.firstElementChild;
        }
    }
    Dom.htmlToNode = htmlToNode;
    function htmlToElement(html) {
        return htmlToNode(html);
    }
    Dom.htmlToElement = htmlToElement;
    // atributes  ---------------------------------------------
    function getAttributes(element) {
        var attrs = element.attributes;
        var newAttr = {};
        for (var i = 0; i < attrs.length; i++) {
            newAttr[attrs[i].name] = attrs[i].value;
        }
        return newAttr;
    }
    Dom.getAttributes = getAttributes;
    // Loops e giros pelo dom --------------------------------------------
    function childElement(node, each) {
        var child = node.firstChild;
        while (child) {
            if (child.nodeType === 1) {
                each(child);
            }
            child = child.nextSibling;
        }
    }
    Dom.childElement = childElement;
    // element down --------------------------
    function nodeDown(node, each) {
        if (each(node, undefined) !== false) {
            this.childNodeDown(node, each);
        }
    }
    Dom.nodeDown = nodeDown;
    function childNodeDown(node, each) {
        var parent = node;
        var child = node.firstChild;
        while (child) {
            var eachReturn = each(child, parent);
            if (eachReturn !== false) {
                this.childNodeDown(child, each);
            }
            child = child.nextSibling;
        }
    }
    Dom.childNodeDown = childNodeDown;
    function elementDown(node, each) {
        if (each(node, undefined) !== false) {
            this.childElementDown(node, each);
        }
    }
    Dom.elementDown = elementDown;
    function childElementDown(node, each) {
        var parent = node;
        var child = node.firstChild;
        while (child) {
            if (child.nodeType === 1) {
                var eachReturn = each(child, parent);
                if (eachReturn !== false) {
                    this.childElementDown(child, each);
                }
            }
            child = child.nextSibling;
        }
    }
    Dom.childElementDown = childElementDown;
    // element up --------------------------
    function elementUp(node, each) {
        if (each(node) !== false) {
            parentElementUp(node, each);
        }
    }
    Dom.elementUp = elementUp;
    function parentElementUp(node, each) {
        var retorno = true;
        var current = node.parentNode;
        do {
            retorno = each(current);
            current = current.parentNode;
        } while (retorno !== false && current !== null && current !== undefined && node.nodeName !== "BODY");
    }
    Dom.parentElementUp = parentElementUp;
    // dom --------------------------
    function attribute(element, each) {
        // TODO: this still need to be tested
        var attributes = element.attributes;
        for (var i = 0; i < attributes.length; i++) {
            each(attributes[i].name, attributes[i].value);
        }
    }
    Dom.attribute = attribute;
    function findNextSibling(target, validation) {
        var current = target.nextSibling;
        while (current !== null) {
            if (validation(current) === true) {
                return current;
            }
            else {
                current = current.nextSibling;
            }
        }
        return null;
    }
    Dom.findNextSibling = findNextSibling;
    function findPrevSibling(target, validation) {
        var current = target.previousSibling;
        while (current !== null) {
            if (validation(current) === true) {
                return current;
            }
            else {
                current = current.previousSibling;
            }
        }
        return null;
    }
    Dom.findPrevSibling = findPrevSibling;
    function findAllSiblings(target) {
        var siblings = [];
        findPrevSibling(target, function (node) {
            siblings.push(node);
            return false;
        });
        findNextSibling(target, function (node) {
            siblings.push(node);
            return false;
        });
        return siblings;
    }
    Dom.findAllSiblings = findAllSiblings;
    function prependChild(parent, child) {
        var firstChild = parent.firstChild;
        if (firstChild === undefined) {
            parent.appendChild(child);
        }
        else {
            parent.insertBefore(child, firstChild);
        }
    }
    Dom.prependChild = prependChild;
    function appendChild(parent, child) {
        parent.appendChild(child);
    }
    Dom.appendChild = appendChild;
    function replaceElement(oldElement, newElement) {
        oldElement.parentElement.replaceChild(newElement, oldElement);
    }
    Dom.replaceElement = replaceElement;
    function swapNodes(n1, n2) {
        var i1;
        var i2;
        var p1 = n1.parentNode;
        var p2 = n2.parentNode;
        if (p1 === undefined || p1 === null) {
            p1 = document.createElement("div");
            p1.appendChild(n1);
        }
        if (p2 === undefined || p2 === null) {
            p2 = document.createElement("div");
            p2.appendChild(n2);
        }
        if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) {
            return;
        }
        for (var i = 0; i < p1.children.length; i++) {
            if (p1.children[i].isEqualNode(n1)) {
                i1 = i;
            }
        }
        for (var i = 0; i < p2.children.length; i++) {
            if (p2.children[i].isEqualNode(n2)) {
                i2 = i;
            }
        }
        if (p1.isEqualNode(p2) && i1 < i2) {
            i2++;
        }
        p1.insertBefore(n2, p1.children[i1]);
        p2.insertBefore(n1, p2.children[i2]);
    }
    Dom.swapNodes = swapNodes;
})(Dom = exports.Dom || (exports.Dom = {}));
exports.default = Dom;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import moment from "moment";
var string_1 = __webpack_require__(1);
// console.log("--> ok");
var Is;
(function (Is) {
    function mobile() {
        if (window.innerWidth < 900) {
            return true;
        }
        else {
            return false;
        }
    }
    Is.mobile = mobile;
    // is null or undefined
    function nullOrUndefined(value) {
        if (value === undefined || value === null) {
            return true;
        }
        else {
            return false;
        }
    }
    Is.nullOrUndefined = nullOrUndefined;
    // id empty
    function empty(value) {
        if (value === undefined || value === null || value === "") {
            return true;
        }
        else {
            return false;
        }
    }
    Is.empty = empty;
    // is Number
    var numberRegex = /\D/;
    function number(value) {
        return !numberRegex.test(value);
    }
    Is.number = number;
    // is Letter
    var letterRegex = /[a-zA-Z]/;
    function letter(value) {
        return letterRegex.test(value);
    }
    Is.letter = letter;
    // --------------------------------
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/m;
    function email(value) {
        return emailRegex.test(value);
    }
    Is.email = email;
    // brazilian validations ----------------------------------------
    // phone
    var brazilianPhoneRegex = /^(?:(?:\+)[0-9]{2}\s?){0,1}(?:\()[0-9]{2}(?:\))\s?[0-9]{0,1}\s?[0-9]{4,}(?:-)[0-9]{4}$/m;
    function brazilianPhone(phone) {
        return brazilianPhoneRegex.test(phone);
    }
    Is.brazilianPhone = brazilianPhone;
    function ddmmyyyy(date) {
        throw new Error("Not implemented.");
        // return moment(date, "DD/MM/YYYY", true).isValid();
    }
    Is.ddmmyyyy = ddmmyyyy;
    function mmddyyyy(date) {
        throw new Error("Not implemented.");
        // return moment(date, "MM/DD/YYYY", true).isValid();
    }
    Is.mmddyyyy = mmddyyyy;
    // CPF
    function cpf(value) {
        value = string_1.default.stripNonNumber(value);
        var numeros;
        var digitos;
        var soma;
        var i;
        var resultado;
        var digitos_iguais;
        digitos_iguais = 1;
        if (value.length < 11) {
            return false;
        }
        for (i = 0; i < value.length - 1; i++) {
            if (value.charAt(i) !== value.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        }
        if (!digitos_iguais) {
            numeros = value.substring(0, 9);
            digitos = value.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--) {
                soma += +(numeros.charAt(10 - i)) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== +(digitos.charAt(0))) {
                return false;
            }
            numeros = value.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--) {
                soma += +(numeros.charAt(11 - i)) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== +(digitos.charAt(1))) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
    Is.cpf = cpf;
    // CNPJ
    function cnpj(value) {
        value = string_1.default.stripNonNumber(value);
        var tamanho;
        var numeros;
        var digitos;
        var soma;
        var pos;
        value = value.replace(/[^\d]+/g, "");
        if (value === "") {
            return false;
        }
        if (value.length !== 14) {
            return false;
        }
        // Elimina CNPJs invalidos conhecidos
        if (value === "00000000000000" ||
            value === "11111111111111" ||
            value === "22222222222222" ||
            value === "33333333333333" ||
            value === "44444444444444" ||
            value === "55555555555555" ||
            value === "66666666666666" ||
            value === "77777777777777" ||
            value === "88888888888888" ||
            value === "99999999999999") {
            return false;
        }
        // Valida DVs
        tamanho = value.length - 2;
        numeros = value.substring(0, tamanho);
        digitos = value.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += +(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== +(digitos.charAt(0))) {
            return false;
        }
        tamanho = tamanho + 1;
        numeros = value.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += +(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== +(digitos.charAt(1))) {
            return false;
        }
        return true;
    }
})(Is = exports.Is || (exports.Is = {}));
exports.default = Is;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Reflection;
(function (Reflection) {
    function merge(base, source) {
        for (var i in source) {
            if (source.hasOwnProperty(i)) {
                base[i] = source[i];
            }
        }
    }
    Reflection.merge = merge;
})(Reflection = exports.Reflection || (exports.Reflection = {}));
exports.default = Reflection;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Url = /** @class */ (function () {
    // -------------------
    function Url(url) {
        var _this = this;
        this.QueryList = {};
        this.staticPath = url.split("#")[0].split("?")[0];
        this.staticQuery = url.indexOf("?") > -1 ? url.split("?")[1].split("#")[0] : null;
        this.staticHash = url.split("#")[1] || null;
        // queryList
        if (this.staticQuery != null) {
            var queryKeyValueList = this.staticQuery.split("&");
            queryKeyValueList.forEach(function (queryKeyValue) {
                var keyValue = queryKeyValue.split("=");
                var key = keyValue[0];
                var value = keyValue[1];
                _this.QueryList[key] = value;
            });
        }
    }
    Url.prototype.setQuery = function (key, value) {
        this.QueryList[key] = value;
        return this;
    };
    Url.prototype.setQueries = function (values) {
        for (var key in values) {
            if (typeof values[key] !== "function" && values[key] !== undefined) {
                this.QueryList[key] = values[key].toString();
            }
        }
        return this;
    };
    Url.prototype.deleteQuery = function (key) {
        this.QueryList[key] = undefined;
        delete this.QueryList[key];
        return this;
    };
    Url.prototype.getQuery = function (key) {
        return this.QueryList[key];
    };
    Url.prototype.toString = function () {
        var queryLength = Object.keys(this.QueryList).length;
        var query = (Object.keys(this.QueryList).length > 0 ? "?" : "");
        for (var key in this.QueryList) {
            if (this.QueryList.hasOwnProperty(key)) {
                queryLength--;
                var value = this.QueryList[key];
                query = query + key + "=" + value;
                if (queryLength > 0) {
                    query = query + "&";
                }
            }
        }
        return this.staticPath + query + (this.staticHash ? this.staticHash : "");
    };
    return Url;
}());
exports.Url = Url;
// export namespace Url {
// 	//
// }
exports.default = Url;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var List;
(function (List) {
    // remove item from list if exist
    function removeFromIndex(list, index) {
        list.splice(index, 1);
        return list;
    }
    List.removeFromIndex = removeFromIndex;
    function removeItem(list, item) {
        var index = list.indexOf(item);
        var newList;
        if (index > -1) {
            newList = removeFromIndex(list, index);
        }
        else {
            newList = list;
        }
        return newList;
    }
    List.removeItem = removeItem;
    function setItem(list, item) {
        var index = list.indexOf(item);
        if (index < 0) {
            list.push(item);
        }
        return list;
    }
    List.setItem = setItem;
})(List = exports.List || (exports.List = {}));
exports.default = List;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = __webpack_require__(2);
exports.DATA_SCROLLABLE = "data-scrollable";
exports.CLASS_FOCUS = "scroll--active";
var ScrollSwitch;
(function (ScrollSwitch) {
    var unfreezeDelay;
    var Scrollable = /** @class */ (function () {
        function Scrollable(element) {
            var _this = this;
            this.element = null;
            this.y = 0;
            this.frozen = false;
            this.unfreezing = false;
            this.element = element;
            if (this.element.getAttribute(exports.DATA_SCROLLABLE) === undefined) {
                this.id = newScrollableId();
                this.element.setAttribute(exports.DATA_SCROLLABLE, this.id);
            }
            else {
                this.id = this.element.getAttribute(exports.DATA_SCROLLABLE);
            }
            // register event
            var unfreezeEvent = function (e) {
                window.scrollTo(0, window.scrollY);
                _this.unfreeze();
            };
            var freezeAllEvent = function (e) {
                freezeAllButId(null);
            };
            element.addEventListener("touchstart", unfreezeEvent, event_1.Event.passive());
            element.addEventListener("mouseenter", unfreezeEvent, event_1.Event.passive());
            element.addEventListener("pointermove", unfreezeEvent, event_1.Event.passive());
            element.addEventListener("mouseleave", freezeAllEvent, event_1.Event.passive());
        }
        Scrollable.prototype.getId = function () {
            return this.id;
        };
        Scrollable.prototype.unfreeze = function () {
            if (this.frozen && !this.unfreezing) {
                this.unfreezing = true;
                freezeAllButId(this.id);
                document.body.style.height = this.element.scrollHeight + "px";
                window.scroll(0, this.y);
                this.element.setAttribute("style", "position: absolute; top: 0; z-index: " + this.element.style.zIndex + "; ");
                this.element.classList.add(exports.CLASS_FOCUS);
                document.body.style.height = "";
                this.y = 0;
                this.frozen = false;
                this.unfreezing = false;
                unfreezeDelay = undefined;
            }
        };
        Scrollable.prototype.freeze = function () {
            if (!this.frozen) {
                this.y = window.scrollY + 0;
                this.element.setAttribute("style", "position: fixed; top: -" + this.y + "px; z-index: " + this.element.style.zIndex + "; ");
                this.element.classList.remove(exports.CLASS_FOCUS);
                this.frozen = true;
            }
        };
        return Scrollable;
    }());
    ScrollSwitch.Scrollable = Scrollable;
    var store = {};
    var lastId = 1;
    function newScrollableId() {
        lastId = lastId + 1;
        return lastId.toString();
    }
    function identifyElement(element) {
        if (element.parentElement !== document.body) {
            return null;
        }
        var id = element.getAttribute(exports.DATA_SCROLLABLE);
        var stored = (id !== undefined) ? (store[id] !== undefined) : false;
        if (stored) {
            return store[id];
        }
        else {
            var s = new Scrollable(element);
            id = s.getId();
            store[id] = s;
            return store[id];
        }
    }
    function freezeElement(element) {
        var scroll = identifyElement(element);
        if (scroll !== null) {
            scroll.freeze();
        }
    }
    ScrollSwitch.freezeElement = freezeElement;
    function freezeAllButId(id) {
        if (id === void 0) { id = null; }
        for (var i in store) {
            if (i !== id) {
                store[i].freeze();
            }
        }
    }
    ScrollSwitch.freezeAllButId = freezeAllButId;
    function freezeAllButElement(element) {
        var scroll = identifyElement(element);
        if (scroll !== null) {
            freezeAllButId(scroll.getId());
        }
    }
    ScrollSwitch.freezeAllButElement = freezeAllButElement;
    function unfreezeElement(element) {
        var scroll = identifyElement(element);
        if (scroll !== null) {
            scroll.unfreeze();
        }
    }
    ScrollSwitch.unfreezeElement = unfreezeElement;
})(ScrollSwitch = exports.ScrollSwitch || (exports.ScrollSwitch = {}));
exports.default = ScrollSwitch;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, module) {/* 
(The MIT License)
Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = process && process.pid ? process.pid.toString(36) : '' ;
var mac =  false ? require('macaddress').one(macHandler) : null ;
var address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;

//  Exports
// ================================================
module.exports         = function(prefix){ return (prefix || '') + address + pid + now().toString(36); }
module.exports.process = function(prefix){ return (prefix || '')           + pid + now().toString(36); }
module.exports.time    = function(prefix){ return (prefix || '')                 + now().toString(36); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

function macHandler(error){
    if(module.parent && module.parent.uniqid_debug){
        if(error) console.error('Info: No mac address - uniqid() falls back to uniqid.process().', error)
        if(pid == '') console.error('Info: No process.pid - uniqid.process() falls back to uniqid.time().')
    }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22), __webpack_require__(0)(module)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjEzNDhmYjZmNTI3MjIxOTNlYjAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy9zdHJpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FqYXgtd29yay50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS1yZWxhdGl2ZS11cmwvbGliLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvdXJsL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3B1bnljb2RlL3B1bnljb2RlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy91cmwvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QtaGFzaC9kaXN0L29iamVjdF9oYXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvZG9tLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL2lzLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL3JlZmxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvdXJsLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL2xpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvc2Nyb2xsLXN3aXRjaC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pcWlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFD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LE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUFBO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7OztBQ3BoQkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7O0FDcEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDZkE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYxMzQ4ZmI2ZjUyNzIyMTkzZWIwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBuYW1lc3BhY2UgU3RyaW5nIHtcclxuXHRleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUFsbCh2YWx1ZTogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgcmVwbGFjZW1lbnQ6IHN0cmluZykge1xyXG5cdFx0cmV0dXJuIHZhbHVlLnNwbGl0KHNlYXJjaCkuam9pbihyZXBsYWNlbWVudCk7XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBwYXRoQXJyYXkocGF0aDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0cmV0dXJuIHBhdGguc3BsaXQoXCIuXCIpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHN0cmlwTm9uTnVtYmVyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKTtcclxuXHR9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFN0cmluZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvc3RyaW5nLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBFdmVudCB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG9uY2UodGFyZ2V0OiBOb2RlLCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiAoZXZlbnQ6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpID0+IHZvaWQpIHtcclxuXHRcdGNvbnN0IGZuID0gKGV2OiBhbnkpID0+IHtcclxuXHRcdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4pO1xyXG5cdFx0XHRsaXN0ZW5lcihldik7XHJcblx0XHR9O1xyXG5cdFx0dGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4pO1xyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gYmluZCh0YXJnZXQ6IE5vZGUsIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IChldmVudDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCkgPT4gdm9pZCkge1xyXG5cdFx0Y29uc3QgZm4gPSAoZXY6IGFueSkgPT4ge1xyXG5cdFx0XHRsaXN0ZW5lcihldik7XHJcblx0XHR9O1xyXG5cdFx0dGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4pO1xyXG5cdH1cclxuXHQvLyBwYXNzaXZlIHN1cHBvcnRlZFxyXG5cdGNvbnN0IHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcclxuXHRleHBvcnQgZnVuY3Rpb24gcGFzc2l2ZSgpOiBhbnkge1xyXG5cdFx0cmV0dXJuIChwYXNzaXZlU3VwcG9ydGVkID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZSk7XHJcblx0fVxyXG5cdChmdW5jdGlvbiBJbml0aWFsaXplKCkge1xyXG5cdFx0Ly8gZGV0ZWN0IGlmIHN1cG9ydCBwYXNzaXZlIGV2ZW50XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInBhc3NpdmVcIiwge1xyXG5cdFx0XHRcdGdldDogKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wYXNzaXZlU3VwcG9ydGVkID0gdHJ1ZTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG51bGwsIG9wdGlvbnMpO1xyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdC8vXHJcblx0XHR9XHJcblx0fSkoKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBFdmVudDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvZXZlbnQudHMiLCJpbXBvcnQgQWpheFdvcmsgZnJvbSBcIi4vYWpheC13b3JrXCI7XHJcbmltcG9ydCB7IElBYnN0cmFjdEZldGNoT3B0aW9ucywgSUNvbXVuaWNhdGlvbiwgSUZldGNoT3B0aW9ucywgSUpzb25BcnJheSwgSUpzb25PYmplY3QsIElSZXF1ZXN0SW5pdCwgSVJlcXVlc3RPcHRpb25zLCBJUmVzcG9uc2VPcHRpb25zLCBJU2hhcmVkTWV0aG9kcyB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuY29uc3QgcmVzb2x2ZVJlbGF0aXZlID0gcmVxdWlyZShcInJlc29sdmUtcmVsYXRpdmUtdXJsXCIpO1xyXG5jb25zdCBuZXdIYXNoRnJvbSA9IHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKTtcclxuaW1wb3J0IHsgVXJsIH0gZnJvbSBcInV0aWxpdHktY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBwcm9jZXNzIH0gZnJvbSBcInVuaXFpZFwiO1xyXG4vLyAvLyBjb25zb2xlLmxvZyhcImFqYXgtd29ya2VyXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFqYXhXb3JrZXIgeyAgfVxyXG5leHBvcnQgbmFtZXNwYWNlIEFqYXhXb3JrZXIge1xyXG5cdGNvbnN0IG5vY2FjaGUgPSBcImFqYXh3b3JrZXJjYWNoZVwiO1xyXG5cdC8vIHNoYXJlZCBNZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRjb25zdCBzaGFyZWRNZXRob2RzOiB7IFthY3Rpb246IHN0cmluZ106IGFueSB9ID0ge1xyXG5cdFx0b25Eb25lOiAoYXJnczogYW55W10pID0+IHtcclxuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGFyZ3NbMF0gYXMgSVJlc3BvbnNlT3B0aW9uczxhbnk+O1xyXG5cdFx0XHRmZXRjaERvbmUob3B0aW9ucyk7XHJcblx0XHR9LFxyXG5cdFx0b25BYm9ydDogKGFyZ3M6IGFueVtdKSA9PiB7XHJcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSBhcmdzWzBdIGFzIElSZXF1ZXN0T3B0aW9ucztcclxuXHRcdFx0ZmV0Y2hBYm9ydChvcHRpb25zKTtcclxuXHRcdH0sXHJcblx0XHRjbGVhbjogKCkgPT4ge1xyXG5cdFx0XHRmZXRjaENsZWFuKCk7XHJcblx0XHR9LFxyXG5cdH07XHJcblx0ZnVuY3Rpb24gZXhlY3V0ZShhY3Rpb25OYW1lOiBzdHJpbmcsIGFyZ3M6IEFycmF5PElKc29uT2JqZWN0IHwgSUpzb25BcnJheSB8IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBhbnk+KSB7XHJcblx0XHRnZXRXb3JrZXIoKS5wb3N0TWVzc2FnZSh7XHJcblx0XHRcdG1ldGhvZDogYWN0aW9uTmFtZSxcclxuXHRcdFx0YXJncyxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHQvLyB3b3JrZXIgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGxldCB1cmxXb3JrZXI6IHN0cmluZztcclxuXHRsZXQgd29ya2VyOiBXb3JrZXI7XHJcblx0ZnVuY3Rpb24gZ2V0V29ya2VyU2NyaXB0KCkge1xyXG5cdFx0cmV0dXJuIFwiKFwiICsgQWpheFdvcmsuV29ya2VyLnRvU3RyaW5nKCkgKyBcIikoKTtcIjtcclxuXHR9XHJcblx0ZnVuY3Rpb24gZ2V0VXJsV29ya2VyKCkge1xyXG5cdFx0aWYgKHVybFdvcmtlciA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGNvbnN0IGJsb2JEYXRhOiBCbG9iID0gbmV3IEJsb2IoW2dldFdvcmtlclNjcmlwdCgpXSwge1xyXG5cdFx0XHRcdHR5cGU6IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dXJsV29ya2VyID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYkRhdGEpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVybFdvcmtlcjtcclxuXHR9XHJcblx0ZnVuY3Rpb24gZ2V0V29ya2VyKCkge1xyXG5cdFx0aWYgKHdvcmtlciA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHdvcmtlciA9IG5ldyBXb3JrZXIoZ2V0VXJsV29ya2VyKCkpO1xyXG5cdFx0XHR3b3JrZXIub25tZXNzYWdlID0gKGV2ZW50OiBhbnkpID0+IHtcclxuXHRcdFx0XHRzaGFyZWRNZXRob2RzW2V2ZW50LmRhdGEubWV0aG9kXShldmVudC5kYXRhLmFyZ3MpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHdvcmtlcjtcclxuXHR9XHJcblx0Ly8gZmV0Y2ggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0bGV0IGxhc3RJZDogbnVtYmVyID0gMDtcclxuXHRmdW5jdGlvbiBnZXRJZChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdGxhc3RJZCA9IGxhc3RJZCArIDE7XHJcblx0XHRpZiAoaWQgIT09IHVuZGVmaW5lZCAmJiBpZCAhPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gaWQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbGFzdElkLnRvU3RyaW5nKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGdldEhhc2gob2JqOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0Y29uc3QgbmV3T0JqID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqKTtcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG5ld09Caikge1xyXG5cdFx0XHRpZiAodHlwZW9mIG5ld09CaltrZXldID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRkZWxldGUgbmV3T0JqW2tleV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBuZXdIYXNoRnJvbShuZXdPQmopO1xyXG5cdH1cclxuXHRsZXQgY2FsbGJhY2tTdGFja09wdGlvbnM6IHsgW2hhc2g6IHN0cmluZ106IElGZXRjaE9wdGlvbnM8YW55PiB9ID0ge307XHJcblx0ZnVuY3Rpb24gZmV0Y2hEb25lPFREYXRhVHlwZT4ob3B0aW9uczogSVJlc3BvbnNlT3B0aW9uczxURGF0YVR5cGU+KSB7XHJcblx0XHQvLyByZW1vdmUgY2FjaGUgdXJsXHJcblx0XHRjb25zdCBuZXdVcmwgPSBuZXcgVXJsKG9wdGlvbnMudXJsKTtcclxuXHRcdG5ld1VybC5kZWxldGVRdWVyeShub2NhY2hlKTtcclxuXHRcdG9wdGlvbnMudXJsID0gbmV3VXJsLnRvU3RyaW5nKCk7XHJcblx0XHRjb25zdCBuZXdVcmxSZWRpcmVjdCA9IG5ldyBVcmwob3B0aW9ucy51cmwpO1xyXG5cdFx0bmV3VXJsUmVkaXJlY3QuZGVsZXRlUXVlcnkobm9jYWNoZSk7XHJcblx0XHRvcHRpb25zLnVybFJlZGlyZWN0ZWQgPSBuZXdVcmxSZWRpcmVjdC50b1N0cmluZygpO1xyXG5cdFx0Ly8gcmVtb3ZlIGNhY2hlIHVybCBlbmRcclxuXHJcblx0XHRpZiAoY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGNvbnN0IGl0ZW0gPSBjYWxsYmFja1N0YWNrT3B0aW9uc1tvcHRpb25zLmhhc2hdO1xyXG5cdFx0XHRpZiAob3B0aW9ucy5lcnJvciA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGlmIChpdGVtLm9uRXJyb3IgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0aXRlbS5vbkVycm9yKG9wdGlvbnMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAoaXRlbS5vblN1Y2Nlc3MgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0aXRlbS5vblN1Y2Nlc3Mob3B0aW9ucyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChpdGVtLm9uRG9uZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0aXRlbS5vbkRvbmUob3B0aW9ucyk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoXSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0Ly8gZGVsZXRlIGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaF07XHJcblx0XHR9XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGZldGNoQWJvcnQob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSB7XHJcblx0XHRpZiAoY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGNvbnN0IGl0ZW0gPSBjYWxsYmFja1N0YWNrT3B0aW9uc1tvcHRpb25zLmhhc2hdO1xyXG5cdFx0XHRpZiAob3B0aW9ucy5hYm9ydCA9PT0gdHJ1ZSAmJiBpdGVtLm9uQWJvcnQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGl0ZW0ub25BYm9ydChvcHRpb25zKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBjYWxsYmFja1N0YWNrT3B0aW9uc1tvcHRpb25zLmhhc2hdID0gdW5kZWZpbmVkO1xyXG5cdFx0XHQvLyBkZWxldGUgY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoXTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZnVuY3Rpb24gZmV0Y2hDbGVhbigpOiB2b2lkIHtcclxuXHRcdGNhbGxiYWNrU3RhY2tPcHRpb25zID0ge307XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBmZXRjaDxURGF0YVR5cGU+KG9wdGlvbnM6IElGZXRjaE9wdGlvbnM8VERhdGFUeXBlPikge1xyXG5cdFx0Ly8gZGVmYXVsdCBvcHRpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Y29uc3QgZGVmYXVsdE9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyA9IHtcclxuXHRcdFx0dXJsOiBudWxsLFxyXG5cdFx0XHRtZXRob2Q6IFwiR0VUXCIsXHJcblx0XHRcdHJldHVyblR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRjYWNoZTogXCJuby1jYWNoZVwiLFxyXG5cdFx0XHRjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcblx0XHRcdC8vIGtlZXBhbGl2ZTogdHJ1ZSxcclxuXHRcdFx0cmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcclxuXHRcdFx0bW9kZTogXCJjb3JzXCIsXHJcblx0XHRcdHN5bmM6IHRydWUsXHJcblx0XHRcdGlkOiBudWxsLFxyXG5cdFx0XHRhYm9ydDogZmFsc2UsXHJcblx0XHR9O1xyXG5cdFx0Ly8gbmV3IG9wdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRjb25zdCBuZXdPcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMgfCBhbnkgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHRcdC8vIGZpeCBib2R5IGlmIHN0cmluZ1xyXG5cdFx0aWYgKHR5cGVvZiBuZXdPcHRpb25zLmJvZHkgIT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0bmV3T3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkobmV3T3B0aW9ucy5ib2R5KTtcclxuXHRcdH1cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld09wdGlvbnMpO1xyXG5cdFx0Ly8gLS0tLS0tLS0tXHJcblx0XHRuZXdPcHRpb25zLnVybCA9IHJlc29sdmVSZWxhdGl2ZShuZXdPcHRpb25zLnVybCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7IC8vIGdldCB1cmxcclxuXHJcblx0XHRuZXdPcHRpb25zLmhhc2ggPSBnZXRIYXNoKG5ld09wdGlvbnMpOyAvLyBnZXQgaGFkaFxyXG5cdFx0bmV3T3B0aW9ucy5pZCA9IGdldElkKG5ld09wdGlvbnMuaWQpOyAvLyBnZXQgaWRcclxuXHRcdC8vIHVybCBubyBjYWNoZSAtLS0tLS0tXHJcblx0XHRjb25zdCB1cmwgPSBuZXcgVXJsKG5ld09wdGlvbnMudXJsKTtcclxuXHRcdHVybC5zZXRRdWVyeShub2NhY2hlLCBwcm9jZXNzKCkpO1xyXG5cdFx0bmV3T3B0aW9ucy51cmwgPSB1cmwudG9TdHJpbmcoKTtcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tXHJcblx0XHQvLyBhZGQgdG8gY2FsbGJhY2tTdGFjayAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRjYWxsYmFja1N0YWNrT3B0aW9uc1tuZXdPcHRpb25zLmhhc2hdID0gKE9iamVjdC5hc3NpZ24oe30sIG5ld09wdGlvbnMpKTtcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG5ld09wdGlvbnMpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBuZXdPcHRpb25zW2tleV0gPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdGRlbGV0ZSBuZXdPcHRpb25zW2tleV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld09wdGlvbnMpO1xyXG5cdFx0ZXhlY3V0ZShcImZldGNoXCIsIFtuZXdPcHRpb25zXSk7XHJcblx0fVxyXG5cdC8vIGluaXQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJhamF4IHdvcmtlciAtLSBcIik7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcImFqYXggd29ya2luZ1wiKTtcclxuXHRcdGNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xyXG5cdFx0aWYgKHdbXCJhamF4V29ya2VyXCJdID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0d1tcImFqYXhXb3JrZXJcIl0gPSB0aGlzO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvLyBleHBvcnQgZnVuY3Rpb24gbm90aGluZygpOiB2b2lkIHtcclxuXHQvLyBcdGNvbnNvbGUubG9nKFwiZGlkIG5vdGhpbmdcIik7XHJcblx0Ly8gXHQvL1xyXG5cdC8vIH1cclxufVxyXG5BamF4V29ya2VyLmluaXQoKTtcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGRlZmF1bHQgQWpheFdvcmtlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4udHMiLCIvLyBpbXBvcnQgQWpheFdvcmtlciBmcm9tIFwiLi9tYWluXCI7XHJcbmRlY2xhcmUgdmFyIHNlbGY6IFdvcmtlcjtcclxuLy8gaW1wb3J0ICogYXMgSW50ZXJmYWNlIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgSUFic3RyYWN0RmV0Y2hPcHRpb25zLCBJQ29tdW5pY2F0aW9uLCBJRmV0Y2hPcHRpb25zLCBJSnNvbkFycmF5LCBJSnNvbk9iamVjdCwgSVJlcXVlc3RJbml0LCBJUmVxdWVzdE9wdGlvbnMsIElSZXNwb25zZU9wdGlvbnMsIElTaGFyZWRNZXRob2RzIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBBamF4V29yayB7XHJcblx0Ly8gVGhlIGZ1Y3Rpb24gYmVsbG93IHdpbGwgYmUgZXhlY3V0ZWQgaW4gd29ya2VyXHJcblx0Ly8gdXNlIGl0IHRvIGV4ZWN1dGUgdGhlIHRocmVhZFxyXG5cdGV4cG9ydCBmdW5jdGlvbiBXb3JrZXIoKSB7XHJcblx0XHRjb25zdCBsb2NhdGlvbk9yaWdpbjogYW55ID0gbnVsbDtcclxuXHRcdGNvbnN0IHNoYXJlZE1ldGhvZHM6IElTaGFyZWRNZXRob2RzID0ge1xyXG5cdFx0XHRvcmRlclN0YWNrOiB7fSxcclxuXHRcdFx0aW5pdDogKGFyZ3M6IGFueVtdKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5sb2NhdGlvbk9yaWdpbiA9IGFyZ3NbMF07XHJcblx0XHRcdH0sXHJcblx0XHRcdGZldGNoOiAoYXJnczogYW55W10pID0+IHtcclxuXHRcdFx0XHRjb25zdCBvcHRpb25zID0gYXJnc1swXTtcclxuXHRcdFx0XHRhamF4KG9wdGlvbnMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fTtcclxuXHRcdC8vIGFqYXggZmV0Y2ggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRsZXQgc3luY1Jlc3BvbnNlOiB7IFtpZDogc3RyaW5nXTogSVJlc3BvbnNlT3B0aW9uczxhbnk+IH0gPSB7fTtcclxuXHRcdGNvbnN0IHN5bmNSZXF1ZXN0U3RhY2s6IElSZXF1ZXN0T3B0aW9uc1tdID0gW107XHJcblx0XHRmdW5jdGlvbiBzZW5kQmFjayhvcHRpb25zOiBJUmVzcG9uc2VPcHRpb25zPGFueT4pIHtcclxuXHRcdFx0aWYgKG9wdGlvbnMuc3luYyA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdC8vIHN0b3JlIGluIHRoZSByZXNwb25zZSBzdG9yZSAtLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdHN5bmNSZXNwb25zZVtvcHRpb25zLmhhc2hdID0gb3B0aW9ucztcclxuXHRcdFx0XHQvLyBsb29wIGluIHRoZSByZXF1ZXN0cyAtLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0d2hpbGUgKHN5bmNSZXF1ZXN0U3RhY2subGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0aWYgKHN5bmNSZXF1ZXN0U3RhY2tbMF0uYWJvcnQgPT09IHRydWUgKSB7XHJcblx0XHRcdFx0XHRcdGV4ZWN1dGUoXCJvbkFib3J0XCIsIFtzeW5jUmVxdWVzdFN0YWNrWzBdXSk7XHJcblx0XHRcdFx0XHRcdHN5bmNSZXF1ZXN0U3RhY2suc2hpZnQoKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlmIChzeW5jUmVzcG9uc2Vbc3luY1JlcXVlc3RTdGFja1swXS5oYXNoXSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgciA9IHN5bmNSZXNwb25zZVtzeW5jUmVxdWVzdFN0YWNrWzBdLmhhc2hdO1xyXG5cdFx0XHRcdFx0XHRcdGV4ZWN1dGUoXCJvbkRvbmVcIiwgW3JdKTtcclxuXHRcdFx0XHRcdFx0XHRzeW5jUmVxdWVzdFN0YWNrLnNoaWZ0KCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gY2xlYW4gdGhlIHN5bmNSZXNwb25zZVxyXG5cdFx0XHRcdGlmIChzeW5jUmVxdWVzdFN0YWNrLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0c3luY1Jlc3BvbnNlID0ge307XHJcblx0XHRcdFx0XHRleGVjdXRlKFwiY2xlYW5cIiwgW10pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRleGVjdXRlKFwib25Eb25lXCIsIFtvcHRpb25zXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGFqYXhSZXF1ZXN0U3RhY2tQdXNoKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5zeW5jID09PSB0cnVlKSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBpIG9mIHN5bmNSZXF1ZXN0U3RhY2spIHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb25zLmlkID09PSBpLmlkIHx8IG9wdGlvbnMuaGFzaCA9PT0gaS5oYXNoKSB7XHJcblx0XHRcdFx0XHRcdGkuYWJvcnQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzeW5jUmVxdWVzdFN0YWNrLnB1c2gob3B0aW9ucyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGFqYXgob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSB7XHJcblx0XHRcdGNvbnN0IGZldGNoUmV0dXJuOiBJUmVzcG9uc2VPcHRpb25zPGFueT4gPSB7XHJcblx0XHRcdFx0aWQ6IG9wdGlvbnMuaWQsXHJcblx0XHRcdFx0dXJsOiBvcHRpb25zLnVybCxcclxuXHRcdFx0XHRzdGF0dXM6IDQwNCxcclxuXHRcdFx0XHRyZXR1cm5UeXBlOiBvcHRpb25zLnJldHVyblR5cGUsXHJcblx0XHRcdFx0c3RhdHVzVGV4dDogXCJFcnJvciBvbiBBamF4LVdvcmtlciFcIixcclxuXHRcdFx0XHRkYXRhOiBudWxsLFxyXG5cdFx0XHRcdGhlYWRlcnM6IFtdLFxyXG5cdFx0XHRcdHJlZGlyZWN0ZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdHVybFJlZGlyZWN0ZWQ6IG51bGwsXHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiBudWxsLFxyXG5cdFx0XHRcdGVycm9yOiBmYWxzZSxcclxuXHRcdFx0XHRzeW5jOiBvcHRpb25zLnN5bmMsXHJcblx0XHRcdFx0aGFzaDogb3B0aW9ucy5oYXNoLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHQvLyBzeW5jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0Ly8gZmV0Y2ggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdGFqYXhSZXF1ZXN0U3RhY2tQdXNoKG9wdGlvbnMpO1xyXG5cdFx0XHRjb25zdCBmZXRjaFByb21pc2UgPSBmZXRjaChvcHRpb25zLnVybCwgb3B0aW9ucylcclxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdGZldGNoUmV0dXJuLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcclxuXHRcdFx0XHRcdGZldGNoUmV0dXJuLnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xyXG5cdFx0XHRcdFx0ZmV0Y2hSZXR1cm4udXJsUmVkaXJlY3RlZCA9IHJlc3BvbnNlLnVybDtcclxuXHRcdFx0XHRcdGZldGNoUmV0dXJuLnJlZGlyZWN0ZWQgPSAoZmV0Y2hSZXR1cm4udXJsUmVkaXJlY3RlZCAhPT0gZmV0Y2hSZXR1cm4udXJsKTtcclxuXHRcdFx0XHRcdGZldGNoUmV0dXJuLmhlYWRlcnMgPSByZXNwb25zZS5oZWFkZXJzO1xyXG5cdFx0XHRcdFx0ZmV0Y2hSZXR1cm4uaGVhZGVycyA9IFtdO1xyXG5cclxuXHRcdFx0XHRcdHJlc3BvbnNlLmhlYWRlcnMuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdFx0KGZldGNoUmV0dXJuLmhlYWRlcnMgYXMgc3RyaW5nW11bXSkucHVzaChba2V5LCB2YWx1ZV0pO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRjb25zdCBoZWFkZXJDb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xyXG5cdFx0XHRcdFx0bGV0IGNvbnRlbnRUeXBlOiBzdHJpbmcgPSBcInRleHRcIjtcclxuXHRcdFx0XHRcdGlmIChoZWFkZXJDb250ZW50VHlwZSAmJiAoaGVhZGVyQ29udGVudFR5cGUuaW5jbHVkZXMoXCJhcHBsaWNhdGlvbi9qc29uXCIpIHx8IGhlYWRlckNvbnRlbnRUeXBlLmluY2x1ZGVzKFwidGV4dC9qc29uXCIpKSkge1xyXG5cdFx0XHRcdFx0XHRjb250ZW50VHlwZSA9IFwianNvblwiO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29udGVudFR5cGUgPSBcInRleHRcIjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdGlmIChjb250ZW50VHlwZSA9PT0gXCJ0ZXh0XCIpIHtcclxuXHRcdFx0XHRcdFx0ZmV0Y2hSZXR1cm4ucmV0dXJuVHlwZSA9IFwidGV4dFwiO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjb250ZW50VHlwZSA9PT0gXCJqc29uXCIpIHtcclxuXHRcdFx0XHRcdFx0ZmV0Y2hSZXR1cm4ucmV0dXJuVHlwZSA9IFwianNvblwiO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdC50aGVuKChkYXRhOiBhbnkpID0+IHtcclxuXHRcdFx0XHRmZXRjaFJldHVybi5kYXRhID0gZGF0YTtcclxuXHRcdFx0XHRzZW5kQmFjayhmZXRjaFJldHVybik7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5jYXRjaCgoZXJyb3I6IGFueSkgPT4ge1xyXG5cdFx0XHRcdGZldGNoUmV0dXJuLmVycm9yTWVzc2FnZSA9IGVycm9yO1xyXG5cdFx0XHRcdGZldGNoUmV0dXJuLmVycm9yID0gdHJ1ZTtcclxuXHRcdFx0XHRzZW5kQmFjayhmZXRjaFJldHVybik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0Ly8gc2FtZSBmdW5jdGlvbnMgaGVyZVxyXG5cdFx0ZnVuY3Rpb24gZXhlY3V0ZShhY3Rpb25OYW1lOiBzdHJpbmcsIGFyZ3M6IEFycmF5PElKc29uT2JqZWN0IHwgSUpzb25BcnJheSB8IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBhbnk+KSB7XHJcblx0XHRcdHNlbGYucG9zdE1lc3NhZ2Uoe1xyXG5cdFx0XHRcdG1ldGhvZDogYWN0aW9uTmFtZSxcclxuXHRcdFx0XHRhcmdzLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdHNlbGYub25tZXNzYWdlID0gKGV2ZW50OiBhbnkpID0+IHtcclxuXHRcdFx0Y29uc3QgYXJncyA9IGV2ZW50LmRhdGEuYXJncztcclxuXHRcdFx0c2hhcmVkTWV0aG9kc1tldmVudC5kYXRhLm1ldGhvZF0oYXJncyk7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBamF4V29yaztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FqYXgtd29yay50cyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVybCA9IHJlcXVpcmUoJ3VybCcpO1xudmFyIHBhdCA9IC9eaHR0cHM/OlxcL1xcLy9pO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaW5rLCBzb3VyY2UpIHtcbiAgaWYgKCFsaW5rKSByZXR1cm4gc291cmNlO1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuO1xuICByZXR1cm4gIXBhdC50ZXN0KGxpbmspID8gdXJsLnJlc29sdmUoc291cmNlLCBsaW5rKSA6IGxpbms7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS1yZWxhdGl2ZS11cmwvbGliLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwdW55Y29kZSA9IHJlcXVpcmUoJ3B1bnljb2RlJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5leHBvcnRzLnBhcnNlID0gdXJsUGFyc2U7XG5leHBvcnRzLnJlc29sdmUgPSB1cmxSZXNvbHZlO1xuZXhwb3J0cy5yZXNvbHZlT2JqZWN0ID0gdXJsUmVzb2x2ZU9iamVjdDtcbmV4cG9ydHMuZm9ybWF0ID0gdXJsRm9ybWF0O1xuXG5leHBvcnRzLlVybCA9IFVybDtcblxuZnVuY3Rpb24gVXJsKCkge1xuICB0aGlzLnByb3RvY29sID0gbnVsbDtcbiAgdGhpcy5zbGFzaGVzID0gbnVsbDtcbiAgdGhpcy5hdXRoID0gbnVsbDtcbiAgdGhpcy5ob3N0ID0gbnVsbDtcbiAgdGhpcy5wb3J0ID0gbnVsbDtcbiAgdGhpcy5ob3N0bmFtZSA9IG51bGw7XG4gIHRoaXMuaGFzaCA9IG51bGw7XG4gIHRoaXMuc2VhcmNoID0gbnVsbDtcbiAgdGhpcy5xdWVyeSA9IG51bGw7XG4gIHRoaXMucGF0aG5hbWUgPSBudWxsO1xuICB0aGlzLnBhdGggPSBudWxsO1xuICB0aGlzLmhyZWYgPSBudWxsO1xufVxuXG4vLyBSZWZlcmVuY2U6IFJGQyAzOTg2LCBSRkMgMTgwOCwgUkZDIDIzOTZcblxuLy8gZGVmaW5lIHRoZXNlIGhlcmUgc28gYXQgbGVhc3QgdGhleSBvbmx5IGhhdmUgdG8gYmVcbi8vIGNvbXBpbGVkIG9uY2Ugb24gdGhlIGZpcnN0IG1vZHVsZSBsb2FkLlxudmFyIHByb3RvY29sUGF0dGVybiA9IC9eKFthLXowLTkuKy1dKzopL2ksXG4gICAgcG9ydFBhdHRlcm4gPSAvOlswLTldKiQvLFxuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciBhIHNpbXBsZSBwYXRoIFVSTFxuICAgIHNpbXBsZVBhdGhQYXR0ZXJuID0gL14oXFwvXFwvPyg/IVxcLylbXlxcP1xcc10qKShcXD9bXlxcc10qKT8kLyxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIHJlc2VydmVkIGZvciBkZWxpbWl0aW5nIFVSTHMuXG4gICAgLy8gV2UgYWN0dWFsbHkganVzdCBhdXRvLWVzY2FwZSB0aGVzZS5cbiAgICBkZWxpbXMgPSBbJzwnLCAnPicsICdcIicsICdgJywgJyAnLCAnXFxyJywgJ1xcbicsICdcXHQnXSxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGZvciB2YXJpb3VzIHJlYXNvbnMuXG4gICAgdW53aXNlID0gWyd7JywgJ30nLCAnfCcsICdcXFxcJywgJ14nLCAnYCddLmNvbmNhdChkZWxpbXMpLFxuXG4gICAgLy8gQWxsb3dlZCBieSBSRkNzLCBidXQgY2F1c2Ugb2YgWFNTIGF0dGFja3MuICBBbHdheXMgZXNjYXBlIHRoZXNlLlxuICAgIGF1dG9Fc2NhcGUgPSBbJ1xcJyddLmNvbmNhdCh1bndpc2UpLFxuICAgIC8vIENoYXJhY3RlcnMgdGhhdCBhcmUgbmV2ZXIgZXZlciBhbGxvd2VkIGluIGEgaG9zdG5hbWUuXG4gICAgLy8gTm90ZSB0aGF0IGFueSBpbnZhbGlkIGNoYXJzIGFyZSBhbHNvIGhhbmRsZWQsIGJ1dCB0aGVzZVxuICAgIC8vIGFyZSB0aGUgb25lcyB0aGF0IGFyZSAqZXhwZWN0ZWQqIHRvIGJlIHNlZW4sIHNvIHdlIGZhc3QtcGF0aFxuICAgIC8vIHRoZW0uXG4gICAgbm9uSG9zdENoYXJzID0gWyclJywgJy8nLCAnPycsICc7JywgJyMnXS5jb25jYXQoYXV0b0VzY2FwZSksXG4gICAgaG9zdEVuZGluZ0NoYXJzID0gWycvJywgJz8nLCAnIyddLFxuICAgIGhvc3RuYW1lTWF4TGVuID0gMjU1LFxuICAgIGhvc3RuYW1lUGFydFBhdHRlcm4gPSAvXlsrYS16MC05QS1aXy1dezAsNjN9JC8sXG4gICAgaG9zdG5hbWVQYXJ0U3RhcnQgPSAvXihbK2EtejAtOUEtWl8tXXswLDYzfSkoLiopJC8sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgY2FuIGFsbG93IFwidW5zYWZlXCIgYW5kIFwidW53aXNlXCIgY2hhcnMuXG4gICAgdW5zYWZlUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBuZXZlciBoYXZlIGEgaG9zdG5hbWUuXG4gICAgaG9zdGxlc3NQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IGFsd2F5cyBjb250YWluIGEgLy8gYml0LlxuICAgIHNsYXNoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdodHRwczonOiB0cnVlLFxuICAgICAgJ2Z0cDonOiB0cnVlLFxuICAgICAgJ2dvcGhlcjonOiB0cnVlLFxuICAgICAgJ2ZpbGU6JzogdHJ1ZVxuICAgIH0sXG4gICAgcXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuXG5mdW5jdGlvbiB1cmxQYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICh1cmwgJiYgdXRpbC5pc09iamVjdCh1cmwpICYmIHVybCBpbnN0YW5jZW9mIFVybCkgcmV0dXJuIHVybDtcblxuICB2YXIgdSA9IG5ldyBVcmw7XG4gIHUucGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCk7XG4gIHJldHVybiB1O1xufVxuXG5VcmwucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24odXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAoIXV0aWwuaXNTdHJpbmcodXJsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQYXJhbWV0ZXIgJ3VybCcgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIHVybCk7XG4gIH1cblxuICAvLyBDb3B5IGNocm9tZSwgSUUsIG9wZXJhIGJhY2tzbGFzaC1oYW5kbGluZyBiZWhhdmlvci5cbiAgLy8gQmFjayBzbGFzaGVzIGJlZm9yZSB0aGUgcXVlcnkgc3RyaW5nIGdldCBjb252ZXJ0ZWQgdG8gZm9yd2FyZCBzbGFzaGVzXG4gIC8vIFNlZTogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI1OTE2XG4gIHZhciBxdWVyeUluZGV4ID0gdXJsLmluZGV4T2YoJz8nKSxcbiAgICAgIHNwbGl0dGVyID1cbiAgICAgICAgICAocXVlcnlJbmRleCAhPT0gLTEgJiYgcXVlcnlJbmRleCA8IHVybC5pbmRleE9mKCcjJykpID8gJz8nIDogJyMnLFxuICAgICAgdVNwbGl0ID0gdXJsLnNwbGl0KHNwbGl0dGVyKSxcbiAgICAgIHNsYXNoUmVnZXggPSAvXFxcXC9nO1xuICB1U3BsaXRbMF0gPSB1U3BsaXRbMF0ucmVwbGFjZShzbGFzaFJlZ2V4LCAnLycpO1xuICB1cmwgPSB1U3BsaXQuam9pbihzcGxpdHRlcik7XG5cbiAgdmFyIHJlc3QgPSB1cmw7XG5cbiAgLy8gdHJpbSBiZWZvcmUgcHJvY2VlZGluZy5cbiAgLy8gVGhpcyBpcyB0byBzdXBwb3J0IHBhcnNlIHN0dWZmIGxpa2UgXCIgIGh0dHA6Ly9mb28uY29tICBcXG5cIlxuICByZXN0ID0gcmVzdC50cmltKCk7XG5cbiAgaWYgKCFzbGFzaGVzRGVub3RlSG9zdCAmJiB1cmwuc3BsaXQoJyMnKS5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBUcnkgZmFzdCBwYXRoIHJlZ2V4cFxuICAgIHZhciBzaW1wbGVQYXRoID0gc2ltcGxlUGF0aFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgICBpZiAoc2ltcGxlUGF0aCkge1xuICAgICAgdGhpcy5wYXRoID0gcmVzdDtcbiAgICAgIHRoaXMuaHJlZiA9IHJlc3Q7XG4gICAgICB0aGlzLnBhdGhuYW1lID0gc2ltcGxlUGF0aFsxXTtcbiAgICAgIGlmIChzaW1wbGVQYXRoWzJdKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gc2ltcGxlUGF0aFsyXTtcbiAgICAgICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5zZWFyY2guc3Vic3RyKDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5zZWFyY2guc3Vic3RyKDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICAgICAgdGhpcy5xdWVyeSA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgdmFyIHByb3RvID0gcHJvdG9jb2xQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gIGlmIChwcm90bykge1xuICAgIHByb3RvID0gcHJvdG9bMF07XG4gICAgdmFyIGxvd2VyUHJvdG8gPSBwcm90by50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMucHJvdG9jb2wgPSBsb3dlclByb3RvO1xuICAgIHJlc3QgPSByZXN0LnN1YnN0cihwcm90by5sZW5ndGgpO1xuICB9XG5cbiAgLy8gZmlndXJlIG91dCBpZiBpdCdzIGdvdCBhIGhvc3RcbiAgLy8gdXNlckBzZXJ2ZXIgaXMgKmFsd2F5cyogaW50ZXJwcmV0ZWQgYXMgYSBob3N0bmFtZSwgYW5kIHVybFxuICAvLyByZXNvbHV0aW9uIHdpbGwgdHJlYXQgLy9mb28vYmFyIGFzIGhvc3Q9Zm9vLHBhdGg9YmFyIGJlY2F1c2UgdGhhdCdzXG4gIC8vIGhvdyB0aGUgYnJvd3NlciByZXNvbHZlcyByZWxhdGl2ZSBVUkxzLlxuICBpZiAoc2xhc2hlc0Rlbm90ZUhvc3QgfHwgcHJvdG8gfHwgcmVzdC5tYXRjaCgvXlxcL1xcL1teQFxcL10rQFteQFxcL10rLykpIHtcbiAgICB2YXIgc2xhc2hlcyA9IHJlc3Quc3Vic3RyKDAsIDIpID09PSAnLy8nO1xuICAgIGlmIChzbGFzaGVzICYmICEocHJvdG8gJiYgaG9zdGxlc3NQcm90b2NvbFtwcm90b10pKSB7XG4gICAgICByZXN0ID0gcmVzdC5zdWJzdHIoMik7XG4gICAgICB0aGlzLnNsYXNoZXMgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaG9zdGxlc3NQcm90b2NvbFtwcm90b10gJiZcbiAgICAgIChzbGFzaGVzIHx8IChwcm90byAmJiAhc2xhc2hlZFByb3RvY29sW3Byb3RvXSkpKSB7XG5cbiAgICAvLyB0aGVyZSdzIGEgaG9zdG5hbWUuXG4gICAgLy8gdGhlIGZpcnN0IGluc3RhbmNlIG9mIC8sID8sIDssIG9yICMgZW5kcyB0aGUgaG9zdC5cbiAgICAvL1xuICAgIC8vIElmIHRoZXJlIGlzIGFuIEAgaW4gdGhlIGhvc3RuYW1lLCB0aGVuIG5vbi1ob3N0IGNoYXJzICphcmUqIGFsbG93ZWRcbiAgICAvLyB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBAIHNpZ24sIHVubGVzcyBzb21lIGhvc3QtZW5kaW5nIGNoYXJhY3RlclxuICAgIC8vIGNvbWVzICpiZWZvcmUqIHRoZSBALXNpZ24uXG4gICAgLy8gVVJMcyBhcmUgb2Jub3hpb3VzLlxuICAgIC8vXG4gICAgLy8gZXg6XG4gICAgLy8gaHR0cDovL2FAYkBjLyA9PiB1c2VyOmFAYiBob3N0OmNcbiAgICAvLyBodHRwOi8vYUBiP0BjID0+IHVzZXI6YSBob3N0OmMgcGF0aDovP0BjXG5cbiAgICAvLyB2MC4xMiBUT0RPKGlzYWFjcyk6IFRoaXMgaXMgbm90IHF1aXRlIGhvdyBDaHJvbWUgZG9lcyB0aGluZ3MuXG4gICAgLy8gUmV2aWV3IG91ciB0ZXN0IGNhc2UgYWdhaW5zdCBicm93c2VycyBtb3JlIGNvbXByZWhlbnNpdmVseS5cblxuICAgIC8vIGZpbmQgdGhlIGZpcnN0IGluc3RhbmNlIG9mIGFueSBob3N0RW5kaW5nQ2hhcnNcbiAgICB2YXIgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9zdEVuZGluZ0NoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKGhvc3RFbmRpbmdDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuXG4gICAgLy8gYXQgdGhpcyBwb2ludCwgZWl0aGVyIHdlIGhhdmUgYW4gZXhwbGljaXQgcG9pbnQgd2hlcmUgdGhlXG4gICAgLy8gYXV0aCBwb3J0aW9uIGNhbm5vdCBnbyBwYXN0LCBvciB0aGUgbGFzdCBAIGNoYXIgaXMgdGhlIGRlY2lkZXIuXG4gICAgdmFyIGF1dGgsIGF0U2lnbjtcbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpIHtcbiAgICAgIC8vIGF0U2lnbiBjYW4gYmUgYW55d2hlcmUuXG4gICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF0U2lnbiBtdXN0IGJlIGluIGF1dGggcG9ydGlvbi5cbiAgICAgIC8vIGh0dHA6Ly9hQGIvY0BkID0+IGhvc3Q6YiBhdXRoOmEgcGF0aDovY0BkXG4gICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJywgaG9zdEVuZCk7XG4gICAgfVxuXG4gICAgLy8gTm93IHdlIGhhdmUgYSBwb3J0aW9uIHdoaWNoIGlzIGRlZmluaXRlbHkgdGhlIGF1dGguXG4gICAgLy8gUHVsbCB0aGF0IG9mZi5cbiAgICBpZiAoYXRTaWduICE9PSAtMSkge1xuICAgICAgYXV0aCA9IHJlc3Quc2xpY2UoMCwgYXRTaWduKTtcbiAgICAgIHJlc3QgPSByZXN0LnNsaWNlKGF0U2lnbiArIDEpO1xuICAgICAgdGhpcy5hdXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIH1cblxuICAgIC8vIHRoZSBob3N0IGlzIHRoZSByZW1haW5pbmcgdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IG5vbi1ob3N0IGNoYXJcbiAgICBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub25Ib3N0Q2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2Yobm9uSG9zdENoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG4gICAgLy8gaWYgd2Ugc3RpbGwgaGF2ZSBub3QgaGl0IGl0LCB0aGVuIHRoZSBlbnRpcmUgdGhpbmcgaXMgYSBob3N0LlxuICAgIGlmIChob3N0RW5kID09PSAtMSlcbiAgICAgIGhvc3RFbmQgPSByZXN0Lmxlbmd0aDtcblxuICAgIHRoaXMuaG9zdCA9IHJlc3Quc2xpY2UoMCwgaG9zdEVuZCk7XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoaG9zdEVuZCk7XG5cbiAgICAvLyBwdWxsIG91dCBwb3J0LlxuICAgIHRoaXMucGFyc2VIb3N0KCk7XG5cbiAgICAvLyB3ZSd2ZSBpbmRpY2F0ZWQgdGhhdCB0aGVyZSBpcyBhIGhvc3RuYW1lLFxuICAgIC8vIHNvIGV2ZW4gaWYgaXQncyBlbXB0eSwgaXQgaGFzIHRvIGJlIHByZXNlbnQuXG4gICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG5cbiAgICAvLyBpZiBob3N0bmFtZSBiZWdpbnMgd2l0aCBbIGFuZCBlbmRzIHdpdGggXVxuICAgIC8vIGFzc3VtZSB0aGF0IGl0J3MgYW4gSVB2NiBhZGRyZXNzLlxuICAgIHZhciBpcHY2SG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lWzBdID09PSAnWycgJiZcbiAgICAgICAgdGhpcy5ob3N0bmFtZVt0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDFdID09PSAnXSc7XG5cbiAgICAvLyB2YWxpZGF0ZSBhIGxpdHRsZS5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgdmFyIGhvc3RwYXJ0cyA9IHRoaXMuaG9zdG5hbWUuc3BsaXQoL1xcLi8pO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBob3N0cGFydHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gaG9zdHBhcnRzW2ldO1xuICAgICAgICBpZiAoIXBhcnQpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIXBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICB2YXIgbmV3cGFydCA9ICcnO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gcGFydC5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJ0LmNoYXJDb2RlQXQoaikgPiAxMjcpIHtcbiAgICAgICAgICAgICAgLy8gd2UgcmVwbGFjZSBub24tQVNDSUkgY2hhciB3aXRoIGEgdGVtcG9yYXJ5IHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhpcyB0byBtYWtlIHN1cmUgc2l6ZSBvZiBob3N0bmFtZSBpcyBub3RcbiAgICAgICAgICAgICAgLy8gYnJva2VuIGJ5IHJlcGxhY2luZyBub24tQVNDSUkgYnkgbm90aGluZ1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9ICd4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gcGFydFtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgdGVzdCBhZ2FpbiB3aXRoIEFTQ0lJIGNoYXIgb25seVxuICAgICAgICAgIGlmICghbmV3cGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgICAgdmFyIHZhbGlkUGFydHMgPSBob3N0cGFydHMuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICB2YXIgbm90SG9zdCA9IGhvc3RwYXJ0cy5zbGljZShpICsgMSk7XG4gICAgICAgICAgICB2YXIgYml0ID0gcGFydC5tYXRjaChob3N0bmFtZVBhcnRTdGFydCk7XG4gICAgICAgICAgICBpZiAoYml0KSB7XG4gICAgICAgICAgICAgIHZhbGlkUGFydHMucHVzaChiaXRbMV0pO1xuICAgICAgICAgICAgICBub3RIb3N0LnVuc2hpZnQoYml0WzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub3RIb3N0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXN0ID0gJy8nICsgbm90SG9zdC5qb2luKCcuJykgKyByZXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ob3N0bmFtZSA9IHZhbGlkUGFydHMuam9pbignLicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaG9zdG5hbWUubGVuZ3RoID4gaG9zdG5hbWVNYXhMZW4pIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaG9zdG5hbWVzIGFyZSBhbHdheXMgbG93ZXIgY2FzZS5cbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIC8vIElETkEgU3VwcG9ydDogUmV0dXJucyBhIHB1bnljb2RlZCByZXByZXNlbnRhdGlvbiBvZiBcImRvbWFpblwiLlxuICAgICAgLy8gSXQgb25seSBjb252ZXJ0cyBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgdGhhdFxuICAgICAgLy8gaGF2ZSBub24tQVNDSUkgY2hhcmFjdGVycywgaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZlxuICAgICAgLy8geW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0IGFscmVhZHkgaXMgQVNDSUktb25seS5cbiAgICAgIHRoaXMuaG9zdG5hbWUgPSBwdW55Y29kZS50b0FTQ0lJKHRoaXMuaG9zdG5hbWUpO1xuICAgIH1cblxuICAgIHZhciBwID0gdGhpcy5wb3J0ID8gJzonICsgdGhpcy5wb3J0IDogJyc7XG4gICAgdmFyIGggPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuICAgIHRoaXMuaG9zdCA9IGggKyBwO1xuICAgIHRoaXMuaHJlZiArPSB0aGlzLmhvc3Q7XG5cbiAgICAvLyBzdHJpcCBbIGFuZCBdIGZyb20gdGhlIGhvc3RuYW1lXG4gICAgLy8gdGhlIGhvc3QgZmllbGQgc3RpbGwgcmV0YWlucyB0aGVtLCB0aG91Z2hcbiAgICBpZiAoaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS5zdWJzdHIoMSwgdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIGlmIChyZXN0WzBdICE9PSAnLycpIHtcbiAgICAgICAgcmVzdCA9ICcvJyArIHJlc3Q7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHJlc3QgaXMgc2V0IHRvIHRoZSBwb3N0LWhvc3Qgc3R1ZmYuXG4gIC8vIGNob3Agb2ZmIGFueSBkZWxpbSBjaGFycy5cbiAgaWYgKCF1bnNhZmVQcm90b2NvbFtsb3dlclByb3RvXSkge1xuXG4gICAgLy8gRmlyc3QsIG1ha2UgMTAwJSBzdXJlIHRoYXQgYW55IFwiYXV0b0VzY2FwZVwiIGNoYXJzIGdldFxuICAgIC8vIGVzY2FwZWQsIGV2ZW4gaWYgZW5jb2RlVVJJQ29tcG9uZW50IGRvZXNuJ3QgdGhpbmsgdGhleVxuICAgIC8vIG5lZWQgdG8gYmUuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdXRvRXNjYXBlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGFlID0gYXV0b0VzY2FwZVtpXTtcbiAgICAgIGlmIChyZXN0LmluZGV4T2YoYWUpID09PSAtMSlcbiAgICAgICAgY29udGludWU7XG4gICAgICB2YXIgZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGFlKTtcbiAgICAgIGlmIChlc2MgPT09IGFlKSB7XG4gICAgICAgIGVzYyA9IGVzY2FwZShhZSk7XG4gICAgICB9XG4gICAgICByZXN0ID0gcmVzdC5zcGxpdChhZSkuam9pbihlc2MpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gY2hvcCBvZmYgZnJvbSB0aGUgdGFpbCBmaXJzdC5cbiAgdmFyIGhhc2ggPSByZXN0LmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2ggIT09IC0xKSB7XG4gICAgLy8gZ290IGEgZnJhZ21lbnQgc3RyaW5nLlxuICAgIHRoaXMuaGFzaCA9IHJlc3Quc3Vic3RyKGhhc2gpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIGhhc2gpO1xuICB9XG4gIHZhciBxbSA9IHJlc3QuaW5kZXhPZignPycpO1xuICBpZiAocW0gIT09IC0xKSB7XG4gICAgdGhpcy5zZWFyY2ggPSByZXN0LnN1YnN0cihxbSk7XG4gICAgdGhpcy5xdWVyeSA9IHJlc3Quc3Vic3RyKHFtICsgMSk7XG4gICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnF1ZXJ5KTtcbiAgICB9XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgcW0pO1xuICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAvLyBubyBxdWVyeSBzdHJpbmcsIGJ1dCBwYXJzZVF1ZXJ5U3RyaW5nIHN0aWxsIHJlcXVlc3RlZFxuICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgdGhpcy5xdWVyeSA9IHt9O1xuICB9XG4gIGlmIChyZXN0KSB0aGlzLnBhdGhuYW1lID0gcmVzdDtcbiAgaWYgKHNsYXNoZWRQcm90b2NvbFtsb3dlclByb3RvXSAmJlxuICAgICAgdGhpcy5ob3N0bmFtZSAmJiAhdGhpcy5wYXRobmFtZSkge1xuICAgIHRoaXMucGF0aG5hbWUgPSAnLyc7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gIGlmICh0aGlzLnBhdGhuYW1lIHx8IHRoaXMuc2VhcmNoKSB7XG4gICAgdmFyIHAgPSB0aGlzLnBhdGhuYW1lIHx8ICcnO1xuICAgIHZhciBzID0gdGhpcy5zZWFyY2ggfHwgJyc7XG4gICAgdGhpcy5wYXRoID0gcCArIHM7XG4gIH1cblxuICAvLyBmaW5hbGx5LCByZWNvbnN0cnVjdCB0aGUgaHJlZiBiYXNlZCBvbiB3aGF0IGhhcyBiZWVuIHZhbGlkYXRlZC5cbiAgdGhpcy5ocmVmID0gdGhpcy5mb3JtYXQoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBmb3JtYXQgYSBwYXJzZWQgb2JqZWN0IGludG8gYSB1cmwgc3RyaW5nXG5mdW5jdGlvbiB1cmxGb3JtYXQob2JqKSB7XG4gIC8vIGVuc3VyZSBpdCdzIGFuIG9iamVjdCwgYW5kIG5vdCBhIHN0cmluZyB1cmwuXG4gIC8vIElmIGl0J3MgYW4gb2JqLCB0aGlzIGlzIGEgbm8tb3AuXG4gIC8vIHRoaXMgd2F5LCB5b3UgY2FuIGNhbGwgdXJsX2Zvcm1hdCgpIG9uIHN0cmluZ3NcbiAgLy8gdG8gY2xlYW4gdXAgcG90ZW50aWFsbHkgd29ua3kgdXJscy5cbiAgaWYgKHV0aWwuaXNTdHJpbmcob2JqKSkgb2JqID0gdXJsUGFyc2Uob2JqKTtcbiAgaWYgKCEob2JqIGluc3RhbmNlb2YgVXJsKSkgcmV0dXJuIFVybC5wcm90b3R5cGUuZm9ybWF0LmNhbGwob2JqKTtcbiAgcmV0dXJuIG9iai5mb3JtYXQoKTtcbn1cblxuVXJsLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGF1dGggPSB0aGlzLmF1dGggfHwgJyc7XG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgJzonKTtcbiAgICBhdXRoICs9ICdAJztcbiAgfVxuXG4gIHZhciBwcm90b2NvbCA9IHRoaXMucHJvdG9jb2wgfHwgJycsXG4gICAgICBwYXRobmFtZSA9IHRoaXMucGF0aG5hbWUgfHwgJycsXG4gICAgICBoYXNoID0gdGhpcy5oYXNoIHx8ICcnLFxuICAgICAgaG9zdCA9IGZhbHNlLFxuICAgICAgcXVlcnkgPSAnJztcblxuICBpZiAodGhpcy5ob3N0KSB7XG4gICAgaG9zdCA9IGF1dGggKyB0aGlzLmhvc3Q7XG4gIH0gZWxzZSBpZiAodGhpcy5ob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpID09PSAtMSA/XG4gICAgICAgIHRoaXMuaG9zdG5hbWUgOlxuICAgICAgICAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nKTtcbiAgICBpZiAodGhpcy5wb3J0KSB7XG4gICAgICBob3N0ICs9ICc6JyArIHRoaXMucG9ydDtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5xdWVyeSAmJlxuICAgICAgdXRpbC5pc09iamVjdCh0aGlzLnF1ZXJ5KSAmJlxuICAgICAgT2JqZWN0LmtleXModGhpcy5xdWVyeSkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkodGhpcy5xdWVyeSk7XG4gIH1cblxuICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2ggfHwgKHF1ZXJ5ICYmICgnPycgKyBxdWVyeSkpIHx8ICcnO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICAvLyBvbmx5IHRoZSBzbGFzaGVkUHJvdG9jb2xzIGdldCB0aGUgLy8uICBOb3QgbWFpbHRvOiwgeG1wcDosIGV0Yy5cbiAgLy8gdW5sZXNzIHRoZXkgaGFkIHRoZW0gdG8gYmVnaW4gd2l0aC5cbiAgaWYgKHRoaXMuc2xhc2hlcyB8fFxuICAgICAgKCFwcm90b2NvbCB8fCBzbGFzaGVkUHJvdG9jb2xbcHJvdG9jb2xdKSAmJiBob3N0ICE9PSBmYWxzZSkge1xuICAgIGhvc3QgPSAnLy8nICsgKGhvc3QgfHwgJycpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZTtcbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSAnJztcbiAgfVxuXG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSAnIycpIGhhc2ggPSAnIycgKyBoYXNoO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09ICc/Jykgc2VhcmNoID0gJz8nICsgc2VhcmNoO1xuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQobWF0Y2gpO1xuICB9KTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoJyMnLCAnJTIzJyk7XG5cbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmUoc291cmNlLCByZWxhdGl2ZSkge1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZShyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIHJldHVybiB0aGlzLnJlc29sdmVPYmplY3QodXJsUGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKSkuZm9ybWF0KCk7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlT2JqZWN0KHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiByZWxhdGl2ZTtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmVPYmplY3QocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmVPYmplY3QgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICBpZiAodXRpbC5pc1N0cmluZyhyZWxhdGl2ZSkpIHtcbiAgICB2YXIgcmVsID0gbmV3IFVybCgpO1xuICAgIHJlbC5wYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpO1xuICAgIHJlbGF0aXZlID0gcmVsO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBVcmwoKTtcbiAgdmFyIHRrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gIGZvciAodmFyIHRrID0gMDsgdGsgPCB0a2V5cy5sZW5ndGg7IHRrKyspIHtcbiAgICB2YXIgdGtleSA9IHRrZXlzW3RrXTtcbiAgICByZXN1bHRbdGtleV0gPSB0aGlzW3RrZXldO1xuICB9XG5cbiAgLy8gaGFzaCBpcyBhbHdheXMgb3ZlcnJpZGRlbiwgbm8gbWF0dGVyIHdoYXQuXG4gIC8vIGV2ZW4gaHJlZj1cIlwiIHdpbGwgcmVtb3ZlIGl0LlxuICByZXN1bHQuaGFzaCA9IHJlbGF0aXZlLmhhc2g7XG5cbiAgLy8gaWYgdGhlIHJlbGF0aXZlIHVybCBpcyBlbXB0eSwgdGhlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byBkbyBoZXJlLlxuICBpZiAocmVsYXRpdmUuaHJlZiA9PT0gJycpIHtcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaHJlZnMgbGlrZSAvL2Zvby9iYXIgYWx3YXlzIGN1dCB0byB0aGUgcHJvdG9jb2wuXG4gIGlmIChyZWxhdGl2ZS5zbGFzaGVzICYmICFyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgIC8vIHRha2UgZXZlcnl0aGluZyBleGNlcHQgdGhlIHByb3RvY29sIGZyb20gcmVsYXRpdmVcbiAgICB2YXIgcmtleXMgPSBPYmplY3Qua2V5cyhyZWxhdGl2ZSk7XG4gICAgZm9yICh2YXIgcmsgPSAwOyByayA8IHJrZXlzLmxlbmd0aDsgcmsrKykge1xuICAgICAgdmFyIHJrZXkgPSBya2V5c1tya107XG4gICAgICBpZiAocmtleSAhPT0gJ3Byb3RvY29sJylcbiAgICAgICAgcmVzdWx0W3JrZXldID0gcmVsYXRpdmVbcmtleV07XG4gICAgfVxuXG4gICAgLy91cmxQYXJzZSBhcHBlbmRzIHRyYWlsaW5nIC8gdG8gdXJscyBsaWtlIGh0dHA6Ly93d3cuZXhhbXBsZS5jb21cbiAgICBpZiAoc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF0gJiZcbiAgICAgICAgcmVzdWx0Lmhvc3RuYW1lICYmICFyZXN1bHQucGF0aG5hbWUpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gcmVzdWx0LnBhdGhuYW1lID0gJy8nO1xuICAgIH1cblxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAocmVsYXRpdmUucHJvdG9jb2wgJiYgcmVsYXRpdmUucHJvdG9jb2wgIT09IHJlc3VsdC5wcm90b2NvbCkge1xuICAgIC8vIGlmIGl0J3MgYSBrbm93biB1cmwgcHJvdG9jb2wsIHRoZW4gY2hhbmdpbmdcbiAgICAvLyB0aGUgcHJvdG9jb2wgZG9lcyB3ZWlyZCB0aGluZ3NcbiAgICAvLyBmaXJzdCwgaWYgaXQncyBub3QgZmlsZTosIHRoZW4gd2UgTVVTVCBoYXZlIGEgaG9zdCxcbiAgICAvLyBhbmQgaWYgdGhlcmUgd2FzIGEgcGF0aFxuICAgIC8vIHRvIGJlZ2luIHdpdGgsIHRoZW4gd2UgTVVTVCBoYXZlIGEgcGF0aC5cbiAgICAvLyBpZiBpdCBpcyBmaWxlOiwgdGhlbiB0aGUgaG9zdCBpcyBkcm9wcGVkLFxuICAgIC8vIGJlY2F1c2UgdGhhdCdzIGtub3duIHRvIGJlIGhvc3RsZXNzLlxuICAgIC8vIGFueXRoaW5nIGVsc2UgaXMgYXNzdW1lZCB0byBiZSBhYnNvbHV0ZS5cbiAgICBpZiAoIXNsYXNoZWRQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgICAgZm9yICh2YXIgdiA9IDA7IHYgPCBrZXlzLmxlbmd0aDsgdisrKSB7XG4gICAgICAgIHZhciBrID0ga2V5c1t2XTtcbiAgICAgICAgcmVzdWx0W2tdID0gcmVsYXRpdmVba107XG4gICAgICB9XG4gICAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVzdWx0LnByb3RvY29sID0gcmVsYXRpdmUucHJvdG9jb2w7XG4gICAgaWYgKCFyZWxhdGl2ZS5ob3N0ICYmICFob3N0bGVzc1Byb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgdmFyIHJlbFBhdGggPSAocmVsYXRpdmUucGF0aG5hbWUgfHwgJycpLnNwbGl0KCcvJyk7XG4gICAgICB3aGlsZSAocmVsUGF0aC5sZW5ndGggJiYgIShyZWxhdGl2ZS5ob3N0ID0gcmVsUGF0aC5zaGlmdCgpKSk7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3QpIHJlbGF0aXZlLmhvc3QgPSAnJztcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdG5hbWUpIHJlbGF0aXZlLmhvc3RuYW1lID0gJyc7XG4gICAgICBpZiAocmVsUGF0aFswXSAhPT0gJycpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICBpZiAocmVsUGF0aC5sZW5ndGggPCAyKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsUGF0aC5qb2luKCcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbGF0aXZlLnBhdGhuYW1lO1xuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHJlc3VsdC5ob3N0ID0gcmVsYXRpdmUuaG9zdCB8fCAnJztcbiAgICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGg7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdDtcbiAgICByZXN1bHQucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgLy8gdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnBhdGhuYW1lIHx8IHJlc3VsdC5zZWFyY2gpIHtcbiAgICAgIHZhciBwID0gcmVzdWx0LnBhdGhuYW1lIHx8ICcnO1xuICAgICAgdmFyIHMgPSByZXN1bHQuc2VhcmNoIHx8ICcnO1xuICAgICAgcmVzdWx0LnBhdGggPSBwICsgcztcbiAgICB9XG4gICAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2YXIgaXNTb3VyY2VBYnMgPSAocmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyksXG4gICAgICBpc1JlbEFicyA9IChcbiAgICAgICAgICByZWxhdGl2ZS5ob3N0IHx8XG4gICAgICAgICAgcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLydcbiAgICAgICksXG4gICAgICBtdXN0RW5kQWJzID0gKGlzUmVsQWJzIHx8IGlzU291cmNlQWJzIHx8XG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuaG9zdCAmJiByZWxhdGl2ZS5wYXRobmFtZSkpLFxuICAgICAgcmVtb3ZlQWxsRG90cyA9IG11c3RFbmRBYnMsXG4gICAgICBzcmNQYXRoID0gcmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcmVsUGF0aCA9IHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICBwc3ljaG90aWMgPSByZXN1bHQucHJvdG9jb2wgJiYgIXNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdO1xuXG4gIC8vIGlmIHRoZSB1cmwgaXMgYSBub24tc2xhc2hlZCB1cmwsIHRoZW4gcmVsYXRpdmVcbiAgLy8gbGlua3MgbGlrZSAuLi8uLiBzaG91bGQgYmUgYWJsZVxuICAvLyB0byBjcmF3bCB1cCB0byB0aGUgaG9zdG5hbWUsIGFzIHdlbGwuICBUaGlzIGlzIHN0cmFuZ2UuXG4gIC8vIHJlc3VsdC5wcm90b2NvbCBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSBub3cuXG4gIC8vIExhdGVyIG9uLCBwdXQgdGhlIGZpcnN0IHBhdGggcGFydCBpbnRvIHRoZSBob3N0IGZpZWxkLlxuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gJyc7XG4gICAgcmVzdWx0LnBvcnQgPSBudWxsO1xuICAgIGlmIChyZXN1bHQuaG9zdCkge1xuICAgICAgaWYgKHNyY1BhdGhbMF0gPT09ICcnKSBzcmNQYXRoWzBdID0gcmVzdWx0Lmhvc3Q7XG4gICAgICBlbHNlIHNyY1BhdGgudW5zaGlmdChyZXN1bHQuaG9zdCk7XG4gICAgfVxuICAgIHJlc3VsdC5ob3N0ID0gJyc7XG4gICAgaWYgKHJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgICByZWxhdGl2ZS5ob3N0bmFtZSA9IG51bGw7XG4gICAgICByZWxhdGl2ZS5wb3J0ID0gbnVsbDtcbiAgICAgIGlmIChyZWxhdGl2ZS5ob3N0KSB7XG4gICAgICAgIGlmIChyZWxQYXRoWzBdID09PSAnJykgcmVsUGF0aFswXSA9IHJlbGF0aXZlLmhvc3Q7XG4gICAgICAgIGVsc2UgcmVsUGF0aC51bnNoaWZ0KHJlbGF0aXZlLmhvc3QpO1xuICAgICAgfVxuICAgICAgcmVsYXRpdmUuaG9zdCA9IG51bGw7XG4gICAgfVxuICAgIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzICYmIChyZWxQYXRoWzBdID09PSAnJyB8fCBzcmNQYXRoWzBdID09PSAnJyk7XG4gIH1cblxuICBpZiAoaXNSZWxBYnMpIHtcbiAgICAvLyBpdCdzIGFic29sdXRlLlxuICAgIHJlc3VsdC5ob3N0ID0gKHJlbGF0aXZlLmhvc3QgfHwgcmVsYXRpdmUuaG9zdCA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3QgOiByZXN1bHQuaG9zdDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAocmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdG5hbWUgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgOiByZXN1bHQuaG9zdG5hbWU7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICBzcmNQYXRoID0gcmVsUGF0aDtcbiAgICAvLyBmYWxsIHRocm91Z2ggdG8gdGhlIGRvdC1oYW5kbGluZyBiZWxvdy5cbiAgfSBlbHNlIGlmIChyZWxQYXRoLmxlbmd0aCkge1xuICAgIC8vIGl0J3MgcmVsYXRpdmVcbiAgICAvLyB0aHJvdyBhd2F5IHRoZSBleGlzdGluZyBmaWxlLCBhbmQgdGFrZSB0aGUgbmV3IHBhdGggaW5zdGVhZC5cbiAgICBpZiAoIXNyY1BhdGgpIHNyY1BhdGggPSBbXTtcbiAgICBzcmNQYXRoLnBvcCgpO1xuICAgIHNyY1BhdGggPSBzcmNQYXRoLmNvbmNhdChyZWxQYXRoKTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICB9IGVsc2UgaWYgKCF1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKHJlbGF0aXZlLnNlYXJjaCkpIHtcbiAgICAvLyBqdXN0IHB1bGwgb3V0IHRoZSBzZWFyY2guXG4gICAgLy8gbGlrZSBocmVmPSc/Zm9vJy5cbiAgICAvLyBQdXQgdGhpcyBhZnRlciB0aGUgb3RoZXIgdHdvIGNhc2VzIGJlY2F1c2UgaXQgc2ltcGxpZmllcyB0aGUgYm9vbGVhbnNcbiAgICBpZiAocHN5Y2hvdGljKSB7XG4gICAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IHNyY1BhdGguc2hpZnQoKTtcbiAgICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAgIC8vdGhpcyBlc3BlY2lhbGx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKCF1dGlsLmlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICF1dGlsLmlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIC8vIG5vIHBhdGggYXQgYWxsLiAgZWFzeS5cbiAgICAvLyB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQgdGhlIG90aGVyIHN0dWZmIGFib3ZlLlxuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQuc2VhcmNoKSB7XG4gICAgICByZXN1bHQucGF0aCA9ICcvJyArIHJlc3VsdC5zZWFyY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGlmIGEgdXJsIEVORHMgaW4gLiBvciAuLiwgdGhlbiBpdCBtdXN0IGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICAvLyBob3dldmVyLCBpZiBpdCBlbmRzIGluIGFueXRoaW5nIGVsc2Ugbm9uLXNsYXNoeSxcbiAgLy8gdGhlbiBpdCBtdXN0IE5PVCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgdmFyIGxhc3QgPSBzcmNQYXRoLnNsaWNlKC0xKVswXTtcbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSAoXG4gICAgICAocmVzdWx0Lmhvc3QgfHwgcmVsYXRpdmUuaG9zdCB8fCBzcmNQYXRoLmxlbmd0aCA+IDEpICYmXG4gICAgICAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHx8IGxhc3QgPT09ICcnKTtcblxuICAvLyBzdHJpcCBzaW5nbGUgZG90cywgcmVzb2x2ZSBkb3VibGUgZG90cyB0byBwYXJlbnQgZGlyXG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBzcmNQYXRoLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICBsYXN0ID0gc3JjUGF0aFtpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoIW11c3RFbmRBYnMgJiYgIXJlbW92ZUFsbERvdHMpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHNyY1BhdGgudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAobXVzdEVuZEFicyAmJiBzcmNQYXRoWzBdICE9PSAnJyAmJlxuICAgICAgKCFzcmNQYXRoWzBdIHx8IHNyY1BhdGhbMF0uY2hhckF0KDApICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmIChoYXNUcmFpbGluZ1NsYXNoICYmIChzcmNQYXRoLmpvaW4oJy8nKS5zdWJzdHIoLTEpICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC5wdXNoKCcnKTtcbiAgfVxuXG4gIHZhciBpc0Fic29sdXRlID0gc3JjUGF0aFswXSA9PT0gJycgfHxcbiAgICAgIChzcmNQYXRoWzBdICYmIHNyY1BhdGhbMF0uY2hhckF0KDApID09PSAnLycpO1xuXG4gIC8vIHB1dCB0aGUgaG9zdCBiYWNrXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IGlzQWJzb2x1dGUgPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNQYXRoLmxlbmd0aCA/IHNyY1BhdGguc2hpZnQoKSA6ICcnO1xuICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgfHwgKHJlc3VsdC5ob3N0ICYmIHNyY1BhdGgubGVuZ3RoKTtcblxuICBpZiAobXVzdEVuZEFicyAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gc3JjUGF0aC5qb2luKCcvJyk7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgcmVxdWVzdC5odHRwXG4gIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICB9XG4gIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aCB8fCByZXN1bHQuYXV0aDtcbiAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblVybC5wcm90b3R5cGUucGFyc2VIb3N0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBob3N0ID0gdGhpcy5ob3N0O1xuICB2YXIgcG9ydCA9IHBvcnRQYXR0ZXJuLmV4ZWMoaG9zdCk7XG4gIGlmIChwb3J0KSB7XG4gICAgcG9ydCA9IHBvcnRbMF07XG4gICAgaWYgKHBvcnQgIT09ICc6Jykge1xuICAgICAgdGhpcy5wb3J0ID0gcG9ydC5zdWJzdHIoMSk7XG4gICAgfVxuICAgIGhvc3QgPSBob3N0LnN1YnN0cigwLCBob3N0Lmxlbmd0aCAtIHBvcnQubGVuZ3RoKTtcbiAgfVxuICBpZiAoaG9zdCkgdGhpcy5ob3N0bmFtZSA9IGhvc3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3VybC91cmwuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZSB2MS40LjEgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJlxuXHRcdCFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHQhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKFxuXHRcdGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLnNlbGYgPT09IGZyZWVHbG9iYWxcblx0KSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXlxceDIwLVxceDdFXS8sIC8vIHVucHJpbnRhYmxlIEFTQ0lJIGNoYXJzICsgbm9uLUFTQ0lJIGNoYXJzXG5cdHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2csIC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuXHQvKiogRXJyb3IgbWVzc2FnZXMgKi9cblx0ZXJyb3JzID0ge1xuXHRcdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdFx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0XHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xuXHR9LFxuXG5cdC8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cblx0YmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluLFxuXHRmbG9vciA9IE1hdGguZmxvb3IsXG5cdHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUsXG5cblx0LyoqIFRlbXBvcmFyeSB2YXJpYWJsZSAqL1xuXHRrZXk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cblx0ICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZXJyb3IodHlwZSkge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGVycm9yc1t0eXBlXSk7XG5cdH1cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGBBcnJheSNtYXBgIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeSBhcnJheVxuXHQgKiBpdGVtLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IGFycmF5IG9mIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXAoYXJyYXksIGZuKSB7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0XHRyZXN1bHRbbGVuZ3RoXSA9IGZuKGFycmF5W2xlbmd0aF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgc2ltcGxlIGBBcnJheSNtYXBgLWxpa2Ugd3JhcHBlciB0byB3b3JrIHdpdGggZG9tYWluIG5hbWUgc3RyaW5ncyBvciBlbWFpbFxuXHQgKiBhZGRyZXNzZXMuXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeVxuXHQgKiBjaGFyYWN0ZXIuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgc3RyaW5nIG9mIGNoYXJhY3RlcnMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrXG5cdCAqIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwRG9tYWluKHN0cmluZywgZm4pIHtcblx0XHR2YXIgcGFydHMgPSBzdHJpbmcuc3BsaXQoJ0AnKTtcblx0XHR2YXIgcmVzdWx0ID0gJyc7XG5cdFx0aWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdC8vIEluIGVtYWlsIGFkZHJlc3Nlcywgb25seSB0aGUgZG9tYWluIG5hbWUgc2hvdWxkIGJlIHB1bnljb2RlZC4gTGVhdmVcblx0XHRcdC8vIHRoZSBsb2NhbCBwYXJ0IChpLmUuIGV2ZXJ5dGhpbmcgdXAgdG8gYEBgKSBpbnRhY3QuXG5cdFx0XHRyZXN1bHQgPSBwYXJ0c1swXSArICdAJztcblx0XHRcdHN0cmluZyA9IHBhcnRzWzFdO1xuXHRcdH1cblx0XHQvLyBBdm9pZCBgc3BsaXQocmVnZXgpYCBmb3IgSUU4IGNvbXBhdGliaWxpdHkuIFNlZSAjMTcuXG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmVnZXhTZXBhcmF0b3JzLCAnXFx4MkUnKTtcblx0XHR2YXIgbGFiZWxzID0gc3RyaW5nLnNwbGl0KCcuJyk7XG5cdFx0dmFyIGVuY29kZWQgPSBtYXAobGFiZWxzLCBmbikuam9pbignLicpO1xuXHRcdHJldHVybiByZXN1bHQgKyBlbmNvZGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgbnVtZXJpYyBjb2RlIHBvaW50cyBvZiBlYWNoIFVuaWNvZGVcblx0ICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcuIFdoaWxlIEphdmFTY3JpcHQgdXNlcyBVQ1MtMiBpbnRlcm5hbGx5LFxuXHQgKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBhIHBhaXIgb2Ygc3Vycm9nYXRlIGhhbHZlcyAoZWFjaCBvZiB3aGljaFxuXHQgKiBVQ1MtMiBleHBvc2VzIGFzIHNlcGFyYXRlIGNoYXJhY3RlcnMpIGludG8gYSBzaW5nbGUgY29kZSBwb2ludCxcblx0ICogbWF0Y2hpbmcgVVRGLTE2LlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmVuY29kZWBcblx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGRlY29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgb2YgY29kZSBwb2ludHMuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgY291bnRlciA9IDAsXG5cdFx0ICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG5cdFx0ICAgIHZhbHVlLFxuXHRcdCAgICBleHRyYTtcblx0XHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdFx0ZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHN0cmluZyBiYXNlZCBvbiBhbiBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmRlY29kZWBcblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZW5jb2RlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvZGVQb2ludHMgVGhlIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0XHRyZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdFx0aWYgKHZhbHVlID4gMHhGRkZGKSB7XG5cdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0XHR2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBiYXNpYyBjb2RlIHBvaW50IGludG8gYSBkaWdpdC9pbnRlZ2VyLlxuXHQgKiBAc2VlIGBkaWdpdFRvQmFzaWMoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVQb2ludCBUaGUgYmFzaWMgbnVtZXJpYyBjb2RlIHBvaW50IHZhbHVlLlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQgKGZvciB1c2UgaW5cblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuXHQgKiB0aGUgY29kZSBwb2ludCBkb2VzIG5vdCByZXByZXNlbnQgYSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0XHRpZiAoY29kZVBvaW50IC0gNDggPCAxMCkge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDIyO1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gNjUgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDY1O1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gOTcgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDk3O1xuXHRcdH1cblx0XHRyZXR1cm4gYmFzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlnaXQgVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGlzIGBkaWdpdGAsIHdoaWNoIG5lZWRzIHRvIGJlIGluIHRoZSByYW5nZVxuXHQgKiBgMGAgdG8gYGJhc2UgLSAxYC4gSWYgYGZsYWdgIGlzIG5vbi16ZXJvLCB0aGUgdXBwZXJjYXNlIGZvcm0gaXNcblx0ICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcblx0ICogaWYgYGZsYWdgIGlzIG5vbi16ZXJvIGFuZCBgZGlnaXRgIGhhcyBubyB1cHBlcmNhc2UgZm9ybS5cblx0ICovXG5cdGZ1bmN0aW9uIGRpZ2l0VG9CYXNpYyhkaWdpdCwgZmxhZykge1xuXHRcdC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG5cdFx0Ly8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG5cdFx0cmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KSAtICgoZmxhZyAhPSAwKSA8PCA1KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuXHQgKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gYWRhcHQoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG5cdFx0dmFyIGsgPSAwO1xuXHRcdGRlbHRhID0gZmlyc3RUaW1lID8gZmxvb3IoZGVsdGEgLyBkYW1wKSA6IGRlbHRhID4+IDE7XG5cdFx0ZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuXHRcdGZvciAoLyogbm8gaW5pdGlhbGl6YXRpb24gKi87IGRlbHRhID4gYmFzZU1pbnVzVE1pbiAqIHRNYXggPj4gMTsgayArPSBiYXNlKSB7XG5cdFx0XHRkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG5cdFx0fVxuXHRcdHJldHVybiBmbG9vcihrICsgKGJhc2VNaW51c1RNaW4gKyAxKSAqIGRlbHRhIC8gKGRlbHRhICsgc2tldykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scyB0byBhIHN0cmluZyBvZiBVbmljb2RlXG5cdCAqIHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHRcdC8vIERvbid0IHVzZSBVQ1MtMlxuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdFx0ICAgIG91dCxcblx0XHQgICAgaSA9IDAsXG5cdFx0ICAgIG4gPSBpbml0aWFsTixcblx0XHQgICAgYmlhcyA9IGluaXRpYWxCaWFzLFxuXHRcdCAgICBiYXNpYyxcblx0XHQgICAgaixcblx0XHQgICAgaW5kZXgsXG5cdFx0ICAgIG9sZGksXG5cdFx0ICAgIHcsXG5cdFx0ICAgIGssXG5cdFx0ICAgIGRpZ2l0LFxuXHRcdCAgICB0LFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgYmFzZU1pbnVzVDtcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHM6IGxldCBgYmFzaWNgIGJlIHRoZSBudW1iZXIgb2YgaW5wdXQgY29kZVxuXHRcdC8vIHBvaW50cyBiZWZvcmUgdGhlIGxhc3QgZGVsaW1pdGVyLCBvciBgMGAgaWYgdGhlcmUgaXMgbm9uZSwgdGhlbiBjb3B5XG5cdFx0Ly8gdGhlIGZpcnN0IGJhc2ljIGNvZGUgcG9pbnRzIHRvIHRoZSBvdXRwdXQuXG5cblx0XHRiYXNpYyA9IGlucHV0Lmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG5cdFx0aWYgKGJhc2ljIDwgMCkge1xuXHRcdFx0YmFzaWMgPSAwO1xuXHRcdH1cblxuXHRcdGZvciAoaiA9IDA7IGogPCBiYXNpYzsgKytqKSB7XG5cdFx0XHQvLyBpZiBpdCdzIG5vdCBhIGJhc2ljIGNvZGUgcG9pbnRcblx0XHRcdGlmIChpbnB1dC5jaGFyQ29kZUF0KGopID49IDB4ODApIHtcblx0XHRcdFx0ZXJyb3IoJ25vdC1iYXNpYycpO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0LnB1c2goaW5wdXQuY2hhckNvZGVBdChqKSk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBkZWNvZGluZyBsb29wOiBzdGFydCBqdXN0IGFmdGVyIHRoZSBsYXN0IGRlbGltaXRlciBpZiBhbnkgYmFzaWMgY29kZVxuXHRcdC8vIHBvaW50cyB3ZXJlIGNvcGllZDsgc3RhcnQgYXQgdGhlIGJlZ2lubmluZyBvdGhlcndpc2UuXG5cblx0XHRmb3IgKGluZGV4ID0gYmFzaWMgPiAwID8gYmFzaWMgKyAxIDogMDsgaW5kZXggPCBpbnB1dExlbmd0aDsgLyogbm8gZmluYWwgZXhwcmVzc2lvbiAqLykge1xuXG5cdFx0XHQvLyBgaW5kZXhgIGlzIHRoZSBpbmRleCBvZiB0aGUgbmV4dCBjaGFyYWN0ZXIgdG8gYmUgY29uc3VtZWQuXG5cdFx0XHQvLyBEZWNvZGUgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciBpbnRvIGBkZWx0YWAsXG5cdFx0XHQvLyB3aGljaCBnZXRzIGFkZGVkIHRvIGBpYC4gVGhlIG92ZXJmbG93IGNoZWNraW5nIGlzIGVhc2llclxuXHRcdFx0Ly8gaWYgd2UgaW5jcmVhc2UgYGlgIGFzIHdlIGdvLCB0aGVuIHN1YnRyYWN0IG9mZiBpdHMgc3RhcnRpbmdcblx0XHRcdC8vIHZhbHVlIGF0IHRoZSBlbmQgdG8gb2J0YWluIGBkZWx0YWAuXG5cdFx0XHRmb3IgKG9sZGkgPSBpLCB3ID0gMSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cblx0XHRcdFx0aWYgKGluZGV4ID49IGlucHV0TGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ2ludmFsaWQtaW5wdXQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRpZ2l0ID0gYmFzaWNUb0RpZ2l0KGlucHV0LmNoYXJDb2RlQXQoaW5kZXgrKykpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA+PSBiYXNlIHx8IGRpZ2l0ID4gZmxvb3IoKG1heEludCAtIGkpIC8gdykpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGkgKz0gZGlnaXQgKiB3O1xuXHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPCB0KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdGlmICh3ID4gZmxvb3IobWF4SW50IC8gYmFzZU1pbnVzVCkpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHcgKj0gYmFzZU1pbnVzVDtcblxuXHRcdFx0fVxuXG5cdFx0XHRvdXQgPSBvdXRwdXQubGVuZ3RoICsgMTtcblx0XHRcdGJpYXMgPSBhZGFwdChpIC0gb2xkaSwgb3V0LCBvbGRpID09IDApO1xuXG5cdFx0XHQvLyBgaWAgd2FzIHN1cHBvc2VkIHRvIHdyYXAgYXJvdW5kIGZyb20gYG91dGAgdG8gYDBgLFxuXHRcdFx0Ly8gaW5jcmVtZW50aW5nIGBuYCBlYWNoIHRpbWUsIHNvIHdlJ2xsIGZpeCB0aGF0IG5vdzpcblx0XHRcdGlmIChmbG9vcihpIC8gb3V0KSA+IG1heEludCAtIG4pIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdG4gKz0gZmxvb3IoaSAvIG91dCk7XG5cdFx0XHRpICU9IG91dDtcblxuXHRcdFx0Ly8gSW5zZXJ0IGBuYCBhdCBwb3NpdGlvbiBgaWAgb2YgdGhlIG91dHB1dFxuXHRcdFx0b3V0cHV0LnNwbGljZShpKyssIDAsIG4pO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVjczJlbmNvZGUob3V0cHV0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMgKGUuZy4gYSBkb21haW4gbmFtZSBsYWJlbCkgdG8gYVxuXHQgKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcblx0XHR2YXIgbixcblx0XHQgICAgZGVsdGEsXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50LFxuXHRcdCAgICBiYXNpY0xlbmd0aCxcblx0XHQgICAgYmlhcyxcblx0XHQgICAgaixcblx0XHQgICAgbSxcblx0XHQgICAgcSxcblx0XHQgICAgayxcblx0XHQgICAgdCxcblx0XHQgICAgY3VycmVudFZhbHVlLFxuXHRcdCAgICBvdXRwdXQgPSBbXSxcblx0XHQgICAgLyoqIGBpbnB1dExlbmd0aGAgd2lsbCBob2xkIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgaW4gYGlucHV0YC4gKi9cblx0XHQgICAgaW5wdXRMZW5ndGgsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsXG5cdFx0ICAgIGJhc2VNaW51c1QsXG5cdFx0ICAgIHFNaW51c1Q7XG5cblx0XHQvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBVbmljb2RlXG5cdFx0aW5wdXQgPSB1Y3MyZGVjb2RlKGlucHV0KTtcblxuXHRcdC8vIENhY2hlIHRoZSBsZW5ndGhcblx0XHRpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHN0YXRlXG5cdFx0biA9IGluaXRpYWxOO1xuXHRcdGRlbHRhID0gMDtcblx0XHRiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzXG5cdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IDB4ODApIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGggPSBvdXRwdXQubGVuZ3RoO1xuXG5cdFx0Ly8gYGhhbmRsZWRDUENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cdFx0Ly8gYGJhc2ljTGVuZ3RoYCBpcyB0aGUgbnVtYmVyIG9mIGJhc2ljIGNvZGUgcG9pbnRzLlxuXG5cdFx0Ly8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgLSBpZiBpdCBpcyBub3QgZW1wdHkgLSB3aXRoIGEgZGVsaW1pdGVyXG5cdFx0aWYgKGJhc2ljTGVuZ3RoKSB7XG5cdFx0XHRvdXRwdXQucHVzaChkZWxpbWl0ZXIpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZW5jb2RpbmcgbG9vcDpcblx0XHR3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuXG5cdFx0XHQvLyBBbGwgbm9uLWJhc2ljIGNvZGUgcG9pbnRzIDwgbiBoYXZlIGJlZW4gaGFuZGxlZCBhbHJlYWR5LiBGaW5kIHRoZSBuZXh0XG5cdFx0XHQvLyBsYXJnZXIgb25lOlxuXHRcdFx0Zm9yIChtID0gbWF4SW50LCBqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPj0gbiAmJiBjdXJyZW50VmFsdWUgPCBtKSB7XG5cdFx0XHRcdFx0bSA9IGN1cnJlbnRWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbmNyZWFzZSBgZGVsdGFgIGVub3VnaCB0byBhZHZhbmNlIHRoZSBkZWNvZGVyJ3MgPG4saT4gc3RhdGUgdG8gPG0sMD4sXG5cdFx0XHQvLyBidXQgZ3VhcmQgYWdhaW5zdCBvdmVyZmxvd1xuXHRcdFx0aGFuZGxlZENQQ291bnRQbHVzT25lID0gaGFuZGxlZENQQ291bnQgKyAxO1xuXHRcdFx0aWYgKG0gLSBuID4gZmxvb3IoKG1heEludCAtIGRlbHRhKSAvIGhhbmRsZWRDUENvdW50UGx1c09uZSkpIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG5cdFx0XHRuID0gbTtcblxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PSBuKSB7XG5cdFx0XHRcdFx0Ly8gUmVwcmVzZW50IGRlbHRhIGFzIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXJcblx0XHRcdFx0XHRmb3IgKHEgPSBkZWx0YSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cdFx0XHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblx0XHRcdFx0XHRcdGlmIChxIDwgdCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHFNaW51c1QgPSBxIC0gdDtcblx0XHRcdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRcdG91dHB1dC5wdXNoKFxuXHRcdFx0XHRcdFx0XHRzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHQgKyBxTWludXNUICUgYmFzZU1pbnVzVCwgMCkpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHEsIDApKSk7XG5cdFx0XHRcdFx0YmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcblx0XHRcdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRcdFx0KytoYW5kbGVkQ1BDb3VudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQrK2RlbHRhO1xuXHRcdFx0KytuO1xuXG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzc1xuXHQgKiB0byBVbmljb2RlLiBPbmx5IHRoZSBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGlucHV0IHdpbGwgYmUgY29udmVydGVkLCBpLmUuXG5cdCAqIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlblxuXHQgKiBjb252ZXJ0ZWQgdG8gVW5pY29kZS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGVkIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogY29udmVydCB0byBVbmljb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcblx0ICogc3RyaW5nLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9Vbmljb2RlKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzcyB0b1xuXHQgKiBQdW55Y29kZS4gT25seSB0aGUgbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCxcblx0ICogaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQncyBhbHJlYWR5IGluXG5cdCAqIEFTQ0lJLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvIGNvbnZlcnQsIGFzIGFcblx0ICogVW5pY29kZSBzdHJpbmcuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUgb3Jcblx0ICogZW1haWwgYWRkcmVzcy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvQVNDSUkoaW5wdXQpIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqIERlZmluZSB0aGUgcHVibGljIEFQSSAqL1xuXHRwdW55Y29kZSA9IHtcblx0XHQvKipcblx0XHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgUHVueWNvZGUuanMgdmVyc2lvbiBudW1iZXIuXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgU3RyaW5nXG5cdFx0ICovXG5cdFx0J3ZlcnNpb24nOiAnMS40LjEnLFxuXHRcdC8qKlxuXHRcdCAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG5cdFx0ICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cblx0XHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBPYmplY3Rcblx0XHQgKi9cblx0XHQndWNzMic6IHtcblx0XHRcdCdkZWNvZGUnOiB1Y3MyZGVjb2RlLFxuXHRcdFx0J2VuY29kZSc6IHVjczJlbmNvZGVcblx0XHR9LFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQndG9BU0NJSSc6IHRvQVNDSUksXG5cdFx0J3RvVW5pY29kZSc6IHRvVW5pY29kZVxuXHR9O1xuXG5cdC8qKiBFeHBvc2UgYHB1bnljb2RlYCAqL1xuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZSgncHVueWNvZGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBwdW55Y29kZTtcblx0XHR9KTtcblx0fSBlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiBmcmVlTW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzKSB7XG5cdFx0XHQvLyBpbiBOb2RlLmpzLCBpby5qcywgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBwdW55Y29kZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAoa2V5IGluIHB1bnljb2RlKSB7XG5cdFx0XHRcdHB1bnljb2RlLmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBwdW55Y29kZVtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Ly8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QucHVueWNvZGUgPSBwdW55Y29kZTtcblx0fVxuXG59KHRoaXMpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wdW55Y29kZS9wdW55Y29kZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNTdHJpbmc6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZyc7XG4gIH0sXG4gIGlzT2JqZWN0OiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gYXJnID09PSBudWxsO1xuICB9LFxuICBpc051bGxPclVuZGVmaW5lZDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PSBudWxsO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3VybC91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG1hcChvYmplY3RLZXlzKG9iaiksIGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBtYXAob2JqW2tdLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIhZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShlKTtlbHNle3ZhciB0O1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/dD13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD90PWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKHQ9c2VsZiksdC5vYmplY3RIYXNoPWUoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIG8odSxhKXtpZighblt1XSl7aWYoIXRbdV0pe3ZhciBmPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWEmJmYpcmV0dXJuIGYodSwhMCk7aWYoaSlyZXR1cm4gaSh1LCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3UrXCInXCIpfXZhciBzPW5bdV09e2V4cG9ydHM6e319O3RbdV1bMF0uY2FsbChzLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFt1XVsxXVtlXTtyZXR1cm4gbyhuP246ZSl9LHMscy5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW3VdLmV4cG9ydHN9Zm9yKHZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsdT0wO3U8ci5sZW5ndGg7dSsrKW8oclt1XSk7cmV0dXJuIG99KHsxOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHIsbyxpLHUsYSxmLHMsYyxsKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBkKGUsdCl7cmV0dXJuIHQ9aChlLHQpLHkoZSx0KX1mdW5jdGlvbiBoKGUsdCl7aWYodD10fHx7fSx0LmFsZ29yaXRobT10LmFsZ29yaXRobXx8XCJzaGExXCIsdC5lbmNvZGluZz10LmVuY29kaW5nfHxcImhleFwiLHQuZXhjbHVkZVZhbHVlcz0hIXQuZXhjbHVkZVZhbHVlcyx0LmFsZ29yaXRobT10LmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpLHQuZW5jb2Rpbmc9dC5lbmNvZGluZy50b0xvd2VyQ2FzZSgpLHQuaWdub3JlVW5rbm93bj10Lmlnbm9yZVVua25vd249PT0hMCx0LnJlc3BlY3RUeXBlPXQucmVzcGVjdFR5cGUhPT0hMSx0LnJlc3BlY3RGdW5jdGlvbk5hbWVzPXQucmVzcGVjdEZ1bmN0aW9uTmFtZXMhPT0hMSx0LnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXM9dC5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzIT09ITEsdC51bm9yZGVyZWRBcnJheXM9dC51bm9yZGVyZWRBcnJheXM9PT0hMCx0LnVub3JkZXJlZFNldHM9dC51bm9yZGVyZWRTZXRzIT09ITEsdC5yZXBsYWNlcj10LnJlcGxhY2VyfHx2b2lkIDAsdC5leGNsdWRlS2V5cz10LmV4Y2x1ZGVLZXlzfHx2b2lkIDAsXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IGFyZ3VtZW50IHJlcXVpcmVkLlwiKTtmb3IodmFyIG49MDtuPHYubGVuZ3RoOysrbil2W25dLnRvTG93ZXJDYXNlKCk9PT10LmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpJiYodC5hbGdvcml0aG09dltuXSk7aWYodi5pbmRleE9mKHQuYWxnb3JpdGhtKT09PS0xKXRocm93IG5ldyBFcnJvcignQWxnb3JpdGhtIFwiJyt0LmFsZ29yaXRobSsnXCIgIG5vdCBzdXBwb3J0ZWQuIHN1cHBvcnRlZCB2YWx1ZXM6ICcrdi5qb2luKFwiLCBcIikpO2lmKG0uaW5kZXhPZih0LmVuY29kaW5nKT09PS0xJiZcInBhc3N0aHJvdWdoXCIhPT10LmFsZ29yaXRobSl0aHJvdyBuZXcgRXJyb3IoJ0VuY29kaW5nIFwiJyt0LmVuY29kaW5nKydcIiAgbm90IHN1cHBvcnRlZC4gc3VwcG9ydGVkIHZhbHVlczogJyttLmpvaW4oXCIsIFwiKSk7cmV0dXJuIHR9ZnVuY3Rpb24gcChlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXJldHVybiExO3ZhciB0PS9eZnVuY3Rpb25cXHMrXFx3KlxccypcXChcXHMqXFwpXFxzKntcXHMrXFxbbmF0aXZlIGNvZGVcXF1cXHMrfSQvaTtyZXR1cm4gbnVsbCE9dC5leGVjKEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKX1mdW5jdGlvbiB5KGUsdCl7dmFyIG47bj1cInBhc3N0aHJvdWdoXCIhPT10LmFsZ29yaXRobT9iLmNyZWF0ZUhhc2godC5hbGdvcml0aG0pOm5ldyB3LFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLndyaXRlJiYobi53cml0ZT1uLnVwZGF0ZSxuLmVuZD1uLnVwZGF0ZSk7dmFyIHI9Zyh0LG4pO2lmKHIuZGlzcGF0Y2goZSksbi51cGRhdGV8fG4uZW5kKFwiXCIpLG4uZGlnZXN0KXJldHVybiBuLmRpZ2VzdChcImJ1ZmZlclwiPT09dC5lbmNvZGluZz92b2lkIDA6dC5lbmNvZGluZyk7dmFyIG89bi5yZWFkKCk7cmV0dXJuXCJidWZmZXJcIj09PXQuZW5jb2Rpbmc/bzpvLnRvU3RyaW5nKHQuZW5jb2RpbmcpfWZ1bmN0aW9uIGcoZSx0LG4pe249bnx8W107dmFyIHI9ZnVuY3Rpb24oZSl7cmV0dXJuIHQudXBkYXRlP3QudXBkYXRlKGUsXCJ1dGY4XCIpOnQud3JpdGUoZSxcInV0ZjhcIil9O3JldHVybntkaXNwYXRjaDpmdW5jdGlvbih0KXtlLnJlcGxhY2VyJiYodD1lLnJlcGxhY2VyKHQpKTt2YXIgbj10eXBlb2YgdDtyZXR1cm4gbnVsbD09PXQmJihuPVwibnVsbFwiKSx0aGlzW1wiX1wiK25dKHQpfSxfb2JqZWN0OmZ1bmN0aW9uKHQpe3ZhciBvPS9cXFtvYmplY3QgKC4qKVxcXS9pLHU9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpLGE9by5leGVjKHUpO2E9YT9hWzFdOlwidW5rbm93bjpbXCIrdStcIl1cIixhPWEudG9Mb3dlckNhc2UoKTt2YXIgZj1udWxsO2lmKChmPW4uaW5kZXhPZih0KSk+PTApcmV0dXJuIHRoaXMuZGlzcGF0Y2goXCJbQ0lSQ1VMQVI6XCIrZitcIl1cIik7aWYobi5wdXNoKHQpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpJiZpLmlzQnVmZmVyJiZpLmlzQnVmZmVyKHQpKXJldHVybiByKFwiYnVmZmVyOlwiKSxyKHQpO2lmKFwib2JqZWN0XCI9PT1hfHxcImZ1bmN0aW9uXCI9PT1hKXt2YXIgcz1PYmplY3Qua2V5cyh0KS5zb3J0KCk7ZS5yZXNwZWN0VHlwZT09PSExfHxwKHQpfHxzLnNwbGljZSgwLDAsXCJwcm90b3R5cGVcIixcIl9fcHJvdG9fX1wiLFwiY29uc3RydWN0b3JcIiksZS5leGNsdWRlS2V5cyYmKHM9cy5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIWUuZXhjbHVkZUtleXModCl9KSkscihcIm9iamVjdDpcIitzLmxlbmd0aCtcIjpcIik7dmFyIGM9dGhpcztyZXR1cm4gcy5mb3JFYWNoKGZ1bmN0aW9uKG4pe2MuZGlzcGF0Y2gobikscihcIjpcIiksZS5leGNsdWRlVmFsdWVzfHxjLmRpc3BhdGNoKHRbbl0pLHIoXCIsXCIpfSl9aWYoIXRoaXNbXCJfXCIrYV0pe2lmKGUuaWdub3JlVW5rbm93bilyZXR1cm4gcihcIltcIithK1wiXVwiKTt0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gb2JqZWN0IHR5cGUgXCInK2ErJ1wiJyl9dGhpc1tcIl9cIithXSh0KX0sX2FycmF5OmZ1bmN0aW9uKHQsbyl7bz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygbz9vOmUudW5vcmRlcmVkQXJyYXlzIT09ITE7dmFyIGk9dGhpcztpZihyKFwiYXJyYXk6XCIrdC5sZW5ndGgrXCI6XCIpLCFvfHx0Lmxlbmd0aDw9MSlyZXR1cm4gdC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBpLmRpc3BhdGNoKGUpfSk7dmFyIHU9W10sYT10Lm1hcChmdW5jdGlvbih0KXt2YXIgcj1uZXcgdyxvPW4uc2xpY2UoKSxpPWcoZSxyLG8pO3JldHVybiBpLmRpc3BhdGNoKHQpLHU9dS5jb25jYXQoby5zbGljZShuLmxlbmd0aCkpLHIucmVhZCgpLnRvU3RyaW5nKCl9KTtyZXR1cm4gbj1uLmNvbmNhdCh1KSxhLnNvcnQoKSx0aGlzLl9hcnJheShhLCExKX0sX2RhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJkYXRlOlwiK2UudG9KU09OKCkpfSxfc3ltYm9sOmZ1bmN0aW9uKGUpe3JldHVybiByKFwic3ltYm9sOlwiK2UudG9TdHJpbmcoKSl9LF9lcnJvcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImVycm9yOlwiK2UudG9TdHJpbmcoKSl9LF9ib29sZWFuOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiYm9vbDpcIitlLnRvU3RyaW5nKCkpfSxfc3RyaW5nOmZ1bmN0aW9uKGUpe3IoXCJzdHJpbmc6XCIrZS5sZW5ndGgrXCI6XCIpLHIoZSl9LF9mdW5jdGlvbjpmdW5jdGlvbih0KXtyKFwiZm46XCIpLHAodCk/dGhpcy5kaXNwYXRjaChcIltuYXRpdmVdXCIpOnRoaXMuZGlzcGF0Y2godC50b1N0cmluZygpKSxlLnJlc3BlY3RGdW5jdGlvbk5hbWVzIT09ITEmJnRoaXMuZGlzcGF0Y2goXCJmdW5jdGlvbi1uYW1lOlwiK1N0cmluZyh0Lm5hbWUpKSxlLnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXMmJnRoaXMuX29iamVjdCh0KX0sX251bWJlcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcIm51bWJlcjpcIitlLnRvU3RyaW5nKCkpfSxfeG1sOmZ1bmN0aW9uKGUpe3JldHVybiByKFwieG1sOlwiK2UudG9TdHJpbmcoKSl9LF9udWxsOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJOdWxsXCIpfSxfdW5kZWZpbmVkOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJVbmRlZmluZWRcIil9LF9yZWdleHA6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJyZWdleDpcIitlLnRvU3RyaW5nKCkpfSxfdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDhjbGFtcGVkYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50OGNsYW1wZWRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50OGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50MTZhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQxNmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImZsb2F0MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9mbG9hdDY0YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJmbG9hdDY0YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJhcnJheWJ1ZmZlcjpcIiksdGhpcy5kaXNwYXRjaChuZXcgVWludDhBcnJheShlKSl9LF91cmw6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1cmw6XCIrZS50b1N0cmluZygpLFwidXRmOFwiKX0sX21hcDpmdW5jdGlvbih0KXtyKFwibWFwOlwiKTt2YXIgbj1BcnJheS5mcm9tKHQpO3JldHVybiB0aGlzLl9hcnJheShuLGUudW5vcmRlcmVkU2V0cyE9PSExKX0sX3NldDpmdW5jdGlvbih0KXtyKFwic2V0OlwiKTt2YXIgbj1BcnJheS5mcm9tKHQpO3JldHVybiB0aGlzLl9hcnJheShuLGUudW5vcmRlcmVkU2V0cyE9PSExKX0sX2Jsb2I6ZnVuY3Rpb24oKXtpZihlLmlnbm9yZVVua25vd24pcmV0dXJuIHIoXCJbYmxvYl1cIik7dGhyb3cgRXJyb3IoJ0hhc2hpbmcgQmxvYiBvYmplY3RzIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkXFxuKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcHVsZW9zL29iamVjdC1oYXNoL2lzc3Vlcy8yNilcXG5Vc2UgXCJvcHRpb25zLnJlcGxhY2VyXCIgb3IgXCJvcHRpb25zLmlnbm9yZVVua25vd25cIlxcbicpfSxfZG9td2luZG93OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJkb213aW5kb3dcIil9LF9wcm9jZXNzOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJwcm9jZXNzXCIpfSxfdGltZXI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInRpbWVyXCIpfSxfcGlwZTpmdW5jdGlvbigpe3JldHVybiByKFwicGlwZVwiKX0sX3RjcDpmdW5jdGlvbigpe3JldHVybiByKFwidGNwXCIpfSxfdWRwOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ1ZHBcIil9LF90dHk6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInR0eVwiKX0sX3N0YXR3YXRjaGVyOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJzdGF0d2F0Y2hlclwiKX0sX3NlY3VyZWNvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInNlY3VyZWNvbnRleHRcIil9LF9jb25uZWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJjb25uZWN0aW9uXCIpfSxfemxpYjpmdW5jdGlvbigpe3JldHVybiByKFwiemxpYlwiKX0sX2NvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImNvbnRleHRcIil9LF9ub2Rlc2NyaXB0OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJub2Rlc2NyaXB0XCIpfSxfaHR0cHBhcnNlcjpmdW5jdGlvbigpe3JldHVybiByKFwiaHR0cHBhcnNlclwiKX0sX2RhdGF2aWV3OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJkYXRhdmlld1wiKX0sX3NpZ25hbDpmdW5jdGlvbigpe3JldHVybiByKFwic2lnbmFsXCIpfSxfZnNldmVudDpmdW5jdGlvbigpe3JldHVybiByKFwiZnNldmVudFwiKX0sX3Rsc3dyYXA6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInRsc3dyYXBcIil9fX1mdW5jdGlvbiB3KCl7cmV0dXJue2J1ZjpcIlwiLHdyaXRlOmZ1bmN0aW9uKGUpe3RoaXMuYnVmKz1lfSxlbmQ6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LHJlYWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5idWZ9fX12YXIgYj1lKFwiY3J5cHRvXCIpO249dC5leHBvcnRzPWQsbi5zaGExPWZ1bmN0aW9uKGUpe3JldHVybiBkKGUpfSxuLmtleXM9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSx7ZXhjbHVkZVZhbHVlczohMCxhbGdvcml0aG06XCJzaGExXCIsZW5jb2Rpbmc6XCJoZXhcIn0pfSxuLk1ENT1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwifSl9LG4ua2V5c01ENT1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwiLGV4Y2x1ZGVWYWx1ZXM6ITB9KX07dmFyIHY9Yi5nZXRIYXNoZXM/Yi5nZXRIYXNoZXMoKS5zbGljZSgpOltcInNoYTFcIixcIm1kNVwiXTt2LnB1c2goXCJwYXNzdGhyb3VnaFwiKTt2YXIgbT1bXCJidWZmZXJcIixcImhleFwiLFwiYmluYXJ5XCIsXCJiYXNlNjRcIl07bi53cml0ZVRvU3RyZWFtPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgbiYmKG49dCx0PXt9KSx0PWgoZSx0KSxnKHQsbikuZGlzcGF0Y2goZSl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV8xNWY3ZTIzNS5qc1wiLFwiL1wiKX0se2J1ZmZlcjozLGNyeXB0bzo1LGxZcG9JMjoxMH1dLDI6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSx0LHIsbyxpLHUsYSxmLHMpe3ZhciBjPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiOyFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KGUpe3ZhciB0PWUuY2hhckNvZGVBdCgwKTtyZXR1cm4gdD09PWl8fHQ9PT1sPzYyOnQ9PT11fHx0PT09ZD82Mzp0PGE/LTE6dDxhKzEwP3QtYSsyNisyNjp0PHMrMjY/dC1zOnQ8ZisyNj90LWYrMjY6dm9pZCAwfWZ1bmN0aW9uIG4oZSl7ZnVuY3Rpb24gbihlKXtzW2wrK109ZX12YXIgcixpLHUsYSxmLHM7aWYoZS5sZW5ndGglND4wKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDRcIik7dmFyIGM9ZS5sZW5ndGg7Zj1cIj1cIj09PWUuY2hhckF0KGMtMik/MjpcIj1cIj09PWUuY2hhckF0KGMtMSk/MTowLHM9bmV3IG8oMyplLmxlbmd0aC80LWYpLHU9Zj4wP2UubGVuZ3RoLTQ6ZS5sZW5ndGg7dmFyIGw9MDtmb3Iocj0wLGk9MDtyPHU7cis9NCxpKz0zKWE9dChlLmNoYXJBdChyKSk8PDE4fHQoZS5jaGFyQXQocisxKSk8PDEyfHQoZS5jaGFyQXQocisyKSk8PDZ8dChlLmNoYXJBdChyKzMpKSxuKCgxNjcxMTY4MCZhKT4+MTYpLG4oKDY1MjgwJmEpPj44KSxuKDI1NSZhKTtyZXR1cm4gMj09PWY/KGE9dChlLmNoYXJBdChyKSk8PDJ8dChlLmNoYXJBdChyKzEpKT4+NCxuKDI1NSZhKSk6MT09PWYmJihhPXQoZS5jaGFyQXQocikpPDwxMHx0KGUuY2hhckF0KHIrMSkpPDw0fHQoZS5jaGFyQXQocisyKSk+PjIsbihhPj44JjI1NSksbigyNTUmYSkpLHN9ZnVuY3Rpb24gcihlKXtmdW5jdGlvbiB0KGUpe3JldHVybiBjLmNoYXJBdChlKX1mdW5jdGlvbiBuKGUpe3JldHVybiB0KGU+PjE4JjYzKSt0KGU+PjEyJjYzKSt0KGU+PjYmNjMpK3QoNjMmZSl9dmFyIHIsbyxpLHU9ZS5sZW5ndGglMyxhPVwiXCI7Zm9yKHI9MCxpPWUubGVuZ3RoLXU7cjxpO3IrPTMpbz0oZVtyXTw8MTYpKyhlW3IrMV08PDgpK2VbcisyXSxhKz1uKG8pO3N3aXRjaCh1KXtjYXNlIDE6bz1lW2UubGVuZ3RoLTFdLGErPXQobz4+MiksYSs9dChvPDw0JjYzKSxhKz1cIj09XCI7YnJlYWs7Y2FzZSAyOm89KGVbZS5sZW5ndGgtMl08PDgpK2VbZS5sZW5ndGgtMV0sYSs9dChvPj4xMCksYSs9dChvPj40JjYzKSxhKz10KG88PDImNjMpLGErPVwiPVwifXJldHVybiBhfXZhciBvPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5P1VpbnQ4QXJyYXk6QXJyYXksaT1cIitcIi5jaGFyQ29kZUF0KDApLHU9XCIvXCIuY2hhckNvZGVBdCgwKSxhPVwiMFwiLmNoYXJDb2RlQXQoMCksZj1cImFcIi5jaGFyQ29kZUF0KDApLHM9XCJBXCIuY2hhckNvZGVBdCgwKSxsPVwiLVwiLmNoYXJDb2RlQXQoMCksZD1cIl9cIi5jaGFyQ29kZUF0KDApO2UudG9CeXRlQXJyYXk9bixlLmZyb21CeXRlQXJyYXk9cn0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4/dGhpcy5iYXNlNjRqcz17fTpuKX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYlwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDM6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCxyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIG8oZSx0LG4pe2lmKCEodGhpcyBpbnN0YW5jZW9mIG8pKXJldHVybiBuZXcgbyhlLHQsbik7dmFyIHI9dHlwZW9mIGU7aWYoXCJiYXNlNjRcIj09PXQmJlwic3RyaW5nXCI9PT1yKWZvcihlPU4oZSk7ZS5sZW5ndGglNCE9PTA7KWUrPVwiPVwiO3ZhciBpO2lmKFwibnVtYmVyXCI9PT1yKWk9RihlKTtlbHNlIGlmKFwic3RyaW5nXCI9PT1yKWk9by5ieXRlTGVuZ3RoKGUsdCk7ZWxzZXtpZihcIm9iamVjdFwiIT09cil0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLlwiKTtpPUYoZS5sZW5ndGgpfXZhciB1O28uX3VzZVR5cGVkQXJyYXlzP3U9by5fYXVnbWVudChuZXcgVWludDhBcnJheShpKSk6KHU9dGhpcyx1Lmxlbmd0aD1pLHUuX2lzQnVmZmVyPSEwKTt2YXIgYTtpZihvLl91c2VUeXBlZEFycmF5cyYmXCJudW1iZXJcIj09dHlwZW9mIGUuYnl0ZUxlbmd0aCl1Ll9zZXQoZSk7ZWxzZSBpZihPKGUpKWZvcihhPTA7YTxpO2ErKylvLmlzQnVmZmVyKGUpP3VbYV09ZS5yZWFkVUludDgoYSk6dVthXT1lW2FdO2Vsc2UgaWYoXCJzdHJpbmdcIj09PXIpdS53cml0ZShlLDAsdCk7ZWxzZSBpZihcIm51bWJlclwiPT09ciYmIW8uX3VzZVR5cGVkQXJyYXlzJiYhbilmb3IoYT0wO2E8aTthKyspdVthXT0wO3JldHVybiB1fWZ1bmN0aW9uIGwoZSx0LG4scil7bj1OdW1iZXIobil8fDA7dmFyIGk9ZS5sZW5ndGgtbjtyPyhyPU51bWJlcihyKSxyPmkmJihyPWkpKTpyPWk7dmFyIHU9dC5sZW5ndGg7JCh1JTI9PT0wLFwiSW52YWxpZCBoZXggc3RyaW5nXCIpLHI+dS8yJiYocj11LzIpO2Zvcih2YXIgYT0wO2E8cjthKyspe3ZhciBmPXBhcnNlSW50KHQuc3Vic3RyKDIqYSwyKSwxNik7JCghaXNOYU4oZiksXCJJbnZhbGlkIGhleCBzdHJpbmdcIiksZVtuK2FdPWZ9cmV0dXJuIG8uX2NoYXJzV3JpdHRlbj0yKmEsYX1mdW5jdGlvbiBkKGUsdCxuLHIpe3ZhciBpPW8uX2NoYXJzV3JpdHRlbj1XKFYodCksZSxuLHIpO3JldHVybiBpfWZ1bmN0aW9uIGgoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcocSh0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gcChlLHQsbixyKXtyZXR1cm4gaChlLHQsbixyKX1mdW5jdGlvbiB5KGUsdCxuLHIpe3ZhciBpPW8uX2NoYXJzV3JpdHRlbj1XKFIodCksZSxuLHIpO3JldHVybiBpfWZ1bmN0aW9uIGcoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoUCh0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gdyhlLHQsbil7cmV0dXJuIDA9PT10JiZuPT09ZS5sZW5ndGg/Ry5mcm9tQnl0ZUFycmF5KGUpOkcuZnJvbUJ5dGVBcnJheShlLnNsaWNlKHQsbikpfWZ1bmN0aW9uIGIoZSx0LG4pe3ZhciByPVwiXCIsbz1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBpPXQ7aTxuO2krKyllW2ldPD0xMjc/KHIrPUoobykrU3RyaW5nLmZyb21DaGFyQ29kZShlW2ldKSxvPVwiXCIpOm8rPVwiJVwiK2VbaV0udG9TdHJpbmcoMTYpO3JldHVybiByK0oobyl9ZnVuY3Rpb24gdihlLHQsbil7dmFyIHI9XCJcIjtuPU1hdGgubWluKGUubGVuZ3RoLG4pO2Zvcih2YXIgbz10O288bjtvKyspcis9U3RyaW5nLmZyb21DaGFyQ29kZShlW29dKTtyZXR1cm4gcn1mdW5jdGlvbiBtKGUsdCxuKXtyZXR1cm4gdihlLHQsbil9ZnVuY3Rpb24gXyhlLHQsbil7dmFyIHI9ZS5sZW5ndGg7KCF0fHx0PDApJiYodD0wKSwoIW58fG48MHx8bj5yKSYmKG49cik7Zm9yKHZhciBvPVwiXCIsaT10O2k8bjtpKyspbys9SChlW2ldKTtyZXR1cm4gb31mdW5jdGlvbiBFKGUsdCxuKXtmb3IodmFyIHI9ZS5zbGljZSh0LG4pLG89XCJcIixpPTA7aTxyLmxlbmd0aDtpKz0yKW8rPVN0cmluZy5mcm9tQ2hhckNvZGUocltpXSsyNTYqcltpKzFdKTtyZXR1cm4gb31mdW5jdGlvbiBJKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCsxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpO3JldHVybiBuPyhpPWVbdF0sdCsxPG8mJihpfD1lW3QrMV08PDgpKTooaT1lW3RdPDw4LHQrMTxvJiYoaXw9ZVt0KzFdKSksaX19ZnVuY3Rpb24gQShlLHQsbixyKXtyfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbz1lLmxlbmd0aDtpZighKHQ+PW8pKXt2YXIgaTtyZXR1cm4gbj8odCsyPG8mJihpPWVbdCsyXTw8MTYpLHQrMTxvJiYoaXw9ZVt0KzFdPDw4KSxpfD1lW3RdLHQrMzxvJiYoaSs9ZVt0KzNdPDwyND4+PjApKToodCsxPG8mJihpPWVbdCsxXTw8MTYpLHQrMjxvJiYoaXw9ZVt0KzJdPDw4KSx0KzM8byYmKGl8PWVbdCszXSksaSs9ZVt0XTw8MjQ+Pj4wKSxpfX1mdW5jdGlvbiBCKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCsxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpPUkoZSx0LG4sITApLHU9MzI3NjgmaTtyZXR1cm4gdT8oNjU1MzUtaSsxKSotMTppfX1mdW5jdGlvbiBMKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpPUEoZSx0LG4sITApLHU9MjE0NzQ4MzY0OCZpO3JldHVybiB1Pyg0Mjk0OTY3Mjk1LWkrMSkqLTE6aX19ZnVuY3Rpb24gVShlLHQsbixyKXtyZXR1cm4gcnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSxRLnJlYWQoZSx0LG4sMjMsNCl9ZnVuY3Rpb24geChlLHQsbixyKXtyZXR1cm4gcnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHQrNzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSxRLnJlYWQoZSx0LG4sNTIsOCl9ZnVuY3Rpb24gUyhlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobisxPGUubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEsodCw2NTUzNSkpO3ZhciBpPWUubGVuZ3RoO2lmKCEobj49aSkpZm9yKHZhciB1PTAsYT1NYXRoLm1pbihpLW4sMik7dTxhO3UrKyllW24rdV09KHQmMjU1PDw4KihyP3U6MS11KSk+Pj44KihyP3U6MS11KX1mdW5jdGlvbiBDKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzM8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksSyh0LDQyOTQ5NjcyOTUpKTt2YXIgaT1lLmxlbmd0aDtpZighKG4+PWkpKWZvcih2YXIgdT0wLGE9TWF0aC5taW4oaS1uLDQpO3U8YTt1KyspZVtuK3VdPXQ+Pj44KihyP3U6My11KSYyNTV9ZnVuY3Rpb24gaihlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobisxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLHoodCwzMjc2NywtMzI3NjgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHwodD49MD9TKGUsdCxuLHIsbyk6UyhlLDY1NTM1K3QrMSxuLHIsbykpfWZ1bmN0aW9uIGsoZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSx6KHQsMjE0NzQ4MzY0NywtMjE0NzQ4MzY0OCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fCh0Pj0wP0MoZSx0LG4scixvKTpDKGUsNDI5NDk2NzI5NSt0KzEsbixyLG8pKX1mdW5jdGlvbiBUKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWCh0LDMuNDAyODIzNDY2Mzg1Mjg4NmUzOCwtMy40MDI4MjM0NjYzODUyODg2ZTM4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8US53cml0ZShlLHQsbixyLDIzLDQpfWZ1bmN0aW9uIE0oZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rNzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxYKHQsMS43OTc2OTMxMzQ4NjIzMTU3ZTMwOCwtMS43OTc2OTMxMzQ4NjIzMTU3ZTMwOCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fFEud3JpdGUoZSx0LG4sciw1Miw4KX1mdW5jdGlvbiBOKGUpe3JldHVybiBlLnRyaW0/ZS50cmltKCk6ZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpfWZ1bmN0aW9uIFkoZSx0LG4pe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlP246KGU9fn5lLGU+PXQ/dDplPj0wP2U6KGUrPXQsZT49MD9lOjApKX1mdW5jdGlvbiBGKGUpe3JldHVybiBlPX5+TWF0aC5jZWlsKCtlKSxlPDA/MDplfWZ1bmN0aW9uIEQoZSl7cmV0dXJuKEFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGUpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKX0pKGUpfWZ1bmN0aW9uIE8oZSl7cmV0dXJuIEQoZSl8fG8uaXNCdWZmZXIoZSl8fGUmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZcIm51bWJlclwiPT10eXBlb2YgZS5sZW5ndGh9ZnVuY3Rpb24gSChlKXtyZXR1cm4gZTwxNj9cIjBcIitlLnRvU3RyaW5nKDE2KTplLnRvU3RyaW5nKDE2KX1mdW5jdGlvbiBWKGUpe2Zvcih2YXIgdD1bXSxuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWUuY2hhckNvZGVBdChuKTtpZihyPD0xMjcpdC5wdXNoKGUuY2hhckNvZGVBdChuKSk7ZWxzZXt2YXIgbz1uO3I+PTU1Mjk2JiZyPD01NzM0MyYmbisrO2Zvcih2YXIgaT1lbmNvZGVVUklDb21wb25lbnQoZS5zbGljZShvLG4rMSkpLnN1YnN0cigxKS5zcGxpdChcIiVcIiksdT0wO3U8aS5sZW5ndGg7dSsrKXQucHVzaChwYXJzZUludChpW3VdLDE2KSl9fXJldHVybiB0fWZ1bmN0aW9uIHEoZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl0LnB1c2goMjU1JmUuY2hhckNvZGVBdChuKSk7cmV0dXJuIHR9ZnVuY3Rpb24gUChlKXtmb3IodmFyIHQsbixyLG89W10saT0wO2k8ZS5sZW5ndGg7aSsrKXQ9ZS5jaGFyQ29kZUF0KGkpLG49dD4+OCxyPXQlMjU2LG8ucHVzaChyKSxvLnB1c2gobik7cmV0dXJuIG99ZnVuY3Rpb24gUihlKXtyZXR1cm4gRy50b0J5dGVBcnJheShlKX1mdW5jdGlvbiBXKGUsdCxuLHIpe2Zvcih2YXIgbz0wO288ciYmIShvK24+PXQubGVuZ3RofHxvPj1lLmxlbmd0aCk7bysrKXRbbytuXT1lW29dO3JldHVybiBvfWZ1bmN0aW9uIEooZSl7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZSl9Y2F0Y2godCl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNjU1MzMpfX1mdW5jdGlvbiBLKGUsdCl7JChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksJChlPj0wLFwic3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWVcIiksJChlPD10LFwidmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZVwiKSwkKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24geihlLHQsbil7JChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksJChlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLCQoZT49bixcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIiksJChNYXRoLmZsb29yKGUpPT09ZSxcInZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50XCIpfWZ1bmN0aW9uIFgoZSx0LG4peyQoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLCQoZTw9dCxcInZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZVwiKSwkKGU+PW4sXCJ2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlXCIpfWZ1bmN0aW9uICQoZSx0KXtpZighZSl0aHJvdyBuZXcgRXJyb3IodHx8XCJGYWlsZWQgYXNzZXJ0aW9uXCIpfXZhciBHPWUoXCJiYXNlNjQtanNcIiksUT1lKFwiaWVlZTc1NFwiKTtuLkJ1ZmZlcj1vLG4uU2xvd0J1ZmZlcj1vLG4uSU5TUEVDVF9NQVhfQllURVM9NTAsby5wb29sU2l6ZT04MTkyLG8uX3VzZVR5cGVkQXJyYXlzPWZ1bmN0aW9uKCl7dHJ5e3ZhciBlPW5ldyBBcnJheUJ1ZmZlcigwKSx0PW5ldyBVaW50OEFycmF5KGUpO3JldHVybiB0LmZvbz1mdW5jdGlvbigpe3JldHVybiA0Mn0sNDI9PT10LmZvbygpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnN1YmFycmF5fWNhdGNoKG4pe3JldHVybiExfX0oKSxvLmlzRW5jb2Rpbmc9ZnVuY3Rpb24oZSl7c3dpdGNoKFN0cmluZyhlKS50b0xvd2VyQ2FzZSgpKXtjYXNlXCJoZXhcIjpjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOmNhc2VcImJhc2U2NFwiOmNhc2VcInJhd1wiOmNhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnJldHVybiEwO2RlZmF1bHQ6cmV0dXJuITF9fSxvLmlzQnVmZmVyPWZ1bmN0aW9uKGUpe3JldHVybiEobnVsbD09PWV8fHZvaWQgMD09PWV8fCFlLl9pc0J1ZmZlcil9LG8uYnl0ZUxlbmd0aD1mdW5jdGlvbihlLHQpe3ZhciBuO3N3aXRjaChlKz1cIlwiLHR8fFwidXRmOFwiKXtjYXNlXCJoZXhcIjpuPWUubGVuZ3RoLzI7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6bj1WKGUpLmxlbmd0aDticmVhaztjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOmNhc2VcInJhd1wiOm49ZS5sZW5ndGg7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6bj1SKGUpLmxlbmd0aDticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpuPTIqZS5sZW5ndGg7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiBufSxvLmNvbmNhdD1mdW5jdGlvbihlLHQpe2lmKCQoRChlKSxcIlVzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxubGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuXCIpLDA9PT1lLmxlbmd0aClyZXR1cm4gbmV3IG8oMCk7aWYoMT09PWUubGVuZ3RoKXJldHVybiBlWzBdO3ZhciBuO2lmKFwibnVtYmVyXCIhPXR5cGVvZiB0KWZvcih0PTAsbj0wO248ZS5sZW5ndGg7bisrKXQrPWVbbl0ubGVuZ3RoO3ZhciByPW5ldyBvKHQpLGk9MDtmb3Iobj0wO248ZS5sZW5ndGg7bisrKXt2YXIgdT1lW25dO3UuY29weShyLGkpLGkrPXUubGVuZ3RofXJldHVybiByfSxvLnByb3RvdHlwZS53cml0ZT1mdW5jdGlvbihlLHQsbixyKXtpZihpc0Zpbml0ZSh0KSlpc0Zpbml0ZShuKXx8KHI9bixuPXZvaWQgMCk7ZWxzZXt2YXIgbz1yO3I9dCx0PW4sbj1vfXQ9TnVtYmVyKHQpfHwwO3ZhciBpPXRoaXMubGVuZ3RoLXQ7bj8obj1OdW1iZXIobiksbj5pJiYobj1pKSk6bj1pLHI9U3RyaW5nKHJ8fFwidXRmOFwiKS50b0xvd2VyQ2FzZSgpO3ZhciB1O3N3aXRjaChyKXtjYXNlXCJoZXhcIjp1PWwodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6dT1kKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImFzY2lpXCI6dT1oKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImJpbmFyeVwiOnU9cCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjp1PXkodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6dT1nKHRoaXMsZSx0LG4pO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gdX0sby5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPXRoaXM7aWYoZT1TdHJpbmcoZXx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCksdD1OdW1iZXIodCl8fDAsbj12b2lkIDAhPT1uP051bWJlcihuKTpuPXIubGVuZ3RoLG49PT10KXJldHVyblwiXCI7dmFyIG87c3dpdGNoKGUpe2Nhc2VcImhleFwiOm89XyhyLHQsbik7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6bz1iKHIsdCxuKTticmVhaztjYXNlXCJhc2NpaVwiOm89dihyLHQsbik7YnJlYWs7Y2FzZVwiYmluYXJ5XCI6bz1tKHIsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjpvPXcocix0LG4pO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm89RShyLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiBvfSxvLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm57dHlwZTpcIkJ1ZmZlclwiLGRhdGE6QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyfHx0aGlzLDApfX0sby5wcm90b3R5cGUuY29weT1mdW5jdGlvbihlLHQsbixyKXt2YXIgaT10aGlzO2lmKG58fChuPTApLHJ8fDA9PT1yfHwocj10aGlzLmxlbmd0aCksdHx8KHQ9MCksciE9PW4mJjAhPT1lLmxlbmd0aCYmMCE9PWkubGVuZ3RoKXskKHI+PW4sXCJzb3VyY2VFbmQgPCBzb3VyY2VTdGFydFwiKSwkKHQ+PTAmJnQ8ZS5sZW5ndGgsXCJ0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzXCIpLCQobj49MCYmbjxpLmxlbmd0aCxcInNvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHNcIiksJChyPj0wJiZyPD1pLmxlbmd0aCxcInNvdXJjZUVuZCBvdXQgb2YgYm91bmRzXCIpLHI+dGhpcy5sZW5ndGgmJihyPXRoaXMubGVuZ3RoKSxlLmxlbmd0aC10PHItbiYmKHI9ZS5sZW5ndGgtdCtuKTt2YXIgdT1yLW47aWYodTwxMDB8fCFvLl91c2VUeXBlZEFycmF5cylmb3IodmFyIGE9MDthPHU7YSsrKWVbYSt0XT10aGlzW2Erbl07ZWxzZSBlLl9zZXQodGhpcy5zdWJhcnJheShuLG4rdSksdCl9fSxvLnByb3RvdHlwZS5zbGljZT1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMubGVuZ3RoO2lmKGU9WShlLG4sMCksdD1ZKHQsbixuKSxvLl91c2VUeXBlZEFycmF5cylyZXR1cm4gby5fYXVnbWVudCh0aGlzLnN1YmFycmF5KGUsdCkpO2Zvcih2YXIgcj10LWUsaT1uZXcgbyhyLCh2b2lkIDApLCghMCkpLHU9MDt1PHI7dSsrKWlbdV09dGhpc1t1K2VdO3JldHVybiBpfSxvLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGNvbnNvbGUubG9nKFwiLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuXCIpLHRoaXMucmVhZFVJbnQ4KGUpfSxvLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gY29uc29sZS5sb2coXCIuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy53cml0ZVVJbnQ4KGUsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50OD1mdW5jdGlvbihlLHQpe2lmKHR8fCgkKHZvaWQgMCE9PWUmJm51bGwhPT1lLFwibWlzc2luZyBvZmZzZXRcIiksJChlPHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZT49dGhpcy5sZW5ndGgpKXJldHVybiB0aGlzW2VdfSxvLnByb3RvdHlwZS5yZWFkVUludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gSSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEEodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIG9mZnNldFwiKSwkKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpe3ZhciBuPTEyOCZ0aGlzW2VdO3JldHVybiBuPygyNTUtdGhpc1tlXSsxKSotMTp0aGlzW2VdfX0sby5wcm90b3R5cGUucmVhZEludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQih0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEIodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50MzJMRT1mdW5jdGlvbihlLHQpe3JldHVybiBMKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZEludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gTCh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRGbG9hdExFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIFUodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkRmxvYXRCRT1mdW5jdGlvbihlLHQpe3JldHVybiBVKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZERvdWJsZUxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHgodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkRG91YmxlQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4geCh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLndyaXRlVUludDg9ZnVuY3Rpb24oZSx0LG4pe258fCgkKHZvaWQgMCE9PWUmJm51bGwhPT1lLFwibWlzc2luZyB2YWx1ZVwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0PHRoaXMubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEsoZSwyNTUpKSx0Pj10aGlzLmxlbmd0aHx8KHRoaXNbdF09ZSl9LG8ucHJvdG90eXBlLndyaXRlVUludDE2TEU9ZnVuY3Rpb24oZSx0LG4pe1ModGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe1ModGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe0ModGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDMyQkU9ZnVuY3Rpb24oZSx0LG4pe0ModGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIHZhbHVlXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQ8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseihlLDEyNywtMTI4KSksdD49dGhpcy5sZW5ndGh8fChlPj0wP3RoaXMud3JpdGVVSW50OChlLHQsbik6dGhpcy53cml0ZVVJbnQ4KDI1NStlKzEsdCxuKSl9LG8ucHJvdG90eXBlLndyaXRlSW50MTZMRT1mdW5jdGlvbihlLHQsbil7aih0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQxNkJFPWZ1bmN0aW9uKGUsdCxuKXtqKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe2sodGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlSW50MzJCRT1mdW5jdGlvbihlLHQsbil7ayh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVGbG9hdExFPWZ1bmN0aW9uKGUsdCxuKXtUKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZUZsb2F0QkU9ZnVuY3Rpb24oZSx0LG4pe1QodGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlRG91YmxlTEU9ZnVuY3Rpb24oZSx0LG4pe00odGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlRG91YmxlQkU9ZnVuY3Rpb24oZSx0LG4pe00odGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLmZpbGw9ZnVuY3Rpb24oZSx0LG4pe2lmKGV8fChlPTApLHR8fCh0PTApLG58fChuPXRoaXMubGVuZ3RoKSxcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9ZS5jaGFyQ29kZUF0KDApKSwkKFwibnVtYmVyXCI9PXR5cGVvZiBlJiYhaXNOYU4oZSksXCJ2YWx1ZSBpcyBub3QgYSBudW1iZXJcIiksJChuPj10LFwiZW5kIDwgc3RhcnRcIiksbiE9PXQmJjAhPT10aGlzLmxlbmd0aCl7JCh0Pj0wJiZ0PHRoaXMubGVuZ3RoLFwic3RhcnQgb3V0IG9mIGJvdW5kc1wiKSwkKG4+PTAmJm48PXRoaXMubGVuZ3RoLFwiZW5kIG91dCBvZiBib3VuZHNcIik7Zm9yKHZhciByPXQ7cjxuO3IrKyl0aGlzW3JdPWV9fSxvLnByb3RvdHlwZS5pbnNwZWN0PWZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9dGhpcy5sZW5ndGgscj0wO3I8dDtyKyspaWYoZVtyXT1IKHRoaXNbcl0pLHI9PT1uLklOU1BFQ1RfTUFYX0JZVEVTKXtlW3IrMV09XCIuLi5cIjticmVha31yZXR1cm5cIjxCdWZmZXIgXCIrZS5qb2luKFwiIFwiKStcIj5cIn0sby5wcm90b3R5cGUudG9BcnJheUJ1ZmZlcj1mdW5jdGlvbigpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5KXtpZihvLl91c2VUeXBlZEFycmF5cylyZXR1cm4gbmV3IG8odGhpcykuYnVmZmVyO2Zvcih2YXIgZT1uZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aCksdD0wLG49ZS5sZW5ndGg7dDxuO3QrPTEpZVt0XT10aGlzW3RdO3JldHVybiBlLmJ1ZmZlcn10aHJvdyBuZXcgRXJyb3IoXCJCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKX07dmFyIFo9by5wcm90b3R5cGU7by5fYXVnbWVudD1mdW5jdGlvbihlKXtyZXR1cm4gZS5faXNCdWZmZXI9ITAsZS5fZ2V0PWUuZ2V0LGUuX3NldD1lLnNldCxlLmdldD1aLmdldCxlLnNldD1aLnNldCxlLndyaXRlPVoud3JpdGUsZS50b1N0cmluZz1aLnRvU3RyaW5nLGUudG9Mb2NhbGVTdHJpbmc9Wi50b1N0cmluZyxlLnRvSlNPTj1aLnRvSlNPTixlLmNvcHk9Wi5jb3B5LGUuc2xpY2U9Wi5zbGljZSxlLnJlYWRVSW50OD1aLnJlYWRVSW50OCxlLnJlYWRVSW50MTZMRT1aLnJlYWRVSW50MTZMRSxlLnJlYWRVSW50MTZCRT1aLnJlYWRVSW50MTZCRSxlLnJlYWRVSW50MzJMRT1aLnJlYWRVSW50MzJMRSxlLnJlYWRVSW50MzJCRT1aLnJlYWRVSW50MzJCRSxlLnJlYWRJbnQ4PVoucmVhZEludDgsZS5yZWFkSW50MTZMRT1aLnJlYWRJbnQxNkxFLGUucmVhZEludDE2QkU9Wi5yZWFkSW50MTZCRSxlLnJlYWRJbnQzMkxFPVoucmVhZEludDMyTEUsZS5yZWFkSW50MzJCRT1aLnJlYWRJbnQzMkJFLGUucmVhZEZsb2F0TEU9Wi5yZWFkRmxvYXRMRSxlLnJlYWRGbG9hdEJFPVoucmVhZEZsb2F0QkUsZS5yZWFkRG91YmxlTEU9Wi5yZWFkRG91YmxlTEUsZS5yZWFkRG91YmxlQkU9Wi5yZWFkRG91YmxlQkUsZS53cml0ZVVJbnQ4PVoud3JpdGVVSW50OCxlLndyaXRlVUludDE2TEU9Wi53cml0ZVVJbnQxNkxFLGUud3JpdGVVSW50MTZCRT1aLndyaXRlVUludDE2QkUsZS53cml0ZVVJbnQzMkxFPVoud3JpdGVVSW50MzJMRSxlLndyaXRlVUludDMyQkU9Wi53cml0ZVVJbnQzMkJFLGUud3JpdGVJbnQ4PVoud3JpdGVJbnQ4LGUud3JpdGVJbnQxNkxFPVoud3JpdGVJbnQxNkxFLGUud3JpdGVJbnQxNkJFPVoud3JpdGVJbnQxNkJFLGUud3JpdGVJbnQzMkxFPVoud3JpdGVJbnQzMkxFLGUud3JpdGVJbnQzMkJFPVoud3JpdGVJbnQzMkJFLGUud3JpdGVGbG9hdExFPVoud3JpdGVGbG9hdExFLGUud3JpdGVGbG9hdEJFPVoud3JpdGVGbG9hdEJFLGUud3JpdGVEb3VibGVMRT1aLndyaXRlRG91YmxlTEUsZS53cml0ZURvdWJsZUJFPVoud3JpdGVEb3VibGVCRSxlLmZpbGw9Wi5maWxsLGUuaW5zcGVjdD1aLmluc3BlY3QsZS50b0FycmF5QnVmZmVyPVoudG9BcnJheUJ1ZmZlcixlfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlclwiKX0se1wiYmFzZTY0LWpzXCI6MixidWZmZXI6MyxpZWVlNzU0OjExLGxZcG9JMjoxMH1dLDQ6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtpZihlLmxlbmd0aCVwIT09MCl7dmFyIG49ZS5sZW5ndGgrKHAtZS5sZW5ndGglcCk7ZT1vLmNvbmNhdChbZSx5XSxuKX1mb3IodmFyIHI9W10saT10P2UucmVhZEludDMyQkU6ZS5yZWFkSW50MzJMRSx1PTA7dTxlLmxlbmd0aDt1Kz1wKXIucHVzaChpLmNhbGwoZSx1KSk7cmV0dXJuIHJ9ZnVuY3Rpb24gZChlLHQsbil7Zm9yKHZhciByPW5ldyBvKHQpLGk9bj9yLndyaXRlSW50MzJCRTpyLndyaXRlSW50MzJMRSx1PTA7dTxlLmxlbmd0aDt1KyspaS5jYWxsKHIsZVt1XSw0KnUsITApO3JldHVybiByfWZ1bmN0aW9uIGgoZSx0LG4scil7by5pc0J1ZmZlcihlKXx8KGU9bmV3IG8oZSkpO3ZhciBpPXQobChlLHIpLGUubGVuZ3RoKmcpO3JldHVybiBkKGksbixyKX12YXIgbz1lKFwiYnVmZmVyXCIpLkJ1ZmZlcixwPTQseT1uZXcgbyhwKTt5LmZpbGwoMCk7dmFyIGc9ODt0LmV4cG9ydHM9e2hhc2g6aH19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9oZWxwZXJzLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSw1OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHQscixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBsKGUsdCxuKXtvLmlzQnVmZmVyKHQpfHwodD1uZXcgbyh0KSksby5pc0J1ZmZlcihuKXx8KG49bmV3IG8obikpLHQubGVuZ3RoPm0/dD1lKHQpOnQubGVuZ3RoPG0mJih0PW8uY29uY2F0KFt0LF9dLG0pKTtmb3IodmFyIHI9bmV3IG8obSksaT1uZXcgbyhtKSx1PTA7dTxtO3UrKylyW3VdPTU0XnRbdV0saVt1XT05Ml50W3VdO3ZhciBhPWUoby5jb25jYXQoW3Isbl0pKTtyZXR1cm4gZShvLmNvbmNhdChbaSxhXSkpfWZ1bmN0aW9uIGQoZSx0KXtlPWV8fFwic2hhMVwiO3ZhciBuPXZbZV0scj1bXSxpPTA7cmV0dXJuIG58fGgoXCJhbGdvcml0aG06XCIsZSxcImlzIG5vdCB5ZXQgc3VwcG9ydGVkXCIpLHt1cGRhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIG8uaXNCdWZmZXIoZSl8fChlPW5ldyBvKGUpKSxyLnB1c2goZSksaSs9ZS5sZW5ndGgsdGhpc30sZGlnZXN0OmZ1bmN0aW9uKGUpe3ZhciBpPW8uY29uY2F0KHIpLHU9dD9sKG4sdCxpKTpuKGkpO3JldHVybiByPW51bGwsZT91LnRvU3RyaW5nKGUpOnV9fX1mdW5jdGlvbiBoKCl7dmFyIGU9W10uc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oXCIgXCIpO3Rocm93IG5ldyBFcnJvcihbZSxcIndlIGFjY2VwdCBwdWxsIHJlcXVlc3RzXCIsXCJodHRwOi8vZ2l0aHViLmNvbS9kb21pbmljdGFyci9jcnlwdG8tYnJvd3NlcmlmeVwiXS5qb2luKFwiXFxuXCIpKX1mdW5jdGlvbiBwKGUsdCl7Zm9yKHZhciBuIGluIGUpdChlW25dLG4pfXZhciBvPWUoXCJidWZmZXJcIikuQnVmZmVyLHk9ZShcIi4vc2hhXCIpLGc9ZShcIi4vc2hhMjU2XCIpLHc9ZShcIi4vcm5nXCIpLGI9ZShcIi4vbWQ1XCIpLHY9e3NoYTE6eSxzaGEyNTY6ZyxtZDU6Yn0sbT02NCxfPW5ldyBvKG0pO18uZmlsbCgwKSxuLmNyZWF0ZUhhc2g9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSl9LG4uY3JlYXRlSG1hYz1mdW5jdGlvbihlLHQpe3JldHVybiBkKGUsdCl9LG4ucmFuZG9tQnl0ZXM9ZnVuY3Rpb24oZSx0KXtpZighdHx8IXQuY2FsbClyZXR1cm4gbmV3IG8odyhlKSk7dHJ5e3QuY2FsbCh0aGlzLHZvaWQgMCxuZXcgbyh3KGUpKSl9Y2F0Y2gobil7dChuKX19LHAoW1wiY3JlYXRlQ3JlZGVudGlhbHNcIixcImNyZWF0ZUNpcGhlclwiLFwiY3JlYXRlQ2lwaGVyaXZcIixcImNyZWF0ZURlY2lwaGVyXCIsXCJjcmVhdGVEZWNpcGhlcml2XCIsXCJjcmVhdGVTaWduXCIsXCJjcmVhdGVWZXJpZnlcIixcImNyZWF0ZURpZmZpZUhlbGxtYW5cIixcInBia2RmMlwiXSxmdW5jdGlvbihlKXtuW2VdPWZ1bmN0aW9uKCl7aChcInNvcnJ5LFwiLGUsXCJpcyBub3QgaW1wbGVtZW50ZWQgeWV0XCIpfX0pfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9tZDVcIjo2LFwiLi9ybmdcIjo3LFwiLi9zaGFcIjo4LFwiLi9zaGEyNTZcIjo5LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDY6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtlW3Q+PjVdfD0xMjg8PHQlMzIsZVsodCs2ND4+Pjk8PDQpKzE0XT10O2Zvcih2YXIgbj0xNzMyNTg0MTkzLHI9LTI3MTczMzg3OSxvPS0xNzMyNTg0MTk0LGk9MjcxNzMzODc4LHU9MDt1PGUubGVuZ3RoO3UrPTE2KXt2YXIgYT1uLGY9cixzPW8sYz1pO249aChuLHIsbyxpLGVbdSswXSw3LC02ODA4NzY5MzYpLGk9aChpLG4scixvLGVbdSsxXSwxMiwtMzg5NTY0NTg2KSxvPWgobyxpLG4scixlW3UrMl0sMTcsNjA2MTA1ODE5KSxyPWgocixvLGksbixlW3UrM10sMjIsLTEwNDQ1MjUzMzApLG49aChuLHIsbyxpLGVbdSs0XSw3LC0xNzY0MTg4OTcpLGk9aChpLG4scixvLGVbdSs1XSwxMiwxMjAwMDgwNDI2KSxvPWgobyxpLG4scixlW3UrNl0sMTcsLTE0NzMyMzEzNDEpLHI9aChyLG8saSxuLGVbdSs3XSwyMiwtNDU3MDU5ODMpLG49aChuLHIsbyxpLGVbdSs4XSw3LDE3NzAwMzU0MTYpLGk9aChpLG4scixvLGVbdSs5XSwxMiwtMTk1ODQxNDQxNyksbz1oKG8saSxuLHIsZVt1KzEwXSwxNywtNDIwNjMpLHI9aChyLG8saSxuLGVbdSsxMV0sMjIsLTE5OTA0MDQxNjIpLG49aChuLHIsbyxpLGVbdSsxMl0sNywxODA0NjAzNjgyKSxpPWgoaSxuLHIsbyxlW3UrMTNdLDEyLC00MDM0MTEwMSksbz1oKG8saSxuLHIsZVt1KzE0XSwxNywtMTUwMjAwMjI5MCkscj1oKHIsbyxpLG4sZVt1KzE1XSwyMiwxMjM2NTM1MzI5KSxuPXAobixyLG8saSxlW3UrMV0sNSwtMTY1Nzk2NTEwKSxpPXAoaSxuLHIsbyxlW3UrNl0sOSwtMTA2OTUwMTYzMiksbz1wKG8saSxuLHIsZVt1KzExXSwxNCw2NDM3MTc3MTMpLHI9cChyLG8saSxuLGVbdSswXSwyMCwtMzczODk3MzAyKSxuPXAobixyLG8saSxlW3UrNV0sNSwtNzAxNTU4NjkxKSxpPXAoaSxuLHIsbyxlW3UrMTBdLDksMzgwMTYwODMpLG89cChvLGksbixyLGVbdSsxNV0sMTQsLTY2MDQ3ODMzNSkscj1wKHIsbyxpLG4sZVt1KzRdLDIwLC00MDU1Mzc4NDgpLG49cChuLHIsbyxpLGVbdSs5XSw1LDU2ODQ0NjQzOCksaT1wKGksbixyLG8sZVt1KzE0XSw5LC0xMDE5ODAzNjkwKSxvPXAobyxpLG4scixlW3UrM10sMTQsLTE4NzM2Mzk2MSkscj1wKHIsbyxpLG4sZVt1KzhdLDIwLDExNjM1MzE1MDEpLG49cChuLHIsbyxpLGVbdSsxM10sNSwtMTQ0NDY4MTQ2NyksaT1wKGksbixyLG8sZVt1KzJdLDksLTUxNDAzNzg0KSxvPXAobyxpLG4scixlW3UrN10sMTQsMTczNTMyODQ3Mykscj1wKHIsbyxpLG4sZVt1KzEyXSwyMCwtMTkyNjYwNzczNCksbj15KG4scixvLGksZVt1KzVdLDQsLTM3ODU1OCksaT15KGksbixyLG8sZVt1KzhdLDExLC0yMDIyNTc0NDYzKSxvPXkobyxpLG4scixlW3UrMTFdLDE2LDE4MzkwMzA1NjIpLHI9eShyLG8saSxuLGVbdSsxNF0sMjMsLTM1MzA5NTU2KSxuPXkobixyLG8saSxlW3UrMV0sNCwtMTUzMDk5MjA2MCksaT15KGksbixyLG8sZVt1KzRdLDExLDEyNzI4OTMzNTMpLG89eShvLGksbixyLGVbdSs3XSwxNiwtMTU1NDk3NjMyKSxyPXkocixvLGksbixlW3UrMTBdLDIzLC0xMDk0NzMwNjQwKSxuPXkobixyLG8saSxlW3UrMTNdLDQsNjgxMjc5MTc0KSxpPXkoaSxuLHIsbyxlW3UrMF0sMTEsLTM1ODUzNzIyMiksbz15KG8saSxuLHIsZVt1KzNdLDE2LC03MjI1MjE5NzkpLHI9eShyLG8saSxuLGVbdSs2XSwyMyw3NjAyOTE4OSksbj15KG4scixvLGksZVt1KzldLDQsLTY0MDM2NDQ4NyksaT15KGksbixyLG8sZVt1KzEyXSwxMSwtNDIxODE1ODM1KSxvPXkobyxpLG4scixlW3UrMTVdLDE2LDUzMDc0MjUyMCkscj15KHIsbyxpLG4sZVt1KzJdLDIzLC05OTUzMzg2NTEpLG49ZyhuLHIsbyxpLGVbdSswXSw2LC0xOTg2MzA4NDQpLGk9ZyhpLG4scixvLGVbdSs3XSwxMCwxMTI2ODkxNDE1KSxvPWcobyxpLG4scixlW3UrMTRdLDE1LC0xNDE2MzU0OTA1KSxyPWcocixvLGksbixlW3UrNV0sMjEsLTU3NDM0MDU1KSxuPWcobixyLG8saSxlW3UrMTJdLDYsMTcwMDQ4NTU3MSksaT1nKGksbixyLG8sZVt1KzNdLDEwLC0xODk0OTg2NjA2KSxvPWcobyxpLG4scixlW3UrMTBdLDE1LC0xMDUxNTIzKSxyPWcocixvLGksbixlW3UrMV0sMjEsLTIwNTQ5MjI3OTkpLG49ZyhuLHIsbyxpLGVbdSs4XSw2LDE4NzMzMTMzNTkpLGk9ZyhpLG4scixvLGVbdSsxNV0sMTAsLTMwNjExNzQ0KSxvPWcobyxpLG4scixlW3UrNl0sMTUsLTE1NjAxOTgzODApLHI9ZyhyLG8saSxuLGVbdSsxM10sMjEsMTMwOTE1MTY0OSksbj1nKG4scixvLGksZVt1KzRdLDYsLTE0NTUyMzA3MCksaT1nKGksbixyLG8sZVt1KzExXSwxMCwtMTEyMDIxMDM3OSksbz1nKG8saSxuLHIsZVt1KzJdLDE1LDcxODc4NzI1OSkscj1nKHIsbyxpLG4sZVt1KzldLDIxLC0zNDM0ODU1NTEpLG49dyhuLGEpLHI9dyhyLGYpLG89dyhvLHMpLGk9dyhpLGMpfXJldHVybiBBcnJheShuLHIsbyxpKX1mdW5jdGlvbiBkKGUsdCxuLHIsbyxpKXtyZXR1cm4gdyhiKHcodyh0LGUpLHcocixpKSksbyksbil9ZnVuY3Rpb24gaChlLHQsbixyLG8saSx1KXtyZXR1cm4gZCh0Jm58fnQmcixlLHQsbyxpLHUpfWZ1bmN0aW9uIHAoZSx0LG4scixvLGksdSl7cmV0dXJuIGQodCZyfG4mfnIsZSx0LG8saSx1KX1mdW5jdGlvbiB5KGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKHRebl5yLGUsdCxvLGksdSl9ZnVuY3Rpb24gZyhlLHQsbixyLG8saSx1KXtyZXR1cm4gZChuXih0fH5yKSxlLHQsbyxpLHUpfWZ1bmN0aW9uIHcoZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpLHI9KGU+PjE2KSsodD4+MTYpKyhuPj4xNik7cmV0dXJuIHI8PDE2fDY1NTM1Jm59ZnVuY3Rpb24gYihlLHQpe3JldHVybiBlPDx0fGU+Pj4zMi10fXZhciB2PWUoXCIuL2hlbHBlcnNcIik7dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiB2Lmhhc2goZSxsLDE2KX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSw3OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKGUsbixyLG8saSx1LGEsZixzKXshZnVuY3Rpb24oKXt2YXIgZSxuLHI9dGhpcztlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCx0LG49bmV3IEFycmF5KGUpLHI9MDtyPGU7cisrKTA9PSgzJnIpJiYodD00Mjk0OTY3Mjk2Kk1hdGgucmFuZG9tKCkpLG5bcl09dD4+PigoMyZyKTw8MykmMjU1O3JldHVybiBufSxyLmNyeXB0byYmY3J5cHRvLmdldFJhbmRvbVZhbHVlcyYmKG49ZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXModCksdH0pLHQuZXhwb3J0cz1ufHxlfSgpfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSw4OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKG4scixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBsKGUsdCl7ZVt0Pj41XXw9MTI4PDwyNC10JTMyLGVbKHQrNjQ+Pjk8PDQpKzE1XT10O2Zvcih2YXIgbj1BcnJheSg4MCkscj0xNzMyNTg0MTkzLG89LTI3MTczMzg3OSxpPS0xNzMyNTg0MTk0LHU9MjcxNzMzODc4LGE9LTEwMDk1ODk3NzYsZj0wO2Y8ZS5sZW5ndGg7Zis9MTYpe2Zvcih2YXIgcz1yLGM9byxsPWksZz11LHc9YSxiPTA7Yjw4MDtiKyspe2I8MTY/bltiXT1lW2YrYl06bltiXT15KG5bYi0zXV5uW2ItOF1ebltiLTE0XV5uW2ItMTZdLDEpO3ZhciB2PXAocCh5KHIsNSksZChiLG8saSx1KSkscChwKGEsbltiXSksaChiKSkpO2E9dSx1PWksaT15KG8sMzApLG89cixyPXZ9cj1wKHIscyksbz1wKG8sYyksaT1wKGksbCksdT1wKHUsZyksYT1wKGEsdyl9cmV0dXJuIEFycmF5KHIsbyxpLHUsYSl9ZnVuY3Rpb24gZChlLHQsbixyKXtyZXR1cm4gZTwyMD90Jm58fnQmcjplPDQwP3Rebl5yOmU8NjA/dCZufHQmcnxuJnI6dF5uXnJ9ZnVuY3Rpb24gaChlKXtyZXR1cm4gZTwyMD8xNTE4NTAwMjQ5OmU8NDA/MTg1OTc3NTM5MzplPDYwPy0xODk0MDA3NTg4Oi04OTk0OTc1MTR9ZnVuY3Rpb24gcChlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn1mdW5jdGlvbiB5KGUsdCl7cmV0dXJuIGU8PHR8ZT4+PjMyLXR9dmFyIGc9ZShcIi4vaGVscGVyc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGcuaGFzaChlLGwsMjAsITApfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDk6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe3ZhciBsPWUoXCIuL2hlbHBlcnNcIiksZD1mdW5jdGlvbihlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn0saD1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+dHxlPDwzMi10fSxwPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fSx5PWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZSZ0Xn5lJm59LGc9ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlJnReZSZuXnQmbn0sdz1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDIpXmgoZSwxMyleaChlLDIyKX0sYj1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDYpXmgoZSwxMSleaChlLDI1KX0sdj1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDcpXmgoZSwxOClecChlLDMpO1xufSxtPWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsMTcpXmgoZSwxOSlecChlLDEwKX0sXz1mdW5jdGlvbihlLHQpe3ZhciBuLHIsbyxpLHUsYSxmLHMsYyxsLGgscCxfPW5ldyBBcnJheSgxMTE2MzUyNDA4LDE4OTk0NDc0NDEsMzA0OTMyMzQ3MSwzOTIxMDA5NTczLDk2MTk4NzE2MywxNTA4OTcwOTkzLDI0NTM2MzU3NDgsMjg3MDc2MzIyMSwzNjI0MzgxMDgwLDMxMDU5ODQwMSw2MDcyMjUyNzgsMTQyNjg4MTk4NywxOTI1MDc4Mzg4LDIxNjIwNzgyMDYsMjYxNDg4ODEwMywzMjQ4MjIyNTgwLDM4MzUzOTA0MDEsNDAyMjIyNDc3NCwyNjQzNDcwNzgsNjA0ODA3NjI4LDc3MDI1NTk4MywxMjQ5MTUwMTIyLDE1NTUwODE2OTIsMTk5NjA2NDk4NiwyNTU0MjIwODgyLDI4MjE4MzQzNDksMjk1Mjk5NjgwOCwzMjEwMzEzNjcxLDMzMzY1NzE4OTEsMzU4NDUyODcxMSwxMTM5MjY5OTMsMzM4MjQxODk1LDY2NjMwNzIwNSw3NzM1Mjk5MTIsMTI5NDc1NzM3MiwxMzk2MTgyMjkxLDE2OTUxODM3MDAsMTk4NjY2MTA1MSwyMTc3MDI2MzUwLDI0NTY5NTYwMzcsMjczMDQ4NTkyMSwyODIwMzAyNDExLDMyNTk3MzA4MDAsMzM0NTc2NDc3MSwzNTE2MDY1ODE3LDM2MDAzNTI4MDQsNDA5NDU3MTkwOSwyNzU0MjMzNDQsNDMwMjI3NzM0LDUwNjk0ODYxNiw2NTkwNjA1NTYsODgzOTk3ODc3LDk1ODEzOTU3MSwxMzIyODIyMjE4LDE1MzcwMDIwNjMsMTc0Nzg3Mzc3OSwxOTU1NTYyMjIyLDIwMjQxMDQ4MTUsMjIyNzczMDQ1MiwyMzYxODUyNDI0LDI0Mjg0MzY0NzQsMjc1NjczNDE4NywzMjA0MDMxNDc5LDMzMjkzMjUyOTgpLEU9bmV3IEFycmF5KDE3NzkwMzM3MDMsMzE0NDEzNDI3NywxMDEzOTA0MjQyLDI3NzM0ODA3NjIsMTM1OTg5MzExOSwyNjAwODIyOTI0LDUyODczNDYzNSwxNTQxNDU5MjI1KSxJPW5ldyBBcnJheSg2NCk7ZVt0Pj41XXw9MTI4PDwyNC10JTMyLGVbKHQrNjQ+Pjk8PDQpKzE1XT10O2Zvcih2YXIgYz0wO2M8ZS5sZW5ndGg7Yys9MTYpe249RVswXSxyPUVbMV0sbz1FWzJdLGk9RVszXSx1PUVbNF0sYT1FWzVdLGY9RVs2XSxzPUVbN107Zm9yKHZhciBsPTA7bDw2NDtsKyspbDwxNj9JW2xdPWVbbCtjXTpJW2xdPWQoZChkKG0oSVtsLTJdKSxJW2wtN10pLHYoSVtsLTE1XSkpLElbbC0xNl0pLGg9ZChkKGQoZChzLGIodSkpLHkodSxhLGYpKSxfW2xdKSxJW2xdKSxwPWQodyhuKSxnKG4scixvKSkscz1mLGY9YSxhPXUsdT1kKGksaCksaT1vLG89cixyPW4sbj1kKGgscCk7RVswXT1kKG4sRVswXSksRVsxXT1kKHIsRVsxXSksRVsyXT1kKG8sRVsyXSksRVszXT1kKGksRVszXSksRVs0XT1kKHUsRVs0XSksRVs1XT1kKGEsRVs1XSksRVs2XT1kKGYsRVs2XSksRVs3XT1kKHMsRVs3XSl9cmV0dXJuIEV9O3QuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4gbC5oYXNoKGUsXywzMiwhMCl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhMjU2LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjEwfV0sMTA6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSxuLHIsbyxpLHUsYSxmLHMpe2Z1bmN0aW9uIGMoKXt9dmFyIGU9dC5leHBvcnRzPXt9O2UubmV4dFRpY2s9ZnVuY3Rpb24oKXt2YXIgZT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuc2V0SW1tZWRpYXRlLHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LnBvc3RNZXNzYWdlJiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtpZihlKXJldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShlKX07aWYodCl7dmFyIG49W107cmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGZ1bmN0aW9uKGUpe3ZhciB0PWUuc291cmNlO2lmKCh0PT09d2luZG93fHxudWxsPT09dCkmJlwicHJvY2Vzcy10aWNrXCI9PT1lLmRhdGEmJihlLnN0b3BQcm9wYWdhdGlvbigpLG4ubGVuZ3RoPjApKXt2YXIgcj1uLnNoaWZ0KCk7cigpfX0sITApLGZ1bmN0aW9uKGUpe24ucHVzaChlKSx3aW5kb3cucG9zdE1lc3NhZ2UoXCJwcm9jZXNzLXRpY2tcIixcIipcIil9fXJldHVybiBmdW5jdGlvbihlKXtzZXRUaW1lb3V0KGUsMCl9fSgpLGUudGl0bGU9XCJicm93c2VyXCIsZS5icm93c2VyPSEwLGUuZW52PXt9LGUuYXJndj1bXSxlLm9uPWMsZS5hZGRMaXN0ZW5lcj1jLGUub25jZT1jLGUub2ZmPWMsZS5yZW1vdmVMaXN0ZW5lcj1jLGUucmVtb3ZlQWxsTGlzdGVuZXJzPWMsZS5lbWl0PWMsZS5iaW5kaW5nPWZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpfSxlLmN3ZD1mdW5jdGlvbigpe3JldHVyblwiL1wifSxlLmNoZGlyPWZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZFwiKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzXCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV0sMTE6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSx0LHIsbyxpLHUsYSxmLHMpe24ucmVhZD1mdW5jdGlvbihlLHQsbixyLG8pe3ZhciBpLHUsYT04Km8tci0xLGY9KDE8PGEpLTEscz1mPj4xLGM9LTcsbD1uP28tMTowLGQ9bj8tMToxLGg9ZVt0K2xdO2ZvcihsKz1kLGk9aCYoMTw8LWMpLTEsaD4+PS1jLGMrPWE7Yz4wO2k9MjU2KmkrZVt0K2xdLGwrPWQsYy09OCk7Zm9yKHU9aSYoMTw8LWMpLTEsaT4+PS1jLGMrPXI7Yz4wO3U9MjU2KnUrZVt0K2xdLGwrPWQsYy09OCk7aWYoMD09PWkpaT0xLXM7ZWxzZXtpZihpPT09ZilyZXR1cm4gdT9OYU46KGg/LTE6MSkqKDEvMCk7dSs9TWF0aC5wb3coMixyKSxpLT1zfXJldHVybihoPy0xOjEpKnUqTWF0aC5wb3coMixpLXIpfSxuLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgdSxhLGYscz04Kmktby0xLGM9KDE8PHMpLTEsbD1jPj4xLGQ9MjM9PT1vP01hdGgucG93KDIsLTI0KS1NYXRoLnBvdygyLC03Nyk6MCxoPXI/MDppLTEscD1yPzE6LTEseT10PDB8fDA9PT10JiYxL3Q8MD8xOjA7Zm9yKHQ9TWF0aC5hYnModCksaXNOYU4odCl8fHQ9PT0xLzA/KGE9aXNOYU4odCk/MTowLHU9Yyk6KHU9TWF0aC5mbG9vcihNYXRoLmxvZyh0KS9NYXRoLkxOMiksdCooZj1NYXRoLnBvdygyLC11KSk8MSYmKHUtLSxmKj0yKSx0Kz11K2w+PTE/ZC9mOmQqTWF0aC5wb3coMiwxLWwpLHQqZj49MiYmKHUrKyxmLz0yKSx1K2w+PWM/KGE9MCx1PWMpOnUrbD49MT8oYT0odCpmLTEpKk1hdGgucG93KDIsbyksdSs9bCk6KGE9dCpNYXRoLnBvdygyLGwtMSkqTWF0aC5wb3coMixvKSx1PTApKTtvPj04O2VbbitoXT0yNTUmYSxoKz1wLGEvPTI1NixvLT04KTtmb3IodT11PDxvfGEscys9bztzPjA7ZVtuK2hdPTI1NSZ1LGgrPXAsdS89MjU2LHMtPTgpO2VbbitoLXBdfD0xMjgqeX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9pZWVlNzU0XCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV19LHt9LFsxXSkoMSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vYmplY3QtaGFzaC9kaXN0L29iamVjdF9oYXNoLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tIFwiLi9kb21cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vaXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc3RyaW5nXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3JlZmxlY3Rpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdXJsXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpc3RcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc2Nyb2xsLXN3aXRjaFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9ldmVudFwiO1xyXG5leHBvcnQgbmFtZXNwYWNlIFV0aWxpdHlDb2xsZWN0aW9uIHtcclxuXHRjb25zdCBuYW1lOiBzdHJpbmcgPSBcIlV0aWxpdHlDb2xsZWN0aW9uXCI7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVXRpbGl0eUNvbGxlY3Rpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL21haW4udHMiLCJleHBvcnQgbmFtZXNwYWNlIERvbSB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGluc2VydEJlZm9yZShlbGVtZW50OiBOb2RlLCB0YXJnZXRFbGVtZW50OiBOb2RlKTogdm9pZCB7XHJcblx0XHR0YXJnZXRFbGVtZW50LnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHRhcmdldEVsZW1lbnQpO1xyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoZWxlbWVudDogTm9kZSwgdGFyZ2V0RWxlbWVudDogTm9kZSk6IHZvaWQge1xyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGFyZ2V0RWxlbWVudC5wYXJlbnROb2RlO1xyXG5cdFx0aWYgKHBhcmVudC5sYXN0Q2hpbGQgPT09IHRhcmdldEVsZW1lbnQpIHtcclxuXHRcdFx0cGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZShlbGVtZW50LCB0YXJnZXRFbGVtZW50Lm5leHRTaWJsaW5nKTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShlbGVtZW50OiBOb2RlKTogdm9pZCB7XHJcblx0XHRpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBudWxsKSB7XHJcblx0XHRcdGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGh0bWxUb05vZGUoaHRtbDogc3RyaW5nIHwgRWxlbWVudCk6IE5vZGUge1xyXG5cdFx0aWYgKGh0bWwgaW5zdGFuY2VvZiBOb2RlKSB7XHJcblx0XHRcdHJldHVybiBodG1sO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgbm9kZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRub2RlLmlubmVySFRNTCA9IGh0bWw7XHJcblx0XHRcdHJldHVybiBub2RlLmZpcnN0RWxlbWVudENoaWxkO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGh0bWxUb0VsZW1lbnQoaHRtbDogc3RyaW5nIHwgRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHJldHVybiBodG1sVG9Ob2RlKGh0bWwpIGFzIEhUTUxFbGVtZW50O1xyXG5cdH1cclxuXHQvLyBhdHJpYnV0ZXMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVzKGVsZW1lbnQ6IEVsZW1lbnQgfCBOb2RlKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH0ge1xyXG5cdFx0Y29uc3QgYXR0cnMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XHJcblx0XHRjb25zdCBuZXdBdHRyOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZzsgfSA9IHt9O1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRuZXdBdHRyW2F0dHJzW2ldLm5hbWVdID0gYXR0cnNbaV0udmFsdWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3QXR0cjtcclxuXHR9XHJcblxyXG5cdC8vIExvb3BzIGUgZ2lyb3MgcGVsbyBkb20gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRleHBvcnQgZnVuY3Rpb24gY2hpbGRFbGVtZW50KG5vZGU6IEVsZW1lbnQsIGVhY2g6IChub2RlOiBFbGVtZW50KSA9PiB2b2lkKTogdm9pZCB7XHJcblx0XHRsZXQgY2hpbGQ6IE5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XHJcblx0XHR3aGlsZSAoY2hpbGQpIHtcclxuXHRcdFx0aWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSB7XHJcblx0XHRcdFx0ZWFjaChjaGlsZCBhcyBFbGVtZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gZWxlbWVudCBkb3duIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG5vZGVEb3duKG5vZGU6IE5vZGUgfCBOb2RlLCBlYWNoOiAobm9kZTogTm9kZSB8IE5vZGUsIHBhcmVudD86IE5vZGUgfCBOb2RlKSA9PiB2b2lkIHwgYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0aWYgKGVhY2gobm9kZSwgdW5kZWZpbmVkKSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0dGhpcy5jaGlsZE5vZGVEb3duKG5vZGUsIGVhY2gpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTm9kZURvd24obm9kZTogTm9kZSwgZWFjaDogKG5vZGU6IE5vZGUsIHBhcmVudD86IE5vZGUpID0+IHZvaWQgfCBib29sZWFuKTogdm9pZCB7XHJcblx0XHRjb25zdCBwYXJlbnQ6IE5vZGUgPSBub2RlO1xyXG5cdFx0bGV0IGNoaWxkOiBOb2RlID0gbm9kZS5maXJzdENoaWxkO1xyXG5cdFx0d2hpbGUgKGNoaWxkKSB7XHJcblx0XHRcdGNvbnN0IGVhY2hSZXR1cm46IGJvb2xlYW4gfCB2b2lkID0gZWFjaChjaGlsZCwgcGFyZW50KTtcclxuXHRcdFx0aWYgKGVhY2hSZXR1cm4gIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0dGhpcy5jaGlsZE5vZGVEb3duKGNoaWxkLCBlYWNoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnREb3duKG5vZGU6IEVsZW1lbnQsIGVhY2g6IChub2RlOiBFbGVtZW50LCBwYXJlbnQ/OiBFbGVtZW50KSA9PiB2b2lkIHwgYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0aWYgKGVhY2gobm9kZSwgdW5kZWZpbmVkKSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0dGhpcy5jaGlsZEVsZW1lbnREb3duKG5vZGUsIGVhY2gpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGNoaWxkRWxlbWVudERvd24obm9kZTogRWxlbWVudCwgZWFjaDogKG5vZGU6IEhUTUxFbGVtZW50LCBwYXJlbnQ/OiBIVE1MRWxlbWVudCkgPT4gdm9pZCB8IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdGNvbnN0IHBhcmVudDogRWxlbWVudCA9IG5vZGU7XHJcblx0XHRsZXQgY2hpbGQ6IE5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XHJcblx0XHR3aGlsZSAoY2hpbGQpIHtcclxuXHRcdFx0aWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSB7XHJcblx0XHRcdFx0Y29uc3QgZWFjaFJldHVybjogYm9vbGVhbiB8IHZvaWQgPSBlYWNoKGNoaWxkIGFzIEhUTUxFbGVtZW50LCBwYXJlbnQgYXMgSFRNTEVsZW1lbnQpO1xyXG5cdFx0XHRcdGlmIChlYWNoUmV0dXJuICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5jaGlsZEVsZW1lbnREb3duKGNoaWxkIGFzIEhUTUxFbGVtZW50LCBlYWNoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Y2hpbGQgPSBjaGlsZC5uZXh0U2libGluZztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGVsZW1lbnQgdXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRleHBvcnQgZnVuY3Rpb24gZWxlbWVudFVwKG5vZGU6IEVsZW1lbnQgfCBIVE1MRWxlbWVudCwgZWFjaDogKG5vZGU6IEVsZW1lbnQgfCBIVE1MRWxlbWVudCkgPT4gYm9vbGVhbiB8IHZvaWQpOiB2b2lkIHtcclxuXHRcdGlmIChlYWNoKG5vZGUpICE9PSBmYWxzZSkge1xyXG5cdFx0XHRwYXJlbnRFbGVtZW50VXAobm9kZSwgZWFjaCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gcGFyZW50RWxlbWVudFVwKG5vZGU6IEVsZW1lbnQgfCBIVE1MRWxlbWVudCB8IE5vZGUsIGVhY2g6IChub2RlOiBFbGVtZW50IHwgSFRNTEVsZW1lbnQgfCBOb2RlKSA9PiBib29sZWFuIHwgdm9pZCk6IHZvaWQge1xyXG5cdFx0bGV0IHJldG9ybm86IGJvb2xlYW4gfCB2b2lkID0gdHJ1ZTtcclxuXHRcdGxldCBjdXJyZW50OiBFbGVtZW50IHwgTm9kZSA9IChub2RlIGFzIE5vZGUpLnBhcmVudE5vZGU7XHJcblx0XHRkbyB7XHJcblx0XHRcdHJldG9ybm8gPSBlYWNoKGN1cnJlbnQpO1xyXG5cdFx0XHRjdXJyZW50ID0gKGN1cnJlbnQgYXMgTm9kZSkucGFyZW50Tm9kZTtcclxuXHRcdH0gd2hpbGUgKHJldG9ybm8gIT09IGZhbHNlICYmIGN1cnJlbnQgIT09IG51bGwgJiYgY3VycmVudCAhPT0gdW5kZWZpbmVkICYmIG5vZGUubm9kZU5hbWUgIT09IFwiQk9EWVwiKTtcclxuXHR9XHJcblxyXG5cdC8vIGRvbSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBhdHRyaWJ1dGUoZWxlbWVudDogRWxlbWVudCB8IEhUTUxFbGVtZW50IHwgTm9kZSwgZWFjaDogKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XHJcblx0XHQvLyBUT0RPOiB0aGlzIHN0aWxsIG5lZWQgdG8gYmUgdGVzdGVkXHJcblx0XHRjb25zdCBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGVhY2goYXR0cmlidXRlc1tpXS5uYW1lLCBhdHRyaWJ1dGVzW2ldLnZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBmaW5kTmV4dFNpYmxpbmcodGFyZ2V0OiBOb2RlIHwgTm9kZSwgdmFsaWRhdGlvbjogKG5vZGU6IE5vZGUgfCBOb2RlKSA9PiBib29sZWFuIHwgdm9pZCk6IE5vZGUgfCBOb2RlIHtcclxuXHRcdGxldCBjdXJyZW50OiBOb2RlIHwgTm9kZSA9IHRhcmdldC5uZXh0U2libGluZztcclxuXHRcdHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcblx0XHRcdGlmICh2YWxpZGF0aW9uKGN1cnJlbnQpID09PSB0cnVlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y3VycmVudCA9IGN1cnJlbnQubmV4dFNpYmxpbmc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcmV2U2libGluZyh0YXJnZXQ6IE5vZGUgfCBOb2RlLCB2YWxpZGF0aW9uOiAobm9kZTogTm9kZSB8IE5vZGUpID0+IGJvb2xlYW4gfCB2b2lkKTogTm9kZSB8IE5vZGUge1xyXG5cdFx0bGV0IGN1cnJlbnQ6IE5vZGUgfCBOb2RlID0gdGFyZ2V0LnByZXZpb3VzU2libGluZztcclxuXHRcdHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcblx0XHRcdGlmICh2YWxpZGF0aW9uKGN1cnJlbnQpID09PSB0cnVlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucHJldmlvdXNTaWJsaW5nO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBmaW5kQWxsU2libGluZ3ModGFyZ2V0OiBOb2RlKTogTm9kZVtdIHtcclxuXHRcdGNvbnN0IHNpYmxpbmdzOiBOb2RlW10gPSBbXTtcclxuXHRcdGZpbmRQcmV2U2libGluZyh0YXJnZXQsIChub2RlKSA9PiB7XHJcblx0XHRcdHNpYmxpbmdzLnB1c2gobm9kZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdFx0ZmluZE5leHRTaWJsaW5nKHRhcmdldCwgKG5vZGUpID0+IHtcclxuXHRcdFx0c2libGluZ3MucHVzaChub2RlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gc2libGluZ3M7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gcHJlcGVuZENoaWxkKHBhcmVudDogSFRNTEVsZW1lbnQsIGNoaWxkOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgZmlyc3RDaGlsZDogTm9kZSA9IHBhcmVudC5maXJzdENoaWxkO1xyXG5cdFx0aWYgKGZpcnN0Q2hpbGQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZTxIVE1MRWxlbWVudD4oY2hpbGQsIGZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQocGFyZW50OiBIVE1MRWxlbWVudCwgY2hpbGQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VFbGVtZW50KG9sZEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBuZXdFbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cdFx0b2xkRWxlbWVudC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChuZXdFbGVtZW50LCBvbGRFbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBzd2FwTm9kZXMobjE6IEhUTUxFbGVtZW50LCBuMjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRcdGxldCBpMTogYW55O1xyXG5cdFx0bGV0IGkyOiBhbnk7XHJcblx0XHRsZXQgcDEgPSBuMS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0bGV0IHAyID0gbjIucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdGlmIChwMSA9PT0gdW5kZWZpbmVkIHx8IHAxID09PSBudWxsKSB7XHJcblx0XHRcdHAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0cDEuYXBwZW5kQ2hpbGQobjEpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHAyID09PSB1bmRlZmluZWQgfHwgcDIgPT09IG51bGwpIHtcclxuXHRcdFx0cDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRwMi5hcHBlbmRDaGlsZChuMik7XHJcblx0XHR9XHJcblx0XHRpZiAoIXAxIHx8ICFwMiB8fCBwMS5pc0VxdWFsTm9kZShuMikgfHwgcDIuaXNFcXVhbE5vZGUobjEpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAocDEuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjEpKSB7XHJcblx0XHRcdFx0aTEgPSBpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHAyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcclxuXHRcdFx0XHRpMiA9IGk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAocDEuaXNFcXVhbE5vZGUocDIpICYmIGkxIDwgaTIpIHtcclxuXHRcdFx0aTIrKztcclxuXHRcdH1cclxuXHRcdHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcclxuXHRcdHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcclxuXHR9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERvbTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvZG9tLnRzIiwiLy8gaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbmltcG9ydCBTdHJpbmcgZnJvbSBcIi4vc3RyaW5nXCI7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhcIi0tPiBva1wiKTtcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgSXMge1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBtb2JpbGUoKTogYm9vbGVhbiB7XHJcblx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPCA5MDApIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBpcyBudWxsIG9yIHVuZGVmaW5lZFxyXG5cdGV4cG9ydCBmdW5jdGlvbiBudWxsT3JVbmRlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vIGlkIGVtcHR5XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSBcIlwiKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvLyBpcyBOdW1iZXJcclxuXHRjb25zdCBudW1iZXJSZWdleDogUmVnRXhwID0gL1xcRC87XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlcih2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIW51bWJlclJlZ2V4LnRlc3QodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Ly8gaXMgTGV0dGVyXHJcblx0Y29uc3QgbGV0dGVyUmVnZXg6IFJlZ0V4cCA9IC9bYS16QS1aXS87XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGxldHRlcih2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gbGV0dGVyUmVnZXgudGVzdCh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGNvbnN0IGVtYWlsUmVnZXggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkL207XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGVtYWlsKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBlbWFpbFJlZ2V4LnRlc3QodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Ly8gYnJhemlsaWFuIHZhbGlkYXRpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBwaG9uZVxyXG5cdGNvbnN0IGJyYXppbGlhblBob25lUmVnZXggPSAvXig/Oig/OlxcKylbMC05XXsyfVxccz8pezAsMX0oPzpcXCgpWzAtOV17Mn0oPzpcXCkpXFxzP1swLTldezAsMX1cXHM/WzAtOV17NCx9KD86LSlbMC05XXs0fSQvbTtcclxuXHRleHBvcnQgZnVuY3Rpb24gYnJhemlsaWFuUGhvbmUocGhvbmU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGJyYXppbGlhblBob25lUmVnZXgudGVzdChwaG9uZSk7XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBkZG1teXl5eShkYXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIik7XHJcblx0XHQvLyByZXR1cm4gbW9tZW50KGRhdGUsIFwiREQvTU0vWVlZWVwiLCB0cnVlKS5pc1ZhbGlkKCk7XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBtbWRkeXl5eShkYXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIik7XHJcblx0XHQvLyByZXR1cm4gbW9tZW50KGRhdGUsIFwiTU0vREQvWVlZWVwiLCB0cnVlKS5pc1ZhbGlkKCk7XHJcblx0fVxyXG5cclxuXHQvLyBDUEZcclxuXHRleHBvcnQgZnVuY3Rpb24gY3BmKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHZhbHVlID0gU3RyaW5nLnN0cmlwTm9uTnVtYmVyKHZhbHVlKTtcclxuXHRcdGxldCBudW1lcm9zOiBzdHJpbmc7XHJcblx0XHRsZXQgZGlnaXRvczogYW55O1xyXG5cdFx0bGV0IHNvbWE6IG51bWJlcjtcclxuXHRcdGxldCBpOiBhbnk7XHJcblx0XHRsZXQgcmVzdWx0YWRvOiBhbnk7XHJcblx0XHRsZXQgZGlnaXRvc19pZ3VhaXM6IGFueTtcclxuXHRcdGRpZ2l0b3NfaWd1YWlzID0gMTtcclxuXHRcdGlmICh2YWx1ZS5sZW5ndGggPCAxMSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoIC0gMTsgaSsrKSB7XHJcblx0XHRcdGlmICh2YWx1ZS5jaGFyQXQoaSkgIT09IHZhbHVlLmNoYXJBdChpICsgMSkpIHtcclxuXHRcdFx0XHRkaWdpdG9zX2lndWFpcyA9IDA7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICghZGlnaXRvc19pZ3VhaXMpIHtcclxuXHRcdFx0bnVtZXJvcyA9IHZhbHVlLnN1YnN0cmluZygwLCA5KTtcclxuXHRcdFx0ZGlnaXRvcyA9IHZhbHVlLnN1YnN0cmluZyg5KTtcclxuXHRcdFx0c29tYSA9IDA7XHJcblx0XHRcdGZvciAoaSA9IDEwOyBpID4gMTsgaS0tKSB7XHJcblx0XHRcdFx0c29tYSArPSArKG51bWVyb3MuY2hhckF0KDEwIC0gaSkpICogaTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXN1bHRhZG8gPSBzb21hICUgMTEgPCAyID8gMCA6IDExIC0gc29tYSAlIDExO1xyXG5cdFx0XHRpZiAocmVzdWx0YWRvICE9PSArKGRpZ2l0b3MuY2hhckF0KDApKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRudW1lcm9zID0gdmFsdWUuc3Vic3RyaW5nKDAsIDEwKTtcclxuXHRcdFx0c29tYSA9IDA7XHJcblx0XHRcdGZvciAoaSA9IDExOyBpID4gMTsgaS0tKSB7XHJcblx0XHRcdFx0c29tYSArPSArKG51bWVyb3MuY2hhckF0KDExIC0gaSkpICogaTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXN1bHRhZG8gPSBzb21hICUgMTEgPCAyID8gMCA6IDExIC0gc29tYSAlIDExO1xyXG5cdFx0XHRpZiAocmVzdWx0YWRvICE9PSArKGRpZ2l0b3MuY2hhckF0KDEpKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly8gQ05QSlxyXG5cdGZ1bmN0aW9uIGNucGoodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0dmFsdWUgPSBTdHJpbmcuc3RyaXBOb25OdW1iZXIodmFsdWUpO1xyXG5cclxuXHRcdGxldCB0YW1hbmhvOiBudW1iZXI7XHJcblx0XHRsZXQgbnVtZXJvczogc3RyaW5nO1xyXG5cdFx0bGV0IGRpZ2l0b3M6IHN0cmluZztcclxuXHRcdGxldCBzb21hOiBudW1iZXI7XHJcblx0XHRsZXQgcG9zOiBudW1iZXI7XHJcblx0XHR2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxkXSsvZywgXCJcIik7XHJcblx0XHRpZiAodmFsdWUgPT09IFwiXCIpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRpZiAodmFsdWUubGVuZ3RoICE9PSAxNCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0XHQvLyBFbGltaW5hIENOUEpzIGludmFsaWRvcyBjb25oZWNpZG9zXHJcblx0XHRpZiAodmFsdWUgPT09IFwiMDAwMDAwMDAwMDAwMDBcIiB8fFxyXG5cdFx0XHR2YWx1ZSA9PT0gXCIxMTExMTExMTExMTExMVwiIHx8XHJcblx0XHRcdHZhbHVlID09PSBcIjIyMjIyMjIyMjIyMjIyXCIgfHxcclxuXHRcdFx0dmFsdWUgPT09IFwiMzMzMzMzMzMzMzMzMzNcIiB8fFxyXG5cdFx0XHR2YWx1ZSA9PT0gXCI0NDQ0NDQ0NDQ0NDQ0NFwiIHx8XHJcblx0XHRcdHZhbHVlID09PSBcIjU1NTU1NTU1NTU1NTU1XCIgfHxcclxuXHRcdFx0dmFsdWUgPT09IFwiNjY2NjY2NjY2NjY2NjZcIiB8fFxyXG5cdFx0XHR2YWx1ZSA9PT0gXCI3Nzc3Nzc3Nzc3Nzc3N1wiIHx8XHJcblx0XHRcdHZhbHVlID09PSBcIjg4ODg4ODg4ODg4ODg4XCIgfHxcclxuXHRcdFx0dmFsdWUgPT09IFwiOTk5OTk5OTk5OTk5OTlcIikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdC8vIFZhbGlkYSBEVnNcclxuXHRcdHRhbWFuaG8gPSB2YWx1ZS5sZW5ndGggLSAyO1xyXG5cdFx0bnVtZXJvcyA9IHZhbHVlLnN1YnN0cmluZygwLCB0YW1hbmhvKTtcclxuXHRcdGRpZ2l0b3MgPSB2YWx1ZS5zdWJzdHJpbmcodGFtYW5obyk7XHJcblx0XHRzb21hID0gMDtcclxuXHRcdHBvcyA9IHRhbWFuaG8gLSA3O1xyXG5cdFx0Zm9yIChsZXQgaSA9IHRhbWFuaG87IGkgPj0gMTsgaS0tKSB7XHJcblx0XHRcdHNvbWEgKz0gKyhudW1lcm9zLmNoYXJBdCh0YW1hbmhvIC0gaSkpICogcG9zLS07XHJcblx0XHRcdGlmIChwb3MgPCAyKSB7XHJcblx0XHRcdFx0cG9zID0gOTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bGV0IHJlc3VsdGFkbzogbnVtYmVyID0gc29tYSAlIDExIDwgMiA/IDAgOiAxMSAtIHNvbWEgJSAxMTtcclxuXHRcdGlmIChyZXN1bHRhZG8gIT09ICsoZGlnaXRvcy5jaGFyQXQoMCkpKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHR0YW1hbmhvID0gdGFtYW5obyArIDE7XHJcblx0XHRudW1lcm9zID0gdmFsdWUuc3Vic3RyaW5nKDAsIHRhbWFuaG8pO1xyXG5cdFx0c29tYSA9IDA7XHJcblx0XHRwb3MgPSB0YW1hbmhvIC0gNztcclxuXHRcdGZvciAobGV0IGkgPSB0YW1hbmhvOyBpID49IDE7IGktLSkge1xyXG5cdFx0XHRzb21hICs9ICsobnVtZXJvcy5jaGFyQXQodGFtYW5obyAtIGkpKSAqIHBvcy0tO1xyXG5cdFx0XHRpZiAocG9zIDwgMikge1xyXG5cdFx0XHRcdHBvcyA9IDk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJlc3VsdGFkbyA9IHNvbWEgJSAxMSA8IDIgPyAwIDogMTEgLSBzb21hICUgMTE7XHJcblx0XHRpZiAocmVzdWx0YWRvICE9PSArKGRpZ2l0b3MuY2hhckF0KDEpKSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgSXM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL2lzLnRzIiwiZXhwb3J0IG5hbWVzcGFjZSBSZWZsZWN0aW9uIHtcclxuXHRleHBvcnQgZnVuY3Rpb24gbWVyZ2UoYmFzZTogYW55LCBzb3VyY2U6IGFueSk6IHZvaWQge1xyXG5cdFx0Zm9yIChjb25zdCBpIGluIHNvdXJjZSkge1xyXG5cdFx0XHRpZiAoc291cmNlLmhhc093blByb3BlcnR5KGkpKSB7XHJcblx0XHRcdFx0YmFzZVtpXSA9IHNvdXJjZVtpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBSZWZsZWN0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy9yZWZsZWN0aW9uLnRzIiwiZXhwb3J0IGNsYXNzIFVybCB7XHJcblx0cHVibGljIFF1ZXJ5TGlzdD86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuXHRwcml2YXRlIHN0YXRpY1BhdGg/OiBzdHJpbmcgfCBudWxsO1xyXG5cdHByaXZhdGUgc3RhdGljUXVlcnk/OiBzdHJpbmcgfCBudWxsO1xyXG5cdHByaXZhdGUgc3RhdGljSGFzaD86IHN0cmluZyB8IG51bGw7XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xyXG5cdFx0dGhpcy5zdGF0aWNQYXRoID0gdXJsLnNwbGl0KFwiI1wiKVswXS5zcGxpdChcIj9cIilbMF07XHJcblx0XHR0aGlzLnN0YXRpY1F1ZXJ5ID0gdXJsLmluZGV4T2YoXCI/XCIpID4gLTEgPyB1cmwuc3BsaXQoXCI/XCIpWzFdLnNwbGl0KFwiI1wiKVswXSA6IG51bGw7XHJcblx0XHR0aGlzLnN0YXRpY0hhc2ggPSB1cmwuc3BsaXQoXCIjXCIpWzFdIHx8IG51bGw7XHJcblx0XHQvLyBxdWVyeUxpc3RcclxuXHRcdGlmICh0aGlzLnN0YXRpY1F1ZXJ5ICE9IG51bGwpIHtcclxuXHRcdFx0Y29uc3QgcXVlcnlLZXlWYWx1ZUxpc3Q6IHN0cmluZ1tdID0gdGhpcy5zdGF0aWNRdWVyeS5zcGxpdChcIiZcIik7XHJcblx0XHRcdHF1ZXJ5S2V5VmFsdWVMaXN0LmZvckVhY2goKHF1ZXJ5S2V5VmFsdWUpID0+IHtcclxuXHRcdFx0XHRjb25zdCBrZXlWYWx1ZTogc3RyaW5nW10gPSBxdWVyeUtleVZhbHVlLnNwbGl0KFwiPVwiKTtcclxuXHRcdFx0XHRjb25zdCBrZXk6IHN0cmluZyA9IGtleVZhbHVlWzBdO1xyXG5cdFx0XHRcdGNvbnN0IHZhbHVlOiBzdHJpbmcgPSBrZXlWYWx1ZVsxXTtcclxuXHRcdFx0XHR0aGlzLlF1ZXJ5TGlzdFtrZXldID0gdmFsdWU7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwdWJsaWMgc2V0UXVlcnkoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBVcmwge1xyXG5cdFx0dGhpcy5RdWVyeUxpc3Rba2V5XSA9IHZhbHVlO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRRdWVyaWVzKHZhbHVlczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSApOiBVcmwge1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gdmFsdWVzKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgdmFsdWVzW2tleV0gIT09IFwiZnVuY3Rpb25cIiAmJiB2YWx1ZXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhpcy5RdWVyeUxpc3Rba2V5XSA9IHZhbHVlc1trZXldLnRvU3RyaW5nKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHRwdWJsaWMgZGVsZXRlUXVlcnkoa2V5OiBzdHJpbmcpOiBVcmwge1xyXG5cdFx0dGhpcy5RdWVyeUxpc3Rba2V5XSA9IHVuZGVmaW5lZDtcclxuXHRcdGRlbGV0ZSB0aGlzLlF1ZXJ5TGlzdFtrZXldO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRRdWVyeShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5RdWVyeUxpc3Rba2V5XTtcclxuXHR9XHJcblx0cHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcblx0XHRsZXQgcXVlcnlMZW5ndGg6IG51bWJlciA9IE9iamVjdC5rZXlzKHRoaXMuUXVlcnlMaXN0KS5sZW5ndGg7XHJcblx0XHRsZXQgcXVlcnk6IHN0cmluZyA9IChPYmplY3Qua2V5cyh0aGlzLlF1ZXJ5TGlzdCkubGVuZ3RoID4gMCA/IFwiP1wiIDogXCJcIik7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLlF1ZXJ5TGlzdCkge1xyXG5cdFx0XHRpZiAodGhpcy5RdWVyeUxpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRcdHF1ZXJ5TGVuZ3RoLS07XHJcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzLlF1ZXJ5TGlzdFtrZXldO1xyXG5cdFx0XHRcdHF1ZXJ5ID0gcXVlcnkgKyBrZXkgKyBcIj1cIiArIHZhbHVlO1xyXG5cdFx0XHRcdGlmIChxdWVyeUxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdHF1ZXJ5ID0gcXVlcnkgKyBcIiZcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnN0YXRpY1BhdGggKyBxdWVyeSArICh0aGlzLnN0YXRpY0hhc2ggPyB0aGlzLnN0YXRpY0hhc2ggOiBcIlwiKTtcclxuXHR9XHJcbn1cclxuLy8gZXhwb3J0IG5hbWVzcGFjZSBVcmwge1xyXG4vLyBcdC8vXHJcbi8vIH1cclxuZXhwb3J0IGRlZmF1bHQgVXJsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy91cmwudHMiLCJleHBvcnQgbmFtZXNwYWNlIExpc3Qge1xyXG5cdC8vIHJlbW92ZSBpdGVtIGZyb20gbGlzdCBpZiBleGlzdFxyXG5cdGV4cG9ydCBmdW5jdGlvbiByZW1vdmVGcm9tSW5kZXg8VD4obGlzdDogVFtdLCBpbmRleDogbnVtYmVyKTogVFtdIHtcclxuXHRcdGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdHJldHVybiBsaXN0O1xyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gcmVtb3ZlSXRlbTxUPihsaXN0OiBUW10sIGl0ZW06IFQpOiBUW10ge1xyXG5cdFx0Y29uc3QgaW5kZXggPSBsaXN0LmluZGV4T2YoaXRlbSk7XHJcblx0XHRsZXQgbmV3TGlzdDogVFtdO1xyXG5cdFx0aWYgKGluZGV4ID4gLTEpIHtcclxuXHRcdFx0bmV3TGlzdCA9IHJlbW92ZUZyb21JbmRleChsaXN0LCBpbmRleCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRuZXdMaXN0ID0gbGlzdDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBuZXdMaXN0O1xyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gc2V0SXRlbTxUPihsaXN0OiBUW10sIGl0ZW06IFQpOiBUW10ge1xyXG5cdFx0Y29uc3QgaW5kZXggPSBsaXN0LmluZGV4T2YoaXRlbSk7XHJcblx0XHRpZiAoaW5kZXggPCAwKSB7XHJcblx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBsaXN0O1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBMaXN0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy9saXN0LnRzIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi9ldmVudFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IERBVEFfU0NST0xMQUJMRSA9IFwiZGF0YS1zY3JvbGxhYmxlXCI7XHJcbmV4cG9ydCBjb25zdCBDTEFTU19GT0NVUyA9IFwic2Nyb2xsLS1hY3RpdmVcIjtcclxuZXhwb3J0IG5hbWVzcGFjZSBTY3JvbGxTd2l0Y2gge1xyXG5cdGxldCB1bmZyZWV6ZURlbGF5OiBudW1iZXI7XHJcblx0ZXhwb3J0IGNsYXNzIFNjcm9sbGFibGUge1xyXG5cdFx0cHJpdmF0ZSBpZDogc3RyaW5nO1xyXG5cdFx0cHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudCA9IG51bGw7XHJcblx0XHRwcml2YXRlIHk6IG51bWJlciA9IDA7XHJcblx0XHRwcml2YXRlIGZyb3plbjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdFx0cHJpdmF0ZSB1bmZyZWV6aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0XHRjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG5cdFx0XHRpZiAodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShEQVRBX1NDUk9MTEFCTEUpID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHR0aGlzLmlkID0gbmV3U2Nyb2xsYWJsZUlkKCk7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShEQVRBX1NDUk9MTEFCTEUsIHRoaXMuaWQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaWQgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKERBVEFfU0NST0xMQUJMRSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gcmVnaXN0ZXIgZXZlbnRcclxuXHRcdFx0Y29uc3QgdW5mcmVlemVFdmVudCA9IChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLCB3aW5kb3cuc2Nyb2xsWSk7XHJcblx0XHRcdFx0dGhpcy51bmZyZWV6ZSgpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRjb25zdCBmcmVlemVBbGxFdmVudCA9IChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdGZyZWV6ZUFsbEJ1dElkKG51bGwpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHVuZnJlZXplRXZlbnQsIEV2ZW50LnBhc3NpdmUoKSk7XHJcblx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdW5mcmVlemVFdmVudCwgRXZlbnQucGFzc2l2ZSgpKTtcclxuXHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgdW5mcmVlemVFdmVudCwgRXZlbnQucGFzc2l2ZSgpKTtcclxuXHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmcmVlemVBbGxFdmVudCwgRXZlbnQucGFzc2l2ZSgpKTtcclxuXHRcdH1cclxuXHRcdHB1YmxpYyBnZXRJZCgpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pZDtcclxuXHRcdH1cclxuXHRcdHB1YmxpYyB1bmZyZWV6ZSgpIHtcclxuXHRcdFx0aWYgKHRoaXMuZnJvemVuICYmICF0aGlzLnVuZnJlZXppbmcpIHtcclxuXHRcdFx0XHR0aGlzLnVuZnJlZXppbmcgPSB0cnVlO1xyXG5cdFx0XHRcdGZyZWV6ZUFsbEJ1dElkKHRoaXMuaWQpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5lbGVtZW50LnNjcm9sbEhlaWdodH1weGA7XHJcblx0XHRcdFx0d2luZG93LnNjcm9sbCgwLCB0aGlzLnkpO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHotaW5kZXg6ICR7dGhpcy5lbGVtZW50LnN0eWxlLnpJbmRleH07IGApO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX0ZPQ1VTKTtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmhlaWdodCA9IFwiXCI7XHJcblx0XHRcdFx0dGhpcy55ID0gMDtcclxuXHRcdFx0XHR0aGlzLmZyb3plbiA9IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMudW5mcmVlemluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdHVuZnJlZXplRGVsYXkgPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHB1YmxpYyBmcmVlemUoKSB7XHJcblx0XHRcdGlmICghdGhpcy5mcm96ZW4pIHtcclxuXHRcdFx0XHR0aGlzLnkgPSB3aW5kb3cuc2Nyb2xsWSArIDA7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBwb3NpdGlvbjogZml4ZWQ7IHRvcDogLSR7dGhpcy55fXB4OyB6LWluZGV4OiAke3RoaXMuZWxlbWVudC5zdHlsZS56SW5kZXh9OyBgKTtcclxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19GT0NVUyk7XHJcblx0XHRcdFx0dGhpcy5mcm96ZW4gPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnN0IHN0b3JlOiB7IFtrZXk6IHN0cmluZ106IFNjcm9sbGFibGUgfSA9IHt9O1xyXG5cdGxldCBsYXN0SWQ6IG51bWJlciA9IDE7XHJcblx0ZnVuY3Rpb24gbmV3U2Nyb2xsYWJsZUlkKCk6IHN0cmluZyB7XHJcblx0XHRsYXN0SWQgPSBsYXN0SWQgKyAxO1xyXG5cdFx0cmV0dXJuIGxhc3RJZC50b1N0cmluZygpO1xyXG5cdH1cclxuXHRmdW5jdGlvbiBpZGVudGlmeUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBTY3JvbGxhYmxlIHtcclxuXHRcdGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0XHRsZXQgaWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShEQVRBX1NDUk9MTEFCTEUpO1xyXG5cdFx0Y29uc3Qgc3RvcmVkID0gKGlkICE9PSB1bmRlZmluZWQpID8gKHN0b3JlW2lkXSAhPT0gdW5kZWZpbmVkKSA6IGZhbHNlO1xyXG5cdFx0aWYgKHN0b3JlZCkge1xyXG5cdFx0XHRyZXR1cm4gc3RvcmVbaWRdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcyA9IG5ldyBTY3JvbGxhYmxlKGVsZW1lbnQpO1xyXG5cdFx0XHRpZCA9IHMuZ2V0SWQoKTtcclxuXHRcdFx0c3RvcmVbaWRdID0gcztcclxuXHRcdFx0cmV0dXJuIHN0b3JlW2lkXTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHNjcm9sbCA9IGlkZW50aWZ5RWxlbWVudChlbGVtZW50KTtcclxuXHRcdGlmIChzY3JvbGwgIT09IG51bGwpIHtcclxuXHRcdFx0c2Nyb2xsLmZyZWV6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gZnJlZXplQWxsQnV0SWQoaWQ6IHN0cmluZyB8IG51bGwgPSBudWxsKTogdm9pZCB7XHJcblx0XHRmb3IgKGNvbnN0IGkgaW4gc3RvcmUpIHtcclxuXHRcdFx0aWYgKGkgIT09IGlkKSB7XHJcblx0XHRcdFx0c3RvcmVbaV0uZnJlZXplKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZUFsbEJ1dEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHNjcm9sbCA9IGlkZW50aWZ5RWxlbWVudChlbGVtZW50KTtcclxuXHRcdGlmIChzY3JvbGwgIT09IG51bGwpIHtcclxuXHRcdFx0ZnJlZXplQWxsQnV0SWQoc2Nyb2xsLmdldElkKCkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gdW5mcmVlemVFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcblx0XHRjb25zdCBzY3JvbGwgPSBpZGVudGlmeUVsZW1lbnQoZWxlbWVudCk7XHJcblx0XHRpZiAoc2Nyb2xsICE9PSBudWxsKSB7XHJcblx0XHRcdHNjcm9sbC51bmZyZWV6ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxTd2l0Y2g7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL3Njcm9sbC1zd2l0Y2gudHMiLCIvKiBcbihUaGUgTUlUIExpY2Vuc2UpXG5Db3B5cmlnaHQgKGMpIDIwMTQgSGFsw6FzeiDDgWTDoW0gPG1haWxAYWRhbWhhbGFzei5jb20+XG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vICBVbmlxdWUgSGV4YXRyaWRlY2ltYWwgSUQgR2VuZXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gIERlcGVuZGVuY2llc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG52YXIgcGlkID0gcHJvY2VzcyAmJiBwcm9jZXNzLnBpZCA/IHByb2Nlc3MucGlkLnRvU3RyaW5nKDM2KSA6ICcnIDtcbnZhciBtYWMgPSB0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyAhPT0gJ2Z1bmN0aW9uJyA/IHJlcXVpcmUoJ21hY2FkZHJlc3MnKS5vbmUobWFjSGFuZGxlcikgOiBudWxsIDtcbnZhciBhZGRyZXNzID0gbWFjID8gcGFyc2VJbnQobWFjLnJlcGxhY2UoL1xcOnxcXEQrL2dpLCAnJykpLnRvU3RyaW5nKDM2KSA6ICcnIDtcblxuLy8gIEV4cG9ydHNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubW9kdWxlLmV4cG9ydHMgICAgICAgICA9IGZ1bmN0aW9uKHByZWZpeCl7IHJldHVybiAocHJlZml4IHx8ICcnKSArIGFkZHJlc3MgKyBwaWQgKyBub3coKS50b1N0cmluZygzNik7IH1cbm1vZHVsZS5leHBvcnRzLnByb2Nlc3MgPSBmdW5jdGlvbihwcmVmaXgpeyByZXR1cm4gKHByZWZpeCB8fCAnJykgICAgICAgICAgICsgcGlkICsgbm93KCkudG9TdHJpbmcoMzYpOyB9XG5tb2R1bGUuZXhwb3J0cy50aW1lICAgID0gZnVuY3Rpb24ocHJlZml4KXsgcmV0dXJuIChwcmVmaXggfHwgJycpICAgICAgICAgICAgICAgICArIG5vdygpLnRvU3RyaW5nKDM2KTsgfVxuXG4vLyAgSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBub3coKXtcbiAgICB2YXIgdGltZSA9IERhdGUubm93KCk7XG4gICAgdmFyIGxhc3QgPSBub3cubGFzdCB8fCB0aW1lO1xuICAgIHJldHVybiBub3cubGFzdCA9IHRpbWUgPiBsYXN0ID8gdGltZSA6IGxhc3QgKyAxO1xufVxuXG5mdW5jdGlvbiBtYWNIYW5kbGVyKGVycm9yKXtcbiAgICBpZihtb2R1bGUucGFyZW50ICYmIG1vZHVsZS5wYXJlbnQudW5pcWlkX2RlYnVnKXtcbiAgICAgICAgaWYoZXJyb3IpIGNvbnNvbGUuZXJyb3IoJ0luZm86IE5vIG1hYyBhZGRyZXNzIC0gdW5pcWlkKCkgZmFsbHMgYmFjayB0byB1bmlxaWQucHJvY2VzcygpLicsIGVycm9yKVxuICAgICAgICBpZihwaWQgPT0gJycpIGNvbnNvbGUuZXJyb3IoJ0luZm86IE5vIHByb2Nlc3MucGlkIC0gdW5pcWlkLnByb2Nlc3MoKSBmYWxscyBiYWNrIHRvIHVuaXFpZC50aW1lKCkuJylcbiAgICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91bmlxaWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=