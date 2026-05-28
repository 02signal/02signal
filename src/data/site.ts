export const languages = ["et", "en", "ru"] as const;

export type Lang = (typeof languages)[number];

type Pair = [string, string];
type ProcessStatus = "flywheel" | "accelerate" | "pause";

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
    secondary: string;
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
      title: "02Signal | AI-piloodi protsessiaudit",
      description:
        "02Signal aitab valida esimese AI-piloodi protsessi, disainida mõõdetava automatiseerimise ja valmistada otsuse ette juhtkonnale.",
      path: "/et/"
    },
    nav: [
      ["#what", "Mida teeme"],
      ["#formats", "Formaadi"],
      ["#audit", "Audit"],
      ["#example", "Näide"],
      ["#contact", "Kontakt"]
    ],
    hero: {
      eyebrow: "AI-piloodi protsessiaudit",
      title: "Vali esimene AI-piloot protsessist, kus võit on mõõdetav.",
      lead:
        "02Signal aitab juhtidel leida protsessi, millel on tagasisideahel, äriline mõju ja valmis meeskond. Alles siis ehitame n8n, RAG-i või bot'i.",
      primary: "Broneeri 30-min kõne",
      secondary: "Vaata formaate",
      proof: [
        ["10 min", "tasuta enesediagnostika"],
        ["1-2 nädalat", "protsessiaudit juhtkonnale"],
        ["15-20 protsessi", "kaardistatud ja prioriseeritud"]
      ]
    },
    what: {
      kicker: "Mida 02Signal teeb",
      title: "Me ei müü “AI projekti”. Me aitame valida õige esimese protsessi.",
      lead:
        "Vale stardiprotsess on varase AI-muutuse kõige kallim viga: piloot venib, ROI ei teki ja usaldus kaob. Õige protsess loob väikese mõõdetava hooratta.",
      cards: [
        {
          number: "1",
          title: "Leiame sobiva protsessi",
          text: "Kaardistame korduvad otsused, andmeallikad, tagasisideahela ja vea hinna."
        },
        {
          number: "2",
          title: "Disainime piloodi",
          text: "Määrame teadmuse, autonoomia taseme, otsuselogi, kvaliteedikontrolli ja mõõdikud."
        },
        {
          number: "3",
          title: "Ehitus alles pärast valikut",
          text: "n8n, Telegram, Google Sheets või RAG tulevad mängu siis, kui protsessi loogika on selge."
        }
      ]
    },
    formats: {
      kicker: "Kaks abiformaati",
      title: "Alusta kergelt või telli otsustamiseks audit.",
      lead:
        "Võid alustada 10-minutilise enesediagnostikaga. Kui ettevõttes on mitu AI-ideed ja vaja on juhtkonna otsust, sobib protsessiaudit.",
      cards: [
        {
          label: "Kerge sisenemine",
          title: "AI küpsuse enesediagnostika",
          text: "Sobib, kui soovite kiiresti aru saada, kas ettevõte on AI-piloodiks valmis.",
          items: ["20 küsimust viies mõõtmes", "PDF-kokkuvõte e-mailile", "3-5 järgmist sammu", "Puudujääkide kaart"],
          price: "10 min · tasuta",
          cta: "Alusta enesediagnostikat"
        },
        {
          label: "Juhtkonna otsus",
          title: "Protsessiaudit",
          text: "Sobib, kui ettevõttes on 3-7 AI-kandidaatprotsessi ja vaja on valida esimene või kaks pilooti.",
          items: [
            "15-20 protsessi kaart",
            "1-2 finalisti AI-hooratta spetsifikatsioon",
            "6-12 kuu teekaart",
            "60-min kaitsmine top-tiimile"
          ],
          price: "1-2 nädalat · hind pärast skoopimist",
          cta: "Telli audit"
        }
      ]
    },
    fit: {
      kicker: "Millal audit sobib",
      title: "Audit lahendab ühe konkreetse küsimuse: millisest protsessist alustada?",
      items: [
        ["Ettevõttes on 3-7 AI-ideed või protsessi, aga prioriteet puudub.", "Audit"],
        ["Juhtkond vajab eelarveks selget põhjendust ja Go/No-Go kriteeriume.", "Audit"],
        ["Kolmel juhil on kolm erinevat AI-ideed ja ühine otsustusraam puudub.", "Audit"],
        ["Protsess on juba valitud ja tiim tahab kohe prototüübi ehitada.", "Workshop"],
        ["Protsess on valitud, aga sisemist ehitustiimi ei ole.", "Juurutus"],
        ["Ettevõttes on alla 50-100 inimese ja protsessid on veel väga omaniku peas.", "Enesediagnostika või kõne"]
      ]
    },
    filter: {
      badge: "Peamine filter",
      title: "Ilma tagasisideahelata AI-hooratas ei käivitu.",
      copy:
        "Esimene piloot peab olema protsess, kus on võimalik kontrollida, kas AI otsus oli õige. Kui sellist protsessi ei leidu, on auditi tulemus sama väärtuslik: säästate eelarve piloodilt, mis ei saa õppida."
    },
    audit: {
      kicker: "Kuidas audit käib",
      title: "1-2 nädalat päris protsesside, intervjuude ja andmete põhjal.",
      lead:
        "Töö ei ole ideekorje. Kontrollime protsesse nelja tunnuse järgi: korduvus, tagasisideahel, vea hind ja meeskonna valmisolek.",
      steps: [
        {
          tag: "Nädal 1",
          title: "Protsessikaart ja märgistus",
          text:
            "Koondame 15-20 protsessi. Iga protsess saab staatuse: AI-hooratas, AI-kiirendus ilma ümberdisainita või mitte puutuda."
        },
        {
          tag: "Nädal 2",
          title: "Hooratta disain finalistidele",
          text:
            "Kirjeldame teadmuse, autonoomia taseme, otsuselogi, kvaliteedikontrolli ja mõõdikud 1-2 võtmeprotsessi jaoks."
        },
        {
          tag: "Finaal",
          title: "60-min otsustamise sessioon",
          text:
            "Läbime tulemused CEO/COO ja protsessiomanikega ning lepime kokku piloodi, eelarveraami ja Go/No-Go punktid."
        }
      ]
    },
    example: {
      kicker: "Näidislahendus",
      title: "UrbanStyle: protsessikaart, mis eraldab AI-hooratta lihtsast automatiseerimisest.",
      lead:
        "See on placeholder näide 02Signal simulatsioonist. Päris auditis on siin teie ettevõtte 15-20 protsessi ja iga staatuse lühike põhjendus.",
      statuses: {
        flywheel: "AI-hooratas",
        accelerate: "AI-kiirendus",
        pause: "mitte puutuda"
      },
      processes: [
        { name: "Kliendipäringute vastused", status: "flywheel" },
        { name: "Varude ümbertõstmise otsused", status: "flywheel" },
        { name: "Kampaaniate sisukavandid", status: "accelerate" },
        { name: "Lepingute lõplik kinnitamine", status: "pause" },
        { name: "Tootekirjelduste loomine", status: "accelerate" },
        { name: "Tellimuste erandite käsitlus", status: "flywheel" },
        { name: "Finantsprognoos", status: "pause" },
        { name: "Poe personali graafikud", status: "accelerate" }
      ],
      legend: [
        "AI-hooratas - startida lähimas kvartalis",
        "AI-kiirendus - kasuta valmis töövoogu",
        "mitte puutuda - risk, andmed või tagasiside ei sobi"
      ]
    },
    scope: {
      kicker: "Mis auditisse ei mahu",
      title: "Audit on valiku ja piloodidisaini töö, mitte täisjuurutus.",
      includedTitle: "Audit annab otsuse aluse",
      notIncludedTitle: "Juurutuse töö tuleb pärast",
      included: ["prioriseeritud protsessikaart", "piloodi tööspetsifikatsioon", "mõõdikud ja kvaliteedikontroll", "juhtkonna otsustussessioon"],
      notIncluded: ["täielik n8n tootmisworkflow", "andmeturbe poliitika kinnitamine", "autotestide pipeline", "champion-võrgustiku koolitus"]
    },
    contact: {
      kicker: "Järgmine samm",
      title: "Räägime läbi 2-3 protsessi ja valime õige formaadi.",
      lead: "Vastame ühe tööpäeva jooksul. Kui audit ei ole praegu mõistlik, ütleme seda otse ja suuname kergemasse formaati.",
      emailCta: "Kirjuta info@02signal.ai"
    },
    form: {
      company: "Ettevõte *",
      size: "Ettevõtte suurus *",
      name: "Nimi *",
      role: "Roll *",
      email: "Email *",
      need: "Mida vajate? *",
      candidates: "Mitu AI-kandidaatprotsessi näete? *",
      message: "Kirjeldage 1-2 lausega, kus AI võiks aidata *",
      consent: "Nõustun, et 02Signal kasutab neid andmeid minuga ühenduse võtmiseks.",
      submit: "Saada päring",
      note: "Vorm avab e-kirja teie meiliprogrammis. Päris n8n webhook'i saab ühendada järgmise sammuna.",
      sizes: ["50-100", "100-500", "500+", "Alla 50", "Ei tea"],
      needs: ["Protsessiaudit", "30-min kõne", "Enesediagnostika", "Tahan arutada midagi muud"],
      candidateOptions: ["1", "2-3", "4-7", "Rohkem", "Ei tea"],
      mailSubject: "02Signal AI-piloodi päring"
    }
  },
  en: {
    meta: {
      title: "02Signal | AI pilot process audit",
      description:
        "02Signal helps teams choose the first AI pilot process, design measurable automation, and prepare a leadership decision.",
      path: "/en/"
    },
    nav: [
      ["#what", "What we do"],
      ["#formats", "Formats"],
      ["#audit", "Audit"],
      ["#example", "Example"],
      ["#contact", "Contact"]
    ],
    hero: {
      eyebrow: "AI pilot process audit",
      title: "Choose the first AI pilot where the win can be measured.",
      lead:
        "02Signal helps leaders find the process with a feedback loop, business impact, and a ready team. Only then do we build n8n, RAG, or a bot.",
      primary: "Book a 30-min call",
      secondary: "See formats",
      proof: [
        ["10 min", "free self-diagnostic"],
        ["1-2 weeks", "process audit for leadership"],
        ["15-20 processes", "mapped and prioritized"]
      ]
    },
    what: {
      kicker: "What 02Signal does",
      title: "We do not sell an “AI project”. We help you choose the right first process.",
      lead:
        "Starting with the wrong process is the most expensive early AI mistake: the pilot drags on, ROI does not show up, and trust disappears. The right process starts a small measurable flywheel.",
      cards: [
        { number: "1", title: "Find the right process", text: "We map repeated decisions, data sources, the feedback loop, and the cost of error." },
        { number: "2", title: "Design the pilot", text: "We define knowledge, autonomy level, decision log, quality checks, and metrics." },
        { number: "3", title: "Build only after selection", text: "n8n, Telegram, Google Sheets, or RAG enter the picture once the process logic is clear." }
      ]
    },
    formats: {
      kicker: "Two help formats",
      title: "Start light or order an audit for a leadership decision.",
      lead:
        "You can begin with a 10-minute self-diagnostic. If the company has several AI ideas and needs an executive decision, use the process audit.",
      cards: [
        {
          label: "Light entry",
          title: "AI maturity self-diagnostic",
          text: "Use it when you want a quick read on whether the company is ready for an AI pilot.",
          items: ["20 questions across five dimensions", "PDF summary by email", "3-5 next steps", "Gap map"],
          price: "10 min · free",
          cta: "Start self-diagnostic"
        },
        {
          label: "Leadership decision",
          title: "Process audit",
          text: "Use it when the company has 3-7 AI candidate processes and must choose the first one or two pilots.",
          items: ["15-20 process map", "AI flywheel spec for 1-2 finalists", "6-12 month roadmap", "60-min defense with top team"],
          price: "1-2 weeks · price after scoping",
          cta: "Order audit"
        }
      ]
    },
    fit: {
      kicker: "When audit fits",
      title: "The audit answers one question: which process should we start with?",
      items: [
        ["The company has 3-7 AI ideas or processes, but no priority.", "Audit"],
        ["Leadership needs a clear budget rationale and Go/No-Go criteria.", "Audit"],
        ["Three leaders have three different AI ideas and no shared decision frame.", "Audit"],
        ["The process is already chosen and the team wants to build a prototype.", "Workshop"],
        ["The process is chosen, but there is no internal build team.", "Implementation"],
        ["The company is below 50-100 people and processes still live mostly in the owner’s head.", "Self-diagnostic or call"]
      ]
    },
    filter: {
      badge: "Main filter",
      title: "Without a feedback loop, the AI flywheel does not start.",
      copy:
        "The first pilot must be a process where you can tell whether the AI decision was right. If no such process exists, the audit still creates value: you avoid spending budget on a pilot that cannot learn."
    },
    audit: {
      kicker: "How the audit works",
      title: "1-2 weeks based on real processes, interviews, and data.",
      lead: "This is not idea collection. We test processes against four signs: repetition, feedback loop, cost of error, and team readiness.",
      steps: [
        { tag: "Week 1", title: "Process map and labeling", text: "We collect 15-20 processes. Each receives a status: AI flywheel, AI acceleration without redesign, or do not touch." },
        { tag: "Week 2", title: "Flywheel design for finalists", text: "We define knowledge, autonomy level, decision log, quality control, and metrics for 1-2 key processes." },
        { tag: "Final", title: "60-min decision session", text: "We review the results with CEO/COO and process owners, then agree on pilot, budget range, and Go/No-Go points." }
      ]
    },
    example: {
      kicker: "Example solution",
      title: "UrbanStyle: a process map that separates an AI flywheel from simple automation.",
      lead:
        "This is a placeholder example from the 02Signal simulation. In a real audit, this would contain your company’s 15-20 processes and a short rationale for each status.",
      statuses: { flywheel: "AI flywheel", accelerate: "AI acceleration", pause: "do not touch" },
      processes: [
        { name: "Customer inquiry replies", status: "flywheel" },
        { name: "Inventory transfer decisions", status: "flywheel" },
        { name: "Campaign content drafts", status: "accelerate" },
        { name: "Final contract approval", status: "pause" },
        { name: "Product description creation", status: "accelerate" },
        { name: "Order exception handling", status: "flywheel" },
        { name: "Financial forecasting", status: "pause" },
        { name: "Store staff scheduling", status: "accelerate" }
      ],
      legend: ["AI flywheel - start in the next quarter", "AI acceleration - use an existing workflow", "do not touch - risk, data, or feedback loop does not fit"]
    },
    scope: {
      kicker: "What is outside the audit",
      title: "The audit is selection and pilot design, not full implementation.",
      includedTitle: "The audit gives a decision base",
      notIncludedTitle: "Implementation comes next",
      included: ["prioritized process map", "pilot work specification", "metrics and quality control", "leadership decision session"],
      notIncluded: ["full n8n production workflow", "approval of data security policies", "autotest pipeline", "training a champion network"]
    },
    contact: {
      kicker: "Next step",
      title: "Let’s review 2-3 processes and choose the right format.",
      lead: "We reply within one business day. If the audit is not the right move now, we say it directly and suggest a lighter format.",
      emailCta: "Email info@02signal.ai"
    },
    form: {
      company: "Company *",
      size: "Company size *",
      name: "Name *",
      role: "Role *",
      email: "Email *",
      need: "What do you need? *",
      candidates: "How many AI candidate processes do you see? *",
      message: "Describe in 1-2 sentences where AI could help *",
      consent: "I agree that 02Signal may use this data to contact me.",
      submit: "Send request",
      note: "The form opens an email in your mail app. A real n8n webhook can be connected next.",
      sizes: ["50-100", "100-500", "500+", "Below 50", "Not sure"],
      needs: ["Process audit", "30-min call", "Self-diagnostic", "Something else"],
      candidateOptions: ["1", "2-3", "4-7", "More", "Not sure"],
      mailSubject: "02Signal AI pilot request"
    }
  },
  ru: {
    meta: {
      title: "02Signal | Аудит процесса для AI-пилота",
      description:
        "02Signal помогает выбрать первый процесс для AI-пилота, спроектировать измеримую автоматизацию и подготовить решение для руководства.",
      path: "/ru/"
    },
    nav: [
      ["#what", "Что делаем"],
      ["#formats", "Форматы"],
      ["#audit", "Аудит"],
      ["#example", "Пример"],
      ["#contact", "Контакт"]
    ],
    hero: {
      eyebrow: "Аудит процесса для AI-пилота",
      title: "Выберите первый AI-пилот там, где результат можно измерить.",
      lead:
        "02Signal помогает руководителям найти процесс с петлей обратной связи, бизнес-эффектом и готовой командой. Только после этого строим n8n, RAG или бота.",
      primary: "Назначить 30-мин звонок",
      secondary: "Посмотреть форматы",
      proof: [
        ["10 минут", "бесплатная самодиагностика"],
        ["1-2 недели", "аудит процессов для руководства"],
        ["15-20 процессов", "карта и приоритеты"]
      ]
    },
    what: {
      kicker: "Что делает 02Signal",
      title: "Мы не продаем “AI-проект”. Мы помогаем выбрать правильный первый процесс.",
      lead:
        "Старт на неподходящем процессе - дорогая ошибка ранней AI-трансформации: пилот живет долго, окупаемости нет, доверие к идее теряется. Правильный процесс запускает небольшой измеримый маховик.",
      cards: [
        { number: "1", title: "Находим подходящий процесс", text: "Смотрим повторяемые решения, источники данных, петлю обратной связи и цену ошибки." },
        { number: "2", title: "Проектируем пилот", text: "Определяем базу знаний, уровень автономии, лог решений, проверку качества и метрики." },
        { number: "3", title: "Строим только после выбора", text: "n8n, Telegram, Google Sheets или RAG появляются тогда, когда логика процесса понятна." }
      ]
    },
    formats: {
      kicker: "Два формата помощи",
      title: "Начните легко или закажите аудит для решения топ-команды.",
      lead:
        "Можно начать с 10-минутной самодиагностики. Если в компании несколько AI-идей и нужен выбор для руководства, подходит аудит процессов.",
      cards: [
        {
          label: "Легкий вход",
          title: "Самодиагностика AI-зрелости",
          text: "Подходит, если нужно быстро понять, готова ли компания к AI-пилоту.",
          items: ["20 вопросов по пяти измерениям", "PDF-отчет на email", "3-5 следующих шагов", "Карта пробелов"],
          price: "10 минут · бесплатно",
          cta: "Пройти самодиагностику"
        },
        {
          label: "Решение руководства",
          title: "Аудит процессов",
          text: "Подходит, если в компании 3-7 процессов-кандидатов на AI и нужно выбрать один или два пилота.",
          items: ["Карта 15-20 процессов", "Спецификация AI-маховика для 1-2 финалистов", "Дорожная карта на 6-12 месяцев", "60-мин защита перед топ-командой"],
          price: "1-2 недели · цена после уточнения объема",
          cta: "Заказать аудит"
        }
      ]
    },
    fit: {
      kicker: "Когда нужен аудит",
      title: "Аудит отвечает на один вопрос: с какого процесса начинать?",
      items: [
        ["В компании 3-7 AI-идей или процессов, но нет общего приоритета.", "Аудит"],
        ["Руководству нужно обоснование бюджета и критерии Go/No-Go.", "Аудит"],
        ["У трех руководителей три разные AI-идеи без общей рамки выбора.", "Аудит"],
        ["Процесс уже выбран, команда хочет строить прототип.", "Воркшоп"],
        ["Процесс выбран, но внутренней команды внедрения нет.", "Внедрение"],
        ["В компании меньше 50-100 человек, процессы еще в голове собственника.", "Самодиагностика или звонок"]
      ]
    },
    filter: {
      badge: "Главный фильтр",
      title: "Без петли обратной связи AI-маховик не запускается.",
      copy:
        "Первый пилот должен быть процессом, где можно понять, было ли решение AI правильным. Если такого процесса нет, аудит все равно полезен: он экономит бюджет на пилоте, который не сможет учиться."
    },
    audit: {
      kicker: "Как устроен аудит",
      title: "1-2 недели на основе реальных процессов, интервью и данных.",
      lead: "Это не сбор идей. Проверяем процессы по четырем признакам: повторяемость, петля обратной связи, цена ошибки и готовность команды.",
      steps: [
        { tag: "Неделя 1", title: "Карта процессов и маркировка", text: "Собираем 15-20 процессов. Каждый получает статус: AI-маховик, AI-ускорение без перепроектирования или не трогать." },
        { tag: "Неделя 2", title: "Дизайн маховика для финалистов", text: "Описываем базу знаний, уровень автономии, лог решений, контроль качества и метрики для 1-2 ключевых процессов." },
        { tag: "Финал", title: "60-мин сессия решения", text: "Разбираем результаты с CEO/COO и владельцами процессов, затем фиксируем пилот, бюджетный диапазон и точки Go/No-Go." }
      ]
    },
    example: {
      kicker: "Пример решения",
      title: "UrbanStyle: карта процессов, которая отделяет AI-маховик от простой автоматизации.",
      lead:
        "Это placeholder пример из симуляции 02Signal. В реальном аудите здесь будут 15-20 процессов вашей компании и короткое обоснование статуса по каждому.",
      statuses: { flywheel: "AI-маховик", accelerate: "AI-ускорение", pause: "не трогать" },
      processes: [
        { name: "Ответы на обращения клиентов", status: "flywheel" },
        { name: "Решения по перемещению запасов", status: "flywheel" },
        { name: "Черновики кампаний", status: "accelerate" },
        { name: "Финальное согласование договоров", status: "pause" },
        { name: "Создание описаний товаров", status: "accelerate" },
        { name: "Обработка исключений в заказах", status: "flywheel" },
        { name: "Финансовый прогноз", status: "pause" },
        { name: "Графики персонала магазинов", status: "accelerate" }
      ],
      legend: ["AI-маховик - запускать в ближайшем квартале", "AI-ускорение - использовать готовый сценарий", "не трогать - риск, данные или петля обратной связи не подходят"]
    },
    scope: {
      kicker: "Что не входит в аудит",
      title: "Аудит - это выбор и дизайн пилота, не полное внедрение.",
      includedTitle: "Аудит дает основу для решения",
      notIncludedTitle: "Внедрение идет следующим этапом",
      included: ["приоритизированная карта процессов", "рабочая спецификация пилота", "метрики и контроль качества", "сессия решения с руководством"],
      notIncluded: ["полный production workflow в n8n", "утверждение политик безопасности данных", "pipeline автотестов", "обучение сети чемпионов"]
    },
    contact: {
      kicker: "Следующий шаг",
      title: "Разберем 2-3 процесса и выберем правильный формат.",
      lead: "Ответим в течение одного рабочего дня. Если аудит сейчас не нужен, скажем прямо и предложим более легкий формат.",
      emailCta: "Написать info@02signal.ai"
    },
    form: {
      company: "Компания *",
      size: "Размер компании *",
      name: "Имя *",
      role: "Должность *",
      email: "Email *",
      need: "Что нужно? *",
      candidates: "Сколько AI-процессов-кандидатов вы видите? *",
      message: "Опишите 1-2 предложениями, где AI мог бы помочь *",
      consent: "Согласен, что 02Signal использует эти данные, чтобы связаться со мной.",
      submit: "Отправить заявку",
      note: "Форма откроет письмо в вашей почтовой программе. Настоящий n8n webhook можно подключить следующим шагом.",
      sizes: ["50-100", "100-500", "500+", "Менее 50", "Не знаю"],
      needs: ["Аудит процессов", "30-мин звонок", "Самодиагностика", "Хочу обсудить другое"],
      candidateOptions: ["1", "2-3", "4-7", "Больше", "Не знаю"],
      mailSubject: "Заявка 02Signal на AI-пилот"
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
