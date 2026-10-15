/* Liste aller Gesprächs-Szenarien (Datei: assets/gespraeche/{id}.js).
   Dauer: Schätzung bei 4 Personen und „höchstens 3 Antworten pro Frage“.
   Neues Szenario: Datei anlegen, mit farsi-werkzeuge/gespraech_pruefen.js prüfen, hier eintragen. */
window.GESPRAECHE_LISTE = [
  { id: "essen-heute", icon: "🍲", titel: "Was essen wir heute?", titelFa: "اِمروز چه بُخوریم؟", dauer: "ca. 30 Min.", minuten: 30,
    kurz: "Freitagabend, alle sind hungrig: selbst persisch kochen, ins Restaurant oder Pizza bestellen? Und wer bezahlt – mit Taarof-Duell.",
    niveau: "Konversation 2 · Essen gehen & einladen", spieler: "2–8 Personen" },
  { id: "wg", icon: "🏠", titel: "Unsere WG", titelFa: "خانه‌ی مُشتَرَکِ ما", dauer: "ca. 35 Min.", minuten: 35,
    kurz: "WG-Besprechung am Sonntag: Putzplan, leerer Kühlschrank, die Nachbarin, die kaputte Heizung und ein Sofa, das zusammenbricht.",
    niveau: "Konversation 3 · Wohnung, WG & Nachbarn", spieler: "2–8 Personen" },
  { id: "arbeit", icon: "💼", titel: "Wie hast du Arbeit gefunden?", titelFa: "چِطور کار پِیدا کَردی؟", dauer: "ca. 45 Min.", minuten: 45,
    kurz: "Wiedersehen im Café: neue Jobs, Vorstellungsgespräche, Lebenslauf-Werkstatt oder Homeoffice-Streit – und einen Monat später die Ergebnisse.",
    niveau: "Konversation 10 · Arbeit & Vorstellungsgespräch", spieler: "2–8 Personen" },
  { id: "urlaub", icon: "✈️", titel: "Wo machen wir Urlaub?", titelFa: "کُجا به سَفَر بِرَویم؟", dauer: "ca. 45 Min.", minuten: 45,
    kurz: "Semesterferien: Meer, Berge, Barcelona oder Schiras? Zug, Auto oder Flugzeug – unterwegs geht etwas schief, und gebucht hat auch niemand.",
    niveau: "Konversation 7 · Eine Reise planen", spieler: "2–8 Personen" },
  { id: "tag-planen", icon: "📅", titel: "Wir planen einen Tag", titelFa: "یک روز با هَم", dauer: "ca. 60 Min.", minuten: 60,
    kurz: "Sonntagabend in der WhatsApp-Gruppe: Hausaufgaben, Lerngruppe, Treffpunkt, Mittagessen – und danach Kino oder ans Meer?",
    niveau: "Wiederholung Grundkurs · ab Fortgeschritten 1", spieler: "2–8 Personen" },
  { id: "mehmuni", icon: "🫖", titel: "Wir bekommen Besuch!", titelFa: "مِهمانی", dauer: "ca. 60 Min.", minuten: 60,
    kurz: "Iranische Nachbarn kommen zum Essen: planen, kochen, der Tahdig, Maman Pari steht zu früh vor der Tür – und Taarof bis zur letzten Minute.",
    niveau: "Konversation 15 · Gäste & Gastfreundschaft", spieler: "2–8 Personen" }
];
