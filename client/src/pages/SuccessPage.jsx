import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useUser } from '@clerk/react';
import { apiFetch } from '../lib/apiClient';
import { CheckCircle, Loader2 } from 'lucide-react';
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
  const { user } = useUser();
  const sessionId = searchParams.get('session_id');
  const [confirming, setConfirming] = useState(!!sessionId);
  const [confirmedPlan, setConfirmedPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const confirmSubscription = async () => {
      try {
        const res = await apiFetch('/api/confirm-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (data.success) {
          // Update Clerk metadata client-side — no CLERK_SECRET_KEY needed
          if (user) {
            await user.update({
              unsafeMetadata: {
                ...(user.unsafeMetadata || {}),
                plan: data.plan,
                billingCycle: data.billingCycle || 'monthly',
                subscribedAt: data.subscribedAt || new Date().toISOString(),
              },
            });
            await user.reload();
          }
          setConfirmedPlan(data.plan);
        } else {
          setError(data.error || 'Erreur lors de la confirmation.');
        }
      } catch (err) {
        setError('Erreur réseau lors de la confirmation.');
      } finally {
        setConfirming(false);
      }
    };

    confirmSubscription();
  }, [sessionId]);

  // Auto-redirect to account page after 3s once confirmed
  useEffect(() => {
    if (!confirmedPlan) return;
    const timer = setTimeout(() => navigate('/account'), 3000);
    return () => clearTimeout(timer);
  }, [confirmedPlan, navigate]);

  const planLabels = { starter: 'Starter', pro: 'Pro', business: 'Business' };

  return (
    <Container>
      {confirming ? (
        <>
          <Loader2 size={80} color="#3b82f6" style={{ animation: 'spin 1s linear infinite' }} />
          <Title style={{ color: '#3b82f6' }}>Activation en cours…</Title>
          <Subtitle>Nous confirmons votre abonnement, veuillez patienter.</Subtitle>
        </>
      ) : error ? (
        <>
          <CheckCircle size={80} color="#10b981" />
          <Title>{t('success.title')}</Title>
          <Subtitle>{t('success.description')}</Subtitle>
          <Button onClick={() => navigate('/account')}>{t('success.button')}</Button>
        </>
      ) : (
        <>
          <CheckCircle size={80} color="#10b981" />
          <Title>{t('success.title')}</Title>
          <Subtitle>
            {confirmedPlan
              ? `Votre abonnement ${planLabels[confirmedPlan] || confirmedPlan} est maintenant actif. Redirection vers votre profil…`
              : t('success.description')}
          </Subtitle>
          <Button onClick={() => navigate('/account')}>Voir mon profil</Button>
        </>
      )}
    </Container>
  );
};

export default SuccessPage;
