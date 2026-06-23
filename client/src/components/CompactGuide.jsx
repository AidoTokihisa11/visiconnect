import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Star,
  MessageSquare,
  Video,
  Users,
} from 'lucide-react';
import Avatar from './Avatar';

const GuideContainer = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: 320px;
  max-height: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
  z-index: 999;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 280px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const GuideToggle = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  z-index: 1000;

  &:hover {
    background: #2563eb;
  }

  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
  }
`;

const GuideHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GuideTitle = styled.h3`
  margin: 0;
  color: #1e40af;
  font-size: 1.1rem;
  font-weight: 600;
  flex: 1;
`;

const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.1);
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(59, 130, 246, 0.2);
    color: #1e40af;
  }
`;

const GuideContent = styled.div`
  padding: 20px;
  max-height: 280px;
  overflow-y: auto;
`;

const StepContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  border-left: 3px solid #3b82f6;
`;

const StepTitle = styled.h4`
  margin: 0 0 8px 0;
  color: #1e40af;
  font-size: 0.9rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.4;
`;

const GuideNavigation = styled.div`
  padding: 15px 20px;
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavButton = styled.button`
  padding: 8px 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  background: ${(props) => (props.primary ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)')};
  color: ${(props) => (props.primary ? 'white' : '#3b82f6')};
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: ${(props) => (props.primary ? '#2563eb' : 'rgba(59, 130, 246, 0.2)')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  gap: 4px;
`;

const StepDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.active ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)')};
`;

const CompactGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasShownGuide, setHasShownGuide] = useState(false);

  const steps = [
    {
      title: 'Bienvenue sur VisiConnect !',
      description:
        'Découvrez toutes les fonctionnalités premium de notre plateforme de visioconférence professionnelle.',
      icon: <Star size={16} />,
    },
    {
      title: 'Contrôles Vidéo',
      description:
        'Gérez votre caméra, micro et partagez votre écran depuis la barre de contrôle en bas.',
      icon: <Video size={16} />,
    },
    {
      title: 'Chat Collaboratif',
      description: 'Communiquez via le chat intégré avec support IA et traduction automatique.',
      icon: <MessageSquare size={16} />,
    },
    {
      title: 'Gestion des Participants',
      description:
        'Voyez tous les participants, gérez les permissions et créez des salles séparées.',
      icon: <Users size={16} />,
    },
  ];

  useEffect(() => {
    // Afficher automatiquement le guide la première fois
    const timer = setTimeout(() => {
      if (!hasShownGuide) {
        setIsOpen(true);
        setHasShownGuide(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasShownGuide]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeGuide = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <GuideToggle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Ouvrir le guide"
          >
            <HelpCircle size={24} />
          </GuideToggle>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <GuideContainer
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <GuideHeader>
              <Avatar name="Guide VisiConnect" size="40px" />
              <GuideTitle>Assistant VisiConnect</GuideTitle>
              <CloseButton onClick={closeGuide}>
                <X size={16} />
              </CloseButton>
            </GuideHeader>

            <GuideContent>
              <StepContainer>
                <StepTitle>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {steps[currentStep].icon}
                    {steps[currentStep].title}
                  </div>
                </StepTitle>
                <StepDescription>{steps[currentStep].description}</StepDescription>
              </StepContainer>
            </GuideContent>

            <GuideNavigation>
              <NavButton onClick={prevStep} disabled={currentStep === 0}>
                <ChevronLeft size={16} />
                Précédent
              </NavButton>

              <StepIndicator>
                {steps.map((_, index) => (
                  <StepDot key={index} active={index === currentStep} />
                ))}
              </StepIndicator>

              <NavButton onClick={currentStep === steps.length - 1 ? closeGuide : nextStep} primary>
                {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                {currentStep !== steps.length - 1 && <ChevronRight size={16} />}
              </NavButton>
            </GuideNavigation>
          </GuideContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompactGuide;
