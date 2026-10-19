/* =========================================================
   Blitz-Übersetzung: reale Bedingungssätze (Lektion 22)
   typ: P = agar + Präsens, K = agar + Konjunktiv, V = agar + Präteritum,
        C = Konnektoren (selbst wenn, sonst …)
   fa  = Musterlösung (vokalisiert), alt = ebenfalls richtig, tr = Umschrift
   ========================================================= */
window.BUZZER_SETS = window.BUZZER_SETS || {};
window.BUZZER_SETS["wenn-real"] = {
  id: "wenn-real",
  titel: "Wenn …, dann … – reale Bedingungen",
  titelFa: "اَگَر …",
  lektion: "Lektion 22",
  typen: {
    P: { name: "agar + Präsens", info: "Die Bedingung gilt jetzt oder immer: agar + Präsens (oder „sein“-Endung)." },
    K: { name: "agar + Konjunktiv", info: "Etwas kann (in Zukunft) passieren: agar + Konjunktiv. Das Präteritum ist gleichbedeutend." },
    V: { name: "agar + Präteritum", info: "„Sobald/falls das passiert ist …“: agar + Präteritum, meist mit Imperativ oder Präsens im Hauptsatz – Bedeutung: Zukunft!" },
    C: { name: "selbst wenn · sonst", info: "hattā agar = selbst wenn (+ Konjunktiv) · wagarna = sonst · agar ham = und wenn (doch)" }
  },
  saetze: [
    /* ---------- agar + Präsens ---------- */
    { typ: "P", de: "Wenn du Zeit hast, trinken wir zusammen Tee.", fa: "اَگَر وَقت داری، با هَم چای می‌خوریم.", tr: "agar waght dārī, bā ham tschāy mīchorīm." },
    { typ: "P", de: "Wenn es regnet, fahre ich mit dem Bus.", fa: "اَگَر باران می‌آیَد، با اُتوبوس می‌رَوَم.", tr: "agar bārān mīāyad, bā otobūs mīravam." },
    { typ: "P", de: "Wenn du Hunger hast: Das Essen ist im Kühlschrank.", fa: "اَگَر گُرُسنه‌ای، غَذا دَر یَخچال اَست.", tr: "agar gorosne-ī, ghazā dar yachtschāl ast.", alt: ["اَگَر گُرُسنه هَستی، غَذا دَر یَخچال اَست."] },
    { typ: "P", de: "Wenn er Persisch lernt, kann er mit seiner Großmutter sprechen.", fa: "اَگَر فارسی یاد می‌گیرَد، می‌تَوانَد با مادَربُزُرگَش حَرف بِزَنَد.", tr: "agar fārsī yād mīgīrad, mītawānad bā mādarbozorgasch harf bezanad." },
    { typ: "P", de: "Wenn du krank bist, bleib zu Hause!", fa: "اَگَر مَریضی، دَر خانه بِمان!", tr: "agar marīz-ī, dar chāne bemān!", alt: ["اَگَر مَریض هَستی، دَر خانه بِمان!"] },
    { typ: "P", de: "Wenn sie spät nach Hause kommt, isst sie allein.", fa: "اَگَر دیر به خانه می‌آیَد، تَنها غَذا می‌خورَد.", tr: "agar dīr be chāne mīāyad, tanhā ghazā mīchorad." },
    { typ: "P", de: "Wenn du eine Frage hast, frag mich!", fa: "اَگَر سُؤالی داری، از مَن بِپُرس!", tr: "agar soʾālī dārī, az man bepors!" },
    { typ: "P", de: "Wenn du nicht schlafen kannst, lies ein Buch!", fa: "اَگَر نِمی‌تَوانی بِخوابی، یک کِتاب بِخوان!", tr: "agar nemītawānī bechābī, yek ketāb bechān!" },
    { typ: "P", de: "Wenn ihr Kaffee möchtet: Die Küche ist dort.", fa: "اَگَر قَهوه می‌خواهید، آشپَزخانه آن‌جاست.", tr: "agar ghahwe mīchāhīd, āschpazchāne ān-dschāst.", alt: ["اَگَر قَهوه می‌خواهید، آشپَزخانه آن‌جا اَست."] },
    { typ: "P", de: "Wenn das Wetter schön ist, gehen wir immer zu Fuß.", fa: "اَگَر هَوا خوب اَست، هَمیشه پیاده می‌رَویم.", tr: "agar hawā chūb ast, hamīsche piyāde mīravīm." },

    /* ---------- agar + Konjunktiv (Präteritum gleichbedeutend) ---------- */
    { typ: "K", de: "Wenn es morgen nicht regnet, fahren wir ans Meer.", fa: "اَگَر فَردا باران نَیایَد، به کَنارِ دَریا می‌رَویم.", tr: "agar fardā bārān nayāyad, be kenār-e daryā mīravīm.", alt: ["اَگَر فَردا باران نَیامَد، به کَنارِ دَریا می‌رَویم."] },
    { typ: "K", de: "Wenn ich Geld habe, kaufe ich ein neues Fahrrad.", fa: "اَگَر پول داشته باشَم، یک دوچَرخه‌یِ نو می‌خَرَم.", tr: "agar pūl dāschte bāscham, yek dotscharche-ye nou mīcharam." },
    { typ: "K", de: "Wenn du willst, kochen wir heute Abend zusammen.", fa: "اَگَر بِخواهی، اِمشَب با هَم آشپَزی می‌کُنیم.", tr: "agar bechāhī, emschab bā ham āschpazī mīkonīm.", alt: ["اَگَر خواستی، اِمشَب با هَم آشپَزی می‌کُنیم."] },
    { typ: "K", de: "Wenn ich Ali sehe, gebe ich ihm das Buch.", fa: "اَگَر عَلی را بِبینَم، کِتاب را به او می‌دَهَم.", tr: "agar ʿalī rā bebīnam, ketāb rā be ū mīdaham.", alt: ["اَگَر عَلی را دیدَم، کِتاب را به او می‌دَهَم."] },
    { typ: "K", de: "Wenn der Zug pünktlich kommt, sind wir um acht in Hamburg.", fa: "اَگَر قَطار سَرِ وَقت بیایَد، ساعَتِ هَشت دَر هامبورگ هَستیم.", tr: "agar ghatār sar-e waght biyāyad, sāʿat-e hascht dar hāmbūrg hastīm.", alt: ["اَگَر قَطار سَرِ وَقت آمَد، ساعَتِ هَشت دَر هامبورگ هَستیم."] },
    { typ: "K", de: "Wenn du mir hilfst, bin ich in einer Stunde mit der Arbeit fertig.", fa: "اَگَر به مَن کُمَک کُنی، کارَم را دَر یک ساعَت تَمام می‌کُنَم.", tr: "agar be man komak konī, kāram rā dar yek sāʿat tamām mīkonam.", alt: ["اَگَر به مَن کُمَک کَردی، کارَم را دَر یک ساعَت تَمام می‌کُنَم."] },
    { typ: "K", de: "Wenn es teuer ist, kaufe ich es nicht.", fa: "اَگَر گِران باشَد، آن را نِمی‌خَرَم.", tr: "agar gerān bāschad, ān rā nemīcharam." },
    { typ: "K", de: "Wenn ihr nächste Woche kommt, zeige ich euch die Stadt.", fa: "اَگَر هَفته‌یِ بَعد بیایید، شَهر را به شُما نِشان می‌دَهَم.", tr: "agar hafte-ye baʿd biyāyīd, schahr rā be schomā neschān mīdaham.", alt: ["اَگَر هَفته‌یِ بَعد آمَدید، شَهر را به شُما نِشان می‌دَهَم."] },
    { typ: "K", de: "Wenn ich die Prüfung bestehe, machen wir eine Party.", fa: "اَگَر دَر اِمتِحان قَبول شَوَم، یک مِهمانی می‌گیریم.", tr: "agar dar emtehān ghabūl schawam, yek mehmānī mīgīrīm.", alt: ["اَگَر دَر اِمتِحان قَبول شُدَم، یک مِهمانی می‌گیریم."] },
    { typ: "K", de: "Wenn du müde wirst, machen wir eine Pause.", fa: "اَگَر خَسته شَوی، کَمی اِستِراحَت می‌کُنیم.", tr: "agar chaste schawī, kamī esterāhat mīkonīm.", alt: ["اَگَر خَسته شُدی، کَمی اِستِراحَت می‌کُنیم."] },
    { typ: "K", de: "Wenn ich diese Arbeit bekomme, werde ich nach Berlin gehen.", fa: "اَگَر این کار را بِگیرَم، به بِرلین خواهَم رَفت.", tr: "agar īn kār rā begīram, be berlīn chāham raft.", alt: ["اَگَر این کار را گِرِفتَم، به بِرلین خواهَم رَفت."] },
    { typ: "K", de: "Wenn es morgen schneit, werden die Kinder nicht zur Schule gehen.", fa: "اَگَر فَردا بَرف بیایَد، بَچّه‌ها به مَدرِسه نَخواهَند رَفت.", tr: "agar fardā barf biyāyad, batschtschehā be madrese nachāhand raft.", alt: ["اَگَر فَردا بَرف آمَد، بَچّه‌ها به مَدرِسه نَخواهَند رَفت."] },

    /* ---------- agar + Präteritum (Bedeutung: Zukunft) ---------- */
    { typ: "V", de: "Wenn du nach Teheran fährst, ruf mich an!", fa: "اَگَر به تِهران رَفتی، به مَن زَنگ بِزَن!", tr: "agar be tehrān raftī, be man zang bezan!", alt: ["اَگَر به تِهران بِرَوی، به مَن زَنگ بِزَن!"] },
    { typ: "V", de: "Wenn es spät wird, nimm ein Taxi!", fa: "اَگَر دیر شُد، تاکسی بِگیر!", tr: "agar dīr schod, tāksī begīr!", alt: ["اَگَر دیر شَوَد، تاکسی بِگیر!"] },
    { typ: "V", de: "Wenn du das Buch gelesen hast, gib es mir!", fa: "اَگَر کِتاب را خواندی، آن را به مَن بِدِه!", tr: "agar ketāb rā chāndī, ān rā be man bede!" },
    { typ: "V", de: "Wenn der Bus nicht kommt, gehen wir zu Fuß.", fa: "اَگَر اُتوبوس نَیامَد، پیاده می‌رَویم.", tr: "agar otobūs nayāmad, piyāde mīravīm.", alt: ["اَگَر اُتوبوس نَیایَد، پیاده می‌رَویم."] },
    { typ: "V", de: "Wenn du dich anders entscheidest, sag mir Bescheid!", fa: "اَگَر تَصمیمَت عَوَض شُد، به مَن خَبَر بِدِه!", tr: "agar tasmīmat ʿawaz schod, be man chabar bede!", alt: ["اَگَر تَصمیمَت عَوَض شَوَد، به مَن خَبَر بِدِه!"] },
    { typ: "V", de: "Wenn du in Kiel ankommst, schreib mir eine Nachricht!", fa: "اَگَر به کیل رِسیدی، به مَن پَیام بِدِه!", tr: "agar be kīl resīdī, be man payām bede!", alt: ["اَگَر به کیل بِرِسی، به مَن پَیام بِدِه!"] },
    { typ: "V", de: "Wenn ich Zeit finde, rufe ich dich heute Abend an.", fa: "اَگَر وَقت پِیدا کَردَم، اِمشَب به تو زَنگ می‌زَنَم.", tr: "agar waght peydā kardam, emschab be to zang mīzanam.", alt: ["اَگَر وَقت پِیدا کُنَم، اِمشَب به تو زَنگ می‌زَنَم."] },
    { typ: "V", de: "Wenn Minu kommt, fangen wir an.", fa: "اَگَر مینو آمَد، شُروع می‌کُنیم.", tr: "agar mīnū āmad, schorūʿ mīkonīm.", alt: ["اَگَر مینو بیایَد، شُروع می‌کُنیم."] },
    { typ: "V", de: "Wenn Maryam anruft, sag ihr Bescheid!", fa: "اَگَر مَریَم زَنگ زَد، به او خَبَر بِدِه!", tr: "agar maryam zang zad, be ū chabar bede!", alt: ["اَگَر مَریَم زَنگ بِزَنَد، به او خَبَر بِدِه!"] },

    /* ---------- selbst wenn · sonst ---------- */
    { typ: "C", de: "Selbst wenn es teuer ist, kaufe ich dieses Buch.", fa: "حَتّیٰ اَگَر گِران باشَد، این کِتاب را می‌خَرَم.", tr: "hattā agar gerān bāschad, īn ketāb rā mīcharam." },
    { typ: "C", de: "Selbst wenn es regnet, gehen wir spazieren.", fa: "حَتّیٰ اَگَر باران بیایَد، قَدَم می‌زَنیم.", tr: "hattā agar bārān biyāyad, ghadam mīzanīm." },
    { typ: "C", de: "Beeil dich, sonst verpassen wir den Zug!", fa: "عَجَله کُن، وَگَرنه به قَطار نِمی‌رِسیم!", tr: "ʿadschale kon, wagarna be ghatār nemīresīm!" },
    { typ: "C", de: "Zieh eine Jacke an, sonst erkältest du dich!", fa: "کاپشَن بِپوش، وَگَرنه سَرما می‌خوری!", tr: "kāpschan bepūsch, wagarna sarmā mīchorī!" },
    { typ: "C", de: "Wenn du keine Zeit hast, ist das auch kein Problem.", fa: "اَگَر هَم وَقت نَداری، اِشکالی نَدارَد.", tr: "agar ham waght nadārī, eschkālī nadārad." }
  ]
};
