import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const COLORS = {
  primary: 'hsl(var(--primary))',
  text: 'hsl(var(--foreground))',
  muted: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  border: 'hsl(var(--border))',
};

const Section = styled.section`
  padding: 3rem 1.5rem;
  background: ${COLORS.background};
  border-bottom: 1px solid ${COLORS.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Label = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${COLORS.muted};
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &::before,
  &::after {
    content: '';
    height: 1px;
    width: 32px;
    background: ${COLORS.border};
  }
`;

const LogoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  opacity: 0.7;
`;

const LogoPlaceholder = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${COLORS.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ProofArea = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <Container>
        <Label>{t('proofArea.label')}</Label>
        <LogoGrid>
          <LogoPlaceholder>
            <div style={{ width: 24, height: 24, background: '#3b82f6', borderRadius: 4 }} />
            Premium Client A
          </LogoPlaceholder>
          <LogoPlaceholder>
            <div style={{ width: 24, height: 24, background: '#ef4444', borderRadius: '50%' }} />
            Design Partner
          </LogoPlaceholder>
          <LogoPlaceholder>
            <div
              style={{
                width: 24,
                height: 24,
                background: '#10b981',
                transform: 'rotate(45deg)',
                borderRadius: 4,
              }}
            />
            Early Access Corp
          </LogoPlaceholder>
          <LogoPlaceholder>
            <div style={{ width: 24, height: 24, background: '#f59e0b', borderRadius: 12 }} />
            Tech Studio
          </LogoPlaceholder>
        </LogoGrid>
      </Container>
    </Section>
  );
};

export default ProofArea;
