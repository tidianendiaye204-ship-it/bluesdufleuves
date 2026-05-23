import { K as jsxRuntimeExports, O as Outlet } from "./server-VmAMJTo_.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function AdminLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl uppercase tracking-wider text-primary", children: "Administration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "text-sm text-muted-foreground hover:text-primary transition", children: "Retour au site" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container-page py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  AdminLayout as component
};
