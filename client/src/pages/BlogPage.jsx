import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BookOpen } from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '../hooks/useTranslation';

const COLORS = {
  primary: '#2563eb',
  dark: '#0f172a',
  text: '#374151',
  lightText: '#6b7280',
  background: '#ffffff',
  bg: '#f8fbff',
  white: '#ffffff',
  border: '#e5e7eb',
  softBlue: '#eff6ff',
  blueTint: '#dbeafe',
  success: '#16a34a',
};

const floatIn = keyframes`
  from { opacity:0; transform:translateY(18px) scale(0.98); }
  to   { opacity:1; transform:translateY(0) scale(1); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 30%),
    linear-gradient(180deg, ${COLORS.bg} 0%, #fff 25%, #fff 100%);
  color: ${COLORS.dark};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0 0 60px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
`;

const Hero = styled.section`
  background: transparent;
  padding: 6rem 1.5rem 5rem;
  border-bottom: 1px solid ${COLORS.border};
  margin-bottom: 60px;

  @media (max-width: 768px) {
    padding: 4rem 1.1rem 3rem;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    padding: 2.6rem 1rem 2rem;
    margin-bottom: 20px;
  }
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 3rem;
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
const HeroLeft = styled.div`
  animation: ${floatIn} 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
`;
const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  background: ${COLORS.softBlue};
  border: 1px solid ${COLORS.blueTint};
  color: ${COLORS.primary};
  font-weight: 700;
  font-size: 0.82rem;
  margin-bottom: 1.25rem;
`;
const HeroPanel = styled.div`
  background: linear-gradient(180deg, #fff 0%, ${COLORS.bg} 100%);
  border: 1px solid ${COLORS.border};
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  animation: ${floatIn} 0.9s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
`;
const PanelTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${COLORS.lightText};
  margin-bottom: 1rem;
`;
const TopicPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;
const Pill = styled.div`
  padding: 0.5rem 0.9rem;
  border: 1px solid ${COLORS.border};
  border-radius: 9999px;
  background: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${COLORS.dark};
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
  &:hover {
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

const SectionHeader = styled.div`
  h1 {
    font-size: clamp(2.5rem, 5vw, 4.2rem);
    font-weight: 800;
    color: ${COLORS.dark};
    margin: 0 0 1.25rem;
    letter-spacing: -0.03em;
    line-height: 1.08;
  }
  p {
    font-size: 1.15rem;
    color: ${COLORS.lightText};
    max-width: 520px;
    margin: 0;
    line-height: 1.65;
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
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    background-color 0.3s ease,
    border-color 0.3s ease;
  border: 1px solid ${COLORS.border};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
  const { t } = useTranslation();

  const posts = [
    {
      id: 1,
      title: t('blog.posts.0.title'),
      excerpt: t('blog.posts.0.excerpt'),
      category: t('blog.posts.0.category'),
      date: t('blog.posts.0.date'),
      author: t('blog.posts.0.author'),
      imageColor: '#3b82f6',
    },
    {
      id: 2,
      title: t('blog.posts.1.title'),
      excerpt: t('blog.posts.1.excerpt'),
      category: t('blog.posts.1.category'),
      date: t('blog.posts.1.date'),
      author: t('blog.posts.1.author'),
      imageColor: '#10b981',
    },
    {
      id: 3,
      title: t('blog.posts.2.title'),
      excerpt: t('blog.posts.2.excerpt'),
      category: t('blog.posts.2.category'),
      date: t('blog.posts.2.date'),
      author: t('blog.posts.2.author'),
      imageColor: '#ef4444',
    },
    {
      id: 4,
      title: t('blog.posts.3.title'),
      excerpt: t('blog.posts.3.excerpt'),
      category: t('blog.posts.3.category'),
      date: t('blog.posts.3.date'),
      author: t('blog.posts.3.author'),
      imageColor: '#f59e0b',
    },
    {
      id: 5,
      title: t('blog.posts.4.title'),
      excerpt: t('blog.posts.4.excerpt'),
      category: t('blog.posts.4.category'),
      date: t('blog.posts.4.date'),
      author: t('blog.posts.4.author'),
      imageColor: '#8b5cf6',
    },
    {
      id: 6,
      title: t('blog.posts.5.title'),
      excerpt: t('blog.posts.5.excerpt'),
      category: t('blog.posts.5.category'),
      date: t('blog.posts.5.date'),
      author: t('blog.posts.5.author'),
      imageColor: '#ec4899',
    },
  ];

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <HeroInner>
            <HeroLeft>
              <HeroEyebrow>
                <BookOpen size={14} />
                Blog
              </HeroEyebrow>
              <SectionHeader>
                <h1>{t('blog.hero.title')}</h1>
                <p>{t('blog.hero.subtitle')}</p>
              </SectionHeader>
            </HeroLeft>
            <HeroPanel>
              <PanelTitle>Catégories</PanelTitle>
              <TopicPills>
                {[
                  'Produit',
                  'Sécurité',
                  'Intégrations',
                  'Tutoriels',
                  'Actualités',
                  'IA & Vidéo',
                ].map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </TopicPills>
            </HeroPanel>
          </HeroInner>
        </Hero>

        <ContentWrapper>
          <Grid>
            {posts.map((post) => (
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
          title={t('blog.cta.title')}
          description={t('blog.cta.description')}
          buttonText={t('blog.cta.button')}
          buttonLink="/contact"
        />
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default BlogPage;
