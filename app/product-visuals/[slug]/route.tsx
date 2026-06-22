import { ImageResponse } from "next/og"
import { allProducts, formatProductPrice } from "@/lib/products"

export const runtime = "edge"

const imageSize = { width: 1200, height: 1200 }

const categoryStyles: Record<string, { bg: string; accent: string; glow: string; label: string }> = {
  "Dining Solutions": {
    bg: "linear-gradient(135deg, #5c3a28 0%, #8b5e3c 100%)",
    accent: "#ff8d4d",
    glow: "rgba(255, 141, 77, 0.24)",
    label: "Dining protection for care facilities",
  },
  "Mobility & Transfer": {
    bg: "linear-gradient(135deg, #4a3020 0%, #7a5c3c 100%)",
    accent: "#73d7ff",
    glow: "rgba(115, 215, 255, 0.22)",
    label: "Mobility and transfer support",
  },
  "Daily Care Supplies": {
    bg: "linear-gradient(135deg, #3a3028 0%, #6b5a4a 100%)",
    accent: "#f0b04d",
    glow: "rgba(240, 176, 77, 0.22)",
    label: "Daily care & bedding protection",
  },
}

function splitTitle(name: string) {
  if (name.length <= 34) return [name]

  const words = name.split(" ")
  const lines: string[] = []
  let current = ""

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > 32 && current) {
      lines.push(current)
      current = word
      continue
    }
    current = next
  }

  if (current) lines.push(current)
  return lines.slice(0, 3)
}

function renderShape(category: string, accent: string) {
  switch (category) {
    case "Dining Solutions":
      return (
        <div style={{ position: "relative", display: "flex", width: 320, height: 320 }}>
          {/* Plate/crumb catcher shape */}
          <div style={{ position: "absolute", left: 90, top: 60, width: 140, height: 140, borderRadius: 999, border: `14px solid ${accent}`, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", left: 112, top: 82, width: 96, height: 96, borderRadius: 999, background: "rgba(255,255,255,0.12)" }} />
          {/* Crumb catcher pocket */}
          <div style={{ position: "absolute", left: 72, top: 160, width: 176, height: 32, borderRadius: 16, background: accent, opacity: 0.85 }} />
          {/* Bib straps */}
          <div style={{ position: "absolute", left: 48, top: 36, width: 26, height: 80, borderRadius: 18, background: "#ffffff", opacity: 0.7, transform: "rotate(12deg)" }} />
          <div style={{ position: "absolute", left: 248, top: 36, width: 26, height: 80, borderRadius: 18, background: "#ffffff", opacity: 0.7, transform: "rotate(-12deg)" }} />
        </div>
      )
    case "Mobility & Transfer":
      return (
        <div style={{ position: "relative", display: "flex", width: 320, height: 300 }}>
          {/* Transfer arc */}
          <div style={{ position: "absolute", left: 68, top: 82, width: 184, height: 126, borderRadius: 90, border: `12px solid ${accent}`, borderBottomColor: "transparent", transform: "rotate(-8deg)" }} />
          <div style={{ position: "absolute", left: 214, top: 118, width: 42, height: 42, borderRadius: 12, background: accent, transform: "rotate(45deg)" }} />
          {/* Bed and chair support blocks */}
          <div style={{ position: "absolute", left: 42, top: 172, width: 102, height: 64, borderRadius: 16, background: "#ffffff", opacity: 0.84 }} />
          <div style={{ position: "absolute", left: 194, top: 172, width: 90, height: 64, borderRadius: 16, background: "rgba(255,255,255,0.20)", border: "3px solid rgba(255,255,255,0.42)" }} />
          <div style={{ position: "absolute", left: 72, top: 58, width: 54, height: 54, borderRadius: 999, background: "rgba(255,255,255,0.28)" }} />
        </div>
      )
    default:
      return (
        <div style={{ position: "relative", display: "flex", width: 340, height: 300 }}>
          {/* Bed/mattress shape */}
          <div style={{ position: "absolute", left: 50, top: 120, width: 240, height: 80, borderRadius: 16, background: "#ffffff", opacity: 0.9 }} />
          <div style={{ position: "absolute", left: 50, top: 100, width: 240, height: 24, borderRadius: "16px 16px 0 0", background: accent, opacity: 0.75 }} />
          {/* Sheet/pad layer */}
          <div style={{ position: "absolute", left: 66, top: 80, width: 208, height: 20, borderRadius: 10, background: "rgba(255,255,255,0.18)" }} />
          {/* Pillow */}
          <div style={{ position: "absolute", left: 230, top: 56, width: 56, height: 36, borderRadius: 14, background: "rgba(255,255,255,0.25)", transform: "rotate(-8deg)" }} />
        </div>
      )
  }
}

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params
  const product = allProducts.find((item) => item.slug === slug)

  if (!product) {
    return new Response("Not found", { status: 404 })
  }

  const style = categoryStyles[product.category] || categoryStyles["Daily Care Supplies"]
  const titleLines = splitTitle(product.name)
  const topFeatures = product.features.slice(0, 3)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: style.bg,
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 78% 22%, ${style.glow} 0%, transparent 28%), radial-gradient(circle at 20% 82%, rgba(255,255,255,0.08) 0%, transparent 24%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 380,
            height: 380,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "72px",
            justifyContent: "space-between",
            alignItems: "stretch",
            gap: "48px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: "56%", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", padding: "10px 18px", borderRadius: 999, background: "rgba(255,255,255,0.10)", fontSize: 28, fontWeight: 700 }}>
                  DS CARO
                </div>
                <div style={{ display: "flex", padding: "10px 16px", borderRadius: 999, background: style.accent, color: "#5c3a28", fontSize: 24, fontWeight: 800 }}>
                  {product.id}
                </div>
              </div>
              <div style={{ display: "flex", padding: "12px 18px", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 22, letterSpacing: 1 }}>
                {style.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
                {titleLines.map((line) => (
                  <div key={line} style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.08 }}>
                    {line}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", fontSize: 26, lineHeight: 1.45, color: "rgba(255,255,255,0.82)", maxWidth: "88%" }}>
                {product.description}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", padding: "16px 18px", borderRadius: 24, background: "rgba(255,255,255,0.10)", fontSize: 26, fontWeight: 700 }}>
                  MOQ {product.moq}
                </div>
                <div style={{ display: "flex", padding: "16px 18px", borderRadius: 24, background: "rgba(255,255,255,0.10)", fontSize: 26, fontWeight: 700 }}>
                  FOB {formatProductPrice(product)}
                </div>
                <div style={{ display: "flex", padding: "16px 18px", borderRadius: 24, background: "rgba(255,255,255,0.10)", fontSize: 26, fontWeight: 700 }}>
                  SKU {product.id}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {topFeatures.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: 24, color: "rgba(255,255,255,0.90)" }}>
                    <div style={{ width: 10, height: 10, borderRadius: 999, background: style.accent }} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", width: "44%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 420,
                height: 560,
                borderRadius: 42,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 30px 80px rgba(0,0,0,0.22)",
              }}
            >
              {renderShape(product.category, style.accent)}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 38,
            display: "flex",
            fontSize: 20,
            letterSpacing: 0.6,
            color: "rgba(255,255,255,0.68)",
          }}
        >
          DS CARO Long-Term Care Supplies | OEM/ODM support, SKU-level files, and B2B quotation by request.
        </div>
      </div>
    ),
    imageSize
  )
}
