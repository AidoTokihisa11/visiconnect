import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Github, Mail, Code2, Database, Layout, 
  Terminal, Server, Globe, Brain, Zap, 
  ArrowRight, Video, User, CheckCircle,
  Briefcase, GraduationCap, MapPin, Linkedin,
  Download, ExternalLink, Star
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

// --- Global Styles & Theme (Light Mode) ---
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff;
    color: #0f172a;
    overflow-x: hidden;
    cursor: default;
  }
`;

const THEME = {
  primary: '#2563eb', // Blue 600
  primaryDark: '#1e40af', // Blue 800
  secondary: '#475569', // Slate 600
  accent: '#10b981', // Emerald 500
  purple: '#7c3aed', // Violet 600
  text: '#0f172a', // Slate 900
  textMuted: '#64748b', // Slate 500
  border: '#e2e8f0', // Slate 200
  bg: '#ffffff',
  bgAlt: '#f8fafc', // Slate 50
  cardBg: 'rgba(255, 255, 255, 0.8)',
  glass: 'rgba(255, 255, 255, 0.7)',
  shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  shadowLg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${THEME.bg};
  color: ${THEME.text};
  font-family: 'Inter', sans-serif;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const Section = styled.section`
  padding: 8rem 0;
  position: relative;
  background: ${props => props.$alt ? THEME.bgAlt : 'transparent'};
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

// --- Background Grid ---
const GridBackground = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 0;
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, #f1f5f9 1px, transparent 1px),
    linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
  mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
  opacity: 0.6;
  pointer-events: none;
`;

// --- Typography & Components ---
const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: ${THEME.text};
  letter-spacing: -0.02em;
  line-height: 1.1;
  span { color: ${THEME.primary}; }
  @media (max-width: 768px) { 
    font-size: 2.25rem; 
    text-align: center; /* Center titles on mobile */
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${THEME.textMuted};
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 4rem;
  @media (max-width: 768px) { 
    font-size: 1rem; 
    margin-bottom: 3rem; 
    text-align: center; 
    margin-left: auto;
    margin-right: auto;
  }
`;

const Badge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: #eff6ff;
  color: ${THEME.primary};
  border: 1px solid #dbeafe;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: 768px) { flex-direction: column; width: 100%; }
`;

const PrimaryButton = styled(motion.a)`
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: ${THEME.primary};
  color: white;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
  &:hover { 
    background-color: ${THEME.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
  }
`;

const SecondaryButton = styled(motion.a)`
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: white;
  color: ${THEME.text};
  border: 1px solid ${THEME.border};
  &:hover {
    border-color: ${THEME.textMuted};
    background-color: #f8fafc;
    transform: translateY(-2px);
  }
`;

// --- Hero Section ---
const HeroWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 60px;
  
  @media (max-width: 768px) {
    min-height: auto;
    padding: 6rem 0 4rem;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  
  @media (max-width: 640px) {
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 700px;
  @media (max-width: 1024px) { 
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center; 
  }
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  color: ${THEME.text};
  word-wrap: break-word; /* Ensure clear wrapping */
  
  .highlight {
    color: ${THEME.primary};
    position: relative;
    white-space: normal; /* Allow wrapping if needed */
    display: inline-block; /* Helps with background skew */
    
    &::after {
      content: '';
      position: absolute;
      bottom: 8px;
      left: 0;
      width: 100%;
      height: 12px;
      background-color: rgba(37, 99, 235, 0.1);
      z-index: -1;
      transform: skewX(-10deg);
    }
  }

  /* Specific mobile adjustments */
  @media (max-width: 640px) {
    font-size: 2.5rem; /* Set a specific size for mobile */
    word-break: break-word; /* Prepare for very long words if any */
    
    .highlight {
      white-space: normal;
    }
  }
`;

const HeroCard = styled(motion.div)`
  background: white;
  border: 1px solid ${THEME.border};
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: ${THEME.shadowLg};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

// --- Terminal Component ---
const TerminalWrapper = styled(motion.div)`
  width: 100%;
  background: #1e293b; 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${THEME.shadowLg};
  font-family: 'Fira Code', 'Consolas', monospace;
  color: #f8fafc;
  font-size: 0.9rem;
`;

const TerminalHeader = styled.div`
  background: #0f172a;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .red { background: #ef4444; }
  .yellow { background: #f59e0b; }
  .green { background: #10b981; }
  .title { margin-left: auto; color: #64748b; font-size: 0.75rem; }
`;

const TerminalBody = styled.div`
  padding: 1.5rem;
  min-height: 250px;
  
  @media (max-width: 640px) {
    padding: 1rem;
    min-height: 200px;
  }
`;

// --- Experience Timeline ---
const TimelineSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding-left: 3rem;
  padding-bottom: 3rem;
  border-left: 2px solid ${THEME.border};
  
  &:last-child {
    border-left: 2px solid transparent;
  }
  
  @media (max-width: 640px) {
    padding-left: 1.5rem;
    padding-bottom: 2.5rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 10px;
    height: 10px;
    background: ${THEME.primary};
    border-radius: 50%;
    box-shadow: 0 0 0 4px white;
  }
`;

const JobYear = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${THEME.accent};
  background: #ecfdf5;
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${THEME.text};
  margin-bottom: 0.25rem;
`;

const JobCompany = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: ${THEME.textMuted};
  margin-bottom: 1rem;
`;

// --- Bento Grid ---
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 1.5rem;
  
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { 
    grid-template-columns: 1fr;
    gap: 1rem; 
  }
`;

const BentoCard = styled(motion.div)`
  background: white;
  border: 1px solid ${THEME.border};
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  
  &:hover {
    border-color: ${THEME.primary};
    transform: translateY(-4px);
    box-shadow: ${THEME.shadowLg};
  }
  
  &.col-span-2 { grid-column: span 2; }
  &.row-span-2 { grid-row: span 2; }
  
  @media (max-width: 640px) {
    padding: 1.25rem;
    &.col-span-2 { grid-column: span 1; }
    &.row-span-2 { grid-row: span 1; min-height: auto; }
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
`;

const TechTag = styled.span`
  background: ${THEME.bgAlt};
  color: ${THEME.textMuted};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid ${THEME.border};
`;

const BlinkCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: ${THEME.primary};
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

// --- Interactive Terminal ---
const InteractiveTerminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'VisioConnect System v2.4.0' },
        { type: 'output', content: 'Copyright (c) 2025 Theo Garces' },
        { type: 'output', content: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', content: input }];
            
            let response = '';
            switch(cmd) {
                case 'help':
                    response = 'Available commands: about, skills, contact, clear';
                    break;
                case 'about':
                    response = 'Full Stack Developer based in France via Coda School. Passionate about performant UIs and real-time systems.';
                    break;
                case 'skills':
                    response = 'Frontend: React, Tailwind, Framer Motion\nBackend: Node.js, Python, Supabase\nDevOps: Docker, Vercel, AWS';
                    break;
                case 'contact':
                    response = 'Email: theo.garces@coda-student.school\nGitHub: github.com/theogarces';
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                default:
                    response = `command not found: ${cmd}`;
            }
            newHistory.push({ type: 'output', content: response });
            setHistory(newHistory);
            setInput('');
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <TerminalWrapper>
            <TerminalHeader>
                <div className="dot red" />
                <div className="dot yellow" />
                <div className="dot green" />
                <div className="title">bash — visitor@visiconnect</div>
            </TerminalHeader>
            <TerminalBody onClick={() => document.getElementById('term-input').focus()}>
                {history.map((line, i) => (
                    <div key={i} style={{ marginBottom: '0.5rem', lineHeight: 1.5, color: line.type === 'input' ? '#f8fafc' : '#94a3b8' }}>
                        {line.type === 'input' && <span style={{color: '#10b981', marginRight: '0.5rem'}}>$</span>}
                        <span style={{ whiteSpace: 'pre-wrap' }}>{line.content}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{color: '#10b981', marginRight: '0.5rem'}}>$</span>
                    <input 
                        id="term-input"
                        autoFocus
                        style={{ 
                            background: 'transparent', border: 'none', color: 'white', 
                            fontFamily: 'inherit', outline: 'none', width: '100%' 
                        }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                    />
                </div>
                <div ref={bottomRef} />
            </TerminalBody>
        </TerminalWrapper>
    );
};

export default function DeveloperPageV2() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const [greeting, setGreeting] = useState('');
    const fullGreeting = "Full Stack Developer.";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setGreeting(fullGreeting.slice(0, i));
            i++; 
            if (i > fullGreeting.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <PageWrapper>
            <GlobalStyle />
            <motion.div style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: 4, background: THEME.primary, transformOrigin: '0%', zIndex: 9999 }} />
            <HeaderClean />
            <GridBackground />

            {/* --- HERO SECTION --- */}
            <HeroWrapper>
                <Container>
                    <HeroGrid>
                        <HeroContent>
                            <Badge initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <span style={{width: 8, height: 8, background: '#10b981', borderRadius: '50%', marginRight: 8, display: 'inline-block'}} />
                                Available for September 2025
                            </Badge>
                            
                            <Name initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                Théo Garcès
                                <br />
                                <span className="highlight">{greeting}</span><BlinkCursor />
                            </Name>
                            
                            <motion.p 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ delay: 0.3 }}
                                style={{ fontSize: '1.25rem', color: THEME.textMuted, lineHeight: 1.6, marginBottom: '2.5rem' }}
                            >
                                Crafting resilient digital experiences. Specialized in <strong>React Ecosystems</strong> and <strong>Scalable Node.js Backend</strong> architectures.
                            </motion.p>

                            <ButtonGroup initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <PrimaryButton href="#contact">
                                    Start a Project <ArrowRight size={20} />
                                </PrimaryButton>
                                <SecondaryButton href="/cv-theo-garces.pdf" download>
                                    <Download size={20} /> Resume
                                </SecondaryButton>
                            </ButtonGroup>
                        </HeroContent>

                        <HeroCard initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                           <InteractiveTerminal />
                        </HeroCard>
                    </HeroGrid>
                </Container>
            </HeroWrapper>

            {/* --- SKILLS BENTO GRID --- */}
            <Section $alt id="skills">
                <Container>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionTitle>Technical <span>Arsenal</span></SectionTitle>
                        <SectionSubtitle style={{ margin: '0 auto' }}>
                           My toolset is constantly evolving. Here is what I currently use to bring ideas to life.
                        </SectionSubtitle>
                    </div>

                    <BentoGrid>
                        <BentoCard className="col-span-2 row-span-2">
                             <div style={{ background: '#eff6ff', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: THEME.primary }}>
                                 <Layout size={28} />
                             </div>
                             <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Frontend Mastery</h3>
                             <p style={{ color: THEME.textMuted, lineHeight: 1.6, flex: 1 }}>
                                Building pixel-perfect, accessible, and responsive interfaces. I focus on component reusability and modern state management patterns.
                             </p>
                             <TechList>
                                 {['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Next.js'].map(t => (
                                     <TechTag key={t}>{t}</TechTag>
                                 ))}
                             </TechList>
                        </BentoCard>

                        <BentoCard>
                             <Database size={28} color={THEME.accent} style={{ marginBottom: '1rem' }} />
                             <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Backend</h3>
                             <p style={{ color: THEME.textMuted, fontSize: '0.9rem', marginTop: '0.5rem' }}>REST & GraphQL APIs that scale securely.</p>
                             <TechList>
                                 {['Node.js', 'PostgreSQL', 'Supabase'].map(t => <TechTag key={t}>{t}</TechTag>)}
                             </TechList>
                        </BentoCard>

                        <BentoCard>
                             <Globe size={28} color={THEME.purple} style={{ marginBottom: '1rem' }} />
                             <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Realtime</h3>
                             <p style={{ color: THEME.textMuted, fontSize: '0.9rem', marginTop: '0.5rem' }}>Live collaboration features.</p>
                             <TechList>
                                 <TechTag>WebRTC</TechTag>
                                 <TechTag>Socket.io</TechTag>
                             </TechList>
                        </BentoCard>

                        <BentoCard className="col-span-2">
                             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                 <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>AI Integration</h3>
                                 <Brain size={28} color="#f59e0b" />
                             </div>
                             <p style={{ color: THEME.textMuted }}>Leveraging LLMs and semantic search to build smarter applications.</p>
                             <TechList>
                                 <TechTag>OpenAI API</TechTag>
                                 <TechTag>LangChain</TechTag>
                                 <TechTag>Pinecone</TechTag>
                             </TechList>
                        </BentoCard>
                    </BentoGrid>
                </Container>
            </Section>

            {/* --- EXPERIENCE --- */}
            <Section id="projects">
                <Container>
                    <HeroGrid>
                        <div>
                            <SectionTitle>My <span>Journey</span></SectionTitle>
                            <SectionSubtitle>
                                From academic foundations to real-world applications.
                            </SectionSubtitle>
                            
                            <TimelineSection>
                                <TimelineItem initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                    <JobYear>2024 - Present</JobYear>
                                    <JobTitle>Coda School: Full Stack Bootcamp</JobTitle>
                                    <JobCompany><MapPin size={16} /> Paris / Remote</JobCompany>
                                    <p style={{ color: THEME.textMuted, lineHeight: 1.6 }}>
                                        Intensive training in modern web development. Building production-ready applications like VisioConnect and more. 
                                        Mastering the MERN stack and Agile methodologies.
                                    </p>
                                </TimelineItem>
                                
                                <TimelineItem initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                                    <JobYear>2022 - 2024</JobYear>
                                    <JobTitle>Freelance Web Developer</JobTitle>
                                    <JobCompany><Briefcase size={16} /> Remote</JobCompany>
                                    <p style={{ color: THEME.textMuted, lineHeight: 1.6 }}>
                                        Developed custom websites and e-commerce solutions for small businesses, ensuring SEO optimization and performance.
                                    </p>
                                </TimelineItem>
                            </TimelineSection>
                        </div>
                        
                        <div>
                             <BentoCard style={{ background: THEME.primary, color: 'white', border: 'none', textAlign: 'center', padding: '3rem 2rem' }}>
                                 <Star size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
                                 <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>Open to Work</h3>
                                 <p style={{ opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
                                     I am currently looking for an apprenticeship (Alternance) starting September 2025. 
                                     I bring passion, quick learning, and a solid technical foundation.
                                 </p>
                                 <SecondaryButton href="#contact" style={{ color: THEME.primary, borderColor: 'white' }}>
                                     Let's Talk
                                 </SecondaryButton>
                             </BentoCard>
                        </div>
                    </HeroGrid>
                </Container>
            </Section>

            {/* --- PROJECTS SHOWCASE --- */}
            <Section $alt>
                 <Container>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                         <div style={{ width: '100%' }}>
                             <SectionTitle>Featured <span>Work</span></SectionTitle>
                             <SectionSubtitle style={{ marginBottom: '1rem' }}>Things I've built lately.</SectionSubtitle>
                         </div>
                         <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                             <SecondaryButton href="https://github.com/theogarces" target="_blank">
                                 View GitHub <ExternalLink size={16} />
                             </SecondaryButton>
                         </div>
                     </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <BentoCard>
                            <div style={{ height: 200, background: '#e2e8f0', borderRadius: 12, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {/* Placeholder for project image */}
                                <Video size={64} color={THEME.textMuted} opacity={0.5} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>VisioConnect</h3>
                            <p style={{ color: THEME.textMuted, margin: '0.5rem 0 1rem' }}>
                                A seamless video conferencing platform with real-time chat, whiteboard, and screen sharing capabilities.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                <a href="#" style={{ color: THEME.primary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>Live Demo <ArrowRight size={16}/></a>
                            </div>
                        </BentoCard>

                        <BentoCard>
                            <div style={{ height: 200, background: '#e2e8f0', borderRadius: 12, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <Brain size={64} color={THEME.textMuted} opacity={0.5} />
                             </div>
                             <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Smart Chunking Engine</h3>
                             <p style={{ color: THEME.textMuted, margin: '0.5rem 0 1rem' }}>
                                 Python-based utility for splitting large codebases into semantic chunks for LLM processing context windows.
                             </p>
                             <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                 <a href="#" style={{ color: THEME.primary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>View Code <Github size={16}/></a>
                             </div>
                         </BentoCard>
                     </div>
                 </Container>
            </Section>

            {/* --- CTA --- */}
            <Section id="contact">
                <Container>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ 
                            background: '#0f172a', 
                            borderRadius: '32px', 
                            padding: 'clamp(3rem, 5vw, 5rem) 2rem', 
                            textAlign: 'center',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                         <div style={{ position: 'relative', zIndex: 2 }}>
                             <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>Ready to Collaborate?</h2>
                             <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 3rem' }}>
                                 I'm available for freelance projects or full-time opportunities. Let's build something amazing together.
                             </p>
                             <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                 <PrimaryButton href="mailto:theo.garces@coda-student.school" style={{ background: 'white', color: '#0f172a' }}>
                                     Email Me
                                 </PrimaryButton>
                                 <SecondaryButton href="https://linkedin.com/in/theogarces" target="_blank" style={{ background: 'transparent', color: 'white', borderColor: '#334155' }}>
                                     <Linkedin size={20} /> LinkedIn
                                 </SecondaryButton>
                             </div>
                         </div>
                    </motion.div>
                </Container>
            </Section>

            <FooterClean />
        </PageWrapper>
    );
}
