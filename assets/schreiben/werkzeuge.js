/* =========================================================
   Schreibwerkstatt – Werkzeuge (rein, auch für Tests)
   - pruefe(text, opt): automatische Hinweise (ohne KI)
   - diff(alt, neu): Wort-Unterschiede für die Korrektur-Anzeige
   - TASTATUR: persische Bildschirmtastatur
   ========================================================= */
window.SCHREIB_WERKZEUGE = (function () {
  const ZWNJ = "‌";
  const HARAKAT = /[ً-ْٰ]/g;
  const norm = x => String(x || "").replace(HARAKAT, "").replace(/[آأإ]/g, "ا").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/ة/g, "ه").replace(/‌/g, "");
  const tokens = t => String(t || "").split(/\s+/).filter(Boolean);
  const kern = w => String(w).replace(/^[«»"“”„(\[]+|[.,،؛;:!?؟…»"“”)\]]+$/g, "");
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i]; let min = i;
      for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (cur[j] < min) min = cur[j]; }
      if (min > max) return max + 1; prev = cur;
    }
    return prev[b.length];
  }
  /* opt: { W: Wörterbuch-Daten (WOERTERBUCH.daten.W), normFa, E: DETEKTIV_ENGINE (nachschlagen), extra: [bekannte Wörter], min, max, namen: [..] } */
  function pruefe(text, opt = {}) {
    const H = [], t = String(text || "");
    const fix = (titel, erkl, f, art = "fix") => H.push({ art, titel, erkl, fix: f });
    if (/[يكة]/.test(t)) fix("Arabische Buchstaben", "Im Persischen schreibt man ی und ک (nicht ي / ك).", x => x.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/ة/g, "ه"));
    if (/(^|[\s«])(ن?می) (?=[؀-ۿ])/.test(t)) fix("Halbabstand bei „می‌“", "می‌ / نمی‌ hängt mit Halbabstand (ZWNJ) am Verb: می‌روم, nicht می روم.", x => x.replace(/(^|[\s«])(ن?می) (?=[؀-ۿ])/g, "$1$2" + ZWNJ));
    if (/([؀-ۿ]) (ها|های|هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)(?=$|[\s.,،؟!])/.test(t)) fix("Halbabstand beim Plural „‌ها“", "Die Endung ‌ها schreibt man mit Halbabstand an das Wort: کتاب‌ها.", x => x.replace(/([؀-ۿ]) (ها|های|هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)(?=$|[\s.,،؟!])/g, "$1" + ZWNJ + "$2"));
    if (/[؀-ۿ][\s]*[,?;]/.test(t)) fix("Persische Satzzeichen", "Im Persischen: ، (Komma), ؟ (Fragezeichen), ؛ (Semikolon).", x => x.replace(/([؀-ۿ]\s*),/g, "$1،").replace(/([؀-ۿ]\s*)\?/g, "$1؟").replace(/([؀-ۿ]\s*);/g, "$1؛"));
    if (/ +[.،؟!:؛]/.test(t) || / {2,}/.test(t) || /[.،؟!؛][\u0600-\u06FF]/.test(t)) fix("Leerzeichen", "Kein Leerzeichen vor Satzzeichen, aber eines danach – und keine doppelten Leerzeichen.", x => x.replace(/ +([.،؟!:؛])/g, "$1").replace(/([.،؟!؛])(?=[\u0600-\u06FF])/g, "$1 ").replace(/ {2,}/g, " "));
    if (/[A-Za-zÄÖÜäöüß]{2,}/.test(t)) H.push({ art: "info", titel: "Lateinische Buchstaben", erkl: "Im Text stehen lateinische Buchstaben. Schreib bitte mit persischen Buchstaben (⌨️ Tastatur unten)." });
    const n = tokens(t).length;
    if (opt.min && n < opt.min) H.push({ art: "info", titel: `Noch etwas kurz: ${n} Wörter`, erkl: `Ziel: mindestens ${opt.min} Wörter.` });
    if (opt.max && n > opt.max) H.push({ art: "info", titel: `Etwas lang: ${n} Wörter`, erkl: `Ziel: höchstens ${opt.max} Wörter.` });
    if (n >= 5 && !/[.!؟?]\s*$/.test(t.trim())) H.push({ art: "info", titel: "Satzende", erkl: "Am Ende des Textes fehlt ein Punkt (.) oder Fragezeichen (؟)." });
    /* unbekannte Wörter (vielleicht Tippfehler) */
    if (opt.W && opt.E) {
      const bekannt = new Set((opt.extra || []).concat(opt.namen || []).map(norm)), unb = [];
      tokens(t).forEach(w => {
        const k = kern(w); if (!k || !/[؀-ۿ]/.test(k) || bekannt.has(norm(k))) return;
        if (opt.E.nachschlagen(k, opt.W, opt.normFa, 1).length) return;
        if (!unb.some(u => u.wort === k)) unb.push({ wort: k });
      });
      if (unb.length) {
        const liste = opt.liste || (opt.liste = [...new Set(opt.W.map(w => norm(w.fa)).filter(x => x.length >= 2 && !/\s/.test(x)))]);
        unb.forEach(u => { const n0 = norm(u.wort), max = n0.length > 4 ? 2 : 1, vs = [];
          for (const x of liste) { if (lev(n0, x, max) <= max) { vs.push(x); if (vs.length >= 3) break; } } u.vorschlag = vs; });
        H.push({ art: "woerter", titel: `${unb.length === 1 ? "Ein Wort kennt" : unb.length + " Wörter kennt"} das Wörterbuch nicht`, erkl: "Vielleicht ein Tippfehler – oder einfach ein Name oder ein seltenes Wort.", woerter: unb });
      }
    }
    return H;
  }
  /* Wort-Diff (LCS) → [{t, art: "gleich"|"weg"|"neu"}] */
  function diff(alt, neu) {
    const a = tokens(alt), b = tokens(neu), n = a.length, m = b.length;
    const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const out = []; let i = 0, j = 0;
    while (i < n && j < m) {
      if (a[i] === b[j]) { out.push({ t: a[i], art: "gleich" }); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) out.push({ t: a[i++], art: "weg" });
      else out.push({ t: b[j++], art: "neu" });
    }
    while (i < n) out.push({ t: a[i++], art: "weg" });
    while (j < m) out.push({ t: b[j++], art: "neu" });
    return out;
  }
  const aenderungen = d => d.filter(x => x.art !== "gleich").length;
  /* persische Bildschirmtastatur (wie die übliche Belegung) */
  const TASTATUR = [
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "چ"],
    ["ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "گ"],
    ["ظ", "ط", "ز", "ر", "ذ", "د", "پ", "و", "ژ", "آ"],
    ["ء", "ئ", "ؤ", "ـَ", "ـِ", "ـُ", "ـّ", "ـْ", "،", ".", "؟", "!"]
  ];
  return { pruefe, diff, aenderungen, tokens, norm, lev, TASTATUR, ZWNJ };
})();
