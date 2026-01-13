import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { Scene3D } from './scenes/Scene3D'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Showcase } from './components/Showcase'
import { Vision } from './components/Vision'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import { Loader } from './components/Loader'
import { CustomCursor } from './components/CustomCursor'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Connect GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Simulate loading
    let prog = 0
    const interval = setInterval(() => {
      prog += Math.random() * 15
      if (prog >= 100) {
        prog = 100
        setProgress(100)
        setTimeout(() => setIsLoading(false), 500)
        clearInterval(interval)
      } else {
        setProgress(prog)
      }
    }, 100)

    return () => {
      lenis.destroy()
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader progress={progress} />}
      </AnimatePresence>

      <CustomCursor />

      <div className="noise-overlay" />

      {/* 3D Canvas - Fixed background */}
      <div className="canvas-container interactive">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene3D />
        </Canvas>
      </div>

      {/* Content */}
      <div ref={containerRef} className="relative">
        <Navigation />

        <main>
          <Hero />
          <Vision />
          <Features />
          <Showcase />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
