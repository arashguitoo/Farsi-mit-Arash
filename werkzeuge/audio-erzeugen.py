#!/usr/bin/env python3
"""Erzeugt MP3s für alle vorgelesenen persischen Texte → assets/audio/<xx>/<hash>.mp3
Aufruf:  pip install edge-tts   ·   python3 werkzeuge/audio-erzeugen.py [max]
Vorhandene Dateien werden übersprungen; verwaiste Dateien werden gelöscht (nur bei vollem Lauf)."""
import asyncio, os, sys, subprocess, tempfile, importlib.util
import edge_tts
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("at", os.path.join(R, "werkzeuge/audio-texte.py")); at = importlib.util.module_from_spec(spec); spec.loader.exec_module(at)
ZIEL = os.path.join(R, "assets/audio")
PROXY = os.environ.get("HTTPS_PROXY") or None
pfad = lambda h: os.path.join(ZIEL, h[:2], h + ".mp3")
async def eins(x, sem, stat):
    f = pfad(x["h"])
    if os.path.exists(f): stat["da"] += 1; return
    stimme, rate, pitch = at.STIMMEN[x["v"]]
    async with sem:
        for v in range(4):
            try:
                tmp = tempfile.mktemp(suffix=".mp3")
                await edge_tts.Communicate(x["t"], stimme, rate=rate, pitch=pitch, proxy=PROXY).save(tmp)
                os.makedirs(os.path.dirname(f), exist_ok=True)
                p = await asyncio.create_subprocess_exec("ffmpeg", "-v", "error", "-y", "-i", tmp, "-ac", "1", "-ar", "22050", "-b:a", "32k", f)
                await p.wait(); os.remove(tmp)
                if os.path.exists(f) and os.path.getsize(f) > 500: stat["neu"] += 1; return
            except Exception as e:
                err = e
            await asyncio.sleep(2 + 3 * v)
        stat["fehler"] += 1; print("FEHLER", x["h"], x["t"][:40], file=sys.stderr)
async def main():
    L = at.sammeln(); voll = len(sys.argv) < 2
    if not voll: L = L[:int(sys.argv[1])]
    sem = asyncio.Semaphore(int(os.environ.get("PARALLEL", "8"))); stat = {"da": 0, "neu": 0, "fehler": 0}
    async def melde():
        while True:
            await asyncio.sleep(60); print(stat, "von", len(L), flush=True)
    m = asyncio.create_task(melde())
    await asyncio.gather(*[eins(x, sem, stat) for x in L]); m.cancel()
    if voll:
        gueltig = {x["h"] for x in L}
        for d in os.listdir(ZIEL):
            for n in os.listdir(os.path.join(ZIEL, d)):
                if n[:-4] not in gueltig: os.remove(os.path.join(ZIEL, d, n)); stat.setdefault("geloescht", 0); stat["geloescht"] += 1
    print("FERTIG", stat, "von", len(L), flush=True)
asyncio.run(main())
