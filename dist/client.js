window.__ModuleLoader__.load({id:'dsh-memo-pet',factory(require){
const module={exports:{}};let exports=module.exports;
var vt=Object.create;var ue=Object.defineProperty;var yt=Object.getOwnPropertyDescriptor;var kt=Object.getOwnPropertyNames;var wt=Object.getPrototypeOf,Nt=Object.prototype.hasOwnProperty;var Mt=(t,m)=>{for(var o in m)ue(t,o,{get:m[o],enumerable:!0})},Ae=(t,m,o,a)=>{if(m&&typeof m=="object"||typeof m=="function")for(let l of kt(m))!Nt.call(t,l)&&l!==o&&ue(t,l,{get:()=>m[l],enumerable:!(a=yt(m,l))||a.enumerable});return t};var be=(t,m,o)=>(o=t!=null?vt(wt(t)):{},Ae(m||!t||!t.__esModule?ue(o,"default",{value:t,enumerable:!0}):o,t)),zt=t=>Ae(ue({},"__esModule",{value:!0}),t);var jt={};Mt(jt,{apply:()=>Ht,default:()=>Bt,inject:()=>Re});module.exports=zt(jt);var n=be(require("react"),1);var Ie="dsh-memo-pet",de="memoPet",Ye={mode:"strict",typeSymbol:"MemoPetJson",create:()=>({parse(t){if(!t||typeof t!="object"||Array.isArray(t))throw new TypeError("Expected an object");return t}})},Fe=[{id:de+"/request",service:de,namespace:de,method:"request",invocation:{kind:"direct"},parameters:[{name:"input",wire:"input",source:"json",codec:Ye}],cancellation:{parameter:"signal"},result:Ye}];var Xe=`/* =========================================================================
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
  cursor: text;
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

.mp-link {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  max-width: 164px;
  padding: 1px 6px 1px 3px;
  border-radius: 5px;
  background: color-mix(in oklab, var(--mp-ember) 9%, transparent);
  font: 500 10px/1.6 var(--mp-mono);
  color: var(--mp-ember-deep);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background 140ms ease, color 140ms ease;
}

.mp-link svg { flex: none; opacity: 0.9; }

.mp-link:hover {
  background: color-mix(in oklab, var(--mp-ember) 17%, transparent);
  color: var(--mp-ember);
}

.mp-inline-link {
  color: var(--mp-ember-deep);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: color-mix(in oklab, var(--mp-ember) 42%, transparent);
  word-break: break-all;
}

.mp-inline-link:hover { text-decoration-color: currentColor; }

.mp-line-text .mp-inline-link { text-decoration-color: color-mix(in oklab, var(--mp-ember) 34%, transparent); }

[data-theme='dark'] .mp-link,
[data-theme='dark'] .mp-inline-link { color: #ff8a63; }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .mp-link,
  :root:not([data-theme='light']) .mp-inline-link { color: #ff8a63; }
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


/* --------------------------------------------------------------- 0.2.0 UI */

.mp-views {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 2px 0 6px;
  padding: 2px;
  border-radius: 8px;
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 58%, transparent);
}

.mp-views button {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 6px;
  border: 0;
  border-radius: 6px;
  background: none;
  font: 500 11.5px/1.2 var(--mp-sans);
  color: var(--mp-text-3);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
}

.mp-views button b {
  font: 500 10px/1 var(--mp-mono);
  opacity: 0.66;
}

.mp-views button:hover { color: var(--mp-text-2); }

.mp-views button[data-on='true'] {
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-1) 88%, transparent);
  color: var(--mp-text);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
}

.mp-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  padding: 8px 9px;
  border-radius: 10px;
  background: color-mix(in oklab, var(--mp-ember) 10%, transparent);
  border: 1px solid color-mix(in oklab, var(--mp-ember) 26%, transparent);
}

.mp-alert-dot {
  width: 7px;
  height: 7px;
  flex: none;
  border-radius: 50%;
  background: var(--mp-ember);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--mp-ember) 16%, transparent);
}

.mp-alert-body { display: grid; gap: 1px; min-width: 0; flex: 1; }
.mp-alert-body b { font: 600 12px/1.3 var(--mp-sans); color: var(--mp-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mp-alert-body small { font: 400 10px/1.3 var(--mp-mono); color: var(--mp-text-3); }

.mp-alert-do,
.mp-alert-later {
  border: 0;
  border-radius: 6px;
  padding: 4px 7px;
  font: 600 10.5px/1.2 var(--mp-sans);
  cursor: pointer;
}

.mp-alert-do { background: var(--mp-ember); color: #1b1410; }
.mp-alert-later { background: transparent; color: var(--mp-ember-deep); }
.mp-alert-close { border: 0; background: none; color: var(--mp-text-3); cursor: pointer; padding: 2px; }

.mp-chip-btn {
  border: 0;
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease;
}

.mp-chip-btn:hover {
  background: color-mix(in oklab, var(--mp-ember) 12%, transparent);
  color: var(--mp-ember-deep);
}

.mp-edit { display: grid; gap: 5px; padding: 2px 0 4px; }

.mp-row-body {
  width: 100%;
  min-height: 34px;
  padding: 5px 7px;
  border-radius: 6px;
  border: 1px solid color-mix(in oklab, var(--mp-line) 70%, transparent);
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 60%, transparent);
  color: var(--mp-text);
  font: 400 11.5px/1.45 var(--mp-sans);
  resize: vertical;
}

.mp-row-body:focus { outline: 1px solid color-mix(in oklab, var(--mp-ember) 52%, transparent); }

.mp-edit-actions { display: flex; gap: 6px; }

.mp-mini {
  border: 0;
  border-radius: 5px;
  padding: 3px 9px;
  background: var(--mp-ember);
  color: #1b1410;
  font: 600 10.5px/1.4 var(--mp-sans);
  cursor: pointer;
}

.mp-mini-quiet { background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 80%, transparent); color: var(--mp-text-2); }

.mp-sched {
  display: grid;
  gap: 6px;
  margin-top: 6px;
  padding: 7px;
  border-radius: 8px;
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-2) 74%, transparent);
  border: 1px solid color-mix(in oklab, var(--mp-line) 60%, transparent);
}

.mp-sched-input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid color-mix(in oklab, var(--mp-line) 80%, transparent);
  background: none;
  padding: 3px 1px;
  font: 400 11.5px/1.4 var(--mp-sans);
  color: var(--mp-text);
}

.mp-sched-input:focus { outline: 0; border-bottom-color: var(--mp-ember); }

.mp-sched-quick { display: flex; gap: 4px; flex-wrap: wrap; }

.mp-sched-quick button {
  border: 0;
  border-radius: 999px;
  padding: 2px 8px;
  background: color-mix(in oklab, var(--dsw-alias-bg-layer-1) 70%, transparent);
  color: var(--mp-text-2);
  font: 500 10px/1.6 var(--mp-sans);
  cursor: pointer;
}

.mp-sched-quick button:hover { color: var(--mp-ember-deep); }

.mp-op-do {
  border: 0;
  border-radius: 6px;
  padding: 3px 8px;
  margin-right: 2px;
  background: color-mix(in oklab, var(--mp-ember) 14%, transparent);
  color: var(--mp-ember-deep);
  font: 600 10.5px/1.4 var(--mp-sans);
  cursor: pointer;
  white-space: nowrap;
}

.mp-op-do:hover { background: color-mix(in oklab, var(--mp-ember) 22%, transparent); }

.mp-peek-alert { min-width: 220px; }

.mp-peek-label {
  display: inline-block;
  margin-bottom: 3px;
  font: 600 9.5px/1 var(--mp-sans);
  letter-spacing: 0.08em;
  color: var(--mp-ember);
  text-transform: uppercase;
}

.mp-peek-do,
.mp-peek-snooze {
  border: 0;
  border-radius: 6px;
  padding: 4px 9px;
  font: 600 10.5px/1.3 var(--mp-sans);
  cursor: pointer;
}

.mp-peek-do { background: var(--mp-ember); color: #1b1410; }
.mp-peek-snooze { background: color-mix(in oklab, var(--mp-ember) 12%, transparent); color: var(--mp-ember-deep); }
.mp-peek-dismiss { border: 0; background: none; color: var(--mp-text-3); cursor: pointer; padding: 2px 4px; }

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
`;var x=be(require("react"),1),Pt={fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round",strokeLinejoin:"round"};function S({name:t,size:m=15,...o}){let a={width:m,height:m,viewBox:"0 0 20 20","aria-hidden":"true",...Pt,...o};switch(t){case"send":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"M4.5 10h11M11 5.5 15.5 10 11 14.5"}));case"search":return x.default.createElement("svg",{...a},x.default.createElement("circle",{cx:"9",cy:"9",r:"4.6"}),x.default.createElement("path",{d:"m12.6 12.6 3 3"}));case"copy":return x.default.createElement("svg",{...a},x.default.createElement("rect",{x:"7",y:"7",width:"8.5",height:"8.5",rx:"2"}),x.default.createElement("path",{d:"M12.5 5.2V5a1.6 1.6 0 0 0-1.6-1.6H5.6A1.6 1.6 0 0 0 4 5v5.3c0 .9.7 1.6 1.6 1.6h.2"}));case"check":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"m4.8 10.4 3.4 3.4 7-7.6"}));case"pin":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"M7.2 3.6h5.6l-.7 4.2 2.4 2.5H5.5l2.4-2.5z"}),x.default.createElement("path",{d:"M10 10.3v6"}));case"trash":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"M4.4 6.2h11.2M8 6.2V4.6c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v1.6M6.4 6.2l.6 9c0 .6.5 1 1 1h4c.5 0 1-.4 1-1l.6-9"}));case"minus":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"M5 10h10"}));case"close":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"m5.6 5.6 8.8 8.8M14.4 5.6l-8.8 8.8"}));case"spark":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"M10 3.4c.6 3 1.9 4.3 4.9 4.9-3 .6-4.3 1.9-4.9 4.9-.6-3-1.9-4.3-4.9-4.9 3-.6 4.3-1.9 4.9-4.9Z"}),x.default.createElement("path",{d:"M15.2 13.4c.3 1.4.9 2 2.3 2.3-1.4.3-2 .9-2.3 2.3-.3-1.4-.9-2-2.3-2.3 1.4-.3 2-.9 2.3-2.3Z"}));case"clock":return x.default.createElement("svg",{...a},x.default.createElement("circle",{cx:"10",cy:"10",r:"6.4"}),x.default.createElement("path",{d:"M10 6.4V10l2.6 1.6"}));case"inbox":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"M3.6 10.4 6 4.6h8l2.4 5.8v4.2c0 .6-.4 1-1 1H4.6c-.6 0-1-.4-1-1z"}),x.default.createElement("path",{d:"M3.8 10.6h3l.8 1.8h4.8l.8-1.8h3"}));case"edit":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"m12.4 4.6 3 3L8 15H5v-3z"}));case"arrow":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"M7 4.8 12.2 10 7 15.2"}));case"link":return x.default.createElement("svg",{...a},x.default.createElement("path",{d:"M8.4 11.6a3 3 0 0 0 4.2 0l2.2-2.2a3 3 0 0 0-4.2-4.2l-1.1 1.1"}),x.default.createElement("path",{d:"M11.6 8.4a3 3 0 0 0-4.2 0L5.2 10.6a3 3 0 0 0 4.2 4.2l1.1-1.1"}));default:return x.default.createElement("svg",{...a},x.default.createElement("circle",{cx:"10",cy:"10",r:"6"}))}}async function ye(t){let m=String(t??"");if(!m)return!1;try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(m),!0}catch{}try{let o=document.createElement("textarea");o.value=m,o.setAttribute("readonly",""),o.style.cssText="position:fixed;top:-1000px;opacity:0",document.body.append(o),o.select();let a=document.execCommand("copy");return o.remove(),a}catch{return!1}}function ce({text:t,label:m="复制",doneLabel:o="已复制",className:a="",title:l,iconOnly:s=!1,onCopied:g}){let[h,v]=(0,x.useState)("idle"),T=(0,x.useRef)(0);(0,x.useEffect)(()=>()=>clearTimeout(T.current),[]);let X=(0,x.useCallback)(async _=>{_.stopPropagation();let F=await ye(typeof t=="function"?t():t);v(F?"done":"fail"),F&&g?.(),clearTimeout(T.current),T.current=setTimeout(()=>v("idle"),1600)},[t,g]),Y=h==="done";return x.default.createElement("button",{type:"button",className:`mp-copy ${Y?"is-done":""} ${s?"is-icon":""} ${a}`,onClick:X,title:l??m,"aria-label":l??m,"data-state":h},x.default.createElement("span",{className:"mp-copy-icon"},Y?x.default.createElement(S,{name:"check",size:13}):x.default.createElement(S,{name:"copy",size:13})),s?null:x.default.createElement("span",{className:"mp-copy-label"},Y?o:h==="fail"?"复制失败":m),x.default.createElement("span",{className:"mp-copy-burst","aria-hidden":"true"}))}function _e(t,m=Date.now()){let a=new Date(m);a.setHours(0,0,0,0);let l=new Date(t);l.setHours(0,0,0,0);let s=Math.round((l-a)/864e5);if(s===0)return"今天";if(s===-1)return"昨天";if(s===1)return"明天";if(s<0&&s>-7)return`${-s} 天前`;let g=new Date(t);return`${g.getMonth()+1} 月 ${g.getDate()} 日`}function ke(t){let m=(0,x.useRef)(t);return m.current=t,m}var Tt=/https?:\/\/[^\s<>"'`，。；、）)】》]+/gi,He=t=>{try{return new URL(String(t)).host.replace(/^www\./i,"")}catch{return""}};function we({text:t,onOpen:m,className:o="mp-row-text"}){let a=String(t??""),l=[],s=0;for(let g of a.matchAll(Tt)){let h=g.index??0,v=g[0].replace(/[.,;:!?]+$/u,"").replace(/[)\]】》]+$/u,"");h>s&&l.push(a.slice(s,h)),l.push(x.default.createElement("a",{key:`l${h}`,className:"mp-inline-link",href:v,target:"_blank",rel:"noreferrer",onClick:T=>{T.preventDefault(),T.stopPropagation(),m?.(v)}},v.replace(/^https?:\/\//i,""))),s=h+g[0].length}return s<a.length&&l.push(a.slice(s)),x.default.createElement("span",{className:o},l.length?l:a)}var c=be(require("react"),1),ge={stiffness:168,damping:21,mass:1},Ne=132,Be={right:74,bottom:150},V=(t,m,o)=>Math.min(o,Math.max(m,t)),J=()=>typeof performance<"u"?performance.now():Date.now();function St(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function je({onDragChange:t,onSettle:m,initial:o}){let a=(0,c.useRef)(null),l=(0,c.useRef)(null),s=(0,c.useRef)({x:0,y:0,vx:0,vy:0,tx:0,ty:0,lean:0,eyeX:0,eyeY:0,blink:0,nextBlink:0,dragging:!1,grabX:0,grabY:0,pointerX:0,pointerY:0,lastInput:J(),wakeUntil:0,mood:"idle",moodUntil:0,ready:!1,landing:0}).current,g=(0,c.useCallback)((u,d)=>{s.x=u,s.y=d,s.tx=u,s.ty=d,s.vx=0,s.vy=0,a.current&&(a.current.style.transform=`translate3d(${u}px, ${d}px, 0)`)},[s]),h=(0,c.useCallback)((u,d)=>{s.tx=V(u,58,window.innerWidth-58),s.ty=V(d,60,window.innerHeight-54)},[s]),v=(0,c.useCallback)(()=>{s.lastInput=J()},[s]),T=(0,c.useCallback)((u="happy",d=900)=>{s.mood=u,s.moodUntil=J()+d},[s]),X=(0,c.useCallback)((u,d=0)=>{s.mood=u,s.moodUntil=d?J()+d:0},[s]);(0,c.useEffect)(()=>{let u=o?.x??window.innerWidth-Be.right-Ne/2,d=o?.y??window.innerHeight-Be.bottom-Ne/2;g(V(u,58,window.innerWidth-58),V(d,60,window.innerHeight-54))},[o,g]),(0,c.useEffect)(()=>{if(St()){let y=l.current;y&&(y.style.setProperty("--mp-eye-x","0px"),y.style.setProperty("--mp-eye-y","0px"));return}let u=0,d=J(),P=!0,E=()=>{if(!P)return;let y=J(),L=Math.min(.034,Math.max(.001,(y-d)/1e3));d=y;let i=s,A=l.current,W=a.current;if(i.dragging){let $=1-Math.pow(.0016,L);i.x+=(i.tx-i.x)*$,i.y+=(i.ty-i.y)*$}else{let $=(i.tx-i.x)*ge.stiffness-i.vx*ge.damping,H=(i.ty-i.y)*ge.stiffness-i.vy*ge.damping;i.vx+=$*L,i.vy+=H*L,i.x+=i.vx*L,i.y+=i.vy*L;let C=58,re=window.innerWidth-58,w=60,se=window.innerHeight-54;i.x<C&&(i.x=C,i.vx=Math.abs(i.vx)*.42),i.x>re&&(i.x=re,i.vx=-Math.abs(i.vx)*.42),i.y<w&&(i.y=w,i.vy=Math.abs(i.vy)*.42),i.y>se&&(i.y=se,i.vy=-Math.abs(i.vy)*.42)}if(W&&(W.style.transform=`translate3d(${i.x}px, ${i.y}px, 0)`),!A){u=requestAnimationFrame(E);return}let B=Math.hypot(i.vx,i.vy),j=y-i.lastInput;i.moodUntil&&y>i.moodUntil&&(i.mood="idle",i.moodUntil=0),i.mood==="idle"&&(j<60?i.mood="listening":j>32e3&&!i.dragging?i.mood="dozing":j>9e3&&(i.mood="idle"));let D=(i.pointerX||i.x)-i.x,q=(i.pointerY||i.y)-i.y,b=Math.max(1,Math.hypot(D,q)),O=V(D/b*Math.min(3.6,b/26),-3.6,3.6),R=V(q/b*Math.min(2.8,b/30),-2.8,2.8),ie=Math.sin(y/3400)*.9,K=Math.cos(y/4100)*.6;i.eyeX+=(O+ie-i.eyeX)*Math.min(1,L*9),i.eyeY+=(R+K-i.eyeY)*Math.min(1,L*9);let ee=V(i.vx*.012,-7.5,7.5);i.lean+=(ee-i.lean)*Math.min(1,L*7),i.nextBlink||(i.nextBlink=y+2200+Math.random()*3200);let Z=0;if(y>i.nextBlink){let $=(y-i.nextBlink)/150;Z=$<.5?$*2:Math.max(0,2-$*2),$>=1&&(i.nextBlink=y+2400+Math.random()*4200,Z=0)}let I=V(B/1400,0,.11),te=Math.sin(y/2400)*.5+.5,G=V(-i.vx*.016,-12,12),U=V(-i.vx*.006+Math.sin(y/1700)*1.6,-7,7);A.style.setProperty("--mp-lean",`${(i.lean+Math.sin(y/3e3)*.8).toFixed(2)}deg`),A.style.setProperty("--mp-squash",I.toFixed(3)),A.style.setProperty("--mp-eye-x",`${i.eyeX.toFixed(2)}px`),A.style.setProperty("--mp-eye-y",`${i.eyeY.toFixed(2)}px`),A.style.setProperty("--mp-blink",Z.toFixed(3)),A.style.setProperty("--mp-breath",te.toFixed(3)),A.style.setProperty("--mp-tail",`${G.toFixed(2)}px`),A.style.setProperty("--mp-antenna",`${U.toFixed(2)}deg`),A.dataset.mood=i.dragging?"held":i.mood,u=requestAnimationFrame(E)};u=requestAnimationFrame(E);let Q=()=>{document.hidden?(cancelAnimationFrame(u),u=0):u||(d=J(),u=requestAnimationFrame(E))};return document.addEventListener("visibilitychange",Q),()=>{P=!1,cancelAnimationFrame(u),document.removeEventListener("visibilitychange",Q)}},[s]),(0,c.useEffect)(()=>{let u=d=>{s.pointerX=d.clientX,s.pointerY=d.clientY,s.lastInput=J()};return window.addEventListener("pointermove",u,{passive:!0}),()=>window.removeEventListener("pointermove",u)},[s]);let Y=(0,c.useCallback)(u=>{if(u.button!==0)return;let d=s;d.dragging=!0,d.grabX=(d.pointerX||u.clientX)-d.x,d.grabY=(d.pointerY||u.clientY)-d.y,d.lastInput=J(),u.currentTarget.setPointerCapture?.(u.pointerId),t?.(!0)},[s,t]),_=(0,c.useCallback)(u=>{let d=s;d.dragging&&(d.tx=V(u.clientX-d.grabX,58,window.innerWidth-58),d.ty=V(u.clientY-d.grabY,60,window.innerHeight-54),d.pointerX=u.clientX,d.pointerY=u.clientY)},[s]),F=(0,c.useCallback)(u=>{let d=s;if(!d.dragging)return;d.dragging=!1,u.currentTarget.releasePointerCapture?.(u.pointerId);let P={x:d.x+d.vx*.13,y:d.y+d.vy*.13},E=window.innerWidth;P.x>E-110?P.x=E-70:P.x<110&&(P.x=70),h(P.x,P.y),t?.(!1),d.lastInput=J(),m?.({x:Math.round(d.tx),y:Math.round(d.ty)})},[s,t,m,h]);return{float:a,creature:l,rig:s,place:g,setTarget:h,wake:v,pulse:T,setMood:X,onPointerDown:Y,onPointerMove:_,onPointerUp:F}}function Oe({rig:t,size:m=Ne}){return c.default.createElement("div",{ref:t.creature,className:"mp-creature",style:{width:m,height:m},"data-mood":"idle",role:"img","aria-label":"备忘精灵阿墨"},c.default.createElement("div",{className:"mp-aura","aria-hidden":"true"}),c.default.createElement("svg",{className:"mp-orbit",viewBox:"0 0 132 132","aria-hidden":"true"},c.default.createElement("ellipse",{className:"mp-ring",cx:"66",cy:"68",rx:"57",ry:"21",transform:"rotate(-15 66 68)"}),c.default.createElement("g",{className:"mp-mote mp-mote-a"},c.default.createElement("circle",{cx:"123",cy:"68",r:"1.7"})),c.default.createElement("g",{className:"mp-mote mp-mote-b"},c.default.createElement("circle",{cx:"112",cy:"68",r:"1.2"}))),c.default.createElement("svg",{className:"mp-thread",viewBox:"0 0 132 132","aria-hidden":"true"},c.default.createElement("g",{className:"mp-antenna"},c.default.createElement("path",{d:"M66 37c1.2-7.4 3.6-12.6 8.4-16.2"}),c.default.createElement("circle",{cx:"75.4",cy:"19.4",r:"3.4",className:"mp-tip"}),c.default.createElement("circle",{cx:"75.4",cy:"19.4",r:"7",className:"mp-tip-halo"})),c.default.createElement("g",{className:"mp-ribbon"},c.default.createElement("path",{d:"M84 94c9.4 3 15.6 9.4 18.6 19",className:"mp-r1"}),c.default.createElement("path",{d:"M88 101c6.2 2 10.4 6 12.4 12.4",className:"mp-r2"}))),c.default.createElement("div",{className:"mp-body"},c.default.createElement("div",{className:"mp-gloss","aria-hidden":"true"}),c.default.createElement("div",{className:"mp-rim","aria-hidden":"true"}),c.default.createElement("div",{className:"mp-face"},c.default.createElement("div",{className:"mp-eye mp-eye-left"},c.default.createElement("i",null)),c.default.createElement("div",{className:"mp-eye mp-eye-right"},c.default.createElement("i",null)),c.default.createElement("div",{className:"mp-cheek mp-cheek-left","aria-hidden":"true"}),c.default.createElement("div",{className:"mp-cheek mp-cheek-right","aria-hidden":"true"}),c.default.createElement("div",{className:"mp-mouth","aria-hidden":"true"}))),c.default.createElement("div",{className:"mp-zzz","aria-hidden":"true"},c.default.createElement("span",null,"z"),c.default.createElement("span",null,"z")))}function Ke({edge:t="right",top:m=.42,count:o=0,onPeek:a,onOpen:l,expanded:s,label:g}){let[h,v]=(0,c.useState)(!1),T=(0,c.useRef)(0);(0,c.useEffect)(()=>()=>clearTimeout(T.current),[]);let X=()=>{clearTimeout(T.current),v(!0),a?.(!0)},Y=()=>{clearTimeout(T.current),T.current=setTimeout(()=>{v(!1),a?.(!1)},260)};return c.default.createElement("button",{type:"button",className:`mp-perch is-${t} ${h||s?"is-hot":""}`,style:{top:`calc(${(m*100).toFixed(2)}% - 46px)`},onPointerEnter:X,onPointerLeave:Y,onFocus:X,onBlur:Y,onClick:l,"aria-label":g??"打开备忘精灵",title:`${g??"备忘精灵"} · ${o} 条`},c.default.createElement("span",{className:"mp-perch-rail","aria-hidden":"true"}),c.default.createElement("span",{className:"mp-perch-dots","aria-hidden":"true"},c.default.createElement("i",null),c.default.createElement("i",null),c.default.createElement("i",null)),o>0?c.default.createElement("span",{className:"mp-perch-count","aria-hidden":"true"},o>99?"99+":o):null)}var e=be(require("react"),1);function Ue(t,m){if(!t)return"";let o=new Date(t),a=`${String(o.getHours()).padStart(2,"0")}:${String(o.getMinutes()).padStart(2,"0")}`,l=Math.round((new Date(t).setHours(0,0,0,0)-new Date(m).setHours(0,0,0,0))/864e5);return l===0?`今天 ${a}`:l===1?`明天 ${a}`:l===-1?`昨天 ${a}`:l>1&&l<7?`周${"日一二三四五六"[o.getDay()]} ${a}`:`${o.getMonth()+1}/${o.getDate()} ${a}`}function Ve(){return e.default.createElement("span",{className:"mp-mark","aria-hidden":"true"},e.default.createElement("span",{className:"mp-mark-body"},e.default.createElement("i",{className:"mp-mark-eye"}),e.default.createElement("i",{className:"mp-mark-eye"})))}function Et({memo:t,now:m,mode:o="open",onToggle:a,onRemove:l,onPin:s,onEdit:g,onSchedule:h,onRestore:v,onPurge:T,onOpenLink:X,busy:Y}){let[_,F]=(0,e.useState)(!1),[u,d]=(0,e.useState)(t.title),[P,E]=(0,e.useState)(t.body??""),[Q,y]=(0,e.useState)(!1),[L,i]=(0,e.useState)(""),A=(0,e.useRef)(null);(0,e.useEffect)(()=>{if(!_)return;let b=A.current;b?.focus(),b?.setSelectionRange(b.value.length,b.value.length)},[_]),(0,e.useEffect)(()=>{d(t.title),E(t.body??"")},[t.id,t.title,t.body]);let W=(0,e.useCallback)(()=>{let b=u.trim();if(!b){d(t.title),F(!1);return}F(!1),(b!==t.title||P!==(t.body??""))&&g(t,{title:b,body:P})},[u,P,t,g]),B=(0,e.useCallback)(b=>{y(!1),i(""),h(t,b)},[t,h]),j=!t.done&&t.dueAt&&t.dueAt<m-6e4,D=t.dueAt?Ue(t.dueAt,m):"",q=[t.title,t.body,D,t.tags.map(b=>`#${b}`).join(" "),t.link].filter(Boolean).join(" · ");return e.default.createElement("li",{className:`mp-row ${t.done?"is-done":""} ${t.pinned?"is-pinned":""}`,"data-id":t.id},_||o==="trash"?null:e.default.createElement("button",{type:"button",className:"mp-check",role:"checkbox","aria-checked":t.done,"aria-label":t.done?"标回未完成":"标成完成",onClick:()=>a(t),disabled:Y},e.default.createElement("span",{className:"mp-check-ring"},e.default.createElement(S,{name:"check",size:11}))),e.default.createElement("div",{className:"mp-row-main"},_?e.default.createElement("form",{className:"mp-edit",onSubmit:b=>{b.preventDefault(),W()},onKeyDown:b=>{b.key==="Escape"&&(d(t.title),E(t.body??""),F(!1))}},e.default.createElement("input",{ref:A,className:"mp-row-edit",value:u,maxLength:160,onChange:b=>d(b.target.value)}),e.default.createElement("textarea",{className:"mp-row-body",rows:2,value:P,maxLength:4e3,placeholder:"补一句正文，可留空",onChange:b=>E(b.target.value)}),e.default.createElement("div",{className:"mp-edit-actions"},e.default.createElement("button",{type:"submit",className:"mp-mini"},"保存"),e.default.createElement("button",{type:"button",className:"mp-mini mp-mini-quiet",onClick:()=>{d(t.title),E(t.body??""),F(!1)}},"取消"))):e.default.createElement("div",{className:"mp-row-title",onDoubleClick:()=>F(!0),title:`${t.body?t.body+" · ":""}双击改标题和正文`},e.default.createElement(we,{text:t.title,onOpen:X})),!_&&o!=="trash"?e.default.createElement("div",{className:"mp-row-meta"},D?o==="open"?e.default.createElement("button",{type:"button",className:`mp-chip mp-chip-btn ${j?"is-alert":""}`,onClick:()=>{y(b=>!b),i("")},title:"改时间"},e.default.createElement(S,{name:"clock",size:11}),D):e.default.createElement("span",{className:`mp-chip ${j?"is-alert":""}`},e.default.createElement(S,{name:"clock",size:11}),D):null,t.tags.map(b=>e.default.createElement("span",{key:b,className:"mp-tag"},"#",b)),t.link?e.default.createElement("a",{className:"mp-link",href:t.link,target:"_blank",rel:"noreferrer",title:`在右侧栏打开 ${t.link}`,onClick:b=>{b.preventDefault(),b.stopPropagation(),X(t.link)}},e.default.createElement(S,{name:"link",size:11}),He(t.link)||"链接"):null,!D&&!t.tags.length&&!t.link?e.default.createElement("span",{className:"mp-meta"},_e(t.createdAt,m)):null):null,Q?e.default.createElement("form",{className:"mp-sched",onSubmit:b=>{b.preventDefault(),L.trim()&&B(L.trim())}},e.default.createElement("input",{autoFocus:!0,className:"mp-sched-input",value:L,placeholder:"明天 9:00 / 周五下午三点",onChange:b=>i(b.target.value)}),e.default.createElement("div",{className:"mp-sched-quick"},e.default.createElement("button",{type:"button",onClick:()=>B("今天 18:00")},"今天"),e.default.createElement("button",{type:"button",onClick:()=>B("明天 09:00")},"明天"),e.default.createElement("button",{type:"button",onClick:()=>B("下周一 09:00")},"下周一"),e.default.createElement("button",{type:"button",onClick:()=>B("")},"清空"))):null),e.default.createElement("div",{className:"mp-row-actions"},o==="trash"?e.default.createElement(e.default.Fragment,null,e.default.createElement("button",{type:"button",className:"mp-text-btn",onClick:()=>v(t)},"恢复"),e.default.createElement("button",{type:"button",className:"mp-icon mp-icon-danger",onClick:()=>T(t),"aria-label":"彻底删除",title:"彻底删除"},e.default.createElement(S,{name:"trash",size:13}))):e.default.createElement(e.default.Fragment,null,e.default.createElement(ce,{text:q,iconOnly:!0,label:"复制这条"}),o==="open"?e.default.createElement("button",{type:"button",className:`mp-icon ${t.pinned?"is-on":""}`,onClick:()=>s(t),"aria-label":t.pinned?"取消钉住":"钉住",title:t.pinned?"取消钉住":"钉住"},e.default.createElement(S,{name:"pin",size:13})):null,e.default.createElement("button",{type:"button",className:"mp-icon mp-icon-danger",onClick:()=>l(t),"aria-label":o==="done"?"从已完成里移除":"移到回收站",title:o==="done"?"从已完成里移除":"移到回收站"},e.default.createElement(S,{name:"trash",size:13})))))}function $t({draft:t,setDraft:m,onSend:o,busy:a,placeholder:l,hint:s}){let g=(0,e.useRef)(null),h=(0,e.useCallback)(()=>{let v=g.current;v&&(v.style.height="auto",v.style.height=`${Math.min(96,v.scrollHeight)}px`)},[]);return(0,e.useEffect)(h,[t,h]),e.default.createElement("form",{className:"mp-composer",onSubmit:v=>{v.preventDefault(),o()}},e.default.createElement("textarea",{ref:g,className:"mp-input",rows:1,value:t,placeholder:l,spellCheck:!1,onChange:v=>m(v.target.value),onKeyDown:v=>{v.key==="Enter"&&!v.shiftKey&&!v.nativeEvent.isComposing&&(v.preventDefault(),o())}}),e.default.createElement("div",{className:"mp-composer-foot"},e.default.createElement("span",{className:"mp-hint"},s),e.default.createElement("button",{className:"mp-send",type:"submit",disabled:!t.trim()||a,"aria-label":"发送"},e.default.createElement("span",{className:"mp-send-ring","aria-hidden":"true"}),e.default.createElement(S,{name:"send",size:15}))))}function Dt({items:t,now:m,onAct:o}){let[a,l]=(0,e.useState)(0);if((0,e.useEffect)(()=>{a>=t.length&&l(0)},[t.length,a]),!t.length)return null;let s=t[a%t.length];return e.default.createElement("div",{className:"mp-opinion","data-tone":s.tone},e.default.createElement("span",{className:"mp-op-index","aria-hidden":"true"},String(a%t.length+1).padStart(2,"0")),e.default.createElement("div",{className:"mp-op-body"},e.default.createElement("span",{className:"mp-op-label"},s.label),e.default.createElement("p",null,s.line)),e.default.createElement("div",{className:"mp-op-actions"},s.act?e.default.createElement("button",{type:"button",className:"mp-op-do",onClick:()=>o?.(s.act)},s.act.label):null,e.default.createElement(ce,{text:s.copy,label:"复制",doneLabel:"已复制"}),t.length>1?e.default.createElement("button",{type:"button",className:"mp-op-next",onClick:()=>l(g=>(g+1)%t.length),"aria-label":"换一条意见",title:"换一条"},e.default.createElement(S,{name:"arrow",size:12})):null))}function We({data:t,placement:m,line:o,thinking:a,suggestions:l,busy:s,error:g,draft:h,setDraft:v,onSend:T,onClose:X,onToggle:Y,onRemove:_,onPin:F,onEdit:u,onOpenLink:d,onCopyAll:P,onClearDone:E,onReset:Q,search:y,setSearch:L,onSettings:i,onSchedule:A,onRestore:W,onPurge:B,onAct:j,alert:D,onAlertDone:q,onAlertSnooze:b,onAlertDismiss:O}){let R=t.now??Date.now(),ie=t.memos??[],K=ie.filter(w=>!w.done),ee=ie.filter(w=>w.done),Z=t.trash??[],[I,te]=(0,e.useState)("open"),G=I==="trash"?Z:I==="done"?ee:K,U=y.trim().toLowerCase(),$=U?G.filter(w=>`${w.title} ${w.body} ${w.tags.join(" ")}`.toLowerCase().includes(U)):G,[H,C]=(0,e.useState)(!1),re=(0,e.useRef)(null);return(0,e.useEffect)(()=>{H&&re.current?.focus()},[H]),e.default.createElement("section",{className:"mp-panel","data-side":m.side,"aria-label":"备忘精灵"},e.default.createElement("header",{className:"mp-head"},e.default.createElement(Ve,null),e.default.createElement("div",{className:"mp-id"},e.default.createElement("b",null,t.pet?.name??"阿墨"),e.default.createElement("span",{className:"mp-status","data-dot":a?"busy":"idle"},a?"在想":t.stats?.open?`${t.stats.open} 条待办`:"清单是空的")),e.default.createElement("div",{className:"mp-head-actions"},e.default.createElement("button",{type:"button",className:`mp-icon ${H?"is-on":""}`,onClick:()=>{C(w=>!w),H&&L("")},"aria-label":"搜索备忘",title:"搜索"},e.default.createElement(S,{name:"search",size:14})),e.default.createElement("button",{type:"button",className:"mp-icon",onClick:i,"aria-label":"宠物设置",title:"设置"},e.default.createElement(S,{name:"spark",size:14})),e.default.createElement("button",{type:"button",className:"mp-icon",onClick:X,"aria-label":"收起",title:"收起（Esc）"},e.default.createElement(S,{name:"close",size:14})))),H?e.default.createElement("div",{className:"mp-search"},e.default.createElement(S,{name:"search",size:13}),e.default.createElement("input",{ref:re,value:y,placeholder:"搜标题、正文或标签",onChange:w=>L(w.target.value),onKeyDown:w=>{w.key==="Escape"&&(C(!1),L(""))}})):null,e.default.createElement("div",{className:"mp-hero"},e.default.createElement("div",{className:"mp-hero-head"},e.default.createElement("span",{className:"mp-eyebrow"},"阿墨说"),!a&&o?e.default.createElement(ce,{text:o,label:"复制",doneLabel:"已复制"}):null),a?e.default.createElement("span",{className:"mp-typing","aria-label":"正在想"},e.default.createElement("i",null),e.default.createElement("i",null),e.default.createElement("i",null)):e.default.createElement("p",{className:"mp-line"},e.default.createElement(we,{text:o,onOpen:d,className:"mp-line-text"}))),l.length&&!H?e.default.createElement(Dt,{items:l.slice(0,3),now:R}):null,e.default.createElement($t,{draft:h,setDraft:v,onSend:T,busy:s,placeholder:"记一句，或者问我…",hint:"Enter 记下 · 支持「明天 18:00」「#标签」"}),g?e.default.createElement("p",{className:"mp-error",role:"status"},g):null,D?e.default.createElement("div",{className:"mp-alert",role:"status"},e.default.createElement("span",{className:"mp-alert-dot","aria-hidden":"true"}),e.default.createElement("div",{className:"mp-alert-body"},e.default.createElement("b",null,D.title),e.default.createElement("small",null,Ue(D.dueAt,R)," 到点了")),e.default.createElement("button",{type:"button",className:"mp-alert-do",onClick:()=>q(D)},"完成"),e.default.createElement("button",{type:"button",className:"mp-alert-later",onClick:()=>b(D,10)},"10 分钟"),e.default.createElement("button",{type:"button",className:"mp-alert-close",onClick:()=>O(D),"aria-label":"今天不提醒"},e.default.createElement(S,{name:"close",size:12}))):null,e.default.createElement("div",{className:"mp-views",role:"tablist","aria-label":"清单视图"},[["open","待办",K.length],["done","完成",ee.length],["trash","回收站",Z.length]].map(([w,se,k])=>e.default.createElement("button",{key:w,type:"button",role:"tab","aria-selected":I===w,"data-on":I===w,onClick:()=>te(w)},se,e.default.createElement("b",null,k)))),e.default.createElement("div",{className:"mp-list-head"},e.default.createElement("span",null,U?`搜索「${y.trim()}」`:I==="trash"?"回收站 · 保留 7 天":I==="done"?"已完成":"清单"),e.default.createElement("span",{className:"mp-list-count"},U?`${$.length} 条结果`:`${G.length} 条`)),e.default.createElement("ul",{className:"mp-list"},$.length===0?e.default.createElement("li",{className:"mp-empty"},e.default.createElement("div",{className:"mp-empty-art","aria-hidden":"true"},e.default.createElement("span",null),e.default.createElement("span",null)),e.default.createElement("p",null,U?"没搜到。换个词试试？":I==="trash"?"回收站是空的。删掉的备忘会在这里留七天。":I==="done"?"还没有做完的。勾掉一条，它就来这里。":"还没有备忘。说一句，我替你记着。"),!U&&I==="open"?e.default.createElement("div",{className:"mp-starters"},(t.starters??[]).slice(0,3).map(w=>e.default.createElement("button",{key:w,type:"button",onClick:()=>v(w)},e.default.createElement("span",{"aria-hidden":"true"},"＋"),w))):null):$.map(w=>e.default.createElement(Et,{key:w.id,memo:w,now:R,mode:I,busy:s,onToggle:Y,onRemove:_,onPin:F,onEdit:u,onSchedule:A,onRestore:W,onPurge:B,onOpenLink:d}))),e.default.createElement("footer",{className:"mp-foot"},e.default.createElement("div",{className:"mp-foot-left"},e.default.createElement("button",{type:"button",className:"mp-text-btn",onClick:P},e.default.createElement(S,{name:"copy",size:12}),"复制清单"),I==="open"&&ee.length?e.default.createElement("button",{type:"button",className:"mp-text-btn",onClick:E},"归档已完成 ",ee.length):null,I==="trash"&&Z.length?e.default.createElement("button",{type:"button",className:"mp-text-btn",onClick:()=>B(null)},"清空回收站"):null),e.default.createElement("div",{className:"mp-foot-right"},e.default.createElement("button",{type:"button",className:"mp-text-btn mp-quiet",onClick:Q},"重开对话"),e.default.createElement("kbd",{className:"mp-kbd"},"⌘⇧M"))))}function Ge({line:t,side:m,onEnter:o,onLeave:a,onOpen:l,count:s,alert:g,onAlertDone:h,onAlertSnooze:v,onAlertDismiss:T}){return g?e.default.createElement("div",{className:"mp-peek mp-peek-alert","data-side":m,onPointerEnter:o,onPointerLeave:()=>{}},e.default.createElement("span",{className:"mp-peek-label"},"到点了"),e.default.createElement("p",{className:"mp-peek-line"},g.title),e.default.createElement("div",{className:"mp-peek-foot"},e.default.createElement("button",{type:"button",className:"mp-peek-do",onClick:()=>h(g)},"完成"),e.default.createElement("button",{type:"button",className:"mp-peek-snooze",onClick:()=>v(g,10)},"10 分钟"),e.default.createElement("button",{type:"button",className:"mp-peek-dismiss",onClick:()=>T(g),"aria-label":"今天不提醒"},e.default.createElement(S,{name:"close",size:12}))),e.default.createElement("span",{className:"mp-peek-tail","aria-hidden":"true"})):e.default.createElement("div",{className:"mp-peek","data-side":m,onPointerEnter:o,onPointerLeave:a},e.default.createElement("p",{className:"mp-peek-line"},t),e.default.createElement("div",{className:"mp-peek-foot"},e.default.createElement(ce,{text:t,label:"复制",doneLabel:"已复制"}),e.default.createElement("button",{type:"button",className:"mp-peek-open",onClick:l},s?`看这 ${s} 条`:"打开"," ",e.default.createElement(S,{name:"arrow",size:12}))),e.default.createElement("span",{className:"mp-peek-tail","aria-hidden":"true"}))}function Je({data:t,onClose:m,onRename:o,onQuiet:a,onClearAll:l}){let[s,g]=(0,e.useState)(t.pet?.name??"阿墨");return e.default.createElement("section",{className:"mp-panel mp-settings","aria-label":"宠物设置"},e.default.createElement("header",{className:"mp-head"},e.default.createElement(Ve,null),e.default.createElement("div",{className:"mp-id"},e.default.createElement("b",null,"阿墨"),e.default.createElement("span",{className:"mp-status"},"设置")),e.default.createElement("div",{className:"mp-head-actions"},e.default.createElement("button",{type:"button",className:"mp-icon",onClick:m,"aria-label":"关闭"},e.default.createElement(S,{name:"close",size:14})))),e.default.createElement("div",{className:"mp-set-body"},e.default.createElement("label",{className:"mp-field"},e.default.createElement("span",null,"名字"),e.default.createElement("input",{value:s,maxLength:12,onChange:h=>g(h.target.value),onBlur:()=>o(s),onKeyDown:h=>{h.key==="Enter"&&o(s)}})),e.default.createElement("label",{className:"mp-switch"},e.default.createElement("span",null,e.default.createElement("b",null,"安静模式"),e.default.createElement("small",null,"藏起来，不主动冒出来说话")),e.default.createElement("input",{type:"checkbox",checked:t.pet?.quiet===!0,onChange:h=>a(h.target.checked)}),e.default.createElement("i",{"aria-hidden":"true"})),e.default.createElement("div",{className:"mp-set-meta"},e.default.createElement("p",null,"备忘存在 ",e.default.createElement("code",null,t.directory)),e.default.createElement("p",null,t.stats?.open??0," 条待办 · 共 ",t.stats?.total??0," 条 · 对话 ",t.chat?.turns??0," 轮"),t.hasModel?null:e.default.createElement("p",{className:"mp-warn"},"还没选默认模型，阿墨只能记录、不能答话。")),e.default.createElement("button",{type:"button",className:"mp-danger",onClick:l},"清空全部备忘与对话")))}function Ze({toast:t,onUndo:m}){return t?e.default.createElement("div",{className:"mp-toast",role:"status","data-tone":t.tone??"calm"},e.default.createElement("span",null,t.text),t.undo?e.default.createElement("button",{type:"button",onClick:()=>{m(t.undo)}},"撤销"):null):null}var Re=["slots","remote"],Lt=Re,Qe=700,qe=66,At={width:392,height:566},Yt=45e3;function he(){return{w:window.innerWidth,h:window.innerHeight}}function It(t,m,o,a,l){if(a<720)return{side:"sheet",x:10,y:Math.max(10,l-o.height-10)};let s=t>a/2?"left":"right",g=s==="left"?t-qe-20-o.width:t+qe+20,h=Math.min(Math.max(12,g),Math.max(12,a-o.width-12)),v=Math.min(Math.max(14,m-o.height+152),Math.max(14,l-o.height-14));return{side:s,x:h,y:v}}function Me(t,m,o){return t==="left"?{x:70,y:o-170}:{x:m-70,y:o-170}}function Ft(t){return async function(o){let a;try{a=await t.remote[de].request(o)}catch(s){throw Object.assign(new Error(s?.message||"连接中断，请稍后再试。"),{code:s?.code||"transport"})}let l=a?.ok?a?.value?.error:a?.value?.error??a?.error??{};if(!a?.ok||l)throw Object.assign(new Error(l?.message||"操作没完成，再试一次。"),{code:l?.code||"unavailable"});return a.value}}function Xt({request:t,ctx:m}){let[o,a]=(0,n.useState)(null),[l,s]=(0,n.useState)(!1),[g,h]=(0,n.useState)(!1),[v,T]=(0,n.useState)(!1),[X,Y]=(0,n.useState)(null),[_,F]=(0,n.useState)(""),[u,d]=(0,n.useState)(!1),[P,E]=(0,n.useState)(""),[Q,y]=(0,n.useState)(""),[L,i]=(0,n.useState)(null),[A,W]=(0,n.useState)(!1),[B,j]=(0,n.useState)(null),[D,q]=(0,n.useState)(""),[b,O]=(0,n.useState)(!1),[R,ie]=(0,n.useState)(At),[K,ee]=(0,n.useState)(()=>he()),Z=(0,n.useCallback)(r=>{let p=String(r??"");if(!/^https?:\/\//i.test(p))return;let f=m?.get?.("sidebarRight"),N=m?.get?.("sidebarRightTabs");if(f?.openTab&&(typeof N?.get!="function"||N.get("browser")))try{f.openTab("browser",{params:{url:p}}),s(!1);return}catch(z){console.error("MEMO_PET_LINK_TAB_FAILED",z)}try{window.open(p,"_blank","noopener,noreferrer")}catch(z){console.error("MEMO_PET_LINK_OPEN_FAILED",z)}},[m]),I=(0,n.useRef)(null),te=(0,n.useRef)(0),G=(0,n.useRef)(0),U=(0,n.useRef)(0),$=ke(o),H=ke(l),C=(0,n.useCallback)((r,p={})=>{i({text:r,...p}),clearTimeout(te.current),te.current=setTimeout(()=>i(null),p.undo?6500:2200)},[]);(0,n.useEffect)(()=>()=>{clearTimeout(te.current),clearTimeout(U.current),clearTimeout(G.current)},[]);let re=(0,n.useCallback)(r=>T(r),[]),w=(0,n.useCallback)(async({x:r,y:p})=>{Y({x:r,y:p});let f=r>window.innerWidth/2?"right":"left";try{let N=await t({op:"pet/update",patch:{position:{x:r,y:p},edge:f}});a(z=>z&&{...z,pet:N.pet})}catch{}},[t]),se=o?.pet?.position??null,k=je({onDragChange:re,onSettle:w,initial:se});(0,n.useEffect)(()=>{o&&!X&&Y({x:k.rig.x,y:k.rig.y})},[o,X,k]),(0,n.useEffect)(()=>{let r=!0,p=async()=>{try{let N=await t({op:"alerts"});if(!r||!N?.alert)return;j(N.alert),k.pulse("alert",1400),H.current||h(!0)}catch{}};p();let f=setInterval(p,3e4);return()=>{r=!1,clearInterval(f)}},[t,k,H]),(0,n.useEffect)(()=>{let r=()=>{let p=he();ee(p);let f=k.rig;k.setTarget(Math.min(f.x,p.w-58),Math.min(f.y,p.h-54)),Y({x:Math.min(f.x,p.w-58),y:Math.min(f.y,p.h-54)})};return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[k]),(0,n.useEffect)(()=>{let r=I.current;if(!r)return;let p=()=>{let N=r.getBoundingClientRect();if(N.width>40){let z={width:Math.round(N.width),height:Math.round(N.height)};ie(me=>me.width===z.width&&me.height===z.height?me:z)}};p();let f=new ResizeObserver(p);return f.observe(r),()=>f.disconnect()},[o,l,A,u,P,D]);let pe=(0,n.useCallback)(async()=>{let r=await t({op:"bootstrap"});return a(r),r},[t]);(0,n.useEffect)(()=>{let r=!0;return pe().catch(p=>{r&&y(p?.message??"备忘精灵没有起来。")}),()=>{r=!1}},[pe]);let et=(0,n.useCallback)(()=>{let{w:r,h:p}=he(),f=$.current?.pet?.position??Me($.current?.pet?.edge??"right",r,p);k.setTarget(f.x,f.y)},[k,$]),oe=(0,n.useCallback)(()=>{h(!1),s(!0),y("");let{w:r,h:p}=he(),f=$.current?.pet?.position??Me($.current?.pet?.edge??"right",r,p);k.wake(),k.setTarget(f.x,f.y),Y({x:k.rig.x,y:k.rig.y}),t({op:"pet/update",patch:{collapsed:!1,touch:!0}}).catch(()=>{})},[k,t,$]),ae=(0,n.useCallback)(()=>{s(!1),h(!1),W(!1),y(""),t({op:"pet/update",patch:{collapsed:!0,touch:!0}}).catch(()=>{})},[t]),Ce=(0,n.useCallback)(()=>{H.current?ae():oe()},[H,ae,oe]);(0,n.useEffect)(()=>{let r=p=>{if((p.metaKey||p.ctrlKey)&&p.shiftKey&&(p.key==="m"||p.key==="M")){p.preventDefault(),Ce();return}p.key==="Escape"&&H.current&&ae()};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[Ce,H,ae]),(0,n.useEffect)(()=>{if(!l)return;let r=p=>{p.target?.closest?.(".mp-panel, .mp-grab, .mp-perch, .mp-peek, .mp-toast")||ae()};return document.addEventListener("pointerdown",r,!0),()=>document.removeEventListener("pointerdown",r,!0)},[l,ae]);let xe=(0,n.useCallback)(r=>{E(String(r??"").slice(0,1400)),clearTimeout(U.current),U.current=setTimeout(()=>E(""),Yt)},[]),Pe=(0,n.useCallback)((r,p)=>{let f=r,N=async()=>{try{let z=await t({op:"chat/poll",cursor:f,sessionId:p});Number.isInteger(z.cursor)&&z.cursor>f&&(f=z.cursor);let me=[...z.messages??[]].reverse().find(ft=>ft.role==="assistant");if(me?.text&&xe(me.text),!z.running){d(!1),z.error&&y(z.error);try{await pe()}catch{}return}G.current=setTimeout(N,Qe)}catch(z){d(!1),y(z?.message??"没有收到回复。")}};clearTimeout(G.current),G.current=setTimeout(N,Qe)},[t,xe,pe]),tt=(0,n.useCallback)(async()=>{let r=_.trim();if(!(!r||b)){F(""),y(""),E(""),k.wake(),O(!0);try{let p=await t({op:"say",text:r});p.kind==="memo"?(a(f=>f&&{...f,memos:p.memos,stats:p.stats,suggestions:p.suggestions,lines:p.lines,now:p.now}),xe(p.reply),k.pulse(_t(p)),C(p.duplicate?"这条已经有了":"记下了")):(d(!0),Pe(p.cursor,p.sessionId))}catch(p){y(p?.message??"没发出去。"),F(r)}finally{O(!1)}}},[_,b,k,t,xe,C,Pe]),M=(0,n.useCallback)(async(r,p,f)=>{O(!0);try{let N=await t({op:r,...p});return N?.memos&&a(z=>z&&{...z,...N}),f?.(N),N}catch(N){return C(N?.message??"没完成"),null}finally{O(!1)}},[t,C]),rt=(0,n.useCallback)(r=>{k.pulse(r.done?"listening":"happy",700),M("memo/toggle",{id:r.id})},[M,k]),ot=(0,n.useCallback)(async r=>{await M("memo/remove",{id:r.id})&&(k.pulse("held",500),C("移到回收站了，七天内都能恢复"))},[M,k,C]),at=(0,n.useCallback)(async r=>{i(null),await M("memo/add",{text:r.title,dueAt:r.dueAt??null,tags:r.tags??[]}),C("放回来了")},[M,C]),nt=(0,n.useCallback)(r=>{M("memo/update",{id:r.id,patch:{pinned:!r.pinned}})},[M]),it=(0,n.useCallback)((r,p)=>{M("memo/update",{id:r.id,patch:p})},[M]),st=(0,n.useCallback)((r,p)=>{M("memo/schedule",{id:r.id,text:p})},[M]),pt=(0,n.useCallback)(r=>{M("memo/restore",{id:r.id})},[M]),lt=(0,n.useCallback)(r=>{M("memo/purge",{id:r?.id??""})},[M]),mt=(0,n.useCallback)(r=>{r?.kind==="move-today"&&M("memo/bulk-due",{ids:r.ids,text:"今天 18:00"})},[M]),Ot=(0,n.useCallback)(()=>j(null),[]),Te=(0,n.useCallback)(r=>{j(null),M("memo/toggle",{id:r.id})},[M]),Se=(0,n.useCallback)((r,p)=>{j(null),M("memo/snooze",{id:r.id,minutes:p})},[M]),Ee=(0,n.useCallback)(r=>{j(null);let p=new Date,f=new Date(p);f.setDate(p.getDate()+1),f.setHours(9,0,0,0);let N=Math.max(60,Math.round((f.getTime()-p.getTime())/6e4));M("memo/snooze",{id:r.id,minutes:N})},[M]),dt=(0,n.useCallback)(()=>{M("memo/clear-done",{})},[M]),ct=(0,n.useCallback)(async()=>{try{let r=await t({op:"memo/export"}),p=await ye(r.text);C(p?"清单复制好了":"复制没成功，再点一次")}catch(r){C(r?.message??"复制失败")}},[t,C]),xt=(0,n.useCallback)(async()=>{O(!0);try{await t({op:"chat/reset"}),E(""),d(!1),C("对话重开了，备忘还在")}catch(r){C(r?.message??"没完成")}finally{O(!1)}},[t,C]),ut=(0,n.useCallback)(async()=>{O(!0);try{await t({op:"memo/clear-all"});let r=await pe();a(r),E(""),d(!1),W(!1),C("全部清空了")}catch(r){C(r?.message??"没完成")}finally{O(!1)}},[t,pe,C]),bt=(0,n.useCallback)(async r=>{let p=String(r??"").trim().slice(0,12);if(!p)return;let f=await t({op:"pet/update",patch:{name:p}});a(N=>N&&{...N,pet:f.pet})},[t]),gt=(0,n.useCallback)(async r=>{let p=await t({op:"pet/update",patch:{quiet:r}});a(f=>f&&{...f,pet:p.pet})},[t]),$e=o?.stats??{open:0,overdue:0,dueToday:0,total:0},De=(0,n.useMemo)(()=>{if(P)return P;let r=o?.lines??[];if(!r.length)return"我先坐在这儿。想到什么，说一句就行。";let p=Math.floor(Date.now()/6e4);return r[p%r.length]},[P,o]),fe=o?.pet?.edge??"right",ne=X??Me(fe,K.w,K.h),le=(0,n.useMemo)(()=>It(ne.x,ne.y,R,K.w,K.h),[ne,R,K]),Le={x:le.x-ne.x,y:le.y-ne.y},ht=(0,n.useMemo)(()=>{let r=ne.y;return Math.min(.84,Math.max(.14,r/Math.max(1,K.h)))},[ne,K]),ve=l?"open":g?"peek":"closed";return n.default.createElement("div",{className:"mp-root","data-mode":ve,"data-side":le.side,"data-dragging":v?"true":"false"},n.default.createElement("div",{className:"mp-layer"},n.default.createElement("div",{ref:k.float,className:"mp-float","data-hidden":ve==="closed"||l&&le.side==="sheet"?"true":"false"},n.default.createElement("div",{className:"mp-grab",onPointerDown:r=>{k.onPointerDown(r),k.wake()},onPointerMove:k.onPointerMove,onPointerUp:k.onPointerUp,onPointerCancel:k.onPointerUp,onDoubleClick:oe,onClick:()=>{l||oe()},role:"button",tabIndex:0,"aria-label":"阿墨，点一下打开备忘",onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),oe())}},n.default.createElement(Oe,{rig:k})),l?n.default.createElement("div",{ref:I,className:"mp-panel-shell","data-side":le.side,style:{left:`${Le.x}px`,top:`${Le.y}px`}},A&&o?n.default.createElement(Je,{data:o,onClose:()=>W(!1),onRename:bt,onQuiet:gt,onClearAll:ut}):o?n.default.createElement(We,{data:o,placement:le,line:De,thinking:u,suggestions:D?[]:o.suggestions??[],busy:b,error:Q,draft:_,setDraft:F,onSend:tt,onClose:ae,onToggle:rt,onRemove:ot,onPin:nt,onEdit:it,onOpenLink:Z,onSchedule:st,onRestore:pt,onPurge:lt,onAct:mt,alert:B,onAlertDone:Te,onAlertSnooze:Se,onAlertDismiss:Ee,onCopyAll:ct,onClearDone:dt,onReset:xt,search:D,setSearch:q,onSettings:()=>W(!0)}):n.default.createElement("div",{className:"mp-panel mp-loading"},n.default.createElement("span",{className:"mp-typing"},n.default.createElement("i",null),n.default.createElement("i",null),n.default.createElement("i",null)))):null,!l&&g&&o?n.default.createElement(Ge,{line:P||(o.lines?.[0]??De),side:fe,count:$e.open,alert:B,onAlertDone:Te,onAlertSnooze:Se,onAlertDismiss:Ee,onEnter:()=>h(!0),onLeave:()=>{B||h(!1)},onOpen:()=>{h(!1),oe()}}):null),ve!=="open"?n.default.createElement(Ke,{edge:fe,top:ht,count:$e.open,expanded:g,onPeek:r=>{h(r),r&&et()},onOpen:oe,label:`打开备忘精灵 · ${o?.pet?.name??"阿墨"}`}):null),n.default.createElement(Ze,{toast:L,onUndo:at}))}function _t(t){return t.duplicate?"listening":t.memo?.dueAt?"alert":"happy"}async function ze(t){let m=document.createElement("style");m.dataset.memoPet="true",m.textContent=Xe,document.head.append(m),t.effect(()=>()=>m.remove());let o=await t.remote.$mount({package:Ie,descriptors:Fe}),a=t.inject(["remote."+de],l=>{let s=Ft(l);l.effect(()=>l.slots.inject("shell.overlay",()=>l.slots.register({name:"shell.overlay",id:"memo-pet",order:70},()=>n.default.createElement(Xt,{request:s,ctx:l}))),"memo-pet: overlay")});try{await a}catch(l){throw console.error("MEMO_PET_INSTALL_FAILED",l&&(l.stack||l.message||String(l))),await a.dispose?.(),await o?.(),l}return async()=>{await a.dispose?.(),await o?.()}}ze.inject=Lt;var Ht=ze,Bt=ze;

return module.exports;}});