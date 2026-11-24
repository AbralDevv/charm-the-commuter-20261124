// Charm the Commuter: Forecast a City That Isn't
// One line of weather for an invented city, written to /output/entry.txt.
// Gate: UTF-8 text, 1-140 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Good morning, Drizzlewick! Light drizzle till noon, then sunshine on platform 3 — your umbrella finally earns its keep.";

if (ENTRY.length < 1 || ENTRY.length > 140 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-140 characters, got ${ENTRY.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read back what was written and re-check the gate on the file itself,
// so a stray newline or encoding slip can never ship silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("round-trip mismatch: file content differs from entry");
}
console.log(`wrote ${written.length} chars to /output/entry.txt`);
