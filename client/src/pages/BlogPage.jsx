import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '../hooks/useTranslation';

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
    const { t } = useTranslation();

    const posts = [
        {
            id: 1,
            title: t('blog.posts.0.title'),
            excerpt: t('blog.posts.0.excerpt'),
            category: t('blog.posts.0.category'),
            date: t('blog.posts.0.date'),
            author: t('blog.posts.0.author'),
            imageColor: "#3b82f6"
        },
        {
            id: 2,
            title: t('blog.posts.1.title'),
            excerpt: t('blog.posts.1.excerpt'),
            category: t('blog.posts.1.category'),
            date: t('blog.posts.1.date'),
            author: t('blog.posts.1.author'),
            imageColor: "#10b981"
        },
        {
            id: 3,
            title: t('blog.posts.2.title'),
            excerpt: t('blog.posts.2.excerpt'),
            category: t('blog.posts.2.category'),
            date: t('blog.posts.2.date'),
            author: t('blog.posts.2.author'),
            imageColor: "#ef4444"
        },
        {
            id: 4,
            title: t('blog.posts.3.title'),
            excerpt: t('blog.posts.3.excerpt'),
            category: t('blog.posts.3.category'),
            date: t('blog.posts.3.date'),
            author: t('blog.posts.3.author'),
            imageColor: "#f59e0b"
        },
        {
            id: 5,
            title: t('blog.posts.4.title'),
            excerpt: t('blog.posts.4.excerpt'),
            category: t('blog.posts.4.category'),
            date: t('blog.posts.4.date'),
            author: t('blog.posts.4.author'),
            imageColor: "#8b5cf6"
        },
        {
            id: 6,
            title: t('blog.posts.5.title'),
            excerpt: t('blog.posts.5.excerpt'),
            category: t('blog.posts.5.category'),
            date: t('blog.posts.5.date'),
            author: t('blog.posts.5.author'),
            imageColor: "#ec4899"
        }
    ];

    return (
        <PageContainer>
            <HeaderClean />
            <MainContent>
                <Hero>
                    <SectionHeader>
                        <h1>{t('blog.hero.title')}</h1>
                        <p>
                            {t('blog.hero.subtitle')}
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
