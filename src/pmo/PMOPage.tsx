import { Nav } from './components/Nav'
import { PageScrollReveal } from './components/PageScrollReveal'
import { ScrollProgress } from './components/ScrollProgress'
import { SectionDivider } from './components/SectionDivider'
import { AIAgents } from './sections/AIAgents'
import { BuildProjectAppSection } from './sections/BuildProjectAppSection'
import { PlatformBentoSection } from './sections/PlatformBentoSection'
import { SocialProofSection } from './sections/SocialProofSection'
import { CustomerOutcomesSection } from './sections/CustomerOutcomesSection'
import { EnterpriseSecuritySection } from './sections/EnterpriseSecuritySection'
import { FAQSection } from './sections/FAQSection'
import CapabilityLayers from './components/CapabilityLayers'
import { FeatureTabsSection } from './sections/FeatureTabsSection'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { McpSection } from './sections/McpSection'
import { ResourceManagementSection } from './sections/ResourceManagementSection'

export function PMOPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <SectionDivider />
        <PageScrollReveal>
          <FeatureTabsSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <AIAgents />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <ResourceManagementSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <SocialProofSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <CapabilityLayers />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <PlatformBentoSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <CustomerOutcomesSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <BuildProjectAppSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <McpSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <FinalCta />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <EnterpriseSecuritySection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <FAQSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <Footer />
        </PageScrollReveal>
      </main>
    </div>
  )
}
