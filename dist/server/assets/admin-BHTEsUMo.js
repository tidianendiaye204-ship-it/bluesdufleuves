import { c as createServerRpc } from "./createServerRpc-DqwfPTY6.js";
import { i as createServerFn, w as getCookie } from "./server-BT1Lll6w.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const getSessionId_createServerFn_handler = createServerRpc({
  id: "aeac1ae014d38467652f987e54fc537bcbd46519d88ab5c7836fdf05add0582d",
  name: "getSessionId",
  filename: "src/routes/admin.tsx"
}, (opts) => getSessionId.__executeServer(opts));
const getSessionId = createServerFn({
  method: "GET"
}).handler(getSessionId_createServerFn_handler, async () => {
  return getCookie("admin_session");
});
export {
  getSessionId_createServerFn_handler
};
