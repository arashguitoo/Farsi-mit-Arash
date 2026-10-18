/* =========================================================
   Live-Quiz „Sprache verstehen – Deutsch als Brücke zum Persischen“
   Erste Sitzung Persisch I: Was wissen wir über unsere eigene Grammatik?

   Fragetypen
     mc      : Auswahl (2–4 Antworten), r = Index der richtigen Antwort
     wf      : wahr/falsch, r = 0 (wahr) oder 1 (falsch)
     tippen  : Satz in Teilen, auf den gesuchten Teil tippen, r = Index
     umfrage : keine richtige Antwort, nur Verteilung (Reflexion)
   kurz:true  → gehört auch zur Kurzfassung
   fa         → Kasten „Und im Persischen?“ (vokalisiert, mit Umschrift)
   ========================================================= */
window.QUIZZE = window.QUIZZE || {};
window.QUIZZE["sprache-verstehen"] = {
  id: "sprache-verstehen",
  titel: "Sprache verstehen",
  untertitel: "Deutsche Grammatik als Brücke zum Persischen",
  icon: "🧭",
  bloecke: {
    A: "Einstieg",
    B: "Satzglieder: Subjekt und Objekte",
    C: "Präpositionen mit Akkusativ oder Dativ",
    D: "Wo oder wohin? Wechselpräpositionen",
    E: "Partizip, Aktiv und Passiv",
    F: "Ein erster Blick aufs Persische"
  },
  fragen: [
    /* ---------- A: Einstieg ---------- */
    { b: "A", typ: "umfrage", kurz: true, frage: "Wie viele Sprachen sprichst du – mehr oder weniger?",
      a: ["eine", "zwei", "drei", "vier oder mehr"],
      erkl: "Jede Sprache, die man schon kann, hilft beim Lernen der nächsten: Man erkennt Muster wieder – oder merkt, was ganz anders ist." },
    { b: "A", typ: "umfrage", frage: "Was findest du an Grammatik am schwierigsten?",
      a: ["die Fälle (Kasus)", "die Wortstellung", "die Zeitformen", "die Fachbegriffe"],
      erkl: "Gute Nachricht für Persisch: Es gibt keine Kasusendungen und keine Artikel. Dafür ist die Wortstellung wichtig – das Verb steht am Ende." },

    /* ---------- B: Satzglieder ---------- */
    { b: "B", typ: "mc", kurz: true, frage: "„Der Hund beißt den Briefträger.“ – Wer beißt?",
      a: ["der Hund", "der Briefträger"], r: 0,
      erkl: "„der Hund“ steht im Nominativ – das ist das Subjekt. „den Briefträger“ steht im Akkusativ – das ist das Objekt." },
    { b: "B", typ: "mc", kurz: true, frage: "„Den Briefträger beißt der Hund.“ – Und jetzt: Wer beißt?",
      a: ["der Hund", "der Briefträger"], r: 0,
      erkl: "Immer noch der Hund! Im Deutschen zeigt der Kasus (der / den), wer was tut – nicht die Position im Satz. Deshalb darf man im Deutschen die Satzglieder umstellen.",
      fa: { fa: "مَن کِتاب را می‌خوانَم.", um: "man ketāb rā mi-xānam.", de: "Ich lese das Buch. – Im Persischen markiert das Wörtchen را (rā) das bestimmte direkte Objekt." } },
    { b: "B", typ: "mc", frage: "Mit welcher Frage findest du das Akkusativobjekt?",
      a: ["Wer oder was?", "Wen oder was?", "Wem?", "Wessen?"], r: 1,
      erkl: "Wer oder was? → Nominativ (Subjekt). Wen oder was? → Akkusativ. Wem? → Dativ. Wessen? → Genitiv." },
    { b: "B", typ: "tippen", kurz: true, frage: "Tippe auf das Akkusativobjekt (direktes Objekt).",
      a: ["Ich", "gebe", "meiner Mutter", "einen Schal."], r: 3,
      erkl: "Wen oder was gebe ich? → „einen Schal“ = Akkusativobjekt. Wem gebe ich ihn? → „meiner Mutter“ = Dativobjekt." },
    { b: "B", typ: "tippen", kurz: true, frage: "Tippe auf das Dativobjekt (indirektes Objekt).",
      a: ["Der Lehrer", "erklärt", "den Studierenden", "die Aufgabe."], r: 2,
      erkl: "Wem erklärt er etwas? → „den Studierenden“ – Dativ Plural (Endung -n). Was erklärt er? → „die Aufgabe“ = Akkusativ.",
      fa: { fa: "مَن به مادَرَم یک شال می‌دَهَم.", um: "man be mādaram yek šāl mi-daham.", de: "Ich gebe meiner Mutter einen Schal. – Das indirekte Objekt bekommt im Persischen die Präposition به (be, „zu/an“)." } },
    { b: "B", typ: "mc", frage: "„Direktes Objekt“ ist ein anderes Wort für …",
      a: ["das Subjekt", "das Akkusativobjekt", "das Dativobjekt", "das Genitivattribut"], r: 1,
      erkl: "Direktes Objekt = Akkusativobjekt, indirektes Objekt = meist Dativobjekt. Die Begriffe „direkt/indirekt“ helfen beim Vergleich mit anderen Sprachen – auch mit Persisch." },
    { b: "B", typ: "wf", frage: "„Ich helfe dir.“ – „dir“ ist ein direktes Objekt.",
      a: ["wahr", "falsch"], r: 1,
      erkl: "Falsch: „helfen“ verlangt den Dativ (Wem helfe ich?). Es gibt hier gar kein Akkusativobjekt.",
      fa: { fa: "به تو کُمَک می‌کُنَم.", um: "be to komak mi-konam.", de: "Ich helfe dir. – Auch im Persischen mit به (be): wörtlich „an dich Hilfe mache ich“." } },

    /* ---------- C: Präpositionen ---------- */
    { b: "C", typ: "mc", kurz: true, frage: "Welche Präposition steht immer mit Akkusativ?",
      a: ["mit", "für", "bei", "aus"], r: 1,
      erkl: "Immer Akkusativ: durch, für, gegen, ohne, um. „mit, bei, aus“ stehen immer mit Dativ." },
    { b: "C", typ: "mc", frage: "Welche Gruppe verlangt immer den Dativ?",
      a: ["durch, für, gegen, ohne, um", "aus, bei, mit, nach, seit, von, zu", "an, auf, in, über, unter", "wegen, trotz, während"], r: 1,
      erkl: "aus, bei, mit, nach, seit, von, zu (+ gegenüber) = immer Dativ. „an, auf, in …“ sind Wechselpräpositionen, „wegen, trotz, während“ stehen mit Genitiv." },
    { b: "C", typ: "mc", kurz: true, frage: "Ich fahre mit ___ Bus.",
      a: ["den", "dem", "der", "des"], r: 1,
      erkl: "„mit“ + Dativ → mit dem Bus.",
      fa: { fa: "با اُتوبوس می‌رَوَم.", um: "bā otobus mi-ravam.", de: "Ich fahre mit dem Bus. – Im Persischen ändert sich nach der Präposition nichts: kein Artikel, keine Endung." } },
    { b: "C", typ: "mc", frage: "Das Geschenk ist für ___ Vater.",
      a: ["meinem", "meinen", "meines", "mein"], r: 1,
      erkl: "„für“ + Akkusativ → für meinen Vater." },
    { b: "C", typ: "mc", frage: "Seit ___ Jahr lerne ich Gitarre.",
      a: ["ein", "einen", "einem", "eines"], r: 2,
      erkl: "„seit“ + Dativ → seit einem Jahr." },
    { b: "C", typ: "mc", frage: "Wir gehen ohne ___ Kinder ins Kino.",
      a: ["die", "den", "der", "denen"], r: 0,
      erkl: "„ohne“ + Akkusativ → ohne die Kinder (Akkusativ Plural = die)." },

    /* ---------- D: Wechselpräpositionen ---------- */
    { b: "D", typ: "mc", kurz: true, frage: "Bei Wechselpräpositionen (in, an, auf …): Welche Frage führt zum Akkusativ?",
      a: ["Wo?", "Wohin?", "Wann?", "Womit?"], r: 1,
      erkl: "Wohin? (Richtung, Bewegung zu einem Ziel) → Akkusativ. Wo? (Ort, Position) → Dativ." },
    { b: "D", typ: "mc", kurz: true, frage: "Ich hänge das Bild an ___ Wand.",
      a: ["der", "die", "dem", "den"], r: 1,
      erkl: "Wohin hänge ich das Bild? → an die Wand (Akkusativ)." },
    { b: "D", typ: "mc", kurz: true, frage: "Das Bild hängt an ___ Wand.",
      a: ["der", "die", "dem", "den"], r: 0,
      erkl: "Wo hängt das Bild? → an der Wand (Dativ). Gleiche Präposition, anderer Kasus – je nach Frage." },
    { b: "D", typ: "mc", frage: "Ich ___ das Buch auf den Tisch.",
      a: ["liege", "lege", "liegt", "gelegen"], r: 1,
      erkl: "legen (Handlung, Bewegung → wohin? + Akkusativ) – liegen (Zustand → wo? + Dativ). Ebenso: stellen/stehen, setzen/sitzen, hängen/hängen." },
    { b: "D", typ: "mc", kurz: true, frage: "Welcher Satz ist richtig?",
      a: ["Wir sind in den Park.", "Wir gehen in den Park.", "Wir gehen in dem Park hinein.", "Wir sind in die Park."], r: 1,
      erkl: "Wohin gehen wir? → in den Park (Akk.). Wo sind wir? → im (= in dem) Park (Dat.).",
      fa: { fa: "به پارک می‌رَویم. – دَر پارک هَستیم.", um: "be pārk mi-ravim. – dar pārk hastim.", de: "Wir gehen in den Park. – Wir sind im Park. Persisch unterscheidet das mit zwei Präpositionen: به (be) = wohin, دَر (dar) = wo." } },
    { b: "D", typ: "wf", frage: "„Ich warte auf den Bus.“ – Hier steht Akkusativ, weil sich der Bus bewegt.",
      a: ["wahr", "falsch"], r: 1,
      erkl: "Falsch: „warten auf + Akkusativ“ ist eine feste Verbindung (Präpositionalobjekt). Hier fragt man nicht wo/wohin – man lernt Verb + Präposition zusammen." },

    /* ---------- E: Partizip, Aktiv, Passiv ---------- */
    { b: "E", typ: "mc", kurz: true, frage: "Welche Form ist ein Partizip I?",
      a: ["spielend", "gespielt", "spielen", "spielte"], r: 0,
      erkl: "Partizip I = Infinitiv + d: spielend, lachend. Partizip II: gespielt, gelacht." },
    { b: "E", typ: "mc", frage: "„das lachende Kind“ – das Kind …",
      a: ["lacht gerade selbst", "wurde ausgelacht", "hat früher gelacht"], r: 0,
      erkl: "Partizip I ist aktiv und gleichzeitig: Das Kind tut es selbst, genau jetzt.",
      fa: { fa: "بَچّه‌یِ خَندان", um: "bačče-ye xandān", de: "das lachende Kind" } },
    { b: "E", typ: "mc", kurz: true, frage: "„der reparierte Fernseher“ – der Fernseher …",
      a: ["repariert gerade etwas", "wurde repariert", "repariert sich selbst"], r: 1,
      erkl: "Partizip II von transitiven Verben ist meist passivisch und abgeschlossen: Jemand hat ihn repariert." },
    { b: "E", typ: "mc", kurz: true, frage: "Welcher Satz steht im Passiv?",
      a: ["Ich schreibe einen Brief.", "Der Brief wird geschrieben.", "Ich habe einen Brief geschrieben.", "Der Brief ist lang."], r: 1,
      erkl: "Vorgangspassiv = werden + Partizip II. „Ich habe … geschrieben“ ist Perfekt Aktiv.",
      fa: { fa: "نامه نِوِشته شُد.", um: "nāme nevešte šod.", de: "Der Brief wurde geschrieben. – Auch Persisch bildet das Passiv mit Partizip (nevešte = geschrieben) + „werden“ (šodan)." } },
    { b: "E", typ: "mc", frage: "Aktiv: „Die Lehrerin korrigiert den Test.“ – Wie heißt das im Passiv?",
      a: ["Der Test wird von der Lehrerin korrigiert.", "Den Test wird die Lehrerin korrigiert.", "Die Lehrerin wird vom Test korrigiert.", "Der Test hat die Lehrerin korrigiert."], r: 0,
      erkl: "Das Akkusativobjekt (den Test) wird zum Subjekt (der Test). Wer es tut, kann mit „von + Dativ“ dazukommen." },
    { b: "E", typ: "wf", kurz: true, frage: "„Ich habe gegessen.“ ist Passiv, weil ein Partizip II darin steht.",
      a: ["wahr", "falsch"], r: 1,
      erkl: "Falsch: haben + Partizip II = Perfekt Aktiv. Passiv braucht „werden“ (oder „sein“ beim Zustandspassiv)." },
    { b: "E", typ: "mc", frage: "Was passiert im Passiv mit dem Akkusativobjekt des Aktivsatzes?",
      a: ["Es wird zum Subjekt (Nominativ).", "Es bleibt im Akkusativ.", "Es wird zum Dativ.", "Es fällt immer weg."], r: 0,
      erkl: "Den Test (Akk.) → der Test (Nom.). Deshalb lassen sich nur Verben mit Akkusativobjekt ins „normale“ Passiv setzen." },

    /* ---------- F: Persisch ---------- */
    { b: "F", typ: "mc", kurz: true, frage: "Persisch ist mit Deutsch verwandt (indoeuropäisch). Welches persische Wort heißt „Bruder“?",
      a: ["barādar", "ketāb", "dust", "xāne"], r: 0,
      erkl: "بَرادَر barādar – Bruder. Ebenso: مادَر mādar – Mutter, دُختَر doxtar – Tochter. ketāb = Buch, dust = Freund, xāne = Haus.",
      fa: { fa: "بَرادَر · مادَر · دُختَر", um: "barādar · mādar · doxtar", de: "Bruder · Mutter · Tochter" } },
    { b: "F", typ: "mc", kurz: true, frage: "Wo steht das Verb im persischen Satz normalerweise?",
      a: ["am Anfang", "an zweiter Stelle", "am Ende", "egal wo"], r: 2,
      erkl: "Persisch ist eine Verb-am-Ende-Sprache – wie der deutsche Nebensatz: „…, weil ich das Buch lese.“",
      fa: { fa: "مَن کِتاب را می‌خوانَم.", um: "man ketāb rā mi-xānam.", de: "wörtlich: ich – Buch – rā – lese" } },
    { b: "F", typ: "wf", kurz: true, frage: "Persisch hat Artikel wie „der, die, das“ und unterscheidet männlich/weiblich.",
      a: ["wahr", "falsch"], r: 1,
      erkl: "Falsch: Es gibt keine Artikel und kein grammatisches Geschlecht. او (u) heißt „er“ und „sie“. „Ein“ kann man mit یک (yek) ausdrücken.",
      fa: { fa: "او دانشجو اَست.", um: "u dānešju ast.", de: "Er/Sie ist Student/Studentin." } },
    { b: "F", typ: "mc", frage: "Woran erkennt man im Persischen das bestimmte direkte Objekt?",
      a: ["an der Endung -en", "am Wörtchen rā (را)", "am Artikel", "gar nicht"], r: 1,
      erkl: "را (rā) steht nach dem bestimmten direkten Objekt – es übernimmt die Aufgabe, die im Deutschen der Akkusativ hat. Genau deshalb haben wir heute über Objekte gesprochen!" },
    { b: "F", typ: "umfrage", kurz: true, frage: "Wie fühlst du dich jetzt?",
      a: ["😎 bereit für Persisch", "🙂 ganz okay", "🤯 viel Neues", "🧐 ich will mehr Grammatik"],
      erkl: "Danke fürs Mitmachen! Alles, was wir heute über Objekte, Präpositionen und Partizipien gesagt haben, begegnet euch im Persischen wieder." }
  ]
};
