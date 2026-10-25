/* =========================================================
   Wörterbuch-Suche (Startseite + Wortschatz-Trainer)
   Daten: assets/woerterbuch/suche.json (eine kompakte Datei, gebaut mit
   werkzeuge/woerterbuch-bauen.py). Lektionswörter nur aus offenen Lektionen,
   allgemeines Wörterbuch immer.
   ========================================================= */
(function () {
  "use strict";
  const VERSION = "efa1a597";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const normFa = x => String(x || "").replace(/[ً-ْٰٕٔ]/g, "").replace(/[‌‍]/g, " ").replace(/[آأإ]/g, "ا").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/ة/g, "ه").replace(/\s+/g, " ").trim();
  const normDe = x => String(x || "").toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const normTr = x => String(x || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[ʿʾ'`-]/g, "").replace(/\s+/g, " ").trim();

  let DATEN = null, LADEN = null;
  function laden() {
    if (DATEN) return Promise.resolve(DATEN);
    if (LADEN) return LADEN;
    LADEN = fetch("assets/woerterbuch/suche.json?v=" + VERSION).then(r => { if (!r.ok) throw new Error("Wörterbuch " + r.status); return r.json(); }).then(d => {
      const L = d.l.map(([id, nummer, kurz]) => ({ id, nummer, kurz }));
      const W = d.w.map(([fa, tr, de, kat, li, emoji, stamm, stammTr]) => {
        const w = { fa, tr: tr || "", de, kat: kat || "", lek: li >= 0 ? L[li].id : null, wb: li < 0, emoji: emoji || "", stamm: stamm || "", stammTr: stammTr || "" };
        w._fa = normFa(fa); w._fa2 = w._fa.replace(/ /g, ""); w._de = normDe(de); w._tr = normTr(tr);
        w._kern = String(de).replace(/\(.*?\)/g, "").split(/[\/,;]/).map(normDe).filter(Boolean);
        w._worte = w._de.split(" ");
        return w;
      });
      return (DATEN = { L, W, lek: Object.fromEntries(L.map(l => [l.id, l])) });
    }).catch(e => { LADEN = null; throw e; });
    return LADEN;
  }
  /* offen: Set der offenen Lektions-IDs (null = alle) */
  function suche(q, offen) {
    if (!DATEN) return [];
    q = String(q || "").trim(); if (!q) return [];
    const istFa = /[؀-ۿ]/.test(q), out = [];
    const b = normFa(q), qd = normDe(q), qt = normTr(q);
    for (const w of DATEN.W) {
      if (w.lek && offen && !offen.has(w.lek)) continue;
      let r = -1;
      if (istFa) { const b2 = b.replace(/ /g, ""); if (w._fa === b || w._fa2 === b2) r = 0; else if (w._fa.startsWith(b) || w._fa2.startsWith(b2)) r = 1; else if (w._fa.includes(b) || w._fa2.includes(b2)) r = 2; else if (w.stamm && normFa(w.stamm).replace(/ /g, "").includes(b2)) r = 3; }
      else {
        if (qd && w._kern.some(k => k === qd || k.replace(/^(der|die|das|sich|zu) /, "") === qd)) r = 0;
        else if (qd && w._worte.includes(qd)) r = 1; else if (qd && w._worte.some(x => x.startsWith(qd))) r = 2; else if (qd.length >= 3 && w._de.includes(qd)) r = 3;
        else if (qt.length >= 2 && w._tr && (w._tr === qt || w._tr.startsWith(qt))) r = 2; else if (qt.length >= 3 && w._tr.includes(qt)) r = 3;
      }
      if (r >= 0) out.push([r, w]);
    }
    if (!out.length && !istFa && qd.length >= 4) {   /* Tippfehler: ähnliche deutsche Wörter (1–2 Buchstaben anders) */
      const max = qd.length > 6 ? 2 : 1;
      for (const w of DATEN.W) {
        if (w.lek && offen && !offen.has(w.lek)) continue;
        const d = Math.min(...w._worte.filter(t => Math.abs(t.length - qd.length) <= max).map(t => lev(t, qd, max)), 9);
        if (d <= max) out.push([4 + d + w.de.length / 1000, w]);
      }
    }
    return out.sort((a, c) => a[0] - c[0] || (a[1].wb ? 1 : 0) - (c[1].wb ? 1 : 0) || a[1].fa.length - c[1].fa.length).map(x => x[1]);
  }
  function lev(a, b, max) {
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i]; let best = i;
      for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (cur[j] < best) best = cur[j]; }
      if (best > max) return max + 1; prev = cur;
    }
    return prev[b.length];
  }
  function quelle(w) {
    if (w.wb) return "📖 Wörterbuch";
    const l = DATEN.lek[w.lek]; if (!l) return "";
    return (/^\d+$/.test(l.nummer) ? "L" : "") + esc(l.nummer) + " " + esc(l.kurz);
  }
  function zeile(w) {
    return `<div class="wb-z" data-say="${esc(w.fa)}"><div><div class="de">${w.emoji ? w.emoji + " " : ""}${esc(w.de)}</div><div class="neben">${w.tr ? `<i>${esc(w.tr)}</i> · ` : ""}${quelle(w)}${w.stamm ? ` · Präsensstamm <span class="fa" style="font-size:1rem;color:var(--tuerkis)">${esc(w.stamm)}</span>` : ""}</div></div><div class="fa">${esc(w.fa)}</div></div>`;
  }
  const CSS = `.wb-z{display:grid;grid-template-columns:1fr auto;gap:2px 12px;align-items:center;border-bottom:1px solid var(--linie);padding:8px 2px;cursor:pointer}
    .wb-z:last-child{border-bottom:0}.wb-z .fa{font-size:1.45rem;font-weight:700;color:var(--lapis);text-align:right}
    .wb-z .de{font-weight:700;color:var(--tinte)}.wb-z .neben{font-size:.8rem;color:var(--tinte2)}
    .wb-treffer{margin-top:8px;max-height:60vh;overflow-y:auto}
    .wb-feld{position:relative}.wb-feld input{width:100%;padding-right:36px}
    .wb-feld .wb-x{position:absolute;right:8px;top:50%;transform:translateY(-50%);border:0;background:none;font-size:1.1rem;color:var(--tinte2);cursor:pointer;display:none}`;
  /* UI in ein Element einhängen. opt: { offen: Set|null|() => Set, titel, durchblaettern } */
  function einbauen(el, opt = {}) {
    if (!document.getElementById("wb-css")) { const st = document.createElement("style"); st.id = "wb-css"; st.textContent = CSS; document.head.appendChild(st); }
    el.innerHTML = `${opt.titel === false ? "" : `<h3 style="margin:0 0 8px">${opt.titel || "🔍 Wörterbuch"}</h3>`}
      <div class="wb-feld"><input class="feld" type="text" placeholder="Wort suchen – Deutsch, Persisch oder Umschrift …" autocomplete="off" spellcheck="false" enterkeyhint="search"><button class="wb-x" title="leeren">✕</button></div>
      <div class="klein muted wb-info" style="margin-top:6px">Deutsch ↔ Persisch · auch ohne Vokalzeichen · antippen = vorlesen</div>
      <div class="wb-treffer"></div>`;
    const inp = el.querySelector("input"), box = el.querySelector(".wb-treffer"), x = el.querySelector(".wb-x");
    let kat = null, offen = () => (typeof opt.offen === "function" ? opt.offen() : opt.offen) || null;
    const sprich = t => { if (window.FARSI && window.FARSI.sprich) window.FARSI.sprich(t); };
    function zeichne() {
      const q = inp.value; x.style.display = q ? "block" : "none";
      if (!DATEN) { box.innerHTML = q ? `<p class="muted" style="margin:8px 0">Wörterbuch wird geladen …</p>` : ""; return; }
      let html = "", l = [], max = 40;
      if (!q.trim()) {
        if (opt.durchblaettern === false) { box.innerHTML = ""; return; }
        const o = offen(), alle = DATEN.W.filter(w => !w.lek || !o || o.has(w.lek)), kats = [...new Set(alle.map(w => w.kat).filter(Boolean))];
        html = `<div class="klein muted" style="margin-top:8px">… oder nach Thema durchblättern:</div><div class="wahlreihe" style="margin-top:6px">${kats.map(k => `<button class="tab ${kat === k ? "an" : ""}" data-wbk="${esc(k)}">${esc(k)} <span class="klein">${alle.filter(w => w.kat === k).length}</span></button>`).join("")}</div>`;
        if (kat) { l = alle.filter(w => w.kat === kat).sort((a, b) => a.de.localeCompare(b.de, "de")); max = 3000; }
        else { box.innerHTML = html; verdrahte(); return; }
      } else l = suche(q, offen());
      box.innerHTML = html + (l.length ? l.slice(0, max).map(zeile).join("") + (l.length > max ? `<p class="klein muted">… und ${l.length - max} weitere – bitte genauer suchen.</p>` : "") : `<p class="muted" style="margin:8px 0">Kein Treffer.</p>`);
      verdrahte();
    }
    function verdrahte() {
      box.querySelectorAll("[data-say]").forEach(e => e.onclick = () => sprich(e.dataset.say));
      box.querySelectorAll("[data-wbk]").forEach(b => b.onclick = () => { kat = kat === b.dataset.wbk ? null : b.dataset.wbk; zeichne(); });
    }
    let uhr = null;
    inp.addEventListener("input", () => { clearTimeout(uhr); uhr = setTimeout(zeichne, 120); });
    inp.addEventListener("focus", () => { if (!DATEN) laden().then(zeichne).catch(() => {}); }, { once: true });
    x.onclick = () => { inp.value = ""; zeichne(); inp.focus(); };
    const start = () => laden().then(() => { const n = el.querySelector(".wb-info"); if (n) n.textContent = `${DATEN.W.length.toLocaleString("de-DE")} Wörter · Persisch auch ohne Vokalzeichen · antippen = vorlesen`; zeichne(); }).catch(e => { box.innerHTML = `<p class="muted">Das Wörterbuch konnte nicht geladen werden.</p>`; console.warn(e); });
    /* erst laden, wenn die Seite fertig ist – die Startseite bleibt schnell */
    if (opt.sofort) start(); else (window.requestIdleCallback || (f => setTimeout(f, 800)))(start);
    return { zeichne, input: inp };
  }
  window.WOERTERBUCH = { laden, suche, einbauen, normFa, normDe, get daten() { return DATEN; } };
})();
