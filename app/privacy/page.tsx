import { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Mail, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | DS CARO",
  description:
    "DS CARO privacy policy — how we collect, use, and protect your personal information. GDPR compliant. B2B senior care product manufacturer.",
  openGraph: {
    title: "Privacy Policy | DS CARO",
    description:
      "Learn how DS CARO handles your personal data. Transparent, secure, and GDPR compliant.",
  },
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container-wide text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
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
            {/* Introduction */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Introduction
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  DS CARO (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting
                  and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website or engage with us as a B2B partner.
                </p>
                <p>
                  By using our website and services, you consent to the data practices described in this policy.
                  If you do not agree with any part of this policy, please discontinue use of our website.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Information We Collect
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We collect information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Submit a contact inquiry or request a quotation</li>
                  <li>Apply for a trade account</li>
                  <li>Place a sample order or wholesale order</li>
                  <li>Subscribe to our newsletter or product updates</li>
                  <li>Communicate with our sales or support team</li>
                </ul>
                <p className="mt-3 font-medium text-foreground">The types of information we may collect include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Full name</strong> — to identify you and your organization</li>
                  <li><strong>Email address</strong> — for communication regarding inquiries, orders, and updates</li>
                  <li><strong>Company name</strong> — to verify your B2B status and set up trade accounts</li>
                  <li><strong>Phone number</strong> — for urgent communications regarding orders or logistics</li>
                  <li><strong>Inquiry details</strong> — product interests, quantity requirements, delivery preferences</li>
                  <li><strong>Business documentation</strong> — trade licenses, import certificates, or other B2B verification documents</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We use the information we collect solely for legitimate B2B business purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To respond to your inquiries and provide product quotations</li>
                  <li>To process and fulfill your orders</li>
                  <li>To manage your trade account and provide customer support</li>
                  <li>To improve our products, services, and website experience</li>
                  <li>To send relevant product updates or promotional materials (with your consent)</li>
                  <li>To comply with legal obligations and enforce our terms and conditions</li>
                </ul>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Data Sharing
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground">
                  We do not sell, rent, or trade your personal information to third parties.
                </p>
                <p>
                  We may share your information with trusted service providers who assist us in operating our
                  business, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Shipping and logistics partners (for order fulfillment)</li>
                  <li>Payment processors (for invoice processing)</li>
                  <li>Email service providers (for communication)</li>
                  <li>Legal and compliance advisors (as required by law)</li>
                </ul>
                <p>
                  All service providers are contractually obligated to protect your data and use it only for
                  the specific services they provide to us. We may also disclose information if required to
                  do so by law or in response to valid legal requests.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Data Security
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We implement industry-standard security measures to protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS encryption for all data transmitted through our website</li>
                  <li>Access controls limiting data access to authorized personnel only</li>
                  <li>Regular security assessments and updates to our systems</li>
                  <li>Secure data storage with encrypted backups</li>
                </ul>
                <p>
                  While we strive to protect your personal information, no method of transmission over the
                  internet or electronic storage is 100% secure. We cannot guarantee absolute security but
                  we continuously work to maintain the highest standards.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Cookies
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience,
                  analyze website traffic, and understand where our visitors come from. For detailed information
                  about the cookies we use and how you can manage them, please review our{" "}
                  <Link href="/cookies" className="text-primary hover:underline font-medium">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Your Rights (GDPR)
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  If you are located in the European Economic Area (EEA) or the United Kingdom, you have the
                  following rights under the General Data Protection Regulation (GDPR):
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Right of Access</strong> — You may request a copy of the personal data we hold about you.
                  </li>
                  <li>
                    <strong>Right to Rectification</strong> — You may request that we correct any inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>Right to Erasure</strong> — You may request that we delete your personal data, subject to legal retention requirements.
                  </li>
                  <li>
                    <strong>Right to Data Portability</strong> — You may request your data in a structured, commonly used format for transfer to another controller.
                  </li>
                  <li>
                    <strong>Right to Restrict Processing</strong> — You may request that we limit how we process your data.
                  </li>
                  <li>
                    <strong>Right to Object</strong> — You may object to processing of your data for direct marketing purposes.
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us using the details below. We will respond
                  to your request within 30 days as required by GDPR.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-secondary/30 rounded-2xl p-8 md:p-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have any questions about this Privacy Policy or wish to exercise your data protection
                rights, please contact us:
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
                    <ShieldCheck className="h-5 w-5 text-primary" />
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
              This privacy policy was last updated on May 25, 2026. We reserve the right to update this
              policy at any time. Changes will be posted on this page.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
