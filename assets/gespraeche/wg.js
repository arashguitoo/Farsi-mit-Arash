/* =========================================================
   Gesprächs-Simulation · Szenario „Unsere WG“
   Dialogdatenbank für live-gespraech.html (Lektion k03 – Wohnen)
   ---------------------------------------------------------
   Knotentypen: szene · rede · ende (siehe tag-planen.js)
   fa: [richtig, falsch, falsch, falsch]  (das Spiel mischt)
   Platzhalter: {alle} alle Namen · {S} wer den Satz gesagt hat ·
                {namen} in zusatz: wer die Option gewählt hat
   ========================================================= */
(function () {
  /* r2a/r2b/r2c teilen dieselben Optionen → zusatz für alle drei Knoten */
  const R2 = ["r2a", "r2b", "r2c"];
  const proR2 = (opt, z) => R2.map(k => Object.assign({ wenn: k + ":" + opt }, z));

  const KUEHL_OPT = [
    { id: "einkaufen", art: "einkaufen", label: { de: "einkaufen", fa: "خَرید" },
      de: "Ich gehe schnell einkaufen. Wir brauchen Brot, Eier und Milch.",
      fa: ["مَن سَریع بَرای خَرید می‌رَوَم. ما نان، تُخم‌مُرغ و شیر لازِم داریم.", "مَن سَریع بَرای خَرید رَفتَم. ما نان، تُخم‌مُرغ و شیر لازِم داریم.", "مَن سَریع بَرای خَرید می‌رَوَم. ما نان، تُخم‌مُرغ و پَنیر لازِم داریم.", "تو سَریع بَرای خَرید می‌رَوی. ما نان، تُخم‌مُرغ و شیر لازِم داریم."],
      um: "مَن سَریع می‌رَم خَرید. نون و تُخم‌مُرغ و شیر لازِم داریم." },
    { id: "pizza", art: "pizza", label: { de: "Pizza bestellen", fa: "پیتزا" },
      de: "Kein Problem! Heute Abend bestellen wir Pizza.",
      fa: ["مُشکِلی نیست! اِمشَب پیتزا سِفارِش می‌دَهیم.", "مُشکِلی نیست! دیشَب پیتزا سِفارِش دادیم.", "مُشکِلی نیست! اِمشَب پیتزا دُرُست می‌کُنیم.", "مُشکِلی نیست! فَردا شَب پیتزا سِفارِش می‌دَهیم."],
      um: "مُشکِلی نیست! اِمشَب پیتزا سِفارِش می‌دیم." },
    { id: "joghurt", art: "joghurt", label: { de: "Joghurt", fa: "ماست" },
      de: "Da ist noch ein Joghurt! Er ist nur vom letzten Monat.",
      fa: ["هَنوز یک ماست هَست! فَقَط مالِ ماهِ پیش اَست.", "هَنوز یک ماست هَست! فَقَط مالِ ماهِ بَعد اَست.", "هَنوز یک ماست بود! فَقَط مالِ ماهِ پیش بود.", "هَنوز یک پَنیر هَست! فَقَط مالِ ماهِ پیش اَست."],
      um: "هَنوز یه ماست هَست! فَقَط مالِ ماهِ پیشه." }
  ];

  const ZUR_TUER = [
    ...proR2("einkaufen", {
      de1: "{namen} kommt gerade mit vollen Einkaufstüten die Treppe hoch.", deN: "{namen} kommen gerade mit vollen Einkaufstüten die Treppe hoch.",
      fa1: "{namen} هَمین حالا با کیسه‌های پُرِ خَرید از پِلّه‌ها بالا می‌آیَد.", faN: "{namen} هَمین حالا با کیسه‌های پُرِ خَرید از پِلّه‌ها بالا می‌آیَند." }),
    ...proR2("joghurt", {
      de1: "{namen} isst gerade den alten Joghurt. Sehr mutig! 🥄", deN: "{namen} teilen sich gerade den alten Joghurt. Sehr mutig! 🥄",
      fa1: "{namen} دارَد ماستِ کُهنه را می‌خورَد. خِیلی شُجاعانه! 🥄", faN: "{namen} دارَند ماستِ کُهنه را با هم می‌خورَند. خِیلی شُجاعانه! 🥄" })
  ];

  const ABEND = [
    { wenn: "r3:einladen",
      de1: "{namen} hat Frau Schulz eingeladen – und tatsächlich: Um acht klingelt sie, mit Apfelkuchen! 🍰", deN: "{namen} haben Frau Schulz eingeladen – und tatsächlich: Um acht klingelt sie, mit Apfelkuchen! 🍰",
      fa1: "{namen} خانُم شولتس را دَعوَت کَرده اَست – و واقِعاً: ساعَتِ هَشت زَنگِ دَر را می‌زَنَد، با کیکِ سیب! 🍰", faN: "{namen} خانُم شولتس را دَعوَت کَرده‌اَند – و واقِعاً: ساعَتِ هَشت زَنگِ دَر را می‌زَنَد، با کیکِ سیب! 🍰" },
    ...proR2("pizza", {
      de1: "{namen} bestellt Pizza für alle. 🍕", deN: "{namen} bestellen Pizza für alle. 🍕",
      fa1: "{namen} بَرای هَمه پیتزا سِفارِش می‌دَهَد. 🍕", faN: "{namen} بَرای هَمه پیتزا سِفارِش می‌دَهَند. 🍕" }),
    ...proR2("einkaufen", {
      de1: "{namen} kocht mit den Einkäufen einen großen Topf Nudeln.", deN: "{namen} kochen mit den Einkäufen einen großen Topf Nudeln.",
      fa1: "{namen} با خَریدها یک قابلَمه‌ی بُزُرگ ماکارونی می‌پَزَد.", faN: "{namen} با خَریدها یک قابلَمه‌ی بُزُرگ ماکارونی می‌پَزَند." }),
    ...proR2("joghurt", {
      de1: "{namen} liegt mit Bauchschmerzen in der Ecke. Der Joghurt war wohl doch zu alt … 🤢", deN: "{namen} liegen mit Bauchschmerzen in der Ecke. Der Joghurt war wohl doch zu alt … 🤢",
      fa1: "{namen} با دِل‌دَرد گوشه‌ی اُتاق دِراز کِشیده اَست. اِنگار ماست واقِعاً زیادی کُهنه بود… 🤢", faN: "{namen} با دِل‌دَرد گوشه‌ی اُتاق دِراز کِشیده‌اَند. اِنگار ماست واقِعاً زیادی کُهنه بود… 🤢" })
  ];
  const ABEND_ZEIT = { de: "Sonntag, 20 Uhr", fa: "یِکشَنبه، ساعَتِ هَشتِ شَب" };

  (window.GESPRAECHE = window.GESPRAECHE || {})["wg"] = {
    id: "wg",
    titel: "Unsere WG",
    titelFa: "خانه‌ی مُشتَرَکِ ما",
    icon: "🏠",
    beschreibung: {
      de: "Ihr wohnt zusammen in einer WG in Kiel. Sonntag ist WG-Besprechung: Wer putzt das Bad? Warum ist der Kühlschrank leer? Dann klingelt die Nachbarin, die Heizung streikt und das Sofa bricht zusammen. Eure Antworten entscheiden, wie der Tag endet.",
      fa: "شُما با هم در یک خانه‌ی مُشتَرَک در کیل زِندِگی می‌کُنید. یِکشَنبه جَلَسه‌ی هَم‌خانه‌هاست: چه کَسی حَمّام را تَمیز می‌کُنَد؟ چِرا یَخچال خالی اَست؟ بَعد هَمسایه زَنگِ دَر را می‌زَنَد، شوفاژ کار نِمی‌کُنَد و مُبل می‌شِکَنَد. جَواب‌های شُما تَعیین می‌کُنَند که روز چِطور تَمام می‌شَوَد."
    },
    niveau: "Wiederholung Grundkurs (Präsens, Vergangenheit, Perfekt, Konjunktiv, Imperativ)",
    gruppe: { de: "WG Kiel 🏠", fa: "خانه‌ی مُشتَرَکِ کیل 🏠" },
    start: "e1",
    knoten: {
      /* ---------------- Episode 1: Sonntag, WG-Besprechung ---------------- */
      e1: { typ: "szene", ort: "kochen", zeit: { de: "Sonntag, 11 Uhr", fa: "یِکشَنبه، ساعَتِ یازدَه" },
        de: "{alle} wohnen zusammen in einer WG in Kiel. Auf dem Küchentisch stehen Kaffee und Kekse, daneben liegt ein leerer Zettel. Aus dem Lautsprecher kommt laute Musik. Zeit für die WG-Besprechung!",
        fa: "{alle} با هم در یک خانه‌ی مُشتَرَک در کیل زِندِگی می‌کُنَند. روی میزِ آشپَزخانه قَهوه و بیسکویت هَست و کِنارَش یک کاغَذِ سِفید. از بُلَندگو صِدای موسیقیِ بُلَند می‌آیَد. وَقتِ جَلَسه‌ی هَفتِگیِ هَم‌خانه‌هاست!",
        weiter: "r1" },
      r1: { typ: "rede", ort: "kochen",
        de: "Erster Punkt: der Putzplan. Wer putzt diese Woche das Bad?",
        fa: ["مُوضوعِ اَوَّل: بَرنامه‌ی نِظافَت. این هَفته چه کَسی حَمّام را تَمیز می‌کُنَد؟", "مُوضوعِ اَوَّل: بَرنامه‌ی نِظافَت. هَفته‌ی پیش چه کَسی حَمّام را تَمیز کَرد؟", "مُوضوعِ اَوَّل: بَرنامه‌ی نِظافَت. این هَفته چه کَسی آشپَزخانه را تَمیز می‌کُنَد؟", "مُوضوعِ اَوَّل: بَرنامه‌ی نِظافَت. این هَفته چه کَسی حَمّام را کَثیف می‌کُنَد؟"],
        um: "اَوَّلین مُوضوع: بَرنامه‌ی تَمیزکاری. این هَفته کی حَمّوم رو تَمیز می‌کُنه؟",
        antworten: "alle",
        optionen: [
          { id: "ich", art: "ja", label: { de: "ich!", fa: "مَن!" }, de: "Ich! Ich habe neue Gummihandschuhe gekauft.",
            fa: ["مَن! مَن دَستکِش‌های لاستیکیِ نو خَریده‌اَم.", "مَن! مَن دَستکِش‌های لاستیکیِ نو می‌خَرَم.", "تو! تو دَستکِش‌های لاستیکیِ نو خَریده‌ای.", "مَن! مَن دَستکِش‌های لاستیکیِ کُهنه خَریده‌اَم."],
            um: "مَن! دَستکِشای لاستیکیِ نو خَریدَم." },
          { id: "kueche", art: "nein", de: "Nein, ich putze lieber die Küche. Das Bad ist mir zu schmutzig!",
            fa: ["نه، مَن تَرجیح می‌دَهَم آشپَزخانه را تَمیز کُنَم. حَمّام بَرایَم زیادی کَثیف اَست!", "نه، مَن تَرجیح می‌دَهَم آشپَزخانه را تَمیز کُنَم. حَمّام بَرایَم زیادی تَمیز اَست!", "نه، مَن تَرجیح دادَم آشپَزخانه را تَمیز کُنَم. حَمّام بَرایَم زیادی کَثیف اَست!", "نه، مَن تَرجیح می‌دَهَم حَمّام را تَمیز کُنَم. آشپَزخانه بَرایَم زیادی کَثیف اَست!"],
            um: "نه، تَرجیح می‌دَم آشپَزخونه رو تَمیز کُنَم. حَمّوم بَرام زیادی کَثیفه!" },
          { id: "letzte", art: "nein", de: "Ich nicht! Ich habe es letzte Woche geputzt.",
            fa: ["مَن نه! مَن هَفته‌ی پیش آن را تَمیز کَردَم.", "مَن نه! مَن هَفته‌ی بَعد آن را تَمیز می‌کُنَم.", "مَن نه! تو هَفته‌ی پیش آن را تَمیز کَردی.", "مَن نه! مَن دیروز آن را تَمیز کَردَم."],
            um: "مَن نه! هَفته‌ی پیش مَن تَمیزِش کَردَم." },
          { id: "wuerfeln", art: "vielleicht", label: { de: "würfeln", fa: "تاس" }, de: "Lasst uns würfeln! Das ist am fairsten.",
            fa: ["بیایید تاس بِریزیم! این مُنصِفانه‌تَرین راه اَست.", "بیایید تاس ریختیم! این مُنصِفانه‌تَرین راه اَست.", "بیایید وَرَق بازی کُنیم! این مُنصِفانه‌تَرین راه اَست.", "بیایید تاس بِریزیم! این ناعادِلانه‌تَرین راه اَست."],
            um: "بیاین تاس بِریزیم! این از هَمه مُنصِفانه‌تَره." }
        ],
        weiter: { ja: "r2a", nein: "r2b", vielleicht: "r2c" } },

      /* ---------------- Der Kühlschrank ist leer ---------------- */
      r2a: { typ: "rede", ort: "kochen",
        de: "Danke! Nächster Punkt: Der Kühlschrank ist leer. Was machen wir?",
        fa: ["مَمنون! مُوضوعِ بَعدی: یَخچال خالی اَست. چه کار کُنیم؟", "مَمنون! مُوضوعِ بَعدی: یَخچال پُر اَست. چه کار کُنیم؟", "مَمنون! مُوضوعِ قَبلی: یَخچال خالی اَست. چه کار کُنیم؟", "مَمنون! مُوضوعِ بَعدی: یَخچال خالی بود. چه کار کَردیم؟"],
        um: "مِرسی! مُوضوعِ بَعدی: یَخچال خالیه. چی کار کُنیم؟",
        antworten: 2, optionen: KUEHL_OPT, weiter: "e3" },
      r2b: { typ: "rede", ort: "kochen",
        de: "Okay, dann putzen wir das Bad alle zusammen. Aber zuerst: Der Kühlschrank ist leer!",
        fa: ["باشه، پَس حَمّام را هَمه با هم تَمیز می‌کُنیم. اَمّا اَوَّل: یَخچال خالی اَست!", "باشه، پَس حَمّام را هَمه با هم تَمیز کَردیم. اَمّا اَوَّل: یَخچال خالی اَست!", "باشه، پَس حَمّام را هیچ‌کَس تَمیز نِمی‌کُنَد. اَمّا اَوَّل: یَخچال خالی اَست!", "باشه، پَس آشپَزخانه را هَمه با هم تَمیز می‌کُنیم. اَمّا اَوَّل: یَخچال خالی اَست!"],
        um: "باشه، پَس حَمّوم رو هَمه با هم تَمیز می‌کُنیم. وَلی اَوَّل: یَخچال خالیه!",
        antworten: 2, optionen: KUEHL_OPT, weiter: "e3" },
      r2c: { typ: "rede", ort: "kochen",
        de: "Na toll, ich habe eine Eins gewürfelt! Und der Kühlschrank ist auch leer.",
        fa: ["چه عالی، تاسِ مَن یک آمَد! یَخچال هم خالی اَست.", "چه عالی، تاسِ مَن شِش آمَد! یَخچال هم خالی اَست.", "چه عالی، تاسِ تو یک آمَد! یَخچال هم خالی اَست.", "چه عالی، تاسِ مَن یک آمَد! یَخچال هم پُر اَست."],
        um: "چه عالی، تاسَم یک اومَد! یَخچال هم خالیه.",
        antworten: 2, optionen: KUEHL_OPT, weiter: "e3" },

      /* ---------------- Episode 2: Die Nachbarin ---------------- */
      e3: { typ: "szene", zeit: { de: "Sonntag, 13 Uhr", fa: "یِکشَنبه، ساعَتِ یک" },
        de: "Plötzlich klingelt es an der Tür. Draußen steht Frau Schulz aus dem Erdgeschoss, im Bademantel und mit Kopfschmerzen: „Ihre Musik ist zu laut! Ich höre jeden Ton!“",
        fa: "ناگَهان زَنگِ دَر به صِدا دَرمی‌آیَد. پُشتِ دَر خانُم شولتس از طَبَقه‌ی هَمکَف ایستاده اَست، با حوله‌ی حَمّام و سَردَرد: «صِدای موسیقیِ شُما خِیلی بُلَند اَست! مَن هَمه‌ی صِداها را می‌شِنَوَم!»",
        zusatz: ZUR_TUER, weiter: "r3" },
      r3: { typ: "rede",
        de: "Oh nein! Wer hat die Musik so laut gemacht?",
        fa: ["وای نه! چه کَسی صِدای موسیقی را این‌قَدر بُلَند کَرده اَست؟", "وای نه! چه کَسی صِدای موسیقی را این‌قَدر کَم کَرده اَست؟", "وای نه! چه کَسی صِدای تِلِویزیون را این‌قَدر بُلَند کَرده اَست؟", "وای نه! چِرا صِدای موسیقی را این‌قَدر بُلَند کَرده‌اید؟"],
        um: "وای نه! کی صِدای آهَنگو این‌قَدر زیاد کَرده؟",
        antworten: "alle",
        optionen: [
          { id: "ichwars", art: "leiser", label: { de: "leiser machen", fa: "کَم کَردَن" }, de: "Das war ich … Entschuldigung, Frau Schulz! Ich mache sie sofort leiser.",
            fa: ["کارِ مَن بود… بِبَخشید، خانُم شولتس! هَمین حالا صِدایَش را کَم می‌کُنَم.", "کارِ تو بود… بِبَخشید، خانُم شولتس! هَمین حالا صِدایَش را کَم می‌کُنَم.", "کارِ مَن بود… بِبَخشید، خانُم شولتس! هَمین حالا صِدایَش را زیاد می‌کُنَم.", "کارِ مَن بود… بِبَخشید، خانُم شولتس! فَردا صِدایَش را کَم می‌کُنَم."],
            um: "کارِ مَن بود… بِبَخشید، خانُم شولتس! هَمین اَلان کَمِش می‌کُنَم." },
          { id: "kopfhoerer", art: "kopfhoerer", label: { de: "Kopfhörer", fa: "هِدفون" }, de: "Ab jetzt hören wir Musik nur mit Kopfhörern. Versprochen!",
            fa: ["از حالا فَقَط با هِدفون موسیقی گوش می‌دَهیم. قول می‌دَهیم!", "از حالا فَقَط بِدونِ هِدفون موسیقی گوش می‌دَهیم. قول می‌دَهیم!", "از حالا فَقَط با هِدفون موسیقی گوش دادیم. قول می‌دَهیم!", "از حالا فَقَط با هِدفون موسیقی گوش می‌دَهید. قول می‌دَهید!"],
            um: "از این به بَعد فَقَط با هِدفون آهَنگ گوش می‌دیم. قول می‌دیم!" },
          { id: "einladen", art: "einladen", label: { de: "einladen", fa: "دَعوَت" }, de: "Frau Schulz, kommen Sie doch heute Abend zu unserem WG-Abend!",
            fa: ["خانُم شولتس، اِمشَب به دورهَمیِ ما بیایید!", "خانُم شولتس، دیشَب به دورهَمیِ ما آمَدید!", "خانُم شولتس، اِمشَب به دورهَمیِ ما نَیایید!", "خانُم شولتس، اِمشَب به دورهَمیِ شُما می‌آییم!"],
            um: "خانُم شولتس، اِمشَب بیاین دورهَمیِ ما!" }
        ],
        weiter: { leiser: "e4leise", kopfhoerer: "e4leise", einladen: "e4einladen" } },
      e4leise: { typ: "szene",
        de: "Frau Schulz nickt zufrieden und geht wieder nach unten. Jetzt ist es ruhig in der WG – sehr ruhig. Und kalt. Sehr kalt. Jemand fasst die Heizung an: eiskalt! 🥶",
        fa: "خانُم شولتس با رِضایَت سَر تِکان می‌دَهَد و دوباره پایین می‌رَوَد. حالا خانه ساکِت اَست – خِیلی ساکِت. و سَرد. خِیلی سَرد. یِکی دَستَش را روی شوفاژ می‌گُذارَد: یَخ اَست! 🥶",
        weiter: "r4" },
      e4einladen: { typ: "szene",
        de: "Frau Schulz ist überrascht. Dann lächelt sie zum ersten Mal: „Gern! Ich bringe meinen Apfelkuchen mit.“ Kaum ist sie weg, merken alle: In der Wohnung ist es eiskalt. Die Heizung ist kaputt! 🥶",
        fa: "خانُم شولتس تَعَجُّب می‌کُنَد. بَعد بَرای اَوَّلین بار لَبخَند می‌زَنَد: «با کَمالِ مِیل! کیکِ سیبَم را هم می‌آوَرَم.» هَمین که او می‌رَوَد، هَمه می‌فَهمَند: خانه یَخ کَرده اَست. شوفاژ خَراب اَست! 🥶",
        weiter: "r4" },

      /* ---------------- Episode 3: Die Heizung ---------------- */
      r4: { typ: "rede",
        de: "Die Heizung ist kaputt. Rufen wir den Vermieter an oder reparieren wir sie selbst?",
        fa: ["شوفاژ خَراب اَست. به صاحِب‌خانه زَنگ بِزَنیم یا خودِمان تَعمیرَش کُنیم؟", "شوفاژ خَراب بود. به صاحِب‌خانه زَنگ زَدیم یا خودِمان تَعمیرَش کَردیم؟", "شوفاژ خَراب اَست. به هَمسایه زَنگ بِزَنیم یا خودِمان تَعمیرَش کُنیم؟", "شوفاژ خَراب اَست. به صاحِب‌خانه زَنگ بِزَنیم یا خودِتان تَعمیرَش کُنید؟"],
        um: "شوفاژ خَرابه. به صاحِب‌خونه زَنگ بِزَنیم یا خودِمون دُرُستِش کُنیم؟",
        antworten: "alle",
        optionen: [
          { id: "vermieter", art: "vermieter", label: { de: "Vermieter anrufen", fa: "صاحِب‌خانه" }, de: "Ich rufe Herrn Becker an. Das ist seine Aufgabe!",
            fa: ["مَن به آقای بِکِر زَنگ می‌زَنَم. این وَظیفه‌ی اوست!", "مَن به آقای بِکِر زَنگ زَدَم. این وَظیفه‌ی اوست!", "تو به آقای بِکِر زَنگ می‌زَنی. این وَظیفه‌ی اوست!", "مَن به آقای بِکِر زَنگ می‌زَنَم. این وَظیفه‌ی ماست!"],
            um: "مَن به آقای بِکِر زَنگ می‌زَنَم. این کارِ خودِشه!" },
          { id: "selbst", art: "selbst", label: { de: "selbst reparieren", fa: "خودِمان" }, de: "Das schaffen wir selbst! Ich habe ein Video im Internet gesehen.",
            fa: ["خودِمان می‌تَوانیم تَعمیرَش کُنیم! مَن یک ویدیو در اینتِرنِت دیده‌اَم.", "خودِمان نِمی‌تَوانیم تَعمیرَش کُنیم! مَن یک ویدیو در اینتِرنِت دیده‌اَم.", "خودِمان می‌تَوانیم تَعمیرَش کُنیم! مَن یک ویدیو در اینتِرنِت می‌بینَم.", "خودِمان می‌تَوانیم تَعمیرَش کُنیم! تو یک ویدیو در اینتِرنِت دیده‌ای."],
            um: "خودِمون می‌تونیم دُرُستِش کُنیم! یه ویدیو تو اینتِرنِت دیدَم." },
          { id: "pulli", art: "pulli", label: { de: "Pullover anziehen", fa: "ژاکَت" }, de: "Lasst uns einfach dicke Pullover anziehen. Das ist billiger!",
            fa: ["بیایید فَقَط ژاکَت‌های کُلُفت بِپوشیم. این اَرزان‌تَر اَست!", "بیایید فَقَط ژاکَت‌های نازُک بِپوشیم. این اَرزان‌تَر اَست!", "بیایید فَقَط ژاکَت‌های کُلُفت بِپوشیم. این گِران‌تَر اَست!", "بیایید فَقَط ژاکَت‌های کُلُفت پوشیدیم. این اَرزان‌تَر اَست!"],
            um: "بیاین فَقَط ژاکَتای کُلُفت بِپوشیم. این اَرزون‌تَره!" }
        ],
        weiter: { vermieter: "e5verm", selbst: "e5selbst", pulli: "e5pulli" } },
      e5verm: { typ: "szene", ort: "telefon",
        de: "Herr Becker geht erst nach dem zehnten Klingeln ans Telefon. Im Hintergrund hört man Möwen und Meer – er ist im Urlaub auf Mallorca! „Der Handwerker kommt am Mittwoch“, sagt er. Bis dahin sitzen alle unter Decken auf dem alten Sofa. Plötzlich: KRACK! Ein Sofabein ist ab.",
        fa: "آقای بِکِر بَعد از دَهُمین زَنگ گوشی را بَرمی‌دارَد. از پُشتِ تِلِفُن صِدای دَریا و مُرغ‌های دَریایی می‌آیَد – او در مایورکا در تَعطیلات اَست! می‌گویَد: «تَعمیرکار چَهارشَنبه می‌آیَد.» تا آن مُوقِع هَمه زیرِ پَتو روی مُبلِ قَدیمی می‌نِشینَند. ناگَهان: تَرَق! یِکی از پایه‌های مُبل می‌شِکَنَد.",
        weiter: "r5" },
      e5selbst: { typ: "szene",
        de: "Das Video ist auf Englisch und dauert zwölf Minuten. Nach einer Stunde, zwei kaputten Schraubenziehern und viel Wasser auf dem Boden zischt die Heizung – und wird warm! Alle jubeln und springen aufs alte Sofa. KRACK! Ein Sofabein ist ab.",
        fa: "ویدیو اِنگِلیسی اَست و دَوازدَه دَقیقه طول می‌کِشَد. بَعد از یک ساعَت، دو پیچ‌گوشتیِ شِکَسته و کُلّی آب روی زَمین، شوفاژ صِدا می‌دَهَد – و گَرم می‌شَوَد! هَمه هورا می‌کِشَند و روی مُبلِ قَدیمی می‌پَرَند. تَرَق! یِکی از پایه‌های مُبل می‌شِکَنَد.",
        weiter: "r5" },
      e5pulli: { typ: "szene",
        de: "Zehn Minuten später sitzen alle in dicken Pullovern, mit Mützen und Schals auf dem alten Sofa. Es sieht aus wie eine Expedition zum Nordpol. Dann: KRACK! Ein Sofabein ist ab – das Sofa hat genug.",
        fa: "دَه دَقیقه بَعد هَمه با ژاکَت‌های کُلُفت، کُلاه و شال‌گَردَن روی مُبلِ قَدیمی نِشَسته‌اَند. شَبیهِ یک سَفَر به قُطبِ شُمال اَست. بَعد: تَرَق! یِکی از پایه‌های مُبل می‌شِکَنَد – مُبل دیگَر خَسته شُده اَست.",
        weiter: "r5" },

      /* ---------------- Episode 4: Das Sofa ---------------- */
      r5: { typ: "rede",
        de: "Unser Sofa ist kaputt. Kaufen wir ein neues oder ein gebrauchtes?",
        fa: ["مُبلِ ما خَراب شُده اَست. یک مُبلِ نو بِخَریم یا یک مُبلِ دَست‌دُوُّم؟", "مُبلِ ما خَراب شُده اَست. یک مُبلِ نو خَریدیم یا یک مُبلِ دَست‌دُوُّم؟", "مُبلِ ما خَراب شُده اَست. یک تَختِ نو بِخَریم یا یک تَختِ دَست‌دُوُّم؟", "مُبلِ شُما خَراب شُده اَست. یک مُبلِ نو بِخَرید یا یک مُبلِ دَست‌دُوُّم؟"],
        um: "مُبلِمون خَراب شُده. یه مُبلِ نو بِخَریم یا دَست‌دُوُّم؟",
        antworten: "alle",
        optionen: [
          { id: "neu", art: "neu", label: { de: "neu", fa: "نو" }, de: "Ein neues! Wir sitzen doch jeden Abend darauf.",
            fa: ["یک مُبلِ نو! ما هَر شَب رویَش می‌نِشینیم.", "یک مُبلِ نو! ما هَر شَب رویَش نِشَستیم.", "یک مُبلِ نو! ما هَر صُبح رویَش می‌نِشینیم.", "یک مُبلِ کُهنه! ما هَر شَب رویَش می‌نِشینیم."],
            um: "یه مُبلِ نو! ما هَر شَب روش می‌شینیم." },
          { id: "gebraucht", art: "gebraucht", label: { de: "gebraucht", fa: "دَست‌دُوُّم" }, de: "Ein gebrauchtes. Neue Sofas sind viel zu teuer.",
            fa: ["یک مُبلِ دَست‌دُوُّم. مُبل‌های نو خِیلی گِران هَستَند.", "یک مُبلِ دَست‌دُوُّم. مُبل‌های نو خِیلی اَرزان هَستَند.", "یک مُبلِ دَست‌دُوُّم. مُبل‌های نو خِیلی گِران بودَند.", "یک مُبلِ نو. مُبل‌های دَست‌دُوُّم خِیلی گِران هَستَند."],
            um: "یه مُبلِ دَست‌دُوُّم. مُبلای نو خِیلی گِرونَن." },
          { id: "strasse", art: "gebraucht", prio: 1, label: { de: "gebraucht", fa: "دَست‌دُوُّم" }, de: "Gebraucht! Heute Morgen habe ich eins auf der Straße gesehen – kostenlos!",
            fa: ["دَست‌دُوُّم! اِمروز صُبح یِکی را در خیابان دیدَم – مَجّانی!", "دَست‌دُوُّم! فَردا صُبح یِکی را در خیابان می‌بینَم – مَجّانی!", "دَست‌دُوُّم! اِمروز صُبح یِکی را در مَغازه دیدَم – مَجّانی!", "دَست‌دُوُّم! اِمروز صُبح یِکی را در خیابان دیدی – مَجّانی!"],
            um: "دَست‌دُوُّم! اِمروز صُبح یِکی تو خیابون دیدَم – مُفتی!" },
          { id: "kleben", art: "kleben", label: { de: "reparieren", fa: "تَعمیر" }, de: "Keins! Wir reparieren das alte mit Klebeband.",
            fa: ["هیچ‌کُدام! مُبلِ قَدیمی را با چَسبِ نَواری تَعمیر می‌کُنیم.", "هیچ‌کُدام! مُبلِ قَدیمی را با چَسبِ نَواری تَعمیر کَردیم.", "هیچ‌کُدام! مُبلِ جَدید را با چَسبِ نَواری تَعمیر می‌کُنیم.", "هیچ‌کُدام! مُبلِ قَدیمی را با چَکُش تَعمیر می‌کُنیم."],
            um: "هیچ‌کُدوم! مُبلِ قَدیمی رو با چَسب دُرُست می‌کُنیم." }
        ],
        weiter: { neu: "e6neu", gebraucht: "e6gebr", kleben: "e6kleben" },
        ziele: { strasse: "e6strasse" } },

      /* ---------------- Episode 5: WG-Abend ---------------- */
      e6neu: { typ: "szene", ort: "wohnzimmer", zeit: ABEND_ZEIT,
        de: "Das neue Sofa ist bestellt – Lieferung in sechs Wochen. Heute Abend sitzen alle mit Kissen, Decken und Kerzen auf dem Boden. Ehrlich gesagt: sehr gemütlich. Der WG-Abend beginnt!",
        fa: "مُبلِ نو را سِفارِش داده‌اَند – شِش هَفته‌ی دیگَر می‌رَسَد. اِمشَب هَمه با کوسَن، پَتو و شَمع روی زَمین می‌نِشینَند. راستَش را بِخواهید: خِیلی دِنج اَست. دورهَمیِ خانه شُروع می‌شَوَد!",
        zusatz: ABEND, weiter: "r6" },
      e6gebr: { typ: "szene", ort: "wohnzimmer", zeit: ABEND_ZEIT,
        de: "Im Internet finden {alle} ein grünes Sofa für 40 Euro. Es ist schwer, das Treppenhaus ist eng – aber um acht steht es im Wohnzimmer. Es riecht ein bisschen nach Katze. Der WG-Abend beginnt!",
        fa: "{alle} در اینتِرنِت یک مُبلِ سَبز به قِیمَتِ چِهِل یورو پِیدا می‌کُنَند. مُبل سَنگین اَست و راه‌پِلّه باریک – اَمّا ساعَتِ هَشت در اُتاقِ نِشیمَن اَست. کَمی بوی گُربه می‌دَهَد. دورهَمیِ خانه شُروع می‌شَوَد!",
        zusatz: ABEND, weiter: "r6" },
      e6strasse: { typ: "szene", ort: "wohnzimmer", zeit: ABEND_ZEIT,
        de: "Das Sofa von der Straße ist rosa und hat große Blumen. Zusammen tragen es alle quer durch die Stadt, die Leute schauen komisch. Aber es ist super bequem! Der WG-Abend beginnt!",
        fa: "مُبلی که در خیابان پِیدا کَرده‌اَند صورَتی اَست و گُل‌های دُرُشت دارَد. هَمه با هم آن را از این سَرِ شَهر تا آن سَرِ شَهر می‌بَرَند و مَردُم با تَعَجُّب نِگاه می‌کُنَند. اَمّا خِیلی راحَت اَست! دورهَمیِ خانه شُروع می‌شَوَد!",
        zusatz: ABEND, weiter: "r6" },
      e6kleben: { typ: "szene", ort: "wohnzimmer", zeit: ABEND_ZEIT,
        de: "Eine ganze Rolle Klebeband später steht das alte Sofa wieder – ein bisschen schief, aber es steht. Neue WG-Regel: Niemand setzt sich auf die linke Seite! Der WG-Abend beginnt!",
        fa: "بَعد از یک حَلقه چَسبِ نَواری، مُبلِ قَدیمی دوباره سَرِ پاست – کَمی کَج، اَمّا سَرِ پاست. قانونِ جَدیدِ خانه: هیچ‌کَس روی سَمتِ چَپ نِمی‌نِشینَد! دورهَمیِ خانه شُروع می‌شَوَد!",
        zusatz: ABEND, weiter: "r6" },
      r6: { typ: "rede", ort: "wohnzimmer",
        de: "Auf unsere WG! Was war heute das Beste?",
        fa: ["به سَلامَتیِ خانه‌ی مُشتَرَکِ ما! بِهتَرین چیزِ اِمروز چه بود؟", "به سَلامَتیِ خانه‌ی مُشتَرَکِ ما! بَدتَرین چیزِ اِمروز چه بود؟", "به سَلامَتیِ خانه‌ی مُشتَرَکِ ما! بِهتَرین چیزِ دیروز چه بود؟", "به سَلامَتیِ خانه‌ی مُشتَرَکِ شُما! بِهتَرین چیزِ اِمروز چه بود؟"],
        um: "به سَلامَتیِ خونه‌مون! بِهتَرین چیزِ اِمروز چی بود؟",
        antworten: 2,
        optionen: [
          { id: "wir", art: "wir", label: { de: "ihr", fa: "شُما" }, de: "Ihr! Ihr seid die beste WG der Welt.",
            fa: ["شُما! شُما بِهتَرین هَم‌خانه‌های دُنیا هَستید.", "شُما! شُما بَدتَرین هَم‌خانه‌های دُنیا هَستید.", "شُما! شُما بِهتَرین هَمسایه‌های دُنیا هَستید.", "شُما! شُما بِهتَرین هَم‌خانه‌های دُنیا بودید."],
            um: "شُماها! شُما بِهتَرین هَم‌خونه‌های دُنیایین." },
          { id: "schulz", art: "schulz", label: { de: "Frau Schulz", fa: "خانُم شولتس" }, de: "Frau Schulz! Eigentlich ist sie sehr nett.",
            fa: ["خانُم شولتس! در واقِع او خِیلی مِهرَبان اَست.", "خانُم شولتس! در واقِع او خِیلی بَداَخلاق اَست.", "خانُم شولتس! در واقِع او خِیلی مِهرَبان بود.", "آقای بِکِر! در واقِع او خِیلی مِهرَبان اَست."],
            um: "خانُم شولتس! راستِش خِیلی مِهرَبونه." },
          { id: "chaos", art: "chaos", label: { de: "das Chaos", fa: "شُلوغی" }, de: "Das Chaos! Mit euch ist es nie langweilig.",
            fa: ["این هَمه شُلوغی! با شُما هیچ‌وَقت حوصِله‌اَم سَر نِمی‌رَوَد.", "این هَمه شُلوغی! با شُما هَمیشه حوصِله‌اَم سَر می‌رَوَد.", "این هَمه شُلوغی! با شُما هیچ‌وَقت حوصِله‌اَم سَر نَرَفت.", "این هَمه شُلوغی! با شُما هیچ‌وَقت حوصِله‌اَت سَر نِمی‌رَوَد."],
            um: "این هَمه شُلوغی! با شُما هیچ‌وَقت حوصِله‌م سَر نِمی‌رِه." }
        ],
        weiter: { wir: "endeWir", schulz: "endeSchulz", chaos: "endeChaos" } },

      endeWir: { typ: "ende", ort: "kochen",
        de: "Spät in der Nacht hängt ein neuer Zettel am Kühlschrank: „WG-Regel Nr. 1: Sonntags essen wir zusammen.“ Darunter haben alle unterschrieben. Und diese Geschichte? Die habt ihr gerade selbst geschrieben.",
        fa: "نیمه‌شَب یک کاغَذِ جَدید روی یَخچال اَست: «قانونِ شُماره‌ی یِکِ خانه: یِکشَنبه‌ها با هم غَذا می‌خوریم.» هَمه زیرَش را اِمضا کَرده‌اَند. و این داستان؟ این داستان را خودِتان هَمین حالا نِوِشتید." },
      endeSchulz: { typ: "ende", ort: "wohnzimmer",
        de: "Um elf klingelt es wieder. Alle erschrecken – Frau Schulz! Aber diesmal sagt sie: „Können Sie das Lied noch einmal spielen? Lauter, bitte!“ Und diese Geschichte? Die habt ihr gerade selbst geschrieben.",
        fa: "ساعَتِ یازدَه دوباره زَنگِ دَر به صِدا دَرمی‌آیَد. هَمه می‌تَرسَند – خانُم شولتس! اَمّا این بار می‌گویَد: «می‌شَوَد آن آهَنگ را یک بارِ دیگَر پَخش کُنید؟ بُلَندتَر، لُطفاً!» و این داستان؟ این داستان را خودِتان هَمین حالا نِوِشتید." },
      endeChaos: { typ: "ende", ort: "kochen",
        de: "Um Mitternacht schauen alle in die Küche: Teller, Gläser, Krümel … Jemand fragt: „Wer putzt das?“ Stille. Dann sagen alle gleichzeitig: „Das besprechen wir nächsten Sonntag!“ Und diese Geschichte? Die habt ihr gerade selbst geschrieben.",
        fa: "نیمه‌شَب هَمه به آشپَزخانه نِگاه می‌کُنَند: بُشقاب، لیوان، خُرده‌های نان… یِکی می‌پُرسَد: «چه کَسی این‌ها را تَمیز می‌کُنَد؟» سُکوت. بَعد هَمه با هم می‌گویَند: «یِکشَنبه‌ی بَعد دَرباره‌اَش حَرف می‌زَنیم!» و این داستان؟ این داستان را خودِتان هَمین حالا نِوِشتید." }
    }
  };
})();
