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

Ohne Code können Studierende „ohne Code ausprobieren“ – der Fortschritt bleibt dann nur auf dem Gerät.

> Die Seiten laufen über GitHub Pages bzw. einen Webserver, **nicht** per Doppelklick auf die Datei (die Lektionen werden als JSON nachgeladen).

## Zwei (oder mehr) Klassen

Jede Person hat einen eigenen Code und gehört zu einer Klasse. Unter **Freigaben** stellst du pro Klasse ein, welche Lektion offen ist – so kann Klasse A schon Lektion 2 haben, während Klasse B noch bei Lektion 1 ist. „Standard“ richtet sich nach `standard` in `lektionen/index.json`.

## Neue Lektion hinzufügen

1. Datei `lektionen/02-….json` anlegen (Aufbau wie Lektion 1).
2. In `lektionen/index.json` beim Eintrag `"datei": "02-….json"` ergänzen und `"standard": "offen"` oder `"bald"` setzen.
3. Hochladen – fertig. Die Konsole erkennt die Lektion automatisch.

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

`richtig` zählt ab 0. In `bauen` müssen die `teile` genau die Buchstaben des Wortes ohne Vokalzeichen sein.

## Aussprache / Audio

Überall, wo 🔊 erscheint, wird zuerst eine **eigene MP3** gespielt, falls du beim Eintrag `"audio": "audio/aab.mp3"` angibst (Ordner `audio/` anlegen). Ohne MP3 nutzt die Seite die Sprachausgabe des Geräts – eine persische Stimme gibt es aber nicht überall (am zuverlässigsten in Microsoft Edge). Die Umschrift ist deshalb immer dabei.

## Schreibweise

Persisches `ی` und `ک` (nicht arabisch `ي`/`ك`), Schrift Vazirmatn, Lektion 1 voll vokalisiert. Umschrift deutschfreundlich: ā, sch, ch, tsch, dsch, z = weiches s, zh, gh, y = j.
