import { CustomCursor } from './components/CustomCursor'
import PlatformFeatureMatrix from './components/PlatformFeatureMatrix'
import { PageChrome } from './components/PageChrome'
import { Nav } from './components/Nav'
import { PageScrollReveal } from './components/PageScrollReveal'
import { ScrollProgress } from './components/ScrollProgress'
import { SectionDivider } from './components/SectionDivider'
import { AIAgents } from './sections/AIAgents'
import { BuildProjectAppSection } from './sections/BuildProjectAppSection'
import { CaseStudiesSection } from './sections/CaseStudiesSection'
import { PlatformBentoSection } from './sections/PlatformBentoSection'
import { FAQSection } from './sections/FAQSection'
import { FeatureTabsSection } from './sections/FeatureTabsSection'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { LogoBarSection } from './sections/LogoBarSection'
import { McpSection } from './sections/McpSection'

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
          <FeatureTabsSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <CaseStudiesSection />
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
          <McpSection />
        </PageScrollReveal>
        <SectionDivider />
        <PageScrollReveal>
          <PlatformFeatureMatrix />
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
