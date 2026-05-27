import { notFound } from "next/navigation";
import { Metadata } from "next";
import { destinations, siteConfig } from "@/data/content";
import DestinationPageClient from "./DestinationPageClient";

// ─── Static Params for SSG ────────────────────────────────
export function generateStaticParams() {
  return destinations.map((dest) => ({
    slug: dest.slug.es,
  }));
}

// ─── Dynamic Metadata for SEO ──────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find(
    (d) => d.slug.es === slug || d.slug.en === slug
  );

  if (!dest) {
    return { title: "Destino no encontrado" };
  }

  return {
    title: `${dest.title.es} | ViajesPRO`,
    description: dest.description.es,
    openGraph: {
      title: `${dest.title.es} | ViajesPRO`,
      description: dest.description.es,
      url: `https://viajespro.vercel.app/destinos/${slug}`,
      images: [{ url: dest.image, width: 1200, height: 630 }],
    },
  };
}

// ─── Page Component ────────────────────────────────────────
export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = destinations.find(
    (d) => d.slug.es === slug || d.slug.en === slug
  );

  if (!dest) {
    notFound();
  }

  return <DestinationPageClient dest={dest} />;
}
