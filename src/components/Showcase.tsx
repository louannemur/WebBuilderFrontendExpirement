import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const showcaseItems = [
  {
    id: 1,
    title: 'Conversational Design',
    subtitle: 'Transform your store with natural language commands',
    image: '/showcase-1.jpg',
    color: 'purple',
  },
  {
    id: 2,
    title: 'Predictive Analytics',
    subtitle: 'AI-powered insights before you need them',
    image: '/showcase-2.jpg',
    color: 'cyan',
  },
  {
    id: 3,
    title: 'Visual Builder',
    subtitle: 'Drag, drop, and design without limits',
    image: '/showcase-3.jpg',
    color: 'pink',
  },
]

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseItems.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length)
  }

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative py-32 md:py-48 content-section overflow-hidden"
    >
      {/* Background gradient */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-aurora-purple/10 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-gradient-to-r from-aurora-pink to-transparent" />
          <span className="text-sm font-medium tracking-widest text-aurora-pink uppercase">
            Showcase
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-display"
          >
            See it in
            <br />
            <span className="gradient-text">action</span>
          </motion.h2>

          {/* Navigation arrows */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Showcase carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-3xl overflow-hidden"
            >
              <div className="aspect-[16/9] relative">
                {/* Demo screen */}
                <ShowcaseDemo index={activeIndex} />

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark-900/90 to-transparent">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-display mb-2">
                      {showcaseItems[activeIndex].title}
                    </h3>
                    <p className="text-white/60">
                      {showcaseItems[activeIndex].subtitle}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {showcaseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-gradient-to-r from-aurora-purple to-aurora-cyan'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="future"
          className="mt-32 text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-6">
            This is just the
            <br />
            <span className="gradient-text">beginning</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed mb-12">
            Winter '26 marks the start of a new era. An era where AI doesn't replace
            creativity—it unleashes it. Where every merchant has access to
            enterprise-grade tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white text-dark-900 rounded-full font-semibold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Journey
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            {[
              { icon: '✓', text: 'Free to start' },
              { icon: '✓', text: 'No credit card required' },
              { icon: '✓', text: 'Full AI access' },
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-white/50">
                <span className="w-5 h-5 rounded-full bg-aurora-cyan/20 text-aurora-cyan text-xs flex items-center justify-center">
                  {badge.icon}
                </span>
                <span className="text-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Showcase demo component
function ShowcaseDemo({ index }: { index: number }) {
  if (index === 0) {
    // Conversational Design
    return (
      <div className="w-full h-full bg-dark-800 p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-dark-700 rounded-xl p-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="bg-aurora-purple/20 border border-aurora-purple/30 rounded-2xl rounded-br-md px-4 py-3">
                <p className="text-sm text-white/80">Change the hero section to dark mode</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-purple to-aurora-cyan flex-shrink-0" />
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-sm text-white/80">
                  Done! I've updated the hero with a dark theme, adjusted contrast ratios,
                  and updated button styles to match. Would you like me to apply this across
                  all pages?
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (index === 1) {
    // Predictive Analytics
    return (
      <div className="w-full h-full bg-dark-800 p-8">
        <div className="grid grid-cols-4 gap-4 h-full">
          {[
            { label: 'Conversions', value: '+24%', color: 'cyan' },
            { label: 'Revenue', value: '+18%', color: 'purple' },
            { label: 'Traffic', value: '+32%', color: 'pink' },
            { label: 'AOV', value: '+12%', color: 'orange' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-700 rounded-xl p-4 flex flex-col"
            >
              <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
              <span
                className={`text-2xl font-display mt-auto ${
                  stat.color === 'cyan'
                    ? 'text-aurora-cyan'
                    : stat.color === 'purple'
                    ? 'text-aurora-purple'
                    : stat.color === 'pink'
                    ? 'text-aurora-pink'
                    : 'text-aurora-orange'
                }`}
              >
                {stat.value}
              </span>
              <div className="mt-2 h-16 bg-white/5 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className={`w-full h-full origin-bottom ${
                    stat.color === 'cyan'
                      ? 'bg-gradient-to-t from-aurora-cyan/50 to-aurora-cyan/10'
                      : stat.color === 'purple'
                      ? 'bg-gradient-to-t from-aurora-purple/50 to-aurora-purple/10'
                      : stat.color === 'pink'
                      ? 'bg-gradient-to-t from-aurora-pink/50 to-aurora-pink/10'
                      : 'bg-gradient-to-t from-aurora-orange/50 to-aurora-orange/10'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Visual Builder
  return (
    <div className="w-full h-full bg-dark-800 p-4 flex gap-4">
      {/* Sidebar */}
      <div className="w-20 bg-dark-700 rounded-xl p-3 flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="aspect-square bg-white/5 rounded-lg border border-white/10 hover:border-aurora-purple/50 cursor-pointer transition-colors"
          />
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-dark-700 rounded-xl p-4 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className={`h-24 rounded-lg border-2 border-dashed transition-colors ${
              i === 1
                ? 'border-aurora-purple bg-aurora-purple/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          />
        ))}
      </div>

      {/* Properties panel */}
      <div className="w-48 bg-dark-700 rounded-xl p-4">
        <div className="text-xs text-white/40 uppercase tracking-wider mb-4">Properties</div>
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center justify-between py-2 border-b border-white/5"
          >
            <span className="text-xs text-white/40">Property {i + 1}</span>
            <div className="w-16 h-5 bg-white/5 rounded" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
