/* =========================================================
   Gemeinsame Werkzeuge für Live-Aktivitäten (Truhe, Geschenk, Gespräch)
   - render(): neu zeichnen, ohne offene Wörterbücher/Details und
     Eingaben zu verlieren
   - neueRunde(): Spielcode ohne Kollision anlegen (Transaktion)
   - Timer (Countdown für alle), „Alle Geräte neu laden“, Hand heben ✋,
     Verbindungsanzeige + Online-Status
   ========================================================= */
(function () {
  "use strict";
  const LT = {};
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const GELADEN = Date.now();
  const cssEsc = x => (window.CSS && CSS.escape ? CSS.escape(x) : String(x).replace(/[^a-zA-Z0-9_-]/g, "\\$&"));

  /* ---------- Neu zeichnen mit Erhalt von <details> und Fokus ---------- */
  LT.render = function (el, html) {
    if (!el) return;
    const offen = new Set([...el.querySelectorAll("details[open]")].map((d, i) => d.dataset.merk || (d.querySelector("summary") || {}).textContent || "d" + i));
    const f = document.activeElement, fId = f && el.contains(f) && (f.id || f.dataset.merk);
    const fWert = fId && "value" in f ? f.value : null, fPos = fId && f.selectionStart != null ? [f.selectionStart, f.selectionEnd] : null;
    const scroll = [...el.querySelectorAll("[data-scroll]")].map(x => [x.dataset.scroll, x.scrollTop]);
    el.innerHTML = html;
    el.querySelectorAll("details").forEach((d, i) => { const k = d.dataset.merk || (d.querySelector("summary") || {}).textContent || "d" + i; if (offen.has(k)) d.open = true; });
    if (fId) {
      const n = el.querySelector("#" + cssEsc(fId)) || el.querySelector(`[data-merk="${cssEsc(fId)}"]`);
      if (n) { if (fWert != null) n.value = fWert; n.focus(); if (fPos && n.setSelectionRange) try { n.setSelectionRange(fPos[0], fPos[1]); } catch (e) { } }
    }
    scroll.forEach(([k, t]) => { const x = el.querySelector(`[data-scroll="${k}"]`); if (x) x.scrollTop = t; });
  };
  /* Tippt jemand gerade in ein Feld? Dann nicht neu zeichnen (wird beim Verlassen nachgeholt) */
  LT.tipptGerade = function (nachher) {
    const f = document.activeElement;
    if (f && f.matches && f.matches("input[type=text], input:not([type]), textarea") && !f.closest(".lt-frei")) {
      if (!f.__ltBlur) { f.__ltBlur = true; f.addEventListener("blur", () => { f.__ltBlur = false; setTimeout(nachher, 30); }, { once: true }); }
      return true;
    }
    return false;
  };

  /* ---------- Alle Live-Aktivitäten (für den gemeinsamen Spielcode, code.html) ---------- */
  LT.SPIELE = {
    truhe: { titel: "Das Geheimnis von Omas Truhe", icon: "🗝️", url: c => `live-truhe.html?code=${c}` },
    geschenk: { titel: "Das Geburtstagsgeschenk", icon: "🎁", url: c => `live-truhe.html?spiel=geschenk&code=${c}` },
    gespraech: { titel: "Gesprächs-Simulation", icon: "🗣️", url: c => `live-gespraech.html?code=${c}` },
    chat: { titel: "Wortsalat-Chat", icon: "💬", url: c => `live-chat.html?code=${c}` },
    quiz: { titel: "Live-Quiz", icon: "🧭", url: (c, g) => `live-quiz.html?code=${c}${g && g.quiz && g.quiz !== "sprache-verstehen" ? "&quiz=" + encodeURIComponent(g.quiz) : ""}` },
    vokabel: { titel: "Vokabelspiel", icon: "🎲", url: c => `live-vokabel.html?code=${c}` },
    buzzer: { titel: "Blitz-Übersetzung", icon: "⚡", url: c => `live-buzzer.html?code=${c}` },
    detektiv: { titel: "Detektiv-Fall", icon: "🕵️", url: c => `live-detektiv.html?code=${c}` },
    sein: { titel: "Tischspiel: sein", icon: "🎴", url: c => `live-sein.html?code=${c}` }
  };
  const liveRef = (s, c) => window.FARSI.ref(`live/${s}/${c}`);
  /* Spielcode in allen Aktivitäten suchen → { spiel, titel, icon, url } oder null (neueste/laufende Runde gewinnt) */
  LT.findeRunde = async function (c) {
    c = String(c || "").replace(/\D/g, ""); if (!/^\d{4}$/.test(c)) return null;
    const tr = await Promise.all(Object.keys(LT.SPIELE).map(async s => { try { const g = (await liveRef(s, c).once("value")).val(); return g ? { s, g } : null; } catch (e) { return null; } }));
    const da = tr.filter(Boolean).sort((a, b) => ((a.g.phase === "ende") - (b.g.phase === "ende")) || ((b.g.erstellt || 0) - (a.g.erstellt || 0)));
    if (!da.length) return null;
    const { s, g } = da[0], S = LT.SPIELE[s];
    return { spiel: s, titel: S.titel, icon: S.icon, url: S.url(c, g), phase: g.phase };
  };
  /* ---------- Spielcode ohne Kollision (über ALLE Aktivitäten eindeutig) ---------- */
  LT.neueRunde = async function (refFn, daten) {
    for (let v = 0; v < 12; v++) {
      const c = String(Math.floor(1000 + Math.random() * 9000));
      const ref = refFn(c);
      let frei = false;
      try {
        frei = !(await ref.once("value")).exists();
        if (frei && window.FARSI && window.FARSI.ref) {
          const andere = await Promise.all(Object.keys(LT.SPIELE).map(s => liveRef(s, c).once("value").then(x => x.exists()).catch(() => false)));
          frei = !andere.some(Boolean);
        }
      } catch (e) { frei = false; }
      if (!frei) continue;
      await ref.set(daten);
      return c;
    }
    throw new Error("Kein freier Spielcode gefunden – bitte noch einmal versuchen.");
  };

  /* ---------- Timer ---------- */
  LT.timerHtml = function (G) {
    const t = G && G.timer;
    if (!t || !t.ende) return "";
    return `<div class="lt-timer" data-ende="${t.ende}">⏱ <b class="lt-rest">–:–</b>${t.text ? " · " + esc(t.text) : ""}</div>`;
  };
  function tick() {
    document.querySelectorAll(".lt-timer").forEach(x => {
      const rest = Math.max(0, Math.round((+x.dataset.ende - Date.now()) / 1000));
      const b = x.querySelector(".lt-rest"); if (b) b.textContent = Math.floor(rest / 60) + ":" + String(rest % 60).padStart(2, "0");
      x.classList.toggle("lt-knapp", rest > 0 && rest <= 60); x.classList.toggle("lt-aus", rest === 0);
    });
  }
  setInterval(tick, 1000);
  LT.nachRender = function () { tick(); };
  LT.timerSteuerung = function (G) {
    return `<div class="lt-werkzeug"><span class="klein"><b>⏱ Timer für alle:</b></span>${[3, 5, 10, 15].map(m => `<button class="btn zwei klein" data-lt-timer="${m}">${m} Min.</button>`).join("")}
      ${G && G.timer ? `<button class="btn zwei klein" data-lt-timer="0">✕ Timer aus</button>` : ""}</div>`;
  };

  /* ---------- Alle Geräte neu laden (gegen alte, zwischengespeicherte Versionen) ---------- */
  LT.pruefeNeuLaden = function (G) {
    const r = G && G.reload;
    if (!r || r < GELADEN - 5000) return;
    let schon = null; try { schon = sessionStorage.getItem("lt_reload"); } catch (e) { }
    if (String(r) === schon) return;
    try { sessionStorage.setItem("lt_reload", String(r)); } catch (e) { }
    const u = new URL(location.href); u.searchParams.set("v", String(r).slice(-6));
    location.replace(u.toString());
  };

  /* ---------- Verbindung & Online-Status ---------- */
  LT.verbindung = function (spielerRef) {
    if (!window.firebase || !firebase.database) return;
    let banner = document.getElementById("lt-offline");
    if (!banner) { banner = document.createElement("div"); banner.id = "lt-offline"; banner.textContent = "⚠️ Keine Verbindung – bitte WLAN prüfen. Es geht automatisch weiter, sobald die Verbindung zurück ist."; document.body.appendChild(banner); }
    let uhr = null;
    firebase.database().ref(".info/connected").on("value", s => {
      const an = s.val() === true;
      clearTimeout(uhr);
      if (an) {
        banner.classList.remove("an");
        if (spielerRef) {
          spielerRef.child("online").set(true).catch(() => { });
          spielerRef.child("online").onDisconnect().set(false).catch(() => { });
        }
      } else uhr = setTimeout(() => banner.classList.add("an"), 4000);   /* kurze Aussetzer nicht melden */
    });
  };

  /* ---------- Stil ---------- */
  const css = document.createElement("style");
  css.textContent = `
  .lt-timer{position:sticky;top:6px;z-index:20;margin:10px 0;padding:8px 14px;border-radius:12px;background:var(--lapis,#2f5d62);color:#fff;font-weight:700;font-size:1.05rem;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.12)}
  .lt-timer.lt-knapp{background:var(--safran,#d99a2b)}
  .lt-timer.lt-aus{background:var(--granat,#a8443a)}
  .lt-werkzeug{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:6px 0}
  #lt-offline{position:fixed;left:0;right:0;bottom:0;z-index:99;background:#a8443a;color:#fff;padding:10px 16px;text-align:center;font-weight:700;transform:translateY(110%);transition:transform .3s}
  #lt-offline.an{transform:none}
  .lt-hand{display:inline-flex;align-items:center;gap:4px;background:#fff3d6;border:1px solid #e6c46a;border-radius:999px;padding:2px 10px;font-weight:800;font-size:.85rem}
  .lt-off{opacity:.55}
  .schau{pointer-events:none;user-select:none;border:3px dashed #9fbcb8;border-radius:18px;padding:10px;background:#fbfbf8}
  .schau-gitter{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px;align-items:start}
  .schau-kopf{font-weight:800;margin:0 0 6px;display:flex;gap:8px;align-items:center}
  .schau .karte{box-shadow:none}
  .schau .lt-timer{position:static}`;
  document.head.appendChild(css);

  window.LIVE_TOOLS = LT;
})();
