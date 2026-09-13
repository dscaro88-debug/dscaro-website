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
