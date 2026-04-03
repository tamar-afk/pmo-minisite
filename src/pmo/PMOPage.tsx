import { CustomCursor } from './components/CustomCursor'
import PlatformFeatureMatrix from './components/PlatformFeatureMatrix'
import { PageChrome } from './components/PageChrome'
import { Nav } from './components/Nav'
import { PageScrollReveal } from './components/PageScrollReveal'
import { ScrollProgress } from './components/ScrollProgress'
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
    <div className="relative min-h-screen bg-[#ffffff]">
      <PageChrome />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <div className="pmo-main-flow">
          <Hero />
          <LogoBarSection />
          <PageScrollReveal>
            <AIAgents />
          </PageScrollReveal>
          <PageScrollReveal>
            <FeatureTabsSection />
          </PageScrollReveal>
          <PageScrollReveal>
            <PlatformFeatureMatrix />
          </PageScrollReveal>
          <PageScrollReveal>
            <BuildProjectAppSection />
          </PageScrollReveal>
          <PageScrollReveal>
            <PlatformBentoSection />
          </PageScrollReveal>
          <PageScrollReveal>
            <CaseStudiesSection />
          </PageScrollReveal>
          <PageScrollReveal>
            <McpSection />
          </PageScrollReveal>
          <PageScrollReveal>
            <FAQSection />
          </PageScrollReveal>
          <PageScrollReveal>
            <FinalCta />
          </PageScrollReveal>
          <Footer />
        </div>
      </main>
    </div>
  )
}
