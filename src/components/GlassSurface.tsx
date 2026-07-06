import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

type GlassSurfaceProps = {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B" | "A";
  yChannel?: "R" | "G" | "B" | "A";
  mixBlendMode?: CSSProperties["mixBlendMode"];
  className?: string;
  style?: CSSProperties;
};

type GlassStyle = CSSProperties & {
  "--filter-id": string;
  "--glass-frost": number;
  "--glass-saturation": number;
};

export default function GlassSurface({
  backgroundOpacity = 0,
  blueOffset = 20,
  blur = 11,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  children,
  className = "",
  displace = 0,
  distortionScale = -180,
  greenOffset = 10,
  height = 80,
  mixBlendMode = "difference",
  opacity = 0.93,
  redOffset = 0,
  saturation = 1,
  style = {},
  width = 200,
  xChannel = "R",
  yChannel = "G",
}: GlassSurfaceProps) {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 80;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);
    const innerWidth = Math.max(actualWidth - edgeSize * 2, 0);
    const innerHeight = Math.max(actualHeight - edgeSize * 2, 0);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${innerWidth}" height="${innerHeight}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute("href", generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();

    [
      { offset: redOffset, ref: redChannelRef },
      { offset: greenOffset, ref: greenChannelRef },
      { offset: blueOffset, ref: blueChannelRef },
    ].forEach(({ offset, ref }) => {
      if (!ref.current) return;
      ref.current.setAttribute("scale", (distortionScale + offset).toString());
      ref.current.setAttribute("xChannelSelector", xChannel);
      ref.current.setAttribute("yChannelSelector", yChannel);
    });

    gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString());
  }, [
    backgroundOpacity,
    blueOffset,
    blur,
    borderRadius,
    borderWidth,
    brightness,
    displace,
    distortionScale,
    greenOffset,
    height,
    mixBlendMode,
    opacity,
    redOffset,
    saturation,
    width,
    xChannel,
    yChannel,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      window.setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const supportsSVGFilters = () => {
      if (typeof window === "undefined" || typeof document === "undefined") return false;

      const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);
      if (isWebkit || isFirefox) return false;

      const div = document.createElement("div");
      div.style.backdropFilter = `url(#${filterId})`;
      return div.style.backdropFilter !== "";
    };

    setSvgSupported(supportsSVGFilters());
  }, [filterId]);

  const containerStyle: GlassStyle = {
    ...style,
    "--filter-id": `url(#${filterId})`,
    "--glass-frost": backgroundOpacity,
    "--glass-saturation": saturation,
    borderRadius,
    height: typeof height === "number" ? `${height}px` : height,
    width: typeof width === "number" ? `${width}px` : width,
  };

  return (
    <div
      className={`glass-surface ${svgSupported ? "glass-surface--svg" : "glass-surface--fallback"} ${className}`}
      ref={containerRef}
      style={containerStyle}
    >
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter colorInterpolationFilters="sRGB" height="100%" id={filterId} width="100%" x="0%" y="0%">
            <feImage height="100%" preserveAspectRatio="none" ref={feImageRef} result="map" width="100%" x="0" y="0" />

            <feDisplacementMap in="SourceGraphic" in2="map" ref={redChannelRef} result="dispRed" />
            <feColorMatrix
              in="dispRed"
              result="red"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />

            <feDisplacementMap in="SourceGraphic" in2="map" ref={greenChannelRef} result="dispGreen" />
            <feColorMatrix
              in="dispGreen"
              result="green"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />

            <feDisplacementMap in="SourceGraphic" in2="map" ref={blueChannelRef} result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              result="blue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" ref={gaussianBlurRef} stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
