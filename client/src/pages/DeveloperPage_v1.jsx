import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Terminal, Database, Server, Cpu, Github, Linkedin, Mail, 
  MapPin, Calendar, Briefcase, GraduationCap, ChevronRight, ChevronLeft,
  Smartphone, Monitor, Brain, Globe, FileText, CheckCircle, FolderOpen,
  Layout, Layers, Phone
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

// --- Theme & Styled Components ---
const THEME = {
  primary: '#2563eb', // Blue 600
  secondary: '#0f172a', // Slate 900
  accent: '#3b82f6', // Blue 500
  textLight: '#f8fafc',
  textDark: '#1e293b',
  bgLight: '#f1f5f9',
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${THEME.bgLight};
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
`;

const SliderSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding-top: 80px; 
  padding-bottom: 50px;
  min-height: 850px; 
  background: radial-gradient(circle at center, #eff6ff 0%, #f1f5f9 100%);
`;

const SlideWrapper = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  height: 600px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05);
  display: flex;
  overflow: hidden;
  position: relative;

  @media (max-width: 968px) {
    flex-direction: column;
    height: auto;
    min-height: 800px;
    margin: 0 1rem;
    max-width: calc(100% - 2rem);
  }
`;

const LeftPanel = styled.div`
  flex: 0.35;
  background: linear-gradient(135deg, ${THEME.secondary} 0%, #1e293b 100%);
  color: white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.5;
  }

  @media (max-width: 968px) {
    padding: 2rem;
    flex: 0 0 auto;
    align-items: center;
    text-align: center;
  }
`;

const RightPanel = styled.div`
  flex: 0.65;
  padding: 3rem;
  background: white;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* Custom Scrollbar */
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }

  @media (max-width: 968px) {
    padding: 1.5rem;
    flex: 1;
  }
`;

const ControlsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 20;
`;

const NavButton = styled.button`
  background: ${props => props.disabled ? '#f1f5f9' : 'white'};
  color: ${props => props.disabled ? '#94a3b8' : THEME.primary};
  border: 1px solid ${props => props.disabled ? 'transparent' : '#e2e8f0'};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    transform: scale(1.1);
    background: ${THEME.primary};
    color: white;
    border-color: ${THEME.primary};
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? THEME.primary : '#cbd5e1'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${THEME.accent};
    transform: scale(1.2);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: ${THEME.textDark};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  letter-spacing: -0.02em;
`;

const Badge = styled.span`
  background-color: ${props => props.$bg || '#dbeafe'};
  color: ${props => props.$color || '#1e40af'};
  padding: 0.35rem 0.85rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid rgba(0,0,0,0.05);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const SkillItem = styled(motion.div)`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  transition: all 0.2s;
  cursor: default;
  height: 100px;

  &:hover {
    border-color: ${THEME.primary};
    background: white;
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    
    svg {
       transform: scale(1.1);
    }
  }

  svg {
    color: ${THEME.primary};
    transition: transform 0.2s;
  }
  
  span {
    font-weight: 600;
    font-size: 0.85rem;
    color: #475569;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 2rem;
  margin-bottom: 2.5rem;
  border-left: 2px solid #e2e8f0;

  &:last-child {
    margin-bottom: 0;
    border-left-color: transparent;
  }

  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 0;
    width: 12px;
    height: 12px;
    background: white;
    border: 3px solid ${THEME.primary};
    border-radius: 50%;
    z-index: 2;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  text-decoration: none;
  color: ${THEME.textDark};
  transition: all 0.2s;

  &:hover {
    border-color: ${THEME.primary};
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    transform: translateX(4px);
  }

  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: ${THEME.bgLight};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${THEME.primary};
  }

  div {
    display: flex;
    flex-direction: column;
    
    strong {
      font-size: 0.9rem;
      color: #64748b;
      margin-bottom: 0.25rem;
    }
    
    span {
      font-weight: 600;
    }
  }
`;

const ProfileCircle = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
`;

// --- Data ---

const SLIDES = [
  {
    id: 'intro',
    leftContent: (
      <div style={{ textAlign: 'center', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ProfileCircle>TG</ProfileCircle>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', lineHeight: '1.2', margin: '0 0 0.5rem 0' }}>Théo Garcès</h1>
        <div style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: '500', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 1rem', borderRadius: '20px' }}>
          Développeur Full Stack
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
           <Badge $bg="rgba(255,255,255,0.1)" $color="white">Permis B</Badge>
           <Badge $bg="rgba(255,255,255,0.1)" $color="white">Mobile</Badge>
        </div>
      </div>
    ),
    rightContent: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
         <SectionTitle>Profil <Badge $bg="#dcfce7" $color="#166534">Disponible</Badge></SectionTitle>
         <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569', marginBottom: '2rem' }}>
            Professionnel polyvalent et adaptable, capable de m'adapter rapidement à divers environnements de travail. 
            Ma rigueur, ma précision et mon souci du détail sont des atouts essentiels dans l'exécution de mes tâches.
         </p>
         <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569' }}>
            De plus, ma capacité d'écoute et de compréhension me permet de communiquer aisément avec mes collègues. 
            Je suis un collaborateur fiable et compétent, prêt à relever de nouveaux défis avec enthousiasme.
         </p>
         
         <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: '#334155' }}>
                 <MapPin size={20} color={THEME.primary} /> Orléans (45000)
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: '#334155' }}>
                 <Globe size={20} color={THEME.primary} /> Région Centre Val de Loire
             </div>
         </div>
      </div>
    )
  },
  {
    id: 'skills',
    leftContent: (
        <div style={{ zIndex: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Layers size={32} />
            Stack Tech
          </h2>
          <p style={{ opacity: 0.9, lineHeight: '1.6', fontSize: '1.1rem' }}>
            Un arsenal complet pour construire des applications web modernes, performantes et scalables de bout en bout.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '8px' }}><Code size={24} /></div>
                 <div>
                    <div style={{ fontWeight: 'bold' }}>Front-End</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>React, Angular, UI/UX</div>
                 </div>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '8px' }}><Server size={24} /></div>
                 <div>
                    <div style={{ fontWeight: 'bold' }}>Back-End</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Node.js, Python, PHP</div>
                 </div>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '8px' }}><Brain size={24} /></div>
                 <div>
                    <div style={{ fontWeight: 'bold' }}>IA & Data</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>OpenAI API, SQL, NoSQL</div>
                 </div>
             </div>
          </div>
        </div>
      ),
    rightContent: (
      <div>
        <SectionTitle>Compétences</SectionTitle>
        <Grid>
            {[
                { name: 'JavaScript', icon: <Code /> },
                { name: 'TypeScript', icon: <Code /> },
                { name: 'React', icon: <Code /> },
                { name: 'Node.js', icon: <Server /> },
                { name: 'Python', icon: <Terminal /> },
                { name: 'PHP', icon: <Database /> },
                { name: 'HTML5', icon: <Layout /> },
                { name: 'CSS3', icon: <Layout /> },
                { name: 'Bootstrap', icon: <Layout /> },
                { name: 'SQL', icon: <Database /> },
                { name: 'MySQL', icon: <Database /> },
                { name: 'MongoDB', icon: <Database /> },
                { name: 'Git / GitHub', icon: <FolderOpen /> }, // Replaced Github specific with generic folder/repo icon if missing or keep Layout
                { name: 'OpenAI API', icon: <Brain /> },
                { name: 'Figma', icon: <Layout /> },
                { name: 'Angular', icon: <Code /> },
            ].map((skill, idx) => (
                <SkillItem key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {skill.icon}
                    <span>{skill.name}</span>
                </SkillItem>
             ))}
        </Grid>
      </div>
    )
  },
  {
    id: 'experience',
    leftContent: (
        <div style={{ zIndex: 1 }}>
           <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Briefcase size={32} />
            Parcours
          </h2>
           <p style={{ opacity: 0.9, lineHeight: '1.6', fontSize: '1.1rem' }}>
             Expériences concrètes en entreprise, axées sur l'innovation et la qualité.
           </p>
           
           <div style={{ fontSize: '8rem', fontWeight: '900', opacity: 0.05, position: 'absolute', bottom: '-20px', right: '0' }}>
               PRO
           </div>
        </div>
    ),
    rightContent: (
      <div>
        <SectionTitle>Expériences Professionnelles</SectionTitle>
        <div style={{ marginTop: '2rem' }}>
            <TimelineItem>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                     <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>Développeur IA Junior - Stage</h4>
                     <Badge>Mars 2025 - Mai 2025</Badge>
                </div>
                <div style={{ color: THEME.primary, fontWeight: '600', marginBottom: '1rem', display: 'flex', items: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} /> Steerway | Dijon
                </div>
                <ul style={{ fontSize: '0.95rem', color: '#475569', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                    <li>Conception et implémentation d'un système de découpage de code source en Python</li>
                    <li>Exploration des modèles de langage (LLMs) et utilisation des APIs OpenAI</li>
                    <li>Implémentation de visualisations pour l'analyse de la structure des chunks de code</li>
                    <li>Support multi-langages avec analyse de code JavaScript, HTML, PHP et Python</li>
                    <li>Mise en place de tests unitaires, d'intégration et de performance avec Pytest</li>
                </ul>
            </TimelineItem>

            <TimelineItem>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                     <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>Designer Web</h4>
                     <Badge $bg="#f1f5f9" $color="#64748b">2020 - 2021</Badge>
                </div>
                <div style={{ color: THEME.primary, fontWeight: '600', marginBottom: '1rem', display: 'flex', items: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} /> Experiencis | Tours
                </div>
                <ul style={{ fontSize: '0.95rem', color: '#475569', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                    <li>Création de maquettes et prototypes interactifs pour des projets web (Figma).</li>
                    <li>Expérience solide dans la conception de sites web attrayants et fonctionnels.</li>
                    <li>Création d'interfaces intuitives et conviviales (UI/UX).</li>
                </ul>
            </TimelineItem>
        </div>
      </div>
    )
  },
  {
    id: 'formation',
    leftContent: (
        <div style={{ zIndex: 1 }}>
           <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <GraduationCap size={32} />
            Éducation
          </h2>
           <p style={{ opacity: 0.9, lineHeight: '1.6', fontSize: '1.1rem' }}>
             Un parcours académique solide complété par une formation continue en autodidacte.
           </p>
        </div>
    ),
    rightContent: (
        <div>
          <SectionTitle>Formation Académique</SectionTitle>
          <div style={{ marginTop: '2rem' }}>
              <TimelineItem>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>Bachelor CDA - Développeur Full Stack</h4>
                  <div style={{ color: THEME.primary, fontWeight: '600', fontSize: '0.9rem', marginTop: '0.25rem' }}>Coda | Orléans | 2023</div>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>
                      Formation intensive en développement et conception d'applications. Java, Python, JS, C, PHP.
                  </p>
              </TimelineItem>
  
              <TimelineItem>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>Concepteur Développeur Web et Mobile</h4>
                  <div style={{ color: THEME.primary, fontWeight: '600', fontSize: '0.9rem', marginTop: '0.25rem' }}>Esecad | Tours | 2023</div>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>
                      Spécialisation DWWM. Frameworks React, Angular, Bootstrap. SGBD (SQL, MongoDB).
                  </p>
              </TimelineItem>
  
              <TimelineItem>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>Formation Front-End (Autodidacte)</h4>
                  <div style={{ color: THEME.primary, fontWeight: '600', fontSize: '0.9rem', marginTop: '0.25rem' }}>Udemy | 2021-2022</div>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>
                      HTML, CSS, JS, PHP, SQL, Bootstrap, React. focus sur l'autonomie.
                  </p>
              </TimelineItem>

              <TimelineItem>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>Bac Pro Système Numérique (ARED)</h4>
                  <div style={{ color: THEME.primary, fontWeight: '600', fontSize: '0.9rem', marginTop: '0.25rem' }}>Lycée La Providence | Blois | 2020</div>
              </TimelineItem>
          </div>
        </div>
      )
  },
  {
    id: 'contact',
    leftContent: (
        <div style={{ zIndex: 1, textAlign: 'center' }}>
           <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Alternance</h2>
           <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
               <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2025</div>
               <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Septembre</div>
           </div>
           <p style={{ marginTop: '2rem', opacity: 0.9 }}>
                Recherche active en région Centre Val de Loire.
           </p>
        </div>
    ),
    rightContent: ( 
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <SectionTitle>Recherche & Contact</SectionTitle>
            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem' }}>
                Je recherche une alternance pour approfondir mes compétences en développement web (Front/Back/Data) et gestion de projet Agile.
            </p>

            <ContactGrid>
                <ContactCard href="tel:+33648588179">
                    <div className="icon-box"><Phone size={24} /></div>
                    <div>
                        <strong>Téléphone</strong>
                        <span>06 48 58 81 79</span>
                    </div>
                </ContactCard>

                <ContactCard href="mailto:theo.garces@coda-student.school">
                    <div className="icon-box"><Mail size={24} /></div>
                    <div>
                        <strong>Email</strong>
                        <span>theo.garces@coda-student.school</span>
                    </div>
                </ContactCard>
            </ContactGrid>

            <div style={{ marginTop: '2rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#334155' }}>Intérêts Spécifiques</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Badge $bg="white" style={{ border: '1px solid #e2e8f0' }}>Dev Full Stack</Badge>
                    <Badge $bg="white" style={{ border: '1px solid #e2e8f0' }}>API RESTful</Badge>
                    <Badge $bg="white" style={{ border: '1px solid #e2e8f0' }}>Bases de données</Badge>
                    <Badge $bg="white" style={{ border: '1px solid #e2e8f0' }}>Agile / Scrum</Badge>
                    <Badge $bg="white" style={{ border: '1px solid #e2e8f0' }}>UX / UI</Badge>
                </div>
            </div>
        </div>
    )
  }
];

export default function DeveloperPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };
  
  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <PageContainer>
      <HeaderClean />
      
      <SliderSection>
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <SlideWrapper
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <LeftPanel>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    {SLIDES[currentIndex].leftContent}
                </div>
            </LeftPanel>

            <RightPanel>
              {SLIDES[currentIndex].rightContent}
            </RightPanel>
          </SlideWrapper>
        </AnimatePresence>

        <ControlsContainer>
          <NavButton onClick={prevSlide}>
            <ChevronLeft size={24} />
          </NavButton>
          
          <DotsContainer>
            {SLIDES.map((slide, idx) => (
              <Dot 
                key={slide.id} 
                active={idx === currentIndex}
                onClick={() => goToSlide(idx)}
                title={slide.id}
              />
            ))}
          </DotsContainer>
          
          <NavButton onClick={nextSlide}>
            <ChevronRight size={24} />
          </NavButton>
        </ControlsContainer>

      </SliderSection>

      <FooterClean />
    </PageContainer>
  );
}
