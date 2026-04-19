import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Shield, CreditCard, Bell, Palette, Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const SettingsContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const SettingCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: #333;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const SettingsPage = () => {
  const { t } = useTranslation();

  const settingsOptions = [
    {
      icon: User,
      title: t('settings.profile.title'),
      description: t('settings.profile.desc'),
      onClick: () => {}
    },
    {
      icon: Shield,
      title: t('settings.security.title'),
      description: t('settings.security.desc'),
      onClick: () => {}
    },
    {
      icon: CreditCard,
      title: t('settings.billing.title'),
      description: t('settings.billing.desc'),
      onClick: () => {}
    },
    {
      icon: Bell,
      title: t('settings.notifications.title'),
      description: t('settings.notifications.desc'),
      onClick: () => {}
    },
    {
      icon: Palette,
      title: t('settings.appearance.title'),
      description: t('settings.appearance.desc'),
      onClick: () => {}
    },
    {
      icon: Globe,
      title: t('settings.language.title'),
      description: t('settings.language.desc'),
      onClick: () => {}
    }
  ];

  return (
    <PageContainer>
      <SettingsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <BackButton to="/">
            <ArrowLeft size={20} />
            {t('settings.back')}
          </BackButton>
          <Title>{t('settings.title')}</Title>
        </Header>

        <SettingsGrid>
          {settingsOptions.map((option, index) => (
            <SettingCard
              key={index}
              onClick={option.onClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CardIcon>
                <option.icon size={24} />
              </CardIcon>
              <CardTitle>{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </SettingCard>
          ))}
        </SettingsGrid>
      </SettingsContainer>
    </PageContainer>
  );
};

export default SettingsPage;