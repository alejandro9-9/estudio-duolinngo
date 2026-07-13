import Link from "next/link";

export default function HomeLanding() {
  return (
    <div className="flex-1 min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-[#131f24] text-[#eeeeee]">
      <h1 className="text-3xl font-extrabold text-center max-w-md">
        Descubre tu nivel de estudio
      </h1>
      <Link
        href="/test"
        className="block w-full max-w-xs text-center bg-[#58cc02] border-b-4 border-[#46a302] text-white py-4 rounded-2xl font-extrabold text-lg uppercase tracking-wider hover:bg-[#61e002] transition duration-200"
      >
        Empezar
      </Link>
    </div>
  );
}
