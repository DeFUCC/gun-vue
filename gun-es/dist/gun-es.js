var L = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ye(R) {
  return R && R.__esModule && Object.prototype.hasOwnProperty.call(R, "default") ? R.default : R;
}
var te = {}, ve = {
  get exports() {
    return te;
  },
  set exports(R) {
    te = R;
  }
}, ue;
function pe() {
  return ue || (ue = {
    "/gun.js": G
  });
}
function re(R) {
  function g(A) {
    var x = ae(A, R);
    if (x !== null)
      return pe()[x]();
    throw new Error('Could not dynamically require "' + A + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  return g.resolve = function(A) {
    var x = ae(A, R);
    return x !== null ? x : require.resolve(A);
  }, g;
}
function ae(R, g) {
  var A = we(R);
  R = Y(R);
  var x;
  R[0] === "/" && (g = "");
  for (var r = pe(), c = ["", ".js", ".json"]; A ? x = Y(g + "/node_modules/" + R) : x = Y(g + "/" + R), !x.endsWith("/.."); ) {
    for (var h = 0; h < c.length; h++) {
      var y = x + c[h];
      if (r[y])
        return y;
    }
    if (!A)
      break;
    var p = Y(g + "/..");
    if (p === g)
      break;
    g = p;
  }
  return null;
}
function we(R) {
  var g = R[0];
  if (g === "/" || g === "\\")
    return !1;
  var A = R[1], x = R[2];
  return !(g === "." && (!A || A === "/" || A === "\\") || g === "." && A === "." && (!x || x === "/" || x === "\\") || A === ":" && (x === "/" || x === "\\"));
}
function Y(R) {
  R = R.replace(/\\/g, "/");
  for (var g = R.split("/"), A = g[0] === "", x = 1; x < g.length; x++)
    (g[x] === "." || g[x] === "") && g.splice(x--, 1);
  for (var x = 1; x < g.length; x++)
    g[x] === ".." && x > 0 && g[x - 1] !== ".." && g[x - 1] !== "." && (g.splice(--x, 2), x--);
  return R = g.join("/"), A && R[0] !== "/" ? R = "/" + R : R.length === 0 && (R = "."), R;
}
var V = {}, ge = {
  get exports() {
    return V;
  },
  set exports(R) {
    V = R;
  }
}, fe;
function G() {
  return fe || (fe = 1, function(R) {
    (function() {
      function g(x, r) {
        return r ? re("/")(x) : x.slice ? g[c(x)] : function(h, y) {
          x(h = { exports: {} }), g[c(y)] = h.exports;
        };
        function c(h) {
          return h.split("/").slice(-1).toString().replace(".js", "");
        }
      }
      var A = R;
      g(function(x) {
        String.random = function(c, h) {
          var y = "";
          for (c = c || 24, h = h || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz"; c-- > 0; )
            y += h.charAt(Math.floor(Math.random() * h.length));
          return y;
        }, String.match = function(c, h) {
          var y, p;
          return typeof c != "string" ? !1 : (typeof h == "string" && (h = { "=": h }), h = h || {}, y = h["="] || h["*"] || h[">"] || h["<"], c === y ? !0 : p !== h["="] ? !1 : (y = h["*"] || h[">"], c.slice(0, (y || "").length) === y ? !0 : p !== h["*"] ? !1 : p !== h[">"] && p !== h["<"] ? c >= h[">"] && c <= h["<"] : p !== h[">"] && c >= h[">"] || p !== h["<"] && c <= h["<"]));
        }, String.hash = function(c, h) {
          if (typeof c == "string") {
            if (h = h || 0, !c.length)
              return h;
            for (var y = 0, p = c.length, e; y < p; ++y)
              e = c.charCodeAt(y), h = (h << 5) - h + e, h |= 0;
            return h;
          }
        };
        var r = Object.prototype.hasOwnProperty;
        Object.plain = function(c) {
          return c ? c instanceof Object && c.constructor === Object || Object.prototype.toString.call(c).match(/^\[object (\w+)\]$/)[1] === "Object" : !1;
        }, Object.empty = function(c, h) {
          for (var y in c)
            if (r.call(c, y) && (!h || h.indexOf(y) == -1))
              return !1;
          return !0;
        }, Object.keys = Object.keys || function(c) {
          var h = [];
          for (var y in c)
            r.call(c, y) && h.push(y);
          return h;
        }, function() {
          var c, h = setTimeout, y = 0, p = 0, e = typeof setImmediate != "" + c && setImmediate || function(o, u) {
            return typeof MessageChannel == "" + c ? h : ((o = new MessageChannel()).port1.onmessage = function(T) {
              T.data == "" && u();
            }, function(T) {
              u = T, o.port2.postMessage("");
            });
          }(), a = h.check = h.check || typeof performance != "" + c && performance || { now: function() {
            return +/* @__PURE__ */ new Date();
          } };
          h.hold = h.hold || 9, h.poll = h.poll || function(o) {
            if (h.hold >= a.now() - y && p++ < 3333) {
              o();
              return;
            }
            e(function() {
              y = a.now(), o();
            }, p = 0);
          };
        }(), function() {
          var c = setTimeout, h = c.turn = c.turn || function(u) {
            y.push(u) == 1 && p(o);
          }, y = h.s = [], p = c.poll, e = 0, a, o = function() {
            (a = y[e++]) && a(), (e == y.length || e == 99) && (y = h.s = y.slice(e), e = 0), y.length && p(o);
          };
        }(), function() {
          var c, h = setTimeout, y = h.turn;
          (h.each = h.each || function(p, e, a, o) {
            o = o || 9, function u(T, n, v) {
              if (n = (T = (p || []).splice(0, o)).length) {
                for (var d = 0; d < n && c === (v = e(T[d])); d++)
                  ;
                if (c === v) {
                  y(u);
                  return;
                }
              }
              a && a(v);
            }();
          })();
        }();
      })(g, "./shim"), g(function(x) {
        x.exports = function r(a, h, y) {
          if (!a)
            return { to: r };
          var p, e = typeof h == "function", a = (this.tag || (this.tag = {}))[a] || e && (this.tag[a] = { tag: a, to: r._ = { next: function(u) {
            var T;
            (T = this.to) && T.next(u);
          } } });
          if (e) {
            var o = {
              off: r.off || (r.off = function() {
                if (this.next === r._.next)
                  return !0;
                this === this.the.last && (this.the.last = this.back), this.to.back = this.back, this.next = r._.next, this.back.to = this.to, this.the.last === this.the && delete this.on.tag[this.the.tag];
              }),
              to: r._,
              next: h,
              the: a,
              on: this,
              as: y
            };
            return (o.back = a.last || a).to = o, a.last = o;
          }
          return (a = a.to) && p !== h && a.next(h), a;
        };
      })(g, "./onto"), g(function(x) {
        x.exports = function(r) {
          return r === null || typeof r == "string" || typeof r == "boolean" || // we want +/- Infinity to be, but JSON does not support it, sad face.
          // can you guess what v === v checks for? ;)
          typeof r == "number" && r != 1 / 0 && r != -1 / 0 && r === r || !!r && typeof r["#"] == "string" && Object.keys(r).length === 1 && r["#"];
        };
      })(g, "./valid"), g(function(x) {
        g("./shim");
        function r() {
          var a = +/* @__PURE__ */ new Date();
          return p < a ? (h = 0, p = a + r.drift) : p = a + (h += 1) / y + r.drift;
        }
        r.drift = 0;
        var c = -1 / 0, h = 0, y = 999, p = c, e;
        r.is = function(a, o, u) {
          var T = o && a && a._ && a._[">"] || u;
          if (T)
            return typeof (T = T[o]) == "number" ? T : c;
        }, r.ify = function(a, o, u, T, n) {
          (a = a || {})._ = a._ || {}, n && (a._["#"] = n);
          var v = a._[">"] || (a._[">"] = {});
          return e !== o && o !== "_" && (typeof u == "number" && (v[o] = u), e !== T && (a[o] = T)), a;
        }, x.exports = r;
      })(g, "./state"), g(function(x) {
        g("./shim");
        function r(c) {
          var h = { s: {} }, y = h.s;
          c = c || { max: 999, age: 1e3 * 9 }, h.check = function(e) {
            return y[e] ? p(e) : !1;
          };
          var p = h.track = function(e) {
            var a = y[e] || (y[e] = {});
            return a.was = h.now = +/* @__PURE__ */ new Date(), h.to || (h.to = setTimeout(h.drop, c.age + 9)), p.ed && p.ed(e), a;
          };
          return h.drop = function(e) {
            h.to = null, h.now = +/* @__PURE__ */ new Date();
            var a = Object.keys(y);
            console.STAT && console.STAT(h.now, +/* @__PURE__ */ new Date() - h.now, "dup drop keys"), setTimeout.each(a, function(o) {
              var u = y[o];
              u && (e || c.age) > h.now - u.was || delete y[o];
            }, 0, 99);
          }, h;
        }
        x.exports = r;
      })(g, "./dup"), g(function(x) {
        g("./onto"), x.exports = function(h, y) {
          if (this.on) {
            var p = (this.opt || {}).lack || 9e3;
            if (typeof h != "function") {
              if (!h)
                return;
              var a = h["#"] || h, e = (this.tag || "")[a];
              return e ? (y && (e = this.on(a, y), clearTimeout(e.err), e.err = setTimeout(function() {
                e.off();
              }, p)), !0) : void 0;
            }
            var a = y && y["#"] || r(9);
            if (!h)
              return a;
            var o = this.on(a, h, y);
            return o.err = o.err || setTimeout(function() {
              o.off(), o.next({ err: "Error: No ACK yet.", lack: !0 });
            }, p), a;
          }
        };
        var r = String.random || function() {
          return Math.random().toString(36).slice(2);
        };
      })(g, "./ask"), g(function(x) {
        function r(n) {
          return n instanceof r ? (this._ = { $: this }).$ : this instanceof r ? r.create(this._ = { $: this, opt: n }) : new r(n);
        }
        r.is = function(n) {
          return n instanceof r || n && n._ && n === n._.$ || !1;
        }, r.version = 0.202, r.chain = r.prototype, r.chain.toJSON = function() {
        }, g("./shim"), r.valid = g("./valid"), r.state = g("./state"), r.on = g("./onto"), r.dup = g("./dup"), r.ask = g("./ask"), function() {
          r.create = function(s) {
            s.root = s.root || s, s.graph = s.graph || {}, s.on = s.on || r.on, s.ask = s.ask || r.ask, s.dup = s.dup || r.dup();
            var _ = s.$.opt(s.opt);
            return s.once || (s.on("in", n, s), s.on("out", n, s), s.on("put", w, s), r.on("create", s), s.on("create", s)), s.once = 1, _;
          };
          function n(s) {
            if (s) {
              if (s.out === n) {
                this.to.next(s);
                return;
              }
              var _ = this, O = _.as, N = O.at || O, E = N.$, D = N.dup, I, P = s.DBG;
              if ((I = s["#"]) || (I = s["#"] = h(9)), !D.check(I)) {
                if (D.track(I), I = s._, s._ = typeof I == "function" ? I : function() {
                }, s.$ && s.$ === (s.$._ || "").$ || (s.$ = E), s["@"] && !s.put && t(s), !N.ask(s["@"], s))
                  if (P && (P.u = +/* @__PURE__ */ new Date()), s.put) {
                    v(s);
                    return;
                  } else
                    s.get && r.on.get(s, E);
                P && (P.uc = +/* @__PURE__ */ new Date()), _.to.next(s), P && (P.ua = +/* @__PURE__ */ new Date()), !(s.nts || s.NTS) && (s.out = n, N.on("out", s), P && (P.ue = +/* @__PURE__ */ new Date()));
              }
            }
          }
          function v(s) {
            if (s) {
              var _ = s._ || "", O = _.root = ((_.$ = s.$ || "")._ || "").root;
              if (s["@"] && _.faith && !_.miss) {
                s.out = n, O.on("out", s);
                return;
              }
              _.latch = O.hatch, _.match = O.hatch = [];
              var N = s.put, E = _.DBG = s.DBG, D = +/* @__PURE__ */ new Date();
              if ($ = $ || D, !(N["#"] && N["."])) {
                E && (E.p = D), _["#"] = s["#"], _.msg = s, _.all = 0, _.stun = 1;
                var I = Object.keys(N);
                console.STAT && console.STAT(D, ((E || _).pk = +/* @__PURE__ */ new Date()) - D, "put sort");
                var P = 0, J, U, M, K, q, H, B;
                (function F(z) {
                  if (J != P) {
                    if (J = P, !(M = I[P])) {
                      console.STAT && console.STAT(D, ((E || _).pd = +/* @__PURE__ */ new Date()) - D, "put"), i(_);
                      return;
                    }
                    (K = N[M]) ? (B = K._) ? M !== B["#"] ? H = l + S(M) + "soul not same." : (q = B[">"]) || (H = l + S(M) + "no state.") : H = l + S(M) + "no meta." : H = l + S(M) + "no node.", U = Object.keys(K || {});
                  }
                  if (H) {
                    s.err = _.err = H, i(_);
                    return;
                  }
                  var ie = 0, W;
                  for (z = z || 0; z++ < 9 && (W = U[ie++]); )
                    if (W !== "_") {
                      var Q = K[W], oe = q[W];
                      if (o === oe) {
                        H = l + S(W) + "on" + S(M) + "no state.";
                        break;
                      }
                      if (!p(Q)) {
                        H = l + S(W) + "on" + S(M) + "bad " + typeof Q + S(Q);
                        break;
                      }
                      d(Q, W, M, oe, s), ++C;
                    }
                  if ((U = U.slice(ie)).length) {
                    y(F);
                    return;
                  }
                  ++P, U = null, F(z);
                })();
              }
            }
          }
          r.on.put = v;
          function d(s, _, O, N, E) {
            var D = E._ || "", I = D.root, P = I.graph, J, U = P[O] || u, M = e(U, _, 1), K = U[_], q = D.DBG;
            (J = console.STAT) && (!P[O] || !K) && (J.has = (J.has || 0) + 1);
            var H = j();
            if (N > H) {
              setTimeout(function() {
                d(s, _, O, N, E);
              }, (J = N - H) > b ? b : J), console.STAT && console.STAT((q || D).Hf = +/* @__PURE__ */ new Date(), J, "future");
              return;
            }
            if (!(N < M) && !(!D.faith && N === M && (s === K || k(s) <= k(K)) && !D.miss)) {
              D.stun++;
              var B = E["#"] + D.all++, F = { toString: function() {
                return B;
              }, _: D };
              F.toJSON = F.toString, I.dup.track(F)["#"] = E["#"], q && (q.ph = q.ph || +/* @__PURE__ */ new Date()), I.on("put", { "#": F, "@": E["@"], put: { "#": O, ".": _, ":": s, ">": N }, ok: E.ok, _: D });
            }
          }
          function w(s) {
            var _;
            (_ = (s._ || "").DBG) && (_.pa = +/* @__PURE__ */ new Date(), _.pm = _.pm || +/* @__PURE__ */ new Date());
            var O = this, N = O.as, E = N.graph, D = s._, I = s.put, P = I["#"], J = I["."], U = I[":"], M = I[">"];
            s["#"];
            var K;
            (K = D.msg) && (K = K.put) && (K = K[P]) && a(K, J, M, U, P), E[P] = a(E[P], J, M, U, P), (K = (N.next || "")[P]) && K.on("in", s), i(D), O.to.next(s);
          }
          function i(s, _) {
            var O;
            if (!s.stop && !(!s.err && 0 < --s.stun) && (s.stop = 1, !!(O = s.root))) {
              var N = s.match;
              N.end = 1, N === O.hatch && (!(N = s.latch) || N.end ? delete O.hatch : O.hatch = N), s.hatch && s.hatch(), setTimeout.each(s.match, function(E) {
                E && E();
              }), !(!(_ = s.msg) || s.err || _.err) && (_.out = n, s.root.on("out", _), m());
            }
          }
          function t(s) {
            var _ = s["@"] || "", O;
            if (!(O = _._)) {
              var N = (N = s.$) && (N = N._) && (N = N.root) && (N = N.dup);
              if (!(N = N.check(_)))
                return;
              s["@"] = N["#"] || s["@"];
              return;
            }
            O.acks = (O.acks || 0) + 1, (O.err = s.err) && (s["@"] = O["#"], i(O)), O.ok = s.ok || O.ok, !O.stop && !O.crack && (O.crack = O.match && O.match.push(function() {
              f(O);
            })), f(O);
          }
          function f(s) {
            !s || !s.root || s.stun || s.acks !== s.all || s.root.on("in", { "@": s["#"], err: s.err, ok: s.err ? o : s.ok || { "": 1 } });
          }
          var l = "Error: Invalid graph!", S = function(s) {
            return " '" + ("" + s).slice(0, 9) + "...' ";
          }, k = JSON.stringify, b = 2147483647, j = r.state, C = 0, $, m = function() {
            C > 999 && C / -($ - ($ = +/* @__PURE__ */ new Date())) > 1 && (r.window && console.log("Warning: You're syncing 1K+ records a second, faster than DOM can update - consider limiting query."), m = function() {
              C = 0;
            });
          };
        }(), function() {
          r.on.get = function(v, d) {
            var w = d._, i = v.get, t = i["#"], f = w.graph[t], l = i["."], S = w.next || (w.next = {}), k = S[t], b = v._ || {}, j = b.DBG = v.DBG;
            if (j && (j.g = +/* @__PURE__ */ new Date()), !f)
              return w.on("get", v);
            if (l) {
              if ((typeof l != "string" || o === f[l]) && !((k || "").next || "")[l]) {
                w.on("get", v);
                return;
              }
              f = a({}, l, e(f, l), f[l], t);
            }
            f && n(v, f), w.on("get", v);
          };
          function n(v, d) {
            var w = +/* @__PURE__ */ new Date(), i = v._ || {}, t = i.DBG = v.DBG, f = v["#"], l = h(9), S = Object.keys(d || "").sort(), k = ((d || "")._ || "")["#"];
            S.length;
            var b = v.$._.root, j = d === b.graph[k];
            console.STAT && console.STAT(w, ((t || i).gk = +/* @__PURE__ */ new Date()) - w, "got keys"), d && function C() {
              w = +/* @__PURE__ */ new Date();
              for (var $ = 0, m, s = {}, _; $ < 9 && (m = S[$++]); )
                a(s, m, e(d, m), d[m], k);
              S = S.slice($), (_ = {})[k] = s, s = _;
              var O;
              j && (O = function() {
              }, O.ram = O.faith = !0), _ = S.length, console.STAT && console.STAT(w, -(w - (w = +/* @__PURE__ */ new Date())), "got copied some"), t && (t.ga = +/* @__PURE__ */ new Date()), b.on("in", { "@": f, "#": l, put: s, "%": _ ? l = h(9) : o, $: b.$, _: O, DBG: t, FOO: 1 }), console.STAT && console.STAT(w, +/* @__PURE__ */ new Date() - w, "got in"), _ && setTimeout.turn(C);
            }(), d || b.on("in", { "@": v["#"] });
          }
          r.on.get.ack = n;
        }(), function() {
          r.chain.opt = function(n) {
            n = n || {};
            var v = this, d = v._, w = n.peers || n;
            return Object.plain(n) || (n = {}), Object.plain(d.opt) || (d.opt = n), typeof w == "string" && (w = [w]), Object.plain(d.opt.peers) || (d.opt.peers = {}), w instanceof Array && (n.peers = {}, w.forEach(function(i) {
              var t = {};
              t.id = t.url = i, n.peers[i] = d.opt.peers[i] = d.opt.peers[i] || t;
            })), c(n, function i(t) {
              var f = this[t];
              if (this && this.hasOwnProperty(t) || typeof f == "string" || Object.empty(f)) {
                this[t] = f;
                return;
              }
              f && f.constructor !== Object && !(f instanceof Array) || c(f, i);
            }), d.opt.from = n, r.on("opt", d), d.opt.uuid = d.opt.uuid || function(t) {
              return r.state().toString(36).replace(".", "") + String.random(t || 12);
            }, v;
          };
        }();
        var c = function(n, v) {
          Object.keys(n).forEach(v, n);
        }, h = String.random, y = setTimeout.turn, p = r.valid, e = r.state.is, a = r.state.ify, o, u = {}, T;
        r.log = function() {
          return !r.log.off && T.log.apply(T, arguments), [].slice.call(arguments).join(" ");
        }, r.log.once = function(n, v, d) {
          return (d = r.log.once)[n] = d[n] || 0, d[n]++ || r.log(v);
        }, typeof window < "u" && ((window.GUN = window.Gun = r).window = window);
        try {
          typeof A < "u" && (A.exports = r);
        } catch {
        }
        x.exports = r, (r.window || {}).console = (r.window || {}).console || { log: function() {
        } }, (T = console).only = function(n, v) {
          return T.only.i && n === T.only.i && T.only.i++ && (T.log.apply(T, arguments) || v);
        }, r.log.once("welcome", "Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!");
      })(g, "./root"), g(function(x) {
        var r = g("./root");
        r.chain.back = function(y, p) {
          var e;
          if (y = y || 1, y === -1 || y === 1 / 0)
            return this._.root.$;
          if (y === 1)
            return (this._.back || this._).$;
          var a = this, o = a._;
          if (typeof y == "string" && (y = y.split(".")), y instanceof Array) {
            var u = 0, T = y.length, e = o;
            for (u; u < T; u++)
              e = (e || c)[y[u]];
            return h !== e ? p ? a : e : (e = o.back) ? e.$.back(y, p) : void 0;
          }
          if (typeof y == "function") {
            for (var n, e = { back: o }; (e = e.back) && h === (n = y(e, p)); )
              ;
            return n;
          }
          return typeof y == "number" ? (o.back || o).$.back(y - 1) : this;
        };
        var c = {}, h;
      })(g, "./back"), g(function(x) {
        var r = g("./root");
        r.chain.chain = function(i) {
          var t = this, f = t._, l = new (i || t).constructor(t), S = l._, k;
          return S.root = k = f.root, S.id = ++k.once, S.back = t._, S.on = r.on, S.on("in", r.on.in, S), S.on("out", r.on.out, S), l;
        };
        function c(i) {
          var t, f = this.as, l = f.back, S = f.root, k;
          if (i.$ || (i.$ = f.$), this.to.next(i), f.err) {
            f.on("in", { put: f.put = o, $: f.$ });
            return;
          }
          if (t = i.get) {
            if (S.pass && (S.pass[f.id] = f), f.lex && Object.keys(f.lex).forEach(function(b) {
              k[b] = f.lex[b];
            }, k = i.get = i.get || {}), t["#"] || f.soul) {
              if (t["#"] = t["#"] || f.soul, i["#"] || (i["#"] = u(9)), l = S.$.get(t["#"])._, t = t["."]) {
                if (n(l.put, t) && (k = l.ask && l.ask[t], (l.ask || (l.ask = {}))[t] = l.$.get(t)._, l.on("in", { get: t, put: { "#": l.soul, ".": t, ":": l.put[t], ">": d(S.graph[l.soul], t) } }), k))
                  return;
              } else {
                if (k = l.ask && l.ask[""], (l.ask || (l.ask = {}))[""] = l, o !== l.put && (l.on("in", l), k))
                  return;
                i.$ = l.$;
              }
              return S.ask(e, i), S.on("in", i);
            }
            if (t["."])
              return f.get ? (i = { get: { ".": f.get }, $: f.$ }, (l.ask || (l.ask = {}))[f.get] = i.$._, l.on("out", i)) : (i = { get: f.lex ? i.get : {}, $: f.$ }, l.on("out", i));
            if ((f.ask || (f.ask = {}))[""] = f, f.get)
              return t["."] = f.get, (l.ask || (l.ask = {}))[f.get] = i.$._, l.on("out", i);
          }
          return l.on("out", i);
        }
        r.on.out = c;
        function h(i, t) {
          t = t || this.as;
          var f = t.root, l = i.$ || (i.$ = t.$), S = (l || "")._ || a, k = i.put || "", b = k["#"], j = k["."], C = o !== k["="] ? k["="] : k[":"], $ = k[">"] || -1 / 0, m;
          if (o !== i.put && (o === k["#"] || o === k["."] || o === k[":"] && o === k["="] || o === k[">"])) {
            if (!T(k)) {
              if (!(b = ((k || "")._ || "")["#"])) {
                console.log("chain not yet supported for", k, "...", i, t);
                return;
              }
              return l = t.root.$.get(b), setTimeout.each(Object.keys(k).sort(), function(s) {
                s == "_" || o === ($ = d(k, s)) || t.on("in", { $: l, put: { "#": b, ".": s, "=": k[s], ">": $ }, VIA: i });
              });
            }
            t.on("in", { $: S.back.$, put: { "#": b = S.back.soul, ".": j = S.has || S.get, "=": k, ">": d(S.back.put, j) }, via: i });
            return;
          }
          (i.seen || "")[t.id] || ((i.seen || (i.seen = function() {
          }))[t.id] = t, t !== S && (Object.keys(i).forEach(function(s) {
            k[s] = i[s];
          }, k = {}), k.get = t.get || k.get, !t.soul && !t.has ? k.$$$ = k.$$$ || t.$ : S.soul && (k.$ = t.$, k.$$ = k.$$ || S.$), i = k), p(i, t), (t.soul || i.$$) && $ >= d(f.graph[b], j) && ((k = f.$.get(b)._).put = w(k.put, j, $, C, b)), !S.soul && $ >= d(f.graph[b], j) && (m = (f.$.get(b)._.next || "")[j]) && (m.put = C, typeof (k = T(C)) == "string" && (m.put = f.$.get(k)._.put || C)), this.to && this.to.next(i), t.any && setTimeout.each(Object.keys(t.any), function(s) {
            (s = t.any[s]) && s(i);
          }, 0, 99), t.echo && setTimeout.each(Object.keys(t.echo), function(s) {
            (s = t.echo[s]) && s.on("in", i);
          }, 0, 99), ((i.$$ || "")._ || S).soul && (m = t.next) && (m = m[j]) && (k = {}, Object.keys(i).forEach(function(s) {
            k[s] = i[s];
          }), k.$ = (i.$$ || i.$).get(k.get = j), delete k.$$, delete k.$$$, m.on("in", k)), y(i, t));
        }
        r.on.in = h;
        function y(i, t) {
          if (t = t || this.as || i.$._, !(i.$$ && this !== r.on) && !(!i.put || t.soul)) {
            var f = i.put || "", l = f["="] || f[":"], j, S = t.root, k = S.$.get(f["#"]).get(f["."])._;
            if (typeof (l = T(l)) != "string") {
              this === r.on && ((k.echo || (k.echo = {}))[t.id] = t);
              return;
            }
            if (!((k.echo || (k.echo = {}))[t.id] && !(S.pass || "")[t.id])) {
              if (j = S.pass) {
                if (j[l + t.id])
                  return;
                j[l + t.id] = 1;
              }
              (k.echo || (k.echo = {}))[t.id] = t, t.has && (t.link = l);
              var b = S.$.get(k.link = l)._;
              (b.echo || (b.echo = {}))[k.id] = k;
              var j = t.ask || "";
              (j[""] || t.lex) && b.on("out", { get: { "#": l } }), setTimeout.each(Object.keys(j), function(C, $) {
                !C || !($ = j[C]) || $.on("out", { get: { "#": l, ".": C } });
              }, 0, 99);
            }
          }
        }
        r.on.link = y;
        function p(i, t) {
          var f = i.put || "", l = o !== f["="] ? f["="] : f[":"], S = t.root, k, b;
          if (o === l) {
            if (t.soul && o !== t.put || (b = (i.$$ || i.$ || "")._ || "", i["@"] && (o !== b.put || o !== t.put)))
              return;
            (k = t.link || i.linked) && delete (S.$.get(k)._.echo || "")[t.id], t.has && (t.link = null), t.put = o, setTimeout.each(Object.keys(t.next || ""), function(j, C) {
              (C = t.next[j]) && (k && delete (S.$.get(k).get(j)._.echo || "")[C.id], C.on("in", { get: j, put: o, $: C.$ }));
            }, 0, 99);
            return;
          }
          t.soul || i.$$ || (k = T(l), b = i.$._ || "", !((k === b.link || t.has && !b.link) && !((S.pass || "")[t.id] && typeof k != "string")) && (delete (b.echo || "")[t.id], p({ get: t.get, put: o, $: i.$, linked: i.linked = i.linked || b.link }, t)));
        }
        r.on.unlink = p;
        function e(i, t) {
          var f = this.as, l = f.$._;
          l.root;
          var S = f.get || "", k = (i.put || "")[S["#"]] || "";
          if (!i.put || typeof S["."] == "string" && o === k[S["."]]) {
            if (o !== l.put || !l.soul && !l.has)
              return;
            l.ack = (l.ack || 0) + 1, l.on("in", {
              get: l.get,
              put: l.put = o,
              $: l.$,
              "@": i["@"]
            });
            return;
          }
          (i._ || {}).miss = 1, r.on.put(i);
        }
        var a = {}, o, u = String.random, T = r.valid, n = function(i, t) {
          return i && Object.prototype.hasOwnProperty.call(i, t);
        }, v = r.state, d = v.is, w = v.ify;
      })(g, "./chain"), g(function(x) {
        var r = g("./root");
        r.chain.get = function(o, u, T) {
          var n, v;
          if (typeof o == "string") {
            if (o.length == 0)
              return (n = this.chain())._.err = { err: r.log("0 length key!", o) }, u && u.call(n, n._.err), n;
            var d = this, w = d._, i = w.next || p;
            (n = i[o]) || (n = o && c(o, d)), n = n && n.$;
          } else if (typeof o == "function") {
            let b = function(j, C, $) {
              if (!b.stun && !((E = f.pass) && !E[l])) {
                var m = j.$._, s = (j.$$ || "")._, _ = (s || m).put, O = !m.has && !m.soul, N = {}, E;
                if ((O || a === _) && (_ = a === ((E = j.put) || "")["="] ? a === (E || "")[":"] ? E : E[":"] : E["="]), typeof (E = r.valid(_)) == "string" && (_ = a === (E = f.$.get(E)._.put) ? t.not ? a : _ : E), !(t.not && a === _)) {
                  if (a === t.stun) {
                    if ((E = f.stun) && E.on && (w.$.back(function(D) {
                      if (E.on("" + D.id, N = {}), (N.run || 0) < b.id)
                        return N;
                    }), !N.run && E.on("" + m.id, N = {}), !N.run && s && E.on("" + s.id, N = {}), b.id > N.run && ((!N.stun || N.stun.end) && (N.stun = E.on("stun"), N.stun = N.stun && N.stun.last), N.stun && !N.stun.end))) {
                      (N.stun.add || (N.stun.add = {}))[l] = function() {
                        b(j, C, 1);
                      };
                      return;
                    }
                    if (
                      /*odd &&*/
                      a === _ && ($ = 0), (E = f.hatch) && !E.end && a === t.hatch && !$
                    ) {
                      if (S[m.$._.id])
                        return;
                      S[m.$._.id] = 1, E.push(function() {
                        b(j, C, 1);
                      });
                      return;
                    }
                    S = {};
                  }
                  if (f.pass) {
                    if (f.pass[l + m.id])
                      return;
                    f.pass[l + m.id] = 1;
                  }
                  if (t.on) {
                    t.ok.call(m.$, _, m.get, j, C || b);
                    return;
                  }
                  if (t.v2020) {
                    t.ok(j, C || b);
                    return;
                  }
                  Object.keys(j).forEach(function(D) {
                    E[D] = j[D];
                  }, E = {}), j = E, j.put = _, t.ok.call(t.as, j, C || b);
                }
              }
            };
            if (u === !0)
              return h(this, o, u, T), this;
            n = this;
            var w = n._, t = u || {}, f = w.root, l;
            t.at = w, t.ok = o;
            var S = {};
            return b.at = w, (w.any || (w.any = {}))[l = String.random(7)] = b, b.off = function() {
              b.stun = 1, w.any && delete w.any[l];
            }, b.rid = y, b.id = t.run || ++f.once, v = f.pass, (f.pass = {})[l] = 1, t.out = t.out || { get: {} }, w.on("out", t.out), f.pass = v, n;
          } else {
            if (typeof o == "number")
              return this.get("" + o, u, T);
            if (typeof (v = e(o)) == "string")
              return this.get(v, u, T);
            (v = this.get.next) && (n = v(this, o));
          }
          return n ? (u && typeof u == "function" && n.get(u, T), n) : ((n = this.chain())._.err = { err: r.log("Invalid get request!", o) }, u && u.call(n, n._.err), n);
        };
        function c(o, u) {
          var T = u._, n = T.next, v = u.chain(), d = v._;
          return n || (n = T.next = {}), n[d.get = o] = d, u === T.root.$ ? d.soul = o : (T.soul || T.has) && (d.has = o), d;
        }
        function h(o, u, T, n) {
          var v = o._, d = 0, w;
          return (w = v.soul || v.link) ? u(w, n, v) : v.jam ? v.jam.push([u, n]) : (v.jam = [[u, n]], o.get(function(t, f) {
            if (!(a === t.put && !v.root.opt.super && (w = Object.keys(v.root.opt.peers).length) && ++d <= w)) {
              f.rid(t);
              var l = (l = t.$) && l._ || {}, S = 0, k;
              for (w = v.jam, delete v.jam; k = w[S++]; ) {
                var b = k[0];
                k = k[1], b && b(l.link || l.soul || r.valid(t.put) || ((t.put || {})._ || {})["#"], k, t, f);
              }
            }
          }, { out: { get: { ".": !0 } } }), o);
        }
        function y(o) {
          var u = this.at || this.on;
          if (!o || u.soul || u.has)
            return this.off();
          if (o = (o = (o = o.$ || o)._ || o).id) {
            u.map;
            var T;
            if ((T = this.seen || (this.seen = {}))[o])
              return !0;
            T[o] = !0;
          }
        }
        var p = {}, e = r.valid, a;
      })(g, "./get"), g(function(x) {
        var r = g("./root");
        r.chain.put = function(n, v, d) {
          var w = this, i = w._, t = i.root;
          d = d || {}, d.root = i.root, d.run || (d.run = t.once), c(d, i.id), d.ack = d.ack || v, d.via = d.via || w, d.data = d.data || n, d.soul || (d.soul = i.soul || typeof v == "string" && v);
          var f = d.state = d.state || r.state();
          return typeof n == "function" ? (n(function(l) {
            d.data = l, w.put(e, e, d);
          }), w) : d.soul ? (d.$ = t.$.get(d.soul), d.todo = [{ it: d.data, ref: d.$ }], d.turn = d.turn || o, d.ran = d.ran || h, function l() {
            var S = d.todo, k = S.pop(), b = k.it;
            k.ref && k.ref._.id;
            var j, C, $, m, s;
            if (c(d, k.ref), (m = k.todo) && (C = m.pop(), b = b[C], m.length && S.push(k)), C && (S.path || (S.path = [])).push(C), !(j = u(b)) && !(s = r.is(b))) {
              if (!Object.plain(b)) {
                h.err(d, "Invalid data: " + p(b) + " at " + (d.via.back(function(E) {
                  E.get && m.push(E.get);
                }, m = []) || m.join(".")) + "." + (S.path || []).join("."));
                return;
              }
              for (var _ = d.seen || (d.seen = []), O = _.length; O--; )
                if (b === (m = _[O]).it) {
                  j = b = m.link;
                  break;
                }
            }
            if (C && j)
              k.node = T(k.node, C, f, b);
            else {
              let E = function(D, I) {
                var P = $.link["#"];
                I && (I.off(), I.rid(D));
                var J = P || D.soul || (m = (D.$$ || D.$)._ || "").soul || m.link || ((m = m.put || "")._ || "")["#"] || m["#"] || ((m = D.put || "") && D.$$ ? m["#"] : (m["="] || m[":"] || "")["#"]);
                if (!P && c(d, D.$), !J && !k.link["#"]) {
                  (k.wait || (k.wait = [])).push(function() {
                    E(D, I);
                  });
                  return;
                }
                J || (J = [], (D.$$ || D.$).back(function(U) {
                  if (m = U.soul || U.link)
                    return J.push(m);
                  J.push(U.get);
                }), J = J.reverse().join("/")), $.link["#"] = J, !s && (((d.graph || (d.graph = {}))[J] = $.node || ($.node = { _: {} }))._["#"] = J), delete d.wait[N], $.wait && setTimeout.each($.wait, function(U) {
                  U && U();
                }), d.ran(d);
              };
              if (!d.seen) {
                h.err(d, "Data at root of graph must be a node (an object).");
                return;
              }
              d.seen.push($ = { it: b, link: {}, todo: s ? [] : Object.keys(b).sort().reverse(), path: (S.path || []).slice(), up: k }), k.node = T(k.node, C, f, $.link), !s && $.todo.length && S.push($);
              var N = d.seen.length;
              (d.wait || (d.wait = {}))[N] = "", m = ($.ref = s ? b : C ? k.ref.get(C) : k.ref)._, (m = b && (b._ || "")["#"] || m.soul || m.link) ? E({ soul: m }) : $.ref.get(E, {
                run: d.run,
                /*hatch: 0,*/
                v2020: 1,
                out: { get: { ".": " " } }
              });
            }
            if (!S.length)
              return d.ran(d);
            d.turn(l);
          }(), w) : (y(d), w);
        };
        function c(n, v) {
          if (v) {
            v = (v._ || "").id || v;
            var d = n.root.stun || (n.root.stun = { on: r.on }), w = {}, i;
            n.stun || (n.stun = d.on("stun", function() {
            })), (i = d.on("" + v)) && i.the.last.next(w), !(w.run >= n.run) && d.on("" + v, function(t) {
              if (n.stun.end) {
                this.off(), this.to.next(t);
                return;
              }
              t.run = t.run || n.run, t.stun = t.stun || n.stun;
            });
          }
        }
        function h(n) {
          if (n.err) {
            h.end(n.stun, n.root);
            return;
          }
          if (!(n.todo.length || n.end || !Object.empty(n.wait))) {
            n.end = 1;
            var v = n.$.back(-1)._, d = v.root, w = v.ask(function(l) {
              d.on("ack", l), l.err && !l.lack && r.log(l), ++i > (n.acks || 0) && this.off(), n.ack && n.ack(l, this);
            }, n.opt), i = 0, t = n.stun, f;
            (f = function() {
              t && (h.end(t, d), setTimeout.each(Object.keys(t = t.add || ""), function(l) {
                (l = t[l]) && l();
              }));
            }).hatch = f, n.ack && !n.ok && (n.ok = n.acks || 9), n.via._.on("out", { put: n.out = n.graph, ok: n.ok && { "@": n.ok + 1 }, opt: n.opt, "#": w, _: f });
          }
        }
        h.end = function(n, v) {
          n.end = a, n.the.to === n && n === n.the.last && delete v.stun, n.off();
        }, h.err = function(n, v) {
          (n.ack || a).call(n, n.out = { err: n.err = r.log(v) }), n.ran(n);
        };
        function y(n) {
          var v = n.via._, d;
          n.via = n.via.back(function(w) {
            if (w.soul || !w.get)
              return w.$;
            d = n.data, (n.data = {})[w.get] = d;
          }), (!n.via || !n.via._.soul) && (n.via = v.root.$.get(((n.data || "")._ || "")["#"] || v.$.back("opt.uuid")())), n.via.put(n.data, n.ack, n);
        }
        function p(n, v) {
          return n && (v = n.constructor) && v.name || typeof n;
        }
        var e, a = function() {
        }, o = setTimeout.turn, u = r.valid, T = r.state.ify;
      })(g, "./put"), g(function(x) {
        var r = g("./root");
        g("./chain"), g("./back"), g("./put"), g("./get"), x.exports = r;
      })(g, "./index"), g(function(x) {
        var r = g("./index");
        r.chain.on = function(y, p, e, a) {
          var o = this, u = o._;
          u.root;
          var T;
          if (typeof y == "string")
            return p ? (T = u.on(y, p, e || u, a), e && e.$ && (e.subs || (e.subs = [])).push(T), o) : u.on(y);
          var n = p;
          return (n = n === !0 ? { change: !0 } : n || {}).not = 1, n.on = 1, o.get(y, n), o;
        }, r.chain.once = function(y, p) {
          if (p = p || {}, !y)
            return c(this);
          var e = this, a = e._, o = a.root;
          a.put;
          var u = String.random(7), T;
          return e.get(function(n, v, d, w) {
            var i = this, t = i._, f = t.one || (t.one = {});
            if (w.stun || f[u] === "")
              return;
            if ((T = r.valid(n)) === !0) {
              l();
              return;
            }
            if (typeof T == "string")
              return;
            clearTimeout((a.one || "")[u]), clearTimeout(f[u]), f[u] = setTimeout(l, p.wait || 99);
            function l(S) {
              if (!t.has && !t.soul && (t = { put: n, get: v }), h === (T = t.put) && (T = ((d.$$ || "")._ || "").put), typeof r.valid(T) == "string" && (T = o.$.get(T)._.put, T === h && !S)) {
                f[u] = setTimeout(function() {
                  l(1);
                }, p.wait || 99);
                return;
              }
              w.stun || f[u] !== "" && (f[u] = "", (a.soul || a.has) && w.off(), y.call(i, T, t.get), clearTimeout(f[u]));
            }
          }, { on: 1 }), e;
        };
        function c(y, p, e) {
          return r.log.once("valonce", "Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it."), (e = y.chain())._.nix = y.once(function(a, o) {
            e._.on("in", this._);
          }), e._.lex = y._.lex, e;
        }
        r.chain.off = function() {
          var y = this, p = y._, e, a = p.back;
          if (a)
            return p.ack = 0, (e = a.next) && e[p.get] && delete e[p.get], (e = a.any) && (delete a.any, a.any = {}), (e = a.ask) && delete e[p.get], (e = a.put) && delete e[p.get], (e = p.soul) && delete a.root.graph[e], (e = p.map) && Object.keys(e).forEach(function(o, u) {
              u = e[o], u.link && a.root.$.get(u.link).off();
            }), (e = p.next) && Object.keys(e).forEach(function(o, u) {
              u = e[o], u.$.off();
            }), p.on("off", {}), y;
        };
        var h;
      })(g, "./on"), g(function(x) {
        var r = g("./index"), c = r.chain.get.next;
        r.chain.get.next = function(e, a) {
          var o;
          return Object.plain(a) ? (o = ((o = a["#"]) || "")["="] || o) ? e.get(o) : ((o = e.chain()._).lex = a, e.on("in", function(u) {
            String.match(u.get || (u.put || "")["."], a["."] || a["#"] || a) && o.on("in", u), this.to.next(u);
          }), o.$) : (c || y)(e, a);
        }, r.chain.map = function(e, a, o) {
          var u = this, T = u._, n, v;
          return Object.plain(e) && (n = e["."] ? e : { ".": e }, e = p), e ? (r.log.once("mapfn", "Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it."), v = u.chain(), u.map().on(function(d, w, i, t) {
            var f = (e || y).call(this, d, w, i, t);
            if (p !== f) {
              if (d === f)
                return v._.on("in", i);
              if (r.is(f))
                return v._.on("in", f._);
              var l = {};
              Object.keys(i.put).forEach(function(S) {
                l[S] = i.put[S];
              }, l), l["="] = f, v._.on("in", { get: w, put: l });
            }
          }), v) : ((v = T.each) || ((T.each = v = u.chain())._.lex = n || v._.lex || T.lex, v._.nix = u.back("nix"), u.on("in", h, v._)), v);
        };
        function h(e) {
          this.to.next(e);
          var a = this.as, o = e.$, u = o._, T = e.put, n;
          !u.soul && !e.$$ || (n = a.lex) && !String.match(e.get || (T || "")["."], n["."] || n["#"] || n) || r.on.link(e, a);
        }
        var y = function() {
        }, p;
      })(g, "./map"), g(function(x) {
        var r = g("./index");
        r.chain.set = function(c, h, y) {
          var p = this, e = p.back(-1), a, o;
          return h = h || function() {
          }, y = y || {}, y.item = y.item || c, (a = ((c || "")._ || "")["#"]) && ((c = {})["#"] = a), typeof (o = r.valid(c)) == "string" ? p.get(a = o).put(c, h, y) : r.is(c) ? (p.put(function(u) {
            c.get(function(T, n, v) {
              if (!T)
                return h.call(p, { err: r.log('Only a node can be linked! Not "' + v.put + '"!') });
              (o = {})[T] = { "#": T }, u(o);
            }, !0);
          }), c) : (Object.plain(c) && (c = e.get(a = p.back("opt.uuid")()).put(c)), p.get(a || e.back("opt.uuid")(7)).put(c, h, y));
        };
      })(g, "./set"), g(function(x) {
        g("./shim");
        var r = function() {
        }, c = JSON.parseAsync || function(e, a, o) {
          var u, T = +/* @__PURE__ */ new Date();
          try {
            a(u, JSON.parse(e, o), h.sucks(+/* @__PURE__ */ new Date() - T));
          } catch (n) {
            a(n);
          }
        }, h = JSON.stringifyAsync || function(e, a, o, u) {
          var T, n = +/* @__PURE__ */ new Date();
          try {
            a(T, JSON.stringify(e, o, u), h.sucks(+/* @__PURE__ */ new Date() - n));
          } catch (v) {
            a(v);
          }
        };
        h.sucks = function(e) {
          e > 99 && (console.log("Warning: JSON blocking CPU detected. Add `gun/lib/yson.js` to fix."), h.sucks = r);
        };
        function y(e) {
          var a = function() {
          }, o = e.opt || {};
          o.log = o.log || console.log, o.gap = o.gap || o.wait || 0, o.max = o.max || (o.memory ? o.memory * 999 * 999 : 3e8) * 0.3, o.pack = o.pack || o.max * 0.01 * 0.01, o.puff = o.puff || 9;
          var u = setTimeout.turn || setTimeout, T = e.dup, n = T.check, v = T.track, d = a.hear = function(t, f) {
            if (t) {
              if (o.max <= t.length)
                return a.say({ dam: "!", err: "Message too big!" }, f);
              a === this && (d.d += t.length || 0, ++d.c);
              var l = f.SH = +/* @__PURE__ */ new Date(), S = t[0], k;
              if (S === "[") {
                c(t, function(b, j) {
                  if (b || !j)
                    return a.say({ dam: "!", err: "DAM JSON parse error." }, f);
                  console.STAT && console.STAT(+/* @__PURE__ */ new Date(), j.length, "# on hear batch");
                  var C = o.puff;
                  (function $() {
                    for (var m = +/* @__PURE__ */ new Date(), s = 0, _; s < C && (_ = j[s++]); )
                      a.hear(_, f);
                    j = j.slice(s), console.STAT && console.STAT(m, +/* @__PURE__ */ new Date() - m, "hear loop"), w(f), j.length && u($, 0);
                  })();
                }), t = "";
                return;
              }
              if (S === "{" || (t["#"] || Object.plain(t)) && (k = t)) {
                if (k)
                  return d.one(k, f, l);
                c(t, function(b, j) {
                  if (b || !j)
                    return a.say({ dam: "!", err: "DAM JSON parse error." }, f);
                  d.one(j, f, l);
                });
                return;
              }
            }
          };
          d.one = function(t, f, $) {
            var S, k, b, j, C;
            if (t.DBG && (t.DBG = C = { DBG: t.DBG }), C && (C.h = $), C && (C.hp = +/* @__PURE__ */ new Date()), (S = t["#"]) || (S = t["#"] = String.random(9)), !(b = n(S)) && (k = t["##"], !(k && (b = t["@"] || t.get && S) && T.check(j = b + k)))) {
              if ((t._ = function() {
              }).via = a.leap = f, (b = t["><"]) && typeof b == "string" && b.slice(0, 99).split(",").forEach(function(m) {
                this[m] = 1;
              }, t._.yo = {}), b = t.dam) {
                (b = a.hear[b]) && b(t, f, e), v(S);
                return;
              }
              (b = t.ok) && (t._.near = b["/"]);
              var $ = +/* @__PURE__ */ new Date();
              C && (C.is = $), f.SI = S, v.ed = function(m) {
                S === m && (v.ed = 0, (m = T.s[S]) && (m.via = f, t.get && (m.it = t)));
              }, e.on("in", a.last = t), C && (C.hd = +/* @__PURE__ */ new Date()), console.STAT && console.STAT($, +/* @__PURE__ */ new Date() - $, t.get ? "msg get" : t.put ? "msg put" : "msg"), v(S), j && v(j), a.leap = a.last = null;
            }
          }, d.c = d.d = 0, function() {
            var t = 0, f;
            a.hash = function(k, b) {
              var j, C, $, m = +/* @__PURE__ */ new Date();
              h(k.put, function s(_, O) {
                var N = (C || (C = $ = O || "")).slice(0, 32768);
                if (j = String.hash(N, j), C = C.slice(32768), C) {
                  u(s, 0);
                  return;
                }
                console.STAT && console.STAT(m, +/* @__PURE__ */ new Date() - m, "say json+hash"), k._.$put = $, k["##"] = j, a.say(k, b), delete k._.$put;
              }, l);
            };
            function l(k, b) {
              var j;
              return b instanceof Object ? (Object.keys(b).sort().forEach(S, { to: j = {}, on: b }), j) : b;
            }
            function S(k) {
              this.to[k] = this.on[k];
            }
            a.say = function(k, b) {
              var j;
              if ((j = this) && (j = j.to) && j.next && j.next(k), !k)
                return !1;
              var C, $, m, s = k["@"], _ = k._ || (k._ = function() {
              }), O = k.DBG, N = +/* @__PURE__ */ new Date();
              if (_.y = _.y || N, b || O && (O.y = N), (C = k["#"]) || (C = k["#"] = String.random(9)), !f && v(C), !($ = k["##"]) && p !== k.put && !_.via && s) {
                a.hash(k, b);
                return;
              }
              if (!b && s && (b = (j = T.s[s]) && (j.via || (j = j.it) && (j = j._) && j.via) || (j = a.last) && s === j["#"] && a.leap), !b && s)
                return T.s[s] ? void 0 : (console.STAT && console.STAT(+/* @__PURE__ */ new Date(), ++t, "total no peer to ack to"), !1);
              if (s && !k.put && !$ && ((T.s[s] || "").it || "")["##"])
                return !1;
              if (!b && a.way)
                return a.way(k);
              if (O && (O.yh = +/* @__PURE__ */ new Date()), !(m = _.raw)) {
                a.raw(k, b);
                return;
              }
              if (O && (O.yr = +/* @__PURE__ */ new Date()), !b || !b.id) {
                if (!Object.plain(b || o.peers))
                  return !1;
                var N = +/* @__PURE__ */ new Date();
                o.puff;
                var E = o.peers, D = Object.keys(b || o.peers || {});
                console.STAT && console.STAT(N, +/* @__PURE__ */ new Date() - N, "peer keys"), function J() {
                  var U = +/* @__PURE__ */ new Date();
                  f = 1;
                  var M = _.raw;
                  _.raw = m;
                  for (var K = 0, q; K < 9 && (q = (D || "")[K++]); )
                    (q = E[q] || (b || "")[q]) && a.say(k, q);
                  _.raw = M, f = 0, D = D.slice(K), console.STAT && console.STAT(U, +/* @__PURE__ */ new Date() - U, "say loop"), D.length && (u(J, 0), s && v(s));
                }();
                return;
              }
              if (!b.wire && a.wire && a.wire(b), C !== b.last) {
                if (b.last = C, b === _.via || (j = _.yo) && (j[b.url] || j[b.pid] || j[b.id]))
                  return !1;
                if (console.STAT && console.STAT(N, ((O || _).yp = +/* @__PURE__ */ new Date()) - (_.y || N), "say prep"), !f && s && v(s), b.batch) {
                  if (b.tail = (j = b.tail || 0) + m.length, b.tail <= o.pack) {
                    b.batch += (j ? "," : "") + m;
                    return;
                  }
                  w(b);
                }
                b.batch = "[";
                var I = +/* @__PURE__ */ new Date();
                setTimeout(function() {
                  console.STAT && console.STAT(I, +/* @__PURE__ */ new Date() - I, "0ms TO"), w(b);
                }, o.gap), i(m, b), console.STAT && s === b.SI && console.STAT(N, +/* @__PURE__ */ new Date() - b.SH, "say ack");
              }
            }, a.say.c = a.say.d = 0, a.raw = function(k, b) {
              if (!k)
                return "";
              var j = k._ || {}, C, $;
              if ($ = j.raw)
                return $;
              if (typeof k == "string")
                return k;
              var m = k["##"], s = k["@"];
              if (m && s) {
                if (!j.via && n(s + m))
                  return !1;
                if ($ = (T.s[s] || "").it) {
                  if (m === $["##"])
                    return !1;
                  $["##"] || ($["##"] = m);
                }
              }
              if (!k.dam && !k["@"]) {
                var _ = 0, O = [];
                $ = o.peers;
                for (var N in $) {
                  var E = $[N];
                  if (O.push(E.url || E.pid || E.id), ++_ > 6)
                    break;
                }
                _ > 1 && (k["><"] = O.join());
              }
              if (k.put && ($ = k.ok) && (k.ok = { "@": ($["@"] || 1) - 1, "/": $["/"] == k._.near ? a.near : $["/"] }), C = j.$put) {
                $ = {}, Object.keys(k).forEach(function(I) {
                  $[I] = k[I];
                }), $.put = ":])([:", h($, function(I, P) {
                  if (!I) {
                    var J = +/* @__PURE__ */ new Date();
                    $ = P.indexOf('"put":":])([:"'), D(p, P = P.slice(0, $ + 6) + C + P.slice($ + 14)), console.STAT && console.STAT(J, +/* @__PURE__ */ new Date() - J, "say slice");
                  }
                });
                return;
              }
              h(k, D);
              function D(I, P) {
                I || (j.raw = P, a.say(k, b));
              }
            };
          }();
          function w(t) {
            var f = t.batch, l = typeof f == "string";
            if (l && (f += "]"), t.batch = t.tail = null, !!f && !(l ? 3 > f.length : !f.length)) {
              if (!l)
                try {
                  f = f.length === 1 ? f[0] : JSON.stringify(f);
                } catch (S) {
                  return o.log("DAM JSON stringify error", S);
                }
              f && i(f, t);
            }
          }
          function i(t, f) {
            try {
              var l = f.wire;
              f.say ? f.say(t) : l.send && l.send(t), a.say.d += t.length || 0, ++a.say.c;
            } catch {
              (f.queue = f.queue || []).push(t);
            }
          }
          return a.near = 0, a.hi = function(t) {
            var f = t.wire, l;
            if (!f) {
              a.wire(t.length && { url: t, id: t } || t);
              return;
            }
            t.id ? o.peers[t.url || t.id] = t : (l = t.id = t.id || t.url || String.random(9), a.say({ dam: "?", pid: e.opt.pid }, o.peers[l] = t), delete T.s[t.last]), t.met || (a.near++, t.met = +/* @__PURE__ */ new Date(), e.on("hi", t)), l = t.queue, t.queue = [], setTimeout.each(l || [], function(S) {
              i(S, t);
            }, 0, 9);
          }, a.bye = function(t) {
            t.met && --a.near, delete t.met, e.on("bye", t);
            var f = +/* @__PURE__ */ new Date();
            f = f - (t.met || f), a.bye.time = ((a.bye.time || f) + f) / 2;
          }, a.hear["!"] = function(t, f) {
            o.log("Error:", t.err);
          }, a.hear["?"] = function(t, f) {
            t.pid && (f.pid || (f.pid = t.pid), t["@"]) || (a.say({ dam: "?", pid: o.pid, "@": t["#"] }, f), delete T.s[f.last]);
          }, a.hear.mob = function(t, f) {
            if (t.peers) {
              var l = Object.keys(t.peers), S = l[Math.random() * l.length >> 0];
              S && (a.bye(f), a.hi(S));
            }
          }, e.on("create", function(t) {
            t.opt.pid = t.opt.pid || String.random(9), this.to.next(t), t.on("out", a.say);
          }), e.on("bye", function(t, f) {
            t = o.peers[t.id || t] || t, this.to.next(t), t.bye ? t.bye() : (f = t.wire) && f.close && f.close(), delete o.peers[t.id], t.wire = null;
          }), e.on("bye", function(t, f) {
            this.to.next(t), (f = console.STAT) && (f.peers = a.near), (f = t.url) && setTimeout(function() {
            }, o.lack || 9e3);
          }), e.on("hi", function(t, f) {
            if (this.to.next(t), (f = console.STAT) && (f.peers = a.near), !o.super) {
              var l = Object.keys(e.next || "");
              l.length > 9999 && !console.SUBS && console.log(console.SUBS = "Warning: You have more than 10K live GETs, which might use more bandwidth than your screen can show - consider `.off()`."), setTimeout.each(l, function(S) {
                var k = e.next[S];
                if (o.super || (k.ask || "")[""]) {
                  a.say({ get: { "#": S } }, t);
                  return;
                }
                setTimeout.each(Object.keys(k.ask || ""), function(b) {
                  b && a.say({ "##": String.hash((e.graph[S] || "")[b]), get: { "#": S, ".": b } }, t);
                });
              });
            }
          }), a;
        }
        var p;
        try {
          x.exports = y;
        } catch {
        }
      })(g, "./mesh"), g(function(x) {
        var r = g("./index");
        r.Mesh = g("./mesh"), r.on("opt", function(h) {
          if (this.to.next(h), h.once)
            return;
          var y = h.opt;
          if (y.WebSocket === !1)
            return;
          var p = r.window || {}, e = y.WebSocket || p.WebSocket || p.webkitWebSocket || p.mozWebSocket;
          if (!e)
            return;
          y.WebSocket = e;
          var a = y.mesh = y.mesh || r.Mesh(h);
          a.wire || y.wire, a.wire = y.wire = o;
          function o(v) {
            try {
              if (!v || !v.url)
                return w && w(v);
              var d = v.url.replace(/^http/, "ws"), w = v.wire = new y.WebSocket(d);
              return w.onclose = function() {
                T(v), y.mesh.bye(v);
              }, w.onerror = function(i) {
                T(v);
              }, w.onopen = function() {
                y.mesh.hi(v);
              }, w.onmessage = function(i) {
                i && y.mesh.hear(i.data || i, v);
              }, w;
            } catch {
              y.mesh.bye(v);
            }
          }
          setTimeout(function() {
            !y.super && h.on("out", { dam: "hi" });
          }, 1);
          var u = 2 * 999;
          function T(v) {
            clearTimeout(v.defer), y.peers[v.url] && (n && v.retry <= 0 || (v.retry = (v.retry || y.retry + 1 || 60) - (-v.tried + (v.tried = +/* @__PURE__ */ new Date()) < u * 4 ? 1 : 0), v.defer = setTimeout(function d() {
              if (n && n.hidden)
                return setTimeout(d, u);
              o(v);
            }, u)));
          }
          var n = "" + c != typeof document && document;
        });
        var c;
      })(g, "./websocket"), g(function(x) {
        if (!(typeof Gun > "u")) {
          var r = function() {
          }, c;
          try {
            c = (Gun.window || r).localStorage;
          } catch {
          }
          c || (Gun.log("Warning: No localStorage exists to persist data to!"), c = { setItem: function(y, p) {
            this[y] = p;
          }, removeItem: function(y) {
            delete this[y];
          }, getItem: function(y) {
            return this[y];
          } });
          var h = JSON.stringifyAsync || function(y, p, e, a) {
            var o;
            try {
              p(o, JSON.stringify(y, e, a));
            } catch (u) {
              p(u);
            }
          };
          Gun.on("create", function y(p) {
            this.to.next(p);
            var e = p.opt;
            p.graph;
            var a = [], o, u, T, n;
            if (e.localStorage === !1)
              return;
            e.prefix = e.file || "gun/";
            try {
              o = y[e.prefix] = y[e.prefix] || JSON.parse(T = c.getItem(e.prefix)) || {};
            } catch {
              o = y[e.prefix] = {};
            }
            T = (T || "").length, p.on("get", function(d) {
              this.to.next(d);
              var w = d.get, i, t, f, l;
              !w || !(i = w["#"]) || (t = o[i] || l, t && (f = w["."]) && !Object.plain(f) && (t = Gun.state.ify({}, f, Gun.state.is(t, f), t[f], i)), Gun.on.get.ack(d, t));
            }), p.on("put", function(d) {
              this.to.next(d);
              var w = d.put, i = w["#"], t = w["."], f = d["#"], l = d.ok || "";
              if (o[i] = Gun.state.ify(o[i], t, w[">"], w[":"], i), n && T > 4999880) {
                p.on("in", { "@": f, err: "localStorage max!" });
                return;
              }
              !d["@"] && (!d._.via || Math.random() < l["@"] / l["/"]) && a.push(f), !u && (u = setTimeout(v, 9 + T / 333));
            });
            function v() {
              if (!a.length && ((setTimeout.turn || "").s || "").length) {
                setTimeout(v, 99);
                return;
              }
              var d = a;
              clearTimeout(u), u = !1, a = [], h(o, function(w, i) {
                try {
                  !w && c.setItem(e.prefix, i);
                } catch (t) {
                  w = n = t || "localStorage failure";
                }
                w && (Gun.log(w + " Consider using GUN's IndexedDB plugin for RAD for more storage space, https://gun.eco/docs/RAD#install"), p.on("localStorage:error", { err: w, get: e.prefix, put: o })), T = i.length, setTimeout.each(d, function(t) {
                  p.on("in", { "@": t, err: w, ok: 0 });
                }, 0, 99);
              });
            }
          });
        }
      })(g, "./localStorage");
    })(), function() {
      var $;
      if ("" + $ != typeof Gun) {
        var g = function(m) {
          console.warn("Warning! Deprecated internal utility will break in next version:", m);
        }, A = Gun;
        A.fn = A.fn || { is: function(m) {
          return g("fn"), !!m && typeof m == "function";
        } }, A.bi = A.bi || { is: function(m) {
          return g("bi"), m instanceof Boolean || typeof m == "boolean";
        } }, A.num = A.num || { is: function(m) {
          return g("num"), !x(m) && (m - parseFloat(m) + 1 >= 0 || m === 1 / 0 || m === -1 / 0);
        } }, A.text = A.text || { is: function(m) {
          return g("text"), typeof m == "string";
        } }, A.text.ify = A.text.ify || function(m) {
          return g("text.ify"), A.text.is(m) ? m : typeof JSON < "u" ? JSON.stringify(m) : m && m.toString ? m.toString() : m;
        }, A.text.random = A.text.random || function(m, s) {
          g("text.random");
          var _ = "";
          for (m = m || 24, s = s || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz"; m > 0; )
            _ += s.charAt(Math.floor(Math.random() * s.length)), m--;
          return _;
        }, A.text.match = A.text.match || function(m, s) {
          var _, O;
          return g("text.match"), typeof m != "string" ? !1 : (typeof s == "string" && (s = { "=": s }), s = s || {}, _ = s["="] || s["*"] || s[">"] || s["<"], m === _ ? !0 : O !== s["="] ? !1 : (_ = s["*"] || s[">"] || s["<"], m.slice(0, (_ || "").length) === _ ? !0 : O !== s["*"] ? !1 : O !== s[">"] && O !== s["<"] ? m >= s[">"] && m <= s["<"] : O !== s[">"] && m >= s[">"] || O !== s["<"] && m <= s["<"]));
        }, A.text.hash = A.text.hash || function(m, s) {
          if (g("text.hash"), typeof m == "string") {
            if (s = s || 0, !m.length)
              return s;
            for (var _ = 0, O = m.length, N; _ < O; ++_)
              N = m.charCodeAt(_), s = (s << 5) - s + N, s |= 0;
            return s;
          }
        }, A.list = A.list || { is: function(m) {
          return g("list"), m instanceof Array;
        } }, A.list.slit = A.list.slit || Array.prototype.slice, A.list.sort = A.list.sort || function(m) {
          return g("list.sort"), function(s, _) {
            return !s || !_ ? 0 : (s = s[m], _ = _[m], s < _ ? -1 : s > _ ? 1 : 0);
          };
        }, A.list.map = A.list.map || function(m, s, _) {
          return g("list.map"), j(m, s, _);
        }, A.list.index = 1, A.obj = A.boj || { is: function(m) {
          return g("obj"), m ? m instanceof Object && m.constructor === Object || Object.prototype.toString.call(m).match(/^\[object (\w+)\]$/)[1] === "Object" : !1;
        } }, A.obj.put = A.obj.put || function(m, s, _) {
          return g("obj.put"), (m || {})[s] = _, m;
        }, A.obj.has = A.obj.has || function(m, s) {
          return g("obj.has"), m && Object.prototype.hasOwnProperty.call(m, s);
        }, A.obj.del = A.obj.del || function(m, s) {
          if (g("obj.del"), !!m)
            return m[s] = null, delete m[s], m;
        }, A.obj.as = A.obj.as || function(m, s, _, O) {
          return g("obj.as"), m[s] = m[s] || (O === _ ? {} : _);
        }, A.obj.ify = A.obj.ify || function(m) {
          if (g("obj.ify"), f(m))
            return m;
          try {
            m = JSON.parse(m);
          } catch {
            m = {};
          }
          return m;
        }, function() {
          var m;
          function s(_, O) {
            S(this, O) && m !== this[O] || (this[O] = _);
          }
          A.obj.to = A.obj.to || function(_, O) {
            return g("obj.to"), O = O || {}, j(_, s, O), O;
          };
        }(), A.obj.copy = A.obj.copy || function(m) {
          return g("obj.copy"), m && JSON.parse(JSON.stringify(m));
        }, function() {
          function m(s, _) {
            var O = this.n, N;
            if (!(O && (_ === O || f(O) && S(O, _))) && N !== _)
              return !0;
          }
          A.obj.empty = A.obj.empty || function(s, _) {
            return g("obj.empty"), s ? !j(s, m, { n: _ }) : !0;
          };
        }(), function() {
          function m(O, N) {
            if (arguments.length === 2) {
              m.r = m.r || {}, m.r[O] = N;
              return;
            }
            m.r = m.r || [], m.r.push(O);
          }
          var s = Object.keys, _;
          Object.keys = Object.keys || function(O) {
            return _(O, function(N, E, D) {
              D(E);
            });
          }, A.obj.map = _ = A.obj.map || function(O, N, E) {
            g("obj.map");
            var D, I = 0, P, J, U, M, K = typeof N == "function";
            if (m.r = D, s && f(O) && (U = s(O), M = !0), E = E || {}, x(O) || U)
              for (P = (U || O).length; I < P; I++) {
                var q = I + A.list.index;
                if (K) {
                  if (J = M ? N.call(E, O[U[I]], U[I], m) : N.call(E, O[I], q, m), J !== D)
                    return J;
                } else if (N === O[M ? U[I] : I])
                  return U ? U[I] : q;
              }
            else
              for (I in O)
                if (K) {
                  if (S(O, I) && (J = E ? N.call(E, O[I], I, m) : N(O[I], I, m), J !== D))
                    return J;
                } else if (N === O[I])
                  return I;
            return K ? m.r : A.list.index ? 0 : -1;
          };
        }(), A.time = A.time || {}, A.time.is = A.time.is || function(m) {
          return g("time"), m ? m instanceof Date : +(/* @__PURE__ */ new Date()).getTime();
        };
        var i = A.fn.is, x = A.list.is, t = A.obj, f = t.is, S = t.has, j = t.map, r = {};
        r.is = function(m) {
          return g("val.is"), m === $ ? !1 : m === null ? !0 : m === 1 / 0 ? !1 : y(m) || h(m) || n(m) ? !0 : r.link.is(m) || !1;
        }, r.link = r.rel = { _: "#" }, function() {
          r.link.is = function(s) {
            if (g("val.link.is"), s && s[c] && !s._ && f(s)) {
              var _ = {};
              if (j(s, m, _), _.id)
                return _.id;
            }
            return !1;
          };
          function m(s, _) {
            var O = this;
            if (O.id)
              return O.id = !1;
            if (_ == c && y(s))
              O.id = s;
            else
              return O.id = !1;
          }
        }(), r.link.ify = function(m) {
          return g("val.link.ify"), b({}, c, m);
        }, A.obj.has._ = ".";
        var c = r.link._, $, h = A.bi.is, n = A.num.is, y = A.text.is, t = A.obj, f = t.is, b = t.put, j = t.map;
        A.val = A.val || r;
        var p = { _: "_" };
        p.soul = function(m, s) {
          return g("node.soul"), m && m._ && m._[s || o];
        }, p.soul.ify = function(m, s) {
          return g("node.soul.ify"), s = typeof s == "string" ? { soul: s } : s || {}, m = m || {}, m._ = m._ || {}, m._[o] = s.soul || m._[o] || a(), m;
        }, p.soul._ = r.link._, function() {
          p.is = function(s, _, O) {
            g("node.is");
            var N;
            return f(s) && (N = p.soul(s)) ? !j(s, m, { as: O, cb: _, s: N, n: s }) : !1;
          };
          function m(s, _) {
            if (_ !== p._) {
              if (!r.is(s))
                return !0;
              this.cb && this.cb.call(this.as, s, _, this.n, this.s);
            }
          }
        }(), function() {
          p.ify = function(s, _, O) {
            return g("node.ify"), _ ? typeof _ == "string" ? _ = { soul: _ } : typeof _ == "function" && (_ = { map: _ }) : _ = {}, _.map && (_.node = _.map.call(O, s, $, _.node || {})), (_.node = p.soul.ify(_.node || {}, _)) && j(s, m, { o: _, as: O }), _.node;
          };
          function m(s, _) {
            var O = this.o, N, E;
            if (O.map) {
              N = O.map.call(this.as, s, "" + _, O.node), E === N ? l(O.node, _) : O.node && (O.node[_] = N);
              return;
            }
            r.is(s) && (O.node[_] = s);
          }
        }();
        var t = A.obj, f = t.is, l = t.del, j = t.map, e = A.text, a = e.random, o = p.soul._, $;
        A.node = A.node || p;
        var u = A.state;
        u.lex = function() {
          return g("state.lex"), u().toString(36).replace(".", "");
        }, u.to = function(m, s, _) {
          g("state.to");
          var O = (m || {})[s];
          return f(O) && (O = C(O)), u.ify(_, s, u.is(m, s), O, p.soul(m));
        }, function() {
          u.map = function(s, _, O) {
            g("state.map");
            var N, E = f(E = s || _) ? E : null;
            return s = i(s = s || _) ? s : null, E && !s ? (_ = n(_) ? _ : u(), E[d] = E[d] || {}, j(E, m, { o: E, s: _ }), E) : (O = O || f(_) ? _ : N, _ = n(_) ? _ : u(), function(D, I, P, J) {
              if (!s)
                return m.call({ o: P, s: _ }, D, I), D;
              s.call(O || this || {}, D, I, P, J), !(S(P, I) && N === P[I]) && m.call({ o: P, s: _ }, D, I);
            });
          };
          function m(s, _) {
            d !== _ && u.ify(this.o, _, this.s);
          }
        }();
        var t = A.obj;
        t.as;
        var S = t.has, f = t.is, j = t.map, C = t.copy, T = A.num, n = T.is, v = A.fn, i = v.is, d = p._, $, w = {};
        (function() {
          w.is = function(_, O, N, E) {
            return g("graph.is"), !_ || !f(_) || k(_) ? !1 : !j(_, m, { cb: O, fn: N, as: E });
          };
          function m(_, O) {
            if (!_ || O !== p.soul(_) || !p.is(_, this.fn, this.as))
              return !0;
            this.cb && (s.n = _, s.as = this.as, this.cb.call(s.as, _, O, s));
          }
          function s(_) {
            _ && p.is(s.n, _, s.as);
          }
        })(), function() {
          w.ify = function(E, D, I) {
            g("graph.ify");
            var P = { path: [], obj: E };
            return D ? typeof D == "string" ? D = { soul: D } : typeof D == "function" && (D.map = D) : D = {}, typeof I == "string" && (D.soul = D.soul || I, I = $), D.soul && (P.link = r.link.ify(D.soul)), D.shell = (I || {}).shell, D.graph = D.graph || {}, D.seen = D.seen || [], D.as = D.as || I, m(D, P), D.root = P.node, D.graph;
          };
          function m(E, D) {
            var I;
            return (I = N(E, D)) ? I : (D.env = E, D.soul = _, p.ify(D.obj, s, D) && (D.link = D.link || r.link.ify(p.soul(D.node)), D.obj !== E.shell && (E.graph[r.link.is(D.link)] = D.node)), D);
          }
          function s(E, D, I) {
            var P = this, J = P.env, U, M;
            if (p._ === D && S(E, r.link._))
              return I._;
            if (U = O(E, D, I, P, J)) {
              if (D || (P.node = P.node || I || {}, S(E, p._) && p.soul(E) && (P.node._ = C(E._)), P.node = p.soul.ify(P.node, r.link.is(P.link)), P.link = P.link || r.link.ify(p.soul(P.node))), (M = J.map) && (M.call(J.as || {}, E, D, I, P), S(I, D))) {
                if (E = I[D], $ === E) {
                  l(I, D);
                  return;
                }
                if (!(U = O(E, D, I, P, J)))
                  return;
              }
              if (!D)
                return P.node;
              if (U === !0)
                return E;
              if (M = m(J, { obj: E, path: P.path.concat(D) }), !!M.node)
                return M.link;
            }
          }
          function _(E) {
            var D = this, I = r.link.is(D.link), P = D.env.graph;
            D.link = D.link || r.link.ify(E), D.link[r.link._] = E, D.node && D.node[p._] && (D.node[p._][r.link._] = E), S(P, I) && (P[E] = P[I], l(P, I));
          }
          function O(E, D, I, P, J) {
            var U;
            if (r.is(E))
              return !0;
            if (f(E))
              return 1;
            if (U = J.invalid)
              return E = U.call(J.as || {}, E, D, I), O(E, D, I, P, J);
            J.err = "Invalid value at '" + P.path.concat(D).join(".") + "'!", A.list.is(E) && (J.err += " Use `.set(item)` instead of an Array.");
          }
          function N(E, D) {
            for (var I = E.seen, P = I.length, J; P--; )
              if (J = I[P], D.obj === J.obj)
                return J;
            I.push(D);
          }
        }(), w.node = function(m) {
          g("graph.node");
          var s = p.soul(m);
          if (s)
            return b({}, s, m);
        }, function() {
          w.to = function(s, _, O) {
            if (g("graph.to"), !!s) {
              var N = {};
              return O = O || { seen: {} }, j(s[_], m, { obj: N, graph: s, opt: O }), N;
            }
          };
          function m(s, _) {
            var O, N;
            if (p._ === _) {
              if (k(s, r.link._))
                return;
              this.obj[_] = C(s);
              return;
            }
            if (!(O = r.link.is(s))) {
              this.obj[_] = s;
              return;
            }
            if (N = this.opt.seen[O]) {
              this.obj[_] = N;
              return;
            }
            this.obj[_] = this.opt.seen[O] = w.to(this.graph, O, this.opt);
          }
        }();
        var i = A.fn.is, t = A.obj, f = t.is, l = t.del, S = t.has, k = t.empty, b = t.put, j = t.map, C = t.copy, $;
        A.graph = A.graph || w;
      }
    }();
  }(ge)), V;
}
(function(R) {
  R.exports = G();
})(ve);
const be = /* @__PURE__ */ ye(te);
var de = typeof window < "u" ? window.Gun : G();
de.chain.promise = function(A) {
  var g = this, A = A || function(x) {
    return x;
  };
  return new Promise(function(x, r) {
    g.once(function(c, h) {
      x({ put: c, get: h, gun: this });
    });
  }).then(A);
};
de.chain.then = function(R) {
  var g = this, A = new Promise((x, r) => {
    g.once(function(c, h) {
      x(c, h);
    });
  });
  return R ? A.then(R) : A;
};
var X = {}, me = {
  get exports() {
    return X;
  },
  set exports(R) {
    X = R;
  }
};
(function() {
  function R() {
    var c = function(h, y, p) {
      if (c.unit = 0, !p && x !== y && (c.last = "" + h < c.last ? c.last : "" + h, delete (c.$ || {})[r]), p = p || c.$ || (c.$ = {}), !h && Object.keys(p).length)
        return p;
      h = "" + h;
      for (var e = 0, a = h.length - 1, o = h[e], u, T; !(u = p[o]) && e < a; )
        o += h[++e];
      if (u)
        if (e == a) {
          if (x === y)
            return x === (T = u[""]) ? u : (c.unit = 1) && T;
          u[""] = y;
        } else
          return x !== y && delete u[r], c(h.slice(++e), y, u || (u = {}));
      else {
        if (!g(p, function(n, v) {
          var d = 0, w = "";
          if ((v || "").length)
            for (; v[d] == h[d]; )
              w += v[d++];
          if (w) {
            if (x === y)
              return d <= a ? void 0 : ((T || (T = {}))[v.slice(d)] = n, n);
            var i = {};
            if (i[v.slice(d)] = n, d = h.slice(d), d === "" ? i[""] = y : (i[d] = {})[""] = y, p[w] = i, R.debug && "" + w == "undefined") {
              console.log(0, w);
              debugger;
            }
            return delete p[v], !0;
          }
        })) {
          if (x === y)
            return;
          if ((p[o] || (p[o] = {}))[""] = y, R.debug && "" + o == "undefined") {
            console.log(1, o);
            debugger;
          }
        }
        if (x === y)
          return T;
      }
    };
    return c;
  }
  if (R.map = function c(h, y, p, e) {
    try {
      e = e || [];
      var a = typeof h == "function" ? h.$ || {} : h;
      //!opt && console.log("WHAT IS T?", JSON.stringify(t).length);
      if (!a)
        return;
      if (typeof a == "string") {
        if (R.debug)
          throw ["BUG:", h, y, p, e];
        return;
      }
      var o = (a[r] || A).sort || (a[r] = function b() {
        return b.sort = Object.keys(a).sort(), b;
      }()).sort, u;
      p = p === !0 ? { branch: !0 } : p || {}, (u = p.reverse) && (o = o.slice(0).reverse());
      for (var T = p.start, n = p.end, v = "￿", d = 0, w = o.length; d < w; d++) {
        var i = o[d], t = a[i], f, l, S;
        if (!(!t || i === "" || r === i || i === "undefined") && (l = e.slice(0), l.push(i), S = l.join(""), !(x !== T && S < (T || "").slice(0, S.length)) && !(x !== n && (n || v) < S))) {
          if (u && (f = c(t, y, p, l), x !== f))
            return f;
          if (x !== (f = t[""])) {
            var k = 1;
            if (x !== T && S < (T || "") && (k = 0), x !== n && S > (n || v) && (k = 0), k && (f = y(f, S, i, e), x !== f))
              return f;
          } else if (p.branch && (f = y(x, S, i, e), x !== f))
            return f;
          if (e = l, !u && (f = c(t, y, p, e), x !== f))
            return f;
          e.pop();
        }
      }
    } catch (b) {
      console.error(b);
    }
  }, typeof window < "u")
    window.Radix = R;
  else
    try {
      me.exports = R;
    } catch {
    }
  var g = R.object = function(c, h, y) {
    for (var p in c)
      if (c.hasOwnProperty(p) && (y = h(c[p], p)) !== x)
        return y;
  }, A = {}, x, r = String.fromCharCode(24);
})();
var se = {}, ke = {
  get exports() {
    return se;
  },
  set exports(R) {
    se = R;
  }
}, Z = {}, Se = {
  get exports() {
    return Z;
  },
  set exports(R) {
    Z = R;
  }
}, ce;
function xe() {
  return ce || (ce = 1, function(R) {
    (function() {
      var g = {}, A, x = setTimeout.turn || typeof setImmediate != "" + A && setImmediate || setTimeout;
      g.parseAsync = function(c, h, y, p) {
        if (typeof c != "string") {
          try {
            h(A, JSON.parse(c));
          } catch (o) {
            h(o);
          }
          return;
        }
        var e = { i: 0, text: c, done: h, l: c.length, up: [] };
        p = p || 1024 * 32, a();
        function a() {
          for (var o = e.text, u = e.i, T = e.l, n = 0, v = e.w, d, w; n++ < p; ) {
            var i = o[u++];
            if (u > T) {
              e.end = !0;
              break;
            }
            if (v) {
              for (u = o.indexOf('"', u - 1), i = o[u], w = 0; o[u - ++w] == "\\"; )
                ;
              w = !(w % 2), d = d || w, i == '"' && !w && (v = A, w = e.s, e.a ? (w = o.slice(e.sl, u), (d || 1 + w.indexOf("\\")) && (w = JSON.parse('"' + w + '"')), e.at instanceof Array ? e.at.push(e.s = w) : (e.at || (e.end = n = p, w = A), (e.at || {})[e.s] = e.s = w), e.s = A) : (e.s = o.slice(e.sl, u), (d || 1 + e.s.indexOf("\\")) && (e.s = JSON.parse('"' + e.s + '"'))), e.a = d = A), ++u;
            } else
              switch (i) {
                case '"':
                  e.sl = u, v = !0;
                  break;
                case ":":
                  e.ai = u, e.a = !0;
                  break;
                case ",":
                  (e.a || e.at instanceof Array) && (w = o.slice(e.ai, u - 1)) && A !== (w = r(w)) && (e.at instanceof Array ? e.at.push(w) : e.at[e.s] = w), e.a = A, e.at instanceof Array && (e.a = !0, e.ai = u);
                  break;
                case "{":
                  e.up.push(e.at || (e.at = {})), e.at instanceof Array ? e.at.push(e.at = {}) : A !== (w = e.s) && (e.at[w] = e.at = {}), e.a = A;
                  break;
                case "}":
                  e.a && (w = o.slice(e.ai, u - 1)) && A !== (w = r(w)) && (e.at instanceof Array ? e.at.push(w) : (e.at || (e.end = n = p, w = A), (e.at || {})[e.s] = w)), e.a = A, e.at = e.up.pop();
                  break;
                case "[":
                  A !== (w = e.s) ? (e.up.push(e.at), e.at[w] = e.at = []) : e.at || e.up.push(e.at = []), e.a = !0, e.ai = u;
                  break;
                case "]":
                  e.a && (w = o.slice(e.ai, u - 1)) && A !== (w = r(w)) && (e.at instanceof Array ? e.at.push(w) : e.at[e.s] = w), e.a = A, e.at = e.up.pop();
                  break;
              }
          }
          if (e.s = A, e.i = u, e.w = v, e.end) {
            if (w = e.at, A === w)
              try {
                w = JSON.parse(c);
              } catch (t) {
                return e.done(t);
              }
            e.done(A, w);
          } else
            x(a);
        }
      };
      function r(c) {
        var h = parseFloat(c);
        if (!isNaN(h))
          return h;
        if (c = c.trim(), c == "true")
          return !0;
        if (c == "false")
          return !1;
        if (c == "null")
          return null;
      }
      g.stringifyAsync = function(c, h, y, p, e) {
        e = e || {}, e.text = e.text || "", e.up = [e.at = { d: c }], e.done = h, e.i = 0;
        var a = 0;
        o();
        function o() {
          var u = e.at, T = u.d, n = "", v;
          switch (u.i && u.i - u.j > 0 && (n += ","), A !== (v = u.k) && (n += JSON.stringify(v) + ":"), typeof T) {
            case "boolean":
              n += "" + T;
              break;
            case "string":
              n += JSON.stringify(T);
              break;
            case "number":
              n += isNaN(T) ? "null" : T;
              break;
            case "object":
              if (!T) {
                n += "null";
                break;
              }
              if (T instanceof Array) {
                n += "[", u = { i: -1, as: T, up: u, j: 0 }, u.l = T.length, e.up.push(e.at = u);
                break;
              }
              if (typeof (T || "").toJSON != "function") {
                n += "{", u = { i: -1, ok: Object.keys(T).sort(), as: T, up: u, j: 0 }, u.l = u.ok.length, e.up.push(e.at = u);
                break;
              }
              if (v = T.toJSON()) {
                n += v;
                break;
              }
            case "function":
              if (u.as instanceof Array) {
                n += "null";
                break;
              }
            default:
              n = "", u.j++;
          }
          for (e.text += n; 1 + u.i >= u.l; )
            e.text += u.ok ? "}" : "]", u = e.at = u.up;
          if (++u.i < u.l) {
            if ((v = u.ok) ? u.d = u.as[u.k = v[u.i]] : u.d = u.as[u.i], ++a < 9)
              return o();
            a = 0, x(o);
            return;
          }
          e.done(A, e.text);
        }
      }, typeof window != "" + A && (window.YSON = g);
      try {
        "" + A != "object" && (R.exports = g);
      } catch {
      }
      typeof JSON != "" + A && (JSON.parseAsync = g.parseAsync, JSON.stringifyAsync = g.stringifyAsync);
    })();
  }(Se)), Z;
}
var ee, le;
function Te() {
  return le || (le = 1, ee = function(R) {
    var g = X;
    R.find("a", function() {
      var A = [];
      g.map(R.list, function(c, h) {
        h.indexOf("%1B") + 1 && c && A.push([h, c]);
      }), A.length && console.log(`
! ! ! WARNING ! ! !
RAD v0.2020.x has detected OLD v0.2019.x data & automatically migrating. Automatic migration will be turned OFF in future versions! If you are just developing/testing, we recommend you reset your data. Please contact us if you have any concerns.
This message should only log once.`);
      var x, r;
      A.forEach(function(c) {
        x = c[0], r = c[1], R.list(decodeURIComponent(x), r), R.list(x, 0);
      }), x && R.find.bad(x);
    });
  }), ee;
}
(function() {
  function R(x) {
    x = x || {}, x.log = x.log || console.log, x.file = String(x.file || "radata");
    var r = (R.has || (R.has = {}))[x.file];
    if (r)
      return r;
    x.max = x.max || (x.memory ? x.memory * 999 * 999 : 3e8) * 0.3, x.until = x.until || x.wait || 250, x.batch = x.batch || 10 * 1e3, x.chunk = x.chunk || 1024 * 1024 * 1, x.code = x.code || {}, x.code.from = x.code.from || "!", x.jsonify = !0;
    function c(d) {
      return encodeURIComponent(d).replace(/\*/g, "%2A");
    }
    function h(d) {
      return v !== d && (!d || typeof d != "object");
    }
    var y = "" + v == typeof setImmediate ? setTimeout : setImmediate, p = setTimeout.turn || y, v, e = A.object, a = 0;
    if (!x.store)
      return x.log("ERROR: Radisk needs `opt.store` interface with `{get: fn, put: fn (, list: fn)}`!");
    if (!x.store.put)
      return x.log("ERROR: Radisk needs `store.put` interface with `(file, data, cb)`!");
    if (!x.store.get)
      return x.log("ERROR: Radisk needs `store.get` interface with `(file, cb)`!");
    x.store.list, "" + v != typeof re("/lib") && xe();
    var o = JSON.parseAsync || function(d, w, i) {
      var t;
      try {
        w(t, JSON.parse(d, i));
      } catch (f) {
        w(f);
      }
    }, u = function(d, w, i, t, f) {
      if (typeof w == "function") {
        var l = i || {};
        i = w, u.read(d, i, l, f || t);
        return;
      }
      u.save(d, w, i, t, f);
    };
    u.save = function(d, w, i, t, f) {
      var l = { key: d }, S, k;
      l.find = function(b) {
        var j;
        if (l.file = b || (b = x.code.from), f && (f = f[b] = f[b] || {}), f && (f.sf = f.sf || +/* @__PURE__ */ new Date()), j = u.disk[b]) {
          l.mix(v, j);
          return;
        }
        u.parse(b, l.mix, v, f);
      }, l.mix = function(b, j) {
        if (f && (f.sml = +/* @__PURE__ */ new Date()), f && (f.sm = f.sm || +/* @__PURE__ */ new Date()), l.err = b || l.err) {
          i(b);
          return;
        }
        var C = l.file = (j || "").file || l.file, $;
        if (!j && C !== x.code.from) {
          u.find.bad(C), u.save(d, w, i, t);
          return;
        }
        if ((j = u.disk[C] || (u.disk[C] = j || A())).file || (j.file = C), x.compare && (w = x.compare(j(d), w, d, C), v === w)) {
          i(b, -1);
          return;
        }
        if ((l.disk = j)(d, w), t && (($ = ($ = j.tags || (j.tags = {}))[t] || ($[t] = u.tags[t] || (u.tags[t] = {})))[C] || ($[C] = u.one[t] || (u.one[t] = i)), i = null), f && (f.st = f.st || +/* @__PURE__ */ new Date()), j.Q) {
          i && j.Q.push(i);
          return;
        }
        j.Q = i ? [i] : [], j.to = setTimeout(l.write, x.until);
      }, l.write = function() {
        f && (f.sto = f.sto || +/* @__PURE__ */ new Date());
        var b = S = l.file, j = l.disk;
        k = l.q = j.Q, l.tags = j.tags, delete j.Q, delete u.disk[b], delete j.tags, u.write(b, j, l.ack, v, f);
      }, l.ack = function(b, j) {
        f && (f.sa = f.sa || +/* @__PURE__ */ new Date()), f && (f.sal = k.length);
        var C, $;
        for (var m in u.tags)
          if (u.tags.hasOwnProperty(m)) {
            var s = u.tags[m];
            if (!(($ = u.disk[S]) && ($ = $.tags) && $[s])) {
              C = s[S], delete s[S];
              var _;
              for (var O in s)
                if (s.hasOwnProperty(O)) {
                  _ = !0;
                  break;
                }
              _ || (delete u.tags[s], C && C(b, j));
            }
          }
        !k && (k = "");
        for (var N = k.length, E = 0, D = +/* @__PURE__ */ new Date(); E < N; E++)
          (C = k[E]) && C(b, j);
        console.STAT && console.STAT(D, +/* @__PURE__ */ new Date() - D, "rad acks", c(l.file)), console.STAT && console.STAT(D, k.length, "rad acks #", c(l.file));
      }, i || (i = function(b, j) {
      }), u.find(d, l.find);
    }, u.disk = {}, u.one = {}, u.tags = {};
    var T = 0;
    u.write = function(d, w, i, t, f) {
      if (!w) {
        i("No radix!");
        return;
      }
      t = typeof t == "object" ? t : { force: t };
      var l = function() {
      }, S, k;
      if (l.text = "", l.file = d = w.file || (w.file = d), !d) {
        i("What file?");
        return;
      }
      if (l.write = function() {
        var b = w.raw = l.text;
        u.disk[d = w.file || l.file || d] = w;
        var j = +/* @__PURE__ */ new Date();
        f && (f.wd = j), u.find.add(d, function($) {
          if (f && (f.wa = +/* @__PURE__ */ new Date()), $) {
            i($);
            return;
          }
          x.store.put(c(d), b, function(s, _) {
            f && (f.wp = +/* @__PURE__ */ new Date()), console.STAT && console.STAT(j, a = +/* @__PURE__ */ new Date() - j, "wrote disk", JSON.stringify(d), ++T, "total all writes."), i(s, _ || 1), w.Q || delete u.disk[d];
          });
        });
      }, l.split = function() {
        var b = +/* @__PURE__ */ new Date();
        f && (f.wf = b), l.text = "", l.count || (l.count = 0, A.map(w, function() {
          l.count++;
        })), f && (f.wfc = l.count), l.limit = Math.ceil(l.count / 2);
        var j = l.count;
        return l.count = 0, f && (f.wf1 = +/* @__PURE__ */ new Date()), l.sub = A(), A.map(w, l.slice, { reverse: 1 }), f && (f.wf2 = +/* @__PURE__ */ new Date()), u.write(l.end, l.sub, l.both, t), f && (f.wf3 = +/* @__PURE__ */ new Date()), l.hub = A(), A.map(w, l.stop), f && (f.wf4 = +/* @__PURE__ */ new Date()), u.write(w.file, l.hub, l.both, t), f && (f.wf5 = +/* @__PURE__ */ new Date()), console.STAT && console.STAT(b, +/* @__PURE__ */ new Date() - b, "rad split", c(w.file), j), !0;
      }, l.slice = function(b, j) {
        if (l.sub(l.end = j, b), l.limit <= ++l.count)
          return !0;
      }, l.stop = function(b, j) {
        if (j >= l.end)
          return !0;
        l.hub(j, b);
      }, l.both = function(b, j) {
        if (f && (f.wfd = +/* @__PURE__ */ new Date()), k) {
          i(b || k);
          return;
        }
        if (S) {
          i(b, j);
          return;
        }
        S = !0, k = b;
      }, l.each = function(b, j, C, $) {
        if (v !== b && l.count++, x.max <= (b || "").length)
          return i("Data too big!"), !0;
        var m = R.encode($.length) + "#" + R.encode(C) + (v === b ? "" : ":" + R.encode(b)) + `
`;
        if (x.chunk < l.text.length + m.length && 1 < l.count && !t.force)
          return l.split();
        l.text += m;
      }, x.jsonify) {
        u.write.jsonify(l, w, i, t, f);
        return;
      }
      A.map(w, l.each, !0) || l.write();
    }, u.write.jsonify = function(d, w, i, t, f) {
      var l, S = +/* @__PURE__ */ new Date();
      f && (f.w = S);
      try {
        l = JSON.stringify(w.$);
      } catch {
        i("Cannot radisk!");
        return;
      }
      if (f && (f.ws = +/* @__PURE__ */ new Date()), console.STAT && console.STAT(S, +/* @__PURE__ */ new Date() - S, "rad stringified JSON"), x.chunk < l.length && !t.force) {
        var k = 0;
        if (A.map(w, function() {
          if (k++)
            return !0;
        }), k > 1)
          return d.split();
      }
      d.text = l, d.write();
    }, u.range = function(d, w) {
      if (!(!d || !w)) {
        if (v === w.start && v === w.end || h(d))
          return d;
        var i = A();
        return A.map(d, function(t, f) {
          i(f, t);
        }, w), i("");
      }
    }, function() {
      u.read = function(d, w, i, t) {
        i = i || {};
        var f = { key: d };
        f.find = function(l) {
          var S;
          if (f.file = l || (l = x.code.from), t && (t = t[l] = t[l] || {}), t && (t.rf = t.rf || +/* @__PURE__ */ new Date()), S = u.disk[f.file = l]) {
            f.check(v, S);
            return;
          }
          u.parse(l, f.check, v, t);
        }, f.get = function(l, S, k) {
          if (t && (t.rgl = +/* @__PURE__ */ new Date()), t && (t.rg = t.rg || +/* @__PURE__ */ new Date()), f.err = l || f.err) {
            w(l);
            return;
          }
          var b = f.file = (S || "").file || f.file;
          if (!S && b !== x.code.from) {
            u.find.bad(b), u.read(d, w, i);
            return;
          }
          if (S = u.disk[b] || (u.disk[b] = S), !S) {
            w(b === x.code.from ? v : "No file!");
            return;
          }
          S.file || (S.file = b);
          var j = u.range(S(d), i);
          if (t && (t.rr = +/* @__PURE__ */ new Date()), i.unit = S.unit, i.chunks = (i.chunks || 0) + 1, i.parsed = (i.parsed || 0) + ((k || "").parsed || i.chunks * x.chunk), i.more = 1, i.next = v, A.map(u.list, function(s, _) {
            if (!(!s || b === _))
              return i.next = _, 1;
          }, i.reverse ? { reverse: 1, end: b } : { start: b }), t && (t.rl = +/* @__PURE__ */ new Date()), i.next || (i.more = 0), i.next && (!i.reverse && (d < i.next && i.next.indexOf(d) != 0 || v !== i.end && (i.end || "￿") < i.next) && (i.more = 0), i.reverse && (d > i.next && d.indexOf(i.next) != 0 || v !== i.start && (i.start || "") > i.next && b <= i.start) && (i.more = 0)), !i.more) {
            w(f.err, j, i);
            return;
          }
          if (j && w(f.err, j, i), !(i.parsed >= i.limit)) {
            var C = +/* @__PURE__ */ new Date();
            t && (t.rm = C);
            var $ = i.next;
            y(function() {
              console.STAT && console.STAT(C, +/* @__PURE__ */ new Date() - C, "rad more"), u.parse($, f.check);
            }, 0);
          }
        }, f.check = function(l, S, k) {
          if (f.get(l, S, k), !(!S || S.check)) {
            S.check = 1;
            var b = +/* @__PURE__ */ new Date();
            (k || (k = {})).file || (k.file = f.file), A.map(S, function(j, C) {
              u.find(C, function($) {
                if (($ || ($ = x.code.from)) !== k.file) {
                  var m = ("" + Math.random()).slice(-3);
                  p(function() {
                    u.save(C, j, function s(_, O) {
                      if (_) {
                        u.save(C, j, s);
                        return;
                      }
                      console.STAT && console.STAT("MISLOCATED DATA CORRECTED", m, c(C), c(k.file), c($));
                    });
                  }, 0);
                }
              });
            }), console.STAT && console.STAT(b, +/* @__PURE__ */ new Date() - b, "rad check");
          }
        }, u.find(d || (i.reverse ? i.end || "" : i.start || ""), f.find);
      };
    }(), function() {
      var d = 0, w = {}, i = String.fromCharCode(31);
      u.parse = function(t, f, l, S) {
        var k;
        if (!t)
          return f();
        if (k = w[t]) {
          k.push(f);
          return;
        }
        k = w[t] = [f];
        var b = function() {
        }, j = { file: t };
        (b.disk = A()).file = t, b.read = function($, m) {
          if (S && (S.rpg = +/* @__PURE__ */ new Date()), console.STAT && console.STAT(C, +/* @__PURE__ */ new Date() - C, "read disk", JSON.stringify(t), ++d, "total all parses."), (b.err = $) || (b.not = !m)) {
            delete w[t], b.map(k, b.ack);
            return;
          }
          if (typeof m != "string") {
            try {
              x.max <= m.length ? b.err = "Chunk too big!" : m = m.toString();
            } catch (s) {
              b.err = s;
            }
            if (b.err) {
              delete w[t], b.map(k, b.ack);
              return;
            }
          }
          if (j.parsed = m.length, S && (S.rpl = j.parsed), S && (S.rpa = k.length), C = +/* @__PURE__ */ new Date(), !(x.jsonify || m[0] === "{")) {
            b.radec($, m);
            return;
          }
          o(m, function(s, _) {
            if (!s) {
              delete w[t], b.disk.$ = _, console.STAT && (a = +/* @__PURE__ */ new Date() - C) > 9 && console.STAT(C, a, "rad parsed JSON"), S && (S.rpd = +/* @__PURE__ */ new Date()), b.map(k, b.ack);
              return;
            }
            if (m[0] === "{") {
              delete w[t], b.err = "JSON error!", b.map(k, b.ack);
              return;
            }
            b.radec(s, m);
          });
        }, b.map = function() {
          if (!(!k || !k.length)) {
            for (var $ = +/* @__PURE__ */ new Date(), m = b.err, s = b.not ? v : b.disk, _ = 0, O; _ < 9 && (O = k[_++]); )
              O(m, s, j);
            console.STAT && console.STAT($, +/* @__PURE__ */ new Date() - $, "rad packs", c(t)), console.STAT && console.STAT($, _, "rad packs #", c(t)), (k = k.slice(_)).length && p(b.map, 0);
          }
        }, b.ack = function($) {
          if ($) {
            if (b.err || b.not) {
              $(b.err, v, j);
              return;
            }
            $(v, b.disk, j);
          }
        }, b.radec = function($, m) {
          delete w[t], C = +/* @__PURE__ */ new Date();
          var s = b.split(m), _ = [], O, N, E;
          if (!s || s[1] !== 0) {
            b.err = "File '" + t + "' does not have root radix! ", b.map(k, b.ack);
            return;
          }
          for (; s; )
            N = E = v, O = s[1], s = b.split(s[2]) || "", s[0] == "#" && (N = s[1], _ = _.slice(0, O), O <= _.length && _.push(N)), s = b.split(s[2]) || "", s[0] != `
` && ((s[0] == "=" || s[0] == ":") && (E = s[1]), v !== N && v !== E && b.disk(_.join(""), E), s = b.split(s[2]));
          console.STAT && console.STAT(C, +/* @__PURE__ */ new Date() - C, "parsed RAD"), b.map(k, b.ack);
        }, b.split = function($) {
          if ($) {
            var m = [], s = {}, _ = -1, O = "";
            if (_ = $.indexOf(i), !!$[_])
              return O = $.slice(0, _), m[0] = O, m[1] = R.decode($.slice(_), s), m[2] = $.slice(_ + s.i), m;
          }
        }, u.disk && (l || (l = (u.disk[t] || "").raw));
        var C = +/* @__PURE__ */ new Date();
        if (S && (S.rp = C), l)
          return p(function() {
            b.read(v, l);
          }, 0);
        x.store.get(c(t), b.read);
      };
    }(), function() {
      var d, w = String.fromCharCode(28), i;
      u.find = function(l, S) {
        if (!d) {
          if (i) {
            i.push([l, S]);
            return;
          }
          i = [[l, S]], u.parse(w, t);
          return;
        }
        A.map(u.list = d, function(k, b) {
          if (k)
            return S(b) || !0;
        }, { reverse: 1, end: l }) || S(x.code.from);
      }, u.find.add = function(l, S) {
        var k = d(l);
        if (k || l === w) {
          S(v, 1);
          return;
        }
        d(l, 1), S.found = (S.found || 0) + 1, u.write(w, d, function(b, j) {
          if (b) {
            S(b);
            return;
          }
          S.found = (S.found || 0) - 1, S.found === 0 && S(v, 1);
        }, !0);
      }, u.find.bad = function(l, S) {
        d(l, 0), u.write(w, d, S || n);
      };
      function t(l, S) {
        if (l) {
          x.log("list", l), setTimeout(function() {
            u.parse(w, t);
          }, 1e3);
          return;
        }
        if (S) {
          f(S);
          return;
        }
        if (d = d || S || A(), !x.store.list) {
          f(d);
          return;
        }
        x.store.list(function(k) {
          if (!k) {
            f(d);
            return;
          }
          u.find.add(k, n);
        });
      }
      function f(l, S) {
        d = d || l, d.file = w, S = i, i = null, e(S, function(k) {
          u.find(k[0], k[1]);
        });
      }
    }();
    try {
      !g.window && Te()(u);
    } catch {
    }
    var n = function() {
    }, v;
    return R.has[x.file] = u, u;
  }
  if (function() {
    var x = String.fromCharCode(31);
    R.encode = function(r, c, h) {
      h = h || x;
      var y = h, p;
      if (typeof r == "string") {
        for (var e = r.indexOf(h); e != -1; )
          y += h, e = r.indexOf(h, e + 1);
        return y + '"' + r + h;
      } else {
        if (r && r["#"] && Object.keys(r).length == 1)
          return y + "#" + p + y;
        if (typeof r == "number")
          return y + "+" + (r || 0) + y;
        if (r === null)
          return y + " " + y;
        if (r === !0)
          return y + "+" + y;
        if (r === !1)
          return y + "-" + y;
      }
    }, R.decode = function(r, c, h) {
      h = h || x;
      var y = "", p = -1, e = 0, a, o;
      if (h === r[0]) {
        for (; h === r[++p]; )
          ++e;
        for (o = r[a = e] || !0; --e >= 0; )
          p = r.indexOf(h, p + 1);
        if (p == -1 && (p = r.length), y = r.slice(a + 1, p), c && (c.i = p + 1), o === '"')
          return y;
        if (o === "#")
          return { "#": y };
        if (o === "+")
          return y.length === 0 ? !0 : parseFloat(y);
        if (o === " ")
          return null;
        if (o === "-")
          return !1;
      }
    };
  }(), typeof window < "u") {
    var g = window.Gun, A = window.Radix;
    window.Radisk = R;
  } else {
    var g = G(), A = X;
    try {
      ke.exports = R;
    } catch {
    }
  }
  R.Radix = A;
})();
var he = {}, _e = {
  get exports() {
    return he;
  },
  set exports(R) {
    he = R;
  }
};
(function() {
  function R(A) {
    A = A || {}, A.file = String(A.file || "radata");
    var x = R[A.file], r = null, c;
    if (x)
      return console.log("Warning: reusing same IndexedDB store and options as 1st."), R[A.file];
    x = R[A.file] = function() {
    };
    try {
      A.indexedDB = A.indexedDB || R.indexedDB || indexedDB;
    } catch {
    }
    try {
      if (!A.indexedDB || location.protocol == "file:") {
        var h = x.d || (x.d = {});
        return x.put = function(y, p, e) {
          h[y] = p, setTimeout(function() {
            e(null, 1);
          }, 250);
        }, x.get = function(y, p) {
          setTimeout(function() {
            p(null, h[y] || c);
          }, 5);
        }, console.log("Warning: No indexedDB exists to persist data to!"), x;
      }
    } catch {
    }
    return x.start = function() {
      var y = indexedDB.open(A.file, 1);
      y.onupgradeneeded = function(p) {
        p.target.result.createObjectStore(A.file);
      }, y.onsuccess = function() {
        r = y.result;
      }, y.onerror = function(p) {
        console.log(p || 1);
      };
    }, x.start(), x.put = function(y, p, e) {
      if (!r) {
        setTimeout(function() {
          x.put(y, p, e);
        }, 1);
        return;
      }
      var a = r.transaction([A.file], "readwrite"), o = a.objectStore(A.file), u = o.put(p, "" + y);
      u.onsuccess = o.onsuccess = a.onsuccess = function() {
        e(null, 1);
      }, u.onabort = o.onabort = a.onabort = function(T) {
        e(T || "put.tx.abort");
      }, u.onerror = o.onerror = a.onerror = function(T) {
        e(T || "put.tx.error");
      };
    }, x.get = function(y, p) {
      if (!r) {
        setTimeout(function() {
          x.get(y, p);
        }, 9);
        return;
      }
      var e = r.transaction([A.file], "readonly"), a = e.objectStore(A.file), o = a.get("" + y);
      o.onsuccess = function() {
        p(null, o.result);
      }, o.onabort = function(u) {
        p(u || 4);
      }, o.onerror = function(u) {
        p(u || 5);
      };
    }, setInterval(function() {
      r && r.close(), r = null, x.start();
    }, 1e3 * 15), x;
  }
  if (typeof window < "u")
    (R.window = window).RindexedDB = R, R.indexedDB = window.indexedDB;
  else
    try {
      _e.exports = R;
    } catch {
    }
  try {
    var g = R.window.Gun || G();
    g.on("create", function(A) {
      this.to.next(A), A.opt.store = A.opt.store || R(A.opt);
    });
  } catch {
  }
})();
(function() {
  var R = typeof window < "u" ? window.Gun : G();
  R.on("opt", function(g) {
    this.to.next(g);
    var A = g.opt;
    if (g.once || !R.Mesh || A.RTCPeerConnection === !1)
      return;
    var x;
    typeof window < "u" && (x = window), typeof L < "u" && (x = L), x = x || {};
    var r = A.RTCPeerConnection || x.RTCPeerConnection || x.webkitRTCPeerConnection || x.mozRTCPeerConnection, c = A.RTCSessionDescription || x.RTCSessionDescription || x.webkitRTCSessionDescription || x.mozRTCSessionDescription, h = A.RTCIceCandidate || x.RTCIceCandidate || x.webkitRTCIceCandidate || x.mozRTCIceCandidate;
    if (!r || !c || !h)
      return;
    A.RTCPeerConnection = r, A.RTCSessionDescription = c, A.RTCIceCandidate = h, A.rtc = A.rtc || { iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.sipgate.net:3478" }
      /*,
      {urls: "stun:stun.stunprotocol.org"},
      {urls: "stun:stun.sipgate.net:10000"},
      {urls: "stun:217.10.68.152:10000"},
      {urls: 'stun:stun.services.mozilla.com'}*/
    ] }, A.rtc.dataChannel = A.rtc.dataChannel || { ordered: !1, maxRetransmits: 2 }, A.rtc.sdp = A.rtc.sdp || { mandatory: { OfferToReceiveAudio: !1, OfferToReceiveVideo: !1 } }, A.rtc.max = A.rtc.max || 55, A.rtc.room = A.rtc.room || R.window && (location.hash.slice(1) || location.pathname.slice(1)), A.announce = function(e) {
      A.rtc.start = +/* @__PURE__ */ new Date(), g.$.get("/RTC/" + A.rtc.room + "<?99").get("+").put(A.pid, function(a) {
        !a.ok || !a.ok.rtc || p(a);
      }, { acks: A.rtc.max }).on(function(a, o, u) {
        a === A.pid || A.rtc.start > u.put[">"] || p({ "#": "" + u["#"], ok: { rtc: { id: a } } });
      });
    };
    var y = A.mesh = A.mesh || R.Mesh(g);
    g.on("create", function(e) {
      this.to.next(e), setTimeout(A.announce, 1);
    });
    function p(e) {
      if (this && this.off && this.off(), !!e.ok) {
        var a = e.ok.rtc, o, u;
        if (!(!a || !a.id || a.id === A.pid)) {
          if (u = a.answer)
            return !(o = A.peers[a.id] || p[a.id]) || o.remoteSet ? void 0 : (u.sdp = u.sdp.replace(/\\r\\n/g, `\r
`), o.setRemoteDescription(o.remoteSet = new A.RTCSessionDescription(u)));
          if (u = a.candidate)
            return o = A.peers[a.id] || p[a.id] || p({ ok: { rtc: { id: a.id } } }), o.addIceCandidate(new A.RTCIceCandidate(u));
          if (!p[a.id]) {
            (o = new A.RTCPeerConnection(A.rtc)).id = a.id;
            var T = o.wire = o.createDataChannel("dc", A.rtc.dataChannel);
            if (p[a.id] = o, T.to = setTimeout(function() {
              delete p[a.id];
            }, 1e3 * 60), T.onclose = function() {
              y.bye(o);
            }, T.onerror = function(n) {
            }, T.onopen = function(n) {
              delete p[a.id], y.hi(o);
            }, T.onmessage = function(n) {
              n && y.hear(n.data || n, o);
            }, o.onicecandidate = function(n) {
              n.candidate && g.on("out", { "@": e["#"], ok: { rtc: { candidate: n.candidate, id: A.pid } } });
            }, o.ondatachannel = function(n) {
              var v = n.channel;
              v.onmessage = T.onmessage, v.onopen = T.onopen, v.onclose = T.onclose;
            }, u = a.offer) {
              a.offer.sdp = a.offer.sdp.replace(/\\r\\n/g, `\r
`), o.setRemoteDescription(new A.RTCSessionDescription(u)), o.createAnswer(function(n) {
                o.setLocalDescription(n), g.on("out", { "@": e["#"], ok: { rtc: { answer: n, id: A.pid } } });
              }, function() {
              }, A.rtc.sdp);
              return;
            }
            return o.createOffer(function(n) {
              o.setLocalDescription(n), g.on("out", { "@": e["#"], "#": g.ask(p), ok: { rtc: { offer: n, id: A.pid } } });
            }, function() {
            }, A.rtc.sdp), o;
          }
        }
      }
    }
  });
})();
var ne = {}, Ae = {
  get exports() {
    return ne;
  },
  set exports(R) {
    ne = R;
  }
};
(function(R) {
  (function() {
    function g(x, r) {
      return r ? re("/")(x) : x.slice ? g[c(x)] : function(h, y) {
        x(h = { exports: {} }), g[c(y)] = h.exports;
      };
      function c(h) {
        return h.split("/").slice(-1).toString().replace(".js", "");
      }
    }
    var A = R;
    g(function(x) {
      typeof self < "u" && (x.window = self), typeof window < "u" && (x.window = window);
      var r = x.window || x, c, h = r.SEA || {};
      (h.window = x.window) && (h.window.SEA = h);
      try {
        c + "" != typeof A && (A.exports = h);
      } catch {
      }
      x.exports = h;
    })(g, "./root"), g(function(x) {
      var r = g("./root");
      try {
        r.window && location.protocol.indexOf("s") < 0 && location.host.indexOf("localhost") < 0 && !/^127\.\d+\.\d+\.\d+$/.test(location.hostname) && location.protocol.indexOf("file:") < 0 && (console.warn("HTTPS needed for WebCrypto in SEA, redirecting..."), location.protocol = "https:");
      } catch {
      }
    })(g, "./https"), g(function(x) {
      var r;
      if (r + "" == typeof btoa) {
        if (r + "" == typeof Buffer)
          try {
            L.Buffer = g("buffer", 1).Buffer;
          } catch {
            console.log("Please `npm install buffer` or add it to your package.json !");
          }
        L.btoa = function(c) {
          return Buffer.from(c, "binary").toString("base64");
        }, L.atob = function(c) {
          return Buffer.from(c, "base64").toString("binary");
        };
      }
    })(g, "./base64"), g(function(x) {
      g("./base64");
      function r() {
      }
      Object.assign(r, { from: Array.from }), r.prototype = Object.create(Array.prototype), r.prototype.toString = function(c, h, y) {
        c = c || "utf8", h = h || 0;
        const p = this.length;
        if (c === "hex") {
          const e = new Uint8Array(this);
          return [...Array((y && y + 1 || p) - h).keys()].map((a) => e[a + h].toString(16).padStart(2, "0")).join("");
        }
        if (c === "utf8")
          return Array.from(
            { length: (y || p) - h },
            (e, a) => String.fromCharCode(this[a + h])
          ).join("");
        if (c === "base64")
          return btoa(this);
      }, x.exports = r;
    })(g, "./array"), g(function(x) {
      g("./base64");
      var r = g("./array");
      function c(...h) {
        return console.warn("new SafeBuffer() is depreciated, please use SafeBuffer.from()"), c.from(...h);
      }
      c.prototype = Object.create(Array.prototype), Object.assign(c, {
        // (data, enc) where typeof data === 'string' then enc === 'utf8'|'hex'|'base64'
        from() {
          if (!Object.keys(arguments).length || arguments[0] == null)
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          const h = arguments[0];
          let y;
          if (typeof h == "string") {
            const e = arguments[1] || "utf8";
            if (e === "hex") {
              const a = h.match(/([\da-fA-F]{2})/g).map((o) => parseInt(o, 16));
              if (!a || !a.length)
                throw new TypeError("Invalid first argument for type 'hex'.");
              y = r.from(a);
            } else if (e === "utf8" || e === "binary") {
              const a = h.length, o = new Uint16Array(a);
              Array.from({ length: a }, (u, T) => o[T] = h.charCodeAt(T)), y = r.from(o);
            } else if (e === "base64") {
              const a = atob(h), o = a.length, u = new Uint8Array(o);
              Array.from({ length: o }, (T, n) => u[n] = a.charCodeAt(n)), y = r.from(u);
            } else
              e === "binary" ? y = r.from(h) : console.info("SafeBuffer.from unknown encoding: " + e);
            return y;
          }
          if (h.byteLength, h.byteLength ? h.byteLength : h.length) {
            let e;
            return h instanceof ArrayBuffer && (e = new Uint8Array(h)), r.from(e || h);
          }
        },
        // This is 'safe-buffer.alloc' sans encoding support
        alloc(h, y = 0) {
          return r.from(new Uint8Array(Array.from({ length: h }, () => y)));
        },
        // This is normal UNSAFE 'buffer.alloc' or 'new Buffer(length)' - don't use!
        allocUnsafe(h) {
          return r.from(new Uint8Array(Array.from({ length: h })));
        },
        // This puts together array of array like members
        concat(h) {
          if (!Array.isArray(h))
            throw new TypeError("First argument must be Array containing ArrayBuffer or Uint8Array instances.");
          return r.from(h.reduce((y, p) => y.concat(Array.from(p)), []));
        }
      }), c.prototype.from = c.from, c.prototype.toString = r.prototype.toString, x.exports = c;
    })(g, "./buffer"), g(function(x) {
      const r = g("./root"), c = { Buffer: g("./buffer") };
      var h = {}, y;
      if (JSON.parseAsync = JSON.parseAsync || function(e, a, o) {
        var u;
        try {
          a(u, JSON.parse(e, o));
        } catch (T) {
          a(T);
        }
      }, JSON.stringifyAsync = JSON.stringifyAsync || function(e, a, o, u) {
        var T;
        try {
          a(T, JSON.stringify(e, o, u));
        } catch (n) {
          a(n);
        }
      }, c.parse = function(e, a) {
        return new Promise(function(o, u) {
          JSON.parseAsync(e, function(T, n) {
            T ? u(T) : o(n);
          }, a);
        });
      }, c.stringify = function(e, a, o) {
        return new Promise(function(u, T) {
          JSON.stringifyAsync(e, function(n, v) {
            n ? T(n) : u(v);
          }, a, o);
        });
      }, r.window && (c.crypto = r.window.crypto || r.window.msCrypto, c.subtle = (c.crypto || h).subtle || (c.crypto || h).webkitSubtle, c.TextEncoder = r.window.TextEncoder, c.TextDecoder = r.window.TextDecoder, c.random = (e) => c.Buffer.from(c.crypto.getRandomValues(new Uint8Array(c.Buffer.alloc(e))))), !c.TextDecoder) {
        const { TextEncoder: e, TextDecoder: a } = g((y + "" == typeof A ? "." : "") + "./lib/text-encoding", 1);
        c.TextDecoder = a, c.TextEncoder = e;
      }
      if (!c.crypto)
        try {
          var p = g("crypto", 1);
          Object.assign(c, {
            crypto: p,
            random: (a) => c.Buffer.from(p.randomBytes(a))
          });
          const { Crypto: e } = g("@peculiar/webcrypto", 1);
          c.ossl = c.subtle = new e({ directory: "ossl" }).subtle;
        } catch {
          console.log("Please `npm install @peculiar/webcrypto` or add it to your package.json !");
        }
      x.exports = c;
    })(g, "./shim"), g(function(x) {
      var r = g("./root"), c = g("./shim"), h = {};
      h.pbkdf2 = { hash: { name: "SHA-256" }, iter: 1e5, ks: 64 }, h.ecdsa = {
        pair: { name: "ECDSA", namedCurve: "P-256" },
        sign: { name: "ECDSA", hash: { name: "SHA-256" } }
      }, h.ecdh = { name: "ECDH", namedCurve: "P-256" }, h.jwk = function(y, p) {
        y = y.split(".");
        var e = y[0], a = y[1], o = { kty: "EC", crv: "P-256", x: e, y: a, ext: !0 };
        return o.key_ops = p ? ["sign"] : ["verify"], p && (o.d = p), o;
      }, h.keyToJwk = function(y) {
        return { kty: "oct", k: y.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, ""), ext: !1, alg: "A256GCM" };
      }, h.recall = {
        validity: 12 * 60 * 60,
        // internally in seconds : 12 hours
        hook: function(y) {
          return y;
        }
        // { iat, exp, alias, remember } // or return new Promise((resolve, reject) => resolve(props)
      }, h.check = function(y) {
        return typeof y == "string" && y.slice(0, 4) === "SEA{";
      }, h.parse = async function(p) {
        try {
          var e = typeof p == "string";
          return e && p.slice(0, 4) === "SEA{" && (p = p.slice(3)), e ? await c.parse(p) : p;
        } catch {
        }
        return p;
      }, r.opt = h, x.exports = h;
    })(g, "./settings"), g(function(x) {
      var r = g("./shim");
      x.exports = async function(c, h) {
        var y = typeof c == "string" ? c : await r.stringify(c), p = await r.subtle.digest({ name: h || "SHA-256" }, new r.TextEncoder().encode(y));
        return r.Buffer.from(p);
      };
    })(g, "./sha256"), g(function(x) {
      const r = g("./shim"), c = r.subtle, h = r.ossl ? r.ossl : c, y = (p) => h.digest({ name: "SHA-1" }, new ArrayBuffer(p));
      x.exports = y;
    })(g, "./sha1"), g(function(x) {
      var r = g("./root"), c = g("./shim"), h = g("./settings"), y = g("./sha256"), p;
      r.work = r.work || (async (e, a, o, u) => {
        try {
          var T = (a || {}).epub || a;
          if (u = u || {}, T instanceof Function && (o = T, T = p), e = typeof e == "string" ? e : await c.stringify(e), (u.name || "").toLowerCase().slice(0, 3) === "sha") {
            var n = c.Buffer.from(await y(e, u.name), "binary").toString(u.encode || "base64");
            if (o)
              try {
                o(n);
              } catch (i) {
                console.log(i);
              }
            return n;
          }
          T = T || c.random(9);
          var v = await (c.ossl || c.subtle).importKey("raw", new c.TextEncoder().encode(e), { name: u.name || "PBKDF2" }, !1, ["deriveBits"]), d = await (c.ossl || c.subtle).deriveBits({
            name: u.name || "PBKDF2",
            iterations: u.iterations || h.pbkdf2.iter,
            salt: new c.TextEncoder().encode(u.salt || T),
            hash: u.hash || h.pbkdf2.hash
          }, v, u.length || h.pbkdf2.ks * 8);
          e = c.random(e.length);
          var w = c.Buffer.from(d, "binary").toString(u.encode || "base64");
          if (o)
            try {
              o(w);
            } catch (i) {
              console.log(i);
            }
          return w;
        } catch (i) {
          if (console.log(i), r.err = i, r.throw)
            throw i;
          o && o();
          return;
        }
      }), x.exports = r.work;
    })(g, "./work"), g(function(x) {
      var r = g("./root"), c = g("./shim");
      g("./settings"), r.name = r.name || (async (h, y) => {
        try {
          if (h)
            try {
              h();
            } catch (p) {
              console.log(p);
            }
          return;
        } catch (p) {
          if (console.log(p), r.err = p, r.throw)
            throw p;
          h && h();
          return;
        }
      }), r.pair = r.pair || (async (h, y) => {
        try {
          var p = c.ossl || c.subtle, e = await c.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, !0, ["sign", "verify"]).then(async (u) => {
            var T = {};
            T.priv = (await c.subtle.exportKey("jwk", u.privateKey)).d;
            var n = await c.subtle.exportKey("jwk", u.publicKey);
            return T.pub = n.x + "." + n.y, T;
          });
          try {
            var a = await p.generateKey({ name: "ECDH", namedCurve: "P-256" }, !0, ["deriveKey"]).then(async (u) => {
              var T = {};
              T.epriv = (await p.exportKey("jwk", u.privateKey)).d;
              var n = await p.exportKey("jwk", u.publicKey);
              return T.epub = n.x + "." + n.y, T;
            });
          } catch (u) {
            if (r.window)
              throw u;
            if (u == "Error: ECDH is not a supported algorithm")
              console.log("Ignoring ECDH...");
            else
              throw u;
          }
          a = a || {};
          var o = {
            pub: e.pub,
            priv: e.priv,
            /* pubId, */
            epub: a.epub,
            epriv: a.epriv
          };
          if (h)
            try {
              h(o);
            } catch (u) {
              console.log(u);
            }
          return o;
        } catch (u) {
          if (console.log(u), r.err = u, r.throw)
            throw u;
          h && h();
          return;
        }
      }), x.exports = r.pair;
    })(g, "./pair"), g(function(x) {
      var r = g("./root"), c = g("./shim"), h = g("./settings"), y = g("./sha256"), p;
      r.sign = r.sign || (async (e, a, o, u) => {
        try {
          if (u = u || {}, !(a || u).priv) {
            if (!r.I)
              throw "No signing key.";
            a = await r.I(null, { what: e, how: "sign", why: u.why });
          }
          if (p === e)
            throw "`undefined` not allowed.";
          var T = await h.parse(e), n = u.check = u.check || T;
          if (r.verify && (r.opt.check(n) || n && n.s && n.m) && p !== await r.verify(n, a)) {
            var f = await h.parse(n);
            if (u.raw || (f = "SEA" + await c.stringify(f)), o)
              try {
                o(f);
              } catch (S) {
                console.log(S);
              }
            return f;
          }
          var v = a.pub, d = a.priv, w = h.jwk(v, d), i = await y(T), t = await (c.ossl || c.subtle).importKey("jwk", w, { name: "ECDSA", namedCurve: "P-256" }, !1, ["sign"]).then((l) => (c.ossl || c.subtle).sign({ name: "ECDSA", hash: { name: "SHA-256" } }, l, new Uint8Array(i))), f = { m: T, s: c.Buffer.from(t, "binary").toString(u.encode || "base64") };
          if (u.raw || (f = "SEA" + await c.stringify(f)), o)
            try {
              o(f);
            } catch (l) {
              console.log(l);
            }
          return f;
        } catch (l) {
          if (console.log(l), r.err = l, r.throw)
            throw l;
          o && o();
          return;
        }
      }), x.exports = r.sign;
    })(g, "./sign"), g(function(x) {
      var r = g("./root"), c = g("./shim"), h = g("./settings"), y = g("./sha256"), p;
      r.verify = r.verify || (async (o, u, T, n) => {
        try {
          var v = await h.parse(o);
          if (u === !1) {
            var d = await h.parse(v.m);
            if (T)
              try {
                T(d);
              } catch (j) {
                console.log(j);
              }
            return d;
          }
          n = n || {};
          var w = u.pub || u, i = r.opt.slow_leak ? await r.opt.slow_leak(w) : await (c.ossl || c.subtle).importKey("jwk", h.jwk(w), { name: "ECDSA", namedCurve: "P-256" }, !1, ["verify"]), t = await y(v.m), f, l, S, k;
          try {
            if (f = c.Buffer.from(v.s, n.encode || "base64"), l = new Uint8Array(f), S = await (c.ossl || c.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, i, l, new Uint8Array(t)), !S)
              throw "Signature did not match.";
          } catch {
            if (r.opt.fallback)
              return await r.opt.fall_verify(o, u, T, n);
          }
          var b = S ? await h.parse(v.m) : p;
          if (T)
            try {
              T(b);
            } catch (j) {
              console.log(j);
            }
          return b;
        } catch (j) {
          if (console.log(j), r.err = j, r.throw)
            throw j;
          T && T();
          return;
        }
      }), x.exports = r.verify;
      var e = {};
      r.opt.slow_leak = (o) => {
        if (e[o])
          return e[o];
        var u = h.jwk(o);
        return e[o] = (c.ossl || c.subtle).importKey("jwk", u, { name: "ECDSA", namedCurve: "P-256" }, !1, ["verify"]), e[o];
      };
      var a = r.opt;
      r.opt.fall_verify = async function(o, u, T, n, v) {
        if (v === r.opt.fallback)
          throw "Signature did not match";
        v = v || 1;
        var d = o || "";
        o = r.opt.unpack(o) || o;
        var w = await h.parse(o), i = u.pub || u, t = await r.opt.slow_leak(i), f = v <= r.opt.fallback ? c.Buffer.from(await c.subtle.digest({ name: "SHA-256" }, new c.TextEncoder().encode(await h.parse(w.m)))) : await y(w.m), l, S, k;
        try {
          if (l = c.Buffer.from(w.s, n.encode || "base64"), S = new Uint8Array(l), k = await (c.ossl || c.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, t, S, new Uint8Array(f)), !k)
            throw "Signature did not match.";
        } catch {
          try {
            l = c.Buffer.from(w.s, "utf8"), S = new Uint8Array(l), k = await (c.ossl || c.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, t, S, new Uint8Array(f));
          } catch {
            if (!k)
              throw "Signature did not match.";
          }
        }
        var b = k ? await h.parse(w.m) : p;
        if (a.fall_soul = d["#"], a.fall_key = d["."], a.fall_val = o, a.fall_state = d[">"], T)
          try {
            T(b);
          } catch (j) {
            console.log(j);
          }
        return b;
      }, r.opt.fallback = 2;
    })(g, "./verify"), g(function(x) {
      var r = g("./shim"), c = g("./settings"), h = g("./sha256");
      const y = async (p, e, a) => {
        const o = p + (e || r.random(8)).toString("utf8"), u = r.Buffer.from(await h(o), "binary"), T = c.keyToJwk(u);
        return await r.subtle.importKey("jwk", T, { name: "AES-GCM" }, !1, ["encrypt", "decrypt"]);
      };
      x.exports = y;
    })(g, "./aeskey"), g(function(x) {
      var r = g("./root"), c = g("./shim");
      g("./settings");
      var h = g("./aeskey"), y;
      r.encrypt = r.encrypt || (async (p, e, a, o) => {
        try {
          o = o || {};
          var u = (e || o).epriv || e;
          if (y === p)
            throw "`undefined` not allowed.";
          if (!u) {
            if (!r.I)
              throw "No encryption key.";
            e = await r.I(null, { what: p, how: "encrypt", why: o.why }), u = e.epriv || e;
          }
          var T = typeof p == "string" ? p : await c.stringify(p), n = { s: c.random(9), iv: c.random(15) }, v = await h(u, n.s, o).then((w) => (
            /*shim.ossl ||*/
            c.subtle.encrypt({
              // Keeping the AES key scope as private as possible...
              name: o.name || "AES-GCM",
              iv: new Uint8Array(n.iv)
            }, w, new c.TextEncoder().encode(T))
          )), d = {
            ct: c.Buffer.from(v, "binary").toString(o.encode || "base64"),
            iv: n.iv.toString(o.encode || "base64"),
            s: n.s.toString(o.encode || "base64")
          };
          if (o.raw || (d = "SEA" + await c.stringify(d)), a)
            try {
              a(d);
            } catch (w) {
              console.log(w);
            }
          return d;
        } catch (w) {
          if (console.log(w), r.err = w, r.throw)
            throw w;
          a && a();
          return;
        }
      }), x.exports = r.encrypt;
    })(g, "./encrypt"), g(function(x) {
      var r = g("./root"), c = g("./shim"), h = g("./settings"), y = g("./aeskey");
      r.decrypt = r.decrypt || (async (p, e, a, o) => {
        try {
          o = o || {};
          var u = (e || o).epriv || e;
          if (!u) {
            if (!r.I)
              throw "No decryption key.";
            e = await r.I(null, { what: p, how: "decrypt", why: o.why }), u = e.epriv || e;
          }
          var T = await h.parse(p), n, v, d;
          try {
            n = c.Buffer.from(T.s, o.encode || "base64"), v = c.Buffer.from(T.iv, o.encode || "base64"), d = c.Buffer.from(T.ct, o.encode || "base64");
            var w = await y(u, n, o).then((t) => (
              /*shim.ossl ||*/
              c.subtle.decrypt({
                // Keeping aesKey scope as private as possible...
                name: o.name || "AES-GCM",
                iv: new Uint8Array(v),
                tagLength: 128
              }, t, new Uint8Array(d))
            ));
          } catch {
            if (o.encode === "utf8")
              throw "Could not decrypt";
            if (r.opt.fallback)
              return o.encode = "utf8", await r.decrypt(p, e, a, o);
          }
          var i = await h.parse(new c.TextDecoder("utf8").decode(w));
          if (a)
            try {
              a(i);
            } catch (t) {
              console.log(t);
            }
          return i;
        } catch (t) {
          if (console.log(t), r.err = t, r.throw)
            throw t;
          a && a();
          return;
        }
      }), x.exports = r.decrypt;
    })(g, "./decrypt"), g(function(x) {
      var r = g("./root"), c = g("./shim");
      g("./settings"), r.secret = r.secret || (async (y, p, e, a) => {
        try {
          if (a = a || {}, !p || !p.epriv || !p.epub) {
            if (!r.I)
              throw "No secret mix.";
            p = await r.I(null, { what: y, how: "secret", why: a.why });
          }
          var o = y.epub || y, u = p.epub, T = p.epriv, n = c.ossl || c.subtle, v = h(o), d = Object.assign({ public: await n.importKey(...v, !0, []) }, { name: "ECDH", namedCurve: "P-256" }), w = h(u, T), i = await n.importKey(...w, !1, ["deriveBits"]).then(async (f) => {
            var l = await n.deriveBits(d, f, 256), S = new Uint8Array(l), k = await n.importKey("raw", S, { name: "AES-GCM", length: 256 }, !0, ["encrypt", "decrypt"]);
            return n.exportKey("jwk", k).then(({ k: b }) => b);
          }), t = i;
          if (e)
            try {
              e(t);
            } catch (f) {
              console.log(f);
            }
          return t;
        } catch (f) {
          if (console.log(f), r.err = f, r.throw)
            throw f;
          e && e();
          return;
        }
      });
      var h = (y, p) => {
        var [e, a] = y.split("."), o = p ? { d: p } : {};
        return [
          // Use with spread returned value...
          "jwk",
          Object.assign(
            o,
            { x: e, y: a, kty: "EC", crv: "P-256", ext: !0 }
          ),
          // ??? refactor
          { name: "ECDH", namedCurve: "P-256" }
        ];
      };
      x.exports = r.secret;
    })(g, "./secret"), g(function(x) {
      var r = g("./root");
      r.certify = r.certify || (async (c, h = {}, y, p, e = {}) => {
        try {
          if (console.log("SEA.certify() is an early experimental community supported method that may change API behavior without warning in any future version."), c = (() => {
            var t = [];
            if (c) {
              if ((typeof c == "string" || Array.isArray(c)) && c.indexOf("*") > -1)
                return "*";
              if (typeof c == "string")
                return c;
              if (Array.isArray(c)) {
                if (c.length === 1 && c[0])
                  return typeof c[0] == "object" && c[0].pub ? c[0].pub : typeof c[0] == "string" ? c[0] : null;
                c.map((f) => {
                  typeof f == "string" ? t.push(f) : typeof f == "object" && f.pub && t.push(f.pub);
                });
              }
              return typeof c == "object" && c.pub ? c.pub : t.length > 0 ? t : null;
            }
          })(), !c)
            return console.log("No certificant found.");
          const o = e.expiry && (typeof e.expiry == "number" || typeof e.expiry == "string") ? parseFloat(e.expiry) : null, u = (h || {}).read ? h.read : null, T = (h || {}).write ? h.write : typeof h == "string" || Array.isArray(h) || h["+"] || h["#"] || h["."] || h["="] || h["*"] || h[">"] || h["<"] ? h : null, n = (e || {}).block || (e || {}).blacklist || (e || {}).ban || {}, v = n.read && (typeof n.read == "string" || (n.read || {})["#"]) ? n.read : null, d = typeof n == "string" ? n : n.write && (typeof n.write == "string" || n.write["#"]) ? n.write : null;
          if (!u && !T)
            return console.log("No policy found.");
          const w = JSON.stringify({
            c,
            ...o ? { e: o } : {},
            // inject expiry if possible
            ...u ? { r: u } : {},
            // "r" stands for read, which means read permission.
            ...T ? { w: T } : {},
            // "w" stands for write, which means write permission.
            ...v ? { rb: v } : {},
            // inject READ block if possible
            ...d ? { wb: d } : {}
            // inject WRITE block if possible
          });
          var a = await r.sign(w, y, null, { raw: 1 });
          if (e.raw || (a = "SEA" + JSON.stringify(a)), p)
            try {
              p(a);
            } catch (t) {
              console.log(t);
            }
          return a;
        } catch (o) {
          if (r.err = o, r.throw)
            throw o;
          p && p();
          return;
        }
      }), x.exports = r.certify;
    })(g, "./certify"), g(function(x) {
      var r = g("./shim"), c = g("./root");
      c.work = g("./work"), c.sign = g("./sign"), c.verify = g("./verify"), c.encrypt = g("./encrypt"), c.decrypt = g("./decrypt"), c.certify = g("./certify"), c.random = c.random || r.random, c.Buffer = c.Buffer || g("./buffer"), c.keyid = c.keyid || (async (h) => {
        try {
          const y = r.Buffer.concat(
            h.replace(/-/g, "+").replace(/_/g, "/").split(".").map((o) => r.Buffer.from(o, "base64"))
          ), p = r.Buffer.concat([
            r.Buffer.from([153, y.length / 256, y.length % 256]),
            y
          ]), e = await sha1hash(p), a = r.Buffer.from(e, "binary");
          return a.toString("hex", a.length - 8);
        } catch (y) {
          throw console.log(y), y;
        }
      }), ((c.window || {}).GUN || {}).SEA = c, x.exports = c;
    })(g, "./sea"), g(function(x) {
      var r = g("./sea"), c, h;
      r.window ? c = r.window.GUN || { chain: {} } : c = g((h + "" == typeof A ? "." : "") + "./gun", 1), r.GUN = c;
      function y(e) {
        this._ = { $: this };
      }
      y.prototype = function() {
        function e() {
        }
        return e.prototype = c.chain, new e();
      }(), y.prototype.constructor = y, c.chain.user = function(e) {
        var a = this, u = a.back(-1), o;
        if (e)
          return e = r.opt.pub((e._ || "")["#"]) || e, u.get("~" + e);
        if (o = u.back("user"))
          return o;
        var u = u._, T = u, n = T.opt.uuid || p;
        return (T = (o = T.user = a.chain(new y()))._).opt = {}, T.opt.uuid = function(v) {
          var d = n(), w = u.user;
          return !w || !(w = w.is) || !(w = w.pub) || (d = "~" + w + "/" + d, v && v.call && v(null, d)), d;
        }, o;
      };
      function p() {
        return c.state().toString(36).replace(".", "");
      }
      c.User = y, y.GUN = c, y.SEA = c.SEA = r, x.exports = y;
    })(g, "./user"), g(function(x) {
      var r, c = "" + r != typeof GUN ? GUN || { chain: {} } : g(("" + r == typeof A ? "." : "") + "./gun", 1);
      c.chain.then = function(h, y) {
        var p = this, e = new Promise(function(a, o) {
          p.once(a, y);
        });
        return h ? e.then(h) : e;
      };
    })(g, "./then"), g(function(x) {
      var r = g("./user"), c = r.SEA, h = r.GUN, y = function() {
      };
      r.prototype.create = function(...p) {
        var e = typeof p[0] == "object" && (p[0].pub || p[0].epub) ? p[0] : typeof p[1] == "object" && (p[1].pub || p[1].epub) ? p[1] : null, a = e && (e.pub || e.epub) ? e.pub : typeof p[0] == "string" ? p[0] : null, o = e && (e.pub || e.epub) ? e : a && typeof p[1] == "string" ? p[1] : null, u = p.filter((t) => typeof t == "function")[0] || null, T = p && p.length > 1 && typeof p[p.length - 1] == "object" ? p[p.length - 1] : {}, n = this, v = n._, d = n.back(-1);
        if (u = u || y, T = T || {}, T.check !== !1) {
          var w;
          if (a || (w = "No user."), (o || "").length < 8 && (w = "Password too short!"), w)
            return u({ err: h.log(w) }), n;
        }
        if (v.ing)
          return (u || y)({ err: h.log("User is already being created or authenticated!"), wait: !0 }), n;
        v.ing = !0;
        var i = {};
        return i.a = function(t) {
          if (i.pubs = t, t && !T.already) {
            var f = { err: h.log("User already created!") };
            v.ing = !1, (u || y)(f), n.leave();
            return;
          }
          i.salt = String.random(64), c.work(o, i.salt, i.b);
        }, i.b = function(t) {
          i.proof = t, e ? i.c(e) : c.pair(i.c);
        }, i.c = function(t) {
          var f;
          i.pair = t || {}, (f = v.root.user) && (f._.sea = t, f.is = { pub: t.pub, epub: t.epub, alias: a }), i.data = { pub: t.pub }, i.d();
        }, i.d = function() {
          i.data.alias = a, i.e();
        }, i.e = function() {
          i.data.epub = i.pair.epub, c.encrypt({ priv: i.pair.priv, epriv: i.pair.epriv }, i.proof, i.f, { raw: 1 });
        }, i.f = function(t) {
          i.data.auth = JSON.stringify({ ek: t, s: i.salt }), i.g(i.data.auth);
        }, i.g = function(t) {
          var f;
          i.data.auth = i.data.auth || t, d.get(f = "~" + i.pair.pub).put(i.data).on(i.h);
          var l = {};
          l[f] = { "#": f }, d.get("~@" + a).put(l).get(f).on(i.i);
        }, i.h = function(t, f, l, S) {
          S.off(), i.h.ok = 1, i.i();
        }, i.i = function(t, f, l, S) {
          S && (i.i.ok = 1, S.off()), !(!i.h.ok || !i.i.ok) && (v.ing = !1, u({ ok: 0, pub: i.pair.pub }), y === u && (e ? n.auth(e) : n.auth(a, o)));
        }, d.get("~@" + a).once(i.a), n;
      }, r.prototype.leave = function(p, e) {
        var a = this, o = a.back(-1)._.user;
        if (o && (delete o.is, delete o._.is, delete o._.sea), c.window)
          try {
            var u = {};
            u = c.window.sessionStorage, delete u.recall, delete u.pair;
          } catch {
          }
        return a;
      };
    })(g, "./create"), g(function(x) {
      var r = g("./user"), c = r.SEA, h = r.GUN, y = function() {
      };
      r.prototype.auth = function(...e) {
        var a = typeof e[0] == "object" && (e[0].pub || e[0].epub) ? e[0] : typeof e[1] == "object" && (e[1].pub || e[1].epub) ? e[1] : null, o = !a && typeof e[0] == "string" ? e[0] : null, u = (o || a && !(a.priv && a.epriv)) && typeof e[1] == "string" ? e[1] : null, T = e.filter((l) => typeof l == "function")[0] || null, n = e && e.length > 1 && typeof e[e.length - 1] == "object" ? e[e.length - 1] : {}, v = this, d = v._, w = v.back(-1);
        if (d.ing)
          return (T || y)({ err: h.log("User is already being created or authenticated!"), wait: !0 }), v;
        d.ing = !0;
        var i = {}, t, f = 9;
        return i.a = function(l) {
          if (!l)
            return i.b();
          if (!l.pub) {
            var S = [];
            return Object.keys(l).forEach(function(k) {
              k != "_" && S.push(l[k]);
            }), i.b(S);
          }
          if (i.name)
            return i.f(l);
          i.c((i.data = l).auth);
        }, i.b = function(l) {
          var S = (i.list = (i.list || []).concat(l || [])).shift();
          if (t === S) {
            if (i.name)
              return i.err("Your user account is not published for dApps to access, please consider syncing it online, or allowing local access by adding your device as a peer.");
            if (o && f--) {
              w.get("~@" + o).once(i.a);
              return;
            }
            return i.err("Wrong user or password.");
          }
          w.get(S).once(i.a);
        }, i.c = function(l) {
          if (t === l)
            return i.b();
          if (typeof l == "string")
            return i.c(p(l));
          c.work(u, (i.auth = l).s, i.d, i.enc);
        }, i.d = function(l) {
          c.decrypt(i.auth.ek, l, i.e, i.enc);
        }, i.e = function(l) {
          if (t === l)
            return i.enc ? (i.enc = null, i.b()) : (i.enc = { encode: "utf8" }, i.c(i.auth));
          i.half = l, i.f(i.data);
        }, i.f = function(l) {
          var S = i.half || {}, k = i.data || {};
          i.g(i.lol = { pub: l.pub || k.pub, epub: l.epub || k.epub, priv: l.priv || S.priv, epriv: l.epriv || S.epriv });
        }, i.g = function(l) {
          if (!l || !l.pub || !l.epub)
            return i.b();
          i.pair = l;
          var S = w._.user, k = S._;
          k.tag;
          var b = k.opt;
          k = S._ = w.get("~" + l.pub)._, k.opt = b, S.is = { pub: l.pub, epub: l.epub, alias: o || l.pub }, k.sea = i.pair, d.ing = !1;
          try {
            u && t == (p(d.root.graph["~" + l.pub].auth) || "")[":"] && (n.shuffle = n.change = u);
          } catch {
          }
          if (n.change ? i.z() : (T || y)(k), c.window && (v.back("user")._.opt || n).remember)
            try {
              var j = {};
              j = c.window.sessionStorage, j.recall = !0, j.pair = JSON.stringify(l);
            } catch {
            }
          try {
            w._.tag.auth ? w._.on("auth", k) : setTimeout(function() {
              w._.on("auth", k);
            }, 1);
          } catch (C) {
            h.log("Your 'auth' callback crashed with:", C);
          }
        }, i.h = function(l) {
          if (!l)
            return i.b();
          if (o = l.alias, o || (o = l.alias = "~" + a.pub), !l.auth)
            return i.g(a);
          a = null, i.c((i.data = l).auth);
        }, i.z = function() {
          i.salt = String.random(64), c.work(n.change, i.salt, i.y);
        }, i.y = function(l) {
          c.encrypt({ priv: i.pair.priv, epriv: i.pair.epriv }, l, i.x, { raw: 1 });
        }, i.x = function(l) {
          i.w(JSON.stringify({ ek: l, s: i.salt }));
        }, i.w = function(l) {
          if (n.shuffle) {
            console.log("migrate core account from UTF8 & shuffle");
            var S = {};
            Object.keys(i.data).forEach(function(k) {
              S[k] = i.data[k];
            }), delete S._, S.auth = l, w.get("~" + i.pair.pub).put(S);
          }
          w.get("~" + i.pair.pub).get("auth").put(l, T || y);
        }, i.err = function(l) {
          var S = { err: h.log(l || "User cannot be found!") };
          d.ing = !1, (T || y)(S);
        }, i.plugin = function(l) {
          if (!(i.name = l))
            return i.err();
          var S = [l];
          l[0] !== "~" && (S[1] = "~" + l, S[2] = "~@" + l), i.b(S);
        }, a ? a.priv && a.epriv ? i.g(a) : w.get("~" + a.pub).once(i.h) : o ? w.get("~@" + o).once(i.a) : !o && !u && c.name(i.plugin), v;
      };
      function p(e) {
        if (typeof e != "string")
          return e;
        try {
          e = JSON.parse(e);
        } catch {
          e = {};
        }
        return e;
      }
    })(g, "./auth"), g(function(x) {
      var r = g("./user"), c = r.SEA;
      r.GUN, r.prototype.recall = function(h, y) {
        var p = this, e = p.back(-1);
        if (h = h || {}, h && h.sessionStorage) {
          if (c.window)
            try {
              var a = {};
              a = c.window.sessionStorage, a && (e._.opt.remember = !0, (p.back("user")._.opt || h).remember = !0, (a.recall || a.pair) && e.user().auth(JSON.parse(a.pair), y));
            } catch {
            }
          return p;
        }
        return p;
      };
    })(g, "./recall"), g(function(x) {
      var r = g("./user"), c = r.SEA, h = r.GUN, y = function() {
      };
      r.prototype.pair = function() {
        var p = this, e;
        try {
          e = new Proxy({ DANGER: "☠" }, { get: function(a, o, u) {
            if (!(!p.is || !(p._ || "").sea))
              return p._.sea[o];
          } });
        } catch {
        }
        return e;
      }, r.prototype.delete = async function(p, e, a) {
        console.log("user.delete() IS DEPRECATED AND WILL BE MOVED TO A MODULE!!!");
        var o = this;
        o.back(-1);
        var u = o.back("user");
        try {
          u.auth(p, e, function(T) {
            var n = (u.is || {}).pub;
            u.map().once(function() {
              this.put(null);
            }), u.leave(), (a || y)({ ok: 0 });
          });
        } catch (T) {
          h.log("User.delete failed! Error:", T);
        }
        return o;
      }, r.prototype.alive = async function() {
        console.log("user.alive() IS DEPRECATED!!!");
        const p = this.back(-1);
        try {
          return await authRecall(p), p._.user._;
        } catch {
          const a = "No session!";
          throw h.log(a), { err: a };
        }
      }, r.prototype.trust = async function(p) {
        console.log("`.trust` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!"), h.is(p) && p.get("pub").get((e, a) => {
          console.log(e, a);
        }), p.get("trust").get(path).put(theirPubkey);
      }, r.prototype.grant = function(p, e) {
        console.log("`.grant` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
        var a = this, o = a.back(-1).user(), u = o._.sea, T = "";
        return a.back(function(n) {
          n.is || (T += n.get || "");
        }), async function() {
          var n, v = await o.get("grant").get(u.pub).get(T).then();
          v = await c.decrypt(v, u), v || (v = c.random(16).toString(), n = await c.encrypt(v, u), o.get("grant").get(u.pub).get(T).put(n));
          var d = p.get("pub").then(), w = p.get("epub").then();
          d = await d, w = await w;
          var i = await c.secret(w, u);
          n = await c.encrypt(v, i), o.get("grant").get(d).get(T).put(n, e);
        }(), a;
      }, r.prototype.secret = function(p, e) {
        console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
        var a = this, o = a.back(-1).user(), u = o.pair(), T = "";
        return a.back(function(n) {
          n.is || (T += n.get || "");
        }), async function() {
          var n, v = await o.get("trust").get(u.pub).get(T).then();
          v = await c.decrypt(v, u), v || (v = c.random(16).toString(), n = await c.encrypt(v, u), o.get("trust").get(u.pub).get(T).put(n)), n = await c.encrypt(p, v), a.put(n, e);
        }(), a;
      }, x.exports = r;
    })(g, "./share"), g(function(x) {
      var r = g("./sea"), c = g("./settings"), h, y = (r.window || "").GUN || g(("" + h == typeof A ? "." : "") + "./gun", 1);
      y.on("opt", function(n) {
        n.sea || (n.sea = { own: {} }, n.on("put", p, n)), this.to.next(n);
      });
      function p(n) {
        var v = this, d = v.as, w = n.put, i = w["#"], t = w["."], f = w[":"], l = w[">"], S = n["#"], k;
        if (!(!i || !t)) {
          if ((n._ || "").faith && (d.opt || "").faith && typeof n._ == "function") {
            r.opt.pack(w, function(j) {
              r.verify(j, !1, function(C) {
                w["="] = r.opt.unpack(C), v.to.next(n);
              });
            });
            return;
          }
          var b = function(j) {
            d.on("in", { "@": S, err: n.err = j });
          };
          if ((n._ || "").DBG && ((n._ || "").DBG.c = +/* @__PURE__ */ new Date()), 0 <= i.indexOf("<?") && (k = parseFloat(i.split("<?")[1] || ""), k && l < y.state() - k * 1e3)) {
            (k = n._) && k.stun && k.stun--;
            return;
          }
          if (i === "~@") {
            p.alias(v, n, f, t, i, d, b);
            return;
          }
          if (i.slice(0, 2) === "~@") {
            p.pubs(v, n, f, t, i, d, b);
            return;
          }
          if (k = r.opt.pub(i)) {
            p.pub(v, n, f, t, i, d, b, d.user || "", k);
            return;
          }
          if (0 <= i.indexOf("#")) {
            p.hash(v, n, f, t, i, d, b);
            return;
          }
          p.any(v, n, f, t, i, d, b, d.user || "");
        }
      }
      p.hash = function(n, v, d, w, i, t, f) {
        r.work(d, null, function(l) {
          function S(k) {
            let b = "";
            for (let j = 0; j < k.length; j++)
              b += j - 1 & 1 ? "" : String.fromCharCode(parseInt(k.substring(j - 1, j + 1), 16));
            return btoa(b);
          }
          if (l && l === w.split("#").slice(-1)[0])
            return n.to.next(v);
          if (l && l === S(w.split("#").slice(-1)[0]))
            return n.to.next(v);
          f("Data hash not same as hash!");
        }, { name: "SHA-256" });
      }, p.alias = function(n, v, d, w, i, t, f) {
        if (!d)
          return f("Data must exist!");
        if ("~@" + w === a(d))
          return n.to.next(v);
        f("Alias not same!");
      }, p.pubs = function(n, v, d, w, i, t, f) {
        if (!d)
          return f("Alias must exist!");
        if (w === a(d))
          return n.to.next(v);
        f("Alias not same!");
      }, p.pub = async function(n, v, d, w, i, t, f, l, S) {
        var k;
        const b = await c.parse(d) || {}, j = (C, $, m) => {
          if (C.m && C.s && $ && S)
            return r.verify(C, S, (s) => {
              if (h !== s && h !== s.e && v.put[">"] && v.put[">"] > parseFloat(s.e))
                return f("Certificate expired.");
              if (h !== s && s.c && s.w && (s.c === $ || s.c.indexOf("*") > -1)) {
                let O = i.indexOf("/") > -1 ? i.replace(i.substring(0, i.indexOf("/") + 1), "") : "";
                String.match = String.match || y.text.match;
                const N = Array.isArray(s.w) ? s.w : typeof s.w == "object" || typeof s.w == "string" ? [s.w] : [];
                for (const E of N)
                  if (String.match(O, E["#"]) && String.match(w, E["."]) || !E["."] && String.match(O, E["#"]) || !E["#"] && String.match(w, E["."]) || String.match(O ? O + "/" + w : w, E["#"] || E)) {
                    if (E["+"] && E["+"].indexOf("*") > -1 && O && O.indexOf($) == -1 && w.indexOf($) == -1)
                      return f(`Path "${O}" or key "${w}" must contain string "${$}".`);
                    if (s.wb && (typeof s.wb == "string" || (s.wb || {})["#"])) {
                      var _ = n.as.root.$.back(-1);
                      return typeof s.wb == "string" && s.wb.slice(0, 1) !== "~" && (_ = _.get("~" + S)), _.get(s.wb).get($).once((D) => D && (D === 1 || D === !0) ? f(`Certificant ${$} blocked.`) : m(s));
                    }
                    return m(s);
                  }
                return f("Certificate verification fail.");
              }
            });
        };
        if (w === "pub" && "~" + S === i)
          return d === S ? n.to.next(v) : f("Account not same!");
        if ((k = l.is) && k.pub && !b["*"] && !b["+"] && (S === k.pub || S !== k.pub && ((v._.msg || {}).opt || {}).cert)) {
          r.opt.pack(v.put, (C) => {
            r.sign(C, l._.sea, async function($) {
              if (h === $)
                return f(r.err || "Signature fail.");
              if (v.put[":"] = { ":": k = r.opt.unpack($.m), "~": $.s }, v.put["="] = k, S === l.is.pub) {
                (k = a(d)) && ((t.sea.own[k] = t.sea.own[k] || {})[S] = 1), JSON.stringifyAsync(v.put[":"], function(m, s) {
                  return m ? f(m || "Stringify error.") : (v.put[":"] = s, n.to.next(v));
                });
                return;
              }
              if (S !== l.is.pub && ((v._.msg || {}).opt || {}).cert) {
                const m = await c.parse(v._.msg.opt.cert);
                m && m.m && m.s && j(m, l.is.pub, (s) => {
                  v.put[":"]["+"] = m, v.put[":"]["*"] = l.is.pub, JSON.stringifyAsync(v.put[":"], function(_, O) {
                    return _ ? f(_ || "Stringify error.") : (v.put[":"] = O, n.to.next(v));
                  });
                });
              }
            }, { raw: 1 });
          });
          return;
        }
        r.opt.pack(v.put, (C) => {
          r.verify(C, b["*"] || S, function($) {
            var m;
            if ($ = r.opt.unpack($), h === $)
              return f("Unverified data.");
            if ((m = a($)) && S === r.opt.pub(m) && ((t.sea.own[m] = t.sea.own[m] || {})[S] = 1), b["+"] && b["+"].m && b["+"].s && b["*"])
              j(b["+"], b["*"], (s) => (v.put["="] = $, n.to.next(v)));
            else
              return v.put["="] = $, n.to.next(v);
          });
        });
      }, p.any = function(n, v, d, w, i, t, f, l) {
        if (t.opt.secure)
          return f("Soul missing public key at '" + w + "'.");
        t.on("secure", function(S) {
          if (this.off(), !t.opt.secure)
            return n.to.next(S);
          f("Data cannot be changed.");
        }).on.on("secure", v);
      };
      var e = y.valid, a = function(n, v) {
        return typeof (v = e(n)) == "string" && v;
      };
      (y.state || "").ify;
      var o = /[^\w_-]/;
      r.opt.pub = function(n) {
        if (n && (n = n.split("~"), !(!n || !(n = n[1])) && (n = n.split(o).slice(0, 2), !(!n || n.length != 2) && (n[0] || "")[0] !== "@")))
          return n = n.slice(0, 2).join("."), n;
      }, r.opt.stringy = function(n) {
      }, r.opt.pack = function(n, v, d, w, i) {
        var t, f;
        if (r.opt.check(n))
          return v(n);
        n && n["#"] && n["."] && n[">"] && (t = n[":"], f = 1), JSON.parseAsync(f ? t : n, function(l, S) {
          var k = h !== (S || "")[":"] && (S || "")["~"];
          if (!k) {
            v(n);
            return;
          }
          v({ m: { "#": i || n["#"], ".": d || n["."], ":": (S || "")[":"], ">": n[">"] || y.state.is(w, d) }, s: k });
        });
      };
      var u = r.opt;
      r.opt.unpack = function(n, v, d) {
        var w;
        if (h !== n) {
          if (n && h !== (w = n[":"]))
            return w;
          if (v = v || u.fall_key, !d && u.fall_val && (d = {}, d[v] = u.fall_val), !(!v || !d)) {
            if (n === d[v] || !r.opt.check(d[v]))
              return n;
            var i = d && d._ && d._["#"] || u.fall_soul, t = y.state.is(d, v) || u.fall_state;
            if (n && n.length === 4 && i === n[0] && v === n[1] && T(t) === T(n[3]))
              return n[2];
            if (t < r.opt.shuffle_attack)
              return n;
          }
        }
      }, r.opt.shuffle_attack = 15463296e5;
      var T = Math.floor;
    })(g, "./index");
  })();
})(Ae);
const je = ne;
self.Gun = globalThis.Gun = be;
export {
  be as Gun,
  je as SEA
};
//# sourceMappingURL=gun-es.js.map
