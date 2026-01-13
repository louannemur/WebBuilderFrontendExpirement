import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

export function Vision() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      ref={containerRef}
      id="vision"
      className="relative py-32 md:py-48 content-section overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-aurora-purple/20 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-aurora-cyan/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[1px] bg-gradient-to-r from-aurora-purple to-transparent" />
          <span className="text-sm font-medium tracking-widest text-aurora-purple uppercase">
            Our Vision
          </span>
        </div>

        {/* Main content */}
        <div ref={textRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Main text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
            >
              A{' '}
              <span className="italic gradient-text">Renaissance</span>
              <br />
              for the modern
              <br />
              digital age
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-lg text-white/60 leading-relaxed max-w-lg"
            >
              Where Renaissance masters wielded paintbrushes and chisels,
              today's creators command algorithms and AI. This is not an evolution—
              it's a <span className="text-white font-medium">revolution</span>.
            </motion.p>
          </div>

          {/* Right column - Quote */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="glass rounded-2xl p-8 md:p-10">
              <svg
                className="w-12 h-12 text-aurora-purple/50 mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="text-xl md:text-2xl font-display italic text-white/90 leading-relaxed">
                "The future of commerce isn't about replacing human creativity—
                it's about amplifying it beyond imagination."
              </blockquote>

              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aurora-purple to-aurora-cyan" />
                <div>
                  <div className="font-semibold text-white">Aurora Vision Team</div>
                  <div className="text-sm text-white/50">Winter '26 Edition</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-aurora-purple/20 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-aurora-cyan/20 rounded-full" />
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ),
              title: 'Real-Time Intelligence',
              description: 'AI that understands your business in milliseconds, not minutes.',
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                </svg>
              ),
              title: 'Infinite Scalability',
              description: 'From 100 to 2,048 variants. Boundaries are a thing of the past.',
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              ),
              title: 'Dimensional Design',
              description: 'Storefronts that breathe, move, and respond to every interaction.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group glass rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:border-aurora-purple/30 hover:shadow-[0_0_60px_rgba(139,92,246,0.15)]"
            >
              <div className="w-14 h-14 rounded-xl bg-aurora-purple/10 border border-aurora-purple/20 flex items-center justify-center text-aurora-purple mb-6 group-hover:scale-110 transition-transform">
                <div className="w-7 h-7">{feature.icon}</div>
              </div>

              <h3 className="text-xl font-display mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
