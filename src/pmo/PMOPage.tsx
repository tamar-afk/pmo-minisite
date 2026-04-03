import { CustomCursor } from './components/CustomCursor'
import { PageChrome } from './components/PageChrome'
import { Nav } from './components/Nav'
import { PageScrollReveal } from './components/PageScrollReveal'
import { ScrollProgress } from './components/ScrollProgress'
import { SectionDivider } from './components/SectionDivider'
import { AIAgents } from './sections/AIAgents'
import { BuildProjectAppSection } from './sections/BuildProjectAppSection'
import { PlatformBentoSection } from './sections/PlatformBentoSection'
import { SocialProofSection } from './sections/SocialProofSection'
import { EnterpriseSecuritySection } from './sections/EnterpriseSecuritySection'
import { FAQSection } from './sections/FAQSection'
import CapabilityLayers from './components/CapabilityLayers'
import { FeatureTabsSection } from './sections/FeatureTabsSection'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { LogoBarSection } from './sections/LogoBarSection'
import { McpSection } from './sections/McpSection'
import { ResourceManagementSection } from './sections/ResourceManagementSection'

export function PMOPage() {
  return (
    <div className="relative min-h-screen">
      <PageChrome />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <LogoBarSection />
        <SectionDivider />
        <PageScrollReveal>
          <AIAgents />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <CapabilityLayers />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <FeatureTabsSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <ResourceManagementSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <McpSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <SocialProofSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <PlatformBentoSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <BuildProjectAppSection />
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
          <FinalCta />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <Footer />
        </PageScrollReveal>
      </main>
    </div>
  )
}
