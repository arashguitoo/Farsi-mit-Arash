#!/usr/bin/env python3
"""Erzeugt MP3s für den Detektiv-Fall mit edge-tts (Microsoft-Stimmen wie in Edge).
Aufruf: python3 werkzeuge/detektiv-audio.py   (braucht: pip install edge-tts; Zugriff auf speech.platform.bing.com)
Vorhandene Dateien werden übersprungen."""
import asyncio, json, os, subprocess, sys
import edge_tts
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZIEL = os.path.join(ROOT, "assets/detektiv/audio")
PROXY = os.environ.get("HTTPS_PROXY") or None
texte = json.loads(subprocess.check_output(["node", os.path.join(ROOT, "werkzeuge/detektiv-texte.js")]))
os.makedirs(ZIEL, exist_ok=True)
sem = asyncio.Semaphore(4)
async def eins(x):
    f = os.path.join(ZIEL, x["h"] + ".mp3")
    if os.path.exists(f) and os.path.getsize(f) > 1000: return "da"
    async with sem:
        for v in range(3):
            try:
                c = edge_tts.Communicate(x["t"], x["v"], rate="-10%", proxy=PROXY)
                await c.save(f)
                if os.path.getsize(f) > 1000: return "neu"
            except Exception as e:
                err = e
            await asyncio.sleep(1 + v)
        print("FEHLER", x["t"][:40], err, file=sys.stderr); return "fehler"
async def main():
    r = await asyncio.gather(*[eins(x) for x in texte])
    print({k: r.count(k) for k in set(r)}, "von", len(texte))
asyncio.run(main())
