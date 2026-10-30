#!/usr/bin/env python3
"""Baut den Kartenstapel für das Tischspiel „sein“ (live-sein.html) → assets/sein/karten.json
Quellen: lektionen/ws-02.json (Berufe, Gefühle), lektionen/ws-01.json (Lektion 1 – Lesen)."""
import json, os, random, re
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rnd = random.Random(7)
PRON = [("مَن", "man", "ich", "👤"), ("تو", "to", "du", "👉"), ("او", "u", "er / sie", "🧍"),
        ("ما", "mā", "wir", "👨‍👩‍👧"), ("شُما", "schomā", "ihr / Sie", "👥"), ("آن‌ها", "ānhā", "sie (Plural)", "👫")]
SEIN_DE = ["bin", "bist", "ist", "sind", "seid / sind", "sind"]
LANG = [("هَستَم", "hastam"), ("هَستی", "hastī"), ("اَست", "ast"), ("هَستیم", "hastīm"), ("هَستید", "hastīd"), ("هَستَند", "hastand")]
NEIN = [("نیستَم", "nīstam"), ("نیستی", "nīstī"), ("نیست", "nīst"), ("نیستیم", "nīstīm"), ("نیستید", "nīstīd"), ("نیستَند", "nīstand")]
KURZ = [("َم", "am"), ("ی", "ī"), (" اَست", " ast"), ("یم", "īm"), ("ید", "īd"), ("َند", "and")]
EMO = {"مَریض": "🤒", "خوشحال": "😄", "ناراحَت": "😞"}
ws2 = json.load(open(R + "/lektionen/ws-02.json"))["woerter"]
pred = [w for w in ws2 if w.get("kat") in ("Berufe", "Gefühle & Zustände") and w["fa"] != "حال"]
for w in pred: w.setdefault("emoji", EMO.get(w["fa"], "🙂"))
gefuehl = [w for w in pred if w["kat"] != "Berufe"]
ohne_v = lambda s: re.sub("[ً-ْ]", "", s)
konsonant = [w for w in pred if ohne_v(w["fa"])[-1] not in "هیاو"]
def satz(i, w, j, art, mitPron=True):
    """Pronomen i, Verbform j (für Ablenker j ≠ i)"""
    pf, ptr = (PRON[i][0] + " ", PRON[i][1] + " ") if mitPron else ("", "")
    if art == "kurz":
        v, vt = KURZ[j]
        return (pf + w["fa"] + v, ptr + w["tr"] + vt)
    v, vt = (LANG if art == "form" else NEIN)[j]
    return (f"{pf}{w['fa']} {v}", f"{ptr}{w['tr']} {vt}")
DE_ANF = ["Ich bin", "Du bist", "Er / Sie ist", "Wir sind", "Ihr seid / Sie sind", "Sie (Plural) sind"]
def de_satz(i, w, nein=False):
    return f"{DE_ANF[i]} {'nicht ' if nein else ''}{w['de']}."
karten = []
def opts(i, mk):
    andere = [j for j in range(6) if j != i]; rnd.shuffle(andere)
    idx = [i] + andere[:3]; rnd.shuffle(idx)
    return [mk(j) for j in idx], idx.index(i)
for art, liste in (("form", pred), ("nein", gefuehl), ("kurz", konsonant)):
    for w in liste:
        for i in range(6):
            o, r = opts(i, lambda j: satz(i, w, j, art))
            karten.append({"typ": art, "p": i, "w": {"fa": w["fa"], "tr": w["tr"], "de": w["de"], "emo": w["emoji"]},
                           "o": [x[0] for x in o], "ot": [x[1] for x in o], "r": r, "de": de_satz(i, w, art == "nein")})
# „Wer ist gemeint?“ – Satz OHNE Pronomen lesen, an der Verbform die Person erkennen
for art, liste in (("form", pred), ("kurz", konsonant)):
    for w in liste:
        for i in range(6):
            if art == "kurz" and i == 2: continue   # „… اَست“ ohne Pronomen ist wie die Langform
            s_, t = satz(i, w, i, art, mitPron=False)
            andere = [j for j in range(6) if j != i]; rnd.shuffle(andere); idx = [i] + andere[:3]; rnd.shuffle(idx)
            karten.append({"typ": "wer", "p": i, "satz": s_, "satzTr": t, "o": [PRON[j][2] for j in idx], "r": idx.index(i), "de": de_satz(i, w)})
# Lektion 1: Wort lesen – Bedeutung wählen
ws1 = [w for w in json.load(open(R + "/lektionen/ws-01.json"))["woerter"] if " " not in w["fa"].strip() and len(ohne_v(w["fa"])) <= 8]
for w in ws1:
    andere = [x for x in ws1 if x["de"] != w["de"]]; rnd.shuffle(andere)
    gleich = [x for x in andere if x.get("kat") == w.get("kat")][:2]
    dist = (gleich + [x for x in andere if x not in gleich])[:3]
    o = [w["de"]] + [x["de"] for x in dist]; rnd.shuffle(o)
    karten.append({"typ": "lesen", "wort": w["fa"], "tr": w["tr"], "emo": w.get("emoji", ""), "o": o, "r": o.index(w["de"]), "de": w["de"]})
for k in karten: k["s"] = k["o"][k["r"]] if k["typ"] in ("form", "nein", "kurz") else (k["satz"] if k["typ"] == "wer" else k["wort"])
out = {"pronomen": [{"fa": p[0], "tr": p[1], "de": p[2], "emo": p[3]} for p in PRON], "karten": karten}
json.dump(out, open(R + "/assets/sein/karten.json", "w"), ensure_ascii=False, separators=(",", ":"))
import collections; print(len(karten), collections.Counter(k["typ"] for k in karten))
