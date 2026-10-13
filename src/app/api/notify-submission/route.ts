import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildNotifyMessage, type SubmissionStatus } from "@/lib/submission-notify";

/**
 * إشعار صاحب الفرصة بالإيميل بنتيجة طلبه (قبول / رفض / طلب تعديل).
 * للفريق فقط (admin / editor). يحتاج متغير بيئة RESEND_API_KEY على Vercel؛
 * لو مش مضبوط بيرجع not_configured والواجهة بتفتح رسالة إيميل جاهزة بدل الإرسال التلقائي.
 */
const SUBJECTS: Record<string, string> = {
  approved: "تم قبول فرصتك لدى بيت المطاعم",
  rejected: "بخصوص فرصتك المعروضة لدى بيت المطاعم",
  changes_requested: "مطلوب تعديل بسيط على فرصتك لدى بيت المطاعم",
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["admin", "editor"].includes(profile.role)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let submissionId = "";
  try {
    submissionId = String((await request.json()).submissionId ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { data: sub } = await supabase
    .from("listing_submissions")
    .select("id, status, raw_data, admin_note")
    .eq("id", submissionId)
    .single();
  if (!sub) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  const raw = (sub.raw_data ?? {}) as Record<string, string | null>;
  const email = raw.contactEmail;
  if (!email) return NextResponse.json({ ok: false, error: "no_email" }, { status: 422 });
  if (!SUBJECTS[sub.status]) return NextResponse.json({ ok: false, error: "no_decision_yet" }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 501 });

  const opportunity = [raw.activityType, raw.city].filter(Boolean).join(" – ");
  const text = buildNotifyMessage({
    status: sub.status as SubmissionStatus,
    name: raw.contactName,
    opportunity,
    adminNote: sub.admin_note,
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM_EMAIL || "بيت المطاعم <onboarding@resend.dev>",
      to: [email],
      subject: SUBJECTS[sub.status],
      text,
    }),
  });
  if (!res.ok) {
    console.error("[api/notify-submission] resend failed", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  await supabase.from("listing_submissions").update({ notified_at: new Date().toISOString() }).eq("id", sub.id);
  return NextResponse.json({ ok: true });
}
