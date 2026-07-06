// 定制 SVG 图标 — 替代 Lucide 矢量图标
// 风格：线性 + 微填充，匹配视频粉色系统

import { type ComponentType } from "react";

interface CustomIconProps {
  size?: number;
  className?: string;
}

// --- 1. AI 视频生成 ---
export const VideoIcon: ComponentType<CustomIconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth={1.5} />
    <path d="M18 8l4-2v10l-4-2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="11" r="2" fill="currentColor" opacity={0.15} />
  </svg>
);

// --- 2. AI 海报视觉 ---
export const PosterIcon: ComponentType<CustomIconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth={1.5} />
    <line x1="7" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <line x1="7" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <rect x="7" y="13" width="10" height="7" rx="1" fill="currentColor" opacity={0.1} stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

// --- 3. AI PPT / 路演 ---
export const PresentationIcon: ComponentType<CustomIconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth={1.5} />
    <line x1="8" y1="19" x2="16" y2="19" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <line x1="12" y1="16" x2="12" y2="19" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <circle cx="7" cy="9" r="1" fill="currentColor" opacity={0.3} />
    <line x1="10" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

// --- 4. 保险业 ---
export const InsuranceIcon: ComponentType<CustomIconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 3l8 4.5v9L12 21 4 16.5v-9L12 3z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M4.5 7.5L12 12l7.5-4.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M12 12v9" stroke="currentColor" strokeWidth={1.5} />
    <circle cx="12" cy="9" r="1.2" fill="currentColor" opacity={0.25} />
  </svg>
);

// --- 5. 房地产 ---
export const RealEstateIcon: ComponentType<CustomIconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <rect x="9" y="14" width="6" height="7" rx="0.5" stroke="currentColor" strokeWidth={1.5} />
    <line x1="12" y1="14" x2="12" y2="21" stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

// --- 6. 教育 ---
export const EducationIcon: ComponentType<CustomIconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <line x1="9" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <line x1="9" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

// --- 7. 商业广告 ---
export const CommercialAdsIcon: ComponentType<CustomIconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.5} />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);
