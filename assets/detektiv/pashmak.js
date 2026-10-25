/* =========================================================
   Detektiv-Fall „Wo ist Pashmak?“ – Selbstlern-Lektion (1–4 Personen)
   Niveau: Beginn Fortgeschritten 1 (Persisch I abgeschlossen; ohne Bedingungssätze)

   personen[].fragen[]:
     fa / de        Frage (Persisch, vokalisiert) / deutsche Bedeutung
     a  / ade       Antwort (Persisch) / deutsche Übersetzung
     hinweis        diese Antwort enthält einen Hinweis (id) fürs Notizbuch
     braucht        [Hinweis-ids] – Frage erst möglich, wenn diese im Notizbuch stehen
   hinweise[id]:    fa (persische Notiz, wird bei „getrennt“ geordnet), titel, text (deutsche Notiz), check (Verständnisfrage, r = Index richtig)
   personen[].bitte: Aufgabe, bevor die Person redet – typ luecke | hoeren | zuordnen | ordnen | satz
   ========================================================= */
window.DETEKTIV_FAELLE = window.DETEKTIV_FAELLE || {};
window.DETEKTIV_FAELLE.pashmak = {
  id: "pashmak",
  titel: "Wo ist Pashmak?",
  titelFa: "پَشمَک کُجاست؟",
  icon: "🐈",
  dauer: "ca. 60–90 Minuten",
  intro: {
    de: "Sonntagmorgen. Es klingelt an eurer Tür im 2. Stock. Draußen steht Neda aus der WG im 3. Stock – sie ist ganz aufgeregt. Ihr seid ab jetzt Detektive: Befragt die Leute im Haus, sammelt Hinweise im Notizbuch und findet heraus, WER WAS WANN genommen hat – und WO es jetzt ist.",
    fa: "سَلام! بِبَخشید که مُزاحِم شُدَم. پَشمَک، گُربه‌یِ مَن، گُم شُده! دیشَب این‌جا بود، اَمّا اِمروز صُبح نیست. شُما می‌تَوانید به مَن کُمَک کُنید؟",
    faDe: "Hallo! Entschuldigt die Störung. Pashmak, meine Katze, ist verschwunden! Gestern Abend war sie hier, aber heute Morgen ist sie nicht da. Könnt ihr mir helfen?"
  },
  personen: [
    { id: "neda", name: "Neda", nameFa: "نِدا", emoji: "👩🏻", rolle: "Besitzerin von Pashmak · WG im 3. Stock",
      bitte: { typ: "luecke", titel: "Ein Suchplakat für Pashmak",
        de: "Neda ist zu aufgeregt, um zu reden. Hilf ihr zuerst, ein Suchplakat zu schreiben: Wähle die passenden Wörter.",
        fa: "وای، مَن خِیلی ناراحَتَم! لُطفاً اَوَّل کُمَک کُن یک آگَهی بِنِویسیم.", fade: "Oh, ich bin so traurig! Bitte hilf mir zuerst, eine Anzeige zu schreiben.",
        info: "📷 Foto: kleine weiße Katze · blaue Augen · rotes Halsband mit Glöckchen · Neda wohnt im 3. Stock",
        text: "گُربه گُم شُده! اِسمَش پَشمَک {0}. او کوچَک و {1} اَست و چِشم‌هایِ {2} دارَد. یک قَلّاده‌یِ {3} با یک زَنگوله دارَد. لُطفاً به نِدا {4} بِزَنید – طَبَقه‌یِ سِوُّم.",
        textDe: "Katze vermisst! Sie heißt Pashmak. Sie ist klein und weiß und hat blaue Augen. Sie hat ein rotes Halsband mit einem Glöckchen. Bitte ruft Neda an – 3. Stock.",
        luecken: [{ o: ["اَست", "هَستَم", "هَستَند"], r: 0 }, { o: ["سیاه", "سِفید", "زَرد"], r: 1 }, { o: ["آبی", "سَبز", "قَهوه‌ای"], r: 0 }, { o: ["آبی", "قِرمِز", "سِفید"], r: 1 }, { o: ["زَنگ", "نامه", "کار"], r: 0 }],
        danke: "مِرسی! آگَهی خِیلی خوب اَست. حالا بِپُرس.", dankeDe: "Danke! Die Anzeige ist sehr gut. Jetzt frag." },
      lexikon: [["گُم شُدَن", "gom schodan", "verloren gehen, verschwinden"], ["مُبل", "mobl", "Sofa"], ["قَلّاده", "ghallāde", "Halsband"], ["زَنگوله", "zangūle", "Glöckchen"], ["لَپ‌تاپ", "laptāp", "Laptop"], ["کِلید", "kelīd", "Schlüssel"], ["صاحِب‌خانه", "sāheb-chāne", "Vermieter/in"], ["یادداشت", "yāddāscht", "Notiz, Zettel"], ["یَخچال", "yachtschāl", "Kühlschrank"]],
      fragen: [
        { id: "n1", fa: "پَشمَک کِی گُم شُد؟", de: "Wann ist Pashmak verschwunden?",
          a: "دیشَب. مَن ساعَتِ هَشت و نیم از خانه رَفتَم، چون تَوَلُّدِ خواهَرَم بود. آن موقِع پَشمَک رویِ مُبل خوابیده بود. ساعَتِ یازده و نیم بَرگَشتَم و پَشمَک دیگَر نَبود.",
          ade: "Gestern Abend. Ich bin um halb neun aus dem Haus gegangen, weil meine Schwester Geburtstag hatte. Da schlief Pashmak auf dem Sofa. Um halb zwölf bin ich zurückgekommen, und Pashmak war nicht mehr da.", hinweis: "zeit" },
        { id: "n2", fa: "پَشمَک چه شِکلی اَست؟", de: "Wie sieht Pashmak aus?",
          a: "یک گُربه‌یِ کوچَک و سِفید اَست، با چِشم‌هایِ آبی. یک قَلّاده‌یِ قِرمِز با یک زَنگوله دارَد.",
          ade: "Eine kleine weiße Katze mit blauen Augen. Sie hat ein rotes Halsband mit einem Glöckchen.", hinweis: "katze" },
        { id: "n3", fa: "چیزِ دیگَری هَم گُم شُده؟", de: "Ist noch etwas anderes verschwunden?",
          a: "بَله! لَپ‌تاپِ مَن هَم نیست! شاید یک دُزد به خانه آمَده!",
          ade: "Ja! Mein Laptop ist auch weg! Vielleicht ist ein Dieb in die Wohnung gekommen!", hinweis: "laptop" },
        { id: "n4", fa: "چه کَسی کِلیدِ خانه را دارَد؟", de: "Wer hat einen Wohnungsschlüssel?",
          a: "فَقَط ما سه نَفَر: مَن، کاوه و شیرین. اَمّا کاوه هَمیشه عَجَله دارَد و گاهی دَر را نِمی‌بَندَد.",
          ade: "Nur wir drei: ich, Kaveh und Shirin. Aber Kaveh ist immer in Eile und schließt manchmal die Tür nicht." },
        { id: "n5", fa: "هَمسایه‌ها پَشمَک را می‌شِناسَند؟", de: "Kennen die Nachbarn Pashmak?",
          a: "بَله، هَمه او را می‌شِناسَند. بَهار، هَمسایه‌یِ طَبَقه‌یِ اَوَّل، عاشِقِ پَشمَک اَست. هَمیشه می‌گوید که یک گُربه می‌خواهَد، اَمّا صاحِب‌خانه‌اَش اِجازه نِمی‌دَهَد.",
          ade: "Ja, alle kennen sie. Bahar, die Nachbarin aus dem 1. Stock, ist ganz verliebt in Pashmak. Sie sagt immer, dass sie eine Katze möchte, aber ihr Vermieter erlaubt es nicht.", hinweis: "bahar" },
        { id: "n6", braucht: ["notiz"], fa: "کاوه می‌گوید که لَپ‌تاپ را قَرض گِرِفته. یادداشتِ او را دیدی؟", de: "Kaveh sagt, er hat den Laptop ausgeliehen. Hast du seinen Zettel gesehen?",
          a: "یادداشت؟ نه … آه، این‌جاست، رویِ یَخچال! «لَپ‌تاپِ تو را قَرض گِرِفتَم. کاوه.» پَس لَپ‌تاپ دُزدیده نَشُده. فَقَط پَشمَک نیست.",
          ade: "Ein Zettel? Nein … ah, hier ist er, am Kühlschrank! „Ich habe deinen Laptop ausgeliehen. Kaveh.“ Also wurde der Laptop nicht gestohlen. Nur Pashmak fehlt.", hinweis: "laptopok" }
      ] },
    { id: "kaveh", name: "Kaveh", nameFa: "کاوه", emoji: "👨🏽‍🎓", rolle: "Mitbewohner in der WG · Student",
      bitte: { typ: "hoeren", titel: "Kavehs Sprachnachricht",
        de: "Kaveh hat es eilig. Sein Professor hat ihm eine Sprachnachricht geschickt. Hör zu (🔊) und wähle die richtigen Uhrzeiten – dann hat er Zeit für dich.",
        fa: "بِبَخشید، خِیلی عَجَله دارَم! اُستادَم یک پَیامِ صوتی فِرِستاده. لُطفاً گوش کُن و ساعَت‌ها را به مَن بِگو.", fade: "Entschuldige, ich habe es sehr eilig! Mein Professor hat eine Sprachnachricht geschickt. Bitte hör zu und sag mir die Uhrzeiten.",
        items: [
          { fa: "اِمتِحانِ اَوَّل ساعَتِ هَشت و نیم اَست.", de: "Die erste Prüfung ist um halb neun.", frage: "Erste Prüfung", o: ["8:30", "9:30", "8:15", "7:30"], r: 0 },
          { fa: "اِمتِحانِ دُوُّم ساعَتِ دَه و رُبع اَست.", de: "Die zweite Prüfung ist um Viertel nach zehn.", frage: "Zweite Prüfung", o: ["10:45", "10:15", "12:15", "9:45"], r: 1 },
          { fa: "کِتاب‌خانه ساعَتِ هَفت باز می‌شَوَد.", de: "Die Bibliothek öffnet um sieben Uhr.", frage: "Die Bibliothek öffnet", o: ["8:00", "6:00", "7:00", "11:00"], r: 2 },
          { fa: "کِلاس ساعَتِ یازده کَم رُبع شُروع می‌شَوَد.", de: "Der Kurs beginnt um Viertel vor elf.", frage: "Der Kurs beginnt", o: ["11:15", "10:45", "11:45", "10:15"], r: 1 }],
        danke: "عالی، مِرسی! حالا یک کَم وَقت دارَم. بِپُرس.", dankeDe: "Super, danke! Jetzt habe ich ein bisschen Zeit. Frag." },
      lexikon: [["کِتاب‌خانه", "ketābchāne", "Bibliothek"], ["اِمتِحان", "emtehān", "Prüfung"], ["بَرداشتَن", "bardāschtan", "nehmen, mitnehmen"], ["قَرض گِرِفتَن", "gharz gereftan", "(sich) ausleihen"], ["خَراب", "charāb", "kaputt"], ["آلِرژی", "ālerzhī", "Allergie"], ["عَجَله داشتَن", "ʿadschale dāschtan", "es eilig haben"], ["عَطسه کَردَن", "ʿatse kardan", "niesen"]],
      fragen: [
        { id: "k1", fa: "دیشَب کُجا بودی؟", de: "Wo warst du gestern Abend?",
          a: "تا ساعَتِ نُه دَر کِتاب‌خانه‌یِ دانِشگاه بودَم. بَعد به خانه آمَدَم، کِتاب‌هایَم و لَپ‌تاپِ نِدا را بَرداشتَم و دوباره رَفتَم. فَردا اِمتِحان دارَم.",
          ade: "Bis neun Uhr war ich in der Uni-Bibliothek. Dann bin ich nach Hause gekommen, habe meine Bücher und Nedas Laptop genommen und bin wieder gegangen. Morgen habe ich eine Prüfung.", hinweis: "kaveh" },
        { id: "k2", fa: "چِرا لَپ‌تاپِ نِدا را بَرداشتی؟", de: "Warum hast du Nedas Laptop genommen?",
          a: "چون لَپ‌تاپِ خودَم خَراب اَست. یک یادداشت رویِ یَخچال گُذاشتَم. نِدا حَتماً آن را دیده.",
          ade: "Weil mein eigener Laptop kaputt ist. Ich habe einen Zettel an den Kühlschrank gehängt. Neda hat ihn bestimmt gesehen.", hinweis: "notiz" },
        { id: "k3", fa: "پَشمَک را دیدی؟", de: "Hast du Pashmak gesehen?",
          a: "نه، دَقیق نِمی‌دانَم. مَن به گُربه آلِرژی دارَم و زود رَفتَم. راستَش … شاید دَر را دُرُست نَبَستَم. خِیلی عَجَله داشتَم.",
          ade: "Nein, ich weiß es nicht genau. Ich bin allergisch gegen Katzen und bin schnell wieder gegangen. Ehrlich gesagt … vielleicht habe ich die Tür nicht richtig zugemacht. Ich hatte es sehr eilig.", hinweis: "tuer" },
        { id: "k4", fa: "کِی دوباره از خانه رَفتی؟", de: "Wann bist du wieder aus dem Haus gegangen?",
          a: "حُدودِ ساعَتِ نُه و دَه دَقیقه. بَعد با دوستَم به یک کافه رَفتیم و تا نیمه‌شَب دَرس خواندیم.",
          ade: "Gegen zehn nach neun. Dann bin ich mit meinem Freund in ein Café gegangen, und wir haben bis Mitternacht gelernt." },
        { id: "k5", fa: "تو گُربه دوست داری؟", de: "Magst du Katzen?",
          a: "گُربه‌ها قَشَنگ‌اَند، اَمّا مَن آلِرژی دارَم. وَقتی پَشمَک پیشِ مَن اَست، هَمیشه عَطسه می‌کُنَم!",
          ade: "Katzen sind hübsch, aber ich habe eine Allergie. Wenn Pashmak bei mir ist, muss ich immer niesen!" }
      ] },
    { id: "shirin", name: "Shirin", nameFa: "شیرین", emoji: "👩🏻‍🍳", rolle: "Mitbewohnerin in der WG · arbeitet im Restaurant",
      bitte: { typ: "zuordnen", titel: "Shirins Einkaufsliste",
        de: "Shirin ist sehr müde und muss morgen früh einkaufen. Hilf ihr: Tippe ein persisches Wort an und dann das passende Bild.",
        fa: "سَلام … خِیلی خَسته‌اَم. فَردا صُبح بایَد خَرید کُنَم. لُطفاً لیستِ خَریدِ مَن را دُرُست کُن.", fade: "Hallo … ich bin sehr müde. Morgen früh muss ich einkaufen. Bitte bring meine Einkaufsliste in Ordnung.",
        paare: [["گوجه‌فَرَنگی", "🍅", "Tomaten"], ["پیاز", "🧅", "Zwiebeln"], ["سیب‌زَمینی", "🥔", "Kartoffeln"], ["بِرِنج", "🍚", "Reis"], ["تُخمِ مُرغ", "🥚", "Eier"], ["نان", "🍞", "Brot"]],
        danke: "مِرسی، خِیلی مِهرَبانی! حالا بِپُرس.", dankeDe: "Danke, sehr nett! Jetzt frag." },
      lexikon: [["رِستوران", "restūrān", "Restaurant"], ["تَعَجُّب کَردَن", "taʿadschdschob kardan", "sich wundern"], ["راه‌پِلّه", "rāhpelle", "Treppenhaus"], ["طَبَقه", "tabaghe", "Stockwerk"], ["موشِ اَسباب‌بازی", "mūsch-e asbāb-bāzī", "Spielzeugmaus"], ["مو", "mū", "Haar"], ["صِدا", "sedā", "Geräusch, Stimme"], ["میو", "miyū", "miau"]],
      fragen: [
        { id: "s1", fa: "دیشَب کِی به خانه آمَدی؟", de: "Wann bist du gestern Abend nach Hause gekommen?",
          a: "مَن دَر یک رِستوران کار می‌کُنَم. ساعَتِ دَه و نیم به خانه آمَدَم. دَرِ خانه باز بود! خِیلی تَعَجُّب کَردَم.",
          ade: "Ich arbeite in einem Restaurant. Um halb elf bin ich nach Hause gekommen. Die Wohnungstür war offen! Ich habe mich sehr gewundert.", hinweis: "shirin" },
        { id: "s2", fa: "پَشمَک آن موقِع خانه بود؟", de: "War Pashmak da zu Hause?",
          a: "نه، او را نَدیدَم. فِکر کَردَم پیشِ نِدا اَست. خِیلی خَسته بودَم و زود خوابیدَم.",
          ade: "Nein, ich habe sie nicht gesehen. Ich dachte, sie ist bei Neda. Ich war sehr müde und bin früh schlafen gegangen." },
        { id: "s3", fa: "دَر راه‌پِلّه چیزی دیدی؟", de: "Hast du im Treppenhaus etwas gesehen?",
          a: "بَله، یک چیزِ عَجیب: بِینِ طَبَقه‌یِ اَوَّل و دُوُّم یک موشِ اَسباب‌بازی بود – موشِ پَشمَک! رویِ پِلّه‌ها هَم مویِ سِفید بود.",
          ade: "Ja, etwas Seltsames: Zwischen dem 1. und 2. Stock lag eine Spielzeugmaus – Pashmaks Maus! Auf den Stufen waren auch weiße Haare.", hinweis: "maus" },
        { id: "s4", fa: "کَسی را دَر راه‌پِلّه دیدی؟", de: "Hast du jemanden im Treppenhaus gesehen?",
          a: "نه، کَسی را نَدیدَم. اَمّا از طَبَقه‌یِ اَوَّل صِدایِ «میو» شِنیدَم. عَجیب اَست، چون آن‌جا کَسی گُربه نَدارَد.",
          ade: "Nein, ich habe niemanden gesehen. Aber aus dem 1. Stock habe ich ein „Miau“ gehört. Seltsam, denn dort hat niemand eine Katze.", hinweis: "miau" }
      ] },
    { id: "rahimi", name: "Herr Rahimi", nameDat: "Herrn Rahimi", nameFa: "آقایِ رَحیمی", emoji: "👴🏽", rolle: "hat den kleinen Laden im Erdgeschoss",
      bitte: { typ: "ordnen", titel: "Durcheinander im Laden",
        de: "Herr Rahimi hat für seine Enkelin ein kurzes Gespräch auf Zettel geschrieben – jetzt sind die Zettel durcheinander. Bring das Gespräch in die richtige Reihenfolge.",
        fa: "نَوه‌اَم فارسی یاد می‌گیرَد. بَرایَش یک گُفت‌وگو نِوِشتَم، اَمّا کاغَذها به هَم ریختَند. کُمَک می‌کُنی؟", fade: "Meine Enkelin lernt Persisch. Ich habe ihr ein Gespräch geschrieben, aber die Zettel sind durcheinandergeraten. Hilfst du mir?",
        zeilen: [["مُشتَری", "سَلام، آقایِ رَحیمی! نانِ تازه دارید؟", "Kunde: Hallo, Herr Rahimi! Haben Sie frisches Brot?"],
          ["رَحیمی", "سَلام! بَله، این‌جاست. چَند تا می‌خواهید؟", "Rahimi: Hallo! Ja, hier ist es. Wie viele möchten Sie?"],
          ["مُشتَری", "دو تا، لُطفاً. چَند می‌شَوَد؟", "Kunde: Zwei, bitte. Was macht das?"],
          ["رَحیمی", "سه یورو. چیزِ دیگَری هَم می‌خواهید؟", "Rahimi: Drei Euro. Möchten Sie noch etwas?"],
          ["مُشتَری", "نه، مَمنون. روزِ خوبی داشته باشید!", "Kunde: Nein, danke. Einen schönen Tag noch!"]],
        danke: "آفَرین! نَوه‌اَم خوشحال می‌شَوَد. حالا بِپُرسید.", dankeDe: "Bravo! Meine Enkelin wird sich freuen. Jetzt fragen Sie." },
      lexikon: [["مَغازه", "maghāze", "Laden, Geschäft"], ["خانُم", "chānom", "Frau (Anrede)"], ["غَذایِ گُربه", "ghazā-ye gorbe", "Katzenfutter"], ["رُبع", "robʿ", "Viertel(stunde)"], ["دَه کَم رُبع", "dah kam robʿ", "Viertel vor zehn"], ["ساختِمان", "sāchtemān", "Gebäude"], ["کیسه", "kīse", "Tüte, Beutel"], ["دَست", "dast", "Hand"]],
      fragen: [
        { id: "r1", fa: "دیشَب چیزِ عَجیبی دیدید؟", de: "Haben Sie gestern Abend etwas Seltsames gesehen?",
          a: "دیشَب؟ نه … فَقَط بَهار خانُم ساعَتِ دَه کَم رُبع آمَد و غَذایِ گُربه خَرید.",
          ade: "Gestern Abend? Nein … nur Frau Bahar kam um Viertel vor zehn und hat Katzenfutter gekauft.", hinweis: "futter" },
        { id: "r2", fa: "بَهار گُربه دارَد؟", de: "Hat Bahar eine Katze?",
          a: "نه، صاحِب‌خانه اِجازه نِمی‌دَهَد. خودِ بَهار گُفت که غَذا بَرایِ یک دوست اَست.",
          ade: "Nein, der Vermieter erlaubt es nicht. Bahar selbst hat gesagt, dass das Futter für eine Freundin ist." },
        { id: "r3", fa: "کاوه را دیشَب دیدید؟", de: "Haben Sie Kaveh gestern Abend gesehen?",
          a: "بَله، حُدودِ ساعَتِ نُه و رُبع. خِیلی عَجَله داشت. یک کیف و یک لَپ‌تاپ دَستَش بود.",
          ade: "Ja, gegen Viertel nach neun. Er hatte es sehr eilig. Er hatte eine Tasche und einen Laptop in der Hand." },
        { id: "r4", fa: "کَسی با یک کیسه‌یِ بُزُرگ از ساختِمان بیرون رَفت؟", de: "Ist jemand mit einer großen Tüte aus dem Haus gegangen?",
          a: "نه. بَعد از کاوه کَسی از ساختِمان بیرون نَرَفت. مَن تا ساعَتِ یازده این‌جا بودَم و دَر را می‌دیدَم.",
          ade: "Nein. Nach Kaveh ist niemand mehr aus dem Haus gegangen. Ich war bis elf Uhr hier und konnte die Tür sehen.", hinweis: "drin" }
      ] },
    { id: "bahar", name: "Bahar", nameFa: "بَهار", emoji: "👩🏽", rolle: "Nachbarin im 1. Stock · Studentin",
      bitte: { typ: "satz", titel: "Bahar öffnet die Tür nur einen Spalt",
        de: "Bahar ist misstrauisch. Sie redet erst, wenn du dich höflich vorstellst. Bau die zwei Sätze aus den Wörtern – und sag sie danach laut.",
        fa: "بَله؟ شُما کی هَستید؟", fade: "Ja? Wer sind Sie?",
        saetze: [{ fa: "سَلام، مَن هَمسایه‌یِ طَبَقه‌یِ دُوُّم هَستَم.", de: "Hallo, ich bin die Nachbarin / der Nachbar aus dem 2. Stock.", extra: ["هَستی", "سِوُّم", "اَست"] },
          { fa: "می‌تَوانَم چَند سُؤال بِپُرسَم؟", de: "Kann ich ein paar Fragen stellen?", extra: ["می‌تَوانی", "بِپُرسی", "چه"] }],
        danke: "آه، بِبَخشید. بِفَرمایید، بِپُرسید.", dankeDe: "Ah, entschuldigen Sie. Bitte, fragen Sie." },
      lexikon: [["تَنها", "tanhā", "allein"], ["باشه", "bāsche", "okay (ugs.)"], ["شِناختَن", "schenāchtan", "kennen"], ["ناز", "nāz", "süß, niedlich"], ["راستَش را گُفتَن", "rāstasch rā goftan", "die Wahrheit sagen"], ["تَرسیدَن", "tarsīdan", "Angst haben"], ["بُردَن", "bordan", "mitnehmen, bringen"], ["حَمّام", "hammām", "Badezimmer"], ["بَرگَرداندَن", "bargardāndan", "zurückbringen"]],
      fragen: [
        { id: "b1", fa: "دیشَب کُجا بودی؟", de: "Wo warst du gestern Abend?",
          a: "خانه بودَم. تَنها. دَرس می‌خواندَم. چِرا می‌پُرسی؟",
          ade: "Ich war zu Hause. Allein. Ich habe gelernt. Warum fragst du?" },
        { id: "b2", fa: "پَشمَک را می‌شِناسی؟", de: "Kennst du Pashmak?",
          a: "پَشمَک؟ … بَله، گُربه‌یِ نِدا. خِیلی ناز اَست. اَمّا مَن دیشَب او را نَدیدَم.",
          ade: "Pashmak? … Ja, Nedas Katze. Sie ist sehr süß. Aber ich habe sie gestern Abend nicht gesehen." },
        { id: "b3", braucht: ["futter"], fa: "چِرا دیشَب غَذایِ گُربه خَریدی؟", de: "Warum hast du gestern Abend Katzenfutter gekauft?",
          a: "غَذایِ گُربه؟ … بَرایِ یک دوست. دوستَم یک گُربه دارَد. فَردا پیشِ او می‌رَوَم.",
          ade: "Katzenfutter? … Für eine Freundin. Meine Freundin hat eine Katze. Morgen gehe ich zu ihr." },
        { id: "b4", braucht: ["maus", "miau"], fa: "شیرین از خانه‌یِ تو صِدایِ «میو» شِنید. موشِ پَشمَک هَم نَزدیکِ خانه‌یِ تو بود.", de: "Shirin hat aus deiner Wohnung ein „Miau“ gehört. Und Pashmaks Maus lag in der Nähe deiner Wohnung.",
          a: "باشه، باشه … راستَش را می‌گویَم. ساعَتِ نُه و نیم پَشمَک را رویِ پِلّه‌ها دیدَم. تَنها بود و می‌تَرسید. فِکر کَردَم گُم شُده. او را به خانه‌یِ خودَم بُردَم و بَرایَش غَذا خَریدَم. خِیلی دوستَش دارَم … می‌خواستَم فَقَط یک شَب پیشِ مَن بِمانَد. بِبَخشید!",
          ade: "Okay, okay … ich sage die Wahrheit. Um halb zehn habe ich Pashmak auf der Treppe gesehen. Sie war allein und hatte Angst. Ich dachte, sie hat sich verlaufen. Ich habe sie mit in meine Wohnung genommen und Futter für sie gekauft. Ich habe sie so lieb … ich wollte, dass sie nur eine Nacht bei mir bleibt. Entschuldigung!", hinweis: "gestaendnis" },
        { id: "b5", braucht: ["gestaendnis"], fa: "پَشمَک اَلان کُجاست؟", de: "Wo ist Pashmak jetzt?",
          a: "دَر حَمّامِ خانه‌یِ مَن خوابیده. اَلان او را به نِدا بَرمی‌گَردانَم. قول می‌دَهَم!",
          ade: "Sie schläft im Badezimmer meiner Wohnung. Ich bringe sie jetzt zu Neda zurück. Versprochen!", hinweis: "wo" }
      ] }
  ],
  hinweise: {
    zeit: { fa: "نِدا شَنبه از ساعَتِ هَشت و نیم تا یازده و نیم خانه نَبود.", titel: "Zeitraum", text: "Neda war Samstag von 20:30 bis 23:30 weg. Um 20:30 schlief Pashmak auf dem Sofa.",
      check: { frage: "Wann hat Neda Pashmak zuletzt gesehen?", optionen: ["um 20:30 auf dem Sofa", "um 23:30 in der Küche", "am Sonntagmorgen", "um 21:00 im Treppenhaus"], r: 0 } },
    katze: { fa: "پَشمَک کوچَک و سِفید اَست و یک قَلّاده‌یِ قِرمِز دارَد.", titel: "Beschreibung", text: "Pashmak: klein, weiß, blaue Augen, rotes Halsband mit Glöckchen.",
      check: { frage: "Welche Farbe hat Pashmaks Halsband?", optionen: ["blau", "rot", "weiß", "schwarz"], r: 1 } },
    laptop: { fa: "لَپ‌تاپِ نِدا هَم نیست.", titel: "Auch der Laptop?", text: "Neda vermisst auch ihren Laptop. Ein Dieb?",
      check: { frage: "Was fehlt Neda außer Pashmak?", optionen: ["ihr Schlüssel", "ihr Fahrrad", "ihr Laptop", "ihr Handy"], r: 2 } },
    bahar: { fa: "بَهار عاشِقِ پَشمَک اَست، اَمّا صاحِب‌خانه‌اَش اِجازه نِمی‌دَهَد.", titel: "Bahar liebt Pashmak", text: "Bahar (1. Stock) ist verliebt in Pashmak und möchte eine Katze – ihr Vermieter erlaubt es nicht.",
      check: { frage: "Warum hat Bahar keine Katze?", optionen: ["Sie hat eine Allergie.", "Ihr Vermieter erlaubt es nicht.", "Sie mag keine Katzen.", "Sie hat keine Zeit."], r: 1 } },
    laptopok: { fa: "کاوه لَپ‌تاپ را قَرض گِرِفته و دُزد نیامَده.", titel: "Laptop geklärt", text: "Der Laptop wurde NICHT gestohlen: Kavehs Zettel hing am Kühlschrank.",
      check: { frage: "Was steht auf dem Zettel?", optionen: ["„Ich habe Pashmak mitgenommen.“", "„Ich habe deinen Laptop ausgeliehen.“", "„Die Tür ist kaputt.“", "„Ich komme spät.“"], r: 1 } },
    kaveh: { fa: "کاوه ساعَتِ نُه به خانه آمَد و دوباره رَفت.", titel: "Kaveh kurz zu Hause", text: "Kaveh war bis 21 Uhr in der Bibliothek, kam kurz nach Hause, nahm Bücher und Nedas Laptop und ging wieder.",
      check: { frage: "Was hat Kaveh zu Hause mitgenommen?", optionen: ["Pashmak", "seine Bücher und Nedas Laptop", "Katzenfutter", "Shirins Schlüssel"], r: 1 } },
    notiz: { fa: "لَپ‌تاپِ کاوه خَراب اَست و او یک یادداشت نِوِشت.", titel: "Zettel am Kühlschrank", text: "Kaveh: Sein Laptop ist kaputt, er hat Nedas Laptop ausgeliehen und einen Zettel an den Kühlschrank gehängt.",
      check: { frage: "Warum hat Kaveh Nedas Laptop genommen?", optionen: ["Er wollte ihn verkaufen.", "Sein eigener Laptop ist kaputt.", "Neda hat es ihm erlaubt.", "Er wollte Filme schauen."], r: 1 } },
    tuer: { fa: "شاید کاوه دَر را نَبَست.", titel: "Tür offen?", text: "Kaveh hatte es eilig – vielleicht hat er die Wohnungstür (gegen 21:10) nicht richtig zugemacht.",
      check: { frage: "Was hat Kaveh vielleicht nicht richtig gemacht?", optionen: ["die Tür zugemacht", "das Licht ausgemacht", "Pashmak gefüttert", "den Zettel geschrieben"], r: 0 } },
    shirin: { fa: "ساعَتِ دَه و نیم دَرِ خانه باز بود.", titel: "Tür um 22:30 offen", text: "Shirin kam um 22:30 von der Arbeit: Die Wohnungstür stand offen.",
      check: { frage: "Was hat Shirin um 22:30 bemerkt?", optionen: ["Die Tür war offen.", "Pashmak schlief auf dem Sofa.", "Der Laptop war da.", "Kaveh war zu Hause."], r: 0 } },
    maus: { fa: "موشِ پَشمَک رویِ پِلّه‌ها بود.", titel: "Spur im Treppenhaus", text: "Zwischen 1. und 2. Stock: Pashmaks Spielzeugmaus und weiße Haare auf den Stufen.",
      check: { frage: "Wo lag Pashmaks Spielzeugmaus?", optionen: ["vor dem Laden", "zwischen dem 1. und 2. Stock", "in Kavehs Zimmer", "auf dem Dach"], r: 1 } },
    miau: { fa: "شیرین از طَبَقه‌یِ اَوَّل صِدایِ میو شِنید.", titel: "Miau im 1. Stock", text: "Shirin hörte ein „Miau“ aus dem 1. Stock – dort hat niemand eine Katze.",
      check: { frage: "Woher kam das „Miau“?", optionen: ["aus dem 1. Stock", "aus dem Laden", "aus Nedas Zimmer", "von der Straße"], r: 0 } },
    futter: { fa: "بَهار ساعَتِ دَه کَم رُبع غَذایِ گُربه خَرید.", titel: "Katzenfutter!", text: "Bahar hat Samstag um 21:45 in Herrn Rahimis Laden Katzenfutter gekauft – obwohl sie keine Katze hat.",
      check: { frage: "Wann hat Bahar Katzenfutter gekauft?", optionen: ["um 20:30", "um Viertel vor zehn (21:45)", "um Viertel nach neun (21:15)", "am Sonntagmorgen"], r: 1 } },
    drin: { fa: "بَعد از کاوه کَسی از ساختِمان بیرون نَرَفت.", titel: "Niemand ging hinaus", text: "Nach Kaveh (ca. 21:15) hat bis 23 Uhr niemand das Haus verlassen. Pashmak ist also noch im Haus!",
      check: { frage: "Was folgt aus Herrn Rahimis Aussage?", optionen: ["Pashmak ist im Park.", "Pashmak ist noch im Haus.", "Kaveh hat Pashmak mitgenommen.", "Ein Dieb kam von draußen."], r: 1 } },
    gestaendnis: { fa: "بَهار پَشمَک را رویِ پِلّه‌ها پِیدا کَرد و به خانه‌اَش بُرد.", titel: "Bahars Geständnis", text: "Bahar fand Pashmak um 21:30 auf der Treppe und nahm sie mit in ihre Wohnung.",
      check: { frage: "Warum hat Bahar Pashmak mitgenommen?", optionen: ["Sie wollte sie verkaufen.", "Sie dachte, Pashmak hat sich verlaufen, und hat sie sehr lieb.", "Kaveh hat sie darum gebeten.", "Pashmak war krank."], r: 1 } },
    wo: { fa: "پَشمَک دَر حَمّامِ بَهار خوابیده.", titel: "Pashmak gefunden", text: "Pashmak schläft im Badezimmer von Bahars Wohnung.",
      check: { frage: "Wo ist Pashmak jetzt?", optionen: ["im Laden", "im Badezimmer von Bahars Wohnung", "in der Bibliothek", "im Café"], r: 1 } }
  },
  /* Lösung: Wer? Was? Wann? Wo? */
  anklage: [
    { id: "wer", frage: "Wer hat Pashmak mitgenommen?", optionen: ["Neda", "Kaveh", "Shirin", "Herr Rahimi", "Bahar"], r: 4 },
    { id: "was", frage: "Was wurde wirklich weggenommen?", optionen: ["nur Pashmak", "Pashmak und Nedas Laptop", "nur der Laptop", "nur das rote Halsband"], r: 0 },
    { id: "wann", frage: "Wann ist es passiert?", optionen: ["Samstag um 20:30", "Samstag gegen 21:30", "Samstag um 22:30", "Sonntagmorgen"], r: 1 },
    { id: "wo", frage: "Wo ist Pashmak jetzt?", optionen: ["im Park", "in Herrn Rahimis Laden", "in Bahars Wohnung", "bei Kaveh im Café"], r: 2 }
  ],
  ende: {
    de: "Fall gelöst! Am Sonntagmittag klingelt Bahar bei Neda – mit Pashmak auf dem Arm. Neda ist überglücklich. Und weil Bahar Pashmak so liebt, darf sie jetzt jedes Wochenende zu Besuch kommen.",
    fa: "پَشمَک دوباره خانه اَست! نِدا خِیلی خوشحال اَست. بَهار مَعذِرَت خواست و حالا هَر آخَرِ هَفته به دیدَنِ پَشمَک می‌آیَد. کاوه هَم قول داد که دَر را هَمیشه بِبَندَد.",
    faDe: "Pashmak ist wieder zu Hause! Neda ist sehr glücklich. Bahar hat sich entschuldigt und kommt jetzt jedes Wochenende Pashmak besuchen. Und Kaveh hat versprochen, die Tür immer zuzumachen."
  },
  /* Abschlussbericht: Sätze aus Wörtern bauen (automatische Prüfung) */
  bericht: [
    { fa: "بَهار پَشمَک را به خانه‌یِ خودَش بُرد", de: "Bahar hat Pashmak in ihre eigene Wohnung gebracht." },
    { fa: "این اِتِّفاق شَنبه ساعَتِ نُه و نیمِ شَب اُفتاد", de: "Das ist am Samstag um halb zehn abends passiert." },
    { fa: "لَپ‌تاپ دُزدیده نَشُده بود", de: "Der Laptop war nicht gestohlen worden." }
  ]
};
