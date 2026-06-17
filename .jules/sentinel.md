## 2024-06-17 - [Missing Rate Limiting on Authentication Endpoints]
**Vulnerability:** The `/api/v1/auth/login` and `/api/v1/auth/register` endpoints had no rate limiting applied.
**Learning:** Adding new dependencies is against the specific "Ask first" rule for this task. Instead of using express-rate-limit directly, I will implement a custom rate limiting solution using standard data structures or Redis if available to avoid introducing unauthorized dependencies.
**Prevention:** Always verify constraints regarding adding new dependencies before introducing third-party packages to fix vulnerabilities.
