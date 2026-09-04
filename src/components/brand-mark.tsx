// شعار بيت المطاعم — رمز هندسي بسيط يجمع بين شكل "البيت" (خط السقف المثلث)
// وأسنان الشوكة (الثلاث قضبان أسفله)، بألوان الهوية البصرية للموقع (Deep Restaurant Red + Warm Gold).
// راجع docs/DESIGN_SYSTEM.md لبقية عناصر الهوية. يُستخدم كرمز مصاحب لاسم الشركة، وليس بديلاً عنه.

const TONE = {
  // للاستخدام على خلفيات فاتحة (الهيدر، الصفحات البيضاء)
  brand: { roof: "#8b1e24", tines: "#b08a44" },
  // للاستخدام على خلفيات داكنة (الفوتر، القطاعات الداكنة)
  inverted: { roof: "#c8a45d", tines: "#c8a45d" },
} as const;

export function BrandMark({
  className = "h-9 w-9",
  tone = "brand",
}: {
  className?: string;
  tone?: keyof typeof TONE;
}) {
  const { roof, tines } = TONE[tone];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <polygon points="32,12 14,36 50,36" fill={roof} />
      <rect x="19" y="40" width="6" height="12" rx="3" fill={tines} />
      <rect x="29" y="40" width="6" height="15" rx="3" fill={tines} />
      <rect x="39" y="40" width="6" height="12" rx="3" fill={tines} />
    </svg>
  );
}
