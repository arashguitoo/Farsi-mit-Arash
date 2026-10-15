/* =========================================================
   Live-Schatzsuche (leicht): „Das Geburtstagsgeschenk“
   Gleiche Spiel-Logik wie Omas Truhe (live-truhe.html?spiel=geschenk),
   kürzer (3 Stationen + Schloss, ca. 45 Min.), einfache Sprache,
   vokalisiert, mit aufklappbarem Wörterbuch pro Station.
   Richtige Antwort = immer opt[0] (das Spiel mischt).
   ========================================================= */
(window.SCHATZSUCHEN = window.SCHATZSUCHEN || {}).geschenk = {
  id: "geschenk",
  titel: "Das Geburtstagsgeschenk",
  titelFa: "هِدیه‌یِ تَوَلُّد",
  icon: "🎁",
  dauer: "ca. 45 Minuten",
  ziel: { name: "Box", icon: "📦", offen: "Die Box ist offen!" },
  figuren: { P: "مینا", S: "سارا" },
  code: [8, 5, 7],
  intro: {
    de: "Morgen hat Mina Geburtstag! Ihre Freundin Sara hat ein Geschenk gekauft und in einer kleinen Box versteckt. Die Box hat ein Zahlenschloss mit drei Ziffern. Aber Sara ist verreist … Findet die drei Ziffern und öffnet die Box!",
    regeln: ["Ihr arbeitet zu zweit: <b>Person A</b> und <b>Person B</b>. Jede Person sieht nur <b>ihren Teil</b> der Hinweise.",
      "Lest euch eure Texte <b>auf Persisch</b> vor. Unbekannte Wörter? Unter jeder Station gibt es ein <b>📖 Wörterbuch</b> zum Aufklappen.",
      "Bei den Fragen ist abwechselnd A oder B dran – die andere Person darf helfen, aber nicht klicken.",
      "Jede Station bringt euch eine Ziffer. Mit allen drei Ziffern öffnet ihr die Box."]
  },
  stationen: [
    { nr: 1, titel: "Saras Nachricht", fa: "پَیامِ سارا", icon: "✉️", minuten: 15,
      auftrag: "Sara hat euch eine Nachricht geschrieben – aber sie ist durcheinander. Jede/r von euch hat 3 Teile. Lest euch eure Teile vor und bringt die Nachricht gemeinsam in die richtige Reihenfolge.",
      typ: "ordnen",
      teile: [
        { id: "a1", wer: "A", fa: "سَلام دوستانِ عَزیز! فَردا تَوَلُّدِ میناست." },
        { id: "b1", wer: "B", fa: "مَن بَرایِ او یک هِدیه خَریدَم: یک کِتابِ شِعرِ فارسی." },
        { id: "a2", wer: "A", fa: "اَمّا فَردا مَن این‌جا نیستَم. ساعَتِ هَشت با قَطار به اِصفَهان می‌رَوَم." },
        { id: "b2", wer: "B", fa: "بَرایِ هَمین، هِدیه را در یک جَعبه‌یِ کوچَک گُذاشتَم. جَعبه در کافه‌یِ «گُلِ سُرخ» اَست." },
        { id: "a3", wer: "A", fa: "جَعبه یک قُفل دارَد. رَمزِ قُفل سه رَقَم دارَد. رَقَمِ اَوَّل، ساعَتِ قَطارِ مَن اَست." },
        { id: "b3", wer: "B", fa: "لُطفاً فَردا هِدیه را به مینا بِدَهید. خِیلی مَمنون! سارا" }
      ],
      loesung: ["a1", "b1", "a2", "b2", "a3", "b3"],
      lexikon: [["تَوَلُّد", "Geburtstag"], ["هِدیه", "Geschenk"], ["خَریدَم", "ich habe gekauft"], ["شِعر", "Gedicht"], ["قَطار", "Zug"],
        ["بَرایِ هَمین", "deshalb"], ["جَعبه", "Box, Schachtel"], ["گُذاشتَم", "ich habe gelegt"], ["قُفل", "Schloss"], ["رَمز", "Code"],
        ["رَقَم", "Ziffer"], ["اَوَّل", "erste/r"], ["لُطفاً", "bitte"], ["بِدَهید", "gebt!"]],
      tipps: ["Die Nachricht beginnt mit <span class='fa'>سَلام</span> und endet mit Saras Namen.",
        "Reihenfolge: Geburtstag → Geschenk → Sara ist weg → wo ist die Box? → das Schloss → Bitte und Dank."],
      fragen: [
        { wer: "A", frage: "Wann hat Mina Geburtstag?", opt: ["morgen", "heute", "nächste Woche"] },
        { wer: "B", frage: "Was ist das Geschenk?", opt: ["ein Buch mit persischen Gedichten", "ein Fahrrad", "eine Kamera"] },
        { wer: "A", frage: "<span class='fa'>مَن این‌جا نیستَم</span> bedeutet:", opt: ["Ich bin nicht hier.", "Ich bin hier.", "Du bist nicht hier."] },
        { wer: "B", frage: "🔑 Was ist die <b>erste Ziffer</b> des Codes?", opt: ["8", "3", "6"], ziffer: 8 }
      ] },
    { nr: 2, titel: "Das Foto", fa: "عَکس", icon: "📷", minuten: 12,
      auftrag: "Sara hat ein Foto vom Café geschickt. <b>B</b> liest Saras Beschreibung vor. <b>A</b> sieht sechs ähnliche Fotos – nur eins passt genau. Fragt nach, wenn etwas unklar ist!",
      typ: "suchbild",
      beschreibung: [
        "دَر این عَکس، مَن و مینا جِلویِ کافه هَستیم.",
        "دَرِ کافه قِرمِز اَست.",
        "مینا اَز مَن کوچَک‌تَر اَست.",
        "مَن یک کُلاه دارَم.",
        "کِنارِ دَر یک دِرَخت اَست.",
        "رویِ دیوار یک گُربه‌یِ سیاه اَست.",
        "عَدَدِ رویِ دَر، رَقَمِ دُوُّم اَست."
      ],
      fotos: [
        { id: "f1", tuer: "#c94b4b", groesser: "S", hut: "S", neben: "baum", katze: "schwarz", nr: 5 },
        { id: "f2", tuer: "#3f6fa8", groesser: "S", hut: "S", neben: "baum", katze: "schwarz", nr: 2 },
        { id: "f3", tuer: "#c94b4b", groesser: "P", hut: "S", neben: "baum", katze: "schwarz", nr: 9 },
        { id: "f4", tuer: "#c94b4b", groesser: "S", hut: "P", neben: "baum", katze: "schwarz", nr: 1 },
        { id: "f5", tuer: "#c94b4b", groesser: "S", hut: "S", neben: "rad", katze: "schwarz", nr: 6 },
        { id: "f6", tuer: "#c94b4b", groesser: "S", hut: "S", neben: "baum", katze: "weiss", nr: 4 }
      ],
      richtig: "f1",
      beschreiben: { text: "Gut gefunden! Jetzt beschreibt <b>A</b> das Foto mit eigenen Worten (3 Sätze auf Persisch). <b>B</b> hakt ab, was A erwähnt:",
        liste: ["die Farbe der Tür <span class='fa'>(دَرِ قِرمِز)</span>", "wer kleiner ist <span class='fa'>(… اَز … کوچَک‌تَر اَست)</span>", "der Hut <span class='fa'>(کُلاه)</span>", "der Baum <span class='fa'>(دِرَخت)</span>", "die Katze <span class='fa'>(گُربه‌یِ سیاه)</span>"], mind: 3,
        hilfe: "دَر این عَکس … · … اَز … کوچَک‌تَر اَست · کِنارِ دَر … · رویِ دیوار …" },
      lexikon: [["عَکس", "Foto"], ["جِلویِ", "vor"], ["دَر", "Tür"], ["قِرمِز", "rot"], ["کوچَک‌تَر", "kleiner"], ["بُزُرگ‌تَر", "größer"],
        ["کُلاه", "Hut"], ["کِنارِ", "neben"], ["دِرَخت", "Baum"], ["دیوار", "Wand"], ["گُربه", "Katze"], ["سیاه", "schwarz"], ["سِفید", "weiß"],
        ["عَدَد", "Zahl"], ["دُوُّم", "zweite/r"]],
      tipps: ["Prüft jedes Detail einzeln: Farbe der Tür – wer ist kleiner – wer hat den Hut – Baum oder Fahrrad – Farbe der Katze.",
        "Sara spricht von sich selbst mit <span class='fa'>مَن</span> (ich). Mina ist kleiner, und Sara hat den Hut."],
      fragen: [
        { wer: "A", frage: "<span class='fa'>مینا اَز مَن کوچَک‌تَر اَست</span> bedeutet:", opt: ["Mina ist kleiner als ich.", "Mina ist größer als ich.", "Ich bin kleiner als Mina."] },
        { wer: "B", frage: "Welche Farbe hat die Tür vom Café?", opt: ["rot", "grün", "blau"] },
        { wer: "A", frage: "🔑 Was ist die <b>zweite Ziffer</b> des Codes?", opt: ["5", "2", "9"], ziffer: 5 }
      ] },
    { nr: 3, titel: "Der Stadtplan", fa: "نَقشه", icon: "🗺️", minuten: 15,
      auftrag: "Jetzt müsst ihr zum Café – und danach zu Minas Haus. <b>B</b> liest den ersten Weg vor, <b>A</b> folgt auf dem Stadtplan und tippt auf das Ziel. Auf dem Plan bedeutet <span class='fa'>بالا</span> oben, <span class='fa'>پایین</span> unten, <span class='fa'>راست</span> rechts und <span class='fa'>چَپ</span> links.",
      typ: "karte",
      bloecke: {
        "0,0": { e: "🏦", fa: "بانک" }, "0,2": { e: "🌳", fa: "پارک" }, "0,4": { haus: "#8fb3d9", nr: 4 }, "0,6": { e: "📮", fa: "پُست" },
        "2,0": { e: "🥖", fa: "نانوایی" }, "2,2": { haus: "#e9c94a", nr: 9 }, "2,4": { e: "☕", fa: "کافه" }, "2,6": { e: "💊", fa: "داروخانه" },
        "4,0": { haus: "#7fb07f", nr: 6 }, "4,2": { e: "📚", fa: "کِتاب‌فُروشی" }, "4,4": { e: "🏫", fa: "مَدرِسه" }, "4,6": { haus: "#e9c94a", nr: 7 },
        "6,0": { e: "💐", fa: "گُل‌فُروشی" }, "6,2": { haus: "#e08a8a", nr: 2 }, "6,4": { e: "🍕", fa: "پیتزا" }, "6,6": { haus: "#7fb07f", nr: 3 }
      },
      start: "6,1",
      wege: [
        { liest: "B", sucht: "A", titel: "Zum Café „Gol-e Sorch“",
          text: ["اَز مِترو بیرون بیا و مُستَقیم به بالا بُرو.",
            "دَر چَهارراهِ دُوُّم به راست بِپیچ.",
            "اَز کِنارِ یک خانه‌یِ زَرد رَد شو.",
            "کافه سَمتِ چَپ اَست، روبه‌رویِ مَدرِسه."],
          ziel: "2,4" },
        { liest: "A", sucht: "B", titel: "Vom Café zu Minas Haus",
          text: ["اَز کافه بیرون بیا و به راست بُرو.",
            "دَر چَهارراه به پایین بِپیچ.",
            "خانه‌یِ مینا سَمتِ راست اَست. خانه زَرد اَست.",
            "شُماره‌یِ خانه‌یِ مینا، رَقَمِ سِوُّم اَست."],
          ziel: "4,6" }
      ],
      lexikon: [["مِترو", "U-Bahn"], ["بیرون بیا", "komm heraus"], ["مُستَقیم", "geradeaus"], ["بالا", "oben"], ["پایین", "unten"],
        ["چَهارراه", "Kreuzung"], ["راست", "rechts"], ["چَپ", "links"], ["بِپیچ", "bieg ab!"], ["رَد شو", "geh vorbei!"],
        ["سَمتِ", "auf der Seite"], ["روبه‌رویِ", "gegenüber"], ["زَرد", "gelb"], ["شُماره", "Nummer"], ["سِوُّم", "dritte/r"]],
      tipps: ["Start ist die Metro 🚇 unten links. Kreuzungen sind die hellen Stellen, wo sich zwei Straßen treffen.",
        "Das Café ☕ liegt gegenüber der Schule 🏫. Minas Haus ist das gelbe Haus ganz rechts neben der Schule."],
      fragen: [
        { wer: "B", frage: "<span class='fa'>به راست بِپیچ</span> bedeutet:", opt: ["Bieg rechts ab!", "Bieg links ab!", "Geh geradeaus!"] },
        { wer: "A", frage: "<span class='fa'>روبه‌رویِ مَدرِسه</span> bedeutet:", opt: ["gegenüber der Schule", "neben der Schule", "hinter der Schule"] },
        { wer: "B", frage: "🔑 Was ist die <b>dritte Ziffer</b> des Codes?", opt: ["7", "3", "9"], ziffer: 7 }
      ] },
    { nr: 4, titel: "Das Schloss", fa: "قُفل", icon: "🔒", minuten: 3,
      auftrag: "Fast geschafft! <b>A</b> stellt die ersten beiden Ziffern ein, <b>B</b> die letzte. Erst wenn beide fertig sind, könnt ihr die Box öffnen.",
      typ: "schloss",
      tipps: ["Schaut ins Notizbuch: Jede Station hat euch eine Ziffer gegeben – in der richtigen Reihenfolge."] }
  ],
  ende: {
    brief: ["آفَرین! شُما رَمز را پِیدا کَردید.",
      "دَر جَعبه یک کِتابِ شِعر و یک کارتِ تَوَلُّد اَست.",
      "کارت هَنوز خالی اَست …",
      "لُطفاً بَرایِ مینا چَند جُمله بِنِویسید!",
      "مَمنون! سارا"],
    aufgabe: {
      titel: "Eine Geburtstagskarte für Mina",
      text: "Schreibt zu zweit eine kurze Geburtstagskarte für Mina (3–4 Sätze auf Persisch). Danach lest ihr sie im Plenum vor.",
      hilfen: ["مینایِ عَزیز، تَوَلُّدَت مُبارَک!", "این کِتاب بَرایِ توست.", "اُمیدوارَم که …", "تو یک دوستِ خِیلی خوب هَستی.", "دوستَت، …"]
    }
  }
};
