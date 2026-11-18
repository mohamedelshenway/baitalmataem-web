import Link from "next/link";
import { FOCUS_CITIES } from "@/lib/data/focus-cities";

export default function NotFound() {
  return (
    <section className="py-20">
      <div className="container-page text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="mb-3 text-2xl font-bold text-ink-900 sm:text-3xl">الصفحة غير موجودة</h1>
        <p className="mx-auto mb-8 max-w-xl leading-8 text-ink-600">
          الرابط ده غير صحيح أو الصفحة اتنقلت. تقدر تكمل من أي صفحة من دول:
        </p>
        <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-3">
          <Link href="/ar" className="focus-ring rounded-btn bg-ember-600 px-5 py-2.5 text-sm font-semibold text-white">الرئيسية</Link>
          <Link href="/ar/services" className="focus-ring rounded-btn border border-sand-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800">الخدمات</Link>
          <Link href="/ar/marketplace" className="focus-ring rounded-btn border border-sand-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800">سوق الفرص</Link>
          <Link href="/ar/contact" className="focus-ring rounded-btn border border-sand-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800">تواصل معنا</Link>
        </div>
        <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-4 text-sm">
          {FOCUS_CITIES.map((c) => (
            <Link key={c.slug} href={`/ar/areas/${c.slug}`} className="focus-ring font-semibold text-ember-600">
              {c.nameAr}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
