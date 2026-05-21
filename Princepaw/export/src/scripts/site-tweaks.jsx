/* Prince Paw — site-wide tweaks panel (palette + density + variant).
   Uses TweaksPanel API from scripts/tweaks-panel.jsx
*/
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "honey",
  "brandGold": "#E0A93C",
  "cocoa": "#2F1C0E",
  "cream": "#FEFBF4",
  "displayFont": "Fredoka",
  "buttonStyle": "sticker",
  "stickerShadows": true,
  "tickerOn": true
}/*EDITMODE-END*/;

const PALETTE_PRESETS = {
  honey:   { brandGold: "#E0A93C", cocoa: "#2F1C0E", cream: "#FEFBF4" }, // current default
  bubblegum:{ brandGold: "#F2A6B6", cocoa: "#5B2B3A", cream: "#FFF5F2" }, // pink/berry
  matcha:  { brandGold: "#A6C26E", cocoa: "#2E3A1F", cream: "#F5F6EC" }, // green
  inkblue: { brandGold: "#7CB1E0", cocoa: "#1B2A40", cream: "#F1F4F8" }, // navy
};

function applyVars(t) {
  const r = document.documentElement.style;
  // Override the brand tokens
  r.setProperty("--gold-400", t.brandGold);
  r.setProperty("--cocoa-500", t.cocoa);
  r.setProperty("--cream-50", t.cream);
  r.setProperty("--bg-page", t.cream);

  // Derive a darker gold hover from brand color (very simple)
  const darken = (hex, amt = -18) => {
    const n = parseInt(hex.replace("#", ""), 16);
    let R = (n >> 16) + amt, G = ((n >> 8) & 0xff) + amt, B = (n & 0xff) + amt;
    R = Math.max(0, Math.min(255, R)); G = Math.max(0, Math.min(255, G)); B = Math.max(0, Math.min(255, B));
    return "#" + (R<<16|G<<8|B).toString(16).padStart(6, "0");
  };
  r.setProperty("--gold-500", darken(t.brandGold, -22));
  r.setProperty("--gold-600", darken(t.brandGold, -50));
  r.setProperty("--grad-gold", `linear-gradient(180deg, ${t.brandGold} 0%, ${darken(t.brandGold,-22)} 100%)`);
  r.setProperty("--grad-gold-shine", `linear-gradient(180deg, ${darken(t.brandGold, 40)} 0%, ${t.brandGold} 45%, ${darken(t.brandGold,-50)} 100%)`);

  // Font swap
  const fontMap = {
    Fredoka: '"Fredoka", "Source Han Sans SC", system-ui, sans-serif',
    Nunito:  '"Nunito", "Source Han Sans SC", system-ui, sans-serif',
    DMSerif: '"DM Serif Display", "Source Han Sans SC", Georgia, serif',
  };
  r.setProperty("--font-display-en", fontMap[t.displayFont] || fontMap.Fredoka);

  // Sticker shadow on/off
  if (!t.stickerShadows) {
    r.setProperty("--shadow-sticker", "0 2px 6px rgba(47,28,14,0.12)");
    r.setProperty("--shadow-sticker-lg", "0 8px 22px rgba(47,28,14,0.18)");
  } else {
    r.setProperty("--shadow-sticker", "3px 4px 0 var(--cocoa-500)");
    r.setProperty("--shadow-sticker-lg", "5px 6px 0 var(--cocoa-500)");
  }

  // Ticker visibility
  document.querySelectorAll(".pp-ticker").forEach((el) => {
    el.style.display = t.tickerOn ? "" : "none";
  });
}

function PrincePawTweaks() {
  if (!window.TweaksPanel) return null;
  const { TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakSelect, TweakToggle, useTweaks } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    // When palette preset changes, apply its colors
    if (t.palette !== "custom") {
      const p = PALETTE_PRESETS[t.palette];
      if (p && (p.brandGold !== t.brandGold || p.cocoa !== t.cocoa || p.cream !== t.cream)) {
        setTweak({ brandGold: p.brandGold, cocoa: p.cocoa, cream: p.cream });
        return;
      }
    }
    applyVars(t);
  }, [t.palette, t.brandGold, t.cocoa, t.cream, t.displayFont, t.stickerShadows, t.tickerOn]);

  // Load Google Fonts on demand
  useEffect(() => {
    if (t.displayFont === "DMSerif" && !document.getElementById("__pp-dmserif")) {
      const l = document.createElement("link");
      l.id = "__pp-dmserif";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap";
      document.head.appendChild(l);
    }
  }, [t.displayFont]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette">
        <TweakSelect
          label="Preset"
          value={t.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
            { label: "Honey gold", value: "honey" },
            { label: "Bubblegum", value: "bubblegum" },
            { label: "Matcha", value: "matcha" },
            { label: "Ink Blue", value: "inkblue" },
            { label: "Custom", value: "custom" },
          ]}
        />
        <TweakColor
          label="Brand"
          value={t.brandGold}
          onChange={(v) => setTweak({ brandGold: v, palette: "custom" })}
          options={["#E0A93C", "#F2A6B6", "#A6C26E", "#7CB1E0"]}
        />
        <TweakColor
          label="Ink"
          value={t.cocoa}
          onChange={(v) => setTweak({ cocoa: v, palette: "custom" })}
          options={["#2F1C0E", "#5B2B3A", "#2E3A1F", "#1B2A40"]}
        />
        <TweakColor
          label="Paper"
          value={t.cream}
          onChange={(v) => setTweak({ cream: v, palette: "custom" })}
          options={["#FEFBF4", "#FFF5F2", "#F5F6EC", "#F1F4F8"]}
        />
      </TweakSection>

      <TweakSection label="Type & feel">
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          onChange={(v) => setTweak("displayFont", v)}
          options={[
            { label: "Fredoka (chunky)", value: "Fredoka" },
            { label: "Nunito (rounded)", value: "Nunito" },
            { label: "DM Serif (editorial)", value: "DMSerif" },
          ]}
        />
        <TweakToggle
          label="Sticker shadows"
          value={t.stickerShadows}
          onChange={(v) => setTweak("stickerShadows", v)}
        />
        <TweakToggle
          label="Marquee ticker"
          value={t.tickerOn}
          onChange={(v) => setTweak("tickerOn", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const ppTweaksRoot = document.getElementById("tweaks-root");
if (ppTweaksRoot && window.TweaksPanel) {
  ReactDOM.createRoot(ppTweaksRoot).render(<PrincePawTweaks />);
}
