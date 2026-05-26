import { describe, it, expect } from "vitest";
import { store_passwordHandler } from "../src/tools/store_password";
import { generate_passwordHandler } from "../src/tools/generate_password";
import { get_passwordHandler } from "../src/tools/get_password";
import { delete_passwordHandler } from "../src/tools/delete_password";

describe("store_password", () => {
  it("returns a content array", async () => {
    const result = await store_passwordHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("generate_password", () => {
  it("returns a content array", async () => {
    const result = await generate_passwordHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("get_password", () => {
  it("returns a content array", async () => {
    const result = await get_passwordHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("delete_password", () => {
  it("returns a content array", async () => {
    const result = await delete_passwordHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

