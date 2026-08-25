/**
 * محوّل بسيط جدًا لنص المدونة (Markdown-lite: فقرات مفصولة بسطر فارغ، وعناوين تبدأ بـ ##).
 * ليس محرك Markdown كامل — يكفي فقط لشكل مقالات بيت المطاعم الحالية.
 * يُرجّع مصفوفة عناصر { type, text } ليتم عرضها في مكوّن React بدل حقن HTML خام.
 */
export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export function parseContent(raw: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const chunks = raw.trim().split(/\n\s*\n/);

  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.replace(/^##\s+/, "") });
      continue;
    }

    const lines = trimmed.split("\n").map((l) => l.trim());
    const isList = lines.every((l) => l.startsWith("- "));
    if (isList) {
      blocks.push({ type: "ul", items: lines.map((l) => l.replace(/^-\s+/, "")) });
      continue;
    }

    blocks.push({ type: "p", text: trimmed });
  }

  return blocks;
}
