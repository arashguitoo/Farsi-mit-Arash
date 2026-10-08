/* Klassen-Werkzeuge der Konsole: 📅 Kalender (Unterrichtstage) und ✋ Anwesenheit.
   Firebase:
     farsi/termine/{klasse}/{tid}            = { datum:"YYYY-MM-DD", von:"18:00", bis:"19:30", thema, notiz, ausfall }
     farsi/anwesenheit/{klasse}/{tid}/{code} = { s:"gemeldet"|"da"|"fehlt"|"entsch", ts, gemeldet?, von:"tn"|"lk" }
   Teilnehmende melden sich am Unterrichtstag selbst an (s:"gemeldet"), die Lehrkraft bestätigt (s:"da") oder korrigiert. */
(function () {
  const STATUS = {
    gemeldet: { ico: "✋", txt: "gemeldet – bitte bestätigen", kurz: "✋", farbe: "var(--safran-hell)", rand: "var(--safran)" },
    da: { ico: "✓", txt: "anwesend", kurz: "✓", farbe: "var(--gruen-hell)", rand: "var(--gruen)" },
    fehlt: { ico: "✗", txt: "fehlt", kurz: "✗", farbe: "var(--granat-hell)", rand: "var(--granat)" },
    entsch: { ico: "E", txt: "entschuldigt", kurz: "E", farbe: "var(--lapis-hell)", rand: "var(--lapis)" }
  };
  const WT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const p2 = n => String(n).padStart(2, "0");
  const iso = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
  const ausIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const deDatum = (s, lang) => ausIso(s).toLocaleDateString("de-DE", lang ? { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" } : { weekday: "short", day: "2-digit", month: "2-digit" });
  const wtIndex = d => (d.getDay() + 6) % 7;   // Mo = 0

  window.KLASSEN_TOOLS = function (ctx) {
    const { F, D, $, $$, esc, toast, schreib, klassenListe, tnListe, klName, druckFenster, herunterladen } = ctx;
    let kalKlasse = null, anwKlasse = null, monat = (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })();
    let editId = null, anwTermin = null, zeigeAlle = false;

    const termine = k => Object.entries((D.termine || {})[k] || {}).map(([id, t]) => ({ id, ...t }))
      .sort((a, b) => (a.datum + (a.von || "")).localeCompare(b.datum + (b.von || "")));
    const anw = (k, tid) => (((D.anwesenheit || {})[k] || {})[tid]) || {};
    const heute = () => iso(new Date());
    const zeit = t => t.von ? (t.von + (t.bis ? "–" + t.bis : "")) : "";
    const stattgefunden = k => termine(k).filter(t => !t.ausfall && t.datum <= heute());

    function klasseOk(k) { return k && (D.klassen || {})[k] ? k : (klassenListe()[0] || {}).id || null; }

    function chipsFuer(el, aktiv, onPick) {
      el.innerHTML = klassenListe().map(k => `<button class="tab ${k.id === aktiv ? "an" : ""}" data-k="${k.id}">${esc(k.name)} <span class="anz">${termine(k.id).length}</span></button>`).join("");
      $$("[data-k]", el).forEach(b => b.onclick = () => onPick(b.dataset.k));
    }

    /* =================== KALENDER =================== */
    function zeichneKal() {
      kalKlasse = klasseOk(kalKlasse); if (!kalKlasse) return;
      chipsFuer($("#kalChips"), kalKlasse, k => { kalKlasse = k; editId = null; zeichneKal(); });
      $("#kalMonat").textContent = MONATE[monat.getMonth()] + " " + monat.getFullYear();
      const T = termine(kalKlasse), proTag = {};
      T.forEach(t => (proTag[t.datum] = proTag[t.datum] || []).push(t));
      const start = new Date(monat); start.setDate(1 - wtIndex(monat));
      let h = WT.map(w => `<div class="kal-wt">${w}</div>`).join("");
      for (let i = 0; i < 42; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i);
        const s = iso(d), ts = proTag[s] || [];
        if (i >= 35 && d.getMonth() !== monat.getMonth()) break;
        h += `<button class="kal-tag ${d.getMonth() !== monat.getMonth() ? "fremd" : ""} ${s === heute() ? "heute" : ""} ${ts.length ? "hat" : ""} ${ts.some(t => t.id === editId) ? "gewaehlt" : ""}" data-tag="${s}">
          <span class="kal-nr">${d.getDate()}</span>${ts.map(t => `<span class="kal-t ${t.ausfall ? "ausfall" : ""}">${esc(t.von || "•")}${t.thema ? " " + esc(t.thema) : ""}</span>`).join("")}</button>`;
      }
      $("#kalGitter").innerHTML = h;
      $$("#kalGitter [data-tag]").forEach(b => b.onclick = () => {
        const ts = proTag[b.dataset.tag] || [];
        if (ts.length) formFuellen(ts[0]); else formNeu(b.dataset.tag);
      });
      zeichneListe();
      if (!editId && !$("#kfDatum").value) formNeu(heute());
    }
    function letzteZeit() {
      const T = termine(kalKlasse); const t = T[T.length - 1];
      return t ? { von: t.von || "", bis: t.bis || "" } : { von: "18:00", bis: "19:30" };
    }
    function formNeu(datum) {
      editId = null; const z = letzteZeit();
      $("#kfTitel").textContent = "Unterrichtstag eintragen";
      $("#kfDatum").value = datum; $("#kfVon").value = z.von; $("#kfBis").value = z.bis;
      $("#kfThema").value = ""; $("#kfNotiz").value = ""; $("#kfAusfall").checked = false;
      $("#kfLoeschen").classList.add("versteckt");
      $$("#kalGitter .gewaehlt").forEach(x => x.classList.remove("gewaehlt"));
    }
    function formFuellen(t) {
      editId = t.id;
      $("#kfTitel").textContent = "Unterrichtstag bearbeiten";
      $("#kfDatum").value = t.datum; $("#kfVon").value = t.von || ""; $("#kfBis").value = t.bis || "";
      $("#kfThema").value = t.thema || ""; $("#kfNotiz").value = t.notiz || ""; $("#kfAusfall").checked = !!t.ausfall;
      $("#kfLoeschen").classList.remove("versteckt");
      $$("#kalGitter .kal-tag").forEach(x => x.classList.toggle("gewaehlt", x.dataset.tag === t.datum));
    }
    function formDaten() {
      const datum = $("#kfDatum").value;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) { toast("Bitte ein Datum wählen."); return null; }
      return { datum, von: $("#kfVon").value || "", bis: $("#kfBis").value || "", thema: $("#kfThema").value.trim(), notiz: $("#kfNotiz").value.trim(), ausfall: $("#kfAusfall").checked || null };
    }
    async function speichern() {
      const t = formDaten(); if (!t) return;
      const id = editId || ("t" + t.datum.replace(/-/g, "") + Math.random().toString(36).slice(2, 5));
      if (await schreib(F.ref(`termine/${kalKlasse}/${id}`).set(t), editId ? "Termin gespeichert." : "Unterrichtstag eingetragen.")) {
        editId = id; monat = new Date(ausIso(t.datum).getFullYear(), ausIso(t.datum).getMonth(), 1);
      }
    }
    async function loeschen() {
      if (!editId) return;
      const hatAnw = Object.keys(anw(kalKlasse, editId)).length;
      if (!confirm(`Diesen Unterrichtstag löschen?${hatAnw ? `\n\nAchtung: ${hatAnw} Anwesenheitseinträge werden mitgelöscht.` : ""}`)) return;
      const id = editId;
      if (await schreib(F.ref().update({ [`termine/${kalKlasse}/${id}`]: null, [`anwesenheit/${kalKlasse}/${id}`]: null }), "Termin gelöscht.")) formNeu(heute());
    }
    async function serie() {
      const a = $("#ksVon").value, b = $("#ksBis").value;
      const tage = $$("#ksTage input:checked").map(x => +x.value);
      if (!a || !b || a > b) return toast("Bitte Start- und Enddatum prüfen.");
      if (!tage.length) return toast("Bitte mindestens einen Wochentag wählen.");
      const vorhanden = new Set(termine(kalKlasse).map(t => t.datum)), upd = {};
      let n = 0;
      for (let d = ausIso(a); iso(d) <= b; d.setDate(d.getDate() + 1)) {
        if (!tage.includes(wtIndex(d)) || vorhanden.has(iso(d))) continue;
        const id = "t" + iso(d).replace(/-/g, "") + Math.random().toString(36).slice(2, 5);
        upd[`termine/${kalKlasse}/${id}`] = { datum: iso(d), von: $("#ksZeitVon").value || "", bis: $("#ksZeitBis").value || "", thema: $("#ksThema").value.trim() };
        if (++n > 200) break;
      }
      if (!n) return toast("Keine neuen Termine – alle Tage sind schon eingetragen.");
      if (!confirm(`${n} Unterrichtstage für ${klName(kalKlasse)} anlegen?`)) return;
      await schreib(F.ref().update(upd), `${n} Unterrichtstage angelegt.`);
    }
    function zeichneListe() {
      const T = termine(kalKlasse), h = heute();
      const liste = zeigeAlle ? T : T.filter(t => t.datum >= h);
      $("#kalListeTitel").textContent = zeigeAlle ? `Alle Termine (${T.length})` : `Kommende Termine (${liste.length} von ${T.length})`;
      $("#kalAlle").textContent = zeigeAlle ? "nur kommende" : "auch vergangene";
      $("#kalListe").innerHTML = liste.length ? `<table class="t"><tr><th>Datum</th><th>Zeit</th><th>Thema</th><th></th></tr>${liste.map(t => `
        <tr class="${t.ausfall ? "inaktiv" : ""}"><td><b>${deDatum(t.datum, true)}</b>${t.datum === h ? ' <span class="warn">heute</span>' : ""}</td><td>${esc(zeit(t))}</td>
        <td>${t.ausfall ? "<b>fällt aus</b> " : ""}${esc(t.thema || "")}${t.notiz ? `<div class="mini">${esc(t.notiz)}</div>` : ""}</td>
        <td><button class="btn zwei klein" data-edit="${t.id}">✏️</button></td></tr>`).join("")}</table>`
        : `<p class="muted klein">Noch keine ${zeigeAlle ? "" : "kommenden "}Termine. Trag einzelne Tage im Kalender ein oder lege eine Serie an.</p>`;
      $$("#kalListe [data-edit]").forEach(b => b.onclick = () => { const t = T.find(x => x.id === b.dataset.edit); monat = new Date(ausIso(t.datum).getFullYear(), ausIso(t.datum).getMonth(), 1); editId = t.id; zeichneKal(); formFuellen(t); window.scrollTo({ top: 0, behavior: "smooth" }); });
    }
    function ics() {
      const T = termine(kalKlasse).filter(t => !t.ausfall);
      if (!T.length) return toast("Keine Termine zum Exportieren.");
      const z = (d, u) => d.replace(/-/g, "") + "T" + (u || "00:00").replace(":", "") + "00";
      const esc2 = s => String(s || "").replace(/[\\,;]/g, m => "\\" + m).replace(/\n/g, "\\n");
      const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
      const body = T.map(t => ["BEGIN:VEVENT", `UID:${t.id}-${kalKlasse}@farsi-lernpfad`, `DTSTAMP:${stamp}`,
        t.von ? `DTSTART:${z(t.datum, t.von)}` : `DTSTART;VALUE=DATE:${t.datum.replace(/-/g, "")}`,
        t.von && t.bis ? `DTEND:${z(t.datum, t.bis)}` : null,
        `SUMMARY:${esc2("Persisch · " + klName(kalKlasse) + (t.thema ? " · " + t.thema : ""))}`, t.notiz ? `DESCRIPTION:${esc2(t.notiz)}` : null, "END:VEVENT"].filter(Boolean).join("\r\n")).join("\r\n");
      herunterladen(`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Farsi-Lernpfad//DE\r\nCALSCALE:GREGORIAN\r\n${body}\r\nEND:VCALENDAR\r\n`, `unterricht-${klName(kalKlasse).replace(/\W+/g, "-")}.ics`, "text/calendar");
    }

    /* =================== ANWESENHEIT =================== */
    function standardTermin(k) {
      const T = termine(k).filter(t => !t.ausfall), h = heute();
      const heuteT = T.find(t => t.datum === h); if (heuteT) return heuteT.id;
      const vorbei = T.filter(t => t.datum < h); if (vorbei.length) return vorbei[vorbei.length - 1].id;
      return T.length ? T[0].id : null;
    }
    function zeichneAnw() {
      anwKlasse = klasseOk(anwKlasse); if (!anwKlasse) return;
      chipsFuer($("#anwChips"), anwKlasse, k => { anwKlasse = k; anwTermin = null; zeichneAnw(); });
      const T = termine(anwKlasse);
      if (!anwTermin || !T.some(t => t.id === anwTermin)) anwTermin = standardTermin(anwKlasse);
      $("#anwTermin").innerHTML = T.length ? T.map(t => `<option value="${t.id}" ${t.id === anwTermin ? "selected" : ""}>${deDatum(t.datum, true)} ${esc(zeit(t))}${t.thema ? " · " + esc(t.thema) : ""}${t.ausfall ? " (fällt aus)" : ""}${t.datum === heute() ? " – heute" : ""}</option>`).join("") : `<option value="">– noch keine Termine –</option>`;
      const tn = tnListe(anwKlasse).filter(t => t.aktiv !== false);
      if (!anwTermin) {
        $("#anwTitel").textContent = "Noch keine Unterrichtstage";
        $("#anwTabelle").innerHTML = `<tr><td class="muted">Lege zuerst im Tab <b>📅 Kalender</b> die Unterrichtstage an. Am Unterrichtstag können sich die Teilnehmenden dann auf der Startseite mit „✋ Ich bin da“ melden.</td></tr>`;
      } else {
        const t = T.find(x => x.id === anwTermin), A = anw(anwKlasse, anwTermin);
        const zahl = s => tn.filter(x => (A[x.code] || {}).s === s).length;
        $("#anwTitel").innerHTML = `${deDatum(t.datum, true)} ${esc(zeit(t))}${t.thema ? " · " + esc(t.thema) : ""} <span class="mini">· ✓ ${zahl("da")} · ✋ ${zahl("gemeldet")} · ✗ ${zahl("fehlt")} · E ${zahl("entsch")} · offen ${tn.length - zahl("da") - zahl("gemeldet") - zahl("fehlt") - zahl("entsch")}</span>`;
        $("#anwAlleBest").disabled = !zahl("gemeldet");
        $("#anwTabelle").innerHTML = t.ausfall ? `<tr><td class="muted">Dieser Termin ist als <b>„fällt aus“</b> markiert.</td></tr>` :
          `<tr><th>Name</th><th>Status</th><th>selbst gemeldet</th><th>setzen</th></tr>` + tn.map(x => {
            const e = A[x.code], st = e && STATUS[e.s];
            return `<tr class="${e && e.s === "gemeldet" ? "anw-offen" : ""}"><td><b>${esc(x.name)}</b> <span class="mini">${x.code}</span></td>
              <td>${st ? `<span class="anw-chip" style="background:${st.farbe};border-color:${st.rand}">${st.ico} ${st.txt}</span>` : '<span class="mini">–</span>'}</td>
              <td class="mini">${e && e.gemeldet ? new Date(e.gemeldet).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) + " Uhr" : ""}</td>
              <td class="anw-knoepfe">${["da", "fehlt", "entsch"].map(s => `<button class="btn klein ${e && e.s === s ? "" : s === "da" && e && e.s === "gemeldet" ? "safran" : "zwei"}" data-setz="${s}" data-code="${x.code}" title="${STATUS[s].txt}">${s === "da" && e && e.s === "gemeldet" ? "✓ bestätigen" : STATUS[s].ico + (s === "entsch" ? " entsch." : s === "da" ? " da" : " fehlt")}</button>`).join("")}
                ${e ? `<button class="btn zwei klein" data-setz="" data-code="${x.code}" title="zurücksetzen">↺</button>` : ""}</td></tr>`;
          }).join("");
        $$("#anwTabelle [data-setz]").forEach(b => b.onclick = () => setze(b.dataset.code, b.dataset.setz));
      }
      zeichneMatrix(tn);
    }
    function setze(code, s) {
      const pfad = `anwesenheit/${anwKlasse}/${anwTermin}/${code}`, alt = anw(anwKlasse, anwTermin)[code];
      if (!s) return schreib(F.ref(pfad).set(null));
      return schreib(F.ref(pfad).set({ s, ts: Date.now(), von: "lk", ...(alt && alt.gemeldet ? { gemeldet: alt.gemeldet } : {}) }));
    }
    async function alleBestaetigen() {
      const A = anw(anwKlasse, anwTermin), upd = {};
      Object.entries(A).filter(([c, e]) => e.s === "gemeldet").forEach(([c, e]) => { upd[`anwesenheit/${anwKlasse}/${anwTermin}/${c}`] = { s: "da", ts: Date.now(), von: "lk", gemeldet: e.gemeldet || e.ts }; });
      if (!Object.keys(upd).length) return toast("Niemand wartet auf Bestätigung.");
      await schreib(F.ref().update(upd), `${Object.keys(upd).length} Anmeldung(en) bestätigt.`);
    }
    async function restFehlt() {
      const A = anw(anwKlasse, anwTermin), upd = {};
      tnListe(anwKlasse).filter(t => t.aktiv !== false && !A[t.code]).forEach(t => { upd[`anwesenheit/${anwKlasse}/${anwTermin}/${t.code}`] = { s: "fehlt", ts: Date.now(), von: "lk" }; });
      if (!Object.keys(upd).length) return toast("Alle haben schon einen Status.");
      if (!confirm(`${Object.keys(upd).length} Person(en) ohne Status als „fehlt“ eintragen?`)) return;
      await schreib(F.ref().update(upd), "Eingetragen.");
    }
    function quote(k, code) {
      // heutiger Termin zählt erst, wenn ein Status eingetragen ist
      const S = stattgefunden(k).filter(t => t.datum < heute() || anw(k, t.id)[code]); let da = 0, ent = 0, fehlt = 0;
      S.forEach(t => { const s = (anw(k, t.id)[code] || {}).s; if (s === "da") da++; else if (s === "entsch") ent++; else if (s === "fehlt") fehlt++; });
      return { da, ent, fehlt, n: S.length, pct: S.length ? Math.round(100 * da / S.length) : null };
    }
    function zeichneMatrix(tn) {
      const S = stattgefunden(anwKlasse);
      if (!S.length) { $("#anwMatrix").innerHTML = `<tr><td class="muted">Noch keine stattgefundenen Unterrichtstage.</td></tr>`; return; }
      $("#anwMatrix").innerHTML = `<tr><th>Name</th>${S.map(t => `<th class="mini" title="${esc(t.thema || "")}">${deDatum(t.datum)}</th>`).join("")}<th>Quote</th></tr>` +
        tn.map(x => { const q = quote(anwKlasse, x.code);
          return `<tr><td><b>${esc(x.name)}</b></td>${S.map(t => { const e = anw(anwKlasse, t.id)[x.code], st = e && STATUS[e.s];
            return `<td style="text-align:center;${st ? `background:${st.farbe}` : ""}">${st ? st.kurz : "·"}</td>`; }).join("")}
            <td><b>${q.pct == null ? "–" : q.pct + " %"}</b> <span class="mini">${q.da}/${q.n}${q.ent ? ` · ${q.ent} E` : ""}</span></td></tr>`; }).join("");
    }
    function csv() {
      const S = stattgefunden(anwKlasse), tn = tnListe(anwKlasse);
      const zeilen = [["Name", "Code", ...S.map(t => t.datum), "anwesend", "entschuldigt", "gefehlt", "Termine", "Quote %"]];
      tn.forEach(x => { const q = quote(anwKlasse, x.code);
        zeilen.push([x.name, x.code, ...S.map(t => ({ da: "anwesend", fehlt: "fehlt", entsch: "entschuldigt", gemeldet: "gemeldet" })[(anw(anwKlasse, t.id)[x.code] || {}).s] || ""), q.da, q.ent, q.fehlt, q.n, q.pct == null ? "" : q.pct]); });
      herunterladen("﻿" + zeilen.map(z => z.map(v => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\r\n"), `anwesenheit-${klName(anwKlasse).replace(/\W+/g, "-")}.csv`, "text/csv;charset=utf-8");
    }
    function drucken() {
      const S = stattgefunden(anwKlasse), tn = tnListe(anwKlasse);
      druckFenster("Anwesenheit – " + klName(anwKlasse), `<h2 style="margin:10mm 10mm 2mm">Anwesenheitsliste · ${esc(klName(anwKlasse))}</h2>
        <p style="margin:0 10mm 4mm;font-size:12px">Stand ${new Date().toLocaleDateString("de-DE")} · ✓ anwesend · ✗ fehlt · E entschuldigt · ✋ gemeldet, nicht bestätigt</p>
        <table><tr><th>Name</th>${S.map(t => `<th>${ausIso(t.datum).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}</th>`).join("")}<th>Quote</th></tr>
        ${tn.map(x => { const q = quote(anwKlasse, x.code); return `<tr><td>${esc(x.name)}</td>${S.map(t => `<td>${(STATUS[(anw(anwKlasse, t.id)[x.code] || {}).s] || { kurz: "" }).kurz}</td>`).join("")}<td>${q.pct == null ? "–" : q.pct + " %"}</td></tr>`; }).join("")}</table>`,
        `table{border-collapse:collapse;margin:0 10mm;font-size:12px}th,td{border:1px solid #999;padding:3px 6px;text-align:center}td:first-child,th:first-child{text-align:left}`);
    }

    /* =================== HEUTE (für die Übersicht) =================== */
    function heuteHTML() {
      const h = heute(), out = [];
      klassenListe().forEach(k => termine(k.id).filter(t => t.datum === h).forEach(t => {
        if (t.ausfall) return out.push(`<div class="heute-z"><b>${esc(k.name)}</b> · ${esc(zeit(t))} · <b>fällt heute aus</b></div>`);
        const A = anw(k.id, t.id), n = s => Object.values(A).filter(e => e.s === s).length;
        out.push(`<div class="heute-z"><b>📅 Heute ${esc(zeit(t))} · ${esc(k.name)}</b>${t.thema ? " · " + esc(t.thema) : ""}
          <span class="mini">✓ ${n("da")} anwesend · ✋ ${n("gemeldet")} warten auf Bestätigung</span>
          <button class="btn ${n("gemeldet") ? "safran" : "zwei"} klein" data-anw="${k.id}|${t.id}">✋ Anwesenheit</button></div>`);
      }));
      return out.join("");
    }

    /* =================== Verdrahtung =================== */
    $("#kalZurueck").onclick = () => { monat.setMonth(monat.getMonth() - 1); zeichneKal(); };
    $("#kalVor").onclick = () => { monat.setMonth(monat.getMonth() + 1); zeichneKal(); };
    $("#kalHeute").onclick = () => { const d = new Date(); monat = new Date(d.getFullYear(), d.getMonth(), 1); formNeu(heute()); zeichneKal(); };
    $("#kfSpeichern").onclick = speichern;
    $("#kfLoeschen").onclick = loeschen;
    $("#kfNeu").onclick = () => formNeu($("#kfDatum").value || heute());
    $("#ksAnlegen").onclick = serie;
    $("#kalAlle").onclick = () => { zeigeAlle = !zeigeAlle; zeichneListe(); };
    $("#kalIcs").onclick = ics;
    $("#ksTage").innerHTML = WT.map((w, i) => `<label class="klein ks-tag"><input type="checkbox" value="${i}"> ${w}</label>`).join("");
    (() => { const d = new Date(); $("#ksVon").value = iso(d); const e = new Date(d); e.setMonth(e.getMonth() + 3); $("#ksBis").value = iso(e); })();
    $("#anwTermin").onchange = e => { anwTermin = e.target.value || null; zeichneAnw(); };
    $("#anwAlleBest").onclick = alleBestaetigen;
    $("#anwRestFehlt").onclick = restFehlt;
    $("#anwCsv").onclick = csv;
    $("#anwDruck").onclick = drucken;

    return {
      zeichne() { if (!klassenListe().length) return; zeichneKal(); zeichneAnw(); },
      heuteHTML,
      oeffneAnw(k, tid) { anwKlasse = k; anwTermin = tid; zeichneAnw(); },
      themen(liste) { $("#kfThemen").innerHTML = liste.map(x => `<option value="${esc(x)}">`).join(""); $("#ksThemen") && ($("#ksThemen").innerHTML = $("#kfThemen").innerHTML); }
    };
  };
})();
