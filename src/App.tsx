import { MotionConfig } from 'framer-motion'
import About from './components/About'
import CaseStudy from './components/CaseStudy'
import { Contact, Education, Footer } from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Showcase from './components/Showcase'
import { Skills, WhyMe } from './components/Skills'
import { ThemeProvider } from './lib/theme'

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="atmosphere" aria-hidden="true" />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-2 focus:px-4 focus:py-2 focus:text-[#061224]">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <CaseStudy />
          <Projects />
          <Showcase />
          <Skills />
          <WhyMe />
          <Education />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  )
}
