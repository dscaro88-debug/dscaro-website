// DS CARO — Product & Category localization layer (de/es/fr/pt/pl)
// English (en) and Japanese (ja) fall back to the base product data in lib/products.ts.
import type { Locale } from "@/lib/i18n"
import type { Product, ProductCategory } from "@/lib/products"

export interface ProductLocalized {
  name: string
  description: string
  features: string[]
  specs?: Record<string, string>
}

const LANGS: Locale[] = ["de", "es", "fr", "pt", "pl"]

export const productTranslations: Record<string, Partial<Record<Locale, ProductLocalized>>> = {
  "no-rinse-cleansing-foam-200-cln-200": {
    de: {
      name: "Rückstandsfreier Reinigungsschaum (200 ml)",
      description:
        "Ein sanfter, pH-neutraler rückstandsfreier Reinigungsschaum für die tägliche Intim- und Körperpflege bei Inkontinenz. Ohne Duftstoffe und Alkohol, reinigt und pflegt in einem Schritt und verringert Reibung auf empfindlicher, gereifter Haut.",
      features: [
        "Rückstandsfreie Formel — spart Zeit der Pflegenden und verringert Reibung",
        "pH-neutral, duftfrei, alkoholfrei",
        "Reinigt und pflegt in einem Schritt",
        "Geeignet für empfindliche, gereifte Haut",
        "OEM-Etikett, Sprachetikett und private Verpackung erhältlich",
      ],
      specs: {
        Format: "Rückstandsfreier Reinigungsschaum",
        Size: "Pumpenflasche 200 ml",
        "Skin Type": "Empfindliche, fragile, gereifte Haut",
        "Use Scenario": "Intim- und Körperreinigung beim Wickeln bei Inkontinenz",
        "Certification Path": "Kosmetische / Hygiene-Positionierung",
        Material: "Milde Tenside + Feuchthalter (Glycerin / Panthenol); duftfrei, alkoholfrei, pH-neutral",
        "Target Buyers":
          "Beschaffung von Pflegeheimen, Lieferketten für betreutes Wohnen, Inkontinenz-Pflege-Distributoren, Kanäle für häusliche Pflege",
        "Market Position":
          "Erwachsenenspezifischer sanfter Reiniger — reinigt und pflegt in einem Schritt, weniger Reibung auf fragiler Haut",
      },
    },
    es: {
      name: "Espuma de limpieza sin aclarado (200 ml)",
      description:
        "Una espuma de limpieza suave, con pH equilibrado y sin aclarado para el cuidado diario del área íntima y del cuerpo en rutinas de incontinencia. Sin fragancia ni alcohol, limpia e hidrata en un solo paso y reduce la fricción en la piel frágil y madura.",
      features: [
        "Fórmula sin aclarado — ahorra tiempo al cuidador y reduce la fricción",
        "pH equilibrado, sin fragancia, sin alcohol",
        "Limpia e hidrata en un solo paso",
        "Apta para piel sensible y madura",
        "Etiqueta OEM, etiqueta de idioma y caja privada disponibles",
      ],
      specs: {
        Format: "Espuma limpiadora sin aclarado",
        Size: "Botella bomba de 200 ml",
        "Skin Type": "Piel sensible, frágil y madura",
        "Use Scenario": "Limpieza íntima y corporal durante los cambios por incontinencia",
        "Certification Path": "Posicionamiento cosmético / de higiene",
        Material: "Tensoactivos suaves + humectantes (glicerina / pantenol); sin fragancia, sin alcohol, pH equilibrado",
        "Target Buyers":
          "Compras de residencias, cadenas de vida asistida, distribuidores de cuidado de incontinencia, canales de cuidado en el hogar",
        "Market Position":
          "Limpiador suave específico para adultos — limpia e hidrata en un paso, menos fricción en piel frágil",
      },
    },
    fr: {
      name: "Mousse nettoyante sans rinçage (200 ml)",
      description:
        "Une mousse nettoyante douce, à pH équilibré et sans rinçage pour les soins intimes et corporels quotidiens en cas d'incontinence. Sans parfum ni alcool, nettoie et hydrate en une seule étape, réduisant les frottements sur la peau fragile et maturée.",
      features: [
        "Formule sans rinçage — fait gagner du temps aux soignants et réduit les frottements",
        "pH équilibré, sans parfum, sans alcool",
        "Nettoie et hydrate en une seule étape",
        "Convient aux peaux sensibles et maturées",
        "Étiquette OEM, étiquette multilingue et carton privé disponibles",
      ],
      specs: {
        Format: "Mousse nettoyante sans rinçage",
        Size: "Flacon pompe 200 ml",
        "Skin Type": "Peau sensible, fragile et maturée",
        "Use Scenario": "Nettoyage intime et corporel lors des changes en cas d'incontinence",
        "Certification Path": "Positionnement cosmétique / hygiène",
        Material: "Tensioactifs doux + humectants (glycérine / panthénol); sans parfum, sans alcool, pH équilibré",
        "Target Buyers":
          "Achats de maisons de retraite, chaînes de logement accompagné, distributeurs de soins d'incontinence, canaux de soins à domicile",
        "Market Position":
          "Nettoyant doux spécifique aux adultes — nettoie et hydrate en une étape, moins de frottements sur peau fragile",
      },
    },
    pt: {
      name: "Espuma de limpeza sem enxágue (200 ml)",
      description:
        "Uma espuma de limpeza suave, com pH equilibrado e sem enxágue para os cuidados diários íntimos e corporais em rotinas de incontinência. Sem fragrância e sem álcool, limpa e hidrata em uma única etapa, reduzindo o atrito na pele frágil e madura.",
      features: [
        "Fórmula sem enxágue — economiza tempo de cuidadores e reduz o atrito",
        "pH equilibrado, sem fragrância, sem álcool",
        "Limpa e hidrata em uma única etapa",
        "Adequado para pele sensível e madura",
        "Etiqueta OEM, etiqueta de idioma e caixa privada disponíveis",
      ],
      specs: {
        Format: "Espuma de limpeza sem enxágue",
        Size: "Frasco bomba de 200 ml",
        "Skin Type": "Pele sensível, frágil e madura",
        "Use Scenario": "Limpeza íntima e corporal durante trocas por incontinência",
        "Certification Path": "Posicionamento cosmético / de higiene",
        Material: "Tensoativos suaves + umectantes (glicerina / pantenol); sem fragrância, sem álcool, pH equilibrado",
        "Target Buyers":
          "Compras de residências, cadeias de vida assistida, distribuidores de cuidado de incontinência, canais de cuidados domiciliares",
        "Market Position":
          "Limpeza suave específica para adultos — limpa e hidrata em uma etapa, menos atrito na pele frágil",
      },
    },
    pl: {
      name: "Piana do mycia bez spłukiwania (200 ml)",
      description:
        "Łagodna, o zrównoważonym pH piana do mycia bez spłukiwania do codziennej pielęgnacji okolic intymnych i ciała w rutynie inkontynencji. Bez zapachu i alkoholu, czyści i nawilża w jednym kroku, zmniejszając tarcie na delikatnej, dojrzałej skórze.",
      features: [
        "Formuła bez spłukiwania — oszczędza czas opiekuna i zmniejsza tarcie",
        "Zrównoważone pH, bez zapachu, bez alkoholu",
        "Czyści i nawilża w jednym kroku",
        "Odpowiednia dla delikatnej, dojrzałej skóry",
        "Etykieta OEM, etykieta językowa i prywatne opakowanie dostępne",
      ],
      specs: {
        Format: "Piana do mycia bez spłukiwania",
        Size: "Butelka pompka 200 ml",
        "Skin Type": "Skóra wrażliwa, delikatna i dojrzała",
        "Use Scenario": "Mycie okolic intymnych i ciała podczas zmian przy inkontynencji",
        "Certification Path": "Pozycjonowanie kosmetyczne / higieniczne",
        Material: "Łagodne tensydy + humektanty (gliceryna / pantenol); bez zapachu, bez alkoholu, zrównoważone pH",
        "Target Buyers":
          "Zakupy domów opieki, łańcuchy mieszkań z opieką, dystrybutorzy pielęgnacji inkontynencji, kanały opieki domowej",
        "Market Position":
          "Łagodny środek myjący dedykowany dorosłym — czyści i nawilża w jednym kroku, mniejsze tarcie na delikatnej skórze",
      },
    },
  },
  "no-rinse-cleansing-foam-500-cln-500": {
    de: {
      name: "Rückstandsfreier Reinigungsschaum (500 ml, Großgebinde)",
      description:
        "Das Großgebinde des rückstandsfreien Reinigungsschaums, dimensioniert für den täglichen Verbrauch in Pflegeheimen. Dieselbe sanfte, pH-neutrale, duftfreie Formel zu niedrigeren Stückkosten.",
      features: [
        "Großgebinde für den täglichen Verbrauch",
        "Niedrigere Stückkosten pro Anwendung",
        "Dieselbe sanfte Formel wie DS-CLN-200",
        "Nachfüll- und Großgebinde-Optionen erhältlich",
        "Private-Label- und Sprachetikett-Unterstützung",
      ],
      specs: {
        Format: "Rückstandsfreier Reinigungsschaum",
        Size: "Pumpenflasche 500 ml (oder 1-L-Nachfüllung)",
        "Use Scenario": "Tägliche Inkontinenzreinigung in Einrichtungen",
        "Certification Path": "Kosmetische / Hygiene-Positionierung",
        Material: "Milde Tenside + Feuchthalter; duftfrei, alkoholfrei, pH-neutral",
        "Target Buyers": "Pflegeheime, Einrichtungen für betreutes Wohnen, Inkontinenz-Pflege-Distributoren",
        "Market Position": "Großgebinde für den täglichen Einrichtungsverbrauch — niedrigere Stückkosten pro Anwendung",
      },
    },
    es: {
      name: "Espuma de limpieza sin aclarado (500 ml, institucional)",
      description:
        "El formato institucional de la espuma de limpieza sin aclarado, pensado para el consumo diario en residencias. La misma fórmula suave, con pH equilibrado y sin fragancia a menor coste unitario.",
      features: [
        "Formato institucional para consumo diario",
        "Menor coste unitario por uso",
        "La misma fórmula suave que DS-CLN-200",
        "Opciones de recarga y granel disponibles",
        "Soporte de marca privada y etiqueta de idioma",
      ],
      specs: {
        Format: "Espuma limpiadora sin aclarado",
        Size: "Botella bomba de 500 ml (o recarga 1 L)",
        "Use Scenario": "Limpieza diaria de incontinencia en instituciones",
        "Certification Path": "Posicionamiento cosmético / de higiene",
        Material: "Tensoactivos suaves + humectantes; sin fragancia, sin alcohol, pH equilibrado",
        "Target Buyers": "Residencias, instalaciones de vida asistida, distribuidores de cuidado de incontinencia",
        "Market Position": "Tamaño institucional para consumo diario — menor coste unitario por uso",
      },
    },
    fr: {
      name: "Mousse nettoyante sans rinçage (500 ml, format institutionnel)",
      description:
        "Le format institutionnel de la mousse nettoyante sans rinçage, adapté à la consommation quotidienne des établissements. La même formule douce, à pH équilibré et sans parfum, à moindre coût unitaire.",
      features: [
        "Format institutionnel pour un usage quotidien",
        "Coût unitaire plus faible par utilisation",
        "La même formule douce que DS-CLN-200",
        "Options de recharge et de vrac disponibles",
        "Support marque privée et étiquette multilingue",
      ],
      specs: {
        Format: "Mousse nettoyante sans rinçage",
        Size: "Flacon pompe 500 ml (ou recharge 1 L)",
        "Use Scenario": "Nettoyage quotidien de l'incontinence en établissement",
        "Certification Path": "Positionnement cosmétique / hygiène",
        Material: "Tensioactifs doux + humectants; sans parfum, sans alcool, pH équilibré",
        "Target Buyers": "Maisons de retraite, logements accompagnés, distributeurs de soins d'incontinence",
        "Market Position": "Format institutionnel pour consommation quotidienne — coût unitaire plus faible",
      },
    },
    pt: {
      name: "Espuma de limpeza sem enxágue (500 ml, institucional)",
      description:
        "O formato institucional da espuma de limpeza sem enxágue, dimensionado para o consumo diário em instituições. A mesma fórmula suave, com pH equilibrado e sem fragrância, a menor custo unitário.",
      features: [
        "Tamanho institucional para consumo diário",
        "Menor custo unitário por uso",
        "A mesma fórmula suave que DS-CLN-200",
        "Opções de recarga e a granel disponíveis",
        "Suporte de marca privada e etiqueta de idioma",
      ],
      specs: {
        Format: "Espuma de limpeza sem enxágue",
        Size: "Frasco bomba de 500 ml (ou recarga 1 L)",
        "Use Scenario": "Limpeza diária de incontinência em instituições",
        "Certification Path": "Posicionamento cosmético / de higiene",
        Material: "Tensoativos suaves + umectantes; sem fragrância, sem álcool, pH equilibrado",
        "Target Buyers": "Residências, instalações de vida assistida, distribuidores de cuidado de incontinência",
        "Market Position": "Tamanho institucional para consumo diário — menor custo unitário por uso",
      },
    },
    pl: {
      name: "Piana do mycia bez spłukiwania (500 ml, instytucjonalna)",
      description:
        "Instytucjonalne opakowanie piany do mycia bez spłukiwania, dostosowane do codziennego zużycia w domach opieki. Ta sama łagodna, o zrównoważonym pH, bezzapachowa formuła przy niższym koszcie jednostkowym.",
      features: [
        "Opakowanie instytucjonalne do codziennego użytku",
        "Niższy koszt jednostkowy na użycie",
        "Ta sama łagodna formuła co DS-CLN-200",
        "Opcje napełniania i hurtu dostępne",
        "Obsługa marki prywatnej i etykiety językowej",
      ],
      specs: {
        Format: "Piana do mycia bez spłukiwania",
        Size: "Butelka pompka 500 ml (lub napełnianie 1 L)",
        "Use Scenario": "Codzienne mycie przy inkontynencji w placówkach",
        "Certification Path": "Pozycjonowanie kosmetyczne / higieniczne",
        Material: "Łagodne tensydy + humektanty; bez zapachu, bez alkoholu, zrównoważone pH",
        "Target Buyers": "Domy opieki, placówki z opieką, dystrybutorzy pielęgnacji inkontynencji",
        "Market Position": "Opakowanie instytucjonalne do codziennego zużycia — niższy koszt jednostkowy",
      },
    },
  },
  "adult-barrier-cream-crm-100": {
    de: {
      name: "Erwachsenen-Barriereschutzcreme (100 g)",
      description:
        "Eine Zinkoxid-/Dimethicon-Barriereschutzcreme für erwachsene Inkontinenz — schützt die Haut vor Urin, Stuhl, Feuchtigkeit und Reibung. Leicht entfernbar und duftfrei: ein erwachsenenspezifisches Produkt, keine umetikettierte Baby-Windelcreme.",
      features: [
        "Erwachsenenspezifische Formulierung — keine umetikettierte Babycreme",
        "Leicht entfernbar — weniger Reibung und Beschwerden",
        "Duftfrei und hypoallergen",
        "Schützen + pflegen in einem Schritt",
        "Tägliche Vorbeugung für leichte bis mittelschwere Haut",
      ],
      specs: {
        Format: "Barriereschutzcreme",
        Size: "Tube 100 g",
        "Active Direction": "Zinkoxid 10–20 % (oder Dimethicon 5 %)",
        "Use Scenario": "Täglicher Hautschutz bei Inkontinenz",
        "Certification Path": "Kosmetisch (täglich) / Hygiene-Positionierung",
        Material: "Zinkoxid 10–20 % (oder Dimethicon 5 %) + Vaseline / Panthenol",
        "Target Buyers":
          "Beschaffung von Pflegeheimen, Lieferketten für betreutes Wohnen, Inkontinenz-Pflege-Distributoren, Apothekeneinkäufer",
        "Market Position": "Erwachsenenspezifische Barriereschutzcreme — leicht entfernbar, duftfrei, hypoallergen",
      },
    },
    es: {
      name: "Crema barrera para adultos (100 g)",
      description:
        "Una crema barrera de óxido de zinc / dimeticona formulada para la incontinencia de adultos — protege la piel de orina, heces, humedad y fricción. Fácil de retirar y sin fragancia: un producto específico para adultos, no una crema de pañales reetiquetada.",
      features: [
        "Formulación específica para adultos — no es una crema de bebé reetiquetada",
        "Fácil de retirar — menos fricción y molestias",
        "Sin fragancia e hipoalergénica",
        "Protege e hidrata en un solo paso",
        "Prevención diaria para piel de leve a moderada",
      ],
      specs: {
        Format: "Crema barrera",
        Size: "Tubo 100 g",
        "Active Direction": "Óxido de zinc 10–20 % (o dimeticona 5 %)",
        "Use Scenario": "Protección diaria de la piel por incontinencia",
        "Certification Path": "Posicionamiento cosmético (diario) / de higiene",
        Material: "Óxido de zinc 10–20 % (o dimeticona 5 %) + vaselina / pantenol",
        "Target Buyers":
          "Compras de residencias, cadenas de vida asistida, distribuidores de cuidado de incontinencia, compradores de farmacia",
        "Market Position": "Crema barrera específica para adultos — fácil de retirar, sin fragancia, hipoalergénica",
      },
    },
    fr: {
      name: "Crème barrière pour adultes (100 g)",
      description:
        "Une crème barrière au oxyde de zinc / diméthicone formulée pour l'incontinence adulte — protège la peau de l'urine, des selles, de l'humidité et des frottements. Facile à retirer et sans parfum : un produit spécifique aux adultes, pas une crème pour bébé rebadgée.",
      features: [
        "Formulation spécifique aux adultes — pas une crème bébé rebadgée",
        "Facile à retirer — moins de frottements et d'inconfort",
        "Sans parfum et hypoallergénique",
        "Protège et hydrate en une seule étape",
        "Prévention quotidienne pour peaux légères à modérées",
      ],
      specs: {
        Format: "Crème barrière",
        Size: "Tube 100 g",
        "Active Direction": "Oxyde de zinc 10–20 % (ou diméthicone 5 %)",
        "Use Scenario": "Protection quotidienne de la peau en cas d'incontinence",
        "Certification Path": "Positionnement cosmétique (quotidien) / hygiène",
        Material: "Oxyde de zinc 10–20 % (ou diméthicone 5 %) + vaseline / panthénol",
        "Target Buyers":
          "Achats de maisons de retraite, chaînes de logement accompagné, distributeurs de soins d'incontinence, acheteurs en pharmacie",
        "Market Position": "Crème barrière spécifique aux adultes — facile à retirer, sans parfum, hypoallergénique",
      },
    },
    pt: {
      name: "Creme barreira para adultos (100 g)",
      description:
        "Um creme barreira de óxido de zinco / dimeticona formulado para incontinência adulta — protege a pele de urina, fezes, umidade e atrito. Fácil de remover e sem fragrância: um produto específico para adultos, não um creme de fralda remarcado.",
      features: [
        "Formulação específica para adultos — não é um creme de bebê remarcado",
        "Fácil de remover — menos atrito e desconforto",
        "Sem fragrância e hipoalergênica",
        "Protege e hidrata em uma única etapa",
        "Prevenção diária para pele leve a moderada",
      ],
      specs: {
        Format: "Creme barreira",
        Size: "Tubo 100 g",
        "Active Direction": "Óxido de zinco 10–20 % (ou dimeticona 5 %)",
        "Use Scenario": "Proteção diária da pele por incontinência",
        "Certification Path": "Posicionamento cosmético (diário) / de higiene",
        Material: "Óxido de zinco 10–20 % (ou dimeticona 5 %) + vaselina / pantenol",
        "Target Buyers":
          "Compras de residências, cadeias de vida assistida, distribuidores de cuidado de incontinência, compradores de farmácia",
        "Market Position": "Creme barreira específico para adultos — fácil de remover, sem fragrância, hipoalergênico",
      },
    },
    pl: {
      name: "Krem barierowy dla dorosłych (100 g)",
      description:
        "Krem barierowy na bazie tlenku cynku / dimetykonu sformułowany dla dorosłych z inkontynencją — chroni skórę przed moczem, kałem, wilgocią i tarciem. Łatwy do usunięcia i bezzapachowy: produkt dedykowany dorosłym, nie przetworzona kremowa pieluszka dla niemowląt.",
      features: [
        "Formuła dedykowana dorosłym — nie przerobiony krem dla niemowląt",
        "Łatwa do usunięcia — mniejsze tarcie i dyskomfort",
        "Bezzapachowa i hipoalergiczna",
        "Ochrona + nawilżanie w jednym kroku",
        "Codzienna profilaktyka dla skóry lekkiej do umiarkowanej",
      ],
      specs: {
        Format: "Krem barierowy",
        Size: "Tuba 100 g",
        "Active Direction": "Tlenek cynku 10–20 % (lub dimetykon 5 %)",
        "Use Scenario": "Codzienna ochrona skóry przy inkontynencji",
        "Certification Path": "Pozycjonowanie kosmetyczne (codzienne) / higieniczne",
        Material: "Tlenek cynku 10–20 % (lub dimetykon 5 %) + wazelina / pantenol",
        "Target Buyers":
          "Zakupy domów opieki, łańcuchy mieszkań z opieką, dystrybutorzy pielęgnacji inkontynencji, nabywcy apteczni",
        "Market Position": "Krem barierowy dedykowany dorosłym — łatwy do usunięcia, bezzapachowy, hipoalergiczny",
      },
    },
  },
  "adult-barrier-cream-intensive-repair-crm-101": {
    de: {
      name: "Erwachsenen-Barriereschutzcreme — Intensive Reparatur (100 g)",
      description:
        "Eine Barriereschutzcreme mit höherem Zinkoxidanteil für angegriffene oder wunde Haut, angereichert mit Panthenol (B5), Ringelblume und Hafer. Positioniert als kosmetisches Intensivpflegeprodukt — die konforme Alternative zu einer pharmakologischen Antimykotika-Aussage.",
      features: [
        "Höherer Zinkanteil für angegriffene / gerötete Haut",
        "Panthenol (B5), Ringelblume und Hafer beruhigen",
        "Kosmetische Positionierung — vermeidet pharmakologische Antimykotika-Einstufung",
        "Duftfrei und hypoallergen",
        "Ergänzt DS-CRM-100 als Intensivebene",
      ],
      specs: {
        Format: "Intensive Reparatur-Barriereschutzcreme",
        Size: "Tube 100 g",
        "Active Direction": "Hochkonzentriertes Zinkoxid + Panthenol / Ringelblume / Hafer",
        "Use Scenario": "Intensive Reparatur bei angegriffener / wunder Haut",
        "Certification Path": "Kosmetische / Hygiene-Positionierung",
        Material: "Hochkonzentriertes Zinkoxid + Panthenol (B5) / Ringelblume / Haferextrakt",
        "Target Buyers": "Pflegeheime, betreutes Wohnen, häusliche Pflege für Hochrisiko-Bewohner",
        "Market Position": "Intensive Reparatur für angegriffene Haut — kosmetische Positionierung, keine Pharmako-Aussage",
      },
    },
    es: {
      name: "Crema barrera para adultos — Reparación intensiva (100 g)",
      description:
        "Una crema barrera de reparación intensiva con mayor concentración de zinc para piel comprometida o erosionada, enriquecida con pantenol (B5), caléndula y avena. Posicionada como producto cosmético de cuidado intensivo — la alternativa conforme a una reclamación antimicótica de farmacia.",
      features: [
        "Mayor carga de zinc para piel comprometida / enrojecida",
        "Pantenol (B5), caléndula y avena para calmar",
        "Posicionamiento cosmético — evita la clasificación antimicótica de farmacia",
        "Sin fragancia e hipoalergénica",
        "Complementa DS-CRM-100 como nivel intensivo",
      ],
      specs: {
        Format: "Crema barrera de reparación intensiva",
        Size: "Tubo 100 g",
        "Active Direction": "Zinc de alta concentración + pantenol / caléndula / avena",
        "Use Scenario": "Reparación intensiva de piel comprometida / erosionada",
        "Certification Path": "Posicionamiento cosmético / de higiene",
        Material: "Zinc de alta concentración + pantenol (B5) / caléndula / extracto de avena",
        "Target Buyers": "Residencias, vida asistida, canales de cuidado en el hogar para residentes de alto riesgo",
        "Market Position": "Reparación intensiva para piel comprometida — posicionamiento cosmético, sin reclamación de farmacia",
      },
    },
    fr: {
      name: "Crème barrière pour adultes — Réparation intensive (100 g)",
      description:
        "Une crème barrière de réparation intensive à teneur plus élevée en zinc pour la peau altérée ou écorchée, enrichie en panthénol (B5), calendula et avoine. Positionnée comme produit cosmétique de soin intensif — l'alternative conforme à une allégation antifongique pharmaceutique.",
      features: [
        "Teneur plus élevée en zinc pour peaux altérées / rougies",
        "Panthénol (B5), calendula et avoine apaisants",
        "Positionnement cosmétique — évite le classement antifongique pharmaceutique",
        "Sans parfum et hypoallergénique",
        "Complète DS-CRM-100 comme niveau intensif",
      ],
      specs: {
        Format: "Crème barrière de réparation intensive",
        Size: "Tube 100 g",
        "Active Direction": "Zinc haute concentration + panthénol / calendula / avoine",
        "Use Scenario": "Réparation intensive de la peau altérée / écorchée",
        "Certification Path": "Positionnement cosmétique / hygiène",
        Material: "Zinc haute concentration + panthénol (B5) / calendula / extrait d'avoine",
        "Target Buyers": "Maisons de retraite, logements accompagnés, soins à domicile pour résidents à haut risque",
        "Market Position": "Réparation intensive pour peau altérée — positionnement cosmétique, sans allégation pharmaceutique",
      },
    },
    pt: {
      name: "Creme barreira para adultos — Reparação intensiva (100 g)",
      description:
        "Um creme barreira de reparação intensiva com maior concentração de zinco para pele comprometida ou lesionada, enriquecido com pantenol (B5), calêndula e aveia. Posicionado como produto cosmético de cuidado intensivo — a alternativa conforme a uma alegação antimicótica de farmácia.",
      features: [
        "Maior carga de zinco para pele comprometida / avermelhada",
        "Pantenol (B5), calêndula e aveia para acalmar",
        "Posicionamento cosmético — evita a classificação antimicótica de farmácia",
        "Sem fragrância e hipoalergênica",
        "Complementa DS-CRM-100 como nível intensivo",
      ],
      specs: {
        Format: "Creme barreira de reparação intensiva",
        Size: "Tubo 100 g",
        "Active Direction": "Zinco de alta concentração + pantenol / calêndula / aveia",
        "Use Scenario": "Reparação intensiva de pele comprometida / lesionada",
        "Certification Path": "Posicionamento cosmético / de higiene",
        Material: "Zinco de alta concentração + pantenol (B5) / calêndula / extrato de aveia",
        "Target Buyers": "Residências, vida assistida, cuidados domiciliares para residentes de alto risco",
        "Market Position": "Reparação intensiva para pele comprometida — posicionamento cosmético, sem alegação de farmácia",
      },
    },
    pl: {
      name: "Krem barierowy dla dorosłych — intensywna regeneracja (100 g)",
      description:
        "Krem barierowy o intensywnej regeneracji z wyższą zawartością tlenku cynku dla uszkodzonej lub popękanej skóry, wzbogacony o pantenol (B5), nagietek i owies. Pozycjonowany jako kosmetyk do intensywnej pielęgnacji — zgodna z przepisami alternatywa dla aptecznych claims przeciwgrzybiczych.",
      features: [
        "Wyższa zawartość cynku dla uszkodzonej / zaczerwienionej skóry",
        "Pantenol (B5), nagietek i owies łagodzące",
        "Pozycjonowanie kosmetyczne — unika aptecznej klasyfikacji przeciwgrzybiczej",
        "Bezzapachowa i hipoalergiczna",
        "Uzupełnia DS-CRM-100 jako poziom intensywny",
      ],
      specs: {
        Format: "Krem barierowy o intensywnej regeneracji",
        Size: "Tuba 100 g",
        "Active Direction": "Wysokie stężenie tlenku cynku + pantenol / nagietek / owies",
        "Use Scenario": "Intensywna regeneracja uszkodzonej / popękanej skóry",
        "Certification Path": "Pozycjonowanie kosmetyczne / higieniczne",
        Material: "Wysokie stężenie tlenku cynku + pantenol (B5) / nagietek / ekstrakt z owsa",
        "Target Buyers": "Domy opieki, mieszkania z opieką, opieka domowa dla mieszkańców wysokiego ryzyka",
        "Market Position": "Intensywna regeneracja dla uszkodzonej skóry — pozycjonowanie kosmetyczne, bez claims aptecznych",
      },
    },
  },
  "no-sting-skin-protectant-spray-30-spr-030": {
    de: {
      name: "Hautschutz-Spray ohne Brennen (30 ml, Reisegröße)",
      description:
        "Ein alkoholfreies Hautschutz-Spray mit Filmbildung, das ohne Brennen in ca. 30 Sekunden zu einer atmungsaktiven, transparenten Barriere trocknet, die bis zu 72 Stunden hält. CHG-kompatibel. Die 30-ml-Reise-/Probengröße senkt die Hemmschwelle zum Testen für Einrichtungen und häusliche Pflege.",
      features: [
        "CHG-kompatibel — schützt unter antiseptischer Reinigung",
        "Alkoholfrei, brennt nicht auf beschädigter Haut",
        "Trocknet in ~30 Sekunden; Schutz bis zu 72 h",
        "Reise-/Probengröße senkt die Hemmschwelle zum Testen",
        "Ergänzt DS-SPR-100 als portable Ebene",
      ],
      specs: {
        Format: "Filmbildendes Hautschutz-Spray",
        Size: "Sprayflasche 30 ml",
        "Key Feature": "Ohne Brennen, alkoholfrei, CHG-kompatibel, bis zu 72 h",
        "Use Scenario": "IAD-Vorbeugung, portabel und zum Testen",
        "Certification Path": "Medizinprodukt (EU Klasse I) wo klassifiziert",
        Material: "Acrylat-Terpolymer-Filmbildner / Silikon; alkoholfrei",
        "Target Buyers": "Pflegeheime, betreutes Wohnen, häusliche Pflege, Test- und Mustereinkäufer",
        "Market Position": "Tragbare Probengröße des professionellen filmbildenden Hautschutzes",
      },
    },
    es: {
      name: "Spray protector de piel sin ardor (30 ml, viaje)",
      description:
        "Un spray protector de piel formador de película, sin alcohol y sin ardor, que seca en unos 30 segundos formando una barrera transparente y transpirable que dura hasta 72 horas. Compatible con CHG. El formato de 30 ml para viaje o prueba reduce la barrera para ensayarlo en residencias y cuidados en el hogar.",
      features: [
        "Compatible con CHG — protege durante la limpieza antiséptica",
        "Sin alcohol, no produce ardor en piel dañada",
        "Seca en ~30 segundos; protección hasta 72 h",
        "Formato de viaje o prueba para reducir la barrera de ensayo",
        "Complementa DS-SPR-100 como nivel portátil",
      ],
      specs: {
        Format: "Spray protector de piel formador de película",
        Size: "Spray de 30 ml",
        "Key Feature": "Sin ardor, sin alcohol, compatible con CHG, hasta 72 h",
        "Use Scenario": "Prevención de DAI, portable y para pruebas",
        "Certification Path": "Dispositivo médico (clase I UE) donde se clasifique",
        Material: "Terpolímero acrílico formador de película / silicona; sin alcohol",
        "Target Buyers": "Residencias, vida asistida, cuidado en el hogar, compradores de muestras",
        "Market Position": "Tamaño de viaje portable del spray profesional formador de película",
      },
    },
    fr: {
      name: "Spray protecteur cutané sans brûlure (30 ml, voyage)",
      description:
        "Un spray protecteur cutané filmogène, sans alcool et sans brûlure, qui sèche en environ 30 secondes en une barrière transparente et respirante tenant jusqu'à 72 heures. Compatible CHG. Le format de 30 ml pour voyage ou essai réduit la barrière à l'essai pour les établissements et les soins à domicile.",
      features: [
        "Compatible CHG — protège lors du nettoyage antiseptique",
        "Sans alcool, n'irrite pas la peau abîmée",
        "Sèche en ~30 secondes ; protection jusqu'à 72 h",
        "Format voyage ou essai pour réduire la barrière à l'essai",
        "Complète DS-SPR-100 comme niveau portable",
      ],
      specs: {
        Format: "Spray protecteur cutané filmogène",
        Size: "Flacon spray 30 ml",
        "Key Feature": "Sans brûlure, sans alcool, compatible CHG, jusqu'à 72 h",
        "Use Scenario": "Prévention DAI, portable et pour essai",
        "Certification Path": "Dispositif médical (classe I UE) où classé",
        Material: "Terpolymère acrylique filmogène / silicone ; sans alcool",
        "Target Buyers": "Maisons de retraite, logements accompagnés, soins à domicile, acheteurs d'échantillons",
        "Market Position": "Format voyage portable du spray professionnel filmogène",
      },
    },
    pt: {
      name: "Spray protetor de pele sem ardência (30 ml, viagem)",
      description:
        "Um spray protetor de pele formador de filme, sem álcool e sem ardência, que seca em cerca de 30 segundos formando uma barreira transparente e respirável que dura até 72 horas. Compatível com CHG. O tamanho de 30 ml para viagem ou amostra reduz a barreira para testá-lo em instituições e cuidados domiciliares.",
      features: [
        "Compatível com CHG — protege durante a limpeza antisséptica",
        "Sem álcool, não arde na pele danificada",
        "Seca em ~30 segundos; proteção por até 72 h",
        "Tamanho de viagem ou amostra para reduzir a barreira de teste",
        "Complementa DS-SPR-100 como nível portátil",
      ],
      specs: {
        Format: "Spray protetor de pele formador de filme",
        Size: "Frasco spray 30 ml",
        "Key Feature": "Sem ardência, sem álcool, compatível com CHG, até 72 h",
        "Use Scenario": "Prevenção de DAUI, portátil e para testes",
        "Certification Path": "Dispositivo médico (classe I UE) onde classificado",
        Material: "Terpolímero acrílico formador de filme / silicone; sem álcool",
        "Target Buyers": "Residências, vida assistida, cuidados domiciliares, compradores de amostras",
        "Market Position": "Tamanho de viagem portátil do spray profissional formador de filme",
      },
    },
    pl: {
      name: "Spray ochronny bez pieczenia (30 ml, podróżny)",
      description:
        "Spray ochronny tworzący film, bez alkoholu i bez pieczenia, wysychający w ok. 30 sekund w przezroczystą, oddychającą barierę utrzymującą się do 72 godzin. Kompatybilny z CHG. Rozmiar 30 ml podróżny / próbny obniża próg wypróbowania dla placówek i opieki domowej.",
      features: [
        "Kompatybilny z CHG — chroni podczas antyseptycznego mycia",
        "Bez alkoholu, nie piecze uszkodzonej skóry",
        "Wysycha w ~30 sekund; ochrona do 72 h",
        "Rozmiar podróżny / próbny obniża próg wypróbowania",
        "Uzupełnia DS-SPR-100 jako poziom przenośny",
      ],
      specs: {
        Format: "Spray ochronny tworzący film",
        Size: "Butelka spray 30 ml",
        "Key Feature": "Bez pieczenia, bez alkoholu, kompatybilny z CHG, do 72 h",
        "Use Scenario": "Zapobieganie IAD, przenośny i próbny",
        "Certification Path": "Wyrób medyczny (klasa I UE) tam, gdzie klasyfikowany",
        Material: "Terpolimer akrylowy tworzący film / silikon; bez alkoholu",
        "Target Buyers": "Domy opieki, mieszkania z opieką, opieka domowa, nabywcy próbek",
        "Market Position": "Przenośny rozmiar podróżny profesjonalnego sprayu tworzącego film",
      },
    },
  },
  "no-sting-skin-protectant-spray-100-spr-100": {
    de: {
      name: "Hautschutz-Spray ohne Brennen (100 ml)",
      description:
        "Das Hautschutz-Spray mit Filmbildung in voller Größe für den täglichen Einsatz in Einrichtungen — ohne Brennen, alkoholfrei, CHG-kompatibel, bildet eine atmungsaktive transparente Barriere, die bis zu 72 Stunden hält. Schützt intakte oder angegriffene Haut vor Feuchtigkeit, Stuhl und Reibung.",
      features: [
        "CHG-kompatibel für antiseptische Intimreinigung",
        "Alkoholfrei, kein Brennen auf beschädigter Haut",
        "Bis zu 72 h Barriere gegen Feuchtigkeit und Körperflüssigkeiten",
        "Volle Größe für täglichen Einsatz in Einrichtungen",
        "Tuch-/Applikator-Optionen erhältlich",
      ],
      specs: {
        Format: "Filmbildendes Hautschutz-Spray",
        Size: "Sprayflasche 100 ml",
        "Key Feature": "Ohne Brennen, alkoholfrei, CHG-kompatibel, bis zu 72 h",
        "Use Scenario": "Tägliche IAD-Vorbeugung, Einsatz in Einrichtungen",
        "Certification Path": "Medizinprodukt (EU Klasse I) wo klassifiziert",
        Material: "Acrylat-Terpolymer-Filmbildner / Silikon; alkoholfrei",
        "Target Buyers": "Pflegeheime, Einrichtungen für betreutes Wohnen, Inkontinenz-Pflege-Distributoren",
        "Market Position": "Filmbildender Hautschutz in voller Größe für den täglichen Einsatz",
      },
    },
    es: {
      name: "Spray protector de piel sin ardor (100 ml)",
      description:
        "El spray protector de piel formador de película a tamaño completo para el uso diario en instituciones — sin ardor, sin alcohol, compatible con CHG, forma una barrera transparente y transpirable que dura hasta 72 horas. Protege la piel intacta o comprometida de la humedad, las heces y la fricción.",
      features: [
        "Compatible con CHG para limpieza antiséptica íntima",
        "Sin alcohol, sin ardor en piel dañada",
        "Barrera hasta 72 h contra humedad y fluidos corporales",
        "Tamaño completo para uso diario en instituciones",
        "Opciones de toallita / aplicador disponibles",
      ],
      specs: {
        Format: "Spray protector de piel formador de película",
        Size: "Spray de 100 ml",
        "Key Feature": "Sin ardor, sin alcohol, compatible con CHG, hasta 72 h",
        "Use Scenario": "Prevención diaria de DAI, uso en instituciones",
        "Certification Path": "Dispositivo médico (clase I UE) donde se clasifique",
        Material: "Terpolímero acrílico formador de película / silicona; sin alcohol",
        "Target Buyers": "Residencias, instalaciones de vida asistida, distribuidores de cuidado de incontinencia",
        "Market Position": "Spray profesional formador de película a tamaño completo para uso diario",
      },
    },
    fr: {
      name: "Spray protecteur cutané sans brûlure (100 ml)",
      description:
        "Le spray protecteur cutané filmogène en taille normale pour un usage quotidien en établissement — sans brûlure, sans alcool, compatible CHG, forme une barrière transparente et respirante tenant jusqu'à 72 heures. Protège la peau intacte ou altérée de l'humidité, des selles et des frottements.",
      features: [
        "Compatible CHG pour le nettoyage intime antiseptique",
        "Sans alcool, pas d'irritation sur peau abîmée",
        "Barrière jusqu'à 72 h contre l'humidité et les fluides corporels",
        "Taille normale pour un usage quotidien en établissement",
        "Options lingette / applicateur disponibles",
      ],
      specs: {
        Format: "Spray protecteur cutané filmogène",
        Size: "Flacon spray 100 ml",
        "Key Feature": "Sans brûlure, sans alcool, compatible CHG, jusqu'à 72 h",
        "Use Scenario": "Prévention quotidienne DAI, usage en établissement",
        "Certification Path": "Dispositif médical (classe I UE) où classé",
        Material: "Terpolymère acrylique filmogène / silicone ; sans alcool",
        "Target Buyers": "Maisons de retraite, logements accompagnés, distributeurs de soins d'incontinence",
        "Market Position": "Spray professionnel filmogène en taille normale pour usage quotidien",
      },
    },
    pt: {
      name: "Spray protetor de pele sem ardência (100 ml)",
      description:
        "O spray protetor de pele formador de filme em tamanho completo para uso diário em instituições — sem ardência, sem álcool, compatível com CHG, forma uma barreira transparente e respirável que dura até 72 horas. Protege a pele intacta ou comprometida da umidade, fezes e atrito.",
      features: [
        "Compatível com CHG para limpeza antisséptica íntima",
        "Sem álcool, sem ardência na pele danificada",
        "Barreira por até 72 h contra umidade e fluidos corporais",
        "Tamanho completo para uso diário em instituições",
        "Opções de lenço / aplicador disponíveis",
      ],
      specs: {
        Format: "Spray protetor de pele formador de filme",
        Size: "Frasco spray 100 ml",
        "Key Feature": "Sem ardência, sem álcool, compatível com CHG, até 72 h",
        "Use Scenario": "Prevenção diária de DAUI, uso em instituições",
        "Certification Path": "Dispositivo médico (classe I UE) onde classificado",
        Material: "Terpolímero acrílico formador de filme / silicone; sem álcool",
        "Target Buyers": "Residências, instalações de vida assistida, distribuidores de cuidado de incontinência",
        "Market Position": "Spray profissional formador de filme em tamanho completo para uso diário",
      },
    },
    pl: {
      name: "Spray ochronny bez pieczenia (100 ml)",
      description:
        "Spray ochronny tworzący film w pełnym rozmiarze do codziennego użytku w placówkach — bez pieczenia, bez alkoholu, kompatybilny z CHG, tworzy przezroczystą, oddychającą barierę utrzymującą się do 72 godzin. Chroni nienaruszoną lub uszkodzoną skórę przed wilgocią, kałem i tarciem.",
      features: [
        "Kompatybilny z CHG do antyseptycznego mycia intymnego",
        "Bez alkoholu, bez pieczenia uszkodzonej skóry",
        "Bariera do 72 h przeciw wilgoci i płynom ustrojowym",
        "Pełny rozmiar do codziennego użytku w placówkach",
        "Opcje chusteczek / aplikatorów dostępne",
      ],
      specs: {
        Format: "Spray ochronny tworzący film",
        Size: "Butelka spray 100 ml",
        "Key Feature": "Bez pieczenia, bez alkoholu, kompatybilny z CHG, do 72 h",
        "Use Scenario": "Codzienna profilaktyka IAD, użytek w placówkach",
        "Certification Path": "Wyrób medyczny (klasa I UE) tam, gdzie klasyfikowany",
        Material: "Terpolimer akrylowy tworzący film / silikon; bez alkoholu",
        "Target Buyers": "Domy opieki, placówki z opieką, dystrybutorzy pielęgnacji inkontynencji",
        "Market Position": "Spray ochronny tworzący film w pełnym rozmiarze do codziennego użytku",
      },
    },
  },
  "incontinence-skin-care-kit-kit-001": {
    de: {
      name: "Inkontinenz-Hautpflege-Set (Reinigen · Schützen · Pflegen)",
      description:
        "Ein komplettes Reinigen–Schützen–Pflegen-Set: rückstandsfreier Reinigungsschaum, erwachsenen-Barriereschutzcreme und Hautschutz-Spray ohne Brennen. Ein Kit deckt die gesamte Inkontinenz-Hautpflegeroutine ab — ideal für Einrichtungs-Tests, Distributor-Muster und häusliche Pflegekäufer, die eine Komplettlösung wollen.",
      features: [
        "Deckt die gesamte Reinigen–Schützen–Pflegen-Routine ab",
        "Ideal für Einrichtungs-Tests und Distributor-Muster",
        "Höherer Warenkorbwert als Einzelartikel",
        "Keine zusätzlichen Lieferkettenkosten — dieselben Produkte in einer Kombipackung",
        "Gebrauchsanleitung und Sprachetiketten enthalten",
      ],
      specs: {
        Format: "Inkontinenz-Hautpflege-Set",
        Configuration: "Testpackung / institutionelle Packung",
        Contents: "Reinigungsschaum + Barriereschutzcreme + Hautschutz-Spray",
        "Use Scenario": "Einrichtungs-Test, Distributor-Muster, komplette Lösung für häusliche Pflege",
        "Certification Path": "Folgt den einzelnen SKUs",
        Material: "Kombination aus DS-CLN + DS-CRM + DS-SPR Produkten",
        "Target Buyers": "Pflegeheime, betreutes Wohnen, Inkontinenz-Pflege-Distributoren, häusliche Pflegekäufer",
        "Market Position": "Ein Kit = volle Routine; höherer Warenkorbwert, weniger Auswahlreibung",
      },
    },
    es: {
      name: "Kit de cuidado de la piel por incontinencia (Limpiar · Proteger · Hidratar)",
      description:
        "Un set completo de limpiar–proteger–hidratar: espuma de limpieza sin aclarado, crema barrera para adultos y spray protector de piel sin ardor. Un kit cubre toda la rutina de cuidado de la piel por incontinencia — ideal para pruebas en residencias, muestras de distribuidores y compradores de cuidado en el hogar que quieren una solución completa.",
      features: [
        "Cubre toda la rutina de limpiar–proteger–hidratar",
        "Ideal para pruebas en residencias y muestras de distribuidores",
        "Mayor valor de cesta que los artículos individuales",
        "Sin coste extra de cadena de suministro — los mismos productos en un pack combinado",
        "Incluye tarjeta de instrucciones y etiquetas de idioma",
      ],
      specs: {
        Format: "Kit de cuidado de la piel por incontinencia",
        Configuration: "Pack de prueba / pack institucional",
        Contents: "Espuma de limpieza + crema barrera + spray protector de piel",
        "Use Scenario": "Prueba en residencias, muestras de distribuidores, solución completa para el hogar",
        "Certification Path": "Sigue a las SKU individuales",
        Material: "Combinación de productos DS-CLN + DS-CRM + DS-SPR",
        "Target Buyers": "Residencias, vida asistida, distribuidores de cuidado de incontinencia, compradores de cuidado en el hogar",
        "Market Position": "Un kit = rutina completa; mayor valor de cesta, menos fricción de selección",
      },
    },
    fr: {
      name: "Kit de soin de la peau pour incontinence (Nettoyer · Protéger · Hydrater)",
      description:
        "Un kit complet nettoyer–protéger–hydrater : mousse nettoyante sans rinçage, crème barrière pour adultes et spray protecteur cutané sans brûlure. Un kit couvre toute la routine de soin de la peau en cas d'incontinence — idéal pour les essais en établissement, les échantillons distributeurs et les acheteurs en soins à domicile souhaitant une solution complète.",
      features: [
        "Couvre toute la routine nettoyer–protéger–hydrater",
        "Idéal pour les essais en établissement et les échantillons distributeurs",
        "Valeur de panier plus élevée que les articles seuls",
        "Aucun coût logistique supplémentaire — les mêmes produits dans un pack combiné",
        "Fiche d'instructions et étiquettes multilingues incluses",
      ],
      specs: {
        Format: "Kit de soin de la peau pour incontinence",
        Configuration: "Pack d'essai / pack institutionnel",
        Contents: "Mousse nettoyante + crème barrière + spray protecteur cutané",
        "Use Scenario": "Essai en établissement, échantillons distributeurs, solution complète à domicile",
        "Certification Path": "Suit les SKU individuelles",
        Material: "Combinaison des produits DS-CLN + DS-CRM + DS-SPR",
        "Target Buyers": "Maisons de retraite, logements accompagnés, distributeurs de soins d'incontinence, acheteurs en soins à domicile",
        "Market Position": "Un kit = routine complète ; valeur de panier plus élevée, moins de friction de sélection",
      },
    },
    pt: {
      name: "Kit de cuidado da pele para incontinência (Limpar · Proteger · Hidratar)",
      description:
        "Um kit completo de limpar–proteger–hidratar: espuma de limpeza sem enxágue, creme barreira para adultos e spray protetor de pele sem ardência. Um kit cobre toda a rotina de cuidado da pele para incontinência — ideal para testes em instituições, amostras de distribuidores e compradores de cuidados domiciliares que querem uma solução completa.",
      features: [
        "Cobre toda a rotina de limpar–proteger–hidratar",
        "Ideal para testes em instituições e amostras de distribuidores",
        "Maior valor de cesta que itens individuais",
        "Sem custo extra de cadeia de suprimentos — os mesmos produtos em um pack combinado",
        "Cartão de instruções e etiquetas de idioma incluídos",
      ],
      specs: {
        Format: "Kit de cuidado da pele para incontinência",
        Configuration: "Pack de teste / pack institucional",
        Contents: "Espuma de limpeza + creme barreira + spray protetor de pele",
        "Use Scenario": "Teste em instituições, amostras de distribuidores, solução completa domiciliar",
        "Certification Path": "Segue as SKU individuais",
        Material: "Combinação dos produtos DS-CLN + DS-CRM + DS-SPR",
        "Target Buyers": "Residências, vida assistida, distribuidores de cuidado de incontinência, compradores de cuidados domiciliares",
        "Market Position": "Um kit = rotina completa; maior valor de cesta, menos atrito de seleção",
      },
    },
    pl: {
      name: "Zestaw pielęgnacji skóry przy inkontynencji (Czyścić · Chronić · Nawilżać)",
      description:
        "Kompletny zestaw czyścić–chronić–nawilżać: piana do mycia bez spłukiwania, krem barierowy dla dorosłych i spray ochronny bez pieczenia. Zestaw obejmuje całą rutynę pielęgnacji skóry przy inkontynencji — idealny do prób w placówkach, próbek dla dystrybutorów i zakupów opieki domowej dla osób szukających kompletnego rozwiązania.",
      features: [
        "Obejmuje całą rutynę czyścić–chronić–nawilżać",
        "Idealny do prób w placówkach i próbek dla dystrybutorów",
        "Wyższa wartość koszyka niż pojedyncze artykuły",
        "Bez dodatkowych kosztów łańcucha dostaw — te same produkty w zestawie",
        "Karta instrukcji i etykiety językowe dołączone",
      ],
      specs: {
        Format: "Zestaw pielęgnacji skóry przy inkontynencji",
        Configuration: "Zestaw próbny / zestaw instytucjonalny",
        Contents: "Piana do mycia + krem barierowy + spray ochronny",
        "Use Scenario": "Próby w placówkach, próbki dla dystrybutorów, kompletne rozwiązanie domowe",
        "Certification Path": "Zgodnie z pojedynczymi SKU",
        Material: "Połączenie produktów DS-CLN + DS-CRM + DS-SPR",
        "Target Buyers": "Domy opieki, mieszkania z opieką, dystrybutorzy pielęgnacji inkontynencji, nabywcy opieki domowej",
        "Market Position": "Jeden zestaw = pełna rutyna; wyższa wartość koszyka, mniejsze tarcie wyboru",
      },
    },
  },
}

export const categoryTranslations: Record<string, Partial<Record<Locale, { name: string; description: string }>>> = {
  cleansing: {
    de: {
      name: "Reinigung",
      description:
        "Rückstandsfreie Reinigungsschäume und Tücher für die sanfte tägliche Inkontinenzpflege — pH-neutral, duftfrei, kein Alkohol.",
    },
    es: {
      name: "Limpieza",
      description:
        "Espumas y toallitas de limpieza sin aclarado para el cuidado diario y suave de la incontinencia — pH equilibrado, sin fragancia, sin alcohol.",
    },
    fr: {
      name: "Nettoyage",
      description:
        "Mousses et lingettes nettoyantes sans rinçage pour les soins doux quotidiens de l'incontinence — pH équilibré, sans parfum, sans alcool.",
    },
    pt: {
      name: "Limpeza",
      description:
        "Espumas e lenços de limpeza sem enxágue para o cuidado diário e suave da incontinência — pH equilibrado, sem fragrância, sem álcool.",
    },
    pl: {
      name: "Mycie",
      description:
        "Pianki i chusteczki do mycia bez spłukiwania do delikatnej codziennej pielęgnacji przy inkontynencji — zrównoważone pH, bez zapachu, bez alkoholu.",
    },
  },
  "barrier-protection": {
    de: {
      name: "Barriereschutz",
      description:
        "Zinkoxid- und Dimethicon-Barriereschutzcremes plus ein hautschutz-spray ohne Brennen mit Filmbildung gegen Feuchtigkeit, Reibung und IAD-Vorbeugung.",
    },
    es: {
      name: "Protección de barrera",
      description:
        "Cremas barrera de óxido de zinc y dimeticona, más un spray protector de piel formador de película y sin ardor para prevenir humedad, fricción y la DAI.",
    },
    fr: {
      name: "Protection barrière",
      description:
        "Crèmes barrière à l'oxyde de zinc et à la diméthicone, plus un spray protecteur cutané filmogène et sans brûlure pour prévenir l'humidité, les frottements et la DAI.",
    },
    pt: {
      name: "Proteção de barreira",
      description:
        "Cremes barreira de óxido de zinco e dimeticona, mais um spray protetor de pele formador de filme e sem ardência para prevenir umidade, atrito e a DAUI.",
    },
    pl: {
      name: "Ochrona barierowa",
      description:
        "Kremy barierowe na bazie tlenku cynku i dimetykonu oraz spray ochronny tworzący film i bez pieczenia przeciw wilgoci, tarciu i zapobieganiu IAD.",
    },
  },
  "complete-care-kits": {
    de: {
      name: "Komplette Pflegesets",
      description:
        "Reinigen–Schützen–Pflegen-Sets für Pflegeheime, betreutes Wohnen und häusliche Pflege — Testsets und institutionelle Packungen.",
    },
    es: {
      name: "Kits de cuidado completo",
      description:
        "Packs de limpiar–proteger–hidratar para residencias, vida asistida y cuidado en el hogar — kits de prueba y packs institucionales.",
    },
    fr: {
      name: "Kits de soin complet",
      description:
        "Packs nettoyer–protéger–hydrater pour les maisons de retraite, le logement accompagné et les soins à domicile — kits d'essai et packs institutionnels.",
    },
    pt: {
      name: "Kits de cuidado completo",
      description:
        "Conjuntos de limpar–proteger–hidratar para residências, vida assistida e cuidados domiciliares — kits de teste e packs institucionais.",
    },
    pl: {
      name: "Kompletne zestawy pielęgnacyjne",
      description:
        "Zestawy czyścić–chronić–nawilżać dla domów opieki, mieszkań z opieką i opieki domowej — zestawy próbne i paczki instytucjonalne.",
    },
  },
}

export const specLabels: Record<string, Record<Locale, string>> = {
  "Launch Batch": {
    en: "Launch Batch",
    ja: "発売バッチ",
    de: "Einführungscharge",
    es: "Lote de lanzamiento",
    fr: "Lot de lancement",
    pt: "Lote de lançamento",
    pl: "Partia wprowadzająca",
  },
  "FOB Price": {
    en: "FOB Price",
    ja: "FOB価格",
    de: "FOB-Preis",
    es: "Precio FOB",
    fr: "Prix FOB",
    pt: "Preço FOB",
    pl: "Cena FOB",
  },
  MOQ: {
    en: "MOQ",
    ja: "MOQ",
    de: "Mindestbestellmenge",
    es: "Pedido mínimo",
    fr: "Quantité minimale",
    pt: "Pedido mínimo",
    pl: "Minimalne zamówienie",
  },
  Material: {
    en: "Material",
    ja: "素材",
    de: "Material",
    es: "Material",
    fr: "Matériau",
    pt: "Material",
    pl: "Materiał",
  },
  "Lead Time": {
    en: "Lead Time",
    ja: "納期",
    de: "Lieferzeit",
    es: "Plazo de entrega",
    fr: "Délai de livraison",
    pt: "Prazo de entrega",
    pl: "Czas realizacji",
  },
  "Certificate Status": {
    en: "Certificate Status",
    ja: "証明書ステータス",
    de: "Zertifikatsstatus",
    es: "Estado de certificación",
    fr: "Statut de certification",
    pt: "Status de certificação",
    pl: "Status certyfikacji",
  },
  Packaging: {
    en: "Packaging",
    ja: "包装",
    de: "Verpackung",
    es: "Embalaje",
    fr: "Emballage",
    pt: "Embalagem",
    pl: "Opakowanie",
  },
  "Target Buyers": {
    en: "Target Buyers",
    ja: "対象バイヤー",
    de: "Zielkäufer",
    es: "Compradores objetivo",
    fr: "Acheteurs cibles",
    pt: "Compradores-alvo",
    pl: "Docelowi nabywcy",
  },
  "Market Position": {
    en: "Market Position",
    ja: "市場ポジション",
    de: "Marktpositionierung",
    es: "Posicionamiento de mercado",
    fr: "Positionnement marché",
    pt: "Posicionamento de mercado",
    pl: "Pozycjonowanie rynkowe",
  },
  "OEM/ODM": {
    en: "OEM/ODM",
    ja: "OEM/ODM",
    de: "OEM/ODM",
    es: "OEM/ODM",
    fr: "OEM/ODM",
    pt: "OEM/ODM",
    pl: "OEM/ODM",
  },
  "Image Source": {
    en: "Image Source",
    ja: "画像ソース",
    de: "Bildquelle",
    es: "Fuente de imagen",
    fr: "Source image",
    pt: "Fonte de imagem",
    pl: "Źródło zdjęcia",
  },
  Payment: {
    en: "Payment",
    ja: "お支払い",
    de: "Zahlung",
    es: "Pago",
    fr: "Paiement",
    pt: "Pagamento",
    pl: "Płatność",
  },
  Format: {
    en: "Format",
    ja: "形状",
    de: "Format",
    es: "Formato",
    fr: "Format",
    pt: "Formato",
    pl: "Format",
  },
  Size: {
    en: "Size",
    ja: "サイズ",
    de: "Größe",
    es: "Tamaño",
    fr: "Taille",
    pt: "Tamanho",
    pl: "Rozmiar",
  },
  "Skin Type": {
    en: "Skin Type",
    ja: "肌タイプ",
    de: "Hauttyp",
    es: "Tipo de piel",
    fr: "Type de peau",
    pt: "Tipo de pele",
    pl: "Typ skóry",
  },
  "Use Scenario": {
    en: "Use Scenario",
    ja: "使用シーン",
    de: "Anwendungsbereich",
    es: "Escenario de uso",
    fr: "Scénario d'utilisation",
    pt: "Cenário de uso",
    pl: "Scenariusz użycia",
  },
  "Certification Path": {
    en: "Certification Path",
    ja: "認証区分",
    de: "Zertifizierungsweg",
    es: "Vía de certificación",
    fr: "Voie de certification",
    pt: "Via de certificação",
    pl: "Ścieżka certyfikacji",
  },
  "Active Direction": {
    en: "Active Direction",
    ja: "有効成分",
    de: "Wirkstoffrichtung",
    es: "Principio activo",
    fr: "Principe actif",
    pt: "Princípio ativo",
    pl: "Substancja aktywna",
  },
  "Key Feature": {
    en: "Key Feature",
    ja: "主な特徴",
    de: "Kernmerkmal",
    es: "Característica clave",
    fr: "Caractéristique clé",
    pt: "Característica-chave",
    pl: "Kluczowa cecha",
  },
  Configuration: {
    en: "Configuration",
    ja: "構成",
    de: "Konfiguration",
    es: "Configuración",
    fr: "Configuration",
    pt: "Configuração",
    pl: "Konfiguracja",
  },
  Contents: {
    en: "Contents",
    ja: "内容",
    de: "Inhalt",
    es: "Contenido",
    fr: "Contenu",
    pt: "Conteúdo",
    pl: "Zawartość",
  },
}

export const specDefaultValues: Record<string, Record<Locale, string>> = {
  "Certificate Status": {
    en: "Certificate and test-file status pending supplier file confirmation for the exact SKU.",
    ja: "証明書およびテストファイルのステータスは、該当SKUのサプライヤー確認待ちです。",
    de: "Zertifikats- und Testdateistatus ausstehend — Lieferantendateibestätigung für die genaue SKU erforderlich.",
    es: "Estado de certificado y archivo de pruebas pendiente de confirmación del archivo del proveedor para la SKU exacta.",
    fr: "Statut du certificat et du fichier de test en attente de confirmation du dossier fournisseur pour la SKU exacte.",
    pt: "Status de certificado e arquivo de teste pendente de confirmação do dossiê do fornecedor para a SKU exata.",
    pl: "Status certyfikatu i pliku testowego oczekuje na potwierdzenie dokumentacji dostawcy dla dokładnego SKU.",
  },
  Packaging: {
    en: "Neutral tube, DS CARO carton, private label, language label, or bulk carton",
    ja: "中性チューブ、DS CARO箱、プライベートラベル、言語ラベル、またはバルク箱",
    de: "Neutrale Tube, DS CARO-Karton, Private Label, Sprachetikett oder Großkarton",
    es: "Tubo neutro, caja DS CARO, marca privada, etiqueta de idioma o caja a granel",
    fr: "Tube neutre, carton DS CARO, marque privée, étiquette multilingue ou carton en vrac",
    pt: "Tubo neutro, caixa DS CARO, marca privada, etiqueta de idioma ou caixa a granel",
    pl: "Neutralna tuba, karton DS CARO, marka prywatna, etykieta językowa lub karton hurtowy",
  },
  "Lead Time": {
    en: "20-35 days after sample approval",
    ja: "サンプル承認後20〜35日",
    de: "20–35 Tage nach Musterfreigabe",
    es: "20–35 días tras la aprobación de la muestra",
    fr: "20–35 jours après approbation de l'échantillon",
    pt: "20–35 dias após a aprovação da amostra",
    pl: "20–35 dni po zatwierdzeniu próbki",
  },
  "OEM/ODM": {
    en: "Logo, color, packaging, insert, language label, barcode and marketplace content support available",
    ja: "ロゴ、色、包装、同梱物、言語ラベル、バーコード、マーケットプレイスコンテンツの対応可能",
    de: "Logo, Farbe, Verpackung, Beilage, Sprachetikett, Barcode und Marketplace-Inhalte — Unterstützung verfügbar",
    es: "Logotipo, color, embalaje, inserto, etiqueta de idioma, código de barras y contenido de marketplace — soporte disponible",
    fr: "Logo, couleur, emballage, notice, étiquette multilingue, code-barres et contenu marketplace — support disponible",
    pt: "Logotipo, cor, embalagem, inserto, etiqueta de idioma, código de barras e conteúdo de marketplace — suporte disponível",
    pl: "Logo, kolor, opakowanie, wkładka, etykieta językowa, kod kreskowy i treści marketplace — wsparcie dostępne",
  },
  "Image Source": {
    en: "DS CARO AI-generated placeholder visual for website launch; replace with supplier-authorized or self-shot images before marketplace upload.",
    ja: "DS CAROのAI生成プレースホルダー画像（サイト公開用）。マーケットプレイス掲載前にサプライヤー承認または自社撮影画像に差し替え。",
    de: "Platzhalter-Visual von DS CARO (KI-generiert) für den Website-Start; vor Marketplace-Upload durch lieferantenfreigegebene oder eigene Fotos ersetzen.",
    es: "Visual de marcador generado por IA de DS CARO para el lanzamiento del sitio; reemplazar por fotos autorizadas o propias antes de subir al marketplace.",
    fr: "Visuel placeholder généré par IA DS CARO pour le lancement du site ; remplacer par des photos autorisées ou maison avant publication marketplace.",
    pt: "Visual de espaço reservado gerado por IA da DS CARO para o lançamento do site; substituir por fotos autorizadas ou próprias antes do upload no marketplace.",
    pl: "Wizualizacja zastępcza wygenerowana przez AI DS CARO do uruchomienia strony; wymień na zdjęcia autoryzowane lub własne przed wgraniem na marketplace.",
  },
  Payment: {
    en: "T/T, L/C, PayPal for samples",
    ja: "T/T、L/C、PayPal（サンプル用）",
    de: "T/T, L/C, PayPal für Muster",
    es: "T/T, L/C, PayPal para muestras",
    fr: "T/T, L/C, PayPal pour les échantillons",
    pt: "T/T, L/C, PayPal para amostras",
    pl: "T/T, L/C, PayPal za próbki",
  },
  "Launch Batch": {
    en: "P1 launch SKU for immediate B2B inquiry, quotation, sampling, and private-label discussion",
    ja: "P1発売SKU：B2B問い合わせ、見積、サンプル、プライベートラベル相談に対応",
    de: "P1-Einführungs-SKU für sofortige B2B-Anfrage, Angebot, Muster und Private-Label-Besprechung",
    es: "SKU de lanzamiento P1 para consulta, cotización, muestreo y debate de marca privada B2B inmediatos",
    fr: "SKU de lancement P1 pour demande, devis, échantillonnage et discussion marque privée B2B immédiats",
    pt: "SKU de lançamento P1 para consulta, cotação, amostragem e discussão de marca privada B2B imediatas",
    pl: "SKU wprowadzające P1 do natychmiastowej wyceny B2B, oferty, próbek i dyskusji o marki prywatnej",
  },
}

export function getLocalizedProduct(product: Product, locale: Locale): Product {
  const t = productTranslations[product.slug]?.[locale]
  const specs: Record<string, string> = {}
  for (const [key, value] of Object.entries(product.specs)) {
    const newKey = specLabels[key]?.[locale] ?? key
    const override = t?.specs?.[key] ?? specDefaultValues[key]?.[locale]
    specs[newKey] = override ?? value
  }
  return {
    ...product,
    name: t?.name ?? product.name,
    description: t?.description ?? product.description,
    features: t?.features ?? product.features,
    specs,
  }
}

export function getLocalizedCategory(category: ProductCategory, locale: Locale): ProductCategory {
  const t = categoryTranslations[category.slug]?.[locale]
  return {
    ...category,
    name: t?.name ?? category.name,
    description: t?.description ?? category.description,
  }
}

export interface ProductPageStrings {
  catalogTitle: string
  catalogSubtitle: string
  productCategories: string
  productsLabel: string
  intentTitle: string
  intentDesc: string
  viewSolution: string
  sendBulkRfq: string
  featuredTitle: string
  featuredDesc: string
  requestFullCatalog: string
  cantFindTitle: string
  cantFindDesc: string
  requestCustomOem: string
  applyTradeAccount: string
  pathCleansingTitle: string
  pathCleansingDesc: string
  pathBarrierTitle: string
  pathBarrierDesc: string
  pathDistributorTitle: string
  pathDistributorDesc: string
  pathKitsTitle: string
  pathKitsDesc: string
  home: string
  products: string
  backToProducts: string
  fobPrice: string
  perUnit: string
  volumePricing: string
  docNotes: string
  galleryMulti: string
  gallerySingle: string
  requestQuote: string
  requestSpecSheet: string
  whatsappSales: string
  technicalSpecs: string
  buyingPathBadge: string
  buyingPathTitle: string
  buyingPathDesc: string
  keyFeatures: string
  youMayAlsoLike: string
  relatedProducts: string
  relatedDesc: string
  interestedBulk: string
  interestedBulkDesc: string
  requestAQuote: string
  whatsappThisSku: string
  catProductsBadge: string
  catOemAvailable: string
  catFobTiered: string
  viewDetails: string
  bulkCtaTitle: string
  bulkCtaDesc: string
  moqMany: string
  moqOne: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string
  step4Title: string
  step4Desc: string
  complianceLong: string
  imagePolicy: string
}

export const productPageTranslations: Record<Locale, ProductPageStrings> = {
  en: {
    catalogTitle: "Adult Incontinence Skin Care Product Lines",
    catalogSubtitle:
      "Comprehensive adult incontinence skin care across three core product lines. Built for nursing homes, assisted living communities, and incontinence care distributors.",
    productCategories: "Product Categories",
    productsLabel: "Products",
    intentTitle: "Shop by Procurement Intent",
    intentDesc:
      "Start from product categories, move into the buyer scenario, then send a bulk RFQ with quantity and OEM needs.",
    viewSolution: "View solution",
    sendBulkRfq: "Send Bulk RFQ",
    featuredTitle: "Featured Products",
    featuredDesc:
      "Our launch-priority incontinence skin care products for B2B quotation, sampling, and distributor review.",
    requestFullCatalog: "Request Full Catalog",
    cantFindTitle: "Can't Find What You Need?",
    cantFindDesc:
      "We offer full OEM/ODM customization. Tell us your requirements and we'll build it for your brand.",
    requestCustomOem: "Request Custom OEM",
    applyTradeAccount: "Apply for Trade Account",
    pathCleansingTitle: "Cleansing",
    pathCleansingDesc: "No-rinse cleansing foams and wipes for daily incontinence care.",
    pathBarrierTitle: "Barrier Protection",
    pathBarrierDesc: "Adult barrier creams and no-sting skin protectant spray for IAD prevention.",
    pathDistributorTitle: "Distributor Supply Program",
    pathDistributorDesc: "Private-label, wholesale, and mixed-category quote paths for incontinence care distributors.",
    pathKitsTitle: "Complete Care Kits",
    pathKitsDesc: "Cleanse–protect–moisturize kits for facility trials and home care.",
    home: "Home",
    products: "Products",
    backToProducts: "Back to Products",
    fobPrice: "FOB Price",
    perUnit: "/ unit",
    volumePricing: "Volume Pricing",
    docNotes: "Documentation and launch notes",
    galleryMulti: "Real product photography from supplier — multiple angles and color variants available.",
    gallerySingle: "Current gallery is prepared for export-market launch presentation with DS CARO product visuals.",
    requestQuote: "Request Quote",
    requestSpecSheet: "Request Spec Sheet",
    whatsappSales: "WhatsApp Sales",
    technicalSpecs: "Technical Specifications",
    buyingPathBadge: "B2B Buying Path",
    buyingPathTitle: "From Product Shortlist to Repeat Orders",
    buyingPathDesc:
      "Each product page is connected to a practical sourcing flow for distributors, importers, care facilities, and private-label buyers.",
    keyFeatures: "Key Features",
    youMayAlsoLike: "You May Also Like",
    relatedProducts: "Related Products",
    relatedDesc: "Explore more products from the {category} category.",
    interestedBulk: "Interested in Bulk Ordering?",
    interestedBulkDesc:
      "Get a custom quote for the {product}. We offer competitive B2B pricing with flexible MOQ and OEM/ODM customization options.",
    requestAQuote: "Request a Quote",
    whatsappThisSku: "WhatsApp This SKU",
    catProductsBadge: "{n} Products — OEM/ODM Available",
    catOemAvailable: "OEM/ODM Available",
    catFobTiered: "FOB Tiered Pricing",
    viewDetails: "View Details",
    bulkCtaTitle: "Bulk No-Rinse Cleansing for Care Facilities",
    bulkCtaDesc:
      "We supply nursing homes, assisted living communities and incontinence care distributors with no-rinse cleansing products for daily perineal and body care.",
    moqMany: "MOQ: {n} units",
    moqOne: "MOQ: {n} unit",
    step1Title: "1. Request Quote",
    step1Desc:
      "Send SKU, target country, quantity, and packaging needs. We reply with MOQ, FOB price, lead time, and document status.",
    step2Title: "2. Confirm Sample",
    step2Desc:
      "Approve sample, product color, logo, packaging, instruction sheet, and compliance document requirements.",
    step3Title: "3. Bulk Production",
    step3Desc:
      "We prepare production updates, carton details, inspection photos, and export documents for your shipment.",
    step4Title: "4. Reorder & Upgrade",
    step4Desc:
      "After first shipment, we review market feedback and recommend add-on SKUs or bundle upgrades for repeat orders.",
    complianceLong:
      "Manuals, labels, and market-entry document requirements can be aligned by SKU, target market, and packaging scope.",
    imagePolicy:
      "Product pages should use supplier-authorized photography, self-shot visuals, or clearly marked AI-generated launch placeholders that must be replaced before marketplace upload when authorization is missing.",
  },
  de: {
    catalogTitle: "Produktlinien für Inkontinenz-Hautpflege bei Erwachsenen",
    catalogSubtitle:
      "Umfassende Inkontinenz-Hautpflege für Erwachsene über drei Kernproduktlinien. Entwickelt für Pflegeheime, betreutes Wohnen und Inkontinenz-Pflege-Distributoren.",
    productCategories: "Produktkategorien",
    productsLabel: "Produkte",
    intentTitle: "Nach Beschaffungsabsicht einkaufen",
    intentDesc:
      "Beginnen Sie bei den Produktkategorien, gehen Sie zum Käuferszenario und senden Sie dann eine Mengen-RFQ mit Stückzahl und OEM-Bedarf.",
    viewSolution: "Lösung ansehen",
    sendBulkRfq: "Mengen-RFQ senden",
    featuredTitle: "Empfohlene Produkte",
    featuredDesc:
      "Unsere priorisierten Inkontinenz-Hautpflege-Produkte für B2B-Angebot, Muster und Distributor-Prüfung.",
    requestFullCatalog: "Vollständigen Katalog anfragen",
    cantFindTitle: "Sie finden nicht, was Sie brauchen?",
    cantFindDesc:
      "Wir bieten volle OEM/ODM-Anpassung. Nennen Sie uns Ihre Anforderungen, und wir bauen es für Ihre Marke.",
    requestCustomOem: "Individuelles OEM anfragen",
    applyTradeAccount: "Handelskonto beantragen",
    pathCleansingTitle: "Reinigung",
    pathCleansingDesc: "Rückstandsfreie Reinigungsschäume und Tücher für die tägliche Inkontinenzpflege.",
    pathBarrierTitle: "Barriereschutz",
    pathBarrierDesc: "Erwachsenen-Barriereschutzcremes und hautschutz-spray ohne Brennen zur DAI-Vorbeugung.",
    pathDistributorTitle: "Distributor-Versorgungsprogramm",
    pathDistributorDesc: "Private-Label-, Großhandels- und Mixed-Category-Angebotswege für Inkontinenz-Distributoren.",
    pathKitsTitle: "Komplette Pflegesets",
    pathKitsDesc: "Reinigen–Schützen–Pflegen-Sets für Einrichtungs-Tests und häusliche Pflege.",
    home: "Start",
    products: "Produkte",
    backToProducts: "Zurück zu Produkten",
    fobPrice: "FOB-Preis",
    perUnit: "/ Einheit",
    volumePricing: "Mengenpreise",
    docNotes: "Dokumentation und Einführungshinweise",
    galleryMulti: "Echte Produktfotografie vom Lieferanten — mehrere Ansichten und Farbvarianten verfügbar.",
    gallerySingle: "Aktuelle Galerie ist für die Export-Markteinführung mit DS CARO-Produktvisuals vorbereitet.",
    requestQuote: "Angebot anfragen",
    requestSpecSheet: "Datenblatt anfragen",
    whatsappSales: "WhatsApp-Verkauf",
    technicalSpecs: "Technische Spezifikationen",
    buyingPathBadge: "B2B-Beschaffungspfad",
    buyingPathTitle: "Von der Produktauswahl zu Folgebestellungen",
    buyingPathDesc:
      "Jede Produktseite ist mit einem praktischen Beschaffungsablauf für Distributoren, Importeure, Einrichtungen und Private-Label-Käufer verbunden.",
    keyFeatures: "Kernmerkmale",
    youMayAlsoLike: "Das könnte Ihnen auch gefallen",
    relatedProducts: "Ähnliche Produkte",
    relatedDesc: "Entdecken Sie weitere Produkte aus der Kategorie {category}.",
    interestedBulk: "Interesse an Mengenbestellung?",
    interestedBulkDesc:
      "Erhalten Sie ein individuelles Angebot für {product}. Wir bieten wettbewerbsfähige B2B-Preise mit flexibler Mindestbestellmenge und OEM/ODM-Anpassung.",
    requestAQuote: "Angebot anfordern",
    whatsappThisSku: "WhatsApp diese SKU",
    catProductsBadge: "{n} Produkte — OEM/ODM verfügbar",
    catOemAvailable: "OEM/ODM verfügbar",
    catFobTiered: "FOB-Staffelpreise",
    viewDetails: "Details ansehen",
    bulkCtaTitle: "Mengen-Rückstandsfreie Reinigung für Pflegeeinrichtungen",
    bulkCtaDesc:
      "Wir beliefern Pflegeheime, betreutes Wohnen und Inkontinenz-Distributoren mit rückstandsfreien Reinigungsprodukten für die tägliche Intim- und Körperpflege.",
    moqMany: "Mindestbestellmenge: {n} Einheiten",
    moqOne: "Mindestbestellmenge: {n} Einheit",
    step1Title: "1. Angebot anfragen",
    step1Desc:
      "Senden Sie SKU, Zielland, Menge und Verpackungsbedarf. Wir antworten mit Mindestbestellmenge, FOB-Preis, Lieferzeit und Dokumentstatus.",
    step2Title: "2. Muster bestätigen",
    step2Desc:
      "Muster, Produktfarbe, Logo, Verpackung, Bedienungsanleitung und Compliance-Dokumentanforderungen freigeben.",
    step3Title: "3. Serienproduktion",
    step3Desc:
      "Wir bereiten Produktionsupdates, Kartondetails, Prüffotos und Exportdokumente für Ihre Sendung vor.",
    step4Title: "4. Nachbestellung & Upgrade",
    step4Desc:
      "Nach der ersten Lieferung prüfen wir Marktrückmeldungen und empfehlen Zusatz-SKUs oder Set-Upgrades für Folgebestellungen.",
    complianceLong:
      "Bedienungsanleitungen, Etiketten und markteintrittsrelevante Dokumentanforderungen können nach SKU, Zielmarkt und Verpackungsumfang abgestimmt werden.",
    imagePolicy:
      "Produktseiten sollten liefererlaubte Fotografie, eigene Aufnahmen oder klar gekennzeichnete KI-generierte Launch-Platzhalter verwenden, die vor dem Marketplace-Upload ersetzt werden müssen, sofern keine Freigabe vorliegt.",
  },
  es: {
    catalogTitle: "Líneas de productos de cuidado de la piel por incontinencia en adultos",
    catalogSubtitle:
      "Cuidado integral de la piel por incontinencia en adultos en tres líneas centrales de productos. Hecho para residencias, vida asistida y distribuidores de cuidado de incontinencia.",
    productCategories: "Categorías de productos",
    productsLabel: "Productos",
    intentTitle: "Compra según intención de compra",
    intentDesc:
      "Empieza por las categorías de productos, pasa al escenario del comprador y envía una RFQ de volumen con cantidad y necesidades OEM.",
    viewSolution: "Ver solución",
    sendBulkRfq: "Enviar RFQ de volumen",
    featuredTitle: "Productos destacados",
    featuredDesc:
      "Nuestros productos prioritarios de cuidado de la piel por incontinencia para cotización B2B, muestreo y revisión de distribuidores.",
    requestFullCatalog: "Solicitar catálogo completo",
    cantFindTitle: "¿No encuentras lo que necesitas?",
    cantFindDesc:
      "Ofrecemos personalización OEM/ODM completa. Dinos tus requisitos y lo construiremos para tu marca.",
    requestCustomOem: "Solicitar OEM personalizado",
    applyTradeAccount: "Solicitar cuenta comercial",
    pathCleansingTitle: "Limpieza",
    pathCleansingDesc: "Espumas y toallitas de limpieza sin aclarado para el cuidado diario de la incontinencia.",
    pathBarrierTitle: "Protección de barrera",
    pathBarrierDesc: "Crema barrera para adultos y spray protector de piel sin ardor para prevenir la DAI.",
    pathDistributorTitle: "Programa de suministro para distribuidores",
    pathDistributorDesc: "Vías de cotización de marca privada, mayorista y categoría mixta para distribuidores de incontinencia.",
    pathKitsTitle: "Kits de cuidado completo",
    pathKitsDesc: "Packs de limpiar–proteger–hidratar para pruebas en instituciones y cuidado en el hogar.",
    home: "Inicio",
    products: "Productos",
    backToProducts: "Volver a productos",
    fobPrice: "Precio FOB",
    perUnit: "/ unidad",
    volumePricing: "Precios por volumen",
    docNotes: "Documentación y notas de lanzamiento",
    galleryMulti: "Fotografía real del producto del proveedor — varios ángulos y variantes de color disponibles.",
    gallerySingle: "La galería actual está preparada para la presentación de lanzamiento en mercados de exportación con visuales de DS CARO.",
    requestQuote: "Solicitar cotización",
    requestSpecSheet: "Solicitar ficha técnica",
    whatsappSales: "Ventas por WhatsApp",
    technicalSpecs: "Especificaciones técnicas",
    buyingPathBadge: "Ruta de compra B2B",
    buyingPathTitle: "De la preselección de productos a los pedidos recurrentes",
    buyingPathDesc:
      "Cada página de producto está conectada a un flujo de abastecimiento práctico para distribuidores, importadores, instituciones y compradores de marca privada.",
    keyFeatures: "Características clave",
    youMayAlsoLike: "También te puede interesar",
    relatedProducts: "Productos relacionados",
    relatedDesc: "Explora más productos de la categoría {category}.",
    interestedBulk: "¿Interesado en pedidos al por mayor?",
    interestedBulkDesc:
      "Obtén una cotización personalizada para {product}. Ofrecemos precios B2B competitivos con MOQ flexible y opciones de personalización OEM/ODM.",
    requestAQuote: "Solicitar una cotización",
    whatsappThisSku: "WhatsApp de esta SKU",
    catProductsBadge: "{n} productos — OEM/ODM disponible",
    catOemAvailable: "OEM/ODM disponible",
    catFobTiered: "Precios FOB escalonados",
    viewDetails: "Ver detalles",
    bulkCtaTitle: "Limpieza sin aclarado al por mayor para instituciones",
    bulkCtaDesc:
      "Suministramos a residencias, vida asistida y distribuidores de incontinencia con productos de limpieza sin aclarado para el cuidado íntimo y corporal diario.",
    moqMany: "Pedido mínimo: {n} unidades",
    moqOne: "Pedido mínimo: {n} unidad",
    step1Title: "1. Solicitar cotización",
    step1Desc:
      "Envía SKU, país objetivo, cantidad y necesidades de embalaje. Respondemos con MOQ, precio FOB, plazo y estado de documentos.",
    step2Title: "2. Confirmar muestra",
    step2Desc:
      "Aprueba muestra, color del producto, logo, embalaje, ficha de instrucciones y requisitos de documentos de cumplimiento.",
    step3Title: "3. Producción en volumen",
    step3Desc:
      "Preparamos actualizaciones de producción, detalles de cajas, fotos de inspección y documentos de exportación para tu envío.",
    step4Title: "4. Reordenar y mejorar",
    step4Desc:
      "Tras el primer envío, revisamos la retroalimentación del mercado y recomendamos SKU adicionales o mejoras de conjuntos para pedidos recurrentes.",
    complianceLong:
      "Los manuales, etiquetas y requisitos de documentos de entrada al mercado se pueden alinear por SKU, mercado objetivo y alcance de embalaje.",
    imagePolicy:
      "Las páginas de producto deben usar fotografía autorizada por el proveedor, visuales propias o marcadores de lanzamiento generados por IA claramente marcados que deben reemplazarse antes de subir al marketplace cuando falte la autorización.",
  },
  fr: {
    catalogTitle: "Gammes de soin de la peau pour incontinence adulte",
    catalogSubtitle:
      "Soin complet de la peau pour incontinence adulte sur trois gammes centrales. Conçu pour les maisons de retraite, le logement accompagné et les distributeurs de soins d'incontinence.",
    productCategories: "Catégories de produits",
    productsLabel: "Produits",
    intentTitle: "Acheter selon l'intention d'achat",
    intentDesc:
      "Partez des catégories de produits, passez au scénario acheteur, puis envoyez un RFQ de gros avec quantité et besoins OEM.",
    viewSolution: "Voir la solution",
    sendBulkRfq: "Envoyer un RFQ de gros",
    featuredTitle: "Produits phares",
    featuredDesc:
      "Nos produits de soin de la peau pour incontinence prioritaires pour devis B2B, échantillonnage et revue distributeur.",
    requestFullCatalog: "Demander le catalogue complet",
    cantFindTitle: "Vous ne trouvez pas ce qu'il vous faut ?",
    cantFindDesc:
      "Nous proposons une personnalisation OEM/ODM complète. Indiquez vos besoins et nous les construirons pour votre marque.",
    requestCustomOem: "Demander un OEM personnalisé",
    applyTradeAccount: "Demander un compte professionnel",
    pathCleansingTitle: "Nettoyage",
    pathCleansingDesc: "Mousses et lingettes nettoyantes sans rinçage pour le soin quotidien de l'incontinence.",
    pathBarrierTitle: "Protection barrière",
    pathBarrierDesc: "Crèmes barrière pour adultes et spray protecteur cutané sans brûlure pour prévenir la DAI.",
    pathDistributorTitle: "Programme d'approvisionnement distributeurs",
    pathDistributorDesc: "Voies de devis marque privée, grossiste et catégorie mixte pour distributeurs d'incontinence.",
    pathKitsTitle: "Kits de soin complet",
    pathKitsDesc: "Packs nettoyer–protéger–hydrater pour essais en établissement et soins à domicile.",
    home: "Accueil",
    products: "Produits",
    backToProducts: "Retour aux produits",
    fobPrice: "Prix FOB",
    perUnit: "/ unité",
    volumePricing: "Tarifs par volume",
    docNotes: "Documentation et notes de lancement",
    galleryMulti: "Photographies produit réelles du fournisseur — plusieurs angles et variantes de couleur disponibles.",
    gallerySingle: "La galerie actuelle est préparée pour la présentation de lancement sur marchés d'exportation avec les visuels DS CARO.",
    requestQuote: "Demander un devis",
    requestSpecSheet: "Demander une fiche technique",
    whatsappSales: "Ventes WhatsApp",
    technicalSpecs: "Spécifications techniques",
    buyingPathBadge: "Parcours d'achat B2B",
    buyingPathTitle: "De la présélection produit aux commandes récurrentes",
    buyingPathDesc:
      "Chaque page produit est reliée à un flux d'approvisionnement pratique pour distributeurs, importateurs, établissements et acheteurs marque privée.",
    keyFeatures: "Caractéristiques clés",
    youMayAlsoLike: "Vous aimerez aussi",
    relatedProducts: "Produits associés",
    relatedDesc: "Découvrez d'autres produits de la catégorie {category}.",
    interestedBulk: "Intéressé par une commande en gros ?",
    interestedBulkDesc:
      "Obtenez un devis personnalisé pour {product}. Nous proposons des prix B2B compétitifs avec MOQ flexible et options de personnalisation OEM/ODM.",
    requestAQuote: "Demander un devis",
    whatsappThisSku: "WhatsApp de cette SKU",
    catProductsBadge: "{n} produits — OEM/ODM disponible",
    catOemAvailable: "OEM/ODM disponible",
    catFobTiered: "Tarifs FOB dégressifs",
    viewDetails: "Voir les détails",
    bulkCtaTitle: "Nettoyage sans rinçage en gros pour les établissements",
    bulkCtaDesc:
      "Nous fournissons maisons de retraite, logements accompagnés et distributeurs d'incontinence en produits nettoyants sans rinçage pour les soins intimes et corporels quotidiens.",
    moqMany: "Quantité minimale : {n} unités",
    moqOne: "Quantité minimale : {n} unité",
    step1Title: "1. Demander un devis",
    step1Desc:
      "Envoyez SKU, pays cible, quantité et besoins d'emballage. Nous répondons avec MOQ, prix FOB, délai et statut documentaire.",
    step2Title: "2. Confirmer l'échantillon",
    step2Desc:
      "Approuvez l'échantillon, la couleur du produit, le logo, l'emballage, la notice et les exigences documentaires de conformité.",
    step3Title: "3. Production en série",
    step3Desc:
      "Nous préparons les mises à jour de production, détails des cartons, photos d'inspection et documents d'exportation pour votre envoi.",
    step4Title: "4. Recommander et évoluer",
    step4Desc:
      "Après le premier envoi, nous analysons les retours marché et recommandons des SKU additionnelles ou des upgrades de packs pour les commandes récurrentes.",
    complianceLong:
      "Les manuels, étiquettes et exigences documentaires d'entrée sur le marché peuvent être alignés par SKU, marché cible et périmètre d'emballage.",
    imagePolicy:
      "Les pages produit doivent utiliser des photos autorisées par le fournisseur, des visuels maison ou des placeholders de lancement générés par IA clairement marqués, à remplacer avant publication marketplace en l'absence d'autorisation.",
  },
  pt: {
    catalogTitle: "Linhas de produtos de cuidado da pele para incontinência adulta",
    catalogSubtitle:
      "Cuidado completo da pele para incontinência adulta em três linhas centrais de produtos. Feito para residências, vida assistida e distribuidores de cuidado de incontinência.",
    productCategories: "Categorias de produtos",
    productsLabel: "Produtos",
    intentTitle: "Compre por intenção de compra",
    intentDesc:
      "Comece pelas categorias de produtos, avance para o cenário do comprador e envie um RFQ de volume com quantidade e necessidades OEM.",
    viewSolution: "Ver solução",
    sendBulkRfq: "Enviar RFQ de volume",
    featuredTitle: "Produtos em destaque",
    featuredDesc:
      "Nossos produtos prioritários de cuidado da pele para incontinência para cotação B2B, amostragem e revisão de distribuidores.",
    requestFullCatalog: "Solicitar catálogo completo",
    cantFindTitle: "Não encontra o que precisa?",
    cantFindDesc:
      "Oferecemos personalização OEM/ODM completa. Diga seus requisitos e nós construímos para sua marca.",
    requestCustomOem: "Solicitar OEM personalizado",
    applyTradeAccount: "Solicitar conta comercial",
    pathCleansingTitle: "Limpeza",
    pathCleansingDesc: "Espumas e lenços de limpeza sem enxágue para o cuidado diário da incontinência.",
    pathBarrierTitle: "Proteção de barreira",
    pathBarrierDesc: "Creme barreira para adultos e spray protetor de pele sem ardência para prevenir a DAUI.",
    pathDistributorTitle: "Programa de fornecimento para distribuidores",
    pathDistributorDesc: "Vias de cotação de marca privada, atacado e categoria mista para distribuidores de incontinência.",
    pathKitsTitle: "Kits de cuidado completo",
    pathKitsDesc: "Conjuntos de limpar–proteger–hidratar para testes em instituições e cuidados domiciliares.",
    home: "Início",
    products: "Produtos",
    backToProducts: "Voltar aos produtos",
    fobPrice: "Preço FOB",
    perUnit: "/ unidade",
    volumePricing: "Preços por volume",
    docNotes: "Documentação e notas de lançamento",
    galleryMulti: "Fotografia real do produto do fornecedor — vários ângulos e variantes de cor disponíveis.",
    gallerySingle: "A galeria atual está preparada para a apresentação de lançamento em mercados de exportação com visuais da DS CARO.",
    requestQuote: "Solicitar cotação",
    requestSpecSheet: "Solicitar ficha técnica",
    whatsappSales: "Vendas pelo WhatsApp",
    technicalSpecs: "Especificações técnicas",
    buyingPathBadge: "Caminho de compra B2B",
    buyingPathTitle: "Da pré-seleção de produtos a pedidos recorrentes",
    buyingPathDesc:
      "Cada página de produto está conectada a um fluxo de abastecimento prático para distribuidores, importadores, instituições e compradores de marca privada.",
    keyFeatures: "Características-chave",
    youMayAlsoLike: "Você também pode gostar",
    relatedProducts: "Produtos relacionados",
    relatedDesc: "Explore mais produtos da categoria {category}.",
    interestedBulk: "Interessado em pedidos em volume?",
    interestedBulkDesc:
      "Obtenha uma cotação personalizada para {product}. Oferecemos preços B2B competitivos com MOQ flexível e opções de personalização OEM/ODM.",
    requestAQuote: "Solicitar uma cotação",
    whatsappThisSku: "WhatsApp desta SKU",
    catProductsBadge: "{n} produtos — OEM/ODM disponível",
    catOemAvailable: "OEM/ODM disponível",
    catFobTiered: "Preços FOB escalonados",
    viewDetails: "Ver detalhes",
    bulkCtaTitle: "Limpeza sem enxágue em volume para instituições",
    bulkCtaDesc:
      "Fornecemos residências, vida assistida e distribuidores de incontinência com produtos de limpeza sem enxágue para cuidados íntimos e corporais diários.",
    moqMany: "Pedido mínimo: {n} unidades",
    moqOne: "Pedido mínimo: {n} unidade",
    step1Title: "1. Solicitar cotação",
    step1Desc:
      "Envie SKU, país-alvo, quantidade e necessidades de embalagem. Respondemos com MOQ, preço FOB, prazo e status de documentos.",
    step2Title: "2. Confirmar amostra",
    step2Desc:
      "Aprove amostra, cor do produto, logo, embalagem, ficha de instruções e requisitos de documentos de conformidade.",
    step3Title: "3. Produção em volume",
    step3Desc:
      "Preparamos atualizações de produção, detalhes de caixas, fotos de inspeção e documentos de exportação para seu envio.",
    step4Title: "4. Reordenar e evoluir",
    step4Desc:
      "Após o primeiro envio, revisamos o feedback do mercado e recomendamos SKUs adicionais ou upgrades de conjuntos para pedidos recorrentes.",
    complianceLong:
      "Manuais, etiquetas e requisitos de documentos de entrada no mercado podem ser alinhados por SKU, mercado-alvo e escopo de embalagem.",
    imagePolicy:
      "As páginas de produto devem usar fotografia autorizada do fornecedor, visuais próprios ou marcadores de lançamento gerados por IA claramente identificados que devem ser substituídos antes do upload no marketplace quando falta autorização.",
  },
  pl: {
    catalogTitle: "Linie produktów pielęgnacji skóry przy inkontynencji u dorosłych",
    catalogSubtitle:
      "Kompleksowa pielęgnacja skóry przy inkontynencji u dorosłych w trzech głównych liniach produktów. Przygotowane dla domów opieki, mieszkań z opieką i dystrybutorów pielęgnacji inkontynencji.",
    productCategories: "Kategorie produktów",
    productsLabel: "Produkty",
    intentTitle: "Kup według intencji zakupu",
    intentDesc:
      "Zacznij od kategorii produktów, przejdź do scenariusza nabywcy, a następnie wyślij RFQ o wolumen z ilością i potrzebami OEM.",
    viewSolution: "Zobacz rozwiązanie",
    sendBulkRfq: "Wyślij RFQ o wolumen",
    featuredTitle: "Polecane produkty",
    featuredDesc:
      "Nasze priorytetowe produkty pielęgnacji skóry przy inkontynencji do wyceny B2B, próbek i przeglądu przez dystrybutorów.",
    requestFullCatalog: "Poproś o pełny katalog",
    cantFindTitle: "Nie możesz znaleźć tego, czego potrzebujesz?",
    cantFindDesc:
      "Oferujemy pełną personalizację OEM/ODM. Podaj swoje wymagania, a zbudujemy to pod Twoją markę.",
    requestCustomOem: "Poproś o indywidualne OEM",
    applyTradeAccount: "Złóż wniosek o konto handlowe",
    pathCleansingTitle: "Mycie",
    pathCleansingDesc: "Pianki i chusteczki do mycia bez spłukiwania do codziennej pielęgnacji inkontynencji.",
    pathBarrierTitle: "Ochrona barierowa",
    pathBarrierDesc: "Krem barierowy dla dorosłych i spray ochronny bez pieczenia do zapobiegania IAD.",
    pathDistributorTitle: "Program zaopatrywania dystrybutorów",
    pathDistributorDesc: "Ścieżki wyceny marki prywatnej, hurtu i kategorii mieszanej dla dystrybutorów inkontynencji.",
    pathKitsTitle: "Kompletne zestawy pielęgnacyjne",
    pathKitsDesc: "Zestawy czyścić–chronić–nawilżać do prób w placówkach i opieki domowej.",
    home: "Strona główna",
    products: "Produkty",
    backToProducts: "Wróć do produktów",
    fobPrice: "Cena FOB",
    perUnit: "/ sztuka",
    volumePricing: "Ceny przy wolumenie",
    docNotes: "Dokumentacja i uwagi o uruchomieniu",
    galleryMulti: "Rzeczywiste zdjęcia produktu od dostawcy — dostępne wiele kątów i warianty kolorystyczne.",
    gallerySingle: "Obecna galeria jest przygotowana do prezentacji launchu na rynkach eksportowych z wizualizacjami DS CARO.",
    requestQuote: "Poproś o wycenę",
    requestSpecSheet: "Poproś o kartę techniczną",
    whatsappSales: "Sprzedaż przez WhatsApp",
    technicalSpecs: "Specyfikacje techniczne",
    buyingPathBadge: "Ścieżka zakupu B2B",
    buyingPathTitle: "Od krótkiej listy produktów do zamówień powtarzalnych",
    buyingPathDesc:
      "Każda strona produktu jest połączona z praktycznym przepływem zaopatrzenia dla dystrybutorów, importerów, placówek i nabywców marki prywatnej.",
    keyFeatures: "Kluczowe cechy",
    youMayAlsoLike: "Mogą Ci się też przydać",
    relatedProducts: "Powiązane produkty",
    relatedDesc: "Odkryj więcej produktów z kategorii {category}.",
    interestedBulk: "Zainteresowany zamówieniem hurtowym?",
    interestedBulkDesc:
      "Otrzymaj indywidualną wycenę dla {product}. Oferujemy konkurencyjne ceny B2B z elastycznym MOQ i opcjami personalizacji OEM/ODM.",
    requestAQuote: "Poproś o wycenę",
    whatsappThisSku: "WhatsApp tej SKU",
    catProductsBadge: "{n} produktów — OEM/ODM dostępne",
    catOemAvailable: "OEM/ODM dostępne",
    catFobTiered: "Ceny FOB przy wolumenie",
    viewDetails: "Zobacz szczegóły",
    bulkCtaTitle: "Mycie bez spłukiwania w wolumenie dla placówek",
    bulkCtaDesc:
      "Zaopatrujemy domy opieki, mieszkania z opieką i dystrybutorów inkontynencji w produkty do mycia bez spłukiwania do codziennej pielęgnacji intymnej i ciała.",
    moqMany: "Minimalne zamówienie: {n} sztuk",
    moqOne: "Minimalne zamówienie: {n} sztuka",
    step1Title: "1. Poproś o wycenę",
    step1Desc:
      "Wyślij SKU, kraj docelowy, ilość i potrzeby pakowania. Odpowiadamy MOQ, ceną FOB, czasem realizacji i statusem dokumentów.",
    step2Title: "2. Potwierdź próbkę",
    step2Desc:
      "Zatwierdź próbkę, kolor produktu, logo, opakowanie, kartę instrukcji i wymogi dokumentów zgodności.",
    step3Title: "3. Produkcja seryjna",
    step3Desc:
      "Przygotowujemy aktualizacje produkcji, szczegóły kartonów, zdjęcia inspekcji i dokumenty eksportowe dla Twojej przesyłki.",
    step4Title: "4. Zamów ponownie i ulepsz",
    step4Desc:
      "Po pierwszej wysyłce analizujemy opinie rynku i rekomendujemy dodatkowe SKU lub upgrady zestawów dla zamówień powtarzalnych.",
    complianceLong:
      "Instrukcje, etykiety i wymogi dokumentacyjne wejścia na rynek można dopasować według SKU, rynku docelowego i zakresu opakowania.",
    imagePolicy:
      "Strony produktów powinny używać zdjęć autoryzowanych przez dostawcę, wizualizacji własnych lub wyraźnie oznaczonych placeholderów wygenerowanych przez AI do uruchomienia, które należy wymienić przed wgraniem na marketplace, gdy brakuje autoryzacji.",
  },

  ja: {
    catalogTitle: "Adult Incontinence Skin Care Product Lines",
    catalogSubtitle:
      "Comprehensive adult incontinence skin care across three core product lines. Built for nursing homes, assisted living communities, and incontinence care distributors.",
    productCategories: "Product Categories",
    productsLabel: "Products",
    intentTitle: "Shop by Procurement Intent",
    intentDesc:
      "Start from product categories, move into the buyer scenario, then send a bulk RFQ with quantity and OEM needs.",
    viewSolution: "View solution",
    sendBulkRfq: "Send Bulk RFQ",
    featuredTitle: "Featured Products",
    featuredDesc:
      "Our launch-priority incontinence skin care products for B2B quotation, sampling, and distributor review.",
    requestFullCatalog: "Request Full Catalog",
    cantFindTitle: "Can't Find What You Need?",
    cantFindDesc:
      "We offer full OEM/ODM customization. Tell us your requirements and we'll build it for your brand.",
    requestCustomOem: "Request Custom OEM",
    applyTradeAccount: "Apply for Trade Account",
    pathCleansingTitle: "Cleansing",
    pathCleansingDesc: "No-rinse cleansing foams and wipes for daily incontinence care.",
    pathBarrierTitle: "Barrier Protection",
    pathBarrierDesc: "Adult barrier creams and no-sting skin protectant spray for IAD prevention.",
    pathDistributorTitle: "Distributor Supply Program",
    pathDistributorDesc: "Private-label, wholesale, and mixed-category quote paths for incontinence care distributors.",
    pathKitsTitle: "Complete Care Kits",
    pathKitsDesc: "Cleanse–protect–moisturize kits for facility trials and home care.",
    home: "Home",
    products: "Products",
    backToProducts: "Back to Products",
    fobPrice: "FOB Price",
    perUnit: "/ unit",
    volumePricing: "Volume Pricing",
    docNotes: "Documentation and launch notes",
    galleryMulti: "Real product photography from supplier — multiple angles and color variants available.",
    gallerySingle: "Current gallery is prepared for export-market launch presentation with DS CARO product visuals.",
    requestQuote: "Request Quote",
    requestSpecSheet: "Request Spec Sheet",
    whatsappSales: "WhatsApp Sales",
    technicalSpecs: "Technical Specifications",
    buyingPathBadge: "B2B Buying Path",
    buyingPathTitle: "From Product Shortlist to Repeat Orders",
    buyingPathDesc:
      "Each product page is connected to a practical sourcing flow for distributors, importers, care facilities, and private-label buyers.",
    keyFeatures: "Key Features",
    youMayAlsoLike: "You May Also Like",
    relatedProducts: "Related Products",
    relatedDesc: "Explore more products from the {category} category.",
    interestedBulk: "Interested in Bulk Ordering?",
    interestedBulkDesc:
      "Get a custom quote for the {product}. We offer competitive B2B pricing with flexible MOQ and OEM/ODM customization options.",
    requestAQuote: "Request a Quote",
    whatsappThisSku: "WhatsApp This SKU",
    catProductsBadge: "{n} Products — OEM/ODM Available",
    catOemAvailable: "OEM/ODM Available",
    catFobTiered: "FOB Tiered Pricing",
    viewDetails: "View Details",
    bulkCtaTitle: "Bulk No-Rinse Cleansing for Care Facilities",
    bulkCtaDesc:
      "We supply nursing homes, assisted living communities and incontinence care distributors with no-rinse cleansing products for daily perineal and body care.",
    moqMany: "MOQ: {n} units",
    moqOne: "MOQ: {n} unit",
    step1Title: "1. Request Quote",
    step1Desc:
      "Send SKU, target country, quantity, and packaging needs. We reply with MOQ, FOB price, lead time, and document status.",
    step2Title: "2. Confirm Sample",
    step2Desc:
      "Approve sample, product color, logo, packaging, instruction sheet, and compliance document requirements.",
    step3Title: "3. Bulk Production",
    step3Desc:
      "We prepare production updates, carton details, inspection photos, and export documents for your shipment.",
    step4Title: "4. Reorder & Upgrade",
    step4Desc:
      "After first shipment, we review market feedback and recommend add-on SKUs or bundle upgrades for repeat orders.",
    complianceLong:
      "Manuals, labels, and market-entry document requirements can be aligned by SKU, target market, and packaging scope.",
    imagePolicy:
      "Product pages should use supplier-authorized photography, self-shot visuals, or clearly marked AI-generated launch placeholders that must be replaced before marketplace upload when authorization is missing.",
  },
}

export interface ProductDetailSections {
  bulkBadge: string
  bulkTitle: string
  bulkDesc: string
  bulkCta: string
  bulkMoqLabel: string
  bulkLeadTimeLabel: string
  bulkPackagingLabel: string
  bulkTableVolume: string
  bulkTableFob: string
  bulkTableNote: string
  bulkNoteMoj: string
  bulkNoteVolume: string
  bulkNoteBest: string
  whoBadge: string
  whoTitle: string
  whoDesc: string
  buyerNursingTitle: string
  buyerNursingDesc: string
  buyerDistTitle: string
  buyerDistDesc: string
  buyerAssistedTitle: string
  buyerAssistedDesc: string
  buyerOnlineTitle: string
  buyerOnlineDesc: string
  oemBadge: string
  oemTitle: string
  oemDesc: string
  oemCta: string
  oemCard1Title: string
  oemCard1Desc: string
  oemCard2Title: string
  oemCard2Desc: string
  oemCard3Title: string
  oemCard3Desc: string
  oemCard4Title: string
  oemCard4Desc: string
  kitsBadge: string
  kitsTitle: string
  kitsDesc: string
  kitsViewAll: string
  kitsRecommended: string
  kitsBundleLabel: string
  kitsRequestBundle: string
  stickyQuote: string
}

export const productDetailSections: Record<Locale, ProductDetailSections> = {
  en: {
    bulkBadge: "Bulk Procurement",
    bulkTitle: "Procurement Details for {id}",
    bulkDesc:
      "Built for RFQ review: MOQ, bulk price tiers, production timing, and packaging options are summarized before you contact sales.",
    bulkCta: "Request Quote for This Product",
    bulkMoqLabel: "Minimum Order Quantity",
    bulkLeadTimeLabel: "Lead Time",
    bulkPackagingLabel: "Packaging Options",
    bulkTableVolume: "Order Volume",
    bulkTableFob: "FOB / Quote Basis",
    bulkTableNote: "Procurement Note",
    bulkNoteMoj: "MOQ reference",
    bulkNoteVolume: "volume pricing",
    bulkNoteBest: "best bulk quote",
    whoBadge: "Buyer Fit",
    whoTitle: "Who Buys This Product",
    whoDesc:
      "DS CARO product pages are structured around real incontinence care purchasing use cases, not consumer browsing.",
    buyerNursingTitle: "Nursing Homes",
    buyerNursingDesc: "Cleansing, barrier protection, complete care kits, and recurring facility purchasing.",
    buyerDistTitle: "Distributors",
    buyerDistDesc: "Wholesale range building, mixed SKU cartons, regional inventory programs, and private-label resale.",
    buyerAssistedTitle: "Assisted Living Facilities",
    buyerAssistedDesc: "Dignified care products for residents, care staff workflows, and room-level replenishment.",
    buyerOnlineTitle: "Online Sellers",
    buyerOnlineDesc: "SKU-level photos, packaging options, barcode discussion, and marketplace-ready product files.",
    oemBadge: "OEM / Private Label",
    oemTitle: "Private-Label Ready for B2B Buyers",
    oemDesc:
      "Use this SKU for your own care-supply brand, distributor catalog, nursing-home supply program, or marketplace listing. We confirm MOQ, sample timing, packaging structure, and file requirements by target market.",
    oemCta: "Discuss OEM for {id}",
    oemCard1Title: "Logo & label",
    oemCard1Desc: "Logo label, wash label, size sticker, barcode, and language label discussion.",
    oemCard2Title: "Packaging",
    oemCard2Desc: "Neutral, DS CARO, private carton, retail bag, insert card, or bulk carton.",
    oemCard3Title: "MOQ clarity",
    oemCard3Desc: "{n} units MOQ reference. Mixed-SKU cartons can be reviewed by kit.",
    oemCard4Title: "File support",
    oemCard4Desc: "Product photos, specifications, carton info, and document status reviewed by SKU.",
    kitsBadge: "Recommended Kits",
    kitsTitle: "Add This SKU to a Procurement Bundle",
    kitsDesc: "Increase order value and simplify purchasing by quoting this product as part of a care-facility kit.",
    kitsViewAll: "View All Kits",
    kitsRecommended: "Recommended for nursing homes",
    kitsBundleLabel: "3-6 SKU bundle",
    kitsRequestBundle: "Request Bundle Quote",
    stickyQuote: "Quote {id}",
  },
  de: {
    bulkBadge: "Mengenbeschaffung",
    bulkTitle: "Beschaffungsdetails für {id}",
    bulkDesc:
      "Für die RFQ-Prüfung aufbereitet: MOQ, Mengenpreisstufen, Produktionszeit und Verpackungsoptionen sind zusammengefasst, bevor Sie den Vertrieb kontaktieren.",
    bulkCta: "Angebot für dieses Produkt anfragen",
    bulkMoqLabel: "Mindestbestellmenge",
    bulkLeadTimeLabel: "Lieferzeit",
    bulkPackagingLabel: "Verpackungsoptionen",
    bulkTableVolume: "Bestellvolumen",
    bulkTableFob: "FOB / Angebotsbasis",
    bulkTableNote: "Beschaffungshinweis",
    bulkNoteMoj: "MOQ-Referenz",
    bulkNoteVolume: "Mengenpreis",
    bulkNoteBest: "bestes Mengenangebot",
    whoBadge: "Käuferprofil",
    whoTitle: "Wer kauft dieses Produkt",
    whoDesc:
      "DS CARO-Produktseiten sind um reale Inkontinenz-Beschaffungsfälle herum strukturiert, nicht um Verbraucher-Browsing.",
    buyerNursingTitle: "Pflegeheime",
    buyerNursingDesc: "Reinigung, Barriereschutz, komplette Pflegesets und laufende Einrichtungskäufe.",
    buyerDistTitle: "Distributoren",
    buyerDistDesc: "Aufbau des Großsortiments, gemischte SKU-Kartons, regionale Lagerprogramme und Private-Label-Weiterverkauf.",
    buyerAssistedTitle: "Betreutes Wohnen",
    buyerAssistedDesc: "Würdevolle Pflegeprodukte für Bewohner, Abläufe des Pflegepersonals und Ebenen-Nachschub.",
    buyerOnlineTitle: "Online-Verkäufer",
    buyerOnlineDesc: "SKU-Ebene-Fotos, Verpackungsoptionen, Barcode-Abstimmung und marktplatzbereite Produktdateien.",
    oemBadge: "OEM / Private Label",
    oemTitle: "Private-Label-fähig für B2B-Käufer",
    oemDesc:
      "Nutzen Sie diese SKU für Ihre eigene Pflege-Markene, den Distributor-Katalog, das Pflegeheim-Versorgungsprogramm oder den Marketplace-Eintrag. Wir bestätigen MOQ, Musterzeit, Verpackungsstruktur und Dokumentanforderungen je Zielmarkt.",
    oemCta: "OEM für {id} besprechen",
    oemCard1Title: "Logo & Etikett",
    oemCard1Desc: "Logo-Etikett, Pflegeetikett, Größenaufkleber, Barcode und Sprachetikett-Abstimmung.",
    oemCard2Title: "Verpackung",
    oemCard2Desc: "Neutral, DS CARO, private Karton, Einzelhandelsbeutel, Einlegerkarte oder Großkarton.",
    oemCard3Title: "MOQ-Klarheit",
    oemCard3Desc: "{n} Einheiten MOQ-Referenz. Gemischte SKU-Kartons können pro Kit geprüft werden.",
    oemCard4Title: "Datei-Support",
    oemCard4Desc: "Produktfotos, Spezifikationen, Kartondetails und Dokumentstatus pro SKU geprüft.",
    kitsBadge: "Empfohlene Sets",
    kitsTitle: "Diese SKU zu einem Beschaffungs-Bundle hinzufügen",
    kitsDesc: "Erhöhen Sie den Auftragswert und vereinfachen Sie den Einkauf, indem Sie dieses Produkt als Teil eines Einrichtungs-Sets anbieten.",
    kitsViewAll: "Alle Sets ansehen",
    kitsRecommended: "Empfohlen für Pflegeheime",
    kitsBundleLabel: "3-6 SKU-Bundle",
    kitsRequestBundle: "Bundle-Angebot anfragen",
    stickyQuote: "Angebot {id}",
  },
  es: {
    bulkBadge: "Compra en volumen",
    bulkTitle: "Detalles de compra para {id}",
    bulkDesc:
      "Preparado para revisión RFQ: MOQ, niveles de precio por volumen, tiempos de producción y opciones de embalaje resumidos antes de contactar ventas.",
    bulkCta: "Solicitar cotización para este producto",
    bulkMoqLabel: "Cantidad mínima de pedido",
    bulkLeadTimeLabel: "Plazo de entrega",
    bulkPackagingLabel: "Opciones de embalaje",
    bulkTableVolume: "Volumen de pedido",
    bulkTableFob: "FOB / base de cotización",
    bulkTableNote: "Nota de compra",
    bulkNoteMoj: "Referencia MOQ",
    bulkNoteVolume: "precio por volumen",
    bulkNoteBest: "mejor cotización de volumen",
    whoBadge: "Perfil de comprador",
    whoTitle: "Quién compra este producto",
    whoDesc:
      "Las páginas de producto de DS CARO se estructuran en torno a casos reales de compra por incontinencia, no a navegación de consumo.",
    buyerNursingTitle: "Residencias",
    buyerNursingDesc: "Limpieza, protección de barrera, kits completos y compras recurrentes de instituciones.",
    buyerDistTitle: "Distribuidores",
    buyerDistDesc: "Construcción de catálogo mayorista, cartones SKU mixtos, programas de inventario regional y reventa de marca privada.",
    buyerAssistedTitle: "Vida asistida",
    buyerAssistedDesc: "Productos de cuidado digno para residentes, flujos de personal y reposición por habitación.",
    buyerOnlineTitle: "Vendedores online",
    buyerOnlineDesc: "Fotos a nivel SKU, opciones de embalaje, discusión de código de barras y archivos listos para marketplace.",
    oemBadge: "OEM / Marca privada",
    oemTitle: "Listo para marca privada para compradores B2B",
    oemDesc:
      "Use esta SKU para su propia marca de suministros, catálogo de distribuidor, programa de residencias o listado en marketplace. Confirmamos MOQ, tiempos de muestra, estructura de embalaje y requisitos de archivos por mercado.",
    oemCta: "Hablar de OEM para {id}",
    oemCard1Title: "Logo y etiqueta",
    oemCard1Desc: "Etiqueta de logo, etiqueta de lavado, calcomanía de tamaño, código de barras y etiqueta de idioma.",
    oemCard2Title: "Embalaje",
    oemCard2Desc: "Neutral, DS CARO, caja privada, bolsa de venta, tarjeta de inserción o caja a granel.",
    oemCard3Title: "Claridad de MOQ",
    oemCard3Desc: "{n} unidades referencia MOQ. Cartones SKU mixtos se revisan por kit.",
    oemCard4Title: "Soporte de archivos",
    oemCard4Desc: "Fotos de producto, especificaciones, info de caja y estado de documentos revisados por SKU.",
    kitsBadge: "Kits recomendados",
    kitsTitle: "Añada esta SKU a un bundle de compra",
    kitsDesc: "Aumente el valor del pedido y simplifique la compra cotizando este producto como parte de un kit de institución.",
    kitsViewAll: "Ver todos los kits",
    kitsRecommended: "Recomendado para residencias",
    kitsBundleLabel: "Bundle de 3-6 SKU",
    kitsRequestBundle: "Solicitar cotización de bundle",
    stickyQuote: "Cotizar {id}",
  },
  fr: {
    bulkBadge: "Achat en gros",
    bulkTitle: "Détails d'achat pour {id}",
    bulkDesc:
      "Préparé pour revue RFQ : MOQ, niveaux de prix par volume, délais de production et options d'emballage résumés avant de contacter les ventes.",
    bulkCta: "Demander un devis pour ce produit",
    bulkMoqLabel: "Quantité minimale de commande",
    bulkLeadTimeLabel: "Délai de livraison",
    bulkPackagingLabel: "Options d'emballage",
    bulkTableVolume: "Volume de commande",
    bulkTableFob: "FOB / base de devis",
    bulkTableNote: "Note d'achat",
    bulkNoteMoj: "Référence MOQ",
    bulkNoteVolume: "prix par volume",
    bulkNoteBest: "meilleur devis de gros",
    whoBadge: "Profil acheteur",
    whoTitle: "Qui achète ce produit",
    whoDesc:
      "Les pages produit DS CARO sont structurées autour de cas réels d'achat pour incontinence, pas de navigation consommateur.",
    buyerNursingTitle: "Maisons de retraite",
    buyerNursingDesc: "Nettoyage, protection barrière, kits complets et achats récurrents d'établissement.",
    buyerDistTitle: "Distributeurs",
    buyerDistDesc: "Construction de catalogue grossiste, cartons SKU mixtes, programmes d'inventaire régional et revente marque privée.",
    buyerAssistedTitle: "Logement accompagné",
    buyerAssistedDesc: "Produits de soin dignes pour résidents, flux du personnel et réapprovisionnement par chambre.",
    buyerOnlineTitle: "Vendeurs en ligne",
    buyerOnlineDesc: "Photos au niveau SKU, options d'emballage, discussion code-barres et fichiers prêts marketplace.",
    oemBadge: "OEM / Marque privée",
    oemTitle: "Prêt pour marque privée pour acheteurs B2B",
    oemDesc:
      "Utilisez cette SKU pour votre propre marque de fournitures, catalogue distributeur, programme d'établissement ou annonce marketplace. Nous confirmons MOQ, délais d'échantillon, structure d'emballage et exigences documentaires par marché cible.",
    oemCta: "Discuter l'OEM pour {id}",
    oemCard1Title: "Logo et étiquette",
    oemCard1Desc: "Étiquette logo, étiquette lavage, autocollant taille, code-barres et étiquette multilingue.",
    oemCard2Title: "Emballage",
    oemCard2Desc: "Neutre, DS CARO, carton privé, sac de vente, carte d'insert ou carton en vrac.",
    oemCard3Title: "Clarté MOQ",
    oemCard3Desc: "{n} unités référence MOQ. Les cartons SKU mixtes peuvent être revus par kit.",
    oemCard4Title: "Support fichiers",
    oemCard4Desc: "Photos produit, spécifications, info carton et statut documentaire revus par SKU.",
    kitsBadge: "Kits recommandés",
    kitsTitle: "Ajoutez cette SKU à un bundle d'achat",
    kitsDesc: "Augmentez la valeur de commande et simplifiez l'achat en cotant ce produit dans un kit d'établissement.",
    kitsViewAll: "Voir tous les kits",
    kitsRecommended: "Recommandé pour les maisons de retraite",
    kitsBundleLabel: "Bundle 3-6 SKU",
    kitsRequestBundle: "Demander un devis de bundle",
    stickyQuote: "Devis {id}",
  },
  pt: {
    bulkBadge: "Compra em volume",
    bulkTitle: "Detalhes de compra para {id}",
    bulkDesc:
      "Preparado para revisão RFQ: MOQ, faixas de preço por volume, prazos de produção e opções de embalagem resumidos antes de contatar vendas.",
    bulkCta: "Solicitar cotação para este produto",
    bulkMoqLabel: "Quantidade mínima de pedido",
    bulkLeadTimeLabel: "Prazo de entrega",
    bulkPackagingLabel: "Opções de embalagem",
    bulkTableVolume: "Volume de pedido",
    bulkTableFob: "FOB / base de cotação",
    bulkTableNote: "Nota de compra",
    bulkNoteMoj: "Referência MOQ",
    bulkNoteVolume: "preço por volume",
    bulkNoteBest: "melhor cotação de volume",
    whoBadge: "Perfil do comprador",
    whoTitle: "Quem compra este produto",
    whoDesc:
      "As páginas de produto da DS CARO são estruturadas em torno de casos reais de compra por incontinência, não navegação de consumo.",
    buyerNursingTitle: "Residências",
    buyerNursingDesc: "Limpeza, proteção de barreira, kits completos e compras recorrentes de instituições.",
    buyerDistTitle: "Distribuidores",
    buyerDistDesc: "Construção de catálogo atacadista, cartões SKU mistos, programas de inventário regional e revenda de marca privada.",
    buyerAssistedTitle: "Vida assistida",
    buyerAssistedDesc: "Produtos de cuidado digno para residentes, fluxos de equipe e reabastecimento por quarto.",
    buyerOnlineTitle: "Vendedores online",
    buyerOnlineDesc: "Fotos em nível SKU, opções de embalagem, discussão de código de barras e arquivos prontos para marketplace.",
    oemBadge: "OEM / Marca privada",
    oemTitle: "Pronto para marca privada para compradores B2B",
    oemDesc:
      "Use esta SKU para sua própria marca de suprimentos, catálogo de distribuidor, programa de residências ou listagem em marketplace. Confirmamos MOQ, prazos de amostra, estrutura de embalagem e requisitos de arquivos por mercado.",
    oemCta: "Conversar sobre OEM para {id}",
    oemCard1Title: "Logo e etiqueta",
    oemCard1Desc: "Etiqueta de logo, etiqueta de lavagem, adesivo de tamanho, código de barras e etiqueta de idioma.",
    oemCard2Title: "Embalagem",
    oemCard2Desc: "Neutra, DS CARO, caixa privada, saco de varejo, cartão de inserção ou caixa a granel.",
    oemCard3Title: "Clareza de MOQ",
    oemCard3Desc: "{n} unidades referência MOQ. Cartões SKU mistos podem ser revisados por kit.",
    oemCard4Title: "Suporte a arquivos",
    oemCard4Desc: "Fotos de produto, especificações, info de caixa e status de documentos revisados por SKU.",
    kitsBadge: "Kits recomendados",
    kitsTitle: "Adicione esta SKU a um bundle de compra",
    kitsDesc: "Aumente o valor do pedido e simplifique a compra cotando este produto como parte de um kit de instituição.",
    kitsViewAll: "Ver todos os kits",
    kitsRecommended: "Recomendado para residências",
    kitsBundleLabel: "Bundle de 3-6 SKU",
    kitsRequestBundle: "Solicitar cotação de bundle",
    stickyQuote: "Cotação {id}",
  },
  pl: {
    bulkBadge: "Zakup hurtowy",
    bulkTitle: "Szczegóły zakupu dla {id}",
    bulkDesc:
      "Przygotowane do przeglądu RFQ: MOQ, ceny przy wolumenie, czas produkcji i opcje pakowania podsumowane przed kontaktem ze sprzedażą.",
    bulkCta: "Poproś o wycenę tego produktu",
    bulkMoqLabel: "Minimalne zamówienie",
    bulkLeadTimeLabel: "Czas realizacji",
    bulkPackagingLabel: "Opcje opakowania",
    bulkTableVolume: "Wolumen zamówienia",
    bulkTableFob: "FOB / baza wyceny",
    bulkTableNote: "Uwaga zakupowa",
    bulkNoteMoj: "Referencja MOQ",
    bulkNoteVolume: "cena przy wolumenie",
    bulkNoteBest: "najlepsza wycena hurtowa",
    whoBadge: "Profil nabywcy",
    whoTitle: "Kto kupuje ten produkt",
    whoDesc:
      "Strony produktów DS CARO są zbudowane wokół rzeczywistych przypadków zakupu przy inkontynencji, a nie przeglądania konsumenckiego.",
    buyerNursingTitle: "Domy opieki",
    buyerNursingDesc: "Mycie, ochrona barierowa, kompletne zestawy i cykliczne zakupy placówek.",
    buyerDistTitle: "Dystrybutorzy",
    buyerDistDesc: "Budowa asortymentu hurtowego, kartony SKU mieszane, programy inventarzowe i odsprzedaż marki prywatnej.",
    buyerAssistedTitle: "Mieszkania z opieką",
    buyerAssistedDesc: "Godne produkty dla mieszkańców, przepływy personelu i uzupełnianie na poziomie pokoju.",
    buyerOnlineTitle: "Sprzedawcy online",
    buyerOnlineDesc: "Zdjęcia na poziomie SKU, opcje pakowania, dyskusja o kodzie kreskowym i pliki gotowe na marketplace.",
    oemBadge: "OEM / Marka prywatna",
    oemTitle: "Gotowe do marki prywatnej dla nabywców B2B",
    oemDesc:
      "Użyj tej SKU dla własnej marki zaopatrzenia, katalogu dystrybutora, programu domów opieki lub ogłoszenia na marketplace. Potwierdzamy MOQ, czas próbek, strukturę opakowania i wymogi dokumentów według rynku docelowego.",
    oemCta: "Omów OEM dla {id}",
    oemCard1Title: "Logo i etykieta",
    oemCard1Desc: "Etykieta logo, etykieta pielęgnacji, naklejka rozmiaru, kod kreskowy i etykieta językowa.",
    oemCard2Title: "Opakowanie",
    oemCard2Desc: "Neutralne, DS CARO, prywatny karton, torba detaliczna, karta wsadu lub karton hurtowy.",
    oemCard3Title: "Jasność MOQ",
    oemCard3Desc: "{n} sztuk referencja MOQ. Kartony SKU mieszane można przeglądać per zestaw.",
    oemCard4Title: "Wsparcie plików",
    oemCard4Desc: "Zdjęcia produktu, specyfikacje, info o kartonie i status dokumentów przeglądane per SKU.",
    kitsBadge: "Polecane zestawy",
    kitsTitle: "Dodaj tę SKU do bundle zakupowego",
    kitsDesc: "Zwiększ wartość zamówienia i uprość zakup, wyceniając ten produkt jako część zestawu placówki.",
    kitsViewAll: "Zobacz wszystkie zestawy",
    kitsRecommended: "Polecane dla domów opieki",
    kitsBundleLabel: "Bundle 3-6 SKU",
    kitsRequestBundle: "Poproś o wycenę bundle",
    stickyQuote: "Wycena {id}",
  },
  ja: {
    bulkBadge: "Bulk Procurement",
    bulkTitle: "Procurement Details for {id}",
    bulkDesc:
      "Built for RFQ review: MOQ, bulk price tiers, production timing, and packaging options are summarized before you contact sales.",
    bulkCta: "Request Quote for This Product",
    bulkMoqLabel: "Minimum Order Quantity",
    bulkLeadTimeLabel: "Lead Time",
    bulkPackagingLabel: "Packaging Options",
    bulkTableVolume: "Order Volume",
    bulkTableFob: "FOB / Quote Basis",
    bulkTableNote: "Procurement Note",
    bulkNoteMoj: "MOQ reference",
    bulkNoteVolume: "volume pricing",
    bulkNoteBest: "best bulk quote",
    whoBadge: "Buyer Fit",
    whoTitle: "Who Buys This Product",
    whoDesc:
      "DS CARO product pages are structured around real incontinence care purchasing use cases, not consumer browsing.",
    buyerNursingTitle: "Nursing Homes",
    buyerNursingDesc: "Cleansing, barrier protection, complete care kits, and recurring facility purchasing.",
    buyerDistTitle: "Distributors",
    buyerDistDesc: "Wholesale range building, mixed SKU cartons, regional inventory programs, and private-label resale.",
    buyerAssistedTitle: "Assisted Living Facilities",
    buyerAssistedDesc: "Dignified care products for residents, care staff workflows, and room-level replenishment.",
    buyerOnlineTitle: "Online Sellers",
    buyerOnlineDesc: "SKU-level photos, packaging options, barcode discussion, and marketplace-ready product files.",
    oemBadge: "OEM / Private Label",
    oemTitle: "Private-Label Ready for B2B Buyers",
    oemDesc:
      "Use this SKU for your own care-supply brand, distributor catalog, nursing-home supply program, or marketplace listing. We confirm MOQ, sample timing, packaging structure, and file requirements by target market.",
    oemCta: "Discuss OEM for {id}",
    oemCard1Title: "Logo & label",
    oemCard1Desc: "Logo label, wash label, size sticker, barcode, and language label discussion.",
    oemCard2Title: "Packaging",
    oemCard2Desc: "Neutral, DS CARO, private carton, retail bag, insert card, or bulk carton.",
    oemCard3Title: "MOQ clarity",
    oemCard3Desc: "{n} units MOQ reference. Mixed-SKU cartons can be reviewed by kit.",
    oemCard4Title: "File support",
    oemCard4Desc: "Product photos, specifications, carton info, and document status reviewed by SKU.",
    kitsBadge: "Recommended Kits",
    kitsTitle: "Add This SKU to a Procurement Bundle",
    kitsDesc: "Increase order value and simplify purchasing by quoting this product as part of a care-facility kit.",
    kitsViewAll: "View All Kits",
    kitsRecommended: "Recommended for nursing homes",
    kitsBundleLabel: "3-6 SKU bundle",
    kitsRequestBundle: "Request Bundle Quote",
    stickyQuote: "Quote {id}",
  },
}

export interface ProcurementKitLocalized {
  name: string
  category: string
  description: string
  buyerUse: string
  bundlePricing: string
  oemSupport: string
  recommendedBadge: string
}

export const procurementKitTranslations: Record<string, Partial<Record<Locale, ProcurementKitLocalized>>> = {
  "no-rinse-cleansing-kit": {
    de: {
      name: "Set zur Reinigung ohne Ablauf",
      category: "Reinigung",
      description:
        "Ein tägliches Reinigungs-Set für Inkontinenz-Routinen — pH-neutral, duftfrei und alkoholfrei für sensible, gereifte Haut.",
      buyerUse:
        "Bauen Sie eine SKU-Palette zur Reinigung ohne Ablauf auf, die Privatgrößen und Institutionenformate für Pflegeheime und Distributoren abdeckt.",
      bundlePricing:
        "Angebot für gemischtes Reinigungs-Set nach Probe-Packung / 500 / 2000+ Einheiten. Bestpreis nach Bestätigung von Verpackung und Sprachetiketten zusammen.",
      oemSupport:
        "Logo-Etikett, Gebrauchsanleitung, privater Karton, Sprachetiketten und verpackungsfertige Einzelhandelsunterstützung.",
      recommendedBadge: "Empfohlen für tägliche Hygiene",
    },
    es: {
      name: "Kit de limpieza sin aclarado",
      category: "Limpieza",
      description:
        "Un set de limpieza diaria para rutinas de incontinencia — pH equilibrado, sin fragancia y sin alcohol para piel sensible y madura.",
      buyerUse:
        "Construya una gama SKU de limpieza sin aclarado que cubra formatos personales e institucionales para residencias y distribuidores.",
      bundlePricing:
        "Cotización de set de limpieza mixto por pack de prueba / 500 / 2000+ unidades. Mejor precio al confirmar embalaje y etiquetas de idioma juntos.",
      oemSupport:
        "Etiqueta de logo, tarjeta de instrucciones, caja privada, etiquetas de idioma y soporte de empaque listo para venta.",
      recommendedBadge: "Recomendado para higiene diaria",
    },
    fr: {
      name: "Kit de nettoyage sans rinçage",
      category: "Nettoyage",
      description:
        "Un pack de nettoyage quotidien pour les routines d'incontinence — pH équilibré, sans parfum et sans alcool pour peaux sensibles et maturées.",
      buyerUse:
        "Construisez une gamme SKU de nettoyage sans rinçage couvrant les formats personnel et institutionnel pour maisons de retraite et distributeurs.",
      bundlePricing:
        "Devis de pack de nettoyage mixte par pack d'essai / 500 / 2000+ unités. Meilleur prix après confirmation ensemble de l'emballage et des étiquettes.",
      oemSupport:
        "Étiquette logo, fiche d'instructions, carton privé, étiquettes multilingues et support emballage prêt à vendre.",
      recommendedBadge: "Recommandé pour l'hygiène quotidienne",
    },
    pt: {
      name: "Kit de limpeza sem enxágue",
      category: "Limpeza",
      description:
        "Um kit de limpeza diária para rotinas de incontinência — pH equilibrado, sem fragrância e sem álcool para pele sensível e madura.",
      buyerUse:
        "Construa uma linha SKU de limpeza sem enxágue cobrindo formatos pessoais e institucionais para residências e distribuidores.",
      bundlePricing:
        "Cotação de kit de limpeza misto por pack de teste / 500 / 2000+ unidades. Melhor preço ao confirmar embalagem e etiquetas de idioma juntas.",
      oemSupport:
        "Etiqueta de logo, cartão de instruções, caixa privada, etiquetas de idioma e suporte de embalagem pronta para venda.",
      recommendedBadge: "Recomendado para higiene diária",
    },
    pl: {
      name: "Zestaw mycia bez spłukiwania",
      category: "Mycie",
      description:
        "Codzienny zestaw mycia do rutyn inkontynencji — zrównoważone pH, bez zapachu i bez alkoholu dla delikatnej, dojrzałej skóry.",
      buyerUse:
        "Zbuduj linię SKU mycia bez spłukiwania obejmującą formaty osobiste i instytucjonalne dla domów opieki i dystrybutorów.",
      bundlePricing:
        "Wycena mieszanego zestawu mycia wg zestawu próbnego / 500 / 2000+ sztuk. Najlepsza cena po potwierdzeniu opakowania i etykiet językowych łącznie.",
      oemSupport:
        "Etykieta logo, karta instrukcji, prywatny karton, etykiety językowe i wsparcie opakowania gotowego do sprzedaży.",
      recommendedBadge: "Polecane do codziennej higieny",
    },
  },
  "barrier-protection-kit": {
    de: {
      name: "Barriereschutz-Set",
      category: "Barriereschutz",
      description:
        "Ein Barriereschutz-Set zur DAI-Vorbeugung — tägliche Barrierecreme, Intensive-Reparaturcreme und filmbildendes Hautschutz-Spray.",
      buyerUse:
        "Bauen Sie eine SKU-Palette zum Barriereschutz auf, die tägliche Vorbeugung, Reparatur angegriffener Haut und langhaltendes Filmbild-Spray abdeckt.",
      bundlePricing:
        "Angebot für gemischtes Barriereschutz-Set nach Probe-Kit / 500 / 1000+ Einheiten. Bestpreis nach Bestätigung von Verpackung und Sprachetiketten zusammen.",
      oemSupport:
        "Logo-Etikett, Gebrauchsanleitung, privater Karton, Sprachetiketten und verpackungsfertige Einzelhandelsunterstützung.",
      recommendedBadge: "Empfohlen zur DAI-Vorbeugung",
    },
    es: {
      name: "Kit de protección de barrera",
      category: "Protección de barrera",
      description:
        "Un kit de protección de barrera para prevenir la DAI — crema barrera diaria, crema de reparación intensiva y spray protector de piel formador de película.",
      buyerUse:
        "Construya una gama SKU de protección de barrera que cubra prevención diaria, reparación de piel comprometida y spray filmógeno de larga duración.",
      bundlePricing:
        "Cotización de kit de barrera mixto por kit de prueba / 500 / 1000+ unidades. Mejor precio al confirmar embalaje y etiquetas de idioma juntos.",
      oemSupport:
        "Etiqueta de logo, tarjeta de instrucciones, caja privada, etiquetas de idioma y soporte de empaque listo para venta.",
      recommendedBadge: "Recomendado para prevención de DAI",
    },
    fr: {
      name: "Kit de protection barrière",
      category: "Protection barrière",
      description:
        "Un pack de protection barrière pour prévenir la DAI — crème barrière quotidienne, crème de réparation intensive et spray protecteur filmogène.",
      buyerUse:
        "Construisez une gamme SKU de protection barrière couvrant la prévention quotidienne, la réparation peau altérée et le spray filmogène longue durée.",
      bundlePricing:
        "Devis de kit barrière mixte par kit d'essai / 500 / 1000+ unités. Meilleur prix après confirmation ensemble de l'emballage et des étiquettes.",
      oemSupport:
        "Étiquette logo, fiche d'instructions, carton privé, étiquettes multilingues et support emballage prêt à vendre.",
      recommendedBadge: "Recommandé pour la prévention DAI",
    },
    pt: {
      name: "Kit de proteção de barreira",
      category: "Proteção de barreira",
      description:
        "Um kit de proteção de barreira para prevenir a DAUI — creme barreira diária, creme de reparação intensiva e spray protetor de pele formador de filme.",
      buyerUse:
        "Construa uma linha SKU de proteção de barreira que cubra prevenção diária, reparação de pele comprometida e spray filmogênico de longa duração.",
      bundlePricing:
        "Cotação de kit de barreira misto por kit de teste / 500 / 1000+ unidades. Melhor preço ao confirmar embalagem e etiquetas de idioma juntas.",
      oemSupport:
        "Etiqueta de logo, cartão de instruções, caixa privada, etiquetas de idioma e suporte de embalagem pronta para venda.",
      recommendedBadge: "Recomendado para prevenção de DAUI",
    },
    pl: {
      name: "Zestaw ochrony barierowej",
      category: "Ochrona barierowa",
      description:
        "Zestaw ochrony barierowej do zapobiegania IAD — codzienna krem barierowy, krem regeneracyjny i spray ochronny tworzący film.",
      buyerUse:
        "Zbuduj linię SKU ochrony barierowej obejmującą codzienną prewencję, regenerację uszkodzonej skóry i długotrwały spray filmogenny.",
      bundlePricing:
        "Wycena mieszanego zestawu barierowego wg zestawu próbnego / 500 / 1000+ sztuk. Najlepsza cena po potwierdzeniu opakowania i etykiet językowych łącznie.",
      oemSupport:
        "Etykieta logo, karta instrukcji, prywatny karton, etykiety językowe i wsparcie opakowania gotowego do sprzedaży.",
      recommendedBadge: "Polecane do prewencji IAD",
    },
  },
  "complete-skin-care-kit": {
    de: {
      name: "Komplettes Hautpflege-Set",
      category: "Komplette Pflegesets",
      description:
        "Ein komplettes Reinigen–Schützen–Pflegen-Set für Pflegeheime, betreutes Wohnen und Inkontinenz-Distributoren.",
      buyerUse:
        "Bauen Sie eine Inkontinenz-Hautpflege-SKU-Palette auf, die Reinigung ohne Ablauf, täglichen Barriereschutz und tragbares Hautschutz-Spray abdeckt.",
      bundlePricing:
        "Angebot für gemischtes Inkontinenz-Hautpflege-Set nach Probe-Kit / 500 / 1000+ Einheiten. Bestpreis nach Bestätigung von Verpackung und Sprachetiketten zusammen.",
      oemSupport:
        "Logo-Etikett, Gebrauchsanleitung, privater Karton, Sprachetiketten und verpackungsfertige Einzelhandelsunterstützung.",
      recommendedBadge: "Empfohlen für Pflegeheime",
    },
    es: {
      name: "Kit completo de cuidado de la piel",
      category: "Kits de cuidado completo",
      description:
        "Un kit completo de limpiar–proteger–hidratar para residencias, vida asistida y distribuidores de cuidado de incontinencia.",
      buyerUse:
        "Construya una línea SKU de cuidado de la piel por incontinencia que cubra limpieza sin aclarado, protección de barrera diaria y spray portable.",
      bundlePricing:
        "Cotización de kit de cuidado de la piel mixto por kit de prueba / 500 / 1000+ unidades. Mejor precio al confirmar embalaje y etiquetas de idioma juntos.",
      oemSupport:
        "Etiqueta de logo, tarjeta de instrucciones, caja privada, etiquetas de idioma y soporte de empaque listo para venta.",
      recommendedBadge: "Recomendado para residencias",
    },
    fr: {
      name: "Kit de soin complet de la peau",
      category: "Kits de soin complet",
      description:
        "Un pack complet nettoyer–protéger–hydrater pour maisons de retraite, logement accompagné et distributeurs de soins d'incontinence.",
      buyerUse:
        "Construisez une gamme SKU de soin de la peau pour incontinence couvrant le nettoyage sans rinçage, la protection barrière quotidienne et un spray portable.",
      bundlePricing:
        "Devis de kit de soin de la peau mixte par kit d'essai / 500 / 1000+ unités. Meilleur prix après confirmation ensemble de l'emballage et des étiquettes.",
      oemSupport:
        "Étiquette logo, fiche d'instructions, carton privé, étiquettes multilingues et support emballage prêt à vendre.",
      recommendedBadge: "Recommandé pour les maisons de retraite",
    },
    pt: {
      name: "Kit completo de cuidado da pele",
      category: "Kits de cuidado completo",
      description:
        "Um kit completo de limpar–proteger–hidratar para residências, vida assistida e distribuidores de cuidado de incontinência.",
      buyerUse:
        "Construa uma linha SKU de cuidado da pele para incontinência que cubra limpeza sem enxágue, proteção de barreira diária e spray portátil.",
      bundlePricing:
        "Cotação de kit de cuidado da pele misto por kit de teste / 500 / 1000+ unidades. Melhor preço ao confirmar embalagem e etiquetas de idioma juntas.",
      oemSupport:
        "Etiqueta de logo, cartão de instruções, caixa privada, etiquetas de idioma e suporte de embalagem pronta para venda.",
      recommendedBadge: "Recomendado para residências",
    },
    pl: {
      name: "Kompletny zestaw pielęgnacji skóry",
      category: "Kompletne zestawy pielęgnacyjne",
      description:
        "Kompletny zestaw czyścić–chronić–nawilżać dla domów opieki, mieszkań z opieką i dystrybutorów pielęgnacji inkontynencji.",
      buyerUse:
        "Zbuduj linię SKU pielęgnacji skóry przy inkontynencji obejmującą mycie bez spłukiwania, codzienną ochronę barierową i przenośny spray.",
      bundlePricing:
        "Wycena mieszanego zestawu pielęgnacji wg zestawu próbnego / 500 / 1000+ sztuk. Najlepsza cena po potwierdzeniu opakowania i etykiet językowych łącznie.",
      oemSupport:
        "Etykieta logo, karta instrukcji, prywatny karton, etykiety językowe i wsparcie opakowania gotowego do sprzedaży.",
      recommendedBadge: "Polecane dla domów opieki",
    },
  },
}

export function getLocalizedKit(kit: { slug: string; name: string; category: string; description: string; buyerUse: string; bundlePricing: string; oemSupport: string; recommendedBadge: string }, locale: Locale) {
  const t = procurementKitTranslations[kit.slug]?.[locale]
  return {
    ...kit,
    name: t?.name ?? kit.name,
    category: t?.category ?? kit.category,
    description: t?.description ?? kit.description,
    buyerUse: t?.buyerUse ?? kit.buyerUse,
    bundlePricing: t?.bundlePricing ?? kit.bundlePricing,
    oemSupport: t?.oemSupport ?? kit.oemSupport,
    recommendedBadge: t?.recommendedBadge ?? kit.recommendedBadge,
  }
}
