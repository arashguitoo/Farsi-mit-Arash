# Farsi-Lernpfad · Lern Farsi mit Arash

Lernplattform für Persisch (für deutschsprachige Studierende) – läuft auf **GitHub Pages**, speichert den Fortschritt im eigenen Firebase-Projekt `lern-farsi-arash` (Bereich `farsi`).

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Lernpfad für Studierende: Code-Login, Lektionsübersicht mit Fortschritt |
| `lektion.html` | spielt eine Lektion ab (`lektion.html?id=01`) |
| `konsole.html` | deine Konsole: Klassen, Codes, Freigaben, Fortschritt |
| `assets/` | Design, Firebase-Verbindung, Übungs-Engine |
| `lektionen/index.json` | Liste aller Lektionen (Reihenfolge, Titel, Status) |
| `lektionen/01-alphabet.json` | Lektion 1: das Alphabet |
| `firebase-regeln.json` | Sicherheitsregeln für den Bereich `farsi` |

## Einrichten (einmalig)

1. **Ordner hochladen**: den ganzen Ordner `farsi` in dein GitHub-Pages-Repo legen (z. B. `arashguitoo.github.io/farsi/`). Der Link für Studierende ist dann `…/farsi/index.html`.
2. **Firebase-Regeln**: Firebase-Konsole → Realtime Database → Regeln. Inhalt von `firebase-regeln.json` komplett einfügen → Veröffentlichen.
3. **Konsole öffnen** (`…/farsi/konsole.html`), mit deinem Konto aus Firebase → Authentication anmelden, Klassen anlegen (z. B. „Klasse A“, „Klasse B“), Namen eintragen → Codes entstehen automatisch.
4. Codes verteilen: 🖨 Zettel drucken oder 📋 Anleitung pro Person kopieren.

**Nur mit Code:** Lernpfad, Lektionen und Wortschatz-Trainer öffnen sich nur mit einem gültigen persönlichen Code (kein Gast-Modus). Wird ein Code in der Konsole gelöscht oder deaktiviert, wird die Person beim nächsten Öffnen abgemeldet. Lehrkräfte, die in Konsole oder Lehrer-Übersicht angemeldet sind, können Lektionen auf diesem Gerät 30 Tage lang auch ohne Schülercode öffnen. Hinweis: Das ist eine Zugangssperre der Oberfläche – die Lektionsdateien liegen weiterhin öffentlich im GitHub-Repository.

> Die Seiten laufen über GitHub Pages bzw. einen Webserver, **nicht** per Doppelklick auf die Datei (die Lektionen werden als JSON nachgeladen).

## Bereiche: Anfänger · Fortgeschritten 1 · Fortgeschritten 2 · Konversation

Die Startseite zeigt vier Knöpfe. Jede Lektion gehört zu einem Bereich (Feld `"bereich"` in `lektionen/index.json`: `a`, `f1`, `f2`, `k`). Die Bereiche selbst stehen oben in `index.json` unter `"bereiche"`.

In der Konsole unter **🔓 Freigaben** schaltest du pro Klasse
- den **ganzen Bereich** (fette Zeile) – gesperrt heißt: alle Lektionen darin sind zu,
- und darunter **jede Lektion einzeln** frei.

### Aufteilung

- **Anfänger (Persisch I / Grundkurs):** alle Lektionen 1–26 – vom Alphabet über Passiv und Relativsätze bis zu den Bedingungssätzen.
- **Fortgeschritten 1:** beginnt mit dem Einstufungstest, danach 15 Lektionen (`f101`–`f115`) zum Lernen zu Hause. Jede Lektion hat einen **Alltagstext** und einen **Sachtext** (z. B. Frühstück heute ↔ Essgewohnheiten früher), einen Dialog, zwei Grammatikteile, „Wer passt zu wem?“ und Umgangssprache. Die Texte werden von ca. 150 auf ca. 350 Wörter länger.
  Themen: 1 Frühstück · 2 Wohnen · 3 Zeit · 4 Familie · 5 Arbeit & Geld · 6 Gesundheit · 7 Medien & Finglisch · 8 Kalender & Nouruz · 9 Yazd & Qanate · 10 Umwelt · 11 Literatur · 12 Teppich & Handwerk · 13 Geschichte · 14 Zwischen zwei Ländern · 15 KI & Übersetzen.
  Gebaut mit `f1_bauen.py` aus `f1_daten1.py`–`f1_daten5.py`; `index_bauen.py` erkennt `f1NN-*.json` automatisch (Bereich f1, Voraussetzung f1test).
- **Fortgeschritten 2:** 15 Lektionen (`f201`–`f215`), **ohne Umschrift** (der „abc“-Knopf ist ausgeblendet, die Aussprache-Spiele im Wortschatz-Trainer überspringen F2-Wörter). Pro Lektion ca. 2.200 Wörter Lesestoff:
  ausführlicher **Sachtext** (ca. 800–900 Wörter, mit Wortschatz im Kontext und Zusammenfassung), **Alltagstext** (ca. 450–550 Wörter), **drei Dialoge** (je 13–16 Zeilen, feste Figuren: Jonas, Leyla, Dr. Sadeghi, Bardia, Herr Rahimi), **„Gut zu wissen“** (drei Infotexte), vier Wortfelder (ca. 53 Wörter), Synonyme & Gegensätze, zwei Grammatikteile, Redemittel mit Schreibaufgabe und „Wer passt zu wem?“.
  Themen: 1 Persisch in drei Ländern · 2 Teheran · 3 Persischer Garten · 4 Kino · 5 Musik · 6 Mirzakhani & Frauen in der Wissenschaft · 7 Safran & Pistazien · 8 Taarof · 9 Asiatischer Gepard · 10 Wissenschaftsgeschichte · 11 Pressesprache · 12 Iraner in Deutschland · 13 Wüste Lut & Klima · 14 Kalligrafie · 15 Was ist ein gutes Leben?
  Gebaut mit `f2_bauen.py` aus `f2_daten1.py`–`f2_daten5.py` (Grundlage) und `f2_plus1.py`–`f2_plus5.py` (Erweiterungen); Baukasten `f2.py`.
- **Konversation:** 15 Sitzungen (K1–K15), je ca. 80 Karten: Lernpfad (Worum geht’s → 3–4 Wortfelder mit je ~12 Wörtern → Verben & Wiederholung → Redemittel → Situationen & Reaktionen → Modelldialog → Lesen → Gut zu wissen → Vorbereitung), Texte & Dialoge (2. Dialog, 2. Text) und Trainingspaket (Wort-Marathon, Redemittel, Lückensätze, Satzbau). Rund 60 Wörter pro Sitzung im Wortschatz-Trainer. Kein Hörverstehen. Erzeugt mit `farsi-werkzeuge/k_bauen.py` aus `k_daten1–3.py` + `k_plus1–3.py`.

### Einstufungstest vor Fortgeschritten 1

`f1-test.json` („Großer Test Persisch I“, 20 Abschnitte, über 200 Aufgaben – deckt den ganzen Grundkurs ab) steht am Anfang von Fortgeschritten 1. Die Lektionen von Fortgeschritten 1 haben in `index.json` `"voraussetzung": "f1test"` und öffnen sich erst, wenn **alle Abschnitte** gemacht sind und **insgesamt ≥ 70 %** (`"bestehen": 70`) erreicht sind. Der Stand hängt am persönlichen Code. Stellst du eine Lektion in der Konsole ausdrücklich auf „🔓 offen“, ist sie auch ohne Test offen.

## Zwei (oder mehr) Klassen

Jede Person hat einen eigenen Code und gehört zu einer Klasse. Unter **Freigaben** stellst du pro Klasse ein, welche Lektion offen ist – so kann Klasse A schon Lektion 2 haben, während Klasse B noch bei Lektion 1 ist. „Standard“ richtet sich nach `standard` in `lektionen/index.json`.

## Neue Lektion hinzufügen

1. Datei `lektionen/02-….json` anlegen (Aufbau wie Lektion 1).
2. In `lektionen/index.json` beim Eintrag `"datei": "02-….json"` ergänzen und `"standard": "offen"` oder `"bald"` setzen.
3. Hochladen – fertig. Die Konsole erkennt die Lektion automatisch.

## Lehrer-Übersicht (`lehrer.html`)

Passwortgeschützt (gleiches Konto wie die Konsole), erreichbar über **📖 Lehrer-Übersicht** in der Konsole. Zeigt alle Lektionen mit Zusatz- und Umgangssprache-Teil und Wortschatz – jede Karte lesbar mit **Lösungen**, Umschrift, Übersetzung, Ablenkern.

- Jede Karte hat eine Nummer, z. B. **L3·S8·K4** = Lektion 3, Station 8, Karte 4 (Z = Zusatz, U = Umgangssprache, WS = Wortschatz).
- **▶ ausprobieren** öffnet die Station direkt so, wie die Studierenden sie sehen.
- **✏️ Korrektur** speichert eine Notiz zur Karte. Über den Knopf unten rechts kannst du alle offenen Korrekturen **kopieren** und an Claude schicken – mit Nummer und Inhalt, damit sie gezielt eingearbeitet werden.
- Suche über alle Lektionen (Persisch, Umschrift, Deutsch) und Druckansicht.
- Damit die Korrekturen auf allen Geräten gespeichert werden, braucht Firebase die Regel `korrekturen` (in `firebase-regeln.json` enthalten). Ohne sie bleiben die Notizen im Browser.

## Wortschatz-Trainer (`wortschatz.html`)
- **🔍 Wörterbuch** oben auf der Seite: sucht in allen für die Person offenen Lektionen – Deutsch (Umlaute/Artikel egal, exakte Treffer zuerst), Persisch (auch ohne Vokalzeichen, ي/ك egal) und Umschrift. Treffer mit Lektion, Präsensstamm; antippen = vorlesen.
  Dazu das **allgemeine Wörterbuch** `assets/woerterbuch/grund.json` (~5.800 Einträge inkl. ~1.150 Nomen-Verb-Verbindungen, deutscher Grundwortschatz A1–B2 abgedeckt; immer verfügbar, auch ohne freigeschaltete Lektion; Format wie `ws-*.json`: fa, tr, de, kat, emoji, bei Verben stamm/stammTr). Einträge, die es mit gleicher Schrift und Bedeutung schon in einer Lektion gibt, werden nicht doppelt gezeigt. Ohne Suchbegriff: nach Thema durchblättern. Ergänzen/korrigieren: JSON-Datei bearbeiten, danach **`python3 werkzeuge/woerterbuch-bauen.py`** ausführen – das baut `assets/woerterbuch/suche.json` (alle Lektionswörter + Wörterbuch in einer kompakten Datei, ~110 KB gezippt) und trägt die Version in `assets/woerterbuch.js` ein. Das gilt auch nach neuen/geänderten `ws-*.json`. Die Suchleiste steht auf der Startseite (nach dem Anmelden) und im Wortschatz-Trainer.

Eigene Seite mit dem **gesamten Wortschatz** aller Lektionen, die für die Klasse freigeschaltet sind – er wächst also automatisch mit. Spiele: Paare (Bedeutung / Aussprache), Memory, Blitzlesen, Karteikarten, Abschreiben, Wortliste. Filter: „bis Lektion X“ oder „nur Lektion X“ und nach Kategorie.

Jede Lektion hat dafür eine Datei `lektionen/ws-0X.json`, eingetragen in `index.json` unter `"wortschatz"`:

```json
{ "lektion": "03", "woerter": [
  { "fa": "پِدَر", "tr": "pedar", "de": "Vater", "emoji": "👨", "kat": "Menschen & Familie" },
  { "fa": "داشتَن", "tr": "dāschtan", "de": "haben", "kat": "Verben", "stamm": "دار", "stammTr": "dār" } ] }
```

**Regel:** Verben stehen im Wortschatz **nie konjugiert**, sondern nur als Infinitiv mit Präsensstamm (`stamm`). Kategorien: Menschen & Familie, Berufe, Gefühle & Zustände, Körper, Natur & Wetter, Essen & Trinken, Dinge, Orte, Tiere, Zahlen, Zeit, Verben, Kleine Wörter, Wendungen.

## Aufbau jeder Lektion

1. **Lernpfad** – die Stationen in `lektionen/0X-….json`
2. **Texte & Dialoge** – Paket mit `"art": "texte"` (`0X-texte.json`): kurzer Lesetext mit Richtig/Falsch- und Multiple-Choice-Fragen, zwei Dialoge zum Ordnen, weitere Lesetexte
3. **Übungen** – Trainingspaket (`0X-zusatz-1.json`)
4. **Extra: Umgangssprache** – Paket mit `"art": "umgangssprache"` (eingeklappt)

In `index.json` stehen die Pakete unter `"zusatz"` in dieser Reihenfolge. Die Übersicht der Lektion zeigt die Teile als aufklappbare Listen; geöffnet ist immer der Teil mit der nächsten offenen Station.

## Zusatzaufgaben nachreichen (für jede Lektion)

Zusätzliche Übungen kommen als **eigene JSON-Datei** – die Lektion selbst bleibt unverändert:

1. Datei anlegen, z. B. `lektionen/01-zusatz-2.json`:
   ```json
   { "id": "z2", "titel": "Trainingspaket 2", "beschreibung": "…",
     "stationen": [ { "id": "a", "titel": "…", "vorschau": "…", "karten": [ … ] } ] }
   ```
2. In `lektionen/index.json` beim Eintrag der Lektion ergänzen:
   `"zusatz": ["01-zusatz-1.json", "01-zusatz-2.json"]`
3. Hochladen – die Pakete erscheinen in der Lektion unter „Zusatzübungen“, der Fortschritt wird gespeichert und in der Konsole mit „+Z“ angezeigt.

**Umgangssprache** kommt immer in ein eigenes Paket mit `"art": "umgangssprache"` (z. B. `02-umgangssprache.json`). Es erscheint dann rot abgesetzt als „Extra: Umgangssprache“ mit dem Hinweis, dass man so nicht schreibt. Die Lektionen selbst bleiben reine Schriftsprache.

Wichtig: Jedes Paket braucht eine **eigene `id`** (z1, z2, …), und die Stations-`id`s darin nie nachträglich ändern.

### Aufbau einer Lektion

```json
{ "id": "02", "titel": "…", "titelFa": "…", "einleitung": "…",
  "stationen": [ { "id": "s01", "titel": "…", "vorschau": "مَن تو او", "karten": [ … ] } ] }
```

Die `id` einer Station nie nachträglich ändern – daran hängt der gespeicherte Fortschritt.

### Kartentypen

| Typ | Wofür | Wichtigste Felder |
|---|---|---|
| `info` | Erklärung, „Merke“-Kasten (`"stil":"merke"`) | `titel`, `text` (HTML), `beispiele:[{fa,tr,de,emoji}]` |
| `buchstaben` | Buchstaben mit allen 4 Formen | `buchstaben:[{fa,name,nameFa,laut,verbindet,hinweis,beispiel}]`, Vokalzeichen mit `"typ":"vokal"` + `traeger` |
| `paare` | Paare zuordnen | `paare:[{fa,de,tr,emoji}]`, `links`: `"de"` / `"tr"` / `"emoji"` |
| `wahl` | Multiple Choice | `fragen:[{frage,fa,emoji,optionen,richtig,erkl,optFa,fest}]` |
| `bauen` | Wort aus Buchstaben-Kacheln bauen | `woerter:[{fa,tr,de,emoji,teile:[…],extra:[…]}]` |
| `sortieren` | Kategorien zuordnen | `kategorien:[…]`, `items:[{fa,k,e}]` (`k` = Index der richtigen Kategorie) |
| `finden` | alle passenden Wörter antippen | `frage`, `woerter:[{fa,ja}]` |
| `lesen` | Karteikarten (lesen → aufdecken) | `karten:[{fa,tr,de,emoji}]` |
| `memory` | Memory-Spiel (Karten aufdecken) | `paare:[{fa,tr,de,emoji}]`, `links`: `"tr"` / `"de"` / `"emoji"` |
| `tempo` | Blitzlesen auf Zeit | `woerter:[{fa,tr,de}]`, `modus`: `"tr"` oder `"de"`, `sekunden`, `ziel` |
| `bauen` + `"zeigen": true` | Abschreiben: Wort wird gezeigt, aus Buchstaben nachbauen | wie `bauen` |
| `bauen` + `"trenner": " "` | Satzbau: Wörter in die richtige Reihenfolge bringen | `woerter:[{fa,tr,de,teile:[Wörter],extra:[…]}]` |
| `text` | Lesetext, Zeile antippen → Umschrift + Übersetzung | `zeilen:[{fa,tr,de}]` |
| `ordnen` | Sätze in die richtige Reihenfolge bringen | `items:[{fa,tr,de}]` (in richtiger Reihenfolge angeben) |

Bei `paare` und `memory` kann mit `"links": "x"` auf beiden Seiten Persisch stehen (Feld `x`, z. B. Pronomen ↔ Verbform). Bei `tempo` kann jedes Wort mit `a` eine eigene Antwort haben (`"optFa": true` für persische Antworten).

`richtig` zählt ab 0. In `bauen` müssen die `teile` genau die Buchstaben des Wortes ohne Vokalzeichen sein.

## Aussprache / Audio

Überall, wo 🔊 erscheint, spielt die Seite eine **fertige Aufnahme** aus `assets/audio/` – das geht in jedem Browser, auch auf iPhone und Android. Die Aufnahmen sind mit den Microsoft-Stimmen Dilara und Farid erzeugt, in sechs Varianten (Tempo und Tonhöhe verändert: W1–W3, M1–M3), damit es nach verschiedenen Menschen klingt. Dialogzeilen wechseln zwischen zwei Stimmen; im Detektiv-Fall hat jede Person ihre eigene.
- Dateiname = FNV-Hash des normalisierten Textes (ohne Vokalzeichen, Satzzeichen, ZWNJ) – gebildet in `assets/core.js` (`audioPfad`) und in `werkzeuge/audio-texte.py` (`schluessel`) auf dieselbe Weise.
- **Neue oder geänderte Texte vertonen:** `pip install edge-tts`, dann `python3 werkzeuge/audio-erzeugen.py`. Vorhandene Dateien werden übersprungen, nicht mehr gebrauchte gelöscht. (Braucht Zugriff auf `speech.platform.bing.com`.)
- **Aussprache-Hilfe nur für die Sprachausgabe** (`fuer_tts` in `werkzeuge/audio-texte.py`, der angezeigte Text bleibt gleich): stummes End-ه bekommt ein Kasra (نَوه → نَوِه, هفته → هفتِه); in teilvokalisierten Texten werden fehlende Vokale aus dem Wörterbuch ergänzt (nur eindeutige Formen). `werkzeuge/audio-signaturen.json` merkt sich, was gesprochen wurde – ändert sich die Aussprache-Hilfe, werden nur die betroffenen Dateien neu erzeugt.
- Gibt es zu einem Text keine Aufnahme, nimmt die Seite die Gerätestimme (am zuverlässigsten in Edge). Eine eigene Aufnahme kann man weiterhin mit `"audio": "pfad.mp3"` beim Eintrag angeben.

## Schreibweise

Persisches `ی` und `ک` (nicht arabisch `ي`/`ك`), Schrift Vazirmatn, Lektion 1 voll vokalisiert. Umschrift deutschfreundlich: ā, sch, ch, tsch, dsch, z = weiches s, zh, gh, y = j.

## Kalender & Anwesenheit (Konsole)

- **📅 Kalender:** Unterrichtstage pro Klasse eintragen (Datum, Uhrzeit, Thema, Notiz, „fällt aus“), als **Serie** anlegen (z. B. jeden Mo + Mi bis Semesterende) und als **.ics** in Outlook/Google/Apple-Kalender übernehmen.
- **✋ Anwesenheit:** Am Unterrichtstag tippen die Teilnehmenden auf der Startseite „✋ Ich bin da“. In der Konsole erscheinen sie live gelb; die Lehrkraft bestätigt (✓) oder setzt „fehlt“ / „entschuldigt“. Anwesenheitsliste mit Quote, CSV-Export und Druckansicht. Auf der Übersicht steht ein Hinweis, wenn heute Unterricht ist.
- **Startseite der Teilnehmenden:** nächste Termine, Ausfälle und die eigene Anwesenheitsquote.
- Firebase: `farsi/termine/{klasse}/{termin}` und `farsi/anwesenheit/{klasse}/{termin}/{code}`. Teilnehmende dürfen nur „gemeldet“ schreiben – bestätigen kann nur die Lehrkraft. **Nach dem Update die Regeln aus `firebase-regeln.json` in Firebase → Realtime Database → Regeln einfügen und veröffentlichen.**

## Mein Bereich (`mein.html`)

Persönliche Seite für Teilnehmende (nur mit Code), erreichbar über „👤 Mein Bereich“ auf der Startseite:
Kennzahlen (Stationen, Erfolgsquote, Lernserie, Anwesenheit), „Weiterlernen“ (zuletzt geübte bzw. nächste offene Lektion), alle Termine mit Thema und Notiz – auch vergangene mit eigenem Anwesenheitsstatus, damit man Verpasstes nachholen kann –, Aktivität der letzten 4 Wochen, Abzeichen und der Lernfortschritt je Bereich und Lektion.
`index.json` enthält dafür je Lektion die Station-IDs des Lernpfads (`haupt`) und die Zahl der Zusatz-Stationen (`zusatzAnz`); beides erzeugt `index_bauen.py`.

## Aktivitäten (`aktivitaeten.html`)
- **🎮 Gemeinsamer Spielcode (`code.html`):** TN geben nur den vierstelligen Code ein und landen automatisch in der richtigen
  Aktivität (Truhe, Geschenk, Gespräch, Chat, Quiz, Vokabelspiele, Buzzer). Auch erreichbar über „🎮 Spielcode“ auf der Startseite,
  das Feld oben in 🎲 Aktivitäten und `code.html?c=1234` (z. B. als Link/QR). Neue Codes sind über alle Aktivitäten eindeutig
  (`LIVE_TOOLS.neueRunde`), die Zuordnung steht in `LIVE_TOOLS.SPIELE` (assets/live-tools.js) – neue Aktivität dort eintragen.
  Der alte Weg (Code direkt bei der Aktivität) bleibt.

Sammelstelle für **Live-Aktivitäten** (die Lehrkraft startet eine Runde und bekommt einen Spielcode) und **zusätzliches Material** (z. B. `material/persisch-schreiben-uebungsheft.pdf`). Neue Einträge oben in `aktivitaeten.html` im Objekt `AKTIVITAETEN` ergänzen. Erreichbar über „🎲 Aktivitäten“ auf der Startseite, in „Mein Bereich“ und in der Konsole.

### Live: „Das Geheimnis von Omas Truhe“ (`live-truhe.html`, Inhalte in `assets/live-truhe-daten.js`)
Schatzsuche für Zweierteams (Person A / B), ca. 120 Minuten, Wiederholung Grundkurs ab Fortgeschritten 1. Jede Person sieht nur ihre Hälfte der Hinweise – ohne Sprechen auf Persisch geht es nicht weiter.
1. **Der Brief** – 10 Abschnitte ordnen (A hat 5, B hat 5), dann Fragen → Ziffer 7
2. **Das Fotoalbum** – B liest die Beschreibung, A findet das Foto; A beschreibt, B hakt ab → Ziffer 4
3. **Der Stadtplan** – Wegbeschreibung im Imperativ, zwei Wege mit Rollentausch → Ziffer 2
4. **Das Telefonat** – Dialog ordnen, mit verteilten Rollen lesen → Ziffer 5
5. **Das Schloss** – A stellt Ziffer 1–2 ein, B Ziffer 3–4 → Truhe öffnet sich, Omas Brief + Sprechaufgabe „Eure Erinnerungstruhe“ fürs Plenum
Leitung: `live-truhe.html?leitung=1` (nur angemeldet in der Konsole) – Teams automatisch einteilen, Live-Stand, Beamer-Ansicht, Nachrichten an alle, Lösungen. Firebase: `farsi/live/truhe/{code}` (Regeln in `firebase-regeln.json`).


**Eigene Runden (ohne Lehrkraft):** Bei allen Live-Aktivitäten gibt es für TN „👥 Eigene Runde starten“. Wer eröffnet, ist Host 👑
(Teams einteilen bzw. Lobby, Start, Beenden). Einleitungen sind nur auf Deutsch; gelesen wird ab der eigentlichen Geschichte.

### Live: „Das Geburtstagsgeschenk“ (`live-truhe.html?spiel=geschenk`, Inhalte in `assets/live-geschenk-daten.js`)
Leichte, kurze Schnitzeljagd (ca. 45 Min.) mit derselben Technik wie Omas Truhe: Saras Nachricht ordnen (6 Teile), Foto finden,
Stadtplan (2 Wege), Schloss mit 3 Ziffern (8-5-7). Einfache Sätze, vokalisiert, pro Station ein aufklappbares 📖 Wörterbuch (`lexikon`).
Weitere Schatzsuchen: neue Datei `assets/live-<id>-daten.js` mit `window.SCHATZSUCHEN.<id>` (Format wie diese), in
`live-truhe.html` als Script einbinden und in `aktivitaeten.html` mit `datei: "live-truhe.html?spiel=<id>"` eintragen.

### Werkzeuge in allen Live-Aktivitäten (`assets/live-tools.js`)
- **Lang/Kurz:** Truhe (120/60 Min., kurz ohne Telefonat, weniger Fragen, ohne Beschreiben/Rollenspiel), Geschenk (45/25 Min.),
  Gespräch über „Länge“ (kurz/mittel/lang = Antworten pro Frage).
- **👀 Bildschirme ansehen:** Lehrkraft sieht live, was A und B (bzw. jedes Gerät im Gespräch: „📱 Geräte ansehen“) gerade sehen.
- **✋ Hilfe rufen**, **⏱ Timer für alle**, **📢 Nachricht**, **🔄 Alle Geräte neu laden** (gegen alte Versionen auf Tablets),
  ⚪ Offline-Anzeige, Warnbalken bei Verbindungsverlust.
- **Truhe:** ⏭ Station freigeben (wenn ein Team feststeckt), Teams/Rollen auch während des Spiels ändern, Dreierteam bei ungerader Zahl,
  Startprüfung (jedes Team braucht A und B), 📖 Wörterbuch an jeder Station.
- **Gespräch:** ⏸ Pause während des Spiels, Doppelklick-Schutz, ✓-Knopf auf der Leinwand, Ja/Nein/Vielleicht nur auf Persisch mit Emoji.

### Live: Gesprächs-Simulation (`live-gespraech.html`)
Reihum-Gespräch für 2–8 Personen mit verzweigter Geschichte. Wer dran ist, übersetzt einen deutschen Satz ins Persische,
die anderen reagieren (Ja / Nein mit Alternative / Vielleicht oder Auswahl), die Mehrheit bestimmt den Verlauf.
Zwischen den Gesprächen erzählen kurze Episoden, was passiert; am Ende gibt es das Protokoll (drucken / als PDF / kopieren).
- **Stufen** (für alle oder pro Person): 1 = vier persische Sätze zur Auswahl, 2 = Satz aus Wort-Kacheln bauen,
  3 = frei sprechen, die Lehrkraft bestätigt (✓ / Lösung zeigen / weiter ohne Punkte). In Stufe 3 gibt es „Hilfe“ (Auswahl, weniger Punkte).
- **Lobby:** Reihenfolge, persische Namen (werden beim TN gespeichert, auch in der Konsole über den Knopf **فا**),
  Stufe pro Person, Pause, „Antworten pro Frage höchstens“ (steuert die Dauer), Vokalisierung an/aus.
- **Szenarien** (`assets/gespraeche/*.js`, Liste in `assets/gespraeche/index.js`): Was essen wir heute? (≈30 Min.),
  Unsere WG (≈35), Wie hast du Arbeit gefunden? (≈45), Wo machen wir Urlaub? (≈45), Wir planen einen Tag (≈60),
  Wir bekommen Besuch! (≈60), Wenn das Wetter mitspielt … (≈40, Bedingungssätze). Alle Persisch-Texte sind vokalisiert.
- **Neues Szenario:** Format wie `tag-planen.js` (Kommentar oben), prüfen mit
  `node farsi-werkzeuge/gespraech_pruefen.js <id>` (Struktur, verbotene Wörter, ZWNJ, Länge), dann in `index.js` eintragen.
- **Ohne Lehrkraft:** TN klicken in 🎲 Aktivitäten auf „👥 Eigene Runde starten“, wählen ein Szenario und sind Host 👑
  (Lobby, Start, Beenden). Weitere TN können per 👑 Co-Host werden. In Stufe 3 prüfen Host/Co-Hosts die freien Antworten
  (nie die eigene); gibt es keinen anderen Co-Host, dürfen alle anderen prüfen.
- **Co-Host in Lehrkraft-Runden:** 👑 in der Lobby – die Person prüft Stufe 3, darf überspringen und „Dran ist“ ändern.
- **Szenario mit Grammatik-Fokus:** „Wenn das Wetter mitspielt …“ (Lektion 22, reale Bedingungen, ≈40 Min.).
- Firebase: `live/gespraech/{code}`; Regeln aus `firebase-regeln.json` (TN dürfen eigene Runden anlegen, wenn ihr Code existiert).

### Live: Quiz (`live-quiz.html`)
Kahoot-artiges Quiz für die ganze Gruppe. Lehrkraft: „▶ Leitung starten“ → Kurz- oder Langfassung, Zeit pro Frage
(20/30/45 Sek. oder ohne), Spielcode + QR-Code auf der Leinwand. TN öffnen `live-quiz.html` (oder scannen den QR-Code)
und geben nur **Spielcode + Vornamen** ein – kein Zugangscode nötig (gut für die erste Sitzung).
- Fragetypen: Auswahl, wahr/falsch, „Tippe auf …“ (Satzglied antippen), Umfrage (ohne richtige Antwort, für Reflexion).
- Punkte: richtig = 500–1000 je nach Schnelligkeit (ohne Zeit: 1000). Auflösung automatisch, wenn alle geantwortet haben
  oder die Zeit um ist; sonst „⏩ Auflösen“. Leertaste = weiter. Nach jeder Frage Erklärung + Kasten „Und im Persischen?“.
- 📊 Zwischenstand jederzeit, am Ende Podest, Rangliste und **Auswertung pro Frage** (% richtig, drucken).
- „⚙️ Steuerung“ zeigt, wer schon geantwortet hat, und „Alle Geräte neu laden“. Allein üben: `live-quiz.html?solo=1`.
- Quiz „Sprache verstehen“ (`assets/quiz/sprache-verstehen.js`): Satzglieder, Präpositionen, Wechselpräpositionen,
  Partizip/Aktiv/Passiv, erster Blick aufs Persische (33 Fragen, Kurzfassung 19 = `kurz:true`).
  Weitere Quizze: neue Datei nach diesem Muster, im `<script>`-Kopf von `live-quiz.html` einbinden, Aufruf mit `?quiz=<id>`.
- Firebase: `live/quiz/{code}` (keine Regeländerung nötig).

### Live: Blitz-Übersetzung mit Buzzer (`live-buzzer.html`)
Nur mit Lehrkraft (Moderation). Ein Satz erscheint (Leinwand/Bildschirm teilen und auf den Handys), TN drücken den
**Buzzer** auf dem Handy (Reihenfolge nach Server-Zeit, mit +x s Abstand). Die erste Person ist automatisch 🎤 dran und
übersetzt **mündlich**; Bewertung: ✅ richtig +2, 🤏 fast +1, ❌ falsch −1 (oder 0) → nächste Person in der Reihe.
🎲 zufällig aufrufen, 💡 Lösung zeigen (mit „auch richtig“-Varianten, Satztyp und Regel), Buzzer sperren.
Tasten: R richtig · H fast · F falsch · L Lösung · Z zufällig · Leertaste weiter. „👁 Lösung spicken“ nur aufklappen,
wenn der Bildschirm nicht geteilt wird (oder „🖥️ Leinwand“ blendet es aus).
- Einstellungen: Richtung (DE → FA, FA → DE, abwechselnd), Satztypen, Anzahl (10/15/20/alle, gleichmäßig über die Typen), gemischt oder nach Typ, Minuspunkte an/aus.
- Satz-Set `assets/buzzer/wenn-real.js` (Lektion 22, 36 Sätze): agar + Präsens (10), + Konjunktiv (12, mit Präteritum als
  Alternative), + Präteritum (9, Zukunftsbedeutung), selbst wenn / sonst (5). Weitere Sets nach diesem Muster, Aufruf `?set=<id>`.
- TN brauchen nur Spielcode + Vornamen. Firebase: `live/buzzer/{code}` (keine Regeländerung nötig).

### Live: Vokabelspiele (`live-vokabel.html`)
Zwei Spiele mit dem Wortschatz (`ws-*.json`) aus **frei wählbaren Lektionen aller Bereiche** (Häkchen pro Lektion,
„alle/keine“ pro Bereich; Link mit Vorauswahl: `live-vokabel.html?leitung=1&leks=04,05`).
- **🎯 Wort-Duell** (`?spiel=duell`): Wer dran ist, wählt aus 5 Handkarten ein Wort und wirft es; die anderen tippen die
  Übersetzung unter 3/4/6 Möglichkeiten (Ablenker oft aus demselben Thema). Richtung wechselt jede Runde
  (Deutsch → Persisch, Persisch → Deutsch). +1 pro richtige Antwort. Aufgelöst wird, wenn alle geantwortet haben (oder „⏩ jetzt auflösen“).
- **🃏 Karte in die Mitte** (`?spiel=karte`): Reihum legt eine Person eine von 3 Themenkarten (Kategorie aus dem Wortschatz,
  z. B. Menschen & Familie, Essen & Trinken, Orte, Berufe …). Alle werfen gleichzeitig passende Wörter aus ihren 8 Handkarten:
  richtig +1, falsch −1. Runde endet, wenn alle „nichts mehr“ gemeldet haben oder nichts Passendes mehr da ist; dann wird gezeigt,
  was noch gepasst hätte, und die Hände werden aufgefüllt. Geprüft wird über das Feld `kat` im Wortschatz.
- **🔤 Buchstaben-Karte** (`?spiel=buchstabe`, Alphabetisierung L1): wie „Karte in die Mitte“, aber in der Mitte liegt ein
  **Buchstabe** (groß, mit Name und Laut). Passend sind Wörter, in denen er vorkommt – oder (Regel „Wortanfang“) die mit ihm
  beginnen. Buchstaben **einzeln wählbar** (1× tippen = gelernt, 2× = ★ neu/Fokus, 3× = aus; „bis n ✓“ markiert alle bis Station n;
  die Auswahl wird im Browser gespeichert). Es kommen nur Wörter (max. 8 Buchstaben, ein Wort) vor, die ganz aus gelernten
  Buchstaben bestehen – aus L1, allen Lektionen und dem Wörterbuch (`suche.json`); in die Mitte kommen nur die ★-Buchstaben
  (ohne ★: alle gelernten). Schon mit ا ب د م ر gibt es ~50 Wörter. آ zählt als ا.
  Für echte Leseübung: Stufe „schwer“ (ohne Bedeutung) oder „ohne Hilfe“ (nur Schrift, keine Umschrift).
- **✍️ Schreib-Quiz in Teams** (`?spiel=schreib`): Jedes Team (= Tisch) sieht ein deutsches Wort (+ Umschrift in Stufe „leicht“)
  und wählt unter 4 Schreibweisen die richtige. Falschschreibungen werden automatisch aus ähnlichen Buchstaben (ب/پ/ت/ث, س/ش/ص,
  ر/ز, …), vertauschten, fehlenden oder zusätzlichen Buchstaben gebaut – nur mit gelernten Buchstaben. Wer zuerst tippt, antwortet
  fürs Team; danach sehen alle die Lösung. 8/10/15/20 Wörter pro Team, Team-Wertung live und am Ende. Buchstabenwahl wie bei der Buchstaben-Karte (★-Buchstaben kommen zuerst dran).
- **Stufen:** leicht / schwer (Umschrift bzw. deutsche Bedeutung auf den Handkarten) / **ohne Hilfe**:
  keine Umschrift, keine Bilder, keine deutsche Bedeutung. Im Duell wird Persisch → Deutsch **frei getippt**
  (tolerant: Artikel, Groß/klein, ae/ä, 1 Tippfehler, „Lehrer/in“ = „Lehrerin“); Deutsch → Persisch bleibt Auswahl ohne Umschrift.
  Bei „Karte in die Mitte“ steht die Themenkarte dann nur auf Persisch.
- **Lehrkraft:** Tische zu 2/3/4/6 Personen werden beim Start gebildet, Nachzügler kommen an den kleinsten Tisch.
  Übersicht aller Tische, 👀 Bildschirme eines Tisches ansehen, Timer, Nachricht, alle neu laden. Am Ende Rangliste und
  „Diese Wörter waren schwierig“ (für jede Person: „… solltest du noch einmal üben“).
- **🔤 Buchstaben & Laute** (aufklappbar unter dem Spiel): alle Buchstaben mit Formen (allein/Anfang/Mitte/Ende), Name, Laut,
  Nicht-Verbinder ocker, Vokalzeichen; antippen = Name hören. Erscheint bei der Buchstaben-Karte (noch nicht gelernte blass) und
  bei Wort-Duell/Karte, wenn Lektionen 1–5 dabei sind; in der Lobby an/aus, bei Stufe „ohne Hilfe“ aus.
- **📊 Statistik (Lehrkraft):** während des Spiels einblendbar, am Ende automatisch: pro Person richtig/falsch/übersehen + Quote,
  pro Buchstabe bzw. Themenkarte (schwierigste zuerst), falsch geworfene Wörter, Duell: Quote je Richtung; druckbar.
  **Frühere Runden** (auch eigene Runden der TN ohne Lehrkraft) stehen auf der Einrichten-Seite der Leitung → „ansehen“.
- **Eigene Runde:** „👥 Eigene Runde starten“ (mit Zugangscode, ein Tisch für alle). Mitspielen geht auch ohne Zugangscode (Code + Vorname).
- Firebase: `live/vokabel/{code}` (keine Regeländerung nötig).

### Lese-Prüfung (`lese-pruefung.html`)
Mündliche Prüfung der Lesefähigkeit für die Alphabetisierung, mit Moderation über die Leinwand: Ein Wort erscheint groß, die Person liest vor; dann Auflösung (Umschrift, deutsche Bedeutung, 🔊) und Bewertung ✓ / ½ / ✗ (Tasten Leertaste, 1, 2, 3, H, ←/→). Namen eingeben → jede Person bekommt eigene Wörter. Quellen: Wörter aus Lektion 1 und den ersten Lektionen, Pronomen, „sein“ und „haben“ im Präsens (`assets/lesen/grammatik.json`, ca. ein Drittel der Wörter), optional Wörterbuch. Buchstaben wie im Vokabelspiel wählbar (gleiche Auswahl, ★ = neu). Ergebnis mit „noch üben“ zum Drucken; frühere Prüfungen bleiben auf dem Gerät gespeichert.

### Selbstlernen: Detektiv-Fall „Wo ist Pashmak?“ (`live-detektiv.html`)
Selbstlern-Lektion für 1–4 Personen (Niveau: Beginn Fortgeschritten, ohne Bedingungssätze). Nedas Katze Pashmak ist verschwunden. Die TN befragen fünf Personen im Haus (Neda, Kaveh, Shirin, Herr Rahimi, Bahar), notieren Hinweise im gemeinsamen Notizbuch und klagen am Ende an: **Wer? Was? Wann? Wo?**
- **Start:** TN öffnen den Fall selbst (Aktivitäten → „🕵️ Fall öffnen / weiterspielen“), wählen *mit Hilfe* (deutsche Übersetzungen auf Knopfdruck) oder *ohne Hilfe* (nur Persisch; Wortliste und Wörterbuch bleiben) und bekommen einen Spielcode. Die anderen geben ihn ein (auch über `code.html`).
- **Zwei Spielweisen:** *getrennt* (Standard – jede/r sieht nur die eigenen Gespräche; Ergebnisse gehen als persische Notiz ins Notizbuch, die man vorher aus Wörtern ordnet; dazu 💬 Team-Chat mit persischen Schnellsätzen) oder *zusammen* (alle lesen alles mit).
- **Anleitung:** Vor dem Start (Lobby und einmal nach dem Start) erklärt „Bevor wir beginnen …“ das Spiel auf Persisch (vorgelesen) und Deutsch, dazu kurze Bedienhinweise.
- **🎧 Erst hören (Standard):** Antworten und Bitten werden vorgelesen; der Text erscheint erst mit „📄 Text einblenden“. Die Verständnisfragen beim Notieren werden so zu Hörverstehen. Alternativ „📖 gleich lesen“.
- **Erst helfen, dann fragen:** Jede Person hat zuerst eine Bitte mit eigener Aufgabenart – Neda: Suchplakat (Lückentext), Kaveh: Sprachnachricht mit Uhrzeiten (Hören; „📄 Text“ als Notlösung), Shirin: Einkaufsliste (Wort ↔ Bild), Herr Rahimi: Dialog ordnen, Bahar: zwei Sätze bauen. Daten: `personen[].bitte` in `assets/detektiv/pashmak.js`.
- **Audio:** Alle Texte des Falls haben Aufnahmen (siehe „Aussprache / Audio“), jede Person mit eigener Stimme.
- **Aufgaben teilen:** Die fünf Personen werden beim Start reihum verteilt (3 TN → 2/2/1). Jede/r fragt die eigenen Personen, bei den anderen kann man mitlesen; „🔄 übernehmen“ und „🔀 neu verteilen“, falls jemand fehlt.
- **Zusammenarbeit:** Manche Fragen sind gesperrt, bis ein passender Hinweis im Notizbuch steht – oft aus dem Gespräch einer anderen Person.
- **Notieren:** Steckt in einer Antwort ein Hinweis, erscheint „📝 Notieren“. Vorher kommt eine kurze Verständnisfrage (Deutsch); erst bei richtiger Antwort landet der Hinweis im Notizbuch.
- **Wörterbuch:** Jedes persische Wort ist antippbar und wird – auch mit Endungen wie می‌…‌َم, ‌ها, ‌ش – in der Grundform nachgeschlagen (`assets/detektiv/engine.js`, `nachschlagen`). Dazu pro Person eine Wortliste und der Reiter 🔎 Wörterbuch.
- **Speichern:** Alles liegt in Firebase unter `live/detektiv/{code}` und wird sofort gespeichert. Auf der Startseite der Aktivität erscheinen „Deine letzten Fälle“ zum Weiterspielen.
- **Ende:** Lösung, Nachricht von Neda (Persisch) und ein Abschlussbericht: drei Sätze aus Wörtern bauen, auf die Spieler verteilt. Druckbar.
- **Lehrkraft:** `live-detektiv.html?leitung=1` (in der Konsole angemeldet) zeigt alle Fälle mit Fortschritt (Hinweise, Fragen, Lösungsversuche, Fehler beim Notieren) und öffnet jeden Fall zum Mitlesen.
- **Neuer Fall:** Datei nach dem Muster von `assets/detektiv/pashmak.js` anlegen (Personen mit Fragen/Antworten, `hinweis`, `braucht`, Hinweise mit Verständnisfrage, Anklage, Ende, Bericht) und in `live-detektiv.html` einbinden.

### Live: Wortsalat-Chat (`live-chat.html`)
Gruppenchat im WhatsApp-Stil für 2–8 Personen (oder allein). Wer dran ist, bekommt ca. 28 persische Wort-Kacheln
(alle Wörter der möglichen Nachrichten + Ablenkungswörter) und baut daraus eine Nachricht. Oben stehen die Möglichkeiten
(❓ Frage, 💡 Vorschlag, 👍 Zusage, 👎 Absage, ℹ️ Info). Je nach gesendeter Nachricht geht der Chat anders weiter.
- **Automatische Korrektur:** genau richtig → gesendet (10 / 6 / 3 Punkte je nach Versuch); gleiche Wörter, falsche
  Reihenfolge → „nur die Reihenfolge noch nicht“; ein bis zwei Wörter daneben → „Fast!“; sonst „passt hier nicht“.
  Manche Nachrichten erlauben mehrere Wortstellungen (`alt`). 💡 Tipp: 1. Bedeutungen zeigen, 2. nächstes Wort setzen.
- **Stufen:** leicht (Ideen mit deutscher Bedeutung) / schwer (nur die Absicht, z. B. „❓ Frage“). Vokale an/aus.
- **Lehrkraft:** 🖥️ Leinwand, 📱 Geräte ansehen, „Dran ist“ ändern, ⏸ Pause, ⏭ Zug überspringen (das Spiel schreibt),
  Timer, Nachricht, alle neu laden. Am Ende: 🔁 noch ein Chat (Punkte bleiben, andere Person beginnt), drucken, kopieren.
- **Ohne Lehrkraft:** „👥 Eigene Runde starten“ (Host 👑) oder **„🎧 Allein üben“** (`?solo=1`, ohne Firebase):
  drei Chat-Freunde (Nima, Sara, Kian) antworten automatisch und zufällig.
- **Szenarien:** `assets/chats/*.js`, Liste in `assets/chats/index.js`. Beispiel: „Was machen wir am Samstag?“
  (Kino / Park / Kochen, 5–9 Nachrichten pro Chat). Format: `knoten` mit `aufgabe`, `optionen` (`art`, `fa`, `alt`, `de`,
  `um` = Umgangssprache, `weiter`) und `extra` (Ablenkungswörter).
- Firebase: `live/chat/{code}` (keine Regeländerung nötig).
