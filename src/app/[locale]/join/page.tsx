import Link from "next/link";
import JoinForm from "./join-form";

export const metadata = {
  title: "سجل بياناتك | بيت المطاعم",
  description: "سجل بياناتك مع بيت المطاعم — سواء كنت صاحب مطعم، صاحب كافيه، أو مستثمر مهتم بالاستثمار في العقارات",
};

export default function JoinPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/${params.locale}`} className="font-bold text-[#151515]">
            بيت المطاعم
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#151515]">سجل بياناتك معنا</h1>
          <p className="text-sm text-[#151515]/60 mt-2">
            خطوة واحدة، ونتواصل معك بما يناسب احتياجك
          </p>
        </div>

        <JoinForm />
      </main>
    </div>
  );
}
