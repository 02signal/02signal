export type DiagnosticDimension = {
  id: string;
  title: string;
  plainTitle: string;
  description: string;
};

export type DiagnosticQuestion = {
  id: string;
  dimension: string;
  text: string;
};

export const diagnosticDimensions: DiagnosticDimension[] = [
  {
    id: "repetition",
    title: "Korduv töö",
    plainTitle: "Kas sama töö kordub piisavalt tihti?",
    description: "Kõige parem algus on töö, mida tehakse tihti ja enam-vähem samamoodi."
  },
  {
    id: "knowledge",
    title: "Teadmised",
    plainTitle: "Kas hea vastuse reeglid on olemas?",
    description: "AI vajab teie häid näiteid ja selgeid reegleid. Kui kõik on inimeste peas, tuleb osa enne kirja panna."
  },
  {
    id: "data",
    title: "Info korrasolek",
    plainTitle: "Kas vajalik info on leitav?",
    description: "Kui vajalik info on laiali või ainult inimeste peas, tuleb see enne lihtsasse korda panna."
  },
  {
    id: "control",
    title: "Kontroll",
    plainTitle: "Kas tulemust saab kontrollida?",
    description: "Alguses peab inimene AI töö üle vaatama ja märkama, kas vastus oli õige."
  },
  {
    id: "readiness",
    title: "Valmisolek",
    plainTitle: "Kas keegi veab selle väikese sammu lõpuni?",
    description: "Väike samm vajab ühte eestvedajat ja valmisolekut otsustada, kas jätkata või lõpetada."
  }
];

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "rep_1",
    dimension: "repetition",
    text: "Kas teil on töö, mida tehakse iga nädal vähemalt mitu korda?"
  },
  {
    id: "rep_2",
    dimension: "repetition",
    text: "Kas see töö võtab inimestelt märgatavalt aega, kuigi on üsna sarnane iga kord?"
  },
  {
    id: "rep_3",
    dimension: "repetition",
    text: "Kas selle töö sammud on enam-vähem teada ja korduvad?"
  },
  {
    id: "rep_4",
    dimension: "repetition",
    text: "Kas töö tulemus on konkreetne: vastus, kokkuvõte, tabel, teavitus, pakkumine või otsuse ettepanek?"
  },
  {
    id: "know_1",
    dimension: "knowledge",
    text: "Kas teil on olemas häid näiteid, kuidas seda tööd õigesti teha?"
  },
  {
    id: "know_2",
    dimension: "knowledge",
    text: "Kas keegi oskab lihtsalt selgitada, milline on hea ja halb tulemus?"
  },
  {
    id: "know_3",
    dimension: "knowledge",
    text: "Kas korduvad küsimused, reeglid või vastused on kuskil kirjas?"
  },
  {
    id: "know_4",
    dimension: "knowledge",
    text: "Kas erandid on teada: millal peab inimene kindlasti sekkuma?"
  },
  {
    id: "data_1",
    dimension: "data",
    text: "Kas vajalik info on digitaalselt olemas: Excelis, e-mailis, CRM-is, kaustas või veebis?"
  },
  {
    id: "data_2",
    dimension: "data",
    text: "Kas inimene leiab selle info tavaliselt mõne minutiga üles?"
  },
  {
    id: "data_3",
    dimension: "data",
    text: "Kas andmed on piisavalt selged, et kõrvaline inimene saaks neist aru?"
  },
  {
    id: "data_4",
    dimension: "data",
    text: "Kas tundlikku infot saab vajadusel eraldi hoida või varjata?"
  },
  {
    id: "ctrl_1",
    dimension: "control",
    text: "Kas inimene saab AI tehtud töö enne kliendile või töötajale saatmist üle vaadata?"
  },
  {
    id: "ctrl_2",
    dimension: "control",
    text: "Kas on selge, kes vastutab lõpliku vastuse või otsuse eest?"
  },
  {
    id: "ctrl_3",
    dimension: "control",
    text: "Kas viga tuleks kiiresti välja, mitte alles kuu lõpus?"
  },
  {
    id: "ctrl_4",
    dimension: "control",
    text: "Kas saate pärast väikest katset vaadata ühte lihtsat näitajat: aega, vigade arvu või vastamise kiirust?"
  },
  {
    id: "ready_1",
    dimension: "readiness",
    text: "Kas omanik või juht tahab ise näha, kas AI aitab päriselt?"
  },
  {
    id: "ready_2",
    dimension: "readiness",
    text: "Kas üks inimene saab vastutada, et väike proov päriselt tehtud saaks?"
  },
  {
    id: "ready_3",
    dimension: "readiness",
    text: "Kas meeskond on nõus alustama abivahendist, mis ei tee kohe kõike ise?"
  },
  {
    id: "ready_4",
    dimension: "readiness",
    text: "Kui esimene samm on selge, kas omanik või juht saab 1-2 nädala jooksul otsustada: proovime või jätame praegu pooleli?"
  }
];

export const diagnosticOptions = [
  { value: 0, label: "Ei" },
  { value: 1, label: "Pigem ei" },
  { value: 2, label: "Osaliselt" },
  { value: 3, label: "Pigem jah" },
  { value: 4, label: "Jah" }
];

export const diagnosticLevels = [
  {
    min: 0,
    title: "Enne ehitamist tuleb töö selgemaks teha",
    text: "Praegu ei tasu veel tööriista ehitada. Esmalt tuleb valida üks korduv töö ja panna kirja, kus vajalik info asub."
  },
  {
    min: 35,
    title: "Sobib lühike nõu, mitte kohe ehitus",
    text: "Mõni võimalik alguskoht on olemas, aga enne raha kulutamist tuleb üle vaadata info, vastutus ja kontroll."
  },
  {
    min: 60,
    title: "Tasub valida üks esimene töö",
    text: "Teil on piisavalt korduvaid töid. Mõistlik järgmine samm on valida üks töö, kus väike AI abiline võib kõige kiiremini kasu anda."
  },
  {
    min: 80,
    title: "Valmis esimese väikese AI abilise jaoks",
    text: "Saab valida ühe lihtsa töö ja teha väikese abilise, mida inimene alguses üle vaatab. Nii on risk väike ja kasu mõõdetav."
  }
];
