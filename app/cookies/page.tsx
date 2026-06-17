import { Metadata } from "next"
import Link from "next/link"
import { Cookie, Mail, Phone, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy | DS CARO",
  description:
    "DS CARO cookie policy — how we use cookies and tracking technologies on our website. Learn about essential, analytics, and functional cookies.",
  openGraph: {
    title: "Cookie Policy | DS CARO",
    description:
      "Learn about the cookies used on the DS CARO website. Manage your cookie preferences and understand how we use tracking technologies.",
  },
}

export default function CookiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container-wide text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <Cookie className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cookie Policy
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
            {/* What Are Cookies */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                What Are Cookies?
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Cookies are small text files that are placed on your device (computer, tablet, or mobile phone)
                  when you visit a website. They are widely used to make websites work more efficiently, provide
                  a better user experience, and provide information to the website owners.
                </p>
                <p>
                  Cookies may be &ldquo;session cookies&rdquo; (deleted when you close your browser) or
                  &ldquo;persistent cookies&rdquo; (remain on your device for a set period or until you delete
                  them). They may be set by us (&ldquo;first-party cookies&rdquo;) or by third-party services
                  we use (&ldquo;third-party cookies&rdquo;).
                </p>
              </div>
            </section>

            {/* How We Use Cookies */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                How We Use Cookies
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  DS CARO uses cookies for the following purposes:
                </p>

                <div className="space-y-4 mt-4">
                  <div className="p-5 rounded-xl bg-secondary/30 border border-border/50">
                    <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                    <p>
                      These cookies are necessary for the website to function properly. They enable basic
                      features such as page navigation, security, and access to secure areas. The website
                      cannot function properly without these cookies. They do not collect information about
                      you for marketing purposes.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-secondary/30 border border-border/50">
                    <h3 className="font-semibold text-foreground mb-2">Analytics Cookies</h3>
                    <p>
                      These cookies help us understand how visitors interact with our website by collecting
                      and reporting information anonymously. This includes information about pages visited,
                      time spent on the site, referring sources, and browser types. We use this data to
                      improve our website and the products we offer to B2B partners.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-secondary/30 border border-border/50">
                    <h3 className="font-semibold text-foreground mb-2">Functional Cookies</h3>
                    <p>
                      These cookies enable the website to provide enhanced functionality and personalization.
                      They may be set by us or by third-party providers whose services we have added to our
                      pages. If you do not allow these cookies, some services may not function properly.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Types of Cookies */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Types of Cookies We Use
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  The following types of cookies may be set when you visit the DS CARO website:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse mt-4">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Cookie Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Purpose</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-foreground font-medium">Session Cookies</td>
                        <td className="py-3 px-4">Temporary cookies that maintain your session state as you navigate the website.</td>
                        <td className="py-3 px-4">Deleted when browser closes</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-foreground font-medium">Persistent Cookies</td>
                        <td className="py-3 px-4">Remain on your device to remember preferences, login details, or settings for return visits.</td>
                        <td className="py-3 px-4">Up to 12 months</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-foreground font-medium">First-Party Cookies</td>
                        <td className="py-3 px-4">Set directly by the DS CARO website for core functionality.</td>
                        <td className="py-3 px-4">Varies (session to 12 months)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-foreground font-medium">Third-Party Cookies</td>
                        <td className="py-3 px-4">Set by external services integrated into our website (e.g., analytics).</td>
                        <td className="py-3 px-4">Determined by third party</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Managing Cookies
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Most web browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>View cookies stored on your device and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block cookies from specific sites</li>
                  <li>Block all cookies (may impact website functionality)</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
                <p>
                  To manage your cookie preferences, refer to your browser&rsquo;s help documentation:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and Security &rarr; Cookies</li>
                  <li><strong>Mozilla Firefox:</strong> Preferences &rarr; Privacy &amp; Security &rarr; Cookies</li>
                  <li><strong>Safari:</strong> Preferences &rarr; Privacy &rarr; Cookies</li>
                  <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and Site Permissions</li>
                </ul>
                <p className="mt-3 text-sm">
                  Please note that disabling certain cookies may affect the functionality of our website and
                  your user experience.
                </p>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Third-Party Cookies
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We use third-party services that may set cookies on your device:
                </p>
                <div className="p-5 rounded-xl bg-secondary/30 border border-border/50 mt-4">
                  <h3 className="font-semibold text-foreground mb-2">Google Analytics</h3>
                  <p>
                    We use Google Analytics to understand how visitors engage with our website. Google Analytics
                    collects information such as pages visited, time on site, and referring URLs. This data is
                    anonymized and aggregated. Google&rsquo;s ability to use and share information collected by
                    Google Analytics is governed by their privacy policy.
                  </p>
                  <p className="mt-2">
                    You can opt out of Google Analytics tracking by installing the{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      Google Analytics Opt-out Browser Add-on
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Updates to This Policy
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices,
                  technology, or legal requirements. When we make material changes, we will update the
                  &ldquo;Last updated&rdquo; date at the top of this page and may provide additional notice
                  through our website.
                </p>
                <p>
                  We encourage you to review this policy periodically to stay informed about how we use
                  cookies and tracking technologies.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-secondary/30 rounded-2xl p-8 md:p-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Related Pages</p>
                    <Link href="/privacy" className="text-primary hover:underline">
                      View our Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <p className="text-xs text-muted-foreground text-center pt-4">
              This cookie policy was last updated on May 25, 2026.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
