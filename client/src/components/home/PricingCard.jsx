import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// ========== STYLED COMPONENTS ==========

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  border: ${(props) => (props.$popular ? '2px solid #2563eb' : '1px solid #e2e8f0')};
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  color: #0f172a;
  box-shadow: ${(props) =>
    props.$popular
      ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      : '0 4px 6px -1px rgb(0 0 0 / 0.05)'};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  ${(props) =>
    props.$popular &&
    css`
      transform: scale(1.02);
      z-index: 10;

      @media (max-width: 768px) {
        transform: scale(1);
      }
    `}
`;

const Badge = styled.div`
  background: #2563eb;
  color: white;
  padding: 0.4rem 1.25rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 0.05em;
`;

const PlanHeader = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  min-height: 48px; /* Allows alignment for smaller 1-line descriptions compared to 2-line */
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 2.5rem;

  span.currency {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
  }

  span.amount {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
    color: #0f172a;
  }

  span.period {
    font-size: 1rem;
    color: #64748b;
    margin-left: 0.25rem;
    font-weight: 500;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: #334155;

  svg {
    width: 16px;
    height: 16px;
    color: #2563eb;
    flex-shrink: 0;
    stroke-width: 2.5;
  }
`;

const CTAButton = styled(Link)`
  padding: 0.875rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;
  display: block;
  width: 100%;

  ${(props) =>
    props.$variant === 'primary'
      ? css`
          background-color: #2563eb;
          color: white;
          border: 2px solid #2563eb;

          &:hover {
            background-color: #1d4ed8;
            border-color: #1d4ed8;
          }
        `
      : css`
          background-color: transparent;
          color: #0f172a;
          border: 2px solid #0f172a;

          &:hover {
            background-color: #f8fafc;
          }
        `}
`;

// ========== COMPONENT ==========

const PricingCard = ({
  planName,
  price,
  period = 'par mois',
  description,
  features = [],
  isPopular = false,
  ctaText = 'Choisir',
  ctaLink = '/pricing',
  delay = 0,
  ...props
}) => {
  // Adaptation du libellé selon ta capture
  const formattedPeriod = period.includes('par ') ? period.replace('par ', '/') : `/${period}`;

  return (
    <Card
      $popular={isPopular}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    >
      {isPopular && <Badge>Recommandé</Badge>}

      <PlanHeader>
        <PlanName>{planName}</PlanName>
        {description && <Description>{description}</Description>}
      </PlanHeader>

      <Price>
        <span className="currency">€</span>
        <span className="amount">{price}</span>
        <span className="period">{formattedPeriod}</span>
      </Price>

      <FeatureList>
        {Array.isArray(features) &&
          features.map((feature, idx) => (
            <FeatureItem key={idx}>
              <Check />
              <span>{feature}</span>
            </FeatureItem>
          ))}
      </FeatureList>

      <CTAButton to={ctaLink} $variant={isPopular ? 'primary' : 'outline'}>
        {ctaText}
      </CTAButton>
    </Card>
  );
};

export default PricingCard;
