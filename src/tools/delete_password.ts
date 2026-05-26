/**
 * delete_password — Removes a stored password entry by service name.
 *
 * Side effects: writes
 * Implementation hint: Map.delete(service), return { deleted: true/false }
 */
export async function delete_passwordHandler(args: { service: string }) {
  // TODO: implement the real logic. The scaffold below returns a
  // placeholder so the server boots and Claude can call it.
  // `as const` widens nothing — the MCP SDK demands the literal
  // type "text" (not just any string) and tsc would otherwise
  // widen the object literal and reject the registerTool call.
  return {
    content: [{ type: "text" as const, text: `TODO: implement delete_password — received ${JSON.stringify(args)}` }],
  };
}
