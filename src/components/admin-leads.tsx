"use client";

import { useState } from "react";
import type { Lead, LeadStatus } from "@/lib/types";
import type { Locale } from "@/i18n/config";

const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

export function AdminLeads({ initialLeads, locale }: { initialLeads: Lead[]; locale: Locale }) {
  const [leads, setLeads] = useState(initialLeads);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function setStatus(id: string, status: LeadStatus) {
    setSavingId(id);
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) throw new Error("update_failed");
      setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, status } : lead));
    } catch {
      setError(locale === "ar" ? "تعذر تحديث حالة العميل المحتمل." : "Could not update lead status.");
    } finally {
      setSavingId(null);
    }
  }

  if (leads.length === 0) return <div className="rounded-card border border-sand-200 bg-white p-8 text-center text-sm text-ink-500">{locale === "ar" ? "لا توجد طلبات مسجلة بعد." : "No leads recorded yet."}</div>;

  return (
    <div>
      {error && <p role="alert" className="mb-3 text-sm font-semibold text-ember-700">{error}</p>}
      <div className="overflow-x-auto rounded-card border border-sand-200 bg-white">
        <table className="w-full min-w-[920px] text-sm">
          <thead><tr className="bg-sand-50 text-start">
            <th className="p-3 text-start">{locale === "ar" ? "النوع" : "Type"}</th>
            <th className="p-3 text-start">{locale === "ar" ? "الطلب" : "Request"}</th>
            <th className="p-3 text-start">{locale === "ar" ? "التواصل" : "Contact"}</th>
            <th className="p-3 text-start">{locale === "ar" ? "المصدر" : "Source"}</th>
            <th className="p-3 text-start">{locale === "ar" ? "التاريخ" : "Date"}</th>
            <th className="p-3 text-start">{locale === "ar" ? "الحالة" : "Status"}</th>
          </tr></thead>
          <tbody>{leads.map((lead) => (
            <tr key={lead.id} className="border-t border-sand-100 align-top">
              <td className="p-3 font-semibold text-ink-900">{leadTypeLabel(lead.type, locale)}</td>
              <td className="max-w-md p-3 text-ink-700"><LeadSummary lead={lead} locale={locale} /></td>
              <td className="p-3 text-ink-700" dir="ltr">{lead.contactPhone}</td>
              <td className="p-3 text-ink-600"><span className="font-semibold">{lead.source}</span><br /><span className="text-xs">{lead.page}</span></td>
              <td className="p-3 text-ink-600">{new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-SA", { dateStyle: "medium" }).format(new Date(lead.createdAt))}</td>
              <td className="p-3"><select aria-label="Lead status" value={lead.status} disabled={savingId === lead.id} onChange={(event) => setStatus(lead.id, event.target.value as LeadStatus)} className="input-field min-w-36 py-2">{STATUSES.map((status) => <option key={status}>{status}</option>)}</select></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function LeadSummary({ lead, locale }: { lead: Lead; locale: Locale }) {
  const preferred = lead.type === "staffing" ? ["job", "count", "city", "activity"] : ["trainingType", "employeeCount", "city", "departments"];
  const entries = preferred.filter((key) => lead.data[key]).map((key) => String(lead.data[key]));
  return <>{entries.length ? entries.join(" · ") : (locale === "ar" ? "طلب من الموقع" : "Website request")}</>;
}

function leadTypeLabel(type: Lead["type"], locale: Locale) {
  const labels = locale === "ar"
    ? { staffing: "توظيف", training: "تدريب", parttime: "عمل جزئي", service: "خدمة", contact: "تواصل", listing: "فرصة", partner: "شريك" }
    : { staffing: "Staffing", training: "Training", parttime: "Part-time", service: "Service", contact: "Contact", listing: "Listing", partner: "Partner" };
  return labels[type];
}
