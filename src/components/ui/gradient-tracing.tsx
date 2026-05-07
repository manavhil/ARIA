"use client"

import React from "react"
import { motion } from "framer-motion"

interface GradientTracingProps {
  width: number
  height: number
  baseColor?: string
  gradientColors?: [string, string, string]
  animationDuration?: number
  strokeWidth?: number
  path?: string
}

export const GradientTracing: React.FC<GradientTracingProps> = ({
  width,
  height,
  baseColor = "rgba(255,255,255,0.06)",
  gradientColors = ["#ea580c", "#f97316", "#fbbf24"],
  animationDuration = 3,
  strokeWidth = 1.5,
  path = `M0,${height / 2} L${width},${height / 2}`,
}) => {
  const gradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <path d={path} stroke={baseColor} strokeOpacity="0.4" strokeWidth={strokeWidth} />
        <path d={path} stroke={`url(#${gradientId})`} strokeLinecap="round" strokeWidth={strokeWidth} />
        <defs>
          <motion.linearGradient
            animate={{ x1: [0, width * 2], x2: [0, width] }}
            transition={{ duration: animationDuration, repeat: Infinity, ease: "linear" }}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}
