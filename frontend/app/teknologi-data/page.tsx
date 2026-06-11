import GradientBg from '../../components/gradient-bg';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function TeknologiDataPage() {
  return (
    <GradientBg>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 text-white sm:px-6 lg:py-16">
        <h1 className="text-4xl font-bold">Pusat Teknologi & Data</h1>
        <p className="mt-4 text-slate-300">
          Kumpulan sumber data, API, dan dokumentasi terkait Smart Magelang dan integrasi sistem.
        </p>

        <section className="mt-8 space-y-6">
          <article className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold">API Publik</h2>
            <p className="mt-2 text-slate-300">
              Endpoint: <code className="rounded bg-slate-800 px-2 py-0.5">/api/*</code> — gunakan
              untuk mengambil data Wisata, Kuliner, dan Event.
            </p>
          </article>

          <article className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold">Sumber Data</h2>
            <ul className="mt-2 list-inside list-disc text-slate-300">
              <li>Open Data Pemerintah Kota Magelang</li>
              <li>Kontribusi komunitas (Community Form)</li>
              <li>Integrasi pihak ketiga (Google Maps, Wikimedia)</li>
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </GradientBg>
  );
}
