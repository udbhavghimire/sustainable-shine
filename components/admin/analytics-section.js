"use client";

import { useState, useEffect, useCallback } from "react";
import StatCard from "./stat-card";

const API_BASE_URL = "https://api.sustainableshine.com.au/api";

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "this_week", label: "This week" },
  { value: "this_month", label: "This month" },
  { value: "last_month", label: "Last month" },
  { value: "last_3_months", label: "Last 3 months" },
];

function formatNumber(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "—";
  return n.toLocaleString();
}

function normalizeTopPages(topPages) {
  if (!Array.isArray(topPages)) return [];
  return topPages.map((item) => {
    if (typeof item === "string") return { path: item, views: null };
    return {
      path: item.path || item.page || item.url || "—",
      views: item.views ?? item.count ?? item.page_views ?? null,
    };
  });
}

function normalizeTopEvents(topEvents) {
  if (!Array.isArray(topEvents)) return [];
  return topEvents.map((item) => {
    if (typeof item === "string") {
      return { label: item, count: null, event_type: null };
    }
    const label =
      item.element_text ||
      item.element_id ||
      item.label ||
      item.name ||
      item.event_type ||
      "—";
    return {
      label,
      event_type: item.event_type || null,
      count: item.count ?? item.clicks ?? item.views ?? null,
    };
  });
}

function normalizeDevices(devices) {
  if (!devices) return [];
  if (Array.isArray(devices)) {
    return devices.map((item) => ({
      type: item.device_type || item.type || item.name || "unknown",
      count: item.count ?? item.views ?? 0,
    }));
  }
  return Object.entries(devices).map(([type, count]) => ({
    type,
    count: typeof count === "object" ? count.count ?? count.views ?? 0 : count,
  }));
}

function normalizeDaily(daily) {
  if (!Array.isArray(daily)) return [];
  return daily.map((row) => ({
    date: row.date || row.day || "—",
    page_views: row.page_views ?? row.views ?? 0,
    unique_visitors: row.unique_visitors ?? row.visitors ?? 0,
    booking_page_views: row.booking_page_views ?? 0,
    booking_submits: row.booking_submits ?? 0,
    cta_clicks: row.cta_clicks ?? row.clicks ?? 0,
  }));
}

export default function AnalyticsSection() {
  const [period, setPeriod] = useState("today");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async (selectedPeriod) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/analytics/dashboard/?period=${encodeURIComponent(selectedPeriod)}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching analytics dashboard:", err);
      setData(null);
      setError(
        "Unable to load analytics. The backend might be starting up — try again shortly.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard(period);
  }, [period, fetchDashboard]);

  const summary = data?.summary || data || {};
  const topPages = normalizeTopPages(data?.top_pages);
  const topEvents = normalizeTopEvents(data?.top_events);
  const devices = normalizeDevices(data?.devices);
  const daily = normalizeDaily(data?.daily);
  const maxDailyViews = Math.max(1, ...daily.map((d) => Number(d.page_views) || 0));
  const totalDevices = devices.reduce((sum, d) => sum + (Number(d.count) || 0), 0) || 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600 mt-1">
            Site traffic, CTAs, and booking funnel
          </p>
        </div>
        <button
          type="button"
          onClick={() => fetchDashboard(period)}
          className="self-start px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Period switcher */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPeriod(p.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p.value
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Analytics unavailable:</strong> {error}{" "}
            <button
              type="button"
              onClick={() => fetchDashboard(period)}
              className="underline font-medium hover:text-yellow-800"
            >
              Retry
            </button>
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      ) : !error ? (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard
              title="Page Views"
              value={formatNumber(summary.page_views)}
              icon="👁"
              color="blue"
            />
            <StatCard
              title="Unique Visitors"
              value={formatNumber(summary.unique_visitors)}
              icon="👤"
              color="purple"
            />
            <StatCard
              title="Booking Page Views"
              value={formatNumber(summary.booking_page_views)}
              icon="📅"
              color="yellow"
            />
            <StatCard
              title="Booking Submits"
              value={formatNumber(summary.booking_submits)}
              icon="✅"
              color="green"
            />
            <StatCard
              title="CTA Clicks"
              value={formatNumber(summary.cta_clicks)}
              icon="🖱"
              color="blue"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top pages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Pages
                </h3>
              </div>
              {topPages.length === 0 ? (
                <p className="p-6 text-sm text-gray-500">No page data yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Path
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Views
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topPages.map((row, idx) => (
                        <tr key={`${row.path}-${idx}`} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-sm text-gray-900 font-mono truncate max-w-xs">
                            {row.path}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-700 text-right">
                            {formatNumber(row.views)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Top events / CTAs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Events / CTAs
                </h3>
              </div>
              {topEvents.length === 0 ? (
                <p className="p-6 text-sm text-gray-500">No event data yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topEvents.map((row, idx) => (
                        <tr key={`${row.label}-${idx}`} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-sm text-gray-900">
                            <div>{row.label}</div>
                            {row.event_type && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                {row.event_type}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-700 text-right">
                            {formatNumber(row.count)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Device breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Devices
            </h3>
            {devices.length === 0 ? (
              <p className="text-sm text-gray-500">No device data yet.</p>
            ) : (
              <div className="space-y-3">
                {devices.map((device) => {
                  const pct = Math.round(
                    ((Number(device.count) || 0) / totalDevices) * 100,
                  );
                  return (
                    <div key={device.type}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 capitalize">
                          {device.type}
                        </span>
                        <span className="text-gray-600">
                          {formatNumber(device.count)} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Daily chart + table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Daily</h3>
            </div>
            {daily.length === 0 ? (
              <p className="p-6 text-sm text-gray-500">No daily data yet.</p>
            ) : (
              <>
                <div className="px-6 pt-6 pb-2">
                  <div className="flex items-end gap-1 h-40">
                    {daily.map((row, idx) => {
                      const height = Math.max(
                        4,
                        ((Number(row.page_views) || 0) / maxDailyViews) * 100,
                      );
                      return (
                        <div
                          key={`${row.date}-${idx}`}
                          className="flex-1 flex flex-col items-center justify-end h-full group relative"
                          title={`${row.date}: ${row.page_views} views`}
                        >
                          <div
                            className="w-full max-w-[28px] mx-auto bg-emerald-500 hover:bg-emerald-600 rounded-t transition-colors"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-1 mt-2">
                    {daily.map((row, idx) => (
                      <div
                        key={`label-${row.date}-${idx}`}
                        className="flex-1 text-center text-[10px] text-gray-400 truncate"
                      >
                        {String(row.date).slice(5) || row.date}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto border-t border-gray-200 mt-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Views
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Visitors
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Booking views
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Submits
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          CTA clicks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {daily.map((row, idx) => (
                        <tr key={`row-${row.date}-${idx}`} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                            {row.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-right">
                            {formatNumber(row.page_views)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-right">
                            {formatNumber(row.unique_visitors)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-right">
                            {formatNumber(row.booking_page_views)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-right">
                            {formatNumber(row.booking_submits)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-right">
                            {formatNumber(row.cta_clicks)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
