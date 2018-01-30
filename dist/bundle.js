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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ajax_work_1 = __webpack_require__(4);
var resolveRelative = __webpack_require__(5);
var newHashFrom = __webpack_require__(13);
var utility_collection_1 = __webpack_require__(14);
var uniqid_1 = __webpack_require__(21);
// // console.log("ajax-worker");
var AjaxWorker = /** @class */ (function () {
    function AjaxWorker() {
    }
    return AjaxWorker;
}());
exports.AjaxWorker = AjaxWorker;
(function (AjaxWorker) {
    var nocache = "ajaxworkercache";
    // shared Methods -------------------
    var sharedMethods = {
        onDone: function (args) {
            var options = args[0];
            fetchDone(options);
        },
        onAbort: function (args) {
            var options = args[0];
            fetchAbort(options);
        },
        clean: function () {
            fetchClean();
        },
    };
    function execute(actionName, args) {
        getWorker().postMessage({
            method: actionName,
            args: args,
        });
    }
    // worker -------------------
    var urlWorker;
    var worker;
    function getWorkerScript() {
        return "(" + ajax_work_1.default.Worker.toString() + ")();";
    }
    function getUrlWorker() {
        if (urlWorker === undefined) {
            var blobData = new Blob([getWorkerScript()], {
                type: "application/javascript",
            });
            urlWorker = window.URL.createObjectURL(blobData);
        }
        return urlWorker;
    }
    function getWorker() {
        if (worker === undefined) {
            worker = new Worker(getUrlWorker());
            worker.onmessage = function (event) {
                sharedMethods[event.data.method](event.data.args);
            };
        }
        return worker;
    }
    // fetch ---------------------------------------------------
    var lastId = 0;
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
        var newOBj = Object.assign({}, obj);
        for (var key in newOBj) {
            if (typeof newOBj[key] === "function") {
                delete newOBj[key];
            }
        }
        return newHashFrom(newOBj);
    }
    var callbackStackOptions = {};
    function fetchDone(options) {
        // remove cache url
        var newUrl = new utility_collection_1.Url(options.url);
        newUrl.deleteQuery(nocache);
        options.url = newUrl.toString();
        var newUrlRedirect = new utility_collection_1.Url(options.url);
        newUrlRedirect.deleteQuery(nocache);
        options.urlRedirected = newUrlRedirect.toString();
        // remove cache url end
        if (callbackStackOptions[options.hash] !== undefined) {
            var item = callbackStackOptions[options.hash];
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
            var item = callbackStackOptions[options.hash];
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
        var defaultOptions = {
            url: null,
            method: "GET",
            returnType: "json",
            cache: "no-cache",
            credentials: "include",
            keepalive: true,
            referrerPolicy: "no-referrer",
            mode: "cors",
            sync: true,
            id: null,
            abort: false,
        };
        // new options ---------------------------------------
        var newOptions = Object.assign(defaultOptions, options);
        newOptions.url = resolveRelative(newOptions.url, window.location.origin); // get url
        newOptions.hash = getHash(newOptions); // get hadh
        newOptions.id = getId(newOptions.id); // get id
        // url no cache -------
        var url = new utility_collection_1.Url(newOptions.url);
        url.setQuery(nocache, uniqid_1.process());
        newOptions.url = url.toString();
        // --------------
        // add to callbackStack -------------------------------
        callbackStackOptions[newOptions.hash] = (Object.assign({}, newOptions));
        for (var key in newOptions) {
            if (typeof newOptions[key] === "function") {
                delete newOptions[key];
            }
        }
        execute("fetch", [newOptions]);
    }
    AjaxWorker.fetch = fetch;
    // init -------------------------------------------------------
    function init() {
        // console.log("ajax working");
        var w = window;
        if (w["ajaxWorker"] === undefined) {
            w["ajaxWorker"] = this;
        }
    }
    AjaxWorker.init = init;
    // export function nothing(): void {
    // 	console.log("did nothing");
    // 	//
    // }
})(AjaxWorker = exports.AjaxWorker || (exports.AjaxWorker = {}));
exports.AjaxWorker = AjaxWorker;
AjaxWorker.init();
// --------------------------------------
exports.default = AjaxWorker;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AjaxWork;
(function (AjaxWork) {
    // The fuction bellow will be executed in worker
    // use it to execute the thread
    function Worker() {
        var _this = this;
        var locationOrigin = null;
        var sharedMethods = {
            orderStack: {},
            init: function (args) {
                _this.locationOrigin = args[0];
            },
            fetch: function (args) {
                var options = args[0];
                ajax(options);
            },
        };
        // ajax fetch ------------------------------
        var syncResponse = {};
        var syncRequestStack = [];
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
                            var r = syncResponse[syncRequestStack[0].hash];
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
                for (var _i = 0, syncRequestStack_1 = syncRequestStack; _i < syncRequestStack_1.length; _i++) {
                    var i = syncRequestStack_1[_i];
                    if (options.id === i.id || options.hash === i.hash) {
                        i.abort = true;
                    }
                }
                syncRequestStack.push(options);
            }
        }
        function ajax(options) {
            var fetchReturn = {
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
            var fetchPromise = fetch(options.url, options)
                .then(function (response) {
                fetchReturn.status = response.status;
                fetchReturn.statusText = response.statusText;
                fetchReturn.urlRedirected = response.url;
                fetchReturn.redirected = (fetchReturn.urlRedirected !== fetchReturn.url);
                fetchReturn.headers = response.headers;
                fetchReturn.headers = [];
                response.headers.forEach(function (value, key) {
                    fetchReturn.headers.push([key, value]);
                });
                var headerContentType = response.headers.get("content-type");
                var contentType = "text";
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
                .then(function (data) {
                fetchReturn.data = data;
                sendBack(fetchReturn);
            })
                .catch(function (error) {
                fetchReturn.errorMessage = error;
                fetchReturn.error = true;
                sendBack(fetchReturn);
            });
        }
        // same functions here
        function execute(actionName, args) {
            self.postMessage({
                method: actionName,
                args: args,
            });
        }
        self.onmessage = function (event) {
            var args = event.data.args;
            sharedMethods[event.data.method](args);
        };
    }
    AjaxWork.Worker = Worker;
})(AjaxWork = exports.AjaxWork || (exports.AjaxWork = {}));
exports.default = AjaxWork;


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

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */
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
		throw RangeError(errors[type]);
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
	 * http://tools.ietf.org/html/rfc3492#section-3.4
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
		'version': '1.3.2',
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
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGJiNzJlMThkNzhjODMxNDI1NWIiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy9zdHJpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FqYXgtd29yay50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS1yZWxhdGl2ZS11cmwvbGliLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvdXJsL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHVueWNvZGUvcHVueWNvZGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3VybC91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29iamVjdC1oYXNoL2Rpc3Qvb2JqZWN0X2hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy9kb20udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvaXMudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvcmVmbGVjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy91cmwudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvbGlzdC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy9zY3JvbGwtc3dpdGNoLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlxaWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDckJBLElB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QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsS0FBSzs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSwyQ0FBMkMsS0FBSztBQUNoRCwwQ0FBMEMsS0FBSztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFFBQVE7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsTUFBTTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O3NEQzN0QkE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4YmI3MmUxOGQ3OGM4MzE0MjU1YiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgbmFtZXNwYWNlIFN0cmluZyB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VBbGwodmFsdWU6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBzdHJpbmcpIHtcclxuXHRcdHJldHVybiB2YWx1ZS5zcGxpdChzZWFyY2gpLmpvaW4ocmVwbGFjZW1lbnQpO1xyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gcGF0aEFycmF5KHBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuXHRcdHJldHVybiBwYXRoLnNwbGl0KFwiLlwiKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBzdHJpcE5vbk51bWJlcih2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIik7XHJcblx0fVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTdHJpbmc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL3N0cmluZy50cyIsImV4cG9ydCBuYW1lc3BhY2UgRXZlbnQge1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBvbmNlKHRhcmdldDogTm9kZSwgdHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKGV2ZW50OiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KSA9PiB2b2lkKSB7XHJcblx0XHRjb25zdCBmbiA9IChldjogYW55KSA9PiB7XHJcblx0XHRcdHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuKTtcclxuXHRcdFx0bGlzdGVuZXIoZXYpO1xyXG5cdFx0fTtcclxuXHRcdHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuKTtcclxuXHR9XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGJpbmQodGFyZ2V0OiBOb2RlLCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiAoZXZlbnQ6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpID0+IHZvaWQpIHtcclxuXHRcdGNvbnN0IGZuID0gKGV2OiBhbnkpID0+IHtcclxuXHRcdFx0bGlzdGVuZXIoZXYpO1xyXG5cdFx0fTtcclxuXHRcdHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuKTtcclxuXHR9XHJcblx0Ly8gcGFzc2l2ZSBzdXBwb3J0ZWRcclxuXHRjb25zdCBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHBhc3NpdmUoKTogYW55IHtcclxuXHRcdHJldHVybiAocGFzc2l2ZVN1cHBvcnRlZCA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2UpO1xyXG5cdH1cclxuXHQoZnVuY3Rpb24gSW5pdGlhbGl6ZSgpIHtcclxuXHRcdC8vIGRldGVjdCBpZiBzdXBvcnQgcGFzc2l2ZSBldmVudFxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgXCJwYXNzaXZlXCIsIHtcclxuXHRcdFx0XHRnZXQ6ICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGFzc2l2ZVN1cHBvcnRlZCA9IHRydWU7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBudWxsLCBvcHRpb25zKTtcclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHQvL1xyXG5cdFx0fVxyXG5cdH0pKCk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL2V2ZW50LnRzIiwiaW1wb3J0IEFqYXhXb3JrIGZyb20gXCIuL2FqYXgtd29ya1wiO1xyXG5pbXBvcnQgeyBJQWJzdHJhY3RGZXRjaE9wdGlvbnMsIElDb211bmljYXRpb24sIElGZXRjaE9wdGlvbnMsIElKc29uQXJyYXksIElKc29uT2JqZWN0LCBJUmVxdWVzdEluaXQsIElSZXF1ZXN0T3B0aW9ucywgSVJlc3BvbnNlT3B0aW9ucywgSVNoYXJlZE1ldGhvZHMgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmNvbnN0IHJlc29sdmVSZWxhdGl2ZSA9IHJlcXVpcmUoXCJyZXNvbHZlLXJlbGF0aXZlLXVybFwiKTtcclxuY29uc3QgbmV3SGFzaEZyb20gPSByZXF1aXJlKFwib2JqZWN0LWhhc2hcIik7XHJcbmltcG9ydCB7IFVybCB9IGZyb20gXCJ1dGlsaXR5LWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgcHJvY2VzcyB9IGZyb20gXCJ1bmlxaWRcIjtcclxuLy8gLy8gY29uc29sZS5sb2coXCJhamF4LXdvcmtlclwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBBamF4V29ya2VyIHsgIH1cclxuZXhwb3J0IG5hbWVzcGFjZSBBamF4V29ya2VyIHtcclxuXHRjb25zdCBub2NhY2hlID0gXCJhamF4d29ya2VyY2FjaGVcIjtcclxuXHQvLyBzaGFyZWQgTWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Y29uc3Qgc2hhcmVkTWV0aG9kczogeyBbYWN0aW9uOiBzdHJpbmddOiBhbnkgfSA9IHtcclxuXHRcdG9uRG9uZTogKGFyZ3M6IGFueVtdKSA9PiB7XHJcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSBhcmdzWzBdIGFzIElSZXNwb25zZU9wdGlvbnM8YW55PjtcclxuXHRcdFx0ZmV0Y2hEb25lKG9wdGlvbnMpO1xyXG5cdFx0fSxcclxuXHRcdG9uQWJvcnQ6IChhcmdzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHRjb25zdCBvcHRpb25zID0gYXJnc1swXSBhcyBJUmVxdWVzdE9wdGlvbnM7XHJcblx0XHRcdGZldGNoQWJvcnQob3B0aW9ucyk7XHJcblx0XHR9LFxyXG5cdFx0Y2xlYW46ICgpID0+IHtcclxuXHRcdFx0ZmV0Y2hDbGVhbigpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cdGZ1bmN0aW9uIGV4ZWN1dGUoYWN0aW9uTmFtZTogc3RyaW5nLCBhcmdzOiBBcnJheTxJSnNvbk9iamVjdCB8IElKc29uQXJyYXkgfCBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgYW55Pikge1xyXG5cdFx0Z2V0V29ya2VyKCkucG9zdE1lc3NhZ2Uoe1xyXG5cdFx0XHRtZXRob2Q6IGFjdGlvbk5hbWUsXHJcblx0XHRcdGFyZ3MsXHJcblx0XHR9KTtcclxuXHR9XHJcblx0Ly8gd29ya2VyIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRsZXQgdXJsV29ya2VyOiBzdHJpbmc7XHJcblx0bGV0IHdvcmtlcjogV29ya2VyO1xyXG5cdGZ1bmN0aW9uIGdldFdvcmtlclNjcmlwdCgpIHtcclxuXHRcdHJldHVybiBcIihcIiArIEFqYXhXb3JrLldvcmtlci50b1N0cmluZygpICsgXCIpKCk7XCI7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGdldFVybFdvcmtlcigpIHtcclxuXHRcdGlmICh1cmxXb3JrZXIgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRjb25zdCBibG9iRGF0YTogQmxvYiA9IG5ldyBCbG9iKFtnZXRXb3JrZXJTY3JpcHQoKV0sIHtcclxuXHRcdFx0XHR0eXBlOiBcImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIixcclxuXHRcdFx0fSk7XHJcblx0XHRcdHVybFdvcmtlciA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2JEYXRhKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB1cmxXb3JrZXI7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGdldFdvcmtlcigpIHtcclxuXHRcdGlmICh3b3JrZXIgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR3b3JrZXIgPSBuZXcgV29ya2VyKGdldFVybFdvcmtlcigpKTtcclxuXHRcdFx0d29ya2VyLm9ubWVzc2FnZSA9IChldmVudDogYW55KSA9PiB7XHJcblx0XHRcdFx0c2hhcmVkTWV0aG9kc1tldmVudC5kYXRhLm1ldGhvZF0oZXZlbnQuZGF0YS5hcmdzKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB3b3JrZXI7XHJcblx0fVxyXG5cdC8vIGZldGNoIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGxldCBsYXN0SWQ6IG51bWJlciA9IDA7XHJcblx0ZnVuY3Rpb24gZ2V0SWQoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRsYXN0SWQgPSBsYXN0SWQgKyAxO1xyXG5cdFx0aWYgKGlkICE9PSB1bmRlZmluZWQgJiYgaWQgIT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIGlkO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGxhc3RJZC50b1N0cmluZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRmdW5jdGlvbiBnZXRIYXNoKG9iajogYW55KTogc3RyaW5nIHtcclxuXHRcdGNvbnN0IG5ld09CaiA9IE9iamVjdC5hc3NpZ24oe30sIG9iaik7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBuZXdPQmopIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBuZXdPQmpba2V5XSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0ZGVsZXRlIG5ld09CaltrZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3SGFzaEZyb20obmV3T0JqKTtcclxuXHR9XHJcblx0bGV0IGNhbGxiYWNrU3RhY2tPcHRpb25zOiB7IFtoYXNoOiBzdHJpbmddOiBJRmV0Y2hPcHRpb25zPGFueT4gfSA9IHt9O1xyXG5cdGZ1bmN0aW9uIGZldGNoRG9uZTxURGF0YVR5cGU+KG9wdGlvbnM6IElSZXNwb25zZU9wdGlvbnM8VERhdGFUeXBlPikge1xyXG5cdFx0Ly8gcmVtb3ZlIGNhY2hlIHVybFxyXG5cdFx0Y29uc3QgbmV3VXJsID0gbmV3IFVybChvcHRpb25zLnVybCk7XHJcblx0XHRuZXdVcmwuZGVsZXRlUXVlcnkobm9jYWNoZSk7XHJcblx0XHRvcHRpb25zLnVybCA9IG5ld1VybC50b1N0cmluZygpO1xyXG5cdFx0Y29uc3QgbmV3VXJsUmVkaXJlY3QgPSBuZXcgVXJsKG9wdGlvbnMudXJsKTtcclxuXHRcdG5ld1VybFJlZGlyZWN0LmRlbGV0ZVF1ZXJ5KG5vY2FjaGUpO1xyXG5cdFx0b3B0aW9ucy51cmxSZWRpcmVjdGVkID0gbmV3VXJsUmVkaXJlY3QudG9TdHJpbmcoKTtcclxuXHRcdC8vIHJlbW92ZSBjYWNoZSB1cmwgZW5kXHJcblxyXG5cdFx0aWYgKGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaF0gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoXTtcclxuXHRcdFx0aWYgKG9wdGlvbnMuZXJyb3IgPT09IHRydWUpIHtcclxuXHRcdFx0XHRpZiAoaXRlbS5vbkVycm9yICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdGl0ZW0ub25FcnJvcihvcHRpb25zKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKGl0ZW0ub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdGl0ZW0ub25TdWNjZXNzKG9wdGlvbnMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaXRlbS5vbkRvbmUgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGl0ZW0ub25Eb25lKG9wdGlvbnMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaF0gPSB1bmRlZmluZWQ7XHJcblx0XHRcdC8vIGRlbGV0ZSBjYWxsYmFja1N0YWNrT3B0aW9uc1tvcHRpb25zLmhhc2hdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRmdW5jdGlvbiBmZXRjaEFib3J0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykge1xyXG5cdFx0aWYgKGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaF0gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoXTtcclxuXHRcdFx0aWYgKG9wdGlvbnMuYWJvcnQgPT09IHRydWUgJiYgaXRlbS5vbkFib3J0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRpdGVtLm9uQWJvcnQob3B0aW9ucyk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoXSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0Ly8gZGVsZXRlIGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaF07XHJcblx0XHR9XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGZldGNoQ2xlYW4oKTogdm9pZCB7XHJcblx0XHRjYWxsYmFja1N0YWNrT3B0aW9ucyA9IHt9O1xyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gZmV0Y2g8VERhdGFUeXBlPihvcHRpb25zOiBJRmV0Y2hPcHRpb25zPFREYXRhVHlwZT4pIHtcclxuXHRcdC8vIGRlZmF1bHQgb3B0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGNvbnN0IGRlZmF1bHRPcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMgPSB7XHJcblx0XHRcdHVybDogbnVsbCxcclxuXHRcdFx0bWV0aG9kOiBcIkdFVFwiLFxyXG5cdFx0XHRyZXR1cm5UeXBlOiBcImpzb25cIixcclxuXHRcdFx0Y2FjaGU6IFwibm8tY2FjaGVcIixcclxuXHRcdFx0Y3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG5cdFx0XHRrZWVwYWxpdmU6IHRydWUsXHJcblx0XHRcdHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyXCIsXHJcblx0XHRcdG1vZGU6IFwiY29yc1wiLFxyXG5cdFx0XHRzeW5jOiB0cnVlLFxyXG5cdFx0XHRpZDogbnVsbCxcclxuXHRcdFx0YWJvcnQ6IGZhbHNlLFxyXG5cdFx0fTtcclxuXHRcdC8vIG5ldyBvcHRpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Y29uc3QgbmV3T3B0aW9uczogSVJlcXVlc3RPcHRpb25zIHwgYW55ID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcblx0XHRuZXdPcHRpb25zLnVybCA9IHJlc29sdmVSZWxhdGl2ZShuZXdPcHRpb25zLnVybCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7IC8vIGdldCB1cmxcclxuXHJcblx0XHRuZXdPcHRpb25zLmhhc2ggPSBnZXRIYXNoKG5ld09wdGlvbnMpOyAvLyBnZXQgaGFkaFxyXG5cdFx0bmV3T3B0aW9ucy5pZCA9IGdldElkKG5ld09wdGlvbnMuaWQpOyAvLyBnZXQgaWRcclxuXHRcdC8vIHVybCBubyBjYWNoZSAtLS0tLS0tXHJcblx0XHRjb25zdCB1cmwgPSBuZXcgVXJsKG5ld09wdGlvbnMudXJsKTtcclxuXHRcdHVybC5zZXRRdWVyeShub2NhY2hlLCBwcm9jZXNzKCkpO1xyXG5cdFx0bmV3T3B0aW9ucy51cmwgPSB1cmwudG9TdHJpbmcoKTtcclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tXHJcblx0XHQvLyBhZGQgdG8gY2FsbGJhY2tTdGFjayAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRjYWxsYmFja1N0YWNrT3B0aW9uc1tuZXdPcHRpb25zLmhhc2hdID0gKE9iamVjdC5hc3NpZ24oe30sIG5ld09wdGlvbnMpKTtcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG5ld09wdGlvbnMpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBuZXdPcHRpb25zW2tleV0gPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdGRlbGV0ZSBuZXdPcHRpb25zW2tleV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGV4ZWN1dGUoXCJmZXRjaFwiLCBbbmV3T3B0aW9uc10pO1xyXG5cdH1cclxuXHQvLyBpbml0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRleHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwiYWpheCB3b3JraW5nXCIpO1xyXG5cdFx0Y29uc3QgdyA9IHdpbmRvdyBhcyBhbnk7XHJcblx0XHRpZiAod1tcImFqYXhXb3JrZXJcIl0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR3W1wiYWpheFdvcmtlclwiXSA9IHRoaXM7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vIGV4cG9ydCBmdW5jdGlvbiBub3RoaW5nKCk6IHZvaWQge1xyXG5cdC8vIFx0Y29uc29sZS5sb2coXCJkaWQgbm90aGluZ1wiKTtcclxuXHQvLyBcdC8vXHJcblx0Ly8gfVxyXG59XHJcbkFqYXhXb3JrZXIuaW5pdCgpO1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgZGVmYXVsdCBBamF4V29ya2VyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi50cyIsIi8vIGltcG9ydCBBamF4V29ya2VyIGZyb20gXCIuL21haW5cIjtcclxuZGVjbGFyZSB2YXIgc2VsZjogV29ya2VyO1xyXG4vLyBpbXBvcnQgKiBhcyBJbnRlcmZhY2UgZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBJQWJzdHJhY3RGZXRjaE9wdGlvbnMsIElDb211bmljYXRpb24sIElGZXRjaE9wdGlvbnMsIElKc29uQXJyYXksIElKc29uT2JqZWN0LCBJUmVxdWVzdEluaXQsIElSZXF1ZXN0T3B0aW9ucywgSVJlc3BvbnNlT3B0aW9ucywgSVNoYXJlZE1ldGhvZHMgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIEFqYXhXb3JrIHtcclxuXHQvLyBUaGUgZnVjdGlvbiBiZWxsb3cgd2lsbCBiZSBleGVjdXRlZCBpbiB3b3JrZXJcclxuXHQvLyB1c2UgaXQgdG8gZXhlY3V0ZSB0aGUgdGhyZWFkXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIFdvcmtlcigpIHtcclxuXHRcdGNvbnN0IGxvY2F0aW9uT3JpZ2luOiBhbnkgPSBudWxsO1xyXG5cdFx0Y29uc3Qgc2hhcmVkTWV0aG9kczogSVNoYXJlZE1ldGhvZHMgPSB7XHJcblx0XHRcdG9yZGVyU3RhY2s6IHt9LFxyXG5cdFx0XHRpbml0OiAoYXJnczogYW55W10pID0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2F0aW9uT3JpZ2luID0gYXJnc1swXTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmV0Y2g6IChhcmdzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG9wdGlvbnMgPSBhcmdzWzBdO1xyXG5cdFx0XHRcdGFqYXgob3B0aW9ucyk7XHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdFx0Ly8gYWpheCBmZXRjaCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGxldCBzeW5jUmVzcG9uc2U6IHsgW2lkOiBzdHJpbmddOiBJUmVzcG9uc2VPcHRpb25zPGFueT4gfSA9IHt9O1xyXG5cdFx0Y29uc3Qgc3luY1JlcXVlc3RTdGFjazogSVJlcXVlc3RPcHRpb25zW10gPSBbXTtcclxuXHRcdGZ1bmN0aW9uIHNlbmRCYWNrKG9wdGlvbnM6IElSZXNwb25zZU9wdGlvbnM8YW55Pikge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5zeW5jID09PSB0cnVlKSB7XHJcblx0XHRcdFx0Ly8gc3RvcmUgaW4gdGhlIHJlc3BvbnNlIHN0b3JlIC0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0c3luY1Jlc3BvbnNlW29wdGlvbnMuaGFzaF0gPSBvcHRpb25zO1xyXG5cdFx0XHRcdC8vIGxvb3AgaW4gdGhlIHJlcXVlc3RzIC0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHR3aGlsZSAoc3luY1JlcXVlc3RTdGFjay5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRpZiAoc3luY1JlcXVlc3RTdGFja1swXS5hYm9ydCA9PT0gdHJ1ZSApIHtcclxuXHRcdFx0XHRcdFx0ZXhlY3V0ZShcIm9uQWJvcnRcIiwgW3N5bmNSZXF1ZXN0U3RhY2tbMF1dKTtcclxuXHRcdFx0XHRcdFx0c3luY1JlcXVlc3RTdGFjay5zaGlmdCgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKHN5bmNSZXNwb25zZVtzeW5jUmVxdWVzdFN0YWNrWzBdLmhhc2hdID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCByID0gc3luY1Jlc3BvbnNlW3N5bmNSZXF1ZXN0U3RhY2tbMF0uaGFzaF07XHJcblx0XHRcdFx0XHRcdFx0ZXhlY3V0ZShcIm9uRG9uZVwiLCBbcl0pO1xyXG5cdFx0XHRcdFx0XHRcdHN5bmNSZXF1ZXN0U3RhY2suc2hpZnQoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBjbGVhbiB0aGUgc3luY1Jlc3BvbnNlXHJcblx0XHRcdFx0aWYgKHN5bmNSZXF1ZXN0U3RhY2subGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRzeW5jUmVzcG9uc2UgPSB7fTtcclxuXHRcdFx0XHRcdGV4ZWN1dGUoXCJjbGVhblwiLCBbXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGV4ZWN1dGUoXCJvbkRvbmVcIiwgW29wdGlvbnNdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gYWpheFJlcXVlc3RTdGFja1B1c2gob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSB7XHJcblx0XHRcdGlmIChvcHRpb25zLnN5bmMgPT09IHRydWUpIHtcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGkgb2Ygc3luY1JlcXVlc3RTdGFjaykge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMuaWQgPT09IGkuaWQgfHwgb3B0aW9ucy5oYXNoID09PSBpLmhhc2gpIHtcclxuXHRcdFx0XHRcdFx0aS5hYm9ydCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHN5bmNSZXF1ZXN0U3RhY2sucHVzaChvcHRpb25zKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gYWpheChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpIHtcclxuXHRcdFx0Y29uc3QgZmV0Y2hSZXR1cm46IElSZXNwb25zZU9wdGlvbnM8YW55PiA9IHtcclxuXHRcdFx0XHRpZDogb3B0aW9ucy5pZCxcclxuXHRcdFx0XHR1cmw6IG9wdGlvbnMudXJsLFxyXG5cdFx0XHRcdHN0YXR1czogNDA0LFxyXG5cdFx0XHRcdHJldHVyblR5cGU6IG9wdGlvbnMucmV0dXJuVHlwZSxcclxuXHRcdFx0XHRzdGF0dXNUZXh0OiBcIkVycm9yIG9uIEFqYXgtV29ya2VyIVwiLFxyXG5cdFx0XHRcdGRhdGE6IG51bGwsXHJcblx0XHRcdFx0aGVhZGVyczogW10sXHJcblx0XHRcdFx0cmVkaXJlY3RlZDogZmFsc2UsXHJcblx0XHRcdFx0dXJsUmVkaXJlY3RlZDogbnVsbCxcclxuXHRcdFx0XHRlcnJvck1lc3NhZ2U6IG51bGwsXHJcblx0XHRcdFx0ZXJyb3I6IGZhbHNlLFxyXG5cdFx0XHRcdHN5bmM6IG9wdGlvbnMuc3luYyxcclxuXHRcdFx0XHRoYXNoOiBvcHRpb25zLmhhc2gsXHJcblx0XHRcdH07XHJcblx0XHRcdC8vIHN5bmMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHQvLyBmZXRjaCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0YWpheFJlcXVlc3RTdGFja1B1c2gob3B0aW9ucyk7XHJcblx0XHRcdGNvbnN0IGZldGNoUHJvbWlzZSA9IGZldGNoKG9wdGlvbnMudXJsLCBvcHRpb25zKVxyXG5cdFx0XHQudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0ZmV0Y2hSZXR1cm4uc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xyXG5cdFx0XHRcdFx0ZmV0Y2hSZXR1cm4uc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XHJcblx0XHRcdFx0XHRmZXRjaFJldHVybi51cmxSZWRpcmVjdGVkID0gcmVzcG9uc2UudXJsO1xyXG5cdFx0XHRcdFx0ZmV0Y2hSZXR1cm4ucmVkaXJlY3RlZCA9IChmZXRjaFJldHVybi51cmxSZWRpcmVjdGVkICE9PSBmZXRjaFJldHVybi51cmwpO1xyXG5cdFx0XHRcdFx0ZmV0Y2hSZXR1cm4uaGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XHJcblx0XHRcdFx0XHRmZXRjaFJldHVybi5oZWFkZXJzID0gW107XHJcblxyXG5cdFx0XHRcdFx0cmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0XHQoZmV0Y2hSZXR1cm4uaGVhZGVycyBhcyBzdHJpbmdbXVtdKS5wdXNoKFtrZXksIHZhbHVlXSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGNvbnN0IGhlYWRlckNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik7XHJcblx0XHRcdFx0XHRsZXQgY29udGVudFR5cGU6IHN0cmluZyA9IFwidGV4dFwiO1xyXG5cdFx0XHRcdFx0aWYgKGhlYWRlckNvbnRlbnRUeXBlICYmIChoZWFkZXJDb250ZW50VHlwZS5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikgfHwgaGVhZGVyQ29udGVudFR5cGUuaW5jbHVkZXMoXCJ0ZXh0L2pzb25cIikpKSB7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnRUeXBlID0gXCJqc29uXCI7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjb250ZW50VHlwZSA9IFwidGV4dFwiO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0aWYgKGNvbnRlbnRUeXBlID09PSBcInRleHRcIikge1xyXG5cdFx0XHRcdFx0XHRmZXRjaFJldHVybi5yZXR1cm5UeXBlID0gXCJ0ZXh0XCI7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXNwb25zZS50ZXh0KCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGNvbnRlbnRUeXBlID09PSBcImpzb25cIikge1xyXG5cdFx0XHRcdFx0XHRmZXRjaFJldHVybi5yZXR1cm5UeXBlID0gXCJqc29uXCI7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0LnRoZW4oKGRhdGE6IGFueSkgPT4ge1xyXG5cdFx0XHRcdGZldGNoUmV0dXJuLmRhdGEgPSBkYXRhO1xyXG5cdFx0XHRcdHNlbmRCYWNrKGZldGNoUmV0dXJuKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKChlcnJvcjogYW55KSA9PiB7XHJcblx0XHRcdFx0ZmV0Y2hSZXR1cm4uZXJyb3JNZXNzYWdlID0gZXJyb3I7XHJcblx0XHRcdFx0ZmV0Y2hSZXR1cm4uZXJyb3IgPSB0cnVlO1xyXG5cdFx0XHRcdHNlbmRCYWNrKGZldGNoUmV0dXJuKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHQvLyBzYW1lIGZ1bmN0aW9ucyBoZXJlXHJcblx0XHRmdW5jdGlvbiBleGVjdXRlKGFjdGlvbk5hbWU6IHN0cmluZywgYXJnczogQXJyYXk8SUpzb25PYmplY3QgfCBJSnNvbkFycmF5IHwgc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IGFueT4pIHtcclxuXHRcdFx0c2VsZi5wb3N0TWVzc2FnZSh7XHJcblx0XHRcdFx0bWV0aG9kOiBhY3Rpb25OYW1lLFxyXG5cdFx0XHRcdGFyZ3MsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0c2VsZi5vbm1lc3NhZ2UgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG5cdFx0XHRjb25zdCBhcmdzID0gZXZlbnQuZGF0YS5hcmdzO1xyXG5cdFx0XHRzaGFyZWRNZXRob2RzW2V2ZW50LmRhdGEubWV0aG9kXShhcmdzKTtcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFqYXhXb3JrO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWpheC13b3JrLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgcGF0ID0gL15odHRwcz86XFwvXFwvL2k7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpbmssIHNvdXJjZSkge1xuICBpZiAoIWxpbmspIHJldHVybiBzb3VyY2U7XG4gIGlmICghc291cmNlKSByZXR1cm47XG4gIHJldHVybiAhcGF0LnRlc3QobGluaykgPyB1cmwucmVzb2x2ZShzb3VyY2UsIGxpbmspIDogbGluaztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZXNvbHZlLXJlbGF0aXZlLXVybC9saWIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHB1bnljb2RlID0gcmVxdWlyZSgncHVueWNvZGUnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmV4cG9ydHMucGFyc2UgPSB1cmxQYXJzZTtcbmV4cG9ydHMucmVzb2x2ZSA9IHVybFJlc29sdmU7XG5leHBvcnRzLnJlc29sdmVPYmplY3QgPSB1cmxSZXNvbHZlT2JqZWN0O1xuZXhwb3J0cy5mb3JtYXQgPSB1cmxGb3JtYXQ7XG5cbmV4cG9ydHMuVXJsID0gVXJsO1xuXG5mdW5jdGlvbiBVcmwoKSB7XG4gIHRoaXMucHJvdG9jb2wgPSBudWxsO1xuICB0aGlzLnNsYXNoZXMgPSBudWxsO1xuICB0aGlzLmF1dGggPSBudWxsO1xuICB0aGlzLmhvc3QgPSBudWxsO1xuICB0aGlzLnBvcnQgPSBudWxsO1xuICB0aGlzLmhvc3RuYW1lID0gbnVsbDtcbiAgdGhpcy5oYXNoID0gbnVsbDtcbiAgdGhpcy5zZWFyY2ggPSBudWxsO1xuICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgdGhpcy5wYXRobmFtZSA9IG51bGw7XG4gIHRoaXMucGF0aCA9IG51bGw7XG4gIHRoaXMuaHJlZiA9IG51bGw7XG59XG5cbi8vIFJlZmVyZW5jZTogUkZDIDM5ODYsIFJGQyAxODA4LCBSRkMgMjM5NlxuXG4vLyBkZWZpbmUgdGhlc2UgaGVyZSBzbyBhdCBsZWFzdCB0aGV5IG9ubHkgaGF2ZSB0byBiZVxuLy8gY29tcGlsZWQgb25jZSBvbiB0aGUgZmlyc3QgbW9kdWxlIGxvYWQuXG52YXIgcHJvdG9jb2xQYXR0ZXJuID0gL14oW2EtejAtOS4rLV0rOikvaSxcbiAgICBwb3J0UGF0dGVybiA9IC86WzAtOV0qJC8sXG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIGEgc2ltcGxlIHBhdGggVVJMXG4gICAgc2ltcGxlUGF0aFBhdHRlcm4gPSAvXihcXC9cXC8/KD8hXFwvKVteXFw/XFxzXSopKFxcP1teXFxzXSopPyQvLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgcmVzZXJ2ZWQgZm9yIGRlbGltaXRpbmcgVVJMcy5cbiAgICAvLyBXZSBhY3R1YWxseSBqdXN0IGF1dG8tZXNjYXBlIHRoZXNlLlxuICAgIGRlbGltcyA9IFsnPCcsICc+JywgJ1wiJywgJ2AnLCAnICcsICdcXHInLCAnXFxuJywgJ1xcdCddLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgZm9yIHZhcmlvdXMgcmVhc29ucy5cbiAgICB1bndpc2UgPSBbJ3snLCAnfScsICd8JywgJ1xcXFwnLCAnXicsICdgJ10uY29uY2F0KGRlbGltcyksXG5cbiAgICAvLyBBbGxvd2VkIGJ5IFJGQ3MsIGJ1dCBjYXVzZSBvZiBYU1MgYXR0YWNrcy4gIEFsd2F5cyBlc2NhcGUgdGhlc2UuXG4gICAgYXV0b0VzY2FwZSA9IFsnXFwnJ10uY29uY2F0KHVud2lzZSksXG4gICAgLy8gQ2hhcmFjdGVycyB0aGF0IGFyZSBuZXZlciBldmVyIGFsbG93ZWQgaW4gYSBob3N0bmFtZS5cbiAgICAvLyBOb3RlIHRoYXQgYW55IGludmFsaWQgY2hhcnMgYXJlIGFsc28gaGFuZGxlZCwgYnV0IHRoZXNlXG4gICAgLy8gYXJlIHRoZSBvbmVzIHRoYXQgYXJlICpleHBlY3RlZCogdG8gYmUgc2Vlbiwgc28gd2UgZmFzdC1wYXRoXG4gICAgLy8gdGhlbS5cbiAgICBub25Ib3N0Q2hhcnMgPSBbJyUnLCAnLycsICc/JywgJzsnLCAnIyddLmNvbmNhdChhdXRvRXNjYXBlKSxcbiAgICBob3N0RW5kaW5nQ2hhcnMgPSBbJy8nLCAnPycsICcjJ10sXG4gICAgaG9zdG5hbWVNYXhMZW4gPSAyNTUsXG4gICAgaG9zdG5hbWVQYXJ0UGF0dGVybiA9IC9eWythLXowLTlBLVpfLV17MCw2M30kLyxcbiAgICBob3N0bmFtZVBhcnRTdGFydCA9IC9eKFsrYS16MC05QS1aXy1dezAsNjN9KSguKikkLyxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBjYW4gYWxsb3cgXCJ1bnNhZmVcIiBhbmQgXCJ1bndpc2VcIiBjaGFycy5cbiAgICB1bnNhZmVQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IG5ldmVyIGhhdmUgYSBob3N0bmFtZS5cbiAgICBob3N0bGVzc1Byb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgYWx3YXlzIGNvbnRhaW4gYSAvLyBiaXQuXG4gICAgc2xhc2hlZFByb3RvY29sID0ge1xuICAgICAgJ2h0dHAnOiB0cnVlLFxuICAgICAgJ2h0dHBzJzogdHJ1ZSxcbiAgICAgICdmdHAnOiB0cnVlLFxuICAgICAgJ2dvcGhlcic6IHRydWUsXG4gICAgICAnZmlsZSc6IHRydWUsXG4gICAgICAnaHR0cDonOiB0cnVlLFxuICAgICAgJ2h0dHBzOic6IHRydWUsXG4gICAgICAnZnRwOic6IHRydWUsXG4gICAgICAnZ29waGVyOic6IHRydWUsXG4gICAgICAnZmlsZTonOiB0cnVlXG4gICAgfSxcbiAgICBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5cbmZ1bmN0aW9uIHVybFBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKHVybCAmJiB1dGlsLmlzT2JqZWN0KHVybCkgJiYgdXJsIGluc3RhbmNlb2YgVXJsKSByZXR1cm4gdXJsO1xuXG4gIHZhciB1ID0gbmV3IFVybDtcbiAgdS5wYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KTtcbiAgcmV0dXJuIHU7XG59XG5cblVybC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbih1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICghdXRpbC5pc1N0cmluZyh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlBhcmFtZXRlciAndXJsJyBtdXN0IGJlIGEgc3RyaW5nLCBub3QgXCIgKyB0eXBlb2YgdXJsKTtcbiAgfVxuXG4gIC8vIENvcHkgY2hyb21lLCBJRSwgb3BlcmEgYmFja3NsYXNoLWhhbmRsaW5nIGJlaGF2aW9yLlxuICAvLyBCYWNrIHNsYXNoZXMgYmVmb3JlIHRoZSBxdWVyeSBzdHJpbmcgZ2V0IGNvbnZlcnRlZCB0byBmb3J3YXJkIHNsYXNoZXNcbiAgLy8gU2VlOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjU5MTZcbiAgdmFyIHF1ZXJ5SW5kZXggPSB1cmwuaW5kZXhPZignPycpLFxuICAgICAgc3BsaXR0ZXIgPVxuICAgICAgICAgIChxdWVyeUluZGV4ICE9PSAtMSAmJiBxdWVyeUluZGV4IDwgdXJsLmluZGV4T2YoJyMnKSkgPyAnPycgOiAnIycsXG4gICAgICB1U3BsaXQgPSB1cmwuc3BsaXQoc3BsaXR0ZXIpLFxuICAgICAgc2xhc2hSZWdleCA9IC9cXFxcL2c7XG4gIHVTcGxpdFswXSA9IHVTcGxpdFswXS5yZXBsYWNlKHNsYXNoUmVnZXgsICcvJyk7XG4gIHVybCA9IHVTcGxpdC5qb2luKHNwbGl0dGVyKTtcblxuICB2YXIgcmVzdCA9IHVybDtcblxuICAvLyB0cmltIGJlZm9yZSBwcm9jZWVkaW5nLlxuICAvLyBUaGlzIGlzIHRvIHN1cHBvcnQgcGFyc2Ugc3R1ZmYgbGlrZSBcIiAgaHR0cDovL2Zvby5jb20gIFxcblwiXG4gIHJlc3QgPSByZXN0LnRyaW0oKTtcblxuICBpZiAoIXNsYXNoZXNEZW5vdGVIb3N0ICYmIHVybC5zcGxpdCgnIycpLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIFRyeSBmYXN0IHBhdGggcmVnZXhwXG4gICAgdmFyIHNpbXBsZVBhdGggPSBzaW1wbGVQYXRoUGF0dGVybi5leGVjKHJlc3QpO1xuICAgIGlmIChzaW1wbGVQYXRoKSB7XG4gICAgICB0aGlzLnBhdGggPSByZXN0O1xuICAgICAgdGhpcy5ocmVmID0gcmVzdDtcbiAgICAgIHRoaXMucGF0aG5hbWUgPSBzaW1wbGVQYXRoWzFdO1xuICAgICAgaWYgKHNpbXBsZVBhdGhbMl0pIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSBzaW1wbGVQYXRoWzJdO1xuICAgICAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnNlYXJjaC5zdWJzdHIoMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICB2YXIgcHJvdG8gPSBwcm90b2NvbFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgaWYgKHByb3RvKSB7XG4gICAgcHJvdG8gPSBwcm90b1swXTtcbiAgICB2YXIgbG93ZXJQcm90byA9IHByb3RvLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5wcm90b2NvbCA9IGxvd2VyUHJvdG87XG4gICAgcmVzdCA9IHJlc3Quc3Vic3RyKHByb3RvLmxlbmd0aCk7XG4gIH1cblxuICAvLyBmaWd1cmUgb3V0IGlmIGl0J3MgZ290IGEgaG9zdFxuICAvLyB1c2VyQHNlcnZlciBpcyAqYWx3YXlzKiBpbnRlcnByZXRlZCBhcyBhIGhvc3RuYW1lLCBhbmQgdXJsXG4gIC8vIHJlc29sdXRpb24gd2lsbCB0cmVhdCAvL2Zvby9iYXIgYXMgaG9zdD1mb28scGF0aD1iYXIgYmVjYXVzZSB0aGF0J3NcbiAgLy8gaG93IHRoZSBicm93c2VyIHJlc29sdmVzIHJlbGF0aXZlIFVSTHMuXG4gIGlmIChzbGFzaGVzRGVub3RlSG9zdCB8fCBwcm90byB8fCByZXN0Lm1hdGNoKC9eXFwvXFwvW15AXFwvXStAW15AXFwvXSsvKSkge1xuICAgIHZhciBzbGFzaGVzID0gcmVzdC5zdWJzdHIoMCwgMikgPT09ICcvLyc7XG4gICAgaWYgKHNsYXNoZXMgJiYgIShwcm90byAmJiBob3N0bGVzc1Byb3RvY29sW3Byb3RvXSkpIHtcbiAgICAgIHJlc3QgPSByZXN0LnN1YnN0cigyKTtcbiAgICAgIHRoaXMuc2xhc2hlcyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFob3N0bGVzc1Byb3RvY29sW3Byb3RvXSAmJlxuICAgICAgKHNsYXNoZXMgfHwgKHByb3RvICYmICFzbGFzaGVkUHJvdG9jb2xbcHJvdG9dKSkpIHtcblxuICAgIC8vIHRoZXJlJ3MgYSBob3N0bmFtZS5cbiAgICAvLyB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgLywgPywgOywgb3IgIyBlbmRzIHRoZSBob3N0LlxuICAgIC8vXG4gICAgLy8gSWYgdGhlcmUgaXMgYW4gQCBpbiB0aGUgaG9zdG5hbWUsIHRoZW4gbm9uLWhvc3QgY2hhcnMgKmFyZSogYWxsb3dlZFxuICAgIC8vIHRvIHRoZSBsZWZ0IG9mIHRoZSBsYXN0IEAgc2lnbiwgdW5sZXNzIHNvbWUgaG9zdC1lbmRpbmcgY2hhcmFjdGVyXG4gICAgLy8gY29tZXMgKmJlZm9yZSogdGhlIEAtc2lnbi5cbiAgICAvLyBVUkxzIGFyZSBvYm5veGlvdXMuXG4gICAgLy9cbiAgICAvLyBleDpcbiAgICAvLyBodHRwOi8vYUBiQGMvID0+IHVzZXI6YUBiIGhvc3Q6Y1xuICAgIC8vIGh0dHA6Ly9hQGI/QGMgPT4gdXNlcjphIGhvc3Q6YyBwYXRoOi8/QGNcblxuICAgIC8vIHYwLjEyIFRPRE8oaXNhYWNzKTogVGhpcyBpcyBub3QgcXVpdGUgaG93IENocm9tZSBkb2VzIHRoaW5ncy5cbiAgICAvLyBSZXZpZXcgb3VyIHRlc3QgY2FzZSBhZ2FpbnN0IGJyb3dzZXJzIG1vcmUgY29tcHJlaGVuc2l2ZWx5LlxuXG4gICAgLy8gZmluZCB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgYW55IGhvc3RFbmRpbmdDaGFyc1xuICAgIHZhciBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob3N0RW5kaW5nQ2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2YoaG9zdEVuZGluZ0NoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG5cbiAgICAvLyBhdCB0aGlzIHBvaW50LCBlaXRoZXIgd2UgaGF2ZSBhbiBleHBsaWNpdCBwb2ludCB3aGVyZSB0aGVcbiAgICAvLyBhdXRoIHBvcnRpb24gY2Fubm90IGdvIHBhc3QsIG9yIHRoZSBsYXN0IEAgY2hhciBpcyB0aGUgZGVjaWRlci5cbiAgICB2YXIgYXV0aCwgYXRTaWduO1xuICAgIGlmIChob3N0RW5kID09PSAtMSkge1xuICAgICAgLy8gYXRTaWduIGNhbiBiZSBhbnl3aGVyZS5cbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXRTaWduIG11c3QgYmUgaW4gYXV0aCBwb3J0aW9uLlxuICAgICAgLy8gaHR0cDovL2FAYi9jQGQgPT4gaG9zdDpiIGF1dGg6YSBwYXRoOi9jQGRcbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnLCBob3N0RW5kKTtcbiAgICB9XG5cbiAgICAvLyBOb3cgd2UgaGF2ZSBhIHBvcnRpb24gd2hpY2ggaXMgZGVmaW5pdGVseSB0aGUgYXV0aC5cbiAgICAvLyBQdWxsIHRoYXQgb2ZmLlxuICAgIGlmIChhdFNpZ24gIT09IC0xKSB7XG4gICAgICBhdXRoID0gcmVzdC5zbGljZSgwLCBhdFNpZ24pO1xuICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoYXRTaWduICsgMSk7XG4gICAgICB0aGlzLmF1dGggPSBkZWNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgfVxuXG4gICAgLy8gdGhlIGhvc3QgaXMgdGhlIHJlbWFpbmluZyB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3Qgbm9uLWhvc3QgY2hhclxuICAgIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vbkhvc3RDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihub25Ib3N0Q2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cbiAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIG5vdCBoaXQgaXQsIHRoZW4gdGhlIGVudGlyZSB0aGluZyBpcyBhIGhvc3QuXG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKVxuICAgICAgaG9zdEVuZCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgdGhpcy5ob3N0ID0gcmVzdC5zbGljZSgwLCBob3N0RW5kKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZShob3N0RW5kKTtcblxuICAgIC8vIHB1bGwgb3V0IHBvcnQuXG4gICAgdGhpcy5wYXJzZUhvc3QoKTtcblxuICAgIC8vIHdlJ3ZlIGluZGljYXRlZCB0aGF0IHRoZXJlIGlzIGEgaG9zdG5hbWUsXG4gICAgLy8gc28gZXZlbiBpZiBpdCdzIGVtcHR5LCBpdCBoYXMgdG8gYmUgcHJlc2VudC5cbiAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcblxuICAgIC8vIGlmIGhvc3RuYW1lIGJlZ2lucyB3aXRoIFsgYW5kIGVuZHMgd2l0aCBdXG4gICAgLy8gYXNzdW1lIHRoYXQgaXQncyBhbiBJUHY2IGFkZHJlc3MuXG4gICAgdmFyIGlwdjZIb3N0bmFtZSA9IHRoaXMuaG9zdG5hbWVbMF0gPT09ICdbJyAmJlxuICAgICAgICB0aGlzLmhvc3RuYW1lW3RoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMV0gPT09ICddJztcblxuICAgIC8vIHZhbGlkYXRlIGEgbGl0dGxlLlxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB2YXIgaG9zdHBhcnRzID0gdGhpcy5ob3N0bmFtZS5zcGxpdCgvXFwuLyk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGhvc3RwYXJ0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnQgPSBob3N0cGFydHNbaV07XG4gICAgICAgIGlmICghcGFydCkgY29udGludWU7XG4gICAgICAgIGlmICghcGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgIHZhciBuZXdwYXJ0ID0gJyc7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBwYXJ0Lmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhcnQuY2hhckNvZGVBdChqKSA+IDEyNykge1xuICAgICAgICAgICAgICAvLyB3ZSByZXBsYWNlIG5vbi1BU0NJSSBjaGFyIHdpdGggYSB0ZW1wb3JhcnkgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0aGlzIHRvIG1ha2Ugc3VyZSBzaXplIG9mIGhvc3RuYW1lIGlzIG5vdFxuICAgICAgICAgICAgICAvLyBicm9rZW4gYnkgcmVwbGFjaW5nIG5vbi1BU0NJSSBieSBub3RoaW5nXG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gJ3gnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3cGFydCArPSBwYXJ0W2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSB0ZXN0IGFnYWluIHdpdGggQVNDSUkgY2hhciBvbmx5XG4gICAgICAgICAgaWYgKCFuZXdwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRQYXJ0cyA9IGhvc3RwYXJ0cy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHZhciBub3RIb3N0ID0gaG9zdHBhcnRzLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgIHZhciBiaXQgPSBwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChiaXQpIHtcbiAgICAgICAgICAgICAgdmFsaWRQYXJ0cy5wdXNoKGJpdFsxXSk7XG4gICAgICAgICAgICAgIG5vdEhvc3QudW5zaGlmdChiaXRbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vdEhvc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlc3QgPSAnLycgKyBub3RIb3N0LmpvaW4oJy4nKSArIHJlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhvc3RuYW1lID0gdmFsaWRQYXJ0cy5qb2luKCcuJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5ob3N0bmFtZS5sZW5ndGggPiBob3N0bmFtZU1heExlbikge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBob3N0bmFtZXMgYXJlIGFsd2F5cyBsb3dlciBjYXNlLlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgLy8gSUROQSBTdXBwb3J0OiBSZXR1cm5zIGEgcHVueWNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIFwiZG9tYWluXCIuXG4gICAgICAvLyBJdCBvbmx5IGNvbnZlcnRzIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB0aGF0XG4gICAgICAvLyBoYXZlIG5vbi1BU0NJSSBjaGFyYWN0ZXJzLCBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmXG4gICAgICAvLyB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQgYWxyZWFkeSBpcyBBU0NJSS1vbmx5LlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHB1bnljb2RlLnRvQVNDSUkodGhpcy5ob3N0bmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIHAgPSB0aGlzLnBvcnQgPyAnOicgKyB0aGlzLnBvcnQgOiAnJztcbiAgICB2YXIgaCA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG4gICAgdGhpcy5ob3N0ID0gaCArIHA7XG4gICAgdGhpcy5ocmVmICs9IHRoaXMuaG9zdDtcblxuICAgIC8vIHN0cmlwIFsgYW5kIF0gZnJvbSB0aGUgaG9zdG5hbWVcbiAgICAvLyB0aGUgaG9zdCBmaWVsZCBzdGlsbCByZXRhaW5zIHRoZW0sIHRob3VnaFxuICAgIGlmIChpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnN1YnN0cigxLCB0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgaWYgKHJlc3RbMF0gIT09ICcvJykge1xuICAgICAgICByZXN0ID0gJy8nICsgcmVzdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBub3cgcmVzdCBpcyBzZXQgdG8gdGhlIHBvc3QtaG9zdCBzdHVmZi5cbiAgLy8gY2hvcCBvZmYgYW55IGRlbGltIGNoYXJzLlxuICBpZiAoIXVuc2FmZVByb3RvY29sW2xvd2VyUHJvdG9dKSB7XG5cbiAgICAvLyBGaXJzdCwgbWFrZSAxMDAlIHN1cmUgdGhhdCBhbnkgXCJhdXRvRXNjYXBlXCIgY2hhcnMgZ2V0XG4gICAgLy8gZXNjYXBlZCwgZXZlbiBpZiBlbmNvZGVVUklDb21wb25lbnQgZG9lc24ndCB0aGluayB0aGV5XG4gICAgLy8gbmVlZCB0byBiZS5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF1dG9Fc2NhcGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgYWUgPSBhdXRvRXNjYXBlW2ldO1xuICAgICAgaWYgKHJlc3QuaW5kZXhPZihhZSkgPT09IC0xKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIHZhciBlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoYWUpO1xuICAgICAgaWYgKGVzYyA9PT0gYWUpIHtcbiAgICAgICAgZXNjID0gZXNjYXBlKGFlKTtcbiAgICAgIH1cbiAgICAgIHJlc3QgPSByZXN0LnNwbGl0KGFlKS5qb2luKGVzYyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBjaG9wIG9mZiBmcm9tIHRoZSB0YWlsIGZpcnN0LlxuICB2YXIgaGFzaCA9IHJlc3QuaW5kZXhPZignIycpO1xuICBpZiAoaGFzaCAhPT0gLTEpIHtcbiAgICAvLyBnb3QgYSBmcmFnbWVudCBzdHJpbmcuXG4gICAgdGhpcy5oYXNoID0gcmVzdC5zdWJzdHIoaGFzaCk7XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgaGFzaCk7XG4gIH1cbiAgdmFyIHFtID0gcmVzdC5pbmRleE9mKCc/Jyk7XG4gIGlmIChxbSAhPT0gLTEpIHtcbiAgICB0aGlzLnNlYXJjaCA9IHJlc3Quc3Vic3RyKHFtKTtcbiAgICB0aGlzLnF1ZXJ5ID0gcmVzdC5zdWJzdHIocW0gKyAxKTtcbiAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMucXVlcnkpO1xuICAgIH1cbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBxbSk7XG4gIH0gZWxzZSBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgIC8vIG5vIHF1ZXJ5IHN0cmluZywgYnV0IHBhcnNlUXVlcnlTdHJpbmcgc3RpbGwgcmVxdWVzdGVkXG4gICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICB0aGlzLnF1ZXJ5ID0ge307XG4gIH1cbiAgaWYgKHJlc3QpIHRoaXMucGF0aG5hbWUgPSByZXN0O1xuICBpZiAoc2xhc2hlZFByb3RvY29sW2xvd2VyUHJvdG9dICYmXG4gICAgICB0aGlzLmhvc3RuYW1lICYmICF0aGlzLnBhdGhuYW1lKSB7XG4gICAgdGhpcy5wYXRobmFtZSA9ICcvJztcbiAgfVxuXG4gIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgaWYgKHRoaXMucGF0aG5hbWUgfHwgdGhpcy5zZWFyY2gpIHtcbiAgICB2YXIgcCA9IHRoaXMucGF0aG5hbWUgfHwgJyc7XG4gICAgdmFyIHMgPSB0aGlzLnNlYXJjaCB8fCAnJztcbiAgICB0aGlzLnBhdGggPSBwICsgcztcbiAgfVxuXG4gIC8vIGZpbmFsbHksIHJlY29uc3RydWN0IHRoZSBocmVmIGJhc2VkIG9uIHdoYXQgaGFzIGJlZW4gdmFsaWRhdGVkLlxuICB0aGlzLmhyZWYgPSB0aGlzLmZvcm1hdCgpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGZvcm1hdCBhIHBhcnNlZCBvYmplY3QgaW50byBhIHVybCBzdHJpbmdcbmZ1bmN0aW9uIHVybEZvcm1hdChvYmopIHtcbiAgLy8gZW5zdXJlIGl0J3MgYW4gb2JqZWN0LCBhbmQgbm90IGEgc3RyaW5nIHVybC5cbiAgLy8gSWYgaXQncyBhbiBvYmosIHRoaXMgaXMgYSBuby1vcC5cbiAgLy8gdGhpcyB3YXksIHlvdSBjYW4gY2FsbCB1cmxfZm9ybWF0KCkgb24gc3RyaW5nc1xuICAvLyB0byBjbGVhbiB1cCBwb3RlbnRpYWxseSB3b25reSB1cmxzLlxuICBpZiAodXRpbC5pc1N0cmluZyhvYmopKSBvYmogPSB1cmxQYXJzZShvYmopO1xuICBpZiAoIShvYmogaW5zdGFuY2VvZiBVcmwpKSByZXR1cm4gVXJsLnByb3RvdHlwZS5mb3JtYXQuY2FsbChvYmopO1xuICByZXR1cm4gb2JqLmZvcm1hdCgpO1xufVxuXG5VcmwucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXV0aCA9IHRoaXMuYXV0aCB8fCAnJztcbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCAnOicpO1xuICAgIGF1dGggKz0gJ0AnO1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gdGhpcy5wcm90b2NvbCB8fCAnJyxcbiAgICAgIHBhdGhuYW1lID0gdGhpcy5wYXRobmFtZSB8fCAnJyxcbiAgICAgIGhhc2ggPSB0aGlzLmhhc2ggfHwgJycsXG4gICAgICBob3N0ID0gZmFsc2UsXG4gICAgICBxdWVyeSA9ICcnO1xuXG4gIGlmICh0aGlzLmhvc3QpIHtcbiAgICBob3N0ID0gYXV0aCArIHRoaXMuaG9zdDtcbiAgfSBlbHNlIGlmICh0aGlzLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAodGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgPT09IC0xID9cbiAgICAgICAgdGhpcy5ob3N0bmFtZSA6XG4gICAgICAgICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScpO1xuICAgIGlmICh0aGlzLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gJzonICsgdGhpcy5wb3J0O1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLnF1ZXJ5ICYmXG4gICAgICB1dGlsLmlzT2JqZWN0KHRoaXMucXVlcnkpICYmXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5KS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaCB8fCAocXVlcnkgJiYgKCc/JyArIHF1ZXJ5KSkgfHwgJyc7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIC8vIG9ubHkgdGhlIHNsYXNoZWRQcm90b2NvbHMgZ2V0IHRoZSAvLy4gIE5vdCBtYWlsdG86LCB4bXBwOiwgZXRjLlxuICAvLyB1bmxlc3MgdGhleSBoYWQgdGhlbSB0byBiZWdpbiB3aXRoLlxuICBpZiAodGhpcy5zbGFzaGVzIHx8XG4gICAgICAoIXByb3RvY29sIHx8IHNsYXNoZWRQcm90b2NvbFtwcm90b2NvbF0pICYmIGhvc3QgIT09IGZhbHNlKSB7XG4gICAgaG9zdCA9ICcvLycgKyAoaG9zdCB8fCAnJyk7XG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSBwYXRobmFtZSA9ICcvJyArIHBhdGhuYW1lO1xuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9ICcnO1xuICB9XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2g7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSBzZWFyY2ggPSAnPycgKyBzZWFyY2g7XG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKTtcblxuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZShzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlKHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgcmV0dXJuIHRoaXMucmVzb2x2ZU9iamVjdCh1cmxQYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpKS5mb3JtYXQoKTtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmVPYmplY3Qoc291cmNlLCByZWxhdGl2ZSkge1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIHJlbGF0aXZlO1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZU9iamVjdChyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZU9iamVjdCA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIGlmICh1dGlsLmlzU3RyaW5nKHJlbGF0aXZlKSkge1xuICAgIHZhciByZWwgPSBuZXcgVXJsKCk7XG4gICAgcmVsLnBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgcmVsYXRpdmUgPSByZWw7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFVybCgpO1xuICB2YXIgdGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgZm9yICh2YXIgdGsgPSAwOyB0ayA8IHRrZXlzLmxlbmd0aDsgdGsrKykge1xuICAgIHZhciB0a2V5ID0gdGtleXNbdGtdO1xuICAgIHJlc3VsdFt0a2V5XSA9IHRoaXNbdGtleV07XG4gIH1cblxuICAvLyBoYXNoIGlzIGFsd2F5cyBvdmVycmlkZGVuLCBubyBtYXR0ZXIgd2hhdC5cbiAgLy8gZXZlbiBocmVmPVwiXCIgd2lsbCByZW1vdmUgaXQuXG4gIHJlc3VsdC5oYXNoID0gcmVsYXRpdmUuaGFzaDtcblxuICAvLyBpZiB0aGUgcmVsYXRpdmUgdXJsIGlzIGVtcHR5LCB0aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIGRvIGhlcmUuXG4gIGlmIChyZWxhdGl2ZS5ocmVmID09PSAnJykge1xuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBocmVmcyBsaWtlIC8vZm9vL2JhciBhbHdheXMgY3V0IHRvIHRoZSBwcm90b2NvbC5cbiAgaWYgKHJlbGF0aXZlLnNsYXNoZXMgJiYgIXJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgLy8gdGFrZSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgcHJvdG9jb2wgZnJvbSByZWxhdGl2ZVxuICAgIHZhciBya2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICBmb3IgKHZhciByayA9IDA7IHJrIDwgcmtleXMubGVuZ3RoOyByaysrKSB7XG4gICAgICB2YXIgcmtleSA9IHJrZXlzW3JrXTtcbiAgICAgIGlmIChya2V5ICE9PSAncHJvdG9jb2wnKVxuICAgICAgICByZXN1bHRbcmtleV0gPSByZWxhdGl2ZVtya2V5XTtcbiAgICB9XG5cbiAgICAvL3VybFBhcnNlIGFwcGVuZHMgdHJhaWxpbmcgLyB0byB1cmxzIGxpa2UgaHR0cDovL3d3dy5leGFtcGxlLmNvbVxuICAgIGlmIChzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXSAmJlxuICAgICAgICByZXN1bHQuaG9zdG5hbWUgJiYgIXJlc3VsdC5wYXRobmFtZSkge1xuICAgICAgcmVzdWx0LnBhdGggPSByZXN1bHQucGF0aG5hbWUgPSAnLyc7XG4gICAgfVxuXG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChyZWxhdGl2ZS5wcm90b2NvbCAmJiByZWxhdGl2ZS5wcm90b2NvbCAhPT0gcmVzdWx0LnByb3RvY29sKSB7XG4gICAgLy8gaWYgaXQncyBhIGtub3duIHVybCBwcm90b2NvbCwgdGhlbiBjaGFuZ2luZ1xuICAgIC8vIHRoZSBwcm90b2NvbCBkb2VzIHdlaXJkIHRoaW5nc1xuICAgIC8vIGZpcnN0LCBpZiBpdCdzIG5vdCBmaWxlOiwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBob3N0LFxuICAgIC8vIGFuZCBpZiB0aGVyZSB3YXMgYSBwYXRoXG4gICAgLy8gdG8gYmVnaW4gd2l0aCwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBwYXRoLlxuICAgIC8vIGlmIGl0IGlzIGZpbGU6LCB0aGVuIHRoZSBob3N0IGlzIGRyb3BwZWQsXG4gICAgLy8gYmVjYXVzZSB0aGF0J3Mga25vd24gdG8gYmUgaG9zdGxlc3MuXG4gICAgLy8gYW55dGhpbmcgZWxzZSBpcyBhc3N1bWVkIHRvIGJlIGFic29sdXRlLlxuICAgIGlmICghc2xhc2hlZFByb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZWxhdGl2ZSk7XG4gICAgICBmb3IgKHZhciB2ID0gMDsgdiA8IGtleXMubGVuZ3RoOyB2KyspIHtcbiAgICAgICAgdmFyIGsgPSBrZXlzW3ZdO1xuICAgICAgICByZXN1bHRba10gPSByZWxhdGl2ZVtrXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQucHJvdG9jb2wgPSByZWxhdGl2ZS5wcm90b2NvbDtcbiAgICBpZiAoIXJlbGF0aXZlLmhvc3QgJiYgIWhvc3RsZXNzUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIgcmVsUGF0aCA9IChyZWxhdGl2ZS5wYXRobmFtZSB8fCAnJykuc3BsaXQoJy8nKTtcbiAgICAgIHdoaWxlIChyZWxQYXRoLmxlbmd0aCAmJiAhKHJlbGF0aXZlLmhvc3QgPSByZWxQYXRoLnNoaWZ0KCkpKTtcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdCkgcmVsYXRpdmUuaG9zdCA9ICcnO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0bmFtZSkgcmVsYXRpdmUuaG9zdG5hbWUgPSAnJztcbiAgICAgIGlmIChyZWxQYXRoWzBdICE9PSAnJykgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIGlmIChyZWxQYXRoLmxlbmd0aCA8IDIpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxQYXRoLmpvaW4oJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsYXRpdmUucGF0aG5hbWU7XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgcmVzdWx0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0IHx8ICcnO1xuICAgIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0O1xuICAgIHJlc3VsdC5wb3J0ID0gcmVsYXRpdmUucG9ydDtcbiAgICAvLyB0byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQucGF0aG5hbWUgfHwgcmVzdWx0LnNlYXJjaCkge1xuICAgICAgdmFyIHAgPSByZXN1bHQucGF0aG5hbWUgfHwgJyc7XG4gICAgICB2YXIgcyA9IHJlc3VsdC5zZWFyY2ggfHwgJyc7XG4gICAgICByZXN1bHQucGF0aCA9IHAgKyBzO1xuICAgIH1cbiAgICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhciBpc1NvdXJjZUFicyA9IChyZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSxcbiAgICAgIGlzUmVsQWJzID0gKFxuICAgICAgICAgIHJlbGF0aXZlLmhvc3QgfHxcbiAgICAgICAgICByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJ1xuICAgICAgKSxcbiAgICAgIG11c3RFbmRBYnMgPSAoaXNSZWxBYnMgfHwgaXNTb3VyY2VBYnMgfHxcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5ob3N0ICYmIHJlbGF0aXZlLnBhdGhuYW1lKSksXG4gICAgICByZW1vdmVBbGxEb3RzID0gbXVzdEVuZEFicyxcbiAgICAgIHNyY1BhdGggPSByZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICByZWxQYXRoID0gcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHBzeWNob3RpYyA9IHJlc3VsdC5wcm90b2NvbCAmJiAhc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF07XG5cbiAgLy8gaWYgdGhlIHVybCBpcyBhIG5vbi1zbGFzaGVkIHVybCwgdGhlbiByZWxhdGl2ZVxuICAvLyBsaW5rcyBsaWtlIC4uLy4uIHNob3VsZCBiZSBhYmxlXG4gIC8vIHRvIGNyYXdsIHVwIHRvIHRoZSBob3N0bmFtZSwgYXMgd2VsbC4gIFRoaXMgaXMgc3RyYW5nZS5cbiAgLy8gcmVzdWx0LnByb3RvY29sIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IG5vdy5cbiAgLy8gTGF0ZXIgb24sIHB1dCB0aGUgZmlyc3QgcGF0aCBwYXJ0IGludG8gdGhlIGhvc3QgZmllbGQuXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAnJztcbiAgICByZXN1bHQucG9ydCA9IG51bGw7XG4gICAgaWYgKHJlc3VsdC5ob3N0KSB7XG4gICAgICBpZiAoc3JjUGF0aFswXSA9PT0gJycpIHNyY1BhdGhbMF0gPSByZXN1bHQuaG9zdDtcbiAgICAgIGVsc2Ugc3JjUGF0aC51bnNoaWZ0KHJlc3VsdC5ob3N0KTtcbiAgICB9XG4gICAgcmVzdWx0Lmhvc3QgPSAnJztcbiAgICBpZiAocmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAgIHJlbGF0aXZlLmhvc3RuYW1lID0gbnVsbDtcbiAgICAgIHJlbGF0aXZlLnBvcnQgPSBudWxsO1xuICAgICAgaWYgKHJlbGF0aXZlLmhvc3QpIHtcbiAgICAgICAgaWYgKHJlbFBhdGhbMF0gPT09ICcnKSByZWxQYXRoWzBdID0gcmVsYXRpdmUuaG9zdDtcbiAgICAgICAgZWxzZSByZWxQYXRoLnVuc2hpZnQocmVsYXRpdmUuaG9zdCk7XG4gICAgICB9XG4gICAgICByZWxhdGl2ZS5ob3N0ID0gbnVsbDtcbiAgICB9XG4gICAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgJiYgKHJlbFBhdGhbMF0gPT09ICcnIHx8IHNyY1BhdGhbMF0gPT09ICcnKTtcbiAgfVxuXG4gIGlmIChpc1JlbEFicykge1xuICAgIC8vIGl0J3MgYWJzb2x1dGUuXG4gICAgcmVzdWx0Lmhvc3QgPSAocmVsYXRpdmUuaG9zdCB8fCByZWxhdGl2ZS5ob3N0ID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdCA6IHJlc3VsdC5ob3N0O1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IChyZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0bmFtZSA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0bmFtZSA6IHJlc3VsdC5ob3N0bmFtZTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHNyY1BhdGggPSByZWxQYXRoO1xuICAgIC8vIGZhbGwgdGhyb3VnaCB0byB0aGUgZG90LWhhbmRsaW5nIGJlbG93LlxuICB9IGVsc2UgaWYgKHJlbFBhdGgubGVuZ3RoKSB7XG4gICAgLy8gaXQncyByZWxhdGl2ZVxuICAgIC8vIHRocm93IGF3YXkgdGhlIGV4aXN0aW5nIGZpbGUsIGFuZCB0YWtlIHRoZSBuZXcgcGF0aCBpbnN0ZWFkLlxuICAgIGlmICghc3JjUGF0aCkgc3JjUGF0aCA9IFtdO1xuICAgIHNyY1BhdGgucG9wKCk7XG4gICAgc3JjUGF0aCA9IHNyY1BhdGguY29uY2F0KHJlbFBhdGgpO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gIH0gZWxzZSBpZiAoIXV0aWwuaXNOdWxsT3JVbmRlZmluZWQocmVsYXRpdmUuc2VhcmNoKSkge1xuICAgIC8vIGp1c3QgcHVsbCBvdXQgdGhlIHNlYXJjaC5cbiAgICAvLyBsaWtlIGhyZWY9Jz9mb28nLlxuICAgIC8vIFB1dCB0aGlzIGFmdGVyIHRoZSBvdGhlciB0d28gY2FzZXMgYmVjYXVzZSBpdCBzaW1wbGlmaWVzIHRoZSBib29sZWFuc1xuICAgIGlmIChwc3ljaG90aWMpIHtcbiAgICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gc3JjUGF0aC5zaGlmdCgpO1xuICAgICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgLy8gbm8gcGF0aCBhdCBhbGwuICBlYXN5LlxuICAgIC8vIHdlJ3ZlIGFscmVhZHkgaGFuZGxlZCB0aGUgb3RoZXIgc3R1ZmYgYWJvdmUuXG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5zZWFyY2gpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gJy8nICsgcmVzdWx0LnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaWYgYSB1cmwgRU5EcyBpbiAuIG9yIC4uLCB0aGVuIGl0IG11c3QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIC8vIGhvd2V2ZXIsIGlmIGl0IGVuZHMgaW4gYW55dGhpbmcgZWxzZSBub24tc2xhc2h5LFxuICAvLyB0aGVuIGl0IG11c3QgTk9UIGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICB2YXIgbGFzdCA9IHNyY1BhdGguc2xpY2UoLTEpWzBdO1xuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IChcbiAgICAgIChyZXN1bHQuaG9zdCB8fCByZWxhdGl2ZS5ob3N0IHx8IHNyY1BhdGgubGVuZ3RoID4gMSkgJiZcbiAgICAgIChsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJykgfHwgbGFzdCA9PT0gJycpO1xuXG4gIC8vIHN0cmlwIHNpbmdsZSBkb3RzLCByZXNvbHZlIGRvdWJsZSBkb3RzIHRvIHBhcmVudCBkaXJcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHNyY1BhdGgubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIGxhc3QgPSBzcmNQYXRoW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmICghbXVzdEVuZEFicyAmJiAhcmVtb3ZlQWxsRG90cykge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgc3JjUGF0aC51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtdXN0RW5kQWJzICYmIHNyY1BhdGhbMF0gIT09ICcnICYmXG4gICAgICAoIXNyY1BhdGhbMF0gfHwgc3JjUGF0aFswXS5jaGFyQXQoMCkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgKHNyY1BhdGguam9pbignLycpLnN1YnN0cigtMSkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnB1c2goJycpO1xuICB9XG5cbiAgdmFyIGlzQWJzb2x1dGUgPSBzcmNQYXRoWzBdID09PSAnJyB8fFxuICAgICAgKHNyY1BhdGhbMF0gJiYgc3JjUGF0aFswXS5jaGFyQXQoMCkgPT09ICcvJyk7XG5cbiAgLy8gcHV0IHRoZSBob3N0IGJhY2tcbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gaXNBYnNvbHV0ZSA/ICcnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1BhdGgubGVuZ3RoID8gc3JjUGF0aC5zaGlmdCgpIDogJyc7XG4gICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgIC8vdGhpcyBlc3BlY2lhbGx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICB9XG4gIH1cblxuICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyB8fCAocmVzdWx0Lmhvc3QgJiYgc3JjUGF0aC5sZW5ndGgpO1xuXG4gIGlmIChtdXN0RW5kQWJzICYmICFpc0Fic29sdXRlKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQucGF0aG5hbWUgPSBzcmNQYXRoLmpvaW4oJy8nKTtcbiAgfVxuXG4gIC8vdG8gc3VwcG9ydCByZXF1ZXN0Lmh0dHBcbiAgaWYgKCF1dGlsLmlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICF1dGlsLmlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gIH1cbiAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoIHx8IHJlc3VsdC5hdXRoO1xuICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuVXJsLnByb3RvdHlwZS5wYXJzZUhvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvc3QgPSB0aGlzLmhvc3Q7XG4gIHZhciBwb3J0ID0gcG9ydFBhdHRlcm4uZXhlYyhob3N0KTtcbiAgaWYgKHBvcnQpIHtcbiAgICBwb3J0ID0gcG9ydFswXTtcbiAgICBpZiAocG9ydCAhPT0gJzonKSB7XG4gICAgICB0aGlzLnBvcnQgPSBwb3J0LnN1YnN0cigxKTtcbiAgICB9XG4gICAgaG9zdCA9IGhvc3Quc3Vic3RyKDAsIGhvc3QubGVuZ3RoIC0gcG9ydC5sZW5ndGgpO1xuICB9XG4gIGlmIChob3N0KSB0aGlzLmhvc3RuYW1lID0gaG9zdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvdXJsL3VybC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlIHYxLjMuMiBieSBAbWF0aGlhcyAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0LyoqIERldGVjdCBmcmVlIHZhcmlhYmxlcyAqL1xuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmXG5cdFx0IWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdCFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoXG5cdFx0ZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwuc2VsZiA9PT0gZnJlZUdsb2JhbFxuXHQpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYHB1bnljb2RlYCBvYmplY3QuXG5cdCAqIEBuYW1lIHB1bnljb2RlXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKi9cblx0dmFyIHB1bnljb2RlLFxuXG5cdC8qKiBIaWdoZXN0IHBvc2l0aXZlIHNpZ25lZCAzMi1iaXQgZmxvYXQgdmFsdWUgKi9cblx0bWF4SW50ID0gMjE0NzQ4MzY0NywgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxuXG5cdC8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cblx0YmFzZSA9IDM2LFxuXHR0TWluID0gMSxcblx0dE1heCA9IDI2LFxuXHRza2V3ID0gMzgsXG5cdGRhbXAgPSA3MDAsXG5cdGluaXRpYWxCaWFzID0gNzIsXG5cdGluaXRpYWxOID0gMTI4LCAvLyAweDgwXG5cdGRlbGltaXRlciA9ICctJywgLy8gJ1xceDJEJ1xuXG5cdC8qKiBSZWd1bGFyIGV4cHJlc3Npb25zICovXG5cdHJlZ2V4UHVueWNvZGUgPSAvXnhuLS0vLFxuXHRyZWdleE5vbkFTQ0lJID0gL1teXFx4MjAtXFx4N0VdLywgLy8gdW5wcmludGFibGUgQVNDSUkgY2hhcnMgKyBub24tQVNDSUkgY2hhcnNcblx0cmVnZXhTZXBhcmF0b3JzID0gL1tcXHgyRVxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZywgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG5cdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRlcnJvcnMgPSB7XG5cdFx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG5cdH0sXG5cblx0LyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xuXHRiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW4sXG5cdGZsb29yID0gTWF0aC5mbG9vcixcblx0c3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcblxuXHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdGtleTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuXHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdCAqL1xuXHRmdW5jdGlvbiBlcnJvcih0eXBlKSB7XG5cdFx0dGhyb3cgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0ICogYWRkcmVzc2VzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0XHR9XG5cdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdFx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBkZWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cblx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGNvdW50ZXIgPSAwLFxuXHRcdCAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuXHRcdCAgICB2YWx1ZSxcblx0XHQgICAgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGVuY29kZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0cmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cblx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcblx0ICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdFx0aWYgKGNvZGVQb2ludCAtIDQ4IDwgMTApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDY1IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDk3IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHR9XG5cdFx0cmV0dXJuIGJhc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3Jcblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2Vcblx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdCAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG5cdCAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0XHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG5cdH1cblxuXHQvKipcblx0ICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cblx0ICogaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gYWRhcHQoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG5cdFx0dmFyIGsgPSAwO1xuXHRcdGRlbHRhID0gZmlyc3RUaW1lID8gZmxvb3IoZGVsdGEgLyBkYW1wKSA6IGRlbHRhID4+IDE7XG5cdFx0ZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuXHRcdGZvciAoLyogbm8gaW5pdGlhbGl6YXRpb24gKi87IGRlbHRhID4gYmFzZU1pbnVzVE1pbiAqIHRNYXggPj4gMTsgayArPSBiYXNlKSB7XG5cdFx0XHRkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG5cdFx0fVxuXHRcdHJldHVybiBmbG9vcihrICsgKGJhc2VNaW51c1RNaW4gKyAxKSAqIGRlbHRhIC8gKGRlbHRhICsgc2tldykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scyB0byBhIHN0cmluZyBvZiBVbmljb2RlXG5cdCAqIHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHRcdC8vIERvbid0IHVzZSBVQ1MtMlxuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdFx0ICAgIG91dCxcblx0XHQgICAgaSA9IDAsXG5cdFx0ICAgIG4gPSBpbml0aWFsTixcblx0XHQgICAgYmlhcyA9IGluaXRpYWxCaWFzLFxuXHRcdCAgICBiYXNpYyxcblx0XHQgICAgaixcblx0XHQgICAgaW5kZXgsXG5cdFx0ICAgIG9sZGksXG5cdFx0ICAgIHcsXG5cdFx0ICAgIGssXG5cdFx0ICAgIGRpZ2l0LFxuXHRcdCAgICB0LFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgYmFzZU1pbnVzVDtcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHM6IGxldCBgYmFzaWNgIGJlIHRoZSBudW1iZXIgb2YgaW5wdXQgY29kZVxuXHRcdC8vIHBvaW50cyBiZWZvcmUgdGhlIGxhc3QgZGVsaW1pdGVyLCBvciBgMGAgaWYgdGhlcmUgaXMgbm9uZSwgdGhlbiBjb3B5XG5cdFx0Ly8gdGhlIGZpcnN0IGJhc2ljIGNvZGUgcG9pbnRzIHRvIHRoZSBvdXRwdXQuXG5cblx0XHRiYXNpYyA9IGlucHV0Lmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG5cdFx0aWYgKGJhc2ljIDwgMCkge1xuXHRcdFx0YmFzaWMgPSAwO1xuXHRcdH1cblxuXHRcdGZvciAoaiA9IDA7IGogPCBiYXNpYzsgKytqKSB7XG5cdFx0XHQvLyBpZiBpdCdzIG5vdCBhIGJhc2ljIGNvZGUgcG9pbnRcblx0XHRcdGlmIChpbnB1dC5jaGFyQ29kZUF0KGopID49IDB4ODApIHtcblx0XHRcdFx0ZXJyb3IoJ25vdC1iYXNpYycpO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0LnB1c2goaW5wdXQuY2hhckNvZGVBdChqKSk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBkZWNvZGluZyBsb29wOiBzdGFydCBqdXN0IGFmdGVyIHRoZSBsYXN0IGRlbGltaXRlciBpZiBhbnkgYmFzaWMgY29kZVxuXHRcdC8vIHBvaW50cyB3ZXJlIGNvcGllZDsgc3RhcnQgYXQgdGhlIGJlZ2lubmluZyBvdGhlcndpc2UuXG5cblx0XHRmb3IgKGluZGV4ID0gYmFzaWMgPiAwID8gYmFzaWMgKyAxIDogMDsgaW5kZXggPCBpbnB1dExlbmd0aDsgLyogbm8gZmluYWwgZXhwcmVzc2lvbiAqLykge1xuXG5cdFx0XHQvLyBgaW5kZXhgIGlzIHRoZSBpbmRleCBvZiB0aGUgbmV4dCBjaGFyYWN0ZXIgdG8gYmUgY29uc3VtZWQuXG5cdFx0XHQvLyBEZWNvZGUgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciBpbnRvIGBkZWx0YWAsXG5cdFx0XHQvLyB3aGljaCBnZXRzIGFkZGVkIHRvIGBpYC4gVGhlIG92ZXJmbG93IGNoZWNraW5nIGlzIGVhc2llclxuXHRcdFx0Ly8gaWYgd2UgaW5jcmVhc2UgYGlgIGFzIHdlIGdvLCB0aGVuIHN1YnRyYWN0IG9mZiBpdHMgc3RhcnRpbmdcblx0XHRcdC8vIHZhbHVlIGF0IHRoZSBlbmQgdG8gb2J0YWluIGBkZWx0YWAuXG5cdFx0XHRmb3IgKG9sZGkgPSBpLCB3ID0gMSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cblx0XHRcdFx0aWYgKGluZGV4ID49IGlucHV0TGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ2ludmFsaWQtaW5wdXQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRpZ2l0ID0gYmFzaWNUb0RpZ2l0KGlucHV0LmNoYXJDb2RlQXQoaW5kZXgrKykpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA+PSBiYXNlIHx8IGRpZ2l0ID4gZmxvb3IoKG1heEludCAtIGkpIC8gdykpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGkgKz0gZGlnaXQgKiB3O1xuXHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPCB0KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdGlmICh3ID4gZmxvb3IobWF4SW50IC8gYmFzZU1pbnVzVCkpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHcgKj0gYmFzZU1pbnVzVDtcblxuXHRcdFx0fVxuXG5cdFx0XHRvdXQgPSBvdXRwdXQubGVuZ3RoICsgMTtcblx0XHRcdGJpYXMgPSBhZGFwdChpIC0gb2xkaSwgb3V0LCBvbGRpID09IDApO1xuXG5cdFx0XHQvLyBgaWAgd2FzIHN1cHBvc2VkIHRvIHdyYXAgYXJvdW5kIGZyb20gYG91dGAgdG8gYDBgLFxuXHRcdFx0Ly8gaW5jcmVtZW50aW5nIGBuYCBlYWNoIHRpbWUsIHNvIHdlJ2xsIGZpeCB0aGF0IG5vdzpcblx0XHRcdGlmIChmbG9vcihpIC8gb3V0KSA+IG1heEludCAtIG4pIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdG4gKz0gZmxvb3IoaSAvIG91dCk7XG5cdFx0XHRpICU9IG91dDtcblxuXHRcdFx0Ly8gSW5zZXJ0IGBuYCBhdCBwb3NpdGlvbiBgaWAgb2YgdGhlIG91dHB1dFxuXHRcdFx0b3V0cHV0LnNwbGljZShpKyssIDAsIG4pO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVjczJlbmNvZGUob3V0cHV0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMgKGUuZy4gYSBkb21haW4gbmFtZSBsYWJlbCkgdG8gYVxuXHQgKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcblx0XHR2YXIgbixcblx0XHQgICAgZGVsdGEsXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50LFxuXHRcdCAgICBiYXNpY0xlbmd0aCxcblx0XHQgICAgYmlhcyxcblx0XHQgICAgaixcblx0XHQgICAgbSxcblx0XHQgICAgcSxcblx0XHQgICAgayxcblx0XHQgICAgdCxcblx0XHQgICAgY3VycmVudFZhbHVlLFxuXHRcdCAgICBvdXRwdXQgPSBbXSxcblx0XHQgICAgLyoqIGBpbnB1dExlbmd0aGAgd2lsbCBob2xkIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgaW4gYGlucHV0YC4gKi9cblx0XHQgICAgaW5wdXRMZW5ndGgsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsXG5cdFx0ICAgIGJhc2VNaW51c1QsXG5cdFx0ICAgIHFNaW51c1Q7XG5cblx0XHQvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBVbmljb2RlXG5cdFx0aW5wdXQgPSB1Y3MyZGVjb2RlKGlucHV0KTtcblxuXHRcdC8vIENhY2hlIHRoZSBsZW5ndGhcblx0XHRpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHN0YXRlXG5cdFx0biA9IGluaXRpYWxOO1xuXHRcdGRlbHRhID0gMDtcblx0XHRiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzXG5cdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IDB4ODApIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGggPSBvdXRwdXQubGVuZ3RoO1xuXG5cdFx0Ly8gYGhhbmRsZWRDUENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cdFx0Ly8gYGJhc2ljTGVuZ3RoYCBpcyB0aGUgbnVtYmVyIG9mIGJhc2ljIGNvZGUgcG9pbnRzLlxuXG5cdFx0Ly8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgLSBpZiBpdCBpcyBub3QgZW1wdHkgLSB3aXRoIGEgZGVsaW1pdGVyXG5cdFx0aWYgKGJhc2ljTGVuZ3RoKSB7XG5cdFx0XHRvdXRwdXQucHVzaChkZWxpbWl0ZXIpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZW5jb2RpbmcgbG9vcDpcblx0XHR3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuXG5cdFx0XHQvLyBBbGwgbm9uLWJhc2ljIGNvZGUgcG9pbnRzIDwgbiBoYXZlIGJlZW4gaGFuZGxlZCBhbHJlYWR5LiBGaW5kIHRoZSBuZXh0XG5cdFx0XHQvLyBsYXJnZXIgb25lOlxuXHRcdFx0Zm9yIChtID0gbWF4SW50LCBqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPj0gbiAmJiBjdXJyZW50VmFsdWUgPCBtKSB7XG5cdFx0XHRcdFx0bSA9IGN1cnJlbnRWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbmNyZWFzZSBgZGVsdGFgIGVub3VnaCB0byBhZHZhbmNlIHRoZSBkZWNvZGVyJ3MgPG4saT4gc3RhdGUgdG8gPG0sMD4sXG5cdFx0XHQvLyBidXQgZ3VhcmQgYWdhaW5zdCBvdmVyZmxvd1xuXHRcdFx0aGFuZGxlZENQQ291bnRQbHVzT25lID0gaGFuZGxlZENQQ291bnQgKyAxO1xuXHRcdFx0aWYgKG0gLSBuID4gZmxvb3IoKG1heEludCAtIGRlbHRhKSAvIGhhbmRsZWRDUENvdW50UGx1c09uZSkpIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG5cdFx0XHRuID0gbTtcblxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PSBuKSB7XG5cdFx0XHRcdFx0Ly8gUmVwcmVzZW50IGRlbHRhIGFzIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXJcblx0XHRcdFx0XHRmb3IgKHEgPSBkZWx0YSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cdFx0XHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblx0XHRcdFx0XHRcdGlmIChxIDwgdCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHFNaW51c1QgPSBxIC0gdDtcblx0XHRcdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRcdG91dHB1dC5wdXNoKFxuXHRcdFx0XHRcdFx0XHRzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHQgKyBxTWludXNUICUgYmFzZU1pbnVzVCwgMCkpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHEsIDApKSk7XG5cdFx0XHRcdFx0YmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcblx0XHRcdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRcdFx0KytoYW5kbGVkQ1BDb3VudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQrK2RlbHRhO1xuXHRcdFx0KytuO1xuXG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzc1xuXHQgKiB0byBVbmljb2RlLiBPbmx5IHRoZSBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGlucHV0IHdpbGwgYmUgY29udmVydGVkLCBpLmUuXG5cdCAqIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlblxuXHQgKiBjb252ZXJ0ZWQgdG8gVW5pY29kZS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGVkIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogY29udmVydCB0byBVbmljb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcblx0ICogc3RyaW5nLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9Vbmljb2RlKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzcyB0b1xuXHQgKiBQdW55Y29kZS4gT25seSB0aGUgbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCxcblx0ICogaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQncyBhbHJlYWR5IGluXG5cdCAqIEFTQ0lJLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvIGNvbnZlcnQsIGFzIGFcblx0ICogVW5pY29kZSBzdHJpbmcuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUgb3Jcblx0ICogZW1haWwgYWRkcmVzcy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvQVNDSUkoaW5wdXQpIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqIERlZmluZSB0aGUgcHVibGljIEFQSSAqL1xuXHRwdW55Y29kZSA9IHtcblx0XHQvKipcblx0XHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgUHVueWNvZGUuanMgdmVyc2lvbiBudW1iZXIuXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgU3RyaW5nXG5cdFx0ICovXG5cdFx0J3ZlcnNpb24nOiAnMS4zLjInLFxuXHRcdC8qKlxuXHRcdCAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG5cdFx0ICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cblx0XHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBPYmplY3Rcblx0XHQgKi9cblx0XHQndWNzMic6IHtcblx0XHRcdCdkZWNvZGUnOiB1Y3MyZGVjb2RlLFxuXHRcdFx0J2VuY29kZSc6IHVjczJlbmNvZGVcblx0XHR9LFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQndG9BU0NJSSc6IHRvQVNDSUksXG5cdFx0J3RvVW5pY29kZSc6IHRvVW5pY29kZVxuXHR9O1xuXG5cdC8qKiBFeHBvc2UgYHB1bnljb2RlYCAqL1xuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZSgncHVueWNvZGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBwdW55Y29kZTtcblx0XHR9KTtcblx0fSBlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiBmcmVlTW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBwdW55Y29kZTtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0cHVueWNvZGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHB1bnljb2RlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QucHVueWNvZGUgPSBwdW55Y29kZTtcblx0fVxuXG59KHRoaXMpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3B1bnljb2RlL3B1bnljb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1N0cmluZzogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnc3RyaW5nJztcbiAgfSxcbiAgaXNPYmplY3Q6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB0eXBlb2YoYXJnKSA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xuICB9LFxuICBpc051bGw6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbE9yVW5kZWZpbmVkOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gYXJnID09IG51bGw7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvdXJsL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChvYmpba10sIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbmZ1bmN0aW9uIG1hcCAoeHMsIGYpIHtcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmVzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKGUpO2Vsc2V7dmFyIHQ7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz90PXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP3Q9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYodD1zZWxmKSx0Lm9iamVjdEhhc2g9ZSgpfX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gbyh1LGEpe2lmKCFuW3VdKXtpZighdFt1XSl7dmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighYSYmZilyZXR1cm4gZih1LCEwKTtpZihpKXJldHVybiBpKHUsITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrdStcIidcIil9dmFyIHM9blt1XT17ZXhwb3J0czp7fX07dFt1XVswXS5jYWxsKHMuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W3VdWzFdW2VdO3JldHVybiBvKG4/bjplKX0scyxzLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bdV0uZXhwb3J0c31mb3IodmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSx1PTA7dTxyLmxlbmd0aDt1KyspbyhyW3VdKTtyZXR1cm4gb30oezE6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24ocixvLGksdSxhLGYscyxjLGwpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGQoZSx0KXtyZXR1cm4gdD1oKGUsdCkseShlLHQpfWZ1bmN0aW9uIGgoZSx0KXtpZih0PXR8fHt9LHQuYWxnb3JpdGhtPXQuYWxnb3JpdGhtfHxcInNoYTFcIix0LmVuY29kaW5nPXQuZW5jb2Rpbmd8fFwiaGV4XCIsdC5leGNsdWRlVmFsdWVzPSEhdC5leGNsdWRlVmFsdWVzLHQuYWxnb3JpdGhtPXQuYWxnb3JpdGhtLnRvTG93ZXJDYXNlKCksdC5lbmNvZGluZz10LmVuY29kaW5nLnRvTG93ZXJDYXNlKCksdC5pZ25vcmVVbmtub3duPXQuaWdub3JlVW5rbm93bj09PSEwLHQucmVzcGVjdFR5cGU9dC5yZXNwZWN0VHlwZSE9PSExLHQucmVzcGVjdEZ1bmN0aW9uTmFtZXM9dC5yZXNwZWN0RnVuY3Rpb25OYW1lcyE9PSExLHQucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcz10LnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXMhPT0hMSx0LnVub3JkZXJlZEFycmF5cz10LnVub3JkZXJlZEFycmF5cz09PSEwLHQudW5vcmRlcmVkU2V0cz10LnVub3JkZXJlZFNldHMhPT0hMSx0LnJlcGxhY2VyPXQucmVwbGFjZXJ8fHZvaWQgMCx0LmV4Y2x1ZGVLZXlzPXQuZXhjbHVkZUtleXN8fHZvaWQgMCxcInVuZGVmaW5lZFwiPT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgYXJndW1lbnQgcmVxdWlyZWQuXCIpO2Zvcih2YXIgbj0wO248di5sZW5ndGg7KytuKXZbbl0udG9Mb3dlckNhc2UoKT09PXQuYWxnb3JpdGhtLnRvTG93ZXJDYXNlKCkmJih0LmFsZ29yaXRobT12W25dKTtpZih2LmluZGV4T2YodC5hbGdvcml0aG0pPT09LTEpdGhyb3cgbmV3IEVycm9yKCdBbGdvcml0aG0gXCInK3QuYWxnb3JpdGhtKydcIiAgbm90IHN1cHBvcnRlZC4gc3VwcG9ydGVkIHZhbHVlczogJyt2LmpvaW4oXCIsIFwiKSk7aWYobS5pbmRleE9mKHQuZW5jb2RpbmcpPT09LTEmJlwicGFzc3Rocm91Z2hcIiE9PXQuYWxnb3JpdGhtKXRocm93IG5ldyBFcnJvcignRW5jb2RpbmcgXCInK3QuZW5jb2RpbmcrJ1wiICBub3Qgc3VwcG9ydGVkLiBzdXBwb3J0ZWQgdmFsdWVzOiAnK20uam9pbihcIiwgXCIpKTtyZXR1cm4gdH1mdW5jdGlvbiBwKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpcmV0dXJuITE7dmFyIHQ9L15mdW5jdGlvblxccytcXHcqXFxzKlxcKFxccypcXClcXHMqe1xccytcXFtuYXRpdmUgY29kZVxcXVxccyt9JC9pO3JldHVybiBudWxsIT10LmV4ZWMoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpfWZ1bmN0aW9uIHkoZSx0KXt2YXIgbjtuPVwicGFzc3Rocm91Z2hcIiE9PXQuYWxnb3JpdGhtP2IuY3JlYXRlSGFzaCh0LmFsZ29yaXRobSk6bmV3IHcsXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4ud3JpdGUmJihuLndyaXRlPW4udXBkYXRlLG4uZW5kPW4udXBkYXRlKTt2YXIgcj1nKHQsbik7aWYoci5kaXNwYXRjaChlKSxuLnVwZGF0ZXx8bi5lbmQoXCJcIiksbi5kaWdlc3QpcmV0dXJuIG4uZGlnZXN0KFwiYnVmZmVyXCI9PT10LmVuY29kaW5nP3ZvaWQgMDp0LmVuY29kaW5nKTt2YXIgbz1uLnJlYWQoKTtyZXR1cm5cImJ1ZmZlclwiPT09dC5lbmNvZGluZz9vOm8udG9TdHJpbmcodC5lbmNvZGluZyl9ZnVuY3Rpb24gZyhlLHQsbil7bj1ufHxbXTt2YXIgcj1mdW5jdGlvbihlKXtyZXR1cm4gdC51cGRhdGU/dC51cGRhdGUoZSxcInV0ZjhcIik6dC53cml0ZShlLFwidXRmOFwiKX07cmV0dXJue2Rpc3BhdGNoOmZ1bmN0aW9uKHQpe2UucmVwbGFjZXImJih0PWUucmVwbGFjZXIodCkpO3ZhciBuPXR5cGVvZiB0O3JldHVybiBudWxsPT09dCYmKG49XCJudWxsXCIpLHRoaXNbXCJfXCIrbl0odCl9LF9vYmplY3Q6ZnVuY3Rpb24odCl7dmFyIG89L1xcW29iamVjdCAoLiopXFxdL2ksdT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCksYT1vLmV4ZWModSk7YT1hP2FbMV06XCJ1bmtub3duOltcIit1K1wiXVwiLGE9YS50b0xvd2VyQ2FzZSgpO3ZhciBmPW51bGw7aWYoKGY9bi5pbmRleE9mKHQpKT49MClyZXR1cm4gdGhpcy5kaXNwYXRjaChcIltDSVJDVUxBUjpcIitmK1wiXVwiKTtpZihuLnB1c2godCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkmJmkuaXNCdWZmZXImJmkuaXNCdWZmZXIodCkpcmV0dXJuIHIoXCJidWZmZXI6XCIpLHIodCk7aWYoXCJvYmplY3RcIj09PWF8fFwiZnVuY3Rpb25cIj09PWEpe3ZhciBzPU9iamVjdC5rZXlzKHQpLnNvcnQoKTtlLnJlc3BlY3RUeXBlPT09ITF8fHAodCl8fHMuc3BsaWNlKDAsMCxcInByb3RvdHlwZVwiLFwiX19wcm90b19fXCIsXCJjb25zdHJ1Y3RvclwiKSxlLmV4Y2x1ZGVLZXlzJiYocz1zLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hZS5leGNsdWRlS2V5cyh0KX0pKSxyKFwib2JqZWN0OlwiK3MubGVuZ3RoK1wiOlwiKTt2YXIgYz10aGlzO3JldHVybiBzLmZvckVhY2goZnVuY3Rpb24obil7Yy5kaXNwYXRjaChuKSxyKFwiOlwiKSxlLmV4Y2x1ZGVWYWx1ZXN8fGMuZGlzcGF0Y2godFtuXSkscihcIixcIil9KX1pZighdGhpc1tcIl9cIithXSl7aWYoZS5pZ25vcmVVbmtub3duKXJldHVybiByKFwiW1wiK2ErXCJdXCIpO3Rocm93IG5ldyBFcnJvcignVW5rbm93biBvYmplY3QgdHlwZSBcIicrYSsnXCInKX10aGlzW1wiX1wiK2FdKHQpfSxfYXJyYXk6ZnVuY3Rpb24odCxvKXtvPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBvP286ZS51bm9yZGVyZWRBcnJheXMhPT0hMTt2YXIgaT10aGlzO2lmKHIoXCJhcnJheTpcIit0Lmxlbmd0aCtcIjpcIiksIW98fHQubGVuZ3RoPD0xKXJldHVybiB0LmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGkuZGlzcGF0Y2goZSl9KTt2YXIgdT1bXSxhPXQubWFwKGZ1bmN0aW9uKHQpe3ZhciByPW5ldyB3LG89bi5zbGljZSgpLGk9ZyhlLHIsbyk7cmV0dXJuIGkuZGlzcGF0Y2godCksdT11LmNvbmNhdChvLnNsaWNlKG4ubGVuZ3RoKSksci5yZWFkKCkudG9TdHJpbmcoKX0pO3JldHVybiBuPW4uY29uY2F0KHUpLGEuc29ydCgpLHRoaXMuX2FycmF5KGEsITEpfSxfZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImRhdGU6XCIrZS50b0pTT04oKSl9LF9zeW1ib2w6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJzeW1ib2w6XCIrZS50b1N0cmluZygpKX0sX2Vycm9yOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZXJyb3I6XCIrZS50b1N0cmluZygpKX0sX2Jvb2xlYW46ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJib29sOlwiK2UudG9TdHJpbmcoKSl9LF9zdHJpbmc6ZnVuY3Rpb24oZSl7cihcInN0cmluZzpcIitlLmxlbmd0aCtcIjpcIikscihlKX0sX2Z1bmN0aW9uOmZ1bmN0aW9uKHQpe3IoXCJmbjpcIikscCh0KT90aGlzLmRpc3BhdGNoKFwiW25hdGl2ZV1cIik6dGhpcy5kaXNwYXRjaCh0LnRvU3RyaW5nKCkpLGUucmVzcGVjdEZ1bmN0aW9uTmFtZXMhPT0hMSYmdGhpcy5kaXNwYXRjaChcImZ1bmN0aW9uLW5hbWU6XCIrU3RyaW5nKHQubmFtZSkpLGUucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcyYmdGhpcy5fb2JqZWN0KHQpfSxfbnVtYmVyOmZ1bmN0aW9uKGUpe3JldHVybiByKFwibnVtYmVyOlwiK2UudG9TdHJpbmcoKSl9LF94bWw6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ4bWw6XCIrZS50b1N0cmluZygpKX0sX251bGw6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIk51bGxcIil9LF91bmRlZmluZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIlVuZGVmaW5lZFwiKX0sX3JlZ2V4cDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInJlZ2V4OlwiK2UudG9TdHJpbmcoKSl9LF91aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDhhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50OGNsYW1wZWRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4Y2xhbXBlZGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDE2YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MTZhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfZmxvYXQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZmxvYXQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0NjRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImZsb2F0NjRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9hcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImFycmF5YnVmZmVyOlwiKSx0aGlzLmRpc3BhdGNoKG5ldyBVaW50OEFycmF5KGUpKX0sX3VybDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVybDpcIitlLnRvU3RyaW5nKCksXCJ1dGY4XCIpfSxfbWFwOmZ1bmN0aW9uKHQpe3IoXCJtYXA6XCIpO3ZhciBuPUFycmF5LmZyb20odCk7cmV0dXJuIHRoaXMuX2FycmF5KG4sZS51bm9yZGVyZWRTZXRzIT09ITEpfSxfc2V0OmZ1bmN0aW9uKHQpe3IoXCJzZXQ6XCIpO3ZhciBuPUFycmF5LmZyb20odCk7cmV0dXJuIHRoaXMuX2FycmF5KG4sZS51bm9yZGVyZWRTZXRzIT09ITEpfSxfYmxvYjpmdW5jdGlvbigpe2lmKGUuaWdub3JlVW5rbm93bilyZXR1cm4gcihcIltibG9iXVwiKTt0aHJvdyBFcnJvcignSGFzaGluZyBCbG9iIG9iamVjdHMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcXG4oc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wdWxlb3Mvb2JqZWN0LWhhc2gvaXNzdWVzLzI2KVxcblVzZSBcIm9wdGlvbnMucmVwbGFjZXJcIiBvciBcIm9wdGlvbnMuaWdub3JlVW5rbm93blwiXFxuJyl9LF9kb213aW5kb3c6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImRvbXdpbmRvd1wiKX0sX3Byb2Nlc3M6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInByb2Nlc3NcIil9LF90aW1lcjpmdW5jdGlvbigpe3JldHVybiByKFwidGltZXJcIil9LF9waXBlOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJwaXBlXCIpfSxfdGNwOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ0Y3BcIil9LF91ZHA6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInVkcFwiKX0sX3R0eTpmdW5jdGlvbigpe3JldHVybiByKFwidHR5XCIpfSxfc3RhdHdhdGNoZXI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInN0YXR3YXRjaGVyXCIpfSxfc2VjdXJlY29udGV4dDpmdW5jdGlvbigpe3JldHVybiByKFwic2VjdXJlY29udGV4dFwiKX0sX2Nvbm5lY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gcihcImNvbm5lY3Rpb25cIil9LF96bGliOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ6bGliXCIpfSxfY29udGV4dDpmdW5jdGlvbigpe3JldHVybiByKFwiY29udGV4dFwiKX0sX25vZGVzY3JpcHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIm5vZGVzY3JpcHRcIil9LF9odHRwcGFyc2VyOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJodHRwcGFyc2VyXCIpfSxfZGF0YXZpZXc6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImRhdGF2aWV3XCIpfSxfc2lnbmFsOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJzaWduYWxcIil9LF9mc2V2ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJmc2V2ZW50XCIpfSxfdGxzd3JhcDpmdW5jdGlvbigpe3JldHVybiByKFwidGxzd3JhcFwiKX19fWZ1bmN0aW9uIHcoKXtyZXR1cm57YnVmOlwiXCIsd3JpdGU6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LGVuZDpmdW5jdGlvbihlKXt0aGlzLmJ1Zis9ZX0scmVhZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJ1Zn19fXZhciBiPWUoXCJjcnlwdG9cIik7bj10LmV4cG9ydHM9ZCxuLnNoYTE9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSl9LG4ua2V5cz1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHtleGNsdWRlVmFsdWVzOiEwLGFsZ29yaXRobTpcInNoYTFcIixlbmNvZGluZzpcImhleFwifSl9LG4uTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCJ9KX0sbi5rZXlzTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCIsZXhjbHVkZVZhbHVlczohMH0pfTt2YXIgdj1iLmdldEhhc2hlcz9iLmdldEhhc2hlcygpLnNsaWNlKCk6W1wic2hhMVwiLFwibWQ1XCJdO3YucHVzaChcInBhc3N0aHJvdWdoXCIpO3ZhciBtPVtcImJ1ZmZlclwiLFwiaGV4XCIsXCJiaW5hcnlcIixcImJhc2U2NFwiXTtuLndyaXRlVG9TdHJlYW09ZnVuY3Rpb24oZSx0LG4pe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBuJiYobj10LHQ9e30pLHQ9aChlLHQpLGcodCxuKS5kaXNwYXRjaChlKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlXzE1ZjdlMjM1LmpzXCIsXCIvXCIpfSx7YnVmZmVyOjMsY3J5cHRvOjUsbFlwb0kyOjEwfV0sMjpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLHQscixvLGksdSxhLGYscyl7dmFyIGM9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7IWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQoZSl7dmFyIHQ9ZS5jaGFyQ29kZUF0KDApO3JldHVybiB0PT09aXx8dD09PWw/NjI6dD09PXV8fHQ9PT1kPzYzOnQ8YT8tMTp0PGErMTA/dC1hKzI2KzI2OnQ8cysyNj90LXM6dDxmKzI2P3QtZisyNjp2b2lkIDB9ZnVuY3Rpb24gbihlKXtmdW5jdGlvbiBuKGUpe3NbbCsrXT1lfXZhciByLGksdSxhLGYscztpZihlLmxlbmd0aCU0PjApdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNFwiKTt2YXIgYz1lLmxlbmd0aDtmPVwiPVwiPT09ZS5jaGFyQXQoYy0yKT8yOlwiPVwiPT09ZS5jaGFyQXQoYy0xKT8xOjAscz1uZXcgbygzKmUubGVuZ3RoLzQtZiksdT1mPjA/ZS5sZW5ndGgtNDplLmxlbmd0aDt2YXIgbD0wO2ZvcihyPTAsaT0wO3I8dTtyKz00LGkrPTMpYT10KGUuY2hhckF0KHIpKTw8MTh8dChlLmNoYXJBdChyKzEpKTw8MTJ8dChlLmNoYXJBdChyKzIpKTw8Nnx0KGUuY2hhckF0KHIrMykpLG4oKDE2NzExNjgwJmEpPj4xNiksbigoNjUyODAmYSk+PjgpLG4oMjU1JmEpO3JldHVybiAyPT09Zj8oYT10KGUuY2hhckF0KHIpKTw8Mnx0KGUuY2hhckF0KHIrMSkpPj40LG4oMjU1JmEpKToxPT09ZiYmKGE9dChlLmNoYXJBdChyKSk8PDEwfHQoZS5jaGFyQXQocisxKSk8PDR8dChlLmNoYXJBdChyKzIpKT4+MixuKGE+PjgmMjU1KSxuKDI1NSZhKSksc31mdW5jdGlvbiByKGUpe2Z1bmN0aW9uIHQoZSl7cmV0dXJuIGMuY2hhckF0KGUpfWZ1bmN0aW9uIG4oZSl7cmV0dXJuIHQoZT4+MTgmNjMpK3QoZT4+MTImNjMpK3QoZT4+NiY2MykrdCg2MyZlKX12YXIgcixvLGksdT1lLmxlbmd0aCUzLGE9XCJcIjtmb3Iocj0wLGk9ZS5sZW5ndGgtdTtyPGk7cis9MylvPShlW3JdPDwxNikrKGVbcisxXTw8OCkrZVtyKzJdLGErPW4obyk7c3dpdGNoKHUpe2Nhc2UgMTpvPWVbZS5sZW5ndGgtMV0sYSs9dChvPj4yKSxhKz10KG88PDQmNjMpLGErPVwiPT1cIjticmVhaztjYXNlIDI6bz0oZVtlLmxlbmd0aC0yXTw8OCkrZVtlLmxlbmd0aC0xXSxhKz10KG8+PjEwKSxhKz10KG8+PjQmNjMpLGErPXQobzw8MiY2MyksYSs9XCI9XCJ9cmV0dXJuIGF9dmFyIG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXk/VWludDhBcnJheTpBcnJheSxpPVwiK1wiLmNoYXJDb2RlQXQoMCksdT1cIi9cIi5jaGFyQ29kZUF0KDApLGE9XCIwXCIuY2hhckNvZGVBdCgwKSxmPVwiYVwiLmNoYXJDb2RlQXQoMCkscz1cIkFcIi5jaGFyQ29kZUF0KDApLGw9XCItXCIuY2hhckNvZGVBdCgwKSxkPVwiX1wiLmNoYXJDb2RlQXQoMCk7ZS50b0J5dGVBcnJheT1uLGUuZnJvbUJ5dGVBcnJheT1yfShcInVuZGVmaW5lZFwiPT10eXBlb2Ygbj90aGlzLmJhc2U2NGpzPXt9Om4pfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliXCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV0sMzpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbih0LHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbyhlLHQsbil7aWYoISh0aGlzIGluc3RhbmNlb2YgbykpcmV0dXJuIG5ldyBvKGUsdCxuKTt2YXIgcj10eXBlb2YgZTtpZihcImJhc2U2NFwiPT09dCYmXCJzdHJpbmdcIj09PXIpZm9yKGU9TihlKTtlLmxlbmd0aCU0IT09MDspZSs9XCI9XCI7dmFyIGk7aWYoXCJudW1iZXJcIj09PXIpaT1GKGUpO2Vsc2UgaWYoXCJzdHJpbmdcIj09PXIpaT1vLmJ5dGVMZW5ndGgoZSx0KTtlbHNle2lmKFwib2JqZWN0XCIhPT1yKXRocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuXCIpO2k9RihlLmxlbmd0aCl9dmFyIHU7by5fdXNlVHlwZWRBcnJheXM/dT1vLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGkpKToodT10aGlzLHUubGVuZ3RoPWksdS5faXNCdWZmZXI9ITApO3ZhciBhO2lmKG8uX3VzZVR5cGVkQXJyYXlzJiZcIm51bWJlclwiPT10eXBlb2YgZS5ieXRlTGVuZ3RoKXUuX3NldChlKTtlbHNlIGlmKE8oZSkpZm9yKGE9MDthPGk7YSsrKW8uaXNCdWZmZXIoZSk/dVthXT1lLnJlYWRVSW50OChhKTp1W2FdPWVbYV07ZWxzZSBpZihcInN0cmluZ1wiPT09cil1LndyaXRlKGUsMCx0KTtlbHNlIGlmKFwibnVtYmVyXCI9PT1yJiYhby5fdXNlVHlwZWRBcnJheXMmJiFuKWZvcihhPTA7YTxpO2ErKyl1W2FdPTA7cmV0dXJuIHV9ZnVuY3Rpb24gbChlLHQsbixyKXtuPU51bWJlcihuKXx8MDt2YXIgaT1lLmxlbmd0aC1uO3I/KHI9TnVtYmVyKHIpLHI+aSYmKHI9aSkpOnI9aTt2YXIgdT10Lmxlbmd0aDskKHUlMj09PTAsXCJJbnZhbGlkIGhleCBzdHJpbmdcIikscj51LzImJihyPXUvMik7Zm9yKHZhciBhPTA7YTxyO2ErKyl7dmFyIGY9cGFyc2VJbnQodC5zdWJzdHIoMiphLDIpLDE2KTskKCFpc05hTihmKSxcIkludmFsaWQgaGV4IHN0cmluZ1wiKSxlW24rYV09Zn1yZXR1cm4gby5fY2hhcnNXcml0dGVuPTIqYSxhfWZ1bmN0aW9uIGQoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoVih0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gaChlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhxKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiBwKGUsdCxuLHIpe3JldHVybiBoKGUsdCxuLHIpfWZ1bmN0aW9uIHkoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoUih0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gZyhlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhQKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiB3KGUsdCxuKXtyZXR1cm4gMD09PXQmJm49PT1lLmxlbmd0aD9HLmZyb21CeXRlQXJyYXkoZSk6Ry5mcm9tQnl0ZUFycmF5KGUuc2xpY2UodCxuKSl9ZnVuY3Rpb24gYihlLHQsbil7dmFyIHI9XCJcIixvPVwiXCI7bj1NYXRoLm1pbihlLmxlbmd0aCxuKTtmb3IodmFyIGk9dDtpPG47aSsrKWVbaV08PTEyNz8ocis9SihvKStTdHJpbmcuZnJvbUNoYXJDb2RlKGVbaV0pLG89XCJcIik6bys9XCIlXCIrZVtpXS50b1N0cmluZygxNik7cmV0dXJuIHIrSihvKX1mdW5jdGlvbiB2KGUsdCxuKXt2YXIgcj1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBvPXQ7bzxuO28rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbb10pO3JldHVybiByfWZ1bmN0aW9uIG0oZSx0LG4pe3JldHVybiB2KGUsdCxuKX1mdW5jdGlvbiBfKGUsdCxuKXt2YXIgcj1lLmxlbmd0aDsoIXR8fHQ8MCkmJih0PTApLCghbnx8bjwwfHxuPnIpJiYobj1yKTtmb3IodmFyIG89XCJcIixpPXQ7aTxuO2krKylvKz1IKGVbaV0pO3JldHVybiBvfWZ1bmN0aW9uIEUoZSx0LG4pe2Zvcih2YXIgcj1lLnNsaWNlKHQsbiksbz1cIlwiLGk9MDtpPHIubGVuZ3RoO2krPTIpbys9U3RyaW5nLmZyb21DaGFyQ29kZShyW2ldKzI1NipyW2krMV0pO3JldHVybiBvfWZ1bmN0aW9uIEkoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk7cmV0dXJuIG4/KGk9ZVt0XSx0KzE8byYmKGl8PWVbdCsxXTw8OCkpOihpPWVbdF08PDgsdCsxPG8mJihpfD1lW3QrMV0pKSxpfX1mdW5jdGlvbiBBKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpO3JldHVybiBuPyh0KzI8byYmKGk9ZVt0KzJdPDwxNiksdCsxPG8mJihpfD1lW3QrMV08PDgpLGl8PWVbdF0sdCszPG8mJihpKz1lW3QrM108PDI0Pj4+MCkpOih0KzE8byYmKGk9ZVt0KzFdPDwxNiksdCsyPG8mJihpfD1lW3QrMl08PDgpLHQrMzxvJiYoaXw9ZVt0KzNdKSxpKz1lW3RdPDwyND4+PjApLGl9fWZ1bmN0aW9uIEIoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk9SShlLHQsbiwhMCksdT0zMjc2OCZpO3JldHVybiB1Pyg2NTUzNS1pKzEpKi0xOml9fWZ1bmN0aW9uIEwoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk9QShlLHQsbiwhMCksdT0yMTQ3NDgzNjQ4Jmk7cmV0dXJuIHU/KDQyOTQ5NjcyOTUtaSsxKSotMTppfX1mdW5jdGlvbiBVKGUsdCxuLHIpe3JldHVybiByfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLFEucmVhZChlLHQsbiwyMyw0KX1mdW5jdGlvbiB4KGUsdCxuLHIpe3JldHVybiByfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodCs3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLFEucmVhZChlLHQsbiw1Miw4KX1mdW5jdGlvbiBTKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzE8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksSyh0LDY1NTM1KSk7dmFyIGk9ZS5sZW5ndGg7aWYoIShuPj1pKSlmb3IodmFyIHU9MCxhPU1hdGgubWluKGktbiwyKTt1PGE7dSsrKWVbbit1XT0odCYyNTU8PDgqKHI/dToxLXUpKT4+PjgqKHI/dToxLXUpfWZ1bmN0aW9uIEMoZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMzxlLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxLKHQsNDI5NDk2NzI5NSkpO3ZhciBpPWUubGVuZ3RoO2lmKCEobj49aSkpZm9yKHZhciB1PTAsYT1NYXRoLm1pbihpLW4sNCk7dTxhO3UrKyllW24rdV09dD4+PjgqKHI/dTozLXUpJjI1NX1mdW5jdGlvbiBqKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseih0LDMyNzY3LC0zMjc2OCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fCh0Pj0wP1MoZSx0LG4scixvKTpTKGUsNjU1MzUrdCsxLG4scixvKSl9ZnVuY3Rpb24gayhlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobiszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLHoodCwyMTQ3NDgzNjQ3LC0yMTQ3NDgzNjQ4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8KHQ+PTA/QyhlLHQsbixyLG8pOkMoZSw0Mjk0OTY3Mjk1K3QrMSxuLHIsbykpfWZ1bmN0aW9uIFQoZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxYKHQsMy40MDI4MjM0NjYzODUyODg2ZTM4LC0zLjQwMjgyMzQ2NjM4NTI4ODZlMzgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHxRLndyaXRlKGUsdCxuLHIsMjMsNCl9ZnVuY3Rpb24gTShlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobis3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFgodCwxLjc5NzY5MzEzNDg2MjMxNTdlMzA4LC0xLjc5NzY5MzEzNDg2MjMxNTdlMzA4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8US53cml0ZShlLHQsbixyLDUyLDgpfWZ1bmN0aW9uIE4oZSl7cmV0dXJuIGUudHJpbT9lLnRyaW0oKTplLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIil9ZnVuY3Rpb24gWShlLHQsbil7cmV0dXJuXCJudW1iZXJcIiE9dHlwZW9mIGU/bjooZT1+fmUsZT49dD90OmU+PTA/ZTooZSs9dCxlPj0wP2U6MCkpfWZ1bmN0aW9uIEYoZSl7cmV0dXJuIGU9fn5NYXRoLmNlaWwoK2UpLGU8MD8wOmV9ZnVuY3Rpb24gRChlKXtyZXR1cm4oQXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfSkoZSl9ZnVuY3Rpb24gTyhlKXtyZXR1cm4gRChlKXx8by5pc0J1ZmZlcihlKXx8ZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJlwibnVtYmVyXCI9PXR5cGVvZiBlLmxlbmd0aH1mdW5jdGlvbiBIKGUpe3JldHVybiBlPDE2P1wiMFwiK2UudG9TdHJpbmcoMTYpOmUudG9TdHJpbmcoMTYpfWZ1bmN0aW9uIFYoZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZS5jaGFyQ29kZUF0KG4pO2lmKHI8PTEyNyl0LnB1c2goZS5jaGFyQ29kZUF0KG4pKTtlbHNle3ZhciBvPW47cj49NTUyOTYmJnI8PTU3MzQzJiZuKys7Zm9yKHZhciBpPWVuY29kZVVSSUNvbXBvbmVudChlLnNsaWNlKG8sbisxKSkuc3Vic3RyKDEpLnNwbGl0KFwiJVwiKSx1PTA7dTxpLmxlbmd0aDt1KyspdC5wdXNoKHBhcnNlSW50KGlbdV0sMTYpKX19cmV0dXJuIHR9ZnVuY3Rpb24gcShlKXtmb3IodmFyIHQ9W10sbj0wO248ZS5sZW5ndGg7bisrKXQucHVzaCgyNTUmZS5jaGFyQ29kZUF0KG4pKTtyZXR1cm4gdH1mdW5jdGlvbiBQKGUpe2Zvcih2YXIgdCxuLHIsbz1bXSxpPTA7aTxlLmxlbmd0aDtpKyspdD1lLmNoYXJDb2RlQXQoaSksbj10Pj44LHI9dCUyNTYsby5wdXNoKHIpLG8ucHVzaChuKTtyZXR1cm4gb31mdW5jdGlvbiBSKGUpe3JldHVybiBHLnRvQnl0ZUFycmF5KGUpfWZ1bmN0aW9uIFcoZSx0LG4scil7Zm9yKHZhciBvPTA7bzxyJiYhKG8rbj49dC5sZW5ndGh8fG8+PWUubGVuZ3RoKTtvKyspdFtvK25dPWVbb107cmV0dXJuIG99ZnVuY3Rpb24gSihlKXt0cnl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlKX1jYXRjaCh0KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg2NTUzMyl9fWZ1bmN0aW9uIEsoZSx0KXskKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSwkKGU+PTAsXCJzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZVwiKSwkKGU8PXQsXCJ2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlXCIpLCQoTWF0aC5mbG9vcihlKT09PWUsXCJ2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudFwiKX1mdW5jdGlvbiB6KGUsdCxuKXskKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSwkKGU8PXQsXCJ2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcIiksJChlPj1uLFwidmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVwiKSwkKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24gWChlLHQsbil7JChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksJChlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLCQoZT49bixcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIil9ZnVuY3Rpb24gJChlLHQpe2lmKCFlKXRocm93IG5ldyBFcnJvcih0fHxcIkZhaWxlZCBhc3NlcnRpb25cIil9dmFyIEc9ZShcImJhc2U2NC1qc1wiKSxRPWUoXCJpZWVlNzU0XCIpO24uQnVmZmVyPW8sbi5TbG93QnVmZmVyPW8sbi5JTlNQRUNUX01BWF9CWVRFUz01MCxvLnBvb2xTaXplPTgxOTIsby5fdXNlVHlwZWRBcnJheXM9ZnVuY3Rpb24oKXt0cnl7dmFyIGU9bmV3IEFycmF5QnVmZmVyKDApLHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIHQuZm9vPWZ1bmN0aW9uKCl7cmV0dXJuIDQyfSw0Mj09PXQuZm9vKCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuc3ViYXJyYXl9Y2F0Y2gobil7cmV0dXJuITF9fSgpLG8uaXNFbmNvZGluZz1mdW5jdGlvbihlKXtzd2l0Y2goU3RyaW5nKGUpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOmNhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwiYmFzZTY0XCI6Y2FzZVwicmF3XCI6Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LG8uaXNCdWZmZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIShudWxsPT09ZXx8dm9pZCAwPT09ZXx8IWUuX2lzQnVmZmVyKX0sby5ieXRlTGVuZ3RoPWZ1bmN0aW9uKGUsdCl7dmFyIG47c3dpdGNoKGUrPVwiXCIsdHx8XCJ1dGY4XCIpe2Nhc2VcImhleFwiOm49ZS5sZW5ndGgvMjticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpuPVYoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwicmF3XCI6bj1lLmxlbmd0aDticmVhaztjYXNlXCJiYXNlNjRcIjpuPVIoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm49MiplLmxlbmd0aDticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG59LG8uY29uY2F0PWZ1bmN0aW9uKGUsdCl7aWYoJChEKGUpLFwiVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG5saXN0IHNob3VsZCBiZSBhbiBBcnJheS5cIiksMD09PWUubGVuZ3RoKXJldHVybiBuZXcgbygwKTtpZigxPT09ZS5sZW5ndGgpcmV0dXJuIGVbMF07dmFyIG47aWYoXCJudW1iZXJcIiE9dHlwZW9mIHQpZm9yKHQ9MCxuPTA7bjxlLmxlbmd0aDtuKyspdCs9ZVtuXS5sZW5ndGg7dmFyIHI9bmV3IG8odCksaT0wO2ZvcihuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciB1PWVbbl07dS5jb3B5KHIsaSksaSs9dS5sZW5ndGh9cmV0dXJuIHJ9LG8ucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIpe2lmKGlzRmluaXRlKHQpKWlzRmluaXRlKG4pfHwocj1uLG49dm9pZCAwKTtlbHNle3ZhciBvPXI7cj10LHQ9bixuPW99dD1OdW1iZXIodCl8fDA7dmFyIGk9dGhpcy5sZW5ndGgtdDtuPyhuPU51bWJlcihuKSxuPmkmJihuPWkpKTpuPWkscj1TdHJpbmcocnx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCk7dmFyIHU7c3dpdGNoKHIpe2Nhc2VcImhleFwiOnU9bCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjp1PWQodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYXNjaWlcIjp1PWgodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYmluYXJ5XCI6dT1wKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOnU9eSh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjp1PWcodGhpcyxlLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiB1fSxvLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbihlLHQsbil7dmFyIHI9dGhpcztpZihlPVN0cmluZyhlfHxcInV0ZjhcIikudG9Mb3dlckNhc2UoKSx0PU51bWJlcih0KXx8MCxuPXZvaWQgMCE9PW4/TnVtYmVyKG4pOm49ci5sZW5ndGgsbj09PXQpcmV0dXJuXCJcIjt2YXIgbztzd2l0Y2goZSl7Y2FzZVwiaGV4XCI6bz1fKHIsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpvPWIocix0LG4pO2JyZWFrO2Nhc2VcImFzY2lpXCI6bz12KHIsdCxuKTticmVhaztjYXNlXCJiaW5hcnlcIjpvPW0ocix0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm89dyhyLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6bz1FKHIsdCxuKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG99LG8ucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybnt0eXBlOlwiQnVmZmVyXCIsZGF0YTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnJ8fHRoaXMsMCl9fSxvLnByb3RvdHlwZS5jb3B5PWZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBpPXRoaXM7aWYobnx8KG49MCkscnx8MD09PXJ8fChyPXRoaXMubGVuZ3RoKSx0fHwodD0wKSxyIT09biYmMCE9PWUubGVuZ3RoJiYwIT09aS5sZW5ndGgpeyQocj49bixcInNvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0XCIpLCQodD49MCYmdDxlLmxlbmd0aCxcInRhcmdldFN0YXJ0IG91dCBvZiBib3VuZHNcIiksJChuPj0wJiZuPGkubGVuZ3RoLFwic291cmNlU3RhcnQgb3V0IG9mIGJvdW5kc1wiKSwkKHI+PTAmJnI8PWkubGVuZ3RoLFwic291cmNlRW5kIG91dCBvZiBib3VuZHNcIikscj50aGlzLmxlbmd0aCYmKHI9dGhpcy5sZW5ndGgpLGUubGVuZ3RoLXQ8ci1uJiYocj1lLmxlbmd0aC10K24pO3ZhciB1PXItbjtpZih1PDEwMHx8IW8uX3VzZVR5cGVkQXJyYXlzKWZvcih2YXIgYT0wO2E8dTthKyspZVthK3RdPXRoaXNbYStuXTtlbHNlIGUuX3NldCh0aGlzLnN1YmFycmF5KG4sbit1KSx0KX19LG8ucHJvdG90eXBlLnNsaWNlPWZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5sZW5ndGg7aWYoZT1ZKGUsbiwwKSx0PVkodCxuLG4pLG8uX3VzZVR5cGVkQXJyYXlzKXJldHVybiBvLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoZSx0KSk7Zm9yKHZhciByPXQtZSxpPW5ldyBvKHIsKHZvaWQgMCksKCEwKSksdT0wO3U8cjt1KyspaVt1XT10aGlzW3UrZV07cmV0dXJuIGl9LG8ucHJvdG90eXBlLmdldD1mdW5jdGlvbihlKXtyZXR1cm4gY29uc29sZS5sb2coXCIuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy5yZWFkVUludDgoZSl9LG8ucHJvdG90eXBlLnNldD1mdW5jdGlvbihlLHQpe3JldHVybiBjb25zb2xlLmxvZyhcIi5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLlwiKSx0aGlzLndyaXRlVUludDgoZSx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIG9mZnNldFwiKSwkKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpcmV0dXJuIHRoaXNbZV19LG8ucHJvdG90eXBlLnJlYWRVSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEkodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBBKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEludDg9ZnVuY3Rpb24oZSx0KXtpZih0fHwoJCh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQoZTx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGU+PXRoaXMubGVuZ3RoKSl7dmFyIG49MTI4JnRoaXNbZV07cmV0dXJuIG4/KDI1NS10aGlzW2VdKzEpKi0xOnRoaXNbZV19fSxvLnByb3RvdHlwZS5yZWFkSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBCKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZEludDE2QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQih0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBMKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEZsb2F0TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gVSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRGbG9hdEJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIFUodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkRG91YmxlTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4geCh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWREb3VibGVCRT1mdW5jdGlvbihlLHQpe3JldHVybiB4KHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUud3JpdGVVSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIHZhbHVlXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQ8dGhpcy5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksSyhlLDI1NSkpLHQ+PXRoaXMubGVuZ3RofHwodGhpc1t0XT1lKX0sby5wcm90b3R5cGUud3JpdGVVSW50MTZMRT1mdW5jdGlvbihlLHQsbil7Uyh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MTZCRT1mdW5jdGlvbihlLHQsbil7Uyh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MzJMRT1mdW5jdGlvbihlLHQsbil7Qyh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MzJCRT1mdW5jdGlvbihlLHQsbil7Qyh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoJCh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3NpbmcgdmFsdWVcIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodDx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSx6KGUsMTI3LC0xMjgpKSx0Pj10aGlzLmxlbmd0aHx8KGU+PTA/dGhpcy53cml0ZVVJbnQ4KGUsdCxuKTp0aGlzLndyaXRlVUludDgoMjU1K2UrMSx0LG4pKX0sby5wcm90b3R5cGUud3JpdGVJbnQxNkxFPWZ1bmN0aW9uKGUsdCxuKXtqKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe2oodGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlSW50MzJMRT1mdW5jdGlvbihlLHQsbil7ayh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxuKXtrKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZUZsb2F0TEU9ZnVuY3Rpb24oZSx0LG4pe1QodGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlRmxvYXRCRT1mdW5jdGlvbihlLHQsbil7VCh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVEb3VibGVMRT1mdW5jdGlvbihlLHQsbil7TSh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVEb3VibGVCRT1mdW5jdGlvbihlLHQsbil7TSh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUuZmlsbD1mdW5jdGlvbihlLHQsbil7aWYoZXx8KGU9MCksdHx8KHQ9MCksbnx8KG49dGhpcy5sZW5ndGgpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1lLmNoYXJDb2RlQXQoMCkpLCQoXCJudW1iZXJcIj09dHlwZW9mIGUmJiFpc05hTihlKSxcInZhbHVlIGlzIG5vdCBhIG51bWJlclwiKSwkKG4+PXQsXCJlbmQgPCBzdGFydFwiKSxuIT09dCYmMCE9PXRoaXMubGVuZ3RoKXskKHQ+PTAmJnQ8dGhpcy5sZW5ndGgsXCJzdGFydCBvdXQgb2YgYm91bmRzXCIpLCQobj49MCYmbjw9dGhpcy5sZW5ndGgsXCJlbmQgb3V0IG9mIGJvdW5kc1wiKTtmb3IodmFyIHI9dDtyPG47cisrKXRoaXNbcl09ZX19LG8ucHJvdG90eXBlLmluc3BlY3Q9ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD10aGlzLmxlbmd0aCxyPTA7cjx0O3IrKylpZihlW3JdPUgodGhpc1tyXSkscj09PW4uSU5TUEVDVF9NQVhfQllURVMpe2VbcisxXT1cIi4uLlwiO2JyZWFrfXJldHVyblwiPEJ1ZmZlciBcIitlLmpvaW4oXCIgXCIpK1wiPlwifSxvLnByb3RvdHlwZS50b0FycmF5QnVmZmVyPWZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXkpe2lmKG8uX3VzZVR5cGVkQXJyYXlzKXJldHVybiBuZXcgbyh0aGlzKS5idWZmZXI7Zm9yKHZhciBlPW5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKSx0PTAsbj1lLmxlbmd0aDt0PG47dCs9MSllW3RdPXRoaXNbdF07cmV0dXJuIGUuYnVmZmVyfXRocm93IG5ldyBFcnJvcihcIkJ1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpfTt2YXIgWj1vLnByb3RvdHlwZTtvLl9hdWdtZW50PWZ1bmN0aW9uKGUpe3JldHVybiBlLl9pc0J1ZmZlcj0hMCxlLl9nZXQ9ZS5nZXQsZS5fc2V0PWUuc2V0LGUuZ2V0PVouZ2V0LGUuc2V0PVouc2V0LGUud3JpdGU9Wi53cml0ZSxlLnRvU3RyaW5nPVoudG9TdHJpbmcsZS50b0xvY2FsZVN0cmluZz1aLnRvU3RyaW5nLGUudG9KU09OPVoudG9KU09OLGUuY29weT1aLmNvcHksZS5zbGljZT1aLnNsaWNlLGUucmVhZFVJbnQ4PVoucmVhZFVJbnQ4LGUucmVhZFVJbnQxNkxFPVoucmVhZFVJbnQxNkxFLGUucmVhZFVJbnQxNkJFPVoucmVhZFVJbnQxNkJFLGUucmVhZFVJbnQzMkxFPVoucmVhZFVJbnQzMkxFLGUucmVhZFVJbnQzMkJFPVoucmVhZFVJbnQzMkJFLGUucmVhZEludDg9Wi5yZWFkSW50OCxlLnJlYWRJbnQxNkxFPVoucmVhZEludDE2TEUsZS5yZWFkSW50MTZCRT1aLnJlYWRJbnQxNkJFLGUucmVhZEludDMyTEU9Wi5yZWFkSW50MzJMRSxlLnJlYWRJbnQzMkJFPVoucmVhZEludDMyQkUsZS5yZWFkRmxvYXRMRT1aLnJlYWRGbG9hdExFLGUucmVhZEZsb2F0QkU9Wi5yZWFkRmxvYXRCRSxlLnJlYWREb3VibGVMRT1aLnJlYWREb3VibGVMRSxlLnJlYWREb3VibGVCRT1aLnJlYWREb3VibGVCRSxlLndyaXRlVUludDg9Wi53cml0ZVVJbnQ4LGUud3JpdGVVSW50MTZMRT1aLndyaXRlVUludDE2TEUsZS53cml0ZVVJbnQxNkJFPVoud3JpdGVVSW50MTZCRSxlLndyaXRlVUludDMyTEU9Wi53cml0ZVVJbnQzMkxFLGUud3JpdGVVSW50MzJCRT1aLndyaXRlVUludDMyQkUsZS53cml0ZUludDg9Wi53cml0ZUludDgsZS53cml0ZUludDE2TEU9Wi53cml0ZUludDE2TEUsZS53cml0ZUludDE2QkU9Wi53cml0ZUludDE2QkUsZS53cml0ZUludDMyTEU9Wi53cml0ZUludDMyTEUsZS53cml0ZUludDMyQkU9Wi53cml0ZUludDMyQkUsZS53cml0ZUZsb2F0TEU9Wi53cml0ZUZsb2F0TEUsZS53cml0ZUZsb2F0QkU9Wi53cml0ZUZsb2F0QkUsZS53cml0ZURvdWJsZUxFPVoud3JpdGVEb3VibGVMRSxlLndyaXRlRG91YmxlQkU9Wi53cml0ZURvdWJsZUJFLGUuZmlsbD1aLmZpbGwsZS5pbnNwZWN0PVouaW5zcGVjdCxlLnRvQXJyYXlCdWZmZXI9Wi50b0FycmF5QnVmZmVyLGV9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpfSx7XCJiYXNlNjQtanNcIjoyLGJ1ZmZlcjozLGllZWU3NTQ6MTEsbFlwb0kyOjEwfV0sNDpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2lmKGUubGVuZ3RoJXAhPT0wKXt2YXIgbj1lLmxlbmd0aCsocC1lLmxlbmd0aCVwKTtlPW8uY29uY2F0KFtlLHldLG4pfWZvcih2YXIgcj1bXSxpPXQ/ZS5yZWFkSW50MzJCRTplLnJlYWRJbnQzMkxFLHU9MDt1PGUubGVuZ3RoO3UrPXApci5wdXNoKGkuY2FsbChlLHUpKTtyZXR1cm4gcn1mdW5jdGlvbiBkKGUsdCxuKXtmb3IodmFyIHI9bmV3IG8odCksaT1uP3Iud3JpdGVJbnQzMkJFOnIud3JpdGVJbnQzMkxFLHU9MDt1PGUubGVuZ3RoO3UrKylpLmNhbGwocixlW3VdLDQqdSwhMCk7cmV0dXJuIHJ9ZnVuY3Rpb24gaChlLHQsbixyKXtvLmlzQnVmZmVyKGUpfHwoZT1uZXcgbyhlKSk7dmFyIGk9dChsKGUsciksZS5sZW5ndGgqZyk7cmV0dXJuIGQoaSxuLHIpfXZhciBvPWUoXCJidWZmZXJcIikuQnVmZmVyLHA9NCx5PW5ldyBvKHApO3kuZmlsbCgwKTt2YXIgZz04O3QuZXhwb3J0cz17aGFzaDpofX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2hlbHBlcnMuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDU6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCxyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0LG4pe28uaXNCdWZmZXIodCl8fCh0PW5ldyBvKHQpKSxvLmlzQnVmZmVyKG4pfHwobj1uZXcgbyhuKSksdC5sZW5ndGg+bT90PWUodCk6dC5sZW5ndGg8bSYmKHQ9by5jb25jYXQoW3QsX10sbSkpO2Zvcih2YXIgcj1uZXcgbyhtKSxpPW5ldyBvKG0pLHU9MDt1PG07dSsrKXJbdV09NTRedFt1XSxpW3VdPTkyXnRbdV07dmFyIGE9ZShvLmNvbmNhdChbcixuXSkpO3JldHVybiBlKG8uY29uY2F0KFtpLGFdKSl9ZnVuY3Rpb24gZChlLHQpe2U9ZXx8XCJzaGExXCI7dmFyIG49dltlXSxyPVtdLGk9MDtyZXR1cm4gbnx8aChcImFsZ29yaXRobTpcIixlLFwiaXMgbm90IHlldCBzdXBwb3J0ZWRcIikse3VwZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gby5pc0J1ZmZlcihlKXx8KGU9bmV3IG8oZSkpLHIucHVzaChlKSxpKz1lLmxlbmd0aCx0aGlzfSxkaWdlc3Q6ZnVuY3Rpb24oZSl7dmFyIGk9by5jb25jYXQociksdT10P2wobix0LGkpOm4oaSk7cmV0dXJuIHI9bnVsbCxlP3UudG9TdHJpbmcoZSk6dX19fWZ1bmN0aW9uIGgoKXt2YXIgZT1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbihcIiBcIik7dGhyb3cgbmV3IEVycm9yKFtlLFwid2UgYWNjZXB0IHB1bGwgcmVxdWVzdHNcIixcImh0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5XCJdLmpvaW4oXCJcXG5cIikpfWZ1bmN0aW9uIHAoZSx0KXtmb3IodmFyIG4gaW4gZSl0KGVbbl0sbil9dmFyIG89ZShcImJ1ZmZlclwiKS5CdWZmZXIseT1lKFwiLi9zaGFcIiksZz1lKFwiLi9zaGEyNTZcIiksdz1lKFwiLi9ybmdcIiksYj1lKFwiLi9tZDVcIiksdj17c2hhMTp5LHNoYTI1NjpnLG1kNTpifSxtPTY0LF89bmV3IG8obSk7Xy5maWxsKDApLG4uY3JlYXRlSGFzaD1mdW5jdGlvbihlKXtyZXR1cm4gZChlKX0sbi5jcmVhdGVIbWFjPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGQoZSx0KX0sbi5yYW5kb21CeXRlcz1mdW5jdGlvbihlLHQpe2lmKCF0fHwhdC5jYWxsKXJldHVybiBuZXcgbyh3KGUpKTt0cnl7dC5jYWxsKHRoaXMsdm9pZCAwLG5ldyBvKHcoZSkpKX1jYXRjaChuKXt0KG4pfX0scChbXCJjcmVhdGVDcmVkZW50aWFsc1wiLFwiY3JlYXRlQ2lwaGVyXCIsXCJjcmVhdGVDaXBoZXJpdlwiLFwiY3JlYXRlRGVjaXBoZXJcIixcImNyZWF0ZURlY2lwaGVyaXZcIixcImNyZWF0ZVNpZ25cIixcImNyZWF0ZVZlcmlmeVwiLFwiY3JlYXRlRGlmZmllSGVsbG1hblwiLFwicGJrZGYyXCJdLGZ1bmN0aW9uKGUpe25bZV09ZnVuY3Rpb24oKXtoKFwic29ycnksXCIsZSxcImlzIG5vdCBpbXBsZW1lbnRlZCB5ZXRcIil9fSl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL21kNVwiOjYsXCIuL3JuZ1wiOjcsXCIuL3NoYVwiOjgsXCIuL3NoYTI1NlwiOjksYnVmZmVyOjMsbFlwb0kyOjEwfV0sNjpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2VbdD4+NV18PTEyODw8dCUzMixlWyh0KzY0Pj4+OTw8NCkrMTRdPXQ7Zm9yKHZhciBuPTE3MzI1ODQxOTMscj0tMjcxNzMzODc5LG89LTE3MzI1ODQxOTQsaT0yNzE3MzM4NzgsdT0wO3U8ZS5sZW5ndGg7dSs9MTYpe3ZhciBhPW4sZj1yLHM9byxjPWk7bj1oKG4scixvLGksZVt1KzBdLDcsLTY4MDg3NjkzNiksaT1oKGksbixyLG8sZVt1KzFdLDEyLC0zODk1NjQ1ODYpLG89aChvLGksbixyLGVbdSsyXSwxNyw2MDYxMDU4MTkpLHI9aChyLG8saSxuLGVbdSszXSwyMiwtMTA0NDUyNTMzMCksbj1oKG4scixvLGksZVt1KzRdLDcsLTE3NjQxODg5NyksaT1oKGksbixyLG8sZVt1KzVdLDEyLDEyMDAwODA0MjYpLG89aChvLGksbixyLGVbdSs2XSwxNywtMTQ3MzIzMTM0MSkscj1oKHIsbyxpLG4sZVt1KzddLDIyLC00NTcwNTk4Myksbj1oKG4scixvLGksZVt1KzhdLDcsMTc3MDAzNTQxNiksaT1oKGksbixyLG8sZVt1KzldLDEyLC0xOTU4NDE0NDE3KSxvPWgobyxpLG4scixlW3UrMTBdLDE3LC00MjA2Mykscj1oKHIsbyxpLG4sZVt1KzExXSwyMiwtMTk5MDQwNDE2Miksbj1oKG4scixvLGksZVt1KzEyXSw3LDE4MDQ2MDM2ODIpLGk9aChpLG4scixvLGVbdSsxM10sMTIsLTQwMzQxMTAxKSxvPWgobyxpLG4scixlW3UrMTRdLDE3LC0xNTAyMDAyMjkwKSxyPWgocixvLGksbixlW3UrMTVdLDIyLDEyMzY1MzUzMjkpLG49cChuLHIsbyxpLGVbdSsxXSw1LC0xNjU3OTY1MTApLGk9cChpLG4scixvLGVbdSs2XSw5LC0xMDY5NTAxNjMyKSxvPXAobyxpLG4scixlW3UrMTFdLDE0LDY0MzcxNzcxMykscj1wKHIsbyxpLG4sZVt1KzBdLDIwLC0zNzM4OTczMDIpLG49cChuLHIsbyxpLGVbdSs1XSw1LC03MDE1NTg2OTEpLGk9cChpLG4scixvLGVbdSsxMF0sOSwzODAxNjA4Myksbz1wKG8saSxuLHIsZVt1KzE1XSwxNCwtNjYwNDc4MzM1KSxyPXAocixvLGksbixlW3UrNF0sMjAsLTQwNTUzNzg0OCksbj1wKG4scixvLGksZVt1KzldLDUsNTY4NDQ2NDM4KSxpPXAoaSxuLHIsbyxlW3UrMTRdLDksLTEwMTk4MDM2OTApLG89cChvLGksbixyLGVbdSszXSwxNCwtMTg3MzYzOTYxKSxyPXAocixvLGksbixlW3UrOF0sMjAsMTE2MzUzMTUwMSksbj1wKG4scixvLGksZVt1KzEzXSw1LC0xNDQ0NjgxNDY3KSxpPXAoaSxuLHIsbyxlW3UrMl0sOSwtNTE0MDM3ODQpLG89cChvLGksbixyLGVbdSs3XSwxNCwxNzM1MzI4NDczKSxyPXAocixvLGksbixlW3UrMTJdLDIwLC0xOTI2NjA3NzM0KSxuPXkobixyLG8saSxlW3UrNV0sNCwtMzc4NTU4KSxpPXkoaSxuLHIsbyxlW3UrOF0sMTEsLTIwMjI1NzQ0NjMpLG89eShvLGksbixyLGVbdSsxMV0sMTYsMTgzOTAzMDU2Mikscj15KHIsbyxpLG4sZVt1KzE0XSwyMywtMzUzMDk1NTYpLG49eShuLHIsbyxpLGVbdSsxXSw0LC0xNTMwOTkyMDYwKSxpPXkoaSxuLHIsbyxlW3UrNF0sMTEsMTI3Mjg5MzM1Myksbz15KG8saSxuLHIsZVt1KzddLDE2LC0xNTU0OTc2MzIpLHI9eShyLG8saSxuLGVbdSsxMF0sMjMsLTEwOTQ3MzA2NDApLG49eShuLHIsbyxpLGVbdSsxM10sNCw2ODEyNzkxNzQpLGk9eShpLG4scixvLGVbdSswXSwxMSwtMzU4NTM3MjIyKSxvPXkobyxpLG4scixlW3UrM10sMTYsLTcyMjUyMTk3OSkscj15KHIsbyxpLG4sZVt1KzZdLDIzLDc2MDI5MTg5KSxuPXkobixyLG8saSxlW3UrOV0sNCwtNjQwMzY0NDg3KSxpPXkoaSxuLHIsbyxlW3UrMTJdLDExLC00MjE4MTU4MzUpLG89eShvLGksbixyLGVbdSsxNV0sMTYsNTMwNzQyNTIwKSxyPXkocixvLGksbixlW3UrMl0sMjMsLTk5NTMzODY1MSksbj1nKG4scixvLGksZVt1KzBdLDYsLTE5ODYzMDg0NCksaT1nKGksbixyLG8sZVt1KzddLDEwLDExMjY4OTE0MTUpLG89ZyhvLGksbixyLGVbdSsxNF0sMTUsLTE0MTYzNTQ5MDUpLHI9ZyhyLG8saSxuLGVbdSs1XSwyMSwtNTc0MzQwNTUpLG49ZyhuLHIsbyxpLGVbdSsxMl0sNiwxNzAwNDg1NTcxKSxpPWcoaSxuLHIsbyxlW3UrM10sMTAsLTE4OTQ5ODY2MDYpLG89ZyhvLGksbixyLGVbdSsxMF0sMTUsLTEwNTE1MjMpLHI9ZyhyLG8saSxuLGVbdSsxXSwyMSwtMjA1NDkyMjc5OSksbj1nKG4scixvLGksZVt1KzhdLDYsMTg3MzMxMzM1OSksaT1nKGksbixyLG8sZVt1KzE1XSwxMCwtMzA2MTE3NDQpLG89ZyhvLGksbixyLGVbdSs2XSwxNSwtMTU2MDE5ODM4MCkscj1nKHIsbyxpLG4sZVt1KzEzXSwyMSwxMzA5MTUxNjQ5KSxuPWcobixyLG8saSxlW3UrNF0sNiwtMTQ1NTIzMDcwKSxpPWcoaSxuLHIsbyxlW3UrMTFdLDEwLC0xMTIwMjEwMzc5KSxvPWcobyxpLG4scixlW3UrMl0sMTUsNzE4Nzg3MjU5KSxyPWcocixvLGksbixlW3UrOV0sMjEsLTM0MzQ4NTU1MSksbj13KG4sYSkscj13KHIsZiksbz13KG8scyksaT13KGksYyl9cmV0dXJuIEFycmF5KG4scixvLGkpfWZ1bmN0aW9uIGQoZSx0LG4scixvLGkpe3JldHVybiB3KGIodyh3KHQsZSksdyhyLGkpKSxvKSxuKX1mdW5jdGlvbiBoKGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKHQmbnx+dCZyLGUsdCxvLGksdSl9ZnVuY3Rpb24gcChlLHQsbixyLG8saSx1KXtyZXR1cm4gZCh0JnJ8biZ+cixlLHQsbyxpLHUpfWZ1bmN0aW9uIHkoZSx0LG4scixvLGksdSl7cmV0dXJuIGQodF5uXnIsZSx0LG8saSx1KX1mdW5jdGlvbiBnKGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKG5eKHR8fnIpLGUsdCxvLGksdSl9ZnVuY3Rpb24gdyhlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn1mdW5jdGlvbiBiKGUsdCl7cmV0dXJuIGU8PHR8ZT4+PjMyLXR9dmFyIHY9ZShcIi4vaGVscGVyc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHYuaGFzaChlLGwsMTYpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L21kNS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDc6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSxuLHIsbyxpLHUsYSxmLHMpeyFmdW5jdGlvbigpe3ZhciBlLG4scj10aGlzO2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHQsbj1uZXcgQXJyYXkoZSkscj0wO3I8ZTtyKyspMD09KDMmcikmJih0PTQyOTQ5NjcyOTYqTWF0aC5yYW5kb20oKSksbltyXT10Pj4+KCgzJnIpPDwzKSYyNTU7cmV0dXJuIG59LHIuY3J5cHRvJiZjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzJiYobj1mdW5jdGlvbihlKXt2YXIgdD1uZXcgVWludDhBcnJheShlKTtyZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh0KSx0fSksdC5leHBvcnRzPW58fGV9KCl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9ybmcuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDg6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtlW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsodCs2ND4+OTw8NCkrMTVdPXQ7Zm9yKHZhciBuPUFycmF5KDgwKSxyPTE3MzI1ODQxOTMsbz0tMjcxNzMzODc5LGk9LTE3MzI1ODQxOTQsdT0yNzE3MzM4NzgsYT0tMTAwOTU4OTc3NixmPTA7ZjxlLmxlbmd0aDtmKz0xNil7Zm9yKHZhciBzPXIsYz1vLGw9aSxnPXUsdz1hLGI9MDtiPDgwO2IrKyl7YjwxNj9uW2JdPWVbZitiXTpuW2JdPXkobltiLTNdXm5bYi04XV5uW2ItMTRdXm5bYi0xNl0sMSk7dmFyIHY9cChwKHkociw1KSxkKGIsbyxpLHUpKSxwKHAoYSxuW2JdKSxoKGIpKSk7YT11LHU9aSxpPXkobywzMCksbz1yLHI9dn1yPXAocixzKSxvPXAobyxjKSxpPXAoaSxsKSx1PXAodSxnKSxhPXAoYSx3KX1yZXR1cm4gQXJyYXkocixvLGksdSxhKX1mdW5jdGlvbiBkKGUsdCxuLHIpe3JldHVybiBlPDIwP3Qmbnx+dCZyOmU8NDA/dF5uXnI6ZTw2MD90Jm58dCZyfG4mcjp0Xm5ecn1mdW5jdGlvbiBoKGUpe3JldHVybiBlPDIwPzE1MTg1MDAyNDk6ZTw0MD8xODU5Nzc1MzkzOmU8NjA/LTE4OTQwMDc1ODg6LTg5OTQ5NzUxNH1mdW5jdGlvbiBwKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufWZ1bmN0aW9uIHkoZSx0KXtyZXR1cm4gZTw8dHxlPj4+MzItdH12YXIgZz1lKFwiLi9oZWxwZXJzXCIpO3QuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4gZy5oYXNoKGUsbCwyMCwhMCl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjEwfV0sOTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7dmFyIGw9ZShcIi4vaGVscGVyc1wiKSxkPWZ1bmN0aW9uKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufSxoPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fGU8PDMyLXR9LHA9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+PnR9LHk9ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlJnRefmUmbn0sZz1mdW5jdGlvbihlLHQsbil7cmV0dXJuIGUmdF5lJm5edCZufSx3PWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsMileaChlLDEzKV5oKGUsMjIpfSxiPWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsNileaChlLDExKV5oKGUsMjUpfSx2PWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsNyleaChlLDE4KV5wKGUsMyk7XG59LG09ZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSwxNyleaChlLDE5KV5wKGUsMTApfSxfPWZ1bmN0aW9uKGUsdCl7dmFyIG4scixvLGksdSxhLGYscyxjLGwsaCxwLF89bmV3IEFycmF5KDExMTYzNTI0MDgsMTg5OTQ0NzQ0MSwzMDQ5MzIzNDcxLDM5MjEwMDk1NzMsOTYxOTg3MTYzLDE1MDg5NzA5OTMsMjQ1MzYzNTc0OCwyODcwNzYzMjIxLDM2MjQzODEwODAsMzEwNTk4NDAxLDYwNzIyNTI3OCwxNDI2ODgxOTg3LDE5MjUwNzgzODgsMjE2MjA3ODIwNiwyNjE0ODg4MTAzLDMyNDgyMjI1ODAsMzgzNTM5MDQwMSw0MDIyMjI0Nzc0LDI2NDM0NzA3OCw2MDQ4MDc2MjgsNzcwMjU1OTgzLDEyNDkxNTAxMjIsMTU1NTA4MTY5MiwxOTk2MDY0OTg2LDI1NTQyMjA4ODIsMjgyMTgzNDM0OSwyOTUyOTk2ODA4LDMyMTAzMTM2NzEsMzMzNjU3MTg5MSwzNTg0NTI4NzExLDExMzkyNjk5MywzMzgyNDE4OTUsNjY2MzA3MjA1LDc3MzUyOTkxMiwxMjk0NzU3MzcyLDEzOTYxODIyOTEsMTY5NTE4MzcwMCwxOTg2NjYxMDUxLDIxNzcwMjYzNTAsMjQ1Njk1NjAzNywyNzMwNDg1OTIxLDI4MjAzMDI0MTEsMzI1OTczMDgwMCwzMzQ1NzY0NzcxLDM1MTYwNjU4MTcsMzYwMDM1MjgwNCw0MDk0NTcxOTA5LDI3NTQyMzM0NCw0MzAyMjc3MzQsNTA2OTQ4NjE2LDY1OTA2MDU1Niw4ODM5OTc4NzcsOTU4MTM5NTcxLDEzMjI4MjIyMTgsMTUzNzAwMjA2MywxNzQ3ODczNzc5LDE5NTU1NjIyMjIsMjAyNDEwNDgxNSwyMjI3NzMwNDUyLDIzNjE4NTI0MjQsMjQyODQzNjQ3NCwyNzU2NzM0MTg3LDMyMDQwMzE0NzksMzMyOTMyNTI5OCksRT1uZXcgQXJyYXkoMTc3OTAzMzcwMywzMTQ0MTM0Mjc3LDEwMTM5MDQyNDIsMjc3MzQ4MDc2MiwxMzU5ODkzMTE5LDI2MDA4MjI5MjQsNTI4NzM0NjM1LDE1NDE0NTkyMjUpLEk9bmV3IEFycmF5KDY0KTtlW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsodCs2ND4+OTw8NCkrMTVdPXQ7Zm9yKHZhciBjPTA7YzxlLmxlbmd0aDtjKz0xNil7bj1FWzBdLHI9RVsxXSxvPUVbMl0saT1FWzNdLHU9RVs0XSxhPUVbNV0sZj1FWzZdLHM9RVs3XTtmb3IodmFyIGw9MDtsPDY0O2wrKylsPDE2P0lbbF09ZVtsK2NdOklbbF09ZChkKGQobShJW2wtMl0pLElbbC03XSksdihJW2wtMTVdKSksSVtsLTE2XSksaD1kKGQoZChkKHMsYih1KSkseSh1LGEsZikpLF9bbF0pLElbbF0pLHA9ZCh3KG4pLGcobixyLG8pKSxzPWYsZj1hLGE9dSx1PWQoaSxoKSxpPW8sbz1yLHI9bixuPWQoaCxwKTtFWzBdPWQobixFWzBdKSxFWzFdPWQocixFWzFdKSxFWzJdPWQobyxFWzJdKSxFWzNdPWQoaSxFWzNdKSxFWzRdPWQodSxFWzRdKSxFWzVdPWQoYSxFWzVdKSxFWzZdPWQoZixFWzZdKSxFWzddPWQocyxFWzddKX1yZXR1cm4gRX07dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBsLmhhc2goZSxfLDMyLCEwKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSwxMDpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLG4scixvLGksdSxhLGYscyl7ZnVuY3Rpb24gYygpe312YXIgZT10LmV4cG9ydHM9e307ZS5uZXh0VGljaz1mdW5jdGlvbigpe3ZhciBlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5zZXRJbW1lZGlhdGUsdD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cucG9zdE1lc3NhZ2UmJndpbmRvdy5hZGRFdmVudExpc3RlbmVyO2lmKGUpcmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGUpfTtpZih0KXt2YXIgbj1bXTtyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zb3VyY2U7aWYoKHQ9PT13aW5kb3d8fG51bGw9PT10KSYmXCJwcm9jZXNzLXRpY2tcIj09PWUuZGF0YSYmKGUuc3RvcFByb3BhZ2F0aW9uKCksbi5sZW5ndGg+MCkpe3ZhciByPW4uc2hpZnQoKTtyKCl9fSwhMCksZnVuY3Rpb24oZSl7bi5wdXNoKGUpLHdpbmRvdy5wb3N0TWVzc2FnZShcInByb2Nlc3MtdGlja1wiLFwiKlwiKX19cmV0dXJuIGZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoZSwwKX19KCksZS50aXRsZT1cImJyb3dzZXJcIixlLmJyb3dzZXI9ITAsZS5lbnY9e30sZS5hcmd2PVtdLGUub249YyxlLmFkZExpc3RlbmVyPWMsZS5vbmNlPWMsZS5vZmY9YyxlLnJlbW92ZUxpc3RlbmVyPWMsZS5yZW1vdmVBbGxMaXN0ZW5lcnM9YyxlLmVtaXQ9YyxlLmJpbmRpbmc9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIil9LGUuY3dkPWZ1bmN0aW9uKCl7cmV0dXJuXCIvXCJ9LGUuY2hkaXI9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkXCIpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3NcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSwxMTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLHQscixvLGksdSxhLGYscyl7bi5yZWFkPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIGksdSxhPTgqby1yLTEsZj0oMTw8YSktMSxzPWY+PjEsYz0tNyxsPW4/by0xOjAsZD1uPy0xOjEsaD1lW3QrbF07Zm9yKGwrPWQsaT1oJigxPDwtYyktMSxoPj49LWMsYys9YTtjPjA7aT0yNTYqaStlW3QrbF0sbCs9ZCxjLT04KTtmb3IodT1pJigxPDwtYyktMSxpPj49LWMsYys9cjtjPjA7dT0yNTYqdStlW3QrbF0sbCs9ZCxjLT04KTtpZigwPT09aSlpPTEtcztlbHNle2lmKGk9PT1mKXJldHVybiB1P05hTjooaD8tMToxKSooMS8wKTt1Kz1NYXRoLnBvdygyLHIpLGktPXN9cmV0dXJuKGg/LTE6MSkqdSpNYXRoLnBvdygyLGktcil9LG4ud3JpdGU9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciB1LGEsZixzPTgqaS1vLTEsYz0oMTw8cyktMSxsPWM+PjEsZD0yMz09PW8/TWF0aC5wb3coMiwtMjQpLU1hdGgucG93KDIsLTc3KTowLGg9cj8wOmktMSxwPXI/MTotMSx5PXQ8MHx8MD09PXQmJjEvdDwwPzE6MDtmb3IodD1NYXRoLmFicyh0KSxpc05hTih0KXx8dD09PTEvMD8oYT1pc05hTih0KT8xOjAsdT1jKToodT1NYXRoLmZsb29yKE1hdGgubG9nKHQpL01hdGguTE4yKSx0KihmPU1hdGgucG93KDIsLXUpKTwxJiYodS0tLGYqPTIpLHQrPXUrbD49MT9kL2Y6ZCpNYXRoLnBvdygyLDEtbCksdCpmPj0yJiYodSsrLGYvPTIpLHUrbD49Yz8oYT0wLHU9Yyk6dStsPj0xPyhhPSh0KmYtMSkqTWF0aC5wb3coMixvKSx1Kz1sKTooYT10Kk1hdGgucG93KDIsbC0xKSpNYXRoLnBvdygyLG8pLHU9MCkpO28+PTg7ZVtuK2hdPTI1NSZhLGgrPXAsYS89MjU2LG8tPTgpO2Zvcih1PXU8PG98YSxzKz1vO3M+MDtlW24raF09MjU1JnUsaCs9cCx1Lz0yNTYscy09OCk7ZVtuK2gtcF18PTEyOCp5fX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2llZWU3NTRcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XX0se30sWzFdKSgxKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL29iamVjdC1oYXNoL2Rpc3Qvb2JqZWN0X2hhc2guanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gXCIuL2RvbVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9pc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zdHJpbmdcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcmVmbGVjdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi91cmxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbGlzdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zY3JvbGwtc3dpdGNoXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2V2ZW50XCI7XHJcbmV4cG9ydCBuYW1lc3BhY2UgVXRpbGl0eUNvbGxlY3Rpb24ge1xyXG5cdGNvbnN0IG5hbWU6IHN0cmluZyA9IFwiVXRpbGl0eUNvbGxlY3Rpb25cIjtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBVdGlsaXR5Q29sbGVjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvbWFpbi50cyIsImV4cG9ydCBuYW1lc3BhY2UgRG9tIHtcclxuXHRleHBvcnQgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKGVsZW1lbnQ6IE5vZGUsIHRhcmdldEVsZW1lbnQ6IE5vZGUpOiB2b2lkIHtcclxuXHRcdHRhcmdldEVsZW1lbnQucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZWxlbWVudCwgdGFyZ2V0RWxlbWVudCk7XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBpbnNlcnRBZnRlcihlbGVtZW50OiBOb2RlLCB0YXJnZXRFbGVtZW50OiBOb2RlKTogdm9pZCB7XHJcblx0XHRjb25zdCBwYXJlbnQgPSB0YXJnZXRFbGVtZW50LnBhcmVudE5vZGU7XHJcblx0XHRpZiAocGFyZW50Lmxhc3RDaGlsZCA9PT0gdGFyZ2V0RWxlbWVudCkge1xyXG5cdFx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHRhcmdldEVsZW1lbnQubmV4dFNpYmxpbmcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQ6IE5vZGUpOiB2b2lkIHtcclxuXHRcdGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpIHtcclxuXHRcdFx0ZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gaHRtbFRvTm9kZShodG1sOiBzdHJpbmcgfCBFbGVtZW50KTogTm9kZSB7XHJcblx0XHRpZiAoaHRtbCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuXHRcdFx0cmV0dXJuIGh0bWw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBub2RlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdG5vZGUuaW5uZXJIVE1MID0gaHRtbDtcclxuXHRcdFx0cmV0dXJuIG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gaHRtbFRvRWxlbWVudChodG1sOiBzdHJpbmcgfCBFbGVtZW50KTogSFRNTEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIGh0bWxUb05vZGUoaHRtbCkgYXMgSFRNTEVsZW1lbnQ7XHJcblx0fVxyXG5cdC8vIGF0cmlidXRlcyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoZWxlbWVudDogRWxlbWVudCB8IE5vZGUpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZzsgfSB7XHJcblx0XHRjb25zdCBhdHRycyA9IGVsZW1lbnQuYXR0cmlidXRlcztcclxuXHRcdGNvbnN0IG5ld0F0dHI6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nOyB9ID0ge307XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdG5ld0F0dHJbYXR0cnNbaV0ubmFtZV0gPSBhdHRyc1tpXS52YWx1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBuZXdBdHRyO1xyXG5cdH1cclxuXHJcblx0Ly8gTG9vcHMgZSBnaXJvcyBwZWxvIGRvbSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBjaGlsZEVsZW1lbnQobm9kZTogRWxlbWVudCwgZWFjaDogKG5vZGU6IEVsZW1lbnQpID0+IHZvaWQpOiB2b2lkIHtcclxuXHRcdGxldCBjaGlsZDogTm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcclxuXHRcdHdoaWxlIChjaGlsZCkge1xyXG5cdFx0XHRpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIHtcclxuXHRcdFx0XHRlYWNoKGNoaWxkIGFzIEVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNoaWxkID0gY2hpbGQubmV4dFNpYmxpbmc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBlbGVtZW50IGRvd24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRleHBvcnQgZnVuY3Rpb24gbm9kZURvd24obm9kZTogTm9kZSB8IE5vZGUsIGVhY2g6IChub2RlOiBOb2RlIHwgTm9kZSwgcGFyZW50PzogTm9kZSB8IE5vZGUpID0+IHZvaWQgfCBib29sZWFuKTogdm9pZCB7XHJcblx0XHRpZiAoZWFjaChub2RlLCB1bmRlZmluZWQpICE9PSBmYWxzZSkge1xyXG5cdFx0XHR0aGlzLmNoaWxkTm9kZURvd24obm9kZSwgZWFjaCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gY2hpbGROb2RlRG93bihub2RlOiBOb2RlLCBlYWNoOiAobm9kZTogTm9kZSwgcGFyZW50PzogTm9kZSkgPT4gdm9pZCB8IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdGNvbnN0IHBhcmVudDogTm9kZSA9IG5vZGU7XHJcblx0XHRsZXQgY2hpbGQ6IE5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XHJcblx0XHR3aGlsZSAoY2hpbGQpIHtcclxuXHRcdFx0Y29uc3QgZWFjaFJldHVybjogYm9vbGVhbiB8IHZvaWQgPSBlYWNoKGNoaWxkLCBwYXJlbnQpO1xyXG5cdFx0XHRpZiAoZWFjaFJldHVybiAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLmNoaWxkTm9kZURvd24oY2hpbGQsIGVhY2gpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNoaWxkID0gY2hpbGQubmV4dFNpYmxpbmc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gZWxlbWVudERvd24obm9kZTogRWxlbWVudCwgZWFjaDogKG5vZGU6IEVsZW1lbnQsIHBhcmVudD86IEVsZW1lbnQpID0+IHZvaWQgfCBib29sZWFuKTogdm9pZCB7XHJcblx0XHRpZiAoZWFjaChub2RlLCB1bmRlZmluZWQpICE9PSBmYWxzZSkge1xyXG5cdFx0XHR0aGlzLmNoaWxkRWxlbWVudERvd24obm9kZSwgZWFjaCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gY2hpbGRFbGVtZW50RG93bihub2RlOiBFbGVtZW50LCBlYWNoOiAobm9kZTogSFRNTEVsZW1lbnQsIHBhcmVudD86IEhUTUxFbGVtZW50KSA9PiB2b2lkIHwgYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0Y29uc3QgcGFyZW50OiBFbGVtZW50ID0gbm9kZTtcclxuXHRcdGxldCBjaGlsZDogTm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcclxuXHRcdHdoaWxlIChjaGlsZCkge1xyXG5cdFx0XHRpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIHtcclxuXHRcdFx0XHRjb25zdCBlYWNoUmV0dXJuOiBib29sZWFuIHwgdm9pZCA9IGVhY2goY2hpbGQgYXMgSFRNTEVsZW1lbnQsIHBhcmVudCBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHRcdFx0aWYgKGVhY2hSZXR1cm4gIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNoaWxkRWxlbWVudERvd24oY2hpbGQgYXMgSFRNTEVsZW1lbnQsIGVhY2gpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gZWxlbWVudCB1cCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBlbGVtZW50VXAobm9kZTogRWxlbWVudCB8IEhUTUxFbGVtZW50LCBlYWNoOiAobm9kZTogRWxlbWVudCB8IEhUTUxFbGVtZW50KSA9PiBib29sZWFuIHwgdm9pZCk6IHZvaWQge1xyXG5cdFx0aWYgKGVhY2gobm9kZSkgIT09IGZhbHNlKSB7XHJcblx0XHRcdHBhcmVudEVsZW1lbnRVcChub2RlLCBlYWNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBwYXJlbnRFbGVtZW50VXAobm9kZTogRWxlbWVudCB8IEhUTUxFbGVtZW50IHwgTm9kZSwgZWFjaDogKG5vZGU6IEVsZW1lbnQgfCBIVE1MRWxlbWVudCB8IE5vZGUpID0+IGJvb2xlYW4gfCB2b2lkKTogdm9pZCB7XHJcblx0XHRsZXQgcmV0b3JubzogYm9vbGVhbiB8IHZvaWQgPSB0cnVlO1xyXG5cdFx0bGV0IGN1cnJlbnQ6IEVsZW1lbnQgfCBOb2RlID0gKG5vZGUgYXMgTm9kZSkucGFyZW50Tm9kZTtcclxuXHRcdGRvIHtcclxuXHRcdFx0cmV0b3JubyA9IGVhY2goY3VycmVudCk7XHJcblx0XHRcdGN1cnJlbnQgPSAoY3VycmVudCBhcyBOb2RlKS5wYXJlbnROb2RlO1xyXG5cdFx0fSB3aGlsZSAocmV0b3JubyAhPT0gZmFsc2UgJiYgY3VycmVudCAhPT0gbnVsbCAmJiBjdXJyZW50ICE9PSB1bmRlZmluZWQgJiYgbm9kZS5ub2RlTmFtZSAhPT0gXCJCT0RZXCIpO1xyXG5cdH1cclxuXHJcblx0Ly8gZG9tIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGF0dHJpYnV0ZShlbGVtZW50OiBFbGVtZW50IHwgSFRNTEVsZW1lbnQgfCBOb2RlLCBlYWNoOiAoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcclxuXHRcdC8vIFRPRE86IHRoaXMgc3RpbGwgbmVlZCB0byBiZSB0ZXN0ZWRcclxuXHRcdGNvbnN0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0ZWFjaChhdHRyaWJ1dGVzW2ldLm5hbWUsIGF0dHJpYnV0ZXNbaV0udmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbmROZXh0U2libGluZyh0YXJnZXQ6IE5vZGUgfCBOb2RlLCB2YWxpZGF0aW9uOiAobm9kZTogTm9kZSB8IE5vZGUpID0+IGJvb2xlYW4gfCB2b2lkKTogTm9kZSB8IE5vZGUge1xyXG5cdFx0bGV0IGN1cnJlbnQ6IE5vZGUgfCBOb2RlID0gdGFyZ2V0Lm5leHRTaWJsaW5nO1xyXG5cdFx0d2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuXHRcdFx0aWYgKHZhbGlkYXRpb24oY3VycmVudCkgPT09IHRydWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gY3VycmVudDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjdXJyZW50ID0gY3VycmVudC5uZXh0U2libGluZztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gZmluZFByZXZTaWJsaW5nKHRhcmdldDogTm9kZSB8IE5vZGUsIHZhbGlkYXRpb246IChub2RlOiBOb2RlIHwgTm9kZSkgPT4gYm9vbGVhbiB8IHZvaWQpOiBOb2RlIHwgTm9kZSB7XHJcblx0XHRsZXQgY3VycmVudDogTm9kZSB8IE5vZGUgPSB0YXJnZXQucHJldmlvdXNTaWJsaW5nO1xyXG5cdFx0d2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuXHRcdFx0aWYgKHZhbGlkYXRpb24oY3VycmVudCkgPT09IHRydWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gY3VycmVudDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjdXJyZW50ID0gY3VycmVudC5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbmRBbGxTaWJsaW5ncyh0YXJnZXQ6IE5vZGUpOiBOb2RlW10ge1xyXG5cdFx0Y29uc3Qgc2libGluZ3M6IE5vZGVbXSA9IFtdO1xyXG5cdFx0ZmluZFByZXZTaWJsaW5nKHRhcmdldCwgKG5vZGUpID0+IHtcclxuXHRcdFx0c2libGluZ3MucHVzaChub2RlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHRmaW5kTmV4dFNpYmxpbmcodGFyZ2V0LCAobm9kZSkgPT4ge1xyXG5cdFx0XHRzaWJsaW5ncy5wdXNoKG5vZGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBzaWJsaW5ncztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBwcmVwZW5kQ2hpbGQocGFyZW50OiBIVE1MRWxlbWVudCwgY2hpbGQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcblx0XHRjb25zdCBmaXJzdENoaWxkOiBOb2RlID0gcGFyZW50LmZpcnN0Q2hpbGQ7XHJcblx0XHRpZiAoZmlyc3RDaGlsZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlPEhUTUxFbGVtZW50PihjaGlsZCwgZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjaGlsZDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUVsZW1lbnQob2xkRWxlbWVudDogSFRNTEVsZW1lbnQsIG5ld0VsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcblx0XHRvbGRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIG9sZEVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHN3YXBOb2RlcyhuMTogSFRNTEVsZW1lbnQsIG4yOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cdFx0bGV0IGkxOiBhbnk7XHJcblx0XHRsZXQgaTI6IGFueTtcclxuXHRcdGxldCBwMSA9IG4xLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRsZXQgcDIgPSBuMi5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0aWYgKHAxID09PSB1bmRlZmluZWQgfHwgcDEgPT09IG51bGwpIHtcclxuXHRcdFx0cDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRwMS5hcHBlbmRDaGlsZChuMSk7XHJcblx0XHR9XHJcblx0XHRpZiAocDIgPT09IHVuZGVmaW5lZCB8fCBwMiA9PT0gbnVsbCkge1xyXG5cdFx0XHRwMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdHAyLmFwcGVuZENoaWxkKG4yKTtcclxuXHRcdH1cclxuXHRcdGlmICghcDEgfHwgIXAyIHx8IHAxLmlzRXF1YWxOb2RlKG4yKSB8fCBwMi5pc0VxdWFsTm9kZShuMSkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHAxLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChwMS5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMSkpIHtcclxuXHRcdFx0XHRpMSA9IGk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHAyLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4yKSkge1xyXG5cdFx0XHRcdGkyID0gaTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xyXG5cdFx0XHRpMisrO1xyXG5cdFx0fVxyXG5cdFx0cDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xyXG5cdFx0cDIuaW5zZXJ0QmVmb3JlKG4xLCBwMi5jaGlsZHJlbltpMl0pO1xyXG5cdH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRG9tO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdXRpbGl0eS1jb2xsZWN0aW9uL3NyYy9kb20udHMiLCIvLyBpbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IFN0cmluZyBmcm9tIFwiLi9zdHJpbmdcIjtcclxuXHJcbi8vIGNvbnNvbGUubG9nKFwiLS0+IG9rXCIpO1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBJcyB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG1vYmlsZSgpOiBib29sZWFuIHtcclxuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDkwMCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGlzIG51bGwgb3IgdW5kZWZpbmVkXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG51bGxPclVuZGVmaW5lZCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly8gaWQgZW1wdHlcclxuXHRleHBvcnQgZnVuY3Rpb24gZW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IFwiXCIpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vIGlzIE51bWJlclxyXG5cdGNvbnN0IG51bWJlclJlZ2V4OiBSZWdFeHAgPSAvXFxELztcclxuXHRleHBvcnQgZnVuY3Rpb24gbnVtYmVyKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhbnVtYmVyUmVnZXgudGVzdCh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHQvLyBpcyBMZXR0ZXJcclxuXHRjb25zdCBsZXR0ZXJSZWdleDogUmVnRXhwID0gL1thLXpBLVpdLztcclxuXHRleHBvcnQgZnVuY3Rpb24gbGV0dGVyKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBsZXR0ZXJSZWdleC50ZXN0KHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Y29uc3QgZW1haWxSZWdleCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvbTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZW1haWwodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGVtYWlsUmVnZXgudGVzdCh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHQvLyBicmF6aWxpYW4gdmFsaWRhdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIHBob25lXHJcblx0Y29uc3QgYnJhemlsaWFuUGhvbmVSZWdleCA9IC9eKD86KD86XFwrKVswLTldezJ9XFxzPyl7MCwxfSg/OlxcKClbMC05XXsyfSg/OlxcKSlcXHM/WzAtOV17MCwxfVxccz9bMC05XXs0LH0oPzotKVswLTldezR9JC9tO1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBicmF6aWxpYW5QaG9uZShwaG9uZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gYnJhemlsaWFuUGhvbmVSZWdleC50ZXN0KHBob25lKTtcclxuXHR9XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGRkbW15eXl5KGRhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkLlwiKTtcclxuXHRcdC8vIHJldHVybiBtb21lbnQoZGF0ZSwgXCJERC9NTS9ZWVlZXCIsIHRydWUpLmlzVmFsaWQoKTtcclxuXHR9XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG1tZGR5eXl5KGRhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkLlwiKTtcclxuXHRcdC8vIHJldHVybiBtb21lbnQoZGF0ZSwgXCJNTS9ERC9ZWVlZXCIsIHRydWUpLmlzVmFsaWQoKTtcclxuXHR9XHJcblxyXG5cdC8vIENQRlxyXG5cdGV4cG9ydCBmdW5jdGlvbiBjcGYodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0dmFsdWUgPSBTdHJpbmcuc3RyaXBOb25OdW1iZXIodmFsdWUpO1xyXG5cdFx0bGV0IG51bWVyb3M6IHN0cmluZztcclxuXHRcdGxldCBkaWdpdG9zOiBhbnk7XHJcblx0XHRsZXQgc29tYTogbnVtYmVyO1xyXG5cdFx0bGV0IGk6IGFueTtcclxuXHRcdGxldCByZXN1bHRhZG86IGFueTtcclxuXHRcdGxldCBkaWdpdG9zX2lndWFpczogYW55O1xyXG5cdFx0ZGlnaXRvc19pZ3VhaXMgPSAxO1xyXG5cdFx0aWYgKHZhbHVlLmxlbmd0aCA8IDExKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGggLSAxOyBpKyspIHtcclxuXHRcdFx0aWYgKHZhbHVlLmNoYXJBdChpKSAhPT0gdmFsdWUuY2hhckF0KGkgKyAxKSkge1xyXG5cdFx0XHRcdGRpZ2l0b3NfaWd1YWlzID0gMDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKCFkaWdpdG9zX2lndWFpcykge1xyXG5cdFx0XHRudW1lcm9zID0gdmFsdWUuc3Vic3RyaW5nKDAsIDkpO1xyXG5cdFx0XHRkaWdpdG9zID0gdmFsdWUuc3Vic3RyaW5nKDkpO1xyXG5cdFx0XHRzb21hID0gMDtcclxuXHRcdFx0Zm9yIChpID0gMTA7IGkgPiAxOyBpLS0pIHtcclxuXHRcdFx0XHRzb21hICs9ICsobnVtZXJvcy5jaGFyQXQoMTAgLSBpKSkgKiBpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJlc3VsdGFkbyA9IHNvbWEgJSAxMSA8IDIgPyAwIDogMTEgLSBzb21hICUgMTE7XHJcblx0XHRcdGlmIChyZXN1bHRhZG8gIT09ICsoZGlnaXRvcy5jaGFyQXQoMCkpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdG51bWVyb3MgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgMTApO1xyXG5cdFx0XHRzb21hID0gMDtcclxuXHRcdFx0Zm9yIChpID0gMTE7IGkgPiAxOyBpLS0pIHtcclxuXHRcdFx0XHRzb21hICs9ICsobnVtZXJvcy5jaGFyQXQoMTEgLSBpKSkgKiBpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJlc3VsdGFkbyA9IHNvbWEgJSAxMSA8IDIgPyAwIDogMTEgLSBzb21hICUgMTE7XHJcblx0XHRcdGlmIChyZXN1bHRhZG8gIT09ICsoZGlnaXRvcy5jaGFyQXQoMSkpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvLyBDTlBKXHJcblx0ZnVuY3Rpb24gY25waih2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHR2YWx1ZSA9IFN0cmluZy5zdHJpcE5vbk51bWJlcih2YWx1ZSk7XHJcblxyXG5cdFx0bGV0IHRhbWFuaG86IG51bWJlcjtcclxuXHRcdGxldCBudW1lcm9zOiBzdHJpbmc7XHJcblx0XHRsZXQgZGlnaXRvczogc3RyaW5nO1xyXG5cdFx0bGV0IHNvbWE6IG51bWJlcjtcclxuXHRcdGxldCBwb3M6IG51bWJlcjtcclxuXHRcdHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXGRdKy9nLCBcIlwiKTtcclxuXHRcdGlmICh2YWx1ZSA9PT0gXCJcIikgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdGlmICh2YWx1ZS5sZW5ndGggIT09IDE0KSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuXHRcdC8vIEVsaW1pbmEgQ05QSnMgaW52YWxpZG9zIGNvbmhlY2lkb3NcclxuXHRcdGlmICh2YWx1ZSA9PT0gXCIwMDAwMDAwMDAwMDAwMFwiIHx8XHJcblx0XHRcdHZhbHVlID09PSBcIjExMTExMTExMTExMTExXCIgfHxcclxuXHRcdFx0dmFsdWUgPT09IFwiMjIyMjIyMjIyMjIyMjJcIiB8fFxyXG5cdFx0XHR2YWx1ZSA9PT0gXCIzMzMzMzMzMzMzMzMzM1wiIHx8XHJcblx0XHRcdHZhbHVlID09PSBcIjQ0NDQ0NDQ0NDQ0NDQ0XCIgfHxcclxuXHRcdFx0dmFsdWUgPT09IFwiNTU1NTU1NTU1NTU1NTVcIiB8fFxyXG5cdFx0XHR2YWx1ZSA9PT0gXCI2NjY2NjY2NjY2NjY2NlwiIHx8XHJcblx0XHRcdHZhbHVlID09PSBcIjc3Nzc3Nzc3Nzc3Nzc3XCIgfHxcclxuXHRcdFx0dmFsdWUgPT09IFwiODg4ODg4ODg4ODg4ODhcIiB8fFxyXG5cdFx0XHR2YWx1ZSA9PT0gXCI5OTk5OTk5OTk5OTk5OVwiKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0Ly8gVmFsaWRhIERWc1xyXG5cdFx0dGFtYW5obyA9IHZhbHVlLmxlbmd0aCAtIDI7XHJcblx0XHRudW1lcm9zID0gdmFsdWUuc3Vic3RyaW5nKDAsIHRhbWFuaG8pO1xyXG5cdFx0ZGlnaXRvcyA9IHZhbHVlLnN1YnN0cmluZyh0YW1hbmhvKTtcclxuXHRcdHNvbWEgPSAwO1xyXG5cdFx0cG9zID0gdGFtYW5obyAtIDc7XHJcblx0XHRmb3IgKGxldCBpID0gdGFtYW5obzsgaSA+PSAxOyBpLS0pIHtcclxuXHRcdFx0c29tYSArPSArKG51bWVyb3MuY2hhckF0KHRhbWFuaG8gLSBpKSkgKiBwb3MtLTtcclxuXHRcdFx0aWYgKHBvcyA8IDIpIHtcclxuXHRcdFx0XHRwb3MgPSA5O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRsZXQgcmVzdWx0YWRvOiBudW1iZXIgPSBzb21hICUgMTEgPCAyID8gMCA6IDExIC0gc29tYSAlIDExO1xyXG5cdFx0aWYgKHJlc3VsdGFkbyAhPT0gKyhkaWdpdG9zLmNoYXJBdCgwKSkpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhbWFuaG8gPSB0YW1hbmhvICsgMTtcclxuXHRcdG51bWVyb3MgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdGFtYW5obyk7XHJcblx0XHRzb21hID0gMDtcclxuXHRcdHBvcyA9IHRhbWFuaG8gLSA3O1xyXG5cdFx0Zm9yIChsZXQgaSA9IHRhbWFuaG87IGkgPj0gMTsgaS0tKSB7XHJcblx0XHRcdHNvbWEgKz0gKyhudW1lcm9zLmNoYXJBdCh0YW1hbmhvIC0gaSkpICogcG9zLS07XHJcblx0XHRcdGlmIChwb3MgPCAyKSB7XHJcblx0XHRcdFx0cG9zID0gOTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmVzdWx0YWRvID0gc29tYSAlIDExIDwgMiA/IDAgOiAxMSAtIHNvbWEgJSAxMTtcclxuXHRcdGlmIChyZXN1bHRhZG8gIT09ICsoZGlnaXRvcy5jaGFyQXQoMSkpKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBJcztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvaXMudHMiLCJleHBvcnQgbmFtZXNwYWNlIFJlZmxlY3Rpb24ge1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBtZXJnZShiYXNlOiBhbnksIHNvdXJjZTogYW55KTogdm9pZCB7XHJcblx0XHRmb3IgKGNvbnN0IGkgaW4gc291cmNlKSB7XHJcblx0XHRcdGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuXHRcdFx0XHRiYXNlW2ldID0gc291cmNlW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFJlZmxlY3Rpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL3JlZmxlY3Rpb24udHMiLCJleHBvcnQgY2xhc3MgVXJsIHtcclxuXHRwdWJsaWMgUXVlcnlMaXN0PzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xyXG5cdHByaXZhdGUgc3RhdGljUGF0aD86IHN0cmluZyB8IG51bGw7XHJcblx0cHJpdmF0ZSBzdGF0aWNRdWVyeT86IHN0cmluZyB8IG51bGw7XHJcblx0cHJpdmF0ZSBzdGF0aWNIYXNoPzogc3RyaW5nIHwgbnVsbDtcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XHJcblx0XHR0aGlzLnN0YXRpY1BhdGggPSB1cmwuc3BsaXQoXCIjXCIpWzBdLnNwbGl0KFwiP1wiKVswXTtcclxuXHRcdHRoaXMuc3RhdGljUXVlcnkgPSB1cmwuaW5kZXhPZihcIj9cIikgPiAtMSA/IHVybC5zcGxpdChcIj9cIilbMV0uc3BsaXQoXCIjXCIpWzBdIDogbnVsbDtcclxuXHRcdHRoaXMuc3RhdGljSGFzaCA9IHVybC5zcGxpdChcIiNcIilbMV0gfHwgbnVsbDtcclxuXHRcdC8vIHF1ZXJ5TGlzdFxyXG5cdFx0aWYgKHRoaXMuc3RhdGljUXVlcnkgIT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCBxdWVyeUtleVZhbHVlTGlzdDogc3RyaW5nW10gPSB0aGlzLnN0YXRpY1F1ZXJ5LnNwbGl0KFwiJlwiKTtcclxuXHRcdFx0cXVlcnlLZXlWYWx1ZUxpc3QuZm9yRWFjaCgocXVlcnlLZXlWYWx1ZSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGtleVZhbHVlOiBzdHJpbmdbXSA9IHF1ZXJ5S2V5VmFsdWUuc3BsaXQoXCI9XCIpO1xyXG5cdFx0XHRcdGNvbnN0IGtleTogc3RyaW5nID0ga2V5VmFsdWVbMF07XHJcblx0XHRcdFx0Y29uc3QgdmFsdWU6IHN0cmluZyA9IGtleVZhbHVlWzFdO1xyXG5cdFx0XHRcdHRoaXMuUXVlcnlMaXN0W2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXRRdWVyeShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFVybCB7XHJcblx0XHR0aGlzLlF1ZXJ5TGlzdFtrZXldID0gdmFsdWU7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblx0cHVibGljIHNldFF1ZXJpZXModmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ICk6IFVybCB7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZXMpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZXNba2V5XSAhPT0gXCJmdW5jdGlvblwiICYmIHZhbHVlc1trZXldICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHR0aGlzLlF1ZXJ5TGlzdFtrZXldID0gdmFsdWVzW2tleV0udG9TdHJpbmcoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cdHB1YmxpYyBkZWxldGVRdWVyeShrZXk6IHN0cmluZyk6IFVybCB7XHJcblx0XHR0aGlzLlF1ZXJ5TGlzdFtrZXldID0gdW5kZWZpbmVkO1xyXG5cdFx0ZGVsZXRlIHRoaXMuUXVlcnlMaXN0W2tleV07XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblx0cHVibGljIGdldFF1ZXJ5KGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLlF1ZXJ5TGlzdFtrZXldO1xyXG5cdH1cclxuXHRwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuXHRcdGxldCBxdWVyeUxlbmd0aDogbnVtYmVyID0gT2JqZWN0LmtleXModGhpcy5RdWVyeUxpc3QpLmxlbmd0aDtcclxuXHRcdGxldCBxdWVyeTogc3RyaW5nID0gKE9iamVjdC5rZXlzKHRoaXMuUXVlcnlMaXN0KS5sZW5ndGggPiAwID8gXCI/XCIgOiBcIlwiKTtcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMuUXVlcnlMaXN0KSB7XHJcblx0XHRcdGlmICh0aGlzLlF1ZXJ5TGlzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdFx0cXVlcnlMZW5ndGgtLTtcclxuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuUXVlcnlMaXN0W2tleV07XHJcblx0XHRcdFx0cXVlcnkgPSBxdWVyeSArIGtleSArIFwiPVwiICsgdmFsdWU7XHJcblx0XHRcdFx0aWYgKHF1ZXJ5TGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0cXVlcnkgPSBxdWVyeSArIFwiJlwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGljUGF0aCArIHF1ZXJ5ICsgKHRoaXMuc3RhdGljSGFzaCA/IHRoaXMuc3RhdGljSGFzaCA6IFwiXCIpO1xyXG5cdH1cclxufVxyXG4vLyBleHBvcnQgbmFtZXNwYWNlIFVybCB7XHJcbi8vIFx0Ly9cclxuLy8gfVxyXG5leHBvcnQgZGVmYXVsdCBVcmw7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL3VybC50cyIsImV4cG9ydCBuYW1lc3BhY2UgTGlzdCB7XHJcblx0Ly8gcmVtb3ZlIGl0ZW0gZnJvbSBsaXN0IGlmIGV4aXN0XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZyb21JbmRleDxUPihsaXN0OiBUW10sIGluZGV4OiBudW1iZXIpOiBUW10ge1xyXG5cdFx0bGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0cmV0dXJuIGxpc3Q7XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiByZW1vdmVJdGVtPFQ+KGxpc3Q6IFRbXSwgaXRlbTogVCk6IFRbXSB7XHJcblx0XHRjb25zdCBpbmRleCA9IGxpc3QuaW5kZXhPZihpdGVtKTtcclxuXHRcdGxldCBuZXdMaXN0OiBUW107XHJcblx0XHRpZiAoaW5kZXggPiAtMSkge1xyXG5cdFx0XHRuZXdMaXN0ID0gcmVtb3ZlRnJvbUluZGV4KGxpc3QsIGluZGV4KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5ld0xpc3QgPSBsaXN0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ld0xpc3Q7XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtPFQ+KGxpc3Q6IFRbXSwgaXRlbTogVCk6IFRbXSB7XHJcblx0XHRjb25zdCBpbmRleCA9IGxpc3QuaW5kZXhPZihpdGVtKTtcclxuXHRcdGlmIChpbmRleCA8IDApIHtcclxuXHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGxpc3Q7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy91dGlsaXR5LWNvbGxlY3Rpb24vc3JjL2xpc3QudHMiLCJpbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuL2V2ZW50XCI7XHJcblxyXG5leHBvcnQgY29uc3QgREFUQV9TQ1JPTExBQkxFID0gXCJkYXRhLXNjcm9sbGFibGVcIjtcclxuZXhwb3J0IGNvbnN0IENMQVNTX0ZPQ1VTID0gXCJzY3JvbGwtLWFjdGl2ZVwiO1xyXG5leHBvcnQgbmFtZXNwYWNlIFNjcm9sbFN3aXRjaCB7XHJcblx0bGV0IHVuZnJlZXplRGVsYXk6IG51bWJlcjtcclxuXHRleHBvcnQgY2xhc3MgU2Nyb2xsYWJsZSB7XHJcblx0XHRwcml2YXRlIGlkOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcclxuXHRcdHByaXZhdGUgeTogbnVtYmVyID0gMDtcclxuXHRcdHByaXZhdGUgZnJvemVuOiBib29sZWFuID0gZmFsc2U7XHJcblx0XHRwcml2YXRlIHVuZnJlZXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRcdGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHRcdGlmICh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKERBVEFfU0NST0xMQUJMRSkgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHRoaXMuaWQgPSBuZXdTY3JvbGxhYmxlSWQoKTtcclxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKERBVEFfU0NST0xMQUJMRSwgdGhpcy5pZCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pZCA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoREFUQV9TQ1JPTExBQkxFKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyByZWdpc3RlciBldmVudFxyXG5cdFx0XHRjb25zdCB1bmZyZWV6ZUV2ZW50ID0gKGU6IEV2ZW50KSA9PiB7XHJcblx0XHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5zY3JvbGxZKTtcclxuXHRcdFx0XHR0aGlzLnVuZnJlZXplKCk7XHJcblx0XHRcdH07XHJcblx0XHRcdGNvbnN0IGZyZWV6ZUFsbEV2ZW50ID0gKGU6IEV2ZW50KSA9PiB7XHJcblx0XHRcdFx0ZnJlZXplQWxsQnV0SWQobnVsbCk7XHJcblx0XHRcdH07XHJcblx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdW5mcmVlemVFdmVudCwgRXZlbnQucGFzc2l2ZSgpKTtcclxuXHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB1bmZyZWV6ZUV2ZW50LCBFdmVudC5wYXNzaXZlKCkpO1xyXG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCB1bmZyZWV6ZUV2ZW50LCBFdmVudC5wYXNzaXZlKCkpO1xyXG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZyZWV6ZUFsbEV2ZW50LCBFdmVudC5wYXNzaXZlKCkpO1xyXG5cdFx0fVxyXG5cdFx0cHVibGljIGdldElkKCk6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiB0aGlzLmlkO1xyXG5cdFx0fVxyXG5cdFx0cHVibGljIHVuZnJlZXplKCkge1xyXG5cdFx0XHRpZiAodGhpcy5mcm96ZW4gJiYgIXRoaXMudW5mcmVlemluZykge1xyXG5cdFx0XHRcdHRoaXMudW5mcmVlemluZyA9IHRydWU7XHJcblx0XHRcdFx0ZnJlZXplQWxsQnV0SWQodGhpcy5pZCk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLmVsZW1lbnQuc2Nyb2xsSGVpZ2h0fXB4YDtcclxuXHRcdFx0XHR3aW5kb3cuc2Nyb2xsKDAsIHRoaXMueSk7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgei1pbmRleDogJHt0aGlzLmVsZW1lbnQuc3R5bGUuekluZGV4fTsgYCk7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfRk9DVVMpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcclxuXHRcdFx0XHR0aGlzLnkgPSAwO1xyXG5cdFx0XHRcdHRoaXMuZnJvemVuID0gZmFsc2U7XHJcblx0XHRcdFx0dGhpcy51bmZyZWV6aW5nID0gZmFsc2U7XHJcblx0XHRcdFx0dW5mcmVlemVEZWxheSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cHVibGljIGZyZWV6ZSgpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmZyb3plbikge1xyXG5cdFx0XHRcdHRoaXMueSA9IHdpbmRvdy5zY3JvbGxZICsgMDtcclxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgYHBvc2l0aW9uOiBmaXhlZDsgdG9wOiAtJHt0aGlzLnl9cHg7IHotaW5kZXg6ICR7dGhpcy5lbGVtZW50LnN0eWxlLnpJbmRleH07IGApO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX0ZPQ1VTKTtcclxuXHRcdFx0XHR0aGlzLmZyb3plbiA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc3Qgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogU2Nyb2xsYWJsZSB9ID0ge307XHJcblx0bGV0IGxhc3RJZDogbnVtYmVyID0gMTtcclxuXHRmdW5jdGlvbiBuZXdTY3JvbGxhYmxlSWQoKTogc3RyaW5nIHtcclxuXHRcdGxhc3RJZCA9IGxhc3RJZCArIDE7XHJcblx0XHRyZXR1cm4gbGFzdElkLnRvU3RyaW5nKCk7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGlkZW50aWZ5RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IFNjcm9sbGFibGUge1xyXG5cdFx0aWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdGxldCBpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKERBVEFfU0NST0xMQUJMRSk7XHJcblx0XHRjb25zdCBzdG9yZWQgPSAoaWQgIT09IHVuZGVmaW5lZCkgPyAoc3RvcmVbaWRdICE9PSB1bmRlZmluZWQpIDogZmFsc2U7XHJcblx0XHRpZiAoc3RvcmVkKSB7XHJcblx0XHRcdHJldHVybiBzdG9yZVtpZF07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBzID0gbmV3IFNjcm9sbGFibGUoZWxlbWVudCk7XHJcblx0XHRcdGlkID0gcy5nZXRJZCgpO1xyXG5cdFx0XHRzdG9yZVtpZF0gPSBzO1xyXG5cdFx0XHRyZXR1cm4gc3RvcmVbaWRdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gZnJlZXplRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3Qgc2Nyb2xsID0gaWRlbnRpZnlFbGVtZW50KGVsZW1lbnQpO1xyXG5cdFx0aWYgKHNjcm9sbCAhPT0gbnVsbCkge1xyXG5cdFx0XHRzY3JvbGwuZnJlZXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiBmcmVlemVBbGxCdXRJZChpZDogc3RyaW5nIHwgbnVsbCA9IG51bGwpOiB2b2lkIHtcclxuXHRcdGZvciAoY29uc3QgaSBpbiBzdG9yZSkge1xyXG5cdFx0XHRpZiAoaSAhPT0gaWQpIHtcclxuXHRcdFx0XHRzdG9yZVtpXS5mcmVlemUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRleHBvcnQgZnVuY3Rpb24gZnJlZXplQWxsQnV0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3Qgc2Nyb2xsID0gaWRlbnRpZnlFbGVtZW50KGVsZW1lbnQpO1xyXG5cdFx0aWYgKHNjcm9sbCAhPT0gbnVsbCkge1xyXG5cdFx0XHRmcmVlemVBbGxCdXRJZChzY3JvbGwuZ2V0SWQoKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGV4cG9ydCBmdW5jdGlvbiB1bmZyZWV6ZUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHNjcm9sbCA9IGlkZW50aWZ5RWxlbWVudChlbGVtZW50KTtcclxuXHRcdGlmIChzY3JvbGwgIT09IG51bGwpIHtcclxuXHRcdFx0c2Nyb2xsLnVuZnJlZXplKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFN3aXRjaDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3V0aWxpdHktY29sbGVjdGlvbi9zcmMvc2Nyb2xsLXN3aXRjaC50cyIsIi8qIFxuKFRoZSBNSVQgTGljZW5zZSlcbkNvcHlyaWdodCAoYykgMjAxNCBIYWzDoXN6IMOBZMOhbSA8bWFpbEBhZGFtaGFsYXN6LmNvbT5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuLy8gIFVuaXF1ZSBIZXhhdHJpZGVjaW1hbCBJRCBHZW5lcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyAgRGVwZW5kZW5jaWVzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnZhciBwaWQgPSBwcm9jZXNzICYmIHByb2Nlc3MucGlkID8gcHJvY2Vzcy5waWQudG9TdHJpbmcoMzYpIDogJycgO1xudmFyIG1hYyA9IHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fICE9PSAnZnVuY3Rpb24nID8gcmVxdWlyZSgnbWFjYWRkcmVzcycpLm9uZShtYWNIYW5kbGVyKSA6IG51bGwgO1xudmFyIGFkZHJlc3MgPSBtYWMgPyBwYXJzZUludChtYWMucmVwbGFjZSgvXFw6fFxcRCsvZ2ksICcnKSkudG9TdHJpbmcoMzYpIDogJycgO1xuXG4vLyAgRXhwb3J0c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5tb2R1bGUuZXhwb3J0cyAgICAgICAgID0gZnVuY3Rpb24ocHJlZml4KXsgcmV0dXJuIChwcmVmaXggfHwgJycpICsgYWRkcmVzcyArIHBpZCArIG5vdygpLnRvU3RyaW5nKDM2KTsgfVxubW9kdWxlLmV4cG9ydHMucHJvY2VzcyA9IGZ1bmN0aW9uKHByZWZpeCl7IHJldHVybiAocHJlZml4IHx8ICcnKSAgICAgICAgICAgKyBwaWQgKyBub3coKS50b1N0cmluZygzNik7IH1cbm1vZHVsZS5leHBvcnRzLnRpbWUgICAgPSBmdW5jdGlvbihwcmVmaXgpeyByZXR1cm4gKHByZWZpeCB8fCAnJykgICAgICAgICAgICAgICAgICsgbm93KCkudG9TdHJpbmcoMzYpOyB9XG5cbi8vICBIZWxwZXJzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIG5vdygpe1xuICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgbGFzdCA9IG5vdy5sYXN0IHx8IHRpbWU7XG4gICAgcmV0dXJuIG5vdy5sYXN0ID0gdGltZSA+IGxhc3QgPyB0aW1lIDogbGFzdCArIDE7XG59XG5cbmZ1bmN0aW9uIG1hY0hhbmRsZXIoZXJyb3Ipe1xuICAgIGlmKG1vZHVsZS5wYXJlbnQgJiYgbW9kdWxlLnBhcmVudC51bmlxaWRfZGVidWcpe1xuICAgICAgICBpZihlcnJvcikgY29uc29sZS5lcnJvcignSW5mbzogTm8gbWFjIGFkZHJlc3MgLSB1bmlxaWQoKSBmYWxscyBiYWNrIHRvIHVuaXFpZC5wcm9jZXNzKCkuJywgZXJyb3IpXG4gICAgICAgIGlmKHBpZCA9PSAnJykgY29uc29sZS5lcnJvcignSW5mbzogTm8gcHJvY2Vzcy5waWQgLSB1bmlxaWQucHJvY2VzcygpIGZhbGxzIGJhY2sgdG8gdW5pcWlkLnRpbWUoKS4nKVxuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3VuaXFpZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==