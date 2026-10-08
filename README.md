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

Überall, wo 🔊 erscheint, wird zuerst eine **eigene MP3** gespielt, falls du beim Eintrag `"audio": "audio/aab.mp3"` angibst (Ordner `audio/` anlegen). Ohne MP3 nutzt die Seite die Sprachausgabe des Geräts – eine persische Stimme gibt es aber nicht überall (am zuverlässigsten in Microsoft Edge). Die Umschrift ist deshalb immer dabei.

## Schreibweise

Persisches `ی` und `ک` (nicht arabisch `ي`/`ك`), Schrift Vazirmatn, Lektion 1 voll vokalisiert. Umschrift deutschfreundlich: ā, sch, ch, tsch, dsch, z = weiches s, zh, gh, y = j.

## Kalender & Anwesenheit (Konsole)

- **📅 Kalender:** Unterrichtstage pro Klasse eintragen (Datum, Uhrzeit, Thema, Notiz, „fällt aus“), als **Serie** anlegen (z. B. jeden Mo + Mi bis Semesterende) und als **.ics** in Outlook/Google/Apple-Kalender übernehmen.
- **✋ Anwesenheit:** Am Unterrichtstag tippen die Teilnehmenden auf der Startseite „✋ Ich bin da“. In der Konsole erscheinen sie live gelb; die Lehrkraft bestätigt (✓) oder setzt „fehlt“ / „entschuldigt“. Anwesenheitsliste mit Quote, CSV-Export und Druckansicht. Auf der Übersicht steht ein Hinweis, wenn heute Unterricht ist.
- **Startseite der Teilnehmenden:** nächste Termine, Ausfälle und die eigene Anwesenheitsquote.
- Firebase: `farsi/termine/{klasse}/{termin}` und `farsi/anwesenheit/{klasse}/{termin}/{code}`. Teilnehmende dürfen nur „gemeldet“ schreiben – bestätigen kann nur die Lehrkraft. **Nach dem Update die Regeln aus `firebase-regeln.json` in Firebase → Realtime Database → Regeln einfügen und veröffentlichen.**

