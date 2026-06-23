import React from 'react';
import styled from 'styled-components';
import { Heart, Code } from 'lucide-react';

const COLORS = {
  primary: 'hsl(var(--primary))',
  text: 'hsl(var(--foreground))',
  muted: 'hsl(var(--muted-foreground))',
  background: '#f8fafc',
  border: 'hsl(var(--border))',
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem 1.5rem;
  background: ${COLORS.background};
  border-top: 1px dashed ${COLORS.border};
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  color: ${COLORS.muted};
  max-width: 600px;
  text-align: center;

  strong {
    color: ${COLORS.text};
    font-weight: 600;
  }

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    border-radius: 12px;
    padding: 1.5rem;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: ${COLORS.border};

  @media (max-width: 640px) {
    width: 40px;
    height: 1px;
  }
`;

const IndieBadge = () => {
  return (
    <Wrapper>
      <Badge>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code size={16} color={COLORS.primary} />
          <span>
            Développé avec passion par un <strong>ingénieur indépendant</strong>.
          </span>
        </div>
        <Divider />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Heart size={16} color="#ef4444" />
          <span>
            Optimisé pour la <strong>performance brute</strong>, pas pour la masse.
          </span>
        </div>
      </Badge>
    </Wrapper>
  );
};

export default IndieBadge;
