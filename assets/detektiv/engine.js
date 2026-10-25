/* =========================================================
   Detektiv-Spiel – reine Logik (auch für Tests)
   - verteile(): Personen reihum auf die Spieler aufteilen
   - fragenStatus(): welche Fragen offen / gesperrt / gestellt sind
   - kandidaten() / nachschlagen(): angetipptes Wort → Grundform im Wörterbuch
   ========================================================= */
window.DETEKTIV_ENGINE = (function () {
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : Object.keys(v || {}).sort((a, b) => a - b).map(k => v[k]).filter(Boolean);
  const reihe = sp => Object.entries(sp || {}).filter(([, s]) => s && s.name).sort(([, a], [, b]) => (a.ts || 0) - (b.ts || 0)).map(([id]) => id);

  /* Personen reihum verteilen (1 Spieler → alle; 3 Spieler → 2/2/1) */
  function verteile(fall, spielerIds) {
    const v = {}; if (!spielerIds.length) return v;
    fall.personen.forEach((p, i) => { v[p.id] = spielerIds[i % spielerIds.length]; });
    return v;
  }
  const hat = (f, id) => !!(f && f.hinweise && f.hinweise[id]);
  /* Hat schon jemand der Person bei ihrer Bitte geholfen? */
  const brauchtNichtMehr = (p, f) => !!(f && f.geholfen && f.geholfen[p.id]);
  /* Status jeder Frage einer Person */
  function fragenStatus(person, f) {
    const gel = (f && f.gelesen) || {};
    const geholfen = !person.bitte || brauchtNichtMehr(person, f);
    return person.fragen.map(q => ({ q, gestellt: !!gel[person.id + "_" + q.id], frei: geholfen && (q.braucht || []).every(h => hat(f, h)) }));
  }
  /* Alle Hinweise, die in gestellten Antworten stecken, aber noch nicht notiert sind */
  function offeneNotizen(fall, f) {
    const out = [];
    fall.personen.forEach(p => p.fragen.forEach(q => { if (q.hinweis && f && f.gelesen && f.gelesen[p.id + "_" + q.id] && !hat(f, q.hinweis)) out.push({ p, q }); }));
    return out;
  }
  function fortschritt(fall, f) {
    const alleH = Object.keys(fall.hinweise), n = alleH.filter(h => hat(f, h)).length;
    const fr = fall.personen.reduce((s, p) => s + p.fragen.length, 0), g = Object.keys((f && f.gelesen) || {}).length;
    const bit = fall.personen.filter(p => p.bitte), hb = bit.filter(p => brauchtNichtMehr(p, f)).length;
    return { hinweise: n, hinweiseMax: alleH.length, fragen: g, fragenMax: fr, hilfe: hb, hilfeMax: bit.length };
  }
  function pruefeAnklage(fall, wahl) {
    let n = 0; fall.anklage.forEach(a => { if (+wahl[a.id] === a.r) n++; });
    return { richtig: n, von: fall.anklage.length, ok: n === fall.anklage.length };
  }
  /* Neue Fragen, die frei, aber noch nicht gestellt sind – pro Person */
  function neueFragen(fall, f) {
    const o = {}; fall.personen.forEach(p => { o[p.id] = fragenStatus(p, f).filter(x => x.frei && !x.gestellt).length; }); return o;
  }

  /* ---------- Wort nachschlagen ---------- */
  const strip = s => String(s || "").replace(/[ً-ْٰٕٔ]/g, "").replace(/[آأإ]/g, "ا").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[«»"“”„.,،؛;:!?؟…–()]/g, "").trim();
  const VOR = ["نمی", "می", "ن", "ب"];
  const NACH = ["هایشان", "هایمان", "هایتان", "هایم", "هایت", "هایش", "های", "ها", "شان", "مان", "تان", "اند", "ام", "ای", "ایم", "اید", "است", "یم", "ید", "ند", "م", "ت", "ش", "د", "ی", "ه"];
  function kandidaten(tok) {
    const t = strip(tok); if (!t) return [];
    const teile = t.split(/[\u200c\s]+/).filter(Boolean);
    const out = new Set([teile.join(" ")]);           /* genau so (mit Leerzeichen/ZWNJ) */
    const basis = [];
    if (teile.length > 1) {
      if (/^(ن?می)$/.test(teile[0])) basis.push(teile.slice(1).join(""));
      else if (/^(بر|در|فرا|باز)(ن?می)$/.test(teile[0])) basis.push(teile[0].replace(/ن?می$/, "") + teile.slice(1).join(""));
      else basis.push(teile.join(""));
      if (/^(ها|های|هایم|هایت|هایش|هایمان|هایتان|هایشان|ی|ای|ام|ات|اش|مان|تان|شان|اند|ایم|اید|است)$/.test(teile[teile.length - 1])) basis.push(teile.slice(0, -1).join(""));
      basis.push(teile[0]);
    } else basis.push(t);
    const add = x => { if (x && x.length >= 2) out.add(x); };
    basis.forEach(b => {
      out.add(b);
      const v = [b]; if (/^[نب]یا/.test(b)) v.push("آ" + b.slice(3)); VOR.forEach(p => { if (b.startsWith(p) && b.length - p.length >= 2) v.push(b.slice(p.length)); });
      v.forEach(x => {
        add(x); add(x + "ن");
        NACH.forEach(s => { if (x.endsWith(s) && x.length - s.length >= 2) { const y = x.slice(0, -s.length); if (!y.endsWith("ی")) add(y + "ن"); else if (y.length === 2) out.add(y[0]); add(y); if (s === "ه") add(y + "دن"); } });
      });
    });
    return [...out];
  }
  /* W = WOERTERBUCH.daten.W (mit _fa / _fa2) → beste Treffer */
  function nachschlagen(tok, W, normFa, max = 4) {
    const k = kandidaten(tok); if (!k.length || !W) return [];
    const rang = new Map(); k.forEach((x, i) => { const n = normFa(x).replace(/ /g, ""); if (!rang.has(n)) rang.set(n, i); });
    const tr = [];
    W.forEach(w => {
      let r = rang.get(w._fa2);
      if (r === undefined && w.stamm) { const s = normFa(w.stamm).replace(/ /g, ""); const rs = rang.get(s); if (rs !== undefined) r = rs + 0.5; }
      if (r !== undefined) tr.push([r, w]);
    });
    const seen = new Set();
    tr.sort((a, b) => a[0] - b[0] || (a[1].wb ? 1 : 0) - (b[1].wb ? 1 : 0));
    const best = tr.length ? tr[0][0] : 0;
    return tr.filter(x => x[0] <= best + 8).map(x => x[1]).filter(w => { const key = w._fa + "|" + w.de; if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, max);
  }
  /* Persischen Satz in antippbare Wörter zerlegen (Leerzeichen trennen, ZWNJ bleibt im Wort) */
  const woerter = s => String(s || "").split(/\s+/).filter(Boolean);

  /* feste, nicht-identische Mischung (gleich auf allen Geräten) */
  function mischIdx(n, seedStr) {
    let x = 7; for (const c of String(seedStr)) x = (x * 31 + c.charCodeAt(0)) % 233280;
    const a = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) { x = (x * 9301 + 49297) % 233280; const j = Math.floor(x / 233280 * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (n > 1 && a.every((v, i) => v === i)) a.push(a.shift());
    return a;
  }
  return { mischIdx, brauchtNichtMehr, arr, reihe, verteile, fragenStatus, offeneNotizen, fortschritt, pruefeAnklage, neueFragen, kandidaten, nachschlagen, woerter, strip };
})();
