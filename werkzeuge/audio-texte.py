#!/usr/bin/env python3
"""Sammelt alle persischen Texte, die auf der Plattform vorgelesen werden (🔊), und weist Stimmen zu.
Schlüssel/Hash werden in assets/core.js genauso gebildet (FARSI.audioPfad)."""
import json, re, os, glob, subprocess
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FA = re.compile('[\u0621-\u063A\u0641-\u064A\u067E\u0686\u0698\u06A9\u06AF\u06CC\u06F0-\u06F9]')   # mindestens ein persischer Buchstabe oder eine persische Ziffer
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
# ---------- Aussprache-Hilfe nur für die Sprachausgabe (der angezeigte Text bleibt gleich) ----------
HARAKAT = '\u064B\u064C\u064D\u064E\u064F\u0650\u0651\u0652\u0670'
KEINE_E = {"نگه", "فربه", "ابله", "توجه", "مه", "ره"}   # hier ist das End-ه hörbar (h) oder kein -e
_WB = None
def woerterbuch_formen():
    """unvokalisiertes Wort → eindeutige vokalisierte Form (aus Wörterbuch + Lektionen)"""
    global _WB
    if _WB is None:
        m = {}
        for w in json.load(open(R + '/assets/woerterbuch/suche.json'))['w']:
            fa = w[0]
            if ' ' in fa or not re.search('[' + HARAKAT + ']', fa): continue
            k = re.sub('[' + HARAKAT + ']', '', fa).replace('ي', 'ی').replace('ك', 'ک')
            m.setdefault(k, set()).add(fa)
        _WB = {k: next(iter(v)) for k, v in m.items() if len(v) == 1}
    return _WB
def end_e(seg):
    """stummes End-ه (-e) mit Kasra markieren: نَوه → نَوِه, هفته → هفتِه"""
    roh = re.sub('[' + HARAKAT + ']', '', seg)
    if len(roh) < 3 or not seg.endswith('ه') or roh in KEINE_E: return seg
    vor = seg[-2]
    if vor in HARAKAT or vor in 'اآ' or not re.match('[\u0621-\u06CC]', vor): return seg
    if vor in 'وی':   # و/ی nur als Konsonant (نَوه, سایه), nicht als Vokal (کوه, شبیه)
        davor = seg[-3] if len(seg) >= 3 else ''
        if not (davor in '\u064E\u0650\u064F' or davor in 'اآ'): return seg
    return seg[:-1] + '\u0650' + 'ه'
NB = '[^\u0621-\u0655\u0670\u067E\u0686\u0698\u06A9\u06AF\u06CC\u200c]'
KONS = 'بپتثجچحخدذرزژسشصضطظعغفقکگلمنه'   # ohne ا و ی (können Vokale sein)
def sukun(seg):
    """In vokalisierten Wörtern: Konsonant ohne Zeichen vor einem Konsonanten bekommt Sukun – اَبر → اَبْر (nicht „abar“)"""
    if not re.search('[' + HARAKAT + ']', seg): return seg
    out = []
    for i, c in enumerate(seg):
        out.append(c)
        if c in KONS and i + 1 < len(seg) and seg[i + 1] in KONS + 'ءئؤ': out.append('\u0652')
    return ''.join(out)
def fuer_tts(t):
    """Nur in (teil-)vokalisierten Texten fehlende Vokale aus dem Wörterbuch ergänzen; End-ه immer markieren."""
    wb = woerterbuch_formen(); out = []; teilvok = bool(re.search('[' + HARAKAT + ']', t))
    for tok in re.split(r'(\s+)', t):
        m = re.match(r'^(' + NB + r'*)(.*?)(' + NB + r'*)$', tok)
        if not m or not m.group(2): out.append(tok); continue
        vor, kern, nach = m.groups()
        if teilvok and len(kern) >= 4 and not re.search('[' + HARAKAT + ']', kern) and kern in wb: kern = wb[kern]
        kern = '\u200c'.join(sukun(end_e(x)) for x in kern.split('\u200c'))
        out.append(vor + kern + nach)
    return ''.join(out)

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
    # 2b) Zusatzwörter der Lese-Prüfung
    for g in json.load(open(R + '/assets/lesen/grammatik.json'))['gruppen']:
        for w in g['woerter']: add(w['fa'])
    # 2c) Schreibwerkstatt: alle persischen Texte der Aufgaben (Auftrag, Satzanfänge, Wörter, Beispiel)
    def alle_fa(o):
        if isinstance(o, dict): [alle_fa(v) for v in o.values()]
        elif isinstance(o, list): [alle_fa(v) for v in o]
        elif isinstance(o, str) and FA.search(o): add(o)
    for f in sorted(glob.glob(R + '/assets/schreiben/*.json')): alle_fa(json.load(open(f)))
    # 2d) Tischspiel „sein“: nur die richtigen Sätze / Wörter
    if os.path.exists(R + '/assets/sein/karten.json'):
        for k in json.load(open(R + '/assets/sein/karten.json'))['karten']: add(k['s'])
    # 3) Wörterbuch
    for w in json.load(open(R + '/assets/woerterbuch/suche.json'))['w']: add(w[0])
    # 4) Live-Aktivitäten (Chats, Gespräche, Quiz, Buzzer, Truhe …): persische Texte in JS-Daten
    for f in sorted(glob.glob(R + '/assets/*/*.js') + glob.glob(R + '/assets/live-*-daten.js')):
        if '/detektiv/' in f: continue
        for m in re.finditer(r'"((?:[^"\\\n]|\\.)*)"|`([^`$]*)`', open(f).read()):
            add(m.group(1) or m.group(2) or "")
    return [{"t": t, "s": fuer_tts(t), "k": k, "h": fnv(k), "v": v} for k, (t, v) in S.items()]
if __name__ == "__main__":
    L = sammeln(); import collections
    print(len(L), collections.Counter(x["v"] for x in L))
