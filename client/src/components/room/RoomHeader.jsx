import React, { useState } from 'react';
import styled from 'styled-components';
import { Shield, Signal, Users, Cpu, UserPlus } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { InviteModal } from './InviteModal';

const HeaderContainer = styled.header`
  flex-shrink: 0;
  height: 56px;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-bottom: 1px solid ${THEME.border};
  background-color: ${THEME.cardBg};
  z-index: 10;
  overflow: hidden;

  @media (min-width: 769px) {
    height: 64px;
    padding: 0 2rem;
    gap: 1rem;
  }
`;

/* LEFT: room name + badge */
const RoomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1 1 0;
  overflow: hidden;
`;

const RoomName = styled.h1`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${THEME.text};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;

  @media (min-width: 480px) {
    max-width: 180px;
    font-size: 1rem;
  }

  @media (min-width: 769px) {
    max-width: 260px;
    font-size: 1.125rem;
  }
`;

const SecureBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: ${THEME.accentSoft};
  color: #059669;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  border: 1px solid rgba(16, 185, 129, 0.2);
  white-space: nowrap;
  flex-shrink: 0;

  /* Texte masqué sur très petits écrans */
  .badge-text {
    display: none;
  }

  @media (min-width: 480px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.65rem;
    .badge-text {
      display: inline;
    }
  }

  @media (min-width: 769px) {
    font-size: 0.875rem;
    padding: 0.375rem 0.875rem;
  }
`;

/* CENTER: invite button */
const InviteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background-color: ${THEME.accentSoft};
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
  white-space: nowrap;

  .invite-text {
    display: none;
  }

  @media (min-width: 480px) {
    padding: 0.35rem 0.875rem;
    .invite-text {
      display: inline;
    }
  }

  @media (min-width: 769px) {
    padding: 0.4rem 1rem;
    font-size: 0.875rem;
  }

  &:hover {
    background-color: rgba(59, 130, 246, 0.12);
  }
`;

/* RIGHT: connection stats */
const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;

  @media (min-width: 769px) {
    gap: 1.5rem;
  }
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: ${THEME.textDim};
  font-weight: 500;
  white-space: nowrap;

  svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }

  /* Masquer le texte sur mobile, garder l'icône */
  .stat-text {
    display: none;
  }

  @media (min-width: 480px) {
    .stat-text {
      display: inline;
    }
  }

  @media (min-width: 769px) {
    font-size: 0.875rem;
    gap: 0.5rem;
    svg {
      width: 18px;
      height: 18px;
    }
  }

  /* CPU item masqué sur mobile */
  &.hide-mobile {
    display: none;
    @media (min-width: 640px) {
      display: flex;
    }
  }
`;

export const RoomHeader = ({ roomName, isSecure, participantCount, quality }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HeaderContainer>
      {/* LEFT */}
      <RoomInfo>
        <RoomName title={roomName || 'Réunion en cours'}>
          {roomName || 'Réunion en cours'}
        </RoomName>
        {isSecure && (
          <SecureBadge title="Chiffrement E2EE actif">
            <Shield size={12} />
            <span className="badge-text">E2EE</span>
          </SecureBadge>
        )}
      </RoomInfo>

      {/* CENTER */}
      <InviteButton onClick={() => setIsModalOpen(true)} title="Inviter des participants">
        <UserPlus size={15} />
        <span className="invite-text">Inviter</span>
      </InviteButton>

      {/* RIGHT */}
      <ConnectionStatus>
        <StatusItem title="Participants">
          <Users />
          <span>{participantCount || 1}</span>
        </StatusItem>

        <StatusItem title="Qualité du signal">
          <Signal style={{ color: quality === 'excellent' ? '#22c55e' : '#eab308' }} />
          <span className="stat-text">{quality === 'excellent' ? 'HD' : 'Std'}</span>
        </StatusItem>

        <StatusItem className="hide-mobile" title="Performance">
          <Cpu />
          <span className="stat-text">OK</span>
        </StatusItem>
      </ConnectionStatus>

      <InviteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </HeaderContainer>
  );
};