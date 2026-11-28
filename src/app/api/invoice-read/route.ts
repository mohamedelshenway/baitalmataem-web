import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const SB = "https://fstbbuattdhoszklobio.supabase.co";
const ANON = process.env.NEXT_PUBLIC_LC_ANON ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdGJidWF0dGRob3N6a2xvYmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3MzM5NTYsImV4cCI6MjExMDMwOTk1Nn0.olJT0fYgtUPGSCtLKSeBCUheqe99-wm4PE50EOtcUzs";
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type", "Access-Control-Allow-Methods": "POST,OPTIONS" };

export function OPTIONS() { return new NextResponse(null, { headers: CORS }); }

type Item = { code: string; name: string; unit: string; pack?: number | null };

export async function POST(req: Request) {
  const fail = (m: string, s = 400) => NextResponse.json({ ok: false, error: m }, { status: s, headers: CORS });
  try {
    const b = await req.json() as { token?: string; image?: string; items?: Item[]; suppliers?: string[] };
    if (!b.token || !/^[0-9a-f-]{36}$/i.test(b.token)) return fail("انتهت الجلسة", 401);
    if (!b.image || !/^data:image\/jpeg;base64,/.test(b.image) || b.image.length > 4_000_000) return fail("صورة الفاتورة مش واضحة");
    // verify the kitchen session
    const v = await fetch(`${SB}/rest/v1/rpc/lc_item_packs`, { method: "POST", headers: { apikey: ANON, Authorization: `Bearer ${ANON}`, "Content-Type": "application/json" }, body: JSON.stringify({ p_token: b.token }) });
    if (!v.ok) return fail("انتهت الجلسة، ادخل تاني", 401);

    const items = (b.items || []).slice(0, 400).map(i => `${i.code} | ${i.name} | ${i.unit}${i.pack ? ` | الكرتونة=${i.pack}` : ""}`).join("\n");
    const sups = (b.suppliers || []).slice(0, 200).join("، ");
    const prompt = `دي صورة فاتورة مورد لمطعم في السعودية. اقرأها بدقة ورجّع JSON بس، بالشكل ده:
{"supplier":"اسم المورد","supplier_match":"اسم من قائمة الموردين لو هو نفسه وإلا null","invoice_no":"رقم الفاتورة أو null","date":"YYYY-MM-DD أو null","pay":"كاش أو آجل أو null","net":إجمالي قبل الضريبة أو null,"vat":الضريبة أو null,"gross":الإجمالي بعد الضريبة أو null,
"lines":[{"text":"اسم الصنف زي ما هو مكتوب","code":"كود الصنف المطابق من قائمة الأصناف أو null","inv_qty":الكمية على الفاتورة,"inv_unit":"وحدة الفاتورة (كرتون/كيلو/حبة...)","pack":كام وحدة من وحدة الصنف في الكرتونة/العبوة لو مكتوب أو معروف من القائمة أو null,"qty":الكمية بوحدة الصنف في القائمة (مثلا كيلو) أو null لو مش معروفة,"unit_price":سعر وحدة الصنف في القائمة بدون ضريبة أو null,"line_total":إجمالي السطر بدون ضريبة,"confidence":"high أو low"}]}
قواعد:
- الأسعار بدون ضريبة القيمة المضافة. لو الفاتورة بتكتب السعر شامل الضريبة اقسم على 1.15.
- لو الصنف بالكرتون والكرتونة وزنها مكتوب (مثلا 10 كجم أو 12×1 لتر) احسب qty = عدد الكراتين × الوزن، و unit_price = سعر الكرتونة ÷ الوزن.
- لو مش متأكد من المطابقة أو الوزن خلي confidence = low وماتخمنش أرقام مش موجودة.
- الأرقام أرقام إنجليزي بدون فواصل.
قائمة الموردين: ${sups || "مفيش"}
قائمة الأصناف (كود | اسم | الوحدة):
${items}`;

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
