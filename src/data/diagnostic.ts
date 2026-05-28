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
    description: "AI annab kõige kiiremini kasu töös, mida tehakse iga nädal mitu korda."
  },
  {
    id: "knowledge",
    title: "Teadmised",
    plainTitle: "Kas hea vastuse reeglid on olemas?",
    description: "AI vajab näiteid, juhiseid ja varasemaid häid vastuseid, mitte ainult üldist juttu."
  },
  {
    id: "data",
    title: "Info korrasolek",
    plainTitle: "Kas vajalik info on leitav?",
    description: "Kui info on ainult inimeste peas või mitmes segases failis, tuleb enne korda luua."
  },
  {
    id: "control",
    title: "Kontroll",
    plainTitle: "Kas tulemust saab kontrollida?",
    description: "Alguses peab inimene nägema, kas AI vastus või soovitus oli õige."
  },
  {
    id: "readiness",
    title: "Valmisolek",
    plainTitle: "Kas keegi veab selle väikese sammu lõpuni?",
    description: "Väike AI samm vajab ühte vastutajat ja natuke aega katsetamiseks."
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
    text: "Kas saate mõõta lihtsat kasu: aeg, vigade arv, vastamise kiirus või kliendi rahulolu?"
  },
  {
    id: "ready_1",
    dimension: "readiness",
    text: "Kas omanik või juht tahab ise näha, kas AI aitab päriselt?"
  },
  {
    id: "ready_2",
    dimension: "readiness",
    text: "Kas üks inimene saab olla katsetuse vastutaja?"
  },
  {
    id: "ready_3",
    dimension: "readiness",
    text: "Kas meeskond on nõus alustama abivahendist, mis ei tee kohe kõike ise?"
  },
  {
    id: "ready_4",
    dimension: "readiness",
    text: "Kas saate teha väikese otsuse 1-2 nädala jooksul, mitte venitada kuude kaupa?"
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
    title: "Alustage vestlusest, mitte ehitusest",
    text: "Tõenäoliselt on enne vaja selgemaks teha, milline töö kordub ja kus info asub."
  },
  {
    min: 35,
    title: "Sobib tasuta kiirkontroll ja 30-min kõne",
    text: "Mõni alguskoht on olemas, aga enne ehitamist tasub riskid ja andmed rahulikult üle vaadata."
  },
  {
    min: 60,
    title: "Sobib tööde ülevaatus",
    text: "Teil on piisavalt korduvaid töid. Järgmine mõistlik samm on valida neist üks esimene praktiline katsetus."
  },
  {
    min: 80,
    title: "Valmis väikseks esimeseks tööriistaks",
    text: "Tõenäoliselt saab valida ühe lihtsa töö ja teha väikese abivahendi, mida inimene alguses kontrollib."
  }
];
