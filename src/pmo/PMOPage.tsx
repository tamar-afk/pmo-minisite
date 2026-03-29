import { Nav } from './components/Nav'
import { SectionDivider } from './components/SectionDivider'
import { AIAgents } from './sections/AIAgents'
import { BuildProjectAppSection } from './sections/BuildProjectAppSection'
import { PlatformBentoSection } from './sections/PlatformBentoSection'
import { SocialProofSection } from './sections/SocialProofSection'
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
      <Nav />
      <main>
        <Hero />
        <SectionDivider />
        <FeatureTabsSection />
        <SectionDivider />
        <AIAgents />
        <SectionDivider />
        <ResourceManagementSection />
        <SectionDivider />
        <SocialProofSection />
        <SectionDivider />
        <PlatformBentoSection />
        <SectionDivider />
        <CapabilityLayers />
        <SectionDivider />
        <BuildProjectAppSection />
        <SectionDivider />
        <McpSection />
        <SectionDivider />
        <FinalCta />
        <SectionDivider />
        <FAQSection />
        <Footer />
      </main>
    </div>
  )
}
