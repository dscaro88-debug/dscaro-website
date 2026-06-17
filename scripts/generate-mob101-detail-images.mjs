import sharp from "sharp"

const sourceDir =
  "/Users/carokk/Desktop/Codex/dscaro/产品/01_Mobility_Aids/DS-MOB-101"
const outputDir =
  "/Users/carokk/Desktop/Codex/dscaro/dscaro-website/public/products/senior-care/lightweight-carbon-fiber-rollator-walker-mob-101"

const svgText = (strings, ...values) =>
  String.raw({ raw: strings }, ...values).replace(/\n\s+/g, "\n").trim()

const overlays = [
  {
    input: `${sourceDir}/详情_12.jpg`,
    output: `${outputDir}/detail-height-en.jpg`,
    svg: svgText`
      <svg width="790" height="702" viewBox="0 0 790 702" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="20" width="572" height="340" rx="32" fill="#FFFFFF"/>
        <text x="68" y="104" font-family="Arial" font-size="56" font-weight="700" fill="#121212">Adjustable</text>
        <text x="68" y="166" font-family="Arial" font-size="56" font-weight="700" fill="#121212">height</text>
        <text x="68" y="214" font-family="Arial" font-size="26" fill="#2E3035">Fits mixed user heights</text>
        <rect x="34" y="330" width="192" height="372" rx="28" fill="#FFF7ED"/>
        <rect x="66" y="470" width="248" height="78" rx="24" fill="#F38B2A"/>
        <text x="92" y="520" font-family="Arial" font-size="29" font-weight="700" fill="#FFFFFF">145-185 cm fit</text>
        <rect x="546" y="346" width="198" height="126" rx="24" fill="#F38B2A"/>
        <text x="570" y="402" font-family="Arial" font-size="27" font-weight="700" fill="#FFFFFF">6-step handle</text>
        <rect x="604" y="18" width="144" height="230" rx="28" fill="#FFFFFF"/>
        <text x="640" y="106" font-family="Arial" font-size="34" font-weight="700" fill="#121212">V3.0</text>
      </svg>
    `,
  },
  {
    input: `${sourceDir}/详情_21.jpg`,
    output: `${outputDir}/detail-bag-en.jpg`,
    svg: svgText`
      <svg width="790" height="786" viewBox="0 0 790 786" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="20" width="604" height="338" rx="34" fill="#FFFFFF"/>
        <text x="64" y="108" font-family="Arial" font-size="54" font-weight="700" fill="#121212">Detachable</text>
        <text x="64" y="170" font-family="Arial" font-size="54" font-weight="700" fill="#121212">storage bag</text>
        <text x="64" y="224" font-family="Arial" font-size="26" fill="#2E3035">Flexible for daily carry and retail display.</text>
        <rect x="604" y="18" width="144" height="230" rx="28" fill="#FFFFFF"/>
        <text x="640" y="106" font-family="Arial" font-size="34" font-weight="700" fill="#121212">V3.0</text>
      </svg>
    `,
  },
  {
    input: `${sourceDir}/详情_24.jpg`,
    output: `${outputDir}/detail-brake-en.jpg`,
    svg: svgText`
      <svg width="790" height="972" viewBox="0 0 790 972" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="20" width="560" height="336" rx="34" fill="#FFFFFF"/>
        <text x="64" y="110" font-family="Arial" font-size="56" font-weight="700" fill="#121212">Brake control</text>
        <text x="64" y="166" font-family="Arial" font-size="28" fill="#2E3035">Pull up to slow down. Push down to lock.</text>
        <rect x="604" y="18" width="144" height="230" rx="28" fill="#FFFFFF"/>
        <text x="640" y="106" font-family="Arial" font-size="34" font-weight="700" fill="#121212">V3.0</text>
        <rect x="498" y="568" width="252" height="78" rx="20" fill="#F38B2A"/>
        <text x="520" y="616" font-family="Arial" font-size="24" font-weight="700" fill="#FFFFFF">Pull up: slow down</text>
        <rect x="498" y="836" width="252" height="78" rx="20" fill="#F38B2A"/>
        <text x="520" y="884" font-family="Arial" font-size="24" font-weight="700" fill="#FFFFFF">Push down: lock</text>
      </svg>
    `,
  },
  {
    input: `${sourceDir}/详情_38.jpg`,
    output: `${outputDir}/detail-dimensions-en.jpg`,
    svg: svgText`
      <svg width="790" height="821" viewBox="0 0 790 821" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="644" width="670" height="94" rx="32" fill="#FFFFFF"/>
        <text x="92" y="686" font-family="Arial" font-size="22" fill="#5F6672">Manual measurement tolerance: approx. +/-1 cm.</text>
        <text x="92" y="716" font-family="Arial" font-size="22" fill="#5F6672">Dimensions shown for buyer reference only.</text>
      </svg>
    `,
  },
]

for (const overlay of overlays) {
  await sharp(overlay.input)
    .composite([
      {
        input: Buffer.from(overlay.svg),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(overlay.output)
}

console.log(`Generated ${overlays.length} MOB-101 translated detail images.`)
