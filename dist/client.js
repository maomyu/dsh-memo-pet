window.__ModuleLoader__.load({id:'dsh-memo-pet',factory(require){
const module={exports:{}};let exports=module.exports;
var nt=Object.create;var le=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var st=Object.getOwnPropertyNames;var pt=Object.getPrototypeOf,lt=Object.prototype.hasOwnProperty;var mt=(e,a)=>{for(var i in a)le(e,i,{get:a[i],enumerable:!0})},Pe=(e,a,i,o)=>{if(a&&typeof a=="object"||typeof a=="function")for(let l of st(a))!lt.call(e,l)&&l!==i&&le(e,l,{get:()=>a[l],enumerable:!(o=it(a,l))||o.enumerable});return e};var me=(e,a,i)=>(i=e!=null?nt(pt(e)):{},Pe(a||!e||!e.__esModule?le(i,"default",{value:e,enumerable:!0}):i,e)),dt=e=>Pe(le({},"__esModule",{value:!0}),e);var Tt={};mt(Tt,{apply:()=>Ct,default:()=>Pt,inject:()=>Oe});module.exports=dt(Tt);var s=me(require("react"),1);var Ee="dsh-memo-pet",ae="memoPet",Te={mode:"strict",typeSymbol:"MemoPetJson",create:()=>({parse(e){if(!e||typeof e!="object"||Array.isArray(e))throw new TypeError("Expected an object");return e}})},$e=[{id:ae+"/request",service:ae,namespace:ae,method:"request",invocation:{kind:"direct"},parameters:[{name:"input",wire:"input",source:"json",codec:Te}],cancellation:{parameter:"signal"},result:Te}];var Se=`/* =========================================================================
   备忘精灵 · 阿墨
   One closed system: ink body, ember light, paper surfaces.
   Type: a serif voice for the pet, a quiet sans for the list, mono for numbers.
   ========================================================================= */

.mp-root {
  --mp-ember: #ff6b3d;
  --mp-ember-deep: #e2542a;
  --mp-ember-glow: rgba(255, 107, 61, 0.34);
  --mp-gold: #f3c77b;
  --mp-surface: color-mix(in oklab, var(--dsw-alias-bg-overlay) 88%, transparent);
  --mp-surface-solid: var(--dsw-alias-bg-overlay);
  --mp-well: color-mix(in oklab, var(--dsw-alias-bg-layer-1) 62%, transparent);
  --mp-well-2: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 52%, transparent);
  --mp-line: color-mix(in oklab, var(--dsw-alias-border-l1) 72%, transparent);
  --mp-line-soft: color-mix(in oklab, var(--dsw-alias-border-l1) 42%, transparent);
  --mp-line-strong: var(--dsw-alias-border-l2);
  --mp-text: var(--dsw-alias-label-primary);
  --mp-text-2: var(--dsw-alias-label-secondary);
  --mp-text-3: var(--dsw-alias-label-tertiary);
  --mp-alert: var(--dsw-alias-state-error-primary);
  --mp-radius: 22px;
  --mp-sans: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;
  --mp-serif: "Songti SC", "Noto Serif SC", "Source Han Serif SC", "Iowan Old Style", Georgia, serif;
  --mp-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
  --mp-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --mp-spring: cubic-bezier(0.34, 1.42, 0.64, 1);

  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  color: var(--mp-text);
  font-family: var(--mp-sans);
  font-size: 13.5px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.mp-root *,
.mp-root *::before,
.mp-root *::after {
  box-sizing: border-box;
}

.mp-root button,
.mp-root input,
.mp-root textarea {
  font: inherit;
  color: inherit;
}

.mp-root :focus-visible {
  outline: 2px solid color-mix(in oklab, var(--mp-ember) 62%, transparent);
  outline-offset: 2px;
  border-radius: 8px;
}

.mp-layer {
  position: absolute;
  inset: 0;
}

/* ------------------------------------------------------------------ float */

.mp-float {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  will-change: transform;
}

.mp-grab {
  position: absolute;
  left: -66px;
  top: -66px;
  width: 132px;
  height: 132px;
  pointer-events: auto;
  cursor: grab;
  touch-action: none;
  border-radius: 50%;
  transition: opacity 0.32s ease, transform 0.5s var(--mp-ease);
  -webkit-tap-highlight-color: transparent;
}

.mp-grab:active {
  cursor: grabbing;
}

.mp-float[data-hidden="true"] .mp-grab {
  opacity: 0;
  transform: scale(0.16);
  pointer-events: none;
}

/* --------------------------------------------------------------- creature */

.mp-creature {
  position: relative;
  width: 132px;
  height: 132px;
  transform: rotate(var(--mp-lean, 0deg));
  will-change: transform;
  filter: drop-shadow(0 12px 20px rgba(9, 6, 14, 0.26));
}

.mp-aura {
  position: absolute;
  inset: -4px -4px 2px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 62%, var(--mp-ember-glow) 0%, transparent 62%),
    radial-gradient(circle at 50% 40%, rgba(243, 199, 123, 0.14) 0%, transparent 58%);
  filter: blur(10px);
  transform: scale(calc(0.94 + var(--mp-breath, 0.5) * 0.1));
  opacity: 0.92;
}

.mp-creature[data-mood="alert"] .mp-aura {
  background:
    radial-gradient(circle at 50% 62%, rgba(255, 107, 61, 0.5) 0%, transparent 64%),
    radial-gradient(circle at 50% 40%, rgba(243, 199, 123, 0.2) 0%, transparent 58%);
}

.mp-body {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 92px;
  height: 92px;
  margin: -46px 0 0 -46px;
  border-radius: 47% 53% 52% 48% / 55% 49% 51% 45%;
  background:
    radial-gradient(74% 56% at 50% 102%, rgba(255, 107, 61, 0.42), transparent 68%),
    radial-gradient(96% 96% at 30% 16%, #4b4453 0%, #2a2430 44%, #131018 100%);
  box-shadow:
    inset 0 -13px 24px rgba(255, 107, 61, 0.2),
    inset 0 9px 16px rgba(255, 255, 255, 0.09),
    inset 0 0 0 1px rgba(255, 255, 255, 0.055),
    0 14px 26px -16px rgba(10, 6, 14, 0.7);
  transform: scaleX(calc(1 + var(--mp-squash, 0) * 0.8)) scaleY(calc(1 - var(--mp-squash, 0)));
  transform-origin: 50% 78%;
  animation: mp-blob 11s ease-in-out infinite;
  will-change: transform;
}

.mp-gloss {
  position: absolute;
  left: 16%;
  top: 12%;
  width: 30%;
  height: 20%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.34), transparent 72%);
  transform: rotate(-18deg);
  filter: blur(0.5px);
}

.mp-rim {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(158deg, rgba(255, 255, 255, 0.12), transparent 34%, transparent 66%, rgba(255, 107, 61, 0.26));
  mix-blend-mode: overlay;
  opacity: 0.85;
}

.mp-face {
  position: absolute;
  inset: 0;
}

.mp-eye {
  position: absolute;
  top: 45%;
  width: 11.5px;
  height: 13.5px;
  border-radius: 50% 50% 46% 46%;
  background: radial-gradient(circle at 42% 30%, #fffdfa 0%, #ffe9dd 72%, #ffd2be 100%);
  box-shadow: 0 0 8px rgba(255, 236, 222, 0.55);
  transform: translate(calc(var(--mp-eye-x, 0px) * 1.05), calc(var(--mp-eye-y, 0px) * 0.85))
    scaleY(calc(1 - var(--mp-blink, 0) * 0.96));
  transform-origin: 50% 50%;
  will-change: transform;
}

.mp-eye-left { left: 31%; }
.mp-eye-right { right: 31%; }

.mp-eye i {
  position: absolute;
  left: 32%;
  top: 26%;
  width: 4.2px;
  height: 4.6px;
  border-radius: 50%;
  background: #241d2b;
  opacity: 0.92;
}

.mp-creature[data-mood="happy"] .mp-eye {
  height: 10px;
  border-radius: 50% 50% 12% 12%;
  transform: translate(calc(var(--mp-eye-x, 0px) * 1.05), calc(var(--mp-eye-y, 0px) * 0.85 - 1px)) scaleY(0.62);
}

.mp-creature[data-mood="held"] .mp-eye {
  transform: translate(calc(var(--mp-eye-x, 0px) * 1.2), calc(var(--mp-eye-y, 0px) * 0.9)) scale(1.14);
}

.mp-creature[data-mood="dozing"] .mp-eye {
  transform: scaleY(calc(1 - var(--mp-blink, 0) * 0.96)) scaleY(0.1);
}

.mp-cheek {
  position: absolute;
  top: 58%;
  width: 15px;
  height: 9px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 61, 0.5), transparent 70%);
  filter: blur(3px);
  opacity: 0.7;
}

.mp-cheek-left { left: 13%; }
.mp-cheek-right { right: 13%; }

.mp-mouth {
  position: absolute;
  left: 50%;
  top: 63%;
  width: 9px;
  height: 4px;
  margin-left: -4.5px;
  border-bottom: 1.7px solid rgba(255, 240, 233, 0.8);
  border-radius: 0 0 9px 9px;
  transition: width 0.3s var(--mp-ease), height 0.3s var(--mp-ease), border-width 0.3s;
}

.mp-creature[data-mood="happy"] .mp-mouth {
  width: 14px;
  margin-left: -7px;
  height: 7px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(255, 196, 160, 0.9);
}

.mp-creature[data-mood="held"] .mp-mouth {
  width: 6px;
  margin-left: -3px;
  height: 6px;
  border: 1.6px solid rgba(255, 240, 233, 0.6);
  border-radius: 50%;
}

.mp-thread {
  position: absolute;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}

.mp-orbit {
  position: absolute;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}

.mp-ring {
  fill: none;
  stroke: color-mix(in oklab, var(--mp-ember) 62%, transparent);
  stroke-width: 1.2;
  stroke-dasharray: 1.2 6;
  stroke-linecap: round;
  opacity: 0.68;
  transform-box: view-box;
  transform-origin: 66px 68px;
  animation: mp-ring 24s linear infinite;
}

.mp-mote {
  transform-box: view-box;
  transform-origin: 66px 68px;
}

.mp-mote circle {
  fill: var(--mp-gold);
  opacity: 0.85;
  filter: drop-shadow(0 0 3px rgba(255, 107, 61, 0.9));
}

.mp-mote-a { animation: mp-mote 21s linear infinite; }
.mp-mote-b { animation: mp-mote 15s linear infinite reverse; }
.mp-mote-b circle { fill: var(--mp-ember); opacity: 0.6; }

@keyframes mp-ring {
  from { transform: rotate(-15deg); }
  to { transform: rotate(345deg); }
}

@keyframes mp-mote {
  to { transform: rotate(360deg); }
}

.mp-antenna {
  transform-origin: 66px 37px;
  transform: rotate(var(--mp-antenna, 0deg));
}

.mp-antenna path {
  fill: none;
  stroke: color-mix(in oklab, var(--mp-ember) 34%, var(--mp-text-3));
  stroke-width: 1.6;
  stroke-linecap: round;
}

.mp-tip {
  fill: #ffe0b6;
  filter: drop-shadow(0 0 3px rgba(255, 107, 61, 0.95));
}

.mp-tip-halo {
  fill: rgba(255, 107, 61, 0.16);
}

.mp-ribbon {
  transform: translateX(var(--mp-tail, 0px));
  transition: opacity 0.4s ease;
}

.mp-ribbon path {
  fill: none;
  stroke: var(--mp-ember);
  stroke-linecap: round;
}

.mp-r1 { stroke-width: 5.5; opacity: 0.42; }
.mp-r2 { stroke-width: 2.8; opacity: 0.65; }

.mp-zzz {
  position: absolute;
  right: -2px;
  top: -4px;
  font: 600 11px/1 var(--mp-mono);
  color: var(--mp-text-3);
  opacity: 0;
  transform: translateY(4px);
}

.mp-creature[data-mood="dozing"] .mp-zzz {
  opacity: 0.7;
  animation: mp-zzz 3.4s ease-in-out infinite;
}

.mp-creature[data-mood="dozing"] .mp-zzz span + span {
  margin-left: 3px;
  font-size: 8px;
  opacity: 0.6;
}

@keyframes mp-blob {
  0%, 100% { border-radius: 47% 53% 52% 48% / 55% 49% 51% 45%; }
  34% { border-radius: 53% 47% 46% 54% / 48% 55% 45% 52%; }
  67% { border-radius: 49% 51% 55% 45% / 52% 47% 53% 48%; }
}

@keyframes mp-zzz {
  0% { transform: translateY(2px); opacity: 0; }
  30% { opacity: 0.75; }
  100% { transform: translateY(-10px); opacity: 0; }
}

/* ----------------------------------------------------------------- perish */

.mp-perch {
  position: fixed;
  right: 0;
  width: 24px;
  height: 92px;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--mp-line);
  border-right: 0;
  border-radius: 13px 0 0 13px;
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--mp-surface-solid) 82%, transparent), var(--mp-surface-solid));
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  box-shadow:
    -10px 0 26px -16px rgba(8, 6, 12, 0.62),
    0 0 0 1px color-mix(in oklab, var(--mp-ember) 8%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: width 0.42s var(--mp-spring), border-radius 0.42s var(--mp-spring), background 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.mp-perch::before {
  content: "";
  position: absolute;
  top: -12px;
  bottom: -12px;
  right: 0;
  left: -46px;
}

.mp-perch.is-left {
  right: auto;
  left: 0;
  border-right: 1px solid var(--mp-line);
  border-left: 0;
  border-radius: 0 13px 13px 0;
  box-shadow: 8px 0 22px -14px rgba(8, 6, 12, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.mp-perch.is-left::before {
  left: 0;
  right: -46px;
}

.mp-perch:hover,
.mp-perch.is-hot {
  width: 32px;
  box-shadow:
    -12px 0 30px -16px rgba(255, 107, 61, 0.35),
    0 0 0 1px color-mix(in oklab, var(--mp-ember) 22%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.09);
}

.mp-perch-rail {
  position: absolute;
  left: 0;
  right: 0;
  top: 14px;
  bottom: 14px;
  margin: auto;
  width: 1px;
  background: linear-gradient(180deg, transparent, color-mix(in oklab, var(--mp-ember) 42%, transparent), transparent);
  opacity: 0.55;
}

.mp-perch-dots {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  transition: transform 0.4s var(--mp-ease);
}

.mp-perch-dots i {
  width: 3.6px;
  height: 3.6px;
  border-radius: 50%;
  background: color-mix(in oklab, var(--mp-text-3) 70%, transparent);
  transition: background 0.3s ease, transform 0.3s ease;
}

.mp-perch.is-right { border-left-color: color-mix(in oklab, var(--mp-ember) 24%, var(--mp-line)); }
.mp-perch.is-left { border-right-color: color-mix(in oklab, var(--mp-ember) 24%, var(--mp-line)); }

.mp-perch-dots i:nth-child(2) {
  width: 5px;
  height: 5px;
  background: var(--mp-ember);
  box-shadow: 0 0 6px var(--mp-ember-glow);
  animation: mp-breathe 2.8s ease-in-out infinite;
}

.mp-perch.is-hot .mp-perch-dots {
  transform: scaleY(1.15);
}

.mp-perch-count {
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  font: 650 10px/1 var(--mp-mono);
  color: var(--mp-ember);
  letter-spacing: 0.02em;
}

@keyframes mp-breathe {
  0%, 100% { opacity: 0.55; transform: scale(0.86); }
  50% { opacity: 1; transform: scale(1.1); }
}

/* ------------------------------------------------------------------- peek */

.mp-peek {
  position: absolute;
  bottom: -34px;
  width: 238px;
  padding: 13px 14px 11px;
  pointer-events: auto;
  border-radius: 16px;
  border: 1px solid var(--mp-line);
  background: color-mix(in oklab, var(--mp-surface-solid) 90%, transparent);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  box-shadow: 0 24px 48px -28px rgba(8, 6, 12, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  animation: mp-peek-in 0.44s var(--mp-ease) both;
}

.mp-peek[data-side="right"] { right: 74px; }
.mp-peek[data-side="left"] { left: 74px; }

.mp-peek-line {
  margin: 0 0 9px;
  font-family: var(--mp-serif);
  font-size: 13.5px;
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: var(--mp-text);
}

.mp-peek-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.mp-peek-open {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  border: 0;
  background: none;
  padding: 3px 0;
  font-size: 11.5px;
  color: var(--mp-ember);
  cursor: pointer;
}

.mp-peek-open:hover { color: var(--mp-ember-deep); }

.mp-peek-tail {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  margin-top: -5px;
  background: inherit;
  border: 1px solid var(--mp-line);
  border-radius: 2px;
  transform: rotate(45deg);
}

.mp-peek[data-side="right"] .mp-peek-tail { right: -6px; border-left: 0; border-bottom: 0; }
.mp-peek[data-side="left"] .mp-peek-tail { left: -6px; border-right: 0; border-top: 0; }

@keyframes mp-peek-in {
  from { opacity: 0; transform: translateY(6px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ------------------------------------------------------------------ panel */

.mp-panel-shell {
  position: absolute;
  pointer-events: auto;
  animation: mp-panel-in 0.5s var(--mp-ease) both;
  transform-origin: var(--mp-origin, 50% 50%);
}

.mp-panel-shell[data-side="left"] { --mp-origin: 100% 70%; }
.mp-panel-shell[data-side="right"] { --mp-origin: 0% 70%; }
.mp-panel-shell[data-side="sheet"] { --mp-origin: 50% 100%; }

.mp-root[data-dragging="true"] .mp-panel-shell {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.16s ease;
}

@keyframes mp-panel-in {
  from { opacity: 0; transform: translateY(10px) scale(0.965); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.mp-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(392px, calc(100vw - 24px));
  height: min(578px, calc(100vh - 28px));
  border-radius: var(--mp-radius);
  border: 1px solid color-mix(in oklab, var(--dsw-alias-border-l1) 96%, transparent);
  background:
    radial-gradient(110% 42% at 50% -8%, rgba(255, 107, 61, 0.03), transparent 66%),
    color-mix(in oklab, var(--dsw-alias-bg-overlay) 86%, transparent);
  backdrop-filter: blur(30px) saturate(170%);
  -webkit-backdrop-filter: blur(30px) saturate(170%);
  box-shadow:
    0 32px 70px -38px rgba(6, 4, 10, 0.52),
    0 4px 14px -6px rgba(6, 4, 10, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.075);
  overflow: hidden;
}

/* header ------------------------------------------------------------- */

.mp-panel::before {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in oklab, var(--mp-ember) 62%, transparent) 32%, color-mix(in oklab, var(--mp-gold) 40%, transparent) 62%, transparent);
  opacity: 0.85;
  pointer-events: none;
}


.mp-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 10px 11px 14px;
  border-bottom: 1px solid var(--mp-line-soft);
  flex: 0 0 auto;
}

.mp-mark {
  position: relative;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 9px;
  background: linear-gradient(150deg, #3a3342, #1a1622);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 10px -6px rgba(0, 0, 0, 0.5);
}

.mp-mark-body {
  display: flex;
  gap: 3.5px;
}

.mp-mark-eye {
  width: 3.6px;
  height: 4.4px;
  border-radius: 50%;
  background: #ffe9dd;
  box-shadow: 0 0 4px rgba(255, 233, 221, 0.6);
}

.mp-id {
  display: flex;
  align-items: baseline;
  gap: 7px;
  min-width: 0;
  flex: 1;
}

.mp-id b {
  font-family: var(--mp-serif);
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.mp-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  color: var(--mp-text-3);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.mp-status::before {
  content: "";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--mp-text-3);
  transition: background 0.3s ease;
}

.mp-status[data-dot="busy"]::before {
  background: var(--mp-ember);
  animation: mp-breathe 1.4s ease-in-out infinite;
}

.mp-head-actions {
  display: flex;
  align-items: center;
  gap: 1px;
}

.mp-icon {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--mp-text-3);
  cursor: pointer;
  transition: color 0.18s ease, background 0.18s ease, transform 0.18s var(--mp-ease);
}

.mp-icon:hover {
  color: var(--mp-text);
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 70%, transparent);
}

.mp-icon:active { transform: scale(0.92); }
.mp-icon.is-on { color: var(--mp-ember); background: color-mix(in oklab, var(--mp-ember) 12%, transparent); }
.mp-icon-danger:hover { color: var(--mp-alert); }

/* search ------------------------------------------------------------- */

.mp-search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 12px 0;
  padding: 8px 11px;
  border-radius: 11px;
  border: 1px solid var(--mp-line);
  background: var(--mp-well);
  color: var(--mp-text-3);
  animation: mp-fade-in 0.24s ease both;
}

.mp-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: none;
  outline: none;
  font-size: 12.5px;
  color: var(--mp-text);
}

.mp-search input::placeholder { color: var(--mp-text-3); }

/* hero --------------------------------------------------------------- */

.mp-hero {
  position: relative;
  padding: 13px 16px 11px 18px;
  flex: 0 0 auto;
}

.mp-hero-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 5px;
}

.mp-eyebrow {
  font: 500 9px/1 var(--mp-mono);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--mp-ember) 82%, var(--mp-text-3));
}

.mp-hero .mp-copy {
  opacity: 0.45;
  transition: opacity 0.2s ease;
  margin-right: -4px;
}

.mp-hero:hover .mp-copy,
.mp-hero:focus-within .mp-copy {
  opacity: 1;
}

.mp-line {
  margin: 0;
  font-family: var(--mp-serif);
  font-size: 15px;
  line-height: 1.52;
  letter-spacing: 0.012em;
  color: var(--mp-text);
  text-wrap: pretty;
  max-height: 70px;
  overflow: auto;
  scrollbar-width: none;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.mp-line::-webkit-scrollbar { display: none; }

.mp-typing {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0;
}

.mp-typing i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--mp-ember);
  opacity: 0.4;
  animation: mp-dot 1.1s ease-in-out infinite;
}

.mp-typing i:nth-child(2) { animation-delay: 0.14s; }
.mp-typing i:nth-child(3) { animation-delay: 0.28s; }

@keyframes mp-dot {
  0%, 100% { opacity: 0.28; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-2.5px); }
}

/* ------------------------------------------------------------- opinion */

.mp-opinion {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  align-items: start;
  gap: 9px;
  margin: 0 12px 4px;
  padding: 8px 8px 8px 9px;
  border-radius: 12px;
  border: 1px solid var(--mp-line-soft);
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--mp-ember) 4%, transparent), transparent 52%),
    color-mix(in oklab, var(--dsw-alias-bg-layer-2) 34%, transparent);
  animation: mp-fade-in 0.4s var(--mp-ease) both;
  flex: 0 0 auto;
}

.mp-opinion[data-tone="alert"] {
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--mp-alert) 6%, transparent), transparent 55%),
    color-mix(in oklab, var(--dsw-alias-bg-layer-2) 30%, transparent);
  border-color: color-mix(in oklab, var(--mp-alert) 24%, var(--mp-line-soft));
}

.mp-op-index {
  padding-top: 1px;
  font: 500 9.5px/16px var(--mp-mono);
  color: var(--mp-text-3);
  letter-spacing: 0.06em;
}

.mp-op-body { min-width: 0; }

.mp-op-label {
  display: block;
  margin-bottom: 1px;
  font: 500 9px/1.4 var(--mp-mono);
  letter-spacing: 0.14em;
  color: var(--mp-text-3);
}

.mp-opinion[data-tone="alert"] .mp-op-label { color: var(--mp-alert); }
.mp-opinion[data-tone="due"] .mp-op-label { color: var(--mp-ember); }

.mp-op-body p {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--mp-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-wrap: pretty;
}

.mp-op-actions {
  display: flex;
  align-items: center;
  gap: 1px;
  margin-top: -1px;
}

.mp-op-next {
  display: grid;
  place-items: center;
  width: 20px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--mp-text-3);
  cursor: pointer;
  transition: color 0.18s ease, background 0.18s ease, transform 0.18s var(--mp-ease);
}

.mp-op-next:hover {
  color: var(--mp-ember);
  background: color-mix(in oklab, var(--mp-ember) 10%, transparent);
  transform: translateX(1px);
}

/* composer ----------------------------------------------------------- */

.mp-composer {
  margin: 8px 12px 6px;
  border-radius: 15px;
  border: 1px solid var(--mp-line);
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-1) 64%, transparent);
  transition: border-color 0.24s ease, box-shadow 0.24s ease, background 0.24s ease;
  flex: 0 0 auto;
}

.mp-composer:focus-within {
  border-color: color-mix(in oklab, var(--mp-ember) 46%, var(--mp-line));
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-1) 82%, transparent);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--mp-ember) 11%, transparent);
}

.mp-input {
  display: block;
  width: 100%;
  min-height: 34px;
  padding: 10px 12px 0;
  border: 0;
  background: none;
  outline: none;
  resize: none;
  font-size: 13px;
  line-height: 1.55;
  color: var(--mp-text);
  overflow: auto;
  scrollbar-width: none;
}

.mp-input::-webkit-scrollbar { display: none; }
.mp-input::placeholder { color: var(--mp-text-3); }

.mp-composer-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 2px 7px 7px 12px;
}

.mp-hint {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 9.5px;
  letter-spacing: 0.01em;
  color: color-mix(in oklab, var(--mp-text-3) 78%, transparent);
}

.mp-send {
  position: relative;
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  flex: 0 0 auto;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(155deg, var(--mp-ember), var(--mp-ember-deep));
  color: #1a0f0a;
  cursor: pointer;
  box-shadow: 0 8px 18px -10px rgba(255, 107, 61, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.34);
  transition: transform 0.22s var(--mp-spring), opacity 0.2s ease, filter 0.2s ease;
}

.mp-send:hover:not(:disabled) { transform: translateY(-1px) scale(1.04); }
.mp-send:active:not(:disabled) { transform: scale(0.94); }
.mp-send:disabled {
  cursor: default;
  background: color-mix(in oklab, var(--mp-text-3) 18%, transparent);
  color: color-mix(in oklab, var(--mp-text-3) 76%, transparent);
  box-shadow: none;
}

.mp-send-ring {
  position: absolute;
  inset: -5px;
  border-radius: 14px;
  border: 1px solid color-mix(in oklab, var(--mp-ember) 40%, transparent);
  opacity: 0;
}

.mp-send:focus-visible .mp-send-ring { opacity: 1; }

/* list --------------------------------------------------------------- */

.mp-error {
  margin: 0 14px 4px;
  padding: 7px 10px;
  border-radius: 9px;
  font-size: 11.5px;
  line-height: 1.45;
  color: var(--mp-alert);
  background: color-mix(in oklab, var(--mp-alert) 9%, transparent);
  border: 1px solid color-mix(in oklab, var(--mp-alert) 22%, transparent);
}

.mp-list-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 8px 18px 6px;
  font: 500 9.5px/1 var(--mp-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mp-text-3);
  flex: 0 0 auto;
}

.mp-list-count { letter-spacing: 0.06em; font-variant-numeric: tabular-nums; }

.mp-list {
  flex: 1 1 auto;
  min-height: 0;
  margin: 0;
  padding: 0 8px 6px;
  list-style: none;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: color-mix(in oklab, var(--mp-text-3) 26%, transparent) transparent;
}

.mp-list::-webkit-scrollbar { width: 6px; }
.mp-list::-webkit-scrollbar-thumb { background: color-mix(in oklab, var(--mp-text-3) 22%, transparent); border-radius: 3px; }

.mp-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 7px 8px 7px 9px;
  border-radius: 12px;
  transition: background 0.18s ease;
  animation: mp-row-in 0.4s var(--mp-ease) both;
}

.mp-row:nth-child(1) { animation-delay: 0.01s; }
.mp-row:nth-child(2) { animation-delay: 0.03s; }
.mp-row:nth-child(3) { animation-delay: 0.05s; }
.mp-row:nth-child(4) { animation-delay: 0.07s; }
.mp-row:nth-child(5) { animation-delay: 0.09s; }
.mp-row:nth-child(6) { animation-delay: 0.11s; }
.mp-row:nth-child(n + 7) { animation-delay: 0.13s; }

.mp-row:hover { background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 46%, transparent); }

.mp-row.is-pinned::before {
  content: "";
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--mp-ember), transparent);
  opacity: 0.7;
}

.mp-check {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  flex: 0 0 auto;
}

.mp-check-ring {
  display: grid;
  place-items: center;
  width: 16.5px;
  height: 16.5px;
  border-radius: 50%;
  border: 1.4px solid color-mix(in oklab, var(--mp-text-3) 52%, transparent);
  color: transparent;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s var(--mp-spring);
}

.mp-check:hover .mp-check-ring {
  border-color: var(--mp-ember);
  transform: scale(1.08);
}

.mp-check[aria-checked="true"] .mp-check-ring {
  background: var(--mp-ember);
  border-color: var(--mp-ember);
  color: #1a0f0a;
}

.mp-check svg { stroke-dasharray: 22; stroke-dashoffset: 22; transition: stroke-dashoffset 0.3s var(--mp-ease); }
.mp-check[aria-checked="true"] svg { stroke-dashoffset: 0; }

.mp-row-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }

.mp-row-title {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 13px;
  line-height: 1.45;
  font-weight: 500;
  letter-spacing: 0.005em;
  color: var(--mp-text);
}

.mp-row-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-wrap: pretty;
}

.mp-row.is-done .mp-row-text {
  color: var(--mp-text-3);
  text-decoration: line-through;
  text-decoration-color: color-mix(in oklab, var(--mp-text-3) 60%, transparent);
  text-decoration-thickness: 1px;
}

.mp-row-edit {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--mp-ember);
  background: none;
  outline: none;
  padding: 1px 0 3px;
  font-size: 13.2px;
  line-height: 1.45;
  color: var(--mp-text);
}

.mp-row-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 10.5px;
  color: var(--mp-text-3);
}

.mp-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 5px 1px 4px;
  border-radius: 5px;
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 66%, transparent);
  font: 500 10px/1.5 var(--mp-mono);
  color: var(--mp-text-3);
  white-space: nowrap;
}

.mp-chip.is-alert {
  color: var(--mp-alert);
  background: color-mix(in oklab, var(--mp-alert) 12%, transparent);
}

.mp-tag {
  color: color-mix(in oklab, var(--mp-ember) 74%, var(--mp-text-3));
  font-size: 10.5px;
}

.mp-meta { font-size: 10.5px; }

.mp-row-actions {
  display: flex;
  align-items: center;
  gap: 0;
  opacity: 0;
  transform: translateX(3px);
  transition: opacity 0.2s ease, transform 0.24s var(--mp-ease);
  flex: 0 0 auto;
}

.mp-row:hover .mp-row-actions,
.mp-row:focus-within .mp-row-actions,
.mp-row.is-pinned .mp-row-actions {
  opacity: 1;
  transform: translateX(0);
}

.mp-row-actions .mp-icon { width: 23px; height: 23px; }
.mp-row-actions .mp-icon.is-on { color: var(--mp-ember); }

/* copy button --------------------------------------------------------- */

.mp-copy {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: var(--mp-text-3);
  font-size: 10.5px;
  line-height: 1.4;
  cursor: pointer;
  transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease;
  white-space: nowrap;
}

.mp-copy:hover {
  color: var(--mp-text);
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 76%, transparent);
  border-color: var(--mp-line-soft);
}

.mp-copy.is-icon { padding: 3px 5px; }

.mp-copy.is-done {
  color: var(--mp-ember);
  border-color: color-mix(in oklab, var(--mp-ember) 30%, transparent);
  background: color-mix(in oklab, var(--mp-ember) 10%, transparent);
}

.mp-copy-icon { display: grid; place-items: center; }

.mp-copy-burst {
  position: absolute;
  inset: -2px;
  border-radius: 9px;
  border: 1px solid var(--mp-ember);
  opacity: 0;
  pointer-events: none;
}

.mp-copy.is-done .mp-copy-burst { animation: mp-burst 0.5s var(--mp-ease); }

@keyframes mp-burst {
  from { opacity: 0.7; transform: scale(0.9); }
  to { opacity: 0; transform: scale(1.22); }
}

/* empty --------------------------------------------------------------- */

.mp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px 18px 24px;
  text-align: center;
  animation: mp-fade-in 0.5s var(--mp-ease) both;
}

.mp-empty-art {
  position: relative;
  width: 46px;
  height: 38px;
  border-radius: 46% 54% 52% 48% / 58% 50% 50% 42%;
  border: 1.4px dashed color-mix(in oklab, var(--mp-text-3) 40%, transparent);
  transform: rotate(-4deg);
}

.mp-empty-art span {
  position: absolute;
  top: 46%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: color-mix(in oklab, var(--mp-text-3) 55%, transparent);
}

.mp-empty-art span:first-child { left: 32%; }
.mp-empty-art span:last-child { right: 32%; }

.mp-empty p {
  margin: 0;
  font-family: var(--mp-serif);
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--mp-text-3);
  max-width: 240px;
}

.mp-starters {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4px;
  border-top: 1px solid var(--mp-line-soft);
}

.mp-starters button {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 4px;
  border: 0;
  border-bottom: 1px solid var(--mp-line-soft);
  background: transparent;
  color: var(--mp-text-2);
  font-size: 11.5px;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, padding 0.24s var(--mp-ease);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mp-starters button span {
  color: var(--mp-ember);
  font-size: 12px;
  line-height: 1;
}

.mp-starters button:hover {
  color: var(--mp-text);
  padding-left: 9px;
  background: color-mix(in oklab, var(--mp-ember) 5%, transparent);
}

/* footer -------------------------------------------------------------- */

.mp-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px 8px 12px;
  border-top: 1px solid var(--mp-line-soft);
  flex: 0 0 auto;
}

.mp-foot-left,
.mp-foot-right { display: flex; align-items: center; gap: 2px; }

.mp-text-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border: 0;
  border-radius: 7px;
  background: none;
  color: var(--mp-text-3);
  font-size: 10.5px;
  cursor: pointer;
  transition: color 0.18s ease, background 0.18s ease;
}

.mp-text-btn:hover { color: var(--mp-text); background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 70%, transparent); }
.mp-text-btn.mp-quiet { color: color-mix(in oklab, var(--mp-text-3) 70%, transparent); }
.mp-text-btn.mp-quiet:hover { color: var(--mp-text-2); }

.mp-kbd {
  margin-left: 4px;
  padding: 2px 5px;
  border-radius: 5px;
  border: 1px solid var(--mp-line-soft);
  font: 500 9.5px/1.4 var(--mp-mono);
  color: color-mix(in oklab, var(--mp-text-3) 80%, transparent);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

/* settings ------------------------------------------------------------ */

.mp-settings { height: auto; max-height: min(566px, calc(100vh - 28px)); }

.mp-set-body { display: flex; flex-direction: column; gap: 14px; padding: 16px 18px 18px; overflow: auto; }

.mp-field { display: flex; flex-direction: column; gap: 6px; }
.mp-field span { font: 500 9.5px/1 var(--mp-mono); letter-spacing: 0.14em; text-transform: uppercase; color: var(--mp-text-3); }

.mp-field input {
  padding: 8px 10px;
  border-radius: 9px;
  border: 1px solid var(--mp-line);
  background: var(--mp-well);
  outline: none;
  font-size: 13px;
  color: var(--mp-text);
}

.mp-field input:focus { border-color: color-mix(in oklab, var(--mp-ember) 50%, var(--mp-line)); }

.mp-switch { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.mp-switch span { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.mp-switch b { font-size: 12.5px; font-weight: 500; }
.mp-switch small { font-size: 10.5px; color: var(--mp-text-3); }
.mp-switch input { position: absolute; opacity: 0; pointer-events: none; }

.mp-switch i {
  position: relative;
  width: 34px;
  height: 20px;
  border-radius: 10px;
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 90%, transparent);
  border: 1px solid var(--mp-line);
  transition: background 0.24s ease, border-color 0.24s ease;
  flex: 0 0 auto;
}

.mp-switch i::after {
  content: "";
  position: absolute;
  left: 2px;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--mp-text-3);
  transition: transform 0.26s var(--mp-spring), background 0.24s ease;
}

.mp-switch input:checked + i { background: color-mix(in oklab, var(--mp-ember) 26%, transparent); border-color: color-mix(in oklab, var(--mp-ember) 50%, transparent); }
.mp-switch input:checked + i::after { transform: translateX(14px); background: var(--mp-ember); }

.mp-set-meta { display: flex; flex-direction: column; gap: 4px; font-size: 10.5px; color: var(--mp-text-3); }
.mp-set-meta p { margin: 0; }
.mp-set-meta code { font-family: var(--mp-mono); font-size: 10px; word-break: break-all; color: var(--mp-text-2); }
.mp-warn { color: var(--mp-alert); }

.mp-danger {
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklab, var(--mp-alert) 30%, transparent);
  background: color-mix(in oklab, var(--mp-alert) 8%, transparent);
  color: var(--mp-alert);
  font-size: 11px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.mp-danger:hover { background: color-mix(in oklab, var(--mp-alert) 16%, transparent); }

.mp-loading { display: grid; place-items: center; }

/* toast --------------------------------------------------------------- */

.mp-toast {
  position: fixed;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px 8px 14px;
  border-radius: 11px;
  border: 1px solid var(--mp-line);
  background: color-mix(in oklab, var(--mp-surface-solid) 92%, transparent);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  box-shadow: 0 18px 40px -24px rgba(6, 4, 10, 0.6);
  pointer-events: auto;
  font-size: 11.5px;
  color: var(--mp-text-2);
  animation: mp-toast-in 0.4s var(--mp-ease) both;
  z-index: 2;
}

.mp-toast[data-tone="calm"] { color: var(--mp-text-2); }

.mp-toast button {
  padding: 3px 7px;
  border-radius: 6px;
  border: 0;
  background: color-mix(in oklab, var(--mp-ember) 14%, transparent);
  color: var(--mp-ember);
  font-size: 11px;
  cursor: pointer;
}

@keyframes mp-toast-in {
  from { opacity: 0; transform: translate(-50%, 8px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes mp-row-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes mp-fade-in {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --------------------------------------------------------- reduced motion */

@media (prefers-reduced-motion: reduce) {
  .mp-root *,
  .mp-root *::before,
  .mp-root *::after {
    animation-duration: 0.001ms !important;
    animation-delay: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    transition-delay: 0.001ms !important;
  }

  .mp-body { animation: none; }
}

/* ------------------------------------------------------------- narrow view */

@media (max-width: 719px) {
  .mp-panel {
    width: calc(100vw - 20px);
    height: min(70vh, 560px);
    border-radius: 20px;
  }

  .mp-peek { width: min(244px, calc(100vw - 118px)); }
  .mp-hint { max-width: 150px; }
  .mp-kbd { display: none; }
}

/* light theme: the creature keeps its ink, the paper gets warmer */
@media (prefers-color-scheme: light) {
  .mp-body {
    background:
      radial-gradient(74% 56% at 50% 102%, rgba(255, 107, 61, 0.34), transparent 68%),
      radial-gradient(96% 96% at 30% 16%, #514a58 0%, #2c2633 44%, #17131b 100%);
  }
}
`;var u=me(require("react"),1),xt={fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round",strokeLinejoin:"round"};function $({name:e,size:a=15,...i}){let o={width:a,height:a,viewBox:"0 0 20 20","aria-hidden":"true",...xt,...i};switch(e){case"send":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"M4.5 10h11M11 5.5 15.5 10 11 14.5"}));case"search":return u.default.createElement("svg",{...o},u.default.createElement("circle",{cx:"9",cy:"9",r:"4.6"}),u.default.createElement("path",{d:"m12.6 12.6 3 3"}));case"copy":return u.default.createElement("svg",{...o},u.default.createElement("rect",{x:"7",y:"7",width:"8.5",height:"8.5",rx:"2"}),u.default.createElement("path",{d:"M12.5 5.2V5a1.6 1.6 0 0 0-1.6-1.6H5.6A1.6 1.6 0 0 0 4 5v5.3c0 .9.7 1.6 1.6 1.6h.2"}));case"check":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"m4.8 10.4 3.4 3.4 7-7.6"}));case"pin":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"M7.2 3.6h5.6l-.7 4.2 2.4 2.5H5.5l2.4-2.5z"}),u.default.createElement("path",{d:"M10 10.3v6"}));case"trash":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"M4.4 6.2h11.2M8 6.2V4.6c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v1.6M6.4 6.2l.6 9c0 .6.5 1 1 1h4c.5 0 1-.4 1-1l.6-9"}));case"minus":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"M5 10h10"}));case"close":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"m5.6 5.6 8.8 8.8M14.4 5.6l-8.8 8.8"}));case"spark":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"M10 3.4c.6 3 1.9 4.3 4.9 4.9-3 .6-4.3 1.9-4.9 4.9-.6-3-1.9-4.3-4.9-4.9 3-.6 4.3-1.9 4.9-4.9Z"}),u.default.createElement("path",{d:"M15.2 13.4c.3 1.4.9 2 2.3 2.3-1.4.3-2 .9-2.3 2.3-.3-1.4-.9-2-2.3-2.3 1.4-.3 2-.9 2.3-2.3Z"}));case"clock":return u.default.createElement("svg",{...o},u.default.createElement("circle",{cx:"10",cy:"10",r:"6.4"}),u.default.createElement("path",{d:"M10 6.4V10l2.6 1.6"}));case"inbox":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"M3.6 10.4 6 4.6h8l2.4 5.8v4.2c0 .6-.4 1-1 1H4.6c-.6 0-1-.4-1-1z"}),u.default.createElement("path",{d:"M3.8 10.6h3l.8 1.8h4.8l.8-1.8h3"}));case"edit":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"m12.4 4.6 3 3L8 15H5v-3z"}));case"arrow":return u.default.createElement("svg",{...o},u.default.createElement("path",{d:"M7 4.8 12.2 10 7 15.2"}));default:return u.default.createElement("svg",{...o},u.default.createElement("circle",{cx:"10",cy:"10",r:"6"}))}}async function he(e){let a=String(e??"");if(!a)return!1;try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(a),!0}catch{}try{let i=document.createElement("textarea");i.value=a,i.setAttribute("readonly",""),i.style.cssText="position:fixed;top:-1000px;opacity:0",document.body.append(i),i.select();let o=document.execCommand("copy");return i.remove(),o}catch{return!1}}function ne({text:e,label:a="复制",doneLabel:i="已复制",className:o="",title:l,iconOnly:p=!1,onCopied:f}){let[y,g]=(0,u.useState)("idle"),M=(0,u.useRef)(0);(0,u.useEffect)(()=>()=>clearTimeout(M.current),[]);let T=(0,u.useCallback)(async A=>{A.stopPropagation();let B=await he(typeof e=="function"?e():e);g(B?"done":"fail"),B&&f?.(),clearTimeout(M.current),M.current=setTimeout(()=>g("idle"),1600)},[e,f]),E=y==="done";return u.default.createElement("button",{type:"button",className:`mp-copy ${E?"is-done":""} ${p?"is-icon":""} ${o}`,onClick:T,title:l??a,"aria-label":l??a,"data-state":y},u.default.createElement("span",{className:"mp-copy-icon"},E?u.default.createElement($,{name:"check",size:13}):u.default.createElement($,{name:"copy",size:13})),p?null:u.default.createElement("span",{className:"mp-copy-label"},E?i:y==="fail"?"复制失败":a),u.default.createElement("span",{className:"mp-copy-burst","aria-hidden":"true"}))}function Ye(e,a=Date.now()){let o=new Date(a);o.setHours(0,0,0,0);let l=new Date(e);l.setHours(0,0,0,0);let p=Math.round((l-o)/864e5);if(p===0)return"今天";if(p===-1)return"昨天";if(p===1)return"明天";if(p<0&&p>-7)return`${-p} 天前`;let f=new Date(e);return`${f.getMonth()+1} 月 ${f.getDate()} 日`}function fe(e){let a=(0,u.useRef)(e);return a.current=e,a}var d=me(require("react"),1),de={stiffness:168,damping:21,mass:1},ve=132,De={right:74,bottom:150},I=(e,a,i)=>Math.min(i,Math.max(a,e)),O=()=>typeof performance<"u"?performance.now():Date.now();function ut(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Le({onDragChange:e,onSettle:a,initial:i}){let o=(0,d.useRef)(null),l=(0,d.useRef)(null),p=(0,d.useRef)({x:0,y:0,vx:0,vy:0,tx:0,ty:0,lean:0,eyeX:0,eyeY:0,blink:0,nextBlink:0,dragging:!1,grabX:0,grabY:0,pointerX:0,pointerY:0,lastInput:O(),wakeUntil:0,mood:"idle",moodUntil:0,ready:!1,landing:0}).current,f=(0,d.useCallback)((x,c)=>{p.x=x,p.y=c,p.tx=x,p.ty=c,p.vx=0,p.vy=0,o.current&&(o.current.style.transform=`translate3d(${x}px, ${c}px, 0)`)},[p]),y=(0,d.useCallback)((x,c)=>{p.tx=I(x,58,window.innerWidth-58),p.ty=I(c,60,window.innerHeight-54)},[p]),g=(0,d.useCallback)(()=>{p.lastInput=O()},[p]),M=(0,d.useCallback)((x="happy",c=900)=>{p.mood=x,p.moodUntil=O()+c},[p]),T=(0,d.useCallback)((x,c=0)=>{p.mood=x,p.moodUntil=c?O()+c:0},[p]);(0,d.useEffect)(()=>{let x=i?.x??window.innerWidth-De.right-ve/2,c=i?.y??window.innerHeight-De.bottom-ve/2;f(I(x,58,window.innerWidth-58),I(c,60,window.innerHeight-54))},[i,f]),(0,d.useEffect)(()=>{if(ut()){let k=l.current;k&&(k.style.setProperty("--mp-eye-x","0px"),k.style.setProperty("--mp-eye-y","0px"));return}let x=0,c=O(),b=!0,j=()=>{if(!b)return;let k=O(),D=Math.min(.034,Math.max(.001,(k-c)/1e3));c=k;let n=p,z=l.current,V=o.current;if(n.dragging){let K=1-Math.pow(.0016,D);n.x+=(n.tx-n.x)*K,n.y+=(n.ty-n.y)*K}else{let K=(n.tx-n.x)*de.stiffness-n.vx*de.damping,ue=(n.ty-n.y)*de.stiffness-n.vy*de.damping;n.vx+=K*D,n.vy+=ue*D,n.x+=n.vx*D,n.y+=n.vy*D;let v=58,W=window.innerWidth-58,se=60,_=window.innerHeight-54;n.x<v&&(n.x=v,n.vx=Math.abs(n.vx)*.42),n.x>W&&(n.x=W,n.vx=-Math.abs(n.vx)*.42),n.y<se&&(n.y=se,n.vy=Math.abs(n.vy)*.42),n.y>_&&(n.y=_,n.vy=-Math.abs(n.vy)*.42)}if(V&&(V.style.transform=`translate3d(${n.x}px, ${n.y}px, 0)`),!z){x=requestAnimationFrame(j);return}let q=Math.hypot(n.vx,n.vy),L=k-n.lastInput;n.moodUntil&&k>n.moodUntil&&(n.mood="idle",n.moodUntil=0),n.mood==="idle"&&(L<60?n.mood="listening":L>32e3&&!n.dragging?n.mood="dozing":L>9e3&&(n.mood="idle"));let S=(n.pointerX||n.x)-n.x,X=(n.pointerY||n.y)-n.y,U=Math.max(1,Math.hypot(S,X)),F=I(S/U*Math.min(3.6,U/26),-3.6,3.6),w=I(X/U*Math.min(2.8,U/30),-2.8,2.8),ie=Math.sin(k/3400)*.9,oe=Math.cos(k/4100)*.6;n.eyeX+=(F+ie-n.eyeX)*Math.min(1,D*9),n.eyeY+=(w+oe-n.eyeY)*Math.min(1,D*9);let R=I(n.vx*.012,-7.5,7.5);n.lean+=(R-n.lean)*Math.min(1,D*7),n.nextBlink||(n.nextBlink=k+2200+Math.random()*3200);let J=0;if(k>n.nextBlink){let K=(k-n.nextBlink)/150;J=K<.5?K*2:Math.max(0,2-K*2),K>=1&&(n.nextBlink=k+2400+Math.random()*4200,J=0)}let G=I(q/1400,0,.11),ee=Math.sin(k/2400)*.5+.5,C=I(-n.vx*.016,-12,12),xe=I(-n.vx*.006+Math.sin(k/1700)*1.6,-7,7);z.style.setProperty("--mp-lean",`${(n.lean+Math.sin(k/3e3)*.8).toFixed(2)}deg`),z.style.setProperty("--mp-squash",G.toFixed(3)),z.style.setProperty("--mp-eye-x",`${n.eyeX.toFixed(2)}px`),z.style.setProperty("--mp-eye-y",`${n.eyeY.toFixed(2)}px`),z.style.setProperty("--mp-blink",J.toFixed(3)),z.style.setProperty("--mp-breath",ee.toFixed(3)),z.style.setProperty("--mp-tail",`${C.toFixed(2)}px`),z.style.setProperty("--mp-antenna",`${xe.toFixed(2)}deg`),z.dataset.mood=n.dragging?"held":n.mood,x=requestAnimationFrame(j)};x=requestAnimationFrame(j);let Y=()=>{document.hidden?(cancelAnimationFrame(x),x=0):x||(c=O(),x=requestAnimationFrame(j))};return document.addEventListener("visibilitychange",Y),()=>{b=!1,cancelAnimationFrame(x),document.removeEventListener("visibilitychange",Y)}},[p]),(0,d.useEffect)(()=>{let x=c=>{p.pointerX=c.clientX,p.pointerY=c.clientY,p.lastInput=O()};return window.addEventListener("pointermove",x,{passive:!0}),()=>window.removeEventListener("pointermove",x)},[p]);let E=(0,d.useCallback)(x=>{if(x.button!==0)return;let c=p;c.dragging=!0,c.grabX=(c.pointerX||x.clientX)-c.x,c.grabY=(c.pointerY||x.clientY)-c.y,c.lastInput=O(),x.currentTarget.setPointerCapture?.(x.pointerId),e?.(!0)},[p,e]),A=(0,d.useCallback)(x=>{let c=p;c.dragging&&(c.tx=I(x.clientX-c.grabX,58,window.innerWidth-58),c.ty=I(x.clientY-c.grabY,60,window.innerHeight-54),c.pointerX=x.clientX,c.pointerY=x.clientY)},[p]),B=(0,d.useCallback)(x=>{let c=p;if(!c.dragging)return;c.dragging=!1,x.currentTarget.releasePointerCapture?.(x.pointerId);let b={x:c.x+c.vx*.13,y:c.y+c.vy*.13},j=window.innerWidth;b.x>j-110?b.x=j-70:b.x<110&&(b.x=70),y(b.x,b.y),e?.(!1),c.lastInput=O(),a?.({x:Math.round(c.tx),y:Math.round(c.ty)})},[p,e,a,y]);return{float:o,creature:l,rig:p,place:f,setTarget:y,wake:g,pulse:M,setMood:T,onPointerDown:E,onPointerMove:A,onPointerUp:B}}function Ae({rig:e,size:a=ve}){return d.default.createElement("div",{ref:e.creature,className:"mp-creature",style:{width:a,height:a},"data-mood":"idle",role:"img","aria-label":"备忘精灵阿墨"},d.default.createElement("div",{className:"mp-aura","aria-hidden":"true"}),d.default.createElement("svg",{className:"mp-orbit",viewBox:"0 0 132 132","aria-hidden":"true"},d.default.createElement("ellipse",{className:"mp-ring",cx:"66",cy:"68",rx:"57",ry:"21",transform:"rotate(-15 66 68)"}),d.default.createElement("g",{className:"mp-mote mp-mote-a"},d.default.createElement("circle",{cx:"123",cy:"68",r:"1.7"})),d.default.createElement("g",{className:"mp-mote mp-mote-b"},d.default.createElement("circle",{cx:"112",cy:"68",r:"1.2"}))),d.default.createElement("svg",{className:"mp-thread",viewBox:"0 0 132 132","aria-hidden":"true"},d.default.createElement("g",{className:"mp-antenna"},d.default.createElement("path",{d:"M66 37c1.2-7.4 3.6-12.6 8.4-16.2"}),d.default.createElement("circle",{cx:"75.4",cy:"19.4",r:"3.4",className:"mp-tip"}),d.default.createElement("circle",{cx:"75.4",cy:"19.4",r:"7",className:"mp-tip-halo"})),d.default.createElement("g",{className:"mp-ribbon"},d.default.createElement("path",{d:"M84 94c9.4 3 15.6 9.4 18.6 19",className:"mp-r1"}),d.default.createElement("path",{d:"M88 101c6.2 2 10.4 6 12.4 12.4",className:"mp-r2"}))),d.default.createElement("div",{className:"mp-body"},d.default.createElement("div",{className:"mp-gloss","aria-hidden":"true"}),d.default.createElement("div",{className:"mp-rim","aria-hidden":"true"}),d.default.createElement("div",{className:"mp-face"},d.default.createElement("div",{className:"mp-eye mp-eye-left"},d.default.createElement("i",null)),d.default.createElement("div",{className:"mp-eye mp-eye-right"},d.default.createElement("i",null)),d.default.createElement("div",{className:"mp-cheek mp-cheek-left","aria-hidden":"true"}),d.default.createElement("div",{className:"mp-cheek mp-cheek-right","aria-hidden":"true"}),d.default.createElement("div",{className:"mp-mouth","aria-hidden":"true"}))),d.default.createElement("div",{className:"mp-zzz","aria-hidden":"true"},d.default.createElement("span",null,"z"),d.default.createElement("span",null,"z")))}function Xe({edge:e="right",top:a=.42,count:i=0,onPeek:o,onOpen:l,expanded:p,label:f}){let[y,g]=(0,d.useState)(!1),M=(0,d.useRef)(0);(0,d.useEffect)(()=>()=>clearTimeout(M.current),[]);let T=()=>{clearTimeout(M.current),g(!0),o?.(!0)},E=()=>{clearTimeout(M.current),M.current=setTimeout(()=>{g(!1),o?.(!1)},260)};return d.default.createElement("button",{type:"button",className:`mp-perch is-${e} ${y||p?"is-hot":""}`,style:{top:`calc(${(a*100).toFixed(2)}% - 46px)`},onPointerEnter:T,onPointerLeave:E,onFocus:T,onBlur:E,onClick:l,"aria-label":f??"打开备忘精灵",title:`${f??"备忘精灵"} · ${i} 条`},d.default.createElement("span",{className:"mp-perch-rail","aria-hidden":"true"}),d.default.createElement("span",{className:"mp-perch-dots","aria-hidden":"true"},d.default.createElement("i",null),d.default.createElement("i",null),d.default.createElement("i",null)),i>0?d.default.createElement("span",{className:"mp-perch-count","aria-hidden":"true"},i>99?"99+":i):null)}var t=me(require("react"),1);function bt(e,a){if(!e)return"";let i=new Date(e),o=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}`,l=Math.round((new Date(e).setHours(0,0,0,0)-new Date(a).setHours(0,0,0,0))/864e5);return l===0?`今天 ${o}`:l===1?`明天 ${o}`:l===-1?`昨天 ${o}`:l>1&&l<7?`周${"日一二三四五六"[i.getDay()]} ${o}`:`${i.getMonth()+1}/${i.getDate()} ${o}`}function Fe(){return t.default.createElement("span",{className:"mp-mark","aria-hidden":"true"},t.default.createElement("span",{className:"mp-mark-body"},t.default.createElement("i",{className:"mp-mark-eye"}),t.default.createElement("i",{className:"mp-mark-eye"})))}function gt({memo:e,now:a,onToggle:i,onRemove:o,onPin:l,onEdit:p,busy:f}){let[y,g]=(0,t.useState)(!1),[M,T]=(0,t.useState)(e.title),E=(0,t.useRef)(null);(0,t.useEffect)(()=>{if(y){let b=E.current;b?.focus(),b?.setSelectionRange(b.value.length,b.value.length)}},[y]);let A=(0,t.useCallback)(()=>{let b=M.trim();g(!1),b&&b!==e.title?p(e,b):T(e.title)},[M,e,p]),B=!e.done&&e.dueAt&&e.dueAt<a-6e4,x=e.dueAt?bt(e.dueAt,a):"",c=[e.title,e.body,x,e.tags.map(b=>`#${b}`).join(" ")].filter(Boolean).join(" · ");return t.default.createElement("li",{className:`mp-row ${e.done?"is-done":""} ${e.pinned?"is-pinned":""}`,"data-id":e.id},y?null:t.default.createElement("button",{type:"button",className:"mp-check",role:"checkbox","aria-checked":e.done,"aria-label":e.done?"标回未完成":"标成完成",onClick:()=>i(e),disabled:f},t.default.createElement("span",{className:"mp-check-ring"},t.default.createElement($,{name:"check",size:11}))),t.default.createElement("div",{className:"mp-row-main"},y?t.default.createElement("input",{ref:E,className:"mp-row-edit",value:M,onChange:b=>T(b.target.value),onBlur:A,onKeyDown:b=>{b.key==="Enter"&&(b.preventDefault(),A()),b.key==="Escape"&&(T(e.title),g(!1))}}):t.default.createElement("button",{type:"button",className:"mp-row-title",onDoubleClick:()=>g(!0),title:`${e.body?e.body+" · ":""}双击改标题`},t.default.createElement("span",{className:"mp-row-text"},e.title)),t.default.createElement("div",{className:"mp-row-meta"},x?t.default.createElement("span",{className:`mp-chip ${B?"is-alert":""}`},t.default.createElement($,{name:"clock",size:11}),x):null,e.tags.map(b=>t.default.createElement("span",{key:b,className:"mp-tag"},"#",b)),!x&&!e.tags.length?t.default.createElement("span",{className:"mp-meta"},Ye(e.createdAt,a)):null)),t.default.createElement("div",{className:"mp-row-actions"},t.default.createElement(ne,{text:c,iconOnly:!0,label:"复制这条"}),t.default.createElement("button",{type:"button",className:`mp-icon ${e.pinned?"is-on":""}`,onClick:()=>l(e),"aria-label":e.pinned?"取消钉住":"钉住",title:e.pinned?"取消钉住":"钉住"},t.default.createElement($,{name:"pin",size:13})),t.default.createElement("button",{type:"button",className:"mp-icon mp-icon-danger",onClick:()=>o(e),"aria-label":"删除这条",title:"删除这条"},t.default.createElement($,{name:"trash",size:13}))))}function ht({draft:e,setDraft:a,onSend:i,busy:o,placeholder:l,hint:p}){let f=(0,t.useRef)(null),y=(0,t.useCallback)(()=>{let g=f.current;g&&(g.style.height="auto",g.style.height=`${Math.min(96,g.scrollHeight)}px`)},[]);return(0,t.useEffect)(y,[e,y]),t.default.createElement("form",{className:"mp-composer",onSubmit:g=>{g.preventDefault(),i()}},t.default.createElement("textarea",{ref:f,className:"mp-input",rows:1,value:e,placeholder:l,spellCheck:!1,onChange:g=>a(g.target.value),onKeyDown:g=>{g.key==="Enter"&&!g.shiftKey&&!g.nativeEvent.isComposing&&(g.preventDefault(),i())}}),t.default.createElement("div",{className:"mp-composer-foot"},t.default.createElement("span",{className:"mp-hint"},p),t.default.createElement("button",{className:"mp-send",type:"submit",disabled:!e.trim()||o,"aria-label":"发送"},t.default.createElement("span",{className:"mp-send-ring","aria-hidden":"true"}),t.default.createElement($,{name:"send",size:15}))))}function ft({items:e,now:a}){let[i,o]=(0,t.useState)(0);if((0,t.useEffect)(()=>{i>=e.length&&o(0)},[e.length,i]),!e.length)return null;let l=e[i%e.length];return t.default.createElement("div",{className:"mp-opinion","data-tone":l.tone},t.default.createElement("span",{className:"mp-op-index","aria-hidden":"true"},String(i%e.length+1).padStart(2,"0")),t.default.createElement("div",{className:"mp-op-body"},t.default.createElement("span",{className:"mp-op-label"},l.label),t.default.createElement("p",null,l.line)),t.default.createElement("div",{className:"mp-op-actions"},t.default.createElement(ne,{text:l.copy,label:"复制",doneLabel:"已复制"}),e.length>1?t.default.createElement("button",{type:"button",className:"mp-op-next",onClick:()=>o(p=>(p+1)%e.length),"aria-label":"换一条意见",title:"换一条"},t.default.createElement($,{name:"arrow",size:12})):null))}function He({data:e,placement:a,line:i,thinking:o,suggestions:l,busy:p,error:f,draft:y,setDraft:g,onSend:M,onClose:T,onToggle:E,onRemove:A,onPin:B,onEdit:x,onCopyAll:c,onClearDone:b,onReset:j,search:Y,setSearch:k,onSettings:D}){let n=e.now??Date.now(),z=e.memos??[],V=z.filter(w=>!w.done),q=z.filter(w=>w.done),L=Y.trim().toLowerCase(),S=L?z.filter(w=>`${w.title} ${w.body} ${w.tags.join(" ")}`.toLowerCase().includes(L)):z,[X,U]=(0,t.useState)(!1),F=(0,t.useRef)(null);return(0,t.useEffect)(()=>{X&&F.current?.focus()},[X]),t.default.createElement("section",{className:"mp-panel","data-side":a.side,"aria-label":"备忘精灵"},t.default.createElement("header",{className:"mp-head"},t.default.createElement(Fe,null),t.default.createElement("div",{className:"mp-id"},t.default.createElement("b",null,e.pet?.name??"阿墨"),t.default.createElement("span",{className:"mp-status","data-dot":o?"busy":"idle"},o?"在想":e.stats?.open?`${e.stats.open} 条待办`:"清单是空的")),t.default.createElement("div",{className:"mp-head-actions"},t.default.createElement("button",{type:"button",className:`mp-icon ${X?"is-on":""}`,onClick:()=>{U(w=>!w),X&&k("")},"aria-label":"搜索备忘",title:"搜索"},t.default.createElement($,{name:"search",size:14})),t.default.createElement("button",{type:"button",className:"mp-icon",onClick:D,"aria-label":"宠物设置",title:"设置"},t.default.createElement($,{name:"spark",size:14})),t.default.createElement("button",{type:"button",className:"mp-icon",onClick:T,"aria-label":"收起",title:"收起（Esc）"},t.default.createElement($,{name:"close",size:14})))),X?t.default.createElement("div",{className:"mp-search"},t.default.createElement($,{name:"search",size:13}),t.default.createElement("input",{ref:F,value:Y,placeholder:"搜标题、正文或标签",onChange:w=>k(w.target.value),onKeyDown:w=>{w.key==="Escape"&&(U(!1),k(""))}})):null,t.default.createElement("div",{className:"mp-hero"},t.default.createElement("div",{className:"mp-hero-head"},t.default.createElement("span",{className:"mp-eyebrow"},"阿墨说"),!o&&i?t.default.createElement(ne,{text:i,label:"复制",doneLabel:"已复制"}):null),o?t.default.createElement("span",{className:"mp-typing","aria-label":"正在想"},t.default.createElement("i",null),t.default.createElement("i",null),t.default.createElement("i",null)):t.default.createElement("p",{className:"mp-line"},i)),l.length&&!X?t.default.createElement(ft,{items:l.slice(0,3),now:n}):null,t.default.createElement(ht,{draft:y,setDraft:g,onSend:M,busy:p,placeholder:"记一句，或者问我…",hint:"Enter 记下 · 支持「明天 18:00」「#标签」"}),f?t.default.createElement("p",{className:"mp-error",role:"status"},f):null,t.default.createElement("div",{className:"mp-list-head"},t.default.createElement("span",null,L?`搜索「${Y.trim()}」`:"清单"),t.default.createElement("span",{className:"mp-list-count"},L?`${S.length} 条结果`:`${V.length} 条`)),t.default.createElement("ul",{className:"mp-list"},S.length===0?t.default.createElement("li",{className:"mp-empty"},t.default.createElement("div",{className:"mp-empty-art","aria-hidden":"true"},t.default.createElement("span",null),t.default.createElement("span",null)),t.default.createElement("p",null,L?"没搜到。换个词试试？":"还没有备忘。说一句，我替你记着。"),L?null:t.default.createElement("div",{className:"mp-starters"},(e.starters??[]).slice(0,3).map(w=>t.default.createElement("button",{key:w,type:"button",onClick:()=>g(w)},t.default.createElement("span",{"aria-hidden":"true"},"＋"),w)))):S.map(w=>t.default.createElement(gt,{key:w.id,memo:w,now:n,busy:p,onToggle:E,onRemove:A,onPin:B,onEdit:x}))),t.default.createElement("footer",{className:"mp-foot"},t.default.createElement("div",{className:"mp-foot-left"},t.default.createElement("button",{type:"button",className:"mp-text-btn",onClick:c},t.default.createElement($,{name:"copy",size:12}),"复制清单"),q.length?t.default.createElement("button",{type:"button",className:"mp-text-btn",onClick:b},"清掉已完成 ",q.length):null),t.default.createElement("div",{className:"mp-foot-right"},t.default.createElement("button",{type:"button",className:"mp-text-btn mp-quiet",onClick:j},"重开对话"),t.default.createElement("kbd",{className:"mp-kbd"},"⌘⇧M"))))}function Ie({line:e,side:a,onEnter:i,onLeave:o,onOpen:l,count:p}){return t.default.createElement("div",{className:"mp-peek","data-side":a,onPointerEnter:i,onPointerLeave:o},t.default.createElement("p",{className:"mp-peek-line"},e),t.default.createElement("div",{className:"mp-peek-foot"},t.default.createElement(ne,{text:e,label:"复制",doneLabel:"已复制"}),t.default.createElement("button",{type:"button",className:"mp-peek-open",onClick:l},p?`看这 ${p} 条`:"打开"," ",t.default.createElement($,{name:"arrow",size:12}))),t.default.createElement("span",{className:"mp-peek-tail","aria-hidden":"true"}))}function Be({data:e,onClose:a,onRename:i,onQuiet:o,onClearAll:l}){let[p,f]=(0,t.useState)(e.pet?.name??"阿墨");return t.default.createElement("section",{className:"mp-panel mp-settings","aria-label":"宠物设置"},t.default.createElement("header",{className:"mp-head"},t.default.createElement(Fe,null),t.default.createElement("div",{className:"mp-id"},t.default.createElement("b",null,"阿墨"),t.default.createElement("span",{className:"mp-status"},"设置")),t.default.createElement("div",{className:"mp-head-actions"},t.default.createElement("button",{type:"button",className:"mp-icon",onClick:a,"aria-label":"关闭"},t.default.createElement($,{name:"close",size:14})))),t.default.createElement("div",{className:"mp-set-body"},t.default.createElement("label",{className:"mp-field"},t.default.createElement("span",null,"名字"),t.default.createElement("input",{value:p,maxLength:12,onChange:y=>f(y.target.value),onBlur:()=>i(p),onKeyDown:y=>{y.key==="Enter"&&i(p)}})),t.default.createElement("label",{className:"mp-switch"},t.default.createElement("span",null,t.default.createElement("b",null,"安静模式"),t.default.createElement("small",null,"藏起来，不主动冒出来说话")),t.default.createElement("input",{type:"checkbox",checked:e.pet?.quiet===!0,onChange:y=>o(y.target.checked)}),t.default.createElement("i",{"aria-hidden":"true"})),t.default.createElement("div",{className:"mp-set-meta"},t.default.createElement("p",null,"备忘存在 ",t.default.createElement("code",null,e.directory)),t.default.createElement("p",null,e.stats?.open??0," 条待办 · 共 ",e.stats?.total??0," 条 · 对话 ",e.chat?.turns??0," 轮"),e.hasModel?null:t.default.createElement("p",{className:"mp-warn"},"还没选默认模型，阿墨只能记录、不能答话。")),t.default.createElement("button",{type:"button",className:"mp-danger",onClick:l},"清空全部备忘与对话")))}function je({toast:e,onUndo:a}){return e?t.default.createElement("div",{className:"mp-toast",role:"status","data-tone":e.tone??"calm"},t.default.createElement("span",null,e.text),e.undo?t.default.createElement("button",{type:"button",onClick:()=>{a(e.undo)}},"撤销"):null):null}var Oe=["slots","remote"],vt=Oe,Ke=700,_e=66,yt={width:392,height:566},wt=45e3;function ce(){return{w:window.innerWidth,h:window.innerHeight}}function kt(e,a,i,o,l){if(o<720)return{side:"sheet",x:10,y:Math.max(10,l-i.height-10)};let p=e>o/2?"left":"right",f=p==="left"?e-_e-20-i.width:e+_e+20,y=Math.min(Math.max(12,f),Math.max(12,o-i.width-12)),g=Math.min(Math.max(14,a-i.height+152),Math.max(14,l-i.height-14));return{side:p,x:y,y:g}}function ye(e,a,i){return e==="left"?{x:70,y:i-170}:{x:a-70,y:i-170}}function Nt(e){return async function(i){let o;try{o=await e.remote[ae].request(i)}catch(p){throw Object.assign(new Error(p?.message||"连接中断，请稍后再试。"),{code:p?.code||"transport"})}let l=o?.ok?o?.value?.error:o?.value?.error??o?.error??{};if(!o?.ok||l)throw Object.assign(new Error(l?.message||"操作没完成，再试一次。"),{code:l?.code||"unavailable"});return o.value}}function Mt({request:e}){let[a,i]=(0,s.useState)(null),[o,l]=(0,s.useState)(!1),[p,f]=(0,s.useState)(!1),[y,g]=(0,s.useState)(!1),[M,T]=(0,s.useState)(null),[E,A]=(0,s.useState)(""),[B,x]=(0,s.useState)(!1),[c,b]=(0,s.useState)(""),[j,Y]=(0,s.useState)(""),[k,D]=(0,s.useState)(null),[n,z]=(0,s.useState)(!1),[V,q]=(0,s.useState)(""),[L,S]=(0,s.useState)(!1),[X,U]=(0,s.useState)(yt),[F,w]=(0,s.useState)(()=>ce()),ie=(0,s.useRef)(null),oe=(0,s.useRef)(0),R=(0,s.useRef)(0),J=(0,s.useRef)(0),G=fe(a),ee=fe(o),C=(0,s.useCallback)((r,m={})=>{D({text:r,...m}),clearTimeout(oe.current),oe.current=setTimeout(()=>D(null),m.undo?6500:2200)},[]);(0,s.useEffect)(()=>()=>{clearTimeout(oe.current),clearTimeout(J.current),clearTimeout(R.current)},[]);let xe=(0,s.useCallback)(r=>g(r),[]),K=(0,s.useCallback)(async({x:r,y:m})=>{T({x:r,y:m});let h=r>window.innerWidth/2?"right":"left";try{let P=await e({op:"pet/update",patch:{position:{x:r,y:m},edge:h}});i(N=>N&&{...N,pet:P.pet})}catch{}},[e]),ue=a?.pet?.position??null,v=Le({onDragChange:xe,onSettle:K,initial:ue});(0,s.useEffect)(()=>{a&&!M&&T({x:v.rig.x,y:v.rig.y})},[a,M,v]),(0,s.useEffect)(()=>{let r=()=>{let m=ce();w(m);let h=v.rig;v.setTarget(Math.min(h.x,m.w-58),Math.min(h.y,m.h-54)),T({x:Math.min(h.x,m.w-58),y:Math.min(h.y,m.h-54)})};return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[v]),(0,s.useEffect)(()=>{let r=ie.current;if(!r)return;let m=()=>{let P=r.getBoundingClientRect();if(P.width>40){let N={width:Math.round(P.width),height:Math.round(P.height)};U(re=>re.width===N.width&&re.height===N.height?re:N)}};m();let h=new ResizeObserver(m);return h.observe(r),()=>h.disconnect()},[a,o,n,B,c,V]);let W=(0,s.useCallback)(async()=>{let r=await e({op:"bootstrap"});return i(r),r},[e]);(0,s.useEffect)(()=>{let r=!0;return W().catch(m=>{r&&Y(m?.message??"备忘精灵没有起来。")}),()=>{r=!1}},[W]);let se=(0,s.useCallback)(()=>{let{w:r,h:m}=ce(),h=G.current?.pet?.position??ye(G.current?.pet?.edge??"right",r,m);v.setTarget(h.x,h.y)},[v,G]),_=(0,s.useCallback)(()=>{f(!1),l(!0),Y("");let{w:r,h:m}=ce(),h=G.current?.pet?.position??ye(G.current?.pet?.edge??"right",r,m);v.wake(),v.setTarget(h.x,h.y),T({x:v.rig.x,y:v.rig.y}),e({op:"pet/update",patch:{collapsed:!1,touch:!0}}).catch(()=>{})},[v,e,G]),Z=(0,s.useCallback)(()=>{l(!1),f(!1),z(!1),Y(""),e({op:"pet/update",patch:{collapsed:!0,touch:!0}}).catch(()=>{})},[e]),ke=(0,s.useCallback)(()=>{ee.current?Z():_()},[ee,Z,_]);(0,s.useEffect)(()=>{let r=m=>{if((m.metaKey||m.ctrlKey)&&m.shiftKey&&(m.key==="m"||m.key==="M")){m.preventDefault(),ke();return}m.key==="Escape"&&ee.current&&Z()};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[ke,ee,Z]),(0,s.useEffect)(()=>{if(!o)return;let r=m=>{m.target?.closest?.(".mp-panel, .mp-grab, .mp-perch, .mp-peek, .mp-toast")||Z()};return document.addEventListener("pointerdown",r,!0),()=>document.removeEventListener("pointerdown",r,!0)},[o,Z]);let pe=(0,s.useCallback)(r=>{b(String(r??"").slice(0,1400)),clearTimeout(J.current),J.current=setTimeout(()=>b(""),wt)},[]),Ne=(0,s.useCallback)((r,m)=>{let h=r,P=async()=>{try{let N=await e({op:"chat/poll",cursor:h,sessionId:m});Number.isInteger(N.cursor)&&N.cursor>h&&(h=N.cursor);let re=[...N.messages??[]].reverse().find(ot=>ot.role==="assistant");if(re?.text&&pe(re.text),!N.running){x(!1),N.error&&Y(N.error);try{await W()}catch{}return}R.current=setTimeout(P,Ke)}catch(N){x(!1),Y(N?.message??"没有收到回复。")}};clearTimeout(R.current),R.current=setTimeout(P,Ke)},[e,pe,W]),Ue=(0,s.useCallback)(async()=>{let r=E.trim();if(!(!r||L)){A(""),Y(""),b(""),v.wake(),S(!0);try{let m=await e({op:"say",text:r});m.kind==="memo"?(i(h=>h&&{...h,memos:m.memos,stats:m.stats,suggestions:m.suggestions,lines:m.lines,now:m.now}),pe(m.reply),v.pulse(zt(m)),C(m.duplicate?"这条已经有了":"记下了")):(x(!0),Ne(m.cursor,m.sessionId))}catch(m){Y(m?.message??"没发出去。"),A(r)}finally{S(!1)}}},[E,L,v,e,pe,C,Ne]),H=(0,s.useCallback)(async(r,m,h)=>{S(!0);try{let P=await e({op:r,...m});return P?.memos&&i(N=>N&&{...N,...P}),h?.(P),P}catch(P){return C(P?.message??"没完成"),null}finally{S(!1)}},[e,C]),We=(0,s.useCallback)(r=>{v.pulse(r.done?"listening":"happy",700),H("memo/toggle",{id:r.id})},[H,v]),Ve=(0,s.useCallback)(async r=>{await H("memo/remove",{id:r.id})&&(v.pulse("held",500),C("删掉了",{undo:{title:r.title,dueAt:r.dueAt,tags:r.tags}}))},[H,v,C]),Ge=(0,s.useCallback)(async r=>{D(null),await H("memo/add",{text:r.title,dueAt:r.dueAt??null,tags:r.tags??[]}),C("放回来了")},[H,C]),Je=(0,s.useCallback)(r=>{H("memo/update",{id:r.id,patch:{pinned:!r.pinned}})},[H]),Ze=(0,s.useCallback)((r,m)=>{H("memo/update",{id:r.id,patch:{title:m}})},[H]),Qe=(0,s.useCallback)(()=>{H("memo/clear-done",{})},[H]),qe=(0,s.useCallback)(async()=>{try{let r=await e({op:"memo/export"}),m=await he(r.text);C(m?"清单复制好了":"复制没成功，再点一次")}catch(r){C(r?.message??"复制失败")}},[e,C]),Re=(0,s.useCallback)(async()=>{S(!0);try{await e({op:"chat/reset"}),b(""),x(!1),C("对话重开了，备忘还在")}catch(r){C(r?.message??"没完成")}finally{S(!1)}},[e,C]),et=(0,s.useCallback)(async()=>{S(!0);try{await e({op:"memo/clear-all"});let r=await W();i(r),b(""),x(!1),z(!1),C("全部清空了")}catch(r){C(r?.message??"没完成")}finally{S(!1)}},[e,W,C]),tt=(0,s.useCallback)(async r=>{let m=String(r??"").trim().slice(0,12);if(!m)return;let h=await e({op:"pet/update",patch:{name:m}});i(P=>P&&{...P,pet:h.pet})},[e]),rt=(0,s.useCallback)(async r=>{let m=await e({op:"pet/update",patch:{quiet:r}});i(h=>h&&{...h,pet:m.pet})},[e]),Me=a?.stats??{open:0,overdue:0,dueToday:0,total:0},ze=(0,s.useMemo)(()=>{if(c)return c;let r=a?.lines??[];if(!r.length)return"我先坐在这儿。想到什么，说一句就行。";let m=Math.floor(Date.now()/6e4);return r[m%r.length]},[c,a]),be=a?.pet?.edge??"right",Q=M??ye(be,F.w,F.h),te=(0,s.useMemo)(()=>kt(Q.x,Q.y,X,F.w,F.h),[Q,X,F]),Ce={x:te.x-Q.x,y:te.y-Q.y},at=(0,s.useMemo)(()=>{let r=Q.y;return Math.min(.84,Math.max(.14,r/Math.max(1,F.h)))},[Q,F]),ge=o?"open":p?"peek":"closed";return s.default.createElement("div",{className:"mp-root","data-mode":ge,"data-side":te.side,"data-dragging":y?"true":"false"},s.default.createElement("div",{className:"mp-layer"},s.default.createElement("div",{ref:v.float,className:"mp-float","data-hidden":ge==="closed"||o&&te.side==="sheet"?"true":"false"},s.default.createElement("div",{className:"mp-grab",onPointerDown:r=>{v.onPointerDown(r),v.wake()},onPointerMove:v.onPointerMove,onPointerUp:v.onPointerUp,onPointerCancel:v.onPointerUp,onDoubleClick:_,onClick:()=>{o||_()},role:"button",tabIndex:0,"aria-label":"阿墨，点一下打开备忘",onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),_())}},s.default.createElement(Ae,{rig:v})),o?s.default.createElement("div",{ref:ie,className:"mp-panel-shell","data-side":te.side,style:{left:`${Ce.x}px`,top:`${Ce.y}px`}},n&&a?s.default.createElement(Be,{data:a,onClose:()=>z(!1),onRename:tt,onQuiet:rt,onClearAll:et}):a?s.default.createElement(He,{data:a,placement:te,line:ze,thinking:B,suggestions:V?[]:a.suggestions??[],busy:L,error:j,draft:E,setDraft:A,onSend:Ue,onClose:Z,onToggle:We,onRemove:Ve,onPin:Je,onEdit:Ze,onCopyAll:qe,onClearDone:Qe,onReset:Re,search:V,setSearch:q,onSettings:()=>z(!0)}):s.default.createElement("div",{className:"mp-panel mp-loading"},s.default.createElement("span",{className:"mp-typing"},s.default.createElement("i",null),s.default.createElement("i",null),s.default.createElement("i",null)))):null,!o&&p&&a?s.default.createElement(Ie,{line:c||(a.lines?.[0]??ze),side:be,count:Me.open,onEnter:()=>f(!0),onLeave:()=>f(!1),onOpen:_}):null),ge!=="open"?s.default.createElement(Xe,{edge:be,top:at,count:Me.open,expanded:p,onPeek:r=>{f(r),r&&se()},onOpen:_,label:`打开备忘精灵 · ${a?.pet?.name??"阿墨"}`}):null),s.default.createElement(je,{toast:k,onUndo:Ge}))}function zt(e){return e.duplicate?"listening":e.memo?.dueAt?"alert":"happy"}async function we(e){let a=document.createElement("style");a.dataset.memoPet="true",a.textContent=Se,document.head.append(a),e.effect(()=>()=>a.remove());let i=await e.remote.$mount({package:Ee,descriptors:$e}),o=e.inject(["remote."+ae],l=>{let p=Nt(l);l.effect(()=>l.slots.inject("shell.overlay",()=>l.slots.register({name:"shell.overlay",id:"memo-pet",order:70},()=>s.default.createElement(Mt,{request:p}))),"memo-pet: overlay")});try{await o}catch(l){throw console.error("MEMO_PET_INSTALL_FAILED",l&&(l.stack||l.message||String(l))),await o.dispose?.(),await i?.(),l}return async()=>{await o.dispose?.(),await i?.()}}we.inject=vt;var Ct=we,Pt=we;

return module.exports;}});