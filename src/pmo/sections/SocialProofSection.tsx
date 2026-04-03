import { CustomerProofBlock } from '../components/CustomerProofBlock'

/**
 * Customer proof: quote + G2 band. Outcome metrics live in CustomerOutcomesSection at page bottom.
 */
export function SocialProofSection() {
  return (
    <section id="social-proof" className="scroll-mt-24 bg-white px-4 py-10 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto max-w-[960px]">
        <CustomerProofBlock />
      </div>
    </section>
  )
}
