import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const features = [
  {
    id: 'sidekick',
    tag: 'AI-Powered',
    title: 'Sidekick Intelligence',
    description:
      'Design through conversation. Say "make buttons rounder" and watch magic happen. Your AI companion understands context, intent, and style.',
    color: 'purple',
    demo: {
      type: 'chat',
      messages: [
        { role: 'user', text: 'Add a trust badge under add-to-cart' },
        { role: 'ai', text: 'Done! I\'ve added a verified badge with your store rating.' },
      ],
    },
  },
  {
    id: 'themes',
    tag: 'Mobile-First',
    title: 'Theme Generation',
    description:
      'Generate, preview, and publish themes from anywhere—even your phone. AI-powered design at your fingertips.',
    color: 'cyan',
    demo: {
      type: 'preview',
      screens: ['mobile', 'tablet', 'desktop'],
    },
  },
  {
    id: 'testing',
    tag: 'Data-Driven',
    title: 'Native A/B Testing',
    description:
      'Test variations of your storefront. AI analyzes billions of data points and automatically rolls out winners.',
    color: 'pink',
    demo: {
      type: 'split',
      variants: ['A', 'B'],
    },
  },
  {
    id: 'simgym',
    tag: 'Predictive',
    title: 'SimGym Testing',
    description:
      'AI agents simulate billions of shopping behaviors before you go live. Know what works before it launches.',
    color: 'orange',
    demo: {
      type: 'simulation',
    },
  },
]

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative py-32 md:py-48 content-section overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-aurora-purple/10 rounded-full blur-[200px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-gradient-to-r from-aurora-cyan to-transparent" />
          <span className="text-sm font-medium tracking-widest text-aurora-cyan uppercase">
            Features
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display mb-16"
        >
          150+ ways to transform
          <br />
          <span className="gradient-text">your commerce</span>
        </motion.h2>

        {/* Feature showcase */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Feature list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveFeature(index)}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                  activeFeature === index
                    ? 'glass border-aurora-purple/30'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Active indicator */}
                <motion.div
                  initial={false}
                  animate={{
                    scaleY: activeFeature === index ? 1 : 0,
                    opacity: activeFeature === index ? 1 : 0,
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-aurora-purple to-aurora-cyan rounded-full"
                />

                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-mono transition-colors ${
                      activeFeature === index
                        ? 'bg-aurora-purple/20 text-aurora-purple'
                        : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1">
                    <span
                      className={`text-xs font-medium tracking-wider uppercase ${
                        feature.color === 'purple'
                          ? 'text-aurora-purple'
                          : feature.color === 'cyan'
                          ? 'text-aurora-cyan'
                          : feature.color === 'pink'
                          ? 'text-aurora-pink'
                          : 'text-aurora-orange'
                      }`}
                    >
                      {feature.tag}
                    </span>
                    <h3 className="text-xl font-display mt-1 mb-2">{feature.title}</h3>
                    <p
                      className={`text-sm leading-relaxed transition-colors ${
                        activeFeature === index ? 'text-white/70' : 'text-white/40'
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature demo */}
          <div className="relative">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[4/3] rounded-2xl glass overflow-hidden"
                >
                  <FeatureDemo feature={features[activeFeature]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Highlight feature - Variant limit */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-32 relative"
        >
          <div className="glass rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-medium tracking-widest text-aurora-pink uppercase">
                  Breaking Limits
                </span>
                <h3 className="text-3xl md:text-4xl font-display mt-4 mb-6">
                  From 100 to{' '}
                  <span className="gradient-text">2,048</span>
                  <br />
                  variants per product
                </h3>
                <p className="text-white/60 leading-relaxed">
                  17 years of constraints, eliminated in a single update. Complex
                  product catalogs are no longer a limitation—they're an opportunity.
                </p>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex items-center justify-center gap-6"
                  >
                    <span className="text-4xl md:text-5xl font-display text-white/30 line-through">
                      100
                    </span>
                    <motion.svg
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="w-8 h-8 text-aurora-cyan"
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
                    </motion.svg>
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className="text-6xl md:text-7xl font-display gradient-text"
                    >
                      2,048
                    </motion.span>
                  </motion.div>
                  <p className="text-sm text-white/40 mt-4 uppercase tracking-wider">
                    Variants per product
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-aurora-pink/20 rounded-full blur-[100px]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Feature demo component
function FeatureDemo({ feature }: { feature: (typeof features)[0] }) {
  if (feature.demo.type === 'chat') {
    return (
      <div className="h-full p-6 flex flex-col justify-center">
        <div className="space-y-4">
          {feature.demo.messages?.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-aurora-purple/20 border border-aurora-purple/30 rounded-br-md'
                    : 'bg-white/5 border border-white/10 rounded-bl-md'
                }`}
              >
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-aurora-purple to-aurora-cyan" />
                    <span className="text-xs text-white/50">Sidekick</span>
                  </div>
                )}
                <p className="text-sm text-white/80">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input field */}
        <div className="mt-6 flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
          <span className="text-aurora-purple font-mono">{'>'}</span>
          <span className="text-white/40 text-sm">Ask Sidekick anything...</span>
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-0.5 h-4 bg-aurora-purple"
          />
        </div>
      </div>
    )
  }

  if (feature.demo.type === 'preview') {
    return (
      <div className="h-full p-6 flex items-center justify-center gap-4">
        {['mobile', 'tablet', 'desktop'].map((device, i) => (
          <motion.div
            key={device}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`bg-dark-800 rounded-lg border border-white/10 ${
              device === 'mobile'
                ? 'w-16 h-28'
                : device === 'tablet'
                ? 'w-24 h-32'
                : 'w-40 h-28'
            }`}
          >
            <div className="h-2 bg-white/5 rounded-t-lg" />
            <div className="p-2 space-y-1">
              <div className="h-1.5 bg-white/10 rounded w-1/2" />
              <div className="h-1 bg-white/5 rounded w-3/4" />
              <div className="h-1 bg-white/5 rounded w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (feature.demo.type === 'split') {
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {['A', 'B'].map((variant, i) => (
            <motion.div
              key={variant}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-dark-800 rounded-xl border border-white/10 p-4"
            >
              <div className="text-xs text-aurora-cyan mb-2">Variant {variant}</div>
              <div className="h-20 bg-white/5 rounded-lg mb-3" />
              <div className={`h-8 rounded-lg ${i === 0 ? 'bg-white/20' : 'bg-aurora-purple/50'}`} />
              <div className="mt-3 text-center">
                <span className={`text-2xl font-display ${i === 1 ? 'text-aurora-cyan' : 'text-white/50'}`}>
                  {i === 0 ? '2.4%' : '3.8%'}
                </span>
                <p className="text-xs text-white/40">Conversion</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Simulation demo
  return (
    <div className="h-full p-6 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-xs aspect-square">
        {/* Central node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-aurora-purple to-aurora-cyan flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-dark-900" />
        </div>

        {/* Orbiting particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-aurora-cyan"
            animate={{
              x: Math.cos((i / 8) * Math.PI * 2 + Date.now() / 1000) * 80 - 4,
              y: Math.sin((i / 8) * Math.PI * 2 + Date.now() / 1000) * 80 - 4,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <circle cx="50%" cy="50%" r="80" fill="none" stroke="url(#grad)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="60" fill="none" stroke="url(#grad)" strokeWidth="1" strokeDasharray="4 4" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <p className="text-sm text-white/50 mt-6">Simulating 1.2M user journeys...</p>
    </div>
  )
}
