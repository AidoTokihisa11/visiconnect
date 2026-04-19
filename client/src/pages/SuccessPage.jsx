import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CheckCircle } from 'lucide-react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 700;
  color: #10b981;
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #64748b;
  text-align: center;
  max-width: 500px;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2563eb;
  }
`;

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Here you could make a backend call to verify the payment
    }
  }, [sessionId]);

  return (
    <Container>
      <CheckCircle size={80} color="#10b981" />
      <Title>{t('success.title')}</Title>
      <Subtitle>
        {t('success.description')}
      </Subtitle>
      <Button onClick={() => navigate('/dashboard')}>
        {t('success.button')}
      </Button>
    </Container>
  );
};

export default SuccessPage;