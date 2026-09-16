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
const REQUEST_TIMEOUT_MS = 15_000;
const RETRYABLE_RESPONSE_STATUSES = new Set([502, 503, 504]);
const RETRY_DELAY_MS = 400;
export const COMPARISON_MIN_ITEMS = 2;
export const COMPARISON_MAX_ITEMS = 4;
export const COMPARISON_CONTEXT_CLAUSES = 5;
export const COMPARISON_CONNECTED_CONTEXT_ITEMS = 5;
export const FAMILY_CONTEXT_ITEM_MAX = 10;
export const FAMILY_PROPOSAL_PAGE_MAX = 20;
export const FAMILY_PROPOSAL_OFFSET_MAX = 500;
export const AGREEMENT_DECISION_BRIEF_EXAMPLES_DEFAULT = 3;
export const AGREEMENT_DECISION_BRIEF_EXAMPLES_MAX = 5;
export const AGREEMENT_CHANGE_CUE_LIMIT_DEFAULT = 12;
export const AGREEMENT_CHANGE_CUE_LIMIT_MAX = 20;
export const AMENDMENT_CHANGE_DIRECTORY_PAGE_MAX = 20;
export const AMENDMENT_CHANGE_DIRECTORY_OFFSET_MAX = 500;
export const AGREEMENT_DECISION_BRIEF_SCHEMA =
  "esheria.agreement-decision-brief.v2";
export const AGREEMENT_DECISION_BRIEF_COMPARISON_MIN = 2;
export const AGREEMENT_DECISION_BRIEF_COMPARISON_MAX = 3;
export const AGREEMENT_DECISION_BRIEF_COMPARISON_EXAMPLES =
  AGREEMENT_DECISION_BRIEF_EXAMPLES_MAX;
export const AGREEMENT_DECISION_BRIEF_COMPARISON_SCHEMA =
  "esheria.agreement-decision-brief-comparison.v1";
export const FAMILY_PROPOSAL_BRIEF_COMPARISON_SCHEMA =
  "esheria.family-proposal-brief-comparison.v1";
export const FAMILY_PROPOSAL_LIFECYCLE_COMPARISON_SCHEMA =
  "esheria.family-proposal-lifecycle-comparison.v1";
export const PARTY_DECISION_BRIEF_SCAN_CONCURRENCY = 3;
export const PARTY_DECISION_BRIEF_SCAN_EXAMPLES = 1;
export const PARTY_DECISION_BRIEF_SCAN_MAX = 50;
export const PARTY_DECISION_BRIEF_SHORTLIST_MAX = 10;
export const PARTY_DECISION_BRIEF_SHORTLIST_SCHEMA =
  "esheria.party-decision-brief-shortlist.v1";
export const PARTY_DOSSIER_SCHEMA =
  "observed-party-negotiation-dossier-v4";
export const DECISION_BRIEF_DIRECTORY_PAGE_MAX = 20;
export const DECISION_BRIEF_DIRECTORY_OFFSET_MAX = 500;
export const COMMERCIAL_POSITION_SIGNAL_MAX = 4;
export const TERMINATION_POSITION_SIGNAL_MAX = 12;
export const CITATION_TEXT_MAX_CHARS = 100_000;
export const LIABILITY_POSITION_MATRIX_SCHEMA =
  "esheria.liability-position-matrix.v3";
export const TERMINATION_POSITION_MATRIX_SCHEMA =
  "esheria.termination-position-matrix.v1";
export const ASSIGNMENT_POSITION_MATRIX_SCHEMA =
  "esheria.assignment-position-matrix.v1";
export const GOVERNING_LAW_POSITION_MATRIX_SCHEMA =
  "esheria.governing-law-position-matrix.v1";
export const INDEMNITY_POSITION_MATRIX_SCHEMA =
  "esheria.indemnity-position-matrix.v1";

const LIABILITY_VALUE_CANDIDATE_CATEGORIES = Object.freeze([
  ["currency_amounts", "Currency amounts"],
  ["percentages", "Percentages"],
  ["cap_basis_terms", "Cap bases"],
  ["comparison_formulas", "Comparison formulas"],
  ["period_terms", "Periods"],
]);
const LIABILITY_POSITION_SIGNAL_KEYS = Object.freeze([
  "explicit_liability_limit_formula",
  "excluded_loss_language",
  "cap_carveout_language",
  "express_unlimited_liability",
]);
const LIABILITY_POSITION_SIGNAL_LABELS = Object.freeze({
  explicit_liability_limit_formula: "Explicit limits",
  excluded_loss_language: "Excluded loss",
  cap_carveout_language: "Carve-outs",
  express_unlimited_liability: "Express unlimited",
});
const LIABILITY_POSITION_FEATURES = Object.freeze({
  explicit_cap_facially_bilateral: Object.freeze({
    label: "Facially bilateral cap wording",
    signalKey: "explicit_liability_limit_formula",
  }),
  loss_exclusion_facially_bilateral: Object.freeze({
    label: "Facially bilateral loss exclusion",
    signalKey: "excluded_loss_language",
  }),
  carveout_death_or_personal_injury: Object.freeze({
    label: "Death / personal injury carve-out",
    signalKey: "cap_carveout_language",
  }),
  carveout_fraud: Object.freeze({
    label: "Fraud carve-out",
    signalKey: "cap_carveout_language",
  }),
  carveout_wilful_or_willful_misconduct: Object.freeze({
    label: "Wilful / willful misconduct carve-out",
    signalKey: "cap_carveout_language",
  }),
  loss_exclusion_indirect: Object.freeze({
    label: "Indirect loss named",
    signalKey: "excluded_loss_language",
  }),
  loss_exclusion_consequential: Object.freeze({
    label: "Consequential loss named",
    signalKey: "excluded_loss_language",
  }),
  loss_exclusion_special: Object.freeze({
    label: "Special loss named",
    signalKey: "excluded_loss_language",
  }),
  loss_exclusion_incidental: Object.freeze({
    label: "Incidental loss named",
    signalKey: "excluded_loss_language",
  }),
  loss_exclusion_exemplary: Object.freeze({
    label: "Exemplary loss named",
    signalKey: "excluded_loss_language",
  }),
  loss_exclusion_punitive: Object.freeze({
    label: "Punitive loss named",
    signalKey: "excluded_loss_language",
  }),
});
const LIABILITY_VALUE_CANDIDATE_SCHEMAS = new Set([
  "esheria.liability-cap-value-candidates.v1",
  "esheria.liability-cap-value-candidates.v2",
]);
const TERMINATION_POSITION_SIGNALS = Object.freeze({
  convenience_termination_language: "Convenience termination",
  material_breach_language: "Material breach",
  cure_or_remedy_language: "Cure / remedy",
  insolvency_language: "Insolvency",
  change_of_control_language: "Change of control",
  nonpayment_language: "Non-payment",
  immediate_termination_language: "Immediate termination",
  termination_fee_language: "Termination fee",
  exit_assistance_language: "Exit / transition assistance",
  post_termination_obligation_language: "Post-termination obligations",
  force_majeure_language: "Force majeure",
  data_return_or_deletion_language: "Data return / deletion",
});
const ASSIGNMENT_POSITION_SIGNALS = Object.freeze({
  assignment_prohibition_language: "Assignment / transfer prohibition",
  prior_consent_language: "Consent / approval requirement",
  qualified_consent_standard_language: "Consent reasonableness standard",
  express_assignment_permission_language: "Express transfer permission",
  affiliate_transfer_language: "Affiliate / group transfer",
  successor_transaction_language: "Merger / successor transfer",
  change_of_control_consequence_language: "Change-of-control consequence",
  change_of_control_definition_language: "Change-of-control definition",
  unauthorized_transfer_invalidity_language: "Unauthorized transfer invalidity",
  assignor_continuing_obligation_language: "Assignor remains responsible",
  finance_transfer_context: "Finance-transfer context",
  contract_transfer_language: "Contractual rights / obligations transfer",
});
export const ASSIGNMENT_POSITION_SIGNAL_MAX = 12;
const GOVERNING_LAW_POSITION_SIGNALS = Object.freeze({
  governing_law_language: "Express governing law",
  exclusive_jurisdiction_language: "Exclusive jurisdiction",
  nonexclusive_jurisdiction_language: "Non-exclusive jurisdiction",
  submission_to_jurisdiction_language: "Submission / consent to jurisdiction",
  court_or_forum_language: "Court, tribunal or venue wording",
  venue_objection_waiver_language: "Venue / forum objection waiver",
  conflict_of_laws_qualification_language: "Conflict-of-laws qualification",
  service_of_process_language: "Service of process / process agent",
});
export const GOVERNING_LAW_POSITION_SIGNAL_MAX = 8;
const INDEMNITY_POSITION_SIGNALS = Object.freeze({
  operative_indemnity_obligation_language: "Operative indemnity obligation",
  hold_harmless_language: "Hold harmless",
  defence_obligation_language: "Defence obligation",
  third_party_claim_language: "Third-party claims",
  direct_claim_language: "Direct or first-party claims",
  breach_negligence_or_misconduct_trigger_language:
    "Breach, negligence or misconduct trigger",
  intellectual_property_claim_language: "Intellectual-property claims",
  tax_indemnity_language: "Tax or VAT indemnity",
  employment_transfer_indemnity_language: "Employment or TUPE indemnity",
  claim_notice_language: "Claim notice",
  defence_control_language: "Control or conduct of defence",
  settlement_consent_language: "Settlement consent or approval",
  cooperation_language: "Claim or defence cooperation",
  exclusive_remedy_language: "Sole or exclusive remedy",
  survival_or_claim_period_language: "Survival or claims period",
});
export const INDEMNITY_POSITION_SIGNAL_MAX = 15;
const TERMINATION_DURATION_CANDIDATE_SCHEMA =
  "esheria.termination-duration-candidates.v1";
const LOCAL_TERMINATION_TERM_PATTERN =
  /(?:^|[^A-Za-z0-9_])terminat(?:e|es|ed|ing|ion)(?=$|[^A-Za-z0-9_])/iu;

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
  const changeCueMatch = pathname.match(
    /^\/api\/agreements\/([^/]+)\/change-cues$/,
  );
  if (changeCueMatch) {
    if (!UUID_PATTERN.test(changeCueMatch[1])) return false;
    const allowed = new Set(["limit"]);
    if (![...url.searchParams.keys()].every((key) => allowed.has(key))) {
      return false;
    }
    if (url.searchParams.getAll("limit").length > 1) return false;
    const limit = url.searchParams.get("limit");
    return limit === null ||
      (/^[1-9]\d*$/.test(limit) &&
        Number(limit) <= AGREEMENT_CHANGE_CUE_LIMIT_MAX);
  }
  const decisionBriefMatch = pathname.match(
    /^\/api\/agreements\/([^/]+)\/decision-brief$/,
  );
  if (decisionBriefMatch) {
    if (!UUID_PATTERN.test(decisionBriefMatch[1])) return false;
    const allowed = new Set(["examples_per_topic"]);
    if (![...url.searchParams.keys()].every((key) => allowed.has(key))) {
      return false;
    }
    if (url.searchParams.getAll("examples_per_topic").length > 1) {
      return false;
    }
    const examples = url.searchParams.get("examples_per_topic");
    return examples === null ||
      (/^[1-5]$/.test(examples) &&
        Number(examples) <= AGREEMENT_DECISION_BRIEF_EXAMPLES_MAX);
  }
  if (pathname === "/api/family-proposals") {
    const allowed = new Set(["limit", "offset"]);
    if (![...url.searchParams.keys()].every((key) => allowed.has(key))) {
      return false;
    }
    if (
      url.searchParams.getAll("limit").length > 1 ||
      url.searchParams.getAll("offset").length > 1
    ) {
      return false;
    }
    const limit = url.searchParams.get("limit");
    const offset = url.searchParams.get("offset");
    return (
      limit !== null &&
      /^[1-9]\d*$/.test(limit) &&
      Number(limit) <= FAMILY_PROPOSAL_PAGE_MAX &&
      offset !== null &&
      /^(0|[1-9]\d*)$/.test(offset) &&
      Number(offset) <= FAMILY_PROPOSAL_OFFSET_MAX
    );
  }
  if (pathname === "/api/amendment-changes") {
    const allowed = new Set(["cue", "source", "limit", "offset"]);
    if (![...url.searchParams.keys()].every((key) => allowed.has(key))) {
      return false;
    }
    const cues = url.searchParams.getAll("cue");
    const sources = url.searchParams.getAll("source");
    if (
      cues.length > Object.keys(AGREEMENT_CHANGE_CUE_LABELS).length ||
      sources.length > 25 ||
      url.searchParams.getAll("limit").length !== 1 ||
      url.searchParams.getAll("offset").length !== 1 ||
      cues.some((cue) => !Object.hasOwn(AGREEMENT_CHANGE_CUE_LABELS, cue)) ||
      sources.some((source) => !SOURCE_PATTERN.test(source))
    ) {
      return false;
    }
    const limit = url.searchParams.get("limit");
    const offset = url.searchParams.get("offset");
    return (
      limit !== null &&
      /^[1-9]\d*$/.test(limit) &&
      Number(limit) <= AMENDMENT_CHANGE_DIRECTORY_PAGE_MAX &&
      offset !== null &&
      /^(0|[1-9]\d*)$/.test(offset) &&
      Number(offset) <= AMENDMENT_CHANGE_DIRECTORY_OFFSET_MAX
    );
  }
  if (pathname === "/api/decision-briefs") {
    const allowed = new Set([
      "minimum_topics",
      "kind",
      "source",
      "limit",
      "offset",
    ]);
    if (![...url.searchParams.keys()].every((key) => allowed.has(key))) {
      return false;
    }
    if (
      ["minimum_topics", "kind", "source", "limit", "offset"].some(
        (key) => url.searchParams.getAll(key).length > 1,
      )
    ) {
      return false;
    }
    const minimumTopics = url.searchParams.get("minimum_topics");
    const kind = url.searchParams.get("kind");
    const source = url.searchParams.get("source");
    const limit = url.searchParams.get("limit");
    const offset = url.searchParams.get("offset");
    return (
      minimumTopics !== null &&
      /^[1-5]$/.test(minimumTopics) &&
      (kind === null || ["contract", "amendment"].includes(kind)) &&
      (source === null || SOURCE_PATTERN.test(source)) &&
      limit !== null &&
      /^[1-9]\d*$/.test(limit) &&
      Number(limit) <= DECISION_BRIEF_DIRECTORY_PAGE_MAX &&
      offset !== null &&
      /^(0|[1-9]\d*)$/.test(offset) &&
      Number(offset) <= DECISION_BRIEF_DIRECTORY_OFFSET_MAX
    );
  }
  if (
    pathname === "/api/dashboard" ||
    pathname === "/api/summary" ||
    pathname === "/api/metrics" ||
    pathname === "/api/governing-law-summary" ||
    pathname === "/api/indemnity-summary"
  ) {
    return url.search === "";
  }
  if (
    pathname === "/api/search" ||
    pathname === "/api/positions" ||
    pathname === "/api/termination-positions" ||
    pathname === "/api/assignment-positions" ||
    pathname === "/api/governing-law-positions" ||
    pathname === "/api/indemnity-positions" ||
    pathname === "/api/parties" ||
    pathname === "/api/party-clauses"
  ) {
    const allowed = new Set([
      "q",
      "party",
      "signal",
      "value",
      "feature",
      "duration",
      "linkage",
      "context",
      "limit",
      "offset",
      "kind",
      "source",
    ]);
    if (pathname !== "/api/party-clauses" && url.searchParams.has("party")) {
      return false;
    }
    if (
      pathname !== "/api/positions" &&
      pathname !== "/api/termination-positions" &&
      pathname !== "/api/assignment-positions" &&
      pathname !== "/api/governing-law-positions" &&
      pathname !== "/api/indemnity-positions" &&
      url.searchParams.has("signal")
    ) {
      return false;
    }
    if (pathname !== "/api/positions" && url.searchParams.has("value")) {
      return false;
    }
    if (pathname !== "/api/positions" && url.searchParams.has("feature")) {
      return false;
    }
    if (
      pathname !== "/api/termination-positions" &&
      (url.searchParams.has("duration") || url.searchParams.has("linkage"))
    ) {
      return false;
    }
    if (
      pathname !== "/api/assignment-positions" &&
      url.searchParams.has("context")
    ) {
      return false;
    }
    if (pathname === "/api/positions" && url.searchParams.has("q")) {
      return false;
    }
    if (
      pathname === "/api/termination-positions" &&
      (url.searchParams.has("q") ||
        url.searchParams.has("value") ||
        url.searchParams.has("feature"))
    ) {
      return false;
    }
    if (
      pathname === "/api/assignment-positions" &&
      (url.searchParams.has("q") ||
        url.searchParams.has("value") ||
        url.searchParams.has("feature") ||
        url.searchParams.has("duration") ||
        url.searchParams.has("linkage"))
    ) {
      return false;
    }
    if (
      pathname === "/api/governing-law-positions" &&
      (url.searchParams.has("q") ||
        url.searchParams.has("value") ||
        url.searchParams.has("feature") ||
        url.searchParams.has("duration") ||
        url.searchParams.has("linkage") ||
        url.searchParams.has("context"))
    ) {
      return false;
    }
    if (
      pathname === "/api/indemnity-positions" &&
      (url.searchParams.has("q") ||
        url.searchParams.has("value") ||
        url.searchParams.has("feature") ||
        url.searchParams.has("duration") ||
        url.searchParams.has("linkage") ||
        url.searchParams.has("context"))
    ) {
      return false;
    }
    return [...url.searchParams.keys()].every((key) => allowed.has(key));
  }
  if (pathname === "/api/party-dossier") {
    const allowed = new Set(["party", "themes", "examples"]);
    return (
      url.searchParams.getAll("party").length === 1 &&
      [...url.searchParams.keys()].every((key) => allowed.has(key))
    );
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
  ) {
    return false;
  }
  const clauseLimit = url.searchParams.get("clauses");
  if (
    clauseLimit !== null &&
    (!/^[1-9]\d*$/.test(clauseLimit) || Number(clauseLimit) > 40)
  ) {
    return false;
  }
  const anchorClauseId = url.searchParams.get("clause");
  return anchorClauseId === null || UUID_PATTERN.test(anchorClauseId);
}

export function apiUrl(path) {
  if (typeof path !== "string" || !path.startsWith("/")) {
    throw new TypeError("API path must be root-relative");
  }
  const relative = new URL(path, "https://route.invalid");
  if (
    relative.origin !== "https://route.invalid" ||
    relative.hash ||
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
    normalizedQuery.length < 2 ||
    normalizedQuery.length > 200 ||
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

export function buildLiabilityPositionPath({
  signalKeys = [],
  valueCategories = [],
  featureKeys = [],
  kind = "",
  source = "",
  limit = 20,
  offset = 0,
} = {}) {
  const signals = [...new Set(array(signalKeys))];
  const values = [...new Set(array(valueCategories))];
  const features = [...new Set(array(featureKeys))];
  if (
    signals.length > LIABILITY_POSITION_SIGNAL_KEYS.length ||
    signals.some((key) => !LIABILITY_POSITION_SIGNAL_KEYS.includes(key))
  ) {
    throw new TypeError("Position signal filter is invalid");
  }
  if (
    values.length > LIABILITY_VALUE_CANDIDATE_CATEGORIES.length ||
    values.some(
      (key) =>
        !LIABILITY_VALUE_CANDIDATE_CATEGORIES.some(
          ([allowed]) => allowed === key,
        ),
    )
  ) {
    throw new TypeError("Cap-value category filter is invalid");
  }
  if (
    values.length &&
    signals.length &&
    !signals.includes("explicit_liability_limit_formula")
  ) {
    throw new TypeError(
      "Cap-value filters require the explicit liability limit signal",
    );
  }
  if (
    features.length > Object.keys(LIABILITY_POSITION_FEATURES).length ||
    features.some((key) => !Object.hasOwn(LIABILITY_POSITION_FEATURES, key))
  ) {
    throw new TypeError("Liability feature filter is invalid");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new TypeError("Position limit is outside the allowed range");
  }
  if (!Number.isInteger(offset) || offset < 0 || offset > 1_000) {
    throw new TypeError("Position offset is outside the allowed range");
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
    limit: String(limit),
    offset: String(offset),
  });
  for (const signal of signals) params.append("signal", signal);
  for (const value of values) params.append("value", value);
  for (const feature of features) params.append("feature", feature);
  if (kind) params.set("kind", kind);
  if (normalizedSource) params.set("source", normalizedSource);
  return `/api/positions?${params.toString()}`;
}

export function buildTerminationPositionPath({
  signalKeys = [],
  hasDuration = false,
  hasLocalTerminationLink = false,
  kind = "",
  source = "",
  limit = 20,
  offset = 0,
} = {}) {
  const signals = [...new Set(array(signalKeys))];
  if (
    signals.length > Object.keys(TERMINATION_POSITION_SIGNALS).length ||
    signals.some((key) => !Object.hasOwn(TERMINATION_POSITION_SIGNALS, key))
  ) {
    throw new TypeError("Termination signal filter is invalid");
  }
  if (typeof hasDuration !== "boolean") {
    throw new TypeError("Duration filter is invalid");
  }
  if (typeof hasLocalTerminationLink !== "boolean") {
    throw new TypeError("Termination linkage filter is invalid");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new TypeError("Position limit is outside the allowed range");
  }
  if (!Number.isInteger(offset) || offset < 0 || offset > 5_000) {
    throw new TypeError("Position offset is outside the allowed range");
  }
  if (kind && !["contract", "amendment"].includes(kind)) {
    throw new TypeError("Termination document class is not supported");
  }
  const normalizedSource = typeof source === "string"
    ? source.trim().toLowerCase()
    : "";
  if (normalizedSource && !SOURCE_PATTERN.test(normalizedSource)) {
    throw new TypeError("Source slug is invalid");
  }

  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  for (const signal of signals) params.append("signal", signal);
  if (hasDuration) params.set("duration", "present");
  if (hasLocalTerminationLink) params.set("linkage", "local");
  if (kind) params.set("kind", kind);
  if (normalizedSource) params.set("source", normalizedSource);
  return `/api/termination-positions?${params.toString()}`;
}

export function buildAssignmentPositionPath({
  signalKeys = [],
  context = "",
  kind = "",
  source = "",
  limit = 20,
  offset = 0,
} = {}) {
  const signals = [...new Set(array(signalKeys))];
  if (
    signals.length > ASSIGNMENT_POSITION_SIGNAL_MAX ||
    signals.some((key) => !Object.hasOwn(ASSIGNMENT_POSITION_SIGNALS, key))
  ) {
    throw new TypeError("Assignment signal filter is invalid");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new TypeError("Position limit is outside the allowed range");
  }
  if (!Number.isInteger(offset) || offset < 0 || offset > 5_000) {
    throw new TypeError("Position offset is outside the allowed range");
  }
  if (kind && !["contract", "amendment"].includes(kind)) {
    throw new TypeError("Assignment document class is not supported");
  }
  if (context && !["general", "finance"].includes(context)) {
    throw new TypeError("Assignment context is not supported");
  }
  const normalizedSource = typeof source === "string"
    ? source.trim().toLowerCase()
    : "";
  if (normalizedSource && !SOURCE_PATTERN.test(normalizedSource)) {
    throw new TypeError("Source slug is invalid");
  }

  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  for (const signal of signals) params.append("signal", signal);
  if (context) params.set("context", context);
  if (kind) params.set("kind", kind);
  if (normalizedSource) params.set("source", normalizedSource);
  return `/api/assignment-positions?${params.toString()}`;
}

export function buildGoverningLawPositionPath({
  signalKeys = [],
  kind = "",
  source = "",
  limit = 20,
  offset = 0,
} = {}) {
  const signals = [...new Set(array(signalKeys))];
  if (
    signals.length > GOVERNING_LAW_POSITION_SIGNAL_MAX ||
    signals.some((key) => !Object.hasOwn(GOVERNING_LAW_POSITION_SIGNALS, key))
  ) {
    throw new TypeError("Governing-law signal filter is invalid");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new TypeError("Position limit is outside the allowed range");
  }
  if (!Number.isInteger(offset) || offset < 0 || offset > 5_000) {
    throw new TypeError("Position offset is outside the allowed range");
  }
  if (kind && !["contract", "amendment"].includes(kind)) {
    throw new TypeError("Governing-law document class is not supported");
  }
  const normalizedSource = typeof source === "string"
    ? source.trim().toLowerCase()
    : "";
  if (normalizedSource && !SOURCE_PATTERN.test(normalizedSource)) {
    throw new TypeError("Source slug is invalid");
  }

  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  for (const signal of signals) params.append("signal", signal);
  if (kind) params.set("kind", kind);
  if (normalizedSource) params.set("source", normalizedSource);
  return `/api/governing-law-positions?${params.toString()}`;
}

export function buildIndemnityPositionPath({
  signalKeys = [],
  kind = "",
  source = "",
  limit = 20,
  offset = 0,
} = {}) {
  const signals = [...new Set(array(signalKeys))];
  if (
    signals.length > INDEMNITY_POSITION_SIGNAL_MAX ||
    signals.some((key) => !Object.hasOwn(INDEMNITY_POSITION_SIGNALS, key))
  ) {
    throw new TypeError("Indemnity signal filter is invalid");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new TypeError("Position limit is outside the allowed range");
  }
  if (!Number.isInteger(offset) || offset < 0 || offset > 5_000) {
    throw new TypeError("Position offset is outside the allowed range");
  }
  if (kind && !["contract", "amendment"].includes(kind)) {
    throw new TypeError("Indemnity document class is not supported");
  }
  const normalizedSource = typeof source === "string"
    ? source.trim().toLowerCase()
    : "";
  if (normalizedSource && !SOURCE_PATTERN.test(normalizedSource)) {
    throw new TypeError("Source slug is invalid");
  }

  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  for (const signal of signals) params.append("signal", signal);
  if (kind) params.set("kind", kind);
  if (normalizedSource) params.set("source", normalizedSource);
  return `/api/indemnity-positions?${params.toString()}`;
}

export function buildFamilyProposalPath({ limit = 20, offset = 0 } = {}) {
  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > FAMILY_PROPOSAL_PAGE_MAX
  ) {
    throw new TypeError("Family proposal limit is outside the allowed range");
  }
  if (
    !Number.isInteger(offset) ||
    offset < 0 ||
    offset > FAMILY_PROPOSAL_OFFSET_MAX
  ) {
    throw new TypeError("Family proposal offset is outside the allowed range");
  }
  return `/api/family-proposals?${
    new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    }).toString()
  }`;
}

export function buildAmendmentChangeDirectoryPath({
  cueKeys = [],
  sourceSlugs = [],
  limit = 12,
  offset = 0,
} = {}) {
  if (!Array.isArray(cueKeys) || !Array.isArray(sourceSlugs)) {
    throw new TypeError("Amendment change filters must be arrays");
  }
  const cues = [...new Set(cueKeys)];
  if (
    cues.length > Object.keys(AGREEMENT_CHANGE_CUE_LABELS).length ||
    cues.some(
      (cue) =>
        typeof cue !== "string" ||
        !Object.hasOwn(AGREEMENT_CHANGE_CUE_LABELS, cue),
    )
  ) {
    throw new TypeError("Amendment change cue filter is invalid");
  }
  const sources = [...new Set(sourceSlugs.map((source) =>
    typeof source === "string" ? source.trim().toLowerCase() : source
  ))];
  if (
    sources.length > 25 ||
    sources.some(
      (source) => typeof source !== "string" || !SOURCE_PATTERN.test(source),
    )
  ) {
    throw new TypeError("Amendment change source filter is invalid");
  }
  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > AMENDMENT_CHANGE_DIRECTORY_PAGE_MAX
  ) {
    throw new TypeError(
      "Amendment change directory limit is outside the allowed range",
    );
  }
  if (
    !Number.isInteger(offset) ||
    offset < 0 ||
    offset > AMENDMENT_CHANGE_DIRECTORY_OFFSET_MAX
  ) {
    throw new TypeError(
      "Amendment change directory offset is outside the allowed range",
    );
  }
  const params = new URLSearchParams();
  for (const cue of cues) params.append("cue", cue);
  for (const source of sources) params.append("source", source);
  params.set("limit", String(limit));
  params.set("offset", String(offset));
  return `/api/amendment-changes?${params.toString()}`;
}

export function buildPartyClauseSearchPath({ party, ...input }) {
  const partyPath = buildPartySearchPath({ query: party });
  const normalizedParty = new URL(
    partyPath,
    "https://route.invalid",
  ).searchParams.get("q");
  if (!normalizedParty) throw new TypeError("Party search term is invalid");
  const clausePath = buildSearchPath(input);
  const params = new URL(clausePath, "https://route.invalid").searchParams;
  params.set("party", normalizedParty);
  return `/api/party-clauses?${params.toString()}`;
}

export function buildPartyDossierPath({
  party,
  themeLimit = 12,
  examplesPerTheme = 2,
}) {
  const partyPath = buildPartySearchPath({ query: party });
  const normalizedParty = new URL(
    partyPath,
    "https://route.invalid",
  ).searchParams.get("q");
  if (!normalizedParty) throw new TypeError("Party name is invalid");
  if (!Number.isInteger(themeLimit) || themeLimit < 1 || themeLimit > 20) {
    throw new TypeError("Theme limit is outside the allowed range");
  }
  if (
    !Number.isInteger(examplesPerTheme) ||
    examplesPerTheme < 1 ||
    examplesPerTheme > 3
  ) {
    throw new TypeError("Examples per theme is outside the allowed range");
  }
  const params = new URLSearchParams({
    party: normalizedParty,
    themes: String(themeLimit),
    examples: String(examplesPerTheme),
  });
  return `/api/party-dossier?${params.toString()}`;
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
    (typeof anchorClauseId !== "string" || !UUID_PATTERN.test(anchorClauseId))
  ) {
    throw new TypeError("Anchor clause identifier is invalid");
  }
  const params = new URLSearchParams({ clauses: String(clauseLimit) });
  if (anchorClauseId) params.set("clause", anchorClauseId);
  return `/api/agreements/${agreementId}?${params.toString()}`;
}

export function buildAgreementDecisionBriefPath(
  agreementId,
  examplesPerTopic = AGREEMENT_DECISION_BRIEF_EXAMPLES_DEFAULT,
) {
  if (typeof agreementId !== "string" || !UUID_PATTERN.test(agreementId)) {
    throw new TypeError("Agreement identifier is invalid");
  }
  if (
    !Number.isInteger(examplesPerTopic) ||
    examplesPerTopic < 1 ||
    examplesPerTopic > AGREEMENT_DECISION_BRIEF_EXAMPLES_MAX
  ) {
    throw new TypeError("Examples per topic is outside the allowed range");
  }
  const params = new URLSearchParams({
    examples_per_topic: String(examplesPerTopic),
  });
  return `/api/agreements/${agreementId}/decision-brief?${params.toString()}`;
}

export function buildAgreementChangeCuePath(
  agreementId,
  limit = AGREEMENT_CHANGE_CUE_LIMIT_DEFAULT,
) {
  if (typeof agreementId !== "string" || !UUID_PATTERN.test(agreementId)) {
    throw new TypeError("Agreement identifier is invalid");
  }
  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > AGREEMENT_CHANGE_CUE_LIMIT_MAX
  ) {
    throw new TypeError("Change cue limit is outside the allowed range");
  }
  return `/api/agreements/${agreementId}/change-cues?${
    new URLSearchParams({ limit: String(limit) }).toString()
  }`;
}

export function buildDecisionBriefDirectoryPath({
  minimumTopics = 3,
  kind = "",
  source = "",
  limit = 12,
  offset = 0,
} = {}) {
  if (
    !Number.isInteger(minimumTopics) || minimumTopics < 1 || minimumTopics > 5
  ) {
    throw new TypeError("Minimum topic count is outside the allowed range");
  }
  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > DECISION_BRIEF_DIRECTORY_PAGE_MAX
  ) {
    throw new TypeError(
      "Decision brief directory limit is outside the allowed range",
    );
  }
  if (
    !Number.isInteger(offset) ||
    offset < 0 ||
    offset > DECISION_BRIEF_DIRECTORY_OFFSET_MAX
  ) {
    throw new TypeError(
      "Decision brief directory offset is outside the allowed range",
    );
  }
  if (kind && !["contract", "amendment"].includes(kind)) {
    throw new TypeError("Decision brief document class is not supported");
  }
  const normalizedSource = typeof source === "string"
    ? source.trim().toLowerCase()
    : "";
  if (normalizedSource && !SOURCE_PATTERN.test(normalizedSource)) {
    throw new TypeError("Source slug is invalid");
  }
  const params = new URLSearchParams({
    minimum_topics: String(minimumTopics),
    limit: String(limit),
    offset: String(offset),
  });
  if (kind) params.set("kind", kind);
  if (normalizedSource) params.set("source", normalizedSource);
  return `/api/decision-briefs?${params.toString()}`;
}

export const AGREEMENT_DECISION_BRIEF_TOPICS = Object.freeze([
  Object.freeze({
    topicKey: "liability",
    label: "Limitation of liability",
    detectorVersion: "liability_position_rules_v1",
  }),
  Object.freeze({
    topicKey: "indemnity",
    label: "Indemnity",
    detectorVersion: "indemnity_position_rules_v1",
  }),
  Object.freeze({
    topicKey: "termination",
    label: "Termination",
    detectorVersion: "termination_position_rules_v2",
  }),
  Object.freeze({
    topicKey: "governing_law",
    label: "Governing law and forum",
    detectorVersion: "governing_law_position_rules_v1",
  }),
  Object.freeze({
    topicKey: "assignment",
    label: "Assignment and change of control",
    detectorVersion: "assignment_position_rules_v1",
  }),
]);

const AGREEMENT_DECISION_BRIEF_LIMITATIONS = Object.freeze([
  "This brief reports only positive deterministic wording matches from current versioned caches over the current observed extraction.",
  "Zero matches do not establish that a provision or commercial position is absent.",
  "Generated signals and attributes are navigation aids, not risk scores, legal conclusions or determinations of legal effect.",
  "Read the complete agreement, definitions, exceptions, amendments and related documents before relying on any example.",
  "Representative examples are selected from the first five document-order positive matches per topic, prioritizing more matched signals and then longer exact support; this is not a legal importance ranking.",
]);
const DECISION_BRIEF_HASH_PATTERN = /^[0-9a-f]{64}$/;
const DECISION_BRIEF_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DECISION_BRIEF_BASES = new Set(["observed", "reviewed", "generated"]);
const DECISION_BRIEF_DOCUMENT_KINDS = new Set(["contract", "amendment"]);
const AGREEMENT_CHANGE_CUE_DETECTOR = "agreement_change_cue_rules_v1";
const AGREEMENT_CHANGE_CUE_LABELS = Object.freeze({
  express_amendment_language: "Express amendment or modification wording",
  delete_and_replace_language: "Deletion and replacement wording",
  addition_or_insertion_language: "Addition or insertion wording",
  amended_and_restated_language: "Amended-and-restated wording",
  continuing_effect_language:
    "Continuing force-and-effect wording tied to amendment context",
  unchanged_terms_language: "Express unchanged-terms wording",
  amendment_effectiveness_language: "Express amendment effectiveness wording",
  no_waiver_or_novation_language: "No-waiver or no-novation wording",
});
const AGREEMENT_CHANGE_CUE_ORDER = new Map(
  Object.keys(AGREEMENT_CHANGE_CUE_LABELS).map((key, index) => [key, index]),
);
const AGREEMENT_CHANGE_CUE_LIMITATIONS = Object.freeze([
  "Cues are deterministic generated pattern matches over the current observed extraction; exact matched wording and bounded observed support are supplied separately.",
  "A cue does not identify which other document is changed and does not establish amendment direction, incorporation, supersession or legal effect.",
  "Only the first match for each supported rule in a clause is returned; the response may also be truncated by the requested cue limit.",
  "A missing cue does not establish that the agreement lacks change language, and text after the per-clause scan limit is not inspected.",
  "Read the complete instruments, definitions, schedules, incorporated terms and governing law before relying on a cue.",
]);
const AGREEMENT_CHANGE_CUE_EXACT_KEYS = Object.freeze({
  root: [
    "api_version",
    "agreement",
    "source",
    "cues",
    "coverage",
    "limits",
    "limitations",
  ],
  agreement: [
    "agreement_id",
    "family_key",
    "document_kind",
    "document_kind_basis",
    "title",
    "published_at",
    "artifact_sha256",
    "extraction_id",
    "extraction_method",
    "extraction_version",
    "extracted_text_sha256",
    "text_basis",
  ],
  source: [
    "slug",
    "name",
    "publisher",
    "source_url",
    "external_id",
    "observed_published_at",
  ],
  cue: [
    "cue_key",
    "label",
    "cue_basis",
    "confidence",
    "detector_version",
    "rule_id",
    "anchor_clause_id",
    "anchor_clause_sha256",
    "observed_evidence",
    "clause",
  ],
  clause: [
    "clause_id",
    "sequence",
    "heading",
    "observed_text_sha256",
    "page_start",
    "page_end",
    "document_char_start",
    "document_char_end",
  ],
  observedEvidence: [
    "excerpt",
    "sha256",
    "text_basis",
    "clause_char_start",
    "clause_char_end",
    "document_char_start",
    "document_char_end",
    "matched_text",
    "matched_text_sha256",
    "matched_clause_char_start",
    "matched_clause_char_end",
    "matched_document_char_start",
    "matched_document_char_end",
    "bounded_excerpt",
  ],
  coverage: [
    "current_clause_count",
    "candidate_clause_count",
    "matching_clause_count",
    "matched_cue_count",
    "returned_cue_count",
    "supported_rule_count",
    "clauses_truncated_for_scan",
  ],
  limits: [
    "maximum_returned_cues",
    "maximum_supported_limit",
    "maximum_clause_characters_scanned",
    "one_match_per_rule_per_clause",
    "cues_truncated",
    "positive_matches_only",
    "absence_is_not_evidence_of_absence",
    "change_target_identified",
    "amendment_direction_determined",
    "agreement_relationship_established",
    "legal_effect_determined",
  ],
});
const AMENDMENT_CHANGE_DIRECTORY_LIMITATIONS = Object.freeze([
  "This directory contains published amendment records with positive deterministic wording matches; it is not an exhaustive amendment inventory or market-prevalence measure.",
  "Counts reflect the selected cue and source filters. A missing record or cue does not establish absence, particularly where source text is OCR-corrupted.",
  "A cue does not identify which provision or document is changed and does not establish amendment direction, incorporation, supersession, novation or legal effect.",
  "Open the complete change-cue packet, underlying instrument and related documents before relying on a result.",
]);
const AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS = Object.freeze({
  root: [
    "api_version",
    "generated_at",
    "items",
    "page",
    "filters",
    "limits",
    "limitations",
  ],
  item: [
    "agreement",
    "source",
    "coverage",
    "cue_summary",
    "representative_cue",
    "full_change_cues_available",
  ],
  agreement: [...AGREEMENT_CHANGE_CUE_EXACT_KEYS.agreement, "title_truncated"],
  coverage: [
    "current_clause_count",
    "candidate_clause_count",
    "matching_clause_count",
    "matched_cue_count",
    "matched_cue_class_count",
    "clauses_truncated_for_scan",
  ],
  cueSummary: [
    "cue_key",
    "label",
    "matching_clause_count",
    "matched_cue_count",
  ],
  page: [
    "limit",
    "offset",
    "returned_count",
    "eligible_matching_amendments",
    "has_more",
  ],
  filters: ["cue_keys", "source_slugs", "document_kind"],
  limits: [
    "maximum_page_size",
    "maximum_offset",
    "maximum_supported_cue_filters",
    "maximum_supported_source_filters",
    "supported_rule_count",
    "maximum_clause_characters_scanned",
    "one_match_per_rule_per_clause",
    "one_representative_cue_per_agreement",
    "positive_matches_only",
    "full_evidence_revalidated_when_agreement_opens",
    "absence_is_not_evidence_of_absence",
    "change_target_identified",
    "amendment_direction_determined",
    "agreement_relationship_established",
    "legal_effect_determined",
  ],
});
const PARTY_CAPTURE_METHODS = new Set([
  "source_structured_metadata",
  "generated_extraction_with_observed_quote",
  "source_filing_metadata",
]);
const PARTY_RESOLUTION_STATUSES = new Set([
  "unresolved",
  "generated",
  "reviewed",
  "rejected",
]);
const PARTY_MATCH_KINDS = new Set(["exact", "prefix", "contains"]);
const DECISION_BRIEF_EXACT_KEYS = Object.freeze({
  root: [
    "api_version",
    "agreement",
    "source",
    "topics",
    "limits",
    "limitations",
  ],
  agreement: [
    "agreement_id",
    "family_key",
    "document_kind",
    "document_kind_basis",
    "title",
    "observed_execution_date",
    "observed_effective_date",
    "observed_termination_date",
    "agreement_date_selections",
    "published_at",
    "artifact_sha256",
    "extraction_id",
    "extraction_method",
    "extraction_version",
    "extraction_confidence",
    "extracted_text_sha256",
    "text_basis",
    "clause_count",
  ],
  source: [
    "slug",
    "name",
    "publisher",
    "source_url",
    "external_id",
    "observed_published_at",
    "observed_terms_url",
    "active",
    "publication_permitted",
    "redistribution_allowed",
  ],
  topic: [
    "topic_key",
    "label",
    "detector_version",
    "exact_matching_clause_count",
    "total_matches",
    "total_signal_matches",
    "returned_examples",
    "examples_truncated",
    "examples",
  ],
  example: [
    "clause_id",
    "clause_ordinal",
    "clause_heading",
    "page_start",
    "page_end",
    "clause_char_start",
    "clause_char_end",
    "source_url",
    "artifact_sha256",
    "extraction_sha256",
    "matched_signal_count",
    "signal_keys",
    "observed_evidence",
    "generated_signal",
  ],
  observedEvidence: [
    "excerpt",
    "sha256",
    "text_basis",
    "clause_char_start",
    "clause_char_end",
    "document_char_start",
    "document_char_end",
    "matched_text",
    "matched_text_sha256",
    "matched_clause_char_start",
    "matched_clause_char_end",
    "bounded_excerpt",
    "observed_duration_candidates",
    "observed_value_candidates",
  ],
  generatedSignal: [
    "signal_key",
    "label",
    "basis",
    "confidence",
    "detector_version",
    "rule_id",
    "attributes",
  ],
  limits: [
    "examples_per_topic",
    "example_candidate_window_per_topic",
    "example_selection_basis",
    "topics_returned",
    "positive_matches_only",
    "absence_is_not_evidence_of_absence",
    "risk_score_provided",
    "legal_effect_determined",
  ],
  dateSelection: [
    "basis",
    "observed_date",
    "evidence_id",
    "extraction_id",
    "rule_id",
  ],
});
const DECISION_BRIEF_SIGNAL_KEYS = Object.freeze({
  liability: new Set(LIABILITY_POSITION_SIGNAL_KEYS),
  indemnity: new Set(Object.keys(INDEMNITY_POSITION_SIGNALS)),
  termination: new Set(Object.keys(TERMINATION_POSITION_SIGNALS)),
  governing_law: new Set(Object.keys(GOVERNING_LAW_POSITION_SIGNALS)),
  assignment: new Set(Object.keys(ASSIGNMENT_POSITION_SIGNALS)),
});
const DECISION_BRIEF_ATTRIBUTE_KEYS = Object.freeze({
  liability: new Set([
    "currency_amount_present",
    "percentage_present",
    "fees_or_charges_basis_present",
    "greater_or_lesser_formula_present",
    "facially_bilateral_language_present",
    "indirect",
    "consequential",
    "special",
    "incidental",
    "exemplary",
    "punitive",
    "death_or_personal_injury",
    "fraud",
    "wilful_or_willful_misconduct",
  ]),
  indemnity: new Set([
    "facially_bilateral_language_present",
    "on_demand_language_present",
    "losses_language_present",
    "liability_cap_reference_present",
    "insurance_language_present",
    "negligence_or_misconduct_language_present",
  ]),
  termination: new Set([
    "duration_candidate_present",
    "notice_language_present",
    "facially_bilateral_language_present",
  ]),
  governing_law: new Set([
    "exclusive_jurisdiction_language_present",
    "nonexclusive_jurisdiction_language_present",
    "conflict_of_laws_language_present",
    "venue_objection_waiver_language_present",
    "service_of_process_language_present",
    "arbitration_language_present",
  ]),
  assignment: new Set([
    "consent_language_present",
    "notice_language_present",
    "termination_language_present",
    "facially_bilateral_language_present",
    "finance_context_present",
    "change_of_control_language_present",
  ]),
});

function hasExactKeys(value, expectedKeys) {
  if (!isRecord(value)) return false;
  const actualKeys = Object.keys(value);
  return actualKeys.length === expectedKeys.length &&
    expectedKeys.every((key) => Object.hasOwn(value, key));
}

function decisionBriefInteger(value, minimum = 0) {
  return Number.isSafeInteger(value) && value >= minimum ? value : null;
}

function decisionBriefString(value, maximum, nullable = false) {
  if (nullable && value === null) return null;
  if (
    typeof value !== "string" ||
    !value.trim() ||
    Array.from(value).length > maximum
  ) {
    return undefined;
  }
  return value;
}

function isDecisionBriefDate(value) {
  if (value === null) return true;
  if (typeof value !== "string") return false;
  const match = DECISION_BRIEF_DATE_PATTERN.exec(value);
  if (!match) return false;
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  return month >= 1 && month <= 12 && day >= 1 &&
    day <= new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function decisionBriefDateSelections(value, agreement) {
  if (!isRecord(value)) return null;
  const allowedTypes = ["execution", "effective", "termination"];
  if (Object.keys(value).some((key) => !allowedTypes.includes(key))) {
    return null;
  }
  const selections = {};
  for (const dateType of allowedTypes) {
    const dateValue = agreement[`observed_${dateType}_date`];
    const hasSelection = Object.hasOwn(value, dateType);
    if (dateValue === null) {
      if (hasSelection) return null;
      continue;
    }
    if (!hasSelection) continue;
    const selection = record(value[dateType]);
    if (
      !hasExactKeys(selection, DECISION_BRIEF_EXACT_KEYS.dateSelection) ||
      selection.basis !== "generated" ||
      selection.observed_date !== dateValue ||
      typeof selection.evidence_id !== "string" ||
      !UUID_PATTERN.test(selection.evidence_id) ||
      selection.extraction_id !== agreement.extraction_id ||
      decisionBriefString(selection.rule_id, 300) === undefined
    ) {
      return null;
    }
    selections[dateType] = { ...selection };
  }
  return selections;
}

function decisionBriefSpan(
  start,
  end,
  { minimum = 0, allowEqual = false } = {},
) {
  if (start === null && end === null) return true;
  return Number.isSafeInteger(start) && Number.isSafeInteger(end) &&
    start >= minimum && (allowEqual ? end >= start : end > start);
}

function decisionBriefObservedCandidate(value) {
  const candidate = record(value);
  const keys = [
    "observed_text",
    "text_basis",
    "sha256",
    "clause_char_start",
    "clause_char_end",
    "document_char_start",
    "document_char_end",
  ];
  if (
    !hasExactKeys(candidate, keys) ||
    decisionBriefString(candidate.observed_text, 2_000) === undefined ||
    candidate.text_basis !== "observed" ||
    !DECISION_BRIEF_HASH_PATTERN.test(candidate.sha256) ||
    !decisionBriefSpan(
      candidate.clause_char_start,
      candidate.clause_char_end,
    ) ||
    !decisionBriefSpan(
      candidate.document_char_start,
      candidate.document_char_end,
    ) ||
    Array.from(candidate.observed_text).length !==
      candidate.clause_char_end - candidate.clause_char_start
  ) {
    return null;
  }
  return { ...candidate };
}

function decisionBriefObservedWindow(value, maximumText = 12_000) {
  if (value === null) return null;
  const window = record(value);
  const keys = [
    "text",
    "text_basis",
    "sha256",
    "clause_char_start",
    "clause_char_end",
    "document_char_start",
    "document_char_end",
  ];
  if (
    !hasExactKeys(window, keys) ||
    decisionBriefString(window.text, maximumText) === undefined ||
    window.text_basis !== "observed" ||
    !DECISION_BRIEF_HASH_PATTERN.test(window.sha256) ||
    !decisionBriefSpan(window.clause_char_start, window.clause_char_end) ||
    !decisionBriefSpan(window.document_char_start, window.document_char_end) ||
    Array.from(window.text).length !==
      window.clause_char_end - window.clause_char_start
  ) {
    return undefined;
  }
  return { ...window };
}

function decisionBriefDurationCandidates(value, topicKey) {
  if (value === null) return null;
  if (topicKey !== "termination") return undefined;
  const packet = record(value);
  const keys = [
    "schema",
    "value_extractor_version",
    "observed_window",
    "duration_terms",
    "limits",
  ];
  const limits = record(packet.limits);
  if (
    !hasExactKeys(packet, keys) ||
    packet.schema !== "esheria.termination-duration-candidates.v1" ||
    packet.value_extractor_version !== "termination_duration_candidates_v1" ||
    !hasExactKeys(limits, [
      "maximum_candidates",
      "candidate_values_are_legal_conclusions",
      "window_scope",
    ]) ||
    limits.maximum_candidates !== 4 ||
    limits.candidate_values_are_legal_conclusions !== false ||
    limits.window_scope !== "bounded_signal_support" ||
    !Array.isArray(packet.duration_terms) ||
    packet.duration_terms.length > 4
  ) {
    return undefined;
  }
  const observedWindow = decisionBriefObservedWindow(packet.observed_window);
  if (observedWindow === undefined || observedWindow === null) return undefined;
  const durationTerms = packet.duration_terms.map(
    decisionBriefObservedCandidate,
  );
  if (durationTerms.some((candidate) => candidate === null)) return undefined;
  return {
    schema: packet.schema,
    value_extractor_version: packet.value_extractor_version,
    observed_window: observedWindow,
    duration_terms: durationTerms,
    limits: { ...limits },
  };
}

function decisionBriefValueCandidates(value, topicKey, signalKey) {
  if (value === null) return null;
  if (
    topicKey !== "liability" ||
    signalKey !== "explicit_liability_limit_formula"
  ) {
    return undefined;
  }
  const packet = record(value);
  const categories = LIABILITY_VALUE_CANDIDATE_CATEGORIES.map(([key]) => key);
  const keys = [
    "schema",
    "value_extractor_version",
    "observed_window",
    ...categories,
    "limits",
  ];
  const limits = record(packet.limits);
  if (
    !hasExactKeys(packet, keys) ||
    packet.schema !== "esheria.liability-cap-value-candidates.v2" ||
    packet.value_extractor_version !== "liability_cap_value_candidates_v2" ||
    !hasExactKeys(limits, [
      "maximum_candidates_per_category",
      "candidate_values_are_legal_conclusions",
      "window_scope",
      "maximum_signal_context_after_characters",
    ]) ||
    limits.maximum_candidates_per_category !== 8 ||
    limits.candidate_values_are_legal_conclusions !== false ||
    limits.window_scope !==
      "from_detected_formula_through_complete_bounded_signal_support" ||
    limits.maximum_signal_context_after_characters !== 300
  ) {
    return undefined;
  }
  const observedWindow = decisionBriefObservedWindow(packet.observed_window);
  if (observedWindow === undefined || observedWindow === null) return undefined;
  const projected = {};
  for (const category of categories) {
    if (!Array.isArray(packet[category]) || packet[category].length > 8) {
      return undefined;
    }
    const candidates = packet[category].map(decisionBriefObservedCandidate);
    if (candidates.some((candidate) => candidate === null)) return undefined;
    projected[category] = candidates;
  }
  return {
    schema: packet.schema,
    value_extractor_version: packet.value_extractor_version,
    observed_window: observedWindow,
    ...projected,
    limits: { ...limits },
  };
}

function decisionBriefAttributes(value, topicKey) {
  const attributes = record(value);
  const allowedKeys = DECISION_BRIEF_ATTRIBUTE_KEYS[topicKey];
  const keys = Object.keys(attributes);
  if (
    !allowedKeys ||
    keys.length > allowedKeys.size ||
    keys.some((key) => !allowedKeys.has(key)) ||
    keys.some((key) => typeof attributes[key] !== "boolean")
  ) {
    return null;
  }
  return Object.fromEntries(keys.sort().map((key) => [key, attributes[key]]));
}

function decisionBriefExample(
  value,
  topic,
  agreement,
  sourceUrl,
) {
  const example = record(value);
  const observed = record(example.observed_evidence);
  const generated = record(example.generated_signal);
  const allowedSignalKeys = DECISION_BRIEF_SIGNAL_KEYS[topic.topicKey];
  const matchedSignalCount = decisionBriefInteger(
    example.matched_signal_count,
    1,
  );
  const attributes = decisionBriefAttributes(
    generated.attributes,
    topic.topicKey,
  );
  const durationCandidates = decisionBriefDurationCandidates(
    observed.observed_duration_candidates,
    topic.topicKey,
  );
  const valueCandidates = decisionBriefValueCandidates(
    observed.observed_value_candidates,
    topic.topicKey,
    generated.signal_key,
  );
  const exampleSourceUrl = safeExternalUrl(example.source_url);
  const heading = decisionBriefString(example.clause_heading, 2_000, true);
  const excerpt = decisionBriefString(observed.excerpt, 12_000);
  const matchedText = decisionBriefString(observed.matched_text, 4_000);
  if (
    !hasExactKeys(example, DECISION_BRIEF_EXACT_KEYS.example) ||
    !hasExactKeys(observed, DECISION_BRIEF_EXACT_KEYS.observedEvidence) ||
    !hasExactKeys(generated, DECISION_BRIEF_EXACT_KEYS.generatedSignal) ||
    typeof example.clause_id !== "string" ||
    !UUID_PATTERN.test(example.clause_id) ||
    decisionBriefInteger(example.clause_ordinal, 1) === null ||
    heading === undefined ||
    !decisionBriefSpan(example.page_start, example.page_end, {
      minimum: 1,
      allowEqual: true,
    }) ||
    !decisionBriefSpan(example.clause_char_start, example.clause_char_end) ||
    exampleSourceUrl === null ||
    exampleSourceUrl !== sourceUrl ||
    example.artifact_sha256 !== agreement.artifact_sha256 ||
    example.extraction_sha256 !== agreement.extracted_text_sha256 ||
    matchedSignalCount === null ||
    !Array.isArray(example.signal_keys) ||
    example.signal_keys.length !== matchedSignalCount ||
    new Set(example.signal_keys).size !== example.signal_keys.length ||
    example.signal_keys.some((key) => !allowedSignalKeys.has(key)) ||
    excerpt === undefined ||
    observed.text_basis !== "observed" ||
    !DECISION_BRIEF_HASH_PATTERN.test(observed.sha256) ||
    !decisionBriefSpan(observed.clause_char_start, observed.clause_char_end) ||
    !decisionBriefSpan(
      observed.document_char_start,
      observed.document_char_end,
    ) ||
    matchedText === undefined ||
    !DECISION_BRIEF_HASH_PATTERN.test(observed.matched_text_sha256) ||
    !decisionBriefSpan(
      observed.matched_clause_char_start,
      observed.matched_clause_char_end,
    ) ||
    observed.bounded_excerpt !== true ||
    Array.from(observed.excerpt).length !==
      observed.clause_char_end - observed.clause_char_start ||
    Array.from(observed.matched_text).length !==
      observed.matched_clause_char_end - observed.matched_clause_char_start ||
    observed.matched_clause_char_start < observed.clause_char_start ||
    observed.matched_clause_char_end > observed.clause_char_end ||
    Array.from(observed.excerpt).slice(
        observed.matched_clause_char_start - observed.clause_char_start,
        observed.matched_clause_char_end - observed.clause_char_start,
      ).join("") !== observed.matched_text ||
    (example.clause_char_start === null
      ? observed.document_char_start !== null ||
        observed.document_char_end !== null
      : observed.clause_char_end >
          example.clause_char_end - example.clause_char_start ||
        observed.document_char_start !==
          example.clause_char_start + observed.clause_char_start ||
        observed.document_char_end !==
          example.clause_char_start + observed.clause_char_end) ||
    generated.basis !== "generated" ||
    !allowedSignalKeys.has(generated.signal_key) ||
    !example.signal_keys.includes(generated.signal_key) ||
    decisionBriefString(generated.label, 300) === undefined ||
    typeof generated.confidence !== "number" ||
    !Number.isFinite(generated.confidence) ||
    generated.confidence < 0 ||
    generated.confidence > 1 ||
    generated.detector_version !== topic.detectorVersion ||
    decisionBriefString(generated.rule_id, 300) === undefined ||
    attributes === null ||
    durationCandidates === undefined ||
    valueCandidates === undefined
  ) {
    return null;
  }
  return {
    clause_id: example.clause_id,
    clause_ordinal: example.clause_ordinal,
    clause_heading: heading,
    page_start: example.page_start,
    page_end: example.page_end,
    clause_char_start: example.clause_char_start,
    clause_char_end: example.clause_char_end,
    source_url: exampleSourceUrl,
    artifact_sha256: example.artifact_sha256,
    extraction_sha256: example.extraction_sha256,
    matched_signal_count: matchedSignalCount,
    signal_keys: [...example.signal_keys],
    observed_evidence: {
      excerpt,
      sha256: observed.sha256,
      text_basis: observed.text_basis,
      clause_char_start: observed.clause_char_start,
      clause_char_end: observed.clause_char_end,
      document_char_start: observed.document_char_start,
      document_char_end: observed.document_char_end,
      matched_text: matchedText,
      matched_text_sha256: observed.matched_text_sha256,
      matched_clause_char_start: observed.matched_clause_char_start,
      matched_clause_char_end: observed.matched_clause_char_end,
      bounded_excerpt: true,
      observed_duration_candidates: durationCandidates,
      observed_value_candidates: valueCandidates,
    },
    generated_signal: {
      signal_key: generated.signal_key,
      label: generated.label,
      basis: generated.basis,
      confidence: generated.confidence,
      detector_version: generated.detector_version,
      rule_id: generated.rule_id,
      attributes,
    },
  };
}

export function agreementDecisionBriefEvidence(
  value,
  expectedAgreementId,
  expectedExamplesPerTopic = AGREEMENT_DECISION_BRIEF_EXAMPLES_DEFAULT,
) {
  if (
    typeof expectedAgreementId !== "string" ||
    !UUID_PATTERN.test(expectedAgreementId) ||
    !Number.isInteger(expectedExamplesPerTopic) ||
    expectedExamplesPerTopic < 1 ||
    expectedExamplesPerTopic > AGREEMENT_DECISION_BRIEF_EXAMPLES_MAX
  ) {
    return null;
  }
  const root = record(value);
  const agreement = record(root.agreement);
  const source = record(root.source);
  const limits = record(root.limits);
  const sourceUrl = safeExternalUrl(source.source_url);
  const termsUrl = source.observed_terms_url === null
    ? null
    : safeExternalUrl(source.observed_terms_url);
  const familyKey = decisionBriefString(agreement.family_key, 300, true);
  const title = decisionBriefString(agreement.title, 2_000, true);
  const publisher = decisionBriefString(source.publisher, 300, true);
  const dateSelections = decisionBriefDateSelections(
    agreement.agreement_date_selections,
    agreement,
  );
  if (
    !hasExactKeys(root, DECISION_BRIEF_EXACT_KEYS.root) ||
    root.api_version !== "agreement-decision-brief-v2" ||
    !hasExactKeys(agreement, DECISION_BRIEF_EXACT_KEYS.agreement) ||
    agreement.agreement_id !== expectedAgreementId ||
    familyKey === undefined ||
    !DECISION_BRIEF_DOCUMENT_KINDS.has(agreement.document_kind) ||
    !DECISION_BRIEF_BASES.has(agreement.document_kind_basis) ||
    title === undefined ||
    !isDecisionBriefDate(agreement.observed_execution_date) ||
    !isDecisionBriefDate(agreement.observed_effective_date) ||
    !isDecisionBriefDate(agreement.observed_termination_date) ||
    dateSelections === null ||
    !isValidFamilyTimestamp(agreement.published_at) ||
    !DECISION_BRIEF_HASH_PATTERN.test(agreement.artifact_sha256) ||
    typeof agreement.extraction_id !== "string" ||
    !UUID_PATTERN.test(agreement.extraction_id) ||
    decisionBriefString(agreement.extraction_method, 100) === undefined ||
    decisionBriefString(agreement.extraction_version, 100) === undefined ||
    !(
      agreement.extraction_confidence === null ||
      (typeof agreement.extraction_confidence === "number" &&
        Number.isFinite(agreement.extraction_confidence) &&
        agreement.extraction_confidence >= 0 &&
        agreement.extraction_confidence <= 1)
    ) ||
    !DECISION_BRIEF_HASH_PATTERN.test(agreement.extracted_text_sha256) ||
    agreement.text_basis !== "observed" ||
    decisionBriefInteger(agreement.clause_count) === null ||
    !hasExactKeys(source, DECISION_BRIEF_EXACT_KEYS.source) ||
    typeof source.slug !== "string" ||
    !SOURCE_PATTERN.test(source.slug) ||
    decisionBriefString(source.name, 300) === undefined ||
    publisher === undefined ||
    sourceUrl === null ||
    decisionBriefString(source.external_id, 1_000) === undefined ||
    !(
      source.observed_published_at === null ||
      isValidFamilyTimestamp(source.observed_published_at)
    ) ||
    (source.observed_terms_url !== null && termsUrl === null) ||
    source.active !== true ||
    source.publication_permitted !== true ||
    source.redistribution_allowed !== true ||
    !hasExactKeys(limits, DECISION_BRIEF_EXACT_KEYS.limits) ||
    limits.examples_per_topic !== expectedExamplesPerTopic ||
    limits.example_candidate_window_per_topic !== 5 ||
    limits.example_selection_basis !==
      "validated_positive_signal_count_then_excerpt_length_v1" ||
    limits.topics_returned !== AGREEMENT_DECISION_BRIEF_TOPICS.length ||
    limits.positive_matches_only !== true ||
    limits.absence_is_not_evidence_of_absence !== true ||
    limits.risk_score_provided !== false ||
    limits.legal_effect_determined !== false ||
    !Array.isArray(root.limitations) ||
    root.limitations.length !== AGREEMENT_DECISION_BRIEF_LIMITATIONS.length ||
    root.limitations.some(
      (limitation, index) =>
        limitation !== AGREEMENT_DECISION_BRIEF_LIMITATIONS[index],
    ) ||
    !Array.isArray(root.topics) ||
    root.topics.length !== AGREEMENT_DECISION_BRIEF_TOPICS.length
  ) {
    return null;
  }

  const projectedAgreement = {
    ...agreement,
    family_key: familyKey,
    title,
    agreement_date_selections: dateSelections,
  };
  const topics = [];
  for (
    let index = 0;
    index < AGREEMENT_DECISION_BRIEF_TOPICS.length;
    index += 1
  ) {
    const expectedTopic = AGREEMENT_DECISION_BRIEF_TOPICS[index];
    const topic = record(root.topics[index]);
    const exactCount = decisionBriefInteger(topic.exact_matching_clause_count);
    const totalMatches = decisionBriefInteger(topic.total_matches);
    const totalSignalMatches = decisionBriefInteger(topic.total_signal_matches);
    const returnedExamples = decisionBriefInteger(topic.returned_examples);
    if (
      !hasExactKeys(topic, DECISION_BRIEF_EXACT_KEYS.topic) ||
      topic.topic_key !== expectedTopic.topicKey ||
      topic.label !== expectedTopic.label ||
      topic.detector_version !== expectedTopic.detectorVersion ||
      exactCount === null ||
      totalMatches === null ||
      totalSignalMatches === null ||
      returnedExamples === null ||
      exactCount !== totalMatches ||
      totalSignalMatches < totalMatches ||
      (totalMatches === 0 && totalSignalMatches !== 0) ||
      returnedExamples !== Math.min(totalMatches, expectedExamplesPerTopic) ||
      topic.examples_truncated !== (totalMatches > expectedExamplesPerTopic) ||
      !Array.isArray(topic.examples) ||
      topic.examples.length !== returnedExamples
    ) {
      return null;
    }
    const examples = topic.examples.map((example) =>
      decisionBriefExample(
        example,
        expectedTopic,
        projectedAgreement,
        sourceUrl,
      )
    );
    if (examples.some((example) => example === null)) return null;
    let previousExample = null;
    for (const example of examples) {
      if (previousExample !== null) {
        const previousLength = Array.from(
          previousExample.observed_evidence.excerpt,
        ).length;
        const currentLength = Array.from(
          example.observed_evidence.excerpt,
        ).length;
        if (
          previousExample.matched_signal_count < example.matched_signal_count ||
          (previousExample.matched_signal_count ===
              example.matched_signal_count &&
            previousLength < currentLength) ||
          (previousExample.matched_signal_count ===
              example.matched_signal_count &&
            previousLength === currentLength &&
            previousExample.clause_ordinal > example.clause_ordinal) ||
          (previousExample.matched_signal_count ===
              example.matched_signal_count &&
            previousLength === currentLength &&
            previousExample.clause_ordinal === example.clause_ordinal &&
            previousExample.clause_id >= example.clause_id)
        ) {
          return null;
        }
      }
      previousExample = example;
    }
    const returnedSignalMatches = examples.reduce(
      (sum, example) => sum + example.matched_signal_count,
      0,
    );
    if (
      returnedSignalMatches > totalSignalMatches ||
      (!topic.examples_truncated &&
        returnedSignalMatches !== totalSignalMatches)
    ) {
      return null;
    }
    topics.push({
      topic_key: topic.topic_key,
      label: topic.label,
      detector_version: topic.detector_version,
      exact_matching_clause_count: exactCount,
      total_matches: totalMatches,
      total_signal_matches: totalSignalMatches,
      returned_examples: returnedExamples,
      examples_truncated: topic.examples_truncated,
      examples,
    });
  }

  return {
    api_version: root.api_version,
    agreement: projectedAgreement,
    source: {
      ...source,
      publisher,
      source_url: sourceUrl,
      observed_terms_url: termsUrl,
    },
    topics,
    limits: { ...limits },
    limitations: [...root.limitations],
  };
}

export function agreementChangeCueEvidence(
  value,
  expectedAgreementId,
  expectedLimit = AGREEMENT_CHANGE_CUE_LIMIT_DEFAULT,
) {
  if (
    typeof expectedAgreementId !== "string" ||
    !UUID_PATTERN.test(expectedAgreementId) ||
    !Number.isInteger(expectedLimit) ||
    expectedLimit < 1 ||
    expectedLimit > AGREEMENT_CHANGE_CUE_LIMIT_MAX
  ) {
    return null;
  }

  const root = record(value);
  const agreement = record(root.agreement);
  const source = record(root.source);
  const coverage = record(root.coverage);
  const limits = record(root.limits);
  const familyKey = decisionBriefString(agreement.family_key, 300, true);
  const title = decisionBriefString(agreement.title, 2_000, true);
  const publisher = decisionBriefString(source.publisher, 300, true);
  const sourceUrl = safeExternalUrl(source.source_url);
  const currentClauseCount = decisionBriefInteger(
    coverage.current_clause_count,
  );
  const candidateClauseCount = decisionBriefInteger(
    coverage.candidate_clause_count,
  );
  const matchingClauseCount = decisionBriefInteger(
    coverage.matching_clause_count,
  );
  const matchedCueCount = decisionBriefInteger(coverage.matched_cue_count);
  const returnedCueCount = decisionBriefInteger(coverage.returned_cue_count);
  const truncatedClauseCount = decisionBriefInteger(
    coverage.clauses_truncated_for_scan,
  );

  if (
    !hasExactKeys(root, AGREEMENT_CHANGE_CUE_EXACT_KEYS.root) ||
    root.api_version !== "agreement-change-cues-v1" ||
    !hasExactKeys(agreement, AGREEMENT_CHANGE_CUE_EXACT_KEYS.agreement) ||
    agreement.agreement_id !== expectedAgreementId ||
    familyKey === undefined ||
    !DECISION_BRIEF_DOCUMENT_KINDS.has(agreement.document_kind) ||
    !DECISION_BRIEF_BASES.has(agreement.document_kind_basis) ||
    title === undefined ||
    !isValidFamilyTimestamp(agreement.published_at) ||
    !DECISION_BRIEF_HASH_PATTERN.test(agreement.artifact_sha256) ||
    typeof agreement.extraction_id !== "string" ||
    !UUID_PATTERN.test(agreement.extraction_id) ||
    decisionBriefString(agreement.extraction_method, 100) === undefined ||
    decisionBriefString(agreement.extraction_version, 100) === undefined ||
    !DECISION_BRIEF_HASH_PATTERN.test(agreement.extracted_text_sha256) ||
    agreement.text_basis !== "observed" ||
    !hasExactKeys(source, AGREEMENT_CHANGE_CUE_EXACT_KEYS.source) ||
    typeof source.slug !== "string" ||
    !SOURCE_PATTERN.test(source.slug) ||
    decisionBriefString(source.name, 300) === undefined ||
    publisher === undefined ||
    sourceUrl === null ||
    new URL(sourceUrl).protocol !== "https:" ||
    decisionBriefString(source.external_id, 1_000) === undefined ||
    !(
      source.observed_published_at === null ||
      isValidFamilyTimestamp(source.observed_published_at)
    ) ||
    !hasExactKeys(coverage, AGREEMENT_CHANGE_CUE_EXACT_KEYS.coverage) ||
    currentClauseCount === null ||
    candidateClauseCount === null ||
    matchingClauseCount === null ||
    matchedCueCount === null ||
    returnedCueCount === null ||
    coverage.supported_rule_count !==
      Object.keys(AGREEMENT_CHANGE_CUE_LABELS).length ||
    truncatedClauseCount === null ||
    candidateClauseCount > currentClauseCount ||
    matchingClauseCount > candidateClauseCount ||
    matchingClauseCount > matchedCueCount ||
    truncatedClauseCount > currentClauseCount ||
    returnedCueCount !== Math.min(matchedCueCount, expectedLimit) ||
    !hasExactKeys(limits, AGREEMENT_CHANGE_CUE_EXACT_KEYS.limits) ||
    limits.maximum_returned_cues !== expectedLimit ||
    limits.maximum_supported_limit !== AGREEMENT_CHANGE_CUE_LIMIT_MAX ||
    limits.maximum_clause_characters_scanned !== 500_000 ||
    limits.one_match_per_rule_per_clause !== true ||
    limits.cues_truncated !== (matchedCueCount > expectedLimit) ||
    limits.positive_matches_only !== true ||
    limits.absence_is_not_evidence_of_absence !== true ||
    limits.change_target_identified !== false ||
    limits.amendment_direction_determined !== false ||
    limits.agreement_relationship_established !== false ||
    limits.legal_effect_determined !== false ||
    !Array.isArray(root.limitations) ||
    root.limitations.length !== AGREEMENT_CHANGE_CUE_LIMITATIONS.length ||
    root.limitations.some(
      (limitation, index) =>
        limitation !== AGREEMENT_CHANGE_CUE_LIMITATIONS[index],
    ) ||
    !Array.isArray(root.cues) ||
    root.cues.length !== returnedCueCount
  ) {
    return null;
  }

  const cues = [];
  const cueIdentities = new Set();
  let previousSequence = -1;
  let previousRuleOrdinal = -1;
  for (const cueValue of root.cues) {
    const cue = record(cueValue);
    const clause = record(cue.clause);
    const observed = record(cue.observed_evidence);
    const cueOrdinal = AGREEMENT_CHANGE_CUE_ORDER.get(cue.cue_key);
    const clauseSequence = decisionBriefInteger(clause.sequence, 1);
    const clauseHeading = decisionBriefString(clause.heading, 2_000, true);
    const pageSpanValid = decisionBriefSpan(
      clause.page_start,
      clause.page_end,
      { minimum: 0, allowEqual: true },
    );
    const clauseDocumentSpanValid = decisionBriefSpan(
      clause.document_char_start,
      clause.document_char_end,
    );
    const excerpt = decisionBriefString(observed.excerpt, 2_000);
    const matchedText = decisionBriefString(observed.matched_text, 800);
    const supportSpanValid = decisionBriefSpan(
      observed.clause_char_start,
      observed.clause_char_end,
    );
    const matchSpanValid = decisionBriefSpan(
      observed.matched_clause_char_start,
      observed.matched_clause_char_end,
    );
    const evidenceDocumentSpanValid = decisionBriefSpan(
      observed.document_char_start,
      observed.document_char_end,
    );
    const matchDocumentSpanValid = decisionBriefSpan(
      observed.matched_document_char_start,
      observed.matched_document_char_end,
    );
    const identity = `${clause.clause_id}:${cue.cue_key}`;

    if (
      !hasExactKeys(cue, AGREEMENT_CHANGE_CUE_EXACT_KEYS.cue) ||
      cueOrdinal === undefined ||
      cue.label !== AGREEMENT_CHANGE_CUE_LABELS[cue.cue_key] ||
      cue.cue_basis !== "generated" ||
      typeof cue.confidence !== "number" ||
      !Number.isFinite(cue.confidence) ||
      cue.confidence < 0 ||
      cue.confidence > 1 ||
      cue.detector_version !== AGREEMENT_CHANGE_CUE_DETECTOR ||
      cue.rule_id !== `${cue.cue_key}_v1` ||
      typeof cue.anchor_clause_id !== "string" ||
      !UUID_PATTERN.test(cue.anchor_clause_id) ||
      !DECISION_BRIEF_HASH_PATTERN.test(cue.anchor_clause_sha256) ||
      !hasExactKeys(clause, AGREEMENT_CHANGE_CUE_EXACT_KEYS.clause) ||
      clause.clause_id !== cue.anchor_clause_id ||
      !UUID_PATTERN.test(clause.clause_id) ||
      clauseSequence === null ||
      clauseHeading === undefined ||
      !DECISION_BRIEF_HASH_PATTERN.test(clause.observed_text_sha256) ||
      clause.observed_text_sha256 !== cue.anchor_clause_sha256 ||
      !pageSpanValid ||
      !clauseDocumentSpanValid ||
      !hasExactKeys(
        observed,
        AGREEMENT_CHANGE_CUE_EXACT_KEYS.observedEvidence,
      ) ||
      excerpt === undefined ||
      matchedText === undefined ||
      observed.text_basis !== "observed" ||
      !DECISION_BRIEF_HASH_PATTERN.test(observed.sha256) ||
      !DECISION_BRIEF_HASH_PATTERN.test(observed.matched_text_sha256) ||
      !supportSpanValid ||
      !matchSpanValid ||
      !evidenceDocumentSpanValid ||
      !matchDocumentSpanValid ||
      observed.matched_clause_char_start < observed.clause_char_start ||
      observed.matched_clause_char_end > observed.clause_char_end ||
      Array.from(excerpt).length !==
        observed.clause_char_end - observed.clause_char_start ||
      Array.from(matchedText).length !==
        observed.matched_clause_char_end -
          observed.matched_clause_char_start ||
      Array.from(excerpt).slice(
          observed.matched_clause_char_start - observed.clause_char_start,
          observed.matched_clause_char_end - observed.clause_char_start,
        ).join("") !== matchedText ||
      observed.bounded_excerpt !== true ||
      cueIdentities.has(identity) ||
      clauseSequence < previousSequence ||
      (clauseSequence === previousSequence && cueOrdinal <= previousRuleOrdinal)
    ) {
      return null;
    }

    const hasDocumentOffsets = clause.document_char_start !== null;
    if (
      hasDocumentOffsets !== (clause.document_char_end !== null) ||
      hasDocumentOffsets !== (observed.document_char_start !== null) ||
      hasDocumentOffsets !== (observed.document_char_end !== null) ||
      hasDocumentOffsets !==
        (observed.matched_document_char_start !== null) ||
      hasDocumentOffsets !== (observed.matched_document_char_end !== null) ||
      (hasDocumentOffsets &&
        (
          observed.document_char_start !==
            clause.document_char_start + observed.clause_char_start ||
          observed.document_char_end !==
            clause.document_char_start + observed.clause_char_end ||
          observed.matched_document_char_start !==
            clause.document_char_start +
              observed.matched_clause_char_start ||
          observed.matched_document_char_end !==
            clause.document_char_start + observed.matched_clause_char_end ||
          observed.document_char_end > clause.document_char_end
        ))
    ) {
      return null;
    }

    cueIdentities.add(identity);
    previousSequence = clauseSequence;
    previousRuleOrdinal = cueOrdinal;
    cues.push({
      ...cue,
      clause: { ...clause, heading: clauseHeading },
      observed_evidence: {
        ...observed,
        excerpt,
        matched_text: matchedText,
      },
    });
  }

  const returnedMatchingClauseCount = new Set(
    cues.map((cue) => cue.clause.clause_id),
  ).size;
  if (
    returnedMatchingClauseCount > matchingClauseCount ||
    (!limits.cues_truncated &&
      returnedMatchingClauseCount !== matchingClauseCount)
  ) {
    return null;
  }

  return {
    api_version: root.api_version,
    agreement: { ...agreement, family_key: familyKey, title },
    source: { ...source, publisher, source_url: sourceUrl },
    cues,
    coverage: { ...coverage },
    limits: { ...limits },
    limitations: [...root.limitations],
  };
}

export function amendmentChangeDirectoryEvidence(value, expected = {}) {
  let normalizedPath;
  try {
    normalizedPath = buildAmendmentChangeDirectoryPath(expected);
  } catch {
    return null;
  }
  const expectedParams = new URL(
    normalizedPath,
    "https://route.invalid",
  ).searchParams;
  const expectedCueKeys = expectedParams.getAll("cue");
  const expectedSourceSlugs = expectedParams.getAll("source");
  const expectedLimit = Number(expectedParams.get("limit"));
  const expectedOffset = Number(expectedParams.get("offset"));

  const root = record(value);
  const page = record(root.page);
  const filters = record(root.filters);
  const limits = record(root.limits);
  const returnedCount = decisionBriefInteger(page.returned_count);
  const eligibleCount = decisionBriefInteger(
    page.eligible_matching_amendments,
  );
  if (
    !hasExactKeys(root, AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS.root) ||
    root.api_version !== "amendment-change-directory-v1" ||
    !isValidFamilyTimestamp(root.generated_at) ||
    !Array.isArray(root.items) ||
    !hasExactKeys(page, AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS.page) ||
    page.limit !== expectedLimit ||
    page.offset !== expectedOffset ||
    returnedCount === null ||
    returnedCount !== root.items.length ||
    returnedCount > expectedLimit ||
    eligibleCount === null ||
    page.has_more !== expectedOffset + returnedCount < eligibleCount ||
    returnedCount !==
      (expectedOffset >= eligibleCount
        ? 0
        : Math.min(expectedLimit, eligibleCount - expectedOffset)) ||
    !hasExactKeys(filters, AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS.filters) ||
    !Array.isArray(filters.cue_keys) ||
    !Array.isArray(filters.source_slugs) ||
    JSON.stringify(filters.cue_keys) !== JSON.stringify(expectedCueKeys) ||
    JSON.stringify(filters.source_slugs) !==
      JSON.stringify(expectedSourceSlugs) ||
    filters.document_kind !== "amendment" ||
    !hasExactKeys(limits, AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS.limits) ||
    limits.maximum_page_size !== AMENDMENT_CHANGE_DIRECTORY_PAGE_MAX ||
    limits.maximum_offset !== AMENDMENT_CHANGE_DIRECTORY_OFFSET_MAX ||
    limits.maximum_supported_cue_filters !== 8 ||
    limits.maximum_supported_source_filters !== 25 ||
    limits.supported_rule_count !== 8 ||
    limits.maximum_clause_characters_scanned !== 500_000 ||
    limits.one_match_per_rule_per_clause !== true ||
    limits.one_representative_cue_per_agreement !== true ||
    limits.positive_matches_only !== true ||
    limits.full_evidence_revalidated_when_agreement_opens !== true ||
    limits.absence_is_not_evidence_of_absence !== true ||
    limits.change_target_identified !== false ||
    limits.amendment_direction_determined !== false ||
    limits.agreement_relationship_established !== false ||
    limits.legal_effect_determined !== false ||
    !Array.isArray(root.limitations) ||
    root.limitations.length !== AMENDMENT_CHANGE_DIRECTORY_LIMITATIONS.length ||
    root.limitations.some(
      (limitation, index) =>
        limitation !== AMENDMENT_CHANGE_DIRECTORY_LIMITATIONS[index],
    )
  ) {
    return null;
  }

  const items = [];
  const agreementIds = new Set();
  let previous = null;
  for (const itemValue of root.items) {
    const item = record(itemValue);
    const agreement = record(item.agreement);
    const coverage = record(item.coverage);
    const currentClauseCount = decisionBriefInteger(
      coverage.current_clause_count,
      1,
    );
    const candidateClauseCount = decisionBriefInteger(
      coverage.candidate_clause_count,
      1,
    );
    const matchingClauseCount = decisionBriefInteger(
      coverage.matching_clause_count,
      1,
    );
    const matchedCueCount = decisionBriefInteger(
      coverage.matched_cue_count,
      1,
    );
    const matchedCueClassCount = decisionBriefInteger(
      coverage.matched_cue_class_count,
      1,
    );
    const truncatedClauseCount = decisionBriefInteger(
      coverage.clauses_truncated_for_scan,
    );
    if (
      !hasExactKeys(item, AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS.item) ||
      !hasExactKeys(
        agreement,
        AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS.agreement,
      ) ||
      agreement.document_kind !== "amendment" ||
      typeof agreement.title_truncated !== "boolean" ||
      (agreement.title === null && agreement.title_truncated) ||
      (agreement.title_truncated &&
        Array.from(agreement.title ?? "").length !== 500) ||
      !hasExactKeys(
        coverage,
        AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS.coverage,
      ) ||
      currentClauseCount === null ||
      candidateClauseCount === null ||
      matchingClauseCount === null ||
      matchedCueCount === null ||
      matchedCueClassCount === null ||
      truncatedClauseCount === null ||
      candidateClauseCount > currentClauseCount ||
      matchingClauseCount > candidateClauseCount ||
      matchingClauseCount > matchedCueCount ||
      matchedCueClassCount > matchedCueCount ||
      matchedCueClassCount > Object.keys(AGREEMENT_CHANGE_CUE_LABELS).length ||
      truncatedClauseCount > currentClauseCount ||
      item.full_change_cues_available !== true ||
      !Array.isArray(item.cue_summary) ||
      item.cue_summary.length !== matchedCueClassCount ||
      agreementIds.has(agreement.agreement_id)
    ) {
      return null;
    }

    const cueSummary = [];
    const summarizedCueKeys = new Set();
    let previousCueOrdinal = -1;
    let summarizedCueCount = 0;
    for (const summaryValue of item.cue_summary) {
      const summary = record(summaryValue);
      const ordinal = AGREEMENT_CHANGE_CUE_ORDER.get(summary.cue_key);
      const cueClauseCount = decisionBriefInteger(
        summary.matching_clause_count,
        1,
      );
      const cueCount = decisionBriefInteger(summary.matched_cue_count, 1);
      if (
        !hasExactKeys(
          summary,
          AMENDMENT_CHANGE_DIRECTORY_EXACT_KEYS.cueSummary,
        ) ||
        ordinal === undefined ||
        ordinal <= previousCueOrdinal ||
        summarizedCueKeys.has(summary.cue_key) ||
        summary.label !== AGREEMENT_CHANGE_CUE_LABELS[summary.cue_key] ||
        cueClauseCount === null ||
        cueCount === null ||
        cueClauseCount !== cueCount ||
        cueClauseCount > matchingClauseCount ||
        (expectedCueKeys.length > 0 &&
          !expectedCueKeys.includes(summary.cue_key))
      ) {
        return null;
      }
      previousCueOrdinal = ordinal;
      summarizedCueKeys.add(summary.cue_key);
      summarizedCueCount += cueCount;
      cueSummary.push({ ...summary });
    }
    if (summarizedCueCount !== matchedCueCount) return null;

    const { title_truncated: titleTruncated, ...cueAgreement } = agreement;
    const representativePacket = agreementChangeCueEvidence(
      {
        api_version: "agreement-change-cues-v1",
        agreement: cueAgreement,
        source: item.source,
        cues: [item.representative_cue],
        coverage: {
          current_clause_count: currentClauseCount,
          candidate_clause_count: candidateClauseCount,
          matching_clause_count: 1,
          matched_cue_count: 1,
          returned_cue_count: 1,
          supported_rule_count: 8,
          clauses_truncated_for_scan: truncatedClauseCount,
        },
        limits: {
          maximum_returned_cues: 1,
          maximum_supported_limit: AGREEMENT_CHANGE_CUE_LIMIT_MAX,
          maximum_clause_characters_scanned: 500_000,
          one_match_per_rule_per_clause: true,
          cues_truncated: false,
          positive_matches_only: true,
          absence_is_not_evidence_of_absence: true,
          change_target_identified: false,
          amendment_direction_determined: false,
          agreement_relationship_established: false,
          legal_effect_determined: false,
        },
        limitations: AGREEMENT_CHANGE_CUE_LIMITATIONS,
      },
      agreement.agreement_id,
      1,
    );
    if (
      representativePacket === null ||
      !summarizedCueKeys.has(
        representativePacket.cues[0]?.cue_key,
      ) ||
      (expectedSourceSlugs.length > 0 &&
        !expectedSourceSlugs.includes(representativePacket.source.slug))
    ) {
      return null;
    }

    const projected = {
      agreement: {
        ...representativePacket.agreement,
        title_truncated: titleTruncated,
      },
      source: representativePacket.source,
      coverage: { ...coverage },
      cue_summary: cueSummary,
      representative_cue: representativePacket.cues[0],
      full_change_cues_available: true,
    };
    if (previous !== null) {
      const previousCoverage = previous.coverage;
      const previousPublished = previous.source.observed_published_at;
      const currentPublished = projected.source.observed_published_at;
      const sameCounts =
        previousCoverage.matched_cue_class_count === matchedCueClassCount &&
        previousCoverage.matched_cue_count === matchedCueCount;
      const datesOutOfOrder = sameCounts && (
        (previousPublished === null && currentPublished !== null) ||
        (previousPublished !== null &&
          currentPublished !== null &&
          Date.parse(previousPublished) < Date.parse(currentPublished))
      );
      const sameDate = previousPublished === currentPublished ||
        (previousPublished !== null &&
          currentPublished !== null &&
          Date.parse(previousPublished) === Date.parse(currentPublished));
      if (
        previousCoverage.matched_cue_class_count < matchedCueClassCount ||
        (previousCoverage.matched_cue_class_count === matchedCueClassCount &&
          previousCoverage.matched_cue_count < matchedCueCount) ||
        datesOutOfOrder ||
        (sameCounts &&
          sameDate &&
          previous.agreement.agreement_id >= agreement.agreement_id)
      ) {
        return null;
      }
    }
    agreementIds.add(agreement.agreement_id);
    items.push(projected);
    previous = projected;
  }

  return {
    api_version: root.api_version,
    generated_at: root.generated_at,
    items,
    page: { ...page },
    filters: {
      cue_keys: [...filters.cue_keys],
      source_slugs: [...filters.source_slugs],
      document_kind: filters.document_kind,
    },
    limits: { ...limits },
    limitations: [...root.limitations],
  };
}

export function partyDecisionBriefCoverage(value, expectedAgreementId) {
  const brief = record(value);
  const agreement = record(brief.agreement);
  if (
    brief.api_version !== "agreement-decision-brief-v2" ||
    typeof expectedAgreementId !== "string" ||
    !UUID_PATTERN.test(expectedAgreementId) ||
    agreement.agreement_id !== expectedAgreementId ||
    !Array.isArray(brief.topics) ||
    brief.topics.length !== AGREEMENT_DECISION_BRIEF_TOPICS.length
  ) {
    return null;
  }

  let matchingClauseCount = 0;
  let signalCount = 0;
  const matchedTopics = [];
  for (
    let index = 0;
    index < AGREEMENT_DECISION_BRIEF_TOPICS.length;
    index += 1
  ) {
    const expectedTopic = AGREEMENT_DECISION_BRIEF_TOPICS[index];
    const topic = record(brief.topics[index]);
    const clauses = decisionBriefInteger(topic.exact_matching_clause_count);
    const totalMatches = decisionBriefInteger(topic.total_matches);
    const signals = decisionBriefInteger(topic.total_signal_matches);
    if (
      topic.topic_key !== expectedTopic.topicKey ||
      topic.label !== expectedTopic.label ||
      topic.detector_version !== expectedTopic.detectorVersion ||
      clauses === null ||
      totalMatches === null ||
      totalMatches !== clauses ||
      signals === null ||
      signals < clauses ||
      (clauses === 0 && signals !== 0)
    ) {
      return null;
    }
    matchingClauseCount += clauses;
    signalCount += signals;
    if (clauses > 0) {
      matchedTopics.push({
        topicKey: expectedTopic.topicKey,
        label: expectedTopic.label,
        matchingClauseCount: clauses,
        signalCount: signals,
      });
    }
  }

  return {
    agreementId: expectedAgreementId,
    matchedTopicCount: matchedTopics.length,
    matchingClauseCount,
    signalCount,
    matchedTopics,
  };
}

export function rankPartyResultsByDecisionBriefCoverage(
  values,
  coverageValues,
) {
  if (!Array.isArray(values) || !Array.isArray(coverageValues)) {
    throw new TypeError("Party brief ranking inputs must be arrays");
  }
  const resultIds = new Set();
  const indexed = values.map((value, index) => {
    const agreementId = record(value).agreement_id;
    if (
      typeof agreementId !== "string" ||
      !UUID_PATTERN.test(agreementId) ||
      resultIds.has(agreementId)
    ) {
      throw new TypeError("Party brief ranking contains an invalid result");
    }
    resultIds.add(agreementId);
    return { value, index, agreementId };
  });

  const coverageByAgreement = new Map();
  for (const value of coverageValues) {
    const coverage = record(value);
    if (
      typeof coverage.agreementId !== "string" ||
      !resultIds.has(coverage.agreementId) ||
      coverageByAgreement.has(coverage.agreementId) ||
      decisionBriefInteger(coverage.matchedTopicCount) === null ||
      coverage.matchedTopicCount > AGREEMENT_DECISION_BRIEF_TOPICS.length ||
      decisionBriefInteger(coverage.matchingClauseCount) === null ||
      decisionBriefInteger(coverage.signalCount) === null ||
      coverage.signalCount < coverage.matchingClauseCount
    ) {
      throw new TypeError("Party brief ranking contains invalid coverage");
    }
    coverageByAgreement.set(coverage.agreementId, coverage);
  }

  indexed.sort((left, right) => {
    const leftCoverage = coverageByAgreement.get(left.agreementId);
    const rightCoverage = coverageByAgreement.get(right.agreementId);
    if (leftCoverage && !rightCoverage) return -1;
    if (!leftCoverage && rightCoverage) return 1;
    if (!leftCoverage && !rightCoverage) return left.index - right.index;
    return rightCoverage.matchedTopicCount - leftCoverage.matchedTopicCount ||
      rightCoverage.signalCount - leftCoverage.signalCount ||
      rightCoverage.matchingClauseCount - leftCoverage.matchingClauseCount ||
      left.index - right.index;
  });
  return indexed.map((entry) => entry.value);
}

export function partyDecisionBriefShortlist(
  values,
  coverageValues,
  limit = PARTY_DECISION_BRIEF_SHORTLIST_MAX,
) {
  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > PARTY_DECISION_BRIEF_SHORTLIST_MAX
  ) {
    throw new TypeError(
      "Party brief shortlist limit is outside the allowed range",
    );
  }
  const ranked = rankPartyResultsByDecisionBriefCoverage(
    values,
    coverageValues,
  );
  const coverageByAgreement = new Map(
    coverageValues.map((value) => [record(value).agreementId, value]),
  );
  return ranked
    .filter((value) => {
      const coverage = coverageByAgreement.get(record(value).agreement_id);
      return coverage && coverage.matchedTopicCount > 0;
    })
    .slice(0, limit);
}

export function buildPartyDecisionBriefShortlistExport(
  value = {},
  generatedAt = new Date().toISOString(),
) {
  const input = record(value);
  const query = typeof input.query === "string" ? input.query.trim() : "";
  const documentKind = typeof input.documentKind === "string"
    ? input.documentKind
    : "";
  const sourceSlug = typeof input.sourceSlug === "string"
    ? input.sourceSlug.trim().toLowerCase()
    : "";
  const matchingRecordCount = decisionBriefInteger(
    input.matchingRecordCount,
  );
  const totalMatchingRecords = input.totalMatchingRecords === null
    ? null
    : decisionBriefInteger(input.totalMatchingRecords);
  const candidates = array(input.candidates);
  const briefValues = array(input.briefs);
  if (
    query.length < 2 ||
    query.length > 200 ||
    !/[\p{L}\p{N}]/u.test(query) ||
    (documentKind && !DOCUMENT_KINDS.has(documentKind)) ||
    (sourceSlug && !SOURCE_PATTERN.test(sourceSlug)) ||
    matchingRecordCount === null ||
    matchingRecordCount < 1 ||
    matchingRecordCount > PARTY_DECISION_BRIEF_SCAN_MAX ||
    !("totalMatchingRecords" in input) ||
    (totalMatchingRecords !== null &&
      totalMatchingRecords < matchingRecordCount) ||
    typeof input.matchingSetTruncated !== "boolean" ||
    (totalMatchingRecords !== null &&
      input.matchingSetTruncated !==
        (totalMatchingRecords > matchingRecordCount)) ||
    candidates.length < 1 ||
    candidates.length > matchingRecordCount ||
    !Array.isArray(input.candidates) ||
    !Array.isArray(input.briefs) ||
    briefValues.length > candidates.length ||
    !isValidFamilyTimestamp(generatedAt)
  ) {
    throw new TypeError("Party decision brief shortlist export is invalid");
  }

  const candidateByAgreement = new Map();
  for (const candidateValue of candidates) {
    const candidate = record(candidateValue);
    const agreementId = candidate.agreement_id;
    const observedName = candidate.observed_party_name;
    const observedRole = candidate.observed_party_role;
    const evidenceQuote = candidate.party_evidence_quote;
    const evidenceSource = candidate.party_evidence_source;
    const candidateSourceUrl = safeExternalUrl(candidate.source_url);
    if (
      typeof agreementId !== "string" ||
      !UUID_PATTERN.test(agreementId) ||
      candidateByAgreement.has(agreementId) ||
      !DECISION_BRIEF_DOCUMENT_KINDS.has(candidate.document_kind) ||
      (documentKind && candidate.document_kind !== documentKind) ||
      typeof observedName !== "string" ||
      observedName.length < 1 ||
      observedName.length > 1_000 ||
      !observedName.toLowerCase().includes(query.toLowerCase()) ||
      !(
        observedRole === null ||
        (typeof observedRole === "string" && observedRole.length <= 300)
      ) ||
      !PARTY_CAPTURE_METHODS.has(candidate.party_capture_method) ||
      !PARTY_RESOLUTION_STATUSES.has(candidate.party_resolution_status) ||
      !PARTY_MATCH_KINDS.has(candidate.match_kind) ||
      !(
        evidenceQuote === null ||
        (typeof evidenceQuote === "string" && evidenceQuote.length <= 500)
      ) ||
      !(
        evidenceSource === null ||
        (typeof evidenceSource === "string" && evidenceSource.length <= 100)
      ) ||
      typeof candidate.source_slug !== "string" ||
      !SOURCE_PATTERN.test(candidate.source_slug) ||
      (sourceSlug && candidate.source_slug !== sourceSlug) ||
      candidateSourceUrl === null ||
      !DECISION_BRIEF_HASH_PATTERN.test(candidate.artifact_sha256)
    ) {
      throw new TypeError("Party decision brief shortlist export is invalid");
    }
    if (
      (candidate.party_capture_method ===
          "generated_extraction_with_observed_quote" &&
        !(typeof evidenceQuote === "string" && evidenceQuote.length > 0)) ||
      (candidate.party_capture_method !==
          "generated_extraction_with_observed_quote" &&
        evidenceQuote !== null) ||
      (candidate.party_capture_method === "source_structured_metadata" &&
        evidenceSource !== "ocds_release") ||
      (candidate.party_capture_method !== "source_structured_metadata" &&
        evidenceSource !== null)
    ) {
      throw new TypeError("Party decision brief shortlist export is invalid");
    }
    candidateByAgreement.set(agreementId, {
      partyMatch: {
        observed_name: observedName,
        observed_role: observedRole,
        capture_method: candidate.party_capture_method,
        resolution_status: candidate.party_resolution_status,
        match_kind: candidate.match_kind,
        evidence_quote: evidenceQuote,
        evidence_source: evidenceSource,
      },
      documentKind: candidate.document_kind,
      sourceSlug: candidate.source_slug,
      sourceUrl: candidateSourceUrl,
      artifactSha256: candidate.artifact_sha256,
    });
  }

  const validatedBriefByAgreement = new Map();
  const coverage = [];
  for (const briefValue of briefValues) {
    const agreementId = record(record(briefValue).agreement).agreement_id;
    const candidate = candidateByAgreement.get(agreementId);
    const brief = agreementDecisionBriefEvidence(
      briefValue,
      agreementId,
      PARTY_DECISION_BRIEF_SCAN_EXAMPLES,
    );
    const summary = partyDecisionBriefCoverage(brief, agreementId);
    if (
      !candidate ||
      brief === null ||
      summary === null ||
      validatedBriefByAgreement.has(agreementId) ||
      brief.agreement.document_kind !== candidate.documentKind ||
      brief.agreement.artifact_sha256 !== candidate.artifactSha256 ||
      brief.source.slug !== candidate.sourceSlug ||
      brief.source.source_url !== candidate.sourceUrl
    ) {
      throw new TypeError("Party decision brief shortlist export is invalid");
    }
    validatedBriefByAgreement.set(agreementId, brief);
    coverage.push(summary);
  }

  const shortlist = partyDecisionBriefShortlist(candidates, coverage);
  const positiveBriefCount = coverage.filter((item) =>
    item.matchedTopicCount > 0
  ).length;
  const coverageByAgreement = new Map(
    coverage.map((item) => [item.agreementId, item]),
  );
  return {
    schema: PARTY_DECISION_BRIEF_SHORTLIST_SCHEMA,
    generated_at: generatedAt,
    scope: {
      party_query: query,
      document_kind_filter: documentKind || null,
      source_filter: sourceSlug || null,
      matching_records_returned: matchingRecordCount,
      total_matching_records: totalMatchingRecords,
      matching_set_truncated: input.matchingSetTruncated,
      maximum_matching_records: PARTY_DECISION_BRIEF_SCAN_MAX,
      eligible_briefs_attempted: candidates.length,
      validated_briefs: coverage.length,
      validation_failures: candidates.length - coverage.length,
      positive_briefs: positiveBriefCount,
      zero_match_briefs: coverage.length - positiveBriefCount,
      maximum_shortlist_records: PARTY_DECISION_BRIEF_SHORTLIST_MAX,
      shortlist_records: shortlist.length,
    },
    ranking: {
      basis:
        "positive_topic_count_then_signal_count_then_matching_clause_count_v1",
      basis_type: "generated",
      normalized_score_provided: false,
    },
    results: shortlist.map((candidateValue, index) => {
      const agreementId = record(candidateValue).agreement_id;
      const candidate = candidateByAgreement.get(agreementId);
      const brief = validatedBriefByAgreement.get(agreementId);
      const summary = coverageByAgreement.get(agreementId);
      return {
        rank: index + 1,
        observed_party_match: candidate.partyMatch,
        generated_coverage: {
          matched_topic_count: summary.matchedTopicCount,
          matching_clause_count: summary.matchingClauseCount,
          signal_count: summary.signalCount,
          matched_topics: summary.matchedTopics.map((topic) => ({
            topic_key: topic.topicKey,
            label: topic.label,
            matching_clause_count: topic.matchingClauseCount,
            signal_count: topic.signalCount,
          })),
        },
        decision_brief: brief,
      };
    }),
    limitations: [
      "Party matching is literal observed-name retrieval, not entity resolution or a complete portfolio.",
      "Only the first 50 matching records are fetched; matching_set_truncated declares whether the API reported more.",
      "Only positive deterministic detector matches appear in the shortlist; zero matches do not establish absence.",
      "Ordering is generated navigation, not a risk, quality, recommendation, market-prevalence or legal-effect score.",
      "Each embedded brief contains at most one validated evidence example per topic; inspect the source, complete agreement and related documents before relying on it.",
    ],
    export_safety: {
      format: "application/json",
      observed_text_preserved_verbatim: true,
      spreadsheet_formula_execution: false,
      private_storage_paths_included: false,
      bearer_token_included: false,
      spreadsheet_import_warning:
        "JSON does not execute formula-like source text. If converting evidence to a spreadsheet, neutralize formula-leading cells before opening the file.",
    },
  };
}

export function buildAgreementDecisionBriefExport(
  value,
  generatedAt = new Date().toISOString(),
) {
  const input = record(value);
  const agreementId = record(input.agreement).agreement_id;
  const examplesPerTopic = record(input.limits).examples_per_topic;
  const brief = agreementDecisionBriefEvidence(
    input,
    agreementId,
    examplesPerTopic,
  );
  if (brief === null || !isValidFamilyTimestamp(generatedAt)) {
    throw new TypeError("Agreement decision brief export is invalid");
  }
  return {
    schema: AGREEMENT_DECISION_BRIEF_SCHEMA,
    generated_at: generatedAt,
    decision_brief: brief,
    export_safety: {
      format: "application/json",
      observed_text_preserved_verbatim: true,
      spreadsheet_formula_execution: false,
      private_storage_paths_included: false,
      bearer_token_included: false,
      spreadsheet_import_warning:
        "JSON does not execute formula-like source text. If converting evidence to a spreadsheet, neutralize formula-leading cells before opening the file.",
    },
  };
}

export function buildAgreementDecisionBriefComparison(
  values,
  generatedAt = new Date().toISOString(),
) {
  if (
    !Array.isArray(values) ||
    values.length < AGREEMENT_DECISION_BRIEF_COMPARISON_MIN ||
    values.length > AGREEMENT_DECISION_BRIEF_COMPARISON_MAX ||
    !isValidFamilyTimestamp(generatedAt)
  ) {
    throw new TypeError("Agreement decision brief comparison is invalid");
  }
  const agreementIds = new Set();
  const briefs = values.map((value) => {
    const input = record(value);
    const agreementId = record(input.agreement).agreement_id;
    const brief = agreementDecisionBriefEvidence(
      input,
      agreementId,
      AGREEMENT_DECISION_BRIEF_COMPARISON_EXAMPLES,
    );
    if (brief === null || agreementIds.has(agreementId)) {
      throw new TypeError("Agreement decision brief comparison is invalid");
    }
    agreementIds.add(agreementId);
    return brief;
  });
  return {
    schema: AGREEMENT_DECISION_BRIEF_COMPARISON_SCHEMA,
    generated_at: generatedAt,
    scope: {
      agreement_count: briefs.length,
      topic_order: AGREEMENT_DECISION_BRIEF_TOPICS.map((topic) =>
        topic.topicKey
      ),
      comparison_basis:
        "independently_validated_positive_deterministic_wording_matches",
      count_interpretation:
        "raw_positive_detector_matches_not_normalized_for_document_length_or_detector_opportunity",
    },
    decision_briefs: briefs,
    limitations: [
      "The selected agreements are user-chosen examples, not a representative market sample.",
      "Clause and signal counts are raw positive detector matches and are not normalized scores.",
      "Zero matches do not establish that a provision, exception, right or consequence is absent.",
      "Each topic includes at most five ranked validated examples per agreement; additional matching clauses may exist.",
      "Compare complete agreements, definitions, schedules, amendments and related documents before relying on these excerpts.",
    ],
    export_safety: {
      format: "application/json",
      observed_text_preserved_verbatim: true,
      spreadsheet_formula_execution: false,
      private_storage_paths_included: false,
      bearer_token_included: false,
    },
  };
}

function familyProposalComparisonDocument(value) {
  const document = record(value);
  const canonicalUrl = safeExternalUrl(document.canonicalUrl);
  if (
    !hasExactKeys(document, [
      "agreementId",
      "observedTitle",
      "observedTitleTruncated",
      "documentKind",
      "documentKindBasis",
      "observedPublishedAt",
      "canonicalUrl",
      "canonicalUrlOmitted",
      "textBasis",
    ]) ||
    typeof document.agreementId !== "string" ||
    !UUID_PATTERN.test(document.agreementId) ||
    !(
      document.observedTitle === null ||
      (typeof document.observedTitle === "string" &&
        document.observedTitle.trim().length > 0 &&
        familyCharacterLength(document.observedTitle) <= 500)
    ) ||
    typeof document.observedTitleTruncated !== "boolean" ||
    (document.observedTitleTruncated &&
      familyCharacterLength(document.observedTitle) !== 500) ||
    !FAMILY_DOCUMENT_KINDS.has(document.documentKind) ||
    !FAMILY_DOCUMENT_KIND_BASES.has(document.documentKindBasis) ||
    !(
      document.observedPublishedAt === null ||
      isValidFamilyTimestamp(document.observedPublishedAt)
    ) ||
    document.canonicalUrlOmitted !== false ||
    canonicalUrl === null ||
    document.textBasis !== "observed"
  ) {
    return null;
  }
  return {
    agreement_id: document.agreementId,
    observed_title: document.observedTitle,
    observed_title_truncated: document.observedTitleTruncated,
    document_kind: document.documentKind,
    document_kind_basis: document.documentKindBasis,
    observed_published_at: document.observedPublishedAt,
    source_url: canonicalUrl,
    text_basis: document.textBasis,
  };
}

export function buildFamilyProposalBriefComparison(
  proposalValue,
  briefValues,
  generatedAt = new Date().toISOString(),
) {
  const proposal = record(proposalValue);
  const currentDecisionCount = familyInteger(proposal.currentDecisionCount);
  if (
    !hasExactKeys(proposal, [
      "candidateId",
      "source",
      "candidateCurrent",
      "generatedAt",
      "corpusSnapshottedAt",
      "proposalOnly",
      "relationshipWrittenAutomatically",
      "documents",
      "reviewStatus",
      "currentDecisionCount",
      "conflicting",
    ]) ||
    typeof proposal.candidateId !== "string" ||
    !UUID_PATTERN.test(proposal.candidateId) ||
    typeof proposal.source !== "string" ||
    !SOURCE_PATTERN.test(proposal.source) ||
    proposal.candidateCurrent !== true ||
    !isValidFamilyTimestamp(proposal.generatedAt) ||
    !isValidFamilyTimestamp(proposal.corpusSnapshottedAt) ||
    proposal.proposalOnly !== true ||
    proposal.relationshipWrittenAutomatically !== false ||
    !Array.isArray(proposal.documents) ||
    proposal.documents.length !== 2 ||
    !FAMILY_REVIEW_STATUSES.has(proposal.reviewStatus) ||
    currentDecisionCount === null ||
    (proposal.reviewStatus === "unreviewed") !==
      (currentDecisionCount === 0) ||
    (proposal.reviewStatus === "mixed" && currentDecisionCount < 2) ||
    typeof proposal.conflicting !== "boolean" ||
    (proposal.conflicting && proposal.reviewStatus !== "mixed") ||
    !isValidFamilyTimestamp(generatedAt)
  ) {
    throw new TypeError("Family proposal brief comparison is invalid");
  }

  const documents = proposal.documents.map(familyProposalComparisonDocument);
  if (
    documents.some((document) => document === null) ||
    documents[0].agreement_id >= documents[1].agreement_id
  ) {
    throw new TypeError("Family proposal brief comparison is invalid");
  }
  const comparison = buildAgreementDecisionBriefComparison(
    briefValues,
    generatedAt,
  );
  for (let index = 0; index < documents.length; index += 1) {
    const document = documents[index];
    const brief = comparison.decision_briefs[index];
    if (
      brief.agreement.agreement_id !== document.agreement_id ||
      brief.agreement.document_kind !== document.document_kind ||
      brief.agreement.document_kind_basis !== document.document_kind_basis ||
      brief.agreement.text_basis !== document.text_basis ||
      brief.source.slug !== proposal.source ||
      brief.source.source_url !== document.source_url ||
      (document.observed_published_at !== null &&
        brief.source.observed_published_at !== document.observed_published_at) ||
      (document.observed_title !== null &&
        !document.observed_title_truncated &&
        brief.agreement.title !== document.observed_title)
    ) {
      throw new TypeError("Family proposal brief comparison is invalid");
    }
  }

  return {
    schema: FAMILY_PROPOSAL_BRIEF_COMPARISON_SCHEMA,
    generated_at: generatedAt,
    selection_context: {
      basis: "generated_family_candidate",
      candidate_id: proposal.candidateId,
      source_slug: proposal.source,
      candidate_current: proposal.candidateCurrent,
      candidate_generated_at: proposal.generatedAt,
      corpus_snapshotted_at: proposal.corpusSnapshottedAt,
      proposal_only: proposal.proposalOnly,
      relationship_written_automatically:
        proposal.relationshipWrittenAutomatically,
      relationship_ledger_included: false,
      review_question: "same_agreement_family",
      human_review: {
        status: proposal.reviewStatus,
        current_decision_count: currentDecisionCount,
        conflicting: proposal.conflicting,
        reviewer_identity_included: false,
        rationale_included: false,
        direction_reviewed: false,
      },
      claims: {
        same_family_established_by_candidate: false,
        amendment_direction_determined: false,
        legal_effect_determined: false,
        relationship_materialized: false,
      },
      documents,
    },
    decision_brief_comparison: comparison,
    limitations: [
      "The selected pair is a generated same-family investigation candidate, not a recorded relationship or legal conclusion.",
      "Document order, names and dates do not establish amendment direction, supersession, incorporation or legal effect.",
      "Human-review aggregates may be pseudonymous in a small cohort and do not determine direction or legal effect.",
      "The five-topic comparison contains positive deterministic wording evidence only; zero matches do not establish absence.",
      "Read both complete documents and any other related instruments before relying on this packet.",
    ],
    export_safety: {
      format: "application/json",
      observed_text_preserved_verbatim: true,
      spreadsheet_formula_execution: false,
      private_storage_paths_included: false,
      bearer_token_included: false,
    },
  };
}

export function buildFamilyProposalLifecycleComparison(
  proposalValue,
  briefValues,
  changeCueValues,
  generatedAt = new Date().toISOString(),
) {
  if (
    !Array.isArray(changeCueValues) ||
    changeCueValues.length !== 2
  ) {
    throw new TypeError("Family proposal lifecycle comparison is invalid");
  }
  const base = buildFamilyProposalBriefComparison(
    proposalValue,
    briefValues,
    generatedAt,
  );
  const documents = base.selection_context.documents;
  const cues = changeCueValues.map((value, index) =>
    agreementChangeCueEvidence(
      value,
      documents[index].agreement_id,
      AGREEMENT_CHANGE_CUE_LIMIT_DEFAULT,
    )
  );
  if (cues.some((packet) => packet === null)) {
    throw new TypeError("Family proposal lifecycle comparison is invalid");
  }
  for (let index = 0; index < documents.length; index += 1) {
    const document = documents[index];
    const brief = base.decision_brief_comparison.decision_briefs[index];
    const packet = cues[index];
    if (
      packet.agreement.agreement_id !== document.agreement_id ||
      packet.agreement.document_kind !== document.document_kind ||
      packet.agreement.document_kind_basis !== document.document_kind_basis ||
      packet.agreement.title !== brief.agreement.title ||
      packet.agreement.family_key !== brief.agreement.family_key ||
      packet.agreement.published_at !== brief.agreement.published_at ||
      packet.agreement.artifact_sha256 !== brief.agreement.artifact_sha256 ||
      packet.agreement.extraction_id !== brief.agreement.extraction_id ||
      packet.agreement.extracted_text_sha256 !==
        brief.agreement.extracted_text_sha256 ||
      packet.agreement.text_basis !== document.text_basis ||
      packet.source.slug !== base.selection_context.source_slug ||
      packet.source.source_url !== document.source_url ||
      packet.source.external_id !== brief.source.external_id ||
      packet.source.observed_published_at !==
        brief.source.observed_published_at
    ) {
      throw new TypeError("Family proposal lifecycle comparison is invalid");
    }
  }
  return {
    schema: FAMILY_PROPOSAL_LIFECYCLE_COMPARISON_SCHEMA,
    generated_at: generatedAt,
    selection_context: base.selection_context,
    decision_brief_comparison: base.decision_brief_comparison,
    change_cue_packets: cues,
    limitations: [
      ...base.limitations,
      "Change cues are positive deterministic wording matches only; they do not identify the changed instrument, resolve cross-document references, or establish direction or legal effect.",
      "Each document returns at most twelve cues and at most one match per supported rule in a clause; inspect the complete documents for omitted or unmatched changes.",
    ],
    export_safety: base.export_safety,
  };
}

export function decisionBriefComparisonExamples(value) {
  const topic = record(value);
  const returnedExamples = decisionBriefInteger(topic.returned_examples);
  const totalMatches = decisionBriefInteger(topic.total_matches);
  if (
    returnedExamples === null ||
    totalMatches === null ||
    totalMatches < returnedExamples ||
    !Array.isArray(topic.examples) ||
    topic.examples.length !== returnedExamples ||
    topic.examples.length > AGREEMENT_DECISION_BRIEF_EXAMPLES_MAX ||
    typeof topic.examples_truncated !== "boolean" ||
    topic.examples_truncated !== (totalMatches > returnedExamples)
  ) {
    throw new TypeError("Decision brief comparison examples are invalid");
  }
  const [primaryExample = null, ...additionalExamples] = topic.examples;
  return {
    primaryExample,
    additionalExamples,
    omittedMatchingClauseCount: totalMatches - returnedExamples,
  };
}

export function decisionBriefDirectoryEvidence(
  value,
  expectedMinimumTopics = 3,
  expectedLimit = 12,
  expectedOffset = 0,
  expectedKind = "",
  expectedSource = "",
) {
  if (
    !Number.isInteger(expectedMinimumTopics) ||
    expectedMinimumTopics < 1 ||
    expectedMinimumTopics > 5 ||
    !Number.isInteger(expectedLimit) ||
    expectedLimit < 1 ||
    expectedLimit > DECISION_BRIEF_DIRECTORY_PAGE_MAX ||
    !Number.isInteger(expectedOffset) ||
    expectedOffset < 0 ||
    expectedOffset > DECISION_BRIEF_DIRECTORY_OFFSET_MAX ||
    (expectedKind && !["contract", "amendment"].includes(expectedKind)) ||
    (expectedSource && !SOURCE_PATTERN.test(expectedSource))
  ) {
    return null;
  }

  const root = record(value);
  const page = record(root.page);
  const filters = record(root.filters);
  const limits = record(root.limits);
  const returnedCount = decisionBriefInteger(page.returned_count);
  const eligibleAgreements = decisionBriefInteger(page.eligible_agreements);
  const expectedKinds = expectedKind ? [expectedKind] : [];
  const expectedSources = expectedSource ? [expectedSource] : [];
  if (
    root.api_version !== "agreement-decision-brief-directory-v1" ||
    !isValidFamilyTimestamp(root.generated_at) ||
    decisionBriefInteger(page.limit) !== expectedLimit ||
    decisionBriefInteger(page.offset) !== expectedOffset ||
    returnedCount === null ||
    eligibleAgreements === null ||
    returnedCount > expectedLimit ||
    returnedCount > eligibleAgreements ||
    typeof page.has_more !== "boolean" ||
    page.has_more !== (expectedOffset + returnedCount < eligibleAgreements) ||
    (expectedOffset < eligibleAgreements &&
      returnedCount !== Math.min(
          expectedLimit,
          eligibleAgreements - expectedOffset,
        )) ||
    (expectedOffset >= eligibleAgreements && returnedCount !== 0) ||
    filters.minimum_topics !== expectedMinimumTopics ||
    JSON.stringify(filters.document_kinds) !== JSON.stringify(expectedKinds) ||
    JSON.stringify(filters.source_slugs) !== JSON.stringify(expectedSources) ||
    limits.maximum_page_size !== DECISION_BRIEF_DIRECTORY_PAGE_MAX ||
    limits.maximum_offset !== DECISION_BRIEF_DIRECTORY_OFFSET_MAX ||
    limits.topic_count !== AGREEMENT_DECISION_BRIEF_TOPICS.length ||
    limits.positive_matches_only !== true ||
    limits.ranking_is_generated_navigation !== true ||
    limits.full_evidence_revalidated_when_brief_opens !== true ||
    limits.absence_is_not_evidence_of_absence !== true ||
    limits.risk_score_provided !== false ||
    limits.legal_effect_determined !== false ||
    !Array.isArray(root.limitations) ||
    root.limitations.length !== 4 ||
    root.limitations.some(
      (item) => typeof item !== "string" || !item || item.length > 500,
    ) ||
    !Array.isArray(root.items) ||
    root.items.length !== returnedCount
  ) {
    return null;
  }

  const seenAgreementIds = new Set();
  let previous = null;
  const items = [];
  for (const valueItem of root.items) {
    const item = record(valueItem);
    const source = record(item.source);
    const agreementId = item.agreement_id;
    const title = item.title;
    const sourceUrl = safeExternalUrl(source.source_url);
    const matchedTopicCount = decisionBriefInteger(item.matched_topic_count, 1);
    const matchingClauseCount = decisionBriefInteger(
      item.matching_clause_count,
      1,
    );
    const signalCount = decisionBriefInteger(item.signal_count, 1);
    if (
      typeof agreementId !== "string" ||
      !UUID_PATTERN.test(agreementId) ||
      seenAgreementIds.has(agreementId) ||
      !DECISION_BRIEF_DOCUMENT_KINDS.has(item.document_kind) ||
      (expectedKind && item.document_kind !== expectedKind) ||
      !DECISION_BRIEF_BASES.has(item.document_kind_basis) ||
      item.text_basis !== "observed" ||
      !(
        title === null ||
        (typeof title === "string" && title.trim() &&
          Array.from(title).length <= 500)
      ) ||
      typeof item.title_truncated !== "boolean" ||
      (item.title_truncated &&
        (typeof title !== "string" || Array.from(title).length !== 500)) ||
      !isDecisionBriefDate(item.observed_execution_date) ||
      !isDecisionBriefDate(item.observed_effective_date) ||
      !isDecisionBriefDate(item.observed_termination_date) ||
      !isValidFamilyTimestamp(item.published_at) ||
      decisionBriefString(item.extraction_version, 100) === undefined ||
      decisionBriefString(source.slug, 63) === undefined ||
      !SOURCE_PATTERN.test(source.slug) ||
      (expectedSource && source.slug !== expectedSource) ||
      decisionBriefString(source.name, 300) === undefined ||
      !(
        source.publisher === null ||
        decisionBriefString(source.publisher, 300) !== undefined
      ) ||
      decisionBriefString(source.external_id, 1_000) === undefined ||
      sourceUrl === null ||
      !(
        source.observed_published_at === null ||
        isValidFamilyTimestamp(source.observed_published_at)
      ) ||
      matchedTopicCount === null ||
      matchedTopicCount < expectedMinimumTopics ||
      matchedTopicCount > AGREEMENT_DECISION_BRIEF_TOPICS.length ||
      matchingClauseCount === null ||
      signalCount === null ||
      signalCount < matchingClauseCount ||
      item.decision_brief_available !== true ||
      !Array.isArray(item.topics) ||
      item.topics.length !== AGREEMENT_DECISION_BRIEF_TOPICS.length ||
      [
        "artifact_sha256",
        "extraction_id",
        "observed_text",
        "matched_text",
        "storage_bucket",
        "storage_object_path",
      ].some((key) => Object.hasOwn(item, key))
    ) {
      return null;
    }

    let topicMatches = 0;
    let clauseTotal = 0;
    let signalTotal = 0;
    const topics = [];
    for (
      let index = 0;
      index < AGREEMENT_DECISION_BRIEF_TOPICS.length;
      index += 1
    ) {
      const topic = record(item.topics[index]);
      const expectedTopic = AGREEMENT_DECISION_BRIEF_TOPICS[index];
      const clauseCount = decisionBriefInteger(
        topic.exact_matching_clause_count,
      );
      const topicSignalCount = decisionBriefInteger(
        topic.total_signal_matches,
      );
      if (
        topic.topic_key !== expectedTopic.topicKey ||
        topic.label !== expectedTopic.label ||
        topic.detector_version !== expectedTopic.detectorVersion ||
        typeof topic.has_matches !== "boolean" ||
        clauseCount === null ||
        topicSignalCount === null ||
        topic.has_matches !== (clauseCount > 0) ||
        (clauseCount === 0 && topicSignalCount !== 0) ||
        (clauseCount > 0 && topicSignalCount < clauseCount)
      ) {
        return null;
      }
      if (topic.has_matches) topicMatches += 1;
      clauseTotal += clauseCount;
      signalTotal += topicSignalCount;
      topics.push({
        topicKey: topic.topic_key,
        label: topic.label,
        detectorVersion: topic.detector_version,
        hasMatches: topic.has_matches,
        matchingClauseCount: clauseCount,
        signalCount: topicSignalCount,
      });
    }
    if (
      topicMatches !== matchedTopicCount ||
      clauseTotal !== matchingClauseCount ||
      signalTotal !== signalCount
    ) {
      return null;
    }
    if (
      previous !== null &&
      (matchedTopicCount > previous.matchedTopicCount ||
        (matchedTopicCount === previous.matchedTopicCount &&
          signalCount > previous.signalCount) ||
        (matchedTopicCount === previous.matchedTopicCount &&
          signalCount === previous.signalCount &&
          matchingClauseCount > previous.matchingClauseCount) ||
        (matchedTopicCount === previous.matchedTopicCount &&
          signalCount === previous.signalCount &&
          matchingClauseCount === previous.matchingClauseCount &&
          agreementId <= previous.agreementId))
    ) {
      return null;
    }

    const projected = {
      agreementId,
      title,
      titleTruncated: item.title_truncated,
      documentKind: item.document_kind,
      documentKindBasis: item.document_kind_basis,
      observedExecutionDate: item.observed_execution_date,
      observedEffectiveDate: item.observed_effective_date,
      observedTerminationDate: item.observed_termination_date,
      publishedAt: item.published_at,
      extractionVersion: item.extraction_version,
      textBasis: item.text_basis,
      source: {
        slug: source.slug,
        name: source.name,
        publisher: source.publisher,
        externalId: source.external_id,
        sourceUrl,
        observedPublishedAt: source.observed_published_at,
      },
      matchedTopicCount,
      matchingClauseCount,
      signalCount,
      topics,
    };
    items.push(projected);
    seenAgreementIds.add(agreementId);
    previous = projected;
  }

  return {
    items,
    page: {
      limit: expectedLimit,
      offset: expectedOffset,
      returnedCount,
      eligibleAgreements,
      hasMore: page.has_more,
    },
    minimumTopics: expectedMinimumTopics,
    limitations: [...root.limitations],
  };
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

export function partyDossierFamilyCoverage(value) {
  const root = record(value);
  const coverage = record(root.coverage);
  const limits = record(root.limits);
  const documentRecords = decisionBriefInteger(coverage.document_records);
  const recordedFamilyGroups = decisionBriefInteger(
    coverage.recorded_family_groups,
  );
  const documentsWithFamily = decisionBriefInteger(
    coverage.document_records_with_recorded_family_key,
  );
  const documentsWithoutFamily = decisionBriefInteger(
    coverage.document_records_without_recorded_family_key,
  );
  const multiDocumentFamilies = decisionBriefInteger(
    coverage.multi_document_recorded_family_groups,
  );
  const largestFamilyDocuments = decisionBriefInteger(
    coverage.largest_recorded_family_document_count,
  );
  if (
    root.api_version !== PARTY_DOSSIER_SCHEMA ||
    documentRecords === null ||
    recordedFamilyGroups === null ||
    documentsWithFamily === null ||
    documentsWithoutFamily === null ||
    multiDocumentFamilies === null ||
    largestFamilyDocuments === null ||
    documentsWithFamily + documentsWithoutFamily !== documentRecords ||
    recordedFamilyGroups > documentsWithFamily ||
    multiDocumentFamilies > recordedFamilyGroups ||
    largestFamilyDocuments > documentsWithFamily ||
    (recordedFamilyGroups === 0 &&
      (documentsWithFamily !== 0 || largestFamilyDocuments !== 0)) ||
    (recordedFamilyGroups > 0 && largestFamilyDocuments < 1) ||
    (multiDocumentFamilies === 0 && largestFamilyDocuments > 1) ||
    (multiDocumentFamilies > 0 && largestFamilyDocuments < 2) ||
    limits.recorded_family_key_basis !== "caller_provided_grouping_hint" ||
    limits.recorded_family_keys_are_reviewed_relationships !== false ||
    limits.recorded_family_keys_are_unique_deals !== false ||
    limits.raw_family_keys_exposed !== false
  ) {
    return null;
  }
  return {
    documentRecords,
    recordedFamilyGroups,
    documentsWithFamily,
    documentsWithoutFamily,
    multiDocumentFamilies,
    largestFamilyDocuments,
  };
}

export function formatEvidenceLocation(value) {
  const clause = record(value);
  if (
    typeof clause.evidence_location === "string" &&
    clause.evidence_location.trim()
  ) {
    return clause.evidence_location.trim();
  }

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
  ) {
    parts.push(`member SHA-256 ${location.archive_member_sha256}`);
  }

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
    typeof expectedClauseId !== "string" ||
    !UUID_PATTERN.test(expectedClauseId)
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
    anchorContext: record(data.anchor_context),
    commercialPosition: record(data.commercial_position),
    terminationPosition: record(data.termination_position),
    assignmentPosition: record(data.assignment_position),
    governingLawPosition: record(data.governing_law_position),
    indemnityPosition: record(data.indemnity_position),
    truncated: data.truncated === true,
  };
}

export function comparisonConnectedContext(value) {
  const context = record(value);
  if (context.api_version !== "anchor-clause-context-v1") return null;
  const definitionCandidates = array(context.definition_candidates)
    .slice(0, COMPARISON_CONNECTED_CONTEXT_ITEMS)
    .map(record);
  const resolvedReferenceTargets = array(context.resolved_reference_targets)
    .slice(0, COMPARISON_CONNECTED_CONTEXT_ITEMS)
    .map(record);
  const unresolvedReferences = array(context.unresolved_references)
    .slice(0, COMPARISON_CONNECTED_CONTEXT_ITEMS)
    .map(record);
  const coverage = record(context.coverage);
  const totals = {
    definitionCandidates:
      citationInteger(coverage.definition_candidates_total) ??
        definitionCandidates.length,
    resolvedReferenceTargets:
      citationInteger(coverage.resolved_reference_targets_total) ??
        resolvedReferenceTargets.length,
    unresolvedReferences:
      citationInteger(coverage.unresolved_references_total) ??
        unresolvedReferences.length,
  };
  return {
    definitionCandidates,
    resolvedReferenceTargets,
    unresolvedReferences,
    totals,
    previewLimited: totals.definitionCandidates > definitionCandidates.length ||
      totals.resolvedReferenceTargets > resolvedReferenceTargets.length ||
      totals.unresolvedReferences > unresolvedReferences.length,
  };
}

export function commercialPositionEvidence(value) {
  const position = record(value);
  if (
    ![
      "liability-position-signals-v1",
      "liability-position-signals-v2",
      "liability-position-signals-v3",
      "liability-position-signals-v4",
    ].includes(position.api_version)
  ) {
    return null;
  }
  const signals = array(position.signals)
    .slice(0, COMMERCIAL_POSITION_SIGNAL_MAX)
    .map(record);
  const coverage = record(position.coverage);
  return {
    apiVersion: position.api_version,
    applicable: position.applicable === true,
    reason: typeof position.reason === "string" ? position.reason : null,
    detectorVersion: typeof position.detector_version === "string"
      ? position.detector_version
      : null,
    valueExtractorVersion: typeof position.value_extractor_version === "string"
      ? position.value_extractor_version
      : null,
    attributeProjectionVersion:
      typeof position.attribute_projection_version === "string"
        ? position.attribute_projection_version
        : null,
    scope: typeof position.scope === "string" ? position.scope : null,
    eligibility: record(position.eligibility),
    signals,
    matchedSignalCount: citationInteger(coverage.matched_signal_count) ??
      signals.length,
    supportedRuleCount: citationInteger(coverage.supported_rule_count),
    limits: record(position.limits),
    limitations: array(position.limitations)
      .filter((item) => typeof item === "string")
      .slice(0, 10),
  };
}

export function terminationPositionEvidence(value) {
  const position = record(value);
  if (position.api_version !== "termination-position-signals-v1") return null;
  const signals = array(position.signals)
    .slice(0, TERMINATION_POSITION_SIGNAL_MAX)
    .map(record);
  const coverage = record(position.coverage);
  return {
    apiVersion: position.api_version,
    applicable: position.applicable === true,
    reason: typeof position.reason === "string" ? position.reason : null,
    detectorVersion: typeof position.detector_version === "string"
      ? position.detector_version
      : null,
    durationExtractorVersion:
      typeof position.duration_extractor_version === "string"
        ? position.duration_extractor_version
        : null,
    scope: typeof position.scope === "string" ? position.scope : null,
    eligibility: record(position.eligibility),
    signals,
    matchedSignalCount: citationInteger(coverage.matched_signal_count) ??
      signals.length,
    supportedRuleCount: citationInteger(coverage.supported_rule_count),
    limits: record(position.limits),
    limitations: array(position.limitations)
      .filter((item) => typeof item === "string")
      .slice(0, 10),
  };
}

export function terminationSignalHasLocalLinkage(value) {
  const support = record(record(value).observed_support);
  return (
    typeof support.text === "string" &&
    LOCAL_TERMINATION_TERM_PATTERN.test(support.text)
  );
}

export function assignmentPositionEvidence(value) {
  const position = record(value);
  if (position.api_version !== "assignment-position-signals-v1") return null;
  const signals = array(position.signals)
    .slice(0, ASSIGNMENT_POSITION_SIGNAL_MAX)
    .map(record);
  const coverage = record(position.coverage);
  return {
    apiVersion: position.api_version,
    applicable: position.applicable === true,
    reason: typeof position.reason === "string" ? position.reason : null,
    detectorVersion: typeof position.detector_version === "string"
      ? position.detector_version
      : null,
    scope: typeof position.scope === "string" ? position.scope : null,
    eligibility: record(position.eligibility),
    signals,
    matchedSignalCount: citationInteger(coverage.matched_signal_count) ??
      signals.length,
    supportedRuleCount: citationInteger(coverage.supported_rule_count),
    limits: record(position.limits),
    limitations: array(position.limitations)
      .filter((item) => typeof item === "string")
      .slice(0, 10),
  };
}

export function governingLawPositionEvidence(value) {
  const position = record(value);
  if (position.api_version !== "governing-law-position-signals-v1") {
    return null;
  }
  const signals = array(position.signals)
    .slice(0, GOVERNING_LAW_POSITION_SIGNAL_MAX)
    .map(record);
  const coverage = record(position.coverage);
  return {
    apiVersion: position.api_version,
    applicable: position.applicable === true,
    reason: typeof position.reason === "string" ? position.reason : null,
    detectorVersion: typeof position.detector_version === "string"
      ? position.detector_version
      : null,
    scope: typeof position.scope === "string" ? position.scope : null,
    eligibility: record(position.eligibility),
    signals,
    matchedSignalCount: citationInteger(coverage.matched_signal_count) ??
      signals.length,
    supportedRuleCount: citationInteger(coverage.supported_rule_count),
    limits: record(position.limits),
    limitations: array(position.limitations)
      .filter((item) => typeof item === "string")
      .slice(0, 10),
  };
}

export function indemnityPositionEvidence(value) {
  const position = record(value);
  if (position.api_version !== "indemnity-position-signals-v1") return null;
  const signals = array(position.signals)
    .slice(0, INDEMNITY_POSITION_SIGNAL_MAX)
    .map(record);
  const coverage = record(position.coverage);
  return {
    apiVersion: position.api_version,
    applicable: position.applicable === true,
    reason: typeof position.reason === "string" ? position.reason : null,
    detectorVersion: typeof position.detector_version === "string"
      ? position.detector_version
      : null,
    scope: typeof position.scope === "string" ? position.scope : null,
    analysisWindow: record(position.analysis_window),
    eligibility: record(position.eligibility),
    signals,
    matchedSignalCount: citationInteger(coverage.matched_signal_count) ??
      signals.length,
    supportedRuleCount: citationInteger(coverage.supported_rule_count),
    limits: record(position.limits),
    limitations: array(position.limitations)
      .filter((item) => typeof item === "string")
      .slice(0, 10),
  };
}

export function observedDurationEntries(value) {
  const packet = record(value);
  if (packet.schema !== TERMINATION_DURATION_CANDIDATE_SCHEMA) return [];
  const seen = new Set();
  return array(packet.duration_terms)
    .slice(0, 4)
    .map((item) => {
      const candidate = record(item);
      return typeof candidate.observed_text === "string"
        ? candidate.observed_text
        : null;
    })
    .filter((candidate) => {
      if (!candidate) return false;
      const normalized = candidate.replace(/\s+/gu, " ").trim().toLowerCase();
      if (!normalized || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
}

function observedValueCandidateEntries(value) {
  const packet = record(value);
  if (!LIABILITY_VALUE_CANDIDATE_SCHEMAS.has(packet.schema)) return [];
  return LIABILITY_VALUE_CANDIDATE_CATEGORIES.map(([key, label]) => {
    const seen = new Set();
    const values = array(packet[key])
      .slice(0, 8)
      .map((item) => {
        const candidate = record(item);
        return typeof candidate.observed_text === "string"
          ? candidate.observed_text
          : null;
      })
      .filter((candidate) => {
        if (!candidate) return false;
        const normalized = candidate.replace(/\s+/gu, " ").trim().toLowerCase();
        if (!normalized || seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
      });
    return { key, label, values };
  }).filter((entry) => entry.values.length);
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

const FAMILY_REVIEW_STATUSES = new Set([
  "unreviewed",
  "same_family",
  "not_same_family",
  "uncertain",
  "not_assessable",
  "mixed",
]);
const FAMILY_DOCUMENT_KINDS = new Set(["contract", "amendment"]);
const FAMILY_DOCUMENT_KIND_BASES = new Set([
  "observed",
  "reviewed",
  "generated",
]);
const FAMILY_HYPOTHESES = new Set([
  "same_instrument_family",
  "updates_document",
]);
const FAMILY_TIMESTAMP_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})$/;

function isValidFamilyTimestamp(value) {
  if (typeof value !== "string") return false;
  const match = FAMILY_TIMESTAMP_PATTERN.exec(value);
  if (!match || Number.isNaN(Date.parse(value))) return false;
  const [year, month, day, hour, minute, second] = match
    .slice(1, 7)
    .map(Number);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth &&
    hour <= 23 && minute <= 59 && second <= 59;
}

function familyCharacterLength(value) {
  return typeof value === "string" ? Array.from(value).length : 0;
}

function familyInteger(value) {
  return Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function familyReviewAggregate(value) {
  const review = record(value);
  const verdictCounts = record(review.verdict_counts);
  const counts = {
    same_family: familyInteger(verdictCounts.same_family),
    not_same_family: familyInteger(verdictCounts.not_same_family),
    uncertain: familyInteger(verdictCounts.uncertain),
    not_assessable: familyInteger(verdictCounts.not_assessable),
  };
  if (Object.values(counts).some((count) => count === null)) return null;
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const currentDecisionCount = familyInteger(review.current_decision_count);
  const positiveVerdicts = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([verdict]) => verdict);
  const expectedStatus = total === 0
    ? "unreviewed"
    : positiveVerdicts.length > 1
    ? "mixed"
    : positiveVerdicts[0];
  const expectedConflicting = counts.same_family > 0 &&
    counts.not_same_family > 0;
  const latestDecisionIsConsistent = total === 0
    ? review.latest_decision_at === null
    : isValidFamilyTimestamp(review.latest_decision_at);
  if (
    !Number.isSafeInteger(total) ||
    currentDecisionCount !== total ||
    review.status !== expectedStatus ||
    review.conflicting !== expectedConflicting ||
    !latestDecisionIsConsistent
  ) {
    return null;
  }
  return {
    status: review.status,
    currentDecisionCount,
    conflicting: review.conflicting,
  };
}

export function familyContextEvidence(value, expectedAgreementId) {
  if (
    typeof expectedAgreementId !== "string" ||
    !UUID_PATTERN.test(expectedAgreementId)
  ) {
    return null;
  }

  const context = record(value);
  const limits = record(context.limits);
  if (
    context.api_version !== "agreement-family-context-v1" ||
    context.agreement_id !== expectedAgreementId ||
    context.proposal_only !== true ||
    context.relationship_written_automatically !== false ||
    context.review_question !== "same_agreement_family" ||
    familyInteger(limits.maximum_items) !== FAMILY_CONTEXT_ITEM_MAX ||
    limits.candidate_currentness_required !== true ||
    limits.newest_candidate_per_pair_selected_before_currentness_check !==
      true ||
    limits.stale_latest_candidate_fails_closed_without_historical_fallback !==
      true ||
    limits.both_documents_published_and_redistributable !== true ||
    limits.observed_current_extractions_required !== true ||
    limits.exact_content_duplicates_excluded !== true ||
    limits.reviewer_identity_exposed !== false ||
    limits.review_rationale_exposed !== false ||
    limits.family_review_confirms_direction !== false ||
    limits.legal_effect_determined !== false ||
    limits.agreement_relationship_created !== false
  ) {
    return null;
  }

  const coverage = record(context.coverage);
  const eligibleDistinctPairs = familyInteger(
    coverage.eligible_distinct_pairs,
  );
  const returnedCount = familyInteger(coverage.returned_count);
  const omittedCount = familyInteger(coverage.omitted_count);
  if (
    eligibleDistinctPairs === null ||
    returnedCount === null ||
    omittedCount === null ||
    returnedCount > FAMILY_CONTEXT_ITEM_MAX ||
    eligibleDistinctPairs < returnedCount ||
    omittedCount !== eligibleDistinctPairs - returnedCount ||
    typeof coverage.truncated !== "boolean" ||
    coverage.truncated !== (omittedCount > 0)
  ) {
    return null;
  }

  if (
    !Array.isArray(context.items) ||
    context.items.length !== returnedCount ||
    context.items.length > FAMILY_CONTEXT_ITEM_MAX
  ) {
    return null;
  }

  const seenCandidateIds = new Set();
  const seenCandidateKeys = new Set();
  const seenRelatedAgreements = new Set();
  const items = [];
  for (const itemValue of context.items) {
    const item = record(itemValue);
    const proposal = record(item.proposal);
    const relatedAgreement = record(item.related_agreement);
    const humanReview = record(item.human_review);
    if (
      typeof item.candidate_id !== "string" ||
      !UUID_PATTERN.test(item.candidate_id) ||
      typeof item.candidate_run_id !== "string" ||
      !UUID_PATTERN.test(item.candidate_run_id) ||
      item.candidate_current !== true ||
      typeof item.source !== "string" ||
      !SOURCE_PATTERN.test(item.source) ||
      !FAMILY_HYPOTHESES.has(proposal.hypothesis) ||
      proposal.hypothesis_basis !== "generated" ||
      proposal.proposal_only !== true ||
      proposal.relationship_written_automatically !== false
    ) {
      return null;
    }

    const subjectAgreementId = proposal.subject_agreement_id;
    const objectAgreementId = proposal.object_agreement_id;
    if (
      typeof subjectAgreementId !== "string" ||
      !UUID_PATTERN.test(subjectAgreementId) ||
      typeof objectAgreementId !== "string" ||
      !UUID_PATTERN.test(objectAgreementId) ||
      subjectAgreementId === objectAgreementId
    ) {
      return null;
    }
    const expectedDirection = subjectAgreementId === expectedAgreementId
      ? "outgoing"
      : objectAgreementId === expectedAgreementId
      ? "incoming"
      : null;
    const relatedAgreementId = subjectAgreementId === expectedAgreementId
      ? objectAgreementId
      : objectAgreementId === expectedAgreementId
      ? subjectAgreementId
      : null;
    const candidateKey = [
      item.source,
      [subjectAgreementId, objectAgreementId].sort().join(":"),
      proposal.hypothesis,
    ].join(":");
    const reviewAggregate = familyReviewAggregate(humanReview);
    const observedTitle = relatedAgreement.observed_title;
    const canonicalUrl = safeExternalUrl(relatedAgreement.canonical_url);
    if (
      proposal.direction_from_requested_agreement !== expectedDirection ||
      relatedAgreementId === null ||
      relatedAgreement.agreement_id !== relatedAgreementId ||
      seenCandidateIds.has(item.candidate_id) ||
      seenCandidateKeys.has(candidateKey) ||
      seenRelatedAgreements.has(relatedAgreementId) ||
      relatedAgreement.text_basis !== "observed" ||
      !(
        observedTitle === null ||
        (typeof observedTitle === "string" && observedTitle.trim() &&
          familyCharacterLength(observedTitle) <= 500)
      ) ||
      typeof relatedAgreement.observed_title_truncated !== "boolean" ||
      (relatedAgreement.observed_title_truncated &&
        (typeof observedTitle !== "string" ||
          familyCharacterLength(observedTitle) !== 500)) ||
      !FAMILY_DOCUMENT_KINDS.has(relatedAgreement.document_kind) ||
      !FAMILY_DOCUMENT_KIND_BASES.has(relatedAgreement.document_kind_basis) ||
      !(
        relatedAgreement.observed_published_at === null ||
        isValidFamilyTimestamp(relatedAgreement.observed_published_at)
      ) ||
      typeof relatedAgreement.canonical_url_omitted !== "boolean" ||
      !(
        relatedAgreement.canonical_url === null ||
        (typeof relatedAgreement.canonical_url === "string" &&
          canonicalUrl !== null)
      ) ||
      (relatedAgreement.canonical_url_omitted &&
        relatedAgreement.canonical_url !== null) ||
      humanReview.question !== "same_agreement_family" ||
      humanReview.aggregation_scope !==
        "current_pair_candidates_latest_decision_per_reviewer" ||
      !FAMILY_REVIEW_STATUSES.has(humanReview.status) ||
      reviewAggregate === null ||
      humanReview.reviewer_identity_exposed !== false ||
      humanReview.rationale_exposed !== false ||
      humanReview.direction_reviewed !== false ||
      humanReview.relationship_materialized_by_review !== false
    ) {
      return null;
    }

    seenCandidateIds.add(item.candidate_id);
    seenCandidateKeys.add(candidateKey);
    seenRelatedAgreements.add(relatedAgreementId);
    items.push({
      relatedAgreementId,
      observedTitle,
      observedTitleTruncated: relatedAgreement.observed_title_truncated,
      documentKind: relatedAgreement.document_kind,
      documentKindBasis: relatedAgreement.document_kind_basis,
      observedPublishedAt:
        typeof relatedAgreement.observed_published_at === "string"
          ? relatedAgreement.observed_published_at
          : null,
      canonicalUrl,
      canonicalUrlOmitted: relatedAgreement.canonical_url_omitted,
      source: item.source,
      textBasis: relatedAgreement.text_basis,
      reviewStatus: reviewAggregate.status,
      currentDecisionCount: reviewAggregate.currentDecisionCount,
      conflicting: reviewAggregate.conflicting,
    });
  }

  return {
    items,
    totals: { eligibleDistinctPairs, returnedCount, omittedCount },
    truncated: coverage.truncated,
  };
}

function familyProposalReviewAggregate(value) {
  const review = record(value);
  const verdictCounts = record(review.verdict_counts);
  const counts = {
    same_family: familyInteger(verdictCounts.same_family),
    not_same_family: familyInteger(verdictCounts.not_same_family),
    uncertain: familyInteger(verdictCounts.uncertain),
    not_assessable: familyInteger(verdictCounts.not_assessable),
  };
  if (Object.values(counts).some((count) => count === null)) return null;
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const decisionCount = familyInteger(review.current_decision_count);
  const positive = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([verdict]) => verdict);
  const expectedStatus = total === 0
    ? "unreviewed"
    : positive.length > 1
    ? "mixed"
    : positive[0];
  const conflicting = counts.same_family > 0 && counts.not_same_family > 0;
  if (
    decisionCount !== total ||
    review.status !== expectedStatus ||
    review.conflicting !== conflicting ||
    review.question !== "same_agreement_family" ||
    review.aggregation_scope !==
      "current_pair_candidates_latest_decision_per_reviewer" ||
    review.reviewer_identity_exposed !== false ||
    review.rationale_exposed !== false ||
    review.direction_reviewed !== false ||
    review.relationship_materialized_by_review !== false ||
    Object.hasOwn(review, "latest_decision_at") ||
    Object.hasOwn(review, "principal_id") ||
    Object.hasOwn(review, "reviewer_identity") ||
    Object.hasOwn(review, "rationale") ||
    Object.hasOwn(review, "confidence")
  ) {
    return null;
  }
  return { status: review.status, decisionCount, conflicting };
}

function familyProposalDocument(value) {
  const document = record(value);
  const agreementId = document.agreement_id;
  const observedTitle = document.observed_title;
  const canonicalUrl = safeExternalUrl(document.canonical_url);
  if (
    typeof agreementId !== "string" ||
    !UUID_PATTERN.test(agreementId) ||
    document.text_basis !== "observed" ||
    !FAMILY_DOCUMENT_KINDS.has(document.document_kind) ||
    !FAMILY_DOCUMENT_KIND_BASES.has(document.document_kind_basis) ||
    !(
      observedTitle === null ||
      (typeof observedTitle === "string" &&
        observedTitle.trim().length > 0 &&
        familyCharacterLength(observedTitle) <= 500)
    ) ||
    typeof document.observed_title_truncated !== "boolean" ||
    (document.observed_title_truncated &&
      (typeof observedTitle !== "string" ||
        familyCharacterLength(observedTitle) !== 500)) ||
    !(
      document.observed_published_at === null ||
      isValidFamilyTimestamp(document.observed_published_at)
    ) ||
    typeof document.canonical_url_omitted !== "boolean" ||
    !(
      document.canonical_url === null ||
      (typeof document.canonical_url === "string" && canonicalUrl !== null)
    ) ||
    (document.canonical_url_omitted && document.canonical_url !== null) ||
    Object.hasOwn(document, "primary_artifact_sha256") ||
    Object.hasOwn(document, "source_external_id") ||
    Object.hasOwn(document, "extraction_id") ||
    Object.hasOwn(document, "storage_object_path")
  ) {
    return null;
  }
  return {
    agreementId,
    observedTitle,
    observedTitleTruncated: document.observed_title_truncated,
    documentKind: document.document_kind,
    documentKindBasis: document.document_kind_basis,
    observedPublishedAt: typeof document.observed_published_at === "string"
      ? document.observed_published_at
      : null,
    canonicalUrl,
    canonicalUrlOmitted: document.canonical_url_omitted,
    textBasis: document.text_basis,
  };
}

export function familyProposalSearchEvidence(
  value,
  expectedLimit = 20,
  expectedOffset = 0,
) {
  if (
    !Number.isInteger(expectedLimit) ||
    expectedLimit < 1 ||
    expectedLimit > FAMILY_PROPOSAL_PAGE_MAX ||
    !Number.isInteger(expectedOffset) ||
    expectedOffset < 0 ||
    expectedOffset > FAMILY_PROPOSAL_OFFSET_MAX
  ) {
    return null;
  }

  const root = record(value);
  const page = record(root.page);
  const limits = record(root.limits);
  const returnedCount = familyInteger(page.returned_count);
  const eligibleDistinctPairs = familyInteger(page.eligible_distinct_pairs);
  if (
    root.api_version !== "agreement-family-proposal-search-v1" ||
    root.proposal_only !== true ||
    root.relationship_ledger_included !== false ||
    root.review_question !== "same_agreement_family" ||
    familyInteger(page.limit) !== expectedLimit ||
    familyInteger(page.offset) !== expectedOffset ||
    returnedCount === null ||
    eligibleDistinctPairs === null ||
    returnedCount > expectedLimit ||
    returnedCount > eligibleDistinctPairs ||
    typeof page.has_more !== "boolean" ||
    page.has_more !==
      (expectedOffset + returnedCount < eligibleDistinctPairs) ||
    (expectedOffset < eligibleDistinctPairs &&
      returnedCount !== Math.min(
          expectedLimit,
          eligibleDistinctPairs - expectedOffset,
        )) ||
    (expectedOffset >= eligibleDistinctPairs && returnedCount !== 0) ||
    familyInteger(limits.maximum_page_size) !== FAMILY_PROPOSAL_PAGE_MAX ||
    familyInteger(limits.maximum_offset) !== FAMILY_PROPOSAL_OFFSET_MAX ||
    limits.candidate_generation_exhaustive !== false ||
    limits.candidate_currentness_required !== true ||
    limits.newest_candidate_per_pair_selected_before_currentness_check !==
      true ||
    limits.stale_latest_candidate_fails_closed_without_historical_fallback !==
      true ||
    limits.both_documents_published_and_redistributable !== true ||
    limits.observed_current_extractions_required !== true ||
    limits.exact_content_duplicates_excluded !== true ||
    limits.generated_direction_exposed !== false ||
    limits.raw_metrics_exposed !== false ||
    limits.reason_codes_exposed !== false ||
    limits.reviewer_identity_exposed !== false ||
    limits.review_rationale_exposed !== false ||
    limits.review_counts_may_be_pseudonymous_in_small_cohorts !== true ||
    limits.family_review_confirms_direction !== false ||
    limits.legal_effect_determined !== false ||
    limits.agreement_relationship_created !== false ||
    !Array.isArray(root.items) ||
    root.items.length !== returnedCount
  ) {
    return null;
  }

  const forbiddenItemKeys = [
    "candidate_run_id",
    "run_key",
    "hypothesis",
    "direction_from_requested_agreement",
    "metric",
    "reason_codes",
    "evidence_metadata",
    "generator_name",
    "generator_version",
    "generator_config",
    "subject",
    "object",
  ];
  const seenCandidateIds = new Set();
  const seenPairKeys = new Set();
  let previousPairKey = null;
  const items = [];
  for (const itemValue of root.items) {
    const item = record(itemValue);
    if (
      typeof item.candidate_id !== "string" ||
      !UUID_PATTERN.test(item.candidate_id) ||
      seenCandidateIds.has(item.candidate_id) ||
      typeof item.source !== "string" ||
      !SOURCE_PATTERN.test(item.source) ||
      item.candidate_current !== true ||
      item.proposal_only !== true ||
      item.relationship_written_automatically !== false ||
      item.document_ordering !==
        "agreement_id_lexicographic_not_legal_direction" ||
      !isValidFamilyTimestamp(item.generated_at) ||
      !isValidFamilyTimestamp(item.corpus_snapshotted_at) ||
      !Array.isArray(item.documents) ||
      item.documents.length !== 2 ||
      forbiddenItemKeys.some((key) => Object.hasOwn(item, key))
    ) {
      return null;
    }
    const documents = item.documents.map(familyProposalDocument);
    if (documents.some((document) => document === null)) return null;
    const first = documents[0];
    const second = documents[1];
    if (first.agreementId >= second.agreementId) return null;
    const pairKey = `${item.source}:${first.agreementId}:${second.agreementId}`;
    if (
      seenPairKeys.has(pairKey) ||
      (previousPairKey !== null && pairKey <= previousPairKey)
    ) {
      return null;
    }
    const review = familyProposalReviewAggregate(item.human_review);
    if (review === null) return null;
    seenCandidateIds.add(item.candidate_id);
    seenPairKeys.add(pairKey);
    previousPairKey = pairKey;
    items.push({
      candidateId: item.candidate_id,
      source: item.source,
      candidateCurrent: item.candidate_current,
      generatedAt: item.generated_at,
      corpusSnapshottedAt: item.corpus_snapshotted_at,
      proposalOnly: item.proposal_only,
      relationshipWrittenAutomatically:
        item.relationship_written_automatically,
      documents,
      reviewStatus: review.status,
      currentDecisionCount: review.decisionCount,
      conflicting: review.conflicting,
    });
  }

  return {
    items,
    page: {
      limit: expectedLimit,
      offset: expectedOffset,
      returnedCount,
      eligibleDistinctPairs,
      hasMore: page.has_more,
    },
    candidateGenerationExhaustive: false,
    reviewCountsMayBePseudonymous: true,
  };
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

function citationInteger(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
}

function citationAnchorContext(value) {
  const context = record(value);
  if (context.api_version !== "anchor-clause-context-v1") return null;
  const coverage = record(context.coverage);
  const limits = record(context.limits);
  return {
    schema: "esheria.anchor-clause-context.v1",
    anchor_clause_id: typeof context.anchor_clause_id === "string" &&
        UUID_PATTERN.test(context.anchor_clause_id)
      ? context.anchor_clause_id
      : null,
    definition_candidates: array(context.definition_candidates)
      .slice(0, 20)
      .map((value) => {
        const definition = record(value);
        const observed = citationText(definition.definition, 4_000);
        return {
          term: typeof definition.term === "string" ? definition.term : null,
          definition: observed.text,
          definition_truncated: observed.truncated ||
            definition.definition_truncated === true,
          definition_sha256: typeof definition.definition_sha256 === "string"
            ? definition.definition_sha256
            : null,
          definition_basis: typeof definition.definition_basis === "string"
            ? definition.definition_basis
            : null,
          usage_match_basis: typeof definition.usage_match_basis === "string"
            ? definition.usage_match_basis
            : null,
          usage_match_method: typeof definition.usage_match_method === "string"
            ? definition.usage_match_method
            : null,
          ambiguous_definition_occurrences:
            definition.ambiguous_definition_occurrences === true,
          defining_clause_id:
            typeof definition.defining_clause_id === "string" &&
              UUID_PATTERN.test(definition.defining_clause_id)
              ? definition.defining_clause_id
              : null,
          defining_clause_sequence: citationInteger(
            definition.defining_clause_sequence,
          ),
          defining_clause_heading:
            typeof definition.defining_clause_heading === "string"
              ? definition.defining_clause_heading
              : null,
          defining_clause_sha256:
            typeof definition.defining_clause_sha256 === "string"
              ? definition.defining_clause_sha256
              : null,
          char_start: citationInteger(definition.char_start),
          char_end: citationInteger(definition.char_end),
        };
      }),
    resolved_reference_targets: array(context.resolved_reference_targets)
      .slice(0, 20)
      .map((value) => {
        const reference = record(value);
        const target = citationText(reference.target_text, 8_000);
        return {
          observed_reference: typeof reference.observed_reference === "string"
            ? reference.observed_reference
            : null,
          observed_evidence_location: isRecord(
              reference.observed_evidence_location,
            )
            ? reference.observed_evidence_location
            : null,
          observation_basis: typeof reference.observation_basis === "string"
            ? reference.observation_basis
            : null,
          observation_confidence: Number.isFinite(
              Number(reference.observation_confidence),
            )
            ? Number(reference.observation_confidence)
            : null,
          target_clause_id: typeof reference.target_clause_id === "string" &&
              UUID_PATTERN.test(reference.target_clause_id)
            ? reference.target_clause_id
            : null,
          target_sequence: citationInteger(reference.target_sequence),
          target_heading: typeof reference.target_heading === "string"
            ? reference.target_heading
            : null,
          target_text: target.text,
          target_text_truncated: target.truncated ||
            reference.target_text_truncated === true,
          target_text_sha256: typeof reference.target_text_sha256 === "string"
            ? reference.target_text_sha256
            : null,
          target_location: {
            page_start: citationInteger(reference.target_page_start),
            page_end: citationInteger(reference.target_page_end),
            char_start: citationInteger(reference.target_char_start),
            char_end: citationInteger(reference.target_char_end),
            evidence_location: isRecord(reference.target_evidence_location)
              ? reference.target_evidence_location
              : null,
          },
          target_resolution_status:
            typeof reference.target_resolution_status === "string"
              ? reference.target_resolution_status
              : null,
          target_resolution_basis:
            typeof reference.target_resolution_basis === "string"
              ? reference.target_resolution_basis
              : null,
          target_resolution_method:
            typeof reference.target_resolution_method === "string"
              ? reference.target_resolution_method
              : null,
          target_resolution_confidence: Number.isFinite(
              Number(reference.target_resolution_confidence),
            )
            ? Number(reference.target_resolution_confidence)
            : null,
        };
      }),
    unresolved_references: array(context.unresolved_references)
      .slice(0, 20)
      .map((value) => {
        const reference = record(value);
        return {
          observed_reference: typeof reference.observed_reference === "string"
            ? reference.observed_reference
            : null,
          observed_evidence_location: isRecord(
              reference.observed_evidence_location,
            )
            ? reference.observed_evidence_location
            : null,
          observation_basis: typeof reference.observation_basis === "string"
            ? reference.observation_basis
            : null,
          target_resolution_status:
            typeof reference.target_resolution_status === "string"
              ? reference.target_resolution_status
              : null,
          target_resolution_basis:
            typeof reference.target_resolution_basis === "string"
              ? reference.target_resolution_basis
              : null,
          target_resolution_method:
            typeof reference.target_resolution_method === "string"
              ? reference.target_resolution_method
              : null,
        };
      }),
    coverage: {
      definition_candidates_total: citationInteger(
        coverage.definition_candidates_total,
      ),
      resolved_reference_targets_total: citationInteger(
        coverage.resolved_reference_targets_total,
      ),
      unresolved_references_total: citationInteger(
        coverage.unresolved_references_total,
      ),
      unresolved_statuses: isRecord(coverage.unresolved_statuses)
        ? coverage.unresolved_statuses
        : {},
    },
    limits: {
      definition_candidates: citationInteger(limits.definition_candidates),
      definition_characters: citationInteger(limits.definition_characters),
      reference_targets: citationInteger(limits.reference_targets),
      target_text_characters: citationInteger(limits.target_text_characters),
      definition_usage_match_is_generated:
        limits.definition_usage_match_is_generated === true,
      definition_usage_match_is_legal_interpretation:
        limits.definition_usage_match_is_legal_interpretation === true,
      reference_resolution_is_legal_interpretation:
        limits.reference_resolution_is_legal_interpretation === true,
      unresolved_references_are_preserved:
        limits.unresolved_references_are_preserved === true,
      same_current_extraction_only:
        limits.same_current_extraction_only === true,
    },
  };
}

function citationObservedValueCandidate(value) {
  const candidate = record(value);
  const observed = citationText(candidate.observed_text, 500);
  return {
    observed_text: observed.text,
    observed_text_truncated: observed.truncated,
    text_basis: candidate.text_basis === "observed" ? "observed" : null,
    sha256: typeof candidate.sha256 === "string" ? candidate.sha256 : null,
    clause_char_start: citationInteger(candidate.clause_char_start),
    clause_char_end: citationInteger(candidate.clause_char_end),
    document_char_start: citationInteger(candidate.document_char_start),
    document_char_end: citationInteger(candidate.document_char_end),
  };
}

function citationObservedValueCandidates(value) {
  const packet = record(value);
  if (!LIABILITY_VALUE_CANDIDATE_SCHEMAS.has(packet.schema)) {
    return null;
  }
  const window = record(packet.observed_window);
  const windowText = citationText(window.text, 1_000);
  const limits = record(packet.limits);
  const result = {
    schema: packet.schema,
    value_extractor_version: typeof packet.value_extractor_version === "string"
      ? packet.value_extractor_version
      : null,
    observed_window: window.text === undefined || window.text === null
      ? null
      : {
        text: windowText.text,
        text_truncated: windowText.truncated,
        text_basis: window.text_basis === "observed" ? "observed" : null,
        sha256: typeof window.sha256 === "string" ? window.sha256 : null,
        clause_char_start: citationInteger(window.clause_char_start),
        clause_char_end: citationInteger(window.clause_char_end),
        document_char_start: citationInteger(window.document_char_start),
        document_char_end: citationInteger(window.document_char_end),
      },
    limits: {
      maximum_candidates_per_category: citationInteger(
        limits.maximum_candidates_per_category,
      ),
      candidate_values_are_legal_conclusions:
        limits.candidate_values_are_legal_conclusions === true,
      window_ends_after_matched_text_characters: citationInteger(
        limits.window_ends_after_matched_text_characters,
      ),
      maximum_signal_context_after_characters: citationInteger(
        limits.maximum_signal_context_after_characters,
      ),
      window_scope: typeof limits.window_scope === "string"
        ? limits.window_scope
        : null,
    },
  };
  for (const [key] of LIABILITY_VALUE_CANDIDATE_CATEGORIES) {
    result[key] = array(packet[key])
      .slice(0, 8)
      .map(citationObservedValueCandidate);
  }
  return result;
}

function citationCommercialPosition(value) {
  const position = commercialPositionEvidence(value);
  if (!position) return null;
  const allowedAttributeKeys = [
    "currency_amount_present",
    "percentage_present",
    "fees_or_charges_basis_present",
    "greater_or_lesser_formula_present",
    "facially_bilateral_language_present",
    "indirect",
    "consequential",
    "special",
    "incidental",
    "exemplary",
    "punitive",
    "death_or_personal_injury",
    "fraud",
    "wilful_or_willful_misconduct",
  ];
  return {
    schema: {
      "liability-position-signals-v1": "esheria.liability-position-signals.v1",
      "liability-position-signals-v2": "esheria.liability-position-signals.v2",
      "liability-position-signals-v3": "esheria.liability-position-signals.v3",
      "liability-position-signals-v4": "esheria.liability-position-signals.v4",
    }[position.apiVersion],
    applicable: position.applicable,
    reason: position.reason,
    detector_version: position.detectorVersion,
    value_extractor_version: position.valueExtractorVersion,
    attribute_projection_version: position.attributeProjectionVersion,
    scope: position.scope,
    eligibility: {
      theme: typeof position.eligibility.theme === "string"
        ? position.eligibility.theme
        : null,
      theme_basis: typeof position.eligibility.theme_basis === "string"
        ? position.eligibility.theme_basis
        : null,
      taxonomy_version:
        typeof position.eligibility.taxonomy_version === "string"
          ? position.eligibility.taxonomy_version
          : null,
      generated_by: typeof position.eligibility.generated_by === "string"
        ? position.eligibility.generated_by
        : null,
    },
    signals: position.signals.map((value) => {
      const signal = record(value);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const supportText = citationText(support.text, 2_000);
      const matchedText = citationText(support.matched_text, 600);
      return {
        signal_key: typeof signal.signal_key === "string"
          ? signal.signal_key
          : null,
        label: typeof signal.label === "string" ? signal.label : null,
        signal_basis: typeof signal.signal_basis === "string"
          ? signal.signal_basis
          : null,
        confidence: Number.isFinite(Number(signal.confidence))
          ? Number(signal.confidence)
          : null,
        detector_version: typeof signal.detector_version === "string"
          ? signal.detector_version
          : null,
        rule_id: typeof signal.rule_id === "string" ? signal.rule_id : null,
        generated_attributes: Object.fromEntries(
          allowedAttributeKeys
            .filter((key) => typeof attributes[key] === "boolean")
            .map((key) => [key, attributes[key]]),
        ),
        observed_support: {
          text: supportText.text,
          text_truncated: supportText.truncated,
          sha256: typeof support.sha256 === "string" ? support.sha256 : null,
          text_basis: typeof support.text_basis === "string"
            ? support.text_basis
            : null,
          clause_char_start: citationInteger(support.clause_char_start),
          clause_char_end: citationInteger(support.clause_char_end),
          document_char_start: citationInteger(support.document_char_start),
          document_char_end: citationInteger(support.document_char_end),
          matched_text: matchedText.text,
          matched_text_truncated: matchedText.truncated,
          matched_text_sha256: typeof support.matched_text_sha256 === "string"
            ? support.matched_text_sha256
            : null,
          matched_clause_char_start: citationInteger(
            support.matched_clause_char_start,
          ),
          matched_clause_char_end: citationInteger(
            support.matched_clause_char_end,
          ),
          bounded_excerpt: support.bounded_excerpt === true,
        },
        observed_value_candidates: citationObservedValueCandidates(
          signal.observed_value_candidates,
        ),
        anchor_clause_id: typeof signal.anchor_clause_id === "string" &&
            UUID_PATTERN.test(signal.anchor_clause_id)
          ? signal.anchor_clause_id
          : null,
        anchor_clause_sha256: typeof signal.anchor_clause_sha256 === "string"
          ? signal.anchor_clause_sha256
          : null,
      };
    }),
    coverage: {
      matched_signal_count: position.matchedSignalCount,
      supported_rule_count: position.supportedRuleCount,
    },
    limits: {
      maximum_signals: citationInteger(position.limits.maximum_signals),
      support_is_bounded_excerpt:
        position.limits.support_is_bounded_excerpt === true,
      absence_is_not_evidence_of_absence:
        position.limits.absence_is_not_evidence_of_absence === true,
      signals_are_legal_conclusions:
        position.limits.signals_are_legal_conclusions === true,
    },
    limitations: position.limitations,
  };
}

function citationObservedDurationCandidates(value) {
  const packet = record(value);
  if (packet.schema !== TERMINATION_DURATION_CANDIDATE_SCHEMA) return null;
  const window = record(packet.observed_window);
  const windowText = citationText(window.text, 1_000);
  const limits = record(packet.limits);
  return {
    schema: packet.schema,
    value_extractor_version: typeof packet.value_extractor_version === "string"
      ? packet.value_extractor_version
      : null,
    observed_window: window.text === undefined || window.text === null
      ? null
      : {
        text: windowText.text,
        text_truncated: windowText.truncated,
        text_basis: window.text_basis === "observed" ? "observed" : null,
        sha256: typeof window.sha256 === "string" ? window.sha256 : null,
        clause_char_start: citationInteger(window.clause_char_start),
        clause_char_end: citationInteger(window.clause_char_end),
        document_char_start: citationInteger(window.document_char_start),
        document_char_end: citationInteger(window.document_char_end),
      },
    duration_terms: array(packet.duration_terms)
      .slice(0, 4)
      .map(citationObservedValueCandidate),
    limits: {
      maximum_candidates: citationInteger(limits.maximum_candidates),
      candidate_values_are_legal_conclusions:
        limits.candidate_values_are_legal_conclusions === true,
      window_scope: typeof limits.window_scope === "string"
        ? limits.window_scope
        : null,
    },
  };
}

function citationTerminationPosition(value) {
  const position = terminationPositionEvidence(value);
  if (!position) return null;
  const allowedAttributeKeys = [
    "duration_candidate_present",
    "notice_language_present",
    "facially_bilateral_language_present",
  ];
  return {
    schema: "esheria.termination-position-signals.v1",
    applicable: position.applicable,
    reason: position.reason,
    detector_version: position.detectorVersion,
    duration_extractor_version: position.durationExtractorVersion,
    scope: position.scope,
    eligibility: {
      theme: typeof position.eligibility.theme === "string"
        ? position.eligibility.theme
        : null,
      theme_basis: typeof position.eligibility.theme_basis === "string"
        ? position.eligibility.theme_basis
        : null,
      taxonomy_version:
        typeof position.eligibility.taxonomy_version === "string"
          ? position.eligibility.taxonomy_version
          : null,
      generated_by: typeof position.eligibility.generated_by === "string"
        ? position.eligibility.generated_by
        : null,
    },
    signals: position.signals.map((value) => {
      const signal = record(value);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const supportText = citationText(support.text, 2_000);
      const matchedText = citationText(support.matched_text, 600);
      return {
        signal_key: typeof signal.signal_key === "string"
          ? signal.signal_key
          : null,
        label: typeof signal.label === "string" ? signal.label : null,
        signal_basis: typeof signal.signal_basis === "string"
          ? signal.signal_basis
          : null,
        confidence: Number.isFinite(Number(signal.confidence))
          ? Number(signal.confidence)
          : null,
        detector_version: typeof signal.detector_version === "string"
          ? signal.detector_version
          : null,
        rule_id: typeof signal.rule_id === "string" ? signal.rule_id : null,
        generated_attributes: Object.fromEntries(
          allowedAttributeKeys
            .filter((key) => typeof attributes[key] === "boolean")
            .map((key) => [key, attributes[key]]),
        ),
        observed_support: {
          text: supportText.text,
          text_truncated: supportText.truncated,
          sha256: typeof support.sha256 === "string" ? support.sha256 : null,
          text_basis: support.text_basis === "observed" ? "observed" : null,
          clause_char_start: citationInteger(support.clause_char_start),
          clause_char_end: citationInteger(support.clause_char_end),
          document_char_start: citationInteger(support.document_char_start),
          document_char_end: citationInteger(support.document_char_end),
          matched_text: matchedText.text,
          matched_text_truncated: matchedText.truncated,
          matched_text_sha256: typeof support.matched_text_sha256 === "string"
            ? support.matched_text_sha256
            : null,
          matched_clause_char_start: citationInteger(
            support.matched_clause_char_start,
          ),
          matched_clause_char_end: citationInteger(
            support.matched_clause_char_end,
          ),
          bounded_excerpt: support.bounded_excerpt === true,
        },
        observed_duration_candidates: citationObservedDurationCandidates(
          signal.observed_duration_candidates,
        ),
        anchor_clause_id: typeof signal.anchor_clause_id === "string" &&
            UUID_PATTERN.test(signal.anchor_clause_id)
          ? signal.anchor_clause_id
          : null,
        anchor_clause_sha256: typeof signal.anchor_clause_sha256 === "string"
          ? signal.anchor_clause_sha256
          : null,
      };
    }),
    coverage: {
      matched_signal_count: position.matchedSignalCount,
      supported_rule_count: position.supportedRuleCount,
    },
    limits: {
      maximum_signals: citationInteger(position.limits.maximum_signals),
      maximum_duration_candidates_per_signal: citationInteger(
        position.limits.maximum_duration_candidates_per_signal,
      ),
      support_is_bounded_excerpt:
        position.limits.support_is_bounded_excerpt === true,
      absence_is_not_evidence_of_absence:
        position.limits.absence_is_not_evidence_of_absence === true,
      signals_are_legal_conclusions:
        position.limits.signals_are_legal_conclusions === true,
      duration_candidates_are_normalized:
        position.limits.duration_candidates_are_normalized === true,
    },
    limitations: position.limitations,
  };
}

function citationAssignmentPosition(value) {
  const position = assignmentPositionEvidence(value);
  if (!position) return null;
  const allowedAttributeKeys = [
    "consent_language_present",
    "notice_language_present",
    "termination_language_present",
    "facially_bilateral_language_present",
    "finance_context_present",
    "change_of_control_language_present",
  ];
  return {
    schema: "esheria.assignment-position-signals.v1",
    applicable: position.applicable,
    reason: position.reason,
    detector_version: position.detectorVersion,
    scope: position.scope,
    eligibility: {
      theme: typeof position.eligibility.theme === "string"
        ? position.eligibility.theme
        : null,
      theme_basis: typeof position.eligibility.theme_basis === "string"
        ? position.eligibility.theme_basis
        : null,
      taxonomy_version:
        typeof position.eligibility.taxonomy_version === "string"
          ? position.eligibility.taxonomy_version
          : null,
      generated_by: typeof position.eligibility.generated_by === "string"
        ? position.eligibility.generated_by
        : null,
      support_method: typeof position.eligibility.support_method === "string"
        ? position.eligibility.support_method
        : null,
    },
    signals: position.signals.map((value) => {
      const signal = record(value);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const supportText = citationText(support.text, 2_000);
      const matchedText = citationText(support.matched_text, 600);
      return {
        signal_key: typeof signal.signal_key === "string"
          ? signal.signal_key
          : null,
        label: typeof signal.label === "string" ? signal.label : null,
        signal_basis: typeof signal.signal_basis === "string"
          ? signal.signal_basis
          : null,
        confidence: Number.isFinite(Number(signal.confidence))
          ? Number(signal.confidence)
          : null,
        detector_version: typeof signal.detector_version === "string"
          ? signal.detector_version
          : null,
        rule_id: typeof signal.rule_id === "string" ? signal.rule_id : null,
        generated_attributes: Object.fromEntries(
          allowedAttributeKeys
            .filter((key) => typeof attributes[key] === "boolean")
            .map((key) => [key, attributes[key]]),
        ),
        observed_support: {
          text: supportText.text,
          text_truncated: supportText.truncated,
          sha256: typeof support.sha256 === "string" ? support.sha256 : null,
          text_basis: support.text_basis === "observed" ? "observed" : null,
          clause_char_start: citationInteger(support.clause_char_start),
          clause_char_end: citationInteger(support.clause_char_end),
          document_char_start: citationInteger(support.document_char_start),
          document_char_end: citationInteger(support.document_char_end),
          matched_text: matchedText.text,
          matched_text_truncated: matchedText.truncated,
          matched_text_sha256: typeof support.matched_text_sha256 === "string"
            ? support.matched_text_sha256
            : null,
          matched_clause_char_start: citationInteger(
            support.matched_clause_char_start,
          ),
          matched_clause_char_end: citationInteger(
            support.matched_clause_char_end,
          ),
          support_method: typeof support.support_method === "string"
            ? support.support_method
            : null,
          bounded_excerpt: support.bounded_excerpt === true,
        },
        anchor_clause_id: typeof signal.anchor_clause_id === "string" &&
            UUID_PATTERN.test(signal.anchor_clause_id)
          ? signal.anchor_clause_id
          : null,
        anchor_clause_sha256: typeof signal.anchor_clause_sha256 === "string"
          ? signal.anchor_clause_sha256
          : null,
      };
    }),
    coverage: {
      matched_signal_count: position.matchedSignalCount,
      supported_rule_count: position.supportedRuleCount,
    },
    limits: {
      maximum_signals: citationInteger(position.limits.maximum_signals),
      support_maximum_characters: citationInteger(
        position.limits.support_maximum_characters,
      ),
      support_is_detector_bounded:
        position.limits.support_is_detector_bounded === true,
      absence_is_not_evidence_of_absence:
        position.limits.absence_is_not_evidence_of_absence === true,
      signals_are_legal_conclusions:
        position.limits.signals_are_legal_conclusions === true,
      party_entitlement_is_determined:
        position.limits.party_entitlement_is_determined === true,
      exceptions_outside_support_may_apply:
        position.limits.exceptions_outside_support_may_apply === true,
    },
    limitations: position.limitations,
  };
}

function citationGoverningLawPosition(value) {
  const position = governingLawPositionEvidence(value);
  if (!position) return null;
  const allowedAttributeKeys = [
    "exclusive_jurisdiction_language_present",
    "nonexclusive_jurisdiction_language_present",
    "conflict_of_laws_language_present",
    "venue_objection_waiver_language_present",
    "service_of_process_language_present",
    "arbitration_language_present",
  ];
  return {
    schema: "esheria.governing-law-position-signals.v1",
    applicable: position.applicable,
    reason: position.reason,
    detector_version: position.detectorVersion,
    scope: position.scope,
    eligibility: {
      theme: typeof position.eligibility.theme === "string"
        ? position.eligibility.theme
        : null,
      theme_basis: typeof position.eligibility.theme_basis === "string"
        ? position.eligibility.theme_basis
        : null,
      taxonomy_version:
        typeof position.eligibility.taxonomy_version === "string"
          ? position.eligibility.taxonomy_version
          : null,
      generated_by: typeof position.eligibility.generated_by === "string"
        ? position.eligibility.generated_by
        : null,
      support_method: typeof position.eligibility.support_method === "string"
        ? position.eligibility.support_method
        : null,
    },
    signals: position.signals.map((value) => {
      const signal = record(value);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const supportText = citationText(support.text, 2_000);
      const matchedText = citationText(support.matched_text, 600);
      return {
        signal_key: typeof signal.signal_key === "string"
          ? signal.signal_key
          : null,
        label: typeof signal.label === "string" ? signal.label : null,
        signal_basis: typeof signal.signal_basis === "string"
          ? signal.signal_basis
          : null,
        confidence: Number.isFinite(Number(signal.confidence))
          ? Number(signal.confidence)
          : null,
        detector_version: typeof signal.detector_version === "string"
          ? signal.detector_version
          : null,
        rule_id: typeof signal.rule_id === "string" ? signal.rule_id : null,
        generated_attributes: Object.fromEntries(
          allowedAttributeKeys
            .filter((key) => typeof attributes[key] === "boolean")
            .map((key) => [key, attributes[key]]),
        ),
        observed_support: {
          text: supportText.text,
          text_truncated: supportText.truncated,
          sha256: typeof support.sha256 === "string" ? support.sha256 : null,
          text_basis: support.text_basis === "observed" ? "observed" : null,
          clause_char_start: citationInteger(support.clause_char_start),
          clause_char_end: citationInteger(support.clause_char_end),
          document_char_start: citationInteger(support.document_char_start),
          document_char_end: citationInteger(support.document_char_end),
          matched_text: matchedText.text,
          matched_text_truncated: matchedText.truncated,
          matched_text_sha256: typeof support.matched_text_sha256 === "string"
            ? support.matched_text_sha256
            : null,
          matched_clause_char_start: citationInteger(
            support.matched_clause_char_start,
          ),
          matched_clause_char_end: citationInteger(
            support.matched_clause_char_end,
          ),
          support_method: typeof support.support_method === "string"
            ? support.support_method
            : null,
          bounded_excerpt: support.bounded_excerpt === true,
        },
        anchor_clause_id: typeof signal.anchor_clause_id === "string" &&
            UUID_PATTERN.test(signal.anchor_clause_id)
          ? signal.anchor_clause_id
          : null,
        anchor_clause_sha256: typeof signal.anchor_clause_sha256 === "string"
          ? signal.anchor_clause_sha256
          : null,
      };
    }),
    coverage: {
      matched_signal_count: position.matchedSignalCount,
      supported_rule_count: position.supportedRuleCount,
    },
    limits: {
      maximum_signals: citationInteger(position.limits.maximum_signals),
      support_maximum_characters: citationInteger(
        position.limits.support_maximum_characters,
      ),
      support_is_detector_bounded:
        position.limits.support_is_detector_bounded === true,
      absence_is_not_evidence_of_absence:
        position.limits.absence_is_not_evidence_of_absence === true,
      signals_are_legal_conclusions:
        position.limits.signals_are_legal_conclusions === true,
      forum_selection_is_determined:
        position.limits.forum_selection_is_determined === true,
      jurisdiction_is_normalized:
        position.limits.jurisdiction_is_normalized === true,
      conflicts_rules_are_resolved:
        position.limits.conflicts_rules_are_resolved === true,
      exceptions_outside_support_may_apply:
        position.limits.exceptions_outside_support_may_apply === true,
    },
    limitations: position.limitations,
  };
}

function citationIndemnityPosition(value) {
  const position = indemnityPositionEvidence(value);
  if (!position) return null;
  const allowedAttributeKeys = [
    "facially_bilateral_language_present",
    "on_demand_language_present",
    "losses_language_present",
    "liability_cap_reference_present",
    "insurance_language_present",
    "negligence_or_misconduct_language_present",
  ];
  const window = position.analysisWindow;
  return {
    schema: "esheria.indemnity-position-signals.v1",
    applicable: position.applicable,
    reason: position.reason,
    detector_version: position.detectorVersion,
    scope: position.scope,
    analysis_window: {
      text_basis: window.text_basis === "observed" ? "observed" : null,
      sha256: typeof window.sha256 === "string" ? window.sha256 : null,
      clause_char_start: citationInteger(window.clause_char_start),
      clause_char_end: citationInteger(window.clause_char_end),
      clause_character_count: citationInteger(window.clause_character_count),
      truncated_before: window.truncated_before === true,
      truncated_after: window.truncated_after === true,
      centered_on_theme_support: window.centered_on_theme_support === true,
    },
    eligibility: {
      theme: typeof position.eligibility.theme === "string"
        ? position.eligibility.theme
        : null,
      theme_basis: typeof position.eligibility.theme_basis === "string"
        ? position.eligibility.theme_basis
        : null,
      taxonomy_version:
        typeof position.eligibility.taxonomy_version === "string"
          ? position.eligibility.taxonomy_version
          : null,
      generated_by: typeof position.eligibility.generated_by === "string"
        ? position.eligibility.generated_by
        : null,
      support_method: typeof position.eligibility.support_method === "string"
        ? position.eligibility.support_method
        : null,
      theme_support_sha256:
        typeof position.eligibility.theme_support_sha256 === "string"
          ? position.eligibility.theme_support_sha256
          : null,
    },
    signals: position.signals.map((value) => {
      const signal = record(value);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const supportText = citationText(support.text, 2_000);
      const matchedText = citationText(support.matched_text, 600);
      return {
        signal_key: typeof signal.signal_key === "string"
          ? signal.signal_key
          : null,
        label: typeof signal.label === "string" ? signal.label : null,
        signal_basis: typeof signal.signal_basis === "string"
          ? signal.signal_basis
          : null,
        confidence: Number.isFinite(Number(signal.confidence))
          ? Number(signal.confidence)
          : null,
        detector_version: typeof signal.detector_version === "string"
          ? signal.detector_version
          : null,
        rule_id: typeof signal.rule_id === "string" ? signal.rule_id : null,
        generated_attributes: Object.fromEntries(
          allowedAttributeKeys
            .filter((key) => typeof attributes[key] === "boolean")
            .map((key) => [key, attributes[key]]),
        ),
        observed_support: {
          text: supportText.text,
          text_truncated: supportText.truncated,
          sha256: typeof support.sha256 === "string" ? support.sha256 : null,
          text_basis: support.text_basis === "observed" ? "observed" : null,
          clause_char_start: citationInteger(support.clause_char_start),
          clause_char_end: citationInteger(support.clause_char_end),
          document_char_start: citationInteger(support.document_char_start),
          document_char_end: citationInteger(support.document_char_end),
          matched_text: matchedText.text,
          matched_text_truncated: matchedText.truncated,
          matched_text_sha256: typeof support.matched_text_sha256 === "string"
            ? support.matched_text_sha256
            : null,
          matched_clause_char_start: citationInteger(
            support.matched_clause_char_start,
          ),
          matched_clause_char_end: citationInteger(
            support.matched_clause_char_end,
          ),
          bounded_excerpt: support.bounded_excerpt === true,
        },
        anchor_clause_id: typeof signal.anchor_clause_id === "string" &&
            UUID_PATTERN.test(signal.anchor_clause_id)
          ? signal.anchor_clause_id
          : null,
        anchor_clause_sha256: typeof signal.anchor_clause_sha256 === "string"
          ? signal.anchor_clause_sha256
          : null,
      };
    }),
    coverage: {
      matched_signal_count: position.matchedSignalCount,
      supported_rule_count: position.supportedRuleCount,
    },
    limits: {
      maximum_signals: citationInteger(position.limits.maximum_signals),
      analysis_window_maximum_characters: citationInteger(
        position.limits.analysis_window_maximum_characters,
      ),
      support_maximum_characters: citationInteger(
        position.limits.support_maximum_characters,
      ),
      support_is_bounded_excerpt:
        position.limits.support_is_bounded_excerpt === true,
      absence_is_not_evidence_of_absence:
        position.limits.absence_is_not_evidence_of_absence === true,
      signals_are_legal_conclusions:
        position.limits.signals_are_legal_conclusions === true,
      party_entitlement_is_determined:
        position.limits.party_entitlement_is_determined === true,
      claim_coverage_is_determined:
        position.limits.claim_coverage_is_determined === true,
      enforceability_is_determined:
        position.limits.enforceability_is_determined === true,
      exceptions_outside_support_may_apply:
        position.limits.exceptions_outside_support_may_apply === true,
    },
    limitations: position.limitations,
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
      !selectionKey ||
      evidence.anchor?.id !== selection.clause_id ||
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
          : typeof selection.source_name === "string"
          ? selection.source_name
          : null,
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
          : typeof selection.observed_title === "string"
          ? selection.observed_title
          : null,
        document_kind: typeof agreement.document_kind === "string"
          ? agreement.document_kind
          : typeof selection.document_kind === "string"
          ? selection.document_kind
          : null,
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
      connected_context: citationAnchorContext(evidence.anchorContext),
      commercial_position: citationCommercialPosition(
        evidence.commercialPosition,
      ),
      termination_position: citationTerminationPosition(
        evidence.terminationPosition,
      ),
      assignment_position: citationAssignmentPosition(
        evidence.assignmentPosition,
      ),
      governing_law_position: citationGoverningLawPosition(
        evidence.governingLawPosition,
      ),
      indemnity_position: citationIndemnityPosition(evidence.indemnityPosition),
    };
  });

  return {
    schema: "esheria.contract-citations.v9",
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
      "Definition-use matching and target resolution are generated navigation aids; unresolved references are preserved rather than guessed.",
      "Commercial, termination, assignment/change-of-control, governing-law/forum and indemnity position signals are generated clause-level pattern matches, not legal conclusions; absence is not evidence of absence.",
      "Cap-value candidates are exact lexical tokens from bounded observed support, not normalized amounts or interpreted liability caps.",
      "Verify the recorded source, completeness, amendments and governing law before legal or commercial reliance.",
    ],
    citations,
  };
}

const LIABILITY_POSITION_MATRIX_SIGNALS = Object.freeze([
  {
    key: "explicit_liability_limit_formula",
    prefix: "liability_limit_formula",
    attributes: [
      "currency_amount_present",
      "percentage_present",
      "fees_or_charges_basis_present",
      "greater_or_lesser_formula_present",
      "facially_bilateral_language_present",
    ],
  },
  {
    key: "excluded_loss_language",
    prefix: "excluded_loss",
    attributes: [
      "indirect",
      "consequential",
      "special",
      "incidental",
      "exemplary",
      "punitive",
    ],
  },
  {
    key: "cap_carveout_language",
    prefix: "cap_carveout",
    attributes: [
      "death_or_personal_injury",
      "fraud",
      "wilful_or_willful_misconduct",
    ],
  },
  {
    key: "express_unlimited_liability",
    prefix: "express_unlimited_liability",
    attributes: [],
  },
]);

const LIABILITY_POSITION_MATRIX_BASE_COLUMNS = Object.freeze([
  "matrix_schema",
  "generated_at",
  "retrieval_query",
  "document_kind_filter",
  "source_filter",
  "selected_count",
  "citation_number",
  "retrieval_rank",
  "observed_published_at",
  "source_slug",
  "source_name",
  "source_publisher",
  "source_external_id",
  "source_url",
  "source_terms_url",
  "source_policy_assessment_status",
  "source_human_review_required",
  "agreement_id",
  "agreement_title",
  "agreement_document_kind",
  "agreement_document_kind_basis",
  "artifact_sha256",
  "extraction_method",
  "extraction_version",
  "agreement_text_basis",
  "clause_id",
  "clause_sequence",
  "clause_heading",
  "clause_text_basis",
  "clause_text_sha256",
  "clause_location",
  "clause_char_start",
  "clause_char_end",
  "observed_clause_text",
  "observed_clause_text_truncated",
  "generated_clause_type",
  "position_schema",
  "position_applicable",
  "position_reason",
  "detector_version",
  "value_extractor_version",
  "attribute_projection_version",
  "detector_scope",
  "matched_signal_count",
  "supported_rule_count",
]);

const LIABILITY_POSITION_MATRIX_SIGNAL_COLUMNS = Object.freeze(
  LIABILITY_POSITION_MATRIX_SIGNALS.flatMap(({ key, prefix, attributes }) => {
    const columns = [
      `${prefix}_detector_match`,
      `${prefix}_signal_basis`,
      `${prefix}_confidence`,
      `${prefix}_rule_id`,
      ...attributes.map((attribute) => `${prefix}_${attribute}`),
      `${prefix}_observed_support`,
      `${prefix}_support_text_basis`,
      `${prefix}_support_sha256`,
      `${prefix}_matched_text`,
      `${prefix}_matched_text_sha256`,
    ];
    if (key === "explicit_liability_limit_formula") {
      columns.push(
        `${prefix}_observed_value_window`,
        `${prefix}_observed_value_window_sha256`,
        `${prefix}_observed_currency_amounts`,
        `${prefix}_observed_percentages`,
        `${prefix}_observed_cap_basis_terms`,
        `${prefix}_observed_comparison_formulas`,
        `${prefix}_observed_period_terms`,
        `${prefix}_observed_value_candidates_json`,
      );
    }
    return columns;
  }),
);

const LIABILITY_POSITION_MATRIX_COLUMNS = Object.freeze([
  ...LIABILITY_POSITION_MATRIX_BASE_COLUMNS,
  ...LIABILITY_POSITION_MATRIX_SIGNAL_COLUMNS,
  "support_is_bounded_excerpt",
  "absence_is_not_evidence_of_absence",
  "signals_are_legal_conclusions",
  "position_limitations",
  "export_limitations",
]);

function matrixBoolean(value) {
  if (value === true) return "TRUE";
  if (value === false) return "FALSE";
  return "";
}

function csvCell(value) {
  let content = value === null || value === undefined ? "" : String(value);
  if (/^\s*[=+\-@]/u.test(content)) content = `'${content}`;
  content = content.replaceAll('"', '""');
  return `"${content}"`;
}

export function buildLiabilityPositionMatrixCsv({
  query = "",
  kind = "",
  source = "",
  entries = [],
  generatedAt = new Date().toISOString(),
} = {}) {
  const manifest = buildCitationManifest({
    query,
    kind,
    source,
    entries,
    generatedAt,
  });
  const scope = manifest.retrieval_scope;
  const rows = manifest.citations.map((citation) => {
    const agreement = record(citation.agreement);
    const clause = record(citation.matched_clause);
    const clauseLocation = record(clause.location);
    const interpretation = record(clause.generated_interpretation);
    const sourceRecord = record(citation.source);
    const retrieval = record(citation.retrieval);
    const position = record(citation.commercial_position);
    const coverage = record(position.coverage);
    const limits = record(position.limits);
    const positionApplicable = typeof position.applicable === "boolean"
      ? position.applicable
      : null;
    const signalMap = new Map();
    for (const value of array(position.signals)) {
      const signal = record(value);
      if (
        typeof signal.signal_key === "string" &&
        !signalMap.has(signal.signal_key)
      ) {
        signalMap.set(signal.signal_key, signal);
      }
    }
    const row = {
      matrix_schema: LIABILITY_POSITION_MATRIX_SCHEMA,
      generated_at: manifest.generated_at,
      retrieval_query: scope.query,
      document_kind_filter: scope.document_kind,
      source_filter: scope.source,
      selected_count: scope.selected_count,
      citation_number: citation.citation_number,
      retrieval_rank: retrieval.rank,
      observed_published_at: retrieval.observed_published_at,
      source_slug: sourceRecord.slug,
      source_name: sourceRecord.name,
      source_publisher: sourceRecord.publisher,
      source_external_id: sourceRecord.external_id,
      source_url: sourceRecord.canonical_url,
      source_terms_url: sourceRecord.terms_url,
      source_policy_assessment_status: sourceRecord.policy_assessment_status,
      source_human_review_required: matrixBoolean(
        sourceRecord.human_review_required,
      ),
      agreement_id: agreement.id,
      agreement_title: agreement.title,
      agreement_document_kind: agreement.document_kind,
      agreement_document_kind_basis: agreement.document_kind_basis,
      artifact_sha256: agreement.artifact_sha256,
      extraction_method: agreement.extraction_method,
      extraction_version: agreement.extraction_version,
      agreement_text_basis: agreement.text_basis,
      clause_id: clause.id,
      clause_sequence: clause.sequence,
      clause_heading: clause.heading,
      clause_text_basis: clause.text_basis,
      clause_text_sha256: clause.observed_text_sha256,
      clause_location: clauseLocation.display,
      clause_char_start: clauseLocation.char_start,
      clause_char_end: clauseLocation.char_end,
      observed_clause_text: clause.observed_text,
      observed_clause_text_truncated: matrixBoolean(
        clause.observed_text_truncated,
      ),
      generated_clause_type: interpretation.clause_type,
      position_schema: position.schema,
      position_applicable: matrixBoolean(positionApplicable),
      position_reason: position.reason,
      detector_version: position.detector_version,
      value_extractor_version: position.value_extractor_version,
      attribute_projection_version: position.attribute_projection_version,
      detector_scope: position.scope,
      matched_signal_count: coverage.matched_signal_count,
      supported_rule_count: coverage.supported_rule_count,
    };

    for (
      const {
        key,
        prefix,
        attributes,
      } of LIABILITY_POSITION_MATRIX_SIGNALS
    ) {
      const signal = signalMap.get(key);
      const generatedAttributes = record(signal?.generated_attributes);
      const support = record(signal?.observed_support);
      row[`${prefix}_detector_match`] = signal
        ? "TRUE"
        : positionApplicable === true
        ? "FALSE"
        : "";
      row[`${prefix}_signal_basis`] = signal?.signal_basis ?? null;
      row[`${prefix}_confidence`] = signal?.confidence ?? null;
      row[`${prefix}_rule_id`] = signal?.rule_id ?? null;
      for (const attribute of attributes) {
        row[`${prefix}_${attribute}`] = matrixBoolean(
          generatedAttributes[attribute],
        );
      }
      row[`${prefix}_observed_support`] = support.text ?? null;
      row[`${prefix}_support_text_basis`] = support.text_basis ?? null;
      row[`${prefix}_support_sha256`] = support.sha256 ?? null;
      row[`${prefix}_matched_text`] = support.matched_text ?? null;
      row[`${prefix}_matched_text_sha256`] = support.matched_text_sha256 ??
        null;
      if (key === "explicit_liability_limit_formula") {
        const candidates = record(signal?.observed_value_candidates);
        const observedWindow = record(candidates.observed_window);
        const displayedCandidates = new Map(
          observedValueCandidateEntries(candidates).map((entry) => [
            entry.key,
            entry.values,
          ]),
        );
        row[`${prefix}_observed_value_window`] = observedWindow.text ?? null;
        row[`${prefix}_observed_value_window_sha256`] = observedWindow.sha256 ??
          null;
        for (const [category] of LIABILITY_VALUE_CANDIDATE_CATEGORIES) {
          row[`${prefix}_observed_${category}`] = array(
            displayedCandidates.get(category),
          ).join(" | ");
        }
        row[`${prefix}_observed_value_candidates_json`] =
          signal?.observed_value_candidates
            ? JSON.stringify(signal.observed_value_candidates)
            : null;
      }
    }

    row.support_is_bounded_excerpt = matrixBoolean(
      limits.support_is_bounded_excerpt,
    );
    row.absence_is_not_evidence_of_absence = matrixBoolean(
      limits.absence_is_not_evidence_of_absence,
    );
    row.signals_are_legal_conclusions = matrixBoolean(
      limits.signals_are_legal_conclusions,
    );
    row.position_limitations = array(position.limitations).join(" | ");
    row.export_limitations = manifest.limitations.join(" | ");
    return row;
  });

  return `\uFEFF${
    [
      LIABILITY_POSITION_MATRIX_COLUMNS.map(csvCell).join(","),
      ...rows.map((row) =>
        LIABILITY_POSITION_MATRIX_COLUMNS.map((column) => csvCell(row[column]))
          .join(",")
      ),
    ].join("\r\n")
  }\r\n`;
}

const TERMINATION_POSITION_MATRIX_COLUMNS = Object.freeze([
  "matrix_schema",
  "generated_at",
  "retrieval_query",
  "document_kind_filter",
  "source_filter",
  "selected_count",
  "citation_number",
  "signal_row_number",
  "retrieval_rank",
  "observed_published_at",
  "source_slug",
  "source_name",
  "source_publisher",
  "source_external_id",
  "source_url",
  "source_terms_url",
  "source_policy_assessment_status",
  "source_human_review_required",
  "agreement_id",
  "agreement_title",
  "agreement_document_kind",
  "agreement_document_kind_basis",
  "artifact_sha256",
  "extraction_method",
  "extraction_version",
  "agreement_text_basis",
  "clause_id",
  "clause_sequence",
  "clause_heading",
  "clause_text_basis",
  "clause_text_sha256",
  "clause_location",
  "clause_char_start",
  "clause_char_end",
  "observed_clause_text",
  "observed_clause_text_truncated",
  "generated_clause_type",
  "position_schema",
  "position_applicable",
  "position_reason",
  "detector_version",
  "duration_extractor_version",
  "detector_scope",
  "matched_signal_count",
  "supported_rule_count",
  "eligibility_theme",
  "eligibility_theme_basis",
  "eligibility_taxonomy_version",
  "eligibility_generated_by",
  "detector_match",
  "signal_key",
  "signal_label",
  "signal_basis",
  "signal_confidence",
  "signal_rule_id",
  "duration_candidate_present",
  "notice_language_present",
  "facially_bilateral_language_present",
  "same_support_explicit_termination_term",
  "observed_support",
  "support_text_truncated",
  "support_text_basis",
  "support_sha256",
  "support_clause_char_start",
  "support_clause_char_end",
  "support_document_char_start",
  "support_document_char_end",
  "matched_text",
  "matched_text_truncated",
  "matched_text_sha256",
  "matched_clause_char_start",
  "matched_clause_char_end",
  "support_is_bounded_excerpt",
  "duration_candidate_schema",
  "duration_candidate_extractor_version",
  "duration_candidate_count",
  "observed_duration_terms",
  "observed_duration_candidate_hashes",
  "observed_duration_candidates_json",
  "anchor_clause_id",
  "anchor_clause_sha256",
  "absence_is_not_evidence_of_absence",
  "signals_are_legal_conclusions",
  "duration_candidates_are_normalized",
  "position_limitations",
  "export_limitations",
]);

export function buildTerminationPositionMatrixCsv({
  query = "",
  kind = "",
  source = "",
  entries = [],
  generatedAt = new Date().toISOString(),
} = {}) {
  const manifest = buildCitationManifest({
    query,
    kind,
    source,
    entries,
    generatedAt,
  });
  const scope = manifest.retrieval_scope;
  const exportLimitations = [
    ...manifest.limitations,
    "Each row represents one generated termination signal; clauses with no supported signal produce one non-match row.",
    "Same-support explicit-termination status is lexical proximity within bounded observed support, not causation, an operative right, or a legal conclusion.",
  ];
  const rows = manifest.citations.flatMap((citation) => {
    const agreement = record(citation.agreement);
    const clause = record(citation.matched_clause);
    const clauseLocation = record(clause.location);
    const interpretation = record(clause.generated_interpretation);
    const sourceRecord = record(citation.source);
    const retrieval = record(citation.retrieval);
    const position = record(citation.termination_position);
    const coverage = record(position.coverage);
    const eligibility = record(position.eligibility);
    const limits = record(position.limits);
    const positionApplicable = typeof position.applicable === "boolean"
      ? position.applicable
      : null;
    const signals = array(position.signals).slice(
      0,
      TERMINATION_POSITION_SIGNAL_MAX,
    );
    const signalRows = signals.length ? signals : [null];

    return signalRows.map((signalValue, signalIndex) => {
      const signal = record(signalValue);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const durationPacket = record(signal.observed_duration_candidates);
      const durationTerms = array(durationPacket.duration_terms).slice(0, 4);
      const hasSignal = typeof signal.signal_key === "string";
      return {
        matrix_schema: TERMINATION_POSITION_MATRIX_SCHEMA,
        generated_at: manifest.generated_at,
        retrieval_query: scope.query,
        document_kind_filter: scope.document_kind,
        source_filter: scope.source,
        selected_count: scope.selected_count,
        citation_number: citation.citation_number,
        signal_row_number: hasSignal ? signalIndex + 1 : null,
        retrieval_rank: retrieval.rank,
        observed_published_at: retrieval.observed_published_at,
        source_slug: sourceRecord.slug,
        source_name: sourceRecord.name,
        source_publisher: sourceRecord.publisher,
        source_external_id: sourceRecord.external_id,
        source_url: sourceRecord.canonical_url,
        source_terms_url: sourceRecord.terms_url,
        source_policy_assessment_status: sourceRecord.policy_assessment_status,
        source_human_review_required: matrixBoolean(
          sourceRecord.human_review_required,
        ),
        agreement_id: agreement.id,
        agreement_title: agreement.title,
        agreement_document_kind: agreement.document_kind,
        agreement_document_kind_basis: agreement.document_kind_basis,
        artifact_sha256: agreement.artifact_sha256,
        extraction_method: agreement.extraction_method,
        extraction_version: agreement.extraction_version,
        agreement_text_basis: agreement.text_basis,
        clause_id: clause.id,
        clause_sequence: clause.sequence,
        clause_heading: clause.heading,
        clause_text_basis: clause.text_basis,
        clause_text_sha256: clause.observed_text_sha256,
        clause_location: clauseLocation.display,
        clause_char_start: clauseLocation.char_start,
        clause_char_end: clauseLocation.char_end,
        observed_clause_text: clause.observed_text,
        observed_clause_text_truncated: matrixBoolean(
          clause.observed_text_truncated,
        ),
        generated_clause_type: interpretation.clause_type,
        position_schema: position.schema,
        position_applicable: matrixBoolean(positionApplicable),
        position_reason: position.reason,
        detector_version: position.detector_version,
        duration_extractor_version: position.duration_extractor_version,
        detector_scope: position.scope,
        matched_signal_count: coverage.matched_signal_count,
        supported_rule_count: coverage.supported_rule_count,
        eligibility_theme: eligibility.theme,
        eligibility_theme_basis: eligibility.theme_basis,
        eligibility_taxonomy_version: eligibility.taxonomy_version,
        eligibility_generated_by: eligibility.generated_by,
        detector_match: hasSignal
          ? "TRUE"
          : positionApplicable === true
          ? "FALSE"
          : "",
        signal_key: signal.signal_key,
        signal_label: signal.label,
        signal_basis: signal.signal_basis,
        signal_confidence: signal.confidence,
        signal_rule_id: signal.rule_id,
        duration_candidate_present: matrixBoolean(
          attributes.duration_candidate_present,
        ),
        notice_language_present: matrixBoolean(
          attributes.notice_language_present,
        ),
        facially_bilateral_language_present: matrixBoolean(
          attributes.facially_bilateral_language_present,
        ),
        same_support_explicit_termination_term: hasSignal
          ? matrixBoolean(terminationSignalHasLocalLinkage(signal))
          : "",
        observed_support: support.text,
        support_text_truncated: matrixBoolean(support.text_truncated),
        support_text_basis: support.text_basis,
        support_sha256: support.sha256,
        support_clause_char_start: support.clause_char_start,
        support_clause_char_end: support.clause_char_end,
        support_document_char_start: support.document_char_start,
        support_document_char_end: support.document_char_end,
        matched_text: support.matched_text,
        matched_text_truncated: matrixBoolean(support.matched_text_truncated),
        matched_text_sha256: support.matched_text_sha256,
        matched_clause_char_start: support.matched_clause_char_start,
        matched_clause_char_end: support.matched_clause_char_end,
        support_is_bounded_excerpt: matrixBoolean(support.bounded_excerpt),
        duration_candidate_schema: durationPacket.schema,
        duration_candidate_extractor_version:
          durationPacket.value_extractor_version,
        duration_candidate_count: durationTerms.length,
        observed_duration_terms: durationTerms
          .map((value) => record(value).observed_text)
          .filter((value) => typeof value === "string")
          .join(" | "),
        observed_duration_candidate_hashes: durationTerms
          .map((value) => record(value).sha256)
          .filter((value) => typeof value === "string")
          .join(" | "),
        observed_duration_candidates_json: hasSignal
          ? JSON.stringify(signal.observed_duration_candidates ?? null)
          : null,
        anchor_clause_id: signal.anchor_clause_id,
        anchor_clause_sha256: signal.anchor_clause_sha256,
        absence_is_not_evidence_of_absence: matrixBoolean(
          limits.absence_is_not_evidence_of_absence,
        ),
        signals_are_legal_conclusions: matrixBoolean(
          limits.signals_are_legal_conclusions,
        ),
        duration_candidates_are_normalized: matrixBoolean(
          limits.duration_candidates_are_normalized,
        ),
        position_limitations: array(position.limitations).join(" | "),
        export_limitations: exportLimitations.join(" | "),
      };
    });
  });

  return `\uFEFF${
    [
      TERMINATION_POSITION_MATRIX_COLUMNS.map(csvCell).join(","),
      ...rows.map((row) =>
        TERMINATION_POSITION_MATRIX_COLUMNS.map((column) =>
          csvCell(row[column])
        ).join(",")
      ),
    ].join("\r\n")
  }\r\n`;
}

const ASSIGNMENT_POSITION_MATRIX_COLUMNS = Object.freeze([
  "matrix_schema",
  "generated_at",
  "retrieval_query",
  "document_kind_filter",
  "source_filter",
  "selected_count",
  "citation_number",
  "signal_row_number",
  "retrieval_rank",
  "observed_published_at",
  "source_slug",
  "source_name",
  "source_publisher",
  "source_external_id",
  "source_url",
  "source_terms_url",
  "source_policy_assessment_status",
  "source_human_review_required",
  "agreement_id",
  "agreement_title",
  "agreement_document_kind",
  "agreement_document_kind_basis",
  "artifact_sha256",
  "extraction_method",
  "extraction_version",
  "agreement_text_basis",
  "clause_id",
  "clause_sequence",
  "clause_heading",
  "clause_text_basis",
  "clause_text_sha256",
  "clause_location",
  "clause_char_start",
  "clause_char_end",
  "observed_clause_text",
  "observed_clause_text_truncated",
  "generated_clause_type",
  "position_schema",
  "position_applicable",
  "position_reason",
  "detector_version",
  "detector_scope",
  "matched_signal_count",
  "supported_rule_count",
  "eligibility_theme",
  "eligibility_theme_basis",
  "eligibility_taxonomy_version",
  "eligibility_generated_by",
  "eligibility_support_method",
  "detector_match",
  "signal_key",
  "signal_label",
  "signal_basis",
  "signal_confidence",
  "signal_rule_id",
  "consent_language_present",
  "notice_language_present",
  "termination_language_present",
  "facially_bilateral_language_present",
  "finance_context_present",
  "change_of_control_language_present",
  "observed_support",
  "support_text_truncated",
  "support_text_basis",
  "support_sha256",
  "support_clause_char_start",
  "support_clause_char_end",
  "support_document_char_start",
  "support_document_char_end",
  "matched_text",
  "matched_text_truncated",
  "matched_text_sha256",
  "matched_clause_char_start",
  "matched_clause_char_end",
  "support_method",
  "support_is_detector_bounded",
  "support_maximum_characters",
  "anchor_clause_id",
  "anchor_clause_sha256",
  "absence_is_not_evidence_of_absence",
  "signals_are_legal_conclusions",
  "party_entitlement_is_determined",
  "exceptions_outside_support_may_apply",
  "position_limitations",
  "export_limitations",
]);

export function buildAssignmentPositionMatrixCsv({
  query = "",
  kind = "",
  source = "",
  entries = [],
  generatedAt = new Date().toISOString(),
} = {}) {
  const manifest = buildCitationManifest({
    query,
    kind,
    source,
    entries,
    generatedAt,
  });
  const scope = manifest.retrieval_scope;
  const exportLimitations = [
    ...manifest.limitations,
    "Each row represents one generated assignment/change-of-control signal; clauses with no supported signal produce one non-match row.",
    "Signals do not determine party entitlement, consent effectiveness, exception applicability, transaction consequence, or legal effect.",
    "Finance-transfer context is retained and explicitly labelled rather than treated as general commercial assignment practice.",
  ];
  const rows = manifest.citations.flatMap((citation) => {
    const agreement = record(citation.agreement);
    const clause = record(citation.matched_clause);
    const clauseLocation = record(clause.location);
    const interpretation = record(clause.generated_interpretation);
    const sourceRecord = record(citation.source);
    const retrieval = record(citation.retrieval);
    const position = record(citation.assignment_position);
    const coverage = record(position.coverage);
    const eligibility = record(position.eligibility);
    const limits = record(position.limits);
    const positionApplicable = typeof position.applicable === "boolean"
      ? position.applicable
      : null;
    const signals = array(position.signals).slice(
      0,
      ASSIGNMENT_POSITION_SIGNAL_MAX,
    );
    const signalRows = signals.length ? signals : [null];

    return signalRows.map((signalValue, signalIndex) => {
      const signal = record(signalValue);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const hasSignal = typeof signal.signal_key === "string";
      return {
        matrix_schema: ASSIGNMENT_POSITION_MATRIX_SCHEMA,
        generated_at: manifest.generated_at,
        retrieval_query: scope.query,
        document_kind_filter: scope.document_kind,
        source_filter: scope.source,
        selected_count: scope.selected_count,
        citation_number: citation.citation_number,
        signal_row_number: hasSignal ? signalIndex + 1 : null,
        retrieval_rank: retrieval.rank,
        observed_published_at: retrieval.observed_published_at,
        source_slug: sourceRecord.slug,
        source_name: sourceRecord.name,
        source_publisher: sourceRecord.publisher,
        source_external_id: sourceRecord.external_id,
        source_url: sourceRecord.canonical_url,
        source_terms_url: sourceRecord.terms_url,
        source_policy_assessment_status: sourceRecord.policy_assessment_status,
        source_human_review_required: matrixBoolean(
          sourceRecord.human_review_required,
        ),
        agreement_id: agreement.id,
        agreement_title: agreement.title,
        agreement_document_kind: agreement.document_kind,
        agreement_document_kind_basis: agreement.document_kind_basis,
        artifact_sha256: agreement.artifact_sha256,
        extraction_method: agreement.extraction_method,
        extraction_version: agreement.extraction_version,
        agreement_text_basis: agreement.text_basis,
        clause_id: clause.id,
        clause_sequence: clause.sequence,
        clause_heading: clause.heading,
        clause_text_basis: clause.text_basis,
        clause_text_sha256: clause.observed_text_sha256,
        clause_location: clauseLocation.display,
        clause_char_start: clauseLocation.char_start,
        clause_char_end: clauseLocation.char_end,
        observed_clause_text: clause.observed_text,
        observed_clause_text_truncated: matrixBoolean(
          clause.observed_text_truncated,
        ),
        generated_clause_type: interpretation.clause_type,
        position_schema: position.schema,
        position_applicable: matrixBoolean(positionApplicable),
        position_reason: position.reason,
        detector_version: position.detector_version,
        detector_scope: position.scope,
        matched_signal_count: coverage.matched_signal_count,
        supported_rule_count: coverage.supported_rule_count,
        eligibility_theme: eligibility.theme,
        eligibility_theme_basis: eligibility.theme_basis,
        eligibility_taxonomy_version: eligibility.taxonomy_version,
        eligibility_generated_by: eligibility.generated_by,
        eligibility_support_method: eligibility.support_method,
        detector_match: hasSignal
          ? "TRUE"
          : positionApplicable === true
          ? "FALSE"
          : "",
        signal_key: signal.signal_key,
        signal_label: signal.label,
        signal_basis: signal.signal_basis,
        signal_confidence: signal.confidence,
        signal_rule_id: signal.rule_id,
        consent_language_present: matrixBoolean(
          attributes.consent_language_present,
        ),
        notice_language_present: matrixBoolean(
          attributes.notice_language_present,
        ),
        termination_language_present: matrixBoolean(
          attributes.termination_language_present,
        ),
        facially_bilateral_language_present: matrixBoolean(
          attributes.facially_bilateral_language_present,
        ),
        finance_context_present: matrixBoolean(
          attributes.finance_context_present,
        ),
        change_of_control_language_present: matrixBoolean(
          attributes.change_of_control_language_present,
        ),
        observed_support: support.text,
        support_text_truncated: matrixBoolean(support.text_truncated),
        support_text_basis: support.text_basis,
        support_sha256: support.sha256,
        support_clause_char_start: support.clause_char_start,
        support_clause_char_end: support.clause_char_end,
        support_document_char_start: support.document_char_start,
        support_document_char_end: support.document_char_end,
        matched_text: support.matched_text,
        matched_text_truncated: matrixBoolean(support.matched_text_truncated),
        matched_text_sha256: support.matched_text_sha256,
        matched_clause_char_start: support.matched_clause_char_start,
        matched_clause_char_end: support.matched_clause_char_end,
        support_method: support.support_method,
        support_is_detector_bounded: matrixBoolean(
          limits.support_is_detector_bounded,
        ),
        support_maximum_characters: limits.support_maximum_characters,
        anchor_clause_id: signal.anchor_clause_id,
        anchor_clause_sha256: signal.anchor_clause_sha256,
        absence_is_not_evidence_of_absence: matrixBoolean(
          limits.absence_is_not_evidence_of_absence,
        ),
        signals_are_legal_conclusions: matrixBoolean(
          limits.signals_are_legal_conclusions,
        ),
        party_entitlement_is_determined: matrixBoolean(
          limits.party_entitlement_is_determined,
        ),
        exceptions_outside_support_may_apply: matrixBoolean(
          limits.exceptions_outside_support_may_apply,
        ),
        position_limitations: array(position.limitations).join(" | "),
        export_limitations: exportLimitations.join(" | "),
      };
    });
  });

  return `\uFEFF${
    [
      ASSIGNMENT_POSITION_MATRIX_COLUMNS.map(csvCell).join(","),
      ...rows.map((row) =>
        ASSIGNMENT_POSITION_MATRIX_COLUMNS.map((column) => csvCell(row[column]))
          .join(",")
      ),
    ].join("\r\n")
  }\r\n`;
}

const GOVERNING_LAW_POSITION_MATRIX_COLUMNS = Object.freeze([
  "matrix_schema",
  "generated_at",
  "retrieval_query",
  "document_kind_filter",
  "source_filter",
  "selected_count",
  "citation_number",
  "signal_row_number",
  "retrieval_rank",
  "observed_published_at",
  "source_slug",
  "source_name",
  "source_publisher",
  "source_external_id",
  "source_url",
  "source_terms_url",
  "source_policy_assessment_status",
  "source_human_review_required",
  "agreement_id",
  "agreement_title",
  "agreement_document_kind",
  "agreement_document_kind_basis",
  "artifact_sha256",
  "extraction_method",
  "extraction_version",
  "agreement_text_basis",
  "clause_id",
  "clause_sequence",
  "clause_heading",
  "clause_text_basis",
  "clause_text_sha256",
  "clause_location",
  "clause_char_start",
  "clause_char_end",
  "observed_clause_text",
  "observed_clause_text_truncated",
  "generated_clause_type",
  "position_schema",
  "position_applicable",
  "position_reason",
  "detector_version",
  "detector_scope",
  "matched_signal_count",
  "supported_rule_count",
  "eligibility_theme",
  "eligibility_theme_basis",
  "eligibility_taxonomy_version",
  "eligibility_generated_by",
  "eligibility_support_method",
  "detector_match",
  "signal_key",
  "signal_label",
  "signal_basis",
  "signal_confidence",
  "signal_rule_id",
  "exclusive_jurisdiction_language_present",
  "nonexclusive_jurisdiction_language_present",
  "conflict_of_laws_language_present",
  "venue_objection_waiver_language_present",
  "service_of_process_language_present",
  "arbitration_language_present",
  "observed_support",
  "support_text_truncated",
  "support_text_basis",
  "support_sha256",
  "support_clause_char_start",
  "support_clause_char_end",
  "support_document_char_start",
  "support_document_char_end",
  "matched_text",
  "matched_text_truncated",
  "matched_text_sha256",
  "matched_clause_char_start",
  "matched_clause_char_end",
  "support_method",
  "support_is_detector_bounded",
  "support_maximum_characters",
  "anchor_clause_id",
  "anchor_clause_sha256",
  "absence_is_not_evidence_of_absence",
  "signals_are_legal_conclusions",
  "forum_selection_is_determined",
  "jurisdiction_is_normalized",
  "conflicts_rules_are_resolved",
  "exceptions_outside_support_may_apply",
  "position_limitations",
  "export_limitations",
]);

export function buildGoverningLawPositionMatrixCsv({
  query = "",
  kind = "",
  source = "",
  entries = [],
  generatedAt = new Date().toISOString(),
} = {}) {
  const manifest = buildCitationManifest({
    query,
    kind,
    source,
    entries,
    generatedAt,
  });
  const scope = manifest.retrieval_scope;
  const exportLimitations = [
    ...manifest.limitations,
    "Each row represents one generated governing-law/forum signal; clauses with no supported signal produce one non-match row.",
    "Jurisdictions are not normalized, conflicts rules are not resolved, and express forum wording is not an enforceability conclusion.",
  ];
  const rows = manifest.citations.flatMap((citation) => {
    const agreement = record(citation.agreement);
    const clause = record(citation.matched_clause);
    const clauseLocation = record(clause.location);
    const interpretation = record(clause.generated_interpretation);
    const sourceRecord = record(citation.source);
    const retrieval = record(citation.retrieval);
    const position = record(citation.governing_law_position);
    const coverage = record(position.coverage);
    const eligibility = record(position.eligibility);
    const limits = record(position.limits);
    const positionApplicable = typeof position.applicable === "boolean"
      ? position.applicable
      : null;
    const signals = array(position.signals).slice(
      0,
      GOVERNING_LAW_POSITION_SIGNAL_MAX,
    );
    const signalRows = signals.length ? signals : [null];

    return signalRows.map((signalValue, signalIndex) => {
      const signal = record(signalValue);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const hasSignal = typeof signal.signal_key === "string";
      return {
        matrix_schema: GOVERNING_LAW_POSITION_MATRIX_SCHEMA,
        generated_at: manifest.generated_at,
        retrieval_query: scope.query,
        document_kind_filter: scope.document_kind,
        source_filter: scope.source,
        selected_count: scope.selected_count,
        citation_number: citation.citation_number,
        signal_row_number: hasSignal ? signalIndex + 1 : null,
        retrieval_rank: retrieval.rank,
        observed_published_at: retrieval.observed_published_at,
        source_slug: sourceRecord.slug,
        source_name: sourceRecord.name,
        source_publisher: sourceRecord.publisher,
        source_external_id: sourceRecord.external_id,
        source_url: sourceRecord.canonical_url,
        source_terms_url: sourceRecord.terms_url,
        source_policy_assessment_status: sourceRecord.policy_assessment_status,
        source_human_review_required: matrixBoolean(
          sourceRecord.human_review_required,
        ),
        agreement_id: agreement.id,
        agreement_title: agreement.title,
        agreement_document_kind: agreement.document_kind,
        agreement_document_kind_basis: agreement.document_kind_basis,
        artifact_sha256: agreement.artifact_sha256,
        extraction_method: agreement.extraction_method,
        extraction_version: agreement.extraction_version,
        agreement_text_basis: agreement.text_basis,
        clause_id: clause.id,
        clause_sequence: clause.sequence,
        clause_heading: clause.heading,
        clause_text_basis: clause.text_basis,
        clause_text_sha256: clause.observed_text_sha256,
        clause_location: clauseLocation.display,
        clause_char_start: clauseLocation.char_start,
        clause_char_end: clauseLocation.char_end,
        observed_clause_text: clause.observed_text,
        observed_clause_text_truncated: matrixBoolean(
          clause.observed_text_truncated,
        ),
        generated_clause_type: interpretation.clause_type,
        position_schema: position.schema,
        position_applicable: matrixBoolean(positionApplicable),
        position_reason: position.reason,
        detector_version: position.detector_version,
        detector_scope: position.scope,
        matched_signal_count: coverage.matched_signal_count,
        supported_rule_count: coverage.supported_rule_count,
        eligibility_theme: eligibility.theme,
        eligibility_theme_basis: eligibility.theme_basis,
        eligibility_taxonomy_version: eligibility.taxonomy_version,
        eligibility_generated_by: eligibility.generated_by,
        eligibility_support_method: eligibility.support_method,
        detector_match: hasSignal
          ? "TRUE"
          : positionApplicable === true
          ? "FALSE"
          : "",
        signal_key: signal.signal_key,
        signal_label: signal.label,
        signal_basis: signal.signal_basis,
        signal_confidence: signal.confidence,
        signal_rule_id: signal.rule_id,
        exclusive_jurisdiction_language_present: matrixBoolean(
          attributes.exclusive_jurisdiction_language_present,
        ),
        nonexclusive_jurisdiction_language_present: matrixBoolean(
          attributes.nonexclusive_jurisdiction_language_present,
        ),
        conflict_of_laws_language_present: matrixBoolean(
          attributes.conflict_of_laws_language_present,
        ),
        venue_objection_waiver_language_present: matrixBoolean(
          attributes.venue_objection_waiver_language_present,
        ),
        service_of_process_language_present: matrixBoolean(
          attributes.service_of_process_language_present,
        ),
        arbitration_language_present: matrixBoolean(
          attributes.arbitration_language_present,
        ),
        observed_support: support.text,
        support_text_truncated: matrixBoolean(support.text_truncated),
        support_text_basis: support.text_basis,
        support_sha256: support.sha256,
        support_clause_char_start: support.clause_char_start,
        support_clause_char_end: support.clause_char_end,
        support_document_char_start: support.document_char_start,
        support_document_char_end: support.document_char_end,
        matched_text: support.matched_text,
        matched_text_truncated: matrixBoolean(support.matched_text_truncated),
        matched_text_sha256: support.matched_text_sha256,
        matched_clause_char_start: support.matched_clause_char_start,
        matched_clause_char_end: support.matched_clause_char_end,
        support_method: support.support_method,
        support_is_detector_bounded: matrixBoolean(
          limits.support_is_detector_bounded,
        ),
        support_maximum_characters: limits.support_maximum_characters,
        anchor_clause_id: signal.anchor_clause_id,
        anchor_clause_sha256: signal.anchor_clause_sha256,
        absence_is_not_evidence_of_absence: matrixBoolean(
          limits.absence_is_not_evidence_of_absence,
        ),
        signals_are_legal_conclusions: matrixBoolean(
          limits.signals_are_legal_conclusions,
        ),
        forum_selection_is_determined: matrixBoolean(
          limits.forum_selection_is_determined,
        ),
        jurisdiction_is_normalized: matrixBoolean(
          limits.jurisdiction_is_normalized,
        ),
        conflicts_rules_are_resolved: matrixBoolean(
          limits.conflicts_rules_are_resolved,
        ),
        exceptions_outside_support_may_apply: matrixBoolean(
          limits.exceptions_outside_support_may_apply,
        ),
        position_limitations: array(position.limitations).join(" | "),
        export_limitations: exportLimitations.join(" | "),
      };
    });
  });

  return `\uFEFF${
    [
      GOVERNING_LAW_POSITION_MATRIX_COLUMNS.map(csvCell).join(","),
      ...rows.map((row) =>
        GOVERNING_LAW_POSITION_MATRIX_COLUMNS.map((column) =>
          csvCell(row[column])
        ).join(",")
      ),
    ].join("\r\n")
  }\r\n`;
}

const INDEMNITY_POSITION_MATRIX_COLUMNS = Object.freeze([
  "matrix_schema",
  "generated_at",
  "retrieval_query",
  "document_kind_filter",
  "source_filter",
  "selected_count",
  "citation_number",
  "signal_row_number",
  "retrieval_rank",
  "observed_published_at",
  "source_slug",
  "source_name",
  "source_publisher",
  "source_external_id",
  "source_url",
  "source_terms_url",
  "source_policy_assessment_status",
  "source_human_review_required",
  "agreement_id",
  "agreement_title",
  "agreement_document_kind",
  "agreement_document_kind_basis",
  "artifact_sha256",
  "extraction_method",
  "extraction_version",
  "agreement_text_basis",
  "clause_id",
  "clause_sequence",
  "clause_heading",
  "clause_text_basis",
  "clause_text_sha256",
  "clause_location",
  "clause_char_start",
  "clause_char_end",
  "observed_clause_text",
  "observed_clause_text_truncated",
  "generated_clause_type",
  "position_schema",
  "position_applicable",
  "position_reason",
  "detector_version",
  "detector_scope",
  "matched_signal_count",
  "supported_rule_count",
  "eligibility_theme",
  "eligibility_theme_basis",
  "eligibility_taxonomy_version",
  "eligibility_generated_by",
  "eligibility_support_method",
  "eligibility_theme_support_sha256",
  "analysis_window_text_basis",
  "analysis_window_sha256",
  "analysis_window_clause_char_start",
  "analysis_window_clause_char_end",
  "analysis_window_clause_character_count",
  "analysis_window_truncated_before",
  "analysis_window_truncated_after",
  "analysis_window_centered_on_theme_support",
  "detector_match",
  "signal_key",
  "signal_label",
  "signal_basis",
  "signal_confidence",
  "signal_rule_id",
  "facially_bilateral_language_present",
  "on_demand_language_present",
  "losses_language_present",
  "liability_cap_reference_present",
  "insurance_language_present",
  "negligence_or_misconduct_language_present",
  "observed_support",
  "support_text_truncated",
  "support_text_basis",
  "support_sha256",
  "support_clause_char_start",
  "support_clause_char_end",
  "support_document_char_start",
  "support_document_char_end",
  "matched_text",
  "matched_text_truncated",
  "matched_text_sha256",
  "matched_clause_char_start",
  "matched_clause_char_end",
  "support_is_bounded_excerpt",
  "support_maximum_characters",
  "analysis_window_maximum_characters",
  "anchor_clause_id",
  "anchor_clause_sha256",
  "absence_is_not_evidence_of_absence",
  "signals_are_legal_conclusions",
  "party_entitlement_is_determined",
  "claim_coverage_is_determined",
  "enforceability_is_determined",
  "exceptions_outside_support_may_apply",
  "position_limitations",
  "export_limitations",
]);

export function buildIndemnityPositionMatrixCsv({
  query = "",
  kind = "",
  source = "",
  entries = [],
  generatedAt = new Date().toISOString(),
} = {}) {
  const manifest = buildCitationManifest({
    query,
    kind,
    source,
    entries,
    generatedAt,
  });
  const scope = manifest.retrieval_scope;
  const exportLimitations = [
    ...manifest.limitations,
    "Each row represents one generated indemnity signal; clauses with no supported signal produce one non-match row.",
    "The detector does not determine the indemnifying party, covered loss, claim validity, cap interaction, remedy exclusivity or enforceability.",
  ];
  const rows = manifest.citations.flatMap((citation) => {
    const agreement = record(citation.agreement);
    const clause = record(citation.matched_clause);
    const clauseLocation = record(clause.location);
    const interpretation = record(clause.generated_interpretation);
    const sourceRecord = record(citation.source);
    const retrieval = record(citation.retrieval);
    const position = record(citation.indemnity_position);
    const coverage = record(position.coverage);
    const eligibility = record(position.eligibility);
    const analysisWindow = record(position.analysis_window);
    const limits = record(position.limits);
    const positionApplicable = typeof position.applicable === "boolean"
      ? position.applicable
      : null;
    const signals = array(position.signals).slice(
      0,
      INDEMNITY_POSITION_SIGNAL_MAX,
    );
    const signalRows = signals.length ? signals : [null];

    return signalRows.map((signalValue, signalIndex) => {
      const signal = record(signalValue);
      const attributes = record(signal.generated_attributes);
      const support = record(signal.observed_support);
      const hasSignal = typeof signal.signal_key === "string";
      return {
        matrix_schema: INDEMNITY_POSITION_MATRIX_SCHEMA,
        generated_at: manifest.generated_at,
        retrieval_query: scope.query,
        document_kind_filter: scope.document_kind,
        source_filter: scope.source,
        selected_count: scope.selected_count,
        citation_number: citation.citation_number,
        signal_row_number: hasSignal ? signalIndex + 1 : null,
        retrieval_rank: retrieval.rank,
        observed_published_at: retrieval.observed_published_at,
        source_slug: sourceRecord.slug,
        source_name: sourceRecord.name,
        source_publisher: sourceRecord.publisher,
        source_external_id: sourceRecord.external_id,
        source_url: sourceRecord.canonical_url,
        source_terms_url: sourceRecord.terms_url,
        source_policy_assessment_status: sourceRecord.policy_assessment_status,
        source_human_review_required: matrixBoolean(
          sourceRecord.human_review_required,
        ),
        agreement_id: agreement.id,
        agreement_title: agreement.title,
        agreement_document_kind: agreement.document_kind,
        agreement_document_kind_basis: agreement.document_kind_basis,
        artifact_sha256: agreement.artifact_sha256,
        extraction_method: agreement.extraction_method,
        extraction_version: agreement.extraction_version,
        agreement_text_basis: agreement.text_basis,
        clause_id: clause.id,
        clause_sequence: clause.sequence,
        clause_heading: clause.heading,
        clause_text_basis: clause.text_basis,
        clause_text_sha256: clause.observed_text_sha256,
        clause_location: clauseLocation.display,
        clause_char_start: clauseLocation.char_start,
        clause_char_end: clauseLocation.char_end,
        observed_clause_text: clause.observed_text,
        observed_clause_text_truncated: matrixBoolean(
          clause.observed_text_truncated,
        ),
        generated_clause_type: interpretation.clause_type,
        position_schema: position.schema,
        position_applicable: matrixBoolean(positionApplicable),
        position_reason: position.reason,
        detector_version: position.detector_version,
        detector_scope: position.scope,
        matched_signal_count: coverage.matched_signal_count,
        supported_rule_count: coverage.supported_rule_count,
        eligibility_theme: eligibility.theme,
        eligibility_theme_basis: eligibility.theme_basis,
        eligibility_taxonomy_version: eligibility.taxonomy_version,
        eligibility_generated_by: eligibility.generated_by,
        eligibility_support_method: eligibility.support_method,
        eligibility_theme_support_sha256: eligibility.theme_support_sha256,
        analysis_window_text_basis: analysisWindow.text_basis,
        analysis_window_sha256: analysisWindow.sha256,
        analysis_window_clause_char_start: analysisWindow.clause_char_start,
        analysis_window_clause_char_end: analysisWindow.clause_char_end,
        analysis_window_clause_character_count:
          analysisWindow.clause_character_count,
        analysis_window_truncated_before: matrixBoolean(
          analysisWindow.truncated_before,
        ),
        analysis_window_truncated_after: matrixBoolean(
          analysisWindow.truncated_after,
        ),
        analysis_window_centered_on_theme_support: matrixBoolean(
          analysisWindow.centered_on_theme_support,
        ),
        detector_match: hasSignal
          ? "TRUE"
          : positionApplicable === true
          ? "FALSE"
          : "",
        signal_key: signal.signal_key,
        signal_label: signal.label,
        signal_basis: signal.signal_basis,
        signal_confidence: signal.confidence,
        signal_rule_id: signal.rule_id,
        facially_bilateral_language_present: matrixBoolean(
          attributes.facially_bilateral_language_present,
        ),
        on_demand_language_present: matrixBoolean(
          attributes.on_demand_language_present,
        ),
        losses_language_present: matrixBoolean(
          attributes.losses_language_present,
        ),
        liability_cap_reference_present: matrixBoolean(
          attributes.liability_cap_reference_present,
        ),
        insurance_language_present: matrixBoolean(
          attributes.insurance_language_present,
        ),
        negligence_or_misconduct_language_present: matrixBoolean(
          attributes.negligence_or_misconduct_language_present,
        ),
        observed_support: support.text,
        support_text_truncated: matrixBoolean(support.text_truncated),
        support_text_basis: support.text_basis,
        support_sha256: support.sha256,
        support_clause_char_start: support.clause_char_start,
        support_clause_char_end: support.clause_char_end,
        support_document_char_start: support.document_char_start,
        support_document_char_end: support.document_char_end,
        matched_text: support.matched_text,
        matched_text_truncated: matrixBoolean(support.matched_text_truncated),
        matched_text_sha256: support.matched_text_sha256,
        matched_clause_char_start: support.matched_clause_char_start,
        matched_clause_char_end: support.matched_clause_char_end,
        support_is_bounded_excerpt: matrixBoolean(
          limits.support_is_bounded_excerpt,
        ),
        support_maximum_characters: limits.support_maximum_characters,
        analysis_window_maximum_characters:
          limits.analysis_window_maximum_characters,
        anchor_clause_id: signal.anchor_clause_id,
        anchor_clause_sha256: signal.anchor_clause_sha256,
        absence_is_not_evidence_of_absence: matrixBoolean(
          limits.absence_is_not_evidence_of_absence,
        ),
        signals_are_legal_conclusions: matrixBoolean(
          limits.signals_are_legal_conclusions,
        ),
        party_entitlement_is_determined: matrixBoolean(
          limits.party_entitlement_is_determined,
        ),
        claim_coverage_is_determined: matrixBoolean(
          limits.claim_coverage_is_determined,
        ),
        enforceability_is_determined: matrixBoolean(
          limits.enforceability_is_determined,
        ),
        exceptions_outside_support_may_apply: matrixBoolean(
          limits.exceptions_outside_support_may_apply,
        ),
        position_limitations: array(position.limitations).join(" | "),
        export_limitations: exportLimitations.join(" | "),
      };
    });
  });

  return `\uFEFF${
    [
      INDEMNITY_POSITION_MATRIX_COLUMNS.map(csvCell).join(","),
      ...rows.map((row) =>
        INDEMNITY_POSITION_MATRIX_COLUMNS.map((column) => csvCell(row[column]))
          .join(",")
      ),
    ].join("\r\n")
  }\r\n`;
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

export async function requestJson(
  path,
  token,
  fetchImpl = globalThis.fetch,
  waitImpl = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds)),
) {
  const normalizedToken = normalizeToken(token);
  if (!normalizedToken) throw new ApiError("A valid access token is required.");
  if (typeof fetchImpl !== "function") {
    throw new ApiError("Fetch is unavailable.");
  }
  if (typeof waitImpl !== "function") {
    throw new ApiError("Retry timer is unavailable.");
  }

  const target = apiUrl(path);
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetchImpl(target, {
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
        const apiError = new ApiError(
          message,
          response.status,
          typeof error.code === "string" ? error.code : "request_failed",
          typeof record(payload).request_id === "string"
            ? record(payload).request_id
            : null,
        );
        if (attempt === 0 && RETRYABLE_RESPONSE_STATUSES.has(response.status)) {
          await waitImpl(RETRY_DELAY_MS);
          continue;
        }
        throw apiError;
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
  throw new ApiError("The protected API could not be reached.");
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

function familyReviewStatusLabel(status, conflicting = false) {
  if (conflicting || status === "mixed") {
    return "Family-review responses: mixed";
  }
  const labels = {
    unreviewed: "Family review: not reviewed",
    same_family: "Family-review response: same family",
    not_same_family: "Family-review response: not same family",
    uncertain: "Family-review response: uncertain",
    not_assessable: "Family-review response: not assessable",
  };
  return labels[status] || "Family review: unavailable";
}

function documentKindBasisLabel(value) {
  if (value === "observed") return "Observed document classification";
  if (value === "reviewed") return "Human-reviewed document classification";
  if (value === "generated") {
    return "Generated document classification · not source wording";
  }
  return `Document classification basis: ${displayText(value, "unavailable")}`;
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

const POSITION_ATTRIBUTE_LABELS = Object.freeze({
  currency_amount_present: "Observed currency candidate appears",
  percentage_present: "Observed percentage candidate appears",
  fees_or_charges_basis_present: "Observed cap-basis candidate appears",
  greater_or_lesser_formula_present: "Observed comparison candidate appears",
  facially_bilateral_language_present: "Facially bilateral wording appears",
  indirect: "Indirect loss named",
  consequential: "Consequential loss named",
  special: "Special loss named",
  incidental: "Incidental loss named",
  exemplary: "Exemplary loss named",
  punitive: "Punitive loss named",
  death_or_personal_injury: "Death/personal injury named",
  fraud: "Fraud named",
  wilful_or_willful_misconduct: "Wilful/willful misconduct named",
});

const TERMINATION_ATTRIBUTE_LABELS = Object.freeze({
  duration_candidate_present: "Observed duration candidate appears",
  notice_language_present: "Notice wording appears",
  facially_bilateral_language_present: "Facially bilateral wording appears",
});

const ASSIGNMENT_ATTRIBUTE_LABELS = Object.freeze({
  consent_language_present: "Consent / approval wording appears",
  notice_language_present: "Notice wording appears",
  termination_language_present: "Termination wording appears",
  facially_bilateral_language_present: "Facially bilateral wording appears",
  finance_context_present: "Finance-transfer context appears",
  change_of_control_language_present: "Change-of-control wording appears",
});

const INDEMNITY_ATTRIBUTE_LABELS = Object.freeze({
  facially_bilateral_language_present: "Facially bilateral wording appears",
  on_demand_language_present: "On-demand wording appears",
  losses_language_present: "Loss, damage, liability or cost wording appears",
  liability_cap_reference_present: "Liability-cap reference appears",
  insurance_language_present: "Insurance wording appears",
  negligence_or_misconduct_language_present:
    "Negligence, misconduct, fraud or omission wording appears",
});

function positionAttributeEntries(value) {
  const attributes = record(value);
  return Object.entries(POSITION_ATTRIBUTE_LABELS)
    .filter(([key]) => typeof attributes[key] === "boolean")
    .map(([key, label]) => [label, attributes[key] ? "Yes" : "No"]);
}

function terminationAttributeEntries(value) {
  const attributes = record(value);
  return Object.entries(TERMINATION_ATTRIBUTE_LABELS)
    .filter(([key]) => typeof attributes[key] === "boolean")
    .map(([key, label]) => [label, attributes[key] ? "Yes" : "No"]);
}

function assignmentAttributeEntries(value) {
  const attributes = record(value);
  return Object.entries(ASSIGNMENT_ATTRIBUTE_LABELS)
    .filter(([key]) => typeof attributes[key] === "boolean")
    .map(([key, label]) => [label, attributes[key] ? "Yes" : "No"]);
}

function indemnityAttributeEntries(value) {
  const attributes = record(value);
  return Object.entries(INDEMNITY_ATTRIBUTE_LABELS)
    .filter(([key]) => typeof attributes[key] === "boolean")
    .map(([key, label]) => [label, attributes[key] ? "Yes" : "No"]);
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
  if (dialog.open || dialog.hasAttribute("open")) return;
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
    resultMode: "search",
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
    partyPageResults: [],
    partyBriefCoverage: new Map(),
    partyBriefShortlistExport: null,
    partyBriefScanGeneration: 0,
    partyBriefScanLoading: false,
    partyDossierLoading: false,
    positionSignal: "",
    positionFeature: "",
    positionValue: "",
    positionKind: "",
    positionSource: "",
    positionLoading: false,
    terminationSignal: "",
    terminationDuration: "",
    terminationLinkage: "",
    terminationKind: "",
    terminationSource: "",
    terminationLoading: false,
    assignmentSignal: "",
    assignmentContext: "",
    assignmentKind: "",
    assignmentSource: "",
    assignmentLoading: false,
    governingLawSignal: "",
    governingLawKind: "",
    governingLawSource: "",
    governingLawLoading: false,
    indemnitySignal: "",
    indemnityKind: "",
    indemnitySource: "",
    indemnityLoading: false,
    familyProposalOffset: 0,
    familyProposalLimit: FAMILY_PROPOSAL_PAGE_MAX,
    familyProposalHasMore: false,
    familyProposalLoading: false,
    amendmentChangeCue: "",
    amendmentChangeSource: "",
    amendmentChangeOffset: 0,
    amendmentChangeLimit: 12,
    amendmentChangeHasMore: false,
    amendmentChangeLoading: false,
    decisionBriefDirectoryMinimumTopics: 3,
    decisionBriefDirectoryKind: "",
    decisionBriefDirectorySource: "",
    decisionBriefDirectoryOffset: 0,
    decisionBriefDirectoryLimit: 12,
    decisionBriefDirectoryHasMore: false,
    decisionBriefDirectoryLoading: false,
    decisionBriefComparisonSelection: new Map(),
    decisionBriefComparison: null,
    decisionBriefComparisonExport: null,
    decisionBriefComparing: false,
    decisionBrief: null,
    decisionBriefAgreementId: null,
    decisionBriefLoading: false,
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
  const positionForm = byId("position-form");
  const positionSignalInput = byId("position-signal");
  const positionFeatureInput = byId("position-feature");
  const positionValueInput = byId("position-value");
  const positionKindInput = byId("position-kind");
  const positionSourceInput = byId("position-source");
  const positionButton = byId("position-submit");
  const positionFacets = byId("position-facets");
  const positionStatus = byId("position-status");
  const terminationForm = byId("termination-form");
  const terminationSignalInput = byId("termination-signal");
  const terminationDurationInput = byId("termination-duration");
  const terminationLinkageInput = byId("termination-linkage");
  const terminationKindInput = byId("termination-kind");
  const terminationSourceInput = byId("termination-source");
  const terminationButton = byId("termination-submit");
  const terminationFacets = byId("termination-facets");
  const terminationStatus = byId("termination-status");
  const assignmentForm = byId("assignment-form");
  const assignmentSignalInput = byId("assignment-signal");
  const assignmentContextInput = byId("assignment-context");
  const assignmentKindInput = byId("assignment-kind");
  const assignmentSourceInput = byId("assignment-source");
  const assignmentButton = byId("assignment-submit");
  const assignmentFacets = byId("assignment-facets");
  const assignmentStatus = byId("assignment-status");
  const governingLawForm = byId("governing-law-form");
  const governingLawSignalInput = byId("governing-law-signal");
  const governingLawKindInput = byId("governing-law-kind");
  const governingLawSourceInput = byId("governing-law-source");
  const governingLawButton = byId("governing-law-submit");
  const governingLawFacets = byId("governing-law-facets");
  const governingLawStatus = byId("governing-law-status");
  const indemnityForm = byId("indemnity-form");
  const indemnitySignalInput = byId("indemnity-signal");
  const indemnityKindInput = byId("indemnity-kind");
  const indemnitySourceInput = byId("indemnity-source");
  const indemnityButton = byId("indemnity-submit");
  const indemnityFacets = byId("indemnity-facets");
  const indemnityStatus = byId("indemnity-status");
  const familyProposalLoadButton = byId("family-proposals-load");
  const familyProposalStatus = byId("family-proposals-status");
  const familyProposalResults = byId("family-proposals-results");
  const familyProposalPrevious = byId("family-proposals-previous");
  const familyProposalNext = byId("family-proposals-next");
  const amendmentChangeForm = byId("amendment-change-directory-form");
  const amendmentChangeCueInput = byId("amendment-change-cue");
  const amendmentChangeSourceInput = byId("amendment-change-source");
  const amendmentChangeButton = byId("amendment-change-directory-submit");
  const amendmentChangeStatus = byId("amendment-change-directory-status");
  const amendmentChangeResults = byId("amendment-change-directory-results");
  const amendmentChangePrevious = byId("amendment-change-directory-previous");
  const amendmentChangeNext = byId("amendment-change-directory-next");
  const decisionBriefDirectoryForm = byId("decision-brief-directory-form");
  const decisionBriefMinimumTopicsInput = byId(
    "decision-brief-minimum-topics",
  );
  const decisionBriefKindInput = byId("decision-brief-kind");
  const decisionBriefSourceInput = byId("decision-brief-source");
  const decisionBriefDirectoryButton = byId(
    "decision-brief-directory-submit",
  );
  const decisionBriefDirectoryStatus = byId(
    "decision-brief-directory-status",
  );
  const decisionBriefDirectoryResults = byId(
    "decision-brief-directory-results",
  );
  const decisionBriefDirectoryPrevious = byId(
    "decision-brief-directory-previous",
  );
  const decisionBriefDirectoryNext = byId("decision-brief-directory-next");
  const decisionBriefComparisonStatus = byId(
    "decision-brief-comparison-status",
  );
  const clearDecisionBriefComparisonButton = byId(
    "clear-decision-brief-comparison",
  );
  const openDecisionBriefComparisonButton = byId(
    "open-decision-brief-comparison",
  );
  const partySearchForm = byId("party-search-form");
  const partyQueryInput = byId("party-query");
  const partyKindInput = byId("party-kind");
  const partySourceInput = byId("party-source");
  const partySearchButton = byId("party-search-submit");
  const partySearchStatus = byId("party-search-status");
  const partyBriefRankButton = byId("party-rank-decision-briefs");
  const partyBriefRankStatus = byId("party-decision-brief-rank-status");
  const partyBriefShortlist = byId("party-decision-brief-shortlist");
  const partyBriefShortlistTitle = byId(
    "party-decision-brief-shortlist-title",
  );
  const partyBriefShortlistResults = byId(
    "party-decision-brief-shortlist-results",
  );
  const downloadPartyBriefShortlistButton = byId(
    "download-party-decision-brief-shortlist",
  );
  const partyBriefShortlistExportStatus = byId(
    "party-decision-brief-shortlist-export-status",
  );
  const partyDecisionBriefComparisonStatus = byId(
    "party-decision-brief-comparison-status",
  );
  const partyClearDecisionBriefComparisonButton = byId(
    "party-clear-decision-brief-comparison",
  );
  const partyOpenDecisionBriefComparisonButton = byId(
    "party-open-decision-brief-comparison",
  );
  const partyResults = byId("party-results");
  const partyPrevious = byId("party-previous");
  const partyNext = byId("party-next");
  const partyDossierSection = byId("party-dossier-section");
  const partyDossierTitle = byId("party-dossier-title");
  const partyDossierStatus = byId("party-dossier-status");
  const partyDossierSummary = byId("party-dossier-summary");
  const partyDossierThemes = byId("party-dossier-themes");
  const searchForm = byId("search-form");
  const queryInput = byId("query");
  const clausePartyInput = byId("clause-party");
  const kindInput = byId("kind");
  const sourceInput = byId("source");
  const searchButton = byId("search-submit");
  const searchStatus = byId("search-status");
  const resultsSection = byId("results-section");
  const results = byId("results");
  const previous = byId("previous");
  const next = byId("next");
  const comparisonStatus = byId("comparison-status");
  const clearComparisonButton = byId("clear-comparison");
  const openComparisonButton = byId("open-comparison");
  const exportPositionMatrixButton = byId("export-position-matrix");
  const exportTerminationMatrixButton = byId("export-termination-matrix");
  const exportAssignmentMatrixButton = byId("export-assignment-matrix");
  const exportGoverningLawMatrixButton = byId("export-governing-law-matrix");
  const exportIndemnityMatrixButton = byId("export-indemnity-matrix");
  const exportComparisonButton = byId("export-comparison");
  const exportStatus = byId("comparison-export-status");
  const detailDialog = byId("detail-dialog");
  const detailBody = byId("detail-body");
  const decisionBriefDialog = byId("decision-brief-dialog");
  const decisionBriefBody = byId("decision-brief-body");
  const decisionBriefStatus = byId("decision-brief-status");
  const downloadDecisionBriefButton = byId("download-decision-brief");
  const decisionBriefComparisonDialog = byId(
    "decision-brief-comparison-dialog",
  );
  const decisionBriefComparisonBody = byId("decision-brief-comparison-body");
  const decisionBriefComparisonDialogStatus = byId(
    "decision-brief-comparison-dialog-status",
  );
  const downloadDecisionBriefComparisonButton = byId(
    "download-decision-brief-comparison",
  );
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
    state.partyPageResults = [];
    state.partyBriefCoverage.clear();
    state.partyBriefShortlistExport = null;
    state.partyBriefScanGeneration += 1;
    state.partyBriefScanLoading = false;
    state.partyDossierLoading = false;
    state.positionSignal = "";
    state.positionFeature = "";
    state.positionValue = "";
    state.positionKind = "";
    state.positionSource = "";
    state.positionLoading = false;
    state.terminationSignal = "";
    state.terminationDuration = "";
    state.terminationLinkage = "";
    state.terminationKind = "";
    state.terminationSource = "";
    state.terminationLoading = false;
    state.assignmentSignal = "";
    state.assignmentContext = "";
    state.assignmentKind = "";
    state.assignmentSource = "";
    state.assignmentLoading = false;
    state.governingLawSignal = "";
    state.governingLawKind = "";
    state.governingLawSource = "";
    state.governingLawLoading = false;
    state.indemnitySignal = "";
    state.indemnityKind = "";
    state.indemnitySource = "";
    state.indemnityLoading = false;
    state.familyProposalOffset = 0;
    state.familyProposalHasMore = false;
    state.familyProposalLoading = false;
    state.amendmentChangeCue = "";
    state.amendmentChangeSource = "";
    state.amendmentChangeOffset = 0;
    state.amendmentChangeHasMore = false;
    state.amendmentChangeLoading = false;
    state.decisionBriefDirectoryMinimumTopics = 3;
    state.decisionBriefDirectoryKind = "";
    state.decisionBriefDirectorySource = "";
    state.decisionBriefDirectoryOffset = 0;
    state.decisionBriefDirectoryHasMore = false;
    state.decisionBriefDirectoryLoading = false;
    state.decisionBriefComparisonSelection.clear();
    state.decisionBriefComparison = null;
    state.decisionBriefComparisonExport = null;
    state.decisionBriefComparing = false;
    state.decisionBrief = null;
    state.decisionBriefAgreementId = null;
    state.decisionBriefLoading = false;
    state.resultMode = "search";
    state.clauseParty = "";
    decisionBriefDirectoryForm.reset();
    decisionBriefDirectoryPrevious.disabled = true;
    decisionBriefDirectoryNext.disabled = true;
    decisionBriefDirectoryStatus.textContent =
      "Find published contracts and amendments with evidence across three or more tracked topics.";
    decisionBriefDirectoryResults.replaceChildren();
    decisionBriefComparisonBody.replaceChildren();
    decisionBriefComparisonDialogStatus.textContent = "";
    downloadDecisionBriefComparisonButton.disabled = true;
    positionForm.reset();
    positionFacets.replaceChildren(element("span", "", "Available evidence:"));
    positionStatus.textContent =
      "Browse supported signals across published, nonduplicate evidence.";
    terminationForm.reset();
    terminationFacets.replaceChildren(
      element("span", "", "Available evidence:"),
    );
    terminationStatus.textContent =
      "Browse positive wording matches across published, nonduplicate contracts and amendments.";
    assignmentForm.reset();
    assignmentFacets.replaceChildren(
      element("span", "", "Available evidence:"),
    );
    assignmentStatus.textContent =
      "Browse positive wording matches across published, nonduplicate contracts and amendments.";
    governingLawForm.reset();
    governingLawFacets.replaceChildren(
      element("span", "", "Available evidence:"),
    );
    governingLawStatus.textContent =
      "Browse positive wording matches across published, nonduplicate contracts and amendments.";
    indemnityForm.reset();
    indemnityFacets.replaceChildren(element("span", "", "Available evidence:"));
    indemnityStatus.textContent =
      "Browse positive wording matches across published, nonduplicate contracts and amendments.";
    familyProposalLoadButton.disabled = false;
    familyProposalPrevious.disabled = true;
    familyProposalNext.disabled = true;
    familyProposalStatus.textContent =
      "Load the current publication-gated proposal set. Candidate generation is bounded and is not exhaustive.";
    familyProposalResults.replaceChildren();
    amendmentChangeForm.reset();
    amendmentChangeButton.disabled = false;
    amendmentChangePrevious.disabled = true;
    amendmentChangeNext.disabled = true;
    amendmentChangeStatus.textContent =
      "Browse positive amendment wording with one exact representative cue per agreement.";
    amendmentChangeResults.replaceChildren();
    partyPrevious.disabled = true;
    partyNext.disabled = true;
    partyBriefRankButton.disabled = true;
    partySearchStatus.textContent =
      "Enter an observed buyer, supplier, filing entity, or stated party name.";
    partyBriefRankStatus.className = "muted";
    partyBriefRankStatus.textContent =
      "Run a party search, then build a bounded evidence-bearing shortlist from up to 50 matching records.";
    partyBriefShortlist.hidden = true;
    partyBriefShortlistResults.replaceChildren();
    downloadPartyBriefShortlistButton.disabled = true;
    partyBriefShortlistExportStatus.textContent = "";
    syncGuideSelection("");
    results.replaceChildren(
      element("p", "empty", "Sign in to search published evidence."),
    );
    partyResults.replaceChildren();
    partyDossierSection.hidden = true;
    partyDossierSummary.replaceChildren();
    partyDossierThemes.replaceChildren();
    detailBody.replaceChildren();
    decisionBriefBody.replaceChildren();
    decisionBriefStatus.textContent = "";
    downloadDecisionBriefButton.disabled = true;
    comparisonBody.replaceChildren();
    exportStatus.textContent = "";
    closeDialog(detailDialog);
    closeDialog(decisionBriefDialog);
    closeDialog(decisionBriefComparisonDialog);
    closeDialog(comparisonDialog);
    updateComparisonControls();
    updateDecisionBriefComparisonControls();
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
    const positionSummary = record(root.position_summary);
    const positionCurrent = record(positionSummary.current);
    const positionLibrary = record(positionSummary.published_position_library);
    const positionSignalFacets = array(positionSummary.published_signal_facets);
    const positionFeatureFacets = array(
      positionSummary.published_feature_facets,
    );
    const positionValueFacets = array(
      positionSummary.published_value_candidate_facets,
    );
    const terminationSummary = record(root.termination_summary);
    const terminationCurrent = record(terminationSummary.current);
    const terminationLibrary = record(
      terminationSummary.published_position_library,
    );
    const terminationSignalFacets = array(
      terminationSummary.published_signal_facets,
    );
    const terminationDurationFacet = record(
      terminationSummary.published_duration_candidate_facet,
    );
    const terminationLocalLinkageFacet = record(
      terminationSummary.published_local_termination_linkage_facet,
    );
    const assignmentSummary = record(root.assignment_summary);
    const assignmentSurface = record(assignmentSummary.eligible_theme_surface);
    const assignmentLibrary = record(
      assignmentSummary.published_position_library,
    );
    const assignmentSignalFacets = array(
      assignmentSummary.published_signal_facets,
    );
    const assignmentContextFacets = array(
      assignmentSummary.published_context_facets,
    );
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

    operations.replaceChildren(
      dataList([
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
            count(
              partySummary.searchable_agreements,
            )
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
          "Liability position cache",
          `${count(positionCurrent.cached_clauses)} / ${
            count(
              positionCurrent.eligible_clauses,
            )
          } current clauses`,
        ],
        [
          "Cached liability signals",
          `${count(positionCurrent.signal_matches)} matches across ${
            count(
              positionCurrent.clauses_with_matches,
            )
          } clauses`,
        ],
        [
          "Published position library",
          `${count(positionLibrary.matched_clauses)} clauses across ${
            count(
              positionLibrary.distinct_agreements,
            )
          } agreements`,
        ],
        [
          "Liability cache repair backlog",
          Number(positionCurrent.missing_clauses) === 0
            ? "Complete"
            : `${count(positionCurrent.missing_clauses)} missing`,
        ],
        [
          "Termination position cache",
          `${count(terminationCurrent.cached_clauses)} / ${
            count(
              terminationCurrent.eligible_clauses,
            )
          } current clauses`,
        ],
        [
          "Published termination library",
          `${count(terminationLibrary.matched_clauses)} clauses across ${
            count(
              terminationLibrary.distinct_agreements,
            )
          } agreements`,
        ],
        [
          "Same-support termination evidence",
          `${count(terminationLocalLinkageFacet.clauses)} clauses across ${
            count(
              terminationLocalLinkageFacet.distinct_agreements,
            )
          } agreements`,
        ],
        [
          "Termination cache repair backlog",
          Number(terminationCurrent.missing_clauses) === 0
            ? "Complete"
            : `${count(terminationCurrent.missing_clauses)} missing`,
        ],
        [
          "Published assignment library",
          `${count(assignmentLibrary.matched_clauses)} clauses across ${
            count(
              assignmentLibrary.distinct_agreements,
            )
          } agreements`,
        ],
        [
          "Assignment support coverage",
          `${count(assignmentSurface.clauses_with_exact_detector_support)} / ${
            count(
              assignmentSurface.clauses,
            )
          } theme clauses`,
        ],
        [
          "Average extraction confidence",
          displayText(quality.average_current_extraction_confidence),
        ],
        [
          "Write-guarded clause offsets",
          `${
            count(evidenceQuality.write_guarded_clauses_with_exact_offsets)
          } / ${
            count(
              evidenceQuality.current_clauses,
            )
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
        ["Last fast checkpoint", date(evidenceQuality.checkpointed_at)],
        [
          "Last full SHA audit",
          date(evidenceQuality.full_audited_at || evidenceQuality.audited_at),
        ],
        [
          "Full-audit clause coverage",
          `${count(evidenceQuality.baseline_full_clause_hash_matches)} / ${
            count(
              evidenceQuality.baseline_full_current_clauses,
            )
          }`,
        ],
        [
          "Clause references",
          `${count(evidenceQuality.resolved_clause_relationships)} resolved · ${
            count(
              evidenceQuality.unresolved_clause_references,
            )
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
              count(
                source.current_clauses,
              )
            } clauses`,
          ];
        }),
      ]),
    );

    summaryFreshness.textContent = `Snapshot generated ${
      date(
        summary.generated_at,
      )
    }.`;
    positionFacets.replaceChildren(element("span", "", "Available evidence:"));
    for (const facetValue of positionSignalFacets) {
      const facet = record(facetValue);
      const signalKey = displayText(facet.signal_key);
      if (!LIABILITY_POSITION_SIGNAL_KEYS.includes(signalKey)) continue;
      const button = element(
        "button",
        "",
        `${LIABILITY_POSITION_SIGNAL_LABELS[signalKey]} · ${
          count(
            facet.clauses,
          )
        } clauses / ${count(facet.distinct_agreements)} agreements`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        positionSignalInput.value = signalKey;
        positionFeatureInput.value = "";
        positionValueInput.value = "";
        positionForm.requestSubmit();
      });
      positionFacets.append(button);
    }
    for (const facetValue of positionFeatureFacets) {
      const facet = record(facetValue);
      const featureKey = displayText(facet.feature_key);
      const configured = LIABILITY_POSITION_FEATURES[featureKey];
      if (!configured || facet.feature_basis !== "generated") continue;
      const button = element(
        "button",
        "",
        `${configured.label} · ${count(facet.clauses)} clauses / ${
          count(
            facet.distinct_agreements,
          )
        } agreements`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        positionSignalInput.value = configured.signalKey;
        positionFeatureInput.value = featureKey;
        if (configured.signalKey !== "explicit_liability_limit_formula") {
          positionValueInput.value = "";
        }
        positionForm.requestSubmit();
      });
      positionFacets.append(button);
    }
    for (const facetValue of positionValueFacets) {
      const facet = record(facetValue);
      const valueCategory = displayText(facet.value_category);
      const configured = LIABILITY_VALUE_CANDIDATE_CATEGORIES.find(
        ([key]) => key === valueCategory,
      );
      if (!configured) continue;
      const button = element(
        "button",
        "",
        `${configured[1]} · ${count(facet.clauses)} clauses`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        positionSignalInput.value = "explicit_liability_limit_formula";
        positionValueInput.value = valueCategory;
        positionForm.requestSubmit();
      });
      positionFacets.append(button);
    }
    if (Number(positionLibrary.matched_clauses) > 0) {
      const sourceCoverage = array(positionLibrary.by_source)
        .slice(0, 10)
        .map((sourceValue) => {
          const source = record(sourceValue);
          return `${displayText(source.source_slug)} ${count(source.clauses)}`;
        })
        .join(" · ");
      positionStatus.textContent = `${
        count(
          positionLibrary.matched_clauses,
        )
      } detected clauses across ${
        count(
          positionLibrary.distinct_agreements,
        )
      } agreements${
        sourceCoverage ? ` · ${sourceCoverage}` : ""
      }; generated coverage, not market prevalence.`;
    }
    terminationFacets.replaceChildren(
      element("span", "", "Available evidence:"),
    );
    for (const facetValue of terminationSignalFacets) {
      const facet = record(facetValue);
      const signalKey = displayText(facet.signal_key);
      const label = TERMINATION_POSITION_SIGNALS[signalKey];
      if (!label || facet.signal_basis !== "generated") continue;
      const button = element(
        "button",
        "",
        `${label} · ${count(facet.clauses)} clauses / ${
          count(
            facet.distinct_agreements,
          )
        } agreements`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        terminationSignalInput.value = signalKey;
        terminationForm.requestSubmit();
      });
      terminationFacets.append(button);
    }
    if (Number(terminationDurationFacet.clauses) > 0) {
      const button = element(
        "button",
        "",
        `Exact duration candidates · ${
          count(
            terminationDurationFacet.clauses,
          )
        } clauses`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        terminationDurationInput.value = "present";
        terminationForm.requestSubmit();
      });
      terminationFacets.append(button);
    }
    if (Number(terminationLocalLinkageFacet.clauses) > 0) {
      const button = element(
        "button",
        "",
        `Explicit termination term in same support · ${
          count(
            terminationLocalLinkageFacet.clauses,
          )
        } clauses`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        terminationLinkageInput.value = "local";
        terminationForm.requestSubmit();
      });
      terminationFacets.append(button);
    }
    if (Number(terminationLibrary.matched_clauses) > 0) {
      const sourceCoverage = array(terminationLibrary.by_source)
        .slice(0, 10)
        .map((sourceValue) => {
          const source = record(sourceValue);
          return `${displayText(source.source_slug)} ${count(source.clauses)}`;
        })
        .join(" · ");
      terminationStatus.textContent = `${
        count(
          terminationLibrary.matched_clauses,
        )
      } detected clauses across ${
        count(
          terminationLibrary.distinct_agreements,
        )
      } useful agreements${
        sourceCoverage ? ` · ${sourceCoverage}` : ""
      }; generated wording coverage, not legal conclusions.`;
    }
    assignmentFacets.replaceChildren(
      element("span", "", "Available evidence:"),
    );
    for (const facetValue of assignmentSignalFacets) {
      const facet = record(facetValue);
      const signalKey = displayText(facet.signal_key);
      const label = ASSIGNMENT_POSITION_SIGNALS[signalKey];
      if (!label || facet.signal_basis !== "generated") continue;
      const button = element(
        "button",
        "",
        `${label} · ${count(facet.clauses)} clauses / ${
          count(
            facet.distinct_agreements,
          )
        } agreements`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        assignmentSignalInput.value = signalKey;
        assignmentForm.requestSubmit();
      });
      assignmentFacets.append(button);
    }
    for (const facetValue of assignmentContextFacets) {
      const facet = record(facetValue);
      const contextKey = displayText(facet.context_key);
      if (!["general", "finance"].includes(contextKey)) continue;
      const button = element(
        "button",
        "",
        `${displayText(facet.label)} · ${count(facet.clauses)} clauses / ${
          count(
            facet.distinct_agreements,
          )
        } agreements`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        assignmentContextInput.value = contextKey;
        assignmentForm.requestSubmit();
      });
      assignmentFacets.append(button);
    }
    if (Number(assignmentLibrary.matched_clauses) > 0) {
      const sourceCoverage = array(assignmentLibrary.by_source)
        .slice(0, 10)
        .map((sourceValue) => {
          const source = record(sourceValue);
          return `${displayText(source.source_slug)} ${count(source.clauses)}`;
        })
        .join(" · ");
      assignmentStatus.textContent = `${
        count(
          assignmentLibrary.matched_clauses,
        )
      } detected clauses across ${
        count(
          assignmentLibrary.distinct_agreements,
        )
      } useful agreements${
        sourceCoverage ? ` · ${sourceCoverage}` : ""
      }; generated wording coverage, not party entitlement or a legal conclusion.`;
    }
    const disclosure = record(summary.disclosure);
    const disclosureLines = [
      disclosure.coverage,
      disclosure.observed_vs_generated,
      disclosure.legal_reliance,
      partySummary.measurement,
      positionSummary.measurement,
      positionSummary.absence_warning,
      terminationSummary.measurement,
      terminationSummary.absence_warning,
      assignmentSummary.measurement,
      assignmentSummary.absence_warning,
      assignmentSummary.context_warning,
    ].filter((value) => typeof value === "string");
    corpusDisclosure.replaceChildren(
      ...disclosureLines.map((line) => element("p", "", line)),
    );
  }

  function renderGoverningLawSummary(value) {
    const summary = record(value);
    const current = record(summary.current);
    const library = record(summary.published_position_library);
    const signalFacets = array(summary.published_signal_facets);

    governingLawFacets.replaceChildren(
      element("span", "", "Available evidence:"),
    );
    for (const facetValue of signalFacets) {
      const facet = record(facetValue);
      const signalKey = displayText(facet.signal_key);
      const label = GOVERNING_LAW_POSITION_SIGNALS[signalKey];
      if (!label || facet.signal_basis !== "generated") continue;
      const button = element(
        "button",
        "",
        `${label} · ${count(facet.clauses)} clauses / ${
          count(
            facet.distinct_agreements,
          )
        } agreements`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        governingLawSignalInput.value = signalKey;
        governingLawForm.requestSubmit();
      });
      governingLawFacets.append(button);
    }

    const sourceCoverage = array(library.by_source)
      .slice(0, 10)
      .map((sourceValue) => {
        const source = record(sourceValue);
        return `${displayText(source.source_slug)} ${count(source.clauses)}`;
      })
      .join(" · ");
    const repairStatus = Number(current.missing_clauses) === 0
      ? "cache complete"
      : `${count(current.missing_clauses)} cache rows missing`;
    statusMessage(
      governingLawStatus,
      `${count(library.matched_clauses)} detected clauses across ${
        count(
          library.distinct_agreements,
        )
      } useful agreements${sourceCoverage ? ` · ${sourceCoverage}` : ""}; ${
        count(
          current.cached_clauses,
        )
      } / ${
        count(
          current.eligible_clauses,
        )
      } current clauses cached (${repairStatus}); generated wording coverage, not a normalized jurisdiction or legal conclusion.`,
      "success",
    );

    for (
      const line of [
        summary.measurement,
        summary.absence_warning,
        summary.interpretation_warning,
      ]
    ) {
      if (typeof line === "string") {
        corpusDisclosure.append(element("p", "", line));
      }
    }
  }

  async function loadGoverningLawSummary() {
    if (!state.token) return;
    governingLawFacets.replaceChildren(
      element("span", "", "Loading available evidence…"),
    );
    statusMessage(governingLawStatus, "Loading governing-law coverage…");
    try {
      const payload = await requestJson(
        "/api/governing-law-summary",
        state.token,
      );
      renderGoverningLawSummary(record(payload).data);
    } catch (error) {
      handleFailure(error, governingLawStatus);
    }
  }

  function renderIndemnitySummary(value) {
    const summary = record(value);
    const current = record(summary.current);
    const library = record(summary.published_position_library);
    const signalFacets = array(summary.published_signal_facets);

    indemnityFacets.replaceChildren(element("span", "", "Available evidence:"));
    for (const facetValue of signalFacets) {
      const facet = record(facetValue);
      const signalKey = displayText(facet.signal_key);
      const label = INDEMNITY_POSITION_SIGNALS[signalKey];
      if (!label || facet.signal_basis !== "generated") continue;
      const button = element(
        "button",
        "",
        `${label} · ${count(facet.clauses)} clauses / ${
          count(
            facet.distinct_agreements,
          )
        } agreements`,
      );
      button.type = "button";
      button.addEventListener("click", () => {
        indemnitySignalInput.value = signalKey;
        indemnityForm.requestSubmit();
      });
      indemnityFacets.append(button);
    }

    const sourceCoverage = array(library.by_source)
      .slice(0, 10)
      .map((sourceValue) => {
        const source = record(sourceValue);
        return `${displayText(source.source_slug)} ${count(source.clauses)}`;
      })
      .join(" · ");
    const repairStatus = Number(current.missing_clauses) === 0
      ? "cache complete"
      : `${count(current.missing_clauses)} cache rows missing`;
    statusMessage(
      indemnityStatus,
      `${count(library.matched_clauses)} detected clauses across ${
        count(
          library.distinct_agreements,
        )
      } useful agreements${sourceCoverage ? ` · ${sourceCoverage}` : ""}; ${
        count(
          current.cached_clauses,
        )
      } / ${
        count(
          current.eligible_clauses,
        )
      } current clauses cached (${repairStatus}); generated wording coverage, not indemnity scope or a legal conclusion.`,
      "success",
    );

    for (
      const line of [
        summary.measurement,
        summary.absence_warning,
        summary.interpretation_warning,
      ]
    ) {
      if (typeof line === "string") {
        corpusDisclosure.append(element("p", "", line));
      }
    }
  }

  async function loadIndemnitySummary() {
    if (!state.token) return;
    indemnityFacets.replaceChildren(
      element("span", "", "Loading available evidence…"),
    );
    statusMessage(indemnityStatus, "Loading indemnity coverage…");
    try {
      const payload = await requestJson("/api/indemnity-summary", state.token);
      renderIndemnitySummary(record(payload).data);
    } catch (error) {
      handleFailure(error, indemnityStatus);
    }
  }

  async function loadDashboard(prefetched = null) {
    statusMessage(workspaceStatus, "Loading the published corpus snapshot…");
    try {
      const payload = prefetched ??
        (await requestJson("/api/dashboard", state.token));
      renderDashboard(payload);
      statusMessage(workspaceStatus, "Published snapshot loaded.", "success");
      await loadGoverningLawSummary();
      await loadIndemnitySummary();
    } catch (error) {
      handleFailure(error, workspaceStatus);
    }
  }

  function updateComparisonControls(message = null, kind = "") {
    const selected = state.comparisonSelection.size;
    clearComparisonButton.disabled = selected === 0 || state.comparing;
    openComparisonButton.disabled = selected < COMPARISON_MIN_ITEMS ||
      selected > COMPARISON_MAX_ITEMS ||
      state.comparing;
    exportComparisonButton.disabled = state.comparing ||
      state.comparisonEvidence.length === 0;
    exportPositionMatrixButton.disabled = state.comparing ||
      state.comparisonEvidence.length === 0;
    exportTerminationMatrixButton.disabled = state.comparing ||
      state.comparisonEvidence.length === 0;
    exportAssignmentMatrixButton.disabled = state.comparing ||
      state.comparisonEvidence.length === 0;
    exportGoverningLawMatrixButton.disabled = state.comparing ||
      state.comparisonEvidence.length === 0;
    exportIndemnityMatrixButton.disabled = state.comparing ||
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
    input.setAttribute("aria-label", comparisonAccessibleLabel(item));
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

  function commercialPositionPanel(value, collapsed = false) {
    const position = commercialPositionEvidence(value);
    if (!position?.applicable) return null;
    const container = collapsed
      ? element("details", "comparison-context commercial-position")
      : section("Commercial position signals");
    if (collapsed) {
      container.append(
        element(
          "summary",
          "",
          `Position signals · ${count(position.matchedSignalCount)} matched`,
        ),
      );
    }
    container.append(
      element(
        "p",
        "focus-note",
        "Generated clause-level pattern matches for negotiation triage. They are not legal conclusions, and absence is not evidence that the agreement lacks a position.",
      ),
      element(
        "p",
        "muted",
        `Scope: matched clause only · detector ${
          displayText(
            position.detectorVersion,
          )
        } · eligibility theme ${displayText(position.eligibility.theme)} (${
          displayText(
            position.eligibility.theme_basis,
          )
        })`,
      ),
    );
    if (!position.signals.length) {
      container.append(
        element(
          "p",
          "muted",
          "No supported position pattern matched this clause. Inspect the wording directly.",
        ),
      );
      return container;
    }
    for (const signalValue of position.signals) {
      const signal = record(signalValue);
      const support = record(signal.observed_support);
      const attributes = positionAttributeEntries(signal.generated_attributes);
      const card = element("article", "relationship position-signal");
      append(
        card,
        element("span", "badge generated", "Generated position signal"),
        element("h4", "", displayText(signal.label, signal.signal_key)),
        element(
          "p",
          "muted",
          `Confidence ${
            Number.isFinite(Number(signal.confidence))
              ? `${Math.round(Number(signal.confidence) * 100)}%`
              : "not stated"
          } · rule ${displayText(signal.rule_id)}`,
        ),
      );
      if (attributes.length) card.append(dataList(attributes));
      const valueEntries = observedValueCandidateEntries(
        signal.observed_value_candidates,
      );
      if (valueEntries.length) {
        const values = element("div", "position-values");
        append(
          values,
          element("span", "badge observed", "Observed cap-value candidates"),
          dataList(
            valueEntries.map((entry) => [
              entry.label,
              entry.values.join(" · "),
            ]),
          ),
          element(
            "p",
            "muted",
            "Exact lexical tokens from the bounded support window; values are not normalized or interpreted as the operative cap.",
          ),
        );
        card.append(values);
      }
      const evidence = element("div", "position-support");
      append(
        evidence,
        element("span", "badge observed", "Observed support excerpt"),
        element("p", "observed-text", boundedText(support.text, 2_000)),
        element(
          "p",
          "muted",
          `Clause characters ${displayText(support.clause_char_start, "?")}–${
            displayText(
              support.clause_char_end,
              "?",
            )
          } · SHA-256 ${displayText(support.sha256, "not available")}`,
        ),
      );
      card.append(evidence);
      container.append(card);
    }
    return container;
  }

  function terminationPositionPanel(value, collapsed = false) {
    const position = terminationPositionEvidence(value);
    if (!position?.applicable) return null;
    const container = collapsed
      ? element("details", "comparison-context commercial-position")
      : section("Termination wording signals");
    if (collapsed) {
      container.append(
        element(
          "summary",
          "",
          `Termination signals · ${count(position.matchedSignalCount)} matched`,
        ),
      );
    }
    container.append(
      element(
        "p",
        "focus-note",
        "Generated wording matches for exit-risk triage. They do not determine who holds a termination right, whether a trigger is satisfied, or legal effect; absence is not evidence of absence.",
      ),
      element(
        "p",
        "muted",
        `Scope: matched clause only · detector ${
          displayText(
            position.detectorVersion,
          )
        } · eligibility theme ${displayText(position.eligibility.theme)} (${
          displayText(
            position.eligibility.theme_basis,
          )
        })`,
      ),
    );
    if (!position.signals.length) {
      container.append(
        element(
          "p",
          "muted",
          "No supported termination wording matched this clause. Inspect the wording directly.",
        ),
      );
      return container;
    }
    for (const signalValue of position.signals) {
      const signal = record(signalValue);
      const support = record(signal.observed_support);
      const attributes = terminationAttributeEntries(
        signal.generated_attributes,
      );
      const card = element("article", "relationship position-signal");
      append(
        card,
        element("span", "badge generated", "Generated termination signal"),
        element("h4", "", displayText(signal.label, signal.signal_key)),
        element(
          "p",
          "muted",
          `Confidence ${
            Number.isFinite(Number(signal.confidence))
              ? `${Math.round(Number(signal.confidence) * 100)}%`
              : "not stated"
          } · rule ${displayText(signal.rule_id)}`,
        ),
      );
      if (attributes.length) card.append(dataList(attributes));
      const durations = observedDurationEntries(
        signal.observed_duration_candidates,
      );
      if (durations.length) {
        const values = element("div", "position-values");
        append(
          values,
          element("span", "badge observed", "Observed duration candidates"),
          element("p", "", durations.join(" · ")),
          element(
            "p",
            "muted",
            "Exact lexical spans from bounded support; they are not normalized or classified as notice or cure periods.",
          ),
        );
        card.append(values);
      }
      const evidence = element("div", "position-support");
      append(
        evidence,
        element("span", "badge observed", "Observed support excerpt"),
        element("p", "observed-text", boundedText(support.text, 2_000)),
        element(
          "p",
          "muted",
          `Clause characters ${displayText(support.clause_char_start, "?")}–${
            displayText(
              support.clause_char_end,
              "?",
            )
          } · SHA-256 ${displayText(support.sha256, "not available")}`,
        ),
      );
      card.append(evidence);
      container.append(card);
    }
    return container;
  }

  function assignmentPositionPanel(value, collapsed = false) {
    const position = assignmentPositionEvidence(value);
    if (!position?.applicable) return null;
    const container = collapsed
      ? element("details", "comparison-context commercial-position")
      : section("Assignment and change-of-control wording signals");
    if (collapsed) {
      container.append(
        element(
          "summary",
          "",
          `Assignment/control signals · ${
            count(
              position.matchedSignalCount,
            )
          } matched`,
        ),
      );
    }
    container.append(
      element(
        "p",
        "focus-note",
        "Generated wording matches for negotiation and diligence triage. They do not determine which party holds a right, whether consent is effective, whether an exception applies, or legal effect.",
      ),
      element(
        "p",
        "muted",
        `Scope: exact detector-selected support only · detector ${
          displayText(
            position.detectorVersion,
          )
        } · eligibility theme ${displayText(position.eligibility.theme)} (${
          displayText(
            position.eligibility.theme_basis,
          )
        })`,
      ),
    );
    if (!position.signals.length) {
      container.append(
        element(
          "p",
          "muted",
          "No supported assignment/change-of-control wording matched this span. Absence is not evidence of absence.",
        ),
      );
      return container;
    }
    for (const signalValue of position.signals) {
      const signal = record(signalValue);
      const support = record(signal.observed_support);
      const attributes = assignmentAttributeEntries(
        signal.generated_attributes,
      );
      const card = element("article", "relationship position-signal");
      append(
        card,
        element(
          "span",
          "badge generated",
          "Generated assignment / control signal",
        ),
        element("h4", "", displayText(signal.label, signal.signal_key)),
        element(
          "p",
          "muted",
          `Confidence ${
            Number.isFinite(Number(signal.confidence))
              ? `${Math.round(Number(signal.confidence) * 100)}%`
              : "not stated"
          } · rule ${displayText(signal.rule_id)}`,
        ),
      );
      if (attributes.length) card.append(dataList(attributes));
      const evidence = element("div", "position-support");
      append(
        evidence,
        element("span", "badge observed", "Observed support excerpt"),
        element("p", "observed-text", boundedText(support.text, 2_000)),
        element(
          "p",
          "muted",
          `Clause characters ${displayText(support.clause_char_start, "?")}–${
            displayText(
              support.clause_char_end,
              "?",
            )
          } · SHA-256 ${displayText(support.sha256, "not available")}`,
        ),
      );
      card.append(evidence);
      container.append(card);
    }
    return container;
  }

  function governingLawPositionPanel(value, collapsed = false) {
    const position = governingLawPositionEvidence(value);
    if (!position?.applicable) return null;
    const container = collapsed
      ? element("details", "comparison-context commercial-position")
      : section("Governing-law and forum wording signals");
    if (collapsed) {
      container.append(
        element(
          "summary",
          "",
          `Governing-law/forum signals · ${
            count(
              position.matchedSignalCount,
            )
          } matched`,
        ),
      );
    }
    container.append(
      element(
        "p",
        "focus-note",
        "Generated wording matches for negotiation and diligence triage. They do not normalize a jurisdiction, determine forum enforceability, resolve conflicts rules, or reconcile arbitration and amendments.",
      ),
      element(
        "p",
        "muted",
        `Scope: exact detector-selected support only · detector ${
          displayText(
            position.detectorVersion,
          )
        } · eligibility theme ${displayText(position.eligibility.theme)} (${
          displayText(
            position.eligibility.theme_basis,
          )
        })`,
      ),
    );
    if (!position.signals.length) {
      container.append(
        element(
          "p",
          "muted",
          "No supported governing-law or forum wording matched this span. Absence is not evidence of absence.",
        ),
      );
      return container;
    }
    for (const signalValue of position.signals) {
      const signal = record(signalValue);
      const support = record(signal.observed_support);
      const card = element("article", "relationship position-signal");
      append(
        card,
        element(
          "span",
          "badge generated",
          "Generated governing-law / forum signal",
        ),
        element("h4", "", displayText(signal.label, signal.signal_key)),
        element(
          "p",
          "muted",
          `Confidence ${
            Number.isFinite(Number(signal.confidence))
              ? `${Math.round(Number(signal.confidence) * 100)}%`
              : "not stated"
          } · rule ${displayText(signal.rule_id)}`,
        ),
      );
      const evidence = element("div", "position-support");
      append(
        evidence,
        element("span", "badge observed", "Observed support excerpt"),
        element("p", "observed-text", boundedText(support.text, 2_000)),
        element(
          "p",
          "muted",
          `Clause characters ${displayText(support.clause_char_start, "?")}–${
            displayText(
              support.clause_char_end,
              "?",
            )
          } · SHA-256 ${displayText(support.sha256, "not available")}`,
        ),
      );
      card.append(evidence);
      container.append(card);
    }
    return container;
  }

  function indemnityPositionPanel(value, collapsed = false) {
    const position = indemnityPositionEvidence(value);
    if (!position?.applicable) return null;
    const container = collapsed
      ? element("details", "comparison-context commercial-position")
      : section("Indemnity structure and procedure signals");
    if (collapsed) {
      container.append(
        element(
          "summary",
          "",
          `Indemnity signals · ${count(position.matchedSignalCount)} matched`,
        ),
      );
    }
    const window = position.analysisWindow;
    container.append(
      element(
        "p",
        "focus-note",
        "Generated wording matches for negotiation and diligence triage. They do not identify the indemnifying party, decide claim coverage, resolve limitation interaction, or determine enforceability.",
      ),
      element(
        "p",
        "muted",
        `Scope: bounded observed clause window around exact indemnity-theme support · detector ${
          displayText(
            position.detectorVersion,
          )
        } · window ${displayText(window.clause_char_start, "?")}–${
          displayText(
            window.clause_char_end,
            "?",
          )
        } · eligibility theme ${displayText(position.eligibility.theme)} (${
          displayText(
            position.eligibility.theme_basis,
          )
        })`,
      ),
    );
    if (!position.signals.length) {
      container.append(
        element(
          "p",
          "muted",
          "No supported indemnity structure or procedure wording matched this bounded window. Absence is not evidence of absence.",
        ),
      );
      return container;
    }
    for (const signalValue of position.signals) {
      const signal = record(signalValue);
      const support = record(signal.observed_support);
      const attributes = indemnityAttributeEntries(signal.generated_attributes);
      const card = element("article", "relationship position-signal");
      append(
        card,
        element("span", "badge generated", "Generated indemnity signal"),
        element("h4", "", displayText(signal.label, signal.signal_key)),
        element(
          "p",
          "muted",
          `Confidence ${
            Number.isFinite(Number(signal.confidence))
              ? `${Math.round(Number(signal.confidence) * 100)}%`
              : "not stated"
          } · rule ${displayText(signal.rule_id)}`,
        ),
      );
      if (attributes.length) card.append(dataList(attributes));
      const evidence = element("div", "position-support");
      append(
        evidence,
        element("span", "badge observed", "Observed support excerpt"),
        element("p", "observed-text", boundedText(support.text, 2_000)),
        element(
          "p",
          "muted",
          `Clause characters ${displayText(support.clause_char_start, "?")}–${
            displayText(
              support.clause_char_end,
              "?",
            )
          } · SHA-256 ${displayText(support.sha256, "not available")}`,
        ),
      );
      card.append(evidence);
      container.append(card);
    }
    return container;
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
          displayText(
            executionDate.value,
            "not stated",
          )
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
          displayText(
            agreement.document_kind,
            selection.document_kind,
          )
        } · recorded basis: ${
          displayText(
            agreement.document_kind_basis,
            "generated",
          )
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
      element("strong", "", "Source-use assessment · not source wording"),
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

    const commercialPosition = commercialPositionPanel(
      evidence.commercialPosition,
      true,
    );
    if (commercialPosition) column.append(commercialPosition);
    const terminationPosition = terminationPositionPanel(
      evidence.terminationPosition,
      true,
    );
    if (terminationPosition) column.append(terminationPosition);
    const assignmentPosition = assignmentPositionPanel(
      evidence.assignmentPosition,
      true,
    );
    if (assignmentPosition) column.append(assignmentPosition);
    const governingLawPosition = governingLawPositionPanel(
      evidence.governingLawPosition,
      true,
    );
    if (governingLawPosition) column.append(governingLawPosition);
    const indemnityPosition = indemnityPositionPanel(
      evidence.indemnityPosition,
      true,
    );
    if (indemnityPosition) column.append(indemnityPosition);

    const connectedContext = comparisonConnectedContext(evidence.anchorContext);
    if (connectedContext) {
      const connected = element(
        "details",
        "comparison-context connected-comparison-context",
      );
      connected.append(
        element(
          "summary",
          "",
          `Connected context · ${
            count(
              connectedContext.totals.definitionCandidates,
            )
          } definitions · ${
            count(
              connectedContext.totals.resolvedReferenceTargets,
            )
          } resolved · ${
            count(
              connectedContext.totals.unresolvedReferences,
            )
          } unresolved`,
        ),
        element(
          "p",
          "muted",
          "Observed definitions and target wording are evidence. Term-use matching and target resolution are generated navigation aids, not legal interpretations.",
        ),
      );
      if (connectedContext.definitionCandidates.length) {
        connected.append(element("h4", "", "Definitions used by this clause"));
        for (const definition of connectedContext.definitionCandidates) {
          const card = element("article", "context-clause");
          append(
            card,
            element("span", "badge observed", "Observed definition"),
            element("span", "badge generated", "Generated term-use match"),
            element(
              "h4",
              "",
              `“${displayText(definition.term, "Unnamed term")}” · clause ${
                displayText(
                  definition.defining_clause_sequence,
                  "?",
                )
              }`,
            ),
            element(
              "p",
              "observed-text",
              boundedText(definition.definition, 4_000),
            ),
            element(
              "p",
              "muted",
              `Definition SHA-256 ${
                displayText(
                  definition.definition_sha256,
                  "not available",
                )
              }${
                definition.definition_truncated
                  ? " · definition text truncated by the bounded API"
                  : ""
              }${
                definition.ambiguous_definition_occurrences
                  ? " · multiple definition occurrences"
                  : ""
              }`,
            ),
          );
          connected.append(card);
        }
      }
      if (connectedContext.resolvedReferenceTargets.length) {
        connected.append(element("h4", "", "Referenced provisions"));
        for (const reference of connectedContext.resolvedReferenceTargets) {
          const card = element("article", "context-clause");
          append(
            card,
            element(
              "span",
              reference.target_resolution_basis === "generated"
                ? "badge generated"
                : "badge observed",
              referenceResolutionProvenance(reference.target_resolution_basis),
            ),
            element(
              "h4",
              "",
              `${
                displayText(
                  reference.observed_reference,
                  "Reference",
                )
              } → clause ${displayText(reference.target_sequence, "?")}`,
            ),
            element(
              "p",
              "muted",
              displayText(
                reference.target_heading,
                "Untitled referenced clause",
              ),
            ),
            element(
              "p",
              "observed-text",
              boundedText(reference.target_text, 8_000),
            ),
            element(
              "p",
              "muted",
              `Target text SHA-256 ${
                displayText(
                  reference.target_text_sha256,
                  "not available",
                )
              }${
                reference.target_text_truncated
                  ? " · target text truncated by the bounded API"
                  : ""
              }`,
            ),
          );
          connected.append(card);
        }
      }
      if (connectedContext.unresolvedReferences.length) {
        connected.append(element("h4", "", "References needing inspection"));
        for (const reference of connectedContext.unresolvedReferences) {
          const card = element("article", "context-clause");
          append(
            card,
            element("span", "badge generated", "Generated resolution status"),
            element(
              "h4",
              "",
              displayText(
                reference.observed_reference,
                "Reference unavailable",
              ),
            ),
            element(
              "p",
              "muted",
              referenceResolutionLabel(reference.target_resolution_status),
            ),
          );
          connected.append(card);
        }
      }
      connected.append(
        element(
          "p",
          "muted",
          connectedContext.previewLimited
            ? "Comparison shows the first five items in each category. Open the agreement or export citation JSON for the larger bounded packet."
            : "The complete connected-context packet returned for this clause is shown above.",
        ),
      );
      column.append(connected);
    }

    const context = element("details", "comparison-context");
    const window = evidence.clauseWindow;
    const first = displayText(window.first_sequence, "?");
    const last = displayText(window.last_sequence, "?");
    context.append(
      element("summary", "", `Bounded context · clauses ${first}–${last}`),
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
      const relation =
        Number.isFinite(neighborSequence) && Number.isFinite(anchorSequence)
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
      !state.token ||
      state.comparing ||
      selected.length < COMPARISON_MIN_ITEMS ||
      selected.length > COMPARISON_MAX_ITEMS
    ) {
      return;
    }

    state.comparing = true;
    state.comparisonEvidence = [];
    exportStatus.textContent = "";
    updateComparisonControls("Loading bounded source context…");
    const loading = element("p", "muted", "Loading selected clause evidence…");
    loading.setAttribute("role", "status");
    comparisonBody.replaceChildren(loading);
    openDialog(comparisonDialog);
    const token = state.token;
    const settled = await Promise.allSettled(
      selected.map(async (item) => {
        const payload = await requestJson(
          buildAgreementPath(
            item.agreement_id,
            COMPARISON_CONTEXT_CLAUSES,
            item.clause_id,
          ),
          token,
        );
        return comparisonEvidence(payload, item.clause_id);
      }),
    );

    if (state.token !== token) {
      state.comparing = false;
      return;
    }

    const unauthorized = settled.find(
      (result) =>
        result.status === "rejected" &&
        result.reason instanceof ApiError &&
        result.reason.status === 401,
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
      } ready for JSON and evidence-matrix CSV exports.`
      : "No evidence was loaded, so no export file is available.";
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
        manifest.generated_at.slice(
          0,
          10,
        )
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

  function exportPositionMatrix() {
    if (!state.comparisonEvidence.length) return;
    try {
      const generatedAt = new Date().toISOString();
      const csv = buildLiabilityPositionMatrixCsv({
        query: state.query,
        kind: state.kind,
        source: state.source,
        entries: state.comparisonEvidence,
        generatedAt,
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const link = element("a");
      link.href = objectUrl;
      link.download = `esheria-liability-position-matrix-${
        generatedAt.slice(
          0,
          10,
        )
      }.csv`;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      exportStatus.textContent =
        "Position CSV downloaded. Detector non-matches are not evidence that wording is absent.";
    } catch (error) {
      exportStatus.textContent = error instanceof Error
        ? error.message
        : "Position CSV could not be created.";
    }
  }

  function exportTerminationMatrix() {
    if (!state.comparisonEvidence.length) return;
    try {
      const generatedAt = new Date().toISOString();
      const csv = buildTerminationPositionMatrixCsv({
        query: state.query,
        kind: state.kind,
        source: state.source,
        entries: state.comparisonEvidence,
        generatedAt,
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const link = element("a");
      link.href = objectUrl;
      link.download = `esheria-termination-position-matrix-${
        generatedAt.slice(
          0,
          10,
        )
      }.csv`;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      exportStatus.textContent =
        "Termination CSV downloaded. Each row is one generated signal; same-support linkage is lexical proximity, not a legal conclusion.";
    } catch (error) {
      exportStatus.textContent = error instanceof Error
        ? error.message
        : "Termination CSV could not be created.";
    }
  }

  function exportAssignmentMatrix() {
    if (!state.comparisonEvidence.length) return;
    try {
      const generatedAt = new Date().toISOString();
      const csv = buildAssignmentPositionMatrixCsv({
        query: state.query,
        kind: state.kind,
        source: state.source,
        entries: state.comparisonEvidence,
        generatedAt,
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const link = element("a");
      link.href = objectUrl;
      link.download = `esheria-assignment-position-matrix-${
        generatedAt.slice(
          0,
          10,
        )
      }.csv`;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      exportStatus.textContent =
        "Assignment CSV downloaded. Each row is one generated wording signal, not a determination of party rights or legal effect.";
    } catch (error) {
      exportStatus.textContent = error instanceof Error
        ? error.message
        : "Assignment CSV could not be created.";
    }
  }

  function exportGoverningLawMatrix() {
    if (!state.comparisonEvidence.length) return;
    try {
      const generatedAt = new Date().toISOString();
      const governingMode = state.resultMode === "governing_law_positions";
      const csv = buildGoverningLawPositionMatrixCsv({
        query: governingMode ? state.governingLawSignal : state.query,
        kind: governingMode ? state.governingLawKind : state.kind,
        source: governingMode ? state.governingLawSource : state.source,
        entries: state.comparisonEvidence,
        generatedAt,
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const link = element("a");
      link.href = objectUrl;
      link.download = `esheria-governing-law-position-matrix-${
        generatedAt.slice(
          0,
          10,
        )
      }.csv`;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      exportStatus.textContent =
        "Governing-law CSV downloaded. Each row is one generated wording signal; jurisdictions are not normalized and enforceability is not determined.";
    } catch (error) {
      exportStatus.textContent = error instanceof Error
        ? error.message
        : "Governing-law CSV could not be created.";
    }
  }

  function exportIndemnityMatrix() {
    if (!state.comparisonEvidence.length) return;
    try {
      const generatedAt = new Date().toISOString();
      const indemnityMode = state.resultMode === "indemnity_positions";
      const csv = buildIndemnityPositionMatrixCsv({
        query: indemnityMode ? state.indemnitySignal : state.query,
        kind: indemnityMode ? state.indemnityKind : state.kind,
        source: indemnityMode ? state.indemnitySource : state.source,
        entries: state.comparisonEvidence,
        generatedAt,
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const link = element("a");
      link.href = objectUrl;
      link.download = `esheria-indemnity-position-matrix-${
        generatedAt.slice(
          0,
          10,
        )
      }.csv`;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      exportStatus.textContent =
        "Indemnity CSV downloaded. Each row is one generated wording signal; party entitlement, claim coverage, cap interaction and enforceability are not determined.";
    } catch (error) {
      exportStatus.textContent = error instanceof Error
        ? error.message
        : "Indemnity CSV could not be created.";
    }
  }

  function partyDecisionBriefComparisonChoice(item, agreementId) {
    const button = element(
      "button",
      "button secondary party-brief-compare-button",
      "Add to brief comparison",
    );
    button.type = "button";
    button.setAttribute("data-agreement-id", agreementId);
    button.setAttribute(
      "data-agreement-title",
      displayText(item.observed_title, "Untitled agreement"),
    );
    button.addEventListener("click", () => {
      const selected = !state.decisionBriefComparisonSelection.has(
        agreementId,
      );
      setDecisionBriefComparisonSelection(
        {
          agreementId,
          title: displayText(item.observed_title, "Untitled agreement"),
          source: {
            name: displayText(item.source_name, "Unknown source"),
          },
        },
        selected,
      );
    });
    return button;
  }

  function partyResultCard(itemValue) {
    const item = record(itemValue);
    const agreementId = typeof item.agreement_id === "string"
      ? item.agreement_id
      : "";
    const card = element("article", "result-card");
    const top = element("div", "result-top");
    const headingGroup = element("div");
    append(
      headingGroup,
      element("span", "badge basis-observed", "Observed party-name match"),
      element("h3", "", displayText(item.observed_party_name, "Unnamed party")),
      element(
        "div",
        "meta",
        `${displayText(item.observed_party_role, "role not stated")} · ${
          partyCapturePresentation(
            item.party_capture_method,
          )
        } · entity status ${
          displayText(
            item.party_resolution_status,
            "unresolved",
          )
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

    const briefCoverage = state.partyBriefCoverage.get(agreementId);
    let briefCoveragePanel = null;
    if (briefCoverage) {
      card.setAttribute(
        "data-brief-matched-topics",
        String(briefCoverage.matchedTopicCount),
      );
      briefCoveragePanel = element("div", "party-brief-coverage");
      append(
        briefCoveragePanel,
        element("span", "badge basis-generated", "Generated coverage order"),
        element(
          "p",
          "",
          `${count(briefCoverage.matchedTopicCount)} of 5 topics · ${
            count(briefCoverage.matchingClauseCount)
          } matching clause(s) · ${
            count(briefCoverage.signalCount)
          } positive signal(s)`,
        ),
      );
      if (briefCoverage.matchedTopics.length) {
        for (const topic of briefCoverage.matchedTopics) {
          briefCoveragePanel.append(
            element(
              "span",
              "badge basis-generated",
              `${topic.label}: ${count(topic.matchingClauseCount)}`,
            ),
          );
        }
      } else {
        briefCoveragePanel.append(
          element(
            "p",
            "muted tiny",
            "No positive match in this detector surface; this is not evidence that a provision or consequence is absent.",
          ),
        );
      }
    }

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
            displayText(
              party.observed_role,
              "role not stated",
            )
          } · entity ${displayText(party.resolution_status, "unresolved")}`,
        ),
      );
    }
    if (item.agreement_parties_truncated === true) {
      partyList.append(
        element("p", "muted", "Additional recorded party names are omitted."),
      );
    }

    const partyEvidence =
      typeof item.party_evidence_quote === "string" && item.party_evidence_quote
        ? append(
          element("blockquote", "observed-text"),
          element("strong", "", "Observed party evidence"),
          element("p", "", boundedText(item.party_evidence_quote, 500)),
        )
        : null;

    const actions = element("div", "result-actions");
    if (UUID_PATTERN.test(agreementId)) {
      const inspect = element(
        "button",
        "text-button",
        "Inspect agreement evidence →",
      );
      inspect.type = "button";
      inspect.addEventListener("click", () => loadAgreement(agreementId));
      actions.append(inspect);
      if (["contract", "amendment"].includes(item.document_kind)) {
        const openBrief = element(
          "button",
          "button secondary party-brief-open-button",
          "Open five-topic brief",
        );
        openBrief.type = "button";
        openBrief.setAttribute("data-agreement-id", agreementId);
        openBrief.setAttribute(
          "aria-label",
          `Open five-topic evidence brief for ${
            displayText(item.observed_title, "untitled agreement")
          }`,
        );
        openBrief.addEventListener(
          "click",
          () => loadAgreementDecisionBrief(agreementId),
        );
        actions.append(
          openBrief,
          partyDecisionBriefComparisonChoice(item, agreementId),
        );
      }
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
      const dossier = element(
        "button",
        "text-button",
        "Build exact-name negotiation dossier →",
      );
      dossier.type = "button";
      dossier.addEventListener(
        "click",
        () => loadPartyDossier(item.observed_party_name),
      );
      actions.append(dossier);
    }
    append(actions, sourceLink(item.source_url));
    append(
      card,
      top,
      title,
      metadata,
      briefCoveragePanel,
      partyEvidence,
      partyList,
      actions,
    );
    return card;
  }

  function updateDecisionBriefComparisonControls(message = null, kind = "") {
    const selected = state.decisionBriefComparisonSelection.size;
    const selectionMessage = message ??
      (selected === 0
        ? "Select 2–3 agreements to compare the same five positive-detector topics."
        : selected === 1
        ? "1 agreement selected. Select at least one more."
        : selected === AGREEMENT_DECISION_BRIEF_COMPARISON_MAX
        ? "3 agreements selected (maximum). Ready to compare."
        : "2 agreements selected. Ready to compare.");
    for (
      const button of [
        clearDecisionBriefComparisonButton,
        partyClearDecisionBriefComparisonButton,
      ]
    ) {
      button.disabled = selected === 0 || state.decisionBriefComparing;
    }
    for (
      const button of [
        openDecisionBriefComparisonButton,
        partyOpenDecisionBriefComparisonButton,
      ]
    ) {
      button.disabled = selected < AGREEMENT_DECISION_BRIEF_COMPARISON_MIN ||
        selected > AGREEMENT_DECISION_BRIEF_COMPARISON_MAX ||
        state.decisionBriefComparing;
    }
    downloadDecisionBriefComparisonButton.disabled =
      state.decisionBriefComparing ||
      state.decisionBriefComparisonExport === null;
    for (
      const status of [
        decisionBriefComparisonStatus,
        partyDecisionBriefComparisonStatus,
      ]
    ) {
      status.className = kind === "error" ? "status error" : "muted";
      status.textContent = selectionMessage;
    }

    for (
      const input of decisionBriefDirectoryResults.querySelectorAll(
        ".brief-compare-input",
      )
    ) {
      const agreementId = input.getAttribute("data-agreement-id") ?? "";
      const selectedHere = state.decisionBriefComparisonSelection.has(
        agreementId,
      );
      input.checked = selectedHere;
      input.disabled = state.decisionBriefComparing ||
        (selected >= AGREEMENT_DECISION_BRIEF_COMPARISON_MAX && !selectedHere);
      input.title = input.disabled && !selectedHere
        ? "The brief comparison already has three agreements"
        : "";
    }
    for (
      const button of [partyResults, partyBriefShortlistResults].flatMap(
        (container) => [
          ...container.querySelectorAll(".party-brief-compare-button"),
        ],
      )
    ) {
      const agreementId = button.getAttribute("data-agreement-id") ?? "";
      const agreementTitle = button.getAttribute("data-agreement-title") ??
        "this agreement";
      const selectedHere = state.decisionBriefComparisonSelection.has(
        agreementId,
      );
      button.textContent = selectedHere
        ? "Remove from brief comparison"
        : "Add to brief comparison";
      button.setAttribute("aria-pressed", String(selectedHere));
      button.setAttribute(
        "aria-label",
        `${selectedHere ? "Remove" : "Add"} ${agreementTitle} ${
          selectedHere ? "from" : "to"
        } agreement brief comparison`,
      );
      button.disabled = state.decisionBriefComparing ||
        (selected >= AGREEMENT_DECISION_BRIEF_COMPARISON_MAX && !selectedHere);
      button.title = button.disabled && !selectedHere
        ? "The brief comparison already has three agreements"
        : "";
    }
    for (
      const button of familyProposalResults.querySelectorAll(
        ".family-proposal-brief-compare-button",
      )
    ) {
      button.disabled = state.decisionBriefComparing;
    }
  }

  function clearDecisionBriefComparison() {
    state.decisionBriefComparisonSelection.clear();
    state.decisionBriefComparison = null;
    state.decisionBriefComparisonExport = null;
    decisionBriefComparisonBody.replaceChildren();
    decisionBriefComparisonDialogStatus.textContent = "";
    downloadDecisionBriefComparisonButton.disabled = true;
    if (decisionBriefComparisonDialog.hasAttribute("open")) {
      closeDialog(decisionBriefComparisonDialog);
    }
    updateDecisionBriefComparisonControls();
  }

  function setDecisionBriefComparisonSelection(item, selected) {
    const agreementId = item.agreementId;
    if (!UUID_PATTERN.test(agreementId)) return false;
    if (selected) {
      if (
        !state.decisionBriefComparisonSelection.has(agreementId) &&
        state.decisionBriefComparisonSelection.size >=
          AGREEMENT_DECISION_BRIEF_COMPARISON_MAX
      ) {
        updateDecisionBriefComparisonControls(
          "A brief comparison can contain at most three agreements. Remove one before adding another.",
          "error",
        );
        return false;
      }
      state.decisionBriefComparisonSelection.set(agreementId, item);
    } else {
      state.decisionBriefComparisonSelection.delete(agreementId);
    }
    state.decisionBriefComparison = null;
    state.decisionBriefComparisonExport = null;
    decisionBriefComparisonDialogStatus.textContent =
      "Selection changed; compare again before exporting.";
    updateDecisionBriefComparisonControls();
    return true;
  }

  function toggleDecisionBriefComparison(item, input) {
    if (!setDecisionBriefComparisonSelection(item, input.checked)) {
      input.checked = false;
    }
  }

  function decisionBriefComparisonChoice(item) {
    const label = element("label", "compare-choice");
    const input = element("input", "brief-compare-input");
    input.type = "checkbox";
    input.checked = state.decisionBriefComparisonSelection.has(
      item.agreementId,
    );
    input.setAttribute("data-agreement-id", item.agreementId);
    input.setAttribute(
      "aria-label",
      `Select ${displayText(item.title, "untitled agreement")} from ${
        displayText(item.source.name, "unknown source")
      } for agreement brief comparison`,
    );
    input.addEventListener(
      "change",
      () => toggleDecisionBriefComparison(item, input),
    );
    append(label, input, element("span", "", "Select for brief comparison"));
    return label;
  }

  function decisionBriefDirectoryCard(item) {
    const card = element("article", "result-card brief-directory-card");
    const headingGroup = element("div");
    append(
      headingGroup,
      element(
        "span",
        "badge basis-generated",
        `${count(item.matchedTopicCount)} of 5 detected topics`,
      ),
      element("h3", "", displayText(item.title, "Untitled agreement")),
    );
    const top = element("div", "result-top");
    append(
      top,
      headingGroup,
      element(
        "span",
        "badge basis-observed",
        "Observed source text available",
      ),
    );

    const metadata = element("div", "meta");
    append(
      metadata,
      element("span", "", displayText(item.source.name, "Unknown source")),
      element("span", "", displayText(item.documentKind, "unclassified")),
      item.observedEffectiveDate
        ? element(
          "span",
          "",
          `Recorded effective date ${item.observedEffectiveDate}`,
        )
        : null,
      item.observedExecutionDate
        ? element(
          "span",
          "",
          `Recorded execution date ${item.observedExecutionDate}`,
        )
        : null,
      element("span", "", `Source record ${item.source.externalId}`),
    );

    const topics = element("div", "brief-topic-grid");
    for (const topic of item.topics) {
      const chip = element(
        "div",
        `brief-topic-chip${topic.hasMatches ? "" : " topic-empty"}`,
      );
      append(
        chip,
        element("strong", "", topic.label),
        element(
          "span",
          "",
          topic.hasMatches
            ? `${count(topic.matchingClauseCount)} clause(s) · ${
              count(topic.signalCount)
            } signal(s)`
            : "No positive detector match",
        ),
      );
      topics.append(chip);
    }

    const actions = element("div", "result-actions");
    const openBrief = element(
      "button",
      "button primary",
      "Open evidence-linked brief",
    );
    openBrief.type = "button";
    openBrief.addEventListener("click", () => {
      loadAgreementDecisionBrief(item.agreementId);
    });
    const inspect = element("button", "text-button", "Inspect agreement →");
    inspect.type = "button";
    inspect.addEventListener("click", () => {
      loadAgreement(item.agreementId, null);
    });
    append(actions, decisionBriefComparisonChoice(item), openBrief, inspect);
    const source = sourceLink(item.source.sourceUrl, "Open recorded source ↗");
    if (source) actions.append(source);

    append(
      card,
      top,
      metadata,
      topics,
      element(
        "p",
        "focus-note",
        `${count(item.matchingClauseCount)} matching clause(s) and ${
          count(item.signalCount)
        } positive generated signal(s). Coverage order is navigation, not a risk or quality score.`,
      ),
      actions,
    );
    return card;
  }

  function renderDecisionBriefDirectory(value) {
    const response = decisionBriefDirectoryEvidence(
      record(value).data,
      state.decisionBriefDirectoryMinimumTopics,
      state.decisionBriefDirectoryLimit,
      state.decisionBriefDirectoryOffset,
      state.decisionBriefDirectoryKind,
      state.decisionBriefDirectorySource,
    );
    if (response === null) {
      throw new ApiError(
        "The decision brief directory response did not match its disclosure contract.",
      );
    }
    state.decisionBriefDirectoryHasMore = response.page.hasMore;
    decisionBriefDirectoryPrevious.disabled =
      state.decisionBriefDirectoryOffset === 0;
    decisionBriefDirectoryNext.disabled =
      !state.decisionBriefDirectoryHasMore ||
      state.decisionBriefDirectoryOffset + state.decisionBriefDirectoryLimit >
        DECISION_BRIEF_DIRECTORY_OFFSET_MAX;
    decisionBriefDirectoryResults.replaceChildren(
      ...(response.items.length
        ? response.items.map(decisionBriefDirectoryCard)
        : [
          element(
            "p",
            "empty",
            "No agreement at this page meets the selected positive-detector coverage. This is not evidence that the clauses are absent.",
          ),
        ]),
    );
    const start = response.items.length
      ? state.decisionBriefDirectoryOffset + 1
      : 0;
    const end = state.decisionBriefDirectoryOffset + response.items.length;
    decisionBriefDirectoryStatus.textContent = response.items.length
      ? `Showing agreements ${start}–${end} of ${
        count(response.page.eligibleAgreements)
      } with at least ${count(response.minimumTopics)} positive topic matches.`
      : response.page.eligibleAgreements > 0
      ? `No agreement appears at this offset; ${
        count(response.page.eligibleAgreements)
      } agreement(s) meet the selected detector threshold.`
      : "No agreement meets the selected positive-detector threshold. This is not evidence that the provisions are absent.";
    updateDecisionBriefComparisonControls();
  }

  async function performDecisionBriefDirectoryBrowse() {
    if (!state.token || state.decisionBriefDirectoryLoading) return;
    state.decisionBriefDirectoryLoading = true;
    state.decisionBriefDirectoryHasMore = false;
    decisionBriefDirectoryButton.disabled = true;
    decisionBriefDirectoryPrevious.disabled = true;
    decisionBriefDirectoryNext.disabled = true;
    statusMessage(
      decisionBriefDirectoryStatus,
      "Finding publication-gated agreements with validated topic evidence…",
    );
    try {
      const path = buildDecisionBriefDirectoryPath({
        minimumTopics: state.decisionBriefDirectoryMinimumTopics,
        kind: state.decisionBriefDirectoryKind,
        source: state.decisionBriefDirectorySource,
        limit: state.decisionBriefDirectoryLimit,
        offset: state.decisionBriefDirectoryOffset,
      });
      renderDecisionBriefDirectory(await requestJson(path, state.token));
    } catch (error) {
      handleFailure(error, decisionBriefDirectoryStatus);
    } finally {
      state.decisionBriefDirectoryLoading = false;
      decisionBriefDirectoryButton.disabled = false;
      decisionBriefDirectoryPrevious.disabled =
        state.decisionBriefDirectoryOffset === 0;
      decisionBriefDirectoryNext.disabled =
        !state.decisionBriefDirectoryHasMore ||
        state.decisionBriefDirectoryOffset +
              state.decisionBriefDirectoryLimit >
          DECISION_BRIEF_DIRECTORY_OFFSET_MAX;
    }
  }

  function familyProposalDocumentCard(document, ordinal, source) {
    const card = element("section", "family-document");
    const classificationClass = document.documentKindBasis === "generated"
      ? "basis-generated"
      : document.documentKindBasis === "reviewed"
      ? "basis-reviewed"
      : "";
    append(
      card,
      element("span", "badge", `Document ${ordinal}`),
      element(
        "h3",
        "",
        document.observedTitle === null
          ? "Observed title unavailable"
          : document.observedTitle,
      ),
      document.observedTitleTruncated
        ? element(
          "p",
          "muted",
          "Displayed observed title was source-truncated to 500 characters.",
        )
        : null,
      element(
        "span",
        `badge${classificationClass ? ` ${classificationClass}` : ""}`,
        documentKindBasisLabel(document.documentKindBasis),
      ),
      element(
        "p",
        "muted",
        `Source ${displayText(source)} · document kind ${
          displayText(document.documentKind)
        }${
          document.observedPublishedAt
            ? ` · published ${date(document.observedPublishedAt)}`
            : ""
        } · observed source text`,
      ),
      sourceLink(document.canonicalUrl, "Open recorded source ↗"),
      document.canonicalUrlOmitted
        ? element(
          "p",
          "muted",
          "Recorded source URL was omitted by server safety checks.",
        )
        : null,
    );
    const inspect = element(
      "button",
      "text-button",
      `Inspect document ${ordinal} →`,
    );
    inspect.type = "button";
    inspect.addEventListener(
      "click",
      () => loadAgreement(document.agreementId),
    );
    card.append(inspect);
    return card;
  }

  function familyProposalCard(item) {
    const card = element("article", "result-card family-proposal-card");
    const top = element("div", "result-top");
    append(
      top,
      element(
        "span",
        "badge basis-generated",
        "Generated proposal · relationship ledger not checked",
      ),
      element("span", "muted", `Source ${displayText(item.source)}`),
    );
    const reviewClass = item.reviewStatus === "unreviewed" ||
        item.reviewStatus === "mixed" || item.conflicting
      ? "basis-unknown"
      : "basis-reviewed";
    const documents = element("div", "family-documents");
    item.documents.forEach((document, index) =>
      documents.append(
        familyProposalDocumentCard(document, index + 1, item.source),
      )
    );
    const actions = element("div", "result-actions");
    const compareBriefs = element(
      "button",
      "button primary family-proposal-brief-compare-button",
      "Compare pair evidence",
    );
    compareBriefs.type = "button";
    compareBriefs.setAttribute(
      "aria-label",
      "Compare both proposed documents across five evidence topics and exact document-change cues",
    );
    compareBriefs.addEventListener(
      "click",
      () => compareFamilyProposalBriefs(item),
    );
    append(actions, compareBriefs);
    append(
      card,
      top,
      element(
        "p",
        "focus-note",
        "The two cards are ordered by identifier only. Their order and publication dates do not establish which document changes the other.",
      ),
      documents,
      actions,
      element(
        "span",
        `badge ${reviewClass}`,
        familyReviewStatusLabel(item.reviewStatus, item.conflicting),
      ),
      element(
        "p",
        "muted",
        `${
          count(item.currentDecisionCount)
        } current review response(s). Aggregate responses can be pseudonymous in a small review cohort and do not determine direction or legal effect.`,
      ),
      element(
        "p",
        "muted",
        `Candidate generated ${
          date(item.generatedAt)
        } from a corpus snapshot recorded ${date(item.corpusSnapshottedAt)}.`,
      ),
    );
    return card;
  }

  function renderFamilyProposals(value) {
    const response = familyProposalSearchEvidence(
      record(value).data,
      state.familyProposalLimit,
      state.familyProposalOffset,
    );
    if (response === null) {
      throw new ApiError(
        "The family proposal response did not match its disclosure contract.",
      );
    }
    state.familyProposalHasMore = response.page.hasMore;
    familyProposalPrevious.disabled = state.familyProposalOffset === 0;
    familyProposalNext.disabled = !state.familyProposalHasMore ||
      state.familyProposalOffset + state.familyProposalLimit >
        FAMILY_PROPOSAL_OFFSET_MAX;
    familyProposalResults.replaceChildren(
      ...(response.items.length ? response.items.map(familyProposalCard) : [
        element(
          "p",
          "empty",
          "No current publication-eligible family proposal was returned for this page.",
        ),
      ]),
    );
    const start = response.items.length ? state.familyProposalOffset + 1 : 0;
    const end = state.familyProposalOffset + response.items.length;
    familyProposalStatus.textContent = response.items.length
      ? `Showing proposal pairs ${start}–${end} of ${
        count(response.page.eligibleDistinctPairs)
      }. Generation is bounded and not exhaustive; proposals are not relationship or legal-effect findings.`
      : response.page.eligibleDistinctPairs > 0
      ? `No pair appears at this offset; ${
        count(response.page.eligibleDistinctPairs)
      } publication-eligible pair(s) currently exist.`
      : "No current publication-eligible family proposal is available. Generation is bounded, so this is not evidence that no related documents exist.";
  }

  async function performFamilyProposalBrowse() {
    if (!state.token || state.familyProposalLoading) return;
    state.familyProposalLoading = true;
    state.familyProposalHasMore = false;
    familyProposalLoadButton.disabled = true;
    familyProposalPrevious.disabled = true;
    familyProposalNext.disabled = true;
    statusMessage(
      familyProposalStatus,
      "Loading current publication-gated proposal pairs…",
    );
    try {
      const path = buildFamilyProposalPath({
        limit: state.familyProposalLimit,
        offset: state.familyProposalOffset,
      });
      renderFamilyProposals(await requestJson(path, state.token));
    } catch (error) {
      handleFailure(error, familyProposalStatus);
    } finally {
      state.familyProposalLoading = false;
      familyProposalLoadButton.disabled = false;
      familyProposalPrevious.disabled = state.familyProposalOffset === 0;
      familyProposalNext.disabled = !state.familyProposalHasMore ||
        state.familyProposalOffset + state.familyProposalLimit >
          FAMILY_PROPOSAL_OFFSET_MAX;
    }
  }

  function changeCueMarkedEvidence(cue) {
    const evidence = cue.observed_evidence;
    const characters = Array.from(evidence.excerpt);
    const relativeStart = evidence.matched_clause_char_start -
      evidence.clause_char_start;
    const relativeEnd = evidence.matched_clause_char_end -
      evidence.clause_char_start;
    const paragraph = element(
      "p",
      "brief-comparison-evidence change-cue-marked-evidence",
    );
    paragraph.append(
      document.createTextNode(characters.slice(0, relativeStart).join("")),
      element("mark", "", characters.slice(relativeStart, relativeEnd).join("")),
      document.createTextNode(characters.slice(relativeEnd).join("")),
    );
    return paragraph;
  }

  function changeCueEvidenceDetails(cue, open = false) {
    const details = element("details", "brief-comparison-more");
    details.open = open;
    append(
      details,
      element("summary", "", cue.label),
      element("span", "badge basis-generated", "Generated change cue"),
      element(
        "p",
        "muted",
        `Exact observed match: “${cue.observed_evidence.matched_text}”`,
      ),
      changeCueMarkedEvidence(cue),
      element(
        "p",
        "muted tiny",
        `Clause ${count(cue.clause.sequence)}${
          cue.clause.heading ? ` · ${cue.clause.heading}` : ""
        } · rule ${cue.rule_id} · observed support SHA-256 ${
          cue.observed_evidence.sha256
        }`,
      ),
    );
    return details;
  }

  function amendmentChangeDirectoryCard(item) {
    const card = element("article", "result-card amendment-change-card");
    const heading = element("div");
    append(
      heading,
      element(
        "span",
        "badge basis-generated",
        `${count(item.coverage.matched_cue_class_count)} change cue class(es)`,
      ),
      element(
        "h3",
        "",
        displayText(item.agreement.title, "Untitled amendment"),
      ),
    );
    const top = element("div", "result-top");
    append(
      top,
      heading,
      element("span", "badge basis-observed", "Observed source text"),
    );

    const metadata = element("div", "meta");
    append(
      metadata,
      element("span", "", displayText(item.source.name, "Unknown source")),
      element("span", "", item.source.slug),
      item.source.observed_published_at
        ? element(
          "span",
          "",
          `Observed publication ${date(item.source.observed_published_at)}`,
        )
        : null,
      element("span", "", `Source record ${item.source.external_id}`),
    );

    const summaries = element("div", "change-cue-summary");
    for (const summary of item.cue_summary) {
      summaries.append(
        element(
          "span",
          "badge basis-generated",
          `${summary.label}: ${count(summary.matched_cue_count)}`,
        ),
      );
    }

    const evidence = element("section", "change-cue-evidence");
    append(
      evidence,
      element("h4", "", "Representative exact observed cue"),
      element(
        "p",
        "muted",
        `Exact detector match: “${
          item.representative_cue.observed_evidence.matched_text
        }”`,
      ),
      changeCueMarkedEvidence(item.representative_cue),
      element(
        "p",
        "muted tiny",
        `Clause ${count(item.representative_cue.clause.sequence)}${
          item.representative_cue.clause.heading
            ? ` · ${item.representative_cue.clause.heading}`
            : ""
        } · ${item.representative_cue.rule_id} · observed support SHA-256 ${
          item.representative_cue.observed_evidence.sha256
        }`,
      ),
    );

    const fullEvidence = element("div");
    const actions = element("div", "result-actions");
    const inspectCues = element(
      "button",
      "button primary amendment-change-inspect-cues",
      "Inspect all bounded change cues",
    );
    inspectCues.type = "button";
    inspectCues.setAttribute("aria-expanded", "false");
    inspectCues.addEventListener("click", async () => {
      if (!state.token || inspectCues.disabled) return;
      inspectCues.disabled = true;
      fullEvidence.replaceChildren(
        element("p", "muted", "Loading the complete bounded cue packet…"),
      );
      try {
        const packet = await fetchAgreementChangeCues(
          item.agreement.agreement_id,
          state.token,
          AGREEMENT_CHANGE_CUE_LIMIT_MAX,
        );
        const cueList = element("div", "change-cue-full-list");
        for (const cue of packet.cues) {
          cueList.append(changeCueEvidenceDetails(cue));
        }
        fullEvidence.replaceChildren(
          element(
            "p",
            "focus-note",
            `${count(packet.coverage.returned_cue_count)} of ${
              count(packet.coverage.matched_cue_count)
            } bounded positive cue(s) revalidated from the current observed extraction. Cues do not establish the changed instrument, direction, relationship, or legal effect.`,
          ),
          cueList,
        );
        inspectCues.textContent = "Change cues loaded";
        inspectCues.setAttribute("aria-expanded", "true");
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          handleFailure(error, amendmentChangeStatus);
          return;
        }
        const requestSuffix = error instanceof ApiError && error.requestId
          ? ` Request ID: ${error.requestId}`
          : "";
        fullEvidence.replaceChildren(
          element(
            "p",
            "status error",
            `${
              error instanceof Error ? error.message : "The request failed."
            }${requestSuffix}`,
          ),
        );
        inspectCues.disabled = false;
      }
    });
    const inspectAgreement = element(
      "button",
      "text-button",
      "Inspect agreement →",
    );
    inspectAgreement.type = "button";
    inspectAgreement.addEventListener(
      "click",
      () => loadAgreement(item.agreement.agreement_id),
    );
    append(
      actions,
      inspectCues,
      inspectAgreement,
      sourceLink(item.source.source_url, "Open recorded source ↗"),
    );

    append(
      card,
      top,
      item.agreement.title_truncated
        ? element(
          "p",
          "muted",
          "Displayed observed title was source-truncated to 500 characters.",
        )
        : null,
      metadata,
      summaries,
      element(
        "p",
        "focus-note",
        `${count(item.coverage.matched_cue_count)} positive cue(s) across ${
          count(item.coverage.matching_clause_count)
        } matching clause(s). Counts reflect the selected filters and are not market prevalence or legal conclusions.`,
      ),
      evidence,
      actions,
      fullEvidence,
    );
    return card;
  }

  function renderAmendmentChangeDirectory(value) {
    const response = amendmentChangeDirectoryEvidence(record(value).data, {
      cueKeys: state.amendmentChangeCue ? [state.amendmentChangeCue] : [],
      sourceSlugs: state.amendmentChangeSource
        ? [state.amendmentChangeSource]
        : [],
      limit: state.amendmentChangeLimit,
      offset: state.amendmentChangeOffset,
    });
    if (response === null) {
      throw new ApiError(
        "The amendment change directory did not match its evidence disclosure contract.",
      );
    }
    state.amendmentChangeHasMore = response.page.has_more;
    amendmentChangePrevious.disabled = state.amendmentChangeOffset === 0;
    amendmentChangeNext.disabled = !state.amendmentChangeHasMore ||
      state.amendmentChangeOffset + state.amendmentChangeLimit >
        AMENDMENT_CHANGE_DIRECTORY_OFFSET_MAX;
    amendmentChangeResults.replaceChildren(
      ...(response.items.length
        ? response.items.map(amendmentChangeDirectoryCard)
        : [
          element(
            "p",
            "empty",
            "No published amendment with a positive supported cue matched this page. This is not evidence that change wording is absent.",
          ),
        ]),
    );
    const start = response.items.length ? state.amendmentChangeOffset + 1 : 0;
    const end = state.amendmentChangeOffset + response.items.length;
    amendmentChangeStatus.textContent = response.items.length
      ? `Showing amendment evidence ${start}–${end} of ${
        count(response.page.eligible_matching_amendments)
      } positive-match record(s). Ordering reflects cue coverage, not importance or market prevalence.`
      : response.page.eligible_matching_amendments > 0
      ? `No amendment appears at this offset; ${
        count(response.page.eligible_matching_amendments)
      } positive-match record(s) meet the selected filters.`
      : "No published amendment matched the selected deterministic cue filters. OCR and corpus coverage remain incomplete.";
  }

  async function performAmendmentChangeBrowse() {
    if (!state.token || state.amendmentChangeLoading) return;
    state.amendmentChangeLoading = true;
    state.amendmentChangeHasMore = false;
    amendmentChangeButton.disabled = true;
    amendmentChangePrevious.disabled = true;
    amendmentChangeNext.disabled = true;
    statusMessage(
      amendmentChangeStatus,
      "Finding publication-gated amendment records with exact change wording…",
    );
    try {
      const path = buildAmendmentChangeDirectoryPath({
        cueKeys: state.amendmentChangeCue ? [state.amendmentChangeCue] : [],
        sourceSlugs: state.amendmentChangeSource
          ? [state.amendmentChangeSource]
          : [],
        limit: state.amendmentChangeLimit,
        offset: state.amendmentChangeOffset,
      });
      renderAmendmentChangeDirectory(await requestJson(path, state.token));
    } catch (error) {
      handleFailure(error, amendmentChangeStatus);
    } finally {
      state.amendmentChangeLoading = false;
      amendmentChangeButton.disabled = false;
      amendmentChangePrevious.disabled = state.amendmentChangeOffset === 0;
      amendmentChangeNext.disabled = !state.amendmentChangeHasMore ||
        state.amendmentChangeOffset + state.amendmentChangeLimit >
          AMENDMENT_CHANGE_DIRECTORY_OFFSET_MAX;
    }
  }

  function renderPartyResultRows(rows) {
    partyResults.replaceChildren(
      ...(rows.length ? rows.map(partyResultCard) : [
        element(
          "p",
          "empty",
          "No published agreement matched that observed party name.",
        ),
      ]),
    );
    updateDecisionBriefComparisonControls();
  }

  function renderPartySearch(payload) {
    const root = record(payload);
    const rows = array(root.results).slice(0, state.partyLimit);
    const pagination = record(root.pagination);
    state.partyPageResults = rows;
    state.partyBriefCoverage = new Map();
    state.partyBriefShortlistExport = null;
    partyBriefShortlist.hidden = true;
    partyBriefShortlistResults.replaceChildren();
    downloadPartyBriefShortlistButton.disabled = true;
    partyBriefShortlistExportStatus.textContent = "";
    state.partyHasMore = pagination.has_more === true;
    partyPrevious.disabled = state.partyOffset === 0;
    partyNext.disabled = !state.partyHasMore;
    renderPartyResultRows(rows);
    const start = rows.length ? state.partyOffset + 1 : 0;
    const end = state.partyOffset + rows.length;
    const total = Number(pagination.total_matching_agreements);
    partySearchStatus.textContent = rows.length
      ? `Showing agreement records ${start}–${end}${
        Number.isSafeInteger(total) ? ` of ${total}` : ""
      }. Names are observations, not resolved entity identities or a complete portfolio.`
      : "No result returned. Party extraction and corpus coverage are incomplete.";
    const eligibleCount = rows.filter((value) => {
      const item = record(value);
      return UUID_PATTERN.test(item.agreement_id) &&
        DECISION_BRIEF_DOCUMENT_KINDS.has(item.document_kind);
    }).length;
    const canContainEligibleBriefs = rows.length > 0 &&
      (!state.partyKind || DECISION_BRIEF_DOCUMENT_KINDS.has(state.partyKind));
    partyBriefRankButton.disabled = !canContainEligibleBriefs;
    partyBriefRankStatus.className = "muted";
    partyBriefRankStatus.textContent = canContainEligibleBriefs
      ? `Fetch up to ${count(PARTY_DECISION_BRIEF_SCAN_MAX)} matching records and validate each eligible contract or amendment against the five tracked topics.${
        eligibleCount
          ? ` This page contains ${count(eligibleCount)} eligible record(s).`
          : " This page has no eligible record, but the bounded query set may."
      }`
      : "No visible contract or amendment record is eligible for a strict five-topic brief.";
  }

  async function rankPartyDecisionBriefCohort() {
    if (!state.token || state.partyBriefScanLoading) return;
    if (!state.partyQuery) return;

    const generation = state.partyBriefScanGeneration + 1;
    state.partyBriefScanGeneration = generation;
    state.partyBriefScanLoading = true;
    state.partyBriefCoverage = new Map();
    state.partyBriefShortlistExport = null;
    partyBriefShortlist.hidden = true;
    partyBriefShortlistResults.replaceChildren();
    downloadPartyBriefShortlistButton.disabled = true;
    partyBriefShortlistExportStatus.textContent = "";
    const token = state.token;
    const query = state.partyQuery;
    const kind = state.partyKind;
    const source = state.partySource;
    partyBriefRankButton.disabled = true;
    statusMessage(
      partyBriefRankStatus,
      `Loading up to ${count(PARTY_DECISION_BRIEF_SCAN_MAX)} matching records for bounded brief validation…`,
    );

    const coverage = [];
    const validatedBriefs = [];
    let failureCount = 0;
    let candidates = [];
    try {
      const partyPayload = await requestJson(
        buildPartySearchPath({
          query,
          kind,
          source,
          limit: PARTY_DECISION_BRIEF_SCAN_MAX,
          offset: 0,
        }),
        token,
      );
      if (
        state.token !== token ||
        state.partyBriefScanGeneration !== generation
      ) {
        return;
      }
      const payloadRoot = record(partyPayload);
      const scanRows = array(payloadRoot.results).slice(
        0,
        PARTY_DECISION_BRIEF_SCAN_MAX,
      );
      candidates = scanRows.filter((value) => {
        const item = record(value);
        return UUID_PATTERN.test(item.agreement_id) &&
          DECISION_BRIEF_DOCUMENT_KINDS.has(item.document_kind);
      });
      if (!candidates.length) {
        statusMessage(
          partyBriefRankStatus,
          "No contract or amendment in the bounded matching-record set is eligible for a strict five-topic brief.",
        );
        return;
      }
      statusMessage(
        partyBriefRankStatus,
        `Validating 0 of ${count(candidates.length)} eligible strict five-topic briefs…`,
      );

      for (
        let offset = 0;
        offset < candidates.length;
        offset += PARTY_DECISION_BRIEF_SCAN_CONCURRENCY
      ) {
        const batch = candidates.slice(
          offset,
          offset + PARTY_DECISION_BRIEF_SCAN_CONCURRENCY,
        );
        const settled = await Promise.allSettled(
          batch.map(async (itemValue) => {
            const item = record(itemValue);
            const agreementId = item.agreement_id;
            const brief = await fetchAgreementDecisionBrief(
              agreementId,
              token,
              PARTY_DECISION_BRIEF_SCAN_EXAMPLES,
            );
            const summary = partyDecisionBriefCoverage(brief, agreementId);
            if (summary === null) {
              throw new ApiError(
                "The strict brief could not be summarized safely.",
              );
            }
            return { brief, summary };
          }),
        );
        if (
          state.token !== token ||
          state.partyBriefScanGeneration !== generation
        ) {
          return;
        }
        const unauthorized = settled.find((outcome) =>
          outcome.status === "rejected" &&
          outcome.reason instanceof ApiError &&
          outcome.reason.status === 401
        );
        if (unauthorized) {
          signOut(
            "The token was not accepted or has changed. Enter the current explorer token.",
          );
          return;
        }
        for (const outcome of settled) {
          if (outcome.status === "fulfilled") {
            coverage.push(outcome.value.summary);
            validatedBriefs.push(outcome.value.brief);
          } else failureCount += 1;
        }
        statusMessage(
          partyBriefRankStatus,
          `Validated ${count(Math.min(offset + batch.length, candidates.length))} of ${
            count(candidates.length)
          } strict five-topic briefs…`,
        );
      }

      state.partyBriefCoverage = new Map(
        coverage.map((item) => [item.agreementId, item]),
      );
      renderPartyResultRows(state.partyPageResults);
      const shortlist = partyDecisionBriefShortlist(
        candidates,
        coverage,
      );
      partyBriefShortlistTitle.textContent = shortlist.length
        ? `Top ${count(shortlist.length)} evidence-bearing matching record(s)`
        : "No positive-match record in this bounded scan";
      partyBriefShortlistResults.replaceChildren(
        ...(shortlist.length
          ? shortlist.map(partyResultCard)
          : [
            element(
              "p",
              "empty",
              "No validated brief returned a positive match across the five tracked detector topics. This does not establish that the provisions or consequences are absent.",
            ),
          ]),
      );
      partyBriefShortlist.hidden = false;
      updateDecisionBriefComparisonControls();
      const positiveCount = coverage.filter((item) =>
        item.matchedTopicCount > 0
      ).length;
      const zeroCount = coverage.length - positiveCount;
      const pagination = record(payloadRoot.pagination);
      const total = Number(pagination.total_matching_agreements);
      const scanWasTruncated = pagination.has_more === true ||
        (Number.isSafeInteger(total) && total > scanRows.length);
      const totalMatchingRecords = Number.isSafeInteger(total) &&
          total >= scanRows.length
        ? total
        : null;
      state.partyBriefShortlistExport = shortlist.length
        ? buildPartyDecisionBriefShortlistExport({
          query,
          documentKind: kind,
          sourceSlug: source,
          matchingRecordCount: scanRows.length,
          totalMatchingRecords,
          matchingSetTruncated: scanWasTruncated,
          candidates,
          briefs: validatedBriefs,
        })
        : null;
      downloadPartyBriefShortlistButton.disabled =
        state.partyBriefShortlistExport === null;
      partyBriefShortlistExportStatus.textContent = shortlist.length
        ? "Sanitized evidence JSON is ready. It contains no bearer token or private Storage path."
        : "No positive-evidence brief is available to export.";
      statusMessage(
        partyBriefRankStatus,
        `Validated ${count(coverage.length)} eligible brief(s) across ${
          count(scanRows.length)
        } matching record(s): ${
          count(positiveCount)
        } with positive five-topic evidence and ${
          count(zeroCount)
        } with no positive match.${
          failureCount
            ? ` ${count(failureCount)} record(s) could not be validated and remain unranked.`
            : ""
        } ${
          scanWasTruncated
            ? `The query exceeds the ${count(PARTY_DECISION_BRIEF_SCAN_MAX)}-record scan bound, so this is not the whole matching set.`
            : "The full returned matching set fit inside the scan bound."
        } The shortlist is generated navigation, not entity resolution, a risk score, prevalence measure or finding of absence.`,
        failureCount ? "error" : "success",
      );
    } catch (error) {
      if (
        state.token === token &&
        state.partyBriefScanGeneration === generation
      ) {
        handleFailure(error, partyBriefRankStatus);
      }
    } finally {
      if (state.partyBriefScanGeneration === generation) {
        state.partyBriefScanLoading = false;
        partyBriefRankButton.disabled = !state.token || !state.partyQuery ||
          !candidates.length;
      }
    }
  }

  async function performPartySearch() {
    if (!state.token || state.partySearching) return;
    state.partyBriefScanGeneration += 1;
    state.partyBriefScanLoading = false;
    state.partyPageResults = [];
    state.partyBriefCoverage = new Map();
    state.partyBriefShortlistExport = null;
    state.partySearching = true;
    partyBriefShortlist.hidden = true;
    partyBriefShortlistResults.replaceChildren();
    downloadPartyBriefShortlistButton.disabled = true;
    partyBriefShortlistExportStatus.textContent = "";
    partySearchButton.disabled = true;
    partyBriefRankButton.disabled = true;
    partyPrevious.disabled = true;
    partyNext.disabled = true;
    partySearchStatus.textContent = "Searching published party observations…";
    partyBriefRankStatus.className = "muted";
    partyBriefRankStatus.textContent =
      "Waiting for matching records before building the bounded strict-brief shortlist.";
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

  function renderPartyDossier(payload) {
    const root = record(record(payload).data);
    const scope = record(root.party_scope);
    const coverage = record(root.coverage);
    const familyCoverage = partyDossierFamilyCoverage(root);
    if (familyCoverage === null) {
      throw new ApiError(
        "The party dossier response did not match its family-coverage contract.",
      );
    }
    const themes = array(root.theme_coverage).slice(0, 20);
    const sources = array(coverage.sources);
    partyDossierTitle.textContent = `Observed-party dossier · ${
      displayText(
        scope.query,
        scope.normalized_query,
      )
    }`;
    partyDossierSummary.replaceChildren(
      metric(
        "Document records",
        count(coverage.document_records),
        "Not unique relationships",
      ),
      metric(
        "Observed clauses",
        count(coverage.observed_clauses),
        "Current published evidence",
      ),
      metric("Theme groups", count(themes.length), "Generated/reviewed labels"),
      metric(
        "Party records",
        count(scope.matched_party_records),
        "Identity resolution not applied",
      ),
      metric(
        "Recorded family groups",
        count(familyCoverage.recordedFamilyGroups),
        `${count(familyCoverage.documentsWithFamily)} of ${
          count(familyCoverage.documentRecords)
        } documents keyed · largest ${
          count(familyCoverage.largestFamilyDocuments)
        } · not reviewed deals`,
      ),
      metric("Sources", count(sources.length), "Rights-gated source systems"),
    );
    partyDossierThemes.replaceChildren();
    if (!themes.length) {
      partyDossierThemes.append(
        element(
          "p",
          "empty",
          "No generated or reviewed clause themes were found for this exact observed name.",
        ),
      );
    }
    for (const themeValue of themes) {
      const theme = record(themeValue);
      const card = element("article", "result-card dossier-theme");
      const top = element("div", "result-top");
      const heading = element("div");
      append(
        heading,
        element("span", "badge basis-generated", "Generated theme label"),
        element(
          "h3",
          "",
          displayText(theme.theme, "unclassified").replaceAll("_", " "),
        ),
        element(
          "p",
          "muted tiny",
          `${count(theme.clause_matches)} matching clause tags across ${
            count(
              theme.document_records,
            )
          } document records · not a prevalence measure`,
        ),
      );
      top.append(
        heading,
        element(
          "span",
          "muted tiny",
          `Detector confidence ${displayText(theme.detector_confidence_min)}–${
            displayText(
              theme.detector_confidence_max,
            )
          }`,
        ),
      );
      card.append(top);
      if (typeof theme.quality_warning === "string") {
        card.append(element("p", "status warning", theme.quality_warning));
      }
      const examples = element("div", "dossier-examples");
      for (const exampleValue of array(theme.examples).slice(0, 3)) {
        const example = record(exampleValue);
        const exampleCard = element("article", "dossier-example");
        append(
          exampleCard,
          element("span", "badge basis-observed", "Observed source text"),
          element(
            "h4",
            "",
            displayText(
              example.clause_heading,
              example.observed_title || "Untitled clause",
            ),
          ),
          element(
            "p",
            "muted tiny",
            `${displayText(example.observed_title, "Untitled agreement")} · ${
              displayText(
                example.source_name,
                example.source_slug,
              )
            } · ${displayText(example.observed_party_role, "role not stated")}`,
          ),
          element(
            "p",
            "excerpt",
            boundedText(example.observed_text_excerpt, 2_000),
          ),
          element(
            "p",
            "muted tiny",
            `Clause SHA-256 ${
              displayText(
                example.observed_text_sha256,
              )
            } · artifact ${displayText(example.artifact_sha256)}${
              example.observed_text_excerpt_truncated
                ? " · excerpt truncated"
                : ""
            }`,
          ),
        );
        const actions = element("div", "result-actions");
        if (
          typeof example.agreement_id === "string" &&
          UUID_PATTERN.test(example.agreement_id) &&
          typeof example.clause_id === "string" &&
          UUID_PATTERN.test(example.clause_id)
        ) {
          const inspect = element(
            "button",
            "text-button",
            "Inspect clause in context →",
          );
          inspect.type = "button";
          inspect.addEventListener(
            "click",
            () => loadAgreement(example.agreement_id, example.clause_id),
          );
          actions.append(inspect);
        }
        append(actions, sourceLink(example.source_url));
        exampleCard.append(actions);
        examples.append(exampleCard);
      }
      card.append(examples);
      partyDossierThemes.append(card);
    }
    const familySummary = familyCoverage.recordedFamilyGroups > 0
      ? `${count(familyCoverage.documentRecords)} document records map to ${
        count(familyCoverage.recordedFamilyGroups)
      } recorded family group${
        familyCoverage.recordedFamilyGroups === 1 ? "" : "s"
      }; the largest contains ${
        count(familyCoverage.largestFamilyDocuments)
      } document${familyCoverage.largestFamilyDocuments === 1 ? "" : "s"}.`
      : `${
        count(familyCoverage.documentRecords)
      } document records have no recorded family grouping key.`;
    partyDossierStatus.textContent = scope.low_specificity_warning === true
      ? `${familySummary} This is a low-specificity observed name. Treat every result as ambiguous and inspect source evidence.`
      : `${familySummary} Family keys are unreviewed grouping hints, not unique deals. Identity resolution was not applied; theme counts are navigation aids, not market prevalence.`;
  }

  async function loadPartyDossier(partyName) {
    if (!state.token || state.partyDossierLoading) return;
    state.partyDossierLoading = true;
    partyDossierSection.hidden = false;
    partyDossierTitle.textContent = `Observed-party dossier · ${partyName}`;
    partyDossierStatus.textContent = "Building a bounded evidence dossier…";
    partyDossierSummary.replaceChildren();
    partyDossierThemes.replaceChildren(element("div", "result-card skeleton"));
    partyDossierSection.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      const path = buildPartyDossierPath({ party: partyName });
      renderPartyDossier(await requestJson(path, state.token));
    } catch (error) {
      partyDossierThemes.replaceChildren();
      handleFailure(error, partyDossierStatus);
    } finally {
      state.partyDossierLoading = false;
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
            displayText(
              item.observed_party_role,
              "role not stated",
            )
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
        displayText(
          item.clause_heading,
        )
      }`
      : `Clause ${displayText(item.clause_sequence)}`;
    const actions = element("div", "result-actions");
    const position = commercialPositionEvidence(item.commercial_position);
    const positionSummary = position?.applicable
      ? element("div", "result-position-summary")
      : null;
    if (positionSummary) {
      const signalLabels = position.signals.map((signal) =>
        displayText(record(signal).label, record(signal).signal_key)
      );
      const observedValues = position.signals
        .flatMap((signal) =>
          observedValueCandidateEntries(
            record(signal).observed_value_candidates,
          ).flatMap((entry) => entry.values)
        )
        .slice(0, 6);
      append(
        positionSummary,
        element("span", "badge generated", "Generated liability position"),
        element(
          "p",
          "",
          signalLabels.length
            ? `Matched: ${signalLabels.join(" · ")}`
            : position.reason === "position_cache_unavailable"
            ? "Position cache unavailable; inspect the clause for live analysis."
            : "No supported position rule matched this clause.",
        ),
        observedValues.length
          ? element(
            "p",
            "",
            `Observed cap-value candidates: ${observedValues.join(" · ")}`,
          )
          : null,
        element(
          "p",
          "muted",
          "Clause-only navigation signal. A non-match is not evidence of absence; inspect exact wording and context before reliance.",
        ),
      );
    }
    const terminationPosition = terminationPositionEvidence(
      item.termination_position,
    );
    const terminationSummary = terminationPosition?.applicable
      ? element("div", "result-position-summary")
      : null;
    if (terminationSummary) {
      const signalLabels = terminationPosition.signals.map((signal) =>
        displayText(record(signal).label, record(signal).signal_key)
      );
      const durations = terminationPosition.signals
        .flatMap((signal) =>
          observedDurationEntries(record(signal).observed_duration_candidates)
        )
        .slice(0, 6);
      append(
        terminationSummary,
        element("span", "badge generated", "Generated termination wording"),
        element(
          "p",
          "",
          signalLabels.length
            ? `Matched: ${signalLabels.join(" · ")}`
            : terminationPosition.reason === "position_cache_unavailable"
            ? "Termination cache unavailable; inspect the clause directly."
            : "No supported termination wording matched this clause.",
        ),
        durations.length
          ? element(
            "p",
            "",
            `Observed duration candidates: ${durations.join(" · ")}`,
          )
          : null,
        element(
          "p",
          "muted",
          "Clause-only navigation signal, not a determination of rights, triggers or legal effect.",
        ),
      );
    }
    const assignmentPosition = assignmentPositionEvidence(
      item.assignment_position,
    );
    const assignmentSummary = assignmentPosition?.applicable
      ? element("div", "result-position-summary")
      : null;
    if (assignmentSummary) {
      const signalLabels = assignmentPosition.signals.map((signal) => {
        const item = record(signal);
        return displayText(
          ASSIGNMENT_POSITION_SIGNALS[item.signal_key],
          item.label ?? item.signal_key,
        );
      });
      const presentAttributes = assignmentAttributeEntries(
        record(assignmentPosition.signals[0]).generated_attributes,
      )
        .filter((entry) => entry[1] === "Yes")
        .map((entry) => entry[0]);
      append(
        assignmentSummary,
        element(
          "span",
          "badge generated",
          "Generated assignment / control wording",
        ),
        element(
          "p",
          "",
          signalLabels.length
            ? `Matched: ${signalLabels.join(" · ")}`
            : "No supported assignment wording matched this clause.",
        ),
        presentAttributes.length
          ? element(
            "p",
            "",
            `Same support also contains: ${presentAttributes.join(" · ")}`,
          )
          : null,
        element(
          "p",
          "muted",
          "Detector-support navigation signal; not a determination of party entitlement, consent effectiveness, transaction consequence, or legal effect.",
        ),
      );
    }
    const governingLawPosition = governingLawPositionEvidence(
      item.governing_law_position,
    );
    const governingLawSummary = governingLawPosition?.applicable
      ? element("div", "result-position-summary")
      : null;
    if (governingLawSummary) {
      const signalLabels = governingLawPosition.signals.map((signal) => {
        const item = record(signal);
        return displayText(
          GOVERNING_LAW_POSITION_SIGNALS[item.signal_key],
          item.label ?? item.signal_key,
        );
      });
      append(
        governingLawSummary,
        element(
          "span",
          "badge generated",
          "Generated governing-law / forum wording",
        ),
        element(
          "p",
          "",
          signalLabels.length
            ? `Matched: ${signalLabels.join(" · ")}`
            : "No supported governing-law or forum wording matched this clause.",
        ),
        element(
          "p",
          "muted",
          "Detector-support navigation signal; jurisdiction is not normalized and enforceability, conflicts rules, arbitration interaction and amendments require review.",
        ),
      );
    }
    const indemnityPosition = indemnityPositionEvidence(
      item.indemnity_position,
    );
    const indemnitySummary = indemnityPosition?.applicable
      ? element("div", "result-position-summary")
      : null;
    if (indemnitySummary) {
      const signalLabels = indemnityPosition.signals.map((signal) => {
        const item = record(signal);
        return displayText(
          INDEMNITY_POSITION_SIGNALS[item.signal_key],
          item.label ?? item.signal_key,
        );
      });
      append(
        indemnitySummary,
        element("span", "badge generated", "Generated indemnity wording"),
        element(
          "p",
          "",
          signalLabels.length
            ? `Matched: ${signalLabels.join(" · ")}`
            : "No supported indemnity wording matched this bounded window.",
        ),
        element(
          "p",
          "muted",
          "Detector-support navigation signal; party entitlement, claim coverage, cap interaction and enforceability require review.",
        ),
      );
    }
    const agreementId = typeof item.agreement_id === "string"
      ? item.agreement_id
      : "";
    const clauseId =
      typeof item.clause_id === "string" && UUID_PATTERN.test(item.clause_id)
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
      positionSummary,
      terminationSummary,
      assignmentSummary,
      governingLawSummary,
      indemnitySummary,
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
          state.resultMode === "positions"
            ? "No published liability-position evidence matched these filters."
            : state.resultMode === "termination_positions"
            ? "No published termination-position evidence matched these filters."
            : state.resultMode === "assignment_positions"
            ? "No published assignment/change-of-control evidence matched these filters."
            : state.resultMode === "governing_law_positions"
            ? "No published governing-law/forum evidence matched these filters."
            : state.resultMode === "indemnity_positions"
            ? "No published indemnity-position evidence matched these filters."
            : "No published clause evidence matched this query.",
        ),
      ]),
    );
    const start = rows.length ? state.offset + 1 : 0;
    const end = state.offset + rows.length;
    if (state.resultMode === "positions") {
      searchStatus.textContent = rows.length
        ? `Showing position evidence ${start}–${end}. Generated matches are not market prevalence or legal conclusions.`
        : "No position evidence returned. Detector and corpus coverage may be incomplete.";
      positionStatus.textContent = rows.length
        ? `${rows.length} bounded position result${
          rows.length === 1 ? "" : "s"
        } loaded below.`
        : "No position evidence matched these filters.";
    } else if (state.resultMode === "termination_positions") {
      searchStatus.textContent = rows.length
        ? `Showing termination evidence ${start}–${end}. Generated wording matches are not determinations of rights, triggers or legal effect.`
        : "No termination evidence returned. Detector and corpus coverage may be incomplete.";
      terminationStatus.textContent = rows.length
        ? `${rows.length} bounded termination result${
          rows.length === 1 ? "" : "s"
        } loaded below.`
        : "No termination wording matched these filters.";
    } else if (state.resultMode === "assignment_positions") {
      searchStatus.textContent = rows.length
        ? `Showing assignment/change-of-control evidence ${start}–${end}. Generated wording matches do not determine party entitlement, consent effectiveness, or legal effect.`
        : "No assignment/change-of-control evidence returned. Detector and corpus coverage may be incomplete.";
      assignmentStatus.textContent = rows.length
        ? `${rows.length} bounded assignment result${
          rows.length === 1 ? "" : "s"
        } loaded below.`
        : "No assignment/change-of-control wording matched these filters.";
    } else if (state.resultMode === "governing_law_positions") {
      searchStatus.textContent = rows.length
        ? `Showing governing-law/forum evidence ${start}–${end}. Generated wording matches do not normalize a jurisdiction or determine enforceability.`
        : "No governing-law/forum evidence returned. Detector and corpus coverage may be incomplete.";
      governingLawStatus.textContent = rows.length
        ? `${rows.length} bounded governing-law result${
          rows.length === 1 ? "" : "s"
        } loaded below.`
        : "No governing-law or forum wording matched these filters.";
    } else if (state.resultMode === "indemnity_positions") {
      searchStatus.textContent = rows.length
        ? `Showing indemnity evidence ${start}–${end}. Generated wording matches do not determine party entitlement, claim coverage, cap interaction or enforceability.`
        : "No indemnity evidence returned. Detector and corpus coverage may be incomplete.";
      indemnityStatus.textContent = rows.length
        ? `${rows.length} bounded indemnity result${
          rows.length === 1 ? "" : "s"
        } loaded below.`
        : "No indemnity wording matched these filters.";
    } else {
      searchStatus.textContent = rows.length
        ? `Showing results ${start}–${end}${
          state.clauseParty
            ? ` within agreements matching observed party “${state.clauseParty}”`
            : ""
        }. Search is evidence retrieval, not entity resolution or a completeness guarantee.`
        : "No results returned. Clause, party and corpus coverage may be incomplete.";
    }
    updateComparisonControls();
  }

  async function performSearch() {
    if (
      !state.token ||
      state.searching ||
      state.positionLoading ||
      state.terminationLoading ||
      state.assignmentLoading ||
      state.governingLawLoading ||
      state.indemnityLoading
    ) {
      return;
    }
    state.searching = true;
    searchButton.disabled = true;
    positionButton.disabled = true;
    terminationButton.disabled = true;
    assignmentButton.disabled = true;
    governingLawButton.disabled = true;
    indemnityButton.disabled = true;
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
      positionButton.disabled = false;
      terminationButton.disabled = false;
      assignmentButton.disabled = false;
      governingLawButton.disabled = false;
      indemnityButton.disabled = false;
    }
  }

  async function performPositionBrowse() {
    if (
      !state.token ||
      state.searching ||
      state.positionLoading ||
      state.terminationLoading ||
      state.assignmentLoading ||
      state.governingLawLoading ||
      state.indemnityLoading
    ) {
      return;
    }
    state.positionLoading = true;
    searchButton.disabled = true;
    positionButton.disabled = true;
    terminationButton.disabled = true;
    assignmentButton.disabled = true;
    governingLawButton.disabled = true;
    indemnityButton.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    searchStatus.textContent = "Loading published liability positions…";
    positionStatus.textContent = "Applying evidence filters…";
    try {
      const path = buildLiabilityPositionPath({
        signalKeys: state.positionSignal ? [state.positionSignal] : [],
        valueCategories: state.positionValue ? [state.positionValue] : [],
        featureKeys: state.positionFeature ? [state.positionFeature] : [],
        kind: state.positionKind,
        source: state.positionSource,
        limit: state.limit,
        offset: state.offset,
      });
      renderSearch(await requestJson(path, state.token));
    } catch (error) {
      handleFailure(error, positionStatus);
    } finally {
      state.positionLoading = false;
      searchButton.disabled = false;
      positionButton.disabled = false;
      terminationButton.disabled = false;
      assignmentButton.disabled = false;
      governingLawButton.disabled = false;
      indemnityButton.disabled = false;
    }
  }

  async function performTerminationBrowse() {
    if (
      !state.token ||
      state.searching ||
      state.positionLoading ||
      state.terminationLoading ||
      state.assignmentLoading ||
      state.governingLawLoading ||
      state.indemnityLoading
    ) {
      return;
    }
    state.terminationLoading = true;
    searchButton.disabled = true;
    positionButton.disabled = true;
    terminationButton.disabled = true;
    assignmentButton.disabled = true;
    governingLawButton.disabled = true;
    indemnityButton.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    searchStatus.textContent = "Loading published termination wording…";
    terminationStatus.textContent = "Applying evidence filters…";
    try {
      const path = buildTerminationPositionPath({
        signalKeys: state.terminationSignal ? [state.terminationSignal] : [],
        hasDuration: state.terminationDuration === "present",
        hasLocalTerminationLink: state.terminationLinkage === "local",
        kind: state.terminationKind,
        source: state.terminationSource,
        limit: state.limit,
        offset: state.offset,
      });
      renderSearch(await requestJson(path, state.token));
    } catch (error) {
      handleFailure(error, terminationStatus);
    } finally {
      state.terminationLoading = false;
      searchButton.disabled = false;
      positionButton.disabled = false;
      terminationButton.disabled = false;
      assignmentButton.disabled = false;
      governingLawButton.disabled = false;
      indemnityButton.disabled = false;
    }
  }

  async function performAssignmentBrowse() {
    if (
      !state.token ||
      state.searching ||
      state.positionLoading ||
      state.terminationLoading ||
      state.assignmentLoading ||
      state.governingLawLoading ||
      state.indemnityLoading
    ) {
      return;
    }
    state.assignmentLoading = true;
    searchButton.disabled = true;
    positionButton.disabled = true;
    terminationButton.disabled = true;
    assignmentButton.disabled = true;
    governingLawButton.disabled = true;
    indemnityButton.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    searchStatus.textContent =
      "Loading published assignment/change-of-control wording…";
    assignmentStatus.textContent = "Applying evidence filters…";
    try {
      const path = buildAssignmentPositionPath({
        signalKeys: state.assignmentSignal ? [state.assignmentSignal] : [],
        context: state.assignmentContext,
        kind: state.assignmentKind,
        source: state.assignmentSource,
        limit: state.limit,
        offset: state.offset,
      });
      renderSearch(await requestJson(path, state.token));
    } catch (error) {
      handleFailure(error, assignmentStatus);
    } finally {
      state.assignmentLoading = false;
      searchButton.disabled = false;
      positionButton.disabled = false;
      terminationButton.disabled = false;
      assignmentButton.disabled = false;
      governingLawButton.disabled = false;
      indemnityButton.disabled = false;
    }
  }

  async function performGoverningLawBrowse() {
    if (
      !state.token ||
      state.searching ||
      state.positionLoading ||
      state.terminationLoading ||
      state.assignmentLoading ||
      state.governingLawLoading ||
      state.indemnityLoading
    ) {
      return;
    }
    state.governingLawLoading = true;
    searchButton.disabled = true;
    positionButton.disabled = true;
    terminationButton.disabled = true;
    assignmentButton.disabled = true;
    governingLawButton.disabled = true;
    indemnityButton.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    searchStatus.textContent =
      "Loading published governing-law and forum wording…";
    governingLawStatus.textContent = "Applying evidence filters…";
    try {
      const path = buildGoverningLawPositionPath({
        signalKeys: state.governingLawSignal ? [state.governingLawSignal] : [],
        kind: state.governingLawKind,
        source: state.governingLawSource,
        limit: state.limit,
        offset: state.offset,
      });
      renderSearch(await requestJson(path, state.token));
    } catch (error) {
      handleFailure(error, governingLawStatus);
    } finally {
      state.governingLawLoading = false;
      searchButton.disabled = false;
      positionButton.disabled = false;
      terminationButton.disabled = false;
      assignmentButton.disabled = false;
      governingLawButton.disabled = false;
      indemnityButton.disabled = false;
    }
  }

  async function performIndemnityBrowse() {
    if (
      !state.token ||
      state.searching ||
      state.positionLoading ||
      state.terminationLoading ||
      state.assignmentLoading ||
      state.governingLawLoading ||
      state.indemnityLoading
    ) {
      return;
    }
    state.indemnityLoading = true;
    searchButton.disabled = true;
    positionButton.disabled = true;
    terminationButton.disabled = true;
    assignmentButton.disabled = true;
    governingLawButton.disabled = true;
    indemnityButton.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    searchStatus.textContent = "Loading published indemnity wording…";
    indemnityStatus.textContent = "Applying evidence filters…";
    try {
      const path = buildIndemnityPositionPath({
        signalKeys: state.indemnitySignal ? [state.indemnitySignal] : [],
        kind: state.indemnityKind,
        source: state.indemnitySource,
        limit: state.limit,
        offset: state.offset,
      });
      renderSearch(await requestJson(path, state.token));
    } catch (error) {
      handleFailure(error, indemnityStatus);
    } finally {
      state.indemnityLoading = false;
      searchButton.disabled = false;
      positionButton.disabled = false;
      terminationButton.disabled = false;
      assignmentButton.disabled = false;
      governingLawButton.disabled = false;
      indemnityButton.disabled = false;
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
            displayText(
              item.evidence_location,
              "location unavailable",
            )
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

  function decisionBriefAttributeLabel(key) {
    return key.replaceAll("_", " ").replace(
      /^./u,
      (character) => character.toUpperCase(),
    );
  }

  function decisionBriefObservedCandidates(example) {
    const evidence = example.observed_evidence;
    const values = observedValueCandidateEntries(
      evidence.observed_value_candidates,
    );
    const durations = observedDurationEntries(
      evidence.observed_duration_candidates,
    );
    if (!values.length && !durations.length) return null;
    const container = element("div", "position-values");
    append(
      container,
      element(
        "strong",
        "",
        values.length
          ? "Observed lexical value candidates"
          : "Observed duration candidates",
      ),
      element(
        "p",
        "muted",
        "Exact tokens from the bounded support; they are not normalized amounts, deadlines, interpreted caps, or legal conclusions.",
      ),
    );
    if (values.length) {
      container.append(
        dataList(
          values.map((entry) => [entry.label, entry.values.join(" · ")]),
        ),
      );
    }
    if (durations.length) {
      container.append(
        dataList([["Duration wording", durations.join(" · ")]]),
      );
    }
    return container;
  }

  function decisionBriefDateRows(agreement) {
    const labels = {
      execution: "execution",
      effective: "effective",
      termination: "termination",
    };
    const rows = [];
    for (const [dateType, label] of Object.entries(labels)) {
      const value = agreement[`observed_${dateType}_date`];
      if (value === null) {
        rows.push([
          `${label[0].toUpperCase()}${label.slice(1)} date`,
          "Not stated",
        ]);
        continue;
      }
      const presentation = agreementDatePresentation(
        agreement,
        dateType,
        `${label} date`,
      );
      const selection = agreement.agreement_date_selections[dateType];
      if (!selection) {
        rows.push([presentation.label, presentation.value]);
        continue;
      }
      rows.push(
        [presentation.label, presentation.value],
        [
          `Generated ${label}-date provenance`,
          `Selected from observed text · rule ${selection.rule_id} · evidence ${selection.evidence_id}`,
        ],
      );
    }
    return rows;
  }

  function decisionBriefMarkedEvidence(example, className) {
    const evidence = example.observed_evidence;
    const characters = Array.from(evidence.excerpt);
    const start = evidence.matched_clause_char_start -
      evidence.clause_char_start;
    const end = evidence.matched_clause_char_end - evidence.clause_char_start;
    const container = element("p", className);
    container.append(
      document.createTextNode(characters.slice(0, start).join("")),
      element("mark", "", characters.slice(start, end).join("")),
      document.createTextNode(characters.slice(end).join("")),
    );
    return container;
  }

  function decisionBriefExampleCard(example, agreementId) {
    const evidence = example.observed_evidence;
    const generated = example.generated_signal;
    const card = element("article", "decision-brief-example");
    append(
      card,
      element("span", "badge basis-observed", "Observed source text"),
      element(
        "h4",
        "",
        example.clause_heading
          ? `Clause ${example.clause_ordinal} · ${example.clause_heading}`
          : `Clause ${example.clause_ordinal}`,
      ),
      element(
        "p",
        "muted",
        formatEvidenceLocation({
          page_start: example.page_start,
          page_end: example.page_end,
          char_start: example.clause_char_start,
          char_end: example.clause_char_end,
        }),
      ),
    );

    const observedPanel = element("section", "decision-brief-evidence");
    append(
      observedPanel,
      element("strong", "", "Bounded observed support excerpt"),
      decisionBriefMarkedEvidence(
        example,
        "observed-text decision-brief-marked-evidence",
      ),
      dataList([
        ["Exact detector match", evidence.matched_text],
        [
          "Support offsets in clause",
          `${evidence.clause_char_start}–${evidence.clause_char_end}`,
        ],
        [
          "Match offsets in clause",
          `${evidence.matched_clause_char_start}–${evidence.matched_clause_char_end}`,
        ],
        [
          "Support SHA-256",
          evidence.sha256,
        ],
        ["Matched-text SHA-256", evidence.matched_text_sha256],
      ]),
    );
    const candidates = decisionBriefObservedCandidates(example);
    if (candidates) observedPanel.append(candidates);
    const source = sourceLink(example.source_url, "Open recorded source ↗");
    if (source) observedPanel.append(source);
    const inspect = element(
      "button",
      "text-button",
      "Inspect clause in agreement context →",
    );
    inspect.type = "button";
    inspect.addEventListener("click", () => {
      closeDialog(decisionBriefDialog);
      loadAgreement(agreementId, example.clause_id);
    });
    observedPanel.append(inspect);
    card.append(observedPanel);

    const signalPanel = element("section", "decision-brief-signal");
    append(
      signalPanel,
      element(
        "span",
        "badge basis-generated",
        "Generated detector signal · not source wording",
      ),
      element("h4", "", generated.label),
      element(
        "p",
        "muted",
        `Representative rule ${generated.rule_id} · confidence ${
          Math.round(generated.confidence * 100)
        }% · detector ${generated.detector_version}`,
      ),
      element(
        "p",
        "muted",
        `${example.matched_signal_count} generated signal(s) matched this clause: ${
          example.signal_keys.join(" · ")
        }. Only one representative signal is expanded here.`,
      ),
    );
    const attributes = Object.entries(generated.attributes);
    if (attributes.length) {
      const attributeList = element(
        "div",
        "decision-brief-attributes",
      );
      for (const [key, detected] of attributes) {
        attributeList.append(
          element(
            "span",
            "decision-brief-attribute",
            `${decisionBriefAttributeLabel(key)}: ${
              detected ? "detected" : "not detected in this support"
            }`,
          ),
        );
      }
      signalPanel.append(attributeList);
    }
    signalPanel.append(
      element(
        "p",
        "muted",
        "Generated attributes describe this bounded support only. They do not determine a party’s rights, risk, enforceability, or legal effect.",
      ),
    );
    card.append(signalPanel);
    return card;
  }

  function renderAgreementDecisionBrief(brief) {
    const agreement = brief.agreement;
    const source = brief.source;
    const fragment = document.createDocumentFragment();
    fragment.append(
      element(
        "p",
        "decision-brief-boundary",
        "Decision boundary: this brief reports positive deterministic wording matches only. Zero matches are not evidence that a position is absent. It provides no risk score, does not infer party rights, and does not determine legal effect. Read the complete agreement, definitions, exceptions, amendments, and related documents before reliance.",
      ),
    );

    const overview = element("div", "decision-brief-overview");
    const agreementPanel = element("section");
    append(
      agreementPanel,
      element("span", "badge", "Agreement and extraction provenance"),
      element(
        "span",
        "badge basis-observed",
        "Observed title · date-selection basis shown below",
      ),
      element(
        "h2",
        "",
        displayText(agreement.title, "Untitled agreement"),
      ),
      dataList([
        ["Agreement ID", agreement.agreement_id],
        ["Recorded family key", displayText(agreement.family_key, "Not set")],
        ...decisionBriefDateRows(agreement),
        ["Published", date(agreement.published_at)],
        ["Current observed clauses", count(agreement.clause_count)],
        ["Current extraction ID", agreement.extraction_id],
        [
          "Extraction",
          `${agreement.extraction_method} · ${agreement.extraction_version} · confidence ${
            displayText(agreement.extraction_confidence, "not stated")
          }`,
        ],
        ["Extraction text basis", "Observed source text"],
        ["Artifact SHA-256", agreement.artifact_sha256],
        ["Extracted-text SHA-256", agreement.extracted_text_sha256],
      ]),
    );
    if (Object.keys(agreement.agreement_date_selections).length) {
      agreementPanel.append(
        element(
          "p",
          "generated",
          "Generated date candidates were selected deterministically from observed text evidence. They are not independently verified date facts; inspect the complete agreement before relying on them.",
        ),
      );
    }
    const classification = element(
      "section",
      agreement.document_kind_basis === "generated" ? "generated" : "",
    );
    append(
      classification,
      element(
        "span",
        `badge ${
          agreement.document_kind_basis === "generated"
            ? "basis-generated"
            : agreement.document_kind_basis === "reviewed"
            ? "basis-reviewed"
            : "basis-observed"
        }`,
        documentKindBasisLabel(agreement.document_kind_basis),
      ),
      element(
        "p",
        "",
        `Recorded document class: ${agreement.document_kind}. Classification metadata is not contract wording or a determination of legal effect.`,
      ),
    );
    agreementPanel.append(classification);
    const sourcePanel = element("section");
    append(
      sourcePanel,
      element("span", "badge basis-observed", "Recorded public source"),
      element(
        "span",
        "badge basis-generated",
        "Configured publication and redistribution gates passed",
      ),
      element("h3", "", source.name),
      dataList([
        ["Publisher", displayText(source.publisher, "Not stated")],
        ["Source slug", source.slug],
        ["External ID", source.external_id],
        [
          "Observed publication time",
          source.observed_published_at
            ? date(source.observed_published_at)
            : "Not stated",
        ],
        ["Publication gate", "Passed"],
        ["Redistribution gate", "Passed"],
      ]),
      element(
        "p",
        "muted",
        "These are configured operational gates, not human review, legal clearance, or a source-licence opinion.",
      ),
    );
    append(
      sourcePanel,
      sourceLink(source.source_url, "Open recorded source ↗"),
      sourceLink(source.observed_terms_url, "Open recorded source-use terms ↗"),
    );
    overview.append(agreementPanel, sourcePanel);
    fragment.append(overview);

    const topics = element("section", "decision-brief-topics");
    topics.setAttribute("aria-label", "Five contract wording topics");
    for (const topic of brief.topics) {
      const topicCard = element("article", "decision-brief-topic");
      const header = element("div", "decision-brief-topic-header");
      const heading = element("div");
      append(
        heading,
        element("span", "badge basis-generated", "Generated topic detector"),
        element("h3", "", topic.label),
        element("p", "muted", `Version ${topic.detector_version}`),
      );
      const counts = element("div", "decision-brief-counts");
      append(
        counts,
        element("strong", "", count(topic.exact_matching_clause_count)),
        element("span", "", "exact matching clauses"),
      );
      header.append(heading, counts);
      append(
        topicCard,
        header,
        element(
          "p",
          "muted",
          `${
            count(topic.total_signal_matches)
          } total generated signal match(es) across ${
            count(topic.total_matches)
          } matching clause(s); showing ${
            count(topic.returned_examples)
          } bounded example(s)${
            topic.examples_truncated ? " from a truncated example set" : ""
          }.`,
        ),
      );
      if (!topic.examples.length) {
        topicCard.append(
          element(
            "p",
            "focus-note",
            "No positive deterministic match was returned for this topic. This does not establish that the agreement lacks the provision, position, exception, or consequence.",
          ),
        );
      } else {
        for (const example of topic.examples) {
          topicCard.append(
            decisionBriefExampleCard(example, agreement.agreement_id),
          );
        }
      }
      topics.append(topicCard);
    }
    fragment.append(topics);

    const limitations = element("section", "decision-brief-limitations");
    append(limitations, element("h3", "", "Limits to this brief"));
    const list = element("ul");
    for (const limitation of brief.limitations) {
      list.append(element("li", "", limitation));
    }
    limitations.append(list);
    fragment.append(limitations);
    decisionBriefBody.replaceChildren(fragment);
    decisionBriefStatus.textContent =
      "Brief loaded from the current publication-gated observed extraction.";
    downloadDecisionBriefButton.disabled = false;
  }

  async function fetchAgreementDecisionBrief(
    agreementId,
    token,
    examplesPerTopic = AGREEMENT_DECISION_BRIEF_EXAMPLES_DEFAULT,
  ) {
    const payload = await requestJson(
      buildAgreementDecisionBriefPath(
        agreementId,
        examplesPerTopic,
      ),
      token,
    );
    const brief = agreementDecisionBriefEvidence(
      record(payload).data,
      agreementId,
      examplesPerTopic,
    );
    if (brief === null) {
      throw new ApiError(
        "The decision brief did not match its evidence disclosure contract.",
      );
    }
    return brief;
  }

  async function fetchAgreementChangeCues(
    agreementId,
    token,
    limit = AGREEMENT_CHANGE_CUE_LIMIT_DEFAULT,
  ) {
    const payload = await requestJson(
      buildAgreementChangeCuePath(agreementId, limit),
      token,
    );
    const cues = agreementChangeCueEvidence(
      record(payload).data,
      agreementId,
      limit,
    );
    if (cues === null) {
      throw new ApiError(
        "The change-cue packet did not match its evidence disclosure contract.",
      );
    }
    return cues;
  }

  function decisionBriefComparisonTopicCell(brief, topic) {
    const cell = element("td");
    append(
      cell,
      element(
        "p",
        "muted",
        `${count(topic.total_matches)} matching clause(s) · ${
          count(topic.total_signal_matches)
        } positive signal(s)`,
      ),
    );
    const {
      primaryExample,
      additionalExamples,
      omittedMatchingClauseCount,
    } = decisionBriefComparisonExamples(topic);
    if (!primaryExample) {
      cell.append(
        element(
          "p",
          "focus-note",
          "No positive deterministic match. This is not evidence of absence.",
        ),
      );
      return cell;
    }
    cell.append(
      decisionBriefComparisonEvidenceBlock(
        brief,
        primaryExample,
        "Representative evidence",
      ),
    );
    if (additionalExamples.length) {
      const details = element("details", "brief-comparison-more");
      details.append(
        element(
          "summary",
          "",
          `Show ${count(additionalExamples.length)} additional validated example${
            additionalExamples.length === 1 ? "" : "s"
          }`,
        ),
        element(
          "p",
          "muted tiny",
          omittedMatchingClauseCount > 0
            ? `${count(topic.returned_examples)} of ${
              count(topic.total_matches)
            } matching clauses are returned by the bounded evidence endpoint; ${
              count(omittedMatchingClauseCount)
            } additional matching clause(s) are not included.`
            : "These are the remaining examples returned by the bounded evidence endpoint.",
        ),
      );
      const list = element("div", "brief-comparison-more-list");
      for (let index = 0; index < additionalExamples.length; index += 1) {
        list.append(
          decisionBriefComparisonEvidenceBlock(
            brief,
            additionalExamples[index],
            `Additional evidence ${count(index + 1)}`,
          ),
        );
      }
      details.append(list);
      cell.append(details);
    }
    return cell;
  }

  function decisionBriefComparisonEvidenceBlock(brief, example, label) {
    const container = element("div", "brief-comparison-example");
    append(
      container,
      element("p", "muted tiny", label),
      element(
        "span",
        "badge basis-generated",
        example.generated_signal.label,
      ),
      element(
        "p",
        "muted",
        `Exact detector match: “${example.observed_evidence.matched_text}”`,
      ),
      decisionBriefComparisonMarkedEvidence(example),
      element(
        "p",
        "muted tiny",
        `${count(example.matched_signal_count)} generated signal(s) on clause ${
          example.clause_ordinal
        }${
          example.clause_heading ? ` · ${example.clause_heading}` : ""
        } · observed support SHA-256 ${example.observed_evidence.sha256}`,
      ),
    );
    const inspect = element("button", "text-button", "Inspect exact clause →");
    inspect.type = "button";
    inspect.addEventListener("click", () => {
      closeDialog(decisionBriefComparisonDialog);
      loadAgreement(brief.agreement.agreement_id, example.clause_id);
    });
    container.append(inspect);
    return container;
  }

  function decisionBriefComparisonMarkedEvidence(example) {
    return decisionBriefMarkedEvidence(
      example,
      "brief-comparison-evidence",
    );
  }

  function renderDecisionBriefComparison(
    comparison,
    selectionContext = null,
    changeCuePackets = [],
  ) {
    const briefs = comparison.decision_briefs;
    const fragment = document.createDocumentFragment();
    if (selectionContext?.basis === "generated_family_candidate") {
      const review = record(selectionContext.human_review);
      append(
        fragment,
        element(
          "section",
          "decision-brief-boundary family-proposal-comparison-boundary",
          "Proposal-only lifecycle investigation: this pair came from a generated same-family candidate. It is not a recorded relationship, and document order or dates do not establish amendment direction, supersession, incorporation, or legal effect.",
        ),
        element(
          "p",
          "muted tiny",
          `Candidate ${selectionContext.candidate_id} · ${
            familyReviewStatusLabel(review.status, review.conflicting)
          } · ${count(review.current_decision_count)} current review response(s).`,
        ),
      );
    }
    append(
      fragment,
      element(
        "p",
        "decision-brief-boundary",
        "Decision boundary: compare positive deterministic wording evidence, not scores. Raw match counts are not normalized for document length or detector opportunity. A zero does not establish absence, and the selected agreements are not a market sample.",
      ),
    );

    const scroll = element("div", "brief-comparison-scroll");
    const table = element("table", "brief-comparison-table");
    const head = element("thead");
    const headRow = element("tr");
    const topicHeading = element("th", "", "Topic");
    topicHeading.setAttribute("scope", "col");
    headRow.append(topicHeading);
    for (const brief of briefs) {
      const header = element("th");
      header.setAttribute("scope", "col");
      append(
        header,
        element(
          "h3",
          "",
          displayText(brief.agreement.title, "Untitled agreement"),
        ),
        element(
          "p",
          "muted",
          `${brief.source.name} · ${brief.agreement.document_kind}`,
        ),
      );
      const recordedDates = [
        brief.source.observed_published_at
          ? `Observed source publication ${date(brief.source.observed_published_at)}`
          : null,
        ...[
          ["execution", "execution date"],
          ["effective", "effective date"],
          ["termination", "termination date"],
        ].map(([dateType, label]) => {
          const presentation = agreementDatePresentation(
            brief.agreement,
            dateType,
            label,
          );
          return presentation.value
            ? `${presentation.label} ${presentation.value}`
            : null;
        }),
      ].filter(Boolean);
      if (recordedDates.length) {
        header.append(
          element(
            "p",
            "muted tiny",
            `Recorded date evidence: ${recordedDates.join(" · ")}`,
          ),
        );
      }
      const actions = element("div", "result-actions");
      const open = element("button", "text-button", "Open full brief →");
      open.type = "button";
      open.addEventListener("click", () => {
        closeDialog(decisionBriefComparisonDialog);
        loadAgreementDecisionBrief(brief.agreement.agreement_id);
      });
      append(actions, open, sourceLink(brief.source.source_url));
      header.append(actions);
      headRow.append(header);
    }
    head.append(headRow);
    table.append(head);

    const body = element("tbody");
    for (
      let topicIndex = 0;
      topicIndex < AGREEMENT_DECISION_BRIEF_TOPICS.length;
      topicIndex += 1
    ) {
      const row = element("tr");
      const expectedTopic = AGREEMENT_DECISION_BRIEF_TOPICS[topicIndex];
      const heading = element("th", "", expectedTopic.label);
      heading.setAttribute("scope", "row");
      row.append(heading);
      for (const brief of briefs) {
        row.append(
          decisionBriefComparisonTopicCell(brief, brief.topics[topicIndex]),
        );
      }
      body.append(row);
    }
    table.append(body);
    scroll.append(table);
    fragment.append(scroll);

    if (changeCuePackets.length) {
      append(
        fragment,
        element("h3", "", "Observed document-change cues"),
        element(
          "p",
          "decision-brief-boundary",
          "These generated labels point to exact amendment-mechanics wording. They do not identify the changed instrument, establish which document changes which, or determine incorporation, supersession or legal effect.",
        ),
      );
      const cueGrid = element("div", "comparison-grid change-cue-grid");
      cueGrid.tabIndex = 0;
      cueGrid.setAttribute(
        "aria-label",
        "Side-by-side observed document-change cues",
      );
      for (const packet of changeCuePackets) {
        const column = element("section", "comparison-column change-cue-column");
        append(
          column,
          element(
            "h4",
            "",
            displayText(packet.agreement.title, "Untitled agreement"),
          ),
          element(
            "p",
            "muted",
            `${count(packet.coverage.returned_cue_count)} of ${
              count(packet.coverage.matched_cue_count)
            } positive cue(s) shown across ${
              count(packet.coverage.matching_clause_count)
            } clause(s).`,
          ),
        );
        if (!packet.cues.length) {
          column.append(
            element(
              "p",
              "focus-note",
              "No supported document-change wording matched. This is not evidence that the document makes no changes.",
            ),
          );
        }
        for (const cue of packet.cues) {
          const evidence = cue.observed_evidence;
          const details = element("details", "brief-comparison-more");
          const summary = element("summary", "", cue.label);
          append(
            details,
            summary,
            element("span", "badge generated", "Generated change cue"),
            element(
              "p",
              "muted",
              `Clause ${count(cue.clause.sequence)}${
                cue.clause.heading ? ` · ${cue.clause.heading}` : ""
              } · rule ${cue.rule_id}`,
            ),
            element(
              "p",
              "muted",
              `Exact observed match: “${evidence.matched_text}”`,
            ),
            element("p", "brief-comparison-evidence", evidence.excerpt),
            element(
              "p",
              "muted tiny",
              `Observed support characters ${evidence.clause_char_start}–${
                evidence.clause_char_end
              } · SHA-256 ${evidence.sha256}`,
            ),
          );
          column.append(details);
        }
        if (packet.limits.cues_truncated) {
          column.append(
            element(
              "p",
              "muted",
              "More supported cues exist than this bounded packet returns.",
            ),
          );
        }
        cueGrid.append(column);
      }
      fragment.append(cueGrid);
    }

    const limitations = element("section", "decision-brief-limitations");
    append(limitations, element("h3", "", "Comparison limits"));
    const list = element("ul");
    for (const limitation of comparison.limitations) {
      list.append(element("li", "", limitation));
    }
    limitations.append(list);
    fragment.append(limitations);
    decisionBriefComparisonBody.replaceChildren(fragment);
    decisionBriefComparisonDialogStatus.textContent = selectionContext
      ? `${briefs.length} independently validated briefs and ${
        changeCuePackets.reduce(
          (total, packet) => total + packet.cues.length,
          0,
        )
      } bounded change cue(s) loaded from the proposal-only pair.`
      : `${briefs.length} independently validated briefs loaded.`;
    downloadDecisionBriefComparisonButton.disabled = false;
  }

  async function compareDecisionBriefSelections(selected, proposal = null) {
    if (
      !state.token ||
      state.decisionBriefComparing ||
      selected.length < AGREEMENT_DECISION_BRIEF_COMPARISON_MIN ||
      selected.length > AGREEMENT_DECISION_BRIEF_COMPARISON_MAX
    ) {
      return;
    }
    const token = state.token;
    state.decisionBriefComparing = true;
    state.decisionBriefComparison = null;
    state.decisionBriefComparisonExport = null;
    downloadDecisionBriefComparisonButton.disabled = true;
    updateDecisionBriefComparisonControls(
      proposal
        ? "Loading exact decision briefs and document-change cues…"
        : "Loading exact decision briefs…",
    );
    decisionBriefComparisonDialogStatus.textContent =
      "Loading independently validated agreement evidence…";
    const loading = element(
      "p",
      "muted",
      proposal
        ? "Loading the same five bounded wording topics and exact change cues for each agreement…"
        : "Loading the same five bounded wording topics for each agreement…",
    );
    loading.setAttribute("role", "status");
    decisionBriefComparisonBody.replaceChildren(loading);
    openDialog(decisionBriefComparisonDialog);

    try {
      const [settled, cueSettled] = await Promise.all([
        Promise.allSettled(
          selected.map((item) =>
            fetchAgreementDecisionBrief(
              item.agreementId,
              token,
              AGREEMENT_DECISION_BRIEF_COMPARISON_EXAMPLES,
            )
          ),
        ),
        proposal === null
          ? Promise.resolve([])
          : Promise.allSettled(
            selected.map((item) =>
              fetchAgreementChangeCues(
                item.agreementId,
                token,
                AGREEMENT_CHANGE_CUE_LIMIT_DEFAULT,
              )
            ),
          ),
      ]);
      if (state.token !== token) return;
      const allSettled = [...settled, ...cueSettled];
      const unauthorized = allSettled.find(
        (result) =>
          result.status === "rejected" &&
          result.reason instanceof ApiError &&
          result.reason.status === 401,
      );
      if (unauthorized) {
        signOut(
          "The token was not accepted or has changed. Enter the current explorer token.",
        );
        return;
      }
      const failure = allSettled.find(
        (result) => result.status === "rejected",
      );
      if (failure?.status === "rejected") throw failure.reason;
      const briefValues = settled.map((result) => result.value);
      const cueValues = cueSettled.map((result) => result.value);
      const proposalPacket = proposal === null
        ? null
        : buildFamilyProposalLifecycleComparison(
          proposal,
          briefValues,
          cueValues,
        );
      const comparison = proposalPacket?.decision_brief_comparison ??
        buildAgreementDecisionBriefComparison(briefValues);
      state.decisionBriefComparison = comparison;
      state.decisionBriefComparisonExport = proposalPacket ?? comparison;
      renderDecisionBriefComparison(
        comparison,
        proposalPacket?.selection_context ?? null,
        proposalPacket?.change_cue_packets ?? [],
      );
      updateDecisionBriefComparisonControls(
        proposalPacket
          ? `${comparison.scope.agreement_count} proposal documents compared. The generated pair is not a recorded relationship.`
          : `${comparison.scope.agreement_count} agreement briefs compared. Raw positive-match counts are not scores.`,
      );
    } catch (error) {
      decisionBriefComparisonDialogStatus.textContent =
        "Agreement brief comparison unavailable.";
      decisionBriefComparisonBody.replaceChildren(
        element(
          "p",
          "status error",
          error instanceof Error
            ? error.message
            : "The agreement brief comparison could not be loaded.",
        ),
      );
    } finally {
      if (state.token === token) {
        state.decisionBriefComparing = false;
        updateDecisionBriefComparisonControls();
      }
    }
  }

  function compareSelectedDecisionBriefs() {
    return compareDecisionBriefSelections(
      [...state.decisionBriefComparisonSelection.values()],
    );
  }

  function compareFamilyProposalBriefs(proposal) {
    if (
      state.decisionBriefComparing ||
      !Array.isArray(proposal.documents) ||
      proposal.documents.length !== 2
    ) {
      return;
    }
    state.decisionBriefComparisonSelection.clear();
    for (const document of proposal.documents) {
      state.decisionBriefComparisonSelection.set(document.agreementId, {
        agreementId: document.agreementId,
        title: document.observedTitle,
        source: { name: proposal.source },
      });
    }
    state.decisionBriefComparison = null;
    state.decisionBriefComparisonExport = null;
    updateDecisionBriefComparisonControls(
      "The proposal pair replaced the prior selection; loading strict evidence briefs…",
    );
    return compareDecisionBriefSelections(
      [...state.decisionBriefComparisonSelection.values()],
      proposal,
    );
  }

  function downloadPartyDecisionBriefShortlist() {
    if (!state.partyBriefShortlistExport) return;
    const blob = new Blob(
      [`${JSON.stringify(state.partyBriefShortlistExport, null, 2)}\n`],
      { type: "application/json;charset=utf-8" },
    );
    const objectUrl = URL.createObjectURL(blob);
    const link = element("a");
    link.href = objectUrl;
    link.download = `esheria-party-brief-shortlist-${
      state.partyBriefShortlistExport.generated_at.slice(0, 10)
    }.json`;
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
    partyBriefShortlistExportStatus.textContent =
      "Shortlist JSON downloaded with bounded observed evidence and generated coverage kept separate; no bearer token or private Storage path was included.";
  }

  function downloadDecisionBriefComparison() {
    if (!state.decisionBriefComparisonExport) return;
    const output = state.decisionBriefComparisonExport;
    const blob = new Blob(
      [`${JSON.stringify(output, null, 2)}\n`],
      { type: "application/json;charset=utf-8" },
    );
    const objectUrl = URL.createObjectURL(blob);
    const link = element("a");
    link.href = objectUrl;
    link.download = `${
      output.schema === FAMILY_PROPOSAL_LIFECYCLE_COMPARISON_SCHEMA
        ? "esheria-family-proposal-lifecycle-comparison"
        : output.schema === FAMILY_PROPOSAL_BRIEF_COMPARISON_SCHEMA
        ? "esheria-family-proposal-brief-comparison"
        : "esheria-agreement-brief-comparison"
    }-${
      output.generated_at.slice(0, 10)
    }.json`;
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
    decisionBriefComparisonDialogStatus.textContent =
      output.schema === FAMILY_PROPOSAL_LIFECYCLE_COMPARISON_SCHEMA
        ? "Proposal-only lifecycle comparison JSON downloaded with exact change cues, the generated-candidate boundary, and no bearer token or private Storage path."
        : output.schema === FAMILY_PROPOSAL_BRIEF_COMPARISON_SCHEMA
        ? "Proposal-only comparison JSON downloaded with the generated-candidate boundary and without a bearer token or private Storage path."
        : "Comparison JSON downloaded without a bearer token or private Storage path.";
  }

  async function loadAgreementDecisionBrief(agreementId) {
    if (
      !state.token ||
      state.decisionBriefLoading ||
      !UUID_PATTERN.test(agreementId)
    ) {
      return;
    }
    const token = state.token;
    state.decisionBriefLoading = true;
    state.decisionBrief = null;
    state.decisionBriefAgreementId = agreementId;
    downloadDecisionBriefButton.disabled = true;
    decisionBriefStatus.textContent = "Loading bounded decision evidence…";
    decisionBriefDialog.setAttribute("aria-busy", "true");
    const loading = element(
      "p",
      "muted",
      "Loading five publication-gated wording topics…",
    );
    loading.setAttribute("role", "status");
    decisionBriefBody.replaceChildren(loading);
    openDialog(decisionBriefDialog);
    try {
      const brief = await fetchAgreementDecisionBrief(agreementId, token);
      if (
        state.token !== token ||
        state.decisionBriefAgreementId !== agreementId
      ) {
        return;
      }
      state.decisionBrief = brief;
      renderAgreementDecisionBrief(brief);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        signOut(
          "The token was not accepted or has changed. Enter the current explorer token.",
        );
        return;
      }
      decisionBriefStatus.textContent = "Decision brief unavailable.";
      decisionBriefBody.replaceChildren(
        element(
          "p",
          "status error",
          error instanceof Error
            ? error.message
            : "The agreement decision brief could not be loaded.",
        ),
      );
    } finally {
      if (state.token === token) state.decisionBriefLoading = false;
      decisionBriefDialog.setAttribute("aria-busy", "false");
    }
  }

  function downloadAgreementDecisionBrief() {
    if (!state.decisionBrief) return;
    try {
      const output = buildAgreementDecisionBriefExport(state.decisionBrief);
      const blob = new Blob([`${JSON.stringify(output, null, 2)}\n`], {
        type: "application/json;charset=utf-8",
      });
      const objectUrl = URL.createObjectURL(blob);
      const link = element("a");
      link.href = objectUrl;
      link.download =
        `esheria-agreement-decision-brief-${state.decisionBrief.agreement.agreement_id}.json`;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      decisionBriefStatus.textContent =
        "Sanitized JSON downloaded. It contains no bearer token or private storage path; formula-like source text remains inert JSON data.";
    } catch (error) {
      decisionBriefStatus.textContent = error instanceof Error
        ? error.message
        : "The sanitized JSON export could not be created.";
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
            displayText(
              agreement.extraction_confidence,
            )
          }`,
        ],
        ["Artifact SHA-256", displayText(agreement.artifact_sha256)],
        ["Text basis", agreementBasis.label],
        ["Clauses", count(data.clause_count)],
      ]),
    );
    if (
      typeof agreement.id === "string" &&
      UUID_PATTERN.test(agreement.id) &&
      ["contract", "amendment"].includes(agreement.document_kind)
    ) {
      const launch = element("section", "decision-brief-launch");
      const openBrief = element(
        "button",
        "button primary",
        "Open five-topic decision brief",
      );
      openBrief.type = "button";
      openBrief.setAttribute("aria-haspopup", "dialog");
      openBrief.addEventListener("click", () => {
        loadAgreementDecisionBrief(agreement.id);
      });
      append(
        launch,
        element(
          "p",
          "",
          "Review exact positive wording matches across liability, indemnity, termination, governing law, and assignment. Generated signals remain separate from observed support.",
        ),
        openBrief,
      );
      fragment.append(launch);
    }
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
            displayText(
              source.policy_assessment_status,
              "automated assessment",
            )
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
              displayText(dateEvidence.date_type, "date").replaceAll(
                "_",
                " ",
              )
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
              displayText(
                dateEvidence.observed_char_start,
                "?",
              )
            }–${displayText(dateEvidence.observed_char_end, "?")} · rule ${
              displayText(
                dateEvidence.rule_id,
                "unknown",
              )
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
                displayText(
                  party.resolution_status,
                )
              }`,
            )
            : null,
        );
        partySection.append(card);
      }
      fragment.append(partySection);
    }

    const commercialPosition = commercialPositionPanel(
      data.commercial_position,
    );
    if (commercialPosition) fragment.append(commercialPosition);
    const terminationPosition = terminationPositionPanel(
      data.termination_position,
    );
    if (terminationPosition) fragment.append(terminationPosition);
    const assignmentPosition = assignmentPositionPanel(
      data.assignment_position,
    );
    if (assignmentPosition) fragment.append(assignmentPosition);
    const governingLawPosition = governingLawPositionPanel(
      data.governing_law_position,
    );
    if (governingLawPosition) fragment.append(governingLawPosition);
    const indemnityPosition = indemnityPositionPanel(data.indemnity_position);
    if (indemnityPosition) fragment.append(indemnityPosition);

    const anchorContext = record(data.anchor_context);
    if (
      anchorClauseId &&
      anchorContext.api_version === "anchor-clause-context-v1"
    ) {
      const contextSection = section("Connected context for matched clause");
      contextSection.append(
        element(
          "p",
          "focus-note",
          "Observed definitions and references are shown separately from generated term matching and target resolution. Missing or ambiguous links remain visible.",
        ),
      );

      const definitionCandidates = array(
        anchorContext.definition_candidates,
      ).slice(0, 20);
      if (definitionCandidates.length) {
        contextSection.append(element("h4", "", "Definition candidates"));
        for (const definitionValue of definitionCandidates) {
          const definition = record(definitionValue);
          const card = element("article", "relationship");
          append(
            card,
            element("span", "badge observed", "Observed definition"),
            element("span", "badge generated", "Generated term-use match"),
            element(
              "h4",
              "",
              `“${displayText(definition.term, "Unnamed term")}”`,
            ),
            element(
              "p",
              "observed-text",
              boundedText(definition.definition, 4_000),
            ),
            element(
              "p",
              "muted",
              `Defined in clause ${
                displayText(
                  definition.defining_clause_sequence,
                  "?",
                )
              } · SHA-256 ${
                displayText(definition.definition_sha256).slice(
                  0,
                  12,
                )
              }…${
                definition.ambiguous_definition_occurrences
                  ? " · multiple definition occurrences"
                  : ""
              }`,
            ),
          );
          const definingId =
            typeof definition.defining_clause_id === "string" &&
              UUID_PATTERN.test(definition.defining_clause_id)
              ? definition.defining_clause_id
              : null;
          if (definingId) {
            const inspect = element(
              "button",
              "text-button",
              "View defining clause →",
            );
            inspect.type = "button";
            inspect.addEventListener(
              "click",
              () => loadAgreement(agreement.id, definingId),
            );
            card.append(inspect);
          }
          contextSection.append(card);
        }
      }

      const resolvedTargets = array(
        anchorContext.resolved_reference_targets,
      ).slice(0, 20);
      if (resolvedTargets.length) {
        contextSection.append(element("h4", "", "Resolved local references"));
        for (const referenceValue of resolvedTargets) {
          const reference = record(referenceValue);
          const card = element("article", "relationship");
          append(
            card,
            element(
              "span",
              reference.target_resolution_basis === "generated"
                ? "badge generated"
                : "badge observed",
              referenceResolutionProvenance(reference.target_resolution_basis),
            ),
            element(
              "h4",
              "",
              `${
                displayText(
                  reference.observed_reference,
                  "Reference",
                )
              } → clause ${displayText(reference.target_sequence, "?")}`,
            ),
            element(
              "p",
              "muted",
              displayText(
                reference.target_heading,
                "Untitled referenced clause",
              ),
            ),
            element(
              "p",
              "observed-text",
              boundedText(reference.target_text, 8_000),
            ),
            element(
              "p",
              "muted",
              `${
                formatEvidenceLocation({
                  evidence_location: reference.target_evidence_location,
                  page_start: reference.target_page_start,
                  page_end: reference.target_page_end,
                  char_start: reference.target_char_start,
                  char_end: reference.target_char_end,
                })
              } · SHA-256 ${
                displayText(reference.target_text_sha256).slice(
                  0,
                  12,
                )
              }…`,
            ),
          );
          const targetId = typeof reference.target_clause_id === "string" &&
              UUID_PATTERN.test(reference.target_clause_id)
            ? reference.target_clause_id
            : null;
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
            card.append(inspect);
          }
          contextSection.append(card);
        }
      }

      const unresolvedReferences = array(
        anchorContext.unresolved_references,
      ).slice(0, 20);
      if (unresolvedReferences.length) {
        contextSection.append(element("h4", "", "Unresolved references"));
        for (const referenceValue of unresolvedReferences) {
          const reference = record(referenceValue);
          contextSection.append(
            element(
              "p",
              "relationship",
              `${
                displayText(
                  reference.observed_reference,
                  "Reference unavailable",
                )
              } · ${
                referenceResolutionLabel(
                  reference.target_resolution_status,
                )
              }`,
            ),
          );
        }
      }

      const contextCoverage = record(anchorContext.coverage);
      contextSection.append(
        element(
          "p",
          "muted",
          `${
            count(
              contextCoverage.definition_candidates_total,
            )
          } definition candidates · ${
            count(
              contextCoverage.resolved_reference_targets_total,
            )
          } resolved references · ${
            count(
              contextCoverage.unresolved_references_total,
            )
          } unresolved references. Term-use matching and target resolution are navigation aids, not legal interpretations.`,
        ),
      );
      fragment.append(contextSection);
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
        element("p", "muted", formatEvidenceLocation(clause)),
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
              displayText(
                clause.generated_summary,
                "No summary",
              )
            }`,
          ),
        );
        card.append(generated);
      }
      const definitions = array(clause.defined_terms).slice(0, 50);
      for (const definitionValue of definitions) {
        const definition = record(definitionValue);
        const definitionBasis = textBasisPresentation(
          definition.definition_basis ??
            clause.text_basis ??
            agreement.text_basis,
        );
        const definitionBox = element(
          "p",
          "observed-text",
          `${definitionBasis.label} defined term “${
            displayText(
              definition.term,
            )
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
          element("strong", "", referenceResolutionProvenance(resolutionBasis)),
          element(
            "p",
            "",
            targetId
              ? `Clause ${displayText(reference.target_sequence)} · ${
                displayText(
                  reference.target_heading,
                  "Untitled clause",
                )
              } · ${
                referenceResolutionLabel(
                  reference.target_resolution_status,
                )
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

    const familyContext = familyContextEvidence(
      data.family_context,
      agreement.id,
    );
    if (familyContext?.items.length) {
      const candidateSection = section("Generated related-document proposals");
      candidateSection.append(
        element(
          "p",
          "focus-note",
          "Generated proposals are separate from recorded agreement relationships. Publication order and family-review responses do not establish amendment direction, supersession, incorporation, or legal effect. Verify both source records.",
        ),
      );
      for (const candidate of familyContext.items) {
        const card = element("article", "relationship");
        const reviewClass = candidate.reviewStatus === "unreviewed" ||
            candidate.reviewStatus === "mixed" || candidate.conflicting
          ? "basis-unknown"
          : "basis-reviewed";
        const classificationClass = candidate.documentKindBasis === "generated"
          ? "basis-generated"
          : candidate.documentKindBasis === "reviewed"
          ? "basis-reviewed"
          : "";
        append(
          card,
          element(
            "span",
            "badge basis-generated",
            "Generated proposal · separate from relationship ledger",
          ),
          element(
            "h4",
            "",
            candidate.observedTitle === null
              ? "Observed title unavailable"
              : candidate.observedTitle,
          ),
          candidate.observedTitleTruncated
            ? element(
              "p",
              "muted",
              "Displayed observed title was source-truncated to 500 characters.",
            )
            : null,
          element(
            "span",
            `badge${classificationClass ? ` ${classificationClass}` : ""}`,
            documentKindBasisLabel(candidate.documentKindBasis),
          ),
          element(
            "p",
            "muted",
            `Source ${displayText(candidate.source)} · document kind ${
              displayText(candidate.documentKind)
            }${
              candidate.observedPublishedAt
                ? ` · published ${date(candidate.observedPublishedAt)}`
                : ""
            } · Observed source text`,
          ),
          element(
            "span",
            `badge ${reviewClass}`,
            familyReviewStatusLabel(
              candidate.reviewStatus,
              candidate.conflicting,
            ),
          ),
          element(
            "p",
            "muted",
            `${
              count(candidate.currentDecisionCount)
            } current review response(s)`,
          ),
          sourceLink(candidate.canonicalUrl, "Open candidate source ↗"),
          candidate.canonicalUrlOmitted
            ? element(
              "p",
              "muted",
              "Recorded source URL was omitted by server safety checks.",
            )
            : null,
        );
        const inspect = element(
          "button",
          "text-button",
          "Inspect candidate document →",
        );
        inspect.type = "button";
        inspect.addEventListener(
          "click",
          () => loadAgreement(candidate.relatedAgreementId),
        );
        card.append(inspect);
        candidateSection.append(card);
      }
      candidateSection.append(
        element(
          "p",
          "muted",
          familyContext.truncated
            ? `Showing ${count(familyContext.items.length)} of ${
              count(familyContext.totals.eligibleDistinctPairs)
            } generated candidate pairs; ${
              count(familyContext.totals.omittedCount)
            } omitted by the bounded response (maximum ${FAMILY_CONTEXT_ITEM_MAX}).`
            : `Showing ${
              count(familyContext.items.length)
            } generated candidate pair(s); this response is bounded to ${FAMILY_CONTEXT_ITEM_MAX}.`,
        ),
      );
      fragment.append(candidateSection);
    }

    const relationships = array(data.relationships).slice(0, 100);
    if (relationships.length) {
      const relationshipSection = section("Recorded agreement relationships");
      for (const relationshipValue of relationships) {
        const relationship = record(relationshipValue);
        relationshipSection.append(
          element(
            "p",
            "relationship",
            `${displayText(relationship.relationship_type)} · ${
              displayText(
                relationship.direction,
              )
            } · ${
              displayText(
                relationship.observed_reference,
                "reference unavailable",
              )
            } · basis ${displayText(relationship.basis)} · confidence ${
              displayText(
                relationship.confidence,
              )
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
              displayText(
                claim.confidence,
              )
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
      await loadGoverningLawSummary();
      await loadIndemnitySummary();
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
  byId("close-decision-brief").addEventListener(
    "click",
    () => closeDialog(decisionBriefDialog),
  );
  byId("close-decision-brief-comparison").addEventListener(
    "click",
    () => closeDialog(decisionBriefComparisonDialog),
  );
  byId("close-comparison").addEventListener(
    "click",
    () => closeDialog(comparisonDialog),
  );
  clearComparisonButton.addEventListener("click", clearComparison);
  openComparisonButton.addEventListener("click", compareSelected);
  clearDecisionBriefComparisonButton.addEventListener(
    "click",
    clearDecisionBriefComparison,
  );
  partyClearDecisionBriefComparisonButton.addEventListener(
    "click",
    clearDecisionBriefComparison,
  );
  openDecisionBriefComparisonButton.addEventListener(
    "click",
    compareSelectedDecisionBriefs,
  );
  partyOpenDecisionBriefComparisonButton.addEventListener(
    "click",
    compareSelectedDecisionBriefs,
  );
  downloadDecisionBriefComparisonButton.addEventListener(
    "click",
    downloadDecisionBriefComparison,
  );
  downloadPartyBriefShortlistButton.addEventListener(
    "click",
    downloadPartyDecisionBriefShortlist,
  );
  exportPositionMatrixButton.addEventListener("click", exportPositionMatrix);
  exportTerminationMatrixButton.addEventListener(
    "click",
    exportTerminationMatrix,
  );
  exportAssignmentMatrixButton.addEventListener(
    "click",
    exportAssignmentMatrix,
  );
  exportGoverningLawMatrixButton.addEventListener(
    "click",
    exportGoverningLawMatrix,
  );
  exportIndemnityMatrixButton.addEventListener("click", exportIndemnityMatrix);
  exportComparisonButton.addEventListener("click", exportComparison);
  downloadDecisionBriefButton.addEventListener(
    "click",
    downloadAgreementDecisionBrief,
  );
  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) closeDialog(detailDialog);
  });
  decisionBriefDialog.addEventListener("click", (event) => {
    if (event.target === decisionBriefDialog) closeDialog(decisionBriefDialog);
  });
  comparisonDialog.addEventListener("click", (event) => {
    if (event.target === comparisonDialog) closeDialog(comparisonDialog);
  });

  familyProposalLoadButton.addEventListener("click", () => {
    state.familyProposalOffset = 0;
    performFamilyProposalBrowse();
  });
  familyProposalPrevious.addEventListener("click", () => {
    state.familyProposalOffset = Math.max(
      0,
      state.familyProposalOffset - state.familyProposalLimit,
    );
    performFamilyProposalBrowse();
  });
  familyProposalNext.addEventListener("click", () => {
    if (
      !state.familyProposalHasMore ||
      state.familyProposalOffset + state.familyProposalLimit >
        FAMILY_PROPOSAL_OFFSET_MAX
    ) {
      return;
    }
    state.familyProposalOffset += state.familyProposalLimit;
    performFamilyProposalBrowse();
  });

  amendmentChangeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.amendmentChangeCue = amendmentChangeCueInput.value;
    state.amendmentChangeSource = amendmentChangeSourceInput.value.trim()
      .toLowerCase();
    state.amendmentChangeOffset = 0;
    performAmendmentChangeBrowse();
  });
  amendmentChangePrevious.addEventListener("click", () => {
    state.amendmentChangeOffset = Math.max(
      0,
      state.amendmentChangeOffset - state.amendmentChangeLimit,
    );
    performAmendmentChangeBrowse();
  });
  amendmentChangeNext.addEventListener("click", () => {
    if (
      !state.amendmentChangeHasMore ||
      state.amendmentChangeOffset + state.amendmentChangeLimit >
        AMENDMENT_CHANGE_DIRECTORY_OFFSET_MAX
    ) {
      return;
    }
    state.amendmentChangeOffset += state.amendmentChangeLimit;
    performAmendmentChangeBrowse();
  });

  decisionBriefDirectoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.decisionBriefDirectoryMinimumTopics = Number(
      decisionBriefMinimumTopicsInput.value,
    );
    state.decisionBriefDirectoryKind = decisionBriefKindInput.value;
    state.decisionBriefDirectorySource = decisionBriefSourceInput.value.trim()
      .toLowerCase();
    state.decisionBriefDirectoryOffset = 0;
    performDecisionBriefDirectoryBrowse();
  });
  decisionBriefDirectoryPrevious.addEventListener("click", () => {
    state.decisionBriefDirectoryOffset = Math.max(
      0,
      state.decisionBriefDirectoryOffset - state.decisionBriefDirectoryLimit,
    );
    performDecisionBriefDirectoryBrowse();
  });
  decisionBriefDirectoryNext.addEventListener("click", () => {
    if (
      !state.decisionBriefDirectoryHasMore ||
      state.decisionBriefDirectoryOffset +
            state.decisionBriefDirectoryLimit >
        DECISION_BRIEF_DIRECTORY_OFFSET_MAX
    ) {
      return;
    }
    state.decisionBriefDirectoryOffset += state.decisionBriefDirectoryLimit;
    performDecisionBriefDirectoryBrowse();
  });

  partyBriefRankButton.addEventListener(
    "click",
    rankPartyDecisionBriefCohort,
  );
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
  byId("close-party-dossier").addEventListener("click", () => {
    partyDossierSection.hidden = true;
    partyDossierSummary.replaceChildren();
    partyDossierThemes.replaceChildren();
  });

  positionValueInput.addEventListener("change", () => {
    if (positionValueInput.value) {
      positionSignalInput.value = "explicit_liability_limit_formula";
      if (
        positionFeatureInput.value &&
        LIABILITY_POSITION_FEATURES[positionFeatureInput.value]?.signalKey !==
          "explicit_liability_limit_formula"
      ) {
        positionFeatureInput.value = "";
      }
    }
  });
  positionFeatureInput.addEventListener("change", () => {
    const configured = LIABILITY_POSITION_FEATURES[positionFeatureInput.value];
    if (!configured) return;
    positionSignalInput.value = configured.signalKey;
    if (configured.signalKey !== "explicit_liability_limit_formula") {
      positionValueInput.value = "";
    }
  });
  positionSignalInput.addEventListener("change", () => {
    if (
      positionSignalInput.value &&
      positionSignalInput.value !== "explicit_liability_limit_formula"
    ) {
      positionValueInput.value = "";
    }
    const configured = LIABILITY_POSITION_FEATURES[positionFeatureInput.value];
    if (
      configured &&
      positionSignalInput.value &&
      configured.signalKey !== positionSignalInput.value
    ) {
      positionFeatureInput.value = "";
    }
  });
  positionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearComparison();
    state.resultMode = "positions";
    state.positionSignal = positionSignalInput.value;
    state.positionFeature = positionFeatureInput.value;
    state.positionValue = positionValueInput.value;
    state.positionKind = positionKindInput.value;
    state.positionSource = positionSourceInput.value.trim().toLowerCase();
    const signalLabel = positionSignalInput.selectedOptions[0]?.textContent ??
      "Any detected position";
    const valueLabel = positionValueInput.selectedOptions[0]?.textContent ??
      "Any value evidence";
    const featureLabel = positionFeatureInput.selectedOptions[0]?.textContent ??
      "Any generated feature";
    state.query =
      `Position library: ${signalLabel}; ${featureLabel}; ${valueLabel}`;
    state.clauseParty = "";
    state.kind = state.positionKind;
    state.source = state.positionSource;
    state.offset = 0;
    syncGuideSelection("");
    performPositionBrowse();
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  terminationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearComparison();
    state.resultMode = "termination_positions";
    state.terminationSignal = terminationSignalInput.value;
    state.terminationDuration = terminationDurationInput.value;
    state.terminationLinkage = terminationLinkageInput.value;
    state.terminationKind = terminationKindInput.value;
    state.terminationSource = terminationSourceInput.value.trim().toLowerCase();
    const signalLabel =
      terminationSignalInput.selectedOptions[0]?.textContent ??
        "Any detected wording";
    const durationLabel =
      terminationDurationInput.selectedOptions[0]?.textContent ??
        "Any duration evidence";
    const linkageLabel =
      terminationLinkageInput.selectedOptions[0]?.textContent ??
        "Any bounded signal support";
    state.query =
      `Termination library: ${signalLabel}; ${durationLabel}; ${linkageLabel}`;
    state.clauseParty = "";
    state.kind = state.terminationKind;
    state.source = state.terminationSource;
    state.offset = 0;
    syncGuideSelection("");
    performTerminationBrowse();
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  assignmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearComparison();
    state.resultMode = "assignment_positions";
    state.assignmentSignal = assignmentSignalInput.value;
    state.assignmentContext = assignmentContextInput.value;
    state.assignmentKind = assignmentKindInput.value;
    state.assignmentSource = assignmentSourceInput.value.trim().toLowerCase();
    const signalLabel = assignmentSignalInput.selectedOptions[0]?.textContent ??
      "Any detected wording";
    const contextLabel =
      assignmentContextInput.selectedOptions[0]?.textContent ?? "Any context";
    state.query = `Assignment library: ${signalLabel}; ${contextLabel}`;
    state.clauseParty = "";
    state.kind = state.assignmentKind;
    state.source = state.assignmentSource;
    state.offset = 0;
    syncGuideSelection("");
    performAssignmentBrowse();
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  governingLawForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearComparison();
    state.resultMode = "governing_law_positions";
    state.governingLawSignal = governingLawSignalInput.value;
    state.governingLawKind = governingLawKindInput.value;
    state.governingLawSource = governingLawSourceInput.value
      .trim()
      .toLowerCase();
    const signalLabel =
      governingLawSignalInput.selectedOptions[0]?.textContent ??
        "Any detected wording";
    state.query = `Governing-law library: ${signalLabel}`;
    state.clauseParty = "";
    state.kind = state.governingLawKind;
    state.source = state.governingLawSource;
    state.offset = 0;
    syncGuideSelection("");
    performGoverningLawBrowse();
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  indemnityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearComparison();
    state.resultMode = "indemnity_positions";
    state.indemnitySignal = indemnitySignalInput.value;
    state.indemnityKind = indemnityKindInput.value;
    state.indemnitySource = indemnitySourceInput.value.trim().toLowerCase();
    const signalLabel = indemnitySignalInput.selectedOptions[0]?.textContent ??
      "Any detected wording";
    state.query = `Indemnity library: ${signalLabel}`;
    state.clauseParty = "";
    state.kind = state.indemnityKind;
    state.source = state.indemnitySource;
    state.offset = 0;
    syncGuideSelection("");
    performIndemnityBrowse();
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = queryInput.value.trim();
    const clauseParty = clausePartyInput.value.trim();
    const kind = kindInput.value;
    const source = sourceInput.value.trim().toLowerCase();
    if (
      query !== state.query ||
      clauseParty !== state.clauseParty ||
      kind !== state.kind ||
      source !== state.source
    ) {
      clearComparison();
    }
    state.query = query;
    state.clauseParty = clauseParty;
    state.kind = kind;
    state.source = source;
    state.offset = 0;
    state.resultMode = "search";
    syncGuideSelection(query);
    performSearch();
  });
  previous.addEventListener("click", () => {
    state.offset = Math.max(0, state.offset - state.limit);
    if (state.resultMode === "positions") performPositionBrowse();
    else if (state.resultMode === "termination_positions") {
      performTerminationBrowse();
    } else if (state.resultMode === "assignment_positions") {
      performAssignmentBrowse();
    } else if (state.resultMode === "governing_law_positions") {
      performGoverningLawBrowse();
    } else if (state.resultMode === "indemnity_positions") {
      performIndemnityBrowse();
    } else performSearch();
  });
  next.addEventListener("click", () => {
    if (!state.hasMore) return;
    state.offset = Math.min(
      [
          "termination_positions",
          "assignment_positions",
          "governing_law_positions",
          "indemnity_positions",
        ].includes(state.resultMode)
        ? 5_000
        : 1_000,
      state.offset + state.limit,
    );
    if (state.resultMode === "positions") performPositionBrowse();
    else if (state.resultMode === "termination_positions") {
      performTerminationBrowse();
    } else if (state.resultMode === "assignment_positions") {
      performAssignmentBrowse();
    } else if (state.resultMode === "governing_law_positions") {
      performGoverningLawBrowse();
    } else if (state.resultMode === "indemnity_positions") {
      performIndemnityBrowse();
    } else performSearch();
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
    state.partyBriefScanGeneration += 1;
    state.partyBriefCoverage.clear();
    state.partyBriefShortlistExport = null;
    state.comparisonSelection.clear();
    state.comparisonEvidence = [];
    state.decisionBriefComparisonSelection.clear();
    state.decisionBriefComparison = null;
    state.decisionBriefComparisonExport = null;
    tokenInput.value = "";
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && !state.token) {
      signOut("The token was cleared when this page was left.");
    }
  });

  updateComparisonControls();
  updateDecisionBriefComparisonControls();
  tokenInput.focus();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
}
