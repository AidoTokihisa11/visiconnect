import React from 'react';
import styled from 'styled-components';
import { Quote } from 'lucide-react';

// ========== STYLED COMPONENTS ==========

const Card = styled.div`
  background: hsl(var(--card));
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid hsl(var(--border));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    transform: translateY(-4px);
  }
`;

const QuoteIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary));
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.05rem;
  font-style: italic;
  color: hsl(var(--foreground));
  line-height: 1.7;
  margin: 0 0 1.5rem;
  flex: 1;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid hsl(var(--border));
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: hsl(var(--primary));
  color: hsl(var(--card));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AuthorName = styled.div`
  font-weight: 700;
  color: hsl(var(--foreground));
  font-size: 0.95rem;
`;

const AuthorTitle = styled.div`
  font-size: 0.85rem;
  color: hsl(var(--muted-foreground));
`;

// ========== COMPONENT ==========

const TestimonialCard = ({ quote, author, title, ...props }) => {
  const initials =
    author
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '?';

  return (
    <Card {...props}>
      <QuoteIcon>
        <Quote size={20} />
      </QuoteIcon>

      <Text>{quote}</Text>

      <AuthorSection>
        <Avatar title={author}>{initials}</Avatar>
        <AuthorInfo>
          <AuthorName>{author}</AuthorName>
          {title && <AuthorTitle>{title}</AuthorTitle>}
        </AuthorInfo>
      </AuthorSection>
    </Card>
  );
};

export default TestimonialCard;
