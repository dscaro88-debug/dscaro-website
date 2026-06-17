export type Locale = 'en' | 'ja'

export const locales: Locale[] = ['en', 'ja']

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語'
}

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  ja: '🇯🇵'
}

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      services: 'Services',
      resources: 'Knowledge',
      blog: 'Blog',
      contact: 'Contact',
      tradeAccount: 'Trade Account',
      getQuote: 'Get Quote',
      wholesale: 'For Business',
      solutions: 'Solutions',
      faqs: 'FAQs',
      whyUs: 'Why Choose Us',
      academy: 'Academy',
    },
    hero: {
      badge: 'Global Senior Care Solutions Partner',
      title: 'Your Trusted Partner in Senior Care Product Manufacturing',
      subtitle: 'B2B OEM/ODM manufacturer of mobility aids, bathroom safety, daily living, and home care products. Trusted by distributors across Europe.',
      cta1: 'Apply for Trade Account',
      cta2: 'View Product Catalog',
      cta3: 'Download Catalog',
    },
    stats: {
      years: 'Years Experience',
      countries: 'European Partners',
      capacity: 'Annual Capacity',
      patents: 'Product Categories',
    },
    certs: {
      title: 'Global Certifications',
      subtitle: 'Fully compliant with international standards',
    },
    products: {
      title: 'Complete Product Range',
      subtitle: 'Six comprehensive categories covering senior care needs',
      viewAll: 'View All Products',
      viewCategory: 'View Category',
      categories: {
        mobility: { name: 'Mobility Aids', desc: 'Walkers, rollators, wheelchairs for independent living' },
        bathroom: { name: 'Bathroom Safety', desc: 'Shower chairs, grab bars, anti-slip solutions' },
        daily: { name: 'Daily Living', desc: 'Reachers, dressing aids, kitchen helpers' },
        home: { name: 'Home Care', desc: 'Hospital beds, lifts, pressure care solutions' },
      },
    },
    whyUs: {
      title: 'Why Distributors Choose DS CARO',
      subtitle: 'Your trusted manufacturing partner for senior care solutions',
      features: {
        factory: {
          title: 'Factory-Direct Quality',
          desc: 'Cut out the middleman. Direct manufacturing ensures consistent quality and better margins.',
        },
        moq: {
          title: 'Flexible MOQ & Fast Shipping',
          desc: 'Competitive minimum order quantities. Scale up with volume discounts as your business grows.',
        },
        oem: {
          title: 'OEM/Private-Label Options',
          desc: 'Custom packaging, branding, and specifications. Build your brand on proven products.',
        },
        compliance: {
          title: 'Model-Level Product Documentation',
          desc: 'ISO9001 quality management and product documents available upon request by model.',
        },
      },
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive support from concept to delivery',
      items: {
        oem: { title: 'OEM Manufacturing', desc: 'Produce your designs with our expertise' },
        odm: { title: 'ODM Solutions', desc: 'Select from proven designs for your brand' },
        customization: { title: 'Customization', desc: 'Colors, packaging tailored to your market' },
        logistics: { title: 'Global Logistics', desc: 'Efficient shipping to ports worldwide' },
      },
    },
    cta: {
      title: 'Ready to Partner with DS CARO?',
      subtitle: 'Join distributors across Europe. Get wholesale pricing and product samples today.',
      button1: 'Apply for Trade Account',
      button2: 'Request Product Catalog',
    },
    footer: {
      description: 'DS CARO is a trusted B2B manufacturer of senior care products — mobility aids, bathroom safety, daily living, and home care solutions. OEM/ODM for distributors worldwide.',
      quickLinks: 'Quick Links',
      products: 'Products',
      support: 'Support',
      contact: 'Contact Us',
      newsletter: 'Newsletter',
      newsletterDesc: 'Get industry insights and product updates',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Enter your email',
      rights: 'All Rights Reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    about: {
      title: 'About DS CARO',
      subtitle: 'Dedicated to Senior Care Excellence',
      history: {
        title: 'Our Story',
        content: 'DS CARO was founded with a clear mission: to provide high-quality, affordable senior care products to distributors and healthcare providers worldwide. We combine manufacturing expertise with deep understanding of the aging population market.',
      },
      mission: {
        title: 'Our Mission',
        content: 'To be the most trusted B2B supplier of senior care products globally, delivering innovative solutions that enhance quality of life for the elderly while providing exceptional value to our distribution partners.',
      },
      facility: { title: 'Manufacturing Excellence', area: 'Production Area', lines: 'Assembly Lines', workers: 'Skilled Workers', daily: 'Daily Capacity' },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our B2B team',
      form: {
        name: 'Your Name',
        company: 'Company Name',
        email: 'Email Address',
        phone: 'Phone Number',
        country: 'Country',
        interest: 'Interest',
        message: 'Message',
        submit: 'Send Inquiry',
        interests: { wholesale: 'Wholesale Inquiry', oem: 'OEM/ODM Partnership', sample: 'Sample Request', other: 'Other' },
      },
      info: {
        address: 'Address',
        addressValue: 'Jinhua, Zhejiang, China',
        phone: 'Phone',
        email: 'Email',
        hours: 'Business Hours',
        hoursValue: 'Mon - Fri: 8:00 AM - 6:00 PM (GMT+8)',
      },
    },
    trade: {
      title: 'Apply for Trade Account',
      subtitle: 'Unlock exclusive B2B pricing and benefits',
      benefits: {
        title: 'Trade Account Benefits',
        pricing: 'Wholesale Pricing',
        pricingDesc: 'Access to exclusive B2B pricing tiers',
        credit: 'Flexible Terms',
        creditDesc: 'Flexible payment options for qualified partners',
        support: 'Dedicated Support',
        supportDesc: 'Priority access to our B2B sales team',
        samples: 'Product Samples',
        samplesDesc: 'Request samples at reduced rates',
      },
    },
    blog: {
      title: 'Industry Insights',
      subtitle: 'Senior care market trends, product guides, and expert knowledge',
      readMore: 'Read More',
      categories: { all: 'All', industry: 'Market Insights', product: 'Product Knowledge', guides: 'Industry Guides', events: 'Company News' },
    },
    common: {
      learnMore: 'Learn More',
      viewDetails: 'View Details',
      downloadPdf: 'Download PDF',
      backToTop: 'Back to Top',
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      about: '会社概要',
      products: '製品',
      services: 'サービス',
      resources: 'ナレッジ',
      blog: 'ブログ',
      contact: 'お問い合わせ',
      tradeAccount: '取引口座',
      getQuote: '見積依頼',
      wholesale: '法人のお客様',
      solutions: 'ソリューション',
      faqs: 'よくある質問',
      whyUs: '選ばれる理由',
      academy: 'アカデミー',
    },
    hero: {
      badge: 'グローバルシニアケアソリューションパートナー',
      title: 'シニアケア製品製造における信頼できるパートナー',
      subtitle: 'モビリティエイド、バスルーム安全、日常生活支援、在宅ケア製品のB2B OEM/ODMメーカー。ヨーロッパのディストリビューターから信頼されています。',
      cta1: '取引口座を申請',
      cta2: '製品カタログを見る',
      cta3: 'カタログダウンロード',
    },
    stats: { years: '年の経験', countries: '欧州パートナー', capacity: '年間生産能力', patents: '製品カテゴリー' },
    certs: { title: '国際認証', subtitle: '国際基準に完全準拠' },
    products: {
      title: '製品ラインナップ',
      subtitle: 'シニアケアニーズをカバーする4つのカテゴリー',
      viewAll: 'すべての製品を見る',
      viewCategory: 'カテゴリーを見る',
      categories: {
        mobility: { name: 'モビリティエイド', desc: '自立生活のための歩行器、車椅子' },
        bathroom: { name: 'バスルーム安全', desc: 'シャワーチェア、手すり、滑り止めソリューション' },
        daily: { name: '日常生活支援', desc: 'リーチャー、着脱補助具、キッチンヘルパー' },
        home: { name: '在宅ケア', desc: '介護ベッド、リフト、褥瘡ケアソリューション' },
      },
    },
    whyUs: {
      title: 'ディストリビューターがDS CAROを選ぶ理由',
      subtitle: 'シニアケアソリューションの信頼できる製造パートナー',
      features: {
        factory: { title: '工場直販品質', desc: '中間業者を排除し、一貫した品質と利益を実現。' },
        moq: { title: '柔軟なMOQと迅速な配送', desc: '競争力のある最小注文数。ビジネスの成長に応じてボリュームディスカウントを。' },
        oem: { title: 'OEM/プライベートラベル', desc: 'カスタム包装、ブランディング。実績ある製品でブランド構築。' },
        compliance: { title: 'モデル別製品資料', desc: 'ISO9001品質管理情報と製品資料をモデル別に提供可能。' },
      },
    },
    services: {
      title: 'サービス',
      subtitle: 'コンセプトから納品まで包括的サポート',
      items: {
        oem: { title: 'OEM製造', desc: '当社の専門知識であなたのデザインを生産' },
        odm: { title: 'ODMソリューション', desc: '実績あるデザインから選択' },
        customization: { title: 'カスタマイズ', desc: '市場に合わせた色、包装' },
        logistics: { title: 'グローバル物流', desc: '世界中への効率的な配送' },
      },
    },
    cta: {
      title: 'DS CAROとのパートナーシップの準備はできていますか？',
      subtitle: 'ヨーロッパ中のディストリビューターに参加。卸売価格とサンプルを今すぐ入手。',
      button1: '取引口座を申請',
      button2: '製品カタログをリクエスト',
    },
    footer: {
      description: 'DS CAROは、モビリティエイド、バスルーム安全、日常生活支援、在宅ケアソリューションの信頼できるB2Bメーカーです。世界中のディストリビューター向けOEM/ODM。',
      quickLinks: 'クイックリンク',
      products: '製品',
      support: 'サポート',
      contact: 'お問い合わせ',
      newsletter: 'ニュースレター',
      newsletterDesc: '業界インサイトと製品アップデートを購読',
      subscribe: '購読',
      emailPlaceholder: 'メールアドレスを入力',
      rights: '全著作権所有',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
    },
    about: {
      title: 'DS CAROについて',
      subtitle: 'シニアケアの卓越性に専念',
      history: { title: '私たちのストーリー', content: 'DS CAROは明確な使命を持って設立されました：世界中のディストリビューターと医療提供者に高品質で手頃なシニアケア製品を提供すること。製造の専門知識と高齢化市場への深い理解を組み合わせています。' },
      mission: { title: '私たちの使命', content: '高齢者の生活の質を向上させる革新的なソリューションを提供しながら、ディストリビューションパートナーに卓越した価値を提供する、世界で最も信頼されるシニアケア製品のB2Bサプライヤーになること。' },
      facility: { title: '製造の卓越性', area: '生産面積', lines: '組立ライン', workers: '熟練作業者', daily: '日産能力' },
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: 'B2Bチームにご連絡ください',
      form: {
        name: 'お名前', company: '会社名', email: 'メールアドレス', phone: '電話番号', country: '国', interest: '関心事項', message: 'メッセージ', submit: 'お問い合わせを送信',
        interests: { wholesale: '卸売のお問い合わせ', oem: 'OEM/ODMパートナーシップ', sample: 'サンプルリクエスト', other: 'その他' },
      },
      info: { address: '住所', addressValue: '中国浙江省金華市', phone: '電話', email: 'メール', hours: '営業時間', hoursValue: '月〜金: 8:00 - 18:00 (GMT+8)' },
    },
    trade: {
      title: '取引口座を申請',
      subtitle: '限定B2B価格と特典をアンロック',
      benefits: {
        title: '取引口座特典', pricing: '卸売価格', pricingDesc: '限定B2B価格帯へのアクセス',
        credit: '柔軟な条件', creditDesc: '認定パートナー向けの柔軟な支払いオプション',
        support: '専任サポート', supportDesc: 'B2B営業チームへの優先アクセス',
        samples: '製品サンプル', samplesDesc: '割引価格でサンプルをリクエスト',
      },
    },
    blog: {
      title: '業界インサイト',
      subtitle: 'シニアケア市場のトレンド、製品ガイド、専門知識',
      readMore: '続きを読む',
      categories: { all: 'すべて', industry: '市場インサイト', product: '製品知識', guides: '業界ガイド', events: '企業ニュース' },
    },
    common: { learnMore: '詳細', viewDetails: '詳細を見る', downloadPdf: 'PDFダウンロード', backToTop: 'トップへ戻る' },
  },
} as const

export function getTranslation(locale: Locale) {
  return translations[locale]
}
