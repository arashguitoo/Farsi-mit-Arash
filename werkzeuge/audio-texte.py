#!/usr/bin/env python3
"""Sammelt alle persischen Texte, die auf der Plattform vorgelesen werden (🔊), und weist Stimmen zu.
Schlüssel/Hash werden in assets/core.js genauso gebildet (FARSI.audioPfad)."""
import json, re, os, glob, subprocess
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FA = re.compile('[؀-ۿ]')
# Stimmen: Microsoft-Stimme + Tempo + Tonhöhe → sechs unterscheidbare Sprecher/innen
STIMMEN = {
  "W1": ("fa-IR-DilaraNeural", "-8%", "+0Hz"),    # Frau, mittel
  "W2": ("fa-IR-DilaraNeural", "-2%", "+14Hz"),   # Frau, jung/hell
  "W3": ("fa-IR-DilaraNeural", "-14%", "-12Hz"),  # Frau, ruhig/tief
  "M1": ("fa-IR-FaridNeural", "-8%", "+0Hz"),     # Mann, mittel
  "M2": ("fa-IR-FaridNeural", "-2%", "+10Hz"),    # Mann, jung
  "M3": ("fa-IR-FaridNeural", "-16%", "-14Hz"),   # Mann, älter
}
PAARE = [("W1", "M1"), ("M2", "W2"), ("W3", "M3"), ("M1", "W2"), ("W2", "M3"), ("M2", "W3")]
def schluessel(t):
    t = re.sub(r'<[^>]+>', '', t)
    t = re.sub('[ً-ْٰٕٔ]', '', t)
    t = t.replace('‌', ' ').replace('ي', 'ی').replace('ك', 'ک').replace('ة', 'ه')
    t = re.sub(r'[«»"“”„.,،؛;:!?؟…–—\-()\[\]/]', ' ', t)
    return re.sub(r'\s+', ' ', t).strip()
def fnv(t):
    h = 0x811c9dc5; b = t.encode('utf-16-le')
    for i in range(0, len(b), 2):
        h ^= b[i] | (b[i + 1] << 8); h = (h * 0x01000193) & 0xffffffff
    return '%08x' % h
def sammeln():
    S = {}
    def add(t, v=None):
        if not isinstance(t, str) or not FA.search(t) or len(t) > 1500: return
        t = re.sub(r'<[^>]+>', '', t).strip(); k = schluessel(t)
        if not k or k in S: return
        if v is None:
            h = int(fnv(k), 16)
            v = ("W1", "M1")[h % 2] if len(k) < 16 else list(STIMMEN)[h % 6]
        S[k] = (t, v)
    # 1) Detektiv-Fall mit festen Stimmen pro Person
    for x in json.loads(subprocess.check_output(["node", os.path.join(R, "werkzeuge/detektiv-texte.js")])): add(x["t"], x["v"])
    # 2) Lektionen – Dialogzeilen abwechselnd mit zwei Stimmen
    blk = [0]
    def walk(o):
        if isinstance(o, dict):
            z = o.get("zeilen")
            if isinstance(z, list) and z and all(isinstance(x, dict) for x in z):
                a, b = PAARE[blk[0] % len(PAARE)]; blk[0] += 1
                for i, x in enumerate(z): add(x.get("say") or x.get("fa"), a if i % 2 == 0 else b)
                add(" ".join(x.get("fa", "") for x in z), a)
            for key in ("say", "fa", "nameFa"):
                if key in o: add(o[key])
            if o.get("optFa") and isinstance(o.get("optionen"), list): [add(x) for x in o["optionen"]]
            if isinstance(o.get("beispiel"), dict): add(o["beispiel"].get("fa"))
            for v in o.values(): walk(v)
        elif isinstance(o, list): [walk(v) for v in o]
    for f in sorted(glob.glob(R + '/lektionen/*.json')): walk(json.load(open(f)))
    # 3) Wörterbuch
    for w in json.load(open(R + '/assets/woerterbuch/suche.json'))['w']: add(w[0])
    # 4) Live-Aktivitäten (Chats, Gespräche, Quiz, Buzzer, Truhe …): persische Texte in JS-Daten
    for f in sorted(glob.glob(R + '/assets/*/*.js') + glob.glob(R + '/assets/live-*-daten.js')):
        if '/detektiv/' in f: continue
        for m in re.finditer(r'"((?:[^"\\\n]|\\.)*)"|`([^`$]*)`', open(f).read()):
            add(m.group(1) or m.group(2) or "")
    return [{"t": t, "k": k, "h": fnv(k), "v": v} for k, (t, v) in S.items()]
if __name__ == "__main__":
    L = sammeln(); import collections
    print(len(L), collections.Counter(x["v"] for x in L))
