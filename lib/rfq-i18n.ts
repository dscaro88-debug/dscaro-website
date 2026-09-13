// DS CARO — RFQ / Bulk Order form + quote panel + quick-RFQ popup + WhatsApp i18n
// 7 languages. Select OPTION VALUES stay in English (canonical) so lib/rfq-scoring
// and the API keep working; only the displayed LABEL is localized.
import type { Locale } from "@/lib/i18n"

export interface RfqStrings {
  contactName: string
  businessEmail: string
  company: string
  phoneWhatsapp: string
  buyerType: string
  facilityType: string
  monthlyVolume: string
  urgencyLevel: string
  productCategory: string
  estimatedQuantity: string
  oemRequired: string
  country: string
  yes: string
  no: string
  sendBulkRfq: string
  sending: string
  completeVerification: string
  submitErrorContact: string
  rfqReceivedTitle: string
  rfqReceivedDesc: string
  panelBadge: string
  panelTitle: string
  panelDesc: string
  panelMoq: string
  panelSkuFile: string
  panelOem: string
  panelFormTitle: string
  panelFormDesc: string
  requestQuoteForSku: string
  quickBadge: string
  quickTitle: string
  quickDesc: string
  getBulkQuote: string
  needBulkPricing: string
  whatsappMessage: string
}

export const rfqTranslations: Record<Locale, RfqStrings> = {
  en: {
    contactName: "Contact Name *",
    businessEmail: "Business Email *",
    company: "Company",
    phoneWhatsapp: "Phone / WhatsApp",
    buyerType: "Buyer Type *",
    facilityType: "Facility Type *",
    monthlyVolume: "Monthly Volume *",
    urgencyLevel: "Urgency Level *",
    productCategory: "Product Category *",
    estimatedQuantity: "Estimated Quantity *",
    oemRequired: "OEM Required *",
    country: "Country *",
    yes: "Yes",
    no: "No",
    sendBulkRfq: "Send Bulk RFQ",
    sending: "Sending...",
    completeVerification: "Please complete the human verification before submitting.",
    submitErrorContact: "Failed to submit. Please contact us by WhatsApp or email.",
    rfqReceivedTitle: "RFQ received.",
    rfqReceivedDesc:
      "We will review quantity, OEM scope, country requirements, and reply with MOQ, FOB range, and lead time.",
    panelBadge: "Bulk Order Entry",
    panelTitle: "Quote this SKU for facility procurement",
    panelDesc:
      "Tell us buyer type, quantity, country, and OEM scope. We prepare MOQ, FOB range, lead time, packing plan, and document status for {product}.",
    panelMoq: "MOQ reference: {moq} units",
    panelSkuFile: "SKU, packing, and buyer file review",
    panelOem: "OEM / private label support available",
    panelFormTitle: "Fast bulk quote form",
    panelFormDesc: "Pre-filled for {category}. Add quantity, country, and OEM need.",
    requestQuoteForSku: "Request Quote for {sku}",
    quickBadge: "Quick RFQ",
    quickTitle: "Need bulk pricing for incontinence skin care?",
    quickDesc:
      "Send facility type, category, quantity, OEM need, and country. We will reply with MOQ, FOB range, and lead time.",
    getBulkQuote: "Get Bulk Quote",
    needBulkPricing: "Need bulk pricing?",
    whatsappMessage:
      "Hello, I am interested in your incontinence skin care products. Can you provide B2B pricing, MOQ, lead time, and available product documentation?",
  },
  ja: {
    contactName: "担当者名 *",
    businessEmail: "ビジネスメール *",
    company: "会社名",
    phoneWhatsapp: "電話 / WhatsApp",
    buyerType: "バイヤー種別 *",
    facilityType: "施設種別 *",
    monthlyVolume: "月間ボリューム *",
    urgencyLevel: "緊急度 *",
    productCategory: "製品カテゴリ *",
    estimatedQuantity: "概算数量 *",
    oemRequired: "OEM要否 *",
    country: "国 *",
    yes: "Yes",
    no: "No",
    sendBulkRfq: "一括RFQを送信",
    sending: "送信中...",
    completeVerification: "送信前に人間認証を完了してください。",
    submitErrorContact: "送信に失敗しました。WhatsAppまたはメールでご連絡ください。",
    rfqReceivedTitle: "RFQを受け付けました。",
    rfqReceivedDesc:
      "数量、OEM範囲、国の要件を確認し、MOQ、FOBレンジ、リードタイムで返信します。",
    panelBadge: "一括注文受付",
    panelTitle: "施設調達向けにこのSKUの見積もり",
    panelDesc:
      "バイヤー種別、数量、国、OEM範囲をお知らせください。{product}のMOQ、FOBレンジ、リードタイム、梱包計画、文書ステータスをご用意します。",
    panelMoq: "MOQ目安: {moq} 個",
    panelSkuFile: "SKU、梱包、バイヤー文書の確認",
    panelOem: "OEM / プライベートラベル対応可",
    panelFormTitle: "簡易一括見積もりフォーム",
    panelFormDesc: "{category}の入力済み。数量、国、OEM要否を追加してください。",
    requestQuoteForSku: "{sku}の見積もりを依頼",
    quickBadge: "クイックRFQ",
    quickTitle: "失禁皮膚ケアの一括価格が必要ですか？",
    quickDesc:
      "施設種別、カテゴリ、数量、OEM要否、国を送信してください。MOQ、FOBレンジ、リードタイムで返信します。",
    getBulkQuote: "一括見積もりを取得",
    needBulkPricing: "一括価格が必要ですか？",
    whatsappMessage:
      "こんにちは、失禁皮膚ケア製品に興味があります。B2B価格、MOQ、リードタイム、および利用可能な製品文書を教えていただけますか？",
  },
  de: {
    contactName: "Kontaktname *",
    businessEmail: "Geschäftliche E-Mail *",
    company: "Unternehmen",
    phoneWhatsapp: "Telefon / WhatsApp",
    buyerType: "Käufertyp *",
    facilityType: "Einrichtungstyp *",
    monthlyVolume: "Monatsvolumen *",
    urgencyLevel: "Dringlichkeit *",
    productCategory: "Produktkategorie *",
    estimatedQuantity: "Geschätzte Menge *",
    oemRequired: "OEM erforderlich *",
    country: "Land *",
    yes: "Ja",
    no: "Nein",
    sendBulkRfq: "Volumen-RFQ senden",
    sending: "Wird gesendet...",
    completeVerification: "Bitte schließen Sie die Spam-Prüfung vor dem Absenden ab.",
    submitErrorContact: "Übermittlung fehlgeschlagen. Bitte kontaktieren Sie uns per WhatsApp oder E-Mail.",
    rfqReceivedTitle: "RFQ erhalten.",
    rfqReceivedDesc:
      "Wir prüfen Menge, OEM-Umfang und Länderanforderungen und antworten mit MOQ, FOB-Spanne und Lieferzeit.",
    panelBadge: "Volumen-Bestellung",
    panelTitle: "Diese SKU für die Einrichtungsbeschaffung anfragen",
    panelDesc:
      "Nennen Sie Käufertyp, Menge, Land und OEM-Umfang. Wir bereiten MOQ, FOB-Spanne, Lieferzeit, Verpackungsplan und Dokumentstatus für {product} vor.",
    panelMoq: "MOQ-Referenz: {moq} Einheiten",
    panelSkuFile: "SKU-, Verpackungs- und Käuferdatei-Prüfung",
    panelOem: "OEM / Private-Label-Support verfügbar",
    panelFormTitle: "Schnelles Volumen-Angebotsformular",
    panelFormDesc: "Vorausgefüllt für {category}. Menge, Land und OEM-Bedarf ergänzen.",
    requestQuoteForSku: "Angebot für {sku} anfragen",
    quickBadge: "Schnell-RFQ",
    quickTitle: "Brauchen Sie Volumenpreise für Inkontinenz-Hautpflege?",
    quickDesc:
      "Senden Sie Einrichtungstyp, Kategorie, Menge, OEM-Bedarf und Land. Wir antworten mit MOQ, FOB-Spanne und Lieferzeit.",
    getBulkQuote: "Volumenangebot holen",
    needBulkPricing: "Volumenpreise nötig?",
    whatsappMessage:
      "Hallo, ich interessiere mich für Ihre Inkontinenz-Hautpflegeprodukte. Können Sie B2B-Preise, MOQ, Lieferzeit und verfügbare Produktdokumentation nennen?",
  },
  es: {
    contactName: "Nombre de contacto *",
    businessEmail: "Correo empresarial *",
    company: "Empresa",
    phoneWhatsapp: "Teléfono / WhatsApp",
    buyerType: "Tipo de comprador *",
    facilityType: "Tipo de instalación *",
    monthlyVolume: "Volumen mensual *",
    urgencyLevel: "Nivel de urgencia *",
    productCategory: "Categoría de producto *",
    estimatedQuantity: "Cantidad estimada *",
    oemRequired: "OEM requerido *",
    country: "País *",
    yes: "Sí",
    no: "No",
    sendBulkRfq: "Enviar RFQ de volumen",
    sending: "Enviando...",
    completeVerification: "Completa la verificación humana antes de enviar.",
    submitErrorContact: "Error al enviar. Contáctenos por WhatsApp o correo.",
    rfqReceivedTitle: "RFQ recibida.",
    rfqReceivedDesc:
      "Revisaremos cantidad, alcance OEM y requisitos de país, y responderemos con MOQ, rango FOB y plazo de entrega.",
    panelBadge: "Pedido de volumen",
    panelTitle: "Cotice esta SKU para compras de institución",
    panelDesc:
      "Indíquenos tipo de comprador, cantidad, país y alcance OEM. Preparamos MOQ, rango FOB, plazo, plan de embalaje y estado de documentos para {product}.",
    panelMoq: "Referencia MOQ: {moq} unidades",
    panelSkuFile: "Revisión de SKU, embalaje y archivo de comprador",
    panelOem: "Soporte OEM / marca privada disponible",
    panelFormTitle: "Formulario rápido de cotización de volumen",
    panelFormDesc: "Prellenado para {category}. Añada cantidad, país y necesidad OEM.",
    requestQuoteForSku: "Solicitar cotización para {sku}",
    quickBadge: "RFQ rápida",
    quickTitle: "¿Necesita precios de volumen para cuidado de la piel por incontinencia?",
    quickDesc:
      "Envíe tipo de instalación, categoría, cantidad, necesidad OEM y país. Responderemos con MOQ, rango FOB y plazo.",
    getBulkQuote: "Obtener cotización de volumen",
    needBulkPricing: "¿Necesita precios de volumen?",
    whatsappMessage:
      "Hola, me interesan sus productos de cuidado de la piel por incontinencia. ¿Puede proporcionar precios B2B, MOQ, plazo de entrega y documentación disponible?",
  },
  fr: {
    contactName: "Nom du contact *",
    businessEmail: "E-mail professionnel *",
    company: "Société",
    phoneWhatsapp: "Téléphone / WhatsApp",
    buyerType: "Type d'acheteur *",
    facilityType: "Type d'établissement *",
    monthlyVolume: "Volume mensuel *",
    urgencyLevel: "Niveau d'urgence *",
    productCategory: "Catégorie de produit *",
    estimatedQuantity: "Quantité estimée *",
    oemRequired: "OEM requis *",
    country: "Pays *",
    yes: "Oui",
    no: "Non",
    sendBulkRfq: "Envoyer le RFQ de gros",
    sending: "Envoi...",
    completeVerification: "Veuillez compléter la vérification humaine avant l'envoi.",
    submitErrorContact: "Échec de l'envoi. Contactez-nous par WhatsApp ou e-mail.",
    rfqReceivedTitle: "RFQ reçu.",
    rfqReceivedDesc:
      "Nous examinerons la quantité, le périmètre OEM et les exigences pays, et répondrons avec MOQ, fourchette FOB et délai.",
    panelBadge: "Commande de gros",
    panelTitle: "Devis de cette SKU pour l'approvisionnement d'établissement",
    panelDesc:
      "Indiquez type d'acheteur, quantité, pays et périmètre OEM. Nous préparons MOQ, fourchette FOB, délai, plan d'emballage et statut documentaire pour {product}.",
    panelMoq: "Référence MOQ : {moq} unités",
    panelSkuFile: "Revue SKU, emballage et fichier acheteur",
    panelOem: "Support OEM / marque privée disponible",
    panelFormTitle: "Formulaire de devis de gros rapide",
    panelFormDesc: "Pré-rempli pour {category}. Ajoutez quantité, pays et besoin OEM.",
    requestQuoteForSku: "Demander un devis pour {sku}",
    quickBadge: "RFQ rapide",
    quickTitle: "Besoin de prix de gros pour les soins de la peau de l'incontinence ?",
    quickDesc:
      "Envoyez type d'établissement, catégorie, quantité, besoin OEM et pays. Nous répondons avec MOQ, fourchette FOB et délai.",
    getBulkQuote: "Obtenir un devis de gros",
    needBulkPricing: "Besoin de prix de gros ?",
    whatsappMessage:
      "Bonjour, je suis intéressé par vos produits de soins de la peau pour incontinence. Pouvez-vous fournir les prix B2B, MOQ, délai et documentation produit disponible ?",
  },
  pt: {
    contactName: "Nome do contato *",
    businessEmail: "E-mail comercial *",
    company: "Empresa",
    phoneWhatsapp: "Telefone / WhatsApp",
    buyerType: "Tipo de comprador *",
    facilityType: "Tipo de instalação *",
    monthlyVolume: "Volume mensal *",
    urgencyLevel: "Nível de urgência *",
    productCategory: "Categoria de produto *",
    estimatedQuantity: "Quantidade estimada *",
    oemRequired: "OEM necessário *",
    country: "País *",
    yes: "Sim",
    no: "Não",
    sendBulkRfq: "Enviar RFQ de volume",
    sending: "Enviando...",
    completeVerification: "Conclua a verificação humana antes de enviar.",
    submitErrorContact: "Falha ao enviar. Contate-nos por WhatsApp ou e-mail.",
    rfqReceivedTitle: "RFQ recebida.",
    rfqReceivedDesc:
      "Analisaremos quantidade, escopo OEM e exigências de país, e responderemos com MOQ, faixa FOB e prazo.",
    panelBadge: "Pedido de volume",
    panelTitle: "Cote esta SKU para compra institucional",
    panelDesc:
      "Informe tipo de comprador, quantidade, país e escopo OEM. Preparamos MOQ, faixa FOB, prazo, plano de embalagem e status de documentos para {product}.",
    panelMoq: "Referência MOQ: {moq} unidades",
    panelSkuFile: "Revisão de SKU, embalagem e arquivo do comprador",
    panelOem: "Suporte OEM / marca privada disponível",
    panelFormTitle: "Formulário rápido de cotação de volume",
    panelFormDesc: "Pré-preenchido para {category}. Adicione quantidade, país e necessidade OEM.",
    requestQuoteForSku: "Solicitar cotação para {sku}",
    quickBadge: "RFQ rápida",
    quickTitle: "Precisa de preços de volume para cuidados de pele por incontinência?",
    quickDesc:
      "Envie tipo de instalação, categoria, quantidade, necessidade OEM e país. Responderemos com MOQ, faixa FOB e prazo.",
    getBulkQuote: "Obter cotação de volume",
    needBulkPricing: "Precisa de preços de volume?",
    whatsappMessage:
      "Olá, tenho interesse nos seus produtos de cuidados de pele para incontinência. Vocês podem fornecer preços B2B, MOQ, prazo e documentação disponível?",
  },
  pl: {
    contactName: "Imię i nazwisko *",
    businessEmail: "E-mail firmowy *",
    company: "Firma",
    phoneWhatsapp: "Telefon / WhatsApp",
    buyerType: "Typ nabywcy *",
    facilityType: "Typ placówki *",
    monthlyVolume: "Wolumen miesięczny *",
    urgencyLevel: "Poziom pilności *",
    productCategory: "Kategoria produktu *",
    estimatedQuantity: "Szacowana ilość *",
    oemRequired: "Wymagane OEM *",
    country: "Kraj *",
    yes: "Tak",
    no: "Nie",
    sendBulkRfq: "Wyślij RFQ hurtowe",
    sending: "Wysyłanie...",
    completeVerification: "Wypełnij weryfikację przed wysłaniem.",
    submitErrorContact: "Nie udało się wysłać. Skontaktuj się przez WhatsApp lub e-mail.",
    rfqReceivedTitle: "RFQ otrzymane.",
    rfqReceivedDesc:
      "Przeanalizujemy ilość, zakres OEM i wymogi kraju i odpowiemy z MOQ, widełkami FOB i czasem realizacji.",
    panelBadge: "Zamówienie hurtowe",
    panelTitle: "Wyceń tę SKU dla zaopatrzenia placówki",
    panelDesc:
      "Podaj typ nabywcy, ilość, kraj i zakres OEM. Przygotujemy MOQ, widełki FOB, czas realizacji, plan pakowania i status dokumentów dla {product}.",
    panelMoq: "Referencja MOQ: {moq} sztuk",
    panelSkuFile: "Przegląd SKU, pakowania i pliku nabywcy",
    panelOem: "Dostępne wsparcie OEM / marki prywatnej",
    panelFormTitle: "Szybki formularz wyceny hurtowej",
    panelFormDesc: "Wypełniono dla {category}. Dodaj ilość, kraj i potrzebę OEM.",
    requestQuoteForSku: "Poproś o wycenę dla {sku}",
    quickBadge: "Szybkie RFQ",
    quickTitle: "Potrzebujesz cen hurtowych za pielęgnację skóry przy inkontynencji?",
    quickDesc:
      "Wyślij typ placówki, kategorię, ilość, potrzebę OEM i kraj. Odpowiemy z MOQ, widełkami FOB i czasem realizacji.",
    getBulkQuote: "Uzyskaj wycenę hurtową",
    needBulkPricing: "Potrzebujesz cen hurtowych?",
    whatsappMessage:
      "Cześć, interesują mnie Państwa produkty do pielęgnacji skóry przy inkontynencji. Czy możecie podać ceny B2B, MOQ, czas realizacji i dostępną dokumentację produktu?",
  },
}

// ---- Localized OPTION LABELS (value stays English canonical for scoring/API) ----

export const buyerTypeOptionsLocalized: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "Distributor", label: "Distributor" },
    { value: "Nursing Home", label: "Nursing Home" },
    { value: "Clinic", label: "Clinic" },
    { value: "Retailer", label: "Retailer" },
    { value: "Assisted Living", label: "Assisted Living" },
    { value: "Online Seller", label: "Online Seller" },
    { value: "Other", label: "Other" },
  ],
  ja: [
    { value: "Distributor", label: "代理店" },
    { value: "Nursing Home", label: "介護施設" },
    { value: "Clinic", label: "クリニック" },
    { value: "Retailer", label: "小売" },
    { value: "Assisted Living", label: "介護付き住宅" },
    { value: "Online Seller", label: "オンライン販売" },
    { value: "Other", label: "その他" },
  ],
  de: [
    { value: "Distributor", label: "Distributor" },
    { value: "Nursing Home", label: "Pflegeheim" },
    { value: "Clinic", label: "Klinik" },
    { value: "Retailer", label: "Einzelhändler" },
    { value: "Assisted Living", label: "Betreutes Wohnen" },
    { value: "Online Seller", label: "Online-Verkäufer" },
    { value: "Other", label: "Sonstiges" },
  ],
  es: [
    { value: "Distributor", label: "Distribuidor" },
    { value: "Nursing Home", label: "Residencia" },
    { value: "Clinic", label: "Clínica" },
    { value: "Retailer", label: "Minorista" },
    { value: "Assisted Living", label: "Vida asistida" },
    { value: "Online Seller", label: "Vendedor online" },
    { value: "Other", label: "Otro" },
  ],
  fr: [
    { value: "Distributor", label: "Distributeur" },
    { value: "Nursing Home", label: "Maison de retraite" },
    { value: "Clinic", label: "Clinique" },
    { value: "Retailer", label: "Détaillant" },
    { value: "Assisted Living", label: "Logement accompagné" },
    { value: "Online Seller", label: "Vendeur en ligne" },
    { value: "Other", label: "Autre" },
  ],
  pt: [
    { value: "Distributor", label: "Distribuidor" },
    { value: "Nursing Home", label: "Residência" },
    { value: "Clinic", label: "Clínica" },
    { value: "Retailer", label: "Varejista" },
    { value: "Assisted Living", label: "Vida assistida" },
    { value: "Online Seller", label: "Vendedor online" },
    { value: "Other", label: "Outro" },
  ],
  pl: [
    { value: "Distributor", label: "Dystrybutor" },
    { value: "Nursing Home", label: "Dom opieki" },
    { value: "Clinic", label: "Klinika" },
    { value: "Retailer", label: "Detalista" },
    { value: "Assisted Living", label: "Mieszkania z opieką" },
    { value: "Online Seller", label: "Sprzedawca online" },
    { value: "Other", label: "Inne" },
  ],
}

export const facilityTypeOptionsLocalized: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "Nursing Home", label: "Nursing Home" },
    { value: "Distributor", label: "Distributor" },
    { value: "Clinic", label: "Clinic" },
    { value: "Assisted Living", label: "Assisted Living" },
    { value: "Other", label: "Other" },
  ],
  ja: [
    { value: "Nursing Home", label: "介護施設" },
    { value: "Distributor", label: "代理店" },
    { value: "Clinic", label: "クリニック" },
    { value: "Assisted Living", label: "介護付き住宅" },
    { value: "Other", label: "その他" },
  ],
  de: [
    { value: "Nursing Home", label: "Pflegeheim" },
    { value: "Distributor", label: "Distributor" },
    { value: "Clinic", label: "Klinik" },
    { value: "Assisted Living", label: "Betreutes Wohnen" },
    { value: "Other", label: "Sonstiges" },
  ],
  es: [
    { value: "Nursing Home", label: "Residencia" },
    { value: "Distributor", label: "Distribuidor" },
    { value: "Clinic", label: "Clínica" },
    { value: "Assisted Living", label: "Vida asistida" },
    { value: "Other", label: "Otro" },
  ],
  fr: [
    { value: "Nursing Home", label: "Maison de retraite" },
    { value: "Distributor", label: "Distributeur" },
    { value: "Clinic", label: "Clinique" },
    { value: "Assisted Living", label: "Logement accompagné" },
    { value: "Other", label: "Autre" },
  ],
  pt: [
    { value: "Nursing Home", label: "Residência" },
    { value: "Distributor", label: "Distribuidor" },
    { value: "Clinic", label: "Clínica" },
    { value: "Assisted Living", label: "Vida assistida" },
    { value: "Other", label: "Outro" },
  ],
  pl: [
    { value: "Nursing Home", label: "Dom opieki" },
    { value: "Distributor", label: "Dystrybutor" },
    { value: "Clinic", label: "Klinika" },
    { value: "Assisted Living", label: "Mieszkania z opieką" },
    { value: "Other", label: "Inne" },
  ],
}

export const monthlyVolumeOptionsLocalized: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "Under 100 units/month", label: "Under 100 units/month" },
    { value: "100-500 units/month", label: "100-500 units/month" },
    { value: "500-2,000 units/month", label: "500-2,000 units/month" },
    { value: "2,000+ units/month", label: "2,000+ units/month" },
    { value: "Project-based purchase", label: "Project-based purchase" },
  ],
  ja: [
    { value: "Under 100 units/month", label: "100個未満/月" },
    { value: "100-500 units/month", label: "100-500個/月" },
    { value: "500-2,000 units/month", label: "500-2,000個/月" },
    { value: "2,000+ units/month", label: "2,000個以上/月" },
    { value: "Project-based purchase", label: "プロジェクト単位の購入" },
  ],
  de: [
    { value: "Under 100 units/month", label: "Unter 100 Einheiten/Monat" },
    { value: "100-500 units/month", label: "100-500 Einheiten/Monat" },
    { value: "500-2,000 units/month", label: "500-2.000 Einheiten/Monat" },
    { value: "2,000+ units/month", label: "2.000+ Einheiten/Monat" },
    { value: "Project-based purchase", label: "Projektbasierter Einkauf" },
  ],
  es: [
    { value: "Under 100 units/month", label: "Menos de 100 unidades/mes" },
    { value: "100-500 units/month", label: "100-500 unidades/mes" },
    { value: "500-2,000 units/month", label: "500-2.000 unidades/mes" },
    { value: "2,000+ units/month", label: "2.000+ unidades/mes" },
    { value: "Project-based purchase", label: "Compra por proyecto" },
  ],
  fr: [
    { value: "Under 100 units/month", label: "Moins de 100 unités/mois" },
    { value: "100-500 units/month", label: "100-500 unités/mois" },
    { value: "500-2,000 units/month", label: "500-2.000 unités/mois" },
    { value: "2,000+ units/month", label: "2.000+ unités/mois" },
    { value: "Project-based purchase", label: "Achat par projet" },
  ],
  pt: [
    { value: "Under 100 units/month", label: "Menos de 100 unidades/mês" },
    { value: "100-500 units/month", label: "100-500 unidades/mês" },
    { value: "500-2,000 units/month", label: "500-2.000 unidades/mês" },
    { value: "2,000+ units/month", label: "2.000+ unidades/mês" },
    { value: "Project-based purchase", label: "Compra por projeto" },
  ],
  pl: [
    { value: "Under 100 units/month", label: "Poniżej 100 sztuk/miesiąc" },
    { value: "100-500 units/month", label: "100-500 sztuk/miesiąc" },
    { value: "500-2,000 units/month", label: "500-2.000 sztuk/miesiąc" },
    { value: "2,000+ units/month", label: "2.000+ sztuk/miesiąc" },
    { value: "Project-based purchase", label: "Zakup projektowy" },
  ],
}

export const urgencyOptionsLocalized: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "Need quote this week", label: "Need quote this week" },
    { value: "Sample request first", label: "Sample request first" },
    { value: "Bulk order within 30 days", label: "Bulk order within 30 days" },
    { value: "Planning next quarter", label: "Planning next quarter" },
    { value: "Price comparison only", label: "Price comparison only" },
  ],
  ja: [
    { value: "Need quote this week", label: "今週中に見積もりが必要" },
    { value: "Sample request first", label: "まずサンプル依頼" },
    { value: "Bulk order within 30 days", label: "30日以内の一括注文" },
    { value: "Planning next quarter", label: "次四半期を計画中" },
    { value: "Price comparison only", label: "価格比較のみ" },
  ],
  de: [
    { value: "Need quote this week", label: "Diese Woche Angebot nötig" },
    { value: "Sample request first", label: "Zuerst Muster anfragen" },
    { value: "Bulk order within 30 days", label: "Großauftrag innerhalb 30 Tage" },
    { value: "Planning next quarter", label: "Planung nächstes Quartal" },
    { value: "Price comparison only", label: "Nur Preisvergleich" },
  ],
  es: [
    { value: "Need quote this week", label: "Necesito cotización esta semana" },
    { value: "Sample request first", label: "Primero solicitar muestra" },
    { value: "Bulk order within 30 days", label: "Pedido de volumen en 30 días" },
    { value: "Planning next quarter", label: "Planificando próximo trimestre" },
    { value: "Price comparison only", label: "Solo comparación de precios" },
  ],
  fr: [
    { value: "Need quote this week", label: "Devis nécessaire cette semaine" },
    { value: "Sample request first", label: "D'abord demande d'échantillon" },
    { value: "Bulk order within 30 days", label: "Commande de gros sous 30 jours" },
    { value: "Planning next quarter", label: "Planification prochain trimestre" },
    { value: "Price comparison only", label: "Comparaison de prix uniquement" },
  ],
  pt: [
    { value: "Need quote this week", label: "Preciso de cotação esta semana" },
    { value: "Sample request first", label: "Primeiro solicitar amostra" },
    { value: "Bulk order within 30 days", label: "Pedido de volume em 30 dias" },
    { value: "Planning next quarter", label: "Planejando próximo trimestre" },
    { value: "Price comparison only", label: "Apenas comparação de preços" },
  ],
  pl: [
    { value: "Need quote this week", label: "Wycena potrzebna w tym tygodniu" },
    { value: "Sample request first", label: "Najpierw próbka" },
    { value: "Bulk order within 30 days", label: "Hurtowy w ciągu 30 dni" },
    { value: "Planning next quarter", label: "Planowanie na następny kwartał" },
    { value: "Price comparison only", label: "Tylko porównanie cen" },
  ],
}

export const productCategoryOptionsLocalized: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "Cleansing", label: "Cleansing" },
    { value: "Barrier Protection", label: "Barrier Protection" },
    { value: "Complete Care Kits", label: "Complete Care Kits" },
    { value: "Mixed Incontinence Skin Care Bundle", label: "Mixed Incontinence Skin Care Bundle" },
  ],
  ja: [
    { value: "Cleansing", label: "洗浄" },
    { value: "Barrier Protection", label: "バリア保護" },
    { value: "Complete Care Kits", label: "完結ケアキット" },
    { value: "Mixed Incontinence Skin Care Bundle", label: "混合失禁スキンケアバンドル" },
  ],
  de: [
    { value: "Cleansing", label: "Reinigung" },
    { value: "Barrier Protection", label: "Barriereschutz" },
    { value: "Complete Care Kits", label: "Komplette Pflegesets" },
    { value: "Mixed Incontinence Skin Care Bundle", label: "Gemischtes Inkontinenz-Pflege-Bundle" },
  ],
  es: [
    { value: "Cleansing", label: "Limpieza" },
    { value: "Barrier Protection", label: "Protección de barrera" },
    { value: "Complete Care Kits", label: "Kits completos" },
    { value: "Mixed Incontinence Skin Care Bundle", label: "Bundle mixto de cuidado por incontinencia" },
  ],
  fr: [
    { value: "Cleansing", label: "Nettoyage" },
    { value: "Barrier Protection", label: "Protection barrière" },
    { value: "Complete Care Kits", label: "Kits complets" },
    { value: "Mixed Incontinence Skin Care Bundle", label: "Bundle mixte de soins incontinence" },
  ],
  pt: [
    { value: "Cleansing", label: "Limpeza" },
    { value: "Barrier Protection", label: "Proteção de barreira" },
    { value: "Complete Care Kits", label: "Kits completos" },
    { value: "Mixed Incontinence Skin Care Bundle", label: "Bundle misto de cuidados por incontinência" },
  ],
  pl: [
    { value: "Cleansing", label: "Mycie" },
    { value: "Barrier Protection", label: "Ochrona barierowa" },
    { value: "Complete Care Kits", label: "Kompletne zestawy" },
    { value: "Mixed Incontinence Skin Care Bundle", label: "Mieszane bundle pielęgnacji inkontynencji" },
  ],
}

// ---- RFQ PAGE chrome (badge/hero/checklist/side notes/placeholders) ----

export interface RfqPageContent {
  badge: string
  heroTitle: string
  heroDesc: string
  whatToInclude: string
  checklist: string[]
  sideNoteAi: string
  sideNoteCompliance: string
  formSendTitle: string
  formSubmittedTitle: string
  typicalReply: string
  submittedDesc: string
  nextStep: string
  leadStatus: string
  leadId: string
  archive: string
  emailNotify: string
  webhookSync: string
  leadPriorityLabel: string
  tags: string
  backToProducts: string
  applyTrade: string
  companyName: string
  contactName: string
  email: string
  phoneWhatsapp: string
  country: string
  targetMarket: string
  buyerType: string
  facilityType: string
  productCategory: string
  monthlyVolume: string
  urgencyLevel: string
  specificProduct: string
  sku: string
  estimatedQuantity: string
  oemRequired: string
  destinationPort: string
  packagingNeeds: string
  certNeeds: string
  message: string
  submitRfq: string
  submitting: string
  phCompany: string
  phName: string
  phEmail: string
  phPhone: string
  phCountry: string
  phTargetMarket: string
  phProduct: string
  phSku: string
  phQuantity: string
  phPackaging: string
  phCert: string
  phMessage: string
}

export const rfqPageContent: Record<Locale, RfqPageContent> = {
  en: {
    badge: "Request for Quotation",
    heroTitle: "Request MOQ, FOB, Lead Time, and Current Document Status",
    heroDesc:
      "Use this bulk order entry form when you already know the facility type, product category, estimated quantity, OEM requirement, and country. We will reply with pricing, packaging options, lead time, and supplier-file status by SKU.",
    whatToInclude: "What to include",
    checklist: [
      "Target SKU or category",
      "Estimated quantity / MOQ target",
      "Destination market or port",
      "Packaging / OEM requirements",
      "Requested certificate or test file status",
    ],
    sideNoteAi: "Current website visuals are internal AI-generated placeholders for launch readiness.",
    sideNoteCompliance:
      "Manuals, labels, and market-entry document requirements can be aligned by SKU, target market, and packaging scope.",
    formSendTitle: "Send RFQ",
    formSubmittedTitle: "RFQ Submitted",
    typicalReply: "Typical reply time: within 1 business day.",
    submittedDesc: "Your RFQ is recorded. The team will review product scope, MOQ, and document status.",
    nextStep:
      "Next step: keep WhatsApp and email available for follow-up on sample timing, packaging, and supplier file checks.",
    leadStatus: "Lead status",
    leadId: "Lead ID:",
    archive: "Archive:",
    emailNotify: "Email notify:",
    webhookSync: "Webhook sync:",
    leadPriorityLabel: "Lead priority:",
    tags: "Tags:",
    backToProducts: "Back to Products",
    applyTrade: "Apply for Trade Account",
    companyName: "Company Name",
    contactName: "Contact Name *",
    email: "Email *",
    phoneWhatsapp: "Phone / WhatsApp",
    country: "Country *",
    targetMarket: "Target Market",
    buyerType: "Buyer Type *",
    facilityType: "Facility Type *",
    productCategory: "Product Category *",
    monthlyVolume: "Monthly Volume *",
    urgencyLevel: "Urgency Level *",
    specificProduct: "Specific Product / Category *",
    sku: "SKU",
    estimatedQuantity: "Estimated Quantity *",
    oemRequired: "OEM Required *",
    destinationPort: "Destination Port",
    packagingNeeds: "Packaging / OEM Needs",
    certNeeds: "Certificate / Test File Needs",
    message: "Message",
    submitRfq: "Submit RFQ",
    submitting: "Submitting...",
    phCompany: "Your company name",
    phName: "Your full name",
    phEmail: "you@company.com",
    phPhone: "+44 1234 567890",
    phCountry: "United Kingdom, Germany, etc.",
    phTargetMarket: "UK retail, EU distributor, care-home project...",
    phProduct: "Product name or category",
    phSku: "DS-CLN-200",
    phQuantity: "e.g. 500 pcs / 60 bags",
    phPackaging: "Logo, carton, insert, barcode...",
    phCert: "CE, ISO, test report, pending check...",
    phMessage:
      "Tell us the SKUs, price target, packaging scope, document status you need checked, and timeline.",
  },
  ja: {
    badge: "見積依頼 (RFQ)",
    heroTitle: "MOQ、FOB、リードタイム、現在の文書ステータスをご依頼",
    heroDesc:
      "施設種別、製品カテゴリ、概算数量、OEM要否、国が既に決まっている場合は、この一括注文フォームをご利用ください。価格、梱包オプション、リードタイム、SKUごとの供給元ファイルステータスで返信します。",
    whatToInclude: "含めるもの",
    checklist: [
      "対象SKUまたはカテゴリ",
      "概算数量 / MOQ目標",
      "対象市場または港",
      "梱包 / OEM要件",
      "ご要望の証明書または試験ファイルステータス",
    ],
    sideNoteAi: "現在のサイト画像は、ローンチ準備用の社内向けAI生成プレースホルダーです。",
    sideNoteCompliance:
      "マニュアル、ラベル、市場参入の書類要件は、SKU・対象市場・梱包範囲に合わせて調整できます。",
    formSendTitle: "RFQを送信",
    formSubmittedTitle: "RFQを送信しました",
    typicalReply: "通常の返信: 1営業日以内。",
    submittedDesc: "RFQを受け付けました。チームが製品範囲、MOQ、文書ステータスを確認します。",
    nextStep:
      "次のステップ: サンプル日程、梱包、供給元ファイル確認のフォローに備え、WhatsAppとメールをご確認ください。",
    leadStatus: "リードステータス",
    leadId: "リードID:",
    archive: "保存:",
    emailNotify: "メール通知:",
    webhookSync: "Webhook連携:",
    leadPriorityLabel: "リード優先度:",
    tags: "タグ:",
    backToProducts: "製品に戻る",
    applyTrade: "貿易アカウントを申請",
    companyName: "会社名",
    contactName: "担当者名 *",
    email: "メール *",
    phoneWhatsapp: "電話 / WhatsApp",
    country: "国 *",
    targetMarket: "対象市場",
    buyerType: "バイヤー種別 *",
    facilityType: "施設種別 *",
    productCategory: "製品カテゴリ *",
    monthlyVolume: "月間ボリューム *",
    urgencyLevel: "緊急度 *",
    specificProduct: "具体的な製品 / カテゴリ *",
    sku: "SKU",
    estimatedQuantity: "概算数量 *",
    oemRequired: "OEM要否 *",
    destinationPort: "仕向港",
    packagingNeeds: "梱包 / OEM要件",
    certNeeds: "証明書 / 試験ファイル要件",
    message: "メッセージ",
    submitRfq: "RFQを送信",
    submitting: "送信中...",
    phCompany: "会社名",
    phName: "氏名",
    phEmail: "you@company.com",
    phPhone: "+81 90-1234-5678",
    phCountry: "日本、ドイツなど",
    phTargetMarket: "英国小売、EU卸、施設プロジェクト...",
    phProduct: "製品名またはカテゴリ",
    phSku: "DS-CLN-200",
    phQuantity: "例: 500個 / 60袋",
    phPackaging: "ロゴ、箱、台紙、バーコード...",
    phCert: "CE、ISO、試験報告、要確認...",
    phMessage: "SKU、価格目標、梱包範囲、確認が必要な文書ステータス、納期をお知らせください。",
  },
  de: {
    badge: "Angebotsanfrage (RFQ)",
    heroTitle: "MOQ, FOB, Lieferzeit und aktuellen Dokumentenstatus anfragen",
    heroDesc:
      "Nutzen Sie dieses Volumen-Bestellformular, wenn Einrichtungstyp, Produktkategorie, geschätzte Menge, OEM-Bedarf und Land bereits feststehen. Wir antworten mit Preisen, Verpackungsoptionen, Lieferzeit und Lieferantendatei-Status pro SKU.",
    whatToInclude: "Was anzugeben ist",
    checklist: [
      "Ziel-SKU oder Kategorie",
      "Geschätzte Menge / MOQ-Ziel",
      "Zielmarkt oder Hafen",
      "Verpackungs- / OEM-Anforderungen",
      "Angefragter Zertifikats- oder Testdatei-Status",
    ],
    sideNoteAi:
      "Die aktuellen Website-Bilder sind interne KI-generierte Platzhalter für die Markteinführungsbereitschaft.",
    sideNoteCompliance:
      "Handbücher, Etiketten und markteintrittsrelevante Dokumentanforderungen lassen sich nach SKU, Zielmarkt und Verpackungsumfang abstimmen.",
    formSendTitle: "RFQ senden",
    formSubmittedTitle: "RFQ gesendet",
    typicalReply: "Typische Antwortzeit: innerhalb 1 Werktag.",
    submittedDesc: "Ihre RFQ ist erfasst. Das Team prüft Produktumfang, MOQ und Dokumentenstatus.",
    nextStep:
      "Nächster Schritt: Halten Sie WhatsApp und E-Mail für Rückfragen zu Mustertermin, Verpackung und Lieferantendatei-Checks bereit.",
    leadStatus: "Lead-Status",
    leadId: "Lead-ID:",
    archive: "Archiv:",
    emailNotify: "E-Mail-Benachrichtigung:",
    webhookSync: "Webhook-Sync:",
    leadPriorityLabel: "Lead-Priorität:",
    tags: "Tags:",
    backToProducts: "Zurück zu Produkten",
    applyTrade: "Handelskonto beantragen",
    companyName: "Unternehmen",
    contactName: "Kontaktname *",
    email: "E-Mail *",
    phoneWhatsapp: "Telefon / WhatsApp",
    country: "Land *",
    targetMarket: "Zielmarkt",
    buyerType: "Käufertyp *",
    facilityType: "Einrichtungstyp *",
    productCategory: "Produktkategorie *",
    monthlyVolume: "Monatsvolumen *",
    urgencyLevel: "Dringlichkeit *",
    specificProduct: "Konkretes Produkt / Kategorie *",
    sku: "SKU",
    estimatedQuantity: "Geschätzte Menge *",
    oemRequired: "OEM erforderlich *",
    destinationPort: "Zielhafen",
    packagingNeeds: "Verpackungs- / OEM-Bedarf",
    certNeeds: "Zertifikats- / Testdatei-Bedarf",
    message: "Nachricht",
    submitRfq: "RFQ absenden",
    submitting: "Wird gesendet...",
    phCompany: "Ihr Unternehmensname",
    phName: "Ihr vollständiger Name",
    phEmail: "you@company.com",
    phPhone: "+49 123 4567890",
    phCountry: "Vereinigtes Königreich, Deutschland usw.",
    phTargetMarket: "UK-Einzelhandel, EU-Distributor, Pflegeheim-Projekt...",
    phProduct: "Produktname oder Kategorie",
    phSku: "DS-CLN-200",
    phQuantity: "z. B. 500 Stk / 60 Beutel",
    phPackaging: "Logo, Karton, Beilage, Barcode...",
    phCert: "CE, ISO, Testbericht, offen...",
    phMessage: "Nennen Sie SKUs, Preisziel, Verpackungsumfang, zu prüfenden Dokumentenstatus und Zeitrahmen.",
  },
  es: {
    badge: "Solicitud de cotización (RFQ)",
    heroTitle: "Solicite MOQ, FOB, plazo de entrega y estado de documentos actual",
    heroDesc:
      "Use este formulario de pedido de volumen cuando ya conozca el tipo de instalación, categoría de producto, cantidad estimada, requisito OEM y país. Responderemos con precios, opciones de embalaje, plazo y estado de archivo de proveedor por SKU.",
    whatToInclude: "Qué incluir",
    checklist: [
      "SKU o categoría objetivo",
      "Cantidad estimada / objetivo MOQ",
      "Mercado o puerto de destino",
      "Requisitos de embalaje / OEM",
      "Estado de certificado o archivo de prueba solicitado",
    ],
    sideNoteAi:
      "Las imágenes actuales del sitio son marcadores de posición generados por IA internamente para la preparación del lanzamiento.",
    sideNoteCompliance:
      "Los manuales, etiquetas y requisitos documentales de entrada al mercado pueden alinearse por SKU, mercado objetivo y alcance de embalaje.",
    formSendTitle: "Enviar RFQ",
    formSubmittedTitle: "RFQ enviada",
    typicalReply: "Tiempo típico de respuesta: dentro de 1 día hábil.",
    submittedDesc: "Su RFQ está registrada. El equipo revisará alcance, MOQ y estado de documentos.",
    nextStep:
      "Siguiente paso: mantenga WhatsApp y correo disponibles para seguimiento de tiempos de muestra, embalaje y verificación de archivos de proveedor.",
    leadStatus: "Estado del lead",
    leadId: "ID del lead:",
    archive: "Archivo:",
    emailNotify: "Notificación por correo:",
    webhookSync: "Sinc. webhook:",
    leadPriorityLabel: "Prioridad del lead:",
    tags: "Etiquetas:",
    backToProducts: "Volver a productos",
    applyTrade: "Solicitar cuenta comercial",
    companyName: "Nombre de empresa",
    contactName: "Nombre de contacto *",
    email: "Correo *",
    phoneWhatsapp: "Teléfono / WhatsApp",
    country: "País *",
    targetMarket: "Mercado objetivo",
    buyerType: "Tipo de comprador *",
    facilityType: "Tipo de instalación *",
    productCategory: "Categoría de producto *",
    monthlyVolume: "Volumen mensual *",
    urgencyLevel: "Nivel de urgencia *",
    specificProduct: "Producto / categoría específico *",
    sku: "SKU",
    estimatedQuantity: "Cantidad estimada *",
    oemRequired: "OEM requerido *",
    destinationPort: "Puerto de destino",
    packagingNeeds: "Necesidades de embalaje / OEM",
    certNeeds: "Necesidades de certificado / archivo de prueba",
    message: "Mensaje",
    submitRfq: "Enviar RFQ",
    submitting: "Enviando...",
    phCompany: "Nombre de su empresa",
    phName: "Su nombre completo",
    phEmail: "you@company.com",
    phPhone: "+34 123 456 789",
    phCountry: "Reino Unido, Alemania, etc.",
    phTargetMarket: "Minorista Reino Unido, distribuidor UE, proyecto de residencia...",
    phProduct: "Nombre o categoría del producto",
    phSku: "DS-CLN-200",
    phQuantity: "p. ej. 500 uds / 60 bolsas",
    phPackaging: "Logo, caja, inserto, código de barras...",
    phCert: "CE, ISO, informe de prueba, pendiente...",
    phMessage: "Indíquenos las SKU, objetivo de precio, alcance de embalaje, estado de documentos a verificar y plazos.",
  },
  fr: {
    badge: "Demande de devis (RFQ)",
    heroTitle: "Demandez MOQ, FOB, délai et statut documentaire actuel",
    heroDesc:
      "Utilisez ce formulaire de commande de gros quand vous connaissez déjà le type d'établissement, la catégorie de produit, la quantité estimée, le besoin OEM et le pays. Nous répondons avec prix, options d'emballage, délai et statut de fichier fournisseur par SKU.",
    whatToInclude: "À inclure",
    checklist: [
      "SKU ou catégorie cible",
      "Quantité estimée / objectif MOQ",
      "Marché ou port de destination",
      "Exigences d'emballage / OEM",
      "Statut de certificat ou fichier de test demandé",
    ],
    sideNoteAi:
      "Les visuels actuels du site sont des espaces réservés générés par IA en interne pour la préparation du lancement.",
    sideNoteCompliance:
      "Les manuels, étiquettes et exigences documentaires d'entrée sur le marché peuvent être alignés par SKU, marché cible et périmètre d'emballage.",
    formSendTitle: "Envoyer le RFQ",
    formSubmittedTitle: "RFQ envoyé",
    typicalReply: "Délai de réponse typique : sous 1 jour ouvré.",
    submittedDesc: "Votre RFQ est enregistrée. L'équipe examinera périmètre, MOQ et statut documentaire.",
    nextStep:
      "Étape suivante : gardez WhatsApp et e-mail disponibles pour le suivi des délais d'échantillon, de l'emballage et des vérifications de fichiers fournisseur.",
    leadStatus: "Statut du lead",
    leadId: "ID du lead :",
    archive: "Archive :",
    emailNotify: "Notification e-mail :",
    webhookSync: "Sync webhook :",
    leadPriorityLabel: "Priorité du lead :",
    tags: "Étiquettes :",
    backToProducts: "Retour aux produits",
    applyTrade: "Demander un compte professionnel",
    companyName: "Nom de l'entreprise",
    contactName: "Nom du contact *",
    email: "E-mail *",
    phoneWhatsapp: "Téléphone / WhatsApp",
    country: "Pays *",
    targetMarket: "Marché cible",
    buyerType: "Type d'acheteur *",
    facilityType: "Type d'établissement *",
    productCategory: "Catégorie de produit *",
    monthlyVolume: "Volume mensuel *",
    urgencyLevel: "Niveau d'urgence *",
    specificProduct: "Produit / catégorie spécifique *",
    sku: "SKU",
    estimatedQuantity: "Quantité estimée *",
    oemRequired: "OEM requis *",
    destinationPort: "Port de destination",
    packagingNeeds: "Besoins d'emballage / OEM",
    certNeeds: "Besoins de certificat / fichier de test",
    message: "Message",
    submitRfq: "Envoyer le RFQ",
    submitting: "Envoi...",
    phCompany: "Nom de votre entreprise",
    phName: "Votre nom complet",
    phEmail: "you@company.com",
    phPhone: "+33 1 23 45 67 89",
    phCountry: "Royaume-Uni, Allemagne, etc.",
    phTargetMarket: "Détaillant UK, distributeur UE, projet de résidence...",
    phProduct: "Nom ou catégorie du produit",
    phSku: "DS-CLN-200",
    phQuantity: "ex. 500 pcs / 60 sacs",
    phPackaging: "Logo, carton, insert, code-barres...",
    phCert: "CE, ISO, rapport de test, en attente...",
    phMessage: "Indiquez les SKU, l'objectif de prix, le périmètre d'emballage, le statut documentaire à vérifier et le calendrier.",
  },
  pt: {
    badge: "Solicitação de cotação (RFQ)",
    heroTitle: "Solicite MOQ, FOB, prazo e status de documentos atual",
    heroDesc:
      "Use este formulário de pedido de volume quando já souber o tipo de instalação, categoria de produto, quantidade estimada, exigência OEM e país. Responderemos com preços, opções de embalagem, prazo e status de arquivo do fornecedor por SKU.",
    whatToInclude: "O que incluir",
    checklist: [
      "SKU ou categoria alvo",
      "Quantidade estimada / meta de MOQ",
      "Mercado ou porto de destino",
      "Requisitos de embalagem / OEM",
      "Status de certificado ou arquivo de teste solicitado",
    ],
    sideNoteAi:
      "As imagens atuais do site são espaços reservados gerados por IA internamente para preparação de lançamento.",
    sideNoteCompliance:
      "Manuais, rótulos e exigências documentais de entrada no mercado podem ser alinhados por SKU, mercado-alvo e escopo de embalagem.",
    formSendTitle: "Enviar RFQ",
    formSubmittedTitle: "RFQ enviada",
    typicalReply: "Tempo típico de resposta: em até 1 dia útil.",
    submittedDesc: "Sua RFQ está registrada. A equipe revisará escopo, MOQ e status de documentos.",
    nextStep:
      "Próximo passo: mantenha WhatsApp e e-mail disponíveis para acompanhamento de prazos de amostra, embalagem e verificações de arquivo do fornecedor.",
    leadStatus: "Status do lead",
    leadId: "ID do lead:",
    archive: "Arquivo:",
    emailNotify: "Notificação por e-mail:",
    webhookSync: "Sinc. webhook:",
    leadPriorityLabel: "Prioridade do lead:",
    tags: "Tags:",
    backToProducts: "Voltar aos produtos",
    applyTrade: "Solicitar conta comercial",
    companyName: "Nome da empresa",
    contactName: "Nome do contato *",
    email: "E-mail *",
    phoneWhatsapp: "Telefone / WhatsApp",
    country: "País *",
    targetMarket: "Mercado-alvo",
    buyerType: "Tipo de comprador *",
    facilityType: "Tipo de instalação *",
    productCategory: "Categoria de produto *",
    monthlyVolume: "Volume mensal *",
    urgencyLevel: "Nível de urgência *",
    specificProduct: "Produto / categoria específico *",
    sku: "SKU",
    estimatedQuantity: "Quantidade estimada *",
    oemRequired: "OEM necessário *",
    destinationPort: "Porto de destino",
    packagingNeeds: "Necessidades de embalagem / OEM",
    certNeeds: "Necessidades de certificado / arquivo de teste",
    message: "Mensagem",
    submitRfq: "Enviar RFQ",
    submitting: "Enviando...",
    phCompany: "Nome da sua empresa",
    phName: "Seu nome completo",
    phEmail: "you@company.com",
    phPhone: "+351 123 456 789",
    phCountry: "Reino Unido, Alemanha, etc.",
    phTargetMarket: "Varejo Reino Unido, distribuidor UE, projeto de residência...",
    phProduct: "Nome ou categoria do produto",
    phSku: "DS-CLN-200",
    phQuantity: "ex. 500 un. / 60 sacos",
    phPackaging: "Logo, caixa, inserto, código de barras...",
    phCert: "CE, ISO, relatório de teste, pendente...",
    phMessage: "Informe as SKU, meta de preço, escopo de embalagem, status de documentos a verificar e prazos.",
  },
  pl: {
    badge: "Zapytanie ofertowe (RFQ)",
    heroTitle: "Zapytaj o MOQ, FOB, czas realizacji i aktualny status dokumentów",
    heroDesc:
      "Użyj tego formularza zamówienia hurtowego, gdy znasz już typ placówki, kategorię produktu, szacowaną ilość, wymóg OEM i kraj. Odpowiemy cenami, opcjami pakowania, czasem realizacji i statusem pliku dostawcy wg SKU.",
    whatToInclude: "Co podać",
    checklist: [
      "Docelowa SKU lub kategoria",
      "Szacowana ilość / cel MOQ",
      "Rynek lub port docelowy",
      "Wymogi pakowania / OEM",
      "Żądany status certyfikatu lub pliku testowego",
    ],
    sideNoteAi:
      "Obecne wizualizacje strony to wewnętrzne tymczasowe elementy generowane przez AI do przygotowania do premiery.",
    sideNoteCompliance:
      "Podręczniki, etykiety i wymogi dokumentacyjne wejścia na rynek można dopasować wg SKU, rynku docelowego i zakresu pakowania.",
    formSendTitle: "Wyślij RFQ",
    formSubmittedTitle: "RFQ wysłane",
    typicalReply: "Typowy czas odpowiedzi: w ciągu 1 dnia roboczego.",
    submittedDesc: "Twoje RFQ jest zarejestrowane. Zespół sprawdzi zakres, MOQ i status dokumentów.",
    nextStep:
      "Następny krok: miej dostępne WhatsApp i e-mail do follow-up o terminach próbek, pakowaniu i weryfikacji plików dostawcy.",
    leadStatus: "Status leada",
    leadId: "ID leada:",
    archive: "Archiwum:",
    emailNotify: "Powiadomienie e-mail:",
    webhookSync: "Sync webhook:",
    leadPriorityLabel: "Priorytet leada:",
    tags: "Tagi:",
    backToProducts: "Wróć do produktów",
    applyTrade: "Złóż wniosek o konto handlowe",
    companyName: "Nazwa firmy",
    contactName: "Imię i nazwisko *",
    email: "E-mail *",
    phoneWhatsapp: "Telefon / WhatsApp",
    country: "Kraj *",
    targetMarket: "Rynek docelowy",
    buyerType: "Typ nabywcy *",
    facilityType: "Typ placówki *",
    productCategory: "Kategoria produktu *",
    monthlyVolume: "Wolumen miesięczny *",
    urgencyLevel: "Poziom pilności *",
    specificProduct: "Konkretny produkt / kategoria *",
    sku: "SKU",
    estimatedQuantity: "Szacowana ilość *",
    oemRequired: "Wymagane OEM *",
    destinationPort: "Port docelowy",
    packagingNeeds: "Potrzeby pakowania / OEM",
    certNeeds: "Potrzeby certyfikatu / pliku testowego",
    message: "Wiadomość",
    submitRfq: "Wyślij RFQ",
    submitting: "Wysyłanie...",
    phCompany: "Nazwa Twojej firmy",
    phName: "Twoje pełne imię",
    phEmail: "you@company.com",
    phPhone: "+48 123 456 789",
    phCountry: "Wielka Brytania, Niemcy itp.",
    phTargetMarket: "Detal UK, dystrybutor UE, projekt domu opieki...",
    phProduct: "Nazwa lub kategoria produktu",
    phSku: "DS-CLN-200",
    phQuantity: "np. 500 szt. / 60 toreb",
    phPackaging: "Logo, karton, insert, kod kreskowy...",
    phCert: "CE, ISO, raport testu, oczekuje...",
    phMessage: "Podaj SKU, cel cenowy, zakres pakowania, status dokumentów do sprawdzenia i harmonogram.",
  },
}

// ---------------------------------------------------------------------------
// RFQ Dashboard (internal back-office view) — chrome + label localization
// ---------------------------------------------------------------------------

export interface RfqDashboardContent {
  badge: string
  heroTitle: string
  heroDesc: string
  openForm: string
  metricTotal: string
  metricHot: string
  metricQualified: string
  metricOem: string
  metricSample: string
  sectionHot: string
  emptyHot: string
  sectionOem: string
  emptyOem: string
  sectionAll: string
  emptyAll: string
  fBuyer: string
  fProduct: string
  fQuantity: string
  fMonthly: string
  fUrgency: string
  fOem: string
  fCountry: string
  fSubmitted: string
  fLeadId: string
  notProvided: string
  pHot: string
  pQualified: string
  pNurture: string
  tHighValue: string
  tOem: string
  tSample: string
}

export const rfqDashboardContent: Record<Locale, RfqDashboardContent> = {
  en: {
    badge: "RFQ Dashboard",
    heroTitle: "Categorized Buyer Inquiries",
    heroDesc: "New RFQs are automatically scored and tagged by buyer type, monthly volume, urgency, OEM signal, and sample request intent.",
    openForm: "Open RFQ Form",
    metricTotal: "Total RFQs",
    metricHot: "Hot Leads",
    metricQualified: "Qualified",
    metricOem: "OEM Potential",
    metricSample: "Sample Requests",
    sectionHot: "Hot / High Value",
    emptyHot: "No hot leads yet. New high-volume distributor, nursing home, and OEM RFQs will appear here.",
    sectionOem: "OEM / Sample Follow-Up",
    emptyOem: "No OEM or sample leads yet. OEM and sample signals are tagged automatically after submission.",
    sectionAll: "All Recent RFQs",
    emptyAll: "No RFQs recorded in the current runtime ledger yet.",
    fBuyer: "Buyer",
    fProduct: "Product",
    fQuantity: "Quantity",
    fMonthly: "Monthly",
    fUrgency: "Urgency",
    fOem: "OEM",
    fCountry: "Country",
    fSubmitted: "Submitted",
    fLeadId: "Lead ID",
    notProvided: "Not provided",
    pHot: "Hot",
    pQualified: "Qualified",
    pNurture: "Nurture",
    tHighValue: "HIGH VALUE LEAD",
    tOem: "OEM POTENTIAL",
    tSample: "SAMPLE REQUEST",
  },
  ja: {
    badge: "RFQダッシュボード",
    heroTitle: "分類されたバイヤーからの問い合わせ",
    heroDesc: "新着RFQは、バイヤー種別、月間ボリューム、緊急度、OEMの有無、サンプル要望に基づき自動的にスコアリング・タグ付けされます。",
    openForm: "RFQフォームを開く",
    metricTotal: "RFQ総数",
    metricHot: "ホットリード",
    metricQualified: "有望リード",
    metricOem: "OEMの可能性",
    metricSample: "サンプル依頼",
    sectionHot: "ホット / 高単価",
    emptyHot: "まだホットリードはありません。大量発注の卸・老人ホーム・OEMのRFQはこちらに表示されます。",
    sectionOem: "OEM / サンプルフォロー",
    emptyOem: "OEM・サンプルのリードはまだありません。OEMとサンプルのシグナルは送信後に自動でタグ付けされます。",
    sectionAll: "最近のすべてのRFQ",
    emptyAll: "現在のランタイム台帳にRFQは記録されていません。",
    fBuyer: "バイヤー",
    fProduct: "製品",
    fQuantity: "数量",
    fMonthly: "月間",
    fUrgency: "緊急度",
    fOem: "OEM",
    fCountry: "国",
    fSubmitted: "送信日時",
    fLeadId: "リードID",
    notProvided: "未入力",
    pHot: "ホット",
    pQualified: "有望",
    pNurture: "育成",
    tHighValue: "高単価リード",
    tOem: "OEMの可能性",
    tSample: "サンプル依頼",
  },
  de: {
    badge: "RFQ-Dashboard",
    heroTitle: "Kategorisierte Käuferanfragen",
    heroDesc: "Neue RFQs werden automatisch anhand von Käufertyp, Monatsvolumen, Dringlichkeit, OEM-Signal und Musteranfrage bewertet und verschlagwortet.",
    openForm: "RFQ-Formular öffnen",
    metricTotal: "RFQs gesamt",
    metricHot: "Hot Leads",
    metricQualified: "Qualifiziert",
    metricOem: "OEM-Potenzial",
    metricSample: "Musteranfragen",
    sectionHot: "Hot / Hoher Wert",
    emptyHot: "Noch keine Hot Leads. Neue RFQs mit hohem Volumen von Distributoren, Pflegeheimen und OEM werden hier angezeigt.",
    sectionOem: "OEM / Muster-Follow-up",
    emptyOem: "Noch keine OEM- oder Muster-Leads. OEM- und Muster-Signale werden nach dem Absenden automatisch verschlagwortet.",
    sectionAll: "Alle aktuellen RFQs",
    emptyAll: "Noch keine RFQs im aktuellen Runtime-Ledger erfasst.",
    fBuyer: "Käufer",
    fProduct: "Produkt",
    fQuantity: "Menge",
    fMonthly: "Monatlich",
    fUrgency: "Dringlichkeit",
    fOem: "OEM",
    fCountry: "Land",
    fSubmitted: "Eingereicht",
    fLeadId: "Lead-ID",
    notProvided: "Nicht angegeben",
    pHot: "Hot",
    pQualified: "Qualifiziert",
    pNurture: "Pflege",
    tHighValue: "WERTVOLLER LEAD",
    tOem: "OEM-POTENZIAL",
    tSample: "MUSTERANFRAGE",
  },
  es: {
    badge: "Panel de RFQ",
    heroTitle: "Consultas de compradores categorizadas",
    heroDesc: "Las RFQ nuevas se puntúan y etiquetan automáticamente según el tipo de comprador, el volumen mensual, la urgencia, la señal de OEM y la intención de solicitud de muestra.",
    openForm: "Abrir formulario de RFQ",
    metricTotal: "RFQ totales",
    metricHot: "Leads calientes",
    metricQualified: "Calificados",
    metricOem: "Potencial OEM",
    metricSample: "Solicitudes de muestra",
    sectionHot: "Calientes / Alto valor",
    emptyHot: "Aún no hay leads calientes. Aquí aparecerán las RFQ nuevas de alto volumen de distribuidores, residencias y OEM.",
    sectionOem: "Seguimiento OEM / Muestra",
    emptyOem: "Aún no hay leads OEM ni de muestra. Las señales de OEM y muestra se etiquetan automáticamente tras el envío.",
    sectionAll: "Todas las RFQ recientes",
    emptyAll: "Aún no hay RFQ registradas en el libro de runtime actual.",
    fBuyer: "Comprador",
    fProduct: "Producto",
    fQuantity: "Cantidad",
    fMonthly: "Mensual",
    fUrgency: "Urgencia",
    fOem: "OEM",
    fCountry: "País",
    fSubmitted: "Enviado",
    fLeadId: "ID de lead",
    notProvided: "No proporcionado",
    pHot: "Caliente",
    pQualified: "Calificado",
    pNurture: "Seguimiento",
    tHighValue: "LEAD DE ALTO VALOR",
    tOem: "POTENCIAL OEM",
    tSample: "SOLICITUD DE MUESTRA",
  },
  fr: {
    badge: "Tableau de bord RFQ",
    heroTitle: "Demandes des acheteurs catégorisées",
    heroDesc: "Les nouvelles RFQ sont automatiquement notées et étiquetées selon le type d'acheteur, le volume mensuel, l'urgence, le signal OEM et l'intention d'échantillon.",
    openForm: "Ouvrir le formulaire RFQ",
    metricTotal: "RFQ totales",
    metricHot: "Leads à chaud",
    metricQualified: "Qualifiés",
    metricOem: "Potentiel OEM",
    metricSample: "Demandes d'échantillon",
    sectionHot: "À chaud / Forte valeur",
    emptyHot: "Aucun lead à chaud pour l'instant. Les nouvelles RFQ à gros volume de distributeurs, d'établissements et d'OEM apparaîtront ici.",
    sectionOem: "Suivi OEM / Échantillon",
    emptyOem: "Aucun lead OEM ou échantillon pour l'instant. Les signaux OEM et échantillon sont étiquetés automatiquement après envoi.",
    sectionAll: "Toutes les RFQ récentes",
    emptyAll: "Aucune RFQ enregistrée dans le registre d'exécution actuel.",
    fBuyer: "Acheteur",
    fProduct: "Produit",
    fQuantity: "Quantité",
    fMonthly: "Mensuel",
    fUrgency: "Urgence",
    fOem: "OEM",
    fCountry: "Pays",
    fSubmitted: "Envoyé",
    fLeadId: "ID du lead",
    notProvided: "Non renseigné",
    pHot: "À chaud",
    pQualified: "Qualifié",
    pNurture: "À nourrir",
    tHighValue: "LEAD À FORTE VALEUR",
    tOem: "POTENTIEL OEM",
    tSample: "DEMANDE D'ÉCHANTILLON",
  },
  pt: {
    badge: "Painel de RFQ",
    heroTitle: "Consultas de compradores categorizadas",
    heroDesc: "Novas RFQs são pontuadas e etiquetadas automaticamente por tipo de comprador, volume mensal, urgência, sinal de OEM e intenção de solicitação de amostra.",
    openForm: "Abrir formulário de RFQ",
    metricTotal: "RFQ totais",
    metricHot: "Leads quentes",
    metricQualified: "Qualificados",
    metricOem: "Potencial OEM",
    metricSample: "Solicitações de amostra",
    sectionHot: "Quentes / Alto valor",
    emptyHot: "Ainda não há leads quentes. Novas RFQs de alto volume de distribuidores, lares e OEM aparecerão aqui.",
    sectionOem: "Acompanhamento OEM / Amostra",
    emptyOem: "Ainda não há leads OEM ou de amostra. Sinais de OEM e amostra são etiquetados automaticamente após o envio.",
    sectionAll: "Todas as RFQ recentes",
    emptyAll: "Nenhuma RFQ registrada no livro de runtime atual.",
    fBuyer: "Comprador",
    fProduct: "Produto",
    fQuantity: "Quantidade",
    fMonthly: "Mensal",
    fUrgency: "Urgência",
    fOem: "OEM",
    fCountry: "País",
    fSubmitted: "Enviado",
    fLeadId: "ID do lead",
    notProvided: "Não informado",
    pHot: "Quente",
    pQualified: "Qualificado",
    pNurture: "Nutrição",
    tHighValue: "LEAD DE ALTO VALOR",
    tOem: "POTENCIAL OEM",
    tSample: "SOLICITAÇÃO DE AMOSTRA",
  },
  pl: {
    badge: "Panel RFQ",
    heroTitle: "Pogrupowane zapytania kupujących",
    heroDesc: "Nowe RFQ są automatycznie oceniane i oznaczane według typu kupującego, miesięcznego wolumenu, pilności, sygnału OEM i zamiaru próbki.",
    openForm: "Otwórz formularz RFQ",
    metricTotal: "RFQ łącznie",
    metricHot: "Leady gorące",
    metricQualified: "Zakwalifikowane",
    metricOem: "Potencjał OEM",
    metricSample: "Prośby o próbkę",
    sectionHot: "Gorące / Wysoka wartość",
    emptyHot: "Brak jeszcze leadów gorących. Nowe RFQ o dużym wolumenie od dystrybutorów, domów opieki i OEM pojawią się tutaj.",
    sectionOem: "Obsługa OEM / Próbka",
    emptyOem: "Brak jeszcze leadów OEM ani próbki. Sygnały OEM i próbki są oznaczane automatycznie po wysłaniu.",
    sectionAll: "Wszystkie ostatnie RFQ",
    emptyAll: "Brak RFQ zapisanych w bieżącej księdze runtime.",
    fBuyer: "Kupujący",
    fProduct: "Produkt",
    fQuantity: "Ilość",
    fMonthly: "Miesięcznie",
    fUrgency: "Pilność",
    fOem: "OEM",
    fCountry: "Kraj",
    fSubmitted: "Wysłano",
    fLeadId: "ID leada",
    notProvided: "Nie podano",
    pHot: "Gorący",
    pQualified: "Zakwalifikowany",
    pNurture: "Pielęgnowanie",
    tHighValue: "LEAD O WYSOKIEJ WARTOŚCI",
    tOem: "POTENCJAŁ OEM",
    tSample: "PROŚBA O PRÓBKĘ",
  },
}
