import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { 
  Code, Terminal, Database, Server, Cpu, Mail, 
  MapPin, Briefcase, GraduationCap, ChevronDown, 
  Download, Phone, Linkedin, CheckCircle, ArrowRight, ExternalLink, Github,
  Layers, Zap, MousePointer2
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

// --- Global Styles & Fonts ---
const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: hsl(var(--muted)); 
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground)); 
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--primary)); 
  }
`;

// --- Palette High-End (Theme Aware) ---
const PALETTE = {
  bg: 'hsl(var(--background))',
  surface: 'hsl(var(--card))',
  text: 'hsl(var(--foreground))',
  textMuted: 'hsl(var(--muted-foreground))', // Slate 500
  textLight: 'hsl(var(--primary-foreground))',
  primary: 'hsl(var(--primary))', // Blue 600
  accent: 'hsl(var(--primary))',  // Blue 600
  accentGlow: 'rgba(37, 99, 235, 0.2)',
  line: 'hsl(var(--border))',     // Slate 200
  sectionBg: 'hsl(var(--secondary))', // Slate 50
  dark: 'hsl(var(--foreground))'
};

// --- Animations Complex ---
const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  20% { transform: translate(-15%, 5%); }
  30% { transform: translate(7%, -25%); }
  40% { transform: translate(-5%, 25%); }
  50% { transform: translate(-15%, 10%); }
  60% { transform: translate(15%, 0%); }
  70% { transform: translate(0%, 15%); }
  80% { transform: translate(3%, 35%); }
  90% { transform: translate(-10%, 10%); }
`;

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: ${PALETTE.bg};
  color: ${PALETTE.text};
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const NoiseOverlay = styled.div`
  display: none; /* Removed noise for clean look */
`;

const Orb = styled(motion.div)`
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15; /* Reduced opacity for light mode */
  z-index: 0;
`;

// --- HERO SECTION ---
const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center; // Center vertically
  justify-content: center;
  position: relative;
  z-index: 1;
  perspective: 1000px;
  background-color: ${PALETTE.bg};
`;

const HeroContent = styled.div`
  max-width: 1400px;
  width: 100%;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 4rem;
  }
`;

const BigTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 6vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 2rem;
  color: ${PALETTE.text};
  
  span {
    display: inline-block;
  }
  
  .highlight {
    color: ${PALETTE.accent};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 12px;
      background: ${PALETTE.accent};
      opacity: 0.1;
      z-index: -1;
      transform: skewX(-12deg);
    }
  }
`;

const GlassCard = styled(motion.div)`
  background: ${PALETTE.surface};
  border: 1px solid ${PALETTE.line};
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08); /* Soft shadow */
  position: relative;
  overflow: hidden;
`;

const TechBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #eff6ff; /* Light blue bg */
  color: ${PALETTE.accent};
  border: 1px solid #dbeafe;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

// --- SLIDER SYSTEM (Vertical Scroll Snap) ---
const SlideContainer = styled.div`
  position: relative;
`;

// --- SKILLS ---
const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  background: ${PALETTE.bg};
  border-top: 1px solid ${PALETTE.line};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 4vw, 4rem);
  text-align: center;
  margin-bottom: 4rem;
  color: ${PALETTE.text};

  span {
    color: ${PALETTE.accent};
  }
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 300px);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const BentoCard = styled(motion.div)`
  background: ${PALETTE.surface};
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid ${PALETTE.line};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  
  &:hover {
    border-color: ${PALETTE.accent};
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  &.large {
    grid-column: span 2;
  }
  &.tall {
    grid-row: span 2;
  }
`;

// --- EXPERIENCE (Sticky Scroll) ---
const ExperienceSection = styled.section`
  position: relative;
  padding: 6rem 2rem;
  background: ${PALETTE.sectionBg};
  color: ${PALETTE.textMuted};
  line-height: 1.7;
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ScrollSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding-bottom: 10rem;
`;

const JobCard = styled(motion.div)`
  position: relative;
  padding-left: 3rem;
  border-left: 2px solid ${PALETTE.line};

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${PALETTE.accent};
    box-shadow: 0 0 0 4px ${PALETTE.bg};
  }
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 100px;
  height: max-content;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
  }
`;

// --- CTA SECTION ---
const CTASection = styled.section`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${PALETTE.dark};
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 2rem;
  color: white;
`;

// --- UTILS ---
const GlowingButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2.5rem;
  background: ${PALETTE.accent};
  color: white;
  border-radius: 100px;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  position: relative;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    background: #1d4ed8; // Darker blue
 
  &:hover::after { opacity: 1; }
`;

export default function DeveloperPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    });
  };

  return (
    <PageWrapper onMouseMove={handleMouseMove}>
      <GlobalStyle />
      <HeaderClean />
      <NoiseOverlay />

      {/* Background Orbs */}
      <Orb 
        style={{ 
          top: '10%', left: '10%', width: '40vw', height: '40vw', 
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
          x: mousePosition.x * -2, y: mousePosition.y * -2 
        }} 
      />
      <Orb 
        style={{ 
          bottom: '20%', right: '5%', width: '30vw', height: '30vw', 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          x: mousePosition.x * 2, y: mousePosition.y * 2 
        }} 
      />

      {/* --- HERO --- */}
      <HeroContainer>
        <HeroContent>
          <div>
             <TechBadge 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             >
               <Terminal size={16} />
               <span>Disponible pour Septembre 2025</span>
             </TechBadge>
             
             <BigTitle
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
             >
               <span>Théo Garcès</span><br/>
               <span className="highlight">Full Stack</span><br/>
               <span>Developer.</span>
             </BigTitle>

             <motion.p
               style={{ fontSize: '1.25rem', color: PALETTE.textMuted, maxWidth: '600px', lineHeight: 1.6, marginBottom: '2.5rem' }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
             >
               Je construis des expériences digitales fluides et performantes.
               Spécialisé en <strong>React UI</strong> et architectures <strong>Node.js</strong>.
             </motion.p>
             
             <div style={{ display: 'flex', gap: '1.5rem' }}>
                <GlowingButton href="#contact" whileTap={{ scale: 0.95 }}>
                   Me Contacter <ArrowRight size={20} />
                </GlowingButton>
                
                <motion.a 
                  href="/cv-theo-garces.pdf" 
                  download
                  style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: PALETTE.text, textDecoration: 'none', fontWeight: 600, padding: '1rem 0' }}
                  whileHover={{ x: 5, color: PALETTE.accent }}
                >
                  <Download size={20} />
                  Télécharger CV
                </motion.a>
             </div>
          </div>

          <GlassCard
            initial={{ opacity: 0, rotateX: 10, z: -100 }}
            animate={{ opacity: 1, rotateX: 0, z: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ x: mousePosition.x, y: mousePosition.y }}
          >
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: PALETTE.accent, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>TG</div>
                <Github size={32} style={{ opacity: 0.2 }} />
             </div>
             <div style={{ spaceY: '1rem' }}>
                <div style={{ height: '8px', width: '40%', background: '#f1f5f9', borderRadius: '4px', marginBottom: '1rem' }} />
                <div style={{ height: '8px', width: '80%', background: '#f1f5f9', borderRadius: '4px', marginBottom: '1rem' }} />
                <div style={{ height: '8px', width: '60%', background: '#f1f5f9', borderRadius: '4px' }} />
             </div>
             
             <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['React', 'Next.js', 'Typescript', 'Node', 'AI', 'UI/UX'].map(tag => (
                   <span key={tag} style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem', borderRadius: '8px', background: '#f1f5f9', color: PALETTE.textMuted }}>{tag}</span>
                ))}
             </div>
          </GlassCard>
        </HeroContent>
        
        <motion.div 
           style={{ position: 'absolute', bottom: '2rem', left: '50%', x: '-50%', color: PALETTE.textMuted }}
           animate={{ y: [0, 10, 0] }}
           transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown />
        </motion.div>
      </HeroContainer>

      {/* --- SKILLS BENTO GRID --- */}
      <SkillsSection id="skills">
        <SectionTitle 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
           Mon Arsenal <span>Technique</span>
        </SectionTitle>
        
        <BentoGrid>
           <BentoCard className="large" whileHover={{ scale: 1.02 }}>
              <div style={{ marginBottom: '1.5rem', width: '50px', height: '50px', background: '#dbeafe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: PALETTE.accent }}>
                <Code size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: PALETTE.text }}>Frontend Mastery</h3>
              <p style={{ color: PALETTE.textMuted }}>Expertise avancée sur l'écosystème React. Création d'interfaces complexes, animations fluides et state management robuste.</p>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1.5rem' }}>
                 {['React', 'Tailwind', 'Framer Motion', 'Three.js'].map(t => (
                    <span key={t} style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '4px', background: '#f8fafc', border: '1px solid #e2e8f0', color: PALETTE.text }}>{t}</span>
                 ))}
              </div>
           </BentoCard>

           <BentoCard whileHover={{ scale: 1.02 }}>
              <Database size={32} color={PALETTE.accent} style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: PALETTE.text }}>Backend</h4>
              <p style={{ color: PALETTE.textMuted, fontSize: '0.9rem', marginTop: '0.5rem' }}>API REST & GraphQL performantes.</p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1rem', color: PALETTE.textMuted, fontSize: '0.9rem' }}>
                 <li>Node.js / Express</li>
                 <li>Python / FastAPI</li>
                 <li>PostgreSQL</li>
              </ul>
           </BentoCard>
           
           <BentoCard whileHover={{ scale: 1.02 }}>
              <Zap size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: PALETTE.text }}>Performance</h4>
              <p style={{ color: PALETTE.textMuted, fontSize: '0.9rem' }}>Focus sur les Core Web Vitals et l'optimisation du rendu.</p>
           </BentoCard>

           <BentoCard className="tall" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: PALETTE.accent, color: 'white', border: 'none' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                 <Cpu size={64} style={{ opacity: 0.8 }} />
              </motion.div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '1.5rem 0' }}>AI Ready</h3>
              <p style={{ opacity: 0.9 }}>Intégration de modèles LLM et agents autonomes dans vos applications business.</p>
           </BentoCard>

           <BentoCard className="large" whileHover={{ scale: 1.02 }}>
              <Layers size={32} color={PALETTE.accent} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: PALETTE.text }}>Architecture & DevOps</h3>
              <p style={{ color: PALETTE.textMuted }}>Déploiement sain et maintenable sur le long terme.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                 <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontWeight: 700, fontSize: '1.2rem', color: PALETTE.text }}>CI/CD</span>
                    <span style={{ fontSize: '0.8rem', color: PALETTE.textMuted }}>GitHub Actions</span>
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontWeight: 700, fontSize: '1.2rem', color: PALETTE.text }}>Docker</span>
                    <span style={{ fontSize: '0.8rem', color: PALETTE.textMuted }}>Containerization</span>
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontWeight: 700, fontSize: '1.2rem', color: PALETTE.text }}>Cloud</span>
                    <span style={{ fontSize: '0.8rem', color: PALETTE.textMuted }}>Vercel / AWS</span>
                 </div>
              </div>
           </BentoCard>
        </BentoGrid>
      </SkillsSection>

      {/* --- EXPERIENCE STICKY --- */}
      <ExperienceSection>
        <StickyWrapper>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ margin: "-100px" }}>
               <h2 style={{ color: PALETTE.text }}>Parcours<br/><span style={{ color: PALETTE.accent }}>Professionnel</span></h2>
               <p>
                 Une progression constante alliant fondamentaux académiques 
                 et défis techniques concrets en entreprise.
               </p>
               <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: '#dbeafe', borderRadius: '12px', textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: PALETTE.accent }}>3+</span>
                     <span style={{ fontSize: '0.8rem', color: PALETTE.textMuted }}>Années d'exp.</span>
                  </div>
                  <div style={{ padding: '1rem', background: '#dbeafe', borderRadius: '12px', textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: PALETTE.accent }}>15+</span>
                     <span style={{ fontSize: '0.8rem', color: PALETTE.textMuted }}>Projets</span>
                  </div>
               </div>
            </motion.div>
        </StickyWrapper>

          <ScrollSide>
            {[
              { year: '2025', title: 'Développeur IA Junior', company: 'Steerway', desc: 'Conception d\'un système de découpage de code source pour analyse par LLM. Architecture Python et OpenAI.' },
              { year: '2023', title: 'Bachelor CDA', company: 'Coda', desc: 'Formation approfondie en développement Full Stack. Gestion de projet Agile et Architecture Logicielle.' },
              { year: '2022', title: 'Concepteur Web & Mobile', company: 'Esecad', desc: 'Spécialisation dans les frameworks JavaScript modernes (React, Angular) et bases de données.' },
              { year: '2020', title: 'Web Designer & Intégrateur', company: 'Experiencis', desc: 'Création de maquettes UX/UI sur Figma et intégration web responsive.' }
            ].map((job, i) => (
               <JobCard 
                 key={i}
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
               >
                 <span style={{ color: PALETTE.accent, fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em' }}>{job.year}</span>
                 <h3 style={{ color: PALETTE.text, fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.2rem' }}>{job.title}</h3>
                 <h4 style={{ color: PALETTE.textMuted, fontSize: '1.1rem', marginBottom: '1rem' }}>{job.company}</h4>
                 <p style={{ color: PALETTE.textMuted, lineHeight: 1.6 }}>{job.desc}</p>
               </JobCard>
            ))}
          </ScrollSide>
      </ExperienceSection>

      {/* --- CTA / FOOTER --- */}
      <CTASection id="contact">
         <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
         >
           <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '2rem' }}>
             Prêt à lancer<br/>votre prochain projet ?
           </h2>
           <p style={{ color: '#dbeafe', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
             Je suis actuellement à la recherche d'une alternance ou de missions freelance.
             Discutons tech autour d'un café virtuel.
           </p>
           
           <GlowingButton href="mailto:theo.garces@coda-student.school" style={{ background: 'white', color: PALETTE.accent }}>
              Me Contacter Maintenant
           </GlowingButton>

           <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <a href="https://linkedin.com" target="_blank" style={{ color: 'white', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}>
                 <Linkedin />
              </a>
              <a href="https://github.com" target="_blank" style={{ color: 'white', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}>
                 <Github />
              </a>
              <a href="mailto:theo.garces@coda-student.school" style={{ color: 'white', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}>
                 <Mail />
              </a>
           </div>
         </motion.div>
      </CTASection>
      <FooterClean />
    </PageWrapper>
  );
}
