import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const SB = "https://fstbbuattdhoszklobio.supabase.co";
const ANON = process.env.NEXT_PUBLIC_LC_ANON ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdGJidWF0dGRob3N6a2xvYmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3MzM5NTYsImV4cCI6MjExMDMwOTk1Nn0.olJT0fYgtUPGSCtLKSeBCUheqe99-wm4PE50EOtcUzs";
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type", "Access-Control-Allow-Methods": "POST,OPTIONS" };

export function OPTIONS() { return new NextResponse(null, { headers: CORS }); }

type Mine = { name: string; qty: number; unit: string };

export async function POST(req: Request) {
  const fail = (m: string, s = 400) => NextResponse.json({ ok: false, error: m }, { status: s, headers: CORS });
  try {
    const b = await req.json() as { token?: string; image?: string; mine?: Mine[]; suppliers?: string[] };
    if (!b.token || !/^[0-9a-f-]{36}$/i.test(b.token)) return fail("انتهت الجلسة", 401);
    if (!b.image || !/^data:image\/jpeg;base64,/.test(b.image) || b.image.length > 4_000_000) return fail("صورة الفاتورة مش واضحة");
    // verify the kitchen session
    const v = await fetch(`${SB}/rest/v1/rpc/lc_item_packs`, { method: "POST", headers: { apikey: ANON, Authorization: `Bearer ${ANON}`, "Content-Type": "application/json" }, body: JSON.stringify({ p_token: b.token }) });
    if (!v.ok) return fail("انتهت الجلسة، ادخل تاني", 401);

    const mine = (b.mine || []).slice(0, 60).map((m, i) => `${i} | ${String(m.name).slice(0, 80)} | ${m.qty} ${m.unit}`).join("\n");
    const sups = (b.suppliers || []).slice(0, 200).join("، ");
    const prompt = `دي صورة فاتورة مورد لمطعم في السعودية، والمطبخ استلم البضاعة وسجّل الأصناف والكميات اللي وصلت فعلًا (تحت).
اقرأ الفاتورة بدقة، وطابق كل صنف من أصناف المطبخ مع سطره في الفاتورة حتى لو الاسم مكتوب بشكل مختلف (مثلا «صدور دجاج» = «فيليه صدر»، «دجاج» = «فراخ»).
رجّع JSON بس، بالشكل ده:
{"supplier":"اسم المورد زي ما هو على الفاتورة","supplier_match":"اسم من قائمة الموردين لو هو نفسه وإلا null","invoice_no":"رقم الفاتورة أو null","date":"YYYY-MM-DD أو null","pay":"كاش أو آجل أو null","net":الإجمالي قبل الضريبة أو null,"vat":الضريبة أو null,"gross":الإجمالي بعد الضريبة أو null,
"mine":[{"i":رقم سطر المطبخ,"found":true أو false,"inv_text":"اسم الصنف على الفاتورة","unit_price":سعر الوحدة بوحدة المطبخ بدون ضريبة,"inv_qty":الكمية على الفاتورة محوّلة لوحدة المطبخ أو null}],
"extra":[{"text":"صنف على الفاتورة مش موجود في استلام المطبخ","qty":الكمية,"unit":"الوحدة","line_total":إجمالي السطر بدون ضريبة}]}
قواعد:
- الأسعار بدون ضريبة القيمة المضافة. لو السعر على الفاتورة شامل الضريبة اقسم على 1.15.
- لو الفاتورة بالكرتون ووحدة المطبخ كجم: unit_price = سعر الكرتونة ÷ وزن الكرتونة، و inv_qty = عدد الكراتين × الوزن. لو وزن الكرتونة مش مكتوب، استخدم: unit_price = إجمالي السطر ÷ كمية المطبخ.
- لو صنف المطبخ مش لاقيه على الفاتورة خليه found=false و unit_price=null. ماتخمنش.
- الأرقام أرقام إنجليزي بدون فواصل.
قائمة الموردين: ${sups || "مفيش"}
استلام المطبخ (رقم | الصنف | الكمية):
${mine}`;

    const key = process.env.AI_GATEWAY_API_KEY || req.headers.get("x-vercel-oidc-token") || process.env.VERCEL_OIDC_TOKEN;
    if (!key) return fail("قراءة الفواتير مش متفعلة على السيرفر", 500);
    const r = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.INVOICE_MODEL || "google/gemini-2.5-flash",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: b.image } }] }],
      }),
    });
    const t = await r.text();
    if (!r.ok) { console.error("gateway", r.status, t.slice(0, 500)); return fail("ماقدرتش أقرا الفاتورة دلوقتي، حاول تاني أو دخّلها يدوي", 502); }
    const j = JSON.parse(t);
    let txt: string = j.choices?.[0]?.message?.content || "";
    txt = txt.replace(/^```(json)?/i, "").replace(/```$/, "").trim();
    const data = JSON.parse(txt);
    return NextResponse.json({ ok: true, data }, { headers: CORS });
  } catch (e) {
    console.error(e);
    return fail("ماقدرتش أقرا الفاتورة، صوّرها تاني أوضح", 500);
  }
}
