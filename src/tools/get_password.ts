/**
 * get_password — Retrieves stored password for a service (decoded from base64).
 *
 * Side effects: read-only
 * Implementation hint: Look up Map by service, decode using Buffer.from(encoded, 'base64').toString(). Return service, username, password, note.
 */
export async function get_passwordHandler(args: { service: string }) {
  // TODO: implement the real logic. The scaffold below returns a
  // placeholder so the server boots and Claude can call it.
  // `as const` widens nothing — the MCP SDK demands the literal
  // type "text" (not just any string) and tsc would otherwise
  // widen the object literal and reject the registerTool call.
  return {
    content: [{ type: "text" as const, text: `TODO: implement get_password — received ${JSON.stringify(args)}` }],
  };
}
