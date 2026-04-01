import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// ========== STYLED COMPONENTS ==========

const Card = styled(motion.div)`
  background: hsl(var(--card));
  border-radius: 20px;
  padding: 2.5rem 1.5rem;
  border: 1px solid hsl(var(--border));
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
  height: 100%;

  ${props => props.$popular && css`
    border-color: hsl(var(--primary));
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 
                0 0 20px rgba(37, 99, 235, 0.15);
    transform: scale(1.05);

    @media (max-width: 768px) {
      transform: scale(1);
    }
  `}

  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: hsl(var(--primary));
  color: hsl(var(--card));
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  margin-bottom: 1rem;
`;

const Price = styled.div`
  margin-bottom: 1.5rem;
  
  span.amount {
    font-size: 2.5rem;
    font-weight: 800;
    color: hsl(var(--foreground));
  }

  span.currency {
    font-size: 1.5rem;
    vertical-align: super;
  }

  span.period {
    font-size: 0.95rem;
    color: hsl(var(--muted-foreground));
    margin-left: 0.5rem;
  }
`;

const Description = styled.p`
  color: hsl(var(--muted-foreground));
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: hsl(var(--muted-foreground));

  svg {
    width: 18px;
    height: 18px;
    color: hsl(var(--primary));
    flex-shrink: 0;
  }
`;

const CTAButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
  display: inline-block;
  width: 100%;

  ${props => props.$variant === 'primary' ? css`
    background-color: hsl(var(--primary));
    color: hsl(var(--card));
    border: 1px solid hsl(var(--primary));

    &:hover {
      background-color: #1d4ed8;
      border-color: #1d4ed8;
      transform: translateY(-2px);
    }
  ` : css`
    background-color: hsl(var(--background));
    color: hsl(var(--primary));
    border: 2px solid hsl(var(--primary));

    &:hover {
      background-color: hsl(var(--primary));
      color: hsl(var(--card));
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
  ctaLink = '/checkout',
  delay = 0,
  ...props
}) => {
  return (
    <Card
      $popular={isPopular}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      {...props}
    >
      {isPopular && <PopularBadge>Plus Populaire</PopularBadge>}

      <PlanName>{planName}</PlanName>

      <Price>
        <span className="currency">$</span>
        <span className="amount">{price}</span>
        <span className="period">{period}</span>
      </Price>

      {description && <Description>{description}</Description>}

      <FeatureList>
        {Array.isArray(features) && features.map((feature, idx) => (
          <FeatureItem key={idx}>
            <Check size={18} />
            <span>{feature}</span>
          </FeatureItem>
        ))}
      </FeatureList>

      <CTAButton
        to={ctaLink}
        $variant={isPopular ? 'primary' : 'outline'}
      >
        {ctaText}
      </CTAButton>
    </Card>
  );
};

export default PricingCard;
