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

export const revalidate = 3600

export default function HomePage() {
  return (
    <>
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
