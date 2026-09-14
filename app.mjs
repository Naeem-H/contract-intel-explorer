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
export const COMPARISON_MIN_ITEMS = 2;
export const COMPARISON_MAX_ITEMS = 4;
export const COMPARISON_CONTEXT_CLAUSES = 5;
export const CITATION_TEXT_MAX_CHARS = 100_000;

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
  if (
    pathname === "/api/search" || pathname === "/api/parties" ||
    pathname === "/api/party-clauses"
  ) {
    const allowed = new Set([
      "q",
      "party",
      "limit",
      "offset",
      "kind",
      "source",
    ]);
    if (
      pathname !== "/api/party-clauses" && url.searchParams.has("party")
    ) return false;
    return [...url.searchParams.keys()].every((key) => allowed.has(key));
  }
  const match = pathname.match(/^\/api\/(agreements|claims)\/([^/]+)$/);
  if (!match || !UUID_PATTERN.test(match[2])) return false;
  if (match[1] === "claims") return url.search === "";
  const allowed = new Set(["clauses", "clause"]);
  if (![...url.searchParams.keys()].every((key) => allowed.has(key))) {
    return false;
  }
  if (
    url.searchParams.getAll("clauses").length > 1 ||
    url.searchParams.getAll("clause").length > 1
  ) return false;
  const clauseLimit = url.searchParams.get("clauses");
  if (
    clauseLimit !== null &&
    (!/^[1-9]\d*$/.test(clauseLimit) || Number(clauseLimit) > 40)
  ) return false;
  const anchorClauseId = url.searchParams.get("clause");
  return anchorClauseId === null || UUID_PATTERN.test(anchorClauseId);
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

export function buildPartySearchPath(input) {
  return buildSearchPath(input).replace(/^\/api\/search\?/, "/api/parties?");
}

export function buildPartyClauseSearchPath({ party, ...input }) {
  const partyPath = buildPartySearchPath({ query: party });
  const normalizedParty = new URL(partyPath, "https://route.invalid")
    .searchParams.get("q");
  if (!normalizedParty) throw new TypeError("Party search term is invalid");
  const clausePath = buildSearchPath(input);
  const params = new URL(clausePath, "https://route.invalid").searchParams;
  params.set("party", normalizedParty);
  return `/api/party-clauses?${params.toString()}`;
}

export function buildAgreementPath(
  agreementId,
  clauseLimit = 40,
  anchorClauseId = null,
) {
  if (typeof agreementId !== "string" || !UUID_PATTERN.test(agreementId)) {
    throw new TypeError("Agreement identifier is invalid");
  }
  if (!Number.isInteger(clauseLimit) || clauseLimit < 1 || clauseLimit > 40) {
    throw new TypeError("Clause limit is outside the allowed range");
  }
  if (
    anchorClauseId !== null &&
    (typeof anchorClauseId !== "string" ||
      !UUID_PATTERN.test(anchorClauseId))
  ) {
    throw new TypeError("Anchor clause identifier is invalid");
  }
  const params = new URLSearchParams({ clauses: String(clauseLimit) });
  if (anchorClauseId) params.set("clause", anchorClauseId);
  return `/api/agreements/${agreementId}?${params.toString()}`;
}

export function comparisonSelectionKey(value) {
  const item = record(value);
  const agreementId = typeof item.agreement_id === "string"
    ? item.agreement_id
    : "";
  const clauseId = typeof item.clause_id === "string" ? item.clause_id : "";
  return UUID_PATTERN.test(agreementId) && UUID_PATTERN.test(clauseId)
    ? `${agreementId}:${clauseId}`
    : null;
}

export function comparisonAccessibleLabel(value) {
  const item = record(value);
  const sequence = displayText(item.clause_sequence, "unknown sequence");
  const heading = displayText(item.clause_heading, "untitled clause");
  const agreement = displayText(item.observed_title, "untitled agreement");
  const source = displayText(item.source_name, "unknown source");
  return `Select clause ${sequence} · ${heading} from ${agreement} · ${source} for comparison`;
}

export function textBasisPresentation(value) {
  if (value === "observed") {
    return {
      key: "observed",
      label: "Observed source text",
      className: "basis-observed",
    };
  }
  if (value === "reviewed") {
    return {
      key: "reviewed",
      label: "Human-reviewed transcription",
      className: "basis-reviewed",
    };
  }
  if (value === "generated") {
    return {
      key: "generated",
      label: "Generated OCR transcription",
      className: "basis-generated",
    };
  }
  return {
    key: "unknown",
    label: "Unknown text basis",
    className: "basis-unknown",
  };
}

export function partyCapturePresentation(value) {
  if (value === "source_structured_metadata") {
    return "Observed structured source party";
  }
  if (value === "source_filing_metadata") {
    return "Observed filing entity";
  }
  if (value === "generated_extraction_with_observed_quote") {
    return "Generated extraction from observed wording";
  }
  return "Party capture method unavailable";
}

export function formatEvidenceLocation(value) {
  const clause = record(value);
  if (
    typeof clause.evidence_location === "string" &&
    clause.evidence_location.trim()
  ) return clause.evidence_location.trim();

  const location = record(clause.evidence_location);
  const parts = [];
  if (
    typeof location.archive_member_name === "string" &&
    location.archive_member_name
  ) {
    parts.push(`Archive member ${location.archive_member_name}`);
  }
  if (
    typeof location.archive_member_sha256 === "string" &&
    /^[0-9a-f]{64}$/.test(location.archive_member_sha256)
  ) parts.push(`member SHA-256 ${location.archive_member_sha256}`);

  const pageStart = Number.isSafeInteger(clause.page_start)
    ? clause.page_start
    : Number.isSafeInteger(location.page_start)
    ? location.page_start
    : null;
  const pageEnd = Number.isSafeInteger(clause.page_end)
    ? clause.page_end
    : Number.isSafeInteger(location.page_end)
    ? location.page_end
    : null;
  if (pageStart !== null && pageStart > 0) {
    parts.push(
      `Page ${pageStart}${
        pageEnd !== null && pageEnd !== pageStart ? `–${pageEnd}` : ""
      }`,
    );
  }

  const charStart = Number.isSafeInteger(location.character_start)
    ? location.character_start
    : Number.isSafeInteger(clause.char_start)
    ? clause.char_start
    : null;
  const charEnd = Number.isSafeInteger(location.character_end)
    ? location.character_end
    : Number.isSafeInteger(clause.char_end)
    ? clause.char_end
    : null;
  if (charStart !== null && charEnd !== null && charEnd > charStart) {
    parts.push(`Characters ${charStart}–${charEnd}`);
  }
  return parts.join(" · ") || "Location unavailable";
}

export function comparisonEvidence(payload, expectedClauseId) {
  if (
    typeof expectedClauseId !== "string" || !UUID_PATTERN.test(expectedClauseId)
  ) {
    throw new TypeError("Comparison clause identifier is invalid");
  }
  const data = record(record(payload).data);
  if (data.anchor_clause_id !== expectedClauseId) {
    throw new ApiError(
      "The bounded response did not identify the selected clause.",
    );
  }
  const clauses = array(data.clauses)
    .slice(0, COMPARISON_CONTEXT_CLAUSES)
    .map(record);
  const anchor = clauses.find((clause) => clause.id === expectedClauseId);
  if (!anchor || typeof anchor.observed_text !== "string") {
    throw new ApiError("The selected clause wording was not returned.");
  }
  return {
    agreement: record(data.agreement),
    source: record(data.source),
    clauseWindow: record(data.clause_window),
    anchor,
    context: clauses.filter((clause) => clause.id !== expectedClauseId),
    agreementDateEvidence: array(data.agreement_date_evidence)
      .slice(0, 20)
      .map(record),
    truncated: data.truncated === true,
  };
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

function citationText(value, maximum = CITATION_TEXT_MAX_CHARS) {
  if (typeof value !== "string") return { text: null, truncated: false };
  return value.length > maximum
    ? { text: value.slice(0, maximum), truncated: true }
    : { text: value, truncated: false };
}

function citationClause(value) {
  const clause = record(value);
  const observed = citationText(clause.observed_text);
  return {
    id: typeof clause.id === "string" ? clause.id : null,
    sequence: Number.isSafeInteger(clause.sequence) ? clause.sequence : null,
    label: typeof clause.label === "string" ? clause.label : null,
    heading: typeof clause.heading === "string" ? clause.heading : null,
    text_basis: typeof clause.text_basis === "string"
      ? clause.text_basis
      : null,
    observed_text: observed.text,
    observed_text_truncated: observed.truncated,
    observed_text_sha256: typeof clause.observed_text_sha256 === "string"
      ? clause.observed_text_sha256
      : null,
    location: {
      display: formatEvidenceLocation(clause),
      page_start: Number.isSafeInteger(clause.page_start)
        ? clause.page_start
        : null,
      page_end: Number.isSafeInteger(clause.page_end) ? clause.page_end : null,
      char_start: Number.isSafeInteger(clause.char_start)
        ? clause.char_start
        : null,
      char_end: Number.isSafeInteger(clause.char_end) ? clause.char_end : null,
      evidence_location: isRecord(clause.evidence_location)
        ? clause.evidence_location
        : null,
    },
    generated_interpretation: {
      clause_type: typeof clause.generated_clause_type === "string"
        ? clause.generated_clause_type
        : null,
      summary: typeof clause.generated_summary === "string"
        ? clause.generated_summary
        : null,
      themes: array(clause.themes).slice(0, 50).map(record),
    },
  };
}

export function buildCitationManifest({
  query = "",
  kind = "",
  source = "",
  entries = [],
  generatedAt = new Date().toISOString(),
} = {}) {
  if (!Array.isArray(entries) || entries.length < 1 || entries.length > 4) {
    throw new TypeError("Citation export requires 1–4 evidence entries");
  }
  const timestamp = new Date(generatedAt);
  if (Number.isNaN(timestamp.valueOf())) {
    throw new TypeError("Citation export timestamp is invalid");
  }
  const normalizedQuery = typeof query === "string" ? query.trim() : "";
  const normalizedKind = typeof kind === "string" && DOCUMENT_KINDS.has(kind)
    ? kind
    : null;
  const normalizedSource = typeof source === "string" &&
      SOURCE_PATTERN.test(source.trim().toLowerCase())
    ? source.trim().toLowerCase()
    : null;

  const citations = entries.map((entryValue, index) => {
    const entry = record(entryValue);
    const selection = record(entry.selection);
    const evidence = record(entry.evidence);
    const selectionKey = comparisonSelectionKey(selection);
    if (
      !selectionKey || evidence.anchor?.id !== selection.clause_id ||
      typeof evidence.anchor?.observed_text !== "string"
    ) {
      throw new TypeError(
        "Citation evidence does not match its selected clause",
      );
    }
    const agreement = record(evidence.agreement);
    if (agreement.id !== selection.agreement_id) {
      throw new TypeError(
        "Citation evidence does not match its selected agreement",
      );
    }
    const sourceRecord = record(evidence.source);
    const context = array(evidence.context).slice(
      0,
      COMPARISON_CONTEXT_CLAUSES - 1,
    );
    return {
      citation_number: index + 1,
      retrieval: {
        rank: Number.isFinite(Number(selection.rank))
          ? Number(selection.rank)
          : null,
        observed_published_at:
          typeof selection.observed_published_at === "string"
            ? selection.observed_published_at
            : null,
      },
      source: {
        slug: typeof sourceRecord.slug === "string" ? sourceRecord.slug : null,
        name: typeof sourceRecord.observed_name === "string"
          ? sourceRecord.observed_name
          : (typeof selection.source_name === "string"
            ? selection.source_name
            : null),
        publisher: typeof sourceRecord.observed_publisher === "string"
          ? sourceRecord.observed_publisher
          : null,
        external_id: typeof sourceRecord.observed_external_id === "string"
          ? sourceRecord.observed_external_id
          : null,
        canonical_url: safeExternalUrl(
          sourceRecord.observed_canonical_url || selection.source_url,
        ),
        terms_url: safeExternalUrl(sourceRecord.observed_terms_url),
        policy_assessment_status:
          typeof sourceRecord.policy_assessment_status === "string"
            ? sourceRecord.policy_assessment_status
            : null,
        human_review_required: sourceRecord.human_review_required === true
          ? true
          : sourceRecord.human_review_required === false
          ? false
          : null,
      },
      agreement: {
        id: selection.agreement_id,
        title: typeof agreement.observed_title === "string"
          ? agreement.observed_title
          : (typeof selection.observed_title === "string"
            ? selection.observed_title
            : null),
        document_kind: typeof agreement.document_kind === "string"
          ? agreement.document_kind
          : (typeof selection.document_kind === "string"
            ? selection.document_kind
            : null),
        document_kind_basis: typeof agreement.document_kind_basis === "string"
          ? agreement.document_kind_basis
          : null,
        artifact_sha256: typeof agreement.artifact_sha256 === "string"
          ? agreement.artifact_sha256
          : null,
        extraction_method: typeof agreement.extraction_method === "string"
          ? agreement.extraction_method
          : null,
        extraction_version: typeof agreement.extraction_version === "string"
          ? agreement.extraction_version
          : null,
        text_basis: typeof agreement.text_basis === "string"
          ? agreement.text_basis
          : null,
        dates: {
          observed_execution_date: agreement.observed_execution_date ?? null,
          observed_effective_date: agreement.observed_effective_date ?? null,
          observed_termination_date: agreement.observed_termination_date ??
            null,
          selection_provenance: record(agreement.agreement_date_selections),
          evidence: array(evidence.agreementDateEvidence).slice(0, 20),
        },
      },
      matched_clause: citationClause(evidence.anchor),
      bounded_context: {
        is_complete_agreement: evidence.truncated !== true,
        response_truncated: evidence.truncated === true,
        window: record(evidence.clauseWindow),
        neighboring_clauses: context.map(citationClause),
      },
    };
  });

  return {
    schema: "esheria.contract-citations.v1",
    generated_at: timestamp.toISOString(),
    retrieval_scope: {
      query: normalizedQuery || null,
      document_kind: normalizedKind,
      source: normalizedSource,
      selected_count: citations.length,
    },
    limitations: [
      "This export contains only the selected published evidence and bounded context; it is not a representative market sample.",
      "Observed wording is evidence. Generated classifications, themes, summaries and date types are interpretations, not source facts.",
      "Verify the recorded source, completeness, amendments and governing law before legal or commercial reliance.",
    ],
    citations,
  };
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

export function agreementDatePresentation(agreement, dateType, label) {
  const selections = record(agreement.agreement_date_selections);
  const selection = record(selections[dateType]);
  return {
    label: selection.basis === "generated"
      ? `Generated ${label} candidate`
      : `Observed ${label}`,
    value: agreement[`observed_${dateType}_date`],
  };
}

function boundedText(value, maximum = 24_000) {
  const text = displayText(value, "");
  return text.length > maximum
    ? `${text.slice(0, maximum)}\n… [display truncated]`
    : text;
}

function referenceResolutionLabel(value) {
  const labels = {
    unattempted: "Target not resolved yet",
    resolved: "Exact local target resolved",
    unresolved_no_match: "Unresolved: no exact local target",
    unresolved_ambiguous: "Unresolved: multiple exact local targets",
    unresolved_plural: "Unresolved: plural reference",
    unresolved_subsection: "Unresolved: subsection reference was truncated",
    unresolved_unsupported: "Unresolved: unsupported reference form",
  };
  return labels[value] || "Target resolution unavailable";
}

function referenceResolutionProvenance(value) {
  if (value === "observed") return "Observed target link";
  if (value === "reviewed") return "Human-reviewed target link";
  if (value === "generated") return "Generated target resolution";
  return "Target resolution";
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
    clauseParty: "",
    kind: "",
    source: "",
    offset: 0,
    limit: 20,
    hasMore: false,
    searching: false,
    comparing: false,
    comparisonSelection: new Map(),
    comparisonEvidence: [],
    partyQuery: "",
    partyKind: "",
    partySource: "",
    partyOffset: 0,
    partyLimit: 20,
    partyHasMore: false,
    partySearching: false,
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
  const guideStatus = byId("guide-status");
  const partySearchForm = byId("party-search-form");
  const partyQueryInput = byId("party-query");
  const partyKindInput = byId("party-kind");
  const partySourceInput = byId("party-source");
  const partySearchButton = byId("party-search-submit");
  const partySearchStatus = byId("party-search-status");
  const partyResults = byId("party-results");
  const partyPrevious = byId("party-previous");
  const partyNext = byId("party-next");
  const searchForm = byId("search-form");
  const queryInput = byId("query");
  const clausePartyInput = byId("clause-party");
  const kindInput = byId("kind");
  const sourceInput = byId("source");
  const searchButton = byId("search-submit");
  const searchStatus = byId("search-status");
  const results = byId("results");
  const previous = byId("previous");
  const next = byId("next");
  const comparisonStatus = byId("comparison-status");
  const clearComparisonButton = byId("clear-comparison");
  const openComparisonButton = byId("open-comparison");
  const exportComparisonButton = byId("export-comparison");
  const exportStatus = byId("comparison-export-status");
  const detailDialog = byId("detail-dialog");
  const detailBody = byId("detail-body");
  const comparisonDialog = byId("comparison-dialog");
  const comparisonBody = byId("comparison-body");
  const guideButtons = [
    ...document.querySelectorAll("[data-guide][data-query]"),
  ];

  function syncGuideSelection(query) {
    let selectedGuide = "";
    for (const button of guideButtons) {
      const selected = button.getAttribute("data-query") === query;
      button.setAttribute("aria-pressed", String(selected));
      if (selected) selectedGuide = button.getAttribute("data-guide") ?? "";
    }
    if (selectedGuide) {
      guideStatus.textContent =
        `${selectedGuide} starter selected. Filters below still apply; verify every result against its observed wording and recorded source.`;
      return;
    }
    guideStatus.textContent = query
      ? "Custom search selected. Verify every result against its observed wording and recorded source."
      : "Choose a starter or enter your own search below. Document and source filters still apply.";
  }

  function showWorkspace() {
    authView.hidden = true;
    workspace.hidden = false;
    clearButton.hidden = false;
  }

  function signOut(message = "The token was cleared from this tab.") {
    state.token = null;
    tokenForm.reset();
    partySearchForm.reset();
    searchForm.reset();
    summaryCards.replaceChildren();
    kindBreakdown.replaceChildren();
    operations.replaceChildren();
    corpusDisclosure.replaceChildren();
    state.comparisonSelection.clear();
    state.comparisonEvidence = [];
    state.comparing = false;
    state.partyQuery = "";
    state.partyKind = "";
    state.partySource = "";
    state.partyOffset = 0;
    state.partyHasMore = false;
    state.partySearching = false;
    state.clauseParty = "";
    partyPrevious.disabled = true;
    partyNext.disabled = true;
    partySearchStatus.textContent =
      "Enter an observed buyer, supplier, filing entity, or stated party name.";
    syncGuideSelection("");
    results.replaceChildren(
      element("p", "empty", "Sign in to search published evidence."),
    );
    partyResults.replaceChildren();
    detailBody.replaceChildren();
    comparisonBody.replaceChildren();
    exportStatus.textContent = "";
    closeDialog(detailDialog);
    closeDialog(comparisonDialog);
    updateComparisonControls();
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
    const partySummary = record(root.party_summary);

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
        "Searchable party observations",
        `${count(partySummary.searchable_party_observations)} across ${
          count(partySummary.searchable_agreements)
        } agreements`,
      ],
      [
        "Distinct observed party names",
        count(partySummary.distinct_observed_names),
      ],
      [
        "Low-specificity party names",
        count(partySummary.low_specificity_name_observations),
      ],
      [
        "Average extraction confidence",
        displayText(quality.average_current_extraction_confidence),
      ],
      [
        "Write-guarded clause offsets",
        `${count(evidenceQuality.write_guarded_clauses_with_exact_offsets)} / ${
          count(evidenceQuality.current_clauses)
        }`,
      ],
      [
        "Evidence checkpoint",
        evidenceQuality.integrity_passed === true
          ? "Passed (trigger-backed)"
          : evidenceQuality.audit_stale === true
          ? "Checkpoint or full audit stale"
          : "Needs review",
      ],
      [
        "Last fast checkpoint",
        date(evidenceQuality.checkpointed_at),
      ],
      [
        "Last full SHA audit",
        date(evidenceQuality.full_audited_at || evidenceQuality.audited_at),
      ],
      [
        "Full-audit clause coverage",
        `${count(evidenceQuality.baseline_full_clause_hash_matches)} / ${
          count(evidenceQuality.baseline_full_current_clauses)
        }`,
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
      partySummary.measurement,
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

  function updateComparisonControls(message = null, kind = "") {
    const selected = state.comparisonSelection.size;
    clearComparisonButton.disabled = selected === 0 || state.comparing;
    openComparisonButton.disabled = selected < COMPARISON_MIN_ITEMS ||
      selected > COMPARISON_MAX_ITEMS || state.comparing;
    exportComparisonButton.disabled = state.comparing ||
      state.comparisonEvidence.length === 0;
    comparisonStatus.className = kind === "error" ? "status error" : "muted";
    comparisonStatus.textContent = message ??
      (selected === 0
        ? "Select 2–4 results to compare recorded wording and bounded context."
        : selected === 1
        ? "1 result selected. Select at least one more result."
        : selected === COMPARISON_MAX_ITEMS
        ? "4 results selected (maximum). Ready to compare."
        : `${selected} results selected. Ready to compare.`);

    for (const input of results.querySelectorAll(".compare-input")) {
      const key = input.getAttribute("data-comparison-key") ?? "";
      const selectedHere = state.comparisonSelection.has(key);
      input.checked = selectedHere;
      input.disabled = state.comparing ||
        (selected >= COMPARISON_MAX_ITEMS && !selectedHere);
      input.title = input.disabled && !selectedHere
        ? "The comparison already has four results"
        : "";
    }
  }

  function clearComparison() {
    state.comparisonSelection.clear();
    state.comparisonEvidence = [];
    comparisonBody.replaceChildren();
    exportStatus.textContent = "";
    if (comparisonDialog.hasAttribute("open")) closeDialog(comparisonDialog);
    updateComparisonControls();
  }

  function toggleComparison(item, input) {
    const key = comparisonSelectionKey(item);
    if (!key) return;
    if (input.checked) {
      if (state.comparisonSelection.size >= COMPARISON_MAX_ITEMS) {
        input.checked = false;
        updateComparisonControls(
          "A comparison can contain at most four results. Remove one before adding another.",
          "error",
        );
        return;
      }
      state.comparisonSelection.set(key, item);
    } else {
      state.comparisonSelection.delete(key);
    }
    state.comparisonEvidence = [];
    exportStatus.textContent =
      "Selection changed; compare again before exporting.";
    updateComparisonControls();
  }

  function comparisonChoice(item, key) {
    const label = element("label", "compare-choice");
    const input = element("input", "compare-input");
    input.type = "checkbox";
    input.checked = state.comparisonSelection.has(key);
    input.setAttribute("data-comparison-key", key);
    input.setAttribute(
      "aria-label",
      comparisonAccessibleLabel(item),
    );
    input.addEventListener("change", () => toggleComparison(item, input));
    append(label, input, element("span", "", "Select for comparison"));
    return label;
  }

  function clauseHeading(clause) {
    const prefix = clause.label
      ? `${displayText(clause.label)} · `
      : `Clause ${displayText(clause.sequence)} · `;
    return `${prefix}${displayText(clause.heading, "Untitled clause")}`;
  }

  function clauseLocation(clause) {
    return formatEvidenceLocation(clause);
  }

  function comparisonColumn(selection, evidence, position) {
    const agreement = evidence.agreement;
    const source = evidence.source;
    const clause = evidence.anchor;
    const basis = textBasisPresentation(
      clause.text_basis ?? agreement.text_basis,
    );
    const executionDate = agreementDatePresentation(
      agreement,
      "execution",
      "execution date",
    );
    const column = element("article", "comparison-column");
    column.setAttribute("aria-labelledby", `comparison-clause-${position}`);
    append(
      column,
      element(
        "span",
        `badge ${basis.className}`,
        `${basis.label} · clause evidence`,
      ),
      element(
        "h3",
        "",
        displayText(agreement.observed_title, selection.observed_title),
      ),
      element(
        "p",
        "muted",
        `${executionDate.label} · ${
          displayText(executionDate.value, "not stated")
        }`,
      ),
    );
    const classification = element("section", "generated");
    append(
      classification,
      element(
        "strong",
        "",
        "Generated document classification · not source wording",
      ),
      element(
        "p",
        "",
        `Class: ${
          displayText(agreement.document_kind, selection.document_kind)
        } · recorded basis: ${
          displayText(agreement.document_kind_basis, "generated")
        }`,
      ),
    );
    column.append(classification);

    const provenance = element("section", "comparison-source");
    const humanReview = source.human_review_required === true
      ? "Required / pending"
      : source.human_review_required === false
      ? "Not required in recorded assessment"
      : "Not stated";
    const redistribution = source.redistribution_allowed === true
      ? "Allowed in recorded assessment"
      : source.redistribution_allowed === false
      ? "Not allowed in recorded assessment"
      : "Not stated";
    append(
      provenance,
      element("h4", "", "Observed source and provenance"),
      dataList([
        ["Source", displayText(source.observed_name, selection.source_name)],
        ["Publisher", displayText(source.observed_publisher, "Not stated")],
        ["Source ID", displayText(source.observed_external_id, "Not stated")],
        ["Artifact SHA-256", displayText(agreement.artifact_sha256)],
      ]),
    );
    const original = sourceLink(
      source.observed_canonical_url || selection.source_url,
      "Open recorded source ↗",
    );
    if (original) provenance.append(original);
    column.append(provenance);

    const sourcePolicy = element("section", "generated");
    append(
      sourcePolicy,
      element(
        "strong",
        "",
        "Source-use assessment · not source wording",
      ),
      dataList([
        [
          "Assessment status",
          displayText(source.policy_assessment_status, "Not stated"),
        ],
        ["Human/legal review", humanReview],
        ["Redistribution", redistribution],
      ]),
    );
    const terms = sourceLink(
      source.observed_terms_url,
      "Open recorded source-use terms ↗",
    );
    if (terms) sourcePolicy.append(terms);
    if (source.human_review_required === true) {
      sourcePolicy.append(
        element(
          "p",
          "source-review",
          "Qualified human/legal review of the source-use terms remains required before relying on reuse permissions.",
        ),
      );
    }
    column.append(sourcePolicy);

    const wording = element("section", "comparison-wording");
    const heading = element(
      "h4",
      "",
      `${basis.label} · ${clauseHeading(clause)}`,
    );
    heading.id = `comparison-clause-${position}`;
    append(
      wording,
      heading,
      element("p", "muted", clauseLocation(clause)),
      element("p", "observed-text", displayText(clause.observed_text)),
      element(
        "p",
        "muted",
        `Text SHA-256 ${displayText(clause.observed_text_sha256)}`,
      ),
    );
    column.append(wording);

    if (clause.generated_clause_type || clause.generated_summary) {
      const generated = element("section", "generated");
      append(
        generated,
        element("strong", "", "Generated labels · not source wording"),
        clause.generated_clause_type
          ? element(
            "p",
            "",
            `Clause type: ${displayText(clause.generated_clause_type)}`,
          )
          : null,
        clause.generated_summary
          ? element("p", "", boundedText(clause.generated_summary, 4_000))
          : null,
      );
      column.append(generated);
    }

    const context = element("details", "comparison-context");
    const window = evidence.clauseWindow;
    const first = displayText(window.first_sequence, "?");
    const last = displayText(window.last_sequence, "?");
    context.append(
      element(
        "summary",
        "",
        `Bounded context · clauses ${first}–${last}`,
      ),
      element(
        "p",
        "muted",
        evidence.truncated
          ? "Surrounding clauses are shown below with their recorded text basis. This is not the complete agreement."
          : "Surrounding clauses are shown below with their recorded text basis.",
      ),
    );
    for (const nearby of evidence.context) {
      const neighbor = element("article", "context-clause");
      const neighborBasis = textBasisPresentation(
        nearby.text_basis ?? agreement.text_basis,
      );
      const neighborSequence = Number(nearby.sequence);
      const anchorSequence = Number(clause.sequence);
      const relation = Number.isFinite(neighborSequence) &&
          Number.isFinite(anchorSequence)
        ? neighborSequence < anchorSequence
          ? "Before matched clause"
          : "After matched clause"
        : "Surrounding clause";
      append(
        neighbor,
        element(
          "span",
          `badge ${neighborBasis.className}`,
          `${relation} · ${neighborBasis.label}`,
        ),
        element("h4", "", clauseHeading(nearby)),
        element("p", "muted", clauseLocation(nearby)),
        element("p", "observed-text", displayText(nearby.observed_text)),
      );
      context.append(neighbor);
    }
    if (!evidence.context.length) {
      context.append(
        element("p", "muted", "No surrounding clauses were returned."),
      );
    }
    column.append(context);
    return column;
  }

  async function compareSelected() {
    const selected = [...state.comparisonSelection.values()];
    if (
      !state.token || state.comparing ||
      selected.length < COMPARISON_MIN_ITEMS ||
      selected.length > COMPARISON_MAX_ITEMS
    ) return;

    state.comparing = true;
    state.comparisonEvidence = [];
    exportStatus.textContent = "";
    updateComparisonControls("Loading bounded source context…");
    const loading = element(
      "p",
      "muted",
      "Loading selected clause evidence…",
    );
    loading.setAttribute("role", "status");
    comparisonBody.replaceChildren(loading);
    openDialog(comparisonDialog);
    const token = state.token;
    const settled = await Promise.allSettled(selected.map(async (item) => {
      const payload = await requestJson(
        buildAgreementPath(
          item.agreement_id,
          COMPARISON_CONTEXT_CLAUSES,
          item.clause_id,
        ),
        token,
      );
      return comparisonEvidence(payload, item.clause_id);
    }));

    if (state.token !== token) {
      state.comparing = false;
      return;
    }

    const unauthorized = settled.find((result) =>
      result.status === "rejected" && result.reason instanceof ApiError &&
      result.reason.status === 401
    );
    if (unauthorized) {
      state.comparing = false;
      signOut(
        "The token was not accepted or has changed. Enter the current explorer token.",
      );
      return;
    }

    const grid = element("div", "comparison-grid");
    grid.tabIndex = 0;
    grid.setAttribute("aria-label", "Side-by-side precedent clauses");
    const loadedEntries = [];
    settled.forEach((result, index) => {
      if (result.status === "fulfilled") {
        loadedEntries.push({
          selection: selected[index],
          evidence: result.value,
        });
        grid.append(comparisonColumn(selected[index], result.value, index));
      } else {
        const error = element("article", "comparison-column");
        append(
          error,
          element("h3", "", displayText(selected[index].clause_heading)),
          element(
            "p",
            "status error",
            result.reason instanceof Error
              ? result.reason.message
              : "This precedent could not be loaded.",
          ),
        );
        grid.append(error);
      }
    });
    comparisonBody.replaceChildren(
      element(
        "p",
        "comparison-note",
        "Each wording sample shows its recorded text basis and provenance. Generated labels are isolated and marked; the context is deliberately bounded.",
      ),
      element(
        "p",
        "comparison-scope",
        `Retrieval scope: ${state.query || "unspecified query"} · ${
          state.kind || "all document classes"
        } · ${
          state.source || "all published sources"
        }. This selected set is not a representative market sample.`,
      ),
      grid,
    );
    state.comparisonEvidence = loadedEntries;
    exportStatus.textContent = loadedEntries.length
      ? `${loadedEntries.length} evidence citation${
        loadedEntries.length === 1 ? "" : "s"
      } ready for JSON export.`
      : "No evidence was loaded, so no citation file is available.";
    state.comparing = false;
    updateComparisonControls();
  }

  function exportComparison() {
    if (!state.comparisonEvidence.length) return;
    try {
      const manifest = buildCitationManifest({
        query: state.query,
        kind: state.kind,
        source: state.source,
        entries: state.comparisonEvidence,
      });
      const blob = new Blob([`${JSON.stringify(manifest, null, 2)}\n`], {
        type: "application/json;charset=utf-8",
      });
      const objectUrl = URL.createObjectURL(blob);
      const link = element("a");
      link.href = objectUrl;
      link.download = `esheria-contract-citations-${
        manifest.generated_at.slice(0, 10)
      }.json`;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      exportStatus.textContent =
        "Citation JSON downloaded. It contains no access token or private object path.";
    } catch (error) {
      exportStatus.textContent = error instanceof Error
        ? error.message
        : "Citation export could not be created.";
    }
  }

  function partyResultCard(itemValue) {
    const item = record(itemValue);
    const card = element("article", "result-card");
    const top = element("div", "result-top");
    const headingGroup = element("div");
    append(
      headingGroup,
      element(
        "span",
        "badge basis-observed",
        "Observed party-name match",
      ),
      element(
        "h3",
        "",
        displayText(item.observed_party_name, "Unnamed party"),
      ),
      element(
        "div",
        "meta",
        `${displayText(item.observed_party_role, "role not stated")} · ${
          partyCapturePresentation(item.party_capture_method)
        } · entity status ${
          displayText(item.party_resolution_status, "unresolved")
        }`,
      ),
    );
    const score = Number(item.match_score);
    append(
      top,
      headingGroup,
      Number.isFinite(score)
        ? element("span", "muted", `${displayText(item.match_kind)} match`)
        : null,
    );

    const title = element(
      "h4",
      "party-result-title",
      displayText(item.observed_title, "Untitled agreement"),
    );
    const metadata = element("div", "meta");
    append(
      metadata,
      element("span", "", displayText(item.source_name, "Unknown source")),
      element("span", "", displayText(item.document_kind, "unclassified")),
      item.observed_published_at
        ? element("span", "", date(item.observed_published_at))
        : null,
      item.effective_date
        ? element(
          "span",
          "",
          `${
            item.effective_date_basis === "generated" ? "Generated " : ""
          }effective date ${displayText(item.effective_date)}`,
        )
        : null,
      item.execution_date
        ? element(
          "span",
          "",
          `${
            item.execution_date_basis === "generated" ? "Generated " : ""
          }execution date ${displayText(item.execution_date)}`,
        )
        : null,
      element("span", "", `${count(item.clause_count)} clauses`),
    );

    const parties = array(item.agreement_parties).slice(0, 10);
    const partyList = element("div", "party-list");
    partyList.append(
      element(
        "strong",
        "",
        `Recorded parties (${count(item.agreement_party_count)})`,
      ),
    );
    for (const partyValue of parties) {
      const party = record(partyValue);
      partyList.append(
        element(
          "p",
          "",
          `${displayText(party.observed_name, "Unnamed party")} · ${
            displayText(party.observed_role, "role not stated")
          } · entity ${displayText(party.resolution_status, "unresolved")}`,
        ),
      );
    }
    if (item.agreement_parties_truncated === true) {
      partyList.append(
        element("p", "muted", "Additional recorded party names are omitted."),
      );
    }

    const partyEvidence = typeof item.party_evidence_quote === "string" &&
        item.party_evidence_quote
      ? append(
        element("blockquote", "observed-text"),
        element("strong", "", "Observed party evidence"),
        element("p", "", boundedText(item.party_evidence_quote, 500)),
      )
      : null;

    const actions = element("div", "result-actions");
    const agreementId = typeof item.agreement_id === "string"
      ? item.agreement_id
      : "";
    if (UUID_PATTERN.test(agreementId)) {
      const inspect = element(
        "button",
        "text-button",
        "Inspect agreement evidence →",
      );
      inspect.type = "button";
      inspect.addEventListener("click", () => loadAgreement(agreementId));
      actions.append(inspect);
    }
    if (typeof item.observed_party_name === "string") {
      const useParty = element(
        "button",
        "text-button",
        "Search clauses for this party →",
      );
      useParty.type = "button";
      useParty.addEventListener("click", () => {
        clausePartyInput.value = item.observed_party_name;
        queryInput.focus();
        searchForm.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      actions.append(useParty);
    }
    append(actions, sourceLink(item.source_url));
    append(card, top, title, metadata, partyEvidence, partyList, actions);
    return card;
  }

  function renderPartySearch(payload) {
    const root = record(payload);
    const rows = array(root.results).slice(0, state.partyLimit);
    const pagination = record(root.pagination);
    state.partyHasMore = pagination.has_more === true;
    partyPrevious.disabled = state.partyOffset === 0;
    partyNext.disabled = !state.partyHasMore;
    partyResults.replaceChildren(
      ...(rows.length ? rows.map(partyResultCard) : [
        element(
          "p",
          "empty",
          "No published agreement matched that observed party name.",
        ),
      ]),
    );
    const start = rows.length ? state.partyOffset + 1 : 0;
    const end = state.partyOffset + rows.length;
    const total = Number(pagination.total_matching_agreements);
    partySearchStatus.textContent = rows.length
      ? `Showing agreement records ${start}–${end}${
        Number.isSafeInteger(total) ? ` of ${total}` : ""
      }. Names are observations, not resolved entity identities or a complete portfolio.`
      : "No result returned. Party extraction and corpus coverage are incomplete.";
  }

  async function performPartySearch() {
    if (!state.token || state.partySearching) return;
    state.partySearching = true;
    partySearchButton.disabled = true;
    partyPrevious.disabled = true;
    partyNext.disabled = true;
    partySearchStatus.textContent = "Searching published party observations…";
    try {
      const path = buildPartySearchPath({
        query: state.partyQuery,
        kind: state.partyKind,
        source: state.partySource,
        limit: state.partyLimit,
        offset: state.partyOffset,
      });
      const payload = await requestJson(path, state.token);
      renderPartySearch(payload);
    } catch (error) {
      handleFailure(error, partySearchStatus);
    } finally {
      state.partySearching = false;
      partySearchButton.disabled = false;
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
    const resultBasis = textBasisPresentation(item.text_basis);
    const basis = element(
      "span",
      `badge ${resultBasis.className}`,
      resultBasis.label,
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
      item.observed_party_name
        ? element(
          "span",
          "",
          `Party ${displayText(item.observed_party_name)} (${
            displayText(item.observed_party_role, "role not stated")
          })`,
        )
        : null,
      item.issuer_name ? element("span", "", item.issuer_name) : null,
      item.filing_form
        ? element("span", "", `Form ${displayText(item.filing_form)}`)
        : null,
      item.observed_published_at
        ? element("span", "", date(item.observed_published_at))
        : null,
    );
    append(headingGroup, kind, basis, title, meta);
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
    const clauseId = typeof item.clause_id === "string" &&
        UUID_PATTERN.test(item.clause_id)
      ? item.clause_id
      : null;
    const comparisonKey = comparisonSelectionKey(item);
    if (comparisonKey) {
      actions.append(comparisonChoice(item, comparisonKey));
    }
    if (UUID_PATTERN.test(agreementId)) {
      const inspect = element(
        "button",
        "text-button",
        "Inspect agreement context →",
      );
      inspect.type = "button";
      inspect.addEventListener(
        "click",
        () => loadAgreement(agreementId, clauseId),
      );
      actions.append(inspect);
    }
    append(actions, sourceLink(item.source_url));
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
      ? `Showing results ${start}–${end}${
        state.clauseParty
          ? ` within agreements matching observed party “${state.clauseParty}”`
          : ""
      }. Search is evidence retrieval, not entity resolution or a completeness guarantee.`
      : "No results returned. Clause, party and corpus coverage may be incomplete.";
    updateComparisonControls();
  }

  async function performSearch() {
    if (!state.token || state.searching) return;
    state.searching = true;
    searchButton.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    searchStatus.textContent = "Searching published clause evidence…";
    try {
      const path = state.clauseParty
        ? buildPartyClauseSearchPath({
          ...state,
          party: state.clauseParty,
        })
        : buildSearchPath(state);
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
    const agreementBasis = textBasisPresentation(agreement.text_basis);
    const executionDate = agreementDatePresentation(
      agreement,
      "execution",
      "execution date",
    );
    const effectiveDate = agreementDatePresentation(
      agreement,
      "effective",
      "effective date",
    );
    const terminationDate = agreementDatePresentation(
      agreement,
      "termination",
      "termination date",
    );
    const clauseWindow = record(data.clause_window);
    const anchorClauseId = typeof data.anchor_clause_id === "string" &&
        UUID_PATTERN.test(data.anchor_clause_id)
      ? data.anchor_clause_id
      : null;
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
        [executionDate.label, displayText(executionDate.value)],
        [effectiveDate.label, displayText(effectiveDate.value)],
        [terminationDate.label, displayText(terminationDate.value)],
        [
          "Extraction",
          `${displayText(agreement.extraction_method)} · confidence ${
            displayText(agreement.extraction_confidence)
          }`,
        ],
        ["Artifact SHA-256", displayText(agreement.artifact_sha256)],
        ["Text basis", agreementBasis.label],
        ["Clauses", count(data.clause_count)],
      ]),
    );
    const sourceUrl = sourceLink(
      source.observed_canonical_url,
      "Open recorded source ↗",
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

    const agreementDates = array(data.agreement_date_evidence);
    if (agreementDates.length) {
      const dateSection = section("Agreement date evidence");
      for (const dateValue of agreementDates) {
        const dateEvidence = record(dateValue);
        const card = element("article", "generated");
        append(
          card,
          element(
            "strong",
            "",
            `Generated ${
              displayText(dateEvidence.date_type, "date").replaceAll("_", " ")
            } candidate · ${displayText(dateEvidence.observed_date)}`,
          ),
          element(
            "p",
            "observed-text",
            displayText(
              dateEvidence.observed_quote,
              "No supporting quote returned.",
            ),
          ),
          element(
            "p",
            "muted",
            `Observed text at characters ${
              displayText(dateEvidence.observed_char_start, "?")
            }–${displayText(dateEvidence.observed_char_end, "?")} · rule ${
              displayText(dateEvidence.rule_id, "unknown")
            }${dateEvidence.is_conflicting ? " · conflicting candidates" : ""}${
              dateEvidence.has_historical_disagreement
                ? " · differs across extraction history"
                : ""
            }`,
          ),
        );
        dateSection.append(card);
      }
      fragment.append(dateSection);
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
            `${agreementBasis.label} role: ${displayText(party.observed_role)}`,
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
    const clauseSection = section("Agreement clauses");
    if (anchorClauseId && clauseWindow.mode === "anchored") {
      const first = displayText(clauseWindow.first_sequence, "?");
      const last = displayText(clauseWindow.last_sequence, "?");
      clauseSection.append(
        element(
          "p",
          "focus-note",
          `Search-result context: showing the clause window ${first}–${last}. The exact matched clause is highlighted below.`,
        ),
      );
    }
    if (data.truncated === true) {
      clauseSection.append(
        element(
          "p",
          "muted",
          anchorClauseId
            ? "This is a bounded window around the matched clause, not the complete agreement."
            : "Only the first 40 clauses are shown in this bounded view.",
        ),
      );
    }
    for (const clauseValue of clauses) {
      const clause = record(clauseValue);
      const clauseBasis = textBasisPresentation(
        clause.text_basis ?? agreement.text_basis,
      );
      const card = element("article", "clause");
      const isAnchor = anchorClauseId !== null && clause.id === anchorClauseId;
      if (isAnchor) {
        card.classList.add("matched-clause");
        card.setAttribute("aria-label", "Matched search clause");
      }
      const heading = clause.heading
        ? `${displayText(clause.sequence)} · ${displayText(clause.heading)}`
        : `Clause ${displayText(clause.sequence)}`;
      append(
        card,
        isAnchor ? element("span", "badge match-badge", "Search match") : null,
        element("span", `badge ${clauseBasis.className}`, clauseBasis.label),
        element("h3", "", heading),
        element(
          "p",
          "muted",
          formatEvidenceLocation(clause),
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
        const definitionBasis = textBasisPresentation(
          definition.definition_basis ?? clause.text_basis ??
            agreement.text_basis,
        );
        const definitionBox = element(
          "p",
          "observed-text",
          `${definitionBasis.label} defined term “${
            displayText(definition.term)
          }”: ${boundedText(definition.definition, 8_000)}`,
        );
        if (
          Number.isSafeInteger(definition.char_start) &&
          Number.isSafeInteger(definition.char_end)
        ) {
          definitionBox.append(
            element(
              "span",
              "muted",
              ` Source characters ${definition.char_start}–${definition.char_end}.`,
            ),
          );
        }
        card.append(definitionBox);
      }
      const references = array(clause.cross_references).slice(0, 50);
      for (const referenceValue of references) {
        const reference = record(referenceValue);
        const referenceBasis = textBasisPresentation(
          reference.observation_basis ?? reference.basis,
        );
        const referenceBox = element("div", "relationship");
        append(
          referenceBox,
          element(
            "span",
            `badge ${referenceBasis.className}`,
            `${referenceBasis.label} reference`,
          ),
          element(
            "p",
            "observed-text",
            displayText(
              reference.observed_reference,
              "Reference wording was not captured.",
            ),
          ),
        );
        const targetId = typeof reference.target_clause_id === "string" &&
            UUID_PATTERN.test(reference.target_clause_id)
          ? reference.target_clause_id
          : null;
        const resolutionBasis = reference.target_resolution_basis;
        const resolution = element(
          "div",
          resolutionBasis === "generated" ? "generated" : "relationship",
        );
        append(
          resolution,
          element(
            "strong",
            "",
            referenceResolutionProvenance(resolutionBasis),
          ),
          element(
            "p",
            "",
            targetId
              ? `Clause ${displayText(reference.target_sequence)} · ${
                displayText(reference.target_heading, "Untitled clause")
              } · ${
                referenceResolutionLabel(reference.target_resolution_status)
              }`
              : referenceResolutionLabel(reference.target_resolution_status),
          ),
        );
        if (targetId) {
          const inspect = element(
            "button",
            "text-button",
            "View referenced clause →",
          );
          inspect.type = "button";
          inspect.addEventListener(
            "click",
            () => loadAgreement(agreement.id, targetId),
          );
          resolution.append(inspect);
        }
        referenceBox.append(resolution);
        card.append(referenceBox);
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
    const matchedClause = detailBody.querySelector(".matched-clause");
    if (matchedClause instanceof HTMLElement) {
      matchedClause.scrollIntoView({ block: "center" });
    }
  }

  async function loadAgreement(agreementId, anchorClauseId = null) {
    if (!state.token) return;
    detailBody.replaceChildren(
      element("p", "muted", "Loading agreement evidence…"),
    );
    openDialog(detailDialog);
    try {
      const payload = await requestJson(
        buildAgreementPath(agreementId, 40, anchorClauseId),
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
  byId("close-comparison").addEventListener(
    "click",
    () => closeDialog(comparisonDialog),
  );
  clearComparisonButton.addEventListener("click", clearComparison);
  openComparisonButton.addEventListener("click", compareSelected);
  exportComparisonButton.addEventListener("click", exportComparison);
  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) closeDialog(detailDialog);
  });
  comparisonDialog.addEventListener("click", (event) => {
    if (event.target === comparisonDialog) closeDialog(comparisonDialog);
  });

  partySearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.partyQuery = partyQueryInput.value.trim();
    state.partyKind = partyKindInput.value;
    state.partySource = partySourceInput.value.trim().toLowerCase();
    state.partyOffset = 0;
    performPartySearch();
  });
  partyPrevious.addEventListener("click", () => {
    state.partyOffset = Math.max(0, state.partyOffset - state.partyLimit);
    performPartySearch();
  });
  partyNext.addEventListener("click", () => {
    if (!state.partyHasMore) return;
    state.partyOffset = Math.min(1_000, state.partyOffset + state.partyLimit);
    performPartySearch();
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = queryInput.value.trim();
    const clauseParty = clausePartyInput.value.trim();
    const kind = kindInput.value;
    const source = sourceInput.value.trim().toLowerCase();
    if (
      query !== state.query || clauseParty !== state.clauseParty ||
      kind !== state.kind || source !== state.source
    ) clearComparison();
    state.query = query;
    state.clauseParty = clauseParty;
    state.kind = kind;
    state.source = source;
    state.offset = 0;
    syncGuideSelection(query);
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
    state.comparisonSelection.clear();
    state.comparisonEvidence = [];
    tokenInput.value = "";
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && !state.token) {
      signOut("The token was cleared when this page was left.");
    }
  });

  updateComparisonControls();
  tokenInput.focus();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
}
