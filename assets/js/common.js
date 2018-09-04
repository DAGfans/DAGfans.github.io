/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var Common, tkmh;
	
	Common = __webpack_require__(2);
	
	window.tkmh = tkmh = window.tkmh || {};
	
	tkmh.windowScrollTweenObj = {
	  value: 0
	};
	
	tkmh.windowScrollTween = null;
	
	tkmh.windowScrollTo = function(scrollFrom, scrollTo, duration, onStart, onEnd) {
	  if (duration == null) {
	    duration = 1;
	  }
	  if (onStart == null) {
	    onStart = null;
	  }
	  if (onEnd == null) {
	    onEnd = null;
	  }
	  return new Promise(function(resolve) {
	    var ref;
	    if (scrollFrom === scrollTo) {
	      resolve();
	      return;
	    }
	    if ((ref = tkmh.windowScrollTween) != null) {
	      ref.kill();
	    }
	    tkmh.windowScrollTweenObj = {
	      value: window.scrollY
	    };
	    return tkmh.windowScrollTween = TweenMax.to(tkmh.windowScrollTweenObj, duration, {
	      value: scrollTo,
	      overwrite: true,
	      ease: Expo.easeOut,
	      onStart: function() {
	        if ($.isFunction(onStart)) {
	          return onStart();
	        }
	      },
	      onUpdate: function() {
	        return window.scrollTo(0, tkmh.windowScrollTweenObj.value);
	      },
	      onComplete: function() {
	        if ($.isFunction(onEnd)) {
	          onEnd();
	        }
	        return resolve();
	      }
	    });
	  });
	};
	
	tkmh.PerlinNoise = new (function() {
	  var fade, grad, lerp, scale;
	  fade = function(t) {
	    return t * t * t * (t * (t * 6 - 15) + 10);
	  };
	  lerp = function(t, a, b) {
	    return a + t * (b - a);
	  };
	  grad = function(hash, x, y, z) {
	    var h, u, v;
	    h = hash & 15;
	    u = h < 8 ? x : y;
	    v = h < 4 ? y : h === 12 || h === 14 ? x : z;
	    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
	  };
	  scale = function(n) {
	    return (1 + n) / 2;
	  };
	  this.noise = function(x, y, z) {
	    var A, AA, AB, B, BA, BB, X, Y, Z, i, p, permutation, u, v, w;
	    if (y == null) {
	      y = 0;
	    }
	    if (z == null) {
	      z = 0;
	    }
	    p = new Array(512);
	    permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
	    i = 0;
	    while (i < 256) {
	      p[256 + i] = p[i] = permutation[i];
	      i++;
	    }
	    X = Math.floor(x) & 255;
	    Y = Math.floor(y) & 255;
	    Z = Math.floor(z) & 255;
	    x -= Math.floor(x);
	    y -= Math.floor(y);
	    z -= Math.floor(z);
	    u = fade(x);
	    v = fade(y);
	    w = fade(z);
	    A = p[X] + Y;
	    AA = p[A] + Z;
	    AB = p[A + 1] + Z;
	    B = p[X + 1] + Y;
	    BA = p[B] + Z;
	    BB = p[B + 1] + Z;
	    return scale(lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)), lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))), lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)), lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1)))));
	  };
	});
	
	$(function() {
	  return new Common();
	});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var Common, MainVisual,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	window.utils = __webpack_require__(3);
	
	MainVisual = __webpack_require__(17);
	
	Common = (function() {
	  var _CAM_DISTANCE, _CONTENTS_CONTAINER_CLASS, _CONTENTS_INNER_ID, _MIN_HEIGHT, _SAME_CAT_CONTAINER_SELECTOR;
	
	  _CAM_DISTANCE = 20;
	
	  _MIN_HEIGHT = 600;
	
	  _CONTENTS_INNER_ID = 'contentsInner';
	
	  _SAME_CAT_CONTAINER_SELECTOR = '> .inner';
	
	  _CONTENTS_CONTAINER_CLASS = 'contentsContainer';
	
	  function Common() {
	    this.pause = bind(this.pause, this);
	    this.start = bind(this.start, this);
	    this.update = bind(this.update, this);
	    this.startContents = bind(this.startContents, this);
	    this.setLoadedContents = bind(this.setLoadedContents, this);
	    this.windowScrollHandler = bind(this.windowScrollHandler, this);
	    this.orientationChangeHandler = bind(this.orientationChangeHandler, this);
	    this.windowResizeHandler = bind(this.windowResizeHandler, this);
	    this.$window = $(window);
	    this.$html = $('html');
	    this.$body = $('body');
	    this.$wrapper = $('#wrapper');
	    this.$contentsInner = $("#" + _CONTENTS_INNER_ID);
	    this.$globalHeader = $('#globalHeader');
	    this.$globalNav = $('#globalNav');
	    this.$mainVisual = $('#mainVisual');
	    this.$mainVisual.hide();
	    this.requestAnimationFrameId = null;
	    $('#btnMenu a').on('click', (function(_this) {
	      return function(e) {
	        _this.$body.toggleClass('menuOpened');
	        return false;
	      };
	    })(this));
	    this.$mainVisual.find('.btnScroll').on('click', (function(_this) {
	      return function(e) {
	        var scrollTo;
	        scrollTo = _this.$mainVisual.height() - _this.$globalHeader.height();
	        tkmh.windowScrollTo(_this.$window.scrollTop(), scrollTo, 0.6, _this.pause, _this.start);
	        return false;
	      };
	    })(this));
	    this.$wrapper.find('.btnScrollTop').on('click', (function(_this) {
	      return function(e) {
	        tkmh.windowScrollTo(_this.$window.scrollTop(), 0, 0.6, _this.pause, _this.start);
	        return false;
	      };
	    })(this));
	    this.initAsyncTransition();
	    this.$window.on({
	      // scroll: this.windowScrollHandler,
	      resize: this.windowResizeHandler,
	      orientationchange: this.orientationChangeHandler,
	      popstate: (function(_this) {
	        return function(e) {
	          if (!_this.isInited) {
	            return;
	          }
	          if (_this.lastUrl === '') {
	
	          } else {
	            _this.registerHistory('', true);
	            return _this.showContents(_this.lastUrl, location.pathname);
	          }
	        };
	      })(this)
	    });
	    this.mainVisual = new MainVisual();
	    tkmh.animateToTtl = (function(_this) {
	      return function(name) {
	        if (!_this.mainVisual.isWebGLSupported) {
	          return;
	        }
	        _this.mainVisual.animateToTtl(name);
	      };
	    })(this);
	    tkmh.animateFromTtl = (function(_this) {
	      return function() {
	        var ref;
	        if (!_this.mainVisual.isWebGLSupported) {
	          return;
	        }
	        if ((ref = _this.mainVisual) != null) {
	          ref.animateFromTtl();
	        }
	      };
	    })(this);
	    tkmh.pause = (function(_this) {
	      return function() {
	        _this.pause();
	      };
	    })(this);
        tkmh.start = (function(_this) {
            return function() {
                _this.start();
            };
        })(this);

	    this.mainVisual.init((function(_this) {
	      return function() {
	        var $loading;
	        if (_this.mainVisual.isWebGLSupported) {
	          _this.$window.on({
	            mousemove: _this.mainVisual.windowMouseMoveHandler,
	            devicemotion: _this.mainVisual.deviceMotionHandler
	          }).trigger('resize').trigger('orientationchange');
	          _this.start();
	        }
	        return $loading = $('#loading').addClass('loaded').on(utils.transitionend(), function(e) {
	          var url;
	          $loading.remove();
	          url = location.pathname;
	          _this.registerHistory(url);
	          return _this.showContents('', url, true);
	        });
	      };
	    })(this));
	    tkmh.searchByKeyword = (function(_this) {
	      return function(category, query) {
	        _this.loadPage("/" + category + "/" + query, null, true);
	      };
	    })(this);
	    tkmh.back = (function(_this) {
	      return function(defaultPath) {
	        var lastUrl, urlHistory;
	        urlHistory = _this.registerHistory('', true);
	        lastUrl = (urlHistory.length > 0 && urlHistory[urlHistory.length - 1]) || defaultPath;
	        history.pushState({
	          url: lastUrl,
	          lastUrl: _this.lastUrl
	        }, '', lastUrl);
	        _this.showContents(_this.lastUrl, lastUrl);
	      };
	    })(this);
	    this.$window.trigger('resize');
	    this.$window.trigger('orientationchange');
	    this.$window.trigger('scroll');
	  }
	
	  Common.prototype.registerHistory = function(url, remove) {
	    var urlHistory;
	    if (remove == null) {
	      remove = false;
	    }
	    if (typeof sessionStorage === "undefined" || sessionStorage === null) {
	      return false;
	    }
	    urlHistory = this.getHistory();
	    if (remove) {
	      urlHistory.pop();
	    } else {
	      if (urlHistory[urlHistory.length - 1] !== url) {
	        urlHistory.push(url);
	      }
	    }
	    sessionStorage.setItem('history', urlHistory.join(','));
	    return urlHistory;
	  };
	
	  Common.prototype.getHistory = function() {
	    var urlHistory, urlHistoryStr;
	    if (typeof sessionStorage === "undefined" || sessionStorage === null) {
	      return false;
	    }
	    urlHistory = [];
	    urlHistoryStr = sessionStorage.getItem('history');
	    if (urlHistoryStr) {
	      urlHistory = urlHistoryStr.split(',');
	    }
	    return urlHistory;
	  };
	
	  Common.prototype.resize = function() {
	    var mainVisualWidth, ref;
	    this.mainVisualHeight = this.$window.height();
	    mainVisualWidth = this.$window.width();
	    this.headerHeight = this.$globalHeader.height();
	    this.$wrapper.css({
	      width: '',
	      height: this.mainVisualHeight
	    });
	    if ((ref = this.mainVisual) != null) {
	      ref.resize(mainVisualWidth, this.mainVisualHeight);
	    }
	  };
	
	  Common.prototype.windowResizeHandler = function(e) {
	    if (utils.isDesktop) {
	      this.resize();
	    }
	  };
	
	  Common.prototype.orientationChangeHandler = function(e) {
	    if (utils.isTablet || utils.isMobile) {
	      if (utils.isiOS) {
	        this.resize();
	      } else {
	        setTimeout(((function(_this) {
	          return function() {
	            return _this.resize();
	          };
	        })(this)), 300);
	      }
	    }
	  };
	
	  Common.prototype.windowScrollHandler = function(e) {
	    this.scrollTop = this.$window.scrollTop();
	    if (this.scrollTop >= this.mainVisualHeight - this.headerHeight - 1) {
	      this.$body.addClass('scrolled');
	    } else {
	      this.$body.removeClass('scrolled');
	    }
	  };
	
	  Common.prototype.initAsyncTransition = function() {
	    var notSyncScripts, self;
	    this.lastUrl = '';
	    this.bodyClass = '';
	    this.isInited = false;
	    this.isAnimating = false;
	    this.$syncItems = null;
	    this.$insertContents = null;
	    this.currentContents = null;
	    this.$currentContentsContainer = this.$contentsInner;
	    this.syncMetaSelectors = ['title', 'meta[name="keywords"]', 'meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:url"]', 'meta[property="og:description"]', 'meta[property="og:image"]', 'meta[property="og:type"]'];
	    this.syncStyleSelectors = ['link[rel="stylesheet"]:not([href="/assets/css/common.css"])'];
	    notSyncScripts = ['[src*="livereload"]', '[src*="localhost"]', '[src="/assets/js/common.js"]', '[src="/assets/js/lib.js"]', '[type="text/template"]', '.nosync'];
	    this.syncScriptSelectors = ["script:not(" + (notSyncScripts.join(',')) + ")"];
	    this.$syncStyles = $(this.syncStyleSelectors.join(','));
	    this.$syncMetas = $(this.syncMetaSelectors.join(','));
	    this.$syncScripts = $(this.syncScriptSelectors.join(','));
	    this.getInsertContents(this.$body, false);
	    self = this;
	    this.$body.on('click', 'a[href="#"],a.notransition', function(e) {
	      return false;
	    }).on('click', 'a:not([target],[href^="#"],[href="#"],a.notransition)', function(e) {
	      self.loadPage($(this).attr('href'));
	      return false;
	    });
	    this.checkUA();
	  };
	
	  Common.prototype.checkUA = function() {
	    var self;
	    self = this;
	    utils.md = new MobileDetect(navigator.userAgent);
	    if (utils.md.tablet() !== null) {
	      this.$html.addClass('tablet');
	      utils.isTablet = true;
	    } else if (utils.md.mobile() !== null) {
	      this.$html.addClass('mobile');
	      utils.isMobile = true;
	    } else {
	      this.$html.addClass('desktop');
	      utils.isDesktop = true;
	    }
	    if (!utils.isDesktop) {
	      return this.$globalNav.find('li a').on('click', function(e) {
	        var href, promise;
	        self.$body.removeClass('menuOpened');
	        href = $(this).attr('href');
	        promise = new Promise(function(resolve) {
	          return self.$globalNav.one(utils.transitionend(), function(e) {
	            if (e.target.id === 'globalNav') {
	              return resolve();
	            }
	          });
	        });
	        self.loadPage(href, promise);
	        return false;
	      });
	    }
	  };
	
	  Common.prototype.getInsertContents = function($html, fromAjaxLoadedContents, isSameCat) {
	    var filterStr;
	    if (fromAjaxLoadedContents == null) {
	      fromAjaxLoadedContents = true;
	    }
	    if (isSameCat == null) {
	      isSameCat = false;
	    }
	    filterStr = [].concat(this.syncMetaSelectors, this.syncStyleSelectors, this.syncScriptSelectors, this.syncLinks).join(',');
	    filterStr = filterStr.replace(/,$/, '');
	    if (fromAjaxLoadedContents) {
	      this.$syncItems = $html.filter(filterStr);
	    } else {
	      this.$syncItems = $(filterStr).clone();
	    }
	    if (isSameCat) {
	      this.$insertContents = $html.find("#" + _CONTENTS_INNER_ID + " " + _SAME_CAT_CONTAINER_SELECTOR).children();
	    } else {
	      this.$insertContents = $html.find("#" + _CONTENTS_INNER_ID).children();
	    }
	  };
	
	  Common.prototype.loadPage = function(url, promise, force) {
	    var currentURL;
	    if (promise == null) {
	      promise = null;
	    }
	    if (force == null) {
	      force = false;
	    }
	    if (this.isAnimating) {
	      return;
	    }
	    url = this.removeHostsFromUrl(url);
	    currentURL = location.pathname;
	    if ((url === currentURL) && !force) {
	      return;
	    }
	    history.pushState({
	      url: url,
	      lastUrl: this.lastUrl
	    }, '', url);
	    this.registerHistory(url);
	    this.showContents(currentURL, url, false, promise);
	  };
	
	  Common.prototype.ajaxPageLoad = function(url, isSameCat) {
	    if (isSameCat == null) {
	      isSameCat = false;
	    }
	    return new Promise((function(_this) {
	      return function(resolve) {
	        return axios.get(url).then(function(response) {
	          var $html, htmlTxt;
	          if (response.status === 200) {
	            htmlTxt = response.data;
	            _this.bodyClass = htmlTxt.match(/<body[^<>'"]*class="(.*)"/)[1];
	            $html = $(htmlTxt.replace(/([.\s\S　]*)<html([^>]*)>([.\s\S　]*)<\/html>/, "$3"));
	            _this.getInsertContents($html, true, isSameCat);
	          } else {
	            log('ajax error', response.statusText);
	          }
	          return resolve();
	        })["catch"](function(error) {
	          log('ajax error', error);
	          return resolve();
	        });
	      };
	    })(this));
	  };
	
	  Common.prototype.setLoadedContents = function() {
	    var self;
	    self = this;
	    return new Promise((function(_this) {
	      return function(resolve) {
	        var $lastScriptTag, $lastStyleTag, $scriptsToAdd, $stylesToAdd, contentsLoadHandler, numLoadedSyncItems, numTotalSyncItems;
	        numTotalSyncItems = 0;
	        numLoadedSyncItems = 0;
	        _this.$body.attr('class', _this.bodyClass);
	        contentsLoadHandler = function(e) {
	          if (e == null) {
	            e = null;
	          }
	          if (numTotalSyncItems === 0 || ++numLoadedSyncItems === numTotalSyncItems) {
	            _this.$syncScripts.remove();
	            _this.$syncScripts = $(_this.syncScriptSelectors.join(','));
	            _this.$syncStyles.remove();
	            _this.$syncStyles = $(_this.syncStyleSelectors.join(','));
	            _this.$window.trigger('resize').trigger('scroll');
	            resolve();
	          }
	        };
	        $.each(_this.syncMetaSelectors, function(index) {
	          var $obj, selector;
	          selector = _this.syncMetaSelectors[index];
	          $obj = _this.$syncMetas.filter(selector);
	          if ($obj.attr('content')) {
	            $obj.attr('content', _this.$syncItems.filter(selector).attr('content'));
	          } else {
	            $obj.text(_this.$syncItems.filter(selector).text());
	          }
	        });
	        $lastStyleTag = $('link[rel="stylesheet"]').last();
	        $stylesToAdd = null;
	        $.each(_this.syncStyleSelectors, function(index) {
	          var selector;
	          selector = _this.syncStyleSelectors[index];
	          $stylesToAdd = _this.$syncItems.filter(selector);
	          $stylesToAdd.each(function(i) {
	            var $style, $styleToAdd;
	            $styleToAdd = $stylesToAdd.eq(i);
	            $style = $('<link>').insertAfter($lastStyleTag).one('load', function(e) {
	              return contentsLoadHandler();
	            }).attr({
	              rel: 'stylesheet',
	              type: 'text/css',
	              href: $styleToAdd.attr('href'),
	              media: $styleToAdd.attr('media')
	            });
	          });
	          numTotalSyncItems += $stylesToAdd.length;
	        });
	        $lastScriptTag = $('script').last();
	        $scriptsToAdd = null;
	        $.each(_this.syncScriptSelectors, function(index) {
	          var selector;
	          selector = _this.syncScriptSelectors[index];
	          $scriptsToAdd = _this.$syncItems.filter(selector);
	          $scriptsToAdd.each(function(i) {
	            var $script, $scriptToAdd, src;
	            $scriptToAdd = $scriptsToAdd.eq(i);
	            src = $scriptToAdd.attr('src');
	            $script = $('<script>').insertAfter($lastScriptTag).attr('type', 'text/javascript');
	            if (src != null) {
	              $script.one('load', function(e) {
	                contentsLoadHandler();
	              }).attr('src', src);
	            } else {
	              $script.html($scriptToAdd.html());
	              setTimeout((function() {
	                return contentsLoadHandler();
	              }), 400);
	            }
	          });
	          numTotalSyncItems += $scriptsToAdd.length;
	        });
	        _this.$currentContentsContainer.children().remove();
	        return _this.$currentContentsContainer.html(_this.$insertContents);
	      };
	    })(this));
	  };
	
	  Common.prototype.removeHostsFromUrl = function(url) {
	    var pattern;
	    if (url.indexOf(location.host) >= 0) {
	      pattern = new RegExp(location.protocol + "//" + location.host);
	      return url.replace(pattern, '');
	    }
	    return url;
	  };
	
	  Common.prototype.showContents = function(urlFrom, urlTo, noLoad, promise) {
	    var catFrom, catTo, isSameCat, pathsFrom, pathsTo, promises, scrollTo;
	    if (noLoad == null) {
	      noLoad = false;
	    }
	    if (promise == null) {
	      promise = null;
	    }
	    urlTo = this.removeHostsFromUrl(urlTo);
	    if (this.isAnimating || urlFrom === urlTo) {
	      return;
	    }
	    this.$currentContentsContainer = this.$contentsInner;
	    this.lastUrl = urlTo;
	    this.isAnimating = true;
	    pathsFrom = this.getPathArr(urlFrom);
	    pathsTo = this.getPathArr(urlTo);
	    catFrom = pathsFrom[0];
	    catTo = pathsTo[0];
	    if (noLoad) {
	      this.isInited = true;
	      this.startContents(true);
	      return;
	    } else {
	      if (catTo === '') {
	        this.$body.addClass('hiding');
	      }
	      isSameCat = false;
	      scrollTo = 0;
	      if (catFrom === catTo) {
	        isSameCat = true;
	        this.$currentContentsContainer = this.$contentsInner.find(_SAME_CAT_CONTAINER_SELECTOR);
	        scrollTo = this.$window.height() - this.$globalHeader.height();
	        this.$contentsInner.css('height', this.$contentsInner.outerHeight());
	      }
	      this.$currentContentsContainer.addClass(_CONTENTS_CONTAINER_CLASS);
	      promises = [this.ajaxPageLoad(this.lastUrl, isSameCat), this.fadeOutContents(scrollTo)];
	      if (promise) {
	        promises.push(promise);
	      }
	      Promise.all(promises).then((function(_this) {
	        return function() {
	          return _this.setLoadedContents();
	        };
	      })(this)).then((function(_this) {
	        return function() {
	          if (typeof ga === "function") {
	            ga('send', 'pageview', urlTo);
	          }
	          return _this.startContents();
	        };
	      })(this));
	    }
	  };
	
	  Common.prototype.startContents = function(noLoad) {
	    var _start;
	    if (noLoad == null) {
	      noLoad = false;
	    }
	    this.$body.addClass('show').removeClass('hide');
	    _start = (function(_this) {
	      return function(e) {
	        if (e == null) {
	          e = null;
	        }
	        _this.currentContents = tkmh.currentContents;
	        _this.currentContents.init();
	        _this.$contentsInner.css('height', '');
	        _this.$body.removeClass('hiding');
	        _this.currentContents.start();
	        _this.isAnimating = false;
	        if (MathJax) {
	          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	        }
	      };
	    })(this);
	    if (noLoad) {
	      _start();
	      return;
	    } else {
	      TweenMax.to(this.$currentContentsContainer, 0.2, {
	        opacity: 1,
	        delay: 0.2,
	        ease: Linear.easeNone,
	        onComplete: (function(_this) {
	          return function() {
	            _this.$currentContentsContainer.removeClass(_CONTENTS_CONTAINER_CLASS);
	            _start();
	          };
	        })(this)
	      });
	    }
	  };
	
	  Common.prototype.fadeOutContents = function(scrollTo) {
	    return new Promise((function(_this) {
	      return function(resolve) {
	        _this.$body.addClass('hide').removeClass('show');
	        return tkmh.windowScrollTo(_this.$window.scrollTop(), scrollTo, 0.6, _this.pause, _this.start).then(function() {
	          return TweenMax.to(_this.$currentContentsContainer, 0.2, {
	            opacity: 0,
	            ease: Linear.easeNone,
	            onComplete: function() {
	              if (_this.currentContents) {
	                _this.currentContents.reset();
	              }
	              resolve();
	            }
	          });
	        });
	      };
	    })(this));
	  };
	
	  Common.prototype.getPathArr = function(url) {
	    var pathArr;
	    pathArr = url.split('/');
	    pathArr.splice(0, 1);
	    if (pathArr.length !== 1 && pathArr[pathArr.length - 1] === '') {
	      pathArr.pop();
	    }
	    return pathArr;
	  };
	
	  Common.prototype.update = function() {
	    this.mainVisual.draw();
	    this.requestAnimationFrameId = requestAnimationFrame(this.update);
	  };
	
	  Common.prototype.start = function() {
	    if (!this.isUpdating) {
	      this.isUpdating = true;
	      this.update();
	    }
	  };
	
	  Common.prototype.pause = function() {
	    cancelAnimationFrame(this.requestAnimationFrameId);
	    this.isUpdating = false;
	  };
	
	  return Common;
	
	})();
	
	module.exports = Common;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = {
	  preloadImg: __webpack_require__(4),
	  transitionend: __webpack_require__(5),
	  map: __webpack_require__(6),
	  capitalize: __webpack_require__(7),
	  isFirefox: __webpack_require__(8),
	  isIE11: __webpack_require__(9),
	  isEdge: __webpack_require__(10),
	  isiPad: __webpack_require__(11),
	  isiPhone: __webpack_require__(12),
	  isAndroid: __webpack_require__(13)
	};
	
	__webpack_require__(14);
	
	__webpack_require__(15);
	
	__webpack_require__(16);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = function(imgPath) {
	  return new Promise(function(resolve) {
	    var img;
	    img = new Image();
	    img.addEventListener('load', function(e) {
	      img.removeEventListener('load', arguments.callee);
	      return resolve();
	    });
	    return img.src = imgPath;
	  });
	};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = function(namescape) {
	  if (namescape == null) {
	    namescape = '';
	  }
	  if (namescape) {
	    return "transitionend." + namescape + " webkitTransitionEnd." + namescape + " mozTransitionEnd." + namescape + " oTransitionEnd." + namescape;
	  } else {
	    return 'transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd';
	  }
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = function(value, inputMin, inputMax, outputMin, outputMax, clamp) {
	  var p;
	  if (clamp == null) {
	    clamp = true;
	  }
	  if (clamp === true) {
	    if (value < inputMin) {
	      return outputMin;
	    }
	    if (value > inputMax) {
	      return outputMax;
	    }
	  }
	  p = (outputMax - outputMin) / (inputMax - inputMin);
	  return ((value - inputMin) * p) + outputMin;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = function(txt) {
	  return txt.charAt(0).toUpperCase() + txt.slice(1);
	};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = navigator.userAgent.toLowerCase().indexOf('rv:11.0') !== -1;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = navigator.userAgent.toLowerCase().indexOf('edge') !== -1;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = navigator.userAgent.toLowerCase().indexOf('android') !== -1;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	window.log = (function() {
	  if (window.console != null) {
	    if (window.console.log.bind != null) {
	      return window.console.log.bind(window.console);
	    } else {
	      return window.console.log;
	    }
	  } else {
	    return window.alert;
	  }
	})();


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	window.requestAnimationFrame = ((function(_this) {
	  return function() {
	    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
	      return setTimeout(callback, 1000 / 30);
	    };
	  };
	})(this))();


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	window.cancelAnimationFrame = ((function(_this) {
	  return function() {
	    return window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(id) {
	      return clearTimeout(id);
	    };
	  };
	})(this))();


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var MainVisual, TakumiObject3D,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	TakumiObject3D = __webpack_require__(18);
	
	MainVisual = (function() {
	  var _BUFFER_CAM_DISTANCE, _PLANE_SIZE, _TTL_IMG_PATHS;
	
	  _BUFFER_CAM_DISTANCE = 20;
	
	  _PLANE_SIZE = 100;
	
	  _TTL_IMG_PATHS = {
	    about: '/assets/img/headerTtlAbout.png',
	    blog: '/assets/img/headerTtlBlog.png',
	    bookmarks: '/assets/img/headerTtlBookmarks.png',
	    works: '/assets/img/headerTtlWorks.png'
	  };
	
	  function MainVisual() {
	    this.deviceMotionHandler = bind(this.deviceMotionHandler, this);
	    this.windowMouseMoveHandler = bind(this.windowMouseMoveHandler, this);
	    this.resize2 = bind(this.resize2, this);
	    this.resize = bind(this.resize, this);
	    this.resizeMainMesh = bind(this.resizeMainMesh, this);
	    this.draw2 = bind(this.draw2, this);
	    this.draw = bind(this.draw, this);
	    this.$container = $('#mainVisual');
	    this.$canvas = this.$container.find('canvas');
	    this.width = 100;
	    this.height = 100;
	    this.isWebGLSupported = false;
	    this.sensorAxisDir = -1;
	    if (utils.isiPhone || utils.isiPad) {
	      this.sensorAxisDir = 1;
	    }
	  }
	
	  MainVisual.prototype.init = function(callback) {
	    if (Detector.webgl) {
	      return this.initWebGL(callback);
	    } else {
	      log('not supported');
	      return typeof callback === "function" ? callback() : void 0;
	    }
	  };
	
	  MainVisual.prototype.initWebGL = function(callback) {
	    var pixelRatio;
	    this.isWebGLSupported = true;
	    this.renderer = new THREE.WebGLRenderer({
	      canvas: this.$canvas.get(0),
	      alpha: true,
	      antialias: true
	    });
	    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
	    this.renderer.setPixelRatio(pixelRatio);
	    this.bufferScene = new THREE.Scene();
	    this.bufferCamera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
	    this.bufferCamera.position.set(0, 0, _BUFFER_CAM_DISTANCE);
	    this.bufferScene.add(this.bufferCamera);
	    this.bufferCameraDefaultPos = this.bufferCamera.position.clone();
	    this.bufferCameraMatrix = new THREE.Matrix4();
	    this.takumiObject3D = new TakumiObject3D();
	    this.takumiObject3D.setTtlScale(this.width, this.height);
	    this.bufferScene.add(this.takumiObject3D);
	    this.initSimpleVersion();
	    Promise.all([this.initTtlImg('about'), this.initTtlImg('blog'), this.initTtlImg('bookmarks'), this.initTtlImg('works')]).then(function() {
	      return typeof callback === "function" ? callback() : void 0;
	    });
	  };
	
	  MainVisual.prototype.initTtlImg = function(name) {
	    return new Promise((function(_this) {
	      return function(resolve) {
	        var $img, imgPath;
	        imgPath = _TTL_IMG_PATHS[name];
	        return $img = $('<img>').one('load', function(e) {
	          var alpha, canvas, context, i, img, imgData, index, j, points, ref;
	          img = $img.get(0);
	          canvas = document.createElement('canvas');
	          context = canvas.getContext('2d');
	          canvas.width = img.width;
	          canvas.height = img.height;
	          context.drawImage(img, 0, 0, img.width, img.height);
	          imgData = context.getImageData(0, 0, img.width, img.height);
	          points = [];
	          for (i = j = 0, ref = imgData.data.length - 1; j < ref; i = j += 4) {
	            alpha = imgData.data[i + 3];
	            index = i / 4;
	            if (alpha > 0) {
	              points.push({
	                x: index % img.width - img.width * 0.5,
	                y: img.height * 0.5 - Math.floor(index / img.width)
	              });
	            }
	          }
	          _this.takumiObject3D.addAttributeFromImgData(name, points);
	          return resolve();
	        }).attr('src', imgPath);
	      };
	    })(this));
	  };
	
	  MainVisual.prototype.animateToTtl = function(name) {
	    this.clearToggleAnimationTimer();
	    this.takumiObject3D.animateToTtl(name);
	    if (this.mainMesh != null) {
	      return TweenMax.to(this.mainMesh.material.uniforms.noiseCoefficient, 1.0, {
	        overwrite: true,
	        value: 10,
	        ease: Expo.easeOut,
	        delay: 1
	      });
	    }
	  };
	
	  MainVisual.prototype.animateFromTtl = function() {
	    this.setToggleAnimationTimer();
	    this.takumiObject3D.animateFromTtl();
	    if (this.mainMesh != null) {
	      return TweenMax.to(this.mainMesh.material.uniforms.noiseCoefficient, 2.0, {
	        overwrite: true,
	        value: 0,
	        ease: Expo.easeOut
	      });
	    }
	  };
	
	  MainVisual.prototype.setToggleAnimationTimer = function() {
	    return this.toggleAnimationTimerId = setInterval(((function(_this) {
	      return function() {
	        return _this.takumiObject3D.toggleAnimation();
	      };
	    })(this)), 10000);
	  };
	
	  MainVisual.prototype.clearToggleAnimationTimer = function() {
	    return clearTimeout(this.toggleAnimationTimerId);
	  };
	
	  MainVisual.prototype.initFullVersion = function() {
	    this.buffer = new THREE.WebGLRenderTarget(this.width, this.height, {
	      magFilter: THREE.NearestFilter,
	      minFilter: THREE.NearestFilter,
	      wrapS: THREE.ClampToEdgeWrapping,
	      wrapT: THREE.ClampToEdgeWrapping,
	      format: THREE.RGBAFormat,
	      stencilBuffer: false,
	      generateMipmaps: false,
	      shareDepthFrom: null
	    });
	    this.scene = new THREE.Scene();
	    this.camera = new THREE.OrthographicCamera(-this.textureWidth / 2, this.textureWidth / 2, this.textureHeight / 2, -this.textureHeight / 2, -10, 10);
	    this.camera.target = new THREE.Vector3(0, 0, 0);
	    this.camera.position.z = 10;
	    this.mainMesh = new THREE.Mesh(new THREE.PlaneGeometry(_PLANE_SIZE, _PLANE_SIZE), new THREE.RawShaderMaterial({
	      vertexShader: __webpack_require__(22),
	      fragmentShader: __webpack_require__(23),
	      transparent: true,
	      uniforms: {
	        time: {
	          type: '1f',
	          value: 0
	        },
	        noiseCoefficient: {
	          type: '1f',
	          value: 1
	        },
	        resolution: {
	          type: '2f'
	        },
	        texture: {
	          type: 't'
	        }
	      }
	    }));
	    this.mainMesh.material.uniforms.texture.value = this.buffer.texture;
	    this.mainMesh.material.uniforms.resolution.value = new THREE.Vector2(this.width, this.height);
	    this.resizeMainMesh();
	    this.scene.add(this.mainMesh);
	    this.noiseCoefficient = 0;
	    return this.mainMesh.material.uniforms.noiseCoefficient.value = this.noiseCoefficient;
	  };
	
	  MainVisual.prototype.initSimpleVersion = function() {
	    this.draw = this.draw2;
	    return this.resize = this.resize2;
	  };
	
	  MainVisual.prototype.draw = function() {
	    this.takumiObject3D.update();
	    this.mainMesh.material.uniforms.time.value += 0.001;
	    this.renderer.render(this.bufferScene, this.bufferCamera, this.buffer);
	    this.renderer.render(this.scene, this.camera);
	  };
	
	  MainVisual.prototype.draw2 = function() {
	    this.takumiObject3D.update();
	    return this.renderer.render(this.bufferScene, this.bufferCamera);
	  };
	
	  MainVisual.prototype.resizeMainMesh = function() {
	    this.mainMesh.scale.set(this.width / _PLANE_SIZE, this.height / _PLANE_SIZE, 1);
	  };
	
	  MainVisual.prototype.resize = function(width, height) {
	    this.width = width;
	    this.height = height;
	    this.$container.css({
	      width: '',
	      height: this.height
	    });
	    this.bufferCamera.aspect = this.width / this.height;
	    this.bufferCamera.updateProjectionMatrix();
	    this.buffer.setSize(this.width, this.height);
	    this.takumiObject3D.setTtlScale(this.width, this.height);
	    this.resizeMainMesh();
	    this.mainMesh.material.uniforms.resolution.value.x = this.width;
	    this.mainMesh.material.uniforms.resolution.value.y = this.height;
	    this.camera.left = -this.width / 2;
	    this.camera.right = this.width / 2;
	    this.camera.top = this.height / 2;
	    this.camera.bottom = -this.height / 2;
	    this.camera.updateProjectionMatrix();
	    this.renderer.setSize(this.width, this.height);
	  };
	
	  MainVisual.prototype.resize2 = function(width, height) {
	    this.width = width;
	    this.height = height;
	    log('resize!!!', this.width, this.height);
	    this.$container.css({
	      width: '',
	      height: this.height
	    });
	    this.bufferCamera.aspect = this.width / this.height;
	    this.bufferCamera.updateProjectionMatrix();
	    this.renderer.setSize(this.width, this.height);
	    this.takumiObject3D.setTtlScale(this.width, this.height);
	  };
	
	  MainVisual.prototype.windowMouseMoveHandler = function(e) {
	    var dx, dy;
	    dx = utils.map(e.pageX / this.width, 0, 1, -1, 1);
	    dy = utils.map(e.pageY / this.height, 0, 1, -1, 1);
	    this.setBufferCameraPos(dx, dy);
	    this.isMoved = true;
	  };
	
	  MainVisual.prototype.deviceMotionHandler = function(e) {
	    var dx, dy;
	    dx = e.originalEvent.accelerationIncludingGravity.x / 4;
	    dy = e.originalEvent.accelerationIncludingGravity.y / 4;
	    this.setBufferCameraPos(dx * this.sensorAxisDir, dy * this.sensorAxisDir);
	  };
	
	  MainVisual.prototype.setBufferCameraPos = function(dx, dy) {
	    var pos;
	    pos = this.bufferCameraDefaultPos.clone();
	    this.bufferCameraMatrix.identity();
	    this.bufferCameraMatrix.makeRotationX(dy * Math.PI / 6);
	    pos.applyMatrix4(this.bufferCameraMatrix);
	    this.bufferCameraMatrix.makeRotationY(dx * Math.PI / 6);
	    pos.applyMatrix4(this.bufferCameraMatrix);
	    TweenMax.to(this.bufferCamera.position, 3.0, {
	      overwrite: true,
	      x: pos.x,
	      y: pos.y,
	      z: pos.z,
	      ease: Expo.easeOut,
	      onUpdate: (function(_this) {
	        return function() {
	          return _this.bufferCamera.lookAt(new THREE.Vector3());
	        };
	      })(this)
	    });
	  };
	
	  return MainVisual;
	
	})();
	
	module.exports = MainVisual;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var TakumiGeometry, TakumiObject3D,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	TakumiGeometry = __webpack_require__(19);
	
	TakumiObject3D = (function(superClass) {
	  var _NUM_ANIMATIONS, _TTL_LABELS;
	
	  extend(TakumiObject3D, superClass);
	
	  _NUM_ANIMATIONS = 6;
	
	  _TTL_LABELS = ['about', 'blog', 'bookmarks', 'works'];
	
	  function TakumiObject3D() {
	    TakumiObject3D.__super__.constructor.call(this);
	    this.geometry = new TakumiGeometry(0.4);
	    this.material = new THREE.RawShaderMaterial({
	      vertexShader: __webpack_require__(20),
	      fragmentShader: __webpack_require__(21),
	      transparent: true,
	      uniforms: {
	        time: {
	          type: '1f',
	          value: 0
	        },
	        ttlScale: {
	          type: '1f',
	          value: 1
	        },
	        animationParam1: {
	          type: '1f',
	          value: 0
	        },
	        animationParam2: {
	          type: '1f',
	          value: 0
	        },
	        animationParam3: {
	          type: '1f',
	          value: 0
	        },
	        animationParam4: {
	          type: '1f',
	          value: 0
	        },
	        animationParam5: {
	          type: '1f',
	          value: 0
	        },
	        animationParam6: {
	          type: '1f',
	          value: 0
	        },
	        animationParamTtlAbout: {
	          type: '1f',
	          value: 0
	        },
	        animationParamTtlBlog: {
	          type: '1f',
	          value: 0
	        },
	        animationParamTtlBookmarks: {
	          type: '1f',
	          value: 0
	        },
	        animationParamTtlWorks: {
	          type: '1f',
	          value: 0
	        }
	      }
	    });
	    this.takumiMesh = new THREE.Mesh(this.geometry, this.material);
	    this.animationNoArr = [];
	    this.currentAnimationNo = this.getNextAnimationNo();
	    this.material.uniforms["animationParam" + this.currentAnimationNo].value = 1;
	    this.add(this.takumiMesh);
	  }
	
	  TakumiObject3D.prototype.setTtlScale = function(width, height) {
	    var ttlScale;
	    if (width / height > 1) {
	      ttlScale = width / 20000;
	    } else {
	      ttlScale = height / 20000;
	    }
	    this.material.uniforms.ttlScale.value = ttlScale;
	  };
	
	  TakumiObject3D.prototype.update = function() {
	    this.material.uniforms.time.value += 0.001;
	  };
	
	  TakumiObject3D.prototype.backToAnimation1 = function() {
	    this.animate(this.currentAnimationNo, 0);
	    this.animate(1, 1);
	    this.currentAnimationNo = 1;
	  };
	
	  TakumiObject3D.prototype.animateTo = function(animationNo) {
	    this.currentAnimationNo = animationNo;
	    this.animate(1, 0);
	    this.animate(this.currentAnimationNo, 1);
	  };
	
	  TakumiObject3D.prototype.animateToTtl = function(name) {
	    var i, j, k, len, param, ref, ttl;
	    for (i = j = 1, ref = _NUM_ANIMATIONS; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
	      this.animate(i, 0, 2);
	    }
	    for (k = 0, len = _TTL_LABELS.length; k < len; k++) {
	      ttl = _TTL_LABELS[k];
	      param = ttl === name ? 1 : 0;
	      this.animate("Ttl" + (utils.capitalize(ttl)), param, 2);
	    }
	  };
	
	  TakumiObject3D.prototype.animateFromTtl = function() {
	    var j, len, ttl;
	    this.animate(this.currentAnimationNo, 1, 2);
	    for (j = 0, len = _TTL_LABELS.length; j < len; j++) {
	      ttl = _TTL_LABELS[j];
	      this.animate("Ttl" + (utils.capitalize(ttl)), 0, 2);
	    }
	  };
	
	  TakumiObject3D.prototype.toggleAnimation = function() {
	    if (this.currentAnimationNo === 1) {
	      return this.animateTo(this.getNextAnimationNo());
	    } else {
	      this.backToAnimation1();
	    }
	  };
	
	  TakumiObject3D.prototype.getNextAnimationNo = function() {
	    if (this.animationNoArr.length === 0) {
	      this.animationNoArr = _.chain(_.range(2, _NUM_ANIMATIONS + 1)).shuffle().value();
	    }
	    return this.animationNoArr.shift();
	  };
	
	  TakumiObject3D.prototype.animate = function(animationSuffix, value, duration) {
	    if (duration == null) {
	      duration = 3;
	    }
	    animationSuffix = animationSuffix.toString();
	    return TweenMax.to(this.material.uniforms["animationParam" + animationSuffix], duration, {
	      overwrite: true,
	      value: value,
	      ease: Linear.easeNone
	    });
	  };
	
	  TakumiObject3D.prototype.addAttributeFromImgData = function(name, points) {
	    return this.geometry.addAttributeFromImgData(name, points);
	  };
	
	  return TakumiObject3D;
	
	})(THREE.Object3D);
	
	module.exports = TakumiObject3D;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var TakumiGeometry, utils,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	utils = __webpack_require__(3);
	
	TakumiGeometry = (function(superClass) {
	  var _NUM_CUBES_DEPTH;
	
	  extend(TakumiGeometry, superClass);
	
	  _NUM_CUBES_DEPTH = 4;
	
	  function TakumiGeometry(cubeWidth) {
	    var d, h, i1, j, j1, k, k1, l, l1, m, m1, n, n1, o, o1, p, p1, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, s, t, u, v, w, x, y, z;
	    this.cubeWidth = cubeWidth != null ? cubeWidth : 1;
	    TakumiGeometry.__super__.constructor.call(this);
	    this.cubeWidthHalf = this.cubeWidth / 2;
	    this.takumiWidth = (7 + 9 + 1) * this.cubeWidth;
	    this.takumiHeight = 22 * this.cubeWidth;
	    this.takumiDepth = _NUM_CUBES_DEPTH * this.cubeWidth;
	    this.takumiWidthHalf = this.takumiWidth / 2;
	    this.takumiHeightHalf = this.takumiHeight / 2;
	    this.takumiDepthHalf = this.takumiDepth / 2;
	    this.vertices = [];
	    this.vertexIndices = [];
	    this.cubeCenters = [];
	    this.cubeRandoms = [];
	    this.triangleRandoms = [];
	    this.triangleCenters = [];
	    this.noiseValues = [];
	    for (w = j = 0; j < 7; w = ++j) {
	      for (h = k = 0; k < 3; h = ++k) {
	        for (d = l = 0, ref = _NUM_CUBES_DEPTH; 0 <= ref ? l < ref : l > ref; d = 0 <= ref ? ++l : --l) {
	          this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
	        }
	      }
	    }
	    for (w = m = 0; m < 3; w = ++m) {
	      for (h = n = 0; n < 14; h = ++n) {
	        for (d = o = 0, ref1 = _NUM_CUBES_DEPTH; 0 <= ref1 ? o < ref1 : o > ref1; d = 0 <= ref1 ? ++o : --o) {
	          this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf + 2 * this.cubeWidth, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf - 4 * this.cubeWidth, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
	        }
	      }
	    }
	    for (w = p = 0; p < 7; w = ++p) {
	      for (h = q = 0; q < 3; h = ++q) {
	        for (d = r = 0, ref2 = _NUM_CUBES_DEPTH; 0 <= ref2 ? r < ref2 : r > ref2; d = 0 <= ref2 ? ++r : --r) {
	          this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf - (22 - 3) * this.cubeWidth, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
	        }
	      }
	    }
	    for (w = s = 0; s < 9; w = ++s) {
	      for (h = t = 0; t < 3; h = ++t) {
	        for (d = u = 0, ref3 = _NUM_CUBES_DEPTH; 0 <= ref3 ? u < ref3 : u > ref3; d = 0 <= ref3 ? ++u : --u) {
	          this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf + 8 * this.cubeWidth, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
	        }
	      }
	    }
	    // for (w = v = 0; v < 3; w = ++v) {
	    //   for (h = x = 0; x < 3; h = ++x) {
	    //     for (d = y = 0, ref4 = _NUM_CUBES_DEPTH; 0 <= ref4 ? y < ref4 : y > ref4; d = 0 <= ref4 ? ++y : --y) {
	    //       this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf + 10 * this.cubeWidth, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf - 4 * this.cubeWidth, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
	    //     }
	    //   }
	    // }
	    // for (w = z = 0; z < 7; w = ++z) {
	    //   for (h = i1 = 0; i1 < 3; h = ++i1) {
	    //     for (d = j1 = 0, ref5 = _NUM_CUBES_DEPTH; 0 <= ref5 ? j1 < ref5 : j1 > ref5; d = 0 <= ref5 ? ++j1 : --j1) {
	    //       this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf + 10 * this.cubeWidth, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf - 8 * this.cubeWidth, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
	    //     }
	    //   }
	    // }
	    // for (w = k1 = 0; k1 < 3; w = ++k1) {
	    //   for (h = l1 = 0; l1 < 6; h = ++l1) {
	    //     for (d = m1 = 0, ref6 = _NUM_CUBES_DEPTH; 0 <= ref6 ? m1 < ref6 : m1 > ref6; d = 0 <= ref6 ? ++m1 : --m1) {
	    //       this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf + 14 * this.cubeWidth, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf - 12 * this.cubeWidth, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
	    //     }
	    //   }
	    // }
          for (w = k1 = 0; k1 < 3; w = ++k1) {
            for (h = l1 = 0; l1 < 14; h = ++l1) {
              for (d = m1 = 0, ref6 = _NUM_CUBES_DEPTH; 0 <= ref6 ? m1 < ref6 : m1 > ref6; d = 0 <= ref6 ? ++m1 : --m1) {
                this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf + 14 * this.cubeWidth, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf - 4 * this.cubeWidth, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
              }
            }
          }
	    for (w = n1 = 0; n1 < 9; w = ++n1) {
	      for (h = o1 = 0; o1 < 3; h = ++o1) {
	        for (d = p1 = 0, ref7 = _NUM_CUBES_DEPTH; 0 <= ref7 ? p1 < ref7 : p1 > ref7; d = 0 <= ref7 ? ++p1 : --p1) {
	          this.addCubeVertices(w * this.cubeWidth - this.takumiWidthHalf + this.cubeWidthHalf + 8 * this.cubeWidth, h * -this.cubeWidth + this.takumiHeightHalf - this.cubeWidthHalf - (22 - 3) * this.cubeWidth, d * -this.cubeWidth + this.takumiDepthHalf - this.cubeWidthHalf);
	        }
	      }
	    }
	    this.addAttribute('position', new THREE.BufferAttribute(new Float32Array(this.vertices), 3));
	    this.addAttribute('vertexIndex', new THREE.BufferAttribute(new Uint16Array(this.vertexIndices), 1));
	    this.addAttribute('cubeCenter', new THREE.BufferAttribute(new Float32Array(this.cubeCenters), 3));
	    this.addAttribute('cubeRandom', new THREE.BufferAttribute(new Float32Array(this.cubeRandoms), 3));
	    this.addAttribute('triangleCenter', new THREE.BufferAttribute(new Float32Array(this.triangleCenters), 3));
	    this.addAttribute('triangleRandom', new THREE.BufferAttribute(new Float32Array(this.triangleRandoms), 3));
	    this.addAttribute('noiseValue', new THREE.BufferAttribute(new Float32Array(this.noiseValues), 1));
	    this.computeVertexNormals();
	    delete this.vertices;
	    delete this.cubeCenters;
	    delete this.vertexIndices;
	    delete this.cubeRandoms;
	    delete this.triangleRandoms;
	    delete this.noiseValues;
	  }
	
	  TakumiGeometry.prototype.addAttributeFromImgData = function(name, points) {
	    var attr, i, j, k, len, numTriangles, point;
	    numTriangles = this.attributes.vertexIndex.count / 3;
	    if (numTriangles > points.length) {
	      points = points.concat(points);
	    }
	    points = _.sample(points, numTriangles);
	    attr = [];
	    for (j = 0, len = points.length; j < len; j++) {
	      point = points[j];
	      for (i = k = 0; k < 3; i = ++k) {
	        attr.push(point.x);
	        attr.push(point.y);
	      }
	    }
	    this.addAttribute(name + "Pos", new THREE.BufferAttribute(new Float32Array(attr), 2));
	    attr = null;
	  };
	
	  TakumiGeometry.prototype.addCubeVertices = function(offsetX, offsetY, offsetZ) {
	    var cubeRandom, cubeVertices, geometry, i, j, triangleCenter, triangleRandomBaseValue, vertex;
	    if (offsetX == null) {
	      offsetX = 0;
	    }
	    if (offsetY == null) {
	      offsetY = 0;
	    }
	    if (offsetZ == null) {
	      offsetZ = 0;
	    }
	    geometry = new THREE.BufferGeometry();
	    this.cubeWidthHalf = this.cubeWidth / 2;
	    cubeVertices = [-this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, -this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, -this.cubeWidthHalf + offsetY, this.cubeWidthHalf + offsetZ, this.cubeWidthHalf + offsetX, this.cubeWidthHalf + offsetY, -this.cubeWidthHalf + offsetZ];
	    cubeRandom = [this.getRandomValue(), this.getRandomValue(), this.getRandomValue()];
	    for (i = j = 0; j < 36; i = ++j) {
	      this.vertexIndices.push(this.vertexIndices.length);
	      this.cubeRandoms.push(cubeRandom[0]);
	      this.cubeRandoms.push(cubeRandom[1]);
	      this.cubeRandoms.push(cubeRandom[2]);
	      this.cubeCenters.push(offsetX);
	      this.cubeCenters.push(offsetY);
	      this.cubeCenters.push(offsetZ);
	      vertex = new THREE.Vector3(cubeVertices[i * 3], cubeVertices[i * 3 + 1], cubeVertices[i * 3 + 2]);
	      vertex.normalize();
	      this.noiseValues.push(tkmh.PerlinNoise.noise(vertex.x, vertex.y, vertex.z));
	      if (i % 3 === 0) {
	        triangleRandomBaseValue = [Math.random(), Math.random(), Math.random()];
	        triangleCenter = [(cubeVertices[i * 3] + cubeVertices[i * 3 + 3] + cubeVertices[i * 3 + 6]) / 3, (cubeVertices[i * 3 + 1] + cubeVertices[i * 3 + 1 + 3] + cubeVertices[i * 3 + 1 + 6]) / 3, (cubeVertices[i * 3 + 2] + cubeVertices[i * 3 + 2 + 3] + cubeVertices[i * 3 + 2 + 6]) / 3];
	      }
	      this.triangleRandoms.push(this.getRandomValue2(triangleRandomBaseValue[0], 0.01));
	      this.triangleRandoms.push(this.getRandomValue2(triangleRandomBaseValue[1], 0.01));
	      this.triangleRandoms.push(this.getRandomValue2(triangleRandomBaseValue[2], 0.01));
	      this.triangleCenters.push(triangleCenter[0]);
	      this.triangleCenters.push(triangleCenter[1]);
	      this.triangleCenters.push(triangleCenter[2]);
	    }
	    return Array.prototype.push.apply(this.vertices, cubeVertices);
	  };
	
	  TakumiGeometry.prototype.getRandomValue = function() {
	    return utils.map(Math.random(), 0, 1, -1, 1);
	  };
	
	  TakumiGeometry.prototype.getRandomValue2 = function(baseValue, addValue) {
	    return utils.map(baseValue - Math.random() * addValue, 0, 1, -1, 1);
	  };
	
	  return TakumiGeometry;
	
	})(THREE.BufferGeometry);
	
	module.exports = TakumiGeometry;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float time;\nuniform float ttlScale;\nuniform float animationParam1;\nuniform float animationParam2;\nuniform float animationParam3;\nuniform float animationParam4;\nuniform float animationParam5;\nuniform float animationParam6;\nuniform float animationParamTtlAbout;\nuniform float animationParamTtlBlog;\nuniform float animationParamTtlBookmarks;\nuniform float animationParamTtlWorks;\n\nattribute vec3 position;\nattribute vec3 cubeCenter;\nattribute vec3 cubeRandom;\nattribute vec3 triangleRandom;\nattribute vec3 triangleCenter;\nattribute vec3 normal;\nattribute float noiseValue;\nattribute float vertexIndex;\n\nattribute vec2 aboutPos;\nattribute vec2 blogPos;\nattribute vec2 bookmarksPos;\nattribute vec2 worksPos;\n\nvarying vec4 vColor;\n\nfloat PI_1_0 = 3.1415926535897932384626433832795;\n\n\nfloat map_2_1(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {\n  if(clamp == true) {\n    if(value < inputMin) return outputMin;\n    if(value > inputMax) return outputMax;\n  }\n\n  float p = (outputMax - outputMin) / (inputMax - inputMin);\n  return ((value - inputMin) * p) + outputMin;\n}\n\n\nvec3 hsv2rgb_3_2(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\n\nvec3 rotateVec3_4_3(vec3 p, float angle, vec3 axis){\n  vec3 a = normalize(axis);\n  float s = sin(angle);\n  float c = cos(angle);\n  float r = 1.0 - c;\n  mat3 m = mat3(\n    a.x * a.x * r + c,\n    a.y * a.x * r + a.z * s,\n    a.z * a.x * r - a.y * s,\n    a.x * a.y * r - a.z * s,\n    a.y * a.y * r + c,\n    a.z * a.y * r + a.x * s,\n    a.x * a.z * r + a.y * s,\n    a.y * a.z * r - a.x * s,\n    a.z * a.z * r + c\n  );\n  return m * p;\n}\n\n\nfloat exponentialInOut_6_4(float t) {\n  return t == 0.0 || t == 1.0\n    ? t\n    : t < 0.5\n      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)\n      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_5_5(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_5_5(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_5_6(vec3 x) {\n  return mod289_5_5(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_5_7(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_5_5(i); // Avoid truncation effects in permutation\n  vec3 p = permute_5_6( permute_5_6( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n\n\nfloat getRad(float scale, float offset) {\n  return map_2_1(mod(time * scale + offset, PI_1_0 * 2.0), 0.0, PI_1_0 * 2.0, -PI_1_0, PI_1_0, true);\n}\n\nfloat getAnimationParam(float animationParam, float randomValue) {\n  float p = clamp(-map_2_1(randomValue, -1.0, 1.0, 0.0, 0.6, true) + animationParam * 1.5, 0.0, 1.0);\n  p = exponentialInOut_6_4(p);\n  return p;\n}\n\nvoid setTtlAnimation(float animationParam, vec2 ttlPos, inout vec3 pos) {\n  float p = getAnimationParam(animationParam, triangleRandom.x);\n  if(p > 0.0) {\n    pos = pos - triangleCenter * p;\n    pos *= (1.0 - 0.01 * p * cubeRandom.x);\n    float scale = 1.0 + (ttlScale * 20.0 * p - 1.0) * p;\n    pos *= scale;\n    float rad1 = getRad(40.0, noiseValue * 10.0);\n    float rad2 = getRad(40.0, noiseValue * 10.0);\n    pos = rotateVec3_4_3(pos, p * rad1, vec3(1.0, 0, 0));\n    pos = rotateVec3_4_3(pos, p * rad2, vec3(0, 1.0, 0));\n    pos.x *= 1.0 - p * 0.6;\n    pos.z *= 1.0 - p * 0.6;\n    vec3 n = rotateVec3_4_3(normal, p * rad1, vec3(1.0, 0, 0));\n    n = rotateVec3_4_3(n, p * rad2, vec3(0, 1.0, 0));\n    pos += (p * vec3(ttlPos * ttlScale, 0.0));\n    float noise = snoise_5_7(pos.xy / 300.0 / scale);\n    pos += p * vec3(\n      sin((time + noise) * 100.0) * 0.2 * scale,\n      cos((time + noise) * 60.0) * 0.2 * scale,\n      0\n    );\n  }\n}\n\nvoid main() {\n  vec3 pos = position;\n  vec3 n = normal;\n  float rad1, rad2;\n\n  // animation1\n  float p = exponentialInOut_6_4(animationParam1);\n  if(p > 0.0) {\n    rad1 = getRad(3.0, 0.0);\n    rad2 = getRad(5.0, 0.0);\n    pos = rotateVec3_4_3(pos, p * rad1, vec3(1.0, 0, 0));\n    pos = rotateVec3_4_3(pos, p * rad2, vec3(0, 1.0, 0));\n    n = rotateVec3_4_3(n, p * rad1, vec3(1.0, 0, 0));\n    n = rotateVec3_4_3(n, p * rad2, vec3(0, 1.0, 0));\n    pos += (p * sin(getRad(200.0, noiseValue * 200.0)) * noiseValue * 0.06 * normalize(pos));\n  }\n\n  // animation2\n  p = getAnimationParam(animationParam2, cubeRandom.x);\n  if(p > 0.0) {\n    pos = pos - cubeCenter * p;\n    pos *= (1.0 + p);\n    rad1 = PI_1_0 * 2.0 * sin(getRad(1.0, cubeRandom.x));\n    rad2 = PI_1_0 * 2.0 * sin(getRad(1.0, cubeRandom.y));\n    pos = rotateVec3_4_3(pos, p * rad1, vec3(1.0, 0, 0));\n    pos = rotateVec3_4_3(pos, p * rad2, vec3(0, 1.0, 0));\n    n = rotateVec3_4_3(n, p * rad1, vec3(1.0, 0, 0));\n    n = rotateVec3_4_3(n, p * rad2, vec3(0, 1.0, 0));\n    vec3 cubeCenterTo = cubeRandom * 20.0;\n    pos += (p * cubeCenterTo);\n    pos = rotateVec3_4_3(pos, p * getRad(1.0, 0.0), vec3(0.3, 1.0, 0.2));\n    pos += (p * sin(getRad(160.0, noiseValue * 160.0)) * noiseValue * 0.3 * normalize(cubeCenterTo - pos));\n  }\n\n\n  // animation3\n  p = getAnimationParam(animationParam3, triangleRandom.x);\n  if(p > 0.0) {\n    pos = pos - triangleCenter * p;\n    rad1 = getRad(40.0, triangleRandom.x);\n    rad2 = getRad(40.0, triangleRandom.y);\n    pos = rotateVec3_4_3(pos, p * rad1, vec3(1.0, 0, 0));\n    pos = rotateVec3_4_3(pos, p * rad2, vec3(0, 1.0, 0));\n    n = rotateVec3_4_3(n, p * rad1, vec3(1.0, 0, 0));\n    n = rotateVec3_4_3(n, p * rad2, vec3(0, 1.0, 0));\n    float radius = 30.0 * map_2_1(triangleRandom.y, -1.0, 1.0, 0.0, 1.0, true);\n    float anim2CircleRad = getRad(6.0, triangleRandom.x * 6.0);\n    pos += vec3(\n      p * radius * cos(anim2CircleRad),\n      p * 2.0 * sin(getRad(4.0, triangleRandom.y) * 10.0),\n      p * radius * sin(anim2CircleRad)\n    );\n    pos = rotateVec3_4_3(pos, p * getRad(4.0, 0.0), vec3(0.3, 1.0, sin(time)));\n    n = rotateVec3_4_3(n, p * getRad(4.0, 0.0), vec3(0.3, 1.0, sin(time)));\n  }\n\n\n  // animation4\n  p = getAnimationParam(animationParam4, triangleRandom.x);\n  if(p > 0.0) {\n    pos = pos - triangleCenter * p;\n    if(mod(vertexIndex, 3.0) > 0.0) {\n      pos.z += (p * (4.0 * triangleRandom.z * sin(triangleRandom.z * 100.0)));\n      pos = rotateVec3_4_3(pos, p * getRad(10.0, triangleRandom.x * 10.0), vec3(1.0, 0, 0));\n      pos = rotateVec3_4_3(pos, p * getRad(10.0, triangleRandom.y * 10.0), vec3(0, 1.0, 0));\n      pos += (p * sin(getRad(60.0, noiseValue * 60.0)) * noiseValue * 6.0 * normalize(pos));\n    }\n  }\n\n  // animation5\n  p = getAnimationParam(animationParam5, triangleRandom.x);\n  if(p > 0.0) {\n    pos = pos - (pos - normalize(pos) * 3.0) * p;\n    rad1 = getRad(10.0, triangleRandom.x * 10.0);\n    rad2 = getRad(10.0, triangleRandom.y * 10.0);\n    pos = rotateVec3_4_3(pos, p * rad1, vec3(1.0, 0, 0));\n    pos = rotateVec3_4_3(pos, p * rad2, vec3(0, 1.0, 0));\n    n = rotateVec3_4_3(n, p * rad1, vec3(1.0, 0, 0));\n    n = rotateVec3_4_3(n, p * rad2, vec3(0, 1.0, 0));\n    pos += (p * sin(getRad(10.0, triangleRandom.z * 10.0)) * 3.0 * normalize(pos));\n  }\n\n\n  // animation6\n  p = getAnimationParam(animationParam6, triangleRandom.x);\n  if(p > 0.0) {\n    pos = pos - triangleCenter * p;\n    rad1 = getRad(30.0, triangleRandom.x * 10.0);\n    rad2 = getRad(30.0, triangleRandom.y * 10.0);\n    pos = rotateVec3_4_3(pos, p * rad1, vec3(1.0, 0, 0));\n    pos = rotateVec3_4_3(pos, p * rad2, vec3(0, 1.0, 0));\n    float triangleIndex = floor(vertexIndex / 3.0);\n    float cubeIndex = mod(mod(triangleIndex, 41.0), 3.0);\n    float size = 2.0 + cubeIndex * 2.0;\n    float t = mod(time * 10.0 + triangleRandom.z * 10.0, 4.0);\n    pos.x += (map_2_1(t, 0.0, 1.0, -1.0, 1.0, true) * size * p - size * p);\n    pos.y += (map_2_1(t, 1.0, 2.0, -1.0, 1.0, true) * size * p - size * p);\n    pos.x -= map_2_1(t, 2.0, 3.0, -1.0, 1.0, true) * size * p;\n    pos.y -= map_2_1(t, 3.0, 4.0, -1.0, 1.0, true) * size * p;\n    pos.z -= size * p;\n    pos = rotateVec3_4_3(pos, p * PI_1_0 * mod(triangleIndex, 2.0), vec3(1.0, 0, 0));\n    pos = rotateVec3_4_3(pos, p * PI_1_0 / 2.0 * mod(triangleIndex, 3.0), vec3(0, 1.0, 0));\n    pos = rotateVec3_4_3(pos, p * PI_1_0 / 2.0 * mod(triangleIndex, 4.0), vec3(0, 0, 1.00));\n    pos = rotateVec3_4_3(pos, p * time * 2.0 * (cubeIndex + 1.0), vec3(1.0, 0, 0));\n    pos = rotateVec3_4_3(pos, p * time * 2.0 * (cubeIndex + 1.0), vec3(0, 1.0, 0));\n  }\n\n  // title\n  setTtlAnimation(animationParamTtlAbout, aboutPos, pos);\n  setTtlAnimation(animationParamTtlBlog, blogPos, pos);\n  setTtlAnimation(animationParamTtlBookmarks, bookmarksPos, pos);\n  setTtlAnimation(animationParamTtlWorks, worksPos, pos);\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n\n  float len = length(pos);\n  vColor = vec4(hsv2rgb_3_2(vec3(\n    map_2_1(sin(getRad(2.0, noiseValue * 0.6 + len * (animationParam5 * 0.2 + animationParam6 * 0.2))), -1.0, 1.0, 0.0, 1.0, true),\n    map_2_1(cos(getRad(3.0, noiseValue * 2.0 + len * (animationParam2 * 2.0 + animationParam3 * 3.0))), -1.0, 1.0, 0.3, 0.5, true),\n    map_2_1(cos(getRad(1.0, noiseValue * 0.3)), -1.0, 1.0, 1.6, 2.0, true) + animationParam4 * 0.2\n  )), 1.0);\n\n  // light\n  float diffuse  = clamp(dot(n, normalize(vec3(1.0, 1.0, 1.0))) , 0.5, 1.0);\n  vColor *= vec4(vec3(diffuse), 1.0);\n}\n"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nvarying vec4 vColor;\n\nvoid main(){\n  gl_FragColor = vColor;\n}\n"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n"

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D texture;\nuniform float noiseCoefficient;\nuniform float time;\nuniform vec2 resolution;\n\nvarying vec2 vUv;\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_1_0(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_1_1(vec3 x) {\n  return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_1_2(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_1_0(i); // Avoid truncation effects in permutation\n  vec3 p = permute_1_1( permute_1_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n\nvoid main(){\n  float noise = snoise_1_2(gl_FragCoord.xy / resolution.y / 50.0);\n  vec2 texCoord = vec2(\n    vUv.x + (sin((time + noise) * 100.0) * 2.0 / resolution.x) * noiseCoefficient,\n    vUv.y + (cos((time + noise) * 60.0) * 2.0 / resolution.y) * noiseCoefficient\n  );\n  gl_FragColor = texture2D(texture, texCoord);\n}\n"

/***/ })
/******/ ]);
//# sourceMappingURL=common.js.map
