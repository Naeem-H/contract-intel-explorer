export const API_ROOT =
  "https://aiuwscxsbsgaeunyhiak.supabase.co/functions/v1/explorer";

const TOKEN_PATTERN = /^\S{24,512}$/;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SOURCE_PATTERN = /^[a-z0-9][a-z0-9_-]{1,62}$/;
const DOCUMENT_KINDS = new Set([
  "contract",
  "amendment",
  "notice",
  "template",
  "metadata",
  "other",
]);
const MAX_RESPONSE_BYTES = 6 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 12_000;

export class ApiError extends Error {
  constructor(message, status = 0, code = "request_failed", requestId = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function record(value) {
  return isRecord(value) ? value : {};
}

function array(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizeToken(value) {
  if (typeof value !== "string") return null;
  const token = value.trim();
  return TOKEN_PATTERN.test(token) ? token : null;
}

function isAllowedApiTarget(url) {
  const pathname = url.pathname;
  if (
    pathname === "/api/dashboard" ||
    pathname === "/api/summary" ||
    pathname === "/api/metrics"
  ) return url.search === "";
  if (pathname === "/api/search") {
    const allowed = new Set(["q", "limit", "offset", "kind", "source"]);
    return [...url.searchParams.keys()].every((key) => allowed.has(key));
  }
  const match = pathname.match(/^\/api\/(agreements|claims)\/([^/]+)$/);
  if (!match || !UUID_PATTERN.test(match[2])) return false;
  if (match[1] === "claims") return url.search === "";
  return [...url.searchParams.keys()].every((key) => key === "clauses");
}

export function apiUrl(path) {
  if (typeof path !== "string" || !path.startsWith("/")) {
    throw new TypeError("API path must be root-relative");
  }
  const relative = new URL(path, "https://route.invalid");
  if (
    relative.origin !== "https://route.invalid" || relative.hash ||
    !isAllowedApiTarget(relative)
  ) {
    throw new TypeError("API path is not allowed");
  }
  return `${API_ROOT}${relative.pathname}${relative.search}`;
}

export function buildSearchPath({
  query,
  kind = "",
  source = "",
  limit = 20,
  offset = 0,
}) {
  const normalizedQuery = typeof query === "string" ? query.trim() : "";
  if (
    normalizedQuery.length < 2 || normalizedQuery.length > 200 ||
    !/[\p{L}\p{N}]/u.test(normalizedQuery)
  ) {
    throw new TypeError("Search needs 2–200 characters and a letter or number");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new TypeError("Search limit is outside the allowed range");
  }
  if (!Number.isInteger(offset) || offset < 0 || offset > 1_000) {
    throw new TypeError("Search offset is outside the allowed range");
  }
  if (kind && !DOCUMENT_KINDS.has(kind)) {
    throw new TypeError("Document class is not supported");
  }
  const normalizedSource = typeof source === "string"
    ? source.trim().toLowerCase()
    : "";
  if (normalizedSource && !SOURCE_PATTERN.test(normalizedSource)) {
    throw new TypeError("Source slug is invalid");
  }

  const params = new URLSearchParams({
    q: normalizedQuery,
    limit: String(limit),
    offset: String(offset),
  });
  if (kind) params.set("kind", kind);
  if (normalizedSource) params.set("source", normalizedSource);
  return `/api/search?${params.toString()}`;
}

export function buildAgreementPath(agreementId, clauseLimit = 40) {
  if (typeof agreementId !== "string" || !UUID_PATTERN.test(agreementId)) {
    throw new TypeError("Agreement identifier is invalid");
  }
  if (!Number.isInteger(clauseLimit) || clauseLimit < 1 || clauseLimit > 40) {
    throw new TypeError("Clause limit is outside the allowed range");
  }
  return `/api/agreements/${agreementId}?clauses=${clauseLimit}`;
}

export function safeExternalUrl(value) {
  if (typeof value !== "string" || value.length > 2_048) return null;
  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    if (parsed.username || parsed.password) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

async function readBoundedJson(response) {
  const declared = response.headers.get("content-length");
  if (declared && Number(declared) > MAX_RESPONSE_BYTES) {
    await response.body?.cancel();
    throw new ApiError("The API response exceeded the browser safety limit.");
  }
  if (!response.body) return null;

  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_RESPONSE_BYTES) {
      await reader.cancel();
      throw new ApiError("The API response exceeded the browser safety limit.");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new ApiError("The API returned an unreadable response.");
  }
}

export async function requestJson(path, token, fetchImpl = globalThis.fetch) {
  const normalizedToken = normalizeToken(token);
  if (!normalizedToken) throw new ApiError("A valid access token is required.");
  if (typeof fetchImpl !== "function") {
    throw new ApiError("Fetch is unavailable.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetchImpl(apiUrl(path), {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      redirect: "error",
      referrerPolicy: "no-referrer",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${normalizedToken}`,
      },
      signal: controller.signal,
    });
    const payload = await readBoundedJson(response);
    if (!response.ok) {
      const error = record(record(payload).error);
      const message = typeof error.message === "string"
        ? error.message
        : `Request failed with status ${response.status}.`;
      throw new ApiError(
        message,
        response.status,
        typeof error.code === "string" ? error.code : "request_failed",
        typeof record(payload).request_id === "string"
          ? record(payload).request_id
          : null,
      );
    }
    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The API request timed out.");
    }
    throw new ApiError("The protected API could not be reached.");
  } finally {
    clearTimeout(timeout);
  }
}

function element(tag, className = "", value) {
  const created = document.createElement(tag);
  if (className) created.className = className;
  if (value !== undefined) created.textContent = displayText(value, "");
  return created;
}

function displayText(value, fallback = "—") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function boundedText(value, maximum = 24_000) {
  const text = displayText(value, "");
  return text.length > maximum
    ? `${text.slice(0, maximum)}\n… [display truncated]`
    : text;
}

function count(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed.toLocaleString() : "—";
}

function money(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed)
    ? `$${
      parsed.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      })
    }`
    : "—";
}

function date(value) {
  if (!value) return "Not yet";
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.valueOf())
    ? displayText(value)
    : parsed.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
}

function append(parent, ...children) {
  for (const child of children) {
    if (child) parent.append(child);
  }
  return parent;
}

function sourceLink(value, label = "Open source ↗") {
  const href = safeExternalUrl(value);
  if (!href) return null;
  const link = element("a", "", label);
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.referrerPolicy = "no-referrer";
  return link;
}

function dataList(entries) {
  const list = element("dl", "data-list");
  for (const [label, value] of entries) {
    const row = element("div", "data-row");
    append(row, element("dt", "", label), element("dd", "", value));
    list.append(row);
  }
  return list;
}

function statusMessage(target, message = "", kind = "") {
  target.className = `status${kind ? ` ${kind}` : ""}`;
  target.textContent = message;
}

function highlightedExcerpt(value) {
  const container = element("p", "excerpt");
  const text = boundedText(value, 12_000);
  let position = 0;
  while (position < text.length) {
    const start = text.indexOf("<<", position);
    if (start < 0) {
      container.append(document.createTextNode(text.slice(position)));
      break;
    }
    container.append(document.createTextNode(text.slice(position, start)));
    const end = text.indexOf(">>", start + 2);
    if (end < 0) {
      container.append(document.createTextNode(text.slice(start + 2)));
      break;
    }
    container.append(element("mark", "", text.slice(start + 2, end)));
    position = end + 2;
  }
  if (!text) container.textContent = "No excerpt is available.";
  return container;
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeDialog(dialog) {
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

function boot() {
  const byId = (id) => {
    const found = document.getElementById(id);
    if (!found) throw new Error(`Missing page element: ${id}`);
    return found;
  };

  if (window.top !== window.self) {
    const warning = element(
      "p",
      "status error",
      "For security, open the Esheria explorer directly rather than inside another site.",
    );
    document.body.replaceChildren(warning);
    return;
  }
  const state = {
    token: null,
    query: "",
    kind: "",
    source: "",
    offset: 0,
    limit: 20,
    hasMore: false,
    searching: false,
  };

  const authView = byId("auth-view");
  const workspace = byId("workspace");
  const clearButton = byId("clear-token");
  const tokenForm = byId("token-form");
  const tokenInput = byId("access-token");
  const connectButton = byId("connect");
  const authStatus = byId("auth-status");
  const workspaceStatus = byId("workspace-status");
  const summaryCards = byId("summary-cards");
  const kindBreakdown = byId("kind-breakdown");
  const operations = byId("operations");
  const summaryFreshness = byId("summary-freshness");
  const corpusDisclosure = byId("corpus-disclosure");
  const searchForm = byId("search-form");
  const queryInput = byId("query");
  const kindInput = byId("kind");
  const sourceInput = byId("source");
  const searchButton = byId("search-submit");
  const searchStatus = byId("search-status");
  const results = byId("results");
  const previous = byId("previous");
  const next = byId("next");
  const detailDialog = byId("detail-dialog");
  const detailBody = byId("detail-body");

  function showWorkspace() {
    authView.hidden = true;
    workspace.hidden = false;
    clearButton.hidden = false;
  }

  function signOut(message = "The token was cleared from this tab.") {
    state.token = null;
    tokenForm.reset();
    searchForm.reset();
    summaryCards.replaceChildren();
    kindBreakdown.replaceChildren();
    operations.replaceChildren();
    corpusDisclosure.replaceChildren();
    results.replaceChildren(
      element("p", "empty", "Sign in to search published evidence."),
    );
    closeDialog(detailDialog);
    workspace.hidden = true;
    clearButton.hidden = true;
    authView.hidden = false;
    statusMessage(workspaceStatus);
    statusMessage(authStatus, message);
    tokenInput.focus();
  }

  function handleFailure(error, target) {
    if (error instanceof ApiError && error.status === 401) {
      signOut(
        "The token was not accepted or has changed. Enter the current explorer token.",
      );
      return;
    }
    const requestSuffix = error instanceof ApiError && error.requestId
      ? ` Request ID: ${error.requestId}`
      : "";
    statusMessage(
      target,
      `${
        error instanceof Error ? error.message : "The request failed."
      }${requestSuffix}`,
      "error",
    );
  }

  function metric(label, value, note) {
    const card = element("article", "metric");
    append(
      card,
      element("span", "", label),
      element("strong", "", value),
      element("small", "", note),
    );
    return card;
  }

  function renderDashboard(payload) {
    const root = record(payload);
    const summary = record(root.summary);
    const metrics = record(root.metrics);
    const acquisition = record(metrics.acquisition);
    const corpus = record(metrics.corpus);
    const quality = record(metrics.quality);
    const processing = record(metrics.processing);
    const failures = record(root.failures);
    const failureGroups = array(failures.groups);
    const sourceBreakdown = array(root.sources);
    const evidenceQuality = record(root.evidence_quality);

    summaryCards.replaceChildren(
      metric(
        "Published agreements",
        count(summary.published_agreements),
        "rights-gated records",
      ),
      metric(
        "Useful distinct",
        count(summary.published_useful_agreements),
        "contracts + amendments",
      ),
      metric(
        "Published clauses",
        count(summary.published_clauses),
        "searchable observed text",
      ),
      metric(
        "Published sources",
        count(summary.published_sources),
        "approved source systems",
      ),
      metric(
        "Reported cost",
        money(processing.reported_cost_usd),
        "recorded pipeline spend",
      ),
    );

    const breakdown = record(summary.published_by_document_kind);
    const breakdownEntries = Object.entries(breakdown)
      .slice(0, DOCUMENT_KINDS.size)
      .map(([label, value]) => [label.replaceAll("_", " "), count(value)]);
    kindBreakdown.replaceChildren(
      breakdownEntries.length
        ? dataList(breakdownEntries)
        : element("p", "muted", "No published document classes yet."),
    );

    operations.replaceChildren(dataList([
      ["Acquired source items", count(acquisition.source_items)],
      ["Distinct artifacts", count(acquisition.distinct_content_artifacts)],
      [
        "All useful distinct agreements",
        count(corpus.useful_distinct_agreements),
      ],
      ["Current extractions", count(corpus.current_extractions)],
      [
        "Average extraction confidence",
        displayText(quality.average_current_extraction_confidence),
      ],
      [
        "Exact clause offsets",
        `${count(evidenceQuality.exact_offset_matches)} / ${
          count(evidenceQuality.current_clauses)
        }`,
      ],
      [
        "Evidence integrity",
        evidenceQuality.integrity_passed === true
          ? "Passed"
          : evidenceQuality.audit_stale === true
          ? "Audit stale"
          : "Needs review",
      ],
      [
        "Last full evidence audit",
        date(evidenceQuality.audited_at),
      ],
      [
        "Clause references",
        `${count(evidenceQuality.resolved_clause_relationships)} resolved · ${
          count(evidenceQuality.unresolved_clause_references)
        } observed unresolved`,
      ],
      ["Last successful run", date(acquisition.last_successful_run_at)],
      [
        "Failed/dead-letter (30 days)",
        count(failures.total_failed_or_dead_letter),
      ],
      [
        "Top failure class",
        failureGroups.length
          ? `${displayText(record(failureGroups[0]).source_slug)} · ${
            displayText(
              record(failureGroups[0]).failure_class ||
                record(failureGroups[0]).error_code,
            )
          } (${count(record(failureGroups[0]).count)})`
          : "None",
      ],
      ...sourceBreakdown.slice(0, 10).map((sourceValue) => {
        const source = record(sourceValue);
        return [
          `Source · ${displayText(source.source_slug)}`,
          `${count(source.useful_distinct_agreements)} useful · ${
            count(source.current_clauses)
          } clauses`,
        ];
      }),
    ]));

    summaryFreshness.textContent = `Snapshot generated ${
      date(summary.generated_at)
    }.`;
    const disclosure = record(summary.disclosure);
    const disclosureLines = [
      disclosure.coverage,
      disclosure.observed_vs_generated,
      disclosure.legal_reliance,
    ].filter((value) => typeof value === "string");
    corpusDisclosure.replaceChildren(
      ...disclosureLines.map((line) => element("p", "", line)),
    );
  }

  async function loadDashboard(prefetched = null) {
    statusMessage(workspaceStatus, "Loading the published corpus snapshot…");
    try {
      const payload = prefetched ??
        await requestJson("/api/dashboard", state.token);
      renderDashboard(payload);
      statusMessage(workspaceStatus, "Published snapshot loaded.", "success");
    } catch (error) {
      handleFailure(error, workspaceStatus);
    }
  }

  function resultCard(itemValue) {
    const item = record(itemValue);
    const card = element("article", "result-card");
    const top = element("div", "result-top");
    const headingGroup = element("div");
    const kind = element(
      "span",
      "badge",
      displayText(item.document_kind, "unclassified"),
    );
    const title = element(
      "h3",
      "",
      displayText(item.observed_title, "Untitled agreement"),
    );
    const meta = element("div", "meta");
    append(
      meta,
      element("span", "", displayText(item.source_name, "Unknown source")),
      item.issuer_name ? element("span", "", item.issuer_name) : null,
      item.filing_form
        ? element("span", "", `Form ${displayText(item.filing_form)}`)
        : null,
      item.observed_published_at
        ? element("span", "", date(item.observed_published_at))
        : null,
    );
    append(headingGroup, kind, title, meta);
    const score = Number(item.rank);
    append(
      top,
      headingGroup,
      Number.isFinite(score)
        ? element("span", "muted", `rank ${score.toFixed(3)}`)
        : null,
    );

    const clauseLabel = item.clause_heading
      ? `Clause ${displayText(item.clause_sequence)} · ${
        displayText(item.clause_heading)
      }`
      : `Clause ${displayText(item.clause_sequence)}`;
    const actions = element("div", "result-actions");
    const agreementId = typeof item.agreement_id === "string"
      ? item.agreement_id
      : "";
    if (UUID_PATTERN.test(agreementId)) {
      const inspect = element(
        "button",
        "text-button",
        "Inspect agreement context →",
      );
      inspect.type = "button";
      inspect.addEventListener("click", () => loadAgreement(agreementId));
      actions.append(inspect);
    }
    actions.append(sourceLink(item.source_url));
    append(
      card,
      top,
      element("p", "muted", clauseLabel),
      highlightedExcerpt(item.evidence_excerpt),
      actions,
    );
    return card;
  }

  function renderSearch(payload) {
    const root = record(payload);
    const rows = array(root.results).slice(0, state.limit);
    const pagination = record(root.pagination);
    state.hasMore = pagination.has_more === true;
    previous.disabled = state.offset === 0;
    next.disabled = !state.hasMore;
    results.replaceChildren(
      ...(rows.length ? rows.map(resultCard) : [
        element(
          "p",
          "empty",
          "No published clause evidence matched this query.",
        ),
      ]),
    );
    const start = rows.length ? state.offset + 1 : 0;
    const end = state.offset + rows.length;
    searchStatus.textContent = rows.length
      ? `Showing results ${start}–${end}. Search is evidence retrieval, not a completeness guarantee.`
      : "No results returned. Coverage may be incomplete.";
  }

  async function performSearch() {
    if (!state.token || state.searching) return;
    state.searching = true;
    searchButton.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    searchStatus.textContent = "Searching published clause evidence…";
    try {
      const path = buildSearchPath(state);
      const payload = await requestJson(path, state.token);
      renderSearch(payload);
    } catch (error) {
      handleFailure(error, searchStatus);
    } finally {
      state.searching = false;
      searchButton.disabled = false;
    }
  }

  function section(title) {
    const container = element("section", "detail-section");
    container.append(element("h3", "", title));
    return container;
  }

  function renderClaimEvidence(container, payload) {
    const claim = record(record(payload).data);
    const evidence = array(claim.evidence).slice(0, 100);
    const wrapper = element("div", "claim-evidence");
    append(
      wrapper,
      element(
        "p",
        "generated",
        `Generated claim: ${displayText(claim.generated_statement)}`,
      ),
      evidence.length
        ? null
        : element("p", "muted", "No supporting quote was returned."),
    );
    for (const itemValue of evidence) {
      const item = record(itemValue);
      const quote = element(
        "blockquote",
        "observed-text",
        boundedText(item.observed_quote),
      );
      const source = sourceLink(item.source_url, "Open quoted source ↗");
      append(
        wrapper,
        element(
          "p",
          "muted",
          `${displayText(item.relationship, "evidence")} · ${
            displayText(item.evidence_location, "location unavailable")
          }`,
        ),
        quote,
        source,
      );
    }
    container.replaceChildren(wrapper);
  }

  async function loadClaimEvidence(claimId, container, button) {
    if (!UUID_PATTERN.test(claimId) || !state.token) return;
    button.disabled = true;
    container.replaceChildren(
      element("p", "muted", "Loading supporting evidence…"),
    );
    try {
      const payload = await requestJson(`/api/claims/${claimId}`, state.token);
      renderClaimEvidence(container, payload);
    } catch (error) {
      container.replaceChildren(
        element(
          "p",
          "status error",
          error instanceof Error
            ? error.message
            : "Evidence could not be loaded.",
        ),
      );
    } finally {
      button.disabled = false;
    }
  }

  function renderAgreement(payload) {
    const data = record(record(payload).data);
    const agreement = record(data.agreement);
    const source = record(data.source);
    const fragment = document.createDocumentFragment();
    fragment.append(
      element(
        "span",
        "badge",
        displayText(agreement.document_kind, "unclassified"),
      ),
      element(
        "h2",
        "detail-heading",
        displayText(agreement.observed_title, "Untitled agreement"),
      ),
      dataList([
        ["Execution date", displayText(agreement.observed_execution_date)],
        ["Effective date", displayText(agreement.observed_effective_date)],
        [
          "Extraction",
          `${displayText(agreement.extraction_method)} · confidence ${
            displayText(agreement.extraction_confidence)
          }`,
        ],
        ["Artifact SHA-256", displayText(agreement.artifact_sha256)],
        ["Clauses", count(data.clause_count)],
      ]),
    );
    const sourceUrl = sourceLink(
      source.observed_canonical_url,
      "Open authoritative source ↗",
    );
    if (sourceUrl) {
      const sourceParagraph = element("p");
      sourceParagraph.append(sourceUrl);
      fragment.append(sourceParagraph);
    }
    if (source.generated_policy_summary) {
      const policy = element("div", "generated");
      append(
        policy,
        element("strong", "", "Generated source-policy summary"),
        element("p", "", boundedText(source.generated_policy_summary, 4_000)),
      );
      fragment.append(policy);
    }
    if (source.human_review_required === true) {
      fragment.append(
        element(
          "p",
          "status warning",
          `Source-use status: ${
            displayText(source.policy_assessment_status, "automated assessment")
          }; qualified human/legal review remains pending.`,
        ),
      );
    }

    const parties = array(data.parties).slice(0, 100);
    if (parties.length) {
      const partySection = section("Parties");
      for (const partyValue of parties) {
        const party = record(partyValue);
        const card = element("div", "party");
        append(
          card,
          element(
            "strong",
            "",
            displayText(party.observed_name, "Unnamed party"),
          ),
          element(
            "p",
            "muted",
            `Observed role: ${displayText(party.observed_role)}`,
          ),
          party.generated_role
            ? element(
              "p",
              "generated",
              `Generated role: ${displayText(party.generated_role)} · ${
                displayText(party.resolution_status)
              }`,
            )
            : null,
        );
        partySection.append(card);
      }
      fragment.append(partySection);
    }

    const clauses = array(data.clauses).slice(0, 40);
    const clauseSection = section("Observed clauses");
    if (data.truncated === true) {
      clauseSection.append(
        element(
          "p",
          "muted",
          "Only the first 40 clauses are shown in this bounded view.",
        ),
      );
    }
    for (const clauseValue of clauses) {
      const clause = record(clauseValue);
      const card = element("article", "clause");
      const heading = clause.heading
        ? `${displayText(clause.sequence)} · ${displayText(clause.heading)}`
        : `Clause ${displayText(clause.sequence)}`;
      append(
        card,
        element("h3", "", heading),
        element(
          "p",
          "muted",
          displayText(clause.evidence_location, "Location unavailable"),
        ),
        element("p", "observed-text", boundedText(clause.observed_text)),
      );
      if (clause.generated_summary || clause.generated_clause_type) {
        const generated = element("div", "generated");
        append(
          generated,
          element("strong", "", "Generated interpretation"),
          element(
            "p",
            "",
            `${displayText(clause.generated_clause_type, "unclassified")} · ${
              displayText(clause.generated_summary, "No summary")
            }`,
          ),
        );
        card.append(generated);
      }
      const definitions = array(clause.defined_terms).slice(0, 50);
      for (const definitionValue of definitions) {
        const definition = record(definitionValue);
        card.append(
          element(
            "p",
            "observed-text",
            `Defined term “${displayText(definition.term)}”: ${
              boundedText(definition.definition, 8_000)
            }`,
          ),
        );
      }
      clauseSection.append(card);
    }
    if (!clauses.length) {
      clauseSection.append(element("p", "muted", "No clauses were returned."));
    }
    fragment.append(clauseSection);

    const relationships = array(data.relationships).slice(0, 100);
    if (relationships.length) {
      const relationshipSection = section("Related documents");
      for (const relationshipValue of relationships) {
        const relationship = record(relationshipValue);
        relationshipSection.append(
          element(
            "p",
            "relationship",
            `${displayText(relationship.relationship_type)} · ${
              displayText(relationship.direction)
            } · ${
              displayText(
                relationship.observed_reference,
                "reference unavailable",
              )
            } · basis ${displayText(relationship.basis)} · confidence ${
              displayText(relationship.confidence)
            }`,
          ),
        );
      }
      fragment.append(relationshipSection);
    }

    const claims = array(data.published_claims).slice(0, 100);
    if (claims.length) {
      const claimSection = section("Published generated claims");
      claimSection.append(
        element(
          "p",
          "muted",
          "Claims are interpretations. Inspect the observed quotations before relying on them.",
        ),
      );
      for (const claimValue of claims) {
        const claim = record(claimValue);
        const card = element("article", "claim");
        append(
          card,
          element("p", "generated", displayText(claim.generated_statement)),
          element(
            "p",
            "muted",
            `Support: ${displayText(claim.support_status)} · confidence ${
              displayText(claim.confidence)
            } · reviewed ${date(claim.reviewed_at)}`,
          ),
        );
        const evidenceContainer = element("div");
        const claimId = typeof claim.id === "string" ? claim.id : "";
        if (UUID_PATTERN.test(claimId)) {
          const evidenceButton = element(
            "button",
            "text-button",
            "Inspect supporting quotations →",
          );
          evidenceButton.type = "button";
          evidenceButton.addEventListener(
            "click",
            () => loadClaimEvidence(claimId, evidenceContainer, evidenceButton),
          );
          card.append(evidenceButton, evidenceContainer);
        }
        claimSection.append(card);
      }
      fragment.append(claimSection);
    }

    detailBody.replaceChildren(fragment);
  }

  async function loadAgreement(agreementId) {
    if (!state.token) return;
    detailBody.replaceChildren(
      element("p", "muted", "Loading agreement evidence…"),
    );
    openDialog(detailDialog);
    try {
      const payload = await requestJson(
        buildAgreementPath(agreementId),
        state.token,
      );
      renderAgreement(payload);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        signOut(
          "The token was not accepted or has changed. Enter the current explorer token.",
        );
        return;
      }
      detailBody.replaceChildren(
        element(
          "p",
          "status error",
          error instanceof Error
            ? error.message
            : "Agreement evidence could not be loaded.",
        ),
      );
    }
  }

  tokenForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const token = normalizeToken(tokenInput.value);
    if (!token) {
      statusMessage(
        authStatus,
        "Use a token of 24–512 characters with no spaces.",
        "error",
      );
      return;
    }
    connectButton.disabled = true;
    statusMessage(authStatus, "Verifying the token with the protected API…");
    try {
      const payload = await requestJson("/api/dashboard", token);
      state.token = token;
      tokenInput.value = "";
      showWorkspace();
      renderDashboard(payload);
      statusMessage(
        workspaceStatus,
        "Published snapshot loaded. The token remains only in page memory and will be cleared on reload.",
        "success",
      );
    } catch (error) {
      handleFailure(error, authStatus);
    } finally {
      connectButton.disabled = false;
    }
  });

  clearButton.addEventListener("click", () => signOut());
  byId("refresh-summary").addEventListener("click", () => loadDashboard());
  byId("close-dialog").addEventListener(
    "click",
    () => closeDialog(detailDialog),
  );
  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) closeDialog(detailDialog);
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = queryInput.value.trim();
    state.kind = kindInput.value;
    state.source = sourceInput.value.trim().toLowerCase();
    state.offset = 0;
    performSearch();
  });
  previous.addEventListener("click", () => {
    state.offset = Math.max(0, state.offset - state.limit);
    performSearch();
  });
  next.addEventListener("click", () => {
    if (!state.hasMore) return;
    state.offset = Math.min(1_000, state.offset + state.limit);
    performSearch();
  });
  for (const button of document.querySelectorAll("[data-query]")) {
    button.addEventListener("click", () => {
      queryInput.value = button.getAttribute("data-query") ?? "";
      searchForm.requestSubmit();
    });
  }

  // Back-forward cache can preserve JavaScript memory across navigation.
  // Scrub the bearer before the page is cached and reset the UI if restored.
  window.addEventListener("pagehide", () => {
    state.token = null;
    tokenInput.value = "";
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && !state.token) {
      signOut("The token was cleared when this page was left.");
    }
  });

  tokenInput.focus();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
}
