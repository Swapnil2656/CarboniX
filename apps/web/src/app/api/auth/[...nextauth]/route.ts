import { handlers } from "@/auth";

// Ensure this route always runs in the Node.js runtime (not Edge).
// bcrypt-ts and jsonwebtoken are Node.js-only and cannot run in Edge.
export const runtime = "nodejs";

export const { GET, POST } = handlers;
