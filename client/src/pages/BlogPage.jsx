import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';

const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  dark: 'hsl(var(--foreground))',
  text: 'hsl(var(--foreground))',
  lightText: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',
  success: '#16a34a',
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0 0 60px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
`; 

const Hero = styled.section`
  background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%);
  padding: 100px 24px 80px;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: ${COLORS.dark};
    margin-bottom: 16px;
  }

  p {
    font-size: 1.25rem;
    color: ${COLORS.lightText};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BlogCard = styled.article`
  background: ${COLORS.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s ease, border-color 0.3s ease;
  border: 1px solid ${COLORS.border};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  background-color: ${COLORS.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  font-size: 3rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Category = styled.span`
  color: ${COLORS.primary};
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 12px;
  line-height: 1.4;
`;

const Excerpt = styled.p`
  color: ${COLORS.lightText};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 24px;
  flex: 1;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${COLORS.border};
  padding-top: 16px;
  color: ${COLORS.lightText};
  font-size: 0.875rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;

const AvatarCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${COLORS.primary}; /* Fallback */
`;

const BlogPage = () => {
    const posts = [
        {
            id: 1,
            title: "L'avenir du travail hybride",
            excerpt: "Comment les entreprises s'adaptent à la nouvelle réalité du travail à distance et comment la technologie facilite cette transition.",
            category: "Tendances",
            date: "20 Fév 2024",
            author: "Marie D.",
            imageColor: "#3b82f6"
        },
        {
            id: 2,
            title: "5 astuces pour des réunions plus efficaces",
            excerpt: "Découvrez nos meilleures pratiques pour réduire le temps passé en réunion tout en augmentant la productivité de votre équipe.",
            category: "Productivité",
            date: "15 Fév 2024",
            author: "Thomas L.",
            imageColor: "#10b981"
        },
        {
            id: 3,
            title: "Sécurité des données : notre priorité",
            excerpt: "Un aperçu approfondi de la manière dont Visiconnect chiffre vos communications et protège vos données sensibles.",
            category: "Sécurité",
            date: "08 Fév 2024",
            author: "Sophie B.",
            imageColor: "#ef4444"
        },
        {
            id: 4,
            title: "Nouvelle fonctionnalité : Tableau Blanc",
            excerpt: "Collaborez visuellement avec votre équipe grâce à notre nouvel outil de tableau blanc interactif intégré.",
            category: "Produit",
            date: "01 Fév 2024",
            author: "Lucas M.",
            imageColor: "#f59e0b"
        },
        {
            id: 5,
            title: "Comment configurer votre espace de travail",
            excerpt: "Guide complet pour optimiser votre environnement physique et numérique pour le télétravail.",
            category: "Guide",
            date: "28 Jan 2024",
            author: "Camille R.",
            imageColor: "#8b5cf6"
        },
        {
            id: 6,
            title: "Interview : Le futur de la communication",
            excerpt: "Entretien avec notre CEO sur sa vision des communications unifiées pour la prochaine décennie.",
            category: "Interview",
            date: "20 Jan 2024",
            author: "Alex P.",
            imageColor: "#ec4899"
        }
    ];

    return (
        <PageContainer>
            <HeaderClean />
            <MainContent>
                <Hero>
                    <SectionHeader>
                        <h1>Le Blog Visiconnect</h1>
                        <p>
                            Actualités, conseils et insights sur le monde du travail collaboratif et de la communication.
                        </p>
                    </SectionHeader>
                </Hero>

                <ContentWrapper>
                <Grid>
                    {posts.map(post => (
                        <BlogCard key={post.id}>
                            <ImageContainer style={{ backgroundColor: post.imageColor }}>
                                {/* Placeholder for image */}
                                {post.category[0]}
                            </ImageContainer>
                            <CardContent>
                                <Category>{post.category}</Category>
                                <Title>{post.title}</Title>
                                <Excerpt>{post.excerpt}</Excerpt>
                                <Meta>
                                    <Author>
                                        <AvatarCircle style={{ backgroundColor: post.imageColor }} />
                                        {post.author}
                                    </Author>
                                    <span>{post.date}</span>
                                </Meta>
                            </CardContent>
                        </BlogCard>
                    ))}
                </Grid>
                </ContentWrapper>
                <CallToAction 
                    title="Vous souhaitez écrire pour nous ?"
                    description="Partagez vos idées et votre expertise avec la communauté VisioConnect."
                    buttonText="Proposer un article"
                    buttonLink="/contact"
                />
            </MainContent>
            <FooterClean />
        </PageContainer>
    );
};

export default BlogPage;
