/* =========================================================
   Farsi-Lernpfad · core.js
   Firebase (Bereich "farsi"), Codes, Fortschritt, Audio, Helfer
   ========================================================= */
(function () {
  "use strict";

  const CFG = {
    firebaseConfig: {
      apiKey: "AIzaSyCFAW03ZlsoGeXvEoigSBcgVbqRC6oVk80",
      authDomain: "lern-farsi-arash.firebaseapp.com",
      databaseURL: "https://lern-farsi-arash-default-rtdb.firebaseio.com",
      projectId: "lern-farsi-arash",
      storageBucket: "lern-farsi-arash.firebasestorage.app",
      messagingSenderId: "1071747690452",
      appId: "1:1071747690452:web:8cecee038af84e6210f041"
    },
    ROOT: "farsi" /* eigener Bereich – getrennt von der Liga */
  };

  const LS_SESS = "farsi_sitzung_v1";
  const LS_PROG = "farsi_fortschritt_v1";
  const LS_SET = "farsi_einstellungen_v1";

  /* ---------- kleine Helfer ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mischen = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const faZiffern = n => String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const normCode = c => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const mitTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
  const lesen = (k, def) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? def; } catch (e) { return def; } };
  const schreiben = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };

  let toastTimer = null;
  function toast(msg, ms = 3200) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("an");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("an"), ms);
  }

  /* ---------- Firebase ---------- */
  let db = null;
  function initFB() {
    if (db) return db;
    try {
      if (window.firebase) {
        if (!firebase.apps.length) firebase.initializeApp(CFG.firebaseConfig);
        db = firebase.database();
      }
    } catch (e) { console.warn("Firebase nicht verfügbar", e); db = null; }
    return db;
  }
  const ref = p => initFB().ref(CFG.ROOT + (p ? "/" + p : ""));

  /* ---------- Sitzung (Code-Login) ---------- */
  const sitzung = () => lesen(LS_SESS, null);
  const setSitzung = s => { if (s) schreiben(LS_SESS, s); else { try { localStorage.removeItem(LS_SESS); } catch (e) { } } };

  async function anmelden(code) {
    code = normCode(code);
    if (code.length < 4) return { ok: false, grund: "kurz" };
    if (!initFB()) return { ok: false, grund: "offline" };
    try {
      const snap = await mitTimeout(ref("tn/" + code).once("value"), 9000);
      const v = snap.val();
      if (!v) return { ok: false, grund: "unbekannt" };
      if (v.aktiv === false) return { ok: false, grund: "inaktiv" };
      let klassenName = "";
      try { const k = await mitTimeout(ref("klassen/" + v.klasse + "/name").once("value"), 5000); klassenName = k.val() || ""; } catch (e) { }
      const s = { code, name: v.name || "", klasse: v.klasse || "", klassenName };
      setSitzung(s);
      return { ok: true, sitzung: s };
    } catch (e) {
      return { ok: false, grund: "offline" };
    }
  }
  function abmelden() { setSitzung(null); }

  /* ---------- Einstellungen ---------- */
  const einst = () => Object.assign({ ton: true, umschrift: true }, lesen(LS_SET, {}));
  function setEinst(patch) {
    const e = Object.assign(einst(), patch); schreiben(LS_SET, e); anwendenEinst(); return e;
  }
  function anwendenEinst() {
    document.body.classList.toggle("ohne-umschrift", !einst().umschrift);
  }

  /* ---------- Fortschritt ----------
     lokal: { [schluessel]: { [lektion]: { [station]: {p,m,ts} } } }
     Firebase: farsi/fortschritt/{code}/{lektion}/{station} = {p,m,ts}  (bestes Ergebnis) */
  const schluessel = () => { const s = sitzung(); return s ? s.code : "_gast"; };
  function lokalLektion(lek) { const all = lesen(LS_PROG, {}); return ((all[schluessel()] || {})[lek]) || {}; }
  function lokalSetzen(lek, st, e) {
    const all = lesen(LS_PROG, {}); const k = schluessel();
    all[k] = all[k] || {}; all[k][lek] = all[k][lek] || {};
    const alt = all[k][lek][st];
    if (!alt || e.p > alt.p || (e.p === alt.p && e.m !== alt.m)) all[k][lek][st] = e;
    schreiben(LS_PROG, all);
  }

  async function ladeFortschritt(lek) {
    const lok = Object.assign({}, lokalLektion(lek));
    const s = sitzung();
    if (s && initFB()) {
      try {
        const snap = await mitTimeout(ref(`fortschritt/${s.code}/${lek}`).once("value"), 7000);
        const r = snap.val() || {};
        for (const st in r) {
          if (st.startsWith("_")) continue;
          if (!lok[st] || r[st].p > lok[st].p) { lok[st] = r[st]; lokalSetzen(lek, st, r[st]); }
        }
      } catch (e) { /* offline: lokal reicht */ }
    }
    return lok;
  }

  async function ladeAlleFortschritte() { /* für die Startseite */
    const all = lesen(LS_PROG, {}); const lok = JSON.parse(JSON.stringify(all[schluessel()] || {}));
    const s = sitzung();
    if (s && initFB()) {
      try {
        const snap = await mitTimeout(ref(`fortschritt/${s.code}`).once("value"), 7000);
        const r = snap.val() || {};
        for (const lek in r) {
          if (lek.startsWith("_")) continue;
          lok[lek] = lok[lek] || {};
          for (const st in r[lek]) {
            if (st.startsWith("_")) continue;
            if (!lok[lek][st] || r[lek][st].p > lok[lek][st].p) lok[lek][st] = r[lek][st];
          }
        }
      } catch (e) { }
    }
    return lok;
  }

  async function speichereStation(lek, st, p, m) {
    const e = { p, m, ts: Date.now() };
    lokalSetzen(lek, st, e);
    const s = sitzung();
    if (!s || !initFB()) return { online: false };
    try {
      await mitTimeout(ref(`fortschritt/${s.code}/${lek}/${st}`).transaction(cur => {
        if (cur && cur.p >= p) return; /* bestes Ergebnis bleibt */
        return e;
      }), 8000);
      await mitTimeout(ref(`fortschritt/${s.code}/_zuletzt`).set({ lek, st, ts: Date.now() }), 5000);
      return { online: true };
    } catch (err) {
      console.warn(err); return { online: false };
    }
  }

  /* ---------- Freigaben je Klasse ---------- */
  async function ladeFreigaben() {
    const s = sitzung();
    if (!s || !s.klasse || !initFB()) return {};
    try { const snap = await mitTimeout(ref("freigabe/" + s.klasse).once("value"), 6000); return snap.val() || {}; }
    catch (e) { return {}; }
  }
  /* Bereiche (Anfänger, Fortgeschritten 1/2, Konversation): Freigabe unter freigabe/{klasse}/_b_{bereich} */
  function bereichVon(lek, index) {
    const bs = (index && index.bereiche) || [];
    return bs.find(b => b.id === (lek.bereich || (bs[0] && bs[0].id))) || null;
  }
  function istBereichOffen(b, freigaben) {
    if (!b) return true;
    if (freigaben && typeof freigaben["_b_" + b.id] === "boolean") return freigaben["_b_" + b.id];
    return b.standard !== "gesperrt";
  }
  /* Einstufungstest: Lektion mit "testStationen"; andere Lektionen mit "voraussetzung": testId */
  function testStand(test, fortAll) {
    const f = (fortAll || {})[test.id] || {}, ids = test.testStationen || [];
    let p = 0, m = 0, n = 0;
    ids.forEach(id => { const e = f[id]; if (e) { p += e.p; m += e.m; n++; } });
    const grenze = (test.bestehen || 70) / 100, quote = m ? p / m : 0;
    return { p, m, erledigt: n, gesamt: ids.length, quote, prozent: Math.round(quote * 100), grenze: Math.round(grenze * 100),
             bestanden: ids.length > 0 && n === ids.length && quote >= grenze - 1e-9 };
  }
  function sperrGrund(lek, freigaben, index, fortAll) {
    if (index && !istBereichOffen(bereichVon(lek, index), freigaben)) return "bereich";
    if (freigaben && typeof freigaben[lek.id] === "boolean") return freigaben[lek.id] ? null : "lehrkraft";
    if (lek.standard !== "offen") return "lehrkraft";
    if (lek.voraussetzung && index) {
      const t = index.lektionen.find(l => l.id === lek.voraussetzung);
      if (t && !testStand(t, fortAll).bestanden) return "test";
    }
    return null;
  }
  function istOffen(lek, freigaben, index, fortAll) { return !sperrGrund(lek, freigaben, index, fortAll); }

  /* ---------- Audio: eigene MP3 vor Sprachausgabe ---------- */
  let faStimme = null, stimmeGesucht = false, stimmeHinweis = false;
  function sucheStimme() {
    if (!("speechSynthesis" in window)) return null;
    const vs = speechSynthesis.getVoices() || [];
    faStimme = vs.find(v => /^fa(-|_|$)/i.test(v.lang)) || vs.find(v => /persian|farsi|dilara|farid/i.test(v.name)) || null;
    stimmeGesucht = vs.length > 0;
    return faStimme;
  }
  if ("speechSynthesis" in window) { try { speechSynthesis.onvoiceschanged = sucheStimme; sucheStimme(); } catch (e) { } }

  function tts(text) {
    if (!("speechSynthesis" in window)) return keineStimme();
    if (!faStimme) sucheStimme();
    if (!faStimme) return keineStimme();
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.voice = faStimme; u.lang = faStimme.lang; u.rate = 0.8;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch (e) { keineStimme(); }
  }
  function keineStimme() {
    if (stimmeHinweis) return; stimmeHinweis = true;
    toast("Auf diesem Gerät gibt es keine persische Stimme. Mit Microsoft Edge klappt es meist – sonst hilft die Umschrift.", 5200);
  }
  function sprich(text, audio) {
    if (!einst().ton || !text) return;
    if (audio) {
      try { const a = new Audio(audio); a.play().catch(() => tts(text)); return; } catch (e) { }
    }
    tts(text);
  }

  /* kleine Rückmeldetöne */
  let actx = null;
  function ton(art) {
    if (!einst().ton) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain();
      o.connect(g); g.connect(actx.destination);
      const t = actx.currentTime;
      if (art === "ok") { o.frequency.setValueAtTime(660, t); o.frequency.setValueAtTime(880, t + .09); }
      else { o.type = "triangle"; o.frequency.setValueAtTime(220, t); }
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.12, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .25);
      o.start(t); o.stop(t + .26);
    } catch (e) { }
  }

  /* ---------- Daten laden ---------- */
  async function ladeJSON(url) {
    const r = await fetch(url, { cache: "no-cache" });
    if (!r.ok) throw new Error(url + " → " + r.status);
    return r.json();
  }

  /* Lektion + Zusatzpakete (index.json: "zusatz": ["01-zusatz-1.json", …]) */
  async function ladeLektion(eintrag) {
    const L = await ladeJSON("lektionen/" + eintrag.datei);
    L.stationen.forEach(s => { s.zusatz = false; });
    L.pakete = [];
    for (const datei of (eintrag.zusatz || [])) {
      try {
        const P = await ladeJSON("lektionen/" + datei);
        const pid = P.id || datei.replace(/\.json$/, "").replace(/[.#$\[\]\/]/g, "_");
        P.stationen.forEach(s => { s.id = pid + "-" + s.id; s.zusatz = true; s.paketId = pid; s.paketArt = P.art || "zusatz"; L.stationen.push(s); });
        L.pakete.push({ id: pid, art: P.art || "zusatz", titel: P.titel || "Zusatzübungen", beschreibung: P.beschreibung || "", anzahl: P.stationen.length });
      } catch (e) { console.warn("Zusatzpaket nicht geladen:", datei, e); }
    }
    return L;
  }

  /* ---------- Schreibrichtung: Persisch immer rechts-nach-links ----------
     Läuft automatisch auf jeder Seite. Persische Stücke in deutschem Text werden in
     <span class="fa" dir="rtl"> gekapselt; Elemente, die nur persischen Text enthalten,
     bekommen dir="rtl". So stehen Satzzeichen (! ؟ .) und Wortfolge immer richtig. */
  const AR = /[؀-ۿﭐ-﷿ﹰ-﻿]/;
  const LAT = /[A-Za-zÀ-ÿĀ-ž]/;
  const LAUF = /[؀-ۿﭐ-﷿ﹰ-﻿](?:[؀-ۿﭐ-﷿ﹰ-﻿‌‏ً-ٰٟ 0-9۰-۹«»"'()\-–…]*[؀-ۿﭐ-﷿ﹰ-﻿‌])?[؟!.،؛…»]*/g;
  const SKIP = "script,style,textarea,input,select,.fa,[dir=rtl],[data-nobidi],.tr,code";
  function bidiText(node) {
    const t = node.nodeValue;
    if (!AR.test(t)) return;
    const par = node.parentElement;
    if (!par || par.closest(SKIP)) return;
    // ganzes Element nur persisch → Richtung am Element setzen
    if (!LAT.test(par.textContent) && par.children.length === 0) { par.setAttribute("dir", "rtl"); return; }
    const frag = document.createDocumentFragment();
    let last = 0; LAUF.lastIndex = 0; let m;
    while ((m = LAUF.exec(t))) {
      if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
      const sp = document.createElement("span"); sp.className = "fa"; sp.dir = "rtl"; sp.textContent = m[0];
      frag.appendChild(sp); last = m.index + m[0].length;
    }
    if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
    par.replaceChild(frag, node);
  }
  function bidi(root) {
    if (!root || !document.createTreeWalker) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), liste = [];
    while (w.nextNode()) liste.push(w.currentNode);
    liste.forEach(bidiText);
    // reine Persisch-Blöcke (z. B. Buttons, Zeilen mit mehreren Kindern) → rtl
    root.querySelectorAll && root.querySelectorAll("button,li,p,div,td,th,label").forEach(el => {
      if (el.hasAttribute("dir") || el.closest("[data-nobidi]")) return;
      const tx = el.textContent;
      if (tx && AR.test(tx) && !LAT.test(tx) && !el.querySelector("button,input,div,p,li,table")) el.setAttribute("dir", "rtl");
    });
  }
  if (typeof MutationObserver !== "undefined" && typeof document !== "undefined") {
    let geplant = false;
    const lauf = () => { geplant = false; try { bidi(document.body); } catch (e) { console.warn(e); } };
    const plane = () => { if (!geplant) { geplant = true; (window.requestAnimationFrame || setTimeout)(lauf); } };
    const start = () => { lauf(); new MutationObserver(plane).observe(document.body, { childList: true, subtree: true, characterData: true }); };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  }

  window.FARSI = {
    CFG, $, $$, esc, mischen, faZiffern, normCode, toast, mitTimeout,
    initFB, ref, sitzung, anmelden, abmelden,
    einst, setEinst, anwendenEinst,
    ladeFortschritt, ladeAlleFortschritte, speichereStation,
    ladeFreigaben, istOffen, istBereichOffen, bereichVon, testStand, sperrGrund,
    sprich, ton, ladeJSON, ladeLektion, bidi
  };
})();
