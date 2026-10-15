/* =========================================================
   Gesprächs-Simulation · Spiel-Logik (rein, ohne DOM/Firebase)
   Zustand r (Firebase: live/gespraech/{code}/teams/r):
     knoten, schritt (lesen|sprechen|waehlen|uebersetzen|ende),
     akteur, prompter, kette[], ki, wahl, falsch{}, versuch, hilfe, zeigen,
     zug, verlauf[], wahlen{knoten:{pid:opt}}, punkte{pid:n}, weg[]
   ========================================================= */
(function (root) {
  "use strict";
  const ARTEN = {
    ja: { de: "Ja", fa: "آره", ico: "👍" },
    nein: { de: "Nein", fa: "نه", ico: "👎" },
    vielleicht: { de: "Vielleicht", fa: "شاید", ico: "🤔" }
  };
  const PUNKTE = { 1: [10, 5, 2], 2: [15, 8, 4], 3: [20, 10, 10] };

  const kopie = o => JSON.parse(JSON.stringify(o || {}));
  const arr = a => Array.isArray(a) ? a.filter(x => x != null) : a && typeof a === "object" ? Object.keys(a).sort((x, y) => x - y).map(k => a[k]).filter(x => x != null) : [];

  /* Reihenfolge der aktiven Spieler */
  function reihe(spieler) {
    return Object.entries(spieler || {}).filter(([, s]) => s && !s.aus)
      .sort(([, a], [, b]) => ((a.reihe ?? 999) - (b.reihe ?? 999)) || ((a.ts || 0) - (b.ts || 0))).map(([id]) => id);
  }
  function aktive(r, spieler) {
    const alle = reihe(spieler), weg = new Set(arr(r.weg));
    const da = alle.filter(id => !weg.has(id));
    return da.length >= 2 ? da : alle;
  }
  function naechster(r, spieler, ohne) {
    const liste = aktive(r, spieler), aus = new Set(ohne || []);
    if (!liste.length) return null;
    for (let i = 0; i < liste.length; i++) {
      const id = liste[(r.zug || 0) % liste.length];
      r.zug = (r.zug || 0) + 1;
      if (!aus.has(id) || liste.length <= aus.size) return id;
    }
    return liste[0];
  }

  /* Namen & Platzhalter */
  const nameDe = (spieler, id) => ((spieler || {})[id] || {}).name || "?";
  const nameFa = (spieler, id) => { const s = (spieler || {})[id] || {}; return s.nameFa || s.name || "?"; };
  function liste(namen, sprache) {
    if (namen.length <= 1) return namen.join("");
    return sprache === "fa" ? namen.slice(0, -1).join("، ") + " و " + namen[namen.length - 1]
      : namen.slice(0, -1).join(", ") + " und " + namen[namen.length - 1];
  }
  const ohneVokale = t => String(t || "").replace(/[\u064B-\u0652\u0670]/g, "");
  function fuelle(text, sprache, ctx) {
    const nm = id => sprache === "fa" ? nameFa(ctx.spieler, id) : nameDe(ctx.spieler, id);
    const fertig = t => sprache === "fa" && ctx.ohneVokale ? ohneVokale(t) : t;
    return fertig(String(text || "")
      .replace(/\{alle\}/g, liste((ctx.alle || []).map(nm), sprache))
      .replace(/\{S\}/g, ctx.s ? nm(ctx.s) : "")
      .replace(/\{namen\}/g, liste((ctx.namen || []).map(nm), sprache)));
  }
  /* Zusatz-Sätze einer Szene (abhängig von früheren Entscheidungen) */
  function zusaetze(K, r, spieler, sprache, ohneV) {
    return (K.zusatz || []).map(z => {
      const [kn, opt] = z.wenn.split(":"), w = ((r.wahlen || {})[kn]) || {};
      const namen = reihe(spieler).filter(id => w[id] === opt);
      if (!namen.length) return null;
      const t = sprache === "fa" ? (namen.length > 1 ? z.faN : z.fa1) : (namen.length > 1 ? z.deN : z.de1);
      return fuelle(t, sprache, { spieler, namen, ohneVokale: ohneV });
    }).filter(Boolean);
  }

  /* Knoten betreten */
  function betrete(r, S, spieler, id) {
    const K = S.knoten[id];
    if (!K) throw new Error("Knoten fehlt: " + id);
    Object.assign(r, { knoten: id, kette: null, ki: 0, wahl: null, falsch: null, versuch: 0, hilfe: null, zeigen: null, akteur: null });
    if (K.zurueck) r.weg = null;
    if (K.abwesend) {
      const ids = new Set();
      K.abwesend.forEach(w => { const [kn, opt] = w.split(":"); Object.entries(((r.wahlen || {})[kn]) || {}).forEach(([pid, o]) => { if (o === opt) ids.add(pid); }); });
      const rest = reihe(spieler).filter(x => !ids.has(x));
      r.weg = rest.length >= 2 ? [...ids] : null;
    }
    if (K.typ === "szene") {
      r.verlauf = arr(r.verlauf).concat([{ t: "szene", k: id, ts: Date.now() }]);
      r.akteur = K.vorlesen === false ? null : naechster(r, spieler);
      r.schritt = "lesen";
    } else if (K.typ === "ende") {
      r.verlauf = arr(r.verlauf).concat([{ t: "szene", k: id, ts: Date.now() }]);
      r.schritt = "ende";
    } else {
      r.akteur = naechster(r, spieler);
      r.prompter = r.akteur;
      r.schritt = "sprechen";
    }
    return r;
  }
  function start(S, spieler) {
    return betrete({ zug: 0, verlauf: [], wahlen: {}, punkte: {} }, S, spieler, S.start);
  }

  /* Entscheidung nach Mehrheit */
  function entscheide(K, antw) {
    const reih = Object.values(antw), opt = id => K.optionen.find(o => o.id === id);
    const zahl = {}, erst = {};
    reih.forEach((id, i) => { const a = opt(id).art; zahl[a] = (zahl[a] || 0) + 1; if (erst[a] == null) erst[a] = i; });
    let sieger = Object.keys(zahl).sort((a, b) => (zahl[b] - zahl[a]) || (erst[a] - erst[b]))[0];
    if (zahl.ja != null && zahl.nein != null && zahl.ja === zahl.nein && zahl[sieger] === zahl.ja) sieger = "ja";
    if (sieger === "vielleicht" && (zahl.ja || 0) === (zahl.vielleicht || 0) && zahl.ja) sieger = "ja";
    const kand = reih.map(opt).filter(o => o.art === sieger).sort((a, b) => (b.prio || 0) - (a.prio || 0));
    const o = kand[0];
    const ziel = (K.ziele || {})[o.id] || o.ziel || (typeof K.weiter === "string" ? K.weiter : K.weiter[sieger]) ||
      (typeof K.weiter === "object" ? Object.values(K.weiter)[0] : null);
    return { art: sieger, opt: o.id, ziel };
  }

  /* Aktionen ------------------------------------------------------------ */
  function gelesen(r, S, spieler) {
    const K = S.knoten[r.knoten];
    if (r.schritt !== "lesen") return r;
    return betrete(r, S, spieler, K.weiter);
  }
  function waehle(r, S, optId) {
    if (r.schritt !== "waehlen") return r;
    Object.assign(r, { wahl: optId, schritt: "uebersetzen", falsch: null, versuch: 0, hilfe: null, zeigen: null });
    return r;
  }
  function falschVersuch(r, idx) {
    r.versuch = (r.versuch || 0) + 1;
    if (idx != null) { r.falsch = r.falsch || {}; r.falsch[idx] = true; }
    return r;
  }
  function punkteFuer(stufe, r) {
    const p = PUNKTE[stufe] || PUNKTE[1];
    if (stufe === 3) return r.hilfe || r.zeigen ? p[1] : p[0];
    return p[Math.min(r.versuch || 0, 2)];
  }
  /* Übersetzung war richtig (Auswahl, Bausteine oder Lehrkraft-✓) */
  function richtig(r, S, spieler, punkte) {
    const K = S.knoten[r.knoten];
    if (r.schritt !== "sprechen" && r.schritt !== "uebersetzen") return r;
    const wer = r.akteur;
    r.punkte = r.punkte || {};
    if (punkte) r.punkte[wer] = (r.punkte[wer] || 0) + punkte;
    if (r.schritt === "sprechen") {
      r.verlauf = arr(r.verlauf).concat([{ t: "rede", k: r.knoten, p: wer, ts: Date.now() }]);
      if (!K.optionen || !K.optionen.length) return betrete(r, S, spieler, K.weiter);
      const verf = aktive(r, spieler).filter(x => x !== r.prompter);
      const n = Math.min(K.antworten === "alle" ? verf.length : Math.min(K.antworten || 1, Math.max(1, verf.length)), r.maxAntw || 99);
      const kette = [];
      for (let i = 0; i < n && verf.length; i++) { const id = naechster(r, spieler, [r.prompter, ...kette]); if (id && !kette.includes(id) && id !== r.prompter) kette.push(id); }
      if (!kette.length) kette.push(r.prompter);
      Object.assign(r, { kette, ki: 0, akteur: kette[0], schritt: "waehlen", wahl: null, falsch: null, versuch: 0, hilfe: null, zeigen: null, antw: null });
      return r;
    }
    /* Antwort übersetzt */
    r.verlauf = arr(r.verlauf).concat([{ t: "rede", k: r.knoten, p: wer, o: r.wahl, s: r.prompter, ts: Date.now() }]);
    r.antw = r.antw || {}; r.antw[wer] = r.wahl;
    r.wahlen = r.wahlen || {}; r.wahlen[r.knoten] = Object.assign({}, r.wahlen[r.knoten] || {}, { [wer]: r.wahl });
    const kette = arr(r.kette);
    if ((r.ki || 0) + 1 < kette.length) {
      Object.assign(r, { ki: (r.ki || 0) + 1, akteur: kette[(r.ki || 0) + 1], schritt: "waehlen", wahl: null, falsch: null, versuch: 0, hilfe: null, zeigen: null });
      return r;
    }
    const e = entscheide(K, r.antw);
    r.verlauf = r.verlauf.concat([{ t: "entscheid", k: r.knoten, art: e.art, o: e.opt, ts: Date.now() }]);
    r.antw = null;
    return betrete(r, S, spieler, e.ziel);
  }

  /* Hilfsfunktionen für Anzeige */
  function satz(S, r, eintrag) {
    const K = S.knoten[eintrag ? eintrag.k : r.knoten];
    if (!K) return null;
    const oid = eintrag ? eintrag.o : (r.schritt === "uebersetzen" ? r.wahl : null);
    if (oid) { const o = K.optionen.find(x => x.id === oid); return o ? { de: o.de, fa: o.fa, um: o.um, art: o.art, label: o.label } : null; }
    return { de: K.de, fa: K.fa, um: K.um };
  }
  function bausteine(text) { return String(text).split(/\s+/).filter(Boolean); }
  function mischStabil(a, seed) {
    a = a.slice(); let x = (seed * 9301 + 49297) % 233280;
    for (let i = a.length - 1; i > 0; i--) { x = (x * 9301 + 49297) % 233280; const j = Math.floor(x / 233280 * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const hash = s => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 100003; return h; };

  /* Prüft ein Szenario (für Werkzeuge/Tests) */
  function pruefe(S) {
    const fehler = [], ids = Object.keys(S.knoten);
    if (!S.knoten[S.start]) fehler.push("Start fehlt");
    const ziel = (k, z) => { if (z && !S.knoten[z]) fehler.push(`${k}: Ziel ${z} fehlt`); };
    ids.forEach(k => {
      const K = S.knoten[k];
      if (!K.de || !K.fa) fehler.push(k + ": de/fa fehlt");
      if (K.typ === "szene") ziel(k, K.weiter);
      if (K.typ === "rede") {
        if (!Array.isArray(K.fa) || K.fa.length !== 4 || new Set(K.fa).size !== 4) fehler.push(k + ": fa braucht 4 verschiedene Sätze");
        if (K.optionen) {
          K.optionen.forEach(o => {
            if (!Array.isArray(o.fa) || o.fa.length !== 4 || new Set(o.fa).size !== 4) fehler.push(`${k}/${o.id}: fa braucht 4 verschiedene Sätze`);
            if (!ARTEN[o.art] && !o.label) fehler.push(`${k}/${o.id}: label fehlt`);
          });
          const arten = [...new Set(K.optionen.map(o => o.art))];
          if (typeof K.weiter === "string") ziel(k, K.weiter);
          else arten.forEach(a => { if (!(K.weiter || {})[a] && !K.optionen.filter(o => o.art === a).every(o => o.ziel || (K.ziele || {})[o.id])) fehler.push(`${k}: weiter.${a} fehlt`); else ziel(k, (K.weiter || {})[a]); });
          Object.values(K.ziele || {}).forEach(z => ziel(k, z));
        } else ziel(k, K.weiter);
      }
      (K.zusatz || []).forEach(z => { const [kn, opt] = z.wenn.split(":"); if (!S.knoten[kn] || !(S.knoten[kn].optionen || []).some(o => o.id === opt)) fehler.push(`${k}: zusatz ${z.wenn} ungültig`); });
    });
    /* Erreichbarkeit */
    const gesehen = new Set(), stapel = [S.start];
    while (stapel.length) {
      const k = stapel.pop(); if (gesehen.has(k) || !S.knoten[k]) continue; gesehen.add(k);
      const K = S.knoten[k];
      [K.weiter, ...(typeof K.weiter === "object" && K.weiter ? Object.values(K.weiter) : []), ...Object.values(K.ziele || {}), ...(K.optionen || []).map(o => o.ziel)]
        .forEach(z => { if (typeof z === "string") stapel.push(z); });
    }
    ids.filter(k => !gesehen.has(k)).forEach(k => fehler.push(k + ": nicht erreichbar"));
    if (!ids.some(k => S.knoten[k].typ === "ende")) fehler.push("kein Ende");
    return fehler;
  }

  const E = { ARTEN, PUNKTE, reihe, aktive, start, betrete, gelesen, waehle, falschVersuch, richtig, punkteFuer, entscheide,
    satz, fuelle, zusaetze, ohneVokale, liste, nameDe, nameFa, bausteine, mischStabil, hash, kopie, arr, pruefe };
  if (typeof module !== "undefined" && module.exports) module.exports = E;
  root.GESPRAECH_ENGINE = E;
})(typeof window !== "undefined" ? window : globalThis);
