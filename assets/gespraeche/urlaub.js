/* =========================================================
   Gesprächs-Simulation · Szenario „Wo machen wir Urlaub?“
   Dialogdatenbank für live-gespraech.html
   ---------------------------------------------------------
   Aufbau: gemeinsamer Anfang (Chat) → Reiseziel (4 Strecken:
   Meer/Sizilien, Berge/Alpen, Stadt/Barcelona, Iran/Schiras) →
   je Strecke: Packen, Verkehrsmittel → Panne unterwegs (je
   Verkehrsmittel) mit Lösungswahl → Ankunft, Aktivität →
   gemeinsames Ende: Unterkunft (Hotel/Zelt/Ferienwohnung),
   Fotos in der Gruppe.
   Die Knoten der Strecken werden unten per Schleife erzeugt
   (Texte der Reise-Pannen sind ortsneutral und werden geteilt).
   Persisch durchgehend lern-vokalisiert.
   ========================================================= */
(function () {
  const ABREISE = { de: "Tag der Abreise", fa: "روزِ حَرَکَت" };
  const ANKUNFT = { de: "Ankunft", fa: "رِسیدَن" };
  const ABEND = { de: "Am Abend", fa: "شَب" };
  const NACHT = { de: "Die erste Nacht", fa: "شَبِ اَوَّل" };

  /* ---------- Zusätze, die von früheren Wahlen abhängen ---------- */
  const GEPACKT = { wenn: "r1:koffer",
    de1: "{namen} schickt ein Foto vom fertig gepackten Koffer. 🧳", deN: "{namen} schicken Fotos von ihren fertig gepackten Koffern. 🧳",
    fa1: "{namen} یک عَکس از چَمِدانِ آماده‌اَش می‌فِرِستَد. 🧳", faN: "{namen} عَکس‌هایی از چَمِدان‌های آماده‌شان می‌فِرِستَند. 🧳" };
  const ARBEIT = { wenn: "r1:arbeit",
    de1: "{namen} muss am nächsten Morgen schon wieder arbeiten. 😩", deN: "{namen} müssen am nächsten Morgen schon wieder arbeiten. 😩",
    fa1: "{namen} بایَد فَردا صُبح دوباره سَرِ کار بِرَوَد. 😩", faN: "{namen} بایَد فَردا صُبح دوباره سَرِ کار بِرَوَند. 😩" };
  const GELD_HOTEL = { wenn: "r1:geld",
    de1: "{namen} schaut lange auf den Preis und seufzt. 😅", deN: "{namen} schauen lange auf den Preis und seufzen. 😅",
    fa1: "{namen} مُدَّتِ زیادی به قِیمَت نِگاه می‌کُنَد و آه می‌کِشَد. 😅", faN: "{namen} مُدَّتِ زیادی به قِیمَت نِگاه می‌کُنَند و آه می‌کِشَند. 😅" };
  const GELD_ZELT = { wenn: "r1:geld",
    de1: "{namen} ist glücklich: Das Zelt kostet fast nichts!", deN: "{namen} sind glücklich: Das Zelt kostet fast nichts!",
    fa1: "{namen} خوشحال اَست: چادُر تَقریباً مَجّانی اَست!", faN: "{namen} خوشحال‌اَند: چادُر تَقریباً مَجّانی اَست!" };

  const KEIN_BETT = {
    de: " Dann fragt jemand: „Moment … wo schlafen wir heute eigentlich?“ Stille. Niemand hat etwas gebucht! 😳",
    fa: " بَعد یکی می‌پُرسَد: «راستی… اِمشَب کُجا می‌خوابیم؟» سُکوت. هیچ‌کَس جایی رِزِرو نَکَرده اَست! 😳" };
  const HEIM = {
    de: " Eine Woche später sind alle wieder zu Hause – mit müden Beinen und Hunderten Fotos auf dem Handy.",
    fa: " یک هَفته بَعد هَمه دوباره در خانه‌اَند – با پاهای خَسته و صَدها عَکس در گوشی." };

  /* ---------- Packen (in jeder Strecke gleich) ---------- */
  const PACKEN = {
    de: "Was nehmt ihr mit? Ich nehme nur einen kleinen Rucksack mit.",
    fa: ["شُما چه چیزهایی با خودِتان می‌بَرید؟ من فَقَط یک کوله‌پُشتیِ کوچَک می‌بَرَم.", "شُما چه چیزهایی با خودِتان می‌بَرید؟ من فَقَط یک چَمِدانِ کوچَک می‌بَرَم.", "شُما چه چیزهایی با خودِتان می‌بَرید؟ من فَقَط یک کوله‌پُشتیِ بُزُرگ می‌بَرَم.", "شُما چه چیزهایی با خودِتان بُردید؟ من فَقَط یک کوله‌پُشتیِ کوچَک بُردَم."],
    um: "شُما چی با خودِتون می‌بَرین؟ من فَقَط یه کوله‌پُشتیِ کوچیک می‌بَرَم.",
    antworten: 2,
    optionen: [
      { id: "sonne", art: "sonne", label: { de: "Sonnencreme", fa: "ضِدِّآفتاب" }, de: "Sonnencreme und eine Sonnenbrille. Ohne die gehe ich nirgendwohin!",
        fa: ["ضِدِّآفتاب و عِینَکِ آفتابی. بِدونِ این‌ها جایی نِمی‌رَوَم!", "ضِدِّآفتاب و کُلاهِ آفتابی. بِدونِ این‌ها جایی نِمی‌رَوَم!", "ضِدِّآفتاب و عِینَکِ آفتابی. با این‌ها جایی نِمی‌رَوَم!", "ضِدِّآفتاب و عِینَکِ آفتابی. بِدونِ این‌ها جایی نَرَفتَم!"],
        um: "ضِدِّآفتاب و عِینَکِ آفتابی. بِدونِ اینا جایی نِمی‌رَم!" },
      { id: "regen", art: "regen", label: { de: "Regenjacke", fa: "بارانی" }, de: "Eine Regenjacke. Man weiß nie, wie das Wetter wird.",
        fa: ["یک بارانی. آدَم هیچ‌وَقت نِمی‌دانَد هَوا چِطُور می‌شَوَد.", "یک بارانی. آدَم هَمیشه می‌دانَد هَوا چِطُور می‌شَوَد.", "یک چَتر. آدَم هیچ‌وَقت نِمی‌دانَد هَوا چِطُور می‌شَوَد.", "یک بارانی. آدَم هیچ‌وَقت نِمی‌دانَد هَوا چِطُور بود."],
        um: "یه بارانی. آدَم هیچ‌وَقت نِمی‌دونه هَوا چی می‌شه." },
      { id: "snacks", art: "snacks", label: { de: "Snacks", fa: "خوراکی" }, de: "Viele Snacks! Auf Reisen habe ich immer Hunger.",
        fa: ["خوراکیِ زیاد! در سَفَر هَمیشه گُرُسنه‌اَم.", "خوراکیِ کَم! در سَفَر هَمیشه گُرُسنه‌اَم.", "خوراکیِ زیاد! در سَفَر هَمیشه تِشنه‌اَم.", "خوراکیِ زیاد! در سَفَر هَمیشه گُرُسنه بودَم."],
        um: "کُلّی خوراکی! تو سَفَر هَمیشه گُشنَمه." },
      { id: "powerbank", art: "powerbank", label: { de: "Powerbank", fa: "پاوِربانک" }, de: "Eine Powerbank und drei Ladekabel. Mein Akku ist immer schnell leer.",
        fa: ["یک پاوِربانک و سه کابلِ شارژ. شارژِ گوشی‌اَم هَمیشه زود تَمام می‌شَوَد.", "یک پاوِربانک و دو کابلِ شارژ. شارژِ گوشی‌اَم هَمیشه زود تَمام می‌شَوَد.", "یک پاوِربانک و سه کابلِ شارژ. شارژِ گوشی‌اَم هیچ‌وَقت زود تَمام نِمی‌شَوَد.", "یک پاوِربانک و سه کابلِ شارژ. شارژِ گوشی‌اَت هَمیشه زود تَمام می‌شَوَد."],
        um: "یه پاوِربانک و سه تا کابلِ شارژ. شارژِ گوشیم هَمیشه زود تَموم می‌شه." }
    ] };

  /* ---------- Verkehrsmittel ---------- */
  const T_ZUG = { id: "zug", art: "zug", label: { de: "Zug", fa: "قَطار" }, de: "Mit dem Zug! Das ist gut für die Umwelt.",
    fa: ["با قَطار! این بَرای مُحیطِ زیست خوب اَست.", "با قَطار! این بَرای مُحیطِ زیست بَد اَست.", "با اُتوبوس! این بَرای مُحیطِ زیست خوب اَست.", "با قَطار! این بَرای مُحیطِ زیست خوب بود."],
    um: "با قَطار! این بَرای مُحیطِ زیست خوبه." };
  const T_AUTO = { id: "auto", art: "auto", label: { de: "Auto", fa: "ماشین" }, de: "Mit dem Auto! So sind wir freier.",
    fa: ["با ماشین! این‌طُوری آزادتَریم.", "با ماشین! این‌طُوری آزادتَر بودیم.", "با قَطار! این‌طُوری آزادتَریم.", "با ماشین! این‌طُوری آزادتَر نیستیم."],
    um: "با ماشین! این‌جوری آزادتَریم." };
  const T_FLUG = { id: "flug", art: "flug", label: { de: "Flugzeug", fa: "هَواپِیما" }, de: "Mit dem Flugzeug. Das ist am schnellsten.",
    fa: ["با هَواپِیما. این از هَمه سَریع‌تَر اَست.", "با هَواپِیما. این از هَمه کُندتَر اَست.", "با قَطار. این از هَمه سَریع‌تَر اَست.", "با هَواپِیما. این از هَمه سَریع‌تَر بود."],
    um: "با هَواپِیما. از هَمه سَریع‌تَره." };
  const T_IR_BUS = { id: "bus", art: "bus", label: { de: "Bus", fa: "اُتوبوس" }, de: "Mit dem Bus. Die Busse in Iran sind billig und bequem.",
    fa: ["با اُتوبوس. اُتوبوس‌های ایران اَرزان و راحَت هَستَند.", "با اُتوبوس. اُتوبوس‌های ایران گِران و راحَت هَستَند.", "با قَطار. اُتوبوس‌های ایران اَرزان و راحَت هَستَند.", "با اُتوبوس. اُتوبوس‌های ایران اَرزان و راحَت بودَند."],
    um: "با اُتوبوس. اُتوبوسای ایران اَرزون و راحَتَن." };
  const T_IR_ZUG = { id: "nachtzug", art: "zug", label: { de: "Nachtzug", fa: "قَطارِ شَبانه" }, de: "Mit dem Nachtzug! Dann brauchen wir eine Nacht kein Hotel.",
    fa: ["با قَطارِ شَبانه! این‌طُوری یک شَب به هُتِل اِحتیاج نَداریم.", "با قَطارِ شَبانه! این‌طُوری دو شَب به هُتِل اِحتیاج نَداریم.", "با قَطارِ شَبانه! این‌طُوری یک شَب به هُتِل اِحتیاج داریم.", "با اُتوبوسِ شَبانه! این‌طُوری یک شَب به هُتِل اِحتیاج نَداریم."],
    um: "با قَطارِ شَبانه! این‌جوری یه شَب هُتِل لازِم نیست." };
  const T_IR_FLUG = { id: "inlandflug", art: "flug", label: { de: "Flugzeug", fa: "هَواپِیما" }, de: "Mit dem Flugzeug. Der Flug dauert nur eine Stunde.",
    fa: ["با هَواپِیما. پَرواز فَقَط یک ساعَت طول می‌کِشَد.", "با هَواپِیما. پَرواز فَقَط دو ساعَت طول می‌کِشَد.", "با هَواپِیما. پَرواز فَقَط یک ساعَت طول کِشید.", "با قَطار. پَرواز فَقَط یک ساعَت طول می‌کِشَد."],
    um: "با هَواپِیما. پَرواز فَقَط یه ساعَت طول می‌کِشه." };

  /* ---------- Unterwegs: eine Panne je Verkehrsmittel (ortsneutral) ---------- */
  const REISE = {
    zug: { ort: "bahnhof",
      de: "Am Bahnhof. Die Rucksäcke sind schwer, aber die Laune ist gut. Dann kommt die Durchsage: „Der Zug hat drei Stunden Verspätung.“ Alle schauen sich an.",
      fa: "در ایستگاهِ قَطار. کوله‌پُشتی‌ها سَنگین‌اَند، اَمّا حالِ هَمه خوب اَست. بَعد بُلَندگو اِعلام می‌کُنَد: «قَطار سه ساعَت تَأخیر دارَد.» هَمه به هم نِگاه می‌کُنَند.",
      pack: [["snacks", "{namen} packt sofort die Snacks aus. 🍫", "{namen} packen sofort die Snacks aus. 🍫", "{namen} فُوراً خوراکی‌ها را بیرون می‌آوَرَد. 🍫", "{namen} فُوراً خوراکی‌ها را بیرون می‌آوَرَند. 🍫"]],
      rede: {
        de: "Drei Stunden! Was machen wir jetzt?",
        fa: ["سه ساعَت! حالا چه کار کُنیم؟", "سه دَقیقه! حالا چه کار کُنیم؟", "سه ساعَت! حالا چه کار کَردیم؟", "سه ساعَت! فَردا چه کار کُنیم؟"],
        um: "سه ساعَت! حالا چی کار کُنیم؟",
        antworten: "alle",
        optionen: [
          { id: "warten", art: "warten", label: { de: "warten", fa: "صَبر" }, de: "Wir warten im Bahnhofscafé und spielen Karten.",
            fa: ["در کافه‌ی ایستگاه صَبر می‌کُنیم و وَرَق بازی می‌کُنیم.", "در کافه‌ی ایستگاه صَبر کَردیم و وَرَق بازی کَردیم.", "در کافه‌ی ایستگاه صَبر می‌کُنیم و فوتبال بازی می‌کُنیم.", "در کافه‌ی فُرودگاه صَبر می‌کُنیم و وَرَق بازی می‌کُنیم."],
            um: "تو کافه‌ی ایستگاه صَبر می‌کُنیم و وَرَق بازی می‌کُنیم." },
          { id: "bus", art: "bus", label: { de: "Fernbus", fa: "اُتوبوس" }, de: "Lasst uns den Bus nehmen! Er fährt in zwanzig Minuten.",
            fa: ["بیایید با اُتوبوس بِرَویم! بیست دَقیقه‌ی دیگَر حَرَکَت می‌کُنَد.", "بیایید با اُتوبوس بِرَویم! دو دَقیقه‌ی دیگَر حَرَکَت می‌کُنَد.", "بیایید با اُتوبوس بِرَویم! بیست دَقیقه پیش حَرَکَت کَرد.", "بیایید با تاکسی بِرَویم! بیست دَقیقه‌ی دیگَر حَرَکَت می‌کُنَد."],
            um: "بیاین با اُتوبوس بِریم! بیست دَقیقه دیگه راه می‌اُفته." },
          { id: "stadt", art: "stadt", label: { de: "Stadt ansehen", fa: "گَردِش" }, de: "Wir haben Zeit. Lasst uns spazieren gehen und die Stadt ansehen!",
            fa: ["وَقت داریم. بیایید قَدَم بِزَنیم و شَهر را بِبینیم!", "وَقت نَداریم. بیایید قَدَم بِزَنیم و شَهر را بِبینیم!", "وَقت داریم. بیایید قَدَم بِزَنیم و موزه را بِبینیم!", "وَقت داشتیم. قَدَم زَدیم و شَهر را دیدیم!"],
            um: "وَقت داریم. بیاین قَدَم بِزَنیم و شَهرو بِبینیم!" }
        ] },
      loesung: {
        warten: { de: "Drei Stunden, zwanzig Kartenspiele, sechs Kaffees. Als der Zug endlich kommt, sind alle Weltmeister im Kartenspielen.",
          fa: "سه ساعَت، بیست دَستِ وَرَق، شِش قَهوه. وَقتی قَطار بالاخَره می‌آیَد، هَمه قَهرَمانِ وَرَق‌بازی شُده‌اَند." },
        bus: { de: "Der Bus ist voll und eng, aber er fährt sofort los. Ein Mann singt die ganze Fahrt – zum Glück ziemlich schön.",
          fa: "اُتوبوس پُر و تَنگ اَست، اَمّا فُوراً راه می‌اُفتَد. یک مَرد تَمامِ راه آواز می‌خوانَد – خوشبَختانه نِسبَتاً قَشَنگ." },
        stadt: { de: "Die Stadt ist überraschend schön: eine kleine Bäckerei, ein alter Markt, ein Brunnen. Fast hätten alle den Zug verpasst!",
          fa: "شَهر واقِعاً قَشَنگ اَست: یک نانواییِ کوچَک، یک بازارِ قَدیمی، یک فَوّاره. نَزدیک بود هَمه قَطار را از دَست بِدَهَند!" }
      } },
    auto: { ort: "strasse",
      de: "Fünf Stunden Autobahn, das Auto ist voll bis unters Dach. Plötzlich: ein komisches Geräusch – und das Auto bleibt stehen. Panne!",
      fa: "پَنج ساعَت اُتوبان، و ماشین تا سَقف پُر اَست. ناگَهان یک صِدای عَجیب – و ماشین می‌ایستَد. خَراب شُده اَست!",
      pack: [["powerbank", "Zum Glück hat {namen} eine Powerbank dabei – die Handys funktionieren noch. 🔋", "Zum Glück haben {namen} Powerbanks dabei – die Handys funktionieren noch. 🔋", "خوشبَختانه {namen} پاوِربانک هَمراهَش دارَد – گوشی‌ها هَنوز کار می‌کُنَند. 🔋", "خوشبَختانه {namen} پاوِربانک هَمراهِشان دارَند – گوشی‌ها هَنوز کار می‌کُنَند. 🔋"]],
      rede: {
        de: "Oh nein, das Auto ist kaputt! Was machen wir jetzt?",
        fa: ["وای نه، ماشین خَراب شُده اَست! حالا چه کار کُنیم؟", "وای نه، ماشین دُرُست شُده اَست! حالا چه کار کُنیم؟", "وای نه، ماشین خَراب شُده اَست! حالا چه کار کَردیم؟", "وای نه، ماشین خَراب شُده اَست! فَردا چه کار کُنیم؟"],
        um: "وای نه، ماشین خَراب شُده! حالا چی کار کُنیم؟",
        antworten: "alle",
        optionen: [
          { id: "pannendienst", art: "pannendienst", label: { de: "Mechaniker", fa: "مِکانیک" }, de: "Wir rufen einen Mechaniker an. Das ist am sichersten.",
            fa: ["به یک مِکانیک زَنگ می‌زَنیم. این از هَمه مُطمَئِن‌تَر اَست.", "به یک مِکانیک زَنگ زَدیم. این از هَمه مُطمَئِن‌تَر اَست.", "به پُلیس زَنگ می‌زَنیم. این از هَمه مُطمَئِن‌تَر اَست.", "به یک مِکانیک زَنگ می‌زَنیم. این از هَمه خَطَرناک‌تَر اَست."],
            um: "به یه مِکانیک زَنگ می‌زَنیم. این از هَمه مُطمَئِن‌تَره." },
          { id: "anhalten", art: "anhalten", label: { de: "Hilfe suchen", fa: "کُمَک گِرِفتَن" }, de: "Wir halten ein Auto an und bitten um Hilfe.",
            fa: ["یک ماشین را نِگَه می‌داریم و کُمَک می‌خواهیم.", "یک ماشین را نِگَه داشتیم و کُمَک خواستیم.", "یک اُتوبوس را نِگَه می‌داریم و کُمَک می‌خواهیم.", "یک ماشین را نِگَه می‌داریم و کُمَک نِمی‌خواهیم."],
            um: "یه ماشین نِگَه می‌داریم و کُمَک می‌خوایم." },
          { id: "selbst", art: "selbst", label: { de: "selbst reparieren", fa: "خودِمان" }, de: "Niemand! Ich repariere es selbst – ich habe Videos gesehen.",
            fa: ["هیچ‌کَس! خودَم دُرُستَش می‌کُنَم – ویدیو دیده‌اَم.", "هیچ‌کَس! خودَم دُرُستَش کَردَم – ویدیو دیده‌اَم.", "هیچ‌کَس! خودَت دُرُستَش می‌کُنی – ویدیو دیده‌ای.", "هیچ‌کَس! خودَم دُرُستَش می‌کُنَم – ویدیو نَدیده‌اَم."],
            um: "هیچ‌کی! خودَم دُرُستِش می‌کُنَم – ویدیو دیدَم." }
        ] },
      loesung: {
        pannendienst: { de: "Nach einer Stunde kommt ein gelber Wagen. Der Mechaniker schaut zehn Sekunden und sagt nur: „Kein Benzin mehr.“ Wie peinlich!",
          fa: "بَعد از یک ساعَت یک ماشینِ زَرد می‌آیَد. مِکانیک دَه ثانیه نِگاه می‌کُنَد و فَقَط می‌گویَد: «بِنزین تَمام شُده اَست.» چه خِجالَت‌آوَر!" },
        anhalten: { de: "Ein alter Traktor hält an. Der Bauer zieht das Auto bis ins nächste Dorf – sehr langsam, aber mit lauter Musik.",
          fa: "یک تِراکتورِ قَدیمی می‌ایستَد. کِشاوَرز ماشین را تا روستای بَعدی می‌کِشَد – خیلی آهِسته، اَمّا با موسیقیِ بُلَند." },
        selbst: { de: "Zwei Stunden später, mit einem Video und schmutzigen Händen … fährt das Auto wieder! Niemand weiß genau, warum.",
          fa: "دو ساعَت بَعد، با یک ویدیو و دَست‌های کَثیف… ماشین دوباره راه می‌اُفتَد! هیچ‌کَس دَقیقاً نِمی‌دانَد چِرا." }
      } },
    flug: { ort: "flughafen",
      de: "Der Flug ist ruhig und pünktlich. Am Gepäckband warten alle auf ihre Koffer. Ein Koffer nach dem anderen kommt – nur einer nicht.",
      fa: "پَرواز آرام و سَرِ وَقت اَست. هَمه کِنارِ نَوارِ چَمِدان مُنتَظِرِ چَمِدان‌هایِشان هَستَند. چَمِدان‌ها یکی‌یکی می‌آیَند – به جُز یکی.",
      pack: [["snacks", "{namen} hat im Flugzeug schon alle Snacks aufgegessen. 🍪", "{namen} haben im Flugzeug schon alle Snacks aufgegessen. 🍪", "{namen} در هَواپِیما هَمه‌ی خوراکی‌ها را خورده اَست. 🍪", "{namen} در هَواپِیما هَمه‌ی خوراکی‌ها را خورده‌اَند. 🍪"]],
      rede: {
        de: "Mein Koffer ist nicht da! Was soll ich jetzt machen?",
        fa: ["چَمِدانَم نَیامَده اَست! حالا چه کار کُنَم؟", "چَمِدانَت نَیامَده اَست! حالا چه کار کُنَم؟", "چَمِدانَم آمَده اَست! حالا چه کار کُنَم؟", "چَمِدانَم نَیامَده اَست! حالا چه کار کَردَم؟"],
        um: "چَمِدونَم نَیومَده! حالا چی کار کُنَم؟",
        antworten: "alle",
        optionen: [
          { id: "schalter", art: "schalter", label: { de: "Schalter", fa: "باجه" }, de: "Geh zum Schalter und füll ein Formular aus.",
            fa: ["بُرو به باجه و یک فُرم پُر کُن.", "بُرو به باجه و یک فُرم اِمضا کُن.", "بُرو به باجه و یک بِلیت بِخَر.", "رَفتی به باجه و یک فُرم پُر کَردی."],
            um: "بُرو باجه و یه فُرم پُر کُن." },
          { id: "teilen", art: "teilen", label: { de: "Kleidung leihen", fa: "قَرض دادَن" }, de: "Kein Problem! Ich leihe dir meine Kleidung.",
            fa: ["مُشکِلی نیست! لِباس‌هایَم را به تو قَرض می‌دَهَم.", "مُشکِلی نیست! لِباس‌هایَم را به تو قَرض دادَم.", "مُشکِلی نیست! کَفش‌هایَم را به تو قَرض می‌دَهَم.", "مُشکِلی نیست! لِباس‌هایَت را به من قَرض بِدِه."],
            um: "مُشکِلی نیست! لِباسامو بِهِت قَرض می‌دَم." },
          { id: "kaufen", art: "kaufen", label: { de: "einkaufen", fa: "خَرید" }, de: "Super, dann gehen wir neue Kleidung kaufen!",
            fa: ["عالی، پَس بِرَویم لِباسِ نو بِخَریم!", "عالی، پَس رَفتیم لِباسِ نو خَریدیم!", "عالی، پَس بِرَویم کَفشِ نو بِخَریم!", "عالی، پَس بِرَویم لِباسِ کُهنه بِخَریم!"],
            um: "عالیه، پَس بِریم لِباسِ نو بِخَریم!" }
        ] },
      loesung: {
        schalter: { de: "Die Frau am Schalter ist sehr freundlich. Zwei Tage später bringt ein Bote den Koffer – mit einem neuen Aufkleber und einem kleinen Loch.",
          fa: "خانُمِ پُشتِ باجه خیلی مِهرَبان اَست. دو روز بَعد یک پِیک چَمِدان را می‌آوَرَد – با یک بَرچَسبِ جَدید و یک سوراخِ کوچَک." },
        teilen: { de: "Zwei Tage lang tragen alle die Kleidung der anderen. Auf den Fotos sehen alle aus wie eine verrückte Band.",
          fa: "دو روز هَمه لِباس‌های هَمدیگَر را می‌پوشَند. در عَکس‌ها هَمه شَبیهِ یک گُروهِ موسیقیِ دیوانه هَستَند." },
        kaufen: { de: "Shoppen statt Sightseeing! Nach drei Stunden hat jeder eine neue Tüte – und am Abend kommt der Koffer doch noch.",
          fa: "به جای گَردِش، خَرید! بَعد از سه ساعَت هَر کَس یک کیسه‌ی خَریدِ جَدید دارَد – و شَب چَمِدان بالاخَره می‌رَسَد." }
      } },
    bus: { ort: "wueste",
      de: "Der Bus ist modern und hat große Sitze. Mitten in der Wüste hält er plötzlich an. Der Fahrer steigt aus, schaut auf den Motor und schüttelt den Kopf.",
      fa: "اُتوبوس مُدِرن اَست و صَندَلی‌های بُزُرگی دارَد. وَسَطِ کَویر ناگَهان می‌ایستَد. رانَنده پیاده می‌شَوَد، به موتور نِگاه می‌کُنَد و سَرَش را تَکان می‌دَهَد.",
      pack: [["sonne", "Zum Glück hat {namen} Sonnencreme dabei. ☀️", "Zum Glück haben {namen} Sonnencreme dabei. ☀️", "خوشبَختانه {namen} ضِدِّآفتاب هَمراهَش دارَد. ☀️", "خوشبَختانه {namen} ضِدِّآفتاب هَمراهِشان دارَند. ☀️"],
             ["snacks", "{namen} teilt die Snacks mit den anderen Fahrgästen.", "{namen} teilen die Snacks mit den anderen Fahrgästen.", "{namen} خوراکی‌ها را با مُسافِرهای دیگَر تَقسیم می‌کُنَد.", "{namen} خوراکی‌ها را با مُسافِرهای دیگَر تَقسیم می‌کُنَند."]],
      rede: {
        de: "Der Bus ist kaputt! Es ist heiß, und wir sind mitten in der Wüste.",
        fa: ["اُتوبوس خَراب شُده اَست! هَوا گَرم اَست و ما وَسَطِ کَویر هَستیم.", "اُتوبوس خَراب شُده اَست! هَوا سَرد اَست و ما وَسَطِ کَویر هَستیم.", "اُتوبوس خَراب شُده اَست! هَوا گَرم اَست و ما وَسَطِ جَنگَل هَستیم.", "اُتوبوس خَراب شُده بود! هَوا گَرم بود و ما وَسَطِ کَویر بودیم."],
        um: "اُتوبوس خَراب شُده! هَوا گَرمه و ما وَسَطِ کَویریم.",
        antworten: "alle",
        optionen: [
          { id: "tee", art: "tee", label: { de: "Tee trinken", fa: "چای" }, de: "Dort ist ein kleines Teehaus. Lasst uns Tee trinken!",
            fa: ["آن‌جا یک قَهوه‌خانه‌ی کوچَک هَست. بیایید چای بُخوریم!", "آن‌جا یک قَهوه‌خانه‌ی بُزُرگ هَست. بیایید چای بُخوریم!", "آن‌جا یک رِستورانِ کوچَک هَست. بیایید چای بُخوریم!", "آن‌جا یک قَهوه‌خانه‌ی کوچَک بود. چای خوردیم!"],
            um: "اون‌جا یه قَهوه‌خونه‌ی کوچیک هَست. بیاین چای بُخوریم!" },
          { id: "fotos", art: "fotos", label: { de: "Fotos machen", fa: "عَکس" }, de: "Egal! Die Wüste ist wunderschön. Ich mache Fotos.",
            fa: ["مُهِم نیست! کَویر خیلی زیباست. من عَکس می‌گیرَم.", "مُهِم نیست! کَویر خیلی زِشت اَست. من عَکس می‌گیرَم.", "مُهِم نیست! کَویر خیلی زیباست. من عَکس گِرِفتَم.", "مُهِم نیست! کَویر خیلی زیباست. تو عَکس می‌گیری."],
            um: "مُهِم نیست! کَویر خیلی قَشَنگه. من عَکس می‌گیرَم." },
          { id: "helfen", art: "helfen", label: { de: "helfen", fa: "کُمَک" }, de: "Ich helfe dem Fahrer. Ich kenne mich mit Motoren gut aus.",
            fa: ["من به رانَنده کُمَک می‌کُنَم. موتور را خوب می‌شِناسَم.", "من به رانَنده کُمَک کَردَم. موتور را خوب می‌شِناسَم.", "من به رانَنده کُمَک می‌کُنَم. موتور را خوب نِمی‌شِناسَم.", "تو به رانَنده کُمَک می‌کُنی. موتور را خوب می‌شِناسی."],
            um: "من به رانَنده کُمَک می‌کُنَم. موتورو خوب می‌شِناسَم." }
        ] },
      loesung: {
        tee: { de: "Im Teehaus gibt es Tee, Datteln und ein altes Radio. Der Besitzer will kein Geld: „Ihr seid meine Gäste!“ Nach zwei Stunden kommt ein neuer Bus.",
          fa: "در قَهوه‌خانه چای، خُرما و یک رادیوی قَدیمی هَست. صاحِبِ قَهوه‌خانه پول نِمی‌گیرَد: «شُما مِهمانِ من هَستید!» بَعد از دو ساعَت یک اُتوبوسِ جَدید می‌رَسَد." },
        fotos: { de: "Sand, Himmel und Stille. Die Fotos sind so schön, dass später alle denken, sie sind aus einem Film. Nach zwei Stunden kommt ein neuer Bus.",
          fa: "شِن، آسِمان و سُکوت. عَکس‌ها آن‌قَدر قَشَنگ‌اَند که بَعداً هَمه فِکر می‌کُنَند از یک فیلم هَستَند. بَعد از دو ساعَت یک اُتوبوسِ جَدید می‌رَسَد." },
        helfen: { de: "Der Fahrer ist überrascht – aber nach einer halben Stunde läuft der Motor wieder! Alle Fahrgäste klatschen.",
          fa: "رانَنده تَعَجُّب می‌کُنَد – اَمّا بَعد از نیم ساعَت موتور دوباره رُوشَن می‌شَوَد! هَمه‌ی مُسافِرها دَست می‌زَنَند." }
      } }
  };

  /* ---------- Die vier Strecken ---------- */
  const STRECKEN = {
    m: { ort: "meer", transport: [T_ZUG, T_AUTO, T_FLUG],
      e2: { de: "Sizilien! Plötzlich ist die Gruppe voller Fotos: blaues Meer, alte Städte, riesige Eisbecher. Nur ein Problem: Bis Sizilien sind es fast 2.500 Kilometer.",
        fa: "سیسیل! ناگَهان گُروه پُر از عَکس می‌شَوَد: دَریای آبی، شَهرهای قَدیمی، بَستَنی‌های بُزُرگ. فَقَط یک مُشکِل: تا سیسیل تَقریباً دو هِزار و پانصَد کیلومِتر راه اَست." },
      r3: { de: "Sizilien ist sehr weit weg. Wie fahren wir dorthin?",
        fa: ["سیسیل خیلی دور اَست. چِطُور به آن‌جا بِرَویم؟", "سیسیل خیلی نَزدیک اَست. چِطُور به آن‌جا بِرَویم؟", "سیسیل خیلی دور بود. چِطُور به آن‌جا بِرَویم؟", "سیسیل خیلی دور اَست. کِی به آن‌جا بِرَویم؟"],
        um: "سیسیل خیلی دوره. چِطوری بِریم اون‌جا؟" },
      e5: { de: "Endlich in Sizilien! Das Meer ist türkisblau, die Sonne ist heiß, und überall riecht es nach Zitronen.",
        fa: "بالاخَره در سیسیل! دَریا فیروزه‌ای اَست، آفتاب داغ اَست و هَمه‌جا بوی لیمو می‌آیَد." },
      r5: { de: "Was machen wir zuerst? Schwimmen, Eis essen oder schlafen?",
        fa: ["اَوَّل چه کار کُنیم؟ شِنا کُنیم، بَستَنی بُخوریم یا بِخوابیم؟", "اَوَّل چه کار کَردیم؟ شِنا کَردیم، بَستَنی خوردیم یا خوابیدیم؟", "اَوَّل چه کار کُنیم؟ شِنا کُنیم، قَهوه بُخوریم یا بِخوابیم؟", "بَعداً چه کار کُنیم؟ شِنا کُنیم، بَستَنی بُخوریم یا بِخوابیم؟"],
        um: "اَوَّل چی کار کُنیم؟ شِنا کُنیم، بَستَنی بُخوریم یا بِخوابیم؟",
        optionen: [
          { id: "schwimmen", art: "schwimmen", label: { de: "schwimmen", fa: "شِنا" }, de: "Schwimmen! Das Wasser ist bestimmt warm.",
            fa: ["شِنا! آب حَتماً گَرم اَست.", "شِنا! آب حَتماً سَرد اَست.", "شِنا! آب حَتماً گَرم بود.", "دَویدَن! آب حَتماً گَرم اَست."],
            um: "شِنا! آب حَتماً گَرمه." },
          { id: "eis", art: "eis", label: { de: "Eis", fa: "بَستَنی" }, de: "Eis! In Italien esse ich jeden Tag zwei Eis.",
            fa: ["بَستَنی! در ایتالیا هَر روز دو تا بَستَنی می‌خورَم.", "بَستَنی! در ایتالیا هَر روز دو تا بَستَنی خوردَم.", "بَستَنی! در ایتالیا هَر هَفته دو تا بَستَنی می‌خورَم.", "بَستَنی! در ایتالیا هَر روز دو تا پیتزا می‌خورَم."],
            um: "بَستَنی! تو ایتالیا هَر روز دو تا بَستَنی می‌خورَم." },
          { id: "schlafen", art: "schlafen", label: { de: "schlafen", fa: "خواب" }, de: "Ich lege mich unter einen Sonnenschirm und schlafe.",
            fa: ["من زیرِ یک چَترِ آفتابی دِراز می‌کِشَم و می‌خوابَم.", "من زیرِ یک چَترِ آفتابی دِراز کِشیدَم و خوابیدَم.", "من کِنارِ یک چَترِ آفتابی دِراز می‌کِشَم و می‌خوابَم.", "تو زیرِ یک چَترِ آفتابی دِراز می‌کِشی و می‌خوابی."],
            um: "من زیرِ یه چَترِ آفتابی دِراز می‌کِشَم و می‌خوابَم." }
        ] },
      e6: { de: "Der Tag am Strand ist perfekt. Abends gibt es frischen Fisch und Pasta in einem kleinen Restaurant am Hafen.",
        fa: "روز در ساحِل عالی می‌گُذَرَد. شَب در یک رِستورانِ کوچَک کِنارِ بَندَر ماهیِ تازه و پاستا می‌خورَند." } },

    b: { ort: "berge", transport: [T_ZUG, T_AUTO, T_FLUG],
      e2: { de: "Die Alpen! In der Gruppe landen Fotos von Seen, Kühen und hohen Gipfeln. Jemand schreibt: „Ich war noch nie auf einem richtigen Berg!“",
        fa: "آلپ! در گُروه عَکس‌هایی از دَریاچه‌ها، گاوها و قُلّه‌های بُلَند می‌آیَد. یکی می‌نِویسَد: «من تا حالا بالای یک کوهِ واقِعی نَرَفته‌اَم!»" },
      r3: { de: "Die Alpen sind nicht so weit weg. Wie fahren wir hin?",
        fa: ["آلپ آن‌قَدر دور نیست. چِطُور به آن‌جا بِرَویم؟", "آلپ آن‌قَدر نَزدیک نیست. چِطُور به آن‌جا بِرَویم؟", "آلپ آن‌قَدر دور نَبود. چِطُور به آن‌جا بِرَویم؟", "آلپ آن‌قَدر دور نیست. چِرا به آن‌جا بِرَویم؟"],
        um: "آلپ اون‌قَدر دور نیست. چِطوری بِریم اون‌جا؟" },
      e5: { de: "Endlich in den Alpen! Die Luft ist frisch, überall hört man Kuhglocken. Vor ihnen steht ein großer Berg.",
        fa: "بالاخَره در آلپ! هَوا تازه اَست و هَمه‌جا صِدای زَنگوله‌ی گاوها می‌آیَد. جِلوی آن‌ها یک کوهِ بُزُرگ اَست." },
      r5: { de: "Wollen wir bis ganz nach oben wandern? Das dauert sechs Stunden.",
        fa: ["می‌خواهید تا بالای کوه پیاده بِرَویم؟ شِش ساعَت طول می‌کِشَد.", "می‌خواهید تا بالای کوه پیاده بِرَویم؟ دو ساعَت طول می‌کِشَد.", "می‌خواهید تا پایینِ کوه پیاده بِرَویم؟ شِش ساعَت طول می‌کِشَد.", "می‌خواهید تا بالای کوه پیاده بِرَویم؟ شِش ساعَت طول کِشید."],
        um: "می‌خواین تا بالای کوه پیاده بِریم؟ شِش ساعَت طول می‌کِشه.",
        optionen: [
          { id: "hoch", art: "ja", de: "Ja! Von oben ist die Aussicht bestimmt toll.",
            fa: ["آره! از بالا مَنظَره حَتماً عالی اَست.", "آره! از پایین مَنظَره حَتماً عالی اَست.", "آره! از بالا مَنظَره حَتماً عالی بود.", "نه! از بالا مَنظَره حَتماً عالی اَست."],
            um: "آره! از بالا مَنظَره حَتماً مَعرَکه‌ست." },
          { id: "seilbahn", art: "nein", de: "Nein, ich fahre lieber mit der Seilbahn. Meine Beine sind faul.",
            fa: ["نه، تَرجیح می‌دَهَم با تِله‌کابین بِرَوَم. پاهایَم تَنبَل هَستَند.", "نه، تَرجیح می‌دَهَم با تِله‌کابین بِرَوَم. پاهایَم قَوی هَستَند.", "نه، تَرجیح می‌دَهَم با اُتوبوس بِرَوَم. پاهایَم تَنبَل هَستَند.", "نه، تَرجیح دادَم با تِله‌کابین بِرَوَم. پاهایَم تَنبَل بودَند."],
            um: "نه، تَرجیح می‌دَم با تِله‌کابین بِرَم. پاهام تَنبَلَن." },
          { id: "huette", art: "vielleicht", de: "Vielleicht bis zur Hütte in der Mitte. Dort gibt es Kuchen.",
            fa: ["شاید تا کُلبه‌ی وَسَطِ راه. آن‌جا کیک دارَند.", "شاید تا کُلبه‌ی بالای کوه. آن‌جا کیک دارَند.", "شاید تا کُلبه‌ی وَسَطِ راه. آن‌جا کیک نَدارَند.", "شاید تا کُلبه‌ی وَسَطِ راه. آن‌جا کیک داشتَند."],
            um: "شاید تا کُلبه‌ی وَسَطِ راه. اون‌جا کیک دارَن." }
        ] },
      e6: { de: "Am Ende des Tages sehen alle die Wolken unter sich – manche von ganz oben, manche aus der Seilbahn, manche mit Kuchen in der Hütte. Abends: müde Beine, glückliche Gesichter.",
        fa: "آخَرِ روز هَمه اَبرها را زیرِ پایِشان می‌بینَند – بَعضی از بالای کوه، بَعضی از داخِلِ تِله‌کابین، بَعضی با کیک در کُلبه. شَب: پاهای خَسته، صورَت‌های شاد." } },

    s: { ort: "stadt", transport: [T_ZUG, T_AUTO, T_FLUG],
      e2: { de: "Barcelona! Sofort gibt es einen Plan: morgens Strand, nachmittags Museum, abends Tapas. Jetzt fehlt nur noch die Reise dorthin.",
        fa: "بارسِلونا! فُوراً یک بَرنامه دُرُست می‌شَوَد: صُبح ساحِل، بَعدازظُهر موزه، شَب تاپاس. حالا فَقَط سَفَر تا آن‌جا مانده اَست." },
      r3: { de: "Wie kommen wir nach Barcelona? Die Tickets sind ein bisschen teuer.",
        fa: ["چِطُور به بارسِلونا بِرَویم؟ بِلیت‌ها کَمی گِران هَستَند.", "چِطُور به بارسِلونا بِرَویم؟ بِلیت‌ها کَمی اَرزان هَستَند.", "چِطُور به بارسِلونا بِرَویم؟ بِلیت‌ها کَمی گِران بودَند.", "چِطُور از بارسِلونا بِرَویم؟ بِلیت‌ها کَمی گِران هَستَند."],
        um: "چِطوری بِریم بارسِلونا؟ بِلیتا یه کَم گِرونَن." },
      e5: { de: "Barcelona! Die Straßen sind voll, überall gibt es Musik, und die Häuser von Gaudí sehen aus wie aus einem Märchen.",
        fa: "بارسِلونا! خیابان‌ها شُلوغ‌اَند، هَمه‌جا موسیقی هَست و خانه‌های گائودی شَبیهِ قِصّه‌ها هَستَند." },
      r5: { de: "Für den Park Güell gibt es nur noch Tickets für acht Uhr morgens. Kaufen wir sie?",
        fa: ["بَرای پارکِ گوئِل فَقَط بِلیتِ ساعَتِ هَشتِ صُبح مانده اَست. بِخَریم؟", "بَرای پارکِ گوئِل فَقَط بِلیتِ ساعَتِ هَشتِ شَب مانده اَست. بِخَریم؟", "بَرای پارکِ گوئِل فَقَط بِلیتِ ساعَتِ هَشتِ صُبح مانده بود. بِخَریم؟", "بَرای پارکِ گوئِل فَقَط بِلیتِ ساعَتِ هَشتِ صُبح مانده اَست. بِخَرید؟"],
        um: "بَرای پارکِ گوئِل فَقَط بِلیتِ ساعَتِ هَشتِ صُبح مونده. بِخَریم؟",
        optionen: [
          { id: "frueh", art: "ja", de: "Ja! Früh aufstehen ist kein Problem für mich.",
            fa: ["آره! زود بیدار شُدَن بَرای من مُشکِلی نیست.", "آره! دیر بیدار شُدَن بَرای من مُشکِلی نیست.", "آره! زود بیدار شُدَن بَرای من مُشکِل اَست.", "آره! زود بیدار شُدَن بَرای تو مُشکِلی نیست."],
            um: "آره! زود بیدار شُدَن بَرام مُشکِلی نیست." },
          { id: "strand", art: "nein", de: "Nein, um acht Uhr schlafe ich noch. Ich gehe lieber an den Strand!",
            fa: ["نه، ساعَتِ هَشت هَنوز خوابَم. تَرجیح می‌دَهَم به ساحِل بِرَوَم!", "نه، ساعَتِ دَه هَنوز خوابَم. تَرجیح می‌دَهَم به ساحِل بِرَوَم!", "نه، ساعَتِ هَشت هَنوز خواب بودَم. تَرجیح می‌دَهَم به ساحِل بِرَوَم!", "نه، ساعَتِ هَشت هَنوز خوابَم. تَرجیح می‌دَهَم به موزه بِرَوَم!"],
            um: "نه، ساعَتِ هَشت هَنوز خوابَم. تَرجیح می‌دَم بِرَم ساحِل!" },
          { id: "teuer", art: "vielleicht", de: "Vielleicht. Ist das nicht ein bisschen teuer?",
            fa: ["شاید. کَمی گِران نیست؟", "شاید. کَمی اَرزان نیست؟", "حَتماً. کَمی گِران نیست؟", "شاید. کَمی گِران نَبود؟"],
            um: "شاید. یه کَم گِرون نیست؟" }
        ] },
      e6: { de: "Der Tag in Barcelona ist lang: bunte Mosaike, ein Markt voller Obst und am Abend Tapas bis Mitternacht.",
        fa: "روز در بارسِلونا طولانی اَست: موزاییک‌های رَنگارَنگ، یک بازارِ پُر از میوه و شَب تاپاس تا نیمه‌شَب." } },

    i: { ort: "iran", transport: [T_IR_BUS, T_IR_ZUG, T_IR_FLUG],
      e2: { de: "Iran! Der Plan: zuerst nach Teheran fliegen und von dort weiter in den Süden, nach Schiras. Endlich kann man das Persisch aus dem Kurs ausprobieren!",
        fa: "ایران! بَرنامه: اَوَّل با هَواپِیما به تِهران و از آن‌جا به جُنوب، به شیراز. بالاخَره می‌شَوَد فارسیِ کِلاس را اِمتِحان کَرد!" },
      r3: { de: "Von Teheran nach Schiras sind es fast tausend Kilometer. Wie fahren wir?",
        fa: ["از تِهران تا شیراز تَقریباً هِزار کیلومِتر اَست. چِطُور بِرَویم؟", "از تِهران تا شیراز تَقریباً صَد کیلومِتر اَست. چِطُور بِرَویم؟", "از تِهران تا شیراز تَقریباً هِزار کیلومِتر بود. چِطُور بِرَویم؟", "از تِهران تا شیراز تَقریباً هِزار کیلومِتر اَست. کِی بِرَویم؟"],
        um: "از تِهران تا شیراز نَزدیکِ هِزار کیلومِتره. چِطوری بِریم؟" },
      e5: { de: "Schiras! Die Stadt der Gärten und der Dichter. In der Luft liegt der Duft von Orangenblüten.",
        fa: "شیراز! شَهرِ باغ‌ها و شاعِرها. بوی بَهارنارِنج در هَوا پیچیده اَست." },
      r5: { de: "Was sehen wir uns zuerst an? Persepolis, den Eram-Garten oder den Basar?",
        fa: ["اَوَّل کُجا را بِبینیم؟ تَختِ جَمشید، باغِ اِرَم یا بازار؟", "اَوَّل کُجا را دیدیم؟ تَختِ جَمشید، باغِ اِرَم یا بازار؟", "بَعداً کُجا را بِبینیم؟ تَختِ جَمشید، باغِ اِرَم یا بازار؟", "اَوَّل چه کَسی را بِبینیم؟ تَختِ جَمشید، باغِ اِرَم یا بازار؟"],
        um: "اَوَّل کُجا رو بِبینیم؟ تَختِ جَمشید، باغِ اِرَم یا بازار؟",
        optionen: [
          { id: "persepolis", art: "persepolis", label: { de: "Persepolis", fa: "تَختِ جَمشید" }, de: "Persepolis! Ich möchte die alten Ruinen sehen.",
            fa: ["تَختِ جَمشید! می‌خواهَم ویرانه‌های قَدیمی را بِبینَم.", "تَختِ جَمشید! می‌خواهَم ساختِمان‌های جَدید را بِبینَم.", "تَختِ جَمشید! می‌خواهی ویرانه‌های قَدیمی را بِبینی.", "تَختِ جَمشید! نِمی‌خواهَم ویرانه‌های قَدیمی را بِبینَم."],
            um: "تَختِ جَمشید! می‌خوام خَرابه‌های قَدیمی رو بِبینَم." },
          { id: "eram", art: "eram", label: { de: "Eram-Garten", fa: "باغِ اِرَم" }, de: "Den Eram-Garten. Dort ist es grün und ruhig.",
            fa: ["باغِ اِرَم. آن‌جا سَبز و آرام اَست.", "باغِ اِرَم. آن‌جا سَبز و شُلوغ اَست.", "باغِ اِرَم. این‌جا سَبز و آرام اَست.", "باغِ اِرَم. آن‌جا سَبز و آرام بود."],
            um: "باغِ اِرَم. اون‌جا سَبز و آرومه." },
          { id: "basar", art: "basar", label: { de: "Basar", fa: "بازار" }, de: "Den Basar! Ich will Gewürze und ein Geschenk für meine Mutter kaufen.",
            fa: ["بازار! می‌خواهَم اَدویه و یک هِدیه بَرای مادَرَم بِخَرَم.", "بازار! می‌خواهَم اَدویه و یک هِدیه بَرای مادَرَت بِخَرَم.", "بازار! می‌خواهَم اَدویه و یک هِدیه بَرای پِدَرَم بِخَرَم.", "بازار! نِمی‌خواهَم اَدویه و یک هِدیه بَرای مادَرَم بِخَرَم."],
            um: "بازار! می‌خوام اَدویه و یه کادو بَرای مامانَم بِخَرَم." }
        ] },
      e6: { de: "Am Abend sitzen alle in einem alten Teehaus. Am Nebentisch liest ein Mann Gedichte von Hafis vor, und eine Familie aus Schiras lädt die Gruppe zu Faludeh ein – einem kalten Dessert.",
        fa: "شَب هَمه در یک چایخانه‌ی قَدیمی نِشَسته‌اَند. مَردی سَرِ میزِ کِناری شِعرِ حافِظ می‌خوانَد و یک خانِواده‌ی شیرازی گُروه را به فالوده دَعوَت می‌کُنَد." } }
  };

  /* ---------- Gemeinsame Knoten ---------- */
  const K = {
    /* Episode 1: Chat – Semesterferien */
    e1: { typ: "szene", ort: "chat", zeit: { de: "Mittwoch, 21 Uhr", fa: "چَهارشَنبه، ساعَتِ نُهِ شَب" },
      de: "Die letzte Prüfung ist geschrieben, das Semester ist fast vorbei. {alle} sind zusammen in einer WhatsApp-Gruppe: „Reisefieber ✈️“. Bis jetzt war die Gruppe still – aber heute Abend nicht …",
      fa: "آخَرین اِمتِحان تَمام شُده و تِرم تَقریباً به پایان رِسیده اَست. {alle} با هم در یک گُروهِ واتس‌اَپ هَستَند: «تَبِ سَفَر ✈️». تا حالا گُروه ساکِت بود – اَمّا اِمشَب نه…",
      weiter: "r1" },
    r1: { typ: "rede", ort: "chat",
      de: "Hallo Leute! Bald beginnen die Semesterferien. Wollen wir zusammen verreisen?",
      fa: ["سَلام بَچّه‌ها! به‌زودی تَعطیلاتِ دانِشگاه شُروع می‌شَوَد. می‌خواهید با هم سَفَر کُنیم؟", "سَلام بَچّه‌ها! به‌زودی تَعطیلاتِ دانِشگاه تَمام می‌شَوَد. می‌خواهید با هم سَفَر کُنیم؟", "سَلام بَچّه‌ها! به‌زودی تَعطیلاتِ دانِشگاه شُروع می‌شَوَد. می‌خواهید با هم سَفَر کُنید؟", "سَلام بَچّه‌ها! به‌زودی تَعطیلاتِ دانِشگاه شُروع می‌شَوَد. می‌خواهید با هم سَفَر کَردیم؟"],
      um: "سَلام بَچّه‌ها! به‌زودی تَعطیلاتِ دانِشگاه شُروع می‌شه. می‌خواین با هم بِریم سَفَر؟",
      antworten: 2,
      optionen: [
        { id: "dabei", art: "ja", de: "Ja, ich komme mit! Ich brauche wirklich Urlaub.",
          fa: ["آره، من هم می‌آیَم! واقِعاً به تَعطیلات اِحتیاج دارَم.", "آره، من هم می‌آیَم! واقِعاً به تَعطیلات اِحتیاج نَدارَم.", "آره، من هم می‌آیَم! واقِعاً به تَعطیلات اِحتیاج داشتَم.", "آره، تو هم می‌آیی! واقِعاً به تَعطیلات اِحتیاج داری."],
          um: "آره، من پایه‌اَم! واقِعاً به تَعطیلات اِحتیاج دارَم." },
        { id: "koffer", art: "ja", de: "Endlich fragt jemand! Ich habe sogar schon meinen Koffer gepackt.",
          fa: ["بالاخَره یکی پُرسید! من حَتّی چَمِدانَم را بَسته‌اَم.", "بالاخَره یکی پُرسید! من حَتّی چَمِدانَم را نَبَسته‌اَم.", "بالاخَره یکی پُرسید! تو حَتّی چَمِدانَت را بَسته‌ای.", "بالاخَره یکی پُرسید! من حَتّی چَمِدانَم را می‌بَندَم."],
          um: "بالاخَره یکی پُرسید! من حَتّی چَمِدونَمو بَستَم." },
        { id: "geld", art: "vielleicht", de: "Vielleicht. Aber ich habe nicht viel Geld.",
          fa: ["شاید. اَمّا پولِ زیادی نَدارَم.", "شاید. اَمّا پولِ زیادی دارَم.", "شاید. اَمّا وَقتِ زیادی نَدارَم.", "حَتماً. اَمّا پولِ زیادی نَدارَم."],
          um: "شاید. وَلی پولِ زیادی نَدارَم." },
        { id: "arbeit", art: "vielleicht", de: "Ich muss leider viel arbeiten … aber eine Woche habe ich Zeit!",
          fa: ["مُتَأَسِّفانه بایَد زیاد کار کُنَم… اَمّا یک هَفته وَقت دارَم!", "مُتَأَسِّفانه بایَد زیاد کار کُنَم… اَمّا دو هَفته وَقت دارَم!", "مُتَأَسِّفانه بایَد زیاد کار کُنَم… اَمّا یک هَفته وَقت نَدارَم!", "مُتَأَسِّفانه بایَد زیاد کار کَردَم… اَمّا یک هَفته وَقت دارَم!"],
          um: "مُتَأَسِّفانه بایَد زیاد کار کُنَم… وَلی یه هَفته وَقت دارَم!" }
      ],
      weiter: "r2" },
    r2: { typ: "rede", ort: "chat",
      de: "Super! Aber wohin fahren wir? Ans Meer, in die Berge oder in eine Stadt?",
      fa: ["عالی! اَمّا کُجا بِرَویم؟ کِنارِ دَریا، به کوه یا به یک شَهر؟", "عالی! اَمّا کِی بِرَویم؟ کِنارِ دَریا، به کوه یا به یک شَهر؟", "عالی! اَمّا کُجا رَفتیم؟ کِنارِ دَریا، به کوه یا به یک شَهر؟", "عالی! اَمّا کُجا بِرَویم؟ کِنارِ دَریا، به جَنگَل یا به یک شَهر؟"],
      um: "عالیه! وَلی کُجا بِریم؟ دَریا، کوه یا یه شَهر؟",
      antworten: "alle",
      optionen: [
        { id: "meer", art: "meer", label: { de: "Meer", fa: "دَریا" }, de: "Ans Meer! Ich möchte in Sizilien in der Sonne liegen.",
          fa: ["کِنارِ دَریا! می‌خواهَم در سیسیل زیرِ آفتاب دِراز بِکِشَم.", "کِنارِ دَریا! می‌خواهَم در سیسیل زیرِ باران دِراز بِکِشَم.", "کِنارِ دَریا! می‌خواهی در سیسیل زیرِ آفتاب دِراز بِکِشی.", "کِنارِ دَریا! خواستَم در سیسیل زیرِ آفتاب دِراز بِکِشَم."],
          um: "دَریا! می‌خوام تو سیسیل زیرِ آفتاب دِراز بِکِشَم." },
        { id: "berge", art: "berge", label: { de: "Berge", fa: "کوه" }, de: "In die Berge! In den Alpen können wir wandern.",
          fa: ["به کوه! در آلپ می‌تَوانیم کوه‌پِیمایی کُنیم.", "به کوه! در آلپ نِمی‌تَوانیم کوه‌پِیمایی کُنیم.", "به کوه! در آلپ می‌تَوانیم کوه‌پِیمایی کَردیم.", "به دَریا! در آلپ می‌تَوانیم کوه‌پِیمایی کُنیم."],
          um: "کوه! تو آلپ می‌تونیم کوه‌پِیمایی کُنیم." },
        { id: "stadt", art: "stadt", label: { de: "Stadt", fa: "شَهر" }, de: "In eine Stadt! Barcelona hat tolle Museen und gutes Essen.",
          fa: ["به یک شَهر! بارسِلونا موزه‌های عالی و غَذای خوب دارَد.", "به یک شَهر! بارسِلونا موزه‌های عالی و غَذای بَد دارَد.", "به یک شَهر! بارسِلونا موزه‌های عالی و غَذای خوب داشت.", "به یک روستا! بارسِلونا موزه‌های عالی و غَذای خوب دارَد."],
          um: "یه شَهر! بارسِلونا موزه‌های عالی و غَذای خوب داره." },
        { id: "iran", art: "iran", label: { de: "Iran", fa: "ایران" }, de: "Warum nicht Iran? Schiras ist wunderschön!",
          fa: ["چِرا ایران نه؟ شیراز خیلی زیباست!", "چِرا ایران؟ شیراز خیلی زیباست!", "چِرا ایران نه؟ شیراز خیلی زِشت اَست!", "چِرا ایران نه؟ شیراز خیلی زیبا بود!"],
          um: "چِرا ایران نه؟ شیراز خیلی قَشَنگه!" }
      ],
      weiter: { meer: "e2_m", berge: "e2_b", stadt: "e2_s", iran: "e2_i" } },

    /* Erste Nacht – niemand hat gebucht */
    r6: { typ: "rede",
      de: "Oh nein! Wir müssen schnell etwas finden. Hotel, Zelt oder Ferienwohnung?",
      fa: ["وای نه! بایَد زود یک جا پِیدا کُنیم. هُتِل، چادُر یا آپارتِمان؟", "وای نه! بایَد زود یک جا پِیدا کَردیم. هُتِل، چادُر یا آپارتِمان؟", "وای نه! نَبایَد زود یک جا پِیدا کُنیم. هُتِل، چادُر یا آپارتِمان؟", "وای نه! بایَد فَردا یک جا پِیدا کُنیم. هُتِل، چادُر یا آپارتِمان؟"],
      um: "وای نه! بایَد زود یه جا پِیدا کُنیم. هُتِل، چادُر یا آپارتِمان؟",
      antworten: "alle",
      optionen: [
        { id: "hotel", art: "hotel", label: { de: "Hotel", fa: "هُتِل" }, de: "Ein Hotel! Heute Nacht will ich ein richtiges Bett und eine Dusche.",
          fa: ["هُتِل! اِمشَب یک تَختِ دُرُست‌وحِسابی و یک دوش می‌خواهَم.", "هُتِل! اِمشَب یک تَختِ کوچَک و یک دوش می‌خواهَم.", "هُتِل! اِمشَب یک تَختِ دُرُست‌وحِسابی و یک دوش نِمی‌خواهَم.", "هُتِل! اِمشَب یک تَختِ دُرُست‌وحِسابی و یک دوش خواستَم."],
          um: "هُتِل! اِمشَب یه تَختِ دُرُست‌وحِسابی و یه دوش می‌خوام." },
        { id: "zelt", art: "zelt", label: { de: "Zelt", fa: "چادُر" }, de: "Ein Zelt! Das ist billig, und wir schlafen unter den Sternen.",
          fa: ["چادُر! اَرزان اَست و زیرِ سِتاره‌ها می‌خوابیم.", "چادُر! گِران اَست و زیرِ سِتاره‌ها می‌خوابیم.", "چادُر! اَرزان اَست و زیرِ سِتاره‌ها خوابیدیم.", "چادُر! اَرزان اَست و زیرِ دِرَخت‌ها می‌خوابیم."],
          um: "چادُر! اَرزونه و زیرِ سِتاره‌ها می‌خوابیم." },
        { id: "wohnung", art: "wohnung", label: { de: "Ferienwohnung", fa: "آپارتِمان" }, de: "Eine Ferienwohnung. So können wir zusammen kochen.",
          fa: ["یک آپارتِمان. این‌طُوری می‌تَوانیم با هم آشپَزی کُنیم.", "یک آپارتِمان. این‌طُوری نِمی‌تَوانیم با هم آشپَزی کُنیم.", "یک آپارتِمان. این‌طُوری می‌تَوانیم با هم آشپَزی کَردیم.", "یک آپارتِمان. این‌طُوری می‌تَوانیم با هم وَرزِش کُنیم."],
          um: "یه آپارتِمان. این‌جوری می‌تونیم با هم آشپَزی کُنیم." }
      ],
      weiter: { hotel: "e7hotel", zelt: "e7zelt", wohnung: "e7wohn" } },
    e7hotel: { typ: "szene", ort: "hotel", zeit: NACHT,
      de: "Das letzte freie Zimmer ist eine Suite – sehr teuer. Aber die Betten sind riesig, und morgens gibt es ein Frühstücksbuffet mit vierzig Sachen." + HEIM.de,
      fa: "آخَرین اُتاقِ خالی یک سوئیت اَست – خیلی گِران. اَمّا تَخت‌ها خیلی بُزُرگ‌اَند و صُبح یک بوفه‌ی صُبحانه با چِهِل جور غَذا هَست." + HEIM.fa,
      zusatz: [GELD_HOTEL, ARBEIT], weiter: "r7" },
    e7zelt: { typ: "szene", ort: "zelt", zeit: NACHT,
      de: "Das Zelt ist klein, der Boden ist hart, und um drei Uhr nachts schnarcht jemand laut. Aber den Himmel voller Sterne vergisst niemand." + HEIM.de,
      fa: "چادُر کوچَک اَست، زَمین سِفت اَست و ساعَتِ سهِ صُبح یکی بُلَند خُرخُر می‌کُنَد. اَمّا آسِمانِ پُرسِتاره را هیچ‌کَس فَراموش نِمی‌کُنَد." + HEIM.fa,
      zusatz: [GELD_ZELT, ARBEIT], weiter: "r7" },
    e7wohn: { typ: "szene", ort: "kochen", zeit: NACHT,
      de: "Die Ferienwohnung hat eine kleine Küche und einen Balkon. Abends kochen alle zusammen: Reis mit Tomaten – mehr hatte der Supermarkt nicht." + HEIM.de,
      fa: "آپارتِمان یک آشپَزخانه‌ی کوچَک و یک بالکُن دارَد. شَب هَمه با هم آشپَزی می‌کُنَند: بِرِنج با گوجه – سوپِرمارکِت چیزِ دیگَری نَداشت." + HEIM.fa,
      zusatz: [ARBEIT], weiter: "r7" },

    /* Fotos & Erinnerung */
    r7: { typ: "rede", ort: "chat",
      de: "Das war die beste Reise meines Lebens! Welches Foto ist euer Lieblingsfoto?",
      fa: ["این بِهتَرین سَفَرِ زِندِگی‌اَم بود! عَکسِ مُورِدِ عَلاقه‌ی شُما کُدام اَست؟", "این بَدتَرین سَفَرِ زِندِگی‌اَم بود! عَکسِ مُورِدِ عَلاقه‌ی شُما کُدام اَست؟", "این بِهتَرین سَفَرِ زِندِگی‌اَت بود! عَکسِ مُورِدِ عَلاقه‌ی شُما کُدام اَست؟", "این بِهتَرین سَفَرِ زِندِگی‌اَم بود! فیلمِ مُورِدِ عَلاقه‌ی شُما کُدام اَست؟"],
      um: "این بِهتَرین سَفَرِ عُمرَم بود! عَکسِ مُورِدِ عَلاقه‌تون کُدومه؟",
      antworten: "alle",
      optionen: [
        { id: "gruppe", art: "gruppe", label: { de: "Gruppenfoto", fa: "عَکسِ گُروهی" }, de: "Das Gruppenfoto! Da lachen alle.",
          fa: ["عَکسِ گُروهی! در آن هَمه می‌خَندَند.", "عَکسِ گُروهی! در آن هَمه گِریه می‌کُنَند.", "عَکسِ گُروهی! در آن هَمه خَندیدَند.", "عَکسِ تَکی! در آن هَمه می‌خَندَند."],
          um: "عَکسِ دَسته‌جَمعی! توش هَمه دارَن می‌خَندَن." },
        { id: "panne", art: "panne", label: { de: "die Panne", fa: "دَردِسَرِ راه" }, de: "Das Foto von der Panne unterwegs. Heute finde ich es lustig!",
          fa: ["عَکسِ دَردِسَرِ بِینِ راه. اِمروز به نَظَرَم خَنده‌دار اَست!", "عَکسِ دَردِسَرِ بِینِ راه. اِمروز به نَظَرَم ناراحَت‌کُنَنده اَست!", "عَکسِ دَردِسَرِ بِینِ راه. اِمروز به نَظَرَت خَنده‌دار اَست!", "عَکسِ دَردِسَرِ بِینِ راه. دیروز به نَظَرَم خَنده‌دار بود!"],
          um: "عَکسِ دَردِسَرِ تو راه. اَلان به نَظَرَم خَنده‌داره!" },
        { id: "essen", art: "essen", label: { de: "Essen", fa: "غَذا" }, de: "Das Foto vom Essen. Ich habe schon wieder Hunger!",
          fa: ["عَکسِ غَذا. باز هم گُرُسنه‌اَم!", "عَکسِ غَذا. باز هم تِشنه‌اَم!", "عَکسِ غَذا. باز هم سیرَم!", "عَکسِ غَذا. باز هم گُرُسنه بودَم!"],
          um: "عَکسِ غَذا. باز گُشنَمه!" }
      ],
      weiter: "ende" },
    ende: { typ: "ende", ort: "chat",
      de: "Alle Fotos kommen in ein gemeinsames Album: „Unsere Reise ✈️“. Jemand schreibt darunter: „Nächstes Jahr wieder?“ – und alle antworten mit einem Flugzeug. Diese Geschichte habt ihr übrigens gerade selbst geschrieben.",
      fa: "هَمه‌ی عَکس‌ها در یک آلبومِ مُشتَرَک جَمع می‌شَوَند: «سَفَرِ ما ✈️». یکی زیرَش می‌نِویسَد: «سالِ بَعد دوباره؟» – و هَمه با یک هَواپِیما جَواب می‌دَهَند. راستی، این داستان را خودِتان هَمین حالا نِوِشتید." }
  };

  /* ---------- Knoten der vier Strecken erzeugen ---------- */
  Object.keys(STRECKEN).forEach(X => {
    const T = STRECKEN[X];
    K["e2_" + X] = { typ: "szene", ort: "chat", de: T.e2.de, fa: T.e2.fa, zusatz: [GEPACKT], weiter: "rp_" + X };
    K["rp_" + X] = Object.assign({ typ: "rede", ort: "chat" }, PACKEN, { weiter: "r3_" + X });
    const arten = T.transport.map(o => o.art), weiter = {};
    arten.forEach(a => { weiter[a] = "e3_" + a + "_" + X; });
    K["r3_" + X] = { typ: "rede", ort: "chat", de: T.r3.de, fa: T.r3.fa, um: T.r3.um, antworten: "alle", optionen: T.transport, weiter };
    arten.forEach(a => {
      const R = REISE[a], w = {};
      K["e3_" + a + "_" + X] = { typ: "szene", ort: R.ort, zeit: ABREISE, de: R.de, fa: R.fa,
        zusatz: R.pack.map(p => ({ wenn: "rp_" + X + ":" + p[0], de1: p[1], deN: p[2], fa1: p[3], faN: p[4] })),
        weiter: "r4_" + a + "_" + X };
      R.rede.optionen.forEach(o => {
        w[o.art] = "e4_" + a + "_" + o.art + "_" + X;
        K[w[o.art]] = { typ: "szene", ort: R.ort, de: R.loesung[o.art].de, fa: R.loesung[o.art].fa, weiter: "e5_" + X };
      });
      K["r4_" + a + "_" + X] = Object.assign({ typ: "rede", ort: R.ort }, R.rede, { weiter: w });
    });
    K["e5_" + X] = { typ: "szene", ort: T.ort, zeit: ANKUNFT, de: T.e5.de, fa: T.e5.fa, weiter: "r5_" + X };
    K["r5_" + X] = Object.assign({ typ: "rede", ort: T.ort, antworten: 2 }, T.r5, { weiter: "e6_" + X });
    K["e6_" + X] = { typ: "szene", ort: T.ort, zeit: ABEND, de: T.e6.de + KEIN_BETT.de, fa: T.e6.fa + KEIN_BETT.fa, weiter: "r6" };
  });

  (window.GESPRAECHE = window.GESPRAECHE || {})["urlaub"] = {
    id: "urlaub",
    titel: "Wo machen wir Urlaub?",
    titelFa: "کُجا به سَفَر بِرَویم؟",
    icon: "✈️",
    beschreibung: {
      de: "Die Semesterferien stehen vor der Tür. In eurer WhatsApp-Gruppe plant ihr eine gemeinsame Reise: Meer, Berge, Großstadt – oder Iran? Zug, Auto oder Flugzeug? Unterwegs geht natürlich etwas schief … Eure Antworten entscheiden, wie die Reise verläuft.",
      fa: "تَعطیلاتِ دانِشگاه نَزدیک اَست. در گُروهِ واتس‌اَپ با هم یک سَفَر بَرنامه‌ریزی می‌کُنید: دَریا، کوه، یک شَهرِ بُزُرگ – یا ایران؟ قَطار، ماشین یا هَواپِیما؟ اَلبَتّه در راه مُشکِلی پیش می‌آیَد… جَواب‌های شُما تَعیین می‌کُنَند که سَفَر چِطُور پیش می‌رَوَد."
    },
    niveau: "Wiederholung Grundkurs (Präsens, Vergangenheit, Perfekt, Konjunktiv, Imperativ, Komparativ)",
    gruppe: { de: "Reisefieber ✈️", fa: "تَبِ سَفَر ✈️" },
    start: "e1",
    knoten: K
  };
})();
