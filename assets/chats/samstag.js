/* =========================================================
   Wortsalat-Chat · Szenario „Was machen wir am Samstag?“
   Jeder Knoten = eine Nachricht, die die Person am Zug aus einem
   Wortsalat baut. optionen = mögliche Nachrichten (alle richtig),
   jede führt zu einem anderen nächsten Knoten.
     fa   – richtige Nachricht (Wörter durch Leerzeichen getrennt)
     alt  – weitere richtige Wortstellungen (optional)
     de   – Bedeutung (Ideen-Karte, Stufe „leicht“)
     art  – frage | vorschlag | ja | nein | info (Symbol auf der Ideen-Karte)
     um   – so schreibt man es im echten Chat (wird nach dem Senden gezeigt)
   extra – Ablenkungswörter für den Wortsalat
   ========================================================= */
(window.CHATS = window.CHATS || {})["samstag"] = {
  id: "samstag",
  titel: "Was machen wir am Samstag?",
  titelFa: "شَنبه چه کار کُنیم؟",
  icon: "💬",
  gruppe: { name: "Uni-Freunde 📚", nameFa: "دوستانِ دانِشگاه 📚" },
  beschreibung: "Eure WhatsApp-Gruppe plant den Samstag: Kino, Park oder zusammen kochen? Wer dran ist, baut seine Nachricht aus einem Wortsalat – je nachdem, was geschrieben wird, geht der Chat anders weiter.",
  dauer: "ca. 20–30 Min.",
  niveau: "Grundkurs-Wiederholung · Präsens, Konjunktiv (بِرَویم)، Imperativ, Fragen",
  start: "n1",
  knoten: {
    n1: { info: { de: "Freitagabend, 20:15 Uhr", fa: "جُمعه شَب، ساعَتِ هَشت و رُبع" },
      aufgabe: "Du schreibst die erste Nachricht: Was macht ihr am Samstag?",
      optionen: [
        { id: "frage", art: "frage", fa: "سَلام بَچّه‌ها! شَنبه چه کار کُنیم؟", de: "Hallo Leute! Was machen wir am Samstag?", um: "سلام بچه‌ها! شنبه چیکار کنیم؟", weiter: "n2" },
        { id: "kino", art: "vorschlag", fa: "سَلام! شَنبه به سینَما بِرَویم؟", alt: ["سَلام! به سینَما شَنبه بِرَویم؟"], de: "Hallo! Gehen wir am Samstag ins Kino?", um: "سلام! شنبه بریم سینما؟", weiter: "nK1" },
        { id: "kochen", art: "vorschlag", fa: "سَلام! شَنبه با هَم آشپَزی کُنیم؟", alt: ["سَلام! با هَم شَنبه آشپَزی کُنیم؟"], de: "Hallo! Kochen wir am Samstag zusammen?", um: "سلام! شنبه با هم آشپزی کنیم؟", weiter: "nC1" }
      ],
      extra: ["دیروز", "رَفتیم", "کِتاب", "کُجا", "نِمی‌دانَم", "خانه", "فَردا", "می‌خورَم", "خوب", "پارک", "اَست", "مَن", "تو", "دانِشگاه"] },
    n2: { aufgabe: "Antworte mit einem Vorschlag für Samstag.",
      optionen: [
        { id: "kino", art: "vorschlag", fa: "بِرَویم سینَما! یک فیلمِ جَدید هَست.", alt: ["یک فیلمِ جَدید هَست. بِرَویم سینَما!"], de: "Lasst uns ins Kino gehen! Es gibt einen neuen Film.", um: "بریم سینما! یه فیلم جدید اومده.", weiter: "nK1" },
        { id: "park", art: "vorschlag", fa: "هَوا خوب اَست. به پارک بِرَویم؟", de: "Das Wetter ist gut. Gehen wir in den Park?", um: "هوا خوبه. بریم پارک؟", weiter: "nP1" },
        { id: "kochen", art: "vorschlag", fa: "بیایید با هَم غَذا دُرُست کُنیم!", de: "Lasst uns zusammen etwas kochen!", um: "بیاین با هم غذا درست کنیم!", weiter: "nC1" }
      ],
      extra: ["بود", "دیروز", "رَفتَم", "سَرد", "کِتابخانه", "نَه", "می‌خواهَم", "کار", "شَب", "مَن", "تو", "کُجا"] },

    /* ---------- Kino ---------- */
    nK1: { aufgabe: "Antworte auf den Kino-Vorschlag: zustimmen, nachfragen – oder etwas anderes vorschlagen.",
      optionen: [
        { id: "film", art: "frage", fa: "فِکرِ خوبی اَست! کُدام فیلم؟", de: "Gute Idee! Welcher Film?", um: "فکر خوبیه! کدوم فیلم؟", weiter: "nK2" },
        { id: "zeit", art: "ja", fa: "مَن هَم می‌آیَم. ساعَتِ چَند؟", de: "Ich komme auch. Um wie viel Uhr?", um: "منم میام. ساعت چند؟", weiter: "nZ" },
        { id: "teuer", art: "nein", fa: "سینَما گِران اَست. به پارک بِرَویم؟", de: "Kino ist teuer. Gehen wir in den Park?", um: "سینما گرونه. بریم پارک؟", weiter: "nP1" }
      ],
      extra: ["اَرزان", "دیروز", "کِتاب", "نَه", "دیدَم", "خانه", "شَب", "رَفتیم", "کُجا", "سَرد", "چِرا"] },
    nK2: { aufgabe: "Sag, welchen Film ihr sehen sollt.",
      optionen: [
        { id: "komoedie", art: "vorschlag", fa: "یک فیلمِ کُمِدی! مَن می‌خواهَم بِخَندَم.", de: "Eine Komödie! Ich will lachen.", um: "یه فیلم کمدی! می‌خوام بخندم.", weiter: "nZ" },
        { id: "iranisch", art: "vorschlag", fa: "یک فیلمِ ایرانی بِبینیم. آن خِیلی قَشَنگ اَست.", de: "Lasst uns einen iranischen Film sehen. Der ist sehr schön.", um: "یه فیلم ایرانی ببینیم. خیلی قشنگه.", weiter: "nZ" }
      ],
      extra: ["گِریه", "کُنَم", "دیروز", "زِشت", "خَستِه", "کِتاب", "دیدیم", "شُما", "نیست", "آلمانی", "بَد"] },

    /* ---------- Kochen ---------- */
    nC1: { aufgabe: "Antworte auf den Koch-Vorschlag.",
      optionen: [
        { id: "was", art: "frage", fa: "عالی! چه غَذایی بِپَزیم؟", de: "Super! Was für ein Essen kochen wir?", um: "عالیه! چی بپزیم؟", weiter: "nC2" },
        { id: "obst", art: "ja", fa: "باشه! مَن میوه و نان می‌خَرَم.", alt: ["باشه! مَن نان و میوه می‌خَرَم."], de: "Okay! Ich kaufe Obst und Brot.", um: "باشه! من میوه و نون می‌خرم.", weiter: "nZ" },
        { id: "keinkoch", art: "nein", fa: "مَن آشپَزی بَلَد نیستَم! به پارک بِرَویم؟", de: "Ich kann nicht kochen! Gehen wir in den Park?", um: "من آشپزی بلد نیستم! بریم پارک؟", weiter: "nP1" }
      ],
      extra: ["خوردیم", "دیروز", "سینَما", "گوشت", "نَه", "کُجا", "تو", "پُختَم", "خانه", "فَردا", "چای"] },
    nC2: { aufgabe: "Schlag ein Gericht vor.",
      optionen: [
        { id: "kuku", art: "vorschlag", fa: "کوکو سَبزی بِپَزیم. خِیلی آسان اَست.", de: "Lasst uns Kuku Sabzi kochen. Das ist sehr einfach.", um: "کوکو سبزی بپزیم. خیلی راحته.", weiter: "nZ" },
        { id: "pizza", art: "vorschlag", fa: "پیتزا دُرُست کُنیم! هَمه پیتزا دوست دارَند.", de: "Lasst uns Pizza machen! Alle mögen Pizza.", um: "پیتزا درست کنیم! همه پیتزا دوست دارن.", weiter: "nZ" }
      ],
      extra: ["سَخت", "نَدارَند", "خوردَم", "دیروز", "سوپ", "نیست", "می‌خَرَم", "کَم", "شُما", "گِران"] },

    /* ---------- Park ---------- */
    nP1: { aufgabe: "Antworte auf den Park-Vorschlag.",
      optionen: [
        { id: "picknick", art: "ja", fa: "باشه! مَن نان و پَنیر می‌آوَرَم.", alt: ["باشه! مَن پَنیر و نان می‌آوَرَم."], de: "Okay! Ich bringe Brot und Käse mit.", um: "باشه! من نون و پنیر میارم.", weiter: "nZ" },
        { id: "kalt", art: "frage", fa: "هَوا سَرد نیست؟", de: "Ist es nicht kalt?", um: "هوا سرد نیست؟", weiter: "nP2" },
        { id: "fussball", art: "vorschlag", fa: "عالی! آن‌جا فوتبال بازی کُنیم.", alt: ["عالی! فوتبال آن‌جا بازی کُنیم."], de: "Super! Lasst uns dort Fußball spielen.", um: "عالیه! اونجا فوتبال بازی کنیم.", weiter: "nZ" }
      ],
      extra: ["گَرم", "دیروز", "بود", "سینَما", "کُجا", "می‌خورَم", "نَه", "کِتاب", "شَب", "رَفتیم", "تو"] },
    nP2: { aufgabe: "Antworte auf die Frage nach dem Wetter.",
      optionen: [
        { id: "warm", art: "info", fa: "نه، هَوا گَرم اَست. نَتَرس!", de: "Nein, es ist warm. Keine Angst!", um: "نه، هوا گرمه. نترس!", weiter: "nZ" },
        { id: "jacke", art: "info", fa: "کَمی سَرد اَست. کاپشَن بیاوَر!", de: "Es ist ein bisschen kalt. Bring eine Jacke mit!", um: "یه کم سرده. کاپشن بیار!", weiter: "nZ" }
      ],
      extra: ["بُرو", "خِیلی", "بود", "دیروز", "باران", "کُلاه", "می‌آوَرَم", "سینَما", "بِخور"] },

    /* ---------- Zeit, Ort, Mitbringen ---------- */
    nZ: { aufgabe: "Jetzt fehlt noch eine Uhrzeit oder ein Treffpunkt.",
      optionen: [
        { id: "drei", art: "vorschlag", fa: "ساعَتِ سه هَمدیگَر را بِبینیم؟", de: "Sehen wir uns um drei Uhr?", um: "ساعت سه همو ببینیم؟", weiter: "nM" },
        { id: "metro", art: "info", fa: "مَن ساعَتِ پَنج جِلویِ مِترو هَستَم.", de: "Ich bin um fünf Uhr vor der U-Bahn.", um: "من ساعت پنج جلوی مترو‌ام.", weiter: "nM" },
        { id: "wo", art: "frage", fa: "کُجا هَمدیگَر را بِبینیم؟", de: "Wo treffen wir uns?", um: "کجا همو ببینیم؟", weiter: "nO" }
      ],
      extra: ["دیدیم", "دیروز", "شَب", "کِی", "پُشتِ", "خانه", "بود", "چِرا", "تو", "دو"] },
    nO: { aufgabe: "Schlag einen Treffpunkt vor.",
      optionen: [
        { id: "bib", art: "vorschlag", fa: "جِلویِ کِتابخانه‌یِ دانِشگاه.", de: "Vor der Unibibliothek.", um: "جلوی کتابخونه‌ی دانشگاه.", weiter: "nM" },
        { id: "cafe", art: "vorschlag", fa: "دَر کافه‌یِ کِنارِ مِترو.", de: "Im Café neben der U-Bahn.", um: "تو کافه‌ی بغل مترو.", weiter: "nM" }
      ],
      extra: ["پُشتِ", "خانه‌یِ", "رویِ", "پارک", "مَن", "زیرِ", "بود", "سینَما"] },
    nM: { aufgabe: "Was bringst du mit – oder wie kommst du hin?",
      optionen: [
        { id: "getraenke", art: "info", fa: "مَن نوشابه می‌آوَرَم.", de: "Ich bringe Getränke mit.", um: "من نوشابه میارم.", weiter: "nE" },
        { id: "auto", art: "info", fa: "مَن ماشین دارَم. شُما را می‌بَرَم.", de: "Ich habe ein Auto. Ich nehme euch mit.", um: "من ماشین دارم. می‌برمتون.", weiter: "nE" },
        { id: "spaet", art: "info", fa: "مَن کَمی دیر می‌رِسَم. مُنتَظِرِ مَن نَباشید!", de: "Ich komme etwas später. Wartet nicht auf mich!", um: "من یه کم دیر می‌رسم. منتظرم نباشین!", weiter: "nE" }
      ],
      extra: ["آوَردَم", "دوچَرخه", "زود", "دیروز", "باشید", "نِمی‌آیَم", "تو", "خَریدَم"] },
    nE: { aufgabe: "Schreib die letzte Nachricht: zusagen – oder leider absagen.",
      optionen: [
        { id: "bis", art: "ja", fa: "عالی! تا شَنبه! 👋", de: "Super! Bis Samstag! 👋", um: "عالیه! تا شنبه! 👋", weiter: "ende" },
        { id: "komme", art: "ja", fa: "باشه، مَن هَم می‌آیَم. خوش می‌گُذَرَد!", de: "Okay, ich komme auch. Das wird schön!", um: "باشه، منم میام. خوش می‌گذره!", weiter: "ende" },
        { id: "absage", art: "nein", fa: "بِبَخشید، مَن نِمی‌تَوانَم بیایَم. خوش بُگذَرَد!", de: "Sorry, ich kann nicht kommen. Viel Spaß!", um: "ببخشید، من نمی‌تونم بیام. خوش بگذره!", weiter: "ende" }
      ],
      extra: ["دیروز", "رَفتَم", "نَه", "شَب", "تو", "آمَدَم", "بود"] },
    ende: { ende: true, info: { de: "Der Samstag ist geplant! 🎉 Euer ganzer Chat steht unten – zum Nachlesen und Ausdrucken.", fa: "شَنبه بَرنامه‌ریزی شُد! 🎉" } }
  }
};
