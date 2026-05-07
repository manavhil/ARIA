'use client'

import { Suspense, lazy, useEffect, useRef, useState, Component, type ReactNode } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

// ── Catches any error thrown inside the Spline tree ──
class SplineErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      // Show nothing — the robot simply disappears instead of crashing the page
      return null
    }
    return this.props.children
  }
}

const Spinner = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-neutral-600 border-t-white rounded-full animate-spin" />
  </div>
)

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Only mount the heavy Spline canvas once the container is actually on screen.
  // This prevents multiple WebGL contexts existing simultaneously during route transitions.
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // once visible, stay mounted — no need to keep observing
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      {isVisible && (
        <SplineErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Spline scene={scene} style={{ width: '100%', height: '100%' }} />
          </Suspense>
        </SplineErrorBoundary>
      )}
      {!isVisible && <Spinner />}
    </div>
  )
}
