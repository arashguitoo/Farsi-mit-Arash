#!/usr/bin/env python3
"""Baut assets/woerterbuch/suche.json: alle Lektionswörter (ws-*.json) + allgemeines Wörterbuch (grund.json)
in EINER kompakten Datei für die Wortsuche. Nach Änderungen an Lektionen oder grund.json ausführen:
    python3 werkzeuge/woerterbuch-bauen.py
"""
import json, re, hashlib, os
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
strip = lambda s: re.sub("[ً-ْٰ‌ ]", "", s).replace("ي", "ی").replace("ك", "ک")
worte = lambda s: set(w for w in re.findall(r"[a-zäöüß]{3,}", s.lower()))
ix = json.load(open(os.path.join(R, "lektionen/index.json"), encoding="utf-8"))
L, W, da = [], [], {}
for l in ix["lektionen"]:
    if not l.get("wortschatz"): continue
    try: d = json.load(open(os.path.join(R, "lektionen", l["wortschatz"]), encoding="utf-8"))
    except FileNotFoundError: continue
    li = len(L); L.append([l["id"], str(l.get("nummer", "")), re.split("[–:]", l["titel"])[0].strip()])
    for w in d["woerter"]:
        if not w.get("fa") or not w.get("de"): continue
        k = strip(w["fa"])
        if any(worte(w["de"]) & s for s in da.get(k, [])): continue   # gleiche Schrift + Bedeutung schon da
        da.setdefault(k, []).append(worte(w["de"]))
        W.append([w["fa"], w.get("tr", ""), w["de"], w.get("kat", ""), li, w.get("emoji", ""), w.get("stamm", ""), w.get("stammTr", "")])
n_lek = len(W)
for w in json.load(open(os.path.join(R, "assets/woerterbuch/grund.json"), encoding="utf-8"))["woerter"]:
    k = strip(w["fa"])
    if any(worte(w["de"]) & s for s in da.get(k, [])): continue
    da.setdefault(k, []).append(worte(w["de"]))
    W.append([w["fa"], w.get("tr", ""), w["de"], w.get("kat", ""), -1, w.get("emoji", ""), w.get("stamm", ""), w.get("stammTr", "")])
# leere Felder am Ende abschneiden (kleiner)
W = [x[:max(i for i, v in enumerate(x) if v not in ("", None)) + 1] if True else x for x in W]
roh = json.dumps({"l": L, "w": W}, ensure_ascii=False, separators=(",", ":"))
ver = hashlib.md5(roh.encode()).hexdigest()[:8]
open(os.path.join(R, "assets/woerterbuch/suche.json"), "w", encoding="utf-8").write(json.dumps({"v": ver, "l": L, "w": W}, ensure_ascii=False, separators=(",", ":")))
# Version in woerterbuch.js eintragen (für Browser-Cache)
p = os.path.join(R, "assets/woerterbuch.js")
if os.path.exists(p):
    s = open(p, encoding="utf-8").read()
    s = re.sub(r'const VERSION = "[^"]*";', f'const VERSION = "{ver}";', s)
    open(p, "w", encoding="utf-8").write(s)
print(f"{len(W)} Wörter ({n_lek} aus {len(L)} Lektionen, {len(W) - n_lek} aus dem Wörterbuch) · Version {ver} · {os.path.getsize(os.path.join(R, 'assets/woerterbuch/suche.json')) // 1024} KB")
