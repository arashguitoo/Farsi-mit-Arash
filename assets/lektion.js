/* =========================================================
   Farsi-Lernpfad · Lektions-Engine
   Lädt lektionen/<datei>.json und spielt Stationen mit Karten ab.
   Kartentypen: info, buchstaben, paare, wahl, bauen, sortieren, finden, lesen
   ========================================================= */
(function () {
  "use strict";
  const F = window.FARSI;
  const { $, $$, esc, mischen, sprich, ton, toast } = F;
  const ZWJ = "‍";

  let LEK = null;          // Lektionsdaten
  let FORT = {};           // Fortschritt {stationId:{p,m}}
  let aktSt = -1;          // aktuelle Station
  let aktK = 0;            // aktuelle Karte
  let summe = { p: 0, m: 0 };

  /* ---------- Bausteine ---------- */
  const say = (fa, audio) => `data-say="${esc(fa)}"${audio ? ` data-audio="${esc(audio)}"` : ""}`;
  const hoer = (fa, audio) => `<button class="hoer" ${say(fa, audio)} aria-label="anhören">🔊</button>`;
  function bindeSprechen(el) {
    $$("[data-say]", el).forEach(b => b.addEventListener("click", ev => { ev.stopPropagation(); sprich(b.dataset.say, b.dataset.audio); }));
  }
  function formen(L, verbindet) {
    return verbindet ? [L, L + ZWJ, ZWJ + L + ZWJ, ZWJ + L] : [L, L, ZWJ + L, ZWJ + L];
  }
  const FORM_LABEL = ["allein", "am Anfang", "in der Mitte", "am Ende"];
  const ohneVokale = t => String(t || "").replace(/[\u064B-\u0652]/g, "");
  let aufraeumen = [];
  const raeumeAuf = () => { aufraeumen.forEach(f => { try { f(); } catch (e) { } }); aufraeumen = []; };

  function beispiele(list) {
    if (!list || !list.length) return "";
    return `<div class="bsp-gitter">${list.map(b => `
      <div class="bsp" ${say(b.say || b.fa, b.audio)}>
        ${b.emoji ? `<div class="emo">${b.emoji}</div>` : ""}
        <div class="fa">${esc(b.fa)}</div>
        ${b.tr ? `<div class="tr us">${esc(b.tr)}</div>` : ""}
        ${b.de ? `<div class="de klein">${esc(b.de)}</div>` : ""}
      </div>`).join("")}</div>`;
  }

  /* ---------- Renderer ---------- */
  const R = {};

  R.info = (k, el, fertig) => {
    el.innerHTML = `<div class="karte k-info ${k.stil || ""}">
      ${k.stil === "merke" ? `<div class="badge">Merke</div>` : ""}
      ${k.titel ? `<h2>${k.titel}</h2>` : ""}
      <div class="txt">${k.text || ""}</div>
      ${beispiele(k.beispiele)}
    </div>`;
    bindeSprechen(el); fertig(0, 0);
  };

  R.buchstaben = (k, el, fertig) => {
    const eintraege = k.buchstaben.map(b => {
      if (b.typ === "vokal") {
        return `<div class="bst-eintrag">
          <button class="bst-gross" ${say(b.nameFa || b.fa)} aria-label="${esc(b.name)}">${esc(b.fa)}</button>
          <div class="bst-info">
            <h3>${esc(b.name)} <span class="tr">– ${esc(b.laut)}</span></h3>
            <div class="klein">${b.hinweis || ""}</div>
            <div class="formen">${(b.traeger || []).map(t => `<div class="form" ${say(t.fa)}><div class="g">${esc(t.fa)}</div><div class="l">${esc(t.tr)}</div></div>`).join("")}</div>
          </div></div>`;
      }
      const f = formen(b.fa, b.verbindet !== false);
      return `<div class="bst-eintrag">
        <button class="bst-gross ${b.verbindet === false ? "nv" : ""}" ${say(b.nameFa || b.fa)} aria-label="${esc(b.name)}">${esc(b.fa)}</button>
        <div class="bst-info">
          <h3>${esc(b.name)} <span class="fa" style="color:var(--lapis)">${esc(b.nameFa || "")}</span> <span class="tr">– ${esc(b.laut)}</span></h3>
          ${b.hinweis ? `<div class="klein">${b.hinweis}</div>` : ""}
          ${b.verbindet === false ? `<span class="nv-hinweis">verbindet sich nicht nach links</span>` : ""}
          <div class="formen">${f.map((g, i) => `<div class="form"><div class="g">${g}</div><div class="l">${FORM_LABEL[i]}</div></div>`).join("")}</div>
          ${b.beispiel ? `<div style="margin-top:8px">Beispiel: <span class="fa" style="font-size:1.5rem;font-weight:700">${esc(b.beispiel.fa)}</span> <span class="tr us">${esc(b.beispiel.tr)}</span> <span class="de">${esc(b.beispiel.de || "")}</span> ${hoer(b.beispiel.fa, b.beispiel.audio)}</div>` : ""}
        </div></div>`;
    }).join("");
    el.innerHTML = `<div class="karte">
      ${k.titel ? `<h2 style="margin-top:0">${k.titel}</h2>` : ""}
      ${k.text ? `<p>${k.text}</p>` : ""}
      <p class="klein muted">Tippe auf einen Buchstaben, um seinen Namen zu hören. Die Formen stehen von rechts nach links: allein – am Anfang – in der Mitte – am Ende.</p>
      <div class="bst">${eintraege}</div></div>`;
    bindeSprechen(el); fertig(0, 0);
  };

  R.paare = (k, el, fertig) => {
    const n = k.paare.length;
    const links = k.links || "de"; // was gegenüber dem Persischen steht: de | tr | emoji
    const txt = p => links === "x" ? `<span class="fa">${esc(p.x)}</span>` : links === "tr" ? `<span class="tr">${esc(p.tr)}</span>`
      : links === "emoji" ? `<span class="emo">${p.emoji || ""}</span>`
        : `${p.emoji ? `<span class="emo">${p.emoji}</span>` : ""}<span>${esc(p.de)}</span>`;
    const faSeite = mischen(k.paare.map((p, i) => ({ p, i })));
    const xSeite = mischen(k.paare.map((p, i) => ({ p, i })));
    el.innerHTML = `<div class="karte">
      <h2 style="margin-top:0">${k.titel || "Finde die Paare"}</h2>
      <p class="muted klein" style="margin-top:0">${k.text || "Tippe links und rechts auf zwei Karten, die zusammengehören."}</p>
      <div class="paare">
        <div class="spalte">${xSeite.map(o => `<button class="p-btn" data-s="x" data-i="${o.i}">${txt(o.p)}</button>`).join("")}</div>
        <div class="spalte">${faSeite.map(o => `<button class="p-btn" data-s="fa" data-i="${o.i}"><span class="fa">${esc(o.p.fa)}</span></button>`).join("")}</div>
      </div>
      <div class="zaehler" style="margin-top:12px" id="pz"></div></div>`;
    let sel = { fa: null, x: null }, fehler = 0, gefunden = 0;
    const zaehl = () => $("#pz", el).textContent = `${gefunden} von ${n} Paaren gefunden`;
    zaehl();
    $$(".p-btn", el).forEach(b => b.addEventListener("click", () => {
      if (b.classList.contains("ok")) return;
      const s = b.dataset.s;
      if (sel[s]) sel[s].classList.remove("sel");
      sel[s] = b; b.classList.add("sel");
      if (s === "fa") sprich(k.paare[+b.dataset.i].say || k.paare[+b.dataset.i].fa, k.paare[+b.dataset.i].audio);
      if (sel.fa && sel.x) {
        const a = sel.fa, c = sel.x; sel = { fa: null, x: null };
        if (a.dataset.i === c.dataset.i) {
          [a, c].forEach(e => { e.classList.remove("sel"); e.classList.add("ok"); e.disabled = true; });
          gefunden++; ton("ok"); zaehl();
          if (gefunden === n) fertig(Math.max(0, n - fehler), n);
        } else {
          fehler++; ton("falsch");
          [a, c].forEach(e => { e.classList.remove("sel"); e.classList.add("falsch"); setTimeout(() => e.classList.remove("falsch"), 450); });
        }
      }
    }));
  };

  R.wahl = (k, el, fertig) => {
    const fragen = k.mischen === false ? k.fragen : k.fragen;
    let i = 0, p = 0;
    function zeige() {
      const f = fragen[i];
      let ersterVersuch = true;
      const reihenfolge = f.fest ? f.optionen.map((o, j) => j) : mischen(f.optionen.map((o, j) => j));
      el.innerHTML = `<div class="karte">
        ${k.titel ? `<h2 style="margin-top:0">${k.titel}</h2>` : ""}
        <div class="zaehler">Frage ${i + 1} von ${fragen.length}</div>
        <div class="frage">
          ${f.emoji ? `<div class="emo">${f.emoji}</div>` : ""}
          ${f.fa ? `<div class="fa-gross ${f.fa.length > 14 ? "satz" : ""}">${esc(f.fa)} ${f.hoeren === false ? "" : hoer(f.say || f.fa, f.audio)}</div>` : ""}
          <div style="font-weight:800;font-size:1.1rem">${f.frage}</div>
        </div>
        <div class="optionen">${reihenfolge.map(j => `<button class="opt ${f.optFa ? "fa" : ""}" data-j="${j}">${/<[a-z]/i.test(f.optionen[j]) ? f.optionen[j] : esc(f.optionen[j])}</button>`).join("")}</div>
        <div id="erkl"></div>
        <div class="btnreihe" style="justify-content:flex-end;margin-top:12px"><button class="btn safran versteckt" id="naechste">Nächste Frage →</button></div>
      </div>`;
      bindeSprechen(el);
      $$(".opt", el).forEach(b => b.addEventListener("click", () => {
        const j = +b.dataset.j;
        if (j === f.richtig) {
          b.classList.add("ok"); ton("ok");
          if (ersterVersuch) p++;
          $$(".opt", el).forEach(o => o.disabled = true);
          if (f.erkl) { $("#erkl", el).innerHTML = `<div class="erkl">${f.erkl}</div>`; bindeSprechen($("#erkl", el)); }
          if (f.fa && f.sprichNachher !== false && f.optFa) sprich(f.optionen[j].replace(/<[^>]+>/g, ""));
          if (i < fragen.length - 1) { const n = $("#naechste", el); n.classList.remove("versteckt"); n.onclick = () => { i++; zeige(); }; n.focus(); }
          else fertig(p, fragen.length);
        } else {
          ersterVersuch = false; ton("falsch");
          b.classList.add("falsch"); b.disabled = true;
        }
      }));
    }
    zeige();
  };

  R.bauen = (k, el, fertig) => {
    let i = 0, p = 0;
    function zeige() {
      const w = k.woerter[i];
      const kacheln = mischen(w.teile.concat(w.extra || []).map((t, j) => ({ t, j })));
      let gebaut = [], ersterVersuch = true, gesperrt = false;
      el.innerHTML = `<div class="karte">
        <h2 style="margin-top:0">${k.titel || (k.zeigen ? "Schreib das Wort ab" : "Baue das Wort")}</h2>
        <div class="zaehler">${k.trenner ? "Satz" : "Wort"} ${i + 1} von ${k.woerter.length}</div>
        <div class="bau-ziel">
          ${w.emoji ? `<div class="emo">${w.emoji}</div>` : ""}
          ${k.zeigen
            ? `<div class="fa" style="font-size:2.8rem;font-weight:700;color:var(--tinte);line-height:1.6">${esc(ohneVokale(w.fa))}</div><div class="de klein">${esc(w.de || "")} · Aus welchen Buchstaben besteht das Wort?</div>`
            : k.trenner && !k.mitUmschrift
              ? `<div style="font-size:1.25rem;font-weight:800">${esc(w.de)}</div>`
              : `<div><span class="tr" style="font-size:1.3rem">${esc(w.tr)}</span> · <span class="de">${esc(w.de)}</span></div>`}
        </div>
        <div class="bau-anzeige" id="anz"><div class="wort" id="wort"></div></div>
        <div class="einzeln" id="einz"></div>
        <div class="kacheln">${kacheln.map(o => `<button class="kachel ${k.trenner ? "wortk" : ""}" data-j="${o.j}" data-t="${esc(o.t)}">${esc(o.t)}</button>`).join("")}</div>
        <div class="btnreihe" style="justify-content:space-between;margin-top:14px">
          <button class="btn zwei klein" id="zurueck">⌫ zurück</button>
          <div id="erg" class="klein muted">${k.trenner ? "Tippe die Wörter in der richtigen Reihenfolge – der Satz beginnt rechts." : "Tippe die Buchstaben in der richtigen Reihenfolge – das Wort beginnt rechts."}</div>
          <button class="btn safran versteckt" id="naechste">${k.trenner ? "Nächster Satz →" : "Nächstes Wort →"}</button>
        </div>
      </div>`;
      const anz = $("#anz", el), wort = $("#wort", el), einz = $("#einz", el);
      const tr_ = k.trenner || "";
      const zeichne = () => { wort.textContent = gebaut.map(g => g.t).join(tr_); einz.textContent = tr_ ? "" : gebaut.map(g => g.t).join(" "); };
      $$(".kachel", el).forEach(b => b.addEventListener("click", () => {
        if (gesperrt) return;
        gebaut.push({ t: b.dataset.t, b }); b.disabled = true; zeichne();
        if (gebaut.length === w.teile.length) pruefe();
      }));
      $("#zurueck", el).onclick = () => { if (gesperrt) return; const g = gebaut.pop(); if (g) g.b.disabled = false; zeichne(); };
      function pruefe() {
        const richtig = gebaut.every((g, n) => g.t === w.teile[n]);
        if (richtig) {
          gesperrt = true; ton("ok"); if (ersterVersuch) p++;
          anz.classList.add("ok"); wort.textContent = w.fa; einz.textContent = "";
          $("#erg", el).innerHTML = `✓ <b>${esc(w.tr)}</b> – ${esc(w.de)} ${hoer(w.say || w.fa, w.audio)}${w.hinweis ? `<br>${w.hinweis}` : ""}`;
          bindeSprechen($("#erg", el)); sprich(w.say || w.fa, w.audio);
          $("#zurueck", el).classList.add("versteckt");
          if (i < k.woerter.length - 1) { const n = $("#naechste", el); n.classList.remove("versteckt"); n.onclick = () => { i++; zeige(); }; }
          else fertig(p, k.woerter.length);
        } else {
          ersterVersuch = false; ton("falsch"); gesperrt = true;
          anz.classList.add("falsch");
          $("#erg", el).textContent = "Noch nicht ganz – versuch es noch einmal.";
          setTimeout(() => { anz.classList.remove("falsch"); gebaut.forEach(g => g.b.disabled = false); gebaut = []; zeichne(); gesperrt = false; }, 800);
        }
      }
    }
    zeige();
  };

  R.sortieren = (k, el, fertig) => {
    const items = k.mischen === false ? k.items : mischen(k.items);
    let i = 0, p = 0;
    function zeige() {
      const it = items[i];
      el.innerHTML = `<div class="karte">
        <h2 style="margin-top:0">${k.titel || "Sortiere"}</h2>
        <p class="muted" style="margin-top:0">${k.frage || ""}</p>
        <div class="zaehler">${i + 1} von ${items.length}</div>
        <div class="sort-item"><div class="fa">${esc(it.fa)}</div>${it.tr ? `<div class="tr us">${esc(it.tr)}</div>` : ""}</div>
        <div class="sort-kat">${k.kategorien.map((c, j) => `<button class="opt" data-j="${j}">${c}</button>`).join("")}</div>
        <div id="erkl"></div>
        <div class="btnreihe" style="justify-content:flex-end;margin-top:12px"><button class="btn safran versteckt" id="naechste">Nächstes →</button></div>
      </div>`;
      $$(".opt", el).forEach(b => b.addEventListener("click", () => {
        const j = +b.dataset.j;
        $$(".opt", el).forEach(o => o.disabled = true);
        if (j === it.k) { b.classList.add("ok"); p++; ton("ok"); }
        else { b.classList.add("falsch"); $$(".opt", el)[it.k].classList.add("ok"); ton("falsch"); }
        if (it.e) $("#erkl", el).innerHTML = `<div class="erkl">${it.e}</div>`;
        if (it.say !== false) sprich(it.say || it.fa);
        if (i < items.length - 1) { const n = $("#naechste", el); n.classList.remove("versteckt"); n.onclick = () => { i++; zeige(); }; n.focus(); }
        else fertig(p, items.length);
      }));
    }
    zeige();
  };

  R.finden = (k, el, fertig) => {
    const w = mischen(k.woerter);
    el.innerHTML = `<div class="karte">
      <h2 style="margin-top:0">${k.titel || "Finde"}</h2>
      <p style="margin-top:0">${k.frage}</p>
      <div class="chips">${w.map((x, i) => `<button class="fchip" data-i="${i}">${esc(x.fa)}</button>`).join("")}</div>
      <div id="erkl"></div>
      <div class="btnreihe" style="justify-content:flex-end"><button class="btn" id="pruefen">Prüfen</button></div></div>`;
    $$(".fchip", el).forEach(b => b.addEventListener("click", () => { if (!b.disabled) b.classList.toggle("sel"); }));
    $("#pruefen", el).onclick = () => {
      let p = 0;
      $$(".fchip", el).forEach(b => {
        const x = w[+b.dataset.i], sel = b.classList.contains("sel"); b.disabled = true;
        b.classList.remove("sel");
        if (sel && x.ja) { b.classList.add("ok"); p++; }
        else if (!sel && !x.ja) { p++; }
        else if (sel && !x.ja) b.classList.add("falsch");
        else b.classList.add("fehlt");
        if (x.tr) b.title = x.tr;
      });
      ton(p === w.length ? "ok" : "falsch");
      $("#erkl", el).innerHTML = `<div class="erkl">${p} von ${w.length} richtig eingeordnet. ${k.erkl || ""}<br><span class="klein">Grün = richtig gefunden · gestrichelt = übersehen · rot = gehört nicht dazu</span></div>`;
      $("#pruefen", el).classList.add("versteckt");
      fertig(p, w.length);
    };
  };

  R.lesen = (k, el, fertig) => {
    let schlange = k.karten.map((c, i) => ({ c, i, runde: 1 }));
    let p = 0; const n = k.karten.length;
    function zeige() {
      if (!schlange.length) {
        el.innerHTML = `<div class="karte lk"><div class="emo">📖</div><h2 style="margin:0">Stapel geschafft!</h2><p class="muted">${p} von ${n} Wörtern konntest du gleich beim ersten Mal lesen.</p></div>`;
        return fertig(p, n);
      }
      const it = schlange[0], c = it.c;
      el.innerHTML = `<div class="karte lk">
        <h2 style="margin:0">${k.titel || "Lies das Wort"}</h2>
        <div class="zaehler">noch ${schlange.length} Karte(n)</div>
        <div class="fa">${esc(c.fa)}</div>
        <div class="klein muted">Lies laut. Dann decke auf.</div>
        <div class="rueck versteckt" id="rueck">
          ${c.emoji ? `<div class="emo">${c.emoji}</div>` : ""}
          <div class="tr" style="font-size:1.4rem">${esc(c.tr)}</div>
          <div class="de">${esc(c.de)}</div>
          <div>${hoer(c.say || c.fa, c.audio)}</div>
        </div>
        <div class="btnreihe" id="vorn"><button class="btn" id="auf">Aufdecken</button></div>
        <div class="btnreihe versteckt" id="hinten">
          <button class="btn gruen" id="ja">✓ Wusste ich</button>
          <button class="btn zwei" id="nein">↻ Noch üben</button>
        </div></div>`;
      bindeSprechen(el);
      $("#auf", el).onclick = () => { $("#rueck", el).classList.remove("versteckt"); $("#vorn", el).classList.add("versteckt"); $("#hinten", el).classList.remove("versteckt"); sprich(c.say || c.fa, c.audio); };
      $("#ja", el).onclick = () => { if (it.runde === 1) p++; schlange.shift(); zeige(); };
      $("#nein", el).onclick = () => { schlange.shift(); if (it.runde < 2) { it.runde++; schlange.push(it); } zeige(); };
    }
    zeige();
  };

  R.text = (k, el, fertig) => {
    el.innerHTML = `<div class="karte">
      ${k.titel ? `<h2 style="margin-top:0">${k.titel}</h2>` : ""}
      ${k.text ? `<p class="muted klein" style="margin-top:0">${k.text}</p>` : `<p class="muted klein" style="margin-top:0">Lies den Text. Tippe auf eine Zeile, um Umschrift und Übersetzung zu sehen.</p>`}
      <div class="lesetext">${k.zeilen.map((z, i) => `<div class="lz" data-i="${i}">
        <div class="fa">${esc(z.fa)}</div>
        <div class="lz-hilfe versteckt">${z.tr ? `<span class="tr">${esc(z.tr)}</span>` : ""}${z.de ? `<span class="de">${esc(z.de)}</span>` : ""}</div></div>`).join("")}</div>
      <div class="btnreihe" style="margin-top:12px">
        <button class="btn zwei klein" id="alleHilfe">Alle Hilfen zeigen</button>
        <button class="btn zwei klein" ${say(k.zeilen.map(z => z.fa).join(" "))}>🔊 ganzen Text hören</button>
      </div></div>`;
    bindeSprechen(el);
    $$(".lz", el).forEach(z => z.addEventListener("click", () => { z.querySelector(".lz-hilfe").classList.toggle("versteckt"); sprich(k.zeilen[+z.dataset.i].fa); }));
    $("#alleHilfe", el).onclick = () => { const h = $$(".lz-hilfe", el), zu = h.some(x => x.classList.contains("versteckt")); h.forEach(x => x.classList.toggle("versteckt", !zu)); };
    fertig(0, 0);
  };

  R.ordnen = (k, el, fertig) => {
    const n = k.items.length; let pos = 0, fehler = 0;
    const gem = mischen(k.items.map((it, i) => ({ it, i })));
    el.innerHTML = `<div class="karte">
      <h2 style="margin-top:0">${k.titel || "Bring in die richtige Reihenfolge"}</h2>
      <p class="muted" style="margin-top:0">${k.frage || "Tippe die Sätze in der richtigen Reihenfolge an."}</p>
      <ol class="ordnen-liste" id="ol"></ol>
      <div class="ordnen-pool" id="pool">${gem.map(g => `<button class="ord-btn" data-i="${g.i}"><span class="fa">${esc(g.it.fa)}</span></button>`).join("")}</div>
      <div class="zaehler" id="oz">0 von ${n}</div></div>`;
    $$(".ord-btn", el).forEach(b => b.addEventListener("click", () => {
      const i = +b.dataset.i;
      if (i === pos) {
        const it = k.items[i];
        const li = document.createElement("li");
        li.innerHTML = `<div class="fa">${esc(it.fa)}</div>${it.tr ? `<div class="tr us klein">${esc(it.tr)}</div>` : ""}${it.de ? `<div class="de klein">${esc(it.de)}</div>` : ""}`;
        $("#ol", el).appendChild(li); b.remove(); pos++; ton("ok"); sprich(it.say || it.fa, it.audio);
        $("#oz", el).textContent = `${pos} von ${n}`;
        if (pos === n) fertig(Math.max(0, n - fehler), n);
      } else {
        fehler++; ton("falsch"); b.classList.add("falsch"); setTimeout(() => b.classList.remove("falsch"), 450);
      }
    }));
  };

  R.memory = (k, el, fertig) => {
    const n = k.paare.length, links = k.links || "tr";
    const rueck = p => links === "x" ? `<span class="fa x">${esc(p.x)}</span>` : links === "tr" ? `<span class="tr">${esc(p.tr)}</span>`
      : links === "emoji" ? `<span class="emo">${p.emoji || ""}</span>`
        : `${p.emoji ? `<span class="emo">${p.emoji}</span>` : ""}<span>${esc(p.de)}</span>`;
    const karten = mischen(k.paare.flatMap((p, i) => [{ i, s: "fa", h: `<span class="fa q">${esc(p.fa)}</span>` }, { i, s: "x", h: rueck(p) }]));
    el.innerHTML = `<div class="karte">
      <h2 style="margin-top:0">${k.titel || "Memory"}</h2>
      <p class="muted klein" style="margin-top:0">${k.text || "Decke immer zwei Karten auf und finde die Paare: persisches Wort + passende Karte."}</p>
      <div class="mem-gitter">${karten.map((c, j) => `<button class="mem" data-j="${j}"><span class="vorder">✦</span><span class="rueck">${c.h}</span></button>`).join("")}</div>
      <div class="zaehler" style="margin-top:12px" id="mz"></div></div>`;
    let offen = [], gefunden = 0, fehl = 0, sperre = false;
    const zaehl = () => $("#mz", el).textContent = `${gefunden} von ${n} Paaren · ${fehl} Fehlversuche`;
    zaehl();
    $$(".mem", el).forEach(b => b.addEventListener("click", () => {
      if (sperre || b.classList.contains("auf")) return;
      const c = karten[+b.dataset.j];
      b.classList.add("auf"); offen.push({ b, c });
      if (c.s === "fa") sprich(k.paare[c.i].say || k.paare[c.i].fa, k.paare[c.i].audio);
      if (offen.length < 2) return;
      const [a, d] = offen; offen = [];
      if (a.c.i === d.c.i && a.c.s !== d.c.s) {
        [a.b, d.b].forEach(x => x.classList.add("gef")); gefunden++; ton("ok"); zaehl();
        if (gefunden === n) fertig(Math.max(Math.ceil(n / 2), n - Math.max(0, fehl - n)), n);
      } else {
        fehl++; sperre = true; zaehl();
        const t = setTimeout(() => { [a.b, d.b].forEach(x => x.classList.remove("auf")); sperre = false; }, 950);
        aufraeumen.push(() => clearTimeout(t));
      }
    }));
  };

  R.tempo = (k, el, fertig) => {
    const pool = k.woerter.filter(w => (w.a || (k.modus === "de" ? w.de : w.tr)));
    const ziel = Math.min(k.ziel || 10, 99), sek = k.sekunden || 60, modus = k.modus === "de" ? "de" : "tr";
    const antwort = w => w.a || (modus === "de" ? w.de : w.tr);
    el.innerHTML = `<div class="karte" style="text-align:center">
      <div style="font-size:2.4rem">⏱️</div>
      <h2 style="margin:4px 0">${k.titel || "Blitzlesen"}</h2>
      <p>Du hast <b>${sek} Sekunden</b>. ${k.aufgabe || `Lies das Wort und tippe die richtige ${modus === "de" ? "Bedeutung" : "Aussprache"} an.`}<br>Ziel: <b>${ziel} richtige</b> – dann bist du fertig.</p>
      <button class="btn safran" id="los">Los geht’s!</button></div>`;
    $("#los", el).onclick = () => {
      let richtig = 0, falsch = 0, letzt = null, ende = Date.now() + sek * 1000, vorbei = false;
      el.innerHTML = `<div class="karte">
        <div class="tempo-kopf"><span id="tr">✓ 0 / ${ziel}</span><span id="tz">${sek}s</span></div>
        <div class="spur" style="margin:8px 0 4px"><i id="tb" style="width:100%;transition:width .25s linear"></i></div>
        <div class="frage"><div class="fa-gross" id="tw"></div></div>
        <div class="optionen" id="to"></div></div>`;
      const takt = setInterval(() => {
        const rest = Math.max(0, ende - Date.now());
        $("#tz", el).textContent = Math.ceil(rest / 1000) + "s";
        $("#tb", el).style.width = (100 * rest / (sek * 1000)) + "%";
        if (!rest) schluss();
      }, 250);
      aufraeumen.push(() => clearInterval(takt));
      function naechstes() {
        let w; do { w = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && w === letzt);
        letzt = w;
        const falsche = mischen(pool.filter(x => antwort(x) !== antwort(w))).reduce((a, x) => (a.includes(antwort(x)) ? a : a.concat(antwort(x))), []).slice(0, 2);
        const opts = mischen([antwort(w)].concat(falsche));
        $("#tw", el).textContent = w.fa;
        $("#to", el).innerHTML = opts.map(o => `<button class="opt ${k.optFa ? "fa" : ""}">${esc(o)}</button>`).join("");
        $$("#to .opt", el).forEach(b => b.onclick = () => {
          if (vorbei) return;
          if (b.textContent === antwort(w)) {
            richtig++; ton("ok"); $("#tr", el).textContent = `✓ ${richtig} / ${ziel}`;
            if (richtig >= ziel) return schluss(); naechstes();
          } else {
            falsch++; ton("falsch"); b.classList.add("falsch");
            $$("#to .opt", el).forEach(x => { x.disabled = true; if (x.textContent === antwort(w)) x.classList.add("ok"); });
            const t = setTimeout(() => { if (!vorbei) naechstes(); }, 700); aufraeumen.push(() => clearTimeout(t));
          }
        });
      }
      function schluss() {
        if (vorbei) return; vorbei = true; clearInterval(takt);
        const zeit = Math.round((sek * 1000 - Math.max(0, ende - Date.now())) / 1000);
        el.innerHTML = `<div class="karte" style="text-align:center">
          <div style="font-size:2.4rem">${richtig >= ziel ? "🏁" : "⌛"}</div>
          <h2 style="margin:4px 0">${richtig >= ziel ? `Geschafft in ${zeit} Sekunden!` : "Zeit ist um!"}</h2>
          <p>${richtig} richtig · ${falsch} falsch</p>
          <p class="klein muted">${richtig >= ziel ? "Stark! Beim Wiederholen der Station kannst du deine Zeit verbessern." : "Wiederhole die Station später – es zählt dein bestes Ergebnis."}</p></div>`;
        fertig(Math.min(richtig, ziel), ziel);
      }
      naechstes();
    };
  };

  /* ---------- Ablauf ---------- */
  const qs = new URLSearchParams(location.search);
  const LEK_ID = qs.get("id") || "01";

  function stationsSumme() {
    let p = 0, m = 0, fertigZahl = 0, pflicht = 0;
    LEK.stationen.forEach(s => { const f = FORT[s.id]; if (f) { p += f.p; m += f.m; fertigZahl++; if (!s.zusatz) pflicht++; } });
    return { p, m, fertigZahl, pflicht };
  }

  const TEILE = [
    { art: "lernpfad", nr: "1", titel: "Lernpfad", text: "Schritt für Schritt: Wortschatz und Grammatik" },
    { art: "texte", nr: "2", titel: "Texte & Dialoge", text: "Lesen, verstehen, Dialoge ordnen" },
    { art: "zusatz", nr: "3", titel: "Übungen", text: "Wiederholen und festigen" },
    { art: "umgangssprache", nr: "+", titel: "Extra: Umgangssprache", text: "So spricht man im Alltag – nicht so schreiben!" }];
  const artVon = s => s.zusatz ? (s.paketArt || "zusatz") : "lernpfad";
  const LABEL = { lernpfad: "Station", texte: "Text", zusatz: "Übung", umgangssprache: "Umgangssprache" };
  function stLabel(i) {
    const s = LEK.stationen[i], art = artVon(s);
    return LABEL[art] + " " + LEK.stationen.slice(0, i + 1).filter(x => artVon(x) === art).length;
  }

  function zeigeUebersicht() {
    aktSt = -1;
    history.replaceState(null, "", `?id=${encodeURIComponent(LEK_ID)}`);
    raeumeAuf();
    const idx = LEK.stationen.map((s, i) => ({ s, i, art: artVon(s) }));
    const naechste = (idx.find(x => x.art !== "umgangssprache" && !FORT[x.s.id]) || {}).i;
    const naechsteArt = naechste != null ? artVon(LEK.stationen[naechste]) : null;
    const zeile = x => {
      const f = FORT[x.s.id];
      return `<button class="zeile ${f ? "fertig" : ""} ${x.i === naechste ? "naechste" : ""}" data-i="${x.i}">
        <span class="z-nr">${f ? "✓" : LEK.stationen.slice(0, x.i + 1).filter(y => artVon(y) === x.art).length}</span>
        <span class="z-titel">${esc(x.s.titel)}</span>
        <span class="z-status">${f ? `${f.p}/${f.m}` : x.i === naechste ? "weiter →" : ""}</span></button>`;
    };
    $("#buehne").innerHTML = `
      <div class="lek-kopf2">
        <div class="muted klein">Lektion ${esc(LEK.nummer || "")}</div>
        <h2>${esc(LEK.titel)}</h2>
        ${LEK.einleitung ? `<p class="muted" style="margin:.3em 0 0">${LEK.einleitung}</p>` : ""}
      </div>
      ${TEILE.map(t => {
        const liste = idx.filter(x => x.art === t.art);
        if (!liste.length) return "";
        const erl = liste.filter(x => FORT[x.s.id]).length;
        const offen = t.art === naechsteArt || (naechsteArt == null && t.art === "lernpfad");
        return `<details class="teil teil-${t.art}" ${offen ? "open" : ""}>
          <summary><span class="t-nr">${t.nr}</span><span class="t-txt"><b>${t.titel}</b><span class="klein muted">${t.text}</span></span>
            <span class="t-stand">${erl} / ${liste.length}</span></summary>
          <div class="t-leiste"><i style="width:${Math.round(100 * erl / liste.length)}%"></i></div>
          <div class="zeilen">${liste.map(zeile).join("")}</div></details>`;
      }).join("")}`;
    $$(".zeile").forEach(b => b.addEventListener("click", () => starteStation(+b.dataset.i)));
    window.scrollTo(0, 0);
  }

  function starteStation(i) {
    aktSt = i; aktK = 0; summe = { p: 0, m: 0 };
    history.replaceState(null, "", `?id=${encodeURIComponent(LEK_ID)}&st=${i + 1}`);
    zeigeKarte();
  }

  function zeigeKarte() {
    raeumeAuf();
    const st = LEK.stationen[aktSt];
    const k = st.karten[aktK];
    $("#buehne").innerHTML = `
      <div class="st-titel"><div><div class="klein muted">Lektion ${esc(LEK.nummer || "")} · ${stLabel(aktSt)}</div><h2>${esc(st.titel)}</h2></div>
        <button class="btn zwei klein" id="zurUebersicht">☰ Übersicht</button></div>
      ${st.paketArt === "umgangssprache" ? `<div class="ug-banner">🗣️ <b>Umgangssprache</b> – so spricht man im Alltag. In Texten und Prüfungen gilt die Schriftsprache.</div>` : ""}
      <div class="fortschritt-punkte">${st.karten.map((_, j) => `<i class="${j < aktK ? "an" : j === aktK ? "jetzt" : ""}"></i>`).join("")}</div>
      <div id="karte"></div>
      <div class="buehne-fuss">
        <span class="klein muted" id="kp"></span>
        <button class="btn" id="weiter" disabled>Weiter →</button>
      </div>`;
    $("#zurUebersicht").onclick = zeigeUebersicht;
    const weiter = $("#weiter");
    const fertig = (p, m) => {
      summe.p += p; summe.m += m;
      if (m) $("#kp").textContent = `+${p} von ${m} Punkten`;
      weiter.disabled = false;
      weiter.textContent = aktK < st.karten.length - 1 ? "Weiter →" : "Station abschließen ✓";
    };
    weiter.onclick = () => {
      if (aktK < st.karten.length - 1) { aktK++; zeigeKarte(); }
      else abschluss();
    };
    const r = R[k.typ];
    if (!r) { $("#karte").innerHTML = `<div class="karte">Unbekannter Kartentyp: ${esc(k.typ)}</div>`; fertig(0, 0); return; }
    r(k, $("#karte"), fertig);
    window.scrollTo(0, 0);
  }

  async function abschluss() {
    const st = LEK.stationen[aktSt];
    const quote = summe.m ? summe.p / summe.m : 1;
    const sterne = quote >= .9 ? 3 : quote >= .6 ? 2 : 1;
    const alt = FORT[st.id];
    if (!alt || summe.p > alt.p) FORT[st.id] = { p: summe.p, m: summe.m };
    raeumeAuf();
    const naechste = aktSt < LEK.stationen.length - 1;
    $("#buehne").innerHTML = `<div class="karte abschluss">
      <div class="sterne">${"⭐".repeat(sterne)}${"☆".repeat(3 - sterne)}</div>
      <h2>${stLabel(aktSt)} geschafft!</h2>
      <div class="fa" style="font-size:1.6rem;color:var(--lapis);font-weight:800">${["آفَرین!", "عالی!", "خِیلی خوب!"][sterne - 1]}</div>
      <p>${summe.p} von ${summe.m} Punkten${alt && alt.p > summe.p ? ` · dein Bestwert bleibt ${alt.p}` : ""}</p>
      <p class="klein muted" id="speicher">Speichere …</p>
      <div class="btnreihe" style="justify-content:center">
        <button class="btn zwei" id="nochmal">↻ Wiederholen</button>
        <button class="btn zwei" id="uebersicht">☰ Übersicht</button>
        ${naechste ? `<button class="btn safran" id="naechsteSt">Nächste Station →</button>` : `<a class="btn safran" href="index.html" style="text-decoration:none">Zum Lernpfad</a>`}
      </div></div>`;
    ton("ok");
    $("#nochmal").onclick = () => starteStation(aktSt);
    $("#uebersicht").onclick = zeigeUebersicht;
    if (naechste) $("#naechsteSt").onclick = () => starteStation(aktSt + 1);
    const r = await F.speichereStation(LEK_ID, st.id, summe.p, summe.m);
    const sp = $("#speicher");
    if (sp) sp.textContent = F.sitzung() ? (r.online ? "✓ Gespeichert – deine Lehrkraft sieht deinen Fortschritt." : "Auf diesem Gerät gespeichert (gerade keine Verbindung).") : "Im Gast-Modus: nur auf diesem Gerät gespeichert.";
  }

  /* ---------- Buchstaben-Tafel ---------- */
  async function tafel() {
    let alle = [], quelle = LEK, alleFrei = false;
    const sammle = L => L.stationen.forEach((s, si) => s.karten.forEach(k => {
      if (k.typ === "buchstaben") k.buchstaben.forEach(b => { if (b.typ !== "vokal") alle.push({ b, si }); });
    }));
    sammle(LEK);
    if (!alle.length) { try { quelle = await F.ladeJSON("lektionen/01-alphabet.json"); sammle(quelle); alleFrei = true; } catch (e) { } }
    const erreicht = si => alleFrei || FORT[LEK.stationen[si].id] || si <= aktSt;
    const m = document.createElement("div");
    m.className = "modal";
    m.innerHTML = `<div class="karte">
      <div class="st-titel"><h2 style="margin:0">Buchstaben-Tafel</h2><button class="btn zwei klein" id="zu">✕ schließen</button></div>
      <p class="klein muted">Blasse Buchstaben kommen noch. Orange = verbindet sich nicht nach links. Tippen = Name hören.</p>
      <div class="tafel">${alle.map(({ b, si }) => `<div class="tz ${erreicht(si) ? "" : "grau"} ${b.verbindet === false ? "nv" : ""}" ${say(b.nameFa || b.fa)}>
        <div class="g">${esc(b.fa)}</div><div class="l">${esc(b.laut)}</div></div>`).join("")}</div></div>`;
    document.body.appendChild(m);
    bindeSprechen(m);
    m.addEventListener("click", e => { if (e.target === m || e.target.id === "zu") m.remove(); });
  }

  /* ---------- Start ---------- */
  async function start() {
    F.anwendenEinst();
    const e = F.einst();
    const tonBtn = $("#btnTon"), umBtn = $("#btnUmschrift");
    const setzeKnoepfe = () => { const x = F.einst(); tonBtn.classList.toggle("aus", !x.ton); tonBtn.textContent = x.ton ? "🔊 Ton" : "🔇 Ton"; umBtn.classList.toggle("aus", !x.umschrift); };
    tonBtn.onclick = () => { F.setEinst({ ton: !F.einst().ton }); setzeKnoepfe(); };
    umBtn.onclick = () => { F.setEinst({ umschrift: !F.einst().umschrift }); setzeKnoepfe(); toast(F.einst().umschrift ? "Umschrift wird angezeigt" : "Umschrift ausgeblendet – jetzt nur Schrift!"); };
    $("#btnTafel").onclick = tafel;
    setzeKnoepfe();

    try {
      const index = await F.ladeJSON("lektionen/index.json");
      const eintrag = index.lektionen.find(l => l.id === LEK_ID);
      if (!eintrag) throw new Error("Lektion nicht gefunden");
      const frei = await F.ladeFreigaben();
      if (!F.istOffen(eintrag, frei)) {
        $("#buehne").innerHTML = `<div class="karte abschluss"><div class="sterne">🔒</div><h2>Diese Lektion ist noch nicht freigeschaltet.</h2><p><a href="index.html">Zurück zum Lernpfad</a></p></div>`;
        return;
      }
      LEK = await F.ladeLektion(eintrag);
      LEK.nummer = eintrag.nummer;
      document.title = LEK.titel + " · Farsi-Lernpfad";
      $("#lekTitel").textContent = "Lektion " + eintrag.nummer + " · " + LEK.titel;
    } catch (err) {
      console.error(err);
      $("#buehne").innerHTML = `<div class="karte">Die Lektion konnte nicht geladen werden. ${location.protocol === "file:" ? "<br><b>Hinweis:</b> Lektionen laufen nur über GitHub Pages (oder einen lokalen Webserver), nicht per Doppelklick auf die Datei." : ""}</div>`;
      return;
    }
    FORT = await F.ladeFortschritt(LEK_ID);
    const st = +(qs.get("st") || 0);
    if (st >= 1 && st <= LEK.stationen.length) starteStation(st - 1); else zeigeUebersicht();
  }

  window.LEKTION_ENGINE = { R, start, formen, raeumeAuf: () => raeumeAuf() };
  if (!window.OHNE_LEKTION) document.addEventListener("DOMContentLoaded", start);
})();
