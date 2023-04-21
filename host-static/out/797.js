"use strict";
(self.webpackChunkhost = self.webpackChunkhost || []).push([
  [797],
  {
    797: (e, t, r) => {
      r.r(t);
      var l = r(166),
        n = r.n(l),
        o = r(745),
        a = r(336);
      const m = () =>
        n().createElement("div", {
          className: "_dot_pulse-module_dot-pulse_f9c0",
        });
      class c extends l.Component {
        state = { error: null };
        static getDerivedStateFromError(e) {
          return { error: e };
        }
        componentDidCatch(e, t) {
          console.error("Uncaught error:", e, t);
        }
        render() {
          return this.state.error
            ? n().createElement(u, { error: this.state.error })
            : this.props.children;
        }
      }
      const s = c,
        u = ({ error: e }) =>
          n().createElement(
            "div",
            { className: "_error_boundry-module_error-container_d94b" },
            n().createElement(
              "div",
              { className: "_error_boundry-module_error_ac34" },
              n().createElement(
                "svg",
                {
                  width: "800px",
                  height: "800px",
                  viewBox: "0 0 512 512",
                  xmlns: "http://www.w3.org/2000/svg",
                },
                n().createElement("rect", {
                  x: "240",
                  y: "-31.53",
                  width: "32",
                  height: "575.06",
                  transform: "translate(-106.04 256) rotate(-45)",
                }),
                n().createElement("path", {
                  d: "M38.72,212.78C13.39,235.88,0,267.42,0,304c0,36,14.38,68.88,40.49,92.59C65.64,419.43,99.56,432,136,432H364.12L110.51,178.39C82.5,183.78,57.42,195.72,38.72,212.78Z",
                }),
                n().createElement("path", {
                  d: "M476.59,407.23C499.76,388.78,512,361.39,512,328c0-61.85-48.44-95.34-97.75-102.64-6.52-41.18-24.05-76.4-51.11-102.46A153.57,153.57,0,0,0,256,80c-30.47,0-58.9,8.62-83.07,25L475.75,407.86C476,407.65,476.32,407.45,476.59,407.23Z",
                })
              )
            ),
            n().createElement("p", null, e?.name),
            n().createElement("p", null, e?.message)
          ),
        i = async ({
          url: e,
          scope: t,
          module: l,
          remoteEntryFileName: n = "remoteEntry.js",
          bustRemoteEntryCache: o = !1,
        }) => {
          if (window[t])
            return (await window[t].get(l.startsWith("./") ? l : `./${l}`))();
          if (
            (await ((e, t, l) =>
              new Promise((n, o) => {
                const a = l ? `?t=${new Date().getTime()}` : "";
                r.l(
                  `${e}${a}`,
                  (e) => {
                    if ("load" === e?.type) return n();
                    const t = e?.target?.src,
                      r = new Error();
                    (r.message =
                      "Loading script failed.\n(missing: " + t + ")"),
                      (r.name = "ScriptExternalLoadError"),
                      o(r);
                  },
                  t
                );
              }))(`${e}/${n}`, t, o),
            await (async () => {
              r.S?.default || (await r.I("default"));
            })(),
            !window[t])
          )
            throw new Error(
              `Remote loaded successfully but ${t} could not be found! Verify that the name is correct in the Webpack configuration!`
            );
          return (
            await (async (e) => {
              e.__initialized ||
                e.__initializing ||
                ((e.__initializing = !0),
                await e.init(r.S.default),
                (e.__initialized = !0),
                delete e.__initializing);
            })(window[t]),
            (await window[t].get(l.startsWith("./") ? l : `./${l}`))()
          );
        },
        E = ({
          url: e,
          scope: t,
          module: r,
          fallback: o,
          remoteEntryFileName: a = "remoteEntry.js",
          bustRemoteEntryCache: c = !1,
          ...u
        }) => {
          const E = (0, l.lazy)(() =>
            i({
              url: e,
              scope: t,
              module: r,
              remoteEntryFileName: a,
              bustRemoteEntryCache: c,
            })
          );
          return n().createElement(
            s,
            null,
            n().createElement(
              l.Suspense,
              { fallback: o ?? n().createElement(m, null) },
              n().createElement(E, u)
            )
          );
        },
        d = ({
          url: e,
          scope: t,
          module: r,
          fallback: o,
          remoteEntryFileName: a = "remoteEntry.js",
          bustRemoteEntryCache: c = !1,
          ...u
        }) => {
          const E = (0, l.useMemo)(
            () =>
              (0, l.lazy)(() =>
                i({
                  url: e,
                  scope: t,
                  module: r,
                  remoteEntryFileName: a,
                  bustRemoteEntryCache: c,
                })
              ),
            [e, t, r, a, c]
          );
          return n().createElement(
            s,
            null,
            n().createElement(
              l.Suspense,
              { fallback: o ?? n().createElement(m, null) },
              n().createElement(E, u)
            )
          );
        },
        h = () => {
          const e = w(!0);
          return n().createElement(
            "div",
            { className: "_home-module_home_f4e0" },
            n().createElement(
              "div",
              { className: "_home-module_content_d411" },
              n().createElement("h1", null, "Home Host")
            ),
            n().createElement(E, {
              url: e,
              scope: "remote_b",
              module: "remote_b",
            })
          );
        },
        p = () => {
          const e = (0, l.useRef)(null),
            [t, r] = (0, l.useState)(!1);
          return (
            (0, l.useEffect)(() => {
              e.current &&
                !t &&
                i({
                  url: "http://localhost:3004",
                  scope: "remote_vue",
                  module: "vue_bootstrap",
                }).then((t) => {
                  const { mount: l } = t;
                  l(e.current), r(!0);
                });
            }, [t]),
            n().createElement("div", {
              id: "remote-vue",
              ref: (t) => (e.current = t),
            })
          );
        },
        _ = "http://localhost:3001",
        w = (e) => (e ? "http://localhost:3002/" : "http://localhost:3002"),
        b = w(!1),
        f = () => {
          const e = (0, a.useOutlet)();
          return n().createElement(
            d,
            { url: _, scope: "remote_a", module: "css_provider" },
            n().createElement(d, {
              url: _,
              scope: "remote_a",
              module: "top_navigation",
            }),
            n().createElement(
              d,
              { url: _, scope: "remote_a", module: "layout" },
              n().createElement(
                l.Suspense,
                { fallback: n().createElement(m, null) },
                e
              )
            )
          );
        },
        y = (0, a.createBrowserRouter)(
          (0, a.createRoutesFromElements)(
            n().createElement(
              a.Route,
              { element: n().createElement(f, null) },
              n().createElement(a.Route, {
                path: "/",
                element: n().createElement(h, null),
              }),
              n().createElement(
                a.Route,
                {
                  path: "/remote-b",
                  element: n().createElement(a.Outlet, null),
                },
                n().createElement(a.Route, {
                  path: "/remote-b/",
                  element: n().createElement(E, {
                    url: b,
                    module: "remote_b",
                    scope: "remote_b",
                  }),
                }),
                n().createElement(a.Route, {
                  path: "/remote-b/*",
                  element: n().createElement(E, {
                    url: b,
                    module: "not_found",
                    scope: "remote_b",
                  }),
                })
              ),
              n().createElement(a.Route, {
                path: "/remote-vue",
                element: n().createElement(
                  s,
                  null,
                  n().createElement(
                    l.Suspense,
                    { fallback: n().createElement(m, null) },
                    n().createElement(p, null)
                  )
                ),
              }),
              n().createElement(a.Route, {
                path: "/remote-next",
                element: n().createElement(
                  s,
                  null,
                  n().createElement(
                    l.Suspense,
                    { fallback: n().createElement(m, null) },
                    n().createElement(E, {
                      url: "http://localhost:3000/_next/static/chunks",
                      module: "home",
                      scope: "remote_next",
                    })
                  )
                ),
              }),
              n().createElement(a.Route, {
                path: "/*",
                element: n().createElement(E, {
                  url: b,
                  module: "not_found",
                  scope: "remote_b",
                }),
              })
            )
          )
        );
      (0, o.s)(document.getElementById("host")).render(
        n().createElement(a.RouterProvider, { router: y })
      );
    },
    745: (e, t, r) => {
      var l = r(773);
      (t.s = l.createRoot), l.hydrateRoot;
    },
  },
]);
