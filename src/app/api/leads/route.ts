import { NextResponse } from "next/server";
import { createLead, updateLeadStatus } from "@/lib/server/lead-store";
import type { LeadStatus, LeadType } from "@/lib/types";
import { allowRequest, isLikelySpam } from "@/lib/server/request-security";

const allowedTypes: LeadType[] = ["staffing", "training", "parttime", "service", "contact", "listing", "partner"];
const allowedStatuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];
const phonePattern = /^[+\d][\d\s()-]{7,20}$/;

function cleanText(value: unknown, max = 1000) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    if (!allowRequest(request, "leads")) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    const body = (await request.json()) as Record<string, unknown>;
    const type = cleanText(body.type, 30) as LeadType;
    const contactPhone = cleanText(body.contactPhone, 24);
    const supportedLocales = ["ar", "en", "ru", "hi", "ur", "bn", "tr"] as const;
    const locale = supportedLocales.includes(body.locale as (typeof supportedLocales)[number])
      ? body.locale as (typeof supportedLocales)[number]
      : "ar";
    if (!allowedTypes.includes(type) || !phonePattern.test(contactPhone)) {
      return NextResponse.json({ ok: false, error: "invalid_required_fields" }, { status: 400 });
    }

    const rawData = body.data && typeof body.data === "object" ? (body.data as Record<string, unknown>) : {};
    if (body.website || rawData.website || isLikelySpam(Object.values(rawData))) return NextResponse.json({ ok: false, error: "spam_rejected" }, { status: 400 });
    const data = Object.fromEntries(
      Object.entries(rawData).slice(0, 40).map(([key, value]) => [
        cleanText(key, 80),
        Array.isArray(value) ? value.slice(0, 20).map((item) => cleanText(item, 200)) : cleanText(value, 1500),
      ])
    );
    const rawUtm = body.utm && typeof body.utm === "object" ? (body.utm as Record<string, unknown>) : {};
    const utm = Object.fromEntries(Object.entries(rawUtm).slice(0, 10).map(([key, value]) => [cleanText(key, 50), cleanText(value, 200)]));

    const lead = await createLead({
      type,
      source: cleanText(body.source || "website", 100),
      page: cleanText(body.page || request.headers.get("referer") || "unknown", 500),
      service: cleanText(body.service, 120) || undefined,
      locale,
      contactPhone,
      data,
      utm,
    });
    return NextResponse.json({ ok: true, id: lead.id, status: lead.status }, { status: 201 });
  } catch (error) {
    console.error("lead_creation_failed", error);
    return NextResponse.json({ ok: false, error: "lead_creation_failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (process.env.ADMIN_PASSWORD) {
      const expectedUser = process.env.ADMIN_USERNAME || "admin";
      const expected = `Basic ${btoa(`${expectedUser}:${process.env.ADMIN_PASSWORD}`)}`;
      if (request.headers.get("authorization") !== expected) {
        return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
      }
    }
    const body = (await request.json()) as { id?: string; status?: LeadStatus };
    if (!body.id || !body.status || !allowedStatuses.includes(body.status)) {
      return NextResponse.json({ ok: false, error: "invalid_update" }, { status: 400 });
    }
    const lead = await updateLeadStatus(body.id, body.status);
    if (!lead) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error("lead_update_failed", error);
    return NextResponse.json({ ok: false, error: "lead_update_failed" }, { status: 500 });
  }
}
