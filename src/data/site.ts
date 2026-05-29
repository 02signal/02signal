export const languages = ["et", "en", "ru"] as const;

export type Lang = (typeof languages)[number];

type Pair = [string, string];
type ProcessStatus = "first" | "accelerate" | "pause";

export type LandingCopy = {
  meta: {
    title: string;
    description: string;
    path: string;
  };
  nav: Pair[];
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: string;
    primaryHref?: string;
    secondary: string;
    secondaryHref?: string;
    proof: Pair[];
  };
  what: {
    kicker: string;
    title: string;
    lead: string;
    cards: Array<{ number: string; title: string; text: string }>;
  };
  formats: {
    kicker: string;
    title: string;
    lead: string;
    cards: Array<{
      label: string;
      title: string;
      text: string;
      items: string[];
      price: string;
      cta: string;
      href?: string;
    }>;
  };
  fit: {
    kicker: string;
    title: string;
    items: Pair[];
  };
  filter: {
    badge: string;
    title: string;
    copy: string;
  };
  audit: {
    kicker: string;
    title: string;
    lead: string;
    steps: Array<{ tag: string; title: string; text: string }>;
  };
  example: {
    kicker: string;
    title: string;
    lead: string;
    statuses: Record<ProcessStatus, string>;
    processes: Array<{ name: string; status: ProcessStatus }>;
    legend: string[];
  };
  scope: {
    kicker: string;
    title: string;
    includedTitle: string;
    notIncludedTitle: string;
    included: string[];
    notIncluded: string[];
  };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    emailCta: string;
  };
  form: {
    company: string;
    size: string;
    name: string;
    role: string;
    email: string;
    need: string;
    candidates: string;
    message: string;
    consent: string;
    submit: string;
    note: string;
    sizes: string[];
    needs: string[];
    candidateOptions: string[];
    mailSubject: string;
  };
};

export const copy: Record<Lang, LandingCopy> = {
  et: {
    meta: {
      title: "02Signal | AI automatiseerimine Eesti väikeettevõttele",
      description:
        "02Signal aitab Eesti mikro- ja väikeettevõttel valida esimese AI kasutuskoha, hinnata valmisolekut ja ehitada väikese AI abilise.",
      path: "/et/"
    },
    nav: [
      ["#what", "Mida teeme"],
      ["#formats", "Hinnad"],
      ["/et/kiirkontroll/", "Kiirkontroll"],
      ["/et/elluviimine/", "Ehitus"],
      ["#audit", "Kuidas käib"],
      ["#example", "Näide"],
      ["#contact", "Võta ühendust"]
    ],
    hero: {
      eyebrow: "Esimene mõistlik AI samm",
      title: "Aitame valida töö, mille AI saab päriselt lihtsamaks teha.",
      lead:
        "AI-ga ei pea alustama suure ja kalli projektiga. Vaatame teie korduvad tööd läbi ja ütleme selgelt, kust on kõige mõistlikum alustada.",
      primary: "Tee tasuta kiirkontroll",
      primaryHref: "/et/kiirkontroll/",
      secondary: "Vaata hindu",
      secondaryHref: "#formats",
      proof: [
        ["10 min", "tasuta kiirkontroll"],
        ["490 € + KM", "väikseim tasuline nõu"],
        ["al 1 900 €", "stardiplaan või ehitus"]
      ]
    },
    what: {
      kicker: "Mida 02Signal teeb",
      title: "Me aitame aru saada, kus AI annab päriselt kasu.",
      lead:
        "Kõige suurem viga on alustada kohast, kus tulemust ei ole näha. Siis kulub raha, inimesed väsivad ja usk AI-sse kaob. Me aitame valida väikese, praktilise ja mõõdetava alguse.",
      cards: [
        {
          number: "1",
          title: "Leiame ajaröövlid",
          text: "Vaatame, millised korduvad tööd võtavad inimestelt iga nädal kõige rohkem aega."
        },
        {
          number: "2",
          title: "Valime ohutu alguse",
          text: "Eelistame tööd, kus viga ei ole liiga kallis ja tulemust saab lihtsalt kontrollida."
        },
        {
          number: "3",
          title: "Alles siis ehitame",
          text: "Tööriistad tulevad hiljem. Kõigepealt peab olema selge, mida täpselt lihtsamaks teeme."
        }
      ]
    },
    formats: {
      kicker: "Neli selget järgmist sammu",
      title: "Tasuta kontroll, kindel nõu, stardiplaan või valmis AI abiline.",
      lead:
        "Valige samm selle järgi, kui selge teie olukord juba on. Kui te ei tea, kust alustada, alustage kiirkontrollist. Väikseim tasuline samm on 490 € + KM.",
      cards: [
        {
          label: "Kiire algus",
          title: "Tasuta AI kiirkontroll",
          text: "Sobib, kui soovite rahulikult aru saada, kas AI-ga on üldse mõtet praegu alustada.",
          items: ["20 lihtsat küsimust", "kokkuvõte e-mailile", "3-5 soovitatud järgmist sammu", "selge pilt, mis on juba olemas ja mis puudu"],
          price: "10 min · tasuta",
          cta: "Tee kiirkontroll",
          href: "/et/kiirkontroll/"
        },
        {
          label: "Kui tahate kindlat otsust",
          title: "AI alguse nõu",
          text: "Sobib, kui tahate omanikuna rahulikult aru saada, kas AI aitab teie ettevõttes päriselt või mitte.",
          items: [
            "90-min kohtumine omaniku või juhiga",
            "2-3 ajaröövli läbivaatamine",
            "üks soovitatud esimene töö või aus “praegu mitte”",
            "järgmise sammu hinnavahemik"
          ],
          price: "lihtsaim tasuline samm 490 € + KM",
          cta: "Räägime üle"
        },
        {
          label: "Kui kohti on mitu",
          title: "AI stardiplaan",
          text: "Sobib, kui ettevõttes on mitu võimalikku AI kasutuskohta ja tahate enne ehitamist valida ühe mõistliku alguse.",
          items: [
            "lihtne nimekiri korduvatest töödest",
            "üks soovitatud esimene AI kasutuskoht",
            "mida praegu mitte puutuda",
            "lihtne plaan: mida teha, mida vältida ja mis võiks maksta"
          ],
          price: "1 900-3 900 € + KM",
          cta: "Küsi stardiplaani"
        },
        {
          label: "Kui esimene töö on selge",
          title: "AI abivahendi ehitus",
          text: "Sobib, kui on üks korduv töö, mida inimene saab alguses kontrollida ja mille kasu saab mõõta.",
          items: [
            "väike töövoog või AI mustand",
            "inimese kontroll enne kasutamist",
            "testimine päris näidetega",
            "lihtne juhend ja üleandmine"
          ],
          price: "alates 3 900 € + KM",
          cta: "Vaata ehitust",
          href: "/et/elluviimine/"
        }
      ]
    },
    fit: {
      kicker: "Millal see sobib",
      title: "Põhiküsimus on lihtne: millist tööd tasub AI-ga esimesena lihtsamaks teha?",
      items: [
        ["Teil on mitu AI-ideed, aga ei tea, milline neist annab kõige kiiremini kasu.", "Sobib"],
        ["Inimesed teevad iga nädal palju käsitööd Excelis, e-mailis või chat'is.", "Sobib"],
        ["Tahate enne raha kulutamist aru saada, kas andmed ja töökorraldus on valmis.", "Sobib"],
        ["Te juba teate täpselt, mida ehitada, ja vajate ainult tehnilist tegijat.", "Pigem ehitusabi"],
        ["Soovite töötajatele AI kasutamise koolitust, mitte tööde muutmist.", "Pigem koolitus"],
        ["Ettevõte on väga väike ja kõik otsused on ainult omaniku peas.", "Alustame kõnest"]
      ]
    },
    filter: {
      badge: "Kõige tähtsam küsimus",
      title: "Kas me saame hiljem aru, kas AI aitas või mitte?",
      copy:
        "Hea esimene AI töö on selline, kus tulemust saab kontrollida: kas vastus oli õige, kas töö sai kiiremini tehtud, kas klient sai parema vastuse, kas vigu jäi vähemaks. Kui seda ei saa mõõta, ei tasu sealt alustada."
    },
    audit: {
      kicker: "Kuidas stardiplaan käib",
      title: "1-2 nädalaga valime esimese AI kasutuskoha.",
      lead:
        "Me ei tee pikka strateegiadokumenti. Räägime võtmeinimestega, vaatame korduvaid töid ja paneme lihtsas keeles kirja, mida teha, mida oodata ja mida praegu vältida.",
      steps: [
        {
          tag: "Samm 1",
          title: "Paneme korduvad tööd kirja",
          text:
            "Kogume kokku 15-20 tööd, mis võtavad aega: kliendivastused, aruanded, pakkumised, tellimused, graafikud, andmete kopeerimine."
        },
        {
          tag: "Samm 2",
          title: "Valime parimad alguskohad",
          text:
            "Vaatame iga töö puhul, kui tihti see kordub, kui palju aega kulub, kui suur on vea hind ja kas tulemust saab kontrollida."
        },
        {
          tag: "Samm 3",
          title: "Anname selge soovituse",
          text:
            "Lõpus on üks arutelu omaniku ja võtmeinimestega: mida teha esimesena, mida teha hiljem ja millest praegu eemale hoida."
        }
      ]
    },
    example: {
      kicker: "Näidislahendus",
      title: "Näide: sama ettevõtte sees ei sobi kõik tööd esimeseks AI sammuks.",
      lead:
        "Allpool on lihtne näide. Päris stardiplaanis oleks siin teie ettevõtte tööd ja iga töö juures lühike põhjendus.",
      statuses: {
        first: "sobib esimeseks",
        accelerate: "lihtne võit",
        pause: "praegu mitte"
      },
      processes: [
        { name: "Kliendiküsimustele vastamine", status: "first" },
        { name: "Kaubapuuduse märkamine", status: "first" },
        { name: "Kampaania teksti mustandid", status: "accelerate" },
        { name: "Lepingute lõplik kinnitamine", status: "pause" },
        { name: "Tootekirjelduste parandamine", status: "accelerate" },
        { name: "Probleemsete tellimuste sorteerimine", status: "first" },
        { name: "Aasta finantsprognoos", status: "pause" },
        { name: "Töögraafikute ettevalmistus", status: "accelerate" }
      ],
      legend: [
        "sobib esimeseks - kasu on näha ja tulemust saab kontrollida",
        "lihtne võit - saab teha väikese tööriistaga",
        "praegu mitte - liiga riskantne, ebaselge või andmed pole valmis"
      ]
    },
    scope: {
      kicker: "Mida saate",
      title: "Tulemuseks on praktiline otsus, mitte paks raport.",
      includedTitle: "Stardiplaan annab",
      notIncludedTitle: "Pärast saab eraldi ehitada",
      included: ["lihtne nimekiri töödest, mida tasub vaadata", "soovitus, mida teha esimesena", "selgitus, miks just see töö", "järgmiste sammude plaan"],
      notIncluded: ["täielik tehniline lahendus", "uue süsteemi valmis ehitamine", "andmeturbe reeglite kinnitamine", "pikk koolitusprogramm töötajatele"]
    },
    contact: {
      kicker: "Järgmine samm",
      title: "Räägime 30 minutiga läbi, kas see on teile mõistlik.",
      lead: "Kirjeldage paari sõnaga, milline töö praegu aega võtab. Kui põhjalikku plaani ei ole vaja, ütleme seda ausalt.",
      emailCta: "Kirjuta info@02signal.ai"
    },
    form: {
      company: "Ettevõte *",
      size: "Ettevõtte suurus *",
      name: "Nimi *",
      role: "Roll *",
      email: "Email *",
      need: "Mis teid huvitab? *",
      candidates: "Mitu korduvat tööd võiks AI-ga lihtsamaks teha? *",
      message: "Kirjeldage 1-2 lausega, milline töö praegu aega võtab *",
      consent: "Nõustun, et 02Signal kasutab neid andmeid minuga ühenduse võtmiseks.",
      submit: "Saada päring",
      note: "Vorm avab e-kirja teie meiliprogrammis. Vastame ühe tööpäeva jooksul.",
      sizes: ["1-5 inimest", "6-15 inimest", "16-50 inimest", "50+ inimest", "Ei tea"],
      needs: ["Tasuta kiirkontroll", "AI alguse nõu", "AI stardiplaan", "AI abivahendi ehitus", "Tahan lihtsalt nõu küsida"],
      candidateOptions: ["1", "2-3", "4-7", "Rohkem", "Ei tea"],
      mailSubject: "02Signal AI alguse päring"
    }
  },
  en: {
    meta: {
      title: "02Signal | Practical AI automation for small business",
      description:
        "02Signal helps small business owners choose the first practical AI use case, check readiness, and build a small AI assistant with human control.",
      path: "/en/"
    },
    nav: [
      ["#what", "What we do"],
      ["#formats", "Prices"],
      ["/et/kiirkontroll/", "Quick check"],
      ["/et/elluviimine/", "Build"],
      ["#audit", "How it works"],
      ["#example", "Example"],
      ["#contact", "Contact"]
    ],
    hero: {
      eyebrow: "First sensible AI step",
      title: "Choose the task where AI can make real work easier.",
      lead:
        "You do not need to start with a large AI programme. We review repeated work, choose a small controlled first step, and only then build the tool.",
      primary: "Start free quick check",
      primaryHref: "/et/kiirkontroll/",
      secondary: "See prices",
      secondaryHref: "#formats",
      proof: [
        ["10 min", "free quick check"],
        ["490 € + VAT", "smallest paid advice"],
        ["from 1 900 €", "start plan or build"]
      ]
    },
    what: {
      kicker: "What 02Signal does",
      title: "We help you see where AI can create practical value.",
      lead:
        "The biggest mistake is starting where the result cannot be seen. Money is spent, people get tired, and trust in AI drops. We help choose a small, practical, measurable beginning.",
      cards: [
        { number: "1", title: "Find time thieves", text: "We look for repeated work that takes time every week." },
        { number: "2", title: "Choose a safe start", text: "We prefer tasks where mistakes are not too expensive and a person can check the result." },
        { number: "3", title: "Build only after that", text: "Tools come later. First we must know exactly what should become easier." }
      ]
    },
    formats: {
      kicker: "Four clear next steps",
      title: "Free check, fixed advice, start plan, or a small AI assistant.",
      lead:
        "Choose the step based on how clear your situation already is. If you do not know where to start, start with the free quick check. The smallest paid step is 490 € + VAT.",
      cards: [
        {
          label: "Light entry",
          title: "Free AI quick check",
          text: "Use it when you want to understand whether it makes sense to start with AI now.",
          items: ["20 simple questions", "result on screen", "3-5 suggested next steps", "clear view of gaps"],
          price: "10 min · free",
          cta: "Start quick check",
          href: "/et/kiirkontroll/"
        },
        {
          label: "Smallest paid step",
          title: "AI start advice",
          text: "Use it when the owner wants a calm answer: can AI help here or not?",
          items: ["90-minute meeting", "2-3 time thieves reviewed", "one recommended first task or honest no", "next price range"],
          price: "490 € + VAT",
          cta: "Talk it through"
        },
        {
          label: "Several possible places",
          title: "AI start plan",
          text: "Use it when there are several possible AI use cases and you want to choose one sensible start before building.",
          items: ["review of repeated tasks", "one recommended first AI use case", "what not to touch now", "simple plan and budget range"],
          price: "1 900-3 900 € + VAT",
          cta: "Ask for start plan"
        },
        {
          label: "First task is clear",
          title: "Small AI assistant build",
          text: "Use it when one repeated task is clear, a person can check the result, and the benefit can be measured.",
          items: ["small workflow or AI draft", "human check before use", "testing on real examples", "simple handover"],
          price: "from 3 900 € + VAT",
          cta: "See build",
          href: "/et/elluviimine/"
        }
      ]
    },
    fit: {
      kicker: "When this fits",
      title: "The core question is simple: which task should AI make easier first?",
      items: [
        ["You have several AI ideas but do not know which gives the quickest useful result.", "Fits"],
        ["People spend time every week copying, answering, sorting, or preparing the same things.", "Fits"],
        ["You want to know whether data and work routines are ready before spending money.", "Fits"],
        ["You already know exactly what to build and only need technical delivery.", "Build help"],
        ["You want AI training for employees, not a change in repeated work.", "Training"],
        ["The company is very small and every decision is still only in the owner’s head.", "Start with a call"]
      ]
    },
    filter: {
      badge: "Most important question",
      title: "Can we later see whether AI helped or not?",
      copy:
        "A good first AI task is one where the result can be checked: was the answer correct, did the work get faster, did the customer get a better reply, did errors decrease. If this cannot be checked, do not start there."
    },
    audit: {
      kicker: "How the start plan works",
      title: "In 1-2 weeks we choose the first AI use case.",
      lead: "We do not write a long strategy document. We talk to key people, review repeated work, and write down in plain language what to do, what to expect, and what to avoid for now.",
      steps: [
        { tag: "Step 1", title: "List repeated tasks", text: "We collect 15-20 tasks that take time: customer replies, reports, offers, orders, schedules, copying data." },
        { tag: "Step 2", title: "Choose best starting points", text: "For each task we look at frequency, time spent, cost of error, and whether the result can be checked." },
        { tag: "Step 3", title: "Give a clear recommendation", text: "At the end there is one discussion: what to do first, what to do later, and what to avoid now." }
      ]
    },
    example: {
      kicker: "Example solution",
      title: "Example: not every task is a good first AI step.",
      lead:
        "This is a simple example. In a real start plan, these would be your company’s tasks with a short reason next to each one.",
      statuses: { first: "good first step", accelerate: "quick win", pause: "not now" },
      processes: [
        { name: "Customer inquiry replies", status: "first" },
        { name: "Inventory transfer decisions", status: "first" },
        { name: "Campaign content drafts", status: "accelerate" },
        { name: "Final contract approval", status: "pause" },
        { name: "Product description creation", status: "accelerate" },
        { name: "Order exception handling", status: "first" },
        { name: "Financial forecasting", status: "pause" },
        { name: "Store staff scheduling", status: "accelerate" }
      ],
      legend: ["good first step - value is visible and the result can be checked", "quick win - can be done with a small tool", "not now - too risky, unclear, or data is not ready"]
    },
    scope: {
      kicker: "What you get",
      title: "The result is a practical decision, not a thick report.",
      includedTitle: "The start plan gives",
      notIncludedTitle: "Build can come next",
      included: ["simple list of tasks worth looking at", "recommendation what to do first", "reason why this task", "next step plan"],
      notIncluded: ["complete technical solution", "building a new system", "approving data-security policies", "long employee training programme"]
    },
    contact: {
      kicker: "Next step",
      title: "In 30 minutes we can see which step is sensible.",
      lead: "Describe briefly what work takes time now. If a start plan or build is not needed, we will say that directly.",
      emailCta: "Email info@02signal.ai"
    },
    form: {
      company: "Company *",
      size: "Company size *",
      name: "Name *",
      role: "Role *",
      email: "Email *",
      need: "What are you interested in? *",
      candidates: "How many repeated tasks could AI make easier? *",
      message: "Describe in 1-2 sentences what work takes time now *",
      consent: "I agree that 02Signal may use this data to contact me.",
      submit: "Send request",
      note: "The form opens an email in your mail app. We reply within one business day.",
      sizes: ["1-5 people", "6-15 people", "16-50 people", "50+ people", "Not sure"],
      needs: ["Free quick check", "AI start advice", "AI start plan", "Small AI assistant build", "Just want to ask"],
      candidateOptions: ["1", "2-3", "4-7", "More", "Not sure"],
      mailSubject: "02Signal AI first step request"
    }
  },
  ru: {
    meta: {
      title: "02Signal | Практичная AI-автоматизация для малого бизнеса",
      description:
        "02Signal помогает владельцу малого бизнеса выбрать первый практичный сценарий AI, проверить готовность и построить небольшого AI-помощника с контролем человека.",
      path: "/ru/"
    },
    nav: [
      ["#what", "Что делаем"],
      ["#formats", "Цены"],
      ["/et/kiirkontroll/", "Проверка"],
      ["/et/elluviimine/", "Внедрение"],
      ["#audit", "Как идет"],
      ["#example", "Пример"],
      ["#contact", "Контакт"]
    ],
    hero: {
      eyebrow: "Первый разумный шаг с AI",
      title: "Помогаем выбрать работу, которую AI действительно может упростить.",
      lead:
        "Не нужно начинать с большого и дорогого AI-проекта. Мы смотрим повторяющиеся работы, выбираем маленький безопасный первый шаг и только потом строим инструмент.",
      primary: "Пройти бесплатную проверку",
      primaryHref: "/et/kiirkontroll/",
      secondary: "Посмотреть цены",
      secondaryHref: "#formats",
      proof: [
        ["10 минут", "бесплатная проверка"],
        ["490 € + KM", "самый малый платный шаг"],
        ["от 1 900 €", "стартовый план или внедрение"]
      ]
    },
    what: {
      kicker: "Что делает 02Signal",
      title: "Мы помогаем понять, где AI даст практическую пользу.",
      lead:
        "Самая дорогая ошибка — начать там, где результат не видно. Деньги потрачены, люди устали, доверие к AI падает. Мы помогаем выбрать маленькое, понятное и измеримое начало.",
      cards: [
        { number: "1", title: "Находим пожиратели времени", text: "Смотрим, какие повторяющиеся работы каждую неделю забирают время у людей." },
        { number: "2", title: "Выбираем безопасное начало", text: "Предпочитаем работу, где ошибка не слишком дорогая и человек может проверить результат." },
        { number: "3", title: "Только потом строим", text: "Инструменты идут после ясного ответа: что именно должно стать проще." }
      ]
    },
    formats: {
      kicker: "Четыре понятных шага",
      title: "Бесплатная проверка, короткая консультация, стартовый план или AI-помощник.",
      lead:
        "Выберите шаг по тому, насколько ситуация уже ясна. Если не знаете, с чего начать, начните с бесплатной проверки. Самый малый платный шаг — 490 € + KM.",
      cards: [
        {
          label: "Легкий вход",
          title: "Бесплатная AI-проверка",
          text: "Подходит, если нужно спокойно понять, есть ли смысл начинать с AI прямо сейчас.",
          items: ["20 простых вопросов", "результат на экране", "3-5 следующих шагов", "понятная карта пробелов"],
          price: "10 минут · бесплатно",
          cta: "Пройти проверку",
          href: "/et/kiirkontroll/"
        },
        {
          label: "Самый малый платный шаг",
          title: "AI-консультация для старта",
          text: "Подходит, если владелец хочет спокойный ответ: AI здесь реально поможет или нет.",
          items: ["90-минутная встреча", "разбор 2-3 пожирателей времени", "одна первая работа или честное “пока не надо”", "диапазон цены следующего шага"],
          price: "490 € + KM",
          cta: "Обсудить"
        },
        {
          label: "Есть несколько вариантов",
          title: "AI-стартовый план",
          text: "Подходит, если есть несколько возможных AI-сценариев и нужно выбрать одно разумное начало до внедрения.",
          items: ["обзор повторяющихся работ", "один рекомендуемый первый AI-сценарий", "что пока не трогать", "простой план и диапазон бюджета"],
          price: "1 900-3 900 € + KM",
          cta: "Запросить план"
        },
        {
          label: "Первая работа уже ясна",
          title: "Небольшой AI-помощник",
          text: "Подходит, если есть одна повторяющаяся работа, человек может проверить результат и пользу можно измерить.",
          items: ["маленький workflow или AI-черновик", "контроль человека перед использованием", "тест на реальных примерах", "простая передача"],
          price: "от 3 900 € + KM",
          cta: "Посмотреть внедрение",
          href: "/et/elluviimine/"
        }
      ]
    },
    fit: {
      kicker: "Когда это подходит",
      title: "Главный вопрос простой: какую работу AI должен упростить первой?",
      items: [
        ["Есть несколько AI-идей, но непонятно, что даст самый быстрый полезный результат.", "Подходит"],
        ["Люди каждую неделю много копируют, отвечают, сортируют или готовят одно и то же.", "Подходит"],
        ["Перед затратами нужно понять, готовы ли данные и порядок работы.", "Подходит"],
        ["Вы уже точно знаете, что строить, и нужен только технический исполнитель.", "Внедрение"],
        ["Нужно обучение сотрудников AI, а не изменение повторяющейся работы.", "Обучение"],
        ["Компания очень маленькая, и все решения пока только в голове владельца.", "Начать со звонка"]
      ]
    },
    filter: {
      badge: "Главный фильтр",
      title: "Сможем ли мы потом понять, помог AI или нет?",
      copy:
        "Хорошая первая AI-работа — такая, где результат можно проверить: ответ был правильный, работа стала быстрее, клиент получил лучший ответ, ошибок стало меньше. Если это нельзя проверить, начинать там не стоит."
    },
    audit: {
      kicker: "Как делается стартовый план",
      title: "За 1-2 недели выбираем первый AI-сценарий.",
      lead: "Мы не пишем длинную стратегию. Говорим с ключевыми людьми, смотрим повторяющиеся работы и простым языком фиксируем: что делать, чего ожидать и чего пока избегать.",
      steps: [
        { tag: "Шаг 1", title: "Записываем повторяющиеся работы", text: "Собираем 15-20 работ, которые забирают время: ответы клиентам, отчеты, предложения, заказы, графики, перенос данных." },
        { tag: "Шаг 2", title: "Выбираем лучшие места для старта", text: "Смотрим частоту, затраты времени, цену ошибки и возможность проверить результат." },
        { tag: "Шаг 3", title: "Даем ясную рекомендацию", text: "В конце одна встреча: что делать первым, что делать позже и чего сейчас не трогать." }
      ]
    },
    example: {
      kicker: "Пример решения",
      title: "Пример: не каждая работа подходит как первый AI-шаг.",
      lead:
        "Это простой пример. В реальном стартовом плане здесь будут работы вашей компании и короткое объяснение рядом с каждой.",
      statuses: { first: "хороший первый шаг", accelerate: "быстрая польза", pause: "пока не надо" },
      processes: [
        { name: "Ответы на обращения клиентов", status: "first" },
        { name: "Решения по перемещению запасов", status: "first" },
        { name: "Черновики кампаний", status: "accelerate" },
        { name: "Финальное согласование договоров", status: "pause" },
        { name: "Создание описаний товаров", status: "accelerate" },
        { name: "Обработка исключений в заказах", status: "first" },
        { name: "Финансовый прогноз", status: "pause" },
        { name: "Графики персонала магазинов", status: "accelerate" }
      ],
      legend: ["хороший первый шаг - польза видна и результат можно проверить", "быстрая польза - можно сделать маленьким инструментом", "пока не надо - слишком рискованно, неясно или данные не готовы"]
    },
    scope: {
      kicker: "Что вы получите",
      title: "Результат — практическое решение, не толстый отчет.",
      includedTitle: "Стартовый план дает",
      notIncludedTitle: "Внедрение можно сделать отдельно",
      included: ["простой список работ, которые стоит рассмотреть", "рекомендацию, что делать первым", "объяснение, почему именно эта работа", "план следующих шагов"],
      notIncluded: ["полное техническое решение", "создание новой системы", "утверждение правил безопасности данных", "длинная программа обучения сотрудников"]
    },
    contact: {
      kicker: "Следующий шаг",
      title: "За 30 минут поймем, какой шаг сейчас разумен.",
      lead: "Коротко опишите, какая работа сейчас забирает время. Если стартовый план или внедрение не нужны, мы скажем это прямо.",
      emailCta: "Написать info@02signal.ai"
    },
    form: {
      company: "Компания *",
      size: "Размер компании *",
      name: "Имя *",
      role: "Должность *",
      email: "Email *",
      need: "Что вас интересует? *",
      candidates: "Сколько повторяющихся работ AI мог бы упростить? *",
      message: "Опишите 1-2 предложениями, какая работа сейчас забирает время *",
      consent: "Согласен, что 02Signal использует эти данные, чтобы связаться со мной.",
      submit: "Отправить заявку",
      note: "Форма откроет письмо в вашей почтовой программе. Ответим в течение одного рабочего дня.",
      sizes: ["1-5 человек", "6-15 человек", "16-50 человек", "50+ человек", "Не знаю"],
      needs: ["Бесплатная проверка", "AI-консультация для старта", "AI-стартовый план", "Небольшой AI-помощник", "Хочу просто спросить"],
      candidateOptions: ["1", "2-3", "4-7", "Больше", "Не знаю"],
      mailSubject: "02Signal: первый шаг с AI"
    }
  }
};

export const langLabels: Record<Lang, string> = {
  et: "ET",
  en: "EN",
  ru: "RU"
};

export function alternateLinks(currentLang: Lang) {
  return languages.map((lang) => ({
    lang,
    label: langLabels[lang],
    href: copy[lang].meta.path,
    current: currentLang === lang
  }));
}
