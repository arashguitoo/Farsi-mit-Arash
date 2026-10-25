/* Alle persischen Texte des Detektiv-Falls mit Stimme → JSON (für detektiv-audio.py) */
global.window = {};
require("../assets/detektiv/engine.js"); require("../assets/detektiv/pashmak.js");
const F = window.DETEKTIV_FAELLE.pashmak, E = window.DETEKTIV_ENGINE;
const W = "W1", M = "M1";
const STIMME = { neda: "W1", kaveh: "M2", shirin: "W3", rahimi: "M3", bahar: "W2" };
const out = new Map(); const add = (t, v) => { t = String(t || "").trim(); if (t && /[؀-ۿ]/.test(t) && !out.has(t)) out.set(t, v); };
add(F.intro.fa, W); add(F.ende.fa, W);
(F.anleitung || []).forEach(x => add(x.fa, "W3")); add((F.anleitung || []).map(x => x.fa).join(" "), "W3");
F.bericht.forEach(b => add(b.fa, M));
Object.values(F.hinweise).forEach(h => add(h.fa, M));
F.personen.forEach(p => {
  const v = STIMME[p.id], b = p.bitte;
  p.fragen.forEach(q => { add(q.fa, v[0] === "W" ? "M1" : "W1"); add(q.a, v); });
  p.lexikon.forEach(l => add(l[0], W));
  add(b.fa, v); add(b.danke, v);
  (b.items || []).forEach(i => add(i.fa, "M1"));
  (b.zeilen || []).forEach(z => add(z[1], z[0] === "مُشتَری" ? "W2" : "M3"));
  (b.saetze || []).forEach(s => add(s.fa, M));
  (b.paare || []).forEach(x => add(x[0], W));
});
["سَلام!", "مَن یک سَرنَخ پِیدا کَردَم!", "لُطفاً دَفتَرچه را بِخوانید.", "کُمَک لازِم دارَم.", "مَن مُوافِقَم."].forEach(t => add(t, W));
console.log(JSON.stringify([...out].map(([t, v]) => ({ t, v }))));
