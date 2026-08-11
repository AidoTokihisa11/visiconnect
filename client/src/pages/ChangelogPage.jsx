import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Cpu,
  Video,
  ShieldCheck,
  BarChart2,
  Paintbrush,
  Users,
  Zap,
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';

// ─── Colour palette ──────────────────────────────────────────────────────────
const C = {
  primary: '#2563eb',
  dark: '#0f172a',
  text: '#374151',
  muted: '#6b7280',
  bg: '#f8fbff',
  white: '#ffffff',
  border: '#e5e7eb',
  softBlue: '#eff6ff',
  blueTint: '#dbeafe',
};

const TAG_META = {
  ai: { icon: Cpu, color: '#7c3aed', bg: '#f5f3ff' },
  video: { icon: Video, color: '#2563eb', bg: '#eff6ff' },
  security: { icon: ShieldCheck, color: '#16a34a', bg: '#f0fdf4' },
  analytics: { icon: BarChart2, color: '#d97706', bg: '#fffbeb' },
  design: { icon: Paintbrush, color: '#db2777', bg: '#fdf2f8' },
  collaboration: { icon: Users, color: '#0891b2', bg: '#ecfeff' },
  performance: { icon: Zap, color: '#4f46e5', bg: '#eef2ff' },
  launch: { icon: Rocket, color: '#6b7280', bg: '#f9fafb' },
};

const NOTE_COUNTS = [5, 5, 5, 4, 4, 5, 4, 5];
const COLOR_KEYS = [
  'ai',
  'video',
  'security',
  'analytics',
  'design',
  'collaboration',
  'performance',
  'launch',
];

// ─── Animations ──────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseRing = keyframes`
  0%   { transform: scale(1);   opacity: 0.7; }
  70%  { transform: scale(1.7); opacity: 0;   }
  100% { transform: scale(1);   opacity: 0;   }
`;

// ─── Layout ──────────────────────────────────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 30%),
    linear-gradient(180deg, ${C.bg} 0%, #ffffff 25%, #ffffff 100%);
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

// ─── Hero ────────────────────────────────────────────────────────────────────
const HeroWrap = styled.section`
  background: transparent;
  padding: 6rem 1.5rem 5rem;
  text-align: center;
  border-bottom: 1px solid ${C.border};
  position: relative;
  @media (max-width: 768px) {
    padding: 4rem 1.1rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 2.6rem 1rem 2rem;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${C.softBlue};
  border: 1px solid ${C.blueTint};
  color: ${C.primary};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 6px 16px;
  border-radius: 9999px;
  margin-bottom: 24px;
  animation: ${fadeUp} 0.5s ease both;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: ${C.dark};
  line-height: 1.15;
  letter-spacing: -0.02em;
  max-width: 760px;
  margin: 0 auto 20px;
  animation: ${fadeUp} 0.6s 0.1s ease both;
`;

const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  color: ${C.muted};
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`;

// ─── Timeline section ────────────────────────────────────────────────────────
const Section = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 24px;
`;

const Rail = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 22px;
    top: 26px;
    bottom: 26px;
    width: 3px;
    border-radius: 3px;
    background: linear-gradient(180deg, #2563eb 0%, #60a5fa 55%, #dbeafe 100%);

    @media (min-width: 640px) {
      left: 26px;
    }
  }
`;

const Entry = styled.article`
  display: flex;
  gap: 24px;
  padding-bottom: 56px;
  position: relative;
  opacity: 0;
  transform: translateX(-18px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  transition-delay: var(--delay, 0s);

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }

  &:last-child {
    padding-bottom: 0;
  }

  @media (min-width: 640px) {
    gap: 32px;
  }
`;

const IconCircle = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${C.white};
  border: 2.5px solid ${({ $color }) => $color};
  box-shadow:
    0 0 0 5px ${({ $color }) => $color}22,
    0 4px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: box-shadow 0.3s ease;

  svg {
    color: ${({ $color }) => $color};
  }

  &:hover {
    box-shadow:
      0 0 0 8px ${({ $color }) => $color}28,
      0 6px 20px rgba(0, 0, 0, 0.12);
  }

  ${({ $latest }) =>
    $latest &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: -5px;
        border-radius: 50%;
        border: 2px solid rgba(37, 99, 235, 0.45);
        animation: ${pulseRing} 2.2s ease-out infinite;
      }
    `}

  @media (min-width: 640px) {
    width: 52px;
    height: 52px;
  }
`;

const Card = styled.div`
  flex: 1;
  background: ${C.white};
  border: 1px solid ${C.border};
  border-top: 3px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.05);
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (min-width: 640px) {
    padding: 28px 32px;
  }
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
`;

const VersionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 4px 12px;
  border-radius: 9999px;
  background: ${({ $color }) => $color}18;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}30;
`;

const LatestDot = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #22c55e30;
`;

const TagBadge = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 9999px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

const DateLabel = styled.span`
  margin-left: auto;
  font-size: 0.8rem;
  color: ${C.muted};
  font-weight: 500;
  white-space: nowrap;
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${C.dark};
  margin: 0 0 16px;
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`;

const NoteList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NoteItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.95rem;
  color: ${C.text};
  line-height: 1.55;

  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ $color }) => $color};
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────
const ChangelogPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const els = document.querySelectorAll('[data-cl-reveal]');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const items = COLOR_KEYS.map((colorKey, idx) => {
    const meta = TAG_META[colorKey];
    const notes = Array.from({ length: NOTE_COUNTS[idx] }, (_, ni) =>
      t(`changelog.versions.${idx}.notes.${ni}`)
    );
    return {
      version: t(`changelog.versions.${idx}.version`),
      date: t(`changelog.versions.${idx}.date`),
      tag: t(`changelog.versions.${idx}.tag`),
      title: t(`changelog.versions.${idx}.title`),
      notes,
      meta,
      latest: idx === 0,
    };
  });

  return (
    <Page>
      <HeaderClean />
      <Main>
        {/* ── Hero ── */}
        <HeroWrap>
          <Eyebrow>{t('changelog.hero.eyebrow')}</Eyebrow>
          <HeroTitle>{t('changelog.hero.title')}</HeroTitle>
          <HeroSubtitle>{t('changelog.hero.subtitle')}</HeroSubtitle>
        </HeroWrap>

        {/* ── Timeline ── */}
        <Section>
          <Rail>
            {items.map((item, idx) => {
              const Icon = item.meta.icon;
              return (
                <>
                  <SEO
                    title="Changelog"
                    description="Historique des nouveautés et améliorations de VisioConnect."
                    path="/changelog"
                  />
                  <Entry key={item.version} data-cl-reveal style={{ '--delay': `${idx * 0.08}s` }}>
                    <IconCircle $color={item.meta.color} $bg={item.meta.bg} $latest={item.latest}>
                      <Icon size={22} strokeWidth={1.8} />
                    </IconCircle>

                    <Card $color={item.meta.color}>
                      <CardMeta>
                        <VersionBadge $color={item.meta.color}>
                          {item.version}
                          {item.latest && <LatestDot />}
                        </VersionBadge>
                        <TagBadge $color={item.meta.color} $bg={item.meta.bg}>
                          {item.tag}
                        </TagBadge>
                        <DateLabel>{item.date}</DateLabel>
                      </CardMeta>

                      <CardTitle>{item.title}</CardTitle>

                      <NoteList>
                        {item.notes.map((note, ni) => (
                          <NoteItem key={ni} $color={item.meta.color}>
                            <CheckCircle2 size={16} strokeWidth={2} />
                            {note}
                          </NoteItem>
                        ))}
                      </NoteList>
                    </Card>
                  </Entry>
                </>
              );
            })}
          </Rail>
        </Section>

        {/* ── CTA ── */}
        <CallToAction
          title={t('changelog.cta.title')}
          description={t('changelog.cta.description')}
          buttonText={t('changelog.cta.button')}
          buttonLink="/contact"
        />
      </Main>
      <FooterClean />
    </Page>
  );
};

export default ChangelogPage;
