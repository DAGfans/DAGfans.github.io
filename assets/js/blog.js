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

	var Blog;
	
	Blog = __webpack_require__(2);
	
	$(function() {
	  return new Blog();
	});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var Blog, Contents,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Contents = __webpack_require__(3);
	
	Blog = (function(superClass) {
	  extend(Blog, superClass);
	
	  function Blog() {
	    Blog.__super__.constructor.call(this, 'blog');
	  }
	
	  Blog.prototype.init = function() {
	    Blog.__super__.init.call(this);
	    this.initThumbs();
	    this.initSearchPanel('blog');
	    this.initImgs('article.main .img img');
	    this.initBtnBack('blog');
	    this.$contentsInner.find('code > pre').each(function(index, block) {
	      return hljs.highlightBlock(block);
	    });
	    this.$window.on('resize.contents', this.resizeSearchPanel).trigger('resize.contents');
	  };
	
	  Blog.prototype.start = function() {
	    tkmh.animateToTtl('blog');
	  };
	
	  Blog.prototype.reset = function() {
	    this.$window.off('resize.contents');
	    this.resetSearchPanel();
	    this.resetBtnBack();
	  };
	
	  return Blog;
	
	})(Contents);
	
	module.exports = Blog;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var Contents, Thumb,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	Thumb = __webpack_require__(4);
	
	Contents = (function() {
	  function Contents(id) {
	    this.id = id != null ? id : '';
	    this.resizeSearchPanel = bind(this.resizeSearchPanel, this);
	    tkmh.currentContents = this;
	  }
	
	  Contents.prototype.reset = function() {};
	
	  Contents.prototype.start = function() {};
	
	  Contents.prototype.init = function() {
	    this.$window = $(window);
	    this.$body = $('body');
	    this.$contents = $('#contents');
	    this.$contentsInner = $('#contentsInner');
	    this.$mainVisual = $('#mainVisual');
	    this.$globalHeader = $('#globalHeader');
	  };
	
	  Contents.prototype.initThumbs = function() {
	    this.initImgs('.articles .thumb img');
	  };
	
	  Contents.prototype.initImgs = function(selector) {
	    this.$contentsInner.find(selector).each(function(index, img) {
	      return utils.preloadImg(img.src).then(function() {
	        return $(img).one(utils.transitionend(), function(e) {
	          e.stopPropagation();
	          return false;
	        }).addClass('loaded');
	      });
	    });
	  };
	
	  Contents.prototype.initThumbsInteraction = function(selector, widthSegments, heightSegments) {
	    var self;
	    if (widthSegments == null) {
	      widthSegments = 10;
	    }
	    if (heightSegments == null) {
	      heightSegments = 10;
	    }
	    if (!utils.isDesktop) {
	      return;
	    }
	    self = this;
	    this.thumbs = [];
	    this.$contentsInner.find(selector).each(function(index, img) {
	      var thumb;
	      thumb = new Thumb($(this), widthSegments, heightSegments);
	      self.thumbs.push(thumb);
	      return thumb.init();
	    });
	  };
	
	  Contents.prototype.disposeThumbsInteraction = function() {
	    var i, len, ref, thumb;
	    if (!utils.isDesktop) {
	      return;
	    }
	    ref = this.thumbs;
	    for (i = 0, len = ref.length; i < len; i++) {
	      thumb = ref[i];
	      thumb.dispose();
	    }
	  };
	
	  Contents.prototype.initBtnBack = function(dir) {
	    this.$btnBack = this.$searchPanel.find('.btnBack').on('click', (function(_this) {
	      return function(e) {
	        tkmh.back("/" + dir + "/");
	        return false;
	      };
	    })(this));
	  };
	
	  Contents.prototype.resetBtnBack = function() {
	    this.$btnBack.off('click');
	  };
	
	  Contents.prototype.initSearchPanel = function(dir) {
	    var $keywordInput, toggleContent;
	    this.$searchPanel = $('#searchPanel');
	    this.$categories = this.$searchPanel.find('.categories');
	    this.$tags = this.$searchPanel.find('.tags');
	    this.$monthlyArchives = this.$searchPanel.find('.monthlyArchives');
	    this.$keyword = this.$searchPanel.find('.keyword');
	    $keywordInput = this.$keyword.find('input');
	    this.$keyword.find('.btnSubmit').on('click', (function(_this) {
	      return function(e) {
	        // tkmh.searchByKeyword(dir, "?s=" + ($keywordInput.val()));
			  $('input.gsc-input').val($keywordInput.val());
              $('.gsc-search-button').click();
	        return false;
	      };
	    })(this));
	    toggleContent = (function(_this) {
	      return function($btn, $contents, toggle) {
	        if (toggle == null) {
	          toggle = true;
	        }
	        if (toggle) {
	          $btn.toggleClass('closed');
	          return $contents.toggleClass('closed');
	        } else {
	          $btn.addClass('closed');
	          return $contents.addClass('closed');
	        }
	      };
	    })(this);
	    this.$btnCategories = this.$searchPanel.find('.btnCategories').on('click', (function(_this) {
	      return function(e) {
	        toggleContent(_this.$btnCategories, _this.$categories);
	        toggleContent(_this.$btnTags, _this.$tags, false);
	        toggleContent(_this.$btnMonthlyArchives, _this.$monthlyArchives, false);
	        toggleContent(_this.$btnKeyword, _this.$keyword, false);
	        return false;
	      };
	    })(this));
	    this.$btnTags = this.$searchPanel.find('.btnTags').on('click', (function(_this) {
	      return function(e) {
	        toggleContent(_this.$btnCategories, _this.$categories, false);
	        toggleContent(_this.$btnTags, _this.$tags);
	        toggleContent(_this.$btnMonthlyArchives, _this.$monthlyArchives, false);
	        toggleContent(_this.$btnKeyword, _this.$keyword, false);
	        return false;
	      };
	    })(this));
	    this.$btnMonthlyArchives = this.$searchPanel.find('.btnMonthlyArchives').on('click', (function(_this) {
	      return function(e) {
	        toggleContent(_this.$btnCategories, _this.$categories, false);
	        toggleContent(_this.$btnTags, _this.$tags, false);
	        toggleContent(_this.$btnMonthlyArchives, _this.$monthlyArchives);
	        toggleContent(_this.$btnKeyword, _this.$keyword, false);
	        return false;
	      };
	    })(this));
	    this.$btnKeyword = this.$searchPanel.find('.btnKeyword').on('click', (function(_this) {
	      return function(e) {
	        toggleContent(_this.$btnCategories, _this.$categories, false);
	        toggleContent(_this.$btnTags, _this.$tags, false);
	        toggleContent(_this.$btnMonthlyArchives, _this.$monthlyArchives, false);
	        toggleContent(_this.$btnKeyword, _this.$keyword);
	        return false;
	      };
	    })(this));
	  };
	
	  Contents.prototype.resizeSearchPanel = function() {
	    this.$categories.css('height', this.$categories.find('ul').outerHeight());
	    this.$tags.css('height', this.$tags.find('ul').outerHeight());
	    this.$monthlyArchives.css('height', this.$monthlyArchives.find('ul').outerHeight());
	    this.$keyword.css('height', this.$keyword.find('form').outerHeight());
	  };
	
	  Contents.prototype.resetSearchPanel = function() {
	    this.$btnCategories.off('click');
	    this.$btnTags.off('click');
	    this.$btnMonthlyArchives.off('click');
	    this.$btnKeyword.off('click');
	  };
	
	  return Contents;
	
	})();
	
	module.exports = Contents;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var Thumb,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	Thumb = (function() {
	  var _GEOMETRY_SIZE;
	
	  _GEOMETRY_SIZE = 100;
	
	  function Thumb($container, widthSegments, heightSegments) {
	    this.$container = $container;
	    this.widthSegments = widthSegments != null ? widthSegments : 20;
	    this.heightSegments = heightSegments != null ? heightSegments : 10;
	    this.resize = bind(this.resize, this);
	    this.draw = bind(this.draw, this);
	    this.isWebGLSupported = false;
	  }
	
	  Thumb.prototype.init = function(callback) {
	    if (Detector.webgl) {
	      this.initWebGL(callback);
	    } else {
	      log('not supported');
	      if (typeof callback === "function") {
	        callback();
	      }
	    }
	  };
	
	  Thumb.prototype.initWebGL = function(callback) {
	    var $img, i, imgPath, j, noiseValues, numVertices, pixelRatio, ref;
	    this.isWebGLSupported = true;
	    this.width = this.$container.outerWidth();
	    this.height = this.$container.outerHeight();
	    this.renderer = new THREE.WebGLRenderer({
	      alpha: true,
	      antialias: true
	    });
	    this.$container.get(0).appendChild(this.renderer.domElement);
	    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
	    this.renderer.setPixelRatio(pixelRatio);
	    this.scene = new THREE.Scene();
	    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
	    this.camera.position.set(0, 0, 1);
	    this.scene.add(this.camera);
	    numVertices = (this.widthSegments + 1) * (this.heightSegments + 1);
	    noiseValues = [];
	    for (i = j = 0, ref = numVertices; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      noiseValues.push(utils.map(Math.random(), 0, 1, -1, 1, true));
	    }
	    this.geometry = new THREE.PlaneBufferGeometry(_GEOMETRY_SIZE, _GEOMETRY_SIZE, this.widthSegments, this.heightSegments);
	    this.geometry.addAttribute('vertexIndex', new THREE.BufferAttribute(new Uint16Array(_.range(numVertices)), 1));
	    this.geometry.addAttribute('noiseValue', new THREE.BufferAttribute(new Float32Array(noiseValues), 1));
	    noiseValues = null;
	    this.material = new THREE.RawShaderMaterial({
	      vertexShader: __webpack_require__(5),
	      fragmentShader: __webpack_require__(6),
	      transparent: true,
	      side: THREE.DoubleSide,
	      uniforms: {
	        animationParam: {
	          type: '1f',
	          value: 0
	        },
	        texture: {
	          type: 't'
	        }
	      }
	    });
	    this.mesh = new THREE.Mesh(this.geometry, this.material);
	    this.scene.add(this.mesh);
	    $img = this.$container.find('img');
	    imgPath = $img.attr('src');
	    this.material.uniforms.texture.value = new THREE.TextureLoader().load(imgPath, (function(_this) {
	      return function(texture) {
	        _this.resize();
	        _this.draw();
	        $img.remove();
	        $img = null;
	        return _this.$container.find('.detail').remove();
	      };
	    })(this));
	    this.$container.on({
	      mouseover: (function(_this) {
	        return function() {
	          return TweenMax.to(_this.material.uniforms.animationParam, 1.4, {
	            value: 1,
	            ease: Linear.easeNone,
	            overwrite: true,
	            onUpdate: function() {
	              return _this.draw();
	            }
	          });
	        };
	      })(this),
	      mouseout: (function(_this) {
	        return function() {
	          return TweenMax.to(_this.material.uniforms.animationParam, 1.4, {
	            value: 0,
	            ease: Linear.easeNone,
	            overwrite: true,
	            onUpdate: function() {
	              return _this.draw();
	            }
	          });
	        };
	      })(this)
	    });
	  };
	
	  Thumb.prototype.draw = function() {
	    this.renderer.render(this.scene, this.camera);
	  };
	
	  Thumb.prototype.resizeMesh = function() {
	    this.mesh.scale.set(this.width / _GEOMETRY_SIZE, this.height / _GEOMETRY_SIZE, 1.0);
	  };
	
	  Thumb.prototype.dispose = function() {
	    this.$container.off('mouseover');
	    this.$container.off('mouseout');
	    this.geometry.dispose();
	    this.material.uniforms.texture.value.dispose();
	    this.material.dispose();
	    this.scene.remove(this.mesh);
	    this.scene.remove(this.camera);
	    this.renderer.dispose();
	  };
	
	  Thumb.prototype.resize = function() {
	    var cameraZ;
	    this.width = this.$container.outerWidth();
	    this.height = this.$container.outerHeight();
	    this.camera.aspect = this.width / this.height;
	    this.camera.updateProjectionMatrix();
	    cameraZ = -(this.height / 2) / Math.tan((this.camera.fov * Math.PI / 180) / 2);
	    this.camera.position.set(0, 0, -cameraZ);
	    this.resizeMesh();
	    this.renderer.setSize(this.width, this.height);
	  };
	
	  return Thumb;
	
	})();
	
	module.exports = Thumb;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\nattribute float vertexIndex;\nattribute float noiseValue;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float animationParam;\n\nvarying vec2 vUv;\n\nfloat map_1_0(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {\n  if(clamp == true) {\n    if(value < inputMin) return outputMin;\n    if(value > inputMax) return outputMax;\n  }\n\n  float p = (outputMax - outputMin) / (inputMax - inputMin);\n  return ((value - inputMin) * p) + outputMin;\n}\n\n\nfloat exponentialInOut_2_1(float t) {\n  return t == 0.0 || t == 1.0\n    ? t\n    : t < 0.5\n      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)\n      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;\n}\n\n\n\n\nfloat getAnimationParam(float animationParam, float randomValue) {\n  float p = clamp(-map_1_0(randomValue, -1.0, 1.0, 0.0, 0.5, true) + animationParam * 1.6, 0.0, 1.0);\n  p = exponentialInOut_2_1(p);\n  return p;\n}\n\nvoid main() {\n  vUv = uv;\n  vec3 pos = position;\n  float p = getAnimationParam(animationParam, noiseValue);\n  pos.y += p * -120.0;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}\n"

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D texture;\nvarying vec2 vUv;\n\nvoid main(){\n  gl_FragColor = texture2D(texture, vUv);\n}\n"

/***/ })
/******/ ]);
//# sourceMappingURL=blog.js.map