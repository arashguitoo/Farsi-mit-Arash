/* Live-Aktivität „Das Geheimnis von Omas Truhe“ – Inhalte.
   2er-Teams (Rolle A und B). Jede Station: Teil a (Puzzle, nur gemeinsam lösbar) → Teil b (Fragen, abwechselnd A/B).
   Code der Truhe: 7 – 4 – 2 – 5 */
window.TRUHE = {
  titel: "Das Geheimnis von Omas Truhe",
  titelFa: "رازِ صندوقچه‌ی مادربزرگ",
  code: [7, 4, 2, 5],
  intro: {
    de: "Oma Parvin (82) hat im Keller ihre alte Holztruhe gefunden. Sie ist mit einem Zahlenschloss verschlossen – und Oma hat den Code vergessen! Sie weiß nur noch: Die vier Ziffern hat sie vor vielen Jahren in alten Dingen versteckt – in einem Brief, einem Fotoalbum, einem Stadtplan und einem Telefonat. Helft ihrer Enkelin Neda, die Truhe zu öffnen!",
    fa: "مادربزرگ پروین صندوقچه‌ی قدیمی‌اش را در زیرزمین پیدا کرده است، اما رمزِ قفلش را فراموش کرده است. چهار رقمِ رمز در یک نامه، یک آلبومِ عکس، یک نقشه و یک تلفن پنهان شده‌اند.",
    regeln: ["Ihr arbeitet zu zweit: <b>Person A</b> und <b>Person B</b>. Jede Person sieht nur <b>ihren Teil</b> der Hinweise.",
      "Sprecht <b>auf Persisch</b> miteinander: Lest eure Karten vor, beschreibt, fragt nach.",
      "Bei den Fragen ist abwechselnd A oder B dran – die andere Person darf helfen, aber nicht klicken.",
      "Jede Station bringt euch eine Ziffer. Mit allen vier Ziffern öffnet ihr die Truhe.",
      "Fehler und Tipps kosten Punkte – Schnelligkeit allein gewinnt nicht!"]
  },
  stationen: [
    { nr: 1, titel: "Der Brief", fa: "نامه", icon: "✉️", minuten: 25,
      auftrag: "1970 ist Parvin von Schiras nach Teheran gezogen. Diesen Brief hat sie ihrer Schwester Simin geschrieben. Jede/r von euch hat 5 der 10 Abschnitte. <b>Lest euch eure Abschnitte vor</b> und bringt den Brief gemeinsam in die richtige Reihenfolge.",
      typ: "ordnen",
      teile: [
        { id: "a1", wer: "A", fa: "سیمینِ عزیزم، سلام! امیدوارم حالت خوب باشد. حالا یک هفته است که در تهران هستم و هنوز همه‌چیز برایم تازه است." },
        { id: "b1", wer: "B", fa: "وقتی از اتوبوسِ شیراز پیاده شدم، شهر خیلی بزرگ و شلوغ بود. صدای ماشین‌ها از همه طرف می‌آمد و من کمی ترسیده بودم." },
        { id: "a2", wer: "A", fa: "خاله منیژه در ایستگاه منتظرم بود. او مرا به خانه‌اش برد که در یک کوچه‌ی آرام نزدیکِ پارک است." },
        { id: "b2", wer: "B", fa: "روزِ اولِ کارم در روزنامه خیلی هیجان‌انگیز بود. صبحِ زود با اتوبوسِ شماره‌ی هفت به دفترِ روزنامه رفتم." },
        { id: "b3", wer: "B", fa: "رئیسم، آقای کاظمی، مردی است که همیشه عینکِ گرد می‌زند و خیلی تند حرف می‌زند. او یک دوربینِ قدیمی به من داد و گفت: «امروز از بازار عکس بگیر!»" },
        { id: "a3", wer: "A", fa: "من تا آن روز هرگز تنها در بازارِ تهران نبودم. در بازار گم شدم، اما یک فروشنده‌ی مهربان راه را نشانم داد." },
        { id: "a4", wer: "A", fa: "عصر عکس‌هایم را به آقای کاظمی نشان دادم. او گفت: «عکس‌هایت خیلی خوب‌اند! تو یک روز عکاسِ معروفی خواهی شد.»" },
        { id: "b4", wer: "B", fa: "خیلی خوشحال شدم و آن شب برای اولین بار در تهران خوب خوابیدم." },
        { id: "a5", wer: "A", fa: "راستی، یک رازِ کوچک: اولین رقمِ رمزِ صندوقچه‌ام شماره‌ی همان اتوبوسِ روزِ اول است." },
        { id: "b5", wer: "B", fa: "دلم برای تو و مامان خیلی تنگ شده است. زود برایم نامه بنویس! با عشق، پروین" }
      ],
      loesung: ["a1", "b1", "a2", "b2", "b3", "a3", "a4", "b4", "a5", "b5"],
      tipps: ["Der Brief beginnt mit der Anrede <span class='fa'>سیمینِ عزیزم</span> und endet mit dem Gruß <span class='fa'>با عشق</span>.",
        "Die Geschichte: Ankunft in Teheran → Tante am Busbahnhof → erster Arbeitstag → der Chef → im Basar → am Abend → glücklich ins Bett → das Geheimnis → Gruß."],
      fragen: [
        { wer: "A", frage: "<span class='fa'>من کمی ترسیده بودم</span> – welche Zeitform ist das?", opt: ["Plusquamperfekt", "Präteritum", "Perfekt"] },
        { wer: "B", frage: "Wer hat am Busbahnhof auf Parvin gewartet?", opt: ["Tante Manijeh", "Simin", "Herr Kazemi"] },
        { wer: "A", frage: "<span class='fa'>… خانه‌اش که در یک کوچه‌ی آرام … است</span> – worauf bezieht sich <span class='fa'>که</span>?", opt: ["auf das Haus", "auf die Tante", "auf den Park"] },
        { wer: "B", frage: "Was hat Herr Kazemi Parvin gegeben?", opt: ["eine alte Kamera", "eine runde Brille", "eine Busfahrkarte"] },
        { wer: "A", frage: "<span class='fa'>تو یک روز عکاسِ معروفی خواهی شد</span> – welche Zeitform ist <span class='fa'>خواهی شد</span>?", opt: ["Futur", "Präteritum", "Perfekt"] },
        { wer: "B", frage: "🔑 Und jetzt: Was ist die <b>erste Ziffer</b> des Codes?", opt: ["7", "3", "1"], ziffer: 7 }
      ] },
    { nr: 2, titel: "Das Fotoalbum", fa: "آلبومِ عکس", icon: "📷", minuten: 20,
      auftrag: "In Omas Album steckt ein Zettel. <b>B</b> hat den Zettel und liest ihn vor. <b>A</b> sieht sechs Fotos, die sich sehr ähnlich sehen – nur eins passt genau. Fragt nach, wenn etwas unklar ist!",
      typ: "suchbild",
      beschreibung: [
        "عکسی که دنبالش هستید، در شیراز گرفته شده است.",
        "در آن عکس، من و سیمین جلوی یک درِ سبز ایستاده‌ایم.",
        "سیمین از من بلندتر است و یک کلاهِ قرمز سرش است.",
        "کنارِ در یک دوچرخه است، اما درخت نیست.",
        "روی دیوار یک گربه‌ی سفید خوابیده است.",
        "عددی که روی در است، دومین رقمِ رمز است."
      ],
      fotos: [
        { id: "f1", tuer: "#4f8a5b", groesser: "S", hut: "S", neben: "rad", katze: "weiss", nr: 4 },
        { id: "f2", tuer: "#4f8a5b", groesser: "P", hut: "S", neben: "rad", katze: "weiss", nr: 9 },
        { id: "f3", tuer: "#3f6fa8", groesser: "S", hut: "S", neben: "rad", katze: "weiss", nr: 6 },
        { id: "f4", tuer: "#4f8a5b", groesser: "S", hut: "P", neben: "rad", katze: "weiss", nr: 1 },
        { id: "f5", tuer: "#4f8a5b", groesser: "S", hut: "S", neben: "baum", katze: "weiss", nr: 3 },
        { id: "f6", tuer: "#4f8a5b", groesser: "S", hut: "S", neben: "rad", katze: "schwarz", nr: 8 }
      ],
      richtig: "f1",
      beschreiben: { text: "Gut gefunden! Jetzt beschreibt <b>A</b> das Foto mit eigenen Worten (3–5 Sätze, auf Persisch). <b>B</b> hakt ab, was A erwähnt:",
        liste: ["die Farbe der Tür <span class='fa'>(درِ سبز)</span>", "wer größer ist <span class='fa'>(… از … بلندتر است)</span>", "der Hut <span class='fa'>(کلاهِ قرمز)</span>", "das Fahrrad <span class='fa'>(دوچرخه)</span>", "die Katze <span class='fa'>(گربه‌ی سفید)</span>"], mind: 4 },
      tipps: ["Prüft jedes Detail einzeln: Tür – wer ist größer – wer trägt den Hut – Fahrrad oder Baum – Farbe der Katze.",
        "<span class='fa'>بلندتر</span> = größer. Die Tür ist grün, und Simin trägt den roten Hut."],
      fragen: [
        { wer: "A", frage: "<span class='fa'>سیمین از من بلندتر است</span> bedeutet:", opt: ["Simin ist größer als ich.", "Simin ist am größten.", "Ich bin größer als Simin."] },
        { wer: "B", frage: "<span class='fa'>روی دیوار یک گربه خوابیده است</span> – welche Zeitform?", opt: ["Perfekt", "Präteritum", "Präsens"] },
        { wer: "A", frage: "🔑 Was ist die <b>zweite Ziffer</b> des Codes?", opt: ["4", "9", "6"], ziffer: 4 }
      ] },
    { nr: 3, titel: "Der Stadtplan", fa: "نقشه", icon: "🗺️", minuten: 25,
      auftrag: "In Omas Notizbuch steht der Weg zu ihrem ersten Fotoatelier. <b>B</b> liest die Wegbeschreibung vor, <b>A</b> folgt auf dem Stadtplan und tippt auf das richtige Haus. Auf dem Plan bedeutet <span class='fa'>بالا</span> oben, <span class='fa'>پایین</span> unten, <span class='fa'>راست</span> rechts und <span class='fa'>چپ</span> links.",
      typ: "karte",
      /* 7×7-Raster: Häuserblöcke auf geraden Koordinaten, Straßen dazwischen */
      bloecke: {
        "0,0": { e: "🏫", fa: "مدرسه" }, "0,2": { haus: "#e9c94a", nr: 5 }, "0,4": { e: "🌳", fa: "پارک" }, "0,6": { haus: "#7fb07f", nr: 8 },
        "2,0": { e: "🏦", fa: "بانک" }, "2,2": { e: "🥖", fa: "نانوایی" }, "2,4": { e: "💊", fa: "داروخانه" }, "2,6": { haus: "#e9c94a", nr: 9 },
        "4,0": { haus: "#e9c94a", nr: 6 }, "4,2": { e: "📚", fa: "کتاب‌فروشی" }, "4,4": { haus: "#e9c94a", nr: 2 }, "4,6": { e: "📮", fa: "پست" },
        "6,0": { haus: "#7fb07f", nr: 7 }, "6,2": { e: "💐", fa: "گل‌فروشی" }, "6,4": { e: "☕", fa: "کافه" }, "6,6": { haus: "#e9c94a", nr: 1 }
      },
      start: "6,1",
      wege: [
        { liest: "B", sucht: "A", titel: "Zum Fotoatelier",
          text: ["از ایستگاهِ مترو بیرون بیا و مستقیم به سمتِ بالا برو.",
            "از کنارِ کتاب‌فروشی و نانوایی رد شو.",
            "وقتی به مدرسه رسیدی، به سمتِ راست بپیچ.",
            "از کنارِ پارک رد شو و در چهارراهِ بعدی به سمتِ پایین بپیچ.",
            "آتلیه‌ی من در ساختمانِ زردی است که بینِ داروخانه و کافه است.",
            "شماره‌ی این ساختمان، سومین رقمِ رمز است."],
          ziel: "4,4" },
        { liest: "A", sucht: "B", titel: "Vom Atelier zu Tante Manijeh",
          text: ["از آتلیه بیرون بیا و به سمتِ پایین برو تا به کافه برسی.",
            "در چهارراه به سمتِ چپ بپیچ و مستقیم برو.",
            "از کنارِ گل‌فروشی رد شو.",
            "خانه‌ی خاله منیژه سبز است و درست کنارِ ایستگاهِ مترو است."],
          ziel: "6,0" }
      ],
      tipps: ["Startet beim Metro-Zeichen 🚇 unten links. <span class='fa'>بالا</span> = auf dem Plan nach oben.",
        "Das Atelier liegt zwischen der Apotheke 💊 und dem Café ☕ – und das Haus von Tante Manijeh ist das grüne Haus neben der Metro."],
      fragen: [
        { wer: "B", frage: "Imperativ von <span class='fa'>رفتن</span> (du):", opt: ["<span class='fa'>برو</span>", "<span class='fa'>بروی</span>", "<span class='fa'>رفتی</span>"] },
        { wer: "A", frage: "<span class='fa'>بپیچ</span> kommt von …", opt: ["<span class='fa'>پیچیدن</span> – abbiegen", "<span class='fa'>پختن</span> – kochen", "<span class='fa'>پوشیدن</span> – anziehen"] },
        { wer: "B", frage: "<span class='fa'>وقتی به مدرسه رسیدی، …</span> bedeutet:", opt: ["Sobald du bei der Schule angekommen bist, …", "Weil du in der Schule warst, …", "Bevor du zur Schule gehst, …"] },
        { wer: "A", frage: "🔑 Was ist die <b>dritte Ziffer</b> des Codes?", opt: ["2", "9", "1"], ziffer: 2 }
      ] },
    { nr: 4, titel: "Das Telefonat", fa: "تلفن", icon: "☎️", minuten: 20,
      auftrag: "1985: Parvin ruft ihre Schwester Simin an. <b>A</b> hat Parvins Sätze, <b>B</b> hat Simins Sätze. Lest euch eure Sätze vor und bringt das Telefonat in die richtige Reihenfolge.",
      typ: "ordnen",
      teile: [
        { id: "s1", wer: "B", fa: "سیمین: الو؟ پروین، تویی؟ صدایت خیلی ضعیف است!" },
        { id: "p1", wer: "A", fa: "پروین: سلام سیمین جان! بله، منم. از تلفنِ خانه‌ی همسایه زنگ می‌زنم." },
        { id: "s2", wer: "B", fa: "سیمین: چه خبر؟ کارت در روزنامه چطور است؟" },
        { id: "p2", wer: "A", fa: "پروین: عالی است! فردا برای یک گزارش به اصفهان می‌روم و برایت یک هدیه می‌خرم." },
        { id: "s3", wer: "B", fa: "سیمین: وای، چه خوب! من هم دوست دارم با تو بیایم!" },
        { id: "p3", wer: "A", fa: "پروین: دفعه‌ی بعد با هم می‌رویم. راستی، صندوقچه‌ای که مامان به من داد، حالا در خانه‌ی من است." },
        { id: "s4", wer: "B", fa: "سیمین: همان صندوقچه‌ی چوبی؟ رمزش را عوض کردی؟" },
        { id: "p4", wer: "A", fa: "پروین: بله! آخرین رقمش تعدادِ نوه‌هایی است که آرزو دارم یک روز داشته باشم." },
        { id: "s5", wer: "B", fa: "سیمین: تو هنوز بچه هم نداری! چند تا نوه می‌خواهی؟" },
        { id: "p5", wer: "A", fa: "پروین: پنج تا! هر چه بیشتر، بهتر!" }
      ],
      loesung: ["s1", "p1", "s2", "p2", "s3", "p3", "s4", "p4", "s5", "p5"],
      rollenspiel: "Super! Lest das Telefonat jetzt <b>mit verteilten Rollen</b> laut vor: A ist Parvin, B ist Simin. Achtet auf die Betonung bei Fragen und Ausrufen. Wenn ihr fertig seid, bestätigt beide.",
      tipps: ["Simin ruft nicht an – sie nimmt den Hörer ab: <span class='fa'>الو؟</span>",
        "Erst geht es um die Arbeit und die Reise nach Isfahan, dann um die Truhe – und ganz am Ende um die Enkel."],
      fragen: [
        { wer: "A", frage: "Was möchte Simin?", opt: ["mit Parvin nach Isfahan fahren", "ein Geschenk kaufen", "bei der Zeitung arbeiten"] },
        { wer: "B", frage: "Wohin fährt Parvin morgen?", opt: ["nach Isfahan", "nach Schiras", "nach Teheran"] },
        { wer: "A", frage: "<span class='fa'>آرزو دارم … داشته باشم</span> – welche Form ist <span class='fa'>داشته باشم</span>?", opt: ["Konjunktiv", "Präteritum", "Futur"] },
        { wer: "B", frage: "🔑 Was ist die <b>vierte Ziffer</b> des Codes?", opt: ["5", "2", "7"], ziffer: 5 }
      ] },
    { nr: 5, titel: "Das Schloss", fa: "قفل", icon: "🔒", minuten: 5,
      auftrag: "Jetzt wird es spannend! <b>A</b> stellt die ersten beiden Ziffern ein, <b>B</b> die letzten beiden. Erst wenn beide fertig sind, könnt ihr die Truhe öffnen.",
      typ: "schloss",
      tipps: ["Schaut ins Notizbuch: Jede Station hat euch eine Ziffer gegeben – in der richtigen Reihenfolge."] }
  ],
  ende: {
    brief: ["عزیزانِ من، سلام!",
      "شما این نامه را می‌خوانید، پس رمزِ صندوقچه را پیدا کرده‌اید. آفرین!",
      "در این صندوقچه چند چیزِ کوچک است که برای من خیلی مهم‌اند:",
      "اولین دوربینم که آقای کاظمی به من داد،",
      "عکسِ من و سیمین جلوی درِ سبز در شیراز،",
      "بلیتِ اتوبوسِ شماره‌ی هفت،",
      "و نقشه‌ای که با آن در تهران گم نشدم.",
      "این چیزها گران نیستند، اما هر کدام یک داستان دارند.",
      "حالا نوبتِ شماست: شما چه چیزی در صندوقچه‌ی خودتان می‌گذارید؟",
      "با عشق، مادربزرگ پروین"],
    aufgabe: {
      titel: "Eure eigene Erinnerungstruhe",
      text: "Bereitet zu zweit eine kurze Präsentation für das Plenum vor (ca. 3 Minuten pro Team): Jede Person legt <b>drei Dinge</b> in ihre Erinnerungstruhe und erzählt zu jedem Ding einen oder zwei Sätze.",
      hilfen: ["… را در صندوقچه‌ام می‌گذارم، چون …", "این همان … است که …", "وقتی … بودم، …", "این را از … گرفتم.", "این برای من از … مهم‌تر است."]
    }
  }
};
