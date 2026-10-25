/* Alle persischen Texte des Detektiv-Falls mit Stimme → JSON (für detektiv-audio.py) */
global.window = {};
require("../assets/detektiv/engine.js"); require("../assets/detektiv/pashmak.js");
const F = window.DETEKTIV_FAELLE.pashmak, E = window.DETEKTIV_ENGINE;
const W = "fa-IR-DilaraNeural", M = "fa-IR-FaridNeural";
const STIMME = { neda: W, kaveh: M, shirin: W, rahimi: M, bahar: W };
const out = new Map(); const add = (t, v) => { t = String(t || "").trim(); if (t && /[؀-ۿ]/.test(t) && !out.has(t)) out.set(t, v); };
add(F.intro.fa, W); add(F.ende.fa, W);
F.bericht.forEach(b => add(b.fa, M));
Object.values(F.hinweise).forEach(h => add(h.fa, M));
F.personen.forEach(p => {
  const v = STIMME[p.id], b = p.bitte;
  p.fragen.forEach(q => { add(q.fa, v === W ? M : W); add(q.a, v); });
  p.lexikon.forEach(l => add(l[0], W));
  add(b.fa, v); add(b.danke, v);
  (b.items || []).forEach(i => add(i.fa, M));
  (b.zeilen || []).forEach(z => add(z[1], z[0] === "مُشتَری" ? W : M));
  (b.saetze || []).forEach(s => add(s.fa, M));
  (b.paare || []).forEach(x => add(x[0], W));
});
["سَلام!", "مَن یک سَرنَخ پِیدا کَردَم!", "لُطفاً دَفتَرچه را بِخوانید.", "کُمَک لازِم دارَم.", "مَن مُوافِقَم."].forEach(t => add(t, W));
console.log(JSON.stringify([...out].map(([t, v]) => ({ t, v, h: E.hash(t) }))));
