import "server-only";

import { promises as fs } from "fs";
import path from "path";
import type { Lead, LeadStatus, LeadType } from "@/lib/types";

const LOCAL_DATA_FILE = path.join(process.cwd(), ".data", "leads.json");
const VALID_STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

function hasSupabase() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// الحفظ مش لازم يستنى Service Role: جدول leads عليه سياسة RLS بتسمح للزائر (anon) بالإضافة بس
// (من غير قراءة أو تعديل). كده الطلبات بتتحفظ في قاعدة البيانات حتى لو SUPABASE_SERVICE_ROLE_KEY
// مش متضاف في Vercel — بدل ما تقع على ملف محلي، وده على Vercel بيفشل (نظام ملفات للقراءة فقط).
function canInsertWithAnon() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function anonHeaders() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

async function readLocalLeads(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_DATA_FILE, "utf8")) as Lead[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeLocalLeads(leads: Lead[]) {
  await fs.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  await fs.writeFile(LOCAL_DATA_FILE, JSON.stringify(leads, null, 2), "utf8");
}

export async function createLead(input: {
  type: LeadType;
  source: string;
  page: string;
  service?: string;
  locale: Lead["locale"];
  contactPhone: string;
  data: Lead["data"];
  utm?: Record<string, string>;
}): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = {
    id: crypto.randomUUID(),
    ...input,
    status: "New",
    utm: input.utm || {},
    createdAt: now,
    updatedAt: now,
  };

  if (hasSupabase() || canInsertWithAnon()) {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads`;
    const response = await fetch(url, {
      method: "POST",
      // مع anon لازم return=minimal لأن الزائر مالوش صلاحية قراءة الجدول
      headers: hasSupabase()
        ? { ...supabaseHeaders(), Prefer: "return=representation" }
        : { ...anonHeaders(), Prefer: "return=minimal" },
      body: JSON.stringify({
        id: lead.id,
        type: lead.type,
        source: lead.source,
        page: lead.page,
        service: lead.service || null,
        status: lead.status,
        locale: lead.locale,
        contact_phone: lead.contactPhone,
        data: lead.data,
        utm: lead.utm,
        created_at: lead.createdAt,
        updated_at: lead.updatedAt,
      }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`supabase_insert_failed:${response.status}`);
    return lead;
  }

  const leads = await readLocalLeads();
  leads.unshift(lead);
  await writeLocalLeads(leads);
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  if (hasSupabase()) {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc&limit=500`;
    const response = await fetch(url, { headers: supabaseHeaders(), cache: "no-store" });
    if (!response.ok) throw new Error(`supabase_read_failed:${response.status}`);
    const rows = (await response.json()) as Array<Record<string, unknown>>;
    return rows.map((row) => ({
      id: String(row.id),
      type: row.type as LeadType,
      source: String(row.source),
      page: String(row.page),
      service: row.service ? String(row.service) : undefined,
      status: row.status as LeadStatus,
      locale: row.locale as Lead["locale"],
      contactPhone: String(row.contact_phone),
      data: row.data as Lead["data"],
      utm: (row.utm || {}) as Record<string, string>,
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
    }));
  }
  return readLocalLeads();
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  if (!VALID_STATUSES.includes(status)) throw new Error("invalid_status");
  const updatedAt = new Date().toISOString();

  if (hasSupabase()) {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads?id=eq.${encodeURIComponent(id)}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { ...supabaseHeaders(), Prefer: "return=representation" },
      body: JSON.stringify({ status, updated_at: updatedAt }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`supabase_update_failed:${response.status}`);
    const rows = (await response.json()) as Array<Record<string, unknown>>;
    if (!rows[0]) return null;
    const all = await listLeads();
    return all.find((lead) => lead.id === id) || null;
  }

  const leads = await readLocalLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], status, updatedAt };
  await writeLocalLeads(leads);
  return leads[index];
}
