import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { store_passwordHandler } from "./tools/store_password.js";
import { generate_passwordHandler } from "./tools/generate_password.js";
import { get_passwordHandler } from "./tools/get_password.js";
import { delete_passwordHandler } from "./tools/delete_password.js";

/**
 * Build a fresh MCP server instance.
 *
 * We export a FACTORY rather than a singleton so the HTTP
 * transport can hand each new session its own `McpServer`.
 * The MCP SDK rejects a second `initialize` on the same
 * Server instance, so a per-session factory is mandatory
 * for the streamable-http transport.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "Password Vault",
    version: "0.1.0",
  });

  // ---------- Tools ----------
  server.registerTool("store_password", {
    description: "Stores a password for a given service. Password is base64 encoded in memory. Returns success status.",
    inputSchema: { service: z.string(), username: z.string(), password: z.string(), note: z.string().optional() },
  }, store_passwordHandler);

  server.registerTool("generate_password", {
    description: "Generates a strong random password with configurable length and options.",
    inputSchema: { length: z.number().optional(), useNumbers: z.boolean().optional(), useSymbols: z.boolean().optional() },
  }, generate_passwordHandler);

  server.registerTool("get_password", {
    description: "Retrieves stored password for a service (decoded from base64).",
    inputSchema: { service: z.string() },
  }, get_passwordHandler);

  server.registerTool("delete_password", {
    description: "Removes a stored password entry by service name.",
    inputSchema: { service: z.string() },
  }, delete_passwordHandler);

  // ---------- Resources ----------
  server.registerResource("service_list", "vault://services", {
    description: "List of stored services,Returns all service names for which passwords are stored.",
    mimeType: "application/json",
  }, async (uri) => ({
    contents: [{ uri: uri.href, text: "TODO: return resource contents" }]
  }));

  // ---------- Prompts ----------
  server.registerPrompt("security_tip", {
    description: "Generates a random security tip based on current vault state.",
    argsSchema: {style: z.string().optional(), style: z.string().optional()},
  }, async (args) => ({
    messages: [{ role: "user" as const, content: { type: "text" as const, text: `Generate a {{style}} security tip for password management.	
If vault is empty → suggest enabling 2FA and using unique passwords.	
If vault has entries → remind about password rotation every 90 days.	
Keep under 80 words for quick, under 150 for detailed.` } }]
  }));

  return server;
}
