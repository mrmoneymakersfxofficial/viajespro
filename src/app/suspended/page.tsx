import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitio Suspendido | Viajeros VIP",
  description: "Este sitio web se encuentra temporalmente suspendido por motivos administrativos.",
  robots: { index: false, follow: false },
};

export default function SuspendedPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Lock icon */}
      <div className="relative mb-10">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gold-muted flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-gold-base"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        {/* Subtle glow behind lock */}
        <div className="absolute inset-0 rounded-full bg-gold-base/5 blur-2xl -z-10" />
      </div>

      {/* Heading */}
      <h1 className="font-vip text-gold-base text-2xl sm:text-3xl md:text-4xl tracking-widest text-center mb-6">
        Sitio temporalmente suspendido
      </h1>

      {/* Divider */}
      <div className="divider-gold w-48 sm:w-64 mb-8" />

      {/* Description */}
      <p className="text-zinc-400 text-center max-w-md text-sm sm:text-base leading-relaxed mb-12">
        Este sitio web se encuentra temporalmente suspendido por motivos
        administrativos.
        <br className="hidden sm:block" />{" "}
        Si usted es el propietario y desea restablecer el servicio, comuníquese
        con FastPagePro.
      </p>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/51933667414?text=Hola%20FastPagePro,%20soy%20el%20propietario%20del%20sitio%20web.%20Mi%20p%C3%A1gina%20se%20encuentra%20temporalmente%20suspendida.%20Solicito%20informaci%C3%B3n%20para%20restablecer%20el%20servicio.%20Gracias."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-gold-base hover:bg-gold-dark text-[#0a0a0a] font-semibold text-sm sm:text-base tracking-wide px-8 py-3.5 sm:px-10 sm:py-4 transition-colors duration-200 group"
      >
        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Contactar por WhatsApp
      </a>

      {/* Footer */}
      <footer className="absolute bottom-8 text-center">
        <p className="text-zinc-600 text-xs sm:text-sm tracking-wide">
          Desarrollado por{" "}
          <span className="text-gold-base/70 font-semibold">FastPagePro</span>
        </p>
      </footer>
    </main>
  );
}