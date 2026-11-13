window.__ModuleLoader__.load({id:'dsh-memo-pet',factory(require){
const module={exports:{}};let exports=module.exports;
var lt=Object.create;var me=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var dt=Object.getOwnPropertyNames;var ct=Object.getPrototypeOf,xt=Object.prototype.hasOwnProperty;var ut=(e,l)=>{for(var r in l)me(e,r,{get:l[r],enumerable:!0})},Ee=(e,l,r,o)=>{if(l&&typeof l=="object"||typeof l=="function")for(let p of dt(l))!xt.call(e,p)&&p!==r&&me(e,p,{get:()=>l[p],enumerable:!(o=mt(l,p))||o.enumerable});return e};var de=(e,l,r)=>(r=e!=null?lt(ct(e)):{},Ee(l||!e||!e.__esModule?me(r,"default",{value:e,enumerable:!0}):r,e)),bt=e=>Ee(me({},"__esModule",{value:!0}),e);var Yt={};ut(Yt,{apply:()=>St,default:()=>Lt,inject:()=>Ve});module.exports=bt(Yt);var s=de(require("react"),1);var Se="dsh-memo-pet",ae="memoPet",$e={mode:"strict",typeSymbol:"MemoPetJson",create:()=>({parse(e){if(!e||typeof e!="object"||Array.isArray(e))throw new TypeError("Expected an object");return e}})},Le=[{id:ae+"/request",service:ae,namespace:ae,method:"request",invocation:{kind:"direct"},parameters:[{name:"input",wire:"input",source:"json",codec:$e}],cancellation:{parameter:"signal"},result:$e}];var Ye=`/* =========================================================================
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
`;var x=de(require("react"),1),ht={fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round",strokeLinejoin:"round"};function E({name:e,size:l=15,...r}){let o={width:l,height:l,viewBox:"0 0 20 20","aria-hidden":"true",...ht,...r};switch(e){case"send":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"M4.5 10h11M11 5.5 15.5 10 11 14.5"}));case"search":return x.default.createElement("svg",{...o},x.default.createElement("circle",{cx:"9",cy:"9",r:"4.6"}),x.default.createElement("path",{d:"m12.6 12.6 3 3"}));case"copy":return x.default.createElement("svg",{...o},x.default.createElement("rect",{x:"7",y:"7",width:"8.5",height:"8.5",rx:"2"}),x.default.createElement("path",{d:"M12.5 5.2V5a1.6 1.6 0 0 0-1.6-1.6H5.6A1.6 1.6 0 0 0 4 5v5.3c0 .9.7 1.6 1.6 1.6h.2"}));case"check":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"m4.8 10.4 3.4 3.4 7-7.6"}));case"pin":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"M7.2 3.6h5.6l-.7 4.2 2.4 2.5H5.5l2.4-2.5z"}),x.default.createElement("path",{d:"M10 10.3v6"}));case"trash":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"M4.4 6.2h11.2M8 6.2V4.6c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v1.6M6.4 6.2l.6 9c0 .6.5 1 1 1h4c.5 0 1-.4 1-1l.6-9"}));case"minus":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"M5 10h10"}));case"close":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"m5.6 5.6 8.8 8.8M14.4 5.6l-8.8 8.8"}));case"spark":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"M10 3.4c.6 3 1.9 4.3 4.9 4.9-3 .6-4.3 1.9-4.9 4.9-.6-3-1.9-4.3-4.9-4.9 3-.6 4.3-1.9 4.9-4.9Z"}),x.default.createElement("path",{d:"M15.2 13.4c.3 1.4.9 2 2.3 2.3-1.4.3-2 .9-2.3 2.3-.3-1.4-.9-2-2.3-2.3 1.4-.3 2-.9 2.3-2.3Z"}));case"clock":return x.default.createElement("svg",{...o},x.default.createElement("circle",{cx:"10",cy:"10",r:"6.4"}),x.default.createElement("path",{d:"M10 6.4V10l2.6 1.6"}));case"inbox":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"M3.6 10.4 6 4.6h8l2.4 5.8v4.2c0 .6-.4 1-1 1H4.6c-.6 0-1-.4-1-1z"}),x.default.createElement("path",{d:"M3.8 10.6h3l.8 1.8h4.8l.8-1.8h3"}));case"edit":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"m12.4 4.6 3 3L8 15H5v-3z"}));case"arrow":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"M7 4.8 12.2 10 7 15.2"}));case"link":return x.default.createElement("svg",{...o},x.default.createElement("path",{d:"M8.4 11.6a3 3 0 0 0 4.2 0l2.2-2.2a3 3 0 0 0-4.2-4.2l-1.1 1.1"}),x.default.createElement("path",{d:"M11.6 8.4a3 3 0 0 0-4.2 0L5.2 10.6a3 3 0 0 0 4.2 4.2l1.1-1.1"}));default:return x.default.createElement("svg",{...o},x.default.createElement("circle",{cx:"10",cy:"10",r:"6"}))}}async function fe(e){let l=String(e??"");if(!l)return!1;try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(l),!0}catch{}try{let r=document.createElement("textarea");r.value=l,r.setAttribute("readonly",""),r.style.cssText="position:fixed;top:-1000px;opacity:0",document.body.append(r),r.select();let o=document.execCommand("copy");return r.remove(),o}catch{return!1}}function ne({text:e,label:l="复制",doneLabel:r="已复制",className:o="",title:p,iconOnly:i=!1,onCopied:v}){let[h,g]=(0,x.useState)("idle"),P=(0,x.useRef)(0);(0,x.useEffect)(()=>()=>clearTimeout(P.current),[]);let $=(0,x.useCallback)(async X=>{X.stopPropagation();let A=await fe(typeof e=="function"?e():e);g(A?"done":"fail"),A&&v?.(),clearTimeout(P.current),P.current=setTimeout(()=>g("idle"),1600)},[e,v]),C=h==="done";return x.default.createElement("button",{type:"button",className:`mp-copy ${C?"is-done":""} ${i?"is-icon":""} ${o}`,onClick:$,title:p??l,"aria-label":p??l,"data-state":h},x.default.createElement("span",{className:"mp-copy-icon"},C?x.default.createElement(E,{name:"check",size:13}):x.default.createElement(E,{name:"copy",size:13})),i?null:x.default.createElement("span",{className:"mp-copy-label"},C?r:h==="fail"?"复制失败":l),x.default.createElement("span",{className:"mp-copy-burst","aria-hidden":"true"}))}function De(e,l=Date.now()){let o=new Date(l);o.setHours(0,0,0,0);let p=new Date(e);p.setHours(0,0,0,0);let i=Math.round((p-o)/864e5);if(i===0)return"今天";if(i===-1)return"昨天";if(i===1)return"明天";if(i<0&&i>-7)return`${-i} 天前`;let v=new Date(e);return`${v.getMonth()+1} 月 ${v.getDate()} 日`}function ve(e){let l=(0,x.useRef)(e);return l.current=e,l}var ft=/https?:\/\/[^\s<>"'`，。；、）)】》]+/gi,Ae=e=>{try{return new URL(String(e)).host.replace(/^www\./i,"")}catch{return""}};function ye({text:e,onOpen:l,className:r="mp-row-text"}){let o=String(e??""),p=[],i=0;for(let v of o.matchAll(ft)){let h=v.index??0,g=v[0].replace(/[.,;:!?]+$/u,"").replace(/[)\]】》]+$/u,"");h>i&&p.push(o.slice(i,h)),p.push(x.default.createElement("a",{key:`l${h}`,className:"mp-inline-link",href:g,target:"_blank",rel:"noreferrer",onClick:P=>{P.preventDefault(),P.stopPropagation(),l?.(g)}},g.replace(/^https?:\/\//i,""))),i=h+v[0].length}return i<o.length&&p.push(o.slice(i)),x.default.createElement("span",{className:r},p.length?p:o)}var c=de(require("react"),1),ce={stiffness:168,damping:21,mass:1},ke=132,Ie={right:74,bottom:150},B=(e,l,r)=>Math.min(r,Math.max(l,e)),j=()=>typeof performance<"u"?performance.now():Date.now();function vt(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Xe({onDragChange:e,onSettle:l,initial:r}){let o=(0,c.useRef)(null),p=(0,c.useRef)(null),i=(0,c.useRef)({x:0,y:0,vx:0,vy:0,tx:0,ty:0,lean:0,eyeX:0,eyeY:0,blink:0,nextBlink:0,dragging:!1,grabX:0,grabY:0,pointerX:0,pointerY:0,lastInput:j(),wakeUntil:0,mood:"idle",moodUntil:0,ready:!1,landing:0}).current,v=(0,c.useCallback)((u,d)=>{i.x=u,i.y=d,i.tx=u,i.ty=d,i.vx=0,i.vy=0,o.current&&(o.current.style.transform=`translate3d(${u}px, ${d}px, 0)`)},[i]),h=(0,c.useCallback)((u,d)=>{i.tx=B(u,58,window.innerWidth-58),i.ty=B(d,60,window.innerHeight-54)},[i]),g=(0,c.useCallback)(()=>{i.lastInput=j()},[i]),P=(0,c.useCallback)((u="happy",d=900)=>{i.mood=u,i.moodUntil=j()+d},[i]),$=(0,c.useCallback)((u,d=0)=>{i.mood=u,i.moodUntil=d?j()+d:0},[i]);(0,c.useEffect)(()=>{let u=r?.x??window.innerWidth-Ie.right-ke/2,d=r?.y??window.innerHeight-Ie.bottom-ke/2;v(B(u,58,window.innerWidth-58),B(d,60,window.innerHeight-54))},[r,v]),(0,c.useEffect)(()=>{if(vt()){let k=p.current;k&&(k.style.setProperty("--mp-eye-x","0px"),k.style.setProperty("--mp-eye-y","0px"));return}let u=0,d=j(),T=!0,b=()=>{if(!T)return;let k=j(),Y=Math.min(.034,Math.max(.001,(k-d)/1e3));d=k;let n=i,S=p.current,F=o.current;if(n.dragging){let w=1-Math.pow(.0016,Y);n.x+=(n.tx-n.x)*w,n.y+=(n.ty-n.y)*w}else{let w=(n.tx-n.x)*ce.stiffness-n.vx*ce.damping,be=(n.ty-n.y)*ce.stiffness-n.vy*ce.damping;n.vx+=w*Y,n.vy+=be*Y,n.x+=n.vx*Y,n.y+=n.vy*Y;let se=58,pe=window.innerWidth-58,y=60,O=window.innerHeight-54;n.x<se&&(n.x=se,n.vx=Math.abs(n.vx)*.42),n.x>pe&&(n.x=pe,n.vx=-Math.abs(n.vx)*.42),n.y<y&&(n.y=y,n.vy=Math.abs(n.vy)*.42),n.y>O&&(n.y=O,n.vy=-Math.abs(n.vy)*.42)}if(F&&(F.style.transform=`translate3d(${n.x}px, ${n.y}px, 0)`),!S){u=requestAnimationFrame(b);return}let W=Math.hypot(n.vx,n.vy),K=k-n.lastInput;n.moodUntil&&k>n.moodUntil&&(n.mood="idle",n.moodUntil=0),n.mood==="idle"&&(K<60?n.mood="listening":K>32e3&&!n.dragging?n.mood="dozing":K>9e3&&(n.mood="idle"));let I=(n.pointerX||n.x)-n.x,L=(n.pointerY||n.y)-n.y,D=Math.max(1,Math.hypot(I,L)),q=B(I/D*Math.min(3.6,D/26),-3.6,3.6),H=B(L/D*Math.min(2.8,D/30),-2.8,2.8),M=Math.sin(k/3400)*.9,ue=Math.cos(k/4100)*.6;n.eyeX+=(q+M-n.eyeX)*Math.min(1,Y*9),n.eyeY+=(H+ue-n.eyeY)*Math.min(1,Y*9);let ie=B(n.vx*.012,-7.5,7.5);n.lean+=(ie-n.lean)*Math.min(1,Y*7),n.nextBlink||(n.nextBlink=k+2200+Math.random()*3200);let V=0;if(k>n.nextBlink){let w=(k-n.nextBlink)/150;V=w<.5?w*2:Math.max(0,2-w*2),w>=1&&(n.nextBlink=k+2400+Math.random()*4200,V=0)}let R=B(W/1400,0,.11),oe=Math.sin(k/2400)*.5+.5,U=B(-n.vx*.016,-12,12),ee=B(-n.vx*.006+Math.sin(k/1700)*1.6,-7,7);S.style.setProperty("--mp-lean",`${(n.lean+Math.sin(k/3e3)*.8).toFixed(2)}deg`),S.style.setProperty("--mp-squash",R.toFixed(3)),S.style.setProperty("--mp-eye-x",`${n.eyeX.toFixed(2)}px`),S.style.setProperty("--mp-eye-y",`${n.eyeY.toFixed(2)}px`),S.style.setProperty("--mp-blink",V.toFixed(3)),S.style.setProperty("--mp-breath",oe.toFixed(3)),S.style.setProperty("--mp-tail",`${U.toFixed(2)}px`),S.style.setProperty("--mp-antenna",`${ee.toFixed(2)}deg`),S.dataset.mood=n.dragging?"held":n.mood,u=requestAnimationFrame(b)};u=requestAnimationFrame(b);let Q=()=>{document.hidden?(cancelAnimationFrame(u),u=0):u||(d=j(),u=requestAnimationFrame(b))};return document.addEventListener("visibilitychange",Q),()=>{T=!1,cancelAnimationFrame(u),document.removeEventListener("visibilitychange",Q)}},[i]),(0,c.useEffect)(()=>{let u=d=>{i.pointerX=d.clientX,i.pointerY=d.clientY,i.lastInput=j()};return window.addEventListener("pointermove",u,{passive:!0}),()=>window.removeEventListener("pointermove",u)},[i]);let C=(0,c.useCallback)(u=>{if(u.button!==0)return;let d=i;d.dragging=!0,d.grabX=(d.pointerX||u.clientX)-d.x,d.grabY=(d.pointerY||u.clientY)-d.y,d.lastInput=j(),u.currentTarget.setPointerCapture?.(u.pointerId),e?.(!0)},[i,e]),X=(0,c.useCallback)(u=>{let d=i;d.dragging&&(d.tx=B(u.clientX-d.grabX,58,window.innerWidth-58),d.ty=B(u.clientY-d.grabY,60,window.innerHeight-54),d.pointerX=u.clientX,d.pointerY=u.clientY)},[i]),A=(0,c.useCallback)(u=>{let d=i;if(!d.dragging)return;d.dragging=!1,u.currentTarget.releasePointerCapture?.(u.pointerId);let T={x:d.x+d.vx*.13,y:d.y+d.vy*.13},b=window.innerWidth;T.x>b-110?T.x=b-70:T.x<110&&(T.x=70),h(T.x,T.y),e?.(!1),d.lastInput=j(),l?.({x:Math.round(d.tx),y:Math.round(d.ty)})},[i,e,l,h]);return{float:o,creature:p,rig:i,place:v,setTarget:h,wake:g,pulse:P,setMood:$,onPointerDown:C,onPointerMove:X,onPointerUp:A}}function Fe({rig:e,size:l=ke}){return c.default.createElement("div",{ref:e.creature,className:"mp-creature",style:{width:l,height:l},"data-mood":"idle",role:"img","aria-label":"备忘精灵阿墨"},c.default.createElement("div",{className:"mp-aura","aria-hidden":"true"}),c.default.createElement("svg",{className:"mp-orbit",viewBox:"0 0 132 132","aria-hidden":"true"},c.default.createElement("ellipse",{className:"mp-ring",cx:"66",cy:"68",rx:"57",ry:"21",transform:"rotate(-15 66 68)"}),c.default.createElement("g",{className:"mp-mote mp-mote-a"},c.default.createElement("circle",{cx:"123",cy:"68",r:"1.7"})),c.default.createElement("g",{className:"mp-mote mp-mote-b"},c.default.createElement("circle",{cx:"112",cy:"68",r:"1.2"}))),c.default.createElement("svg",{className:"mp-thread",viewBox:"0 0 132 132","aria-hidden":"true"},c.default.createElement("g",{className:"mp-antenna"},c.default.createElement("path",{d:"M66 37c1.2-7.4 3.6-12.6 8.4-16.2"}),c.default.createElement("circle",{cx:"75.4",cy:"19.4",r:"3.4",className:"mp-tip"}),c.default.createElement("circle",{cx:"75.4",cy:"19.4",r:"7",className:"mp-tip-halo"})),c.default.createElement("g",{className:"mp-ribbon"},c.default.createElement("path",{d:"M84 94c9.4 3 15.6 9.4 18.6 19",className:"mp-r1"}),c.default.createElement("path",{d:"M88 101c6.2 2 10.4 6 12.4 12.4",className:"mp-r2"}))),c.default.createElement("div",{className:"mp-body"},c.default.createElement("div",{className:"mp-gloss","aria-hidden":"true"}),c.default.createElement("div",{className:"mp-rim","aria-hidden":"true"}),c.default.createElement("div",{className:"mp-face"},c.default.createElement("div",{className:"mp-eye mp-eye-left"},c.default.createElement("i",null)),c.default.createElement("div",{className:"mp-eye mp-eye-right"},c.default.createElement("i",null)),c.default.createElement("div",{className:"mp-cheek mp-cheek-left","aria-hidden":"true"}),c.default.createElement("div",{className:"mp-cheek mp-cheek-right","aria-hidden":"true"}),c.default.createElement("div",{className:"mp-mouth","aria-hidden":"true"}))),c.default.createElement("div",{className:"mp-zzz","aria-hidden":"true"},c.default.createElement("span",null,"z"),c.default.createElement("span",null,"z")))}function He({edge:e="right",top:l=.42,count:r=0,onPeek:o,onOpen:p,expanded:i,label:v}){let[h,g]=(0,c.useState)(!1),P=(0,c.useRef)(0);(0,c.useEffect)(()=>()=>clearTimeout(P.current),[]);let $=()=>{clearTimeout(P.current),g(!0),o?.(!0)},C=()=>{clearTimeout(P.current),P.current=setTimeout(()=>{g(!1),o?.(!1)},260)};return c.default.createElement("button",{type:"button",className:`mp-perch is-${e} ${h||i?"is-hot":""}`,style:{top:`calc(${(l*100).toFixed(2)}% - 46px)`},onPointerEnter:$,onPointerLeave:C,onFocus:$,onBlur:C,onClick:p,"aria-label":v??"打开备忘精灵",title:`${v??"备忘精灵"} · ${r} 条`},c.default.createElement("span",{className:"mp-perch-rail","aria-hidden":"true"}),c.default.createElement("span",{className:"mp-perch-dots","aria-hidden":"true"},c.default.createElement("i",null),c.default.createElement("i",null),c.default.createElement("i",null)),r>0?c.default.createElement("span",{className:"mp-perch-count","aria-hidden":"true"},r>99?"99+":r):null)}var t=de(require("react"),1);function yt(e,l){if(!e)return"";let r=new Date(e),o=`${String(r.getHours()).padStart(2,"0")}:${String(r.getMinutes()).padStart(2,"0")}`,p=Math.round((new Date(e).setHours(0,0,0,0)-new Date(l).setHours(0,0,0,0))/864e5);return p===0?`今天 ${o}`:p===1?`明天 ${o}`:p===-1?`昨天 ${o}`:p>1&&p<7?`周${"日一二三四五六"[r.getDay()]} ${o}`:`${r.getMonth()+1}/${r.getDate()} ${o}`}function _e(){return t.default.createElement("span",{className:"mp-mark","aria-hidden":"true"},t.default.createElement("span",{className:"mp-mark-body"},t.default.createElement("i",{className:"mp-mark-eye"}),t.default.createElement("i",{className:"mp-mark-eye"})))}function kt({memo:e,now:l,onToggle:r,onRemove:o,onPin:p,onEdit:i,onOpenLink:v,busy:h}){let[g,P]=(0,t.useState)(!1),[$,C]=(0,t.useState)(e.title),X=(0,t.useRef)(null);(0,t.useEffect)(()=>{if(g){let b=X.current;b?.focus(),b?.setSelectionRange(b.value.length,b.value.length)}},[g]);let A=(0,t.useCallback)(()=>{let b=$.trim();P(!1),b&&b!==e.title?i(e,b):C(e.title)},[$,e,i]),u=!e.done&&e.dueAt&&e.dueAt<l-6e4,d=e.dueAt?yt(e.dueAt,l):"",T=[e.title,e.body,d,e.tags.map(b=>`#${b}`).join(" "),e.link].filter(Boolean).join(" · ");return t.default.createElement("li",{className:`mp-row ${e.done?"is-done":""} ${e.pinned?"is-pinned":""}`,"data-id":e.id},g?null:t.default.createElement("button",{type:"button",className:"mp-check",role:"checkbox","aria-checked":e.done,"aria-label":e.done?"标回未完成":"标成完成",onClick:()=>r(e),disabled:h},t.default.createElement("span",{className:"mp-check-ring"},t.default.createElement(E,{name:"check",size:11}))),t.default.createElement("div",{className:"mp-row-main"},g?t.default.createElement("input",{ref:X,className:"mp-row-edit",value:$,onChange:b=>C(b.target.value),onBlur:A,onKeyDown:b=>{b.key==="Enter"&&(b.preventDefault(),A()),b.key==="Escape"&&(C(e.title),P(!1))}}):t.default.createElement("div",{className:"mp-row-title",onDoubleClick:()=>P(!0),title:`${e.body?e.body+" · ":""}双击改标题`},t.default.createElement(ye,{text:e.title,onOpen:v})),t.default.createElement("div",{className:"mp-row-meta"},d?t.default.createElement("span",{className:`mp-chip ${u?"is-alert":""}`},t.default.createElement(E,{name:"clock",size:11}),d):null,e.tags.map(b=>t.default.createElement("span",{key:b,className:"mp-tag"},"#",b)),e.link?t.default.createElement("a",{className:"mp-link",href:e.link,target:"_blank",rel:"noreferrer",title:`在右侧栏打开 ${e.link}`,onClick:b=>{b.preventDefault(),b.stopPropagation(),v(e.link)}},t.default.createElement(E,{name:"link",size:11}),Ae(e.link)||"链接"):null,!d&&!e.tags.length?t.default.createElement("span",{className:"mp-meta"},De(e.createdAt,l)):null)),t.default.createElement("div",{className:"mp-row-actions"},t.default.createElement(ne,{text:T,iconOnly:!0,label:"复制这条"}),t.default.createElement("button",{type:"button",className:`mp-icon ${e.pinned?"is-on":""}`,onClick:()=>p(e),"aria-label":e.pinned?"取消钉住":"钉住",title:e.pinned?"取消钉住":"钉住"},t.default.createElement(E,{name:"pin",size:13})),t.default.createElement("button",{type:"button",className:"mp-icon mp-icon-danger",onClick:()=>o(e),"aria-label":"删除这条",title:"删除这条"},t.default.createElement(E,{name:"trash",size:13}))))}function wt({draft:e,setDraft:l,onSend:r,busy:o,placeholder:p,hint:i}){let v=(0,t.useRef)(null),h=(0,t.useCallback)(()=>{let g=v.current;g&&(g.style.height="auto",g.style.height=`${Math.min(96,g.scrollHeight)}px`)},[]);return(0,t.useEffect)(h,[e,h]),t.default.createElement("form",{className:"mp-composer",onSubmit:g=>{g.preventDefault(),r()}},t.default.createElement("textarea",{ref:v,className:"mp-input",rows:1,value:e,placeholder:p,spellCheck:!1,onChange:g=>l(g.target.value),onKeyDown:g=>{g.key==="Enter"&&!g.shiftKey&&!g.nativeEvent.isComposing&&(g.preventDefault(),r())}}),t.default.createElement("div",{className:"mp-composer-foot"},t.default.createElement("span",{className:"mp-hint"},i),t.default.createElement("button",{className:"mp-send",type:"submit",disabled:!e.trim()||o,"aria-label":"发送"},t.default.createElement("span",{className:"mp-send-ring","aria-hidden":"true"}),t.default.createElement(E,{name:"send",size:15}))))}function Nt({items:e,now:l}){let[r,o]=(0,t.useState)(0);if((0,t.useEffect)(()=>{r>=e.length&&o(0)},[e.length,r]),!e.length)return null;let p=e[r%e.length];return t.default.createElement("div",{className:"mp-opinion","data-tone":p.tone},t.default.createElement("span",{className:"mp-op-index","aria-hidden":"true"},String(r%e.length+1).padStart(2,"0")),t.default.createElement("div",{className:"mp-op-body"},t.default.createElement("span",{className:"mp-op-label"},p.label),t.default.createElement("p",null,p.line)),t.default.createElement("div",{className:"mp-op-actions"},t.default.createElement(ne,{text:p.copy,label:"复制",doneLabel:"已复制"}),e.length>1?t.default.createElement("button",{type:"button",className:"mp-op-next",onClick:()=>o(i=>(i+1)%e.length),"aria-label":"换一条意见",title:"换一条"},t.default.createElement(E,{name:"arrow",size:12})):null))}function Be({data:e,placement:l,line:r,thinking:o,suggestions:p,busy:i,error:v,draft:h,setDraft:g,onSend:P,onClose:$,onToggle:C,onRemove:X,onPin:A,onEdit:u,onOpenLink:d,onCopyAll:T,onClearDone:b,onReset:Q,search:k,setSearch:Y,onSettings:n}){let S=e.now??Date.now(),F=e.memos??[],W=F.filter(M=>!M.done),K=F.filter(M=>M.done),I=k.trim().toLowerCase(),L=I?F.filter(M=>`${M.title} ${M.body} ${M.tags.join(" ")}`.toLowerCase().includes(I)):F,[D,q]=(0,t.useState)(!1),H=(0,t.useRef)(null);return(0,t.useEffect)(()=>{D&&H.current?.focus()},[D]),t.default.createElement("section",{className:"mp-panel","data-side":l.side,"aria-label":"备忘精灵"},t.default.createElement("header",{className:"mp-head"},t.default.createElement(_e,null),t.default.createElement("div",{className:"mp-id"},t.default.createElement("b",null,e.pet?.name??"阿墨"),t.default.createElement("span",{className:"mp-status","data-dot":o?"busy":"idle"},o?"在想":e.stats?.open?`${e.stats.open} 条待办`:"清单是空的")),t.default.createElement("div",{className:"mp-head-actions"},t.default.createElement("button",{type:"button",className:`mp-icon ${D?"is-on":""}`,onClick:()=>{q(M=>!M),D&&Y("")},"aria-label":"搜索备忘",title:"搜索"},t.default.createElement(E,{name:"search",size:14})),t.default.createElement("button",{type:"button",className:"mp-icon",onClick:n,"aria-label":"宠物设置",title:"设置"},t.default.createElement(E,{name:"spark",size:14})),t.default.createElement("button",{type:"button",className:"mp-icon",onClick:$,"aria-label":"收起",title:"收起（Esc）"},t.default.createElement(E,{name:"close",size:14})))),D?t.default.createElement("div",{className:"mp-search"},t.default.createElement(E,{name:"search",size:13}),t.default.createElement("input",{ref:H,value:k,placeholder:"搜标题、正文或标签",onChange:M=>Y(M.target.value),onKeyDown:M=>{M.key==="Escape"&&(q(!1),Y(""))}})):null,t.default.createElement("div",{className:"mp-hero"},t.default.createElement("div",{className:"mp-hero-head"},t.default.createElement("span",{className:"mp-eyebrow"},"阿墨说"),!o&&r?t.default.createElement(ne,{text:r,label:"复制",doneLabel:"已复制"}):null),o?t.default.createElement("span",{className:"mp-typing","aria-label":"正在想"},t.default.createElement("i",null),t.default.createElement("i",null),t.default.createElement("i",null)):t.default.createElement("p",{className:"mp-line"},t.default.createElement(ye,{text:r,onOpen:d,className:"mp-line-text"}))),p.length&&!D?t.default.createElement(Nt,{items:p.slice(0,3),now:S}):null,t.default.createElement(wt,{draft:h,setDraft:g,onSend:P,busy:i,placeholder:"记一句，或者问我…",hint:"Enter 记下 · 支持「明天 18:00」「#标签」"}),v?t.default.createElement("p",{className:"mp-error",role:"status"},v):null,t.default.createElement("div",{className:"mp-list-head"},t.default.createElement("span",null,I?`搜索「${k.trim()}」`:"清单"),t.default.createElement("span",{className:"mp-list-count"},I?`${L.length} 条结果`:`${W.length} 条`)),t.default.createElement("ul",{className:"mp-list"},L.length===0?t.default.createElement("li",{className:"mp-empty"},t.default.createElement("div",{className:"mp-empty-art","aria-hidden":"true"},t.default.createElement("span",null),t.default.createElement("span",null)),t.default.createElement("p",null,I?"没搜到。换个词试试？":"还没有备忘。说一句，我替你记着。"),I?null:t.default.createElement("div",{className:"mp-starters"},(e.starters??[]).slice(0,3).map(M=>t.default.createElement("button",{key:M,type:"button",onClick:()=>g(M)},t.default.createElement("span",{"aria-hidden":"true"},"＋"),M)))):L.map(M=>t.default.createElement(kt,{key:M.id,memo:M,now:S,busy:i,onToggle:C,onRemove:X,onPin:A,onEdit:u,onOpenLink:d}))),t.default.createElement("footer",{className:"mp-foot"},t.default.createElement("div",{className:"mp-foot-left"},t.default.createElement("button",{type:"button",className:"mp-text-btn",onClick:T},t.default.createElement(E,{name:"copy",size:12}),"复制清单"),K.length?t.default.createElement("button",{type:"button",className:"mp-text-btn",onClick:b},"清掉已完成 ",K.length):null),t.default.createElement("div",{className:"mp-foot-right"},t.default.createElement("button",{type:"button",className:"mp-text-btn mp-quiet",onClick:Q},"重开对话"),t.default.createElement("kbd",{className:"mp-kbd"},"⌘⇧M"))))}function je({line:e,side:l,onEnter:r,onLeave:o,onOpen:p,count:i}){return t.default.createElement("div",{className:"mp-peek","data-side":l,onPointerEnter:r,onPointerLeave:o},t.default.createElement("p",{className:"mp-peek-line"},e),t.default.createElement("div",{className:"mp-peek-foot"},t.default.createElement(ne,{text:e,label:"复制",doneLabel:"已复制"}),t.default.createElement("button",{type:"button",className:"mp-peek-open",onClick:p},i?`看这 ${i} 条`:"打开"," ",t.default.createElement(E,{name:"arrow",size:12}))),t.default.createElement("span",{className:"mp-peek-tail","aria-hidden":"true"}))}function Oe({data:e,onClose:l,onRename:r,onQuiet:o,onClearAll:p}){let[i,v]=(0,t.useState)(e.pet?.name??"阿墨");return t.default.createElement("section",{className:"mp-panel mp-settings","aria-label":"宠物设置"},t.default.createElement("header",{className:"mp-head"},t.default.createElement(_e,null),t.default.createElement("div",{className:"mp-id"},t.default.createElement("b",null,"阿墨"),t.default.createElement("span",{className:"mp-status"},"设置")),t.default.createElement("div",{className:"mp-head-actions"},t.default.createElement("button",{type:"button",className:"mp-icon",onClick:l,"aria-label":"关闭"},t.default.createElement(E,{name:"close",size:14})))),t.default.createElement("div",{className:"mp-set-body"},t.default.createElement("label",{className:"mp-field"},t.default.createElement("span",null,"名字"),t.default.createElement("input",{value:i,maxLength:12,onChange:h=>v(h.target.value),onBlur:()=>r(i),onKeyDown:h=>{h.key==="Enter"&&r(i)}})),t.default.createElement("label",{className:"mp-switch"},t.default.createElement("span",null,t.default.createElement("b",null,"安静模式"),t.default.createElement("small",null,"藏起来，不主动冒出来说话")),t.default.createElement("input",{type:"checkbox",checked:e.pet?.quiet===!0,onChange:h=>o(h.target.checked)}),t.default.createElement("i",{"aria-hidden":"true"})),t.default.createElement("div",{className:"mp-set-meta"},t.default.createElement("p",null,"备忘存在 ",t.default.createElement("code",null,e.directory)),t.default.createElement("p",null,e.stats?.open??0," 条待办 · 共 ",e.stats?.total??0," 条 · 对话 ",e.chat?.turns??0," 轮"),e.hasModel?null:t.default.createElement("p",{className:"mp-warn"},"还没选默认模型，阿墨只能记录、不能答话。")),t.default.createElement("button",{type:"button",className:"mp-danger",onClick:p},"清空全部备忘与对话")))}function Ke({toast:e,onUndo:l}){return e?t.default.createElement("div",{className:"mp-toast",role:"status","data-tone":e.tone??"calm"},t.default.createElement("span",null,e.text),e.undo?t.default.createElement("button",{type:"button",onClick:()=>{l(e.undo)}},"撤销"):null):null}var Ve=["slots","remote"],Mt=Ve,Ue=700,We=66,zt={width:392,height:566},Pt=45e3;function xe(){return{w:window.innerWidth,h:window.innerHeight}}function Ct(e,l,r,o,p){if(o<720)return{side:"sheet",x:10,y:Math.max(10,p-r.height-10)};let i=e>o/2?"left":"right",v=i==="left"?e-We-20-r.width:e+We+20,h=Math.min(Math.max(12,v),Math.max(12,o-r.width-12)),g=Math.min(Math.max(14,l-r.height+152),Math.max(14,p-r.height-14));return{side:i,x:h,y:g}}function we(e,l,r){return e==="left"?{x:70,y:r-170}:{x:l-70,y:r-170}}function Tt(e){return async function(r){let o;try{o=await e.remote[ae].request(r)}catch(i){throw Object.assign(new Error(i?.message||"连接中断，请稍后再试。"),{code:i?.code||"transport"})}let p=o?.ok?o?.value?.error:o?.value?.error??o?.error??{};if(!o?.ok||p)throw Object.assign(new Error(p?.message||"操作没完成，再试一次。"),{code:p?.code||"unavailable"});return o.value}}function Et({request:e,ctx:l}){let[r,o]=(0,s.useState)(null),[p,i]=(0,s.useState)(!1),[v,h]=(0,s.useState)(!1),[g,P]=(0,s.useState)(!1),[$,C]=(0,s.useState)(null),[X,A]=(0,s.useState)(""),[u,d]=(0,s.useState)(!1),[T,b]=(0,s.useState)(""),[Q,k]=(0,s.useState)(""),[Y,n]=(0,s.useState)(null),[S,F]=(0,s.useState)(!1),[W,K]=(0,s.useState)(""),[I,L]=(0,s.useState)(!1),[D,q]=(0,s.useState)(zt),[H,M]=(0,s.useState)(()=>xe()),ue=(0,s.useCallback)(a=>{let m=String(a??"");if(!/^https?:\/\//i.test(m))return;let f=l?.get?.("sidebarRight"),z=l?.get?.("sidebarRightTabs");if(f?.openTab&&(typeof z?.get!="function"||z.get("browser")))try{f.openTab("browser",{params:{url:m}}),i(!1);return}catch(N){console.error("MEMO_PET_LINK_TAB_FAILED",N)}try{window.open(m,"_blank","noopener,noreferrer")}catch(N){console.error("MEMO_PET_LINK_OPEN_FAILED",N)}},[l]),ie=(0,s.useRef)(null),V=(0,s.useRef)(0),R=(0,s.useRef)(0),oe=(0,s.useRef)(0),U=ve(r),ee=ve(p),w=(0,s.useCallback)((a,m={})=>{n({text:a,...m}),clearTimeout(V.current),V.current=setTimeout(()=>n(null),m.undo?6500:2200)},[]);(0,s.useEffect)(()=>()=>{clearTimeout(V.current),clearTimeout(oe.current),clearTimeout(R.current)},[]);let be=(0,s.useCallback)(a=>P(a),[]),se=(0,s.useCallback)(async({x:a,y:m})=>{C({x:a,y:m});let f=a>window.innerWidth/2?"right":"left";try{let z=await e({op:"pet/update",patch:{position:{x:a,y:m},edge:f}});o(N=>N&&{...N,pet:z.pet})}catch{}},[e]),pe=r?.pet?.position??null,y=Xe({onDragChange:be,onSettle:se,initial:pe});(0,s.useEffect)(()=>{r&&!$&&C({x:y.rig.x,y:y.rig.y})},[r,$,y]),(0,s.useEffect)(()=>{let a=()=>{let m=xe();M(m);let f=y.rig;y.setTarget(Math.min(f.x,m.w-58),Math.min(f.y,m.h-54)),C({x:Math.min(f.x,m.w-58),y:Math.min(f.y,m.h-54)})};return window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[y]),(0,s.useEffect)(()=>{let a=ie.current;if(!a)return;let m=()=>{let z=a.getBoundingClientRect();if(z.width>40){let N={width:Math.round(z.width),height:Math.round(z.height)};q(re=>re.width===N.width&&re.height===N.height?re:N)}};m();let f=new ResizeObserver(m);return f.observe(a),()=>f.disconnect()},[r,p,S,u,T,W]);let O=(0,s.useCallback)(async()=>{let a=await e({op:"bootstrap"});return o(a),a},[e]);(0,s.useEffect)(()=>{let a=!0;return O().catch(m=>{a&&k(m?.message??"备忘精灵没有起来。")}),()=>{a=!1}},[O]);let Ge=(0,s.useCallback)(()=>{let{w:a,h:m}=xe(),f=U.current?.pet?.position??we(U.current?.pet?.edge??"right",a,m);y.setTarget(f.x,f.y)},[y,U]),G=(0,s.useCallback)(()=>{h(!1),i(!0),k("");let{w:a,h:m}=xe(),f=U.current?.pet?.position??we(U.current?.pet?.edge??"right",a,m);y.wake(),y.setTarget(f.x,f.y),C({x:y.rig.x,y:y.rig.y}),e({op:"pet/update",patch:{collapsed:!1,touch:!0}}).catch(()=>{})},[y,e,U]),J=(0,s.useCallback)(()=>{i(!1),h(!1),F(!1),k(""),e({op:"pet/update",patch:{collapsed:!0,touch:!0}}).catch(()=>{})},[e]),Me=(0,s.useCallback)(()=>{ee.current?J():G()},[ee,J,G]);(0,s.useEffect)(()=>{let a=m=>{if((m.metaKey||m.ctrlKey)&&m.shiftKey&&(m.key==="m"||m.key==="M")){m.preventDefault(),Me();return}m.key==="Escape"&&ee.current&&J()};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[Me,ee,J]),(0,s.useEffect)(()=>{if(!p)return;let a=m=>{m.target?.closest?.(".mp-panel, .mp-grab, .mp-perch, .mp-peek, .mp-toast")||J()};return document.addEventListener("pointerdown",a,!0),()=>document.removeEventListener("pointerdown",a,!0)},[p,J]);let le=(0,s.useCallback)(a=>{b(String(a??"").slice(0,1400)),clearTimeout(oe.current),oe.current=setTimeout(()=>b(""),Pt)},[]),ze=(0,s.useCallback)((a,m)=>{let f=a,z=async()=>{try{let N=await e({op:"chat/poll",cursor:f,sessionId:m});Number.isInteger(N.cursor)&&N.cursor>f&&(f=N.cursor);let re=[...N.messages??[]].reverse().find(pt=>pt.role==="assistant");if(re?.text&&le(re.text),!N.running){d(!1),N.error&&k(N.error);try{await O()}catch{}return}R.current=setTimeout(z,Ue)}catch(N){d(!1),k(N?.message??"没有收到回复。")}};clearTimeout(R.current),R.current=setTimeout(z,Ue)},[e,le,O]),Je=(0,s.useCallback)(async()=>{let a=X.trim();if(!(!a||I)){A(""),k(""),b(""),y.wake(),L(!0);try{let m=await e({op:"say",text:a});m.kind==="memo"?(o(f=>f&&{...f,memos:m.memos,stats:m.stats,suggestions:m.suggestions,lines:m.lines,now:m.now}),le(m.reply),y.pulse($t(m)),w(m.duplicate?"这条已经有了":"记下了")):(d(!0),ze(m.cursor,m.sessionId))}catch(m){k(m?.message??"没发出去。"),A(a)}finally{L(!1)}}},[X,I,y,e,le,w,ze]),_=(0,s.useCallback)(async(a,m,f)=>{L(!0);try{let z=await e({op:a,...m});return z?.memos&&o(N=>N&&{...N,...z}),f?.(z),z}catch(z){return w(z?.message??"没完成"),null}finally{L(!1)}},[e,w]),Ze=(0,s.useCallback)(a=>{y.pulse(a.done?"listening":"happy",700),_("memo/toggle",{id:a.id})},[_,y]),Qe=(0,s.useCallback)(async a=>{await _("memo/remove",{id:a.id})&&(y.pulse("held",500),w("删掉了",{undo:{title:a.title,dueAt:a.dueAt,tags:a.tags}}))},[_,y,w]),qe=(0,s.useCallback)(async a=>{n(null),await _("memo/add",{text:a.title,dueAt:a.dueAt??null,tags:a.tags??[]}),w("放回来了")},[_,w]),Re=(0,s.useCallback)(a=>{_("memo/update",{id:a.id,patch:{pinned:!a.pinned}})},[_]),et=(0,s.useCallback)((a,m)=>{_("memo/update",{id:a.id,patch:{title:m}})},[_]),tt=(0,s.useCallback)(()=>{_("memo/clear-done",{})},[_]),rt=(0,s.useCallback)(async()=>{try{let a=await e({op:"memo/export"}),m=await fe(a.text);w(m?"清单复制好了":"复制没成功，再点一次")}catch(a){w(a?.message??"复制失败")}},[e,w]),at=(0,s.useCallback)(async()=>{L(!0);try{await e({op:"chat/reset"}),b(""),d(!1),w("对话重开了，备忘还在")}catch(a){w(a?.message??"没完成")}finally{L(!1)}},[e,w]),ot=(0,s.useCallback)(async()=>{L(!0);try{await e({op:"memo/clear-all"});let a=await O();o(a),b(""),d(!1),F(!1),w("全部清空了")}catch(a){w(a?.message??"没完成")}finally{L(!1)}},[e,O,w]),nt=(0,s.useCallback)(async a=>{let m=String(a??"").trim().slice(0,12);if(!m)return;let f=await e({op:"pet/update",patch:{name:m}});o(z=>z&&{...z,pet:f.pet})},[e]),it=(0,s.useCallback)(async a=>{let m=await e({op:"pet/update",patch:{quiet:a}});o(f=>f&&{...f,pet:m.pet})},[e]),Pe=r?.stats??{open:0,overdue:0,dueToday:0,total:0},Ce=(0,s.useMemo)(()=>{if(T)return T;let a=r?.lines??[];if(!a.length)return"我先坐在这儿。想到什么，说一句就行。";let m=Math.floor(Date.now()/6e4);return a[m%a.length]},[T,r]),ge=r?.pet?.edge??"right",Z=$??we(ge,H.w,H.h),te=(0,s.useMemo)(()=>Ct(Z.x,Z.y,D,H.w,H.h),[Z,D,H]),Te={x:te.x-Z.x,y:te.y-Z.y},st=(0,s.useMemo)(()=>{let a=Z.y;return Math.min(.84,Math.max(.14,a/Math.max(1,H.h)))},[Z,H]),he=p?"open":v?"peek":"closed";return s.default.createElement("div",{className:"mp-root","data-mode":he,"data-side":te.side,"data-dragging":g?"true":"false"},s.default.createElement("div",{className:"mp-layer"},s.default.createElement("div",{ref:y.float,className:"mp-float","data-hidden":he==="closed"||p&&te.side==="sheet"?"true":"false"},s.default.createElement("div",{className:"mp-grab",onPointerDown:a=>{y.onPointerDown(a),y.wake()},onPointerMove:y.onPointerMove,onPointerUp:y.onPointerUp,onPointerCancel:y.onPointerUp,onDoubleClick:G,onClick:()=>{p||G()},role:"button",tabIndex:0,"aria-label":"阿墨，点一下打开备忘",onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),G())}},s.default.createElement(Fe,{rig:y})),p?s.default.createElement("div",{ref:ie,className:"mp-panel-shell","data-side":te.side,style:{left:`${Te.x}px`,top:`${Te.y}px`}},S&&r?s.default.createElement(Oe,{data:r,onClose:()=>F(!1),onRename:nt,onQuiet:it,onClearAll:ot}):r?s.default.createElement(Be,{data:r,placement:te,line:Ce,thinking:u,suggestions:W?[]:r.suggestions??[],busy:I,error:Q,draft:X,setDraft:A,onSend:Je,onClose:J,onToggle:Ze,onRemove:Qe,onPin:Re,onEdit:et,onOpenLink:ue,onCopyAll:rt,onClearDone:tt,onReset:at,search:W,setSearch:K,onSettings:()=>F(!0)}):s.default.createElement("div",{className:"mp-panel mp-loading"},s.default.createElement("span",{className:"mp-typing"},s.default.createElement("i",null),s.default.createElement("i",null),s.default.createElement("i",null)))):null,!p&&v&&r?s.default.createElement(je,{line:T||(r.lines?.[0]??Ce),side:ge,count:Pe.open,onEnter:()=>h(!0),onLeave:()=>h(!1),onOpen:G}):null),he!=="open"?s.default.createElement(He,{edge:ge,top:st,count:Pe.open,expanded:v,onPeek:a=>{h(a),a&&Ge()},onOpen:G,label:`打开备忘精灵 · ${r?.pet?.name??"阿墨"}`}):null),s.default.createElement(Ke,{toast:Y,onUndo:qe}))}function $t(e){return e.duplicate?"listening":e.memo?.dueAt?"alert":"happy"}async function Ne(e){let l=document.createElement("style");l.dataset.memoPet="true",l.textContent=Ye,document.head.append(l),e.effect(()=>()=>l.remove());let r=await e.remote.$mount({package:Se,descriptors:Le}),o=e.inject(["remote."+ae],p=>{let i=Tt(p);p.effect(()=>p.slots.inject("shell.overlay",()=>p.slots.register({name:"shell.overlay",id:"memo-pet",order:70},()=>s.default.createElement(Et,{request:i,ctx:p}))),"memo-pet: overlay")});try{await o}catch(p){throw console.error("MEMO_PET_INSTALL_FAILED",p&&(p.stack||p.message||String(p))),await o.dispose?.(),await r?.(),p}return async()=>{await o.dispose?.(),await r?.()}}Ne.inject=Mt;var St=Ne,Lt=Ne;

return module.exports;}});