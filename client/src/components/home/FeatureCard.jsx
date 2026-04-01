import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// ========== STYLED COMPONENTS ==========

const Card = styled(motion.div)`
  background: linear-gradient(145deg, hsl(var(--card)), #fcfcfc);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), inset 0 0 0 1px rgba(255,255,255,0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 0 20px rgba(37, 99, 235, 0.15);
    border-color: hsl(var(--primary));
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, hsl(var(--primary)), #60a5fa);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => props.$bg || 'rgba(37, 99, 235, 0.1)'};
  color: ${props => props.$color || 'hsl(var(--primary))'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  color: hsl(var(--muted-foreground));
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: hsl(var(--muted-foreground));
  
  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: hsl(var(--primary));
    margin-top: 2px;
  }
`;

// ========== COMPONENT ==========

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  items = [], 
  iconBg, 
  iconColor,
  delay = 0,
  ...props 
}) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      {...props}
    >
      {Icon && (
        <IconWrapper $bg={iconBg} $color={iconColor}>
          <Icon size={28} />
        </IconWrapper>
      )}
      
      <Title>{title}</Title>
      <Description>{description}</Description>
      
      {Array.isArray(items) && items.length > 0 && (
        <ItemsList>
          {items.map((item, idx) => (
            <ListItem key={idx}>
              <Check size={16} />
              <span>{item}</span>
            </ListItem>
          ))}
        </ItemsList>
      )}
    </Card>
  );
};

export default FeatureCard;
