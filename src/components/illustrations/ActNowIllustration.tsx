import React, { useState } from 'react';
import { VolumeX, ThumbsUp, Heart, Sparkles } from 'lucide-react';

interface ActNowIllustrationProps {
  onJoinClick?: () => void;
}

export const ActNowIllustration: React.FC<ActNowIllustrationProps> = ({ onJoinClick }) => {
  const [cheered, setCheered] = useState(false);

  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-square flex items-center justify-center p-2 sm:p-4">
      {/* Background Soft Green Rings & Foliage Canopy */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[94%] h-[94%] rounded-full border border-emerald-200/50 bg-emerald-50/25" />
        <div className="absolute w-[80%] h-[80%] rounded-full border border-emerald-300/40 bg-emerald-100/25" />
        <div className="absolute w-[64%] h-[64%] rounded-full border border-emerald-400/30 bg-emerald-100/35" />

        {/* Trees / leaves silhouettes in the background */}
        <div className="absolute top-10 right-8 w-24 h-24 rounded-full bg-emerald-200/40 blur-xs" />
        <div className="absolute top-14 left-10 w-28 h-28 rounded-full bg-emerald-300/30 blur-xs" />
      </div>

      {/* Floating Badges */}
      {/* 1. Muted Speaker in Emerald Circle (Left) */}
      <div className="absolute top-12 left-4 sm:left-8 z-20">
        <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 text-white shadow-md border-2 border-emerald-500">
          <VolumeX className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>

      {/* 2. No Car Horn (Right) */}
      <div className="absolute top-10 right-4 sm:right-8 z-20">
        <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-slate-800 shadow-md border-2 border-red-500">
          {/* Car / Horn graphic with red diagonal slash */}
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Horn trumpet */}
            <path d="M4 10 L8 10 L13 6 L13 18 L8 14 L4 14 Z" fill="currentColor" opacity="0.85" />
            <path d="M16 9 C17 10.5 17 13.5 16 15" strokeWidth="2" strokeLinecap="round" />
            {/* Red diagonal prohibition line */}
            <line x1="3" y1="3" x2="21" y2="21" stroke="#ef4444" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Main Group Illustration SVG */}
      <div className="relative z-10 w-full select-none">
        <svg viewBox="0 0 460 380" className="w-full h-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="signGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f7fee7" />
              <stop offset="100%" stopColor="#ecfccb" />
            </linearGradient>
            <linearGradient id="skinG1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fcd3b2" />
              <stop offset="100%" stopColor="#e5b48e" />
            </linearGradient>
            <linearGradient id="skinG2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5cca0" />
              <stop offset="100%" stopColor="#d99f6f" />
            </linearGradient>
            <linearGradient id="skinG3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbe0cb" />
              <stop offset="100%" stopColor="#e8b997" />
            </linearGradient>
            <linearGradient id="skinG4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f6ceaa" />
              <stop offset="100%" stopColor="#d89f70" />
            </linearGradient>
          </defs>

          {/* THE SIGN (Raised High in Center) */}
          {/* Sign Pole / Stick */}
          <rect x="228" y="110" width="8" height="150" fill="#a16207" rx="3" stroke="#713f12" strokeWidth="1.5" />

          {/* Sign Board */}
          <g>
            <rect
              x="130"
              y="68"
              width="200"
              height="105"
              rx="6"
              fill="url(#signGrad)"
              stroke="#65a30d"
              strokeWidth="2.5"
              className="drop-shadow"
            />
            {/* Text inside sign matching image exactly */}
            <text
              x="230"
              y="104"
              textAnchor="middle"
              fill="#1e293b"
              fontFamily="Outfit, Plus Jakarta Sans, sans-serif"
              fontSize="20"
              fontWeight="800"
              letterSpacing="-0.5"
            >
              Menos ruido,
            </text>
            <text
              x="230"
              y="132"
              textAnchor="middle"
              fill="#1e293b"
              fontFamily="Outfit, Plus Jakarta Sans, sans-serif"
              fontSize="20"
              fontWeight="800"
              letterSpacing="-0.5"
            >
              más bienestar
            </text>

            {/* Soundwave symbol below text: —|ı||ı|— */}
            <g transform="translate(230, 152) scale(0.9)">
              <line x1="-36" y1="0" x2="-22" y2="0" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-16" y1="-5" x2="-16" y2="5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-8" y1="-10" x2="-8" y2="10" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
              <line x1="8" y1="-10" x2="8" y2="10" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="16" y1="-5" x2="16" y2="5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="0" x2="36" y2="0" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>

          {/* CHARACTER 1: Leftmost young woman (Giving Thumbs Up) */}
          <g>
            {/* Clothes: Light Olive Green T-shirt */}
            <path
              d="M 60 380 C 60 310, 80 290, 115 285 C 135 285, 145 300, 150 380 Z"
              fill="#52795d"
              stroke="#2c4433"
              strokeWidth="2.5"
            />
            {/* Neck */}
            <path d="M 104 260 L 104 290 L 126 290 L 126 260 Z" fill="url(#skinG1)" />
            {/* Long dark hair behind */}
            <path d="M 90 220 C 70 260, 75 320, 82 340 C 95 320, 100 280, 100 240 Z" fill="#262626" />
            {/* Head */}
            <circle cx="115" cy="235" r="26" fill="url(#skinG1)" stroke="#b87f58" strokeWidth="2" />
            {/* Front hair */}
            <path d="M 92 230 C 92 195, 138 195, 138 230 C 130 215, 120 215, 115 222 C 108 215, 98 215, 92 230 Z" fill="#262626" />
            {/* Friendly face */}
            <ellipse cx="107" cy="236" rx="2.5" ry="3.5" fill="#171717" />
            <ellipse cx="123" cy="236" rx="2.5" ry="3.5" fill="#171717" />
            <path d="M 110 248 Q 115 254 120 248" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />

            {/* Arm & Hand giving Thumbs Up */}
            <path d="M 75 315 C 65 305, 70 270, 82 250" fill="none" stroke="#52795d" strokeWidth="16" strokeLinecap="round" />
            {/* Hand with Thumbs Up */}
            <circle cx="82" cy="245" r="8" fill="url(#skinG1)" stroke="#b87f58" strokeWidth="1.5" />
            <path d="M 82 245 L 82 234" stroke="#b87f58" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* CHARACTER 2: Center Boy (Holding the Sign up with arm) */}
          <g>
            {/* Clothes: Dark Forest Green Hoodie */}
            <path
              d="M 140 380 C 140 300, 165 270, 205 265 C 245 270, 270 300, 270 380 Z"
              fill="#2d5a3f"
              stroke="#173422"
              strokeWidth="2.5"
            />
            {/* Hood drawstrings */}
            <path d="M 195 270 L 195 295" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
            <path d="M 215 270 L 215 295" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />

            {/* Neck */}
            <path d="M 192 240 L 192 270 L 218 270 L 218 240 Z" fill="url(#skinG2)" />
            {/* Head */}
            <circle cx="205" cy="215" r="26" fill="url(#skinG2)" stroke="#b87f58" strokeWidth="2" />
            {/* Short brown spiky hair */}
            <path d="M 182 210 C 180 180, 230 180, 228 210 C 220 200, 210 196, 205 204 C 198 198, 190 200, 182 210 Z" fill="#3f2e22" />
            {/* Confident smiling eyes & eyebrows */}
            <path d="M 192 210 Q 197 207 202 210" fill="none" stroke="#261c14" strokeWidth="2" strokeLinecap="round" />
            <path d="M 208 210 Q 213 207 218 210" fill="none" stroke="#261c14" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="197" cy="217" rx="2.5" ry="3.5" fill="#171717" />
            <ellipse cx="213" cy="217" rx="2.5" ry="3.5" fill="#171717" />
            <path d="M 200 228 Q 205 236 210 228" fill="none" stroke="#78350f" strokeWidth="2.4" strokeLinecap="round" />

            {/* Right Arm raised holding the sign */}
            <path d="M 225 285 C 235 240, 232 180, 232 150" fill="none" stroke="#2d5a3f" strokeWidth="18" strokeLinecap="round" />
            {/* Hand gripping the pole */}
            <circle cx="232" cy="148" r="9" fill="url(#skinG2)" stroke="#b87f58" strokeWidth="1.5" />
          </g>

          {/* CHARACTER 3: Center-Right Young Woman (Calm, Smiling in Dark Green) */}
          <g>
            {/* Clothes: Deep Olive/Forest Green Top */}
            <path
              d="M 260 380 C 260 305, 280 285, 315 285 C 345 285, 365 305, 365 380 Z"
              fill="#3a6b4c"
              stroke="#1b3c27"
              strokeWidth="2.5"
            />
            {/* Neck */}
            <path d="M 302 255 L 302 290 L 328 290 L 328 255 Z" fill="url(#skinG3)" />
            {/* Long dark wavy hair flowing over shoulder */}
            <path d="M 290 225 C 275 260, 280 320, 285 345 C 298 320, 300 280, 300 245 Z" fill="#1c1917" />
            <path d="M 330 225 C 345 260, 345 320, 340 345 C 330 320, 328 280, 326 245 Z" fill="#1c1917" />
            {/* Head */}
            <circle cx="315" cy="230" r="25" fill="url(#skinG3)" stroke="#b87f58" strokeWidth="2" />
            {/* Front hair fringe */}
            <path d="M 292 225 C 292 195, 338 195, 338 225 C 330 214, 320 212, 315 218 C 308 212, 300 214, 292 225 Z" fill="#1c1917" />
            {/* Cheerful face */}
            <ellipse cx="308" cy="232" rx="2.5" ry="3.5" fill="#171717" />
            <ellipse cx="322" cy="232" rx="2.5" ry="3.5" fill="#171717" />
            <path d="M 310 244 Q 315 250 320 244" fill="none" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" />
          </g>

          {/* CHARACTER 4: Rightmost Young Man (Calling Out / Voice Cupped) */}
          <g>
            {/* Clothes: Sage Green Shirt */}
            <path
              d="M 350 380 C 350 315, 370 295, 410 295 C 440 295, 460 315, 460 380 Z"
              fill="#4f7e5b"
              stroke="#21422a"
              strokeWidth="2.5"
            />
            {/* Neck */}
            <path d="M 395 265 L 395 300 L 420 300 L 420 265 Z" fill="url(#skinG4)" />
            {/* Head */}
            <circle cx="408" cy="240" r="26" fill="url(#skinG4)" stroke="#b87f58" strokeWidth="2" />
            {/* Short brown hair */}
            <path d="M 386 235 C 385 205, 430 205, 430 235 C 420 225, 412 224, 408 228 C 400 224, 392 225, 386 235 Z" fill="#452a1c" />
            {/* Expressive face projecting voice */}
            <ellipse cx="400" cy="240" rx="2.5" ry="3" fill="#171717" />
            <ellipse cx="416" cy="240" rx="2.5" ry="3" fill="#171717" />
            {/* Open mouth talking / chanting */}
            <ellipse cx="408" cy="254" rx="5" ry="4" fill="#682121" stroke="#3d1212" strokeWidth="1" />

            {/* Arm with cupped hand near mouth */}
            <path d="M 430 320 C 435 290, 428 260, 418 255" fill="none" stroke="#4f7e5b" strokeWidth="15" strokeLinecap="round" />
            <circle cx="418" cy="255" r="7" fill="url(#skinG4)" stroke="#b87f58" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Floating Interactive Action Badge */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => {
            setCheered(true);
            setTimeout(() => setCheered(false), 2400);
            onJoinClick?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all duration-300 ${
            cheered
              ? 'bg-emerald-600 text-white scale-105 ring-4 ring-emerald-300'
              : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 hover:shadow-lg'
          }`}
        >
          {cheered ? (
            <>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>¡Comunidad unida por el silencio!</span>
            </>
          ) : (
            <>
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Súmate a la iniciativa comunitaria</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
