import React, { useState } from 'react';
import styled from 'styled-components';
import { Copy, Check, X, Mail, Link as LinkIcon, Smartphone } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: ${THEME.cardBg};
  border: 1px solid ${THEME.border};
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: ${THEME.textDim};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${THEME.accentSoft};
    color: ${THEME.text};
  }
`;

const Title = styled.h2`
  color: ${THEME.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${THEME.textDim};
  font-size: 0.95rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: ${THEME.text};
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LinkBox = styled.div`
  display: flex;
  background: ${THEME.bg};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  padding: 0.5rem;
  align-items: center;
`;

const LinkInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${THEME.textDim};
  font-size: 0.9rem;
  padding: 0.5rem;
  outline: none;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${THEME.accent};
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
`;

const ShareOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ShareOptionBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: ${THEME.bg};
  border: 1px solid ${THEME.border};
  padding: 1.5rem 1rem;
  border-radius: 12px;
  color: ${THEME.text};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${THEME.accentSoft};
    border-color: ${THEME.accent};
    transform: translateY(-2px);
  }

  svg {
    color: ${THEME.accent};
    width: 28px;
    height: 28px;
  }
`;

export const InviteModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  if (!isOpen) return null;

  const inviteUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleEmailShare = () => {
    const subject = "Invitation à une visioconférence";
    const body = `Rejoignez ma réunion en cliquant sur ce lien : ${inviteUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>

        <Title>Inviter des participants</Title>
        <Subtitle>Partagez ce lien avec les personnes que vous souhaitez inviter à votre réunion.</Subtitle>

        <Section>
          <SectionTitle>
            <LinkIcon size={16} />
            Lien de la réunion
          </SectionTitle>
          <LinkBox>
            <LinkInput value={inviteUrl} readOnly />
            <ActionButton onClick={handleCopyLink}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copié' : 'Copier'}
            </ActionButton>
          </LinkBox>
        </Section>

        <Section>
          <SectionTitle>Autres options de partage</SectionTitle>
          <ShareOptions>
            <ShareOptionBtn onClick={handleEmailShare}>
              <Mail />
              Envoyer par email
            </ShareOptionBtn>
            <ShareOptionBtn onClick={() => alert("Fonctionnalité SMS à venir ! (Visuel uniquement pour le moment)")}>
              <Smartphone />
              Inviter par SMS
            </ShareOptionBtn>
          </ShareOptions>
        </Section>
      </ModalContent>
    </Overlay>
  );
};
