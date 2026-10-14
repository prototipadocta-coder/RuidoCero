import React from 'react';

interface CitySkylineProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const CitySkyline: React.FC<CitySkylineProps> = ({ className = '', variant = 'full' }) => {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1600 120"
        preserveAspectRatio="none"
        className="w-full h-14 md:h-20 lg:h-24 fill-slate-800 text-slate-800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background skyline layer */}
        <g opacity="0.35" className="fill-slate-600">
          <rect x="20" y="55" width="35" height="65" />
          <polygon points="37,40 25,55 50,55" />
          <rect x="75" y="45" width="48" height="75" />
          <rect x="150" y="30" width="55" height="90" />
          <line x1="177" y1="15" x2="177" y2="30" stroke="currentColor" strokeWidth="2" />
          <rect x="235" y="60" width="40" height="60" />
          <rect x="310" y="40" width="65" height="80" />
          <rect x="420" y="50" width="50" height="70" />
          <polygon points="530,25 510,50 550,50" />
          <rect x="510" y="50" width="40" height="70" />
          <rect x="580" y="35" width="70" height="85" />
          <rect x="690" y="55" width="45" height="65" />
          <rect x="770" y="25" width="55" height="95" />
          <line x1="797" y1="8" x2="797" y2="25" stroke="currentColor" strokeWidth="2" />
          <rect x="850" y="65" width="40" height="55" />
          <rect x="915" y="40" width="60" height="80" />
          <rect x="1010" y="30" width="50" height="90" />
          <rect x="1090" y="58" width="45" height="62" />
          <rect x="1160" y="35" width="75" height="85" />
          <line x1="1197" y1="18" x2="1197" y2="35" stroke="currentColor" strokeWidth="2" />
          <rect x="1270" y="50" width="50" height="70" />
          <rect x="1350" y="28" width="60" height="92" />
          <rect x="1440" y="60" width="45" height="60" />
          <rect x="1515" y="45" width="65" height="75" />
        </g>

        {/* Foreground detailed skyline matching the prototype */}
        <g className="fill-slate-900">
          {/* Section 1: 0 - 200 */}
          <rect x="0" y="75" width="22" height="45" />
          <rect x="25" y="68" width="18" height="52" />
          <polygon points="34,54 27,68 41,68" />
          <rect x="46" y="80" width="26" height="40" />
          <rect x="74" y="62" width="22" height="58" />
          <rect x="98" y="50" width="30" height="70" />
          <line x1="113" y1="36" x2="113" y2="50" stroke="currentColor" strokeWidth="2" />
          <circle cx="113" cy="35" r="2" />
          <rect x="130" y="65" width="24" height="55" />
          <rect x="156" y="74" width="20" height="46" />
          {/* Bridge tower */}
          <polygon points="190,40 185,120 195,120" />
          <polygon points="215,40 210,120 220,120" />
          <rect x="180" y="60" width="45" height="5" />
          <path d="M165,95 Q190,65 202,65 Q215,65 240,95" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Section 2: 200 - 450 */}
          <rect x="235" y="70" width="26" height="50" />
          <rect x="264" y="58" width="32" height="62" />
          <polygon points="280,44 266,58 294,58" />
          <rect x="300" y="75" width="22" height="45" />
          <rect x="325" y="52" width="38" height="68" />
          <line x1="344" y1="38" x2="344" y2="52" stroke="currentColor" strokeWidth="2" />
          <rect x="366" y="68" width="24" height="52" />
          <rect x="393" y="78" width="20" height="42" />
          <rect x="416" y="60" width="30" height="60" />
          <rect x="448" y="70" width="22" height="50" />

          {/* Section 3: 450 - 750 (Center Skyscraper Cluster) */}
          <rect x="473" y="45" width="34" height="75" />
          <polygon points="490,28 475,45 505,45" />
          <line x1="490" y1="18" x2="490" y2="28" stroke="currentColor" strokeWidth="2" />
          <rect x="510" y="64" width="26" height="56" />
          <rect x="539" y="55" width="32" height="65" />
          <rect x="574" y="40" width="42" height="80" />
          <polygon points="595,22 578,40 612,40" />
          <rect x="620" y="62" width="28" height="58" />
          <rect x="651" y="72" width="24" height="48" />
          <rect x="678" y="50" width="36" height="70" />
          <line x1="696" y1="34" x2="696" y2="50" stroke="currentColor" strokeWidth="2" />
          <rect x="717" y="68" width="25" height="52" />
          <rect x="745" y="76" width="20" height="44" />

          {/* Section 4: 750 - 1050 (Bridge & High-rises) */}
          <polygon points="775,38 770,120 780,120" />
          <polygon points="805,38 800,120 810,120" />
          <rect x="768" y="58" width="44" height="4" />
          <path d="M750,92 Q775,62 790,62 Q805,62 830,92" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="825" y="65" width="28" height="55" />
          <rect x="856" y="52" width="36" height="68" />
          <polygon points="874,38 858,52 890,52" />
          <rect x="895" y="70" width="24" height="50" />
          <rect x="922" y="44" width="40" height="76" />
          <line x1="942" y1="28" x2="942" y2="44" stroke="currentColor" strokeWidth="2" />
          <circle cx="942" cy="26" r="2" />
          <rect x="965" y="62" width="26" height="58" />
          <rect x="994" y="74" width="22" height="46" />
          <rect x="1019" y="56" width="34" height="64" />

          {/* Section 5: 1050 - 1350 */}
          <rect x="1056" y="68" width="25" height="52" />
          <rect x="1084" y="48" width="38" height="72" />
          <polygon points="1103,32 1086,48 1120,48" />
          <rect x="1125" y="62" width="28" height="58" />
          <rect x="1156" y="72" width="24" height="48" />
          <rect x="1183" y="42" width="42" height="78" />
          <line x1="1204" y1="25" x2="1204" y2="42" stroke="currentColor" strokeWidth="2" />
          <rect x="1228" y="66" width="26" height="54" />
          <rect x="1257" y="54" width="32" height="66" />
          <rect x="1292" y="72" width="24" height="48" />
          <rect x="1319" y="60" width="30" height="60" />

          {/* Section 6: 1350 - 1600 */}
          <rect x="1352" y="50" width="36" height="70" />
          <polygon points="1370,36 1354,50 1386,50" />
          <rect x="1391" y="68" width="26" height="52" />
          <rect x="1420" y="58" width="34" height="62" />
          <rect x="1457" y="75" width="22" height="45" />
          <rect x="1482" y="48" width="38" height="72" />
          <line x1="1501" y1="32" x2="1501" y2="48" stroke="currentColor" strokeWidth="2" />
          <rect x="1523" y="64" width="28" height="56" />
          <rect x="1554" y="72" width="46" height="48" />

          {/* Tiny urban trees & street details interspersed */}
          <circle cx="68" cy="108" r="6" />
          <circle cx="230" cy="110" r="7" />
          <circle cx="390" cy="109" r="6" />
          <circle cx="470" cy="110" r="7" />
          <circle cx="648" cy="109" r="6" />
          <circle cx="742" cy="111" r="7" />
          <circle cx="852" cy="110" r="6" />
          <circle cx="990" cy="110" r="7" />
          <circle cx="1152" cy="109" r="6" />
          <circle cx="1315" cy="111" r="7" />
          <circle cx="1452" cy="110" r="6" />

          {/* Solid baseline */}
          <rect x="0" y="112" width="1600" height="8" />
        </g>
      </svg>
    </div>
  );
};
