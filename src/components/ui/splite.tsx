import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="spline-fallback-loader">
          <div className="spline-spinner"></div>
          <span className="spline-loading-text">INITIALIZING 3D ENGINE...</span>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
