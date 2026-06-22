import { 
  HeroSection, 
  FeaturesBar,
  TrustSection,
  CategoriesSection,
  FeaturedProducts,
  RecommendedBundlesSection,
  ProcurementSection,
  ChoosePathSection,
  ServicesSection,
  BlogPreviewSection,
  CTASection 
} from "@/components/home-sections"
import {
  ComplianceSection,
  IndustryUseScenarios,
  OemCapabilityProofBlock,
} from "@/components/trust/industry-trust-sections"

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
      <RecommendedBundlesSection />
      <IndustryUseScenarios />
      <ProcurementSection />
      <ComplianceSection />
      <OemCapabilityProofBlock />
      <ChoosePathSection />
      <ServicesSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  )
}
