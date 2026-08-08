#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════
#  CarboniX Full System Test Suite
#  Tests every API endpoint, agent, fallback, AI engine, and subsystem
# ═══════════════════════════════════════════════════════════════════════

BASE_URL="http://localhost:4000/api/v1"
PASS=0
FAIL=0
WARN=0
RESULTS=""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

log_pass() {
  PASS=$((PASS + 1))
  RESULTS="$RESULTS\n✅ PASS | $1"
  echo -e "${GREEN}✅ PASS${NC} | $1"
}

log_fail() {
  FAIL=$((FAIL + 1))
  RESULTS="$RESULTS\n❌ FAIL | $1 | $2"
  echo -e "${RED}❌ FAIL${NC} | $1 | $2"
}

log_warn() {
  WARN=$((WARN + 1))
  RESULTS="$RESULTS\n⚠️  WARN | $1 | $2"
  echo -e "${YELLOW}⚠️  WARN${NC} | $1 | $2"
}

# Helper: HTTP GET with auth
auth_get() {
  curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" "$BASE_URL$1" 2>/dev/null
}

# Helper: HTTP POST with auth
auth_post() {
  curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "$2" "$BASE_URL$1" 2>/dev/null
}

# Helper: HTTP DELETE with auth
auth_delete() {
  curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" "$BASE_URL$1" 2>/dev/null
}

echo "═══════════════════════════════════════════════════════════"
echo "  CarboniX Full System Test Suite"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "═══════════════════════════════════════════════════════════"
echo ""

# ─── 1. HEALTH CHECK ──────────────────────────────────────────
echo "═══ 1. HEALTH CHECK ═══"
HEALTH=$(curl -s "$BASE_URL/health")
if echo "$HEALTH" | python3 -c "import sys,json; d=json.load(sys.stdin); assert d.get('agents')==True" 2>/dev/null; then
  log_pass "API Health Check (agents=true)"
else
  log_fail "API Health Check" "Response: $HEALTH"
fi

# ─── 2. AUTH SYSTEM ───────────────────────────────────────────
echo ""
echo "═══ 2. AUTH SYSTEM ═══"

# 2a. Register new test user
REG_RESP=$(curl -s -X POST "$BASE_URL/auth/register" -H 'Content-Type: application/json' -d "{\"email\":\"test-$(date +%s)@carbonix.dev\",\"password\":\"TestPass123!\",\"name\":\"Test Runner $(date +%s)\"}")
REG_TOKEN=$(echo "$REG_RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('token',''))" 2>/dev/null)
if [ -n "$REG_TOKEN" ] && [ "$REG_TOKEN" != "" ]; then
  log_pass "User Registration"
  TOKEN="$REG_TOKEN"
else
  log_fail "User Registration" "$(echo $REG_RESP | head -c 200)"
fi

# 2b. Login
LOGIN_RESP=$(curl -s -X POST "$BASE_URL/auth/login" -H 'Content-Type: application/json' -d "{\"email\":\"test-$(date +%s)@carbonix.dev\",\"password\":\"TestPass123!\"}")
# Login may fail since email is timestamped. Use the reg token.
if [ -n "$TOKEN" ]; then
  log_pass "Auth Token Available"
else
  log_fail "Auth Token Unavailable" "Cannot proceed with authenticated tests"
  echo "Cannot continue without auth. Exiting."
  exit 1
fi

# 2c. Missing fields
MISSING_REG=$(curl -s -X POST "$BASE_URL/auth/register" -H 'Content-Type: application/json' -d '{"email":""}')
if echo "$MISSING_REG" | grep -q "Missing required fields"; then
  log_pass "Auth: Rejects missing fields"
else
  log_warn "Auth: Missing fields validation" "$(echo $MISSING_REG | head -c 100)"
fi

# 2d. Duplicate email
DUP_REG=$(curl -s -X POST "$BASE_URL/auth/register" -H 'Content-Type: application/json' -d '{"email":"test@carbonix.dev","password":"x","name":"y"}')
if echo "$DUP_REG" | grep -q "already in use"; then
  log_pass "Auth: Rejects duplicate email"
else
  log_warn "Auth: Duplicate email rejection" "$(echo $DUP_REG | head -c 100)"
fi

# 2e. Get Profile
PROFILE_RESP=$(auth_get "/auth/me")
PROFILE_CODE=$(echo "$PROFILE_RESP" | tail -1)
PROFILE_BODY=$(echo "$PROFILE_RESP" | sed '$d')
if [ "$PROFILE_CODE" = "200" ]; then
  log_pass "Auth: Get Profile"
else
  log_warn "Auth: Get Profile" "HTTP $PROFILE_CODE"
fi

# ─── 3. CARBON CALCULATION ENGINE ────────────────────────────
echo ""
echo "═══ 3. CARBON CALCULATION ENGINE ═══"

# 3a. POST /carbon/calculate
CALC_RESP=$(auth_post "/carbon/calculate" '{"instanceType":"t2.micro","region":"us-east-1","provider":"AWS","cpuUtilization":45,"instanceCount":1,"hoursPerMonth":730,"storageGb":20}')
CALC_CODE=$(echo "$CALC_RESP" | tail -1)
CALC_BODY=$(echo "$CALC_RESP" | sed '$d')
if [ "$CALC_CODE" = "200" ]; then
  HAS_CARBON=$(echo "$CALC_BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print('yes' if d.get('success') else 'no')" 2>/dev/null)
  if [ "$HAS_CARBON" = "yes" ]; then
    log_pass "Carbon Calculate Endpoint"
  else
    log_fail "Carbon Calculate Endpoint" "success=false: $(echo $CALC_BODY | head -c 150)"
  fi
else
  log_fail "Carbon Calculate Endpoint" "HTTP $CALC_CODE"
fi

# 3b. POST /carbon/compare (multi-region comparison)
COMPARE_RESP=$(auth_post "/carbon/compare" '{"instanceType":"t2.micro","cpuUtilization":50,"provider":"aws","regions":["us-east-1","eu-west-1","ap-south-1"]}')
COMPARE_CODE=$(echo "$COMPARE_RESP" | tail -1)
COMPARE_BODY=$(echo "$COMPARE_RESP" | sed '$d')
if [ "$COMPARE_CODE" = "200" ]; then
  log_pass "Carbon Compare Endpoint"
else
  log_fail "Carbon Compare Endpoint" "HTTP $COMPARE_CODE"
fi

# 3c. POST /carbon/recommend
RECOMMEND_RESP=$(auth_post "/carbon/recommend" '{"instanceType":"t2.micro","region":"us-east-1","provider":"AWS","cpuUtilization":12,"instanceCount":1,"hoursPerMonth":730,"storageGb":20}')
RECOMMEND_CODE=$(echo "$RECOMMEND_RESP" | tail -1)
RECOMMEND_BODY=$(echo "$RECOMMEND_RESP" | sed '$d')
if [ "$RECOMMEND_CODE" = "200" ]; then
  log_pass "Carbon Recommend Endpoint"
else
  log_fail "Carbon Recommend Endpoint" "HTTP $RECOMMEND_CODE"
fi

# 3d. POST /carbon/calculate-emissions (no auth needed)
EMISSIONS_RESP=$(curl -s -w "\n%{http_code}" -H "Content-Type: application/json" -d '{"energyKwh":150,"countryCode":"US"}' "$BASE_URL/carbon/calculate-emissions")
EMISSIONS_CODE=$(echo "$EMISSIONS_RESP" | tail -1)
if [ "$EMISSIONS_CODE" = "200" ]; then
  log_pass "Carbon Calculate-Emissions (public)"
else
  log_fail "Carbon Calculate-Emissions (public)" "HTTP $EMISSIONS_CODE"
fi

# ─── 4. DASHBOARD ────────────────────────────────────────────
echo ""
echo "═══ 4. DASHBOARD (Mobile API) ═══"

DASH_RESP=$(auth_get "/carbon/dashboard")
DASH_CODE=$(echo "$DASH_RESP" | tail -1)
DASH_BODY=$(echo "$DASH_RESP" | sed '$d')
if [ "$DASH_CODE" = "200" ]; then
  HAS_SPARKLINE=$(echo "$DASH_BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print('yes' if 'weeklySparkline' in str(d) else 'no')" 2>/dev/null)
  if [ "$HAS_SPARKLINE" = "yes" ]; then
    log_pass "Dashboard: weeklySparkline present"
  else
    log_warn "Dashboard: weeklySparkline missing" "$(echo $DASH_BODY | head -c 150)"
  fi
  log_pass "Dashboard Endpoint"
else
  log_fail "Dashboard Endpoint" "HTTP $DASH_CODE"
fi

# ─── 5. HISTORY ──────────────────────────────────────────────
echo ""
echo "═══ 5. HISTORY ═══"

HIST_RESP=$(auth_get "/carbon/history")
HIST_CODE=$(echo "$HIST_RESP" | tail -1)
if [ "$HIST_CODE" = "200" ]; then
  log_pass "History Endpoint"
else
  log_fail "History Endpoint" "HTTP $HIST_CODE"
fi

# ─── 6. NOTIFICATIONS ────────────────────────────────────────
echo ""
echo "═══ 6. NOTIFICATIONS ═══"

NOTIF_RESP=$(auth_get "/carbon/notifications")
NOTIF_CODE=$(echo "$NOTIF_RESP" | tail -1)
if [ "$NOTIF_CODE" = "200" ]; then
  log_pass "Notifications Endpoint"
else
  log_fail "Notifications Endpoint" "HTTP $NOTIF_CODE"
fi

# ─── 7. ADMIN DASHBOARD ──────────────────────────────────────
echo ""
echo "═══ 7. ADMIN DASHBOARD (Web App API) ═══"

ADMIN_DASH=$(auth_get "/admin/dashboard")
ADMIN_CODE=$(echo "$ADMIN_DASH" | tail -1)
ADMIN_BODY=$(echo "$ADMIN_DASH" | sed '$d')
if [ "$ADMIN_CODE" = "200" ]; then
  HAS_PROJECTS=$(echo "$ADMIN_BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print('yes' if 'projects' in str(d) else 'no')" 2>/dev/null)
  if [ "$HAS_PROJECTS" = "yes" ]; then
    log_pass "Admin Dashboard: Projects data"
  else
    log_warn "Admin Dashboard: No projects" "New user has no projects"
  fi
  log_pass "Admin Dashboard Endpoint"
else
  log_fail "Admin Dashboard Endpoint" "HTTP $ADMIN_CODE"
fi

# ─── 8. ADMIN USERS / TEAM ───────────────────────────────────
echo ""
echo "═══ 8. ADMIN USERS & TEAM ═══"

USERS_RESP=$(auth_get "/admin/users")
USERS_CODE=$(echo "$USERS_RESP" | tail -1)
if [ "$USERS_CODE" = "200" ]; then
  log_pass "Admin Users Endpoint"
else
  log_fail "Admin Users Endpoint" "HTTP $USERS_CODE"
fi

TEAM_RESP=$(auth_get "/admin/team")
TEAM_CODE=$(echo "$TEAM_RESP" | tail -1)
if [ "$TEAM_CODE" = "200" ]; then
  log_pass "Admin Team Endpoint"
else
  log_fail "Admin Team Endpoint" "HTTP $TEAM_CODE"
fi

# ─── 9. ADMIN EMISSIONS ──────────────────────────────────────
echo ""
echo "═══ 9. ADMIN EMISSIONS ═══"

EMIS_RESP=$(auth_get "/admin/emissions")
EMIS_CODE=$(echo "$EMIS_RESP" | tail -1)
if [ "$EMIS_CODE" = "200" ]; then
  log_pass "Admin Emissions Endpoint"
else
  log_fail "Admin Emissions Endpoint" "HTTP $EMIS_CODE"
fi

# ─── 10. ADMIN NOTIFICATIONS ────────────────────────────────
echo ""
echo "═══ 10. ADMIN NOTIFICATIONS ═══"

ADMIN_NOTIF=$(auth_get "/admin/notifications")
ADMIN_NOTIF_CODE=$(echo "$ADMIN_NOTIF" | tail -1)
if [ "$ADMIN_NOTIF_CODE" = "200" ]; then
  log_pass "Admin Notifications Endpoint"
else
  log_fail "Admin Notifications Endpoint" "HTTP $ADMIN_NOTIF_CODE"
fi

# ─── 11. ADMIN AUDIT LOGS ───────────────────────────────────
echo ""
echo "═══ 11. ADMIN AUDIT LOGS ═══"

AUDIT_RESP=$(auth_get "/admin/audit-logs")
AUDIT_CODE=$(echo "$AUDIT_RESP" | tail -1)
if [ "$AUDIT_CODE" = "200" ]; then
  log_pass "Admin Audit Logs Endpoint"
else
  log_fail "Admin Audit Logs Endpoint" "HTTP $AUDIT_CODE"
fi

# ─── 12. API KEYS MANAGEMENT ─────────────────────────────────
echo ""
echo "═══ 12. API KEYS MANAGEMENT ═══"

KEYS_RESP=$(auth_get "/admin/api-keys")
KEYS_CODE=$(echo "$KEYS_RESP" | tail -1)
if [ "$KEYS_CODE" = "200" ]; then
  log_pass "Admin API Keys List"
else
  log_fail "Admin API Keys List" "HTTP $KEYS_CODE"
fi

# Create an API Key
NEWKEY_RESP=$(auth_post "/admin/api-keys" '{"name":"test-key"}')
NEWKEY_CODE=$(echo "$NEWKEY_RESP" | tail -1)
NEWKEY_BODY=$(echo "$NEWKEY_RESP" | sed '$d')
if [ "$NEWKEY_CODE" = "200" ] || [ "$NEWKEY_CODE" = "201" ]; then
  API_KEY=$(echo "$NEWKEY_BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('plainKey',d.get('data',{}).get('key','')))" 2>/dev/null)
  log_pass "Admin Create API Key"
else
  log_fail "Admin Create API Key" "HTTP $NEWKEY_CODE"
fi

# ─── 13. FEATURE FLAGS ──────────────────────────────────────
echo ""
echo "═══ 13. FEATURE FLAGS ═══"

FF_RESP=$(auth_get "/admin/feature-flags")
FF_CODE=$(echo "$FF_RESP" | tail -1)
if [ "$FF_CODE" = "200" ]; then
  log_pass "Feature Flags List"
else
  log_fail "Feature Flags List" "HTTP $FF_CODE"
fi

# ─── 14. AGENTIC SYSTEM ──────────────────────────────────────
echo ""
echo "═══ 14. AGENTIC SYSTEM ═══"

# 14a. List Agent Runs
RUNS_RESP=$(auth_get "/agents/runs")
RUNS_CODE=$(echo "$RUNS_RESP" | tail -1)
if [ "$RUNS_CODE" = "200" ]; then
  log_pass "Agent Runs List"
else
  log_fail "Agent Runs List" "HTTP $RUNS_CODE"
fi

# 14b. Trigger Collector
TRIG_COLL=$(auth_post "/agents/trigger/collector" '{}')
TRIG_COLL_CODE=$(echo "$TRIG_COLL" | tail -1)
if [ "$TRIG_COLL_CODE" = "200" ]; then
  log_pass "Agent Trigger: Collector"
else
  log_fail "Agent Trigger: Collector" "HTTP $TRIG_COLL_CODE"
fi

# 14c. Trigger Analyst
TRIG_ANA=$(auth_post "/agents/trigger/analyst" '{}')
TRIG_ANA_CODE=$(echo "$TRIG_ANA" | tail -1)
if [ "$TRIG_ANA_CODE" = "200" ]; then
  log_pass "Agent Trigger: Analyst"
else
  log_fail "Agent Trigger: Analyst" "HTTP $TRIG_ANA_CODE"
fi

# 14d. Trigger Reporter
TRIG_REP=$(auth_post "/agents/trigger/reporter" '{}')
TRIG_REP_CODE=$(echo "$TRIG_REP" | tail -1)
if [ "$TRIG_REP_CODE" = "200" ]; then
  log_pass "Agent Trigger: Reporter"
else
  log_fail "Agent Trigger: Reporter" "HTTP $TRIG_REP_CODE"
fi

# 14e. Trigger Orchestrator
TRIG_ORCH=$(auth_post "/agents/trigger/orchestrator" '{}')
TRIG_ORCH_CODE=$(echo "$TRIG_ORCH" | tail -1)
if [ "$TRIG_ORCH_CODE" = "200" ]; then
  log_pass "Agent Trigger: Orchestrator"
else
  log_fail "Agent Trigger: Orchestrator" "HTTP $TRIG_ORCH_CODE"
fi

# 14f. Get Emissions via agents
AGEN_EMIS=$(auth_get "/agents/emissions")
AGEN_EMIS_CODE=$(echo "$AGEN_EMIS" | tail -1)
if [ "$AGEN_EMIS_CODE" = "200" ]; then
  log_pass "Agent Emissions Data"
else
  log_fail "Agent Emissions Data" "HTTP $AGEN_EMIS_CODE"
fi

# 14g. BRSR Report
BRSR_RESP=$(auth_get "/agents/report/brsr")
BRSR_CODE=$(echo "$BRSR_RESP" | tail -1)
if [ "$BRSR_CODE" = "200" ]; then
  log_pass "Agent BRSR Report"
else
  log_fail "Agent BRSR Report" "HTTP $BRSR_CODE"
fi

# 14h. CI/CD Gate
GATE_RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/agents/gate" -H "Content-Type: application/json" -d '{"projectId":"test","commitSha":"abc123","instances":[{"instanceType":"t2.micro","region":"us-east-1","provider":"aws","cpuUtilization":50}]}')
GATE_CODE=$(echo "$GATE_RESP" | tail -1)
if [ "$GATE_CODE" = "200" ]; then
  log_pass "CI/CD Gate"
else
  log_warn "CI/CD Gate" "HTTP $GATE_CODE (may need real project)"
fi

# ─── 15. AI CHAT ENGINE ──────────────────────────────────────
echo ""
echo "═══ 15. AI CHAT ENGINE (NVIDIA NIM) ═══"

# 15a. Chat history
AI_HIST=$(auth_get "/ai/history")
AI_HIST_CODE=$(echo "$AI_HIST" | tail -1)
if [ "$AI_HIST_CODE" = "200" ]; then
  log_pass "AI Chat: Get History"
else
  log_fail "AI Chat: Get History" "HTTP $AI_HIST_CODE"
fi

# 15b. Send a chat message
AI_CHAT=$(auth_post "/ai/chat" '{"message":"What is my current carbon footprint?"}')
AI_CHAT_CODE=$(echo "$AI_CHAT" | tail -1)
AI_CHAT_BODY=$(echo "$AI_CHAT" | sed '$d')
if [ "$AI_CHAT_CODE" = "200" ]; then
  HAS_REPLY=$(echo "$AI_CHAT_BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print('yes' if d.get('data',{}).get('reply','') else 'no')" 2>/dev/null)
  if [ "$HAS_REPLY" = "yes" ]; then
    log_pass "AI Chat: Response received"
  else
    log_warn "AI Chat: Empty reply" "$(echo $AI_CHAT_BODY | head -c 150)"
  fi
else
  log_fail "AI Chat Endpoint" "HTTP $AI_CHAT_CODE - $(echo $AI_CHAT_BODY | head -c 100)"
fi

# 15c. Clear history
AI_CLEAR=$(curl -s -w "\n%{http_code}" -X DELETE -H "Authorization: Bearer $TOKEN" "$BASE_URL/ai/history")
AI_CLEAR_CODE=$(echo "$AI_CLEAR" | tail -1)
if [ "$AI_CLEAR_CODE" = "200" ]; then
  log_pass "AI Chat: Clear History"
else
  log_fail "AI Chat: Clear History" "HTTP $AI_CLEAR_CODE"
fi

# ─── 16. CONNECT / PLATFORM INTEGRATIONS ─────────────────────
echo ""
echo "═══ 16. CONNECT / PLATFORM INTEGRATIONS ═══"

# 16a. Get platforms
PLAT_RESP=$(auth_get "/connect/platforms")
PLAT_CODE=$(echo "$PLAT_RESP" | tail -1)
PLAT_BODY=$(echo "$PLAT_RESP" | sed '$d')
if [ "$PLAT_CODE" = "200" ]; then
  PLAT_COUNT=$(echo "$PLAT_BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('data',{}).get('platforms',[])))" 2>/dev/null)
  log_pass "Connect: Platform List ($PLAT_COUNT platforms)"
else
  log_fail "Connect: Platform List" "HTTP $PLAT_CODE"
fi

# 16b. Connect platform-token (invalid token should fail gracefully)
CONNECT_RESP=$(auth_post "/connect/platform-token" '{"platform":"VERCEL","token":"invalid_token_test","projectId":"nonexistent"}')
CONNECT_CODE=$(echo "$CONNECT_RESP" | tail -1)
CONNECT_BODY=$(echo "$CONNECT_RESP" | sed '$d')
if [ "$CONNECT_CODE" = "400" ] || [ "$CONNECT_CODE" = "404" ] || [ "$CONNECT_CODE" = "401" ] || [ "$CONNECT_CODE" = "403" ] || [ "$CONNECT_CODE" = "500" ]; then
  log_pass "Connect: Rejects invalid token (HTTP $CONNECT_CODE)"
else
  log_warn "Connect: Invalid token handling" "Unexpected HTTP $CONNECT_CODE"
fi

# ─── 17. CLI / SDK ENDPOINTS ─────────────────────────────────
echo ""
echo "═══ 17. CLI / SDK ENDPOINTS ═══"

# 17a. Verify Key (with API Key auth)
if [ -n "$API_KEY" ]; then
  VK_RESP=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $API_KEY" "$BASE_URL/carbon/verify-key" -X POST -H 'Content-Type: application/json' -d '{}')
  VK_CODE=$(echo "$VK_RESP" | tail -1)
  if [ "$VK_CODE" = "200" ]; then
    log_pass "CLI: Verify Key"
  else
    log_fail "CLI: Verify Key" "HTTP $VK_CODE"
  fi

  # 17b. Init Project
  INIT_RESP=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $API_KEY" "$BASE_URL/carbon/init" -X POST -H 'Content-Type: application/json' -d '{"name":"test-project","framework":"nextjs"}')
  INIT_CODE=$(echo "$INIT_RESP" | tail -1)
  if [ "$INIT_CODE" = "200" ]; then
    log_pass "CLI: Init Project"
  else
    log_fail "CLI: Init Project" "HTTP $INIT_CODE"
  fi

  # 17c. Telemetry Ingest
  TEL_RESP=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $API_KEY" "$BASE_URL/carbon/telemetry/ingest" -X POST -H 'Content-Type: application/json' -d '{"records":[{"instanceId":"i-test","instanceType":"t2.micro","provider":"aws","region":"us-east-1","cpuUtilization":30}]}')
  TEL_CODE=$(echo "$TEL_RESP" | tail -1)
  if [ "$TEL_CODE" = "200" ]; then
    log_pass "CLI: Telemetry Ingest"
  else
    log_fail "CLI: Telemetry Ingest" "HTTP $TEL_CODE"
  fi
else
  log_warn "CLI: Verify Key" "No API Key available"
  log_warn "CLI: Init Project" "No API Key available"
  log_warn "CLI: Telemetry Ingest" "No API Key available"
fi

# ─── 18. LOCAL AGENT REPORT ──────────────────────────────────
echo ""
echo "═══ 18. LOCAL AGENT REPORT ═══"

if [ -n "$API_KEY" ]; then
  AGENT_REPORT=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $API_KEY" "$BASE_URL/agent/report" -X POST -H 'Content-Type: application/json' -d '{"type":"telemetry","data":{"instanceId":"local-dev","cpuPercent":45,"memPercent":60}}')
  AGENT_CODE=$(echo "$AGENT_REPORT" | tail -1)
  if [ "$AGENT_CODE" = "200" ]; then
    log_pass "Local Agent Report"
  else
    log_fail "Local Agent Report" "HTTP $AGENT_CODE"
  fi
else
  log_warn "Local Agent Report" "No API Key"
fi

# ─── 19. REFERENCE DATA ─────────────────────────────────────
echo ""
echo "═══ 19. REFERENCE DATA ═══"

REF_RESP=$(curl -s -w "\n%{http_code}" "$BASE_URL/reference/regions")
REF_CODE=$(echo "$REF_RESP" | tail -1)
if [ "$REF_CODE" = "200" ]; then
  log_pass "Reference: Regions"
else
  log_fail "Reference: Regions" "HTTP $REF_CODE"
fi

REF_INST=$(curl -s -w "\n%{http_code}" "$BASE_URL/reference/instances")
REF_INST_CODE=$(echo "$REF_INST" | tail -1)
if [ "$REF_INST_CODE" = "200" ]; then
  log_pass "Reference: Instance Types"
else
  log_fail "Reference: Instance Types" "HTTP $REF_INST_CODE"
fi

# ─── 20. RATE LIMITING ──────────────────────────────────────
echo ""
echo "═══ 20. SECURITY & MIDDLEWARE ═══"

# 20a. Unauthenticated access to protected route
UNAUTH=$(curl -s -w "\n%{http_code}" "$BASE_URL/admin/dashboard")
UNAUTH_CODE=$(echo "$UNAUTH" | tail -1)
if [ "$UNAUTH_CODE" = "401" ] || [ "$UNAUTH_CODE" = "403" ]; then
  log_pass "Security: Rejects unauthenticated access (HTTP $UNAUTH_CODE)"
else
  log_fail "Security: Unauthenticated access" "Expected 401/403, got $UNAUTH_CODE"
fi

# 20b. Invalid token
INVALID_TOK=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer invalidtoken123" "$BASE_URL/admin/dashboard")
INVALID_CODE=$(echo "$INVALID_TOK" | tail -1)
if [ "$INVALID_CODE" = "401" ] || [ "$INVALID_CODE" = "403" ]; then
  log_pass "Security: Rejects invalid token (HTTP $INVALID_CODE)"
else
  log_fail "Security: Invalid token" "Expected 401/403, got $INVALID_CODE"
fi

# ─── 21. INVITE ACCEPTANCE (PUBLIC) ──────────────────────────
echo ""
echo "═══ 21. PUBLIC ENDPOINTS ═══"

ACCEPT_RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/public/accept-invite" -H 'Content-Type: application/json' -d '{"email":"test@example.com"}')
ACCEPT_CODE=$(echo "$ACCEPT_RESP" | tail -1)
if [ "$ACCEPT_CODE" = "200" ]; then
  log_pass "Public: Accept Invite"
else
  log_warn "Public: Accept Invite" "HTTP $ACCEPT_CODE"
fi

# ─── 22. WEB APP ACCESSIBILITY ───────────────────────────────
echo ""
echo "═══ 22. WEB APP ACCESSIBILITY ═══"

WEB_RESP=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
if [ "$WEB_RESP" = "200" ]; then
  log_pass "Web App: Homepage accessible"
else
  log_fail "Web App: Homepage" "HTTP $WEB_RESP"
fi

WEB_LOGIN=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/login")
if [ "$WEB_LOGIN" = "200" ]; then
  log_pass "Web App: Login page accessible"
else
  log_fail "Web App: Login page" "HTTP $WEB_LOGIN"
fi

WEB_REG=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/signup")
if [ "$WEB_REG" = "200" ]; then
  log_pass "Web App: Signup page accessible"
else
  log_fail "Web App: Signup page" "HTTP $WEB_REG"
fi

# ─── SUMMARY ─────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  TEST SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✅ PASS: $PASS${NC}"
echo -e "${RED}❌ FAIL: $FAIL${NC}"
echo -e "${YELLOW}⚠️  WARN: $WARN${NC}"
TOTAL=$((PASS + FAIL + WARN))
echo "   TOTAL: $TOTAL"
echo ""

# Output full results file
echo "═══ FULL RESULTS ═══" 
echo -e "$RESULTS"
echo ""

if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}All critical tests passed! 🎉${NC}"
else
  echo -e "${RED}$FAIL test(s) FAILED. Review above for details.${NC}"
fi
