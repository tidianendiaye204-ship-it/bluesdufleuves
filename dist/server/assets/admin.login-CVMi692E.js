import { U as reactExports, K as jsxRuntimeExports } from "./server-BT1Lll6w.js";
import { u as useNavigate, l as loginAdmin } from "./router-2seXN-Iv.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DpQda5kq.js";
import "./types-DGfzljZx.js";
function AdminLogin() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await loginAdmin({
      data: {
        email,
        password
      }
    });
    if (res.error) {
      setError(res.error);
    } else {
      navigate({
        to: "/admin"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto mt-20 bg-card p-8 border border-border rounded-2xl shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl mb-6 text-center", children: "Connexion Administrateur" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-500/10 text-red-500 p-3 rounded-md mb-4 text-sm", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full bg-background border border-input rounded-md px-3 py-2", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Mot de passe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full bg-background border border-input rounded-md px-3 py-2", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full bg-primary text-primary-foreground py-2 rounded-md font-bold hover:bg-primary/90 transition", children: "Se connecter" })
    ] })
  ] });
}
export {
  AdminLogin as component
};
