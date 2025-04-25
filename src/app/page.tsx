import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Creative } from '@/components/sections/Creative'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Creative />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}