if ("undefined" == typeof jQuery) throw new Error("AdminLTE requires jQuery");
!(function (t) {
  "use strict";
  function e(e, i) {
    if (
      ((this.element = e),
      (this.options = i),
      (this.$overlay = t(i.overlayTemplate)),
      "" === i.source)
    )
      throw new Error(
        "Source url was not defined. Please specify a url in your BoxRefresh source option."
      );
    this._setUpListeners(), this.load();
  }
  function i(i) {
    return this.each(function () {
      var o = t(this),
        r = o.data(n);
      if (!r) {
        var s = t.extend({}, a, o.data(), "object" == typeof i && i);
        o.data(n, (r = new e(o, s)));
      }
      if ("string" == typeof r) {
        if (void 0 === r[i]) throw new Error("No method named " + i);
        r[i]();
      }
    });
  }
  var n = "lte.boxrefresh",
    a = {
      source: "",
      params: {},
      trigger: ".refresh-btn",
      content: ".box-body",
      loadInContent: !0,
      responseType: "",
      overlayTemplate:
        '<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>',
      onLoadStart: function () {},
      onLoadDone: function (t) {
        return t;
      },
    };
  (e.prototype.load = function () {
    this._addOverlay(),
      this.options.onLoadStart.call(t(this)),
      t.get(
        this.options.source,
        this.options.params,
        function (e) {
          this.options.loadInContent &&
            t(this.element).find(this.options.content).html(e),
            this.options.onLoadDone.call(t(this), e),
            this._removeOverlay();
        }.bind(this),
        "" !== this.options.responseType && this.options.responseType
      );
  }),
    (e.prototype._setUpListeners = function () {
      t(this.element).on(
        "click",
        this.options.trigger,
        function (t) {
          t && t.preventDefault(), this.load();
        }.bind(this)
      );
    }),
    (e.prototype._addOverlay = function () {
      t(this.element).append(this.$overlay);
    }),
    (e.prototype._removeOverlay = function () {
      t(this.$overlay).remove();
    });
  var o = t.fn.boxRefresh;
  (t.fn.boxRefresh = i),
    (t.fn.boxRefresh.Constructor = e),
    (t.fn.boxRefresh.noConflict = function () {
      return (t.fn.boxRefresh = o), this;
    }),
    t(window).on("load", function () {
      t('[data-widget="box-refresh"]').each(function () {
        i.call(t(this));
      });
    });
})(jQuery),
  (function (t) {
    "use strict";
    function e(t, e) {
      (this.element = t), (this.options = e), this._setUpListeners();
    }
    function i(i) {
      return this.each(function () {
        var o = t(this),
          r = o.data(n);
        if (!r) {
          var s = t.extend({}, a, o.data(), "object" == typeof i && i);
          o.data(n, (r = new e(o, s)));
        }
        if ("string" == typeof i) {
          if (void 0 === r[i]) throw new Error("No method named " + i);
          r[i]();
        }
      });
    }
    var n = "lte.boxwidget",
      a = {
        animationSpeed: 500,
        collapseTrigger: '[data-widget="collapse"]',
        removeTrigger: '[data-widget="remove"]',
        collapseIcon: "fa-minus",
        expandIcon: "fa-plus",
        removeIcon: "fa-times",
      },
      o = ".box-header",
      r = ".box-body",
      s = ".box-footer",
      l = ".box-tools",
      d = "collapsed-box";
    (e.prototype.toggle = function () {
      t(this.element).is(".collapsed-box") ? this.expand() : this.collapse();
    }),
      (e.prototype.expand = function () {
        var e = t.Event("expanded.boxwidget"),
          i = t.Event("expanding.boxwidget"),
          n = this.options.collapseIcon,
          a = this.options.expandIcon;
        t(this.element).removeClass(d),
          t(this.element)
            .children(o + ", " + r + ", " + s)
            .children(l)
            .find("." + a)
            .removeClass(a)
            .addClass(n),
          t(this.element)
            .children(r + ", " + s)
            .slideDown(
              this.options.animationSpeed,
              function () {
                t(this.element).trigger(e);
              }.bind(this)
            )
            .trigger(i);
      }),
      (e.prototype.collapse = function () {
        var e = t.Event("collapsed.boxwidget"),
          i = t.Event("collapsing.boxwidget"),
          n = this.options.collapseIcon,
          a = this.options.expandIcon;
        t(this.element)
          .children(o + ", " + r + ", " + s)
          .children(l)
          .find("." + n)
          .removeClass(n)
          .addClass(a),
          t(this.element)
            .children(r + ", " + s)
            .slideUp(
              this.options.animationSpeed,
              function () {
                t(this.element).addClass(d), t(this.element).trigger(e);
              }.bind(this)
            )
            .trigger(i);
      }),
      (e.prototype.remove = function () {
        var e = t.Event("removed.boxwidget"),
          i = t.Event("removing.boxwidget");
        t(this.element)
          .slideUp(
            this.options.animationSpeed,
            function () {
              t(this.element).trigger(e), t(this.element).remove();
            }.bind(this)
          )
          .trigger(i);
      }),
      (e.prototype._setUpListeners = function () {
        var e = this;
        t(this.element).on("click", this.options.collapseTrigger, function (i) {
          return i && i.preventDefault(), e.toggle(t(this)), !1;
        }),
          t(this.element).on("click", this.options.removeTrigger, function (i) {
            return i && i.preventDefault(), e.remove(t(this)), !1;
          });
      });
    var h = t.fn.boxWidget;
    (t.fn.boxWidget = i),
      (t.fn.boxWidget.Constructor = e),
      (t.fn.boxWidget.noConflict = function () {
        return (t.fn.boxWidget = h), this;
      }),
      t(window).on("load", function () {
        t(".box").each(function () {
          i.call(t(this));
        });
      });
  })(jQuery),
  (function (t) {
    "use strict";
    function e(t, e) {
      (this.element = t),
        (this.options = e),
        (this.hasBindedResize = !1),
        this.init();
    }
    function i(i) {
      return this.each(function () {
        var o = t(this),
          r = o.data(n);
        if (!r) {
          var s = t.extend({}, a, o.data(), "object" == typeof i && i);
          o.data(n, (r = new e(o, s)));
        }
        "string" == typeof i && r.toggle();
      });
    }
    var n = "lte.controlsidebar",
      a = { controlsidebarSlide: !0 },
      o = ".control-sidebar",
      r = '[data-toggle="control-sidebar"]',
      s = ".control-sidebar-open",
      l = "control-sidebar-open",
      d = "control-sidebar-hold-transition";
    (e.prototype.init = function () {
      t(this.element).is(r) || t(this).on("click", this.toggle),
        this.fix(),
        t(window).resize(
          function () {
            this.fix();
          }.bind(this)
        );
    }),
      (e.prototype.toggle = function (e) {
        e && e.preventDefault(),
          this.fix(),
          t(o).is(s) || t("body").is(s) ? this.collapse() : this.expand();
      }),
      (e.prototype.expand = function () {
        t(o).show(),
          this.options.controlsidebarSlide
            ? t(o).addClass(l)
            : t("body")
                .addClass(d)
                .addClass(l)
                .delay(50)
                .queue(function () {
                  t("body").removeClass(d), t(this).dequeue();
                }),
          t(this.element).trigger(t.Event("expanded.controlsidebar"));
      }),
      (e.prototype.collapse = function () {
        this.options.controlsidebarSlide
          ? t(o).removeClass(l)
          : t("body")
              .addClass(d)
              .removeClass(l)
              .delay(50)
              .queue(function () {
                t("body").removeClass(d), t(this).dequeue();
              }),
          t(o).fadeOut(),
          t(this.element).trigger(t.Event("collapsed.controlsidebar"));
      }),
      (e.prototype.fix = function () {
        t("body").is(".layout-boxed") &&
          this._fixForBoxed(t(".control-sidebar-bg"));
      }),
      (e.prototype._fixForBoxed = function (e) {
        e.css({ position: "absolute", height: t(".wrapper").height() });
      });
    var h = t.fn.controlSidebar;
    (t.fn.controlSidebar = i),
      (t.fn.controlSidebar.Constructor = e),
      (t.fn.controlSidebar.noConflict = function () {
        return (t.fn.controlSidebar = h), this;
      }),
      t(document).on("click", r, function (e) {
        e && e.preventDefault(), i.call(t(this), "toggle");
      });
  })(jQuery),
  (function (t) {
    "use strict";
    function e(t) {
      this.element = t;
    }
    function i(i) {
      return this.each(function () {
        var a = t(this),
          o = a.data(n);
        o || a.data(n, (o = new e(a))), "string" == typeof i && o.toggle(a);
      });
    }
    var n = "lte.directchat";
    e.prototype.toggle = function (t) {
      t.parents(".direct-chat")
        .first()
        .toggleClass("direct-chat-contacts-open");
    };
    var a = t.fn.directChat;
    (t.fn.directChat = i),
      (t.fn.directChat.Constructor = e),
      (t.fn.directChat.noConflict = function () {
        return (t.fn.directChat = a), this;
      }),
      t(document).on("click", '[data-widget="chat-pane-toggle"]', function (e) {
        e && e.preventDefault(), i.call(t(this), "toggle");
      });
  })(jQuery),
  (function (t) {
    "use strict";
    function e(t) {
      (this.options = t), this.init();
    }
    function i(i) {
      return this.each(function () {
        var o = t(this),
          r = o.data(n);
        if (!r) {
          var s = t.extend({}, a, o.data(), "object" == typeof i && i);
          o.data(n, (r = new e(s)));
        }
        "toggle" === i && r.toggle();
      });
    }
    var n = "lte.pushmenu",
      a = {
        collapseScreenSize: 767,
        expandOnHover: !1,
        expandTransitionDelay: 200,
      },
      o = '[data-toggle="push-menu"]',
      r = ".sidebar-mini",
      s = "sidebar-collapse",
      l = "sidebar-open",
      d = "sidebar-expanded-on-hover",
      h = "expanded.pushMenu",
      u = "collapsed.pushMenu";
    (e.prototype.init = function () {
      (this.options.expandOnHover || t("body").is(r + ".fixed")) &&
        (this.expandOnHover(),
        t("body").addClass("sidebar-mini-expand-feature")),
        t(".content-wrapper").click(
          function () {
            t(window).width() <= this.options.collapseScreenSize &&
              t("body").hasClass(l) &&
              this.close();
          }.bind(this)
        ),
        t(".sidebar-form .form-control").click(function (t) {
          t.stopPropagation();
        });
    }),
      (e.prototype.toggle = function () {
        var e = t(window).width(),
          i = !t("body").hasClass(s);
        e <= this.options.collapseScreenSize && (i = t("body").hasClass(l)),
          i ? this.close() : this.open();
      }),
      (e.prototype.open = function () {
        t(window).width() > this.options.collapseScreenSize
          ? t("body").removeClass(s).trigger(t.Event(h))
          : t("body").addClass(l).trigger(t.Event(h));
      }),
      (e.prototype.close = function () {
        t(window).width() > this.options.collapseScreenSize
          ? t("body").addClass(s).trigger(t.Event(u))
          : t("body")
              .removeClass(l + " " + s)
              .trigger(t.Event(u));
      }),
      (e.prototype.expandOnHover = function () {
        t(".main-sidebar").hover(
          function () {
            t("body").is(r + ".sidebar-collapse") &&
              t(window).width() > this.options.collapseScreenSize &&
              this.expand();
          }.bind(this),
          function () {
            t("body").is(".sidebar-expanded-on-hover") && this.collapse();
          }.bind(this)
        );
      }),
      (e.prototype.expand = function () {
        setTimeout(function () {
          t("body").removeClass(s).addClass(d);
        }, this.options.expandTransitionDelay);
      }),
      (e.prototype.collapse = function () {
        setTimeout(function () {
          t("body").removeClass(d).addClass(s);
        }, this.options.expandTransitionDelay);
      });
    var c = t.fn.pushMenu;
    (t.fn.pushMenu = i),
      (t.fn.pushMenu.Constructor = e),
      (t.fn.pushMenu.noConflict = function () {
        return (t.fn.pushMenu = c), this;
      }),
      t(document).on("click", o, function (e) {
        e.preventDefault(), i.call(t(this), "toggle");
      }),
      t(window).on("load", function () {
        i.call(t(o));
      });
  })(jQuery),
  (function (t) {
    "use strict";
    function e(t, e) {
      (this.element = t), (this.options = e), this._setUpListeners();
    }
    function i(i) {
      return this.each(function () {
        var o = t(this),
          r = o.data(n);
        if (!r) {
          var s = t.extend({}, a, o.data(), "object" == typeof i && i);
          o.data(n, (r = new e(o, s)));
        }
        if ("string" == typeof r) {
          if (void 0 === r[i]) throw new Error("No method named " + i);
          r[i]();
        }
      });
    }
    var n = "lte.todolist",
      a = {
        onCheck: function (t) {
          return t;
        },
        onUnCheck: function (t) {
          return t;
        },
      },
      o = { data: '[data-widget="todo-list"]' };
    (e.prototype.toggle = function (t) {
      t.parents(o.li).first().toggleClass("done"),
        t.prop("checked") ? this.check(t) : this.unCheck(t);
    }),
      (e.prototype.check = function (t) {
        this.options.onCheck.call(t);
      }),
      (e.prototype.unCheck = function (t) {
        this.options.onUnCheck.call(t);
      }),
      (e.prototype._setUpListeners = function () {
        var e = this;
        t(this.element).on("change ifChanged", "input:checkbox", function () {
          e.toggle(t(this));
        });
      });
    var r = t.fn.todoList;
    (t.fn.todoList = i),
      (t.fn.todoList.Constructor = e),
      (t.fn.todoList.noConflict = function () {
        return (t.fn.todoList = r), this;
      }),
      t(window).on("load", function () {
        t(o.data).each(function () {
          i.call(t(this));
        });
      });
  })(jQuery),
  (function (t) {
    "use strict";
    function e(e, i) {
      (this.element = e),
        (this.options = i),
        t(this.element).addClass(d),
        t(o + s, this.element).addClass(l),
        this._setUpListeners();
    }
    function i(i) {
      return this.each(function () {
        var o = t(this);
        if (!o.data(n)) {
          var r = t.extend({}, a, o.data(), "object" == typeof i && i);
          o.data(n, new e(o, r));
        }
      });
    }
    var n = "lte.tree",
      a = {
        animationSpeed: 500,
        accordion: !0,
        followLink: !1,
        trigger: ".treeview a",
      },
      o = ".treeview",
      r = ".treeview-menu",
      s = ".active",
      l = "menu-open",
      d = "tree";
    (e.prototype.toggle = function (t, e) {
      var i = t.next(r),
        n = t.parent(),
        a = n.hasClass(l);
      n.is(o) &&
        ((this.options.followLink && "#" !== t.attr("href")) ||
          e.preventDefault(),
        a ? this.collapse(i, n) : this.expand(i, n));
    }),
      (e.prototype.expand = function (e, i) {
        var n = t.Event("expanded.tree");
        if (this.options.accordion) {
          var a = i.siblings(".menu-open, .active"),
            o = a.children(r);
          this.collapse(o, a);
        }
        i.addClass(l),
          e.stop().slideDown(
            this.options.animationSpeed,
            function () {
              t(this.element).trigger(n), i.height("auto");
            }.bind(this)
          );
      }),
      (e.prototype.collapse = function (e, i) {
        var n = t.Event("collapsed.tree");
        i.removeClass(l),
          e.stop().slideUp(
            this.options.animationSpeed,
            function () {
              t(this.element).trigger(n),
                i.find(o).removeClass(l).find(r).hide();
            }.bind(this)
          );
      }),
      (e.prototype._setUpListeners = function () {
        var e = this;
        t(this.element).on("click", this.options.trigger, function (i) {
          e.toggle(t(this), i);
        });
      });
    var h = t.fn.tree;
    (t.fn.tree = i),
      (t.fn.tree.Constructor = e),
      (t.fn.tree.noConflict = function () {
        return (t.fn.tree = h), this;
      }),
      t(window).on("load", function () {
        t('[data-widget="tree"]').each(function () {
          i.call(t(this));
        });
      });
  })(jQuery),
  (function (t) {
    "use strict";
    function e(t) {
      (this.options = t), (this.bindedResize = !1), this.activate();
    }
    function i(i) {
      return this.each(function () {
        var o = t(this),
          r = o.data(n);
        if (!r) {
          var s = t.extend({}, a, o.data(), "object" == typeof i && i);
          o.data(n, (r = new e(s)));
        }
        if ("string" == typeof i) {
          if (void 0 === r[i]) throw new Error("No method named " + i);
          r[i]();
        }
      });
    }
    var n = "lte.layout",
      a = { slimscroll: !0, resetHeight: !0 },
      o = ".wrapper",
      r = ".content-wrapper",
      s = ".main-header",
      l = ".sidebar",
      d = ".sidebar-menu",
      h = "fixed";
    (e.prototype.activate = function () {
      this.fix(),
        this.fixSidebar(),
        t("body").removeClass("hold-transition"),
        this.options.resetHeight &&
          t("body, html, " + o).css({ height: "auto", "min-height": "100%" }),
        this.bindedResize ||
          (t(window).resize(
            function () {
              this.fix(),
                this.fixSidebar(),
                t(".main-header .logo, " + l).one(
                  "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                  function () {
                    this.fix(), this.fixSidebar();
                  }.bind(this)
                );
            }.bind(this)
          ),
          (this.bindedResize = !0)),
        t(d).on(
          "expanded.tree",
          function () {
            this.fix(), this.fixSidebar();
          }.bind(this)
        ),
        t(d).on(
          "collapsed.tree",
          function () {
            this.fix(), this.fixSidebar();
          }.bind(this)
        );
    }),
      (e.prototype.fix = function () {
        t(".layout-boxed > " + o).css("overflow", "hidden");
        var e = t(".main-footer").outerHeight() || 0,
          i = t(s).outerHeight() || 0,
          n = i + e,
          a = t(window).height(),
          d = t(l).outerHeight() || 0;
        if (t("body").hasClass(h)) t(r).css("min-height", a - e);
        else {
          var u;
          u =
            d + i <= a
              ? (t(r).css("min-height", a - n), a - n)
              : (t(r).css("min-height", d), d);
          var c = t(".control-sidebar");
          void 0 !== c && c.height() > u && t(r).css("min-height", c.height());
        }
      }),
      (e.prototype.fixSidebar = function () {
        t("body").hasClass(h)
          ? this.options.slimscroll &&
            void 0 !== t.fn.slimScroll &&
            0 === t(".main-sidebar").find("slimScrollDiv").length &&
            t(l).slimScroll({
              height: t(window).height() - t(s).height() + "px",
            })
          : void 0 !== t.fn.slimScroll &&
            t(l).slimScroll({ destroy: !0 }).height("auto");
      });
    var u = t.fn.layout;
    (t.fn.layout = i),
      (t.fn.layout.Constuctor = e),
      (t.fn.layout.noConflict = function () {
        return (t.fn.layout = u), this;
      }),
      t(window).on("load", function () {
        i.call(t("body"));
      });
  })(jQuery),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define([], e)
      : "object" == typeof exports
      ? (module.exports = e())
      : (t.Tether = e());
  })(this, function () {
    "use strict";
    function t(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function e(t) {
      var i = t.getBoundingClientRect(),
        n = {};
      for (var a in i) n[a] = i[a];
      try {
        if (t.ownerDocument !== document) {
          var o = t.ownerDocument.defaultView.frameElement;
          if (o) {
            var r = e(o);
            (n.top += r.top),
              (n.bottom += r.top),
              (n.left += r.left),
              (n.right += r.left);
          }
        }
      } catch (t) {}
      return n;
    }
    function i(t) {
      var e = getComputedStyle(t) || {},
        i = e.position,
        n = [];
      if ("fixed" === i) return [t];
      for (var a = t; (a = a.parentNode) && a && 1 === a.nodeType; ) {
        var o = void 0;
        try {
          o = getComputedStyle(a);
        } catch (t) {}
        if (void 0 === o || null === o) return n.push(a), n;
        var r = o,
          s = r.overflow,
          l = r.overflowX;
        /(auto|scroll|overlay)/.test(s + r.overflowY + l) &&
          ("absolute" !== i ||
            ["relative", "absolute", "fixed"].indexOf(o.position) >= 0) &&
          n.push(a);
      }
      return (
        n.push(t.ownerDocument.body),
        t.ownerDocument !== document && n.push(t.ownerDocument.defaultView),
        n
      );
    }
    function n() {
      w && document.body.removeChild(w), (w = null);
    }
    function a(t) {
      var i = void 0;
      t === document
        ? ((i = document), (t = document.documentElement))
        : (i = t.ownerDocument);
      var n = i.documentElement,
        a = e(t),
        o = M();
      return (
        (a.top -= o.top),
        (a.left -= o.left),
        void 0 === a.width &&
          (a.width = document.body.scrollWidth - a.left - a.right),
        void 0 === a.height &&
          (a.height = document.body.scrollHeight - a.top - a.bottom),
        (a.top = a.top - n.clientTop),
        (a.left = a.left - n.clientLeft),
        (a.right = i.body.clientWidth - a.width - a.left),
        (a.bottom = i.body.clientHeight - a.height - a.top),
        a
      );
    }
    function o(t) {
      return t.offsetParent || document.documentElement;
    }
    function r() {
      if (D) return D;
      var t = document.createElement("div");
      (t.style.width = "100%"), (t.style.height = "200px");
      var e = document.createElement("div");
      s(e.style, {
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        visibility: "hidden",
        width: "200px",
        height: "150px",
        overflow: "hidden",
      }),
        e.appendChild(t),
        document.body.appendChild(e);
      var i = t.offsetWidth;
      e.style.overflow = "scroll";
      var n = t.offsetWidth;
      i === n && (n = e.clientWidth), document.body.removeChild(e);
      var a = i - n;
      return (D = { width: a, height: a });
    }
    function s() {
      var t =
          arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        e = [];
      return (
        Array.prototype.push.apply(e, arguments),
        e.slice(1).forEach(function (e) {
          if (e)
            for (var i in e) ({}.hasOwnProperty.call(e, i) && (t[i] = e[i]));
        }),
        t
      );
    }
    function l(t, e) {
      if (void 0 !== t.classList)
        e.split(" ").forEach(function (e) {
          e.trim() && t.classList.remove(e);
        });
      else {
        var i = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
          n = u(t).replace(i, " ");
        c(t, n);
      }
    }
    function d(t, e) {
      if (void 0 !== t.classList)
        e.split(" ").forEach(function (e) {
          e.trim() && t.classList.add(e);
        });
      else {
        l(t, e);
        var i = u(t) + " " + e;
        c(t, i);
      }
    }
    function h(t, e) {
      if (void 0 !== t.classList) return t.classList.contains(e);
      var i = u(t);
      return new RegExp("(^| )" + e + "( |$)", "gi").test(i);
    }
    function u(t) {
      return t.className instanceof
        t.ownerDocument.defaultView.SVGAnimatedString
        ? t.className.baseVal
        : t.className;
    }
    function c(t, e) {
      t.setAttribute("class", e);
    }
    function f(t, e, i) {
      i.forEach(function (i) {
        -1 === e.indexOf(i) && h(t, i) && l(t, i);
      }),
        e.forEach(function (e) {
          h(t, e) || d(t, e);
        });
    }
    function t(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function p(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    function g(t, e) {
      var i =
        arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
      return t + i >= e && e >= t - i;
    }
    function m() {
      return "object" == typeof performance &&
        "function" == typeof performance.now
        ? performance.now()
        : +new Date();
    }
    function v() {
      for (
        var t = { top: 0, left: 0 }, e = arguments.length, i = Array(e), n = 0;
        n < e;
        n++
      )
        i[n] = arguments[n];
      return (
        i.forEach(function (e) {
          var i = e.top,
            n = e.left;
          "string" == typeof i && (i = parseFloat(i, 10)),
            "string" == typeof n && (n = parseFloat(n, 10)),
            (t.top += i),
            (t.left += n);
        }),
        t
      );
    }
    function b(t, e) {
      return (
        "string" == typeof t.left &&
          -1 !== t.left.indexOf("%") &&
          (t.left = (parseFloat(t.left, 10) / 100) * e.width),
        "string" == typeof t.top &&
          -1 !== t.top.indexOf("%") &&
          (t.top = (parseFloat(t.top, 10) / 100) * e.height),
        t
      );
    }
    function y(t, e) {
      return (
        "scrollParent" === e
          ? (e = t.scrollParents[0])
          : "window" === e &&
            (e = [
              pageXOffset,
              pageYOffset,
              innerWidth + pageXOffset,
              innerHeight + pageYOffset,
            ]),
        e === document && (e = e.documentElement),
        void 0 !== e.nodeType &&
          (function () {
            var t = e,
              i = a(e),
              n = i,
              o = getComputedStyle(e);
            if (
              ((e = [n.left, n.top, i.width + n.left, i.height + n.top]),
              t.ownerDocument !== document)
            ) {
              var r = t.ownerDocument.defaultView;
              (e[0] += r.pageXOffset),
                (e[1] += r.pageYOffset),
                (e[2] += r.pageXOffset),
                (e[3] += r.pageYOffset);
            }
            $.forEach(function (t, i) {
              (t = t[0].toUpperCase() + t.substr(1)),
                "Top" === t || "Left" === t
                  ? (e[i] += parseFloat(o["border" + t + "Width"]))
                  : (e[i] -= parseFloat(o["border" + t + "Width"]));
            });
          })(),
        e
      );
    }
    var x = (function () {
        function t(t, e) {
          for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n);
          }
        }
        return function (e, i, n) {
          return i && t(e.prototype, i), n && t(e, n), e;
        };
      })(),
      _ = void 0;
    void 0 === _ && (_ = { modules: [] });
    var w = null,
      k = (function () {
        var t = 0;
        return function () {
          return ++t;
        };
      })(),
      C = {},
      M = function () {
        var t = w;
        (t && document.body.contains(t)) ||
          ((t = document.createElement("div")),
          t.setAttribute("data-tether-id", k()),
          s(t.style, { top: 0, left: 0, position: "absolute" }),
          document.body.appendChild(t),
          (w = t));
        var i = t.getAttribute("data-tether-id");
        return (
          void 0 === C[i] &&
            ((C[i] = e(t)),
            T(function () {
              delete C[i];
            })),
          C[i]
        );
      },
      D = null,
      S = [],
      T = function (t) {
        S.push(t);
      },
      F = function () {
        for (var t = void 0; (t = S.pop()); ) t();
      },
      A = (function () {
        function e() {
          t(this, e);
        }
        return (
          x(e, [
            {
              key: "on",
              value: function (t, e, i) {
                var n =
                  !(arguments.length <= 3 || void 0 === arguments[3]) &&
                  arguments[3];
                void 0 === this.bindings && (this.bindings = {}),
                  void 0 === this.bindings[t] && (this.bindings[t] = []),
                  this.bindings[t].push({ handler: e, ctx: i, once: n });
              },
            },
            {
              key: "once",
              value: function (t, e, i) {
                this.on(t, e, i, !0);
              },
            },
            {
              key: "off",
              value: function (t, e) {
                if (void 0 !== this.bindings && void 0 !== this.bindings[t])
                  if (void 0 === e) delete this.bindings[t];
                  else
                    for (var i = 0; i < this.bindings[t].length; )
                      this.bindings[t][i].handler === e
                        ? this.bindings[t].splice(i, 1)
                        : ++i;
              },
            },
            {
              key: "trigger",
              value: function (t) {
                if (void 0 !== this.bindings && this.bindings[t]) {
                  for (
                    var e = 0,
                      i = arguments.length,
                      n = Array(i > 1 ? i - 1 : 0),
                      a = 1;
                    a < i;
                    a++
                  )
                    n[a - 1] = arguments[a];
                  for (; e < this.bindings[t].length; ) {
                    var o = this.bindings[t][e],
                      r = o.handler,
                      s = o.ctx,
                      l = o.once,
                      d = s;
                    void 0 === d && (d = this),
                      r.apply(d, n),
                      l ? this.bindings[t].splice(e, 1) : ++e;
                  }
                }
              },
            },
          ]),
          e
        );
      })();
    _.Utils = {
      getActualBoundingClientRect: e,
      getScrollParents: i,
      getBounds: a,
      getOffsetParent: o,
      extend: s,
      addClass: d,
      removeClass: l,
      hasClass: h,
      updateClasses: f,
      defer: T,
      flush: F,
      uniqueId: k,
      Evented: A,
      getScrollBarSize: r,
      removeUtilElements: n,
    };
    var P = (function () {
        function t(t, e) {
          var i = [],
            n = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var r, s = t[Symbol.iterator]();
              !(n = (r = s.next()).done) &&
              (i.push(r.value), !e || i.length !== e);
              n = !0
            );
          } catch (t) {
            (a = !0), (o = t);
          } finally {
            try {
              !n && s.return && s.return();
            } finally {
              if (a) throw o;
            }
          }
          return i;
        }
        return function (e, i) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return t(e, i);
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        };
      })(),
      x = (function () {
        function t(t, e) {
          for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n);
          }
        }
        return function (e, i, n) {
          return i && t(e.prototype, i), n && t(e, n), e;
        };
      })(),
      I = function (t, e, i) {
        for (var n = !0; n; ) {
          var a = t,
            o = e,
            r = i;
          (n = !1), null === a && (a = Function.prototype);
          var s = Object.getOwnPropertyDescriptor(a, o);
          if (void 0 !== s) {
            if ("value" in s) return s.value;
            var l = s.get;
            if (void 0 === l) return;
            return l.call(r);
          }
          var d = Object.getPrototypeOf(a);
          if (null === d) return;
          (t = d), (e = o), (i = r), (n = !0), (s = d = void 0);
        }
      };
    if (void 0 === _)
      throw new Error("You must include the utils.js file before tether.js");
    var E = _.Utils,
      i = E.getScrollParents,
      a = E.getBounds,
      o = E.getOffsetParent,
      s = E.extend,
      d = E.addClass,
      l = E.removeClass,
      f = E.updateClasses,
      T = E.defer,
      F = E.flush,
      r = E.getScrollBarSize,
      n = E.removeUtilElements,
      O = (function () {
        if ("undefined" == typeof document) return "";
        for (
          var t = document.createElement("div"),
            e = [
              "transform",
              "WebkitTransform",
              "OTransform",
              "MozTransform",
              "msTransform",
            ],
            i = 0;
          i < e.length;
          ++i
        ) {
          var n = e[i];
          if (void 0 !== t.style[n]) return n;
        }
      })(),
      L = [],
      R = function () {
        L.forEach(function (t) {
          t.position(!1);
        }),
          F();
      };
    !(function () {
      var t = null,
        e = null,
        i = null,
        n = function n() {
          if (void 0 !== e && e > 16)
            return (e = Math.min(e - 16, 250)), void (i = setTimeout(n, 250));
          (void 0 !== t && m() - t < 10) ||
            (null != i && (clearTimeout(i), (i = null)),
            (t = m()),
            R(),
            (e = m() - t));
        };
      "undefined" != typeof window &&
        void 0 !== window.addEventListener &&
        ["resize", "scroll", "touchmove"].forEach(function (t) {
          window.addEventListener(t, n);
        });
    })();
    var V = { center: "center", left: "right", right: "left" },
      N = { middle: "middle", top: "bottom", bottom: "top" },
      U = {
        top: 0,
        left: 0,
        middle: "50%",
        center: "50%",
        bottom: "100%",
        right: "100%",
      },
      z = function (t, e) {
        var i = t.left,
          n = t.top;
        return (
          "auto" === i && (i = V[e.left]),
          "auto" === n && (n = N[e.top]),
          { left: i, top: n }
        );
      },
      B = function (t) {
        var e = t.left,
          i = t.top;
        return (
          void 0 !== U[t.left] && (e = U[t.left]),
          void 0 !== U[t.top] && (i = U[t.top]),
          { left: e, top: i }
        );
      },
      W = function (t) {
        var e = t.split(" "),
          i = P(e, 2);
        return { top: i[0], left: i[1] };
      },
      H = W,
      j = (function (e) {
        function h(e) {
          var i = this;
          t(this, h),
            I(Object.getPrototypeOf(h.prototype), "constructor", this).call(
              this
            ),
            (this.position = this.position.bind(this)),
            L.push(this),
            (this.history = []),
            this.setOptions(e, !1),
            _.modules.forEach(function (t) {
              void 0 !== t.initialize && t.initialize.call(i);
            }),
            this.position();
        }
        return (
          p(h, e),
          x(h, [
            {
              key: "getClass",
              value: function () {
                var t =
                    arguments.length <= 0 || void 0 === arguments[0]
                      ? ""
                      : arguments[0],
                  e = this.options.classes;
                return void 0 !== e && e[t]
                  ? this.options.classes[t]
                  : this.options.classPrefix
                  ? this.options.classPrefix + "-" + t
                  : t;
              },
            },
            {
              key: "setOptions",
              value: function (t) {
                var e = this,
                  n =
                    arguments.length <= 1 ||
                    void 0 === arguments[1] ||
                    arguments[1],
                  a = {
                    offset: "0 0",
                    targetOffset: "0 0",
                    targetAttachment: "auto auto",
                    classPrefix: "tether",
                  };
                this.options = s(a, t);
                var o = this.options,
                  r = o.element,
                  l = o.target,
                  h = o.targetModifier;
                if (
                  ((this.element = r),
                  (this.target = l),
                  (this.targetModifier = h),
                  "viewport" === this.target
                    ? ((this.target = document.body),
                      (this.targetModifier = "visible"))
                    : "scroll-handle" === this.target &&
                      ((this.target = document.body),
                      (this.targetModifier = "scroll-handle")),
                  ["element", "target"].forEach(function (t) {
                    if (void 0 === e[t])
                      throw new Error(
                        "Tether Error: Both element and target must be defined"
                      );
                    void 0 !== e[t].jquery
                      ? (e[t] = e[t][0])
                      : "string" == typeof e[t] &&
                        (e[t] = document.querySelector(e[t]));
                  }),
                  d(this.element, this.getClass("element")),
                  !1 !== this.options.addTargetClasses &&
                    d(this.target, this.getClass("target")),
                  !this.options.attachment)
                )
                  throw new Error(
                    "Tether Error: You must provide an attachment"
                  );
                (this.targetAttachment = H(this.options.targetAttachment)),
                  (this.attachment = H(this.options.attachment)),
                  (this.offset = W(this.options.offset)),
                  (this.targetOffset = W(this.options.targetOffset)),
                  void 0 !== this.scrollParents && this.disable(),
                  "scroll-handle" === this.targetModifier
                    ? (this.scrollParents = [this.target])
                    : (this.scrollParents = i(this.target)),
                  !1 !== this.options.enabled && this.enable(n);
              },
            },
            {
              key: "getTargetBounds",
              value: function () {
                if (void 0 === this.targetModifier) return a(this.target);
                if ("visible" === this.targetModifier) {
                  if (this.target === document.body)
                    return {
                      top: pageYOffset,
                      left: pageXOffset,
                      height: innerHeight,
                      width: innerWidth,
                    };
                  var t = a(this.target),
                    e = {
                      height: t.height,
                      width: t.width,
                      top: t.top,
                      left: t.left,
                    };
                  return (
                    (e.height = Math.min(
                      e.height,
                      t.height - (pageYOffset - t.top)
                    )),
                    (e.height = Math.min(
                      e.height,
                      t.height -
                        (t.top + t.height - (pageYOffset + innerHeight))
                    )),
                    (e.height = Math.min(innerHeight, e.height)),
                    (e.height -= 2),
                    (e.width = Math.min(
                      e.width,
                      t.width - (pageXOffset - t.left)
                    )),
                    (e.width = Math.min(
                      e.width,
                      t.width - (t.left + t.width - (pageXOffset + innerWidth))
                    )),
                    (e.width = Math.min(innerWidth, e.width)),
                    (e.width -= 2),
                    e.top < pageYOffset && (e.top = pageYOffset),
                    e.left < pageXOffset && (e.left = pageXOffset),
                    e
                  );
                }
                if ("scroll-handle" === this.targetModifier) {
                  var t = void 0,
                    i = this.target;
                  i === document.body
                    ? ((i = document.documentElement),
                      (t = {
                        left: pageXOffset,
                        top: pageYOffset,
                        height: innerHeight,
                        width: innerWidth,
                      }))
                    : (t = a(i));
                  var n = getComputedStyle(i),
                    o =
                      i.scrollWidth > i.clientWidth ||
                      [n.overflow, n.overflowX].indexOf("scroll") >= 0 ||
                      this.target !== document.body,
                    r = 0;
                  o && (r = 15);
                  var s =
                      t.height -
                      parseFloat(n.borderTopWidth) -
                      parseFloat(n.borderBottomWidth) -
                      r,
                    e = {
                      width: 15,
                      height: 0.975 * s * (s / i.scrollHeight),
                      left:
                        t.left + t.width - parseFloat(n.borderLeftWidth) - 15,
                    },
                    l = 0;
                  s < 408 &&
                    this.target === document.body &&
                    (l = -11e-5 * Math.pow(s, 2) - 0.00727 * s + 22.58),
                    this.target !== document.body &&
                      (e.height = Math.max(e.height, 24));
                  var d = this.target.scrollTop / (i.scrollHeight - s);
                  return (
                    (e.top =
                      d * (s - e.height - l) +
                      t.top +
                      parseFloat(n.borderTopWidth)),
                    this.target === document.body &&
                      (e.height = Math.max(e.height, 24)),
                    e
                  );
                }
              },
            },
            {
              key: "clearCache",
              value: function () {
                this._cache = {};
              },
            },
            {
              key: "cache",
              value: function (t, e) {
                return (
                  void 0 === this._cache && (this._cache = {}),
                  void 0 === this._cache[t] && (this._cache[t] = e.call(this)),
                  this._cache[t]
                );
              },
            },
            {
              key: "enable",
              value: function () {
                var t = this,
                  e =
                    arguments.length <= 0 ||
                    void 0 === arguments[0] ||
                    arguments[0];
                !1 !== this.options.addTargetClasses &&
                  d(this.target, this.getClass("enabled")),
                  d(this.element, this.getClass("enabled")),
                  (this.enabled = !0),
                  this.scrollParents.forEach(function (e) {
                    e !== t.target.ownerDocument &&
                      e.addEventListener("scroll", t.position);
                  }),
                  e && this.position();
              },
            },
            {
              key: "disable",
              value: function () {
                var t = this;
                l(this.target, this.getClass("enabled")),
                  l(this.element, this.getClass("enabled")),
                  (this.enabled = !1),
                  void 0 !== this.scrollParents &&
                    this.scrollParents.forEach(function (e) {
                      e.removeEventListener("scroll", t.position);
                    });
              },
            },
            {
              key: "destroy",
              value: function () {
                var t = this;
                this.disable(),
                  L.forEach(function (e, i) {
                    e === t && L.splice(i, 1);
                  }),
                  0 === L.length && n();
              },
            },
            {
              key: "updateAttachClasses",
              value: function (t, e) {
                var i = this;
                (t = t || this.attachment), (e = e || this.targetAttachment);
                var n = ["left", "top", "bottom", "right", "middle", "center"];
                void 0 !== this._addAttachClasses &&
                  this._addAttachClasses.length &&
                  this._addAttachClasses.splice(
                    0,
                    this._addAttachClasses.length
                  ),
                  void 0 === this._addAttachClasses &&
                    (this._addAttachClasses = []);
                var a = this._addAttachClasses;
                t.top &&
                  a.push(this.getClass("element-attached") + "-" + t.top),
                  t.left &&
                    a.push(this.getClass("element-attached") + "-" + t.left),
                  e.top &&
                    a.push(this.getClass("target-attached") + "-" + e.top),
                  e.left &&
                    a.push(this.getClass("target-attached") + "-" + e.left);
                var o = [];
                n.forEach(function (t) {
                  o.push(i.getClass("element-attached") + "-" + t),
                    o.push(i.getClass("target-attached") + "-" + t);
                }),
                  T(function () {
                    void 0 !== i._addAttachClasses &&
                      (f(i.element, i._addAttachClasses, o),
                      !1 !== i.options.addTargetClasses &&
                        f(i.target, i._addAttachClasses, o),
                      delete i._addAttachClasses);
                  });
              },
            },
            {
              key: "position",
              value: function () {
                var t = this,
                  e =
                    arguments.length <= 0 ||
                    void 0 === arguments[0] ||
                    arguments[0];
                if (this.enabled) {
                  this.clearCache();
                  var i = z(this.targetAttachment, this.attachment);
                  this.updateAttachClasses(this.attachment, i);
                  var n = this.cache("element-bounds", function () {
                      return a(t.element);
                    }),
                    s = n.width,
                    l = n.height;
                  if (0 === s && 0 === l && void 0 !== this.lastSize) {
                    var d = this.lastSize;
                    (s = d.width), (l = d.height);
                  } else this.lastSize = { width: s, height: l };
                  var h = this.cache("target-bounds", function () {
                      return t.getTargetBounds();
                    }),
                    u = h,
                    c = b(B(this.attachment), { width: s, height: l }),
                    f = b(B(i), u),
                    p = b(this.offset, { width: s, height: l }),
                    g = b(this.targetOffset, u);
                  (c = v(c, p)), (f = v(f, g));
                  for (
                    var m = h.left + f.left - c.left,
                      y = h.top + f.top - c.top,
                      x = 0;
                    x < _.modules.length;
                    ++x
                  ) {
                    var w = _.modules[x],
                      k = w.position.call(this, {
                        left: m,
                        top: y,
                        targetAttachment: i,
                        targetPos: h,
                        elementPos: n,
                        offset: c,
                        targetOffset: f,
                        manualOffset: p,
                        manualTargetOffset: g,
                        scrollbarSize: S,
                        attachment: this.attachment,
                      });
                    if (!1 === k) return !1;
                    void 0 !== k &&
                      "object" == typeof k &&
                      ((y = k.top), (m = k.left));
                  }
                  var C = {
                      page: { top: y, left: m },
                      viewport: {
                        top: y - pageYOffset,
                        bottom: pageYOffset - y - l + innerHeight,
                        left: m - pageXOffset,
                        right: pageXOffset - m - s + innerWidth,
                      },
                    },
                    M = this.target.ownerDocument,
                    D = M.defaultView,
                    S = void 0;
                  return (
                    D.innerHeight > M.documentElement.clientHeight &&
                      ((S = this.cache("scrollbar-size", r)),
                      (C.viewport.bottom -= S.height)),
                    D.innerWidth > M.documentElement.clientWidth &&
                      ((S = this.cache("scrollbar-size", r)),
                      (C.viewport.right -= S.width)),
                    (-1 !== ["", "static"].indexOf(M.body.style.position) &&
                      -1 !==
                        ["", "static"].indexOf(
                          M.body.parentElement.style.position
                        )) ||
                      ((C.page.bottom = M.body.scrollHeight - y - l),
                      (C.page.right = M.body.scrollWidth - m - s)),
                    void 0 !== this.options.optimizations &&
                      !1 !== this.options.optimizations.moveElement &&
                      void 0 === this.targetModifier &&
                      (function () {
                        var e = t.cache("target-offsetparent", function () {
                            return o(t.target);
                          }),
                          i = t.cache(
                            "target-offsetparent-bounds",
                            function () {
                              return a(e);
                            }
                          ),
                          n = getComputedStyle(e),
                          r = i,
                          s = {};
                        if (
                          (["Top", "Left", "Bottom", "Right"].forEach(function (
                            t
                          ) {
                            s[t.toLowerCase()] = parseFloat(
                              n["border" + t + "Width"]
                            );
                          }),
                          (i.right =
                            M.body.scrollWidth - i.left - r.width + s.right),
                          (i.bottom =
                            M.body.scrollHeight - i.top - r.height + s.bottom),
                          C.page.top >= i.top + s.top &&
                            C.page.bottom >= i.bottom &&
                            C.page.left >= i.left + s.left &&
                            C.page.right >= i.right)
                        ) {
                          var l = e.scrollTop,
                            d = e.scrollLeft;
                          C.offset = {
                            top: C.page.top - i.top + l - s.top,
                            left: C.page.left - i.left + d - s.left,
                          };
                        }
                      })(),
                    this.move(C),
                    this.history.unshift(C),
                    this.history.length > 3 && this.history.pop(),
                    e && F(),
                    !0
                  );
                }
              },
            },
            {
              key: "move",
              value: function (t) {
                var e = this;
                if (void 0 !== this.element.parentNode) {
                  var i = {};
                  for (var n in t) {
                    i[n] = {};
                    for (var a in t[n]) {
                      for (var r = !1, l = 0; l < this.history.length; ++l) {
                        var d = this.history[l];
                        if (void 0 !== d[n] && !g(d[n][a], t[n][a])) {
                          r = !0;
                          break;
                        }
                      }
                      r || (i[n][a] = !0);
                    }
                  }
                  var h = { top: "", left: "", right: "", bottom: "" },
                    u = function (t, i) {
                      if (
                        !1 !==
                        (void 0 !== e.options.optimizations
                          ? e.options.optimizations.gpu
                          : null)
                      ) {
                        var n = void 0,
                          a = void 0;
                        t.top
                          ? ((h.top = 0), (n = i.top))
                          : ((h.bottom = 0), (n = -i.bottom)),
                          t.left
                            ? ((h.left = 0), (a = i.left))
                            : ((h.right = 0), (a = -i.right)),
                          "number" == typeof window.devicePixelRatio &&
                            devicePixelRatio % 1 == 0 &&
                            ((a =
                              Math.round(a * devicePixelRatio) /
                              devicePixelRatio),
                            (n =
                              Math.round(n * devicePixelRatio) /
                              devicePixelRatio)),
                          (h[O] =
                            "translateX(" + a + "px) translateY(" + n + "px)"),
                          "msTransform" !== O && (h[O] += " translateZ(0)");
                      } else
                        t.top
                          ? (h.top = i.top + "px")
                          : (h.bottom = i.bottom + "px"),
                          t.left
                            ? (h.left = i.left + "px")
                            : (h.right = i.right + "px");
                    },
                    c = !1;
                  if (
                    ((i.page.top || i.page.bottom) &&
                    (i.page.left || i.page.right)
                      ? ((h.position = "absolute"), u(i.page, t.page))
                      : (i.viewport.top || i.viewport.bottom) &&
                        (i.viewport.left || i.viewport.right)
                      ? ((h.position = "fixed"), u(i.viewport, t.viewport))
                      : void 0 !== i.offset && i.offset.top && i.offset.left
                      ? (function () {
                          h.position = "absolute";
                          var n = e.cache("target-offsetparent", function () {
                            return o(e.target);
                          });
                          o(e.element) !== n &&
                            T(function () {
                              e.element.parentNode.removeChild(e.element),
                                n.appendChild(e.element);
                            }),
                            u(i.offset, t.offset),
                            (c = !0);
                        })()
                      : ((h.position = "absolute"),
                        u({ top: !0, left: !0 }, t.page)),
                    !c)
                  )
                    if (this.options.bodyElement)
                      this.element.parentNode !== this.options.bodyElement &&
                        this.options.bodyElement.appendChild(this.element);
                    else {
                      for (
                        var f = !0, p = this.element.parentNode;
                        p &&
                        1 === p.nodeType &&
                        "BODY" !== p.tagName &&
                        !(function (t) {
                          var e = t.ownerDocument;
                          return (
                            (e.fullscreenElement ||
                              e.webkitFullscreenElement ||
                              e.mozFullScreenElement ||
                              e.msFullscreenElement) === t
                          );
                        })(p);

                      ) {
                        if ("static" !== getComputedStyle(p).position) {
                          f = !1;
                          break;
                        }
                        p = p.parentNode;
                      }
                      f ||
                        (this.element.parentNode.removeChild(this.element),
                        this.element.ownerDocument.body.appendChild(
                          this.element
                        ));
                    }
                  var m = {},
                    v = !1;
                  for (var a in h) {
                    var b = h[a];
                    this.element.style[a] !== b && ((v = !0), (m[a] = b));
                  }
                  v &&
                    T(function () {
                      s(e.element.style, m), e.trigger("repositioned");
                    });
                }
              },
            },
          ]),
          h
        );
      })(A);
    (j.modules = []), (_.position = R);
    var q = s(j, _),
      P = (function () {
        function t(t, e) {
          var i = [],
            n = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var r, s = t[Symbol.iterator]();
              !(n = (r = s.next()).done) &&
              (i.push(r.value), !e || i.length !== e);
              n = !0
            );
          } catch (t) {
            (a = !0), (o = t);
          } finally {
            try {
              !n && s.return && s.return();
            } finally {
              if (a) throw o;
            }
          }
          return i;
        }
        return function (e, i) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return t(e, i);
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        };
      })(),
      E = _.Utils,
      a = E.getBounds,
      s = E.extend,
      f = E.updateClasses,
      T = E.defer,
      $ = ["left", "top", "right", "bottom"];
    _.modules.push({
      position: function (t) {
        var e = this,
          i = t.top,
          n = t.left,
          o = t.targetAttachment;
        if (!this.options.constraints) return !0;
        var r = this.cache("element-bounds", function () {
            return a(e.element);
          }),
          l = r.height,
          d = r.width;
        if (0 === d && 0 === l && void 0 !== this.lastSize) {
          var h = this.lastSize;
          (d = h.width), (l = h.height);
        }
        var u = this.cache("target-bounds", function () {
            return e.getTargetBounds();
          }),
          c = u.height,
          p = u.width,
          g = [this.getClass("pinned"), this.getClass("out-of-bounds")];
        this.options.constraints.forEach(function (t) {
          var e = t.outOfBoundsClass,
            i = t.pinnedClass;
          e && g.push(e), i && g.push(i);
        }),
          g.forEach(function (t) {
            ["left", "top", "right", "bottom"].forEach(function (e) {
              g.push(t + "-" + e);
            });
          });
        var m = [],
          v = s({}, o),
          b = s({}, this.attachment);
        return (
          this.options.constraints.forEach(function (t) {
            var a = t.to,
              r = t.attachment,
              s = t.pin;
            void 0 === r && (r = "");
            var h = void 0,
              u = void 0;
            if (r.indexOf(" ") >= 0) {
              var f = r.split(" "),
                g = P(f, 2);
              (u = g[0]), (h = g[1]);
            } else h = u = r;
            var x = y(e, a);
            ("target" !== u && "both" !== u) ||
              (i < x[1] && "top" === v.top && ((i += c), (v.top = "bottom")),
              i + l > x[3] &&
                "bottom" === v.top &&
                ((i -= c), (v.top = "top"))),
              "together" === u &&
                ("top" === v.top &&
                  ("bottom" === b.top && i < x[1]
                    ? ((i += c), (v.top = "bottom"), (i += l), (b.top = "top"))
                    : "top" === b.top &&
                      i + l > x[3] &&
                      i - (l - c) >= x[1] &&
                      ((i -= l - c), (v.top = "bottom"), (b.top = "bottom"))),
                "bottom" === v.top &&
                  ("top" === b.top && i + l > x[3]
                    ? ((i -= c), (v.top = "top"), (i -= l), (b.top = "bottom"))
                    : "bottom" === b.top &&
                      i < x[1] &&
                      i + (2 * l - c) <= x[3] &&
                      ((i += l - c), (v.top = "top"), (b.top = "top"))),
                "middle" === v.top &&
                  (i + l > x[3] && "top" === b.top
                    ? ((i -= l), (b.top = "bottom"))
                    : i < x[1] &&
                      "bottom" === b.top &&
                      ((i += l), (b.top = "top")))),
              ("target" !== h && "both" !== h) ||
                (n < x[0] &&
                  "left" === v.left &&
                  ((n += p), (v.left = "right")),
                n + d > x[2] &&
                  "right" === v.left &&
                  ((n -= p), (v.left = "left"))),
              "together" === h &&
                (n < x[0] && "left" === v.left
                  ? "right" === b.left
                    ? ((n += p),
                      (v.left = "right"),
                      (n += d),
                      (b.left = "left"))
                    : "left" === b.left &&
                      ((n += p),
                      (v.left = "right"),
                      (n -= d),
                      (b.left = "right"))
                  : n + d > x[2] && "right" === v.left
                  ? "left" === b.left
                    ? ((n -= p),
                      (v.left = "left"),
                      (n -= d),
                      (b.left = "right"))
                    : "right" === b.left &&
                      ((n -= p), (v.left = "left"), (n += d), (b.left = "left"))
                  : "center" === v.left &&
                    (n + d > x[2] && "left" === b.left
                      ? ((n -= d), (b.left = "right"))
                      : n < x[0] &&
                        "right" === b.left &&
                        ((n += d), (b.left = "left")))),
              ("element" !== u && "both" !== u) ||
                (i < x[1] && "bottom" === b.top && ((i += l), (b.top = "top")),
                i + l > x[3] &&
                  "top" === b.top &&
                  ((i -= l), (b.top = "bottom"))),
              ("element" !== h && "both" !== h) ||
                (n < x[0] &&
                  ("right" === b.left
                    ? ((n += d), (b.left = "left"))
                    : "center" === b.left && ((n += d / 2), (b.left = "left"))),
                n + d > x[2] &&
                  ("left" === b.left
                    ? ((n -= d), (b.left = "right"))
                    : "center" === b.left &&
                      ((n -= d / 2), (b.left = "right")))),
              "string" == typeof s
                ? (s = s.split(",").map(function (t) {
                    return t.trim();
                  }))
                : !0 === s && (s = ["top", "left", "right", "bottom"]),
              (s = s || []);
            var _ = [],
              w = [];
            i < x[1] &&
              (s.indexOf("top") >= 0
                ? ((i = x[1]), _.push("top"))
                : w.push("top")),
              i + l > x[3] &&
                (s.indexOf("bottom") >= 0
                  ? ((i = x[3] - l), _.push("bottom"))
                  : w.push("bottom")),
              n < x[0] &&
                (s.indexOf("left") >= 0
                  ? ((n = x[0]), _.push("left"))
                  : w.push("left")),
              n + d > x[2] &&
                (s.indexOf("right") >= 0
                  ? ((n = x[2] - d), _.push("right"))
                  : w.push("right")),
              _.length &&
                (function () {
                  var t = void 0;
                  (t =
                    void 0 !== e.options.pinnedClass
                      ? e.options.pinnedClass
                      : e.getClass("pinned")),
                    m.push(t),
                    _.forEach(function (e) {
                      m.push(t + "-" + e);
                    });
                })(),
              w.length &&
                (function () {
                  var t = void 0;
                  (t =
                    void 0 !== e.options.outOfBoundsClass
                      ? e.options.outOfBoundsClass
                      : e.getClass("out-of-bounds")),
                    m.push(t),
                    w.forEach(function (e) {
                      m.push(t + "-" + e);
                    });
                })(),
              (_.indexOf("left") >= 0 || _.indexOf("right") >= 0) &&
                (b.left = v.left = !1),
              (_.indexOf("top") >= 0 || _.indexOf("bottom") >= 0) &&
                (b.top = v.top = !1),
              (v.top === o.top &&
                v.left === o.left &&
                b.top === e.attachment.top &&
                b.left === e.attachment.left) ||
                (e.updateAttachClasses(b, v),
                e.trigger("update", { attachment: b, targetAttachment: v }));
          }),
          T(function () {
            !1 !== e.options.addTargetClasses && f(e.target, m, g),
              f(e.element, m, g);
          }),
          { top: i, left: n }
        );
      },
    });
    var E = _.Utils,
      a = E.getBounds,
      f = E.updateClasses,
      T = E.defer;
    _.modules.push({
      position: function (t) {
        var e = this,
          i = t.top,
          n = t.left,
          o = this.cache("element-bounds", function () {
            return a(e.element);
          }),
          r = o.height,
          s = o.width,
          l = this.getTargetBounds(),
          d = i + r,
          h = n + s,
          u = [];
        i <= l.bottom &&
          d >= l.top &&
          ["left", "right"].forEach(function (t) {
            var e = l[t];
            (e !== n && e !== h) || u.push(t);
          }),
          n <= l.right &&
            h >= l.left &&
            ["top", "bottom"].forEach(function (t) {
              var e = l[t];
              (e !== i && e !== d) || u.push(t);
            });
        var c = [],
          p = [],
          g = ["left", "top", "right", "bottom"];
        return (
          c.push(this.getClass("abutted")),
          g.forEach(function (t) {
            c.push(e.getClass("abutted") + "-" + t);
          }),
          u.length && p.push(this.getClass("abutted")),
          u.forEach(function (t) {
            p.push(e.getClass("abutted") + "-" + t);
          }),
          T(function () {
            !1 !== e.options.addTargetClasses && f(e.target, p, c),
              f(e.element, p, c);
          }),
          !0
        );
      },
    });
    var P = (function () {
      function t(t, e) {
        var i = [],
          n = !0,
          a = !1,
          o = void 0;
        try {
          for (
            var r, s = t[Symbol.iterator]();
            !(n = (r = s.next()).done) &&
            (i.push(r.value), !e || i.length !== e);
            n = !0
          );
        } catch (t) {
          (a = !0), (o = t);
        } finally {
          try {
            !n && s.return && s.return();
          } finally {
            if (a) throw o;
          }
        }
        return i;
      }
      return function (e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })();
    return (
      _.modules.push({
        position: function (t) {
          var e = t.top,
            i = t.left;
          if (this.options.shift) {
            var n = this.options.shift;
            "function" == typeof this.options.shift &&
              (n = this.options.shift.call(this, { top: e, left: i }));
            var a = void 0,
              o = void 0;
            if ("string" == typeof n) {
              (n = n.split(" ")), (n[1] = n[1] || n[0]);
              var r = n,
                s = P(r, 2);
              (a = s[0]),
                (o = s[1]),
                (a = parseFloat(a, 10)),
                (o = parseFloat(o, 10));
            } else (a = n.top), (o = n.left);
            return (e += a), (i += o), { top: e, left: i };
          }
        },
      }),
      q
    );
  }),
  (function (e) {
    e.fn.extend({
      slimScroll: function (i) {
        var n = {
            width: "auto",
            height: "250px",
            size: "7px",
            color: "#000",
            position: "right",
            distance: "1px",
            start: "top",
            opacity: 0.4,
            alwaysVisible: !1,
            disableFadeOut: !1,
            railVisible: !1,
            railColor: "#333",
            railOpacity: 0.2,
            railDraggable: !0,
            railClass: "slimScrollRail",
            barClass: "slimScrollBar",
            wrapperClass: "slimScrollDiv",
            allowPageScroll: !1,
            wheelStep: 20,
            touchScrollStep: 200,
            borderRadius: "7px",
            railBorderRadius: "7px",
          },
          a = e.extend(n, i);
        return (
          this.each(function () {
            function n(t) {
              if (d) {
                var t = t || window.event,
                  i = 0;
                t.wheelDelta && (i = -t.wheelDelta / 120),
                  t.detail && (i = t.detail / 3);
                var n = t.target || t.srcTarget || t.srcElement;
                e(n)
                  .closest("." + a.wrapperClass)
                  .is(x.parent()) && o(i, !0),
                  t.preventDefault && !y && t.preventDefault(),
                  y || (t.returnValue = !1);
              }
            }
            function o(t, e, i) {
              y = !1;
              var n = t,
                o = x.outerHeight() - D.outerHeight();
              if (
                (e &&
                  ((n =
                    parseInt(D.css("top")) +
                    ((t * parseInt(a.wheelStep)) / 100) * D.outerHeight()),
                  (n = Math.min(Math.max(n, 0), o)),
                  (n = t > 0 ? Math.ceil(n) : Math.floor(n)),
                  D.css({ top: n + "px" })),
                (g =
                  parseInt(D.css("top")) / (x.outerHeight() - D.outerHeight())),
                (n = g * (x[0].scrollHeight - x.outerHeight())),
                i)
              ) {
                n = t;
                var r = (n / x[0].scrollHeight) * x.outerHeight();
                (r = Math.min(Math.max(r, 0), o)), D.css({ top: r + "px" });
              }
              x.scrollTop(n), x.trigger("slimscrolling", ~~n), s(), l();
            }
            function r() {
              (p = Math.max(
                (x.outerHeight() / x[0].scrollHeight) * x.outerHeight(),
                b
              )),
                D.css({ height: p + "px" });
              var t = p == x.outerHeight() ? "none" : "block";
              D.css({ display: t });
            }
            function s() {
              if ((r(), clearTimeout(c), g == ~~g)) {
                if (((y = a.allowPageScroll), m != g)) {
                  var t = 0 == ~~g ? "top" : "bottom";
                  x.trigger("slimscroll", t);
                }
              } else y = !1;
              if (((m = g), p >= x.outerHeight())) return void (y = !0);
              D.stop(!0, !0).fadeIn("fast"),
                a.railVisible && M.stop(!0, !0).fadeIn("fast");
            }
            function l() {
              a.alwaysVisible ||
                (c = setTimeout(function () {
                  (a.disableFadeOut && d) ||
                    h ||
                    u ||
                    (D.fadeOut("slow"), M.fadeOut("slow"));
                }, 1e3));
            }
            var d,
              h,
              u,
              c,
              f,
              p,
              g,
              m,
              v = "<div></div>",
              b = 30,
              y = !1,
              x = e(this);
            if (x.parent().hasClass(a.wrapperClass)) {
              var _ = x.scrollTop();
              if (
                ((D = x.siblings("." + a.barClass)),
                (M = x.siblings("." + a.railClass)),
                r(),
                e.isPlainObject(i))
              ) {
                if ("height" in i && "auto" == i.height) {
                  x.parent().css("height", "auto"), x.css("height", "auto");
                  var w = x.parent().parent().height();
                  x.parent().css("height", w), x.css("height", w);
                } else if ("height" in i) {
                  var k = i.height;
                  x.parent().css("height", k), x.css("height", k);
                }
                if ("scrollTo" in i) _ = parseInt(a.scrollTo);
                else if ("scrollBy" in i) _ += parseInt(a.scrollBy);
                else if ("destroy" in i)
                  return D.remove(), M.remove(), void x.unwrap();
                o(_, !1, !0);
              }
            } else if (!(e.isPlainObject(i) && "destroy" in i)) {
              a.height = "auto" == a.height ? x.parent().height() : a.height;
              var C = e(v)
                .addClass(a.wrapperClass)
                .css({
                  position: "relative",
                  overflow: "hidden",
                  width: a.width,
                  height: a.height,
                });
              x.css({ overflow: "hidden", width: a.width, height: a.height });
              var M = e(v)
                  .addClass(a.railClass)
                  .css({
                    width: a.size,
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    display:
                      a.alwaysVisible && a.railVisible ? "block" : "none",
                    "border-radius": a.railBorderRadius,
                    background: a.railColor,
                    opacity: a.railOpacity,
                    zIndex: 90,
                  }),
                D = e(v)
                  .addClass(a.barClass)
                  .css({
                    background: a.color,
                    width: a.size,
                    position: "absolute",
                    top: 0,
                    opacity: a.opacity,
                    display: a.alwaysVisible ? "block" : "none",
                    "border-radius": a.borderRadius,
                    BorderRadius: a.borderRadius,
                    MozBorderRadius: a.borderRadius,
                    WebkitBorderRadius: a.borderRadius,
                    zIndex: 99,
                  }),
                S =
                  "right" == a.position
                    ? { right: a.distance }
                    : { left: a.distance };
              M.css(S),
                D.css(S),
                x.wrap(C),
                x.parent().append(D),
                x.parent().append(M),
                a.railDraggable &&
                  D.bind("mousedown", function (i) {
                    var n = e(document);
                    return (
                      (u = !0),
                      (t = parseFloat(D.css("top"))),
                      (pageY = i.pageY),
                      n.bind("mousemove.slimscroll", function (e) {
                        (currTop = t + e.pageY - pageY),
                          D.css("top", currTop),
                          o(0, D.position().top, !1);
                      }),
                      n.bind("mouseup.slimscroll", function (t) {
                        (u = !1), l(), n.unbind(".slimscroll");
                      }),
                      !1
                    );
                  }).bind("selectstart.slimscroll", function (t) {
                    return t.stopPropagation(), t.preventDefault(), !1;
                  }),
                M.hover(
                  function () {
                    s();
                  },
                  function () {
                    l();
                  }
                ),
                D.hover(
                  function () {
                    h = !0;
                  },
                  function () {
                    h = !1;
                  }
                ),
                x.hover(
                  function () {
                    (d = !0), s(), l();
                  },
                  function () {
                    (d = !1), l();
                  }
                ),
                x.bind("touchstart", function (t, e) {
                  t.originalEvent.touches.length &&
                    (f = t.originalEvent.touches[0].pageY);
                }),
                x.bind("touchmove", function (t) {
                  if (
                    (y || t.originalEvent.preventDefault(),
                    t.originalEvent.touches.length)
                  ) {
                    o(
                      (f - t.originalEvent.touches[0].pageY) /
                        a.touchScrollStep,
                      !0
                    ),
                      (f = t.originalEvent.touches[0].pageY);
                  }
                }),
                r(),
                "bottom" === a.start
                  ? (D.css({ top: x.outerHeight() - D.outerHeight() }),
                    o(0, !0))
                  : "top" !== a.start &&
                    (o(e(a.start).position().top, null, !0),
                    a.alwaysVisible || D.hide()),
                (function (t) {
                  window.addEventListener
                    ? (t.addEventListener("DOMMouseScroll", n, !1),
                      t.addEventListener("mousewheel", n, !1))
                    : document.attachEvent("onmousewheel", n);
                })(this);
            }
          }),
          this
        );
      },
    }),
      e.fn.extend({ slimscroll: e.fn.slimScroll });
  })(jQuery),
  (function (t, e) {
    "use strict";
    t.ajaxPrefilter(function (t, e, i) {
      if (t.iframe) return (t.originalURL = t.url), "iframe";
    }),
      t.ajaxTransport("iframe", function (e, i, n) {
        function a() {
          l.each(function (e, i) {
            var n = t(i);
            n.data("clone").replaceWith(n);
          }),
            o.remove(),
            r.one("load", function () {
              r.remove();
            }),
            r.attr("src", "javascript:false;");
        }
        var o = null,
          r = null,
          s = "iframe-" + t.now(),
          l = t(e.files).filter(":file:enabled"),
          d = null;
        if ((e.dataTypes.shift(), (e.data = i.data), l.length))
          return (
            (o = t("<form enctype='multipart/form-data' method='post'></form>")
              .hide()
              .attr({ action: e.originalURL, target: s })),
            "string" == typeof e.data &&
              e.data.length > 0 &&
              t.error("data must not be serialized"),
            t.each(e.data || {}, function (e, i) {
              t.isPlainObject(i) && ((e = i.name), (i = i.value)),
                t("<input type='hidden' />")
                  .attr({ name: e, value: i })
                  .appendTo(o);
            }),
            t(
              "<input type='hidden' value='IFrame' name='X-Requested-With' />"
            ).appendTo(o),
            (d =
              e.dataTypes[0] && e.accepts[e.dataTypes[0]]
                ? e.accepts[e.dataTypes[0]] +
                  ("*" !== e.dataTypes[0] ? ", */*; q=0.01" : "")
                : e.accepts["*"]),
            t("<input type='hidden' name='X-HTTP-Accept'>")
              .attr("value", d)
              .appendTo(o),
            l
              .after(function (e) {
                var i = t(this),
                  n = i.clone().prop("disabled", !0);
                return i.data("clone", n), n;
              })
              .next(),
            l.appendTo(o),
            {
              send: function (e, i) {
                (r = t(
                  "<iframe src='javascript:false;' name='" +
                    s +
                    "' id='" +
                    s +
                    "' style='display:none'></iframe>"
                )),
                  r.one("load", function () {
                    r.one("load", function () {
                      var t = this.contentWindow
                          ? this.contentWindow.document
                          : this.contentDocument
                          ? this.contentDocument
                          : this.document,
                        e = t.documentElement ? t.documentElement : t.body,
                        n = e.getElementsByTagName("textarea")[0],
                        o = (n && n.getAttribute("data-type")) || null,
                        r = (n && n.getAttribute("data-status")) || 200,
                        s = (n && n.getAttribute("data-statusText")) || "OK",
                        l = {
                          html: e.innerHTML,
                          text: o
                            ? n.value
                            : e
                            ? e.textContent || e.innerText
                            : null,
                        };
                      a(), i(r, s, l, o ? "Content-Type: " + o : null);
                    }),
                      o[0].submit();
                  }),
                  t("body").append(o, r);
              },
              abort: function () {
                null !== r &&
                  (r.unbind("load").attr("src", "javascript:false;"), a());
              },
            }
          );
      });
  })(jQuery),
  (function (t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery", "jquery-ui/ui/widget"], t)
      : "object" == typeof exports
      ? t(require("jquery"), require("./vendor/jquery.ui.widget"))
      : t(window.jQuery);
  })(function (t) {
    "use strict";
    function e(e) {
      var i = "dragover" === e;
      return function (n) {
        n.dataTransfer = n.originalEvent && n.originalEvent.dataTransfer;
        var a = n.dataTransfer;
        a &&
          -1 !== t.inArray("Files", a.types) &&
          !1 !== this._trigger(e, t.Event(e, { delegatedEvent: n })) &&
          (n.preventDefault(), i && (a.dropEffect = "copy"));
      };
    }
    (t.support.fileInput = !(
      new RegExp(
        "(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))"
      ).test(window.navigator.userAgent) ||
      t('<input type="file"/>').prop("disabled")
    )),
      (t.support.xhrFileUpload = !(
        !window.ProgressEvent || !window.FileReader
      )),
      (t.support.xhrFormDataFileUpload = !!window.FormData),
      (t.support.blobSlice =
        window.Blob &&
        (Blob.prototype.slice ||
          Blob.prototype.webkitSlice ||
          Blob.prototype.mozSlice)),
      t.widget("blueimp.fileupload", {
        options: {
          dropZone: t(document),
          pasteZone: void 0,
          fileInput: void 0,
          replaceFileInput: !0,
          paramName: void 0,
          singleFileUploads: !0,
          limitMultiFileUploads: void 0,
          limitMultiFileUploadSize: void 0,
          limitMultiFileUploadSizeOverhead: 512,
          sequentialUploads: !1,
          limitConcurrentUploads: void 0,
          forceIframeTransport: !1,
          redirect: void 0,
          redirectParamName: void 0,
          postMessage: void 0,
          multipart: !0,
          maxChunkSize: void 0,
          uploadedBytes: void 0,
          recalculateProgress: !0,
          progressInterval: 100,
          bitrateInterval: 500,
          autoUpload: !0,
          uniqueFilenames: void 0,
          messages: { uploadedBytes: "Uploaded bytes exceed file size" },
          i18n: function (e, i) {
            return (
              (e = this.messages[e] || e.toString()),
              i &&
                t.each(i, function (t, i) {
                  e = e.replace("{" + t + "}", i);
                }),
              e
            );
          },
          formData: function (t) {
            return t.serializeArray();
          },
          add: function (e, i) {
            if (e.isDefaultPrevented()) return !1;
            (i.autoUpload ||
              (!1 !== i.autoUpload &&
                t(this).fileupload("option", "autoUpload"))) &&
              i.process().done(function () {
                i.submit();
              });
          },
          processData: !1,
          contentType: !1,
          cache: !1,
          timeout: 0,
        },
        _specialOptions: [
          "fileInput",
          "dropZone",
          "pasteZone",
          "multipart",
          "forceIframeTransport",
        ],
        _blobSlice:
          t.support.blobSlice &&
          function () {
            return (this.slice || this.webkitSlice || this.mozSlice).apply(
              this,
              arguments
            );
          },
        _BitrateTimer: function () {
          (this.timestamp = Date.now ? Date.now() : new Date().getTime()),
            (this.loaded = 0),
            (this.bitrate = 0),
            (this.getBitrate = function (t, e, i) {
              var n = t - this.timestamp;
              return (
                (!this.bitrate || !i || n > i) &&
                  ((this.bitrate = (e - this.loaded) * (1e3 / n) * 8),
                  (this.loaded = e),
                  (this.timestamp = t)),
                this.bitrate
              );
            });
        },
        _isXHRUpload: function (e) {
          return (
            !e.forceIframeTransport &&
            ((!e.multipart && t.support.xhrFileUpload) ||
              t.support.xhrFormDataFileUpload)
          );
        },
        _getFormData: function (e) {
          var i;
          return "function" === t.type(e.formData)
            ? e.formData(e.form)
            : t.isArray(e.formData)
            ? e.formData
            : "object" === t.type(e.formData)
            ? ((i = []),
              t.each(e.formData, function (t, e) {
                i.push({ name: t, value: e });
              }),
              i)
            : [];
        },
        _getTotal: function (e) {
          var i = 0;
          return (
            t.each(e, function (t, e) {
              i += e.size || 1;
            }),
            i
          );
        },
        _initProgressObject: function (e) {
          var i = { loaded: 0, total: 0, bitrate: 0 };
          e._progress ? t.extend(e._progress, i) : (e._progress = i);
        },
        _initResponseObject: function (t) {
          var e;
          if (t._response)
            for (e in t._response)
              t._response.hasOwnProperty(e) && delete t._response[e];
          else t._response = {};
        },
        _onProgress: function (e, i) {
          if (e.lengthComputable) {
            var n,
              a = Date.now ? Date.now() : new Date().getTime();
            if (
              i._time &&
              i.progressInterval &&
              a - i._time < i.progressInterval &&
              e.loaded !== e.total
            )
              return;
            (i._time = a),
              (n =
                Math.floor(
                  (e.loaded / e.total) * (i.chunkSize || i._progress.total)
                ) + (i.uploadedBytes || 0)),
              (this._progress.loaded += n - i._progress.loaded),
              (this._progress.bitrate = this._bitrateTimer.getBitrate(
                a,
                this._progress.loaded,
                i.bitrateInterval
              )),
              (i._progress.loaded = i.loaded = n),
              (i._progress.bitrate = i.bitrate =
                i._bitrateTimer.getBitrate(a, n, i.bitrateInterval)),
              this._trigger(
                "progress",
                t.Event("progress", { delegatedEvent: e }),
                i
              ),
              this._trigger(
                "progressall",
                t.Event("progressall", { delegatedEvent: e }),
                this._progress
              );
          }
        },
        _initProgressListener: function (e) {
          var i = this,
            n = e.xhr ? e.xhr() : t.ajaxSettings.xhr();
          n.upload &&
            (t(n.upload).bind("progress", function (t) {
              var n = t.originalEvent;
              (t.lengthComputable = n.lengthComputable),
                (t.loaded = n.loaded),
                (t.total = n.total),
                i._onProgress(t, e);
            }),
            (e.xhr = function () {
              return n;
            }));
        },
        _deinitProgressListener: function (e) {
          var i = e.xhr ? e.xhr() : t.ajaxSettings.xhr();
          i.upload && t(i.upload).unbind("progress");
        },
        _isInstanceOf: function (t, e) {
          return Object.prototype.toString.call(e) === "[object " + t + "]";
        },
        _getUniqueFilename: function (t, e) {
          return (
            (t = String(t)),
            e[t]
              ? ((t = t.replace(
                  /(?: \(([\d]+)\))?(\.[^.]+)?$/,
                  function (t, e, i) {
                    return " (" + (e ? Number(e) + 1 : 1) + ")" + (i || "");
                  }
                )),
                this._getUniqueFilename(t, e))
              : ((e[t] = !0), t)
          );
        },
        _initXHRData: function (e) {
          var i,
            n = this,
            a = e.files[0],
            o = e.multipart || !t.support.xhrFileUpload,
            r = "array" === t.type(e.paramName) ? e.paramName[0] : e.paramName;
          (e.headers = t.extend({}, e.headers)),
            e.contentRange && (e.headers["Content-Range"] = e.contentRange),
            (o && !e.blob && this._isInstanceOf("File", a)) ||
              (e.headers["Content-Disposition"] =
                'attachment; filename="' +
                encodeURI(a.uploadName || a.name) +
                '"'),
            o
              ? t.support.xhrFormDataFileUpload &&
                (e.postMessage
                  ? ((i = this._getFormData(e)),
                    e.blob
                      ? i.push({ name: r, value: e.blob })
                      : t.each(e.files, function (n, a) {
                          i.push({
                            name:
                              ("array" === t.type(e.paramName) &&
                                e.paramName[n]) ||
                              r,
                            value: a,
                          });
                        }))
                  : (n._isInstanceOf("FormData", e.formData)
                      ? (i = e.formData)
                      : ((i = new FormData()),
                        t.each(this._getFormData(e), function (t, e) {
                          i.append(e.name, e.value);
                        })),
                    e.blob
                      ? i.append(r, e.blob, a.uploadName || a.name)
                      : t.each(e.files, function (a, o) {
                          if (
                            n._isInstanceOf("File", o) ||
                            n._isInstanceOf("Blob", o)
                          ) {
                            var s = o.uploadName || o.name;
                            e.uniqueFilenames &&
                              (s = n._getUniqueFilename(s, e.uniqueFilenames)),
                              i.append(
                                ("array" === t.type(e.paramName) &&
                                  e.paramName[a]) ||
                                  r,
                                o,
                                s
                              );
                          }
                        })),
                (e.data = i))
              : ((e.contentType = a.type || "application/octet-stream"),
                (e.data = e.blob || a)),
            (e.blob = null);
        },
        _initIframeSettings: function (e) {
          var i = t("<a></a>").prop("href", e.url).prop("host");
          (e.dataType = "iframe " + (e.dataType || "")),
            (e.formData = this._getFormData(e)),
            e.redirect &&
              i &&
              i !== location.host &&
              e.formData.push({
                name: e.redirectParamName || "redirect",
                value: e.redirect,
              });
        },
        _initDataSettings: function (t) {
          this._isXHRUpload(t)
            ? (this._chunkedUpload(t, !0) ||
                (t.data || this._initXHRData(t), this._initProgressListener(t)),
              t.postMessage &&
                (t.dataType = "postmessage " + (t.dataType || "")))
            : this._initIframeSettings(t);
        },
        _getParamName: function (e) {
          var i = t(e.fileInput),
            n = e.paramName;
          return (
            n
              ? t.isArray(n) || (n = [n])
              : ((n = []),
                i.each(function () {
                  for (
                    var e = t(this),
                      i = e.prop("name") || "files[]",
                      a = (e.prop("files") || [1]).length;
                    a;

                  )
                    n.push(i), (a -= 1);
                }),
                n.length || (n = [i.prop("name") || "files[]"])),
            n
          );
        },
        _initFormSettings: function (e) {
          (e.form && e.form.length) ||
            ((e.form = t(e.fileInput.prop("form"))),
            e.form.length || (e.form = t(this.options.fileInput.prop("form")))),
            (e.paramName = this._getParamName(e)),
            e.url || (e.url = e.form.prop("action") || location.href),
            (e.type = (
              e.type ||
              ("string" === t.type(e.form.prop("method")) &&
                e.form.prop("method")) ||
              ""
            ).toUpperCase()),
            "POST" !== e.type &&
              "PUT" !== e.type &&
              "PATCH" !== e.type &&
              (e.type = "POST"),
            e.formAcceptCharset ||
              (e.formAcceptCharset = e.form.attr("accept-charset"));
        },
        _getAJAXSettings: function (e) {
          var i = t.extend({}, this.options, e);
          return this._initFormSettings(i), this._initDataSettings(i), i;
        },
        _getDeferredState: function (t) {
          return t.state
            ? t.state()
            : t.isResolved()
            ? "resolved"
            : t.isRejected()
            ? "rejected"
            : "pending";
        },
        _enhancePromise: function (t) {
          return (
            (t.success = t.done), (t.error = t.fail), (t.complete = t.always), t
          );
        },
        _getXHRPromise: function (e, i, n) {
          var a = t.Deferred(),
            o = a.promise();
          return (
            (i = i || this.options.context || o),
            !0 === e ? a.resolveWith(i, n) : !1 === e && a.rejectWith(i, n),
            (o.abort = a.promise),
            this._enhancePromise(o)
          );
        },
        _addConvenienceMethods: function (e, i) {
          var n = this,
            a = function (e) {
              return t.Deferred().resolveWith(n, e).promise();
            };
          (i.process = function (e, o) {
            return (
              (e || o) &&
                (i._processQueue = this._processQueue =
                  (this._processQueue || a([this]))
                    .then(function () {
                      return i.errorThrown
                        ? t.Deferred().rejectWith(n, [i]).promise()
                        : a(arguments);
                    })
                    .then(e, o)),
              this._processQueue || a([this])
            );
          }),
            (i.submit = function () {
              return (
                "pending" !== this.state() &&
                  (i.jqXHR = this.jqXHR =
                    !1 !==
                      n._trigger(
                        "submit",
                        t.Event("submit", { delegatedEvent: e }),
                        this
                      ) && n._onSend(e, this)),
                this.jqXHR || n._getXHRPromise()
              );
            }),
            (i.abort = function () {
              return this.jqXHR
                ? this.jqXHR.abort()
                : ((this.errorThrown = "abort"),
                  n._trigger("fail", null, this),
                  n._getXHRPromise(!1));
            }),
            (i.state = function () {
              return this.jqXHR
                ? n._getDeferredState(this.jqXHR)
                : this._processQueue
                ? n._getDeferredState(this._processQueue)
                : void 0;
            }),
            (i.processing = function () {
              return (
                !this.jqXHR &&
                this._processQueue &&
                "pending" === n._getDeferredState(this._processQueue)
              );
            }),
            (i.progress = function () {
              return this._progress;
            }),
            (i.response = function () {
              return this._response;
            });
        },
        _getUploadedBytes: function (t) {
          var e = t.getResponseHeader("Range"),
            i = e && e.split("-"),
            n = i && i.length > 1 && parseInt(i[1], 10);
          return n && n + 1;
        },
        _chunkedUpload: function (e, i) {
          e.uploadedBytes = e.uploadedBytes || 0;
          var n,
            a,
            o = this,
            r = e.files[0],
            s = r.size,
            l = e.uploadedBytes,
            d = e.maxChunkSize || s,
            h = this._blobSlice,
            u = t.Deferred(),
            c = u.promise();
          return (
            !(
              !(
                this._isXHRUpload(e) &&
                h &&
                (l || ("function" === t.type(d) ? d(e) : d) < s)
              ) || e.data
            ) &&
            (!!i ||
              (l >= s
                ? ((r.error = e.i18n("uploadedBytes")),
                  this._getXHRPromise(!1, e.context, [null, "error", r.error]))
                : ((a = function () {
                    var i = t.extend({}, e),
                      c = i._progress.loaded;
                    (i.blob = h.call(
                      r,
                      l,
                      l + ("function" === t.type(d) ? d(i) : d),
                      r.type
                    )),
                      (i.chunkSize = i.blob.size),
                      (i.contentRange =
                        "bytes " + l + "-" + (l + i.chunkSize - 1) + "/" + s),
                      o._trigger("chunkbeforesend", null, i),
                      o._initXHRData(i),
                      o._initProgressListener(i),
                      (n = (
                        (!1 !== o._trigger("chunksend", null, i) &&
                          t.ajax(i)) ||
                        o._getXHRPromise(!1, i.context)
                      )
                        .done(function (n, r, d) {
                          (l = o._getUploadedBytes(d) || l + i.chunkSize),
                            c + i.chunkSize - i._progress.loaded &&
                              o._onProgress(
                                t.Event("progress", {
                                  lengthComputable: !0,
                                  loaded: l - i.uploadedBytes,
                                  total: l - i.uploadedBytes,
                                }),
                                i
                              ),
                            (e.uploadedBytes = i.uploadedBytes = l),
                            (i.result = n),
                            (i.textStatus = r),
                            (i.jqXHR = d),
                            o._trigger("chunkdone", null, i),
                            o._trigger("chunkalways", null, i),
                            l < s ? a() : u.resolveWith(i.context, [n, r, d]);
                        })
                        .fail(function (t, e, n) {
                          (i.jqXHR = t),
                            (i.textStatus = e),
                            (i.errorThrown = n),
                            o._trigger("chunkfail", null, i),
                            o._trigger("chunkalways", null, i),
                            u.rejectWith(i.context, [t, e, n]);
                        })
                        .always(function () {
                          o._deinitProgressListener(i);
                        }));
                  }),
                  this._enhancePromise(c),
                  (c.abort = function () {
                    return n.abort();
                  }),
                  a(),
                  c)))
          );
        },
        _beforeSend: function (t, e) {
          0 === this._active &&
            (this._trigger("start"),
            (this._bitrateTimer = new this._BitrateTimer()),
            (this._progress.loaded = this._progress.total = 0),
            (this._progress.bitrate = 0)),
            this._initResponseObject(e),
            this._initProgressObject(e),
            (e._progress.loaded = e.loaded = e.uploadedBytes || 0),
            (e._progress.total = e.total = this._getTotal(e.files) || 1),
            (e._progress.bitrate = e.bitrate = 0),
            (this._active += 1),
            (this._progress.loaded += e.loaded),
            (this._progress.total += e.total);
        },
        _onDone: function (e, i, n, a) {
          var o = a._progress.total,
            r = a._response;
          a._progress.loaded < o &&
            this._onProgress(
              t.Event("progress", {
                lengthComputable: !0,
                loaded: o,
                total: o,
              }),
              a
            ),
            (r.result = a.result = e),
            (r.textStatus = a.textStatus = i),
            (r.jqXHR = a.jqXHR = n),
            this._trigger("done", null, a);
        },
        _onFail: function (t, e, i, n) {
          var a = n._response;
          n.recalculateProgress &&
            ((this._progress.loaded -= n._progress.loaded),
            (this._progress.total -= n._progress.total)),
            (a.jqXHR = n.jqXHR = t),
            (a.textStatus = n.textStatus = e),
            (a.errorThrown = n.errorThrown = i),
            this._trigger("fail", null, n);
        },
        _onAlways: function (t, e, i, n) {
          this._trigger("always", null, n);
        },
        _onSend: function (e, i) {
          i.submit || this._addConvenienceMethods(e, i);
          var n,
            a,
            o,
            r,
            s = this,
            l = s._getAJAXSettings(i),
            d = function () {
              return (
                (s._sending += 1),
                (l._bitrateTimer = new s._BitrateTimer()),
                (n =
                  n ||
                  (
                    ((a ||
                      !1 ===
                        s._trigger(
                          "send",
                          t.Event("send", { delegatedEvent: e }),
                          l
                        )) &&
                      s._getXHRPromise(!1, l.context, a)) ||
                    s._chunkedUpload(l) ||
                    t.ajax(l)
                  )
                    .done(function (t, e, i) {
                      s._onDone(t, e, i, l);
                    })
                    .fail(function (t, e, i) {
                      s._onFail(t, e, i, l);
                    })
                    .always(function (t, e, i) {
                      if (
                        (s._deinitProgressListener(l),
                        s._onAlways(t, e, i, l),
                        (s._sending -= 1),
                        (s._active -= 1),
                        l.limitConcurrentUploads &&
                          l.limitConcurrentUploads > s._sending)
                      )
                        for (var n = s._slots.shift(); n; ) {
                          if ("pending" === s._getDeferredState(n)) {
                            n.resolve();
                            break;
                          }
                          n = s._slots.shift();
                        }
                      0 === s._active && s._trigger("stop");
                    }))
              );
            };
          return (
            this._beforeSend(e, l),
            this.options.sequentialUploads ||
            (this.options.limitConcurrentUploads &&
              this.options.limitConcurrentUploads <= this._sending)
              ? (this.options.limitConcurrentUploads > 1
                  ? ((o = t.Deferred()), this._slots.push(o), (r = o.then(d)))
                  : ((this._sequence = this._sequence.then(d, d)),
                    (r = this._sequence)),
                (r.abort = function () {
                  return (
                    (a = [void 0, "abort", "abort"]),
                    n ? n.abort() : (o && o.rejectWith(l.context, a), d())
                  );
                }),
                this._enhancePromise(r))
              : d()
          );
        },
        _onAdd: function (e, i) {
          var n,
            a,
            o,
            r,
            s = this,
            l = !0,
            d = t.extend({}, this.options, i),
            h = i.files,
            u = h.length,
            c = d.limitMultiFileUploads,
            f = d.limitMultiFileUploadSize,
            p = d.limitMultiFileUploadSizeOverhead,
            g = 0,
            m = this._getParamName(d),
            v = 0;
          if (!u) return !1;
          if (
            (f && void 0 === h[0].size && (f = void 0),
            (d.singleFileUploads || c || f) && this._isXHRUpload(d))
          )
            if (d.singleFileUploads || f || !c)
              if (!d.singleFileUploads && f)
                for (o = [], n = [], r = 0; r < u; r += 1)
                  (g += h[r].size + p),
                    (r + 1 === u ||
                      g + h[r + 1].size + p > f ||
                      (c && r + 1 - v >= c)) &&
                      (o.push(h.slice(v, r + 1)),
                      (a = m.slice(v, r + 1)),
                      a.length || (a = m),
                      n.push(a),
                      (v = r + 1),
                      (g = 0));
              else n = m;
            else
              for (o = [], n = [], r = 0; r < u; r += c)
                o.push(h.slice(r, r + c)),
                  (a = m.slice(r, r + c)),
                  a.length || (a = m),
                  n.push(a);
          else (o = [h]), (n = [m]);
          return (
            (i.originalFiles = h),
            t.each(o || h, function (a, r) {
              var d = t.extend({}, i);
              return (
                (d.files = o ? r : [r]),
                (d.paramName = n[a]),
                s._initResponseObject(d),
                s._initProgressObject(d),
                s._addConvenienceMethods(e, d),
                (l = s._trigger(
                  "add",
                  t.Event("add", { delegatedEvent: e }),
                  d
                ))
              );
            }),
            l
          );
        },
        _replaceFileInput: function (e) {
          var i = e.fileInput,
            n = i.clone(!0),
            a = i.is(document.activeElement);
          (e.fileInputClone = n),
            t("<form></form>").append(n)[0].reset(),
            i.after(n).detach(),
            a && n.focus(),
            t.cleanData(i.unbind("remove")),
            (this.options.fileInput = this.options.fileInput.map(function (
              t,
              e
            ) {
              return e === i[0] ? n[0] : e;
            })),
            i[0] === this.element[0] && (this.element = n);
        },
        _handleFileTreeEntry: function (e, i) {
          var n,
            a = this,
            o = t.Deferred(),
            r = [],
            s = function (t) {
              t && !t.entry && (t.entry = e), o.resolve([t]);
            },
            l = function (t) {
              a._handleFileTreeEntries(t, i + e.name + "/")
                .done(function (t) {
                  o.resolve(t);
                })
                .fail(s);
            },
            d = function () {
              n.readEntries(function (t) {
                t.length ? ((r = r.concat(t)), d()) : l(r);
              }, s);
            };
          return (
            (i = i || ""),
            e.isFile
              ? e._file
                ? ((e._file.relativePath = i), o.resolve(e._file))
                : e.file(function (t) {
                    (t.relativePath = i), o.resolve(t);
                  }, s)
              : e.isDirectory
              ? ((n = e.createReader()), d())
              : o.resolve([]),
            o.promise()
          );
        },
        _handleFileTreeEntries: function (e, i) {
          var n = this;
          return t.when
            .apply(
              t,
              t.map(e, function (t) {
                return n._handleFileTreeEntry(t, i);
              })
            )
            .then(function () {
              return Array.prototype.concat.apply([], arguments);
            });
        },
        _getDroppedFiles: function (e) {
          e = e || {};
          var i = e.items;
          return i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry)
            ? this._handleFileTreeEntries(
                t.map(i, function (t) {
                  var e;
                  return t.webkitGetAsEntry
                    ? ((e = t.webkitGetAsEntry()),
                      e && (e._file = t.getAsFile()),
                      e)
                    : t.getAsEntry();
                })
              )
            : t.Deferred().resolve(t.makeArray(e.files)).promise();
        },
        _getSingleFileInputFiles: function (e) {
          e = t(e);
          var i,
            n,
            a = e.prop("webkitEntries") || e.prop("entries");
          if (a && a.length) return this._handleFileTreeEntries(a);
          if (((i = t.makeArray(e.prop("files"))), i.length))
            void 0 === i[0].name &&
              i[0].fileName &&
              t.each(i, function (t, e) {
                (e.name = e.fileName), (e.size = e.fileSize);
              });
          else {
            if (!(n = e.prop("value")))
              return t.Deferred().resolve([]).promise();
            i = [{ name: n.replace(/^.*\\/, "") }];
          }
          return t.Deferred().resolve(i).promise();
        },
        _getFileInputFiles: function (e) {
          return e instanceof t && 1 !== e.length
            ? t.when
                .apply(t, t.map(e, this._getSingleFileInputFiles))
                .then(function () {
                  return Array.prototype.concat.apply([], arguments);
                })
            : this._getSingleFileInputFiles(e);
        },
        _onChange: function (e) {
          var i = this,
            n = { fileInput: t(e.target), form: t(e.target.form) };
          this._getFileInputFiles(n.fileInput).always(function (a) {
            (n.files = a),
              i.options.replaceFileInput && i._replaceFileInput(n),
              !1 !==
                i._trigger(
                  "change",
                  t.Event("change", { delegatedEvent: e }),
                  n
                ) && i._onAdd(e, n);
          });
        },
        _onPaste: function (e) {
          var i =
              e.originalEvent &&
              e.originalEvent.clipboardData &&
              e.originalEvent.clipboardData.items,
            n = { files: [] };
          i &&
            i.length &&
            (t.each(i, function (t, e) {
              var i = e.getAsFile && e.getAsFile();
              i && n.files.push(i);
            }),
            !1 !==
              this._trigger(
                "paste",
                t.Event("paste", { delegatedEvent: e }),
                n
              ) && this._onAdd(e, n));
        },
        _onDrop: function (e) {
          e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
          var i = this,
            n = e.dataTransfer,
            a = {};
          n &&
            n.files &&
            n.files.length &&
            (e.preventDefault(),
            this._getDroppedFiles(n).always(function (n) {
              (a.files = n),
                !1 !==
                  i._trigger(
                    "drop",
                    t.Event("drop", { delegatedEvent: e }),
                    a
                  ) && i._onAdd(e, a);
            }));
        },
        _onDragOver: e("dragover"),
        _onDragEnter: e("dragenter"),
        _onDragLeave: e("dragleave"),
        _initEventHandlers: function () {
          this._isXHRUpload(this.options) &&
            (this._on(this.options.dropZone, {
              dragover: this._onDragOver,
              drop: this._onDrop,
              dragenter: this._onDragEnter,
              dragleave: this._onDragLeave,
            }),
            this._on(this.options.pasteZone, { paste: this._onPaste })),
            t.support.fileInput &&
              this._on(this.options.fileInput, { change: this._onChange });
        },
        _destroyEventHandlers: function () {
          this._off(this.options.dropZone, "dragenter dragleave dragover drop"),
            this._off(this.options.pasteZone, "paste"),
            this._off(this.options.fileInput, "change");
        },
        _destroy: function () {
          this._destroyEventHandlers();
        },
        _setOption: function (e, i) {
          var n = -1 !== t.inArray(e, this._specialOptions);
          n && this._destroyEventHandlers(),
            this._super(e, i),
            n && (this._initSpecialOptions(), this._initEventHandlers());
        },
        _initSpecialOptions: function () {
          var e = this.options;
          void 0 === e.fileInput
            ? (e.fileInput = this.element.is('input[type="file"]')
                ? this.element
                : this.element.find('input[type="file"]'))
            : e.fileInput instanceof t || (e.fileInput = t(e.fileInput)),
            e.dropZone instanceof t || (e.dropZone = t(e.dropZone)),
            e.pasteZone instanceof t || (e.pasteZone = t(e.pasteZone));
        },
        _getRegExp: function (t) {
          var e = t.split("/"),
            i = e.pop();
          return e.shift(), new RegExp(e.join("/"), i);
        },
        _isRegExpOption: function (e, i) {
          return (
            "url" !== e &&
            "string" === t.type(i) &&
            /^\/.*\/[igm]{0,3}$/.test(i)
          );
        },
        _initDataAttributes: function () {
          var e = this,
            i = this.options,
            n = this.element.data();
          t.each(this.element[0].attributes, function (t, a) {
            var o,
              r = a.name.toLowerCase();
            /^data-/.test(r) &&
              ((r = r.slice(5).replace(/-[a-z]/g, function (t) {
                return t.charAt(1).toUpperCase();
              })),
              (o = n[r]),
              e._isRegExpOption(r, o) && (o = e._getRegExp(o)),
              (i[r] = o));
          });
        },
        _create: function () {
          this._initDataAttributes(),
            this._initSpecialOptions(),
            (this._slots = []),
            (this._sequence = this._getXHRPromise(!0)),
            (this._sending = this._active = 0),
            this._initProgressObject(this),
            this._initEventHandlers();
        },
        active: function () {
          return this._active;
        },
        progress: function () {
          return this._progress;
        },
        add: function (e) {
          var i = this;
          e &&
            !this.options.disabled &&
            (e.fileInput && !e.files
              ? this._getFileInputFiles(e.fileInput).always(function (t) {
                  (e.files = t), i._onAdd(null, e);
                })
              : ((e.files = t.makeArray(e.files)), this._onAdd(null, e)));
        },
        send: function (e) {
          if (e && !this.options.disabled) {
            if (e.fileInput && !e.files) {
              var i,
                n,
                a = this,
                o = t.Deferred(),
                r = o.promise();
              return (
                (r.abort = function () {
                  return (
                    (n = !0),
                    i ? i.abort() : (o.reject(null, "abort", "abort"), r)
                  );
                }),
                this._getFileInputFiles(e.fileInput).always(function (t) {
                  if (!n) {
                    if (!t.length) return void o.reject();
                    (e.files = t),
                      (i = a._onSend(null, e)),
                      i.then(
                        function (t, e, i) {
                          o.resolve(t, e, i);
                        },
                        function (t, e, i) {
                          o.reject(t, e, i);
                        }
                      );
                  }
                }),
                this._enhancePromise(r)
              );
            }
            if (((e.files = t.makeArray(e.files)), e.files.length))
              return this._onSend(null, e);
          }
          return this._getXHRPromise(!1, e && e.context);
        },
      });
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (t) {
          return e(t);
        })
      : "object" == typeof exports
      ? (module.exports = e(require("jquery")))
      : jQuery && !jQuery.fn.colorpicker && e(jQuery);
  })(0, function (t) {
    "use strict";
    var e = function (i, n, a, o, r) {
      (this.fallbackValue = a
        ? "string" == typeof a
          ? this.parse(a)
          : a
        : null),
        (this.fallbackFormat = o || "rgba"),
        (this.hexNumberSignPrefix = !0 === r),
        (this.value = this.fallbackValue),
        (this.origFormat = null),
        (this.predefinedColors = n || {}),
        (this.colors = t.extend({}, e.webColors, this.predefinedColors)),
        i && (void 0 !== i.h ? (this.value = i) : this.setColor(String(i))),
        this.value || (this.value = { h: 0, s: 0, b: 0, a: 1 });
    };
    (e.webColors = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgrey: "d3d3d3",
      lightgreen: "90ee90",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "778899",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "00ff00",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "ff00ff",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370d8",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "d87093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      red: "ff0000",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "ffffff",
      whitesmoke: "f5f5f5",
      yellow: "ffff00",
      yellowgreen: "9acd32",
      transparent: "transparent",
    }),
      (e.prototype = {
        constructor: e,
        colors: {},
        predefinedColors: {},
        getValue: function () {
          return this.value;
        },
        setValue: function (t) {
          this.value = t;
        },
        _sanitizeNumber: function (t) {
          return "number" == typeof t
            ? t
            : isNaN(t) || null === t || "" === t || void 0 === t
            ? 1
            : "" === t
            ? 0
            : void 0 !== t.toLowerCase
            ? (t.match(/^\./) && (t = "0" + t),
              Math.ceil(100 * parseFloat(t)) / 100)
            : 1;
        },
        isTransparent: function (t) {
          return (
            !(!t || !("string" == typeof t || t instanceof String)) &&
            ("transparent" === (t = t.toLowerCase().trim()) ||
              t.match(/#?00000000/) ||
              t.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/))
          );
        },
        rgbaIsTransparent: function (t) {
          return 0 === t.r && 0 === t.g && 0 === t.b && 0 === t.a;
        },
        setColor: function (t) {
          if ((t = t.toLowerCase().trim())) {
            if (this.isTransparent(t))
              return (this.value = { h: 0, s: 0, b: 0, a: 0 }), !0;
            var e = this.parse(t);
            e
              ? ((this.value = this.value = { h: e.h, s: e.s, b: e.b, a: e.a }),
                this.origFormat || (this.origFormat = e.format))
              : this.fallbackValue && (this.value = this.fallbackValue);
          }
          return !1;
        },
        setHue: function (t) {
          this.value.h = 1 - t;
        },
        setSaturation: function (t) {
          this.value.s = t;
        },
        setBrightness: function (t) {
          this.value.b = 1 - t;
        },
        setAlpha: function (t) {
          this.value.a =
            Math.round((parseInt(100 * (1 - t), 10) / 100) * 100) / 100;
        },
        toRGB: function (t, e, i, n) {
          0 === arguments.length &&
            ((t = this.value.h),
            (e = this.value.s),
            (i = this.value.b),
            (n = this.value.a)),
            (t *= 360);
          var a, o, r, s, l;
          return (
            (t = (t % 360) / 60),
            (l = i * e),
            (s = l * (1 - Math.abs((t % 2) - 1))),
            (a = o = r = i - l),
            (t = ~~t),
            (a += [l, s, 0, 0, s, l][t]),
            (o += [s, l, l, s, 0, 0][t]),
            (r += [0, 0, s, l, l, s][t]),
            {
              r: Math.round(255 * a),
              g: Math.round(255 * o),
              b: Math.round(255 * r),
              a: n,
            }
          );
        },
        toHex: function (t, e, i, n, a) {
          arguments.length <= 1 &&
            ((e = this.value.h),
            (i = this.value.s),
            (n = this.value.b),
            (a = this.value.a));
          var o = "#",
            r = this.toRGB(e, i, n, a);
          return this.rgbaIsTransparent(r)
            ? "transparent"
            : (t || (o = this.hexNumberSignPrefix ? "#" : ""),
              o +
                (
                  (1 << 24) +
                  (parseInt(r.r) << 16) +
                  (parseInt(r.g) << 8) +
                  parseInt(r.b)
                )
                  .toString(16)
                  .slice(1));
        },
        toHSL: function (t, e, i, n) {
          0 === arguments.length &&
            ((t = this.value.h),
            (e = this.value.s),
            (i = this.value.b),
            (n = this.value.a));
          var a = t,
            o = (2 - e) * i,
            r = e * i;
          return (
            (r /= o > 0 && o <= 1 ? o : 2 - o),
            (o /= 2),
            r > 1 && (r = 1),
            {
              h: isNaN(a) ? 0 : a,
              s: isNaN(r) ? 0 : r,
              l: isNaN(o) ? 0 : o,
              a: isNaN(n) ? 0 : n,
            }
          );
        },
        toAlias: function (t, e, i, n) {
          var a,
            o =
              0 === arguments.length
                ? this.toHex(!0)
                : this.toHex(!0, t, e, i, n),
            r =
              "alias" === this.origFormat
                ? o
                : this.toString(!1, this.origFormat);
          for (var s in this.colors)
            if ((a = this.colors[s].toLowerCase().trim()) === o || a === r)
              return s;
          return !1;
        },
        RGBtoHSB: function (t, e, i, n) {
          (t /= 255), (e /= 255), (i /= 255);
          var a, o, r, s;
          return (
            (r = Math.max(t, e, i)),
            (s = r - Math.min(t, e, i)),
            (a =
              0 === s
                ? null
                : r === t
                ? (e - i) / s
                : r === e
                ? (i - t) / s + 2
                : (t - e) / s + 4),
            (a = (((a + 360) % 6) * 60) / 360),
            (o = 0 === s ? 0 : s / r),
            {
              h: this._sanitizeNumber(a),
              s: o,
              b: r,
              a: this._sanitizeNumber(n),
            }
          );
        },
        HueToRGB: function (t, e, i) {
          return (
            i < 0 ? (i += 1) : i > 1 && (i -= 1),
            6 * i < 1
              ? t + (e - t) * i * 6
              : 2 * i < 1
              ? e
              : 3 * i < 2
              ? t + (e - t) * (2 / 3 - i) * 6
              : t
          );
        },
        HSLtoRGB: function (t, e, i, n) {
          e < 0 && (e = 0);
          var a;
          a = i <= 0.5 ? i * (1 + e) : i + e - i * e;
          var o = 2 * i - a,
            r = t + 1 / 3,
            s = t,
            l = t - 1 / 3;
          return [
            Math.round(255 * this.HueToRGB(o, a, r)),
            Math.round(255 * this.HueToRGB(o, a, s)),
            Math.round(255 * this.HueToRGB(o, a, l)),
            this._sanitizeNumber(n),
          ];
        },
        parse: function (e) {
          if ("string" != typeof e) return this.fallbackValue;
          if (0 === arguments.length) return !1;
          var i,
            n,
            a = this,
            o = !1,
            r = void 0 !== this.colors[e];
          return (
            r && (e = this.colors[e].toLowerCase().trim()),
            t.each(this.stringParsers, function (t, s) {
              var l = s.re.exec(e);
              return (
                !(i = l && s.parse.apply(a, [l])) ||
                ((o = {}),
                (n = r
                  ? "alias"
                  : s.format
                  ? s.format
                  : a.getValidFallbackFormat()),
                (o = n.match(/hsla?/)
                  ? a.RGBtoHSB.apply(a, a.HSLtoRGB.apply(a, i))
                  : a.RGBtoHSB.apply(a, i)),
                o instanceof Object && (o.format = n),
                !1)
              );
            }),
            o
          );
        },
        getValidFallbackFormat: function () {
          var t = ["rgba", "rgb", "hex", "hsla", "hsl"];
          return this.origFormat && -1 !== t.indexOf(this.origFormat)
            ? this.origFormat
            : this.fallbackFormat && -1 !== t.indexOf(this.fallbackFormat)
            ? this.fallbackFormat
            : "rgba";
        },
        toString: function (t, i, n) {
          (i = i || this.origFormat || this.fallbackFormat), (n = n || !1);
          var a = !1;
          switch (i) {
            case "rgb":
              return (
                (a = this.toRGB()),
                this.rgbaIsTransparent(a)
                  ? "transparent"
                  : "rgb(" + a.r + "," + a.g + "," + a.b + ")"
              );
            case "rgba":
              return (
                (a = this.toRGB()),
                "rgba(" + a.r + "," + a.g + "," + a.b + "," + a.a + ")"
              );
            case "hsl":
              return (
                (a = this.toHSL()),
                "hsl(" +
                  Math.round(360 * a.h) +
                  "," +
                  Math.round(100 * a.s) +
                  "%," +
                  Math.round(100 * a.l) +
                  "%)"
              );
            case "hsla":
              return (
                (a = this.toHSL()),
                "hsla(" +
                  Math.round(360 * a.h) +
                  "," +
                  Math.round(100 * a.s) +
                  "%," +
                  Math.round(100 * a.l) +
                  "%," +
                  a.a +
                  ")"
              );
            case "hex":
              return this.toHex(t);
            case "alias":
              return (
                (a = this.toAlias()),
                !1 === a
                  ? this.toString(t, this.getValidFallbackFormat())
                  : n && !(a in e.webColors) && a in this.predefinedColors
                  ? this.predefinedColors[a]
                  : a
              );
            default:
              return a;
          }
        },
        stringParsers: [
          {
            re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
            format: "rgb",
            parse: function (t) {
              return [t[1], t[2], t[3], 1];
            },
          },
          {
            re: /rgb\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
            format: "rgb",
            parse: function (t) {
              return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], 1];
            },
          },
          {
            re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
            format: "rgba",
            parse: function (t) {
              return [t[1], t[2], t[3], t[4]];
            },
          },
          {
            re: /rgba\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
            format: "rgba",
            parse: function (t) {
              return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
            },
          },
          {
            re: /hsl\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
            format: "hsl",
            parse: function (t) {
              return [t[1] / 360, t[2] / 100, t[3] / 100, t[4]];
            },
          },
          {
            re: /hsla\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
            format: "hsla",
            parse: function (t) {
              return [t[1] / 360, t[2] / 100, t[3] / 100, t[4]];
            },
          },
          {
            re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            format: "hex",
            parse: function (t) {
              return [
                parseInt(t[1], 16),
                parseInt(t[2], 16),
                parseInt(t[3], 16),
                1,
              ];
            },
          },
          {
            re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
            format: "hex",
            parse: function (t) {
              return [
                parseInt(t[1] + t[1], 16),
                parseInt(t[2] + t[2], 16),
                parseInt(t[3] + t[3], 16),
                1,
              ];
            },
          },
        ],
        colorNameToHex: function (t) {
          return (
            void 0 !== this.colors[t.toLowerCase()] &&
            this.colors[t.toLowerCase()]
          );
        },
      });
    var i = {
        horizontal: !1,
        inline: !1,
        color: !1,
        format: !1,
        input: "input",
        container: !1,
        component: ".add-on, .input-group-addon",
        fallbackColor: !1,
        fallbackFormat: "hex",
        hexNumberSignPrefix: !0,
        sliders: {
          saturation: {
            maxLeft: 100,
            maxTop: 100,
            callLeft: "setSaturation",
            callTop: "setBrightness",
          },
          hue: { maxLeft: 0, maxTop: 100, callLeft: !1, callTop: "setHue" },
          alpha: { maxLeft: 0, maxTop: 100, callLeft: !1, callTop: "setAlpha" },
        },
        slidersHorz: {
          saturation: {
            maxLeft: 100,
            maxTop: 100,
            callLeft: "setSaturation",
            callTop: "setBrightness",
          },
          hue: { maxLeft: 100, maxTop: 0, callLeft: "setHue", callTop: !1 },
          alpha: { maxLeft: 100, maxTop: 0, callLeft: "setAlpha", callTop: !1 },
        },
        template:
          '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div><div class="colorpicker-selectors"></div></div>',
        align: "right",
        customClass: null,
        colorSelectors: null,
      },
      n = function (e, n) {
        (this.element = t(e).addClass("colorpicker-element")),
          (this.options = t.extend(!0, {}, i, this.element.data(), n)),
          (this.component = this.options.component),
          (this.component =
            !1 !== this.component && this.element.find(this.component)),
          this.component &&
            0 === this.component.length &&
            (this.component = !1),
          (this.container =
            !0 === this.options.container
              ? this.element
              : this.options.container),
          (this.container = !1 !== this.container && t(this.container)),
          (this.input = this.element.is("input")
            ? this.element
            : !!this.options.input && this.element.find(this.options.input)),
          this.input && 0 === this.input.length && (this.input = !1),
          (this.color = this.createColor(
            !1 !== this.options.color ? this.options.color : this.getValue()
          )),
          (this.format =
            !1 !== this.options.format
              ? this.options.format
              : this.color.origFormat),
          !1 !== this.options.color &&
            (this.updateInput(this.color), this.updateData(this.color)),
          (this.disabled = !1);
        var a = (this.picker = t(this.options.template));
        if (
          (this.options.customClass && a.addClass(this.options.customClass),
          this.options.inline
            ? a.addClass("colorpicker-inline colorpicker-visible")
            : a.addClass("colorpicker-hidden"),
          this.options.horizontal && a.addClass("colorpicker-horizontal"),
          (-1 === ["rgba", "hsla", "alias"].indexOf(this.format) &&
            !1 !== this.options.format &&
            "transparent" !== this.getValue()) ||
            a.addClass("colorpicker-with-alpha"),
          "right" === this.options.align && a.addClass("colorpicker-right"),
          !0 === this.options.inline && a.addClass("colorpicker-no-arrow"),
          this.options.colorSelectors)
        ) {
          var o = this,
            r = o.picker.find(".colorpicker-selectors");
          r.length > 0 &&
            (t.each(this.options.colorSelectors, function (e, i) {
              var n = t("<i />")
                .addClass("colorpicker-selectors-color")
                .css("background-color", i)
                .data("class", e)
                .data("alias", e);
              n.on(
                "mousedown.colorpicker touchstart.colorpicker",
                function (e) {
                  e.preventDefault(),
                    o.setValue(
                      "alias" === o.format
                        ? t(this).data("alias")
                        : t(this).css("background-color")
                    );
                }
              ),
                r.append(n);
            }),
            r.show().addClass("colorpicker-visible"));
        }
        a.on(
          "mousedown.colorpicker touchstart.colorpicker",
          t.proxy(function (t) {
            t.target === t.currentTarget && t.preventDefault();
          }, this)
        ),
          a
            .find(
              ".colorpicker-saturation, .colorpicker-hue, .colorpicker-alpha"
            )
            .on(
              "mousedown.colorpicker touchstart.colorpicker",
              t.proxy(this.mousedown, this)
            ),
          a.appendTo(this.container ? this.container : t("body")),
          !1 !== this.input &&
            (this.input.on({ "keyup.colorpicker": t.proxy(this.keyup, this) }),
            this.input.on({ "input.colorpicker": t.proxy(this.change, this) }),
            !1 === this.component &&
              this.element.on({
                "focus.colorpicker": t.proxy(this.show, this),
              }),
            !1 === this.options.inline &&
              this.element.on({
                "focusout.colorpicker": t.proxy(this.hide, this),
              })),
          !1 !== this.component &&
            this.component.on({
              "click.colorpicker": t.proxy(this.show, this),
            }),
          !1 === this.input &&
            !1 === this.component &&
            this.element.on({ "click.colorpicker": t.proxy(this.show, this) }),
          !1 !== this.input &&
            !1 !== this.component &&
            "color" === this.input.attr("type") &&
            this.input.on({
              "click.colorpicker": t.proxy(this.show, this),
              "focus.colorpicker": t.proxy(this.show, this),
            }),
          this.update(),
          t(
            t.proxy(function () {
              this.element.trigger("create");
            }, this)
          );
      };
    (n.Color = e),
      (n.prototype = {
        constructor: n,
        destroy: function () {
          this.picker.remove(),
            this.element.removeData("colorpicker", "color").off(".colorpicker"),
            !1 !== this.input && this.input.off(".colorpicker"),
            !1 !== this.component && this.component.off(".colorpicker"),
            this.element.removeClass("colorpicker-element"),
            this.element.trigger({ type: "destroy" });
        },
        reposition: function () {
          if (!1 !== this.options.inline || this.options.container) return !1;
          var t =
              this.container && this.container[0] !== window.document.body
                ? "position"
                : "offset",
            e = this.component || this.element,
            i = e[t]();
          "right" === this.options.align &&
            (i.left -= this.picker.outerWidth() - e.outerWidth()),
            this.picker.css({ top: i.top + e.outerHeight(), left: i.left });
        },
        show: function (e) {
          this.isDisabled() ||
            (this.picker
              .addClass("colorpicker-visible")
              .removeClass("colorpicker-hidden"),
            this.reposition(),
            t(window).on("resize.colorpicker", t.proxy(this.reposition, this)),
            !e ||
              (this.hasInput() && "color" !== this.input.attr("type")) ||
              (e.stopPropagation &&
                e.preventDefault &&
                (e.stopPropagation(), e.preventDefault())),
            (!this.component && this.input) ||
              !1 !== this.options.inline ||
              t(window.document).on({
                "mousedown.colorpicker": t.proxy(this.hide, this),
              }),
            this.element.trigger({ type: "showPicker", color: this.color }));
        },
        hide: function (e) {
          if (
            void 0 !== e &&
            e.target &&
            (t(e.currentTarget).parents(".colorpicker").length > 0 ||
              t(e.target).parents(".colorpicker").length > 0)
          )
            return !1;
          this.picker
            .addClass("colorpicker-hidden")
            .removeClass("colorpicker-visible"),
            t(window).off("resize.colorpicker", this.reposition),
            t(window.document).off({ "mousedown.colorpicker": this.hide }),
            this.update(),
            this.element.trigger({ type: "hidePicker", color: this.color });
        },
        updateData: function (t) {
          return (
            (t = t || this.color.toString(!1, this.format)),
            this.element.data("color", t),
            t
          );
        },
        updateInput: function (t) {
          return (
            (t = t || this.color.toString(!1, this.format)),
            !1 !== this.input &&
              (this.input.prop("value", t), this.input.trigger("change")),
            t
          );
        },
        updatePicker: function (t) {
          void 0 !== t && (this.color = this.createColor(t));
          var e =
              !1 === this.options.horizontal
                ? this.options.sliders
                : this.options.slidersHorz,
            i = this.picker.find("i");
          if (0 !== i.length)
            return (
              !1 === this.options.horizontal
                ? ((e = this.options.sliders),
                  i
                    .eq(1)
                    .css("top", e.hue.maxTop * (1 - this.color.value.h))
                    .end()
                    .eq(2)
                    .css("top", e.alpha.maxTop * (1 - this.color.value.a)))
                : ((e = this.options.slidersHorz),
                  i
                    .eq(1)
                    .css("left", e.hue.maxLeft * (1 - this.color.value.h))
                    .end()
                    .eq(2)
                    .css("left", e.alpha.maxLeft * (1 - this.color.value.a))),
              i
                .eq(0)
                .css({
                  top:
                    e.saturation.maxTop -
                    this.color.value.b * e.saturation.maxTop,
                  left: this.color.value.s * e.saturation.maxLeft,
                }),
              this.picker
                .find(".colorpicker-saturation")
                .css(
                  "backgroundColor",
                  this.color.toHex(!0, this.color.value.h, 1, 1, 1)
                ),
              this.picker
                .find(".colorpicker-alpha")
                .css("backgroundColor", this.color.toHex(!0)),
              this.picker
                .find(".colorpicker-color, .colorpicker-color div")
                .css("backgroundColor", this.color.toString(!0, this.format)),
              t
            );
        },
        updateComponent: function (t) {
          var e;
          if (
            ((e = void 0 !== t ? this.createColor(t) : this.color),
            !1 !== this.component)
          ) {
            var i = this.component.find("i").eq(0);
            i.length > 0
              ? i.css({ backgroundColor: e.toString(!0, this.format) })
              : this.component.css({
                  backgroundColor: e.toString(!0, this.format),
                });
          }
          return e.toString(!1, this.format);
        },
        update: function (t) {
          var e;
          return (
            (!1 === this.getValue(!1) && !0 !== t) ||
              ((e = this.updateComponent()),
              this.updateInput(e),
              this.updateData(e),
              this.updatePicker()),
            e
          );
        },
        setValue: function (t) {
          (this.color = this.createColor(t)),
            this.update(!0),
            this.element.trigger({
              type: "changeColor",
              color: this.color,
              value: t,
            });
        },
        createColor: function (t) {
          return new e(
            t || null,
            this.options.colorSelectors,
            this.options.fallbackColor
              ? this.options.fallbackColor
              : this.color,
            this.options.fallbackFormat,
            this.options.hexNumberSignPrefix
          );
        },
        getValue: function (t) {
          t = void 0 === t ? this.options.fallbackColor : t;
          var e;
          return (
            (e = this.hasInput()
              ? this.input.val()
              : this.element.data("color")),
            (void 0 !== e && "" !== e && null !== e) || (e = t),
            e
          );
        },
        hasInput: function () {
          return !1 !== this.input;
        },
        isDisabled: function () {
          return this.disabled;
        },
        disable: function () {
          return (
            this.hasInput() && this.input.prop("disabled", !0),
            (this.disabled = !0),
            this.element.trigger({
              type: "disable",
              color: this.color,
              value: this.getValue(),
            }),
            !0
          );
        },
        enable: function () {
          return (
            this.hasInput() && this.input.prop("disabled", !1),
            (this.disabled = !1),
            this.element.trigger({
              type: "enable",
              color: this.color,
              value: this.getValue(),
            }),
            !0
          );
        },
        currentSlider: null,
        mousePointer: { left: 0, top: 0 },
        mousedown: function (e) {
          !e.pageX &&
            !e.pageY &&
            e.originalEvent &&
            e.originalEvent.touches &&
            ((e.pageX = e.originalEvent.touches[0].pageX),
            (e.pageY = e.originalEvent.touches[0].pageY)),
            e.stopPropagation(),
            e.preventDefault();
          var i = t(e.target),
            n = i.closest("div"),
            a = this.options.horizontal
              ? this.options.slidersHorz
              : this.options.sliders;
          if (!n.is(".colorpicker")) {
            if (n.is(".colorpicker-saturation"))
              this.currentSlider = t.extend({}, a.saturation);
            else if (n.is(".colorpicker-hue"))
              this.currentSlider = t.extend({}, a.hue);
            else {
              if (!n.is(".colorpicker-alpha")) return !1;
              this.currentSlider = t.extend({}, a.alpha);
            }
            var o = n.offset();
            (this.currentSlider.guide = n.find("i")[0].style),
              (this.currentSlider.left = e.pageX - o.left),
              (this.currentSlider.top = e.pageY - o.top),
              (this.mousePointer = { left: e.pageX, top: e.pageY }),
              t(window.document)
                .on({
                  "mousemove.colorpicker": t.proxy(this.mousemove, this),
                  "touchmove.colorpicker": t.proxy(this.mousemove, this),
                  "mouseup.colorpicker": t.proxy(this.mouseup, this),
                  "touchend.colorpicker": t.proxy(this.mouseup, this),
                })
                .trigger("mousemove");
          }
          return !1;
        },
        mousemove: function (t) {
          !t.pageX &&
            !t.pageY &&
            t.originalEvent &&
            t.originalEvent.touches &&
            ((t.pageX = t.originalEvent.touches[0].pageX),
            (t.pageY = t.originalEvent.touches[0].pageY)),
            t.stopPropagation(),
            t.preventDefault();
          var e = Math.max(
              0,
              Math.min(
                this.currentSlider.maxLeft,
                this.currentSlider.left +
                  ((t.pageX || this.mousePointer.left) - this.mousePointer.left)
              )
            ),
            i = Math.max(
              0,
              Math.min(
                this.currentSlider.maxTop,
                this.currentSlider.top +
                  ((t.pageY || this.mousePointer.top) - this.mousePointer.top)
              )
            );
          return (
            (this.currentSlider.guide.left = e + "px"),
            (this.currentSlider.guide.top = i + "px"),
            this.currentSlider.callLeft &&
              this.color[this.currentSlider.callLeft].call(
                this.color,
                e / this.currentSlider.maxLeft
              ),
            this.currentSlider.callTop &&
              this.color[this.currentSlider.callTop].call(
                this.color,
                i / this.currentSlider.maxTop
              ),
            !1 !== this.options.format ||
              ("setAlpha" !== this.currentSlider.callTop &&
                "setAlpha" !== this.currentSlider.callLeft) ||
              (1 !== this.color.value.a
                ? ((this.format = "rgba"), (this.color.origFormat = "rgba"))
                : ((this.format = "hex"), (this.color.origFormat = "hex"))),
            this.update(!0),
            this.element.trigger({ type: "changeColor", color: this.color }),
            !1
          );
        },
        mouseup: function (e) {
          return (
            e.stopPropagation(),
            e.preventDefault(),
            t(window.document).off({
              "mousemove.colorpicker": this.mousemove,
              "touchmove.colorpicker": this.mousemove,
              "mouseup.colorpicker": this.mouseup,
              "touchend.colorpicker": this.mouseup,
            }),
            !1
          );
        },
        change: function (t) {
          (this.color = this.createColor(this.input.val())),
            this.color.origFormat &&
              !1 === this.options.format &&
              (this.format = this.color.origFormat),
            !1 !== this.getValue(!1) &&
              (this.updateData(), this.updateComponent(), this.updatePicker()),
            this.element.trigger({
              type: "changeColor",
              color: this.color,
              value: this.input.val(),
            });
        },
        keyup: function (t) {
          38 === t.keyCode
            ? (this.color.value.a < 1 &&
                (this.color.value.a =
                  Math.round(100 * (this.color.value.a + 0.01)) / 100),
              this.update(!0))
            : 40 === t.keyCode &&
              (this.color.value.a > 0 &&
                (this.color.value.a =
                  Math.round(100 * (this.color.value.a - 0.01)) / 100),
              this.update(!0)),
            this.element.trigger({
              type: "changeColor",
              color: this.color,
              value: this.input.val(),
            });
        },
      }),
      (t.colorpicker = n),
      (t.fn.colorpicker = function (e) {
        var i = Array.prototype.slice.call(arguments, 1),
          a = 1 === this.length,
          o = null,
          r = this.each(function () {
            var a = t(this),
              r = a.data("colorpicker"),
              s = "object" == typeof e ? e : {};
            r || ((r = new n(this, s)), a.data("colorpicker", r)),
              "string" == typeof e
                ? t.isFunction(r[e])
                  ? (o = r[e].apply(r, i))
                  : (i.length && (r[e] = i[0]), (o = r[e]))
                : (o = a);
          });
        return a ? o : r;
      }),
      (t.fn.colorpicker.constructor = n);
  }),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : t("object" == typeof exports ? require("jquery") : jQuery);
  })(function (t, e) {
    function i() {
      return new Date(Date.UTC.apply(Date, arguments));
    }
    function n() {
      var t = new Date();
      return i(t.getFullYear(), t.getMonth(), t.getDate());
    }
    function a(t, e) {
      return (
        t.getUTCFullYear() === e.getUTCFullYear() &&
        t.getUTCMonth() === e.getUTCMonth() &&
        t.getUTCDate() === e.getUTCDate()
      );
    }
    function o(i, n) {
      return function () {
        return (
          n !== e && t.fn.datepicker.deprecated(n),
          this[i].apply(this, arguments)
        );
      };
    }
    function r(t) {
      return t && !isNaN(t.getTime());
    }
    function s(e, i) {
      function n(t, e) {
        return e.toLowerCase();
      }
      var a,
        o = t(e).data(),
        r = {},
        s = new RegExp("^" + i.toLowerCase() + "([A-Z])");
      i = new RegExp("^" + i.toLowerCase());
      for (var l in o) i.test(l) && ((a = l.replace(s, n)), (r[a] = o[l]));
      return r;
    }
    function l(e) {
      var i = {};
      if (m[e] || ((e = e.split("-")[0]), m[e])) {
        var n = m[e];
        return (
          t.each(g, function (t, e) {
            e in n && (i[e] = n[e]);
          }),
          i
        );
      }
    }
    var d = (function () {
        var e = {
          get: function (t) {
            return this.slice(t)[0];
          },
          contains: function (t) {
            for (var e = t && t.valueOf(), i = 0, n = this.length; i < n; i++)
              if (0 <= this[i].valueOf() - e && this[i].valueOf() - e < 864e5)
                return i;
            return -1;
          },
          remove: function (t) {
            this.splice(t, 1);
          },
          replace: function (e) {
            e &&
              (t.isArray(e) || (e = [e]),
              this.clear(),
              this.push.apply(this, e));
          },
          clear: function () {
            this.length = 0;
          },
          copy: function () {
            var t = new d();
            return t.replace(this), t;
          },
        };
        return function () {
          var i = [];
          return i.push.apply(i, arguments), t.extend(i, e), i;
        };
      })(),
      h = function (e, i) {
        t.data(e, "datepicker", this),
          (this._events = []),
          (this._secondaryEvents = []),
          this._process_options(i),
          (this.dates = new d()),
          (this.viewDate = this.o.defaultViewDate),
          (this.focusDate = null),
          (this.element = t(e)),
          (this.isInput = this.element.is("input")),
          (this.inputField = this.isInput
            ? this.element
            : this.element.find("input")),
          (this.component =
            !!this.element.hasClass("date") &&
            this.element.find(
              ".add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn"
            )),
          this.component &&
            0 === this.component.length &&
            (this.component = !1),
          (this.isInline = !this.component && this.element.is("div")),
          (this.picker = t(v.template)),
          this._check_template(this.o.templates.leftArrow) &&
            this.picker.find(".prev").html(this.o.templates.leftArrow),
          this._check_template(this.o.templates.rightArrow) &&
            this.picker.find(".next").html(this.o.templates.rightArrow),
          this._buildEvents(),
          this._attachEvents(),
          this.isInline
            ? this.picker.addClass("datepicker-inline").appendTo(this.element)
            : this.picker.addClass("datepicker-dropdown dropdown-menu"),
          this.o.rtl && this.picker.addClass("datepicker-rtl"),
          this.o.calendarWeeks &&
            this.picker
              .find(
                ".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear"
              )
              .attr("colspan", function (t, e) {
                return Number(e) + 1;
              }),
          this._process_options({
            startDate: this._o.startDate,
            endDate: this._o.endDate,
            daysOfWeekDisabled: this.o.daysOfWeekDisabled,
            daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
            datesDisabled: this.o.datesDisabled,
          }),
          (this._allow_update = !1),
          this.setViewMode(this.o.startView),
          (this._allow_update = !0),
          this.fillDow(),
          this.fillMonths(),
          this.update(),
          this.isInline && this.show();
      };
    h.prototype = {
      constructor: h,
      _resolveViewName: function (e) {
        return (
          t.each(v.viewModes, function (i, n) {
            if (e === i || -1 !== t.inArray(e, n.names)) return (e = i), !1;
          }),
          e
        );
      },
      _resolveDaysOfWeek: function (e) {
        return t.isArray(e) || (e = e.split(/[,\s]*/)), t.map(e, Number);
      },
      _check_template: function (i) {
        try {
          if (i === e || "" === i) return !1;
          if ((i.match(/[<>]/g) || []).length <= 0) return !0;
          return t(i).length > 0;
        } catch (t) {
          return !1;
        }
      },
      _process_options: function (e) {
        this._o = t.extend({}, this._o, e);
        var a = (this.o = t.extend({}, this._o)),
          o = a.language;
        m[o] || ((o = o.split("-")[0]), m[o] || (o = p.language)),
          (a.language = o),
          (a.startView = this._resolveViewName(a.startView)),
          (a.minViewMode = this._resolveViewName(a.minViewMode)),
          (a.maxViewMode = this._resolveViewName(a.maxViewMode)),
          (a.startView = Math.max(
            this.o.minViewMode,
            Math.min(this.o.maxViewMode, a.startView)
          )),
          !0 !== a.multidate &&
            ((a.multidate = Number(a.multidate) || !1),
            !1 !== a.multidate && (a.multidate = Math.max(0, a.multidate))),
          (a.multidateSeparator = String(a.multidateSeparator)),
          (a.weekStart %= 7),
          (a.weekEnd = (a.weekStart + 6) % 7);
        var r = v.parseFormat(a.format);
        a.startDate !== -1 / 0 &&
          (a.startDate
            ? a.startDate instanceof Date
              ? (a.startDate = this._local_to_utc(this._zero_time(a.startDate)))
              : (a.startDate = v.parseDate(
                  a.startDate,
                  r,
                  a.language,
                  a.assumeNearbyYear
                ))
            : (a.startDate = -1 / 0)),
          a.endDate !== 1 / 0 &&
            (a.endDate
              ? a.endDate instanceof Date
                ? (a.endDate = this._local_to_utc(this._zero_time(a.endDate)))
                : (a.endDate = v.parseDate(
                    a.endDate,
                    r,
                    a.language,
                    a.assumeNearbyYear
                  ))
              : (a.endDate = 1 / 0)),
          (a.daysOfWeekDisabled = this._resolveDaysOfWeek(
            a.daysOfWeekDisabled || []
          )),
          (a.daysOfWeekHighlighted = this._resolveDaysOfWeek(
            a.daysOfWeekHighlighted || []
          )),
          (a.datesDisabled = a.datesDisabled || []),
          t.isArray(a.datesDisabled) ||
            (a.datesDisabled = a.datesDisabled.split(",")),
          (a.datesDisabled = t.map(a.datesDisabled, function (t) {
            return v.parseDate(t, r, a.language, a.assumeNearbyYear);
          }));
        var s = String(a.orientation).toLowerCase().split(/\s+/g),
          l = a.orientation.toLowerCase();
        if (
          ((s = t.grep(s, function (t) {
            return /^auto|left|right|top|bottom$/.test(t);
          })),
          (a.orientation = { x: "auto", y: "auto" }),
          l && "auto" !== l)
        )
          if (1 === s.length)
            switch (s[0]) {
              case "top":
              case "bottom":
                a.orientation.y = s[0];
                break;
              case "left":
              case "right":
                a.orientation.x = s[0];
            }
          else
            (l = t.grep(s, function (t) {
              return /^left|right$/.test(t);
            })),
              (a.orientation.x = l[0] || "auto"),
              (l = t.grep(s, function (t) {
                return /^top|bottom$/.test(t);
              })),
              (a.orientation.y = l[0] || "auto");
        else;
        if (
          a.defaultViewDate instanceof Date ||
          "string" == typeof a.defaultViewDate
        )
          a.defaultViewDate = v.parseDate(
            a.defaultViewDate,
            r,
            a.language,
            a.assumeNearbyYear
          );
        else if (a.defaultViewDate) {
          var d = a.defaultViewDate.year || new Date().getFullYear(),
            h = a.defaultViewDate.month || 0,
            u = a.defaultViewDate.day || 1;
          a.defaultViewDate = i(d, h, u);
        } else a.defaultViewDate = n();
      },
      _applyEvents: function (t) {
        for (var i, n, a, o = 0; o < t.length; o++)
          (i = t[o][0]),
            2 === t[o].length
              ? ((n = e), (a = t[o][1]))
              : 3 === t[o].length && ((n = t[o][1]), (a = t[o][2])),
            i.on(a, n);
      },
      _unapplyEvents: function (t) {
        for (var i, n, a, o = 0; o < t.length; o++)
          (i = t[o][0]),
            2 === t[o].length
              ? ((a = e), (n = t[o][1]))
              : 3 === t[o].length && ((a = t[o][1]), (n = t[o][2])),
            i.off(n, a);
      },
      _buildEvents: function () {
        var e = {
          keyup: t.proxy(function (e) {
            -1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) &&
              this.update();
          }, this),
          keydown: t.proxy(this.keydown, this),
          paste: t.proxy(this.paste, this),
        };
        !0 === this.o.showOnFocus && (e.focus = t.proxy(this.show, this)),
          this.isInput
            ? (this._events = [[this.element, e]])
            : this.component && this.inputField.length
            ? (this._events = [
                [this.inputField, e],
                [this.component, { click: t.proxy(this.show, this) }],
              ])
            : (this._events = [
                [
                  this.element,
                  {
                    click: t.proxy(this.show, this),
                    keydown: t.proxy(this.keydown, this),
                  },
                ],
              ]),
          this._events.push(
            [
              this.element,
              "*",
              {
                blur: t.proxy(function (t) {
                  this._focused_from = t.target;
                }, this),
              },
            ],
            [
              this.element,
              {
                blur: t.proxy(function (t) {
                  this._focused_from = t.target;
                }, this),
              },
            ]
          ),
          this.o.immediateUpdates &&
            this._events.push([
              this.element,
              {
                "changeYear changeMonth": t.proxy(function (t) {
                  this.update(t.date);
                }, this),
              },
            ]),
          (this._secondaryEvents = [
            [this.picker, { click: t.proxy(this.click, this) }],
            [
              this.picker,
              ".prev, .next",
              { click: t.proxy(this.navArrowsClick, this) },
            ],
            [
              this.picker,
              ".day:not(.disabled)",
              { click: t.proxy(this.dayCellClick, this) },
            ],
            [t(window), { resize: t.proxy(this.place, this) }],
            [
              t(document),
              {
                "mousedown touchstart": t.proxy(function (t) {
                  this.element.is(t.target) ||
                    this.element.find(t.target).length ||
                    this.picker.is(t.target) ||
                    this.picker.find(t.target).length ||
                    this.isInline ||
                    this.hide();
                }, this),
              },
            ],
          ]);
      },
      _attachEvents: function () {
        this._detachEvents(), this._applyEvents(this._events);
      },
      _detachEvents: function () {
        this._unapplyEvents(this._events);
      },
      _attachSecondaryEvents: function () {
        this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
      },
      _detachSecondaryEvents: function () {
        this._unapplyEvents(this._secondaryEvents);
      },
      _trigger: function (e, i) {
        var n = i || this.dates.get(-1),
          a = this._utc_to_local(n);
        this.element.trigger({
          type: e,
          date: a,
          viewMode: this.viewMode,
          dates: t.map(this.dates, this._utc_to_local),
          format: t.proxy(function (t, e) {
            0 === arguments.length
              ? ((t = this.dates.length - 1), (e = this.o.format))
              : "string" == typeof t && ((e = t), (t = this.dates.length - 1)),
              (e = e || this.o.format);
            var i = this.dates.get(t);
            return v.formatDate(i, e, this.o.language);
          }, this),
        });
      },
      show: function () {
        if (
          !(
            this.inputField.is(":disabled") ||
            (this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)
          )
        )
          return (
            this.isInline || this.picker.appendTo(this.o.container),
            this.place(),
            this.picker.show(),
            this._attachSecondaryEvents(),
            this._trigger("show"),
            (window.navigator.msMaxTouchPoints || "ontouchstart" in document) &&
              this.o.disableTouchKeyboard &&
              t(this.element).blur(),
            this
          );
      },
      hide: function () {
        return this.isInline || !this.picker.is(":visible")
          ? this
          : ((this.focusDate = null),
            this.picker.hide().detach(),
            this._detachSecondaryEvents(),
            this.setViewMode(this.o.startView),
            this.o.forceParse && this.inputField.val() && this.setValue(),
            this._trigger("hide"),
            this);
      },
      destroy: function () {
        return (
          this.hide(),
          this._detachEvents(),
          this._detachSecondaryEvents(),
          this.picker.remove(),
          delete this.element.data().datepicker,
          this.isInput || delete this.element.data().date,
          this
        );
      },
      paste: function (e) {
        var i;
        if (
          e.originalEvent.clipboardData &&
          e.originalEvent.clipboardData.types &&
          -1 !== t.inArray("text/plain", e.originalEvent.clipboardData.types)
        )
          i = e.originalEvent.clipboardData.getData("text/plain");
        else {
          if (!window.clipboardData) return;
          i = window.clipboardData.getData("Text");
        }
        this.setDate(i), this.update(), e.preventDefault();
      },
      _utc_to_local: function (t) {
        if (!t) return t;
        var e = new Date(t.getTime() + 6e4 * t.getTimezoneOffset());
        return (
          e.getTimezoneOffset() !== t.getTimezoneOffset() &&
            (e = new Date(t.getTime() + 6e4 * e.getTimezoneOffset())),
          e
        );
      },
      _local_to_utc: function (t) {
        return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset());
      },
      _zero_time: function (t) {
        return t && new Date(t.getFullYear(), t.getMonth(), t.getDate());
      },
      _zero_utc_time: function (t) {
        return t && i(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate());
      },
      getDates: function () {
        return t.map(this.dates, this._utc_to_local);
      },
      getUTCDates: function () {
        return t.map(this.dates, function (t) {
          return new Date(t);
        });
      },
      getDate: function () {
        return this._utc_to_local(this.getUTCDate());
      },
      getUTCDate: function () {
        var t = this.dates.get(-1);
        return t !== e ? new Date(t) : null;
      },
      clearDates: function () {
        this.inputField.val(""),
          this.update(),
          this._trigger("changeDate"),
          this.o.autoclose && this.hide();
      },
      setDates: function () {
        var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
        return (
          this.update.apply(this, e),
          this._trigger("changeDate"),
          this.setValue(),
          this
        );
      },
      setUTCDates: function () {
        var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
        return this.setDates.apply(this, t.map(e, this._utc_to_local)), this;
      },
      setDate: o("setDates"),
      setUTCDate: o("setUTCDates"),
      remove: o(
        "destroy",
        "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"
      ),
      setValue: function () {
        var t = this.getFormattedDate();
        return this.inputField.val(t), this;
      },
      getFormattedDate: function (i) {
        i === e && (i = this.o.format);
        var n = this.o.language;
        return t
          .map(this.dates, function (t) {
            return v.formatDate(t, i, n);
          })
          .join(this.o.multidateSeparator);
      },
      getStartDate: function () {
        return this.o.startDate;
      },
      setStartDate: function (t) {
        return (
          this._process_options({ startDate: t }),
          this.update(),
          this.updateNavArrows(),
          this
        );
      },
      getEndDate: function () {
        return this.o.endDate;
      },
      setEndDate: function (t) {
        return (
          this._process_options({ endDate: t }),
          this.update(),
          this.updateNavArrows(),
          this
        );
      },
      setDaysOfWeekDisabled: function (t) {
        return (
          this._process_options({ daysOfWeekDisabled: t }), this.update(), this
        );
      },
      setDaysOfWeekHighlighted: function (t) {
        return (
          this._process_options({ daysOfWeekHighlighted: t }),
          this.update(),
          this
        );
      },
      setDatesDisabled: function (t) {
        return this._process_options({ datesDisabled: t }), this.update(), this;
      },
      place: function () {
        if (this.isInline) return this;
        var e = this.picker.outerWidth(),
          i = this.picker.outerHeight(),
          n = t(this.o.container),
          a = n.width(),
          o =
            "body" === this.o.container
              ? t(document).scrollTop()
              : n.scrollTop(),
          r = n.offset(),
          s = [0];
        this.element.parents().each(function () {
          var e = t(this).css("z-index");
          "auto" !== e && 0 !== Number(e) && s.push(Number(e));
        });
        var l = Math.max.apply(Math, s) + this.o.zIndexOffset,
          d = this.component
            ? this.component.parent().offset()
            : this.element.offset(),
          h = this.component
            ? this.component.outerHeight(!0)
            : this.element.outerHeight(!1),
          u = this.component
            ? this.component.outerWidth(!0)
            : this.element.outerWidth(!1),
          c = d.left - r.left,
          f = d.top - r.top;
        "body" !== this.o.container && (f += o),
          this.picker.removeClass(
            "datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"
          ),
          "auto" !== this.o.orientation.x
            ? (this.picker.addClass(
                "datepicker-orient-" + this.o.orientation.x
              ),
              "right" === this.o.orientation.x && (c -= e - u))
            : d.left < 0
            ? (this.picker.addClass("datepicker-orient-left"),
              (c -= d.left - 10))
            : c + e > a
            ? (this.picker.addClass("datepicker-orient-right"), (c += u - e))
            : this.o.rtl
            ? this.picker.addClass("datepicker-orient-right")
            : this.picker.addClass("datepicker-orient-left");
        var p,
          g = this.o.orientation.y;
        if (
          ("auto" === g && ((p = -o + f - i), (g = p < 0 ? "bottom" : "top")),
          this.picker.addClass("datepicker-orient-" + g),
          "top" === g
            ? (f -= i + parseInt(this.picker.css("padding-top")))
            : (f += h),
          this.o.rtl)
        ) {
          var m = a - (c + u);
          this.picker.css({ top: f, right: m, zIndex: l });
        } else this.picker.css({ top: f, left: c, zIndex: l });
        return this;
      },
      _allow_update: !0,
      update: function () {
        if (!this._allow_update) return this;
        var e = this.dates.copy(),
          i = [],
          n = !1;
        return (
          arguments.length
            ? (t.each(
                arguments,
                t.proxy(function (t, e) {
                  e instanceof Date && (e = this._local_to_utc(e)), i.push(e);
                }, this)
              ),
              (n = !0))
            : ((i = this.isInput
                ? this.element.val()
                : this.element.data("date") || this.inputField.val()),
              (i =
                i && this.o.multidate
                  ? i.split(this.o.multidateSeparator)
                  : [i]),
              delete this.element.data().date),
          (i = t.map(
            i,
            t.proxy(function (t) {
              return v.parseDate(
                t,
                this.o.format,
                this.o.language,
                this.o.assumeNearbyYear
              );
            }, this)
          )),
          (i = t.grep(
            i,
            t.proxy(function (t) {
              return !this.dateWithinRange(t) || !t;
            }, this),
            !0
          )),
          this.dates.replace(i),
          this.o.updateViewDate &&
            (this.dates.length
              ? (this.viewDate = new Date(this.dates.get(-1)))
              : this.viewDate < this.o.startDate
              ? (this.viewDate = new Date(this.o.startDate))
              : this.viewDate > this.o.endDate
              ? (this.viewDate = new Date(this.o.endDate))
              : (this.viewDate = this.o.defaultViewDate)),
          n
            ? (this.setValue(), this.element.change())
            : this.dates.length &&
              String(e) !== String(this.dates) &&
              n &&
              (this._trigger("changeDate"), this.element.change()),
          !this.dates.length &&
            e.length &&
            (this._trigger("clearDate"), this.element.change()),
          this.fill(),
          this
        );
      },
      fillDow: function () {
        if (this.o.showWeekDays) {
          var e = this.o.weekStart,
            i = "<tr>";
          for (
            this.o.calendarWeeks && (i += '<th class="cw">&#160;</th>');
            e < this.o.weekStart + 7;

          )
            (i += '<th class="dow'),
              -1 !== t.inArray(e, this.o.daysOfWeekDisabled) &&
                (i += " disabled"),
              (i += '">' + m[this.o.language].daysMin[e++ % 7] + "</th>");
          (i += "</tr>"), this.picker.find(".datepicker-days thead").append(i);
        }
      },
      fillMonths: function () {
        for (
          var t, e = this._utc_to_local(this.viewDate), i = "", n = 0;
          n < 12;
          n++
        )
          (t = e && e.getMonth() === n ? " focused" : ""),
            (i +=
              '<span class="month' +
              t +
              '">' +
              m[this.o.language].monthsShort[n] +
              "</span>");
        this.picker.find(".datepicker-months td").html(i);
      },
      setRange: function (e) {
        e && e.length
          ? (this.range = t.map(e, function (t) {
              return t.valueOf();
            }))
          : delete this.range,
          this.fill();
      },
      getClassNames: function (e) {
        var i = [],
          o = this.viewDate.getUTCFullYear(),
          r = this.viewDate.getUTCMonth(),
          s = n();
        return (
          e.getUTCFullYear() < o ||
          (e.getUTCFullYear() === o && e.getUTCMonth() < r)
            ? i.push("old")
            : (e.getUTCFullYear() > o ||
                (e.getUTCFullYear() === o && e.getUTCMonth() > r)) &&
              i.push("new"),
          this.focusDate &&
            e.valueOf() === this.focusDate.valueOf() &&
            i.push("focused"),
          this.o.todayHighlight && a(e, s) && i.push("today"),
          -1 !== this.dates.contains(e) && i.push("active"),
          this.dateWithinRange(e) || i.push("disabled"),
          this.dateIsDisabled(e) && i.push("disabled", "disabled-date"),
          -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekHighlighted) &&
            i.push("highlighted"),
          this.range &&
            (e > this.range[0] &&
              e < this.range[this.range.length - 1] &&
              i.push("range"),
            -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected"),
            e.valueOf() === this.range[0] && i.push("range-start"),
            e.valueOf() === this.range[this.range.length - 1] &&
              i.push("range-end")),
          i
        );
      },
      _fill_yearsView: function (i, n, a, o, r, s, l) {
        for (
          var d,
            h,
            u,
            c = "",
            f = a / 10,
            p = this.picker.find(i),
            g = Math.floor(o / a) * a,
            m = g + 9 * f,
            v = Math.floor(this.viewDate.getFullYear() / f) * f,
            b = t.map(this.dates, function (t) {
              return Math.floor(t.getUTCFullYear() / f) * f;
            }),
            y = g - f;
          y <= m + f;
          y += f
        )
          (d = [n]),
            (h = null),
            y === g - f ? d.push("old") : y === m + f && d.push("new"),
            -1 !== t.inArray(y, b) && d.push("active"),
            (y < r || y > s) && d.push("disabled"),
            y === v && d.push("focused"),
            l !== t.noop &&
              ((u = l(new Date(y, 0, 1))),
              u === e
                ? (u = {})
                : "boolean" == typeof u
                ? (u = { enabled: u })
                : "string" == typeof u && (u = { classes: u }),
              !1 === u.enabled && d.push("disabled"),
              u.classes && (d = d.concat(u.classes.split(/\s+/))),
              u.tooltip && (h = u.tooltip)),
            (c +=
              '<span class="' +
              d.join(" ") +
              '"' +
              (h ? ' title="' + h + '"' : "") +
              ">" +
              y +
              "</span>");
        p.find(".datepicker-switch").text(g + "-" + m), p.find("td").html(c);
      },
      fill: function () {
        var a,
          o,
          r = new Date(this.viewDate),
          s = r.getUTCFullYear(),
          l = r.getUTCMonth(),
          d =
            this.o.startDate !== -1 / 0
              ? this.o.startDate.getUTCFullYear()
              : -1 / 0,
          h =
            this.o.startDate !== -1 / 0
              ? this.o.startDate.getUTCMonth()
              : -1 / 0,
          u =
            this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
          c = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
          f = m[this.o.language].today || m.en.today || "",
          p = m[this.o.language].clear || m.en.clear || "",
          g = m[this.o.language].titleFormat || m.en.titleFormat,
          b = n(),
          y =
            (!0 === this.o.todayBtn || "linked" === this.o.todayBtn) &&
            b >= this.o.startDate &&
            b <= this.o.endDate &&
            !this.weekOfDateIsDisabled(b);
        if (!isNaN(s) && !isNaN(l)) {
          this.picker
            .find(".datepicker-days .datepicker-switch")
            .text(v.formatDate(r, g, this.o.language)),
            this.picker
              .find("tfoot .today")
              .text(f)
              .css("display", y ? "table-cell" : "none"),
            this.picker
              .find("tfoot .clear")
              .text(p)
              .css("display", !0 === this.o.clearBtn ? "table-cell" : "none"),
            this.picker
              .find("thead .datepicker-title")
              .text(this.o.title)
              .css(
                "display",
                "string" == typeof this.o.title && "" !== this.o.title
                  ? "table-cell"
                  : "none"
              ),
            this.updateNavArrows(),
            this.fillMonths();
          var x = i(s, l, 0),
            _ = x.getUTCDate();
          x.setUTCDate(_ - ((x.getUTCDay() - this.o.weekStart + 7) % 7));
          var w = new Date(x);
          x.getUTCFullYear() < 100 && w.setUTCFullYear(x.getUTCFullYear()),
            w.setUTCDate(w.getUTCDate() + 42),
            (w = w.valueOf());
          for (var k, C, M = []; x.valueOf() < w; ) {
            if (
              (k = x.getUTCDay()) === this.o.weekStart &&
              (M.push("<tr>"), this.o.calendarWeeks)
            ) {
              var D = new Date(+x + ((this.o.weekStart - k - 7) % 7) * 864e5),
                S = new Date(Number(D) + ((11 - D.getUTCDay()) % 7) * 864e5),
                T = new Date(
                  Number((T = i(S.getUTCFullYear(), 0, 1))) +
                    ((11 - T.getUTCDay()) % 7) * 864e5
                ),
                F = (S - T) / 864e5 / 7 + 1;
              M.push('<td class="cw">' + F + "</td>");
            }
            (C = this.getClassNames(x)), C.push("day");
            var A = x.getUTCDate();
            this.o.beforeShowDay !== t.noop &&
              ((o = this.o.beforeShowDay(this._utc_to_local(x))),
              o === e
                ? (o = {})
                : "boolean" == typeof o
                ? (o = { enabled: o })
                : "string" == typeof o && (o = { classes: o }),
              !1 === o.enabled && C.push("disabled"),
              o.classes && (C = C.concat(o.classes.split(/\s+/))),
              o.tooltip && (a = o.tooltip),
              o.content && (A = o.content)),
              (C = t.isFunction(t.uniqueSort) ? t.uniqueSort(C) : t.unique(C)),
              M.push(
                '<td class="' +
                  C.join(" ") +
                  '"' +
                  (a ? ' title="' + a + '"' : "") +
                  ' data-date="' +
                  x.getTime().toString() +
                  '">' +
                  A +
                  "</td>"
              ),
              (a = null),
              k === this.o.weekEnd && M.push("</tr>"),
              x.setUTCDate(x.getUTCDate() + 1);
          }
          this.picker.find(".datepicker-days tbody").html(M.join(""));
          var P =
              m[this.o.language].monthsTitle || m.en.monthsTitle || "Months",
            I = this.picker
              .find(".datepicker-months")
              .find(".datepicker-switch")
              .text(this.o.maxViewMode < 2 ? P : s)
              .end()
              .find("tbody span")
              .removeClass("active");
          if (
            (t.each(this.dates, function (t, e) {
              e.getUTCFullYear() === s &&
                I.eq(e.getUTCMonth()).addClass("active");
            }),
            (s < d || s > u) && I.addClass("disabled"),
            s === d && I.slice(0, h).addClass("disabled"),
            s === u && I.slice(c + 1).addClass("disabled"),
            this.o.beforeShowMonth !== t.noop)
          ) {
            var E = this;
            t.each(I, function (i, n) {
              var a = new Date(s, i, 1),
                o = E.o.beforeShowMonth(a);
              o === e
                ? (o = {})
                : "boolean" == typeof o
                ? (o = { enabled: o })
                : "string" == typeof o && (o = { classes: o }),
                !1 !== o.enabled ||
                  t(n).hasClass("disabled") ||
                  t(n).addClass("disabled"),
                o.classes && t(n).addClass(o.classes),
                o.tooltip && t(n).prop("title", o.tooltip);
            });
          }
          this._fill_yearsView(
            ".datepicker-years",
            "year",
            10,
            s,
            d,
            u,
            this.o.beforeShowYear
          ),
            this._fill_yearsView(
              ".datepicker-decades",
              "decade",
              100,
              s,
              d,
              u,
              this.o.beforeShowDecade
            ),
            this._fill_yearsView(
              ".datepicker-centuries",
              "century",
              1e3,
              s,
              d,
              u,
              this.o.beforeShowCentury
            );
        }
      },
      updateNavArrows: function () {
        if (this._allow_update) {
          var t,
            e,
            i = new Date(this.viewDate),
            n = i.getUTCFullYear(),
            a = i.getUTCMonth(),
            o =
              this.o.startDate !== -1 / 0
                ? this.o.startDate.getUTCFullYear()
                : -1 / 0,
            r =
              this.o.startDate !== -1 / 0
                ? this.o.startDate.getUTCMonth()
                : -1 / 0,
            s =
              this.o.endDate !== 1 / 0
                ? this.o.endDate.getUTCFullYear()
                : 1 / 0,
            l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
            d = 1;
          switch (this.viewMode) {
            case 4:
              d *= 10;
            case 3:
              d *= 10;
            case 2:
              d *= 10;
            case 1:
              (t = Math.floor(n / d) * d <= o),
                (e = Math.floor(n / d) * d + d > s);
              break;
            case 0:
              (t = n <= o && a <= r), (e = n >= s && a >= l);
          }
          this.picker.find(".prev").toggleClass("disabled", t),
            this.picker.find(".next").toggleClass("disabled", e);
        }
      },
      click: function (e) {
        e.preventDefault(), e.stopPropagation();
        var a, o, r, s;
        (a = t(e.target)),
          a.hasClass("datepicker-switch") &&
            this.viewMode !== this.o.maxViewMode &&
            this.setViewMode(this.viewMode + 1),
          a.hasClass("today") &&
            !a.hasClass("day") &&
            (this.setViewMode(0),
            this._setDate(n(), "linked" === this.o.todayBtn ? null : "view")),
          a.hasClass("clear") && this.clearDates(),
          a.hasClass("disabled") ||
            ((a.hasClass("month") ||
              a.hasClass("year") ||
              a.hasClass("decade") ||
              a.hasClass("century")) &&
              (this.viewDate.setUTCDate(1),
              (o = 1),
              1 === this.viewMode
                ? ((s = a.parent().find("span").index(a)),
                  (r = this.viewDate.getUTCFullYear()),
                  this.viewDate.setUTCMonth(s))
                : ((s = 0),
                  (r = Number(a.text())),
                  this.viewDate.setUTCFullYear(r)),
              this._trigger(v.viewModes[this.viewMode - 1].e, this.viewDate),
              this.viewMode === this.o.minViewMode
                ? this._setDate(i(r, s, o))
                : (this.setViewMode(this.viewMode - 1), this.fill()))),
          this.picker.is(":visible") &&
            this._focused_from &&
            this._focused_from.focus(),
          delete this._focused_from;
      },
      dayCellClick: function (e) {
        var i = t(e.currentTarget),
          n = i.data("date"),
          a = new Date(n);
        this.o.updateViewDate &&
          (a.getUTCFullYear() !== this.viewDate.getUTCFullYear() &&
            this._trigger("changeYear", this.viewDate),
          a.getUTCMonth() !== this.viewDate.getUTCMonth() &&
            this._trigger("changeMonth", this.viewDate)),
          this._setDate(a);
      },
      navArrowsClick: function (e) {
        var i = t(e.currentTarget),
          n = i.hasClass("prev") ? -1 : 1;
        0 !== this.viewMode && (n *= 12 * v.viewModes[this.viewMode].navStep),
          (this.viewDate = this.moveMonth(this.viewDate, n)),
          this._trigger(v.viewModes[this.viewMode].e, this.viewDate),
          this.fill();
      },
      _toggle_multidate: function (t) {
        var e = this.dates.contains(t);
        if (
          (t || this.dates.clear(),
          -1 !== e
            ? (!0 === this.o.multidate ||
                this.o.multidate > 1 ||
                this.o.toggleActive) &&
              this.dates.remove(e)
            : !1 === this.o.multidate
            ? (this.dates.clear(), this.dates.push(t))
            : this.dates.push(t),
          "number" == typeof this.o.multidate)
        )
          for (; this.dates.length > this.o.multidate; ) this.dates.remove(0);
      },
      _setDate: function (t, e) {
        (e && "date" !== e) || this._toggle_multidate(t && new Date(t)),
          ((!e && this.o.updateViewDate) || "view" === e) &&
            (this.viewDate = t && new Date(t)),
          this.fill(),
          this.setValue(),
          (e && "view" === e) || this._trigger("changeDate"),
          this.inputField.trigger("change"),
          !this.o.autoclose || (e && "date" !== e) || this.hide();
      },
      moveDay: function (t, e) {
        var i = new Date(t);
        return i.setUTCDate(t.getUTCDate() + e), i;
      },
      moveWeek: function (t, e) {
        return this.moveDay(t, 7 * e);
      },
      moveMonth: function (t, e) {
        if (!r(t)) return this.o.defaultViewDate;
        if (!e) return t;
        var i,
          n,
          a = new Date(t.valueOf()),
          o = a.getUTCDate(),
          s = a.getUTCMonth(),
          l = Math.abs(e);
        if (((e = e > 0 ? 1 : -1), 1 === l))
          (n =
            -1 === e
              ? function () {
                  return a.getUTCMonth() === s;
                }
              : function () {
                  return a.getUTCMonth() !== i;
                }),
            (i = s + e),
            a.setUTCMonth(i),
            (i = (i + 12) % 12);
        else {
          for (var d = 0; d < l; d++) a = this.moveMonth(a, e);
          (i = a.getUTCMonth()),
            a.setUTCDate(o),
            (n = function () {
              return i !== a.getUTCMonth();
            });
        }
        for (; n(); ) a.setUTCDate(--o), a.setUTCMonth(i);
        return a;
      },
      moveYear: function (t, e) {
        return this.moveMonth(t, 12 * e);
      },
      moveAvailableDate: function (t, e, i) {
        do {
          if (((t = this[i](t, e)), !this.dateWithinRange(t))) return !1;
          i = "moveDay";
        } while (this.dateIsDisabled(t));
        return t;
      },
      weekOfDateIsDisabled: function (e) {
        return -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled);
      },
      dateIsDisabled: function (e) {
        return (
          this.weekOfDateIsDisabled(e) ||
          t.grep(this.o.datesDisabled, function (t) {
            return a(e, t);
          }).length > 0
        );
      },
      dateWithinRange: function (t) {
        return t >= this.o.startDate && t <= this.o.endDate;
      },
      keydown: function (t) {
        if (!this.picker.is(":visible"))
          return void (
            (40 !== t.keyCode && 27 !== t.keyCode) ||
            (this.show(), t.stopPropagation())
          );
        var e,
          i,
          n = !1,
          a = this.focusDate || this.viewDate;
        switch (t.keyCode) {
          case 27:
            this.focusDate
              ? ((this.focusDate = null),
                (this.viewDate = this.dates.get(-1) || this.viewDate),
                this.fill())
              : this.hide(),
              t.preventDefault(),
              t.stopPropagation();
            break;
          case 37:
          case 38:
          case 39:
          case 40:
            if (
              !this.o.keyboardNavigation ||
              7 === this.o.daysOfWeekDisabled.length
            )
              break;
            (e = 37 === t.keyCode || 38 === t.keyCode ? -1 : 1),
              0 === this.viewMode
                ? t.ctrlKey
                  ? (i = this.moveAvailableDate(a, e, "moveYear")) &&
                    this._trigger("changeYear", this.viewDate)
                  : t.shiftKey
                  ? (i = this.moveAvailableDate(a, e, "moveMonth")) &&
                    this._trigger("changeMonth", this.viewDate)
                  : 37 === t.keyCode || 39 === t.keyCode
                  ? (i = this.moveAvailableDate(a, e, "moveDay"))
                  : this.weekOfDateIsDisabled(a) ||
                    (i = this.moveAvailableDate(a, e, "moveWeek"))
                : 1 === this.viewMode
                ? ((38 !== t.keyCode && 40 !== t.keyCode) || (e *= 4),
                  (i = this.moveAvailableDate(a, e, "moveMonth")))
                : 2 === this.viewMode &&
                  ((38 !== t.keyCode && 40 !== t.keyCode) || (e *= 4),
                  (i = this.moveAvailableDate(a, e, "moveYear"))),
              i &&
                ((this.focusDate = this.viewDate = i),
                this.setValue(),
                this.fill(),
                t.preventDefault());
            break;
          case 13:
            if (!this.o.forceParse) break;
            (a = this.focusDate || this.dates.get(-1) || this.viewDate),
              this.o.keyboardNavigation &&
                (this._toggle_multidate(a), (n = !0)),
              (this.focusDate = null),
              (this.viewDate = this.dates.get(-1) || this.viewDate),
              this.setValue(),
              this.fill(),
              this.picker.is(":visible") &&
                (t.preventDefault(),
                t.stopPropagation(),
                this.o.autoclose && this.hide());
            break;
          case 9:
            (this.focusDate = null),
              (this.viewDate = this.dates.get(-1) || this.viewDate),
              this.fill(),
              this.hide();
        }
        n &&
          (this.dates.length
            ? this._trigger("changeDate")
            : this._trigger("clearDate"),
          this.inputField.trigger("change"));
      },
      setViewMode: function (t) {
        (this.viewMode = t),
          this.picker
            .children("div")
            .hide()
            .filter(".datepicker-" + v.viewModes[this.viewMode].clsName)
            .show(),
          this.updateNavArrows(),
          this._trigger("changeViewMode", new Date(this.viewDate));
      },
    };
    var u = function (e, i) {
      t.data(e, "datepicker", this),
        (this.element = t(e)),
        (this.inputs = t.map(i.inputs, function (t) {
          return t.jquery ? t[0] : t;
        })),
        delete i.inputs,
        (this.keepEmptyValues = i.keepEmptyValues),
        delete i.keepEmptyValues,
        f
          .call(t(this.inputs), i)
          .on("changeDate", t.proxy(this.dateUpdated, this)),
        (this.pickers = t.map(this.inputs, function (e) {
          return t.data(e, "datepicker");
        })),
        this.updateDates();
    };
    u.prototype = {
      updateDates: function () {
        (this.dates = t.map(this.pickers, function (t) {
          return t.getUTCDate();
        })),
          this.updateRanges();
      },
      updateRanges: function () {
        var e = t.map(this.dates, function (t) {
          return t.valueOf();
        });
        t.each(this.pickers, function (t, i) {
          i.setRange(e);
        });
      },
      clearDates: function () {
        t.each(this.pickers, function (t, e) {
          e.clearDates();
        });
      },
      dateUpdated: function (i) {
        if (!this.updating) {
          this.updating = !0;
          var n = t.data(i.target, "datepicker");
          if (n !== e) {
            var a = n.getUTCDate(),
              o = this.keepEmptyValues,
              r = t.inArray(i.target, this.inputs),
              s = r - 1,
              l = r + 1,
              d = this.inputs.length;
            if (-1 !== r) {
              if (
                (t.each(this.pickers, function (t, e) {
                  e.getUTCDate() || (e !== n && o) || e.setUTCDate(a);
                }),
                a < this.dates[s])
              )
                for (; s >= 0 && a < this.dates[s]; )
                  this.pickers[s--].setUTCDate(a);
              else if (a > this.dates[l])
                for (; l < d && a > this.dates[l]; )
                  this.pickers[l++].setUTCDate(a);
              this.updateDates(), delete this.updating;
            }
          }
        }
      },
      destroy: function () {
        t.map(this.pickers, function (t) {
          t.destroy();
        }),
          t(this.inputs).off("changeDate", this.dateUpdated),
          delete this.element.data().datepicker;
      },
      remove: o(
        "destroy",
        "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"
      ),
    };
    var c = t.fn.datepicker,
      f = function (i) {
        var n = Array.apply(null, arguments);
        n.shift();
        var a;
        if (
          (this.each(function () {
            var e = t(this),
              o = e.data("datepicker"),
              r = "object" == typeof i && i;
            if (!o) {
              var d = s(this, "date"),
                c = t.extend({}, p, d, r),
                f = l(c.language),
                g = t.extend({}, p, f, d, r);
              e.hasClass("input-daterange") || g.inputs
                ? (t.extend(g, {
                    inputs: g.inputs || e.find("input").toArray(),
                  }),
                  (o = new u(this, g)))
                : (o = new h(this, g)),
                e.data("datepicker", o);
            }
            "string" == typeof i &&
              "function" == typeof o[i] &&
              (a = o[i].apply(o, n));
          }),
          a === e || a instanceof h || a instanceof u)
        )
          return this;
        if (this.length > 1)
          throw new Error(
            "Using only allowed for the collection of a single element (" +
              i +
              " function)"
          );
        return a;
      };
    t.fn.datepicker = f;
    var p = (t.fn.datepicker.defaults = {
        assumeNearbyYear: !1,
        autoclose: !1,
        beforeShowDay: t.noop,
        beforeShowMonth: t.noop,
        beforeShowYear: t.noop,
        beforeShowDecade: t.noop,
        beforeShowCentury: t.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        toggleActive: !1,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keepEmptyValues: !1,
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        maxViewMode: 4,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        updateViewDate: !0,
        weekStart: 0,
        disableTouchKeyboard: !1,
        enableOnReadonly: !0,
        showOnFocus: !0,
        zIndexOffset: 10,
        container: "body",
        immediateUpdates: !1,
        title: "",
        templates: { leftArrow: "&#x00AB;", rightArrow: "&#x00BB;" },
        showWeekDays: !0,
      }),
      g = (t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"]);
    t.fn.datepicker.Constructor = h;
    var m = (t.fn.datepicker.dates = {
        en: {
          days: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          monthsShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          today: "Today",
          clear: "Clear",
          titleFormat: "MM yyyy",
        },
      }),
      v = {
        viewModes: [
          { names: ["days", "month"], clsName: "days", e: "changeMonth" },
          {
            names: ["months", "year"],
            clsName: "months",
            e: "changeYear",
            navStep: 1,
          },
          {
            names: ["years", "decade"],
            clsName: "years",
            e: "changeDecade",
            navStep: 10,
          },
          {
            names: ["decades", "century"],
            clsName: "decades",
            e: "changeCentury",
            navStep: 100,
          },
          {
            names: ["centuries", "millennium"],
            clsName: "centuries",
            e: "changeMillennium",
            navStep: 1e3,
          },
        ],
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function (t) {
          if (
            "function" == typeof t.toValue &&
            "function" == typeof t.toDisplay
          )
            return t;
          var e = t.replace(this.validParts, "\0").split("\0"),
            i = t.match(this.validParts);
          if (!e || !e.length || !i || 0 === i.length)
            throw new Error("Invalid date format.");
          return { separators: e, parts: i };
        },
        parseDate: function (i, a, o, r) {
          function s(t, e) {
            return (
              !0 === e && (e = 10),
              t < 100 &&
                (t += 2e3) > new Date().getFullYear() + e &&
                (t -= 100),
              t
            );
          }
          function l() {
            var t = this.slice(0, d[f].length),
              e = d[f].slice(0, t.length);
            return t.toLowerCase() === e.toLowerCase();
          }
          if (!i) return e;
          if (i instanceof Date) return i;
          if (("string" == typeof a && (a = v.parseFormat(a)), a.toValue))
            return a.toValue(i, a, o);
          var d,
            u,
            c,
            f,
            p,
            g = { d: "moveDay", m: "moveMonth", w: "moveWeek", y: "moveYear" },
            b = { yesterday: "-1d", today: "+0d", tomorrow: "+1d" };
          if (
            (i in b && (i = b[i]),
            /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(i))
          ) {
            for (
              d = i.match(/([\-+]\d+)([dmwy])/gi), i = new Date(), f = 0;
              f < d.length;
              f++
            )
              (u = d[f].match(/([\-+]\d+)([dmwy])/i)),
                (c = Number(u[1])),
                (p = g[u[2].toLowerCase()]),
                (i = h.prototype[p](i, c));
            return h.prototype._zero_utc_time(i);
          }
          d = (i && i.match(this.nonpunctuation)) || [];
          var y,
            x,
            _ = {},
            w = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
            k = {
              yyyy: function (t, e) {
                return t.setUTCFullYear(r ? s(e, r) : e);
              },
              m: function (t, e) {
                if (isNaN(t)) return t;
                for (e -= 1; e < 0; ) e += 12;
                for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e; )
                  t.setUTCDate(t.getUTCDate() - 1);
                return t;
              },
              d: function (t, e) {
                return t.setUTCDate(e);
              },
            };
          (k.yy = k.yyyy), (k.M = k.MM = k.mm = k.m), (k.dd = k.d), (i = n());
          var C = a.parts.slice();
          if (
            (d.length !== C.length &&
              (C = t(C)
                .filter(function (e, i) {
                  return -1 !== t.inArray(i, w);
                })
                .toArray()),
            d.length === C.length)
          ) {
            var M;
            for (f = 0, M = C.length; f < M; f++) {
              if (((y = parseInt(d[f], 10)), (u = C[f]), isNaN(y)))
                switch (u) {
                  case "MM":
                    (x = t(m[o].months).filter(l)),
                      (y = t.inArray(x[0], m[o].months) + 1);
                    break;
                  case "M":
                    (x = t(m[o].monthsShort).filter(l)),
                      (y = t.inArray(x[0], m[o].monthsShort) + 1);
                }
              _[u] = y;
            }
            var D, S;
            for (f = 0; f < w.length; f++)
              (S = w[f]) in _ &&
                !isNaN(_[S]) &&
                ((D = new Date(i)), k[S](D, _[S]), isNaN(D) || (i = D));
          }
          return i;
        },
        formatDate: function (e, i, n) {
          if (!e) return "";
          if (("string" == typeof i && (i = v.parseFormat(i)), i.toDisplay))
            return i.toDisplay(e, i, n);
          var a = {
            d: e.getUTCDate(),
            D: m[n].daysShort[e.getUTCDay()],
            DD: m[n].days[e.getUTCDay()],
            m: e.getUTCMonth() + 1,
            M: m[n].monthsShort[e.getUTCMonth()],
            MM: m[n].months[e.getUTCMonth()],
            yy: e.getUTCFullYear().toString().substring(2),
            yyyy: e.getUTCFullYear(),
          };
          (a.dd = (a.d < 10 ? "0" : "") + a.d),
            (a.mm = (a.m < 10 ? "0" : "") + a.m),
            (e = []);
          for (
            var o = t.extend([], i.separators), r = 0, s = i.parts.length;
            r <= s;
            r++
          )
            o.length && e.push(o.shift()), e.push(a[i.parts[r]]);
          return e.join("");
        },
        headTemplate:
          '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' +
          p.templates.leftArrow +
          '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' +
          p.templates.rightArrow +
          "</th></tr></thead>",
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate:
          '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>',
      };
    (v.template =
      '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' +
      v.headTemplate +
      "<tbody></tbody>" +
      v.footTemplate +
      '</table></div><div class="datepicker-months"><table class="table-condensed">' +
      v.headTemplate +
      v.contTemplate +
      v.footTemplate +
      '</table></div><div class="datepicker-years"><table class="table-condensed">' +
      v.headTemplate +
      v.contTemplate +
      v.footTemplate +
      '</table></div><div class="datepicker-decades"><table class="table-condensed">' +
      v.headTemplate +
      v.contTemplate +
      v.footTemplate +
      '</table></div><div class="datepicker-centuries"><table class="table-condensed">' +
      v.headTemplate +
      v.contTemplate +
      v.footTemplate +
      "</table></div></div>"),
      (t.fn.datepicker.DPGlobal = v),
      (t.fn.datepicker.noConflict = function () {
        return (t.fn.datepicker = c), this;
      }),
      (t.fn.datepicker.version = "1.9.0"),
      (t.fn.datepicker.deprecated = function (t) {
        var e = window.console;
        e && e.warn && e.warn("DEPRECATED: " + t);
      }),
      t(document).on(
        "focus.datepicker.data-api click.datepicker.data-api",
        '[data-provide="datepicker"]',
        function (e) {
          var i = t(this);
          i.data("datepicker") || (e.preventDefault(), f.call(i, "show"));
        }
      ),
      t(function () {
        f.call(t('[data-provide="datepicker-inline"]'));
      });
  }),
  (function (t) {
    "use strict";
    function e(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    var i = (function () {
      function t(t, e) {
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      return function (e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
      };
    })();
    !(function (t) {
      var n = "ekkoLightbox",
        a = t.fn[n],
        o = {
          title: "",
          footer: "",
          maxWidth: 9999,
          maxHeight: 9999,
          showArrows: !0,
          wrapping: !0,
          type: null,
          alwaysShowClose: !1,
          loadingMessage:
            '<div class="ekko-lightbox-loader"><div><div></div><div></div></div></div>',
          leftArrow: "<span>&#10094;</span>",
          rightArrow: "<span>&#10095;</span>",
          strings: {
            close: "Close",
            fail: "Failed to load image:",
            type: "Could not detect remote target type. Force the type using data-type",
          },
          doc: document,
          onShow: function () {},
          onShown: function () {},
          onHide: function () {},
          onHidden: function () {},
          onNavigate: function () {},
          onContentLoaded: function () {},
        },
        r = (function () {
          function n(i, a) {
            var r = this;
            e(this, n),
              (this._config = t.extend({}, o, a)),
              (this._$modalArrows = null),
              (this._galleryIndex = 0),
              (this._galleryName = null),
              (this._padding = null),
              (this._border = null),
              (this._titleIsShown = !1),
              (this._footerIsShown = !1),
              (this._wantedWidth = 0),
              (this._wantedHeight = 0),
              (this._touchstartX = 0),
              (this._touchendX = 0),
              (this._modalId =
                "ekkoLightbox-" + Math.floor(1e3 * Math.random() + 1)),
              (this._$element = i instanceof jQuery ? i : t(i)),
              (this._isBootstrap3 = 3 == t.fn.modal.Constructor.VERSION[0]);
            var s =
                '<h4 class="modal-title">' +
                (this._config.title || "&nbsp;") +
                "</h4>",
              l =
                '<button type="button" class="close" data-dismiss="modal" aria-label="' +
                this._config.strings.close +
                '"><span aria-hidden="true">&times;</span></button>',
              d =
                '<div class="modal-header' +
                (this._config.title || this._config.alwaysShowClose
                  ? ""
                  : " hide") +
                '">' +
                (this._isBootstrap3 ? l + s : s + l) +
                "</div>",
              h =
                '<div class="modal-footer' +
                (this._config.footer ? "" : " hide") +
                '">' +
                (this._config.footer || "&nbsp;") +
                "</div>",
              u =
                '<div class="modal-dialog" role="document"><div class="modal-content">' +
                d +
                '<div class="modal-body"><div class="ekko-lightbox-container"><div class="ekko-lightbox-item fade in show"></div><div class="ekko-lightbox-item fade"></div></div></div>' +
                h +
                "</div></div>";
            t(this._config.doc.body).append(
              '<div id="' +
                this._modalId +
                '" class="ekko-lightbox modal fade" tabindex="-1" tabindex="-1" role="dialog" aria-hidden="true">' +
                u +
                "</div>"
            ),
              (this._$modal = t("#" + this._modalId, this._config.doc)),
              (this._$modalDialog = this._$modal.find(".modal-dialog").first()),
              (this._$modalContent = this._$modal
                .find(".modal-content")
                .first()),
              (this._$modalBody = this._$modal.find(".modal-body").first()),
              (this._$modalHeader = this._$modal.find(".modal-header").first()),
              (this._$modalFooter = this._$modal.find(".modal-footer").first()),
              (this._$lightboxContainer = this._$modalBody
                .find(".ekko-lightbox-container")
                .first()),
              (this._$lightboxBodyOne = this._$lightboxContainer
                .find("> div:first-child")
                .first()),
              (this._$lightboxBodyTwo = this._$lightboxContainer
                .find("> div:last-child")
                .first()),
              (this._border = this._calculateBorders()),
              (this._padding = this._calculatePadding()),
              (this._galleryName = this._$element.data("gallery")),
              this._galleryName &&
                ((this._$galleryItems = t(document.body).find(
                  '*[data-gallery="' + this._galleryName + '"]'
                )),
                (this._galleryIndex = this._$galleryItems.index(
                  this._$element
                )),
                t(document).on(
                  "keydown.ekkoLightbox",
                  this._navigationalBinder.bind(this)
                ),
                this._config.showArrows &&
                  this._$galleryItems.length > 1 &&
                  (this._$lightboxContainer.append(
                    '<div class="ekko-lightbox-nav-overlay"><a href="#">' +
                      this._config.leftArrow +
                      '</a><a href="#">' +
                      this._config.rightArrow +
                      "</a></div>"
                  ),
                  (this._$modalArrows = this._$lightboxContainer
                    .find("div.ekko-lightbox-nav-overlay")
                    .first()),
                  this._$lightboxContainer.on(
                    "click",
                    "a:first-child",
                    function (t) {
                      return t.preventDefault(), r.navigateLeft();
                    }
                  ),
                  this._$lightboxContainer.on(
                    "click",
                    "a:last-child",
                    function (t) {
                      return t.preventDefault(), r.navigateRight();
                    }
                  ),
                  this.updateNavigation())),
              this._$modal
                .on("show.bs.modal", this._config.onShow.bind(this))
                .on("shown.bs.modal", function () {
                  return (
                    r._toggleLoading(!0), r._handle(), r._config.onShown.call(r)
                  );
                })
                .on("hide.bs.modal", this._config.onHide.bind(this))
                .on("hidden.bs.modal", function () {
                  return (
                    r._galleryName &&
                      (t(document).off("keydown.ekkoLightbox"),
                      t(window).off("resize.ekkoLightbox")),
                    r._$modal.remove(),
                    r._config.onHidden.call(r)
                  );
                })
                .modal(this._config),
              t(window).on("resize.ekkoLightbox", function () {
                r._resize(r._wantedWidth, r._wantedHeight);
              }),
              this._$lightboxContainer
                .on("touchstart", function () {
                  r._touchstartX = event.changedTouches[0].screenX;
                })
                .on("touchend", function () {
                  (r._touchendX = event.changedTouches[0].screenX),
                    r._swipeGesure();
                });
          }
          return (
            i(n, null, [
              {
                key: "Default",
                get: function () {
                  return o;
                },
              },
            ]),
            i(
              n,
              [
                {
                  key: "element",
                  value: function () {
                    return this._$element;
                  },
                },
                {
                  key: "modal",
                  value: function () {
                    return this._$modal;
                  },
                },
                {
                  key: "navigateTo",
                  value: function (e) {
                    if (e < 0 || e > this._$galleryItems.length - 1)
                      return this;
                    (this._galleryIndex = e),
                      this.updateNavigation(),
                      (this._$element = t(
                        this._$galleryItems.get(this._galleryIndex)
                      )),
                      this._handle();
                  },
                },
                {
                  key: "navigateLeft",
                  value: function () {
                    if (
                      this._$galleryItems &&
                      1 !== this._$galleryItems.length
                    ) {
                      if (0 === this._galleryIndex) {
                        if (!this._config.wrapping) return;
                        this._galleryIndex = this._$galleryItems.length - 1;
                      } else this._galleryIndex--;
                      return (
                        this._config.onNavigate.call(
                          this,
                          "left",
                          this._galleryIndex
                        ),
                        this.navigateTo(this._galleryIndex)
                      );
                    }
                  },
                },
                {
                  key: "navigateRight",
                  value: function () {
                    if (
                      this._$galleryItems &&
                      1 !== this._$galleryItems.length
                    ) {
                      if (
                        this._galleryIndex ===
                        this._$galleryItems.length - 1
                      ) {
                        if (!this._config.wrapping) return;
                        this._galleryIndex = 0;
                      } else this._galleryIndex++;
                      return (
                        this._config.onNavigate.call(
                          this,
                          "right",
                          this._galleryIndex
                        ),
                        this.navigateTo(this._galleryIndex)
                      );
                    }
                  },
                },
                {
                  key: "updateNavigation",
                  value: function () {
                    if (!this._config.wrapping) {
                      var t = this._$lightboxContainer.find(
                        "div.ekko-lightbox-nav-overlay"
                      );
                      0 === this._galleryIndex
                        ? t.find("a:first-child").addClass("disabled")
                        : t.find("a:first-child").removeClass("disabled"),
                        this._galleryIndex === this._$galleryItems.length - 1
                          ? t.find("a:last-child").addClass("disabled")
                          : t.find("a:last-child").removeClass("disabled");
                    }
                  },
                },
                {
                  key: "close",
                  value: function () {
                    return this._$modal.modal("hide");
                  },
                },
                {
                  key: "_navigationalBinder",
                  value: function (t) {
                    return (
                      (t = t || window.event),
                      39 === t.keyCode
                        ? this.navigateRight()
                        : 37 === t.keyCode
                        ? this.navigateLeft()
                        : void 0
                    );
                  },
                },
                {
                  key: "_detectRemoteType",
                  value: function (t, e) {
                    return (
                      (e = e || !1),
                      !e && this._isImage(t) && (e = "image"),
                      !e && this._getYoutubeId(t) && (e = "youtube"),
                      !e && this._getVimeoId(t) && (e = "vimeo"),
                      !e && this._getInstagramId(t) && (e = "instagram"),
                      (!e ||
                        [
                          "image",
                          "youtube",
                          "vimeo",
                          "instagram",
                          "video",
                          "url",
                        ].indexOf(e) < 0) &&
                        (e = "url"),
                      e
                    );
                  },
                },
                {
                  key: "_isImage",
                  value: function (t) {
                    return (
                      t &&
                      t.match(
                        /(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i
                      )
                    );
                  },
                },
                {
                  key: "_containerToUse",
                  value: function () {
                    var t = this,
                      e = this._$lightboxBodyTwo,
                      i = this._$lightboxBodyOne;
                    return (
                      this._$lightboxBodyTwo.hasClass("in") &&
                        ((e = this._$lightboxBodyOne),
                        (i = this._$lightboxBodyTwo)),
                      i.removeClass("in show"),
                      setTimeout(function () {
                        t._$lightboxBodyTwo.hasClass("in") ||
                          t._$lightboxBodyTwo.empty(),
                          t._$lightboxBodyOne.hasClass("in") ||
                            t._$lightboxBodyOne.empty();
                      }, 500),
                      e.addClass("in show"),
                      e
                    );
                  },
                },
                {
                  key: "_handle",
                  value: function () {
                    var t = this._containerToUse();
                    this._updateTitleAndFooter();
                    var e =
                        this._$element.attr("data-remote") ||
                        this._$element.attr("href"),
                      i = this._detectRemoteType(
                        e,
                        this._$element.attr("data-type") || !1
                      );
                    if (
                      [
                        "image",
                        "youtube",
                        "vimeo",
                        "instagram",
                        "video",
                        "url",
                      ].indexOf(i) < 0
                    )
                      return this._error(this._config.strings.type);
                    switch (i) {
                      case "image":
                        this._preloadImage(e, t),
                          this._preloadImageByIndex(this._galleryIndex, 3);
                        break;
                      case "youtube":
                        this._showYoutubeVideo(e, t);
                        break;
                      case "vimeo":
                        this._showVimeoVideo(this._getVimeoId(e), t);
                        break;
                      case "instagram":
                        this._showInstagramVideo(this._getInstagramId(e), t);
                        break;
                      case "video":
                        this._showHtml5Video(e, t);
                        break;
                      default:
                        this._loadRemoteContent(e, t);
                    }
                    return this;
                  },
                },
                {
                  key: "_getYoutubeId",
                  value: function (t) {
                    if (!t) return !1;
                    var e = t.match(
                      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
                    );
                    return !(!e || 11 !== e[2].length) && e[2];
                  },
                },
                {
                  key: "_getVimeoId",
                  value: function (t) {
                    return !!(t && t.indexOf("vimeo") > 0) && t;
                  },
                },
                {
                  key: "_getInstagramId",
                  value: function (t) {
                    return !!(t && t.indexOf("instagram") > 0) && t;
                  },
                },
                {
                  key: "_toggleLoading",
                  value: function (e) {
                    return (
                      (e = e || !1),
                      e
                        ? (this._$modalDialog.css("display", "none"),
                          this._$modal.removeClass("in show"),
                          t(".modal-backdrop").append(
                            this._config.loadingMessage
                          ))
                        : (this._$modalDialog.css("display", "block"),
                          this._$modal.addClass("in show"),
                          t(".modal-backdrop")
                            .find(".ekko-lightbox-loader")
                            .remove()),
                      this
                    );
                  },
                },
                {
                  key: "_calculateBorders",
                  value: function () {
                    return {
                      top: this._totalCssByAttribute("border-top-width"),
                      right: this._totalCssByAttribute("border-right-width"),
                      bottom: this._totalCssByAttribute("border-bottom-width"),
                      left: this._totalCssByAttribute("border-left-width"),
                    };
                  },
                },
                {
                  key: "_calculatePadding",
                  value: function () {
                    return {
                      top: this._totalCssByAttribute("padding-top"),
                      right: this._totalCssByAttribute("padding-right"),
                      bottom: this._totalCssByAttribute("padding-bottom"),
                      left: this._totalCssByAttribute("padding-left"),
                    };
                  },
                },
                {
                  key: "_totalCssByAttribute",
                  value: function (t) {
                    return (
                      parseInt(this._$modalDialog.css(t), 10) +
                      parseInt(this._$modalContent.css(t), 10) +
                      parseInt(this._$modalBody.css(t), 10)
                    );
                  },
                },
                {
                  key: "_updateTitleAndFooter",
                  value: function () {
                    var t = this._$element.data("title") || "",
                      e = this._$element.data("footer") || "";
                    return (
                      (this._titleIsShown = !1),
                      t || this._config.alwaysShowClose
                        ? ((this._titleIsShown = !0),
                          this._$modalHeader
                            .css("display", "")
                            .find(".modal-title")
                            .html(t || "&nbsp;"))
                        : this._$modalHeader.css("display", "none"),
                      (this._footerIsShown = !1),
                      e
                        ? ((this._footerIsShown = !0),
                          this._$modalFooter.css("display", "").html(e))
                        : this._$modalFooter.css("display", "none"),
                      this
                    );
                  },
                },
                {
                  key: "_showYoutubeVideo",
                  value: function (t, e) {
                    var i = this._getYoutubeId(t),
                      n = t.indexOf("&") > 0 ? t.substr(t.indexOf("&")) : "",
                      a = this._$element.data("width") || 560,
                      o = this._$element.data("height") || a / (560 / 315);
                    return this._showVideoIframe(
                      "//www.youtube.com/embed/" +
                        i +
                        "?badge=0&autoplay=1&html5=1" +
                        n,
                      a,
                      o,
                      e
                    );
                  },
                },
                {
                  key: "_showVimeoVideo",
                  value: function (t, e) {
                    var i = this._$element.data("width") || 500,
                      n = this._$element.data("height") || i / (560 / 315);
                    return this._showVideoIframe(t + "?autoplay=1", i, n, e);
                  },
                },
                {
                  key: "_showInstagramVideo",
                  value: function (t, e) {
                    var i = this._$element.data("width") || 612,
                      n = i + 80;
                    return (
                      (t = "/" !== t.substr(-1) ? t + "/" : t),
                      e.html(
                        '<iframe width="' +
                          i +
                          '" height="' +
                          n +
                          '" src="' +
                          t +
                          'embed/" frameborder="0" allowfullscreen></iframe>'
                      ),
                      this._resize(i, n),
                      this._config.onContentLoaded.call(this),
                      this._$modalArrows &&
                        this._$modalArrows.css("display", "none"),
                      this._toggleLoading(!1),
                      this
                    );
                  },
                },
                {
                  key: "_showVideoIframe",
                  value: function (t, e, i, n) {
                    return (
                      (i = i || e),
                      n.html(
                        '<div class="embed-responsive embed-responsive-16by9"><iframe width="' +
                          e +
                          '" height="' +
                          i +
                          '" src="' +
                          t +
                          '" frameborder="0" allowfullscreen class="embed-responsive-item"></iframe></div>'
                      ),
                      this._resize(e, i),
                      this._config.onContentLoaded.call(this),
                      this._$modalArrows &&
                        this._$modalArrows.css("display", "none"),
                      this._toggleLoading(!1),
                      this
                    );
                  },
                },
                {
                  key: "_showHtml5Video",
                  value: function (t, e) {
                    var i = this._$element.data("width") || 560,
                      n = this._$element.data("height") || i / (560 / 315);
                    return (
                      e.html(
                        '<div class="embed-responsive embed-responsive-16by9"><video width="' +
                          i +
                          '" height="' +
                          n +
                          '" src="' +
                          t +
                          '" preload="auto" autoplay controls class="embed-responsive-item"></video></div>'
                      ),
                      this._resize(i, n),
                      this._config.onContentLoaded.call(this),
                      this._$modalArrows &&
                        this._$modalArrows.css("display", "none"),
                      this._toggleLoading(!1),
                      this
                    );
                  },
                },
                {
                  key: "_loadRemoteContent",
                  value: function (e, i) {
                    var n = this,
                      a = this._$element.data("width") || 560,
                      o = this._$element.data("height") || 560,
                      r = this._$element.data("disableExternalCheck") || !1;
                    return (
                      this._toggleLoading(!1),
                      r || this._isExternal(e)
                        ? (i.html(
                            '<iframe src="' +
                              e +
                              '" frameborder="0" allowfullscreen></iframe>'
                          ),
                          this._config.onContentLoaded.call(this))
                        : i.load(
                            e,
                            t.proxy(function () {
                              return n._$element.trigger("loaded.bs.modal");
                            })
                          ),
                      this._$modalArrows &&
                        this._$modalArrows.css("display", "none"),
                      this._resize(a, o),
                      this
                    );
                  },
                },
                {
                  key: "_isExternal",
                  value: function (t) {
                    var e = t.match(
                      /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
                    );
                    return (
                      ("string" == typeof e[1] &&
                        e[1].length > 0 &&
                        e[1].toLowerCase() !== location.protocol) ||
                      ("string" == typeof e[2] &&
                        e[2].length > 0 &&
                        e[2].replace(
                          new RegExp(
                            ":(" +
                              { "http:": 80, "https:": 443 }[
                                location.protocol
                              ] +
                              ")?$"
                          ),
                          ""
                        ) !== location.host)
                    );
                  },
                },
                {
                  key: "_error",
                  value: function (t) {
                    return (
                      console.error(t),
                      this._containerToUse().html(t),
                      this._resize(300, 300),
                      this
                    );
                  },
                },
                {
                  key: "_preloadImageByIndex",
                  value: function (e, i) {
                    if (this._$galleryItems) {
                      var n = t(this._$galleryItems.get(e), !1);
                      if (void 0 !== n) {
                        var a = n.attr("data-remote") || n.attr("href");
                        return (
                          ("image" === n.attr("data-type") ||
                            this._isImage(a)) &&
                            this._preloadImage(a, !1),
                          i > 0
                            ? this._preloadImageByIndex(e + 1, i - 1)
                            : void 0
                        );
                      }
                    }
                  },
                },
                {
                  key: "_preloadImage",
                  value: function (e, i) {
                    var n = this;
                    i = i || !1;
                    var a = new Image();
                    return (
                      i &&
                        (function () {
                          var o = setTimeout(function () {
                            i.append(n._config.loadingMessage);
                          }, 200);
                          (a.onload = function () {
                            o && clearTimeout(o), (o = null);
                            var e = t("<img />");
                            return (
                              e.attr("src", a.src),
                              e.addClass("img-fluid"),
                              e.css("width", "100%"),
                              i.html(e),
                              n._$modalArrows &&
                                n._$modalArrows.css("display", ""),
                              n._resize(a.width, a.height),
                              n._toggleLoading(!1),
                              n._config.onContentLoaded.call(n)
                            );
                          }),
                            (a.onerror = function () {
                              return (
                                n._toggleLoading(!1),
                                n._error(n._config.strings.fail + "  " + e)
                              );
                            });
                        })(),
                      (a.src = e),
                      a
                    );
                  },
                },
                {
                  key: "_swipeGesure",
                  value: function () {
                    return this._touchendX < this._touchstartX
                      ? this.navigateRight()
                      : this._touchendX > this._touchstartX
                      ? this.navigateLeft()
                      : void 0;
                  },
                },
                {
                  key: "_resize",
                  value: function (e, i) {
                    (i = i || e),
                      (this._wantedWidth = e),
                      (this._wantedHeight = i);
                    var n = e / i,
                      a =
                        this._padding.left +
                        this._padding.right +
                        this._border.left +
                        this._border.right,
                      o = this._config.doc.body.clientWidth > 575 ? 20 : 0,
                      r = this._config.doc.body.clientWidth > 575 ? 0 : 20,
                      s = Math.min(
                        e + a,
                        this._config.doc.body.clientWidth - o,
                        this._config.maxWidth
                      );
                    e + a > s ? ((i = (s - a - r) / n), (e = s)) : (e += a);
                    var l = 0,
                      d = 0;
                    this._footerIsShown &&
                      (d = this._$modalFooter.outerHeight(!0) || 55),
                      this._titleIsShown &&
                        (l = this._$modalHeader.outerHeight(!0) || 67);
                    var h =
                        this._padding.top +
                        this._padding.bottom +
                        this._border.bottom +
                        this._border.top,
                      u =
                        parseFloat(this._$modalDialog.css("margin-top")) +
                        parseFloat(this._$modalDialog.css("margin-bottom")),
                      c = Math.min(
                        i,
                        t(window).height() - h - u - l - d,
                        this._config.maxHeight - h - l - d
                      );
                    i > c && (e = Math.ceil(c * n) + a),
                      this._$lightboxContainer.css("height", c),
                      this._$modalDialog.css("flex", 1).css("maxWidth", e);
                    var f = this._$modal.data("bs.modal");
                    if (f)
                      try {
                        f._handleUpdate();
                      } catch (t) {
                        f.handleUpdate();
                      }
                    return this;
                  },
                },
              ],
              [
                {
                  key: "_jQueryInterface",
                  value: function (e) {
                    var i = this;
                    return (
                      (e = e || {}),
                      this.each(function () {
                        var a = t(i),
                          o = t.extend(
                            {},
                            n.Default,
                            a.data(),
                            "object" == typeof e && e
                          );
                        new n(i, o);
                      })
                    );
                  },
                },
              ]
            ),
            n
          );
        })();
      (t.fn[n] = r._jQueryInterface),
        (t.fn[n].Constructor = r),
        (t.fn[n].noConflict = function () {
          return (t.fn[n] = a), r._jQueryInterface;
        });
    })(jQuery);
  })(jQuery),
  (function (t) {
    function e(t, e, a) {
      var o = t[0],
        r = /er/.test(a) ? g : /bl/.test(a) ? f : u,
        s =
          a == m
            ? {
                checked: o[u],
                disabled: o[f],
                indeterminate: "true" == t.attr(g) || "false" == t.attr(p),
              }
            : o[r];
      if (/^(ch|di|in)/.test(a) && !s) i(t, r);
      else if (/^(un|en|de)/.test(a) && s) n(t, r);
      else if (a == m) for (var l in s) s[l] ? i(t, l, !0) : n(t, l, !0);
      else
        (e && "toggle" != a) ||
          (e || t[_]("ifClicked"), s ? o[v] !== h && n(t, r) : i(t, r));
    }
    function i(e, i, a) {
      var m = e[0],
        b = e.parent(),
        _ = i == u,
        w = i == g,
        C = i == f,
        M = w ? p : _ ? c : "enabled",
        D = o(e, M + r(m[v])),
        S = o(e, i + r(m[v]));
      if (!0 !== m[i]) {
        if (!a && i == u && m[v] == h && m.name) {
          var T = e.closest("form"),
            F = 'input[name="' + m.name + '"]';
          (F = T.length ? T.find(F) : t(F)),
            F.each(function () {
              this !== m && t(this).data(l) && n(t(this), i);
            });
        }
        w
          ? ((m[i] = !0), m[u] && n(e, u, "force"))
          : (a || (m[i] = !0), _ && m[g] && n(e, g, !1)),
          s(e, _, i, a);
      }
      m[f] && o(e, k, !0) && b.find("." + d).css(k, "default"),
        b[y](S || o(e, i) || ""),
        b.attr("role") && !w && b.attr("aria-" + (C ? f : u), "true"),
        b[x](D || o(e, M) || "");
    }
    function n(t, e, i) {
      var n = t[0],
        a = t.parent(),
        l = e == u,
        h = e == g,
        m = e == f,
        b = h ? p : l ? c : "enabled",
        _ = o(t, b + r(n[v])),
        w = o(t, e + r(n[v]));
      !1 !== n[e] && ((!h && i && "force" != i) || (n[e] = !1), s(t, l, b, i)),
        !n[f] && o(t, k, !0) && a.find("." + d).css(k, "pointer"),
        a[x](w || o(t, e) || ""),
        a.attr("role") && !h && a.attr("aria-" + (m ? f : u), "false"),
        a[y](_ || o(t, b) || "");
    }
    function a(e, i) {
      e.data(l) &&
        (e.parent().html(e.attr("style", e.data(l).s || "")),
        i && e[_](i),
        e.off(".i").unwrap(),
        t(w + '[for="' + e[0].id + '"]')
          .add(e.closest(w))
          .off(".i"));
    }
    function o(t, e, i) {
      if (t.data(l)) return t.data(l).o[e + (i ? "" : "Class")];
    }
    function r(t) {
      return t.charAt(0).toUpperCase() + t.slice(1);
    }
    function s(t, e, i, n) {
      n || (e && t[_]("ifToggled"), t[_]("ifChanged")[_]("if" + r(i)));
    }
    var l = "iCheck",
      d = l + "-helper",
      h = "radio",
      u = "checked",
      c = "un" + u,
      f = "disabled",
      p = "determinate",
      g = "in" + p,
      m = "update",
      v = "type",
      b = "touchbegin.i touchend.i",
      y = "addClass",
      x = "removeClass",
      _ = "trigger",
      w = "label",
      k = "cursor",
      C =
        /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(
          navigator.userAgent
        );
    t.fn[l] = function (o, r) {
      var s = 'input[type="checkbox"], input[type="' + h + '"]',
        c = t(),
        p = function (e) {
          e.each(function () {
            var e = t(this);
            c = e.is(s) ? c.add(e) : c.add(e.find(s));
          });
        };
      if (
        /^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(
          o
        )
      )
        return (
          (o = o.toLowerCase()),
          p(this),
          c.each(function () {
            var i = t(this);
            "destroy" == o ? a(i, "ifDestroyed") : e(i, !0, o),
              t.isFunction(r) && r();
          })
        );
      if ("object" != typeof o && o) return this;
      var k = t.extend(
          {
            checkedClass: u,
            disabledClass: f,
            indeterminateClass: g,
            labelHover: !0,
          },
          o
        ),
        M = k.handle,
        D = k.hoverClass || "hover",
        S = k.focusClass || "focus",
        T = k.activeClass || "active",
        F = !!k.labelHover,
        A = k.labelHoverClass || "hover",
        P = 0 | ("" + k.increaseArea).replace("%", "");
      return (
        ("checkbox" != M && M != h) || (s = 'input[type="' + M + '"]'),
        P < -50 && (P = -50),
        p(this),
        c.each(function () {
          var o = t(this);
          a(o);
          var r,
            s = this,
            c = s.id,
            p = -P + "%",
            g = 100 + 2 * P + "%",
            M = {
              position: "absolute",
              top: p,
              left: p,
              display: "block",
              width: g,
              height: g,
              margin: 0,
              padding: 0,
              background: "#fff",
              border: 0,
              opacity: 0,
            },
            I = C
              ? { position: "absolute", visibility: "hidden" }
              : P
              ? M
              : { position: "absolute", opacity: 0 },
            E =
              "checkbox" == s[v]
                ? k.checkboxClass || "icheckbox"
                : k.radioClass || "i" + h,
            O = t(w + '[for="' + c + '"]').add(o.closest(w)),
            L = !!k.aria,
            R = l + "-" + Math.random().toString(36).substr(2, 6),
            V = '<div class="' + E + '" ' + (L ? 'role="' + s[v] + '" ' : "");
          L &&
            O.each(function () {
              (V += 'aria-labelledby="'),
                this.id ? (V += this.id) : ((this.id = R), (V += R)),
                (V += '"');
            }),
            (V = o
              .wrap(V + "/>")
              [_]("ifCreated")
              .parent()
              .append(k.insert)),
            (r = t('<ins class="' + d + '"/>')
              .css(M)
              .appendTo(V)),
            o.data(l, { o: k, s: o.attr("style") }).css(I),
            !!k.inheritClass && V[y](s.className || ""),
            !!k.inheritID && c && V.attr("id", l + "-" + c),
            "static" == V.css("position") && V.css("position", "relative"),
            e(o, !0, m),
            O.length &&
              O.on("click.i mouseover.i mouseout.i " + b, function (i) {
                var n = i[v],
                  a = t(this);
                if (!s[f]) {
                  if ("click" == n) {
                    if (t(i.target).is("a")) return;
                    e(o, !1, !0);
                  } else
                    F &&
                      (/ut|nd/.test(n)
                        ? (V[x](D), a[x](A))
                        : (V[y](D), a[y](A)));
                  if (!C) return !1;
                  i.stopPropagation();
                }
              }),
            o.on(
              "click.i focus.i blur.i keyup.i keydown.i keypress.i",
              function (t) {
                var e = t[v],
                  a = t.keyCode;
                return (
                  "click" != e &&
                  ("keydown" == e && 32 == a
                    ? ((s[v] == h && s[u]) || (s[u] ? n(o, u) : i(o, u)), !1)
                    : void ("keyup" == e && s[v] == h
                        ? !s[u] && i(o, u)
                        : /us|ur/.test(e) && V["blur" == e ? x : y](S)))
                );
              }
            ),
            r.on(
              "click mousedown mouseup mouseover mouseout " + b,
              function (t) {
                var i = t[v],
                  n = /wn|up/.test(i) ? T : D;
                if (!s[f]) {
                  if (
                    ("click" == i
                      ? e(o, !1, !0)
                      : (/wn|er|in/.test(i) ? V[y](n) : V[x](n + " " + T),
                        O.length &&
                          F &&
                          n == D &&
                          O[/ut|nd/.test(i) ? x : y](A)),
                    !C)
                  )
                    return !1;
                  t.stopPropagation();
                }
              }
            );
        })
      );
    };
  })(window.jQuery || window.Zepto),
  (function (t) {
    function e(t) {
      for (
        var e, i, n = t.length;
        n;
        e = parseInt(Math.random() * n), i = t[--n], t[n] = t[e], t[e] = i
      );
      return t;
    }
    function i(t, e) {
      return Math.floor(Math.random() * (e - t + 1) + t);
    }
    var n = [],
      a = [],
      o = [],
      r = [],
      s = null,
      l = {
        init: function (e, i) {
          for (
            var d = t.extend(
                {
                  bind: "click",
                  passwordElement: null,
                  displayElement: null,
                  passwordLength: 16,
                  uppercase: !0,
                  lowercase: !0,
                  numbers: !0,
                  specialChars: !0,
                  additionalSpecialChars: [],
                  onPasswordGenerated: function (t) {},
                },
                e
              ),
              h = 48;
            h < 58;
            h++
          )
            n.push(h);
          for (h = 65; h < 91; h++) a.push(h);
          for (h = 97; h < 123; h++) o.push(h);
          return (
            (r = [
              33, 35, 64, 36, 38, 42, 91, 93, 123, 125, 92, 47, 63, 58, 59, 95,
              45,
            ].concat(d.additionalSpecialChars)),
            this.each(function () {
              (s = t(this)),
                s.bind(d.bind, function (t) {
                  t.preventDefault(), l.generatePassword(d);
                });
            })
          );
        },
        generatePassword: function (s) {
          var l = new Array(),
            d = s.uppercase + s.lowercase + s.numbers + s.specialChars,
            h = 0,
            u = new Array(),
            c = Math.floor(s.passwordLength / d);
          if (s.uppercase) {
            for (var f = 0; f < c; f++)
              l.push(String.fromCharCode(a[i(0, a.length - 1)]));
            (u = u.concat(a)), h++;
          }
          if (s.numbers) {
            for (var f = 0; f < c; f++)
              l.push(String.fromCharCode(n[i(0, n.length - 1)]));
            (u = u.concat(n)), h++;
          }
          if (s.specialChars) {
            for (var f = 0; f < c; f++)
              l.push(String.fromCharCode(r[i(0, r.length - 1)]));
            (u = u.concat(r)), h++;
          }
          var p = s.passwordLength - h * c;
          if (s.lowercase)
            for (var f = 0; f < p; f++)
              l.push(String.fromCharCode(o[i(0, o.length - 1)]));
          else
            for (var f = 0; f < p; f++)
              l.push(String.fromCharCode(u[i(0, u.length - 1)]));
          (l = e(l).join("")),
            null !== s.passwordElement && t(s.passwordElement).val(l),
            null !== s.displayElement &&
              (t(s.displayElement).is("input")
                ? t(s.displayElement).val(l)
                : t(s.displayElement).text(l)),
            s.onPasswordGenerated(l);
        },
      };
    t.fn.pGenerator = function (e) {
      return l[e]
        ? l[e].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof e && e
        ? void t.error("Method " + e + " does not exist on jQuery.pGenerator")
        : l.init.apply(this, arguments);
    };
  })(jQuery),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e(
          (function () {
            try {
              return require("moment");
            } catch (t) {}
          })()
        ))
      : "function" == typeof define && define.amd
      ? define(["require"], function (t) {
          return e(
            (function () {
              try {
                return t("moment");
              } catch (t) {}
            })()
          );
        })
      : ((t = t || self), (t.Chart = e(t.moment)));
  })(this, function (t) {
    "use strict";
    function e() {
      for (var t = {}, e = Object.keys($e), i = e.length, n = 0; n < i; n++)
        t[e[n]] = { distance: -1, parent: null };
      return t;
    }
    function i(t) {
      var i = e(),
        n = [t];
      for (i[t].distance = 0; n.length; )
        for (
          var a = n.pop(), o = Object.keys($e[a]), r = o.length, s = 0;
          s < r;
          s++
        ) {
          var l = o[s],
            d = i[l];
          -1 === d.distance &&
            ((d.distance = i[a].distance + 1), (d.parent = a), n.unshift(l));
        }
      return i;
    }
    function n(t, e) {
      return function (i) {
        return e(t(i));
      };
    }
    function a(t, e) {
      for (
        var i = [e[t].parent, t], a = $e[e[t].parent][t], o = e[t].parent;
        e[o].parent;

      )
        i.unshift(e[o].parent),
          (a = n($e[e[o].parent][o], a)),
          (o = e[o].parent);
      return (a.conversion = i), a;
    }
    function o(t) {
      var e = function (e) {
        return void 0 === e || null === e
          ? e
          : (arguments.length > 1 &&
              (e = Array.prototype.slice.call(arguments)),
            t(e));
      };
      return "conversion" in t && (e.conversion = t.conversion), e;
    }
    function r(t) {
      var e = function (e) {
        if (void 0 === e || null === e) return e;
        arguments.length > 1 && (e = Array.prototype.slice.call(arguments));
        var i = t(e);
        if ("object" == typeof i)
          for (var n = i.length, a = 0; a < n; a++) i[a] = Math.round(i[a]);
        return i;
      };
      return "conversion" in t && (e.conversion = t.conversion), e;
    }
    function s(t) {
      if (t) {
        var e = /^#([a-fA-F0-9]{3,4})$/i,
          i = /^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i,
          n =
            /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
          a =
            /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
          o = /(\w+)/,
          r = [0, 0, 0],
          s = 1,
          l = t.match(e),
          d = "";
        if (l) {
          (l = l[1]), (d = l[3]);
          for (var h = 0; h < r.length; h++) r[h] = parseInt(l[h] + l[h], 16);
          d && (s = Math.round((parseInt(d + d, 16) / 255) * 100) / 100);
        } else if ((l = t.match(i))) {
          (d = l[2]), (l = l[1]);
          for (var h = 0; h < r.length; h++)
            r[h] = parseInt(l.slice(2 * h, 2 * h + 2), 16);
          d && (s = Math.round((parseInt(d, 16) / 255) * 100) / 100);
        } else if ((l = t.match(n))) {
          for (var h = 0; h < r.length; h++) r[h] = parseInt(l[h + 1]);
          s = parseFloat(l[4]);
        } else if ((l = t.match(a))) {
          for (var h = 0; h < r.length; h++)
            r[h] = Math.round(2.55 * parseFloat(l[h + 1]));
          s = parseFloat(l[4]);
        } else if ((l = t.match(o))) {
          if ("transparent" == l[1]) return [0, 0, 0, 0];
          if (!(r = Ke[l[1]])) return;
        }
        for (var h = 0; h < r.length; h++) r[h] = w(r[h], 0, 255);
        return (s = s || 0 == s ? w(s, 0, 1) : 1), (r[3] = s), r;
      }
    }
    function l(t) {
      if (t) {
        var e =
            /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
          i = t.match(e);
        if (i) {
          var n = parseFloat(i[4]);
          return [
            w(parseInt(i[1]), 0, 360),
            w(parseFloat(i[2]), 0, 100),
            w(parseFloat(i[3]), 0, 100),
            w(isNaN(n) ? 1 : n, 0, 1),
          ];
        }
      }
    }
    function d(t) {
      if (t) {
        var e =
            /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
          i = t.match(e);
        if (i) {
          var n = parseFloat(i[4]);
          return [
            w(parseInt(i[1]), 0, 360),
            w(parseFloat(i[2]), 0, 100),
            w(parseFloat(i[3]), 0, 100),
            w(isNaN(n) ? 1 : n, 0, 1),
          ];
        }
      }
    }
    function h(t) {
      var e = s(t);
      return e && e.slice(0, 3);
    }
    function u(t) {
      var e = l(t);
      return e && e.slice(0, 3);
    }
    function c(t) {
      var e = s(t);
      return e ? e[3] : (e = l(t)) ? e[3] : (e = d(t)) ? e[3] : void 0;
    }
    function f(t, e) {
      var e = void 0 !== e && 3 === t.length ? e : t[3];
      return (
        "#" +
        k(t[0]) +
        k(t[1]) +
        k(t[2]) +
        (e >= 0 && e < 1 ? k(Math.round(255 * e)) : "")
      );
    }
    function p(t, e) {
      return e < 1 || (t[3] && t[3] < 1)
        ? g(t, e)
        : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
    }
    function g(t, e) {
      return (
        void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
        "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
      );
    }
    function m(t, e) {
      return e < 1 || (t[3] && t[3] < 1)
        ? v(t, e)
        : "rgb(" +
            Math.round((t[0] / 255) * 100) +
            "%, " +
            Math.round((t[1] / 255) * 100) +
            "%, " +
            Math.round((t[2] / 255) * 100) +
            "%)";
    }
    function v(t, e) {
      return (
        "rgba(" +
        Math.round((t[0] / 255) * 100) +
        "%, " +
        Math.round((t[1] / 255) * 100) +
        "%, " +
        Math.round((t[2] / 255) * 100) +
        "%, " +
        (e || t[3] || 1) +
        ")"
      );
    }
    function b(t, e) {
      return e < 1 || (t[3] && t[3] < 1)
        ? y(t, e)
        : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)";
    }
    function y(t, e) {
      return (
        void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
        "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
      );
    }
    function x(t, e) {
      return (
        void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
        "hwb(" +
          t[0] +
          ", " +
          t[1] +
          "%, " +
          t[2] +
          "%" +
          (void 0 !== e && 1 !== e ? ", " + e : "") +
          ")"
      );
    }
    function _(t) {
      return Ze[t.slice(0, 3)];
    }
    function w(t, e, i) {
      return Math.min(Math.max(e, t), i);
    }
    function k(t) {
      var e = t.toString(16).toUpperCase();
      return e.length < 2 ? "0" + e : e;
    }
    function C(t) {
      return !t || ni.isNullOrUndef(t.size) || ni.isNullOrUndef(t.family)
        ? null
        : (t.style ? t.style + " " : "") +
            (t.weight ? t.weight + " " : "") +
            t.size +
            "px " +
            t.family;
    }
    function M(t, e, i, n) {
      var a,
        o,
        r,
        s,
        l,
        d,
        h,
        u,
        c,
        f = Object.keys(i);
      for (a = 0, o = f.length; a < o; ++a)
        if (
          ((r = f[a]),
          (d = i[r]),
          e.hasOwnProperty(r) || (e[r] = d),
          (s = e[r]) !== d && "_" !== r[0])
        ) {
          if (
            (t.hasOwnProperty(r) || (t[r] = s),
            (l = t[r]),
            (h = typeof d) === typeof l)
          )
            if ("string" === h) {
              if (((u = ei(l)), u.valid && ((c = ei(d)), c.valid))) {
                e[r] = c.mix(u, n).rgbString();
                continue;
              }
            } else if (Di.isFinite(l) && Di.isFinite(d)) {
              e[r] = l + (d - l) * n;
              continue;
            }
          e[r] = d;
        }
    }
    function D(t, e) {
      if (t._chartjs) return void t._chartjs.listeners.push(e);
      Object.defineProperty(t, "_chartjs", {
        configurable: !0,
        enumerable: !1,
        value: { listeners: [e] },
      }),
        Ni.forEach(function (e) {
          var i = "onData" + e.charAt(0).toUpperCase() + e.slice(1),
            n = t[e];
          Object.defineProperty(t, e, {
            configurable: !0,
            enumerable: !1,
            value: function () {
              var e = Array.prototype.slice.call(arguments),
                a = n.apply(this, e);
              return (
                Di.each(t._chartjs.listeners, function (t) {
                  "function" == typeof t[i] && t[i].apply(t, e);
                }),
                a
              );
            },
          });
        });
    }
    function S(t, e) {
      var i = t._chartjs;
      if (i) {
        var n = i.listeners,
          a = n.indexOf(e);
        -1 !== a && n.splice(a, 1),
          n.length > 0 ||
            (Ni.forEach(function (e) {
              delete t[e];
            }),
            delete t._chartjs);
      }
    }
    function T(t, e) {
      var i = e.startAngle,
        n = e.endAngle,
        a = e.pixelMargin,
        o = a / e.outerRadius,
        r = e.x,
        s = e.y;
      t.beginPath(),
        t.arc(r, s, e.outerRadius, i - o, n + o),
        e.innerRadius > a
          ? ((o = a / e.innerRadius),
            t.arc(r, s, e.innerRadius - a, n + o, i - o, !0))
          : t.arc(r, s, a, n + Math.PI / 2, i - Math.PI / 2),
        t.closePath(),
        t.clip();
    }
    function F(t, e, i, n) {
      var a,
        o = i.endAngle;
      for (
        n &&
          ((i.endAngle = i.startAngle + Bi),
          T(t, i),
          (i.endAngle = o),
          i.endAngle === i.startAngle &&
            i.fullCircles &&
            ((i.endAngle += Bi), i.fullCircles--)),
          t.beginPath(),
          t.arc(i.x, i.y, i.innerRadius, i.startAngle + Bi, i.startAngle, !0),
          a = 0;
        a < i.fullCircles;
        ++a
      )
        t.stroke();
      for (
        t.beginPath(),
          t.arc(i.x, i.y, e.outerRadius, i.startAngle, i.startAngle + Bi),
          a = 0;
        a < i.fullCircles;
        ++a
      )
        t.stroke();
    }
    function A(t, e, i) {
      var n = "inner" === e.borderAlign;
      n
        ? ((t.lineWidth = 2 * e.borderWidth), (t.lineJoin = "round"))
        : ((t.lineWidth = e.borderWidth), (t.lineJoin = "bevel")),
        i.fullCircles && F(t, e, i, n),
        n && T(t, i),
        t.beginPath(),
        t.arc(i.x, i.y, e.outerRadius, i.startAngle, i.endAngle),
        t.arc(i.x, i.y, i.innerRadius, i.endAngle, i.startAngle, !0),
        t.closePath(),
        t.stroke();
    }
    function P(t) {
      var e = this._view;
      return !!e && Math.abs(t - e.x) < e.radius + e.hitRadius;
    }
    function I(t) {
      var e = this._view;
      return !!e && Math.abs(t - e.y) < e.radius + e.hitRadius;
    }
    function E(t) {
      return t && void 0 !== t.width;
    }
    function O(t) {
      var e, i, n, a, o;
      return (
        E(t)
          ? ((o = t.width / 2),
            (e = t.x - o),
            (i = t.x + o),
            (n = Math.min(t.y, t.base)),
            (a = Math.max(t.y, t.base)))
          : ((o = t.height / 2),
            (e = Math.min(t.x, t.base)),
            (i = Math.max(t.x, t.base)),
            (n = t.y - o),
            (a = t.y + o)),
        { left: e, top: n, right: i, bottom: a }
      );
    }
    function L(t, e, i) {
      return t === e ? i : t === i ? e : t;
    }
    function R(t) {
      var e = t.borderSkipped,
        i = {};
      return e
        ? (t.horizontal
            ? t.base > t.x && (e = L(e, "left", "right"))
            : t.base < t.y && (e = L(e, "bottom", "top")),
          (i[e] = !0),
          i)
        : i;
    }
    function V(t, e, i) {
      var n,
        a,
        o,
        r,
        s = t.borderWidth,
        l = R(t);
      return (
        Di.isObject(s)
          ? ((n = +s.top || 0),
            (a = +s.right || 0),
            (o = +s.bottom || 0),
            (r = +s.left || 0))
          : (n = a = o = r = +s || 0),
        {
          t: l.top || n < 0 ? 0 : n > i ? i : n,
          r: l.right || a < 0 ? 0 : a > e ? e : a,
          b: l.bottom || o < 0 ? 0 : o > i ? i : o,
          l: l.left || r < 0 ? 0 : r > e ? e : r,
        }
      );
    }
    function N(t) {
      var e = O(t),
        i = e.right - e.left,
        n = e.bottom - e.top,
        a = V(t, i / 2, n / 2);
      return {
        outer: { x: e.left, y: e.top, w: i, h: n },
        inner: {
          x: e.left + a.l,
          y: e.top + a.t,
          w: i - a.l - a.r,
          h: n - a.t - a.b,
        },
      };
    }
    function U(t, e, i) {
      var n = null === e,
        a = null === i,
        o = !(!t || (n && a)) && O(t);
      return (
        o &&
        (n || (e >= o.left && e <= o.right)) &&
        (a || (i >= o.top && i <= o.bottom))
      );
    }
    function z(t, e) {
      var i,
        n,
        a,
        o,
        r = t._length;
      for (a = 1, o = e.length; a < o; ++a)
        r = Math.min(r, Math.abs(e[a] - e[a - 1]));
      for (a = 0, o = t.getTicks().length; a < o; ++a)
        (n = t.getPixelForTick(a)),
          (r = a > 0 ? Math.min(r, Math.abs(n - i)) : r),
          (i = n);
      return r;
    }
    function B(t, e, i) {
      var n,
        a,
        o = i.barThickness,
        r = e.stackCount,
        s = e.pixels[t],
        l = Di.isNullOrUndef(o) ? z(e.scale, e.pixels) : -1;
      return (
        Di.isNullOrUndef(o)
          ? ((n = l * i.categoryPercentage), (a = i.barPercentage))
          : ((n = o * r), (a = 1)),
        { chunk: n / r, ratio: a, start: s - n / 2 }
      );
    }
    function W(t, e, i) {
      var n,
        a,
        o = e.pixels,
        r = o[t],
        s = t > 0 ? o[t - 1] : null,
        l = t < o.length - 1 ? o[t + 1] : null,
        d = i.categoryPercentage;
      return (
        null === s && (s = r - (null === l ? e.end - e.start : l - r)),
        null === l && (l = r + r - s),
        (n = r - ((r - Math.min(s, l)) / 2) * d),
        (a = (Math.abs(l - s) / 2) * d),
        { chunk: a / e.stackCount, ratio: i.barPercentage, start: n }
      );
    }
    function H(t, e) {
      var i = (t && t.options.ticks) || {},
        n = i.reverse,
        a = void 0 === i.min ? e : 0,
        o = void 0 === i.max ? e : 0;
      return { start: n ? o : a, end: n ? a : o };
    }
    function j(t, e, i) {
      var n = i / 2,
        a = H(t, n),
        o = H(e, n);
      return { top: o.end, right: a.end, bottom: o.start, left: a.start };
    }
    function q(t) {
      var e, i, n, a;
      return (
        Di.isObject(t)
          ? ((e = t.top), (i = t.right), (n = t.bottom), (a = t.left))
          : (e = i = n = a = t),
        { top: e, right: i, bottom: n, left: a }
      );
    }
    function $(t, e) {
      return t.native ? { x: t.x, y: t.y } : Di.getRelativePosition(t, e);
    }
    function Y(t, e) {
      var i,
        n,
        a,
        o,
        r,
        s,
        l = t._getSortedVisibleDatasetMetas();
      for (n = 0, o = l.length; n < o; ++n)
        for (i = l[n].data, a = 0, r = i.length; a < r; ++a)
          (s = i[a]), s._view.skip || e(s);
    }
    function X(t, e) {
      var i = [];
      return (
        Y(t, function (t) {
          t.inRange(e.x, e.y) && i.push(t);
        }),
        i
      );
    }
    function G(t, e, i, n) {
      var a = Number.POSITIVE_INFINITY,
        o = [];
      return (
        Y(t, function (t) {
          if (!i || t.inRange(e.x, e.y)) {
            var r = t.getCenterPoint(),
              s = n(e, r);
            s < a ? ((o = [t]), (a = s)) : s === a && o.push(t);
          }
        }),
        o
      );
    }
    function K(t) {
      var e = -1 !== t.indexOf("x"),
        i = -1 !== t.indexOf("y");
      return function (t, n) {
        var a = e ? Math.abs(t.x - n.x) : 0,
          o = i ? Math.abs(t.y - n.y) : 0;
        return Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2));
      };
    }
    function Q(t, e, i) {
      var n = $(e, t);
      i.axis = i.axis || "x";
      var a = K(i.axis),
        o = i.intersect ? X(t, n) : G(t, n, !1, a),
        r = [];
      return o.length
        ? (t._getSortedVisibleDatasetMetas().forEach(function (t) {
            var e = t.data[o[0]._index];
            e && !e._view.skip && r.push(e);
          }),
          r)
        : [];
    }
    function Z(t, e) {
      return Di.where(t, function (t) {
        return t.pos === e;
      });
    }
    function J(t, e) {
      return t.sort(function (t, i) {
        var n = e ? i : t,
          a = e ? t : i;
        return n.weight === a.weight ? n.index - a.index : n.weight - a.weight;
      });
    }
    function tt(t) {
      var e,
        i,
        n,
        a = [];
      for (e = 0, i = (t || []).length; e < i; ++e)
        (n = t[e]),
          a.push({
            index: e,
            box: n,
            pos: n.position,
            horizontal: n.isHorizontal(),
            weight: n.weight,
          });
      return a;
    }
    function et(t, e) {
      var i, n, a;
      for (i = 0, n = t.length; i < n; ++i)
        (a = t[i]),
          (a.width = a.horizontal
            ? a.box.fullWidth && e.availableWidth
            : e.vBoxMaxWidth),
          (a.height = a.horizontal && e.hBoxMaxHeight);
    }
    function it(t) {
      var e = tt(t),
        i = J(Z(e, "left"), !0),
        n = J(Z(e, "right")),
        a = J(Z(e, "top"), !0),
        o = J(Z(e, "bottom"));
      return {
        leftAndTop: i.concat(a),
        rightAndBottom: n.concat(o),
        chartArea: Z(e, "chartArea"),
        vertical: i.concat(n),
        horizontal: a.concat(o),
      };
    }
    function nt(t, e, i, n) {
      return Math.max(t[i], e[i]) + Math.max(t[n], e[n]);
    }
    function at(t, e, i) {
      var n,
        a,
        o = i.box,
        r = t.maxPadding;
      if (
        (i.size && (t[i.pos] -= i.size),
        (i.size = i.horizontal ? o.height : o.width),
        (t[i.pos] += i.size),
        o.getPadding)
      ) {
        var s = o.getPadding();
        (r.top = Math.max(r.top, s.top)),
          (r.left = Math.max(r.left, s.left)),
          (r.bottom = Math.max(r.bottom, s.bottom)),
          (r.right = Math.max(r.right, s.right));
      }
      if (
        ((n = e.outerWidth - nt(r, t, "left", "right")),
        (a = e.outerHeight - nt(r, t, "top", "bottom")),
        n !== t.w || a !== t.h)
      )
        return (t.w = n), (t.h = a), i.horizontal ? n !== t.w : a !== t.h;
    }
    function ot(t) {
      function e(e) {
        var n = Math.max(i[e] - t[e], 0);
        return (t[e] += n), n;
      }
      var i = t.maxPadding;
      (t.y += e("top")), (t.x += e("left")), e("right"), e("bottom");
    }
    function rt(t, e) {
      function i(t) {
        var i = { left: 0, top: 0, right: 0, bottom: 0 };
        return (
          t.forEach(function (t) {
            i[t] = Math.max(e[t], n[t]);
          }),
          i
        );
      }
      var n = e.maxPadding;
      return i(t ? ["left", "right"] : ["top", "bottom"]);
    }
    function st(t, e, i) {
      var n,
        a,
        o,
        r,
        s,
        l,
        d = [];
      for (n = 0, a = t.length; n < a; ++n)
        (o = t[n]),
          (r = o.box),
          r.update(o.width || e.w, o.height || e.h, rt(o.horizontal, e)),
          at(e, i, o) && ((l = !0), d.length && (s = !0)),
          r.fullWidth || d.push(o);
      return s ? st(d, e, i) || l : l;
    }
    function lt(t, e, i) {
      var n,
        a,
        o,
        r,
        s = i.padding,
        l = e.x,
        d = e.y;
      for (n = 0, a = t.length; n < a; ++n)
        (o = t[n]),
          (r = o.box),
          o.horizontal
            ? ((r.left = r.fullWidth ? s.left : e.left),
              (r.right = r.fullWidth ? i.outerWidth - s.right : e.left + e.w),
              (r.top = d),
              (r.bottom = d + r.height),
              (r.width = r.right - r.left),
              (d = r.bottom))
            : ((r.left = l),
              (r.right = l + r.width),
              (r.top = e.top),
              (r.bottom = e.top + e.h),
              (r.height = r.bottom - r.top),
              (l = r.right));
      (e.x = l), (e.y = d);
    }
    function dt(t, e) {
      var i = Di.getStyle(t, e),
        n = i && i.match(/^(\d+)(\.\d+)?px$/);
      return n ? Number(n[1]) : void 0;
    }
    function ht(t, e) {
      var i = t.style,
        n = t.getAttribute("height"),
        a = t.getAttribute("width");
      if (
        ((t[In] = {
          initial: {
            height: n,
            width: a,
            style: { display: i.display, height: i.height, width: i.width },
          },
        }),
        (i.display = i.display || "block"),
        null === a || "" === a)
      ) {
        var o = dt(t, "width");
        void 0 !== o && (t.width = o);
      }
      if (null === n || "" === n)
        if ("" === t.style.height)
          t.height = t.width / (e.options.aspectRatio || 2);
        else {
          var r = dt(t, "height");
          void 0 !== o && (t.height = r);
        }
      return t;
    }
    function ut(t, e, i) {
      t.addEventListener(e, i, Un);
    }
    function ct(t, e, i) {
      t.removeEventListener(e, i, Un);
    }
    function ft(t, e, i, n, a) {
      return {
        type: t,
        chart: e,
        native: a || null,
        x: void 0 !== i ? i : null,
        y: void 0 !== n ? n : null,
      };
    }
    function pt(t, e) {
      var i = Vn[t.type] || t.type,
        n = Di.getRelativePosition(t, e);
      return ft(i, e, n.x, n.y, t);
    }
    function gt(t, e) {
      var i = !1,
        n = [];
      return function () {
        (n = Array.prototype.slice.call(arguments)),
          (e = e || this),
          i ||
            ((i = !0),
            Di.requestAnimFrame.call(window, function () {
              (i = !1), t.apply(e, n);
            }));
      };
    }
    function mt(t) {
      var e = document.createElement("div");
      return (e.className = t || ""), e;
    }
    function vt(t) {
      var e = mt(En),
        i = mt(En + "-expand"),
        n = mt(En + "-shrink");
      i.appendChild(mt()),
        n.appendChild(mt()),
        e.appendChild(i),
        e.appendChild(n),
        (e._reset = function () {
          (i.scrollLeft = 1e6),
            (i.scrollTop = 1e6),
            (n.scrollLeft = 1e6),
            (n.scrollTop = 1e6);
        });
      var a = function () {
        e._reset(), t();
      };
      return (
        ut(i, "scroll", a.bind(i, "expand")),
        ut(n, "scroll", a.bind(n, "shrink")),
        e
      );
    }
    function bt(t, e) {
      var i = t[In] || (t[In] = {}),
        n = (i.renderProxy = function (t) {
          t.animationName === Ln && e();
        });
      Di.each(Rn, function (e) {
        ut(t, e, n);
      }),
        (i.reflow = !!t.offsetParent),
        t.classList.add(On);
    }
    function yt(t) {
      var e = t[In] || {},
        i = e.renderProxy;
      i &&
        (Di.each(Rn, function (e) {
          ct(t, e, i);
        }),
        delete e.renderProxy),
        t.classList.remove(On);
    }
    function xt(t, e, i) {
      var n = t[In] || (t[In] = {}),
        a = (n.resizer = vt(
          gt(function () {
            if (n.resizer) {
              var a = i.options.maintainAspectRatio && t.parentNode,
                o = a ? a.clientWidth : 0;
              e(ft("resize", i)),
                a && a.clientWidth < o && i.canvas && e(ft("resize", i));
            }
          })
        ));
      bt(t, function () {
        if (n.resizer) {
          var e = t.parentNode;
          e && e !== a.parentNode && e.insertBefore(a, e.firstChild),
            a._reset();
        }
      });
    }
    function _t(t) {
      var e = t[In] || {},
        i = e.resizer;
      delete e.resizer, yt(t), i && i.parentNode && i.parentNode.removeChild(i);
    }
    function wt(t, e) {
      var i = t[In] || (t[In] = {});
      if (!i.containsStyles) {
        (i.containsStyles = !0), (e = "/* Chart.js */\n" + e);
        var n = document.createElement("style");
        n.setAttribute("type", "text/css"),
          n.appendChild(document.createTextNode(e)),
          t.appendChild(n);
      }
    }
    function kt(t, e) {
      return (
        e && (Di.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
      );
    }
    function Ct(t) {
      return ("string" == typeof t || t instanceof String) &&
        t.indexOf("\n") > -1
        ? t.split("\n")
        : t;
    }
    function Mt(t) {
      var e = t._xScale,
        i = t._yScale || t._scale,
        n = t._index,
        a = t._datasetIndex,
        o = t._chart.getDatasetMeta(a).controller,
        r = o._getIndexScale(),
        s = o._getValueScale();
      return {
        xLabel: e ? e.getLabelForIndex(n, a) : "",
        yLabel: i ? i.getLabelForIndex(n, a) : "",
        label: r ? "" + r.getLabelForIndex(n, a) : "",
        value: s ? "" + s.getLabelForIndex(n, a) : "",
        index: n,
        datasetIndex: a,
        x: t._model.x,
        y: t._model.y,
      };
    }
    function Dt(t) {
      var e = gi.global;
      return {
        xPadding: t.xPadding,
        yPadding: t.yPadding,
        xAlign: t.xAlign,
        yAlign: t.yAlign,
        rtl: t.rtl,
        textDirection: t.textDirection,
        bodyFontColor: t.bodyFontColor,
        _bodyFontFamily: qn(t.bodyFontFamily, e.defaultFontFamily),
        _bodyFontStyle: qn(t.bodyFontStyle, e.defaultFontStyle),
        _bodyAlign: t.bodyAlign,
        bodyFontSize: qn(t.bodyFontSize, e.defaultFontSize),
        bodySpacing: t.bodySpacing,
        titleFontColor: t.titleFontColor,
        _titleFontFamily: qn(t.titleFontFamily, e.defaultFontFamily),
        _titleFontStyle: qn(t.titleFontStyle, e.defaultFontStyle),
        titleFontSize: qn(t.titleFontSize, e.defaultFontSize),
        _titleAlign: t.titleAlign,
        titleSpacing: t.titleSpacing,
        titleMarginBottom: t.titleMarginBottom,
        footerFontColor: t.footerFontColor,
        _footerFontFamily: qn(t.footerFontFamily, e.defaultFontFamily),
        _footerFontStyle: qn(t.footerFontStyle, e.defaultFontStyle),
        footerFontSize: qn(t.footerFontSize, e.defaultFontSize),
        _footerAlign: t.footerAlign,
        footerSpacing: t.footerSpacing,
        footerMarginTop: t.footerMarginTop,
        caretSize: t.caretSize,
        cornerRadius: t.cornerRadius,
        backgroundColor: t.backgroundColor,
        opacity: 0,
        legendColorBackground: t.multiKeyBackground,
        displayColors: t.displayColors,
        borderColor: t.borderColor,
        borderWidth: t.borderWidth,
      };
    }
    function St(t, e) {
      var i = t._chart.ctx,
        n = 2 * e.yPadding,
        a = 0,
        o = e.body,
        r = o.reduce(function (t, e) {
          return t + e.before.length + e.lines.length + e.after.length;
        }, 0);
      r += e.beforeBody.length + e.afterBody.length;
      var s = e.title.length,
        l = e.footer.length,
        d = e.titleFontSize,
        h = e.bodyFontSize,
        u = e.footerFontSize;
      (n += s * d),
        (n += s ? (s - 1) * e.titleSpacing : 0),
        (n += s ? e.titleMarginBottom : 0),
        (n += r * h),
        (n += r ? (r - 1) * e.bodySpacing : 0),
        (n += l ? e.footerMarginTop : 0),
        (n += l * u),
        (n += l ? (l - 1) * e.footerSpacing : 0);
      var c = 0,
        f = function (t) {
          a = Math.max(a, i.measureText(t).width + c);
        };
      return (
        (i.font = Di.fontString(d, e._titleFontStyle, e._titleFontFamily)),
        Di.each(e.title, f),
        (i.font = Di.fontString(h, e._bodyFontStyle, e._bodyFontFamily)),
        Di.each(e.beforeBody.concat(e.afterBody), f),
        (c = e.displayColors ? h + 2 : 0),
        Di.each(o, function (t) {
          Di.each(t.before, f), Di.each(t.lines, f), Di.each(t.after, f);
        }),
        (c = 0),
        (i.font = Di.fontString(u, e._footerFontStyle, e._footerFontFamily)),
        Di.each(e.footer, f),
        (a += 2 * e.xPadding),
        { width: a, height: n }
      );
    }
    function Tt(t, e) {
      var i = t._model,
        n = t._chart,
        a = t._chart.chartArea,
        o = "center",
        r = "center";
      i.y < e.height
        ? (r = "top")
        : i.y > n.height - e.height && (r = "bottom");
      var s,
        l,
        d,
        h,
        u,
        c = (a.left + a.right) / 2,
        f = (a.top + a.bottom) / 2;
      "center" === r
        ? ((s = function (t) {
            return t <= c;
          }),
          (l = function (t) {
            return t > c;
          }))
        : ((s = function (t) {
            return t <= e.width / 2;
          }),
          (l = function (t) {
            return t >= n.width - e.width / 2;
          })),
        (d = function (t) {
          return t + e.width + i.caretSize + i.caretPadding > n.width;
        }),
        (h = function (t) {
          return t - e.width - i.caretSize - i.caretPadding < 0;
        }),
        (u = function (t) {
          return t <= f ? "top" : "bottom";
        }),
        s(i.x)
          ? ((o = "left"), d(i.x) && ((o = "center"), (r = u(i.y))))
          : l(i.x) && ((o = "right"), h(i.x) && ((o = "center"), (r = u(i.y))));
      var p = t._options;
      return {
        xAlign: p.xAlign ? p.xAlign : o,
        yAlign: p.yAlign ? p.yAlign : r,
      };
    }
    function Ft(t, e, i, n) {
      var a = t.x,
        o = t.y,
        r = t.caretSize,
        s = t.caretPadding,
        l = t.cornerRadius,
        d = i.xAlign,
        h = i.yAlign,
        u = r + s,
        c = l + s;
      return (
        "right" === d
          ? (a -= e.width)
          : "center" === d &&
            ((a -= e.width / 2),
            a + e.width > n.width && (a = n.width - e.width),
            a < 0 && (a = 0)),
        "top" === h
          ? (o += u)
          : (o -= "bottom" === h ? e.height + u : e.height / 2),
        "center" === h
          ? "left" === d
            ? (a += u)
            : "right" === d && (a -= u)
          : "left" === d
          ? (a -= c)
          : "right" === d && (a += c),
        { x: a, y: o }
      );
    }
    function At(t, e) {
      return "center" === e
        ? t.x + t.width / 2
        : "right" === e
        ? t.x + t.width - t.xPadding
        : t.x + t.xPadding;
    }
    function Pt(t) {
      return kt([], Ct(t));
    }
    function It() {
      return Di.merge({}, [].slice.call(arguments), {
        merger: function (t, e, i, n) {
          if ("xAxes" === t || "yAxes" === t) {
            var a,
              o,
              r,
              s = i[t].length;
            for (e[t] || (e[t] = []), a = 0; a < s; ++a)
              (r = i[t][a]),
                (o = Qn(r.type, "xAxes" === t ? "category" : "linear")),
                a >= e[t].length && e[t].push({}),
                !e[t][a].type || (r.type && r.type !== e[t][a].type)
                  ? Di.merge(e[t][a], [jn.getScaleDefaults(o), r])
                  : Di.merge(e[t][a], r);
          } else Di._merger(t, e, i, n);
        },
      });
    }
    function Et() {
      return Di.merge({}, [].slice.call(arguments), {
        merger: function (t, e, i, n) {
          var a = e[t] || {},
            o = i[t];
          "scales" === t
            ? (e[t] = It(a, o))
            : "scale" === t
            ? (e[t] = Di.merge(a, [jn.getScaleDefaults(o.type), o]))
            : Di._merger(t, e, i, n);
        },
      });
    }
    function Ot(t) {
      t = t || {};
      var e = (t.data = t.data || {});
      return (
        (e.datasets = e.datasets || []),
        (e.labels = e.labels || []),
        (t.options = Et(gi.global, gi[t.type], t.options || {})),
        t
      );
    }
    function Lt(t) {
      var e = t.options;
      Di.each(t.scales, function (e) {
        Tn.removeBox(t, e);
      }),
        (e = Et(gi.global, gi[t.config.type], e)),
        (t.options = t.config.options = e),
        t.ensureScalesHaveIDs(),
        t.buildOrUpdateScales(),
        (t.tooltip._options = e.tooltips),
        t.tooltip.initialize();
    }
    function Rt(t, e, i) {
      var n,
        a = function (t) {
          return t.id === n;
        };
      do {
        n = e + i++;
      } while (Di.findIndex(t, a) >= 0);
      return n;
    }
    function Vt(t) {
      return "top" === t || "bottom" === t;
    }
    function Nt(t, e) {
      return function (i, n) {
        return i[t] === n[t] ? i[e] - n[e] : i[t] - n[t];
      };
    }
    function Ut() {
      throw new Error(
        "This method is not implemented: either no adapter can be found or an incomplete integration was provided."
      );
    }
    function zt(t) {
      this.options = t || {};
    }
    function Bt(t, e) {
      for (var i = [], n = t.length / e, a = 0, o = t.length; a < o; a += n)
        i.push(t[Math.floor(a)]);
      return i;
    }
    function Wt(t, e, i) {
      var n,
        a = t.getTicks().length,
        o = Math.min(e, a - 1),
        r = t.getPixelForTick(o),
        s = t._startPixel,
        l = t._endPixel;
      if (
        !(
          i &&
          ((n =
            1 === a
              ? Math.max(r - s, l - r)
              : 0 === e
              ? (t.getPixelForTick(1) - r) / 2
              : (r - t.getPixelForTick(o - 1)) / 2),
          (r += o < e ? n : -n) < s - 1e-6 || r > l + 1e-6)
        )
      )
        return r;
    }
    function Ht(t, e) {
      Di.each(t, function (t) {
        var i,
          n = t.gc,
          a = n.length / 2;
        if (a > e) {
          for (i = 0; i < a; ++i) delete t.data[n[i]];
          n.splice(0, a);
        }
      });
    }
    function jt(t, e, i, n) {
      function a(t) {
        return { width: y[t] || 0, height: x[t] || 0, offset: _[t] || 0 };
      }
      var o,
        r,
        s,
        l,
        d,
        h,
        u,
        c,
        f,
        p,
        g,
        m,
        v,
        b = i.length,
        y = [],
        x = [],
        _ = [];
      for (o = 0; o < b; ++o) {
        if (
          ((l = i[o].label),
          (d = i[o].major ? e.major : e.minor),
          (t.font = h = d.string),
          (u = n[h] = n[h] || { data: {}, gc: [] }),
          (c = d.lineHeight),
          (f = p = 0),
          aa(l) || na(l))
        ) {
          if (na(l))
            for (r = 0, s = l.length; r < s; ++r)
              (g = l[r]),
                aa(g) ||
                  na(g) ||
                  ((f = Di.measureText(t, u.data, u.gc, f, g)), (p += c));
        } else (f = Di.measureText(t, u.data, u.gc, f, l)), (p = c);
        y.push(f), x.push(p), _.push(c / 2);
      }
      return (
        Ht(n, b),
        (m = y.indexOf(Math.max.apply(null, y))),
        (v = x.indexOf(Math.max.apply(null, x))),
        { first: a(0), last: a(b - 1), widest: a(m), highest: a(v) }
      );
    }
    function qt(t) {
      return t.drawTicks ? t.tickMarkLength : 0;
    }
    function $t(t) {
      var e, i;
      return t.display
        ? ((e = Di.options._parseFont(t)),
          (i = Di.options.toPadding(t.padding)),
          e.lineHeight + i.height)
        : 0;
    }
    function Yt(t, e) {
      return Di.extend(
        Di.options._parseFont({
          fontFamily: oa(e.fontFamily, t.fontFamily),
          fontSize: oa(e.fontSize, t.fontSize),
          fontStyle: oa(e.fontStyle, t.fontStyle),
          lineHeight: oa(e.lineHeight, t.lineHeight),
        }),
        {
          color: Di.options.resolve([
            e.fontColor,
            t.fontColor,
            gi.global.defaultFontColor,
          ]),
        }
      );
    }
    function Xt(t) {
      var e = Yt(t, t.minor);
      return { minor: e, major: t.major.enabled ? Yt(t, t.major) : e };
    }
    function Gt(t) {
      var e,
        i,
        n,
        a = [];
      for (i = 0, n = t.length; i < n; ++i)
        (e = t[i]), void 0 !== e._index && a.push(e);
      return a;
    }
    function Kt(t) {
      var e,
        i,
        n = t.length;
      if (n < 2) return !1;
      for (i = t[0], e = 1; e < n; ++e) if (t[e] - t[e - 1] !== i) return !1;
      return i;
    }
    function Qt(t, e, i, n) {
      var a,
        o,
        r,
        s,
        l = Kt(t),
        d = (e.length - 1) / n;
      if (!l) return Math.max(d, 1);
      for (a = Di.math._factorize(l), r = 0, s = a.length - 1; r < s; r++)
        if ((o = a[r]) > d) return o;
      return Math.max(d, 1);
    }
    function Zt(t) {
      var e,
        i,
        n = [];
      for (e = 0, i = t.length; e < i; e++) t[e].major && n.push(e);
      return n;
    }
    function Jt(t, e, i) {
      var n,
        a,
        o = 0,
        r = e[0];
      for (i = Math.ceil(i), n = 0; n < t.length; n++)
        (a = t[n]),
          n === r ? ((a._index = n), o++, (r = e[o * i])) : delete a.label;
    }
    function te(t, e, i, n) {
      var a,
        o,
        r,
        s,
        l = oa(i, 0),
        d = Math.min(oa(n, t.length), t.length),
        h = 0;
      for (
        e = Math.ceil(e),
          n && ((a = n - i), (e = a / Math.floor(a / e))),
          s = l;
        s < 0;

      )
        h++, (s = Math.round(l + h * e));
      for (o = Math.max(l, 0); o < d; o++)
        (r = t[o]),
          o === s
            ? ((r._index = o), h++, (s = Math.round(l + h * e)))
            : delete r.label;
    }
    function ee(t, e) {
      var i,
        n,
        a,
        o,
        r = [],
        s = t.stepSize,
        l = s || 1,
        d = t.maxTicks - 1,
        h = t.min,
        u = t.max,
        c = t.precision,
        f = e.min,
        p = e.max,
        g = Di.niceNum((p - f) / d / l) * l;
      if (g < 1e-14 && pa(h) && pa(u)) return [f, p];
      (o = Math.ceil(p / g) - Math.floor(f / g)),
        o > d && (g = Di.niceNum((o * g) / d / l) * l),
        s || pa(c)
          ? (i = Math.pow(10, Di._decimalPlaces(g)))
          : ((i = Math.pow(10, c)), (g = Math.ceil(g * i) / i)),
        (n = Math.floor(f / g) * g),
        (a = Math.ceil(p / g) * g),
        s &&
          (!pa(h) && Di.almostWhole(h / g, g / 1e3) && (n = h),
          !pa(u) && Di.almostWhole(u / g, g / 1e3) && (a = u)),
        (o = (a - n) / g),
        (o = Di.almostEquals(o, Math.round(o), g / 1e3)
          ? Math.round(o)
          : Math.ceil(o)),
        (n = Math.round(n * i) / i),
        (a = Math.round(a * i) / i),
        r.push(pa(h) ? n : h);
      for (var m = 1; m < o; ++m) r.push(Math.round((n + m * g) * i) / i);
      return r.push(pa(u) ? a : u), r;
    }
    function ie(t, e, i) {
      var n = [
        i.type,
        void 0 === e && void 0 === i.stack ? i.index : "",
        i.stack,
      ].join(".");
      return void 0 === t[n] && (t[n] = { pos: [], neg: [] }), t[n];
    }
    function ne(t, e, i, n) {
      var a,
        o,
        r = t.options,
        s = r.stacked,
        l = ie(e, s, i),
        d = l.pos,
        h = l.neg,
        u = n.length;
      for (a = 0; a < u; ++a)
        (o = t._parseValue(n[a])),
          isNaN(o.min) ||
            isNaN(o.max) ||
            i.data[a].hidden ||
            ((d[a] = d[a] || 0),
            (h[a] = h[a] || 0),
            r.relativePoints
              ? (d[a] = 100)
              : o.min < 0 || o.max < 0
              ? (h[a] += o.min)
              : (d[a] += o.max));
    }
    function ae(t, e, i) {
      var n,
        a,
        o = i.length;
      for (n = 0; n < o; ++n)
        (a = t._parseValue(i[n])),
          isNaN(a.min) ||
            isNaN(a.max) ||
            e.data[n].hidden ||
            ((t.min = Math.min(t.min, a.min)),
            (t.max = Math.max(t.max, a.max)));
    }
    function oe(t, e) {
      var i,
        n,
        a = [],
        o = ya(t.min, Math.pow(10, Math.floor(xa(e.min)))),
        r = Math.floor(xa(e.max)),
        s = Math.ceil(e.max / Math.pow(10, r));
      0 === o
        ? ((i = Math.floor(xa(e.minNotZero))),
          (n = Math.floor(e.minNotZero / Math.pow(10, i))),
          a.push(o),
          (o = n * Math.pow(10, i)))
        : ((i = Math.floor(xa(o))), (n = Math.floor(o / Math.pow(10, i))));
      var l = i < 0 ? Math.pow(10, Math.abs(i)) : 1;
      do {
        a.push(o),
          ++n,
          10 === n && ((n = 1), ++i, (l = i >= 0 ? 1 : l)),
          (o = Math.round(n * Math.pow(10, i) * l) / l);
      } while (i < r || (i === r && n < s));
      var d = ya(t.max, o);
      return a.push(d), a;
    }
    function re(t, e) {
      return Di.isFinite(t) && t >= 0 ? t : e;
    }
    function se(t) {
      var e = t.ticks;
      return e.display && t.display
        ? Ca(e.fontSize, gi.global.defaultFontSize) + 2 * e.backdropPaddingY
        : 0;
    }
    function le(t, e, i) {
      return Di.isArray(i)
        ? { w: Di.longestText(t, t.font, i), h: i.length * e }
        : { w: t.measureText(i).width, h: e };
    }
    function de(t, e, i, n, a) {
      return t === n || t === a
        ? { start: e - i / 2, end: e + i / 2 }
        : t < n || t > a
        ? { start: e - i, end: e }
        : { start: e, end: e + i };
    }
    function he(t) {
      var e,
        i,
        n,
        a = Di.options._parseFont(t.options.pointLabels),
        o = { l: 0, r: t.width, t: 0, b: t.height - t.paddingTop },
        r = {};
      (t.ctx.font = a.string), (t._pointLabelSizes = []);
      var s = t.chart.data.labels.length;
      for (e = 0; e < s; e++) {
        (n = t.getPointPosition(e, t.drawingArea + 5)),
          (i = le(t.ctx, a.lineHeight, t.pointLabels[e])),
          (t._pointLabelSizes[e] = i);
        var l = t.getIndexAngle(e),
          d = Di.toDegrees(l) % 360,
          h = de(d, n.x, i.w, 0, 180),
          u = de(d, n.y, i.h, 90, 270);
        h.start < o.l && ((o.l = h.start), (r.l = l)),
          h.end > o.r && ((o.r = h.end), (r.r = l)),
          u.start < o.t && ((o.t = u.start), (r.t = l)),
          u.end > o.b && ((o.b = u.end), (r.b = l));
      }
      t.setReductions(t.drawingArea, o, r);
    }
    function ue(t) {
      return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right";
    }
    function ce(t, e, i, n) {
      var a,
        o,
        r = i.y + n / 2;
      if (Di.isArray(e))
        for (a = 0, o = e.length; a < o; ++a)
          t.fillText(e[a], i.x, r), (r += n);
      else t.fillText(e, i.x, r);
    }
    function fe(t, e, i) {
      90 === t || 270 === t
        ? (i.y -= e.h / 2)
        : (t > 270 || t < 90) && (i.y -= e.h);
    }
    function pe(t) {
      var e = t.ctx,
        i = t.options,
        n = i.pointLabels,
        a = se(i),
        o = t.getDistanceFromCenterForValue(i.ticks.reverse ? t.min : t.max),
        r = Di.options._parseFont(n);
      e.save(), (e.font = r.string), (e.textBaseline = "middle");
      for (var s = t.chart.data.labels.length - 1; s >= 0; s--) {
        var l = 0 === s ? a / 2 : 0,
          d = t.getPointPosition(s, o + l + 5),
          h = Ma(n.fontColor, s, gi.global.defaultFontColor);
        e.fillStyle = h;
        var u = t.getIndexAngle(s),
          c = Di.toDegrees(u);
        (e.textAlign = ue(c)),
          fe(c, t._pointLabelSizes[s], d),
          ce(e, t.pointLabels[s], d, r.lineHeight);
      }
      e.restore();
    }
    function ge(t, e, i, n) {
      var a,
        o = t.ctx,
        r = e.circular,
        s = t.chart.data.labels.length,
        l = Ma(e.color, n - 1),
        d = Ma(e.lineWidth, n - 1);
      if ((r || s) && l && d) {
        if (
          (o.save(),
          (o.strokeStyle = l),
          (o.lineWidth = d),
          o.setLineDash &&
            (o.setLineDash(e.borderDash || []),
            (o.lineDashOffset = e.borderDashOffset || 0)),
          o.beginPath(),
          r)
        )
          o.arc(t.xCenter, t.yCenter, i, 0, 2 * Math.PI);
        else {
          (a = t.getPointPosition(0, i)), o.moveTo(a.x, a.y);
          for (var h = 1; h < s; h++)
            (a = t.getPointPosition(h, i)), o.lineTo(a.x, a.y);
        }
        o.closePath(), o.stroke(), o.restore();
      }
    }
    function me(t) {
      return Di.isNumber(t) ? t : 0;
    }
    function ve(t, e) {
      return t - e;
    }
    function be(t) {
      var e,
        i,
        n,
        a = {},
        o = [];
      for (e = 0, i = t.length; e < i; ++e)
        (n = t[e]), a[n] || ((a[n] = !0), o.push(n));
      return o;
    }
    function ye(t) {
      return Di.valueOrDefault(t.time.min, t.ticks.min);
    }
    function xe(t) {
      return Di.valueOrDefault(t.time.max, t.ticks.max);
    }
    function _e(t, e, i, n) {
      if ("linear" === n || !t.length)
        return [
          { time: e, pos: 0 },
          { time: i, pos: 1 },
        ];
      var a,
        o,
        r,
        s,
        l,
        d = [],
        h = [e];
      for (a = 0, o = t.length; a < o; ++a)
        (s = t[a]) > e && s < i && h.push(s);
      for (h.push(i), a = 0, o = h.length; a < o; ++a)
        (l = h[a + 1]),
          (r = h[a - 1]),
          (s = h[a]),
          (void 0 !== r && void 0 !== l && Math.round((l + r) / 2) === s) ||
            d.push({ time: s, pos: a / (o - 1) });
      return d;
    }
    function we(t, e, i) {
      for (var n, a, o, r = 0, s = t.length - 1; r >= 0 && r <= s; ) {
        if (((n = (r + s) >> 1), (a = t[n - 1] || null), (o = t[n]), !a))
          return { lo: null, hi: o };
        if (o[e] < i) r = n + 1;
        else {
          if (!(a[e] > i)) return { lo: a, hi: o };
          s = n - 1;
        }
      }
      return { lo: o, hi: null };
    }
    function ke(t, e, i, n) {
      var a = we(t, e, i),
        o = a.lo ? (a.hi ? a.lo : t[t.length - 2]) : t[0],
        r = a.lo ? (a.hi ? a.hi : t[t.length - 1]) : t[1],
        s = r[e] - o[e],
        l = s ? (i - o[e]) / s : 0,
        d = (r[n] - o[n]) * l;
      return o[n] + d;
    }
    function Ce(t, e) {
      var i = t._adapter,
        n = t.options.time,
        a = n.parser,
        o = a || n.format,
        r = e;
      return (
        "function" == typeof a && (r = a(r)),
        Di.isFinite(r) ||
          (r = "string" == typeof o ? i.parse(r, o) : i.parse(r)),
        null !== r
          ? +r
          : (a ||
              "function" != typeof o ||
              ((r = o(e)), Di.isFinite(r) || (r = i.parse(r))),
            r)
      );
    }
    function Me(t, e) {
      if (Di.isNullOrUndef(e)) return null;
      var i = t.options.time,
        n = Ce(t, t.getRightValue(e));
      return null === n
        ? n
        : (i.round && (n = +t._adapter.startOf(n, i.round)), n);
    }
    function De(t, e, i, n) {
      var a,
        o,
        r,
        s = Ra.length;
      for (a = Ra.indexOf(t); a < s - 1; ++a)
        if (
          ((o = La[Ra[a]]),
          (r = o.steps ? o.steps : Oa),
          o.common && Math.ceil((i - e) / (r * o.size)) <= n)
        )
          return Ra[a];
      return Ra[s - 1];
    }
    function Se(t, e, i, n, a) {
      var o, r;
      for (o = Ra.length - 1; o >= Ra.indexOf(i); o--)
        if (((r = Ra[o]), La[r].common && t._adapter.diff(a, n, r) >= e - 1))
          return r;
      return Ra[i ? Ra.indexOf(i) : 0];
    }
    function Te(t) {
      for (var e = Ra.indexOf(t) + 1, i = Ra.length; e < i; ++e)
        if (La[Ra[e]].common) return Ra[e];
    }
    function Fe(t, e, i, n) {
      var a,
        o = t._adapter,
        r = t.options,
        s = r.time,
        l = s.unit || De(s.minUnit, e, i, n),
        d = Pa([s.stepSize, s.unitStepSize, 1]),
        h = "week" === l && s.isoWeekday,
        u = e,
        c = [];
      if (
        (h && (u = +o.startOf(u, "isoWeek", h)),
        (u = +o.startOf(u, h ? "day" : l)),
        o.diff(i, e, l) > 1e5 * d)
      )
        throw (
          e + " and " + i + " are too far apart with stepSize of " + d + " " + l
        );
      for (a = u; a < i; a = +o.add(a, d, l)) c.push(a);
      return (a !== i && "ticks" !== r.bounds) || c.push(a), c;
    }
    function Ae(t, e, i, n, a) {
      var o,
        r,
        s = 0,
        l = 0;
      return (
        a.offset &&
          e.length &&
          ((o = ke(t, "time", e[0], "pos")),
          (s = 1 === e.length ? 1 - o : (ke(t, "time", e[1], "pos") - o) / 2),
          (r = ke(t, "time", e[e.length - 1], "pos")),
          (l =
            1 === e.length
              ? r
              : (r - ke(t, "time", e[e.length - 2], "pos")) / 2)),
        { start: s, end: l, factor: 1 / (s + 1 + l) }
      );
    }
    function Pe(t, e, i, n) {
      var a,
        o,
        r = t._adapter,
        s = +r.startOf(e[0].value, n),
        l = e[e.length - 1].value;
      for (a = s; a <= l; a = +r.add(a, 1, n))
        (o = i[a]) >= 0 && (e[o].major = !0);
      return e;
    }
    function Ie(t, e, i) {
      var n,
        a,
        o = [],
        r = {},
        s = e.length;
      for (n = 0; n < s; ++n)
        (a = e[n]), (r[a] = n), o.push({ value: a, major: !1 });
      return 0 !== s && i ? Pe(t, o, r, i) : o;
    }
    function Ee(t, e, i) {
      var n,
        a = t._model || {},
        o = a.fill;
      if ((void 0 === o && (o = !!a.backgroundColor), !1 === o || null === o))
        return !1;
      if (!0 === o) return "origin";
      if (((n = parseFloat(o, 10)), isFinite(n) && Math.floor(n) === n))
        return (
          ("-" !== o[0] && "+" !== o[0]) || (n = e + n),
          !(n === e || n < 0 || n >= i) && n
        );
      switch (o) {
        case "bottom":
          return "start";
        case "top":
          return "end";
        case "zero":
          return "origin";
        case "origin":
        case "start":
        case "end":
          return o;
        default:
          return !1;
      }
    }
    function Oe(t) {
      var e,
        i = t.el._model || {},
        n = t.el._scale || {},
        a = t.fill,
        o = null;
      if (isFinite(a)) return null;
      if (
        ("start" === a
          ? (o = void 0 === i.scaleBottom ? n.bottom : i.scaleBottom)
          : "end" === a
          ? (o = void 0 === i.scaleTop ? n.top : i.scaleTop)
          : void 0 !== i.scaleZero
          ? (o = i.scaleZero)
          : n.getBasePixel && (o = n.getBasePixel()),
        void 0 !== o && null !== o)
      ) {
        if (void 0 !== o.x && void 0 !== o.y) return o;
        if (Di.isFinite(o))
          return (e = n.isHorizontal()), { x: e ? o : null, y: e ? null : o };
      }
      return null;
    }
    function Le(t) {
      var e,
        i,
        n,
        a,
        o,
        r = t.el._scale,
        s = r.options,
        l = r.chart.data.labels.length,
        d = t.fill,
        h = [];
      if (!l) return null;
      for (
        e = s.ticks.reverse ? r.max : r.min,
          i = s.ticks.reverse ? r.min : r.max,
          n = r.getPointPositionForValue(0, e),
          a = 0;
        a < l;
        ++a
      )
        (o =
          "start" === d || "end" === d
            ? r.getPointPositionForValue(a, "start" === d ? e : i)
            : r.getBasePosition(a)),
          s.gridLines.circular &&
            ((o.cx = n.x),
            (o.cy = n.y),
            (o.angle = r.getIndexAngle(a) - Math.PI / 2)),
          h.push(o);
      return h;
    }
    function Re(t) {
      return (t.el._scale || {}).getPointPositionForValue ? Le(t) : Oe(t);
    }
    function Ve(t, e, i) {
      var n,
        a = t[e],
        o = a.fill,
        r = [e];
      if (!i) return o;
      for (; !1 !== o && -1 === r.indexOf(o); ) {
        if (!isFinite(o)) return o;
        if (!(n = t[o])) return !1;
        if (n.visible) return o;
        r.push(o), (o = n.fill);
      }
      return !1;
    }
    function Ne(t) {
      var e = t.fill,
        i = "dataset";
      return !1 === e ? null : (isFinite(e) || (i = "boundary"), Wa[i](t));
    }
    function Ue(t) {
      return t && !t.skip;
    }
    function ze(t, e, i, n, a) {
      var o, r, s, l;
      if (n && a) {
        for (t.moveTo(e[0].x, e[0].y), o = 1; o < n; ++o)
          Di.canvas.lineTo(t, e[o - 1], e[o]);
        if (void 0 === i[0].angle)
          for (t.lineTo(i[a - 1].x, i[a - 1].y), o = a - 1; o > 0; --o)
            Di.canvas.lineTo(t, i[o], i[o - 1], !0);
        else
          for (
            r = i[0].cx,
              s = i[0].cy,
              l = Math.sqrt(Math.pow(i[0].x - r, 2) + Math.pow(i[0].y - s, 2)),
              o = a - 1;
            o > 0;
            --o
          )
            t.arc(r, s, l, i[o].angle, i[o - 1].angle, !0);
      }
    }
    function Be(t, e, i, n, a, o) {
      var r,
        s,
        l,
        d,
        h,
        u,
        c,
        f,
        p = e.length,
        g = n.spanGaps,
        m = [],
        v = [],
        b = 0,
        y = 0;
      for (t.beginPath(), r = 0, s = p; r < s; ++r)
        (l = r % p),
          (d = e[l]._view),
          (h = i(d, l, n)),
          (u = Ue(d)),
          (c = Ue(h)),
          o && void 0 === f && u && ((f = r + 1), (s = p + f)),
          u && c
            ? ((b = m.push(d)), (y = v.push(h)))
            : b &&
              y &&
              (g
                ? (u && m.push(d), c && v.push(h))
                : (ze(t, m, v, b, y), (b = y = 0), (m = []), (v = [])));
      ze(t, m, v, b, y), t.closePath(), (t.fillStyle = a), t.fill();
    }
    function We(t, e) {
      return t.usePointStyle && t.boxWidth > e ? e : t.boxWidth;
    }
    function He(t, e) {
      var i = new Ya({ ctx: t.ctx, options: e, chart: t });
      Tn.configure(t, i, e), Tn.addBox(t, i), (t.legend = i);
    }
    function je(t, e) {
      var i = new Ka({ ctx: t.ctx, options: e, chart: t });
      Tn.configure(t, i, e), Tn.addBox(t, i), (t.titleBlock = i);
    }
    t = t && t.hasOwnProperty("default") ? t.default : t;
    var qe = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
      },
      $e = (function (t, e) {
        return (e = { exports: {} }), t(e, e.exports), e.exports;
      })(function (t) {
        function e(t, e) {
          return (
            Math.pow(t[0] - e[0], 2) +
            Math.pow(t[1] - e[1], 2) +
            Math.pow(t[2] - e[2], 2)
          );
        }
        var i = {};
        for (var n in qe) qe.hasOwnProperty(n) && (i[qe[n]] = n);
        var a = (t.exports = {
          rgb: { channels: 3, labels: "rgb" },
          hsl: { channels: 3, labels: "hsl" },
          hsv: { channels: 3, labels: "hsv" },
          hwb: { channels: 3, labels: "hwb" },
          cmyk: { channels: 4, labels: "cmyk" },
          xyz: { channels: 3, labels: "xyz" },
          lab: { channels: 3, labels: "lab" },
          lch: { channels: 3, labels: "lch" },
          hex: { channels: 1, labels: ["hex"] },
          keyword: { channels: 1, labels: ["keyword"] },
          ansi16: { channels: 1, labels: ["ansi16"] },
          ansi256: { channels: 1, labels: ["ansi256"] },
          hcg: { channels: 3, labels: ["h", "c", "g"] },
          apple: { channels: 3, labels: ["r16", "g16", "b16"] },
          gray: { channels: 1, labels: ["gray"] },
        });
        for (var o in a)
          if (a.hasOwnProperty(o)) {
            if (!("channels" in a[o]))
              throw new Error("missing channels property: " + o);
            if (!("labels" in a[o]))
              throw new Error("missing channel labels property: " + o);
            if (a[o].labels.length !== a[o].channels)
              throw new Error("channel and label counts mismatch: " + o);
            var r = a[o].channels,
              s = a[o].labels;
            delete a[o].channels,
              delete a[o].labels,
              Object.defineProperty(a[o], "channels", { value: r }),
              Object.defineProperty(a[o], "labels", { value: s });
          }
        (a.rgb.hsl = function (t) {
          var e,
            i,
            n,
            a = t[0] / 255,
            o = t[1] / 255,
            r = t[2] / 255,
            s = Math.min(a, o, r),
            l = Math.max(a, o, r),
            d = l - s;
          return (
            l === s
              ? (e = 0)
              : a === l
              ? (e = (o - r) / d)
              : o === l
              ? (e = 2 + (r - a) / d)
              : r === l && (e = 4 + (a - o) / d),
            (e = Math.min(60 * e, 360)),
            e < 0 && (e += 360),
            (n = (s + l) / 2),
            (i = l === s ? 0 : n <= 0.5 ? d / (l + s) : d / (2 - l - s)),
            [e, 100 * i, 100 * n]
          );
        }),
          (a.rgb.hsv = function (t) {
            var e,
              i,
              n,
              a,
              o,
              r = t[0] / 255,
              s = t[1] / 255,
              l = t[2] / 255,
              d = Math.max(r, s, l),
              h = d - Math.min(r, s, l),
              u = function (t) {
                return (d - t) / 6 / h + 0.5;
              };
            return (
              0 === h
                ? (a = o = 0)
                : ((o = h / d),
                  (e = u(r)),
                  (i = u(s)),
                  (n = u(l)),
                  r === d
                    ? (a = n - i)
                    : s === d
                    ? (a = 1 / 3 + e - n)
                    : l === d && (a = 2 / 3 + i - e),
                  a < 0 ? (a += 1) : a > 1 && (a -= 1)),
              [360 * a, 100 * o, 100 * d]
            );
          }),
          (a.rgb.hwb = function (t) {
            var e = t[0],
              i = t[1],
              n = t[2],
              o = a.rgb.hsl(t)[0],
              r = (1 / 255) * Math.min(e, Math.min(i, n));
            return (
              (n = 1 - (1 / 255) * Math.max(e, Math.max(i, n))),
              [o, 100 * r, 100 * n]
            );
          }),
          (a.rgb.cmyk = function (t) {
            var e,
              i,
              n,
              a,
              o = t[0] / 255,
              r = t[1] / 255,
              s = t[2] / 255;
            return (
              (a = Math.min(1 - o, 1 - r, 1 - s)),
              (e = (1 - o - a) / (1 - a) || 0),
              (i = (1 - r - a) / (1 - a) || 0),
              (n = (1 - s - a) / (1 - a) || 0),
              [100 * e, 100 * i, 100 * n, 100 * a]
            );
          }),
          (a.rgb.keyword = function (t) {
            var n = i[t];
            if (n) return n;
            var a,
              o = 1 / 0;
            for (var r in qe)
              if (qe.hasOwnProperty(r)) {
                var s = qe[r],
                  l = e(t, s);
                l < o && ((o = l), (a = r));
              }
            return a;
          }),
          (a.keyword.rgb = function (t) {
            return qe[t];
          }),
          (a.rgb.xyz = function (t) {
            var e = t[0] / 255,
              i = t[1] / 255,
              n = t[2] / 255;
            return (
              (e =
                e > 0.04045 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92),
              (i =
                i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92),
              (n =
                n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92),
              [
                100 * (0.4124 * e + 0.3576 * i + 0.1805 * n),
                100 * (0.2126 * e + 0.7152 * i + 0.0722 * n),
                100 * (0.0193 * e + 0.1192 * i + 0.9505 * n),
              ]
            );
          }),
          (a.rgb.lab = function (t) {
            var e,
              i,
              n,
              o = a.rgb.xyz(t),
              r = o[0],
              s = o[1],
              l = o[2];
            return (
              (r /= 95.047),
              (s /= 100),
              (l /= 108.883),
              (r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116),
              (s = s > 0.008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116),
              (l = l > 0.008856 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116),
              (e = 116 * s - 16),
              (i = 500 * (r - s)),
              (n = 200 * (s - l)),
              [e, i, n]
            );
          }),
          (a.hsl.rgb = function (t) {
            var e,
              i,
              n,
              a,
              o,
              r = t[0] / 360,
              s = t[1] / 100,
              l = t[2] / 100;
            if (0 === s) return (o = 255 * l), [o, o, o];
            (i = l < 0.5 ? l * (1 + s) : l + s - l * s),
              (e = 2 * l - i),
              (a = [0, 0, 0]);
            for (var d = 0; d < 3; d++)
              (n = r + (1 / 3) * -(d - 1)),
                n < 0 && n++,
                n > 1 && n--,
                (o =
                  6 * n < 1
                    ? e + 6 * (i - e) * n
                    : 2 * n < 1
                    ? i
                    : 3 * n < 2
                    ? e + (i - e) * (2 / 3 - n) * 6
                    : e),
                (a[d] = 255 * o);
            return a;
          }),
          (a.hsl.hsv = function (t) {
            var e,
              i,
              n = t[0],
              a = t[1] / 100,
              o = t[2] / 100,
              r = a,
              s = Math.max(o, 0.01);
            return (
              (o *= 2),
              (a *= o <= 1 ? o : 2 - o),
              (r *= s <= 1 ? s : 2 - s),
              (i = (o + a) / 2),
              (e = 0 === o ? (2 * r) / (s + r) : (2 * a) / (o + a)),
              [n, 100 * e, 100 * i]
            );
          }),
          (a.hsv.rgb = function (t) {
            var e = t[0] / 60,
              i = t[1] / 100,
              n = t[2] / 100,
              a = Math.floor(e) % 6,
              o = e - Math.floor(e),
              r = 255 * n * (1 - i),
              s = 255 * n * (1 - i * o),
              l = 255 * n * (1 - i * (1 - o));
            switch (((n *= 255), a)) {
              case 0:
                return [n, l, r];
              case 1:
                return [s, n, r];
              case 2:
                return [r, n, l];
              case 3:
                return [r, s, n];
              case 4:
                return [l, r, n];
              case 5:
                return [n, r, s];
            }
          }),
          (a.hsv.hsl = function (t) {
            var e,
              i,
              n,
              a = t[0],
              o = t[1] / 100,
              r = t[2] / 100,
              s = Math.max(r, 0.01);
            return (
              (n = (2 - o) * r),
              (e = (2 - o) * s),
              (i = o * s),
              (i /= e <= 1 ? e : 2 - e),
              (i = i || 0),
              (n /= 2),
              [a, 100 * i, 100 * n]
            );
          }),
          (a.hwb.rgb = function (t) {
            var e,
              i,
              n,
              a,
              o = t[0] / 360,
              r = t[1] / 100,
              s = t[2] / 100,
              l = r + s;
            l > 1 && ((r /= l), (s /= l)),
              (e = Math.floor(6 * o)),
              (i = 1 - s),
              (n = 6 * o - e),
              0 != (1 & e) && (n = 1 - n),
              (a = r + n * (i - r));
            var d, h, u;
            switch (e) {
              default:
              case 6:
              case 0:
                (d = i), (h = a), (u = r);
                break;
              case 1:
                (d = a), (h = i), (u = r);
                break;
              case 2:
                (d = r), (h = i), (u = a);
                break;
              case 3:
                (d = r), (h = a), (u = i);
                break;
              case 4:
                (d = a), (h = r), (u = i);
                break;
              case 5:
                (d = i), (h = r), (u = a);
            }
            return [255 * d, 255 * h, 255 * u];
          }),
          (a.cmyk.rgb = function (t) {
            var e,
              i,
              n,
              a = t[0] / 100,
              o = t[1] / 100,
              r = t[2] / 100,
              s = t[3] / 100;
            return (
              (e = 1 - Math.min(1, a * (1 - s) + s)),
              (i = 1 - Math.min(1, o * (1 - s) + s)),
              (n = 1 - Math.min(1, r * (1 - s) + s)),
              [255 * e, 255 * i, 255 * n]
            );
          }),
          (a.xyz.rgb = function (t) {
            var e,
              i,
              n,
              a = t[0] / 100,
              o = t[1] / 100,
              r = t[2] / 100;
            return (
              (e = 3.2406 * a + -1.5372 * o + -0.4986 * r),
              (i = -0.9689 * a + 1.8758 * o + 0.0415 * r),
              (n = 0.0557 * a + -0.204 * o + 1.057 * r),
              (e =
                e > 0.0031308
                  ? 1.055 * Math.pow(e, 1 / 2.4) - 0.055
                  : 12.92 * e),
              (i =
                i > 0.0031308
                  ? 1.055 * Math.pow(i, 1 / 2.4) - 0.055
                  : 12.92 * i),
              (n =
                n > 0.0031308
                  ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055
                  : 12.92 * n),
              (e = Math.min(Math.max(0, e), 1)),
              (i = Math.min(Math.max(0, i), 1)),
              (n = Math.min(Math.max(0, n), 1)),
              [255 * e, 255 * i, 255 * n]
            );
          }),
          (a.xyz.lab = function (t) {
            var e,
              i,
              n,
              a = t[0],
              o = t[1],
              r = t[2];
            return (
              (a /= 95.047),
              (o /= 100),
              (r /= 108.883),
              (a = a > 0.008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116),
              (o = o > 0.008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116),
              (r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116),
              (e = 116 * o - 16),
              (i = 500 * (a - o)),
              (n = 200 * (o - r)),
              [e, i, n]
            );
          }),
          (a.lab.xyz = function (t) {
            var e,
              i,
              n,
              a = t[0],
              o = t[1],
              r = t[2];
            (i = (a + 16) / 116), (e = o / 500 + i), (n = i - r / 200);
            var s = Math.pow(i, 3),
              l = Math.pow(e, 3),
              d = Math.pow(n, 3);
            return (
              (i = s > 0.008856 ? s : (i - 16 / 116) / 7.787),
              (e = l > 0.008856 ? l : (e - 16 / 116) / 7.787),
              (n = d > 0.008856 ? d : (n - 16 / 116) / 7.787),
              (e *= 95.047),
              (i *= 100),
              (n *= 108.883),
              [e, i, n]
            );
          }),
          (a.lab.lch = function (t) {
            var e,
              i,
              n,
              a = t[0],
              o = t[1],
              r = t[2];
            return (
              (e = Math.atan2(r, o)),
              (i = (360 * e) / 2 / Math.PI),
              i < 0 && (i += 360),
              (n = Math.sqrt(o * o + r * r)),
              [a, n, i]
            );
          }),
          (a.lch.lab = function (t) {
            var e,
              i,
              n,
              a = t[0],
              o = t[1],
              r = t[2];
            return (
              (n = (r / 360) * 2 * Math.PI),
              (e = o * Math.cos(n)),
              (i = o * Math.sin(n)),
              [a, e, i]
            );
          }),
          (a.rgb.ansi16 = function (t) {
            var e = t[0],
              i = t[1],
              n = t[2],
              o = 1 in arguments ? arguments[1] : a.rgb.hsv(t)[2];
            if (0 === (o = Math.round(o / 50))) return 30;
            var r =
              30 +
              ((Math.round(n / 255) << 2) |
                (Math.round(i / 255) << 1) |
                Math.round(e / 255));
            return 2 === o && (r += 60), r;
          }),
          (a.hsv.ansi16 = function (t) {
            return a.rgb.ansi16(a.hsv.rgb(t), t[2]);
          }),
          (a.rgb.ansi256 = function (t) {
            var e = t[0],
              i = t[1],
              n = t[2];
            return e === i && i === n
              ? e < 8
                ? 16
                : e > 248
                ? 231
                : Math.round(((e - 8) / 247) * 24) + 232
              : 16 +
                  36 * Math.round((e / 255) * 5) +
                  6 * Math.round((i / 255) * 5) +
                  Math.round((n / 255) * 5);
          }),
          (a.ansi16.rgb = function (t) {
            var e = t % 10;
            if (0 === e || 7 === e)
              return t > 50 && (e += 3.5), (e = (e / 10.5) * 255), [e, e, e];
            var i = 0.5 * (1 + ~~(t > 50));
            return [
              (1 & e) * i * 255,
              ((e >> 1) & 1) * i * 255,
              ((e >> 2) & 1) * i * 255,
            ];
          }),
          (a.ansi256.rgb = function (t) {
            if (t >= 232) {
              var e = 10 * (t - 232) + 8;
              return [e, e, e];
            }
            t -= 16;
            var i;
            return [
              (Math.floor(t / 36) / 5) * 255,
              (Math.floor((i = t % 36) / 6) / 5) * 255,
              ((i % 6) / 5) * 255,
            ];
          }),
          (a.rgb.hex = function (t) {
            var e =
                ((255 & Math.round(t[0])) << 16) +
                ((255 & Math.round(t[1])) << 8) +
                (255 & Math.round(t[2])),
              i = e.toString(16).toUpperCase();
            return "000000".substring(i.length) + i;
          }),
          (a.hex.rgb = function (t) {
            var e = t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
            if (!e) return [0, 0, 0];
            var i = e[0];
            3 === e[0].length &&
              (i = i
                .split("")
                .map(function (t) {
                  return t + t;
                })
                .join(""));
            var n = parseInt(i, 16);
            return [(n >> 16) & 255, (n >> 8) & 255, 255 & n];
          }),
          (a.rgb.hcg = function (t) {
            var e,
              i,
              n = t[0] / 255,
              a = t[1] / 255,
              o = t[2] / 255,
              r = Math.max(Math.max(n, a), o),
              s = Math.min(Math.min(n, a), o),
              l = r - s;
            return (
              (e = l < 1 ? s / (1 - l) : 0),
              (i =
                l <= 0
                  ? 0
                  : r === n
                  ? ((a - o) / l) % 6
                  : r === a
                  ? 2 + (o - n) / l
                  : 4 + (n - a) / l + 4),
              (i /= 6),
              (i %= 1),
              [360 * i, 100 * l, 100 * e]
            );
          }),
          (a.hsl.hcg = function (t) {
            var e = t[1] / 100,
              i = t[2] / 100,
              n = 1,
              a = 0;
            return (
              (n = i < 0.5 ? 2 * e * i : 2 * e * (1 - i)),
              n < 1 && (a = (i - 0.5 * n) / (1 - n)),
              [t[0], 100 * n, 100 * a]
            );
          }),
          (a.hsv.hcg = function (t) {
            var e = t[1] / 100,
              i = t[2] / 100,
              n = e * i,
              a = 0;
            return n < 1 && (a = (i - n) / (1 - n)), [t[0], 100 * n, 100 * a];
          }),
          (a.hcg.rgb = function (t) {
            var e = t[0] / 360,
              i = t[1] / 100,
              n = t[2] / 100;
            if (0 === i) return [255 * n, 255 * n, 255 * n];
            var a = [0, 0, 0],
              o = (e % 1) * 6,
              r = o % 1,
              s = 1 - r,
              l = 0;
            switch (Math.floor(o)) {
              case 0:
                (a[0] = 1), (a[1] = r), (a[2] = 0);
                break;
              case 1:
                (a[0] = s), (a[1] = 1), (a[2] = 0);
                break;
              case 2:
                (a[0] = 0), (a[1] = 1), (a[2] = r);
                break;
              case 3:
                (a[0] = 0), (a[1] = s), (a[2] = 1);
                break;
              case 4:
                (a[0] = r), (a[1] = 0), (a[2] = 1);
                break;
              default:
                (a[0] = 1), (a[1] = 0), (a[2] = s);
            }
            return (
              (l = (1 - i) * n),
              [255 * (i * a[0] + l), 255 * (i * a[1] + l), 255 * (i * a[2] + l)]
            );
          }),
          (a.hcg.hsv = function (t) {
            var e = t[1] / 100,
              i = t[2] / 100,
              n = e + i * (1 - e),
              a = 0;
            return n > 0 && (a = e / n), [t[0], 100 * a, 100 * n];
          }),
          (a.hcg.hsl = function (t) {
            var e = t[1] / 100,
              i = t[2] / 100,
              n = i * (1 - e) + 0.5 * e,
              a = 0;
            return (
              n > 0 && n < 0.5
                ? (a = e / (2 * n))
                : n >= 0.5 && n < 1 && (a = e / (2 * (1 - n))),
              [t[0], 100 * a, 100 * n]
            );
          }),
          (a.hcg.hwb = function (t) {
            var e = t[1] / 100,
              i = t[2] / 100,
              n = e + i * (1 - e);
            return [t[0], 100 * (n - e), 100 * (1 - n)];
          }),
          (a.hwb.hcg = function (t) {
            var e = t[1] / 100,
              i = t[2] / 100,
              n = 1 - i,
              a = n - e,
              o = 0;
            return a < 1 && (o = (n - a) / (1 - a)), [t[0], 100 * a, 100 * o];
          }),
          (a.apple.rgb = function (t) {
            return [
              (t[0] / 65535) * 255,
              (t[1] / 65535) * 255,
              (t[2] / 65535) * 255,
            ];
          }),
          (a.rgb.apple = function (t) {
            return [
              (t[0] / 255) * 65535,
              (t[1] / 255) * 65535,
              (t[2] / 255) * 65535,
            ];
          }),
          (a.gray.rgb = function (t) {
            return [(t[0] / 100) * 255, (t[0] / 100) * 255, (t[0] / 100) * 255];
          }),
          (a.gray.hsl = a.gray.hsv =
            function (t) {
              return [0, 0, t[0]];
            }),
          (a.gray.hwb = function (t) {
            return [0, 100, t[0]];
          }),
          (a.gray.cmyk = function (t) {
            return [0, 0, 0, t[0]];
          }),
          (a.gray.lab = function (t) {
            return [t[0], 0, 0];
          }),
          (a.gray.hex = function (t) {
            var e = 255 & Math.round((t[0] / 100) * 255),
              i = (e << 16) + (e << 8) + e,
              n = i.toString(16).toUpperCase();
            return "000000".substring(n.length) + n;
          }),
          (a.rgb.gray = function (t) {
            return [((t[0] + t[1] + t[2]) / 3 / 255) * 100];
          });
      }),
      Ye =
        ($e.rgb,
        $e.hsl,
        $e.hsv,
        $e.hwb,
        $e.cmyk,
        $e.xyz,
        $e.lab,
        $e.lch,
        $e.hex,
        $e.keyword,
        $e.ansi16,
        $e.ansi256,
        $e.hcg,
        $e.apple,
        $e.gray,
        function (t) {
          for (
            var e = i(t), n = {}, o = Object.keys(e), r = o.length, s = 0;
            s < r;
            s++
          ) {
            var l = o[s];
            null !== e[l].parent && (n[l] = a(l, e));
          }
          return n;
        }),
      Xe = {};
    Object.keys($e).forEach(function (t) {
      (Xe[t] = {}),
        Object.defineProperty(Xe[t], "channels", { value: $e[t].channels }),
        Object.defineProperty(Xe[t], "labels", { value: $e[t].labels });
      var e = Ye(t);
      Object.keys(e).forEach(function (i) {
        var n = e[i];
        (Xe[t][i] = r(n)), (Xe[t][i].raw = o(n));
      });
    });
    var Ge = Xe,
      Ke = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
      },
      Qe = {
        getRgba: s,
        getHsla: l,
        getRgb: h,
        getHsl: u,
        getHwb: d,
        getAlpha: c,
        hexString: f,
        rgbString: p,
        rgbaString: g,
        percentString: m,
        percentaString: v,
        hslString: b,
        hslaString: y,
        hwbString: x,
        keyword: _,
      },
      Ze = {};
    for (var Je in Ke) Ze[Ke[Je]] = Je;
    var ti = function (t) {
      if (t instanceof ti) return t;
      if (!(this instanceof ti)) return new ti(t);
      (this.valid = !1),
        (this.values = {
          rgb: [0, 0, 0],
          hsl: [0, 0, 0],
          hsv: [0, 0, 0],
          hwb: [0, 0, 0],
          cmyk: [0, 0, 0, 0],
          alpha: 1,
        });
      var e;
      "string" == typeof t
        ? ((e = Qe.getRgba(t)),
          e
            ? this.setValues("rgb", e)
            : (e = Qe.getHsla(t))
            ? this.setValues("hsl", e)
            : (e = Qe.getHwb(t)) && this.setValues("hwb", e))
        : "object" == typeof t &&
          ((e = t),
          void 0 !== e.r || void 0 !== e.red
            ? this.setValues("rgb", e)
            : void 0 !== e.l || void 0 !== e.lightness
            ? this.setValues("hsl", e)
            : void 0 !== e.v || void 0 !== e.value
            ? this.setValues("hsv", e)
            : void 0 !== e.w || void 0 !== e.whiteness
            ? this.setValues("hwb", e)
            : (void 0 === e.c && void 0 === e.cyan) ||
              this.setValues("cmyk", e));
    };
    (ti.prototype = {
      isValid: function () {
        return this.valid;
      },
      rgb: function () {
        return this.setSpace("rgb", arguments);
      },
      hsl: function () {
        return this.setSpace("hsl", arguments);
      },
      hsv: function () {
        return this.setSpace("hsv", arguments);
      },
      hwb: function () {
        return this.setSpace("hwb", arguments);
      },
      cmyk: function () {
        return this.setSpace("cmyk", arguments);
      },
      rgbArray: function () {
        return this.values.rgb;
      },
      hslArray: function () {
        return this.values.hsl;
      },
      hsvArray: function () {
        return this.values.hsv;
      },
      hwbArray: function () {
        var t = this.values;
        return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb;
      },
      cmykArray: function () {
        return this.values.cmyk;
      },
      rgbaArray: function () {
        var t = this.values;
        return t.rgb.concat([t.alpha]);
      },
      hslaArray: function () {
        var t = this.values;
        return t.hsl.concat([t.alpha]);
      },
      alpha: function (t) {
        return void 0 === t
          ? this.values.alpha
          : (this.setValues("alpha", t), this);
      },
      red: function (t) {
        return this.setChannel("rgb", 0, t);
      },
      green: function (t) {
        return this.setChannel("rgb", 1, t);
      },
      blue: function (t) {
        return this.setChannel("rgb", 2, t);
      },
      hue: function (t) {
        return (
          t && ((t %= 360), (t = t < 0 ? 360 + t : t)),
          this.setChannel("hsl", 0, t)
        );
      },
      saturation: function (t) {
        return this.setChannel("hsl", 1, t);
      },
      lightness: function (t) {
        return this.setChannel("hsl", 2, t);
      },
      saturationv: function (t) {
        return this.setChannel("hsv", 1, t);
      },
      whiteness: function (t) {
        return this.setChannel("hwb", 1, t);
      },
      blackness: function (t) {
        return this.setChannel("hwb", 2, t);
      },
      value: function (t) {
        return this.setChannel("hsv", 2, t);
      },
      cyan: function (t) {
        return this.setChannel("cmyk", 0, t);
      },
      magenta: function (t) {
        return this.setChannel("cmyk", 1, t);
      },
      yellow: function (t) {
        return this.setChannel("cmyk", 2, t);
      },
      black: function (t) {
        return this.setChannel("cmyk", 3, t);
      },
      hexString: function () {
        return Qe.hexString(this.values.rgb);
      },
      rgbString: function () {
        return Qe.rgbString(this.values.rgb, this.values.alpha);
      },
      rgbaString: function () {
        return Qe.rgbaString(this.values.rgb, this.values.alpha);
      },
      percentString: function () {
        return Qe.percentString(this.values.rgb, this.values.alpha);
      },
      hslString: function () {
        return Qe.hslString(this.values.hsl, this.values.alpha);
      },
      hslaString: function () {
        return Qe.hslaString(this.values.hsl, this.values.alpha);
      },
      hwbString: function () {
        return Qe.hwbString(this.values.hwb, this.values.alpha);
      },
      keyword: function () {
        return Qe.keyword(this.values.rgb, this.values.alpha);
      },
      rgbNumber: function () {
        var t = this.values.rgb;
        return (t[0] << 16) | (t[1] << 8) | t[2];
      },
      luminosity: function () {
        for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
          var n = t[i] / 255;
          e[i] = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
      },
      contrast: function (t) {
        var e = this.luminosity(),
          i = t.luminosity();
        return e > i ? (e + 0.05) / (i + 0.05) : (i + 0.05) / (e + 0.05);
      },
      level: function (t) {
        var e = this.contrast(t);
        return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : "";
      },
      dark: function () {
        var t = this.values.rgb;
        return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128;
      },
      light: function () {
        return !this.dark();
      },
      negate: function () {
        for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
        return this.setValues("rgb", t), this;
      },
      lighten: function (t) {
        var e = this.values.hsl;
        return (e[2] += e[2] * t), this.setValues("hsl", e), this;
      },
      darken: function (t) {
        var e = this.values.hsl;
        return (e[2] -= e[2] * t), this.setValues("hsl", e), this;
      },
      saturate: function (t) {
        var e = this.values.hsl;
        return (e[1] += e[1] * t), this.setValues("hsl", e), this;
      },
      desaturate: function (t) {
        var e = this.values.hsl;
        return (e[1] -= e[1] * t), this.setValues("hsl", e), this;
      },
      whiten: function (t) {
        var e = this.values.hwb;
        return (e[1] += e[1] * t), this.setValues("hwb", e), this;
      },
      blacken: function (t) {
        var e = this.values.hwb;
        return (e[2] += e[2] * t), this.setValues("hwb", e), this;
      },
      greyscale: function () {
        var t = this.values.rgb,
          e = 0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2];
        return this.setValues("rgb", [e, e, e]), this;
      },
      clearer: function (t) {
        var e = this.values.alpha;
        return this.setValues("alpha", e - e * t), this;
      },
      opaquer: function (t) {
        var e = this.values.alpha;
        return this.setValues("alpha", e + e * t), this;
      },
      rotate: function (t) {
        var e = this.values.hsl,
          i = (e[0] + t) % 360;
        return (e[0] = i < 0 ? 360 + i : i), this.setValues("hsl", e), this;
      },
      mix: function (t, e) {
        var i = this,
          n = t,
          a = void 0 === e ? 0.5 : e,
          o = 2 * a - 1,
          r = i.alpha() - n.alpha(),
          s = ((o * r == -1 ? o : (o + r) / (1 + o * r)) + 1) / 2,
          l = 1 - s;
        return this.rgb(
          s * i.red() + l * n.red(),
          s * i.green() + l * n.green(),
          s * i.blue() + l * n.blue()
        ).alpha(i.alpha() * a + n.alpha() * (1 - a));
      },
      toJSON: function () {
        return this.rgb();
      },
      clone: function () {
        var t,
          e,
          i = new ti(),
          n = this.values,
          a = i.values;
        for (var o in n)
          n.hasOwnProperty(o) &&
            ((t = n[o]),
            (e = {}.toString.call(t)),
            "[object Array]" === e
              ? (a[o] = t.slice(0))
              : "[object Number]" === e
              ? (a[o] = t)
              : console.error("unexpected color value:", t));
        return i;
      },
    }),
      (ti.prototype.spaces = {
        rgb: ["red", "green", "blue"],
        hsl: ["hue", "saturation", "lightness"],
        hsv: ["hue", "saturation", "value"],
        hwb: ["hue", "whiteness", "blackness"],
        cmyk: ["cyan", "magenta", "yellow", "black"],
      }),
      (ti.prototype.maxes = {
        rgb: [255, 255, 255],
        hsl: [360, 100, 100],
        hsv: [360, 100, 100],
        hwb: [360, 100, 100],
        cmyk: [100, 100, 100, 100],
      }),
      (ti.prototype.getValues = function (t) {
        for (var e = this.values, i = {}, n = 0; n < t.length; n++)
          i[t.charAt(n)] = e[t][n];
        return 1 !== e.alpha && (i.a = e.alpha), i;
      }),
      (ti.prototype.setValues = function (t, e) {
        var i,
          n = this.values,
          a = this.spaces,
          o = this.maxes,
          r = 1;
        if (((this.valid = !0), "alpha" === t)) r = e;
        else if (e.length) (n[t] = e.slice(0, t.length)), (r = e[t.length]);
        else if (void 0 !== e[t.charAt(0)]) {
          for (i = 0; i < t.length; i++) n[t][i] = e[t.charAt(i)];
          r = e.a;
        } else if (void 0 !== e[a[t][0]]) {
          var s = a[t];
          for (i = 0; i < t.length; i++) n[t][i] = e[s[i]];
          r = e.alpha;
        }
        if (
          ((n.alpha = Math.max(0, Math.min(1, void 0 === r ? n.alpha : r))),
          "alpha" === t)
        )
          return !1;
        var l;
        for (i = 0; i < t.length; i++)
          (l = Math.max(0, Math.min(o[t][i], n[t][i]))),
            (n[t][i] = Math.round(l));
        for (var d in a) d !== t && (n[d] = Ge[t][d](n[t]));
        return !0;
      }),
      (ti.prototype.setSpace = function (t, e) {
        var i = e[0];
        return void 0 === i
          ? this.getValues(t)
          : ("number" == typeof i && (i = Array.prototype.slice.call(e)),
            this.setValues(t, i),
            this);
      }),
      (ti.prototype.setChannel = function (t, e, i) {
        var n = this.values[t];
        return void 0 === i
          ? n[e]
          : i === n[e]
          ? this
          : ((n[e] = i), this.setValues(t, n), this);
      }),
      "undefined" != typeof window && (window.Color = ti);
    var ei = ti,
      ii = {
        noop: function () {},
        uid: (function () {
          var t = 0;
          return function () {
            return t++;
          };
        })(),
        isNullOrUndef: function (t) {
          return null === t || void 0 === t;
        },
        isArray: function (t) {
          if (Array.isArray && Array.isArray(t)) return !0;
          var e = Object.prototype.toString.call(t);
          return "[object" === e.substr(0, 7) && "Array]" === e.substr(-6);
        },
        isObject: function (t) {
          return (
            null !== t &&
            "[object Object]" === Object.prototype.toString.call(t)
          );
        },
        isFinite: function (t) {
          return ("number" == typeof t || t instanceof Number) && isFinite(t);
        },
        valueOrDefault: function (t, e) {
          return void 0 === t ? e : t;
        },
        valueAtIndexOrDefault: function (t, e, i) {
          return ii.valueOrDefault(ii.isArray(t) ? t[e] : t, i);
        },
        callback: function (t, e, i) {
          if (t && "function" == typeof t.call) return t.apply(i, e);
        },
        each: function (t, e, i, n) {
          var a, o, r;
          if (ii.isArray(t))
            if (((o = t.length), n))
              for (a = o - 1; a >= 0; a--) e.call(i, t[a], a);
            else for (a = 0; a < o; a++) e.call(i, t[a], a);
          else if (ii.isObject(t))
            for (r = Object.keys(t), o = r.length, a = 0; a < o; a++)
              e.call(i, t[r[a]], r[a]);
        },
        arrayEquals: function (t, e) {
          var i, n, a, o;
          if (!t || !e || t.length !== e.length) return !1;
          for (i = 0, n = t.length; i < n; ++i)
            if (
              ((a = t[i]), (o = e[i]), a instanceof Array && o instanceof Array)
            ) {
              if (!ii.arrayEquals(a, o)) return !1;
            } else if (a !== o) return !1;
          return !0;
        },
        clone: function (t) {
          if (ii.isArray(t)) return t.map(ii.clone);
          if (ii.isObject(t)) {
            for (
              var e = {}, i = Object.keys(t), n = i.length, a = 0;
              a < n;
              ++a
            )
              e[i[a]] = ii.clone(t[i[a]]);
            return e;
          }
          return t;
        },
        _merger: function (t, e, i, n) {
          var a = e[t],
            o = i[t];
          ii.isObject(a) && ii.isObject(o)
            ? ii.merge(a, o, n)
            : (e[t] = ii.clone(o));
        },
        _mergerIf: function (t, e, i) {
          var n = e[t],
            a = i[t];
          ii.isObject(n) && ii.isObject(a)
            ? ii.mergeIf(n, a)
            : e.hasOwnProperty(t) || (e[t] = ii.clone(a));
        },
        merge: function (t, e, i) {
          var n,
            a,
            o,
            r,
            s,
            l = ii.isArray(e) ? e : [e],
            d = l.length;
          if (!ii.isObject(t)) return t;
          for (i = i || {}, n = i.merger || ii._merger, a = 0; a < d; ++a)
            if (((e = l[a]), ii.isObject(e)))
              for (o = Object.keys(e), s = 0, r = o.length; s < r; ++s)
                n(o[s], t, e, i);
          return t;
        },
        mergeIf: function (t, e) {
          return ii.merge(t, e, { merger: ii._mergerIf });
        },
        extend:
          Object.assign ||
          function (t) {
            return ii.merge(t, [].slice.call(arguments, 1), {
              merger: function (t, e, i) {
                e[t] = i[t];
              },
            });
          },
        inherits: function (t) {
          var e = this,
            i =
              t && t.hasOwnProperty("constructor")
                ? t.constructor
                : function () {
                    return e.apply(this, arguments);
                  },
            n = function () {
              this.constructor = i;
            };
          return (
            (n.prototype = e.prototype),
            (i.prototype = new n()),
            (i.extend = ii.inherits),
            t && ii.extend(i.prototype, t),
            (i.__super__ = e.prototype),
            i
          );
        },
        _deprecated: function (t, e, i, n) {
          void 0 !== e &&
            console.warn(
              t + ': "' + i + '" is deprecated. Please use "' + n + '" instead'
            );
        },
      },
      ni = ii;
    (ii.callCallback = ii.callback),
      (ii.indexOf = function (t, e, i) {
        return Array.prototype.indexOf.call(t, e, i);
      }),
      (ii.getValueOrDefault = ii.valueOrDefault),
      (ii.getValueAtIndexOrDefault = ii.valueAtIndexOrDefault);
    var ai = {
        linear: function (t) {
          return t;
        },
        easeInQuad: function (t) {
          return t * t;
        },
        easeOutQuad: function (t) {
          return -t * (t - 2);
        },
        easeInOutQuad: function (t) {
          return (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
        },
        easeInCubic: function (t) {
          return t * t * t;
        },
        easeOutCubic: function (t) {
          return (t -= 1) * t * t + 1;
        },
        easeInOutCubic: function (t) {
          return (t /= 0.5) < 1
            ? 0.5 * t * t * t
            : 0.5 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function (t) {
          return t * t * t * t;
        },
        easeOutQuart: function (t) {
          return -((t -= 1) * t * t * t - 1);
        },
        easeInOutQuart: function (t) {
          return (t /= 0.5) < 1
            ? 0.5 * t * t * t * t
            : -0.5 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function (t) {
          return t * t * t * t * t;
        },
        easeOutQuint: function (t) {
          return (t -= 1) * t * t * t * t + 1;
        },
        easeInOutQuint: function (t) {
          return (t /= 0.5) < 1
            ? 0.5 * t * t * t * t * t
            : 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function (t) {
          return 1 - Math.cos(t * (Math.PI / 2));
        },
        easeOutSine: function (t) {
          return Math.sin(t * (Math.PI / 2));
        },
        easeInOutSine: function (t) {
          return -0.5 * (Math.cos(Math.PI * t) - 1);
        },
        easeInExpo: function (t) {
          return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
        },
        easeOutExpo: function (t) {
          return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        easeInOutExpo: function (t) {
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (t /= 0.5) < 1
            ? 0.5 * Math.pow(2, 10 * (t - 1))
            : 0.5 * (2 - Math.pow(2, -10 * --t));
        },
        easeInCirc: function (t) {
          return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1);
        },
        easeOutCirc: function (t) {
          return Math.sqrt(1 - (t -= 1) * t);
        },
        easeInOutCirc: function (t) {
          return (t /= 0.5) < 1
            ? -0.5 * (Math.sqrt(1 - t * t) - 1)
            : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function (t) {
          var e = 1.70158,
            i = 0,
            n = 1;
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (i || (i = 0.3),
              n < 1
                ? ((n = 1), (e = i / 4))
                : (e = (i / (2 * Math.PI)) * Math.asin(1 / n)),
              -n *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t - e) * (2 * Math.PI)) / i));
        },
        easeOutElastic: function (t) {
          var e = 1.70158,
            i = 0,
            n = 1;
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (i || (i = 0.3),
              n < 1
                ? ((n = 1), (e = i / 4))
                : (e = (i / (2 * Math.PI)) * Math.asin(1 / n)),
              n *
                Math.pow(2, -10 * t) *
                Math.sin(((t - e) * (2 * Math.PI)) / i) +
                1);
        },
        easeInOutElastic: function (t) {
          var e = 1.70158,
            i = 0,
            n = 1;
          return 0 === t
            ? 0
            : 2 == (t /= 0.5)
            ? 1
            : (i || (i = 0.45),
              n < 1
                ? ((n = 1), (e = i / 4))
                : (e = (i / (2 * Math.PI)) * Math.asin(1 / n)),
              t < 1
                ? n *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((t - e) * (2 * Math.PI)) / i) *
                  -0.5
                : n *
                    Math.pow(2, -10 * (t -= 1)) *
                    Math.sin(((t - e) * (2 * Math.PI)) / i) *
                    0.5 +
                  1);
        },
        easeInBack: function (t) {
          var e = 1.70158;
          return t * t * ((e + 1) * t - e);
        },
        easeOutBack: function (t) {
          var e = 1.70158;
          return (t -= 1) * t * ((e + 1) * t + e) + 1;
        },
        easeInOutBack: function (t) {
          var e = 1.70158;
          return (t /= 0.5) < 1
            ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
            : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
        },
        easeInBounce: function (t) {
          return 1 - ai.easeOutBounce(1 - t);
        },
        easeOutBounce: function (t) {
          return t < 1 / 2.75
            ? 7.5625 * t * t
            : t < 2 / 2.75
            ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
            : t < 2.5 / 2.75
            ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
            : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        },
        easeInOutBounce: function (t) {
          return t < 0.5
            ? 0.5 * ai.easeInBounce(2 * t)
            : 0.5 * ai.easeOutBounce(2 * t - 1) + 0.5;
        },
      },
      oi = { effects: ai };
    ni.easingEffects = ai;
    var ri = Math.PI,
      si = ri / 180,
      li = 2 * ri,
      di = ri / 2,
      hi = ri / 4,
      ui = (2 * ri) / 3,
      ci = {
        clear: function (t) {
          t.ctx.clearRect(0, 0, t.width, t.height);
        },
        roundedRect: function (t, e, i, n, a, o) {
          if (o) {
            var r = Math.min(o, a / 2, n / 2),
              s = e + r,
              l = i + r,
              d = e + n - r,
              h = i + a - r;
            t.moveTo(e, l),
              s < d && l < h
                ? (t.arc(s, l, r, -ri, -di),
                  t.arc(d, l, r, -di, 0),
                  t.arc(d, h, r, 0, di),
                  t.arc(s, h, r, di, ri))
                : s < d
                ? (t.moveTo(s, i),
                  t.arc(d, l, r, -di, di),
                  t.arc(s, l, r, di, ri + di))
                : l < h
                ? (t.arc(s, l, r, -ri, 0), t.arc(s, h, r, 0, ri))
                : t.arc(s, l, r, -ri, ri),
              t.closePath(),
              t.moveTo(e, i);
          } else t.rect(e, i, n, a);
        },
        drawPoint: function (t, e, i, n, a, o) {
          var r,
            s,
            l,
            d,
            h,
            u = (o || 0) * si;
          if (
            e &&
            "object" == typeof e &&
            ("[object HTMLImageElement]" === (r = e.toString()) ||
              "[object HTMLCanvasElement]" === r)
          )
            return (
              t.save(),
              t.translate(n, a),
              t.rotate(u),
              t.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height),
              void t.restore()
            );
          if (!(isNaN(i) || i <= 0)) {
            switch ((t.beginPath(), e)) {
              default:
                t.arc(n, a, i, 0, li), t.closePath();
                break;
              case "triangle":
                t.moveTo(n + Math.sin(u) * i, a - Math.cos(u) * i),
                  (u += ui),
                  t.lineTo(n + Math.sin(u) * i, a - Math.cos(u) * i),
                  (u += ui),
                  t.lineTo(n + Math.sin(u) * i, a - Math.cos(u) * i),
                  t.closePath();
                break;
              case "rectRounded":
                (h = 0.516 * i),
                  (d = i - h),
                  (s = Math.cos(u + hi) * d),
                  (l = Math.sin(u + hi) * d),
                  t.arc(n - s, a - l, h, u - ri, u - di),
                  t.arc(n + l, a - s, h, u - di, u),
                  t.arc(n + s, a + l, h, u, u + di),
                  t.arc(n - l, a + s, h, u + di, u + ri),
                  t.closePath();
                break;
              case "rect":
                if (!o) {
                  (d = Math.SQRT1_2 * i), t.rect(n - d, a - d, 2 * d, 2 * d);
                  break;
                }
                u += hi;
              case "rectRot":
                (s = Math.cos(u) * i),
                  (l = Math.sin(u) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + l, a - s),
                  t.lineTo(n + s, a + l),
                  t.lineTo(n - l, a + s),
                  t.closePath();
                break;
              case "crossRot":
                u += hi;
              case "cross":
                (s = Math.cos(u) * i),
                  (l = Math.sin(u) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + s, a + l),
                  t.moveTo(n + l, a - s),
                  t.lineTo(n - l, a + s);
                break;
              case "star":
                (s = Math.cos(u) * i),
                  (l = Math.sin(u) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + s, a + l),
                  t.moveTo(n + l, a - s),
                  t.lineTo(n - l, a + s),
                  (u += hi),
                  (s = Math.cos(u) * i),
                  (l = Math.sin(u) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + s, a + l),
                  t.moveTo(n + l, a - s),
                  t.lineTo(n - l, a + s);
                break;
              case "line":
                (s = Math.cos(u) * i),
                  (l = Math.sin(u) * i),
                  t.moveTo(n - s, a - l),
                  t.lineTo(n + s, a + l);
                break;
              case "dash":
                t.moveTo(n, a),
                  t.lineTo(n + Math.cos(u) * i, a + Math.sin(u) * i);
            }
            t.fill(), t.stroke();
          }
        },
        _isPointInArea: function (t, e) {
          return (
            t.x > e.left - 1e-6 &&
            t.x < e.right + 1e-6 &&
            t.y > e.top - 1e-6 &&
            t.y < e.bottom + 1e-6
          );
        },
        clipArea: function (t, e) {
          t.save(),
            t.beginPath(),
            t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top),
            t.clip();
        },
        unclipArea: function (t) {
          t.restore();
        },
        lineTo: function (t, e, i, n) {
          var a = i.steppedLine;
          if (a) {
            if ("middle" === a) {
              var o = (e.x + i.x) / 2;
              t.lineTo(o, n ? i.y : e.y), t.lineTo(o, n ? e.y : i.y);
            } else
              ("after" === a && !n) || ("after" !== a && n)
                ? t.lineTo(e.x, i.y)
                : t.lineTo(i.x, e.y);
            return void t.lineTo(i.x, i.y);
          }
          if (!i.tension) return void t.lineTo(i.x, i.y);
          t.bezierCurveTo(
            n ? e.controlPointPreviousX : e.controlPointNextX,
            n ? e.controlPointPreviousY : e.controlPointNextY,
            n ? i.controlPointNextX : i.controlPointPreviousX,
            n ? i.controlPointNextY : i.controlPointPreviousY,
            i.x,
            i.y
          );
        },
      },
      fi = ci;
    (ni.clear = ci.clear),
      (ni.drawRoundedRectangle = function (t) {
        t.beginPath(), ci.roundedRect.apply(ci, arguments);
      });
    var pi = {
      _set: function (t, e) {
        return ni.merge(this[t] || (this[t] = {}), e);
      },
    };
    pi._set("global", {
      defaultColor: "rgba(0,0,0,0.1)",
      defaultFontColor: "#666",
      defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      defaultFontSize: 12,
      defaultFontStyle: "normal",
      defaultLineHeight: 1.2,
      showLines: !0,
    });
    var gi = pi,
      mi = ni.valueOrDefault,
      vi = {
        toLineHeight: function (t, e) {
          var i = ("" + t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
          if (!i || "normal" === i[1]) return 1.2 * e;
          switch (((t = +i[2]), i[3])) {
            case "px":
              return t;
            case "%":
              t /= 100;
          }
          return e * t;
        },
        toPadding: function (t) {
          var e, i, n, a;
          return (
            ni.isObject(t)
              ? ((e = +t.top || 0),
                (i = +t.right || 0),
                (n = +t.bottom || 0),
                (a = +t.left || 0))
              : (e = i = n = a = +t || 0),
            {
              top: e,
              right: i,
              bottom: n,
              left: a,
              height: e + n,
              width: a + i,
            }
          );
        },
        _parseFont: function (t) {
          var e = gi.global,
            i = mi(t.fontSize, e.defaultFontSize),
            n = {
              family: mi(t.fontFamily, e.defaultFontFamily),
              lineHeight: ni.options.toLineHeight(
                mi(t.lineHeight, e.defaultLineHeight),
                i
              ),
              size: i,
              style: mi(t.fontStyle, e.defaultFontStyle),
              weight: null,
              string: "",
            };
          return (n.string = C(n)), n;
        },
        resolve: function (t, e, i, n) {
          var a,
            o,
            r,
            s = !0;
          for (a = 0, o = t.length; a < o; ++a)
            if (
              void 0 !== (r = t[a]) &&
              (void 0 !== e && "function" == typeof r && ((r = r(e)), (s = !1)),
              void 0 !== i && ni.isArray(r) && ((r = r[i]), (s = !1)),
              void 0 !== r)
            )
              return n && !s && (n.cacheable = !1), r;
        },
      },
      bi = {
        _factorize: function (t) {
          var e,
            i = [],
            n = Math.sqrt(t);
          for (e = 1; e < n; e++) t % e == 0 && (i.push(e), i.push(t / e));
          return (
            n === (0 | n) && i.push(n),
            i
              .sort(function (t, e) {
                return t - e;
              })
              .pop(),
            i
          );
        },
        log10:
          Math.log10 ||
          function (t) {
            var e = Math.log(t) * Math.LOG10E,
              i = Math.round(e);
            return t === Math.pow(10, i) ? i : e;
          },
      },
      yi = bi;
    ni.log10 = bi.log10;
    var xi = function (t, e) {
        return {
          x: function (i) {
            return t + t + e - i;
          },
          setWidth: function (t) {
            e = t;
          },
          textAlign: function (t) {
            return "center" === t ? t : "right" === t ? "left" : "right";
          },
          xPlus: function (t, e) {
            return t - e;
          },
          leftForLtr: function (t, e) {
            return t - e;
          },
        };
      },
      _i = function () {
        return {
          x: function (t) {
            return t;
          },
          setWidth: function (t) {},
          textAlign: function (t) {
            return t;
          },
          xPlus: function (t, e) {
            return t + e;
          },
          leftForLtr: function (t, e) {
            return t;
          },
        };
      },
      wi = function (t, e, i) {
        return t ? xi(e, i) : _i();
      },
      ki = function (t, e) {
        var i, n;
        ("ltr" !== e && "rtl" !== e) ||
          ((i = t.canvas.style),
          (n = [
            i.getPropertyValue("direction"),
            i.getPropertyPriority("direction"),
          ]),
          i.setProperty("direction", e, "important"),
          (t.prevTextDirection = n));
      },
      Ci = function (t) {
        var e = t.prevTextDirection;
        void 0 !== e &&
          (delete t.prevTextDirection,
          t.canvas.style.setProperty("direction", e[0], e[1]));
      },
      Mi = {
        getRtlAdapter: wi,
        overrideTextDirection: ki,
        restoreTextDirection: Ci,
      },
      Di = ni,
      Si = oi,
      Ti = fi,
      Fi = vi,
      Ai = yi,
      Pi = Mi;
    (Di.easing = Si),
      (Di.canvas = Ti),
      (Di.options = Fi),
      (Di.math = Ai),
      (Di.rtl = Pi);
    var Ii = function (t) {
      Di.extend(this, t), this.initialize.apply(this, arguments);
    };
    Di.extend(Ii.prototype, {
      _type: void 0,
      initialize: function () {
        this.hidden = !1;
      },
      pivot: function () {
        var t = this;
        return (
          t._view || (t._view = Di.extend({}, t._model)), (t._start = {}), t
        );
      },
      transition: function (t) {
        var e = this,
          i = e._model,
          n = e._start,
          a = e._view;
        return i && 1 !== t
          ? (a || (a = e._view = {}),
            n || (n = e._start = {}),
            M(n, a, i, t),
            e)
          : ((e._view = Di.extend({}, i)), (e._start = null), e);
      },
      tooltipPosition: function () {
        return { x: this._model.x, y: this._model.y };
      },
      hasValue: function () {
        return Di.isNumber(this._model.x) && Di.isNumber(this._model.y);
      },
    }),
      (Ii.extend = Di.inherits);
    var Ei = Ii,
      Oi = Ei.extend({
        chart: null,
        currentStep: 0,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null,
      }),
      Li = Oi;
    Object.defineProperty(Oi.prototype, "animationObject", {
      get: function () {
        return this;
      },
    }),
      Object.defineProperty(Oi.prototype, "chartInstance", {
        get: function () {
          return this.chart;
        },
        set: function (t) {
          this.chart = t;
        },
      }),
      gi._set("global", {
        animation: {
          duration: 1e3,
          easing: "easeOutQuart",
          onProgress: Di.noop,
          onComplete: Di.noop,
        },
      });
    var Ri = {
        animations: [],
        request: null,
        addAnimation: function (t, e, i, n) {
          var a,
            o,
            r = this.animations;
          for (
            e.chart = t,
              e.startTime = Date.now(),
              e.duration = i,
              n || (t.animating = !0),
              a = 0,
              o = r.length;
            a < o;
            ++a
          )
            if (r[a].chart === t) return void (r[a] = e);
          r.push(e), 1 === r.length && this.requestAnimationFrame();
        },
        cancelAnimation: function (t) {
          var e = Di.findIndex(this.animations, function (e) {
            return e.chart === t;
          });
          -1 !== e && (this.animations.splice(e, 1), (t.animating = !1));
        },
        requestAnimationFrame: function () {
          var t = this;
          null === t.request &&
            (t.request = Di.requestAnimFrame.call(window, function () {
              (t.request = null), t.startDigest();
            }));
        },
        startDigest: function () {
          var t = this;
          t.advance(), t.animations.length > 0 && t.requestAnimationFrame();
        },
        advance: function () {
          for (var t, e, i, n, a = this.animations, o = 0; o < a.length; )
            (t = a[o]),
              (e = t.chart),
              (i = t.numSteps),
              (n =
                Math.floor(((Date.now() - t.startTime) / t.duration) * i) + 1),
              (t.currentStep = Math.min(n, i)),
              Di.callback(t.render, [e, t], e),
              Di.callback(t.onAnimationProgress, [t], e),
              t.currentStep >= i
                ? (Di.callback(t.onAnimationComplete, [t], e),
                  (e.animating = !1),
                  a.splice(o, 1))
                : ++o;
        },
      },
      Vi = Di.options.resolve,
      Ni = ["push", "pop", "shift", "splice", "unshift"],
      Ui = function (t, e) {
        this.initialize(t, e);
      };
    Di.extend(Ui.prototype, {
      datasetElementType: null,
      dataElementType: null,
      _datasetElementOptions: [
        "backgroundColor",
        "borderCapStyle",
        "borderColor",
        "borderDash",
        "borderDashOffset",
        "borderJoinStyle",
        "borderWidth",
      ],
      _dataElementOptions: [
        "backgroundColor",
        "borderColor",
        "borderWidth",
        "pointStyle",
      ],
      initialize: function (t, e) {
        var i = this;
        (i.chart = t),
          (i.index = e),
          i.linkScales(),
          i.addElements(),
          (i._type = i.getMeta().type);
      },
      updateIndex: function (t) {
        this.index = t;
      },
      linkScales: function () {
        var t = this,
          e = t.getMeta(),
          i = t.chart,
          n = i.scales,
          a = t.getDataset(),
          o = i.options.scales;
        (null !== e.xAxisID && e.xAxisID in n && !a.xAxisID) ||
          (e.xAxisID = a.xAxisID || o.xAxes[0].id),
          (null !== e.yAxisID && e.yAxisID in n && !a.yAxisID) ||
            (e.yAxisID = a.yAxisID || o.yAxes[0].id);
      },
      getDataset: function () {
        return this.chart.data.datasets[this.index];
      },
      getMeta: function () {
        return this.chart.getDatasetMeta(this.index);
      },
      getScaleForId: function (t) {
        return this.chart.scales[t];
      },
      _getValueScaleId: function () {
        return this.getMeta().yAxisID;
      },
      _getIndexScaleId: function () {
        return this.getMeta().xAxisID;
      },
      _getValueScale: function () {
        return this.getScaleForId(this._getValueScaleId());
      },
      _getIndexScale: function () {
        return this.getScaleForId(this._getIndexScaleId());
      },
      reset: function () {
        this._update(!0);
      },
      destroy: function () {
        this._data && S(this._data, this);
      },
      createMetaDataset: function () {
        var t = this,
          e = t.datasetElementType;
        return e && new e({ _chart: t.chart, _datasetIndex: t.index });
      },
      createMetaData: function (t) {
        var e = this,
          i = e.dataElementType;
        return (
          i && new i({ _chart: e.chart, _datasetIndex: e.index, _index: t })
        );
      },
      addElements: function () {
        var t,
          e,
          i = this,
          n = i.getMeta(),
          a = i.getDataset().data || [],
          o = n.data;
        for (t = 0, e = a.length; t < e; ++t)
          o[t] = o[t] || i.createMetaData(t);
        n.dataset = n.dataset || i.createMetaDataset();
      },
      addElementAndReset: function (t) {
        var e = this.createMetaData(t);
        this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0);
      },
      buildOrUpdateElements: function () {
        var t = this,
          e = t.getDataset(),
          i = e.data || (e.data = []);
        t._data !== i &&
          (t._data && S(t._data, t),
          i && Object.isExtensible(i) && D(i, t),
          (t._data = i)),
          t.resyncElements();
      },
      _configure: function () {
        var t = this;
        t._config = Di.merge(
          {},
          [t.chart.options.datasets[t._type], t.getDataset()],
          {
            merger: function (t, e, i) {
              "_meta" !== t && "data" !== t && Di._merger(t, e, i);
            },
          }
        );
      },
      _update: function (t) {
        var e = this;
        e._configure(), (e._cachedDataOpts = null), e.update(t);
      },
      update: Di.noop,
      transition: function (t) {
        for (
          var e = this.getMeta(), i = e.data || [], n = i.length, a = 0;
          a < n;
          ++a
        )
          i[a].transition(t);
        e.dataset && e.dataset.transition(t);
      },
      draw: function () {
        var t = this.getMeta(),
          e = t.data || [],
          i = e.length,
          n = 0;
        for (t.dataset && t.dataset.draw(); n < i; ++n) e[n].draw();
      },
      getStyle: function (t) {
        var e,
          i = this,
          n = i.getMeta(),
          a = n.dataset;
        return (
          i._configure(),
          a && void 0 === t
            ? (e = i._resolveDatasetElementOptions(a || {}))
            : ((t = t || 0),
              (e = i._resolveDataElementOptions(n.data[t] || {}, t))),
          (!1 !== e.fill && null !== e.fill) ||
            (e.backgroundColor = e.borderColor),
          e
        );
      },
      _resolveDatasetElementOptions: function (t, e) {
        var i,
          n,
          a,
          o,
          r = this,
          s = r.chart,
          l = r._config,
          d = t.custom || {},
          h = s.options.elements[r.datasetElementType.prototype._type] || {},
          u = r._datasetElementOptions,
          c = {},
          f = {
            chart: s,
            dataset: r.getDataset(),
            datasetIndex: r.index,
            hover: e,
          };
        for (i = 0, n = u.length; i < n; ++i)
          (a = u[i]),
            (o = e ? "hover" + a.charAt(0).toUpperCase() + a.slice(1) : a),
            (c[a] = Vi([d[o], l[o], h[o]], f));
        return c;
      },
      _resolveDataElementOptions: function (t, e) {
        var i = this,
          n = t && t.custom,
          a = i._cachedDataOpts;
        if (a && !n) return a;
        var o,
          r,
          s,
          l,
          d = i.chart,
          h = i._config,
          u = d.options.elements[i.dataElementType.prototype._type] || {},
          c = i._dataElementOptions,
          f = {},
          p = {
            chart: d,
            dataIndex: e,
            dataset: i.getDataset(),
            datasetIndex: i.index,
          },
          g = { cacheable: !n };
        if (((n = n || {}), Di.isArray(c)))
          for (r = 0, s = c.length; r < s; ++r)
            (l = c[r]), (f[l] = Vi([n[l], h[l], u[l]], p, e, g));
        else
          for (o = Object.keys(c), r = 0, s = o.length; r < s; ++r)
            (l = o[r]), (f[l] = Vi([n[l], h[c[l]], h[l], u[l]], p, e, g));
        return g.cacheable && (i._cachedDataOpts = Object.freeze(f)), f;
      },
      removeHoverStyle: function (t) {
        Di.merge(t._model, t.$previousStyle || {}), delete t.$previousStyle;
      },
      setHoverStyle: function (t) {
        var e = this.chart.data.datasets[t._datasetIndex],
          i = t._index,
          n = t.custom || {},
          a = t._model,
          o = Di.getHoverColor;
        (t.$previousStyle = {
          backgroundColor: a.backgroundColor,
          borderColor: a.borderColor,
          borderWidth: a.borderWidth,
        }),
          (a.backgroundColor = Vi(
            [
              n.hoverBackgroundColor,
              e.hoverBackgroundColor,
              o(a.backgroundColor),
            ],
            void 0,
            i
          )),
          (a.borderColor = Vi(
            [n.hoverBorderColor, e.hoverBorderColor, o(a.borderColor)],
            void 0,
            i
          )),
          (a.borderWidth = Vi(
            [n.hoverBorderWidth, e.hoverBorderWidth, a.borderWidth],
            void 0,
            i
          ));
      },
      _removeDatasetHoverStyle: function () {
        var t = this.getMeta().dataset;
        t && this.removeHoverStyle(t);
      },
      _setDatasetHoverStyle: function () {
        var t,
          e,
          i,
          n,
          a,
          o,
          r = this.getMeta().dataset,
          s = {};
        if (r) {
          for (
            o = r._model,
              a = this._resolveDatasetElementOptions(r, !0),
              n = Object.keys(a),
              t = 0,
              e = n.length;
            t < e;
            ++t
          )
            (i = n[t]), (s[i] = o[i]), (o[i] = a[i]);
          r.$previousStyle = s;
        }
      },
      resyncElements: function () {
        var t = this,
          e = t.getMeta(),
          i = t.getDataset().data,
          n = e.data.length,
          a = i.length;
        a < n ? e.data.splice(a, n - a) : a > n && t.insertElements(n, a - n);
      },
      insertElements: function (t, e) {
        for (var i = 0; i < e; ++i) this.addElementAndReset(t + i);
      },
      onDataPush: function () {
        var t = arguments.length;
        this.insertElements(this.getDataset().data.length - t, t);
      },
      onDataPop: function () {
        this.getMeta().data.pop();
      },
      onDataShift: function () {
        this.getMeta().data.shift();
      },
      onDataSplice: function (t, e) {
        this.getMeta().data.splice(t, e),
          this.insertElements(t, arguments.length - 2);
      },
      onDataUnshift: function () {
        this.insertElements(0, arguments.length);
      },
    }),
      (Ui.extend = Di.inherits);
    var zi = Ui,
      Bi = 2 * Math.PI;
    gi._set("global", {
      elements: {
        arc: {
          backgroundColor: gi.global.defaultColor,
          borderColor: "#fff",
          borderWidth: 2,
          borderAlign: "center",
        },
      },
    });
    var Wi = Ei.extend({
        _type: "arc",
        inLabelRange: function (t) {
          var e = this._view;
          return (
            !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
          );
        },
        inRange: function (t, e) {
          var i = this._view;
          if (i) {
            for (
              var n = Di.getAngleFromPoint(i, { x: t, y: e }),
                a = n.angle,
                o = n.distance,
                r = i.startAngle,
                s = i.endAngle;
              s < r;

            )
              s += Bi;
            for (; a > s; ) a -= Bi;
            for (; a < r; ) a += Bi;
            var l = a >= r && a <= s,
              d = o >= i.innerRadius && o <= i.outerRadius;
            return l && d;
          }
          return !1;
        },
        getCenterPoint: function () {
          var t = this._view,
            e = (t.startAngle + t.endAngle) / 2,
            i = (t.innerRadius + t.outerRadius) / 2;
          return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i };
        },
        getArea: function () {
          var t = this._view;
          return (
            Math.PI *
            ((t.endAngle - t.startAngle) / (2 * Math.PI)) *
            (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
          );
        },
        tooltipPosition: function () {
          var t = this._view,
            e = t.startAngle + (t.endAngle - t.startAngle) / 2,
            i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
          return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i };
        },
        draw: function () {
          var t,
            e = this._chart.ctx,
            i = this._view,
            n = "inner" === i.borderAlign ? 0.33 : 0,
            a = {
              x: i.x,
              y: i.y,
              innerRadius: i.innerRadius,
              outerRadius: Math.max(i.outerRadius - n, 0),
              pixelMargin: n,
              startAngle: i.startAngle,
              endAngle: i.endAngle,
              fullCircles: Math.floor(i.circumference / Bi),
            };
          if (
            (e.save(),
            (e.fillStyle = i.backgroundColor),
            (e.strokeStyle = i.borderColor),
            a.fullCircles)
          ) {
            for (
              a.endAngle = a.startAngle + Bi,
                e.beginPath(),
                e.arc(a.x, a.y, a.outerRadius, a.startAngle, a.endAngle),
                e.arc(a.x, a.y, a.innerRadius, a.endAngle, a.startAngle, !0),
                e.closePath(),
                t = 0;
              t < a.fullCircles;
              ++t
            )
              e.fill();
            a.endAngle = a.startAngle + (i.circumference % Bi);
          }
          e.beginPath(),
            e.arc(a.x, a.y, a.outerRadius, a.startAngle, a.endAngle),
            e.arc(a.x, a.y, a.innerRadius, a.endAngle, a.startAngle, !0),
            e.closePath(),
            e.fill(),
            i.borderWidth && A(e, i, a),
            e.restore();
        },
      }),
      Hi = Di.valueOrDefault,
      ji = gi.global.defaultColor;
    gi._set("global", {
      elements: {
        line: {
          tension: 0.4,
          backgroundColor: ji,
          borderWidth: 3,
          borderColor: ji,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          capBezierPoints: !0,
          fill: !0,
        },
      },
    });
    var qi = Ei.extend({
        _type: "line",
        draw: function () {
          var t,
            e,
            i,
            n = this,
            a = n._view,
            o = n._chart.ctx,
            r = a.spanGaps,
            s = n._children.slice(),
            l = gi.global,
            d = l.elements.line,
            h = -1,
            u = n._loop;
          if (s.length) {
            if (n._loop) {
              for (t = 0; t < s.length; ++t)
                if (
                  ((e = Di.previousItem(s, t)),
                  !s[t]._view.skip && e._view.skip)
                ) {
                  (s = s.slice(t).concat(s.slice(0, t))), (u = r);
                  break;
                }
              u && s.push(s[0]);
            }
            for (
              o.save(),
                o.lineCap = a.borderCapStyle || d.borderCapStyle,
                o.setLineDash && o.setLineDash(a.borderDash || d.borderDash),
                o.lineDashOffset = Hi(a.borderDashOffset, d.borderDashOffset),
                o.lineJoin = a.borderJoinStyle || d.borderJoinStyle,
                o.lineWidth = Hi(a.borderWidth, d.borderWidth),
                o.strokeStyle = a.borderColor || l.defaultColor,
                o.beginPath(),
                i = s[0]._view,
                i.skip || (o.moveTo(i.x, i.y), (h = 0)),
                t = 1;
              t < s.length;
              ++t
            )
              (i = s[t]._view),
                (e = -1 === h ? Di.previousItem(s, t) : s[h]),
                i.skip ||
                  ((h !== t - 1 && !r) || -1 === h
                    ? o.moveTo(i.x, i.y)
                    : Di.canvas.lineTo(o, e._view, i),
                  (h = t));
            u && o.closePath(), o.stroke(), o.restore();
          }
        },
      }),
      $i = Di.valueOrDefault,
      Yi = gi.global.defaultColor;
    gi._set("global", {
      elements: {
        point: {
          radius: 3,
          pointStyle: "circle",
          backgroundColor: Yi,
          borderColor: Yi,
          borderWidth: 1,
          hitRadius: 1,
          hoverRadius: 4,
          hoverBorderWidth: 1,
        },
      },
    });
    var Xi = Ei.extend({
        _type: "point",
        inRange: function (t, e) {
          var i = this._view;
          return (
            !!i &&
            Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) <
              Math.pow(i.hitRadius + i.radius, 2)
          );
        },
        inLabelRange: P,
        inXRange: P,
        inYRange: I,
        getCenterPoint: function () {
          var t = this._view;
          return { x: t.x, y: t.y };
        },
        getArea: function () {
          return Math.PI * Math.pow(this._view.radius, 2);
        },
        tooltipPosition: function () {
          var t = this._view;
          return { x: t.x, y: t.y, padding: t.radius + t.borderWidth };
        },
        draw: function (t) {
          var e = this._view,
            i = this._chart.ctx,
            n = e.pointStyle,
            a = e.rotation,
            o = e.radius,
            r = e.x,
            s = e.y,
            l = gi.global,
            d = l.defaultColor;
          e.skip ||
            ((void 0 === t || Di.canvas._isPointInArea(e, t)) &&
              ((i.strokeStyle = e.borderColor || d),
              (i.lineWidth = $i(e.borderWidth, l.elements.point.borderWidth)),
              (i.fillStyle = e.backgroundColor || d),
              Di.canvas.drawPoint(i, n, o, r, s, a)));
        },
      }),
      Gi = gi.global.defaultColor;
    gi._set("global", {
      elements: {
        rectangle: {
          backgroundColor: Gi,
          borderColor: Gi,
          borderSkipped: "bottom",
          borderWidth: 0,
        },
      },
    });
    var Ki = Ei.extend({
        _type: "rectangle",
        draw: function () {
          var t = this._chart.ctx,
            e = this._view,
            i = N(e),
            n = i.outer,
            a = i.inner;
          (t.fillStyle = e.backgroundColor),
            t.fillRect(n.x, n.y, n.w, n.h),
            (n.w === a.w && n.h === a.h) ||
              (t.save(),
              t.beginPath(),
              t.rect(n.x, n.y, n.w, n.h),
              t.clip(),
              (t.fillStyle = e.borderColor),
              t.rect(a.x, a.y, a.w, a.h),
              t.fill("evenodd"),
              t.restore());
        },
        height: function () {
          var t = this._view;
          return t.base - t.y;
        },
        inRange: function (t, e) {
          return U(this._view, t, e);
        },
        inLabelRange: function (t, e) {
          var i = this._view;
          return E(i) ? U(i, t, null) : U(i, null, e);
        },
        inXRange: function (t) {
          return U(this._view, t, null);
        },
        inYRange: function (t) {
          return U(this._view, null, t);
        },
        getCenterPoint: function () {
          var t,
            e,
            i = this._view;
          return (
            E(i)
              ? ((t = i.x), (e = (i.y + i.base) / 2))
              : ((t = (i.x + i.base) / 2), (e = i.y)),
            { x: t, y: e }
          );
        },
        getArea: function () {
          var t = this._view;
          return E(t)
            ? t.width * Math.abs(t.y - t.base)
            : t.height * Math.abs(t.x - t.base);
        },
        tooltipPosition: function () {
          var t = this._view;
          return { x: t.x, y: t.y };
        },
      }),
      Qi = {},
      Zi = Wi,
      Ji = qi,
      tn = Xi,
      en = Ki;
    (Qi.Arc = Zi), (Qi.Line = Ji), (Qi.Point = tn), (Qi.Rectangle = en);
    var nn = Di._deprecated,
      an = Di.valueOrDefault;
    gi._set("bar", {
      hover: { mode: "label" },
      scales: {
        xAxes: [
          { type: "category", offset: !0, gridLines: { offsetGridLines: !0 } },
        ],
        yAxes: [{ type: "linear" }],
      },
    }),
      gi._set("global", {
        datasets: { bar: { categoryPercentage: 0.8, barPercentage: 0.9 } },
      });
    var on = zi.extend({
        dataElementType: Qi.Rectangle,
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderSkipped",
          "borderWidth",
          "barPercentage",
          "barThickness",
          "categoryPercentage",
          "maxBarThickness",
          "minBarLength",
        ],
        initialize: function () {
          var t,
            e,
            i = this;
          zi.prototype.initialize.apply(i, arguments),
            (t = i.getMeta()),
            (t.stack = i.getDataset().stack),
            (t.bar = !0),
            (e = i._getIndexScale().options),
            nn(
              "bar chart",
              e.barPercentage,
              "scales.[x/y]Axes.barPercentage",
              "dataset.barPercentage"
            ),
            nn(
              "bar chart",
              e.barThickness,
              "scales.[x/y]Axes.barThickness",
              "dataset.barThickness"
            ),
            nn(
              "bar chart",
              e.categoryPercentage,
              "scales.[x/y]Axes.categoryPercentage",
              "dataset.categoryPercentage"
            ),
            nn(
              "bar chart",
              i._getValueScale().options.minBarLength,
              "scales.[x/y]Axes.minBarLength",
              "dataset.minBarLength"
            ),
            nn(
              "bar chart",
              e.maxBarThickness,
              "scales.[x/y]Axes.maxBarThickness",
              "dataset.maxBarThickness"
            );
        },
        update: function (t) {
          var e,
            i,
            n = this,
            a = n.getMeta().data;
          for (n._ruler = n.getRuler(), e = 0, i = a.length; e < i; ++e)
            n.updateElement(a[e], e, t);
        },
        updateElement: function (t, e, i) {
          var n = this,
            a = n.getMeta(),
            o = n.getDataset(),
            r = n._resolveDataElementOptions(t, e);
          (t._xScale = n.getScaleForId(a.xAxisID)),
            (t._yScale = n.getScaleForId(a.yAxisID)),
            (t._datasetIndex = n.index),
            (t._index = e),
            (t._model = {
              backgroundColor: r.backgroundColor,
              borderColor: r.borderColor,
              borderSkipped: r.borderSkipped,
              borderWidth: r.borderWidth,
              datasetLabel: o.label,
              label: n.chart.data.labels[e],
            }),
            Di.isArray(o.data[e]) && (t._model.borderSkipped = null),
            n._updateElementGeometry(t, e, i, r),
            t.pivot();
        },
        _updateElementGeometry: function (t, e, i, n) {
          var a = this,
            o = t._model,
            r = a._getValueScale(),
            s = r.getBasePixel(),
            l = r.isHorizontal(),
            d = a._ruler || a.getRuler(),
            h = a.calculateBarValuePixels(a.index, e, n),
            u = a.calculateBarIndexPixels(a.index, e, d, n);
          (o.horizontal = l),
            (o.base = i ? s : h.base),
            (o.x = l ? (i ? s : h.head) : u.center),
            (o.y = l ? u.center : i ? s : h.head),
            (o.height = l ? u.size : void 0),
            (o.width = l ? void 0 : u.size);
        },
        _getStacks: function (t) {
          var e,
            i,
            n = this,
            a = n._getIndexScale(),
            o = a._getMatchingVisibleMetas(n._type),
            r = a.options.stacked,
            s = o.length,
            l = [];
          for (
            e = 0;
            e < s &&
            ((i = o[e]),
            (!1 === r ||
              -1 === l.indexOf(i.stack) ||
              (void 0 === r && void 0 === i.stack)) &&
              l.push(i.stack),
            i.index !== t);
            ++e
          );
          return l;
        },
        getStackCount: function () {
          return this._getStacks().length;
        },
        getStackIndex: function (t, e) {
          var i = this._getStacks(t),
            n = void 0 !== e ? i.indexOf(e) : -1;
          return -1 === n ? i.length - 1 : n;
        },
        getRuler: function () {
          var t,
            e,
            i = this,
            n = i._getIndexScale(),
            a = [];
          for (t = 0, e = i.getMeta().data.length; t < e; ++t)
            a.push(n.getPixelForValue(null, t, i.index));
          return {
            pixels: a,
            start: n._startPixel,
            end: n._endPixel,
            stackCount: i.getStackCount(),
            scale: n,
          };
        },
        calculateBarValuePixels: function (t, e, i) {
          var n,
            a,
            o,
            r,
            s,
            l,
            d,
            h = this,
            u = h.chart,
            c = h._getValueScale(),
            f = c.isHorizontal(),
            p = u.data.datasets,
            g = c._getMatchingVisibleMetas(h._type),
            m = c._parseValue(p[t].data[e]),
            v = i.minBarLength,
            b = c.options.stacked,
            y = h.getMeta().stack,
            x =
              void 0 === m.start ? 0 : m.max >= 0 && m.min >= 0 ? m.min : m.max,
            _ =
              void 0 === m.start
                ? m.end
                : m.max >= 0 && m.min >= 0
                ? m.max - m.min
                : m.min - m.max,
            w = g.length;
          if (b || (void 0 === b && void 0 !== y))
            for (n = 0; n < w && ((a = g[n]), a.index !== t); ++n)
              a.stack === y &&
                ((d = c._parseValue(p[a.index].data[e])),
                (o =
                  void 0 === d.start
                    ? d.end
                    : d.min >= 0 && d.max >= 0
                    ? d.max
                    : d.min),
                ((m.min < 0 && o < 0) || (m.max >= 0 && o > 0)) && (x += o));
          return (
            (r = c.getPixelForValue(x)),
            (s = c.getPixelForValue(x + _)),
            (l = s - r),
            void 0 !== v &&
              Math.abs(l) < v &&
              ((l = v), (s = (_ >= 0 && !f) || (_ < 0 && f) ? r - v : r + v)),
            { size: l, base: r, head: s, center: s + l / 2 }
          );
        },
        calculateBarIndexPixels: function (t, e, i, n) {
          var a = this,
            o = "flex" === n.barThickness ? W(e, i, n) : B(e, i, n),
            r = a.getStackIndex(t, a.getMeta().stack),
            s = o.start + o.chunk * r + o.chunk / 2,
            l = Math.min(an(n.maxBarThickness, 1 / 0), o.chunk * o.ratio);
          return { base: s - l / 2, head: s + l / 2, center: s, size: l };
        },
        draw: function () {
          var t = this,
            e = t.chart,
            i = t._getValueScale(),
            n = t.getMeta().data,
            a = t.getDataset(),
            o = n.length,
            r = 0;
          for (Di.canvas.clipArea(e.ctx, e.chartArea); r < o; ++r) {
            var s = i._parseValue(a.data[r]);
            isNaN(s.min) || isNaN(s.max) || n[r].draw();
          }
          Di.canvas.unclipArea(e.ctx);
        },
        _resolveDataElementOptions: function () {
          var t = this,
            e = Di.extend(
              {},
              zi.prototype._resolveDataElementOptions.apply(t, arguments)
            ),
            i = t._getIndexScale().options,
            n = t._getValueScale().options;
          return (
            (e.barPercentage = an(i.barPercentage, e.barPercentage)),
            (e.barThickness = an(i.barThickness, e.barThickness)),
            (e.categoryPercentage = an(
              i.categoryPercentage,
              e.categoryPercentage
            )),
            (e.maxBarThickness = an(i.maxBarThickness, e.maxBarThickness)),
            (e.minBarLength = an(n.minBarLength, e.minBarLength)),
            e
          );
        },
      }),
      rn = Di.valueOrDefault,
      sn = Di.options.resolve;
    gi._set("bubble", {
      hover: { mode: "single" },
      scales: {
        xAxes: [{ type: "linear", position: "bottom", id: "x-axis-0" }],
        yAxes: [{ type: "linear", position: "left", id: "y-axis-0" }],
      },
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (t, e) {
            var i = e.datasets[t.datasetIndex].label || "",
              n = e.datasets[t.datasetIndex].data[t.index];
            return i + ": (" + t.xLabel + ", " + t.yLabel + ", " + n.r + ")";
          },
        },
      },
    });
    var ln = zi.extend({
        dataElementType: Qi.Point,
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "hoverBackgroundColor",
          "hoverBorderColor",
          "hoverBorderWidth",
          "hoverRadius",
          "hitRadius",
          "pointStyle",
          "rotation",
        ],
        update: function (t) {
          var e = this,
            i = e.getMeta(),
            n = i.data;
          Di.each(n, function (i, n) {
            e.updateElement(i, n, t);
          });
        },
        updateElement: function (t, e, i) {
          var n = this,
            a = n.getMeta(),
            o = t.custom || {},
            r = n.getScaleForId(a.xAxisID),
            s = n.getScaleForId(a.yAxisID),
            l = n._resolveDataElementOptions(t, e),
            d = n.getDataset().data[e],
            h = n.index,
            u = i
              ? r.getPixelForDecimal(0.5)
              : r.getPixelForValue("object" == typeof d ? d : NaN, e, h),
            c = i ? s.getBasePixel() : s.getPixelForValue(d, e, h);
          (t._xScale = r),
            (t._yScale = s),
            (t._options = l),
            (t._datasetIndex = h),
            (t._index = e),
            (t._model = {
              backgroundColor: l.backgroundColor,
              borderColor: l.borderColor,
              borderWidth: l.borderWidth,
              hitRadius: l.hitRadius,
              pointStyle: l.pointStyle,
              rotation: l.rotation,
              radius: i ? 0 : l.radius,
              skip: o.skip || isNaN(u) || isNaN(c),
              x: u,
              y: c,
            }),
            t.pivot();
        },
        setHoverStyle: function (t) {
          var e = t._model,
            i = t._options,
            n = Di.getHoverColor;
          (t.$previousStyle = {
            backgroundColor: e.backgroundColor,
            borderColor: e.borderColor,
            borderWidth: e.borderWidth,
            radius: e.radius,
          }),
            (e.backgroundColor = rn(
              i.hoverBackgroundColor,
              n(i.backgroundColor)
            )),
            (e.borderColor = rn(i.hoverBorderColor, n(i.borderColor))),
            (e.borderWidth = rn(i.hoverBorderWidth, i.borderWidth)),
            (e.radius = i.radius + i.hoverRadius);
        },
        _resolveDataElementOptions: function (t, e) {
          var i = this,
            n = i.chart,
            a = i.getDataset(),
            o = t.custom || {},
            r = a.data[e] || {},
            s = zi.prototype._resolveDataElementOptions.apply(i, arguments),
            l = { chart: n, dataIndex: e, dataset: a, datasetIndex: i.index };
          return (
            i._cachedDataOpts === s && (s = Di.extend({}, s)),
            (s.radius = sn(
              [
                o.radius,
                r.r,
                i._config.radius,
                n.options.elements.point.radius,
              ],
              l,
              e
            )),
            s
          );
        },
      }),
      dn = Di.valueOrDefault,
      hn = Math.PI,
      un = 2 * hn,
      cn = hn / 2;
    gi._set("doughnut", {
      animation: { animateRotate: !0, animateScale: !1 },
      hover: { mode: "single" },
      legendCallback: function (t) {
        var e,
          i,
          n,
          a,
          o = document.createElement("ul"),
          r = t.data,
          s = r.datasets,
          l = r.labels;
        if ((o.setAttribute("class", t.id + "-legend"), s.length))
          for (e = 0, i = s[0].data.length; e < i; ++e)
            (n = o.appendChild(document.createElement("li"))),
              (a = n.appendChild(document.createElement("span"))),
              (a.style.backgroundColor = s[0].backgroundColor[e]),
              l[e] && n.appendChild(document.createTextNode(l[e]));
        return o.outerHTML;
      },
      legend: {
        labels: {
          generateLabels: function (t) {
            var e = t.data;
            return e.labels.length && e.datasets.length
              ? e.labels.map(function (i, n) {
                  var a = t.getDatasetMeta(0),
                    o = a.controller.getStyle(n);
                  return {
                    text: i,
                    fillStyle: o.backgroundColor,
                    strokeStyle: o.borderColor,
                    lineWidth: o.borderWidth,
                    hidden: isNaN(e.datasets[0].data[n]) || a.data[n].hidden,
                    index: n,
                  };
                })
              : [];
          },
        },
        onClick: function (t, e) {
          var i,
            n,
            a,
            o = e.index,
            r = this.chart;
          for (i = 0, n = (r.data.datasets || []).length; i < n; ++i)
            (a = r.getDatasetMeta(i)),
              a.data[o] && (a.data[o].hidden = !a.data[o].hidden);
          r.update();
        },
      },
      cutoutPercentage: 50,
      rotation: -cn,
      circumference: un,
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (t, e) {
            var i = e.labels[t.index],
              n = ": " + e.datasets[t.datasetIndex].data[t.index];
            return Di.isArray(i) ? ((i = i.slice()), (i[0] += n)) : (i += n), i;
          },
        },
      },
    });
    var fn = zi.extend({
      dataElementType: Qi.Arc,
      linkScales: Di.noop,
      _dataElementOptions: [
        "backgroundColor",
        "borderColor",
        "borderWidth",
        "borderAlign",
        "hoverBackgroundColor",
        "hoverBorderColor",
        "hoverBorderWidth",
      ],
      getRingIndex: function (t) {
        for (var e = 0, i = 0; i < t; ++i)
          this.chart.isDatasetVisible(i) && ++e;
        return e;
      },
      update: function (t) {
        var e,
          i,
          n,
          a,
          o = this,
          r = o.chart,
          s = r.chartArea,
          l = r.options,
          d = 1,
          h = 1,
          u = 0,
          c = 0,
          f = o.getMeta(),
          p = f.data,
          g = l.cutoutPercentage / 100 || 0,
          m = l.circumference,
          v = o._getRingWeight(o.index);
        if (m < un) {
          var b = l.rotation % un;
          b += b >= hn ? -un : b < -hn ? un : 0;
          var y = b + m,
            x = Math.cos(b),
            _ = Math.sin(b),
            w = Math.cos(y),
            k = Math.sin(y),
            C = (b <= 0 && y >= 0) || y >= un,
            M = (b <= cn && y >= cn) || y >= un + cn,
            D = b === -hn || y >= hn,
            S = (b <= -cn && y >= -cn) || y >= hn + cn,
            T = D ? -1 : Math.min(x, x * g, w, w * g),
            F = S ? -1 : Math.min(_, _ * g, k, k * g),
            A = C ? 1 : Math.max(x, x * g, w, w * g),
            P = M ? 1 : Math.max(_, _ * g, k, k * g);
          (d = (A - T) / 2),
            (h = (P - F) / 2),
            (u = -(A + T) / 2),
            (c = -(P + F) / 2);
        }
        for (n = 0, a = p.length; n < a; ++n)
          p[n]._options = o._resolveDataElementOptions(p[n], n);
        for (
          r.borderWidth = o.getMaxBorderWidth(),
            e = (s.right - s.left - r.borderWidth) / d,
            i = (s.bottom - s.top - r.borderWidth) / h,
            r.outerRadius = Math.max(Math.min(e, i) / 2, 0),
            r.innerRadius = Math.max(r.outerRadius * g, 0),
            r.radiusLength =
              (r.outerRadius - r.innerRadius) /
              (o._getVisibleDatasetWeightTotal() || 1),
            r.offsetX = u * r.outerRadius,
            r.offsetY = c * r.outerRadius,
            f.total = o.calculateTotal(),
            o.outerRadius =
              r.outerRadius - r.radiusLength * o._getRingWeightOffset(o.index),
            o.innerRadius = Math.max(o.outerRadius - r.radiusLength * v, 0),
            n = 0,
            a = p.length;
          n < a;
          ++n
        )
          o.updateElement(p[n], n, t);
      },
      updateElement: function (t, e, i) {
        var n = this,
          a = n.chart,
          o = a.chartArea,
          r = a.options,
          s = r.animation,
          l = (o.left + o.right) / 2,
          d = (o.top + o.bottom) / 2,
          h = r.rotation,
          u = r.rotation,
          c = n.getDataset(),
          f =
            i && s.animateRotate
              ? 0
              : t.hidden
              ? 0
              : n.calculateCircumference(c.data[e]) * (r.circumference / un),
          p = i && s.animateScale ? 0 : n.innerRadius,
          g = i && s.animateScale ? 0 : n.outerRadius,
          m = t._options || {};
        Di.extend(t, {
          _datasetIndex: n.index,
          _index: e,
          _model: {
            backgroundColor: m.backgroundColor,
            borderColor: m.borderColor,
            borderWidth: m.borderWidth,
            borderAlign: m.borderAlign,
            x: l + a.offsetX,
            y: d + a.offsetY,
            startAngle: h,
            endAngle: u,
            circumference: f,
            outerRadius: g,
            innerRadius: p,
            label: Di.valueAtIndexOrDefault(c.label, e, a.data.labels[e]),
          },
        });
        var v = t._model;
        (i && s.animateRotate) ||
          ((v.startAngle =
            0 === e ? r.rotation : n.getMeta().data[e - 1]._model.endAngle),
          (v.endAngle = v.startAngle + v.circumference)),
          t.pivot();
      },
      calculateTotal: function () {
        var t,
          e = this.getDataset(),
          i = this.getMeta(),
          n = 0;
        return (
          Di.each(i.data, function (i, a) {
            (t = e.data[a]), isNaN(t) || i.hidden || (n += Math.abs(t));
          }),
          n
        );
      },
      calculateCircumference: function (t) {
        var e = this.getMeta().total;
        return e > 0 && !isNaN(t) ? un * (Math.abs(t) / e) : 0;
      },
      getMaxBorderWidth: function (t) {
        var e,
          i,
          n,
          a,
          o,
          r,
          s,
          l,
          d = this,
          h = 0,
          u = d.chart;
        if (!t)
          for (e = 0, i = u.data.datasets.length; e < i; ++e)
            if (u.isDatasetVisible(e)) {
              (n = u.getDatasetMeta(e)),
                (t = n.data),
                e !== d.index && (o = n.controller);
              break;
            }
        if (!t) return 0;
        for (e = 0, i = t.length; e < i; ++e)
          (a = t[e]),
            o
              ? (o._configure(), (r = o._resolveDataElementOptions(a, e)))
              : (r = a._options),
            "inner" !== r.borderAlign &&
              ((s = r.borderWidth),
              (l = r.hoverBorderWidth),
              (h = s > h ? s : h),
              (h = l > h ? l : h));
        return h;
      },
      setHoverStyle: function (t) {
        var e = t._model,
          i = t._options,
          n = Di.getHoverColor;
        (t.$previousStyle = {
          backgroundColor: e.backgroundColor,
          borderColor: e.borderColor,
          borderWidth: e.borderWidth,
        }),
          (e.backgroundColor = dn(
            i.hoverBackgroundColor,
            n(i.backgroundColor)
          )),
          (e.borderColor = dn(i.hoverBorderColor, n(i.borderColor))),
          (e.borderWidth = dn(i.hoverBorderWidth, i.borderWidth));
      },
      _getRingWeightOffset: function (t) {
        for (var e = 0, i = 0; i < t; ++i)
          this.chart.isDatasetVisible(i) && (e += this._getRingWeight(i));
        return e;
      },
      _getRingWeight: function (t) {
        return Math.max(dn(this.chart.data.datasets[t].weight, 1), 0);
      },
      _getVisibleDatasetWeightTotal: function () {
        return this._getRingWeightOffset(this.chart.data.datasets.length);
      },
    });
    gi._set("horizontalBar", {
      hover: { mode: "index", axis: "y" },
      scales: {
        xAxes: [{ type: "linear", position: "bottom" }],
        yAxes: [
          {
            type: "category",
            position: "left",
            offset: !0,
            gridLines: { offsetGridLines: !0 },
          },
        ],
      },
      elements: { rectangle: { borderSkipped: "left" } },
      tooltips: { mode: "index", axis: "y" },
    }),
      gi._set("global", {
        datasets: {
          horizontalBar: { categoryPercentage: 0.8, barPercentage: 0.9 },
        },
      });
    var pn = on.extend({
        _getValueScaleId: function () {
          return this.getMeta().xAxisID;
        },
        _getIndexScaleId: function () {
          return this.getMeta().yAxisID;
        },
      }),
      gn = Di.valueOrDefault,
      mn = Di.options.resolve,
      vn = Di.canvas._isPointInArea;
    gi._set("line", {
      showLines: !0,
      spanGaps: !1,
      hover: { mode: "label" },
      scales: {
        xAxes: [{ type: "category", id: "x-axis-0" }],
        yAxes: [{ type: "linear", id: "y-axis-0" }],
      },
    });
    var bn = zi.extend({
        datasetElementType: Qi.Line,
        dataElementType: Qi.Point,
        _datasetElementOptions: [
          "backgroundColor",
          "borderCapStyle",
          "borderColor",
          "borderDash",
          "borderDashOffset",
          "borderJoinStyle",
          "borderWidth",
          "cubicInterpolationMode",
          "fill",
        ],
        _dataElementOptions: {
          backgroundColor: "pointBackgroundColor",
          borderColor: "pointBorderColor",
          borderWidth: "pointBorderWidth",
          hitRadius: "pointHitRadius",
          hoverBackgroundColor: "pointHoverBackgroundColor",
          hoverBorderColor: "pointHoverBorderColor",
          hoverBorderWidth: "pointHoverBorderWidth",
          hoverRadius: "pointHoverRadius",
          pointStyle: "pointStyle",
          radius: "pointRadius",
          rotation: "pointRotation",
        },
        update: function (t) {
          var e,
            i,
            n = this,
            a = n.getMeta(),
            o = a.dataset,
            r = a.data || [],
            s = n.chart.options,
            l = n._config,
            d = (n._showLine = gn(l.showLine, s.showLines));
          for (
            n._xScale = n.getScaleForId(a.xAxisID),
              n._yScale = n.getScaleForId(a.yAxisID),
              d &&
                (void 0 !== l.tension &&
                  void 0 === l.lineTension &&
                  (l.lineTension = l.tension),
                (o._scale = n._yScale),
                (o._datasetIndex = n.index),
                (o._children = r),
                (o._model = n._resolveDatasetElementOptions(o)),
                o.pivot()),
              e = 0,
              i = r.length;
            e < i;
            ++e
          )
            n.updateElement(r[e], e, t);
          for (
            d && 0 !== o._model.tension && n.updateBezierControlPoints(),
              e = 0,
              i = r.length;
            e < i;
            ++e
          )
            r[e].pivot();
        },
        updateElement: function (t, e, i) {
          var n,
            a,
            o = this,
            r = o.getMeta(),
            s = t.custom || {},
            l = o.getDataset(),
            d = o.index,
            h = l.data[e],
            u = o._xScale,
            c = o._yScale,
            f = r.dataset._model,
            p = o._resolveDataElementOptions(t, e);
          (n = u.getPixelForValue("object" == typeof h ? h : NaN, e, d)),
            (a = i ? c.getBasePixel() : o.calculatePointY(h, e, d)),
            (t._xScale = u),
            (t._yScale = c),
            (t._options = p),
            (t._datasetIndex = d),
            (t._index = e),
            (t._model = {
              x: n,
              y: a,
              skip: s.skip || isNaN(n) || isNaN(a),
              radius: p.radius,
              pointStyle: p.pointStyle,
              rotation: p.rotation,
              backgroundColor: p.backgroundColor,
              borderColor: p.borderColor,
              borderWidth: p.borderWidth,
              tension: gn(s.tension, f ? f.tension : 0),
              steppedLine: !!f && f.steppedLine,
              hitRadius: p.hitRadius,
            });
        },
        _resolveDatasetElementOptions: function (t) {
          var e = this,
            i = e._config,
            n = t.custom || {},
            a = e.chart.options,
            o = a.elements.line,
            r = zi.prototype._resolveDatasetElementOptions.apply(e, arguments);
          return (
            (r.spanGaps = gn(i.spanGaps, a.spanGaps)),
            (r.tension = gn(i.lineTension, o.tension)),
            (r.steppedLine = mn([n.steppedLine, i.steppedLine, o.stepped])),
            (r.clip = q(gn(i.clip, j(e._xScale, e._yScale, r.borderWidth)))),
            r
          );
        },
        calculatePointY: function (t, e, i) {
          var n,
            a,
            o,
            r,
            s,
            l,
            d,
            h = this,
            u = h.chart,
            c = h._yScale,
            f = 0,
            p = 0;
          if (c.options.stacked) {
            for (
              s = +c.getRightValue(t),
                l = u._getSortedVisibleDatasetMetas(),
                d = l.length,
                n = 0;
              n < d && ((o = l[n]), o.index !== i);
              ++n
            )
              (a = u.data.datasets[o.index]),
                "line" === o.type &&
                  o.yAxisID === c.id &&
                  ((r = +c.getRightValue(a.data[e])),
                  r < 0 ? (p += r || 0) : (f += r || 0));
            return s < 0
              ? c.getPixelForValue(p + s)
              : c.getPixelForValue(f + s);
          }
          return c.getPixelForValue(t);
        },
        updateBezierControlPoints: function () {
          function t(t, e, i) {
            return Math.max(Math.min(t, i), e);
          }
          var e,
            i,
            n,
            a,
            o = this,
            r = o.chart,
            s = o.getMeta(),
            l = s.dataset._model,
            d = r.chartArea,
            h = s.data || [];
          if (
            (l.spanGaps &&
              (h = h.filter(function (t) {
                return !t._model.skip;
              })),
            "monotone" === l.cubicInterpolationMode)
          )
            Di.splineCurveMonotone(h);
          else
            for (e = 0, i = h.length; e < i; ++e)
              (n = h[e]._model),
                (a = Di.splineCurve(
                  Di.previousItem(h, e)._model,
                  n,
                  Di.nextItem(h, e)._model,
                  l.tension
                )),
                (n.controlPointPreviousX = a.previous.x),
                (n.controlPointPreviousY = a.previous.y),
                (n.controlPointNextX = a.next.x),
                (n.controlPointNextY = a.next.y);
          if (r.options.elements.line.capBezierPoints)
            for (e = 0, i = h.length; e < i; ++e)
              (n = h[e]._model),
                vn(n, d) &&
                  (e > 0 &&
                    vn(h[e - 1]._model, d) &&
                    ((n.controlPointPreviousX = t(
                      n.controlPointPreviousX,
                      d.left,
                      d.right
                    )),
                    (n.controlPointPreviousY = t(
                      n.controlPointPreviousY,
                      d.top,
                      d.bottom
                    ))),
                  e < h.length - 1 &&
                    vn(h[e + 1]._model, d) &&
                    ((n.controlPointNextX = t(
                      n.controlPointNextX,
                      d.left,
                      d.right
                    )),
                    (n.controlPointNextY = t(
                      n.controlPointNextY,
                      d.top,
                      d.bottom
                    ))));
        },
        draw: function () {
          var t,
            e = this,
            i = e.chart,
            n = e.getMeta(),
            a = n.data || [],
            o = i.chartArea,
            r = i.canvas,
            s = 0,
            l = a.length;
          for (
            e._showLine &&
            ((t = n.dataset._model.clip),
            Di.canvas.clipArea(i.ctx, {
              left: !1 === t.left ? 0 : o.left - t.left,
              right: !1 === t.right ? r.width : o.right + t.right,
              top: !1 === t.top ? 0 : o.top - t.top,
              bottom: !1 === t.bottom ? r.height : o.bottom + t.bottom,
            }),
            n.dataset.draw(),
            Di.canvas.unclipArea(i.ctx));
            s < l;
            ++s
          )
            a[s].draw(o);
        },
        setHoverStyle: function (t) {
          var e = t._model,
            i = t._options,
            n = Di.getHoverColor;
          (t.$previousStyle = {
            backgroundColor: e.backgroundColor,
            borderColor: e.borderColor,
            borderWidth: e.borderWidth,
            radius: e.radius,
          }),
            (e.backgroundColor = gn(
              i.hoverBackgroundColor,
              n(i.backgroundColor)
            )),
            (e.borderColor = gn(i.hoverBorderColor, n(i.borderColor))),
            (e.borderWidth = gn(i.hoverBorderWidth, i.borderWidth)),
            (e.radius = gn(i.hoverRadius, i.radius));
        },
      }),
      yn = Di.options.resolve;
    gi._set("polarArea", {
      scale: {
        type: "radialLinear",
        angleLines: { display: !1 },
        gridLines: { circular: !0 },
        pointLabels: { display: !1 },
        ticks: { beginAtZero: !0 },
      },
      animation: { animateRotate: !0, animateScale: !0 },
      startAngle: -0.5 * Math.PI,
      legendCallback: function (t) {
        var e,
          i,
          n,
          a,
          o = document.createElement("ul"),
          r = t.data,
          s = r.datasets,
          l = r.labels;
        if ((o.setAttribute("class", t.id + "-legend"), s.length))
          for (e = 0, i = s[0].data.length; e < i; ++e)
            (n = o.appendChild(document.createElement("li"))),
              (a = n.appendChild(document.createElement("span"))),
              (a.style.backgroundColor = s[0].backgroundColor[e]),
              l[e] && n.appendChild(document.createTextNode(l[e]));
        return o.outerHTML;
      },
      legend: {
        labels: {
          generateLabels: function (t) {
            var e = t.data;
            return e.labels.length && e.datasets.length
              ? e.labels.map(function (i, n) {
                  var a = t.getDatasetMeta(0),
                    o = a.controller.getStyle(n);
                  return {
                    text: i,
                    fillStyle: o.backgroundColor,
                    strokeStyle: o.borderColor,
                    lineWidth: o.borderWidth,
                    hidden: isNaN(e.datasets[0].data[n]) || a.data[n].hidden,
                    index: n,
                  };
                })
              : [];
          },
        },
        onClick: function (t, e) {
          var i,
            n,
            a,
            o = e.index,
            r = this.chart;
          for (i = 0, n = (r.data.datasets || []).length; i < n; ++i)
            (a = r.getDatasetMeta(i)), (a.data[o].hidden = !a.data[o].hidden);
          r.update();
        },
      },
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (t, e) {
            return e.labels[t.index] + ": " + t.yLabel;
          },
        },
      },
    });
    var xn = zi.extend({
      dataElementType: Qi.Arc,
      linkScales: Di.noop,
      _dataElementOptions: [
        "backgroundColor",
        "borderColor",
        "borderWidth",
        "borderAlign",
        "hoverBackgroundColor",
        "hoverBorderColor",
        "hoverBorderWidth",
      ],
      _getIndexScaleId: function () {
        return this.chart.scale.id;
      },
      _getValueScaleId: function () {
        return this.chart.scale.id;
      },
      update: function (t) {
        var e,
          i,
          n,
          a = this,
          o = a.getDataset(),
          r = a.getMeta(),
          s = a.chart.options.startAngle || 0,
          l = (a._starts = []),
          d = (a._angles = []),
          h = r.data;
        for (
          a._updateRadius(),
            r.count = a.countVisibleElements(),
            e = 0,
            i = o.data.length;
          e < i;
          e++
        )
          (l[e] = s), (n = a._computeAngle(e)), (d[e] = n), (s += n);
        for (e = 0, i = h.length; e < i; ++e)
          (h[e]._options = a._resolveDataElementOptions(h[e], e)),
            a.updateElement(h[e], e, t);
      },
      _updateRadius: function () {
        var t = this,
          e = t.chart,
          i = e.chartArea,
          n = e.options,
          a = Math.min(i.right - i.left, i.bottom - i.top);
        (e.outerRadius = Math.max(a / 2, 0)),
          (e.innerRadius = Math.max(
            n.cutoutPercentage ? (e.outerRadius / 100) * n.cutoutPercentage : 1,
            0
          )),
          (e.radiusLength =
            (e.outerRadius - e.innerRadius) / e.getVisibleDatasetCount()),
          (t.outerRadius = e.outerRadius - e.radiusLength * t.index),
          (t.innerRadius = t.outerRadius - e.radiusLength);
      },
      updateElement: function (t, e, i) {
        var n = this,
          a = n.chart,
          o = n.getDataset(),
          r = a.options,
          s = r.animation,
          l = a.scale,
          d = a.data.labels,
          h = l.xCenter,
          u = l.yCenter,
          c = r.startAngle,
          f = t.hidden ? 0 : l.getDistanceFromCenterForValue(o.data[e]),
          p = n._starts[e],
          g = p + (t.hidden ? 0 : n._angles[e]),
          m = s.animateScale ? 0 : l.getDistanceFromCenterForValue(o.data[e]),
          v = t._options || {};
        Di.extend(t, {
          _datasetIndex: n.index,
          _index: e,
          _scale: l,
          _model: {
            backgroundColor: v.backgroundColor,
            borderColor: v.borderColor,
            borderWidth: v.borderWidth,
            borderAlign: v.borderAlign,
            x: h,
            y: u,
            innerRadius: 0,
            outerRadius: i ? m : f,
            startAngle: i && s.animateRotate ? c : p,
            endAngle: i && s.animateRotate ? c : g,
            label: Di.valueAtIndexOrDefault(d, e, d[e]),
          },
        }),
          t.pivot();
      },
      countVisibleElements: function () {
        var t = this.getDataset(),
          e = this.getMeta(),
          i = 0;
        return (
          Di.each(e.data, function (e, n) {
            isNaN(t.data[n]) || e.hidden || i++;
          }),
          i
        );
      },
      setHoverStyle: function (t) {
        var e = t._model,
          i = t._options,
          n = Di.getHoverColor,
          a = Di.valueOrDefault;
        (t.$previousStyle = {
          backgroundColor: e.backgroundColor,
          borderColor: e.borderColor,
          borderWidth: e.borderWidth,
        }),
          (e.backgroundColor = a(i.hoverBackgroundColor, n(i.backgroundColor))),
          (e.borderColor = a(i.hoverBorderColor, n(i.borderColor))),
          (e.borderWidth = a(i.hoverBorderWidth, i.borderWidth));
      },
      _computeAngle: function (t) {
        var e = this,
          i = this.getMeta().count,
          n = e.getDataset(),
          a = e.getMeta();
        if (isNaN(n.data[t]) || a.data[t].hidden) return 0;
        var o = {
          chart: e.chart,
          dataIndex: t,
          dataset: n,
          datasetIndex: e.index,
        };
        return yn(
          [e.chart.options.elements.arc.angle, (2 * Math.PI) / i],
          o,
          t
        );
      },
    });
    gi._set("pie", Di.clone(gi.doughnut)),
      gi._set("pie", { cutoutPercentage: 0 });
    var _n = fn,
      wn = Di.valueOrDefault;
    gi._set("radar", {
      spanGaps: !1,
      scale: { type: "radialLinear" },
      elements: { line: { fill: "start", tension: 0 } },
    });
    var kn = zi.extend({
      datasetElementType: Qi.Line,
      dataElementType: Qi.Point,
      linkScales: Di.noop,
      _datasetElementOptions: [
        "backgroundColor",
        "borderWidth",
        "borderColor",
        "borderCapStyle",
        "borderDash",
        "borderDashOffset",
        "borderJoinStyle",
        "fill",
      ],
      _dataElementOptions: {
        backgroundColor: "pointBackgroundColor",
        borderColor: "pointBorderColor",
        borderWidth: "pointBorderWidth",
        hitRadius: "pointHitRadius",
        hoverBackgroundColor: "pointHoverBackgroundColor",
        hoverBorderColor: "pointHoverBorderColor",
        hoverBorderWidth: "pointHoverBorderWidth",
        hoverRadius: "pointHoverRadius",
        pointStyle: "pointStyle",
        radius: "pointRadius",
        rotation: "pointRotation",
      },
      _getIndexScaleId: function () {
        return this.chart.scale.id;
      },
      _getValueScaleId: function () {
        return this.chart.scale.id;
      },
      update: function (t) {
        var e,
          i,
          n = this,
          a = n.getMeta(),
          o = a.dataset,
          r = a.data || [],
          s = n.chart.scale,
          l = n._config;
        for (
          void 0 !== l.tension &&
            void 0 === l.lineTension &&
            (l.lineTension = l.tension),
            o._scale = s,
            o._datasetIndex = n.index,
            o._children = r,
            o._loop = !0,
            o._model = n._resolveDatasetElementOptions(o),
            o.pivot(),
            e = 0,
            i = r.length;
          e < i;
          ++e
        )
          n.updateElement(r[e], e, t);
        for (n.updateBezierControlPoints(), e = 0, i = r.length; e < i; ++e)
          r[e].pivot();
      },
      updateElement: function (t, e, i) {
        var n = this,
          a = t.custom || {},
          o = n.getDataset(),
          r = n.chart.scale,
          s = r.getPointPositionForValue(e, o.data[e]),
          l = n._resolveDataElementOptions(t, e),
          d = n.getMeta().dataset._model,
          h = i ? r.xCenter : s.x,
          u = i ? r.yCenter : s.y;
        (t._scale = r),
          (t._options = l),
          (t._datasetIndex = n.index),
          (t._index = e),
          (t._model = {
            x: h,
            y: u,
            skip: a.skip || isNaN(h) || isNaN(u),
            radius: l.radius,
            pointStyle: l.pointStyle,
            rotation: l.rotation,
            backgroundColor: l.backgroundColor,
            borderColor: l.borderColor,
            borderWidth: l.borderWidth,
            tension: wn(a.tension, d ? d.tension : 0),
            hitRadius: l.hitRadius,
          });
      },
      _resolveDatasetElementOptions: function () {
        var t = this,
          e = t._config,
          i = t.chart.options,
          n = zi.prototype._resolveDatasetElementOptions.apply(t, arguments);
        return (
          (n.spanGaps = wn(e.spanGaps, i.spanGaps)),
          (n.tension = wn(e.lineTension, i.elements.line.tension)),
          n
        );
      },
      updateBezierControlPoints: function () {
        function t(t, e, i) {
          return Math.max(Math.min(t, i), e);
        }
        var e,
          i,
          n,
          a,
          o = this,
          r = o.getMeta(),
          s = o.chart.chartArea,
          l = r.data || [];
        for (
          r.dataset._model.spanGaps &&
            (l = l.filter(function (t) {
              return !t._model.skip;
            })),
            e = 0,
            i = l.length;
          e < i;
          ++e
        )
          (n = l[e]._model),
            (a = Di.splineCurve(
              Di.previousItem(l, e, !0)._model,
              n,
              Di.nextItem(l, e, !0)._model,
              n.tension
            )),
            (n.controlPointPreviousX = t(a.previous.x, s.left, s.right)),
            (n.controlPointPreviousY = t(a.previous.y, s.top, s.bottom)),
            (n.controlPointNextX = t(a.next.x, s.left, s.right)),
            (n.controlPointNextY = t(a.next.y, s.top, s.bottom));
      },
      setHoverStyle: function (t) {
        var e = t._model,
          i = t._options,
          n = Di.getHoverColor;
        (t.$previousStyle = {
          backgroundColor: e.backgroundColor,
          borderColor: e.borderColor,
          borderWidth: e.borderWidth,
          radius: e.radius,
        }),
          (e.backgroundColor = wn(
            i.hoverBackgroundColor,
            n(i.backgroundColor)
          )),
          (e.borderColor = wn(i.hoverBorderColor, n(i.borderColor))),
          (e.borderWidth = wn(i.hoverBorderWidth, i.borderWidth)),
          (e.radius = wn(i.hoverRadius, i.radius));
      },
    });
    gi._set("scatter", {
      hover: { mode: "single" },
      scales: {
        xAxes: [{ id: "x-axis-1", type: "linear", position: "bottom" }],
        yAxes: [{ id: "y-axis-1", type: "linear", position: "left" }],
      },
      tooltips: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (t) {
            return "(" + t.xLabel + ", " + t.yLabel + ")";
          },
        },
      },
    }),
      gi._set("global", { datasets: { scatter: { showLine: !1 } } });
    var Cn = bn,
      Mn = {
        bar: on,
        bubble: ln,
        doughnut: fn,
        horizontalBar: pn,
        line: bn,
        polarArea: xn,
        pie: _n,
        radar: kn,
        scatter: Cn,
      },
      Dn = {
        modes: {
          single: function (t, e) {
            var i = $(e, t),
              n = [];
            return (
              Y(t, function (t) {
                if (t.inRange(i.x, i.y)) return n.push(t), n;
              }),
              n.slice(0, 1)
            );
          },
          label: Q,
          index: Q,
          dataset: function (t, e, i) {
            var n = $(e, t);
            i.axis = i.axis || "xy";
            var a = K(i.axis),
              o = i.intersect ? X(t, n) : G(t, n, !1, a);
            return (
              o.length > 0 && (o = t.getDatasetMeta(o[0]._datasetIndex).data), o
            );
          },
          "x-axis": function (t, e) {
            return Q(t, e, { intersect: !1 });
          },
          point: function (t, e) {
            return X(t, $(e, t));
          },
          nearest: function (t, e, i) {
            var n = $(e, t);
            i.axis = i.axis || "xy";
            var a = K(i.axis);
            return G(t, n, i.intersect, a);
          },
          x: function (t, e, i) {
            var n = $(e, t),
              a = [],
              o = !1;
            return (
              Y(t, function (t) {
                t.inXRange(n.x) && a.push(t), t.inRange(n.x, n.y) && (o = !0);
              }),
              i.intersect && !o && (a = []),
              a
            );
          },
          y: function (t, e, i) {
            var n = $(e, t),
              a = [],
              o = !1;
            return (
              Y(t, function (t) {
                t.inYRange(n.y) && a.push(t), t.inRange(n.x, n.y) && (o = !0);
              }),
              i.intersect && !o && (a = []),
              a
            );
          },
        },
      },
      Sn = Di.extend;
    gi._set("global", {
      layout: { padding: { top: 0, right: 0, bottom: 0, left: 0 } },
    });
    var Tn = {
        defaults: {},
        addBox: function (t, e) {
          t.boxes || (t.boxes = []),
            (e.fullWidth = e.fullWidth || !1),
            (e.position = e.position || "top"),
            (e.weight = e.weight || 0),
            (e._layers =
              e._layers ||
              function () {
                return [
                  {
                    z: 0,
                    draw: function () {
                      e.draw.apply(e, arguments);
                    },
                  },
                ];
              }),
            t.boxes.push(e);
        },
        removeBox: function (t, e) {
          var i = t.boxes ? t.boxes.indexOf(e) : -1;
          -1 !== i && t.boxes.splice(i, 1);
        },
        configure: function (t, e, i) {
          for (
            var n, a = ["fullWidth", "position", "weight"], o = a.length, r = 0;
            r < o;
            ++r
          )
            (n = a[r]), i.hasOwnProperty(n) && (e[n] = i[n]);
        },
        update: function (t, e, i) {
          if (t) {
            var n = t.options.layout || {},
              a = Di.options.toPadding(n.padding),
              o = e - a.width,
              r = i - a.height,
              s = it(t.boxes),
              l = s.vertical,
              d = s.horizontal,
              h = Object.freeze({
                outerWidth: e,
                outerHeight: i,
                padding: a,
                availableWidth: o,
                vBoxMaxWidth: o / 2 / l.length,
                hBoxMaxHeight: r / 2,
              }),
              u = Sn(
                { maxPadding: Sn({}, a), w: o, h: r, x: a.left, y: a.top },
                a
              );
            et(l.concat(d), h),
              st(l, u, h),
              st(d, u, h) && st(l, u, h),
              ot(u),
              lt(s.leftAndTop, u, h),
              (u.x += u.w),
              (u.y += u.h),
              lt(s.rightAndBottom, u, h),
              (t.chartArea = {
                left: u.left,
                top: u.top,
                right: u.left + u.w,
                bottom: u.top + u.h,
              }),
              Di.each(s.chartArea, function (e) {
                var i = e.box;
                Sn(i, t.chartArea), i.update(u.w, u.h);
              });
          }
        },
      },
      Fn = {
        acquireContext: function (t) {
          return (
            t && t.canvas && (t = t.canvas), (t && t.getContext("2d")) || null
          );
        },
      },
      An = Object.freeze({
        __proto__: null,
        default:
          "/*\n * DOM element rendering detection\n * https://davidwalsh.name/detect-node-insertion\n */\n@keyframes chartjs-render-animation {\n\tfrom { opacity: 0.99; }\n\tto { opacity: 1; }\n}\n\n.chartjs-render-monitor {\n\tanimation: chartjs-render-animation 0.001s;\n}\n\n/*\n * DOM element resizing detection\n * https://github.com/marcj/css-element-queries\n */\n.chartjs-size-monitor,\n.chartjs-size-monitor-expand,\n.chartjs-size-monitor-shrink {\n\tposition: absolute;\n\tdirection: ltr;\n\tleft: 0;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\toverflow: hidden;\n\tpointer-events: none;\n\tvisibility: hidden;\n\tz-index: -1;\n}\n\n.chartjs-size-monitor-expand > div {\n\tposition: absolute;\n\twidth: 1000000px;\n\theight: 1000000px;\n\tleft: 0;\n\ttop: 0;\n}\n\n.chartjs-size-monitor-shrink > div {\n\tposition: absolute;\n\twidth: 200%;\n\theight: 200%;\n\tleft: 0;\n\ttop: 0;\n}\n",
      }),
      Pn = (function (t) {
        return (t && t.default) || t;
      })(An),
      In = "$chartjs",
      En = "chartjs-size-monitor",
      On = "chartjs-render-monitor",
      Ln = "chartjs-render-animation",
      Rn = ["animationstart", "webkitAnimationStart"],
      Vn = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout",
      },
      Nn = (function () {
        var t = !1;
        try {
          var e = Object.defineProperty({}, "passive", {
            get: function () {
              t = !0;
            },
          });
          window.addEventListener("e", null, e);
        } catch (t) {}
        return t;
      })(),
      Un = !!Nn && { passive: !0 },
      zn = {
        disableCSSInjection: !1,
        _enabled:
          "undefined" != typeof window && "undefined" != typeof document,
        _ensureLoaded: function (t) {
          if (!this.disableCSSInjection) {
            var e = t.getRootNode ? t.getRootNode() : document;
            wt(e.host ? e : document.head, Pn);
          }
        },
        acquireContext: function (t, e) {
          "string" == typeof t
            ? (t = document.getElementById(t))
            : t.length && (t = t[0]),
            t && t.canvas && (t = t.canvas);
          var i = t && t.getContext && t.getContext("2d");
          return i && i.canvas === t
            ? (this._ensureLoaded(t), ht(t, e), i)
            : null;
        },
        releaseContext: function (t) {
          var e = t.canvas;
          if (e[In]) {
            var i = e[In].initial;
            ["height", "width"].forEach(function (t) {
              var n = i[t];
              Di.isNullOrUndef(n) ? e.removeAttribute(t) : e.setAttribute(t, n);
            }),
              Di.each(i.style || {}, function (t, i) {
                e.style[i] = t;
              }),
              (e.width = e.width),
              delete e[In];
          }
        },
        addEventListener: function (t, e, i) {
          var n = t.canvas;
          if ("resize" === e) return void xt(n, i, t);
          var a = i[In] || (i[In] = {});
          ut(
            n,
            e,
            ((a.proxies || (a.proxies = {}))[t.id + "_" + e] = function (e) {
              i(pt(e, t));
            })
          );
        },
        removeEventListener: function (t, e, i) {
          var n = t.canvas;
          if ("resize" === e) return void _t(n);
          var a = i[In] || {},
            o = a.proxies || {},
            r = o[t.id + "_" + e];
          r && ct(n, e, r);
        },
      };
    (Di.addEvent = ut), (Di.removeEvent = ct);
    var Bn = zn._enabled ? zn : Fn,
      Wn = Di.extend(
        {
          initialize: function () {},
          acquireContext: function () {},
          releaseContext: function () {},
          addEventListener: function () {},
          removeEventListener: function () {},
        },
        Bn
      );
    gi._set("global", { plugins: {} });
    var Hn = {
        _plugins: [],
        _cacheId: 0,
        register: function (t) {
          var e = this._plugins;
          [].concat(t).forEach(function (t) {
            -1 === e.indexOf(t) && e.push(t);
          }),
            this._cacheId++;
        },
        unregister: function (t) {
          var e = this._plugins;
          [].concat(t).forEach(function (t) {
            var i = e.indexOf(t);
            -1 !== i && e.splice(i, 1);
          }),
            this._cacheId++;
        },
        clear: function () {
          (this._plugins = []), this._cacheId++;
        },
        count: function () {
          return this._plugins.length;
        },
        getAll: function () {
          return this._plugins;
        },
        notify: function (t, e, i) {
          var n,
            a,
            o,
            r,
            s,
            l = this.descriptors(t),
            d = l.length;
          for (n = 0; n < d; ++n)
            if (
              ((a = l[n]),
              (o = a.plugin),
              "function" == typeof (s = o[e]) &&
                ((r = [t].concat(i || [])),
                r.push(a.options),
                !1 === s.apply(o, r)))
            )
              return !1;
          return !0;
        },
        descriptors: function (t) {
          var e = t.$plugins || (t.$plugins = {});
          if (e.id === this._cacheId) return e.descriptors;
          var i = [],
            n = [],
            a = (t && t.config) || {},
            o = (a.options && a.options.plugins) || {};
          return (
            this._plugins.concat(a.plugins || []).forEach(function (t) {
              if (-1 === i.indexOf(t)) {
                var e = t.id,
                  a = o[e];
                !1 !== a &&
                  (!0 === a && (a = Di.clone(gi.global.plugins[e])),
                  i.push(t),
                  n.push({ plugin: t, options: a || {} }));
              }
            }),
            (e.descriptors = n),
            (e.id = this._cacheId),
            n
          );
        },
        _invalidate: function (t) {
          delete t.$plugins;
        },
      },
      jn = {
        constructors: {},
        defaults: {},
        registerScaleType: function (t, e, i) {
          (this.constructors[t] = e), (this.defaults[t] = Di.clone(i));
        },
        getScaleConstructor: function (t) {
          return this.constructors.hasOwnProperty(t)
            ? this.constructors[t]
            : void 0;
        },
        getScaleDefaults: function (t) {
          return this.defaults.hasOwnProperty(t)
            ? Di.merge({}, [gi.scale, this.defaults[t]])
            : {};
        },
        updateScaleDefaults: function (t, e) {
          var i = this;
          i.defaults.hasOwnProperty(t) &&
            (i.defaults[t] = Di.extend(i.defaults[t], e));
        },
        addScalesToLayout: function (t) {
          Di.each(t.scales, function (e) {
            (e.fullWidth = e.options.fullWidth),
              (e.position = e.options.position),
              (e.weight = e.options.weight),
              Tn.addBox(t, e);
          });
        },
      },
      qn = Di.valueOrDefault,
      $n = Di.rtl.getRtlAdapter;
    gi._set("global", {
      tooltips: {
        enabled: !0,
        custom: null,
        mode: "nearest",
        position: "average",
        intersect: !0,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFontStyle: "bold",
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleFontColor: "#fff",
        titleAlign: "left",
        bodySpacing: 2,
        bodyFontColor: "#fff",
        bodyAlign: "left",
        footerFontStyle: "bold",
        footerSpacing: 2,
        footerMarginTop: 6,
        footerFontColor: "#fff",
        footerAlign: "left",
        yPadding: 6,
        xPadding: 6,
        caretPadding: 2,
        caretSize: 5,
        cornerRadius: 6,
        multiKeyBackground: "#fff",
        displayColors: !0,
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        callbacks: {
          beforeTitle: Di.noop,
          title: function (t, e) {
            var i = "",
              n = e.labels,
              a = n ? n.length : 0;
            if (t.length > 0) {
              var o = t[0];
              o.label
                ? (i = o.label)
                : o.xLabel
                ? (i = o.xLabel)
                : a > 0 && o.index < a && (i = n[o.index]);
            }
            return i;
          },
          afterTitle: Di.noop,
          beforeBody: Di.noop,
          beforeLabel: Di.noop,
          label: function (t, e) {
            var i = e.datasets[t.datasetIndex].label || "";
            return (
              i && (i += ": "),
              Di.isNullOrUndef(t.value) ? (i += t.yLabel) : (i += t.value),
              i
            );
          },
          labelColor: function (t, e) {
            var i = e.getDatasetMeta(t.datasetIndex),
              n = i.data[t.index],
              a = n._view;
            return {
              borderColor: a.borderColor,
              backgroundColor: a.backgroundColor,
            };
          },
          labelTextColor: function () {
            return this._options.bodyFontColor;
          },
          afterLabel: Di.noop,
          afterBody: Di.noop,
          beforeFooter: Di.noop,
          footer: Di.noop,
          afterFooter: Di.noop,
        },
      },
    });
    var Yn = {
        average: function (t) {
          if (!t.length) return !1;
          var e,
            i,
            n = 0,
            a = 0,
            o = 0;
          for (e = 0, i = t.length; e < i; ++e) {
            var r = t[e];
            if (r && r.hasValue()) {
              var s = r.tooltipPosition();
              (n += s.x), (a += s.y), ++o;
            }
          }
          return { x: n / o, y: a / o };
        },
        nearest: function (t, e) {
          var i,
            n,
            a,
            o = e.x,
            r = e.y,
            s = Number.POSITIVE_INFINITY;
          for (i = 0, n = t.length; i < n; ++i) {
            var l = t[i];
            if (l && l.hasValue()) {
              var d = l.getCenterPoint(),
                h = Di.distanceBetweenPoints(e, d);
              h < s && ((s = h), (a = l));
            }
          }
          if (a) {
            var u = a.tooltipPosition();
            (o = u.x), (r = u.y);
          }
          return { x: o, y: r };
        },
      },
      Xn = Ei.extend({
        initialize: function () {
          (this._model = Dt(this._options)), (this._lastActive = []);
        },
        getTitle: function () {
          var t = this,
            e = t._options,
            i = e.callbacks,
            n = i.beforeTitle.apply(t, arguments),
            a = i.title.apply(t, arguments),
            o = i.afterTitle.apply(t, arguments),
            r = [];
          return (r = kt(r, Ct(n))), (r = kt(r, Ct(a))), (r = kt(r, Ct(o)));
        },
        getBeforeBody: function () {
          return Pt(this._options.callbacks.beforeBody.apply(this, arguments));
        },
        getBody: function (t, e) {
          var i = this,
            n = i._options.callbacks,
            a = [];
          return (
            Di.each(t, function (t) {
              var o = { before: [], lines: [], after: [] };
              kt(o.before, Ct(n.beforeLabel.call(i, t, e))),
                kt(o.lines, n.label.call(i, t, e)),
                kt(o.after, Ct(n.afterLabel.call(i, t, e))),
                a.push(o);
            }),
            a
          );
        },
        getAfterBody: function () {
          return Pt(this._options.callbacks.afterBody.apply(this, arguments));
        },
        getFooter: function () {
          var t = this,
            e = t._options.callbacks,
            i = e.beforeFooter.apply(t, arguments),
            n = e.footer.apply(t, arguments),
            a = e.afterFooter.apply(t, arguments),
            o = [];
          return (o = kt(o, Ct(i))), (o = kt(o, Ct(n))), (o = kt(o, Ct(a)));
        },
        update: function (t) {
          var e,
            i,
            n = this,
            a = n._options,
            o = n._model,
            r = (n._model = Dt(a)),
            s = n._active,
            l = n._data,
            d = { xAlign: o.xAlign, yAlign: o.yAlign },
            h = { x: o.x, y: o.y },
            u = { width: o.width, height: o.height },
            c = { x: o.caretX, y: o.caretY };
          if (s.length) {
            r.opacity = 1;
            var f = [],
              p = [];
            c = Yn[a.position].call(n, s, n._eventPosition);
            var g = [];
            for (e = 0, i = s.length; e < i; ++e) g.push(Mt(s[e]));
            a.filter &&
              (g = g.filter(function (t) {
                return a.filter(t, l);
              })),
              a.itemSort &&
                (g = g.sort(function (t, e) {
                  return a.itemSort(t, e, l);
                })),
              Di.each(g, function (t) {
                f.push(a.callbacks.labelColor.call(n, t, n._chart)),
                  p.push(a.callbacks.labelTextColor.call(n, t, n._chart));
              }),
              (r.title = n.getTitle(g, l)),
              (r.beforeBody = n.getBeforeBody(g, l)),
              (r.body = n.getBody(g, l)),
              (r.afterBody = n.getAfterBody(g, l)),
              (r.footer = n.getFooter(g, l)),
              (r.x = c.x),
              (r.y = c.y),
              (r.caretPadding = a.caretPadding),
              (r.labelColors = f),
              (r.labelTextColors = p),
              (r.dataPoints = g),
              (u = St(this, r)),
              (d = Tt(this, u)),
              (h = Ft(r, u, d, n._chart));
          } else r.opacity = 0;
          return (
            (r.xAlign = d.xAlign),
            (r.yAlign = d.yAlign),
            (r.x = h.x),
            (r.y = h.y),
            (r.width = u.width),
            (r.height = u.height),
            (r.caretX = c.x),
            (r.caretY = c.y),
            (n._model = r),
            t && a.custom && a.custom.call(n, r),
            n
          );
        },
        drawCaret: function (t, e) {
          var i = this._chart.ctx,
            n = this._view,
            a = this.getCaretPosition(t, e, n);
          i.lineTo(a.x1, a.y1), i.lineTo(a.x2, a.y2), i.lineTo(a.x3, a.y3);
        },
        getCaretPosition: function (t, e, i) {
          var n,
            a,
            o,
            r,
            s,
            l,
            d = i.caretSize,
            h = i.cornerRadius,
            u = i.xAlign,
            c = i.yAlign,
            f = t.x,
            p = t.y,
            g = e.width,
            m = e.height;
          if ("center" === c)
            (s = p + m / 2),
              "left" === u
                ? ((n = f), (a = n - d), (o = n), (r = s + d), (l = s - d))
                : ((n = f + g), (a = n + d), (o = n), (r = s - d), (l = s + d));
          else if (
            ("left" === u
              ? ((a = f + h + d), (n = a - d), (o = a + d))
              : "right" === u
              ? ((a = f + g - h - d), (n = a - d), (o = a + d))
              : ((a = i.caretX), (n = a - d), (o = a + d)),
            "top" === c)
          )
            (r = p), (s = r - d), (l = r);
          else {
            (r = p + m), (s = r + d), (l = r);
            var v = o;
            (o = n), (n = v);
          }
          return { x1: n, x2: a, x3: o, y1: r, y2: s, y3: l };
        },
        drawTitle: function (t, e, i) {
          var n,
            a,
            o,
            r = e.title,
            s = r.length;
          if (s) {
            var l = $n(e.rtl, e.x, e.width);
            for (
              t.x = At(e, e._titleAlign),
                i.textAlign = l.textAlign(e._titleAlign),
                i.textBaseline = "middle",
                n = e.titleFontSize,
                a = e.titleSpacing,
                i.fillStyle = e.titleFontColor,
                i.font = Di.fontString(
                  n,
                  e._titleFontStyle,
                  e._titleFontFamily
                ),
                o = 0;
              o < s;
              ++o
            )
              i.fillText(r[o], l.x(t.x), t.y + n / 2),
                (t.y += n + a),
                o + 1 === s && (t.y += e.titleMarginBottom - a);
          }
        },
        drawBody: function (t, e, i) {
          var n,
            a,
            o,
            r,
            s,
            l,
            d,
            h,
            u = e.bodyFontSize,
            c = e.bodySpacing,
            f = e._bodyAlign,
            p = e.body,
            g = e.displayColors,
            m = 0,
            v = g ? At(e, "left") : 0,
            b = $n(e.rtl, e.x, e.width),
            y = function (e) {
              i.fillText(e, b.x(t.x + m), t.y + u / 2), (t.y += u + c);
            },
            x = b.textAlign(f);
          for (
            i.textAlign = f,
              i.textBaseline = "middle",
              i.font = Di.fontString(u, e._bodyFontStyle, e._bodyFontFamily),
              t.x = At(e, x),
              i.fillStyle = e.bodyFontColor,
              Di.each(e.beforeBody, y),
              m = g && "right" !== x ? ("center" === f ? u / 2 + 1 : u + 2) : 0,
              s = 0,
              d = p.length;
            s < d;
            ++s
          ) {
            for (
              n = p[s],
                a = e.labelTextColors[s],
                o = e.labelColors[s],
                i.fillStyle = a,
                Di.each(n.before, y),
                r = n.lines,
                l = 0,
                h = r.length;
              l < h;
              ++l
            ) {
              if (g) {
                var _ = b.x(v);
                (i.fillStyle = e.legendColorBackground),
                  i.fillRect(b.leftForLtr(_, u), t.y, u, u),
                  (i.lineWidth = 1),
                  (i.strokeStyle = o.borderColor),
                  i.strokeRect(b.leftForLtr(_, u), t.y, u, u),
                  (i.fillStyle = o.backgroundColor),
                  i.fillRect(
                    b.leftForLtr(b.xPlus(_, 1), u - 2),
                    t.y + 1,
                    u - 2,
                    u - 2
                  ),
                  (i.fillStyle = a);
              }
              y(r[l]);
            }
            Di.each(n.after, y);
          }
          (m = 0), Di.each(e.afterBody, y), (t.y -= c);
        },
        drawFooter: function (t, e, i) {
          var n,
            a,
            o = e.footer,
            r = o.length;
          if (r) {
            var s = $n(e.rtl, e.x, e.width);
            for (
              t.x = At(e, e._footerAlign),
                t.y += e.footerMarginTop,
                i.textAlign = s.textAlign(e._footerAlign),
                i.textBaseline = "middle",
                n = e.footerFontSize,
                i.fillStyle = e.footerFontColor,
                i.font = Di.fontString(
                  n,
                  e._footerFontStyle,
                  e._footerFontFamily
                ),
                a = 0;
              a < r;
              ++a
            )
              i.fillText(o[a], s.x(t.x), t.y + n / 2),
                (t.y += n + e.footerSpacing);
          }
        },
        drawBackground: function (t, e, i, n) {
          (i.fillStyle = e.backgroundColor),
            (i.strokeStyle = e.borderColor),
            (i.lineWidth = e.borderWidth);
          var a = e.xAlign,
            o = e.yAlign,
            r = t.x,
            s = t.y,
            l = n.width,
            d = n.height,
            h = e.cornerRadius;
          i.beginPath(),
            i.moveTo(r + h, s),
            "top" === o && this.drawCaret(t, n),
            i.lineTo(r + l - h, s),
            i.quadraticCurveTo(r + l, s, r + l, s + h),
            "center" === o && "right" === a && this.drawCaret(t, n),
            i.lineTo(r + l, s + d - h),
            i.quadraticCurveTo(r + l, s + d, r + l - h, s + d),
            "bottom" === o && this.drawCaret(t, n),
            i.lineTo(r + h, s + d),
            i.quadraticCurveTo(r, s + d, r, s + d - h),
            "center" === o && "left" === a && this.drawCaret(t, n),
            i.lineTo(r, s + h),
            i.quadraticCurveTo(r, s, r + h, s),
            i.closePath(),
            i.fill(),
            e.borderWidth > 0 && i.stroke();
        },
        draw: function () {
          var t = this._chart.ctx,
            e = this._view;
          if (0 !== e.opacity) {
            var i = { width: e.width, height: e.height },
              n = { x: e.x, y: e.y },
              a = Math.abs(e.opacity < 0.001) ? 0 : e.opacity,
              o =
                e.title.length ||
                e.beforeBody.length ||
                e.body.length ||
                e.afterBody.length ||
                e.footer.length;
            this._options.enabled &&
              o &&
              (t.save(),
              (t.globalAlpha = a),
              this.drawBackground(n, e, t, i),
              (n.y += e.yPadding),
              Di.rtl.overrideTextDirection(t, e.textDirection),
              this.drawTitle(n, e, t),
              this.drawBody(n, e, t),
              this.drawFooter(n, e, t),
              Di.rtl.restoreTextDirection(t, e.textDirection),
              t.restore());
          }
        },
        handleEvent: function (t) {
          var e = this,
            i = e._options,
            n = !1;
          return (
            (e._lastActive = e._lastActive || []),
            "mouseout" === t.type
              ? (e._active = [])
              : ((e._active = e._chart.getElementsAtEventForMode(t, i.mode, i)),
                i.reverse && e._active.reverse()),
            (n = !Di.arrayEquals(e._active, e._lastActive)),
            n &&
              ((e._lastActive = e._active),
              (i.enabled || i.custom) &&
                ((e._eventPosition = { x: t.x, y: t.y }),
                e.update(!0),
                e.pivot())),
            n
          );
        },
      }),
      Gn = Yn,
      Kn = Xn;
    Kn.positioners = Gn;
    var Qn = Di.valueOrDefault;
    gi._set("global", {
      elements: {},
      events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
      hover: {
        onHover: null,
        mode: "nearest",
        intersect: !0,
        animationDuration: 400,
      },
      onClick: null,
      maintainAspectRatio: !0,
      responsive: !0,
      responsiveAnimationDuration: 0,
    });
    var Zn = function (t, e) {
      return this.construct(t, e), this;
    };
    Di.extend(Zn.prototype, {
      construct: function (t, e) {
        var i = this;
        e = Ot(e);
        var n = Wn.acquireContext(t, e),
          a = n && n.canvas,
          o = a && a.height,
          r = a && a.width;
        if (
          ((i.id = Di.uid()),
          (i.ctx = n),
          (i.canvas = a),
          (i.config = e),
          (i.width = r),
          (i.height = o),
          (i.aspectRatio = o ? r / o : null),
          (i.options = e.options),
          (i._bufferedRender = !1),
          (i._layers = []),
          (i.chart = i),
          (i.controller = i),
          (Zn.instances[i.id] = i),
          Object.defineProperty(i, "data", {
            get: function () {
              return i.config.data;
            },
            set: function (t) {
              i.config.data = t;
            },
          }),
          !n || !a)
        )
          return void console.error(
            "Failed to create chart: can't acquire context from the given item"
          );
        i.initialize(), i.update();
      },
      initialize: function () {
        var t = this;
        return (
          Hn.notify(t, "beforeInit"),
          Di.retinaScale(t, t.options.devicePixelRatio),
          t.bindEvents(),
          t.options.responsive && t.resize(!0),
          t.initToolTip(),
          Hn.notify(t, "afterInit"),
          t
        );
      },
      clear: function () {
        return Di.canvas.clear(this), this;
      },
      stop: function () {
        return Ri.cancelAnimation(this), this;
      },
      resize: function (t) {
        var e = this,
          i = e.options,
          n = e.canvas,
          a = (i.maintainAspectRatio && e.aspectRatio) || null,
          o = Math.max(0, Math.floor(Di.getMaximumWidth(n))),
          r = Math.max(0, Math.floor(a ? o / a : Di.getMaximumHeight(n)));
        if (
          (e.width !== o || e.height !== r) &&
          ((n.width = e.width = o),
          (n.height = e.height = r),
          (n.style.width = o + "px"),
          (n.style.height = r + "px"),
          Di.retinaScale(e, i.devicePixelRatio),
          !t)
        ) {
          var s = { width: o, height: r };
          Hn.notify(e, "resize", [s]),
            i.onResize && i.onResize(e, s),
            e.stop(),
            e.update({ duration: i.responsiveAnimationDuration });
        }
      },
      ensureScalesHaveIDs: function () {
        var t = this.options,
          e = t.scales || {},
          i = t.scale;
        Di.each(e.xAxes, function (t, i) {
          t.id || (t.id = Rt(e.xAxes, "x-axis-", i));
        }),
          Di.each(e.yAxes, function (t, i) {
            t.id || (t.id = Rt(e.yAxes, "y-axis-", i));
          }),
          i && (i.id = i.id || "scale");
      },
      buildOrUpdateScales: function () {
        var t = this,
          e = t.options,
          i = t.scales || {},
          n = [],
          a = Object.keys(i).reduce(function (t, e) {
            return (t[e] = !1), t;
          }, {});
        e.scales &&
          (n = n.concat(
            (e.scales.xAxes || []).map(function (t) {
              return { options: t, dtype: "category", dposition: "bottom" };
            }),
            (e.scales.yAxes || []).map(function (t) {
              return { options: t, dtype: "linear", dposition: "left" };
            })
          )),
          e.scale &&
            n.push({
              options: e.scale,
              dtype: "radialLinear",
              isDefault: !0,
              dposition: "chartArea",
            }),
          Di.each(n, function (e) {
            var n = e.options,
              o = n.id,
              r = Qn(n.type, e.dtype);
            Vt(n.position) !== Vt(e.dposition) && (n.position = e.dposition),
              (a[o] = !0);
            var s = null;
            if (o in i && i[o].type === r)
              (s = i[o]), (s.options = n), (s.ctx = t.ctx), (s.chart = t);
            else {
              var l = jn.getScaleConstructor(r);
              if (!l) return;
              (s = new l({ id: o, type: r, options: n, ctx: t.ctx, chart: t })),
                (i[s.id] = s);
            }
            s.mergeTicksOptions(), e.isDefault && (t.scale = s);
          }),
          Di.each(a, function (t, e) {
            t || delete i[e];
          }),
          (t.scales = i),
          jn.addScalesToLayout(this);
      },
      buildOrUpdateControllers: function () {
        var t,
          e,
          i = this,
          n = [],
          a = i.data.datasets;
        for (t = 0, e = a.length; t < e; t++) {
          var o = a[t],
            r = i.getDatasetMeta(t),
            s = o.type || i.config.type;
          if (
            (r.type &&
              r.type !== s &&
              (i.destroyDatasetMeta(t), (r = i.getDatasetMeta(t))),
            (r.type = s),
            (r.order = o.order || 0),
            (r.index = t),
            r.controller)
          )
            r.controller.updateIndex(t), r.controller.linkScales();
          else {
            var l = Mn[r.type];
            if (void 0 === l)
              throw new Error('"' + r.type + '" is not a chart type.');
            (r.controller = new l(i, t)), n.push(r.controller);
          }
        }
        return n;
      },
      resetElements: function () {
        var t = this;
        Di.each(
          t.data.datasets,
          function (e, i) {
            t.getDatasetMeta(i).controller.reset();
          },
          t
        );
      },
      reset: function () {
        this.resetElements(), this.tooltip.initialize();
      },
      update: function (t) {
        var e,
          i,
          n = this;
        if (
          ((t && "object" == typeof t) ||
            (t = { duration: t, lazy: arguments[1] }),
          Lt(n),
          Hn._invalidate(n),
          !1 !== Hn.notify(n, "beforeUpdate"))
        ) {
          n.tooltip._data = n.data;
          var a = n.buildOrUpdateControllers();
          for (e = 0, i = n.data.datasets.length; e < i; e++)
            n.getDatasetMeta(e).controller.buildOrUpdateElements();
          n.updateLayout(),
            n.options.animation &&
              n.options.animation.duration &&
              Di.each(a, function (t) {
                t.reset();
              }),
            n.updateDatasets(),
            n.tooltip.initialize(),
            (n.lastActive = []),
            Hn.notify(n, "afterUpdate"),
            n._layers.sort(Nt("z", "_idx")),
            n._bufferedRender
              ? (n._bufferedRequest = {
                  duration: t.duration,
                  easing: t.easing,
                  lazy: t.lazy,
                })
              : n.render(t);
        }
      },
      updateLayout: function () {
        var t = this;
        !1 !== Hn.notify(t, "beforeLayout") &&
          (Tn.update(this, this.width, this.height),
          (t._layers = []),
          Di.each(
            t.boxes,
            function (e) {
              e._configure && e._configure(),
                t._layers.push.apply(t._layers, e._layers());
            },
            t
          ),
          t._layers.forEach(function (t, e) {
            t._idx = e;
          }),
          Hn.notify(t, "afterScaleUpdate"),
          Hn.notify(t, "afterLayout"));
      },
      updateDatasets: function () {
        var t = this;
        if (!1 !== Hn.notify(t, "beforeDatasetsUpdate")) {
          for (var e = 0, i = t.data.datasets.length; e < i; ++e)
            t.updateDataset(e);
          Hn.notify(t, "afterDatasetsUpdate");
        }
      },
      updateDataset: function (t) {
        var e = this,
          i = e.getDatasetMeta(t),
          n = { meta: i, index: t };
        !1 !== Hn.notify(e, "beforeDatasetUpdate", [n]) &&
          (i.controller._update(), Hn.notify(e, "afterDatasetUpdate", [n]));
      },
      render: function (t) {
        var e = this;
        (t && "object" == typeof t) ||
          (t = { duration: t, lazy: arguments[1] });
        var i = e.options.animation,
          n = Qn(t.duration, i && i.duration),
          a = t.lazy;
        if (!1 !== Hn.notify(e, "beforeRender")) {
          var o = function (t) {
            Hn.notify(e, "afterRender"), Di.callback(i && i.onComplete, [t], e);
          };
          if (i && n) {
            var r = new Li({
              numSteps: n / 16.66,
              easing: t.easing || i.easing,
              render: function (t, e) {
                var i = Di.easing.effects[e.easing],
                  n = e.currentStep,
                  a = n / e.numSteps;
                t.draw(i(a), a, n);
              },
              onAnimationProgress: i.onProgress,
              onAnimationComplete: o,
            });
            Ri.addAnimation(e, r, n, a);
          } else e.draw(), o(new Li({ numSteps: 0, chart: e }));
          return e;
        }
      },
      draw: function (t) {
        var e,
          i,
          n = this;
        if (
          (n.clear(),
          Di.isNullOrUndef(t) && (t = 1),
          n.transition(t),
          !(n.width <= 0 || n.height <= 0) &&
            !1 !== Hn.notify(n, "beforeDraw", [t]))
        ) {
          for (i = n._layers, e = 0; e < i.length && i[e].z <= 0; ++e)
            i[e].draw(n.chartArea);
          for (n.drawDatasets(t); e < i.length; ++e) i[e].draw(n.chartArea);
          n._drawTooltip(t), Hn.notify(n, "afterDraw", [t]);
        }
      },
      transition: function (t) {
        for (
          var e = this, i = 0, n = (e.data.datasets || []).length;
          i < n;
          ++i
        )
          e.isDatasetVisible(i) && e.getDatasetMeta(i).controller.transition(t);
        e.tooltip.transition(t);
      },
      _getSortedDatasetMetas: function (t) {
        var e,
          i,
          n = this,
          a = n.data.datasets || [],
          o = [];
        for (e = 0, i = a.length; e < i; ++e)
          (t && !n.isDatasetVisible(e)) || o.push(n.getDatasetMeta(e));
        return o.sort(Nt("order", "index")), o;
      },
      _getSortedVisibleDatasetMetas: function () {
        return this._getSortedDatasetMetas(!0);
      },
      drawDatasets: function (t) {
        var e,
          i,
          n = this;
        if (!1 !== Hn.notify(n, "beforeDatasetsDraw", [t])) {
          for (
            e = n._getSortedVisibleDatasetMetas(), i = e.length - 1;
            i >= 0;
            --i
          )
            n.drawDataset(e[i], t);
          Hn.notify(n, "afterDatasetsDraw", [t]);
        }
      },
      drawDataset: function (t, e) {
        var i = this,
          n = { meta: t, index: t.index, easingValue: e };
        !1 !== Hn.notify(i, "beforeDatasetDraw", [n]) &&
          (t.controller.draw(e), Hn.notify(i, "afterDatasetDraw", [n]));
      },
      _drawTooltip: function (t) {
        var e = this,
          i = e.tooltip,
          n = { tooltip: i, easingValue: t };
        !1 !== Hn.notify(e, "beforeTooltipDraw", [n]) &&
          (i.draw(), Hn.notify(e, "afterTooltipDraw", [n]));
      },
      getElementAtEvent: function (t) {
        return Dn.modes.single(this, t);
      },
      getElementsAtEvent: function (t) {
        return Dn.modes.label(this, t, { intersect: !0 });
      },
      getElementsAtXAxis: function (t) {
        return Dn.modes["x-axis"](this, t, { intersect: !0 });
      },
      getElementsAtEventForMode: function (t, e, i) {
        var n = Dn.modes[e];
        return "function" == typeof n ? n(this, t, i) : [];
      },
      getDatasetAtEvent: function (t) {
        return Dn.modes.dataset(this, t, { intersect: !0 });
      },
      getDatasetMeta: function (t) {
        var e = this,
          i = e.data.datasets[t];
        i._meta || (i._meta = {});
        var n = i._meta[e.id];
        return (
          n ||
            (n = i._meta[e.id] =
              {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: i.order || 0,
                index: t,
              }),
          n
        );
      },
      getVisibleDatasetCount: function () {
        for (var t = 0, e = 0, i = this.data.datasets.length; e < i; ++e)
          this.isDatasetVisible(e) && t++;
        return t;
      },
      isDatasetVisible: function (t) {
        var e = this.getDatasetMeta(t);
        return "boolean" == typeof e.hidden
          ? !e.hidden
          : !this.data.datasets[t].hidden;
      },
      generateLegend: function () {
        return this.options.legendCallback(this);
      },
      destroyDatasetMeta: function (t) {
        var e = this.id,
          i = this.data.datasets[t],
          n = i._meta && i._meta[e];
        n && (n.controller.destroy(), delete i._meta[e]);
      },
      destroy: function () {
        var t,
          e,
          i = this,
          n = i.canvas;
        for (i.stop(), t = 0, e = i.data.datasets.length; t < e; ++t)
          i.destroyDatasetMeta(t);
        n &&
          (i.unbindEvents(),
          Di.canvas.clear(i),
          Wn.releaseContext(i.ctx),
          (i.canvas = null),
          (i.ctx = null)),
          Hn.notify(i, "destroy"),
          delete Zn.instances[i.id];
      },
      toBase64Image: function () {
        return this.canvas.toDataURL.apply(this.canvas, arguments);
      },
      initToolTip: function () {
        var t = this;
        t.tooltip = new Kn(
          {
            _chart: t,
            _chartInstance: t,
            _data: t.data,
            _options: t.options.tooltips,
          },
          t
        );
      },
      bindEvents: function () {
        var t = this,
          e = (t._listeners = {}),
          i = function () {
            t.eventHandler.apply(t, arguments);
          };
        Di.each(t.options.events, function (n) {
          Wn.addEventListener(t, n, i), (e[n] = i);
        }),
          t.options.responsive &&
            ((i = function () {
              t.resize();
            }),
            Wn.addEventListener(t, "resize", i),
            (e.resize = i));
      },
      unbindEvents: function () {
        var t = this,
          e = t._listeners;
        e &&
          (delete t._listeners,
          Di.each(e, function (e, i) {
            Wn.removeEventListener(t, i, e);
          }));
      },
      updateHoverStyle: function (t, e, i) {
        var n,
          a,
          o,
          r = i ? "set" : "remove";
        for (a = 0, o = t.length; a < o; ++a)
          (n = t[a]) &&
            this.getDatasetMeta(n._datasetIndex).controller[r + "HoverStyle"](
              n
            );
        "dataset" === e &&
          this.getDatasetMeta(t[0]._datasetIndex).controller[
            "_" + r + "DatasetHoverStyle"
          ]();
      },
      eventHandler: function (t) {
        var e = this,
          i = e.tooltip;
        if (!1 !== Hn.notify(e, "beforeEvent", [t])) {
          (e._bufferedRender = !0), (e._bufferedRequest = null);
          var n = e.handleEvent(t);
          i && (n = i._start ? i.handleEvent(t) : n | i.handleEvent(t)),
            Hn.notify(e, "afterEvent", [t]);
          var a = e._bufferedRequest;
          return (
            a
              ? e.render(a)
              : n &&
                !e.animating &&
                (e.stop(),
                e.render({
                  duration: e.options.hover.animationDuration,
                  lazy: !0,
                })),
            (e._bufferedRender = !1),
            (e._bufferedRequest = null),
            e
          );
        }
      },
      handleEvent: function (t) {
        var e = this,
          i = e.options || {},
          n = i.hover,
          a = !1;
        return (
          (e.lastActive = e.lastActive || []),
          "mouseout" === t.type
            ? (e.active = [])
            : (e.active = e.getElementsAtEventForMode(t, n.mode, n)),
          Di.callback(i.onHover || i.hover.onHover, [t.native, e.active], e),
          ("mouseup" !== t.type && "click" !== t.type) ||
            (i.onClick && i.onClick.call(e, t.native, e.active)),
          e.lastActive.length && e.updateHoverStyle(e.lastActive, n.mode, !1),
          e.active.length && n.mode && e.updateHoverStyle(e.active, n.mode, !0),
          (a = !Di.arrayEquals(e.active, e.lastActive)),
          (e.lastActive = e.active),
          a
        );
      },
    }),
      (Zn.instances = {});
    var Jn = Zn;
    (Zn.Controller = Zn),
      (Zn.types = {}),
      (Di.configMerge = Et),
      (Di.scaleMerge = It);
    Di.extend(zt.prototype, {
      formats: Ut,
      parse: Ut,
      format: Ut,
      add: Ut,
      diff: Ut,
      startOf: Ut,
      endOf: Ut,
      _create: function (t) {
        return t;
      },
    }),
      (zt.override = function (t) {
        Di.extend(zt.prototype, t);
      });
    var ta = zt,
      ea = { _date: ta },
      ia = {
        formatters: {
          values: function (t) {
            return Di.isArray(t) ? t : "" + t;
          },
          linear: function (t, e, i) {
            var n = i.length > 3 ? i[2] - i[1] : i[1] - i[0];
            Math.abs(n) > 1 && t !== Math.floor(t) && (n = t - Math.floor(t));
            var a = Di.log10(Math.abs(n)),
              o = "";
            if (0 !== t) {
              if (Math.max(Math.abs(i[0]), Math.abs(i[i.length - 1])) < 1e-4) {
                var r = Di.log10(Math.abs(t)),
                  s = Math.floor(r) - Math.floor(a);
                (s = Math.max(Math.min(s, 20), 0)), (o = t.toExponential(s));
              } else {
                var l = -1 * Math.floor(a);
                (l = Math.max(Math.min(l, 20), 0)), (o = t.toFixed(l));
              }
            } else o = "0";
            return o;
          },
          logarithmic: function (t, e, i) {
            var n = t / Math.pow(10, Math.floor(Di.log10(t)));
            return 0 === t
              ? "0"
              : 1 === n || 2 === n || 5 === n || 0 === e || e === i.length - 1
              ? t.toExponential()
              : "";
          },
        },
      },
      na = Di.isArray,
      aa = Di.isNullOrUndef,
      oa = Di.valueOrDefault,
      ra = Di.valueAtIndexOrDefault;
    gi._set("scale", {
      display: !0,
      position: "left",
      offset: !1,
      gridLines: {
        display: !0,
        color: "rgba(0,0,0,0.1)",
        lineWidth: 1,
        drawBorder: !0,
        drawOnChartArea: !0,
        drawTicks: !0,
        tickMarkLength: 10,
        zeroLineWidth: 1,
        zeroLineColor: "rgba(0,0,0,0.25)",
        zeroLineBorderDash: [],
        zeroLineBorderDashOffset: 0,
        offsetGridLines: !1,
        borderDash: [],
        borderDashOffset: 0,
      },
      scaleLabel: {
        display: !1,
        labelString: "",
        padding: { top: 4, bottom: 4 },
      },
      ticks: {
        beginAtZero: !1,
        minRotation: 0,
        maxRotation: 50,
        mirror: !1,
        padding: 0,
        reverse: !1,
        display: !0,
        autoSkip: !0,
        autoSkipPadding: 0,
        labelOffset: 0,
        callback: ia.formatters.values,
        minor: {},
        major: {},
      },
    });
    var sa = Ei.extend({
      zeroLineIndex: 0,
      getPadding: function () {
        var t = this;
        return {
          left: t.paddingLeft || 0,
          top: t.paddingTop || 0,
          right: t.paddingRight || 0,
          bottom: t.paddingBottom || 0,
        };
      },
      getTicks: function () {
        return this._ticks;
      },
      _getLabels: function () {
        var t = this.chart.data;
        return (
          this.options.labels ||
          (this.isHorizontal() ? t.xLabels : t.yLabels) ||
          t.labels ||
          []
        );
      },
      mergeTicksOptions: function () {},
      beforeUpdate: function () {
        Di.callback(this.options.beforeUpdate, [this]);
      },
      update: function (t, e, i) {
        var n,
          a,
          o,
          r,
          s,
          l = this,
          d = l.options.ticks,
          h = d.sampleSize;
        if (
          (l.beforeUpdate(),
          (l.maxWidth = t),
          (l.maxHeight = e),
          (l.margins = Di.extend({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
          (l._ticks = null),
          (l.ticks = null),
          (l._labelSizes = null),
          (l._maxLabelLines = 0),
          (l.longestLabelWidth = 0),
          (l.longestTextCache = l.longestTextCache || {}),
          (l._gridLineItems = null),
          (l._labelItems = null),
          l.beforeSetDimensions(),
          l.setDimensions(),
          l.afterSetDimensions(),
          l.beforeDataLimits(),
          l.determineDataLimits(),
          l.afterDataLimits(),
          l.beforeBuildTicks(),
          (r = l.buildTicks() || []),
          (!(r = l.afterBuildTicks(r) || r) || !r.length) && l.ticks)
        )
          for (r = [], n = 0, a = l.ticks.length; n < a; ++n)
            r.push({ value: l.ticks[n], major: !1 });
        return (
          (l._ticks = r),
          (s = h < r.length),
          (o = l._convertTicksToLabels(s ? Bt(r, h) : r)),
          l._configure(),
          l.beforeCalculateTickRotation(),
          l.calculateTickRotation(),
          l.afterCalculateTickRotation(),
          l.beforeFit(),
          l.fit(),
          l.afterFit(),
          (l._ticksToDraw =
            d.display && (d.autoSkip || "auto" === d.source)
              ? l._autoSkip(r)
              : r),
          s && (o = l._convertTicksToLabels(l._ticksToDraw)),
          (l.ticks = o),
          l.afterUpdate(),
          l.minSize
        );
      },
      _configure: function () {
        var t,
          e,
          i = this,
          n = i.options.ticks.reverse;
        i.isHorizontal()
          ? ((t = i.left), (e = i.right))
          : ((t = i.top), (e = i.bottom), (n = !n)),
          (i._startPixel = t),
          (i._endPixel = e),
          (i._reversePixels = n),
          (i._length = e - t);
      },
      afterUpdate: function () {
        Di.callback(this.options.afterUpdate, [this]);
      },
      beforeSetDimensions: function () {
        Di.callback(this.options.beforeSetDimensions, [this]);
      },
      setDimensions: function () {
        var t = this;
        t.isHorizontal()
          ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width))
          : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
          (t.paddingLeft = 0),
          (t.paddingTop = 0),
          (t.paddingRight = 0),
          (t.paddingBottom = 0);
      },
      afterSetDimensions: function () {
        Di.callback(this.options.afterSetDimensions, [this]);
      },
      beforeDataLimits: function () {
        Di.callback(this.options.beforeDataLimits, [this]);
      },
      determineDataLimits: Di.noop,
      afterDataLimits: function () {
        Di.callback(this.options.afterDataLimits, [this]);
      },
      beforeBuildTicks: function () {
        Di.callback(this.options.beforeBuildTicks, [this]);
      },
      buildTicks: Di.noop,
      afterBuildTicks: function (t) {
        var e = this;
        return na(t) && t.length
          ? Di.callback(e.options.afterBuildTicks, [e, t])
          : ((e.ticks =
              Di.callback(e.options.afterBuildTicks, [e, e.ticks]) || e.ticks),
            t);
      },
      beforeTickToLabelConversion: function () {
        Di.callback(this.options.beforeTickToLabelConversion, [this]);
      },
      convertTicksToLabels: function () {
        var t = this,
          e = t.options.ticks;
        t.ticks = t.ticks.map(e.userCallback || e.callback, this);
      },
      afterTickToLabelConversion: function () {
        Di.callback(this.options.afterTickToLabelConversion, [this]);
      },
      beforeCalculateTickRotation: function () {
        Di.callback(this.options.beforeCalculateTickRotation, [this]);
      },
      calculateTickRotation: function () {
        var t,
          e,
          i,
          n,
          a,
          o,
          r,
          s = this,
          l = s.options,
          d = l.ticks,
          h = s.getTicks().length,
          u = d.minRotation || 0,
          c = d.maxRotation,
          f = u;
        if (
          !s._isVisible() ||
          !d.display ||
          u >= c ||
          h <= 1 ||
          !s.isHorizontal()
        )
          return void (s.labelRotation = u);
        (t = s._getLabelSizes()),
          (e = t.widest.width),
          (i = t.highest.height - t.highest.offset),
          (n = Math.min(s.maxWidth, s.chart.width - e)),
          (a = l.offset ? s.maxWidth / h : n / (h - 1)),
          e + 6 > a &&
            ((a = n / (h - (l.offset ? 0.5 : 1))),
            (o = s.maxHeight - qt(l.gridLines) - d.padding - $t(l.scaleLabel)),
            (r = Math.sqrt(e * e + i * i)),
            (f = Di.toDegrees(
              Math.min(
                Math.asin(Math.min((t.highest.height + 6) / a, 1)),
                Math.asin(Math.min(o / r, 1)) - Math.asin(i / r)
              )
            )),
            (f = Math.max(u, Math.min(c, f)))),
          (s.labelRotation = f);
      },
      afterCalculateTickRotation: function () {
        Di.callback(this.options.afterCalculateTickRotation, [this]);
      },
      beforeFit: function () {
        Di.callback(this.options.beforeFit, [this]);
      },
      fit: function () {
        var t = this,
          e = (t.minSize = { width: 0, height: 0 }),
          i = t.chart,
          n = t.options,
          a = n.ticks,
          o = n.scaleLabel,
          r = n.gridLines,
          s = t._isVisible(),
          l = "bottom" === n.position,
          d = t.isHorizontal();
        if (
          (d ? (e.width = t.maxWidth) : s && (e.width = qt(r) + $t(o)),
          d ? s && (e.height = qt(r) + $t(o)) : (e.height = t.maxHeight),
          a.display && s)
        ) {
          var h = Xt(a),
            u = t._getLabelSizes(),
            c = u.first,
            f = u.last,
            p = u.widest,
            g = u.highest,
            m = 0.4 * h.minor.lineHeight,
            v = a.padding;
          if (d) {
            var b = 0 !== t.labelRotation,
              y = Di.toRadians(t.labelRotation),
              x = Math.cos(y),
              _ = Math.sin(y),
              w =
                _ * p.width + x * (g.height - (b ? g.offset : 0)) + (b ? 0 : m);
            e.height = Math.min(t.maxHeight, e.height + w + v);
            var k,
              C,
              M = t.getPixelForTick(0) - t.left,
              D = t.right - t.getPixelForTick(t.getTicks().length - 1);
            b
              ? ((k = l
                  ? x * c.width + _ * c.offset
                  : _ * (c.height - c.offset)),
                (C = l
                  ? _ * (f.height - f.offset)
                  : x * f.width + _ * f.offset))
              : ((k = c.width / 2), (C = f.width / 2)),
              (t.paddingLeft =
                Math.max(((k - M) * t.width) / (t.width - M), 0) + 3),
              (t.paddingRight =
                Math.max(((C - D) * t.width) / (t.width - D), 0) + 3);
          } else {
            var S = a.mirror ? 0 : p.width + v + m;
            (e.width = Math.min(t.maxWidth, e.width + S)),
              (t.paddingTop = c.height / 2),
              (t.paddingBottom = f.height / 2);
          }
        }
        t.handleMargins(),
          d
            ? ((t.width = t._length =
                i.width - t.margins.left - t.margins.right),
              (t.height = e.height))
            : ((t.width = e.width),
              (t.height = t._length =
                i.height - t.margins.top - t.margins.bottom));
      },
      handleMargins: function () {
        var t = this;
        t.margins &&
          ((t.margins.left = Math.max(t.paddingLeft, t.margins.left)),
          (t.margins.top = Math.max(t.paddingTop, t.margins.top)),
          (t.margins.right = Math.max(t.paddingRight, t.margins.right)),
          (t.margins.bottom = Math.max(t.paddingBottom, t.margins.bottom)));
      },
      afterFit: function () {
        Di.callback(this.options.afterFit, [this]);
      },
      isHorizontal: function () {
        var t = this.options.position;
        return "top" === t || "bottom" === t;
      },
      isFullWidth: function () {
        return this.options.fullWidth;
      },
      getRightValue: function (t) {
        if (aa(t)) return NaN;
        if (("number" == typeof t || t instanceof Number) && !isFinite(t))
          return NaN;
        if (t)
          if (this.isHorizontal()) {
            if (void 0 !== t.x) return this.getRightValue(t.x);
          } else if (void 0 !== t.y) return this.getRightValue(t.y);
        return t;
      },
      _convertTicksToLabels: function (t) {
        var e,
          i,
          n,
          a = this;
        for (
          a.ticks = t.map(function (t) {
            return t.value;
          }),
            a.beforeTickToLabelConversion(),
            e = a.convertTicksToLabels(t) || a.ticks,
            a.afterTickToLabelConversion(),
            i = 0,
            n = t.length;
          i < n;
          ++i
        )
          t[i].label = e[i];
        return e;
      },
      _getLabelSizes: function () {
        var t = this,
          e = t._labelSizes;
        return (
          e ||
            ((t._labelSizes = e =
              jt(t.ctx, Xt(t.options.ticks), t.getTicks(), t.longestTextCache)),
            (t.longestLabelWidth = e.widest.width)),
          e
        );
      },
      _parseValue: function (t) {
        var e, i, n, a;
        return (
          na(t)
            ? ((e = +this.getRightValue(t[0])),
              (i = +this.getRightValue(t[1])),
              (n = Math.min(e, i)),
              (a = Math.max(e, i)))
            : ((t = +this.getRightValue(t)),
              (e = void 0),
              (i = t),
              (n = t),
              (a = t)),
          { min: n, max: a, start: e, end: i }
        );
      },
      _getScaleLabel: function (t) {
        var e = this._parseValue(t);
        return void 0 !== e.start
          ? "[" + e.start + ", " + e.end + "]"
          : +this.getRightValue(t);
      },
      getLabelForIndex: Di.noop,
      getPixelForValue: Di.noop,
      getValueForPixel: Di.noop,
      getPixelForTick: function (t) {
        var e = this,
          i = e.options.offset,
          n = e._ticks.length,
          a = 1 / Math.max(n - (i ? 0 : 1), 1);
        return t < 0 || t > n - 1
          ? null
          : e.getPixelForDecimal(t * a + (i ? a / 2 : 0));
      },
      getPixelForDecimal: function (t) {
        var e = this;
        return e._reversePixels && (t = 1 - t), e._startPixel + t * e._length;
      },
      getDecimalForPixel: function (t) {
        var e = (t - this._startPixel) / this._length;
        return this._reversePixels ? 1 - e : e;
      },
      getBasePixel: function () {
        return this.getPixelForValue(this.getBaseValue());
      },
      getBaseValue: function () {
        var t = this,
          e = t.min,
          i = t.max;
        return t.beginAtZero ? 0 : e < 0 && i < 0 ? i : e > 0 && i > 0 ? e : 0;
      },
      _autoSkip: function (t) {
        var e,
          i,
          n,
          a,
          o = this,
          r = o.options.ticks,
          s = o._length,
          l = r.maxTicksLimit || s / o._tickSize() + 1,
          d = r.major.enabled ? Zt(t) : [],
          h = d.length,
          u = d[0],
          c = d[h - 1];
        if (h > l) return Jt(t, d, h / l), Gt(t);
        if (((n = Qt(d, t, s, l)), h > 0)) {
          for (e = 0, i = h - 1; e < i; e++) te(t, n, d[e], d[e + 1]);
          return (
            (a = h > 1 ? (c - u) / (h - 1) : null),
            te(t, n, Di.isNullOrUndef(a) ? 0 : u - a, u),
            te(t, n, c, Di.isNullOrUndef(a) ? t.length : c + a),
            Gt(t)
          );
        }
        return te(t, n), Gt(t);
      },
      _tickSize: function () {
        var t = this,
          e = t.options.ticks,
          i = Di.toRadians(t.labelRotation),
          n = Math.abs(Math.cos(i)),
          a = Math.abs(Math.sin(i)),
          o = t._getLabelSizes(),
          r = e.autoSkipPadding || 0,
          s = o ? o.widest.width + r : 0,
          l = o ? o.highest.height + r : 0;
        return t.isHorizontal()
          ? l * n > s * a
            ? s / n
            : l / a
          : l * a < s * n
          ? l / n
          : s / a;
      },
      _isVisible: function () {
        var t,
          e,
          i,
          n = this,
          a = n.chart,
          o = n.options.display;
        if ("auto" !== o) return !!o;
        for (t = 0, e = a.data.datasets.length; t < e; ++t)
          if (
            a.isDatasetVisible(t) &&
            ((i = a.getDatasetMeta(t)),
            i.xAxisID === n.id || i.yAxisID === n.id)
          )
            return !0;
        return !1;
      },
      _computeGridLineItems: function (t) {
        var e,
          i,
          n,
          a,
          o,
          r,
          s,
          l,
          d,
          h,
          u,
          c,
          f,
          p,
          g,
          m,
          v,
          b = this,
          y = b.chart,
          x = b.options,
          _ = x.gridLines,
          w = x.position,
          k = _.offsetGridLines,
          C = b.isHorizontal(),
          M = b._ticksToDraw,
          D = M.length + (k ? 1 : 0),
          S = qt(_),
          T = [],
          F = _.drawBorder ? ra(_.lineWidth, 0, 0) : 0,
          A = F / 2,
          P = Di._alignPixel,
          I = function (t) {
            return P(y, t, F);
          };
        for (
          "top" === w
            ? ((e = I(b.bottom)),
              (s = b.bottom - S),
              (d = e - A),
              (u = I(t.top) + A),
              (f = t.bottom))
            : "bottom" === w
            ? ((e = I(b.top)),
              (u = t.top),
              (f = I(t.bottom) - A),
              (s = e + A),
              (d = b.top + S))
            : "left" === w
            ? ((e = I(b.right)),
              (r = b.right - S),
              (l = e - A),
              (h = I(t.left) + A),
              (c = t.right))
            : ((e = I(b.left)),
              (h = t.left),
              (c = I(t.right) - A),
              (r = e + A),
              (l = b.left + S)),
            i = 0;
          i < D;
          ++i
        )
          (n = M[i] || {}),
            (aa(n.label) && i < M.length) ||
              (i === b.zeroLineIndex && x.offset === k
                ? ((p = _.zeroLineWidth),
                  (g = _.zeroLineColor),
                  (m = _.zeroLineBorderDash || []),
                  (v = _.zeroLineBorderDashOffset || 0))
                : ((p = ra(_.lineWidth, i, 1)),
                  (g = ra(_.color, i, "rgba(0,0,0,0.1)")),
                  (m = _.borderDash || []),
                  (v = _.borderDashOffset || 0)),
              void 0 !== (a = Wt(b, n._index || i, k)) &&
                ((o = P(y, a, p)),
                C ? (r = l = h = c = o) : (s = d = u = f = o),
                T.push({
                  tx1: r,
                  ty1: s,
                  tx2: l,
                  ty2: d,
                  x1: h,
                  y1: u,
                  x2: c,
                  y2: f,
                  width: p,
                  color: g,
                  borderDash: m,
                  borderDashOffset: v,
                })));
        return (T.ticksLength = D), (T.borderValue = e), T;
      },
      _computeLabelItems: function () {
        var t,
          e,
          i,
          n,
          a,
          o,
          r,
          s,
          l,
          d,
          h,
          u,
          c = this,
          f = c.options,
          p = f.ticks,
          g = f.position,
          m = p.mirror,
          v = c.isHorizontal(),
          b = c._ticksToDraw,
          y = Xt(p),
          x = p.padding,
          _ = qt(f.gridLines),
          w = -Di.toRadians(c.labelRotation),
          k = [];
        for (
          "top" === g
            ? ((o = c.bottom - _ - x), (r = w ? "left" : "center"))
            : "bottom" === g
            ? ((o = c.top + _ + x), (r = w ? "right" : "center"))
            : "left" === g
            ? ((a = c.right - (m ? 0 : _) - x), (r = m ? "left" : "right"))
            : ((a = c.left + (m ? 0 : _) + x), (r = m ? "right" : "left")),
            t = 0,
            e = b.length;
          t < e;
          ++t
        )
          (i = b[t]),
            (n = i.label),
            aa(n) ||
              ((s = c.getPixelForTick(i._index || t) + p.labelOffset),
              (l = i.major ? y.major : y.minor),
              (d = l.lineHeight),
              (h = na(n) ? n.length : 1),
              v
                ? ((a = s),
                  (u =
                    "top" === g ? ((w ? 1 : 0.5) - h) * d : (w ? 0 : 0.5) * d))
                : ((o = s), (u = ((1 - h) * d) / 2)),
              k.push({
                x: a,
                y: o,
                rotation: w,
                label: n,
                font: l,
                textOffset: u,
                textAlign: r,
              }));
        return k;
      },
      _drawGrid: function (t) {
        var e = this,
          i = e.options.gridLines;
        if (i.display) {
          var n,
            a,
            o,
            r,
            s,
            l = e.ctx,
            d = e.chart,
            h = Di._alignPixel,
            u = i.drawBorder ? ra(i.lineWidth, 0, 0) : 0,
            c =
              e._gridLineItems ||
              (e._gridLineItems = e._computeGridLineItems(t));
          for (o = 0, r = c.length; o < r; ++o)
            (s = c[o]),
              (n = s.width),
              (a = s.color),
              n &&
                a &&
                (l.save(),
                (l.lineWidth = n),
                (l.strokeStyle = a),
                l.setLineDash &&
                  (l.setLineDash(s.borderDash),
                  (l.lineDashOffset = s.borderDashOffset)),
                l.beginPath(),
                i.drawTicks && (l.moveTo(s.tx1, s.ty1), l.lineTo(s.tx2, s.ty2)),
                i.drawOnChartArea &&
                  (l.moveTo(s.x1, s.y1), l.lineTo(s.x2, s.y2)),
                l.stroke(),
                l.restore());
          if (u) {
            var f,
              p,
              g,
              m,
              v = u,
              b = ra(i.lineWidth, c.ticksLength - 1, 1),
              y = c.borderValue;
            e.isHorizontal()
              ? ((f = h(d, e.left, v) - v / 2),
                (p = h(d, e.right, b) + b / 2),
                (g = m = y))
              : ((g = h(d, e.top, v) - v / 2),
                (m = h(d, e.bottom, b) + b / 2),
                (f = p = y)),
              (l.lineWidth = u),
              (l.strokeStyle = ra(i.color, 0)),
              l.beginPath(),
              l.moveTo(f, g),
              l.lineTo(p, m),
              l.stroke();
          }
        }
      },
      _drawLabels: function () {
        var t = this;
        if (t.options.ticks.display) {
          var e,
            i,
            n,
            a,
            o,
            r,
            s,
            l,
            d = t.ctx,
            h = t._labelItems || (t._labelItems = t._computeLabelItems());
          for (e = 0, n = h.length; e < n; ++e) {
            if (
              ((o = h[e]),
              (r = o.font),
              d.save(),
              d.translate(o.x, o.y),
              d.rotate(o.rotation),
              (d.font = r.string),
              (d.fillStyle = r.color),
              (d.textBaseline = "middle"),
              (d.textAlign = o.textAlign),
              (s = o.label),
              (l = o.textOffset),
              na(s))
            )
              for (i = 0, a = s.length; i < a; ++i)
                d.fillText("" + s[i], 0, l), (l += r.lineHeight);
            else d.fillText(s, 0, l);
            d.restore();
          }
        }
      },
      _drawTitle: function () {
        var t = this,
          e = t.ctx,
          i = t.options,
          n = i.scaleLabel;
        if (n.display) {
          var a,
            o,
            r = oa(n.fontColor, gi.global.defaultFontColor),
            s = Di.options._parseFont(n),
            l = Di.options.toPadding(n.padding),
            d = s.lineHeight / 2,
            h = i.position,
            u = 0;
          if (t.isHorizontal())
            (a = t.left + t.width / 2),
              (o =
                "bottom" === h ? t.bottom - d - l.bottom : t.top + d + l.top);
          else {
            var c = "left" === h;
            (a = c ? t.left + d + l.top : t.right - d - l.top),
              (o = t.top + t.height / 2),
              (u = c ? -0.5 * Math.PI : 0.5 * Math.PI);
          }
          e.save(),
            e.translate(a, o),
            e.rotate(u),
            (e.textAlign = "center"),
            (e.textBaseline = "middle"),
            (e.fillStyle = r),
            (e.font = s.string),
            e.fillText(n.labelString, 0, 0),
            e.restore();
        }
      },
      draw: function (t) {
        var e = this;
        e._isVisible() && (e._drawGrid(t), e._drawTitle(), e._drawLabels());
      },
      _layers: function () {
        var t = this,
          e = t.options,
          i = (e.ticks && e.ticks.z) || 0,
          n = (e.gridLines && e.gridLines.z) || 0;
        return t._isVisible() && i !== n && t.draw === t._draw
          ? [
              {
                z: n,
                draw: function () {
                  t._drawGrid.apply(t, arguments),
                    t._drawTitle.apply(t, arguments);
                },
              },
              {
                z: i,
                draw: function () {
                  t._drawLabels.apply(t, arguments);
                },
              },
            ]
          : [
              {
                z: i,
                draw: function () {
                  t.draw.apply(t, arguments);
                },
              },
            ];
      },
      _getMatchingVisibleMetas: function (t) {
        var e = this,
          i = e.isHorizontal();
        return e.chart._getSortedVisibleDatasetMetas().filter(function (n) {
          return (
            (!t || n.type === t) &&
            (i ? n.xAxisID === e.id : n.yAxisID === e.id)
          );
        });
      },
    });
    sa.prototype._draw = sa.prototype.draw;
    var la = sa,
      da = Di.isNullOrUndef,
      ha = { position: "bottom" },
      ua = la.extend({
        determineDataLimits: function () {
          var t,
            e = this,
            i = e._getLabels(),
            n = e.options.ticks,
            a = n.min,
            o = n.max,
            r = 0,
            s = i.length - 1;
          void 0 !== a && (t = i.indexOf(a)) >= 0 && (r = t),
            void 0 !== o && (t = i.indexOf(o)) >= 0 && (s = t),
            (e.minIndex = r),
            (e.maxIndex = s),
            (e.min = i[r]),
            (e.max = i[s]);
        },
        buildTicks: function () {
          var t = this,
            e = t._getLabels(),
            i = t.minIndex,
            n = t.maxIndex;
          t.ticks = 0 === i && n === e.length - 1 ? e : e.slice(i, n + 1);
        },
        getLabelForIndex: function (t, e) {
          var i = this,
            n = i.chart;
          return n.getDatasetMeta(e).controller._getValueScaleId() === i.id
            ? i.getRightValue(n.data.datasets[e].data[t])
            : i._getLabels()[t];
        },
        _configure: function () {
          var t = this,
            e = t.options.offset,
            i = t.ticks;
          la.prototype._configure.call(t),
            t.isHorizontal() || (t._reversePixels = !t._reversePixels),
            i &&
              ((t._startValue = t.minIndex - (e ? 0.5 : 0)),
              (t._valueRange = Math.max(i.length - (e ? 0 : 1), 1)));
        },
        getPixelForValue: function (t, e, i) {
          var n,
            a,
            o,
            r = this;
          return (
            da(e) || da(i) || (t = r.chart.data.datasets[i].data[e]),
            da(t) || (n = r.isHorizontal() ? t.x : t.y),
            (void 0 !== n || (void 0 !== t && isNaN(e))) &&
              ((a = r._getLabels()),
              (t = Di.valueOrDefault(n, t)),
              (o = a.indexOf(t)),
              (e = -1 !== o ? o : e),
              isNaN(e) && (e = t)),
            r.getPixelForDecimal((e - r._startValue) / r._valueRange)
          );
        },
        getPixelForTick: function (t) {
          var e = this.ticks;
          return t < 0 || t > e.length - 1
            ? null
            : this.getPixelForValue(e[t], t + this.minIndex);
        },
        getValueForPixel: function (t) {
          var e = this,
            i = Math.round(
              e._startValue + e.getDecimalForPixel(t) * e._valueRange
            );
          return Math.min(Math.max(i, 0), e.ticks.length - 1);
        },
        getBasePixel: function () {
          return this.bottom;
        },
      }),
      ca = ha;
    ua._defaults = ca;
    var fa = Di.noop,
      pa = Di.isNullOrUndef,
      ga = la.extend({
        getRightValue: function (t) {
          return "string" == typeof t
            ? +t
            : la.prototype.getRightValue.call(this, t);
        },
        handleTickRangeOptions: function () {
          var t = this,
            e = t.options,
            i = e.ticks;
          if (i.beginAtZero) {
            var n = Di.sign(t.min),
              a = Di.sign(t.max);
            n < 0 && a < 0 ? (t.max = 0) : n > 0 && a > 0 && (t.min = 0);
          }
          var o = void 0 !== i.min || void 0 !== i.suggestedMin,
            r = void 0 !== i.max || void 0 !== i.suggestedMax;
          void 0 !== i.min
            ? (t.min = i.min)
            : void 0 !== i.suggestedMin &&
              (null === t.min
                ? (t.min = i.suggestedMin)
                : (t.min = Math.min(t.min, i.suggestedMin))),
            void 0 !== i.max
              ? (t.max = i.max)
              : void 0 !== i.suggestedMax &&
                (null === t.max
                  ? (t.max = i.suggestedMax)
                  : (t.max = Math.max(t.max, i.suggestedMax))),
            o !== r &&
              t.min >= t.max &&
              (o ? (t.max = t.min + 1) : (t.min = t.max - 1)),
            t.min === t.max && (t.max++, i.beginAtZero || t.min--);
        },
        getTickLimit: function () {
          var t,
            e = this,
            i = e.options.ticks,
            n = i.stepSize,
            a = i.maxTicksLimit;
          return (
            n
              ? (t = Math.ceil(e.max / n) - Math.floor(e.min / n) + 1)
              : ((t = e._computeTickLimit()), (a = a || 11)),
            a && (t = Math.min(a, t)),
            t
          );
        },
        _computeTickLimit: function () {
          return Number.POSITIVE_INFINITY;
        },
        handleDirectionalChanges: fa,
        buildTicks: function () {
          var t = this,
            e = t.options,
            i = e.ticks,
            n = t.getTickLimit();
          n = Math.max(2, n);
          var a = {
              maxTicks: n,
              min: i.min,
              max: i.max,
              precision: i.precision,
              stepSize: Di.valueOrDefault(i.fixedStepSize, i.stepSize),
            },
            o = (t.ticks = ee(a, t));
          t.handleDirectionalChanges(),
            (t.max = Di.max(o)),
            (t.min = Di.min(o)),
            i.reverse
              ? (o.reverse(), (t.start = t.max), (t.end = t.min))
              : ((t.start = t.min), (t.end = t.max));
        },
        convertTicksToLabels: function () {
          var t = this;
          (t.ticksAsNumbers = t.ticks.slice()),
            (t.zeroLineIndex = t.ticks.indexOf(0)),
            la.prototype.convertTicksToLabels.call(t);
        },
        _configure: function () {
          var t,
            e = this,
            i = e.getTicks(),
            n = e.min,
            a = e.max;
          la.prototype._configure.call(e),
            e.options.offset &&
              i.length &&
              ((t = (a - n) / Math.max(i.length - 1, 1) / 2),
              (n -= t),
              (a += t)),
            (e._startValue = n),
            (e._endValue = a),
            (e._valueRange = a - n);
        },
      }),
      ma = { position: "left", ticks: { callback: ia.formatters.linear } },
      va = ga.extend({
        determineDataLimits: function () {
          var t,
            e,
            i,
            n,
            a = this,
            o = a.options,
            r = a.chart,
            s = r.data.datasets,
            l = a._getMatchingVisibleMetas(),
            d = o.stacked,
            h = {},
            u = l.length;
          if (
            ((a.min = Number.POSITIVE_INFINITY),
            (a.max = Number.NEGATIVE_INFINITY),
            void 0 === d)
          )
            for (t = 0; !d && t < u; ++t) (e = l[t]), (d = void 0 !== e.stack);
          for (t = 0; t < u; ++t)
            (e = l[t]), (i = s[e.index].data), d ? ne(a, h, e, i) : ae(a, e, i);
          Di.each(h, function (t) {
            (n = t.pos.concat(t.neg)),
              (a.min = Math.min(a.min, Di.min(n))),
              (a.max = Math.max(a.max, Di.max(n)));
          }),
            (a.min = Di.isFinite(a.min) && !isNaN(a.min) ? a.min : 0),
            (a.max = Di.isFinite(a.max) && !isNaN(a.max) ? a.max : 1),
            a.handleTickRangeOptions();
        },
        _computeTickLimit: function () {
          var t,
            e = this;
          return e.isHorizontal()
            ? Math.ceil(e.width / 40)
            : ((t = Di.options._parseFont(e.options.ticks)),
              Math.ceil(e.height / t.lineHeight));
        },
        handleDirectionalChanges: function () {
          this.isHorizontal() || this.ticks.reverse();
        },
        getLabelForIndex: function (t, e) {
          return this._getScaleLabel(this.chart.data.datasets[e].data[t]);
        },
        getPixelForValue: function (t) {
          var e = this;
          return e.getPixelForDecimal(
            (+e.getRightValue(t) - e._startValue) / e._valueRange
          );
        },
        getValueForPixel: function (t) {
          return (
            this._startValue + this.getDecimalForPixel(t) * this._valueRange
          );
        },
        getPixelForTick: function (t) {
          var e = this.ticksAsNumbers;
          return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t]);
        },
      }),
      ba = ma;
    va._defaults = ba;
    var ya = Di.valueOrDefault,
      xa = Di.math.log10,
      _a = { position: "left", ticks: { callback: ia.formatters.logarithmic } },
      wa = la.extend({
        determineDataLimits: function () {
          function t(t) {
            return u ? t.xAxisID === s.id : t.yAxisID === s.id;
          }
          var e,
            i,
            n,
            a,
            o,
            r,
            s = this,
            l = s.options,
            d = s.chart,
            h = d.data.datasets,
            u = s.isHorizontal();
          (s.min = Number.POSITIVE_INFINITY),
            (s.max = Number.NEGATIVE_INFINITY),
            (s.minNotZero = Number.POSITIVE_INFINITY);
          var c = l.stacked;
          if (void 0 === c)
            for (e = 0; e < h.length; e++)
              if (
                ((i = d.getDatasetMeta(e)),
                d.isDatasetVisible(e) && t(i) && void 0 !== i.stack)
              ) {
                c = !0;
                break;
              }
          if (l.stacked || c) {
            var f = {};
            for (e = 0; e < h.length; e++) {
              i = d.getDatasetMeta(e);
              var p = [
                i.type,
                void 0 === l.stacked && void 0 === i.stack ? e : "",
                i.stack,
              ].join(".");
              if (d.isDatasetVisible(e) && t(i))
                for (
                  void 0 === f[p] && (f[p] = []),
                    a = h[e].data,
                    o = 0,
                    r = a.length;
                  o < r;
                  o++
                ) {
                  var g = f[p];
                  (n = s._parseValue(a[o])),
                    isNaN(n.min) ||
                      isNaN(n.max) ||
                      i.data[o].hidden ||
                      n.min < 0 ||
                      n.max < 0 ||
                      ((g[o] = g[o] || 0), (g[o] += n.max));
                }
            }
            Di.each(f, function (t) {
              if (t.length > 0) {
                var e = Di.min(t),
                  i = Di.max(t);
                (s.min = Math.min(s.min, e)), (s.max = Math.max(s.max, i));
              }
            });
          } else
            for (e = 0; e < h.length; e++)
              if (((i = d.getDatasetMeta(e)), d.isDatasetVisible(e) && t(i)))
                for (a = h[e].data, o = 0, r = a.length; o < r; o++)
                  (n = s._parseValue(a[o])),
                    isNaN(n.min) ||
                      isNaN(n.max) ||
                      i.data[o].hidden ||
                      n.min < 0 ||
                      n.max < 0 ||
                      ((s.min = Math.min(n.min, s.min)),
                      (s.max = Math.max(n.max, s.max)),
                      0 !== n.min &&
                        (s.minNotZero = Math.min(n.min, s.minNotZero)));
          (s.min = Di.isFinite(s.min) ? s.min : null),
            (s.max = Di.isFinite(s.max) ? s.max : null),
            (s.minNotZero = Di.isFinite(s.minNotZero) ? s.minNotZero : null),
            this.handleTickRangeOptions();
        },
        handleTickRangeOptions: function () {
          var t = this,
            e = t.options.ticks;
          (t.min = re(e.min, t.min)),
            (t.max = re(e.max, t.max)),
            t.min === t.max &&
              (0 !== t.min && null !== t.min
                ? ((t.min = Math.pow(10, Math.floor(xa(t.min)) - 1)),
                  (t.max = Math.pow(10, Math.floor(xa(t.max)) + 1)))
                : ((t.min = 1), (t.max = 10))),
            null === t.min && (t.min = Math.pow(10, Math.floor(xa(t.max)) - 1)),
            null === t.max &&
              (t.max =
                0 !== t.min ? Math.pow(10, Math.floor(xa(t.min)) + 1) : 10),
            null === t.minNotZero &&
              (t.min > 0
                ? (t.minNotZero = t.min)
                : t.max < 1
                ? (t.minNotZero = Math.pow(10, Math.floor(xa(t.max))))
                : (t.minNotZero = 1));
        },
        buildTicks: function () {
          var t = this,
            e = t.options.ticks,
            i = !t.isHorizontal(),
            n = { min: re(e.min), max: re(e.max) },
            a = (t.ticks = oe(n, t));
          (t.max = Di.max(a)),
            (t.min = Di.min(a)),
            e.reverse
              ? ((i = !i), (t.start = t.max), (t.end = t.min))
              : ((t.start = t.min), (t.end = t.max)),
            i && a.reverse();
        },
        convertTicksToLabels: function () {
          (this.tickValues = this.ticks.slice()),
            la.prototype.convertTicksToLabels.call(this);
        },
        getLabelForIndex: function (t, e) {
          return this._getScaleLabel(this.chart.data.datasets[e].data[t]);
        },
        getPixelForTick: function (t) {
          var e = this.tickValues;
          return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t]);
        },
        _getFirstTickValue: function (t) {
          var e = Math.floor(xa(t));
          return Math.floor(t / Math.pow(10, e)) * Math.pow(10, e);
        },
        _configure: function () {
          var t = this,
            e = t.min,
            i = 0;
          la.prototype._configure.call(t),
            0 === e &&
              ((e = t._getFirstTickValue(t.minNotZero)),
              (i =
                ya(t.options.ticks.fontSize, gi.global.defaultFontSize) /
                t._length)),
            (t._startValue = xa(e)),
            (t._valueOffset = i),
            (t._valueRange = (xa(t.max) - xa(e)) / (1 - i));
        },
        getPixelForValue: function (t) {
          var e = this,
            i = 0;
          return (
            (t = +e.getRightValue(t)),
            t > e.min &&
              t > 0 &&
              (i = (xa(t) - e._startValue) / e._valueRange + e._valueOffset),
            e.getPixelForDecimal(i)
          );
        },
        getValueForPixel: function (t) {
          var e = this,
            i = e.getDecimalForPixel(t);
          return 0 === i && 0 === e.min
            ? 0
            : Math.pow(
                10,
                e._startValue + (i - e._valueOffset) * e._valueRange
              );
        },
      }),
      ka = _a;
    wa._defaults = ka;
    var Ca = Di.valueOrDefault,
      Ma = Di.valueAtIndexOrDefault,
      Da = Di.options.resolve,
      Sa = {
        display: !0,
        animate: !0,
        position: "chartArea",
        angleLines: {
          display: !0,
          color: "rgba(0,0,0,0.1)",
          lineWidth: 1,
          borderDash: [],
          borderDashOffset: 0,
        },
        gridLines: { circular: !1 },
        ticks: {
          showLabelBackdrop: !0,
          backdropColor: "rgba(255,255,255,0.75)",
          backdropPaddingY: 2,
          backdropPaddingX: 2,
          callback: ia.formatters.linear,
        },
        pointLabels: {
          display: !0,
          fontSize: 10,
          callback: function (t) {
            return t;
          },
        },
      },
      Ta = ga.extend({
        setDimensions: function () {
          var t = this;
          (t.width = t.maxWidth),
            (t.height = t.maxHeight),
            (t.paddingTop = se(t.options) / 2),
            (t.xCenter = Math.floor(t.width / 2)),
            (t.yCenter = Math.floor((t.height - t.paddingTop) / 2)),
            (t.drawingArea = Math.min(t.height - t.paddingTop, t.width) / 2);
        },
        determineDataLimits: function () {
          var t = this,
            e = t.chart,
            i = Number.POSITIVE_INFINITY,
            n = Number.NEGATIVE_INFINITY;
          Di.each(e.data.datasets, function (a, o) {
            if (e.isDatasetVisible(o)) {
              var r = e.getDatasetMeta(o);
              Di.each(a.data, function (e, a) {
                var o = +t.getRightValue(e);
                isNaN(o) ||
                  r.data[a].hidden ||
                  ((i = Math.min(o, i)), (n = Math.max(o, n)));
              });
            }
          }),
            (t.min = i === Number.POSITIVE_INFINITY ? 0 : i),
            (t.max = n === Number.NEGATIVE_INFINITY ? 0 : n),
            t.handleTickRangeOptions();
        },
        _computeTickLimit: function () {
          return Math.ceil(this.drawingArea / se(this.options));
        },
        convertTicksToLabels: function () {
          var t = this;
          ga.prototype.convertTicksToLabels.call(t),
            (t.pointLabels = t.chart.data.labels.map(function () {
              var e = Di.callback(t.options.pointLabels.callback, arguments, t);
              return e || 0 === e ? e : "";
            }));
        },
        getLabelForIndex: function (t, e) {
          return +this.getRightValue(this.chart.data.datasets[e].data[t]);
        },
        fit: function () {
          var t = this,
            e = t.options;
          e.display && e.pointLabels.display
            ? he(t)
            : t.setCenterPoint(0, 0, 0, 0);
        },
        setReductions: function (t, e, i) {
          var n = this,
            a = e.l / Math.sin(i.l),
            o = Math.max(e.r - n.width, 0) / Math.sin(i.r),
            r = -e.t / Math.cos(i.t),
            s = -Math.max(e.b - (n.height - n.paddingTop), 0) / Math.cos(i.b);
          (a = me(a)),
            (o = me(o)),
            (r = me(r)),
            (s = me(s)),
            (n.drawingArea = Math.min(
              Math.floor(t - (a + o) / 2),
              Math.floor(t - (r + s) / 2)
            )),
            n.setCenterPoint(a, o, r, s);
        },
        setCenterPoint: function (t, e, i, n) {
          var a = this,
            o = a.width - e - a.drawingArea,
            r = t + a.drawingArea,
            s = i + a.drawingArea,
            l = a.height - a.paddingTop - n - a.drawingArea;
          (a.xCenter = Math.floor((r + o) / 2 + a.left)),
            (a.yCenter = Math.floor((s + l) / 2 + a.top + a.paddingTop));
        },
        getIndexAngle: function (t) {
          var e = this.chart,
            i = 360 / e.data.labels.length,
            n = e.options || {},
            a = n.startAngle || 0,
            o = (t * i + a) % 360;
          return ((o < 0 ? o + 360 : o) * Math.PI * 2) / 360;
        },
        getDistanceFromCenterForValue: function (t) {
          var e = this;
          if (Di.isNullOrUndef(t)) return NaN;
          var i = e.drawingArea / (e.max - e.min);
          return e.options.ticks.reverse ? (e.max - t) * i : (t - e.min) * i;
        },
        getPointPosition: function (t, e) {
          var i = this,
            n = i.getIndexAngle(t) - Math.PI / 2;
          return {
            x: Math.cos(n) * e + i.xCenter,
            y: Math.sin(n) * e + i.yCenter,
          };
        },
        getPointPositionForValue: function (t, e) {
          return this.getPointPosition(
            t,
            this.getDistanceFromCenterForValue(e)
          );
        },
        getBasePosition: function (t) {
          var e = this,
            i = e.min,
            n = e.max;
          return e.getPointPositionForValue(
            t || 0,
            e.beginAtZero ? 0 : i < 0 && n < 0 ? n : i > 0 && n > 0 ? i : 0
          );
        },
        _drawGrid: function () {
          var t,
            e,
            i,
            n = this,
            a = n.ctx,
            o = n.options,
            r = o.gridLines,
            s = o.angleLines,
            l = Ca(s.lineWidth, r.lineWidth),
            d = Ca(s.color, r.color);
          if (
            (o.pointLabels.display && pe(n),
            r.display &&
              Di.each(n.ticks, function (t, i) {
                0 !== i &&
                  ((e = n.getDistanceFromCenterForValue(n.ticksAsNumbers[i])),
                  ge(n, r, e, i));
              }),
            s.display && l && d)
          ) {
            for (
              a.save(),
                a.lineWidth = l,
                a.strokeStyle = d,
                a.setLineDash &&
                  (a.setLineDash(Da([s.borderDash, r.borderDash, []])),
                  (a.lineDashOffset = Da([
                    s.borderDashOffset,
                    r.borderDashOffset,
                    0,
                  ]))),
                t = n.chart.data.labels.length - 1;
              t >= 0;
              t--
            )
              (e = n.getDistanceFromCenterForValue(
                o.ticks.reverse ? n.min : n.max
              )),
                (i = n.getPointPosition(t, e)),
                a.beginPath(),
                a.moveTo(n.xCenter, n.yCenter),
                a.lineTo(i.x, i.y),
                a.stroke();
            a.restore();
          }
        },
        _drawLabels: function () {
          var t = this,
            e = t.ctx,
            i = t.options,
            n = i.ticks;
          if (n.display) {
            var a,
              o,
              r = t.getIndexAngle(0),
              s = Di.options._parseFont(n),
              l = Ca(n.fontColor, gi.global.defaultFontColor);
            e.save(),
              (e.font = s.string),
              e.translate(t.xCenter, t.yCenter),
              e.rotate(r),
              (e.textAlign = "center"),
              (e.textBaseline = "middle"),
              Di.each(t.ticks, function (i, r) {
                (0 !== r || n.reverse) &&
                  ((a = t.getDistanceFromCenterForValue(t.ticksAsNumbers[r])),
                  n.showLabelBackdrop &&
                    ((o = e.measureText(i).width),
                    (e.fillStyle = n.backdropColor),
                    e.fillRect(
                      -o / 2 - n.backdropPaddingX,
                      -a - s.size / 2 - n.backdropPaddingY,
                      o + 2 * n.backdropPaddingX,
                      s.size + 2 * n.backdropPaddingY
                    )),
                  (e.fillStyle = l),
                  e.fillText(i, 0, -a));
              }),
              e.restore();
          }
        },
        _drawTitle: Di.noop,
      }),
      Fa = Sa;
    Ta._defaults = Fa;
    var Aa = Di._deprecated,
      Pa = Di.options.resolve,
      Ia = Di.valueOrDefault,
      Ea = Number.MIN_SAFE_INTEGER || -9007199254740991,
      Oa = Number.MAX_SAFE_INTEGER || 9007199254740991,
      La = {
        millisecond: { common: !0, size: 1, steps: 1e3 },
        second: { common: !0, size: 1e3, steps: 60 },
        minute: { common: !0, size: 6e4, steps: 60 },
        hour: { common: !0, size: 36e5, steps: 24 },
        day: { common: !0, size: 864e5, steps: 30 },
        week: { common: !1, size: 6048e5, steps: 4 },
        month: { common: !0, size: 2628e6, steps: 12 },
        quarter: { common: !1, size: 7884e6, steps: 4 },
        year: { common: !0, size: 3154e7 },
      },
      Ra = Object.keys(La),
      Va = {
        position: "bottom",
        distribution: "linear",
        bounds: "data",
        adapters: {},
        time: {
          parser: !1,
          unit: !1,
          round: !1,
          displayFormat: !1,
          isoWeekday: !1,
          minUnit: "millisecond",
          displayFormats: {},
        },
        ticks: { autoSkip: !1, source: "auto", major: { enabled: !1 } },
      },
      Na = la.extend({
        initialize: function () {
          this.mergeTicksOptions(), la.prototype.initialize.call(this);
        },
        update: function () {
          var t = this,
            e = t.options,
            i = e.time || (e.time = {}),
            n = (t._adapter = new ea._date(e.adapters.date));
          return (
            Aa("time scale", i.format, "time.format", "time.parser"),
            Aa("time scale", i.min, "time.min", "ticks.min"),
            Aa("time scale", i.max, "time.max", "ticks.max"),
            Di.mergeIf(i.displayFormats, n.formats()),
            la.prototype.update.apply(t, arguments)
          );
        },
        getRightValue: function (t) {
          return (
            t && void 0 !== t.t && (t = t.t),
            la.prototype.getRightValue.call(this, t)
          );
        },
        determineDataLimits: function () {
          var t,
            e,
            i,
            n,
            a,
            o,
            r,
            s = this,
            l = s.chart,
            d = s._adapter,
            h = s.options,
            u = h.time.unit || "day",
            c = Oa,
            f = Ea,
            p = [],
            g = [],
            m = [],
            v = s._getLabels();
          for (t = 0, i = v.length; t < i; ++t) m.push(Me(s, v[t]));
          for (t = 0, i = (l.data.datasets || []).length; t < i; ++t)
            if (l.isDatasetVisible(t))
              if (((a = l.data.datasets[t].data), Di.isObject(a[0])))
                for (g[t] = [], e = 0, n = a.length; e < n; ++e)
                  (o = Me(s, a[e])), p.push(o), (g[t][e] = o);
              else (g[t] = m.slice(0)), r || ((p = p.concat(m)), (r = !0));
            else g[t] = [];
          m.length &&
            ((c = Math.min(c, m[0])), (f = Math.max(f, m[m.length - 1]))),
            p.length &&
              ((p = i > 1 ? be(p).sort(ve) : p.sort(ve)),
              (c = Math.min(c, p[0])),
              (f = Math.max(f, p[p.length - 1]))),
            (c = Me(s, ye(h)) || c),
            (f = Me(s, xe(h)) || f),
            (c = c === Oa ? +d.startOf(Date.now(), u) : c),
            (f = f === Ea ? +d.endOf(Date.now(), u) + 1 : f),
            (s.min = Math.min(c, f)),
            (s.max = Math.max(c + 1, f)),
            (s._table = []),
            (s._timestamps = { data: p, datasets: g, labels: m });
        },
        buildTicks: function () {
          var t,
            e,
            i,
            n = this,
            a = n.min,
            o = n.max,
            r = n.options,
            s = r.ticks,
            l = r.time,
            d = n._timestamps,
            h = [],
            u = n.getLabelCapacity(a),
            c = s.source,
            f = r.distribution;
          for (
            d =
              "data" === c || ("auto" === c && "series" === f)
                ? d.data
                : "labels" === c
                ? d.labels
                : Fe(n, a, o, u),
              "ticks" === r.bounds &&
                d.length &&
                ((a = d[0]), (o = d[d.length - 1])),
              a = Me(n, ye(r)) || a,
              o = Me(n, xe(r)) || o,
              t = 0,
              e = d.length;
            t < e;
            ++t
          )
            (i = d[t]) >= a && i <= o && h.push(i);
          return (
            (n.min = a),
            (n.max = o),
            (n._unit =
              l.unit ||
              (s.autoSkip
                ? De(l.minUnit, n.min, n.max, u)
                : Se(n, h.length, l.minUnit, n.min, n.max))),
            (n._majorUnit =
              s.major.enabled && "year" !== n._unit ? Te(n._unit) : void 0),
            (n._table = _e(n._timestamps.data, a, o, f)),
            (n._offsets = Ae(n._table, h, a, o, r)),
            s.reverse && h.reverse(),
            Ie(n, h, n._majorUnit)
          );
        },
        getLabelForIndex: function (t, e) {
          var i = this,
            n = i._adapter,
            a = i.chart.data,
            o = i.options.time,
            r = a.labels && t < a.labels.length ? a.labels[t] : "",
            s = a.datasets[e].data[t];
          return (
            Di.isObject(s) && (r = i.getRightValue(s)),
            o.tooltipFormat
              ? n.format(Ce(i, r), o.tooltipFormat)
              : "string" == typeof r
              ? r
              : n.format(Ce(i, r), o.displayFormats.datetime)
          );
        },
        tickFormatFunction: function (t, e, i, n) {
          var a = this,
            o = a._adapter,
            r = a.options,
            s = r.time.displayFormats,
            l = s[a._unit],
            d = a._majorUnit,
            h = s[d],
            u = i[e],
            c = r.ticks,
            f = d && h && u && u.major,
            p = o.format(t, n || (f ? h : l)),
            g = f ? c.major : c.minor,
            m = Pa([g.callback, g.userCallback, c.callback, c.userCallback]);
          return m ? m(p, e, i) : p;
        },
        convertTicksToLabels: function (t) {
          var e,
            i,
            n = [];
          for (e = 0, i = t.length; e < i; ++e)
            n.push(this.tickFormatFunction(t[e].value, e, t));
          return n;
        },
        getPixelForOffset: function (t) {
          var e = this,
            i = e._offsets,
            n = ke(e._table, "time", t, "pos");
          return e.getPixelForDecimal((i.start + n) * i.factor);
        },
        getPixelForValue: function (t, e, i) {
          var n = this,
            a = null;
          if (
            (void 0 !== e && void 0 !== i && (a = n._timestamps.datasets[i][e]),
            null === a && (a = Me(n, t)),
            null !== a)
          )
            return n.getPixelForOffset(a);
        },
        getPixelForTick: function (t) {
          var e = this.getTicks();
          return t >= 0 && t < e.length
            ? this.getPixelForOffset(e[t].value)
            : null;
        },
        getValueForPixel: function (t) {
          var e = this,
            i = e._offsets,
            n = e.getDecimalForPixel(t) / i.factor - i.end,
            a = ke(e._table, "pos", n, "time");
          return e._adapter._create(a);
        },
        _getLabelSize: function (t) {
          var e = this,
            i = e.options.ticks,
            n = e.ctx.measureText(t).width,
            a = Di.toRadians(e.isHorizontal() ? i.maxRotation : i.minRotation),
            o = Math.cos(a),
            r = Math.sin(a),
            s = Ia(i.fontSize, gi.global.defaultFontSize);
          return { w: n * o + s * r, h: n * r + s * o };
        },
        getLabelWidth: function (t) {
          return this._getLabelSize(t).w;
        },
        getLabelCapacity: function (t) {
          var e = this,
            i = e.options.time,
            n = i.displayFormats,
            a = n[i.unit] || n.millisecond,
            o = e.tickFormatFunction(t, 0, Ie(e, [t], e._majorUnit), a),
            r = e._getLabelSize(o),
            s = Math.floor(e.isHorizontal() ? e.width / r.w : e.height / r.h);
          return e.options.offset && s--, s > 0 ? s : 1;
        },
      }),
      Ua = Va;
    Na._defaults = Ua;
    var za = {
        category: ua,
        linear: va,
        logarithmic: wa,
        radialLinear: Ta,
        time: Na,
      },
      Ba = {
        datetime: "MMM D, YYYY, h:mm:ss a",
        millisecond: "h:mm:ss.SSS a",
        second: "h:mm:ss a",
        minute: "h:mm a",
        hour: "hA",
        day: "MMM D",
        week: "ll",
        month: "MMM YYYY",
        quarter: "[Q]Q - YYYY",
        year: "YYYY",
      };
    ea._date.override(
      "function" == typeof t
        ? {
            _id: "moment",
            formats: function () {
              return Ba;
            },
            parse: function (e, i) {
              return (
                "string" == typeof e && "string" == typeof i
                  ? (e = t(e, i))
                  : e instanceof t || (e = t(e)),
                e.isValid() ? e.valueOf() : null
              );
            },
            format: function (e, i) {
              return t(e).format(i);
            },
            add: function (e, i, n) {
              return t(e).add(i, n).valueOf();
            },
            diff: function (e, i, n) {
              return t(e).diff(t(i), n);
            },
            startOf: function (e, i, n) {
              return (
                (e = t(e)),
                "isoWeek" === i
                  ? e.isoWeekday(n).valueOf()
                  : e.startOf(i).valueOf()
              );
            },
            endOf: function (e, i) {
              return t(e).endOf(i).valueOf();
            },
            _create: function (e) {
              return t(e);
            },
          }
        : {}
    ),
      gi._set("global", { plugins: { filler: { propagate: !0 } } });
    var Wa = {
        dataset: function (t) {
          var e = t.fill,
            i = t.chart,
            n = i.getDatasetMeta(e),
            a = n && i.isDatasetVisible(e),
            o = (a && n.dataset._children) || [],
            r = o.length || 0;
          return r
            ? function (t, e) {
                return (e < r && o[e]._view) || null;
              }
            : null;
        },
        boundary: function (t) {
          var e = t.boundary,
            i = e ? e.x : null,
            n = e ? e.y : null;
          return Di.isArray(e)
            ? function (t, i) {
                return e[i];
              }
            : function (t) {
                return { x: null === i ? t.x : i, y: null === n ? t.y : n };
              };
        },
      },
      Ha = {
        id: "filler",
        afterDatasetsUpdate: function (t, e) {
          var i,
            n,
            a,
            o,
            r = (t.data.datasets || []).length,
            s = e.propagate,
            l = [];
          for (n = 0; n < r; ++n)
            (i = t.getDatasetMeta(n)),
              (a = i.dataset),
              (o = null),
              a &&
                a._model &&
                a instanceof Qi.Line &&
                (o = {
                  visible: t.isDatasetVisible(n),
                  fill: Ee(a, n, r),
                  chart: t,
                  el: a,
                }),
              (i.$filler = o),
              l.push(o);
          for (n = 0; n < r; ++n)
            (o = l[n]) &&
              ((o.fill = Ve(l, n, s)),
              (o.boundary = Re(o)),
              (o.mapper = Ne(o)));
        },
        beforeDatasetsDraw: function (t) {
          var e,
            i,
            n,
            a,
            o,
            r,
            s,
            l = t._getSortedVisibleDatasetMetas(),
            d = t.ctx;
          for (i = l.length - 1; i >= 0; --i)
            (e = l[i].$filler) &&
              e.visible &&
              ((n = e.el),
              (a = n._view),
              (o = n._children || []),
              (r = e.mapper),
              (s = a.backgroundColor || gi.global.defaultColor),
              r &&
                s &&
                o.length &&
                (Di.canvas.clipArea(d, t.chartArea),
                Be(d, o, r, a, s, n._loop),
                Di.canvas.unclipArea(d)));
        },
      },
      ja = Di.rtl.getRtlAdapter,
      qa = Di.noop,
      $a = Di.valueOrDefault;
    gi._set("global", {
      legend: {
        display: !0,
        position: "top",
        align: "center",
        fullWidth: !0,
        reverse: !1,
        weight: 1e3,
        onClick: function (t, e) {
          var i = e.datasetIndex,
            n = this.chart,
            a = n.getDatasetMeta(i);
          (a.hidden = null === a.hidden ? !n.data.datasets[i].hidden : null),
            n.update();
        },
        onHover: null,
        onLeave: null,
        labels: {
          boxWidth: 40,
          padding: 10,
          generateLabels: function (t) {
            var e = t.data.datasets,
              i = t.options.legend || {},
              n = i.labels && i.labels.usePointStyle;
            return t._getSortedDatasetMetas().map(function (i) {
              var a = i.controller.getStyle(n ? 0 : void 0);
              return {
                text: e[i.index].label,
                fillStyle: a.backgroundColor,
                hidden: !t.isDatasetVisible(i.index),
                lineCap: a.borderCapStyle,
                lineDash: a.borderDash,
                lineDashOffset: a.borderDashOffset,
                lineJoin: a.borderJoinStyle,
                lineWidth: a.borderWidth,
                strokeStyle: a.borderColor,
                pointStyle: a.pointStyle,
                rotation: a.rotation,
                datasetIndex: i.index,
              };
            }, this);
          },
        },
      },
      legendCallback: function (t) {
        var e,
          i,
          n,
          a,
          o = document.createElement("ul"),
          r = t.data.datasets;
        for (
          o.setAttribute("class", t.id + "-legend"), e = 0, i = r.length;
          e < i;
          e++
        )
          (n = o.appendChild(document.createElement("li"))),
            (a = n.appendChild(document.createElement("span"))),
            (a.style.backgroundColor = r[e].backgroundColor),
            r[e].label && n.appendChild(document.createTextNode(r[e].label));
        return o.outerHTML;
      },
    });
    var Ya = Ei.extend({
        initialize: function (t) {
          var e = this;
          Di.extend(e, t),
            (e.legendHitBoxes = []),
            (e._hoveredItem = null),
            (e.doughnutMode = !1);
        },
        beforeUpdate: qa,
        update: function (t, e, i) {
          var n = this;
          return (
            n.beforeUpdate(),
            (n.maxWidth = t),
            (n.maxHeight = e),
            (n.margins = i),
            n.beforeSetDimensions(),
            n.setDimensions(),
            n.afterSetDimensions(),
            n.beforeBuildLabels(),
            n.buildLabels(),
            n.afterBuildLabels(),
            n.beforeFit(),
            n.fit(),
            n.afterFit(),
            n.afterUpdate(),
            n.minSize
          );
        },
        afterUpdate: qa,
        beforeSetDimensions: qa,
        setDimensions: function () {
          var t = this;
          t.isHorizontal()
            ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width))
            : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
            (t.paddingLeft = 0),
            (t.paddingTop = 0),
            (t.paddingRight = 0),
            (t.paddingBottom = 0),
            (t.minSize = { width: 0, height: 0 });
        },
        afterSetDimensions: qa,
        beforeBuildLabels: qa,
        buildLabels: function () {
          var t = this,
            e = t.options.labels || {},
            i = Di.callback(e.generateLabels, [t.chart], t) || [];
          e.filter &&
            (i = i.filter(function (i) {
              return e.filter(i, t.chart.data);
            })),
            t.options.reverse && i.reverse(),
            (t.legendItems = i);
        },
        afterBuildLabels: qa,
        beforeFit: qa,
        fit: function () {
          var t = this,
            e = t.options,
            i = e.labels,
            n = e.display,
            a = t.ctx,
            o = Di.options._parseFont(i),
            r = o.size,
            s = (t.legendHitBoxes = []),
            l = t.minSize,
            d = t.isHorizontal();
          if (
            (d
              ? ((l.width = t.maxWidth), (l.height = n ? 10 : 0))
              : ((l.width = n ? 10 : 0), (l.height = t.maxHeight)),
            !n)
          )
            return void (t.width = l.width = t.height = l.height = 0);
          if (((a.font = o.string), d)) {
            var h = (t.lineWidths = [0]),
              u = 0;
            (a.textAlign = "left"),
              (a.textBaseline = "middle"),
              Di.each(t.legendItems, function (t, e) {
                var n = We(i, r),
                  o = n + r / 2 + a.measureText(t.text).width;
                (0 === e || h[h.length - 1] + o + 2 * i.padding > l.width) &&
                  ((u += r + i.padding), (h[h.length - (e > 0 ? 0 : 1)] = 0)),
                  (s[e] = { left: 0, top: 0, width: o, height: r }),
                  (h[h.length - 1] += o + i.padding);
              }),
              (l.height += u);
          } else {
            var c = i.padding,
              f = (t.columnWidths = []),
              p = (t.columnHeights = []),
              g = i.padding,
              m = 0,
              v = 0;
            Di.each(t.legendItems, function (t, e) {
              var n = We(i, r),
                o = n + r / 2 + a.measureText(t.text).width;
              e > 0 &&
                v + r + 2 * c > l.height &&
                ((g += m + i.padding), f.push(m), p.push(v), (m = 0), (v = 0)),
                (m = Math.max(m, o)),
                (v += r + c),
                (s[e] = { left: 0, top: 0, width: o, height: r });
            }),
              (g += m),
              f.push(m),
              p.push(v),
              (l.width += g);
          }
          (t.width = l.width), (t.height = l.height);
        },
        afterFit: qa,
        isHorizontal: function () {
          return (
            "top" === this.options.position ||
            "bottom" === this.options.position
          );
        },
        draw: function () {
          var t = this,
            e = t.options,
            i = e.labels,
            n = gi.global,
            a = n.defaultColor,
            o = n.elements.line,
            r = t.height,
            s = t.columnHeights,
            l = t.width,
            d = t.lineWidths;
          if (e.display) {
            var h,
              u = ja(e.rtl, t.left, t.minSize.width),
              c = t.ctx,
              f = $a(i.fontColor, n.defaultFontColor),
              p = Di.options._parseFont(i),
              g = p.size;
            (c.textAlign = u.textAlign("left")),
              (c.textBaseline = "middle"),
              (c.lineWidth = 0.5),
              (c.strokeStyle = f),
              (c.fillStyle = f),
              (c.font = p.string);
            var m = We(i, g),
              v = t.legendHitBoxes,
              b = function (t, e, n) {
                if (!(isNaN(m) || m <= 0)) {
                  c.save();
                  var r = $a(n.lineWidth, o.borderWidth);
                  if (
                    ((c.fillStyle = $a(n.fillStyle, a)),
                    (c.lineCap = $a(n.lineCap, o.borderCapStyle)),
                    (c.lineDashOffset = $a(
                      n.lineDashOffset,
                      o.borderDashOffset
                    )),
                    (c.lineJoin = $a(n.lineJoin, o.borderJoinStyle)),
                    (c.lineWidth = r),
                    (c.strokeStyle = $a(n.strokeStyle, a)),
                    c.setLineDash &&
                      c.setLineDash($a(n.lineDash, o.borderDash)),
                    i && i.usePointStyle)
                  ) {
                    var s = (m * Math.SQRT2) / 2,
                      l = u.xPlus(t, m / 2),
                      d = e + g / 2;
                    Di.canvas.drawPoint(c, n.pointStyle, s, l, d, n.rotation);
                  } else
                    c.fillRect(u.leftForLtr(t, m), e, m, g),
                      0 !== r && c.strokeRect(u.leftForLtr(t, m), e, m, g);
                  c.restore();
                }
              },
              y = function (t, e, i, n) {
                var a = g / 2,
                  o = u.xPlus(t, m + a),
                  r = e + a;
                c.fillText(i.text, o, r),
                  i.hidden &&
                    (c.beginPath(),
                    (c.lineWidth = 2),
                    c.moveTo(o, r),
                    c.lineTo(u.xPlus(o, n), r),
                    c.stroke());
              },
              x = function (t, n) {
                switch (e.align) {
                  case "start":
                    return i.padding;
                  case "end":
                    return t - n;
                  default:
                    return (t - n + i.padding) / 2;
                }
              },
              _ = t.isHorizontal();
            (h = _
              ? { x: t.left + x(l, d[0]), y: t.top + i.padding, line: 0 }
              : { x: t.left + i.padding, y: t.top + x(r, s[0]), line: 0 }),
              Di.rtl.overrideTextDirection(t.ctx, e.textDirection);
            var w = g + i.padding;
            Di.each(t.legendItems, function (e, n) {
              var a = c.measureText(e.text).width,
                o = m + g / 2 + a,
                f = h.x,
                p = h.y;
              u.setWidth(t.minSize.width),
                _
                  ? n > 0 &&
                    f + o + i.padding > t.left + t.minSize.width &&
                    ((p = h.y += w),
                    h.line++,
                    (f = h.x = t.left + x(l, d[h.line])))
                  : n > 0 &&
                    p + w > t.top + t.minSize.height &&
                    ((f = h.x = f + t.columnWidths[h.line] + i.padding),
                    h.line++,
                    (p = h.y = t.top + x(r, s[h.line])));
              var k = u.x(f);
              b(k, p, e),
                (v[n].left = u.leftForLtr(k, v[n].width)),
                (v[n].top = p),
                y(k, p, e, a),
                _ ? (h.x += o + i.padding) : (h.y += w);
            }),
              Di.rtl.restoreTextDirection(t.ctx, e.textDirection);
          }
        },
        _getLegendItemAt: function (t, e) {
          var i,
            n,
            a,
            o = this;
          if (t >= o.left && t <= o.right && e >= o.top && e <= o.bottom)
            for (a = o.legendHitBoxes, i = 0; i < a.length; ++i)
              if (
                ((n = a[i]),
                t >= n.left &&
                  t <= n.left + n.width &&
                  e >= n.top &&
                  e <= n.top + n.height)
              )
                return o.legendItems[i];
          return null;
        },
        handleEvent: function (t) {
          var e,
            i = this,
            n = i.options,
            a = "mouseup" === t.type ? "click" : t.type;
          if ("mousemove" === a) {
            if (!n.onHover && !n.onLeave) return;
          } else {
            if ("click" !== a) return;
            if (!n.onClick) return;
          }
          (e = i._getLegendItemAt(t.x, t.y)),
            "click" === a
              ? e && n.onClick && n.onClick.call(i, t.native, e)
              : (n.onLeave &&
                  e !== i._hoveredItem &&
                  (i._hoveredItem &&
                    n.onLeave.call(i, t.native, i._hoveredItem),
                  (i._hoveredItem = e)),
                n.onHover && e && n.onHover.call(i, t.native, e));
        },
      }),
      Xa = {
        id: "legend",
        _element: Ya,
        beforeInit: function (t) {
          var e = t.options.legend;
          e && He(t, e);
        },
        beforeUpdate: function (t) {
          var e = t.options.legend,
            i = t.legend;
          e
            ? (Di.mergeIf(e, gi.global.legend),
              i ? (Tn.configure(t, i, e), (i.options = e)) : He(t, e))
            : i && (Tn.removeBox(t, i), delete t.legend);
        },
        afterEvent: function (t, e) {
          var i = t.legend;
          i && i.handleEvent(e);
        },
      },
      Ga = Di.noop;
    gi._set("global", {
      title: {
        display: !1,
        fontStyle: "bold",
        fullWidth: !0,
        padding: 10,
        position: "top",
        text: "",
        weight: 2e3,
      },
    });
    var Ka = Ei.extend({
        initialize: function (t) {
          var e = this;
          Di.extend(e, t), (e.legendHitBoxes = []);
        },
        beforeUpdate: Ga,
        update: function (t, e, i) {
          var n = this;
          return (
            n.beforeUpdate(),
            (n.maxWidth = t),
            (n.maxHeight = e),
            (n.margins = i),
            n.beforeSetDimensions(),
            n.setDimensions(),
            n.afterSetDimensions(),
            n.beforeBuildLabels(),
            n.buildLabels(),
            n.afterBuildLabels(),
            n.beforeFit(),
            n.fit(),
            n.afterFit(),
            n.afterUpdate(),
            n.minSize
          );
        },
        afterUpdate: Ga,
        beforeSetDimensions: Ga,
        setDimensions: function () {
          var t = this;
          t.isHorizontal()
            ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width))
            : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
            (t.paddingLeft = 0),
            (t.paddingTop = 0),
            (t.paddingRight = 0),
            (t.paddingBottom = 0),
            (t.minSize = { width: 0, height: 0 });
        },
        afterSetDimensions: Ga,
        beforeBuildLabels: Ga,
        buildLabels: Ga,
        afterBuildLabels: Ga,
        beforeFit: Ga,
        fit: function () {
          var t,
            e,
            i = this,
            n = i.options,
            a = (i.minSize = {}),
            o = i.isHorizontal();
          if (!n.display)
            return void (i.width = a.width = i.height = a.height = 0);
          (t = Di.isArray(n.text) ? n.text.length : 1),
            (e = t * Di.options._parseFont(n).lineHeight + 2 * n.padding),
            (i.width = a.width = o ? i.maxWidth : e),
            (i.height = a.height = o ? e : i.maxHeight);
        },
        afterFit: Ga,
        isHorizontal: function () {
          var t = this.options.position;
          return "top" === t || "bottom" === t;
        },
        draw: function () {
          var t = this,
            e = t.ctx,
            i = t.options;
          if (i.display) {
            var n,
              a,
              o,
              r = Di.options._parseFont(i),
              s = r.lineHeight,
              l = s / 2 + i.padding,
              d = 0,
              h = t.top,
              u = t.left,
              c = t.bottom,
              f = t.right;
            (e.fillStyle = Di.valueOrDefault(
              i.fontColor,
              gi.global.defaultFontColor
            )),
              (e.font = r.string),
              t.isHorizontal()
                ? ((a = u + (f - u) / 2), (o = h + l), (n = f - u))
                : ((a = "left" === i.position ? u + l : f - l),
                  (o = h + (c - h) / 2),
                  (n = c - h),
                  (d = Math.PI * ("left" === i.position ? -0.5 : 0.5))),
              e.save(),
              e.translate(a, o),
              e.rotate(d),
              (e.textAlign = "center"),
              (e.textBaseline = "middle");
            var p = i.text;
            if (Di.isArray(p))
              for (var g = 0, m = 0; m < p.length; ++m)
                e.fillText(p[m], 0, g, n), (g += s);
            else e.fillText(p, 0, 0, n);
            e.restore();
          }
        },
      }),
      Qa = {
        id: "title",
        _element: Ka,
        beforeInit: function (t) {
          var e = t.options.title;
          e && je(t, e);
        },
        beforeUpdate: function (t) {
          var e = t.options.title,
            i = t.titleBlock;
          e
            ? (Di.mergeIf(e, gi.global.title),
              i ? (Tn.configure(t, i, e), (i.options = e)) : je(t, e))
            : i && (Tn.removeBox(t, i), delete t.titleBlock);
        },
      },
      Za = {},
      Ja = Ha,
      to = Xa,
      eo = Qa;
    (Za.filler = Ja),
      (Za.legend = to),
      (Za.title = eo),
      (Jn.helpers = Di),
      (function () {
        function t(t, e, i) {
          var n;
          return (
            "string" == typeof t
              ? ((n = parseInt(t, 10)),
                -1 !== t.indexOf("%") && (n = (n / 100) * e.parentNode[i]))
              : (n = t),
            n
          );
        }
        function e(t) {
          return void 0 !== t && null !== t && "none" !== t;
        }
        function i(i, n, a) {
          var o = document.defaultView,
            r = Di._getParentNode(i),
            s = o.getComputedStyle(i)[n],
            l = o.getComputedStyle(r)[n],
            d = e(s),
            h = e(l),
            u = Number.POSITIVE_INFINITY;
          return d || h
            ? Math.min(d ? t(s, i, a) : u, h ? t(l, r, a) : u)
            : "none";
        }
        (Di.where = function (t, e) {
          if (Di.isArray(t) && Array.prototype.filter) return t.filter(e);
          var i = [];
          return (
            Di.each(t, function (t) {
              e(t) && i.push(t);
            }),
            i
          );
        }),
          (Di.findIndex = Array.prototype.findIndex
            ? function (t, e, i) {
                return t.findIndex(e, i);
              }
            : function (t, e, i) {
                i = void 0 === i ? t : i;
                for (var n = 0, a = t.length; n < a; ++n)
                  if (e.call(i, t[n], n, t)) return n;
                return -1;
              }),
          (Di.findNextWhere = function (t, e, i) {
            Di.isNullOrUndef(i) && (i = -1);
            for (var n = i + 1; n < t.length; n++) {
              var a = t[n];
              if (e(a)) return a;
            }
          }),
          (Di.findPreviousWhere = function (t, e, i) {
            Di.isNullOrUndef(i) && (i = t.length);
            for (var n = i - 1; n >= 0; n--) {
              var a = t[n];
              if (e(a)) return a;
            }
          }),
          (Di.isNumber = function (t) {
            return !isNaN(parseFloat(t)) && isFinite(t);
          }),
          (Di.almostEquals = function (t, e, i) {
            return Math.abs(t - e) < i;
          }),
          (Di.almostWhole = function (t, e) {
            var i = Math.round(t);
            return i - e <= t && i + e >= t;
          }),
          (Di.max = function (t) {
            return t.reduce(function (t, e) {
              return isNaN(e) ? t : Math.max(t, e);
            }, Number.NEGATIVE_INFINITY);
          }),
          (Di.min = function (t) {
            return t.reduce(function (t, e) {
              return isNaN(e) ? t : Math.min(t, e);
            }, Number.POSITIVE_INFINITY);
          }),
          (Di.sign = Math.sign
            ? function (t) {
                return Math.sign(t);
              }
            : function (t) {
                return (t = +t), 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1;
              }),
          (Di.toRadians = function (t) {
            return t * (Math.PI / 180);
          }),
          (Di.toDegrees = function (t) {
            return t * (180 / Math.PI);
          }),
          (Di._decimalPlaces = function (t) {
            if (Di.isFinite(t)) {
              for (var e = 1, i = 0; Math.round(t * e) / e !== t; )
                (e *= 10), i++;
              return i;
            }
          }),
          (Di.getAngleFromPoint = function (t, e) {
            var i = e.x - t.x,
              n = e.y - t.y,
              a = Math.sqrt(i * i + n * n),
              o = Math.atan2(n, i);
            return (
              o < -0.5 * Math.PI && (o += 2 * Math.PI),
              { angle: o, distance: a }
            );
          }),
          (Di.distanceBetweenPoints = function (t, e) {
            return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
          }),
          (Di.aliasPixel = function (t) {
            return t % 2 == 0 ? 0 : 0.5;
          }),
          (Di._alignPixel = function (t, e, i) {
            var n = t.currentDevicePixelRatio,
              a = i / 2;
            return Math.round((e - a) * n) / n + a;
          }),
          (Di.splineCurve = function (t, e, i, n) {
            var a = t.skip ? e : t,
              o = e,
              r = i.skip ? e : i,
              s = Math.sqrt(Math.pow(o.x - a.x, 2) + Math.pow(o.y - a.y, 2)),
              l = Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)),
              d = s / (s + l),
              h = l / (s + l);
            (d = isNaN(d) ? 0 : d), (h = isNaN(h) ? 0 : h);
            var u = n * d,
              c = n * h;
            return {
              previous: { x: o.x - u * (r.x - a.x), y: o.y - u * (r.y - a.y) },
              next: { x: o.x + c * (r.x - a.x), y: o.y + c * (r.y - a.y) },
            };
          }),
          (Di.EPSILON = Number.EPSILON || 1e-14),
          (Di.splineCurveMonotone = function (t) {
            var e,
              i,
              n,
              a,
              o = (t || []).map(function (t) {
                return { model: t._model, deltaK: 0, mK: 0 };
              }),
              r = o.length;
            for (e = 0; e < r; ++e)
              if (((n = o[e]), !n.model.skip)) {
                if (
                  ((i = e > 0 ? o[e - 1] : null),
                  (a = e < r - 1 ? o[e + 1] : null) && !a.model.skip)
                ) {
                  var s = a.model.x - n.model.x;
                  n.deltaK = 0 !== s ? (a.model.y - n.model.y) / s : 0;
                }
                !i || i.model.skip
                  ? (n.mK = n.deltaK)
                  : !a || a.model.skip
                  ? (n.mK = i.deltaK)
                  : this.sign(i.deltaK) !== this.sign(n.deltaK)
                  ? (n.mK = 0)
                  : (n.mK = (i.deltaK + n.deltaK) / 2);
              }
            var l, d, h, u;
            for (e = 0; e < r - 1; ++e)
              (n = o[e]),
                (a = o[e + 1]),
                n.model.skip ||
                  a.model.skip ||
                  (Di.almostEquals(n.deltaK, 0, this.EPSILON)
                    ? (n.mK = a.mK = 0)
                    : ((l = n.mK / n.deltaK),
                      (d = a.mK / n.deltaK),
                      (u = Math.pow(l, 2) + Math.pow(d, 2)) <= 9 ||
                        ((h = 3 / Math.sqrt(u)),
                        (n.mK = l * h * n.deltaK),
                        (a.mK = d * h * n.deltaK))));
            var c;
            for (e = 0; e < r; ++e)
              (n = o[e]),
                n.model.skip ||
                  ((i = e > 0 ? o[e - 1] : null),
                  (a = e < r - 1 ? o[e + 1] : null),
                  i &&
                    !i.model.skip &&
                    ((c = (n.model.x - i.model.x) / 3),
                    (n.model.controlPointPreviousX = n.model.x - c),
                    (n.model.controlPointPreviousY = n.model.y - c * n.mK)),
                  a &&
                    !a.model.skip &&
                    ((c = (a.model.x - n.model.x) / 3),
                    (n.model.controlPointNextX = n.model.x + c),
                    (n.model.controlPointNextY = n.model.y + c * n.mK)));
          }),
          (Di.nextItem = function (t, e, i) {
            return i
              ? e >= t.length - 1
                ? t[0]
                : t[e + 1]
              : e >= t.length - 1
              ? t[t.length - 1]
              : t[e + 1];
          }),
          (Di.previousItem = function (t, e, i) {
            return i
              ? e <= 0
                ? t[t.length - 1]
                : t[e - 1]
              : e <= 0
              ? t[0]
              : t[e - 1];
          }),
          (Di.niceNum = function (t, e) {
            var i = Math.floor(Di.log10(t)),
              n = t / Math.pow(10, i);
            return (
              (e
                ? n < 1.5
                  ? 1
                  : n < 3
                  ? 2
                  : n < 7
                  ? 5
                  : 10
                : n <= 1
                ? 1
                : n <= 2
                ? 2
                : n <= 5
                ? 5
                : 10) * Math.pow(10, i)
            );
          }),
          (Di.requestAnimFrame = (function () {
            return "undefined" == typeof window
              ? function (t) {
                  t();
                }
              : window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  window.oRequestAnimationFrame ||
                  window.msRequestAnimationFrame ||
                  function (t) {
                    return window.setTimeout(t, 1e3 / 60);
                  };
          })()),
          (Di.getRelativePosition = function (t, e) {
            var i,
              n,
              a = t.originalEvent || t,
              o = t.target || t.srcElement,
              r = o.getBoundingClientRect(),
              s = a.touches;
            s && s.length > 0
              ? ((i = s[0].clientX), (n = s[0].clientY))
              : ((i = a.clientX), (n = a.clientY));
            var l = parseFloat(Di.getStyle(o, "padding-left")),
              d = parseFloat(Di.getStyle(o, "padding-top")),
              h = parseFloat(Di.getStyle(o, "padding-right")),
              u = parseFloat(Di.getStyle(o, "padding-bottom")),
              c = r.right - r.left - l - h,
              f = r.bottom - r.top - d - u;
            return (
              (i = Math.round(
                (((i - r.left - l) / c) * o.width) / e.currentDevicePixelRatio
              )),
              (n = Math.round(
                (((n - r.top - d) / f) * o.height) / e.currentDevicePixelRatio
              )),
              { x: i, y: n }
            );
          }),
          (Di.getConstraintWidth = function (t) {
            return i(t, "max-width", "clientWidth");
          }),
          (Di.getConstraintHeight = function (t) {
            return i(t, "max-height", "clientHeight");
          }),
          (Di._calculatePadding = function (t, e, i) {
            return (
              (e = Di.getStyle(t, e)),
              e.indexOf("%") > -1
                ? (i * parseInt(e, 10)) / 100
                : parseInt(e, 10)
            );
          }),
          (Di._getParentNode = function (t) {
            var e = t.parentNode;
            return (
              e && "[object ShadowRoot]" === e.toString() && (e = e.host), e
            );
          }),
          (Di.getMaximumWidth = function (t) {
            var e = Di._getParentNode(t);
            if (!e) return t.clientWidth;
            var i = e.clientWidth,
              n = Di._calculatePadding(e, "padding-left", i),
              a = Di._calculatePadding(e, "padding-right", i),
              o = i - n - a,
              r = Di.getConstraintWidth(t);
            return isNaN(r) ? o : Math.min(o, r);
          }),
          (Di.getMaximumHeight = function (t) {
            var e = Di._getParentNode(t);
            if (!e) return t.clientHeight;
            var i = e.clientHeight,
              n = Di._calculatePadding(e, "padding-top", i),
              a = Di._calculatePadding(e, "padding-bottom", i),
              o = i - n - a,
              r = Di.getConstraintHeight(t);
            return isNaN(r) ? o : Math.min(o, r);
          }),
          (Di.getStyle = function (t, e) {
            return t.currentStyle
              ? t.currentStyle[e]
              : document.defaultView
                  .getComputedStyle(t, null)
                  .getPropertyValue(e);
          }),
          (Di.retinaScale = function (t, e) {
            var i = (t.currentDevicePixelRatio =
              e ||
              ("undefined" != typeof window && window.devicePixelRatio) ||
              1);
            if (1 !== i) {
              var n = t.canvas,
                a = t.height,
                o = t.width;
              (n.height = a * i),
                (n.width = o * i),
                t.ctx.scale(i, i),
                n.style.height ||
                  n.style.width ||
                  ((n.style.height = a + "px"), (n.style.width = o + "px"));
            }
          }),
          (Di.fontString = function (t, e, i) {
            return e + " " + t + "px " + i;
          }),
          (Di.longestText = function (t, e, i, n) {
            n = n || {};
            var a = (n.data = n.data || {}),
              o = (n.garbageCollect = n.garbageCollect || []);
            n.font !== e &&
              ((a = n.data = {}), (o = n.garbageCollect = []), (n.font = e)),
              (t.font = e);
            var r,
              s,
              l,
              d,
              h,
              u = 0,
              c = i.length;
            for (r = 0; r < c; r++)
              if (void 0 !== (d = i[r]) && null !== d && !0 !== Di.isArray(d))
                u = Di.measureText(t, a, o, u, d);
              else if (Di.isArray(d))
                for (s = 0, l = d.length; s < l; s++)
                  void 0 === (h = d[s]) ||
                    null === h ||
                    Di.isArray(h) ||
                    (u = Di.measureText(t, a, o, u, h));
            var f = o.length / 2;
            if (f > i.length) {
              for (r = 0; r < f; r++) delete a[o[r]];
              o.splice(0, f);
            }
            return u;
          }),
          (Di.measureText = function (t, e, i, n, a) {
            var o = e[a];
            return (
              o || ((o = e[a] = t.measureText(a).width), i.push(a)),
              o > n && (n = o),
              n
            );
          }),
          (Di.numberOfLabelLines = function (t) {
            var e = 1;
            return (
              Di.each(t, function (t) {
                Di.isArray(t) && t.length > e && (e = t.length);
              }),
              e
            );
          }),
          (Di.color = ei
            ? function (t) {
                return (
                  t instanceof CanvasGradient && (t = gi.global.defaultColor),
                  ei(t)
                );
              }
            : function (t) {
                return console.error("Color.js not found!"), t;
              }),
          (Di.getHoverColor = function (t) {
            return t instanceof CanvasPattern || t instanceof CanvasGradient
              ? t
              : Di.color(t).saturate(0.5).darken(0.1).rgbString();
          });
      })(),
      (Jn._adapters = ea),
      (Jn.Animation = Li),
      (Jn.animationService = Ri),
      (Jn.controllers = Mn),
      (Jn.DatasetController = zi),
      (Jn.defaults = gi),
      (Jn.Element = Ei),
      (Jn.elements = Qi),
      (Jn.Interaction = Dn),
      (Jn.layouts = Tn),
      (Jn.platform = Wn),
      (Jn.plugins = Hn),
      (Jn.Scale = la),
      (Jn.scaleService = jn),
      (Jn.Ticks = ia),
      (Jn.Tooltip = Kn),
      Jn.helpers.each(za, function (t, e) {
        Jn.scaleService.registerScaleType(e, t, t._defaults);
      });
    for (var io in Za) Za.hasOwnProperty(io) && Jn.plugins.register(Za[io]);
    Jn.platform.initialize();
    var no = Jn;
    return (
      "undefined" != typeof window && (window.Chart = Jn),
      (Jn.Chart = Jn),
      (Jn.Legend = Za.legend._element),
      (Jn.Title = Za.title._element),
      (Jn.pluginService = Jn.plugins),
      (Jn.PluginBase = Jn.Element.extend({})),
      (Jn.canvasHelpers = Jn.helpers.canvas),
      (Jn.layoutService = Jn.layouts),
      (Jn.LinearScaleBase = ga),
      Jn.helpers.each(
        ["Bar", "Bubble", "Doughnut", "Line", "PolarArea", "Radar", "Scatter"],
        function (t) {
          Jn[t] = function (e, i) {
            return new Jn(
              e,
              Jn.helpers.merge(i || {}, {
                type: t.charAt(0).toLowerCase() + t.slice(1),
              })
            );
          };
        }
      ),
      no
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return (t.SignaturePad = e());
        })
      : "object" == typeof exports
      ? (module.exports = e())
      : (t.SignaturePad = e());
  })(this, function () {
    return (function (t) {
      "use strict";
      var e = function (t, e) {
        var i = this,
          n = e || {};
        (this.velocityFilterWeight = n.velocityFilterWeight || 0.7),
          (this.minWidth = n.minWidth || 0.5),
          (this.maxWidth = n.maxWidth || 2.5),
          (this.dotSize =
            n.dotSize ||
            function () {
              return (this.minWidth + this.maxWidth) / 2;
            }),
          (this.penColor = n.penColor || "black"),
          (this.backgroundColor = n.backgroundColor || "rgba(0,0,0,0)"),
          (this.onEnd = n.onEnd),
          (this.onBegin = n.onBegin),
          (this._canvas = t),
          (this._ctx = t.getContext("2d")),
          this.clear(),
          (this._handleMouseDown = function (t) {
            1 === t.which && ((i._mouseButtonDown = !0), i._strokeBegin(t));
          }),
          (this._handleMouseMove = function (t) {
            i._mouseButtonDown && i._strokeUpdate(t);
          }),
          (this._handleMouseUp = function (t) {
            1 === t.which &&
              i._mouseButtonDown &&
              ((i._mouseButtonDown = !1), i._strokeEnd(t));
          }),
          (this._handleTouchStart = function (t) {
            if (1 == t.targetTouches.length) {
              var e = t.changedTouches[0];
              i._strokeBegin(e);
            }
          }),
          (this._handleTouchMove = function (t) {
            t.preventDefault();
            var e = t.targetTouches[0];
            i._strokeUpdate(e);
          }),
          (this._handleTouchEnd = function (t) {
            t.target === i._canvas && (t.preventDefault(), i._strokeEnd(t));
          }),
          this._handleMouseEvents(),
          this._handleTouchEvents();
      };
      (e.prototype.clear = function () {
        var t = this._ctx,
          e = this._canvas;
        (t.fillStyle = this.backgroundColor),
          t.clearRect(0, 0, e.width, e.height),
          t.fillRect(0, 0, e.width, e.height),
          this._reset();
      }),
        (e.prototype.toDataURL = function (t, e) {
          var i = this._canvas;
          return i.toDataURL.apply(i, arguments);
        }),
        (e.prototype.fromDataURL = function (t) {
          var e = this,
            i = new Image(),
            n = window.devicePixelRatio || 1,
            a = this._canvas.width / n,
            o = this._canvas.height / n;
          this._reset(),
            (i.src = t),
            (i.onload = function () {
              e._ctx.drawImage(i, 0, 0, a, o);
            }),
            (this._isEmpty = !1);
        }),
        (e.prototype._strokeUpdate = function (t) {
          var e = this._createPoint(t);
          this._addPoint(e);
        }),
        (e.prototype._strokeBegin = function (t) {
          this._reset(),
            this._strokeUpdate(t),
            "function" == typeof this.onBegin && this.onBegin(t);
        }),
        (e.prototype._strokeDraw = function (t) {
          var e = this._ctx,
            i =
              "function" == typeof this.dotSize ? this.dotSize() : this.dotSize;
          e.beginPath(), this._drawPoint(t.x, t.y, i), e.closePath(), e.fill();
        }),
        (e.prototype._strokeEnd = function (t) {
          var e = this.points.length > 2,
            i = this.points[0];
          !e && i && this._strokeDraw(i),
            "function" == typeof this.onEnd && this.onEnd(t);
        }),
        (e.prototype._handleMouseEvents = function () {
          (this._mouseButtonDown = !1),
            this._canvas.addEventListener("mousedown", this._handleMouseDown),
            this._canvas.addEventListener("mousemove", this._handleMouseMove),
            t.addEventListener("mouseup", this._handleMouseUp);
        }),
        (e.prototype._handleTouchEvents = function () {
          (this._canvas.style.msTouchAction = "none"),
            (this._canvas.style.touchAction = "none"),
            this._canvas.addEventListener("touchstart", this._handleTouchStart),
            this._canvas.addEventListener("touchmove", this._handleTouchMove),
            this._canvas.addEventListener("touchend", this._handleTouchEnd);
        }),
        (e.prototype.on = function () {
          this._handleMouseEvents(), this._handleTouchEvents();
        }),
        (e.prototype.off = function () {
          this._canvas.removeEventListener("mousedown", this._handleMouseDown),
            this._canvas.removeEventListener(
              "mousemove",
              this._handleMouseMove
            ),
            t.removeEventListener("mouseup", this._handleMouseUp),
            this._canvas.removeEventListener(
              "touchstart",
              this._handleTouchStart
            ),
            this._canvas.removeEventListener(
              "touchmove",
              this._handleTouchMove
            ),
            this._canvas.removeEventListener("touchend", this._handleTouchEnd);
        }),
        (e.prototype.isEmpty = function () {
          return this._isEmpty;
        }),
        (e.prototype._reset = function () {
          (this.points = []),
            (this._lastVelocity = 0),
            (this._lastWidth = (this.minWidth + this.maxWidth) / 2),
            (this._isEmpty = !0),
            (this._ctx.fillStyle = this.penColor);
        }),
        (e.prototype._createPoint = function (t) {
          var e = this._canvas.getBoundingClientRect();
          return new i(t.clientX - e.left, t.clientY - e.top);
        }),
        (e.prototype._addPoint = function (t) {
          var e,
            i,
            a,
            o,
            r = this.points;
          r.push(t),
            r.length > 2 &&
              (3 === r.length && r.unshift(r[0]),
              (o = this._calculateCurveControlPoints(r[0], r[1], r[2])),
              (e = o.c2),
              (o = this._calculateCurveControlPoints(r[1], r[2], r[3])),
              (i = o.c1),
              (a = new n(r[1], e, i, r[2])),
              this._addCurve(a),
              r.shift());
        }),
        (e.prototype._calculateCurveControlPoints = function (t, e, n) {
          var a = t.x - e.x,
            o = t.y - e.y,
            r = e.x - n.x,
            s = e.y - n.y,
            l = { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 },
            d = { x: (e.x + n.x) / 2, y: (e.y + n.y) / 2 },
            h = Math.sqrt(a * a + o * o),
            u = Math.sqrt(r * r + s * s),
            c = l.x - d.x,
            f = l.y - d.y,
            p = u / (h + u),
            g = { x: d.x + c * p, y: d.y + f * p },
            m = e.x - g.x,
            v = e.y - g.y;
          return { c1: new i(l.x + m, l.y + v), c2: new i(d.x + m, d.y + v) };
        }),
        (e.prototype._addCurve = function (t) {
          var e,
            i,
            n = t.startPoint,
            a = t.endPoint;
          (e = a.velocityFrom(n)),
            (e =
              this.velocityFilterWeight * e +
              (1 - this.velocityFilterWeight) * this._lastVelocity),
            (i = this._strokeWidth(e)),
            this._drawCurve(t, this._lastWidth, i),
            (this._lastVelocity = e),
            (this._lastWidth = i);
        }),
        (e.prototype._drawPoint = function (t, e, i) {
          var n = this._ctx;
          n.moveTo(t, e),
            n.arc(t, e, i, 0, 2 * Math.PI, !1),
            (this._isEmpty = !1);
        }),
        (e.prototype._drawCurve = function (t, e, i) {
          var n,
            a,
            o,
            r,
            s,
            l,
            d,
            h,
            u,
            c,
            f,
            p = this._ctx,
            g = i - e;
          for (n = Math.floor(t.length()), p.beginPath(), o = 0; o < n; o++)
            (r = o / n),
              (s = r * r),
              (l = s * r),
              (d = 1 - r),
              (h = d * d),
              (u = h * d),
              (c = u * t.startPoint.x),
              (c += 3 * h * r * t.control1.x),
              (c += 3 * d * s * t.control2.x),
              (c += l * t.endPoint.x),
              (f = u * t.startPoint.y),
              (f += 3 * h * r * t.control1.y),
              (f += 3 * d * s * t.control2.y),
              (f += l * t.endPoint.y),
              (a = e + l * g),
              this._drawPoint(c, f, a);
          p.closePath(), p.fill();
        }),
        (e.prototype._strokeWidth = function (t) {
          return Math.max(this.maxWidth / (t + 1), this.minWidth);
        });
      var i = function (t, e, i) {
        (this.x = t), (this.y = e), (this.time = i || new Date().getTime());
      };
      (i.prototype.velocityFrom = function (t) {
        return this.time !== t.time
          ? this.distanceTo(t) / (this.time - t.time)
          : 1;
      }),
        (i.prototype.distanceTo = function (t) {
          return Math.sqrt(
            Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2)
          );
        });
      var n = function (t, e, i, n) {
        (this.startPoint = t),
          (this.control1 = e),
          (this.control2 = i),
          (this.endPoint = n);
      };
      return (
        (n.prototype.length = function () {
          var t,
            e,
            i,
            n,
            a,
            o,
            r,
            s,
            l = 0;
          for (t = 0; t <= 10; t++)
            (e = t / 10),
              (i = this._point(
                e,
                this.startPoint.x,
                this.control1.x,
                this.control2.x,
                this.endPoint.x
              )),
              (n = this._point(
                e,
                this.startPoint.y,
                this.control1.y,
                this.control2.y,
                this.endPoint.y
              )),
              t > 0 &&
                ((r = i - a), (s = n - o), (l += Math.sqrt(r * r + s * s))),
              (a = i),
              (o = n);
          return l;
        }),
        (n.prototype._point = function (t, e, i, n, a) {
          return (
            e * (1 - t) * (1 - t) * (1 - t) +
            3 * i * (1 - t) * (1 - t) * t +
            3 * n * (1 - t) * t * t +
            a * t * t * t
          );
        }),
        e
      );
    })(document);
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (t) {
          return e(t);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("jquery")))
      : e(t.jQuery);
  })(this, function (t) {
    !(function (t, e, i) {
      function n(t, e) {
        (this.$form = t),
          (this.$input = e),
          this.reset(),
          e.on("change paste", this.reset.bind(this));
      }
      var a = function () {
          return !1;
        },
        o = null,
        r = {
          numHalted: 0,
          haltValidation: function (e) {
            this.numHalted++,
              (t.formUtils.haltValidation = !0),
              e
                .unbind("submit", a)
                .bind("submit", a)
                .find('*[type="submit"]')
                .addClass("disabled")
                .attr("disabled", "disabled");
          },
          unHaltValidation: function (e) {
            0 === --this.numHalted &&
              ((t.formUtils.haltValidation = !1),
              e
                .unbind("submit", a)
                .find('*[type="submit"]')
                .removeClass("disabled")
                .removeAttr("disabled", "disabled"));
          },
        };
      (n.prototype.reset = function () {
        (this.haltedFormValidation = !1),
          (this.hasRun = !1),
          (this.isRunning = !1),
          (this.result = void 0);
      }),
        (n.prototype.run = function (t, e) {
          return "keyup" === t
            ? null
            : this.isRunning
            ? ((o = t),
              this.haltedFormValidation ||
                (r.haltValidation(), (this.haltedFormValidation = !0)),
              null)
            : this.hasRun
            ? this.result
            : ((o = t),
              r.haltValidation(this.$form),
              (this.haltedFormValidation = !0),
              (this.isRunning = !0),
              this.$input
                .attr("disabled", "disabled")
                .addClass("async-validation"),
              this.$form.addClass("async-validation"),
              e(
                function (t) {
                  this.done(t);
                }.bind(this)
              ),
              null);
        }),
        (n.prototype.done = function (t) {
          (this.result = t),
            (this.hasRun = !0),
            (this.isRunning = !1),
            this.$input.removeAttr("disabled").removeClass("async-validation"),
            this.$form.removeClass("async-validation"),
            this.haltedFormValidation &&
              (r.unHaltValidation(this.$form),
              "submit" === o
                ? this.$form.trigger("submit")
                : this.$input.trigger("validation.revalidate"));
        }),
        (n.loadInstance = function (t, e, i) {
          var a,
            o = e.get(0);
          return (
            o.asyncValidators || (o.asyncValidators = {}),
            o.asyncValidators[t]
              ? (a = o.asyncValidators[t])
              : ((a = new n(i, e)), (o.asyncValidators[t] = a)),
            a
          );
        }),
        (t.formUtils = t.extend(t.formUtils || {}, {
          asyncValidation: function (t, e, i) {
            return (
              this.warn(
                "Use of deprecated function $.formUtils.asyncValidation, use $.formUtils.addAsyncValidator() instead"
              ),
              n.loadInstance(t, e, i)
            );
          },
          addAsyncValidator: function (e) {
            var i = t.extend({}, e),
              a = i.validatorFunction;
            (i.async = !0),
              (i.validatorFunction = function (t, e, o, r, s, l) {
                return n.loadInstance(this.name, e, s).run(l, function (n) {
                  a.apply(i, [n, t, e, o, r, s, l]);
                });
              }),
              this.addValidator(i);
          },
        })),
        t(e).bind("validatorsLoaded formValidationSetup", function (e, i) {
          i || (i = t("form")),
            i.find("[data-validation]").each(function () {
              var e = t(this);
              e.valAttr("async", !1),
                t.each(t.split(e.attr("data-validation")), function (i, n) {
                  var a = t.formUtils.validators["validate_" + n];
                  a && a.async && e.valAttr("async", "yes");
                });
            });
        });
    })(t, window),
      (function (t, e) {
        "use strict";
        function i(e) {
          e &&
            "custom" === e.errorMessagePosition &&
            "function" == typeof e.errorMessageCustom &&
            (t.formUtils.warn(
              "Use of deprecated function errorMessageCustom, use config.submitErrorMessageCallback instead"
            ),
            (e.submitErrorMessageCallback = function (t, i) {
              e.errorMessageCustom(t, e.language.errorTitle, i, e);
            }));
        }
        function n(e) {
          if (
            e.errorMessagePosition &&
            "object" == typeof e.errorMessagePosition
          ) {
            t.formUtils.warn(
              "Deprecated use of config parameter errorMessagePosition, use config.submitErrorMessageCallback instead"
            );
            var i = e.errorMessagePosition;
            (e.errorMessagePosition = "top"),
              (e.submitErrorMessageCallback = function () {
                return i;
              });
          }
        }
        function a(e) {
          var i = e.find("[data-validation-if-checked]");
          i.length &&
            t.formUtils.warn(
              'Detected use of attribute "data-validation-if-checked" which is deprecated. Use "data-validation-depends-on" provided by module "logic"'
            ),
            i.on("beforeValidation", function () {
              var i = t(this),
                n = i.valAttr("if-checked"),
                a = t('input[name="' + n + '"]', e),
                o = a.is(":checked"),
                r = (t.formUtils.getValue(a) || "").toString(),
                s = i.valAttr("if-checked-value");
              (!o || (s && s !== r)) && i.valAttr("skipped", !0);
            });
        }
        function o(e) {
          var i = { se: "sv", cz: "cs", dk: "da" };
          if (e.lang in i) {
            var n = i[e.lang];
            t.formUtils.warn(
              'Deprecated use of lang code "' +
                e.lang +
                '" use "' +
                n +
                '" instead'
            ),
              (e.lang = n);
          }
        }
        (t.fn.validateForm = function (e, i) {
          return (
            t.formUtils.warn(
              "Use of deprecated function $.validateForm, use $.isValid instead"
            ),
            this.isValid(e, i, !0)
          );
        }),
          t(window)
            .on("formValidationPluginInit", function (t, e) {
              o(e), i(e), n(e);
            })
            .on("validatorsLoaded formValidationSetup", function (e, i) {
              i || (i = t("form")), a(i);
            });
      })(t),
      (function (t) {
        "use strict";
        var e = {
          resolveErrorMessage: function (t, e, i, n, a) {
            var o =
                n.validationErrorMsgAttribute +
                "-" +
                i.replace("validate_", ""),
              r = t.attr(o);
            return (
              r ||
                (r = t.attr(n.validationErrorMsgAttribute)) ||
                (r =
                  "function" != typeof e.errorMessageKey
                    ? a[e.errorMessageKey]
                    : a[e.errorMessageKey(n)]) ||
                (r = e.errorMessage),
              r
            );
          },
          getParentContainer: function (e) {
            if (e.valAttr("error-msg-container"))
              return t(e.valAttr("error-msg-container"));
            var i = e.parent();
            return (
              "checkbox" === e.attr("type") && e.closest(".checkbox").length
                ? (i = e.closest(".checkbox").parent())
                : "radio" === e.attr("type") &&
                  e.closest(".radio").length &&
                  (i = e.closest(".radio").parent()),
              i.closest(".input-group").length &&
                (i = i.closest(".input-group").parent()),
              i
            );
          },
          applyInputErrorStyling: function (t, e) {
            t.addClass(e.errorElementClass).removeClass(e.successElementClass),
              this.getParentContainer(t)
                .addClass(e.inputParentClassOnError)
                .removeClass(e.inputParentClassOnSuccess),
              "" !== e.borderColorOnError &&
                t.css("border-color", e.borderColorOnError);
          },
          applyInputSuccessStyling: function (t, e) {
            t.addClass(e.successElementClass),
              this.getParentContainer(t).addClass(e.inputParentClassOnSuccess);
          },
          removeInputStylingAndMessage: function (t, i) {
            t.removeClass(i.successElementClass)
              .removeClass(i.errorElementClass)
              .css("border-color", "");
            var n = e.getParentContainer(t);
            if (
              (n
                .removeClass(i.inputParentClassOnError)
                .removeClass(i.inputParentClassOnSuccess),
              "function" == typeof i.inlineErrorMessageCallback)
            ) {
              var a = i.inlineErrorMessageCallback(t, !1, i);
              a && a.html("");
            } else n.find("." + i.errorMessageClass).remove();
          },
          removeAllMessagesAndStyling: function (i, n) {
            if ("function" == typeof n.submitErrorMessageCallback) {
              var a = n.submitErrorMessageCallback(i, !1, n);
              a && a.html("");
            } else i.find("." + n.errorMessageClass + ".alert").remove();
            i.find(
              "." + n.errorElementClass + ",." + n.successElementClass
            ).each(function () {
              e.removeInputStylingAndMessage(t(this), n);
            });
          },
          setInlineMessage: function (e, i, n) {
            this.applyInputErrorStyling(e, n);
            var a,
              o = document.getElementById(e.attr("name") + "_err_msg"),
              r = !1,
              s = function (n) {
                t.formUtils.$win.trigger("validationErrorDisplay", [e, n]),
                  n.html(i);
              },
              l = function () {
                var o = !1;
                r.find("." + n.errorMessageClass).each(function () {
                  if (this.inputReferer === e[0]) return (o = t(this)), !1;
                }),
                  o
                    ? i
                      ? s(o)
                      : o.remove()
                    : "" !== i &&
                      ((a = t(
                        '<div class="' + n.errorMessageClass + ' alert"></div>'
                      )),
                      s(a),
                      (a[0].inputReferer = e[0]),
                      r.prepend(a));
              };
            if (o)
              t.formUtils.warn("Using deprecated element reference " + o.id),
                (r = t(o)),
                l();
            else if ("function" == typeof n.inlineErrorMessageCallback) {
              if (!(r = n.inlineErrorMessageCallback(e, i, n))) return;
              l();
            } else {
              var d = this.getParentContainer(e);
              (a = d.find("." + n.errorMessageClass + ".help-block")),
                0 === a.length &&
                  ((a = t("<span></span>")
                    .addClass("help-block")
                    .addClass(n.errorMessageClass)),
                  a.appendTo(d)),
                s(a);
            }
          },
          setMessageInTopOfForm: function (e, i, n, a) {
            var o =
                '<div class="{errorMessageClass} alert alert-danger"><strong>{errorTitle}</strong><ul>{fields}</ul></div>',
              r = !1;
            if (
              "function" != typeof n.submitErrorMessageCallback ||
              (r = n.submitErrorMessageCallback(e, i, n))
            ) {
              var s = {
                errorTitle: a.errorTitle,
                fields: "",
                errorMessageClass: n.errorMessageClass,
              };
              t.each(i, function (t, e) {
                s.fields += "<li>" + e + "</li>";
              }),
                t.each(s, function (t, e) {
                  o = o.replace("{" + t + "}", e);
                }),
                r ? r.html(o) : e.children().eq(0).before(t(o));
            }
          },
        };
        t.formUtils = t.extend(t.formUtils || {}, { dialogs: e });
      })(t),
      (function (t, e, i) {
        "use strict";
        var n = 0;
        (t.fn.validateOnBlur = function (e, i) {
          var n = this,
            a = this.find("*[data-validation]");
          return (
            a.each(function () {
              var a = t(this);
              if (a.is("[type=radio]")) {
                var o = n.find('[type=radio][name="' + a.attr("name") + '"]');
                o.bind("blur.validation", function () {
                  a.validateInputOnBlur(e, i, !0, "blur");
                }),
                  i.validateCheckboxRadioOnClick &&
                    o.bind("click.validation", function () {
                      a.validateInputOnBlur(e, i, !0, "click");
                    });
              }
            }),
            a.bind("blur.validation", function () {
              t(this).validateInputOnBlur(e, i, !0, "blur");
            }),
            i.validateCheckboxRadioOnClick &&
              this.find(
                "input[type=checkbox][data-validation],input[type=radio][data-validation]"
              ).bind("click.validation", function () {
                t(this).validateInputOnBlur(e, i, !0, "click");
              }),
            this
          );
        }),
          (t.fn.validateOnEvent = function (e, i) {
            if (0 !== this.length) {
              return (
                ("FORM" === this[0].nodeName
                  ? this.find("*[data-validation-event]")
                  : this
                ).each(function () {
                  var n = t(this),
                    a = n.valAttr("event");
                  a &&
                    n
                      .unbind(a + ".validation")
                      .bind(a + ".validation", function (n) {
                        9 !== (n || {}).keyCode &&
                          t(this).validateInputOnBlur(e, i, !0, a);
                      });
                }),
                this
              );
            }
          }),
          (t.fn.showHelpOnFocus = function (e) {
            return (
              e || (e = "data-validation-help"),
              this.find("textarea,input").each(function () {
                var i = t(this),
                  a = "jquery_form_help_" + ++n,
                  o = i.attr(e);
                i
                  .removeClass("has-help-text")
                  .unbind("focus.help")
                  .unbind("blur.help"),
                  o &&
                    i
                      .addClass("has-help-txt")
                      .bind("focus.help", function () {
                        var e = i.parent().find("." + a);
                        0 === e.length &&
                          ((e = t("<span />")
                            .addClass(a)
                            .addClass("help")
                            .addClass("help-block")
                            .text(o)
                            .hide()),
                          i.after(e)),
                          e.fadeIn();
                      })
                      .bind("blur.help", function () {
                        t(this)
                          .parent()
                          .find("." + a)
                          .fadeOut("slow");
                      });
              }),
              this
            );
          }),
          (t.fn.validate = function (e, i, n) {
            var a = t.extend({}, t.formUtils.LANG, n || {});
            this.each(function () {
              var n = t(this),
                o = n.closest("form").get(0) || {},
                r = o.validationConfig || t.formUtils.defaultConfig();
              n.one("validation", function (t, i) {
                "function" == typeof e && e(i, this, t);
              }),
                n.validateInputOnBlur(a, t.extend({}, r, i || {}), !0);
            });
          }),
          (t.fn.willPostponeValidation = function () {
            return (
              (this.valAttr("suggestion-nr") ||
                this.valAttr("postpone") ||
                this.hasClass("hasDatepicker")) &&
              !e.postponedValidation
            );
          }),
          (t.fn.validateInputOnBlur = function (i, n, a, o) {
            if (((t.formUtils.eventType = o), this.willPostponeValidation())) {
              var r = this,
                s = this.valAttr("postpone") || 200;
              return (
                (e.postponedValidation = function () {
                  r.validateInputOnBlur(i, n, a, o),
                    (e.postponedValidation = !1);
                }),
                setTimeout(function () {
                  e.postponedValidation && e.postponedValidation();
                }, s),
                this
              );
            }
            (i = t.extend({}, t.formUtils.LANG, i || {})),
              t.formUtils.dialogs.removeInputStylingAndMessage(this, n);
            var l = this,
              d = l.closest("form"),
              h = t.formUtils.validateInput(l, i, n, d, o),
              u = function () {
                l.validateInputOnBlur(i, n, !1, "blur.revalidated");
              };
            return (
              "blur" === o &&
                l
                  .unbind("validation.revalidate", u)
                  .one("validation.revalidate", u),
              a && l.removeKeyUpValidation(),
              h.shouldChangeDisplay &&
                (h.isValid
                  ? t.formUtils.dialogs.applyInputSuccessStyling(l, n)
                  : t.formUtils.dialogs.setInlineMessage(l, h.errorMsg, n)),
              !h.isValid && a && l.validateOnKeyUp(i, n),
              this
            );
          }),
          (t.fn.validateOnKeyUp = function (e, i) {
            return (
              this.each(function () {
                var n = t(this);
                n.valAttr("has-keyup-event") ||
                  n
                    .valAttr("has-keyup-event", "true")
                    .bind("keyup.validation", function (t) {
                      9 !== t.keyCode &&
                        n.validateInputOnBlur(e, i, !1, "keyup");
                    });
              }),
              this
            );
          }),
          (t.fn.removeKeyUpValidation = function () {
            return (
              this.each(function () {
                t(this)
                  .valAttr("has-keyup-event", !1)
                  .unbind("keyup.validation");
              }),
              this
            );
          }),
          (t.fn.valAttr = function (t, e) {
            return void 0 === e
              ? this.attr("data-validation-" + t)
              : !1 === e || null === e
              ? this.removeAttr("data-validation-" + t)
              : ((t = t.length > 0 ? "-" + t : ""),
                this.attr("data-validation" + t, e));
          }),
          (t.fn.isValid = function (e, i, n) {
            if (t.formUtils.isLoadingModules) {
              var a = this;
              return (
                setTimeout(function () {
                  a.isValid(e, i, n);
                }, 200),
                null
              );
            }
            (i = t.extend({}, t.formUtils.defaultConfig(), i || {})),
              (e = t.extend({}, t.formUtils.LANG, e || {})),
              (n = !1 !== n),
              t.formUtils.errorDisplayPreventedWhenHalted &&
                (delete t.formUtils.errorDisplayPreventedWhenHalted, (n = !1));
            var o = function (e, a) {
                t.inArray(e, s) < 0 && s.push(e),
                  l.push(a),
                  a.valAttr("current-error", e),
                  n && t.formUtils.dialogs.applyInputErrorStyling(a, i);
              },
              r = [],
              s = [],
              l = [],
              d = this,
              h = function (e, n) {
                return (
                  "submit" === n ||
                  "button" === n ||
                  "reset" === n ||
                  t.inArray(e, i.ignore || []) > -1
                );
              };
            if (
              (n && t.formUtils.dialogs.removeAllMessagesAndStyling(d, i),
              d
                .find("input,textarea,select")
                .filter(':not([type="submit"],[type="button"])')
                .each(function () {
                  var n = t(this),
                    a = n.attr("type"),
                    s = "radio" === a || "checkbox" === a,
                    l = n.attr("name");
                  if (!h(l, a) && (!s || t.inArray(l, r) < 0)) {
                    s && r.push(l);
                    var u = t.formUtils.validateInput(n, e, i, d, "submit");
                    u.isValid
                      ? u.isValid &&
                        u.shouldChangeDisplay &&
                        (n.valAttr("current-error", !1),
                        t.formUtils.dialogs.applyInputSuccessStyling(n, i))
                      : o(u.errorMsg, n);
                  }
                }),
              "function" == typeof i.onValidate)
            ) {
              var u = i.onValidate(d);
              t.isArray(u)
                ? t.each(u, function (t, e) {
                    o(e.message, e.element);
                  })
                : u && u.element && u.message && o(u.message, u.element);
            }
            return (
              (t.formUtils.isValidatingEntireForm = !1),
              l.length > 0 &&
                n &&
                ("top" === i.errorMessagePosition
                  ? t.formUtils.dialogs.setMessageInTopOfForm(d, s, i, e)
                  : t.each(l, function (e, n) {
                      t.formUtils.dialogs.setInlineMessage(
                        n,
                        n.valAttr("current-error"),
                        i
                      );
                    }),
                i.scrollToTopOnError &&
                  t.formUtils.$win.scrollTop(d.offset().top - 20)),
              !n &&
                t.formUtils.haltValidation &&
                (t.formUtils.errorDisplayPreventedWhenHalted = !0),
              0 === l.length && !t.formUtils.haltValidation
            );
          }),
          (t.fn.restrictLength = function (e) {
            return new t.formUtils.lengthRestriction(this, e), this;
          }),
          (t.fn.addSuggestions = function (e) {
            var i = !1;
            return (
              this.find("input").each(function () {
                var n = t(this);
                (i = t.split(n.attr("data-suggestions"))),
                  i.length > 0 &&
                    !n.hasClass("has-suggestions") &&
                    (t.formUtils.suggest(n, i, e),
                    n.addClass("has-suggestions"));
              }),
              this
            );
          });
      })(t, window),
      (function (t) {
        "use strict";
        t.formUtils = t.extend(t.formUtils || {}, {
          isLoadingModules: !1,
          loadedModules: {},
          registerLoadedModule: function (e) {
            this.loadedModules[t.trim(e).toLowerCase()] = !0;
          },
          hasLoadedModule: function (e) {
            return t.trim(e).toLowerCase() in this.loadedModules;
          },
          loadModules: function (e, i, n) {
            if (t.formUtils.isLoadingModules)
              return void setTimeout(function () {
                t.formUtils.loadModules(e, i, n);
              }, 100);
            var a = function (e, i) {
              var a = t.split(e),
                o = a.length,
                r = function () {
                  0 === --o &&
                    ((t.formUtils.isLoadingModules = !1),
                    "function" == typeof n && n());
                };
              o > 0 && (t.formUtils.isLoadingModules = !0);
              var s = "?_=" + new Date().getTime(),
                l =
                  document.getElementsByTagName("head")[0] ||
                  document.getElementsByTagName("body")[0];
              t.each(a, function (e, n) {
                if (
                  ((n = t.trim(n)),
                  0 === n.length || t.formUtils.hasLoadedModule(n))
                )
                  r();
                else {
                  var a = i + n + (".js" === n.slice(-3) ? "" : ".js"),
                    o = document.createElement("SCRIPT");
                  "function" == typeof define && define.amd
                    ? require([a + (".dev.js" === a.slice(-7) ? s : "")], r)
                    : ((o.type = "text/javascript"),
                      (o.onload = r),
                      (o.src = a + (".dev.js" === a.slice(-7) ? s : "")),
                      (o.onerror = function () {
                        t.formUtils.warn(
                          "Unable to load form validation module " + a,
                          !0
                        ),
                          r();
                      }),
                      (o.onreadystatechange = function () {
                        ("complete" !== this.readyState &&
                          "loaded" !== this.readyState) ||
                          (r(),
                          (this.onload = null),
                          (this.onreadystatechange = null));
                      }),
                      l.appendChild(o));
                }
              });
            };
            if (i) a(e, i);
            else {
              var o = function () {
                var i = !1;
                return (
                  t('script[src*="form-validator"]').each(function () {
                    if (
                      !(
                        this.src
                          .split("form-validator")[1]
                          .split("node_modules").length > 1
                      )
                    )
                      return (
                        (i =
                          this.src.substr(0, this.src.lastIndexOf("/")) + "/"),
                        "/" === i && (i = ""),
                        !1
                      );
                  }),
                  !1 !== i && (a(e, i), !0)
                );
              };
              o() ||
                t(function () {
                  o() || ("function" == typeof n && n());
                });
            }
          },
        });
      })(t),
      (function (t) {
        "use strict";
        (t.split = function (e, i, n) {
          n = void 0 === n || !0 === n;
          var a = "[,|" + (n ? "\\s" : "") + "-]\\s*",
            o = new RegExp(a, "g");
          if ("function" != typeof i) {
            if (!e) return [];
            var r = [];
            return (
              t.each(e.split(i || o), function (e, i) {
                (i = t.trim(i)), i.length && r.push(i);
              }),
              r
            );
          }
          e &&
            t.each(e.split(o), function (e, n) {
              if (((n = t.trim(n)), n.length)) return i(n, e);
            });
        }),
          (t.validate = function (e) {
            var i = t.extend(t.formUtils.defaultConfig(), {
              form: "form",
              validateOnEvent: !1,
              validateOnBlur: !0,
              validateCheckboxRadioOnClick: !0,
              showHelpOnFocus: !0,
              addSuggestions: !0,
              modules: "",
              onModulesLoaded: null,
              language: !1,
              onSuccess: !1,
              onError: !1,
              onElementValidate: !1,
            });
            if (
              ((e = t.extend(i, e || {})),
              t(window).trigger("formValidationPluginInit", [e]),
              e.lang && "en" !== e.lang)
            ) {
              var n = "lang/" + e.lang + ".js";
              e.modules += e.modules.length ? "," + n : n;
            }
            t(e.form).each(function (i, n) {
              n.validationConfig = e;
              var a = t(n);
              a.trigger("formValidationSetup", [a, e]),
                a
                  .find(".has-help-txt")
                  .unbind("focus.validation")
                  .unbind("blur.validation"),
                a
                  .removeClass("has-validation-callback")
                  .unbind("submit.validation")
                  .unbind("reset.validation")
                  .find("input[data-validation],textarea[data-validation]")
                  .unbind("blur.validation"),
                a
                  .bind("submit.validation", function (i) {
                    var n = t(this),
                      a = function () {
                        return i.stopImmediatePropagation(), !1;
                      };
                    if (t.formUtils.haltValidation) return a();
                    if (t.formUtils.isLoadingModules)
                      return (
                        setTimeout(function () {
                          n.trigger("submit.validation");
                        }, 200),
                        a()
                      );
                    var o = n.isValid(e.language, e);
                    return t.formUtils.haltValidation
                      ? a()
                      : o && "function" == typeof e.onSuccess
                      ? !1 === e.onSuccess(n)
                        ? a()
                        : void 0
                      : o || "function" != typeof e.onError
                      ? !!o || a()
                      : (e.onError(n), a());
                  })
                  .bind("reset.validation", function () {
                    t.formUtils.dialogs.removeAllMessagesAndStyling(a, e);
                  })
                  .addClass("has-validation-callback"),
                e.showHelpOnFocus && a.showHelpOnFocus(),
                e.addSuggestions && a.addSuggestions(),
                e.validateOnBlur &&
                  (a.validateOnBlur(e.language, e),
                  a.bind("html5ValidationAttrsFound", function () {
                    a.validateOnBlur(e.language, e);
                  })),
                e.validateOnEvent && a.validateOnEvent(e.language, e);
            }),
              "" !== e.modules &&
                t.formUtils.loadModules(e.modules, null, function () {
                  "function" == typeof e.onModulesLoaded && e.onModulesLoaded();
                  var i = "string" == typeof e.form ? t(e.form) : e.form;
                  t.formUtils.$win.trigger("validatorsLoaded", [i, e]);
                });
          });
      })(t),
      (function (t, e) {
        "use strict";
        var i = t(e);
        t.formUtils = t.extend(t.formUtils || {}, {
          $win: i,
          defaultConfig: function () {
            return {
              ignore: [],
              errorElementClass: "error",
              successElementClass: "valid",
              borderColorOnError: "#b94a48",
              errorMessageClass: "form-error",
              validationRuleAttribute: "data-validation",
              validationErrorMsgAttribute: "data-validation-error-msg",
              errorMessagePosition: "inline",
              errorMessageTemplate: {
                container:
                  '<div class="{errorMessageClass} alert alert-danger">{messages}</div>',
                messages: "<strong>{errorTitle}</strong><ul>{fields}</ul>",
                field: "<li>{msg}</li>",
              },
              scrollToTopOnError: !0,
              dateFormat: "yyyy-mm-dd",
              addValidClassOnAll: !1,
              decimalSeparator: ".",
              inputParentClassOnError: "has-error",
              inputParentClassOnSuccess: "has-success",
              validateHiddenInputs: !1,
              inlineErrorMessageCallback: !1,
              submitErrorMessageCallback: !1,
            };
          },
          validators: {},
          sanitizers: {},
          _events: { load: [], valid: [], invalid: [] },
          haltValidation: !1,
          addValidator: function (t) {
            var e =
              0 === t.name.indexOf("validate_") ? t.name : "validate_" + t.name;
            void 0 === t.validateOnKeyUp && (t.validateOnKeyUp = !0),
              (this.validators[e] = t);
          },
          addSanitizer: function (t) {
            this.sanitizers[t.name] = t;
          },
          warn: function (t, i) {
            "console" in e
              ? "function" == typeof e.console.warn
                ? e.console.warn(t)
                : "function" == typeof e.console.log && e.console.log(t)
              : i && alert(t);
          },
          getValue: function (t, e) {
            var i = e ? e.find(t) : t;
            if (i.length > 0) {
              var n = i.eq(0).attr("type");
              return "radio" === n || "checkbox" === n
                ? i.filter(":checked").val() || ""
                : i.val() || "";
            }
            return !1;
          },
          validateInput: function (e, i, n, a, o) {
            (n = n || t.formUtils.defaultConfig()),
              (i = i || t.formUtils.LANG),
              a.length || (a = e.parent());
            var r = this.getValue(e);
            e.valAttr("skipped", !1)
              .one("beforeValidation", function () {
                (e.attr("disabled") ||
                  (!e.is(":visible") && !n.validateHiddenInputs)) &&
                  e.valAttr("skipped", 1);
              })
              .trigger("beforeValidation", [r, i, n]);
            var s = "true" === e.valAttr("optional"),
              l = !r && s,
              d = e.attr(n.validationRuleAttribute),
              h = !0,
              u = "",
              c = { isValid: !0, shouldChangeDisplay: !0, errorMsg: "" };
            if (!d || l || e.valAttr("skipped"))
              return (c.shouldChangeDisplay = n.addValidClassOnAll), c;
            var f = e.valAttr("ignore");
            return (
              f &&
                t.each(f.split(""), function (t, e) {
                  r = r.replace(new RegExp("\\" + e, "g"), "");
                }),
              t.split(d, function (s) {
                0 !== s.indexOf("validate_") && (s = "validate_" + s);
                var l = t.formUtils.validators[s];
                if (!l)
                  throw new Error(
                    'Using undefined validator "' +
                      s +
                      '". Maybe you have forgotten to load the module that "' +
                      s +
                      '" belongs to?'
                  );
                if (
                  ("validate_checkbox_group" === s &&
                    (e = a.find('[name="' + e.attr("name") + '"]:eq(0)')),
                  ("keyup" !== o || l.validateOnKeyUp) &&
                    (h = l.validatorFunction(r, e, n, i, a, o)),
                  !h)
                )
                  return (
                    n.validateOnBlur && e.validateOnKeyUp(i, n),
                    (u = t.formUtils.dialogs.resolveErrorMessage(
                      e,
                      l,
                      s,
                      n,
                      i
                    )),
                    !1
                  );
              }),
              !1 === h
                ? (e.trigger("validation", !1),
                  (c.errorMsg = u),
                  (c.isValid = !1),
                  (c.shouldChangeDisplay = !0))
                : null === h
                ? (c.shouldChangeDisplay = !1)
                : (e.trigger("validation", !0), (c.shouldChangeDisplay = !0)),
              "function" == typeof n.onElementValidate &&
                null !== u &&
                n.onElementValidate(c.isValid, e, a, u),
              e.trigger("afterValidation", [c, o]),
              c
            );
          },
          parseDate: function (e, i, n) {
            var a,
              o,
              r,
              s,
              l = i.replace(/[a-zA-Z]/gi, "").substring(0, 1),
              d = "^",
              h = i.split(l || null);
            if (
              (t.each(h, function (t, e) {
                d += (t > 0 ? "\\" + l : "") + "(\\d{" + e.length + "})";
              }),
              (d += "$"),
              n)
            ) {
              var u = [];
              t.each(e.split(l), function (t, e) {
                1 === e.length && (e = "0" + e), u.push(e);
              }),
                (e = u.join(l));
            }
            if (null === (a = e.match(new RegExp(d)))) return !1;
            var c = function (e, i, n) {
              for (var a = 0; a < i.length; a++)
                if (i[a].substring(0, 1) === e)
                  return t.formUtils.parseDateInt(n[a + 1]);
              return -1;
            };
            return (
              (r = c("m", h, a)),
              (o = c("d", h, a)),
              (s = c("y", h, a)),
              !(
                (2 === r &&
                  o > 28 &&
                  (s % 4 != 0 || (s % 100 == 0 && s % 400 != 0))) ||
                (2 === r &&
                  o > 29 &&
                  (s % 4 == 0 || (s % 100 != 0 && s % 400 == 0))) ||
                r > 12 ||
                0 === r
              ) &&
                !(
                  (this.isShortMonth(r) && o > 30) ||
                  (!this.isShortMonth(r) && o > 31) ||
                  0 === o
                ) && [s, r, o]
            );
          },
          parseDateInt: function (t) {
            return (
              0 === t.indexOf("0") && (t = t.replace("0", "")), parseInt(t, 10)
            );
          },
          isShortMonth: function (t) {
            return (t % 2 == 0 && t < 7) || (t % 2 != 0 && t > 7);
          },
          lengthRestriction: function (e, i) {
            var n = parseInt(i.text(), 10),
              a = 0,
              o = function () {
                var t = e.val().length;
                if (t > n) {
                  var o = e.scrollTop();
                  e.val(e.val().substring(0, n)), e.scrollTop(o);
                }
                (a = n - t), a < 0 && (a = 0), i.text(a);
              };
            t(e)
              .bind("keydown keyup keypress focus blur", o)
              .bind("cut paste", function () {
                setTimeout(o, 100);
              }),
              t(document).bind("ready", o);
          },
          numericRangeCheck: function (e, i) {
            var n = t.split(i),
              a = parseInt(i.substr(3), 10);
            return (
              1 === n.length &&
                -1 === i.indexOf("min") &&
                -1 === i.indexOf("max") &&
                (n = [i, i]),
              2 === n.length &&
              (e < parseInt(n[0], 10) || e > parseInt(n[1], 10))
                ? ["out", n[0], n[1]]
                : 0 === i.indexOf("min") && e < a
                ? ["min", a]
                : 0 === i.indexOf("max") && e > a
                ? ["max", a]
                : ["ok"]
            );
          },
          _numSuggestionElements: 0,
          _selectedSuggestion: null,
          _previousTypedVal: null,
          suggest: function (e, n, a) {
            var o = {
                css: {
                  maxHeight: "150px",
                  background: "#FFF",
                  lineHeight: "150%",
                  textDecoration: "underline",
                  overflowX: "hidden",
                  overflowY: "auto",
                  border: "#CCC solid 1px",
                  borderTop: "none",
                  cursor: "pointer",
                },
                activeSuggestionCSS: { background: "#E9E9E9" },
              },
              r = function (t, e) {
                var i = e.offset();
                t.css({
                  width: e.outerWidth(),
                  left: i.left + "px",
                  top: i.top + e.outerHeight() + "px",
                });
              };
            a && t.extend(o, a),
              (o.css.position = "absolute"),
              (o.css["z-index"] = 9999),
              e.attr("autocomplete", "off"),
              0 === this._numSuggestionElements &&
                i.bind("resize", function () {
                  t(".jquery-form-suggestions").each(function () {
                    var e = t(this),
                      i = e.attr("data-suggest-container");
                    r(e, t(".suggestions-" + i).eq(0));
                  });
                }),
              this._numSuggestionElements++;
            var s = function (e) {
              var i = e.valAttr("suggestion-nr");
              (t.formUtils._selectedSuggestion = null),
                (t.formUtils._previousTypedVal = null),
                t(".jquery-form-suggestion-" + i).fadeOut("fast");
            };
            return (
              e
                .data("suggestions", n)
                .valAttr("suggestion-nr", this._numSuggestionElements)
                .unbind("focus.suggest")
                .bind("focus.suggest", function () {
                  t(this).trigger("keyup"),
                    (t.formUtils._selectedSuggestion = null);
                })
                .unbind("keyup.suggest")
                .bind("keyup.suggest", function () {
                  var i = t(this),
                    n = [],
                    a = t.trim(i.val()).toLocaleLowerCase();
                  if (a !== t.formUtils._previousTypedVal) {
                    t.formUtils._previousTypedVal = a;
                    var l = !1,
                      d = i.valAttr("suggestion-nr"),
                      h = t(".jquery-form-suggestion-" + d);
                    if ((h.scrollTop(0), "" !== a)) {
                      var u = a.length > 2;
                      t.each(i.data("suggestions"), function (t, e) {
                        var i = e.toLocaleLowerCase();
                        if (i === a)
                          return (
                            n.push("<strong>" + e + "</strong>"), (l = !0), !1
                          );
                        (0 === i.indexOf(a) || (u && i.indexOf(a) > -1)) &&
                          n.push(
                            e.replace(
                              new RegExp(a, "gi"),
                              "<strong>$&</strong>"
                            )
                          );
                      });
                    }
                    l || (0 === n.length && h.length > 0)
                      ? h.hide()
                      : n.length > 0 && 0 === h.length
                      ? ((h = t("<div></div>").css(o.css).appendTo("body")),
                        e.addClass("suggestions-" + d),
                        h
                          .attr("data-suggest-container", d)
                          .addClass("jquery-form-suggestions")
                          .addClass("jquery-form-suggestion-" + d))
                      : n.length > 0 && !h.is(":visible") && h.show(),
                      n.length > 0 &&
                        a.length !== n[0].length &&
                        (r(h, i),
                        h.html(""),
                        t.each(n, function (e, n) {
                          t("<div></div>")
                            .append(n)
                            .css({
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              padding: "5px",
                            })
                            .addClass("form-suggest-element")
                            .appendTo(h)
                            .click(function () {
                              i.focus(),
                                i.val(t(this).text()),
                                i.trigger("change"),
                                s(i);
                            });
                        }));
                  }
                })
                .unbind("keydown.validation")
                .bind("keydown.validation", function (e) {
                  var i,
                    n,
                    a = e.keyCode ? e.keyCode : e.which,
                    r = t(this);
                  if (13 === a && null !== t.formUtils._selectedSuggestion) {
                    if (
                      ((i = r.valAttr("suggestion-nr")),
                      (n = t(".jquery-form-suggestion-" + i)),
                      n.length > 0)
                    ) {
                      var l = n
                        .find("div")
                        .eq(t.formUtils._selectedSuggestion)
                        .text();
                      r.val(l), r.trigger("change"), s(r), e.preventDefault();
                    }
                  } else {
                    (i = r.valAttr("suggestion-nr")),
                      (n = t(".jquery-form-suggestion-" + i));
                    var d = n.children();
                    if (d.length > 0 && t.inArray(a, [38, 40]) > -1) {
                      38 === a
                        ? (null === t.formUtils._selectedSuggestion
                            ? (t.formUtils._selectedSuggestion = d.length - 1)
                            : t.formUtils._selectedSuggestion--,
                          t.formUtils._selectedSuggestion < 0 &&
                            (t.formUtils._selectedSuggestion = d.length - 1))
                        : 40 === a &&
                          (null === t.formUtils._selectedSuggestion
                            ? (t.formUtils._selectedSuggestion = 0)
                            : t.formUtils._selectedSuggestion++,
                          t.formUtils._selectedSuggestion > d.length - 1 &&
                            (t.formUtils._selectedSuggestion = 0));
                      var h = n.innerHeight(),
                        u = n.scrollTop(),
                        c = n.children().eq(0).outerHeight(),
                        f = c * t.formUtils._selectedSuggestion;
                      return (
                        (f < u || f > u + h) && n.scrollTop(f),
                        d
                          .removeClass("active-suggestion")
                          .css("background", "none")
                          .eq(t.formUtils._selectedSuggestion)
                          .addClass("active-suggestion")
                          .css(o.activeSuggestionCSS),
                        e.preventDefault(),
                        !1
                      );
                    }
                  }
                })
                .unbind("blur.suggest")
                .bind("blur.suggest", function () {
                  s(t(this));
                }),
              e
            );
          },
          LANG: {
            errorTitle: "Form submission failed!",
            requiredField: "This is a required field",
            requiredFields: "You have not answered all required fields",
            badTime: "You have not given a correct time",
            badEmail: "You have not given a correct e-mail address",
            badTelephone: "You have not given a correct phone number",
            badSecurityAnswer:
              "You have not given a correct answer to the security question",
            badDate: "You have not given a correct date",
            lengthBadStart: "The input value must be between ",
            lengthBadEnd: " characters",
            lengthTooLongStart: "The input value is longer than ",
            lengthTooShortStart: "The input value is shorter than ",
            notConfirmed: "Input values could not be confirmed",
            badDomain: "Incorrect domain value",
            badUrl: "The input value is not a correct URL",
            badCustomVal: "The input value is incorrect",
            andSpaces: " and spaces ",
            badInt: "The input value was not a correct number",
            badSecurityNumber: "Your social security number was incorrect",
            badUKVatAnswer: "Incorrect UK VAT Number",
            badUKNin: "Incorrect UK NIN",
            badUKUtr: "Incorrect UK UTR Number",
            badStrength: "The password isn't strong enough",
            badNumberOfSelectedOptionsStart: "You have to choose at least ",
            badNumberOfSelectedOptionsEnd: " answers",
            badAlphaNumeric:
              "The input value can only contain alphanumeric characters ",
            badAlphaNumericExtra: " and ",
            wrongFileSize:
              "The file you are trying to upload is too large (max %s)",
            wrongFileType: "Only files of type %s is allowed",
            groupCheckedRangeStart: "Please choose between ",
            groupCheckedTooFewStart: "Please choose at least ",
            groupCheckedTooManyStart: "Please choose a maximum of ",
            groupCheckedEnd: " item(s)",
            badCreditCard: "The credit card number is not correct",
            badCVV: "The CVV number was not correct",
            wrongFileDim: "Incorrect image dimensions,",
            imageTooTall: "the image can not be taller than",
            imageTooWide: "the image can not be wider than",
            imageTooSmall: "the image was too small",
            min: "min",
            max: "max",
            imageRatioNotAccepted: "Image ratio is not be accepted",
            badBrazilTelephoneAnswer: "The phone number entered is invalid",
            badBrazilCEPAnswer: "The CEP entered is invalid",
            badBrazilCPFAnswer: "The CPF entered is invalid",
            badPlPesel: "The PESEL entered is invalid",
            badPlNip: "The NIP entered is invalid",
            badPlRegon: "The REGON entered is invalid",
            badreCaptcha: "Please confirm that you are not a bot",
            passwordComplexityStart: "Password must contain at least ",
            passwordComplexitySeparator: ", ",
            passwordComplexityUppercaseInfo: " uppercase letter(s)",
            passwordComplexityLowercaseInfo: " lowercase letter(s)",
            passwordComplexitySpecialCharsInfo: " special character(s)",
            passwordComplexityNumericCharsInfo: " numeric character(s)",
            passwordComplexityEnd: ".",
          },
        });
      })(t, window),
      (function (t) {
        t.formUtils.addValidator({
          name: "email",
          validatorFunction: function (e) {
            var i = e.toLowerCase().split("@"),
              n = i[0],
              a = i[1];
            if (n && a) {
              if (0 === n.indexOf('"')) {
                var o = n.length;
                if (((n = n.replace(/\"/g, "")), n.length !== o - 2)) return !1;
              }
              return (
                t.formUtils.validators.validate_domain.validatorFunction(
                  i[1]
                ) &&
                0 !== n.indexOf(".") &&
                "." !== n.substring(n.length - 1, n.length) &&
                -1 === n.indexOf("..") &&
                !/[^\w\+\.\-\#\-\_\~\!\$\&\'\(\)\*\+\,\;\=\:]/.test(n)
              );
            }
            return !1;
          },
          errorMessage: "",
          errorMessageKey: "badEmail",
        }),
          t.formUtils.addValidator({
            name: "domain",
            validatorFunction: function (t) {
              return (
                t.length > 0 &&
                t.length <= 253 &&
                !/[^a-zA-Z0-9]/.test(t.slice(-2)) &&
                !/[^a-zA-Z0-9]/.test(t.substr(0, 1)) &&
                !/[^a-zA-Z0-9\.\-]/.test(t) &&
                1 === t.split("..").length &&
                t.split(".").length > 1
              );
            },
            errorMessage: "",
            errorMessageKey: "badDomain",
          }),
          t.formUtils.addValidator({
            name: "required",
            validatorFunction: function (e, i, n, a, o) {
              switch (i.attr("type")) {
                case "checkbox":
                  return i.is(":checked");
                case "radio":
                  return (
                    o
                      .find('input[name="' + i.attr("name") + '"]')
                      .filter(":checked").length > 0
                  );
                default:
                  return "" !== t.trim(e);
              }
            },
            errorMessage: "",
            errorMessageKey: function (t) {
              return "top" === t.errorMessagePosition ||
                "function" == typeof t.errorMessagePosition
                ? "requiredFields"
                : "requiredField";
            },
          }),
          t.formUtils.addValidator({
            name: "length",
            validatorFunction: function (e, i, n, a) {
              var o = i.valAttr("length"),
                r = i.attr("type");
              if (void 0 === o)
                return (
                  alert(
                    'Please add attribute "data-validation-length" to ' +
                      i[0].nodeName +
                      " named " +
                      i.attr("name")
                  ),
                  !0
                );
              var s,
                l =
                  "file" === r && void 0 !== i.get(0).files
                    ? i.get(0).files.length
                    : e.length,
                d = t.formUtils.numericRangeCheck(l, o);
              switch (d[0]) {
                case "out":
                  (this.errorMessage = a.lengthBadStart + o + a.lengthBadEnd),
                    (s = !1);
                  break;
                case "min":
                  (this.errorMessage =
                    a.lengthTooShortStart + d[1] + a.lengthBadEnd),
                    (s = !1);
                  break;
                case "max":
                  (this.errorMessage =
                    a.lengthTooLongStart + d[1] + a.lengthBadEnd),
                    (s = !1);
                  break;
                default:
                  s = !0;
              }
              return s;
            },
            errorMessage: "",
            errorMessageKey: "",
          }),
          t.formUtils.addValidator({
            name: "url",
            validatorFunction: function (e) {
              if (
                /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
                  e
                )
              ) {
                var i = e.split("://")[1],
                  n = i.indexOf("/");
                return (
                  n > -1 && (i = i.substr(0, n)),
                  t.formUtils.validators.validate_domain.validatorFunction(i)
                );
              }
              return !1;
            },
            errorMessage: "",
            errorMessageKey: "badUrl",
          }),
          t.formUtils.addValidator({
            name: "number",
            validatorFunction: function (t, e, i) {
              if ("" !== t) {
                var n,
                  a,
                  o = e.valAttr("allowing") || "",
                  r = e.valAttr("decimal-separator") || i.decimalSeparator,
                  s = !1,
                  l = e.valAttr("step") || "",
                  d = !1;
                if (
                  (e.attr("data-sanitize") || "").match(
                    /(^|[\s])numberFormat([\s]|$)/i
                  )
                ) {
                  if (!window.numeral)
                    throw new ReferenceError(
                      "The data-sanitize value numberFormat cannot be used without the numeral library. Please see Data Validation in http://www.formvalidator.net for more information."
                    );
                  t.length && (t = String(numeral().unformat(t)));
                }
                if (
                  (-1 === o.indexOf("number") && (o += ",number"),
                  -1 === o.indexOf("negative") && 0 === t.indexOf("-"))
                )
                  return !1;
                if (
                  (o.indexOf("range") > -1 &&
                    ((n = parseFloat(
                      o.substring(o.indexOf("[") + 1, o.indexOf(";"))
                    )),
                    (a = parseFloat(
                      o.substring(o.indexOf(";") + 1, o.indexOf("]"))
                    )),
                    (s = !0)),
                  "" !== l && (d = !0),
                  "," === r)
                ) {
                  if (t.indexOf(".") > -1) return !1;
                  t = t.replace(",", ".");
                }
                if (
                  "" === t.replace(/[0-9-]/g, "") &&
                  (!s || (t >= n && t <= a)) &&
                  (!d || t % l == 0)
                )
                  return !0;
                if (
                  o.indexOf("float") > -1 &&
                  null !== t.match(new RegExp("^([0-9-]+)\\.([0-9]+)$")) &&
                  (!s || (t >= n && t <= a)) &&
                  (!d || t % l == 0)
                )
                  return !0;
              }
              return !1;
            },
            errorMessage: "",
            errorMessageKey: "badInt",
          }),
          t.formUtils.addValidator({
            name: "alphanumeric",
            validatorFunction: function (e, i, n, a) {
              var o = i.valAttr("allowing"),
                r = "",
                s = !1;
              if (o) {
                r = "^([a-zA-Z0-9" + o + "]+)$";
                var l = o.replace(/\\/g, "");
                l.indexOf(" ") > -1 &&
                  ((s = !0),
                  (l = l.replace(" ", "")),
                  (l += a.andSpaces || t.formUtils.LANG.andSpaces)),
                  a.badAlphaNumericAndExtraAndSpaces &&
                  a.badAlphaNumericAndExtra
                    ? (this.errorMessage = s
                        ? a.badAlphaNumericAndExtraAndSpaces + l
                        : a.badAlphaNumericAndExtra +
                          l +
                          a.badAlphaNumericExtra)
                    : (this.errorMessage =
                        a.badAlphaNumeric + a.badAlphaNumericExtra + l);
              } else
                (r = "^([a-zA-Z0-9]+)$"),
                  (this.errorMessage = a.badAlphaNumeric);
              return new RegExp(r).test(e);
            },
            errorMessage: "",
            errorMessageKey: "",
          }),
          t.formUtils.addValidator({
            name: "custom",
            validatorFunction: function (t, e) {
              return new RegExp(e.valAttr("regexp")).test(t);
            },
            errorMessage: "",
            errorMessageKey: "badCustomVal",
          }),
          t.formUtils.addValidator({
            name: "date",
            validatorFunction: function (e, i, n) {
              var a = i.valAttr("format") || n.dateFormat || "yyyy-mm-dd",
                o = "false" === i.valAttr("require-leading-zero");
              return !1 !== t.formUtils.parseDate(e, a, o);
            },
            errorMessage: "",
            errorMessageKey: "badDate",
          }),
          t.formUtils.addValidator({
            name: "checkbox_group",
            validatorFunction: function (e, i, n, a, o) {
              var r = !0,
                s = i.attr("name"),
                l = t('input[type=checkbox][name^="' + s + '"]', o),
                d = l.filter(":checked").length,
                h = i.valAttr("qty");
              if (void 0 === h) {
                var u = i.get(0).nodeName;
                alert(
                  'Attribute "data-validation-qty" is missing from ' +
                    u +
                    " named " +
                    i.attr("name")
                );
              }
              var c = t.formUtils.numericRangeCheck(d, h);
              switch (c[0]) {
                case "out":
                  (this.errorMessage =
                    a.groupCheckedRangeStart + h + a.groupCheckedEnd),
                    (r = !1);
                  break;
                case "min":
                  (this.errorMessage =
                    a.groupCheckedTooFewStart +
                    c[1] +
                    (a.groupCheckedTooFewEnd || a.groupCheckedEnd)),
                    (r = !1);
                  break;
                case "max":
                  (this.errorMessage =
                    a.groupCheckedTooManyStart +
                    c[1] +
                    (a.groupCheckedTooManyEnd || a.groupCheckedEnd)),
                    (r = !1);
                  break;
                default:
                  r = !0;
              }
              if (!r) {
                var f = function () {
                  l.unbind("click", f),
                    l
                      .filter("*[data-validation]")
                      .validateInputOnBlur(a, n, !1, "blur");
                };
                l.bind("click", f);
              }
              return r;
            },
          });
      })(t);
  });
