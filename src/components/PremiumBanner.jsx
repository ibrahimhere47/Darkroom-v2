import React from "react";

/**
 * PremiumBanner
 * A dark, jewel-toned upgrade banner. No required props — drop it in anywhere.
 *
 * Design tokens
 * ----------------------------------------------------
 * bg-0     #0A0A0C   graphite base
 * bg-1     #151319   elevated panel
 * gold-600 #9C7A2E   deep facet shadow
 * gold-500 #C9A227   primary gold
 * gold-400 #E8C468   mid highlight
 * gold-200 #F7E9B8   bright specular
 * ivory    #F6F1E4   headline / body text
 * muted    #9A927C   secondary text
 * ----------------------------------------------------
 */

export default function PremiumBanner({ onUpgrade = () => {} }) {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .pb-root {
          --bg-0: #0A0A0C;
          --bg-1: #17141B;
          --gold-600: #93711F;
          --gold-500: #C9A227;
          --gold-400: #E8C468;
          --gold-200: #F7E9B8;
          --ivory: #F6F1E4;
          --muted: #9A927C;
          font-family: 'JetBrains Mono', monospace;
        }

        .pb-serif { font-family: 'Fraunces', serif; }

        .pb-cta {
          background: linear-gradient(180deg, var(--gold-400), var(--gold-500));
          box-shadow: 0 1px 0 rgba(255,255,255,0.35) inset, 0 10px 24px -10px rgba(201,162,39,0.55);
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .pb-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.06);
          box-shadow: 0 1px 0 rgba(255,255,255,0.4) inset, 0 16px 30px -10px rgba(201,162,39,0.7);
        }
        .pb-cta:active { transform: translateY(0px) scale(0.99); }

        .pb-gem-float { animation: pb-float 6s ease-in-out infinite; }
        .pb-gem-float-slow { animation: pb-float 7.5s ease-in-out infinite; animation-delay: -2s; }
        @keyframes pb-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-9px); }
        }

        .pb-sparkle { transform-origin: center; animation: pb-twinkle 3.2s ease-in-out infinite; }
        @keyframes pb-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.4) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(8deg); }
        }

        .pb-grid { background-image: radial-gradient(rgba(232,196,104,0.16) 1px, transparent 1px); background-size: 22px 22px; }
      `}</style>

      <div
        className="pb-root relative w-full max-w-6xl overflow-hidden rounded-2xl bg-linear-135 from-neutral-950 to-neutral-900"
      >
        {/* fine dot grid, precision-instrument texture */}
        <div className="pb-grid absolute inset-0 opacity-40 pointer-events-none" />

        {/* warm glow behind the gems */}
        <div
          className="absolute right-0 top-0 h-full w-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle at 75% 50%, rgba(201,162,39,0.25), transparent 60%)" }}
        />

        <div className="relative grid grid-cols-1 md:grid-cols-5 items-center gap-8 px-8 py-14 md:px-14 md:py-16">
          {/* Left: content */}
          <div className="md:col-span-3 flex flex-col items-start gap-5">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--gold-400)", letterSpacing: "0.18em" }}
            >
              <span style={{ color: "var(--muted)" }}>[</span> Pro Access <span style={{ color: "var(--muted)" }}>]</span>
            </span>

            <h1
              className="pb-serif font-semibold leading-none"
              style={{ color: "var(--ivory)", fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
            >
              Premium
            </h1>

            <p
              className="max-w-md text-sm md:text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Every tool unlocked, every limit removed. Built for people who
              don't wait on their software.
            </p>

            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs"
              style={{
                border: "1px solid rgba(232,196,104,0.35)",
                background: "rgba(232,196,104,0.06)",
                color: "var(--gold-200)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" fill="var(--gold-400)" />
              </svg>
              10&times; more productivity
            </div>

            <button
              onClick={onUpgrade}
              className="pb-cta mt-2 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
              style={{ color: "var(--bg-0)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 8 L8 12 L12 6 L16 12 L20 8 L18 18 H6 Z"
                  fill="var(--bg-0)"
                />
              </svg>
              Upgrade Now
            </button>

            <span className="text-xs" style={{ color: "var(--muted)" }}>
              Cancel anytime &middot; Instant access
            </span>
          </div>

          {/* Right: faceted gem signature */}
          <div className="md:col-span-2 relative hidden md:flex items-center justify-center h-full min-h-[260px]">
            <svg
              viewBox="0 0 420 300"
              className="w-full h-auto max-w-90"
              aria-hidden="true"
            >
              <defs>
                <clipPath id="pbGemClipA">
                  <path d="M115,50 L165,50 L235,120 L182,138 L140,300 L98,138 L45,120 Z" />
                </clipPath>
                <clipPath id="pbGemClipB">
                  <path d="M280,20 L318,20 L370,72 L333,86 L299,220 L266,86 L229,72 Z" />
                </clipPath>
              </defs>

              {/* secondary smaller gem, upper right, softer */}
              <g className="pb-gem-float-slow" opacity="0.55">
                <path
                  d="M280,20 L318,20 L370,72 L333,86 L299,220 L266,86 L229,72 Z"
                  fill="var(--bg-1)"
                  stroke="var(--gold-500)"
                  strokeWidth="1.5"
                />
                <g stroke="var(--gold-500)" strokeWidth="1" opacity="0.8">
                  <line x1="299" y1="20" x2="229" y2="72" />
                  <line x1="299" y1="20" x2="370" y2="72" />
                  <line x1="299" y1="20" x2="266" y2="86" />
                  <line x1="299" y1="20" x2="333" y2="86" />
                  <line x1="229" y1="72" x2="299" y2="220" />
                  <line x1="266" y1="86" x2="299" y2="220" />
                  <line x1="333" y1="86" x2="299" y2="220" />
                  <line x1="370" y1="72" x2="299" y2="220" />
                </g>
                <ellipse cx="299" cy="45" rx="60" ry="22" fill="var(--gold-200)" opacity="0.25" clipPath="url(#pbGemClipB)" />
              </g>

              {/* primary gem */}
              <g className="pb-gem-float">
                <path
                  d="M115,50 L165,50 L235,120 L182,138 L140,300 L98,138 L45,120 Z"
                  fill="var(--bg-1)"
                  stroke="var(--gold-400)"
                  strokeWidth="2"
                />
                <g stroke="var(--gold-400)" strokeWidth="1.4" opacity="0.9">
                  <line x1="140" y1="50" x2="45" y2="120" />
                  <line x1="140" y1="50" x2="235" y2="120" />
                  <line x1="140" y1="50" x2="98" y2="138" />
                  <line x1="140" y1="50" x2="182" y2="138" />
                  <line x1="45" y1="120" x2="140" y2="300" />
                  <line x1="98" y1="138" x2="140" y2="300" />
                  <line x1="182" y1="138" x2="140" y2="300" />
                  <line x1="235" y1="120" x2="140" y2="300" />
                </g>
                {/* table facet, brightest */}
                <polygon points="115,50 165,50 140,50" fill="none" />
                <polygon points="115,50 165,50 182,138 98,138" fill="var(--gold-500)" opacity="0.18" />
                {/* moving specular highlight, clipped to gem */}
                <g clipPath="url(#pbGemClipA)">
                  <ellipse cx="60" cy="90" rx="34" ry="90" fill="var(--gold-200)" opacity="0.35">
                    <animate attributeName="cx" values="20;260;20" dur="7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.05;0.4;0.05" dur="7s" repeatCount="indefinite" />
                  </ellipse>
                </g>
              </g>

              {/* sparkles */}
              <g fill="var(--gold-200)">
                <path className="pb-sparkle" style={{ animationDelay: "0s" }} transform="translate(30,40)" d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" />
                <path className="pb-sparkle" style={{ animationDelay: "1.1s" }} transform="translate(250,60) scale(0.7)" d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" />
                <path className="pb-sparkle" style={{ animationDelay: "2s" }} transform="translate(380,150) scale(0.6)" d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" />
                <path className="pb-sparkle" style={{ animationDelay: "0.6s" }} transform="translate(70,260) scale(0.8)" d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
