import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Code, 
  Terminal, 
  Database, 
  Layout, 
  Server, 
  Cpu, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

// --- Styled Components ---
const PageContainer = styled.div`
  font-family: 'Inter', sans-serif;
  color: #1e293b; // slate-800
  background-color: #f8fafc; // slate-50
  min-height: 100vh;
`;

const MainContent = styled.main`
  overflow-x: hidden;
`;

// Hero Section
const HeroSection = styled.section`
  padding: 6rem 1.5rem;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 10;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  width: 350px;
  height: 350px;
  margin: 0 auto;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid white;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: #60a5fa;
    border-radius: 50%;
    z-index: -1;
    opacity: 0.5;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: -30px;
    width: 60px;
    height: 60px;
    background: #93c5fd;
    border-radius: 50%;
    z-index: -1;
    opacity: 0.6;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.2;
    background: linear-gradient(to right, #ffffff, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: #eff6ff;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #dae8fc;
    margin-bottom: 2rem;
    max-width: 600px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const Tag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: white;
  color: #2563eb;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    background: #eff6ff;
  }
`;

// Stats Section
const StatsSection = styled.section`
  padding: 2rem 1.5rem;
  background: white;
  margin-top: -3rem;
  position: relative;
  z-index: 20;
`;

const StatsGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2563eb;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    color: #64748b;
    font-weight: 500;
  }
`;

// About & Skills Section
const ContentSection = styled.section`
  padding: 6rem 1.5rem;
  margin: 0 auto;
  max-width: 1200px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.25rem;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.125rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto 4rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: #bfdbfe;
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    background: #eff6ff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      color: #475569;
      
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2563eb;
      }
    }
  }
`;

// Timeline Section
const TimelineSection = styled.section`
  padding: 6rem 1.5rem;
  background: #f1f5f9;
`;

const TimelineContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background: #e2e8f0;
    top: 0;
    bottom: 0;
    left: 20px;
    margin-left: -1px;
    
    @media (min-width: 768px) {
      left: 50%;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 50%;
    
    &:nth-child(odd) {
      left: 0;
      text-align: right;
      
      .content {
        margin-right: 20px;
      }
      
      .circle {
        right: -30px;
      }
    }
    
    &:nth-child(even) {
      left: 50%;
      
      .content {
        margin-left: 20px;
      }
      
      .circle {
        left: -30px;
      }
    }
  }

  @media (max-width: 767px) {
    .content {
      margin-left: 20px;
    }
    
    .circle {
      left: -9px;
    }
  }

  .circle {
    width: 20px;
    height: 20px;
    background: #2563eb;
    border: 4px solid #dbeafe;
    border-radius: 50%;
    position: absolute;
    top: 24px;
    z-index: 10;
  }
  
  .content {
    padding: 1.5rem;
    background: white;
    position: relative;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    
    h3 {
      font-size: 1.125rem;
      font-weight: 700;
      color: #0f172a;
    }
    
    span {
      display: inline-block;
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 0.5rem;
      font-weight: 500;
      background: #f1f5f9;
      padding: 2px 8px;
      border-radius: 4px;
    }
    
    p {
      color: #475569;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-top: 0.5rem;
    }
  }
`;

// Contact CTA
const ContactSection = styled.div`
  background: white;
  padding: 4rem 2rem;
  text-align: center;
  border-top: 1px solid #e2e8f0;
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #2563eb;
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  font-size: 1.125rem;
  margin-top: 2rem;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
  }
`;

function DeveloperPage() {
  return (
    <PageContainer>
      <HeaderClean />
      
      <MainContent>
        <HeroSection>
          <HeroContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroText>
              <h2>Bonjour, je suis</h2>
              <h1>Théo</h1>
              <TagContainer>
                <Tag
                  whileHover={{ scale: 1.05 }}
                  style={{ background: 'rgba(37, 99, 235, 0.3)', borderColor: '#60a5fa' }}
                >
                  <Code size={16} /> Développeur Fullstack
                </Tag>
                <Tag whileHover={{ scale: 1.05 }}>
                  <MapPin size={16} /> Paris, France
                </Tag>
                <Tag whileHover={{ scale: 1.05 }}>
                  <Calendar size={16} /> 25 ans
                </Tag>
              </TagContainer>
              <p>
                Passionné par la création d'expériences web modernes et performantes. 
                Spécialisé dans l'écosystème React et les solutions Cloud. 
                J'aime transformer des idées complexes en interfaces simples et élégantes.
              </p>
              
              <SocialLinks>
                <SocialButton href="https://github.com" target="_blank" title="GitHub">
                  <Github size={24} />
                </SocialButton>
                <SocialButton href="https://linkedin.com" target="_blank" title="LinkedIn">
                  <Linkedin size={24} />
                </SocialButton>
                <SocialButton href="mailto:theo@example.com" title="Email">
                  <Mail size={24} />
                </SocialButton>
              </SocialLinks>
            </HeroText>

            <ProfileImageContainer
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="Théo - Développeur" />
            </ProfileImageContainer>
          </HeroContent>
        </HeroSection>

        <StatsSection>
          <StatsGrid>
            <StatItem>
              <h3>5+</h3>
              <p>Années d'expérience</p>
            </StatItem>
            <StatItem>
              <h3>50+</h3>
              <p>Projets réalisés</p>
            </StatItem>
            <StatItem>
              <h3>100%</h3>
              <p>Satisfaction client</p>
            </StatItem>
          </StatsGrid>
        </StatsSection>

        <ContentSection>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Mes Compétences
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Une expertise technique complète pour donner vie à vos projets, du backend à l'interface utilisateur.
          </SectionSubtitle>

          <SkillsGrid>
            <SkillCard whileHover={{ y: -5 }}>
              <div className="icon-wrapper">
                <Layout size={32} />
              </div>
              <h3>Frontend Development</h3>
              <ul>
                <li>React.js / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS / Styled Components</li>
                <li>Framer Motion</li>
              </ul>
            </SkillCard>

            <SkillCard whileHover={{ y: -5 }}>
              <div className="icon-wrapper">
                <Server size={32} />
              </div>
              <h3>Backend Engineering</h3>
              <ul>
                <li>Node.js / Express</li>
                <li>Python / Django</li>
                <li>PostgreSQL / MongoDB</li>
                <li>API REST / GraphQL</li>
              </ul>
            </SkillCard>

            <SkillCard whileHover={{ y: -5 }}>
              <div className="icon-wrapper">
                <Cpu size={32} />
              </div>
              <h3>DevOps & Cloud</h3>
              <ul>
                <li>Docker / Kubernetes</li>
                <li>AWS / Azure</li>
                <li>CI/CD Pipelines</li>
                <li>Git / GitHub Actions</li>
              </ul>
            </SkillCard>
          </SkillsGrid>
        </ContentSection>

        <TimelineSection>
          <SectionTitle>Mon Parcours</SectionTitle>
          <SectionSubtitle>
            Quelques étapes clés de mon évolution professionnelle.
          </SectionSubtitle>
          
          <TimelineContainer>
            <TimelineItem initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="circle"></div>
              <div className="content">
                <h3>Lead Développeur Frontend</h3>
                <span>2023 - Présent</span>
                <p>Architecture et développement d'applications SaaS complexes. Mentoring d'une équipe de 5 développeurs juniors.</p>
              </div>
            </TimelineItem>

            <TimelineItem initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="circle"></div>
              <div className="content">
                <h3>Développeur Fullstack Senior</h3>
                <span>2021 - 2023</span>
                <p>Création de plateformes e-commerce à fort trafic. Optimisation des performances et implémentation de systèmes de paiement sécurisés.</p>
              </div>
            </TimelineItem>

            <TimelineItem initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="circle"></div>
              <div className="content">
                <h3>Freelance Web Développeur</h3>
                <span>2019 - 2021</span>
                <p>Collaboration avec diverses startups pour la réalisation de MVP rapides. Spécialisation dans l'écosystème JavaScript.</p>
              </div>
            </TimelineItem>
          </TimelineContainer>
        </TimelineSection>

        <ContactSection>
          <SectionTitle>Envie de collaborer ?</SectionTitle>
          <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Je suis toujours ouvert aux nouveaux projets et opportunités intéressantes. Discutons de la manière dont je peux vous aider.
          </p>
          <ContactButton href="mailto:theo@example.com">
            Me Contacter <ExternalLink size={20} />
          </ContactButton>
        </ContactSection>
      </MainContent>

      <FooterClean />
    </PageContainer>
  );
}

export default DeveloperPage;
