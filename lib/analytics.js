const API_BASE_URL = "https://api.sustainableshine.com.au/api";
const SESSION_KEY = "ss_analytics_session_id";
const TRACK_URL = `${API_BASE_URL}/analytics/track/`;

function createUuid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getSessionId() {
  if (typeof window === "undefined") return null;
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = createUuid();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return createUuid();
  }
}

export function getDeviceType() {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return "mobile";
  }
  const width = window.innerWidth || 0;
  if (width > 0 && width < 768) return "mobile";
  if (width >= 768 && width < 1024) return "tablet";
  return "desktop";
}

function getUtmParams() {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const utms = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
      const value = params.get(key);
      if (value) utms[key] = value;
    }
    return utms;
  } catch {
    return {};
  }
}

function buildEvent(partial) {
  return {
    session_id: getSessionId(),
    path:
      partial.path ??
      (typeof window !== "undefined" ? window.location.pathname : "/"),
    referrer: typeof document !== "undefined" ? document.referrer || "" : "",
    device_type: getDeviceType(),
    ...getUtmParams(),
    ...partial,
  };
}

/**
 * Fire-and-forget analytics track. Accepts a single event or an array.
 * Never throws; never blocks the UI.
 */
export function track(eventOrEvents) {
  if (typeof window === "undefined") return;

  try {
    const list = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];
    const events = list.filter(Boolean).map((e) => buildEvent(e));
    if (!events.length) return;

    const body = JSON.stringify({ events });

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      const sent = navigator.sendBeacon(TRACK_URL, blob);
      if (sent) return;
    }

    fetch(TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export function trackPageView(path) {
  const resolvedPath =
    path || (typeof window !== "undefined" ? window.location.pathname : "/");
  const events = [{ event_type: "page_view", path: resolvedPath }];

  if (resolvedPath === "/booking" || resolvedPath.startsWith("/booking/")) {
    events.push({ event_type: "booking_page_view", path: resolvedPath });
  }

  track(events);
}

export function trackClick({ element_id, element_text, path } = {}) {
  track({
    event_type: "click",
    path: path || (typeof window !== "undefined" ? window.location.pathname : "/"),
    ...(element_id ? { element_id } : {}),
    ...(element_text ? { element_text: String(element_text).slice(0, 200) } : {}),
  });
}

export function trackBookingSubmit(path = "/booking") {
  track({
    event_type: "booking_submit",
    path,
  });
}

export { API_BASE_URL as ANALYTICS_API_BASE_URL };
