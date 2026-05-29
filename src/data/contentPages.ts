export type GuidePage = {
  slug: string;
  path: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  title: string;
  lead: string;
  shortAnswer: string[];
  goodFor: string[];
  notFor: string[];
  steps: Array<{ title: string; text: string }>;
  examples: string[];
  nextStep: {
    title: string;
    text: string;
    primary: string;
    primaryHref: string;
    secondary?: string;
    secondaryHref?: string;
  };
};

export const guidePages: Record<string, GuidePage> = {
  aiAutomation: {
    slug: "ai-automatiseerimine-vaikeettevottele",
    path: "/et/ai-automatiseerimine-vaikeettevottele/",
    metaTitle: "AI automatiseerimine väikeettevõttele | 02Signal",
    description:
      "Lihtne selgitus, kuidas Eesti väikeettevõte saab AI automatiseerimisega alustada ühest korduvast tööst ja inimese kontrolliga.",
    eyebrow: "AI automatiseerimine väikeettevõttele",
    title: "AI automatiseerimine algab ühest korduvast tööst.",
    lead:
      "Kõige kindlam algus ei ole suur AI projekt. Kõige kindlam algus on üks töö, mida tehakse iga nädal mitu korda ja mille tulemust saab inimene üle vaadata.",
    shortAnswer: [
      "AI ei pea esimeses sammus ise otsustama.",
      "AI võib koostada vastuse, kokkuvõtte, pakkumise mustandi või sorteerida infot.",
      "Inimene kontrollib tulemuse enne, kui see läheb kliendile või töövoogu."
    ],
    goodFor: [
      "kui inimesed kopeerivad infot ühest kohast teise",
      "kui samadele küsimustele vastatakse iga nädal uuesti",
      "kui aruanded, pakkumised või kokkuvõtted võtavad liiga palju aega",
      "kui omanik tahab enne raha kulutamist näha väikest praktilist võitu"
    ],
    notFor: [
      "kui vajalik info on ainult inimeste peas",
      "kui keegi ei saa AI tulemust kontrollida",
      "kui viga oleks kohe väga kallis või ohtlik",
      "kui eesmärk on korraga kogu ettevõte ümber teha"
    ],
    steps: [
      {
        title: "Valime ühe töö",
        text: "Paneme kirja, milline korduv töö võtab aega ja kui tihti seda tehakse."
      },
      {
        title: "Kontrollime infot",
        text: "Vaatame, kas vajalik info on leitav: e-mailis, Excelis, CRM-is, kaustas või veebis."
      },
      {
        title: "Teeme väikese abilise",
        text: "AI teeb mustandi või kokkuvõtte. Inimene vaatab üle ja otsustab, kas seda võib kasutada."
      }
    ],
    examples: [
      "kliendikirjale vastuse mustandi koostamine",
      "pakkumise esimese versiooni koostamine",
      "tellimuste või päringute sorteerimine",
      "nädalaraporti kokkuvõtte tegemine"
    ],
    nextStep: {
      title: "Kui te ei tea, kust alustada, alustage kiirkontrollist.",
      text: "10 minutit annab pildi, kas teie ettevõttes on mõistlik AI-ga kohe edasi minna.",
      primary: "Tee tasuta kiirkontroll",
      primaryHref: "/et/kiirkontroll/",
      secondary: "Vaata hindu",
      secondaryHref: "/et/#formats"
    }
  },
  n8nAutomation: {
    slug: "n8n-automatiseerimine",
    path: "/et/n8n-automatiseerimine/",
    metaTitle: "n8n automatiseerimine väikeettevõttele | 02Signal",
    description:
      "Mis on n8n automatiseerimine lihtsas keeles: vormid, e-mailid, tabelid, Telegram ja AI liiguvad ühes töövoos.",
    eyebrow: "n8n automatiseerimine",
    title: "n8n paneb info liikuma ilma käsitsi kopeerimiseta.",
    lead:
      "n8n on töövoo ühendaja. See võib võtta info vormist, e-mailist või tabelist, saata selle AI-le, panna tulemuse tabelisse ja teavitada õiget inimest.",
    shortAnswer: [
      "n8n ei ole raamatupidamisprogramm ega CRM.",
      "n8n ühendab olemasolevad tööriistad lihtsaks töövooks.",
      "Hea esimene töövoog säästab aega, aga jätab inimese kontrolli alles."
    ],
    goodFor: [
      "kui sama info liigub iga päev e-maili, tabeli ja chat'i vahel",
      "kui keegi peab käsitsi teavitusi saatma",
      "kui päringud tuleb sorteerida või kokku võtta",
      "kui tahate väikest lahendust enne suure süsteemi ostmist"
    ],
    notFor: [
      "kui protsess ise on veel segane",
      "kui andmetele ligipääs puudub",
      "kui iga juhtum on täiesti erinev",
      "kui ootate, et töövoog parandab halva töökorralduse ise ära"
    ],
    steps: [
      {
        title: "Sisend",
        text: "Info tuleb vormist, e-mailist, tabelist või muust süsteemist."
      },
      {
        title: "Töötlus",
        text: "n8n saadab info õigesse kohta, küsib vajadusel AI-lt mustandi ja paneb tulemuse kirja."
      },
      {
        title: "Teavitus",
        text: "Õige inimene saab teate e-maili, Telegrami või muusse kanalisse."
      }
    ],
    examples: [
      "veebivormi päring liigub tabelisse ja omanik saab teate",
      "AI teeb kliendikirja mustandi ja töötaja kinnitab",
      "iga hommik tuleb kokkuvõte eelmise päeva päringutest",
      "pakkumise taotlus liigub õigesse kausta ja vastutajale"
    ],
    nextStep: {
      title: "n8n on mõistlik siis, kui esimene töö on selge.",
      text: "Kui töö ei ole veel valitud, aitab enne tasuta kiirkontroll või 90-minutiline AI alguse nõu.",
      primary: "Vaata AI abivahendi ehitust",
      primaryHref: "/et/elluviimine/",
      secondary: "Tee kiirkontroll",
      secondaryHref: "/et/kiirkontroll/"
    }
  },
  customerService: {
    slug: "ai-abiline-klienditeeninduses",
    path: "/et/ai-abiline-klienditeeninduses/",
    metaTitle: "AI abiline klienditeeninduses | 02Signal",
    description:
      "Kuidas AI abiline saab väikeettevõtte klienditeeninduses koostada vastuse mustandeid, leida infot ja hoida inimese kontrolli alles.",
    eyebrow: "AI abiline klienditeeninduses",
    title: "AI võib kliendiküsimustele vastuse mustandi valmis teha.",
    lead:
      "Kui samad küsimused korduvad, ei pea inimene alustama iga kord tühjalt lehelt. AI saab leida info ja koostada mustandi. Inimene kinnitab.",
    shortAnswer: [
      "AI ei pea kliendile ise vastama.",
      "AI võib teha esimese mustandi, mida töötaja parandab.",
      "Kõige parem algus on korduvad küsimused, millele on olemas head vastused."
    ],
    goodFor: [
      "kui samad kliendiküsimused korduvad iga nädal",
      "kui vastused on olemas, aga neid peab mitmest kohast otsima",
      "kui vastamine venib, sest töötaja alustab iga kord nullist",
      "kui omanik tahab kiiremini vastata, aga mitte kvaliteeti kaotada"
    ],
    notFor: [
      "kui küsimused on väga tundlikud või juriidilised",
      "kui ettevõttel pole häid näidisvastuseid",
      "kui keegi ei kontrolli mustandeid enne saatmist",
      "kui AI peaks kohe kliendiga iseseisvalt suhtlema"
    ],
    steps: [
      {
        title: "Kogume korduvad küsimused",
        text: "Valime 20-50 tüüpilist küsimust ja head vastused, mida AI võib kasutada."
      },
      {
        title: "Teeme vastuse mustandi",
        text: "AI kasutab olemasolevat infot ja koostab vastuse, mida inimene saab muuta."
      },
      {
        title: "Mõõdame lihtsat kasu",
        text: "Vaatame, kas vastamise aeg lühenes ja kas parandusi oli vähem."
      }
    ],
    examples: [
      "lahtioleku, tarne ja tingimuste küsimused",
      "teenuse sobivuse esmased küsimused",
      "päringu lühikokkuvõte müügile või omanikule",
      "keerulise küsimuse suunamine õigesse kohta"
    ],
    nextStep: {
      title: "Kui kliendiküsimusi tuleb palju, on see tihti hea esimene AI töö.",
      text: "Alustada saab väikese abilisega, kus inimene kinnitab iga vastuse.",
      primary: "Küsi pakkumist",
      primaryHref: "mailto:info@02signal.ai?subject=AI%20abiline%20klienditeeninduses",
      secondary: "Tee kiirkontroll",
      secondaryHref: "/et/kiirkontroll/"
    }
  },
  offers: {
    slug: "ai-abiline-pakkumiste-koostamisel",
    path: "/et/ai-abiline-pakkumiste-koostamisel/",
    metaTitle: "AI abiline pakkumiste koostamisel | 02Signal",
    description:
      "Kuidas AI saab aidata pakkumiste koostamisel: esimene mustand, kliendiinfo kokkuvõte ja inimese kontroll enne saatmist.",
    eyebrow: "AI abiline pakkumiste koostamisel",
    title: "AI võib koostada pakkumise esimese mustandi.",
    lead:
      "Pakkumist ei tasu lasta AI-l üksi saata. Küll aga saab AI koguda lähteinfo, kasutada varasemaid näiteid ja teha esimese mustandi, mida müügiinimene või omanik kontrollib.",
    shortAnswer: [
      "AI aitab alustada, mitte ei võta lõplikku vastutust.",
      "Hind, lubadused ja eritingimused jäävad inimese kontrolli.",
      "Kasu tuleb siis, kui pakkumisi tehakse tihti ja varasemad näited on olemas."
    ],
    goodFor: [
      "kui pakkumise koostamine võtab iga kord liiga kaua",
      "kui varasemad pakkumised on head, aga neid on tüütu otsida",
      "kui kliendiinfo tuleb e-mailist, vormist või CRM-ist",
      "kui omanik tahab ühtlasemat kvaliteeti"
    ],
    notFor: [
      "kui iga pakkumine on täiesti ainulaadne",
      "kui hinnastuse reeglid pole paigas",
      "kui puuduvad head varasemad näited",
      "kui AI peaks hinna ja lubadused ise otsustama"
    ],
    steps: [
      {
        title: "Paneme näited kokku",
        text: "Valime head varasemad pakkumised ja lihtsad reeglid, mida pakkumises peab arvestama."
      },
      {
        title: "Loome mustandi",
        text: "AI koostab esimese versiooni kliendiinfo, hinnakirja ja näidete põhjal."
      },
      {
        title: "Inimene kinnitab",
        text: "Omanik või müügiinimene vaatab hinna, lubadused ja tähtajad üle enne saatmist."
      }
    ],
    examples: [
      "teenuse pakkumise esimene versioon",
      "kliendi vajaduse kokkuvõte enne pakkumist",
      "pakkumise saatmise e-kirja mustand",
      "puuduvate andmete küsimine kliendilt"
    ],
    nextStep: {
      title: "Kui pakkumisi tehakse iga nädal, on see hea kandidaat väikese AI abilise jaoks.",
      text: "Kõigepealt tasub üle vaadata näited, hinnastuse reeglid ja inimese kontrollikoht.",
      primary: "Räägime pakkumistest",
      primaryHref: "mailto:info@02signal.ai?subject=AI%20abiline%20pakkumiste%20koostamisel",
      secondary: "Vaata ehitust",
      secondaryHref: "/et/elluviimine/"
    }
  },
  examples: {
    slug: "naited",
    path: "/et/naited/",
    metaTitle: "AI automatiseerimise näited väikeettevõttele | 02Signal",
    description:
      "Lihtsad AI automatiseerimise näited Eesti väikeettevõttele: kliendivastused, pakkumised, päringute sorteerimine ja kokkuvõtted.",
    eyebrow: "Näited",
    title: "Kolm väikest AI näidet, millest on lihtne aru saada.",
    lead:
      "Need on näidisjuhtumid, mitte lubadus igale ettevõttele. Mõte on näidata, milline võiks olla väike ja ohutu esimene samm.",
    shortAnswer: [
      "AI teeb mustandi või kokkuvõtte.",
      "Inimene kontrollib enne kasutamist.",
      "Kasu mõõdetakse ajas, vigades või vastamise kiiruses."
    ],
    goodFor: [
      "omanikule, kes tahab näha praktilisi kasutuskohti",
      "väikesele tiimile, kus korduvad tööd võtavad aega",
      "ettevõttele, kes ei taha alustada suure IT projektiga",
      "juhile, kes tahab enne ehitamist riski vähendada"
    ],
    notFor: [
      "kui otsitakse valmis universaalset toodet igale ettevõttele",
      "kui esimene töö pole veel valitud",
      "kui inimene ei saa tulemust kontrollida",
      "kui oodatakse, et AI parandab puuduvad andmed ise ära"
    ],
    steps: [
      {
        title: "Kliendivastuse mustand",
        text: "Klient küsib korduva küsimuse. AI leiab info ja teeb vastuse. Töötaja vaatab üle."
      },
      {
        title: "Pakkumise mustand",
        text: "Päringust tehakse kokkuvõte. AI koostab pakkumise esimese versiooni varasemate näidete põhjal."
      },
      {
        title: "Päringute sorteerimine",
        text: "Uued päringud liiguvad tabelisse. AI märgib teema, kiireloomulisuse ja soovitatud järgmise sammu."
      }
    ],
    examples: [
      "klienditeenindus vastab kiiremini",
      "müük alustab pakkumist valmis mustandist",
      "omanik näeb hommikul lühikokkuvõtet",
      "töötajad ei kopeeri sama infot mitu korda"
    ],
    nextStep: {
      title: "Kui üks näide tundub tuttav, saab selle järgi esimese töö valida.",
      text: "Kiirkontroll aitab aru saada, kas teie info ja töökorraldus on selleks valmis.",
      primary: "Tee tasuta kiirkontroll",
      primaryHref: "/et/kiirkontroll/",
      secondary: "Vaata AI abivahendi ehitust",
      secondaryHref: "/et/elluviimine/"
    }
  }
};

export const faqItems = [
  {
    question: "Kas AI hakkab meie eest ise otsustama?",
    answer:
      "Esimeses sammus mitte. Meie soovitus on alustada nii, et AI teeb mustandi, kokkuvõtte või soovituse ning inimene kinnitab tulemuse."
  },
  {
    question: "Kui palju kõige lihtsam algus maksab?",
    answer:
      "Tasuta kiirkontroll on 0 eurot. Väikseim tasuline samm on AI alguse nõu hinnaga 490 eurot + KM. Väikese AI abilise ehitus algab tavaliselt 3 900 eurost + KM."
  },
  {
    question: "Kui kaua esimene väike AI abiline aega võtab?",
    answer:
      "Lihtne töövoog võtab tavaliselt 2-3 nädalat. Kui seotud on mitu inimest või süsteemi, on realistlikum 3-8 nädalat."
  },
  {
    question: "Kas meil peab olema oma IT inimene?",
    answer:
      "Mikroettevõttes ei pea. Küll aga peab olema üks vastutaja, kes tunneb tööd ja saab tulemusi kontrollida."
  },
  {
    question: "Kas meie andmed on turvalised?",
    answer:
      "Esimeses sammus ei pea tundlikke andmeid AI-le andma. Saame alustada näidetest, avalikust infost või piiratud andmetest. Täpsed piirid lepime enne ehitamist kokku."
  },
  {
    question: "Mis siis, kui AI eksib?",
    answer:
      "Sellepärast alustame inimese kontrolliga. AI ei saada ega kinnita alguses midagi üksi. Vigadest õpime, parandame juhiseid ja otsustame, kas tasub jätkata."
  },
  {
    question: "Kas see sobib väga väikesele ettevõttele?",
    answer:
      "Jah, kui on korduv töö, mis võtab aega. Väga väikeses ettevõttes on tihti mõistlik alustada kiirkontrollist või 90-minutilisest nõust."
  },
  {
    question: "Mis on kõige mõistlikum esimene samm?",
    answer:
      "Kui te ei tea, kust alustada, tehke tasuta kiirkontroll. Kui teil on juba 2-3 võimalikku ajaröövlit teada, sobib AI alguse nõu."
  }
];

export const contentLinks = [
  { href: "/et/ai-automatiseerimine-vaikeettevottele/", label: "AI automatiseerimine väikeettevõttele" },
  { href: "/et/n8n-automatiseerimine/", label: "n8n automatiseerimine" },
  { href: "/et/ai-abiline-klienditeeninduses/", label: "AI abiline klienditeeninduses" },
  { href: "/et/ai-abiline-pakkumiste-koostamisel/", label: "AI abiline pakkumiste koostamisel" },
  { href: "/et/naited/", label: "Näited" },
  { href: "/et/kkk/", label: "KKK" }
];
