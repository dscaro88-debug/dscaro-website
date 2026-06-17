import { Metadata } from "next"
import Link from "next/link"
import { FileText, Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms & Conditions | DS CARO",
  description:
    "DS CARO terms and conditions for B2B wholesale trade. Product orders, payment terms, shipping, quality warranty, and legal information for European importers and distributors.",
  openGraph: {
    title: "Terms & Conditions | DS CARO",
    description:
      "Review DS CARO's B2B trade terms: payment methods, shipping, quality warranty, and legal framework for wholesale senior care product orders.",
  },
}

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container-wide text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Last updated: May 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Acceptance of Terms */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  By accessing or using the DS CARO website, placing an order, or entering into a business
                  relationship with DS CARO (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
                  you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part
                  of these terms, you may not use our services.
                </p>
                <p>
                  These terms apply to all B2B transactions, including trade account holders, wholesale buyers,
                  importers, distributors, and other business partners. We reserve the right to modify these
                  terms at any time. Changes will be effective immediately upon posting to this page.
                </p>
              </div>
            </section>

            {/* Products & Orders */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                2. Products &amp; Orders
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  DS CARO is a <strong>B2B-only supplier</strong>. We do not sell directly to end consumers.
                  All orders must be placed by verified business entities with valid trade credentials.
                </p>
                <h3 className="font-semibold text-foreground text-lg mt-4">Minimum Order Quantity (MOQ)</h3>
                <p>
                  Each product has a specified Minimum Order Quantity (MOQ), typically ranging from 50 to 200
                  units depending on the product category. Custom OEM/ODM orders may have different MOQ
                  requirements. Please refer to individual product pages or contact our sales team for details.
                </p>
                <h3 className="font-semibold text-foreground text-lg mt-4">Pricing</h3>
                <p>
                  All prices listed are in USD FOB Ningbo/Shanghai unless otherwise stated. Prices
                  are subject to change without prior notice due to fluctuations in raw material costs, exchange
                  rates, or other market conditions. Quotations are valid for 30 days from the date of issue.
                </p>
                <h3 className="font-semibold text-foreground text-lg mt-4">Order Confirmation</h3>
                <p>
                  A Proforma Invoice (PI) will be issued upon order confirmation. Orders are not considered
                  final until the PI is acknowledged and deposit payment is received.
                </p>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                3. Payment Terms
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We accept the following payment methods for B2B transactions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>T/T (Telegraphic Transfer)</strong> — 30% deposit upon order confirmation, 70% balance
                    before shipment or against copy of shipping documents.
                  </li>
                  <li>
                    <strong>L/C (Letter of Credit)</strong> — Irrevocable L/C at sight from a reputable bank.
                    Subject to approval and bank charges borne by the buyer.
                  </li>
                  <li>
                    <strong>Western Union</strong> — Available for sample orders and small transactions under
                    USD 1,000.
                  </li>
                  <li>
                    <strong>PayPal</strong> — Available for sample orders. PayPal fees are borne by the buyer (typically 4-5% of transaction value).
                  </li>
                </ul>
                <p>
                  All bank charges, including intermediary and beneficiary bank fees for T/T transfers, are the
                  responsibility of the buyer. Payments must reference the Proforma Invoice number.
                </p>
              </div>
            </section>

            {/* Shipping & Delivery */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                4. Shipping &amp; Delivery
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Standard production lead time is <strong>15-25 days</strong> after receipt of deposit and
                  confirmation of all order specifications. Lead times may vary for OEM/ODM orders depending
                  on customization complexity.
                </p>
                <h3 className="font-semibold text-foreground text-lg mt-4">Incoterms</h3>
                <p>
                  Unless otherwise agreed in writing, all shipments are made under <strong>FOB</strong> (Free On
                  Board) terms from Ningbo or Shanghai port, China. The buyer is responsible for freight,
                  insurance, and import customs clearance. CIF, CFR, and DDP terms are available upon request.
                </p>
                <h3 className="font-semibold text-foreground text-lg mt-4">Delivery Estimates</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sea freight to major EU ports (Hamburg, Rotterdam, Antwerp): 25-35 days transit</li>
                  <li>Air freight: 5-7 days transit (for urgent or sample orders)</li>
                  <li>Express courier (DHL, FedEx, UPS): 5-7 days for sample shipments</li>
                </ul>
                <p>
                  DS CARO is not liable for delays caused by customs clearance, port congestion, force majeure,
                  or other circumstances beyond our reasonable control.
                </p>
              </div>
            </section>

            {/* Quality & Warranty */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                5. Quality &amp; Warranty
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <h3 className="font-semibold text-foreground text-lg">Quality Control</h3>
                <p>
                  Every product undergoes multi-stage quality inspection before shipment, including raw material
                  checks, in-process inspection, final product testing, and pre-shipment inspection. QC reports
                  and test certificates are available upon request.
                </p>
                <h3 className="font-semibold text-foreground text-lg mt-4">Warranty</h3>
                <p>
                  All DS CARO products carry a <strong>30-day warranty</strong> against manufacturing defects
                  from the date of delivery. The warranty covers:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Material defects that affect product functionality</li>
                  <li>Workmanship issues that compromise safety or usability</li>
                </ul>
                <p>The warranty does not cover:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Normal wear and tear</li>
                  <li>Damage caused by misuse, improper installation, or unauthorized modification</li>
                  <li>Damage due to improper storage or transportation by the buyer</li>
                  <li>Cosmetic issues that do not affect functionality</li>
                </ul>
                <p>
                  Warranty claims must be submitted in writing within 7 days of discovering the defect, with
                  photographic or video evidence. Remedies are at our discretion and may include replacement,
                  credit, or refund.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                6. Intellectual Property
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  All content on this website — including text, images, logos, product descriptions, and
                  design elements — is the exclusive property of DS CARO and is protected by international
                  copyright laws.
                </p>
                <p>
                  The DS CARO name, logo, and product names are trademarks of DS CARO. You may not use our
                  intellectual property without prior written consent. For OEM/ODM orders, the buyer warrants
                  that any designs, logos, or trademarks provided for customization do not infringe on third-party
                  rights and agrees to indemnify DS CARO against any claims arising from such infringement.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                7. Limitation of Liability
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  To the fullest extent permitted by applicable law, DS CARO shall not be liable for any
                  indirect, incidental, special, or consequential damages, including but not limited to loss
                  of profits, business interruption, or loss of business opportunity, arising from the use
                  of our products or services.
                </p>
                <p>
                  Our total liability for any claim arising from a purchase shall not exceed the purchase
                  price of the specific products giving rise to the claim. This limitation applies regardless
                  of the legal theory on which the claim is based.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                8. Governing Law &amp; Dispute Resolution
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  These Terms &amp; Conditions are governed by and construed in accordance with the laws of
                  the People&rsquo;s Republic of China, without regard to conflict of law principles.
                </p>
                <p>
                  Any dispute, controversy, or claim arising from or relating to these terms shall be resolved
                  through friendly negotiation between the parties. If negotiation fails within 30 days, the
                  dispute shall be submitted to arbitration administered by the China International Economic
                  and Trade Arbitration Commission (CIETAC) in Shanghai, in accordance with its arbitration
                  rules then in effect. The arbitration shall be conducted in English.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-secondary/30 rounded-2xl p-8 md:p-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                9. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For questions about these Terms &amp; Conditions, pricing inquiries, or to discuss custom
                B2B arrangements, please contact us:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:dscaro88@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      dscaro88@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href="tel:+8613367494665" className="text-muted-foreground hover:text-primary transition-colors">
                      +86 133 6749 4665
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      Jinhua, Zhejiang, China 321000
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <p className="text-xs text-muted-foreground text-center pt-4">
              These terms were last updated on May 25, 2026. We recommend reviewing this page periodically
              as terms may be updated to reflect changes in our business practices or legal requirements.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
