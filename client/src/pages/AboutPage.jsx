import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Zap, 
  Shield, 
  Award, 
  Heart,
  Target,
  TrendingUp,
  CheckCircle,
  Star,
  Clock,
  ArrowRight
} from 'lucide-react';
import FooterUnified from '../components/FooterUnified';

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const HeroSection = styled.section`
  padding: 8rem 2rem 6rem;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(6, 182, 212, 0.05));
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: var(--text-secondary, #64748b);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  background: var(--bg-primary, #ffffff);
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-primary, #ffffff), var(--bg-primary, #ffffff)), 
                    var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.1);

  .stat-number {
    font-size: 2.5rem;
    font-weight: 900;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: var(--text-secondary, #64748b);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  
  &:nth-child(even) {
    background: rgba(37, 99, 235, 0.02);
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-primary, #1e293b);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary, #64748b);
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: var(--bg-primary, #ffffff);
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-primary, #ffffff), var(--bg-primary, #ffffff)), 
                    var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.1);

  .card-icon {
    width: 60px;
    height: 60px;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: white;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary, #1e293b);
  }

  .card-description {
    color: var(--text-secondary, #64748b);
    line-height: 1.6;
  }
`;

const TimelineContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    &::before {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  position: relative;

  &:nth-child(even) {
    flex-direction: row-reverse;

    .timeline-content {
      margin-right: 3rem;
      margin-left: 0;
    }

    .timeline-dot {
      transform: translateX(50%);
    }
  }

  &:nth-child(odd) {
    .timeline-content {
      margin-left: 3rem;
      margin-right: 0;
    }

    .timeline-dot {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    flex-direction: row !important;
    
    .timeline-content {
      margin-left: 3rem !important;
      margin-right: 0 !important;
    }
    
    .timeline-dot {
      left: 20px !important;
      transform: translateX(-50%) !important;
    }
  }

  .timeline-dot {
    width: 20px;
    height: 20px;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    border-radius: 50%;
    position: absolute;
    left: 50%;
    border: 4px solid var(--bg-primary, #ffffff);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    z-index: 2;
  }

  .timeline-content {
    flex: 1;
    background: var(--bg-primary, #ffffff);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.1);
    border: 2px solid transparent;
    background-image: linear-gradient(var(--bg-primary, #ffffff), var(--bg-primary, #ffffff)), 
                      var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    background-origin: border-box;
    background-clip: padding-box, border-box;

    .timeline-year {
      font-size: 1.2rem;
      font-weight: 800;
      background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }

    .timeline-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary, #1e293b);
      margin-bottom: 0.5rem;
    }

    .timeline-description {
      color: var(--text-secondary, #64748b);
      line-height: 1.6;
    }
  }
`;

const TeamGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const TeamCard = styled(motion.div)`
  background: var(--bg-primary, #ffffff);
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-primary, #ffffff), var(--bg-primary, #ffffff)), 
                    var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.1);

  .team-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .team-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-primary, #1e293b);
    margin-bottom: 0.5rem;
  }

  .team-role {
    color: var(--text-secondary, #64748b);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .team-description {
    color: var(--text-secondary, #64748b);
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const CTASection = styled(motion.section)`
  padding: 6rem 2rem;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  text-align: center;
  color: white;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.8;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid white;
  background: ${props => props.primary ? 'white' : 'transparent'};
  color: ${props => props.primary ? '#2563eb' : 'white'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? '#f8fafc' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(255, 255, 255, 0.2);
  }
`;

const AboutPage = () => {
  const stats = [
    { number: "1M+", label: "Utilisateurs actifs" },
    { number: "150+", label: "Pays couverts" },
    { number: "99.9%", label: "Disponibilité" },
    { number: "24/7", label: "Support client" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion Innovation",
      description: "Nous révolutionnons la communication digitale avec des technologies de pointe et une vision avant-gardiste."
    },
    {
      icon: Shield,
      title: "Sécurité Absolue",
      description: "Protection maximale de vos données avec un chiffrement bout en bout et des protocoles de sécurité militaires."
    },
    {
      icon: Users,
      title: "Collaboration Excellence",
      description: "Faciliter la collaboration mondiale avec des outils intuitifs et des expériences utilisateur exceptionnelles."
    },
    {
      icon: Globe,
      title: "Impact Mondial",
      description: "Connecter le monde entier avec une plateforme accessible, performante et respectueuse de l'environnement."
    },
    {
      icon: Zap,
      title: "Performance Ultime",
      description: "Technologie haute performance avec une latence ultra-faible et une qualité audiovisuelle parfaite."
    },
    {
      icon: Award,
      title: "Excellence Continue",
      description: "Engagement envers l'amélioration continue et l'innovation pour dépasser les attentes de nos utilisateurs."
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "Fondation VisiConnect",
      description: "Naissance de notre vision révolutionnaire pour transformer la communication digitale mondiale."
    },
    {
      year: "2024",
      title: "Lancement Beta",
      description: "Première version beta avec 10,000 utilisateurs pionniers et retours exceptionnels sur l'expérience utilisateur."
    },
    {
      year: "2024 Q3",
      title: "Expansion Internationale",
      description: "Déploiement dans 50 pays avec support multilingue et adaptation aux réglementations locales."
    },
    {
      year: "2024 Q4",
      title: "Intelligence Artificielle",
      description: "Intégration d'IA avancée pour traduction temps réel, transcription automatique et amélioration audio/vidéo."
    },
    {
      year: "2025",
      title: "Version 2.0",
      description: "Lancement officiel avec 1M+ d'utilisateurs, nouvelles fonctionnalités collaboratives et écosystème d'intégrations."
    }
  ];

  const team = [
    {
      name: "Alex Martin",
      role: "CEO & Fondateur",
      description: "Visionnaire technologique avec 15 ans d'expérience dans l'innovation digitale et l'entrepreneuriat.",
      initial: "AM"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Architecte logiciel experte en IA et systèmes distribués, ancienne ingénieure chez Google et Microsoft.",
      initial: "SC"
    },
    {
      name: "Marc Dubois",
      role: "Directeur Produit",
      description: "Expert UX/UI avec une passion pour créer des expériences utilisateur exceptionnelles et intuitives.",
      initial: "MD"
    },
    {
      name: "Lisa Johnson",
      role: "Directrice Marketing",
      description: "Stratégiste marketing digital avec expertise en croissance internationale et engagement communautaire.",
      initial: "LJ"
    }
  ];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            À Propos de VisiConnect
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nous révolutionnons la communication digitale en créant la plateforme de visioconférence 
            la plus avancée au monde, alliant intelligence artificielle, sécurité maximale et 
            expérience utilisateur exceptionnelle.
          </Subtitle>

          <StatsGrid
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(37, 99, 235, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </StatCard>
            ))}
          </StatsGrid>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionContent>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Nos Valeurs Fondamentales
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Les principes qui guident chaque décision et innovation chez VisiConnect
          </SectionSubtitle>

          <CardsGrid
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <Card
                key={index}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(37, 99, 235, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-icon">
                  <value.icon size={28} />
                </div>
                <div className="card-title">{value.title}</div>
                <div className="card-description">{value.description}</div>
              </Card>
            ))}
          </CardsGrid>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Notre Histoire
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Le voyage vers l'excellence en communication digitale
          </SectionSubtitle>

          <TimelineContainer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-description">{item.description}</div>
                </div>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Notre Équipe Exceptionnelle
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Les visionnaires qui façonnent l'avenir de la communication digitale
          </SectionSubtitle>

          <TeamGrid
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <TeamCard
                key={index}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(37, 99, 235, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="team-avatar">{member.initial}</div>
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
                <div className="team-description">{member.description}</div>
              </TeamCard>
            ))}
          </TeamGrid>
        </SectionContent>
      </Section>

      <CTASection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <CTAContent>
          <CTATitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Rejoignez la Révolution VisiConnect
          </CTATitle>
          
          <CTADescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Découvrez dès aujourd'hui comment VisiConnect peut transformer votre façon de communiquer 
            et collaborer. Rejoignez plus d'un million d'utilisateurs qui nous font déjà confiance.
          </CTADescription>

          <CTAButtons
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <CTAButton
              primary
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer Gratuitement
              <ArrowRight size={20} />
            </CTAButton>
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contacter l'Équipe
            </CTAButton>
          </CTAButtons>
        </CTAContent>
      </CTASection>

      <FooterUnified />
    </Container>
  );
};

export default AboutPage;