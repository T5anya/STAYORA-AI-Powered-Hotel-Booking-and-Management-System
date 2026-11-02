import React, { useState } from 'react';

interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface AnimatedChartProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  type?: 'area' | 'bar';
  prefix?: string;
  suffix?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const AnimatedChart: React.FC<AnimatedChartProps> = ({
  title,
  subtitle,
  data,
  type = 'area',
  prefix = '₹',
  suffix = '',
  primaryColor = '#C5A880',
  secondaryColor = '#0C3B2E'
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const chartHeight = 160;
  const chartWidth = 500;
  const padding = 20;

  // Build SVG path for area chart
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - (d.value / maxValue) * (chartHeight - padding * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-[#FBF9F4]">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {hoveredIndex !== null && (
          <div className="text-right">
            <span className="text-[11px] text-gray-400 block">{data[hoveredIndex].label}</span>
            <span className="font-serif text-sm font-bold text-[#C5A880]">
              {prefix}{data[hoveredIndex].value.toLocaleString('en-IN')}{suffix}
            </span>
          </div>
        )}
      </div>

      {type === 'area' ? (
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={primaryColor} stopOpacity="0.45" />
                <stop offset="100%" stopColor={primaryColor} stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Gridlines */}
            {[0.25, 0.5, 0.75, 1].map((pct, idx) => (
              <line
                key={idx}
                x1={padding}
                y1={chartHeight - padding - pct * (chartHeight - padding * 2)}
                x2={chartWidth - padding}
                y2={chartHeight - padding - pct * (chartHeight - padding * 2)}
                stroke="currentColor"
                className="text-gray-100 dark:text-[#22352B]"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area fill */}
            <path d={areaD} fill="url(#chartGradient)" className="transition-all duration-700" />

            {/* Line stroke */}
            <path
              d={pathD}
              fill="none"
              stroke={primaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Points */}
            {points.map((p, idx) => (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer group"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === idx ? 6 : 4}
                  fill={hoveredIndex === idx ? primaryColor : '#FFFFFF'}
                  stroke={primaryColor}
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
              </g>
            ))}
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between px-3 text-[11px] text-gray-400 font-medium mt-2">
            {data.map((d, i) => (
              <span key={i} className={hoveredIndex === i ? 'text-[#C5A880] font-bold' : ''}>
                {d.label}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Animated Bar Chart */
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-7 gap-2 items-end h-40 pt-4">
            {data.map((d, idx) => {
              const heightPct = Math.round((d.value / maxValue) * 100);
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  <div
                    className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ${
                      isHovered ? 'bg-[#D4AF37] scale-105 shadow-md' : 'bg-[#0C3B2E] dark:bg-[#C5A880]/70'
                    }`}
                    style={{ height: `${Math.max(8, heightPct)}%` }}
                  />
                  <span className={`text-[10px] mt-2 font-medium truncate w-full text-center ${isHovered ? 'text-[#C5A880] font-bold' : 'text-gray-400'}`}>
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
