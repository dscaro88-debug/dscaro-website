import { 
  HeroSection, 
  FeaturesBar,
  TrustSection,
  CategoriesSection,
  FeaturedProducts,
  ProcurementSection,
  ChoosePathSection,
  ServicesSection,
  BlogPreviewSection,
  CTASection 
} from "@/components/home-sections"

export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <>
      {/* BUILD: 2026-06-10-v4 — force fresh deploy */}
      <HeroSection />
      <FeaturesBar />
      <TrustSection />
      <CategoriesSection />
      <FeaturedProducts />
      <ProcurementSection />
      <ChoosePathSection />
      <ServicesSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  )
}
